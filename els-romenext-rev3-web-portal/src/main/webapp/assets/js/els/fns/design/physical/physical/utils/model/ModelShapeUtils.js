function ModelShapeUtils(){
	
}

ModelShapeUtils.save3DShape = function (shape3D) {
		
//		Verify Plane selection done 
		if ((plane3DName != "xy") &&  (plane3DName != "yz")&&(plane3DName != "xz")){
			console.log("Wrong Plane Name");
			return;
		}
//		Build json 
		var angleValue;
		if(shape3D.shapeType == 1) {
			shape3D.geometry.vertices[0].y +=  shape3D.position.y - yMovingDiff;
			shape3D.geometry.vertices[1].y +=  shape3D.position.y - yMovingDiff;
			shape3D.geometry.vertices[0].z +=  shape3D.position.z - zMovingDiff;
			shape3D.geometry.vertices[1].z +=  shape3D.position.z - zMovingDiff;
			angleValue = 0;
		} else if (shape3D.shapeType == 3) {
			shape3D.geometry.vertices[0].x +=  shape3D.position.x - xMovingDiff;
			shape3D.geometry.vertices[1].x +=  shape3D.position.x - xMovingDiff;
			shape3D.geometry.vertices[0].z +=  shape3D.position.z - zMovingDiff;
			shape3D.geometry.vertices[1].z +=  shape3D.position.z - zMovingDiff;
			angleValue = 0;
		} else if (shape3D.shapeType == 5) {
			shape3D.geometry.vertices[0].x +=  shape3D.position.x - xMovingDiff;
			shape3D.geometry.vertices[1].x +=  shape3D.position.x - xMovingDiff;
			shape3D.geometry.vertices[0].y +=  shape3D.position.y - yMovingDiff;
			shape3D.geometry.vertices[1].y +=  shape3D.position.y - yMovingDiff;
			angleValue = 90;
		} else {
			console.log("Wrong Line Type");
			return;
		}
		
		var xLimited = document.getElementById('x_limitation').checked;
		var yLimited = document.getElementById('y_limitation').checked;
		var zLimited = document.getElementById('z_limitation').checked;
		if (xLimited) {
			shape3D.geometry.vertices[0].x = (new DesignPhysicalRenderer()).getShapeById(shape3D.dbParent).geometry.vertices[0].x;
			shape3D.geometry.vertices[1].x = (new DesignPhysicalRenderer()).getShapeById(shape3D.dbParent).geometry.vertices[1].x;
		}
		if (yLimited) {
			shape3D.geometry.vertices[0].y = (new DesignPhysicalRenderer()).getShapeById(shape3D.dbParent).geometry.vertices[0].y;
			shape3D.geometry.vertices[1].y = (new DesignPhysicalRenderer()).getShapeById(shape3D.dbParent).geometry.vertices[1].y;
		}
		if (zLimited) {
			shape3D.geometry.vertices[0].z = (new DesignPhysicalRenderer()).getShapeById(shape3D.dbParent).geometry.vertices[0].z;
			shape3D.geometry.vertices[1].z = (new DesignPhysicalRenderer()).getShapeById(shape3D.dbParent).geometry.vertices[1].z;
		}
				
//		var value = shape3D.value ;
//		if (plane3DName == "xy") {
////			Verify type of Line 
//		    if(shape3D.shapeType != 1 && shape3D.shapeType != 3) {	
//		    	console.log("Wrong Line Type");
//				return;
//		    }
//			if (shape3D.shapeType == 1) {
//				shape3D.geometry.vertices[0].y +=  value;
//				shape3D.geometry.vertices[1].y +=  value;
//				angleValue = 0;
//			} else if (shape3D.shapeType == 3) {
//				shape3D.geometry.vertices[0].x +=  value;
//				shape3D.geometry.vertices[1].x +=  value;
//				angleValue = 90;
//			}	
//		};
//       if (plane3DName == "yz") {
////			Verify type of Line 
//    	   if(shape3D.shapeType != 3 && shape3D.shapeType != 5) {	   
//		    	console.log("Wrong Line Type");
//				return;
//		    }
//			if (shape3D.shapeType == 3) {
//				shape3D.geometry.vertices[0].z +=  value;
//				shape3D.geometry.vertices[1].z +=  value;
//				angleValue = 0;
//			}else {
//				shape3D.geometry.vertices[0].y +=  value;
//				shape3D.geometry.vertices[1].y +=  value;
//				angleValue = 90;
//			}
//
//       };   
//       if (plane3DName == "xz") {
////			Verify type of Line 
//    	   if(shape3D.shapeType != 1 && shape3D.shapeType != 5) {	    
//    		   
//		    	console.log("Wrong Line Type");
//				return;
//		    }
//			if (shape3D.shapeType== 1) {
//				shape3D.geometry.vertices[0].z +=  value;
//				shape3D.geometry.vertices[1].z +=  value;
//				angleValue = 0;
//			}else {
//				shape3D.geometry.vertices[0].x += value;
//				shape3D.geometry.vertices[1].x += value;
//				angleValue = 90;
//			}
//	};
	
	shape3D.geometry.vertices[0].x = roundNB(shape3D.geometry.vertices[0].x);
	shape3D.geometry.vertices[1].x = roundNB(shape3D.geometry.vertices[1].x);
	shape3D.geometry.vertices[0].y = roundNB(shape3D.geometry.vertices[0].y);
	shape3D.geometry.vertices[1].y = roundNB(shape3D.geometry.vertices[1].y);
	shape3D.geometry.vertices[0].z = roundNB(shape3D.geometry.vertices[0].z);
	shape3D.geometry.vertices[1].z = roundNB(shape3D.geometry.vertices[1].z);
		
	
	shape3D.geometry.verticesNeedUpdate = true;
	
	
	
	var jsonData = null;
	jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, ';
	jsonData += '"x1":' + shape3D.geometry.vertices[0].x + ', "y1":' + shape3D.geometry.vertices[0].y  + ', "z1":' + shape3D.geometry.vertices[0].z + ', '
	   	 + '"x2":' + shape3D.geometry.vertices[1].x + ', "y2":' + shape3D.geometry.vertices[1].y +  ', "z2":' + shape3D.geometry.vertices[1].z + ', '
		 + '"x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":'+angleValue+', "parent":' + shape3D.dbParent + ', "shapeType":' + shape3D.shapeType + '}';		
	

  console.log(" build json is "+ jsonData);
  
  
  var successFunction = function( data ) {	
		console.log("Construction Line saved in DB!" + data);	
		$('#console-log').append("<p style='color:blue'>Construction Line saved properly</p>");
//		reset position to null
		shape3D.position.copy(new THREE.Vector3(0, 0, 0));
//		shape3D.position.x = xMovingDiff;
//		shape3D.position.y = yMovingDiff;
//		shape3D.position.z = zMovingDiff;
//		shape3D.value = 0;
		
		shape3D.dbId = data.id;
//		shape3D.shapeType = data.shapeType;
		shape3D.shape = data.shape;
		shape3D.isConstruction = data.isConstruction;
		shape3D.childIds = [];
		
		shape3D.dbAngle = data.angle;
		
        shape3D.line3dIndex = lines3d.children.length -1;                           // add index of the shape in lines3d       
		addChildLineID(shape3D.dbParent, data.id);	
	};
	
	var failFunction = function( xhr, status, error ) {
		$('#console-log').append("<p style='color:red'>Failed to save the shape"+xhr.status +" </p>");
		console.log('failed to save the shape : '+ xhr.status);
	};
	
	var apis = new shapeApis();
		
	apis.addShape3D(jsonData, successFunction, failFunction );	
  
//	}	
}

