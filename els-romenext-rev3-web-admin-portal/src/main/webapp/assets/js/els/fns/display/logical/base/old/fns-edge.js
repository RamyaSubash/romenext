/**
 *  Edge functions
 * Author:	Baya Benrachi
 * Date: 	18 April 2016
 * Update:  26 April 2016
 */
//=============================================================================================

function showUpdateEdgePropertiesDialog(edge) {
	
	$("#grid-instances").css({'visibility':'visible'});
	
	var Form = document.createElement('div');
	var edgeData =[];
	
	edgeData = edge;
	console.log(edgeData);
	var formHeader = "<form id='updateEdgeDialog'>", inputs = "";
	inputs += "<table id='updateEdgeTable'>";
	$.each(edgeData, function(key, value){
		$.each(value,function (i, field){
			  if(i == 'type') {
				  inputs += "<tr><th><input type='hidden' name='rule'  value='"+ field+"'>" + i+" :</th><td> '"+ field+"' </td></tr>";	
			 } else {
						if (i == 'properties'){
							inputs += "</table><table id='edgeProperties'>";
							inputs += "<tr><th colspan='3' style='background-color: grey'> Properties:</th><tr>";
							inputs +="<tr><th>Name</th><th>Type</th><th>Value</th</tr> ";
							field.forEach(function (prop){
								inputs += "<tr id='props'><th><input  size='6' type='text' name='propertyName' value='" + prop.name + "' disabled></th>";
								inputs += "<td><input size='6' type='text'  name='propertyType' value='" + prop.propertyType + "' disabled></td>";
								inputs += "<input type='hidden' name='value' value='" + prop.value + "'>";
								if (prop.name == 'uuid'){ 
									inputs += "<td><input size='6' type='text' name='newValue' value='" + prop.value + "' disabled></td>";
								} else if (prop.name == 'edge_classification') {
									inputs += "<td><input size='6' type='text' name='newValue' value='" + prop.value + "' disabled></td>";
								} else {
								     inputs += "<td><input size='6' type='text' name='newValue' value='" + prop.value + "'></td>";
								}
								inputs += "</tr>";
							});
						}
						else {
							  if (i == 'origin'){
//								  inputs += "<input type='hidden' name='originType'  value='"+ field+"'>";
								  inputs += "<input type='hidden' name='originType'  value='"+ typeMap[field].id+"'>";
							  }
							  else if(i == 'destination'){
//								  inputs += "<input type='hidden' name='destinationType'  value='"+ field+"'>";
								  inputs += "<input type='hidden' name='destinationType'  value='"+ typeMap[field].id+"'>";
							  }
						}
		     }
		});
	});
	

    var formFooter = "</table></form>";
    formFooter += "<input type='button' value='Update Edge'  class='btn btn-primary btn-sm'  onclick='updateEdgeProperties(form)' />";
    formFooter += "<input type='button' value='Cancel'       class='btn btn-primary btn-sm'  onclick='cancelInstForm()' />";
	Form.innerHTML = formHeader + inputs + formFooter;
	(new DisplayLogicalRenderer()).emptyAllInst();
	$('#nodeForm').append(Form);
	
}

