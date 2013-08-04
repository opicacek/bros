function Engine() {
	this.bro_list = {};
	this.pipeline = {};
}
Engine.prototype.deleteBro = function(socket_id, parameters) {
	delete this.bro_list[parameters];
}
Engine.prototype.moveBro = function(socket_id, parameters) {
	var bro = this.bro_list[socket_id];
	if (bro.pos[0] < parameters[0]) {
		bro.pos[0] += 1;
	} else if (bro.pos[0] > parameters[0]) {
		bro.pos[0] -= 1;
	}
	
	if (bro.pos[1] < parameters[1]) {
		bro.pos[1] += 1;
	} else if (bro.pos[1] > parameters[1]) {
		bro.pos[1] -= 1;
	}
}
Engine.prototype.process = function() {
	for (var socket_id in this.pipeline) {
		for (var command in this.pipeline[socket_id]) {
			var parameters = this.pipeline[socket_id][command];
			this[command](socket_id, parameters);
		}
	}
}
exports.Engine = Engine;