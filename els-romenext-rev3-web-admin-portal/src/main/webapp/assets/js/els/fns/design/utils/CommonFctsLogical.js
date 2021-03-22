/**
 * 
 */
function CommonFctsLogical() {

};

	CommonFctsLogical.toggleTypeName = function() {
		if (tdvCy) {
			var element = document.getElementById("node_captions");
			var state = element.getAttribute("data-state");
	
			if (state == "hide") {
				// show text on node
				changeElementName(tdvCy, "node", 'data(cyDisplay)');
				document.getElementById("node_captions").className = "btn btn-primary";
				document.getElementById("node_captions").innerHTML = "ON";
				document.getElementById("node_captions").setAttribute("data-state","show");
			} else if (state == "show") {
						
				tdvCy.style().selector('node[classification != "link"]').style('content', "" ).update();
				document.getElementById("node_captions").className = "btn btn-default active";
				document.getElementById("node_captions").innerHTML = "OFF";
				document.getElementById("node_captions").setAttribute("data-state",	"hide");
			} else {
				console.log("Inknown state");
			}
		} else {
			document.getElementById("node_captions").className = "btn btn-default";
			document.getElementById("node_captions").innerHTML = "OFF";
			document.getElementById("node_captions").setAttribute("data-state",	"hide");
		}
	}
	CommonFctsLogical.toggleLabelPosition = function (){
		if (tdvCy) {
			var element = document.getElementById("label_node_positions");
			var elepos  = element.options[element.selectedIndex].value;
			console.log("value read is "+ elepos);
			if( elepos == 'top'  || elepos == 'center' || elepos == 'bottom'){
				tdvCy.style().selector('node[classification != "link"]').style('text-valign', elepos ).update();
			}else {
				console.log("Position not supported by Cytoscape");
			}			
			
		}
	}
	
	CommonFctsLogical.toggleLabelSize = function (){
		if (tdvCy) {
			var element = document.getElementById("label_node_size");
			var elesize = element.options[element.selectedIndex].value;
			console.log("value read is "+ elesize);
			if( elesize == '11px'  || elesize == '12px' || elesize == '14px' || elesize == '16px' || elesize == '18px' ){
				tdvCy.style().selector('node[classification != "link"]').style('font-size', elesize ).update();
			}else {
				console.log("Size not supported by Cytoscape");
			}			
			
		}
	}
	
	CommonFctsLogical.toggleConnections = function ( ){
		var pcs;
		if (tdvCy) {
			var element = document.getElementById("connections");
			var state   = element.getAttribute("data-state");
			if (state == "hide"){
				document.getElementById("connections").className = "btn btn-primary";
				document.getElementById("connections").innerHTML = "ON";
				document.getElementById("connections").setAttribute("data-state","show");
	
				pcs = tdvCy.edges().filter("[classification = 'parentchild']");
				for (var j = 0; j < pcs.length; j++) {
					pcs[j].style("display", "element");
				}			
				
			}else if (state == "show") {
				document.getElementById("connections").className = "btn btn-default active";
				document.getElementById("connections").innerHTML = "OFF";
				document.getElementById("connections").setAttribute("data-state","hide");
						
				pcs = tdvCy.edges().filter("[classification = 'parentchild']");
				for (var j = 0; j < pcs.length; j++) {
					pcs[j].style("display", "none");
				}
			}
		}
		
	}

	CommonFctsLogical.toggleLinkMax = function ( ){
	var links;
	if (tdvCy) {
		var element = document.getElementById("link_maxRel");
		var state   = element.getAttribute("data-state");
		if (state == "hide"){
			document.getElementById("link_maxRel").className = "btn btn-primary";
			document.getElementById("link_maxRel").setAttribute("data-state","show");					
			changeElementName(tdvCy, "edge", 'data(maxRel)');
			
		}else if (state == "show") {
			document.getElementById("link_maxRel").className = "btn btn-default active";
			document.getElementById("link_maxRel").setAttribute("data-state","hide");
			changeElementName(tdvCy, "edge", '');		
		}
	}else {
		document.getElementById("link_maxRel").className = "btn btn-default active";
		document.getElementById("link_maxRel").setAttribute("data-state","hide");
	}	
}

	CommonFctsLogical.toggleEdgeName = function() {
	if (tdvCy) {
		var element = document.getElementById("edge_captions");
		var state = element.getAttribute("data-state");

		if (state == "hide") {
			// show text on Edges		
			tdvCy.style().selector('edge').style('content', 'data(name)' ).update();		
			document.getElementById("edge_captions").className = "btn btn-primary ";
			document.getElementById("edge_captions").innerHTML = "ON";
			document.getElementById("edge_captions").setAttribute("data-state","show");
			
		} else if (state == "show") {
			
			tdvCy.style().selector('edge').style('content', '' ).update();
			document.getElementById("edge_captions").className = "btn btn-default active";
			document.getElementById("edge_captions").innerHTML = "OFF";
			document.getElementById("edge_captions").setAttribute("data-state","hide");
			
		} else {
			console.log("Inknown state");
		}
	} else {
		document.getElementById("edge_captions").className = "btn btn-default ";
		document.getElementById("edge_captions").innerHTML = "OFF";
		document.getElementById("edge_captions").setAttribute("data-state",	"hide");
	}
}

	CommonFctsLogical.drawColorbar = function() {

		var divColors = document.getElementById("color_selection");
		var inputs = "";
		inputs += "<li ><b>Color:<b></li>";
		for (var i = 0; i < arrayPreColor.length; i++) {
			inputs += "<li class='tdcolor circleColor' style='background:"
					+ arrayPreColor[i] + "' id='color_" + i
					+ "'  onclick='DesignPrefFctsUtils.changeColor(" + i
					+ ")'></li>";
		}
		divColors.innerHTML = inputs;
	}

	CommonFctsLogical.drawSizebar = function() {

	var divSizes = document.getElementById("size_selection");
	var inputs = "";
	var sizes = [ '20px', '24px', '28px', '32px', '36px', '40px' ];
	inputs += "<li ><b>Size:</b></li>"
	for (var i = 0; i < arrayPreSize.length; i++) {
		var radius = sizes[i].slice(0, -2);
		inputs += "<li class='preftd prefSize  typenode' style='width:" + sizes[i]
				+ "; height:" + sizes[i] + ";' id='size_" + i
				+ "'  onclick='DesignPrefFctsUtils.changeSize(" + i
				+ ")'></li>";

	}
	divSizes.innerHTML = inputs;
}

	CommonFctsLogical.UnselectTypes	 = function (  ){
	if( listTypeIds.length >= 1){
		var typesSelected = "[id='" + listTypeIds[0] + "']";
		if( listTypeIds.length > 1 ) {
			for ( var i = 1; i< listTypeIds.length;i++ ){
			   typesSelected += ", [id='" + listTypeIds[i] + "']";
			}
		}
		var allNodes = tdvCy.filter('node');
		allNodes.filter(typesSelected).unselect();
	}
	if( listLinkIds.length >= 1){
		var linksSelected = "[id='rule" + listLinkIds[0] + "']";
		if( listLinkIds.length > 1 ) {
			for ( var i = 1; i< listLinkIds.length;i++ ){
				linksSelected += ", [id='rule" + listLinkIds[i] + "']";
			}
		}
		var allNodes = tdvCy.filter('node');
		allNodes.filter(linksSelected).unselect();
	}
	
}

	CommonFctsLogical.UnselectConnections = function ( ){
	if( listConnIds.length >= 1){
		var connectionsSelected = "[id='connection" + listConnIds[0] + "']";
		if( listConnIds.length > 1 ) {
			for ( var i = 1; i< listConnIds.length;i++ ){
				connectionsSelected += ", [id='rule" + listConnIds[i] + "']";
			}
		}
		var allNodes = tdvCy.filter('edge');
		allNodes.filter(connectionsSelected).unselect();
	}
}

	CommonFctsLogical.openDialogForCreation = function(title, event ) {

		var dialogPosition = [posWin.x, posWin.y];
		console.log(posWin.x + " ----- -----  "+ posWin.y)
		var divObj = $("#create_type");
			
		divObj.dialog({
			autoOpen : false,
			width : 'auto',
			height : 'auto',
			title : title,
			modal : false,
			create : function(event, ui) {
				// Set maxWidth
				$(this).css("maxWidth", "800px");
				$(this).position(dialogPosition);
			},
			close : function(event, ui) {		
				DesignSavingFcts.closingDialog()
			},
			open: function(event, ui ){
				$(this).position(dialogPosition);
			}
	
		});
	
			
		var inputBody = "";
		inputBody = '<div id="typecreateForm"> Hello</div>';
		$("#create_type").empty();
		$("#create_type").append(inputBody);
				
	}

	CommonFctsLogical.findPosition = function( divObj){
	
}

	CommonFctsLogical.HandlingErrorMSG = function(message, type) {
				
		$('#error_message').empty();
		var textFormat = "";
		if (type == "error") {
			textFormat = "<p style='"+style_error+"'>" + message + "</p>";
	
		} else if (type == "success") {
			textFormat = "<p style='"+style_success+"'>" + message + "</p>";
	
		} else if (type == "warning") {
			textFormat = "<p style='"+style_warning+"'>" + message + "</p>";
		} else {
			textFormat = "<p style='"+style_simple+"'>" + message + "</p>";
		}
		$('#error_message').append(textFormat);
	}


	

