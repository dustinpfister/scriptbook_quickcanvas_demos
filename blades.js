/*
 *   blades quickcanvas demo
 *
 *   check out Blade Profiles section to make new blade profiles
 *
 */


 // the Blades Module
var Blades = (function () {

	var conf = {

		currentProfile : 0,
		runTime : 15000,
		lastChange : new Date()

	},

	profiles = [],

	Blade = function (profile) {

		var xMin = profile.xRange.min,
		xMax = profile.xRange.max,
		roll,
		r,
		rLen;

		if (profile.xRange.rolls) {

			roll = Math.random();
			r = 0;
			rLen = profile.xRange.rolls.length;
			while (r < rLen) {

				if (roll < profile.xRange.rolls[r].roll) {

					xMin = profile.xRange.rolls[r].min;
					xMax = profile.xRange.rolls[r].max;
					break;
				}

				r++;
			}

		}

		this.profile = profile;

		this.base = {

			x : Math.floor(Math.random() * (xMax - xMin)) + xMin,
			y : profile.startY,
			w : Math.floor(Math.random() * (profile.startingWidth.max - profile.startingWidth.min)) + profile.startingWidth.min

		};

		this.points = [{
				x : this.base.x,
				y : this.base.y,
				w : this.base.w
			}
		];

		this.lastTime = new Date();
		this.rate = Math.floor(Math.random() * 90) + 30;
		this.green = Math.floor(Math.random() * 200) + 55;
		this.frame = 0;
		this.maxFrame = Math.floor(Math.random() * 40) + 10;
		this.alpha = 1;
		this.yHeight = Math.floor(Math.random() * (profile.height.max - profile.height.min)) + profile.height.min;
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


					var yaw = this.profile.yawRates[Math.floor(Math.random() * this.profile.yawRates.length)];

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

		conf : conf,

		profiles : profiles,

		addProfile : function (profile) {

			profile.blades = [];
			profile.lastRoll = new Date();

			console.log(profile);

			profiles.push(profile);

		},

		step : function () {


			var prof = profiles[conf.currentProfile],
			blades = prof.blades,
			b = blades.length;
			while (b--) {

				blades[b].step();

				if (blades[b].done && blades[b].alpha === 0) {

					blades.splice(b, 1);

				}
			}

			if (new Date() - conf.lastChange > conf.runTime) {

				console.log(prof.blades.length);

				if (prof.blades.length === 0) {

					conf.currentProfile += 1;

					if (conf.currentProfile >= profiles.length) {

						conf.currentProfile = 0;

					}

					conf.lastChange = new Date();
				}

			} else {
				if (new Date() - prof.lastRoll > prof.rollRate) {

					prof.lastRoll = new Date();
					var roll = Math.random();
					if (roll < prof.genPer) {
						if (blades.length < prof.maxBlades) {

							//this.pushNewBlade();
							prof.blades.push(new Blade(prof));

						}
					}
				}
			}

		}

	};

}
	());

// Blade Profiles
Blades.addProfile({
	name : 'ziggie',
	maxBlades : 30,
	height : {
		min : 240,
		max : 280
	},
	startingWidth : {
		min : 5,
		max : 10
	},
	startY : 240,
	xRange : {
		min : 155,
		max : 165
	},
	yawRates : [-1,-1,-1,-1,-1,1,1,1,1,1, 30,-30],
	rollRate : 33,
	genPer : 1
});

Blades.addProfile({
	name : 'three',
	maxBlades : 20,
	height : {
		min : 240,
		max : 280
	},
	startingWidth : {
		min : 5,
		max : 10
	},
	startY : 240,
	xRange : {
		min : 0,
		max : 20,
		rolls : [{
				min : 150,
				max : 170,
				roll : 0.33
			}, {
				min : 300,
				max : 320,
				roll : 0.66
			}
		]
	},
	yawRates : [7, 5, -2, -2, -1, -1, -1, -1],
	rollRate : 100,
	genPer : 0.4
});

Blades.addProfile({
	name : 'normal',
	maxBlades : 20,
	height : {
		min : 240,
		max : 120
	},
	startingWidth : {
		min : 5,
		max : 20
	},
	startY : 240,
	xRange : {
		min : 0,
		max : 320
	},
	yawRates : [1, -1],
	rollRate : 1000,
	genPer : 0.75
});

(function () {

	// get references to the canvas and canvas context
	var canvas = document.getElementById('quickcanvas_canvas'),
	context = canvas.getContext('2d'),

	// start will be called once before running main loop
	start = function () {

		loop();

	},

	// what to do on each frame tick
	update = function () {

		Blades.step();

	},

	// what to draw to canvas
	draw = function (ctx) {

		// background
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// draw blades
		var profile = Blades.profiles[Blades.conf.currentProfile],
		b = 0,
		bLen = profile.blades.length,
		p,
		pLen,
		blade;
		while (b < bLen) {

			p = 1;
			blade = profile.blades[b];
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
		
		// draw info
		ctx.fillStyle = '#ffffff';
		ctx.textBaseline = 'top';
		ctx.font = '10px arial';
		ctx.fillText('name : ' + profile.name, 5,5);
		
		var per = (new Date() - Blades.conf.lastChange) / Blades.conf.runTime;
		
		if(per > 1){ per = 1;}
		
        ctx.fillRect(5,225, 310 * (1-per),10 );
		
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