//This Update the selected Shape -- code needed only for selected line
ModelShapeUtils.update3DShape = function(){
	console.log("reset the position value for selected line");
	if (!selected3DLine) {
	       return;
	}	
	// clear the position value
	selected3DLine.position.x = 0;
	selected3DLine.position.y = 0;
	selected3DLine.position.z = 0;
	var value = selected3DLine.value;	
	console.log(" value is :"+ value);
//	call function to update vertices and save line 
	ModelShapeUtils.updateLineShape(selected3DLine, value);
}

//========================================================================================================================================================================
ModelShapeUtils.updateLineShape = function (line,value ) {
	   console.log("Inside update construction line");
	   var angleValue = 0;
	   var json_updateShape = null;
	   if (!line) {
			console.log(" Nothing to update ");
			return;
		}
		
//		Verify Plane selection done 
		if ((plane3DName != "xy") &&  (plane3DName != "yz")&&(plane3DName != "xz")){
			console.log("Wrong Plane Name");
			return;
		}

	//*********************************************************************************************	
//		Update vertices values by adding the offset 
		if (plane3DName == "xy") {
//			Verify type of Line 
		    if(line.shapeType != 1 && line.shapeType != 3) {
		    	console.log("Wrong Line Type");
				return;
		    }
			if (line.shapeType == 1) {
				line.geometry.vertices[0].y += value;
				line.geometry.vertices[1].y += value;
				angleValue = 0;
			} else if (line.shapeType == 3) {
				line.geometry.vertices[0].x += value;
				line.geometry.vertices[1].x += value;
				angleValue = 90;
			}	
		};
		
		 if (plane3DName == "yz") {
//				Verify type of Line 
	 	   if(line.shapeType  != 3 && line.shapeType  != 5){
			    	console.log("Wrong Line Type");
					return;
		    }
			if (line.shapeType  == 3) {
				line.geometry.vertices[0].z += value;
				line.geometry.vertices[1].z += value;
				angleValue = 0;
			} else {
				line.geometry.vertices[0].y += value;
				line.geometry.vertices[1].y += value;
				angleValue = 90;
			}
	    };   
	    if (plane3DName == "xz") {
//				Verify type of Line 
	 	   if(line.shapeType  != 1 && line.shapeType  != 5){
			    	console.log("Wrong Line Type");
					return;
		   }
			if (line.shapeType  == 1) {
				line.geometry.vertices[0].z += value;
				line.geometry.vertices[1].z += value;
				angleValue = 0;
			} else {
				line.geometry.vertices[0].x += value;
				line.geometry.vertices[1].x += value;
				angleValue = 90;
			}
		};  
	
		line.geometry.verticesNeedUpdate = true;
		line.material.color= new THREE.Color(line3dColor)
		line.material.needsUpdate = true;
		
		ModelShapeUtils.saveUpdated3DShape(line, angleValue);		
}