//CommonFctsLogical.displayTypeProperties = function(appendToDiv, type, showTypeInfo, typeDisplayFunction, propertyDisplayFunction) {
//
//	var formHeader = "<table>";
//	var inputs = "";
//
//	if (showTypeInfo == true) {
//		$.each(type, function(key, value) {
//			if (key == 'name') {
//				inputs += "<tr><th>" + key + "</th>";
//				if (value == '') {
//					inputs += "<td>None</td><tr>";
//				} else {
//					inputs += "<td>" + value + "</td><tr>";
//				}
//			} else if (key == 'classification') {
//				inputs += "<tr><th>" + key + ":</th>";
//				inputs += "<td>" + value + "</td><tr>";
//			}
//		});
//	}
//
//	// generate the properties fields
//	var props = type.typeProperties;
//
//	if (props == null || props.length == 0 || $.isEmptyObject(props)) {
//		inputs += "<tr><th colspan='2'> No properties added </th></tr>";
//	} else {
//		inputs += "<tr><th colspan='2' style='background-color: #CDEEDD'>Properties:</th></tr>";
//		inputs += "<tr style='background-color: grey'><th> Name</th><th>Type</th></tr>";
//		$.each(props, function(key, value) {
//			var newInput = CommonFctsLogical.displayTypeProperty(value,
//					propertyDisplayFunction);
//			inputs += newInput;
//		});
//		inputs += "<tr><td><input id='type_prop_detail_button_"
//				+ type.id
//				+ "' type='button' value='Show Details' class='btn btn-primary btn-xs' onclick='showOrHideAllTypePropertiesDetails(\""
//				+ type.id + "\");'/></td></tr>";
//	}
//
//	// build out footer if neccessary
//	var footer = "";
//	footer = "<tr><td><input type='button' value='Add Properties' class='btn btn-primary btn-xs'    onclick='CommonFctsLogical.AddTypeProperties(\""
//			+ type.id + "\");'/></td>";
//	footer += "<td><input type='button' value='Update Type'    class='btn btn-primary btn-xs'    onclick='CommonFctsLogical.showUpdateType(\""
//			+ type.id + "\")'/></td></tr>";
//	footer += "</table>";
//	var form = document.createElement('div');
//
//	form.innerHTML = formHeader + inputs + footer;
//	appendToDiv.empty(); // empty the qtip before adding the new details
//	appendToDiv.append(form);
//};

