// Blank Quick Canvas Template
(function() {

    // get references to the canvas and canvas context
    var canvas = document.getElementById('quickcanvas_canvas'),
        context = canvas.getContext('2d'),


        frame = 0,
        maxFrame = 200,
        maxLevels = 14,
        spaceing = 200,
        levels = [],

        // start will be called once before running main loop
        start = function() {

            loop();

        },

        // what to do on each frame tick
        update = function() {

            var per = frame / maxFrame, i, d;

           i=0;
           levels = [];
          

           while(i < maxLevels){

                levels[i] = {             
                    w: canvas.width / 4,
                    h: canvas.height  / 4,
                    radian: 0
                };

                d =  (i - maxLevels / 2) * (spaceing * (per - 0.5 ));

                levels[i].radian = Math.PI * 2 * per;

                levels[i].x = Math.cos(levels[i].radian) * d + canvas.width / 2 - levels[i].w /2;
                levels[i].y = Math.sin(levels[i].radian) * d + canvas.height / 2 - levels[i].h /2;

                i++;             
            }

            frame += 1;
            if(frame === maxFrame){ frame = 0; }

        },

        // what to draw to canvas
        draw = function(ctx) {

            // background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

           // levels
           ctx.strokeStyle = '#000000';
           ctx.lineWidth = 3;
           var i = 0, len = levels.length;
           while(i < len){
               ctx.strokeRect(levels[i].x, levels[i].y, levels[i].w, levels[i].h);
               i++;
           }

            // info
            ctx.fillStyle = '#000000';
            ctx.textBaseline = 'top';
            ctx.fillText(levels[0].radian, 0,0);

        },

        // main app loop
        lastFrame = new Date(),
        loop = function() {

            requestAnimationFrame(loop);

            if(new Date() - lastFrame >= 33){

                update();
                draw(context);
                lastFrame = new Date();

            }


        };

    // start it (click run button to start this demo)
    start();


}());