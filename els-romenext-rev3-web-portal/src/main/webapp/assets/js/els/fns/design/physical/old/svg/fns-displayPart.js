/**
 * 
 */

//=======================================================================
function displayPartShapesParent(shapes, eleId, isCorrShow  ) {  // eleId : where to display; parentState: what to display Parent/Child
	
	if (shapes == null) {
		return;
	}
	var parentChild = null;
    if (physicalModelView == 'parent') {
    	parentChild = 1;
    	colorRect = 'blue';
    } else if (physicalModelView == 'child') {
    	parentChild = 3;
    	colorRect = 'green';
    }
	
	var canvas = document.getElementById(eleId);
//	canvas.innerHTML = "";
	console.log("Inside display part shapes in physical display view!!!!!!!!!!");
	console.log(shapes);
	
	var groupEndIndicator = true;
	var preGroupId = null;
	
	var rect_tmp = [];
	var circ_tmp = [];
	var text_tmp = [];
	var parents = [];
	var shapeIds = [];
	
//	if (verticalLines.length != 1) {
//		verticalLines = [];
//		canvas.innerHTML = "";
//		verticalLines.unshift({id:"grid_y_pv",uid : -2,  val:100});
//	} else {
//		if (verticalLines[0].id != 'grid_y_pv') {
//			verticalLines = [];
//			canvas.innerHTML = "";
//			verticalLines.unshift({id:"grid_y_pv",uid : -2,  val:100});
//		}
//	}
//	if (horizontalLines.length != 1) {
//		horizontalLines = [];
//		canvas.innerHTML = "";
//		horizontalLines.unshift({id:"grid_x_pv",uid: -1, val:650});
//	} else {
//		if (horizontalLines[0].id != 'grid_x_pv') {
//			horizontalLines = [];
//			canvas.innerHTML = "";
//			horizontalLines.unshift({id:"grid_x_pv",uid: -1, val:650});
//		}
//	}
	verticalLines = [];
	verticalLines.push({id:"grid_y_pv",uid : -2,  val:100});
	horizontalLines = [];
	horizontalLines.push({id:"grid_x_pv",uid: -1, val:650});
	lines = [];
	rects = [];
	circs = [];
//	if (texts.length != 1) {
//		texts = [];
//		canvas.innerHTML = "";
//		texts.unshift({id: 'text0_pv', x: 45, y: 672});
//	} else {
//		if (texts[0].id != 'text0_pv') {
//			texts = [];
//			canvas.innerHTML = "";
//			texts.unshift({id: 'text0_pv', x: 45, y: 672});
//		}
//	}
	texts = [];
	texts.push({id: 'text0_pv', x: 45, y: 672});
	
	linesInOtherPlanes = [];
	textsInOtherPlanes = [];
	
	var linesInDisplayView = [];
	var rectsInDisplayView = [];
	var textsInDisplayView = [];
	
	if (typeof isCorrShow == 'undefined' || isCorrShow == null || isCorrShow) {
//		canvas.innerHTML = "";
//		canvas.innerHTML = "<line id='grid_y_pv' x1='100' y1='3' x2='100' y2='897' stroke=blue stroke-width=2/>";
//		canvas.innerHTML += "<line id='grid_x_pv' x1='0%' y1='650' x2='100%' y2='650' stroke=blue stroke-width=2/>";
	}
	
	for (var i = 0; i < shapes.length; i++) {
		if(shapes[i].parentChildState == parentChild){
		
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
				
				var x_coor = getVerticalLineCoor(shapes, i) + 100; //AL: hard coded for now
				var y_coor = 650 + getHorizontalLineCoor(shapes, i); //AL: hard coded for now	
				
//				if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//					// vertical line
//					var x_coor = getVerticalLineCoor(shapes, i) + 100; //AL: hard coded for now
////					canvas.innerHTML += "<line x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";										
//				} else if (Math.abs(shapes[i].angle) < 0.0001) {	
//					// horizontal line
//					var y_coor = 650 + getHorizontalLineCoor(shapes, i); //AL: hard coded for now					
////					canvas.innerHTML += "<line x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
//				}			
			} 	
		}
		
				
		if (shapes[i].groupShape == "RECTANGLE") {
			
			if (view3D == 'xy') {
				if (shapes[i].z1 == 0) {
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
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, canvas));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					} else if (Math.abs(shapes[i].angle) < 0.0001) {
						rect_tmp.push(shapes[i].y1);
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, canvas));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					}
				}
			} else if (view3D == 'yz') {
				if (shapes[i].x1 == 0) {
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
						rect_tmp.splice(0, 0, -shapes[i].y1);
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, canvas));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					} else if (Math.abs(shapes[i].angle) < 0.0001) {
						rect_tmp.push(shapes[i].z1);
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, canvas));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					}
				}
			} else if (view3D == 'xz') {
				if (shapes[i].y1 == 0) {
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
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, canvas));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					} else if (Math.abs(shapes[i].angle) < 0.0001) {
						rect_tmp.push(shapes[i].z1);
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, canvas));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					}
				}
			}			
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
		}
		
		if (shapes[i].groupShape == "TEXT") {
			
			if (view3D == 'xy') {
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
				if (shapes[i].z1 == 0) {
					text_element_tmp.x = shapes[i].x1;
					text_element_tmp.y = shapes[i].y1;
				} else {
					if (shapes[i].x1 == 0) {
						text_element_tmp.x = 0;
						text_element_tmp.y = shapes[i].y1;
					} else if (shapes[i].y1 == 0) {
						text_element_tmp.x = shapes[i].x1;
						text_element_tmp.y = 0;
					}
				}
//				text_element_tmp.x = shapes[i].x1;
//				text_element_tmp.y = shapes[i].y1;
				text_tmp.push(text_element_tmp);
				
				if (text_tmp.length == 3) {
					var x = text_tmp[0].x * zoomLevels[zoomLevel] + verticalLines[0].val;
					var y = text_tmp[0].y * zoomLevels[zoomLevel] + horizontalLines[0].val;
					console.log("x = " + x + " y = " + y);
					
					var textId = "text" + textNumber;
					var place , value = 'TEXT';
					if (shapes[i].property) {

//						var foundModelProp = null;
//						for (var j = 0; j < curModelProperties.length; j++) {
//							if (curModelProperties[j].id == shapes[i].property.id) {
//								foundModelProp = curModelProperties[j];
//							}
//						}
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
						value =  shapes[i].property.defaultValue;
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='"+place+"'>"+value+"</text>";
										
					} else {
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";  //???????????????????
					}
					if (shapes[i].z1 == 0) {
						texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					} else {
						textsInOtherPlanes.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					}
//					texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, textValue: value});
					textNumber++;
					text_tmp = [];
					parents = [];
					shapeIds = [];
				}	
			} else if (view3D == 'yz') {
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
				if (shapes[i].x1 == 0) {
					text_element_tmp.x = -shapes[i].y1;
					text_element_tmp.y = shapes[i].z1;
				} else {
					if (shapes[i].y1 == 0) {
						text_element_tmp.x = -0;
						text_element_tmp.y = shapes[i].z1;
					} else if (shapes[i].z1 == 0) {
						text_element_tmp.x = -shapes[i].y1;
						text_element_tmp.y = 0;
					}
				}
//				text_element_tmp.x = shapes[i].x1;
//				text_element_tmp.y = shapes[i].y1;
				text_tmp.push(text_element_tmp);
				
				if (text_tmp.length == 3) {
					var x = text_tmp[0].x * zoomLevels[zoomLevel] + verticalLines[0].val;
					var y = text_tmp[0].y * zoomLevels[zoomLevel] + horizontalLines[0].val;
					console.log("x = " + x + " y = " + y);
					
					var textId = "text" + textNumber;
					var place , value = 'TEXT';
					if (shapes[i].property) {

//						var foundModelProp = null;
//						for (var j = 0; j < curModelProperties.length; j++) {
//							if (curModelProperties[j].id == shapes[i].property.id) {
//								foundModelProp = curModelProperties[j];
//							}
//						}
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
						value =  shapes[i].property.defaultValue;
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='"+place+"'>"+value+"</text>";
										
					} else {
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";  //???????????????????
					}
					if (shapes[i].x1 == 0) {
						texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					} else {
						textsInOtherPlanes.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					}
//					texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, textValue: value});
					textNumber++;
					text_tmp = [];
					parents = [];
					shapeIds = [];
				}	
			} else if (view3D == 'xz') {
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
				if (shapes[i].y1 == 0) {
					text_element_tmp.x = shapes[i].x1;
					text_element_tmp.y = shapes[i].z1;
				} else {
					if (shapes[i].x1 == 0) {
						text_element_tmp.x = 0;
						text_element_tmp.y = shapes[i].z1;
					} else if (shapes[i].z1 == 0) {
						text_element_tmp.x = shapes[i].x1;
						text_element_tmp.y = 0;
					}
					
				}
//				text_element_tmp.x = shapes[i].x1;
//				text_element_tmp.y = shapes[i].y1;
				text_tmp.push(text_element_tmp);
				
				if (text_tmp.length == 3) {
					var x = text_tmp[0].x * zoomLevels[zoomLevel] + verticalLines[0].val;
					var y = text_tmp[0].y * zoomLevels[zoomLevel] + horizontalLines[0].val;
					console.log("x = " + x + " y = " + y);
					
					var textId = "text" + textNumber;
					var place , value = 'TEXT';
					if (shapes[i].property) {

//						var foundModelProp = null;
//						for (var j = 0; j < curModelProperties.length; j++) {
//							if (curModelProperties[j].id == shapes[i].property.id) {
//								foundModelProp = curModelProperties[j];
//							}
//						}
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
						value =  shapes[i].property.defaultValue;
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='"+place+"'>"+value+"</text>";
										
					} else {
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";  //???????????????????
					}
					if (shapes[i].y1 == 0) {
						texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					} else {
						textsInOtherPlanes.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					}
//					texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, textValue: value});
					textNumber++;
					text_tmp = [];
					parents = [];
					shapeIds = [];
				}	
			}			
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
		}
		
		if (shapes[i].groupShape == "LINE") {
			
			var parentShapeType = null;
			if (shapes[i].hasOwnProperty('parent')) {
				parentShapeType = getParentShapeType(shapes[i].parent);
			}
			
			if (view3D == 'xy') {
				
				if (true) {
					console.log("Inside display Part contour!!!");
					lineid = "line_" + lineNumber;
					var real_x1, real_x2, real_y1, real_y2;
					if (shapes[i].z1 == 0 && shapes[i].z2 == 0) {
						real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
						real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
						real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
						real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
						lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					} else {
						if (parentShapeType == 1) {
							if (shapes[i].x1 == 0 && shapes[i].x2 == 0) {
								real_x1 = Number(0) + verticalLines[0].val;
								real_x2 = Number(0) + verticalLines[0].val;
								real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
							} else {
								real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
								real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
								real_y1 = Number(0) + horizontalLines[0].val;
								real_y2 = Number(0) + horizontalLines[0].val;
							}
							linesInOtherPlanes.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						} else if (parentShapeType == 3) {
							if (shapes[i].y1 == 0 && shapes[i].y2 == 0) {
								real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
								real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
								real_y1 = Number(0) + horizontalLines[0].val;
								real_y2 = Number(0) + horizontalLines[0].val;
							} else {
								real_x1 = Number(0) + verticalLines[0].val;
								real_x2 = Number(0) + verticalLines[0].val;
								real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
							}
							linesInOtherPlanes.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						} else if (parentShapeType == 5) {
							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
							real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
							real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
							lines.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						}
					} 
										
//					else {
//						if (parentShapeType == 1) {
//							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//							real_y1 = Number(0) + horizontalLines[0].val;
//							real_y2 = Number(0) + horizontalLines[0].val;
//							linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						} else if (parentShapeType == 3) {
//							real_x1 = Number(0) + verticalLines[0].val;
//							real_x2 = Number(0) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
//							linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						} else if (parentShapeType == 5) {
//							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
//							lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						}
////						linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//					}
					
//					real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//					real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//					real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//					real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
					console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
					
//					lineid = "line_" + lineNumber;
					
					canvas.innerHTML += "<line id='" + lineid + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
//					lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					linesInDisplayView.push({x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					lineNumber++;
				}
				
			} else if (view3D == 'yz') {
				
				if (true) {
					console.log("Inside display Part contour!!!");
					lineid = "line_" + lineNumber;
					var real_x1, real_x2, real_y1, real_y2;
					if (shapes[i].x1 == 0 && shapes[i].x2 == 0) {
						real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
						real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
						real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
						real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
						lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					} else {
						if (parentShapeType == 3) {								
							if (shapes[i].y1 == 0 && shapes[i].y2 == 0) {
								real_x1 = -Number(0) + verticalLines[0].val;
								real_x2 = -Number(0) + verticalLines[0].val;
								real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							} else {
								real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
								real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
								real_y1 = Number(0) + horizontalLines[0].val;
								real_y2 = Number(0) + horizontalLines[0].val;
							}
							linesInOtherPlanes.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						} else if (parentShapeType == 5) {
							
							if (shapes[i].z1 == 0 && shapes[i].z2 == 0) {
								real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
								real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
								real_y1 = Number(0) + horizontalLines[0].val;
								real_y2 = Number(0) + horizontalLines[0].val;
							} else {
								real_x1 = -Number(0) + verticalLines[0].val;
								real_x2 = -Number(0) + verticalLines[0].val;
								real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							}
							linesInOtherPlanes.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						} else if (parentShapeType == 1) {
							real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
							real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							lines.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						}
					} 
									
//					else {
//						if (parentShapeType == 3) {
//							real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
//							real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
//							real_y1 = Number(0) + horizontalLines[0].val;
//							real_y2 = Number(0) + horizontalLines[0].val;
//							linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						} else if (parentShapeType == 5) {
//							real_x1 = -Number(0) + verticalLines[0].val;
//							real_x2 = -Number(0) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
//							linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						} else if (parentShapeType == 1) {
//							real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
//							real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
//							lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						}
////						linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//					}
					
//					real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//					real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//					real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//					real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
					console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
					
//					lineid = "line_" + lineNumber;
					
					canvas.innerHTML += "<line id='" + lineid + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
//					lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					linesInDisplayView.push({x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					lineNumber++;
				}
				
			} else if (view3D == 'xz') {
				
				if (true) {
					console.log("Inside display Part contour!!!");
					lineid = "line_" + lineNumber;
					var real_x1, real_x2, real_y1, real_y2;
					if (shapes[i].y1 == 0 && shapes[i].y2 == 0) {
						real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
						real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
						real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
						real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
						lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					} else {
						if (parentShapeType == 1) {
							if (shapes[i].x1 == 0 && shapes[i].x2 == 0) {
								real_x1 = Number(0) + verticalLines[0].val;
								real_x2 = Number(0) + verticalLines[0].val;
								real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							} else {
								real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
								real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
								real_y1 = Number(0) + horizontalLines[0].val;
								real_y2 = Number(0) + horizontalLines[0].val;
							}
							linesInOtherPlanes.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						} else if (parentShapeType == 5) {
							if (shapes[i].z1 == 0 && shapes[i].z2 == 0) {
								real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
								real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
								real_y1 = Number(0) + horizontalLines[0].val;
								real_y2 = Number(0) + horizontalLines[0].val;
							} else {
								real_x1 = Number(0) + verticalLines[0].val;
								real_x2 = Number(0) + verticalLines[0].val;
								real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							}
							linesInOtherPlanes.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						} else if (parentShapeType == 3) {
							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							lines.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						}
					} 
										
//					else {
//						if (parentShapeType == 1) {
//							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//							real_y1 = Number(0) + horizontalLines[0].val;
//							real_y2 = Number(0) + horizontalLines[0].val;
//							linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						} else if (parentShapeType == 5) {
//							real_x1 = Number(0) + verticalLines[0].val;
//							real_x2 = Number(0) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
//							linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						} else if (parentShapeType == 3) {
//							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
//							lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						}
////						linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//					}
					
//					real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//					real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//					real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//					real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
					console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
					
//					lineid = "line_" + lineNumber;
					
					canvas.innerHTML += "<line id='" + lineid + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
//					lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					linesInDisplayView.push({x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					lineNumber++;
				}
	
			}		
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
//			canvas.innerHTML += "<line id='" + lineid + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
//			lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//			linesInDisplayView.push({x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//			lineNumber++;
		}
			
	}
	}
	// NOT USED ----------------------- NOT CLEAR !!!!!        Done by Allen
	if (!isCorrShow) {
		var jsonString = '{';
		var jsonStringTemp = '"lines":[';
		for (var i = 0; i < linesInDisplayView.length; i++) {
			jsonStringTemp += '{x1:' + Math.round(linesInDisplayView[i].x1) + ',y1:' + Math.round(linesInDisplayView[i].y1) + ',x2:' + Math.round(linesInDisplayView[i].x2) + ',y2:' + Math.round(linesInDisplayView[i].y2) + '},';
		}
		jsonStringTemp += ']';
		jsonString += jsonStringTemp;
		var jsonStringTemp = '"rects":[';
		for (var i = 0; i < rectsInDisplayView.length; i++) {
			jsonStringTemp += '{x:' + Math.round(rectsInDisplayView[i].x) + ',y:' + Math.round(rectsInDisplayView[i].y) + ',height:' + Math.round(rectsInDisplayView[i].height) + ',width:' + Math.round(rectsInDisplayView[i].width) + '},';
		}
		jsonStringTemp += ']';
		jsonString += jsonStringTemp;
		jsonString += '}';
		console.log("the json string to store in neo4j" + jsonString);
		// here we get the json to store into neo4j. need to implement code to do this!
		// [[pos 1]]
	}

}
//=====================   ================================
//=======================================================================
function displayPartShapes(shapes, eleId, isCorrShow) {    // shapes: what to display; eleId: where to display 
	
	if (shapes == null) {
		return;
	}
	
	var canvas = document.getElementById(eleId); var svg;
//	canvas.innerHTML = "";
	
	if(topLevelTab == "instRelViewTab" && selecteddecorator == 'Physical'  ) {
					canvas.setAttribute('onmousemove', 'svgCursor(evt)');
				    var svgNS = "http://www.w3.org/2000/svg";
					svgNB++;		
					svg = document.createElementNS(svgNS,"svg");
				    svg.setAttribute('id', 'svg'+svgNB);
				    svg.setAttribute('draggable', true);
				    svg.setAttribute('onload', 'init('+svgNB+')');
				    svg.setAttribute('class', "dragTarget")
				    svg.setAttribute('onmouseup', 'mouseUp(evt)');
				    svg.setAttribute('onmousedown', 'selectObject(evt)');
				    svg.setAttribute('onmousemove', 'svgCursor(evt),moveElement(evt)');
				//    svg.setAttribute('preserveAspectRatio', 'xMinYMin slice');
				    svg.setAttribute('width', '800');
				    svg.setAttribute('height', '800');	    
				    if (physicalModelView == "parent") {  
				    	var startFrom = 70* svgNB;
				    	svg.setAttribute("viewBox", +startFrom +" 50 600 600");
				    	}
				    else { 
				    	svg.setAttribute("viewBox", +startFrom +" 50 700 700") ;   
				    	}
	}else {
		svg = canvas;
	}
	
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
//			canvas.innerHTML = "<line id='grid_y_pv' x1='100' y1='3' x2='100' y2='897' stroke=blue stroke-width=2/>";
//			canvas.innerHTML += "<line id='grid_x_pv' x1='0%' y1='650' x2='100%' y2='650' stroke=blue stroke-width=2/>";
		} else if (topLevelTab == "instRelViewTab") {
//			if (document.getElementById("grid_x_pv") == null && document.getElementById("grid_y_pv") == null) {
//				svg.innerHTML = "<line id='grid_y_pv' x1='100' y1='3' x2='100' y2='897' stroke=blue stroke-width=2/>";
//				svg.innerHTML += "<line id='grid_x_pv' x1='0%' y1='650' x2='100%' y2='650' stroke=blue stroke-width=2/>";
//			}
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
				
				var x_coor = getVerticalLineCoor(shapes, i) + 100; //AL: hard coded for now
				var y_coor = 650 + getHorizontalLineCoor(shapes, i); //AL: hard coded for now
				
//				if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//					// vertical line
//					var x_coor = getVerticalLineCoor(shapes, i) + 100; //AL: hard coded for now
////					svg.innerHTML += "<line x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";										
//				} else if (Math.abs(shapes[i].angle) < 0.0001) {	
//					// horizontal line
//					var y_coor = 650 + getHorizontalLineCoor(shapes, i); //AL: hard coded for now					
////					svg.innerHTML += "<line x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
//				}			
			} 	
		}
		
				
		if (shapes[i].groupShape == "RECTANGLE") {
			if (view3D == 'xy') {
				if (shapes[i].z1 == 0) {
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
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, svg));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					} else if (Math.abs(shapes[i].angle) < 0.0001) {
						rect_tmp.push(shapes[i].y1);
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, svg));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					}
				}
			} else if (view3D == 'yz') {
				if (shapes[i].x1 == 0) {
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
						rect_tmp.splice(0, 0, -shapes[i].y1);
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, svg));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					} else if (Math.abs(shapes[i].angle) < 0.0001) {
						rect_tmp.push(shapes[i].z1);
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, svg));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					}
				}
			} else if (view3D == 'xz') {
				if (shapes[i].y1 == 0) {
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
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, svg));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					} else if (Math.abs(shapes[i].angle) < 0.0001) {
						rect_tmp.push(shapes[i].z1);
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, svg));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					}
				}
			}			
		}
		
		if (shapes[i].groupShape == "TEXT") {
			
			if (view3D == 'xy') {
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
				if (shapes[i].z1 == 0) {
					text_element_tmp.x = shapes[i].x1;
					text_element_tmp.y = shapes[i].y1;
				} else {
					if (shapes[i].x1 == 0) {
						text_element_tmp.x = 0;
						text_element_tmp.y = shapes[i].y1;
					} else if (shapes[i].y1 == 0) {
						text_element_tmp.x = shapes[i].x1;
						text_element_tmp.y = 0;
					}
				}
//				text_element_tmp.x = shapes[i].x1;
//				text_element_tmp.y = shapes[i].y1;
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
						svg.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='"+place+"'>"+value+"</text>";
					} else {
						svg.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";  //???????????????????
					}
					// save the information in 
					textsInDisplayView.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value});
					if (shapes[i].z1 == 0) {
						texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					} else {
						textsInOtherPlanes.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					}