ModelShapeUtils.saveUpdated3DShape =   function (line, angleValue) {
	//************************************************************************************************
    //	     Build the json for the construction line 
	//************************************************************************************************
	var json_updateShape;
	json_updateShape = '{"shapeId":' + line.dbId+ ',"modelId":' + curModel + ',"isConstruction":'+ line.isConstruction + ', "shape": '+ line.shape + ',' ;
	json_updateShape += '"x1":' + line.geometry.vertices[0].x + ', "y1":' + line.geometry.vertices[0].y  + ', "z1":' + line.geometry.vertices[0].z + ', '
  	 + '"x2":' + line.geometry.vertices[1].x + ', "y2":' + line.geometry.vertices[1].y +  ', "z2":' + line.geometry.vertices[1].z + ', '
	 + '"x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":'+angleValue+', "parent":' + line.dbParent + ', "shapeType":' + line.shapeType + '}';		
	
	console.log(" build json is "+json_updateShape);
	//************************************************************************************************
	//           SAVE SHAPE IN DB 
	////************************************************************************************************
	var successFunction = function( data ) {	
		console.log("Construction Line  "+line.dbId +"  vertices updated in DB with the difference !" );	
		$('#console-log').append("<p style='color:blue'>Construction Line updated properly</p>");					
		console.log("  Line updated");									
	};	
	var failFunction = function( xhr, status, error ) {
		$('#console-log').append("<p style='color:red'>Failed to save the shape"+xhr.status +" </p>");
		console.log('failed to save the shape : '+ xhr.status);
	};	
	var apis = new shapeApis();
	
	apis.updateShape3D(json_updateShape, successFunction, failFunction );		
}

