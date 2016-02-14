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


shockGrid = function(ctx, beat){


	var i,x,y,w,h,CX,CY,
	cellSize = 32,
	cw = 10,
	ch = 10,
	sx = 160 - cellSize * cw / 2,
	sy = 120 - cellSize * ch / 2;
	
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'rgba(255,255,255,0.1)';
	ctx.fillStyle='#000000';
	i=0;
	while(i < cw * ch){
		
		CX = Math.floor( i % cw);
		CY = Math.floor( i / cw);
		
		x = (sx-beat/2) + CX * cellSize + (beat / cw * CX) + (beat / cw / 2);
		y = (sy-beat/2) + CY * cellSize + beat / ch * CY;
		w = cellSize;
		h = cellSize;
		
		ctx.fillRect(x,y,w,h);
		ctx.strokeRect(x,y,w,h);
		
		
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
	ctx.fillStyle = 'rgba(255,0,0,0.8)';
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

drawInfo = function(ctx, x, y){
	
	if(x === undefined){x=0;}
	if(y === undefined){y=0;}
	
	ctx.textBaseline = 'top';
	ctx.font = '12px arial';
	
	ctx.fillStyle='rgba(0,0,0,0.4)';
	ctx.fillRect(x+16, y+8 + 32 * 6, 96, 32);
	
	
	ctx.fillStyle='rgba(255,255,255,0.8)';
	ctx.fillText('valentinius 1.1.0', x+20, y+210);
	
},

// draw the info given via an object
drawDebug = function(ctx, infoObj, x, y){
	
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
	maxFrame = 75,
	
	beat = 1,
	restBeat = 10,
	theBeat = 0,
	upBeat = true,
	beatCount = 0,
	lastTick = new Date(),
	
	play = true,
	saveFiles = false,
	saveCount = 0,

    // start will be called once before running main loop
    start = function(){
	
        loop();

    },

    // what to do on each frame tick
    update = function(tick){

	    var beatFrames = maxFrame / 2,
		relFrame = frame - beatFrames,
		relPer = (relFrame / beatFrames),
        beatState,
		halfBeatFrames,
		per;		
	
	    // if tick is a number assume it is a frame number to set to
	    if(typeof tick === 'number'){
			
			frame = tick;
			
		}
		
		// assume tick up if undefined
		if(typeof tick === undefined){
			
			tick = 'up';
			
		}
		
		// rest for half the frames
		restBeat = !Boolean(Math.floor(frame / ( maxFrame / 2 )));
			
		// if rest
		if(restBeat){
				
		    theBeat = 0;
			
		// else beating
		}else{
				
			beatState = Math.floor(relFrame / (beatFrames / 2)),
			halfBeatFrames = beatFrames / 2,
			per = (relFrame - (beatState * halfBeatFrames)) /  halfBeatFrames
			theBeat =  35 - Math.pow( ( ( 0.5 - per ) / 0.5 ) , 2 ) * 35;
				
		}
		
		
		
		
		// if tick is string tick frame up or down.
	    if(typeof tick === 'string'){
			
			if(new Date() - lastTick >= 33){
			
			    if(saveFiles && saveCount < maxFrame){
			
			
		    canvas.toBlob(function(blob) {
                saveAs(blob, 'frame_'+frame+'.png');
            });
		
			
			saveCount += 1;
		}
			
                // step frame
			    frame += tick === 'up' ? 1 : -1;
				
			    if(frame === maxFrame){ frame = 0; }
			    if(frame === -1){ frame = maxFrame-1; }
			
			
			    // reset last tick to current time
			    lastTick = new Date();
			
			}
			
		}
			
    },

    // what to draw to canvas
    draw = function(ctx){

        // background
        ctx.fillStyle='#ffffff';
        ctx.fillRect(0,0,canvas.width,canvas.height);

		//drawGrid(ctx,sx,sy,cw,cy,cellSize);
		//drawGrid(ctx,16,8,9,8,32);
		
		shockGrid(ctx, theBeat);
		
		//drawInfo(ctx, 192 * (frame / maxFrame));
		
		drawHeart(ctx, 160,60, 140 + theBeat, 10);
		
		/*
        drawDebug(
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
	
	    
		
    },

    // main app loop
    loop = function(){

        requestAnimationFrame(loop);

		if(play){
            update('up');
	    }
		
        draw(context);

    };

    // start it (click run button to start this demo)
    start();
	
	window.addEventListener('keydown', function(e){
		
		// a 65, d 68, p 80
		
		switch(e.keyCode){
			
			case 80:
			
			    play = !play;
			
			break;
			
			case 65:
			
			    frame -= 1;
				if(frame === -1){ frame = maxFrame - 1;}
				update(frame);
				
			break;
			
			case 68:
			
			    frame += 1;
				if(frame === maxFrame){ frame = 0;}
				update(frame);
				
			break;
			
		}
		
		//document.write(e.keyCode);
		
	});

}());
                    