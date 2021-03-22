/**
 * 
 */
// ==================== Function to return intersection point between two constructions lines
function checkIntersection(line1, line2){

	var result ={x: null, y:null, z: null, onLine1: false, onLine2:false};
//	Verify that lines are passed
	if(!line1 || !line2){
		console.log(" no lines provided");
		return result;
	}
//	Verify that Plane is defined
	if ((plane3DName != "xy") &&  (plane3DName != "yz")&&(plane3DName != "xz")){
		console.log("Missing or Wrong Plane Name");
		$('#console-log').append("<p style='color:red'>Missing or Wrong Plane Name for checking intersection</p>");
		return;
	}
	var denominator, a, b, numerator1, numerator2;
//	Check if pane = 'xy'
	
	if(plane3DName == "xy") {		
		denominator =(((line2.geometry.vertices[1].y - line2.geometry.vertices[0].y)*(line1.geometry.vertices[1].x - line1.geometry.vertices[0].x))-
				((line2.geometry.vertices[1].x - line2.geometry.vertices[0].x)*(line1.geometry.vertices[1].y - line1.geometry.vertices[0].y)));
		if(denominator == 0) { 
			return result; //  no intersection between the two lines
		}
		 a =  line1.geometry.vertices[0].y - line2.geometry.vertices[0].y;
		 b =  line1.geometry.vertices[0].x - line2.geometry.vertices[0].x;
		
		 numerator1 = ((line2.geometry.vertices[1].x - line2.geometry.vertices[0].x) * a) - ((line2.geometry.vertices[1].y - line2.geometry.vertices[0].y) * b);
		 numerator2 = ((line1.geometry.vertices[1].x - line1.geometry.vertices[0].x) * a) - ((line1.geometry.vertices[1].y - line1.geometry.vertices[0].y) * b);
		 a = numerator1 / denominator;
		 b = numerator2 / denominator;
		 
		 result.x = line1.geometry.vertices[0].x + (a * (line1.geometry.vertices[1].x - line1.geometry.vertices[0].x));
		 result.y = line1.geometry.vertices[0].y + (a * (line1.geometry.vertices[1].y - line1.geometry.vertices[0].y));
		 result.z = 0;
		 console.log(" value of res is : "+ result.x  + "   "+ result.y + "   "+ result.z);
		
		 if(a>0 && a<1) { result.onLine1 = true}
		 if (b > 0 && b < 1) {  result.onLine2 = true;  }
	}
	
    if(plane3DName == "yz"){
    	denominator =(((line2.geometry.vertices[1].z - line2.geometry.vertices[0].z)*(line1.geometry.vertices[1].y - line1.geometry.vertices[0].y))-
				((line2.geometry.vertices[1].y - line2.geometry.vertices[0].y)*(line1.geometry.vertices[1].z - line1.geometry.vertices[0].z)));
		if(denominator == 0) { 
			return result; //  no intersection between the two lines
		}
		 a =  line1.geometry.vertices[0].z - line2.geometry.vertices[0].z;
		 b =  line1.geometry.vertices[0].y - line2.geometry.vertices[0].y;
		
		 numerator1 = ((line2.geometry.vertices[1].y - line2.geometry.vertices[0].y) * a) - ((line2.geometry.vertices[1].z - line2.geometry.vertices[0].z) * b);
		 numerator2 = ((line1.geometry.vertices[1].y - line1.geometry.vertices[0].y) * a) - ((line1.geometry.vertices[1].z - line1.geometry.vertices[0].z) * b);
		 a = numerator1 / denominator;
		 b = numerator2 / denominator;
		 
		 result.x = 0;
		 result.y = line1.geometry.vertices[0].y + (a * (line1.geometry.vertices[1].y - line1.geometry.vertices[0].y));
		 result.z = line1.geometry.vertices[0].z + (a * (line1.geometry.vertices[1].z - line1.geometry.vertices[0].z));
		 console.log(" value of res is : "+ result.x  + "   "+ result.y + "   "+ result.z);
		
		 if(a>0 && a<1) { result.onLine1 = true}
		 if (b > 0 && b < 1) {  result.onLine2 = true;  }
    }
    if(plane3DName == "xz"){
    	denominator =(((line2.geometry.vertices[1].z - line2.geometry.vertices[0].z)*(line1.geometry.vertices[1].x - line1.geometry.vertices[0].x))-
				((line2.geometry.vertices[1].x - line2.geometry.vertices[0].x)*(line1.geometry.vertices[1].z - line1.geometry.vertices[0].z)));
		if(denominator == 0) { 
			return result; //  no intersection between the two lines
		}
		 a =  line1.geometry.vertices[0].z - line2.geometry.vertices[0].z;
		 b =  line1.geometry.vertices[0].x - line2.geometry.vertices[0].x;
		
		 numerator1 = ((line2.geometry.vertices[1].x - line2.geometry.vertices[0].x) * a) - ((line2.geometry.vertices[1].z - line2.geometry.vertices[0].z) * b);
		 numerator2 = ((line1.geometry.vertices[1].x - line1.geometry.vertices[0].x) * a) - ((line1.geometry.vertices[1].z - line1.geometry.vertices[0].z) * b);
		 a = numerator1 / denominator;
		 b = numerator2 / denominator;
		 
		 result.x = line1.geometry.vertices[0].x + (a * (line1.geometry.vertices[1].x - line1.geometry.vertices[0].x));
		 result.y =0;
		 result.z = line1.geometry.vertices[0].z + (a * (line1.geometry.vertices[1].z - line1.geometry.vertices[0].z));
		 console.log(" value of res is : "+ result.x  + "   "+ result.y + "   "+ result.z);
		
		 if(a>0 && a<1) { result.onLine1 = true}
		 if (b > 0 && b < 1) {  result.onLine2 = true;  }
    }
	
	return result;
	
}
//========================================================================
function verifyNewIntersection(intersect1, intersect2){
	if (intersect1.x == intersect2.x && intersect1.y == intersect2.y && intersect1.z == intersect2.z) {
		console.log("wrong line! select again");
		return false;}
	else { return true}
}
//=============================================================================
function updateContourHolder(contour){	
	contourHolder3D.push(contour);
}
//=============================================================================
function getIntersection(lineId1, lineId2) {
	var inter = {};
	  inter = checkIntersection( lineId1, lineId2);
      if(inter.x != null && inter.y != null && inter.z !=null) {  return inter;}
      else{console.log(" no Intersection found"); return null;}
}
//================================================================================

