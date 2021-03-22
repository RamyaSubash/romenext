/**
 * 
 */
function CXTMenuFcts() {
}
//======================  Functions Handlink Link Type =========================//
CXTMenuFcts.displayLink = function(ruleId, e) {

	$(".qtip").remove();

	var divprop = document.createElement('div');
	divprop.id = 'linkForm';
	divprop.className = 'block';
	divprop.innertHTML = '';
	$(".sidebotnav").empty();
	$(".sidebotnav").append(divprop);

	var inputs = CXTMenuFcts.displayLinkProperties(ruleMapViaId[ruleId]);
	DesignLogicalBarRender.resetSpanBorderInBar();

	if (document.getElementById('rule_' + ruleId)) {
		document.getElementById('rule_' + ruleId).style.border = "solid red";
	}
	$("#linkForm").append(inputs);
	document.getElementById("mySidebotnav").style.height = 'auto';

}

CXTMenuFcts.displayLinkProperties = function(rule) {

	var formHeader = "<table class='table-responsive'>";

	var inputs = "";
	inputs += "<tr><th >Link :</th><td>" + rule.name + "</td></tr>";

	var props = rule.typeProperties;
	listConnIds[0] = rule.id;

	if (props == null || props.length == 0 || $.isEmptyObject(props)) {
		inputs += "<tr><th colspan='2'> No properties added </th></tr>";

	} else {
		inputs += "<tr><th style='background-color: #CDEEDD' colspan='2' >Properties:</th></tr>";
		inputs += "<tr style='background-color: grey'><th> Name</th><th>Type</th></tr>";
		$.each(props, function(key, value) {
			var newInput = CXTMenuFcts.displayLinkProperty(value);
			inputs += newInput ;
		});
	}


	var footer = "";
	footer = "<tr><td><input type='button' value='ADD PROPERTY' class='btn btn-primary btn-xs'    onclick='CXTMenuFcts.addLinkProperties(\"" + rule.id + "\");'/></td>";
	footer += "<td><input type='button' value='UPDATE LINK'    class='btn btn-primary btn-xs'    onclick='CXTMenuFcts.showUpdateLink(\"" + rule.id + "\")'/></td></tr>";
	footer += "</table>";

	var form = document.createElement('div');
	form.innerHTML = formHeader + inputs + footer;
	return form;

};

CXTMenuFcts.displayLinkProperty = function(property) {
	console.log("Inside  CXTMenuFcts.displayRuleProperty   ");
	var inputs = "";
	var nameStyle = "color:black";

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
};

CXTMenuFcts.addLinkProperties = function(ruleId) {

	var rule = ruleMapViaId[ruleId];

	var Form = document.createElement('div');
	//	Form.className = 'rTable';
	Form.id = "tableProp"
	Form.innerHTML = "";

	var inputsTable = "";
	var headerTable = '';
	var footerTable = "";

	var Props = rule.typeProperties;
	headerTable += "<form id='typeProps' border='2'><div  id='ruleName'><label>Link :</label> <input type='text' value='" + rule.name + "' disabled='disabled'>" +
		"<input type='hidden' name='ruleid' value='" + ruleId + "'/><br/>";
		//	headerTable += "<span class='table-add glyphicon glyphicon-plus'  onclick='CXTMenuFcts.addRowProperty()'></span>" +
		//			"<a href='javascript:void(0)' class='closebtn' onclick='CXTMenuFcts.closeNav()'>Close</a>" +


	headerTable += "</div>";

	headerTable += "<div class='rTable'>";
	headerTable += "<div class='rTableRow'><div class='rTableCell' style='background-color: #CDEEDD'> Properties:</div></div>";
	headerTable += "<div class='rTableRow'></div>";
	headerTable += "<div class='rTableRow'><div class='rTableHead'>Name</div>" +
		"<div class='rTableHead'>Type</div>" +
		"<div class='rTableHead'>isMandatory</div>" +
		"<div class='rTableHead'>isUnique</div>" +
		"<div class='rTableHead'>Default Value</div>" +
		"<div class='rTableHead'>Max Value</div>" +
		"<div class='rTableHead'>Min Value</div>" +
		"<div class='rTableCellEmpty'><span class='table-add glyphicon glyphicon-plus'  onclick='CXTMenuFcts.addRowProperty()'></span></div>" +
		"</div>";

	inputsTable += "<div class='rTableRow' id='propertiesFields'>";
	inputsTable += "<div class='rTableCell'><input type='text' name='name' autofocus  size='10' /></div>";
	inputsTable += "<div class='rTableCell'><select name='propertyType' onchange='(new DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>"
		+ "<option value='STRING'>TEXT</option>"
		+ "<option value='INTEGER'>INTEGER</option>"
		+ "<option value='DOUBLE'>DOUBLE</option>"
		+ "<option value='DATE'>DATE</option>"
		+ "<option value='BOOLEAN'>BOOLEAN</option>"
		+ "<option value='FILE'>FILE</option>"
		//		+ "<option value='CURRENCY' disabled>CURRENCY</option>"
		//		+ "<option value='STATUS'  disabled>STATUS</option>"
		//		+ "<option value='PARENTVALUE' disabled >PARENTVALUE</option>"
		//		+ "<option value='CONCAT'  disabled>CONCAT</option>"
		+ "</select></div>";
	inputsTable += "<div class='rTableCell' style='text-align:center;'><input type='checkbox' name='isMandatory'></div>";
	inputsTable += "<div class='rTableCell' style='text-align:center;'><input type='checkbox' name='isUnique'></div>";
	inputsTable += "<div class='rTableCell'> <input type='text' name='defaultValue'  size='10' onkeypress='' value='' defaultValue='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></div>";
	inputsTable += "<div class='rTableCell'> <input type='text' name='maxValue' size='10'/></div>";
	inputsTable += "<div class='rTableCell'> <input type='text' name='minValue' size='10'/></div>";
	inputsTable += "<div class='rTableCell'></div>";
	inputsTable += "</div></div>";

	footerTable += "<div style='align-text:center'> <input id='save_type_prop_button' type='button'  value='SAVE PROPERTIES'  class='btn btn-primary btn-xs' onclick='CXTMenuFcts.saveLinkProperties(form)'>" ;
	footerTable += "<input type='button' value='CANCEL' class='btn btn-primary btn-xs' onclick='CXTMenuFcts.cancelLinkProperties(" + ruleId + ");'></div>" +
		"</form>"
	footerTable += "<div id='error_linkProps'></div>";
	Form.innerHTML = headerTable + inputsTable + footerTable;

	$('#linkForm').empty();
	$('#linkForm').append(Form);

}

CXTMenuFcts.addRowProperty = function() {

	var $TABLE = $('#tableProp');

	var rowTable = "";
	rowTable += "<div class='rTableRow' id='propertiesFields'>";
	rowTable += "<div class='rTableCell'><input type='text' name='name'  size='10' /></div>";
	rowTable += "<div class='rTableCell'><select name='propertyType' onchange='(new DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>"
		+ "<option value='STRING'>TEXT</option>"
		+ "<option value='INTEGER'>INTEGER</option>"
		+ "<option value='DOUBLE'>DOUBLE</option>"
		+ "<option value='DATE'>DATE</option>"
		+ "<option value='BOOLEAN'>BOOLEAN</option>"
		+ "<option value='FILE'>FILE</option>"
		//		+ "<option value='CURRENCY' disabled>CURRENCY</option>"
		//		+ "<option value='STATUS'  disabled>STATUS</option>"
		//		+ "<option value='PARENTVALUE' disabled >PARENTVALUE</option>"
		//		+ "<option value='CONCAT'  disabled>CONCAT</option>"
		+ "</select></div>";
	rowTable += "<div class='rTableCell' style='text-align:center;'><input type='checkbox' name='isMandatory'></div>";
	rowTable += "<div class='rTableCell' style='text-align:center;'><input type='checkbox' name='isUnique'></div>";
	rowTable += "<div class='rTableCell'> <input type='text' name='defaultValue'  size='10' onkeypress='' value='' defaultValue='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></div>";
	rowTable += "<div class='rTableCell'> <input type='text' name='maxValue' size='10'/></div>";
	rowTable += "<div class='rTableCell'> <input type='text' name='minValue' size='10'/></div>";
	rowTable += "<div class='rTableCell'><span class='table-remove glyphicon glyphicon-remove' onclick='CXTMenuFcts.removeRowProperty(this) '></span></div>";
	rowTable += "</div>";

	$TABLE.find('.rTable').append(rowTable);

}

