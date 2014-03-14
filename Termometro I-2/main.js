var handler = function(req, res) {
	fs.readFile('./index.html', function (err, data) {
	    if(err) throw err;
	    res.writeHead(200);
		res.end(data);
	});
}
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var port = 8000;
var _id;
app.listen(port);

var changes=[];

io.sockets.on('connection', function (socket) {


	socket.emit("welcome", changes);
	socket.on('disconnect', function () {

  	});
  	socket.on("click", function( data ) {
  		  console.log(data.id + ' ' + data.col);
  		  io.sockets.emit("changeColor", {id: data.id, color:data.col});
  		  changes.push(data);
	});
});






