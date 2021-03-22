/**
 * 
 */
//=======================================================================================
//================================== LOADING ALL MODELS==================================
//================================== For selected TYPE ==================================
// Deprecated
function loadModels() {
	console.log("Inside  == loadModels ===   loading shape curent type = " + curType);

	if (curType == null) {
		console.log(" No curType value; no loading for model;")
		return;
	}
	var json_getModel = '{"typeName": "' + curType + '", "repoid": ' + Number(selectedMetaData) + '}'

	
	var doneFunction = function( data ) {
		$('#console-log').append("<p style='color:blue'>loaded models for selected Type:</p>");
		curModels = data.models;
	};
	
	var failFunction = function( xhr, status, error ) {
		$('#console-log').append("<p style='color:red'> failed to load models :"+xhr.status+"</p>");
		console.log('failed to load models : '+ xhr.status);
	};
	
	var apis = new apiRomeNext();
	
	apis.getModels( json_getModel,  doneFunction, failFunction);
		
}
//==============================================================================================
//==============================================================================================
function getModelIdByName(name) {                // Retrieve the ID for a model by its name
	
	for (var i = 0; i < curModels.length; i++) {
		if (curModels[i].name == name) {
			return curModels[i].id;
		}
	}
	return null;
}


//==================================================================================
function getModelProperties(modelId) {
	console.log("Inside get Properties for the model!!!");
	if (modelId == null) {                    // if no model selected  return no Properties
		return;
	}
	var json_modelid = '{"modelId": '+ modelId + '}'; 
	$.ajax({
		type : 'POST',
		url : apiBaseUrl + 'model/model/property/getall/',
		dataType : 'json',
		data : json_modelid,
		contentType : 'application/json',
		cache : false,
		async : false,
		success : function(data) {
//			console.log("Retrieved Model Properties data: "+ data);
			$('#console-log').append("<p style='color:blue'> load model properties :</p>");
		},
		error : function(xhr, ajaxOptions, error) {
			$('#console-log').append("<p style='color:red'> failed to load model properties :"+xhr.status+"</p>");
			console.log('failed to load model properties  '+ xhr.responseText);
		}
	}).done(function(data) {
       curModelProperties = data.properties;                    // needs to update curModelShapes
	   displayModelAllProperties(curModelProperties);
	   disablePropsForPlanes();
	   organizePropModifierList();
	});
}

