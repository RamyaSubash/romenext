// New Changes introduced by Baya
//  removed the   onclick="switchDeco('Physical'),initPhysicalDesignView(), initPartView(false), switchPhysicalViewStatus('physical_design')" from romenextgui3 and 
// created a function to include all three calls; added the verification that a Type has Been selected before switching to Phyical View.
// Deprecated
function switchToPhysicalView(){
	if(curType != null){
		switchDeco('Physical');
//		initPhysicalDesignView();   already in switchDeco()
		document.getElementById("pdpv").style.display = "none";
		document.getElementById("pdsv").style.display = "block";
		document.getElementById("grid-types").style.visibility = "visible";
		if(curModel) {document.getElementById("grid-models").style.visibility = "visible";  }
		getModelShapes(curModel);
		switchPhysicalViewStatus('physical_design');
		refreshShapes();
//		initPartView(false);
	}else {
		PlaySound();
		$('#console-log').append(" No Current Type selected; Cannot switch to Physical Design View");
		console.log(" No Current Type selected Cannot switch to Physical Design View");
		}
}

function initPhysicalView() {
	
	console.log("try to init");
	var request = $.ajax({
		url: apiBaseUrl + "deco/physical",
		method: "GET",
		dataType: "json"
	});
	
	request.done(function (jsonData) {
		console.log("get shapes");
		console.log(jsonData);
		loadView(jsonData);
		
	});
	
	request.fail(function (xhr, status, error) {
        alert(xhr.status);
		console.log("Error: " + xhr.responseText);
	});
	
};

function parseResponse(jsonData) {
	
};

function loadView(jsonData) {
	
//	var output = "<svg height='750' width='100%'>"
//				 + "<line x1='0' y1='60%' x2='100%' y2='60%' style='stroke:rgb(0,0,0);stroke-width:2' />"
//				 + "<line x1='40%' y1='0' x2='40%' y2='100%' style='stroke:rgb(0,0,0);stroke-width:2' />"
//				 + "<line x1='0' y1='80%' x2='100%' y2='80%' style='stroke:rgb(255,0,0);stroke-width:2' stroke-linecap='round' stroke-dasharray='5, 3' />"
//				 + "<line x1='60%' y1='0' x2='60%' y2='100%' style='stroke:rgb(255,0,0);stroke-width:2' stroke-linecap='round' stroke-dasharray='5, 3'/>"
//				 + "<line x1='60%' y1='0' x2='60%' y2='100%' style='stroke:rgb(255,0,0);stroke-width:2' stroke-linecap='round' stroke-dasharray='5, 3'/>"
//				 + "</svg>";
	
//	var output = "<svg height='750' width='100%'>";
	var output = "<g transform='translate(0 0)'>";
	
	
	console.log(jsonData.length);
	
	for (var i = 0; i < jsonData.length; i++) {
		
		x0 = jsonData[i][0].x;
		y0 = jsonData[i][0].y;
		h = jsonData[i][0].height;
		w = jsonData[i][0].width;
		
		output += "<rect onmousedown='startMove(event, \"group\")' onmouseup='endMove()' transform='translate(50 50)' x='" + x0 +"' y='" + y0 + "' width='" + h + "' height='" + w + "' style='fill:blue;stroke:black;stroke-width:2;opacity:0.5' />"
		
	}
	
	output += "</g>";
	
	var py = document.getElementById("pvCysvg");
	py.innerHTML = output;
	
//	svgDraggable();
};


function svgDraggable() {
	
	console.log("svgdraggable");
	$(function() {
	    // there's the gallery and the trash
	    var $gallery = $( "#svgdraggable" );
	 
	    // let the gallery items be draggable
	    $gallery.draggable({
	      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
	      revert: "invalid", // when not dropped, the item will revert back to its initial position
	      containment: "document",
	      helper: "clone",
	      cursor: "move",
	      start:function() {
	          $(this).parent().parent().parent().parent().addClass('nooverflow');              
	      },
	      stop:function() {
	          $(this).parent().parent().parent().parent().removeClass('nooverflow');            
	      }
	    });
	    
	    var $workspace = $("#pvCy");
	    
	    $workspace.droppable({
//	    	accept: "*",
//	        activeClass: "ui-state-highlight",
//	        drop: function() {console.log("dropped!!!")}
	    });
	    
	  });
};


function startMove(evt, moveType){
	 x1 = evt.clientX;
 	 y1 = evt.clientY;
 	 document.documentElement.setAttribute("onmousemove","moveIt(event)")
 	 
 	 if (moveType == 'single'){
 	 	C = evt.target;
 	 }
 	 else {
 	 	C = evt.target.parentNode;
 	 }
};

function moveIt(evt){
    translation = C.getAttributeNS(null, "transform").slice(10,-1).split(' ');
	sx = parseInt(translation[0]);
 	sy = parseInt(translation[1]);

 	C.setAttributeNS(null, "transform", "translate(" + (sx + evt.clientX - x1) + " " + (sy + evt.clientY - y1) + ")");
	x1 = evt.clientX;
 	y1 = evt.clientY;
};

function endMove(){
 	document.documentElement.setAttributeNS(null, "onmousemove",null)
};

function initPhysicalDesignView() {
	console.log("Entered == initPhysicalDesignView == ");
	loadModels();                                       // load models for this type to display in menu
	
	var toolbarManager = new toolbarManagerRomeNext();
	toolbarManager.createPhyTool();	
//	createPhyTool();                                   // create the menu model with a list of models if any
	
	recreateModelDropdownMenu();                        // this will position the select to the selected model 
	if (!isInitPhysicalDesignView) {                    // isInitPhysicalDesignView = false;
		settingsGloablVariablesDesignView();
		selectedIntersections = [];
	}
	
	
}

function findMouseCoor(event) {
	
	if (!(drawingStat != 0 && shape == "move")) {
		var bound = document.getElementById("pdsvsvg").getBoundingClientRect();
		x0 = bound.left;
		y0 = bound.top;
		var mouse_x = Math.round(((event.clientX - x0 - verticalLines[0].val) * 10 / zoomLevels[zoomLevel])) / 10 ;
		var mouse_y = Math.round((-(event.clientY - y0 - horizontalLines[0].val) * 10 / zoomLevels[zoomLevel])) / 10;
		var mouse_coor = document.getElementById("mouse_coor");
		mouse_coor.innerHTML = "(" + mouse_x + ", " + mouse_y + ")";
	}
}

function saveShape(type, xval1, yval1, xval2, yval2, height, width, radius, parentid, absx1, absy1, absx2, absy2) {
	
	console.log("save a shape. let's see what will happen");
	var jsonData;
	console.log("xval = " + xval1);
	if (parentid == -1) {
		parentid = -1;
	} else if (parentid == -2) {
		parentid = -2
	}
	
	var parentChildState = null;
	if (physicalModelView == "parent") {
		parentChildState = 1;
	} else if (physicalModelView == "child") {
		parentChildState = 3;
	}
	//  this test will never be true ===========================================================================
	if (parentChildState == null) {
		if (type == "verticalLine") {
			if (view3D == 'xy') {
				jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, "x1":' + xval1 + ', "y1":0.0, "z1":0.0, "x2":'
							+ xval1 + ', "y2":0.0, "z2":0.0, "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":90, "parent":' 
							+ parentid + ', "shapeType":3}';
			} else if (view3D == 'xz') {
				jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, "x1":' + xval1 + ', "y1":0.0, "z1":0.0, "x2":'
							+ xval1 + ', "y2":0.0, "z2":0.0, "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":90, "parent":'
							+ parentid + ', "shapeType":5}';
			} else if (view3D == 'yz') {
				jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, "x1":0.0, "y1":' + xval1 + ', "z1":0.0, "x2":0.0, "y2":' 
							+ xval1 + ', "z2":0.0, "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":90, "parent":'
							+ parentid + ', "shapeType":5}';
			} else {
				console.log("Wrong Physical View Name: " + viewChange);
				$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
			}
//			jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, "x1":' + xval1 + ', "y1":0.0, "z1":0.0, "x2":'
//						+ xval1 + ', "y2":0.0, "z2":0.0, "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":90, "parent":' + parentid + '}';
			
		} else if (type == "horizontalLine") {
			if (view3D == 'xy') {
				jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, "x1":0.0 , "y1":' + yval1 + ', "z1":0.0, "x2":0.0, "y2":'
							+ yval1 + ', "z2":0.0, "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":0, "parent":' 
							+ parentid + ', "shapeType":1}';
				jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, "x1":0.0 , "y1":0.0, "z1":' + yval1 + ', "x2":0.0, "y2":0.0, "z2":'
							+ yval1 +', "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":0, "parent":' 
							+ parentid + ', "shapeType":1}';

			} else if (view3D == 'xz') {
				jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, "x1":0.0 , "y1":0.0, "z1":' + yval1 + ', "x2":0.0, "y2":0.0, "z2":'
							+ yval1 +', "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":0, "parent":' 
							+ parentid + ', "shapeType":1}';
			} else if (view3D == 'yz') {
				jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, "x1":0.0 , "y1":0.0, "z1":' + yval1 + ', "x2":0.0, "y2":0.0, "z2":'
							+ yval1 + ', "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":0, "parent":' 
							+ parentid + ', "shapeType":3}';
			} else {
				console.log("Wrong Physical View Name: " + viewChange);
				$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
			}
//			jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, "x1":0.0 , "y1":' + yval1 + ', "z1":0.0, "x2":0.0, "y2":'
//						+ yval1 + ', "z2":0.0, "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":0, "parent":' + parentid + '}';
		}
	} else {
		if (type == "verticalLine") {
			if (view3D == 'xy') {
				jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, "x1":' + xval1 + ', "y1":0.0, "z1":0.0, "x2":'
							+ xval1 + ', "y2":0.0, "z2":0.0, "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":90, "parent":' 
							+ parentid + ', "parentChildState":' + parentChildState + ', "shapeType":3}';
			} else if (view3D == 'xz') {
				jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, "x1":' + xval1 + ', "y1":0.0, "z1":0.0, "x2":'
							+ xval1 + ', "y2":0.0, "z2":0.0, "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":90, "parent":' 
							+ parentid + ', "parentChildState":'+parentChildState + ', "shapeType":5}';
			} else if (view3D == 'yz') {
				jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, "x1":0.0, "y1":' + xval1 + ', "z1":0.0, "x2":0.0, "y2":'
							+ xval1 + ', "z2":0.0, "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":90, "parent":' 
							+ parentid + ', "parentChildState":'+parentChildState + ', "shapeType":5}';
			} else {
				console.log("Wrong Physical View Name: " + viewChange);
				$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
			}
//			jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, "x1":' + xval1 + ', "y1":0.0, "z1":0.0, "x2":'
//						+ xval1 + ', "y2":0.0, "z2":0.0, "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":90, "parent":' + parentid + ', "parentChildState":'+parentChildState+'}';
			
		} else if (type == "horizontalLine") {
			if (view3D == 'xy') {
				jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, "x1":0.0 , "y1":' + yval1 + ', "z1":0.0, "x2":0.0, "y2":'
							+ yval1 + ', "z2":0.0, "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":0, "parent":' 
							+ parentid + ', "parentChildState":' + parentChildState + ', "shapeType":1}';
			} else if (view3D == 'xz') {
				jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, "x1":0.0 , "y1":0.0, "z1":' + yval1 + ', "x2":0.0, "y2":0.0, "z2":' 
							+ yval1 + ', "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":0, "parent":' 
							+ parentid + ', "parentChildState":' + parentChildState + ', "shapeType":1}';
			} else if (view3D == 'yz') {
				jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, "x1":0.0 , "y1":0.0, "z1":' + yval1 + ', "x2":0.0, "y2":0.0, "z2":'
							+ yval1 + ', "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":0, "parent":' 
							+ parentid + ', "parentChildState":' + parentChildState + ', "shapeType":3}';
			} else {
				console.log("Wrong Physical View Name: " + viewChange);
				$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
			}
//			jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, "x1":0.0 , "y1":' + yval1 + ', "z1":0.0, "x2":0.0, "y2":'
//						+ yval1 + ', "z2":0.0, "x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":0, "parent":' + parentid + ', "parentChildState":'+parentChildState+'}';
		}
	}
	
	$.ajax({
		type : 'POST',
		url : apiBaseUrl + 'model/shape/',
		dataType : 'json',
		data : jsonData,
		contentType : 'application/json',
		cache : false,
		success : function(data) {
			console.log("save shape success. data: ");
		},
		error : function(xhr, ajaxOptions, error) {
			 $('#console-log').append("<p style='color:red'>Failed to save the shape"+xhr.status +" </p>");
			console.log('failed to save the shape : '+ xhr.responseText);
		}
	}).done(function(data) {
		// TODO: update id in memory
		console.log("uid = " + data.id);
		var grid = $("#grid_tmp");
		var gridid = "grid_" + data.id;
		grid.attr({id: gridid});
		console.log("current uid = " + gridid);
		if (type == "verticalLine") {
//			if (view3D == 'xy') {
//				verticalLines.push({id: gridid, val: absx1, uid: data.id, parent: parentid, plane: "xy"});
//			} else if (view3D == 'yz') {
//				verticalLines.push({id: gridid, val: absx1, uid: data.id, parent: parentid, plane: "yz"});
//			} else if (view3D == 'xz') {
//				verticalLines.push({id: gridid, val: absx1, uid: data.id, parent: parentid, plane: "xz"});
//			}
			verticalLines.push({id: gridid, val: absx1, uid: data.id, parent: parentid, plane: view3D});
		} else if (type == "horizontalLine") {
			horizontalLines.push({id: gridid, val: absy1, uid: data.id, parent: parentid, plane: view3D});
		}
		curModelShapes.push(data);
		// may be need to update shapes in corresponding curModels[].shapes 
	});
	
}

//===============================================================================
// Deprecated
function loadShape() {
	
	console.log("loading shape curent type = " + curType);
	// AL: add a shape if there no shape exists associated with this type
	isInitPhysicalDesignView = false;
	initPhysicalDesignView();
	initPhysicalDisplayView();
	
	if (curType == null) {
		return;
	}
	
//	console.log(findTypeIdByName(curType));
	var typeId = findTypeIdByName(curType);
//	console.log("cur type id = " + typeId);
	var json_getModel = '{"typeName": "' + curType + '", "repoid": ' + Number(selectedMetaData) + '}'
//	console.log(json_getModel);
	
	var model;
	$.ajax({
		type : 'POST',
		url : apiBaseUrl + 'model/model/all',
		dataType : 'json',
		data : json_getModel,
		contentType : 'application/json',
		cache : false,
		success : function(data) {
			console.log("success to get models");
		},
		error : function(xhr, ajaxOptions, error) {
			alert(xhr.status);
			console.log('failed to save the shape : '+ xhr.responseText);
		}
	}).done(function(data) {
		// TODO: update id in memory
		console.log(data);
		// assume a type only has one model
		console.log("model length = " + data.models.length);
		if (data.models.length != 1) {
			model = null;
		} else {
			model = data.models[0];
			curModel = model.id;
			console.log("curModel = " + curModel);
		}
		
		
		if (model == null) {
			addDefaultModel(typeId);
		} else {
			getShapes();
		}
		
		
	});
	
}

function findTypeIdByName(name) {
	for (var key in typeMap) {
		console.log("Loaded[" + key + "] == " + typeMap[key] );
		if (!typeMap.hasOwnProperty(key)) {
			continue;
		}
		if (typeMap[key].name == name) {
			return typeMap[key].id;
		}
	}
}


function addDefaultModel(typeId) {
	if (selectedMetaData == null || typeId == null) {
		return;
	}
	
	var json_addModel = '{"repoid": ' + selectedMetaData + ', "typeid": ' + Number(typeId) + ', "name": "default"}'
	
	console.log("try to add model");
	console.log(json_addModel);
	
	$.ajax({
		type : 'POST',
		url : apiBaseUrl + 'model/model/',
		dataType : 'json',
		data : json_addModel,
		contentType : 'application/json',
		cache : false,
		success : function(data) {
			console.log("success to add a model");
		},
		error : function(xhr, ajaxOptions, error) {
			alert(xhr.status);
			console.log('failed to save the shape : '+ xhr.responseText);
		}
	}).done(function(data) {
		// TODO: update id in memory
		console.log("what we need to do after adding a new model?");
		curModel = data.updatedModel.id;
		console.log("curModel = " + curModel);
	});
}

function getShapes() {
	
	console.log("get shapes!!!");
	$.ajax({
		type : 'GET',
		url : apiBaseUrl + 'model/shape/' + curModel,
		contentType : 'application/json',
		cache : false,
		success : function(data) {
			console.log("get all shape success. data: "+ data.name);
		},
		error : function(xhr, ajaxOptions, error) {
			 $('#console-log').append("<p style='color:red'> failed to load shapes :"+xhr.status+"</p>");
			console.log('failed to load shapes : '+ xhr.responseText);
		}
	}).done(function(data) {
		//console.log(data);
		$('#console-log').append("<p style='color:blue'> All shapes for current Model loaded :</p>");
		isPhysicalDesignViewLoaded = false;
		displayShapes(data.shapes);
		organizeShapesWithProps();
		organizeShapesFromOtherPlanes();
	});
}

