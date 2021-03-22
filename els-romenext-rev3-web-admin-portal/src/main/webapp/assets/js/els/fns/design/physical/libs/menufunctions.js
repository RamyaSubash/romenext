/**
 * 
 */
//*********************************************************************************************************
//                                           SECTION FOR CONTOUR CREATION
//*********************************************************************************************************
//   Function    getIntersection3D -------- checkIntersection3D 
//               verifyNewIntersection3D(Compare to previous find point to avoid duplicate point
//               setContour3D  -----------  addCountour3D (to scene) 
//               saveContour3D   (in  DB)
//========================================================================================================
//                GIVEN TWO LINES  FIND INTERSECTION POINT  or RETURN NULL if not found 
//========================================================================================================
function getIntersection3D(lineId1, lineId2) {
	var inter = {};
	  inter = checkIntersection3D( lineId1, lineId2);
      if(inter.x != null && inter.y != null && inter.z !=null) {  return inter;}
      else{console.log(" no Intersection found"); return null;}
}

//========================================================================================================
//              CALCULATE INTERSECTION POINT BETWEEN TWO LINES 
//========================================================================================================
function checkIntersection3D(line1, line2){
	
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
	
	if (line1.shapeType == 1) {
		if (((line2.shapeType == 3) && (line1.geometry.vertices[0].z == line2.geometry.vertices[0].z)) || ((line2.shapeType == 5) && (line1.geometry.vertices[0].y == line2.geometry.vertices[0].y))) {
			result.x = line2.geometry.vertices[0].x;
			result.y = line1.geometry.vertices[0].y;
			result.z = line1.geometry.vertices[0].z;
			result.onLine1 = true;
			result.onLine2 = true;
		}	
//		if (line2.shapeType == 3) {
//			if (line1.geometry.vertices[0].z == line2.geometry.vertices[0].z) {
//				result.x = line2.geometry.vertices[0].x;
//				result.y = line1.geometry.vertices[0].y;
//				result.z = line1.geometry.vertices[0].z;
//			}
//		} else if (line2.shapeType == 5) {
//			if (line1.geometry.vertices[0].y == line2.geometry.vertices[0].y) {
//				result.x = line2.geometry.vertices[0].x;
//				result.y = line1.geometry.vertices[0].y;
//				result.z = line1.geometry.vertices[0].z;
//			}
//		} else {
//			console.log('Wrong Data!');
//		}
	} else if (line1.shapeType == 3) {
		if (((line2.shapeType == 1) && (line1.geometry.vertices[0].z == line2.geometry.vertices[0].z)) || ((line2.shapeType == 5) && (line1.geometry.vertices[0].x == line2.geometry.vertices[0].x))) {
			result.x = line1.geometry.vertices[0].x;
			result.y = line2.geometry.vertices[0].y;
			result.z = line1.geometry.vertices[0].z;
			result.onLine1 = true;
			result.onLine2 = true;
		}
//		if (line2.shapeType == 1) {
//			if (line1.geometry.vertices[0].z == line2.geometry.vertices[0].z) {
//				result.x = line1.geometry.vertices[0].x;
//				result.y = line2.geometry.vertices[0].y;
//				result.z = line1.geometry.vertices[0].z;
//			}
//		} else if (line2.shapeType == 5) {
//			if (line1.geometry.vertices[0].x == line2.geometry.vertices[0].x) {
//				result.x = line1.geometry.vertices[0].x;
//				result.y = line2.geometry.vertices[0].y;
//				result.z = line1.geometry.vertices[0].z;
//			}
//		} else {
//			console.log('Wrong Data!');
//		}
	} else if (line1.shapeType == 5) {
		if (((line2.shapeType == 1) && (line1.geometry.vertices[0].y == line2.geometry.vertices[0].y)) || ((line2.shapeType == 3) && (line1.geometry.vertices[0].x == line2.geometry.vertices[0].x))) {
			result.x = line1.geometry.vertices[0].x;
			result.y = line1.geometry.vertices[0].y;
			result.z = line2.geometry.vertices[0].z;
			result.onLine1 = true;
			result.onLine2 = true;
		}
//		if (line2.shapeType == 1) {
//			if (line1.geometry.vertices[0].y == line2.geometry.vertices[0].y) {
//				result.x = line1.geometry.vertices[0].x;
//				result.y = line1.geometry.vertices[0].y;
//				result.z = line2.geometry.vertices[0].z;
//			}
//		} else if (line2.shapeType == 3) {
//			if (line1.geometry.vertices[0].x == line2.geometry.vertices[0].x) {
//				result.x = line1.geometry.vertices[0].x;
//				result.y = line1.geometry.vertices[0].y;
//				result.z = line2.geometry.vertices[0].z;
//			}
//		} else {
//			console.log('Wrong Data!');
//		}
	} else {
		console.log('Wrong Data!');
	}
	
//	var denominator, a, b, numerator1, numerator2;
////	Check if pane = 'xy'
//	
//	if(plane3DName == "xy") {
//		
//		denominator =(((line2.geometry.vertices[1].y - line2.geometry.vertices[0].y)*(line1.geometry.vertices[1].x - line1.geometry.vertices[0].x))-
//				((line2.geometry.vertices[1].x - line2.geometry.vertices[0].x)*(line1.geometry.vertices[1].y - line1.geometry.vertices[0].y)));
//		if(denominator == 0) { 
//			return result; //  no intersection between the two lines
//		}
//		 a =  line1.geometry.vertices[0].y - line2.geometry.vertices[0].y;
//		 b =  line1.geometry.vertices[0].x - line2.geometry.vertices[0].x;
//		
//		 numerator1 = ((line2.geometry.vertices[1].x - line2.geometry.vertices[0].x) * a) - ((line2.geometry.vertices[1].y - line2.geometry.vertices[0].y) * b);
//		 numerator2 = ((line1.geometry.vertices[1].x - line1.geometry.vertices[0].x) * a) - ((line1.geometry.vertices[1].y - line1.geometry.vertices[0].y) * b);
//		 a = numerator1 / denominator;
//		 b = numerator2 / denominator;
//		 
//		 result.x = line1.geometry.vertices[0].x + (a * (line1.geometry.vertices[1].x - line1.geometry.vertices[0].x));
//		 result.y = line1.geometry.vertices[0].y + (a * (line1.geometry.vertices[1].y - line1.geometry.vertices[0].y));
//		 result.z = 0;
//		 console.log(" value of res is : "+ result.x  + "   "+ result.y + "   "+ result.z);
//		
//		 if(a>0 && a<1) { result.onLine1 = true}
//		 if (b > 0 && b < 1) {  result.onLine2 = true;  }
//	}
//	
//    if(plane3DName == "yz"){
//    	denominator =(((line2.geometry.vertices[1].z - line2.geometry.vertices[0].z)*(line1.geometry.vertices[1].y - line1.geometry.vertices[0].y))-
//				((line2.geometry.vertices[1].y - line2.geometry.vertices[0].y)*(line1.geometry.vertices[1].z - line1.geometry.vertices[0].z)));
//		if(denominator == 0) { 
//			return result; //  no intersection between the two lines
//		}
//		 a =  line1.geometry.vertices[0].z - line2.geometry.vertices[0].z;
//		 b =  line1.geometry.vertices[0].y - line2.geometry.vertices[0].y;
//		
//		 numerator1 = ((line2.geometry.vertices[1].y - line2.geometry.vertices[0].y) * a) - ((line2.geometry.vertices[1].z - line2.geometry.vertices[0].z) * b);
//		 numerator2 = ((line1.geometry.vertices[1].y - line1.geometry.vertices[0].y) * a) - ((line1.geometry.vertices[1].z - line1.geometry.vertices[0].z) * b);
//		 a = numerator1 / denominator;
//		 b = numerator2 / denominator;
//		 
//		 result.x = 0;
//		 result.y = line1.geometry.vertices[0].y + (a * (line1.geometry.vertices[1].y - line1.geometry.vertices[0].y));
//		 result.z = line1.geometry.vertices[0].z + (a * (line1.geometry.vertices[1].z - line1.geometry.vertices[0].z));
//		 console.log(" value of res is : "+ result.x  + "   "+ result.y + "   "+ result.z);
//		
//		 if(a>0 && a<1) { result.onLine1 = true}
//		 if (b > 0 && b < 1) {  result.onLine2 = true;  }
//    }
//    if(plane3DName == "xz"){
//    	denominator =(((line2.geometry.vertices[1].z - line2.geometry.vertices[0].z)*(line1.geometry.vertices[1].x - line1.geometry.vertices[0].x))-
//				((line2.geometry.vertices[1].x - line2.geometry.vertices[0].x)*(line1.geometry.vertices[1].z - line1.geometry.vertices[0].z)));
//		if(denominator == 0) { 
//			return result; //  no intersection between the two lines
//		}
//		 a =  line1.geometry.vertices[0].z - line2.geometry.vertices[0].z;
//		 b =  line1.geometry.vertices[0].x - line2.geometry.vertices[0].x;
//		
//		 numerator1 = ((line2.geometry.vertices[1].x - line2.geometry.vertices[0].x) * a) - ((line2.geometry.vertices[1].z - line2.geometry.vertices[0].z) * b);
//		 numerator2 = ((line1.geometry.vertices[1].x - line1.geometry.vertices[0].x) * a) - ((line1.geometry.vertices[1].z - line1.geometry.vertices[0].z) * b);
//		 a = numerator1 / denominator;
//		 b = numerator2 / denominator;
//		 
//		 result.x = line1.geometry.vertices[0].x + (a * (line1.geometry.vertices[1].x - line1.geometry.vertices[0].x));
//		 result.y =0;
//		 result.z = line1.geometry.vertices[0].z + (a * (line1.geometry.vertices[1].z - line1.geometry.vertices[0].z));
//		 console.log(" value of res is : "+ result.x  + "   "+ result.y + "   "+ result.z);
//		
//		 if(a>0 && a<1) { result.onLine1 = true}
//		 if (b > 0 && b < 1) {  result.onLine2 = true;  }
//    }
//    if(result.x !=null)    result.x = roundNB(result.x);      
//    if(result.y != null)  result.y = roundNB(result.y);
//    if(result.z != null)  result.z = roundNB(result.z);
	return result;	
}
//=========================================================================================================
//                        VERIFY TO AVOID SAME DUPLICATE INTERSECTION POINTS
//=========================================================================================================
function verifyNewIntersection3D(intersect1, intersect2){
	if (intersect1.x == intersect2.x && intersect1.y == intersect2.y && intersect1.z == intersect2.z) {
		console.log("wrong line! select again");
		return false;}
	else { return true}
}

