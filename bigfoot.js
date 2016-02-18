// Blank Quick Canvas Template

(function(){

    // get references to the canvas and canvas context
    var canvas = document.getElementById('quickcanvas_canvas'),
    context = canvas.getContext('2d'),
	
	
	media = [],
	
	

    foot = {
		
		radian : 0,
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
					
					
					
				}
				
				
			},
			
			{
				
				statePer : 0.5,
				mess : 'state 1',
				
				update : function(){
					
					foot.radian = -1;
					
					
				}
				
			},
			
			{
				
				statePer : 1,
				mess : 'state 2',
				
				update : function(){
					
					foot.radian = -1 + ( (foot.per - 0.5) / 0.5 * 2 );
					
					
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
				
				
				console.log(this.frame);
				
				
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
			
			
			this.y = 180 - 200 * (this.per - Math.pow(this.per, 2));
			
		},
		
		// draw the foot to the given context
		draw : function(ctx){
			
			ctx.drawImage(media[0],0,-this.y);
			
			ctx.save();
			ctx.translate(this.x,this.y);
			ctx.rotate(this.radian);
			ctx.strokeStyle = '#ffffff';
			ctx.strokeRect( -this.w / 2, -this.h / 2, this.w, this.h);
			ctx.strokeRect( -this.w/4, -this.h/4 + this.h/8, this.w/2, this.h/2);
			ctx.restore();
			
		}
		
	},


    // start will be called once before running main loop
    start = function(){

	
	    var img = new Image();
		
		img.addEventListener('load', function(e){
			
		   loop();	
			
		});
		
		img.src = "img/bigfoot_back.png";
		
		media.push(img);
	
	
        

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
                    