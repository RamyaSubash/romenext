var RMPHYSOBJ = (function( BABYLON ) {
	
	var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
	
	
    var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
    var scene = null;
    
    var isAxisName = function( name ) {
    	
    	if( name === "axisZ" || name === "axisY" || name === "axisX" || name === "X_label" ) {
    		return true;
    	}
    	return false;
    }
    
    var createScene = function ( ) {

    	 // Create the scene space
	    scene = new BABYLON.Scene(engine);

	    // Add a camera to the scene and attach it to the canvas
	    // var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
	    
	    // updated camera
	    var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 50, BABYLON.Vector3.Zero(), scene );

	    camera.attachControl(canvas, true);

	    // Add lights to the scene
	    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
	    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

	    
	    // axis information
	    var createAxis = function(size) {
	
	    var makeTextPlane = function(text, color, size) {
	        var dynamicTexture = new BABYLON.DynamicTexture("AxisDynamicTexture", 50, scene, true);
	        dynamicTexture.hasAlpha = true;
	        dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
	        var plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
	        plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
	        plane.material.backFaceCulling = false;
	        plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
	        plane.material.diffuseTexture = dynamicTexture;
	        return plane;
	     };
	
	       var makeTextPlane_namedLabel = function(text,  color, size) {
	        var dynamicTexture = new BABYLON.DynamicTexture("AxisDynamicTexture", 50, scene, true);
	        dynamicTexture.hasAlpha = true;
	        dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
	
	        var plane = new BABYLON.Mesh.CreatePlane( text + "_label", size, scene, true);
	        plane.material = new BABYLON.StandardMaterial( "TextPlaneMaterial", scene);
	        plane.material.backFaceCulling = false;
	        plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
	        plane.material.diffuseTexture = dynamicTexture;
	        return plane;
	     };
	  
	    var axisX = BABYLON.Mesh.CreateLines("axisX", [ 
	      new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), 
	      new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
	      ], scene);
	    axisX.color = new BABYLON.Color3(1, 0, 0);
	    var xChar = makeTextPlane_namedLabel("X", "red", size / 10);
	    xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
	
	    var axisY = BABYLON.Mesh.CreateLines("axisY", [
	        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0), 
	        new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
	        ], scene);
	    axisY.color = new BABYLON.Color3(0, 1, 0);
	    var yChar = makeTextPlane("Y", "green", size / 10);
	    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
	
	    var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
	        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
	        new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
	        ], scene);
	    axisZ.color = new BABYLON.Color3(0, 0, 1);
	    var zChar = makeTextPlane("Z", "blue", size / 10);
	    zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
	
	  };
	
	var hideAxis= function() {
	    var tmpAxisX = scene.getMeshByName("axisX");
	
	    if( tmpAxisX ) {
	        axisX.setEnabled(false);
	        // disable text too
	        var tmpAxisXLabel = scene.getMeshByName("X_label"); 
	        tmpAxisXLabel.setEnabled( false );
	    }
	
	}
	
	var showAxis = function() {
	    var tmpAxisX = scene.getMeshByName("axisX");
	
	    if( tmpAxisX ) {
	        axisX.setEnabled(true); 
	        var tmpAxisXLabel = scene.getMeshByName("X_label"); 
	        tmpAxisXLabel.setEnabled( true );
	    }
	}
	
	
	  createAxis(100); 
	    
	    

	    // Add and manipulate meshes in the scene