//========================================================================================================
//                               BUILD CONTOUR PART 
//========================================================================================================

function setContour3D(lineColor, intersections, line) {	
	var startPoint = [], endPoint=[];
//	var i = 0, j = 1;
//	if(plane3DName == "xy") {	
//		if(line.shapeType == 1) {  // this y value; 
//			if(intersections[0].x > intersections[1].x)  { 
//				i = 1;
//				j = 0;
//			}			
//		}else if (line.shapeType == 3 ) {
//			if(intersections[0].y > intersections[1].y  ){
//				i = 1;
//				j = 0;
//			}
//		}
//	}else if(plane3DName == "yz"){
//				if(line.shapeType == 3) { 
//					if(intersections[0].y > intersections[1].y)  { 
//						i = 1;
//						j = 0;
//					}			
//				}else if (line.shapeType == 5 ) {
//					if(intersections[0].z > intersections[1].z  ){
//						i = 1;
//						j = 0;
//					}
//				}	    
//	}else if( plane3DName == "xz"){
//				if(line.shapeType == 1) {  
//					if(intersections[0].x > intersections[1].x)  { 
//						i = 1;
//						j = 0;
//					}				
//				}else if (line.shapeType == 5 ) {
//					if(intersections[0].z > intersections[1].z  ){
//						i = 1;
//						j = 0;
//					}
//				}	
//	}
		
//	startPoint[0] = intersections[i].x;
//	startPoint[1] = intersections[i].y;
//	startPoint[2] = intersections[i].z;
//	endPoint[0]   = intersections[j].x;
//	endPoint[1]   = intersections[j].y;
//	endPoint[2]   = intersections[j].z;	
	
	startPoint[0] = intersections[0].x;
	startPoint[1] = intersections[0].y;
	startPoint[2] = intersections[0].z;
	endPoint[0]   = intersections[1].x;
	endPoint[1]   = intersections[1].y;
	endPoint[2]   = intersections[1].z;	
	
	console.log(" Start Point is:   x= "+startPoint[0] +"  y= "+startPoint[1]+" z=  "+startPoint[2]);
	console.log(" End   Point is:   x= "+endPoint[0]   +"  y= "+endPoint[1]  +" z=  "+endPoint[2]);
	
	var tmpLine = ModelShapeUtils.drawContour3D(lineColor, startPoint, endPoint);
	tmpLine.dbParent = line.dbId;
	tmpLine.shapeType = line.shapeType;
	tmpLine.shape = 'LINE';
	lines3d.add(tmpLine);
	tmpLine.renderOrder = 1;
	return tmpLine;
}
//=======================================================================================================
//                           SHOW CONTOUR IN SCENE
//=======================================================================================================
function displayCountour3D(contour, plane3DName){
	scene.add(contour);
	setPlane(0,0,0);
//	if(plane3DName == "xy") {	
//			setPlane(0,0,1);
//	}else if(plane3DName == "yz"){
//		    setPlane(1,0,0)
//	}else if(plane3DName == "xz"){
//			setPlane(0,1,0);
//	}
			
	if (raycaster.ray.intersectPlane(plane, intersection)) {
		offset.copy(intersection).sub(contour.position);
	}

}
//========================================================================================================
//                                  SAVE CONTOUR SHAPES IN DB 
//                                  UPDATE GLOBAL VAR     GROUPSHAPES with New CONTOUR SHAPES
//========================================================================================================
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
        // Happy path
		jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';	
		jsonData += '"x1":' + value.vertices[0].x + ', "y1":' + (value.vertices[0].y) + ', "z1":' + value.vertices[0].z + ', '
		jsonData += '"x2":' + value.vertices[1].x + ', "y2":' + (value.vertices[1].y) + ', "z2":' + value.vertices[1].z + ',';
		jsonData += '"x3":0.0, "y3":0.0, "z3":0.0, "height":0, "width":0, "depth":0,"parent":' + shapes[i].dbParent + ', "shapeType":' + shapes[i].shapeType;	
		if (shapes[i].shapeType == 1) {
			jsonData += ',"angle":0 },'; 
		} else if (shapes[i].shapeType == 3) {
			jsonData += ',"angle":0 },'; 
		} else if (shapes[i].shapeType == 5) {
			jsonData += ',"angle":90 },'; 
		} else {
			console.log('Wrong Data!');
			return;
		}
	}