CXTMenuFcts.removeRowProperty = function(ele) {
	ele.closest('div.rTableRow').remove();
}

CXTMenuFcts.closeNav = function() {
	$("#mySidebotnav").empty();
	document.getElementById("mySidebotnav").style.height = '';
}

CXTMenuFcts.cancelLinkProperties = function(ruleId) {
	var inputs = CXTMenuFcts.displayLinkProperties(ruleMapViaId[ruleId], true);
	$("#linkForm").empty();
	$("#linkForm").append(inputs);
}

CXTMenuFcts.showUpdateLink = function(ruleId) {

	var Form,
		rule,
		formHeader,
		formFooter,
		Props,
		inputs = '';
	var idth = '',
		nameth = '',
		typeth = '',
		uniqueth = "<td style='text-align:center;'><input type='checkbox' name='isUnique' value='' /></td>",
		mandatoryth = "<td style='text-align:center;'><input type='checkbox' name='isMandatory' value='' /></td>",
		maxth = "<td><input type='text' name='maxValue' size='10'  value=''/></td>",
		minth = "<td><input type='text' name='minValue' size='10' value=''/></td>",
		defaultth = "<td><input type='text' name='defaultValue' size='10'  value=''/></td>";

	Form = document.createElement('div');
	rule = ruleMapViaId[ruleId];
	Props = rule.typeProperties;

	formHeader = "<form id='updateruleDialog'>";

	inputs += "<table class='table-responsive'  >";
	inputs += "<tr id='ruleName' ><th><input type='hidden' name ='ruleId' value='" + rule.id + "' />";
	inputs += "Link </th><td><input type='text' name ='newName' size='10' autofocus  value='" + rule.name + "'/></td></tr>";

	var rowtr = '';

	if (!$.isEmptyObject(Props)) {

		inputs += "<tr><th colspan='7' style='background-color: #CDEEDD'> Properties:</th></tr>";
		inputs += "<tr class='heading'><th>Name</th><th>Type</th><th>isMandatory</th><th>isUnique</th><th>Default Value</th> <th>Max Value</th><th>Min Value</th></tr>";

		$.each(Props, function(key, value2) {
			rowtr += "<tr class='propertiesFields'><td>";
			$.each(value2, function(key, value) {
				if (key == 'id') {
					idth += "<input type='hidden' name='id' value='" + value + "'>";
				}
				if (key == 'name') {
					nameth += "<input type='text' name='name' size='10'  value='" + value + "'/></td>";
				}
				if (key == 'isMandatory') {
					mandatoryth = "<td style='text-align:center;'><input type='checkbox' name='" + key + "' ";
					if (value == true) {
						mandatoryth += "checked";
					}
					mandatoryth += "></td>";
				}
				if (key == 'isUnique') {
					uniqueth = "<td style='text-align:center;'><input type='checkbox' name='" + key + "' ";
					if (value == true) {
						uniqueth += "checked";
					}
					uniqueth += "></td>";
				}

				if (key == 'propertyType') {
					typeth += "<td><select name='" + key + "'><option value='INTEGER' ";

					if (value == "INTEGER") {
						typeth += "selected='selected'";
					}
					typeth += ">INTEGER</option><option value='DOUBLE' ";

					if (value == "DOUBLE") {
						typeth += "selected='selected'";
					}
					typeth += ">DOUBLE</option><option value='DATE' ";

					if (value == "DATE") {
						typeth += "selected='selected'";
					}
					typeth += ">DATE</option><option value='STRING' ";

					if (value == "STRING") {
						typeth += "selected='selected'";
					}
					typeth += ">TEXT</option><option value='BOOLEAN' ";

					if (value == "BOOLEAN") {
						typeth += "selected='selected'";
					}
					typeth += ">BOOLEAN</option><option value='FILE' ";

					if (value == "FILE") {
						typeth += "selected='selected'";
					}
					typeth += ">FILE</option></select></td>";
					//							"<option value='CURRENCY' ";
					//
					//					if (value == "CURRENCY") {
					//						typeth += "selected='selected'";
					//					}										
					//					typeth += ">CURRENCY</option><option value='STATUS' ";
					//					if (value == "STATUS") {
					//						typeth += "selected='selected'";
					//					}
					//					typeth += ">STATUS</option><option value='CONCAT' ";
					//					if( value == "CONCAT"){
					//						typeth += "selected='selected'";
					//					}
					//					typeth += ">CONCAT</option>" +


				}
				if (key == 'maxValue') {
					maxth = "<td><input type='text' name='" + key + "' size='10'  value='" + value + "'/></td>";
				}
				if (key == 'minValue') {
					minth = "<td><input type='text' name='" + key + "' size='10'  value='" + value + "'/></td>";
				}
				if (key == 'defaultValue') {
					defaultth = "<td><input type='text' name='" + key + "' size='10'  value='" + value + "'/></td>";
				}
			});
			rowtr = rowtr + idth + nameth + typeth + mandatoryth + uniqueth + defaultth + maxth + minth + "</tr>";
			inputs = inputs + rowtr;
			rowtr = '', idth = '', nameth = '', typeth = '',
			uniqueth = "<td style='text-align:center;'><input type='checkbox' name='isUnique' value='' /></td>",
			mandatoryth = "<td style='text-align:center;'><input type='checkbox' name='isMandatory' value='' /></td>",
			maxth = "<td><input type='text' name='maxValue' size='10'  value=''/></td>",
			minth = "<td><input type='text' name='minValue' size='10' value=''/></td>",
			defaultth = "<td><input type='text' name='defaultValue' size='10'  value=''/></td>";
		});
	}

	// <!-- Allow form submission with keyboard without duplicating the dialog
	// button -->
	formFooter = "<tr><td><input type='button' value='UPDATE LINK' class='btn btn-primary btn-xs'   onclick='CXTMenuFcts.updateLinkByGroup(form)' /></td>";
	formFooter += "<td><input type='button'  value='CANCEL'     class='btn btn-primary btn-xs' onclick='CXTMenuFcts.cancelLinkProperties(" + rule.id + ")'></td></tr><table></form>";
	formFooter += "<div id='error_linkProps'></div>";
	Form.innerHTML = formHeader + inputs + formFooter;
	$('#linkForm').empty();
	$('#linkForm').append(Form);

}