function setContour(lineColor, intersections, line) {
	
	var startPoint = [], endPoint=[];
	
	startPoint[0] = intersections[0].x;
	startPoint[1] = intersections[0].y;
	startPoint[2] = intersections[0].z;
	
	endPoint[0] = intersections[1].x;
	endPoint[1] = intersections[1].y;
	endPoint[2] = intersections[1].z;
	
	var tmpLine = drawLine3D(lineColor, startPoint, endPoint);
	tmpLine.dbParent = line.dbId;
	tmpLine.shapeType = line.shapeType;
	tmpLine.shape = 'LINE';
	lines3d.add(tmpLine);
	return tmpLine;
}

function addCountour(contour, plane3DName){
	scene.add(contour);
	if(plane3DName == "xy") {	
			setPlane(0,0,1);
	}else if(plane3DName == "yz"){
		    setPlane(1,0,0)
	}else if(plane3DName == "xz"){
			setPlane(0,1,0);
	}
			
	if (raycaster.ray.intersectPlane(plane, intersection)) {
		offset.copy(intersection).sub(contour.position);
	}

}


//=============================================================================================================================================
function saveContour3D(type, shapes){
//	Handling Errors 
	if(type != 'cntr'){
		console.log(" ");
		$('#console-log').append("<p style='color:red'>Not a contour to save ==  will return </p>");
		return;
	}
//		Verify Plane selection done 
	if ((plane3DName != "xy") &&  (plane3DName != "yz")&&(plane3DName != "xz")){
		console.log("Missing or Wrong Plane Name");
		$('#console-log').append("<p style='color:red'>Missing or Wrong Plane Name for saving a contour</p>");
		return;
	}
	if(shapes.length< 1){
		console.log("Missing shape contours to save ");
		$('#console-log').append("<p style='color:red'>Missing shape contours to save</p>");
		return;
	}
		
//	Happy Path  ==  Start by building json	
		
	var jsonData = [];
	jsonData += '{"model":' + curModel + ', "groupShape":"LINE", "shapes":[';
	for (var i = 0; i < shapes.length; i++) {
		var value = shapes[i].geometry;
		if (plane3DName == "xy") {
//			Verify type of Line 
    	   if(shapes[i].shapeType != 1 && shapes[i].shapeType != 3){
		    	console.log("Wrong Line Type");
				return;
		    }
			
            // Happy path
			jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';	
			jsonData += '"x1":' + value.vertices[0].x + ', "y1":' + (value.vertices[0].y) + ', "z1":' + value.vertices[0].z + ', '
			jsonData += '"x2":' + value.vertices[1].x + ', "y2":' + (value.vertices[1].y) + ', "z2":' + value.vertices[1].z + ',';
			jsonData += '"x3":0.0, "y3":0.0, "z3":0.0, "height":0, "width":0, "depth":0,"parent":' + shapes[i].dbParent + ', "shapeType":' + shapes[i].shapeType;	
			if(shapes[i].shapeType == 1){				
				jsonData += ',"angle":0 },';                               
			} else { if (shapes[i].shapeType == 3){					
				jsonData += ', "angle":90},';
				}			
			}
		}
		
		if(plane3DName == 'yz'){
//			Verify type of Line 
    	   if(shapes[i].shapeType != 3 && shapes[i].shapeType != 5){
		    	console.log("Wrong Line Type");
				return;
		    }
				
	        // Happy path	
			jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';	
			jsonData += '"x1":' + value.vertices[0].x + ', "y1":' + (value.vertices[0].y) + ', "z1":' + value.vertices[0].z + ', '
			jsonData += '"x2":' + value.vertices[1].x + ', "y2":' + (value.vertices[1].y) + ', "z2":' + value.vertices[1].z + ',';
			jsonData += '"x3":0.0, "y3":0.0, "z3":0.0, "height":0, "width":0, "depth":0,"parent":' + shapes[i].dbParent + ', "shapeType":' + shapes[i].shapeType;	
			if(shapes[i].shapeType == 3){				
				jsonData += ',"angle":0 },';                               
			} else { if (shapes[i].shapeType == 5){					
				jsonData += ', "angle":90},';
				}			
			}
		}
		
		if( plane3DName == 'xz'){
//			Verify type of Line 
    	   if(shapes[i].shapeType != 1 && shapes[i].shapeType != 5){
		    	console.log("Wrong Line Type");
				return;
		    }
    	// Happy path	
			jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';	
			jsonData += '"x1":' + value.vertices[0].x + ', "y1":' + (value.vertices[0].y) + ', "z1":' + value.vertices[0].z + ', '
			jsonData += '"x2":' + value.vertices[1].x + ', "y2":' + (value.vertices[1].y) + ', "z2":' + value.vertices[1].z + ',';
			jsonData += '"x3":0.0, "y3":0.0, "z3":0.0, "height":0, "width":0, "depth":0,"parent":' + shapes[i].dbParent + ', "shapeType":' + shapes[i].shapeType;	
			if(shapes[i].shapeType == 1){				
				jsonData += ',"angle":0 },';                               
			} else { if (shapes[i].shapeType == 5){					
				jsonData += ', "angle":90},';
				}			
			} 	   
		}  
	}
	jsonData += ']}';
	console.log(" saving contour shape "+ jsonData);
//	CALL API 		
	var successFunction = function( data ) {	
		console.log("Contour saved in DB!" + data);	
		$('#console-log').append("<p style='color:blue'>Contour shapes saved properly</p>");
//	    Update Global Variable
		contourHolder3D = [];
//		groupShapeParents = [];
		parents = [];
		shapes = [];
//		Save Contour in Global variable 
		for (var i = 0; i < data.shapes.length; i++) {			
			parents.push(data.shapes[i].parent);
			shapes.push(data.shapes[i].id);
		}			
//		groupShapes.push({type:"cntrGroup", group:data.shapes[0].group, shapes:shapes, parents:parents, groupShapeParents:groupShapeParents});	
		groupShapes.push({type:"cntrGroup", group:data.shapes[0].group, shapes:shapes, parents:parents});	
//		Update curModelShapes adding the contour
		for (var i = 0; i < data.shapes.length; i++) {
			curModelShapes.push(data.shapes[i]);
			displayLine3js(cntr3DColor, data.shapes[i], 'cntr');
		}
		
		
	};
	
	var failFunction = function( xhr, status, error ) {
		console.log(' SAVE Contour  failed  : ' + xhr.status);
		$('#console-log').append("<p style='color:red'>SAVE Contour  failed "+xhr.status+"</p>");
	};
	
	var apis = new apiRomeNext();
	
	apis.save3DContour(jsonData, successFunction, failFunction );		
	

}



