// press mouse
function drawMouseDown(event) {
	
	console.log("trying to draw!");
	if (drawingStat == 0) {                  // global variable drawingStat not set ------ no action
		console.log("nothing to draw");
		return;
	}
	
	if (shape == "line") {                   //  shape selected   is line 
		if (drawingStat == 1) {
			console.log("draw a line");
			var x = event.clientX;
			var y = event.clientY;
			var rect = document.getElementById("pdsvsvg").getBoundingClientRect();
			console.log(rect.top, rect.right, rect.bottom, rect.left);
			x0 = rect.left;
			y0 = rect.top;
			x = x - x0;
			y = y - y0;
			console.log("coor x = " + x);
			console.log("coor y = " + y);
			drawLine(x, y);
		}
	} else if (shape == "rect") {
		
		if (drawingStat == 1) {
			console.log("draw a rect");
			
			startX = event.clientX;
			startY = event.clientY;
			
			var x = event.clientX;
			var y = event.clientY;
			
			var rect = document.getElementById("pdsvsvg").getBoundingClientRect();
			console.log(rect.top, rect.right, rect.bottom, rect.left);
			
			x0 = rect.left;
			y0 = rect.top;
			
			startX = x - x0;
			startY = y - y0;
			
			console.log("coor x = " + startX);
			console.log("coor y = " + startY);
			drawRect(startX, startY);
		}
		
	} else if (shape == "circ") {
			if (drawingStat == 1) {
				
				// draw circle dynamically based on a center point
	//			console.log("draw a circle");
	//			
	//			startX = event.clientX;
	//			startY = event.clientY;
	//			
	//			var x = event.clientX;
	//			var y = event.clientY;
	//			
	//			var rect = document.getElementById("pdsvsvg").getBoundingClientRect();
	//			console.log(rect.top, rect.right, rect.bottom, rect.left);
	//			
	//			x0 = rect.left;
	//			y0 = rect.top;
	//			
	//			x = x - x0;
	//			y = y - y0;
	//			
	//			console.log("coor x = " + x);
	//			console.log("coor y = " + y);
	//			drawCirc(x, y);


			console.log("draw a circle");
			
			var intersection = selectIntersection(event);
			
			if (intersection != null) {
				selectedIntersections.push(intersection);
				if (selectedIntersections.length == 2) {
					console.log("ready to draw a circle");
					var curCircId = drawCirc();
					var shapes = convertIntersectionToCircShapes(selectedIntersections, curCircId);
					saveGroupShape("circ", shapes);
					selectedIntersections = [];
				}
			}
		}
		
	} else if (shape == "grid") {	
		if (drawingStat == 1) {
			console.log("draw a grid");
			selectedLine = selectLine(event);
			if (selectedLine != null) {
				drawGrid(selectedLine);
				drawingStat = 2;
			}
		}	
	}  else if (shape == "aline") {
		if (drawingStat == 1) {
			console.log("draw an angle line");
			selectedPoint = selectPoint(event);
			drawAline(selectedPoint);
			drawingStat = 2;
		}
	} else if (shape == "text") {
		if (drawingStat == 1) {
			console.log("draw a text");
			selectedIntersection = selectIntersection(event);
			var curTextId = drawText(selectedIntersection);
			
			var shapes = [];
			var x1_val = selectedIntersection.x - verticalLines[0].val;
			var y1_val = selectedIntersection.y - horizontalLines[0].val;
			var record1 = {x1: x1_val, y1: y1_val, angle: 0, parent: selectedIntersection.parent_y, curTextId:curTextId};
			var record2 = {x1: x1_val, y1: y1_val, angle: 90, parent: selectedIntersection.parent_x, curTextId:curTextId};
			var record3 = {x1: x1_val, y1: y1_val, angle: 45,  curTextId:curTextId};
			shapes.push(record1);
			shapes.push(record2);
			shapes.push(record3);
			saveGroupShape("text", shapes)
			
			drawingStat = 2;
		}
	} else if (shape == "rcfl") {	
		if (drawingStat == 1) {
			console.log("draw a rcfl");
			var intersection = selectIntersection(event);
			if (intersection != null) {
				selectedIntersections.push(intersection);
				if (selectedIntersections.length == 2) {
					console.log("ready to fill a rect");
					rectFill();
					var shapes = convertIntersectionToShapes(selectedIntersections);
					saveGroupShape("rectFill", shapes);
					selectedIntersections = [];
				}
			}
		}
	}  else if (shape == "ccfl") {
		if (drawingStat == 1) {
			console.log("draw a ccfl");
			var intersection = selectIntersection(event);
			if (intersection != null) {
				selectedIntersections.push(intersection);
				if (selectedIntersections.length == 2) {
					console.log("ready to fill a circle");
					circFill();
					selectedIntersections = [];
				}
			}
		}
		
	} else if (shape == "move") {
		if (drawingStat == 1) {
			console.log("start to move");
			startX = event.clientX;
			startY = event.clientY;
			drawingStat = 2;	
		}
	} else if (shape == "zmin") {
		if (drawingStat == 1) {
			console.log("start to zoom in");
			startX = event.clientX;
			startY = event.clientY;
			drawingStat = 2;
			zoomIn();
		}
	} else if (shape == "zmou") {
		if (drawingStat == 1) {
			console.log("start to zoom out");
			startX = event.clientX;
			startY = event.clientY;
			drawingStat = 2;
			zoomOut();
		}
		
	} else if (shape == "ajst") {
		if (drawingStat == 1) {
			console.log("start to adjust");
			// redrawContour
			startX = event.clientX;
			startY = event.clientY;
			var bound = document.getElementById("pdsvsvg").getBoundingClientRect();
			x0 = bound.left;
			y0 = bound.top;
			selectElement(startX - x0, startY - y0);
			if (elementFound.length > 0) {
				console.log("element found!");
				childrenElements = elementFound.slice(1, elementFound.length);
				changeChildrenColor(childrenElements);
				findAllGroupShapesAssociated();
				drawingStat = 2;
			}
		}
		
	} else if (shape == "edit") {
		if (drawingStat == 1) {	
			console.log("start to edit");
			if (propText) {selectedIntersection = selectIntersection(event);  }
			else {
				selectedLine = selectLine(event);
				selectedIntersection = selectIntersection(event);
			}
		}
	} else if (shape == "cntr") {
		if (drawingStat == 1) {	
			console.log("start to draw a countour");
			var line = selectLine(event);
			if (line != null) {
				
				// AL: here is dealing unhappy path. if the user select a wrong line simply not accept it
				if (selectedLine.length < 1) {
					selectedLine.push(line);
				} else {
					
					// the second or third one must have a intersection with the previous one
					var selectedElementInter = getIntersection(selectedLine[selectedLine.length-1], line);
					if (selectedElementInter != null) {
						if (selectedElementInters < 1) {
							selectedLine.push(line);
							selectedElementInters.push(selectedElementInter);
						} else {
							if (selectedElementInters[selectedElementInters.length - 1].x == selectedElementInter.x && selectedElementInters[selectedElementInters.length - 1].y == selectedElementInter.y) {
								console.log("wrong line! select again");
							} else {
								selectedLine.push(line);
								selectedElementInters.push(selectedElementInter);
							}
						}
//						selectedLine.push(line);
//						selectedElementInters.push(selectedElementInter);
					} else {
						// AL: do we need to pop up a warning window?
						console.log("wrong line! select again");
					}
					
					// the second or third one must have a intersection with the previous one
//					console.log("selectedLine[selectedLine.length - 1].type = " + selectedLine[selectedLine.length - 1]);
//					console.log("line.type = " + line.type);
//					
//					if (constructionLineFilter(selectedLine[selectedLine.length - 1].type, line.type, false)) {
//						selectedLine.push(line);redrawContour
//					} else {
//						
//						// AL: do we need to pop up a warning window?
//						console.log("wrong line! select again");
//					}
				}
			}
		}
	}
	
}

function getIntersection(svgElement1, svgElement2) {
	
	var inter = {};

	if (svgElement1.type == "circGroup") {
		if (svgElement2.type == "circGroup") {
			// TODO: intersection between two circles
			return null;
		} else if (svgElement2.type == "horizontal") {
			
			if (svgElement1.cy > 0) {
				if (svgElement2.value >= (svgElement1.cy - svgElement1.r) && svgElement2.value <= (svgElement1.cy + svgElement1.r)){
					var x1 = Math.sqrt(Math.pow(svgElement1.r,2) - Math.pow((svgElement2.value - svgElement1.cy),2)) + svgElement1.cx
					var x2 = -Math.sqrt(Math.pow(svgElement1.r,2) - Math.pow((svgElement2.value - svgElement1.cy),2)) + svgElement1.cx
					var y = svgElement2.value
					var d1 = Math.sqrt(Math.pow(svgElement2.sX - x1,2) + Math.pow(svgElement2.sY - y,2))
					var d2 = Math.sqrt(Math.pow(svgElement2.sX - x2,2) + Math.pow(svgElement2.sY - y,2))
					
					if (d1 < d2) {
						inter.x = x1;
						inter.y = y;
					} else {
						inter.x = x2;
						inter.y = y;
					}				
				} else {
					return null;
				}
			} else {
				if (svgElement2.value >= (svgElement1.cy + svgElement1.r) && svgElement2.value <= (svgElement1.cy - svgElement1.r)){
					var x1 = Math.sqrt(Math.pow(svgElement1.r,2) - Math.pow((svgElement2.value - svgElement1.cy),2)) + svgElement1.cx
					var x2 = -Math.sqrt(Math.pow(svgElement1.r,2) - Math.pow((svgElement2.value - svgElement1.cy),2)) + svgElement1.cx
					var y = svgElement2.value
					var d1 = Math.sqrt(Math.pow(svgElement2.sX - x1,2) + Math.pow(svgElement2.sY - y,2))
					var d2 = Math.sqrt(Math.pow(svgElement2.sX - x2,2) + Math.pow(svgElement2.sY - y,2))
					
					if (d1 < d2) {
						inter.x = x1;
						inter.y = y;
					} else {
						inter.x = x2;
						inter.y = y;
					}	
				} else {
					return null;
				}
			}

		} else if (svgElement2.type == "vertical") {
			
			if (svgElement1.cx > 0) {
				if (svgElement2.value >= (svgElement1.cx - svgElement1.r) && svgElement2.value <= (svgElement1.cx + svgElement1.r)){
					var y1 = Math.sqrt(Math.pow(svgElement1.r,2) - Math.pow((svgElement2.value - svgElement1.cx),2)) + svgElement1.cy
					var y2 = -Math.sqrt(Math.pow(svgElement1.r,2) - Math.pow((svgElement2.value - svgElement1.cx),2)) + svgElement1.cy
					var x = svgElement2.value
					
					var d1 = Math.sqrt(Math.pow(svgElement2.sX - x,2) + Math.pow(svgElement2.sY - y1,2))
					var d2 = Math.sqrt(Math.pow(svgElement2.sX - x,2) + Math.pow(svgElement2.sY - y2,2))
					
					if (d1 < d2) {
						inter.x = x;
						inter.y = y1;
					} else {
						inter.x = x;
						inter.y = y2;
					}			
				} else {
					return null;
				}
			} else {
				if (svgElement2.value >= (svgElement1.cx + svgElement1.r) && svgElement2.value <= (svgElement1.cx - svgElement1.r)){
					var y1 = Math.sqrt(Math.pow(svgElement1.r,2) - Math.pow((svgElement2.value - svgElement1.cx),2)) + svgElement1.cy
					var y2 = -Math.sqrt(Math.pow(svgElement1.r,2) - Math.pow((svgElement2.value - svgElement1.cx),2)) + svgElement1.cy
					var x = svgElement2.value
					
					var d1 = Math.sqrt(Math.pow(svgElement2.sX - x,2) + Math.pow(svgElement2.sY - y1,2))
					var d2 = Math.sqrt(Math.pow(svgElement2.sX - x,2) + Math.pow(svgElement2.sY - y2,2))
					
					if (d1 < d2) {
						inter.x = x;
						inter.y = y1;
					} else {
						inter.x = x;
						inter.y = y2;
					}		
				} else {
					return null;
				}
			}

		} else {
			console.log("No Selected Element Type Found");
			return null;
		}
	} else if (svgElement1.type == "horizontal") {
		if (svgElement2.type == "circGroup") {
			
			if (svgElement2.cy > 0) {
				if (svgElement1.value >= (svgElement2.cy - svgElement2.r) && svgElement1.value <= (svgElement2.cy + svgElement2.r)){	
					var x1 = Math.sqrt(Math.pow(svgElement2.r,2) - Math.pow((svgElement1.value - svgElement2.cy),2)) + svgElement2.cx
					var x2 = -Math.sqrt(Math.pow(svgElement2.r,2) - Math.pow((svgElement1.value - svgElement2.cy),2)) + svgElement2.cx
					var y = svgElement1.value
					var d1 = Math.sqrt(Math.pow(svgElement2.sX - x1,2) + Math.pow(svgElement2.sY - y,2))
					var d2 = Math.sqrt(Math.pow(svgElement2.sX - x2,2) + Math.pow(svgElement2.sY - y,2))
					
					if (d1 < d2) {
						inter.x = x1;
						inter.y = y;
					} else {
						inter.x = x2;
						inter.y = y;
					}	
				} else {
					return null;
				}
			} else {
				if (svgElement1.value >= (svgElement2.cy + svgElement2.r) && svgElement1.value <= (svgElement2.cy - svgElement2.r)){
					var x1 = Math.sqrt(Math.pow(svgElement2.r,2) - Math.pow((svgElement1.value - svgElement2.cy),2)) + svgElement2.cx
					var x2 = -Math.sqrt(Math.pow(svgElement2.r,2) - Math.pow((svgElement1.value - svgElement2.cy),2)) + svgElement2.cx
					var y = svgElement1.value
					
					var d1 = Math.sqrt(Math.pow(svgElement2.sX - x1,2) + Math.pow(svgElement2.sY - y,2))
					var d2 = Math.sqrt(Math.pow(svgElement2.sX - x2,2) + Math.pow(svgElement2.sY - y,2))
					
					if (d1 < d2) {
						inter.x = x1;
						inter.y = y;
					} else {
						inter.x = x2;
						inter.y = y;
					}	
				} else {
					return null;
				}
			}
		
		} else if (svgElement2.type == "horizontal") {
			return null;
		} else if (svgElement2.type == "vertical") {
			inter.x = svgElement2.value;
			inter.y = svgElement1.value;
		} else {
			console.log("No Selected Element Type Found");
			return null;
		}
	} else if (svgElement1.type == "vertical") {
		if (svgElement2.type == "circGroup") {
			
			if (svgElement2.cx > 0) {
				if (svgElement1.value >= (svgElement2.cx - svgElement2.r) && svgElement1.value <= (svgElement2.cx + svgElement2.r)){
					var y1 = Math.sqrt(Math.pow(svgElement2.r,2) - Math.pow((svgElement1.value - svgElement2.cx),2)) + svgElement2.cy
					var y2 = -Math.sqrt(Math.pow(svgElement2.r,2) - Math.pow((svgElement1.value - svgElement2.cx),2)) + svgElement2.cy
					var x = svgElement1.value
					
					var d1 = Math.sqrt(Math.pow(svgElement2.sX - x,2) + Math.pow(svgElement2.sY - y1,2))
					var d2 = Math.sqrt(Math.pow(svgElement2.sX - x,2) + Math.pow(svgElement2.sY - y2,2))
					
					if (d1 < d2) {
						inter.x = x;
						inter.y = y1;
					} else {
						inter.x = x;
						inter.y = y2;
					}		
				} else {
					return null;
				}
			} else {
				if (svgElement1.value >= (svgElement2.cx + svgElement2.r) && svgElement1.value <= (svgElement2.cx - svgElement2.r)){
					var y1 = Math.sqrt(Math.pow(svgElement2.r,2) - Math.pow((svgElement1.value - svgElement2.cx),2)) + svgElement2.cy
					var y2 = -Math.sqrt(Math.pow(svgElement2.r,2) - Math.pow((svgElement1.value - svgElement2.cx),2)) + svgElement2.cy
					var x = svgElement1.value	
					var d1 = Math.sqrt(Math.pow(svgElement2.sX - x,2) + Math.pow(svgElement2.sY - y1,2))
					var d2 = Math.sqrt(Math.pow(svgElement2.sX - x,2) + Math.pow(svgElement2.sY - y2,2))
					
					if (d1 < d2) {
						inter.x = x;
						inter.y = y1;
					} else {
						inter.x = x;
						inter.y = y2;
					}	
				} else {
					return null;
				}
			}
		
		} else if (svgElement2.type == "horizontal") {
			inter.x = svgElement1.value;
			inter.y = svgElement2.value;
		} else if (svgElement2.type == "vertical") {
			return null;
		} else {
			console.log("No Selected Element Type Found");
			return null;
		}
	} else {
		console.log("No Selected Element Type Found");
		return null;
	}
		
	return inter;

}

function drawLine(x, y) {
	
	var output = "";
	if (view3D == 'xy') {
		output += "<line id='line" + lineNumber + "' x1='" + x + "' y1='" + y + "' x2='" + x + "' y2='" + y + "' style='stroke:rgb(0,204,255);stroke-width:2' />";
	} else if (view3D == 'yz') {
		output += "<line id='line" + lineNumber + "' x1='" + x + "' y1='" + y + "' x2='" + x + "' y2='" + y + "' style='stroke:rgbrgb(66,244,101);stroke-width:2' />";
	} else if (view3D == 'xz') {
		output += "<line id='line" + lineNumber + "' x1='" + x + "' y1='" + y + "' x2='" + x + "' y2='" + y + "' style='stroke:rgb(128,0,128);stroke-width:2' />";
	}
//	output += "<line id='line" + lineNumber + "' x1='" + x + "' y1='" + y + "' x2='" + x + "' y2='" + y + "' style='stroke:rgb(255,0,0);stroke-width:2' />";
	var py = document.getElementById("pdsvsvg");
	py.innerHTML += output;
	
}

// release mouse
function drawMouseUp(event) {
	
	if (drawingStat == 0) {
		return;
	}
	
	if (shape == "line") {
		if (drawingStat == 1) {	
			startX = event.clientX;
			startY = event.clientY;
			drawingStat = 2;
		} else {
			var lineId = 'line' + lineNumber;
			var line = $('#' + lineId);
			lines.push({id: lineId, x1: Number(line.attr('x1')), y1:  Number(line.attr('y1')), x2:  Number(line.attr('x2')), y2:  Number(line.attr('y2'))});
			drawingStat = 1;
			lineNumber++;
		}
	} else if (shape == "rect") {
		
		if (drawingStat == 1) {
			drawingStat = 2;
		} else {
			var rectId = 'rect' + rectNumber;
			var rect = $('#' + rectId);
			rects.push({id: rectId, x: Number(rect.attr('x')), y:  Number(rect.attr('y')), width:  Number(rect.attr('width')), height:  Number(rect.attr('height'))});
			drawingStat = 1;
			rectNumber++;
		}
		
	} else if (shape == "circ") {
		
//		if (drawingStat == 1) {
//			
//			
//			drawingStat = 2;
//		} else {
//			
//			var circId = 'circ' + circNumber;
//			var circ = $('#' + circId);
//			
//			circs.push({id: circId, cx: Number(circ.attr('cx')), cy:  Number(circ.attr('cy')), r:  Number(circ.attr('r'))});
//			
//			drawingStat = 1;
//			circNumber++;
//		}
		
	} else if (shape == "grid") {
		console.log(" value of drawingStat is "+drawingStat );
		drawingStat = 1;
		
		var bound = document.getElementById("pdsvsvg").getBoundingClientRect();
		
		x0 = bound.left;
		y0 = bound.top;
		
		var diffX;
		var diffY;
		var absX;
		var absY;
		
		if (selectedLine != null) {
			diffX = event.clientX - selectedLine.value - x0;
			diffY = event.clientY - selectedLine.value - y0;
		
			absX = event.clientX - x0;
			absY = event.clientY - y0
			
			diffX = diffX / zoomLevels[zoomLevel];
			diffY = diffY / zoomLevels[zoomLevel];
		
			if (selectedLine.type == "vertical") {
				// AL: need get the real model by the selected type
				saveShape("verticalLine", diffX, diffY, null, null, null, null, null, selectedLine.uid, absX, absY, null, null);
				
			} else {
				saveShape("horizontalLine", diffX, diffY, null, null, null, null, null, selectedLine.uid, absX, absY, null, null);
				
			}
		}
				
	} else if (shape == "aline") {
		// TODO: Save angle lines
		drawingStat = 1;
	} else if (shape == "text") {
		drawingStat = 1;
	} else if (shape == "move") {
		
		drawingStat = 1;
		updateVerticalLines();
		updateHorizontalLines();
		updateVerticalTexts();
		updateHorizontalTexts();
		updateTexts();
		updateRects();
		updateCircs();
		updateLines();
		updateCircCntrs();
		
//		updateVerticalBggds();
//		updateHorizontalBggds();
	} else if (shape == "zmin") {
		drawingStat = 1;
	} else if (shape == "zmou") {
		drawingStat = 1;
	} else if (shape == "ajst") {
		
		drawingStat = 1;
		updateShape(event);
		updateGroupShape();
		updateCircShape();
		selectedLine = null;
		elementFound = [];
		groupAssociated = [];
		contourAssociated = [];
		circFound = [];
		cntrFound = [];
		groupShapeFound = [];
		oldCntrFound = [];
		oldCircFound = [];
		oldElementFound = [];
		textFound = [];
		oldTextFound = [];
		rectFound = [];
		oldRectFound = [];
		
	} else if (shape == "edit") {   
		// OLD CODE BY ALLEN
//		showAddModelPropertyDialog();
//	    showAddModelPropertyForm();		
		// NEW by BAYA
//		either a line is selected    or an intersection 
//		look if prior to this the un-assign  option is selected
//		if Yes   === find out if we are unassigning a text property or number property
//		with what had been selected or line or intersection
		if(unassign) {
			// two options either an intersection or a line is selected 
			if(selectedIntersection != null	 ) { updateUnAssignProperty('TEXT');    }
			else if (selectedLine != null)     { updateUnAssignProperty('NUMBER');  }
			else { 
				 console.log(" No selection for the Unassign option ");
			     // may be we need to reset the unassign variable here
                 }
		}else {
			// no unassign selected  -----  look which property type is to be assigned
			// look if it a  property  type text  is selected to assign to a Text shape
			if(propText)            {   saveAssignTextProToTextShape();} 
			//  last option it is a property type number 
			else saveAssignShapeToProperty();
		}
	} else if (shape == "cntr") {
		
		if (selectedLine.length == 3 && selectedElementInters.length == 2) {
			drawContour(selectedElementInters, selectedLine[1]);
			updateContourHolder();
//			document.getElementById(selectedLine[0].id).style.stroke = "red";
			selectedLine.shift();
			selectedElementInters.shift();
		}
		
//		if (selectedLine.length == 3) {
//			var coors = getContourLineCoor();
///			drawContourLine(coors[0], coors[1], coors[2], coors[3], selectedLine[1].parent);
//			selectedLine.shift();
//		}
	}
	
}

function drawContour (inters, svgElement) {
	
	if (svgElement.type == "horizontal" || svgElement.type == "vertical") {
		
		var lineId = "line_" + lineNumber;
		var output = "";
		output += "<line id='" + lineId + "' x1='" + inters[0].x + "' y1='" + inters[0].y + "' x2='" + inters[1].x + "' y2='" + inters[1].y + "' stroke=blue stroke-width=5 />";
		var py = document.getElementById("pdsvsvg");
		py.innerHTML += output;
	
		// put the line into lines
		lines.push({id:lineId, x1:inters[0].x, y1:inters[0].y, x2:inters[1].x, y2:inters[1].y, parent:svgElement.parent, uid:-999})
		
		tmpIdHolder.push(lineId);
		
		lineNumber++;
	
	} else if (svgElement.type == "circGroup") {
		
		var minX = inters[0].x;
		var maxX = inters[1].x;
		if (minX > maxX) {
			var tmpX = maxX;
			maxX = minX;
			minX = tmpX;
		}
		var minY = inters[0].y;
		var maxY = inters[1].y;
		if (minY > maxY) {
			var tmpY = maxY;
			maxY = minY;
			minY = tmpY;
		}
		
		var onSmallPart = (svgElement.sX >= minX && svgElement.sX <= maxX) || (svgElement.sY >= minY && svgElement.sY <= maxY);
		if (minX == maxX) {
			onSmallPart = svgElement.sY >= minY && svgElement.sY <= maxY;
		}
		if (minY == maxY) {
			onSmallPart = svgElement.sX >= minX && svgElement.sX <= maxX;
		}
		
		// Not sure if need to consider the situation that equals zero
		var sweepFlag = (inters[0].x-svgElement.sX)*(inters[1].y-svgElement.sY) - (inters[0].y-svgElement.sY)*(inters[1].x-svgElement.sX) < 0;
	
		var circConId = "circCon" + circConNumber;
		var output = "";
		
		var d = svgElement.sX;
		var r = svgElement.r;
		
		if (onSmallPart) {
			if (!sweepFlag) {
				output = '<path id="' + circConId + '" d="M' + inters[0].x + ' ' + inters[0].y + ' A ' + svgElement.r + ' ' + svgElement.r + ' 0 0 0 ' + inters[1].x + ' ' + inters[1].y + '" stroke="blue" stroke-width="5" fill="none"/>';
				svgElement.sweepFlag = false;
			} else {
				output = '<path id="' + circConId + '" d="M' + inters[0].x + ' ' + inters[0].y + ' A ' + svgElement.r + ' ' + svgElement.r + ' 0 0 1 ' + inters[1].x + ' ' + inters[1].y + '" stroke="blue" stroke-width="5" fill="none"/>';
				svgElement.sweepFlag = true;
			}
//			if (svgElement.sX < svgElement.cx angle < 180) {
//				output = '<path id="' + circConId + '" d="M' + inters[1].x + ' ' + inters[1].y + ' A ' + svgElement.r + ' ' + svgElement.r + ' 0 0 0 ' + inters[0].x + ' ' + inters[0].y + '" stroke="blue" stroke-width="5" fill="none"/>';
//			} else {
//				output = '<path id="' + circConId + '" d="M' + inters[0].x + ' ' + inters[0].y + ' A ' + svgElement.r + ' ' + svgElement.r + ' 0 0 0 ' + inters[1].x + ' ' + inters[1].y + '" stroke="blue" stroke-width="5" fill="none"/>';
//			}
//			output = '<path id="' + circConId + '" d="M' + inters[0].x + ' ' + inters[0].y + ' A ' + svgElement.r + ' ' + svgElement.r + ' 0 0 0 ' + inters[1].x + ' ' + inters[1].y + '" stroke="blue" stroke-width="5" fill="none"/>';
			svgElement.largeArcFlag = false;
		} else {
			if (!sweepFlag) {
				output = '<path id="' + circConId + '" d="M' + inters[0].x + ' ' + inters[0].y + ' A ' + svgElement.r + ' ' + svgElement.r + ' 0 1 0 ' + inters[1].x + ' ' + inters[1].y + '" stroke="blue" stroke-width="5" fill="none"/>';
				svgElement.sweepFlag = false;
			} else {
				output = '<path id="' + circConId + '" d="M' + inters[0].x + ' ' + inters[0].y + ' A ' + svgElement.r + ' ' + svgElement.r + ' 0 1 1 ' + inters[1].x + ' ' + inters[1].y + '" stroke="blue" stroke-width="5" fill="none"/>';
				svgElement.sweepFlag = true;
			}
//			if (svgElement.sX < svgElement.cx) {
//				output = '<path id="' + circConId + '" d="M' + inters[1].x + ' ' + inters[1].y + ' A ' + svgElement.r + ' ' + svgElement.r + ' 0 1 0 ' + inters[0].x + ' ' + inters[0].y + '" stroke="blue" stroke-width="5" fill="none"/>';
//			} else {
//				output = '<path id="' + circConId + '" d="M' + inters[0].x + ' ' + inters[0].y + ' A ' + svgElement.r + ' ' + svgElement.r + ' 0 1 0 ' + inters[1].x + ' ' + inters[1].y + '" stroke="blue" stroke-width="5" fill="none"/>';
//			}
//			output = '<path id="' + circConId + '" d="M' + inters[1].x + ' ' + inters[1].y + ' A ' + svgElement.r + ' ' + svgElement.r + ' 0 1 0 ' + inters[0].x + ' ' + inters[0].y + '" stroke="blue" stroke-width="5" fill="none"/>';
			svgElement.largeArcFlag = true;
		}
		
//		output = '<path id="' + circConId + '" d="M' + inters[0].x + ' ' + inters[0].y + ' A ' + svgElement.r + ' ' + svgElement.r + ' 0 0 0 ' + inters[1].x + ' ' + inters[1].y + '" stroke="blue" stroke-width="5" fill="none"/>'
		var py = document.getElementById("pdsvsvg");
		py.innerHTML += output;
	
		// put the line into circle contours
		// TODO: need parents
//		circCons.push({id:circConId, x1:inters[0].x, y1:inters[0].y, x2:inters[1].x, y2:inters[1].y, r:svgElement.r, parents:svgElement.parents, uid:-999});
		if (svgElement.sweepFlag == false) {
			circCons.push({id:circConId, x1:inters[0].x, y1:inters[0].y, x2:inters[1].x, y2:inters[1].y, r:svgElement.r, uid:-999, groupShapeParent:svgElement.group, largeArcFlag:svgElement.largeArcFlag});
		} else {
			circCons.push({id:circConId, x1:inters[1].x, y1:inters[1].y, x2:inters[0].x, y2:inters[0].y, r:svgElement.r, uid:-999, groupShapeParent:svgElement.group, largeArcFlag:svgElement.largeArcFlag});
		}
		
		tmpIdHolder.push(circConId);
		
		circConNumber++;

	} else {
		console.log("Do Nothing!");
	}

}

