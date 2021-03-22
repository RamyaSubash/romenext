/*
 * Desc:	Event handlers/functions for TYPE Graph
 * Author:	Baya Benrachi
 * Date:	18 July  2016
 * Update: 
 */
//###############################################################
//                    LIST of FUNCTIONS
//##############################################################
//  1. retrieveModelProperties()             Retrieve Model Properties from parameter Shapes, reset cuModelProperties
//  2. displayModelAllProperties             Display All properties List and Actions(add, update, show, UnAssign, assign)
//  3. addProp                               Display add property row
//  4. createModelProperty                   API call save property, call getModelProperties
//  5. updateShapesWithProp
// =====================    UTILITIES===========================
//  1. showModifier
//  2. buildModifierList
//  3. selectedModifier

//#########   RETRIEVE ALL PROPERTIES  Based on Shapes ###########






//====================================================================== Done By Baya
function displayModelAllProperties(properties){


	var infoEle = document.getElementById("model_info");
	    infoEle.innerHTML = '';
	var model='', rows = '';    
	if(properties != null && properties.length > 0){    
	    model  = "<p style='color:green'>Model Properties:      ";
		model += "<input type='image'  title='Unsassign a property click here' src='/webgui/assets/img/model_icons/unlink.png'    onclick=\"unAssignProperty()\"></p>";
	    model += "<table class='table table-reponsive table-condensed table-hover'><thead class='thead-inverse'>";
	    model += "<tr><th>Field Name</th><th>type</th> <th>Value</th> <th>Modifier</th><th colspan='3'>Action</th></tr></thead>";
	
	    var parentChild = null;
	    if (physicalModelView == 'parent') {
	    	parentChild = 1
	    } else if (physicalModelView == 'child') {
	    	parentChild = 3
	    }
	    
		for (var i = 0; i < properties.length; i++) {
			if (properties[i].parentChild == parentChild) {
				var modifier;
				if (properties[i].propertyModifierType == 1) {
					modifier = "Relative x";
				} else if (properties[i].propertyModifierType == 3) {
					modifier = "Relative y";
				} else if (properties[i].propertyModifierType == 11) {
					modifier = "Relative z";
				} else if (properties[i].propertyModifierType == 5) {
					modifier = "Absolute x";
				} else if (properties[i].propertyModifierType == 7) {
					modifier = "Absolute y";
				} else if (properties[i].propertyModifierType == 17) {
					modifier = "Absolute z";
				}
				
				var row ='';
				row  = "<tr  id='roweditform_"+properties[i].id+"' class='info'>";
				row  = row + "<td><input id='model_prop_name_" + properties[i].id + "' type='text'  size='10' name='name' value ='"+properties[i].name  +"' autofocus></td>";
				row  = row + "<td><input type='text'  size='10' name='property_type'";
				       if(properties[i].propertyType == 7){row = row + "value = 'Number' disabled /></td> " }
				       else  if(properties[i].propertyType == 13) { row = row + "value='Text' disabled /> </td>"};   
				
//				row  = row + "<td><select id='mpt" + properties[i].id + "' name='property_type' onchange='buildModifierList(this.value, this.id);'><option value='NONE'>Select Type</option><option value='DOUBLE'";
//					if(properties[i].propertyType == 7) { row += "selected";}
//					row  = row + ">Number</option><option value='STRING'";
//					if(properties[i].propertyType == 13) { row += "selected";}
//				row  = row + ">Text</option></select></td>";
				
				row  = row + "<td><input id='model_prop_defaultvalue_" + properties[i].id + "' type='text'  size='10' name='defaultValue' value='";
				 if(properties[i].propertyType == 7){
					 if (properties[i].defaultValue != null ) {row  = row + Math.round(properties[i].defaultValue);}
				 }else { // propertyType   Text
					 row  = row + properties[i].defaultValue ;
					 }
				row  = row + "'></td>";
//				row  = row + "<td><input type='text'  size='5' name='minimum' value='";
//				      if( properties[i].minimumValue != null){row += Math.round(properties[i].minimumValue);}
//				row  = row + "'  disabled></td>";
//				row  = row + "<td><input type='text'  size='5' name='maximum' value='" ;
//					  if(properties[i].maximumValue != null  ) { row += Math.round(properties[i].maximumValue);}
//				row  = row + "'  disabled ></td>";
				
			//	row  = row + "<td>"+selectedModifier(properties[i].propertyModifierType, properties[i].id, properties[i].propertyType)+"</td>";
				
				if (properties[i].propertyModifierType) {
					row  = row + "<td>"+showModifier(properties[i].propertyModifierType, properties[i].propertyType, properties[i].id)+"</td>";
				} else if (properties[i].propertyPositionType) {
					row  = row + "<td>"+showModifier(properties[i].propertyPositionType, properties[i].propertyType, properties[i].id)+"</td>";
				}
//				row  = row + "<td>"+showModifier(properties[i].propertyModifierType, properties[i].propertyType)+"</td>";
//				if(properties[i].propertyModifierType != 13   )
//				{row  = row + "<td><input type='image'  src='/webgui/assets/img/search.png'    onclick=\"viewPropertyOnModel('"+properties[i].id+"')\"></td>";}
//				else { row = row + "<td></td>";}
//				row  = row + "<td><input type='image'  src='/webgui/assets/img/search.png'    onclick=\"viewPropertyOnModel('"+properties[i].id+"')\"></td>";
//				row  = row + "<td><input  type='image'  src='/webgui/assets/img/saveprop.png'  onclick=\"updateModelProperty('"+properties[i].id+"')\"></td>";
//				row  = row + "<td><input  type='image'  src='/webgui/assets/img/link.png'      onclick=\"assignPropertyToShape('"+properties[i].id+"')\"></td>";
							
//				row  = row + "<td><input id='prop_view_"+properties[i].id+"'   type='image'  src='/webgui/assets/img/model_icons/view.png'    onclick=\"viewPropertyOnModel('"+properties[i].id+"')\"></td>";
//				row  = row + "<td><input id='prop_update_"+properties[i].id+"' type='image'  src='/webgui/assets/img/saveprop.png'  onclick=\"updateModelProperty('"+properties[i].id+"')\"></td>";
//				row  = row + "<td><input id='prop_assign_"+properties[i].id+"' type='image'  src='/webgui/assets/img/model_icons/assign.png'      onclick=\"assignPropertyToShape('"+properties[i].id+"')\"></td>";
//				row  = row + "<td><input type='image'  src='/webgui/assets/img/model_icons/unlink.png'    onclick=\"unassignToShape('"+properties[i].id+"')\"></td></tr>";
						
				row  = row + "<td><input id='prop_view_"+properties[i].id+"'   type='image' title='View property on Model'     src='/webgui/assets/img/model_icons/view.png'    onclick=\"viewPropertyOnModel('"+properties[i].id+"')\"></td>";
				row  = row + "<td><input id='prop_update_"+properties[i].id+"' type='image' title=Save property'   src='/webgui/assets/img/saveprop.png'  onclick=\"updateModelProperty('"+properties[i].id+"')\"></td>";
				row  = row + "<td><input id='prop_assign_"+properties[i].id+"' type='image'  title='Assign a property'   src='/webgui/assets/img/model_icons/assign.png'      onclick=\"assignPropertyToShape('"+properties[i].id+"')\"></td>";
				rows = rows + row;
			}

		}
	}else { 
		model =  "<p style='color:grey'>No Model Properties created yet </p>";
		model += "<table class='table table-reponsive table-condensed table-hover'><thead class='thead-inverse'>";
	    model += "<tr><th>Field Name</th><th>type</th> <th>Value</th> <th>Modifier</th><th colspan='3'>Action</th></tr></thead>";
	}
//	rows  += "<tr><td colspan='8'></td</tr>";
	model +=  rows;
	model += "<tr><th colspan='7'> Adding property</th></tr>";
	model = model + addProp()+"</table>";
	infoEle.innerHTML = model;
}