function displayShapes(shapes) {
		
	var canvas = document.getElementById("pdsvsvg");
	var div = "pdsvsvg";
	resetMemo();   // doing nothing !!!!!!!!!!!!!!!!!!
	
//	removePhysicalDesignView();
	initPhysicalDesignView();
	
	console.log("display shapes");
	console.log(shapes);
	
	var groupEndIndicator = true;
	var preGroupId = null;
	
	var rect_tmp = [];
	var circ_tmp = [];
	var text_tmp = [];
	var parents = [];
	var shapeIds = [];
	var groupShapeParents = [];
	
	var parentChildState = 1;
	if (physicalModelView == "child") {
		parentChildState = 3;
	}
	
	for (var i = 0; i < shapes.length; i++) {
		
		if (shapes[i].parentChildState == parentChildState) {
		
		if (shapes[i].shape == "LINE") {
			var parentId;
			if (!('parent' in shapes[i])) {
				if (Math.abs(shapes[i].angle - 90) < 0.0001) {
					parentId = -2; // -2 means y-axis
				} else if (Math.abs(shapes[i].angle) < 0.0001) {
					parentId = -1; // -1 means x-axis
				}
				
			} else {
				parentId = shapes[i].parent;
			}
			
			if (shapes[i].isConstruction) {
				
				var tmp_x_coor = getVerticalLineCoor(shapes, i);
				if (tmp_x_coor != null) {
					var x_coor = tmp_x_coor * zoomLevels[zoomLevel] + verticalLines[0].val;
					if (view3D == 'yz') {
						x_coor = -x_coor+200;
						if (parentId == -1) {
							parentId = -2;
						}
					}
					var lineId = 'grid_' + shapes[i].id;				
					// xy - rgb(0,204,255)  
					// yz - rgb(66,244,101)
					// xz - rgb(128,0,128)
					if (view3D == 'xy' || view3D == 'xz') {
						if (shapes[i].x1 != 0) {
							if (shapes[i].shapeType == 3) {
								canvas.innerHTML += "<line id=" + lineId + " x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(0,204,255) stroke-width=2 stroke-dasharray='10,10'/>";
								verticalLines.push({id: lineId, val: Number(x_coor), uid: shapes[i].id, parent: parentId, plane: "xy"});
							} else if (shapes[i].shapeType == 5) {
								canvas.innerHTML += "<line id=" + lineId + " x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(128,0,128) stroke-width=2 stroke-dasharray='10,10'/>";
								verticalLines.push({id: lineId, val: Number(x_coor), uid: shapes[i].id, parent: parentId, plane: "xz"});
							}
						}
					} else if (view3D == 'yz') {
						if (shapes[i].y1 != 0) {
							if (shapes[i].shapeType == 1) {
								canvas.innerHTML += "<line id=" + lineId + " x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(0,204,255) stroke-width=2 stroke-dasharray='10,10'/>";
								verticalLines.push({id: lineId, val: Number(x_coor), uid: shapes[i].id, parent: parentId, plane: "xy"});
							} else if (shapes[i].shapeType == 5) {
								var tmpX = -Number(x_coor) + 200;
								canvas.innerHTML += "<line id=" + lineId + " x1='" + tmpX + "' y1='3' x2='" + tmpX + "' y2='897' stroke=rgb(66,244,101) stroke-width=2 stroke-dasharray='10,10'/>";
								verticalLines.push({id: lineId, val: Number(tmpX), uid: shapes[i].id, parent: parentId, plane: "yz"});
							}
						}
					} 
//					canvas.innerHTML += "<line id=" + lineId + " x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
//					verticalLines.push({id: lineId, val: Number(x_coor), uid: shapes[i].id, parent: parentId});					
				}
				
				var tmp_y_coor = getHorizontalLineCoor(shapes, i);				
				if (tmp_y_coor != null) {
					var y_coor = tmp_y_coor * zoomLevels[zoomLevel] + horizontalLines[0].val;	
					var lineId = 'grid_' + shapes[i].id;
					// xy - rgb(0,204,255)  
					// yz - rgb(66,244,101)
					// xz - rgb(128,0,128)
					if (view3D == 'yz' || view3D == 'xz') {
						if (shapes[i].z1 != 0) {
							if (shapes[i].shapeType == 1) {
								canvas.innerHTML += "<line id=" + lineId + " x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(128,0,128) stroke-width=2 stroke-dasharray='10,10'/>";
								horizontalLines.push({id: lineId, val: Number(y_coor), uid: shapes[i].id, parent: parentId, plane: "xz"});
							} else if (shapes[i].shapeType == 3) {
								canvas.innerHTML += "<line id=" + lineId + " x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(66,244,101) stroke-width=2 stroke-dasharray='10,10'/>";
								horizontalLines.push({id: lineId, val: Number(y_coor), uid: shapes[i].id, parent: parentId, plane: "yz"});
							}
						}
					} else if (view3D == 'xy') {
						if (shapes[i].y1 != 0) {
							if (shapes[i].shapeType == 1) {
								canvas.innerHTML += "<line id=" + lineId + " x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(0,204,255) stroke-width=2 stroke-dasharray='10,10'/>";
								horizontalLines.push({id: lineId, val: Number(y_coor), uid: shapes[i].id, parent: parentId, plane: "xy"});
							} else if (shapes[i].shapeType == 5) {
								var tmpY = Number(y_coor)-1000;
								canvas.innerHTML += "<line id=" + lineId + " x1='0%' y1='" + tmpY + "' x2='100%' y2='" + tmpY + "' stroke=rgb(66,244,101) stroke-width=2 stroke-dasharray='10,10'/>";
								horizontalLines.push({id: lineId, val: Number(tmpY), uid: shapes[i].id, parent: parentId, plane: "yz"});
							}
						}
					}
//					canvas.innerHTML += "<line id=" + lineId + " x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
//					horizontalLines.push({id: lineId, val: Number(y_coor), uid: shapes[i].id, parent: parentId});
				}
				
//				if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//					// vertical line
//					var tmp_x_coor = getVerticalLineCoor(shapes, i);
//					if (tmp_x_coor != null) {
//						var x_coor = tmp_x_coor * zoomLevels[zoomLevel] + verticalLines[0].val;
//						var lineId = 'grid_' + shapes[i].id;
//						canvas.innerHTML += "<line id=" + lineId + " x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
//						verticalLines.push({id: lineId, val: Number(x_coor), uid: shapes[i].id, parent: parentId});					
//					}
////					var lineId = 'grid_' + shapes[i].id;
////					canvas.innerHTML += "<line id=" + lineId + " x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
////					verticalLines.push({id: lineId, val: Number(x_coor), uid: shapes[i].id, parent: parentId});
//				} else if (Math.abs(shapes[i].angle) < 0.0001) {
//					// horizontal line
//					var tmp_y_coor = getHorizontalLineCoor(shapes, i);				
//					if (tmp_y_coor != null) {
//						var y_coor = tmp_y_coor * zoomLevels[zoomLevel] + horizontalLines[0].val;	
//						var lineId = 'grid_' + shapes[i].id;
//						canvas.innerHTML += "<line id=" + lineId + " x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
//						horizontalLines.push({id: lineId, val: Number(y_coor), uid: shapes[i].id, parent: parentId});
//					}
////					var lineId = 'grid_' + shapes[i].id;
////					canvas.innerHTML += "<line id=" + lineId + " x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
////					horizontalLines.push({id: lineId, val: Number(y_coor), uid: shapes[i].id, parent: parentId});
//				}
			} 	
		}
		
				
		if (shapes[i].groupShape == "RECTANGLE") {
			if (view3D == 'xy') {
				if (shapes[i].z1 == 0) {
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
							displayRectFill(rect_tmp, parents, shapeIds, shapes[i].group, div);
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					} else if (Math.abs(shapes[i].angle) < 0.0001) {
						rect_tmp.push(shapes[i].y1);
						if (rect_tmp.length == 4) {
							displayRectFill(rect_tmp, parents, shapeIds, shapes[i].group, div);
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					}
				}
			} else if (view3D == 'xz') {
				if (shapes[i].y1 == 0) {
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
							displayRectFill(rect_tmp, parents, shapeIds, shapes[i].group, div);
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					} else if (Math.abs(shapes[i].angle) < 0.0001) {
						rect_tmp.push(shapes[i].z1);
						if (rect_tmp.length == 4) {
							displayRectFill(rect_tmp, parents, shapeIds, shapes[i].group, div);
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					}
				}
			} else if (view3D == 'yz') {
				if (shapes[i].x1 == 0) {
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
							displayRectFill(rect_tmp, parents, shapeIds, shapes[i].group, div);
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					} else if (Math.abs(shapes[i].angle) < 0.0001) {
						rect_tmp.push(shapes[i].z1);
						if (rect_tmp.length == 4) {
							displayRectFill(rect_tmp, parents, shapeIds, shapes[i].group, div);
							rect_tmp = [];
							parents = [];
							shapeIds = [];
						}
					}
				}
			} else {
				console.log("Wrong Physical View Name: " + viewChange);
				$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
			}
			
		}
		
		if (shapes[i].groupShape == "TEXT") {
			
			if (view3D == 'xy') {
				
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
					var textToStore= 'TEXT';
					if (shapes[i].property) {
						var foundModelProp = null;
						for (var j = 0; j < curModelProperties.length; j++) {
							if (curModelProperties[j].id == shapes[i].property.id) {
								foundModelProp = curModelProperties[j];
							}
						}
						var posiText;
						
						if (foundModelProp.propertyPositionType == 1) {
							posiText = 'end';}
						else if(foundModelProp.propertyPositionType == 3) {
							posiText = 'middle';}
						else if(foundModelProp.propertyPositionType == 5) {
							posiText = 'startT';}
						else {
							console.log("Wrong Text Modifier Type!");
						}
						
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='"+posiText+"'>"+foundModelProp.defaultValue+"</text>";
						textToStore = foundModelProp.defaultValue;
					} else {
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";
					}

					if (shapes[i].z1 == 0) {
						texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue : textToStore });
					} else {
						textsInOtherPlanes.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue : textToStore });
					}
//					texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue : textToStore });
					groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, shapeId: shapeIds[2], textValue : textToStore});
					textNumber++;
					text_tmp = [];
					parents = [];
					shapeIds = [];
				}	

			} else if (view3D == 'xz') {
			
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
//				text_element_tmp.y = shapes[i].z1;
				text_tmp.push(text_element_tmp);
				
				if (text_tmp.length == 3) {
					var x = text_tmp[0].x * zoomLevels[zoomLevel] + verticalLines[0].val;
					var y = text_tmp[0].y * zoomLevels[zoomLevel] + horizontalLines[0].val;
					console.log("x = " + x + " y = " + y);
					
					var textId = "text" + textNumber;
					var textToStore= 'TEXT';
					if (shapes[i].property) {
						var foundModelProp = null;
						for (var j = 0; j < curModelProperties.length; j++) {
							if (curModelProperties[j].id == shapes[i].property.id) {
								foundModelProp = curModelProperties[j];
							}
						}
						var posiText;
						
						if (foundModelProp.propertyPositionType == 1) {
							posiText = 'end';}
						else if(foundModelProp.propertyPositionType == 3) {
							posiText = 'middle';}
						else if(foundModelProp.propertyPositionType == 5) {
							posiText = 'startT';}
						else {
							console.log("Wrong Text Modifier Type!");
						}
						
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='"+posiText+"'>"+foundModelProp.defaultValue+"</text>";
						textToStore = foundModelProp.defaultValue;
					} else {
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";
					}
					if (shapes[i].y1 == 0) {
						texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue : textToStore });
					} else {
						textsInOtherPlanes.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue : textToStore });
					}
//					texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue : textToStore });
					groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, shapeId: shapeIds[2], textValue : textToStore});
					textNumber++;
					text_tmp = [];
					parents = [];
					shapeIds = [];
				}	
			
			} else if (view3D == 'yz') {

//				console.log("text!!!");				
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
//				text_element_tmp.x = -shapes[i].y1;
//				text_element_tmp.y = shapes[i].z1;
				text_tmp.push(text_element_tmp);
				
				if (text_tmp.length == 3) {
					var x = text_tmp[0].x * zoomLevels[zoomLevel] + verticalLines[0].val;
					var y = text_tmp[0].y * zoomLevels[zoomLevel] + horizontalLines[0].val;
					console.log("x = " + x + " y = " + y);
					
					var textId = "text" + textNumber;
					var textToStore= 'TEXT';
					if (shapes[i].property) {
						var foundModelProp = null;
						for (var j = 0; j < curModelProperties.length; j++) {
							if (curModelProperties[j].id == shapes[i].property.id) {
								foundModelProp = curModelProperties[j];
							}
						}
						var posiText;
						
						if (foundModelProp.propertyPositionType == 1) {
							posiText = 'end';}
						else if(foundModelProp.propertyPositionType == 3) {
							posiText = 'middle';}
						else if(foundModelProp.propertyPositionType == 5) {
							posiText = 'startT';}
						else {
							console.log("Wrong Text Modifier Type!");
						}
						
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='"+posiText+"'>"+foundModelProp.defaultValue+"</text>";
						textToStore = foundModelProp.defaultValue;
//							canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='end'>"+foundModelProp.defaultValue+"</text>";
//						} else if(foundModelProp.propertyPositionType == 3) {
//							canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='middle'>"+foundModelProp.defaultValue+"</text>";
//						} else if(foundModelProp.propertyPositionType == 5) {
//							canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='start'>"+foundModelProp.defaultValue+"</text>";
//						} else {
//							console.log("Wrong Text Modifier Type!");
//						}
					} else {
						canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";
					}
					if (shapes[i].x1 == 0) {
						texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue : textToStore });
					} else {
						textsInOtherPlanes.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue : textToStore });
					}
//					texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue : textToStore });
					groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, shapeId: shapeIds[2], textValue : textToStore});
					textNumber++;
					text_tmp = [];
					parents = [];
					shapeIds = [];
				}	
			
			} else {
				console.log("Wrong Physical View Name: " + viewChange);
				$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
			}
		
		}
		
		if (shapes[i].groupShape == "LINE") {
			
			var parentShapeType = null;
			if (shapes[i].hasOwnProperty('parent')) {
				parentShapeType = getParentShapeType(shapes[i].parent);
			}

			if (view3D == 'xy') {
				// parentShapeType == 1 || parentShapeType== 3 || parentShapeType == null
				if (true) {				
					console.log("contour!!!");
					if (shapes[i].shape == "LINE") {
						lineId = "line_" + lineNumber;
						var real_x1, real_x2, real_y1, real_y2;
						if (shapes[i].z1 == 0 && shapes[i].z2 == 0) {
							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
							real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
							real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
							lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
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
//								real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//								real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//								real_y1 = Number(0) + horizontalLines[0].val;
//								real_y2 = Number(0) + horizontalLines[0].val;
								linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
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
//								real_x1 = Number(0) + verticalLines[0].val;
//								real_x2 = Number(0) + verticalLines[0].val;
//								real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//								real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
								linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
							} else if (parentShapeType == 5) {
								real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
								real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
								real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
								lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
							}
//							linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						}
//						real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//						real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//						real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//						real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
						
						console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
						
//						lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						
						canvas.innerHTML += "<line id='" + lineId + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
						
						lineNumber++;
						
					} else if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
						var circConId = "circCon" + circConNumber;
						var real_x1, real_x2, real_y1, real_y2;
						if (shapes[i].z1 == 0 && shapes[i].z2 == 0) {
							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
							real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
							real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
						} else {
							if (parentShapeType == null) {
								// TODO： Display as contours
							} 
						}
//						real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//						real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//						real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//						real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
						console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
						
						var radius;
						var groupParent;
						for (var j = 0; j < shapes.length; j++) {		
							if (shapes[j].group == shapes[i].groupShapeParent) {
								radius = shapes[j].width;
							}
						}
							
						var largeArcFlag;
						if (shapes[i].shape == "SMALLARC") {
							canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 0 0 ' + real_x2 + ' ' + real_y2 + '" stroke="blue" stroke-width="5" fill="none"/>';
							largeArcFlag = false;
						} else {
							canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 1 0 ' + real_x2 + ' ' + real_y2 + '" stroke="blue" stroke-width="5" fill="none"/>';
							largeArcFlag = true;
						}
					
						circCons.push({id: circConId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, r: radius, largeArcFlag: largeArcFlag, uid: shapes[i].id, group: shapes[i].group, groupShapeParent: shapes[i].groupShapeParent});
						
//						var circCntrParents = [];
//						circCntrParents.push(shapes[i].groupShapeParent);
//						groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents: groupShapeParents});
						
						circConNumber++;
						
					} else {
						 console.log("Wrong Shape for Group Shape");
					}
					
					if (preGroupId == null) {
						if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
							groupShapeParents.push(shapes[i].groupShapeParent);
						} else if (shapes[i].parent != null) {
							parents.push(shapes[i].parent);
						} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
							parents.push(-2);
						} else {
							parents.push(-1);
						}
						
						shapeIds.push(shapes[i].id);
						
						preGroupId = shapes[i].group;
						
					} else if (shapes[i].group != preGroupId) {
//						groupShapes.push({type:"cntrGroup", id:lineId, parents:parents, shapes: shapeIds, group: preGroupId, groupShapeParents:groupShapeParents});
//						parents = [];
//						shapeIds = [];
//						groupShapeParents = [];
						
						if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
							groupShapeParents.push(shapes[i].groupShapeParent);
							parents.push(shapes[i].groupShapeParent);
						} else if (shapes[i].parent != null) {
							parents.push(shapes[i].parent);
						} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
							parents.push(-2);
						} else {
							parents.push(-1);
						}
						
						shapeIds.push(shapes[i].id);
						
						preGroupId = shapes[i].group;
						
						
					} else {
						if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
							groupShapeParents.push(shapes[i].groupShapeParent);
							parents.push(shapes[i].groupShapeParent);
						} else if (shapes[i].parent != null) {
							parents.push(shapes[i].parent);
						} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
							parents.push(-2);
						} else {
							parents.push(-1);
						}
						
						shapeIds.push(shapes[i].id);
						
						preGroupId = shapes[i].group;
					}
					
					if (i == shapes.length - 1) {
						groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents:groupShapeParents});
						parents = [];
						shapeIds = [];
						groupShapeParents = [];
					} else {
						if (shapes[i].group != shapes[i+1].group) {
							groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents:groupShapeParents});
							parents = [];
							shapeIds = [];
							groupShapeParents = [];
						}
					}
						
//					groupShapes.push({type:"cntrGroup", id:lineId, parents});	
//					groupShapes.push({type:"rectGroup", id:rcflId, parents:parents, shapes: shapeIds, group: groupId});	
				}
			} else if (view3D == 'xz') {
				// parentShapeType == 1 || parentShapeType == 5 || parentShapeType == null
				if (true) {
					console.log("contour!!!");
					if (shapes[i].shape == "LINE") {
						lineId = "line_" + lineNumber;
						var real_x1, real_x2, real_y1, real_y2;
						if (shapes[i].y1 == 0 && shapes[i].y2 == 0) {
							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
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
//								real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//								real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//								real_y1 = Number(0) + horizontalLines[0].val;
//								real_y2 = Number(0) + horizontalLines[0].val;
								linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
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
//								real_x1 = Number(0) + verticalLines[0].val;
//								real_x2 = Number(0) + verticalLines[0].val;
//								real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//								real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
								linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
							} else if (parentShapeType == 3) {
								real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
								real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
								real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
								lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
							}
//							linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						}
//						real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//						real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//						real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//						real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
						
						console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
						
//						lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						
						canvas.innerHTML += "<line id='" + lineId + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
						
						lineNumber++;
						
					} else if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
						
						var circConId = "circCon" + circConNumber;
						var real_x1, real_x2, real_y1, real_y2;
						if (shapes[i].y1 == 0 && shapes[i].y2 == 0) {
							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
						} else {
							if (parentShapeType == null) {
								// TODO: Display as contours
							}
						}
//						real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//						real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//						real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//						real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
						console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
						
						var radius;
						var groupParent;
						for (var j = 0; j < shapes.length; j++) {		
							if (shapes[j].group == shapes[i].groupShapeParent) {
								radius = shapes[j].width;
							}
						}
							
						var largeArcFlag;
						if (shapes[i].shape == "SMALLARC") {
							canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 0 0 ' + real_x2 + ' ' + real_y2 + '" stroke="blue" stroke-width="5" fill="none"/>';
							largeArcFlag = false;
						} else {
							canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 1 0 ' + real_x2 + ' ' + real_y2 + '" stroke="blue" stroke-width="5" fill="none"/>';
							largeArcFlag = true;
						}
					
						circCons.push({id: circConId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, r: radius, largeArcFlag: largeArcFlag, uid: shapes[i].id, group: shapes[i].group, groupShapeParent: shapes[i].groupShapeParent});
						
//						var circCntrParents = [];
//						circCntrParents.push(shapes[i].groupShapeParent);
//						groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents: groupShapeParents});
						
						circConNumber++;
						
					} else {
						 console.log("Wrong Shape for Group Shape");
					}
					
					if (preGroupId == null) {
						if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
							groupShapeParents.push(shapes[i].groupShapeParent);
						} else if (shapes[i].parent != null) {
							parents.push(shapes[i].parent);
						} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
							parents.push(-2);
						} else {
							parents.push(-1);
						}
						
						shapeIds.push(shapes[i].id);
						
						preGroupId = shapes[i].group;
						
					} else if (shapes[i].group != preGroupId) {
//						groupShapes.push({type:"cntrGroup", id:lineId, parents:parents, shapes: shapeIds, group: preGroupId, groupShapeParents:groupShapeParents});
//						parents = [];
//						shapeIds = [];
//						groupShapeParents = [];
						
						if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
							groupShapeParents.push(shapes[i].groupShapeParent);
							parents.push(shapes[i].groupShapeParent);
						} else if (shapes[i].parent != null) {
							parents.push(shapes[i].parent);
						} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
							parents.push(-2);
						} else {
							parents.push(-1);
						}
						
						shapeIds.push(shapes[i].id);
						
						preGroupId = shapes[i].group;
						
						
					} else {
						if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
							groupShapeParents.push(shapes[i].groupShapeParent);
							parents.push(shapes[i].groupShapeParent);
						} else if (shapes[i].parent != null) {
							parents.push(shapes[i].parent);
						} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
							parents.push(-2);
						} else {
							parents.push(-1);
						}
						
						shapeIds.push(shapes[i].id);
						
						preGroupId = shapes[i].group;
					}
				
					if (i == shapes.length - 1) {
						groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents:groupShapeParents});
						parents = [];
						shapeIds = [];
						groupShapeParents = [];
					} else {
						if (shapes[i].group != shapes[i+1].group) {
							groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents:groupShapeParents});
							parents = [];
							shapeIds = [];
							groupShapeParents = [];
						}
					}
						
//					groupShapes.push({type:"cntrGroup", id:lineId, parents});	
//					groupShapes.push({type:"rectGroup", id:rcflId, parents:parents, shapes: shapeIds, group: groupId});						
				}
				

			} else if (view3D == 'yz') {
				// parentShapeType == 3 || parentShapeType == 5 || parentShapeType == null
				if (true) {					
					console.log("contour!!!");
					if (shapes[i].shape == "LINE") {
						lineId = "line_" + lineNumber;
						var real_x1, real_x2, real_y1, real_y2;
						if (shapes[i].x1 == 0 && shapes[i].x2 == 0) {
							real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
							real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
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
//								real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
//								real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
//								real_y1 = Number(0) + horizontalLines[0].val;
//								real_y2 = Number(0) + horizontalLines[0].val;
								linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
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
//								real_x1 = -Number(0) + verticalLines[0].val;
//								real_x2 = -Number(0) + verticalLines[0].val;
//								real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//								real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
								linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
							} else if (parentShapeType == 1) {
								real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
								real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
								real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
								lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
							}
//							linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						}
//						real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
//						real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
//						real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//						real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
						
						console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
						
//						lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
						
						canvas.innerHTML += "<line id='" + lineId + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
						
						lineNumber++;
						
					} else if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
						
						var circConId = "circCon" + circConNumber;
						if (shapes[i].x1 == 0 && shapes[i].x2 == 0) {
							real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
							real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
						} else {
							if (parentShapeType == null) {
								// TODO: Display as contours
							}
						}
//						real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
//						real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
//						real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//						real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
						var real_x1, real_x2, real_y1, real_y2;
						console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
						
						var radius;
						var groupParent;
						for (var j = 0; j < shapes.length; j++) {		
							if (shapes[j].group == shapes[i].groupShapeParent) {
								radius = shapes[j].width;
							}
						}
							
						var largeArcFlag;
						if (shapes[i].shape == "SMALLARC") {
							canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 0 0 ' + real_x2 + ' ' + real_y2 + '" stroke="blue" stroke-width="5" fill="none"/>';
							largeArcFlag = false;
						} else {
							canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 1 0 ' + real_x2 + ' ' + real_y2 + '" stroke="blue" stroke-width="5" fill="none"/>';
							largeArcFlag = true;
						}
					
						circCons.push({id: circConId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, r: radius, largeArcFlag: largeArcFlag, uid: shapes[i].id, group: shapes[i].group, groupShapeParent: shapes[i].groupShapeParent});
						
//						var circCntrParents = [];
//						circCntrParents.push(shapes[i].groupShapeParent);
//						groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents: groupShapeParents});
						
						circConNumber++;
						
					} else {
						 console.log("Wrong Shape for Group Shape");
					}
					
					if (preGroupId == null) {
						if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
							groupShapeParents.push(shapes[i].groupShapeParent);
						} else if (shapes[i].parent != null) {
							parents.push(shapes[i].parent);
						} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
							parents.push(-2);
						} else {
							parents.push(-1);
						}
						
						shapeIds.push(shapes[i].id);
						
						preGroupId = shapes[i].group;
						
					} else if (shapes[i].group != preGroupId) {
//						groupShapes.push({type:"cntrGroup", id:lineId, parents:parents, shapes: shapeIds, group: preGroupId, groupShapeParents:groupShapeParents});
//						parents = [];
//						shapeIds = [];
//						groupShapeParents = [];
						
						if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
							groupShapeParents.push(shapes[i].groupShapeParent);
							parents.push(shapes[i].groupShapeParent);
						} else if (shapes[i].parent != null) {
							parents.push(shapes[i].parent);
						} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
							parents.push(-2);
						} else {
							parents.push(-1);
						}
						
						shapeIds.push(shapes[i].id);
						
						preGroupId = shapes[i].group;
						
						
					} else {
						if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
							groupShapeParents.push(shapes[i].groupShapeParent);
							parents.push(shapes[i].groupShapeParent);
						} else if (shapes[i].parent != null) {
							parents.push(shapes[i].parent);
						} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
							parents.push(-2);
						} else {
							parents.push(-1);
						}
						
						shapeIds.push(shapes[i].id);
						
						preGroupId = shapes[i].group;
					}
				
					if (i == shapes.length - 1) {
						groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents:groupShapeParents});
						parents = [];
						shapeIds = [];
						groupShapeParents = [];
					} else {
						if (shapes[i].group != shapes[i+1].group) {
							groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents:groupShapeParents});
							parents = [];
							shapeIds = [];
							groupShapeParents = [];
						}
					}
						