//==============================================================================
//========================================== ADD Edge ==========================
////==============================================================================
//function showAddEdgeDialog() {
//	if (selectedMetaData != null){
//		var dlg_width = 400, dlg_height = 50, dlg_offset_x = 300, dlg_margin_top = 300;
//		var dialog = $('#dialog');
//		
//		dialog.dialog({
//			width : dlg_width,
//			autoOpen : false,
//			position : {
//				my : "center center",
//				at : "center center",
//				of : "#gvTabContent"
//			},
//			buttons : {
//				"Add Edge" : function() {
//					saveNewEdge(dialog.find("form"));
//				},
//				Cancel : function() {
//					dialog.dialog("close");
//				}
//			}
//		});
//		
//		if (!hasMoved && dialog.dialog("instance")) {
//			grayOut(true);
//	
//			var formHeader = "<form id='addEdgeDialog'>", inputs = "";
//			//  Given origin type and destination type 
//			
//			var typeDropdownList = "";
//			$.each(typeMap, function(i, type) {
//				typeDropdownList += "<option  value='" + type.name + "'>" + type.name + "</option>";
//			});
//			
//			inputs += "<div id='typeName'><label> Select Origin Type: <select name='originTypeName' onclick='getNodeInstances(this.value, 1);getConnectionsByTypes();'>";
//			inputs += typeDropdownList;
//			inputs += "</select></label></div>";
//			inputs += "<div id='nodeInstancesOrigin'></div>";
//			
//			
//			inputs += "<div id='typeName'><label> Select Destination Type: <select name='destinationTypeName' onclick='getNodeInstances(this.value,2);getConnectionsByTypes();'>";
//			inputs += typeDropdownList;
//			inputs += "</select></label></div>";
//			inputs += "<div id='nodeInstancesDestination'></div>";
//			
//			inputs += "<div id='edgeConnectionRule'></div>";
//			inputs += "<div id='edgeProperties'></div>";
//				
//			// <!-- Allow form submission with keyboard without duplicating the dialog button -->
//			var formFooter = "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px;' />";
//	
//			dialog.dialog("option", "title", "Add Edge");
//			dialog[0].innerHTML = formHeader + inputs  +formFooter ;
//			dialog.dialog("open");
//		}
//	
//	  dialog.find("form").on("submit", function(event) {
//	  	event.preventDefault();
//	  	getAllConnections(this);
//	  });
//	} else {
//		 $('#console-log').append("<p style='color:red'>Can not create Edge, You must First  select a Metadata</p>");
//		//alert("please select a MetaData Repo ");
//		}
//}
//=========================================================================================================

function addEdgeDialog() {
	
	$("#grid-instances").css({'visibility':'visible'});
	var Form = document.createElement('div');
	if (selectedMetaData != null) {
		var oNodeId = null;
		nodeMap[originNode.value].properties.forEach(function(prop){
			if (prop.name == "name") {
				oNodeId = prop.value;
			}
		});
		if (!oNodeId) {
			oNodeId = originNode.value;
		}
		
		var dNodeId = null;
		nodeMap[destNode.value].properties.forEach(function(prop){
			if (prop.name == "name") {
				dNodeId = prop.value;
			}
		});
		if (!dNodeId) {
			dNodeId = destNode.value;
		}
		
		var formHeader = "<form id='addEdgeDialog'>", inputs = "";
		//  Given origin type and destination type 
		inputs += "<table>";
		inputs += "<tr><th><label>Origin: </th><td>"+originNode.type+"<input type='hidden' name='originTypeName' value='"+originNode.type+"'/><input type='hidden' name='originType' value='"+typeMap[originNode.type].id+"'/> </label></td></tr>";
		inputs += "<tr><td><label>Instance: </td><td>"+oNodeId+"<input type='hidden' name='originNodeUuid' value='"+originNode.value+"' disabled/></td></tr>";
		inputs += "<tr><td colspan='2'>-------------------</td>";
		inputs += "<tr><th><label>Destination: </th><td>"+destNode.type+"<input type='hidden' name='destinationTypeName' value='"+destNode.type+"'/><input type='hidden' name='destinationType' value='"+typeMap[destNode.type].id+"'/> </label></td></tr>";
		inputs += "<tr><td><label>Instance: </td><td>"+dNodeId+"<input type='hidden' name='destinationNodeUuid' value='"+destNode.value+"' disabled/></td></tr>";
		inputs += "<tr><td colspan='2'>-------------------</td>";
        inputs += "<tr><th>Rule used:</th><td>"+connSelected.name+"<input type='hidden' name='ruleName' value='"+connSelected.name+"'/></td></tr>";
//        inputs += "<tr><td><a href='#' onclick='getRulePropsByRuleName("+connName+")'>+ Add RulesProperties</a></td></tr>";
//		inputs += "<div id='edgeConnectionRule'></div>";
	    inputs += "<div id='edgeProperties'></div>";
	    
	    formFooter = "<tr><td><input type='button' value='Add Edge'  class='btn btn-primary btn-sm'   onclick='saveNewEdge(form)' /></td><td>";
	    formFooter += "<input type='button' value='Cancel'           class='btn btn-primary btn-sm' onclick='cancelEdgeCreation()' /></td></tr></table>";
		Form.innerHTML = formHeader + inputs + formFooter;
		(new DisplayLogicalRenderer()).emptyAllInst();
		$('#nodeForm').append(Form);
		
	} else {
		 $('#console-log').append("<p style='color:red'>Can not create an Edge, You must First  select a Metadata</p>");
		 }

}