//=========================================================================================================
function addProp(){
	var addmodel = '', formheader, formfooter;
	
	formheader = "<tr id='addform'><form id='my-grid-form-add'>";	
	addmodel  += "<td><input type='text'  size='10' name='name' value ='' autofocus></td>";
	addmodel  += "<td><select id='mpt-1' name='property_type' onchange='buildModifierList(this.value, this.id);'><option value='DOUBLE'>Number</option><option value='STRING'>Text</option></select></td>";
	addmodel  += "<td><input type='text'  size='10' name='defaultvalue'/></td>";  
//	addmodel  += "<td><input type='text'  size='5' name='minimum' /></td>";
//	addmodel  += "<td><input type='text'  size='5' name='maximum'/></td>";
	addmodel  += "<td>"+selectedModifier(0, -1, 7)+"</td>";	
	formfooter = "<td><input type='button' class='btn btn-primary btn-xs' value='Add' onclick='createModelProperty(this)'></td>"
	formfooter += "<td></td></form></tr>";
	
	return formheader + addmodel + formfooter;
	
}
//###################################################################################
//creating a model property without assign to shape ------ New done by Baya
// Deprecated
function createModelProperty(form) {
	var typeId = findTypeIdByName(curType);
	if (selectedMetaData == null || typeId == null) {
		return;
	}
	
	var propertyName, propertyType, parentChild, minimum ='', maximum='', defaultValue='';
	var modifier = null;
	var position = null;
	
	$('tr#addform').find(':input').each(function (i, field) {
		if ((field.type != 'submit') && (field.type != 'radio') || field.checked) {
			if (field.name == 'name') {
				propertyName = field.value;
			}
//			if (field.name == 'minimum') {
//				minimum = field.value;
//			}
//			if (field.name == 'maximum') {
//				maximum = field.value;
//			}
			if(field.name == 'defaultvalue'){
				defaultValue = field.value;
			}
			if (field.name == 'property_type') {
				propertyType = field.value;
				
			}
			if (field.name == "modifier") {
				modifier = field.value;
			}
			if (field.name == "position") {
				position = field.value;
			}
		}
	});

	console.log(" value of  physicalModelView  "+ physicalModelView);
	
    var parentChild = null;
    if (physicalModelView == 'parent') {
    	parentChild = 1
    } else if (physicalModelView == 'child') {
    	parentChild = 3
    }
    console.log(" physicalModelView = "+ physicalModelView+ " parentChild  "+ parentChild);
//	parentChild = 1; //TODO: AL: because the parent-child option had been removed from the add-model-property form, just hard coded for now.

	
	// no shape is assigned yet
	// changed to accept only name and propetyType  --------------- as per JP request
//	if((defaultValue) && (maximum) && (minimum) && (propertyType != '')){
	if((propertyType != '')){	
		var json_addModel = '{"modelId": ' + curModel + ', "name": "' + propertyName + '", "propertyType":"' + propertyType + '", "parentChild":' + parentChild;
		json_addModel += ', "defaultValue":"'+defaultValue +'", "minimumValue":"' + minimum + '", "maximumValue":"' + maximum ;
		
		if (modifier) {
			json_addModel += '", "propertyModifierType":' + modifier + '}';
		} else if (position) {
			json_addModel += '", "propertyPositionType":' + position + '}';
		} else {
			console.log("No Modifer or Position Found!");
		}
//		json_addModel += '", "propertyModifierType":' + modifier + '}';
		
		console.log("try to add model" +json_addModel );
		
		$.ajax({
			type : 'POST',
			url : apiBaseUrl + 'model/model/property',
			dataType : 'json',
			data : json_addModel,
			contentType : 'application/json',
			cache : false,
			async : false,
			success : function(data) {
				console.log("success to add a model");
			},
			error : function(xhr, ajaxOptions, error) {
				$('#console-log').append("<p style='color:red'> failed to save model property :"+xhr.status+"</p>");
				console.log('failed to save the model property : '+ xhr.responseText);
			}
		}).done(function(data) {
			console.log("what we need to do after adding a new model property?");
			console.log("curModel = " + curModel);
			$('#model_info').empty();
			
			getModelProperties(curModel);
			
		});
	}else { console.log("One of your values are not defined ");}
}