CXTMenuFcts.saveLinkProperties = function(form) {

	var jsonData = {},
		ruleProperties = [],
		property = {},
		ruleId;
		
	jsonData = GlobalApiUtils.assignApiHeaders( jsonData );
	// Retrieve type fields from form
	$(form).find('div#ruleName').find(':input').each(function(i, field) {
		if (field.name == 'ruleid') {
			jsonData[field.name] = Number(field.value);
		}
	});

	ruleId = jsonData["ruleid"];
	var foundEmptyPropName = false;
	var props = [];
	var first = true;
	if (!$.isEmptyObject(ruleMapViaId[ruleId].typeProperties)) {
		first = false;
		$.each(ruleMapViaId[ruleId].typeProperties, function(key, value) {
			props.push(value);
		});
	}
	listErrorsFromRetrieval = [];


	$("#error_linkProps").empty();
	// Retrieve Type properties fields from form
	$(form).find('div#propertiesFields')
		.each(function(i, propDiv) {
			$(propDiv).find(':input').each(
				function(i, field) {
					if (field.name == 'name' || field.name == 'propertyType' || field.name == 'isMandatory'
						|| field.name == 'isUnique' || field.name == 'defaultValue' || field.name == 'maxValue' || field.name == 'minValue') {
						if (field.name == 'isMandatory' || field.name == 'isUnique') {
							if (field.checked == true) {
								property[field.name] = 'true';
							} else {
								property[field.name] = 'false';
							}
						} else {
							if (field.name == 'name' && $.isEmptyObject(field.value)) {
								listErrorsFromRetrieval.push("Property name can not be empty<br/>");
								//								$('#error_linkProps').append("Property name can not be empty");
								foundEmptyPropName = true;
							}
							if (field.name == 'name') {
								var error = false;
								//								error = CommonFctsLogical.verifyPropertiesName(field.value, ruleMapViaId[ruleId].typeProperties);
								error = CommonFctsLogical.verifyPropertiesName(field.value, props);
								if (error) {
									listErrorsFromRetrieval.push("Property  name <b>'" + field.value + "'</b> duplicate");
									foundEmptyPropName = true;
								}
							}

							property[field.name] = field.value;
						}

					}
				});
			ruleProperties.push(property);
			props.push(property);
			property = {};
		});
		// attach properties to JSON

	if (foundEmptyPropName) {
		console.log("can not complete saving process");
		console.log(props);
		$('#error_linkProps').append(listErrorsFromRetrieval.join('<br/>'));
		return;
	}
	
	jsonData["fields"] = ruleProperties;
	props = [];
	console.log(jsonData);
	var successFunction = function(data) {
		if (!$.isEmptyObject(data)) {
			CommonFctsLogical.HandlingErrorMSG("Link Properties for " + data.name + " added successfully.", "success");

			// on success on a new property for a rule, we just want to update the property list
			ruleMapViaId[ruleId].typeProperties = data.typeProperties;
			console.log("returned properties" + data.typeProperties)
			CXTMenuFcts.cancelLinkProperties(ruleId);

			if (first) {
				CommonFctsLogical.addTooltip(data);
			} else {
				CommonFctsLogical.updateTooltip(data);
			}
		}

	};

	var failFunction = function(xhr, status, error) {
		$('#error_linkProps').append("Error Link properties not saved" + xhr.responseJSON);
		CommonFctsLogical.HandlingErrorMSG("Link Properties Failed to be added for :" + ruleMapViaId[ruleId].name, "error");
	};

	var connApis = new ConnectionApis();
	connApis.addRuleProperties(jsonData, successFunction, failFunction);

}

CXTMenuFcts.updateLinkByGroup = function(form) {
	var jsonData = {},
		ruleProperties = [],
		jsonProperty = {},
		decos = [],
		foundError = false,
		oldName,
		ruleId;
	var node = {};
	
//	jsonData["grouphost"] = userGroup.host;
//	jsonData["groupname"] = userGroup.name;
//	jsonData["namespace"] = loggedInUserName;
	jsonData = GlobalApiUtils.assignApiHeaders( jsonData );
	
	
	$("#error_linkProps").empty();
	$(form).find('tr#ruleName').find(':input').each(function(i, field) {
		if ((field.type != 'submit') && (field.type != 'radio') || field.checked && (field.value != 'Cancel')) {
			if ((field.name == 'ruleId') || (field.name == 'newName')) {
				if (field.name == 'newName' && !field.value) {
					console.log("Missing Value for rule Name.");
					$('#error_linkProps').append("<br/><p style='color:red'>Missing Value for rule name : </p>");
					foundError = true;
				}
				jsonData[field.name] = field.value;
			}
		}

	});
	if (foundError) {
		return;
	}
	ruleId = jsonData["ruleId"];
	var oldname = ruleMapViaId[ruleId].name;
	var newname = jsonData["newName"];

	jsonData["owner"] = loggedInUserName;
	console.log(jsonData);

	var successFunction = function(data) {
		if (!jQuery.isEmptyObject(data.rule)) {
			console.log("Rule update success. data: " + data.rule);
			ruleMapViaId[ruleId].name = data.rule.name;
		} else {
			console.log("API call successful but error in return response in rule update");
		}
	};

	var failFunction = function(xhr, status, error) {
		document.getElementById('error_linkProps')("Error in Link update");
		console.log("Error Rule not updated: " + xhr.responseText);
		return;
	};

	var apis = new RuleApis();
	apis.updateRule(jsonData, successFunction, failFunction);

	var foundEmptyPropName = false;

	var props = [];
	listErrorsFromRetrieval = [];

	$(form).find('tr.propertiesFields').each(
		function(i, propDiv) {
			$(propDiv).find(':input').each(
				function(i, field) {
					if (field.type != 'submit' && field.type != 'button' && field.value != 'CANCEL') {
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

								if (field.name == 'name' && $.isEmptyObject(field.value)) {
									listErrorsFromRetrieval.push("Property name can not be empty<br/>");
									foundEmptyPropName = true;
								}
								if (field.name == 'name') {
									var error = false;
									error = CommonFctsLogical.verifyPropertiesName(field.value, props);
									if (error) {
										listErrorsFromRetrieval.push("Property  name <b>'" + field.value + "'</b> duplicate");
										foundEmptyPropName = true;
									}
								}

								jsonProperty[field.name] = field.value;
							}
						}
					}
				});
			ruleProperties.push(jsonProperty);
			props.push(jsonProperty);
			jsonProperty = {};
		})

	// Need to check for duplicate property name !!!!!!!!!!!!

	if (foundEmptyPropName) {
		console.log("can not complete update  process");
		console.log(props);
		$('#error_linkProps').append(listErrorsFromRetrieval.join('<br/>'));
		return;
	}
	var retproperties = [];
	var jsonDatarule = {};
	error = false;
	props = [];
	if (!jQuery.isEmptyObject(ruleProperties)) {
		$.each(ruleProperties, function(key, value) {
			jsonDatarule["updateProperty"] = value;
			jsonDatarule["ruleId"] = Number(ruleId);

			jsonDatarule["namespace"] = loggedInUserName;
			jsonDatarule["groupname"] = userGroup.name;
			jsonDatarule["grouphost"] = userGroup.host;
			var successFunction = function(data) {

				console.log("Rule Properties update success. data: " + data.rule.name);
				retproperties = data.rule.typeProperties;

			};

			var failFunction = function(xhr, status, error) {
				document.getElementById('error_linkProps').append("Error Rule properties not updated");
				error = true;
			};

			var ruleapis = new RuleApis();
			ruleapis.updateRuleAndProperties(ruleId, jsonDatarule, successFunction, failFunction);
		});
	}

	if (!error) {
		if (oldname != newname) {
			tdvCy.$('#rule' + ruleId + '').data('name', newname); // update type in cytoscape
			if (document.getElementById("rule_" + ruleId)) {
				document.getElementById("rule_" + ruleId).innerHTML = newname;
			}
		}
		ruleMapViaId[ruleId].typeProperties = retproperties;
		$('#linkForm').empty();

		CXTMenuFcts.cancelLinkProperties(ruleId)
		CommonFctsLogical.updateTooltip(ruleMapViaId[ruleId]);

	}
};
//===============================================================================//

