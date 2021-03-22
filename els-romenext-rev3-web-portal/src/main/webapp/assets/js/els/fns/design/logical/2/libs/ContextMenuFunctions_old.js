/**
 * 
 */
function ContextMenuFunctions_old() {
}

//ContextMenuFunctions_old.displayNodeProperties = function(node, typeId, e) {
//	console.log("===> CALLED Function :  ContextMenuFunctions_old.displayNodeProperties   ");
//	$(".qtip").remove();
//	var qtipDiv = document.createElement('div');
//	qtipDiv.id = 'typeForm';
//	qtipDiv.className = 'block';
//	qtipDiv.innerHTML = "";
//
//	node.qtip({
//		content : {
//			title : {
//				text : typeMapViaId[typeId].name + " Details",
//				button : true
//			},
//			text : function() {
//				var inputs = ContextMenuFunctions_old.displayTypeProperties(typeMapViaId[typeId], true);
//				qtipDiv.innerHTML = "";
//				qtipDiv.append(inputs);
//				if (typeMapViaId[typeId].classification != 'DCT') {
//					if (document.getElementById(typeId)) {
//						document.getElementById(typeId).style.border = "solid red";
//					}
//				}
//				return qtipDiv;
//			}
//		},
//		show : {
//			event : 'cxttap',
//			ready : true,
//		},
//		position : {
//			target : 'mouse',
//			adjust : {
//				method : 'shift',
//				resize : true
//			},
//			viewport : $(window)
//		},
//		style : {
//			classes : 'qtip-blue qtip-tipped',
//			tip : true
//		},
//		//		hide : {
//		//			e : 'click'
//		//		},
//		events : {
//			hide : function(event, api) {
//				$(".qtip").empty();
//			//				if (typeMapViaId[typeId].classification != 'link' && typeMapViaId[typeId].classification != 'DCT') {
//			//					document.getElementById(typeId).style.border = "";
//			//				}
//			//				tdvCy.$("#" + typeId).unselect();
//			//				listTypeIds = [];
//			}
//		}
//	}, e);
//
//}

ContextMenuFunctions_old.displayTypeProperties = function(type, showTypeInfo, typeDisplayFunction, propertyDisplayFunction) {
	console.log("===> CALLED Function :  ContextMenuFunctions_old.displayTypeProperties   ");
	var formHeader = "<table class='table-responsive'>";
	var inputs = "";

	//	if (showTypeInfo == true) {
	//		$.each(type, function(key, value) {
	//			if (key == 'name') {
	//				inputs += "<tr><th>" + key + "</th>";
	//				if (value == '') {
	//					inputs += "<td>None</td><tr>";
	//				} else {
	//					inputs += "<td>" + value + "</td><tr>";
	//				}
	//			}
	//		});
	//	}

	// generate the properties fields
	var props = type.typeProperties;

	if (props == null || props.length == 0 || $.isEmptyObject(props)) {
		inputs += "<tr><th colspan='2'> No properties added </th></tr>";
	} else {
		inputs += "<tr><th colspan='2'  style='background-color: #CDEEDD'>Properties:</th></tr>";

		inputs += "<tr style='background-color: grey'><th> Name</th><th>Type</th></tr>";
		$.each(props, function(key, value) {
			var newInput = ContextMenuFunctions_old.displayTypeProperty(value, propertyDisplayFunction);
			inputs += newInput;
		});
	}
	var footer = "";
	footer = "<tr><td><input type='button' value='ADD PROPERTY' class='btn btn-primary btn-xs'    onclick='ContextMenuFunctions_old.AddTypeProperties(\"" + type.id + "\");'/></td>";
	footer += "<td><input type='button' value='UPDATE TYPE'    class='btn btn-primary btn-xs'    onclick='ContextMenuFunctions_old.showUpdateType(\"" + type.id + "\")'/></td></tr>";
	footer += "</table>";
	var form = document.createElement('div');

	form.innerHTML = formHeader + inputs + footer;
	return form;

};

