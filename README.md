# jrconsole
JavaScript Remote Console

This project implements a REPL for JavaScript using WebSockets. When
jrconsole.js is included in a page, it will attempt to connect to
jrconsole.py, which should be running on the same host as the Web
server. jrconsole.py acts as the JavaScript console, remotely.

## Requirements

ws4py: Follow instructions at
https://ws4py.readthedocs.org/en/latest/sources/install/

Or just run:

```shell
	pip install ws4py
```

## Usage

1.  Include jquery in your Web page
2.  Include `jrconsole.js` in your Web page
3.  Run `jrconsole.py`. It should tell you it's waiting for a
    connection.
4.  Load your Web page.
5.  `jrconsole.py` should tell you it received a connection and show a
    prompt.

While connected, '>' is the prompt character, '=' gives the evaluated
result, '!' indicates a Python error occurred.

Control-D to exit.
