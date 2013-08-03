function play() {	
	
	// Frame rate definition
	var fps = 100;
	var now;
	var then = Date.now();
	var interval = 1000 / fps;
	var delta;
	
	// Init
	var c = document.getElementById('c');
	var ctx = c.getContext('2d');

	c.width = 760;
	c.height = 400;

	var screen_w = c.width;
	var screen_h = c.height;
	
	//
	var my_bro_pos = [];
	var my_bro_id.push([ Math.floor(Math.random()*screen_w), Math.floor(Math.random()*screen_h) ]);

	var id_time = new Date().getTime();
	var id_random = Math.floor(Math.random()*100000);
	var my_bro_id = id_time + "" + id_random;
	
	//
	document.onmousedown = mouseDown;
	function mouseDown(event) {
		if (event.button == 0) { // left click
			console.log("left click");
			//TODO get click position
		}
	}

	function drawWorld() {
		// background 
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.fillRect(0, 0, screen_w, screen_h);
	}
	
	function drawBros(bro_list) {
		
		for (var i = 0; i < bro_list.length; i++) {
			var centerX = bro_list[i].bro_pos[0] / 2;
			var centerY = bro_list[i].bro_pos[1] / 2;
			var radius = 10;

			ctx.beginPath();
			ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			ctx.fillStyle = "rgb(255, 0, 0)";
			if (bro_list[i].bro_id == my_bro_id) {
				ctx.fillStyle = "rgb(0, 255, 0)";
			}
			
			ctx.fill();
		}
	}

	// Bro to server
	var bro_list = [];
	/*
	bro_list.push({bro_id: "123", bro_pos: [50, 160]});
	bro_list.push({bro_id: "456", bro_pos: [230, 300]});
	bro_list.push({bro_id: my_bro_id, bro_pos: [500, 260]});
	*/
	var socket = io.connect('http://localhost');
	socket.on('bro_list', function (data) {
		console.log(data);
		socket.emit('bro', {bro_id: my_bro_id, bro_pos: [500, 260]});
	});
	/*
	function updateBros(bro_list) {
		// send my_bro position
		console.log("informations send to server");
		$.post('server/', {bro_id: my_bro_id, bro_pos: my_bro_pos});
		
		// get positions of all Bros
		$.get('server/', {}, function(response) {
			console.log("got Bros from server:", response);
			bro_list = response;
		});
		
	}
	setTimeout(updateBros, 1000);
	*/
	
	// draw loop
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
	
	function drawLoop(e) {

		requestAnimationFrame(drawLoop);
		
		now = Date.now();
		delta = now - then;
		
		if (delta > interval) {

			drawWorld();
						
			drawBros(bro_list);
		
			// update time stuffs
			then = now - (delta % interval);		
		}
		
	}
	drawLoop();

}