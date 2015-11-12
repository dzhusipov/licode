      window.onload = function () {
 
          var localStream = Erizo.Stream({audio: true, video: true, data: true});
          var room = Erizo.Room({token: "af54/=gopknosdvmgiufhgadf=="});
 	  
          var createToken = function(userName, role, callback) {

	    var req = new XMLHttpRequest();
	    var url = serverUrl + 'createToken/';
	    var req = new XMLHttpRequest();
	    var url = serverUrl + 'createToken/';
	    var body = {username: userName, role: role};

	    req.onreadystatechange = function () {
	      if (req.readyState === 4) {
		callback(req.responseText);
	      }
	    };

	    req.open('POST', url, true);
	    req.setRequestHeader('Content-Type', 'application/json');
	    req.send(JSON.stringify(body));
	  };

	  createToken("user", "presenter", function (response) {
	    var token = response;
	    console.log(token);
	    room = Erizo.Room({token: token});

          room.addEventListener("room-connected", function (roomEvent) {

		room.publish(localStream, {maxVideoBW: 3000, minVideoBW:500});
		subscribeToStreams(roomEvent.streams);
	      });

	      room.addEventListener("stream-subscribed", function(streamEvent) {
		var stream = streamEvent.stream;
		var div = document.createElement('div');
		div.setAttribute("style", "width: 320px; height: 240px;");
		var div = document.createElement('div');
		div.setAttribute("style", "width: 320px; height: 240px;");
		div.setAttribute("id", "test" + stream.getID());

		document.body.appendChild(div);
		stream.show("test" + stream.getID());

	      });

	      room.addEventListener("stream-added", function (streamEvent) {
		var streams = [];
		streams.push(streamEvent.stream);
		subscribeToStreams(streams);
		document.getElementById("recordButton").disabled = false;
	      });

	      room.addEventListener("stream-removed", function (streamEvent) {
		// Remove stream from DOM
		var stream = streamEvent.stream;
		if (stream.elementID !== undefined) {
		  var element = document.getElementById(stream.elementID);
		  document.body.removeChild(element);
		}
	      });

	      room.addEventListener("stream-failed", function (streamEvent){
		  console.log("STREAM FAILED, DISCONNECTION");
		  room.disconnect();

	      });

	      room.connect();

	      localStream.show("myVideo");

	    });
	    localStream.init();
	  });
	};