ModelShapeUtils.displayShapes3D = function(shapes) {
	currContours=[]; 
	groupShapes.length= 0 ; 
	var line3dIndex ;
	if (lines3d == null) {
		console.log("No shapes to display")
		return;
	}
	
	for (var i = 0; i < shapes.length; i++) {		
			
		if (shapes[i].shape == "LINE") {
			if(shapes[i].isConstruction){
				if (shapes[i].hasOwnProperty("parent")) {
					line3dIndex = ModelShapeUtils.displayLine3js(line3dColor, shapes[i], 'LINE');
					shapes[i].line3dIndex = line3dIndex;
				} else {
					var axisColor = getAxisConstructionLineColor(shapes[i]);
					if (axisColor != null) {
						line3dIndex = ModelShapeUtils.displayLine3js(axisColor, shapes[i], 'axis');
					} else {
						console.log("Wrong Shape Data: " + shapes[i].id);
					}
				}
			}
		}
		// TODO !!!
		if (shapes[i].groupShape == "RECTANGLE") {
		}
		// TODO !!!
		if (shapes[i].groupShape == "TEXT") {
		}
//		Contour display 
		if (shapes[i].groupShape == "LINE") {
			if (shapes[i].shape == "LINE") {  
				line3dIndex = ModelShapeUtils.displayLine3js(cntr3DColor, shapes[i], 'cntr');
//				    shapes[i].sn = lines3d.children.length - 1;
				    shapes[i].line3dIndex = line3dIndex;
				    var ind = findGroupInGroupShapes(shapes[i].group);
					if(ind  === -1){		
						var parent = []; parent.push(shapes[i].parent);
						var shapeEls = []; shapeEls.push(shapes[i]);
						groupShapes.push({
							type:"cntrGroup", 
							group:      shapes[i].group,
							parentIds : parent,
							shapes :    shapeEls
						});
					}else {
                        var list1 = groupShapes[ind].parentIds;
                        list1.push(shapes[i].parent);
                        groupShapes[ind],parentIds = list1;
						var list = groupShapes[ind].shapes;
						list.push(shapes[i]);
						groupShapes[ind].shapes = list;
					}
					
			
//			displayLine3js(cntr3DColor, shapes[i], 'cntr');
			
			}		
		}
	}	
		
};

ModelShapeUtils.displayLine3js = function(lineColor, shape, type){
	
	var sn;
	var tmpLine = null;
	
	if (type == 'axis') {
		tmpLine = ModelShapeUtils.drawAxis3D(lineColor, [shape.x1, shape.y1, shape.z1], [shape.x2, shape.y2, shape.z2]);
		tmpLine.shapeType = shape.shapeType;
		tmpLine.renderOrder = 0;
		
		tmpLine.dbId = shape.id;
		if (shape.hasOwnProperty("parent")) {
			tmpLine.dbParent = shape.parent;
		} else {
			tmpLine.dbParent = null;
		}
		tmpLine.dbAngle = shape.angle;
		if(shape.hasOwnProperty("property")){tmpLine.property = shape.property}
		tmpLine.shape = shape.shape;
		tmpLine.isConstruction = shape.isConstruction;
		
		if (lineColor == xAxisColor) {
			tmpLine.axis = 'x';
		} else if (lineColor == yAxisColor) {
			tmpLine.axis = 'y';
		} else if (lineColor == zAxisColor) {
			tmpLine.axis = 'z';
		}

		tmpLine.childIds = [];
		lines3d.add(tmpLine);
		tmpLine.line3dIndex = lines3d.children.length - 1;
	    sn = tmpLine.line3dIndex;
		if(action3D != 'adjust') addChildLineID(shape.parent, shape.id);
		tmpLine= null;
		
	} else if (type == 'LINE') {
		tmpLine = ModelShapeUtils.drawLine3D(lineColor, [shape.x1, shape.y1, shape.z1], [shape.x2, shape.y2, shape.z2]);
		tmpLine.shapeType = shape.shapeType;
		tmpLine.renderOrder = 0;
		
		tmpLine.dbId = shape.id;
		if (shape.hasOwnProperty("parent")) {
			tmpLine.dbParent = shape.parent;
		} else {
			tmpLine.dbParent = null;
		}
		tmpLine.dbAngle = shape.angle;
		if(shape.hasOwnProperty("property")){tmpLine.property = shape.property}
		tmpLine.shape = shape.shape;
		tmpLine.isConstruction = shape.isConstruction;
		
		if (lineColor == xAxisColor) {
			tmpLine.axis = 'x';
		} else if (lineColor == yAxisColor) {
			tmpLine.axis = 'y';
		} else if (lineColor == zAxisColor) {
			tmpLine.axis = 'z';
		}

		tmpLine.childIds = [];
		lines3d.add(tmpLine);
		tmpLine.line3dIndex = lines3d.children.length - 1;
	    sn = tmpLine.line3dIndex;
		if(action3D != 'adjust') addChildLineID(shape.parent, shape.id);
		tmpLine= null;
		
	} else if (type == 'cntr') {
		tmpLine = ModelShapeUtils.drawContour3D(lineColor, [shape.x1, shape.y1, shape.z1], [shape.x2, shape.y2, shape.z2]);
		tmpLine.shapeType = shape.shapeType;
		tmpLine.groupShape = shape.groupShape;
		tmpLine.group = shape.group;
		tmpLine.renderOrder = 1;
		
		tmpLine.dbId = shape.id;
		if (shape.hasOwnProperty("parent")) {
			tmpLine.dbParent = shape.parent;
		} else {
			tmpLine.dbParent = null;
		}
		tmpLine.dbAngle = shape.angle;
		if(shape.hasOwnProperty("property")){tmpLine.property = shape.property}
		tmpLine.shape = shape.shape;
		tmpLine.isConstruction = shape.isConstruction;
		
		if (lineColor == xAxisColor) {
			tmpLine.axis = 'x';
		} else if (lineColor == yAxisColor) {
			tmpLine.axis = 'y';
		} else if (lineColor == zAxisColor) {
			tmpLine.axis = 'z';
		}

		tmpLine.childIds = [];
		lines3d.add(tmpLine);
		tmpLine.line3dIndex = lines3d.children.length - 1;
	    sn = tmpLine.line3dIndex;
		if(action3D != 'adjust') addChildLineID(shape.parent, shape.id);
		tmpLine= null;
	}
	
//	tmpLine.dbId = shape.id;
//	if (shape.hasOwnProperty("parent")) {
//		tmpLine.dbParent = shape.parent;
//	} else {
//		tmpLine.dbParent = null;
//	}
//	tmpLine.dbAngle = shape.angle;
//	if(shape.hasOwnProperty("property")){tmpLine.property = shape.property}
//	tmpLine.shape = shape.shape;
//	tmpLine.isConstruction = shape.isConstruction;
//	
//	if (lineColor == xAxisColor) {
//		tmpLine.axis = 'x';
//	} else if (lineColor == yAxisColor) {
//		tmpLine.axis = 'y';
//	} else if (lineColor == zAxisColor) {
//		tmpLine.axis = 'z';
//	}
//
//	tmpLine.childIds = [];
//	lines3d.add(tmpLine);
//	tmpLine.line3dIndex = lines3d.children.length - 1;
//    sn = tmpLine.line3dIndex;
//	if(action3D != 'adjust') addChildLineID(shape.parent, shape.id);
//	tmpLine= null;
    return sn;
}