//	var jsonData = [];
//	jsonData += '{"model":' + curModel + ', "groupShape":"LINE", "shapes":[';
//	for (var i = 0; i < shapes.length; i++) {
//		var value = shapes[i].geometry;
//		var angleLine=0;
//		
//		if (plane3DName == "xy") {
////			Verify type of Line 
//    	   if(shapes[i].shapeType != 1 && shapes[i].shapeType != 3){
//		    	console.log("Wrong Line Type");
//				return;
//		    }
//			
//			if(shapes[i].shapeType == 1){				
//				angleLine = ',"angle":0 },';                               
//			} else { if (shapes[i].shapeType == 3){					
//				angleLine = ',"angle":90},';
//				}			
//			}
//		}
//		
//		if(plane3DName == 'yz'){
////			Verify type of Line 
//    	   if(shapes[i].shapeType != 3 && shapes[i].shapeType != 5){
//		    	console.log("Wrong Line Type");
//				return;
//		    }					       
//			if(shapes[i].shapeType == 3){				
//				angleLine = ',"angle":0 },';                             
//			} else { if (shapes[i].shapeType == 5){					
//				angleLine = ',"angle":90},';
//				}			
//			}
//		}
//		
//		if( plane3DName == 'xz'){
////			Verify type of Line 
//    	   if(shapes[i].shapeType != 1 && shapes[i].shapeType != 5){
//		    	console.log("Wrong Line Type");
//				return;
//		    }
//    		
//			if(shapes[i].shapeType == 1){				
//				angleLine = ',"angle":0 },';                              
//			} else { if (shapes[i].shapeType == 5){					
//				angleLine = ',"angle":90},';
//				}			
//			} 	   
//		} 
//		
//	     // Happy path
//		jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';	
//		jsonData += '"x1":' + value.vertices[0].x + ', "y1":' + (value.vertices[0].y) + ', "z1":' + value.vertices[0].z + ', '
//		jsonData += '"x2":' + value.vertices[1].x + ', "y2":' + (value.vertices[1].y) + ', "z2":' + value.vertices[1].z + ',';
//		jsonData += '"x3":0.0, "y3":0.0, "z3":0.0, "height":0, "width":0, "depth":0,"parent":' + shapes[i].dbParent + ', "shapeType":' + shapes[i].shapeType;	
//	    jsonData += angleLine;
//		   		
//	}
	jsonData += ']}';
	console.log(" saving contour shape ");
	
