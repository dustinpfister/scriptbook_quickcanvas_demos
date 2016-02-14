// Map 2
(function () {

	// get references to the canvas and canvas context
	var canvas = document.getElementById('quickcanvas_canvas'),
	context = canvas.getContext('2d'),

	map = {

		x : 0,
		y : 500,

		heading : 0,

		camW : 320,
		camH : 240,

		cellW : 50,
		cellH : 50,

		maxY : 1000

	},

	// start will be called once before running main loop
	start = function () {

		loop();

	},

	// what to do on each frame tick
	update = function () {

		// update your state here
		map.heading += 0.25;
		if (map.heading >= 360) {
			map.heading = 0;
		}

		map.x = Math.cos(Math.PI / 180 * map.heading) * 500 + 500;
		map.y = Math.sin(Math.PI / 180 * map.heading) * 500 + 500;

		if (map.y > map.maxY) {
			map.y = map.maxY;
		}
	},

	// what to draw to canvas
	draw = function (ctx) {

		var startX,
		startY,
		startBlue,
		i,
		i2;

		// background
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// draw sky
		startY = Math.abs(map.y) % map.cellH;
		startX = Math.abs(map.x) % map.cellW;
		i = 0;
		i2 = 0;

		ctx.lineWidth = 1;
		while (i < Math.ceil(map.camH / map.cellH) + 1) {

			ctx.fillStyle = 'rgb(0,' + Math.round(startBlue) + ',' + Math.round(startBlue) + ')';
			ctx.fillStyle = 'rgb(0,' + Math.round(startBlue) + ',' + Math.round(startBlue) + ')';
			ctx.fillRect(0, (startY - map.cellH) + map.cellH * i, 320, map.cellW);

			ctx.strokeStyle = 'rgba(255,255,255,0.5)';
			i2 = 0;
			while (i2 < Math.ceil(map.camW / map.cellW) + 1) {
				ctx.strokeRect(startX - map.cellW + map.cellW * i2, startY - map.cellH + map.cellH * i, map.cellW, map.cellH);
				i2++;
			}
			i++;
		}

		ctx.fillStyle = '#ffffff';
		ctx.fillText(map.x.toFixed(2) + ',' + map.y.toFixed(2), 10, 10);

	},

	// main app loop
	loop = function () {

		requestAnimationFrame(loop);

		update();
		draw(context);

	};

	// start it (click run button to start this demo)
	start();

}
	());