//=============================================================================
function updateShapesWithProp(shape, propId) {	
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
	
	var prop = null;
	for (var i = 0; i < curModelProperties.length; i++) {
		if (curModelProperties[i].id == propId) {
			if (curModelProperties[i].propertyModifierType) {
				prop = {id:curModelProperties[i].id, defaultValue:curModelProperties[i].defaultValue, propertyType:curModelProperties[i].propertyType, propertyModifierType:curModelProperties[i].propertyModifierType};
			} else if (curModelProperties[i].propertyPositionType) {
				prop = {id:curModelProperties[i].id, defaultValue:curModelProperties[i].defaultValue, propertyType:curModelProperties[i].propertyType, propertyPositionType:curModelProperties[i].propertyPositionType};
			} else {
				console.log("No Modifier or Position Found!");
			}
//			prop = {id:curModelProperties[i].id, defaultValue:curModelProperties[i].defaultValue, propertyType:curModelProperties[i].propertyType, propertyModifierType:curModelProperties[i].propertyModifierType};
		    break; //  should we stop if we found the property
		}
	}
	
	var shapeParent = null;
	if (shape.type == 'vertical') {
		shapeParent = getVerticalElementByUid(shape.parent, true);
	} else {
		shapeParent = getHorizontalElementByUid(shape.parent, true);
	}
	
	if (prop.propertyType == 7) {	
		if (shape.type == 'vertical') {
			elementFound.push({type: 'verticalLine', id: shape.id, uid: shape.uid, parent: shape.parent, relpos: getVerticalRelativePosition(shape), val: shape.value});
			elementFound = elementFound.concat(getAllChildrenVerticalLines(elementFound));
		} else {
			elementFound.push({type: 'horizontalLine', id: shape.id, uid: shape.uid, parent: shape.parent, relpos: getHorizontalRelativePosition(shape), val: shape.value});
			elementFound = elementFound.concat(getAllChildrenHorizontalLines(elementFound));
		}
		findAllGroupShapesAssociated();
		
		var newShapeVal = null
		
		if (view3D == 'xy') {
			if (prop.propertyModifierType == 1) {
				newShapeVal = shapeParent.val + Number(prop.defaultValue);
			} else if(prop.propertyModifierType == 3) {
				newShapeVal = shapeParent.val - Number(prop.defaultValue);
			} else if(prop.propertyModifierType == 5) {
				newShapeVal = 100 + Number(prop.defaultValue);
			} else if(prop.propertyModifierType == 7) {
				newShapeVal = 650 - Number(prop.defaultValue);
			} else {
				console.log("Wrong Number Modifier Type!");
			}
		} else if (view3D == 'yz') {
			if (prop.propertyModifierType == 3) {
				newShapeVal = shapeParent.val + Number(prop.defaultValue);
			} else if(prop.propertyModifierType == 11) {
				newShapeVal = shapeParent.val - Number(prop.defaultValue);
			} else if(prop.propertyModifierType == 7) {
				newShapeVal = 100 + Number(prop.defaultValue);
			} else if(prop.propertyModifierType == 17) {
				newShapeVal = 650 - Number(prop.defaultValue);
			} else {
				console.log("Wrong Number Modifier Type!");
			}
		} else if (view3D == 'xz') {
			if (prop.propertyModifierType == 1) {
				newShapeVal = shapeParent.val + Number(prop.defaultValue);
			} else if(prop.propertyModifierType == 11) {
				newShapeVal = shapeParent.val - Number(prop.defaultValue);
			} else if(prop.propertyModifierType == 5) {
				newShapeVal = 100 + Number(prop.defaultValue);
			} else if(prop.propertyModifierType == 17) {
				newShapeVal = 650 - Number(prop.defaultValue);
			} else {
				console.log("Wrong Number Modifier Type!");
			}
		}
		
		var diffVal = newShapeVal - elementFound[0].val;
		elementFound[0].val = newShapeVal;
		for (var i = 0; i < elementFound.length; i++) {		
			var ele = $('#' + elementFound[i].id);
			if (i > 0) {
				var tmpVal = elementFound[i].val + diffVal; 
				elementFound[i].val = tmpVal;
//				var lineParent = null;
//				if (elementFound[i].type == 'verticalLine') {
//					lineParent = getVerticalElementByUid(elementFound[i].parent, true);
//				} else {
//					lineParent = getHorizontalElementByUid(elementFound[i].parent, true);
//				}
//				
//				if (prop.propertyModifierType == 1) {
//					elementFound[i].val = lineParent.val + Number(prop.defaultValue);
//				} else if(prop.propertyModifierType == 3) {
//					elementFound[i].val = lineParent.val - Number(prop.defaultValue);
//				} else if(prop.propertyModifierType == 5) {
//					elementFound[i].val = 100 + Number(prop.defaultValue);
//				} else if(prop.propertyModifierType == 7) {
//					elementFound[i].val = 650 - Number(prop.defaultValue);
//				} else {
//					console.log("Wrong Number Modifier Type!");
//				}
			}
					
			if (elementFound[i].type == "verticalLine") {				
				ele.attr({x1:elementFound[i].val, x2:elementFound[i].val});
			} else if (elementFound[i].type == "horizontalLine") {
				ele.attr({y1:elementFound[i].val, y2:elementFound[i].val});
			}
		}	
//		adjustElement(event);
	
		redrawCircle();
		var tmpPos, event;
		redrawGroupShapes(tmpPos, event);
		
//		updateShape(event);	
		var bound = document.getElementById("pdsvsvg").getBoundingClientRect();	
		x0 = bound.left;
		y0 = bound.top;
		var json_updateShape;	
		if (elementFound[0].type == "verticalLine") {		
			for (var i = 0; i < elementFound.length; i++) {
				for (var j = 0; j < verticalLines.length; j++) {
					if (verticalLines[j].uid == elementFound[i].uid) {
						verticalLines[j].val = elementFound[i].val; 
					}
				}
//				verticalLines[elementFound[i].sn].val = elementFound[i].val;
			}
			
			if (elementFound[0].parent == -2) {
				var new_x = (elementFound[0].val-Number(verticalLines[0].val)) / zoomLevels[zoomLevel];
				if (view3D == "xy") {
					json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": ' + new_x + ', "y1": 0, "z1": 0, "x2": ' + new_x + ',';
					json_updateShape += '"y2": 0, "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 90}';
				} else if (view3D == "yz") {
					json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": 0, "y1": ' + new_x + ', "z1": 0, "x2": 0,';
					json_updateShape += '"y2": ' + new_x + ', "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 90}';
				} else if (view3D == "xz") {
					json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": ' + new_x + ', "y1": 0, "z1": 0, "x2": ' + new_x + ',';
					json_updateShape += '"y2": 0, "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 90}';
				}
//				json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": ' + new_x + ', "y1": 0, "z1": 0, "x2": ' + new_x + ',';
//				json_updateShape += '"y2": 0, "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 90}';
			} else {
				var new_x = null;
				if (prop.propertyModifierType == 5 || prop.propertyModifierType == 7) {
					new_x = (Number(prop.defaultValue)+Number(verticalLines[0].val)-getVerticalElementByUid(elementFound[0].parent).val) / zoomLevels[zoomLevel];
				} else {
					new_x = (Number(prop.defaultValue)) / zoomLevels[zoomLevel];
				}
//				var new_x = (Number(prop.defaultValue)-100+Number(verticalLines[0].val)) / zoomLevels[zoomLevel];
				if (view3D == "xy") {
					json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": ' + new_x + ', "y1": 0, "z1": 0, "x2": ' + new_x + ',';
					json_updateShape += '"y2": 0, "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 90}';
				} else if (view3D == "yz") {
					json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": 0, "y1": ' + new_x + ', "z1": 0, "x2": 0,';
					json_updateShape += '"y2": ' + new_x + ', "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 90}';
				} else if (view3D == "xz") {
					json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": ' + new_x + ', "y1": 0, "z1": 0, "x2": ' + new_x + ',';
					json_updateShape += '"y2": 0, "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 90}';
				}
//				json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": ' + new_x + ', "y1": 0, "z1": 0, "x2": ' + new_x + ',';
//				json_updateShape += '"y2": 0, "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 90}';
			}
			
//			var new_x = (elementFound[0].val-Number(verticalLines[0].val)) / zoomLevels[zoomLevel];
//			json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": ' + new_x + ', "y1": 0, "z1": 0, "x2": 0,';
//			json_updateShape += '"y2": 0, "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 90}';
		} else if (elementFound[0].type == "horizontalLine") {
			for (var i = 0; i < elementFound.length; i++) {
				for (var j = 0; j < horizontalLines.length; j++) {
					if (horizontalLines[j].uid == elementFound[i].uid) {
						horizontalLines[j].val = elementFound[i].val; 
					}
				}
//				horizontalLines[elementFound[i].sn].val = elementFound[i].val;
			}
			
			if (elementFound[0].parent == -1) {
				var new_y = (elementFound[0].val-Number(horizontalLines[0].val)) / zoomLevels[zoomLevel];
				if (view3D == "xy") {
					json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": 0, "y1": ' + new_y + ', "z1": 0, "x2": 0,';
					json_updateShape += '"y2": ' + new_y + ', "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 0}';
				} else if (view3D == "yz") {
					json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": 0, "y1": 0, "z1": ' + new_y + ', "x2": 0,';
					json_updateShape += '"y2": 0, "z2": ' + new_y + ', "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 0}';
				} else if (view3D == "xz") {
					json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": 0, "y1": 0, "z1": ' + new_y + ', "x2": 0,';
					json_updateShape += '"y2": 0, "z2": ' + new_y + ', "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 0}';
				}
//				json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": 0, "y1": ' + new_y + ', "z1": 0, "x2": 0,';
//				json_updateShape += '"y2": ' + new_y + ', "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 0}';
			} else {
				var new_y = null;
				if (prop.propertyModifierType == 7 || prop.propertyModifierType == 17) {
					new_y = (-Number(prop.defaultValue)-getHorizontalElementByUid(elementFound[0].parent).val+Number(horizontalLines[0].val)) / zoomLevels[zoomLevel];
				} else {
					new_y = (-Number(prop.defaultValue)) / zoomLevels[zoomLevel];
				}
//				var new_y = (-Number(prop.defaultValue)) / zoomLevels[zoomLevel];
				if (view3D == "xy") {
					json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": 0, "y1": ' + new_y + ', "z1": 0, "x2": 0,';
					json_updateShape += '"y2": ' + new_y + ', "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 0}';
				} else if (view3D == "yz") {
					json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": 0, "y1": 0, "z1": ' + new_y + ', "x2": 0,';
					json_updateShape += '"y2": 0, "z2": ' + new_y + ', "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 0}';
				} else if (view3D == "xz") {
					json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": 0, "y1": 0, "z1": ' + new_y + ', "x2": 0,';
					json_updateShape += '"y2": 0, "z2": ' + new_y + ', "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 0}';
				}
//				json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": 0, "y1": ' + new_y + ', "z1": 0, "x2": 0,';
//				json_updateShape += '"y2": ' + new_y + ', "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 0}';
			}
			
//			var new_y = (elementFound[0].val-Number(horizontalLines[0].val)) / zoomLevels[zoomLevel];
//			json_updateShape = '{"shapeId": ' + elementFound[0].uid + ', "modelId":' + curModel + ', "isConstruction": true, "x1": 0, "y1": ' + new_y + ', "z1": 0, "x2": 0,';
//			json_updateShape += '"y2": 0, "z2": 0, "x3": 0, "y3": 0, "z3": 0, "height": 0, "depth": 0, "width": 0, "angle": 0}';
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
			console.log(data);
			elementFound = [];
		});
			
		updateGroupShape();
		updateCircShape();
	} else if (prop.propertyType == 13) {
		var textEle = $('#' + shape.id);
//		var textEle = document.getElemById(shape.id);
		if (prop.propertyPositionType == 1) {
			textEle.attr({'text-anchor':'end'});
			document.getElementById(shape.id).innerHTML = prop.defaultValue;
//			textEle.innerHTML = prop.defaultVale;
		} else if(prop.propertyPositionType == 3) {
			textEle.attr({'text-anchor':'middle'});
			document.getElementById(shape.id).innerHTML = prop.defaultValue;
		} else if(prop.propertyPositionType == 5) {
			textEle.attr({'text-anchor':'start'});
			document.getElementById(shape.id).innerHTML = prop.defaultValue;
		} else {
			console.log("Wrong Text Modifier Type!");
		}
	} 
	else {
		console.log("Wrong Prop Type!");
	}
	
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
}