function drawMouseMove(event) {
	
	findMouseCoor(event);
	if (drawingStat != 2) {
		return;
	}
	
	if (shape == "line") {
		var lineId = "line" + lineNumber;
		var line = $('#' + lineId);
		
		var rect = document.getElementById("pdsvsvg").getBoundingClientRect();
		
		var diffX = event.clientX - x0;
		var diffY = event.clientY - y0;
		
		line.attr({x2:diffX, y2:diffY});
		
	} else if (shape == "rect") {
		
		var rectId = "rect" + rectNumber;
		var rect = $('#' + rectId);
		
		var bound = document.getElementById("pdsvsvg").getBoundingClientRect();
		
		var diffX = event.clientX - startX - x0;
		var diffY = event.clientY - startY - y0;
		
		
		if (diffX >= 0 && diffY >= 0) {
			rect.attr({width:diffX, height:diffY});
		} else if (diffX >= 0 && diffY < 0) {
			new_y = startY + diffY;
			rect.attr({y:new_y, width:diffX, height:-diffY});
		} else if (diffX < 0 && diffY >= 0) {
			new_x = startX + diffX;
			rect.attr({x:new_x, width:-diffX, height:diffY});
		} else {
			new_x = startX + diffX;
			new_y = startY + diffY;
			rect.attr({x:new_x, y:new_y, width:-diffX, height:-diffY});
		}
		
		
		
	} else if (shape == "circ") {
		
		var circId = "circ" + circNumber;
		var circ = $('#' + circId);
		
		var bound = document.getElementById("pdsvsvg").getBoundingClientRect();
		
		var diffX = event.clientX - startX;
		var diffY = event.clientY - startY;
		
		var radius = Math.sqrt((diffX * diffX) + (diffY * diffY));
				
		circ.attr({r:radius});
		
	} else if (shape == "grid") {
		
		var grid = $("#grid_tmp");
		
		var diffX = event.clientX - x0;
		var diffY = event.clientY - y0;
		
		moveLine(selectedLine, diffX, diffY, grid);
		
	} else if (shape == "aline") {		
		moveAline(event);
	} else if (shape == "move") {
		if (drawingStat == 2) {
			transform(event);
		}
		console.log("make sure thie will stop");
	} else if (shape == "ajst") {
		
		console.log("adjusting!");
		
		adjustElement(event);
		
		var curX = event.clientX;
		var curY = event.clientY;
		var tmpPos;
		
		if (elementFound[0].type == "verticalLine") {
			tmpPos = updateConstLineTmpPos(verticalLines, curX - startX);
		} else if (elementFound[0].type == "horizontalLine") {
			tmpPos = updateConstLineTmpPos(horizontalLines, curY - startY);
		}
		
		console.log("tmPos = " + tmpPos);
		
		redrawCircle();
		redrawGroupShapes(tmpPos, event);
		
	}
	
	
}

// find all vetical or horizontal parents of a circle
function findCircleParentsByType(type, circle) {
	
	var circParentsByType = [];
	for (var i = 0; i < circle.parents.length; i++) {
		
		if (type == 'verticalLine') {
			var rv = getVerticalElementByUid(circle.parents[i], true);
			if (rv != null) {
				circParentsByType.push(rv);
			}
		} else {
			var rh = getHorizontalElementByUid(circle.parents[i], true);
			if (rh != null) {
				circParentsByType.push(rh);
			}
		}
	}
	
	if (circParentsByType.length < 1) {
		return null;
	} else {
		return circParentsByType;
	}

}

function redrawCircle() {
	
	for (var i = 0; i < circFound.length; i++) {
		
		var theCircle = null;
		for (var j = 0; j < circs.length; j++) {
			if (circFound[i].group == circs[j].group) {
				theCircle = circs[j];
			}
			
		} 
		
		var shape = $("#" + theCircle.id);
		var cx = theCircle.cx;
		var cy = theCircle.cy;
		var r = theCircle.r;
		
		var oldCV = null;
		var oldCH = null;
		var oldRV = null;
		var oldRH = null;
		var cParents = [];
		for (var j = 0; j < circFound[i].parents.length; j++) {
			cParents.push(circFound[i].parents[j]);
		}
//		var cParents = circFound[i].parents.slice();
		for (var j = 0; j < circFound[i].parents.length; j++) {
			
			var isVertical = true;
			var p = getVerticalElementByUid(circFound[i].parents[j], true);
			if (p == null) {
				p = getHorizontalElementByUid(circFound[i].parents[j], true);
				isVertical = false;
			} 
			
			if (p.val == theCircle.cx && isVertical == true) {
				if (oldCV == null) {
					oldCV = p;
					for (var k = 0; k < cParents.length; k++) {
						if (cParents[k] == p.uid) {
							cParents.splice(k, 1);
						}
					}
//					cParents.splice(j, 1);
				}
			}
			
			if (p.val == theCircle.cy && isVertical == false) {
				if (oldCH == null) {
					oldCH = p;
					for (var k = 0; k < cParents.length; k++) {
						if (cParents[k] == p.uid) {
							cParents.splice(k, 1);
						}
					}
//					cParents.splice(j, 1);
				}
			}
			
		}
		
		for (var j = 0; j < cParents.length; j++) {
			
			var isVertical = true;
			var p = getVerticalElementByUid(cParents[j], true);
			if (p == null) {
				p = getHorizontalElementByUid(cParents[j], true);
				isVertical = false;
			} 
			
			if (isVertical == true) {
				if (oldRV == null) {
					oldRV = p;
				}
			}
			
			if (isVertical == false) {
				if (oldRH == null) {
					oldRH = p;
				}
			}
			
		}	
		
		var newCV = null;
		var newCH = null;
		var newRV = null;
		var newRH = null;
		for (var j = 0; j < elementFound.length; j++) {
			if (oldCV != null) {
				if (elementFound[j].uid == oldCV.uid) {
					newCV = elementFound[j];
				}
			}
			
			if (oldCH != null) {
				if (elementFound[j].uid == oldCH.uid) {
					newCH = elementFound[j];
				}
			}
			
			if (oldRV != null) {
				if (elementFound[j].uid == oldRV.uid) {
					newRV = elementFound[j];
				}
			}
			
			if (oldRH != null) {
				if (elementFound[j].uid == oldRH.uid) {
					newRH = elementFound[j];
				}
			}
		}
		
		if (newCV != null) {
			cx = newCV.val;
		}
		
		if (newCH != null) {
			cy = newCH.val;
		}
		
		var RV;
		var RH;
		if (newRV != null) {
			RV = newRV;
		} else {
			RV = oldRV;
		}
		if (newRH != null) {
			RH = newRH;
		} else {
			RH = oldRH;
		}
		
		r = Math.sqrt(Math.pow(cx - RV.val, 2) + Math.pow(cy - RH.val, 2));
		
//		var oldParentFound = [];
//		var newParentFound = [];
//		var oldRParents = [];
//		var oldCParents = [];
//		for (var j = 0; j < elementFound.length; j++) {
//			for (var k = 0; k < circFound[i].parents.length; k++) {
//				
//				var p = getVerticalElementByUid(circFound[i].parents[k]);
//				if (p == null) {
//					p = getHorizontalElementByUid(circFound[i].parents[k]);
//				} 
//				
//				if (p.val == theCircle.cx || p.val == theCircle.cy) {
//					var hasThisLine = false;
//					for (var k = 0; k < oldCParents.length; k++) {
//						if (oldCParents[k].id = p.id) {
//							hasThisLine = true;
//						}
//					}
//					
//					if (hasThisLine == false) {
//						oldCParents.push(p);
//					}
//				} else {
//					oldRParents.push();
//				}
//				
//				if (elementFound[j].uid == circFound[i].parents[k]) {
//					var oldParent = getVerticalElementByUid(circFound[i].parents[k]);
//					if (oldParent == null) {
//						oldParent = getHorizontalElementByUid(circFound[i].parents[k]);
//						oldParentFound.push(oldParent);
//					} else {
//						oldParentFound.push(oldParent);
//					}
//					newParentFound.push(elementFound[j]);
//				}
//			}
//		}
//		
//		if (oldParentFound.length < 1 || newParentFound.length < 1) {
//			console.log("No Parents Moved for the Circle");
//			return;
//		}
//		
//		for (var j = 0; j < oldParentFound.length; j++) {
//			if (oldParentFound[j].val == theCircle.cx || oldParentFound[j].val == theCircle.cy) {
//				if (newParentFound[j].type == 'verticalLine') {
//					cx = theCircle.cx + (newParentFound[j].val - oldParentFound[j].val);
//				} else {
//					cy = theCircle.cy + (newParentFound[j].val - oldParentFound[j].val);
//				}
//			} 
//
//			if (oldParentFound[j].type == 'verticalLine') {
//				var hParents = findCircleParentsByType('horizontalLine', circFound[i])
//				for (var k = 0; k < hParents.length; k++) {
//					var dToCenter = Math.sqrt(Math.pow((cx - oldParentFound[j].val), 2) + Math.pow((cy - hParents[k].val), 2));
//					if (dToCenter == r) {
//						r = Math.sqrt(Math.pow((cx - newParentFound[j].val), 2) + Math.pow((cy - hParents[k].val), 2));
//					}
//				}
//			} else {
//				var vParents = findCircleParentsByType('verticalLine', circFound[i])
//				for (var k = 0; k < vParents.length; k++) {
//					var dToCenter = Math.sqrt(Math.pow((cx - vParents[k].val), 2) + Math.pow((cy - oldParentFound[j].val), 2));
//					if (dToCenter == r) {
//						r = Math.sqrt(Math.pow((cx - vParents[k].val), 2) + Math.pow((cy - newParentFound[j].val), 2));
//					}
//				}
//			}
//		}
		console.log("Radius: " + r);
		shape.attr({cx:cx, cy:cy, r:r});
		
		circFound[i].x1 = cx;
		circFound[i].y1 = cy;
		circFound[i].x2 = RV.val;
		circFound[i].y2 = RH.val;
		circFound[i].r = r;		
	}
}

function toDrawLine() {
	if (drawingStat == 0) {
		drawingStat = 1;
		shape = "line";
	} else if (drawingStat == 1 && shape != "line") {
		drawingStat = 1;
		shape = "line";
	} else {
		drawingStat = 0;
	}
	
}

function toDrawRect() {
	
	if (drawingStat == 0) {
		drawingStat = 1;
		shape = "rect";
	} else if (drawingStat == 1 && shape != "rect") {
		drawingStat = 1;
		shape = "rect";
	} else {
		drawingStat = 0;
	}
}

function drawRect(x, y) {
	var output = "";
	output += "<rect id='rect" + rectNumber + "' x='" + x + "' y='" + y + "' height='0' width='0' style='stroke:rgb(255,0,0);stroke-width:2; fill:none' />";
	var py = document.getElementById("pdsvsvg");
	py.innerHTML += output;
}

function toDrawCirc() {
	
	if (curModel == null) {
		return;
	}
	if (drawingStat == 0) {
		drawingStat = 1;
		shape = "circ";
		changeImage();
	} else if (drawingStat == 1 && shape != "circ") {
		drawingStat = 1;
		shape = "circ";
		changeImage();
	} else {
		drawingStat = 0;
		changeImage();
	}

}

function drawCirc() {
	
	var dx = selectedIntersections[0].x - selectedIntersections[1].x;
	var dy = selectedIntersections[0].y - selectedIntersections[1].y;
	var radius = Math.sqrt((dx * dx) + (dy * dy));
	var output = "";	
	output += "<circle id='circ" + circNumber + "' cx='" + selectedIntersections[0].x + "' cy='" + selectedIntersections[0].y + "' r='" + radius + "' style='stroke:rgb(255,0,0);stroke-width:2; fill:none' stroke-dasharray='10,10'>" 

	var py = document.getElementById("pdsvsvg");
	py.innerHTML += output;
	
	var circId = "circ" + circNumber;
	circs.push({id:circId, cx:selectedIntersections[0].x, cy:selectedIntersections[0].y, r:radius});
	
	circNumber++;
	
	return circId;
	
//	var output = "";
//	output += "<circle id='circ" + circNumber + "' cx='" + x + "' cy='" + y + "' r='0' style='stroke:rgb(255,0,0);stroke-width:2; fill:none' />";
//	
//	var py = document.getElementById("pdsvsvg");
//	py.innerHTML += output;
	
}

function toDrawGrid() {
	
	if (curModel == null) {
		return;
	}
	
	if (drawingStat == 0) {
		drawingStat = 1;
		shape = "grid";
		changeImage();
	} else if (drawingStat == 1 && shape != "grid") {
		drawingStat = 1;
		shape = "grid";
		changeImage();
	} else {
		drawingStat = 0;
		changeImage();
	}
}

function selectLine(event) {
	
	var bound = document.getElementById("pdsvsvg").getBoundingClientRect();
	
	x0 = bound.left;
	y0 = bound.top;
	
	var currentX = event.clientX;
	var currentY = event.clientY;
	
	currentX = currentX - x0;
	currentY = currentY - y0;
	
//	console.log("currentX = " + currentX);
//	console.log("currentY = " + currentY);
	
	for (var i = 0; i < verticalLines.length; i++) {
		if (Math.abs(currentX - verticalLines[i].val) < 6) {			
			if (shape == "ajst" || shape == "edit") {
				if (verticalLines[i].plane == view3D) {
					console.log("find a line");
					var parentLine = null;
					if (verticalLines[i].hasOwnProperty("parent")) {
						parentLine = verticalLines[i].parent;
					}
					
					if (selectedElementId != null) {
//						document.getElementById(selectedElementId).style.stroke = "red";
					}
					selectedElementId = verticalLines[i].id;
//					document.getElementById(selectedElementId).style.stroke = "black";
					
					return {id:verticalLines[i].id, sX:currentX, sY:currentY, type:"vertical", value:verticalLines[i].val, uid: verticalLines[i].uid, angle:90, parent:parentLine};
				}
			} else {
				console.log("find a line");
				var parentLine = null;
				if (verticalLines[i].hasOwnProperty("parent")) {
					parentLine = verticalLines[i].parent;
				}
				
				if (selectedElementId != null) {
//					document.getElementById(selectedElementId).style.stroke = "red";
				}
				selectedElementId = verticalLines[i].id;
//				document.getElementById(selectedElementId).style.stroke = "black";
				
				return {id:verticalLines[i].id, sX:currentX, sY:currentY, type:"vertical", value:verticalLines[i].val, uid: verticalLines[i].uid, angle:90, parent:parentLine};
			}	
//			console.log("find a line");
//			var parentLine = null;
//			if (verticalLines[i].hasOwnProperty("parent")) {
//				parentLine = verticalLines[i].parent;
//			}
//			
//			if (selectedElementId != null) {
////				document.getElementById(selectedElementId).style.stroke = "red";
//			}
//			selectedElementId = verticalLines[i].id;
////			document.getElementById(selectedElementId).style.stroke = "black";
//			
//			return {id:verticalLines[i].id, sX:currentX, sY:currentY, type:"vertical", value:verticalLines[i].val, uid: verticalLines[i].uid, angle:90, parent:parentLine};
		}
	}
	
	for (var i = 0; i < horizontalLines.length; i++) {
		if (Math.abs(currentY - horizontalLines[i].val) < 6) {		
			if (shape == "ajst" || shape == "edit") {
				if (horizontalLines[i].plane == view3D) {
					console.log("find a line");
					var parentLine = null;
					if (horizontalLines[i].hasOwnProperty("parent")) {
						parentLine = horizontalLines[i].parent;
					}
					
					if (selectedElementId != null) {
//						document.getElementById(selectedElementId).style.stroke = "red";
					}
					selectedElementId = horizontalLines[i].id;
//					document.getElementById(selectedElementId).style.stroke = "black";
					
					return {id:horizontalLines[i].id, sX:currentX, sY:currentY, type:"horizontal", value:horizontalLines[i].val, uid: horizontalLines[i].uid, angle:0, parent:parentLine};
				}
			} else {
				console.log("find a line");
				var parentLine = null;
				if (horizontalLines[i].hasOwnProperty("parent")) {
					parentLine = horizontalLines[i].parent;
				}
				
				if (selectedElementId != null) {
//					document.getElementById(selectedElementId).style.stroke = "red";
				}
				selectedElementId = horizontalLines[i].id;
//				document.getElementById(selectedElementId).style.stroke = "black";
				
				return {id:horizontalLines[i].id, sX:currentX, sY:currentY, type:"horizontal", value:horizontalLines[i].val, uid: horizontalLines[i].uid, angle:0, parent:parentLine};
			}			
//			console.log("find a line");
//			var parentLine = null;
//			if (horizontalLines[i].hasOwnProperty("parent")) {
//				parentLine = horizontalLines[i].parent;
//			}
//			
//			if (selectedElementId != null) {
////				document.getElementById(selectedElementId).style.stroke = "red";
//			}
//			selectedElementId = horizontalLines[i].id;
////			document.getElementById(selectedElementId).style.stroke = "black";
//			
//			return {id:horizontalLines[i].id, sX:currentX, sY:currentY, type:"horizontal", value:horizontalLines[i].val, uid: horizontalLines[i].uid, angle:0, parent:parentLine};
		}
	}
	
	for (var i = 0; i < circs.length; i++) {
		
//		var maxError = 12 * (currentX - circs[i].cx) + 12 * (currentY - circs[i].cy) - 72;
//		var minError = -12 * (currentX - circs[i].cx) - 12 * (currentY - circs[i].cy) - 72;
//		if (maxError < minError) {
//			var tmpError = -12 * (currentX - circs[i].cx) - 12 * (currentY - circs[i].cy) - 72;
//			maxError = minError;
//			minError = tmpError;
//		}
		
		var actualValue = Math.pow((currentX - circs[i].cx),2) + Math.pow((currentY - circs[i].cy),2);
		var minRS = Math.pow(circs[i].r-6,2);
		var maxRS = Math.pow(circs[i].r+6,2);
		
		if ((actualValue > minRS) && (actualValue < maxRS)) {
			console.log("find a circle");
			var selectedCircle = {};
			// TODO: need to push parents into selectedCircle
//			if (circs[i].hasOwnProperty("parents")) {
//				selectedCircle = circs[i];
//			}
			selectedCircle = circs[i];
			selectedCircle.type = "circGroup";
			selectedCircle.sX = currentX;
			selectedCircle.sY = currentY;
			
			if (selectedElementId != null) {
//				document.getElementById(selectedElementId).style.stroke = "red";
			}
			selectedElementId = circs[i].id;
//			document.getElementById(selectedElementId).style.stroke = "black";

			return selectedCircle;
		}
	}
	
	return null;
	
};

function drawGrid(line) {
	var output = "";
	
	if (view3D == 'xy') {
		if (line.type == "vertical") {
			output += "<line id='grid_tmp' x1='" + line.value + "' y1='3' x2='" + line.value + "' y2='897' stroke=rgb(0,204,255) stroke-width='2' stroke-dasharray='10,10' />";
		} else {
			output += "<line id='grid_tmp' x1='0%' y1='" + line.value + "' x2='100%' y2='" + line.value + "' stroke=rgb(0,204,255) stroke-width='2' stroke-dasharray='10,10'/>";
		}
	} else if (view3D == 'yz') {
		if (line.type == "vertical") {
			output += "<line id='grid_tmp' x1='" + line.value + "' y1='3' x2='" + line.value + "' y2='897' stroke=rgb(66,244,101) stroke-width='2' stroke-dasharray='10,10' />";
		} else {
			output += "<line id='grid_tmp' x1='0%' y1='" + line.value + "' x2='100%' y2='" + line.value + "' stroke=rgb(66,244,101) stroke-width='2' stroke-dasharray='10,10'/>";
		}
	} else if (view3D == 'xz') {
		if (line.type == "vertical") {
			output += "<line id='grid_tmp' x1='" + line.value + "' y1='3' x2='" + line.value + "' y2='897' stroke=rgb(128,0,128) stroke-width='2' stroke-dasharray='10,10' />";
		} else {
			output += "<line id='grid_tmp' x1='0%' y1='" + line.value + "' x2='100%' y2='" + line.value + "' stroke=rgb(128,0,128) stroke-width='2' stroke-dasharray='10,10'/>";
		}
	}	
//	if (line.type == "vertical") {
//		output += "<line id='grid_tmp' x1='" + line.value + "' y1='3' x2='" + line.value + "' y2='897' stroke=rgb(255,0,0) stroke-width='2' stroke-dasharray='10,10' />";
//	} else {
//		output += "<line id='grid_tmp' x1='0%' y1='" + line.value + "' x2='100%' y2='" + line.value + "' stroke=rgb(255,0,0) stroke-width='2' stroke-dasharray='10,10'/>";
//	}
	var py = document.getElementById("pdsvsvg");
	py.innerHTML += output;
}

function moveLine(selectedLine, diffX, diffY, grid) {
	
	if (selectedLine.type == "vertical") {
		grid.attr({x1:diffX, x2:diffX});
	} else {
		grid.attr({y1:diffY, y2:diffY});
	}
	
}

function toDrawRcfl() {
	
	console.log("to draw rcfl");
	
	if (curModel == null) {
		return;
	}
	
	if (drawingStat == 0) {
		drawingStat = 1;
		shape = "rcfl";
		selectedIntersections = [];
		changeImage();
	} else if (drawingStat == 1 && shape != "rcfl") {
		drawingStat = 1;
		shape = "rcfl";
		selectedIntersections = [];
		changeImage();
	} else {
		drawingStat = 0;
		changeImage();
	}
}

function selectIntersection(event) {
	
	var bound = document.getElementById("pdsvsvg").getBoundingClientRect();
	
	x0 = bound.left;
	y0 = bound.top;
	
	var currentX = event.clientX;
	var currentY = event.clientY;
	
	currentX = currentX - x0;
	currentY = currentY - y0;
	
	console.log("currentX = " + currentX);
	console.log("currentY = " + currentY);
	
	var i, j;
	for (i = 0; i < verticalLines.length; i++) {
		if (Math.abs(currentX - verticalLines[i].val) < 6) {
			break;
		}
	}
	
	for (j = 0; j < horizontalLines.length; j++) {
		if (Math.abs(currentY - horizontalLines[j].val) < 6) {
			break;
		}
	}
	
	if (i < verticalLines.length && j < horizontalLines.length) {
		console.log("find an intersection");
		return {x: verticalLines[i].val, y: horizontalLines[j].val, parent_x: verticalLines[i].uid, parent_y: horizontalLines[j].uid};
	}
	
	return null;
};

function rectFill() {
	
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
	
	var w = x2 - x1;
	var h = y2 - y1;
	
	
	var output = "";
	
	console.log(x1 + "   " + y1);
	
	output += "<rect id='rcfl" + rcflNumber + "' x='" + x1 + "' y='" + y1 + "' width='" + w + "' height='" + h + "' style='fill:blue;stroke:blue;stroke-width:2' fill-opacity='0.5' stroke-opacity='0.5'>";
	
	var py = document.getElementById("pdsvsvg");
	py.innerHTML += output;
	
	var rcflId = "rcfl" + rcflNumber;
	rects.push({id:rcflId, x:x1, y:y1, width:w, height:h});
	
	var parents = [];
	parents.push(selectedIntersections[0].parent_x);
	parents.push(selectedIntersections[0].parent_y);
	parents.push(selectedIntersections[1].parent_x);
	parents.push(selectedIntersections[1].parent_y);
	
	console.log("parents = " + parents);
	
	groupShapes.push({type:"rectGroup", id:'rcfl' + rcflNumber, parents:parents, shapes:[], group: -1});
	
	var pdpv = document.getElementById("pvCysvg");
	
	x1 = x1 - verticalLines[0].val + originDisplay[0];
	y1 = y1 - horizontalLines[0].val + originDisplay[1];
	
	console.log(x1 + "   " + y1);
	
	output = "<rect id='rcfl'" + rcflNumber + "' x='" + x1 + "' y='" + y1 + "' width='" + w + "' height='" + h + "' style='fill:blue;stroke:blue;stroke-width:2' fill-opacity='0.5' stroke-opacity='0.5'>";
	
//	pdpv.innerHTML += output;
	
//	saveShape("rectFill", x1, y1, h, w, null, parentid, absx, absy);
	
	
}

function toDrawCcfl() {
	
	console.log("to draw ccfl");
	
	if (drawingStat == 0) {
		drawingStat = 1;
		shape = "ccfl";
		selectedIntersections = [];
	} else if (drawingStat == 1 && shape != "ccfl") {
		drawingStat = 1;
		shape = "ccfl";
		selectedIntersections = [];
	} else {
		drawingStat = 0;
	}
	
}

function circFill() {
	
	var dx = selectedIntersections[0].x - selectedIntersections[1].x;
	var dy = selectedIntersections[0].y - selectedIntersections[1].y;
	
	var radius = Math.sqrt((dx * dx) + (dy * dy));
	
	
	var output = "";
	
	output += "<circle id='ccfl" + ccflNumber + "' cx='" + selectedIntersections[0].x + "' cy='" + selectedIntersections[0].y + "' r='" + radius + "' style='fill:red;stroke:red;stroke-width:0'>" 
	
	var py = document.getElementById("pdsvsvg");
	py.innerHTML += output;
	
	var ccflId = "ccfl" + ccflNumber;
	circs.push({id:ccflId, cx:selectedIntersections[0].x, cy:selectedIntersections[0].y, r:radius});
	
	ccflNumber++;
	
}

function toMove() {
	
	console.log("to move");
	
	if (curModel == null) {
		return;
	}
	
	if (drawingStat == 0) {
		drawingStat = 1;
		shape = "move";
		selectedIntersections = [];
		changeImage();
	} else if (drawingStat == 1 && shape != "move") {
		drawingStat = 1;
		shape = "move";
		selectedIntersections = [];
		changeImage();
	} else {
		drawingStat = 0;
		changeImage();
	}
	
}

function transform(event) {
	
	x0 = event.clientX;
	y0 = event.clientY;
	
	transformVerticalLine(event);
	transformHorizontalLine(event);
	transformVerticalText(event);
	transformHorizontalText(event);
	transformText(event);
	transformRect(event);
	transformCirc(event);
	transformLine(event);
	transformCircCntr(event);
//	transformVerticalBggds();
//	transformHorizontalBggds();
	var verticalLineId = verticalLines[0].id;
	var verticalLine = $('#' + verticalLineId);
	var curX0 = Number(verticalLine.attr('x1'));
	
	var horizontalLineId = horizontalLines[0].id;
	var horizontalLine = $('#' + horizontalLineId);
	
	var curY0 = Number(horizontalLine.attr('y1'));
	
	redrawBggd(curX0, curY0);
	
}

function transformCircCntr(event) {
	x0 = event.clientX;
	y0 = event.clientY;
	for (var i = 0; i < circCons.length; i++) {
		
		var circCntrId = circCons[i].id;
		var circCntr = $('#' + circCntrId);
		
		var diffX = event.clientX - startX;
		var diffY = event.clientY - startY;
		
		var new_x1 = Number(circCons[i].x1) + diffX;
		var new_y1 = Number(circCons[i].y1) + diffY;
		var new_x2 = Number(circCons[i].x2) + diffX;
		var new_y2 = Number(circCons[i].y2) + diffY;
		
		var new_d;
		if (circCons[i].largeArcFlag == false) {
			new_d = 'M' + new_x1 + ' ' + new_y1 + ' A ' + circCons[i].r + ' ' + circCons[i].r + ' 0 0 0 ' + new_x2 + ' ' + new_y2;
//			if (circCons[i].sweepFlag == false) {
//				new_d = 'M' + new_x1 + ' ' + new_y1 + ' A ' + circCons[i].r + ' ' + circCons[i].r + ' 0 0 0 ' + new_x2 + ' ' + new_y2;
//			} else {
//				new_d = 'M' + new_x1 + ' ' + new_y1 + ' A ' + circCons[i].r + ' ' + circCons[i].r + ' 0 0 1 ' + new_x2 + ' ' + new_y2;
//			}
		} else {
			new_d = 'M' + new_x1 + ' ' + new_y1 + ' A ' + circCons[i].r + ' ' + circCons[i].r + ' 0 1 0 ' + new_x2 + ' ' + new_y2;
//			if (circCons[i].sweepFlag == false) {
//				new_d = 'M' + new_x1 + ' ' + new_y1 + ' A ' + circCons[i].r + ' ' + circCons[i].r + ' 0 1 0 ' + new_x2 + ' ' + new_y2;
//			} else {
//				new_d = 'M' + new_x1 + ' ' + new_y1 + ' A ' + circCons[i].r + ' ' + circCons[i].r + ' 0 1 1 ' + new_x2 + ' ' + new_y2;
//			}
		}
		
		circCntr.attr({d:new_d});
		var tmpCoords = {x1:new_x1, y1:new_y1, x2:new_x2, y2:new_y2};
		tmpCircCntrsForMove[circCntrId] = tmpCoords;
//		circCons[i].x1 = new_x1;
//		circCons[i].y1 = new_y1;
//		circCons[i].x2 = new_x2;
//		circCons[i].y2 = new_y2;
			
	}
}

function transformVerticalLine(event) {
	
	x0 = event.clientX;
	y0 = event.clientY;
	
	for (var i = 0; i < verticalLines.length; i++) {
		
		var gridId = verticalLines[i].id;
		var grid = $('#' + gridId);
		
		var diffX = event.clientX - startX;
		var diffY = event.clientY - startY;
		
		var new_x = Number(verticalLines[i].val) + diffX;
		
		grid.attr({x1:new_x, x2:new_x});
			
	}
}

function updateVerticalLines() {
	
	for (var i = 0; i < verticalLines.length; i++) {
		
		var gridId = verticalLines[i].id;
		var grid = $('#' + gridId);
		var x_coor = grid.attr('x1');
		verticalLines[i].val = Number(x_coor);
	}
}

function transformHorizontalLine(event) {
	
	x0 = event.clientX;
	y0 = event.clientY;
	
	for (var i = 0; i < horizontalLines.length; i++) {
		
		var gridId = horizontalLines[i].id;
		var grid = $('#' + gridId);
		
		var diffX = event.clientX - startX;
		var diffY = event.clientY - startY;
		
		var new_y = horizontalLines[i].val + diffY;		
		grid.attr({y1:new_y, y2:new_y});
			
	}
}

function updateHorizontalLines() {
	
	for (var i = 0; i < horizontalLines.length; i++) {
		
		var gridId = horizontalLines[i].id;
		var grid = $('#' + gridId);
		var y_coor = grid.attr('y1');
		horizontalLines[i].val = Number(y_coor);
	}
}

function transformVerticalText(event) {
	
	x0 = event.clientX;
	y0 = event.clientY;
	
	for (var i = 0; i < verticalTexts.length; i++) {
		
		var textId = verticalTexts[i].id;
		var text = $('#' + textId);
		
		var diffX = event.clientX - startX;
		var diffY = event.clientY - startY;
		
		var new_x = verticalTexts[i].val + diffX;
		
		
		text.attr({x:new_x});
			
	}
	
}


function updateVerticalTexts() {
	
	for (var i = 0; i < verticalTexts.length; i++) {
		
		var textId = verticalTexts[i].id;
		var text = $('#' + textId);
		var x_coor = text.attr('x');
		verticalTexts[i].val = Number(x_coor);
	}
	
}

function transformHorizontalText(event) {
	
	x0 = event.clientX;
	y0 = event.clientY;
	
	for (var i = 0; i < horizontalTexts.length; i++) {
		
		var textId = horizontalTexts[i].id;
		var text = $('#' + textId);
		
		var diffX = event.clientX - startX;
		var diffY = event.clientY - startY;
		
		var new_y = horizontalTexts[i].val + diffY;		
		text.attr({y:new_y});
			
	}
}

function updateHorizontalTexts() {
	
	for (var i = 0; i < horizontalTexts.length; i++) {
		
		var textId = horizontalTexts[i].id;
		var text = $('#' + textId);
		var y_coor = text.attr('y');
		horizontalTexts[i].val = Number(y_coor);
	}
}

