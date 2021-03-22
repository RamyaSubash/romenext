/**
 * This is used to generate a list of properties for a connection (actually RULE)
 */
function ConnectionPropertyUtils() {
}
;


ConnectionPropertyUtils.showOrHideAllConnectionPropertiesDetails = function(connId) {

	var connPropDetailButton = document.getElementById('connection_prop_detail_button_' + connId);

	var props = ruleMapViaId[connMapViaId[connId].ruleId].typeProperties;
	var propDetailHide = null

	for (var key in props) {
		var propId = props[key].id;
		var connDetail = 'connection_prop_detail_' + propId;
		var propDetailHide = document.getElementById(connDetail).style.display == "none";
		if (propDetailHide == true) {
			$("#" + connDetail).show();
		} else {
			$("#" + connDetail).hide();
		}
	}

	if (propDetailHide == true) {
		connPropDetailButton.value = "Hide Details";
	} else {
		connPropDetailButton.value = "Show Details";
	}

};

//====================================== Function related to Connection ===================================
ConnectionPropertyUtils.createConnection = function(connClassification, event) {

	if (connClassification == "parentchild") {

		if (creatingConnection == false) {

			// get all previously selected types, links and connections -- clear these	
			DesignSavingFcts.clearSelection();
			DesignLogicalBarRender.resetSpanBorderInBar();
			$(".sidebotnav").empty();
			// make links invisible and unselectable
			tdvCy.nodes().removeClass('semitransp');
			tdvCy.nodes().selectify();
			var eles = tdvCy.nodes().filter("[classification = 'link']");
			eles.unselectify();
			eles.addClass('semitransp');
			tdvCy.edges().addClass('semitransp');
			tdvCy.edges().unselectify();

			// reinitialise where to keep the two types
			originType = null;
			destType = null;
			creatingConnection = true;
			ruleSelected = true; // to differentiate between single click and double click
			createRuleClassification = connClassification;
			linkSelected = null;
			selectedElement = null;

			// set the cursor
			GlobalUtils.cursor_wait();
			document.getElementById("create_PC").className = "btn btn-default text-center";
			$("#besideMouse").html("<span class='badge'>Select First Type</span>");
			ConnectionPropertyUtils.mouseText(event);

		} else {

			CommonFctsLogical.HandlingErrorMSG("Process of PC Creation -- Aborted", "error");
			DesignSavingFcts.clearSelection();

			creatingConnection = false;
			ruleSelected = false;
			originType = null;
			destType = null;
			createRuleClassification = null;
			linkSelected = null;
			selectedElement = null;

			mouseEventTime = new Date().getTime();
			pleaseWait = true;
			tdvCy.nodes().removeClass('semitransp');
			GlobalUtils.cursor_clear();
			$("#besideMouse").html("");
			ConnectionPropertyUtils.mouseText(event);
			document.getElementById("create_PC").className = "btn btn-primary text-center";
		}

	} else {
		console.log("Wrong Connection Classification: " + connClassification);
	}

};

ConnectionPropertyUtils.mouseText = function(event) {
	if (ruleSelected) {
		e = event || window.event;
		var pageX = e.pageX;
		var pageY = e.pageY;
		//		console.log(pageX, pageY);
		var cpos = {
			top : e.pageY + 10,
			left : e.pageX + 10
		};
		$(document).mousemove(function(e) {
			// needed for moving position
			var cpos = {
				top : e.pageY + 10,
				left : e.pageX + 10
			};
			$('#besideMouse').offset(cpos);

		});
	}
}

ConnectionPropertyUtils.mouseTextCreate = function(event) {
	if (typelinkCreate) {
		e = event || window.event;
		var pageX = e.pageX;
		var pageY = e.pageY;
		console.log(pageX, pageY);
		var cpos = {
			top : e.pageY + 10,
			left : e.pageX + 10
		};
		$(document).mousemove(function(e) {
			var cpos = {
				top : e.pageY + 10,
				left : e.pageX + 10
			};
			$('#besideMouseCreate').offset(cpos);
		});
	}
}

