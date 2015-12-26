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

function log(msg) {
    jrconsole.send("log", msg);
}

var adjustment;
function adjust_step(place, to, step) {
    var start = eval(place);
    if (Math.abs(start - to) < Math.abs(step)) {
	eval(place + " = " + to);
	clearInterval(adjustment);
    } else {
	eval(place + " += " + step);
    }
}
function adjust(place, to) {
    var start = eval(place);
    clearInterval(adjustment);
    adjustment = setInterval(function () { adjust_step(place, to, (to - start) / 40); },
			     25);
}