//==========================================================================
//                    Utilities
//=========================================================================
//######################### Show Selected modifier for Update #################
function showModifier(mod, propType, propId){
	var selectedMod   = "";
	
	if (propType == 7) {
		selectedMod +="<input id='prop_modifier_" + propId + "' type='hidden' name='modifier' value= ";
		if(mod== 1) { selectedMod +="'1' /> Relative x"}
		if(mod== 3) { selectedMod +="'3' /> Relative y"}
		if(mod== 11) { selectedMod +="'11' /> Relative z"}
		if(mod== 5) { selectedMod +="'5' /> Absolute x"}
		if(mod== 7) { selectedMod +="'7' /> Absolute y"}
		if(mod== 17) { selectedMod +="'17' /> Absolute z"}
		
	} else if (propType == 13) {
		selectedMod   = "<select name='position' >";
		selectedMod  += "<option value='1'"; if (mod == 1)  { selectedMod += "selected";};  selectedMod += ">Start</option>";
	    selectedMod  += "<option value='3'"; if (mod == 3)  { selectedMod += "selected";};  selectedMod += ">Middle</option>";
	    selectedMod  += "<option value='5'"; if (mod == 5)  { selectedMod += "selected";};  selectedMod += ">End</option>";
	    selectedMod  += "</select>";	
	} 
	return selectedMod;
}
//======================================================================================================
function buildModifierList(propType, propId) {
	if (propType == 'DOUBLE') {
		document.getElementById('mpm' + propId).innerHTML = "<select name='modifier'><option value='1'>Relative x</option><option value='3'>Relative y</option><option value='11'>Relative z</option>"
															+"<option value='5'>Absolute x</option><option value='7'>Absolute y</option><option value='17'>Absolute z</option></select>";
		document.getElementById('mpm' + propId).setAttribute("name","modifier");
	} else if (propType == 'STRING') {
		document.getElementById('mpm' + propId).innerHTML = "<select name='position'><option value='1'>Start</option><option value='3'>Middle</option><option value='5'>End</option></select>";
		document.getElementById('mpm' + propId).setAttribute("name","position");
	} else {
		console.log('Nothing Selected');
	}
	organizePropModifierList();
}