//*********************************************************************************************************
//function getRulePropsByRuleName(ruleName){
function getRulePropsByRuleName(rule){
			
//	console.log(ruleList[ruleName]);
	var inputs = "";
	var ruleName =rule;
	$.ajax({
		type : 'GET',
		url : apiBaseUrl + 'rule/'+ ruleName + '/metadata/' + selectedMetaData ,
		dataType : 'json',
		contentType : 'application/json',
		cache : false,
		async : false,
		success : function(data) {
			console.log("Rule returned success. data: " + data);
			 $('#console-log').append("Rule returned success. data: " + data);
		},
		error : function(xhr, ajaxOptions, error) {
			console.log("Not Able to retrieve Rule Properties Error: "+ xhr.responseText);
			 $('#console-log').append("Not Able to retrieve Rule Properties Error: "+ xhr.status);
		}
	}).done(function(data) {
		console.log(data);
		var ruleProperties = data.rule.properties;
		inputs += "<table>"
		ruleProperties.forEach(function(ruleProperty){
			inputs += "<tr><th><input type='hidden' name='propertyName' value='"+ruleProperty.name+"'>" + ruleProperty.name + 
			"</th><td>: <input type='text' name='value' />(" + 
			ruleProperty.propertyType + ")<input type='hidden' name='propertyType' value='"+ruleProperty.propertyType+"'></td></tr>";
		});
		
		inputs += "</table>";
		document.getElementById('edgeProperties').innerHTML = inputs;
	});
}

// Changed  to read all properties type and values

//====================================================================================
//=================================  SAVE EDGE =======================================
function saveNewEdge(form) {
	var jsonData = {}, edgeProperties = [], edgeProperty = {};
	
	$(form).find(':input').each(function (i, field) {
		if ((field.type != 'submit' && field.type != 'radio' && field.type != 'button') || field.checked) {
			jsonData[field.name] = field.value;
		}
	});
	
	$(form).find('div#edgeProperties').find('tr').each(function (i, propDiv) {
		$(propDiv).find(':input').each(function(i, field){
			if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
				edgeProperty[field.name] = field.value;
			}
		});
		console.log(edgeProperty);
		edgeProperties.push(edgeProperty);
	    edgeProperty = {};
	});
	jsonData.edgeProperties = edgeProperties;
	
	console.log(jsonData);
	if (selectedMetaData != null){
		$.ajax({
			type : 'POST',
//			url : apiBaseUrl + 'edge/byrule/metadata/'+ selectedMetaData,
			url : apiBaseUrl + 'edge/metadata/'+ selectedMetaData,
			dataType : 'json',
			data : JSON.stringify(jsonData),
			contentType : 'application/json',
			cache : false,
			success : function(data) {
				console.log("Edge create success. data: "+data);
				$('#console-log').append("Edge create success. data: "+data);
				
				(new DisplayLogicalRenderer()).initRuleBarInst('ruleInstBar');
				updateInstanceGraph(irvCy, DisplayCytoscapeUtils.formatSingleEdge(data));
				(new DisplayLogicalRenderer()).emptyAllInst();
			//	updateGraph(irvCy, formatSingleResponse(data));
				
				if (selecteddecorator == 'Geo') {
					updateGeoMapWithEdge(data);
				}
				
			},
			error : function(xhr, ajaxOptions, error) {
				console.log('Error Edge not created: ' + xhr.responseText);
				$('#console-log').append("<p style='color:red'>Edge can not be created: " + xhr.status + "</p>");
				(new DisplayLogicalRenderer()).initRuleBarInst('ruleInstBar');
				
			}
		}).done(function(data) {
			console.log("Edge created ");
			
		});
	} else { 
		 $('#console-log').append("<p style='color:red'>Can not create an Edge, You must First  select a Metadata</p>");
		 cancelInstForm();
		 }	

}