//	CALL API 		
	var successFunction = function( data ) {	
		console.log("Contour saved in DB!" + data);	
		$('#console-log').append("<p style='color:blue'>Contour shapes saved properly</p>");
//	    Update Global Variable
		contourHolder3D = [];
		parentIds = [];
		shapeIds = [];
		console.table(data.shapes);
//		Save Contour in Global variable 
		for (var i = 0; i < data.shapes.length; i++) {			
			parentIds.push(data.shapes[i].parent);
			shapeIds.push(data.shapes[i].id);
		}			

//		Update curModelShapes adding the contour
//		var sn; 
		var line3dIndex;
		for (var i = 0; i < data.shapes.length; i++) {
			curModelShapes.push(data.shapes[i]);
			line3dIndex = ModelShapeUtils.displayLine3js(cntr3DColor, data.shapes[i], 'cntr');
			data.shapes[i].line3dIndex = line3dIndex;                               // sn = index in lines3d global variable -- maintained for direct access
		}	
		groupShapes.push({type:"cntrGroup", group:data.shapes[0].group, shapeIds:shapeIds, parentIds:parentIds, shapes :data.shapes});	
		parentIds = [];
		shapeIds = [];
	};	
	var failFunction = function( xhr, status, error ) {
		console.log(' SAVE Contour  failed  : ' + xhr.status);
		$('#console-log').append("<p style='color:red'>SAVE Contour  failed "+xhr.status+"</p>");
	};	
	var apis = new shapeApis();	
	
	apis.addContour3D(jsonData, successFunction, failFunction );			

}



//*********************************************************************************************************
//                            SECTION FOR ADJUSTING SHAPES 
//*********************************************************************************************************
//                      (1)   findAllLinesToAdjust()   -  create list of lines to adjust 
//                            uses getAllChildrenLines()
//                      (2)   findAssociatedGroups     -  create list og groupShapes
//                      
//=========================================================================================================
//                   GIVEN SELECTED SHAPE  ---   Find ALL Related Shapes(Children) and GroupShapes
//                   Process done at mouseDown
//=========================================================================================================

function findAllLinesToAdjust(line){
	lines3DToAdjust = [];
	lines3DToAdjust.push({
		id : line.dbId, 
		line3dIndex : line.line3dIndex,  
		shapeType : line.shapeType,
		x1 : line.geometry.vertices[0].x,   y1 : line.geometry.vertices[0].y, z1 : line.geometry.vertices[0].z,
		x2 : line.geometry.vertices[1].x,	y2 : line.geometry.vertices[1].y, z2 : line.geometry.vertices[1].z,
		coords : line.tochange,
		parent : line.dbParent
		});
	lines3DToAdjust = lines3DToAdjust.concat(getAllChildrenLines3D(lines3DToAdjust)); 
	console.log("Found these lines to adjust");
	console.table(lines3DToAdjust);
	findAssociatedGroups(); // for group shapes
}

