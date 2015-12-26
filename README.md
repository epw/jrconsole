# jrconsole
JavaScript Remote Console

This project implements a REPL for JavaScript using WebSockets. When
jrconsole.js is included in a page, it will attempt to connect to
jrconsole.py, which should be running on the same host as the Web
server. jrconsole.py acts as the JavaScript console, remotely.

## Requirements

ws4py: Follow instructions at https://ws4py.readthedocs.org/en/latest/sources/install/

Or just run:

```shell
	pip install ws4py
```