// using New API
ConnectionPropertyUtils.saveNewConnection = function(origin, destination) {

	var connId = null;

	var jsonData = {};
	if (origin == null || destination == null || createRuleClassification == null) {
		console.log("Cannot create Connection missing origin/destination types or classification");
	} else {
		
		jsonData = GlobalApiUtils.assignApiHeaders( jsonData );		
		jsonData['originId'] = parseFloat(origin);
		jsonData['destinationId'] = parseFloat(destination);
		jsonData['ruleClassification'] = createRuleClassification;
		
		console.log(JSON.stringify(jsonData));

		var doneFunction = function(data) {
			// console.log(data.rule);
			if (!jQuery.isEmptyObject(data) && !jQuery.isEmptyObject(data.connection)) {
				
				var element = DesignCytoscapeUtils.formatNewConnection(data.connection);
				ConnectionPropertyUtils.updateConnGraph(tdvCy,  element );
				
				var rule = ConnectionPropertyUtils.getRuleFromId(data.connection.ruleId);
				if (rule) {
					ruleMapViaId[data.connection.ruleId] = rule;
				}
				connId = data.connection.id;
				DesignSavingFcts.clearSelection();
				tdvCy.filter("edge[id='connection" + connId + "']").select();
			}
		};

		var failFunction = function(xhr, status, error) {
			console.log('Error Connection not created: ' + xhr.status);
		};

		var apis = new ConnectionApis();
		apis.saveNewConnectionAPI(jsonData, doneFunction, failFunction);
	}
}

//===================================== SHOW  CONNECTION/LINK PROPERTIES ===================================//
ConnectionPropertyUtils.showConnRuleProperties = function(connId) {

	var conn = connMapViaId[connId];
	var formHeader = "<form><table>";
	var inputs = "";

	// generate the properties fields
	var props = ruleMapViaId[conn.ruleId].typeProperties;

	if (props == null || props.length == 0 || $.isEmptyObject(props)) {
		inputs += "<tr><th colspan='2'> No properties added </th></tr>";
	} else {
		inputs += "<tr><th style='background-color: #CDEEDD'>Properties:</th>";
		inputs += "<td><input id='connection_prop_detail_button_" + conn.id + "' type='button' value='Show Details' class='btn btn-primary btn-xs' onclick='ConnectionPropertyUtils.showOrHideAllConnectionPropertiesDetails(\"" + conn.id + "\");'/></td></tr>";
		inputs += "<tr style='background-color: grey'><th> Name</th><th>Type</th></tr>";
		$.each(props, function(key, value) {
			var newInput = ConnectionPropertyUtils.displayRuleProperty(value, null);
			inputs += newInput ;
		});

	}

	// build out footer 
	var footer = "";
	footer = "<tr><td><input type='button' value='ADD PROPERTY' class='btn btn-primary btn-xs' onclick='ConnectionPropertyUtils.addConnectionProperties(\"" + connId + "\");'/></td>";
	footer += "<td><input type='button' value='UPDATE' class='btn btn-primary btn-xs' onclick='ConnectionPropertyUtils.updateRuleConnection(\"" + connId + "\");'/>";
	footer += "</td></tr>";
	footer += "</table></form>";

	var form = document.createElement('div');
	form.innerHTML = formHeader + inputs + footer;
	return form;
};

ConnectionPropertyUtils.displayRuleProperty = function(property, displayFunction) {
	console.log("Inside  ConnectionPropertyUtils.displayTypeProperty   ");
	var inputs = "";

	if (displayFunction == null) {
		// generate the properties fields
		console.log("Generate properties fields ");
		if (property == null) {
		} else {
			if (property.isMandatory == true) {
				inputs += "<tr><td style='color:red'>" + property.name + "</td>";
			} else {
				inputs += "<tr><td>" + property.name + "</td>";
			}
			if (property.propertyType == 'STRING') {
				inputs += "<td>TEXT</td>";
			} else {
				inputs += "<td>" + property.propertyType + "</td>";
			}

			inputs += "</tr>";
			inputs += "<tr><td><table id='connection_prop_detail_" + property.id + "' style='display:none'>";
			inputs += "<tr><th>Mandatory</th><th>Unique</th></tr>";
			inputs += "<tr>";
			inputs += "<td>" + property.isMandatory + "</td>";
			inputs += "<td>" + property.isUnique + "</td>";
			inputs += "</tr>";

			inputs += "<tr><th>Min</th><th>Max</th></tr>";
			inputs += "<tr>";
			if (property.minValue) {
				inputs += "<td>" + property.minValue + "</td>";
			} else {
				inputs += "<td>...</td>";
			}
			;
			if (property.maxValue) {
				inputs += "<td>" + property.maxValue + "</td>";
			} else {
				inputs += "<td>...</td>";
			}
			;
			inputs += "</tr>";

			inputs += "<tr><th>Default</th></tr>";
			inputs += "<tr>";
			if (property.defaultValue) {
				inputs += "<td style='diaplay:none;'>" + property.defaultValue + "</td>";
			} else {
				inputs += "<td>...</td>";
			}
			;
			inputs += "</tr></table></td><tr>";
		}

	} else {
		return displayFunction(null, property);
	}

	return inputs;
};

