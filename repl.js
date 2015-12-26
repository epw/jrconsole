var PORT = 60019;
var jrconsole = $.websocket("ws://" + window.location.hostname + ":" + PORT,
			    {
				events: {
				    toeval: function (e) {
					var evaluated;
					try {
					    evaluated = eval(e.data);
					} catch (e) {
					    evaluated = e;
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
