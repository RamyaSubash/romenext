/**
 * 
 */

function displayPartShapesDisplay(shapes, eleId, isCorrShow) {    // shapes: what to display; eleId: where to display 
	
	if (shapes == null) {
		return;
	}
	
	var canvas = document.getElementById(eleId);
//	canvas.innerHTML = "";
	var svgNS = "http://www.w3.org/2000/svg";
	svgNB++;
//	var g = canvas.createElement("g");
	var svg = document.createElementNS(svgNS,"svg");
    svg.setAttribute('id', 'svg'+svgNB);
//    svg.setAttribute('draggable', true);
    svg.setAttribute('onload', 'init('+svgNB+')');
//    svg.setAttribute('class', "dragTarget")
    svg.setAttribute('onmouseup', 'mouseUp(evt)');
    svg.setAttribute('onmousedown', 'selectObject(evt)');
    svg.setAttribute('onmousemove', 'svgCursor(evt),moveElement(evt)');
  
	
	
	
	var groupEndIndicator = true;
	var preGroupId = null;
	
	var rect_tmp = [];
	var circ_tmp = [];
	var text_tmp = [];
	var parents = [];
	var shapeIds = [];
		
	verticalLines = [];
	verticalLines.unshift({id:"grid_y_pv",uid : -2,  val:100});
	horizontalLines = [];
	horizontalLines.unshift({id:"grid_x_pv",uid: -1, val:650});
	lines = [];
	rects = [];
	circs = [];

	texts = [];
	texts.unshift({id: 'text0_pv', x: 45, y: 672});
	
	linesInOtherPlanes = [];
	textsInOtherPlanes = [];
	
	var linesInDisplayView = [];
	var rectsInDisplayView = [];
	var textsInDisplayView = [];
	var circleInDisplayView = [];	

	if (typeof isCorrShow == 'undefined' || isCorrShow == null || isCorrShow) {
		if (topLevelTab == "typeDesignViewTab") {
			canvas.innerHTML = "";
		} else if (topLevelTab == "instRelViewTab") {
		}
	}

	// added by Baya today 14-09-2016
	
	colorRect='blue';
	var parentChildState = 1;
	if (physicalModelView == "child") {
		parentChildState = 3;
		colorRect = 'green';
	}
	
	
	for (var i = 0; i < shapes.length; i++) {
		
		if (shapes[i].parentChildState == parentChildState) {
			
		if (shapes[i].shape == "LINE") {
			var parentId;
			if (!('parent' in shapes[i])) {
				if (Math.abs(shapes[i].angle - 90) < 0.0001) {
					parentId = -2;
				} else if (Math.abs(shapes[i].angle) < 0.0001) {
					parentId = -1;
				}		
			} else {
				parentId = shapes[i].parent;
			}
			
			if (shapes[i].isConstruction) {			
				if (Math.abs(shapes[i].angle - 90) < 0.0001) {
					// vertical line
					var x_coor = getVerticalLineCoor(shapes, i) + 100; //AL: hard coded for now
//					g.innerHTML += "<line x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";										
				} else if (Math.abs(shapes[i].angle) < 0.0001) {	
					// horizontal line
					var y_coor = 650 + getHorizontalLineCoor(shapes, i); //AL: hard coded for now					
//					g.innerHTML += "<line x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
				}			
			} 	
		}
		
				
		if (shapes[i].groupShape == "RECTANGLE") {
			console.log("rectangle!!!");
			if (shapes[i].parent != null) {
				parents.push(shapes[i].parent);
			} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
				parents.push(-2);
			} else {
				parents.push(-1);
			}
			
			shapeIds.push(shapes[i].id);
			if (Math.abs(shapes[i].angle - 90) < 0.0001) {
				rect_tmp.splice(0, 0, shapes[i].x1);
			} else if (Math.abs(shapes[i].angle) < 0.0001) {
				rect_tmp.push(shapes[i].y1);				
			}
			if (rect_tmp.length == 4) {
				rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, svg));
				rect_tmp = [];
				parents = [];
				shapeIds = [];
			}
			
			
			
		}
		
		if (shapes[i].groupShape == "TEXT") {
			console.log("text!!!");
			
			if (shapes[i].parent != null) {
				parents.push(shapes[i].parent);
			} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
				parents.push(-2);
			} else if (Math.abs(shapes[i].angle - 0) < 0.0001) {
				parents.push(-1);
			} else {
				console.log("------------- angle 45");
			}
			shapeIds.push(shapes[i].id);
			
			var text_element_tmp = {};
			text_element_tmp.x = shapes[i].x1;
			text_element_tmp.y = shapes[i].y1;
			text_tmp.push(text_element_tmp);
			
			if (text_tmp.length == 3) {
				var x = text_tmp[0].x * zoomLevels[zoomLevel] + verticalLines[0].val;
				var y = text_tmp[0].y * zoomLevels[zoomLevel] + horizontalLines[0].val;
				console.log("x = " + x + " y = " + y);
				
				var textId = "text" + textNumber;
				var place , value = 'TEXT';
				if (shapes[i].property) {
					// Retrieve Text value, position from the record in shapes
					var  posiText = shapes[i].property.propertyPositionType;
					
					if (posiText == 1) {
						place = 'end';}
					else if(posiText == 3) {
						place = 'middle';}
					else if(posiText == 5) {
						place = 'startT';}
					else {
						console.log("Wrong Text Modifier Type!");
					}
					value =  shapes[i].property.textValue;
					// display the text in the canvas
					svgg.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='"+place+"'>"+value+"</text>";
				} else {
					svg.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";  //???????????????????
				}
				// save the information in 
				textsInDisplayView.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value});
				texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
				groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, textValue: value});
				textNumber++;
				text_tmp = [];
				parents = [];
				shapeIds = [];
			}	
		}
		
		if (shapes[i].groupShape == "LINE") {
			console.log("Inside display Part contour!!!");	
			var real_x1, real_x2, real_y1, real_y2;		
			real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
			real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
			real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
			real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
			console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
			
			lineid = "line_" + lineNumber;
			
			svg.innerHTML += "<line id='" + lineid + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
			lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
			linesInDisplayView.push({x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
			lineNumber++;
		}
		
		if (shapes[i].groupShape == "CIRCLE") {
			console.log("Inside display Part circle!!!");
			// TODO: Need to check if this circle shape has a parent
			parents.push(shapes[i].parent);
			shapeIds.push(shapes[i].id);
			
			var circ_element_tmp = {};
			circ_element_tmp.x1 = shapes[i].x1;
			circ_element_tmp.y1 = shapes[i].y1;
			circ_element_tmp.radius = shapes[i].width;
			circ_tmp.push(circ_element_tmp);
			
			if (circ_tmp.length == 4) {
				displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, svg);
				rectsInDisplayView.push(displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, svg));
				circ_tmp = [];
				parents = [];
				shapeIds = [];
				
			}
	}	
	
	}
	
