/**
 * 
 */
function checkTypeIsRoot(typeName) {
	console.log("what is the Type dragged "+ typeName);
//	console.log(" content of NodeSelected is    "+ NodeSelected);
//	console.log(" content of prevDrilldown is:  "+ prevDrilldown);
//	console.log(" content of Focussed           "+ LD_FocussedNode );
	
	// Check if the type has physical deco   -- updated 26-01-2017 removed this as physical deco not activated
//	if(typeName) {  if(hasDeco(typeMap[typeName], 2) == true) { // at least one model is created for this type
//																// check if default part is defined by loading properties related to this model
//		                                                        loadModelNode(typeName)															
//																}
//	                else{ selectedTypeModels = null;      }
//	}
	
	var nodeToUse = null;
	
	if(NodeSelected) {    
		 var NodeParent = {}; 
		 NodeParent = nodeMap[NodeSelected];  
 		 NodeParent.uuid = NodeSelected;
		 nodeToUse =NodeParent;
		 createNode(typeName, nodeToUse);
	}else {
		var top = getTopHistory();
		if(top !=null){
		                if(prevDrilldown.uuid = top.value  ){
		                   console.log("value of Focussed element is "+ prevDrilldown.cyDisplay);
		      			   nodeToUse = prevDrilldown;
		      			   createNode(typeName, nodeToUse);
						}else {
							message ="<p style='color:Blue'>Creating ORPHAN Node</p>";
							AddNodeWithTypeSelected(typeName); 
							message='';
						}
	   }else {
		    message ="<p style='color:Blue'>Creating ORPHAN Node</p>";
		    AddNodeWithTypeSelected(typeName); 
			message='';
	   }
	}


}

function createNode(typeName, nodePassed){
	var nodeT = nodePassed.type, isSomeChild= false;           // get the Type for the selected node
// get the connection if any which link the selected node with the dragged Type to create

	var availableConns = [];
	for (conn in connMapViaId) {
		if (ruleMap[connMapViaId[conn].rule].classification == "parentchild") {
			if ((connMapViaId[conn].destination == typeName)&&(connMapViaId[conn].origin == nodeT)) {
				availableConns.push(connMapViaId[conn]);
//				isSomeChild = true;
//				break;
			}
		} else if (ruleMap[connMapViaId[conn].rule].classification == "link") {
			if (((connMapViaId[conn].destination == typeName)&&(connMapViaId[conn].origin == nodeT)) || ((connMapViaId[conn].destination == nodeT)&&(connMapViaId[conn].origin == typeName))) {
				availableConns.push(connMapViaId[conn]);
//				isSomeChild = true;
//				break;
			}
		}		
	}
	// console.log("NodeSelected is : "+nodeT + " type dragged to create an instance is : "+typeName+" Connected by "+conn);
	if(availableConns.length != 0){
		message ="<p style='color:Blue'>Creating a Child Node of  '"+nodePassed.cyDisplay+"' </p>";
		AddNodeWithKnownEdge(typeName, nodePassed, availableConns);
		message='';
	}else {  
//		Otherwise create an Orphan node or create a node where the user will select the connection
		message ="<p style='color:Bue'>Creating a Node not directly linked to Selected Node  '"+nodePassed.cyDisplay+"' (Orphan)</p>";
		AddNodeWithTypeSelected(typeName); 
		message='';
    }			
}

//===============================================================================