//CommonFctsLogical.displayTypeProperty = function(property, displayFunction) { 
//	console.log("Inside  CommonFctsLogical.displayTypeProperty   ");
//	var inputs = "";
//
//	if (displayFunction == null) {
//		// generate the properties fields
//		console.log("Generate properties fields ");
//		if (property == null) {
//		} else {
//			if (property.isMandatory == true) {
//				inputs += "<tr><td style='color:red'>" + property.name
//						+ "</td>";
//			} else {
//				inputs += "<tr><td>" + property.name + "</td>";
//			}
//
//			if (property.propertyType == 'STRING') {
//				inputs += "<td>TEXT</td>";
//			} else {
//				inputs += "<td>" + property.propertyType + "</td>";
//			}
//
//			inputs += "</tr>";
//
//			inputs += "<tr><td><table id='type_prop_detail_" + property.id
//					+ "' style='display:none'>";
//			inputs += "<tr><th>Mandatory</th><th>Unique</th></tr>";
//			inputs += "<tr>";
//			inputs += "<td>" + property.isMandatory + "</td>";
//			inputs += "<td>" + property.isUnique + "</td>";
//			inputs += "</tr>";
//
//			inputs += "<tr><th>Min</th><th>Max</th></tr>";
//			inputs += "<tr>";
//			if (property.minValue) {
//				inputs += "<td>" + property.minValue + "</td>";
//			} else {
//				inputs += "<td>...</td>";
//			}
//			;
//			if (property.maxValue) {
//				inputs += "<td>" + property.maxValue + "</td>";
//			} else {
//				inputs += "<td>...</td>";
//			}
//			;
//			inputs += "</tr>";
//
//			inputs += "<tr><th>Default</th></tr>";
//			inputs += "<tr>";
//			if (property.defaultValue) {
//				inputs += "<td style='diaplay:none;'>" + property.defaultValue
//						+ "</td>";
//			} else {
//				inputs += "<td>...</td>";
//			}
//			;
//			inputs += "</tr></table></td><tr>";
//		}
//	} else {
//		return displayFunction(null, property);
//	}
//	return inputs;
//}

