/**
 * 
 */

//######################################################
//               List of Functions
//######################################################
//   1.  resetAllPhysicalDesignVariables    Resetting all global variables for physical Design View
//   2.  loadModelShape                     based on selected model load all related shapes
//                                          call  resetAllPhysicalDesignVariables, getModelProperties, getModelShapes
//                                          
//   3.  getModelShapes                     call  getModelById, displayShapes, displayParentChildShapes
//   4.  updateShapes                       API call to refresh global variable curModelShapes
//
//
//#######################################################


function resetAllPhysicalDesignVariables(){
	texts = [];
	rects = [];
	circs = [];
	lines = [];
	circCons = [];
	selectedIntersections = [];
	elementFound = [];
	groupShapes = [];
	groupShapesAssociated = [];
	
	linesInOtherPlanes = [];
	textsInOtherPlanes = [];

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
	
	tmpIdHolder = [];
	
	drawingStat = 0;
	
	selectedElementId = null;
	selectedLine = null;

	selectedElementInters = [];
}

//================================= LOAD SHAPE For selected MODEL ===========================
//============================================================================================
function loadModelShape() {
	
	document.getElementById("grid-models").style.visibility = "visible";
	document.getElementById("model_info").style.display = "";
	
//	$('model_info').empty();
	var name = document.getElementById("select_model").value;
	var modelId = getModelIdByName(name);
	curModel = modelId;
	
	isPhysicalDesignViewLoaded = false;
	resetAllPhysicalDesignVariables();
	
	var selectedModel = getModelById(curModel);
	if (selectedModel.hasOwnProperty('childEnabled') || selectedModel.childEnabled == true) {
		physicalModelView = 'parent';
	}
	
	getModelProperties(modelId);  // load properties related to model (assigned to shapes and non-assigned)
	getModelShapes(modelId);      // load shapes related to model
	
	
	// DO WE NEED TO DISPLAY SHAPES
	//====================================================================================
	refreshShapes();
	showOrHideModelInfo(true);
	//=======================================================================
	loadPartView();
	if (isPartView) {
		document.getElementById("grid-models").style.visibility = "hidden";
		createPVToolBarForPartsView();
		displayPartInfo(curParts, true); // load parts Info     !!!!!!!!!!!!!!!!! should be load Shapes related to Model
	}
	
	document.getElementById("phy_xy_view").style.visibility = "visible";
	document.getElementById("phy_yz_view").style.visibility = "visible";
	document.getElementById("phy_xz_view").style.visibility = "visible";
	
}
//=======================================================================================
function refreshShapes(){
	isInitPhysicalDesignView = false;
	if (curModel != null ) {
		var modelFound = getModelById(curModel);                               // modelFound will have all the shapes related to that model
	//	console.log(" value of modelFound.childEnabled is : "+ modelFound.childEnabled); // will display undefined if this property is missing
		if (!modelFound.childEnabled) {
			displayShapes(curModelShapes);
			organizeShapesWithProps();
			organizeShapesFromOtherPlanes();
			inputs = '<button type="button" value="child" onclick="createModelCopyOptionsBox(this.value)">View Alternative</button>';			
			document.getElementById("physicalParentChildSwitcher").innerHTML = inputs;
			physicalModelView = 'parent';
		} else if (modelFound.childEnabled == true) {
			if (physicalModelView == 'parent') {
				displayParentChildShapes(curModelShapes);
				organizeShapesWithProps();
				organizeShapesFromOtherPlanes();
				inputs = '<button type="button" onclick="changePysicalModelView()" value="View Child">View Child</button>';
				document.getElementById("physicalParentChildSwitcher").innerHTML = inputs;
			} else if (physicalModelView == 'child') {
				displayParentChildShapes(curModelShapes);
				organizeShapesWithProps();
				organizeShapesFromOtherPlanes();
				inputs = '<button type="button" onclick="changePysicalModelView()" value="View Parent">View Parent</button>';
				document.getElementById("physicalParentChildSwitcher").innerHTML = inputs;
			} else {
				$('#console-log').append("<p style='color:red'>Error: Wrong Data</p>");
			}
		} else {
			PlaySound();
			$('#console-log').append("<p style='color:red'>Error: No current model selected</p>");
		}
	}
	
}
//========================================================================================
function getModelShapes(modelId) {
	console.log("Inside  get shapes for a Model !!!");
	if (modelId == null) {
		console.log(" Inside getModelShapes; No model selected yet")
		return;
	}
	
	var doneFunction = function( data ) {
		console.log("get model Shapes data: "+ data);
		curModelShapes = data.shapes;
	};
	
	var failFunction = function( xhr, status, error ) {
		$('#console-log').append("<p style='color:red'> failed to load model shapes :"+xhr.status+"</p>");
		console.log('failed to load the shape : '+ xhr.status);
	};
	
	var apis = new apiRomeNext();
	apis.getModelShapes(modelId, doneFunction, failFunction );	
	
}