function AddNodeWithTypeSelected(currentType) {
	$("#grid-instances").css({'visibility':'visible'});
	var Form = document.createElement('div');
	if (selectedMetaData != null) {
		var inputs = "",typeProperties, inputsProps='', decorators, inputModel='',propcolor='' ;
		var formHeader = "<form id='addNodeDialog'>"; 
		inputs += "<div id='typeName'><label> Type Selected:" + currentType + "</label><input type='hidden' name='type' value='"+currentType+"'/><input type='hidden' name='typeId' value='"+typeMap[currentType].id+"'/></div>";
        // display the list of properties for this  Type  
		typeProperties = typeMap[currentType].typeProperties;
		inputsProps = "<table  id='properties'>";
		$.each(typeProperties, function(key, typeProperty){    
			if(typeProperty.isMandatory) {propcolor='color:red'}
			else{propcolor='color:black'   }
			
			inputsProps += "<tr><th style=" + propcolor + "><input type='hidden' name='propertyId' value='" + typeProperty.id + "'>" + typeProperty.name + ": </th><td>";
			
			if (typeProperty.propertyType === "FILE") {
				inputsProps += "<input type='file' name='value' onchange='GlobalUtils.showFile(event, \"" + typeProperty.id + "\")'/>"
							+ "<img id='image_file_output_" + typeProperty.id + "' style='display:none;' height='50' width='50'>"
							+ "<a id='other_file_output_" + typeProperty.id + "' style='display:none;'></a>"
							+"(" + typeProperty.propertyType + ")";
			} else {
				inputsProps += "<input type='text' size='10' name='value' />(" + typeProperty.propertyType + ")";
			}
			
			inputsProps += "<input type='hidden' name='propertyType' value='" + typeProperty.propertyType + "'></td></tr>";
	
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

		var formFooter = "<div id='nodeProperties'>"+inputsProps+"</div><div id='decopropertieslist'>"+inputDecoAll+"</div>" +  "<div id='defaultDecoForNode'>" + inputsDefaultDeco + "</div>";

    	if (document.getElementById("irvCy").style.display == "block") {   		
    		formFooter += "<input type='button' value='Add Node' class='btn btn-primary btn-sm'    onclick='saveNewNode(form)' />";
    	} else if (document.getElementById("mrvCy").style.display == "block") {
    		formFooter += "<input type='button' value='Add Node' onclick='saveNewNodeWithLatLng(form)' />";
    	} else {
    		formFooter += "<input type='button' value='Do Nothing'/>";
    	}		
    	formFooter += "<input type='button' value='Cancel'  class='btn btn-primary btn-sm'  onclick='cancelInstForm()' />";
		Form.innerHTML = message + formHeader  + inputs + formFooter;
		(new DisplayLogicalRenderer()).emptyAllInst();
		$('#nodeForm').append(Form);
	} else { $('#console-log').append("<p style='color:red'>Please select a MetaData Repo</p>"); }
	
}

//=================================  SAVE NODE =======================================
function saveNewNode(form) {
	var detailNode = {}, foundError = false;
	var jsonData = {}, nodeProperties = [], nodeproperty = {}, nodeDecoProperties ;
	$(form).find('div#typeName').find(':input').each(function (i, field) {
		jsonData[field.name] = field.value;
	});
	// Retrieve all properties and create json
	
	$(form).find('div#nodeProperties').find('tr').each(function (i, propDiv) {
		$(propDiv).find(':input').each(function(i, field){
			if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
				
				if (field.type === 'file') {
					nodeproperty[field.name] = field.files[0];
				} else {
					nodeproperty[field.name] = field.value;
				}
				
		   }
		});
		
		if (nodeproperty.propertyType === "FILE") {
			var file = nodeproperty.value;
			nodeproperty.value = {};
			if (file.type.includes("image/")) {
				nodeproperty.value.file = document.getElementById('image_file_output_' + nodeproperty.propertyId).src.replace("data:" + file.type + ";base64,", "");
			} else {
				nodeproperty.value.file = document.getElementById('other_file_output_' + nodeproperty.propertyId).href.replace("data:" + file.type + ";base64,", "");
			}
			nodeproperty.value.filename = file.name;
		}
		
		// verify if property is mandatory -- is there a value -- store it
		//        if not mandatory         --- there is no value     ----- do not pass property
		//                                 --- there is value        ----- pass property 
		var isPropMand = NodeUtils.findPropInType(nodeproperty.propertyName, jsonData['type']);
		if(isPropMand){  if (nodeproperty.value)	{
	                                          nodeProperties.push(nodeproperty);
		                 }else{
			                      console.log("Missing Value for compulsory property.");
			                      $('#nodeForm').append("<br/><p style='color:red'>Missing Value for Mandatory property : "+ nodeproperty.propertyName);		                   
			                      foundError= true;
		                  }
		}else {
			// not mandatory look if there is a value		
			if (nodeproperty.value)	{  nodeProperties.push(nodeproperty);	}
		}
	    nodeproperty = {};
	});

	//   Retrieve all deco properties and create json
	console.log(nodeProperties);
	
	if(!foundError) {
		jsonData.properties = nodeProperties;	
		$(form).find('div#defaultDecoForNode').find(':input').each(function (i, field) {
			jsonData[field.name] = field.value;
		});
		
		nodeDecoProperties = [];
	    nodeDecoProperties.push({propertyName:"x", value:dragItemPositionX.toString(), propertyType:"DOUBLE", romeDecoPropId:"1"});
	    nodeDecoProperties.push({propertyName:"y", value:dragItemPositionY.toString(), propertyType:"DOUBLE", romeDecoPropId:"2"});
	    nodeDecoProperties.push({propertyName:"z", value:"0", propertyType:"DOUBLE", romeDecoPropId:"3"});

	jsonData.decoProperties = nodeDecoProperties;	
	
	//console.log(jsonData);
	if (selectedMetaData != null){
		
		var successFunction = function( data ) {
			// check if first node created for this type		
			if(!irvCy) { 					
				var nodes = [];	
				nodes.push(DisplayCytoscapeUtils.formatSingleNode(data));			
				setTimeout(function() {irvCy =  initNodeEdgeGraph(irvCy, "irvCy",  nodes);
				}, 100);
				
			}
			else{
				DisplayCytoscapeUtils.updateInstanceGraph (irvCy, DisplayCytoscapeUtils.formatSingleNode(data));
			}
		    
//			if (document.getElementById("mrvCy").style.display == "block") {
//				updateGeoMapWithNode(data);
//			}
			// update node bar
			retrieveBar(nodeMap);
			(new DisplayLogicalRenderer()).emptyAllInst();
			detailNode.nodes = [];
			detailNode.nodes.push(data);
			message = "<p style='color:green'> Node Saved</p>";
//			showUpdateNodeProperties(detailNode);	
			showUpdateNodeProperties(data);	
			message ='';
		};
		
		var failFunction = function( xhr, ajaxOptions, error ) {
			console.log('Error Node not saved: ' + xhr.responseText);
			$('#console-log').append("<p style='color:red'>Error Node not saved:"+ xhr.status+"</p>");
		};
		
		var nodeApi = new NodeApis();
		nodeApi.saveNode(jsonData, successFunction, failFunction);
		
	} else { 
		 $('#console-log').append("<p style='color:red'>Can not create a Node, You must First  select a Metadata</p>");
		 cancelInstForm();
		}	
	}
  
}

//================================================================================================================
//this will be called to create a node instance for a type when a node parent is selected
function AddNodeWithKnownEdge(currentType, currentNode, currentConns) {
	$("#grid-instances").css({'visibility':'visible'});
	var Form = document.createElement('div'), propcolor='color:white';
	if (selectedMetaData != null) {
		var formHeader = "<form id='addNodeDialog'>", inputs = "";
		inputs += "<div id='typeName'><label> Node will be created for:" + currentType + "</label><input type='hidden' name='type' value='"+currentType+"'/><input type='hidden' name='typeId' value='"+typeMap[currentType].id+"'/></div>";
	 // display the list of properties for this  Type  
		var typeProperties = typeMap[currentType].typeProperties;
		var inputsProps = "<table  id='properties'>";
		
		$.each(typeProperties, function(key, typeProperty){    
				if(typeProperty.isMandatory) {propcolor='color:red'}
				else{propcolor='color:black'   }
				
				inputsProps += "<tr><th style=" + propcolor + "><input type='hidden' name='propertyId' value='" + typeProperty.id + "'>" + typeProperty.name + ": </th><td>";
				
				if (typeProperty.propertyType === "FILE") {
					inputsProps += "<input type='file' name='value' onchange='GlobalUtils.showFile(event, \"" + typeProperty.id + "\")'/>"
								+ "<img id='image_file_output_" + typeProperty.id + "' style='display:none;' height='50' width='50'>"
								+ "<a id='other_file_output_" + typeProperty.id + "' style='display:none;'></a>"
								+"(" + typeProperty.propertyType + ")";
				} else {
					inputsProps += "<input type='text' size='10' name='value' />(" + typeProperty.propertyType + ")";
				}
				
				inputsProps += "<input type='hidden' name='propertyType' value='" + typeProperty.propertyType + "'></td></tr>";
				
//				inputsProps += "<tr><th style="+propcolor+"><input type='hidden' name='propertyId' value='"+typeProperty.id+"'>" + typeProperty.name + 
//				              "</th><td>: <input type='text' size='10' name='value' />(" + 
//				              typeProperty.propertyType + ")<input type='hidden' name='propertyType' value='"+typeProperty.propertyType+"'></td></tr>";
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
	//	removed this as it part of physical deco
		
		inputEdge = "";
//		inputEdge += "<div id='ruleName'><input type='hidden' value='"+connMap[currentConn].rule+"'/></div>";
		inputEdge += "<div id='parentNodeInstance'><input type='hidden'  value='"+currentNode.uuid+","+currentNode.type +"' /></div>";
		
		if (ruleMap[currentConns[0].rule].classification == "parentchild") {
			message = "<p style='color:blue' id='create_node_message' value=" + currentNode.cyDisplay + ">Creating a node with: <b>"+currentNode.cyDisplay +"</b> as Parent</p>";
		} else if (ruleMap[currentConns[0].rule].classification == "link") {
			message = "<p style='color:blue' id='create_node_message' value=" + currentNode.cyDisplay + ">Creating a node with: <b>"+currentNode.cyDisplay +"</b> Connected</p>";
		} else {
			message = "<p style='color:red' id='create_node_message' value=" + currentNode.cyDisplay + ">Wrong Connection Classification: " + currentConns[0].classification + "</p>";
		}

		var connList = "";
		for (var key in currentConns) {
			if (key == 0) {
//				connList += "<option value='" + currentConns[key].rule + "' selected='selected'>" + currentConns[key].name + "(" + currentConns[key].id + ")" + "</option>";
				connList += "<option value='" + currentConns[key].id + "' selected='selected'>" + currentConns[key].name + "(" + currentConns[key].id + ")" + "</option>";
				
			} else {
//				connList += "<option value='" + currentConns[key].rule + "'>" + currentConns[key].name + "(" + currentConns[key].id + ")" + "</option>";
				connList += "<option value='" + currentConns[key].id + "'>" + currentConns[key].name + "(" + currentConns[key].id + ")" + "</option>";
			}	
		}
		var inputConn = "<strong>Connection:&nbsp;</strong>";
		inputConn += "<select id='rule_name_selector_id' name='ruleName' onchange='(new DisplayLogicalRenderer()).changeMessagesForEdgeClassifications();'>" + connList + "</select>";
		
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
			
		
	//	removed this as part of physical deco 
		// <!-- Allow form submission with keyboard without duplicating the dialog button -->
	
		var formFooter = "<div id='nodeProperties'>"+inputsProps+"</div><div id='decopropertieslist'>"+inputDecoAll+"</div>" +  inputEdge + "<div id='rule_name'>" + inputConn + "</div><div id='defaultDecoForNode'>" + inputsDefaultDeco + "</div>";
		
		
		if (document.getElementById("irvCy").style.display == "block") {   		
			formFooter += "<input type='button' value='Add Node' class='btn btn-primary btn-sm'   onclick='saveNodeAndEdge(form)' />";
//		} else if (document.getElementById("mrvCy").style.display == "block") {
//			formFooter += "<input type='button' value='Add Node' onclick='saveNewNodeAndNewEdgeWithLatLng(form)' />";
//		} else {saveMapPositionAndRetrieveNodePropertiesInMap
//			formFooter += "<input type='button'     value='Do Nothing'/>";
		}
		
		formFooter += "<input type='button'  class='btn btn-primary btn-sm'     value='Cancel' onclick='cancelInstForm()' />";
				
		Form.innerHTML = message + formHeader + inputs + formFooter;
		(new DisplayLogicalRenderer()).emptyAllInst();
		$('#nodeForm').append(Form);
		
	} else {
		 $('#console-log').append("<p style='color:red'>Can not Add a node, You must First  select a Metadata</p>");
		}

}

function saveNodeAndEdge(form) {
	var destUuid,  Nodetails, EdgeDetails;
	if (selectedMetaData != null){
//	        ===================================================NODE SAVING 
//			Get the destination node details 
			Nodetails = retrieveNodeFromForm(form);
			if(Nodetails != null){
				console.log("Node details Retrieved : "+ Nodetails.type);
	//			Save the node details 
				var  data = saveNodeCreated(Nodetails);	
				if(data){   // failed to save a Node ==== Cannot create an edge
					console.log("Node created "+data.type );
		//			Retrieve the new uuid 				
					destUuid =  NodeUtils.findUUID(data);
							
		//         ======================================================EDGE SAVING			
		//			Get the edge details		
					EdgeDetails = retrieveEdgeDetails(form);
					console.log("Edge details Retrieved : "+ EdgeDetails);
		//			Add the New uuid and Type of Destination Node to the json EdgeDetails
					EdgeDetails.destinationNodeUuid = destUuid;
//					EdgeDetails.destinationType = typeMap[data.type].id;
					EdgeDetails.destinationType = data.typeId.toString();
		//			Save the New Edge 	
					saveGenerateEdge(EdgeDetails)
				}
			}
		
	} else { 
		 $('#console-log').append("<p style='color:red'>Can not create a a New connected Node, You must First  select a Metadata</p>");
		 cancelInstForm();
		 }
		 
}

//============================================================================================
function saveNodeCreated(jsonData){
	
	var detailNode = {}, result= null;
	
	if(jsonData){
		
		var successFunction = function( data ) {
			result = data;
			console.log("Node created "+data.type);
			if(data){
				if(!irvCy) {
					NodeUtils.loadAllNodesAndEdges();
					(new DisplayLogicalRenderer()).loadView();
//					initInstanceGraph();    // should never execute
				}
				else{
					DisplayCytoscapeUtils.updateInstanceGraph (irvCy, DisplayCytoscapeUtils.formatSingleNode(data));
				    (new DisplayLogicalRenderer()).loadTypeInstBar(nodeMap);
				}

				detailNode.nodes = [];
				detailNode.nodes.push(data);
				message = "<p style='color:green'> Node Saved</p>";
//				showUpdateNodePropertiesDialog(detailNode);
				showUpdateNodeProperties(data);	
				message = '';			
			}
		};
		
		var failFunction = function( xhr, ajaxOptions, error ) {
			console.log('Error Node not saved: ' + xhr.status);
			$('#console-log').append('Error Node not created: ' + xhr.status);
		};
		
		var nodeApi = new NodeApis();
		nodeApi.saveNode(jsonData, successFunction, failFunction);
		
		return result;
	}
}


function saveGenerateEdge(jsonData){
	
//	var result = false;
//	
//	var connection = connMapViaId[jsonData.connection];
//	var startNodeUuid = jsonData.originNodeUuid;
//	var endNodeTypeId = jsonData.destinationType;
//	
//	 // find how many nodes under endNode type have already created for startNode
//	 var children = GlobalNodeUtils.getAllChildrenNodesUnderType(startNodeUuid, endNodeTypeId);
//	 var numberOfChildren = children.length;
//
//	 if (Number(connection.maxRel) == -1) {
//		 result = true;
//	 } else {
//		 if (numberOfChildren < Number(connection.maxRel)) {
//			 result = true;			 
//		 }
//	 }
	
	if(jsonData){
		
		var successFunction = function( data ) {
			console.log("Edge created ");
			DisplayCytoscapeUtils.updateInstanceGraph (irvCy, DisplayCytoscapeUtils.formatSingleEdge(data));			   
			
		};
		
		var failFunction = function( xhr, ajaxOptions, error ) {
			console.log('Error Edge not created: ' + xhr.responseText);
		};
		
		var edgeApi = new EdgeApis();
		edgeApi.saveEdge(jsonData, successFunction, failFunction);

	}

}


//
//function retrieveNodeProperties(node) {
//	if (selectedMetaData != null){
//	    var jsonData = {}, propertyNode = {}, properties = [];
//	    
//		$.each(node.data(), function(key, value) {
//			if (key == "properties") {
//				value.forEach(function(property){
//					 if(property.name == 'uuid') {
//						 propertyNode = {propertyName : property.name,
//								 		 propertyId : 'uuid',
//						                 propertyType : "STRING",
//						                 value : property.value}
//					 }
//				})
//			} else if(key == 'type') { 
//				jsonData['type'] = typeMap[value].id;
//			}
//		});
//	 
//	    properties.push(propertyNode);
//	    jsonData.properties =properties;
////	    console.log(jsonData);
//	    
//		var successFunction = function( data ) {
//			showUpdateNodeProperties( data);
//			NodeSelected = propertyNode.value;
//			
//			LD_FocussedNode = nodeMap[NodeSelected];
//			LD_FocussedNode.uuid = NodeSelected;
//			ShowFocussedNode(LD_FocussedNode);
//		};
//		
//		var failFunction = function( xhr, ajaxOptions, error ) {
//			$('#console-log').append("<p style='color:red'>Error in Node Retrieval"+xhr.status+"</p>");
//			console.log("Node properties retrieval failed Error: "+ xhr.responseText);
//		};
//		
//		var nodeApi = new NodeApis();
//		nodeApi.getNode(jsonData, successFunction, failFunction);
//	
//	}
//		
//}

function retrieveNodeFromForm(form){
	// get the node details
	var jsonData = {}, nodeProperties = []; 
	var nodeproperty = {}, foundError=false, nodeDecoProperties;
	$(form).find('div#typeName').find(':input').each(function (i, field) {
		jsonData[field.name] = field.value;
	});
	$(form).find('div#nodeProperties').find('tr').each(function (i, propDiv) {
		$(propDiv).find(':input').each(function(i, field){
			if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
				
				if (field.type === 'file') {
					nodeproperty[field.name] = field.files[0];
				} else {
					nodeproperty[field.name] = field.value;
				}

			}
		});
		
		if (nodeproperty.propertyType === "FILE") {
			
			if (nodeproperty.value) {
				var file = nodeproperty.value;
				nodeproperty.value = {};
				if (file.type.includes("image/")) {
					nodeproperty.value.file = document.getElementById('image_file_output_' + nodeproperty.propertyId).src.replace("data:" + file.type + ";base64,", "");
				} else {
					nodeproperty.value.file = document.getElementById('other_file_output_' + nodeproperty.propertyId).href.replace("data:" + file.type + ";base64,", "");
				}
				nodeproperty.value.filename = file.name;
			}
			
		}
		var isPropMand = typeMapViaId[jsonData['typeId']].typeProperties[nodeproperty.propertyId].isMandatory;
//		var isPropMand = findPropInType(nodeproperty.propertyName, jsonData['type']);
		if(isPropMand){  if (nodeproperty.value)	{
	                                          nodeProperties.push(nodeproperty);
		                 }else{
			                      console.log("Missing Value for compulsory property.");
			                      $('#nodeForm').append("<p style='color:red'>Missing Value for Mandatory property : "+ nodeproperty.propertyName);
			                      foundError=true;
			                     
		                  }
		}else {
			// not mandatory look if there is a value
			if (nodeproperty.value)	{  nodeProperties.push(nodeproperty);	}
		}
	    nodeproperty = {};
		
	});
	if(!foundError){
		jsonData.properties = nodeProperties;
		$(form).find('div#defaultDecoForNode').find(':input').each(function (i, field) {
			jsonData[field.name] = field.value;
		});
		

		nodeDecoProperties = [];
	    nodeDecoProperties.push({propertyName:"x", value:dragItemPositionX.toString(), propertyType:"DOUBLE", romeDecoPropId:"1"});
	    nodeDecoProperties.push({propertyName:"y", value:dragItemPositionY.toString(), propertyType:"DOUBLE", romeDecoPropId:"2"});
	    nodeDecoProperties.push({propertyName:"z", value:"0", propertyType:"DOUBLE", romeDecoPropId:"3"});
	   jsonData.decoProperties = nodeDecoProperties;	
				
	   return jsonData;
	}else { return null;}

}



function retrieveEdgeDetails(form){
	var jsonData2 = {}, uuidType, ruleName;
	var edgeProperties = [], edgeProperty = {};
	$(form).find('div#parentNodeInstance').find(':input').each(function (i, field) {
		if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
			uuidType = field.value;
			var uuidAndType = field.value.split(',');
			jsonData2["originNodeUuid"] = uuidAndType[0];
			jsonData2["originType"]     = typeMap[uuidAndType[1]].id;
		}
	});
	
	$(form).find('div#defaultDecoForNode').find(':input').each(function (i, field) {
		jsonData2[field.name] = field.value;
	});
	
	$(form).find('div#rule_name').find(':input').each(function (i, field) {
		jsonData2["connection"] = field.value;
	});
	
	return jsonData2;		
}



//===========================================================================
//                       UTILITIES
//==========================================================================

function getTopHistory(){
	if(!$.isArray(historyNode)|| !historyNode.length){
		return null;
	}else {
		var  nodeTop   = historyNode.pop();
		return nodeTop;
	}
}