//CommonFctsLogical.AddTypeProperties = function(typeId) {
//	// the selected name of the type is saved in the Global variable
//
//	var typeName = typeMapViaId[typeId].name;
//
//	var Form, formHeader, formFooter, newProperty, properties, inputs = '';
//
//	Form = document.createElement('div');
//	formHeader = "<form id='typeProps'  method='post'>";
//
//	inputs += "<div id='typeName'><label>Type Selected: </label>" + typeName
//			+ "<input type='hidden' name='typeid' value='" + typeId
//			+ "'/><input type='hidden' name='typename' value='" + typeName
//			+ "'/></div>";
//	inputs += "<button type='button' class='btn btn-success btn-xs'   onclick='CommonFctsLogical.addProperties()'>Add property</button>";
//
//	formFooter = "<div id='propertiesFields'></div>";
//	formFooter += "<input id='save_type_prop_button' type='button' value='Save properties'  class='btn btn-success btn-xs' onclick='CommonFctsLogical.saveTypeProperties(form)'>";
//	formFooter += "<input type='button' value='Cancel' class='btn btn-success btn-xs' onclick='(new DesignLogicalRenderer()).showTypePropertiesByTypeId("
//			+ typeId + ");'></form>";
//	Form.innerHTML = formHeader + inputs + formFooter;
//
//	$('#typeForm').empty();
//	$('#typeForm').append(Form);
//
//	newProperty = document.createElement('div');
//	properties = "<hr/><table>";
//	properties += "<tr><th>Name & Type:</th><td><input type='text' name='name' size='10' />";
//	properties += "<select name='propertyType' onchange='(new DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>"
//			+ "<option value='STRING'>TEXT</option>"
//			+ "<option value='INTEGER'>INTEGER</option>"
//			+ "<option value='DOUBLE'>DOUBLE</option>"
//			+ "<option value='DATE'>DATE</option>"
//			+ "<option value='BOOLEAN'>BOOLEAN</option>"
//			+ "<option value='FILE'>FILE</option>"
//			+ "<option value='CURRENCY'>CURRENCY</option>"
//			+ "<option value='STATUS'>STATUS</option>"
//			+ "<option value='PARENTVALUE'>PARENTVALUE</option>"
//			+ "<option value='CONCAT'>CONCAT</option>" + "</select></td></tr>";
//
//	properties += "<tr><th> isMandatory: </th><td>";
//	properties += "<input type='checkbox' name='isMandatory'>";
//
//	properties += "</td></tr>";
//	properties += "<tr><th> isUnique: </th><td>";
//	properties += "<input type='checkbox' name='isUnique'>";
//
//	properties += "</td></tr>";
//	properties += "<tr><th>Default Value:</th><td> <input type='text' name='defaultValue' onkeypress='' value='' defaultValue='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></td></tr>";
//	properties += "<tr><th>Max Value:</th><td> <input type='text' name='maxValue' /></td></tr>";
//	properties += "<tr><th>Min Value:</th><td> <input type='text' name='minValue' /></td></tr></table>";
//
//	newProperty.innerHTML = properties;
//
//	document.getElementById('propertiesFields').appendChild(newProperty);
//	if (document.getElementById('propertiesFields').innerHTML != '') {
//		document.getElementById("save_type_prop_button").style.visibility = 'visible';
//	}
//}

