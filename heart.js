// Heart

var drawGrid = function(ctx,sx,sy,cw,ch,cellSize){
	
	ctx.lineWidth = 3;
	ctx.strokeStyle = '#ffffff';
	
	var i=0;
	while(i < ch){
		
		ctx.beginPath();
		ctx.moveTo(sx,sy + cellSize * i);
		ctx.lineTo(sx + cw * cellSize, sy + cellSize * i);
		ctx.stroke();
		
		i++;
	}
	
	var i=0;
	while(i < cw+1){
		
		ctx.beginPath();
		ctx.moveTo(sx + cellSize * i, sy);
		ctx.lineTo(sx + cellSize * i, sy + (ch-1) * cellSize);
		ctx.stroke();
		
		i++;
	}
	
	
};

var drawHeart = function(ctx, cx, cy, maxRadius, n){
	
	var radian = Math.PI* 1.5,
	radius,
	x,
	y,
	startRadius = maxRadius / n,
	i=0,
	points = 40, 
	per;
	
	ctx.strokeStyle = '#ffffff';
	ctx.lineWidth = 3;
	//ctx.fillStyle = 'rgba(255,0,0,0.5)';
	ctx.fillStyle = 'rgba(0,0,0,1)';
	ctx.beginPath();
	
	while(i < points){
			
		per = i < points / 2 ? i / (points / 2) : 1 - (( i - points / 2 ) / (points / 2));
		
		radian = Math.PI * 1.5 - Math.PI * 2 / points * i ;
		radius = startRadius + (maxRadius - startRadius) * per;
		
		x = Math.cos(radian) * radius + cx;
		y = Math.sin(radian) * radius + cy;
		
		ctx.lineTo(x,y);
		
		i++;
	}
    ctx.closePath();
	ctx.stroke();
	ctx.fill();
	
};

(function(){

    // get references to the canvas and canvas context
    var canvas = document.getElementById('quickcanvas_canvas'),
    context = canvas.getContext('2d'),
	
	beat = 1,
	restBeat = 10,
	sizePlus = 0,
	upBeat = true,
	beatCount = 0,
	
	lastTick = new Date(),

    // start will be called once before running main loop
    start = function(){

	
        loop();

    },

    // what to do on each frame tick
    update = function(){

        // update your state here
		if(new Date() - lastTick >= 33){
            
			if(restBeat){
				
				restBeat -= 1;
				
			}else{
			
			    beat += upBeat ? 1 : - 1;
			    sizePlus = beat * 2;
			
			    if(beat === 1 || beat === 10){ upBeat = !upBeat; beatCount +=1; }
			    
				if(beatCount === 4){
					
					beatCount = 0;
					restBeat = 10;
					
				}
				
			}
			
			lastTick = new Date();
		}
    },

    // what to draw to canvas
    draw = function(ctx){

        // background
        ctx.fillStyle='#000000';
        ctx.fillRect(0,0,canvas.width,canvas.height);

		
		//drawGrid(ctx,sx,sy,cw,cy,cellSize);
		drawGrid(ctx,16,8,9,8,32);
		
		
		drawHeart(ctx, 160,60, 140+sizePlus, 10);
		
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
                    