//==================================ADDING PROPERTY FOR EDGE LINK =======================================//
ConnectionPropertyUtils.addConnectionProperties = function(connId) { // the selected name of the type is
	// saved in the Global variable

	var conn = connMapViaId[connId];
	var Form,
		formHeader,
		formFooter,
		newProperty,
		properties,
		inputs = '';
	Form = document.createElement('div');

	formHeader = "<form id='connectionProps'  method='post'>";
	inputs += "<div id='connPropAddDiv'><label>Rule Selected: </label>"
		+ conn.name + "<input type='hidden' name='connid' value='"
		+ conn.id + "'/>" + "<input type='hidden' name='connname' value='"
		+ conn.name + "'/><input type='hidden' name='ruleid' value='" + conn.ruleId + "'/></div>";
	inputs += "<button type='button' class='btn btn-primary btn-xs'   onclick='ConnectionPropertyUtils.addProperties()'>Add Property</button>";

	formFooter = "<div id='propertiesFields'></div>";
	formFooter += "<div><input id='save_conn_prop_button' type='button' value='SAVE properties'  class='btn btn-primary btn-xs' onclick='ConnectionPropertyUtils.saveConnProperties(form)'>";
	formFooter += "<input id='cancel_conn_prop_button' type='button' value='CANCEL'  class='btn btn-primary btn-xs' onclick='ConnectionPropertyUtils.cancelUpdateConn(\"" + conn.id + "\");'></div></form>";

	Form.innerHTML = formHeader + inputs + formFooter;

	$('#typeForm').empty();
	$('#typeForm').append(Form);

	newProperty = document.createElement('div');
	properties = "<hr/><table>";

	properties += "<tr><th>Name & Type:</th><td><input type='text' name='name' size='10' />";
	properties += "<select name='propertyType' onchange='(new DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>"
		+ "<option value='STRING'>TEXT</option>"
		+ "<option value='INTEGER'>INTEGER</option>"
		+ "<option value='DOUBLE'>DOUBLE</option>"
		+ "<option value='DATE'>DATE</option>"
		+ "<option value='BOOLEAN'>BOOLEAN</option>"
		+ "<option value='FILE'>FILE</option>"
		//		+ "<option value='CURRENCY' disabled>CURRENCY</option>"
		//		+ "<option value='STATUS' disabled>STATUS</option>"
		//		+ "<option value='PARENTVALUE' disabled>PARENTVALUE</option>"
		//		+ "<option value='CONCAT' disabled>CONCAT</option>"
		+ "</select></td></tr>";
	properties += "<tr><th> isMandatory:</th><td>";
	properties += "<input type='checkbox' name='isMandatory'>";
	properties += "</td></tr>";
	properties += "<tr><th> isUnique: </th><td>";
	properties += "<input type='checkbox' name='isUnique'>";
	properties += "</td></tr>";
	properties += "<tr><th>Default Value:</th><td> <input type='text' size='10' name='defaultValue' size='10' onkeypress='' value='' defaultValue='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></td></tr>";
	properties += "<tr><th>Max Value:</th><td> <input type='text' size='10' name='maxValue' /></td></tr>";
	properties += "<tr><th>Min Value:</th><td> <input type='text' size='10' name='minValue' /></td></tr></table>";

	newProperty.innerHTML = properties;

	document.getElementById('propertiesFields').appendChild(newProperty);
	if (document.getElementById('propertiesFields').innerHTML != '') {
		document.getElementById("save_conn_prop_button").style.visibility = 'visible';
	}
}