//	if (!isCorrShow) {
//	
//		var jsonString = '{';
//		
//		var jsonStringTemp = '"lines":[';
//		for (var i = 0; i < linesInDisplayView.length; i++) {
//			jsonStringTemp += '{x1:' + Math.round(linesInDisplayView[i].x1) + ',y1:' + Math.round(linesInDisplayView[i].y1) + ',x2:' + Math.round(linesInDisplayView[i].x2) + ',y2:' + Math.round(linesInDisplayView[i].y2) + '},';
//		}
//		jsonStringTemp += ']';
//		jsonString += jsonStringTemp;
//		
//		var jsonStringTemp = '"rects":[';
//		for (var i = 0; i < rectsInDisplayView.length; i++) {
//			jsonStringTemp += '{x:' + Math.round(rectsInDisplayView[i].x) + ',y:' + Math.round(rectsInDisplayView[i].y) + ',height:' + Math.round(rectsInDisplayView[i].height) + ',width:' + Math.round(rectsInDisplayView[i].width) + '},';
//		}
//		jsonStringTemp += ']';
//		jsonString += jsonStringTemp;
//		
//		var jsonStringTemp = '"texts":[';
//		for(var i=0; i<textsInDisplayView.length; i++){
//			jsonStringTemp += 'x:'+ Math.round(textsInDisplayView[i].x)  + ',y:' + Math.round(textsInDisplayView[i].y) + ' value of text'+textsInDisplayView[i].textvalue + ' }, ';
//		}
//		jsonStringTemp += ']';
//		
//		jsonString += jsonStringTemp;
//		jsonString += '}';
//		
//		console.log("the json string to store in neo4j" + jsonString);
//		
//		// here we get the json to store into neo4j. need to implement code to do this!
//		// [[pos 1]]
//
//	}
}
//	if(selecteddecorator == 'Physical' && (topLevelTab == "instRelViewTab") ) {endCanVas.innerHTML +="</g>";}
	console.log("content of g is: "+ svg.innerHTML);
	canvas.appendChild(svg) ;
}
































