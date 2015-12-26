var PORT = 60019;
var jrconsole;

function create_toast_element() {
    var style = "div.toast { position: absolute; width: 100%; text-align: center; display: none; z-index: 100 }";
    style += "span.toast { background-color: #222; color: white; padding: 3px }";
    $("head").append("<style>" + style + "</style>");
    var toast_div = document.createElement("div");
    toast_div.className = "toast";
    var toast_span = document.createElement("span");
    toast_span.className = "toast";
    toast_div.appendChild(toast_span);
    document.body.appendChild(toast_div);
}
$(document).ready(create_toast_element);

function send_toast(msg) {
    $("span.toast").html(msg);
    $("div.toast").css("top", window.innerHeight - 100);
    $("div.toast").fadeIn();
    setTimeout("$('div.toast').fadeOut()", 1500);
}

function expand_object(obj) {
    var expansion = "[object " + typeof(obj);
    for (key in obj) {
	expansion += ", " + key;
    }
    return expansion + "]";
}

function connect_opened() {
    send_toast("Connected to jrconsole server.");
}
function connect_closed() {
    send_toast("Disconnected from jrconsole server.");
}

function connect() {
    $.websocketSettings.open = connect_opened;
    $.websocketSettings.close = connect_closed;
    jrconsole = $.websocket("ws://" + window.location.hostname + ":" + PORT,
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
					var json;
					try {
					    json = $.toJSON(evaluated);
					    if (typeof(json) == "undefined") {
						json = expand_object(evaluated);
					    }
					} catch (e) {
					    if (e instanceof TypeError) {
						json = expand_object(evaluated);
					    }
					}
					jrconsole.send("evaluated", json);
				    },
				    command: function (e) {
					if (e.data == "quit") {
					    jrconsole.close()
					}
				    }
				}
			    });
}
$(document).ready(connect);
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
