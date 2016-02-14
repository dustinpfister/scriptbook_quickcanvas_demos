// Hero Quest

var hq = (function(){
	
	// the public object
	var pub = {
		
		
	};
	
	// hero starting stats
	var heros = {
		
		barbarian : {
			
			maxHP : 100,
			maxMana : 0,
			strength: 10,
			iq: 85
			
		}
		
	};
	
	// monster starting stats
	var monsters = {
	
        goblin : {
			
			maxHP : 60,
			maxMana : 0,
			strength : 4
			
		}	
		
	};
	
	// Figure constructor a Figure is a hero or a monster
	var Figure = function(stats){

		
	};
	
	// Figure prototype
	Figure.prototype = {
		
		// attack a single target, with the given weapon
		attackTarget : function(target, weapon){
			
			
			
		},
		
		// attack a map cell
		attackCell : function(){
			
			
		}
		
	};
	
	// the Hero constructor
	var Hero = function(){
		
		
	};
	
	// Hero prototype
	Hero.prototype = new Figure();
	
	// the Monster constructor
	var Monster = function(){
		
		
	};
	
	// Monster prototype
	Monster.prototype = new Figure();
	
	// the Map constructor
	var Map = function(){
		
		
	};
	
	// HQ public methods
	return {
		
		
		
	};
	
}());


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
                    