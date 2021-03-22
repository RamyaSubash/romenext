function displayShapes3D(shapes) {
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
					line3dIndex = displayLine3js(line3dColor, shapes[i], 'LINE');
					shapes[i].line3dIndex = line3dIndex;
				} else {
					var axisColor = getAxisConstructionLineColor(shapes[i]);
					if (axisColor != null) {
						line3dIndex = displayLine3js(axisColor, shapes[i], 'LINE');
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
				line3dIndex = displayLine3js(cntr3DColor, shapes[i], 'cntr');
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
		
}


//====================================================================================
function displayLine3js(lineColor, shape, type){
	var sn ;
	var tmpLine = drawLine3D(lineColor, [shape.x1, shape.y1, shape.z1], [shape.x2, shape.y2, shape.z2]);
	
	tmpLine.shapeType = shape.shapeType;
	if(type == 'cntr') {
		tmpLine.groupShape = shape.groupShape;
		tmpLine.group = shape.group;
		
	}
	tmpLine.dbId = shape.id;
	if (shape.hasOwnProperty("parent")) {
		tmpLine.dbParent = shape.parent;
	} else {
		tmpLine.dbParent = null;
	}
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
    return sn;
}

//==================================================================================
function drawLine3D(lineColor, startPoint, endPoint) {
	
	var tmpMaterial = new THREE.LineBasicMaterial({
				color: lineColor, 
			});
	
	
	var tmpGeometry = new THREE.Geometry();
	tmpGeometry.vertices.push(
		new THREE.Vector3(startPoint[0], startPoint[1], startPoint[2]),
		new THREE.Vector3(endPoint[0], endPoint[1], endPoint[2])
	);
	
	tmpGeometry.computeLineDistances();
	return new THREE.LineSegments(tmpGeometry, tmpMaterial);
	
}

//========================================================================