function transformText(event) {
	
	x0 = event.clientX;
	y0 = event.clientY;
	
	
	for (var i = 0; i < texts.length; i++) {
		
		var textId = texts[i].id;
		var text = $('#' + textId);
		
		var diffX = event.clientX - startX;
		var diffY = event.clientY - startY;
		
		var new_x = texts[i].x + diffX;	
		var new_y = texts[i].y + diffY;		
		text.attr({x:new_x, y:new_y});
			
	}
	
	for (var i = 0; i < textsInOtherPlanes.length; i++) {
		
		var textId = textsInOtherPlanes[i].id;
		var text = $('#' + textId);
		
		var diffX = event.clientX - startX;
		var diffY = event.clientY - startY;
		
		var new_x = textsInOtherPlanes[i].x + diffX;	
		var new_y = textsInOtherPlanes[i].y + diffY;		
		text.attr({x:new_x, y:new_y});
			
	}
	
}

function updateTexts() {
	
	for (var i = 0; i < texts.length; i++) {
		
		var textId = texts[i].id;
		var text = $('#' + textId);
		var x_coor = text.attr('x');
		var y_coor = text.attr('y');
		texts[i].x = Number(x_coor);
		texts[i].y = Number(y_coor);
	}
}

function transformRect(event) {
	
	x0 = event.clientX;
	y0 = event.clientY;
	
	
	for (var i = 0; i < rects.length; i++) {
		
		var rectId = rects[i].id;
		var rect = $('#' + rectId);
		
		var diffX = event.clientX - startX;
		var diffY = event.clientY - startY;
		
		var new_x = rects[i].x + diffX;	
		var new_y = rects[i].y + diffY;		
		rect.attr({x:new_x, y:new_y});
			
	}
}

function updateRects() {
	
	for (var i = 0; i < rects.length; i++) {
		
		var rectId = rects[i].id;
		var rect = $('#' + rectId);
		var x_coor = rect.attr('x');
		var y_coor = rect.attr('y');
		rects[i].x = Number(x_coor);
		rects[i].y = Number(y_coor);
	}
}

function transformCirc(event) {
	
	
	x0 = event.clientX;
	y0 = event.clientY;
	
	for (var i = 0; i < circs.length; i++) {
		
		var circId = circs[i].id;
		var circ = $('#' + circId);
		
		var diffX = event.clientX - startX;
		var diffY = event.clientY - startY;
		
		var new_x = circs[i].cx + diffX;	
		var new_y = circs[i].cy + diffY;		
		circ.attr({cx:new_x, cy:new_y});
			
	}
}

function updateCircs() {
	
	for (var i = 0; i < circs.length; i++) {
		
		var circId = circs[i].id;
		var circ = $('#' + circId);
		var x_coor = circ.attr('cx');
		var y_coor = circ.attr('cy');
		circs[i].cx = Number(x_coor);
		circs[i].cy = Number(y_coor);
	}
}

function updateCircCntrs() {
	
	for (var i = 0; i < circCons.length; i++) {
		
		tmpCircCntrsForMove[circCons[i].id]
		
		var ccId = circCons[i].id;
		var cc = $('#' + ccId);
		
		circCons[i].x1 = tmpCircCntrsForMove[circCons[i].id].x1
		circCons[i].y1 = tmpCircCntrsForMove[circCons[i].id].y1;
		circCons[i].x2 = tmpCircCntrsForMove[circCons[i].id].x2;
		circCons[i].y2 = tmpCircCntrsForMove[circCons[i].id].y2;
	}
}

function transformLine(event) {
	
	x0 = event.clientX;
	y0 = event.clientY;
	
	for (var i = 0; i < lines.length; i++) {
		
		var lineId = lines[i].id;
		var line = $('#' + lineId);
		
		var diffX = event.clientX - startX;
		var diffY = event.clientY - startY;
		
		var new_x1 = lines[i].x1 + diffX;	
		var new_y1 = lines[i].y1 + diffY;
		
		var new_x2 = lines[i].x2 + diffX;	
		var new_y2 = lines[i].y2 + diffY;
		
		
		line.attr({x1:new_x1, y1:new_y1, x2:new_x2, y2:new_y2});
			
	}
	
	for (var i = 0; i < linesInOtherPlanes.length; i++) {
		
		var lineId = linesInOtherPlanes[i].id;
		var line = $('#' + lineId);
		
		var diffX = event.clientX - startX;
		var diffY = event.clientY - startY;
		
		var new_x1 = linesInOtherPlanes[i].x1 + diffX;	
		var new_y1 = linesInOtherPlanes[i].y1 + diffY;
		
		var new_x2 = linesInOtherPlanes[i].x2 + diffX;	
		var new_y2 = linesInOtherPlanes[i].y2 + diffY;
		
		
		line.attr({x1:new_x1, y1:new_y1, x2:new_x2, y2:new_y2});
			
	}
	
}

function updateLines() {
	
	for (var i = 0; i < lines.length; i++) {
		
		var lineId = lines[i].id;
		var line = $('#' + lineId);
		var x1_coor = line.attr('x1');
		var y1_coor = line.attr('y1');
		var x2_coor = line.attr('x2');
		var y2_coor = line.attr('y2');
		lines[i].x1 = Number(x1_coor);
		lines[i].y1 = Number(y1_coor);
		lines[i].x2 = Number(x2_coor);
		lines[i].y2 = Number(y2_coor);
	}
}

function transformVerticalBggds(event) {
	
	x0 = event.clientX;
	y0 = event.clientY;
	
	for (var i = 0; i < verticalBggds.length; i++) {
		
		var bggdId = verticalBggds[i].id;
		var bggd = $('#' + bggdId);
		
		var diffX = event.clientX - startX;
		var diffY = event.clientY - startY;
		
		var new_x = verticalBggds[i].val + diffX;
		
		
		bggd.attr({x1:new_x, x2:new_x});
			
	}
}

function updateVerticalBggds() {
	
	for (var i = 0; i < verticalBggds.length; i++) {
		
		var bggdId = verticalBggds[i].id;
		var bggd = $('#' + bggdId);
		var x_coor = bggd.attr('x1');
		verticalBggds[i].val = Number(x_coor);
	}
}

function transformHorizontalBggds(event) {
	
	x0 = event.clientX;
	y0 = event.clientY;
	
	for (var i = 0; i < horizontalBggds.length; i++) {
		
		var bggdId = horizontalBggds[i].id;
		var bggd = $('#' + bggdId);
		
		var diffX = event.clientX - startX;
		var diffY = event.clientY - startY;
		
		var new_y = horizontalBggds[i].val + diffY;		
		bggd.attr({y1:new_y, y2:new_y});
			
	}
}

function updateHorizontalBggds() {
	
	for (var i = 0; i < horizontalBggds.length; i++) {
		
		var bggdId = horizontalBggds[i].id;
		var bggd = $('#' + bggdId);
		var y_coor = bggd.attr('y1');
		horizontalBggds[i].val = Number(y_coor);
	}
}

function toZoomIn() {
	
	console.log("to zoom in");
	
	if (curModel == null) {
		return;
	}
	
	if (drawingStat == 0) {
		drawingStat = 1;
		shape = "zmin";
		changeImage();
	} else if (drawingStat == 1 && shape != "zmin") {
		drawingStat = 1;
		shape = "zmin";
		changeImage();
	} else {
		drawingStat = 0;
		changeImage();
	}
	
}

function toZoomOut() {
	
	console.log("to zoom out");
	
	if (curModel == null) {
		return;
	}
	
	if (drawingStat == 0) {
		drawingStat = 1;
		
		shape = "zmou";
		changeImage();
	} else if (drawingStat == 1 && shape != "zmou") {
		drawingStat = 1;
		shape = "zmou";
		changeImage();
	} else {
		drawingStat = 0;
		changeImage();
	}
	
}

function zoomIn() {
	
	console.log("start to zoom");
	
	if (zoomLevel < zoomLevels.length - 1) {
		var ratio = zoomLevels[zoomLevel + 1] / zoomLevels[zoomLevel];
		zoomLevel++;
		zoomLine(ratio, "pdsvsvg");
		zoomVerticalLine(ratio, "pdsvsvg");
		zoomHorizontalLine(ratio, "pdsvsvg");
		zoomVerticalText(ratio, "pdsvsvg");
		zoomHorizontalText(ratio, "pdsvsvg");
		zoomText(ratio, "pdsvsvg");
		zoomRect(ratio, "pdsvsvg");
		zoomCirc(ratio, "pdsvsvg");
		zoomCircCntr(ratio, "pdsvsvg");
//		zoomVerticalBggd(ratio);
//		zoomHorizontalBggd(ratio);
		redrawBggd(null, null);
	}
	
	
}

function zoomOut() {
	
	console.log("start to zoom out");
	
	if (zoomLevel > 0) {
		var ratio = zoomLevels[zoomLevel - 1] / zoomLevels[zoomLevel];
		zoomLevel--;
		zoomLine(ratio, "pdsvsvg");
		zoomVerticalLine(ratio, "pdsvsvg");
		zoomHorizontalLine(ratio, "pdsvsvg");
		zoomVerticalText(ratio, "pdsvsvg");
		zoomHorizontalText(ratio, "pdsvsvg");
		zoomText(ratio, "pdsvsvg");
		zoomRect(ratio, "pdsvsvg");
		zoomCirc(ratio, "pdsvsvg");
		zoomCircCntr(ratio, "pdsvsvg");
//		zoomVerticalBggd(ratio);
//		zoomHorizontalBggd(ratio);
		redrawBggd(null, null);
	}
	
	
}

function zoomCircCntr(ratio, divId) {
	
	var bound = document.getElementById(divId).getBoundingClientRect();
	
	var xknot = startX - bound.left;
	var yknot = startY - bound.top;
		
	for (var i = 0; i < circCons.length; i++) {
		
		var circCntrId = circCons[i].id;
		var circCntr = $('#' + circCntrId);
		
		var new_x1 = ratio * (circCons[i].x1 - xknot) + xknot;
		var new_y1 = ratio * (circCons[i].y1 - yknot) + yknot;
		var new_x2 = ratio * (circCons[i].x2 - xknot) + xknot;
		var new_y2 = ratio * (circCons[i].y2 - yknot) + yknot;
		var new_r = ratio * circCons[i].r;
		
		var new_d;
		if (circCons[i].largeArcFlag == false) {
			new_d = 'M' + new_x1 + ' ' + new_y1 + ' A ' + new_r + ' ' + new_r + ' 0 0 0 ' + new_x2 + ' ' + new_y2;
//			if (circCons[i].sweepFlag == false) {
//				new_d = 'M' + new_x1 + ' ' + new_y1 + ' A ' + new_r + ' ' + new_r + ' 0 0 0 ' + new_x2 + ' ' + new_y2;
//			} else {
//				new_d = 'M' + new_x1 + ' ' + new_y1 + ' A ' + new_r + ' ' + new_r + ' 0 0 1 ' + new_x2 + ' ' + new_y2;
//			}
		} else {
			new_d = 'M' + new_x1 + ' ' + new_y1 + ' A ' + new_r + ' ' + new_r + ' 0 1 0 ' + new_x2 + ' ' + new_y2;
//			if (circCons[i].sweepFlag == false) {
//				new_d = 'M' + new_x1 + ' ' + new_y1 + ' A ' + new_r + ' ' + new_r + ' 0 1 0 ' + new_x2 + ' ' + new_y2;
//			} else {
//				new_d = 'M' + new_x1 + ' ' + new_y1 + ' A ' + new_r + ' ' + new_r + ' 0 1 1 ' + new_x2 + ' ' + new_y2;
//			}
		}
		
		circCntr.attr({d:new_d});
		
		circCons[i].x1 = new_x1;
		circCons[i].y1 = new_y1;
		circCons[i].x2 = new_x2;
		circCons[i].y2 = new_y2;
		circCons[i].r = new_r;
			
	}
	
}

function zoomLine(ratio, divId) {
	
	var bound = document.getElementById(divId).getBoundingClientRect();
	
	var xknot = startX - bound.left;
	var yknot = startY - bound.top;
		
	for (var i = 0; i < lines.length; i++) {
		
		var lineId = lines[i].id;
		var line = $('#' + lineId);
		
		console.log("lineId = " + lineId);
		
		var new_x1 = ratio * (lines[i].x1 - xknot) + xknot;
		var new_y1 = ratio * (lines[i].y1 - yknot) + yknot;
		var new_x2 = ratio * (lines[i].x2 - xknot) + xknot;
		var new_y2 = ratio * (lines[i].y2 - yknot) + yknot;
		line.attr({x1:new_x1, y1:new_y1, x2:new_x2, y2:new_y2});
		lines[i].x1 = new_x1;
		lines[i].y1 = new_y1;
		lines[i].x2 = new_x2;
		lines[i].y2 = new_y2;
			
	}
	
	for (var i = 0; i < linesInOtherPlanes.length; i++) {
		
		var lineId = linesInOtherPlanes[i].id;
		var line = $('#' + lineId);
		
		console.log("lineId = " + lineId);
		
		var new_x1 = ratio * (linesInOtherPlanes[i].x1 - xknot) + xknot;
		var new_y1 = ratio * (linesInOtherPlanes[i].y1 - yknot) + yknot;
		var new_x2 = ratio * (linesInOtherPlanes[i].x2 - xknot) + xknot;
		var new_y2 = ratio * (linesInOtherPlanes[i].y2 - yknot) + yknot;
		line.attr({x1:new_x1, y1:new_y1, x2:new_x2, y2:new_y2});
		linesInOtherPlanes[i].x1 = new_x1;
		linesInOtherPlanes[i].y1 = new_y1;
		linesInOtherPlanes[i].x2 = new_x2;
		linesInOtherPlanes[i].y2 = new_y2;
		
	}
	
}

function zoomVerticalLine(ratio, divId) {
	
	var bound = document.getElementById(divId).getBoundingClientRect();
	
	var xknot = startX - bound.left;
	var yknot = startY - bound.top;
		
	for (var i = 0; i < verticalLines.length; i++) {
		
		var lineId = verticalLines[i].id;
		var line = $('#' + lineId);
		
		console.log("lineId = " + lineId);
		
		var new_x = ratio * (verticalLines[i].val - xknot) + xknot;
		line.attr({x1:new_x, x2:new_x});
		verticalLines[i].val = new_x;
			
	}
	
}


function zoomHorizontalLine(ratio, divId) {
	
	var bound = document.getElementById(divId).getBoundingClientRect();
	
	var xknot = startX - bound.left;
	var yknot = startY - bound.top;
		
	for (var i = 0; i < horizontalLines.length; i++) {
		
		var lineId = horizontalLines[i].id;
		var line = $('#' + lineId);
		
		console.log("lineId = " + lineId);
		
		var new_y = ratio * (horizontalLines[i].val - yknot) + yknot;
		line.attr({y1:new_y, y2:new_y});
		horizontalLines[i].val = new_y;
			
	}
	
}

function zoomVerticalText(ratio, divId) {
	var bound = document.getElementById(divId).getBoundingClientRect();
	
	var xknot = startX - bound.left;
	var yknot = startY - bound.top;
	
	var textId = verticalTexts[0].id;
	var text = $('#' + textId);
	
	console.log("textId = " + textId);
	
	var new_x = verticalLines[0].val - 25;
	text.attr({x:new_x});
	verticalTexts[0].val = new_x;
		
	for (var i = 1; i < verticalTexts.length; i++) {
		
		var textId = verticalTexts[i].id;
		var text = $('#' + textId);
		
		console.log("textId = " + textId);
		
		var new_x = ratio * (verticalTexts[i].val - xknot) + xknot;
		text.attr({x:new_x});
		verticalTexts[i].val = new_x;
			
	}
}

function zoomHorizontalText(ratio, divId) {
	
	var bound = document.getElementById(divId).getBoundingClientRect();
	
	var xknot = startX - bound.left;
	var yknot = startY - bound.top;
	
	var textId = horizontalTexts[0].id;
	var text = $('#' + textId);
	
	console.log("lineId = " + textId);
	
	var new_y = horizontalLines[0].val + 22;
	text.attr({y:new_y});
	horizontalTexts[0].val = new_y;
	
		
	for (var i = 1; i < horizontalTexts.length; i++) {
		
		var textId = horizontalTexts[i].id;
		var text = $('#' + textId);
		
		console.log("lineId = " + textId);
		
		var new_y = ratio * (horizontalTexts[i].val - yknot) + yknot;
		text.attr({y:new_y});
		horizontalTexts[i].val = new_y;
			
	}
	
}

function zoomText(ratio, divId) {
	
	var bound = document.getElementById(divId).getBoundingClientRect();
	
	var xknot = startX - bound.left;
	var yknot = startY - bound.top;
	
	var textId = texts[0].id;
	var text = $('#' + textId);
	
	var new_x = verticalLines[0].val - 55;
	var new_y = horizontalLines[0].val + 22;
	
	text.attr({x:new_x, y:new_y});
	texts[0].x = new_x;
	texts[0].y = new_y;
	
	for (var i = 1; i < texts.length; i++) {
		
		var textId = texts[i].id;
		var text = $('#' + textId);
		
		console.log("textId = " + textId);
		
		var new_x = ratio * (texts[i].x - xknot) + xknot;
		var new_y = ratio * (texts[i].y - yknot) + yknot;
		text.attr({x:new_x, y:new_y});
		texts[i].x = new_x;
		texts[i].y = new_y;
			
	}
	
	for (var i = 0; i < textsInOtherPlanes.length; i++)  {
		
		var textId = textsInOtherPlanes[i].id;
		var text = $('#' + textId);
		
		console.log("textId = " + textId);
		
		var new_x = ratio * (textsInOtherPlanes[i].x - xknot) + xknot;
		var new_y = ratio * (textsInOtherPlanes[i].y - yknot) + yknot;
		text.attr({x:new_x, y:new_y});
		textsInOtherPlanes[i].x = new_x;
		textsInOtherPlanes[i].y = new_y;
		
	}
	
}

function zoomRect(ratio, divId) {
	
	var bound = document.getElementById(divId).getBoundingClientRect();
	
	var xknot = startX - bound.left;
	var yknot = startY - bound.top;
		
	for (var i = 0; i < rects.length; i++) {
		
		var rectId = rects[i].id;
		var rect = $('#' + rectId);
		
		console.log("lineId = " + rectId);
		
		var new_x = ratio * (rects[i].x - xknot) + xknot;
		var new_y = ratio * (rects[i].y - yknot) + yknot;
		var new_h = ratio * rects[i].height;
		var new_w = ratio * rects[i].width;
		
		rect.attr({x:new_x, y:new_y, height:new_h, width:new_w});
		rects[i].x = new_x;
		rects[i].y = new_y;
		rects[i].height = new_h;
		rects[i].width = new_w;
			
	}
	
}

function zoomCirc(ratio, divId) {
	
	var bound = document.getElementById(divId).getBoundingClientRect();
	
	var xknot = startX - bound.left;
	var yknot = startY - bound.top;
		
	for (var i = 0; i < circs.length; i++) {
		
		var circId = circs[i].id;
		var circ = $('#' + circId);
		
		console.log("circId = " + circId);
		
		var new_x = ratio * (circs[i].cx - xknot) + xknot;
		var new_y = ratio * (circs[i].cy - yknot) + yknot;
		var new_r = ratio * circs[i].r;
		
		circ.attr({cx:new_x, cy:new_y, r:new_r});
		circs[i].cx = new_x;
		circs[i].cy = new_y;
		circs[i].r = new_r;
			
	}
	
}


function selectElement(x_coor, y_coor) {
	
	for (var i = 1; i < verticalLines.length; i++) {
		if (Math.abs(x_coor - verticalLines[i].val) < 5) {
			
			if (shape == "ajst" || shape == "edit") {
				if (verticalLines[i].plane == view3D) {
					console.log("find a vertical line!!!");
					
					elementFound = [];
					
					console.log("relpos = " + getVerticalRelativePosition(verticalLines[i]));
					
					elementFound.push({type: 'verticalLine', id: verticalLines[i].id, sn: i, uid: verticalLines[i].uid, parent: verticalLines[i].parent, relpos: getVerticalRelativePosition(verticalLines[i]), val: verticalLines[i].val});
					
					elementFound = elementFound.concat(getAllChildrenVerticalLines(elementFound));
				}
			} else {
				console.log("find a vertical line!!!");
				
				elementFound = [];
				
				console.log("relpos = " + getVerticalRelativePosition(verticalLines[i]));
				
				elementFound.push({type: 'verticalLine', id: verticalLines[i].id, sn: i, uid: verticalLines[i].uid, parent: verticalLines[i].parent, relpos: getVerticalRelativePosition(verticalLines[i]), val: verticalLines[i].val});
				
				elementFound = elementFound.concat(getAllChildrenVerticalLines(elementFound));
			}			
//			console.log("find a vertical line!!!");
//			
//			elementFound = [];
//			
//			console.log("relpos = " + getVerticalRelativePosition(verticalLines[i]));
//			
//			elementFound.push({type: 'verticalLine', id: verticalLines[i].id, sn: i, uid: verticalLines[i].uid, parent: verticalLines[i].parent, relpos: getVerticalRelativePosition(verticalLines[i]), val: verticalLines[i].val});
//			
//			elementFound = elementFound.concat(getAllChildrenVerticalLines(elementFound));		
		}
	}
	
	for (var i = 1; i < horizontalLines.length; i++) {
		if (Math.abs(y_coor - horizontalLines[i].val) < 5) {			
			if (shape == "ajst" || shape == "edit") {
				if (horizontalLines[i].plane == view3D) {
					console.log("find a horizontal line!!!");
					
					elementFound = [];
					
					elementFound.push({type: 'horizontalLine', id: horizontalLines[i].id, sn: i, uid: horizontalLines[i].uid, parent: horizontalLines[i].parent, relpos: getHorizontalRelativePosition(horizontalLines[i]), val: horizontalLines[i].val});
					
					elementFound = elementFound.concat(getAllChildrenHorizontalLines(elementFound));
				}			
			} else {
				console.log("find a horizontal line!!!");
				
				elementFound = [];
				
				elementFound.push({type: 'horizontalLine', id: horizontalLines[i].id, sn: i, uid: horizontalLines[i].uid, parent: horizontalLines[i].parent, relpos: getHorizontalRelativePosition(horizontalLines[i]), val: horizontalLines[i].val});
				
				elementFound = elementFound.concat(getAllChildrenHorizontalLines(elementFound));
			}			
//			console.log("find a horizontal line!!!");
//			
//			elementFound = [];
//			
//			elementFound.push({type: 'horizontalLine', id: horizontalLines[i].id, sn: i, uid: horizontalLines[i].uid, parent: horizontalLines[i].parent, relpos: getHorizontalRelativePosition(horizontalLines[i]), val: horizontalLines[i].val});
//			
//			elementFound = elementFound.concat(getAllChildrenHorizontalLines(elementFound));
		}
	}
		
}

function toAdjust() {
	
	console.log("to adjust");
	
	if (curModel == null) {
		return;
	}
	
	if (drawingStat == 0) {
		
		drawingStat = 1;
		shape = "ajst";
		changeImage();
	} else if (drawingStat == 1 && shape != "ajst") {
		drawingStat = 1;
		shape = "ajst";
		changeImage();
	} else {
		drawingStat = 0;
		changeImage();
	}
	
}

function zoomVerticalBggd(ratio, divId) {
	
	var bound = document.getElementById(divId).getBoundingClientRect();
	
	var xknot = startX - bound.left;
	var yknot = startY - bound.top;
		
	for (var i = 0; i < verticalBggds.length; i++) {
		
		var lineId = verticalBggds[i].id;
		var line = $('#' + lineId);
		
		console.log("lineId = " + lineId);
		
		var new_x = ratio * (verticalBggds[i].val - xknot) + xknot;
		line.attr({x1:new_x, x2:new_x});
		verticalBggds[i].val = new_x;
			
	}
	
}


function zoomHorizontalBggd(ratio, divId) {
	
	var bound = document.getElementById(divId).getBoundingClientRect();
	
	var xknot = startX - bound.left;
	var yknot = startY - bound.top;
		
	for (var i = 0; i < horizontalBggds.length; i++) {
		
		var lineId = horizontalBggds[i].id;
		var line = $('#' + lineId);
		
		console.log("lineId = " + lineId);
		
		var new_y = ratio * (horizontalBggds[i].val - yknot) + yknot;
		line.attr({y1:new_y, y2:new_y});
		horizontalBggds[i].val = new_y;
			
	}
	
}

function redrawBggd(curX0, curY0) {
	
	var bound;
	if (isPartView == false) {
		bound = document.getElementById("pdsvsvg").getBoundingClientRect();
	} else {
		bound = document.getElementById("pdpvsvg").getBoundingClientRect();
	}
//	var bound = document.getElementById("pdsvsvg").getBoundingClientRect();
		
	for (var i = 0; i < verticalBggds.length; i++) {
		var id = '#' + verticalBggds[i].id;
		
		$(id).remove();
	}
	
	for (var i = 0; i < horizontalBggds.length; i++) {
		var id = '#' + horizontalBggds[i].id;
		
		$(id).remove();
	}
	
	var curSpacing = spacing * gridZoomLevels[zoomLevel];
	
	verticalBggds = [];
	horizontalBggds = [];
	
	var canvas;
	if (isPartView == false) {
		canvas = document.getElementById("pdsvsvg");
	} else {
		canvas = document.getElementById("pdpvsvg");
	}
//	var canvas = document.getElementById("pdsvsvg");
	
	var xknot;
	var yknot;
	
	if (curX0 == null || curY0 == null) {
		xknot = verticalLines[0].val;
		yknot = horizontalLines[0].val;
	} else {
		xknot = curX0;
		yknot = curY0;
	}
	
	var firstX = -(Math.round(xknot / curSpacing) + 1) * curSpacing + xknot;
	var firstY = -(Math.round(yknot / curSpacing) + 1) * curSpacing + yknot;
	
	var n = 0;
//	var limit1 = (bound.right - bound.left) / curSpacing + 1;  // AL: there is a better way
//	var limit2 = (bound.bottom - bound.top) / curSpacing + 1;
//	
//	var limit;
//	if (limit1 > limit2) {
//		limit = limit1;
//	} else {
//		limit = limit2;
//	}
	
	var limit = Math.round(1000 / curSpacing) + 1
	
	if (isPartView == false) {
		for (var i = -limit; i <= 2 * limit; i++) {
			canvas.innerHTML += "<line id='bggd" + (2 * n) + "' x1='0%' y1='" + (firstY + i * curSpacing) + "' x2='100%' y2='" + (firstY + i * curSpacing) + "' style='stroke:rgb(128,128,128);stroke-width:0.4' stroke-dasharray='5,5'>";
			canvas.innerHTML += "<line id='bggd" + (2 * n + 1) + "' x1='" + (firstX + i * curSpacing) + "' y1='3' x2='" + (firstX + i * curSpacing) + "' y2='897' style='stroke:rgb(128,128,128);stroke-width:0.4' stroke-dasharray='5,5'>";
			verticalBggds.push({id: 'bggd' + (2 * n + 1), val: Number(firstX + i * curSpacing)});
			horizontalBggds.push({id: 'bggd' + (2 * n), val: Number(firstY + i * curSpacing)});
			n++;
		}
	} else {
		for (var i = -limit; i <= 2 * limit; i++) {
			canvas.innerHTML += "<line id='bggd" + (2 * n) + "_pv' x1='0%' y1='" + (firstY + i * curSpacing) + "' x2='100%' y2='" + (firstY + i * curSpacing) + "' style='stroke:rgb(128,128,128);stroke-width:0.4' stroke-dasharray='5,5'>";
			canvas.innerHTML += "<line id='bggd" + (2 * n + 1) + "_pv' x1='" + (firstX + i * curSpacing) + "' y1='3' x2='" + (firstX + i * curSpacing) + "' y2='897' style='stroke:rgb(128,128,128);stroke-width:0.4' stroke-dasharray='5,5'>";
			verticalBggds.push({id: 'bggd' + (2 * n + 1) + '_pv', val: Number(firstX + i * curSpacing)});
			horizontalBggds.push({id: 'bggd' + (2 * n) + '_pv', val: Number(firstY + i * curSpacing)});
			n++;
		}
	}
//	for (var i = -limit; i <= 2 * limit; i++) {
//		canvas.innerHTML += "<line id='bggd" + (2 * n) + "' x1='0%' y1='" + (firstY + i * curSpacing) + "' x2='100%' y2='" + (firstY + i * curSpacing) + "' style='stroke:rgb(128,128,128);stroke-width:0.4' stroke-dasharray='5,5'>";
//		canvas.innerHTML += "<line id='bggd" + (2 * n + 1) + "' x1='" + (firstX + i * curSpacing) + "' y1='3' x2='" + (firstX + i * curSpacing) + "' y2='897' style='stroke:rgb(128,128,128);stroke-width:0.4' stroke-dasharray='5,5'>";
//		verticalBggds.push({id: 'bggd' + (2 * n + 1), val: Number(firstX + i * curSpacing)});
//		horizontalBggds.push({id: 'bggd' + (2 * n), val: Number(firstY + i * curSpacing)});
//		n++;
//	}
	
}

function redrawBggdInPartView(curX0, curY0) {
	
	var bound = document.getElementById("pdpvsvg").getBoundingClientRect();
	
		
	for (var i = 0; i < verticalBggds.length; i++) {
		var id = '#' + verticalBggds[i].id;
		
		$(id).remove();
	}
	
	for (var i = 0; i < horizontalBggds.length; i++) {
		var id = '#' + horizontalBggds[i].id;
		
		$(id).remove();
	}
	
	var curSpacing = spacing * gridZoomLevels[zoomLevel];
	
	verticalBggds = [];
	horizontalBggds = [];
	
	var canvas = document.getElementById("pdpvsvg");
	
	var xknot;
	var yknot;
	
	if (curX0 == null || curY0 == null) {
		xknot = verticalLines[0].val;
		yknot = horizontalLines[0].val;
	} else {
		xknot = curX0;
		yknot = curY0;
	}
	
	var firstX = -(Math.round(xknot / curSpacing) + 1) * curSpacing + xknot;
	var firstY = -(Math.round(yknot / curSpacing) + 1) * curSpacing + yknot;
	
	var n = 0;
//	var limit1 = (bound.right - bound.left) / curSpacing + 1;  // AL: there is a better way
//	var limit2 = (bound.bottom - bound.top) / curSpacing + 1;
//	
//	var limit;
//	if (limit1 > limit2) {
//		limit = limit1;
//	} else {
//		limit = limit2;
//	}
	
	var limit = Math.round(1000 / curSpacing) + 1
	
	for (var i = -limit; i <= 2 * limit; i++) {
		canvas.innerHTML += "<line id='bggd" + (2 * n) + "_pv' x1='0%' y1='" + (firstY + i * curSpacing) + "' x2='100%' y2='" + (firstY + i * curSpacing) + "' style='stroke:rgb(128,128,128);stroke-width:0.4' stroke-dasharray='5,5'>";
		canvas.innerHTML += "<line id='bggd" + (2 * n + 1) + "_pv' x1='" + (firstX + i * curSpacing) + "' y1='3' x2='" + (firstX + i * curSpacing) + "' y2='897' style='stroke:rgb(128,128,128);stroke-width:0.4' stroke-dasharray='5,5'>";
		verticalBggds.push({id: 'bggd' + (2 * n + 1) + '_pv', val: Number(firstX + i * curSpacing)});
		horizontalBggds.push({id: 'bggd' + (2 * n) + '_pv', val: Number(firstY + i * curSpacing)});
		n++;
	}
	
}