//==============================================================================
//==========================================================================
function updateEdgeProperties(form) {
	var jsonData = {}; var edgeProperties = [], newEdgeProperties = [], property = {}, newproperty ={};
	$(form).find(':input').each(function (i, field) {
		if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
			jsonData[field.name] = field.value;
		}
	});
	
	console.log("First Retrieved this: "+jsonData);
	delete jsonData['newValue'];
	delete jsonData['value'];
	delete jsonData['propertyName'];
	delete jsonData['propertyType'];
	console.log(jsonData);
	
	// API will remove the uuid from newProperties
	$(form).find('table#edgeProperties').find('tr#props').each(function (i, propsTr) {
		$(propsTr).find(':input').each(function(i,field){
			if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
				if (field.name == 'value') { 
					  property[field.name] = field.value  
				} else if (field.name == 'newValue') { 
					   newproperty['value'] = field.value
				} else { 
					property [field.name] = field.value;
					newproperty[field.name] = field.value;
				}
			}
					
		});
		edgeProperties.push(property);
		newEdgeProperties.push(newproperty);
			property = {}; newproperty ={};
		
	});
	
	console.log("NEW Properties are : "+newEdgeProperties);
	console.log("OLD Properties are : "+edgeProperties);
	
	if (edgeProperties.length != 0 && newEdgeProperties.length != 0) {
		
		jsonData.edgeProperties = edgeProperties;
		jsonData.newProperties  = newEdgeProperties
		
		console.log(jsonData);
		if (selectedMetaData != null){
			$.ajax({
				type : 'PUT',
				url : apiBaseUrl + 'edge/metadata/' + selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(jsonData),
				contentType : 'application/json',
				cache : false,
				success : function(data) {
					console.log("Edge update success. data: " + data);
					$('#console-log').append("Edge update success. data: " + data);
					(new DisplayLogicalRenderer()).emptyAllInst();
				},
				error : function(xhr, ajaxOptions, error) {
					$('#console-log').append("Update Edge Properties Error: " + xhr.status);
					console.log("Update Edge Properties Error: "+ xhr.responseText);
				}
			}).done(function(data) {
				console.log(data);
			//	updateGraph(irvCy, formatSingleResponse(data));  not sure if this is needed
				
			});
		} else { 
			 $('#console-log').append("<p style='color:red'>Can not create an Edge, You must First  select a Metadata</p>");
		}
	
	}
	
}

function retrieveEdgeProperties(edge) {
	if (selectedMetaData != null){
		
		console.log(edge);
		var jsonData = {}, propertyEdge = {}, properties = [];
	  
		var uuid = null
		
		$.each(edge.data(), function(key, value) {
			if (key == "properties") {
				value.forEach(function(property){
					 if(property.name == 'uuid') {
						 propertyEdge = {propertyName : property.name,
						                 propertyType : "STRING",
						                 value : property.value};
						 uuid = property.value;
					 }
				})
			} // else if(key == 'name') {  jsonData['rule']= value}
		});
	
		jsonData['connection'] = edgeMap[uuid].connectionId;
		
		properties.push(propertyEdge);
	    jsonData.edgeProperties =properties;
		console.log(jsonData);
	
		var edgeRequest =$.ajax({
			type : 'POST',
			url : apiBaseUrl + 'edge/simplified/metadata/' + selectedMetaData,
			data : JSON.stringify(jsonData),
			dataType : 'json',
			contentType : 'application/json',
			cache : false,
			error : function(xhr, ajaxOptions, error) {
				return null;
			}
		});
		edgeRequest.done(function(data) {
			console.log(data);
			showUpdateEdgePropertiesDialog( data);	
		});
	}

}