//######################### Show Selected modifier #################
function selectedModifier(mod, mpId, propType){

	var selectedMod = "";
	
	if (propType == 7) {
		selectedMod  += "<select name='modifier' id='mpmmpt" + mpId + "'>";
	    selectedMod  += "<option value='1'"; if (mod == 1)  { selectedMod += "selected";};  selectedMod += ">Relative x</option>";
	    selectedMod  += "<option value='3'"; if (mod == 3)  { selectedMod += "selected";};  selectedMod += ">Relative y</option>";
	    selectedMod  += "<option value='11'"; if (mod == 11)  { selectedMod += "selected";};  selectedMod += ">Relative z</option>";	    
	    selectedMod  += "<option value='5'"; if (mod == 5)  { selectedMod += "selected";};  selectedMod += ">Absolute x</option>";
	    selectedMod  += "<option value='7'"; if (mod == 7)  { selectedMod += "selected";};  selectedMod += ">Absolute y</option>";
	    selectedMod  += "<option value='17'"; if (mod == 17)  { selectedMod += "selected";};  selectedMod += ">Absolute z</option>";
	    selectedMod  += "</select>";
	} else if (propType == 13) {
		selectedMod  += "<select name='position' id='mpmmpt" + mpId + "'>";
	    selectedMod  += "<option value='1'"; if (mod == 1)  { selectedMod += "selected";};  selectedMod += ">Start</option>";
	    selectedMod  += "<option value='3'"; if (mod == 3)  { selectedMod += "selected";};  selectedMod += ">Middle</option>";
	    selectedMod  += "<option value='5'"; if (mod == 5)  { selectedMod += "selected";};  selectedMod += ">End</option>";
	    selectedMod  += "</select>";
	} 
	
	return selectedMod;
}
//############ USED the ICON TO Create a model property --- Done by ALLen to be changed taken from fns-draw.js
function toEdit() {
	
	if (curModel == null) {
		return;
	}
	
	if (drawingStat == 0) {
		drawingStat = 1;
		shape = "edit";
		changeImage();
	} else if (drawingStat == 1 && shape != "edit") {
		drawingStat = 1;
		shape = "edit";
		changeImage();
	} else {
		drawingStat = 0;
		changeImage();
	}
}

