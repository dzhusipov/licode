var serverUrl = "/";
var localStream, room, recording, recordingId, globalToken;
var roomName;
var roomIdFromName;
var IIN, ROLE;
 

function setNfoFile(iin,role,videoName){
   $.ajax({
      url: '/videoInfo/' + iin + '&' + role + '&' + videoName,
      success: function(res){
        console.log(res);
      }
    });
  
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function testConnection () {
  window.location = "/connection_test.html";
}

function startRecording () {
  if (room !== undefined){
    if (!recording){
      room.startRecording(localStream, function(id) {
        recording = true;
        recordingId = id;
        setNfoFile(IIN,ROLE,recordingId);
      });
    } 
  }
  
}

window.onbeforeunload = function (evt) {
  console.log('stopping video recording');
  room.stopRecording(recordingId);
  return "Если вы закончили, можете закрывать.";
}

window.onload = function () {
  console.log('onload event');

  console.log('starting video');
  recording = false;
  var video_constraints = {mandatory: {
       maxFrameRate:30
      },
      optional: [ ]
  };
  var screen = getParameterByName("screen");
  var config = {audio: true, video: video_constraints, data: true, screen: screen, videoSize: [640, 480, 640, 480]};
  // If we want screen sharing we have to put our Chrome extension id. The default one only works in our Lynckia test servers.
  // If we are not using chrome, the creation of the stream will fail regardless.
  if (screen){
    config.extensionId = "okeephmleflklcdebijnponpabbmmgeo";
  }
  localStream = Erizo.Stream(config);
  var params = getSearchParameters();
    roomName = params.roomName;
    IIN = params.iin;
    ROLE = params.role;
    if(!ROLE){
      ROLE='client';
    }
    document.getElementById('RoomID').value = roomName;
    document.getElementById('IIN').value = IIN;
    document.getElementById('ROLE').value = ROLE;
  /*----------------------------------------*/
    var getRoomIDFromServerRequest = function (roomName, callback){
      var req = new XMLHttpRequest();
      var url = serverUrl + 'getRoomByName/';
      var body = {roomName: roomName};
      req.onreadystatechange = function () {
          if (req.readyState === 4) {
            callback(req.responseText);
          }
      };
      req.open('POST', url, false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(body));
    }
    
    getRoomIDFromServerRequest(roomName, function (response) {
        roomIdFromName = response;
        document.getElementById('RoomID').value = roomIdFromName;
    });
    /*----------------------------------------*/

  var createToken = function(userName, role, callback) {

    var req = new XMLHttpRequest();
    var url = serverUrl + 'createToken/';
    
    
    

    if (roomName == "" || roomName == undefined){
        roomName = "testroom";
    }
    console.log(roomName);
    roomIdFromName = document.getElementById('RoomID').value;
    console.log('Room id is : ' + roomIdFromName);

    var body = {username: userName, role: role, roomName: roomIdFromName};

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
    globalToken = token;
    room = Erizo.Room({token: token});

    localStream.addEventListener("access-accepted", function () {
      var subscribeToStreams = function (streams) {
        for (var index in streams) {
          var stream = streams[index];
          if (localStream.getID() !== stream.getID()) {
            room.subscribe(stream);
            stream.addEventListener("bandwidth-alert", function (evt){
                console.log("Bandwidth Alert", evt.msg, evt.bandwidth);
            });
            

          }
        }
      };

      room.addEventListener("room-connected", function (roomEvent) {

        room.publish(localStream, {maxVideoBW: 100000, minVideoBW:100});
        subscribeToStreams(roomEvent.streams);
      });

      room.addEventListener("stream-subscribed", function(streamEvent) {
        var stream = streamEvent.stream;
        var div = document.createElement('div');
        div.setAttribute("style", "width: 550px; height: 413px;");
        div.setAttribute("id", "test" + stream.getID());
        document.getElementById('secondVideo').appendChild(div);
        stream.show("test" + stream.getID());
        console.log('try 2 start recording');
        startRecording();
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
          document.getElementById('secondVideo').removeChild(element);
        }
      });
      
      room.addEventListener("stream-failed", function (streamEvent){
          console.log(room);
          console.log("STREAM FAILED, DISCONNECTION");
          room.disconnect();

      });

      room.connect();

      localStream.show("myVideo");

    });
    localStream.init();
  });
}

function getSearchParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}
