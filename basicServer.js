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
var roomIDForMe;
var isRomFinded = false;
var room2send = '';
var roomNameForSearch

/*try {
    console.log('inside try');
    N.API.getRooms(function(rooms) {
        console.log(' rooms nah');
        if (rooms != ""){
            res.send(rooms);
            sended = true;
            console.log('azazaza ' + rooms);
        }else{
            res.send('lol');
            sended = true;
            console.log('lol');
        }
            
    });


} catch (err) {

  console.log(err);

}
*/

var ipList = ['192.168.250.5','2','3'];


app.get('/dasm/', function(req, res){
    "use strict";

    var ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    if (ipList.indexOf(ip) == -1) {
        res.send('Muahahahahaha : ' + ip);
    }else{
        // get room name from params

        /*
            cookies mazafaka nah
        */
        if (!req.query.roomName){
            res.send('param room not found');
            return 0;
        }

        if (!req.query.iin){
            res.send('param iin not found');
            return 0;
        }

        var iin = req.query.iin

        
        if (req.cookie == undefined) {
            var hour = 60 * 60 * 1000;
            console.log("first cookie setting");
            res.cookie('iin', iin, { maxAge: hour });
            res.cookie('count', 0, { maxAge: hour });
        }else{
            console.log("increment count cookie");
            countcookie = req.cookies.count+1;
            res.cookie('count', countcookie, { maxAge: hour });
        }
        
        //--------------------------------------------------

        roomName = req.query.roomName;  //UUID

        //if room name is empty, we change it to default

        if (roomName == "" || roomName == undefined){
            roomName = "testroom";
        }

        // we getting rooms and try search room eq. if find? then we attach to it
        console.log('try 2 getRooms');
        N.API.getRooms(function(roomlist) {
                var rooms = JSON.parse(roomlist);
                //console.log("Rooms count: " + rooms.length); //check and see if one of these rooms is 'basicExampleRoom'
                //console.log("Default Room Name is " + roomName);
                var incerentFor = 0;
                for (var room in rooms) {
                    incerentFor++;
                    //console.log(incerentFor);
                    if (rooms[room].name === roomName){
                            console.log('rooms[room].name : ' + rooms[room].name + '  roomName: ' + roomName);
                            roomIDForMe = rooms[room]._id;
                            console.log("yeeeee we find room " + roomName);
                    }
                }
                if (!roomIDForMe) {

                    N.API.createRoom(roomName, function(roomID) {
                            console.log('Created room with id: ', roomID._id);
                            console.log('Created room with name: ', roomName);
                    });

                } else {
                    console.log('Using room', roomIDForMe);
                    console.log('Room Name', roomName);
                }
                roomIDForMe = '';
                res.sendFile(__dirname + '/server/room.html', {
                    isMain: true
                });

        });
    }
    //console.log(" test console");

});

app.get('/deleteAllRooms/', function(req, res) {
    "use strict";
    N.API.getRooms(function(roomlist) {
            var rooms = JSON.parse(roomlist);
            console.log("Rooms count: " + rooms.length); //check and see if one of these rooms is 'basicExampleRoom'
            for (var room in rooms) {
                var roomID2Del =  rooms[room]._id;
                console.log ('2del: ' + rooms[room]._id);
                N.API.deleteRoom(roomID2Del, function(result) {
                    console.log('Room: ' + roomID2Del + ' | Result: ' + result);
                }, function (e) {
                    console.log('Error: ', e);
                });
            }
    });
    res.send('Done');
});

app.get('/deleteRooms/', function(req, res) {
    "use strict";
    var roomID2Del = req.query.roomID2Del; 
    N.API.deleteRoom(roomID2Del, function(result) {
        console.log('Result: ', result);
        res.send('Result: ' + result);
    }, function (e) {
        console.log('Error: ', e);
        res.send('Error: ' + e);
    });
});

app.get('/getRooms/', function(req, res) {
    "use strict";
    console.log('getRooms started');
    var sended = false;
    N.API.getRooms(function(rooms) {
        console.log(' get rooms NAPI');
        if (rooms != ""){
            res.send(rooms);
            sended = true;
            console.log('Rooms finded ' + rooms);
        }else{
            res.send('Rooms not find');
            sended = true;
            console.log('Rooms not find');
        }
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

app.post('/getRoomByName/', function(req, res){
    "use strict";
    console.log("getRoomByName");
    roomNameForSearch = req.body.roomName;
    console.log('get param: ' + roomNameForSearch);
    N.API.getRooms(function(roomlist) {
            var rooms = JSON.parse(roomlist);
            isRomFinded = false;
            console.log("Rooms count: " + rooms.length); //check and see if one of these rooms is 'basicExampleRoom'
            for (var room in rooms) {
                //console.log('for in ----------');
                if (rooms[room].name === roomNameForSearch){
                        console.log(rooms[room]._id);
                        console.log('Room is finded in getRoomByName');
                        isRomFinded = true;
                        room2send = rooms[room]._id;
                        res.send(rooms[room]._id);
                }
            }

            if (!isRomFinded){
                console.log('isRomFinded: ' + isRomFinded);
                res.send('none');
                console.log('sending : none');
                isRomFinded = false;
            }
            room2send = '';
    });

});

app.post('/createToken/', function(req, res){
    "use strict";
    console.log("createToken---------------------------------------------");
    
    var room = req.body.roomName;
    console.log("room:"+room);
    
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

app.get('/videoInfo/:params',function(req,res){
    console.log(req.params.params);
    var paramsArr = req.params.params.split('&');
    var iin = paramsArr[0];
    var videoName = paramsArr[2];
    var role = paramsArr[1];
    var path = '/var/www/html/rec/';
    var result;/*
    fs.appendFile(path + iin + '.nfo', role + ' video - ' + videoName + '.mkv' + "\r\n", function (err) {
        if (err) throw err;
        result = 'ok';
        console.log(result);
        res.send(result);
    });*/
    result = 'ok';
    console.log(result);
    res.send(result);

})

app.get('/videoEnd/:iin',function(req,res){
    console.log('video finished');
    var iin = req.params.iin;
    var path = '/var/www/html/rec/' + iin + '/';
    /*fs.appendFile(path + 'finished.nfo','finished' + "\r\n", function (err) {
        if (err) throw err;
        result = 'ok';
        console.log(result);
        res.send(result);
    });*/
    result = 'ok';
    console.log(result);
    res.send(result);
})

app.get('/finished/:iin',function(req,res){
    console.log('video finished');
    var iin = req.params.iin;
    var path = '/var/www/html/rec/';
    var result;

   

    // Is it a directory?
    if (fs.existsSync(path + iin + '/')){

        fs.appendFile(path + iin + '/' + iin + '.nfo','final' + "\r\n", function (err) {
            if (err) throw err;
            result = 'ok';
            console.log(result);
            res.send(result);
        });

    }else{
        result = 'directory does not exist';
        console.log(result);
        res.send(result);
    }

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
