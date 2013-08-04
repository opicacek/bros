function Engine() {
	this.bro_list = {};
	this.pipeline = {};
}
Engine.prototype.moveBro = function(socket_id, position) {
	// console.log(this.bro_list)
	var bro = this.bro_list[socket_id];
	if (bro.pos[0] < position[0]) {
		bro.pos[0] += 1;
	} else if (bro.pos[0] > position[0]) {
		bro.pos[0] -= 1;
	}
	
	if (bro.pos[1] < position[1]) {
		bro.pos[1] += 1;
	} else if (bro.pos[1] > position[1]) {
		bro.pos[1] -= 1;
	}
}
Engine.prototype.process = function() {
	for (var socket_id in this.pipeline) {
		for (var command in this.pipeline[socket_id]) {
			var variables = this.pipeline[socket_id][command];
			this[command](socket_id, variables);
		}
	}
}
exports.Engine = Engine;