//					groupShapes.push({type:"cntrGroup", id:lineId, parents});	
//					groupShapes.push({type:"rectGroup", id:rcflId, parents:parents, shapes: shapeIds, group: groupId});	
				
				}

			} else {
				console.log("Wrong Physical View Name: " + viewChange);
				$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
			}
		
		}
			
		if (shapes[i].groupShape == "CIRCLE") {
						
			if (view3D == 'xy') {
				if (shapes[i].z1 == 0) {
					console.log("display circle!!!");
					
					if (shapes[i].parent != null) {
						parents.push(shapes[i].parent);
					} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
						parents.push(-2);
					} else if (Math.abs(shapes[i].angle) < 0.0001) {
						parents.push(-1);
					}
					
					shapeIds.push(shapes[i].id);
					var circ_element_tmp = {};
					circ_element_tmp.x1 = shapes[i].x1;
					circ_element_tmp.y1 = shapes[i].y1;
					circ_element_tmp.radius = shapes[i].width;
					circ_tmp.push(circ_element_tmp);
					
					if (circ_tmp.length == 4) {
						displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, div);
						circ_tmp = [];
						parents = [];
						shapeIds = [];
						
					}
				}
			} else if (view3D == 'xz') {
				if (shapes[i].y1 == 0) {
					console.log("display circle!!!");
					
					if (shapes[i].parent != null) {
						parents.push(shapes[i].parent);
					} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
						parents.push(-2);
					} else if (Math.abs(shapes[i].angle) < 0.0001) {
						parents.push(-1);
					}
					
					shapeIds.push(shapes[i].id);
					var circ_element_tmp = {};
					circ_element_tmp.x1 = shapes[i].x1;
					circ_element_tmp.y1 = shapes[i].z1;
					circ_element_tmp.radius = shapes[i].width;
					circ_tmp.push(circ_element_tmp);
					
					if (circ_tmp.length == 4) {
						displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, div);
						circ_tmp = [];
						parents = [];
						shapeIds = [];
						
					}
				}
			} else if (view3D == 'yz') {
				if (shapes[i].x1 == 0) {
					console.log("display circle!!!");
					
					if (shapes[i].parent != null) {
						parents.push(shapes[i].parent);
					} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
						parents.push(-2);
					} else if (Math.abs(shapes[i].angle) < 0.0001) {
						parents.push(-1);
					}
					
					shapeIds.push(shapes[i].id);				
					var circ_element_tmp = {};
					circ_element_tmp.x1 = -shapes[i].y1;
					circ_element_tmp.y1 = shapes[i].z1;
					circ_element_tmp.radius = shapes[i].width;
					circ_tmp.push(circ_element_tmp);
					
					if (circ_tmp.length == 4) {
						displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, div);
						circ_tmp = [];
						parents = [];
						shapeIds = [];
						
					}
				}
			} else {
				console.log("Wrong Physical View Name: " + viewChange);
				$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
			}
			
		}
	}
	}
}

function displayParentChildShapes(shapes) {
	
	if (shapes == null) {
		return;
	}
		
	var canvas = document.getElementById("pdsvsvg");
	var div = "pdsvsvg";
//	resetMemo();
//	removePhysicalDesignView();
	initPhysicalDesignView();
	console.log("display shapes");
//	console.log(shapes);
	
	var groupEndIndicator = true;
	var preGroupId = null;
	
	var rect_tmp = [];
	var circ_tmp = [];
	var text_tmp = [];
	
	var parents = [];                  // used to save the list of parents for groupShape: Rectangle, Text, 
	var shapeIds = [];                 // used to save list of Ids for groupShape: Rectangle, Text
	var groupShapeParents = [];
	
	var parentChildState = 1;
	if (physicalModelView == "child") {
		parentChildState = 3;
	}
	
	for (var i = 0; i < shapes.length; i++) {
		
		if (shapes[i].parentChildState == parentChildState) {
			
			if (shapes[i].shape == "LINE") {	
				// retrieve the parentId of the shape   In case it is X line or Y line
				var parentId;
				if (!('parent' in shapes[i])) {
					if (Math.abs(shapes[i].angle - 90) < 0.0001) {
						parentId = -2;
					} else if (Math.abs(shapes[i].angle) < 0.0001) {
						parentId = -1;
					}
				} else {
					parentId = shapes[i].parent;                // otherwise take it from the record itself
				}
				
				
				if (shapes[i].isConstruction) {
					
					var tmp_x_coor = getVerticalLineCoor(shapes, i);				
					if (tmp_x_coor != null) {
						var x_coor = tmp_x_coor * zoomLevels[zoomLevel] + verticalLines[0].val;	
						var lineId = 'grid_' + shapes[i].id;
						// xy - rgb(0,204,255)  
						// yz - rgb(66,244,101)
						// xz - rgb(128,0,128)
						if (view3D == 'xy' || view3D == 'xz') {
							if (shapes[i].x1 != 0) {
								if (shapes[i].shapeType == 3) {
									canvas.innerHTML += "<line id=" + lineId + " x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(0,204,255) stroke-width=2 stroke-dasharray='10,10'/>";
									verticalLines.push({id: lineId, val: Number(x_coor), uid: shapes[i].id, parent: parentId, plane: "xy"});
								} else if (shapes[i].shapeType == 5) {
									canvas.innerHTML += "<line id=" + lineId + " x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(128,0,128) stroke-width=2 stroke-dasharray='10,10'/>";
									verticalLines.push({id: lineId, val: Number(x_coor), uid: shapes[i].id, parent: parentId, plane: "xz"});
								}
							}
						} else if (view3D == 'yz') {
							if (shapes[i].y1 != 0) {
								if (shapes[i].shapeType == 1) {
									canvas.innerHTML += "<line id=" + lineId + " x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(0,204,255) stroke-width=2 stroke-dasharray='10,10'/>";
									verticalLines.push({id: lineId, val: Number(x_coor), uid: shapes[i].id, parent: parentId, plane: "xy"});
								} else if (shapes[i].shapeType == 5) {
									var tmpX = -Number(x_coor) + 200;
									canvas.innerHTML += "<line id=" + lineId + " x1='" + tmpX + "' y1='3' x2='" + tmpX + "' y2='897' stroke=rgb(66,244,101) stroke-width=2 stroke-dasharray='10,10'/>";
									verticalLines.push({id: lineId, val: Number(tmpX), uid: shapes[i].id, parent: parentId, plane: "yz"});
								}
							}
						} 
//						canvas.innerHTML += "<line id=" + lineId + " x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
//						verticalLines.push({id: lineId, val: Number(x_coor), uid: shapes[i].id, parent: parentId});
					}
					var tmp_y_coor = getHorizontalLineCoor(shapes, i);				
					if (tmp_y_coor != null) {
						var y_coor = tmp_y_coor * zoomLevels[zoomLevel] + horizontalLines[0].val;
						var lineId = 'grid_' + shapes[i].id;
						// xy - rgb(0,204,255)  
						// yz - rgb(66,244,101)
						// xz - rgb(128,0,128)
						if (view3D == 'yz' || view3D == 'xz') {
							if (shapes[i].z1 != 0) {
								if (shapes[i].shapeType == 1) {
									canvas.innerHTML += "<line id=" + lineId + " x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(128,0,128) stroke-width=2 stroke-dasharray='10,10'/>";
									horizontalLines.push({id: lineId, val: Number(y_coor), uid: shapes[i].id, parent: parentId, plane: "xz"});
								} else if (shapes[i].shapeType == 3) {
									canvas.innerHTML += "<line id=" + lineId + " x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(66,244,101) stroke-width=2 stroke-dasharray='10,10'/>";
									horizontalLines.push({id: lineId, val: Number(y_coor), uid: shapes[i].id, parent: parentId, plane: "yz"});
								}
							}
						} else if (view3D == 'xy') {
							if (shapes[i].y1 != 0) {
								if (shapes[i].shapeType == 1) {
									canvas.innerHTML += "<line id=" + lineId + " x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(0,204,255) stroke-width=2 stroke-dasharray='10,10'/>";
									horizontalLines.push({id: lineId, val: Number(y_coor), uid: shapes[i].id, parent: parentId, plane: "xy"});
								} else if (shapes[i].shapeType == 5) {
									var tmpY = Number(y_coor)-1000;
									canvas.innerHTML += "<line id=" + lineId + " x1='0%' y1='" + tmpY + "' x2='100%' y2='" + tmpY + "' stroke=rgb(66,244,101) stroke-width=2 stroke-dasharray='10,10'/>";
									horizontalLines.push({id: lineId, val: Number(tmpY), uid: shapes[i].id, parent: parentId, plane: "yz"});
								}
							}
						}
//						canvas.innerHTML += "<line id=" + lineId + " x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
//						horizontalLines.push({id: lineId, val: Number(y_coor), uid: shapes[i].id, parent: parentId});
					}
										
//					if (Math.abs(shapes[i].angle - 90) < 0.0001) {
//						// vertical line
//						var tmp_x_coor = getVerticalLineCoor(shapes, i);				
//						if (tmp_x_coor != null) {
//							var x_coor = tmp_x_coor * zoomLevels[zoomLevel] + verticalLines[0].val;	
//							var lineId = 'grid_' + shapes[i].id;
//							canvas.innerHTML += "<line id=" + lineId + " x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
//							verticalLines.push({id: lineId, val: Number(x_coor), uid: shapes[i].id, parent: parentId});
//						}
////						var lineId = 'grid_' + shapes[i].id;
////						canvas.innerHTML += "<line id=" + lineId + " x1='" + x_coor + "' y1='3' x2='" + x_coor + "' y2='897' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
////						verticalLines.push({id: lineId, val: Number(x_coor), uid: shapes[i].id, parent: parentId});
//					} else if (Math.abs(shapes[i].angle) < 0.0001) {
//            			// horizontal line
//						var tmp_y_coor = getHorizontalLineCoor(shapes, i);				
//						if (tmp_y_coor != null) {
//							var y_coor = tmp_y_coor * zoomLevels[zoomLevel] + horizontalLines[0].val;
//							var lineId = 'grid_' + shapes[i].id;
//							canvas.innerHTML += "<line id=" + lineId + " x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
//							horizontalLines.push({id: lineId, val: Number(y_coor), uid: shapes[i].id, parent: parentId});
//						}
////						var lineId = 'grid_' + shapes[i].id;
////						canvas.innerHTML += "<line id=" + lineId + " x1='0%' y1='" + y_coor + "' x2='100%' y2='" + y_coor + "' stroke=rgb(255,0,0) stroke-width=2 stroke-dasharray='10,10'/>";
////						horizontalLines.push({id: lineId, val: Number(y_coor), uid: shapes[i].id, parent: parentId});
//					}
				} 
			}
			
					
			if (shapes[i].groupShape == "RECTANGLE") {
				
				if (view3D == 'xy') {
					if (shapes[i].z1 == 0) {
						console.log("rectangle!!!");
						if (shapes[i].parent != null) {
							parents.push(shapes[i].parent);
						} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
							parents.push(-2); // parent of this shape is y axis
						} else if (Math.abs(shapes[i].angle) < 0.0001) {
							parents.push(-1); // parent of this shape is x axis
						}
						
						shapeIds.push(shapes[i].id);
						
						if (Math.abs(shapes[i].angle - 90) < 0.0001) { // check if angle equals 90 (if it is vertical)
							rect_tmp.splice(0, 0, shapes[i].x1);
							if (rect_tmp.length == 4) {
								displayRectFill(rect_tmp, parents, shapeIds, shapes[i].group, div);
								rect_tmp = [];
								parents = [];
								shapeIds = [];
							}
						} else if (Math.abs(shapes[i].angle) < 0.0001) { // check if angle equals 0 (if it is horizontal)
							rect_tmp.push(shapes[i].y1);
							if (rect_tmp.length == 4) {
								displayRectFill(rect_tmp, parents, shapeIds, shapes[i].group, div);
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
							parents.push(-2); // parent of this shape is y axis
						} else if (Math.abs(shapes[i].angle) < 0.0001) {
							parents.push(-1); // parent of this shape is x axis
						}
						
						shapeIds.push(shapes[i].id);
						
						if (Math.abs(shapes[i].angle - 90) < 0.0001) { // check if angle equals 90 (if it is vertical)
							rect_tmp.splice(0, 0, shapes[i].x1);
							if (rect_tmp.length == 4) {
								displayRectFill(rect_tmp, parents, shapeIds, shapes[i].group, div);
								rect_tmp = [];
								parents = [];
								shapeIds = [];
							}
						} else if (Math.abs(shapes[i].angle) < 0.0001) { // check if angle equals 0 (if it is horizontal)
							rect_tmp.push(shapes[i].z1);
							if (rect_tmp.length == 4) {
								displayRectFill(rect_tmp, parents, shapeIds, shapes[i].group, div);
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
							parents.push(-2); // parent of this shape is y axis
						} else if (Math.abs(shapes[i].angle) < 0.0001) {
							parents.push(-1); // parent of this shape is x axis
						}
						
						shapeIds.push(shapes[i].id);
						
						if (Math.abs(shapes[i].angle - 90) < 0.0001) { // check if angle equals 90 (if it is vertical)
							rect_tmp.splice(0, 0, -shapes[i].y1);
							if (rect_tmp.length == 4) {
								displayRectFill(rect_tmp, parents, shapeIds, shapes[i].group, div);
								rect_tmp = [];
								parents = [];
								shapeIds = [];
							}
						} else if (Math.abs(shapes[i].angle) < 0.0001) { // check if angle equals 0 (if it is horizontal)
							rect_tmp.push(shapes[i].z1);
							if (rect_tmp.length == 4) {
								displayRectFill(rect_tmp, parents, shapeIds, shapes[i].group, div);
								rect_tmp = [];
								parents = [];
								shapeIds = [];
							}
						}
					}
				} else {
					console.log("Wrong Physical View Name: " + viewChange);
					$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
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
//					text_element_tmp.x = shapes[i].x1;
//					text_element_tmp.y = shapes[i].y1;
					text_tmp.push(text_element_tmp);
					
					if (text_tmp.length == 3) {
						var x = text_tmp[0].x * zoomLevels[zoomLevel] + verticalLines[0].val;
						var y = text_tmp[0].y * zoomLevels[zoomLevel] + horizontalLines[0].val;
						console.log("x = " + x + " y = " + y);
						
						var textId = "text" + textNumber;
						var textToStore = 'TEXT;'
						if (shapes[i].property) {
							var foundModelProp = null;
							for (var j = 0; j < curModelProperties.length; j++) {
								if (curModelProperties[j].id == shapes[i].property.id) {
									foundModelProp = curModelProperties[j];
								}
							}
							if (foundModelProp.propertyPositionType == 1) {
								canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='end'>"+foundModelProp.defaultValue+"</text>";
							} else if(foundModelProp.propertyPositionType == 3) {
								canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='middle'>"+foundModelProp.defaultValue+"</text>";
							} else if(foundModelProp.propertyPositionType == 5) {
								canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='start'>"+foundModelProp.defaultValue+"</text>";
							} else {
								console.log("Wrong Text Modifier Type!");
							}
							textToStore = foundModelProp.defaultValue;
							
						} else {
							canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";
						}
						if (shapes[i].z1 == 0) {
							texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: textToStore });
						} else {
							textsInOtherPlanes.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: textToStore });
						}
//						texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: textToStore });
						groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, shapeId: shapeIds[2], textValue: textToStore});
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
//					text_element_tmp.x = shapes[i].x1;
//					text_element_tmp.y = shapes[i].z1;
					text_tmp.push(text_element_tmp);
					
					if (text_tmp.length == 3) {
						var x = text_tmp[0].x * zoomLevels[zoomLevel] + verticalLines[0].val;
						var y = text_tmp[0].y * zoomLevels[zoomLevel] + horizontalLines[0].val;
						console.log("x = " + x + " y = " + y);
						
						var textId = "text" + textNumber;
						var textToStore = 'TEXT;'
						if (shapes[i].property) {
							var foundModelProp = null;
							for (var j = 0; j < curModelProperties.length; j++) {
								if (curModelProperties[j].id == shapes[i].property.id) {
									foundModelProp = curModelProperties[j];
								}
							}
							if (foundModelProp.propertyPositionType == 1) {
								canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='end'>"+foundModelProp.defaultValue+"</text>";
							} else if(foundModelProp.propertyPositionType == 3) {
								canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='middle'>"+foundModelProp.defaultValue+"</text>";
							} else if(foundModelProp.propertyPositionType == 5) {
								canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='start'>"+foundModelProp.defaultValue+"</text>";
							} else {
								console.log("Wrong Text Modifier Type!");
							}
							textToStore = foundModelProp.defaultValue;
							
						} else {
							canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";
						}
						if (shapes[i].y1 == 0) {
							texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: textToStore });
						} else {
							textsInOtherPlanes.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: textToStore });
						}
//						texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: textToStore });
						groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, shapeId: shapeIds[2], textValue: textToStore});
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
//					text_element_tmp.x = -shapes[i].y1;
//					text_element_tmp.y = shapes[i].z1;
					text_tmp.push(text_element_tmp);
					
					if (text_tmp.length == 3) {
						var x = text_tmp[0].x * zoomLevels[zoomLevel] + verticalLines[0].val;
						var y = text_tmp[0].y * zoomLevels[zoomLevel] + horizontalLines[0].val;
						console.log("x = " + x + " y = " + y);
						
						var textId = "text" + textNumber;
						var textToStore = 'TEXT;'
						if (shapes[i].property) {
							var foundModelProp = null;
							for (var j = 0; j < curModelProperties.length; j++) {
								if (curModelProperties[j].id == shapes[i].property.id) {
									foundModelProp = curModelProperties[j];
								}
							}
							if (foundModelProp.propertyPositionType == 1) {
								canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='end'>"+foundModelProp.defaultValue+"</text>";
							} else if(foundModelProp.propertyPositionType == 3) {
								canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='middle'>"+foundModelProp.defaultValue+"</text>";
							} else if(foundModelProp.propertyPositionType == 5) {
								canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red' text-anchor='start'>"+foundModelProp.defaultValue+"</text>";
							} else {
								console.log("Wrong Text Modifier Type!");
							}
							textToStore = foundModelProp.defaultValue;
							
						} else {
							canvas.innerHTML += "<text id='" + textId + "' x='" + x + "' y='" + y + "' fill='red'>TEXT</text>";
						}
						if (shapes[i].x1 == 0) {
							texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: textToStore });
						} else {
							textsInOtherPlanes.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: textToStore });
						}