//======================================================================================
function updateShapes(modelId){
	if (modelId == null) {
		return;
	}
	$.ajax({
		type : 'GET',
		url : apiBaseUrl + 'model/shape/' + modelId,
		contentType : 'application/json',
		cache : false,
		async : false,
		success : function(data) {
			console.log("save shape success. data: "+ data);
		},
		error : function(xhr, ajaxOptions, error) {
			$('#console-log').append("<p style='color:red'> failed to load model shapes :"+xhr.status+"</p>");
			console.log('failed to save the shape : '+ xhr.responseText);
		}
	}).done(function(data) {
		curModelShapes = data.shapes;
	});
}

//==========================================================================================
function displayDefaultShapes(defaultShape){
// this should display the default created shape after selecting view parts
	
	if (defaultShape == null) {
		console.log("Nothing to display for the default shape");
		return;
	}
	
	var canvas = document.getElementById("pdpvsvg");
	canvas.innerHTML = "";
	var div = "pdpvsvg";

	initPhysicalDesignView();
	
	var groupEndIndicator = true;
	var preGroupId = null;
	
	var rect_tmp = [];
	var circ_tmp = [];
	var text_tmp = [];
	var parents = [];
	var shapeIds = [];
	var groupShapeParents = [];

	
	canvas.innerHTML = "<line id='grid_y_pv' x1='100' y1='3' x2='100' y2='897' stroke=blue stroke-width=2/>";
	canvas.innerHTML += "<line id='grid_x_pv' x1='0%' y1='650' x2='100%' y2='650' stroke=blue stroke-width=2/>";

	
	for (var i = 0; i < defaultShape.length; i++) {
		
		
		// display construction lines
		if (defaultShape[i].shape == "LINE") {
			var parentId;
			if (!('parent' in defaultShape[i])) {
				if (Math.abs(defaultShape[i].angle - 90) < 0.0001) {
					parentId = -2; // -2 means y-axis
				} else if (Math.abs(defaultShape[i].angle) < 0.0001) {
					parentId = -1; // -1 means x-axis
				}
				
			} else {
				parentId = defaultShape[i].parent;
			}
			
			if (defaultShape[i].isConstruction) {
				if (Math.abs(defaultShape[i].angle - 90) < 0.0001) {
					// vertical line
					var x_coor = getVerticalLineCoor(defaultShape, i) * zoomLevels[zoomLevel] + verticalLines[0].val;			
					var lineId = 'grid_' + defaultShape[i].id;
//					canvas.innerHTML += "<line id=" + lineId + " x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
					verticalLines.push({id: lineId, val: Number(x_coor), uid: defaultShape[i].id, parent: parentId});
				} else if (Math.abs(defaultShape[i].angle) < 0.0001) {
					// horizontal line
					var y_coor = getHorizontalLineCoor(defaultShape, i) * zoomLevels[zoomLevel] + horizontalLines[0].val;				
					var lineId = 'grid_' + defaultShape[i].id;
//					canvas.innerHTML += "<line id=" + lineId + " x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
					horizontalLines.push({id: lineId, val: Number(y_coor), uid: defaultShape[i].id, parent: parentId});
				}
			} 	
		}
		
		// display rectangles		
		if (defaultShape[i].groupShape == "RECTANGLE") {
			console.log("rectangle!!!");
			if (defaultShape[i].parent != null) {
				parents.push(defaultShape[i].parent);
			} else if (Math.abs(defaultShape[i].angle - 90) < 0.0001) {
				parents.push(-2);
			} else {
				parents.push(-1);
			}
			shapeIds.push(defaultShape[i].id);
			
			if (Math.abs(defaultShape[i].angle - 90) < 0.0001) {
				rect_tmp.splice(0, 0, defaultShape[i].x1);
				if (rect_tmp.length == 4) {
					displayRectFill(rect_tmp, parents, shapeIds, defaultShape[i].group, div);
					rect_tmp = [];
					parents = [];
					shapeIds = [];
				}
			} else if (Math.abs(defaultShape[i].angle) < 0.0001) {
				rect_tmp.push(defaultShape[i].y1);
				if (rect_tmp.length == 4) {
					displayRectFill(rect_tmp, parents, shapeIds, defaultShape[i].group, div);
					rect_tmp = [];
					parents = [];
					shapeIds = [];
				}
			}
			
			
		}
		// display Texts
		if (defaultShape[i].groupShape == "TEXT") {
			console.log("text!!!");
			
			if (defaultShape[i].parent != null) {
				parents.push(defaultShape[i].parent);
			} else if (Math.abs(defaultShape[i].angle - 90) < 0.0001) {
				parents.push(-2);
			} else if (Math.abs(defaultShape[i].angle - 0) < 0.0001) {
				parents.push(-1);
			} else {
				console.log("------------- angle 45");
			}
			shapeIds.push(defaultShape[i].id);
			
			var text_element_tmp = {};
			text_element_tmp.x = defaultShape[i].x1;
			text_element_tmp.y = defaultShape[i].y1;
			text_tmp.push(text_element_tmp);
			
			if (text_tmp.length == 3) {
				var x = text_tmp[0].x * zoomLevels[zoomLevel] + verticalLines[0].val;
				var y = text_tmp[0].y * zoomLevels[zoomLevel] + horizontalLines[0].val;
				console.log("x = " + x + " y = " + y);
				
				var textId = "text" + textNumber;
				if (defaultShape[i].property) {
					var foundModelProp = null;
					for (var j = 0; j < curModelProperties.length; j++) {
						if (curModelProperties[j].id == defaultShape[i].property.id) {
							foundModelProp = curModelProperties[j];
						}
					}
					if (foundModelProp.propertyModifierType == 11) {
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='start'>"+foundModelProp.defaultValue+"</text>";
					} else if(foundModelProp.propertyModifierType == 13) {
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='middle'>"+foundModelProp.defaultValue+"</text>";
					} else if(foundModelProp.propertyModifierType == 17) {
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='end'>"+foundModelProp.defaultValue+"</text>";
					} else {
						console.log("Wrong Text Modifier Type!");
					}
					
				} else {
					canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";
				}

				texts.push({id:textId, x:x, y:y, parents:parents, group: defaultShape[i].group,shapeId: shapeIds[2] });
				groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: defaultShape[i].group, shapeId: shapeIds[2]});
				textNumber++;
				text_tmp = [];
				parents = [];
				shapeIds = [];
			}	
		}
		
		if (defaultShape[i].groupShape == "LINE") {
			console.log("contour!!!");
			if (defaultShape[i].shape == "LINE") {
				
				//AL: probably need a line id and need to take care of zoom and move
				
				lineId = "line_" + lineNumber;
				
				var real_x1, real_x2, real_y1, real_y2;
				
				real_x1 = Number(defaultShape[i].x1) + verticalLines[0].val;
				real_x2 = Number(defaultShape[i].x2) + verticalLines[0].val;
				real_y1 = Number(defaultShape[i].y1) + horizontalLines[0].val;
				real_y2 = Number(defaultShape[i].y2) + horizontalLines[0].val;
				
				console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
				
				lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: defaultShape[i].id})
				
				canvas.innerHTML += "<line id='" + lineId + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
				
				lineNumber++;
				
			} else if (defaultShape[i].shape == "SMALLARC" || defaultShape[i].shape == "BIGARC") {
				
				var circConId = "circCon" + circConNumber;
				
				var real_x1, real_x2, real_y1, real_y2;
				real_x1 = Number(defaultShape[i].x1) + verticalLines[0].val;
				real_x2 = Number(defaultShape[i].x2) + verticalLines[0].val;
				real_y1 = Number(defaultShape[i].y1) + horizontalLines[0].val;
				real_y2 = Number(defaultShape[i].y2) + horizontalLines[0].val;
				console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
				
				var radius;
				var groupParent;
				for (var j = 0; j < defaultShape.length; j++) {		
					if (shapes[j].group == shapes[i].groupShapeParent) {
						radius = defaultShape[j].width;
					}
				}
					
				var largeArcFlag;
				if (defaultShape[i].shape == "SMALLARC") {
					canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 0 0 ' + real_x2 + ' ' + real_y2 + '" stroke="blue" stroke-width="5" fill="none"/>';
					largeArcFlag = false;
				} else {
					canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 1 0 ' + real_x2 + ' ' + real_y2 + '" stroke="blue" stroke-width="5" fill="none"/>';
					largeArcFlag = true;
				}
			
				circCons.push({id: circConId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, r: radius, largeArcFlag: largeArcFlag, uid: shapes[i].id, group: defaultShape[i].group, groupShapeParent: defaultShape[i].groupShapeParent});
				
//				var circCntrParents = [];
//				circCntrParents.push(shapes[i].groupShapeParent);
//				groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents: groupShapeParents});
				
				circConNumber++;
				
			} else {
				 console.log("Wrong Shape for Group Shape");
			}
			
			if (preGroupId == null) {
				if (defaultShape[i].shape == "SMALLARC" || defaultShape[i].shape == "BIGARC") {
					groupShapeParents.push(defaultShape[i].groupShapeParent);
				} else if (defaultShape[i].parent != null) {
					parents.push(defaultShape[i].parent);
				} else if (Math.abs(defaultShape[i].angle - 90) < 0.0001) {
					parents.push(-2);
				} else {
					parents.push(-1);
				}
				
				shapeIds.push(defaultShape[i].id);
				
				preGroupId = defaultShape[i].group;
				
			} else if (defaultShape[i].group != preGroupId) {
//				groupShapes.push({type:"cntrGroup", id:lineId, parents:parents, shapes: shapeIds, group: preGroupId, groupShapeParents:groupShapeParents});
//				parents = [];
//				shapeIds = [];
//				groupShapeParents = [];
				
				if (defaultShape[i].shape == "SMALLARC" || defaultShape[i].shape == "BIGARC") {
					groupShapeParents.push(defaultShape[i].groupShapeParent);
					parents.push(defaultShape[i].groupShapeParent);
				} else if (defaultShape[i].parent != null) {
					parents.push(defaultShape[i].parent);
				} else if (Math.abs(defaultShape[i].angle - 90) < 0.0001) {
					parents.push(-2);
				} else {
					parents.push(-1);
				}
				
				shapeIds.push(defaultShape[i].id);
				
				preGroupId = defaultShape[i].group;
				
				
			} else {
				if (defaultShape[i].shape == "SMALLARC" || defaultShape[i].shape == "BIGARC") {
					groupShapeParents.push(defaultShape[i].groupShapeParent);
					parents.push(defaultShape[i].groupShapeParent);
				} else if (defaultShape[i].parent != null) {
					parents.push(defaultShape[i].parent);
				} else if (Math.abs(defaultShape[i].angle - 90) < 0.0001) {
					parents.push(-2);
				} else {
					parents.push(-1);
				}
				
				shapeIds.push(defaultShape[i].id);
				
				preGroupId = defaultShape[i].group;
			}
		
			if (i == defaultShape.length - 1) {
				groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: defaultShape[i].group, groupShapeParents:groupShapeParents});
				parents = [];
				shapeIds = [];
				groupShapeParents = [];
			}
				