//=========================================================================================================
function drawingACntr(){
	
	controls.enabled = false;
	if(lines3d.children.length < 3) {
		console.log(" No shape to draw a contour on");
		action3D = null;
		return;                                         // can not draw a contour
	}
	
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(lines3d.children, true);                // return the line clicked 
	console.log(" Found "+intersects.length + " intersection "  );
	
	for (var i= 0; i <intersects.length; i++){
		console.log(" value of Line Id is "+ intersects[i].object.dbId);		
	}					
	if (intersects.length == 1) {				
		if (intersects[0].object.type =="LineSegments") {					
//			    intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
			   	console.log("Inside start drawing a contour ");										
//					    // no previously selectedLine
			   if(selectedLine.length <1 )  {  
						   selectedLine.push(intersects[0].object);
						   mouseStatus = 1;
			  }else {
					// means we already started the drawing contour  === this is the second line selected
					if(selectedLine.length >= 1 ) {					
					    var selectedElementInter = getIntersection(selectedLine[selectedLine.length-1], intersects[0].object);
						if(selectedElementInter != null){
								if (selectedElementInters < 1) {                              // no previous intersection saved
									selectedLine.push(intersects[0].object);                  // push the lines to selectedLine
									selectedElementInters.push(selectedElementInter);         // push the Intersection points
								} else {                                                      // third line selected we need to draw the contour
									if(verifyNewIntersection(selectedElementInters[selectedElementInters.length-1]  , selectedElementInter) ){
										selectedLine.push(intersects[0].object);
										selectedElementInters.push(selectedElementInter);
										if (selectedLine.length == 3 && selectedElementInters.length == 2) {
											var contourNew = setContour("blue", selectedElementInters, selectedLine[1]);
											addCountour(contourNew, plane3DName);		
											updateContourHolder(contourNew)
											selectedLine.shift();
											selectedElementInters.shift();
										}	
									}
								}
						}else{
							console.log("Wrong type line selection");
						}
					}  
               
			      }
		}else { console.log(" Line selected(axis) Cannot be used Reselect the construction line !!!!!!")}
	}else { console.log(" No Intersection/many intersetions found -----   reselect the construction line ")  }
	
	
	
	
	
	
	
	
}