//						texts.push({id:textId, x:x, y:y, parents:parents, group: shapes[i].group,shapeId: shapeIds[2], textValue: textToStore });
						groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, shapeId: shapeIds[2], textValue: textToStore});
						textNumber++;
						text_tmp = [];
						parents = [];
						shapeIds = [];
					}	

				} else {
					console.log("Wrong Physical View Name: " + viewChange);
					$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
				}
				
			}
			
			if (shapes[i].groupShape == "LINE") {
				
				var parentShapeType = null;
				if (shapes[i].hasOwnProperty('parent')) {
					parentShapeType = getParentShapeType(shapes[i].parent);
				}
				
				if (view3D == 'xy') {	
					if (true) {
						console.log("contour!!!");
						if (shapes[i].shape == "LINE") {
							
							//AL: probably need a line id and need to take care of zoom and move
							
							lineId = "line_" + lineNumber;
							
							var real_x1, real_x2, real_y1, real_y2;
							if (shapes[i].z1 == 0 && shapes[i].z2 == 0) {
								real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
								real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
								real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
								lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
							} else {
								if (parentShapeType == 1) {
									real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
									real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
									real_y1 = Number(0) + horizontalLines[0].val;
									real_y2 = Number(0) + horizontalLines[0].val;
									linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
								} else if (parentShapeType == 3) {
									real_x1 = Number(0) + verticalLines[0].val;
									real_x2 = Number(0) + verticalLines[0].val;
									real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
									real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
									linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
								} else if (parentShapeType == 5) {
									real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
									real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
									real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
									real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
									lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
								}
//								linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
							}
//							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
							
							console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
							
//							lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
							
							canvas.innerHTML += "<line id='" + lineId + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
							
							lineNumber++;
							
						} else if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
							
							var circConId = "circCon" + circConNumber;
							
							var real_x1, real_x2, real_y1, real_y2;				
							if (shapes[i].z1 == 0 && shapes[i].z2 == 0) {
								real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
								real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
								real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
							} else {
								if (parentShapeType == null) {
									// TODO: Display as contours
								}
							}
//							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].y1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].y2) + horizontalLines[0].val;
							console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
							
							var radius;
							var groupParent;
							for (var j = 0; j < shapes.length; j++) {		
								if (shapes[j].group == shapes[i].groupShapeParent) {
									radius = shapes[j].width;
								}
							}
								
							var largeArcFlag;
							if (shapes[i].shape == "SMALLARC") {
								canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 0 0 ' + real_x2 + ' ' + real_y2 + '" stroke="blue" stroke-width="5" fill="none"/>';
								largeArcFlag = false;
							} else {
								canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 1 0 ' + real_x2 + ' ' + real_y2 + '" stroke="blue" stroke-width="5" fill="none"/>';
								largeArcFlag = true;
							}
						
							circCons.push({id: circConId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, r: radius, largeArcFlag: largeArcFlag, uid: shapes[i].id, group: shapes[i].group, groupShapeParent: shapes[i].groupShapeParent});		
//							var circCntrParents = [];
//							circCntrParents.push(shapes[i].groupShapeParent);
							groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents: groupShapeParents});
							
							circConNumber++;
							
						} else {
							 console.log("Wrong Shape for Group Shape");
						}
						
						if (preGroupId == null) {
							if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
								groupShapeParents.push(shapes[i].groupShapeParent);
							} else if (shapes[i].parent != null) {
								parents.push(shapes[i].parent);
							} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
								parents.push(-2);
							} else {
								parents.push(-1);
							}
							
							shapeIds.push(shapes[i].id);
							
							preGroupId = shapes[i].group;
							
						} else if (shapes[i].group != preGroupId) {
//							groupShapes.push({type:"cntrGroup", id:lineId, parents:parents, shapes: shapeIds, group: preGroupId, groupShapeParents:groupShapeParents});
//							parents = [];
//							shapeIds = [];
//							groupShapeParents = [];
							
							if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
								groupShapeParents.push(shapes[i].groupShapeParent);
							} else if (shapes[i].parent != null) {
								parents.push(shapes[i].parent);
							} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
								parents.push(-2);
							} else {
								parents.push(-1);
							}
							
							shapeIds.push(shapes[i].id);
							
							preGroupId = shapes[i].group;
							
							
						} else {
							if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
								groupShapeParents.push(shapes[i].groupShapeParent);
							} else if (shapes[i].parent != null) {
								parents.push(shapes[i].parent);
							} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
								parents.push(-2);
							} else {
								parents.push(-1);
							}
							
							shapeIds.push(shapes[i].id);
							preGroupId = shapes[i].group;
						}
					
						if (i == shapes.length - 1) {
							groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents:groupShapeParents});
							parents = [];
							shapeIds = [];
							groupShapeParents = [];
						} else {
							if (shapes[i].group != shapes[i+1].group) {
								groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents:groupShapeParents});
								parents = [];
								shapeIds = [];
								groupShapeParents = [];
							}
						}
									
//						groupShapes.push({type:"cntrGroup", id:lineId, parents});			
//						groupShapes.push({type:"rectGroup", id:rcflId, parents:parents, shapes: shapeIds, group: groupId});
											
					}

				} else if (view3D == 'xz') {
					
					if (true) {
						
						console.log("contour!!!");
						if (shapes[i].shape == "LINE") {
							
							//AL: probably need a line id and need to take care of zoom and move
							
							lineId = "line_" + lineNumber;
							
							var real_x1, real_x2, real_y1, real_y2;
							if (shapes[i].y1 == 0 && shapes[i].y2 == 0) {
								real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
								real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
								real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
								lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
							} else {
								if (parentShapeType == 1) {
									real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
									real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
									real_y1 = Number(0) + horizontalLines[0].val;
									real_y2 = Number(0) + horizontalLines[0].val;
									linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
								} else if (parentShapeType == 5) {
									real_x1 = Number(0) + verticalLines[0].val;
									real_x2 = Number(0) + verticalLines[0].val;
									real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
									real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
									linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
								} else if (parentShapeType == 3) {
									real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
									real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
									real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
									real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
									lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
								}
//								linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
							}
//							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							
							console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
							
//							lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
							
							canvas.innerHTML += "<line id='" + lineId + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
							
							lineNumber++;
							
						} else if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
							
							var circConId = "circCon" + circConNumber;
							
							var real_x1, real_x2, real_y1, real_y2;
							if (shapes[i].y1 == 0 && shapes[i].y2 == 0) {
								real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
								real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
								real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							} else {
								if (parentShapeType == null) {
									// TODO: Display as contours
								}
							}
//							real_x1 = Number(shapes[i].x1) + verticalLines[0].val;
//							real_x2 = Number(shapes[i].x2) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
							
							var radius;
							var groupParent;
							for (var j = 0; j < shapes.length; j++) {		
								if (shapes[j].group == shapes[i].groupShapeParent) {
									radius = shapes[j].width;
								}
							}
								
							var largeArcFlag;
							if (shapes[i].shape == "SMALLARC") {
								canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 0 0 ' + real_x2 + ' ' + real_y2 + '" stroke="blue" stroke-width="5" fill="none"/>';
								largeArcFlag = false;
							} else {
								canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 1 0 ' + real_x2 + ' ' + real_y2 + '" stroke="blue" stroke-width="5" fill="none"/>';
								largeArcFlag = true;
							}
						
							circCons.push({id: circConId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, r: radius, largeArcFlag: largeArcFlag, uid: shapes[i].id, group: shapes[i].group, groupShapeParent: shapes[i].groupShapeParent});		
//							var circCntrParents = [];
//							circCntrParents.push(shapes[i].groupShapeParent);
							groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents: groupShapeParents});
							
							circConNumber++;
							
						} else {
							 console.log("Wrong Shape for Group Shape");
						}
						
						if (preGroupId == null) {
							if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
								groupShapeParents.push(shapes[i].groupShapeParent);
							} else if (shapes[i].parent != null) {
								parents.push(shapes[i].parent);
							} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
								parents.push(-2);
							} else {
								parents.push(-1);
							}
							
							shapeIds.push(shapes[i].id);
							
							preGroupId = shapes[i].group;
							
						} else if (shapes[i].group != preGroupId) {
//							groupShapes.push({type:"cntrGroup", id:lineId, parents:parents, shapes: shapeIds, group: preGroupId, groupShapeParents:groupShapeParents});
//							parents = [];
//							shapeIds = [];
//							groupShapeParents = [];
							
							if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
								groupShapeParents.push(shapes[i].groupShapeParent);
							} else if (shapes[i].parent != null) {
								parents.push(shapes[i].parent);
							} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
								parents.push(-2);
							} else {
								parents.push(-1);
							}
							
							shapeIds.push(shapes[i].id);
							
							preGroupId = shapes[i].group;
							
							
						} else {
							if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
								groupShapeParents.push(shapes[i].groupShapeParent);
							} else if (shapes[i].parent != null) {
								parents.push(shapes[i].parent);
							} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
								parents.push(-2);
							} else {
								parents.push(-1);
							}
							
							shapeIds.push(shapes[i].id);
							preGroupId = shapes[i].group;
						}
					
						if (i == shapes.length - 1) {
							groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents:groupShapeParents});
							parents = [];
							shapeIds = [];
							groupShapeParents = [];
						} else {
							if (shapes[i].group != shapes[i+1].group) {
								groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents:groupShapeParents});
								parents = [];
								shapeIds = [];
								groupShapeParents = [];
							}
						}
									
//						groupShapes.push({type:"cntrGroup", id:lineId, parents});			
//						groupShapes.push({type:"rectGroup", id:rcflId, parents:parents, shapes: shapeIds, group: groupId});

					}

				} else if (view3D == 'yz') {
					
					if (true) {
						
						console.log("contour!!!");
						if (shapes[i].shape == "LINE") {
							
							//AL: probably need a line id and need to take care of zoom and move
							
							lineId = "line_" + lineNumber;
							
							var real_x1, real_x2, real_y1, real_y2;
							if (shapes[i].x1 == 0 && shapes[i].x2 == 0) {
								real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
								real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
								real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
								lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
							} else {
								if (parentShapeType == 3) {
									real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
									real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
									real_y1 = Number(0) + horizontalLines[0].val;
									real_y2 = Number(0) + horizontalLines[0].val;
									linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
								} else if (parentShapeType == 5) {
									real_x1 = -Number(0) + verticalLines[0].val;
									real_x2 = -Number(0) + verticalLines[0].val;
									real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
									real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
									linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
								} else if (parentShapeType == 1) {
									real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
									real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
									real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
									real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
									lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
								}
//								linesInOtherPlanes.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
							}
//							real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
//							real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							
							console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
							
//							lines.push({id: lineId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, uid: shapes[i].id});
							
							canvas.innerHTML += "<line id='" + lineId + "' x1='" + real_x1 + "' y1='" + real_y1 + "' x2='" + real_x2 + "' y2='" + real_y2 + "' stroke='blue' stroke-width='5'/>";
							
							lineNumber++;
							
						} else if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
							
							var circConId = "circCon" + circConNumber;
							
							var real_x1, real_x2, real_y1, real_y2;
							if (shapes[i].x1 == 0 && shapes[i].x2 == 0) {
								real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
								real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
								real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
								real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							} else {
								if (parentShapeType == null) {
									// TODO: Display as contours
								}
							}
//							real_x1 = -Number(shapes[i].y1) + verticalLines[0].val;
//							real_x2 = -Number(shapes[i].y2) + verticalLines[0].val;
//							real_y1 = Number(shapes[i].z1) + horizontalLines[0].val;
//							real_y2 = Number(shapes[i].z2) + horizontalLines[0].val;
							console.log("real values = " + real_x1 + " " + real_x2 + " " + real_y1 + " " + real_y2);
							
							var radius;
							var groupParent;
							for (var j = 0; j < shapes.length; j++) {		
								if (shapes[j].group == shapes[i].groupShapeParent) {
									radius = shapes[j].width;
								}
							}
								
							var largeArcFlag;
							if (shapes[i].shape == "SMALLARC") {
								canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 0 0 ' + real_x2 + ' ' + real_y2 + '" stroke="blue" stroke-width="5" fill="none"/>';
								largeArcFlag = false;
							} else {
								canvas.innerHTML += '<path id="' + circConId + '" d="M' + real_x1 + ' ' + real_y1 + ' A ' + radius + ' ' + radius + ' 0 1 0 ' + real_x2 + ' ' + real_y2 + '" stroke="blue" stroke-width="5" fill="none"/>';
								largeArcFlag = true;
							}
						
							circCons.push({id: circConId, x1: real_x1, y1: real_y1, x2: real_x2, y2: real_y2, r: radius, largeArcFlag: largeArcFlag, uid: shapes[i].id, group: shapes[i].group, groupShapeParent: shapes[i].groupShapeParent});		
//							var circCntrParents = [];
//							circCntrParents.push(shapes[i].groupShapeParent);
							groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents: groupShapeParents});
							
							circConNumber++;
							
						} else {
							 console.log("Wrong Shape for Group Shape");
						}
						
						if (preGroupId == null) {
							if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
								groupShapeParents.push(shapes[i].groupShapeParent);
							} else if (shapes[i].parent != null) {
								parents.push(shapes[i].parent);
							} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
								parents.push(-2);
							} else {
								parents.push(-1);
							}
							
							shapeIds.push(shapes[i].id);
							
							preGroupId = shapes[i].group;
							
						} else if (shapes[i].group != preGroupId) {
//							groupShapes.push({type:"cntrGroup", id:lineId, parents:parents, shapes: shapeIds, group: preGroupId, groupShapeParents:groupShapeParents});
//							parents = [];
//							shapeIds = [];
//							groupShapeParents = [];
							
							if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
								groupShapeParents.push(shapes[i].groupShapeParent);
							} else if (shapes[i].parent != null) {
								parents.push(shapes[i].parent);
							} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
								parents.push(-2);
							} else {
								parents.push(-1);
							}
							
							shapeIds.push(shapes[i].id);
							
							preGroupId = shapes[i].group;
							
							
						} else {
							if (shapes[i].shape == "SMALLARC" || shapes[i].shape == "BIGARC") {
								groupShapeParents.push(shapes[i].groupShapeParent);
							} else if (shapes[i].parent != null) {
								parents.push(shapes[i].parent);
							} else if (Math.abs(shapes[i].angle - 90) < 0.0001) {
								parents.push(-2);
							} else {
								parents.push(-1);
							}
							
							shapeIds.push(shapes[i].id);
							preGroupId = shapes[i].group;
						}
					
						if (i == shapes.length - 1) {
							groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents:groupShapeParents});
							parents = [];
							shapeIds = [];
							groupShapeParents = [];
						} else {
							if (shapes[i].group != shapes[i+1].group) {
								groupShapes.push({type:"cntrGroup", parents:parents, shapes: shapeIds, group: shapes[i].group, groupShapeParents:groupShapeParents});
								parents = [];
								shapeIds = [];
								groupShapeParents = [];
							}
						}
									
//						groupShapes.push({type:"cntrGroup", id:lineId, parents});			
//						groupShapes.push({type:"rectGroup", id:rcflId, parents:parents, shapes: shapeIds, group: groupId});
								
					}

				} else {
					console.log("Wrong Physical View Name: " + viewChange);
					$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
				}
				
			}
			
			if (shapes[i].groupShape == "CIRCLE") {
				
				if (view3D == 'xy') {
					if (shapes[i].z1 == 0) {
						console.log("display circle!!!");
						// TODO: Need to check if this circle shape has a parent
						parents.push(shapes[i].parent);
						shapeIds.push(shapes[i].id);
						
						var circ_element_tmp = {};
						circ_element_tmp.x1 = shapes[i].x1;
						circ_element_tmp.y1 = shapes[i].y1;
						circ_element_tmp.radius = shapes[i].width;
						circ_tmp.push(circ_element_tmp);
						
						if (circ_tmp.length == 4) {
							displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, div);
							circ_tmp = [];
							parents = [];
							shapeIds = [];
							
						}
					}
				} else if (view3D == 'xz') {
					if (shapes[i].y1 == 0) {
						console.log("display circle!!!");
						// TODO: Need to check if this circle shape has a parent
						parents.push(shapes[i].parent);
						shapeIds.push(shapes[i].id);
						
						var circ_element_tmp = {};
						circ_element_tmp.x1 = shapes[i].x1;
						circ_element_tmp.y1 = shapes[i].z1;
						circ_element_tmp.radius = shapes[i].width;
						circ_tmp.push(circ_element_tmp);
						
						if (circ_tmp.length == 4) {
							displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, div);
							circ_tmp = [];
							parents = [];
							shapeIds = [];
							
						}
					}
				} else if (view3D == 'yz') {
					if (shapes[i].x1 == 0) {
						console.log("display circle!!!");
						// TODO: Need to check if this circle shape has a parent
						parents.push(shapes[i].parent);
						shapeIds.push(shapes[i].id);
						
						var circ_element_tmp = {};
						circ_element_tmp.x1 = -shapes[i].y1;
						circ_element_tmp.y1 = shapes[i].z1;
						circ_element_tmp.radius = shapes[i].width;
						circ_tmp.push(circ_element_tmp);
						
						if (circ_tmp.length == 4) {
							displayCirc(circ_tmp, parents, shapeIds, shapes[i].group, div);
							circ_tmp = [];
							parents = [];
							shapeIds = [];
							
						}
					}
				} else {
					console.log("Wrong Physical View Name: " + viewChange);
					$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
				}
				
			}
			
		}
			
	}
}

function removePhysicalDesignView() {
	for (var i = 1; i < verticalLines.length; i++) {
		var id = '#' + verticalLines[i].id;
		$(id).remove();
	}
	
	for (var i = 1; i < horizontalLines.length; i++) {
		var id = '#' + horizontalLines[i].id;
		$(id).remove();
	}
	
	verticalLines.splice(1, verticalLines.length - 1);
	horizontalLines.splice(1, horizontalLines.length - 1);
	
	for (var i = 0; i < rects.length; i++) {
		var id = '#' + rects[i].id;
		$(id).remove();
	}
	rects = [];
	
	for (var i = 0; i < circs.length; i++) {
		var id = '#' + circs[i].id;
		$(id).remove();
	}
	circs = [];
	
}

function updateShape(event) {
	console.log("update shape");
	
	if (elementFound.length == 0) {
		return;
	}
	var bound = document.getElementById("pdsvsvg").getBoundingClientRect();
	x0 = bound.left;
	y0 = bound.top;
	
	var curX = event.clientX - x0;
	var curY = event.clientY - y0;
	
	var diffX = curX + x0 - startX;
	var diffY = curY + y0 - startY;
		
	var json_updateShape;
	
	if (elementFound[0].type == "verticalLine") {
		for (var i = 0; i < elementFound.length; i++) {
//			verticalLines[elementFound[i].sn].val = verticalLines[elementFound[i].sn].val + diffX;
			verticalLines[elementFound[i].sn].val = elementFound[i].val;
		}
		
		var new_x = (elementFound[0].relpos + diffX) / zoomLevels[zoomLevel];
		
		if (view3D == 'xy') {
			json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": ' + new_x + ', "y1": 0, "z1": 0, "x2": 0,';
			json_updateShape += '"y2": 0, "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 90}';
		} else if (view3D == 'yz') {
			json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": 0, "y1": ' + new_x + ', "z1": 0, "x2": 0,';
			json_updateShape += '"y2": 0, "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 90}';
		} else if (view3D == 'xz') {
			json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": ' + new_x + ', "y1": 0, "z1": 0, "x2": 0,';
			json_updateShape += '"y2": 0, "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 90}';
		}
//		json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": ' + new_x + ', "y1": 0, "z1": 0, "x2": 0,';
//		json_updateShape += '"y2": 0, "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 90}';
	} else if (elementFound[0].type == "horizontalLine") {
		
		for (var i = 0; i < elementFound.length; i++) {
//			horizontalLines[elementFound[i].sn].val = horizontalLines[elementFound[i].sn].val + diffY;
			horizontalLines[elementFound[i].sn].val = elementFound[i].val;
		}
		
		var new_y = (elementFound[0].relpos + diffY) / zoomLevels[zoomLevel];
		
		if (view3D == 'xy') {
			json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": 0, "y1": ' + new_y + ', "z1": 0, "x2": 0,';
			json_updateShape += '"y2": 0, "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 0}';
		} else if (view3D == 'yz') {
			json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": 0, "y1": 0, "z1": ' + new_y + ', "x2": 0,';
			json_updateShape += '"y2": 0, "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 0}';
		} else if (view3D == 'xz') {
			json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": 0, "y1": 0, "z1": ' + new_y + ', "x2": 0,';
			json_updateShape += '"y2": 0, "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 0}';
		}
//		json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": 0, "y1": ' + new_y + ', "z1": 0, "x2": 0,';
//		json_updateShape += '"y2": 0, "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 0}';
	}
	
	
	$.ajax({
		type : 'PUT',
		url : apiBaseUrl + 'model/shape/',
		contentType : 'application/json',
		dataType : 'json',
		data : json_updateShape,
		cache : false,
		success : function(data) {
			console.log("update shape success. data: "+ data.name);
		},
		error : function(xhr, ajaxOptions, error) {
			alert(xhr.status);
			console.log('failed to update the shape : '+ xhr.responseText);
		}
	}).done(function(data) {
		// TODO: update id in memory
		console.log(data);
		elementFound = [];
	});
	
}

function initTPV(type) {
	console.log(type);
	
//	loadShape(type.innerHTML);
};





// Deprecated
function setCurType (type) {
	console.log("Inside set current Type for physical view");
	curType = type;
	curModels = [];
	curModel = null;
	isInitPhysicalDesignView = false;
}

//function hideBarsODT() {
//	$("#typeBar").css("visibility","hidden");
//	$("#ruleBar").css("visibility","hidden");
//}

