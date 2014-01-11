var fs = require('fs'),
	express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server, {
        'log': true
    });

app.use("/js", express.static(__dirname + '/public/js'));
app.use("/css", express.static(__dirname + '/public/css'));

app.get('/', function(req, res){
    fs.readFile(__dirname + "/templates/index.html", "UTF-8", function(err, data){
        res.send(data);
    });
});

io.sockets.on('connection', function (socket) {
	socket.emit('handshakeRequest', 'request');
	var initialTime = new Date().getTime();
	socket.on('handshakeResponse', function(){
		var endTime = new Date().getTime();
		var latency = endTime - initialTime;
		console.log('latency is ' + latency + 'ms');
	});
});

server.listen(8000);
console.log('app is running');