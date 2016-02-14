// Matrix live

(function () {

	// get references to the canvas and canvas context
	var canvas = document.getElementById('quickcanvas_canvas'),
	context = canvas.getContext('2d'),

	// distance formula
	distance = function (x1, y1, x2, y2) {

		// return the distance between the two points
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

	},

	// the matrix object
	matrix = {

		width : 32,
		height : 24,
		cells : [],

		// set cell size based on the given canvas
		setCellSize : function (canvas) {

			this.cellWidth = canvas.width / this.width;
			this.cellHeight = canvas.height / this.height;

		},
		
		draw : function(ctx){
			
			
			
			
		},
		
		setUp : function(){
			
			var i=0, len =
			
			
		}


	},

	// start will be called once before running main loop
	start = function () {

	    canvas.width = 640;
		canvas.height = 480;
	
		matrix.setCellSize(canvas);
		
		
		loop();

	},

	// what to do on each frame tick
	update = function () {

        
	},

	// what to draw to canvas
	draw = function (ctx) {

		// background
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		matrix.draw(ctx);

	},

	lt = new Date(),

	// main app loop
	loop = function () {

		requestAnimationFrame(loop);

		if (new Date() - lt >= 1000) {
			update();
			draw(context);
			lt = new Date();
		}

	};

	// start it (click run button to start this demo)
	start();

}
	());