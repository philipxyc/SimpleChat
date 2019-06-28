var express = require('express')
var app = express();
var http = require('http').Server(app);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE ROOM (ID TEXT PRIMARY KEY NOT NULL, ALLOW INT)");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

});

// db.close();


var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('join', function(rid){
    console.log('user join: ' + msg);

  });
  socket.on('create', function(msg){
    console.log('user create');
    if(msg.hasOwnProperty('rid') && msg.hasOwnProperty('limit')){

      db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
          console.log(row.id + ": " + row.info);
      });
      io.emit(msg.rid, 'created');
    }

  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
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
