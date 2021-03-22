/*
 * Desc:	Event handlers/functions for Physical design
 * Author:	Baya Benrachi
 * Date:	23 August  2016
 * Update: 
 */

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$ List of Functions      $$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//     1 displayPartInfo(parts, isCanvasRefreshed)   would display the list of parts in a table and attach click to the row to display the drawn part at the bottom
//     2 addNewPart(partProperties)                  Given partproperties values will save this in a DB
//
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//================================================================================
function displayPartInfo(parts, isCanvasRefreshed) {
	//Based on the value of partTodisplay we will display the parts
	
	console.log("Inside the display Part Info");
//	if no parts or no current Model selected   display no Parts
	var partInfo = document.getElementById("part_info");
	partInfo.innerHTML = '';
	if (curModel == null || parts.length == 0) {                                // curModel is an id
		partInfo.innerHTML = "<tr><td>No Parts Yet!</td></tr>";
	}
//	 else retrieve all Model shapes related to current Model id
	getModelShapes(curModel);                                             // this will set the global variable     curModelShapes
	var properties = retrieveModelProperties(curModelShapes);             // retrieve the model properties assigned to the shapes !!!!!!!!!
//	curModelProperties = properties;  
	var output = '';
//	display the names of properties for this model 
	var parentChild = null;
    if (physicalModelView == 'parent') {
    	parentChild = 1
    } else if (physicalModelView == 'child') {
    	parentChild = 3
    }
	
	
	if( properties.length != 0){
		output = "<tr><th>Names</th>";
		for (var i = 0; i < properties.length; i++) {
			if (properties[i].parentChild == parentChild) {
			              output += "<th>" + properties[i].name + "</th>";
			}
		}
		output += "<th colspan='2'>Action</th></tr>";
		
//		display the default Model  values
		output += "<tr id='part_info_99' onclick='viewPart(\"99\")'><td>Default Part</td>";
		for (var j = 0; j < properties.length; j++) {
			if (properties[j].parentChild == parentChild) {
			  if(properties[j].propertyType != 13 ) {output += "<td>" + Math.round(properties[j].defaultValue) + "</td>";}
			  else { output += "<td>" + properties[j].defaultValue + "</td>";  }
			}
		}
		output += "<td></td></tr>";
		
	

	partInfo.innerHTML = output;                  // this is displayed  in the window.
//	construct the list of parts of the model 
	var partsGroup = groupParts(parts);

	var lg = partsGroup.length;
	for (var i = 0; i < partsGroup.length; i++) {
		output = "<tr id='part_info_" + i + "' onclick='viewPart(" + i + ")'><td  name='" + partsGroup[i][0].name + "' > " + partsGroup[i][0].name + "</td>";
		for (var j = 0; j < properties.length; j++) {
			var customizedVal = getCustomizedVal(properties[j], partsGroup[i]);
			if (customizedVal == null) {
				customizedVal = Math.round(properties[j].defaultValue);
			}
			output += "<td id='"+properties[j].id+"' name='"+ partsGroup[i][0].name+"'>" + customizedVal + "</td>";
		}	
		output += "<td id='part_info_edit_" + i + "'><input id='part_info_button_" + i + "' type='button' value='Edit' onclick='updatePart(" + i + ")'></td>";
		output += "</tr>";
		partInfo.innerHTML += output;
	}
	
	
	
	output = "<tr><td><input type='text' size='10'  name='name'></td>";
	for (var i = 0; i < properties.length; i++) {
		output += "<td><input type='text' size='5' name='" + properties[i].name + "'/></td>";
	}
	output += "<td><input type='button' value='Add' onclick='createNewPart(form)' /></td></tr>";
	partInfo.innerHTML += output;
		
	
	
	attachPartInfoTableClickAction(partsGroup.length);
	}else {
		output = "<tr<td> NO properties associated with this model </td></tr>";
	}
	
	var partViewCanvas = document.getElementById("pdpvsvg");
	if (isCanvasRefreshed) {
		partViewCanvas.innerHTML = "";
	}
	
}
//===================================================================================