function getAllChildrenLines3D(parentLine){
	var childrenLines = [];
	for (var n = 0; n < parentLine.length; n++) {
		for (var i = 0; i < lines3d.children.length; i++) {
			if (lines3d.children[i].dbParent == parentLine[n].id) {
				childrenLines.push({
					id: lines3d.children[i].dbId, 
					line3dIndex: i,
					shapeType: lines3d.children[i].shapeType,
					x1 : lines3d.children[i].geometry.vertices[0].x,  y1 : lines3d.children[i].geometry.vertices[0].y, 	z1 : lines3d.children[i].geometry.vertices[0].z,
					x2 : lines3d.children[i].geometry.vertices[1].x,  y2 : lines3d.children[i].geometry.vertices[1].y,  z2 : lines3d.children[i].geometry.vertices[1].z,
					parent : lines3d.children[i].dbParent			
				});
			}
		}
	}
	
	console.table(childrenLines);	
	if (childrenLines.length == 0) {
		return childrenLines;
	} else {
		return childrenLines.concat(getAllChildrenLines3D(childrenLines));
	}	

}

function findAssociatedGroups(){
	for(var l=0; l< lines3DToAdjust.length; l++){
		 if(!lines3d.children[lines3DToAdjust[l].line3dIndex].isConstruction){
			 var gr = lines3d.children[lines3DToAdjust[l].line3dIndex].group;
			 groupShapesAssociated.push(lines3d.children[lines3DToAdjust[l].line3dIndex].group);	 
		 } 
	}
	//    remove duplicate group values
	 var group = groupShapesAssociated.filter(function(item, pos, self){
	    	return self.indexOf(item) == pos;
	    })   
    console.table(groupShapesAssociated);
    groupShapesAssociated = group;	
    
}

//========================================================================================================
//                   PROCESS DONE AT MouseUP
//               (1)    Complete list of shapes to Adjust from groupShapes       addLinesToAdjust()
//               (2)    Update the Selected line                                 update3DShape() 
//========================================================================================================
function addLinesToAdjust(){
	for(var i=0; i< lines3DToAdjust.length;i++){
		if(!lines3d.children[lines3DToAdjust[i].line3dIndex].isConstruction){
		for (var j = 0; j < groupShapesAssociated.length; j++) {
			var gr = groupShapesAssociated[j];
			//Find group shape
			for (var k = 0; k < groupShapes.length; k++) {
				if(groupShapes[k].group == gr ){					
					if(groupShapes[k].type == 'cntrGroup'){
						for (var n=0; n < groupShapes[k].shapes.length; n++) {
							var cntr = groupShapes[k].shapes[n];
							if((! findShapeInList(lines3DToAdjust, cntr.id, null))&&(! findShapeInList(cntrFound, cntr.id, cntr.group)))  {
								var cntrElem = null;
								if(selected3DLine.tochange == 'x'){
							      if(lines3DToAdjust[i].x1 == cntr.x1 ||  lines3DToAdjust[i].x1 == cntr.x2)  {
							    	    cntrElem = {group:groupShapes[k].group, id:cntr.id, x1:cntr.x1, y1:cntr.y1, z1: cntr.z1, x2:cntr.x2, y2:cntr.y2, z2: cntr.z2, shapeType: cntr.shapeType, line3dIndex : cntr.line3dIndex, parent:groupShapes[k].parentIds[n]};
							    	  	cntrFound.push(cntrElem);					    	  
							      }
							   }
							  if(selected3DLine.tochange == 'y'){
							      if(lines3DToAdjust[i].y1 == cntr.y1 ||  lines3DToAdjust[i].y1 == cntr.y2)   {
							    	    cntrElem = {group:groupShapes[k].group, id:cntr.id, x1:cntr.x1, y1:cntr.y1, z1: cntr.z1, x2:cntr.x2, y2:cntr.y2, z2: cntr.z2, shapeType: cntr.shapeType, line3dIndex : cntr.line3dIndex ,parent:groupShapes[k].parentIds[n]};
										cntrFound.push(cntrElem);
		    	                        }					    	  
							      }
							 if(selected3DLine.tochange == 'z'){
							      if(lines3DToAdjust[i].z1 == cntr.z1 ||  lines3DToAdjust[i].z1 == cntr.z2){
							    	    cntrElem = {group:groupShapes[k].group, id:cntr.id, x1:cntr.x1, y1:cntr.y1, z1: cntr.z1, x2:cntr.x2, y2:cntr.y2, z2: cntr.z2, shapeType: cntr.shapeType, line3dIndex : cntr.line3dIndex , parent:groupShapes[k].parentIds[n]};
										cntrFound.push(cntrElem);
		    	                        }					    	  
							      }
							}
							}
						}	
					}

				}
			}
		}
				
		}
	console.log("Found these lines to update ");
	console.table(cntrFound);	
}