//========================  Functions to handle Node/Path/System/DTC type =======//
CXTMenuFcts.displayType = function(typeId, e) {

	$(".qtip").remove();

	var divprop = document.createElement('div');
	divprop.id = 'typeForm2';
	divprop.className = 'block';
	divprop.innertHTML = '';
	$(".sidebotnav").empty();
	$(".sidebotnav").append(divprop);

	var inputs = CXTMenuFcts.displayTypeProperties(typeMapViaId[typeId]);
	DesignLogicalBarRender.resetSpanBorderInBar();

	if (typeMapViaId[typeId].classification != 'DCT') {
		if (document.getElementById(typeId)) {
			document.getElementById(typeId).style.border = "solid red";
		}
	}
	$("#typeForm2").append(inputs);
	document.getElementById("mySidebotnav").style.height = 'auto';

}

CXTMenuFcts.displayTypeProperties = function(type) {

	var formHeader = "<table class='table-responsive'>";
	var inputs = "";
	var label = type.classification.charAt(0).toUpperCase() + type.classification.slice(1);
	inputs += "<tr><th> " + label + " </th><td><span class='badge' style='color:black; background:" + type.color + ";'> " + type.name + "</span></td><tr>";


	// generate the properties fields
	var props = type.typeProperties;

	if (props == null || props.length == 0 || $.isEmptyObject(props)) {
		inputs += "<tr><th colspan='2'> No properties added </th></tr>";
	} else {
		inputs += "<tr><th colspan='2'  style='background-color: #CDEEDD'>Properties:</th></tr>";

		inputs += "<tr style='background-color: grey'><th> Name</th><th>Type</th></tr>";
		$.each(props, function(key, value) {
			var newInput = CXTMenuFcts.displayTypeProperty(value);
			inputs += newInput;
		});
	}
	var footer = "";
	footer = "<tr><td><input type='button' value='ADD PROPERTY' class='btn btn-primary btn-xs'    onclick='CXTMenuFcts.addTypeProperties(\"" + type.id + "\");'/></td>";
	footer += "<td><input type='button' value='UPDATE TYPE'    class='btn btn-primary btn-xs'    onclick='CXTMenuFcts.showUpdateType(\"" + type.id + "\")'/></td></tr>";
	footer += "</table>";
	var form = document.createElement('div');

	form.innerHTML = formHeader + inputs + footer;
	return form;

}

