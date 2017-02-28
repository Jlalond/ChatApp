var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	
	io.emit('chat message', 'User connected');
	socket.on('disconnect', function(){
		console.log('user disonnected');
		io.emit('user disconnected');
	});
	
	socket.on('chat message', function(msg){
	io.emit('chat message', msg);
	});
	
	socket.on('disconnect', function(){
		io.emit('chat message', 'User Disconnected');
	});
	
});
/*
io.on('connection', function(socket){
	socket.on('chat message', function(msg){
	io.emit('chat message', msg);
	});
	
});

io.on('connection', function(socket){
	io.emit('chat message', 'User connected');
	socket.on('disconnect', function(){
		io.emit('chat message', 'User Disconnected');
	});
});

*/

http.listen(3000,function(){
	console.log('listening on *:3000');
});
