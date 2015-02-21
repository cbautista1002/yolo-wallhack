var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);
var net  = require('net');

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
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