CXTMenuFcts.displayTypeProperty = function(property) {
	console.log("Inside  CXTMenuFcts.displayTypeProperty   ");
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

CXTMenuFcts.addTypeProperties = function(typeId) {

	var type = typeMapViaId[typeId];

	var Form = document.createElement('div');
	//	Form.className = 'rTable';
	Form.id = "tableProp"
	Form.innerHTML = "";

	var inputsTable = "";
	var headerTable = '';
	var footerTable = "";
	var label = type.classification.charAt(0).toUpperCase() + type.classification.slice(1);
	var Props = type.typeProperties;
	headerTable += "<form id='typeProps' border='2'><div  id='typeName'><label>" + label + " :</label> <span class='badge' style='color:black; background:" + type.color + ";' id='t_" + type.id + "'>" + type.name + "</span>" +
		"<input type='hidden' name='typeId' value='" + typeId + "'/><br/>";
		//	headerTable += "<span class='table-add glyphicon glyphicon-plus'  onclick='CXTMenuFcts.addRowProperty()'></span>" +
		//			"<a href='javascript:void(0)' class='closebtn' onclick='CXTMenuFcts.closeNav()'>Close</a>" +

	headerTable += "</div>";

	headerTable += "<div class='rTable'>";
	headerTable += "<div class='rTableRow'></div>";
	headerTable += "<div class='rTableRow'><div class='rTableCell' style='background-color: #CDEEDD'> Properties:</div></div>";
	headerTable += "<div class='rTableRow'><div class='rTableHead'>Name</div>" +
		"<div class='rTableHead'>Type</div>" +
		"<div class='rTableHead'>isMandatory</div>" +
		"<div class='rTableHead'>isUnique</div>" +
		"<div class='rTableHead'>Default Value</div>" +
		"<div class='rTableHead'>Max Value</div>" +
		"<div class='rTableHead'>Min Value</div>" +
		"<div class='rTableCellEmpty'><span class='table-add glyphicon glyphicon-plus'  onclick='CXTMenuFcts.addRowProperty()'></span></div>" +
		"</div>";

	inputsTable += "<div class='rTableRow' id='propertiesFields'>";
	inputsTable += "<div class='rTableCell'><input type='text' name='name' autofocus  size='10' /></div>";
	inputsTable += "<div class='rTableCell'><select name='propertyType' onchange='(new DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>"
		+ "<option value='STRING'>TEXT</option>"
		+ "<option value='INTEGER'>INTEGER</option>"
		+ "<option value='DOUBLE'>DOUBLE</option>"
		+ "<option value='DATE'>DATE</option>"
		+ "<option value='BOOLEAN'>BOOLEAN</option>"
		+ "<option value='FILE'>FILE</option>"
		//		+ "<option value='CURRENCY' disabled>CURRENCY</option>"
		//		+ "<option value='STATUS'  disabled>STATUS</option>"
		//		+ "<option value='PARENTVALUE' disabled >PARENTVALUE</option>"
		//		+ "<option value='CONCAT'  disabled>CONCAT</option>"
		+ "</select></div>";
	inputsTable += "<div class='rTableCell' style='text-align:center;'><input type='checkbox' name='isMandatory'></div>";
	inputsTable += "<div class='rTableCell' style='text-align:center;'><input type='checkbox' name='isUnique'></div>";
	inputsTable += "<div class='rTableCell'> <input type='text' name='defaultValue'  size='10' onkeypress='' value='' defaultValue='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></div>";
	inputsTable += "<div class='rTableCell'> <input type='text' name='maxValue' size='10'/></div>";
	inputsTable += "<div class='rTableCell'> <input type='text' name='minValue' size='10'/></div>";
	inputsTable += "<div class='rTableCell'></div>";
	inputsTable += "</div></div>";

	footerTable += "<div style='align-text:center'> <input id='save_type_prop_button' type='button'  value='SAVE PROPERTIES'  class='btn btn-primary btn-xs' onclick='CXTMenuFcts.saveTypeProperties(form)'>" ;
	footerTable += "<input type='button' value='CANCEL' class='btn btn-primary btn-xs' onclick='CXTMenuFcts.cancelTypeProperties(" + typeId + ");'></div>" +
		"</form>"
	footerTable += "<div id='error_typeProps'></div>";
	Form.innerHTML = headerTable + inputsTable + footerTable;

	$('#typeForm2').empty();
	$('#typeForm2').append(Form);
}

CXTMenuFcts.cancelTypeProperties = function(typeId) {
	var inputs = CXTMenuFcts.displayTypeProperties(typeMapViaId[typeId]);
	$("#typeForm2").empty();
	$("#typeForm2").append(inputs);
}

CXTMenuFcts.saveTypeProperties = function(form) {

	var jsonData = {},
		typeProperties = [],
		property = {},
		typeId;
	
	jsonData = GlobalApiUtils.assignApiHeaders( jsonData );
	
	// Retrieve type fields from form
	$(form).find('div#typeName').find(':input').each(function(i, field) {
		if (field.name == "typeId") {
			jsonData[field.name] = Number(field.value);
		} else {
			jsonData[field.name] = field.value;
		}

	});

	typeId = jsonData["typeId"];

	var props = [];
	var first = true;
	if (!$.isEmptyObject(typeMapViaId[typeId].typeProperties)) {
		first = false;
		$.each(typeMapViaId[typeId].typeProperties, function(key, value) {
			props.push(value);
		});
	}

	listErrorsFromRetrieval = [];
	$("#error_typeProps").empty();
	// Retrieve Type properties fields from form
	var foundEmptyPropName = false;
	$(form).find('div#propertiesFields')
		.each(function(i, propDiv) {
			$(propDiv).find(':input').each(
				function(i, field) {
					if (field.name == 'name' || field.name == 'propertyType' || field.name == 'isMandatory'
						|| field.name == 'isUnique' || field.name == 'defaultValue' || field.name == 'maxValue' || field.name == 'minValue') {
						if (field.name == 'isMandatory' || field.name == 'isUnique') {
							if (field.checked == true) {
								property[field.name] = 'true';
							} else {
								property[field.name] = 'false';
							}
						} else {
							if (field.name == 'name' && $.isEmptyObject(field.value)) {
								listErrorsFromRetrieval.push("Property name can not be empty");
								foundEmptyPropName = true;
							}
							if (field.name == 'name') {
								var error = false;
								error = CommonFctsLogical.verifyPropertiesName(field.value, props);
								if (error) {
									listErrorsFromRetrieval.push("Property  name <b>'" + field.value + "'</b> duplicate");
									foundEmptyPropName = true;
								}
							}
							property[field.name] = field.value;
						}

					}
				});
			typeProperties.push(property);
			props.push(property);
			property = {};
		});

	if (foundEmptyPropName) {
		console.log("can not complete saving process");
		console.log(props);
		$('#error_typeProps').append(listErrorsFromRetrieval.join('<br/>'));
		return;
	}

	// attach properties to JSON
	jsonData.properties = typeProperties;
	props = [];
	var successFunction = function(data) {
		if (!$.isEmptyObject(data)) {
			//		tdvCy.filter('node[name="' + data.name + '"]').data(data);
			console.log("Type Properties create success. data: " + data.name);
			// update global variable typeMapViaId
			typeMapViaId[data.id].typeProperties = data.typeProperties;
			tdvCy.$('#' + typeId).data('typeProperties', data.typeProperties);

			// refresh display properties
			CXTMenuFcts.cancelTypeProperties(data.id);

			if (first) {
				CommonFctsLogical.addTooltip(data);
			} else {
				CommonFctsLogical.updateTooltip(data);
			}

		//			$("[data-id=type" + data.id + "]").parent().parent().parent().css({
		//				"display" : "none"
		//			});
		}
	};

	var failFunction = function(xhr, status, error) {
		$('#error_typeProps').append("Error Type properties not saved" + xhr.responseJSON);
		CommonFctsLogical.HandlingErrorMSG("Error Type properties not saved:", "error");
	};

	var apis = new TypePropertyApi();
	apis.addTypeProperties(jsonData, successFunction, failFunction);

}

CXTMenuFcts.showUpdateType = function(typeId) {

	var Form,
		type,
		formHeader,
		formFooter,
		Props,
		inputs = '';
	var idth = '',
		nameth = '',
		typeth = '',
		uniqueth = "<td  style='text-align:center;'><input type='checkbox' name='isUnique' value='' /></td>",
		mandatoryth = "<td  style='text-align:center;'> <input type='checkbox' name='isMandatory' value='' /></td>",
		maxth = "<td><input type='text' name='maxValue' size='10'  value=''/></td>",
		minth = "<td><input type='text' name='minValue' size='10' value=''/></td>",
		defaultth = "<td><input type='text' name='defaultValue' size='10'  value=''/></td>";
	type = typeMapViaId[typeId];
	var label = type.classification.charAt(0).toUpperCase() + type.classification.slice(1);

	Form = document.createElement('div');

	formHeader = "<form id='updateTypeDialog'>";

	inputs += "<table class='table-responsive'  >";
	inputs += "<tr  id='typeName' ><th>" + label + "<input type='hidden' name ='id' value='" + type.id + "' /></th>";
	inputs += "<td><input type='text' name ='name' size='10' autofocus  value='" + type.name + "'/><input type='hidden' name ='oldName' value='" + type.name + "'/></td></tr>";

	var rowtr = '';
	Props = type.typeProperties;
	if (!$.isEmptyObject(Props)) {
		inputs += "<tr><th colspan='7' style='background-color: #CDEEDD'> Properties:</th></tr>";
		inputs += "<tr class='heading'><th>Name</th><th>Type</th><th>isMandatory</th><th>isUnique</th><th>Default Value</th> <th>Max Value</th><th>Min Value</th></tr>";
		$.each(Props, function(key, value2) {
			rowtr += "<tr id='propertiesFields'><td>";
			$.each(value2, function(key, value) {
				if (key == 'id') {
					idth += "<input type='hidden' name='propertyId' value='" + value + "'>";
				}
				if (key == 'name') {
					nameth += "<input type='text' name='name' size='10'  value='" + value + "'/></td>";
				}

				if (key == 'isMandatory') {
					mandatoryth = "<td style='text-align:center;'><input type='checkbox' name='" + key + "' ";
					if (value == true) {
						mandatoryth += "checked";
					}
					mandatoryth += "></td>";
				}
				if (key == 'isUnique') {
					uniqueth = "<td style='text-align:center;'><input type='checkbox' name='" + key + "' ";
					if (value == true) {
						uniqueth += "checked";
					}
					uniqueth += "></td>";
				}

				if (key == 'propertyType') {
					typeth += "<td><select name='" + key + "'><option value='INTEGER' ";

					if (value == "INTEGER") {
						typeth += "selected='selected'";
					}
					typeth += ">INTEGER</option><option value='DOUBLE' ";

					if (value == "DOUBLE") {
						typeth += "selected='selected'";
					}
					typeth += ">DOUBLE</option><option value='DATE' ";

					if (value == "DATE") {
						typeth += "selected='selected'";
					}
					typeth += ">DATE</option><option value='STRING' ";

					if (value == "STRING") {
						typeth += "selected='selected'";
					}
					typeth += ">TEXT</option><option value='BOOLEAN' ";

					if (value == "BOOLEAN") {
						typeth += "selected='selected'";
					}
					typeth += ">BOOLEAN</option><option value='FILE' ";

					if (value == "FILE") {
						typeth += "selected='selected'";
					}
					typeth += ">FILE</option></select></td>";
				}
				if (key == 'maxValue') {
					maxth = "<td><input type='text' name='" + key + "' size='10'  value='" + value + "'/></td>";
				}
				if (key == 'minValue') {
					minth = "<td><input type='text' name='" + key + "' size='10'  value='" + value + "'/></td>";
				}
				if (key == 'defaultValue') {
					defaultth = "<td><input type='text' name='" + key + "' size='10'  value='" + value + "'/></td>";
				}
			});
			rowtr = rowtr + idth + nameth + typeth + mandatoryth + uniqueth + defaultth + maxth + minth + "</tr>";
			inputs = inputs + rowtr;
			rowtr = '', idth = '', nameth = '', typeth = '',
			uniqueth = "<td  style='text-align:center;'><input type='checkbox' name='isUnique' value='' /></td>",
			mandatoryth = "<td  style='text-align:center;'><input type='checkbox' name='isMandatory' value='' /></td>",
			maxth = "<td><input type='text' name='maxValue' size='10'  value=''/></td>",
			minth = "<td><input type='text' name='minValue' size='10' value=''/></td>",
			defaultth = "<td><input type='text' name='defaultValue' size='10'  value=''/></td>";
		});
	}

	// <!-- Allow form submission with keyboard without duplicating the dialog
	// button -->
	formFooter = "<tr><td><input type='button' value='UPDATE TYPE'  id='update_type_prop_button'   class='btn btn-primary btn-xs'   onclick='CXTMenuFcts.saveUpdateTypeByGroup(form)' /></td>";
	formFooter += "<td><input type='button'  value='CANCEL'     class='btn btn-primary btn-xs' onclick='CXTMenuFcts.cancelTypeProperties(" + type.id + ")'></td></tr><table></form>";
	formFooter += "<div id='error_updateType'></div>";
	Form.innerHTML = formHeader + inputs + formFooter;

	$('#typeForm2').empty();
	$('#typeForm2').append(Form);

}

CXTMenuFcts.saveUpdateTypeByGroup = function(form) {
	var jsonData = {},
		typeproperties = [],
		jsonProperty = {},
		decos = [],
		foundError = false,
		oldName,
		typeId;
	
	jsonData = GlobalApiUtils.assignApiHeaders( jsonData );
	$('#error_updateType').empty();
	var node = {};
	$(form).find('tr#typeName').find(':input').each(function(i, field) {
		if ((field.type != 'submit') && (field.type != 'radio') || field.checked && (field.value != 'Cancel')) {
			if ((field.name == 'id') || (field.name == 'oldName') || (field.name == 'name')) {
				if (field.name == 'name' && !field.value) {
					console.log("Missing Value for type Name.");
					$('#error_updateType').append("Missing Value for Type name<br/>");
					foundError = true;
				}
				node[field.name] = field.value;
			}
		}
	});

	typeId = node["id"];

	if (foundError) {
		return;
	}
	// remove original typename to pass as path parameter
	oldName = node["oldName"];
	delete node['oldName'];

	if (typeMapViaId[typeId].decorators) {
		jsonData["decorators"] = typeMapViaId[typeId].decorators;
	}

	var props = [];
	listErrorsFromRetrieval = [];

	var foundEmptyPropName = false;
	// ADD VALIDATION HERE
	$(form).find('tr#propertiesFields').each(
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
								if (field.name == 'name' && $.isEmptyObject(field.value)) {
									listErrorsFromRetrieval.push("Property name can not be empty<br/>");

									//									document.getElementById('error_updateType').append("Property name can not be empty");
									foundEmptyPropName = true;
								}
								if (field.name == 'name') {
									var error = false;
									error = CommonFctsLogical.verifyPropertiesName(field.value, props);
									if (error) {
										listErrorsFromRetrieval.push("Property  name <b>'" + field.value + "'</b> duplicate");
										foundEmptyPropName = true;
									}
								}

								jsonProperty[field.name] = field.value;
							}
						}
					}
				});
			typeproperties.push(jsonProperty);
			props.push(jsonProperty);
			jsonProperty = {};
		})
	if (foundEmptyPropName) {
		console.log("can not complete update  process");
		console.log(props);
		$('#error_updateType').append(listErrorsFromRetrieval.join('<br/>'));
		return;
	}
	node.properties = typeproperties;

	jsonData["node"] = node;
	props = [];
	console.log(jsonData);
	var successFunction = function(data) {

		//		tdvCy.filter('node[name="' + data.name + '"]').data(data);
		console.log("Type Properties update success. data: " + data.name);

		typeMapViaId[data.id].typeProperties = data.typeProperties; // added the new type map keyed on id
		tdvCy.$("#" + data.id).data('typeProperties', data.typeProperties)
		if (data.name != oldName) {
			typeMapViaId[data.id].name = data.name;
			typeMapViaId[data.id].cyDisplay = data.name;
			typeMapViaId[data.id].type = data.name;
			tdvCy.$('#' + data.id).data('name', data.name); // update type in cytoscape 
			tdvCy.$('#' + data.id).data('cyDisplay', data.name);
			tdvCy.$('#' + data.id).data('type', data.name);
			if (document.getElementById(data.id)) {
				$("#" + data.id).empty();
				$("#" + data.id).append(data.name);
			}
		}

		CommonFctsLogical.updateTooltip(data);
		CXTMenuFcts.cancelTypeProperties(data.id)
	};

	var failFunction = function(xhr, status, error) {
		document.getElementById('error_updateType').append("Error Type properties not updated");
		console.log("Error Type properties not updated: " + xhr.responseText);
	};

	var apis = new TypeApi();
	apis.saveUpdateTypeByGroup(typeId, jsonData, successFunction, failFunction);
};