$(function(){
	$("#grid-models").draggable().resizable();
});

function disablePropsForPlanes() {
	
	if (curModelProperties.length != 0) {
		
		for (var i = 0; i < curModelProperties.length; i++) {
			
			if (curModelProperties[i].propertyModifierType) {
				
				document.getElementById('prop_view_'+curModelProperties[i].id).src = img_path + "model_icons/view.png";
				document.getElementById('prop_update_'+curModelProperties[i].id).src = img_path + "saveprop.png";
				document.getElementById('prop_assign_'+curModelProperties[i].id).src = img_path + "model_icons/assign.png";
				
				$("#model_prop_name_"+curModelProperties[i].id).removeAttr("disabled");
				$("#model_prop_defaultvalue_"+curModelProperties[i].id).removeAttr("disabled");
				
				$("#prop_view_"+curModelProperties[i].id).removeAttr("disabled");
				$("#prop_update_"+curModelProperties[i].id).removeAttr("disabled");
				$("#prop_assign_"+curModelProperties[i].id).removeAttr("disabled");
				
				if (view3D == 'xy') {
					if (curModelProperties[i].propertyModifierType == 11 || curModelProperties[i].selectedValue == 17) {
						$("#model_prop_name_"+curModelProperties[i].id).attr('disabled', 'disabled');
						$("#model_prop_defaultvalue_"+curModelProperties[i].id).attr('disabled', 'disabled');
						$("#prop_view_"+curModelProperties[i].id).attr('disabled', 'disabled');
						$("#prop_update_"+curModelProperties[i].id).attr('disabled', 'disabled');
						$("#prop_assign_"+curModelProperties[i].id).attr('disabled', 'disabled');
					}
				} else if (view3D == 'yz') {
					if (curModelProperties[i].propertyModifierType == 1 || curModelProperties[i].selectedValue == 5) {
						$("#model_prop_name_"+curModelProperties[i].id).attr('disabled', 'disabled');
						$("#model_prop_defaultvalue_"+curModelProperties[i].id).attr('disabled', 'disabled');
						$("#prop_view_"+curModelProperties[i].id).attr('disabled', 'disabled');
						$("#prop_update_"+curModelProperties[i].id).attr('disabled', 'disabled');
						$("#prop_assign_"+curModelProperties[i].id).attr('disabled', 'disabled');
					}
				} else if (view3D == 'xz') {
					if (curModelProperties[i].propertyModifierType == 3 || curModelProperties[i].selectedValue == 7) {
						$("#model_prop_name_"+curModelProperties[i].id).attr('disabled', 'disabled');
						$("#model_prop_defaultvalue_"+curModelProperties[i].id).attr('disabled', 'disabled');
						$("#prop_view_"+curModelProperties[i].id).attr('disabled', 'disabled');
						$("#prop_update_"+curModelProperties[i].id).attr('disabled', 'disabled');
						$("#prop_assign_"+curModelProperties[i].id).attr('disabled', 'disabled');
					}
				}
			}
		}
		
	}
}

