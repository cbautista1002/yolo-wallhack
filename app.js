var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

app.get('/', function(req, res){
//     res.write('HELLO');
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