//		    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:2}, scene);
	    
	    
	    
	    
//	    scene.onPointerDown = function (evt, pickResult) {
//	        // if the click hits the ground object, we change the impact position
//	        
//	        
//	        console.log("X raw : " + evt.x );
//	        
//	        if( pickResult.hit ) {
//		        console.log("X: " + pickResult.pickedPoint.x );
//		        console.log("Y: " + pickResult.pickedPoint.y );
//	        }
//
//	        
//	        if (pickResult.hit) {
//	        	
//	        	
//	            impact.position.x = pickResult.pickedPoint.x;
//	            impact.position.y = pickResult.pickedPoint.y;
//	        }
//	    };
//	     
//	    canvas.addEventListener("pointerdown", onPointerDown, true);
//	    canvas.addEventListener("pointerup", onPointerUp, true);
//	    canvas.addEventListener("pointermove", onPointerMove, true);
//
//	    scene.onDispose = function () {
//	        canvas.removeEventListener("pointerdown", onPointerDown);
//	        canvas.removeEventListener("pointerup", onPointerUp);
//	        canvas.removeEventListener("pointermove", onPointerMove);
//	    }
//	    
	    
	    
	    
	    

	    return scene;
    }	
    
    return {
    	/******* Add the create scene function ******/
            
            initEngine : function( canvasToAssign  ) {
            	
            	canvas = canvasToAssign;
            	engine = new BABYLON.Engine(canvas, true);
            	
            	  /******* End of the create scene function ******/    

                var scene = createScene(  ); //Call the createScene function
                
                engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene
    	            scene.render();
	    	    });
	
	
	    	    window.addEventListener("resize", function () { // Watch for browser/canvas resize events
	    	            engine.resize();
	    	    });
            },
            testing : function() {
            	console.log("THIS IS A TEST THAT WORKS");
            },
            renderNode : function( node ) {
            	console.log("Node dec:" + node.decoProperties[7].value );
            	
            	eval( node.decoProperties[7].value );
            	
            	// attempt to run the parent function
            	console.log("DOES THIS EXIST: " + parentx );
            	runParent();
            },
            resetView : function(  ) {
                for (let i = scene.meshes.length - 1; i >= 0; i--) {
                	console.log("Delete this mesh?:" + scene.meshes[ i ] );
                	
                	// don't delete the axis for now
                	var name =  scene.meshes[i].name;
                		
                	if( name === "axisZ" || name === "axisY" || name === "axisX" || name === "X_label" ) {
                		console.log("Found an axis label");
                	} else {
                		scene.removeMesh( scene.meshes[ i ] );                 		
                	}
                }
                
//            	for (let i = scene.children.length - 1; i >= 0; i--) {
//            	    if(scene.children[i].type === "Mesh")
//            	        scene.remove(scene.children[i]);
//            	}
            	
            	// scene.dispose();
            	// engine.dispose();
            	
            	// initEngine( canvasToAssign  );
            },
            renderParent : function( node ) {
            	
            	
            	console.log("Executing parent code for this");
            	
            	
            	if( typeof node.decoProperties !== "undefined" ) {
            		
                	if( typeof node.decoProperties[7] !== "undefined" ) {
                		if (typeof node.decoProperties[7].value !== "undefined") {
                    		eval( node.decoProperties[7].value );
                        	console.log("Finished eval call");
                        	
                        	if( typeof runParent !== "undefined") {
                        		runParent();                        		
                        	}
                    	} else {
                    		console.log("No value");
                    	}
                	} else {
                		console.log("No deco prop 7");
                	}
            	} else {
            		console.log("No deco Props");
            	}
            	
            	
            
            },
            renderChild : function( node ) {
            	
            	if( typeof node.decoProperties !== "undefined" ) {
            		
                	if( typeof node.decoProperties[7] !== "undefined" ) {
                		if (typeof node.decoProperties[7].value !== "undefined") {
                			console.log("Executing child code for this node");
                        	eval( node.decoProperties[7].value );
                        	console.log("Finsihed eval call");
                        	
                        	if( typeof runChild !== "undefined") {
                            	runChild();
                        	}
                    	} else {
                    		console.log("No value");

                    	}
                	} else {
                		console.log("No deco prop 7");
                	}


                	
            	}  else {
            		console.log("No deco Props");
            	}
            	
            }
    };

    

      

	   
})( BABYLON || {} );

  