function attachPartInfoTableClickAction(rows) {
	console.log("to edit part"+ rows);
	
	for (var pos = 0; pos < rows; pos++) {
		var tdId = "#part_info_edit_" + pos;
		var trId = "#part_info_" + pos;
		var buttonId = "#part_info_button_" + pos; 
		
		$(trId).on('click', tdId ,function() {		
		    $(this).siblings().each(                                                         // gives all <tds> in this <tr>
		        function(){
		        	if ($(this).find('input').length){
		        		$(this).text($(this).find('input').val());
		        		console.log("change to table");
		        	} else {
		        		var t = $(this).text();                                              // gets the text in the current td
		        		var id = $(this).attr('id');                                         // gets the attribute id 
		        		var partname = $(this).attr('name');                                      // gets the attribute name
		        		$(this).text('').append($('<input />',{'id' : id ,                   // change the text to an input tag
		        			                                   'name': partname,
		        			                                   'value' : t}).val(t));
		        		console.log("change to input");
		        	}
		        });
		    
		});
		
	}
}




//==================================================================================================
function addNewPart(partProperties) {
	
	console.log("=== Inside add new part====");
	if (curModel == null) {
		return;
	}
	var partName = partProperties[0].value;
	var json_part = '{"modelId":' + curModel + ', "parts": [';
	
	for (var i = 1; i < partProperties.length; i++) {
		var str = '{"modelId":' + curModel + ', "modelPropertyId":' + partProperties[i].id + ', "value": "' + partProperties[i].value + '", "name": "' + partName + '"},';
		json_part += str;
	}
	
	json_part += ']}';
	
	console.log(json_part);
	
	$.ajax({
		type : 'POST',
		url : apiBaseUrl + 'model/part/group',
		dataType : 'json',
		data : json_part,
		contentType : 'application/json',
		cache : false,
		async : false,
		success : function(data) {
			console.log("save part success. : ");
		},
		error : function(xhr, ajaxOptions, error) {
			alert(xhr.status);
			console.log('failed to save the shape : '+ xhr.responseText);
		}
	}).done(function(data) {

		loadPartView();                                                 // this will update the curParts
		resetPartsToDisplay();                                          // Reset the "curParts' based on "physicalModelView" variable value
		
		zoomLevel = 5;
		drawingStat = 0;
		createPVToolBarForPartsView();
		$("#phy_pv_xy_view").removeAttr("disabled");
		$("#phy_pv_yz_view").removeAttr("disabled");
		$("#phy_pv_xz_view").removeAttr("disabled");
		view3D = 'xy';
		document.getElementById('phy_pv_xy_view').style.color = '#42f465';
		document.getElementById('phy_pv_yz_view').style.color = '';
		document.getElementById('phy_pv_xz_view').style.color = '';
		
		// display the newly added parts
		var partsGroup = groupParts(curParts);
		var partShapes = convertPartToShapes(partsGroup[partsGroup.length - 1]);
		displayPartInfo(curParts, true);                               // Display list of parts values
		displayPartShapes(partShapes, "pdpvsvg");                      // Display the shapes for the added part
//		createPVToolBarForPartsView();                                 // update the menu bar
	
		partPos = partsGroup.length - 1;
	});
	
}
//=============================================================================
function convertPartToShapes(part) {
	
	if (part == null || curModel == null) {
		console.log("convert part... but part or curModel is null");
		return;
	}
	if (curModelShapes == null || curModelShapes.length == 0) {
		getModelShapes(curModel);
	}
	
	newModelShapes = [];
	for (var i = 0; i < curModelShapes.length; i++) {
		// construct new model shape from default one
		var shapeCopy = copyModelShape(curModelShapes[i]);
		newModelShapes.push(modifyShapeVal(shapeCopy, part, newModelShapes));
	}
	if (selecteddecorator == 'Physical' && topLevelTab == "instRelViewTab") {
		curModelShapes = [];
	}
	return newModelShapes;
}
//==============================================================================
function createNewPart(form) {
//	Retrieve part values from the added form
	var partProperties = [];
	$(form).find(':input').each(function (i, field) {
		if ((field.type != 'button') && (field.type != 'radio') || field.checked) {
			
			for (var j = 0; j < curModelProperties.length; j++) {
				if (field.name == curModelProperties[j].name) {
					var pName = field.name;
					var pVal = field.value;
					console.log("id= "+curModelProperties[j].id+ "pname = " + pName + "pval = " + pVal);
					partProperties.push({name:pName, value:pVal, id: curModelProperties[j].id});
					continue;
				}
			}
			if (field.name == 'name') {
				partProperties.push({name:"name", value:field.value, id: null});
			}
			
		}
	});
	console.log(partProperties);
	addNewPart(partProperties);
}

