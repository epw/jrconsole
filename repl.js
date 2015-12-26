var PORT = 60019;
var jrconsole = $.websocket("ws://" + window.location.hostname + ":" + PORT,
			    {
				events: {
				    toeval: function (e) {
					var evaluated;
					try {
					    evaluated = eval(e.data);
					} catch (e) {
					    evaluated = {"type": "error",
							 "name": e.name,
							 "message": e.message
							};
					}
					jrconsole.send("evaluated",
						       evaluated);
				    },
				    command: function (e) {
					if (e.data == "quit") {
					    jrconsole.close()
					}
				    }
				}
			    });
