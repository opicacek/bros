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