//==============================================================================//

CXTMenuFcts.displayConnection = function(connId) {

	$(".qtip").remove();

	var divprop = document.createElement('div');
	divprop.id = 'typeForm2';
	divprop.className = 'block';
	divprop.innertHTML = '';
	$(".sidebotnav").empty();
	$(".sidebotnav").append(divprop);

	var conn = connMapViaId[connId];
	var inputs = CXTMenuFcts.displayConnProperties(conn);
	DesignLogicalBarRender.resetSpanBorderInBar();
	
	$("#typeForm2").append(inputs);
	document.getElementById("mySidebotnav").style.height = 'auto';

}

CXTMenuFcts.displayConnProperties = function(conn) {

	var Form,
		rule,
		formHeader,
		formFooter,
		Props,
		inputs = '';
	var idth = '',
		nameth = '',
		typeth = '',
		uniqueth = "<td  style='text-align:center;'><input type='checkbox' name='isUnique' value=''  /></td>",
		mandatoryth = "<td  style='text-align:center;'><input type='checkbox' name='isMandatory' value=''  /></td>",
		maxth = "<td><input type='text' name='maxValue' size='10'  value=''  /></td>",
		minth = "<td><input type='text' name='minValue' size='10' value='' /></td>",
		defaultth = "<td><input type='text' name='defaultValue' size='10'  value='' /></td>";


	Form = document.createElement('div');

	Props = ruleMapViaId[conn.ruleId].typeProperties;

	formHeader = "<form id='update_connection_form'>";

	inputs += "<table class='table-responsive' id='update_connection_table' >";
	inputs += "<tr id='conntr'><th>Name</th><th>Min rel</th><th>Max Rel</th><th></th></tr>";
	inputs += "<tr class='connInfo'><td><input type='hidden' name ='connId' value='" + conn.id + "' />";
	inputs += "<input type='text' name ='name'  size='10' autofocus value='" + conn.name + "'/></td>";
	inputs += "<td><input type='number' name ='minRel' size='10'  value='" + conn.minRel + "'/></td>";
	inputs += "<td><input type='number' name ='maxRel' size='10'  value='" + conn.maxRel + "'/></td>";
	inputs += "<td></td></tr>";

	var rowtr = '';

	if (!$.isEmptyObject(Props)) {

		inputs += "<tr><th colspan='7' style='background-color: #CDEEDD'> Properties:</th></tr>";
		inputs += "<tr class='heading'><th>Name</th><th>Type</th><th>isMandatory</th><th>isUnique</th><th>Default Value</th> <th>Max Value</th><th>Min Value</th></tr>";

		$.each(Props, function(key, value2) {
			rowtr += "<tr class='propertiesFields'><td>";
			$.each(value2, function(key, value) {
				if (key == 'id') {
					idth += "<input type='hidden' name='id' value='" + value + "'>";
				}
				if (key == 'name') {
					nameth += "<input type='text' name='name' size='10'  value='" + value + "'/></td>";
				}
				if (key == 'isMandatory') {
					mandatoryth = "<td  style='text-align:center;'><input type='checkbox' name='" + key + "' ";
					if (value == true) {
						mandatoryth += "checked";
					}
					mandatoryth += "></td>";
				}
				if (key == 'isUnique') {
					uniqueth = "<td  style='text-align:center;'><input type='checkbox' name='" + key + "' ";
					if (value == true) {
						uniqueth += "checked";
					}
					uniqueth += "></td>";
				}

				if (key == 'propertyType') {
					typeth += "<td><select name='" + key + "'><option value='INTEGER' ";

					if (value == "INTEGER") {
						typeth += "selected='selected'";
					}
					typeth += ">INTEGER</option><option value='DOUBLE' ";

					if (value == "DOUBLE") {
						typeth += "selected='selected'";
					}
					typeth += ">DOUBLE</option><option value='DATE' ";

					if (value == "DATE") {
						typeth += "selected='selected'";
					}
					typeth += ">DATE</option><option value='STRING' ";

					if (value == "STRING") {
						typeth += "selected='selected'";
					}
					typeth += ">TEXT</option><option value='BOOLEAN' ";

					if (value == "BOOLEAN") {
						typeth += "selected='selected'";
					}
					typeth += ">BOOLEAN</option><option value='FILE' ";

					if (value == "FILE") {
						typeth += "selected='selected'";
					}
					typeth += ">FILE</option></select></td>";

				}
				if (key == 'maxValue') {
					maxth = "<td><input type='text' name='" + key + "' size='10'  value='" + value + "'  /></td>";
				}
				if (key == 'minValue') {
					minth = "<td><input type='text' name='" + key + "' size='10'  value='" + value + "' /></td>";
				}
				if (key == 'defaultValue') {
					defaultth = "<td><input type='text' name='" + key + "' size='10'  value='" + value + "' /></td>";
				}
			});
			rowtr = rowtr + idth + nameth + typeth + mandatoryth + uniqueth + defaultth + maxth + minth + "</tr>";
			inputs = inputs + rowtr;
			rowtr = '', idth = '', nameth = '', typeth = '',
			uniqueth = "<td  style='text-align:center;'><input type='checkbox' name='isUnique' value=''   /></td>",
			mandatoryth = "<td  style='text-align:center;'><input type='checkbox' name='isMandatory' value=''  /></td>",
			maxth = "<td><input type='text' name='maxValue' size='10'  value=''  /></td>",
			minth = "<td><input type='text' name='minValue' size='10' value=''  /></td>",
			defaultth = "<td><input type='text' name='defaultValue' size='10'  value=''  /></td>";
		});
	}

	// <!-- Allow form submission with keyboard without duplicating the dialog
	// button -->
	formFooter = "<tr><td><input type='button' value='ADD PROPERTY' class='btn btn-primary btn-xs'   onclick='CXTMenuFcts.showAddPropertyForConnection(" + conn.id + ")' /></td>";
	formFooter += "<td><input type='button'  value='UPDATE'     class='btn btn-primary btn-xs' onclick='CXTMenuFcts.updateConnectionProperties(form, " + conn.id + "," + conn.ruleId + ")'></td></tr><table></form>";
	formFooter += "<div id='error_connProps'></div>";
	Form.innerHTML = formHeader + inputs + formFooter;
	$('#typeForm2').empty();
	$('#typeForm2').append(Form);

}

