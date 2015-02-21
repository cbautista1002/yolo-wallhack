var net = require('net');
var host = '127.0.0.1'
var port = 18920;

net.createServer(function(socket){
    console.log('We have a connection!');
    socket.on('data', function(data){
        var j = JSON.parse(data);
        console.log('Got data', j.v);
    })
}).listen(port, host, function(){
    console.log('Listening on %s:%s', host, port);
});