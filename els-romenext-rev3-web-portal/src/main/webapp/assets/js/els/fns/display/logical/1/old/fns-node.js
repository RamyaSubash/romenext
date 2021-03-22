/**
 ******* Node  functions
 * Author:	Baya Benrachi
 * Date: 	18 April 2016
 * Update:  04 October 2016
 */

//=================================================================================
function findPropInType(propName, type){
	var props = null;
	if (typeMap[type] == undefined) {
		props = typeMapViaId[type].properties;
	} else {
		props = typeMap[type].properties;
	}
	
//	var props = typeMap[type].properties;
	if (props != null) {
		for(var j=0; j<props.length; j++){
			if(props[j].name == propName){ return props[j].isMandatory}
		}
	}
//	for(var j=0; j<props.length; j++){
//		if(props[j].name == propName){ return props[j].isMandatory}
//	}	
}

//=================================================================================================================================
function saveNewNodeAndNewEdge(form) {
	console.log("inside  saveNewNodeAndNewEdge  ");
	var detailNode = {}, jsonData1 = {}, nodeProperties = [], nodeproperty = {}, decoproperty={}, decoProps=[], foundError= false;
	$(form).find('div#typeName').find(':input').each(function (i, field) {
		jsonData1[field.name] = field.value;
	});
	$(form).find('div#nodeProperties').find('tr').each(function (i, propDiv) {
		$(propDiv).find(':input').each(function(i, field){
			if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
				nodeproperty[field.name] = field.value;
			}
		});	    
	    var isPropMand = findPropInType(nodeproperty.propertyName, jsonData1['type']);
		if(isPropMand){  if (nodeproperty.value)	{
	                                          nodeProperties.push(nodeproperty);
		                 }else{
			                      console.log("Missing Value for compulsory property.");
			                      $('#nodeForm').append("<p style='color:red'>Missing Value for Mandatory property : "+ nodeproperty.propertyName);
			                      foundError = true;
		                  }
		}else {
			// not mandatory look if there is a value
			if (nodeproperty.value)	{  nodeProperties.push(nodeproperty);	}
		}
	    nodeproperty = {};
	    
	});
	if(!foundError){
		jsonData1.properties = nodeProperties;
		$(form).find('div#defaultDecoForNode').find(':input').each(function (i, field) {
			jsonData1[field.name] = field.value;
		});
		$(form).find('div#modelIdName').find(':input').each(function (i, field) {
			jsonData1['modelId'] = field.value;
		});	
	//	$(form).find('div#partsForNodes').find(':input').each(function (i, field) {
	//		jsonData1['partGroup'] = field.value;
	//	});
	//	-------------------------------------- added 26-10-2016 ---------------------------
		if(jsonData.hasOwnProperty('modelId')){
			if(jsonData['modelId']){
									$(form).find('div#partsForNodes').find(':input').each(function (i, field) {
										    console.log("part node value "+field.value);
											if (field.value != 0) 	jsonData['partGroup'] = field.value;
		                            });
			}
		}
		
		var jsonData2 = {}, uuidType, ruleName;
		
		$(form).find('div#parentNodeInstance').find(':input').each(function (i, field) {
			if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
				uuidType = field.value;
	//			console.log(field.value);
				var uuidAndType = field.value.split(',');
				jsonData2["originNodeUuid"] = uuidAndType[0];
				jsonData2["originType"] = typeMap[uuidAndType[1]].id;
			}
		});
		$(form).find('div#connectionIdName').find(':input').each(function (i, field) {
			if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
				jsonData2["connection"] = field.value.split(',')[0];
				ruleName = field.value.split(',')[0];
			}
		});
		var edgeProperties = [], edgeProperty = {};
		$(form).find('div#edgeProperties').find('tr').each(function (i, propDiv) {
			$(propDiv).find(':input').each(function(i, field){
				if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
					edgeProperty[field.name] = field.value;
				}
			});
	//		console.log(edgeProperty);
			edgeProperties.push(edgeProperty);
		    edgeProperty = {};
		});
		jsonData2.edgeProperties = edgeProperties;
		
	//	console.log(jsonData1);
	//	console.log(jsonData2);
		
		var destUuid;
		var destinationType;
		
		if (selectedMetaData != null && jsonData1 && jsonData2 ){
			
			if (!ruleName) {	
				
				var successFunction = function( data ) {
					console.log("Node created "+data.type);
					
					if(!irvCy) {
						NodeUtils.loadAllNodesAndEdges();
						(new DisplayLogicalRenderer()).loadView();
//						initInstanceGraph() 
					}
					else{
	//					irvCy.filter('node[name="' + data.name + '"]').data(data);
						DisplayCytoscapeUtils.updateInstanceGraph (irvCy, DisplayCytoscapeUtils.formatSingleNode(data)); 
					}
					
					if (document.getElementById("mrvCy").style.display == "block") {
						updateGeoMapWithNode(data);
					}
					
					destinationType = data.type;
					
					destUuid = NodeUtils.findUUID(data);
//					var Props = data.properties;
//					Props.forEach(function(prop) {
//						if(prop.name=="uuid"){
//							destUuid = prop.value;
//						}
//					});
					
					detailNode.nodes = [];
					detailNode.nodes.push(data);
//					showUpdateNodePropertiesDialog(detailNode);	
					showUpdateNodeProperties(detailNode.nodes[0]);	
				};
				
				var failFunction = function( xhr, ajaxOptions, error ) {
					console.log('Error Node not saved: ' + xhr.responseText);
					$('#console-log').append('Error Node not created: ' + xhr.status);
				};
				
				var nodeApi = new NodeApis();
				nodeApi.saveNode(jsonData1, successFunction, failFunction);
						
			} else {			
				if (uuidType) {				
					
					var successFunction = function( data ) {
						console.log("Node created "+data.type);
					    
						if(!irvCy) { 
							NodeUtils.loadAllNodesAndEdges();
							(new DisplayLogicalRenderer()).loadView();
//							initInstanceGraph(); 
						}
						else{
	//						irvCy.filter('node[name="' + data.name + '"]').data(data);							
							DisplayCytoscapeUtils.updateInstanceGraph (irvCy, DisplayCytoscapeUtils.formatSingleNode(data)); 						    
						}
						
						if (document.getElementById("mrvCy").style.display == "block") {
							updateGeoMapWithNode(data);
	
						}
						
						destinationType = data.type;
						destUuid = NodeUtils.findUUID(data);
						
//						var Props = data.properties;
//						Props.forEach(function(prop) {
//							if(prop.name=="uuid"){
//								destUuid = prop.value;
//							}
//						});
						
						detailNode.nodes = [];
						detailNode.nodes.push(data);
//						showUpdateNodePropertiesDialog(detailNode);
						showUpdateNodeProperties(detailNode.nodes[0]);	
					};
					
					var failFunction = function( xhr, ajaxOptions, error ) {
//						alert(xhr.status);
						console.log('Error Node not saved: ' + xhr.responseText);
					};
					
					var nodeApi = new NodeApis();
					nodeApi.saveNode(jsonData1, successFunction, failFunction);
					
					jsonData2.destinationNodeUuid = destUuid;
					jsonData2.destinationType = typeMap[destinationType].id;
					
					var successFunction = function( data ) {
						console.log("Edge create success. data: "+data);
						(new DisplayLogicalRenderer()).initRuleBarInst('ruleInstBar');
						DisplayCytoscapeUtils.updateInstanceGraph (irvCy, DisplayCytoscapeUtils.formatSingleEdge(data));
						
						if (selecteddecorator == 'Geo') {
							updateGeoMapWithEdge(data);
						}
					};
					
					var failFunction = function( xhr, ajaxOptions, error ) {
						console.log('Error Edge not created: ' + xhr.responseText);
						(new DisplayLogicalRenderer()).initRuleBarInst('ruleInstBar');
					};
					
					var edgeApi = new EdgeApis();
					edgeApi.saveEdge(jsonData2, successFunction, failFunction);
						
				} else { $("#console-log").append("Please create a parent node first. OR This is a root node."); }
				
			}
	
		} else { 
			 $('#console-log').append("<p style='color:red'>Can not create a Connection, You must First  select a Metadata</p>");
			 cancelInstForm();
		}
   }
		 
}