ConnectionPropertyUtils.addProperties = function() {
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
		//			+ "<option value='CURRENCY' disabled>CURRENCY</option>"
		//			+ "<option value='STATUS' disabled>STATUS</option>"
		//			+ "<option value='PARENTVALUE' disabled>PARENTVALUE</option>"
		//			+ "<option value='CONCAT' disabled>CONCAT</option>"
		+ "</select></td></tr>";
	properties += "<tr><th> isMandatory:</th><td>";
	properties += "<input type='checkbox' name='isMandatory'>";
	properties += "</td></tr>";
	properties += "<tr><th> isUnique: </th><td>";
	properties += "<input type='checkbox' name='isUnique'>";
	properties += "</td></tr>";
	properties += "<tr><th>Default Value:</th><td> <input type='text' size='10' name='defaultValue' onkeypress='' value='' defaultValue='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></td></tr>";
	properties += "<tr><th>Max Value:</th><td> <input type='text' size='10'  name='maxValue' /></td></tr>";
	properties += "<tr><th>Min Value:</th><td> <input type='text' size='10' name='minValue' /></td></tr></table>";
	newProperty.innerHTML = properties;
	document.getElementById('propertiesFields').appendChild(newProperty);
}

ConnectionPropertyUtils.saveConnProperties = function(form) {

	var jsonData = {},
		connProperties = [],
		property = {},
		connname,
		connId,
		ruleId;
		// Retrieve type fields from form

	$(form).find('div#connPropAddDiv').find(':input').each(function(i, field) {
		jsonData[field.name] = field.value;
	});
	// remove typename from JSON
	connname = jsonData["connname"];
	connId = jsonData["connid"];
	ruleId = jsonData["ruleid"];
	delete jsonData['connname'];
	delete jsonData["connid"];

	var first = true;
	if (ruleMapViaId[ruleId].typeProperties.length > 0) {
		first = false
	}
	// grab the conn object
	var connObj = connMapViaId[connId];

	// Retrieve Type properties fields from form
	$(form).find('div#propertiesFields').find('div')
		.each(function(i, propDiv) {
			$(propDiv).find(':input')
				.each(function(i, field) {
					if ((field.type != 'submit' && field.type != 'radio' && field.type != 'button') || field.checked) {
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
			connProperties.push(property);
			property = {};
		});
		// attach properties to JSON

	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name;
	jsonData["namespace"] = loggedInUserName;
	jsonData["fields"] = connProperties;

	console.log(jsonData);
	var successFunction = function(data) {

		console.log("Rule Properties create success. data: " + data.name);
		// on success on a new property for a rule, we just want to update the property list
		ruleMapViaId[ruleId].typeProperties = data.typeProperties;

		var inputs = ConnectionPropertyUtils.showConnRuleProperties(connId);
		$('#typeForm').empty();
		$('#typeForm').append(inputs);
		console.log("connId is : " + connId);

		if (first) {
			CommonFctsLogical.addRelTooltip(connId, ruleId);
		} else {
			CommonFctsLogical.updateRuleTooltip(data, connId);
		}

		$("[data-id=connection" + connId + "]").parent().parent().parent().css({
			"display" : "none"
		});

	};

	var failFunction = function(xhr, status, error) {
		$('#typeForm').empty();
		document.getElementById('typeForm').textContent = "Error Rule properties not saved";

		$('#error_message').empty();
		$('#error_message').append("error in add properties for rule-- API failed")
	};

	var connApis = new ConnectionApis();
	connApis.addRuleProperties(jsonData, successFunction, failFunction);

}

//================================== UPDATING PROPERTY FOR EDGE LINK ====================================//
ConnectionPropertyUtils.updateRuleConnection = function(connId) {

	var conn = connMapViaId[connId];
	var Form,
		formHeader,
		formFooter;
	Form = document.createElement('div');

	formHeader = "<form id='update_connection_form'>";
	var inputs = "";

	inputs += "<table id='update_connection_table'>";
	inputs += "<tr><td colspan='2'><input type='hidden' name='id'  value='" + conn.id + "'></td></tr>";

	$.each(conn, function(key, value) {

		if (key == 'name') {
			inputs += "<tr><th>" + key + "</th><td><input type='text' name ='" + key + "' value='" + value + "'/></td></tr>";
		} else if (key == 'minRel' || key == 'maxRel') {
			inputs += "<tr><th>" + key + "</th><td><input type='number' name ='" + key + "' value='" + value + "'/></td></tr>";
		} else {
			if (key == 'ruleId')
				inputs += "<tr><td colspan='2'><input type='hidden' name='ruleId'  value='" + conn.ruleId + "'></td></tr>";
		}

	});

	var Props = ruleMapViaId[conn.ruleId].typeProperties;
	if (Props == null) {
		inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";
	} else {
		inputs += "<tr><th colspan='2' style='background-color: #CDEEDD'> Properties:</th></tr></table>";
		$.each(Props, function(key, value2) {
			inputs += "<table id='propertiesFields'>";
			$.each(value2, function(key, value) {
				if (key == 'id') {
					inputs += "<input type='hidden' name='id' value='" + value + "'>";
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
					inputs += ">FILE</option>" +
						//							"<option value='CURRENCY' ";
						//
						//					if (value == "CURRENCY") {
						//						inputs += "selected='selected'";
						//					}
						//					inputs += ">CURRENCY</option><option value='STATUS' ";
						//					if (value == "STATUS") {
						//						inputs += "selected='selected'";
						//					}
						//					inputs += ">STATUS</option><option value='CONCAT' ";
						//					if( value == "CONCAT"){
						//						inputs += "selected='selected'";
						//					}
						//					inputs += ">CONCAT</option>" +
						"</select></td></tr>";

				} else {
					if ((key == 'maxValue') || (key == 'minValue') || (key == 'defaultValue')) {
						inputs += "<tr><th>" + key + "</th><td><input type='text' size='10' name='" + key + "' value='" + value + "'/></td></tr>";
					}
				}
			});
			inputs += "<tr><td colspan='2'>---------------------------------</td></tr>";
		});
	}

	// <!-- Allow form submission with keyboard without duplicating the dialog button -->
	formFooter = "<tr><td><input type='button' id = 'update_conn_prop_button' value='UPDATE' class='btn btn-primary btn-xs' onclick='ConnectionPropertyUtils.saveUpdateRuleConnection(form)' /></td>";
	formFooter += "<td><input type='button'  value='CANCEL' class='btn btn-primary btn-xs' onclick='ConnectionPropertyUtils.cancelUpdateConn(\"" + conn.id + "\");'></td></tr><table></form>";
	Form.innerHTML = formHeader + inputs + formFooter;

	$('#typeForm').empty();
	$('#typeForm').append(Form);
};

ConnectionPropertyUtils.cancelUpdateConn = function(connId) {
	$(".qtip").remove();
	tdvCy.filter("edge[id='connection" + connId.toString() + "']").unselect();
}

ConnectionPropertyUtils.saveUpdateRuleConnection = function(form) {

	var jsonData = {};
	var connProperties = [],
		jsonProperty = {},
		foundError = false;
	$(form).find('table#update_connection_table').find(':input').each(function(i, field) {
		if ((field.type != 'submit') && (field.type != 'radio') || field.checked) {
			if ((field.name == 'ruleId') || (field.name == 'id') || (field.name == 'name') || (field.name == 'minRel') || (field.name == 'maxRel')) {
				if (field.name == 'name' && !field.value) {
					console.log("Missing Value for Connection Name.");
					$('#typeForm').append("<br/>Missing Value for Connection name : ");
					foundError = true;
				}
				if ((field.name == 'minRel' || field.name == 'maxRel') && !field.value) {
					jsonData[field.name] = null;
				} else {
					jsonData[field.name] = field.value;
				}
			}
		}
	});

	jsonData = GlobalApiUtils.assignApiHeaders( jsonData );
	
	console.log(jsonData);
	if (!foundError) {
		var connId = jsonData["id"];
		var ruleId = jsonData["ruleId"];
		var connName = connMapViaId[connId].name;
		delete jsonData["ruleId"];
		var doneFunction = function(data) {

			tdvCy.remove('edge[id = "connection' + connId + '"]');
			delete connMapViaId[connId];                           // delete the connMapViaId one as well
			delete connMap[connName];

			var element  =  DesignCytoscapeUtils.formatNewConnection(data);
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

		var jsonData2 = {};

		var ruleProperties = [];
		var jsonProperty = {};
		$(form).find('table#propertiesFields').each(function(i, propDiv) {
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
							jsonProperty[field.name] = field.value;
						}
					}

				}
			});
			ruleProperties.push(jsonProperty);
			jsonProperty = {};
		});

		var retproperties = [];
		var jsonDatarule = {};
		var error = false;
		$.each(ruleProperties, function(key, value) {
			jsonDatarule = {};			
			jsonDatarule = GlobalApiUtils.assignApiHeaders( jsonDatarule );			
			jsonDatarule["updateProperty"] = value;
			jsonDatarule["ruleId"] = Number(ruleId);
			
			var successFunction = function(data) {

				console.log("Rule Properties update success. data: " + data.rule.name);
				retproperties = data.rule.typeProperties;

			};

			var failFunction = function(xhr, status, error) {
				document.getElementById('typeForm').append("Error Rule properties not updated");
				error = true;
			};

			var ruleapis = new RuleApis();
			ruleapis.updateRuleAndProperties(ruleId, jsonDatarule, successFunction, failFunction);

		});

		if (!error) {
			ruleMapViaId[ruleId].typeProperties = retproperties;

			var inputs = ConnectionPropertyUtils.showConnRuleProperties(connId);
			$('#typeForm').empty();
			$('#typeForm').append(inputs);
			CommonFctsLogical.updateRuleTooltip(ruleMapViaId[ruleId], connId);
		}
	}

};