//					texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, textValue: value});
					textNumber++;
					text_tmp = [];
					parents = [];
					shapeIds = [];
				}	
			} else if (view3D == 'yz') {
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
				if (shapes[i].x1 == 0) {
					text_element_tmp.x = -shapes[i].y1;
					text_element_tmp.y = shapes[i].z1;
				} else {
					if (shapes[i].y1 == 0) {
						text_element_tmp.x = -0;
						text_element_tmp.y = shapes[i].z1;
					} else if (shapes[i].z1 == 0) {
						text_element_tmp.x = -shapes[i].y1;
						text_element_tmp.y = 0;
					}
				}
//				text_element_tmp.x = shapes[i].x1;
//				text_element_tmp.y = shapes[i].y1;
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
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='"+place+"'>"+value+"</text>";
					} else {
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";  //???????????????????
					}
					// save the information in 
					textsInDisplayView.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value});
					if (shapes[i].x1 == 0) {
						texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					} else {
						textsInOtherPlanes.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					}
//					texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, textValue: value});
					textNumber++;
					text_tmp = [];
					parents = [];
					shapeIds = [];
				}	
			} else if (view3D == 'xz') {
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
				if (shapes[i].y1 == 0) {
					text_element_tmp.x = shapes[i].x1;
					text_element_tmp.y = shapes[i].z1;
				} else {
					if (shapes[i].x1 == 0) {
						text_element_tmp.x = 0;
						text_element_tmp.y = shapes[i].z1;
					} else if (shapes[i].z1 == 0) {
						text_element_tmp.x = shapes[i].x1;
						text_element_tmp.y = 0;
					}
					
				}
//				text_element_tmp.x = shapes[i].x1;
//				text_element_tmp.y = shapes[i].y1;
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
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='"+place+"'>"+value+"</text>";
					} else {
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";  //???????????????????
					}
					// save the information in 
					textsInDisplayView.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value});
					if (shapes[i].y1 == 0) {
						texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					} else {
						textsInOtherPlanes.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					}
