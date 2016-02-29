// trig

(function(){

    // get references to the canvas and canvas context
    var canvas = document.getElementById('quickcanvas_canvas'),
    context = canvas.getContext('2d'),

    frame = 6,
    maxFrame = 200,
    px,
    py,
    qx,qy,
    radian,

    // start will be called once before running main loop
    start = function(){

        console.log('sure');
        loop();

    },

    // what to do on each frame tick
    update = function(){

        radian = Math.PI * 2 / maxFrame * frame;
        var q = radian / (Math.PI / 2),
        qRadian = (Math.PI / 2 * Math.floor(q));
        
        qx = Math.cos(qRadian) * 100 + 160;
        qy = Math.sin(qRadian) * 100 + 120; 
        
        px = Math.cos(radian) * 100 + 160;
        py = Math.sin(radian) * 100 + 120;
        
        
        frame += 1;
        if(frame === maxFrame){ frame = 0;}

    },

    // what to draw to canvas
    draw = function(ctx){

        // background
        ctx.lineWidth = 3;
        ctx.fillStyle='#000000';
        ctx.fillRect(0,0,canvas.width,canvas.height);

        // draw graph
        ctx.strokeStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(160,0);
        ctx.lineTo(160,240);
        ctx.moveTo(0,120);
        ctx.lineTo(320,120);
        
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(160,120,100,0,Math.PI * 2);
        //ctx.ellipse(160,120,150,110,0,0,Math.PI*2);
        ctx.stroke();
        
        
        // draw triangle
        ctx.strokeStyle = '#00ff00';
        ctx.beginPath();
        ctx.moveTo(160, 120);
        ctx.lineTo(px,py);
        ctx.lineTo(qx,qy);
        ctx.closePath();
        ctx.stroke();
        
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
                    