//CommonFctsLogical.addProperties = function() {
//	var newProperty = document.createElement('div');
//	var properties = "<hr/><table>";
//	properties += "<tr><th>Name & Type:</th><td><input type='text' name='name' size='10' />";
//	properties += "<select name='propertyType' onchange='(new DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>"
//			+ "<option value='INTEGER'>INTEGER</option>"
//			+ "<option value='DOUBLE'>DOUBLE</option>"
//			+ "<option value='DATE'>DATE</option>"
//			+ "<option value='STRING'>TEXT</option>"
//			+ "<option value='BOOLEAN'>BOOLEAN</option>"
//			+ "<option value='FILE'>FILE</option>"
//			+ "<option value='CURRENCY'>CURRENCY</option>"
//			+ "<option value='STATUS'>STATUS</option>"
//			+ "<option value='PARENTVALUE'>PARENTVALUE</option>"
//			+ "<option value='CONCAT'>CONCAT</option>" + "</select></td></tr>";
//
//	properties += "<tr><th> isMandatory:</th><td>";
//	properties += "<input type='checkbox' name='isMandatory'>";
//	properties += "</td></tr>";
//
//	properties += "<tr><th> isUnique: </th><td>";
//	properties += "<input type='checkbox' name='isUnique'>";
//	properties += "</td></tr>";
//
//	properties += "<tr><th>Default Value:</th><td> <input type='text' name='defaultValue' onkeypress='' value='' defaultValue='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></td></tr>";
//	properties += "<tr><th>Max Value:</th><td> <input type='text' name='maxValue' /></td></tr>";
//	properties += "<tr><th>Min Value:</th><td> <input type='text' name='minValue' /></td></tr></table>";
//
//	newProperty.innerHTML = properties;
//	document.getElementById('propertiesFields').appendChild(newProperty);
//
//}