//==================================================================================
ModelShapeUtils.drawAxis3D = function(axisColor, startPoint, endPoint) {
	
	var tmpMaterial = new THREE.LineBasicMaterial({
		color: axisColor, 
	});


	var tmpGeometry = new THREE.Geometry();
	tmpGeometry.vertices.push(
			new THREE.Vector3(startPoint[0], startPoint[1], startPoint[2]),
			new THREE.Vector3(endPoint[0], endPoint[1], endPoint[2])
	);

	tmpGeometry.computeLineDistances();

	var tmpShape = new THREE.LineSegments(tmpGeometry, tmpMaterial);

	return tmpShape;
	
}

ModelShapeUtils.drawLine3D = function(lineColor, startPoint, endPoint) {
	
	var tmpMaterial = new THREE.LineDashedMaterial({
				color: lineColor, 
			});
	
	
	var tmpGeometry = new THREE.Geometry();
	tmpGeometry.vertices.push(
		new THREE.Vector3(startPoint[0], startPoint[1], startPoint[2]),
		new THREE.Vector3(endPoint[0], endPoint[1], endPoint[2])
	);
	
	tmpGeometry.computeLineDistances();
	
	var tmpShape = new THREE.LineSegments(tmpGeometry, tmpMaterial);
	
	return tmpShape;
	
}

ModelShapeUtils.drawContour3D = function(contourColor, startPoint, endPoint) {
	
	var tmpMaterial = new THREE.LineBasicMaterial({
				color: contourColor, 
			});
	
	
	var tmpGeometry = new THREE.Geometry();
	tmpGeometry.vertices.push(
		new THREE.Vector3(startPoint[0], startPoint[1], startPoint[2]),
		new THREE.Vector3(endPoint[0], endPoint[1], endPoint[2])
	);
	
	tmpGeometry.computeLineDistances();
	
	var tmpShape = new THREE.LineSegments(tmpGeometry, tmpMaterial);
	
	return tmpShape;
	
}