//					texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, textValue: value});
					textNumber++;
					text_tmp = [];
					parents = [];
					shapeIds = [];
				}	
			}			
		}
		
		if (shapes[i].groupShape == "LINE") {
			
			var parentShapeType = null;
			if (shapes[i].hasOwnProperty('parent')) {
				parentShapeType = getParentShapeType(shapes[i].parent);
			}
			
			if (view3D == 'xy') {
				
				if (true) {
					console.log("Inside display Part contour!!!");
					lineid = "line_" + lineNumber;
					var real_x1, real_x2, real_y1, real_y2;
					if (shapes[i].z1 == 0 && shapes[i].z2 == 0) {
						real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
						real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
						real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
						real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
						lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					} else {
						if (parentShapeType == 1) {
							if (shapes[i].x1 == 0 && shapes[i].x2 == 0) {
								real_x1 = Number(0) + verticalLines[0].val;
								real_x2 = Number(0) + verticalLines[0].val;
								real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
							} else {
								real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
								real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
								real_y1 = Number(0) + horizontalLines[0].val;
								real_y2 = Number(0) + horizontalLines[0].val;
							}
							linesInOtherPlanes.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						} else if (parentShapeType == 3) {
							if (shapes[i].y1 == 0 && shapes[i].y2 == 0) {
								real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
								real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
								real_y1 = Number(0) + horizontalLines[0].val;
								real_y2 = Number(0) + horizontalLines[0].val;
							} else {
								real_x1 = Number(0) + verticalLines[0].val;
								real_x2 = Number(0) + verticalLines[0].val;
								real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
							}
							linesInOtherPlanes.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						} else if (parentShapeType == 5) {
							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
							real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
							real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
							lines.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						}
					}
								
//					else {
//						if (parentShapeType == 1) {
//							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//							real_y1 = Number(0) + horizontalLines[0].val;
//							real_y2 = Number(0) + horizontalLines[0].val;
//							linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						} else if (parentShapeType == 3) {
//							real_x1 = Number(0) + verticalLines[0].val;
//							real_x2 = Number(0) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
//							linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						} else if (parentShapeType == 3) {
//							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
//							lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						}
////						linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//					}
					
//					real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//					real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//					real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//					real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
					console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
					
//					lineid = "line_" + lineNumber;
					
					svg.innerHTML += "<line id='" + lineid + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
//					lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					linesInDisplayView.push({x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					lineNumber++;
				}
			
			} else if (view3D == 'yz') {
				
				if (true) {
					console.log("Inside display Part contour!!!");
					lineid = "line_" + lineNumber;
					var real_x1, real_x2, real_y1, real_y2;
					if (shapes[i].x1 == 0 && shapes[i].x2 == 0) {
						real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
						real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
						real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
						real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
						lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					}  else {
						if (parentShapeType == 3) {								
							if (shapes[i].y1 == 0 && shapes[i].y2 == 0) {
								real_x1 = -Number(0) + verticalLines[0].val;
								real_x2 = -Number(0) + verticalLines[0].val;
								real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							} else {
								real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
								real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
								real_y1 = Number(0) + horizontalLines[0].val;
								real_y2 = Number(0) + horizontalLines[0].val;
							}
							linesInOtherPlanes.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						} else if (parentShapeType == 5) {
							
							if (shapes[i].z1 == 0 && shapes[i].z2 == 0) {
								real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
								real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
								real_y1 = Number(0) + horizontalLines[0].val;
								real_y2 = Number(0) + horizontalLines[0].val;
							} else {
								real_x1 = -Number(0) + verticalLines[0].val;
								real_x2 = -Number(0) + verticalLines[0].val;
								real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							}
							linesInOtherPlanes.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						} else if (parentShapeType == 1) {
							real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
							real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							lines.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						}
					}
				
//					else {
//						if (parentShapeType == 3) {
//							real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
//							real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
//							real_y1 = Number(0) + horizontalLines[0].val;
//							real_y2 = Number(0) + horizontalLines[0].val;
//							linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						} else if (parentShapeType == 5) {
//							real_x1 = -Number(0) + verticalLines[0].val;
//							real_x2 = -Number(0) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
//							linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						} else if (parentShapeType == 1) {
//							real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
//							real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
//							lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						}
////						linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//					}
					
//					real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//					real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//					real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//					real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
					console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
					
//					lineid = "line_" + lineNumber;
					
					svg.innerHTML += "<line id='" + lineid + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
//					lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					linesInDisplayView.push({x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					lineNumber++;
				}
			
			} else if (view3D == 'xz') {
				
				if (true) {
					console.log("Inside display Part contour!!!");
					lineid = "line_" + lineNumber;
					var real_x1, real_x2, real_y1, real_y2;
					if (shapes[i].y1 == 0 && shapes[i].y2 == 0) {
						real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
						real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
						real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
						real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
						lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					}  else {
						if (parentShapeType == 1) {
							if (shapes[i].x1 == 0 && shapes[i].x2 == 0) {
								real_x1 = Number(0) + verticalLines[0].val;
								real_x2 = Number(0) + verticalLines[0].val;
								real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							} else {
								real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
								real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
								real_y1 = Number(0) + horizontalLines[0].val;
								real_y2 = Number(0) + horizontalLines[0].val;
							}
							linesInOtherPlanes.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						} else if (parentShapeType == 5) {
							if (shapes[i].z1 == 0 && shapes[i].z2 == 0) {
								real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
								real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
								real_y1 = Number(0) + horizontalLines[0].val;
								real_y2 = Number(0) + horizontalLines[0].val;
							} else {
								real_x1 = Number(0) + verticalLines[0].val;
								real_x2 = Number(0) + verticalLines[0].val;
								real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							}
							linesInOtherPlanes.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						} else if (parentShapeType == 3) {
							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							lines.push({id: lineid, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						}
					}
									
//					else {
//						if (parentShapeType == 1) {
//							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//							real_y1 = Number(0) + horizontalLines[0].val;
//							real_y2 = Number(0) + horizontalLines[0].val;
//							linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						} else if (parentShapeType == 5) {
//							real_x1 = Number(0) + verticalLines[0].val;
//							real_x2 = Number(0) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
//							linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						} else if (parentShapeType == 3) {
//							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
//							lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//						}
////						linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
//					}
					
//					real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//					real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//					real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//					real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
					console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
					
//					lineid = "line_" + lineNumber;
					
					svg.innerHTML += "<line id='" + lineid + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
//					lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					linesInDisplayView.push({x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					lineNumber++;
				}
				
			}

		}
		
		if (shapes[i].groupShape == "CIRCLE") {
			if (view3D == 'xy') {
				if (shapes[i].z1 == 0) {
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
						displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, eleId);
						rectsInDisplayView.push(displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, eleId));
						circ_tmp = [];
						parents = [];
						shapeIds = [];
						
					}
				}
			} else if (view3D == 'yz') {
				if (shapes[i].x1 == 0) {
					console.log("Inside display Part circle!!!");
					// TODO: Need to check if this circle shape has a parent
					parents.push(shapes[i].parent);
					shapeIds.push(shapes[i].id);
					
					var circ_element_tmp = {};
					circ_element_tmp.x1 = -shapes[i].y1;
					circ_element_tmp.y1 = shapes[i].z1;
					circ_element_tmp.radius = shapes[i].width;
					circ_tmp.push(circ_element_tmp);
					
					if (circ_tmp.length == 4) {
						displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, eleId);
						rectsInDisplayView.push(displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, eleId));
						circ_tmp = [];
						parents = [];
						shapeIds = [];
						
					}
				}
			} else if (view3D == 'xz') {
				if (shapes[i].y1 == 0) {
					console.log("Inside display Part circle!!!");
					// TODO: Need to check if this circle shape has a parent
					parents.push(shapes[i].parent);
					shapeIds.push(shapes[i].id);
					
					var circ_element_tmp = {};
					circ_element_tmp.x1 = shapes[i].x1;
					circ_element_tmp.y1 = shapes[i].z1;
					circ_element_tmp.radius = shapes[i].width;
					circ_tmp.push(circ_element_tmp);
					
					if (circ_tmp.length == 4) {
						displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, eleId);
						rectsInDisplayView.push(displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, eleId));
						circ_tmp = [];
						parents = [];
						shapeIds = [];
						
					}
				}

			}

		}	
	
	}
	}
	
	if (!isCorrShow) {
	
		var jsonString = '{';
		
		var jsonStringTemp = '"lines":[';
		for (var i = 0; i < linesInDisplayView.length; i++) {
			jsonStringTemp += '{x1:' + Math.round(linesInDisplayView[i].x1) + ',y1:' + Math.round(linesInDisplayView[i].y1) + ',x2:' + Math.round(linesInDisplayView[i].x2) + ',y2:' + Math.round(linesInDisplayView[i].y2) + '},';
		}
		jsonStringTemp += ']';
		jsonString += jsonStringTemp;
		
		var jsonStringTemp = '"rects":[';
		for (var i = 0; i < rectsInDisplayView.length; i++) {
			jsonStringTemp += '{x:' + Math.round(rectsInDisplayView[i].x) + ',y:' + Math.round(rectsInDisplayView[i].y) + ',height:' + Math.round(rectsInDisplayView[i].height) + ',width:' + Math.round(rectsInDisplayView[i].width) + '},';
		}
		jsonStringTemp += ']';
//		jsonString += jsonStringTemp;
////		
//		var jsonStringTemp = '"texts":[';
//		for(var i=0; i<textsInDisplayView.length; i++){
//			jsonStringTemp += 'x:'+ Math.round(textsInDisplayView[i].x)  + ',y:' + Math.round(textsInDisplayView[i].y) + ' value of text'+textsInDisplayView[i].textvalue + ' }, ';
//		}
//		jsonStringTemp += ']';
		
		jsonString += jsonStringTemp;
		jsonString += '}';
		
		console.log("the json string to store in neo4j" + jsonString);
		
		// here we get the json to store into neo4j. need to implement code to do this!
		// [[pos 1]]

	}

	if(selecteddecorator == 'Physical' && (topLevelTab == "instRelViewTab") ) {
		console.log("content of svg is: "+ svg.innerHTML);
		document.getElementById(eleId).appendChild(svg);}
	else { 
		document.getElementById(eleId).innerHTML += svg;   
		}
	
}