function resizeScreen() {
	console.log("resize screen!!!!!!!");
	redrawBggd(null, null);
}

function adjustElement(event) {
	
	if (elementFound.length == 0) {
		return;
		
	}
	
	for (var i = 0; i < elementFound.length; i++) {
	
		var ele = $('#' + elementFound[i].id);
		var diffX = event.clientX - startX;
		var diffY = event.clientY - startY;
		
		if (elementFound[i].type == "verticalLine") {
			
			
			var new_x = Number(verticalLines[elementFound[i].sn].val) + diffX;
			
			elementFound[i].val = new_x;
			
			ele.attr({x1:new_x, x2:new_x});
			
		} else if (elementFound[i].type == "horizontalLine") {
			
			var new_y = Number(horizontalLines[elementFound[i].sn].val) + diffY;
			
			elementFound[i].val = new_y;
			
			ele.attr({y1:new_y, y2:new_y});
		}
	}
	
}

function getAllChildrenVerticalLines(parentElement) {
	
	var childrenElements = [];
	
	for (var n = 0; n < parentElement.length; n++) {
		for (var i = 1; i < verticalLines.length; i++) {
			if (verticalLines[i].parent == parentElement[n].uid) {
				childrenElements.push({type: 'verticalLine', id: verticalLines[i].id, sn: i, uid: verticalLines[i].uid, parent: verticalLines[i].parent, val: verticalLines[i].val})
			}
		}
	}
	
	console.log(childrenElements);
	
	if (childrenElements.length == 0) {
		return childrenElements;
	} else {
		console.log(childrenElements.concat(getAllChildrenVerticalLines(childrenElements)));
		return childrenElements.concat(getAllChildrenVerticalLines(childrenElements));
	}
	
}

function getAllChildrenHorizontalLines(parentElement) {
	
	var childrenElements = [];
	
	for (var n = 0; n < parentElement.length; n++) {
		for (var i = 1; i < horizontalLines.length; i++) {
			if (horizontalLines[i].parent == parentElement[n].uid) {
				childrenElements.push({type: 'horizontalLine', id: horizontalLines[i].id, sn: i, uid: horizontalLines[i].uid, parent: horizontalLines[i].parent, val: horizontalLines[i].val})
			}
		}
	}
	
	if (childrenElements.length == 0) {
		return childrenElements;
	} else {
		return childrenElements.concat(getAllChildrenHorizontalLines(childrenElements));
	}
	
}

function getVerticalRelativePosition(line) {
	
	for (var i = 0; i < verticalLines.length; i++) {
		if (line.parent == verticalLines[i].uid) {
			return line.val - verticalLines[i].val;
		}
	}
	
}

function getHorizontalRelativePosition(line) {
	
	for (var i = 0; i < horizontalLines.length; i++) {
		if (line.parent == horizontalLines[i].uid) {
			return line.val - horizontalLines[i].val;
		}
	}
	
}

function changeChildrenColor(elements) {
	
	console.log("will change chidren color");
	
	for (var i = 0; i < elements.length; i++) {
		if (elements.type == "verticalLine") {
			$("#" + elements.id).attr("stroke", "rgb(0,153,204)");
		} else if (elements.type == "horizontalLine") {
			$("#" + elements.id).attr("stroke", "rgb(0,153,204)");
		}
	}
	
}

function redrawGroupShapes(tmpPos, event) {
	
	// find all lines
	
//	console.log("redraw group shapes");
//	console.log("tmpPos = " + tmpPos);
//	
//	for (var i = 0; i < groupShapesAssociated.length; i++) {
//		
//		if (groupShapes[groupShapesAssociated[i]].type == "rectGroup") {
//			
//			var shapeid = groupShapes[groupShapesAssociated[i]].id;
//			console.log("the group shape id = " + shapeid);
//			var shape = $("#" + shapeid);
//			
//			console.log("redraw rect group!");
//			
//			var x_coor = [], y_coor = [];
//			var xmin, ymin, h, w;
//			
//			for (var j = 0; j < groupShapes[groupShapesAssociated[i]].parents.length; j++) {
//				var conline = getConstructionLineTmpCoorById(groupShapes[groupShapesAssociated[i]].parents[j], tmpPos, elementFound[0].type);
//				
//				console.log("conline = " + conline.type + " " + conline.val);
//				
//				if (conline.type == "verticalLine") {
//					x_coor.push(conline.val);
//				} else if (conline.type == "horizontalLine") {
//					y_coor.push(conline.val);
//				}
//			}
//			
//			if (Number(x_coor[0]) < Number(x_coor[1])) {
//				xmin = Number(x_coor[0]);
//			} else {
//				xmin = Number(x_coor[1]);
//			}
//			
//			if (Number(y_coor[0]) < Number(y_coor[1])) {
//				ymin = Number(y_coor[0]);
//			} else {
//				ymin = Number(y_coor[1]);
//			}
//			
//			console.log("x_coor = " + x_coor);
//			console.log("y_coor = " + y_coor);
//			
//			h = Math.abs(Number(y_coor[0]) - Number(y_coor[1]));
//			w = Math.abs(Number(x_coor[0]) - Number(x_coor[1]));
//			
//			console.log("redraw rect group = " + "x=" + xmin + " y=" + ymin + " w=" + w + " h="+ h);
//			
//			shape.attr({x:xmin, y:ymin, height:h, width:w});
//			
//		} else if (groupShapes[groupShapesAssociated[i]].type == "cntrGroup") {
//			
//			var cntrlines = findContourLineByGroupPos(i);
//			
//			var diffX = event.clientX - startX;
//			var diffY = event.clientY - startY;
//			
//			console.log("adjust contour group");
//			console.log(cntrlines);
//			
//			redrawContour(elementFound[0].type, cntrlines.lines, diffX, diffY, cntrlines.conline.val);
//			
//			
//		}
//	}

	var moveVertical = true;
	var firstElement = getVerticalElementByUid(elementFound[0].uid, true);
	if (firstElement == null) {
		firstElement = getHorizontalElementByUid(elementFound[0].uid, true);
		moveVertical = false;
	}
	
	for (var i = 0; i < rectFound.length; i++) {
		var x_coor = [], y_coor = [];
		for (var j = 0; j < rectFound[i].parents.length; j++) {
			var hasParent = false;
			for (var k = 0; k < elementFound.length; k++) {
				if (rectFound[i].parents[j] == elementFound[k].uid) {
					if (elementFound[k].type == "verticalLine") {
						x_coor.push(elementFound[k].val);
					} else {
						y_coor.push(elementFound[k].val);
					}
					hasParent = true;
				}
			}
			
			if (hasParent == false) {
				var tmpRectParentLine = getHorizontalElementByUid(rectFound[i].parents[j], true);
				if (tmpRectParentLine == null) {
					tmpRectParentLine = getVerticalElementByUid(rectFound[i].parents[j], true);
					x_coor.push(tmpRectParentLine.val);
				} else {
					y_coor.push(tmpRectParentLine.val);
				}
			}
		}
		var xmin, ymin, h, w;
		if (Number(x_coor[0]) < Number(x_coor[1])) {
			xmin = Number(x_coor[0]);
		} else {
			xmin = Number(x_coor[1]);
		}
		
		if (Number(y_coor[0]) < Number(y_coor[1])) {
			ymin = Number(y_coor[0]);
		} else {
			ymin = Number(y_coor[1]);
		}
		
		console.log("x_coor = " + x_coor);
		console.log("y_coor = " + y_coor);
		
		h = Math.abs(Number(y_coor[0]) - Number(y_coor[1]));
		w = Math.abs(Number(x_coor[0]) - Number(x_coor[1]));
		
		rectFound[i].x = xmin;
		rectFound[i].y = ymin;
		rectFound[i].width = w;
		rectFound[i].height = h;
	}
	
	var cntrPosChangeStatus = [];
	for (var i = 0; i < elementFound.length; i++) {
		var oldElement = oldElementFound[i];
		
		for (var j = 0; j < textFound.length; j++) {
			if (moveVertical == true) {
				if (textFound[j].x == oldElement.val) {
					textFound[j].x = elementFound[i].val;
				}
			} else {
				if (textFound[j].y == oldElement.val) {
					textFound[j].y = elementFound[i].val;
				}
			}
		}
		
		var originalElement = null;
		if (moveVertical == true) {
			originalElement = getVerticalElementByUid(elementFound[i].uid, true);
		} else {
			originalElement = getHorizontalElementByUid(elementFound[i].uid, true);
		}
		
		for (var j = 0; j < cntrFound.length; j++) {
			var oldCntr = oldCntrFound[j];
			var x1Changed = false;
			var y1Changed = false;
			var x2Changed = false;
			var y2Changed = false;
			if (moveVertical == true) {
				if (cntrFound[j].parent) {
					if (cntrFound[j].parent == elementFound[i].uid) {
						cntrFound[j].x1 = elementFound[i].val;
						x1Changed = true;
						cntrFound[j].x2 = elementFound[i].val;
						x2Changed = true;
					} else {
						var isVertical = true;
						var cntrParent = getVerticalElementByUid(cntrFound[j].parent, true);
						if (cntrParent == null) {
							cntrParent = getHorizontalElementByUid(cntrFound[j].parent, true);
							isVertical = false;
						}
						if (isVertical == false) {
							cntrFound[j].y1 = cntrParent.val;
							y1Changed = true;
							cntrFound[j].y2 = cntrParent.val;
							y2Changed = true;
							
							var originalCntr = getLineCntrById(cntrFound[j].uid);
							var allOriginalCircCntrs = [];
							for (var k = 0; k < cntrFound.length; k++) {
								var tmpOriginalCircCntr = getCircCntrById(cntrFound[k].uid);
								if (tmpOriginalCircCntr != null) {
									allOriginalCircCntrs.push(tmpOriginalCircCntr);
								}
							}
							var x1y1OnCirc = false;
							var x2y2OnCirc = false;
							for (var k = 0; k < allOriginalCircCntrs.length; k++) {
								if (((originalCntr.x1 == allOriginalCircCntrs[k].x1) && (originalCntr.y1 == allOriginalCircCntrs[k].y1)) || ((originalCntr.x1 == allOriginalCircCntrs[k].x2) && (originalCntr.y1 == allOriginalCircCntrs[k].y2))) {
									x1y1OnCirc = true;
								}
								if (((originalCntr.x2 == allOriginalCircCntrs[k].x1) && (originalCntr.y2 == allOriginalCircCntrs[k].y1)) || ((originalCntr.x2 == allOriginalCircCntrs[k].x2) && (originalCntr.y2 == allOriginalCircCntrs[k].y2))) {
									x2y2OnCirc = true;
								}
							}
							
							if (oldCntr.x1 == oldElement.val) {
								if (x1y1OnCirc == false && originalCntr.x1 == originalElement.val) {
									cntrFound[j].x1 = elementFound[i].val;
//									x1Changed = true;
								}
							}
							if (oldCntr.x2 == oldElement.val) {
								if (x2y2OnCirc == false && originalCntr.x2 == originalElement.val) {
									cntrFound[j].x2 = elementFound[i].val;
//									x2Changed = true;
								}
							}
						}
					}
				} else {					
					var originalCntr = getCircCntrById(cntrFound[j].uid);
					if (oldCntr.x1 == oldElement.val) {
						if (originalCntr.x1 == originalElement.val) {
							cntrFound[j].x1 = elementFound[i].val;
							x1Changed = true;
						}
					}
					if (oldCntr.x2 == oldElement.val) {
						if (originalCntr.x2 == originalElement.val) {
							cntrFound[j].x2 = elementFound[i].val;
							x2Changed = true;
						}
					}
				}
			} else {
				if (cntrFound[j].parent) {
					if (cntrFound[j].parent == elementFound[i].uid) {
						cntrFound[j].y1 = elementFound[i].val;
						y1Changed = true;
						cntrFound[j].y2 = elementFound[i].val;
						y2Changed = true;
					} else {
						var isVertical = true;
						var cntrParent = getVerticalElementByUid(cntrFound[j].parent, true);
						if (cntrParent == null) {
							cntrParent = getHorizontalElementByUid(cntrFound[j].parent, true);
							isVertical = false;
						}
						if (isVertical == true) {
							cntrFound[j].x1 = cntrParent.val;
							x1Changed = true;
							cntrFound[j].x2 = cntrParent.val;
							x2Changed = true;
							
							var originalCntr = getLineCntrById(cntrFound[j].uid);
							var allOriginalCircCntrs = [];
							for (var k = 0; k < cntrFound.length; k++) {
								var tmpOriginalCircCntr = getCircCntrById(cntrFound[k].uid);
								if (tmpOriginalCircCntr != null) {
									allOriginalCircCntrs.push(tmpOriginalCircCntr);
								}
							}
							var x1y1OnCirc = false;
							var x2y2OnCirc = false;
							for (var k = 0; k < allOriginalCircCntrs.length; k++) {
								if (((originalCntr.x1 == allOriginalCircCntrs[k].x1) && (originalCntr.y1 == allOriginalCircCntrs[k].y1)) || ((originalCntr.x1 == allOriginalCircCntrs[k].x2) && (originalCntr.y1 == allOriginalCircCntrs[k].y2))) {
									x1y1OnCirc = true;
								}
								if (((originalCntr.x2 == allOriginalCircCntrs[k].x1) && (originalCntr.y2 == allOriginalCircCntrs[k].y1)) || ((originalCntr.x2 == allOriginalCircCntrs[k].x2) && (originalCntr.y2 == allOriginalCircCntrs[k].y2))) {
									x2y2OnCirc = true;
								}
							}
							
							if (oldCntr.y1 == oldElement.val) {
								if (x1y1OnCirc == false && originalCntr.y1 == originalElement.val) {
									cntrFound[j].y1 = elementFound[i].val;
//									y1Changed = true;
								}
							}
							if (oldCntr.y2 == oldElement.val) {
								if (x2y2OnCirc == false && originalCntr.y2 == originalElement.val) {
									cntrFound[j].y2 = elementFound[i].val;
//									y2Changed = true;
								}
							}
						}
					}
				} else {
					var originalCntr = getCircCntrById(cntrFound[j].uid);
					if (oldCntr.y1 == oldElement.val) {
						if (originalCntr.y1 == originalElement.val) {
							cntrFound[j].y1 = elementFound[i].val;
							y1Changed = true;
						}
					}
					if (oldCntr.y2 == oldElement.val) {
						if (originalCntr.y2 == originalElement.val) {
							cntrFound[j].y2 = elementFound[i].val;
							y2Changed = true;
						}
					}
				}
			}
			cntrPosChangeStatus[j] = {x1Changed:x1Changed, y1Changed:y1Changed, x2Changed:x2Changed, y2Changed:y2Changed};
		}	
	}
	
	for (var i = 0; i < circFound.length; i++) {
		for (var j = 0; j < cntrFound.length; j++) {
			var oldCntr = oldCntrFound[j];
			var oldCirc = oldCircFound[i];
			
			var isLineCntr = true;
			var originalCntr = getLineCntrById(cntrFound[j].uid);
			if (originalCntr == null) {
				originalCntr = getCircCntrById(cntrFound[j].uid);
				isLineCntr = false;
			}
			
			var allOriginalCircCntrs = [];
			for (var k = 0; k < cntrFound.length; k++) {
				var tmpOriginalCircCntr = getCircCntrById(cntrFound[k].uid);
				if (tmpOriginalCircCntr != null) {
					allOriginalCircCntrs.push(tmpOriginalCircCntr);
				}
			}
			
			var x1y1OnCirc = false;
			var x2y2OnCirc = false;
			if (isLineCntr == true) {
				for (var k = 0; k < allOriginalCircCntrs.length; k++) {
					if (((originalCntr.x1 == allOriginalCircCntrs[k].x1) && (originalCntr.y1 == allOriginalCircCntrs[k].y1)) || ((originalCntr.x1 == allOriginalCircCntrs[k].x2) && (originalCntr.y1 == allOriginalCircCntrs[k].y2))) {
						x1y1OnCirc = true;
					}
					if (((originalCntr.x2 == allOriginalCircCntrs[k].x1) && (originalCntr.y2 == allOriginalCircCntrs[k].y1)) || ((originalCntr.x2 == allOriginalCircCntrs[k].x2) && (originalCntr.y2 == allOriginalCircCntrs[k].y2))) {
						x2y2OnCirc = true;
					}
				}
			}
			
			if ( (Math.pow((oldCntr.x1 - oldCirc.x1),2) + Math.pow((oldCntr.y1 - oldCirc.y1),2)) <= Math.pow(oldCirc.r,2)+100 && (Math.pow((oldCntr.x1 - oldCirc.x1),2) + Math.pow((oldCntr.y1 - oldCirc.y1),2)) >= Math.pow(oldCirc.r,2)-100) {
				if (isLineCntr == true) {
					if (x1y1OnCirc == true) {
						if (cntrPosChangeStatus[j].x1Changed == true) {
							// use x1 to find y1
							if (oldCntr.y1 >= oldCirc.y1) {
								cntrFound[j].y1 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].x1 - circFound[i].x1),2) );
							} else {
								cntrFound[j].y1 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].x1 - circFound[i].x1),2) );
							}
						} else if (cntrPosChangeStatus[j].y1Changed == true) {
							// use y1 to find x1
							if (oldCntr.x1 >= oldCirc.x1) {
								cntrFound[j].x1 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].y1 - circFound[i].y1),2) );
							} else {
								cntrFound[j].x1 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].y1 - circFound[i].y1),2) );
							}
						} else {
							var isVertical = null;
							if (!cntrFound[j].r) {
								isVertical = true;
								var cntrParent = getVerticalElementByUid(cntrFound[j].parent, true);
								if (cntrParent == null) {
									cntrParent = getHorizontalElementByUid(cntrFound[j].parent, true);
									isVertical = false;
								}
							} else {
								for (var k = 0; k < cntrFound.length; k++) {
									if (!cntrFound[k].r) {
										if ((oldCntrFound[k].x1 == oldCntr.x1 && oldCntrFound[k].y1 == oldCntr.y1) || (oldCntrFound[k].x2 == oldCntr.x1 && oldCntrFound[k].y2 == oldCntr.y1)) {
											isVertical = true;
											var cntrParent = getVerticalElementByUid(cntrFound[k].parent, true);
											if (cntrParent == null) {
												cntrParent = getHorizontalElementByUid(cntrFound[k].parent, true);
												isVertical = false;
											}
										}
									}
								}
							}
							if (isVertical == true) {
								// find y
								if (oldCntr.y1 >= oldCirc.y1) {
									cntrFound[j].y1 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x1 - circFound[i].x1),2) );
								} else {
									cntrFound[j].y1 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x1 - circFound[i].x1),2) );
								}
							} else {
								// find x
								if (oldCntr.x1 >= oldCirc.x1) {
									cntrFound[j].x1 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y1 - circFound[i].y1),2) );
								} else {
									cntrFound[j].x1 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y1 - circFound[i].y1),2) );
								}
							}
//							if (moveVertical == true) {
//								// find x
//								if (oldCntr.x1 >= oldCirc.x1) {
//									cntrFound[j].x1 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y1 - circFound[i].y1),2) );
//								} else {
//									cntrFound[j].x1 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y1 - circFound[i].y1),2) );
//								}
//							} else {
//								// find y
//								if (oldCntr.y1 >= oldCirc.y1) {
//									cntrFound[j].y1 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x1 - circFound[i].x1),2) );
//								} else {
//									cntrFound[j].y1 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x1 - circFound[i].x1),2) );
//								}
//							}
						}			
					}
				} else {
					if (cntrPosChangeStatus[j].x1Changed == true) {
						// use x1 to find y1
						if (oldCntr.y1 >= oldCirc.y1) {
							cntrFound[j].y1 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].x1 - circFound[i].x1),2) );
						} else {
							cntrFound[j].y1 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].x1 - circFound[i].x1),2) );
						}
					} else if (cntrPosChangeStatus[j].y1Changed == true) {
						// use y1 to find x1
						if (oldCntr.x1 >= oldCirc.x1) {
							cntrFound[j].x1 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].y1 - circFound[i].y1),2) );
						} else {
							cntrFound[j].x1 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].y1 - circFound[i].y1),2) );
						}
					} else {
						var isVertical = null;
						if (!cntrFound[j].r) {
							isVertical = true;
							var cntrParent = getVerticalElementByUid(cntrFound[j].parent, true);
							if (cntrParent == null) {
								cntrParent = getHorizontalElementByUid(cntrFound[j].parent, true);
								isVertical = false;
							}
						} else {
							for (var k = 0; k < cntrFound.length; k++) {
								if (!cntrFound[k].r) {
									if ((oldCntrFound[k].x1 == oldCntr.x1 && oldCntrFound[k].y1 == oldCntr.y1) || (oldCntrFound[k].x2 == oldCntr.x1 && oldCntrFound[k].y2 == oldCntr.y1)) {
										isVertical = true;
										var cntrParent = getVerticalElementByUid(cntrFound[k].parent, true);
										if (cntrParent == null) {
											cntrParent = getHorizontalElementByUid(cntrFound[k].parent, true);
											isVertical = false;
										}
									}
								}
							}
						}
						if (isVertical == true) {
							// find y
							if (oldCntr.y1 >= oldCirc.y1) {
								cntrFound[j].y1 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x1 - circFound[i].x1),2) );
							} else {
								cntrFound[j].y1 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x1 - circFound[i].x1),2) );
							}
						} else {
							// find x
							if (oldCntr.x1 >= oldCirc.x1) {
								cntrFound[j].x1 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y1 - circFound[i].y1),2) );
							} else {
								cntrFound[j].x1 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y1 - circFound[i].y1),2) );
							}
						}
//						if (moveVertical == true) {
//							// find x
//							if (oldCntr.x1 >= oldCirc.x1) {
//								cntrFound[j].x1 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y1 - circFound[i].y1),2) );
//							} else {
//								cntrFound[j].x1 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y1 - circFound[i].y1),2) );
//							}
//						} else {
//							// find y
//							if (oldCntr.y1 >= oldCirc.y1) {
//								cntrFound[j].y1 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x1 - circFound[i].x1),2) );
//							} else {
//								cntrFound[j].y1 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x1 - circFound[i].x1),2) );
//							}
//						}
					}			
				}
			}
			
			if ( (Math.pow((oldCntr.x2 - oldCirc.x1),2) + Math.pow((oldCntr.y2 - oldCirc.y1),2)) <= Math.pow(oldCirc.r,2)+100 && (Math.pow((oldCntr.x2 - oldCirc.x1),2) + Math.pow((oldCntr.y2 - oldCirc.y1),2)) >= Math.pow(oldCirc.r,2)-100) {

				if (isLineCntr == true) {
					if (x2y2OnCirc == true) {
						if (cntrPosChangeStatus[j].x2Changed == true) {
							// use x2 to find y2
							if (oldCntr.y2 >= oldCirc.y1) {
								cntrFound[j].y2 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].x2 - circFound[i].x1),2) );
							} else {
								cntrFound[j].y2 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].x2 - circFound[i].x1),2) );
							}
						} else if (cntrPosChangeStatus[j].y2Changed == true) {
							// use y2 to find x2
							if (oldCntr.x2 >= oldCirc.x1) {
								cntrFound[j].x2 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].y2 - circFound[i].y1),2) );
							} else {
								cntrFound[j].x2 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].y2 - circFound[i].y1),2) );
							}
						} else {
							var isVertical = null;
							if (!cntrFound[j].r) {
								isVertical = true;
								var cntrParent = getVerticalElementByUid(cntrFound[j].parent, true);
								if (cntrParent == null) {
									cntrParent = getHorizontalElementByUid(cntrFound[j].parent, true);
									isVertical = false;
								}
							} else {
								for (var k = 0; k < cntrFound.length; k++) {
									if (!cntrFound[k].r) {
										if ((oldCntrFound[k].x2 == oldCntr.x2 && oldCntrFound[k].y2 == oldCntr.y2) || (oldCntrFound[k].x1 == oldCntr.x2 && oldCntrFound[k].y1 == oldCntr.y2)) {
											isVertical = true;
											var cntrParent = getVerticalElementByUid(cntrFound[k].parent, true);
											if (cntrParent == null) {
												cntrParent = getHorizontalElementByUid(cntrFound[k].parent, true);
												isVertical = false;
											}
										}
									}
								}
							}
							if (isVertical == true) {
								// find y
								if (oldCntr.y2 >= oldCirc.y1) {
									cntrFound[j].y2 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x2 - circFound[i].x1),2) );
								} else {
									cntrFound[j].y2 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x2 - circFound[i].x1),2) );
								}
							} else {
								// find x
								if (oldCntr.x2 >= oldCirc.x1) {
									cntrFound[j].x2 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y2 - circFound[i].y1),2) );
								} else {
									cntrFound[j].x2 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y2 - circFound[i].y1),2) );
								}
							}
//							if (moveVertical == true) {
//								// find x
//								if (oldCntr.x2 >= oldCirc.x1) {
//									cntrFound[j].x2 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y2 - circFound[i].y1),2) );
//								} else {
//									cntrFound[j].x2 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y2 - circFound[i].y1),2) );
//								}
//							} else {
//								// find y
//								if (oldCntr.y2 >= oldCirc.y1) {
//									cntrFound[j].y2 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x2 - circFound[i].x1),2) );
//								} else {
//									cntrFound[j].y2 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x2 - circFound[i].x1),2) );
//								}
//							}
						}
					}
					
					if (cntrFound[j].groupShapeParent == circFound[i].group) {
						cntrFound[j].r = circFound[i].r;
					}
				} else {
					if (cntrPosChangeStatus[j].x2Changed == true) {
						// use x2 to find y2
						if (oldCntr.y2 >= oldCirc.y1) {
							cntrFound[j].y2 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].x2 - circFound[i].x1),2) );
						} else {
							cntrFound[j].y2 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].x2 - circFound[i].x1),2) );
						}
					} else if (cntrPosChangeStatus[j].y2Changed == true) {
						// use y2 to find x2
						if (oldCntr.x2 >= oldCirc.x1) {
							cntrFound[j].x2 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].y2 - circFound[i].y1),2) );
						} else {
							cntrFound[j].x2 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].y2 - circFound[i].y1),2) );
						}
					} else {
						var isVertical = null;
						if (!cntrFound[j].r) {
							isVertical = true;
							var cntrParent = getVerticalElementByUid(cntrFound[j].parent, true);
							if (cntrParent == null) {
								cntrParent = getHorizontalElementByUid(cntrFound[j].parent, true);
								isVertical = false;
							}
						} else {
							for (var k = 0; k < cntrFound.length; k++) {
								if (!cntrFound[k].r) {
									if ((oldCntrFound[k].x2 == oldCntr.x2 && oldCntrFound[k].y2 == oldCntr.y2) || (oldCntrFound[k].x1 == oldCntr.x2 && oldCntrFound[k].y1 == oldCntr.y2)) {
										isVertical = true;
										var cntrParent = getVerticalElementByUid(cntrFound[k].parent, true);
										if (cntrParent == null) {
											cntrParent = getHorizontalElementByUid(cntrFound[k].parent, true);
											isVertical = false;
										}
									}
								}
							}
						}
						if (isVertical == true) {
							// find y
							if (oldCntr.y2 >= oldCirc.y1) {
								cntrFound[j].y2 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x2 - circFound[i].x1),2) );
							} else {
								cntrFound[j].y2 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x2 - circFound[i].x1),2) );
							}
						} else {
							// find x
							if (oldCntr.x2 >= oldCirc.x1) {
								cntrFound[j].x2 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y2 - circFound[i].y1),2) );
							} else {
								cntrFound[j].x2 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y2 - circFound[i].y1),2) );
							}
						}
//						if (moveVertical == true) {
//							// find x
//							if (oldCntr.x2 >= oldCirc.x1) {
//								cntrFound[j].x2 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y2 - circFound[i].y1),2) );
//							} else {
//								cntrFound[j].x2 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y2 - circFound[i].y1),2) );
//							}
//						} else {
//							// find y
//							if (oldCntr.y2 >= oldCirc.y1) {
//								cntrFound[j].y2 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x2 - circFound[i].x1),2) );
//							} else {
//								cntrFound[j].y2 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x2 - circFound[i].x1),2) );
//							}
//						}
					}
				}
				
				if (cntrFound[j].groupShapeParent == circFound[i].group) {
					cntrFound[j].r = circFound[i].r;
				}
			}
		}
	}
	
	for (var i = 0; i < cntrFound.length; i++) {
		var shape = $("#" + cntrFound[i].id);
		if (!cntrFound[i].r) {
			shape.attr({x1:cntrFound[i].x1, x2:cntrFound[i].x2, y1:cntrFound[i].y1, y2:cntrFound[i].y2});
			oldCntrFound[i].x1 = cntrFound[i].x1;
			oldCntrFound[i].y1 = cntrFound[i].y1;
			oldCntrFound[i].x2 = cntrFound[i].x2;
			oldCntrFound[i].y2 = cntrFound[i].y2;
		} else {
			if (cntrFound[i].largeArcFlag == false) {
				var d = 'M' + cntrFound[i].x1 + ' ' + cntrFound[i].y1 + ' A ' + cntrFound[i].r + ' ' + cntrFound[i].r + ' 0 0 0 ' + cntrFound[i].x2 + ' ' + cntrFound[i].y2;
				shape.attr({d:d});
			} else {
				var d = 'M' + cntrFound[i].x1 + ' ' + cntrFound[i].y1 + ' A ' + cntrFound[i].r + ' ' + cntrFound[i].r + ' 0 1 0 ' + cntrFound[i].x2 + ' ' + cntrFound[i].y2;
				shape.attr({d:d});
			}
			oldCntrFound[i].x1 = cntrFound[i].x1;
			oldCntrFound[i].y1 = cntrFound[i].y1;
			oldCntrFound[i].x2 = cntrFound[i].x2;
			oldCntrFound[i].y2 = cntrFound[i].y2;
			oldCntrFound[i].r = cntrFound[i].r;
		}
	}
	
	for (var i = 0; i < rectFound.length; i++) {
		var shape = $("#" + rectFound[i].id);
		shape.attr({x:rectFound[i].x, y:rectFound[i].y, width:rectFound[i].width, height:rectFound[i].height});
		oldRectFound[i].x = rectFound[i].x;
		oldRectFound[i].y = rectFound[i].y;
		oldRectFound[i].width = rectFound[i].width;
		oldRectFound[i].height = rectFound[i].height;
	}
	
	for (var i = 0; i < textFound.length; i++) {
		var shape = $("#" + textFound[i].id);
		shape.attr({x:textFound[i].x, y:textFound[i].y});
		oldTextFound[i].x = textFound[i].x;
		oldTextFound[i].y = textFound[i].y;
	}
	
	for (var i = 0; i < elementFound.length; i++) {
		oldElementFound[i].val = elementFound[i].val;
	}
	
	for (var i = 0; i < circFound.length; i++) {
		oldCircFound[i].x1 = circFound[i].x1;
		oldCircFound[i].y1 = circFound[i].y1;
		oldCircFound[i].x2 = circFound[i].x2;
		oldCircFound[i].y2 = circFound[i].y2;
		oldCircFound[i].r = circFound[i].r;	
	}
	
