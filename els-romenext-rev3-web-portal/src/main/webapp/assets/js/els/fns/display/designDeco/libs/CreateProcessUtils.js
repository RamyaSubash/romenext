/**
 * 
 */
function CreateProcessUtils() {
	
}

   CreateProcessUtils.initFct = function( index  ) {               // index is an entry in tab_table 
	   
	   DisplayInterfaceUtils.resetInterface(); 
	   
	  var tab    = CreateProcessUtils.loadTab(index);
      console.log( tab + " this is the tab ");  
      if($.isEmptyObject(tab)){
  		console.log("Error in retrieving the Tab info ");
  		return;
  	}
	  var name  = tab.tabName;
	  var label = tab.buttonLabel;
	  // retrieve all objects and their properties
	  var result = CreateProcessUtils.loadObjects(index);
	  // build objects into tabObjects global variable
	  CreateProcessUtils.buildObjects(result); 
	  // build realationships between objects to create connections -  then build data model
	  CreateProcessUtils.findRelationship();
	  // Create the Forms for these objects 	
	  CreateProcessUtils.displayForm( index , name , label );
	}
   

   
	CreateProcessUtils.displayForm = function ( index , nameTab , label){
 	   var mainDiv = $('#'+nameTab+'PaneView');
		mainDiv.innerHTML = '';
		var bars  = document.getElementById('headers'+nameTab);			
		if(document.getElementById('headers'+nameTab) == undefined || document.getElementById('headers'+nameTab) == null) {	
			bars = GlobalHTMLUtils.createHTMLEntity('div', 'headers'+nameTab, 'panel-heading', 'visible', 'block', 'Bars');	
			mainDiv.append(bars);
		}
		
		var button = '<input type="button"  id="reset" class="btn btn-primary btn-xs"  value="Reset Tab" onclick=" CreateProcessUtils.initFct('+index+')" />';
		document.getElementById('headers'+nameTab).innerHTML = button;
		
		var tabCreationBody = document.getElementById('tabCreationBody'+nameTab);
		if(document.getElementById('tabCreationBody'+nameTab) == undefined || document.getElementById('tabCreationBody'+nameTab) == null) {	
			tabCreationBody = GlobalHTMLUtils.createHTMLEntity('div', 'tabCreationBody'+nameTab, 'cy', 'visible', 'block', '');		
			mainDiv.append(tabCreationBody);
		}
					
		$('.work_addInstance').remove();				
		GlobalHTMLUtils.createAppendHTMLEntity('div', 'work_addInstance'  , 'work_addInstance', 'visible', 'block', '', tabCreationBody);		
						
		CreateProcessUtils.setWorkingDiv( label, nameTab  );
		
	}
	
	CreateProcessUtils.setWorkingDiv = function ( label , nameTab ){
		
		var workDiv = $('#work_addInstance');
		
		DesignDecoUtils.generateAddingToPath ( workDiv );

		for( var i=0; i < tabObjects.length; i++ ){

			var typeId = tabObjects[i].typeId;				
			GlobalHTMLUtils.createTypeEntity (  typeId, workDiv);
			
			var inputContentList = '';
			// Section to display the list of properties for the TypeId
			inputContentList     +=  '<div id="addNodeInst_'+ typeId +'"></div>';  
			var  bodyDivProperty = $( "#divTypeProperty_"+typeId);
			bodyDivProperty.append(inputContentList);
			var props = tabObjects[i].propertiesIds;
			console.log("call from  CreateProcessUtils.setWorkingDiv  props =  "+props);
			CreateProcessUtils.addNodeDetails( $("#addNodeInst_"+typeId), typeId, props );
		}
		   		
		if(document.getElementById('footer_addInstance') == undefined || document.getElementById('footer_addInstance') == null) {		
			GlobalHTMLUtils.createAppendHTMLEntity('div', 'footer_addInstance'  , 'footer_addInstance', 'Display', 'block', '', workDiv);			
		}		
	  
		//  Add the "CREATE" & "CANCEL" Buttons in the footer section
	  var name  = typeMapViaId[typeId].name;
	  var label = label;
	  var footer  = '<hr/><p><font color="red">Red Color Property</font> are Mandatory<br/><font color="red">Red Color Type</font>  are mandatory  </p>';
	  footer += '<p><input type="button"  name="submit" class="btn btn-primary btn-xs"   id="addNodeInst_submit" value="'+label+'" onclick="CreateProcessUtils.saveNodeInfo();"/>';		
	  //footer += '<input type="button"   name="cancel" id="addNodeInst_cancel" value="Cancel" onclick="CreateProcessUtils.createNode_cancel();"/>';
	  footer += '</p>';	
	  footer += '<div id="error_create_message"></div>';
	  $("#footer_addInstance").append(footer);	 
	  
		
	}
	

	CreateProcessUtils.saveNodeInfo = function ( ){
		var listErrors  = [];
    	var node = {};
    	var error = false;
    	var pathIdSelected ;
    	// retrieve Path Info   PathType and NodeUuid (created or existing) 
    	var jsonPath = {};   	
    	node    = document.getElementById('selectedPath');   	        	
    	if(node && node.value == "" ){
        	$('#errorNode_msg').append("<p style='color:red'>Please Select a TYPE Path.</p>");
        	result = "\nYou must select a Type path"; 
            errorElements.push(result); 
            DesignDecoUtils.showError(node, result); 
        	error = true;
        }
    	pathIdSelected = node.value.slice(7);
    	console.log("Path selected is "+ pathIdSelected);
    	
    	var nodePathUuid = null;
    	if(!error ){
    		var option = document.getElementById('createPath').value;
    		if( option ==  'create'){
    			// retrieve Path properties 
    			var value = typeMapViaId[pathIdSelected];
    			var properties=[];	
				properties = NodeUtils.retrieveNodePropertiesFromForm( Number(pathIdSelected ), 'form_inst_add_val_');
				
				if(properties[properties.length-1]){
					console.error(" do not continue the saving Process -- error in retrieving properties for Path type "+value.type);
					$('#console-log').append("<p style='color:red'>Node properties retrieval  Failed for type ."+typeMapViaId[value.type].name +"</p>");
					error = true;
					return; 
				}
				properties.pop();  
                // save path 
		    	jsonPath[ "typeId" ] = pathIdSelected;
		    	jsonPath[ "selectedMetaData" ] = selectedMetaData;
		    	jsonPath[ "defaultDecorator" ] = "1";
		    	jsonPath[ "properties" ]       = properties;
		    	
		    	var doneFunction = function( dataNode ) {
		    		if(!$.isEmptyObject(dataNode)){
		    			$('#console-log').append("<p style='color:blue'>Node Path created successfully.</p>");
		    			dataNode.color = typeMapViaId[dataNode.typeId].color;
		    	 	   // update corresponding section and nb of type nodes 			
		    			NodeUtils.AddNodeToMap( dataNode);   
		    			GlobalUtils.addNBTypeInstances(dataNode);						
		    			nodePathUuid = NodeUtils.findUUID (dataNode);
		    			console.log("Nodepth is "+ nodePathUuid);
		    		}else {
		    			$('#console-log').append("<p style='color:red'>Creation is successfull but no Node Oath uuid returned</p>");
		    		}
		    	};
		    		
		    	var failFunction = function( xhr, status, error ) {
		    		console.log('Error Node not created: ' + xhr.status);
		    		$('#console-log').append("<p style='color:red'>Error Node Path not created:"+ xhr.status+"</p>");	
		    	};
		    	
		    	var api  = new NodeApis();
		    	api.saveNode( jsonPath,  doneFunction, failFunction );

    		}else if ( option == 'use'){
    			
    			var node    = document.getElementById('selectedNode');   	        	
    			if(node && node.value == "" ){
    		    	$('#errorNode_msg').append("<p style='color:red'>Please Select a Path instance.</p>");
    		    	result = "\nYou must select a path instance"; 
    		        errorElements.push(result); 
    		        DesignDecoUtils.showError(node, result); 
    		    	error = true;
    		    }
    			nodePathUuid = node.value.slice(9);
    			console.log(" Path node used is  "+ nodePathUuid);	
    		}
    		
    	}
    	if(nodePathUuid == null){
    		console.log("Not able to create Path STOP!");
    		return;
    	}
    	
    	nodesToUpdate = [];
    	if($.isEmptyObject(tabObjects)){
    		console.log("Error there are no nodes to create ");
    		return;
    	}
    	// nodes to save are the tabObjects global variable
    	for ( var i= 0; i< tabObjects.length ; i++){
    		node = {type : tabObjects[i].typeId, nodeUuid : null, mustOrNot: true, action : 'createNode', propertiesIds :tabObjects[i].propertiesIds };
    		nodesToUpdate[tabObjects[i].typeId] = node;
    		node = {};
    	}
		// saving nodes 
    	nodesToUpdate.forEach(function( value ){
			// this should create the node for the current Type 
			console.log("%c Inside loop to retrieve nodes properties ", "color:blue"); 						
			if( value.action == 'createNode'){
				console.log("%c Attempting to add a new Node for this type :" + typeMapViaId[value.type].name , "color:purple" );	
				var properties=[];	
					properties = NodeUtils.retrieveNodePropsFromTabForm( value.type , 'form_inst_add_val_', value.propertiesIds);	
				// look if it is optional or mandatory 	
				if(properties[properties.length-1]){
					console.error(" do not continue the saving Process -- error in retrieving properties for type "+value.type);
					$('#console-log').append("<p style='color:red'>Node properties retrieval  Failed for type ."+typeMapViaId[value.type].name +"</p>");
					listErrors.push('no properties found for  '+typeMapViaId[value.type].name+ '<br/>');
					return;
				}
				properties.pop();                     // everything is fine remove boolean					
				value.properties = properties;				
			}			
		});

    	// verifying if no error otherwise stop process and display error
    	 console.log( nodesToUpdate);		  
	     if(listErrors.length != 0 ){
			console.log("List of Errors : " +listErrors);
			$('#error_create_message').append(listErrors)
			return;
		 }else {
			console.log("%c Retrieval of nodes properties Successfull ", "color:blue");
		 }
    	// No error save nodes with their properties
	     var nodes = [];
	     
	     nodesToUpdate.forEach(function( value ){ 
    		 if( value.action == 'createNode'){
    			 NodeUtils.SaveNodeCreated (value.type, value.properties ); 
	    		 if(!listInstUuids[0]){
						console.log("failure in creating  node for  "+ value.type);
						$('#console-log').append("<p style='color:red'>Node creation Failed for type :"+typeMapViaId[value.type].name +" </p>");
						value.nodeUuid = null;
						 value.saving = 'failed';
						return;
				 }
				 value.nodeUuid = listInstUuids[0];
				 value.saving = 'completed';
				 nodes[listInstUuids[0]] = nodeMap[listInstUuids[0]];
				 console.log("%cNode creation successfully for type "+typeMapViaId[value.type].name , "color:blue");
				 $('#console-log').append("<p style='color:blue'>Node creation successfully for type "+typeMapViaId[value.type].name +"</p>");	
    		 }
    	 });
	     console.log("Retrieved nodes are : "+ nodes);
	     console.log("path Type Id is "+pathIdSelected );
	     
	     CreateProcessUtils.saveAssociatedPath ( nodes ,  pathIdSelected,  nodePathUuid );
	     
	     
	     
	     // creating the relationships
	     var errorProcess = false;
	     nodesToUpdate.forEach(function( value ){ 
	    	 if(value.saving == 'failed'){
	    		 console.log("process saving node for type  "+ value.type +" failed cannot create Relationship ");
	    		 errorProcess = true;
	    	 }
	     });
	     if( !errorProcess ) {
	    	 createEdgeList = [];
				for( var j=0; j < listAllNodes.length; j++){
					var currElement = listAllNodes[j];
					if(  nodesToUpdate[ Number(currElement.startNodeType)] &&  nodesToUpdate[Number( currElement.endNodeType)] ){
						if( (nodesToUpdate[ Number(currElement.startNodeType)].nodeUuid != null ) && (nodesToUpdate[Number( currElement.endNodeType)].nodeUuid != null) ){	
							var object = { 
									startNodeType : currElement.startNodeType,
									endNodeType   : currElement.endNodeType,
									currNodePos   : currElement.currNodePos,
									connection    : currElement.connection,
	                                startNodeUuid : nodesToUpdate[ Number(currElement.startNodeType)].nodeUuid,
	                                endNodeUuid   : nodesToUpdate[Number( currElement.endNodeType)].nodeUuid,
									edge          : 'createEdge'
								}
							var conId = currElement.connection.id;
							createEdgeList.push(object);
							object = {};
						}else {
							console.log("Error missing node Uuid value can not create edge ");
						}
					}else {
						console.log("Error missing type Info node  value can not create edge ");
					}
				}
				// should have the list of completed info about edges creation
				var jsonData = {}, element ={};
				 if(! $.isEmptyObject(createEdgeList)){
				    	console.log("create edge list is  not empty");
					    console.log("%c Starting Edges creation ", "color:blue");			    
						for( var j=0; j < createEdgeList.length; j++){
							element = createEdgeList[j];
							jsonData = NodeUtils.createEdgeJson( element.startNodeType,  element.startNodeUuid, element.endNodeType, element.endNodeUuid, element.connection.id  );
							if(!$.isEmptyObject(jsonData)) {
								var apiEdge  = new EdgeApis();				
								var doneFunction = function ( dataEdge ){
									if(!$.isEmptyObject(dataEdge)){
										console.log("Edge created ");
										$('#console-log').append("<p style='color:blue'>Edge creation successfull: </p>");
										// add edge to edgeMap
										NodeUtils.AddEdgeToMap( dataEdge);	
										
									}else {
										// error
										$('#console-log').append("<p style='color:red'>Creation of Edge did not return a value for edge :"+jsonData +" </p>");
										console.error("Creation of Edge did not return a value for edge "); 
									}
								}				
								var failFunction = function (  xhr, status, error ){
									console.error('Error Edge not created: ' + xhr.status);
									$('#console-log').append("<p style='color:red'>Error Edge not created:"+ xhr.status+"</p>");	
								}						
								apiEdge.saveEdge( jsonData,  doneFunction, failFunction );	
							}else {
								console.log("error in edge jsonData");
								$('#console-log').append("<p style='color:red'>Problem in jsonData creation for element :"+element +" </p>");
							}
							element   = {};
							jsonData  = {};
							
						}
				 }else {
					 console.log("No edges to create ");
				 }
	     }
	    
	     
	    
	     
	     
	     
   
	     $('.work_addInstance').empty();
	     nodesToUpdate = [];
	     listErrors = [];
	     createEdgeList = [];
	     elementFound = [];
	     node = {};
	     
	}


