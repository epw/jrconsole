all: jrconsole.js

jrconsole.js: repl.js
	cat jquery.json.js jquery.websocket.js repl.js > jrconsole.js

clean:
	rm jrconsole.js