function displayRectFill(rect_tmp, parents, shapeIds, groupId, eleId) {
	
	console.log("Inside display rect fill");
	
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
	
	x += verticalLines[0].val;
	y += horizontalLines[0].val;
	
	var h = Math.abs(rect_tmp[2] - rect_tmp[3]);
	var w = Math.abs(rect_tmp[0] - rect_tmp[1]);
	
//	console.log("x = " + x + " y = " + y + " h = " + h + " w = " + w);
	
	var rcflId = "rcfl" + rcflNumber;
	
//	var canvas = document.getElementById("pdsvsvg");
	
	var canvas = document.getElementById(eleId);
	canvas.innerHTML += "<rect id='" + rcflId + "', x='" + Number(x) + "' y='" + Number(y) + "' width='" + Number(w) + "' height='" + Number(h) + "' style='fill:blue;stroke:blue;stroke-width:2' fill-opacity='0.5' stroke-opacity='0.5'>";
//	canvas.innerHTML += "<rect x='100' y='100' width='100' height='100' style='fill:blue;stroke:blue;stroke-width:2' fill-opacity='0.5' stroke-opacity='0.5'>";
	
	// AL: something may be related to physical display view. but it is obviously not correct.
//	var pdpv = document.getElementById("pvCysvg");
//	
//	pdpv.innerHTML += "<rect id='" + rcflId + "', x='" + Number(x) + "' y='" + Number(y) + "' width='" + Number(w) + "' height='" + Number(h) + "' style='fill:blue;stroke:blue;stroke-width:2' fill-opacity='0.5' stroke-opacity='0.5'>";;
//	
//	x = Number(x) - verticalLines[0].val + originDisplay[0];
//	y = Number(y) - horizontalLines[0].val + originDisplay[1];
	
	rects.push({id:rcflId, x:Number(x), y:Number(y), width:Number(w), height:Number(h)});
	groupShapes.push({type:"rectGroup", id:rcflId, parents:parents, shapes: shapeIds, group: groupId});
	
	rcflNumber++;
}

function displayCirc(circ_tmp, parents, shapeIds, groupId, eleId) {
	
	console.log("display circ");
	var x = circ_tmp[0].x1 * zoomLevels[zoomLevel] + verticalLines[0].val;
	var y = circ_tmp[0].y1 * zoomLevels[zoomLevel] + horizontalLines[0].val;
	var r = circ_tmp[0].radius * zoomLevels[zoomLevel];

	console.log("x = " + x + " y = " + y + " r = " + r);
	
	var circId = "circ" + circNumber;
//	var canvas = document.getElementById("pdsvsvg");  
	var canvas = document.getElementById(eleId);
	canvas.innerHTML += "<circle id='" + circId + "' cx='" + x + "' cy='" + y + "' r='" + r + "' style='stroke:rgb(255,0,0);stroke-width:2; fill:none' stroke-dasharray='10,10'>"
	
	circs.push({id:circId, cx:x, cy:y, r:r, group: groupId});
	groupShapes.push({type:"circGroup", parents:parents, shapes: shapeIds, group: groupId});
	circNumber++;

}

function saveGroupShape(type, shapes) {
	
	console.log("saving group shapes");
	var curCircId = null;
	var curTextId = null;
	
	var parentChildState = null;
	if (physicalModelView == "parent") {
		parentChildState = 1;
	} else if (physicalModelView == "child") {
		parentChildState = 3;
	}
	
	var jsonData = "";
	
	if (type == "rectFill") {
		
		jsonData += '{"model":' + curModel + ', "groupShape":"RECTANGLE", "shapes":[';
		
		for (var i = 0; i < shapes.length; i++) {
			if (parentChildState == null) {
				
				if (view3D == 'xy') {
					jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';
					jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
					jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', "z2":0, ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + '},';
				} else if (view3D == 'xz') {
					jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';
					jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":0, "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":0, "z2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + '},';
				} else if (view3D == 'yz') {
					jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';
					jsonData += '"x1":0, "y1":' + (-shapes[i].x1 / zoomLevels[zoomLevel]) + ', "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x2":0, "y2":' + (-shapes[i].x2 / zoomLevels[zoomLevel]) + ', "z2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + '},';
				} else {
					console.log("Wrong Physical View Name: " + viewChange);
					$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
				}				
//				jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';
//				jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
//				jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', "z2":0, ';
//				jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
//				jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + '},';
			} else {
				
				if (view3D == 'xy') {
					jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';
					jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
					jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', "z2":0, ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + ', "parentChildState":'+parentChildState+'},';
				} else if (view3D == 'xz') {
					jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';
					jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":0, "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":0, "z2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + ', "parentChildState":'+parentChildState+'},';
				} else if (view3D == 'yz') {
					jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';
					jsonData += '"x1":0, "y1":' + (-shapes[i].x1 / zoomLevels[zoomLevel]) + ', "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x2":0, "y2":' + (-shapes[i].x2 / zoomLevels[zoomLevel]) + ', "z2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + ', "parentChildState":'+parentChildState+'},';
				} else {
					console.log("Wrong Physical View Name: " + viewChange);
					$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
				}				
//				jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';
//				jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
//				jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', "z2":0, ';
//				jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
//				jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + ', "parentChildState":'+parentChildState+'},';
			}
		}
		
		jsonData += ']}';
		
	} else if (type == "cntr") {
		
		jsonData += '{"model":' + curModel + ', "groupShape":"LINE", "shapes":[';
		
		for (var i = 0; i < shapes.length; i++) {
			
			if (shapes[i].type == "horizontal" || shapes[i].type == "vertical") {
				if (parentChildState == null) {
					if (view3D == 'xy') {
						jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';
						jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
						jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', "z2":0, ';
						jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
						jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + '},';
					} else if (view3D == 'xz') {
						jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';
						jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":0, "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
						jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":0, "z2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', ';
						jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
						jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + '},';
					} else if (view3D == 'yz') {
						jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';
						jsonData += '"x1":0, "y1":' + (-shapes[i].x1 / zoomLevels[zoomLevel]) + ', "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
						jsonData += '"x2":0, "y2":' + (-shapes[i].x2 / zoomLevels[zoomLevel]) + ', "z2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', ';
						jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
						jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + '},';
					} else {
						console.log("Wrong Physical View Name: " + viewChange);
						$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
					}
//					jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';
//					jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
//					jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', "z2":0, ';
//					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
//					jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + '},';
				} else {
					if (view3D == 'xy') {
						jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';
						jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
						jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', "z2":0, ';
						jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
						jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + ', "parentChildState":'+parentChildState+'},';
					} else if (view3D == 'xz') {
						jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';
						jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":0, "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
						jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":0, "z2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', ';
						jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
						jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + ', "parentChildState":'+parentChildState+'},';
					} else if (view3D == 'yz') {
						jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';
						jsonData += '"x1":0, "y1":' + (-shapes[i].x1 / zoomLevels[zoomLevel]) + ', "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
						jsonData += '"x2":0, "y2":' + (-shapes[i].x2 / zoomLevels[zoomLevel]) + ', "z2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', ';
						jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
						jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + ', "parentChildState":'+parentChildState+'},';
					} else {
						console.log("Wrong Physical View Name: " + viewChange);
						$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
					}
//					jsonData += '{"model":' + curModel + ', "shape":"LINE", "isConstruction":false, ';
//					jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
//					jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', "z2":0, ';
//					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
//					jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + ', "parentChildState":'+parentChildState+'},';
				}
			} else if (shapes[i].type == "circGroup") {
				
				if (shapes[i].largeArcFlag == true) {
					jsonData += '{"model":' + curModel + ', "shape":"BIGARC", "isConstruction":false, ';
				} else {
					jsonData += '{"model":' + curModel + ', "shape":"SMALLARC", "isConstruction":false, ';
				}
				if (view3D == 'xy') {
					jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
					jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', "z2":0, ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
				} else if (view3D == 'xz') {
					jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":0, "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":0, "z2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
				} else if (view3D == 'yz') {
					jsonData += '"x1":0, "y1":' + (-shapes[i].x1 / zoomLevels[zoomLevel]) + ', "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x2":0, "y2":' + (-shapes[i].x2 / zoomLevels[zoomLevel]) + ', "z2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
				} else {
					console.log("Wrong Physical View Name: " + viewChange);
					$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
				}
//				jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
//				jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', "z2":0, ';
//				jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
				
//				if (shapes[i].sweepFlag == true) {
//					jsonData += '"x1":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', "z1":0, ';
//					jsonData += '"x2":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y2":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z2":0, ';
//					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
//				} else {
//					jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
//					jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', "z2":0, ';
//					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
//				}
				
				if (parentChildState == null) {
					jsonData += '"groupShapeParent":' + shapes[i].parent + '},';
				} else {
					jsonData += '"groupShapeParent":' + shapes[i].parent + ', "parentChildState":'+parentChildState+'},';
				}
				
			} else {
				console.log("Error: Wrong Shape Type");
				return;
			}
			
		}
		jsonData += ']}';

	} else if (type == "circ") {
		jsonData += '{"model":' + curModel + ', "groupShape":"CIRCLE", "shapes":[';
		
		for (var i = 0; i < shapes.length; i++) {
			if (parentChildState == null) {
				if (view3D == 'xy') {
					jsonData += '{"model":' + curModel + ', "shape":"CIRCLE", "isConstruction":true, ';
					jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
					jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', "z2":0, ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":' + shapes[i].width + ', "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + '},';
				} else if (view3D == 'xz') {
					jsonData += '{"model":' + curModel + ', "shape":"CIRCLE", "isConstruction":true, ';
					jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":0, "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":0, "z2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":' + shapes[i].width + ', "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + '},';
				} else if (view3D == 'yz') {
					jsonData += '{"model":' + curModel + ', "shape":"CIRCLE", "isConstruction":true, ';
					jsonData += '"x1":0, "y1":' + (-shapes[i].x1 / zoomLevels[zoomLevel]) + ', "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x2":0, "y2":' + (-shapes[i].x2 / zoomLevels[zoomLevel]) + ', "z2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":' + shapes[i].width + ', "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + '},';
				} else {
					console.log("Wrong Physical View Name: " + viewChange);
					$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
				}
//				jsonData += '{"model":' + curModel + ', "shape":"CIRCLE", "isConstruction":true, ';
//				jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
//				jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', "z2":0, ';
//				jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":' + shapes[i].width + ', "depth":0, ';
//				jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + '},';
			} else {
				if (view3D == 'xy') {
					jsonData += '{"model":' + curModel + ', "shape":"CIRCLE", "isConstruction":true, ';
					jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
					jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', "z2":0, ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":' + shapes[i].width + ', "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + ', "parentChildState":'+parentChildState+'},';
				} else if (view3D == 'xz') {
					jsonData += '{"model":' + curModel + ', "shape":"CIRCLE", "isConstruction":true, ';
					jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":0, "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":0, "z2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":' + shapes[i].width + ', "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + ', "parentChildState":'+parentChildState+'},';
				} else if (view3D == 'yz') {
					jsonData += '{"model":' + curModel + ', "shape":"CIRCLE", "isConstruction":true, ';
					jsonData += '"x1":0, "y1":' + (-shapes[i].x1 / zoomLevels[zoomLevel]) + ', "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x2":0, "y2":' + (-shapes[i].x2 / zoomLevels[zoomLevel]) + ', "z2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":' + shapes[i].width + ', "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + ', "parentChildState":'+parentChildState+'},';
				} else {
					console.log("Wrong Physical View Name: " + viewChange);
					$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
				}
//				jsonData += '{"model":' + curModel + ', "shape":"CIRCLE", "isConstruction":true, ';
//				jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
//				jsonData += '"x2":' + (shapes[i].x2 / zoomLevels[zoomLevel]) + ', "y2":' + (shapes[i].y2 / zoomLevels[zoomLevel]) + ', "z2":0, ';
//				jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":' + shapes[i].width + ', "depth":0, ';
//				jsonData += '"angle":' + shapes[i].angle + ', "parent":' + shapes[i].parent + ', "parentChildState":'+parentChildState+'},';
			}
		}
		
		jsonData += ']}';
		curCircId = shapes[0].curCircId;
	} else if (type == "text") {
		jsonData += '{"model":' + curModel + ', "groupShape":"TEXT", "shapes":[';
		
		for (var i = 0; i < shapes.length; i++) {
			if (parentChildState == null) {
				if (view3D == 'xy') {
					jsonData += '{"model":' + curModel + ', "shape":"TEXT", "isConstruction":false, ';
					jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
					jsonData += '"x2":0, "y2":0, "z2":0, ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle;  
				} else if (view3D == 'xz') {
					jsonData += '{"model":' + curModel + ', "shape":"TEXT", "isConstruction":false, ';
					jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":0, "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x2":0, "y2":0, "z2":0, ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle;  
				} else if (view3D == 'yz') {
					jsonData += '{"model":' + curModel + ', "shape":"TEXT", "isConstruction":false, ';
					jsonData += '"x1":0, "y1":' + (-shapes[i].x1 / zoomLevels[zoomLevel]) + ', "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x2":0, "y2":0, "z2":0, ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle;  
				} else {
					console.log("Wrong Physical View Name: " + viewChange);
					$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
				}
//				jsonData += '{"model":' + curModel + ', "shape":"TEXT", "isConstruction":false, ';
//				jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
//				jsonData += '"x2":0, "y2":0, "z2":0, ';
//				jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
//				jsonData += '"angle":' + shapes[i].angle;      
				if(i == 2 ) { jsonData += '},'; }
				else 	{
					jsonData +=  ', "parent":'+shapes[i].parent + '},';
					}
				
			} else {
				if (view3D == 'xy') {
					jsonData += '{"model":' + curModel + ', "shape":"TEXT", "isConstruction":false, ';
					jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
					jsonData += '"x2":0, "y2":0, "z2":0, ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle;
				} else if (view3D == 'xz') {
					jsonData += '{"model":' + curModel + ', "shape":"TEXT", "isConstruction":false, ';
					jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":0, "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x2":0, "y2":0, "z2":0, ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle;
				} else if (view3D == 'yz') {
					jsonData += '{"model":' + curModel + ', "shape":"TEXT", "isConstruction":false, ';
					jsonData += '"x1":0, "y1":' + (-shapes[i].x1 / zoomLevels[zoomLevel]) + ', "z1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', ';
					jsonData += '"x2":0, "y2":0, "z2":0, ';
					jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
					jsonData += '"angle":' + shapes[i].angle;
				} else {
					console.log("Wrong Physical View Name: " + viewChange);
					$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
				}
//				jsonData += '{"model":' + curModel + ', "shape":"TEXT", "isConstruction":false, ';
//				jsonData += '"x1":' + (shapes[i].x1 / zoomLevels[zoomLevel]) + ', "y1":' + (shapes[i].y1 / zoomLevels[zoomLevel]) + ', "z1":0, ';
//				jsonData += '"x2":0, "y2":0, "z2":0, ';
//				jsonData += '"x3":0, "y3":0, "z3":0, "height":0, "width":0, "depth":0, ';
//				jsonData += '"angle":' + shapes[i].angle;
				if(i != 2 ) {
					jsonData +=  ', "parent":'+shapes[i].parent ;
					}
				jsonData += ', "parentChildState":'+parentChildState+'},';
			}
		}
		
		jsonData += ']}';
		curTextId = shapes[0].curTextId;
	}
	
	console.log("saving group shape = " + type);
	
	$.ajax({
		type : 'POST',
		url : apiBaseUrl + 'model/shape/group',
		dataType : 'json',
		data : jsonData,
		contentType : 'application/json',
		cache : false,
		async : false,
		success : function(data) {
		},
		error : function(xhr, ajaxOptions, error) {
			alert(xhr.status);
		}
	}).done(function(data) {
		// TODO: update id in memory
		console.log("saved in the database!");
		
		console.log(data);
		
		if (type == "rectFill") {
			var gs = findGroupShapeById('rcfl' + rcflNumber);
			
			console.log('rcfl' + rcflNumber);
			console.log(gs);
			console.log(gs.parents);
			
			var shapes = [];
			for (var i = 0; i < data.shapes.length; i++) {
				shapes.push(data.shapes[i].id);
			}
			
			gs.shapes = shapes;
			gs.group = data.shapes[0].group;
			
			rcflNumber++;
		} else if (type == "cntr") {
			contourHolder = [];
			
			groupShapeParents = [];
			parents = [];
			shapes = [];
			
			for (var i = 0; i < data.shapes.length; i++) {
				if (data.shapes[i].shape == "SMALLARC" || data.shapes[i].shape == "BIGARC") {
					groupShapeParents.push(data.shapes[i].groupShapeParent);
					parents.push(data.shapes[i].groupShapeParent);
				} else {
					parents.push(data.shapes[i].parent);
				}
				shapes.push(data.shapes[i].id);
			}
			
			groupShapes.push({type:"cntrGroup", group:data.shapes[0].group, shapes:shapes, parents:parents, groupShapeParents:groupShapeParents});
			
			for (var i = 0; i < data.shapes.length; i++) {
				var cntr = findLineByLineId(tmpIdHolder[i]);
				if (cntr == null) {
					cntr = findArcByArcId(tmpIdHolder[i]);
					cntr.uid = data.shapes[i].id;
				} else {
					cntr.uid = data.shapes[i].id;
				}
			}
			
			tmpIdHolder = [];
		} else if (type == "circ") {
			
			var parents = [];
			var shapeIds = [];
			
			for (var i = 0; i < data.shapes.length; i++) {
				parents.push(data.shapes[i].parent);
				shapeIds.push(data.shapes[i].id);
			}
			
			groupShapes.push({type:"circGroup", parents:parents, shapes: shapeIds, group: data.shapes[0].group});
			
			if (curCircId != null) {
				for (var i = 0; i < circs.length; i++) {
					if (circs[i].id == curCircId) {
						circs[i].group = data.shapes[0].group;
					}
				}
			} 
				
		} else if (type == "text") {
			var parents = [];
			var shapeIds = [];
			
			for (var i = 0; i < data.shapes.length; i++) {
				parents.push(data.shapes[i].parent);
				shapeIds.push(data.shapes[i].id);
			}
			
			groupShapes.push({type:"textGroup", parents:parents, shapes: shapeIds, group: data.shapes[0].group});
			
			if (curTextId != null) {
				for (var i = 0; i < texts.length; i++) {
					if (texts[i].id == curTextId) {
						texts[i].group = data.shapes[0].group;
						texts[i].shapeId = data.shapes[2].id;           // shapeId is saved for associating property text to it
					}
				}
			} 
		}
		
		for (var i = 0; i < data.shapes.length; i++) {
			curModelShapes.push(data.shapes[i]);
		}
		
	});
	
}

function convertIntersectionToShapes(intersections) {
	
	var shapes = [];
	
	if (intersections.length != 2) {
		return;
	}
	
	var x1_val = intersections[0].x - verticalLines[0].val;
	var y1_val = intersections[0].y - horizontalLines[0].val;
	var x2_val = intersections[1].x - verticalLines[0].val;
	var y2_val = intersections[1].y - horizontalLines[0].val;
	
	
	var line1 = {x1: x1_val, y1: y1_val, x2: x2_val, y2: y1_val, angle: 0, parent: intersections[0].parent_y};
	var line2 = {x1: x1_val, y1: y1_val, x2: x1_val, y2: y2_val, angle: 90, parent: intersections[0].parent_x};
	var line3 = {x1: x1_val, y1: y2_val, x2: x2_val, y2: y2_val, angle: 0, parent: intersections[1].parent_y};
	var line4 = {x1: x2_val, y1: y1_val, x2: x2_val, y2: y2_val, angle: 90, parent: intersections[1].parent_x};
	
	shapes.push(line1);
	shapes.push(line2);
	shapes.push(line3);
	shapes.push(line4);
	
	return shapes;
	
}

function convertIntersectionToCircShapes(intersections, curCircId) {
	
	var shapes = [];
	
	if (intersections.length != 2) {
		return;
	}
	
	var x1_val = intersections[0].x - verticalLines[0].val;
	var y1_val = intersections[0].y - horizontalLines[0].val;
	var x2_val = intersections[1].x - verticalLines[0].val;
	var y2_val = intersections[1].y - horizontalLines[0].val;
	
	var dx = selectedIntersections[0].x - selectedIntersections[1].x;
	var dy = selectedIntersections[0].y - selectedIntersections[1].y;
	
	var radius = Math.sqrt((dx * dx) + (dy * dy));
	
	var record1 = {x1: x1_val, y1: y1_val, x2: x2_val, y2: y2_val, angle: 0, width:radius, parent: intersections[0].parent_y, curCircId:curCircId};
	var record2 = {x1: x1_val, y1: y1_val, x2: x2_val, y2: y2_val, angle: 90, width:radius, parent: intersections[0].parent_x, curCircId:curCircId};
	var record3 = {x1: x1_val, y1: y1_val, x2: x2_val, y2: y2_val, angle: 0, width:radius, parent: intersections[1].parent_y, curCircId:curCircId};
	var record4 = {x1: x1_val, y1: y1_val, x2: x2_val, y2: y2_val, angle: 90, width:radius, parent: intersections[1].parent_x, curCircId:curCircId};
	
	shapes.push(record1);
	shapes.push(record2);
	shapes.push(record3);
	shapes.push(record4);
	
	return shapes;
	
}