//#########################################################################################################
//######################################3 This is for Number Type property ################################
function viewPropertyOnModel(propId){
	console.log(" Inside View Property on Current Model: ");
	if ( propId == null) {
		return;
	}
	var img = document.getElementById("prop_view_"+propId);
	// if button was enabled for the same item === disable it
	console.log(" actionImg is: "+actionImg + "previous image is :"+prev_img);
	if(restoreImage('view', propId)){
									resetLineColor();
									drawingStat = 0;
	}else {
			img.src = img_path + "model_icons/view_active.png";
			prev_img = img;
			actionImg ='view';
			var propertyId = Number(propId);
			// get all shapes linked to this property within this model
			var curShapes = curModelShapes;
			var prop;
			var listOfShapes = [];
			for(var i=0; i<curShapes.length; i++){
				if(curShapes[i].hasOwnProperty("property")){
					prop = curShapes[i].property;
					if(prop.id == propertyId){// save this in the list of shapes
						listOfShapes.push(curShapes[i]);
						}
					}
				}
			console.log("List of shapes: "+ listOfShapes);
			resetLineColor();
			if(listOfShapes.length == 0){
				console.log("Property not assigned yet ");
				$('#console-log').append("<p style='color:red'>Nothing to show : Property not assigned yet</p>");
			} else 	highlightPropertyOnModel(listOfShapes);
	}
}
//=======================================================================================================
function highlightPropertyOnModel(listShapes){
	for(var j= 0; j < listShapes.length; j++){
		if(listShapes[j].shape == "LINE"){
			if (listShapes[j].angle == 90 ){ // loop thru to find the shape to color 
				for (var k = 0; k < verticalLines.length; k++) {
				    if(listShapes[j].id == verticalLines[k].uid) {document.getElementById(verticalLines[k].id).style.stroke = "rgb(0, 51, 0)"; break;}
			        }
			}else if(listShapes[j].angle == 0){ // loop thru to find the shape to color
				for (var l = 0; l < horizontalLines.length; l++) {
				    if(listShapes[j].id == horizontalLines[l].uid) {document.getElementById(horizontalLines[l].id).style.stroke = "rgb(0, 51, 0)"; break;}
			}
			}		
		}else if(listShapes[j].shape == "TEXT"){
			for (var i = 0; i < texts.length; i++) {
				 if(listShapes[j].id == texts[i].shapeId){
					var textEle = document.getElementById(texts[i].id);
					textEle.style.fill= "rgb(0, 51, 0)";

//					textEle.style.fill= "green";
					 var TextShapeParent = texts[i].parents;
					 for (var k = 0; k < horizontalLines.length; k++) {
						    if(TextShapeParent[0] == horizontalLines[k].uid) {document.getElementById(horizontalLines[k].id).style.stroke = "rgb(0, 51, 0)";break;}
					        }
					 for (var l = 0; l < verticalLines.length; l++) {
						    if(TextShapeParent[1] == verticalLines[l].uid) {document.getElementById(verticalLines[l].id).style.stroke = "rgb(0, 51, 0)"; break;}
					 }
					
				 }
			}
				
		}
	}	
}
//=======================================================================================================
function resetLineColor(){
	
	for (var i = 0; i < verticalLines.length; i++) {
		
		if (verticalLines[i].uid != -2) {
			
			if (verticalLines[i].plane == "xy") {
				document.getElementById(verticalLines[i].id).style.stroke = "rgb(0,204,255)";
			} else if (verticalLines[i].plane == "yz") {
				document.getElementById(verticalLines[i].id).style.stroke = "rgb(66,244,101)";
			} else if (verticalLines[i].plane == "xz") {
				document.getElementById(verticalLines[i].id).style.stroke = "rgb(128,0,128)";
			}
		}	
//		if(verticalLines[i].uid != -2) document.getElementById(verticalLines[i].id).style.stroke = "rgb(0,204,255)";
	}
	for (var i = 0; i < horizontalLines.length; i++) {
		
		if (horizontalLines[i].uid != -1) {
			
			if (horizontalLines[i].plane == "xy") {
				document.getElementById(verticalLines[i].id).style.stroke = "rgb(0,204,255)";
			} else if (horizontalLines[i].plane == "yz") {
				document.getElementById(verticalLines[i].id).style.stroke = "rgb(66,244,101)";
			} else if (horizontalLines[i].plane == "xz") {
				document.getElementById(verticalLines[i].id).style.stroke = "rgb(128,0,128)";
			}
		}		
//		if(horizontalLines[i].uid != -1) document.getElementById(horizontalLines[i].id).style.stroke = "rgb(0,204,255)";
	}
	for(var k=1; k<texts.length; k++){
		document.getElementById(texts[k].id).style.fill = 'rgb(255,0,0)';
	}
//	for (var i = 0; i < verticalLines.length; i++) {
//		if(verticalLines[i].uid != -2) document.getElementById(verticalLines[i].id).style.stroke = "red";
//	}
//	for (var i = 0; i < horizontalLines.length; i++) {
//		if(horizontalLines[i].uid != -1) document.getElementById(horizontalLines[i].id).style.stroke = "red";
//	}
//	for(var k=1; k<texts.length; k++){
//		document.getElementById(texts[k].id).style.fill = 'red';
//	}
}
//#########################################################################################################
// Deprecated
function updateModelProperty(propId){
	console.log("Inside Update Model Property"+ propId);
	console.log(" actionImg is:   "+actionImg + "previous image is :   "+prev_img);
	if(restoreImage('update', propId)){

	}else {
		var img = document.getElementById("prop_update_"+propId);
		img.src = "/webgui/assets/img/saveprop.png";
		prev_img = img;
		actionImg ='update';
		var typeId = findTypeIdByName(curType);
		if (selectedMetaData == null || typeId == null || propId == null) {
			console.log(" Missing elements for update model properties");
			return;
		}
		var propertyId = Number(propId);
		var propertyName ,propertyType, parentChild, minimum, maximum, defaultValue;
		var modifier = null;
		var position = null;
	 //   Retrieve all info from the table row
		$('tr#roweditform_'+propId).find(':input').each(function (i, field) {
			if ((field.type != 'submit') && (field.type != 'radio') || field.checked) {
				if (field.name == 'name') {
					propertyName = field.value;
				}
				if (field.name == 'minimum') {
					minimum = field.value;
				}
				if (field.name == 'maximum') {
					maximum = field.value;
				}
				if (field.name == 'defaultValue'){
					defaultValue = field.value;
				}
				if (field.name == 'property_type') {
					if( field.value == 'Number' ) {propertyType = "DOUBLE"}
					else {   // field.value == 'Text'
						propertyType = "STRING";
						}
				}
				if (field.name == "modifier") {
					modifier = field.value;
				}
				if (field.name == "position") {
					position = field.value;
				}
			}
		});
		if((propertyType != '')){
			
		    var parentChild = null;
		    if (physicalModelView == 'parent') {
		    	parentChild = 1
		    } else if (physicalModelView == 'child') {
		    	parentChild = 3
		    }	
			// no shape is assigned yet
			var json_updateModel = '{"propertyId":'+propertyId+', "modelId": ' + curModel + ', "name": "' + propertyName + '", "propertyType":"' + propertyType + '", "parentChild":' + parentChild;
			json_updateModel += ',"defaultValue":"'+defaultValue+'", "minimumValue":"' + minimum + '", "maximumValue":"' + maximum ;
			if (modifier) {
				json_updateModel += '", "propertyModifierType":' + modifier + '}';
			} else if (position) {
				json_updateModel += '", "propertyPositionType":' + position + '}';
			} else {
				console.log("No Modifer or Position Found!");
			}
	//		json_updateModel += '", "propertyModifierType":' + modifier + '}';
			
			console.log("try to add model" +json_updateModel );
			
			$.ajax({
				type : 'PUT',
				url : apiBaseUrl + 'model/model/property',
				dataType : 'json',
				data : json_updateModel,
				contentType : 'application/json',
				cache : false,
				success : function(data) {
					console.log("success to update  a model property");
				},
				error : function(xhr, ajaxOptions, error) {
					$('#console-log').append("<p style='color:red'> failed to update  model property :"+xhr.status+"</p>");
					console.log('failed to update the model property : '+ xhr.responseText);
				}
			}).done(function(data) {
				console.log("curModel = " + curModel);
				$('#model_info').empty();
				getModelProperties(curModel);
				
				for (var i = 0; i < curModelShapes.length; i++) {
					if(curModelShapes[i].hasOwnProperty("property")){
					if (curModelShapes[i].property.id == propId) {
						var isVerticalLine = false;
						var foundVLine = null;
						var isHorizontalLine = false;
						var foundHLine = null;
						var isText = false;
						var foundText = null;
						for (var j = 0; j < verticalLines.length; j++) {
							if (verticalLines[j].uid == curModelShapes[i].id) {
								isVerticalLine = true;
								foundVLine = verticalLines[j];
								foundVLine.type = "vertical";
								foundVLine.value = verticalLines[j].val;
							}
						}
						for (var j = 0; j < horizontalLines.length; j++) {
							if (horizontalLines[j].uid == curModelShapes[i].id) {
								isHorizontalLine = true;
								foundHLine = horizontalLines[j];
								foundHLine.type = "horizontal";
								foundHLine.value = horizontalLines[j].val;
							}
						}
						for (var j = 0; j < texts.length; j++) {
							if (texts[j].shapeId == curModelShapes[i].id) {
								isText = true;
								foundText = texts[j];
							}
						}
						
						if (isVerticalLine == true) {
							updateShapesWithProp(foundVLine, propId);
						} else if (isHorizontalLine == true) {
							updateShapesWithProp(foundHLine, propId);
						} else if (isText == true) {
							updateShapesWithProp(foundText, propId);
						}
	//					updateShapesWithPropInOtherPlanes(propId);
					}
					}
				}
			});
		}else { console.log("One of your values are not defined ");}
	}
	
}
//###################################################################################
function unAssignProperty(){
	if(curModelProperties.length == 0 ){console.log("No properties for this model yet ")}  // do not allow this option if no properties
	else {
			drawingStat = 1;
			shape       = "edit";
			unassign = true;
	}
}