ContextMenuFunctions_old.showOrHideAllTypePropertiesDetails = function(typeId) {

	var typePropDetailButton = document.getElementById('type_prop_detail_button_' + typeId);
	var propDetailHide = typeMapViaId[typeId].typeProperties

	for (var key in typeMapViaId[typeId].typeProperties) {
		var propId = typeMapViaId[typeId].typeProperties[key].id;
		var typeDetail = 'type_prop_detail_' + propId;
		var propDetailHide = document.getElementById(typeDetail).style.display == "none";
		if (propDetailHide == true) {
			$("#" + typeDetail).show();
		} else {
			$("#" + typeDetail).hide();
		}
	}

	if (propDetailHide == true) {
		typePropDetailButton.value = "HIDE DETAILS";
	} else {
		typePropDetailButton.value = "MORE DETAILS";
	}

}

ContextMenuFunctions_old.displayTypeProperty = function(property, displayFunction) {
	console.log("===> CALLED Function :  ContextMenuFunctions_old.displayTypeProperty   ");
	var inputs = "";
	var nameStyle = "color:black";
	inputs += "<tr>"
	if (property != null) {
		if (property.isMandatory) {
			nameStyle = "color:red";
		}
		inputs += "<td style = " + nameStyle + ">" + property.name + "</td>";
		if (property.propertyType == 'STRING') {
			inputs += "<td>TEXT</td>";
		} else {
			inputs += "<td>" + property.propertyType + "</td>";
		}
		inputs += "</tr>";
	} else {
		inputs += "<td colspan='2'></td></tr>";
	}

	return inputs;
}

ContextMenuFunctions_old.CancelAddTypeProperties = function(typeId) {
	var inputs = ContextMenuFunctions_old.displayTypeProperties(typeMapViaId[typeId], true);
	$("#typeForm").empty();
	$("#typeForm").append(inputs);
}

//================================= QTIP ADD PROPERTIES TO TYPE ==============================================//
ContextMenuFunctions_old.AddTypeProperties = function(typeId) {
	// the selected name of the type is saved in the Global variable

	console.log("===> CALLED Function :  ContextMenuFunctions_old.AddTypeProperties   ");
	var inputs = '';
	var type = typeMapViaId[typeId];
	var Form = document.createElement('div');
	var formHeader = '';
	var formFooter = '';

	formHeader = "<form id='typeProps'  method='post'>";

	inputs += "<div id='typeName'><input type='hidden' name='typeId' value='" + typeId + "'/><input type='hidden' name='typename' value='" + type.name + "'/></div>";
	inputs += "<button type='button' class='btn btn-primary btn-xs'   onclick='ContextMenuFunctions.addProperties()'>ADD PROPERTY</button>";

	formFooter += "<div id='propertiesFields'></div>";
	formFooter += "<input id='save_type_prop_button' type='button' value='SAVE PROPERTIES'  class='btn btn-primary btn-xs' onclick='ContextMenuFunctions_old.saveTypeProperties(form)'>";
	formFooter += "<input type='button' value='CANCEL' class='btn btn-primary btn-xs' onclick='ContextMenuFunctions_old.CancelAddTypeProperties(" + typeId + ");'></form>";

	Form.innerHTML = formHeader + inputs + formFooter;

	$('#typeForm').empty();
	$('#typeForm').append(Form);

	newProperty = document.createElement('div');
	properties = "<hr/><table>";
	properties += "<tr><th>Name & Type:</th><td><input type='text' name='name' autofocus  size='10' />";
	properties += "<select name='propertyType' onchange='(new DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>"
		+ "<option value='STRING'>TEXT</option>"
		+ "<option value='INTEGER'>INTEGER</option>"
		+ "<option value='DOUBLE'>DOUBLE</option>"
		+ "<option value='DATE'>DATE</option>"
		+ "<option value='BOOLEAN'>BOOLEAN</option>"
		+ "<option value='FILE'>FILE</option>"
		//		+ "<option value='CURRENCY' >CURRENCY</option>"
		//		+ "<option value='STATUS' >STATUS</option>"
		//		+ "<option value='PARENTVALUE'  >PARENTVALUE</option>"
		//		+ "<option value='CONCAT' >CONCAT</option>" 
		+ "</select></td></tr>";

	properties += "<tr><th> isMandatory: </th><td>";
	properties += "<input type='checkbox' name='isMandatory'>";

	properties += "</td></tr>";
	properties += "<tr><th> isUnique: </th><td>";
	properties += "<input type='checkbox' name='isUnique'>";

	properties += "</td></tr>";
	properties += "<tr><th>Default Value:</th><td> <input type='text' size='10' name='defaultValue' onkeypress='' value='' defaultValue='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></td></tr>";
	properties += "<tr><th>Max Value:</th><td> <input type='text' size='10' name='maxValue' /></td></tr>";
	properties += "<tr><th>Min Value:</th><td> <input type='text' size='10' name='minValue' /></td></tr></table>";

	newProperty.innerHTML = properties;

	document.getElementById('propertiesFields').appendChild(newProperty);
	if (document.getElementById('propertiesFields').innerHTML != '') {
		document.getElementById("save_type_prop_button").style.visibility = 'visible';
	}
}