//	var moveVertical = true;
//	var firstElement = getVerticalElementByUid(elementFound[0].uid);
//	if (firstElement == null) {
//		firstElement = getHorizontalElementByUid(elementFound[0].uid);
//		moveVertical = false;
//	}
//	
//	for (var i = 0; i < elementFound.length; i++) {
//		var isVertical = true;
//		var oldElement = getVerticalElementByUid(elementFound[i].uid);
//		if (oldElement == null) {
//			oldElement = getHorizontalElementByUid(elementFound[i].uid);
//			isVertical = false;
//		}
//		
//		for (var j = 0; j < cntrFound.length; j++) {
//			if (isVertical == true) {
//				var cntrParent = getVerticalElementByUid(cntrFound[j].parent);
//				if (cntrParent != null) { // is vertical
//					if (cntrFound[j].parent == elementFound[i].uid) {
//						cntrFound[j].x1 = elementFound[i].val;
//						cntrFound[j].x2 = elementFound[i].val;
//					}
////					if (cntrFound[j].x1 == oldElement.val) {
////						cntrFound[j].x1 = elementFound[i].val;
////					}
////					if (cntrFound[j].x2 == oldElement.val) {
////						cntrFound[j].x2 = elementFound[i].val;
////					}
//				} else {
//					var oldCntr = null;
//					if (!cntrFound[j].r) {
//						oldCntr = getLineCntrById(cntrFound[j].uid);
//					} else {
//						oldCntr = getCircCntrById(cntrFound[j].uid);
//					}
//					if (oldCntr.x1 == oldElement.val) {
//						cntrFound[j].x1 = elementFound[i].val;
//					}
//					if (oldCntr.x2 == oldElement.val) {
//						cntrFound[j].x2 = elementFound[i].val;
//					}
//				}
//			} else {
//				var cntrParent = getHorizontalElementByUid(cntrFound[j].parent);
//				if (cntrParent != null) { // is horizontal 
//					if (cntrFound[j].parent == elementFound[i].uid) {
//						cntrFound[j].y1 = elementFound[i].val;
//						cntrFound[j].y2 = elementFound[i].val;
//					}
////					if (cntrFound[j].y1 == oldElement.val) {
////						cntrFound[j].y1 = elementFound[i].val;
////					}
////					if (cntrFound[j].y2 == oldElement.val) {
////						cntrFound[j].y2 = elementFound[i].val;
////					}
//				} else {
//					var oldCntr = null;
//					if (!cntrFound[j].r) {
//						oldCntr = getLineCntrById(cntrFound[j].uid);
//					} else {
//						oldCntr = getCircCntrById(cntrFound[j].uid);
//					}
//					if (oldCntr.y1 == oldElement.val) {
//						cntrFound[j].y1 = elementFound[i].val;
//					}
//					if (oldCntr.y2 == oldElement.val) {
//						cntrFound[j].y2 = elementFound[i].val;
//					}
//				}
//			}			
//		}
//	}
//	
////	var allOldCntrs = [];
////	for (var i = 0; i < cntrFound.length; i++) {
////		var oldCntr = null;
////		if (!cntrFound[i].r) {
////			oldCntr = getLineCntrById(cntrFound[i].uid);
////		} else {
////			oldCntr = getCircCntrById(cntrFound[i].uid);
////		}
////		allOldCntrs.push(oldCntr);
////	}
//	
//	for (var i = 0; i < circFound.length; i++) {
//		for (var j = 0; j < cntrFound.length; j++) {
////			var oldCntr = null;
////			if (!cntrFound[j].r) {
////				oldCntr = getLineCntrById(cntrFound[j].uid);
////			} else {
////				oldCntr = getCircCntrById(cntrFound[j].uid);
////			}
//			var oldCntr = oldCntrFound[j];
////			var oldCirc = null;
////			for (var k = 0; k < circs.length; k++) {
////				if (circs[k].group == circFound[i].group) {
////					oldCirc = circs[k];
////				}
////			}
//			var oldCirc = oldCircFound[i]; 
//			
//			var a = circFound[i].x1;
//			var b = circFound[i].y1;
//			var r = circFound[i].r;
//			
//			// if x1 and y1 the circle
//			if ( (Math.pow((oldCntr.x1 - oldCirc.x1),2) + Math.pow((oldCntr.y1 - oldCirc.y1),2)) <= Math.pow(oldCirc.r,2)+100 && (Math.pow((oldCntr.x1 - oldCirc.x1),2) + Math.pow((oldCntr.y1 - oldCirc.y1),2)) >= Math.pow(oldCirc.r,2)-100) {								
////				var x1Changed = (cntrFound[j].x1 != oldCntr.x1);
//				if (cntrFound[j].x1 != oldCntr.x1) {
//					// use x1 to find y1
//					if (oldCntr.y1 >= oldCirc.y1) {
//						cntrFound[j].y1 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].x1 - circFound[i].x1),2) );
//					} else {
//						cntrFound[j].y1 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].x1 - circFound[i].x1),2) );
//					}
//				} else if (cntrFound[j].y1 != oldCntr.y1) {
//					// use y1 to find x1
//					if (oldCntr.x1 >= oldCirc.x1) {
//						cntrFound[j].x1 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].y1 - circFound[i].y1),2) );
//					} else {
//						cntrFound[j].x1 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].y1 - circFound[i].y1),2) );
//					}
//				} else {
//					if (moveVertical == true) {
//						// find x
//						if (oldCntr.x1 >= oldCirc.x1) {
//							cntrFound[j].x1 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y1 - circFound[i].y1),2) );
//						} else {
//							cntrFound[j].x1 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y1 - circFound[i].y1),2) );
//						}
//					} else {
//						// find y
//						if (oldCntr.y1 >= oldCirc.y1) {
//							cntrFound[j].y1 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x1 - circFound[i].x1),2) );
//						} else {
//							cntrFound[j].y1 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x1 - circFound[i].x1),2) );
//						}
//					}
//				}			
//			}
//			
//			// if x2 and y2 the circle
//			if ( (Math.pow((oldCntr.x2 - oldCirc.x1),2) + Math.pow((oldCntr.y2 - oldCirc.y1),2)) <= Math.pow(oldCirc.r,2)+100 && (Math.pow((oldCntr.x2 - oldCirc.x1),2) + Math.pow((oldCntr.y2 - oldCirc.y1),2)) >= Math.pow(oldCirc.r,2)-100) {
////				var x2Changed = (cntrFound[j].x2 != oldCntr.x2);
//				if (cntrFound[j].x2 != oldCntr.x2) {
//					// use x2 to find y2
//					if (oldCntr.y2 >= oldCirc.y1) {
//						cntrFound[j].y2 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].x2 - circFound[i].x1),2) );
//					} else {
//						cntrFound[j].y2 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].x2 - circFound[i].x1),2) );
//					}
//				} else if (cntrFound[j].y2 != oldCntr.y2) {
//					// use y2 to find x2
//					if (oldCntr.x2 >= oldCirc.x1) {
//						cntrFound[j].x2 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].y2 - circFound[i].y1),2) );
//					} else {
//						cntrFound[j].x2 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].y2 - circFound[i].y1),2) );
//					}
//				} else {
//					if (moveVertical == true) {
//						// find x
//						if (oldCntr.x2 >= oldCirc.x1) {
//							cntrFound[j].x2 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y2 - circFound[i].y1),2) );
//						} else {
//							cntrFound[j].x2 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.y2 - circFound[i].y1),2) );
//						}
//					} else {
//						// find y
//						if (oldCntr.y2 >= oldCirc.y1) {
//							cntrFound[j].y2 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x2 - circFound[i].x1),2) );
//						} else {
//							cntrFound[j].y2 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((oldCntr.x2 - circFound[i].x1),2) );
//						}
//					}
//				}
//			}
//			
////			if (moveVertical == true) {
////				// if x1 and y1 the circle
////				if ( (Math.pow((oldCntr.x1 - oldCirc.cx),2) + Math.pow((oldCntr.y1 - oldCirc.cy),2)) == Math.pow(oldCirc.r,2) ) {
////					// use x1 to find y1
////					if (oldCntr.y1 >= oldCirc.cy) {
////						calculateYOnCirc
////						cntrFound[j].y1 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].x1 - circFound[i].x1),2) );
////					} else {
////						cntrFound[j].y1 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].x1 - circFound[i].x1),2) );
////					}
////				}
////				// if x2 and y2 the circle
////				if ( (Math.pow((oldCntr.x2 - oldCirc.cx),2) + Math.pow((oldCntr.y2 - oldCirc.cy),2)) == Math.pow(oldCirc.r,2) ) {
////					// use x2 to find y2
////					if (oldCntr.y2 >= oldCirc.cy) {
////						cntrFound[j].y2 = circFound[i].y1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].x2 - circFound[i].x1),2) );
////					} else {
////						cntrFound[j].y2 = circFound[i].y1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].x2 - circFound[i].x1),2) );
////					}
////				}
////			} else {
////				// if x1 and y1 the circle
////				if ( (Math.pow((oldCntr.x1 - oldCirc.cx),2) + Math.pow((oldCntr.y1 - oldCirc.cy),2)) == Math.pow(oldCirc.r,2) ) {
////					// use y1 to find x1
////					if (oldCntr.x1 >= oldCirc.cx) {
////						cntrFound[j].x1 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].y1 - circFound[i].y1),2) );
////					} else {
////						cntrFound[j].x1 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].y1 - circFound[i].y1),2) );
////					}
////				}
////				// if x2 and y2 the circle
////				if ( (Math.pow((oldCntr.x2 - oldCirc.cx),2) + Math.pow((oldCntr.y2 - oldCirc.cy),2)) == Math.pow(oldCirc.r,2) ) {
////					// use y2 to find x2
////					if (oldCntr.x2 >= oldCirc.cx) {
////						cntrFound[j].x2 = circFound[i].x1 + Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].y2 - circFound[i].y1),2) );
////					} else {
////						cntrFound[j].x2 = circFound[i].x1 - Math.sqrt( Math.pow(circFound[i].r,2) - Math.pow((cntrFound[j].y2 - circFound[i].y1),2) );
////					}
////				}
////			}
//			
//			if (cntrFound[j].groupShapeParent == circFound[i].group) {
//				cntrFound[j].r = circFound[i].r;
//			}
//		}
//	}
//	
//	for (var i = 0; i < cntrFound.length; i++) {
//		shape = $("#" + cntrFound[i].id);
//		if (!cntrFound[i].r) {
//			shape.attr({x1:cntrFound[i].x1, x2:cntrFound[i].x2, y1:cntrFound[i].y1, y2:cntrFound[i].y2});
//			oldCntrFound[i].x1 = cntrFound[i].x1;
//			oldCntrFound[i].y1 = cntrFound[i].y1;
//			oldCntrFound[i].x2 = cntrFound[i].x2;
//			oldCntrFound[i].y2 = cntrFound[i].y2;
//		} else {
//			if (cntrFound[i].largeArcFlag == false) {
//				var d = 'M' + cntrFound[i].x1 + ' ' + cntrFound[i].y1 + ' A ' + cntrFound[i].r + ' ' + cntrFound[i].r + ' 0 0 0 ' + cntrFound[i].x2 + ' ' + cntrFound[i].y2;
//				shape.attr({d:d});
//			} else {
//				var d = 'M' + cntrFound[i].x1 + ' ' + cntrFound[i].y1 + ' A ' + cntrFound[i].r + ' ' + cntrFound[i].r + ' 0 1 0 ' + cntrFound[i].x2 + ' ' + cntrFound[i].y2;
//				shape.attr({d:d});
//			}
//			oldCntrFound[i].x1 = cntrFound[i].x1;
//			oldCntrFound[i].y1 = cntrFound[i].y1;
//			oldCntrFound[i].x2 = cntrFound[i].x2;
//			oldCntrFound[i].y2 = cntrFound[i].y2;
//			oldCntrFound[i].r = cntrFound[i].r;
//		}
//	}
//	
//	for (var i = 0; i < circFound.length; i++) {
//		oldCircFound[i].x1 = circFound[i].x1;
//		oldCircFound[i].y1 = circFound[i].y1;
//		oldCircFound[i].x2 = circFound[i].x2;
//		oldCircFound[i].y2 = circFound[i].y2;
//		oldCircFound[i].r = circFound[i].r;	
//	}
	
//	for (var i = 0; cntrFound.length; i++) {
//		
//		var new_x1 = null;
//		var new_y1 = null;
//		var new_x2 = null;
//		var new_y2 = null;
//		var new_r = null;
//		
//		for (var j = 0; j < elementFound.length; k++) {
//			var isVertical = true;
//			var oldElement = getVerticalElementByUid(elementFound[j].uid);
//			if (oldElement == null) {
//				oldElement = getHorizontalElementByUid(elementFound[j].uid);
//				isVertical = false;
//			}
//			if (isVertical == true) {
//				if (cntrFound[i].x1 == oldElement.val) {
//					new_x1 = elementFound[j].val;
//				}
//				if (cntrFound[i].x2 == oldElement.val) {
//					new_x2 = elementFound[j].val;
//				}
//			} else {
//				if (cntrFound[i].x1 == oldElement.val) {
//					new_y1 = elementFound[j].val;
//				}
//				if (cntrFound[i].x2 == oldElement.val) {
//					new_y2 = elementFound[j].val;
//				}
//			}
//		}
//		
//		for (var j = 0; j < circFound.length; j++) {
//			// find old circ
//			var oldCircle = null;
//			for (var k = 0; k < circs.length; k++) {
//				if (circFound[j].group == circs[k].group) {
//					oldCircle = circs[k];
//					break;
//				}
//			}
//			
//			if (cntrFound[i].r) {
//				if (cntrFound[i].groupShapeParent == oldCircle.group) {
//					// find connected line contour
//					var previousLineCntr = null;
//					var afterLineCntr = null;
//					for (var k = 0; k < cntrFound.length; k++) {
//						if (!cntrFound[k].r) {
//							if ((cntrFound[i].x1 == cntrFound[k].x1) && (cntrFound[i].y1 == cntrFound[k].y1)) {
//								previousLineCntr = cntrFound[k];
//							}
//							if ((cntrFound[i].x2 == cntrFound[k].x2) && (cntrFound[i].y2 == cntrFound[k].y2)) {
//								afterLineCntr = cntrFound[k];
//							}
//						}
//					}
//					
//					var isParentVertical = true;
//					var previousParentLine = getVerticalElementByUid(previousLineCntr.parent);
//					if (previousParentLine == null) {
//						previousParentLine = getHorizontalElementByUid(elementFound[j].uid);
//						isParentVertical = false;
//					}
//					if (isParentVertical == true) {
//						if (previousParentLine.uid == elementFound[j].uid) {
//							asd
//						}
//						new_x1 = ;
//					} else {
//						new_y1 = ;
//					}
//					
//					
//					
//					
//					new_x1 = ;
//					new_y1 = ;
//					new_x2 = ;
//					new_y2 = ;
//					new_r = ;
//				}
//			}	
//		}
//
//		
//		
//		
//		
//		if (new_x1 == null) {
//			new_x1 = cntrFound[i].x1;
//		}
//		if (new_y1 == null) {
//			new_y1 = cntrFound[i].y1;
//		}
//		if (new_x2 == null) {
//			new_x2 = cntrFound[i].x2;
//		}
//		if (new_y2 == null) {
//			new_y2 = cntrFound[i].y2;
//		}
//		
//		cntrFound[i].x1 = new_x1;
//		cntrFound[i].y1 = new_y1;
//		cntrFound[i].x2 = new_x2;
//		cntrFound[i].y2 = new_y2;
//		
//	}
//
//	
//	for (var i = 0; cntrFound.length; i++) {
//		if (cntrFound[i].r) {
//			asd
//		}
//		
//		
//		
//		
//		
//		
//		for (var j = 0; j < circFound.length; j++) {
//			// find old circ
//			var oldCircle = null;
//			for (var k = 0; k < circs.length; k++) {
//				if (circFound[j].group == circs[k].group) {
//					oldCircle = circs[k];
//					break;
//				}
//			}
//			
//			if (cntrFound[i].r) {
//				if (cntrFound[i].groupShapeParent == oldCircle.group) {
//					// find connected line contour
//					var previousLineCntr = null;
//					var afterLineCntr = null;
//					for (var k = 0; k < cntrFound.length; k++) {
//						if (!cntrFound[k].r) {
//							if ((cntrFound[i].x1 == cntrFound[k].x1) && (cntrFound[i].y1 == cntrFound[k].y1)) {
//								previousLineCntr = cntrFound[k];
//							}
//							if ((cntrFound[i].x2 == cntrFound[k].x2) && (cntrFound[i].y2 == cntrFound[k].y2)) {
//								afterLineCntr = cntrFound[k];
//							}
//						}
//					}
//					
//					var isParentVertical = true;
//					var previousParentLine = getVerticalElementByUid(previousLineCntr.parent);
//					if (previousParentLine == null) {
//						previousParentLine = getHorizontalElementByUid(elementFound[j].uid);
//						isParentVertical = false;
//					}
//					if (isParentVertical == true) {
//						if (previousParentLine.uid == elementFound[j].uid) {
//							asd
//						}
//						new_x1 = ;
//					} else {
//						new_y1 = ;
//					}
//					
//					
//					
//					
//					
//					new_x1 = ;
//					new_y1 = ;
//					new_x2 = ;
//					new_y2 = ;
//					new_r = ;
//				}
//			}	
//		}
//	}
//		
//	for (var i = 0; cntrFound.length; i++) {
//		shape = $("#" + cntrFound[i].id);
//		if (!cntrFound[i].r) {
//			shape.attr({x1:cntrFound[i].x1, x2:cntrFound[i].x2, y1:cntrFound[i].y1, y2:cntrFound[i].y2});
//		} else {
//			if (cntrFound[i].largeArcFlag == false) {
//				var d = 'M' + cntrFound[i].x1 + ' ' + cntrFound[i].y1 + ' A ' + cntrFound[i].r + ' ' + cntrFound[i].r + ' 0 0 0 ' + cntrFound[i].x2 + ' ' + cntrFound[i].y2;
//				shape.attr({d:d});
//			} else {
//				var d = 'M' + cntrFound[i].x1 + ' ' + cntrFound[i].y1 + ' A ' + cntrFound[i].r + ' ' + cntrFound[i].r + ' 0 1 0 ' + cntrFound[i].x2 + ' ' + cntrFound[i].y2;
//				shape.attr({d:d});
//			}
//		}
//	}	
	