//========================================================================================
function updateRelatedShapes( value){	
	
//             first line is updated separately as it is the selected line 
	
	for (var k = 1 ; k <  lines3DToAdjust.length ; k++){
		var line = lines3d.children[lines3DToAdjust[k].line3dIndex];
		updateShapeChildren(line, k );	
		console.log(" updated line "+ lines3DToAdjust[k].id + " the value of "+ selected3DLine.value + " for the  "+selected3DLine.tochange);
		if(!line.isConstruction){                       // line is part of groupShape
			if(!lines3DToAdjust[k].hasOwnProperty('newx1')){ lines3DToAdjust[k].newx1 = lines3DToAdjust[k].x1};
			if(!lines3DToAdjust[k].hasOwnProperty('newx2')){ lines3DToAdjust[k].newx2 = lines3DToAdjust[k].x2};
			if(!lines3DToAdjust[k].hasOwnProperty('newy1')){ lines3DToAdjust[k].newy1 = lines3DToAdjust[k].y1};
		    if(!lines3DToAdjust[k].hasOwnProperty('newy2')){ lines3DToAdjust[k].newy2 = lines3DToAdjust[k].y2};
			if(!lines3DToAdjust[k].hasOwnProperty('newz1')){ lines3DToAdjust[k].newz1 = lines3DToAdjust[k].z1};
		    if(!lines3DToAdjust[k].hasOwnProperty('newz2')){ lines3DToAdjust[k].newz2 = lines3DToAdjust[k].z2}; 
		    lines3DToAdjust[k].group = line.group;
		    updateShapeInGroup(lines3DToAdjust[k]);  	
		}	
	}
	
	updateCntrShapes();
//	Reset used global variables for adjusting
	cntrFound.length = 0;
	lines3DToAdjust.length = 0;
	groupShapesAssociated.length = 0;
}

function updateCntrShapes(){
	if(cntrFound.length == 0 ){
		console.log("No contour to update");
		return;
	}
	
//     Identify what values are changed   and set these in new..    
	for(var i=0; i<cntrFound.length; i++){
		var lineCntr= cntrFound[i];
		for(var j=0; j<lines3DToAdjust.length; j++){
			if(!lines3d.children[lines3DToAdjust[j].line3dIndex].isConstruction) {
				if(lines3d.children[lines3DToAdjust[j].line3dIndex].group == lineCntr.group){
					if(lines3DToAdjust[j].hasOwnProperty('newx1')){
						if( Math.abs(lineCntr.x1- lines3DToAdjust[j].x1) <0.01 ) {                           // lines3DToAdjust will have oldx1 = oldx2
							lineCntr.newx1 = lines3DToAdjust[j].newx1;
						}else if (Math.abs(lineCntr.x2 - lines3DToAdjust[j].x1)<0.01){
							lineCntr.newx2 = lines3DToAdjust[j].newx1;
						}
					}
					
					if(lines3DToAdjust[j].hasOwnProperty('newy1')){
						if( Math.abs(lineCntr.y1 - lines3DToAdjust[j].y1)<0.01 ) {                       // lines3DToAdjust will have oldy1 = oldy2
							lineCntr.newy1 = lines3DToAdjust[j].newy1;
						}else if (Math.abs(lineCntr.y2 - lines3DToAdjust[j].y1)< 0.01){
							lineCntr.newy2 = lines3DToAdjust[j].newy1;
						}
					}
					
					if(lines3DToAdjust[j].hasOwnProperty('newz1')){
						if( Math.abs(lineCntr.z1- lines3DToAdjust[j].z1)< 0.01 ) {                       // lines3DToAdjust will have oldy1 = oldy2
							lineCntr.newz1 = lines3DToAdjust[j].newz1;
						}else if (Math.abs(lineCntr.z2 -lines3DToAdjust[j].z1)< 0.01){
							lineCntr.newz2 = lines3DToAdjust[j].newz1;
						}
					}
						
				}
			}
			
		}
	}
	console.log("Contour to changes are: ");
	console.table(cntrFound);
	saveUpdatedCntr();
}


function updateShapeChildren(line, ind ){
	var coords = selected3DLine.tochange;
	var value  = selected3DLine.value;
	console.log("retrieved value is : "+ value);
	var updateLineVertices = lines3DToAdjust[ind];
	console.table("Before"+ updateLineVertices);
	if (coords =='x') {
		console.log("Initial value is : "+line.geometry.vertices[0].x );
		line.geometry.vertices[0].x += value;
		line.geometry.vertices[1].x += value;
		line.geometry.vertices[0].x = roundNB(line.geometry.vertices[0].x);
		line.geometry.vertices[1].x = roundNB(line.geometry.vertices[1].x);
		updateLineVertices.newx1= line.geometry.vertices[0].x;
		updateLineVertices.newx2= line.geometry.vertices[1].x;
		console.log("Resulting value is : "+line.geometry.vertices[0].x );
	}else  if(coords == 'y'){
		line.geometry.vertices[0].y += value;
		line.geometry.vertices[1].y += value;
		line.geometry.vertices[0].y = roundNB(line.geometry.vertices[0].y);
		line.geometry.vertices[1].y = roundNB(line.geometry.vertices[1].y);
		
		
		updateLineVertices.newy1=  line.geometry.vertices[0].y;
		updateLineVertices.newy2=  line.geometry.vertices[1].y;	
	}else if ( coords == 'z'){
		line.geometry.vertices[0].z += value;
		line.geometry.vertices[1].z += value;	
		line.geometry.vertices[0].z = roundNB(line.geometry.vertices[0].z);
		line.geometry.vertices[1].z = roundNB(line.geometry.vertices[1].z);
		
		
		updateLineVertices.newz1=  line.geometry.vertices[0].z;
		updateLineVertices.newz2=  line.geometry.vertices[1].z;
	}
	console.table("After"+ updateLineVertices);
	console.table(line.geometry.vertices);
	line.geometry.verticesNeedUpdate = true;
//	var angleValue = findAngleForLine(line);
	var angleValue = line.dbAngle;
	ModelShapeUtils.saveUpdated3DShape(line, angleValue);
}
//=========================================================================================================