//CommonFctsLogical.showUpdateType = function() {
//
//	var Form, type, formHeader, formFooter, hasGeo, Props, inputs = '';
//
//	Form = document.createElement('div');
//	type = typeMapViaId[listTypeIds[0]];
//
//	formHeader = "<form id='updateTypeDialog'>";
//
//	inputs += "<table id='typeName'>";
//	inputs += "<tr><td colspan='2'><input type='hidden' name='typeId'  value='"
//			+ type.id + "'></td></tr>";
//	$.each(	type, function(key, value) {
//		if (key == 'id') {
//			inputs += "<tr><th>" + key+ "</th><td><input type='hidden' name ='"+ key + "' value='" + value+ "' /></td></tr>";
//		} else if (key == "name") {
//			inputs += "<tr><th>"+ key+ "</th><td><input type='text' name ='"+ key+ "' value='"+ value+ "'/><input type='hidden' name ='oldName' value='"+ value + "'/></td></tr>";
//		} else if (key == "classification") {
//			inputs += "<tr><th>" + key+ "</th><td><input type='text' name ='"+ key + "' value='" + value+ "'/></td></tr>";
//		} else if (key == 'isRoot') {
//			inputs += "<tr><th>"+ key+ ":</th><td><input type='text' name='isRoot'  value='true'/></td></tr>";
//		}
//	});
//
//	// set value
//	var ownerId = 123;
//	inputs += "<tr><td colspan='2'><input type='text' name='owner' value='"+ ownerId+ "' style='visibility:hidden; position:absolute; top:-100px;' /></td></tr>";
//
//	// ============= Enable Decorators for Type
//	// ==================================
//	// Hard code the id for geo view now
//	hasGeo = false;
//	for (var i = 0; i < type.decorators.length; i++) {
//		if (type.decorators[i] == 4) { // Hard code the id for geo view now
//			hasGeo = true;
//			break;
//		}
//	}
//	inputs += "<tr><td colspan='2'>Geo View&nbsp;&nbsp;<label class=\"switch\"><input id=\"geoActivator\" name=\"geoActivator\" type=\"checkbox\" value=\"4\"";
//	if (hasGeo == true) {
//		inputs += "checked=\"checked\"";
//	}
//	inputs += "><div class=\"slider round\"></div></label><br></td></tr>";
//
//	Props = type.typeProperties;
//	if (Props == null) {
//		inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";
//	} else {
//		inputs += "<tr><th colspan='2' style='background-color: #CDEEDD'> Properties:</th></tr></table>";
//		$.each(	Props,function(key, value2) {
//			inputs += "<table id='propertiesFields'>";
//			$.each(	value2, function(key, value) {
//					if (key == 'id') {
//						inputs += "<input type='hidden' name='propertyId' value='"+ value + "'>";
//					} else if (key == 'name') {
//						inputs += "<tr><th>"+ key+ "</th><td><input type='text' name='name' value='"+ value	+ "'/></td></tr>";
//					} else if (key == 'isMandatory'	|| key == 'isUnique') {
//						inputs += "<tr><th>" + key	+ ":</th>";
//						inputs += "<td><input type='checkbox' name='"+ key + "' ";
//						if (value == true) {
//							inputs += "checked";
//						}
//						inputs += "></td></tr>";
//					} else if (key == 'propertyType') {
//						inputs += "<tr><th>"+ key+ "</th><td><select name='"+ key+ "'><option value='INTEGER' ";
//
//						if (value == "INTEGER") {
//							inputs += "selected='selected'";
//						}
//						inputs += ">INTEGER</option><option value='DOUBLE' ";
//
//						if (value == "DOUBLE") {
//							inputs += "selected='selected'";
//						}
//						inputs += ">DOUBLE</option><option value='DATE' ";
//
//						if (value == "DATE") {
//							inputs += "selected='selected'";
//						}
//						inputs += ">DATE</option><option value='STRING' ";
//
//						if (value == "STRING") {
//							inputs += "selected='selected'";
//						}
//						inputs += ">TEXT</option><option value='BOOLEAN' ";
//
//						if (value == "BOOLEAN") {
//							inputs += "selected='selected'";
//						}
//						inputs += ">BOOLEAN</option><option value='FILE' ";
//
//						if (value == "FILE") {
//							inputs += "selected='selected'";
//						}
//						inputs += ">FILE</option><option value='CURRENCY' ";
//
//						if (value == "CURRENCY") {
//							inputs += "selected='selected'";
//						}
//						inputs += ">CURRENCY</option></select></td></tr>";
//
//					} else {
//						if ((key != 'id') && (key != 'romeDecoPropId') 	&& (key != 'validValues')) {
//							inputs += "<tr><th>"+ key+ "</th><td><input type='text' name='"+ key+ "' value='"+ value+ "'/></td></tr>";
//						}
//					}
//				});
//			inputs += "<tr><td colspan='2'>---------------------------------</td></tr>";
//	});
//	}
//
//	// <!-- Allow form submission with keyboard without duplicating the dialog
//	// button -->
//	formFooter = "<tr><td><input type='button' value='Update Type' class='btn btn-primary btn-xs'   onclick='CommonFctsLogical.saveUpdateTypeByGroup(form)' /></td>";
//	formFooter += "<td><input type='button'  value='Cancel'     class='btn btn-primary btn-xs' onclick='(new DesignLogicalRenderer()).showTypePropertiesByTypeId("
//			+ type.id + ")'></td></tr><table></form>";
//	Form.innerHTML = formHeader + inputs + formFooter;
//
//	$('#typeForm').empty();
//	$('#typeForm').append(Form);
//
//}

//CommonFctsLogical.saveTypeProperties = function(form) {
//
//	var jsonData = {}, typeProperties = [], property = {}, typename, typeId;
//	// Retrieve type fields from form
//	$(form).find('div#typeName').find(':input').each(function(i, field) {
//		jsonData[field.name] = field.value;
//	});
//	// remove typename from JSON
//	typename = jsonData["typename"];
//	typeId = jsonData["typeid"];
//	delete jsonData['typename'];
//	initcolor = typeMap[typename].color;
//	// Retrieve Type properties fields from form
//
//	$(form).find('div#propertiesFields').find('div').each(function(i, propDiv) {
//		$(propDiv).find(':input').each(
//				function(i, field) {
//					if ((field.type != 'submit' && field.type != 'radio')|| field.checked) {
//						if (field.name == 'isMandatory'	|| field.name == 'isUnique') {
//							if (field.checked == true) {
//								property[field.name] = 'true';
//							} else {
//								property[field.name] = 'false';
//							}
//						} else {
//							property[field.name] = field.value;
//						}
//					}
//				});
//		typeProperties.push(property);
//		property = {};
//	});
//	// attach properties to JSON
//	jsonData = typeProperties;
//
//	var successFunction = function(data) {
//
//		tdvCy.filter('node[name="' + data.name + '"]').data(data);
//		console.log("Type Properties create success. data: " + data.name);
//
////		typeMap[data.name] = data; // / update the typeMap && typebar
//		typeMapViaId[data.id] = data;
//
//		(new DesignLogicalRenderer()).initTypeDesignBar(typeMapViaId, 'typelist');
//		$('#typeForm').empty();
////		CommonFctsLogical.displayTypeProperties($('#typeForm'), data, true);
//	};
//
//	var failFunction = function(xhr, status, error) {
//		document.getElementById('typeForm').textContent = "Error Type properties not saved";
//	};
//
//	var apis = new TypePropertyApi();
//	apis.addTypeProperties(typeMapViaId[typeId], jsonData, successFunction, failFunction);
//
//}

