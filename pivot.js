// piviot


var pivot = (function(){
	
	var state = {
		
		points : [],
		distance : 100,
		radian : 1.57,
		pivot : 1,
		moves : 5,
		clockWise: -1,
		lines : []
		
	};
	
	
	return {
		
		state : state,
		
		setUp : function(sx,sy, radian, distance){
			
			state.points = [];
			state.radian = radian;
			state.distance = distance;
			
			state.points.push({
				
				x : sx,
				y : sy
			
		    });
			
			state.points.push({
				
				x : Math.cos(state.radian) * distance + sx,
				y : Math.sin(state.radian) * distance + sy
				
			});
			
		},
		
		step : function(){
			
			//state.radian += Math.PI / 180;
			
			var mvPt = state.points[state.pivot],
			stPt = state.points[state.pivot === 0 ? 1 : 0];
		
			
			//state.radian = Math.atan2(mvPt.y - stPt.y, mvPt.x - stPt.x);
			var angle = Math.atan2(mvPt.y - stPt.y, mvPt.x - stPt.x);
			
			
			
			state.radian = angle + Math.PI / 180 * 4 * state.clockWise;
			
			
			state.moves -= 1;
			
			if(state.moves === 2){
			
			    state.pivot += 1;
			    if(state.pivot === 2){state.pivot = 0;}
				
			    state.moves = Math.floor(Math.random() * 40) + 5;
			    state.clockWise = Math.floor(Math.random() * 2) ? 1 : -1;
				
				state.lines.push(
				    [
					    {x: state.points[0].x, y : state.points[0].y},
						{x: state.points[1].x, y : state.points[1].y}
					]
				);
				
				if(state.lines.length === 100){
					
					state.lines.shift();
					
				}
			}
			
			mvPt.x = Math.cos(state.radian) * state.distance + stPt.x;
			mvPt.y = Math.sin(state.radian) * state.distance + stPt.y;
			
		}
		
	}
	
}());


(function(){

    // get references to the canvas and canvas context
    var canvas = document.getElementById('quickcanvas_canvas'),
    context = canvas.getContext('2d'),
	

    // additional variables that have to do with your quick canvas should go here


    // start will be called once before running main loop
    start = function(){

	    pivot.setUp(160,120,0,10);
	
        loop();

    },

    // what to do on each frame tick
    update = function(){

        // update your state here
        pivot.step();
		
		
    },

    // what to draw to canvas
    draw = function(ctx){

        // background
        ctx.fillStyle='#000000';
        ctx.fillRect(0,0,canvas.width,canvas.height);

		// draw points
		ctx.strokeStyle = '#ffffff';
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(pivot.state.points[0].x, pivot.state.points[0].y);
		ctx.lineTo(pivot.state.points[1].x, pivot.state.points[1].y);
		ctx.stroke();
		
		// draw lines
		var i=0, len = pivot.state.lines.length;
		while(i < len){
			
			ctx.strokeStyle = 'rgba(0,255,0,'+Number(i / len)+')';
			
            ctx.beginPath();
		    ctx.moveTo(pivot.state.lines[i][0].x, pivot.state.lines[i][0].y);
		    ctx.lineTo(pivot.state.lines[i][1].x, pivot.state.lines[i][1].y);
		    ctx.stroke();
			
			i++;
		}
		
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
                    