function saveUpdatedCntr(){
	if(cntrFound.length == 0){
		return;
	}
	
//	For each Line  first set the other non-changed values 
//	Build the json for the shape to save 
//	update the vertices for the corresponding values in lines3d 
//	update the vertices in the groupShapes global variable.
	
	for (var i=0; i<cntrFound.length; i++){
		// complete shape
		if(!cntrFound[i].hasOwnProperty('newx1')){ cntrFound[i].newx1 = cntrFound[i].x1};
		if(!cntrFound[i].hasOwnProperty('newx2')){ cntrFound[i].newx2 = cntrFound[i].x2};
		if(!cntrFound[i].hasOwnProperty('newy1')){ cntrFound[i].newy1 = cntrFound[i].y1};
	    if(!cntrFound[i].hasOwnProperty('newy2')){ cntrFound[i].newy2 = cntrFound[i].y2};
    	if(!cntrFound[i].hasOwnProperty('newz1')){ cntrFound[i].newz1 = cntrFound[i].z1};
	    if(!cntrFound[i].hasOwnProperty('newz2')){ cntrFound[i].newz2 = cntrFound[i].z2}; 
	    
	    
//	    var angleValue = findAngleForLine(cntrFound[i]);
	    var angleValue = cntrFound[i].dbAngle;
		var jsonDataC = '';		
		jsonDataC = '{"model":' + curModel + ', "groupShapeId":' + cntrFound[i].group + ', "shapes":[' + 
		   '{"modelId":' + curModel + ', "shapeId":' + cntrFound[i].id + ', "isConstruction": false, "x1":' +cntrFound[i].newx1 + ', "x2":' + cntrFound[i].newx2 +
		   ', "y1":' + cntrFound[i].newy1 + ', "y2":' + cntrFound[i].newy2 + ', "z1":'+ cntrFound[i].newz1+', "z2":'+ cntrFound[i].newz2 +
		   ', "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":' + angleValue + '},]}';
		
		// update the lines3d by resetting the Vertices   
		var line = 	lines3d.children[cntrFound[i].line3dIndex];
		
		line.geometry.vertices[0].x = cntrFound[i].newx1;
		line.geometry.vertices[1].x = cntrFound[i].newx2;			
		line.geometry.vertices[0].y = cntrFound[i].newy1;
		line.geometry.vertices[1].y = cntrFound[i].newy2;			
		line.geometry.vertices[0].z = cntrFound[i].newz1;
		line.geometry.vertices[1].z = cntrFound[i].newz2;	
		
		line.geometry.verticesNeedUpdate = true;
		
		console.log(" update values for line "+ line.dbId);
		console.table(line.geometry.vertices)
		
		// update groupShapes		
		updateShapeInGroup( cntrFound[i]);
		
		// save these shapes to DB 
		console.log(" update these groupShapes"+ jsonDataC);				
		
		var successFunction = function( data ) {
			console.log("saved in the database!");
			$('#console-log').append("<p style='color:blue'> Contour  Shapes updated :</p>");
		};
		
		var failFunction = function( xhr, status, error ) {
			$('#console-log').append("<p style='color:red'> failed to update  Contour shapes :"+xhr.status+"</p>");
			console.log('failed to update  Contour shapes : '+ xhr.status);
		};
		
		var apis = new shapeApis();
		
		apis.updateGroup3DShapes(jsonDataC, successFunction, failFunction );		
		
	}

}

function updateShapeInGroup(upShape){
	console.log("update this "+ upShape);
	for(var l=0; l<groupShapes.length; l++){
		if(groupShapes[l].group == upShape.group){
			for(var n=0; n<groupShapes[l].shapes.length; n++){
				if(groupShapes[l].shapes[n].id ==  upShape.id ){
					groupShapes[l].shapes[n].x1 =  upShape.newx1;
					groupShapes[l].shapes[n].x2 =  upShape.newx2;
					groupShapes[l].shapes[n].y1 =  upShape.newy1;
					groupShapes[l].shapes[n].y2 =  upShape.newy2;
					groupShapes[l].shapes[n].z1 =  upShape.newz1;
					groupShapes[l].shapes[n].z2 =  upShape.newz2; 
					break;
				}
			}
		}
	}
	
}




//================================= ADJUSTING UTILITIES ==================================================
function setPlane(valx, valy, valz){
	plane.normal.x = valx;
	plane.normal.y = valy;
	plane.normal.z = valz;
}

function findChild(id){
	for(var i=0; i<lines3d.children.length; i++){
		if(lines3d.children[i].dbId == id ){
			return lines3d.children[i];
		}
	}
	return null;
}

