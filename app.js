var app   = require('express')();
var http  = require('http').Server(app);
var io    = require('socket.io')(http);
var net   = require('net');
var tail  = require('tail');
var lines = require('./models/fileLines.js');

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.emit('update', 'Welcome!');

    // Show new user the latest lines
    lines.get(function(error, data){
        if(error){
            socket.emit('Error occurred in server');
        }
        data.forEach(function(element){
            socket.emit('update', element);
        });
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

http.listen(3000, '0.0.0.0', function(){
    console.log('listening on 0.0.0.0:3000');
});

/*
    Section for getting data from python application
*/
var host = '127.0.0.1'
var port = 18920;

function processPyData(socket){
    console.log('Net Connection');
    socket.on('data', function(data){
        var j = JSON.parse(data);
        console.log('Got data', j.v);
        io.emit('update', j.v);
    })
}

net.createServer(processPyData)
    .listen(port, host, function(){
    console.log('Listening on %s:%s', host, port);
});

/*
    Section for working with file streaming input
*/
var tail = new tail.Tail('./py_output.log');
tail.on('line', function(data){
    console.log(data);
    // Immediately send the new data to the client
    io.emit('update', data);
    // Store data in database
    lines.save(data);
});
tail.on("error", function(error) {
  console.log('ERROR: ', error);
});