//	for (var i = 0; i < elementFound.length; i++) {
//		var isVertical = true;
//		var oldElement = getVerticalElementByUid(elementFound[i].uid);
//		if (oldElement == null) {
//			oldElement = getHorizontalElementByUid(elementFound[i].uid);
//			isVertical = false;
//		} 
//		
//		var newLineCntrs = [];
//		var oldLineCntrs = [];
//		for (var j = 0; j < cntrFound.length; j++) {
//			if (!cntrFound[j].r) {
//				
//				var newLineCntr = {};
//				var oldLineCntr = {};
//				if (isVertical == true) {
//					if (oldElement.val == cntrFound[j].x1) {
//						newLineCntr.x1 = elementFound[i].val;
//					} else {
//						newLineCntr.x1 = cntrFound[j].x1;
//					}
//					if (oldElement.val == cntrFound[j].x2) {
//						newLineCntr.x2 = elementFound[i].val;
//					} else {
//						newLineCntr.x2 = cntrFound[j].x2;
//					}
//					newLineCntr.y1 = cntrFound[j].y1;
//					newLineCntr.y2 = cntrFound[j].y2;
//				} else {
//					if (oldElement.val == cntrFound[j].y1) {
//						newLineCntr.y1 = elementFound[i].val;
//					} else {
//						newLineCntr.y1 = cntrFound[j].y1;
//					}
//					if (oldElement.val == cntrFound[j].y2) {
//						newLineCntr.y2 = elementFound[i].val;
//					} else {
//						newLineCntr.y2 = cntrFound[j].y2;
//					}
//					newLineCntr.x1 = cntrFound[j].x1;
//					newLineCntr.x2 = cntrFound[j].x2;
//				}
//				newLineCntr.id = cntrFound[j].id;
//				newLineCntrs.push(newLineCntr);
//
//				oldLineCntr.x1 = cntrFound[j].x1;
//				oldLineCntr.x2 = cntrFound[j].x2;
//				oldLineCntr.y1 = cntrFound[j].y1;
//				oldLineCntr.y2 = cntrFound[j].y2;
//				oldLineCntrs.push(oldLineCntr);
//				
//			}
//		}
//		
//		var newArcCntrs = [];
//		for (var j = 0; j < cntrFound.length; j++) {
//			
//			if (cntrFound[j].r) {
//				var newArcCntr = {};
//				for (var k = 0; k < oldLineCntrs.length; k++) {
//					if ((cntrFound[j].x1 == oldLineCntrs[k].x1) && (cntrFound[j].y1 == oldLineCntrs[k].y1)) {
//						
//						if (isVertical == true) {
//							if (oldElement.val == cntrFound[j].x1) {
//								newArcCntr.x1 = elementFound[i].val;
//							} else {
//								newArcCntr.x1 = cntrFound[j].x1;
//							}
//							if (oldElement.val == cntrFound[j].x2) {
//								newArcCntr.x2 = elementFound[i].val;
//							} else {
//								newArcCntr.x2 = cntrFound[j].x2;
//							}
//							
//							var hasCircParentFound = false;
//							var pNew_y1 = null;
//							var nNew_y1 = null;
//							var pDistance1 = null;
//							var nDistance1 = null;
//							var pNew_y2 = null;
//							var nNew_y2 = null;
//							var pDistance2 = null;
//							var nDistance2 = null;
//							for (var k = 0; k < circFound.length; k++) {
//								if (cntrFound[j].groupShapeParent == circFound[k].group) {
//									pNew_y1 = circFound[k].y1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.x1-circFound[k].x1), 2) );
//									nNew_y1 = circFound[k].y1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.x1-circFound[k].x1), 2) );
//									pDistance1 = Math.sqrt( Math.pow((newArcCntr.x1 - cntrFound[j].x1),2) + Math.pow((pNew_y1 - cntrFound[j].y1),2) );
//									nDistance1 = Math.sqrt( Math.pow((newArcCntr.x1 - cntrFound[j].x1),2) + Math.pow((nNew_y1 - cntrFound[j].y1),2) );
//									pNew_y2 = circFound[k].y1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.x2-circFound[k].x1), 2) );
//									nNew_y2 = circFound[k].y1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.x2-circFound[k].x1), 2) );
//									pDistance2 = Math.sqrt( Math.pow((newArcCntr.x2 - cntrFound[j].x1),2) + Math.pow((pNew_y2 - cntrFound[j].y1),2) );
//									nDistance2 = Math.sqrt( Math.pow((newArcCntr.x2 - cntrFound[j].x1),2) + Math.pow((nNew_y2 - cntrFound[j].y1),2) ); 
//									hasCircParentFound = true;
//									newArcCntr.r = circFound[k].r;
//									break;
//								}
//							}
//							if (hasCircParentFound == true) {
//								if (pDistance1 >= nDistance1) {
//									newArcCntr.y1 = pNew_y1;
//								} else {
//									newArcCntr.y1 = nNew_y1;
//								}
//								if (pDistance2 >= nDistance2) {
//									newArcCntr.y2 = pNew_y2;
//								} else {
//									newArcCntr.y2 = nNew_y2;
//								}
//							} else {
//								newArcCntr.y1 = cntrFound[j].y1;
//								newArcCntr.y2 = cntrFound[j].y2;						
//							}
//							newLineCntrs[k].y1 = newArcCntr.y1;
//						} else {
//							if (oldElement.val == cntrFound[j].y1) {
//								newArcCntr.y1 = elementFound[i].val;
//							} else {
//								newArcCntr.y1 = cntrFound[j].y1;
//							}
//							if (oldElement.val == cntrFound[j].y2) {
//								newArcCntr.y2 = elementFound[i].val;
//							} else {
//								newArcCntr.y2 = cntrFound[j].y2;
//							}
//							
//							var hasCircParentFound = false;
//							var pNew_x1 = null;
//							var nNew_x1 = null;
//							var pDistance1 = null;
//							var nDistance1 = null;
//							var pNew_x2 = null;
//							var nNew_x2 = null;
//							var pDistance2 = null;
//							var nDistance2 = null;
//							for (var k = 0; k < circFound.length; k++) {
//								if (cntrFound[j].groupShapeParent == circFound[k].group) {
//									pNew_x1 = circFound[k].x1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.y1-circFound[k].y1), 2) );
//									nNew_x1 = circFound[k].x1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.y1-circFound[k].y1), 2) );
//									pDistance1 = Math.sqrt( Math.pow((pNew_x1 - cntrFound[j].x1),2) + Math.pow((newArcCntr.y1 - cntrFound[j].y1),2) );
//									nDistance1 = Math.sqrt( Math.pow((nNew_x1 - cntrFound[j].x1),2) + Math.pow((newArcCntr.y1 - cntrFound[j].y1),2) );
//									pNew_x2 = circFound[k].x1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.y2-circFound[k].y1), 2) );
//									nNew_x2 = circFound[k].x1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.y2-circFound[k].y1), 2) );
//									pDistance2 = Math.sqrt( Math.pow((pNew_x2 - cntrFound[j].x1),2) + Math.pow((newArcCntr.y2 - cntrFound[j].y1),2) );
//									nDistance2 = Math.sqrt( Math.pow((nNew_x2 - cntrFound[j].x1),2) + Math.pow((newArcCntr.y2 - cntrFound[j].y1),2) ); 
//									hasCircParentFound = true;
//									newArcCntr.r = circFound[k].r;
//									break;
//								}
//							}
//							if (hasCircParentFound == true) {
//								if (pDistance1 >= nDistance1) {
//									newArcCntr.x1 = pNew_x1;
//								} else {
//									newArcCntr.x1 = nNew_x1;
//								}
//								if (pDistance2 >= nDistance2) {
//									newArcCntr.x2 = pNew_x2;
//								} else {
//									newArcCntr.x2 = nNew_x2;
//								}
//							} else {
//								newArcCntr.x1 = cntrFound[j].x1;
//								newArcCntr.x2 = cntrFound[j].x2;						
//							}
//							newLineCntrs[k].x1 = newArcCntr.x1;
//						}
//						break;
//											
////						newArcCntr.x1 = newLineCntrs[k].x1;
////						newArcCntr.y1 = newLineCntrs[k].y1;
////						
////						if (isVertical == true) {
////							
////							
////							if (oldElement.val == cntrFound[j].x2) {
////								newArcCntr.x2 = elementFound[i].val;
////							} else {
////								newArcCntr.x2 = cntrFound[j].x2;
////							}
////							
////							var hasCircParentFound = false;
////							var pNew_y2 = null;
////							var nNew_y2 = null;
////							var pDistance2 = null;
////							var nDistance2 = null;
////							for (var k = 0; k < circFound.length; k++) {
////								if (cntrFound[j].groupShapeParent == circFound[k].group) {
////									pNew_y2 = circFound[k].y1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.x2-circFound[k].x1), 2) );
////									nNew_y2 = circFound[k].y1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.x2-circFound[k].x1), 2) );
////									pDistance2 = Math.sqrt( Math.pow((newArcCntr.x2 - cntrFound[j].x1),2) + Math.pow((pNew_y2 - cntrFound[j].y1),2) );
////									nDistance2 = Math.sqrt( Math.pow((newArcCntr.x2 - cntrFound[j].x1),2) + Math.pow((nNew_y2 - cntrFound[j].y1),2) ); 
////									hasCircParentFound = true;
////									newArcCntr.r = circFound[k].r;
////									break;
////								}
////							}
////							if (hasCircParentFound == true) {
////								if (pDistance2 >= nDistance2) {
////									newArcCntr.y2 = pNew_y2;
////								} else {
////									newArcCntr.y2 = nNew_y2;
////								}
////							} else {
////								newArcCntr.y2 = cntrFound[j].y2;						
////							}
////						} else {
////							if (oldElement.val == cntrFound[j].x2) {
////								newArcCntr.y2 = elementFound[i].val;
////							} else {
////								newArcCntr.y2 = cntrFound[j].x2;
////							}
////							
////							var hasCircParentFound = false;
////							var pNew_x2 = null;
////							var nNew_x2 = null;
////							var pDistance2 = null;
////							var nDistance2 = null;
////							for (var k = 0; k < circFound.length; k++) {
////								if (cntrFound[j].groupShapeParent == circFound[k].group) {
////									pNew_x2 = circFound[k].x1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.y2-circFound[k].y1), 2) );
////									nNew_x2 = circFound[k].x1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.y2-circFound[k].y1), 2) );
////									pDistance2 = Math.sqrt( Math.pow((pNew_x2 - cntrFound[j].x1),2) + Math.pow((newArcCntr.y2 - cntrFound[j].y1),2) );
////									nDistance2 = Math.sqrt( Math.pow((nNew_x2 - cntrFound[j].x1),2) + Math.pow((newArcCntr.y2 - cntrFound[j].y1),2) ); 
////									hasCircParentFound = true;
////									newArcCntr.r = circFound[k].r;
////									break;
////								}
////							}
////							if (hasCircParentFound == true) {
////								if (pDistance2 >= nDistance2) {
////									newArcCntr.x2 = pNew_x2;
////								} else {
////									newArcCntr.x2 = nNew_x2;
////								}
////							} else {
////								newArcCntr.x2 = cntrFound[j].x2;						
////							}
////						}
////						break;
//			
//					} else if ((cntrFound[j].x2 == oldLineCntrs[k].x2) && (cntrFound[j].y2 == oldLineCntrs[k].y2)) {
//						
//						if (isVertical == true) {
//							if (oldElement.val == cntrFound[j].x1) {
//								newArcCntr.x1 = elementFound[i].val;
//							} else {
//								newArcCntr.x1 = cntrFound[j].x1;
//							}
//							if (oldElement.val == cntrFound[j].x2) {
//								newArcCntr.x2 = elementFound[i].val;
//							} else {
//								newArcCntr.x2 = cntrFound[j].x2;
//							}
//							
//							var hasCircParentFound = false;
//							var pNew_y1 = null;
//							var nNew_y1 = null;
//							var pDistance1 = null;
//							var nDistance1 = null;
//							var pNew_y2 = null;
//							var nNew_y2 = null;
//							var pDistance2 = null;
//							var nDistance2 = null;
//							for (var k = 0; k < circFound.length; k++) {
//								if (cntrFound[j].groupShapeParent == circFound[k].group) {
//									pNew_y1 = circFound[k].y1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.x1-circFound[k].x1), 2) );
//									nNew_y1 = circFound[k].y1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.x1-circFound[k].x1), 2) );
//									pDistance1 = Math.sqrt( Math.pow((newArcCntr.x1 - cntrFound[j].x1),2) + Math.pow((pNew_y1 - cntrFound[j].y1),2) );
//									nDistance1 = Math.sqrt( Math.pow((newArcCntr.x1 - cntrFound[j].x1),2) + Math.pow((nNew_y1 - cntrFound[j].y1),2) );
//									pNew_y2 = circFound[k].y1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.x2-circFound[k].x1), 2) );
//									nNew_y2 = circFound[k].y1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.x2-circFound[k].x1), 2) );
//									pDistance2 = Math.sqrt( Math.pow((newArcCntr.x2 - cntrFound[j].x1),2) + Math.pow((pNew_y2 - cntrFound[j].y1),2) );
//									nDistance2 = Math.sqrt( Math.pow((newArcCntr.x2 - cntrFound[j].x1),2) + Math.pow((nNew_y2 - cntrFound[j].y1),2) ); 
//									hasCircParentFound = true;
//									newArcCntr.r = circFound[k].r;
//									break;
//								}
//							}
//							if (hasCircParentFound == true) {
//								if (pDistance1 >= nDistance1) {
//									newArcCntr.y1 = pNew_y1;
//								} else {
//									newArcCntr.y1 = nNew_y1;
//								}
//								if (pDistance2 >= nDistance2) {
//									newArcCntr.y2 = pNew_y2;
//								} else {
//									newArcCntr.y2 = nNew_y2;
//								}
//							} else {
//								newArcCntr.y1 = cntrFound[j].y1;
//								newArcCntr.y2 = cntrFound[j].y2;						
//							}
//							
//							newLineCntrs[k].y2 = newArcCntr.y2;
//							
//						} else {
//							if (oldElement.val == cntrFound[j].y1) {
//								newArcCntr.y1 = elementFound[i].val;
//							} else {
//								newArcCntr.y1 = cntrFound[j].y1;
//							}
//							if (oldElement.val == cntrFound[j].y2) {
//								newArcCntr.y2 = elementFound[i].val;
//							} else {
//								newArcCntr.y2 = cntrFound[j].y2;
//							}
//							
//							var hasCircParentFound = false;
//							var pNew_x1 = null;
//							var nNew_x1 = null;
//							var pDistance1 = null;
//							var nDistance1 = null;
//							var pNew_x2 = null;
//							var nNew_x2 = null;
//							var pDistance2 = null;
//							var nDistance2 = null;
//							for (var k = 0; k < circFound.length; k++) {
//								if (cntrFound[j].groupShapeParent == circFound[k].group) {
//									pNew_x1 = circFound[k].x1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.y1-circFound[k].y1), 2) );
//									nNew_x1 = circFound[k].x1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.y1-circFound[k].y1), 2) );
//									pDistance1 = Math.sqrt( Math.pow((pNew_x1 - cntrFound[j].x1),2) + Math.pow((newArcCntr.y1 - cntrFound[j].y1),2) );
//									nDistance1 = Math.sqrt( Math.pow((nNew_x1 - cntrFound[j].x1),2) + Math.pow((newArcCntr.y1 - cntrFound[j].y1),2) );
//									pNew_x2 = circFound[k].x1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.y2-circFound[k].y1), 2) );
//									nNew_x2 = circFound[k].x1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.y2-circFound[k].y1), 2) );
//									pDistance2 = Math.sqrt( Math.pow((pNew_x2 - cntrFound[j].x1),2) + Math.pow((newArcCntr.y2 - cntrFound[j].y1),2) );
//									nDistance2 = Math.sqrt( Math.pow((nNew_x2 - cntrFound[j].x1),2) + Math.pow((newArcCntr.y2 - cntrFound[j].y1),2) ); 
//									hasCircParentFound = true;
//									newArcCntr.r = circFound[k].r;
//									break;
//								}
//							}
//							if (hasCircParentFound == true) {
//								if (pDistance1 >= nDistance1) {
//									newArcCntr.x1 = pNew_x1;
//								} else {
//									newArcCntr.x1 = nNew_x1;
//								}
//								if (pDistance2 >= nDistance2) {
//									newArcCntr.x2 = pNew_x2;
//								} else {
//									newArcCntr.x2 = nNew_x2;
//								}
//							} else {
//								newArcCntr.x1 = cntrFound[j].x1;
//								newArcCntr.x2 = cntrFound[j].x2;						
//							}
//							newLineCntrs[k].x2 = newArcCntr.x2;
//						}
//						
//						break;
//						
////						newArcCntr.x2 = newLineCntrs[k].x2;
////						newArcCntr.y2 = newLineCntrs[k].y2;
////						
////						if (isVertical == true) {
////							if (oldElement.val == cntrFound[j].x2) {
////								newArcCntr.x1 = elementFound[i].val;
////							} else {
////								newArcCntr.x1 = cntrFound[j].x1;
////							}
////							
////							var hasCircParentFound = false;
////							var pNew_y1 = null;
////							var nNew_y1 = null;
////							var pDistance1 = null;
////							var nDistance1 = null;
////							for (var k = 0; k < circFound.length; k++) {
////								if (cntrFound[j].groupShapeParent == circFound[k].group) {
////									pNew_y1 = circFound[k].y1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.x1-circFound[k].x1), 2) );
////									nNew_y1 = circFound[k].y1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.x1-circFound[k].x1), 2) );
////									pDistance1 = Math.sqrt( Math.pow((newArcCntr.x1 - cntrFound[j].x1),2) + Math.pow((pNew_y1 - cntrFound[j].y1),2) );
////									nDistance1 = Math.sqrt( Math.pow((newArcCntr.x1 - cntrFound[j].x1),2) + Math.pow((nNew_y1 - cntrFound[j].y1),2) ); 
////									hasCircParentFound = true;
////									newArcCntr.r = circFound[k].r;
////									break;
////								}
////							}
////							if (hasCircParentFound == true) {
////								if (pDistance1 >= nDistance1) {
////									newArcCntr.y1 = pNew_y1;
////								} else {
////									newArcCntr.y1 = nNew_y1;
////								}
////							} else {
////								newArcCntr.y1 = cntrFound[j].y1;						
////							}
////						} else {
////							if (oldElement.val == cntrFound[j].x2) {
////								newArcCntr.y1 = elementFound[i].val;
////							} else {
////								newArcCntr.y1 = cntrFound[j].x1;
////							}
////							
////							var hasCircParentFound = false;
////							var pNew_x1 = null;
////							var nNew_x1 = null;
////							var pDistance1 = null;
////							var nDistance1 = null;
////							for (var k = 0; k < circFound.length; k++) {
////								if (cntrFound[j].groupShapeParent == circFound[k].group) {
////									pNew_x1 = circFound[k].x1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.y1-circFound[k].y1), 2) );
////									nNew_x1 = circFound[k].x1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.y1-circFound[k].y1), 2) );
////									pDistance1 = Math.sqrt( Math.pow((pNew_x1 - cntrFound[j].x1),2) + Math.pow((newArcCntr.y1 - cntrFound[j].y1),2) );
////									nDistance1 = Math.sqrt( Math.pow((nNew_x1 - cntrFound[j].x1),2) + Math.pow((newArcCntr.y1 - cntrFound[j].y1),2) ); 
////									hasCircParentFound = true;
////									newArcCntr.r = circFound[k].r;
////									break;
////								}
////							}
////							if (hasCircParentFound == true) {
////								if (pDistance1 >= nDistance1) {
////									newArcCntr.x1 = pNew_x1;
////								} else {
////									newArcCntr.x1 = nNew_x1;
////								}
////							} else {
////								newArcCntr.x1 = cntrFound[j].x1;						
////							}
////						}
////						break;
//
//					} else {
//									
//						if (isVertical == true) {
//							if (oldElement.val == cntrFound[j].x1) {
//								newArcCntr.x1 = elementFound[i].val;
//							} else {
//								newArcCntr.x1 = cntrFound[j].x1;
//							}
//							if (oldElement.val == cntrFound[j].x2) {
//								newArcCntr.x2 = elementFound[i].val;
//							} else {
//								newArcCntr.x2 = cntrFound[j].x2;
//							}
//							
//							var hasCircParentFound = false;
//							var pNew_y1 = null;
//							var nNew_y1 = null;
//							var pDistance1 = null;
//							var nDistance1 = null;
//							var pNew_y2 = null;
//							var nNew_y2 = null;
//							var pDistance2 = null;
//							var nDistance2 = null;
//							for (var k = 0; k < circFound.length; k++) {
//								if (cntrFound[j].groupShapeParent == circFound[k].group) {
//									pNew_y1 = circFound[k].y1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.x1-circFound[k].x1), 2) );
//									nNew_y1 = circFound[k].y1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.x1-circFound[k].x1), 2) );
//									pDistance1 = Math.sqrt( Math.pow((newArcCntr.x1 - cntrFound[j].x1),2) + Math.pow((pNew_y1 - cntrFound[j].y1),2) );
//									nDistance1 = Math.sqrt( Math.pow((newArcCntr.x1 - cntrFound[j].x1),2) + Math.pow((nNew_y1 - cntrFound[j].y1),2) );
//									pNew_y2 = circFound[k].y1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.x2-circFound[k].x1), 2) );
//									nNew_y2 = circFound[k].y1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.x2-circFound[k].x1), 2) );
//									pDistance2 = Math.sqrt( Math.pow((newArcCntr.x2 - cntrFound[j].x1),2) + Math.pow((pNew_y2 - cntrFound[j].y1),2) );
//									nDistance2 = Math.sqrt( Math.pow((newArcCntr.x2 - cntrFound[j].x1),2) + Math.pow((nNew_y2 - cntrFound[j].y1),2) ); 
//									hasCircParentFound = true;
//									newArcCntr.r = circFound[k].r;
//									break;
//								}
//							}
//							if (hasCircParentFound == true) {
//								if (pDistance1 >= nDistance1) {
//									newArcCntr.y1 = pNew_y1;
//								} else {
//									newArcCntr.y1 = nNew_y1;
//								}
//								if (pDistance2 >= nDistance2) {
//									newArcCntr.y2 = pNew_y2;
//								} else {
//									newArcCntr.y2 = nNew_y2;
//								}
//							} else {
//								newArcCntr.y1 = cntrFound[j].y1;
//								newArcCntr.y2 = cntrFound[j].y2;						
//							}
//							
//						} else {
//							if (oldElement.val == cntrFound[j].y1) {
//								newArcCntr.y1 = elementFound[i].val;
//							} else {
//								newArcCntr.y1 = cntrFound[j].y1;
//							}
//							if (oldElement.val == cntrFound[j].y2) {
//								newArcCntr.y2 = elementFound[i].val;
//							} else {
//								newArcCntr.y2 = cntrFound[j].y2;
//							}
//							
//							var hasCircParentFound = false;
//							var pNew_x1 = null;
//							var nNew_x1 = null;
//							var pDistance1 = null;
//							var nDistance1 = null;
//							var pNew_x2 = null;
//							var nNew_x2 = null;
//							var pDistance2 = null;
//							var nDistance2 = null;
//							for (var k = 0; k < circFound.length; k++) {
//								if (cntrFound[j].groupShapeParent == circFound[k].group) {
//									pNew_x1 = circFound[k].x1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.y1-circFound[k].y1), 2) );
//									nNew_x1 = circFound[k].x1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.y1-circFound[k].y1), 2) );
//									pDistance1 = Math.sqrt( Math.pow((pNew_x1 - cntrFound[j].x1),2) + Math.pow((newArcCntr.y1 - cntrFound[j].y1),2) );
//									nDistance1 = Math.sqrt( Math.pow((nNew_x1 - cntrFound[j].x1),2) + Math.pow((newArcCntr.y1 - cntrFound[j].y1),2) );
//									pNew_x2 = circFound[k].x1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.y2-circFound[k].y1), 2) );
//									nNew_x2 = circFound[k].x1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((newArcCntr.y2-circFound[k].y1), 2) );
//									pDistance2 = Math.sqrt( Math.pow((pNew_x2 - cntrFound[j].x1),2) + Math.pow((newArcCntr.y2 - cntrFound[j].y1),2) );
//									nDistance2 = Math.sqrt( Math.pow((nNew_x2 - cntrFound[j].x1),2) + Math.pow((newArcCntr.y2 - cntrFound[j].y1),2) ); 
//									hasCircParentFound = true;
//									newArcCntr.r = circFound[k].r;
//									break;
//								}
//							}
//							if (hasCircParentFound == true) {
//								if (pDistance1 >= nDistance1) {
//									newArcCntr.x1 = pNew_x1;
//								} else {
//									newArcCntr.x1 = nNew_x1;
//								}
//								if (pDistance2 >= nDistance2) {
//									newArcCntr.x2 = pNew_x2;
//								} else {
//									newArcCntr.x2 = nNew_x2;
//								}
//							} else {
//								newArcCntr.x1 = cntrFound[j].x1;
//								newArcCntr.x2 = cntrFound[j].x2;						
//							}
//						}
//						break;
//					}
//				}
//				
//				newArcCntr.id = cntrFound[j].id;
//				newArcCntr.largeArcFlag = cntrFound[j].largeArcFlag;
//				newArcCntrs.push(newArcCntr);
//			
//			}
//			
//		}
//		
//		for (var j = 0; j < newLineCntrs.length; j++) {
//			var shape = $("#" + newLineCntrs[j].id)
//			shape.attr({x1: newLineCntrs[j].x1, x2:newLineCntrs[j].x2, y1:newLineCntrs[j].y1, y2:newLineCntrs[j].y2});	
//		}
//		
//		for (var j = 0; j < newArcCntrs.length; j++) {
//			var shape = $("#" + newArcCntrs[j].id)
//			if (newArcCntrs[j].largeArcFlag == false) {
//				var d = 'M' + newArcCntrs[j].x1 + ' ' + newArcCntrs[j].y1 + ' A ' + newArcCntrs[j].r + ' ' + newArcCntrs[j].r + ' 0 0 0 ' + newArcCntrs[j].x2 + ' ' + newArcCntrs[j].y2;
//				shape.attr({d:d});
//			} else {
//				var d = 'M' + newArcCntrs[j].x1 + ' ' + newArcCntrs[j].y1 + ' A ' + newArcCntrs[j].r + ' ' + newArcCntrs[j].r + ' 0 1 0 ' + newArcCntrs[j].x2 + ' ' + newArcCntrs[j].y2;
//				shape.attr({d:d});
//			}
//		}
//	
////		var new_x1 = null;
////		var new_y1 = null;
////		var new_x2 = null;
////		var new_y2 = null;
////		var new_r = null;
//////		var new_largeArcFlag = null;
////		var shape = null;
////		for (var j = 0; j < cntrFound.length; j++) {
////			shape = $("#" + cntrFound[j].id)
////			
////			if (cntrFound[j].r) {
////				
////				if (isVertical == true) {
////					if (oldElement.val == cntrFound[j].x1) {
////						new_x1 = elementFound[i].val;
////					} else {
////						new_x1 == cntrFound[j].x1;
////					}
////					if (oldElement.val == cntrFound[j].x2) {
////						new_x2 = elementFound[i].val;
////					} else {
////						new_x2 = cntrFound[j].x2;
////					}
////					
////					var hasCircParentFound = false;
////					var pNew_y1 = null;
////					var nNew_y1 = null;
////					var pDistance1 = null;
////					var nDistance1 = null;
////					var pNew_y2 = null;
////					var nNew_y2 = null;
////					var pDistance2 = null;
////					var nDistance2 = null;
////					for (var k = 0; k < circFound.length; k++) {
////						if (cntrFound[j].groupShapeParent == circFound[k].group) {
////							pNew_y1 = circFound[k].y1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((new_x1-circFound[k].x1), 2) );
////							nNew_y1 = circFound[k].y1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((new_x1-circFound[k].x1), 2) );
////							pDistance1 = Math.sqrt( Math.pow((new_x1 - cntrFound[j].x1),2) + Math.pow((pNew_y1 - cntrFound[j].y1),2) );
////							nDistance1 = Math.sqrt( Math.pow((new_x1 - cntrFound[j].x1),2) + Math.pow((nNew_y1 - cntrFound[j].y1),2) );
////							pNew_y2 = circFound[k].y1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((new_x2-circFound[k].x1), 2) );
////							nNew_y2 = circFound[k].y1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((new_x2-circFound[k].x1), 2) );
////							pDistance2 = Math.sqrt( Math.pow((new_x2 - cntrFound[j].x1),2) + Math.pow((pNew_y2 - cntrFound[j].y1),2) );
////							nDistance2 = Math.sqrt( Math.pow((new_x2 - cntrFound[j].x1),2) + Math.pow((nNew_y2 - cntrFound[j].y1),2) ); 
////							hasCircParentFound = true;
////							new_r = circFound[k].r;
////							break;
////						}
////					}
////					if (hasCircParentFound == true) {
////						if (pDistance1 >= nDistance1) {
////							new_y1 = pNew_y1;
////						} else {
////							new_y1 = nNew_y1;
////						}
////						if (pDistance2 >= nDistance2) {
////							new_y2 = pNew_y2;
////						} else {
////							new_y2 = nNew_y2;
////						}
////					} else {
////						new_y1 = cntrFound[j].y1;
////						new_y2 = cntrFound[j].y2;						
////					}
////					
////				} else {
////					if (oldElement.val == cntrFound[j].y1) {
////						new_y1 = elementFound[i].val;
////					} else {
////						new_y1 = cntrFound[j].y1;
////					}
////					if (oldElement.val == cntrFound[j].y2) {
////						new_y2 = elementFound[i].val;
////					} else {
////						new_y2 = cntrFound[j].y2;
////					}
////					
////					var hasCircParentFound = false;
////					var pNew_y1 = null;
////					var nNew_y1 = null;
////					var pDistance1 = null;
////					var nDistance1 = null;
////					var pNew_y2 = null;
////					var nNew_y2 = null;
////					var pDistance2 = null;
////					var nDistance2 = null;
////					for (var k = 0; k < circFound.length; k++) {
////						if (cntrFound[j].groupShapeParent == circFound[k].group) {
////							pNew_y1 = circFound[k].y1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((new_x1-circFound[k].x1), 2) );
////							nNew_y1 = circFound[k].y1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((new_x1-circFound[k].x1), 2) );
////							pDistance1 = Math.sqrt( Math.pow((new_x1 - cntrFound[j].x1),2) + Math.pow((pNew_y1 - cntrFound[j].y1),2) );
////							nDistance1 = Math.sqrt( Math.pow((new_x1 - cntrFound[j].x1),2) + Math.pow((nNew_y1 - cntrFound[j].y1),2) );
////							pNew_y2 = circFound[k].y1 + Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((new_x2-circFound[k].x1), 2) );
////							nNew_y2 = circFound[k].y1 - Math.sqrt( Math.pow(circFound[k].r, 2) - Math.pow((new_x2-circFound[k].x1), 2) );
////							pDistance2 = Math.sqrt( Math.pow((new_x2 - cntrFound[j].x1),2) + Math.pow((pNew_y2 - cntrFound[j].y1),2) );
////							nDistance2 = Math.sqrt( Math.pow((new_x2 - cntrFound[j].x1),2) + Math.pow((nNew_y2 - cntrFound[j].y1),2) ); 
////							hasCircParentFound = true;
////							new_r = circFound[k].r;
////							break;
////						}
////					}
////					if (hasCircParentFound == true) {
////						if (pDistance1 >= nDistance1) {
////							new_y1 = pNew_y1;
////						} else {
////							new_y1 = nNew_y1;
////						}
////						if (pDistance2 >= nDistance2) {
////							new_y2 = pNew_y2;
////						} else {
////							new_y2 = nNew_y2;
////						}
////					} else {
////						new_y1 = cntrFound[j].y1;
////						new_y2 = cntrFound[j].y2;						
////					}
////				}
////				
////			} else {
////				if (isVertical == true) {
////					if (oldElement.val == cntrFound[j].x1) {
////						new_x1 = elementFound[i].val;
////					} else {
////						new_x1 == cntrFound[j].x1;
////					}
////					if (oldElement.val == cntrFound[j].x2) {
////						new_x2 = elementFound[i].val;
////					} else {
////						new_x2 = cntrFound[j].x2;
////					}
////					new_y1 = cntrFound[j].y1;
////					new_y2 = cntrFound[j].y2;
////				} else {
////					if (oldElement.val == cntrFound[j].y1) {
////						new_y1 = elementFound[i].val;
////					} else {
////						new_y1 = cntrFound[j].y1;
////					}
////					if (oldElement.val == cntrFound[j].y2) {
////						new_y2 = elementFound[i].val;
////					} else {
////						new_y2 = cntrFound[j].y2;
////					}
////					new_x1 = cntrFound[j].x1;
////					new_x2 = cntrFound[j].x2;
////				}
////			}
////						
//////			if (cntrFound[j].largeArcFlag) {
//////				
//////			}
////	
////			if (new_r == null) {
////				shape.attr({x1:new_x1, x2:new_x2, y1:new_y1, y2:new_y2});				
//////				if (new_x1 != null) {
//////					shape.attr({x1:new_x1});
//////				}
//////				if (new_x2 != null) {
//////					shape.attr({x2:new_x2});
//////				}
//////				if (new_y1 != null) {
//////					shape.attr({y1:new_y1});
//////				}
//////				if (new_y2 != null) {
//////					shape.attr({y2:new_y2});
//////				}
////			} else {
////				if (cntrFound[j].largeArcFlag == false) {
////					var d = 'M' + new_x1 + ' ' + new_y1 + ' A ' + new_r + ' ' + new_r + ' 0 0 0 ' + new_x2 + ' ' + new_y2;
////					shape.attr({d:d});
////				} else {
////					var d = 'M' + new_x1 + ' ' + new_y1 + ' A ' + new_r + ' ' + new_r + ' 0 1 0 ' + new_x2 + ' ' + new_y2;
////					shape.attr({d:d});
////				}
////			}
////			
////		}
//	
//	}
	
}

function calculateYOnCirc(a, b, r, x, small) {
	if (small == true) {
		return b - Math.sqrt( Math.pow(r,2) - Math.pow((x-a),2) );
	} else {
		return b + Math.sqrt( Math.pow(r,2) - Math.pow((x-a),2) );
	}
}

function calculateXOnCirc(a, b, r, y, small) {
	if (small == true) {
		return a - Math.sqrt( Math.pow(r,2) - Math.pow((y-b),2) );
	} else {
		return a + Math.sqrt( Math.pow(r,2) - Math.pow((y-b),2) );
	}
}

function findAllGroupShapesAssociated() {
	
//	circFound = [];
	
	for (var i = 0; i < elementFound.length; i++) {
		var oldElement = getVerticalElementByUid(elementFound[i].uid, true);
		if (oldElement == null) {
			oldElement = getHorizontalElementByUid(elementFound[i].uid, true);
			oldElementFound.push({id:oldElement.id, uid:oldElement.uid, val:oldElement.val});
		} else {
			oldElementFound.push({id:oldElement.id, uid:oldElement.uid, val:oldElement.val});
		}
		
		for (var j = 0; j < groupShapes.length; j++) {
			for (var k = 0; k < groupShapes[j].parents.length; k++) {
				if (elementFound[i].uid == groupShapes[j].parents[k]) {
					groupShapesAssociated.push(j);
					groupShapeFound.push(groupShapes[j]);
					
					if (groupShapes[j].type == "textGroup") {
						if (textFound.length < 1) {
							var shapes = [];
							var parents = [];
							for (var l = 0; l < groupShapes[j].shapes.length; l++) {
								shapes.push(groupShapes[j].shapes[l]);
							}
							for (var l = 0; l < groupShapes[j].parents.length; l++) {
								parents.push(groupShapes[j].parents[l]);
							}
							var tmpText = null;
							for (var l = 0; l < texts.length; l++) {
								if (texts[l].group) {
									if (groupShapes[j].group == texts[l].group) {
										tmpText = texts[l];
									}
								}
							}
							if (tmpText != null) {
								textFound.push({id:tmpText.id, group:groupShapes[j].group, type:groupShapes[j].type, x:tmpText.x, y:tmpText.y, shapes:shapes, parents:parents});
								oldTextFound.push({id:tmpText.id, group:groupShapes[j].group, type:groupShapes[j].type, x:tmpText.x, y:tmpText.y, shapes:shapes, parents:parents});
							}
//							textFound.push({id:tmpText.id, group:groupShapes[j].group, type:groupShapes[j].type, x:tmpText.x, y:tmpText.y, shapes:shapes, parents:parents});
//							oldTextFound.push({id:tmpText.id, group:groupShapes[j].group, type:groupShapes[j].type, x:tmpText.x, y:tmpText.y, shapes:shapes, parents:parents});
						} else {
							var hasText = false;
							for (var n = 0; n < textFound.length; n++) {
								if (textFound[n].group == groupShapes[j].group) {
									hasText = true;
								}
							}
							if (hasText == false) {
								var shapes = [];
								var parents = [];
								for (var l = 0; l < groupShapes[j].shapes.length; l++) {
									shapes.push(groupShapes[j].shapes[l]);
								}
								for (var l = 0; l < groupShapes[j].parents.length; l++) {
									parents.push(groupShapes[j].parents[l]);
								}
								var tmpText = null;
								for (var l = 0; l < texts.length; l++) {
									if (texts[l].group) {
										if (groupShapes[j].group == texts[l].group) {
											tmpText = texts[l];
										}
									}
								}
								if (tmpText != null) {
									textFound.push({id:tmpText.id, group:groupShapes[j].group, type:groupShapes[j].type, x:tmpText.x, y:tmpText.y, shapes:shapes, parents:parents});
									oldTextFound.push({id:tmpText.id, group:groupShapes[j].group, type:groupShapes[j].type, x:tmpText.x, y:tmpText.y, shapes:shapes, parents:parents});
								}
//								textFound.push({id:tmpText.id, group:groupShapes[j].group, type:groupShapes[j].type, x:tmpText.x, y:tmpText.y, shapes:shapes, parents:parents});
//								oldTextFound.push({id:tmpText.id, group:groupShapes[j].group, type:groupShapes[j].type, x:tmpText.x, y:tmpText.y, shapes:shapes, parents:parents});
							}
						}
					}
					
					if (groupShapes[j].type == "rectGroup") {
						if (rectFound.length < 1) {
							var shapes = [];
							var parents = [];
							for (var l = 0; l < groupShapes[j].shapes.length; l++) {
								shapes.push(groupShapes[j].shapes[l]);
							}
							for (var l = 0; l < groupShapes[j].parents.length; l++) {
								parents.push(groupShapes[j].parents[l]);
							}
							var tmpRect = null;
							for (var l = 0; l < rects.length; l++) {
								if (groupShapes[j].id == rects[l].id) {
									tmpRect = rects[l];
								}
							}
							rectFound.push({id:tmpRect.id, group:groupShapes[j].group, type:groupShapes[j].type, x:tmpRect.x, y:tmpRect.y, height:tmpRect.height, width:tmpRect.width, shapes:shapes, parents:parents});
							oldRectFound.push({id:tmpRect.id, group:groupShapes[j].group, type:groupShapes[j].type, x:tmpRect.x, y:tmpRect.y, height:tmpRect.height, width:tmpRect.width, shapes:shapes, parents:parents});
						} else {
							var hasRect = false;
							for (var n = 0; n < rectFound.length; n++) {
								if (rectFound[n].id == groupShapes[j].id) {
									hasRect = true;
								}
							}
							if (hasRect == false) {
								var shapes = [];
								var parents = [];
								for (var l = 0; l < groupShapes[j].shapes.length; l++) {
									shapes.push(groupShapes[j].shapes[l]);
								}
								for (var l = 0; l < groupShapes[j].parents.length; l++) {
									parents.push(groupShapes[j].parents[l]);
								}
								var tmpRect = null;
								for (var l = 0; l < rects.length; l++) {
									if (groupShapes[j].id == rects[l].id) {
										tmpRect = rects[l];
									}
								}
								rectFound.push({id:tmpRect.id, group:groupShapes[j].group, type:groupShapes[j].type, x:tmpRect.x, y:tmpRect.y, height:tmpRect.height, width:tmpRect.width, shapes:shapes, parents:parents});
								oldRectFound.push({id:tmpRect.id, group:groupShapes[j].group, type:groupShapes[j].type, x:tmpRect.x, y:tmpRect.y, height:tmpRect.height, width:tmpRect.width, shapes:shapes, parents:parents});
							}
						}
					}
					
					if (groupShapes[j].type == "circGroup") {
						if (circFound.length < 1) {
							var shapes = [];
							var parents = [];
							for (var l = 0; l < groupShapes[j].shapes.length; l++) {
								shapes.push(groupShapes[j].shapes[l]);
							}
							for (var l = 0; l < groupShapes[j].parents.length; l++) {
								parents.push(groupShapes[j].parents[l]);
							}
							var tmpCirc = null;
							for (var l = 0; l < circs.length; l++) {
								if (groupShapes[j].group == circs[l].group) {
									tmpCirc = circs[l];
								}
							}
							circFound.push({group:groupShapes[j].group, type:groupShapes[j].type, x1:tmpCirc.cx, y1:tmpCirc.cy, x2:tmpCirc.sX, y2:tmpCirc.sY, r:tmpCirc.r, shapes:shapes, parents:parents});
							oldCircFound.push({group:groupShapes[j].group, type:groupShapes[j].type, x1:tmpCirc.cx, y1:tmpCirc.cy, x2:tmpCirc.sX, y2:tmpCirc.sY, r:tmpCirc.r, shapes:shapes, parents:parents});
//							circFound.push(groupShapes[j]);
//							oldCircFound.push(groupShapes[j]);
						} else {
							var hasCircle = false;
							for (var n = 0; n < circFound.length; n++) {
								if (circFound[n].group == groupShapes[j].group) {
									hasCircle = true;
								}
							}
							if (hasCircle == false) {
								var shapes = [];
								var parents = [];
								for (var l = 0; l < groupShapes[j].shapes.length; l++) {
									shapes.push(groupShapes[j].shapes[l]);
								}
								for (var l = 0; l < groupShapes[j].parents.length; l++) {
									parents.push(groupShapes[j].parents[l]);
								}
								var tmpCirc = null;
								for (var l = 0; l < circs.length; l++) {
									if (groupShapes[j].group == circs[l].group) {
										tmpCirc = circs[l];
									}
								}
								circFound.push({group:groupShapes[j].group, type:groupShapes[j].type, x1:tmpCirc.cx, y1:tmpCirc.cy, x2:tmpCirc.sX, y2:tmpCirc.sY, r:tmpCirc.r, shapes:shapes, parents:parents});
								oldCircFound.push({group:groupShapes[j].group, type:groupShapes[j].type, x1:tmpCirc.cx, y1:tmpCirc.cy, x2:tmpCirc.sX, y2:tmpCirc.sY, r:tmpCirc.r, shapes:shapes, parents:parents});
//								circFound.push(groupShapes[j]); 
//								oldCircFound.push(groupShapes[j]);
							}
						}
					}
					
//					if (groupShapes[j].type == "cntrGroup") {
//												
//						var linesFound = findLinesById(groupShapes[j].shapes);
//						
//						var conline;
//						
//						if (elementFound[i].type == "verticalLine") {
//							conline = verticalLines[elementFound[i].sn];
//						} else if (elementFound[i].type == "horizontalLine") {
//							conline = horizontalLines[elementFound[i].sn];
//						}
//						
//						var pos = groupShapesAssociated.length - 1;
//						
//						var contourFound = {group:groupShapes[j].group, lines:linesFound, conline:conline, groupPos:pos};
//						contourAssociated.push(contourFound);
//					}
						
				}
			}
			
			if (groupShapes[j].type == "cntrGroup") {
				for (var k = 0; k < groupShapes[j].shapes.length; k++) {
					var isLine = true;
					var cntr = getLineCntrById(groupShapes[j].shapes[k]);
					if (cntr == null) {
						cntr = getCircCntrById(groupShapes[j].shapes[k]);
						isLine = false;
					}
					
					var cntrElem = null;
					if (cntr != null) {
						if (elementFound[i].val == cntr.x1 || elementFound[i].val == cntr.x2 || elementFound[i].val == cntr.y1 || elementFound[i].val == cntr.y2 || elementFound[i].uid == cntr.parent) {
							if (isLine == true) {
								cntrElem = {group:groupShapes[j].group, id:cntr.id, uid:cntr.uid, x1:cntr.x1, y1:cntr.y1, x2:cntr.x2, y2:cntr.y2, parent:groupShapes[j].parents[k]};
							} else {
								cntrElem = {group:groupShapes[j].group, id:cntr.id, uid:cntr.uid, x1:cntr.x1, y1:cntr.y1, x2:cntr.x2, y2:cntr.y2, groupShapeParent:cntr.groupShapeParent, r:cntr.r, largeArcFlag:cntr.largeArcFlag};
							}
							cntrFound.push(cntrElem);
							oldCntrFound.push(cntrElem);
						}
					}
//					if (elementFound[i].val == cntr.x1 || elementFound[i].val == cntr.x2 || elementFound[i].val == cntr.y1 || elementFound[i].val == cntr.y2 || elementFound[i].uid == cntr.parent) {
//						if (isLine == true) {
//							cntrElem = {group:groupShapes[j].group, id:cntr.id, uid:cntr.uid, x1:cntr.x1, y1:cntr.y1, x2:cntr.x2, y2:cntr.y2, parent:groupShapes[j].parents[k]};
//						} else {
//							cntrElem = {group:groupShapes[j].group, id:cntr.id, uid:cntr.uid, x1:cntr.x1, y1:cntr.y1, x2:cntr.x2, y2:cntr.y2, groupShapeParent:cntr.groupShapeParent, r:cntr.r, largeArcFlag:cntr.largeArcFlag};
//						}
//						cntrFound.push(cntrElem);
//						oldCntrFound.push(cntrElem);
//					}
					
//					cntrFound.push(cntrElem);
				}
			}		
		}
	}
	
	var tmpGroupShapes = [];
	for (var i = 0; i < circFound.length; i++) {
		for (var j = 0; j < groupShapes.length; j++) {
			if (groupShapes[j].groupShapeParents) {
				for (var k = 0; k < groupShapes[j].groupShapeParents.length; k++) {
					if (circFound[i].group == groupShapes[j].groupShapeParents[k]) {
						tmpGroupShapes.push(groupShapes[j]);
					}
				}
			}
		}
	}
	
	for (var i = 0; i < tmpGroupShapes.length; i++) {
		for (var j = 0; j < tmpGroupShapes[i].shapes.length; j++) {
			var isLine = true;
			var cntr = getLineCntrById(tmpGroupShapes[i].shapes[j]);
			if (cntr == null) {
				cntr = getCircCntrById(tmpGroupShapes[i].shapes[j]);
				isLine = false;
			}
			var hasCntr = false;
			for (var m = 0; m < cntrFound.length; m++) {
				if (cntrFound[m].uid == cntr.uid) {
					hasCntr = true;
				}
			}
			if (hasCntr == false) {
				var cntrElem = null;
				if (isLine == true) {
					cntrElem = {group:tmpGroupShapes[i].group, id:cntr.id, uid:cntr.uid, x1:cntr.x1, y1:cntr.y1, x2:cntr.x2, y2:cntr.y2, parent:tmpGroupShapes[i].parents[j]};
				} else {
					cntrElem = {group:tmpGroupShapes[i].group, id:cntr.id, uid:cntr.uid, x1:cntr.x1, y1:cntr.y1, x2:cntr.x2, y2:cntr.y2, groupShapeParent:cntr.groupShapeParent, r:cntr.r, largeArcFlag:cntr.largeArcFlag};
				}
				cntrFound.push(cntrElem);
				oldCntrFound.push(cntrElem);
			}
		}
	}	
}

