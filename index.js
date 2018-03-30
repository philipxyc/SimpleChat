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
  socket.on('Alvolus', function(msg){
    console.log('turn to '+msg+' plz');
    io.emit('Alvolus', msg);
  });
  socket.on('reset', function(){
    console.log('reset');
    io.emit('reset');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('player0', function(msg){
    console.log('player0: ' + msg);
    io.emit('player0', msg);
  });
});

var port = process.env.PORT || 3000;

http.listen(port, function(){
  console.log('listening on *:',port);
});