//function displayShapes(shapes) {
//	
//	if (shapes == null) {
//		return;
//	}
//	
//	var canvas = document.getElementById("pdsvsvg");
//	var div = "pdsvsvg";
//	
////	resetMemo();   // doing nothing !!!!!!!!!!!!!!!!!!
////	removePhysicalDesignView();
//	
//	initPhysicalDesignView();
//	console.log("display shapes");
////	console.log(shapes);
//	
//	var groupEndIndicator = true;
//	var preGroupId = null;
//	
//	var rect_tmp = [];
//	var circ_tmp = [];
//	var text_tmp = [];
//	
//	var parents = [];
//	var shapeIds = [];
//	var groupShapeParents = [];
//	
//	
//	var parentChildState = 1;
//	if (physicalModelView == "child") {
//		parentChildState = 3;
//	}
//
//	for (var i = 0; i < shapes.length; i++) {
//		if (shapes[i].parentChildState == parentChildState) {
//		if (shapes[i].shape == "LINE") {
//			var parentId;
//			if (!('parent' in shapes[i])) {
//				if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//					parentId = -2; // -2 means y-axis
//				} else if (Math.abs(shapes[i].angle) < 0.0001) {
//					parentId = -1; // -1 means x-axis
//				}
//				
//			} else {
//				parentId = shapes[i].parent;
//			}
//			
//			if (shapes[i].isConstruction) {
//				if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//					// vertical line
//					var x_coor = getVerticalLineCoor(shapes, i) * zoomLevels[zoomLevel] + verticalLines[0].val;			
//					var lineId = 'grid_' + shapes[i].id;
//					canvas.innerHTML += "<line id=" + lineId + " x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
//					verticalLines.push({id: lineId, val: Number(x_coor), uid: shapes[i].id, parent: parentId});
//				} else if (Math.abs(shapes[i].angle) < 0.0001) {
//					// horizontal line
//					var y_coor = getHorizontalLineCoor(shapes, i) * zoomLevels[zoomLevel] + horizontalLines[0].val;				
//					var lineId = 'grid_' + shapes[i].id;
//					canvas.innerHTML += "<line id=" + lineId + " x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
//					horizontalLines.push({id: lineId, val: Number(y_coor), uid: shapes[i].id, parent: parentId});
//				}
//			} 	
//		}
//		
//				
//		if (shapes[i].groupShape == "RECTANGLE") {
////			console.log("rectangle!!!");
//			if (shapes[i].parent != null) {
//				parents.push(shapes[i].parent);
//			} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//				parents.push(-2);
//			} else {
//				parents.push(-1);
//			}
//			shapeIds.push(shapes[i].id);
//			
//			if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//				rect_tmp.splice(0, 0, shapes[i].x1);
//				if (rect_tmp.length == 4) {
//					displayRectFill(rect_tmp, parents, shapeIds, shapes[i].group, div);
//					rect_tmp = [];
//					parents = [];
//					shapeIds = [];
//				}
//			} else if (Math.abs(shapes[i].angle) < 0.0001) {
//				rect_tmp.push(shapes[i].y1);
//				if (rect_tmp.length == 4) {
//					displayRectFill(rect_tmp, parents, shapeIds, shapes[i].group, div);
//					rect_tmp = [];
//					parents = [];
//					shapeIds = [];
//				}
//			}
//			
//			
//		}
//		
//		if (shapes[i].groupShape == "TEXT") {
////			console.log("text!!!");
//			
//			if (shapes[i].parent != null) {
//				parents.push(shapes[i].parent);
//			} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//				parents.push(-2);
//			} else if (Math.abs(shapes[i].angle - 0) < 0.0001) {
//				parents.push(-1);
//			} else {
//				console.log("------------- angle 45");
//			}
//			shapeIds.push(shapes[i].id);
//			
//			var text_element_tmp = {};
//			text_element_tmp.x = shapes[i].x1;
//			text_element_tmp.y = shapes[i].y1;
//			text_tmp.push(text_element_tmp);
//			
//			if (text_tmp.length == 3) {
//				var x = text_tmp[0].x * zoomLevels[zoomLevel] + verticalLines[0].val;
//				var y = text_tmp[0].y * zoomLevels[zoomLevel] + horizontalLines[0].val;
//				console.log("x = " + x + " y = " + y);
//				
//				var textId = "text" + textNumber;
//				var textToStore= 'TEXT';
//				if (shapes[i].property) {
//					var foundModelProp = null;
//					for (var j = 0; j < curModelProperties.length; j++) {
//						if (curModelProperties[j].id == shapes[i].property.id) {
//							foundModelProp = curModelProperties[j];
//						}
//					}
//					var posiText;
//					if (foundModelProp.propertyPositionType == 1) {
//						posiText = 'end';}
//					else if(foundModelProp.propertyPositionType == 3) {
//						posiText = 'middle';}
//					else if(foundModelProp.propertyPositionType == 5) {
//						posiText = 'startT';}
//					else {
//						console.log("Wrong Text Modifier Type!");                              //  text will be positioned at the start
//						posiText ='startT';
//					}
//					
//					canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='"+posiText+"'>"+foundModelProp.defaultValue+"</text>";
//					textToStore = foundModelProp.defaultValue;
//
//				} else {
//					canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";
//				}
//
//				texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue : textToStore });
//				groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, shapeId: shapeIds[2], textValue : textToStore});
//				textNumber++;
//				text_tmp = [];
//				parents = [];
//				shapeIds = [];
//			}	
//		}
//		
//		if (shapes[i].groupShape == "LINE") {
//			console.log("contour!!!");
//			if (shapes[i].shape == "LINE") {
//				
//				//AL: probably need a line id and need to take care of zoom and move
//				
//				lineId = "line_" + lineNumber;
//				
//				var real_x1, real_x2, real_y1, real_y2;
//				
//				real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//				real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//				real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//				real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
//				
//				console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
//				lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id})
//				canvas.innerHTML += "<line id='" + lineId + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='BlueViolet' stroke-width='5'/>";
//				lineNumber++;
//				
//			} else if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
//				
//				var circConId = "circCon" + circConNumber;
//				
//				var real_x1, real_x2, real_y1, real_y2;
//				real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//				real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//				real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//				real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
//				console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
//				
//				var radius;
//				var groupParent;
//				for (var j = 0; j < shapes.length; j++) {		
//					if (shapes[j].group == shapes[i].groupShapeParent) {
//						radius = shapes[j].width;
//					}
//				}
//					
//				var largeArcFlag;
//				if (shapes[i].shape == "SMALLARC") {
//					canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 0 0 ' + real_x2 + ' ' + real_y2 + '" stroke="blue" stroke-width="5" fill="none"/>';
//					largeArcFlag = false;
//				} else {
//					canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 1 0 ' + real_x2 + ' ' + real_y2 + '" stroke="blue" stroke-width="5" fill="none"/>';
//					largeArcFlag = true;
//				}
//			
//				circCons.push({id: circConId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, r: radius, largeArcFlag: largeArcFlag, uid: shapes[i].id, group: shapes[i].group, groupShapeParent: shapes[i].groupShapeParent});
//				circConNumber++;
//				
//			} else {
//				 console.log("Wrong Shape for Group Shape");
//			}
//			
//			if (preGroupId == null) {
//				if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
//					groupShapeParents.push(shapes[i].groupShapeParent);
//				} else if (shapes[i].parent != null) {
//					parents.push(shapes[i].parent);
//				} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//					parents.push(-2);
//				} else {
//					parents.push(-1);
//				}
//				
//				shapeIds.push(shapes[i].id);
//				preGroupId = shapes[i].group;
//				
//			} else if (shapes[i].group != preGroupId) {
////				groupShapes.push({type:"cntrGroup", id:lineId, parents:parents, shapes: shapeIds, group: preGroupId, groupShapeParents:groupShapeParents});
////				parents = [];
////				shapeIds = [];
////				groupShapeParents = [];
//				
//				if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
//					groupShapeParents.push(shapes[i].groupShapeParent);
//					parents.push(shapes[i].groupShapeParent);
//				} else if (shapes[i].parent != null) {
//					parents.push(shapes[i].parent);
//				} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//					parents.push(-2);
//				} else {
//					parents.push(-1);
//				}
//				
//				shapeIds.push(shapes[i].id);
//				preGroupId = shapes[i].group;
//				
//				
//			} else {
//				if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
//					groupShapeParents.push(shapes[i].groupShapeParent);
//					parents.push(shapes[i].groupShapeParent);
//				} else if (shapes[i].parent != null) {
//					parents.push(shapes[i].parent);
//				} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//					parents.push(-2);
//				} else {
//					parents.push(-1);
//				}
//				
//				shapeIds.push(shapes[i].id);
//				preGroupId = shapes[i].group;
//			}
//		
//			if (i == shapes.length - 1) {
//				groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents:groupShapeParents});
//				parents = [];
//				shapeIds = [];
//				groupShapeParents = [];
//			}
//				
////			groupShapes.push({type:"cntrGroup", id:lineId, parents});	
////			groupShapes.push({type:"rectGroup", id:rcflId, parents:parents, shapes: shapeIds, group: groupId});	
//		}
//			
//		if (shapes[i].groupShape == "CIRCLE") {
//			console.log("display circle!!!");
//			
//			if (shapes[i].parent != null) {
//				parents.push(shapes[i].parent);
//			} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//				parents.push(-2);
//			} else if (Math.abs(shapes[i].angle) < 0.0001) {
//				parents.push(-1);
//			}
//			
//			shapeIds.push(shapes[i].id);
//			
//			var circ_element_tmp = {};
//			circ_element_tmp.x1 = shapes[i].x1;
//			circ_element_tmp.y1 = shapes[i].y1;
//			circ_element_tmp.radius = shapes[i].width;
//			circ_tmp.push(circ_element_tmp);
//			
//			if (circ_tmp.length == 4) {
//				displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, div);
//				circ_tmp = [];
//				parents = [];
//				shapeIds = [];
//				
//			}
//			
//		}
//		}	
//	}
//}