//==================================================================
function findPartByPropertyId2(parts, modelPropertyId) {
	for (var i = 0; i < parts.length; i++) {
		if (modelPropertyId == parts[i].modelPropertyId) {
			return parts[i];
		}
	}
	return null;
}
//==================================================================
function findPartByPropertyId(parts, modelProperty) {
	for (var i = 0; i < parts.length; i++) {
		if (modelProperty.id == parts[i].modelPropertyId) {
			return parts[i];
		}
	}
	return null;
}
//================================================================  //    Assumption for findConstructionLineByPropertyId will find only one construction line associated to that propertyId in the model shapes
function findPartRelated(groupMembers, part) {                           // this is true if the property is a Number
	var partList = [];
	for (var i = 0; i < part.length; i++) {
		var constructionLine = findConstructionLineByPropertyId(part[i].modelPropertyId);
		if (constructionLine != null) {
			partList.push({part:part[i], conline:constructionLine});
		}
	}
	
	var res = [];
	for (var i = 0; i < groupMembers.length; i++) {
		for (var j = 0; j < partList.length; j++) {	
			if (groupMembers[i].parent == partList[j].conline.id) {
				res.push(partList[j]);
			}
		}
	}
	return res;	
}

function findConstructionLineByPropertyId(propertyId) {                 // note for the text shape we need to consider the property Text value change
                                                                       // that shapeId is not having a parent????????????????????
	if (curModelShapes == null) {
		return null;
	}
	for (var i = 0; i < curModelShapes.length; i++) {
	if (curModelShapes[i].isConstruction && curModelShapes[i].hasOwnProperty("property") && curModelShapes[i].property.id == propertyId) {  
			return curModelShapes[i];
	      }
	}
	return null;
}





//==========================================================
function groupParts(parts) {	                                  //  this function is based on the order for the parts components  
	console.log("Inside grouping parts from curParts");           // It will not work if propertise are added after a part has been created.
	
	if (parts == null || parts.length == 0) {
		return [];
	}
	
	var endIndicator = null;
	var prevGroupId = parts[0].group;
	
	var results = [];
	var partGroup = [];
	
	for (var i = 0; i < parts.length; i++) {
		
		if (prevGroupId == parts[i].group) {
			partGroup.push(parts[i]);
		} else {
			results.push(partGroup);
			partGroup = [];
			partGroup.push(parts[i]);
			prevGroupId = parts[i].group;
		}
		
		if (i == parts.length - 1) {
			results.push(partGroup);
		}
	}
	return results;
	
}

function hidePartView(){
	
}
//================================================================================
function initPartView(isDisplayed) {               // isDisplayed = true 
	// changes made by baya 
	
	console.log("init part view");
	console.log("Value of isDisplayed = "+isDisplayed );
	
	isPartView = true;
//	if (isDisplayed == null) {                             
//		document.getElementById("pdsv").style.display = "none";                    // already available in switchDeco()
//		document.getElementById("pdpv").style.display = "none";                    // added to switchDeco
//		document.getElementById("grid-types").style.visibility = "hidden";
//		
//	} else 
	if (isDisplayed) {                                                             // after clicking on "View Parts" button        
		document.getElementById("pdsv").style.display = "none";
		document.getElementById("grid-types").style.visibility = "visible";
		document.getElementById("grid-models").style.visibility = "hidden";
		document.getElementById("pdpv").style.display = "block";
		loadPartView();
		partTodisplay = 'parent';      // loading all parts related to the selected model === setting curParts	
		displayPartInfo(curParts, true);
		
		
	} else if (!isDisplayed) {                                     // after clicking from "Home" menu item 
		document.getElementById("pdpv").style.display = "none";
		document.getElementById("pdsv").style.display = "block";
		document.getElementById("grid-types").style.visibility = "visible";
		getModelShapes(curModel);
		
	}
	
}
//==============================================================================================
function loadPartView() {
	
	console.log("Inside retrieval of Parts of model from the DB");
	if (curModel == null) {             // no current Model Id selected  do Nothing !!!!!!!!!!!!!
		return;
	}
	var json_part = '{"modelId":' + curModel + '}';
	
	$.ajax({
		type : 'POST',
		url : apiBaseUrl + 'model/part/bymodel',
		dataType : 'json',
		data : json_part,
		contentType : 'application/json',
		cache : false,
		async : false,
		success : function(data) {
			console.log("load Part view data: successful");
		},
		error : function(xhr, ajaxOptions, error) {
			alert(xhr.status);
			console.log('failed to save the shape : '+ xhr.responseText);
		}
	}).done(function(data) {
		curParts = data.parts;
	});
	
}
//============================================================================
function isModifiedByPart(curModelShape, part) {
	if (!curModelShape.hasOwnProperty("property")) {
		return false;
	}
	for (var i = 0; i < part.length; i++) {
		if (part.modelPropertyId == curModelShape.property.id) {
			return true;
		}
	}
	return false;
}

