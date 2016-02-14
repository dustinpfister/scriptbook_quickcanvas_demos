// grass 3


var Blades = (function () {

	var blades = [],
	maxBlades = 40,
	
	maxHeight = 240,
	minHeight = 200,
	
	startingWidthMax = 10,
	startingWidthMin = 5,
	
	startY = 240,
	
	
	xRange = {
		
		min: 20,
		max: 40,
		
		rolls : [
		
		    {
				min: 200,
				max: 220,
				roll: 0.1
				
			}
		
		]
		
		
	},
	
	
	yawRates = [-5,-2,-1,5,2,1,7,4,3],
	rollRate = 100,
	genPer = 0.4,
	lastRoll = new Date();
	

	var Blade = function () {

	    var xMin = xRange.min,
		xMax = xRange.max,
		roll, r, rLen;
		
		if(xRange.rolls){
		
            roll = Math.random();
            r = 0;
            rLen = xRange.rolls.length;

            while(r < rLen){
				
				if(roll < xRange.rolls[r].roll){
					
					xMin = xRange.rolls[r].min;
					xMax = xRange.rolls[r].max;
					break;
				}
				
				r++;
			}			
			
			
		}
	
		this.base = {

			x : Math.floor(Math.random()* (xMax - xMin)) + xMin,
			y : startY,
			w : Math.floor(Math.random()* (startingWidthMax - startingWidthMin)) + startingWidthMin

		};

		this.points = [
			{
			    x : this.base.x,
			    y : this.base.y,
			    w : this.base.w
			}
		];

		this.lastTime = new Date();
		this.rate = Math.floor(Math.random() * 90) + 30;
		this.green = Math.floor(Math.random() * 200) + 55;
		this.frame = 0;
		this.maxFrame = Math.floor(Math.random()* 40)+10;
		this.alpha = 1;
		this.yHeight = Math.floor( Math.random() * ( maxHeight - minHeight) ) + minHeight;
		this.yRate = this.yHeight / this.maxFrame;
		this.done = false;

	};

	Blade.prototype = {

		step : function () {

			if (new Date() - this.lastTime > this.rate) {

				this.lastTime = new Date();
				if (this.done) {

					this.alpha -= 0.01;

					if (this.alpha < 0) {

						this.alpha = 0;
					}

				}

				if (this.frame < this.maxFrame - 1) {

					// get the current point
					var last = this.points[this.frame];

					//var yaw = 5 - Math.floor(Math.random() * 10);

					
					var yaw = yawRates[Math.floor(Math.random()* yawRates.length)];
					
					this.points.push({

						x : last.x + yaw,
						y : last.y - this.yRate,
						w : last.w - this.base.w / this.maxFrame

					});

					this.frame += 1;

				} else {

					this.done = true;

				}
			}

		}

	};

	return {

		// make blades public
		blades : blades,

		pushNewBlade : function () {

			blades.push(

				new Blade());

		},

		step : function () {

			var b = blades.length;
			while (b--) {

				blades[b].step();

				if (blades[b].done && blades[b].alpha === 0) {

					blades.splice(b, 1);

				}
			}

			
			if(new Date() - lastRoll > rollRate){
			    
				lastRoll = new Date();
				var roll = Math.random();
				if(roll < genPer){
				    if (blades.length < maxBlades) {

				        this.pushNewBlade();

			        }
			    }
			}

		}

	}

}
	());

(function () {

	// get references to the canvas and canvas context
	var canvas = document.getElementById('quickcanvas_canvas'),
	context = canvas.getContext('2d'),

	// start will be called once before running main loop
	start = function () {

		console.log('starting');

		loop();

	},

	// what to do on each frame tick
	update = function () {

		// update your state here
		Blades.step();
	},

	// what to draw to canvas
	draw = function (ctx) {

		// background
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// draw blades
		var b = 0,
		bLen = Blades.blades.length,
		p,
		pLen,
		blade;
		while (b < bLen) {

			p = 1;
			blade = Blades.blades[b];
			pLen = blade.points.length;

			ctx.strokeStyle = 'rgba(0,' + blade.green + ',0,' + blade.alpha.toFixed(2) + ')';
			ctx.beginPath();
			ctx.moveTo(
				blade.points[0].x,
				blade.points[0].y);
			while (p < pLen) {

				ctx.lineTo(
				    blade.points[p].x,
					blade.points[p].y);
				ctx.lineWidth = blade.points[p].w;
				ctx.stroke();

				p++;
			}

			b++;
		}

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