function getVerticalLineCoor(shapes, pos) {
	if (view3D == 'xy') {
		if (shapes[pos].x1 != 0) { // shapes[pos].shapeType == 3 && shapes[pos].x1 != 0
			if (!('parent' in shapes[pos])) {
				return shapes[pos].x1;
			}
			var parentLine;
			var parentPos;
			for (var i = 0; i < shapes.length; i++) {
				if (shapes[i].id == shapes[pos].parent) {
					parentLine = shapes[i];
					parentPos = i;
					break;
				}
			}
			return shapes[pos].x1 + getVerticalLineCoor(shapes, parentPos);
		} else {
			return null;
		}
	} else if (view3D == 'xz') {
		if (shapes[pos].x1 != 0) { // shapes[pos].shapeType == 5
			if (!('parent' in shapes[pos])) {
				return shapes[pos].x1;
			}
			var parentLine;
			var parentPos;
			for (var i = 0; i < shapes.length; i++) {
				if (shapes[i].id == shapes[pos].parent) {
					parentLine = shapes[i];
					parentPos = i;
					break;
				}
			}
			return shapes[pos].x1 + getVerticalLineCoor(shapes, parentPos);
		} else {
			return null;
		}
	} else if (view3D == 'yz') {
		if (shapes[pos].y1 != 0) { // shapes[pos].shapeType == 5
			if (!('parent' in shapes[pos])) {
				return shapes[pos].y1;
			}
			var parentLine;
			var parentPos;
			for (var i = 0; i < shapes.length; i++) {
				if (shapes[i].id == shapes[pos].parent) {
					parentLine = shapes[i];
					parentPos = i;
					break;
				}
			}
			return shapes[pos].y1 + getVerticalLineCoor(shapes, parentPos);
		} else {
			return null;
		}
	} else {
		console.log("Wrong Physical View Name: " + viewChange);
		$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
	}
}
//=====================   ================================
function getHorizontalLineCoor(shapes, pos) {
	if (view3D == 'xy') {
		if (shapes[pos].y1 != 0) { // shapes[pos].shapeType == 1
			if (!('parent' in shapes[pos])) {
				return shapes[pos].y1;
			}
			var parentLine;
			var parentPos;
			for (var i = 0; i < shapes.length; i++) {
				if (shapes[i].id == shapes[pos].parent) {
					parentLine = shapes[i];
					parentPos = i;
					break;
				}
			}
			return shapes[pos].y1 + getHorizontalLineCoor(shapes, parentPos);
		} else {
			return null;
		}
	} else if (view3D == 'xz') {
		if (shapes[pos].z1 != 0) { // shapes[pos].shapeType == 1
			if (!('parent' in shapes[pos])) {
				return shapes[pos].z1;
			}
			var parentLine;
			var parentPos;
			for (var i = 0; i < shapes.length; i++) {
				if (shapes[i].id == shapes[pos].parent) {
					parentLine = shapes[i];
					parentPos = i;
					break;
				}
			}
			return shapes[pos].z1 + getHorizontalLineCoor(shapes, parentPos);
		} else {
			return null;
		}
	} else if (view3D == 'yz') {
		if (shapes[pos].z1 != 0) { // shapes[pos].shapeType == 3
			if (!('parent' in shapes[pos])) {
				return shapes[pos].z1;
			}
			var parentLine;
			var parentPos;
			for (var i = 0; i < shapes.length; i++) {
				if (shapes[i].id == shapes[pos].parent) {
					parentLine = shapes[i];
					parentPos = i;
					break;
				}
			}
			return shapes[pos].z1 + getHorizontalLineCoor(shapes, parentPos);
		} else {
			return null;
		}
	} else {
		console.log("Wrong Physical View Name: " + viewChange);
		$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
	}
}
//=============================================================================
//===================== Displaying Rectangle   ================================
//=============================================================================
function displayRectFillInPart(rect_tmp, parents, shapeIds, groupId, eleId) {
	console.log("Inside display rect fill in Part View");
	var x, y;
	if (rect_tmp[0] < rect_tmp[1]) {
		x = rect_tmp[0];
	} else {
		x = rect_tmp[1];
	}
	if (rect_tmp[2] < rect_tmp[3]) {
		y = rect_tmp[2];
	} else {
		y = rect_tmp[3];
	}
	console.log("what is the hell y is " + y);
	x += 100;  // AL: hard coded two numbers
	y += 650;
	var h = Math.abs(rect_tmp[2] - rect_tmp[3]);
	var w = Math.abs(rect_tmp[0] - rect_tmp[1]);
	console.log("x = " + x + " y = " + y + " h = " + h + " w = " + w);
//	var canvas = document.getElementById(eleId);
	var rectToDisplay="";
	rectid = "rcfl_" + rcflNumber;
//	canvas.innerHTML += "<rect id='" + rectid + "' x='" + Number(x) + "' y='" + Number(y) + "' width='" + Number(w) + "' height='" + Number(h) + "' style='fill:"+colorRect+";stroke:blue;stroke-width:2' fill-opacity='0.5' stroke-opacity='0.5'>";
	if(selecteddecorator == 'Physical' && (topLevelTab == "instRelViewTab") ){rectToDisplay += "<rect id='" + rectid + "' ";}
	else {rectToDisplay += "<rect id='" + rectid + "'  ";}
	rectToDisplay  += "x='" + Number(x) + "' y='" + Number(y) + "' width='" + Number(w) + "' height='" + Number(h) + "' style='fill:"+colorRect+";stroke:blue;stroke-width:2' fill-opacity='0.5' stroke-opacity='0.5'>";
//	canvas.innerHTML += rectToDisplay;
	eleId.innerHTML += rectToDisplay;
	rects.push({id:rectid, x:Number(x), y:Number(y), height:Number(h), width:Number(w)});
	rcflNumber++;
	return {x:Number(x), y:Number(y), height:Number(h), width:Number(w)};
}

