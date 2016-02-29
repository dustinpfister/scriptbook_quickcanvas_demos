// Big Foot animation

(function(){

    // get references to the canvas and canvas context
    var canvas = document.getElementById('quickcanvas_canvas'),
    context = canvas.getContext('2d'),
	
	
	//media = [],
	
	// media module
	media = (function(){
		
		var imgArray = [],
		loaded = [],
		done = function(){
			
			console.log('images have loaded, but you did not set a callback.');
			
		},
		
		// call to start the loading of images
		loadImages = function(imgSrc){
	    
		    var i = 0, len = imgSrc.length, img;
			
			imgArray = [];
			loaded = [];
			
			while(i < len){
		    
		        img = new Image();
		
		        (function(index){
		
		            loaded[index] = false;
		
		            img.addEventListener('load', function(e){
			 
		                loaded[index] = true;	
			
    		        });
				
				}(i));
	
	    	    img.src = imgSrc[i];
		
		        imgArray.push(img);
	
	            i++;
	
	        }
			
        },
		
		// check if all images are loaded, and if so call done else keep cheking
		loadCheck = function(){
			
			var i = 0, len = loaded.length, loadCount = 0;
			
			while(i < len){
				
				if(loaded[i]){
					
					loadCount += 1;
					
				}
				
				i++;
			}
			
			// if all are loaded call done
			if(loadCount === len){
				
				done();
				
		    // else keep checking
			}else{
				
				setTimeout(loadCheck, 500);
				
			}
			
		},
		
		// the conrol function is what will be returned to the global variable
		control = function(alpha, beta, cappa){
			
			// a switch!? i think i am going to be sick.
			switch(typeof alpha){
				
				// if alpha is a number
				case 'number':
				
				    return imgArray[alpha];
				
				break;
				
				// if alpha is a string
				case 'string':
				
					if(alpha === 'load'){
						
						console.log('okay i will load ' + beta);
						loadImages(beta);
						done = cappa;
						loadCheck();
						
					}
				
				break;
					
			}
			
		};
	
		return control; 
		
	}()),
	
    foot = {
		
		radian : 0,
		headRadian : 0,
		x: 160,
		y: 120,
		w: 40,
		h: 65,
		
		frame : 0,
		maxFrame : 200,
		per : 0,
		
		states : [
		
		    {
				
				statePer : 0.20, // if current frame per is <= statePer this is the current state
				mess : 'state 0',
				
				update : function(){
					
					foot.radian = 1 - (foot.per * 5 * 2);
					foot.headRadian = foot.per * 2.5;
					
					
				}
						
			},
			
			{
				
				statePer : 0.5,
				mess : 'state 1',
				
				update : function(){
					
					foot.radian = -1;
					foot.headRadian = 0.5;
						
				}
				
			},
			
			{
				
				statePer : 1,
				mess : 'state 2',
				
				update : function(){
					
					foot.radian = -1 + ( (foot.per - 0.5) / 0.5 * 2 );
					foot.headRadian = 0.5 - (foot.per - 0.5);
					
				}
				
			}
		
		],
		
		// find the current state based on frame out of maxFrame
		findCurrentState : function(){
			
			
			var i = 0, len = this.states.length;
			
			this.per = this.frame / this.maxFrame;
			
			while(i < len-1){
				
				if(this.per <= this.states[i].statePer){
					
					break;
				}
				
				i++;
			}
			
			return this.states[i];
			
		},
		
		
		step : function(frame){
			
			
			if(frame === undefined){
				
				this.frame += 1;
				
				if(this.frame === this.maxFrame){
					
					this.frame = 0;
					
				}
				
				
				
			}else{
				
				this.frame = frame;
				
			}
			
		},
		
		// set foot state by frame out of maxFrame
		setByFrame : function(frame){
			
			var state;
			
			if(frame){
			    this.frame = frame;
			}
			
			state = this.findCurrentState();
			
			// update by current state
			state.update();
			
			this.y = 180 - 400 * (this.per - Math.pow(this.per, 2));
			
		},
		
		// draw the foot to the given context
		draw : function(ctx){
			
			var x,y;
			
			// draw background
			// ALERT! maybe media should be pulled into foot?
			
			//x = 320 - this.per * 320;
			//y = this.y;
			
			//back 3
			x = 320 - this.per * 320;
			y = 213 - 420 + this.y;
			
			//ctx.drawImage(media[0],x,-this.y);
			//ctx.drawImage(media[0],x,y,320,240,0,0,320,240);
			ctx.drawImage(media(0),x,y,320,240,0,0,320,240);
			
			
			ctx.strokeStyle = '#ffffff';
			
			// draw foot
			ctx.save();
			ctx.translate(this.x,this.y);
			ctx.rotate(this.radian);
			ctx.drawImage( media(2), -75, -this.h / 2, 100, 100);
			//ctx.strokeRect( -this.w / 2, -this.h / 2, this.w, this.h);
			
			//ctx.strokeRect( -this.w/4, -this.h/4 + this.h/8, this.w/2, this.h/2);
			ctx.restore();
			
			// draw head
			ctx.save();	
			x = Math.cos(this.radian - 1.57) * 30 + this.x;
			y = Math.sin(this.radian - 1.57) * 30 + this.y;
			
			ctx.translate(x,y);
			ctx.rotate(this.headRadian);
			ctx.drawImage(media(1), -40, -40, 80,80);
			//ctx.strokeRect(-35, -35, 70, 70);
			
			
			//ctx.drawImage(media(1), x-35, y-35, 70,70)
			//ctx.strokeRect(x-35, y-35, 70, 70);			
			ctx.restore();
			
		}
		
	},

    // start will be called once before running main loop
    start = function(){

	    media(
		    'load', 
		    [
			    'img/bigfoot_back3.png',
				'img/nick2.png',
				'img/foot.png'
			], 
			function(){
			
			    //media(0);
			
			    loop();
			
		    }
		);
	
	    // Alert! maybe my image loaded should be part of foot or another module.
		/*
	    var img = new Image();
		
		img.addEventListener('load', function(e){
			
		   loop();	
			
		});
		
		img.src = "img/bigfoot_back.png";
		
		media.push(img);
	*/
    },

    // what to do on each frame tick
    update = function(){

        // update the foot
		foot.setByFrame();
		
		foot.step();

    },

    // what to draw to canvas
    draw = function(ctx){

        // background
        ctx.fillStyle='#000000';
        ctx.fillRect(0,0,canvas.width,canvas.height);

		
		
		
		foot.draw(ctx);
		
    },

    // main app loop
    loop = function(){

        requestAnimationFrame(loop);

        update();
        draw(context);


    };

    // start it (click run button to start this demo)
    start();
    

}());
                    