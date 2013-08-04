function Engine() {
	
}
Engine.prototype.moveBro = function(bro) {
	//bro.pos = bro.goal_pos;
	
	if (bro.pos[0] < bro.goal_pos[0]) {
		bro.pos[0] += 1;
	} else if (bro.pos[0] > bro.goal_pos[0]) {
		bro.pos[0] -= 1;
	}
	
	if (bro.pos[1] < bro.goal_pos[1]) {
		bro.pos[1] += 1;
	} else if (bro.pos[1] > bro.goal_pos[1]) {
		bro.pos[1] -= 1;
	}
}
