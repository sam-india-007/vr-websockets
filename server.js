const PORT = process.env.PORT || 8080; //This might have to change depending on host (e.g. heroku)

/********************************************************************
***** DEPENDENCIES
*********************************************************************/

const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //for req parsing
const path = require('path'); //for setting res paths
const socketIO = require('socket.io');
var count = 0;

//Configure express
app.set('port', PORT);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

//Configure socket.io (for cross-tab comms)
var server = http.createServer(app);

const io = socketIO.listen(server);
io.on('connection', function(socket) {
	console.log("Client connected");
	socket.on('left', function(){
		io.emit('left');
	});
	socket.on('right', function(){
		io.emit('right');
	});
	socket.on('up', function(){
		io.emit('up');
	});
	socket.on('down', function(){
		io.emit('down');
	});
	socket.on('zoomIn', function(){
		io.emit('zoomIn');
	});
	socket.on('zoomOut', function(){
		io.emit('zoomOut');
	});
	socket.on('fullscreen', function(){
		io.emit('fullscreen');
	});
	socket.on("mark",(data)=>{
		console.log(data.posPitch);
		console.log(data.posYaw);
		console.log(data.input);
		
		count+=1;
		console.log(count);
		io.emit("mark",{posPitch:data.posPitch, posYaw:data.posYaw, input: data.input, id:count});
	});
	socket.on("delete",function(){
		io.emit("delete",{hotSpotId:count.toString()});
		count-=1;
	});
	socket.on('rotate', function(){
		io.emit('rotate');
	});
	socket.on('stoprotate', function(){
		io.emit('stoprotate');
	});
	socket.on('initial', function(){
		io.emit('initial');
	});
	socket.on('disconnect', function(){
		console.log("Client disconnected");
	});
	socket.on("revert",(data)=>{
		
		io.emit("revert",data);
	});
	socket.on("revertReverse",function(){
		
		io.emit("revertReverse");
	});
	socket.on("scene",(data)=>{
		var scene = data.scene;
		console.log(scene);
		io.emit("scene",{scene:scene});
	});
});


/********************************************************************
************* EXPRESS REDIRECTS
*********************************************************************/

//Start server
server.listen(PORT, function() {
	console.log('server listening on port ' + PORT)
});

//Landing page
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

//Controller
app.get('/controller', function(req, res) {
  res.sendFile(__dirname + '/controller.html')
});
