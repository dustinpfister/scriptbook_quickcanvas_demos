// Circles

var Circles = function(conf){

	
};

Circles.prototype = {
	
	
};

var cir = new Circles();

console.log(cir);

(function(){

    // get references to the canvas and canvas context
    var canvas = document.getElementById('quickcanvas_canvas'),
    context = canvas.getContext('2d'),
	


    // start will be called once before running main loop
    start = function(){

        loop();

    },

    // what to do on each frame tick
    update = function(){

        // update your state here

    },

    // what to draw to canvas
    draw = function(ctx){

        // background
        ctx.fillStyle='#000000';
        ctx.fillRect(0,0,canvas.width,canvas.height);

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
                    