//==============================================
function savePart(tableRow, pos) {
	console.log("Inside updating  new part ")
	var partName;

	console.log(tableRow);
	var partProperties = [];
	$(tableRow).find(':input').each(function (i, field) {	
		if(field.value != 'Edit') {
			partProperties.push({value:field.value,
				                 name : field.name,
				                 id :  field.id});
		}
	});
	
	console.log(partProperties);
//	console.log(curModelProperties);
	
	var partGroup = groupParts(curParts);  // separating parts into groups.  Get an array of parts
	var parts = partGroup[pos];            // retrieve the part to update.
	        // build this json:     modelID, group, toUpdate [{modelPropertyId, name, value, partId     },{ modelPropertyId, name, value , partId }]
	
//	console.log(partGroup[pos]);
	var json = '{"modelId":' + curModel + ', "group":' + parts[0].group +', "toUpdate":['; 
	
//	partProperties  contains values to be updated and ids
//	parts contains  list of properties making these parts 
	for(var j=1; j<partProperties.length; j++){
		var partRelated = findPartByPropertyId2(parts, partProperties[j].id);
		if(partRelated != null) {
			json += '{"partId" :'+ partRelated.id + ',"name":"'+partProperties[j].name;
			json += '","value":"'+partProperties[j].value   + '", "modelPropertyId":'+partProperties[j].id +'},';}
		else {
//			In case It is a new added property 
			console.log('New Added property');
			json += '{ "name":"'+partProperties[j].name + '","value":"'+partProperties[j].value   + '", "modelPropertyId":'+partProperties[j].id +'},';
		}
	}

	
	json += ']}';
//	console.log("update part, the json is ");
	console.log(json);
	
	$.ajax({
		type : 'PUT',
		url : apiBaseUrl + 'model/part/group',
		dataType : 'json',
		data : json,
		contentType : 'application/json',
		cache : false,
		async : false,
		success : function(data) {
			console.log("update part success. : ");
		},
		error : function(xhr, ajaxOptions, error) {
			alert(xhr.status);
			console.log('failed to save the shape : '+ xhr.responseText);
		}
	}).done(function(data) {
//		console.log(data);
		loadPartView();
		resetPartsToDisplay();
		viewPart(pos);	
	});
	
}
//=======================================================================
function updatePart(pos) {
	console.log("to update part");
	console.log("pos = " + pos);
	var buttonId = "part_info_button_" + pos;
	var button = document.getElementById(buttonId);
	var tableId = "part_info_" + pos;
	var tableRow = document.getElementById(tableId);
	console.log("retrieved table row is: "+tableRow);
	if (button.value == "Edit") {
		button.value = "Save";
	} else {
		button.value = "Edit";
		savePart(tableRow, pos);
	}
}
//====================================================================
function viewPart(pos) {
	zoomLevel = 5;
	drawingStat = 0;
	createPVToolBarForPartsView();

	$("#phy_pv_xy_view").removeAttr("disabled");
	$("#phy_pv_yz_view").removeAttr("disabled");
	$("#phy_pv_xz_view").removeAttr("disabled");
	if (view3D == 'xy') {
		document.getElementById('phy_pv_xy_view').style.color = '#00ccff';
		document.getElementById('phy_pv_yz_view').style.color = '';
		document.getElementById('phy_pv_xz_view').style.color = '';
	} else if (view3D == 'xz') {
		document.getElementById('phy_pv_xy_view').style.color = '';
		document.getElementById('phy_pv_yz_view').style.color = '';
		document.getElementById('phy_pv_xz_view').style.color = '#800080';
	} else if (view3D == 'yz') {
		document.getElementById('phy_pv_xy_view').style.color = '';
		document.getElementById('phy_pv_yz_view').style.color = '#42f465';
		document.getElementById('phy_pv_xz_view').style.color = '';
	} else {
		console.log("Wrong Physical View Name: " + viewChange);
		$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
	}
	
	console.log("==== Inside view part");
	console.log("pos = " + pos);
	if(pos== '99') { 
		console.log('Dislplay Default Part');
//		var modelFound = getModelById(curModel);
		var modelFound = curModelShapes;
		displayPartShapesParent(modelFound,"pdpvsvg" );
		}
	else {
		var partsGroup = groupParts(curParts);
		var partShapes = convertPartToShapes(partsGroup[pos]);
		displayPartShapes(partShapes, "pdpvsvg");
	}
	partPos = pos;
	
}
//======================================================================
function viewPartInDisplay(form) {
	zoomLevel = 5;
	console.log("=========Inside view part in Display=============");
	var partsGroup = groupParts(curParts);
	var partShapes = convertPartToShapes(partsGroup[1]); //TODO hard coded "1"
	displayPartShapes(partShapes, "phy_dspl_view_svg", false);
	$(form).parent().dialog("close");
}