CXTMenuFcts.showAddPropertyForConnection = function(connId) {

	var Form,
		Props,
		inputs = '';

	var conn = connMapViaId[connId];

	Form = document.createElement('div');
	Form.id = "tableProp"
	Form.innerHTML = "";

	var inputsTable = "";
	var headerTable = '';
	var footerTable = "";


	headerTable += "<form id='connProps' border='2'><div  id='connName'><label>Connection: </label> " + conn.name + "</span>" +
		"<input type='hidden' name='connId' value='" + connId + "'/><input type='hidden' name='ruleid' value='" + conn.ruleId + "'/><br/>";
	headerTable += "</div>";

	headerTable += "<div class='rTable'>";
	headerTable += "<div class='rTableRow'></div>";
	headerTable += "<div class='rTableRow'><div class='rTableCell' style='background-color: #CDEEDD'> Properties:</div></div>";
	headerTable += "<div class='rTableRow'><div class='rTableHead'>Name</div>" +
		"<div class='rTableHead'>Type</div>" +
		"<div class='rTableHead'>isMandatory</div>" +
		"<div class='rTableHead'>isUnique</div>" +
		"<div class='rTableHead'>Default Value</div>" +
		"<div class='rTableHead'>Max Value</div>" +
		"<div class='rTableHead'>Min Value</div>" +
		"<div class='rTableCellEmpty'><span class='table-add glyphicon glyphicon-plus'  onclick='CXTMenuFcts.addRowProperty()'></span></div>" +
		"</div>";

	inputsTable += "<div class='rTableRow' id='propertiesFields'>";
	inputsTable += "<div class='rTableCell'><input type='text' name='name' autofocus  size='10' /></div>";
	inputsTable += "<div class='rTableCell'><select name='propertyType' onchange='(new DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>"
		+ "<option value='STRING'>TEXT</option>"
		+ "<option value='INTEGER'>INTEGER</option>"
		+ "<option value='DOUBLE'>DOUBLE</option>"
		+ "<option value='DATE'>DATE</option>"
		+ "<option value='BOOLEAN'>BOOLEAN</option>"
		+ "<option value='FILE'>FILE</option>"
		//		+ "<option value='CURRENCY' disabled>CURRENCY</option>"
		//		+ "<option value='STATUS'  disabled>STATUS</option>"
		//		+ "<option value='PARENTVALUE' disabled >PARENTVALUE</option>"
		//		+ "<option value='CONCAT'  disabled>CONCAT</option>"
		+ "</select></div>";
	inputsTable += "<div class='rTableCell' style='text-align:center;'><input type='checkbox' name='isMandatory'></div>";
	inputsTable += "<div class='rTableCell' style='text-align:center;'><input type='checkbox' name='isUnique'></div>";
	inputsTable += "<div class='rTableCell'> <input type='text' name='defaultValue'  size='10' onkeypress='' value='' defaultValue='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></div>";
	inputsTable += "<div class='rTableCell'> <input type='text' name='maxValue' size='10'/></div>";
	inputsTable += "<div class='rTableCell'> <input type='text' name='minValue' size='10'/></div>";
	inputsTable += "<div class='rTableCell'></div>";
	inputsTable += "</div></div>";

	footerTable += "<div style='align-text:center'> <input id='save_conn_prop_button' type='button'  value='SAVE PROPERTIES'  class='btn btn-primary btn-xs' onclick='CXTMenuFcts.saveConnProperties(form)'>" ;
	footerTable += "<input type='button' value='CANCEL' class='btn btn-primary btn-xs' onclick='CXTMenuFcts.cancelConnProperties(" + connId + ");'></div>" +
		"</form>"
	footerTable += "<div id='error_connProps'></div>";
	Form.innerHTML = headerTable + inputsTable + footerTable;

	$('#typeForm2').empty();
	$('#typeForm2').append(Form);

}

CXTMenuFcts.cancelConnProperties = function(connId) {
	$("#typeForm2").empty();
	CXTMenuFcts.displayConnection(connId);
}

