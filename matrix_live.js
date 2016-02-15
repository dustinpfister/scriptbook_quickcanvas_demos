// Matrix live

var PlantList = {
	
	grass : {
		
		lifespan : 10,
		minFert : 0
		
	}
	
},

Plant = function(){
	
	this.desc = 'grass';
	
	this.maxFert = 10;
	
	this.lifespan = 10;
	this.spawnChance = 1;
	
	
};

Plant.prorotype = {
	
	
	
};


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
		
		// set up the cells
		setUp : function(){
			
			var i = 0, len = this.width * this.height;
			
			this.cells = [];
			
			while(i < len){
				
				this.cells.push({
					
					ph : 3,
					fert : 0,
					maxPlants : 10,
					plants : []
					
				});
				
				i += 1;
			}
			
		},
		
		// count how many plants there are in the matrix and retun the number
		countPlants : function(){
			
			var i = 0, len = this.width * this.height, plantCount = 0;
			while(i < len ){
				
				plantCount += this.cells[i].plants.length;
				
				i++;
			}
			
			return plantCount;
			
		},
		
		// return a random cell
		rndCell : function(){
			
			return this.cells[ Math.floor( this.width * this.height * Math.random() ) ];
			
		},
		
		// get an array of plant spawn indexs of a given cell index
		getSpawnIndexs : function(i){
			
			var x = Math.floor( i % this.width ),
			y = Math.floor( i / this.width),
			options = [i];
			
			if(x + 1 < this.width){
				
				options.push(i + 1);
				
			}
			
			if(x - 1 >= 0){
				
				options.push(i - 1);
				
			}
			
			if(y - 1 >= 0){
				
				options.push(i - this.width);
				
			}
			
			if(y + 1 < this.height){
				
				options.push(i + this.width);
				
			}
			
			return options;
			
		},
		
		update : function(){
			
			var c, cell, cLen, p, plant, pLen;
			
			// generate a new plant if there are none
			if(this.countPlants() < 100){
		
                cell = this.rndCell();
				if(cell.fert <= 100 ){
                    cell.plants.push( new Plant() );			
			    }
		    }
			
			// loop cells
			c = 0; cLen = this.width * this.height;
			while(c < cLen){
				
				cell = this.cells[c];
				
				// loop plants for current cell
				p = cell.plants.length;
				while(p--){
					
					// get the curret plant
					plant = cell.plants[p];
					
					// spawn new plants?
					var spots = this.getSpawnIndexs(c),
					self = this;
					spots.forEach(function(index){
						
						var roll = Math.random();
						
					    if(roll < 0.05 && self.cells[index].plants.length < self.cells[index].maxPlants){
							
							if(self.cells[index].fert <= 100 ){
							    self.cells[index].plants.push( new Plant() );
							}
							
						}	
						
					});
					
					// loose lifespan
					plant.lifespan -= 1;
					
					// if plant is dead
					if(plant.lifespan <= 0 ){
						
						cell.fert += 1;
						cell.plants.splice(p,1);
						
					}
					
				}
				
				c++;
			}
				
		},
		
		drawPlants : function(ctx){
			
			var i = 0, len = this.width * this.height,x,y,plantCount;
			while(i < len){
				
				plantCount = this.cells[i].plants.length;
				
				if(plantCount > 0){
					
					x = Math.floor(i % this.width);
					y = Math.floor(i / this.width);
					
					ctx.fillStyle = 'rgba(0,'+Math.floor( 200 / this.cells[i].maxPlants * plantCount + 55 )+',0,1)';
					ctx.fillRect(x*this.cellWidth,y*this.cellHeight,this.cellWidth,this.cellHeight);
					
				}
				
				i += 1;
			}
			
		}

	},

	// start will be called once before running main loop
	start = function () {
	
	    // set the cell size for the canvas
		matrix.setCellSize(canvas);
		
		// set up the cells
		matrix.setUp();

		loop();

	},

	// what to do on each frame tick
	update = function () {

        
		matrix.update();
		
	},

	// what to draw to canvas
	draw = function (ctx) {

		// background
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		matrix.drawPlants(ctx);

	},

	lt = new Date(),

	// main app loop
	loop = function () {

		requestAnimationFrame(loop);

		if (new Date() - lt >= 100) {
			update();
			draw(context);
			lt = new Date();
		}

	};

	// start it (click run button to start this demo)
	start();

}
	());