//function displayParentChildShapes(shapes) {
//	if (shapes == null) {
//		return;
//	}
//	console.log("Inside display  ParentChild shapes");
//	
//	var canvas = document.getElementById("pdsvsvg");
//	var div = "pdsvsvg";
//	initPhysicalDesignView();
//	
//	var groupEndIndicator = true;
//	var preGroupId = null;
//	
//	var rect_tmp = [];
//	var circ_tmp = [];
//	var text_tmp = [];
//	
//	var parents = [];                  // used to save the list of parents for groupShape: Rectangle, Text, 
//	var shapeIds = [];                 // used to save list of Ids for groupShape: Rectangle, Text
//	var groupShapeParents = [];
//	
//	var parentChildState = 1;
//	if (physicalModelView == "child") {
//		parentChildState = 3;
//	}
//	
//	for (var i = 0; i < shapes.length; i++) {
//		
//		if (shapes[i].parentChildState == parentChildState) {
//			if (shapes[i].shape == "LINE") {	
//				// retrieve the parentId of the shape   In case it is X line or Y line
//				var parentId;
//				if (!('parent' in shapes[i])) {
//					if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//						parentId = -2;
//					} else if (Math.abs(shapes[i].angle) < 0.0001) {
//						parentId = -1;
//					}
//				} else {
//					parentId = shapes[i].parent;                // otherwise take it from the record itself
//				}
//				
//				
//				if (shapes[i].isConstruction) {
//					if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//						// vertical line
//						var x_coor = getVerticalLineCoor(shapes, i) * zoomLevels[zoomLevel] + verticalLines[0].val;				
//						var lineId = 'grid_' + shapes[i].id;
//						canvas.innerHTML += "<line id=" + lineId + " x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
//						verticalLines.push({id: lineId, val: Number(x_coor), uid: shapes[i].id, parent: parentId});
//					} else if (Math.abs(shapes[i].angle) < 0.0001) {
//            			// horizontal line
//						var y_coor = getHorizontalLineCoor(shapes, i) * zoomLevels[zoomLevel] + horizontalLines[0].val;				
//						var lineId = 'grid_' + shapes[i].id;
//						canvas.innerHTML += "<line id=" + lineId + " x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
//						horizontalLines.push({id: lineId, val: Number(y_coor), uid: shapes[i].id, parent: parentId});
//					}
//				} 
//			}
//			
//					
//			if (shapes[i].groupShape == "RECTANGLE") {
//				console.log("rectangle!!!");
//				if (shapes[i].parent != null) {
//					parents.push(shapes[i].parent);
//				} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//					parents.push(-2); // parent of this shape is y axis
//				} else if (Math.abs(shapes[i].angle) < 0.0001) {
//					parents.push(-1); // parent of this shape is x axis
//				}
//				
//				shapeIds.push(shapes[i].id);
//				
//				if (Math.abs(shapes[i].angle - 90) < 0.0001) { // check if angle equals 90 (if it is vertical)
//					rect_tmp.splice(0, 0, shapes[i].x1);
//					if (rect_tmp.length == 4) {                // found all four sides of rectangle
//						displayRectFill(rect_tmp, parents, shapeIds, shapes[i].group, div);
//						rect_tmp = [];
//						parents = [];
//						shapeIds = [];
//					}
//				} else if (Math.abs(shapes[i].angle) < 0.0001) { // check if angle equals 0 (if it is horizontal)
//					rect_tmp.push(shapes[i].y1);
//					if (rect_tmp.length == 4) {
//						displayRectFill(rect_tmp, parents, shapeIds, shapes[i].group, div);
//						rect_tmp = [];
//						parents = [];
//						shapeIds = [];
//					}
//				}
//				
//				
//			}
//			
//			if (shapes[i].groupShape == "TEXT") {
//				console.log("text!!!");
//				if (shapes[i].parent != null) {
//					parents.push(shapes[i].parent);
//				} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//					parents.push(-2);
//				} else if (Math.abs(shapes[i].angle - 0) < 0.0001) {
//					parents.push(-1);
//				} else {
//					console.log("------------- angle 45");
//				}
//				shapeIds.push(shapes[i].id);
//				
//				var text_element_tmp = {};
//				text_element_tmp.x = shapes[i].x1;
//				text_element_tmp.y = shapes[i].y1;
//				text_tmp.push(text_element_tmp);
//				
//				if (text_tmp.length == 3) {
//					var x = text_tmp[0].x * zoomLevels[zoomLevel] + verticalLines[0].val;
//					var y = text_tmp[0].y * zoomLevels[zoomLevel] + horizontalLines[0].val;
//					console.log("x = " + x + " y = " + y);
//					
//					var textId = "text" + textNumber;
//					var textToStore = 'TEXT;'
//					if (shapes[i].property) {
//						var foundModelProp = null;
//						for (var j = 0; j < curModelProperties.length; j++) {
//							if (curModelProperties[j].id == shapes[i].property.id) {
//								foundModelProp = curModelProperties[j];
//							}
//						}
//						
//						var posiText;
//						if (foundModelProp.propertyPositionType == 1) {
//							posiText = 'end';}
//						else if(foundModelProp.propertyPositionType == 3) {
//							posiText = 'middle';}
//						else if(foundModelProp.propertyPositionType == 5) {
//							posiText = 'startT';}
//						else {
//							console.log("Wrong Text Modifier Type!");
//						}
//						
//						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='"+posiText+"'>"+foundModelProp.defaultValue+"</text>";
//						textToStore = foundModelProp.defaultValue;
//						
//					} else {
//						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";
//					}
//
//					texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: textToStore });
//					groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, shapeId: shapeIds[2], textValue: textToStore});
//					textNumber++;
//					text_tmp = [];
//					parents = [];
//					shapeIds = [];
//				}	
//			}
//		
//			
//			if (shapes[i].groupShape == "LINE") {
//				console.log("contour!!!");
//				if (shapes[i].shape == "LINE") {
//					lineId = "line_" + lineNumber;
//					var real_x1, real_x2, real_y1, real_y2;
//					real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//					real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//					real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//					real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
//					
//					console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
//					lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id})
//					canvas.innerHTML += "<line id='" + lineId + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='BlueViolet' stroke-width='5'/>";
//					lineNumber++;
//					
//				} else if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
//					
//					var circConId = "circCon" + circConNumber;
//					var real_x1, real_x2, real_y1, real_y2;
//					real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//					real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//					real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//					real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
//					console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
//					
//					var radius;
//					var groupParent;
//					for (var j = 0; j < shapes.length; j++) {		
//						if (shapes[j].group == shapes[i].groupShapeParent) {
//							radius = shapes[j].width;
//						}
//					}
//						
//					var largeArcFlag;
//					if (shapes[i].shape == "SMALLARC") {
//						canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 0 0 ' + real_x2 + ' ' + real_y2 + '" stroke="BlueViolet" stroke-width="5" fill="none"/>';
//						largeArcFlag = false;
//					} else {
//						canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 1 0 ' + real_x2 + ' ' + real_y2 + '" stroke="BlueViolet" stroke-width="5" fill="none"/>';
//						largeArcFlag = true;
//					}
//				
//					circCons.push({id: circConId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, r: radius, largeArcFlag: largeArcFlag, uid: shapes[i].id, group: shapes[i].group, groupShapeParent: shapes[i].groupShapeParent});		
//					groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents: groupShapeParents});
//					circConNumber++;
//					
//				} else {
//					 console.log("Wrong Shape for Group Shape");
//				}
//				
//				if (preGroupId == null) {
//					if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
//						groupShapeParents.push(shapes[i].groupShapeParent);
//					} else if (shapes[i].parent != null) {
//						parents.push(shapes[i].parent);
//					} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//						parents.push(-2);
//					} else {
//						parents.push(-1);
//					}
//					
//					shapeIds.push(shapes[i].id);
//					
//					preGroupId = shapes[i].group;
//					
//				} else if (shapes[i].group != preGroupId) {
////					groupShapes.push({type:"cntrGroup", id:lineId, parents:parents, shapes: shapeIds, group: preGroupId, groupShapeParents:groupShapeParents});
////					parents = [];
////					shapeIds = [];
////					groupShapeParents = [];
//					
//					if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
//						groupShapeParents.push(shapes[i].groupShapeParent);
//					} else if (shapes[i].parent != null) {
//						parents.push(shapes[i].parent);
//					} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//						parents.push(-2);
//					} else {
//						parents.push(-1);
//					}
//					
//					shapeIds.push(shapes[i].id);
//					
//					preGroupId = shapes[i].group;
//					
//					
//				} else {
//					if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
//						groupShapeParents.push(shapes[i].groupShapeParent);
//					} else if (shapes[i].parent != null) {
//						parents.push(shapes[i].parent);
//					} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//						parents.push(-2);
//					} else {
//						parents.push(-1);
//					}
//					
//					shapeIds.push(shapes[i].id);
//					preGroupId = shapes[i].group;
//				}
//			
//				if (i == shapes.length - 1) {
//					groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents:groupShapeParents});
//					parents = [];
//					shapeIds = [];
//					groupShapeParents = [];
//				}
//							
////				groupShapes.push({type:"cntrGroup", id:lineId, parents});			
////				groupShapes.push({type:"rectGroup", id:rcflId, parents:parents, shapes: shapeIds, group: groupId});
//				
//			}
//			
//			if (shapes[i].groupShape == "CIRCLE") {
//				console.log("display circle!!!");
//				// TODO: Need to check if this circle shape has a parent
//				parents.push(shapes[i].parent);
//				shapeIds.push(shapes[i].id);
//				
//				var circ_element_tmp = {};
//				circ_element_tmp.x1 = shapes[i].x1;
//				circ_element_tmp.y1 = shapes[i].y1;
//				circ_element_tmp.radius = shapes[i].width;
//				circ_tmp.push(circ_element_tmp);
//				
//				if (circ_tmp.length == 4) {
//					displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, div);
//					circ_tmp = [];
//					parents = [];
//					shapeIds = [];
//					
//				}
//				
//			}
//			
//		}
//			
//	}
//}
//