//====================================================================================
function initPhysicalDisplayView() {

	var canvasPhy = document.getElementById("pvCysvg");
	canvasPhy.innerHTML = "";
}
//======================================================================================
function updateGroupShape() {
	
//	for (var i = 0; i < groupShapes.length; i++) {
//		
//		if (groupShapes[i].type == "rectGroup") {
//			var rect = $('#' + groupShapes[i].id);
//			
//			var x_coor = rect.attr('x');
//			var y_coor = rect.attr('y');
//			var h = rect.attr('height');
//			var w = rect.attr('width');
//			
//			var pos = findRectById(groupShapes[i].id);
//			
//			console.log("pos = " + pos);
//			
//			rects[pos].x = Number(x_coor);
//			rects[pos].y = Number(y_coor);
//			rects[pos].height = Number(h);
//			rects[pos].width = Number(w);
//			
//		} else if (groupShapes[i].type == "cntrGroup") {
//			
//			for (var j = 0; j < groupShapes[i].shapes.length; j++) {
//				
//				var cntrline = findLineById(groupShapes[i].shapes[j]);
//				
//				var line = $('#' + cntrline.id);
//				
//				var new_x1 = line.attr('x1');
//				var new_y1 = line.attr('y1');
//				var new_x2 = line.attr('x2');
//				var new_y2 = line.attr('y2');
//				
//				cntrline.x1 = Number(new_x1);
//				cntrline.x2 = Number(new_x2);
//				cntrline.y1 = Number(new_y1);
//				cntrline.y2 = Number(new_y2);
//			}
//			
//		}
//		
//	}
	
//	for (var i = 0; i < groupShapesAssociated.length; i++) {
//		var gs = groupShapes[groupShapesAssociated[i]];
//		if (gs.type == "rectGroup") {
//			var jsonDataR = '{"model":' + curModel + ', "groupShapeId":' + gs.group + ', "shapes":[';
//			var updatedVal = getRectConstLineCoor(groupShapes[i].parents);
//			console.log(updatedVal);
//			for (var j = 0; j < updatedVal.length; j++) {	
//				var angle;
//				if (updatedVal[j].type == "verticalLine") {
//					angle = 90;
//				} else {
//					angle = 0;
//				}
//				
//				var new_x1 = (Number(updatedVal[j].x1) - Number(verticalLines[0].val)) / zoomLevels[zoomLevel];
//				var new_x2 = (Number(updatedVal[j].x2) - Number(verticalLines[0].val)) / zoomLevels[zoomLevel];
//				var new_y1 = (Number(updatedVal[j].y1) - Number(horizontalLines[0].val)) / zoomLevels[zoomLevel];
//				var new_y2 = (Number(updatedVal[j].y2) - Number(horizontalLines[0].val)) / zoomLevels[zoomLevel];
//				
//				
//				jsonDataR += '{"modelId":' + curModel + ', "shapeId":' + gs.shapes[j] + ', "isConstruction": false, "x1":' + new_x1 + ', "x2":' + new_x2;
//				jsonDataR += ', "y1":' + new_y1 + ', "y2":' + new_y2 + ', "angle":' + angle + '},';
//			}
//			jsonDataR += ']}';
//			$.ajax({
//				type : 'PUT',
//				url : apiBaseUrl + 'model/shape/group',
//				dataType : 'json',
//				data : jsonDataR,
//				contentType : 'application/json',
//				cache : false,
//				success : function(data) {
//				},
//				error : function(xhr, ajaxOptions, error) {
//					alert(xhr.status);
//				}
//			}).done(function(data) {
//				// TODO: update id in memory
//				console.log("saved in the database!");
//			});
//		} else if (gs.type == "cntrGroup") {
//			for (var j = 0; j < updatedVal.length; j++) {
//				var new_x1 = (Number(updatedVal[j].x1) - Number(verticalLines[0].val)) / zoomLevels[zoomLevel];
//				var new_x2 = (Number(updatedVal[j].x2) - Number(verticalLines[0].val)) / zoomLevels[zoomLevel];
//				var new_y1 = (Number(updatedVal[j].y1) - Number(horizontalLines[0].val)) / zoomLevels[zoomLevel];
//				var new_y2 = (Number(updatedVal[j].y2) - Number(horizontalLines[0].val)) / zoomLevels[zoomLevel];
//				
//				jsonData += '{"modelId":' + curModel + ', "shapeId":' + gs.shapes[j] + ', "isConstruction": false, "x1":' + new_x1 + ', "x2":' + new_x2;
//				jsonData += ', "y1":' + new_y1 + ', "y2":' + new_y2 + '},';
//				
//			}
//		}
//		
//	}
	groupShapesAssociated = [];
	// update all shapes found 
	for (var i = 0; i < rectFound.length; i++) {	
		var jsonDataR = '{"model":' + curModel + ', "groupShapeId":' + rectFound[i].group + ', "shapes":[';
		var updatedVal = getRectConstLineCoor(rectFound[i].parents);
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
				jsonDataR += '{"modelId":' + curModel + ', "shapeId":' + rectFound[i].shapes[j] + ', "isConstruction": false, "x1":' + new_x1 + ', "x2":' + new_x2;
				jsonDataR += ', "y1":' + new_y1 + ', "y2":' + new_y2 + ', "z1":0, "z2":0, "angle":' + angle + '},';
			} else if (view3D == "yz") {
				jsonDataR += '{"modelId":' + curModel + ', "shapeId":' + rectFound[i].shapes[j] + ', "isConstruction": false, "y1":' + -new_x1 + ', "y2":' + -new_x2;
				jsonDataR += ', "z1":' + new_y1 + ', "z2":' + new_y2 + ', "x1":0, "x2":0, "angle":' + angle + '},';
			} else if (view3D == "xz") {
				jsonDataR += '{"modelId":' + curModel + ', "shapeId":' + rectFound[i].shapes[j] + ', "isConstruction": false, "x1":' + new_x1 + ', "x2":' + new_x2;
				jsonDataR += ', "z1":' + new_y1 + ', "z2":' + new_y2 + ', "y1":0, "y2":0, "angle":' + angle + '},';
			}
//			jsonDataR += '{"modelId":' + curModel + ', "shapeId":' + rectFound[i].shapes[j] + ', "isConstruction": false, "x1":' + new_x1 + ', "x2":' + new_x2;
//			jsonDataR += ', "y1":' + new_y1 + ', "y2":' + new_y2 + ', "angle":' + angle + '},';
		}
		jsonDataR += ']}';
		
		var id = rectFound[i].id;
		var newX = rectFound[i].x;
		var newY = rectFound[i].y;
		var newH = rectFound[i].height;
		var newW = rectFound[i].width;
		for (var j = 0; j < rects.length; j++) {
			if (rects[j].id == id) {
				rects[j].x = newX;
				rects[j].y = newY;
				rects[j].height = newH;
				rects[j].width = newW;
			}
		}
		
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
	
	for (var i = 0; i < textFound.length; i++) {
		var jsonDataT = '{"model":' + curModel + ', "groupShapeId":' + textFound[i].group + ', "shapes":[';
		for (var j = 0; j < textFound[i].shapes.length; j++) {
			var new_x = (Number(textFound[i].x) - Number(verticalLines[0].val)) / zoomLevels[zoomLevel];
			var new_y = (Number(textFound[i].y) - Number(horizontalLines[0].val)) / zoomLevels[zoomLevel];
			if (view3D == "xy") {
				jsonDataT += '{"modelId":' + curModel + ', "shapeId":' + textFound[i].shapes[j] + ', "isConstruction": false, "x1":' + new_x + ', "y1":' + new_y + ', "x2":0, "y2":0, "z1":0, "z2":0},';
			} else if (view3D == "yz") {
				jsonDataT += '{"modelId":' + curModel + ', "shapeId":' + textFound[i].shapes[j] + ', "isConstruction": false, "y1":' + -new_x + ', "z1":' + new_y + ', "x2":0, "y2":0, "x1":0, "z2":0},';
			} else if (view3D == "xz") {
				jsonDataT += '{"modelId":' + curModel + ', "shapeId":' + textFound[i].shapes[j] + ', "isConstruction": false, "x1":' + new_x + ', "z1":' + new_y + ', "x2":0, "y2":0, "y1":0, "z2":0},';
			}
//			jsonDataT += '{"modelId":' + curModel + ', "shapeId":' + textFound[i].shapes[j] + ', "isConstruction": false, "x1":' + new_x + ', "y1":' + new_y + '},';
		}
		jsonDataT += ']}';
		
		var id = textFound[i].id;
		var newX = textFound[i].x;
		var newY = textFound[i].y;
		for (var j = 0; j < texts.length; j++) {
			if (texts[j].id == id) {
				texts[j].x = newX;
				texts[j].y = newY;
			}
		}
		
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
	
	for (var i = 0; i < cntrFound.length; i++) {
		
		var new_x1 = (Number(cntrFound[i].x1) - Number(verticalLines[0].val)) / zoomLevels[zoomLevel];
		var new_x2 = (Number(cntrFound[i].x2) - Number(verticalLines[0].val)) / zoomLevels[zoomLevel];
		var new_y1 = (Number(cntrFound[i].y1) - Number(horizontalLines[0].val)) / zoomLevels[zoomLevel];
		var new_y2 = (Number(cntrFound[i].y2) - Number(horizontalLines[0].val)) / zoomLevels[zoomLevel];
		var jsonDataC = '';
		if (!cntrFound[i].r) {
			if (view3D == "xy") {
				jsonDataC = '{"model":' + curModel + ', "groupShapeId":' + cntrFound[i].group + ', "shapes":[' + 
				   '{"modelId":' + curModel + ', "shapeId":' + cntrFound[i].uid + ', "isConstruction": false, "x1":' + new_x1 + ', "x2":' + new_x2 +
				   ', "y1":' + new_y1 + ', "y2":' + new_y2 + ', "z1":0, "z2":0},]}';
			} else if (view3D == "yz") {
				jsonDataC = '{"model":' + curModel + ', "groupShapeId":' + cntrFound[i].group + ', "shapes":[' + 
				   '{"modelId":' + curModel + ', "shapeId":' + cntrFound[i].uid + ', "isConstruction": false, "y1":' + -new_x1 + ', "y2":' + -new_x2 +
				   ', "z1":' + new_y1 + ', "z2":' + new_y2 + ', "x1":0, "x2":0},]}';
			} else if (view3D == "xz") {
				jsonDataC = '{"model":' + curModel + ', "groupShapeId":' + cntrFound[i].group + ', "shapes":[' + 
				   '{"modelId":' + curModel + ', "shapeId":' + cntrFound[i].uid + ', "isConstruction": false, "x1":' + new_x1 + ', "x2":' + new_x2 +
				   ', "z1":' + new_y1 + ', "z2":' + new_y2 + ', "y1":0, "y2":0},]}';
			}
//			jsonDataC = '{"model":' + curModel + ', "groupShapeId":' + cntrFound[i].group + ', "shapes":[' + 
//					   '{"modelId":' + curModel + ', "shapeId":' + cntrFound[i].uid + ', "isConstruction": false, "x1":' + new_x1 + ', "x2":' + new_x2 +
//					   ', "y1":' + new_y1 + ', "y2":' + new_y2 + '},]}';
		} else {
			if (view3D == "xy") {
				jsonDataC = '{"model":' + curModel + ', "groupShapeId":' + cntrFound[i].group + ', "shapes":[' + 
		   		   '{"modelId":' + curModel + ', "shapeId":' + cntrFound[i].uid + ', "isConstruction": false, "x1":' + new_x1 + ', "x2":' + new_x2 +
		   		   ', "y1":' + new_y1 + ', "y2":' + new_y2 + ', "r":' + cntrFound[i].r + ', "z1":0, "z2":0},]}';
			} else if (view3D == "yz") {
				jsonDataC = '{"model":' + curModel + ', "groupShapeId":' + cntrFound[i].group + ', "shapes":[' + 
		   		   '{"modelId":' + curModel + ', "shapeId":' + cntrFound[i].uid + ', "isConstruction": false, "y1":' + -new_x1 + ', "y2":' + -new_x2 +
		   		   ', "z1":' + new_y1 + ', "z2":' + new_y2 + ', "r":' + cntrFound[i].r + ', "x1":0, "x2":0},]}';
			} else if (view3D == "xz") {
				jsonDataC = '{"model":' + curModel + ', "groupShapeId":' + cntrFound[i].group + ', "shapes":[' + 
		   		   '{"modelId":' + curModel + ', "shapeId":' + cntrFound[i].uid + ', "isConstruction": false, "x1":' + new_x1 + ', "x2":' + new_x2 +
		   		   ', "z1":' + new_y1 + ', "z2":' + new_y2 + ', "r":' + cntrFound[i].r + ', "y1":0, "y2":0},]}';
			}
//			jsonDataC = '{"model":' + curModel + ', "groupShapeId":' + cntrFound[i].group + ', "shapes":[' + 
//			   		   '{"modelId":' + curModel + ', "shapeId":' + cntrFound[i].uid + ', "isConstruction": false, "x1":' + new_x1 + ', "x2":' + new_x2 +
//			   		   ', "y1":' + new_y1 + ', "y2":' + new_y2 + ', "r":' + cntrFound[i].r + '},]}';
		}
		console.log(jsonDataC);
		var UID = cntrFound[i].uid;
		var newX1 = cntrFound[i].x1;
		var newY1 = cntrFound[i].y1;
		var newX2 = cntrFound[i].x2;
		var newY2 = cntrFound[i].y2;
		var newR = null;
		if (cntrFound[i].r) {
			newR = cntrFound[i].r;
		} 
		
		if (newR == null) {
			for (var j = 0; j < lines.length; j++) {
				if (lines[j].uid == UID) {
					lines[j].x1 = newX1;
					lines[j].y1 = newY1;
					lines[j].x2 = newX2;
					lines[j].y2 = newY2;
				}
			}
		} else {
			for (var j = 0; j < circCons.length; j++) {
				if (circCons[j].uid == UID) {
					circCons[j].x1 = newX1;
					circCons[j].y1 = newY1;
					circCons[j].x2 = newX2;
					circCons[j].y2 = newY2;
					circCons[j].r = newR;
				}
			}
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
}

function updateCircShape() {
	
	for (var i = 0; i < circFound.length; i++) {
		var jsonData = '{"model":' + curModel + ', "groupShapeId":' + circFound[i].group + ', "shapes":[';
		
		var new_x1 = (Number(circFound[i].x1) - Number(verticalLines[0].val)) / zoomLevels[zoomLevel];
		var new_x2 = (Number(circFound[i].x2) - Number(verticalLines[0].val)) / zoomLevels[zoomLevel];
		var new_y1 = (Number(circFound[i].y1) - Number(horizontalLines[0].val)) / zoomLevels[zoomLevel];
		var new_y2 = (Number(circFound[i].y2) - Number(horizontalLines[0].val)) / zoomLevels[zoomLevel];
		
		for (var j = 0; j < circFound[i].shapes.length; j++) {
			
			var angle = 90;
			var p = getVerticalElementByUid(circFound[i].parents[j], true);
			if (p == null) {
				p = getHorizontalElementByUid(circFound[i].parents[j], true);
				angle = 0;
			} 
			if (view3D == "xy") {
				jsonData += '{"modelId":' + curModel + ', "shapeId":' + circFound[i].shapes[j] + ', "isConstruction": true, "x1":' + new_x1 + ', "x2":' + new_x2;
				jsonData += ', "y1":' + new_y1 + ', "y2":' + new_y2 + ', "z1":0, "z2":0, "width":' + circFound[i].r + ', "depth":' + 0 + ', "angle":' + angle + '},';
			} else if (view3D == "yz") {
				jsonData += '{"modelId":' + curModel + ', "shapeId":' + circFound[i].shapes[j] + ', "isConstruction": true, "y1":' + -new_x1 + ', "y2":' + -new_x2;
				jsonData += ', "z1":' + new_y1 + ', "z2":' + new_y2 + ', "x1":0, "x2":0, "width":' + circFound[i].r + ', "depth":' + 0 + ', "angle":' + angle + '},';
			} else if (view3D == "xz") {
				jsonData += '{"modelId":' + curModel + ', "shapeId":' + circFound[i].shapes[j] + ', "isConstruction": true, "x1":' + new_x1 + ', "x2":' + new_x2;
				jsonData += ', "z1":' + new_y1 + ', "z2":' + new_y2 + ', "y1":0, "y2":0, "width":' + circFound[i].r + ', "depth":' + 0 + ', "angle":' + angle + '},';
			}
//			jsonData += '{"modelId":' + curModel + ', "shapeId":' + circFound[i].shapes[j] + ', "isConstruction": true, "x1":' + new_x1 + ', "x2":' + new_x2;
//			jsonData += ', "y1":' + new_y1 + ', "y2":' + new_y2 + ', "width":' + circFound[i].r + ', "depth":' + 0 + ', "angle":' + angle + '},';
		}
		jsonData += ']}';
		
		for (var j = 0; j < circs.length; j++) {
			if (circs[j].group == circFound[i].group) {
				circs[j].cx = circFound[i].x1;
				circs[j].cy = circFound[i].y1;
				circs[j].r = circFound[i].r;
			}
		}
		
		$.ajax({
			type : 'PUT',
			url : apiBaseUrl + 'model/shape/group',
			dataType : 'json',
			data : jsonData,
			contentType : 'application/json',
			cache : false,
			success : function(data) {
				$('#console-log').append("<p style='color:blue'> Circle  Shapes updated :</p>");
			},
			error : function(xhr, ajaxOptions, error) {
				$('#console-log').append("<p style='color:red'> failed to update  Circle shapes :"+xhr.status+"</p>");
			}
		}).done(function(data) {
//			for (var j = 0; j < circs.length; j++) {
//				if (circs[j].group == data.shapes[0].group) {
//					circs[j].cx = data.shapes[0].x1 * zoomLevels[zoomLevel] + verticalLines[0].val;
//					circs[j].cy = data.shapes[0].y1 * zoomLevels[zoomLevel] + horizontalLines[0].val;
//					circs[j].r = data.shapes[0].width * zoomLevels[zoomLevel];
//				}
//			}
			console.log("saved in the database!");
		});
	}
	
//	circFound = [];
	
}
	
//=======================================================================================
function findRectById(id) {	
	for (var i = 0; i < rects.length; i++) {
		if (rects[i].id == id) {
			return i;
		}
	}
}



function getConstLineById(id) {
	
	for (var i = 0; i < verticalLines.length; i++) {
		if (verticalLines[i].uid == id) {
			return {type: "verticalLine", data: verticalLines[i]};
		}
	}
	for (var i = 0; i < horizontalLines.length; i++) {
		if (horizontalLines[i].uid == id) {
			return {type: "horizontalLine", data: horizontalLines[i]};
		}
	}
	
	return null;
}

function getRectConstLineCoor(parents) {
	if (parents.length != 4) {
		console.log("not a rectangle???");
		return;
	}
	
	var conlines = [];
	var verlinePos = [];
	var horlinePos = [];
	
	for (var i = 0; i < parents.length; i++) {
		var conline = getConstLineById(parents[i]);
		conlines.push(conline);
		if (conline.type == "verticalLine") {
			verlinePos.push(i);
		} else if (conline.type == "horizontalLine") {
			horlinePos.push(i);
		}
	}
	
	var results = [];
	
	for (var i = 0; i < conlines.length; i++) {
		if (conlines[i].type == "verticalLine") {
			results.push({type:"verticalLine", x1: conlines[i].data.val, y1: conlines[horlinePos[0]].data.val, x2: conlines[i].data.val, y2: conlines[horlinePos[1]].data.val});
		} else if (conlines[i].type == "horizontalLine") {
			results.push({type:"horizontalLine", x1: conlines[verlinePos[0]].data.val, y1: conlines[i].data.val, x2: conlines[verlinePos[1]].data.val, y2: conlines[i].data.val});
		}
	}
	
	return results;
}

function findGroupShapeById(id) {
	for (var i = 0; i < groupShapes.length; i++) {
		if (groupShapes[i].id == id) {
			return groupShapes[i];
		}
	}
}

function removeAllElementsInPhysicalDesignView() {
	var canvas = document.getElementById("pdsvsvg");
	canvas.innerHTML = "";
	horizontalLines = [];
	verticalLines = [];
	verticalTexts = [];
	horizontalTexts = [];
	verticalBggds = [];
	horizontalBggds = [];
	texts = [];
	rects = [];
	circs = [];
	lines = [];
	selectedIntersections = [];
	zoomLevel = 5;
	groupShapes = [];
	groupShapesAssociated = [];
	
	linesInOtherPlanes = [];
	textsInOtherPlanes = [];
	
}


function settingsGloablVariablesDesignView(){
	
	zoomLevel = 5;
	var grid = document.getElementById("pdsvsvg");
	if (view3D == 'xy') {
		grid.innerHTML = "<line id='grid_x' x1='0%' y1='650' x2='100%' y2='650' stroke=rgb(0,0,0) stroke-width='2'>";
		grid.innerHTML += "<line id='grid_y' x1='100' y1='3' x2='100' y2='897' stroke=rgb(0,0,0) stroke-width='2'>";
		grid.innerHTML += "<text id='text0' x='45' y='672' font-family='sans-serif' font-size='20px' fill='black'>(0, 0)</text>";
		grid.innerHTML += "<text id='text1' x='95%' y='672' font-family='sans-serif' font-size='20px' fill='black'>x</text>";
		grid.innerHTML += "<text id='text2' x='75' y='20' font-family='sans-serif' font-size='20px' fill='black'>y</text>";
	} else if (view3D == 'xz') {
		grid.innerHTML = "<line id='grid_x' x1='0%' y1='650' x2='100%' y2='650' stroke=rgb(0,0,0) stroke-width='2'>";
		grid.innerHTML += "<line id='grid_y' x1='100' y1='3' x2='100' y2='897' stroke=rgb(0,0,0) stroke-width='2'>";
		grid.innerHTML += "<text id='text0' x='45' y='672' font-family='sans-serif' font-size='20px' fill='black'>(0, 0)</text>";
		grid.innerHTML += "<text id='text1' x='95%' y='672' font-family='sans-serif' font-size='20px' fill='black'>x</text>";
		grid.innerHTML += "<text id='text2' x='75' y='20' font-family='sans-serif' font-size='20px' fill='black'>z</text>";
	} else if (view3D == 'yz') {
		grid.innerHTML = "<line id='grid_x' x1='0%' y1='650' x2='100%' y2='650' stroke=rgb(0,0,0) stroke-width='2'>";
		grid.innerHTML += "<line id='grid_y' x1='100' y1='3' x2='100' y2='897' stroke=rgb(0,0,0) stroke-width='2'>";
		grid.innerHTML += "<text id='text0' x='45' y='672' font-family='sans-serif' font-size='20px' fill='black'>(0, 0)</text>";
		grid.innerHTML += "<text id='text1' x='95%' y='672' font-family='sans-serif' font-size='20px' fill='black'>y</text>";
		grid.innerHTML += "<text id='text2' x='75' y='20' font-family='sans-serif' font-size='20px' fill='black'>z</text>";
	} else {
		console.log("Wrong Physical View Name: " + viewChange);
		$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
	}
	
//	grid.innerHTML = "<line id='grid_x' x1='0%' y1='650' x2='100%' y2='650' stroke=rgb(0,0,0) stroke-width='2'>";
//	grid.innerHTML += "<line id='grid_y' x1='100' y1='3' x2='100' y2='897' stroke=rgb(0,0,0) stroke-width='2'>";
//	grid.innerHTML += "<text id='text0' x='45' y='672' font-family='sans-serif' font-size='20px' fill='black'>(0, 0)</text>";
//	grid.innerHTML += "<text id='text1' x='95%' y='672' font-family='sans-serif' font-size='20px' fill='black'>x</text>";
//	grid.innerHTML += "<text id='text2' x='75' y='20' font-family='sans-serif' font-size='20px' fill='black'>y</text>";
	
	horizontalLines = [];
	verticalLines = [];
	verticalTexts = [];
	horizontalTexts = [];
	verticalBggds = [];
	horizontalBggds = [];
	texts = [];
	rects = [];
	circs = [];
	lines = [];
	elementFound = [];
	groupShapes = [];
	groupShapesAssociated = [];
	
	linesInOtherPlanes = [];
	textsInOtherPlanes = [];
	
	var n = 0;
	for (var i = -20; i <= 20; i++) {
		grid.innerHTML += "<line id='bggd" + (2 * n) + "' x1='0%' y1='" + (650 + i * spacing) + "' x2='100%' y2='" + (650 + i * spacing) + "' style='stroke:rgb(128,128,128);stroke-width:0.4' stroke-dasharray='5,5'>"
		grid.innerHTML += "<line id='bggd" + (2 * n + 1) + "' x1='" + (100 + i * spacing) + "' y1='3' x2='" + (100 + i * spacing) + "' y2='897' style='stroke:rgb(128,128,128);stroke-width:0.4' stroke-dasharray='5,5'>"
		verticalBggds.push({id: 'bggd' + (2 * n + 1), val: Number(100 + i * spacing)});
		horizontalBggds.push({id: 'bggd' + (2 * n), val: Number(650 + i * spacing)});
		n++;
	}
	verticalLines.push({id: 'grid_y', val: 100, uid: -2});
	horizontalLines.push({id: 'grid_x', val: 650, uid: -1});
	verticalTexts.push({id: 'text2', val: 75});
	horizontalTexts.push({id: 'text1', val: 672});
	texts.push({id: 'text0', x: 45, y: 672});
	isInitPhysicalDesignView = true;	
}




//======================================================================
function reinitPhysicalDesignView() {
	
	if (!isInitPhysicalDesignView) {
		console.log("reinitialize!!!");
		settingsGloablVariablesDesignView();
	}
	
}
//======================================================================
function showAddModelPropertyDialog() {
	console.log("try to add new property");
	
	var dlg_width = 400, dlg_height = 50, dlg_offset_x = 300, dlg_margin_top = 300;
	var dialog = $('#dialog');
	
	dialog.dialog({
		width : dlg_width,
		autoOpen : false,
		position : {
			my : "center center",
			at : "center center",
			of : "#gvTabContent"
		},
		buttons : {
			"Add Model" : function() {
				createNewModelProperty(dialog.find("form"));
			},
			Cancel : function() {
				dialog.dialog("close");
			}
		}
	});
	
	if (!hasMoved && dialog.dialog("instance")) {
		grayOut(true);
		
		var formHeader = "<form id='add_new_model_property'>", inputs = "";
		
		// Name field
		inputs += "<label>Name: <input type='text' name='name' required/></label><br />";
		 
		// <!-- Allow form submission with keyboard without duplicating the dialog button -->
		var formFooter = "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px;' />";

		dialog.dialog("option", "title", "Add Model Property");
		dialog[0].innerHTML = formHeader + inputs + formFooter;
		dialog.dialog("open");
	}

    dialog.find("form").on("submit", function(event) {
    	event.preventDefault();
    	createNewModelProperty(this);
    });
	
    selectedLine = null;
}
//===============================================================================


function findMouseCoor2(event) {
	
	console.log("inside find mouse coor 2");
	
	var tmpx = event.clientX;
	console.log("tmpx = " + tmpx);
	
	var rect = document.getElementById("pdsvsvg").getBoundingClientRect();
	console.log(rect.top, rect.right, rect.bottom, rect.left);
	
	x0 = rect.left;
	y0 = rect.top;
	
	console.log("relative x = " + (tmpx - x0 - verticalLines[0].val));
	
}

//function displayModelProperties(shapes) {
	
//	var properties = retrieveModelProperties(shapes);
//	
//	var infoEle = document.getElementById("model_info");
//	    infoEle.innerHTML = '';
//	var output = "<p>Model Properties</p>";
//	
//	for (var i = 0; i < properties.length; i++) {
//		
//		var modifier;
//		
//		if (properties[i].propertyModifierType == 1) {
//			modifier = "Relative x";
//		} else if (properties[i].propertyModifierType == 3) {
//			modifier = "Relative y";
//		} else if (properties[i].propertyModifierType == 5) {
//			modifier = "Absolute x";
//		} else if (properties[i].propertyModifierType == 7) {
//			modifier = "Absolute y";
//		}
//			
//		output += 'Name: ' + properties[i].name + '<br>';
//		output += 'Default Value: ' + Math.round(properties[i].defaultValue) + '<br>';
////		output += 'Parent-Child: ' + properties[i].parentChild + '<br>';
//		output += 'Minimum Value: ' + Math.round(properties[i].minimumValue) + '<br>';
//		output += 'Maximum Value: ' + Math.round(properties[i].maximumValue) + '<br>';
//		output += 'Modifier: ' + modifier + '<br>';
//		output += '<br>';
//	}
//	
//	infoEle.innerHTML = output;
//	
//}





function resetMemo() {
	
}

function findLineByLineId(lineId) {
	for (var i = 0; i < lines.length; i++) {
		if (lines[i].id == lineId) {
			return lines[i];
		}
	}
}

function findArcByArcId(arcId) {
	
	for (var i = 0; i < circCons.length; i++) {
		if (circCons[i].id == arcId) {
			return circCons[i];
		}
	}
}

function getContourNewVal(groupShape) {
	
	var cntrlines = [];
	
	for (var i = 0; i < groupShape.shapes.length; i++) {
		var cntrline = findLineById(groupShape.shapes[i]);
		cntrlines.push(cntrline);
	}
	
	var result = [];
	
	for (var i = 0; i < cntrlines.length; i++) {
		var line_html = $("#" + cntrlines[i].id);
		var new_x1 = line_html.attr("x1");
		var new_y1 = line_html.attr("y1");
		var new_x2 = line_html.attr("x2");
		var new_y2 = line_html.attr("y2");
		result.push({id:cntrlines[i].id, uid:cntrlines[i].uid, x1:new_x1, y1:new_y1, x2:new_x2, y2:new_y2});
	}
	
	return result;
}

function findLineById(id) {
	
	for (var i = 0; i < lines.length; i++) {
		
		if (lines[i].uid == id) {
			
			return lines[i];
		}
	}
	
}





function reloadTypeForm() {
	var tmpModel = curModel;
	var tmpCurModels = [];
	for (var i = 0; i < curModels.length; i++) {
		tmpCurModels.push(curModels[i]);
	}
	var tmpIsInitPhysicalDesignView = isInitPhysicalDesignView;
	
	(new DesignLogicalRenderer()).showOrHideGridTypes(true);
	document.getElementById('Infotitle').textContent="Type Details";
	(new DesignLogicalRenderer()).emptyAll();
	TypePropertyUtils.displayTypeProperties( $('#typeForm'), typeMap[nametype], true );
	//showType(typeMap[nametype]);
		
	curModel = tmpModel; 
	for (var i = 0; i < tmpCurModels.length; i++) {
		curModels.push(tmpCurModels[i]);
	}
	isInitPhysicalDesignView = tmpIsInitPhysicalDesignView;
}

function loadShapeGraphWithinModel() {

	isInitPhysicalDesignView = false;
	var modelFound = getModelById(curModel);
	if (modelFound.childEnabled == false) {
		displayShapes(curModelShapes);
		organizeShapesWithProps();
		organizeShapesFromOtherPlanes();
		inputs = '<button type="button" value="child" onclick="createModelCopyOptionsBox(this.value)">View Alternative</button>';			
		document.getElementById("physicalParentChildSwitcher").innerHTML = inputs;
		physicalModelView = "parent";
	} else if (modelFound.childEnabled == true) {
		displayParentChildShapes(curModelShapes);
		organizeShapesWithProps();
		organizeShapesFromOtherPlanes();
		inputs = '<button type="button" onclick="changePysicalModelView()" value="View Child">View Child</button>';
		document.getElementById("physicalParentChildSwitcher").innerHTML = inputs;
		physicalModelView = "parent";
	} else {
		$('#console-log').append("<p style='color:red'>Error: Wrong Data</p>");
	}
	
}

function generatePhysicalParentChildView(view, copy) {
	
	var jsonData;
	
	if (copy == true) {	
		var inputs = "";
		if (view == "parent") {
			inputs += '<button type="button" onclick="changePysicalModelView()" value="View Child">View Child</button>';
			physicalModelView = "parent";
		} else if (view == "child") {
			jsonData = '{"modelId":' + curModel + ', "copyToOpposite":true}';
			$.ajax({
				type : 'PUT',
				url : apiBaseUrl + 'model/model/convert/child',
				dataType : 'json',
				data : jsonData,
				contentType : 'application/json',
				cache : false,
				async : false,
				success : function(data) {
					console.log("enable child view success. data: "+ data.name);
				},
				error : function(xhr, ajaxOptions, error) {
					$('#console-log').append("<p style='color:red'>Failed to Enable Child View: "+ xhr.status+"</p>");
					console.log('Failed to Enable Child View: '+ xhr.responseText);
				}
			}).done(function(data) {
				curModelShapes = data.updatedShapes;
				physicalModelView = "child";
				isInitPhysicalDesignView = false;
				reinitPhysicalDesignView();
				displayParentChildShapes(curModelShapes);
				organizeShapesWithProps();
				organizeShapesFromOtherPlanes();
				getModelProperties(curModel);  // load properties related to model (assigned to shapes and non-assigned)
				inputs += '<button type="button" onclick="changePysicalModelView()" value="View Parent">View Parent</button>';				
			});
		
		} else {
			inputs += '<button type="button" value="Nothing">';
		}
		document.getElementById('physicalParentChildSwitcher').innerHTML = inputs;
	} else if (copy == false) {
		var inputs = "";
		if (view == "parent") {
			inputs += '<button type="button" onclick="changePysicalModelView()" value="View Child">View Child</button>';
			physicalModelView = "parent";
		} else if (view == "child") {
			
			jsonData = '{"modelId":' + curModel + ', "copyToOpposite":false}';			
			$.ajax({
				type : 'PUT',
				url : apiBaseUrl + 'model/model/convert/child',
				dataType : 'json',
				data : jsonData,
				contentType : 'application/json',
				cache : false,
				async : false,
				success : function(data) {
					console.log("enable child view success. data: "+ data.name);
				},
				error : function(xhr, ajaxOptions, error) {
					$('#console-log').append("<p style='color:red'>Failed to Enable Child View: "+ xhr.status+"</p>");
					console.log('Failed to Enable Child View: '+ xhr.responseText);
				}
			}).done(function(data) {
				curModelShapes = data.updatedShapes;
				physicalModelView = "child";
				isInitPhysicalDesignView = false;
				reinitPhysicalDesignView();
				displayParentChildShapes(curModelShapes);
				organizeShapesWithProps();
				organizeShapesFromOtherPlanes();
				getModelProperties(curModel);  // load properties related to model (assigned to shapes and non-assigned)
				inputs += '<button type="button" onclick="changePysicalModelView()" value="View Parent">View Parent</button>';
			});
			
		} else {
			inputs += '<button type="button" value="Nothing">';
		}
		document.getElementById('physicalParentChildSwitcher').innerHTML = inputs;
	} else {
		$('#console-log').append("<p style='color:red'>Web Page Error</p>");
	}
	reloadTypeForm();
}

function changePysicalModelView() {

	if (physicalModelView == "child") {
		// change to parent view
		physicalModelView = "parent";
		isInitPhysicalDesignView = false;
		reinitPhysicalDesignView();
		displayParentChildShapes(curModelShapes);
		organizeShapesWithProps();
		organizeShapesFromOtherPlanes();
		var inputs = "";
		inputs += '<button type="button" onclick="changePysicalModelView()" value="View Child">View Child</button>';
		document.getElementById('physicalParentChildSwitcher').innerHTML = inputs;
		getModelProperties(curModel);  // load properties related to model (assigned to shapes and non-assigned)
	} else if (physicalModelView == "parent") {
		// change to child view
		physicalModelView = "child";
		isInitPhysicalDesignView = false;
		reinitPhysicalDesignView();
		displayParentChildShapes(curModelShapes);
		organizeShapesWithProps();
		organizeShapesFromOtherPlanes();
		var inputs = "";
		inputs += '<button type="button" onclick="changePysicalModelView()" value="View Parent">View Parent</button>';
		document.getElementById('physicalParentChildSwitcher').innerHTML = inputs;
		getModelProperties(curModel);  // load properties related to model (assigned to shapes and non-assigned)
	} else {
		$('#console-log').append("<p style='color:red'>Error: No Selected Model View Found</p>");
	}

}





function modifyShapeVal(curModelShape, part, newModelShapes) {
	
	console.log("inside modify shape val = ");
//	console.log(curModelShape);
	if (curModelShape.isConstruction) {
		
		if (!curModelShape.hasOwnProperty("property")) {
//			console.log("curModelShape doesn't have property");
			return curModelShape;
		}
	  //  found a shape with a property === verify if that property has changed in the part
		for (var i = 0; i < part.length; i++) {
			if (part[i].modelPropertyId == curModelShape.property.id) {
				// changes for Number property
				if(curModelShape.property.propertyModifierType ){
					
					if (view3D == 'xy') {
						if (curModelShape.property.propertyModifierType == 1) {
							var shape = getModelShapeById(newModelShapes, curModelShape.parent);
							curModelShape.x1 = Number(part[i].value);
							curModelShape.x2 = Number(part[i].value);
						} else if (curModelShape.property.propertyModifierType == 3) {
							var shape = getModelShapeById(newModelShapes, curModelShape.parent);
							curModelShape.y1 = -Number(part[i].value);
							curModelShape.y2 = -Number(part[i].value);
						} else if (curModelShape.property.propertyModifierType == 5) {
							if (!curModelShape.hasOwnProperty("parent") || curModelShape.parent == -1 || curModelShape.parent == -2) {
								curModelShape.x1 = Number(part[i].value);
								curModelShape.x2 = Number(part[i].value);
							} else {
								var shape = getModelShapeById(newModelShapes, curModelShape.parent);
								curModelShape.x1 = Number(part[i].value) - Number(shape.x1);
								curModelShape.x2 = Number(part[i].value) - Number(shape.x2);
							}
						} else if (curModelShape.property.propertyModifierType == 7) {
							if (!curModelShape.hasOwnProperty("parent") || curModelShape.parent == -1 || curModelShape.parent == -2) {
								curModelShape.y1 = -Number(part[i].value);
								curModelShape.y2 = -Number(part[i].value);
							} else {
								var shape = getModelShapeById(newModelShapes, curModelShape.parent);
								curModelShape.y1 = -(Number(part[i].value) - Number(shape.y1));
								curModelShape.y2 = -(Number(part[i].value) - Number(shape.y2));
							}
						}
					} else if (view3D == 'yz') {
						if (curModelShape.property.propertyModifierType == 3) {
							var shape = getModelShapeById(newModelShapes, curModelShape.parent);
							curModelShape.y1 = -Number(part[i].value);
							curModelShape.y2 = -Number(part[i].value);
						} else if (curModelShape.property.propertyModifierType == 11) {
							var shape = getModelShapeById(newModelShapes, curModelShape.parent);
							curModelShape.z1 = -Number(part[i].value);
							curModelShape.z2 = -Number(part[i].value);
						} else if (curModelShape.property.propertyModifierType == 7) {
							if (!curModelShape.hasOwnProperty("parent") || curModelShape.parent == -1 || curModelShape.parent == -2) {
								curModelShape.y1 = -Number(part[i].value);
								curModelShape.y2 = -Number(part[i].value);
							} else {
								var shape = getModelShapeById(newModelShapes, curModelShape.parent);
								curModelShape.y1 = -(Number(part[i].value) - Number(shape.y1));
								curModelShape.y2 = -(Number(part[i].value) - Number(shape.y2));
							}
						} else if (curModelShape.property.propertyModifierType == 17) {
							if (!curModelShape.hasOwnProperty("parent") || curModelShape.parent == -1 || curModelShape.parent == -2) {
								curModelShape.z1 = -Number(part[i].value);
								curModelShape.z2 = -Number(part[i].value);
							} else {
								var shape = getModelShapeById(newModelShapes, curModelShape.parent);
								curModelShape.z1 = -(Number(part[i].value) - Number(shape.z1));
								curModelShape.z2 = -(Number(part[i].value) - Number(shape.z2));
							}
						}
					} else if (view3D == 'xz') {
						if (curModelShape.property.propertyModifierType == 1) {
							var shape = getModelShapeById(newModelShapes, curModelShape.parent);
							curModelShape.x1 = Number(part[i].value);
							curModelShape.x2 = Number(part[i].value);
						} else if (curModelShape.property.propertyModifierType == 11) {
							var shape = getModelShapeById(newModelShapes, curModelShape.parent);
							curModelShape.z1 = -Number(part[i].value);
							curModelShape.z2 = -Number(part[i].value);
						} else if (curModelShape.property.propertyModifierType == 5) {
							if (!curModelShape.hasOwnProperty("parent") || curModelShape.parent == -1 || curModelShape.parent == -2) {
								curModelShape.x1 = Number(part[i].value);
								curModelShape.x2 = Number(part[i].value);
							} else {
								var shape = getModelShapeById(newModelShapes, curModelShape.parent);
								curModelShape.x1 = Number(part[i].value) - Number(shape.x1);
								curModelShape.x2 = Number(part[i].value) - Number(shape.x2);
							}
						} else if (curModelShape.property.propertyModifierType == 17) {
							if (!curModelShape.hasOwnProperty("parent") || curModelShape.parent == -1 || curModelShape.parent == -2) {
								curModelShape.z1 = -Number(part[i].value);
								curModelShape.z2 = -Number(part[i].value);
							} else {
								var shape = getModelShapeById(newModelShapes, curModelShape.parent);
								curModelShape.z1 = -(Number(part[i].value) - Number(shape.z1));
								curModelShape.z2 = -(Number(part[i].value) - Number(shape.z2));
							}
						}
					}					
//					if (curModelShape.property.propertyModifierType == 1) {
//						var shape = getModelShapeById(newModelShapes, curModelShape.parent);
//						curModelShape.x1 = Number(part[i].value);
//						curModelShape.x2 = Number(part[i].value);
//					} else if (curModelShape.property.propertyModifierType == 3) {
//						var shape = getModelShapeById(newModelShapes, curModelShape.parent);
//						curModelShape.y1 = -Number(part[i].value);
//						curModelShape.y2 = -Number(part[i].value);
//					} else if (curModelShape.property.propertyModifierType == 5) {
//						if (!curModelShape.hasOwnProperty("parent") || curModelShape.parent == -1 || curModelShape.parent == -2) {
//							curModelShape.x1 = Number(part[i].value);
//							curModelShape.x2 = Number(part[i].value);
//						} else {
//							var shape = getModelShapeById(newModelShapes, curModelShape.parent);
//							curModelShape.x1 = Number(part[i].value) - Number(shape.x1);
//							curModelShape.x2 = Number(part[i].value) - Number(shape.x2);
//						}
//					} else if (curModelShape.property.propertyModifierType == 7) {
//						if (!curModelShape.hasOwnProperty("parent") || curModelShape.parent == -1 || curModelShape.parent == -2) {
//							curModelShape.y1 = -Number(part[i].value);
//							curModelShape.y2 = -Number(part[i].value);
//						} else {
//							var shape = getModelShapeById(newModelShapes, curModelShape.parent);
//							curModelShape.y1 = -(Number(part[i].value) - Number(shape.y1));
//							curModelShape.y2 = -(Number(part[i].value) - Number(shape.y2));
//						}
//					}
				}
					
				
			}
		}
		
	} else if (curModelShape.hasOwnProperty("group")) {
		
//		if (curModelShape.groupShape == "RECTANGLE") {
//			
//			var groupMembers = getAllShapesInAGroup(curModelShape.group);
//			
//			console.log("group members found = ");
//			console.log(groupMembers);
//			
//			var curModelShapeCopy = copyModelShape(curModelShape);
//			
//			curModelShape = modifyGroupShapeByPart(curModelShapeCopy, curModelShape, groupMembers, part, newModelShapes);
//			
//		} else if (curModelShape.groupShape == "LINE") {
//			
//		}
		if (curModelShape.groupShape == "RECTANGLE") {
			var groupMembers = getAllShapesInAGroup(curModelShape.group);
			var curModelShapeCopy = copyModelShape(curModelShape);
			//     could be a rectangle, or Text  or a circle  
			
			curModelShape = modifyGroupShapeByPart(curModelShapeCopy, curModelShape, groupMembers, part, newModelShapes);
		}else if (curModelShape.groupShape == "TEXT"){
			var groupMembers = getAllShapesInAGroup(curModelShape.group);  // return all 3 records for text 
			var curModelShapeCopy = copyModelShape(curModelShape);
			// curModelShapeCopy will have (group, groupShape, id, isConstruction, model, parentChildState, property, shape, x1, y1)
			
			curModelShape = modifyGroupShapeByPart(curModelShapeCopy, curModelShape, groupMembers, part, newModelShapes );
		}else if(curModelShape.groupShape == "LINE"){
			// contour  
			var groupMembers = getAllShapesInAGroup(curModelShape.group);
			var curModelShapeCopy = copyModelShape(curModelShape);
			curModelShape = modifyGroupShapeByPart(curModelShapeCopy, curModelShape, groupMembers, part, newModelShapes);
		}
	}
	return curModelShape;
	
}
//=========================================================================
function copyModelShape(modelShape) {
	// for Text   = (group, groupShape, id, isConstruction, model, parentChildState, property, shape, x1, y1)
	// for Number = (angle, depth,group, groupShape, height, width,id, isConstruction, model, x1, x2, y1, y2, z1, z2,property, shape,parent   )
	
	var shapeCopy = {};
	if (modelShape.hasOwnProperty("angle")) {
		shapeCopy.angle = modelShape.angle;
	}
	
	if (modelShape.hasOwnProperty("depth")) {
		shapeCopy.depth = modelShape.depth;
	}
	
	if (modelShape.hasOwnProperty("group")) {
		shapeCopy.group = modelShape.group;
	}
	
	if (modelShape.hasOwnProperty("groupShape")) {
		shapeCopy.groupShape = modelShape.groupShape;
	}
	
	if (modelShape.hasOwnProperty("height")) {
		shapeCopy.height = modelShape.height;
	}
	
	if (modelShape.hasOwnProperty("width")) {
		shapeCopy.width = modelShape.width;
	}
	
	if (modelShape.hasOwnProperty("id")) {
		shapeCopy.id = modelShape.id;
	}
	if (modelShape.hasOwnProperty("parentChildState")) {
		shapeCopy.parentChildState = modelShape.parentChildState;
	}
	
	
	if (modelShape.hasOwnProperty("isConstruction")) {
		shapeCopy.isConstruction = modelShape.isConstruction;
	}
	
	if (modelShape.hasOwnProperty("model")) {
		shapeCopy.model = modelShape.model;
	}
	
	if (modelShape.hasOwnProperty("x1")) {
		shapeCopy.x1 = modelShape.x1;
	}
	
	if (modelShape.hasOwnProperty("x2")) {
		shapeCopy.x2 = modelShape.x2;
	}
	
	if (modelShape.hasOwnProperty("y1")) {
		shapeCopy.y1 = modelShape.y1;
	}
	
	if (modelShape.hasOwnProperty("y2")) {
		shapeCopy.y2 = modelShape.y2;
	}
	
	if (modelShape.hasOwnProperty("z1")) {
		shapeCopy.z1 = modelShape.z1;
	}
	
	if (modelShape.hasOwnProperty("z2")) {
		shapeCopy.z2 = modelShape.z2;
	}
	
	if (modelShape.hasOwnProperty("property")) {
//		shapeCopy.property = {};
//		if (modelShape.property.hasOwnProperty("createdDate")) {
//			shapeCopy.property.createdDate = modelShape.property.createdDate;
//		}
//		if (modelShape.property.hasOwnProperty("defaultValue")) {
//			shapeCopy.property.defaultValue = modelShape.property.defaultValue;
//		}
//		if (modelShape.property.hasOwnProperty("id")) {
//			shapeCopy.property.id = modelShape.property.id;
//		}
//		if (modelShape.property.hasOwnProperty("maximumValue")) {
//			shapeCopy.property.maximumValue = modelShape.property.maximumValue;
//		}
//		if (modelShape.property.hasOwnProperty("minimumValue")) {
//			shapeCopy.property.minimumValue = modelShape.property.minimumValue;
//		}
//		if (modelShape.property.hasOwnProperty("modelId")) {
//			shapeCopy.property.modelId = modelShape.property.modelId;
//		}
//		if (modelShape.property.hasOwnProperty("modifiedDate")) {
//			shapeCopy.property.modifiedDate = modelShape.property.modifiedDate;
//		}
//		if (modelShape.property.hasOwnProperty("name")) {
//			shapeCopy.property.name = modelShape.property.name;
//		}
//		if (modelShape.property.hasOwnProperty("parentChild")) {
//			shapeCopy.property.parentChild = modelShape.property.parentChild;
//		}
//		if (modelShape.property.hasOwnProperty("propertyPositionType")) {
//			shapeCopy.property.propertyPositionType = modelShape.property.propertyPositionType;
//		}
//		if (modelShape.property.hasOwnProperty("propertyType")) {
//			shapeCopy.property.propertyType = modelShape.property.propertyType;
//		}		
		shapeCopy.property = modelShape.property;
		shapeCopy.property.textValue = "";
//		shapeCopy.property = "property";
	}
	
	if (modelShape.hasOwnProperty("shape")) {
		shapeCopy.shape = modelShape.shape;
	}
	
	if (modelShape.hasOwnProperty("parent")) {
		shapeCopy.parent = modelShape.parent;
	}
	
	if (modelShape.hasOwnProperty("shapeType")) {
		shapeCopy.shapeType = modelShape.shapeType;
	} 
	
	return shapeCopy;

}
//========================================================================
function getModelShapeById(modelShapes, id) {
	for (var i = 0; i < modelShapes.length; i++) {
		if (modelShapes[i].id == id) {
			return modelShapes[i];
		}
	}
}


function getAllShapesInAGroup(groupId) {
	if (curModelShapes == null) {
		return null;
	}
	var groupMembers = [];
	for (var i = 0; i < curModelShapes.length; i++) {
		if (curModelShapes[i].hasOwnProperty("group") && curModelShapes[i].group == groupId) {
			groupMembers.push(curModelShapes[i]);
		}
	}
	return groupMembers;
}

function modifyGroupShapeByPart(curModelShapeCopy, curModelShape, groupMembers, part, partShapes) {
	
	var relatedPart = findPartRelated(groupMembers, part);
	
	console.log(relatedPart);
	
	for (var i = 0; i < relatedPart.length; i++) {
		
		var conline = relatedPart[i].conline;
		var partEle = relatedPart[i].part;
		
		if (view3D == 'xy') {
			
			if (true) { // Math.abs(conline.angle - 90) < 0.001
				var conlinePos = getAbsoluteValueOfConstructionLine(curModelShapes, conline.id, "x");
				if (conline.x1 != 0 && (conline.shapeType == 3 || conline.shapeType == 5)) {
					if (Math.abs(curModelShape.x1 - conlinePos) < 0.001) {
						curModelShapeCopy.x1 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "x");
					}
					
					if (Math.abs(curModelShape.x2 - conlinePos) < 0.001) {
						curModelShapeCopy.x2 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "x");
					}
				}
			}
			
			if (true) { // Math.abs(conline.angle) < 0.001
				var conlinePos = getAbsoluteValueOfConstructionLine(curModelShapes, conline.id, "y");
				if (conline.y1 != 0 && (conline.shapeType == 1 || conline.shapeType == 5)) {
					if (Math.abs(curModelShape.y1 - conlinePos) < 0.001) {
						curModelShapeCopy.y1 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "y");
					}
					
					if (Math.abs(curModelShape.y2 - conlinePos) < 0.001) {
						curModelShapeCopy.y2 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "y");
					}
				}
			}
			
		} else if (view3D == 'yz') {
			
			if (true) { // Math.abs(conline.angle - 90) < 0.001
				var conlinePos = getAbsoluteValueOfConstructionLine(curModelShapes, conline.id, "y");
				if (conline.y1 != 0 && (conline.shapeType == 1 || conline.shapeType == 5)) {
					if (Math.abs(curModelShape.y1 - conlinePos) < 0.001) {
						curModelShapeCopy.y1 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "y");
					}
					
					if (Math.abs(curModelShape.y2 - conlinePos) < 0.001) {
						curModelShapeCopy.y2 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "y");
					}
				}
			} 
			
			if (true) { // Math.abs(conline.angle) < 0.001 
				var conlinePos = getAbsoluteValueOfConstructionLine(curModelShapes, conline.id, "z");
				if (conline.z1 != 0 && (conline.shapeType == 1 || conline.shapeType == 3)) {
					if (Math.abs(curModelShape.z1 - conlinePos) < 0.001) {
						curModelShapeCopy.z1 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "z");
					}
					
					if (Math.abs(curModelShape.z2 - conlinePos) < 0.001) {
						curModelShapeCopy.z2 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "z");
					}	
				}
			}
			
		} else if (view3D == 'xz') {
			
			if (true) { // Math.abs(conline.angle - 90) < 0.001
				var conlinePos = getAbsoluteValueOfConstructionLine(curModelShapes, conline.id, "x");
				if (conline.x1 != 0 && (conline.shapeType == 3 || conline.shapeType == 5)) {
					if (Math.abs(curModelShape.x1 - conlinePos) < 0.001) {
						curModelShapeCopy.x1 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "x");
					}
					
					if (Math.abs(curModelShape.x2 - conlinePos) < 0.001) {
						curModelShapeCopy.x2 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "x");
					}	
				}	
			}
			
			if (true) { // Math.abs(conline.angle) < 0.001
				var conlinePos = getAbsoluteValueOfConstructionLine(curModelShapes, conline.id, "z");
				if (conline.z1 != 0 && (conline.shapeType == 1 || conline.shapeType == 3)) {
					if (Math.abs(curModelShape.z1 - conlinePos) < 0.001) {
						curModelShapeCopy.z1 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "z");
					}
					
					if (Math.abs(curModelShape.z2 - conlinePos) < 0.001) {
						curModelShapeCopy.z2 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "z");
					}
				}
			}
			
		}
			