//==================================================================================
function findPropertyByShape(shapeId){
	 for(var i=0; i <curModelShapes.length; i++){
		  if (curModelShapes[i].id == shapeId) {
			  if(curModelShapes[i].hasOwnProperty("property")){
				  return curModelShapes[i].property;
			  } else  return null;
			  }
		  }
    return null;
}
//==================================================================================================
function assignPropertyToShape(propId){
	var img = document.getElementById("prop_assign_"+propId);
	console.log(" actionImg is: "+actionImg + "previous image is :"+prev_img);
	if(restoreImage('assign', propId)){
									resetLineColor();
									drawingStat = 0;
	}else {
			img.src = img_path + "model_icons/assign_active.png";
			prev_img = img;
			actionImg ='assign';
			
	        console.log(" Inside the assigne Property to shape, property selected  is:"+propId+" Line selected is : "+ selectedLine);
            propertyId  = Number(propId);
			for(var i=0; i<curModelProperties.length; i++){
				if(curModelProperties[i].id == propId){
					if(curModelProperties[i].propertyType == 13 ){
						console.log('selected Property text is ' +curModelProperties[i].defaultValue );
						propText = true;
						// user select an intersection
					}else { propNumber = true;}
					//  property selected is a Number
					break;
					}
			}
			console.log(" propText is set to " + propText);
			drawingStat = 1;
			shape       = "edit";	
		}
}
//====================================================================================================
function restoreImage(curraction, currId){
	var restoreImg='';
	switch (actionImg){
		case "view":   if(prev_img) {restoreImg = img_path + 'model_icons/view.png';break;}
		case "assign": if(prev_img) {restoreImg= img_path + 'model_icons/assign.png';break;}
		case "update": if(prev_img) {restoreImg = '/webgui/assets/img/saveprop.png';break;}
		default : console.log("error no value for actionImg");break;
	}
	
	if(curraction === actionImg){
		                            if(currId == prev_Id){
		                            	prev_img.src = restoreImg; 
                                        actionImg='';
                                        prev_img=''; 
                                        prev_Id='';
                                        return true;
		                            }else{
		                            	prev_img.src = restoreImg;
		                            	actionImg='';
                                        prev_img=''; 
                                        prev_Id=currId;
		                            	return false;
		                            }
	}else {
		resetLineColor();
		prev_img.src = restoreImg;
		actionImg='';
        prev_img=''; 
        prev_Id=currId;
    	return false;
	}
}
//========================== This is for the Number Property =========================================
//====================================================================================================
//Deprecated
function saveAssignShapeToProperty(){
	console.log("Inside the Save Assign Shape to Property====== selectedLine is  : "+selectedLine );
	var property; var modifier;
	for (var i=0; i< curModelProperties.length; i++){
		if(curModelProperties[i].id == propertyId){
			modifier = curModelProperties[i].propertyModifierType;
			break;
		}
	}
	
	if(selectedLine){
		var accept = false;
		if (view3D == 'xy') {
		    if ((selectedLine.type == "vertical") && (modifier == 1 || modifier == 5)){
		    	accept = true;
		    }
		    if((selectedLine.type == "horizontal") && (modifier == 3 || modifier == 7 )) {
				accept = true ;
		    }
		} else if (view3D == 'yz') {
		    if ((selectedLine.type == "vertical") && (modifier == 3 || modifier == 7)){
		    	accept = true;
		    }
		    if((selectedLine.type == "horizontal") && (modifier == 11 || modifier == 17 )) {
				accept = true ;
		    }
		} else if (view3D == 'xz') {
		    if ((selectedLine.type == "vertical") && (modifier == 1 || modifier == 5)){
		    	accept = true;
		    }
		    if((selectedLine.type == "horizontal") && (modifier == 11 || modifier == 17 )) {
				accept = true ;
		    }
		}
//	    if ((selectedLine.type == "vertical") && (modifier == 1 || modifier == 5)){
//	    	accept = true;
//	    }
//	    if((selectedLine.type == "horizontal") && (modifier == 3 || modifier == 7 )) {
//			  		accept = true ;
//		}
		if( accept ){
				var shapeId = selectedLine.uid;
				var typeId = findTypeIdByName(curType);
				if (selectedMetaData == null || typeId == null || propertyId == null) {
					return;
				}
				var json_assignPropToShape = '{"propertyId":'+propertyId+', "shapeId": ' + shapeId + '}';
				console.log(json_assignPropToShape);	
				
				$.ajax({
					type : 'PUT',
					url : apiBaseUrl + 'model/shape/property',
					dataType : 'json',
					data : json_assignPropToShape,
					contentType : 'application/json',
					cache : false,
					success : function(data) {
						console.log("success to assign  a model property to a shape");
					},
					error : function(xhr, ajaxOptions, error) {
						$('#console-log').append("<p style='color:red'> failed to assign  a property to a shape:"+xhr.status+"</p>");
						console.log('failed to assign  a property to a shape: '+ xhr.responseText);
					}
				}).done(function(data) {
					console.log("curModel = " + curModel);
					$('#model_info').empty();
					getModelProperties(curModel);
					updateShapesWithProp(selectedLine, propertyId);
					shape = '';
					getModelShapes(curModel);
	//				updateShapes(curModel);
				});
						
		}else {
			PlaySound();
			console.log("cannot assign this shape to this property");
			}
	}else {console.log("No line selected");}
	
}
//==================================================================================
// Deprecated
function updateUnAssignProperty(proptype){
	console.log(" Inside the unAssign property from Shape" + proptype );
	var typeId = findTypeIdByName(curType);
	if (selectedMetaData == null || typeId == null ) {
		return;
	}
	var unassignShapeId = null;
	// find which property to unassign 
	if (proptype == 'TEXT') {
		console.log( selectedIntersection  );
		for(var k=0; k< texts.length; k++){
			 if((Math.abs(texts[k].x - selectedIntersection.x) <6)&& (Math.abs(texts[k].y - selectedIntersection.y)<6)){
				 // find the shapeId
				 unassignShapeId = texts[k].shapeId;  // get the shapeId associated to this text
				 break;
			 }
		 }
	}else {
		 // proptype = 'NUMBER'
	     console.log(" UID of Selected line is : "+selectedLine.uid);
		 var property = findPropertyByShape(selectedLine.uid);  // find if shape selected has this property associated
	     if(property != null){
	    	 unassignShapeId = selectedLine.uid;   // get the shapeId of line associated to this property
	     }
	}
	 if( unassignShapeId !=null ){   
	     var json_unassignPropToShape = '{ "shapeId": ' + unassignShapeId + '}';
		 console.log(json_unassignPropToShape);	
			$.ajax({
				type : 'PUT',
				url : apiBaseUrl + 'model/shape/property',
				dataType : 'json',
				data : json_unassignPropToShape,
				contentType : 'application/json',
				cache : false,
				success : function(data) {
					console.log("success to unassign  a model property to a shape");
				},
				error : function(xhr, ajaxOptions, error) {
					$('#console-log').append("<p style='color:red'> failed to assign  a property to a shape:"+xhr.status+"</p>");
					console.log('failed to unassign  a property to a shape: '+ xhr.responseText);
				}
			}).done(function(data) {
				console.log("curModel = " + curModel);
				$('#model_info').empty();
				getModelProperties(curModel);              // update curModelProperties and the display
//				updateShapes(curModel);                    // update  curModelShapes 
				getModelShapes(curModel);
			});     
   
     }else { $('#console-log').append("<p style='color:purple'>No Property found assigned to this shape</p>");
     	
     }
	 unassignShapeId = null;
     unassign = false;
}
//############################# Assign Text property to Text shape #########################
// Deprecated
function saveAssignTextProToTextShape(){
	// selectedIntersection will have the data where the text is 
	// x: verticalLines[i].val, y: horizontalLines[j].val, parent_x: verticalLines[i].uid, parent_y: horizontalLines[j].uid 
	// propText , propertyId
	var shapeId;
	var selectedText = null;
	console.log(" Inside the assign Text property to Text Shape" );
	var typeId = findTypeIdByName(curType);
	if (selectedMetaData == null || typeId == null || propertyId == null) {
		return;
	}
	console.log(selectedIntersection);
	if(propText && selectedIntersection){
		// find the group shape for the selected text
		 for(var k=0; k< texts.length; k++){
			 if((Math.abs(texts[k].x - selectedIntersection.x) <6)&& (Math.abs(texts[k].y - selectedIntersection.y)<6)){
				 // find the group
				 selectedText = texts[k];
				 shapeId = texts[k].shapeId;
				 break;
			 }
		 }

		
		if(shapeId !=null ){
			console.log("shapeId = "+shapeId + " propertyId = "+propertyId);
			var json_assignPropToShape = '{"propertyId":'+propertyId+', "shapeId": ' + shapeId + '}';
			console.log(json_assignPropToShape);	
			propText = false;
			$.ajax({
				type : 'PUT',
				url : apiBaseUrl + 'model/shape/property',
				dataType : 'json',
				data : json_assignPropToShape,
				contentType : 'application/json',
				cache : false,
				success : function(data) {
					console.log("successfully assigned a Text shape to a text property");
				},
				error : function(xhr, ajaxOptions, error) {
					$('#console-log').append("<p style='color:red'> failed to assign  a text property to a Text shape:"+xhr.status+"</p>");
					console.log('failed to assign  a text property to a text shape: '+ xhr.responseText);
				}
			}).done(function(data) {
				console.log("curModel = " + curModel);
				$('#model_info').empty();
				getModelProperties(curModel);
				updateShapesWithProp(selectedText, propertyId);
//				updateShapes(curModel);
				getModelShapes(curModel);
				shape = '';
			});
		}	else { 
			PlaySound();
			console.log("no Text shape created previously");
			}
    }else {
    	PlaySound();
    	console.log("no text property selected or no text shape selected");
    	}
	
	
}


