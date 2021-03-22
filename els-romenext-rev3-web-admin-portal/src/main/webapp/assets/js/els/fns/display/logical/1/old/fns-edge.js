/**
 *  Edge functions
 * Author:	Baya Benrachi
 * Date: 	18 April 2016
 * Update:  26 April 2016
 */
//=============================================================================================

function showUpdateEdgePropertiesDialog(edge) {
    
	var edgeData =[];
	
	edgeData = edge;
	console.log(edgeData);

	$("#grid-instances").css({'visibility':'visible'});	
	(new DisplayLogicalRenderer()).emptyAllInst();
	var Form = document.createElement('div');
		
	var formHeader = "<form id='updateEdgeDialog'>", inputs = "";
	var formFooter = '';
	inputs += "<table id='updateEdgeTable'>";
	
	if($.isEmptyObject(edgeData)){
		inputs += '<tr><td>NO properties were defined</td></tr> ';
		
	}else {
	
		$.each(edgeData, function(key, value){
			$.each(value,function (i, field){
				  if(i == 'type') {
					  inputs += "<tr><th><input type='hidden' name='rule'  value='"+ field+"'>" + i+" :</th><td> '"+ field+"' </td></tr>";	
				 } else {
							if (i == 'ruleProperties'){
								inputs += "</table><table id='edgeProperties'>";
								inputs += "<tr><th colspan='3' style='background-color: grey'> Edge Properties:</th><tr>";
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
								  if (i == 'originTypeId'){
									  inputs += "<tr><td>Origin Type : </td><td><input type='hidden' name='originTypeId'  value='"+ field+"'>'"+typeMapViaId[field].name+"</td></tr>";
								  }
								  else if(i == 'destinationTypeId'){
									  inputs += "<tr><td>Destination Type : </td><td><input type='hidden' name='destinationTypeId'  value='"+ field+"'>'"+typeMapViaId[field].name+"</td></tr>";
								  }
							}
			     }
			});
		});
		if(!$.isEmptyObject(edgeData.ruleProperties)){
		    formFooter += "<tr><td><input type='button' value='Update Edge'  class='btn btn-primary btn-sm'  onclick='updateEdgeProperties(form)' /></td>";
		    formFooter += "<td><input type='button' value='Cancel'       class='btn btn-primary btn-sm'  onclick='cancelInstForm()' /></td></tr>";	
		}
	}
	
	formFooter += "</table></form>";
    
	Form.innerHTML = formHeader + inputs + formFooter;
	
	$('#nodeForm').append(Form);
	
}
//=========================================================================================================