//function addEdgeDialog() {
//if (selectedMetaData != null){
//	var dlg_width = 400, dlg_height = 50, dlg_offset_x = 300, dlg_margin_top = 300;
//	var dialog = $('#dialog');
//	
//	dialog.dialog({
//		width : dlg_width,
//		autoOpen : false,
//		position : {
//			my : "center center",
//			at : "center center",
//			of : "#gvTabContent"
//		},
//		buttons : {
//			"Add Edge" : function() {
//				saveNewEdge(dialog.find("form"));
//			},
//			Cancel : function() {
//				dialog.dialog("close");
//			}
//		}
//	});
//	
//	if (!hasMoved && dialog.dialog("instance")) {
//		grayOut(true);
//
//		var formHeader = "<form id='addEdgeDialog'>", inputs = "";
//		//  Given origin type and destination type 
//		inputs += "<table>";
//		inputs += "<tr><th><label>Origin Type is: </th><td>"+originNode.parent+"<input type='hidden' name='originTypeName' value='"+originNode.parent+"'/> </label></td></tr>";
//		inputs += "<tr><td><label> Node instance : </td><td><input type='hidden' name='originNodeUuid' value='"+originNode.value+"'/></td></tr>";
//		inputs += "<tr><td colspan='2'>-------------------</td>";
//		inputs += "<tr><th><label>Destination Type is: </th><td>"+destNode.parent+"<input type='hidden' name='destinationTypeName' value='"+destNode.parent+"'/> </label></td></tr>";
//		inputs += "<tr><td><label> Node instance : </td><td><input type='hidden' name='destinationNodeUuid' value='"+destNode.value+"'/></td></tr>";
//		inputs += "<tr><td colspan='2'>-------------------</td>";
//        inputs += "<tr><th> Rule Selected: </th><td>"+connSelected.name+"<input type='hidden' name='ruleName' value='"+connSelected.name+"'/></td></tr>";
//     //   inputs += "<tr><td><a href='#' onclick='getRulePropsByRuleName("+connName+")'>+ Add RulesProperties</a></td></tr>";
//
////		inputs += "<div id='edgeConnectionRule'></div>";
//	    inputs += "<div id='edgeProperties'></div>";
//			
//		// <!-- Allow form submission with keyboard without duplicating the dialog button -->
//		var formFooter = "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px;' />";
//
//		dialog.dialog("option", "title", "Add Edge");
//		dialog[0].innerHTML = formHeader + inputs  +formFooter ;
//		dialog.dialog("open");
//	}
//
//  dialog.find("form").on("submit", function(event) {
//  	event.preventDefault();
//  	saveNewEdge(dialog.find("form"));
//  });
//} else {alert("please select a MetaData Repo ");}
//}


//*********************************************************************************************************
//function getNodeInstances(typeName, val){
////console.log(typeMap[typeName]);
//var inputs = "";
//
//$.ajax({
//	type : 'GET',
//	url : apiBaseUrl + 'node/all/'+ typeName + '/metadata/' + selectedMetaData,
//	dataType : 'json',
//	contentType : 'application/json',
//	cache : false,
//	success : function(data) {
//		console.log("Nodes Instance returned success. data: " + data);
//	},
//	error : function(xhr, ajaxOptions, error) {
//	}
//}).done(function(data) {
//	console.log(data);
//	var opts= "";
//	var Nodes = data.nodes;
//	Nodes.forEach(function(node){
//		var Props = node.properties;
//		Props.forEach(function(prop) {
//			if(prop.name=="uuid"){
//				opts += "<option value='" +prop.value + "'>"+prop.value+"</option>";
//			}
//		});	
//	});
//	
//	if(val == 1) { 
//		inputs += "<label>Select NodeOrigin</label><select name='originNodeUuid'>";
//		inputs += opts;
//		inputs +="</select><br/>";
//		document.getElementById('nodeInstancesOrigin').innerHTML = inputs;
//	} else {
//		inputs += "<label>Select NodeDestination</label><select name='destinationNodeUuid'>";
//		inputs += opts;
//		inputs +="</select><br/>";
//		document.getElementById('nodeInstancesDestination').innerHTML = inputs;
//	}
//});
//}