//		if (view3D == 'xy') {
//			
//			if (conline.shapeType == 3) { // Math.abs(conline.angle - 90) < 0.001 // conline.x1 != 0
//				
//				var conlinePos = getAbsoluteValueOfConstructionLine(curModelShapes, conline.id, "x");
//				
//				if (Math.abs(curModelShape.x1 - conlinePos) < 0.001) {
//					curModelShapeCopy.x1 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "x");
//				}
//				
//				if (Math.abs(curModelShape.x2 - conlinePos) < 0.001) {
//					curModelShapeCopy.x2 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "x");
//				}
//				
//			} else if (conline.shapeType == 1) { // Math.abs(conline.angle) < 0.001 // conline.y1 != 0
//				
//				var conlinePos = getAbsoluteValueOfConstructionLine(curModelShapes, conline.id, "y");
//				
//				if (Math.abs(curModelShape.y1 - conlinePos) < 0.001) {
//					curModelShapeCopy.y1 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "y");
//				}
//				
//				if (Math.abs(curModelShape.y2 - conlinePos) < 0.001) {
//					curModelShapeCopy.y2 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "y");
//				}
//				
//			}
//		} else if (view3D == 'yz') {
//			if (conline.shapeType == 5) { // Math.abs(conline.angle - 90) < 0.001 // conline.y1 != 0
//				
//				var conlinePos = getAbsoluteValueOfConstructionLine(curModelShapes, conline.id, "y");
//				
//				if (Math.abs(curModelShape.y1 - conlinePos) < 0.001) {
//					curModelShapeCopy.y1 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "y");
//				}
//				
//				if (Math.abs(curModelShape.y2 - conlinePos) < 0.001) {
//					curModelShapeCopy.y2 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "y");
//				}
//				
//			} else if (conline.shapeType == 3) { // Math.abs(conline.angle) < 0.001 // conline.z1 != 0
//				
//				var conlinePos = getAbsoluteValueOfConstructionLine(curModelShapes, conline.id, "z");
//				
//				if (Math.abs(curModelShape.z1 - conlinePos) < 0.001) {
//					curModelShapeCopy.z1 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "z");
//				}
//				
//				if (Math.abs(curModelShape.z2 - conlinePos) < 0.001) {
//					curModelShapeCopy.z2 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "z");
//				}
//				
//			}
//		} else if (view3D == 'xz') {
//			if (conline.shapeType == 5) { // Math.abs(conline.angle - 90) < 0.001 // conline.x1 != 0
//				
//				var conlinePos = getAbsoluteValueOfConstructionLine(curModelShapes, conline.id, "x");
//				
//				if (Math.abs(curModelShape.x1 - conlinePos) < 0.001) {
//					curModelShapeCopy.x1 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "x");
//				}
//				
//				if (Math.abs(curModelShape.x2 - conlinePos) < 0.001) {
//					curModelShapeCopy.x2 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "x");
//				}
//				
//			} else if (conline.shapeType == 1) { // Math.abs(conline.angle) < 0.001 // conline.z1 != 0
//				
//				var conlinePos = getAbsoluteValueOfConstructionLine(curModelShapes, conline.id, "z");
//				
//				if (Math.abs(curModelShape.z1 - conlinePos) < 0.001) {
//					curModelShapeCopy.z1 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "z");
//				}
//				
//				if (Math.abs(curModelShape.z2 - conlinePos) < 0.001) {
//					curModelShapeCopy.z2 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "z");
//				}
//				
//			}
//		}
//		if (Math.abs(conline.angle - 90) < 0.001) {
//			
//			var conlinePos = getAbsoluteValueOfConstructionLine(curModelShapes, conline.id, "x");
//			
//			if (Math.abs(curModelShape.x1 - conlinePos) < 0.001) {
//				curModelShapeCopy.x1 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "x");
//			}
//			
//			if (Math.abs(curModelShape.x2 - conlinePos) < 0.001) {
//				curModelShapeCopy.x2 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "x");
//			}
//			
//		} else if (Math.abs(conline.angle) < 0.001) {
//			
//			var conlinePos = getAbsoluteValueOfConstructionLine(curModelShapes, conline.id, "y");
//			
//			if (Math.abs(curModelShape.y1 - conlinePos) < 0.001) {
//				curModelShapeCopy.y1 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "y");
//			}
//			
//			if (Math.abs(curModelShape.y2 - conlinePos) < 0.001) {
//				curModelShapeCopy.y2 = getAbsoluteValueOfConstructionLine(partShapes, conline.id, "y");
//			}
//			
//		}
			
	}
	// change the text value and the position;
    if((curModelShapeCopy.groupShape == "TEXT")&& (!curModelShapeCopy.hasOwnProperty('parent'))&& (curModelShapeCopy.hasOwnProperty('property'))){
    	var propValue= curModelShapeCopy.property;
    	var partPropertyText = findPartTextValue(propValue, part);
    	console.log("Returned property is : "+partPropertyText);
    	curModelShapeCopy.property = partPropertyText;
    }
	return curModelShapeCopy;
	
}
function findPartTextValue(propValue, part){
	if((propValue == null)||(part == null)){
		return null;
	}
	for(var i=0; i< part.length; i++){
		if(propValue.id == part[i].modelPropertyId){
			propValue.textValue = part[i].value;
			return propValue;
		}
	}
	return null;
}