//==================================================================================================================

	CreateProcessUtils.addNodeDetails = function( appendToDiv, typeId , props ){
		
		if(!typeId ){
			console.log(" no Type Id provided: cannot build create Instance table  "); 
			return;
		}
	
		var tmpType = props;
		// populate the Add INSTANCE FORM with properties	              
		var propcolor = '', typeDate = 'date';			                           // RED color used to highlight Mandatory property
			
	    var listDates = [];
		// build the form
		var inputContent = '';
		    inputContent += '<table id="tableNodeCreate_' + typeId + '>';
	
		if(!$.isEmptyObject( tmpType)){
//			tmpType.forEach(function( tmpProp ){
				$.each( tmpType, function( pkey, tmpProp ) {	
				var value = tmpProp.defaultValue;		
				inputContent += '<tr id="typeProps">';
				if(tmpProp.isMandatory){ propcolor='color:red'  } else {propcolor='color:black' };		
				if( tmpProp.propertyType == "DATE" ) {    				
					inputContent += '<td style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input type="text"  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" value="' + today 
					+ '" / ></td><td>(DATE)<span id="'+tmpProp.id+'_error"></span></td></tr>' ;
					listDates.push(tmpProp.id);
				   				
				}else if( tmpProp.propertyType == "BOOLEAN" ) {
					inputContent += '<td style='+propcolor+'>'+ tmpProp.name + ':</td>';
					inputContent += '<td><input type="radio" name="'+tmpProp.name+ '" id="form_inst_add_val_' + tmpProp.id + '"  value ="true" checked="checked"/>True'
					inputContent += '<input type="radio"  name="'+tmpProp.name+'" id="form_inst_add_val_' + tmpProp.id + '"  value="false"/>False</td><td>(BOOLEAN)</td></tr>' ;
				
				} else {
						
					inputContent += '<td style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" ' ;		
					if( tmpProp.propertyType == "STRING" ) {
						inputContent += ' type="text" value="" / ></td><td>(TEXT)</td> </tr>' ;
					} else if( tmpProp.propertyType == "INTEGER" ) {
						inputContent += 'type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57 " value=""  / ></td><td>(INTEGER) </td></tr>' ;
					} else if( tmpProp.propertyType == "DOUBLE" ) {
						inputContent += 'type="text"  onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 8 || event.charCode === 46" value="" / ></td><td>(DOUBLE) </td></tr>' ;
					} else if( tmpProp.propertyType == "FILE" ) {
						// include thumbnail
						inputContent += 'type="file"  value="" onchange="GlobalUtils.showFile(event, \'' + tmpProp.id + '\')"/>'
						 + '<a target="_blank" id="show_image_file_output_' + tmpProp.id + '"   href=""><img  class="imgthumb" id="image_file_output_' + tmpProp.id + '" style="display:none;" height="50" width="50"  ></a>' 
						 + '<a id="other_file_output_' + tmpProp.id + '" style="display:none;"></a>' 
						 + '(FILE) </td></tr>' ;																	
					} else if( tmpProp.propertyType == "CURRENCY" ) {
						inputContent += 'type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 8 || event.charCode === 46 " value="" / >(CURRENCY) </td></tr>' ;
					} else {
						inputContent += 'type="text" value="" / ></td><td>(UNKNOWN TYPE) </td></tr>' ;		
					}			
				}	
			});
	    }else {    
	    	inputContent += "<tr><td colspan='2'> No Properties defined for this Type </td></tr>";   
	    };
		
	    inputContent = inputContent + "</table><br />";   
	    appendToDiv.append( inputContent);
	    for (var i=0; i< listDates.length; i++){
	    	$("#form_inst_add_val_"+listDates[i]).datepicker({
	    		changeMonth: true,
	  	        changeYear: true,
	    	    dateFormat: "yy-mm-dd",
	    	    yearRange : "1950:"+(new Date).getFullYear()
	    	});
	    }	
	}
	
	CreateProcessUtils.loadTab = function( tabId  ){
		var result = null;
		var jsonData = {};
		jsonData['tabId']= tabId;
		var doneFunction = function( data ) {
			if(!$.isEmptyObject(data) && data.success){
				result = data.tab;
			}														
		};
			
		var failFunction = function( xhr, status, error ) {
			console.log('Error getting the Tab  ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Error getting the Tab :"+ xhr.status+"</p>");	
		};
		
		
		var api  = new TabDecoApi();
		api.loadTab(jsonData, doneFunction, failFunction );		
		return result;	
	}

	CreateProcessUtils.loadObjects = function( tabId  ){
		var result = null;
		var jsonData = {};
		jsonData['tabId']= tabId;
		var doneFunction = function( data ) {
			if(!$.isEmptyObject(data) && data.success){
				result = data;
			}														
		};
			
		var failFunction = function( xhr, status, error ) {
			console.log('Error getting the Tab  ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Error getting the Tab :"+ xhr.status+"</p>");	
		};
		
		
		var api  = new TabDecoApi();
		api.loadObjects(jsonData, doneFunction, failFunction );		
		return result;	
	}

	CreateProcessUtils.buildObjects = function (result  ){
		  var objects = result.objects;
		  var objectProps = result.objectProperties;
		  
		  console.log(objects);
		  tabObjects = [];
		  var tabObject = {}, property = {}, propertyTopush = {}, propertiesIds = {};
		  for(var i =0 ; i< objects.length; i++ ){
			  tabObject.typeId =  objects[i].rometype;
			  for( var j = 0 ; j < objectProps.length; j++){
				  if( objectProps[j].tabObject == objects[i].id  ){
					  property = NodeUtils.findIdPropertyFromType ( tabObject.typeId, objectProps[j].romeTypeProperty );  
					  var propId  = property.id;
//					  propertyTopush = {propId : property}
				      propertiesIds[propId] = property;
					  property =  {};
				 }
			  }
			  tabObject.propertiesIds = propertiesIds;
			  tabObjects.push(tabObject);
			  propertiesIds = {};
			  tabObject = {};
		  }
		  
	}
	
	CreateProcessUtils.findRelationship = function ( ){
   		if($.isEmptyObject(tabObjects)){
    		console.log("Error there are no nodes ");
    		return;
    	}
   	   listAllNodes       = [];
   	   elementFound       = [];
   	   var startType, endType;
	   for(var i=0; i < tabObjects.length; i++ ){
		   startType  = tabObjects[i].typeId;
		   elementFound.push(startType);
		   for(var j=0; j< tabObjects.length; j++ ){
			   endType = tabObjects[j].typeId;
			   if( startType != endType ){
				   var conns = GlobalConnUtils.findConnsBySourceAndTarget ( startType, endType );
				   if( conns && conns.length >0 ){
					   for (var key in conns) {
						   listAllNodes.push({ startNodeType : startType, NodePos : 'asParent' , endNodeType : endType, connection : conns[key] });
					   }
				   }
			   }
		   }
		   
	   }
   	}

	CreateProcessUtils.saveAssociatedPath = function ( nodes, pathIdSelected, pathNodeUuid ){
		
		pathNodeMap  = [];
		// add selected nodes to the created node Path
		for (var key in nodes) {
			var element = nodes[key];		
	        var jsonData = {};
			
			jsonData["pathTypeId"] = pathIdSelected;
			jsonData["pathNodeSysProperties"] = [];
			var pathNodeUuidSysProperty = {};		
			pathNodeUuidSysProperty = NodeUtils.createSysJson( pathNodeUuid );			
			jsonData["pathNodeSysProperties"].push(pathNodeUuidSysProperty);
			
			
			jsonData["nodeTypeId"] = element.typeId;
			jsonData["nodeSysProperties"] = [];
			var nodeUuidSysProperty = {};
			nodeUuidSysProperty  = NodeUtils.createSysJson( key );
			
			jsonData["nodeSysProperties"].push(nodeUuidSysProperty);

			console.log(jsonData);
			// create edge between node path and node type
	        var successFunction = function( data ) {			
				
				var node = data.edges[0].destinationNode;
				var uuid = NodeUtils.findUUID( node );	
				if (uuid != null  && key == uuid) {
					if (!pathNodeMap[uuid]) {
						pathNodeMap[uuid]= node;
					}
				}			
			}
			
			var failFunction = function( xhr, status, error ) {
				$("#console-log").append("Failed to Assign Node To Path Node: " + xhr.status);
		  	    console.log("Error: " + xhr.responseText); 
			}
			
			var pathNodeApis = new PathNodeApis();
			pathNodeApis.assignNodeToPath(jsonData, successFunction, failFunction);
			
		
		}
		
		console.log(" Created a Path  whose uuid is : "+ listInstUuids[0] );
		console.log(" There are "+ Object.keys(pathNodeMap).length +" nodes added " );
		
		
	}
	
	