//============================================================================================
function ShowFocussedNode(node){
	// keep this node value --- and Display it in the Path bar
	if(node){

	var drilldown='';
	if(document.getElementById('drilldown')){
		 drilldown = document.getElementById('drilldown');
		 drilldown.innerHTML='';
		}
	else {
		drilldown =  document.createElement('li');
		drilldown.setAttribute('id','drilldown');
	}
	var nodeList = '';
	userActions.currentaction='Drilldown';
	userActions.param = node;
	nodeList += "<span class='badge' style='color:black; background:"+node.color+"'>"+node.cyDisplay + "</span>";
	nodeList += "<input type='button' id='drill' value ='Drilldown'  class='btn btn-primary'  onclick=\"drillDownNode('"+node.uuid+"');\" /> "
	drilldown.innerHTML = nodeList;
	document.getElementById('path').appendChild(drilldown);
	}else { console.log(" no node selected");}
}
//===================================================================================
function removeParentNode(json, nodeUuid){
	var find; 
	$.each(json, function(key, value){
		var uuid, Props;
		// Find the node with the uuid value provided
		find = false;
		Props = value.properties;
		Props.forEach(function(prop) {		   
			     if((prop.name=="uuid")&&(prop.value == nodeUuid)){ 
			    	find = true;
			     }
		});  
		if(find) {
			LD_FocussedNode = json[key];
			LD_FocussedNode.uuid = nodeUuid;
			LD_FocussedNode.color = typeMap[value.type].color;
			delete json[key]; 
			
			}
	});
	
	retrieveNameFromProps( LD_FocussedNode);
	return json;
	
	
}