//function isGroupShapeModifiedByPart(groupMembers, part) {
//	
//	var constructionLines = [];
//	
//	for (var i = 0; i < part.length; i++) {
//		var constructionLine = findConstructionLineByPropertyId(part[i].modelPropertyId);
//		
//		if (constructionLine != null) {
//			constructionLines.push(constructionLine);
//		}
//	}
//	
//	for (var i = 0; i < groupMembers.length; i++) {
//		
//		for (var j = 0; j < constructionLines.length; j++) {
//			
//			if (groupMembers[i].parent == constructionLines.id) {
//				return true;
//			}
//		}
//	}
//	
//	return false;
//	
//}


function isNumber(x) {
	   var res = !isNaN(parseFloat(x)) && isFinite(x);
	   return res;
}
//================================================================
function getModelById(modelId) {
	for (var i = 0; i < curModels.length; i++) {
		if (curModels[i].id == modelId) {
			return curModels[i];
		}
	}
}


//function displayRectFillInPart(rect_tmp, parents, shapeIds, groupId, eleId) {
//	
//	console.log("Inside display rect fill in Part View");
//	
//	var x, y;
//	
//	if (rect_tmp[0] < rect_tmp[1]) {
//		x = rect_tmp[0];
//	} else {
//		x = rect_tmp[1];
//	}
//	
//	if (rect_tmp[2] < rect_tmp[3]) {
//		y = rect_tmp[2];
//	} else {
//		y = rect_tmp[3];
//	}
//	
//	console.log("what is the hell y is " + y);
//	
//	x += 100;  // AL: hard coded two numbers
//	y += 650;
//	
//	var h = Math.abs(rect_tmp[2] - rect_tmp[3]);
//	var w = Math.abs(rect_tmp[0] - rect_tmp[1]);
//	
//	console.log("x = " + x + " y = " + y + " h = " + h + " w = " + w);
//	
//	var canvas = document.getElementById(eleId);
//	
//	rectid = "rcfl_" + rcflNumber;
//	
//	canvas.innerHTML += "<rect id='" + rectid + "' x='" + Number(x) + "' y='" + Number(y) + "' width='" + Number(w) + "' height='" + Number(h) + "' style='fill:"+colorRect+";stroke:blue;stroke-width:2' fill-opacity='0.5' stroke-opacity='0.5'>";
//	
//	rects.push({id:rectid, x:Number(x), y:Number(y), height:Number(h), width:Number(w)});
//	
//	rcflNumber++;
//	
//	return {x:Number(x), y:Number(y), height:Number(h), width:Number(w)};
//}


function getAbsoluteValueOfConstructionLine(modelShapes, id, coor) {
	
	var shape = getModelShapeById(modelShapes, id);
	if (!shape.hasOwnProperty("parent") || shape.parent <= 0) {
		if (coor == "x") {
			return shape.x1;
		} else if (coor == "y") {
			return shape.y1;
		} else if (coor == "z") {
			return shape.z1;
		} else {
			return null;
		}
	}
	
	var parentLine = getModelShapeById(modelShapes, shape.parent);
	if (coor == "x") {
		return shape.x1 + getAbsoluteValueOfConstructionLine(modelShapes, parentLine.id, "x");
	} else if (coor == "y") {
		return shape.y1 + getAbsoluteValueOfConstructionLine(modelShapes, parentLine.id, "y");
	} else if (coor == "z") {
		return shape.z1 + getAbsoluteValueOfConstructionLine(modelShapes, parentLine.id, "z");
	} else {
		return null;
	}
}


//================================== Used to change the row when editting ========================




//========================================================================
function switchPhysicalViewStatus(view) {

	if (view == "physical_design") {
		isPartView = false;
	} else if (view == "part_view") {
		isPartView = true;
	}
	
}

function showAddPhysicalInstDialog() {
	
	var dlg_width = 400, dlg_height = 50, dlg_offset_x = 300, dlg_margin_top = 300;
	var dialog = $('#dialog');
	
	dialog.dialog({
		width : dlg_width,
		autoOpen : false,
		position : {
			my : "center center",
			at : "center center",
			of : "#gvTabContent"
		},
		buttons : {
			"Add Physical Instance" : function() {
				
				// add new physical instance
				// need an api to store data into neo4j
				viewPartInDisplay(dialog.find("form"));
			},
			Cancel : function() {
				dialog.dialog("close");
			}
		}
	});
	
	if (!hasMoved && dialog.dialog("instance")) {
		grayOut(true);
		
		var formHeader = "<form id='add_new_model'>", inputs = "";
		
		// Name field
		inputs += "<label>Name: <input type='text' name='name' required/></label><br />";
		
		// load all models and parts first
//		loadAllModelsAndParts();
		
		// select model and parts
		// change the current selection info
		
		 
		// <!-- Allow form submission with keyboard without duplicating the dialog button -->
		var formFooter = "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px;' />";

		dialog.dialog("option", "title", "Add Model");
		dialog[0].innerHTML = formHeader + inputs + formFooter;
		dialog.dialog("open");
	}

    dialog.find("form").on("submit", function(event) {
    	event.preventDefault();
    	viewPartInDisplay(this);
    });

}