//======================================================================================================//
ConnectionPropertyUtils.updateConnGraph = function(cy, elements) {
	console.log(elements);
	var newElements = cy.add(elements);
	DesignCytoscapeUtils.attachRuleConnClickActions(newElements.filter('edge'));
	if (layoutStatus == 0) {
		console.log("update graph with connection  using preset layout!");
		cy.layout({
			name : 'preset',
			fit : false
		})
	} else {
		console.log("update graph with connection using default layout !");
		cy.layout(defaultLayout);
	}
};

ConnectionPropertyUtils.getRuleFromId = function(ruleId) {
	var jsonData = {};
	var res = null;
	if (ruleId == null) {
		console.log("No ruleId passed");
		return null;
	} else {
		
		jsonData = GlobalApiUtils.assignApiHeaders( jsonData );
		jsonData['ruleId'] = ruleId;
		console.log(JSON.stringify(jsonData));
		
		var doneFunction = function(data) {
			if (data != null) {
				res = data.rule;
			}
		};
		var failFunction = function(xhr, status, error) {
			console.log('Can not retrieved rule from ruleId: ' + xhr.status);
		};
		var apis = new RuleApis();
		apis.getRuleAPI(jsonData, doneFunction, failFunction);
	}
	return res;

}

ConnectionPropertyUtils.deleteConnection = function(connection) {
	if (!$.isEmptyObject(connection)) {
		var jsonData = {};
		var apis;
		jsonData["connectionId"] = Number(connection.id);

		jsonData["grouphost"] = userGroup.host;
		jsonData["groupname"] = userGroup.name;
		jsonData["namespace"] = loggedInUserName;

		var conName = connection.name;
		var conId = connection.id;
		console.log(jsonData);

		if (connection.classification == 'link') {
			apis = new LinkApis();
		} else {
			apis = new ConnectionApis();
		}
		var doneFunction = function(data) {
			if (data) {
				console.log(data);
				CommonFctsLogical.HandlingErrorMSG("Connection Deleted successfully", "success");
				delete connMapViaId[conId];
				delete connMap[conName];

				$("[data-id=connection" + conId + "]").parent().parent().parent().remove();
				tdvCy.$("#connection" + conId).remove();
			}

		};

		var failFunction = function(xhr, status, error) {
			console.log('Error Delete Connection not done: ' + xhr.status);
			CommonFctsLogical.HandlingErrorMSG("Error Delete Connection not done-- API failed", "error");

		};

		apis.deleteConnectionAPI(jsonData, doneFunction, failFunction);
	}
}