//===================================================================================
//================== Display Parts for Display VIEW =================================
//===================================================================================
function displayPartShapes2(shapes, eleId, isCorrShow) {    // shapes: what to display; eleId: where to display 
	
	if (shapes == null) {
		return;
	}
	
	var canvas = document.getElementById(eleId); var svg;
	
	if(topLevelTab == "instRelViewTab" && selecteddecorator == 'Physical'  ) {
					canvas.setAttribute('onmousemove', 'svgCursor(evt)');
				    var svgNS = "http://www.w3.org/2000/svg";
					svgNB++;		
					svg = document.createElementNS(svgNS,"svg");
				    svg.setAttribute('id', 'svg'+svgNB);
				    svg.setAttribute('draggable', true);
				    svg.setAttribute('onload', 'init('+svgNB+')');
				    svg.setAttribute('class', "dragTarget")
				    svg.setAttribute('onmouseup', 'mouseUp(evt)');
				    svg.setAttribute('onmousedown', 'selectObject(evt)');
				    svg.setAttribute('onmousemove', 'svgCursor(evt),moveElement(evt)');
				//    svg.setAttribute('preserveAspectRatio', 'xMinYMin slice');
				    svg.setAttribute('width', '800');
				    svg.setAttribute('height', '800');	    
				    if (physicalModelView == "parent") {  
				    	var startFrom = 70* svgNB;
				    	svg.setAttribute("viewBox", +startFrom +" 50 600 600");
				    	}
				    else { 
				    	svg.setAttribute("viewBox", +startFrom +" 50 700 700") ;   
				    	}
	}else {
		svg = canvas;
	}
	
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
//			canvas.innerHTML = "<line id='grid_y_pv' x1='100' y1='3' x2='100' y2='897' stroke=blue stroke-width=2/>";
//			canvas.innerHTML += "<line id='grid_x_pv' x1='0%' y1='650' x2='100%' y2='650' stroke=blue stroke-width=2/>";
		} else if (topLevelTab == "instRelViewTab") {
//			if (document.getElementById("grid_x_pv") == null && document.getElementById("grid_y_pv") == null) {
//				svg.innerHTML = "<line id='grid_y_pv' x1='100' y1='3' x2='100' y2='897' stroke=blue stroke-width=2/>";
//				svg.innerHTML += "<line id='grid_x_pv' x1='0%' y1='650' x2='100%' y2='650' stroke=blue stroke-width=2/>";
//			}
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
				
				var x_coor = getVerticalLineCoor(shapes, i) + 100; //AL: hard coded for now
				var y_coor = 650 + getHorizontalLineCoor(shapes, i); //AL: hard coded for now
				
//				if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//					// vertical line
//					var x_coor = getVerticalLineCoor(shapes, i) + 100; //AL: hard coded for now
////					svg.innerHTML += "<line x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";										
//				} else if (Math.abs(shapes[i].angle) < 0.0001) {	
//					// horizontal line
//					var y_coor = 650 + getHorizontalLineCoor(shapes, i); //AL: hard coded for now					
////					svg.innerHTML += "<line x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
//				}			
			} 	
		}
		
				
		if (shapes[i].groupShape == "RECTANGLE") {
			if (view3D == 'xy') {
				if (shapes[i].z1 == 0) {
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
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, svg));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					} else if (Math.abs(shapes[i].angle) < 0.0001) {
						rect_tmp.push(shapes[i].y1);
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, svg));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					}
				}
			} else if (view3D == 'yz') {
				if (shapes[i].x1 == 0) {
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
						rect_tmp.splice(0, 0, -shapes[i].y1);
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, svg));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					} else if (Math.abs(shapes[i].angle) < 0.0001) {
						rect_tmp.push(shapes[i].z1);
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, svg));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					}
				}
			} else if (view3D == 'xz') {
				if (shapes[i].y1 == 0) {
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
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, svg));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					} else if (Math.abs(shapes[i].angle) < 0.0001) {
						rect_tmp.push(shapes[i].z1);
						if (rect_tmp.length == 4) {
							rectsInDisplayView.push(displayRectFillInPart(rect_tmp, parents, shapeIds, shapes[i].group, svg));
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					}
				}
			}			
		}
		
		if (shapes[i].groupShape == "TEXT") {
			
			if (view3D == 'xy') {
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
				if (shapes[i].z1 == 0) {
					text_element_tmp.x = shapes[i].x1;
					text_element_tmp.y = shapes[i].y1;
				} else {
					if (shapes[i].x1 == 0) {
						text_element_tmp.x = 0;
						text_element_tmp.y = shapes[i].y1;
					} else if (shapes[i].y1 == 0) {
						text_element_tmp.x = shapes[i].x1;
						text_element_tmp.y = 0;
					}
				}
//				text_element_tmp.x = shapes[i].x1;
//				text_element_tmp.y = shapes[i].y1;
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
						svg.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='"+place+"'>"+value+"</text>";
					} else {
						svg.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";  //???????????????????
					}
					// save the information in 
					textsInDisplayView.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value});
					if (shapes[i].z1 == 0) {
						texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					} else {
						textsInOtherPlanes.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					}
