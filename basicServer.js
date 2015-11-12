/*global require, __dirname, console*/
//var Erizo = require('erizofc');

var express = require('express'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    morgan = require('morgan'),
    net = require('net'),
    N = require('./nuve'),
    fs = require("fs"),
    https = require("https"),
        config = require('./../../licode_config');

var options = {
    key: fs.readFileSync('../../cert/key.pem').toString(),
    cert: fs.readFileSync('../../cert/cert.pem').toString()
};

var app = express();

// app.configure ya no existe
"use strict";
app.use(errorhandler({
    dumpExceptions: true,
    showStack: true
}));

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//app.set('views', __dirname + '/../views/');
//disable layout
//app.set("view options", {layout: false});

N.API.init(config.nuve.superserviceID, config.nuve.superserviceKey, 'http://localhost:3000/');

var myRoom;
var roomName;
console.log(__dirname);

app.get('/dasm/:roomName', function(req, res){
    roomName = req.params.roomName;
    if (roomName == ""){
        roomName = "testroom";
    }
    res.sendFile(__dirname + '/server/room.html', {
        isMain: true
    });

  console.log(roomName);
});

app.get('/asdasdasd/:roomName', function(req, res) {
	console.log('dasm1');
    	"use strict";
	roomName = req.params.roomName;
	if (roomName == ""){
		roomName = "testroom";
	}
	N.API.getRooms(function(roomlist) {
    		var rooms = JSON.parse(roomlist);
    		console.log(rooms.length); //check and see if one of these rooms is 'basicExampleRoom'
    		for (var room in rooms) {
        		if (rooms[room].name === roomName){
            			roomName = rooms[room]._id;
        		}
    		}
    		if (!roomName) {

        		N.API.createRoom(roomName, function(roomID) {
            			roomName = roomID._id;
            			console.log('Created room ', roomName);
        		});

    		} else {
        		console.log('Using room', roomName);
    		}
	});
    //res.download(__dirname + '/public/index.html');

});

app.get('/getRooms/', function(req, res) {
    "use strict";
    N.API.getRooms(function(rooms) {
        res.send(rooms);
    });
});

app.get('/getUsers/:room', function(req, res) {
    "use strict";
    var room = req.params.room;
    N.API.getUsers(room, function(users) {
        res.send(users);
    });
});


app.post('/createRoom/', function(req, res){
 
    N.API.createRoom('myRoom', function(roomID) {
        res.send(roomID);
    }, function (e) {
        console.log('Error: ', e);
    });
});


app.post('/createToken/', function(req, res){
    "use strict";
    var room = req.body.room;
    var username = req.body.username;
    var role = req.body.role;
    N.API.createToken(room, username, role, function(token) {
        res.send(token);
    }, function (e) {
        console.log('Error: ', e);
    });
});


app.get('/room/:id',function(request,response){
	var roomName = request.params.id;
	N.API.createRoom(roomName, function(room) {
  		console.log('Room created with name: ', room.name);
		response.send('Room created with id: ' + room.name);
	}, function (e) {
        	console.log('Error: ', e);
    	});	
})

app.use(function(req, res, next) {
    "use strict";
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    res.header('Access-Control-Allow-Headers', 'origin, content-type');
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});



app.listen(3001);

var server = https.createServer(options, app);
server.listen(3004);