//================================ Show Node Properties to update ============================
function showUpdateNodePropertiesDialog(detailsNode) {
	console.log("Inside showUpdateNodePropertiesDialog  ");
	
	$("#grid-instances").css({'visibility':'visible'});
	
	var Form = document.createElement('div');
	var node = detailsNode.nodes[0];
	var formHeader = "<form id='nodeUpdateDialog'>" , inputs = "", decoProps='', inputsDecoProps='', inputModel='';
	inputs += "<table id='updateNode'>";
	inputs += "<tr><th><input type='hidden' name='typeName'  value='"+ node.type+"'><input type='hidden' name='type'  value='"+ typeMap[node.type].id+"'>" + "Type :</th><td> '"+ node.type+"' </td></tr></table>";
	var decorators = typeMap[node.type].decorators;
	var decoList = "";
	decorators.forEach(function(deco){
		var decoName='';
		for (var key in decoMap) {
			if (decoMap[key].id.toString() == deco) {
				decoName = decoMap[key].name;
				break;
			}
		}
		if (decoName == 'Logical') {
			decoList += "<option value='" + deco + "' selected='selected'>" + decoName + "</option>";
		} else {
			decoList += "<option value='" + deco + "'>" + decoName + "</option>";
		}
	});
	inputs += "<div id='defaultDecoForNode'>Default Decorator:&nbsp;<select name='defaultDecorator'>" + decoList + "</select></div>";
	
//	update 26-01-2017
//	var modelDefined=false, groupPart = false; 
//	if (node.hasOwnProperty('modelId')){
//		modelDefined = true;
//		inputs += "<table><tr><th>Model:</th><td align='middle' > '" + node.modelId + "' </td>";
//		if (node.hasOwnProperty('partGroup')) {  
//			groupPart = true;
//			inputs +="<th>Part:</th><td align='middle'> '" + node.partGroup + "' </td>";}
//		else {inputs +="<th>Part:</th><td align='middle'> Default </td>";}
//		inputs +="</tr></table>";
//	}else {inputs += "<table><tr><td> No Model selected</td></tr></table>"};
//	--------------------------- code added 26-10-2016 ---------------------------------
	
	
//	if(hasDeco(typeMap[node.type], 2) == true) { 		// at least one model is created for this type												// check if default part is defined by loading properties realted to this model
////		SECTION DISPLAY LIST OF MODELS 
//		
//		loadModelNode(node.type);
//		var modelDropdownList = "";
//		$.each(selectedTypeModels, function(i, model) {
//			  modelDropdownList += "<option  value='" + model.id + "'";
//			  if((modelDefined)&&(model.id == node.modelId)) { modelDropdownList += "selected='selected'";}
//			  modelDropdownList += ">" + model.name + "</option>";
//		});
//		inputModel += "<div id='modelIdName' ><label>Select Model: <select  name='modelId'   onclick='loadGroupPartsByModel(this.value)'>";
//		inputModel += modelDropdownList;
//		inputModel += "</select></label></div>";
////		SECTION DISPLAY LIST OF PARTS
//		inputModel += "<div id='partsForNodes' ></div>";
//
//		if(groupPart) {loadGroupPartsByModel(node.modelId, node.partGroup);}
//		else {loadGroupPartsByModel(node.modelId,null)}
//
//	}
	
	var typeProperties = typeMap[node.type].properties;
	var nUuid='';
	node.properties.forEach(function(prop){
		if (prop.name == 'uuid') {
			nUuid = prop.value;
		}
	});
	var inputProps="", nodeProperties= node.properties;
	
	if(typeProperties){
		inputProps += "<table id='nodeProperties'>";
		inputProps += "<tr><th colspan='3' style='background-color: grey'> Properties:</th><tr>";
		inputProps +="<tr><th>Name</th><th>Type</th><th>Value</th</tr> ";
		inputProps +="<tr id='props'><td><input type='hidden'name='propertyName' value='uuid'></td><td><input type='hidden'name='value' value='"+nUuid+"'></td><td><input type='hidden'name='propertyType' value='STRING'></td></tr>"
		typeProperties.forEach(function(typeProperty){		// retrieve property from Type
			//var isNew = true;
			var pName = typeProperty.name;
			var pType = typeProperty.propertyType;
			var mandatory = typeProperty.isMandatory;
			var pValue, textcolor='black';
			
			nodeProperties.forEach(function(nodeProperty){
				if(pName == nodeProperty.name ){
			    	pValue = nodeProperty.value;
			    }
			});
			inputProps += "<tr id='props'><th>";
			if(mandatory){textcolor="red";}
			inputProps += "<input type='hidden' name='propertyId' value='" + typeProperty.id + "'><input type='text' style='color:"+textcolor+"' size='6' name='propertyName' value='" + typeProperty.name + "' disabled></th>";
			inputProps += "<td><input type='text' size='8' name='propertyType' value='" + pType + "' disabled></td>";
			if(!pValue) {
				inputProps += "<td ><input  style='background-color:yellow' size='8'  type='text' name='newValue' value=''>";}
			else {inputProps += "<td><input type='text' size='8' name='newValue' value='" + pValue + "'>";}
			inputProps += "<input type='hidden' name='value' value='" + pValue + "'>";	
			inputProps += "</td></tr>";
		});
	}
	
	var formFooter = "</table>";
	
	formFooter += "<input type='button' value='Update Node'  class='btn btn-primary btn-sm'  onclick='saveUpdateNodeDialog(form)' />";
    formFooter += "<input type='button' value='Cancel'  class='btn btn-primary btn-sm'  onclick='cancelInstForm()' />";
    userActions.prevaction = userActions.currentaction ;
	userActions.currentaction = 'updateNode';
	
//	Form.innerHTML = message + formHeader + inputs+ inputModel + inputProps + formFooter;
	
	Form.innerHTML = message + formHeader + inputs + inputProps + formFooter;
	(new DisplayLogicalRenderer()).emptyAllInst();
	$('#nodeForm').append(Form);
		
}
//================================================================================================
function   loadModelNode(type){
	loadSelectedTypeModels(type);
	if(selectedTypeModels){
		for( model in selectedTypeModels){
			var properties = retrieveModelProperties(selectedTypeModels[model].shapes);
			var checkShape = retrieveModelShapes(selectedTypeModels[model].shapes);
			if(properties.length != 0 && checkShape) {
				selectedTypeModels[model].defaultModel = true;
			}else { selectedTypeModels[model].defaultModel = false;  }
		}
	}
}


