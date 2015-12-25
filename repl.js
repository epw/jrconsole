var jrconsole = $.websocket("ws://192.168.1.11:9000/", {
    events: {
	message: function (e) { jrconsole.send("evaluated",
					       eval(e.data)); }
    }
});