function findShapeInList(arr , id, group){
	if(arr.length == 0){return false;}
	for(var n=0; n<arr.length; n++){
		if(arr[n].id == id ) {
			if(arr[n].hasOwnProperty('group') && group != null){
				if (arr[n].group == group) {return true}
			}else{ return true}
		}
	}
	return false;
}

function verifyLineIsAxis(line){

	if(line.hasOwnProperty('axis')) {return true}
	else return false;
	
}
function findAngleForLine(line){
	
  var angleValue;
  if (plane3DName == "xy") {
	  if (line.shapeType == 1) {
			angleValue = 0;
		} else if (line.shapeType == 3) {
			angleValue = 90;
		}	
	};
  if (plane3DName == "yz") {
	  if (line.shapeType  == 3) {
			angleValue = 0;
		} else {
			angleValue = 90;
		}
  };   
	
 if (plane3DName == "xz") {
     if (line.shapeType  == 1) {
		angleValue = 0;
	} else {
		angleValue = 90;
	}
  };  
	
	return angleValue;
	
}

//============================================================================

function getAxisConstructionLineColor(line){
	
	if (!line) {
		return null;
	}
	
	var isXAxis = (line.x1 == 0 && line.y1 == 0 && line.z1 == 0 && line.x2 == gridSize && line.y2 == 0 && line.z2 == 0);
	var isYAxis = (line.x1 == 0 && line.y1 == 0 && line.z1 == 0 && line.x2 == 0 && line.y2 == gridSize && line.z2 == 0);
	var isZAxis = (line.x1 == 0 && line.y1 == 0 && line.z1 == 0 && line.x2 == 0 && line.y2 == 0 && line.z2 == gridSize);
	
	if (isXAxis) {
		return xAxisColor;
	} else if (isYAxis) {
		return yAxisColor;
	} else if (isZAxis) {
		return zAxisColor;
	} else {
		return null;
	}
	
}

function showSelectionIndicator(intersects) {
	
	if (intersects.length > 0) {

		if (currentIntersected !== undefined) {
			currentIntersected.material.linewidth = 1;
		}

		currentIntersected = intersects[0].object;
		currentIntersected.material.linewidth = 5;

		sphereInter.visible = true;
		sphereInter.position.copy(intersects[0].point);
	} else {

		if (currentIntersected !== undefined) {
			currentIntersected.material.linewidth = 1;
		}

		currentIntersected = undefined;
		sphereInter.visible = false;
	}
	
}


function addChildLineID(parentId, id){
	if(lines3d.children.length < 0) {
		return;
	}
	for(var i=0; i< lines3d.children.length; i++){
		if(lines3d.children[i].dbId == parentId ){		
				lines3d.children[i].childIds.push(id);
				break;
		}
	}
}

function findGroupInGroupShapes(group){
	if(groupShapes.length == 0) {return -1;}
	else 
		for (var j=0; j<groupShapes.length; j++){
			if(groupShapes[j].group == group ) {return j}
		}
	return -1;
}

function roundNB(num){
	console.log( num );
	return Number(Math.round(num+'e2')+'e-2');
	
}

function findLineIndex(parentId){
	for(var i=0; i<lines3d.children.length; i++){
		if(lines3d.children[i].dbId == parentId){
			return i;
		}
	}
	return null;
}

function findShapeByPropertyId(propertyId){
	var listOfShapes =[];                           // save list of indexes to  shapes related to property
	for(var i=0; i< lines3d.children.length; i++){
		if(lines3d.children[i].hasOwnProperty('property') && lines3d.children[i].property.id == propertyId){
			listOfShapes.push(lines3d.children[i].line3dIndex );
		}
	}
	return listOfShapes;
}



function findWhatTochange(Line){
	
	var tochange = null;
	
	var modifier = PhysicalInterfaceUtils.findModifier();
	// {1: 'Relative x', 3: 'Relative y', 5: 'Absolute x', 7: 'Absolute y', 11: 'Relative z', 17: 'Absolute z'};
	if (modifier == 1 || modifier == 5) {
		tochange = 'x';
	} else if (modifier == 3 || modifier == 7) {
		tochange = 'y';
	} else if (modifier == 11 || modifier == 17) {
		tochange = 'z';
	} else {
		console.log("Wrong Data!");
	}
	
//	if (plane3DName == "xy") {					
//		if (Line.shapeType == 1) {  // parallel to x											
//			tochange = 'y';
//		}else if (Line.shapeType == 3) {    // parallel to y
//			tochange = 'x';		
//			}
//	
//	};
//	if (plane3DName == "yz") {
//		if (Line.shapeType  == 3) {         
//			tochange = 'z';		
//		} else if (Line.shapeType  == 5) {
//			tochange = 'y';		
//		}
//		
//	};
//	if (plane3DName == "xz") {		
//		if (Line.shapeType == 1) {						
//			tochange = 'z';		
//		} else if (Line.shapeType  == 5) {
//			tochange = 'x';			
//		} 		
//	}
	
	if(tochange) { selectedLine[0].coords = tochange;}

};