//*********************************************************************************************************
//function getConnectionsByTypes(){
//
//var inputs = "";
//
//var origTypeNames = $("select[name='originTypeName']")[0];
//var origTypeName = origTypeNames.options[origTypeNames.selectedIndex].value;
//
//var destTypeNames = $("select[name='destinationTypeName']")[0];
//var destTypeName = destTypeNames.options[destTypeNames.selectedIndex].value;
//
//
//$.ajax({
//	type : 'GET',
//	url : apiBaseUrl + 'connection/types/'+ origTypeName + '/' + destTypeName + '/metadata/' + selectedMetaData,
//	dataType : 'json',
//	contentType : 'application/json',
//	cache : false,
//	success : function(data) {
//		console.log("Connections returned success. data: " + data);
//	},
//	error : function(xhr, ajaxOptions, error) {
//		alert(xhr.status);
//		console.log("Not able to retrieve Connections Error: "+ xhr.responseText);
//		
//	}
//}).done(function(data) {
//	console.log(data);
//	var opts= "";
//	data.forEach(function(conn){
//		opts += "<option value='" +conn.type + "'>"+conn.type+"</option>";	
//	});
//	inputs += "<label>Select Rule: <select name='ruleName' onclick='getRulePropsByRuleName(this.value)'>";
//	inputs += opts;
//	inputs +="</select></label><br/>";
//	document.getElementById('edgeConnectionRule').innerHTML = inputs;
//});
//}



//function showUpdateEdgePropertiesDialog(edge) {
//	var edgeData =[];
//	var dlg_width = 400, dlg_height = 50, dlg_offset_x = 300, dlg_margin_top = 300;
//	var dialog = $('#dialog');
//	
//	dialog.dialog({
//		width : dlg_width,
//		autoOpen : false,
//		position : {
//			my : "center center",
//			at : "center center",
//			of : "#gvTabContent"
//		},
//		buttons : {
//			"Update Edge" : function() {
//				updateEdgeProperties(dialog.find("form"));
//			},
//			Cancel : function() {
//				dialog.dialog("close");
//			}
//		}
//	});
//	if (!hasMoved && dialog.dialog("instance")) {
//		grayOut(true);
//		edgeData = edge;
//		console.log(edgeData);
//		var formHeader = "<form id='updateEdgeDialog'>", inputs = "";
//		
//		inputs += "<table id='updateEdgeTable'>";
//		
//		$.each(edgeData, function(key, value){
//			$.each(value,function (i, field){
//				  if(i == 'type') {
//					  inputs += "<tr><th><input type='hidden' name='rule'  value='"+ field+"'>" + i+" :</th><td> '"+ field+"' </td></tr>";	
//				 } else {
//							if (i == 'properties'){
//								inputs += "</table><table id='edgeProperties'>";
//								inputs += "<tr><th colspan='3' style='background-color: grey'> Properties:</th><tr>";
//								inputs +="<tr><th>Name</th><th>Type</th><th>Value</th</tr> ";
//								field.forEach(function (prop){
//									inputs += "<tr id='props'><th><input type='text' name='propertyName' value='" + prop.name + "' disabled></th>";
//									inputs += "<td><input type='text' name='propertyType' value='" + prop.propertyType + "' disabled></td>";
//									inputs += "<input type='hidden' name='value' value='" + prop.value + "'>";
//									if (prop.name == 'uuid'){ inputs += "<td><input type='text' name='newValue' value='" + prop.value + "' disabled></td>";}
//									else {
//									     inputs += "<td><input type='text' name='newValue' value='" + prop.value + "'></td>";
//									}
//									inputs += "</tr>";
//								});
//							}
//							else {
//								  if (i == 'origin'){
//									  inputs += "<input type='hidden' name='originType'  value='"+ field+"'>";}
//								  else if(i == 'destination'){
//									  inputs += "<input type='hidden' name='destinationType'  value='"+ field+"'>";
//								  }
//							}
//			     }
//			});
//		});
//		
// 
//      var formFooter = "</table></form>";
//					
//     
//		// <!-- Allow form submission with keyboard without duplicating the dialog button -->
//		 formFooter += "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px;' />";
//
//
//		dialog.dialog("option", "title", "Update Edge Properties");
//		dialog[0].innerHTML = formHeader + inputs + formFooter;
//		dialog.dialog("open");
//	}
//
//  dialog.find("form").on("submit", function(event) {
//  	event.preventDefault();
//  	updateEdgeProperties(this);
//  });
//	
//}