//==================================================================================================//
//SECTION ADDING NEW MODEL & SAVING IT IN DB as well as UPDATE Dropdownmenu for select Model    //
//==================================================================================================//
function addNewModel() {
//	console.log("add new model");
	$("#model_info").empty();
	showAddModelDialog();
}

function showAddModelDialog() {

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
				createNewModel(dialog.find("form"));
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
		 
		// <!-- Allow form submission with keyboard without duplicating the dialog button -->
		var formFooter = "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px;' />";
	
		dialog.dialog("option", "title", "Add Model");
		dialog[0].innerHTML = formHeader + inputs + formFooter;
		dialog.dialog("open");
	}
	
	dialog.find("form").on("submit", function(event) {
		event.preventDefault();
		createNewModel(this);
	});

}
//==================================================================================================
// Deprecated
function createNewModel(form) {

	var typeId = findTypeIdByName(curType);
	if (selectedMetaData == null || typeId == null) {
		return;
	}
	var modelName;
	$(form).find(':input').each(function (i, field) {
		if ((field.type != 'submit') && (field.type != 'radio') || field.checked) {
			if (field.name == 'name') {
				modelName = field.value;
			}
		}
	});
	var json_addModel = '{"repoid": ' + selectedMetaData + ', "typeid": ' + Number(typeId) + ', "name": ' + modelName + '}';
	console.log(json_addModel);
	$.ajax({
		type : 'POST',
		url : apiBaseUrl + 'model/model/',
		dataType : 'json',
		data : json_addModel,
		contentType : 'application/json',
		cache : false,
		success : function(data) {
//			console.log("success to add a model");
			$('#console-log').append(" Successfully added a Model");
		},
		error : function(xhr, ajaxOptions, error) {
			$('#console-log').append("<p style='color:red'> failed to create new model:"+xhr.status+"</p>");
			console.log('failed to create a new model: '+ xhr.responseText);
		}
	}).done(function(data) {
		curModel = data.updatedModel.id;
		console.log("what we need to do after adding a new model?");
		console.log("New model is curModel = " + curModel);
		//   Recreate the menu for select Model
		loadModels()
////		recreateModelDropdownMenu();
//		createPhyTool();
		// display new model shape
		isInitPhysicalDesignView = false;
		curModelShapes = [];
		curModelProperties = null;
		physicalModelView == 'parent';
		reinitPhysicalDesignView();
		refreshShapes();                                            //    added by Baya
		showOrHideModelInfo(true);
		getModelProperties(curModel);
		
		switchPy3DView('bottom(xy)');
		
		var physicalDecoEnabled = false;
		if (curModels.length == 1) {
			for (var i = 0; i < typeMap[curType].decorators.length; i++) {
				if (typeMap[curType].decorators[i] == 2) {
					physicalDecoEnabled = true;
					break;
				}
			}
		}
		if (physicalDecoEnabled == false) {
			typeMap[curType].decorators.push(2);
		}
		
		document.getElementById("grid-models").style.visibility = "visible";
		document.getElementById("model_info").style.display = "";
		
	});
	
	$(form).parent().dialog("close" );

}

//=================================================================================================================
function createModelCopyOptionsBox(view) {

	$("#grid-types").css({'visibility':'visible'});	
	var modelCopyOptions = document.createElement('div');
	options = "<button type=\"button\"  class=\"btn btn-primary\" onclick=\"generatePhysicalParentChildView('" + view + "', true)\">Yes</button>";
	options += "<button type=\"button\" class=\"btn btn-info\"  onclick=\"generatePhysicalParentChildView('" + view + "', false)\">No</button>";
	options += "<button type=\"button\" class=\"btn btn-warning\"  onclick=\"reloadTypeForm()\">Cancel</button>";
	modelCopyOptions.innerHTML = "Do you want to copy your current model shapes to your new view?<br><br>" + options;
	(new DesignLogicalRenderer()).emptyAll();
	$('#typeForm').append(modelCopyOptions);
}