//					texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, textValue: value});
					textNumber++;
					text_tmp = [];
					parents = [];
					shapeIds = [];
				}	
			} else if (view3D == 'yz') {
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
				if (shapes[i].x1 == 0) {
					text_element_tmp.x = -shapes[i].y1;
					text_element_tmp.y = shapes[i].z1;
				} else {
					if (shapes[i].y1 == 0) {
						text_element_tmp.x = -0;
						text_element_tmp.y = shapes[i].z1;
					} else if (shapes[i].z1 == 0) {
						text_element_tmp.x = -shapes[i].y1;
						text_element_tmp.y = 0;
					}
				}
//				text_element_tmp.x = shapes[i].x1;
//				text_element_tmp.y = shapes[i].y1;
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
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='"+place+"'>"+value+"</text>";
					} else {
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";  //???????????????????
					}
					// save the information in 
					textsInDisplayView.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value});
					if (shapes[i].x1 == 0) {
						texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					} else {
						textsInOtherPlanes.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					}
//					texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, textValue: value});
					textNumber++;
					text_tmp = [];
					parents = [];
					shapeIds = [];
				}	
			} else if (view3D == 'xz') {
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
				if (shapes[i].y1 == 0) {
					text_element_tmp.x = shapes[i].x1;
					text_element_tmp.y = shapes[i].z1;
				} else {
					if (shapes[i].x1 == 0) {
						text_element_tmp.x = 0;
						text_element_tmp.y = shapes[i].z1;
					} else if (shapes[i].z1 == 0) {
						text_element_tmp.x = shapes[i].x1;
						text_element_tmp.y = 0;
					}
					
				}
//				text_element_tmp.x = shapes[i].x1;
//				text_element_tmp.y = shapes[i].y1;
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
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='"+place+"'>"+value+"</text>";
					} else {
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";  //???????????????????
					}
					// save the information in 
					textsInDisplayView.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value});
					if (shapes[i].y1 == 0) {
						texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					} else {
						textsInOtherPlanes.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					}