//			groupShapes.push({type:"cntrGroup", id:lineId, parents});	
//			groupShapes.push({type:"rectGroup", id:rcflId, parents:parents, shapes: shapeIds, group: groupId});	
		}
			
		if (defaultShape[i].groupShape == "CIRCLE") {
			console.log("display circle!!!");
			
			if (defaultShape[i].parent != null) {
				parents.push(defaultShape[i].parent);
			} else if (Math.abs(defaultShape[i].angle - 90) < 0.0001) {
				parents.push(-2);
			} else if (Math.abs(defaultShape[i].angle) < 0.0001) {
				parents.push(-1);
			}
			
			shapeIds.push(defaultShape[i].id);
			
			var circ_element_tmp = {};
			circ_element_tmp.x1 = defaultShape[i].x1;
			circ_element_tmp.y1 = defaultShape[i].y1;
			circ_element_tmp.radius = defaultShape[i].width;
			circ_tmp.push(circ_element_tmp);
			
			if (circ_tmp.length == 4) {
				displayCirc(circ_tmp, parents, shapeIds, defaultShape[i].group, div);
				circ_tmp = [];
				parents = [];
				shapeIds = [];
				
			}
			
		}
			
	}
		
}

function organizeShapesWithProps() {
		
	if (view3D == 'xy') {
		
		for (var i = 0; i < curModelShapes.length; i++) {
			if (curModelShapes[i].isConstruction == true) {
				if (curModelShapes[i].hasOwnProperty('property')) {
					
					// TODO: Add shape value and prop value match check here
					
					if (curModelShapes[i].shapeType == 1) {
						var isInPlane = false;
						var lineFound = null;
						for (var j = 0; j < horizontalLines.length; j++) {
							if (horizontalLines[j].uid == curModelShapes[i].id && horizontalLines[j].plane == "xy") {
								isInPlane = true;
								lineFound = horizontalLines[j];
								lineFound.type = "horizontal";
								lineFound.value = horizontalLines[j].val;
							}
						}
						if (isInPlane == true) {
							updateShapesWithProp(lineFound, curModelShapes[i].property.id);
						}
					} else if (curModelShapes[i].shapeType == 3) {
						var isInPlane = false;
						var lineFound = null;
						for (var j = 0; j < verticalLines.length; j++) {
							if (verticalLines[j].uid == curModelShapes[i].id && verticalLines[j].plane == "xy") {
								isInPlane = true;
								lineFound = verticalLines[j];
								lineFound.type = "vertical";
								lineFound.value = verticalLines[j].val;
							}
						}
						if (isInPlane == true) {
							updateShapesWithProp(lineFound, curModelShapes[i].property.id);
						}
					}
				}
			}
		}
				
	} else if (view3D == 'yz') {
		
		for (var i = 0; i < curModelShapes.length; i++) {
			if (curModelShapes[i].isConstruction == true) {
				if (curModelShapes[i].hasOwnProperty('property')) {
					
					// TODO: Add shape value and prop value match check here
					
					if (curModelShapes[i].shapeType == 3) {
						var isInPlane = false;
						var lineFound = null;
						for (var j = 0; j < horizontalLines.length; j++) {
							if (horizontalLines[j].uid == curModelShapes[i].id && horizontalLines[j].plane == "yz") {
								isInPlane = true;
								lineFound = horizontalLines[j];
								lineFound.type = "horizontal";
								lineFound.value = horizontalLines[j].val;
							}
						}
						if (isInPlane == true) {
							updateShapesWithProp(lineFound, curModelShapes[i].property.id);
						}
					} else if (curModelShapes[i].shapeType == 5) {
						var isInPlane = false;
						var lineFound = null;
						for (var j = 0; j < verticalLines.length; j++) {
							if (verticalLines[j].uid == curModelShapes[i].id && verticalLines[j].plane == "yz") {
								isInPlane = true;
								lineFound = verticalLines[j];
								lineFound.type = "vertical";
								lineFound.value = verticalLines[j].val;
							}
						}
						if (isInPlane == true) {
							updateShapesWithProp(lineFound, curModelShapes[i].property.id);
						}
					}
				}
			}
		}
		
	} else if (view3D == 'xz') {
		
		for (var i = 0; i < curModelShapes.length; i++) {
			if (curModelShapes[i].isConstruction == true) {
				if (curModelShapes[i].hasOwnProperty('property')) {
					
					// TODO: Add shape value and prop value match check here
					
					if (curModelShapes[i].shapeType == 1) {
						var isInPlane = false;
						var lineFound = null;
						for (var j = 0; j < horizontalLines.length; j++) {
							if (horizontalLines[j].uid == curModelShapes[i].id && horizontalLines[j].plane == "xz") {
								isInPlane = true;
								lineFound = horizontalLines[j];
								lineFound.type = "horizontal";
								lineFound.value = horizontalLines[j].val;
							}
						}
						if (isInPlane == true) {
							updateShapesWithProp(lineFound, curModelShapes[i].property.id);
						}
					} else if (curModelShapes[i].shapeType == 5) {
						var isInPlane = false;
						var lineFound = null;
						for (var j = 0; j < verticalLines.length; j++) {
							if (verticalLines[j].uid == curModelShapes[i].id && verticalLines[j].plane == "xz") {
								isInPlane = true;
								lineFound = verticalLines[j];
								lineFound.type = "vertical";
								lineFound.value = verticalLines[j].val;
							}
						}
						if (isInPlane == true) {
							updateShapesWithProp(lineFound, curModelShapes[i].property.id);
						}
					}
				}
			}
		}
		
	}
} 