//======================================================================
function getCustomizedVal(property, partsGroup) {
//	console.log(partsGroup);
	for (var i = 0; i < partsGroup.length; i++) {	
		if (property.id == partsGroup[i].modelPropertyId) {
			return partsGroup[i].value;
		}
	}
	return null;
}
//==============================================================================
//==============================================================================

function switchPartDisplay(value){
	var inputs = "";
//	part displayed are from the parent model 
	if(physicalModelView == "parent"){
//		need to display children if any 
		physicalModelView = "child";
//		loadPartView();                           //              load all curParts for the selected model
//		console.log("current parts are :" +curParts);
//		resetPartsToDisplay();                    //              reset curParts based on the  'physicalModelView'  variable
//		displayPartInfo(curParts, true);		  //              display the parts 
		
		 var element = document.getElementById('part_child');
		 element.value = 'parent';
		 element.innerHTML = 'View Parent Parts'
	}else {
		physicalModelView = "parent";
//		loadPartView();                           //              load all curParts for the selected model
//		console.log("current parts are :" +curParts);
//		resetPartsToDisplay();                    //              reset curParts based on the  'physicalModelView'  variable
//		displayPartInfo(curParts, true);		  //              display the parts 
		
		 var element = document.getElementById('part_child');
		 element.value = 'parent';
		 element.innerHTML = 'View Child Parts'
	}
	
	loadPartView();                           //              load all curParts for the selected model
	console.log("current parts are :" +curParts);
	resetPartsToDisplay();                    //              reset curParts based on the  'physicalModelView'  variable
	displayPartInfo(curParts, true);		  //              display the parts 
	
	
	
	
}




























//==================================  OLD CODE ==== CHANGED CODE IS UP ============
//function initPartView(isDisplayed) {               // isDisplayed = true  
//	
//	console.log("init part view");
//	console.log("Value of isDisplayed = "+isDisplayed );
//	
//	isPartView = true;
//	
//	
//	if (isDisplayed == null) {                              // after clicking from "Home" menu item 
//		document.getElementById("pdsv").style.display = "none";
//		document.getElementById("pdpv").style.display = "none";
//		document.getElementById("grid-types").style.visibility = "hidden";
//		
//	} else if (isDisplayed) {                              // after clicking on "View Parts" button        
//		document.getElementById("pdsv").style.display = "none";
//		document.getElementById("grid-types").style.visibility = "hidden";
//		document.getElementById("pdpv").style.display = "block";
//		
//		
//		loadPartView();                                             // loading all parts related to the selected model === setting curParts
//		
//		displayPartInfo(curParts, true);
//		
//	} else if (!isDisplayed) {
//		document.getElementById("pdpv").style.display = "none";
//		document.getElementById("pdsv").style.display = "block";
//		document.getElementById("grid-types").style.visibility = "visible";
//	}
//	
//}