//CommonFctsLogical.saveUpdateTypeByGroup = function(form) {
//	var jsonData = {}, typeproperties = [], jsonProperty = {}, decos = [], foundError = false, oldName, typeId, initcolor;
//	var node = {};
//	$(form)
//			.find('table#typeName')
//			.find(':input')
//			.each(
//					function(i, field) {
//						if ((field.type != 'submit') && (field.type != 'radio')
//								|| field.checked && (field.value != 'Cancel')) {
//							if ((field.name == 'id')
//									|| (field.name == 'oldName')
//									|| (field.name == 'name')
//									|| (field.name == 'classification')
//									|| (field.name == 'owner')
//									|| (field.name == 'isRoot')) {
//								if (field.name == 'name' && !field.value) {
//									console.log("Missing Value for type Name.");
//									$('#typeForm')
//											.append(
//													"<br/><p style='color:red'>Missing Value for Type name : ");
//									foundError = true;
//								}
//
//								if (field.name == 'isRoot') {
//									node[field.name] = field.value;
//								} else {
//									node[field.name] = field.value;
//								}
//							}
//						}
//
//						if (field.name == 'geoActivator') {
//							if (document.getElementById('geoActivator').checked == true) {
//								decos.push($(this).val());
//							}
//						}
//
//					});
//
//	typeId = node["id"];
//
//	if (foundError) {
//		return;
//	}
//	// remove original typename to pass as path parameter
//	oldName = node["oldName"];
//	if (typeMapViaId[typeId].decorators) {
//		jsonData["decorators"] = typeMapViaId[typeId].decorators;
//	}
//
//	delete node['oldName'];
//	// ADD VALIDATION HERE
//	$(form).find('table#propertiesFields').each(
//			function(i, propDiv) {
//				$(propDiv).find(':input').each(
//						function(i, field) {
//							if (field.type != 'submit'
//									&& field.type != 'button'
//									&& field.value != 'Cancel') {
//
//								if ((field.name == 'propertyType')
//										&& (field.value == 'TEXT')) {
//									jsonProperty[field.name] = 'STRING';
//								} else {
//									if (field.name == 'isMandatory'
//											|| field.name == 'isUnique') {
//										if (field.checked == true) {
//											jsonProperty[field.name] = "true";
//										} else {
//											jsonProperty[field.name] = "false";
//										}
//									} else {
//										jsonProperty[field.name] = field.value;
//									}
//								}
//							}
//						});
//				typeproperties.push(jsonProperty);
//				jsonProperty = {};
//			})
//	node.properties = typeproperties;
//
//	jsonData["namespace"] = loggedInUserName;
//	jsonData["grouphost"] = userGroup.host;
//	jsonData["groupname"] = userGroup.name;
//	jsonData["node"] = node;
//
//	console.log(jsonData);
//	var successFunction = function(data) {
//
//		tdvCy.filter('node[name="' + data.name + '"]').data(data);
//		console.log("Type Properties update success. data: " + data.name);
//
//		if (oldName != data.name) {
//			delete typeMap[oldName]; // remove old value
//		}
//		typeMap[data.name] = data; // / update the typeMap && typebar
//		typeMapViaId[data.id] = data; // added the new type map keyed on id
//
//		(new DesignLogicalRenderer()).initTypeDesignBar(typeMapViaId,
//				'typelist');
//
//		$("#typeForm").empty();
//		CommonFctsLogical.displayTypeProperties($('#typeForm'), data, true);
//
//		tdvCy.$('#' + data.id + '').data('name', data.name);
//
//	};
//
//	var failFunction = function(xhr, status, error) {
//		document.getElementById('typeForm').textContent = "Error Type properties not updated";
//		console.log("Error Type properties not updated: " + xhr.responseText);
//	};
//
//	var apis = new TypeApi();
//	apis.saveUpdateTypeByGroup(typeId, jsonData, successFunction, failFunction);
//};