//############# DISPLAY LIST OF MODEL PROPERTIES ##################  ALLEN Function
//function displayModelProperties(shapes){
//
//    var properties = retrieveModelProperties(shapes);
//	var infoEle = document.getElementById("model_info");
//	    infoEle.innerHTML = '';
//	var model  = "<p>Model Properties</p><table class='table table-reponsive table-condensed table-hover'><thead class='thead-default'>";
//	    model += "<tr ><th>Field Name</th><th>type</th> <th>Value</th> <th>Min</th> <th> Max </th><th>Modifier</th><th>Action></th></tr></thead>";
//	var rows ='';
//	if(properties.length > 0){
//		for (var i = 0; i < properties.length; i++) {
//			var modifier;
//			if (properties[i].propertyModifierType == 1) {
//				modifier = "Relative x";
//			} else if (properties[i].propertyModifierType == 3) {
//				modifier = "Relative y";
//			} else if (properties[i].propertyModifierType == 5) {
//				modifier = "Absolute x";
//			} else if (properties[i].propertyModifierType == 7) {
//				modifier = "Absolute y";
//			}
//			var row ='';
//			row  = "<tr  id='roweditform_"+properties[i].id+"' class='info'><form ><td></td>";	
//			row  = row + "<td><input type='text'  size='10' name='name' value ='"+properties[i].name  +"' autofocus></td>";
//			row  = row + "<td><select id='mpt" + properties[i].id + "' name='property_type' onchange='buildModifierList(this.value, this.id);'><option>Select a Type</option><option value='DOUBLE'>Number</option><option value='STRING'>Text</option></select></td>";
//			row  = row + "<td><input type='text'  size='10' name='' value='"+Math.round(properties[i].defaultValue)+"' autofocus></td>";
//			row  = row + "<td><input type='text'  size='10' name='minimum' value='"+Math.round(properties[i].minimumValue)+"' ></td>";
//			row  = row + "<td><input type='text'  size='10' name='maximum' value='"+Math.round(properties[i].maximumValue)+"' ></td>";
//			row  = row + "<td>"+selectedModifier(properties[i].propertyModifierType, properties[i].id, properties[i].propertyType)+"</td>";
//			row  = row + "<td><input type='button' class='btn btn-info btn-xs'  value='Edit' onclick=\"updateModelProperty('"+properties[i].id+")\"></td>";
//			row  = row + "<td></td></form></tr>";
//			rows = rows + row;
//		}
//	};
//	
//	model +=  rows;
//	
//	model = model + addProp()+"</table>";
//	infoEle.innerHTML = model;
//}
//################ CREATE A MODEL PROPERTY BY SELECTING A CONSTRUCTION LINE #########
//Original created by Allen
//function createNewModelProperty(form) {
//
//console.log("adding new model property");
//console.log(form);
//
//var typeId = findTypeIdByName(curType);
//if (selectedMetaData == null || typeId == null) {
//	return;
//}
//
//var propertyName;
//var propertyType;
//var parentChild;
//var minimum, maximum;
//var modifier;
//
//$(form).find(':input').each(function (i, field) {
//	if ((field.type != 'submit') && (field.type != 'radio') || field.checked) {
//		if (field.name == 'name') {
//			propertyName = field.value;
//		}
//		if (field.name == 'minimum') {
//			minimum = field.value;
//		}
//		if (field.name == 'maximum') {
//			maximum = field.value;
//		}
//		if (field.name == 'parent_child') {
//			parentChild = field.value;
//		}
//		if (field.name == 'property_type') {
//			propertyType = field.value;
//		}
//		if (field.name == "modifier") {
//			modifier = field.value;
//		}
//	}
//});
//
//parentChild = 1; //TODO: AL: because the parent-child option had been removed from the add-model-property form, just hard coded for now.
//
//var defaultValue;
//
//if (selectedLine.type == "vertical") {
//	
//	if (modifier == 1) {
//		var parentLine = findConstructionLineById(selectedLine.parent);
//		defaultValue = selectedLine.value - parentLine.val;
//	} else if (modifier == 5) {
//		defaultValue = selectedLine.value - verticalLines[0].val;
//	}
//	
//} else if (selectedLine.type == "horizontal") {
//	
//	if (modifier == 3) {
//		var parentLine = findConstructionLineById(selectedLine.parent);
//		defaultValue = -(selectedLine.value - parentLine.val);
//	} else if (modifier == 7) {
//		defaultValue = -(selectedLine.value - horizontalLines[0].val);
//	}
//	
//}
//
//defaultValue /= zoomLevels[zoomLevel];
//
//var uid = [];
//
////AL: how the use select a group shape using just one click???
//uid.push(selectedLine.uid);
//
//var uid_list = "[";
//for (var i = 0; i < uid.length; i++) {
//	uid_list += uid[i] + ",";
//}
//uid_list += "]";
//
//var json_addModel = '{"modelId": ' + curModel + ', "name": "' + propertyName + '", "propertyType":"' + propertyType + '", "parentChild":' + parentChild;
//json_addModel += ', "minimumValue":"' + minimum + '", "maximumValue":"' + maximum + '", "defaultValue":"' + defaultValue +'", "shapeIds":' + uid_list;
//json_addModel += ', "propertyModifierType":' + modifier + '}';
//
//console.log("try to add model");
//console.log(json_addModel);
//
//$.ajax({
//	type : 'POST',
//	url : apiBaseUrl + 'model/model/property',
//	dataType : 'json',
//	data : json_addModel,
//	contentType : 'application/json',
//	cache : false,
//	async : false,
//	success : function(data) {
//		console.log("success to add a model");
//	},
//	error : function(xhr, ajaxOptions, error) {
//		alert(xhr.status);
//		console.log('failed to save the shape : '+ xhr.responseText);
//	}
//}).done(function(data) {
//	// TODO: update id in memory
//	console.log("what we need to do after adding a new model?");
////	curModel = data.updatedModel.id;
//	console.log("curModel = " + curModel);
//	$('#model_info').empty();
//	selectedLine = null;
//	updateModelPropertyInfo();
//});
//
////$(form).parent().dialog("close" );
//}

//###########################################################
//function updateModelPropertyInfo() {
//	console.log("get new shapes!!!");
//	if (curModel == null) {
//		return;
//	}
//	$.ajax({
//		type : 'GET',
//		url : apiBaseUrl + 'model/shape/' + curModel,
//		contentType : 'application/json',
//		cache : false,
//		async : false,
//		success : function(data) {
//			console.log("save shape success. data: "+ data.name);
//		},
//		error : function(xhr, ajaxOptions, error) {
//			alert(xhr.status);
//			console.log('failed to save the shape : '+ xhr.responseText);
//		}
//	}).done(function(data) {
//		//  update id in memory
//		console.log("get all shapes");
//		isInitPhysicalDesignView = false;
//		showOrHideModelInfo(true);
//		displayModelAllProperties(data.shapes);
//	});
//}

























