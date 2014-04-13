$(document).ready(function() {
  console.log( "ready!" );
  
 
$("#button1").one("click", function() {
  $("#physicsjs").show();
  $("#button2").show(3000);
});

$("#button2").click(function () {
  $("#physicsjs").hide("fast");
  $("#threejs").show();
})

/**
 * PhysicsJS by Jasper Palfree <wellcaffeinated.net>
 * http://wellcaffeinated.net/PhysicsJS
 *
 * Simple "Hello world" example
 */  
Physics(function(world){

  var viewWidth = 500;
  var viewHeight = 300;
        
  var renderer = Physics.renderer('canvas', {
    el: 'physicsjs',
    width: viewWidth,
    height: viewHeight,
    meta: false, // don't display meta data
    styles: {
        // set colors for the circle bodies
        'circle' : {
            strokeStyle: 'hsla(60, 37%, 17%, 1)',
            lineWidth: 1,
            fillStyle: 'hsla(60, 37%, 57%, 0.8)',
            angleIndicator: 'hsla(60, 37%, 17%, 0.4)'
        }
    }
  });

  // add the renderer
  world.add( renderer );
  // render on each step
  world.subscribe('step', function(){
    world.render();
  });
  
  // bounds of the window
  var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
  
  // constrain objects to these bounds
  world.add(Physics.behavior('edge-collision-detection', {
      aabb: viewportBounds,
      restitution: 0.99,
      cof: 0.99
  }));

  // add a circle
  world.add(
      Physics.body('circle', {
        x: 50, // x-coordinate
        y: 30, // y-coordinate
        vx: 0.2, // velocity in x-direction
        vy: 0.01, // velocity in y-direction
        radius: 20
      })
  );

  // ensure objects bounce when edge collision is detected
  world.add( Physics.behavior('body-impulse-response') );

  // add some gravity
  world.add( Physics.behavior('constant-acceleration') );

  // subscribe to ticker to advance the simulation
  Physics.util.ticker.subscribe(function( time, dt ){
    
      world.step( time );
  });

  // start the ticker
  Physics.util.ticker.start();

}); 
var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);

			var geometry = new THREE.CubeGeometry(1,1,1);
			var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
			var cube = new THREE.Mesh(geometry, material);
			scene.add(cube);

			camera.position.z = 5;

			var render = function () {
				requestAnimationFrame(render);

				cube.rotation.x += 0.1;
				cube.rotation.y += 0.1;

				renderer.render(scene, camera);
			};

			render();

});