function getLineCntrById(uid) {
	for (var i = 0; i < lines.length; i++) {
		if (lines[i].uid == uid) {
			return lines[i];
		}
	}
	return null;
}

function getCircCntrById(uid) {
	for (var i = 0; i < circCons.length; i++) {
		if (circCons[i].uid == uid) {
			return circCons[i];
		}
	}
	return null;
}

function getConstructionLineCoorById(id) {
	
	for (var i = 0; i < verticalLines.length; i++) {
		if (id == verticalLines[i].uid) {
			return {type:"verticalLine", val:verticalLines[i].val}
		}
	}
	
	for (var i = 0; i < horizontalLines.length; i++) {
		if (id == horizontalLines[i].uid) {
			return {type:"horizontalLine", val:horizontalLines[i].val};
		}
	}
	
	return null;
}

function getConstructionLineElementById(id) {
	
	var line = $('#' + id);
	var x_coor = line.attr('x');
	var y_coor = line.attr('y');
	
	return {x:x, y:y}
}

function updateConstructionLines(event) {
	
	updateVerticalConstructionLines(event);
	updateHorizontalConstructionLines(event);
	
}

function updateVerticalConstructionLines(event) {
	
	for (var i = 0; i < elementFound.length; i++) {
		for (var j = 0; j < verticalLines.length; j++) {
			if (elementFound[i].id == verticalLines[j].id) {
				verticalLines[j].val += event.clientX - startX;
				console.log("construction line val = " + verticalLines[j].val);
				break;
			}
		}
	}
}

function updateHorizontalConstructionLines(event) {
	
	for (var i = 0; i < elementFound.length; i++) {
		for (var j = 0; j < horizontalLines.length; j++) {
			if (elementFound[i].id == horizontalLines[j].id) {
				horizontalLines[j].val += event.clientY - startY;
				console.log("construction line val = " + horizontalLines[j].val);
				break;
			}
		}
	}
}

function updateConstLineTmpPos(lines, diff) {
	
	var tmpPos = [];
	
	for (var i = 0; i < lines.length; i++) {
		tmpPos.push(lines[i].val);
	}
	
	for (var i = 0; i < elementFound.length; i++) {
		tmpPos[elementFound[i].sn] += diff;
	}
	
	return tmpPos;
}

function getConstructionLineTmpCoorById(id, tmpPos, type) {
	
	for (var i = 0; i < verticalLines.length; i++) {
		if (id == verticalLines[i].uid) {
			
			if (type == "verticalLine") {
				var result = {type:"verticalLine", val:tmpPos[i]};
				return result;
			} else {
				var result = {type:"verticalLine", val:verticalLines[i].val};
				return result;
			}
		}
	}
	
	for (var i = 0; i < horizontalLines.length; i++) {
		if (id == horizontalLines[i].uid) {
			
			if (type == "horizontalLine") {
				return {type:"horizontalLine", val:tmpPos[i]};
			} else {
				return {type:"horizontalLine", val:horizontalLines[i].val};
			}
		}
	}
	
	return null;
}

function changeImage() {
	
	console.log("change image!");
	
	if (shape == "grid") {
		if (drawingStat == 0) {
			var img = document.getElementById("img_grid");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/grid.png";
			}
		} else {
			var img = document.getElementById("img_grid");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/grid_01.png";
			}
			img = document.getElementById("img_circ");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/circ.png";
			}
			img = document.getElementById("img_aline");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/line.png";
			}
			img = document.getElementById("img_rcfl");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/rcfl.png";
			}
			img = document.getElementById("img_ajst");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/ajst.png";
			}
			img = document.getElementById("img_move");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/hand.png";
			}
			img = document.getElementById("img_zmin");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/zmin.png";
			}
			img = document.getElementById("img_zmou");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/zmou.png";
			}
			img = document.getElementById("img_edit");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/edit.png";
			}
			img = document.getElementById("img_cntr");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/cntr.png";
			}
			img = document.getElementById("img_text");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/text.png";
			}
		}
	} else if (shape == "rcfl") {
		if (drawingStat == 0) {
			var img = document.getElementById("img_rcfl");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/rcfl.png";
			}
		} else {
			var img = document.getElementById("img_grid");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/grid.png";
			}
			img = document.getElementById("img_circ");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/circ.png";
			}
			img = document.getElementById("img_aline");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/line.png";
			}
			img = document.getElementById("img_rcfl");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/rcfl_01.png";
			}
			img = document.getElementById("img_ajst");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/ajst.png";
			}
			img = document.getElementById("img_move");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/hand.png";
			}
			img = document.getElementById("img_zmin");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/zmin.png";
			}
			img = document.getElementById("img_zmou");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/zmou.png";
			}
			img = document.getElementById("img_edit");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/edit.png";
			}
			img = document.getElementById("img_cntr");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/cntr.png";
			}
			img = document.getElementById("img_text");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/text.png";
			}
		}
	} else if (shape == "ajst") {
		if (drawingStat == 0) {
			var img = document.getElementById("img_ajst");
			img.src = "/webgui/assets/img/icons/ajst.png";
		} else {
			var img = document.getElementById("img_grid");
			img.src = "/webgui/assets/img/icons/grid.png";
			img = document.getElementById("img_circ");
			img.src = "/webgui/assets/img/icons/circ.png";
			img = document.getElementById("img_aline");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/line.png";
			}
			img = document.getElementById("img_rcfl");
			img.src = "/webgui/assets/img/icons/rcfl.png";
			img = document.getElementById("img_ajst");
			img.src = "/webgui/assets/img/icons/ajst_01.png";
			img = document.getElementById("img_move");
			img.src = "/webgui/assets/img/icons/hand.png";
			img = document.getElementById("img_zmin");
			img.src = "/webgui/assets/img/icons/zmin.png";
			img = document.getElementById("img_zmou");
			img.src = "/webgui/assets/img/icons/zmou.png";
			img = document.getElementById("img_edit");
			img.src = "/webgui/assets/img/icons/edit.png";
			img = document.getElementById("img_cntr");
			img.src = "/webgui/assets/img/icons/cntr.png";
			img = document.getElementById("img_text");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/text.png";
			}
		}
	} else if (shape == "move") {
		if (drawingStat == 0) {
			var img = document.getElementById("img_move");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/hand.png";
			}
		} else {
			var img = document.getElementById("img_grid");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/grid.png";
			}
			img = document.getElementById("img_circ");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/circ.png";
			}
			img = document.getElementById("img_aline");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/line.png";
			}
			img = document.getElementById("img_rcfl");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/rcfl.png";
			}
			img = document.getElementById("img_ajst");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/ajst.png";
			}
			img = document.getElementById("img_move");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/hand_01.png";
			}
			img = document.getElementById("img_zmin");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/zmin.png";
			}
			img = document.getElementById("img_zmou");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/zmou.png";
			}
			img = document.getElementById("img_edit");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/edit.png";
			}
			img = document.getElementById("img_cntr");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/cntr.png";
			}
			img = document.getElementById("img_text");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/text.png";
			}
		}
	} else if (shape == "zmin") {
		if (drawingStat == 0) {
			var img = document.getElementById("img_zmin");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/zmin.png";
			}
		} else {
			var img = document.getElementById("img_grid");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/grid.png";
			}
			img = document.getElementById("img_circ");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/circ.png";
			}
			img = document.getElementById("img_aline");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/line.png";
			}
			img = document.getElementById("img_rcfl");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/rcfl.png";
			}
			img = document.getElementById("img_ajst");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/ajst.png";
			}
			img = document.getElementById("img_move");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/hand.png";
			}
			img = document.getElementById("img_zmin");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/zmin_01.png";
			}
			img = document.getElementById("img_zmou");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/zmou.png";
			}
			img = document.getElementById("img_edit");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/edit.png";
			}
			img = document.getElementById("img_cntr");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/cntr.png";
			}
			img = document.getElementById("img_text");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/text.png";
			}
		}
	} else if (shape == "zmou") {
		if (drawingStat == 0) {
			var img = document.getElementById("img_zmou");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/zmou.png";
			}
		} else {
			var img = document.getElementById("img_grid");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/grid.png";
			}
			img = document.getElementById("img_circ");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/circ.png";
			}
			img = document.getElementById("img_aline");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/line.png";
			}
			img = document.getElementById("img_rcfl");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/rcfl.png";
			}
			img = document.getElementById("img_ajst");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/ajst.png";
			}
			img = document.getElementById("img_move");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/hand.png";
			}
			img = document.getElementById("img_zmin");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/zmin.png";
			}
			img = document.getElementById("img_zmou");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/zmou_01.png";
			}
			img = document.getElementById("img_edit");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/edit.png";
			}
			img = document.getElementById("img_cntr");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/cntr.png";
			}
			img = document.getElementById("img_text");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/text.png";
			}
		}
	} else if (shape == "edit") {
		if (drawingStat == 0) {
			var img = document.getElementById("img_edit");
			img.src = "/webgui/assets/img/icons/edit.png";
		} else {
			var img = document.getElementById("img_grid");
			img.src = "/webgui/assets/img/icons/grid.png";
			img = document.getElementById("img_circ");
			img.src = "/webgui/assets/img/icons/circ.png";
			img = document.getElementById("img_aline");
			img.src = "/webgui/assets/img/icons/line.png";
			img = document.getElementById("img_rcfl");
			img.src = "/webgui/assets/img/icons/rcfl.png";
			img = document.getElementById("img_ajst");
			img.src = "/webgui/assets/img/icons/ajst.png";
			img = document.getElementById("img_move");
			img.src = "/webgui/assets/img/icons/hand.png";
			img = document.getElementById("img_zmin");
			img.src = "/webgui/assets/img/icons/zmin.png";
			img = document.getElementById("img_zmou");
			img.src = "/webgui/assets/img/icons/zmou.png";
			img = document.getElementById("img_edit");
			img.src = "/webgui/assets/img/icons/edit_01.png";
			img = document.getElementById("img_cntr");
			img.src = "/webgui/assets/img/icons/cntr.png";
			img = document.getElementById("img_text");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/text.png";
			}
		}
	} else if (shape == "cntr") {
		if (drawingStat == 0) {
			var img = document.getElementById("img_cntr");
			img.src = "/webgui/assets/img/icons/cntr.png";
		} else {
			var img = document.getElementById("img_grid");
			img.src = "/webgui/assets/img/icons/grid.png";
			img = document.getElementById("img_circ");
			img.src = "/webgui/assets/img/icons/circ.png";
			img = document.getElementById("img_aline");
			img.src = "/webgui/assets/img/icons/line.png";
			img = document.getElementById("img_rcfl");
			img.src = "/webgui/assets/img/icons/rcfl.png";
			img = document.getElementById("img_ajst");
			img.src = "/webgui/assets/img/icons/ajst.png";
			img = document.getElementById("img_move");
			img.src = "/webgui/assets/img/icons/hand.png";
			img = document.getElementById("img_zmin");
			img.src = "/webgui/assets/img/icons/zmin.png";
			img = document.getElementById("img_zmou");
			img.src = "/webgui/assets/img/icons/zmou.png";
			img = document.getElementById("img_edit");
			img.src = "/webgui/assets/img/icons/edit.png";
			img = document.getElementById("img_cntr");
			img.src = "/webgui/assets/img/icons/cntr_01.png";
			img = document.getElementById("img_text");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/text.png";
			}
		}
	} else if (shape == "circ") {
		if (drawingStat == 0) {
			var img = document.getElementById("img_circ");
			img.src = "/webgui/assets/img/icons/circ.png";
		} else {		
			var img = document.getElementById("img_grid");
			img.src = "/webgui/assets/img/icons/grid.png";
			img = document.getElementById("img_circ");
			img.src = "/webgui/assets/img/icons/circ_01.png";
			img = document.getElementById("img_aline");
			img.src = "/webgui/assets/img/icons/line.png";
			img = document.getElementById("img_rcfl");
			img.src = "/webgui/assets/img/icons/rcfl.png";
			img = document.getElementById("img_ajst");
			img.src = "/webgui/assets/img/icons/ajst.png";
			img = document.getElementById("img_move");
			img.src = "/webgui/assets/img/icons/hand.png";
			img = document.getElementById("img_zmin");
			img.src = "/webgui/assets/img/icons/zmin.png";
			img = document.getElementById("img_zmou");
			img.src = "/webgui/assets/img/icons/zmou.png";
			img = document.getElementById("img_edit");
			img.src = "/webgui/assets/img/icons/edit.png";
			img = document.getElementById("img_cntr");
			img.src = "/webgui/assets/img/icons/cntr.png";
			img = document.getElementById("img_text");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/text.png";
			}
		}
	} else if (shape == "aline") {
		if (drawingStat == 0) {
			var img = document.getElementById("img_aline");
			img.src = "/webgui/assets/img/icons/line.png";
		} else {		
			var img = document.getElementById("img_grid");
			img.src = "/webgui/assets/img/icons/grid.png";
			img = document.getElementById("img_circ");
			img.src = "/webgui/assets/img/icons/circ.png";
			img = document.getElementById("img_aline");
			img.src = "/webgui/assets/img/icons/line_01.png";
			img = document.getElementById("img_rcfl");
			img.src = "/webgui/assets/img/icons/rcfl.png";
			img = document.getElementById("img_ajst");
			img.src = "/webgui/assets/img/icons/ajst.png";
			img = document.getElementById("img_move");
			img.src = "/webgui/assets/img/icons/hand.png";
			img = document.getElementById("img_zmin");
			img.src = "/webgui/assets/img/icons/zmin.png";
			img = document.getElementById("img_zmou");
			img.src = "/webgui/assets/img/icons/zmou.png";
			img = document.getElementById("img_edit");
			img.src = "/webgui/assets/img/icons/edit.png";
			img = document.getElementById("img_cntr");
			img.src = "/webgui/assets/img/icons/cntr.png";
			img = document.getElementById("img_text");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/text.png";
			}
		}
	} else if (shape == "text") {
		if (drawingStat == 0) {
			var img = document.getElementById("img_text");
			img.src = "/webgui/assets/img/icons/text.png";
		} else {		
			var img = document.getElementById("img_grid");
			img.src = "/webgui/assets/img/icons/grid.png";
			img = document.getElementById("img_circ");
			img.src = "/webgui/assets/img/icons/circ.png";
			img = document.getElementById("img_aline");
			img.src = "/webgui/assets/img/icons/line.png";
			img = document.getElementById("img_rcfl");
			img.src = "/webgui/assets/img/icons/rcfl.png";
			img = document.getElementById("img_ajst");
			img.src = "/webgui/assets/img/icons/ajst.png";
			img = document.getElementById("img_move");
			img.src = "/webgui/assets/img/icons/hand.png";
			img = document.getElementById("img_zmin");
			img.src = "/webgui/assets/img/icons/zmin.png";
			img = document.getElementById("img_zmou");
			img.src = "/webgui/assets/img/icons/zmou.png";
			img = document.getElementById("img_edit");
			img.src = "/webgui/assets/img/icons/edit.png";
			img = document.getElementById("img_cntr");
			img.src = "/webgui/assets/img/icons/cntr.png";
			img = document.getElementById("img_text");
			if (img != null) {
				img.src = "/webgui/assets/img/icons/text_01.png";
			}
		}
	}
	
}

function showSelectedElementParentInfo(event) {
	
	console.log("will change selected element color");
	console.log("will change parent color");

	var bound = document.getElementById("pdsvsvg").getBoundingClientRect();
	x0 = bound.left;
	y0 = bound.top;
	var currentX = event.clientX;
	var currentY = event.clientY;
	currentX = currentX - x0;
	currentY = currentY - y0;
	console.log("currentX = " + currentX);
	console.log("currentY = " + currentY);
	
	var sVLineId = null;
	var sVLineParent = null;
	var sHLineId = null;
	var sHLineParent = null;
	var sCirciId = null;
	var sCircParents = [];
	var sTextId = null;
	var sTextParents = [];
	
	for (var i = 0; i < verticalLines.length; i++) {
		if (verticalLines[i].uid == -2) {
			document.getElementById(verticalLines[i].id).style.stroke = "black";
		} else {		
			if (verticalLines[i].plane == "xy") {
				document.getElementById(verticalLines[i].id).style.stroke = "rgb(0,204,255)";
			} else if (verticalLines[i].plane == "yz") {
				document.getElementById(verticalLines[i].id).style.stroke = "rgb(66,244,101)";
			} else if (verticalLines[i].plane == "xz") {
				document.getElementById(verticalLines[i].id).style.stroke = "rgb(128,0,128)";
			}
//			document.getElementById(verticalLines[i].id).style.stroke = "red";
		}
		if (Math.abs(currentX - verticalLines[i].val) < 6) {
			sVLineId = verticalLines[i].id;
			for (var j = 0; j < verticalLines.length; j++) {
				if (verticalLines[j].uid == verticalLines[i].parent) {
					sVLineParent = verticalLines[j].id;
				}
			}
//			break;
		}
	}	
	
	for (var i = 0; i < horizontalLines.length; i++) {
		if (horizontalLines[i].uid == -1) {
			document.getElementById(horizontalLines[i].id).style.stroke = "black";
		} else {
			if (horizontalLines[i].plane == "xy") {
				document.getElementById(horizontalLines[i].id).style.stroke = "rgb(0,204,255)";
			} else if (horizontalLines[i].plane == "yz") {
				document.getElementById(horizontalLines[i].id).style.stroke = "rgb(66,244,101)";
			} else if (horizontalLines[i].plane == "xz") {
				document.getElementById(horizontalLines[i].id).style.stroke = "rgb(128,0,128)";
			}
//			document.getElementById(horizontalLines[i].id).style.stroke = "red";
		}
		if (Math.abs(currentY - horizontalLines[i].val) < 6) {
			sHLineId = horizontalLines[i].id;
			for (var j = 0; j < horizontalLines.length; j++) {
				if (horizontalLines[j].uid == horizontalLines[i].parent) {
					sHLineParent = horizontalLines[j].id
				}
			}
//			break;
		}
	}
	
	for (var i = 0; i < circs.length; i++) {
		document.getElementById(circs[i].id).style.stroke = "red";
		var actualValue = Math.pow((currentX - circs[i].cx),2) + Math.pow((currentY - circs[i].cy),2);
		var minRS = Math.pow(circs[i].r-6,2);
		var maxRS = Math.pow(circs[i].r+6,2);
		if ((actualValue > minRS) && (actualValue < maxRS)) {
			sCirciId = circs[i].id
			var circParents = [];
			for (var j = 0; j < groupShapes.length; j++) {
				if (groupShapes[j].group == circs[i].group) {
					circParents = groupShapes[j].parents;
				}
			}
			for (var j = 0; j < circParents.length; j++) {
				for (var k = 0; k < verticalLines.length; k++) {
					if (verticalLines[k].uid == circParents[j]) {
						sCircParents.push(verticalLines[k].id);
					}
				}
				for (var k = 0; k < horizontalLines.length; k++) {
					if (horizontalLines[k].uid == circParents[j]) {
						sCircParents.push(horizontalLines[k].id);
					}
				}
			}
//			break;
		}
	}
	
	for (var i = 0; i < texts.length; i++) {
		if (texts[i].id != 'text0' && texts[i].id != 'text1' && texts[i].id != 'text1') {
			var text = $("#" + texts[i].id);
			text.attr({fill:"red"});
//			document.getElementById(texts[i].id).fill = "red";
			if (Math.abs(currentX - texts[i].x) < 6 && Math.abs(currentY - texts[i].y) < 6) {
				sTextId = texts[i].id
				for (var j = 0; j < texts[i].parents.length; j++) {
					for (var k = 0; k < verticalLines.length; k++) {
						if (verticalLines[k].uid == texts[i].parents[j]) {
							sTextParents.push(verticalLines[k].id);
						}
					}
					for (var k = 0; k < horizontalLines.length; k++) {
						if (horizontalLines[k].uid == texts[i].parents[j]) {
							sTextParents.push(horizontalLines[k].id);
						}
					}
				}
//				break;
			}
		}
	}
	
	if (sVLineId != null) {
		document.getElementById(sVLineId).style.stroke = "black";
		if (sVLineParent != null) {document.getElementById(sVLineParent).style.stroke = "rgb(0, 51, 0)";}
	}
	
	if (sHLineId != null) {
		document.getElementById(sHLineId).style.stroke = "black";
		if (sHLineParent != null) {
			document.getElementById(sHLineParent).style.stroke = "rgb(0, 51, 0)";
		}
	}
	
	if (sCirciId != null) {
		document.getElementById(sCirciId).style.stroke = "black";
		if (sCircParents) {
			for (var i = 0; i < sCircParents.length; i++) {
				document.getElementById(sCircParents[i]).style.stroke = "rgb(0, 51, 0)";
			}
		}
	}
	
	if (sTextId != null) {
		var text = $("#" + sTextId);
		text.attr({fill:"black"});
//		document.getElementById(sTextId).fill = "black";
		if (sTextParents) {
			for (var i = 0; i < sTextParents.length; i++) {
				document.getElementById(sTextParents[i]).style.stroke = "rgb(0, 51, 0)";
			}
		}
	}
	
}

function changeParentColor(event) {
	
	console.log("will change parent color");
	
//	for (var i = 0; i < elements.length; i++) {
//		if (elements.type == "verticalLine") {
//			$("#" + elements.id).attr("stroke", "green");
//		} else if (elements.type == "horizontalLine") {
//			$("#" + elements.id).attr("stroke", "green");
//		}
//	}
	
	if (drawingStat != 0) {
		return;
	}
	
	var line = selectLine(event);
	
	if (line == null) {
		return;
	}
	
	console.log("find a line");
	
	var child, parent;
	
	if (line.type == "vertical") {
		child = getVerticalElementByUid(line.uid, true);
		parent = getVerticalElementByUid(child.parent, true);
	} else if (line.type == "horizontal") {
		child = getHorizontalElementByUid(line.uid, true);
		parent = getHorizontalElementByUid(child.parent, true);	
	}
	
	console.log(child);
	console.log(parent);
	
	var parentline = $("#" + parent.id);
	
	if (parent.uid == -1 || parent.uid == -2) {
		
		if (parentline.attr('stroke') == 'rgb(0,0,0)') {
			parentline.attr("stroke", "rgb(0,153,204)");
		} else {
			parentline.attr("stroke", "rgb(0,0,0)")
		}
		
	} else {
		
		// This is wrong, but not being used.
		
//		if (horizontalLines[i].plane == "xy") {
//			document.getElementById(horizontalLines[i].id).style.stroke = "rgb(0,204,255)";
//		} else if (horizontalLines[i].plane == "yz") {
//			document.getElementById(horizontalLines[i].id).style.stroke = "rgb(66,244,101)";
//		} else if (horizontalLines[i].plane == "xz") {
//			document.getElementById(horizontalLines[i].id).style.stroke = "rgb(128,0,128)";
//		}
//		
//		if (view3D == 'xy') {
//			if (parentline.attr('stroke') == 'rgb(0,204,255)') {
//				parentline.attr("stroke", "rgb(0,153,204)");
//			} else {
//				parentline.attr("stroke", "rgb(0,204,255)")
//			}
//		} else if (view3D == 'yz') {
//			if (parentline.attr('stroke') == 'rgb(66,244,101)') {
//				parentline.attr("stroke", "rgb(0,153,204)");
//			} else {
//				parentline.attr("stroke", "rgb(66,244,101)")
//			}
//		} else if (view3D == 'xz') {
//			if (parentline.attr('stroke') == 'rgb(128,0,128)') {
//				parentline.attr("stroke", "rgb(0,153,204)");
//			} else {
//				parentline.attr("stroke", "rgb(128,0,128)")
//			}
//		}
		
//		if (parentline.attr('stroke') == 'rgb(0,204,255)') {
//			parentline.attr("stroke", "rgb(0,153,204)");
//		} else {
//			parentline.attr("stroke", "rgb(0,204,255)")
//		}
//		
//		if (parentline.attr('stroke') == 'rgb(66,244,101)') {
//			parentline.attr("stroke", "rgb(0,153,204)");
//		} else {
//			parentline.attr("stroke", "rgb(66,244,101)")
//		}
//		
//		if (parentline.attr('stroke') == 'rgb(128,0,128)') {
//			parentline.attr("stroke", "rgb(0,153,204)");
//		} else {
//			parentline.attr("stroke", "rgb(128,0,128)")
//		}
	}
	
	
}

function getVerticalElementByUid(uid, isAxisIncluded) {
	
	if (isAxisIncluded) {
		for (var i = 0; i < verticalLines.length; i++) {
			if (verticalLines[i].uid == uid) {
				return verticalLines[i];
			}
		}
	} else {
		for (var i = 1; i < verticalLines.length; i++) {
			if (verticalLines[i].uid == uid) {
				return verticalLines[i];
			}
		}
	}

	return null;
}

function getHorizontalElementByUid(uid, isAxisIncluded) {
	
	if (isAxisIncluded) {
		for (var i = 0; i < horizontalLines.length; i++) {
			if (horizontalLines[i].uid == uid) {
				return horizontalLines[i];
			}
		}
	} else {
		for (var i = 1; i < horizontalLines.length; i++) {
			if (horizontalLines[i].uid == uid) {
				return horizontalLines[i];
			}
		}
	}

	return null;
}



function toDrawContour() {
	
	if (curModel == null) {
		return;
	}
	
	if (drawingStat == 0) {
		drawingStat = 1;
		shape = "cntr";
		selectedLine = [];
		selectedElementInters = [];
		changeImage();
		tmpIdHolder = [];
	} else if (drawingStat == 1 && shape != "cntr") {
		drawingStat = 1;
		shape = "cntr";
		selectedLine = [];
		selectedElementInters = [];
		changeImage();
	} else {
		drawingStat = 0;
		selectedLine = null;
		selectedElementInters = [];
		changeImage();
		saveGroupShape("cntr", contourHolder);
	}
	
}

