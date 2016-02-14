// Blank Quick Canvas Template
(function() {

    // get references to the canvas and canvas context
    var canvas = document.getElementById('quickcanvas_canvas'),
        context = canvas.getContext('2d'),


        frame = 0,
        maxFrame = 30,
        maxLevels = 15,        
        levels = [],

        // start will be called once before running main loop
        start = function() {

            loop();

        },

        // what to do on each frame tick
        update = function() {

            var per = frame / maxFrame, i;

           i=0;
           levels = [];
           while(i < maxLevels){

                levels[i] = {             
                    w: canvas.width  * (i / maxLevels+1) * (1-per),
                    h: canvas.height  * (i / maxLevels+1) * (1-per)
                };

                levels[i].x = canvas.width- levels[i].w;
                levels[i].y = canvas.height - levels[i].h;

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
            ctx.fillText(frame, 0,0);

        },

        // main app loop
        lastFrame = new Date(),
        loop = function() {

            requestAnimationFrame(loop);

            if(new Date() - lastFrame >= 100){
                update();
                draw(context);
                lastFrame = new Date();
            }


        };

    // start it (click run button to start this demo)
    start();


}());