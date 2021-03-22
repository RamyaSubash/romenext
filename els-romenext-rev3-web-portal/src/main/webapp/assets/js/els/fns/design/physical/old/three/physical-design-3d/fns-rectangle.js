/**
 * 
 */
function toDrawRectangle3D() {
		
	var img = document.getElementById("img_rect");
	if(GlobalUtils.retrieveImgname(img) == "rcfl.png") {           // first time clicked on Rectangle
		
		if(action3D != 'rect'){
//			May be need to reset previous action-image    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			resetGCImgs();
			img.src = "/webgui/assets/img/icons/rcfl_01.png";
			action3D = "rect";
			console.log("draw a rect");
			if (mouseStatus == 0) { mouseStatus = 1; }	
			selectedLine = [];
			selectedElementInters = [];
			
			
		}else{                                       // second click on contour
			console.log("Error  1  =====: previous action not finished !! " + action3D);	
		}
	}else if(GlobalUtils.retrieveImgname(img) == "rcfl_01.png") { 
		      if(action3D == 'rect'){
		    	                    if(true){
		    	                    	saveRectangle3D("rect" );	    	                    
		    	  					    img.src = "/webgui/assets/img/icons/rcfl.png";	    	  		
			    	  					action3D = null;
			    	  					selectedLine = [];
			    						selectedElementInters = [];		    	  							    	  		
		    	                    }
			}else {  
				console.log("Error   2  =====  resetting img ");	
				img.src = "/webgui/assets/img/icons/rcfl.png";
				action3D = null;
			}	
		}				
}

function addShape( shape, color, x, y, z, rx, ry, rz, s ) {
	var geometry = new THREE.ShapeGeometry( shape );
	var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: color, side: THREE.DoubleSide } ) );
	mesh.position.set( x, y, z - 125 );
	mesh.rotation.set( rx, ry, rz );
	mesh.scale.set( s, s, s );
	group.add( mesh );
}

function drawRectangle3D(){
//	Calculate Length and Width of rectangle 
	
	if (selectedIntersections[0].x < selectedIntersections[1].x) {
		x1 = selectedIntersections[0].x;
		x2 = selectedIntersections[1].x;
	} else {
		x2 = selectedIntersections[0].x;
		x1 = selectedIntersections[1].x;
	}
	
	if (selectedIntersections[0].y < selectedIntersections[1].y) {
		y1 = selectedIntersections[0].y;
		y2 = selectedIntersections[1].y;
	} else {
		y2 = selectedIntersections[0].y;
		y1 = selectedIntersections[1].y;
	}
	
    console.log("x1 = " + x1 + " x2 = " + x2 + " y1 = " + y1 + " y2 = " + y2);
	
	var rectWidth  = x2 - x1;
	var rectLength = y2 - y1;

	var rectShape = new THREE.Shape();
	rectShape.moveTo( 0,0 );
	rectShape.lineTo( 0, rectWidth );
	rectShape.lineTo( rectLength, rectWidth );
	rectShape.lineTo( rectLength, 0 );
	rectShape.lineTo( 0, 0 );
	
}















