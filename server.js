var app = require('http').createServer(handler)
	, io = require('socket.io').listen(app)
	, fs = require('fs')

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

var bro_list = [];

io.sockets.on('connection', function (socket) {
	socket.on('bro', function (data) {
		bro_list.push(data);
		socket.emit('bro_list', bro_list);
	});
});