ContextMenuFunctions_old.addProperties = function() {
	var newProperty = document.createElement('div');
	var properties = "<hr/><table>";
	properties += "<tr><th>Name & Type:</th><td><input type='text' name='name' size='10' />";
	properties += "<select name='propertyType' onchange='(new DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>"
		+ "<option value='INTEGER'>INTEGER</option>"
		+ "<option value='DOUBLE'>DOUBLE</option>"
		+ "<option value='DATE'>DATE</option>"
		+ "<option value='STRING'>TEXT</option>"
		+ "<option value='BOOLEAN'>BOOLEAN</option>"
		+ "<option value='FILE'>FILE</option>"
		//		+ "<option value='CURRENCY'>CURRENCY</option>"
		//		+ "<option value='STATUS'>STATUS</option>"
		//		+ "<option value='PARENTVALUE'>PARENTVALUE</option>"
		//		+ "<option value='CONCAT'>CONCAT</option>" 
		+ "</select></td></tr>";

	properties += "<tr><th> isMandatory:</th><td>";
	properties += "<input type='checkbox' name='isMandatory'>";
	properties += "</td></tr>";

	properties += "<tr><th> isUnique: </th><td>";
	properties += "<input type='checkbox' name='isUnique'>";
	properties += "</td></tr>";

	properties += "<tr><th>Default Value:</th><td> <input type='text' name='defaultValue' onkeypress='' value='' defaultValue='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></td></tr>";
	properties += "<tr><th>Max Value:</th><td> <input type='text' name='maxValue' /></td></tr>";
	properties += "<tr><th>Min Value:</th><td> <input type='text' name='minValue' /></td></tr></table>";

	newProperty.innerHTML = properties;
	document.getElementById('propertiesFields').appendChild(newProperty);

}

ContextMenuFunctions_old.saveTypeProperties = function(form) {
	console.log("===> CALLED Function :  ContextMenuFunctions_old.saveTypeProperties   ");
	var jsonData = {},
		typeProperties = [],
		property = {},
		typename,
		typeId;
	// Retrieve type fields from form
	$(form).find('div#typeName').find(':input').each(function(i, field) {
		jsonData[field.name] = field.value;
	});
	// remove typename from JSON
	typename = jsonData["typename"];
	typeId = jsonData["typeId"];
	delete jsonData['typename'];

	jsonData["namespace"] = loggedInUserName;
	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name;

	var first = true;
	if (!$.isEmptyObject(typeMapViaId[typeId].typeProperties)) {
		first = false
	}

	// Retrieve Type properties fields from form

	$(form).find('div#propertiesFields').find('div').each(function(i, propDiv) {
		$(propDiv).find(':input').each(
			function(i, field) {
				if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
					if (field.name == 'isMandatory' || field.name == 'isUnique') {
						if (field.checked == true) {
							property[field.name] = 'true';
						} else {
							property[field.name] = 'false';
						}
					} else {
						property[field.name] = field.value;
					}
				}
			});
		typeProperties.push(property);
		property = {};
	});
	// attach properties to JSON
	jsonData.properties = typeProperties;

	var successFunction = function(data) {

		//		tdvCy.filter('node[name="' + data.name + '"]').data(data);
		console.log("Type Properties create success. data: " + data.name);
		// update global variable typeMapViaId

		typeMapViaId[data.id].typeProperties = data.typeProperties; // added the new type map keyed on id
		tdvCy.$("#" + data.id).data('typeProperties', data.typeProperties)

		// refresh display properties
		ContextMenuFunctions_old.CancelAddTypeProperties(data.id);
		if (first) {
			CommonFctsLogical.addTooltip(data);
		} else {
			CommonFctsLogical.updateTooltip(data);
		}

		$("[data-id=type" + data.id + "]").parent().parent().parent().css({
			"display" : "none"
		});
	};

	var failFunction = function(xhr, status, error) {
		document.getElementById('typeForm').textContent = "Error Type properties not saved";
	};

	var apis = new TypePropertyApi();
	apis.addTypeProperties(jsonData, successFunction, failFunction);

}

