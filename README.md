# jrconsole
JavaScript Remote Console

This project implements a REPL for JavaScript using WebSockets. When
the JavaScript is included in a page, it will attempt to connect to
the server, which should be running on the same host as the Web
server. This project's server acts as the JavaScript console,
remotely.

## Requirements

ws4py: Follow instructions at https://ws4py.readthedocs.org/en/latest/sources/install/

Or just run:

```shell
	pip install ws4py
```