CXTMenuFcts.updateConnectionProperties = function(form, connId, ruleId) {
	var jsonData = {},
		foundError = false,
		oldName;
	$('#error_connProps').empty();
	var node = {};
	$(form).find('tr.connInfo').find(':input').each(function(i, field) {
		if ((field.name == 'connId') || (field.name == 'name') || (field.name == 'minRel') || (field.name == 'maxRel')) {
			if (field.name == 'name' && !field.value) {
				console.log("Missing Value for Connection Name.");
				$('#error_connProps').append("<br/>Missing Value for Connection name : ");
				foundError = true;
			}
			if ( (field.name == 'minRel' || field.name == 'maxRel') ) {
				if (!field.value) {
					jsonData[field.name] = null;
				} else {
					jsonData[field.name] = Number(field.value);
				}
			} else {
				jsonData[field.name] = field.value;
			}

		}
	});

	oldName = connMapViaId[connId].name;
	
	jsonData = GlobalApiUtils.assignApiHeaders( jsonData );
	jsonData["id"] = Number(connId);

	console.log(jsonData);
	if (!foundError) {
		// update connection name 
		var doneFunction = function(data) {
			tdvCy.remove('edge[id = "connection' + connId + '"]');
			delete connMapViaId[connId];
			delete connMap[oldName];
			
			var element = DesignCytoscapeUtils.formatNewConnection(data);
			ConnectionPropertyUtils.updateConnGraph(tdvCy, element);
		};

		var failFunction = function(xhr, status, error) {
			console.log('Error Update Connection not done: ' + xhr.status);
			CommonFctsLogical.HandlingErrorMSG("error in update Connection-- API failed", "error");
			return;
		};

		var apis = new ConnectionApis();
		apis.saveUpdateConnectionById(jsonData, doneFunction, failFunction);

		console.log(jsonData);


		var props = [];
		listErrorsFromRetrieval = [];
		var foundEmptyPropName = false;
		var jsonData2 = {};
		var ruleProperties = [];
		var jsonProperty = {};

		$(form).find('tr.propertiesFields').each(function(i, propDiv) {
			$(propDiv).find(':input').each(function(i, field) {
				if (field.type != 'button') {

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
							if (field.name == 'name' && $.isEmptyObject(field.value)) {
								listErrorsFromRetrieval.push("Property name can not be empty");
								foundEmptyPropName = true;
							}
							if (field.name == 'name') {
								var error = false;
								error = CommonFctsLogical.verifyPropertiesName(field.value, props);
								if (error) {
									listErrorsFromRetrieval.push("Property  name <b>'" + field.value + "'</b> duplicate");
									foundEmptyPropName = true;
								}
							}
							jsonProperty[field.name] = field.value;
						}
					}
				}
			});
			ruleProperties.push(jsonProperty);
			props.push(jsonProperty);
			jsonProperty = {};
		});

		if (foundEmptyPropName) {
			console.log("can not complete update  process");
			console.log(props);
			$('#error_connProps').append(listErrorsFromRetrieval.join('<br/>'));
			return;
		}

		var retproperties = [];
		var jsonDatarule = {};
		error = false;
		$.each(ruleProperties, function(key, value) {
			jsonDatarule["updateProperty"] = value;
			jsonDatarule["ruleId"] = Number(ruleId);
			jsonDatarule["namespace"] = loggedInUserName;
			jsonDatarule["groupname"] = userGroup.name;
			jsonDatarule["grouphost"] = userGroup.host;
			var successFunction = function(data) {
				console.log("Rule Properties update success. data: " + data.rule.name);
				retproperties = data.rule.typeProperties;
			};

			var failFunction = function(xhr, status, error) {
				document.getElementById('error_connProps').append("Error Rule properties not updated");
				error = true;
			};

			var ruleapis = new RuleApis();
			ruleapis.updateRuleAndProperties(ruleId, jsonDatarule, successFunction, failFunction);
		});
		if (!error) {
			ruleMapViaId[ruleId].typeProperties = retproperties;
			CXTMenuFcts.cancelConnProperties(connId);
			CommonFctsLogical.updateRuleTooltip(ruleMapViaId[ruleId], connId);
			CommonFctsLogical.HandlingErrorMSG("Update connection successful", "success");
		}
	}

}

CXTMenuFcts.saveConnProperties = function(form) {

	var jsonData = {},
		ruleProperties = [],
		property = {},
		connId,
		ruleId;
	var foundEmptyPropName = false;
	var props = [];
	var first = true;
	// Retrieve type fields from form

	jsonData = GlobalApiUtils.assignApiHeaders( jsonData );
	
	$(form).find('div#connName').find(':input').each(function(i, field) {
		if (field.name == 'ruleid' || field.name == 'connId') {
			jsonData[field.name] = Number(field.value);
		}
	});
	connId = jsonData["connId"];
	ruleId = jsonData["ruleid"];
	
	if (!$.isEmptyObject(ruleMapViaId[ruleId].typeProperties)) {
		first = false;
		$.each(ruleMapViaId[ruleId].typeProperties, function(key, value) {
			props.push(value);
		});
	}
	listErrorsFromRetrieval = [];

	$("#error_connProps").empty();
	// Retrieve Type properties fields from the form
	$(form).find('div#propertiesFields')
		.each(function(i, propDiv) {
			$(propDiv).find(':input').each(
				function(i, field) {
					if (field.name == 'name' || field.name == 'propertyType' || field.name == 'isMandatory'
						|| field.name == 'isUnique' || field.name == 'defaultValue' || field.name == 'maxValue' || field.name == 'minValue') {
						if (field.name == 'isMandatory' || field.name == 'isUnique') {
							if (field.checked == true) {
								property[field.name] = 'true';
							} else {
								property[field.name] = 'false';
							}
						} else {
							if (field.name == 'name' && $.isEmptyObject(field.value)) {
								listErrorsFromRetrieval.push("Property name can not be empty<br/>");
								foundEmptyPropName = true;
							}
							if (field.name == 'name') {
								var error = false;
								error = CommonFctsLogical.verifyPropertiesName(field.value, props);
								if (error) {
									listErrorsFromRetrieval.push("Property  name <b>'" + field.value + "'</b> duplicate");
									foundEmptyPropName = true;
								}
							}

							property[field.name] = field.value;
						}

					}
				});
			ruleProperties.push(property);
			props.push(property);
			property = {};
		});
		// attach properties to JSON

	if (foundEmptyPropName) {
		console.log("can not complete saving process");
		console.log(props);
		$('#error_connProps').append(listErrorsFromRetrieval.join('<br/>'));
		return;
	}

	jsonData["fields"] = ruleProperties;
	props = [];
	console.log(jsonData);
	var successFunction = function(data) {
		if (!$.isEmptyObject(data)) {
			CommonFctsLogical.HandlingErrorMSG("Rule Properties for " + data.name + " added successfully.", "success");

			// on success on a new property for a rule, we just want to update the property list
			ruleMapViaId[ruleId].typeProperties = data.typeProperties;
			console.log("returned properties" + data.typeProperties)

			if (first) {
				CommonFctsLogical.addRelTooltip(connId, ruleId);
			} else {
				CommonFctsLogical.updateRuleTooltip(ruleMapViaId[ruleId], connId);
			}
			CXTMenuFcts.cancelConnProperties(connId);
			//$("[data-id=rule" + data.id + "]").parent().parent().parent().css({"display" : "none"});

		}

	};

	var failFunction = function(xhr, status, error) {
		$('#error_connProps').append("Error Rule properties not saved" + xhr.responseJSON);
		CommonFctsLogical.HandlingErrorMSG("Rule Properties Failed to be added for :" + ruleMapViaId[ruleId].name, "error");
	};

	var connApis = new ConnectionApis();
	
	connApis.addRuleProperties(jsonData, successFunction, failFunction);

}

//==========================================================================================//

CXTMenuFcts.findInstancesForType = function(typeId) {
	// verify if type has instances
	var jsonData = {};
	var nbInstances = 0;
	
	jsonData = GlobalApiUtils.assignApiHeaders( jsonData );
	jsonData["typeId"] = Number(typeId);
		
	var successFunction = function(data) {
		if (!$.isEmptyObject(data) && !$.isEmptyObject(data.nodes)) {
			nbInstances = data.nodes.length;
		}
	}

	var failFunction = function(xhr, status, error) {
		console.log("Not able to load Nodes under this type Error:: " + xhr.responseText);
	}

	var apis = new TypeApi();
	apis.getAllNodesFromType(jsonData, successFunction, failFunction);
	return nbInstances;
}

CXTMenuFcts.findEdgesForConnection = function(connId) {
	// verify if type has instances
	var jsonData = {};
	var nbInstances = 0;

	jsonData = GlobalApiUtils.assignApiHeaders( jsonData );
	jsonData["connectionId"] = connId;

	var successFunction = function(data) {
		if (!$.isEmptyObject(data) && !$.isEmptyObject(data.relationships)) {
			nbInstances = data.relationships.length;
		}
	}

	var failFunction = function(xhr, status, error) {
		console.log("Not able to load Edges from this connection Error:: " + xhr.responseText);
	}

	var apis = new TypeApi();
	apis.getAllEdgesFromConnection(jsonData, successFunction, failFunction);
	return nbInstances;
}