function saveUpdateNodeDialog(form) {
	console.log("inside  saveUpdateNodeDialog  ");
	var jsonData = {}, nodeProperties = [], newProperties = [];
	var decoProps=[],newDecoProps=[], decoproperty ={}, newdecoproperty ={} ;
	var property = {}, newproperty = {}, foundError=false;
	var sysProperties = [];
	$(form).find('table#updateNode').find(':input').each(function (i, field) {
		jsonData[field.name] = field.value;
	});
	console.log(jsonData);
	// API will remove the uuid from newProperties
	$(form).find('table#nodeProperties').find('tr#props').each(function (i, propsTr){
		$(propsTr).find(':input').each(function(i,field){
			if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
				console.log(field.name + " value found is :"+field.value);
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
		
		if((property.propertyName == 'uuid') && (newproperty.propertyName == 'uuid')){
//			nodeProperties.push(property);
			sysProperties.push(property);
;		}else{
//				var isPropMand = findPropInType(property.propertyName, jsonData['type']);
				var isPropMand = typeMapViaId[jsonData['type']].typeProperties[property.propertyId].isMandatory;
				if(isPropMand){ // mandatory property
					if(newproperty.value){
											newProperties.push(newproperty);
			                    		  	if(property.value  && property.value != 'undefined'){ nodeProperties.push(property);}
			                    		  	
			         } else {
			        	 
			        	 if (newproperty.propertyType != "FILE") {
			        		 console.log("Missing Value for compulsory property.");
                   		  	 $('#nodeForm').append("<br/><p style='color:red'>Missing Value for Mandatory property : "+ property.propertyName);
		                     foundError= true;
			        	 }
                    		 
                    }		                    	  
		
				}else {   // not mandatory
					if(newproperty.value){  // user entered a new value
											newProperties.push(newproperty);
							                if(property.value && property.value != 'undefined' ){ nodeProperties.push(property);}
						        			
					}else {  // if there was no value and user did not enter a value don't push it
//					  user may have deleted old value  
						if (property.value && property.value!= 'undefined' ){
//							       if (property.propertyType == 'INTEGER'|| property.propertyType == 'DOUBLE') { 
//							                          newproperty.value = null; }				
//						            else if(property.propertyType == 'STRING') { newproperty.value = 'null'; }  
							       newproperty.value = null;
							       nodeProperties.push(property);
							       newProperties.push(newproperty);
						}
						
					}
	        	}
		}
			           property = {}; newproperty ={};
		
	});
	//      build the set of new properties
	
	console.log(" Retrieved Properties are : "+nodeProperties);
	console.log(" The new ones are :"+ newProperties);
	if(!foundError) {
		jsonData.properties         = nodeProperties;
		jsonData.newProperties      = newProperties;
		jsonData.sysProperties      = sysProperties;
		
		$(form).find('#decoproperties').find('tr').each(function(i, decoDiv){
			$(decoDiv).find(':input').each(function(i,field){
				if ((field.type != 'submit') && (field.type != 'radio') || (field.checked)) {
					if(field.name == 'value'){ decoproperty[field.name] = field.value }
					else if (field.name == 'newValue') { 
						newdecoproperty['value'] = field.value
					} else { 
						newdecoproperty [field.name] = field.value;
						decoproperty[field.name] = field.value;
					}
				
				}
			});
			decoProps.push(decoproperty);
			newDecoProps.push(newdecoproperty);
			decoproperty = {}; newdecoproperty={};
		});
		jsonData.decoProperties = decoProps;
		jsonData.newDecoProperties = newDecoProps;
	
		$(form).find('div#defaultDecoForNode').find(':input').each(function (i, field) {
			jsonData[field.name] = field.value;
		});	
		console.log("Json constructed before mode taken"+jsonData);
		$(form).find('div#modelIdName').find(':input').each(function (i, field) {
			jsonData['modelId'] = field.value;
		});
		if(jsonData.hasOwnProperty('modelId')){
			if(jsonData['modelId']){
									$(form).find('div#partsForNodes').find(':input').each(function (i, field) {
										    console.log("part node value "+field.value);
											if (field.value != 0) 	jsonData['partGroup'] = field.value;
		                            });
			}
			console.log("Json constructed after mode taken"+jsonData.modelId );	
		}
			
		console.log(jsonData);
		
		if (selectedMetaData != null && jsonData){
			
			var successFunction = function( data ) {
				console.log("Node Updated "+data.nodes[0].type);
				if (document.getElementById("irvCy").style.display == "block") {
					displayIRVCYCoords('irvCy');
//				    update the instance graph view if displayed
					var formatNode = DisplayCytoscapeUtils.formatSingleNode(data.nodes[0]);
					DisplayCytoscapeUtils.updateInstanceGraph (irvCy, formatNode); 
		      
				    (new DisplayLogicalRenderer()).emptyAllInst(); 
				    message = "<p style='color:green'> Node Properties updated successfully</p>";
//				    showUpdateNodePropertiesDialog( data);
//				    showUpdateNodeProperties(data.nodes[0]);
//				    showNodeProperties(formatNode);
				    
				    message = '';
				    
				    DisplayCytoscapeUtils.clickANode(data.nodes[0].sysProperties.uuid.value);
				    
				} else if (document.getElementById("mrvCy").style.display == "block") {
					updateGeoMapWithNode(data.nodes[0]);
				} 
			};
			
			var failFunction = function( xhr, ajaxOptions, error ) {
				console.log("Update Node Properties Error: "+ xhr.status);
				$('#console-log').append("Update Node Properties Error: "+ xhr.status);
			};
			
			var nodeApi = new NodeApis();
			nodeApi.updateNode(jsonData, successFunction, failFunction);
		
		} else { 
			 $('#console-log').append("<p style='color:red'>Can not create a Node, You must First  select a Metadata</p>");
			 cancelInstForm();	
		}
	}
}


//========================================================================================
function showAddNodeAndEdgeDialogWithTypeSelected(currentType) {
	
	$("#grid-instances").css({'visibility':'visible'});
	var Form = document.createElement('div');
	if (selectedMetaData != null) {
		var formHeader = "<form id='addNodeDialog'>", inputs = "", inputProps, typeProperties, decorators, inputModel, propcolor='color:white';
		inputs += "<div id='typeName'><label> Type Selected:" + currentType + "</label><input type='hidden' name='type' value='"+currentType+"'/></div>";
        // display the list of properties for this  Type  
		typeProperties = typeMap[currentType].properties;
		inputsProps = "<table  id='properties'>";
		typeProperties.forEach(function(typeProperty){
			if(typeProperty.isMandatory) {propcolor='color:red'}
			inputsProps += "<tr><th style="+propcolor+"><input type='hidden' name='propertyId' value='"+typeProperty.id+"'>" + typeProperty.name + 
			              "</th><td>: <input type='text' size='10' name='value' />(" + 
			              typeProperty.propertyType + ")<input type='hidden' name='propertyType' value='"+typeProperty.propertyType+"'></td></tr>";
		});
		inputsProps += "</table>";	
		
		// display the list of decorators properties for this Type
		decorators = typeMap[currentType].decorators;  // list of decorators for the type.
		var decoProps, inputsDecoProps, inputDecoAll='';
		decorators.forEach(function(deco){            // for each of the decorator 
			$.each(decos, function(key, value){       // look into the deco-properties table for that decorator
				  if (value.id == deco) {
					decoProps = value.decoProps;      // retrieve the properties 
					  inputsDecoProps = "<table  id='decoproperties' style='display:none'>";
					  inputsDecoProps += "<caption>Fill in the Properties values for Decorator "+value.name+"</caption>";
					  // loop through to display list of properties to enter values for
					  decoProps.forEach(function(decoProperty){
						  if(decoProperty.display && !decoProperty.isHidden){
							  if (decoProperty.name == "latitude" && cLat != null) {
							      inputsDecoProps += "<tr><th><input type='hidden' name='romeDecoPropId' value='"+decoProperty.id+"'><input type='hidden' name='propertyName' value='"+decoProperty.name+"'>" + 
							      decoProperty.name +"</th><td>: <input type='text' name='value' value='" +  cLat + "'/>(" + 
								              decoProperty.propertyType + ")<input type='hidden' name='propertyType' value='"+decoProperty.propertyType+"'></td></tr>";
							  } else if (decoProperty.name == "longitude" && cLng != null) {
							      inputsDecoProps += "<tr><th><input type='hidden' name='romeDecoPropId' value='"+decoProperty.id+"'><input type='hidden' name='propertyName' value='"+decoProperty.name+"'>" + 
							      decoProperty.name +"</th><td>: <input type='text' name='value' value='" +  cLng + "'/>(" + 
								              decoProperty.propertyType + ")<input type='hidden' name='propertyType' value='"+decoProperty.propertyType+"'></td></tr>";
							  } else {
							      inputsDecoProps += "<tr><th><input type='hidden' name='romeDecoPropId' value='"+decoProperty.id+"'><input type='hidden' name='propertyName' value='"+decoProperty.name+"'>" + 
							      decoProperty.name +"</th><td>: <input type='text' name='value' />(" + 
								              decoProperty.propertyType + ")<input type='hidden' name='propertyType' value='"+decoProperty.propertyType+"'></td></tr>";
							  }
						  }
						});
					  inputsDecoProps += "</table>";
					  inputDecoAll += inputsDecoProps;
				  }
			});
		});
		
		inputModel = "";
		if (selectedTypeModels) {
			var modelDropdownList = "";
			$.each(selectedTypeModels, function(i, model) {
				modelDropdownList += "<option  value='" + model.id + "'>" + model.name + "</option>";
			});
			inputModel += "<div id='modelIdName' name='modelId'><label>Select Model: <select onclick='loadGroupPartsByModel(this.value)'>";
			inputModel += modelDropdownList;
			inputModel += "</select></label></div>";
			inputModel += "<div id='partsForNodes' name='partGroup'></div>";
			if(selectedTypeModels[0].defaultModel) loadGroupPartsByModel(selectedTypeModels[0].id);
		}else {
			inputModel += "<div> <b>No model.</b> Do you still want to create A node Instance!</div>"
		}

		var connDropdownList = "";
		$.each(endTypeConns, function(i, conn) {
			connDropdownList += "<option  value='" + conn.type + "," + conn.origin + "'>" + conn.name + "</option>";
		});
		
		inputEdge = "<div id='connectionIdName'><label>Select Connection: <select onclick='loadParentNodesByConn(this.value)'>";
		inputEdge += connDropdownList;
		inputEdge += "</select></label></div>";
		inputEdge += "<div id='parentNodeInstance'></div>";
		inputEdge += "<div id='edgeProperties'></div>";
		loadParentNodesByConn(endTypeConns[0].type + "," + endTypeConns[0].origin);
		
		var decoList = "";
		decorators.forEach(function(deco){
			var decoName;
			for (var key in decoMap) {
				if (decoMap[key].id.toString() == deco) {
					decoName = decoMap[key].name;
					break;
				}
			}
			if (decoName == 'Logical') {
				decoList += "<option value='" + deco + "' selected='selected'>" + decoName + "</option>";
			} else {
				decoList += "<option value='" + deco + "'>" + decoName + "</option>";
			}
		});
		var inputsDefaultDeco = "<strong>Default Decorator:&nbsp;</strong>";
		inputsDefaultDeco += "<select name='defaultDecorator'>" + decoList + "</select>";
			
		// <!-- Allow form submission with keyboard without duplicating the dialog button -->
		var formFooter = "<div id='nodeProperties'>"+inputsProps+"</div><div id='decopropertieslist'>"+inputDecoAll+"</div>" + inputModel + inputEdge + "<div id='defaultDecoForNode'>" + inputsDefaultDeco + "</div>";
//		var formFooter = "<div id='nodeProperties'>"+inputsProps+"</div>";
		
    	if (document.getElementById("irvCy").style.display == "block") {   		
    		formFooter += "<input type='button' value='Add Node' class='btn btn-primary btn-sm'  onclick='saveNewNodeAndNewEdge(form)' />";
    	} else if (document.getElementById("mrvCy").style.display == "block") {
    		formFooter += "<input type='button' value='Add Node' onclick='saveNewNodeAndNewEdgeWithLatLng(form)' />";
    	} else {saveMapPositionAndRetrieveNodePropertiesInMap
    		formFooter += "<input type='button' value='Do Nothing'/>";
    	}	
    	formFooter += "<input type='button' value='Cancel' onclick='cancelInstForm()' />";		
		Form.innerHTML = formHeader + inputs + formFooter;
		(new DisplayLogicalRenderer()).emptyAllInst();
		$('#nodeForm').append(Form);
		
	} else {
		 $('#console-log').append("<p style='color:red'>Can not Add a node, You must First  select a Metadata</p>");
		}
	
}
//================================================================================================================
//     this will be called to create a node instance for a type when a node parent is selected
function showAddNodeWithKnownEdge(currentType, currentNode, currentConn) {
	$("#grid-instances").css({'visibility':'visible'});
	var Form = document.createElement('div'), propcolor='color:white';
	if (selectedMetaData != null) {
		var formHeader = "<form id='addNodeDialog'>", inputs = "";
		inputs += "<div id='typeName'><label> Node will be created for:" + currentType + "</label><input type='hidden' name='type' value='"+currentType+"'/><input type='hidden' name='typeId' value='"+typeMap[currentType].id+"'/></div>";
        // display the list of properties for this  Type  
		var typeProperties = typeMap[currentType].properties;
		var inputsProps = "<table  id='properties'>";
		typeProperties.forEach(function(typeProperty){
			if(typeProperty.isMandatory) {propcolor='color:red'}
			else {propcolor='color:black'}
			inputsProps += "<tr><th style="+propcolor+"><input type='hidden' name='propertyName' value='"+typeProperty.name+"'>" + typeProperty.name + 
			              "</th><td>: <input type='text' size='10' name='value' />(" + 
			              typeProperty.propertyType + ")<input type='hidden' name='propertyType' value='"+typeProperty.propertyType+"'></td></tr>";
		});
		inputsProps += "</table>";	
		
		// display the list of decorators properties for this Type
		var decorators = typeMap[currentType].decorators;  // list of decorators for the type.
		var decoProps, inputsDecoProps, inputDecoAll='';
		decorators.forEach(function(deco){            // for each of the decorator 
			$.each(decos, function(key, value){       // look into the deco-properties table for that decorator
				  if (value.id == deco) {
					decoProps = value.decoProps;      // retrieve the properties 
					  inputsDecoProps = "<table  id='decoproperties' style='display:none'>";
					  inputsDecoProps += "<caption>Fill in the Properties values for Decorator "+value.name+"</caption>";
					  // loop through to display list of properties to enter values for
					  decoProps.forEach(function(decoProperty){
						  if(decoProperty.display && !decoProperty.isHidden){
							  if (decoProperty.name == "latitude" && cLat != null) {
							      inputsDecoProps += "<tr><th><input type='hidden' name='romeDecoPropId' value='"+decoProperty.id+"'><input type='hidden' name='propertyName' value='"+decoProperty.name+"'>" + 
							      decoProperty.name +"</th><td>: <input type='text' name='value' value='" +  cLat + "'/>(" + 
								              decoProperty.propertyType + ")<input type='hidden' name='propertyType' value='"+decoProperty.propertyType+"'></td></tr>";
							  } else if (decoProperty.name == "longitude" && cLng != null) {
							      inputsDecoProps += "<tr><th><input type='hidden' name='romeDecoPropId' value='"+decoProperty.id+"'><input type='hidden' name='propertyName' value='"+decoProperty.name+"'>" + 
							      decoProperty.name +"</th><td>: <input type='text' name='value' value='" +  cLng + "'/>(" + 
								              decoProperty.propertyType + ")<input type='hidden' name='propertyType' value='"+decoProperty.propertyType+"'></td></tr>";
							  } else {
							      inputsDecoProps += "<tr><th><input type='hidden' name='romeDecoPropId' value='"+decoProperty.id+"'><input type='hidden' name='propertyName' value='"+decoProperty.name+"'>" + 
							      decoProperty.name +"</th><td>: <input type='text' name='value' />(" + 
								              decoProperty.propertyType + ")<input type='hidden' name='propertyType' value='"+decoProperty.propertyType+"'></td></tr>";
							  }
						  }
						});
					  inputsDecoProps += "</table>";
					  inputDecoAll += inputsDecoProps;
				  }
			});
		});
//		removed this as it part of physical deco
		
//		inputModel = "";
//		if (selectedTypeModels) {
//			var modelDropdownList = "";
//			$.each(selectedTypeModels, function(i, model) {
//				modelDropdownList += "<option  value='" + model.id + "'>" + model.name + "</option>";
//			});
//			inputModel += "<div id='modelIdName' ><label>Select Model: <select  name='modelId'   onclick='loadGroupPartsByModel(this.value)'>";
//			inputModel += modelDropdownList;
//			inputModel += "</select></label></div>";
//			inputModel += "<div id='partsForNodes' ></div>";
//			if(selectedTypeModels[0].defaultModel)loadGroupPartsByModel(selectedTypeModels[0].id);
//		}else {
//			inputModel += "<div> <b>No model.</b> Do you still want to create A node Instance!</div>"
//		}

		
		inputEdge = "";
//		inputEdge += "<div id='ruleName'><input type='hidden' value='"+connMap[currentConn].rule+"'/></div>";
		inputEdge += "<div id='ruleName'><input type='hidden' value='"+connMap[currentConn].id+"'/></div>";
		inputEdge += "<div id='parentNodeInstance'><input type='hidden'  value='"+currentNode.uuid+","+currentNode.type +"' /></div>";
		
		if (ruleMap[connMap[currentConn].rule].classification == "parentchild") {
			message = "<p style='color:blue'>Creating a node with: <b>"+currentNode.cyDisplay +"</b> as Parent</p>";
		} else if (ruleMap[connMap[currentConn].rule].classification == "link") {
			message = "<p style='color:blue'>Creating a node with: <b>"+currentNode.cyDisplay +"</b> Connected</p>";
		} else {
			message = "<p style='color:red'>Wrong Connection Classification: " + connMap[currentConn].classification + "</p>";
		}
//		message = "<p style='color:blue'>Creating a node with :<b>"+currentNode.cyDisplay +"</b> as Parent</p>";
		var decoList = "";
		decorators.forEach(function(deco){
			var decoName;
			for (var key in decoMap) {
				if (decoMap[key].id.toString() == deco) {
					decoName = decoMap[key].name;
					break;
				}
			}
			if (decoName == 'Logical') {
				decoList += "<option value='" + deco + "' selected='selected'>" + decoName + "</option>";
			} else {
				decoList += "<option value='" + deco + "'>" + decoName + "</option>";
			}
		});
		var inputsDefaultDeco = "<strong>Default Decorator:&nbsp;</strong>";
		inputsDefaultDeco += "<select name='defaultDecorator'>" + decoList + "</select>";
			
		
//		removed this as part of physical deco 
		// <!-- Allow form submission with keyboard without duplicating the dialog button -->
//		var formFooter = "<div id='nodeProperties'>"+inputsProps+"</div><div id='decopropertieslist'>"+inputDecoAll+"</div>" + inputModel + inputEdge + "<div id='defaultDecoForNode'>" + inputsDefaultDeco + "</div>";
		
		var formFooter = "<div id='nodeProperties'>"+inputsProps+"</div><div id='decopropertieslist'>"+inputDecoAll+"</div>" +  inputEdge + "<div id='defaultDecoForNode'>" + inputsDefaultDeco + "</div>";
		
		
    	if (document.getElementById("irvCy").style.display == "block") {   		
    		formFooter += "<input type='button' value='Add Node' class='btn btn-primary btn-sm'   onclick='saveNewNodeAndNewEdge2(form)' />";
    	} else if (document.getElementById("mrvCy").style.display == "block") {
    		formFooter += "<input type='button' value='Add Node' onclick='saveNewNodeAndNewEdgeWithLatLng(form)' />";
    	} else {saveMapPositionAndRetrieveNodePropertiesInMap
    		formFooter += "<input type='button'     value='Do Nothing'/>";
    	}
    	
    	formFooter += "<input type='button'  class='btn btn-primary btn-sm'     value='Cancel' onclick='cancelInstForm()' />";
    			
		Form.innerHTML = message + formHeader + inputs + formFooter;
		(new DisplayLogicalRenderer()).emptyAllInst();
		$('#nodeForm').append(Form);
		
	} else {
		 $('#console-log').append("<p style='color:red'>Can not Add a node, You must First  select a Metadata</p>");
		}
	
}

//===============================================================================================================
function loadConnsByEndType(nodeType) {	
	var connDropdownList = "";
	$.ajax({
		url : apiBaseUrl + 'connection/types/' + nodeType + '/metadata/'+ selectedMetaData,
		method: "GET",
		dataType: "json",
		cache : false,
		success : function(data) {
			console.log("Connections returned success. data: " + data);
			
		},
		error : function(xhr, ajaxOptions, error) {
		}
	}).done(function(data) {
		endTypeConns = data;
		if (endTypeConns == null || endTypeConns.length < 1) {
			showAddNodeDialogWithTypeSelected(nodeType);
		} else {
			showAddNodeAndEdgeDialogWithTypeSelected(nodeType);
		}
	});
	
}
//==============================================================================================
function loadParentNodesByConn(conn) {
	var startTypeName = conn.split(',')[1];
	var inputs = "";
	
	var successFunction = function( data ) {

		console.log(data.nodes);
		var opts= "";
		var Nodes = data.nodes;
		if (Nodes == null || Nodes.length < 1) {
			(new DisplayLogicalRenderer()).emptyAllInst();
			$('#nodeForm').append("<p style='color:red'>Can not Add a child node, You must First create a parent node.</p><br>");
			$('#nodeForm').append("<input type='button' value='Cancel' onclick='cancelInstForm()' />");
			$('#console-log').append("<p style='color:red'>Can not Add a child node, You must First create a parent node.</p>");
		} else {
			Nodes.forEach(function(node){
				var Props = node.properties;
				var hasName = false;
				var name;
				var uuid;
				Props.forEach(function(prop) {
					if (prop.name=="name") {
						name = prop.value;
						hasName = true;
					}
					if (prop.name=="uuid") {
						uuid = prop.value;
					}
				});
				if (hasName == false) {
					opts += "<option value='" + uuid + "," + node.type + "'>" + uuid + "</option>";
				} else {
					opts += "<option value='" + uuid + "," + node.type + "'>" + name + "</option>";
				}			
			});
			
			inputs += "<label>Select NodeParent: <select>";
			inputs += opts;
			inputs +="</select></label>";
			document.getElementById('parentNodeInstance').innerHTML = inputs;
		}
		
	};
	
	var failFunction = function( xhr, ajaxOptions, error ) {
		
	};
	
	var nodeApi = new NodeApis();
	nodeApi.getNodesUnderType(startTypeName, successFunction, failFunction);

}
//=================================================================================
function loadSelectedTypeModels(typeName) {	
	console.log("loading all models for type " + typeName);
	if (!typeName) {
		return;
	}

	var json_getModel = '{"typeName": "' + typeName + '", "repoid": ' + Number(selectedMetaData) + '}'
	console.log(json_getModel);
	var model;
	return $.ajax({
		type : 'POST',
		url : apiBaseUrl + 'model/model/all',
		dataType : 'json',
		data : json_getModel,
		contentType : 'application/json',
		async : false,
		cache : false,
		success : function(data) {
			console.log("success to get models");		
		},
		error : function(xhr, ajaxOptions, error) {
			$('#console-log').append("<p style='color:red'>Cannot get models for type " + xhr.status +"</p>");
			console.log('failed to load selected Type Models: '+ xhr.responseText);
		}
	}).done(function(data) {
		selectedTypeModels = data.models;
		console.log("found these models = " + data.models.length);
	});
}
//==============================================================================
function loadGroupPartsByModel(modelId, group) {
	if (!modelId) {
		return;
	}
	var json = '{modelId:' + modelId + '}';
	var inputs = "";
	$.ajax({
		type : 'POST',
		url : apiBaseUrl + 'model/part/bymodel',
		dataType : 'json',
		data : json,
		contentType : 'application/json',
		cache : false,
		success : function(data) {
			console.log("Parts returned success. data: " + data);
		},
		error : function(xhr, ajaxOptions, error) {
			$('#console-log').append("<p style='color:red'>Cannot get Group Part  " + xhr.status +"</p>");
			console.log('failed to load GroupPart for this model : '+ xhr.responseText);
		}
	}).done(function(data) {
		console.log(data.parts);
		var opts= "";
		for( model in selectedTypeModels){
			if((selectedTypeModels[model].id == modelId)&&(selectedTypeModels[model].defaultModel)){
				    opts += "<option value='0'";
					if(group==null)opts += "selected='selected'";
					opts += ">Default</option>";				
		     }
		}

		var parts = data.parts;
		if (parts == null || parts.length < 1) {
			if(opts == ''){ inputs += "<p style='color:red'>No Parts Found for this Model</p>";}
			else {
				inputs += "<label>Select Part: <select  name='partGroup'  >";
				inputs += opts;
				inputs +="</select></label>";	
			}
			document.getElementById('partsForNodes').innerHTML = inputs;
		} else {
			var wholeParts = groupParts(parts);
			wholeParts.forEach(function(wpart){
				opts += "<option value='" + wpart[0].group + "'";
				if((group>0)&&(wpart[0].group == group)) {opts +="selected='selected'";}
				opts +=">" + wpart[0].name + "</option>";			
			});		
			inputs += "<label>Select Part: <select  name='partGroup'  >";
			inputs += opts;
			inputs +="</select></label>";
			document.getElementById('partsForNodes').innerHTML = inputs;		
		}

	});

}
//====================================================================================================

function createNodesOptionsBox(typeName) {
	
	$("#grid-instances").css({'visibility':'visible'});
	var createNodesOptions = document.createElement('div');
	options = "<button type=\"button\" onclick=\"showAddNodeDialogWithTypeSelected('" + typeName + "');\">Orphan</button>";
	options += "<button type=\"button\" onclick=\"loadConnsByEndType('" + typeName + "');\">With Edge</button>";
	options += "<button type=\"button\" onclick=\"cancelInstForm();\">Cancel</button>";
	createNodesOptions.innerHTML = "This type is a root type. Do you want to create an orphan node under the type, or create a node with an edge?<br><br>" + options;
	(new DisplayLogicalRenderer()).emptyAllInst();
	$('#nodeForm').append(createNodesOptions);

}
//  Addded 27-10-2016
function retrieveModelShapes(shapes){
	var foundShape= false;
	for (var i = 0; i < shapes.length; i++) {
		if (shapes[i].hasOwnProperty("groupShape")){
				if((shapes[i].groupShape == 'RECTANGLE')||(shapes[i].groupShape ==  'LINE')||(shapes[i].groupShape == 'TEXT')){
			foundShape = true;
			break;
				}
		}
	}
	return foundShape;	
}

//===========================================================================
function cancelInstForm() {
	(new DisplayLogicalRenderer()).emptyAllInst();
}

function hasDeco (type, decoId) {
	var typeHasDeco = false;
	if(type && type.decorators){
	for (var i = 0; i < type.decorators.length; i++) {
		if (type.decorators[i] == decoId) {
			typeHasDeco = true;
			break;
		}
	}
	}
	return typeHasDeco;
}