//					texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: value });
					groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, textValue: value});
					textNumber++;
					text_tmp = [];
					parents = [];
					shapeIds = [];
				}	
			}			
		}
		
		if (shapes[i].groupShape == "LINE") {
			
			var parentShapeType = null;
			if (shapes[i].hasOwnProperty('parent')) {
				parentShapeType = getParentShapeType(shapes[i].parent);
			}
			
			if (view3D == 'xy') {
				
				if (parentShapeType == 1 || parentShapeType== 3 || parentShapeType == null) {
					console.log("Inside display Part contour!!!");	
					var real_x1, real_x2, real_y1, real_y2;
					if (shapes[i].z1 == 0 && shapes[i].z2 == 0) {
						real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
						real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
						real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
						real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
						lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					} else {
						if (parentShapeType == 1) {
							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
							real_y1 = Number(0) + horizontalLines[0].val;
							real_y2 = Number(0) + horizontalLines[0].val;
						} else if (parentShapeType == 3) {
							real_x1 = Number(0) + verticalLines[0].val;
							real_x2 = Number(0) + verticalLines[0].val;
							real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
							real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
						}
						linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					}
//					real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//					real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//					real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//					real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
					console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
					
					lineid = "line_" + lineNumber;
					
					svg.innerHTML += "<line id='" + lineid + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
//					lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					linesInDisplayView.push({x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					lineNumber++;
				}
			
			} else if (view3D == 'yz') {
				
				if (parentShapeType == 3 || parentShapeType== 5 || parentShapeType == null) {
					console.log("Inside display Part contour!!!");	
					var real_x1, real_x2, real_y1, real_y2;
					if (shapes[i].x1 == 0 && shapes[i].x2 == 0) {
						real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
						real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
						real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
						real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
						lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					} else {
						if (parentShapeType == 3) {
							real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
							real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
							real_y1 = Number(0) + horizontalLines[0].val;
							real_y2 = Number(0) + horizontalLines[0].val;
						} else if (parentShapeType == 5) {
							real_x1 = -Number(0) + verticalLines[0].val;
							real_x2 = -Number(0) + verticalLines[0].val;
							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
						}
						linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					}
//					real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//					real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//					real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//					real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
					console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
					
					lineid = "line_" + lineNumber;
					
					svg.innerHTML += "<line id='" + lineid + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
//					lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					linesInDisplayView.push({x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					lineNumber++;
				}
			
			} else if (view3D == 'xz') {
				
				if (parentShapeType == 1 || parentShapeType== 5 || parentShapeType == null) {
					console.log("Inside display Part contour!!!");	
					var real_x1, real_x2, real_y1, real_y2;
					if (shapes[i].y1 == 0 && shapes[i].y2 == 0) {
						real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
						real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
						real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
						real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
						lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					} else {
						if (parentShapeType == 1) {
							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
							real_y1 = Number(0) + horizontalLines[0].val;
							real_y2 = Number(0) + horizontalLines[0].val;
						} else if (parentShapeType == 5) {
							real_x1 = Number(0) + verticalLines[0].val;
							real_x2 = Number(0) + verticalLines[0].val;
							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
						}
						linesInOtherPlanes.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					}
//					real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//					real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//					real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//					real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
					console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
					
					lineid = "line_" + lineNumber;
					
					svg.innerHTML += "<line id='" + lineid + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
//					lines.push({id:lineid, x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					linesInDisplayView.push({x1:real_x1, y1:real_y1, x2:real_x2, y2:real_y2});
					lineNumber++;
				}
				
			}

		}
		
		if (shapes[i].groupShape == "CIRCLE") {
			if (view3D == 'xy') {
				if (shapes[i].z1 == 0) {
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
						displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, eleId);
						rectsInDisplayView.push(displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, eleId));
						circ_tmp = [];
						parents = [];
						shapeIds = [];
						
					}
				}
			} else if (view3D == 'yz') {
				if (shapes[i].x1 == 0) {
					console.log("Inside display Part circle!!!");
					// TODO: Need to check if this circle shape has a parent
					parents.push(shapes[i].parent);
					shapeIds.push(shapes[i].id);
					
					var circ_element_tmp = {};
					circ_element_tmp.x1 = -shapes[i].y1;
					circ_element_tmp.y1 = shapes[i].z1;
					circ_element_tmp.radius = shapes[i].width;
					circ_tmp.push(circ_element_tmp);
					
					if (circ_tmp.length == 4) {
						displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, eleId);
						rectsInDisplayView.push(displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, eleId));
						circ_tmp = [];
						parents = [];
						shapeIds = [];
						
					}
				}
			} else if (view3D == 'xz') {
				if (shapes[i].y1 == 0) {
					console.log("Inside display Part circle!!!");
					// TODO: Need to check if this circle shape has a parent
					parents.push(shapes[i].parent);
					shapeIds.push(shapes[i].id);
					
					var circ_element_tmp = {};
					circ_element_tmp.x1 = shapes[i].x1;
					circ_element_tmp.y1 = shapes[i].z1;
					circ_element_tmp.radius = shapes[i].width;
					circ_tmp.push(circ_element_tmp);
					
					if (circ_tmp.length == 4) {
						displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, eleId);
						rectsInDisplayView.push(displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, eleId));
						circ_tmp = [];
						parents = [];
						shapeIds = [];
						
					}
				}

			}

		}	
	
	}
	}
	
	if (!isCorrShow) {
	
		var jsonString = '{';
		
		var jsonStringTemp = '"lines":[';
		for (var i = 0; i < linesInDisplayView.length; i++) {
			jsonStringTemp += '{x1:' + Math.round(linesInDisplayView[i].x1) + ',y1:' + Math.round(linesInDisplayView[i].y1) + ',x2:' + Math.round(linesInDisplayView[i].x2) + ',y2:' + Math.round(linesInDisplayView[i].y2) + '},';
		}
		jsonStringTemp += ']';
		jsonString += jsonStringTemp;
		
		var jsonStringTemp = '"rects":[';
		for (var i = 0; i < rectsInDisplayView.length; i++) {
			jsonStringTemp += '{x:' + Math.round(rectsInDisplayView[i].x) + ',y:' + Math.round(rectsInDisplayView[i].y) + ',height:' + Math.round(rectsInDisplayView[i].height) + ',width:' + Math.round(rectsInDisplayView[i].width) + '},';
		}
		jsonStringTemp += ']';
//		jsonString += jsonStringTemp;
////		
//		var jsonStringTemp = '"texts":[';
//		for(var i=0; i<textsInDisplayView.length; i++){
//			jsonStringTemp += 'x:'+ Math.round(textsInDisplayView[i].x)  + ',y:' + Math.round(textsInDisplayView[i].y) + ' value of text'+textsInDisplayView[i].textvalue + ' }, ';
//		}
//		jsonStringTemp += ']';
		
		jsonString += jsonStringTemp;
		jsonString += '}';
		
		console.log("the json string to store in neo4j" + jsonString);
		
		// here we get the json to store into neo4j. need to implement code to do this!
		// [[pos 1]]

	}

	if(selecteddecorator == 'Physical' && (topLevelTab == "instRelViewTab") ) {
		console.log("content of svg is: "+ svg.innerHTML);
		document.getElementById(eleId).appendChild(svg);}
	else { 
		document.getElementById(eleId).innerHTML += svg;   
		}
	
}





























//=========================================================================================
//function getVerticalLineCoor(shapes, pos) {
//	if (!('parent' in shapes[pos])) {
//		return shapes[pos].x1;
//	}
//	var parentLine;
//	var parentPos;
//	for (var i = 0; i < shapes.length; i++) {
//		if (shapes[i].id == shapes[pos].parent) {
//			parentLine = shapes[i];
//			parentPos = i;
//			break;
//		}
//	}
//	return shapes[pos].x1 + getVerticalLineCoor(shapes, parentPos);
//}
////==========================================================================================
//function getHorizontalLineCoor(shapes, pos) {
//	if (!('parent' in shapes[pos])) {
//		return shapes[pos].y1;
//	}
//	var parentLine;
//	var parentPos;
//	for (var i = 0; i < shapes.length; i++) {
//		if (shapes[i].id == shapes[pos].parent) {
//			parentLine = shapes[i];
//			parentPos = i;
//			break;
//		}
//	}
//	return shapes[pos].y1 + getHorizontalLineCoor(shapes, parentPos);
//}

