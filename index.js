var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('reset', function(){
    console.log('reset');
    io.emit('reset');
  });
  socket.on('player0', function(msg){
    console.log('player0: ' + msg);
    io.emit('player0', msg);
  });
  socket.on('player1', function(msg){
    console.log('player1: ' + msg);
    io.emit('player1', msg);
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

var port = process.env.PORT || 3000;

http.listen(port, function(){
  console.log('listening on *:',port);
});