function drawContourLine(x1, y1, x2, y2, parentId) {
	
	var lineId = "line_" + lineNumber;
	var output = "";
	output += "<line id='" + lineId + "' x1='" + x1 + "' y1='" + y1 + "' x2='" + x2 + "' y2='" + y2 + "' stroke=blue stroke-width=5 />";
	var py = document.getElementById("pdsvsvg");
	py.innerHTML += output;
	
	// put the line into lines
	lines.push({id:lineId, x1:x1, y1:y1, x2:x2, y2:y2, parent:parentId, uid:-999})
	
	tmpIdHolder.push(lineId);
	
	lineNumber++;
	
}

function getContourLineCoor() {
	
	var result = [];
	var x1, x2, y1, y2;
	
	console.log("try to get contour coors");
	console.log(selectedLine);
	
	if (selectedLine[0].type == "vertical") {
		x1 = selectedLine[0].value;
	} else if (selectedLine[0].type == "horizontal") {
		y1 = selectedLine[0].value;
	}
	
	if (selectedLine[1].type == "vertical") {
		x1 = selectedLine[1].value;
		x2 = selectedLine[1].value;
	} else if (selectedLine[1].type == "horizontal") {
		y1 = selectedLine[1].value;
		y2 = selectedLine[1].value;
	}
	
	if (selectedLine[2].type == "vertical") {
		x2 = selectedLine[2].value;
	} else if (selectedLine[2].type == "horizontal") {
		y2 = selectedLine[2].value;
	}
	
	var rel_x1 = x1 - verticalLines[0].val;
	var rel_x2 = x2 - verticalLines[0].val;
	var rel_y1 = y1 - horizontalLines[0].val;
	var rel_y2 = y2 - horizontalLines[0].val;
	
	result.push(x1);
	result.push(y1);
	result.push(x2);
	result.push(y2);
	
	console.log("contour line coors = " + result);
	
//	var line = {x1: x1, x2: x2, y1: y1, y2: y2, angle:selectedLine[1].angle, parent:selectedLine[1].parent};
	var line = {x1: rel_x1, x2: rel_x2, y1: rel_y1, y2: rel_y2, angle:selectedLine[1].angle, parent:selectedLine[1].uid};
	contourHolder.push(line);
	
	return result;
}

function updateContourHolder() {
	var x1_val = selectedElementInters[0].x - verticalLines[0].val;
	var y1_val = selectedElementInters[0].y - horizontalLines[0].val;
	var x2_val = selectedElementInters[1].x - verticalLines[0].val;
	var y2_val = selectedElementInters[1].y - horizontalLines[0].val;
	if (selectedLine[1].type == "horizontal" || selectedLine[1].type == "vertical") {
		var line = {type:selectedLine[1].type, x1:x1_val, x2:x2_val, 
					y1:y1_val, y2:y2_val, 
					angle:selectedLine[1].angle, parent:selectedLine[1].uid};
		contourHolder.push(line);
	} else if (selectedLine[1].type == "circGroup") {
		if (selectedLine[1].sweepFlag == false) {
			var circle = {type:selectedLine[1].type, x1:x1_val, x2:x2_val, 
					  y1:y1_val, y2:y2_val,
					  largeArcFlag:selectedLine[1].largeArcFlag, sweepFlag:selectedLine[1].sweepFlag, parent:selectedLine[1].group};
			contourHolder.push(circle);
		} else {
			var circle = {type:selectedLine[1].type, x1:x2_val, x2:x1_val, 
					  y1:y2_val, y2:y1_val,
					  largeArcFlag:selectedLine[1].largeArcFlag, sweepFlag:selectedLine[1].sweepFlag, parent:selectedLine[1].group};
			contourHolder.push(circle);
		}
//		var circle = {type:selectedLine[1].type, x1:x1_val, x2:x2_val, 
//					  y1:y1_val, y2:y2_val,
//					  largeArcFlag:selectedLine[1].largeArcFlag, sweepFlag:selectedLine[1].sweepFlag, parent:selectedLine[1].group};
//		contourHolder.push(circle);
	} else {
		console.log("Do Nothing!");
	}

}

function constructionLineFilter(type, typeToVerify, isTypeSameNeeded) {
	
	console.log(type);
	console.log(typeToVerify);
	console.log(isTypeSameNeeded);
	
	if (type == typeToVerify) {
		console.log("is same");
		return isTypeSameNeeded;
	} else {
		console.log("is not same");
		return !isTypeSameNeeded;
	}
}

function findConstructionLineById(id) {
	
	for (var i = 0; i < verticalLines.length; i++) {
		if (verticalLines[i].uid == id) {
			return verticalLines[i];
		}
	}
	
	for (var i = 0; i < horizontalLines.length; i++) {
		if (horizontalLines[i].uid == id) {
			return horizontalLines[i];
		}
	}
}

function redrawContour(type, contourLines, diffX, diffY, constructionLinePos) {
	
	console.log("redraw contour!");
	console.log("number of contour lines = " + contourLines.length);
	
	for (var i = 0; i < contourLines.length; i++) {
		
		console.log("contour id = " + contourLines[i].id);
		console.log("construction line type = " + type);
		console.log(contourLines[i].x1);
		console.log(contourLines[i].x2);
		console.log(contourLines[i].y1);
		console.log(contourLines[i].y2);
		console.log(constructionLinePos)
		
		
		if (type == "verticalLine") {
			
			if (Math.abs(contourLines[i].x1 - constructionLinePos) < 0.01) {
				var line = $("#" + contourLines[i].id);
				line.attr({x1:(contourLines[i].x1 + diffX)});
			}
			
			if (Math.abs(contourLines[i].x2 - constructionLinePos) < 0.01) {
				var line = $("#" + contourLines[i].id);
				line.attr({x2:(contourLines[i].x2 + diffX)});
			}
			
		} else if (type == "horizontalLine") {
			if (Math.abs(contourLines[i].y1 - constructionLinePos) < 0.01) {
				var line = $("#" + contourLines[i].id);
				line.attr({y1:(contourLines[i].y1 + diffY)});
			}
			
			if (Math.abs(contourLines[i].y2 - constructionLinePos) < 0.01) {
				var line = $("#" + contourLines[i].id);
				line.attr({y2:(contourLines[i].y2 + diffY)});
			}
		}
		
		
	}
	
	
	
}

function findLinesById(ids) {
	
	var result = [];
	
	for (var i = 0; i < ids.length; i++) {
		for (var j = 0; j < lines.length; j++) {
			if (ids[i] == lines[j].uid) {
				result.push(lines[j]);
			}
		}
	}
	
	return result;
	
}

function findGroupById(id) {
	
	for (var i = 0; i < groupShapes.length; i++) {
		if (groupShapes[i].group == id) {
			return groupShapes[i];
		}
	}
}

function findContourGroupById(id) {
	for (var i = 0; i < contourAssociated.length; i++) {
		if (contourAssociated[i].group == id) {
			return contourAssociated[i];
		}
	}
}

function findContourLineByGroupPos(pos) {
	
	for (var i = 0; i < contourAssociated.length; i++) {
		if (contourAssociated[i].groupPos == pos) {
			return contourAssociated[i];
		}
	}
}

function cleanMemory() {
	for (var i = 0; i < arguments.length; i++) {
		console.log("arguments");
		console.log(arguments[i]);
		arguments[i] = [];
	}
}


function partsViewMouseDown(event) {
	
	console.log("Inside partsViewMouseDown trying to draw!");
	if (drawingStat == 0) {                  // global variable drawingStat not set ------ no action
		console.log("nothing to draw");
		return;
	}
	
	if (shape == "move") {
		if (drawingStat == 1) {
			console.log("start to move");
			startX = event.clientX;
			startY = event.clientY;
			drawingStat = 2;	
		}
	} else if (shape == "zmin") {
		if (drawingStat == 1) {
			console.log("start to zoom in");
			startX = event.clientX;
			startY = event.clientY;
			drawingStat = 2;
			zoomInPartsView();
		}
	} else if (shape == "zmou") {
		if (drawingStat == 1) {
			console.log("start to zoom out");
			startX = event.clientX;
			startY = event.clientY;
			drawingStat = 2;
			zoomOutPartsView();
		}
		
	}
}

function partsViewMouseUp(event) {
	
	if (drawingStat == 0) {
		return;
	}
	
	if (shape == "move") {
		
		drawingStat = 1;
		updateVerticalLines();
		updateHorizontalLines();
		updateVerticalTexts();
		updateHorizontalTexts();
		updateTexts();
		updateRects();
		updateCircs();
		updateLines();
//		updateVerticalBggds();
//		updateHorizontalBggds();
	} else if (shape == "zmin") {
		drawingStat = 1;
	} else if (shape == "zmou") {
		drawingStat = 1;
	}
}

function partsViewMouseMove(event) {
	
	findMouseCoor(event);
	if (drawingStat != 2) {
		return;
	}
	
	if (shape == "move") {
		if (drawingStat == 2) {
			transformPartsView(event);
		}
	}
}

function transformPartsView(event) {
	
	x0 = event.clientX;
	y0 = event.clientY;
	
	transformVerticalLine(event);
	transformHorizontalLine(event);
	transformVerticalText(event);
	transformHorizontalText(event);
	transformText(event);
	transformRect(event);
	transformCirc(event);
	transformLine(event);
	transformCircCntr(event);
	
	var verticalLineId = verticalLines[0].id;
	var verticalLine = $('#' + verticalLineId);
	var curX0 = Number(verticalLine.attr('x1'));
	
	var horizontalLineId = horizontalLines[0].id;
	var horizontalLine = $('#' + horizontalLineId);
	
	var curY0 = Number(horizontalLine.attr('y1'));
	
	redrawBggdInPartView(curX0, curY0);
	
}


function zoomInPartsView() {
	
	console.log("start to zoom");
	
	if (zoomLevel < zoomLevels.length - 1) {
		var ratio = zoomLevels[zoomLevel + 1] / zoomLevels[zoomLevel];
		zoomLevel++;
		zoomLine(ratio, "pdpvsvg");
		zoomVerticalLine(ratio, "pdpvsvg");
		zoomHorizontalLine(ratio, "pdpvsvg");
		zoomVerticalText(ratio, "pdpvsvg");
		zoomHorizontalText(ratio, "pdpvsvg");
		zoomText(ratio, "pdpvsvg");
		zoomRect(ratio, "pdpvsvg");
		zoomCirc(ratio, "pdpvsvg");
	}
}

function zoomOutPartsView() {
	
	console.log("start to zoom out");
	
	if (zoomLevel > 0) {
		var ratio = zoomLevels[zoomLevel - 1] / zoomLevels[zoomLevel];
		zoomLevel--;
		zoomLine(ratio, "pdpvsvg");
		zoomVerticalLine(ratio, "pdpvsvg");
		zoomHorizontalLine(ratio, "pdpvsvg");
		zoomVerticalText(ratio, "pdpvsvg");
		zoomHorizontalText(ratio, "pdpvsvg");
		zoomText(ratio, "pdpvsvg");
		zoomRect(ratio, "pdpvsvg");
		zoomCirc(ratio, "pdpvsvg");
	}
	
}

function adjustShapes(shapeToAdjust, shapeType) {
	
	elementFound = [];
	groupAssociated = [];
	contourAssociated = [];
	circFound = [];
	cntrFound = [];
	groupShapeFound = [];
	oldCntrFound = [];
	oldCircFound = [];
	oldElementFound = [];
	textFound = [];
	oldTextFound = [];
	rectFound = [];
	oldRectFound = [];
	
	// find construction lines' group shape children
	var oldShapeValue = null;
	for (var i = 0; i < groupShapes.length; i++) {
		for (var j = 0; j < groupShapes[i].parents.length; j++) {
			if (groupShapes[i].parents[j] == shapeToAdjust.uid) {
				if (groupShapes[i].type == "cntrGroup") {
					for (var k = 0; k < lines.length; k++) {
						if (lines[k].uid == groupShapes[i].shapes[j]) {
							oldShapeValue = getCLineOldValueFromGShapesNotAdjusted(shapeToAdjust, lines[k], "cntrGroup");
						}
					}
				} else if (groupShapes[i].type == "textGroup") {
					for (var k = 0; k < texts.length; k++) {
						if (texts[k].uid == groupShapes[i].shapes[j]) {
							oldShapeValue = getCLineOldValueFromGShapesNotAdjusted(shapeToAdjust, texts[k], "textGroup");
						}
					}
				} else if (groupShapes[i].type == "rectGroup") {
					for (var k = 0; k < rects.length; k++) {
						if (rects[k].uid == groupShapes[i].shapes[j]) {
							oldShapeValue = getCLineOldValueFromGShapesNotAdjusted(shapeToAdjust, rects[k], "rectGroup");
						}
					}
				}
			}
		}
	}

	if (oldShapeValue == null || oldShapeValue == shapeToAdjust.val) {
		return;
	}
	oldShapeValue = Number(oldShapeValue);
	shapeToAdjust.val = Number(shapeToAdjust.val);
	
	if (shapeType == "vertical") {
		elementFound.push({type: 'verticalLine', id: shapeToAdjust.id, uid: shapeToAdjust.uid, parent: shapeToAdjust.parent, relpos: getVerticalRelativePosition(shapeToAdjust), val: shapeToAdjust.val});
		elementFound = elementFound.concat(getAllChildrenVerticalLines(elementFound));
	} else if (shapeType == "horizontal") {
		elementFound.push({type: 'horizontalLine', id: shapeToAdjust.id, uid: shapeToAdjust.uid, parent: shapeToAdjust.parent, relpos: getHorizontalRelativePosition(shapeToAdjust), val: shapeToAdjust.val});
		elementFound = elementFound.concat(getAllChildrenHorizontalLines(elementFound));
	}
	
	var oldShapeValueList = [];
	oldShapeValueList.push(oldShapeValue);
	for (var i = 1; i < elementFound; i++) {
		if (elementFound[i].parent == elementFound[0].uid) {
			oldShapeValueList.push(elementFound[i].val - (shapeToAdjust.val-oldShapeValue));
		}
		if (elementFound[i].parent == elementFound[i-1].uid && (i-1) != 0) {
			oldShapeValueList.push(elementFound[i].val - (elementFound[i-1].val-oldShapeValue));
		}
	}
	
	var tmpCntrLines = [];
	for (var i = 0; i < lines.length; i++) {
		
		for (var j = 0; j < oldShapeValueList.length; j++) {
			if (shapeType == "vertical") {
				if (lines[i].x1 == oldShapeValueList[j] || lines[i].x2 == oldShapeValueList[j]) {
					if (lines[i].x1 == oldShapeValueList[j]) {
						lines[i].x1 = elementFound[j].val;
						var cntrShape = $("#" + lines[i].id);
						cntrShape.attr({x1:lines[i].x1});
					}
					if (lines[i].x2 == oldShapeValueList[j]) {
						lines[i].x2 = elementFound[j].val;
						var cntrShape = $("#" + lines[i].id);
						cntrShape.attr({x2:lines[i].x2});
					}
					tmpCntrLines.push(lines[i]);
				}
			} else if (shapeType == "horizontal") {
				if (lines[i].y1 == oldShapeValueList[j] || lines[i].y2 == oldShapeValueList[j]) {
					if (lines[i].y1 == oldShapeValueList[j]) {
						lines[i].y1 = elementFound[j].val;
						var cntrShape = $("#" + lines[i].id);
						cntrShape.attr({y1:lines[i].y1});
					}
					if (lines[i].y2 == oldShapeValueList[j]) {
						lines[i].y2 = elementFound[j].val;
						var cntrShape = $("#" + lines[i].id);
						cntrShape.attr({y2:lines[i].y2});
					}
					tmpCntrLines.push(lines[i]);
				}
			}
		}
	
	}
	
	var tmpTexts = [];
	for (var i = 1; i < texts.length; i++) {
		
		for (var j = 0; j < oldShapeValueList.length; j++) {
			if (shapeType == "vertical") {
				if (texts[i].x == oldShapeValueList[j]) {
					texts[i].x = elementFound[j].val;
					var textShape = $("#" + texts[i].id);
					textShape.attr({x:texts[i].x});
					tmpTexts.push(texts[i]);
				}
			} else if (shapeType == "horizontal") {
				if (texts[i].y == oldShapeValueList[j]) {
					texts[i].y = elementFound[j].val;
					var textShape = $("#" + texts[i].id);
					textShape.attr({y:texts[i].y});
					tmpTexts.push(texts[i]);
				}
			}
		}
	
	}
	
	var tmpRectGroups = [];
	for (var i = 0; i < groupShapes.length; i++) {
		if (groupShapes[i].type == "cntrGroup") {
			for (var j = 0; j < groupShapes[i].shapes.length; j++) {
				for (var k = 0; k < tmpCntrLines.length; k++) {
					if (tmpCntrLines[k].uid == groupShapes[i].shapes[j]) {
						tmpCntrLines[k].group = groupShapes[i].group;
					}
				}
			}
		}
		
		if (groupShapes[i].type == "textGroup") {
			for (var j = 0; j < tmpTexts.length; j++) {
				if (tmpTexts[j].shapeId == groupShapes[i].shapeId) {
					tmpTexts[j].group = groupShapes[i].group;
					tmpTexts[j].shapes = groupShapes[i].shapes;
				}
			}
		}
		
		if (groupShapes[i].type == "rectGroup") {
			var isChild = false;
			for (var j = 0; j < groupShapes[i].parents.length; j++) {
				for (var k = 0; k < elementFound.length; k++) {
					if (elementFound[k].uid == groupShapes[i].parents[j]) {
						isChild = true;
					}
				}
			}
			if (isChild == true) {
				tmpRectGroups.push(groupShapes[i]);
			}
		}
	}
	var tmpRects = [];
	for (var i = 0; i < tmpRectGroups.length; i++) {
		for (var j = 0; j < rects.length; j++) {
			if (rects[j].id == tmpRectGroups[i].id) {		
				tmpRects.push(rects[j]);
//				break;
			}
		}
	}
	
	for (var i = 0; i < tmpRectGroups.length; i++) {
		var x_coor = [], y_coor = [];
		for (var j = 0; j < tmpRectGroups[i].parents.length; j++) {
			var hasParent = false;
			for (var k = 0; k < elementFound.length; k++) {
				if (tmpRectGroups[i].parents[j] == elementFound[k].uid) {
					if (elementFound[k].type == "verticalLine") {
						x_coor.push(elementFound[k].val);
					} else {
						y_coor.push(elementFound[k].val);
					}
					hasParent = true;
				}
			}
			
			if (hasParent == false) {
				var tmpRectParentLine = getHorizontalElementByUid(tmpRectGroups[i].parents[j], true);
				if (tmpRectParentLine == null) {
					tmpRectParentLine = getVerticalElementByUid(tmpRectGroups[i].parents[j], true);
					x_coor.push(tmpRectParentLine.val);
				} else {
					y_coor.push(tmpRectParentLine.val);
				}
			}
		}
		var xmin, ymin, h, w;
		if (Number(x_coor[0]) < Number(x_coor[1])) {
			xmin = Number(x_coor[0]);
		} else {
			xmin = Number(x_coor[1]);
		}
		
		if (Number(y_coor[0]) < Number(y_coor[1])) {
			ymin = Number(y_coor[0]);
		} else {
			ymin = Number(y_coor[1]);
		}
		
		h = Math.abs(Number(y_coor[0]) - Number(y_coor[1]));
		w = Math.abs(Number(x_coor[0]) - Number(x_coor[1]));
		
		tmpRects[i].x = xmin;
		tmpRects[i].y = ymin;
		tmpRects[i].width = w;
		tmpRects[i].height = h;
		
		var rectShape = $("#" + tmpRects[i].id);
		rectShape.attr({x:tmpRects[i].x, y:tmpRects[i].y, width:tmpRects[i].width, height:tmpRects[i].height});
		
	}
		
	for (var i = 0; i < tmpCntrLines.length; i++) {
		
		var new_x1 = (Number(tmpCntrLines[i].x1) - Number(verticalLines[0].val)) / zoomLevels[zoomLevel];
		var new_x2 = (Number(tmpCntrLines[i].x2) - Number(verticalLines[0].val)) / zoomLevels[zoomLevel];
		var new_y1 = (Number(tmpCntrLines[i].y1) - Number(horizontalLines[0].val)) / zoomLevels[zoomLevel];
		var new_y2 = (Number(tmpCntrLines[i].y2) - Number(horizontalLines[0].val)) / zoomLevels[zoomLevel];
		var jsonDataC = '';
		if (view3D == "xy") {
			jsonDataC = '{"model":' + curModel + ', "groupShapeId":' + tmpCntrLines[i].group + ', "shapes":[' + 
			   '{"modelId":' + curModel + ', "shapeId":' + tmpCntrLines[i].uid + ', "isConstruction": false, "x1":' + new_x1 + ', "x2":' + new_x2 +
			   ', "y1":' + new_y1 + ', "y2":' + new_y2 + ', "z1":0, "z2":0},]}';
		} else if (view3D == "yz") {
			jsonDataC = '{"model":' + curModel + ', "groupShapeId":' + tmpCntrLines[i].group + ', "shapes":[' + 
			   '{"modelId":' + curModel + ', "shapeId":' + tmpCntrLines[i].uid + ', "isConstruction": false, "y1":' + -new_x1 + ', "y2":' + -new_x2 +
			   ', "z1":' + new_y1 + ', "z2":' + new_y2 + ', "x1":0, "x2":0},]}';
		} else if (view3D == "xz") {
			jsonDataC = '{"model":' + curModel + ', "groupShapeId":' + tmpCntrLines[i].group + ', "shapes":[' + 
			   '{"modelId":' + curModel + ', "shapeId":' + tmpCntrLines[i].uid + ', "isConstruction": false, "x1":' + new_x1 + ', "x2":' + new_x2 +
			   ', "z1":' + new_y1 + ', "z2":' + new_y2 + ', "y1":0, "y2":0},]}';
		}
				
		$.ajax({
			type : 'PUT',
			url : apiBaseUrl + 'model/shape/group',
			dataType : 'json',
			data : jsonDataC,
			contentType : 'application/json',
			cache : false,
			success : function(data) {
			},
			error : function(xhr, ajaxOptions, error) {
				$('#console-log').append("<p style='color:red'> failed to update  Contour shapes :"+xhr.status+"</p>");
			}
		}).done(function(data) {
			console.log("saved in the database!");
			$('#console-log').append("<p style='color:blue'> Contour  Shapes updated :</p>");
		});
	}
	
	for (var i = 0; i < tmpTexts.length; i++) {
		var jsonDataT = '{"model":' + curModel + ', "groupShapeId":' + tmpTexts[i].group + ', "shapes":[';
		for (var j = 0; j < tmpTexts[i].shapes.length; j++) {
			var new_x = (Number(tmpTexts[i].x) - Number(verticalLines[0].val)) / zoomLevels[zoomLevel];
			var new_y = (Number(tmpTexts[i].y) - Number(horizontalLines[0].val)) / zoomLevels[zoomLevel];
			if (view3D == "xy") {
				jsonDataT += '{"modelId":' + curModel + ', "shapeId":' + tmpTexts[i].shapes[j] + ', "isConstruction": false, "x1":' + new_x + ', "y1":' + new_y + ', "x2":0, "y2":0, "z1":0, "z2":0},';
			} else if (view3D == "yz") {
				jsonDataT += '{"modelId":' + curModel + ', "shapeId":' + tmpTexts[i].shapes[j] + ', "isConstruction": false, "y1":' + -new_x + ', "z1":' + new_y + ', "x2":0, "y2":0, "x1":0, "z2":0},';
			} else if (view3D == "xz") {
				jsonDataT += '{"modelId":' + curModel + ', "shapeId":' + tmpTexts[i].shapes[j] + ', "isConstruction": false, "x1":' + new_x + ', "z1":' + new_y + ', "x2":0, "y2":0, "y1":0, "z2":0},';
			}
		}
		jsonDataT += ']}';
		
		$.ajax({
			type : 'PUT',
			url : apiBaseUrl + 'model/shape/group',
			dataType : 'json',
			data : jsonDataT,
			contentType : 'application/json',
			cache : false,
			success : function(data) {
			},
			error : function(xhr, ajaxOptions, error) {
				$('#console-log').append("<p style='color:red'> failed to update  text shapes :"+xhr.status+"</p>");
			}
		}).done(function(data) {
			console.log("saved in the database!");
			$('#console-log').append("<p style='color:blue'> Text Shapes updated :</p>");
		});
	}
	
	for (var i = 0; i < tmpRects.length; i++) {	
		var jsonDataR = '{"model":' + curModel + ', "groupShapeId":' + tmpRectGroups[i].group + ', "shapes":[';
		var updatedVal = getRectConstLineCoor(tmpRectGroups[i].parents);
		console.log(updatedVal);
		for (var j = 0; j < updatedVal.length; j++) {	
			var angle;
			if (updatedVal[j].type == "verticalLine") {
				angle = 90;
			} else {
				angle = 0;
			}
			
			var new_x1 = (Number(updatedVal[j].x1) - Number(verticalLines[0].val)) / zoomLevels[zoomLevel];
			var new_x2 = (Number(updatedVal[j].x2) - Number(verticalLines[0].val)) / zoomLevels[zoomLevel];
			var new_y1 = (Number(updatedVal[j].y1) - Number(horizontalLines[0].val)) / zoomLevels[zoomLevel];
			var new_y2 = (Number(updatedVal[j].y2) - Number(horizontalLines[0].val)) / zoomLevels[zoomLevel];
			
			if (view3D == "xy") {
				jsonDataR += '{"modelId":' + curModel + ', "shapeId":' + tmpRectGroups[i].shapes[j] + ', "isConstruction": false, "x1":' + new_x1 + ', "x2":' + new_x2;
				jsonDataR += ', "y1":' + new_y1 + ', "y2":' + new_y2 + ', "z1":0, "z2":0, "angle":' + angle + '},';
			} else if (view3D == "yz") {
				jsonDataR += '{"modelId":' + curModel + ', "shapeId":' + tmpRectGroups[i].shapes[j] + ', "isConstruction": false, "y1":' + -new_x1 + ', "y2":' + -new_x2;
				jsonDataR += ', "z1":' + new_y1 + ', "z2":' + new_y2 + ', "x1":0, "x2":0, "angle":' + angle + '},';
			} else if (view3D == "xz") {
				jsonDataR += '{"modelId":' + curModel + ', "shapeId":' + tmpRectGroups[i].shapes[j] + ', "isConstruction": false, "x1":' + new_x1 + ', "x2":' + new_x2;
				jsonDataR += ', "z1":' + new_y1 + ', "z2":' + new_y2 + ', "y1":0, "y2":0, "angle":' + angle + '},';
			}
		}
		jsonDataR += ']}';
			
		$.ajax({
			type : 'PUT',
			url : apiBaseUrl + 'model/shape/group',
			dataType : 'json',
			data : jsonDataR,
			contentType : 'application/json',
			cache : false,
			success : function(data) {
			},
			error : function(xhr, ajaxOptions, error) {
				$('#console-log').append("<p style='color:red'> failed to update shapes :"+xhr.status+"</p>");
			}
		}).done(function(data) {
			$('#console-log').append("<p style='color:blue'> Shapes updated :</p>");
			console.log("saved in the database!");
		});
	}
	
//	if (shapeType == "vertical") {
//		elementFound.push({type: 'verticalLine', id: shapeToAdjust.id, uid: shapeToAdjust.uid, parent: shapeToAdjust.parent, relpos: getVerticalRelativePosition(shapeToAdjust), val: shapeToAdjust.val});
//		elementFound = elementFound.concat(getAllChildrenVerticalLines(elementFound));
//	} else if (shapeType == "horizontal") {
//		elementFound.push({type: 'horizontalLine', id: shapeToAdjust.id, uid: shapeToAdjust.uid, parent: shapeToAdjust.parent, relpos: getHorizontalRelativePosition(shapeToAdjust), val: shapeToAdjust.val});
//		elementFound = elementFound.concat(getAllChildrenHorizontalLines(elementFound));
//	}
//	
//	var tmpShape = {parent:shapeToAdjust.parent, val:oldShapeValue};
//	if (shapeType == "vertical") {
//		for (var i = 0; i < verticalLines.length; i++) {
//			if (verticalLines[i].uid == shapeToAdjust.uid) {
//				verticalLines[i].val = oldShapeValue;
//			}
//			if (verticalLines[i].parent == shapeToAdjust.uid) {
//				verticalLines[i].val = verticalLines[i].val - (shapeToAdjust.val-oldShapeValue);
//			}
//		}
//		elementFound.push({type: 'verticalLine', id: shapeToAdjust.id, uid: shapeToAdjust.uid, parent: shapeToAdjust.parent, relpos: getVerticalRelativePosition(tmpShape), val: oldShapeValue});
//		elementFound = elementFound.concat(getAllChildrenVerticalLines(elementFound));
//	} else if (shapeType == "horizontal") {
//		for (var i = 0; i < horizontalLines.length; i++) {
//			if (horizontalLines[i].uid == shapeToAdjust.uid) {
//				horizontalLines[i].val = oldShapeValue;
//			}
//			if (horizontalLines[i].parent == shapeToAdjust.uid) {
//				horizontalLines[i].val = horizontalLines[i].val - (shapeToAdjust.val-oldShapeValue);
//			}
//		}
//		elementFound.push({type: 'horizontalLine', id: shapeToAdjust.id, uid: shapeToAdjust.uid, parent: shapeToAdjust.parent, relpos: getHorizontalRelativePosition(tmpShape), val: oldShapeValue});
//		elementFound = elementFound.concat(getAllChildrenHorizontalLines(elementFound));
//	}
//	findAllGroupShapesAssociated();
//	
//	elementFound[0].val = shapeToAdjust.val;
//	for (var i = 1; i < elementFound.length; i++) {
//		elementFound[i].val = elementFound[i].val + (shapeToAdjust.val-oldShapeValue);
//	}
//			
//	redrawCircle();
//	var tmpPos, event;
//	redrawGroupShapes(tmpPos, event);
//	
//	if (shapeType == "vertical") {
//		for (var i = 0; i < verticalLines.length; i++) {
//			if (verticalLines[i].uid == shapeToAdjust.uid) {
//				verticalLines[i].val = shapeToAdjust.val;
//			}
//			if (verticalLines[i].parent == shapeToAdjust.uid) {
//				verticalLines[i].val = verticalLines[i].val + (shapeToAdjust.val-oldShapeValue);
//			}
//		}
//	} else if (shapeType == "horizontal") {
//		for (var i = 0; i < horizontalLines.length; i++) {
//			if (horizontalLines[i].uid == shapeToAdjust.uid) {
//				horizontalLines[i].val = shapeToAdjust.val;
//			}
//			if (horizontalLines[i].parent == shapeToAdjust.uid) {
//				horizontalLines[i].val = horizontalLines[i].val = (shapeToAdjust.val-oldShapeValue);
//			}
//		}
//	}
//	
//	updateGroupShape();
//	updateCircShape();

	elementFound = [];
	groupAssociated = [];
	contourAssociated = [];
	circFound = [];
	cntrFound = [];
	groupShapeFound = [];
	oldCntrFound = [];
	oldCircFound = [];
	oldElementFound = [];
	textFound = [];
	oldTextFound = [];
	rectFound = [];
	oldRectFound = [];
	
	getModelShapes(curModel);

}