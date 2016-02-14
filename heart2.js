// Heart

var drawGrid = function(ctx,sx,sy,cw,ch,cellSize){
	
	var i;
	
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#000000';
	
	i=0;
	while(i < ch){
		
		ctx.beginPath();
		ctx.moveTo(sx,sy + cellSize * i);
		ctx.lineTo(sx + cw * cellSize, sy + cellSize * i);
		ctx.stroke();
		
		i++;
	}
	
	i=0;
	while(i < cw+1){
		
		ctx.beginPath();
		ctx.moveTo(sx + cellSize * i, sy);
		ctx.lineTo(sx + cellSize * i, sy + (ch-1) * cellSize);
		ctx.stroke();
		
		i++;
	}
	
},

drawHeart = function(ctx, cx, cy, maxRadius, n){
	
	var radian = Math.PI* 1.5,
	radius,
	x,
	y,
	startRadius = maxRadius / n,
	i=0,
	points = 40, 
	per;
	
	ctx.strokeStyle = '#ff0000';
	ctx.lineWidth = 3;
	ctx.fillStyle = 'rgba(255,0,0,0.6)';
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
	
},

// draw the info given via an object
drawInfo = function(ctx, infoObj, x, y){
	
	var text,
	charSize = 10,
	charWidth = 13;
	
	if(x === undefined){ x = 10; }
	if(y === undefined){ y = 10; }
	
	ctx.fillStyle = '#00ffff';
	ctx.textBaseline = 'top';
	ctx.font = charSize + 'px courier';
	
	for(var props in infoObj){
	
	
	    //val = typeof infoObj[props] === 'object' ? String(infoObj[props]).replace(/,/g, '/') : infoObj[props];
	    //text = props + ' : ' + infoObj[props];
	    //text = props + ' : ' + val; 
		
	    text = props + ' : ' + String(infoObj[props]).replace(/,/g, '/');
	
        ctx.fillStyle = 'rgba(0,0,0,0.5)';	
		ctx.fillRect(x,y,text.length * charWidth,charSize);
		ctx.fillStyle = '#ffffff';
		ctx.fillText(text, x+1, y-1);
		
		y += charSize;
		
	}
	
};

(function(){

    // get references to the canvas and canvas context
    var canvas = document.getElementById('quickcanvas_canvas'),
    context = canvas.getContext('2d'),
	
	frame = 0,
	maxFrame = 50,
	
	beat = 1,
	restBeat = 10,
	theBeat = 0,
	upBeat = true,
	beatCount = 0,
	lastTick = new Date(),

    // start will be called once before running main loop
    start = function(){
	
        loop();

    },

    // what to do on each frame tick
    update = function(){

	    var beatFrames = maxFrame / 2,
		relFrame = frame - beatFrames,
		relPer = (relFrame / beatFrames); 
	
	    if(new Date() - lastTick >= 33){
            
			// rest for half the frames
			restBeat = !Boolean(Math.floor(frame / ( maxFrame / 2 )));
			
			// if rest
			if(restBeat){
				
			    theBeat = 0;
			
			// else beating
			}else{
				
				//theBeat = 25 - Math.pow( ( ( 0.5 - relPer ) / 0.5 ) , 2 ) * 25;
				
				var beatState = Math.floor(relFrame / (beatFrames / 2)),
				halfBeatFrames = beatFrames / 2,
				per = (relFrame - (beatState * halfBeatFrames)) /  halfBeatFrames
				theBeat =  25 - Math.pow( ( ( 0.5 - per ) / 0.5 ) , 2 ) * 25;
				
			}
			
			// step frame
			frame += 1;
			if(frame === maxFrame){ frame = 0; }
			
			// reset last tick to current time
			lastTick = new Date();
			
		}
	
		/*
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
		*/
		
    },

    // what to draw to canvas
    draw = function(ctx){

        // background
        ctx.fillStyle='#ffffff';
        ctx.fillRect(0,0,canvas.width,canvas.height);

		//drawGrid(ctx,sx,sy,cw,cy,cellSize);
		drawGrid(ctx,16,8,9,8,32);
		
		/*
        drawInfo(
		    ctx,
			{
				alone : true,
				heartIs : 'black',
				frame : [frame, maxFrame],
				rest : restBeat,
				theBeat : theBeat.toFixed(2)
				
			}
		);
		*/
		
		drawHeart(ctx, 160,60, 140 + theBeat, 10);
		
		
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
                    