function addEdgeDialog() {
	
	$("#grid-instances").css({'visibility':'visible'});
	var Form = document.createElement('div');
	if (selectedMetaData != null) {
		var oNodeName = null;
		
		oNodeName = NodeUtils.findNameInst(nodeMap[originNode.value]);
			
		var dNodeName = null;
		dNodeName = NodeUtils.findNameInst(nodeMap[destNode.value]);
		
		var formHeader = "<form id='addEdgeDialog'>", inputs = "";
		//  Given origin type and destination type 
		inputs += "<table>";
		inputs += "<tr><th><label>Origin: </th><td>"+originNode.type+"<input type='hidden' name='originTypeName' value='"+originNode.type+"'/><input type='hidden' name='originType' value='"+typeMap[originNode.type].id+"'/> </label></td></tr>";
		inputs += "<tr><td><label>Instance: </td><td>"+oNodeName+"<input type='hidden' name='originNodeUuid' value='"+originNode.value+"' disabled/></td></tr>";
		inputs += "<tr><td colspan='2'>-------------------</td>";
		inputs += "<tr><th><label>Destination: </th><td>"+destNode.type+"<input type='hidden' name='destinationTypeName' value='"+destNode.type+"'/><input type='hidden' name='destinationType' value='"+typeMap[destNode.type].id+"'/> </label></td></tr>";
		inputs += "<tr><td><label>Instance: </td><td>"+dNodeName+"<input type='hidden' name='destinationNodeUuid' value='"+destNode.value+"' disabled/></td></tr>";
		inputs += "<tr><td colspan='2'>-------------------</td>";
        inputs += "<tr><th>Rule used:</th><td>"+connSelected.name+"<input type='hidden' name='connection' value='"+connSelected.id+"'/></td></tr>";

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
		
		var successFunction = function( data ) {
			console.log("Edge create success. data: "+data);
			$('#console-log').append("Edge create success. data: "+data);
			
			(new DisplayLogicalRenderer()).initRuleBarInst('ruleInstBar');
			DisplayCytoscapeUtils.updateInstanceGraph (irvCy, DisplayCytoscapeUtils.formatSingleEdge(data));
			(new DisplayLogicalRenderer()).emptyAllInst();
			
			if (selecteddecorator == 'Geo') {
				updateGeoMapWithEdge(data);
			}
		};
		
		var failFunction = function( xhr, ajaxOptions, error ) {
			console.log('Error Edge not created: ' + xhr.responseText);
			$('#console-log').append("<p style='color:red'>Edge can not be created: " + xhr.status + "</p>");
			(new DisplayLogicalRenderer()).initRuleBarInst('ruleInstBar');
		};
		
		var edgeApi = new EdgeApis();
		edgeApi.saveEdge(jsonData, successFunction, failFunction);
	
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
	
	var edgeUuid = null;
		
	// API will remove the uuid from newProperties
	$(form).find('table#edge_properties').find('tr#props').each(function (i, propsTr) {
		$(propsTr).find(':input').each(function(i,field){
			if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
				if (field.name == 'value')  {   // && field.value != "undefined"
					  property[field.name] = field.value  
				} else if (field.name == 'newValue') {
					if (field.type === 'file') {
						newproperty['value'] = field.files[0];
					} else {
						newproperty['value'] = field.value;
					}
				} else { 
					property [field.name] = field.value;
					newproperty[field.name] = field.value;
				}
				
			}
					
		});
		
		if (newproperty.propertyType === "FILE") {
			
			if (newproperty.value) {
				var file = newproperty.value;
				newproperty.value = {};
				if (file.type.includes("image/")) {
					newproperty.value.file = document.getElementById('image_file_output_' + newproperty.propertyId).src.replace("data:" + file.type + ";base64,", "");
				} else {
					newproperty.value.file = document.getElementById('other_file_output_' + newproperty.propertyId).href.replace("data:" + file.type + ";base64,", "");
				}
				newproperty.value.filename = file.name;
			}
		
		}
		
		
		if ((property.propertyName != 'uuid') && (newproperty.propertyName != 'uuid')) {
			
			var isPropMand = ruleMapViaId[connMapViaId[jsonData['connection']].ruleId].typeProperties[property.propertyId].isMandatory;
			
			if(isPropMand){ // mandatory property
				if(newproperty.value){
					newEdgeProperties.push(newproperty);
		            if(property.value && property.value != 'undefined'){ 
		            	edgeProperties.push(property);
		            }       		  	
		         } else {
		        	 
		        	 if (newproperty.propertyType != "FILE") {
		        		 console.log("Missing Value for compulsory property.");
               		  	 $('#nodeForm').append("<br/><p style='color:red'>Missing Value for Mandatory property : "+ property.propertyName);
	                     foundError= true;
		        	 }	 
                }		                    	  
	
			}else {   // not mandatory
				if(newproperty.value){  // user entered a new value

					newEdgeProperties.push(newproperty);
					if(property.value && property.value != 'undefined' ){ 
						edgeProperties.push(property);
					}
					        			
				}else {  // if there was no value and user did not enter a value don't push it
//				  user may have deleted old value  
					if (property.value && property.value != 'undefined' && property.value != 'null'){

						newproperty.value = null;
						edgeProperties.push(property);
						newEdgeProperties.push(newproperty);
					}
					
				}
        	}
		} else {
			edgeUuid = property.value;
		}
		
//		if (property.propertyName == 'uuid') {
//			edgeUuid = property.value;
//		} else {
//			edgeProperties.push(property);
//		}
//		
//		if (newproperty.propertyName != 'uuid') {
//			newEdgeProperties.push(newproperty);
//		} 

		property = {}; 
		newproperty ={};
		
	});
	
	console.log("NEW Properties are : "+newEdgeProperties);
	console.log("OLD Properties are : "+edgeProperties);
	
	jsonData['startNodeSysProperties'] = [];
	var startNodeUuidSysProperty = {};
	startNodeUuidSysProperty.propertyName = 'uuid';
	startNodeUuidSysProperty.propertyType = 'STRING';
	startNodeUuidSysProperty.value = jsonData['startNode'];
	jsonData['startNodeSysProperties'].push(startNodeUuidSysProperty);
	
	jsonData['endNodeSysProperties'] = [];
	var endNodeUuidSysProperty = {};
	endNodeUuidSysProperty.propertyName = 'uuid';
	endNodeUuidSysProperty.propertyType = 'STRING';
	endNodeUuidSysProperty.value = jsonData['endNode'];
	jsonData['endNodeSysProperties'].push(endNodeUuidSysProperty);
	
	jsonData['edgeSysProperties'] = [];
	var edgeUuidSysProperty = {};
	edgeUuidSysProperty.propertyName = 'uuid';
	edgeUuidSysProperty.propertyType = 'STRING';
	edgeUuidSysProperty.value = edgeUuid;
	jsonData['edgeSysProperties'].push(edgeUuidSysProperty);
	
	if (edgeProperties.length != 0 && newEdgeProperties.length != 0) {
		
		jsonData.edgeProperties = edgeProperties;
		jsonData.newEdgeProperties  = newEdgeProperties
		
		console.log(jsonData);
		if (selectedMetaData != null){
			
			var successFunction = function( data ) {
				console.log("Edge update success. data: " + data);
				$('#console-log').append("Edge update success. data: " + data);
				(new DisplayLogicalRenderer()).emptyAllInst();
				
				edgeMap[data[0].sysProperties.uuid.value] = data[0];				
				console.log(data);
				DisplayCytoscapeUtils.updateInstanceGraph(irvCy, DisplayCytoscapeUtils.formatSingleEdge(data[0]));
				
				(new DisplayLogicalRenderer()).showEdgeDetails(data[0].sysProperties.uuid.value);
						
			};
			
			var failFunction = function( xhr, ajaxOptions, error ) {
				$('#console-log').append("Update Edge Properties Error: " + xhr.status);
				console.log("Update Edge Properties Error: "+ xhr.responseText);
			};
			
			var edgeApi = new EdgeApis();
			edgeApi.updateEdge(jsonData, successFunction, failFunction);
			
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
		    uuid = NodeUtils.findUUID (edge.data());
		if( uuid ){
			// create the uuid json
			propertyEdge =  NodeUtils.createSysJson(uuid );	
			// get connectionId from edgeMap
			jsonData['connection'] = edgeMap[uuid].connectionId;
		
			properties.push(propertyEdge);
		    jsonData.edgeSysProperties =properties;
			console.log(jsonData);
		
			var successFunction = function( data ) {
				console.log(data);
				showUpdateEdgePropertiesDialog(data);
			};
			
			var failFunction = function( xhr, ajaxOptions, error ) {
				return null;
			};
			
			var edgeApi = new EdgeApis();
			edgeApi.getEdge(jsonData, successFunction, failFunction);
			
			
		}
		
		
	
	}

}


