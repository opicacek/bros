var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	static = require('node-static'); // for serving files

// This will make all the files in the current folder
// accessible from the web
var fileServer = new static.Server('./');

// This is the port for our web server.
// you will need to go to http://localhost:8080 to see it
app.listen(8080);

// If the URL of the socket server is opened in a browser
function handler (request, response) {
	fileServer.serve(request, response); // this will return the correct file
}

//TODO old version, can be deleted now
/*
var app = require('http').createServer(handler)
	, io = require('socket.io').listen(app)
	, fs = require('fs')
	//, client = require('./js/client.js')

app.listen(8080);

function handler (req, res) {
	fs.readFile(__dirname + '/index.html',
	function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}

		res.writeHead(200);
		res.end(data);
	});
}
*/
var bro_list = {};

io.sockets.on('connection', function (socket) {
	socket.on('bro', function (data) {
		if (bro_list[data.bro_id] == undefined) {
			socket.on('disconnect', function () {
				bro_list[data.bro_id] = undefined;
		    });
		}
		bro_list[data.bro_id] = data.bro_pos;
	});
});

function updateBros() {
	io.sockets.emit('bro_list', bro_list);
	setTimeout(updateBros, 20);
}
updateBros();