//========================================== QTIP SHOW UPDATE TYPE PROPERTIES ===================================//
ContextMenuFunctions_old.showUpdateType = function() {
	console.log("===> CALLED Function :  ContextMenuFunctions_old.showUpdateType   ");
	var Form,
		type,
		formHeader,
		formFooter,
		hasGeo,
		Props,
		inputs = '';
	Form = document.createElement('div');
	type = typeMapViaId[listTypeIds[0]];

	formHeader = "<form id='updateTypeDialog'>";

	inputs += "<table class='table-responsive'  id='typeName'>";
	inputs += "<tr><td colspan='2'><input type='hidden' name='typeId'  value='" + type.id + "'></td></tr>";
	$.each(type, function(key, value) {
		if (key == 'id') {
			inputs += "<tr><td><input type='hidden' name ='" + key + "' value='" + value + "' /></td></tr>";
		} else if (key == "name") {
			inputs += "<tr><th>" + key + "</th><td><input type='text' name ='" + key + "' autofocus  value='" + value + "'/><input type='hidden' name ='oldName' value='" + value + "'/></td></tr>";
		}
	});

	Props = type.typeProperties;
	if (!$.isEmptyObject(Props)) {
		inputs += "<tr><th colspan='2' style='background-color: #CDEEDD'> Properties:</th></tr></table>";
		$.each(Props, function(key, value2) {
			inputs += "<table id='propertiesFields'>";
			$.each(value2, function(key, value) {
				if (key == 'id') {
					inputs += "<input type='hidden' name='propertyId' value='" + value + "'>";
				} else if (key == 'name') {
					inputs += "<tr><th>" + key + "</th><td><input type='text' name='name' value='" + value + "'/></td></tr>";
				} else if (key == 'isMandatory' || key == 'isUnique') {
					inputs += "<tr><th>" + key + ":</th>";
					inputs += "<td><input type='checkbox' name='" + key + "' ";
					if (value == true) {
						inputs += "checked";
					}
					inputs += "></td></tr>";
				} else if (key == 'propertyType') {
					inputs += "<tr><th>" + key + "</th><td><select name='" + key + "'><option value='INTEGER' ";

					if (value == "INTEGER") {
						inputs += "selected='selected'";
					}
					inputs += ">INTEGER</option><option value='DOUBLE' ";

					if (value == "DOUBLE") {
						inputs += "selected='selected'";
					}
					inputs += ">DOUBLE</option><option value='DATE' ";

					if (value == "DATE") {
						inputs += "selected='selected'";
					}
					inputs += ">DATE</option><option value='STRING' ";

					if (value == "STRING") {
						inputs += "selected='selected'";
					}
					inputs += ">TEXT</option><option value='BOOLEAN' ";

					if (value == "BOOLEAN") {
						inputs += "selected='selected'";
					}
					inputs += ">BOOLEAN</option><option value='FILE' ";

					if (value == "FILE") {
						inputs += "selected='selected'";
					}
					inputs += ">FILE</option></select></td></tr>";

				} else {
					if ((key != 'id') && (key != 'romeDecoPropId') && (key != 'validValues')) {
						inputs += "<tr><th>" + key + "</th><td><input type='text' name='" + key + "' value='" + value + "'/></td></tr>";
					}
				}
			});
			inputs += "<tr><td colspan='2'>---------------------------------</td></tr>";
		});
	}

	// <!-- Allow form submission with keyboard without duplicating the dialog
	// button -->
	formFooter = "<tr><td><input type='button' id='update_type_prop_button'  value='UPDATE TYPE' class='btn btn-primary btn-xs'   onclick='ContextMenuFunctions_old.saveUpdateTypeByGroup(form)' /></td>";
	formFooter += "<td><input type='button'  value='CANCEL'     class='btn btn-primary btn-xs' onclick='ContextMenuFunctions_old.CancelAddTypeProperties(" + type.id + ")'></td></tr><table></form>";
	Form.innerHTML = formHeader + inputs + formFooter;

	$('#typeForm').empty();
	$('#typeForm').append(Form);

}