////=======================================================================
//function displayPartShapesParent(shapes, eleId, isCorrShow  ) {  // eleId : where to display; parentState: what to display Parent/Child
//	
//	if (shapes == null) {
//		return;
//	}
//	var parentChild = null;
//    if (physicalModelView == 'parent') {
//    	parentChild = 1;
//    	colorRect = 'blue';
//    } else if (physicalModelView == 'child') {
//    	parentChild = 3;
//    	colorRect = 'green';
//    }
//	
//	var canvas = document.getElementById(eleId);
//	console.log("Inside display part shapes in physical display view!!!!!!!!!!");
//	console.log(shapes);
//	
//	var groupEndIndicator = true;
//	var preGroupId = null;
//	
//	var rect_tmp = [];
//	var circ_tmp = [];
//	var text_tmp = [];
//	var parents = [];
//	var shapeIds = [];
//	
//	verticalLines = [];
//	horizontalLines = [];
//	lines = [];
//	rects = [];
//	circs = [];
//	texts = [];
//	
//	var linesInDisplayView = [];
//	var rectsInDisplayView = [];
//	var textsInDisplayView = [];
//	
//	if (typeof isCorrShow == 'undefined' || isCorrShow == null || isCorrShow) {
//		canvas.innerHTML = "<line id='grid_y_pv' x1='100' y1='3' x2='100' y2='897' stroke=blue stroke-width=2/>";
//		canvas.innerHTML += "<line id='grid_x_pv' x1='0%' y1='650' x2='100%' y2='650' stroke=blue stroke-width=2/>";
//	}
//	
//	verticalLines.push({id:"grid_y_pv",uid : -2,  val:100});
//	horizontalLines.push({id:"grid_x_pv",uid: -1, val:650});
//	
//	for (var i = 0; i < shapes.length; i++) {
//		if(shapes[i].parentChildState == parentChild){
//		
//		if (shapes[i].shape == "LINE") {
//			var parentId;
//			if (!('parent' in shapes[i])) {
//				if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//					parentId = -2;
//				} else if (Math.abs(shapes[i].angle) < 0.0001) {
//					parentId = -1;
//				}		
//			} else {
//				parentId = shapes[i].parent;
//			}
//			
//			if (shapes[i].isConstruction) {			
//				if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//					// vertical line
//					var x_coor = getVerticalLineCoor(shapes, i) + 100; //AL: hard coded for now
////					canvas.innerHTML += "<line x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";										
//				} else if (Math.abs(shapes[i].angle) < 0.0001) {	
//					// horizontal line
//					var y_coor = 650 + getHorizontalLineCoor(shapes, i); //AL: hard coded for now					
////					canvas.innerHTML += "<line x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
//				}			
//			} 	
//		}
//		
//				
//		if (shapes[i].groupShape == "RECTANGLE") {
//			console.log("rectangle!!!");
//			if (shapes[i].parent != null) {
//				parents.push(shapes[i].parent);
//			} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//				parents.push(-2);
//			} else {
//				parents.push(-1);
//			}
//			
//			shapeIds.push(shapes[i].id);
//			if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//				rect_tmp.splice(0, 0, shapes[i].x1);
//				if (rect_tmp.length == 4) {
//					rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, eleId));
//					rect_tmp = [];
//					parents = [];
//					shapeIds = [];
//				}
//			} else if (Math.abs(shapes[i].angle) < 0.0001) {
//				rect_tmp.push(shapes[i].y1);
//				if (rect_tmp.length == 4) {
//					rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, eleId));
//					rect_tmp = [];
//					parents = [];
//					shapeIds = [];
//				}
//			}
//		}
//		
//		if (shapes[i].groupShape == "TEXT") {
//			console.log("text!!!");
//			
//			if (shapes[i].parent != null) {
//				parents.push(shapes[i].parent);
//			} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//				parents.push(-2);
//			} else if (Math.abs(shapes[i].angle - 0) < 0.0001) {
//				parents.push(-1);
//			} else {
//				console.log("------------- angle 45");
//			}
//			shapeIds.push(shapes[i].id);
//			
//			var text_element_tmp = {};
//			text_element_tmp.x = shapes[i].x1;
//			text_element_tmp.y = shapes[i].y1;
//			text_tmp.push(text_element_tmp);
//			
//			if (text_tmp.length == 3) {
//				var x = text_tmp[0].x * zoomLevels[zoomLevel] + verticalLines[0].val;
//				var y = text_tmp[0].y * zoomLevels[zoomLevel] + horizontalLines[0].val;
//				console.log("x = " + x + " y = " + y);
//				
//				var textId = "text" + textNumber;
//				var place , value = 'TEXT';
//				if (shapes[i].property) {
//
////					var foundModelProp = null;
////					for (var j = 0; j < curModelProperties.length; j++) {
////						if (curModelProperties[j].id == shapes[i].property.id) {
////							foundModelProp = curModelProperties[j];
////						}
////					}
//					var  posiText = shapes[i].property.propertyPositionType;
//					
//					if (posiText == 1) {
//						place = 'end';}
//					else if(posiText == 3) {
//						place = 'middle';}
//					else if(posiText == 5) {
//						place = 'startT';}
//					else {
//
//						console.log("Wrong Text Modifier Type!");
//					}
//					value =  shapes[i].property.defaultValue;
//					canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='"+place+"'>"+value+"</text>";
//									
//					
//				} else {
//					canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";  //???????????????????
//				}
//
//				texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
//				groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, textValue: value});
//				textNumber++;
//				text_tmp = [];
//				parents = [];
//				shapeIds = [];
//			}	
//		}
//		
//		if (shapes[i].groupShape == "LINE") {
//			console.log("Inside display Part contour!!!");	
//			var real_x1, real_x2, real_y1, real_y2;		
//			real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//			real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//			real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//			real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
//			console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
//			
//			lineid = "line_" + lineNumber;
//			
//			canvas.innerHTML += "<line x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
//			lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//			linesInDisplayView.push({x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//			lineNumber++;
//		}
//			
//	}
//	}
//	// NOT USED ----------------------- NOT CLEAR !!!!!        Done by Allen
//	if (!isCorrShow) {
//		var jsonString = '{';
//		var jsonStringTemp = '"lines":[';
//		for (var i = 0; i < linesInDisplayView.length; i++) {
//			jsonStringTemp += '{x1:' + Math.round(linesInDisplayView[i].x1) + ',y1:' + Math.round(linesInDisplayView[i].y1) + ',x2:' + Math.round(linesInDisplayView[i].x2) + ',y2:' + Math.round(linesInDisplayView[i].y2) + '},';
//		}
//		jsonStringTemp += ']';
//		jsonString += jsonStringTemp;
//		var jsonStringTemp = '"rects":[';
//		for (var i = 0; i < rectsInDisplayView.length; i++) {
//			jsonStringTemp += '{x:' + Math.round(rectsInDisplayView[i].x) + ',y:' + Math.round(rectsInDisplayView[i].y) + ',height:' + Math.round(rectsInDisplayView[i].height) + ',width:' + Math.round(rectsInDisplayView[i].width) + '},';
//		}
//		jsonStringTemp += ']';
//		jsonString += jsonStringTemp;
//		jsonString += '}';
//		console.log("the json string to store in neo4j" + jsonString);
//		// here we get the json to store into neo4j. need to implement code to do this!
//		// [[pos 1]]
//	}
//
//}
////=====================   ================================
//=======================================================================
//function displayPartShapes(shapes, eleId, isCorrShow) {    // shapes: what to display; eleId: where to display 
//	
//	if (shapes == null) {
//		return;
//	}
//	
//	var canvas = document.getElementById(eleId);
//    
//	console.log("Inside display part shapes in physical display view!!!!!!!!!!");
//	console.log(shapes);
//	
//	var groupEndIndicator = true;
//	var preGroupId = null;
//	
//	var rect_tmp = [];
//	var circ_tmp = [];
//	var text_tmp = [];
//	var parents = [];
//	var shapeIds = [];
//	
//	
//	// difference with displayShapes as these are initialised in the initPhysicalDesignView();
//	verticalLines = [];                                  
//	horizontalLines = [];                                 
//	lines = [];
//	rects = [];
//	circs = [];
//	texts = [];
//	
//	var linesInDisplayView = [];
//	var rectsInDisplayView = [];
//	var textsInDisplayView = [];
//	var circleInDisplayView = [];
//	
////	if (typeof isCorrShow == 'undefined' || isCorrShow == null || isCorrShow) {
////		canvas.innerHTML = "<line id='grid_y_pv' x1='100' y1='3' x2='100' y2='897' stroke=blue stroke-width=2/>";
////		canvas.innerHTML += "<line id='grid_x_pv' x1='0%' y1='650' x2='100%' y2='650' stroke=blue stroke-width=2/>";
////	}
//	
//	if (typeof isCorrShow == 'undefined' || isCorrShow == null || isCorrShow) {
//		if (topLevelTab == "typeDesignViewTab") {
//			canvas.innerHTML = "<line id='grid_y_pv' x1='100' y1='3' x2='100' y2='897' stroke='blue' stroke-width='2'/>";
//			canvas.innerHTML += "<line id='grid_x_pv' x1='0%' y1='650' x2='100%' y2='650' stroke='blue' stroke-width='2'/>";
//		} else if (topLevelTab == "instRelViewTab") {
//			if (document.getElementById("grid_x_pv") == null && document.getElementById("grid_y_pv") == null) {
//				canvas.innerHTML = "<line id='grid_y_pv' x1='100' y1='3' x2='100' y2='897' stroke=blue stroke-width=2/>";
//				canvas.innerHTML += "<line id='grid_x_pv' x1='0%' y1='650' x2='100%' y2='650' stroke=blue stroke-width=2/>";
//			}
//		}
////		canvas.innerHTML = "<line id='grid_y_pv' x1='100' y1='3' x2='100' y2='897' stroke=blue stroke-width=2/>";
////		canvas.innerHTML += "<line id='grid_x_pv' x1='0%' y1='650' x2='100%' y2='650' stroke=blue stroke-width=2/>";
//	}
//	
//	
//	
//	
//	
//	
//	
//	verticalLines.push({id:"grid_y_pv",uid : -2,  val:100});
//	horizontalLines.push({id:"grid_x_pv",uid: -1, val:650});
//	// added by Baya today 14-09-2016
//	
//	
//	colorRect='blue';
//	var parentChildState = 1;
//	if (physicalModelView == "child") {
//		parentChildState = 3;
//		colorRect = 'green';
//	}
//	
//	for (var i = 0; i < shapes.length; i++) {
//		
//		if (shapes[i].parentChildState == parentChildState) {
//			
//		if (shapes[i].shape == "LINE") {
//			var parentId;
//			if (!('parent' in shapes[i])) {
//				if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//					parentId = -2;
//				} else if (Math.abs(shapes[i].angle) < 0.0001) {
//					parentId = -1;
//				}		
//			} else {
//				parentId = shapes[i].parent;
//			}
//			
//			if (shapes[i].isConstruction) {			
//				if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//					// vertical line
//					var x_coor = getVerticalLineCoor(shapes, i) + 100; //AL: hard coded for now
////					canvas.innerHTML += "<line x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";										
//				} else if (Math.abs(shapes[i].angle) < 0.0001) {	
//					// horizontal line
//					var y_coor = 650 + getHorizontalLineCoor(shapes, i); //AL: hard coded for now					
////					canvas.innerHTML += "<line x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
//				}			
//			} 	
//		}
//		
//				
//		if (shapes[i].groupShape == "RECTANGLE") {
//			console.log("rectangle!!!");
//			if (shapes[i].parent != null) {
//				parents.push(shapes[i].parent);
//			} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//				parents.push(-2);
//			} else {
//				parents.push(-1);
//			}
//			
//			shapeIds.push(shapes[i].id);
//			if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//				rect_tmp.splice(0, 0, shapes[i].x1);
//				if (rect_tmp.length == 4) {
//					rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, eleId));
//					rect_tmp = [];
//					parents = [];
//					shapeIds = [];
//				}
//			} else if (Math.abs(shapes[i].angle) < 0.0001) {
//				rect_tmp.push(shapes[i].y1);
//				if (rect_tmp.length == 4) {
//					rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, eleId));
//					rect_tmp = [];
//					parents = [];
//					shapeIds = [];
//				}
//			}
//		}
//		
//		if (shapes[i].groupShape == "TEXT") {
//			console.log("text!!!");
//			
//			if (shapes[i].parent != null) {
//				parents.push(shapes[i].parent);
//			} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//				parents.push(-2);
//			} else if (Math.abs(shapes[i].angle - 0) < 0.0001) {
//				parents.push(-1);
//			} else {
//				console.log("------------- angle 45");
//			}
//			shapeIds.push(shapes[i].id);
//			
//			var text_element_tmp = {};
//			text_element_tmp.x = shapes[i].x1;
//			text_element_tmp.y = shapes[i].y1;
//			text_tmp.push(text_element_tmp);
//			
//			if (text_tmp.length == 3) {
//				var x = text_tmp[0].x * zoomLevels[zoomLevel] + verticalLines[0].val;
//				var y = text_tmp[0].y * zoomLevels[zoomLevel] + horizontalLines[0].val;
//				console.log("x = " + x + " y = " + y);
//				
//				var textId = "text" + textNumber;
//				var place , value = 'TEXT';
//				if (shapes[i].property) {
////                    this code will retrieve the position from the curModelProperties Record 
////					var foundModelProp = null;
////					for (var j = 0; j < curModelProperties.length; j++) {
////						if (curModelProperties[j].id == shapes[i].property.id) {
////							foundModelProp = curModelProperties[j];
////						}
////					}
//					// Retrieve Text value, position from the record in shapes
//					var  posiText = shapes[i].property.propertyPositionType;
//					
//					if (posiText == 1) {
//						place = 'end';}
//					else if(posiText == 3) {
//						place = 'middle';}
//					else if(posiText == 5) {
//						place = 'startT';}
//					else {
//						console.log("Wrong Text Modifier Type!");
//					}
//					value =  shapes[i].property.defaultValue;
//					// display the text in the canvas
//					canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='"+place+"'>"+value+"</text>";
//				} else {
//					canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";  //???????????????????
//				}
//				// save the information in 
//				textsInDisplayView.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value});
//				texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
//				groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, textValue: value});
//				textNumber++;
//				text_tmp = [];
//				parents = [];
//				shapeIds = [];
//			}	
//		}
//		
//		if (shapes[i].groupShape == "LINE") {
//			console.log("Inside display Part contour!!!");	
//			var real_x1, real_x2, real_y1, real_y2;		
//			real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//			real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//			real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//			real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
//			console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
//			
//			lineid = "line_" + lineNumber;
//			
//			canvas.innerHTML += "<line x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
//			lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//			linesInDisplayView.push({x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//			lineNumber++;
//		}
//		
//		if (shapes[i].groupShape == "CIRCLE") {
//			console.log("Inside display Part circle!!!");
//			// TODO: Need to check if this circle shape has a parent
//			parents.push(shapes[i].parent);
//			shapeIds.push(shapes[i].id);
//			
//			var circ_element_tmp = {};
//			circ_element_tmp.x1 = shapes[i].x1;
//			circ_element_tmp.y1 = shapes[i].y1;
//			circ_element_tmp.radius = shapes[i].width;
//			circ_tmp.push(circ_element_tmp);
//			
//			if (circ_tmp.length == 4) {
//				displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, eleId);
//				rectsInDisplayView.push(displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, eleId));
//				circ_tmp = [];
//				parents = [];
//				shapeIds = [];
//				
//			}
//	}	
//	
//	}
//	
//	if (!isCorrShow) {
//	
//		var jsonString = '{';
//		
//		var jsonStringTemp = '"lines":[';
//		for (var i = 0; i < linesInDisplayView.length; i++) {
//			jsonStringTemp += '{x1:' + Math.round(linesInDisplayView[i].x1) + ',y1:' + Math.round(linesInDisplayView[i].y1) + ',x2:' + Math.round(linesInDisplayView[i].x2) + ',y2:' + Math.round(linesInDisplayView[i].y2) + '},';
//		}
//		jsonStringTemp += ']';
//		jsonString += jsonStringTemp;
//		
//		var jsonStringTemp = '"rects":[';
//		for (var i = 0; i < rectsInDisplayView.length; i++) {
//			jsonStringTemp += '{x:' + Math.round(rectsInDisplayView[i].x) + ',y:' + Math.round(rectsInDisplayView[i].y) + ',height:' + Math.round(rectsInDisplayView[i].height) + ',width:' + Math.round(rectsInDisplayView[i].width) + '},';
//		}
//		jsonStringTemp += ']';
//		jsonString += jsonStringTemp;
//		
//		var jsonStringTemp = '"texts":[';
//		for(var i=0; i<textsInDisplayView.length; i++){
//			jsonStringTemp += 'x:'+ Math.round(textsInDisplayView[i].x)  + ',y:' + Math.round(textsInDisplayView[i].y) + ' value of text'+textsInDisplayView[i].textvalue + ' }, ';
//		}
//		jsonStringTemp += ']';
//		
//		jsonString += jsonStringTemp;
//		jsonString += '}';
//		
//		console.log("the json string to store in neo4j" + jsonString);
//		
//		// here we get the json to store into neo4j. need to implement code to do this!
//		// [[pos 1]]
//
//	}
//}
//}
