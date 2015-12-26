#! /usr/bin/env python

from wsgiref.simple_server import make_server
from ws4py.websocket import WebSocket
from ws4py.server.wsgirefserver import WSGIServer, WebSocketWSGIRequestHandler
from ws4py.server.wsgiutils import WebSocketWSGIApplication

import json
import readline
import sys
import threading
import time

response_lock = threading.Lock()

class JRConsoleWS(WebSocket):

    def opened(self):
        CLIThread.instance = self
        WebSocket.opened(self)
        print "Found connection from", self.peer_address
        response_lock.release()

    def received_message(self, message):
        try:
            print "=", json.loads(message.data)["data"]
        except Exception as e:
            print "!", e
        response_lock.release()

class CLIThread(threading.Thread):
    running = True
    instance = None

    def __init__(self, jrserver):
        threading.Thread.__init__(self)
        self.jrserver = jrserver

    def run(self):
        while True:
            response_lock.acquire()
            try:
                line = raw_input("> ").strip()
            except EOFError:
                print "Got EOF, shutting down"
                self.command("quit")
                CLIThread.running = False
                return
            self.toeval(line)

    def send(self, typename, msg):
        self.instance.send(json.dumps({"type": typename, "data": msg}), False)

    def toeval(self, msg):
        self.send("toeval", msg)

    def command(self, msg):
        self.send("command", msg)

def main():
    response_lock.acquire()
    server = make_server('', 60019, server_class=WSGIServer,
                         handler_class=WebSocketWSGIRequestHandler,
                         app=WebSocketWSGIApplication(handler_cls=JRConsoleWS))
    clithread = CLIThread(server)
    clithread.start()
    server.initialize_websockets_manager()
    server.timeout = 1
    print "Waiting for connection from a Web page."
    while CLIThread.running:
        server.handle_request()

if __name__ == "__main__":
    main()