ContextMenuFunctions_old.saveUpdateTypeByGroup = function(form) {
	console.log("===> CALLED Function :  ContextMenuFunctions_old.saveUpdateTypeByGroup   ");
	var jsonData = {},
		typeproperties = [],
		jsonProperty = {},
		decos = [],
		foundError = false,
		oldName,
		typeId;
	var node = {};
	$(form).find('table#typeName').find(':input').each(function(i, field) {
		if ((field.type != 'submit') && (field.type != 'radio') || field.checked && (field.value != 'Cancel')) {
			if ((field.name == 'id') || (field.name == 'oldName') || (field.name == 'name') || (field.name == 'classification') || (field.name == 'owner') || (field.name == 'isRoot')) {
				if (field.name == 'name' && !field.value) {
					console.log("Missing Value for type Name.");
					$('#typeForm').append("<br/><p style='color:red'>Missing Value for Type name : ");
					foundError = true;
				}

				if (field.name == 'isRoot') {
					node[field.name] = field.value;
				} else {
					node[field.name] = field.value;
				}
			}
		}

		if (field.name == 'geoActivator') {
			if (document.getElementById('geoActivator').checked == true) {
				decos.push($(this).val());
			}
		}

	});

	typeId = node["id"];

	if (foundError) {
		return;
	}
	// remove original typename to pass as path parameter
	oldName = node["oldName"];
	if (typeMapViaId[typeId].decorators) {
		jsonData["decorators"] = typeMapViaId[typeId].decorators;
	}

	delete node['oldName'];
	// ADD VALIDATION HERE
	$(form).find('table#propertiesFields').each(
		function(i, propDiv) {
			$(propDiv).find(':input').each(
				function(i, field) {
					if (field.type != 'submit' && field.type != 'button' && field.value != 'Cancel') {

						if ((field.name == 'propertyType') && (field.value == 'TEXT')) {
							jsonProperty[field.name] = 'STRING';
						} else {
							if (field.name == 'isMandatory' || field.name == 'isUnique') {
								if (field.checked == true) {
									jsonProperty[field.name] = "true";
								} else {
									jsonProperty[field.name] = "false";
								}
							} else {
								jsonProperty[field.name] = field.value;
							}
						}
					}
				});
			typeproperties.push(jsonProperty);
			jsonProperty = {};
		})
	node.properties = typeproperties;

	jsonData["namespace"] = loggedInUserName;
	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name;
	jsonData["node"] = node;

	console.log(jsonData);
	var successFunction = function(data) {

		tdvCy.filter('node[name="' + data.name + '"]').data(data);
		console.log("Type Properties update success. data: " + data.name);

		typeMapViaId[data.id].typeProperties = data.typeProperties; // added the new type map keyed on id
		typeMapViaId[data.id].name = data.name;
		typeMapViaId[data.id].cyDisplay = data.name;
		typeMapViaId[data.id].type = data.name;

		if (data.classification == 'node') {
			DesignLogicalBarRender.buildInitialLoad(typeMapViaId, "typelist", "typeslist", "totalNodes", "node");
		} else if (data.classification == 'path') {
			DesignLogicalBarRender.buildInitialLoad(typeMapViaId, "pathlist", "pathslist", "totalPaths", "path");
		} else if (data.classification == 'system') {
			DesignLogicalBarRender.buildInitialLoad(typeMapViaId, "systemlist", "systemslist", "totalSystems", "system");
		}

		CommonFctsLogical.updateTooltip(data);

		ContextMenuFunctions_old.CancelAddTypeProperties(data.id)
		tdvCy.$('#' + data.id).data('name', data.name); // update type in cytoscape
		tdvCy.$('#' + data.id).data('cyDisplay', data.name);
		tdvCy.$('#' + data.id).data('type', data.name);
	};

	var failFunction = function(xhr, status, error) {
		document.getElementById('typeForm').textContent = "Error Type properties not updated";
		console.log("Error Type properties not updated: " + xhr.responseText);
	};

	var apis = new TypeApi();
	apis.saveUpdateTypeByGroup(typeId, jsonData, successFunction, failFunction);
};
//==============================================================================================================//