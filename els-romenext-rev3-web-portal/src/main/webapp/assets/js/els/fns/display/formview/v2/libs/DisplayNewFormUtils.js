/**
 * 
 */
function DisplayNewFormUtils() {
	
}

	DisplayNewFormUtils.createNode = function( typeId , workDiv   ) {
		
		historyNode = [];	
		DisplayFormUtils.resetGV ();
		listTree = [];
				
		DisplayNewFormUtils.findAllTypesRelated( typeId ); 
		// elementFound has all the types found in the paths
		elementFound = typeListFound.slice();
		var elements = DisplayFormUtils.builtDataModelGraphElements(typeId);  // build the elements for the Data Model 
		
		DisplayNewFormUtils.builtListOfRelations(typeListFound  );	
		console.log(" typeListFound contains "+typeListFound );
			
		// build the page with all nodes to create 	
		DisplayNewFormUtils.addFormCreateNode (typeId, workDiv ); 
		DisplayFormUtils.showDataModel (typeId,  elements );              // display the Data model
		
	};
	
	DisplayNewFormUtils.findAllTypesRelated = function ( typeId ){
		if(!typeId  ){
			console.log(" no type provided "+ typeId );
			return;
		}
		curThreshold = 0;
		// current type is saved in the list
		typeListFound  = [typeId.toString()];				
	    var objct = {typeName: typeMapViaId[typeId].name,   mustNode : true, instance: 1};
	    typeListFoundDetails[typeId]= objct;
	    listTree[typeId]= { type: 'mandatory', children: []};                 // ================================To delete
		typeListFound  = typeListFound.concat( DisplayNewFormUtils.findAllRelatedNodes(typeListFound));  
	     // REMOVE DUPLICATE VALUES FROM 
	    console.log( " Element Found before removing duplicate "+ typeListFound);	
	    // should keep the original found items 

	    var uniqueArray =  GlobalUtils.unique (typeListFound);	    		 	 
	    typeListFound = uniqueArray.slice(0);	  
	}

	DisplayNewFormUtils.findAllRelatedNodes = function (  parentId   ){         //   function to find all related types   (mandatory & optional)	
    	var childrenIds = [];
    	if(!$.isEmptyObject( parentId)){
    		// need validation here
    	} 	
    	for (var n = 0; n < parentId.length; n++) {   	
		    	 $.each( connMapViaId , function( key, value ) {  
		    		 if ( parentId[n] == value.source.toString() ){	    			 
		    			 if ( value.minRel >= "0") {
		    				 if( $.inArray(value.target.toString(), childrenIds)  ==  -1 ) {	                   	    	   
                	    	    childrenIds.push(value.target.toString());              	    	    
		    				 } 
		    			 }else {
		    				 // need to add for optional relationship !TODO
		    			 }
		    		 }
		         });	    
    	} 		 
    	curThreshold += 1;
    	if (childrenIds.length == 0) { 		
    		return childrenIds;
    	} else {
    		if( curThreshold <=  thresholdNodeCreation ) {                         //  section which define the depth of searching
    			var ind  = $.inArray(listTypeIds[0], childrenIds);
        		if( ind  !=  -1 ) {  
        		 childrenIds.splice(ind, 1);
        		 console.log(childrenIds );
        		}
        		return childrenIds.concat( DisplayNewFormUtils.findAllRelatedNodes(childrenIds));
    		}  		
    	}  	   		 		    		 
    }

	DisplayNewFormUtils.builtListOfRelations = function ( list  ){
		var mustNode = false, foundCon = [];
		listAllNodes = [];                                                               // global variable to hold all info 
		for ( var i=0; i <list.length ; i++){
			for ( var j= i+1 ; j< list.length ; j++){
				foundCon = NodeUtils.findConnection ( list[i], list[j] );		
				if(foundCon.length == 1) {                                           	// expect one connection  					
					var k=0;
					if ( foundCon[k].minRel >='0') { 
						if(foundCon[k].minRel == '0'){mustNode = false; } else { mustNode = true;}  
					  	listAllNodes.push({ currNodeType : list[i], currNodePos : 'asParent' , relNodeType : list[j], typeNode : mustNode , connection : foundCon[k] });					  	
						var objct = {typeName: typeMapViaId[list[j]].name,   mustNode : mustNode, instance: 1};
						if( !typeListFoundDetails[Number(list[j])]) { typeListFoundDetails[Number(list[j])]  = objct;}
						else {
							typeListFoundDetails[Number(list[j])].instance += 1;
						}

					}else {
						// need to handle Optional Relation !TODO
					}
			}else {
				// found more than one connection ??????????? !TODO
			}
		}
	  }
	}
	
	// New changes from Here                          == replace relatedNodes with listAllNodes    && list with typeListFound 	
//===============================================================================================================================================================================       
    DisplayNewFormUtils.addFormCreateNode = function (typeId, workDiv ){      
    				
		if(!typeId) {
	    	  console.log(" No type Id defined ");
	    	  return null;
	      }   

		var inputContentList = '';
		divTypes = [];
				
		 // Section to create necessary divisions for the type and its related types  	  
		GlobalHTMLUtils.createTypeEntity (  typeId, workDiv);		  
		var bodyTypeDiv   = $( "#divType_"+typeId);
	    if (document.getElementById('divTypeFooter_'+typeId) == undefined || document.getElementById('divTypeFooter_'+typeId) == null) {			
			GlobalHTMLUtils.createAppendHTMLEntity('div', 'divTypeFooter_'+typeId , 'footer', 'visible', '', '', bodyTypeDiv);
		} 
		// Section to display the list of properties for the TypeId
	    inputContentList     +=  '<div id="addNodeInst_'+ typeId +'"></div>';  
		var  bodyDivProperty = $( "#divTypeProperty_"+typeId);  
		bodyDivProperty.append(inputContentList);
		DisplayFormUtils.addNodeDetails( $("#addNodeInst_"+typeId), typeId);
		 
		//  Add the "CREATE" & "CANCEL" Buttons in the footer section
		var name = typeMapViaId[typeId].name;	
        var footer  = '<hr/><p><font color="red">Red Color Property</font> are Mandatory<br/><font color="red">Red Color Type</font>  are mandatory  </p>';
	    footer += '<p><input type="button"  name="submit" class="btn btn-primary btn-xs"   id="addNodeInst_submit_' + typeId+ '" value="Add  '+name+'" onclick="DisplayNewFormUtils.saveNodeInfo('+typeId+');"/>';		
        footer += '<input type="button"   name="cancel" id="addNodeInst_cancel_' + typeId + '" value="Cancel" onclick="DisplayFormUtils.createNode_cancel(' + typeId + ');"/></p>';	
        footer += '<div id="error_create_message"></div>';
	    $("#divTypeFooter_"+typeId).append(footer);
	    	    
	    console.log("Current Type to create  is : "+ typeMapViaId[typeId].name);
	    console.log("++++++++++++++++++++++++++++++++++++++++");
	    
	    //  keep track of all divisions  created  
	    var divTypeDetails = {};
	        divTypeDetails = {type :typeId.toString(), divCreated : true, name: typeMapViaId[typeId].name, times: 1};
	    divTypes[typeId] =  divTypeDetails;   
	
		//   call fct to create other types related
		var  bodyDivRelated  =  $( "#divTypeRelatedNodes_"+typeId);	
		var list = []; 
	    DisplayFormUtils.addRelatedTypeDivs ( typeId, bodyDivRelated, list );
     }
//=======================================================================================================	   	
    DisplayNewFormUtils.displayNodeInstance = function ( type, connId , typeBeg){	
		var ableToCreate;
		var line = '';
		if(!type) {
	    	  console.log(" No type Id defined ");
	    	  return null;
	      } 
		
		var restriction = NodeUtils.findRestriction (typeMapViaId[type]);	 	
    	if(restriction == 'ROOTONLY')  {	ableToCreate = false;   	}else {		ableToCreate = true;  		}	    			    		    		    	      
        		   		  		
		line += '';
	    line += '<div  id="instanceType_'+type+'" class="instanceType_'+type+'"  style="border-left: solid #2299cc ;"><br/>';
	    if( ableToCreate == true )	{    		
		  	line += '<input type="radio" class="createOptions" name="mustConn_'+type+'"   value="create" onclick="DisplayNewFormUtils.showCreateDiv('+type+', '+typeBeg+')"/>Create New     ';		    					    	
	   	}	    		    				    	
	    line += '<input  type="radio" class="searchOptions"   name="mustConn_'+type+'"    value="use" onclick="DisplayNewFormUtils.showCreateDiv('+type+', '+typeBeg+')"/>Search <br/>';			    			    			    	
		    
	    if( ableToCreate == true )  {	
		    	line += '<div id="nodeCreateDiv_'+type+'" style="display:none;visibility:hidden"></div>';	
		}		
		line += '<div id="nodeDisplayDiv_'+type+'" style="display:none;visibility:hidden"></div>';
		line += '<div id="DetailsNodeDisplay_'+type+'" class="DetailsNode" style="display:none;visibility:hidden"></div>';
		line += '</div>';
		
		$('#divTypeProperty_'+type).append(line);
		
		if( $('input[name="mustConn_'+type+'"][value=create]') != undefined  )   {
			$('input[name="mustConn_'+type+'"][value=create]').prop('checked',true)					
			$('input[name="mustConn_'+type+'"][value=create]').trigger("click")						
	        DisplayInterfaceUtils.showDivision('nodeCreateDiv_', type);
		}
		
		var instToAppend =  $( "#divTypeRelatedNodes_"+type);
		var list =[]; 
		if(document.getElementById('img_'+type) != null  && ($('#img_'+type ).attr('value') == 'ADD')) {  
			$('#img_'+type).attr('value', 'CANCEL');
			$('#img_'+type).attr('onclick', 'DisplayNewFormUtils.resetNodeInstance('+type+','+connId+','+typeBeg+')');
			}
		DisplayFormUtils.addRelatedTypeDivs ( type, instToAppend, list );	   
	} 	
    
    DisplayNewFormUtils.resetNodeInstance = function ( type, connId , typeBeg ){
    	if(!type) {
	    	  console.log(" No type Id defined - no cancel process ");
	    	  return null;
	      }
    	if(!typeBeg) {
	    	  console.log(" No typeBeg Id defined - no cancel process ");
	    	  return null;
	      }
    	$('#divTypeProperty_'+type).empty();   	
    	
    	var everyChild = document.querySelectorAll("#divTypeRelatedNodes_"+type+"  div");
    	for (var i = 0; i<everyChild.length; i++) {
    	  
    	   var name = everyChild[i].id;
    	   console.log( name);
    	   if( name.startsWith("divType_") ){
    		  var  typeId    = name.slice(8); 
    		  delete divTypes[typeId];
    		  console.log( typeId );
    	   }
    	}
    	
    	$( "#divTypeRelatedNodes_"+type).empty();
    	if(document.getElementById('img_'+type) != null) {  
			$('#img_'+type).attr('value', 'ADD');
			$('#img_'+type).attr('onclick', 'DisplayNewFormUtils.displayNodeInstance('+type+','+connId+','+typeBeg+')');
			}

    }	
    
    DisplayNewFormUtils.showCreateDiv = function (parent, typeId ){ 
    	if(!typeId || !parent ){
    		console.log(" no Type Id or parent typeId provided: cannot show or hide divisions "); 
    		return;
    	};

    	var valueSelected = $('input[name="mustConn_'+parent+'"]:checked').val();
    	
    	if(!valueSelected){
    		console.log(" No value selected  "+ valueSelected);	
    		return;
    	}

    	 $('input[name="mustConn_'+parent+'"]').parent('td').css("backgroundColor", "");
    	 
    	if(valueSelected == 'create' ){  		
    		// Display the Type properties to create a node
    		$("#nodeCreateDiv_"+parent).empty();  		
    		DisplayFormUtils.addNodeDetails( $("#nodeCreateDiv_"+parent) , parent );
		
    		//  -- hide the select option 
    		DisplayInterfaceUtils.hideDivision('nodeDisplayDiv_', parent);
    		DisplayInterfaceUtils.hideDivision('DetailsNodeDisplay_', parent);
    		// --  show the create option
    		DisplayInterfaceUtils.showDivision('nodeCreateDiv_', parent );
    		
    	}else if (valueSelected == 'use'){    	
    		// build the list of nodes    		
    		$("#nodeDisplayDiv_"+parent).empty();
    		DisplayNewFormUtils.generateNodesSearchForm("nodeDisplayDiv_"+parent, parent);
    			    		
    		// hide the create  option 
    		DisplayInterfaceUtils.hideDivision('nodeCreateDiv_', parent);
    		// show the list to select from 
    		DisplayInterfaceUtils.showDivision('nodeDisplayDiv_',parent);		
    	}   	       					    
    } 

//=========================================== FUNCTIONS SEARCH PROCESS ===========================================================	
	DisplayNewFormUtils.generateNodesSearchForm = function( workspace, typeId ) {	
    	if(!typeId ){
    		console.log(" no Type Id provided: cannot build search Instance table  "); 
    		return;
    	}
    	var tmpType = typeMapViaId[typeId];  
    	DisplayFormUtils.cleanPreviousResult ( typeId );
    	
    	// build the form
    	var inputContent = '';
    	    inputContent += '<br /><table  class="SearchNodesTable"   id="tableNodeSearch_' + typeId + '" border="2">';

       	if(!$.isEmptyObject( tmpType.typeProperties	)){
    		$.each( tmpType.typeProperties, function( propId, tmpProp ) {			
    			var nodesSearchTypeSelection = DisplayNewFormUtils.generateNodesSearchTypeSelection( propId);
    			// TODO: Only search by STRING properties for now
    			if( tmpProp.propertyType == "STRING" ) {
    				inputContent += '<tr id="searchTypeProps"><td>' + tmpProp.name + ':</td><td><input name="' + tmpProp.name + '" id="form_inst_search_prop_val_' + tmpProp.id + '" value="" type="text"/>(TEXT)' + nodesSearchTypeSelection + '</td></tr>';	
    			}   	
    		});
        }else {    
        	inputContent += "<tr><td colspan='2'> No Properties defined for this Type </td></tr>";   
        };
        inputContent += '<tr><td colspan="2"><input type="button" name="submit" class="btn btn-primary btn-xs" id="search_node_submit_' + typeId + '" value="Search" onclick="DisplayNewFormUtils.searchNodesByProperties(\'tableNodeSearch_'+typeId + '\', '  + typeId + ');"/></td></tr></table><br/>';                                                                                                       	
        $("#"+workspace).append(inputContent);

    };
    	
    DisplayNewFormUtils.generateNodesSearchTypeSelection = function(typePropertyId) { 	
    	var nodesSearchTypeSelection = "<select id='nodes_search_type_selection_for_" + typePropertyId + "' disabled='disabled'><option value='WILDCARD'>Wildcard</option>" +
    			"<option value='STARTSWITH'>Start with</option>" +
    			"<option value='ENDSWITH'>End with</option>" +
    			"<option value='GREATERTHAN'>Greater than</option>" +
    			"<option value='LESSTHAN'>Less than</option></select>";
    	
    	return nodesSearchTypeSelection;
    }
    
    DisplayNewFormUtils.searchNodesByProperties = function (innerWorkspaceId, typeId ){	
    	var jsonData = {};
    	jsonData['typeId'] = typeId;
    	
    	var typeProperties = [];
    	var tmpType = typeMapViaId[typeId]; 
    	$.each( tmpType.typeProperties, function( propId, tmpProp ) {
    		
    		var typePropertyElement = document.getElementById('form_inst_search_prop_val_' + tmpProp.id);
    		var nodesTypePropertySearchType = document.getElementById('nodes_search_type_selection_for_' + tmpProp.id);
    		if (typePropertyElement && typePropertyElement.value) {
    			var typeProperty = {};
    			typeProperty['propertyId'] = tmpProp.id;
    			typeProperty['propertyName'] = tmpProp.name;
    			typeProperty['propertyType'] = tmpProp.propertyType;
    			typeProperty['value'] = typePropertyElement.value;
    			typeProperty['searchType'] = nodesTypePropertySearchType.value;
    			typeProperties.push(typeProperty);
    		}
    	
    	});
    	jsonData["properties"] = typeProperties;

    	var doneFunction = function( data ) {
    		
    		$('#console-log').append("<p style='color:blue'>Node search successfully.</p>");
    		// if no nodes returned display message
    		var nodes = data.nodes
    		if (nodes.length == 0) {    // if no nodes  display message
    			var nodeSearchNoResultsFoundMessage = document.getElementById('node_search_no_results_found_messages_id');
    			if (!nodeSearchNoResultsFoundMessage) {
    				$("#" + innerWorkspaceId).append('<br><font id="node_search_no_results_found_messages_id" color="red">No Results Found; Please change Your Search.</font>');
    				return;
    			}
    		}
    		// if nodes are returned verify that you can display them for selection under other type creation
			var formattedNodes = [];
			for (var key in nodes) {
				nodes[key].color = typeMapViaId[nodes[key].typeId].color;			
				NodeUtils.AddNodeToMap(nodes[key]);   
				GlobalUtils.addNBTypeInstances(nodes[key]);
				var uuid = NodeUtils.findUUID(nodes[key]);
				formattedNodes.push(nodeMap[uuid]);
			}
    			
    		var eligibleNodes = DisplayNewFormUtils.verifyAllowedNodes ( typeId, formattedNodes  );
    		if (eligibleNodes.length == 0) {    // if no nodes  display message
    			var nodeSearchNoResultsFoundMessage = document.getElementById('node_search_no_results_found_messages_id');
    			if (!nodeSearchNoResultsFoundMessage) {
    				$("#" + innerWorkspaceId).append('<br><font id="node_search_no_results_found_messages_id" color="red">No <b>Eligible</b> Results Found. ; Please change Your Search.</font>');
    				return;
    			}
    		}	
    			
 			// found nodes which can be used
			$("#" + innerWorkspaceId).empty();
			var title = 'Select ' + typeMapViaId[typeId].name;
			DisplayInterfaceUtils.generateNodeList($("#" + innerWorkspaceId), title, typeId, eligibleNodes);
			$("#" + innerWorkspaceId).append('    <input type="button" name="submit" class="btn btn-primary btn-xs"  id="returnToSearch_'+typeId+'"  value=" Change Search" onclick=\"DisplayNewFormUtils.generateNodesSearchForm(\'nodeDisplayDiv_'+typeId+'\','+typeId+');\"/>');
			$('#node_list_'+typeId).attr('onclick', 'DisplayNewFormUtils.viewNode('+typeId +')');
    			
    	};
    		
    	var failFunction = function( xhr, status, error ) {
    		console.log('Node Search Failed: ' + xhr.status);
    		$('#console-log').append("<p style='color:red'>Node Search Failed: " + xhr.status+"</p>");	
    	};
    	
    	var api  = new NodeApis();
    	api.searchNode( jsonData,  doneFunction, failFunction );   	
    };
    
    DisplayNewFormUtils.verifyAllowedNodes = function( typeId, returnedNodes  ){ 
    	
    	var connections = NodeUtils.findConnection( typeId, listTypeIds[0]); 
    	
    	if (connections) {			   ////    WAS WORKING HERE     NEED to TEST 
			if (connections.length > 0) {
				for (var key in connections) {
  
	    		 if(  connections[0].maxRel != '-1') {
//	    			 connections[0].maxRel >= "1" ){ 
	    			 var listNodesToRemove =[];
	        		 // eliminate all nodes which have already a parent
	        		 $.each(returnedNodes, function(key, node){  
	        			 var uuid = NodeUtils.findUUID(node);
	        			 DisplayNewFormUtils.getSubTree (uuid, listTypeIds[0]  );        // get their parents              			 
	        			 if(Object.keys(nodeMapInst).length >= connections[0].maxRel ){
	        				 listNodesToRemove.push(key);
	        			 }                  			 	 
	        		 });
	        		 
	        		 for( var rmNode = 0; rmNode< listNodesToRemove.length;rmNode++ ){      		
	        			returnedNodes.splice([listNodesToRemove[rmNode]],1);
	        		 }  
	    		 }
    		 }
			}
    	 }
    	 return returnedNodes;    	
    }

//===============================================================================================================================         
    DisplayNewFormUtils.viewNode = function ( typeId){
		
		if(!typeId ){
    		console.log(" no Type Id provided: cannot build search Instance table  "); 
    		return;
    	}
		
	    console.log("Inside the select View Node  for type "+typeId);	    	   	
	    var ele          = document.getElementById('node_list_'+typeId);
		var nodeUuid     = ele.options[ele.selectedIndex].value;
		if(nodeUuid == 'None'){
			var div   = $('#DetailsNodeDisplay_'+typeId);
			div.empty();
			return;
		}else if (!nodeUuid ){
			        document.getElementById('node_list_'+typeId).style.backgroundColor = "yellow";
		    		console.log(" uuid node missing   in selection  "); 
		    		return;
    	        }	 
		document.getElementById('node_list_'+typeId).style.backgroundColor = "white";
		var value = nodeMap[nodeUuid];
		var div   = $('#DetailsNodeDisplay_'+typeId);
		div.empty();		
//		DisplayNewFormUtils.displayInfoNodeSelected(typeId, nodeUuid, value, div );
		
		var nodeInfo = '';				
		nodeInfo = DisplayNewFormUtils.displayInfoNodeSelected(typeId, nodeUuid, value);
		div.append(nodeInfo);
		
		DisplayInterfaceUtils.showDivision('DetailsNodeDisplay_',typeId);	
			
			// load  Parent or children if available 
		var typeIdsRel  = DisplayFormUtils.getTypeFromList (typeId);	
		for ( var ind = 0; ind < typeIdsRel.length; ind++){
				var typeLinkTo = typeIdsRel[ind];				
				DisplayNewFormUtils.getSubTree (nodeUuid,  typeLinkTo  );	  // get list of nodes of type "typeLinkTo"   linked  to the selected (locked) node of "typeId"
                var returnedNodes =    jQuery.extend(true,{}, nodeMapInst);
				if(!$.isEmptyObject(returnedNodes) ) {
                                                              
					   var typePossPar = DisplayFormUtils.getTypeListParents (typeLinkTo,  typeId );   //  WHAT HAPPEN if MORE THAN ONE TYPE                                                                                                                                     
					   for( var iPar = 0; iPar < typePossPar.length; iPar++){                 	
	                    	 var parentConnect = NodeUtils.findConnection( typeLinkTo, typePossPar[iPar]);                 	 
	                    	 if( (typePossPar[iPar] ==  listTypeIds[0]) && (parentConnect.maxRel >= 1 )){  //   we are creating the listTypeIds[0]  eliminate any node from typePossPar[iPar] which has a max  parent
	                    		 var listNodesToRemove =[];
	                    		 // eliminate all nodes which have already a parent
	                    		 $.each(returnedNodes, function(key, node){                    		 
	                    			 DisplayNewFormUtils.getSubTree (key,  typePossPar[iPar]  );        // get their parents              			 
	                    			 if(Object.keys(nodeMapInst).length >= parentConnect.maxRel ){
	                    				 listNodesToRemove.push(key);
	                    			 }                  			 	 
	                    		 });
	                    		 
	                    		 for( var rmNode = 0; rmNode< listNodesToKeep.length;rmNode++ ){
	                    			 delete returnedNodes[listNodesToRemove[rmNode]];
	                    		 }
	                    	 }
					   }      				   
					   if(!$.isEmptyObject(returnedNodes) ){  // still items to display
						   // verify if user did not enter value in the parent node  --- if not then show the find ones
						   var stopPopulate = false;
						    var valueSelected = $('input[name="mustConn_'+typeLinkTo+'"]:checked').val();
						    if(valueSelected == 'create' ){
						    	var properties=[];	
								properties = NodeUtils.retrieveNodePropertiesFromForm ( typeLinkTo , 'form_inst_add_val_');	
								if(!properties[properties.length-1]){        // everything is empty even create is selected
									stopPopulate = true;
								}
						    }
						    if( !stopPopulate ){
								$("#nodeDisplayDiv_"+typeLinkTo).empty();		
								var inputContent = '';
							    inputContent += '<table id="tableNodeSearch_' + typeLinkTo + '" class="SearchNodesTable"></table><br/>';		 
							    $("#nodeDisplayDiv_"+typeLinkTo).append(inputContent); 
							   
							    var title = 'Select ' + typeMapViaId[typeLinkTo].name;
								DisplayInterfaceUtils.generateNodeList ( $("#nodeDisplayDiv_"+typeLinkTo+" table"), title, typeLinkTo, returnedNodes );			
								DisplayInterfaceUtils.showDivision('nodeDisplayDiv_',typeLinkTo);
								$('#DetailsNodeDisplay_'+typeLinkTo).empty();
								var div2 = $('#DetailsNodeDisplay_'+typeLinkTo);					
								DisplayInterfaceUtils.hideDivision('nodeCreateDiv_', typeLinkTo);
								$('#node_list_'+typeLinkTo).attr('onclick', 'DisplayNewFormUtils.displayInfoSelected2('+typeLinkTo +')');		
							    						
								DisplayInterfaceUtils.showDivision('DetailsNodeDisplay_', typeLinkTo);				
								$('input[name="mustConn_'+typeLinkTo+'"][value=use]').prop('checked',true);																			
							}
						    						    					    
					   }				 
			}else {
								
				console.log(" no value returned for related nodes");
//				$("#nodeDisplayDiv_"+typeIdsRel[ind]).empty();
//				$('#DetailsNodeDisplay_'+typeIdsRel[ind]).empty();
//								
//				if( $('input[name="mustConn_'+typeIdsRel[ind]+'"][value=create]') != undefined  )   {
//					$('input[name="mustConn_'+typeIdsRel[ind]+'"][value=create]').prop('checked',true)					
//					$('input[name="mustConn_'+typeIdsRel[ind]+'"][value=create]').trigger("click")						
//			        DisplayInterfaceUtils.showDivision('nodeCreateDiv_', typeIdsRel[ind]);
//				}
			}				
		}				
	 }

    DisplayNewFormUtils.displayInfoSelected2 =  function ( typeId){
    	if(!typeId  ){
			console.log(" no  type  given "+ typeId );
			return;
		}
    	console.log("Inside the select View Node  for type "+typeId);	    	   	
	    var ele          = document.getElementById('node_list_'+typeId);
	    
		var nodeUuid     = ele.options[ele.selectedIndex].value;
		if(!nodeUuid ){
    		console.log(" no node found  in selection  "); 
    		return;
    	}	 
    	
		var value = nodeMap[nodeUuid];
		var div   = $('#DetailsNodeDisplay_'+typeId);
		div.empty();
		
		var nodeInfo = '';				
		nodeInfo = DisplayNewFormUtils.displayInfoNodeSelected(typeId, nodeUuid, value);
		div.append(nodeInfo);
		   	
    }
    
    DisplayNewFormUtils.displayInfoNodeSelected = function (typeId,  key , value ){
	    	if(!key  ){
				console.log(" no  uuid  given "+ key );
				return;
			}	   	
	    	if(!value){
				console.log(" Can not Display its properties");
				return;
	    	}			
					
			var tableViewInstProps = '<table border="2">';				
			var inputpropViewRow = '';
			inputpropViewRow = '<tr>';
			var tempType = typeMapViaId[typeId];
			if($.isEmptyObject(tempType.typeProperties)){
				tableViewInstProps = 'NO properties were defined ';			
			}else {	
					$.each( tempType.typeProperties, function( pkey, pvalue ) {								
					    var propValue;				
						// build a Row for each property 
						// find the property value in nodeMap										
						$.each(value.typeProperties, function ( nodeKey, nodeProperty){	
							if( pvalue.id == nodeProperty.id ){
								propValue = nodeProperty.value;
							}
						});
										
						if(pvalue.isMandatory){ 			
							inputpropViewRow += '<td style="color:red; ">' ;
							}
						else{  
							inputpropViewRow += '<td  > ';
							}	
						inputpropViewRow +=   pvalue.name + ': </td>';	
	
						if( (propValue != null )&& (propValue != 'undefined' ) ){	
							if (pvalue.propertyType == "FILE") {
								var mediaType = NodeUtils.convertNodeFilePropertyValueMediaType(propValue);
								if (mediaType.includes("image/")) {
									inputpropViewRow += '<td><img id="image_file_output_show_' + pvalue.id + '" class="imgthumb"    src="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue) + '" height="50" width="50"></td>';
								} else {
									inputpropViewRow += '<td><a id="other_file_output_show_' + pvalue.id + '"   href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue) + '" download="' + propValue.filename + '">' + propValue.filename + '</a></td>';
								}
							}else {
									inputpropViewRow += '<td  width="100px" >'+ propValue +'</td>';
							}
						} else {
							inputpropViewRow += '<td  width="100px"> NONE </td>';	
						}						
						inputpropViewRow += "</tr>"										
					});
					tableViewInstProps = tableViewInstProps + inputpropViewRow + "</table><br />";
			}	

			return tableViewInstProps;
	  }  
    
    DisplayNewFormUtils.listOfPropsValues = function (typeId,   value ){
    
    	if(!typeId  ){
			console.log(" no  type  given "+ typeId );
			return;
		}	   	
    							
		var inputpropViewRow = '';
	
		var tempType = typeMapViaId[typeId];
		if($.isEmptyObject(tempType.typeProperties)){
			tableViewInstProps = '<td></td> ';			
		}else {	
			    var len = Object.keys(tempType.typeProperties).length;
			    if( $.isEmptyObject(value)) {
			    	for (var mem=0; mem <len ; mem++){ inputpropViewRow += '<td>  ----------  </td> ';	   }
			    	
			    }else {
					$.each( tempType.typeProperties, function( pkey, pvalue ) {								
					    var propValue;				
						// build a Row for each property 
						// find the property value in nodeMap										
						$.each(value.typeProperties, function ( nodeKey, nodeProperty){	
							if( pvalue.id == nodeProperty.id ){
								propValue = nodeProperty.value;
							}
						});												
	
						if( (propValue != null )&& (propValue != 'undefined' ) ){	
							if (pvalue.propertyType == "FILE") {
								var mediaType = NodeUtils.convertNodeFilePropertyValueMediaType(propValue);
								if (mediaType.includes("image/")) {
									inputpropViewRow += '<td><img id="image_file_output_show_' + pvalue.id + '" class="imgthumb"    src="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue) + '" height="50" width="50"></td>';
								} else {
									inputpropViewRow += '<td><a id="other_file_output_show_' + pvalue.id + '"   href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue) + '" download="' + propValue.filename + '">' + propValue.filename + '</a></td>';
								}
							}else {
									inputpropViewRow += '<td  width="100px" >'+ propValue +'</td>';
							}
						} else {
							inputpropViewRow += '<td  width="100px"> NONE </td>';	
						}						
										
					});
			    }
			
		}	

		return inputpropViewRow;
 
    }
    
    
    DisplayNewFormUtils.getSubTree = function (nodeUuid, typeIdsRel ){
		
    	if(!nodeUuid ){
    		console.log(" no node found  provided  "); 
    		return;
    	}
    	if(!typeIdsRel  ){
			console.log(" no  type  given "+ typeIdsRel );
			return;
		}    	
		console.log('Node uuid is : '+ nodeUuid );
		var jsonData = DisplayNewFormUtils.buildJsonGetNodesFromEntryNodes ( nodeUuid, typeIdsRel );
		var successFunction = function( data ) {			
			nodeMapInst = {};
			if($.isEmptyObject(data)||    $.isEmptyObject(data.nodes)){      // at least the node itself is returned if it has no Parent/Children/Sibling
				console.warn (" no Node details returned from the API getRelatedNodes&Edges");
			}else {		
				console.log("data.nodes are: ");
				console.table(data.nodes);
				$.each(data.nodes, function(key, value){
					var uuid         = NodeUtils.findUUID( value );
					NodeUtils.AddNodeToMap(value); 
					nodeMapInst[uuid] = value;
				});
			}
		};	
		var failFunction = function( xhr, status, error ) {
			console.log('Not able to load related  Node Details: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Not able to load related Node Details: "+ xhr.status+"</p>");	
		};	
		var nodeApi = new NodeApis();
		nodeApi.getNodesFromEntryNode(jsonData, successFunction, failFunction);			
	}
//    
//    DisplayNewFormUtils.getNodesLinkedToNode = function ( nodes ,instHolderDiv){
//    	 
//   	 var jsonData = {}, returnedNodes = [];
//   	 var childrenNodes = [];
//	 var otherToAdd = [];
//	
//	 for ( var i = 0; i < nodes.length; i++){
//		 var currType  =  nodes[i].startType;	 
//		 if( nodes[i].startNodeUuid != null){
//			 if( nodes[i].endNodeUuid == null  && nodes[i].status  == 'initial'  ){
//				 // build json for API call 
//				 jsonData = DisplayNewFormUtils.buildJsonGetNodesFromEntryNodes ( nodes[i].startNodeUuid, nodes[i].endType  );
//				 // call API					 
//				 DisplayNewFormUtils.getNodesFronEntry ( jsonData );  // found nodes are returned in historyNode
//				   
//				 // complete the nodes info
//				 if( !$.isEmptyObject(historyNode)){
//					
//					 if (historyNode.length >= 1  ){ 								 
//						 
//						 nodes[i].endNodeUuid = historyNode[0];
//						 nodes[i].status  = 'ready';
//						 var typeId2     = 	nodeMap[historyNode[0]].typeId;
//						 for ( var j = i+1; j < nodes.length; j++){
//							 if( nodes[j].startType == typeId2 ){
//								 otherToAdd.push( nodes[j]);
//								 nodes[j].startNodeUuid = historyNode[0];
//							 }
//						 }
//						
//						 DisplayFormUtils.addDivsForANodeDetails (instHolderDiv, historyNode[0] );
//				
//						 var typeInfo2 = typeMapViaId[typeId2];
//						 ( new DisplayFormRenderer() ).displayViewEditProperties( typeInfo2, historyNode[0],  nodeMap[historyNode[0]]  );
//						 nodesToUpdate.push({type: typeId2  , node: historyNode[0]});
//						 
//						 
//						 for ( var k = 1; k< historyNode.length; k++){
//							 var addNode = {};
//							   addNode.startType      = nodes[i].startType   ;
//							   addNode.startNodeUuid = nodes[i].startNodeUuid ;
//							   addNode.endType       = nodes[i].endType;
//							   addNode.endNodeUuid   = historyNode[k];
//							   addNode.startTypePos  = nodes[i].startTypePos;
//							   addNode.status        = 'ready';
//							   addedNodes.push(addNode);
//							   addNode = {};
//
//							   var typeId2     = 	nodeMap[historyNode[k]].typeId;
//							   DisplayFormUtils.addDivsForANodeDetails (instHolderDiv, historyNode[k] );
//							   								   
//							   var typeInfo2 = typeMapViaId[typeId2];
//							   ( new DisplayFormRenderer() ).displayViewEditProperties( typeInfo2, historyNode[k],  nodeMap[historyNode[k]]  );
//							   nodesToUpdate.push({type: typeId2  , node: historyNode[k]});
//						 }
//						 								 								 
//						 for ( var l=1; l< historyNode.length; l++){
//							 for( var ind = 0; ind< otherToAdd.length; ind++){											 
//									 var child = {};
//									
//										 child.startType        = otherToAdd[ind].startType;
//										 child.startNodeUuid   = historyNode[l];
//										 child.endType         = otherToAdd[ind].endType;
//										 child.endNodeUuid     = null;
//										 child.startTypePos    =  otherToAdd[ind].startTypePos;
//										 child.status          = 'initial';
//										 childrenNodes.push(child);										 
//							 }
//						 }							 				 
//						 
//					 }							 			 
//					
//				 }else {
//					 // no nodes found display error 
//					 nodes[i].status  =  'error';
//					 console.log(" Could not find related node instances "+ nodes[i].startNodeUuid);
//				 }
//				 jsonData = {}; historyNode = [];
//			 }				 				 
//		 }			 	 		 
//	 }
//		 		 
//    console.log( nodes );
//   if (childrenNodes.length == 0) {
//   		return childrenNodes;
//   	} else { 
//       		return childrenNodes.concat( DisplayNewFormUtils.getNodesLinkedToNode(childrenNodes,instHolderDiv ));  	 		
//   	}  		
//   	
//   }  
//      
  //=======================================================================================================================    
    DisplayNewFormUtils.saveNodeInfo = function( typeId  ) {
    	var listErrors  = [];
    	var nodesToLoop = [];
		var node = {};   	
		console.log("%c Starting Creation Process for Node of the type :"+typeMapViaId[typeId].name, "color:blue");
		if(!typeId ){
			console.error(" Missing Type Id for creation of Node instance ");
			listErrors.push('missing TypeId for node creation');
	        return;
			}
		// build list of nodes to create
		 nodesToUpdate    = [];
         
		 node  = {type : typeId.toString(), nodeUuid: null, mustOrNot : true, action : 'createNode' };    
		 nodesToUpdate[typeId] = node;
		 node = {};
	     	
		 nodesToLoop.push(typeId);
		 nodesToLoop  = nodesToLoop.concat(  DisplayFormUtils.findlistOfNodesToCreate(nodesToLoop));   
	     console.log(" found these types "+ nodesToLoop);
	     // retrieve nodes properties  
	     DisplayFormUtils.retrieveNodesProperties();
		  
		 console.log( nodesToUpdate);		  
	     if(listErrors.length != 0 ){
			console.log("List of Errors : " +listErrors);
			return;
		 }else {
			console.log("%c Retrieval of nodes properties Successfull ", "color:blue");
		 }
	     // save nodes 
	     DisplayFormUtils.saveNodes ();	
	     console.log("%c Creation  of nodes completed Successfull ", "color:blue");  // nodesToUpdate has all nodes created
	     // find all edges to be created
	     var addEdge = false;
	    createEdgeList = [];
		for( var j=0; j < listAllNodes.length; j++){
			var currElement = listAllNodes[j];
			if(  nodesToUpdate[ Number(currElement.currNodeType)] &&  nodesToUpdate[Number( currElement.relNodeType)] ){
				
				if( (nodesToUpdate[ Number(currElement.currNodeType)].nodeUuid != null ) && (nodesToUpdate[Number( currElement.relNodeType)].nodeUuid != null) ){	
					if( (nodesToUpdate[Number(currElement.currNodeType)].action == 'createNode' ) || (nodesToUpdate[Number( currElement.relNodeType)].action == 'createNode')){
						var object = { 
								currNodeType : currElement.currNodeType,
								relNodeType  : currElement.relNodeType,
								currNodePos  : currElement.currNodePos,
								connection   : currElement.connection,
								typeNode     : currElement.typeNode,
								edge         : 'createEdge'
							}
						var conId = currElement.connection.id;
						addEdge = DisplayFormUtils.checkDuplicateEdgeCreation( createEdgeList, conId , object );
						if(addEdge != null && !addEdge ) {
							createEdgeList.push(object);				
						    console.log("Should create relationship between :"+typeMapViaId[currElement.currNodeType].name + " and "+typeMapViaId[currElement.relNodeType].name);	
						}
						object = {};
						var otherConn = NodeUtils.findConnection ( currElement.relNodeType, currElement.currNodeType );	
						if((otherConn.length == 1)  &&  (otherConn[0].id !=  currElement.connection.id)) {
							object = { 
									currNodeType : currElement.relNodeType,
									relNodeType  : currElement.currNodeType,
									currNodePos  : currElement.currNodePos,
									connection   : otherConn[0],
									typeNode     : currElement.typeNode,
									edge         : 'createEdge'
								}
							var conId = otherConn[0].id;
							addEdge = DisplayFormUtils.checkDuplicateEdgeCreation ( createEdgeList, conId , object );
							if(addEdge != null && !addEdge ) {
								createEdgeList.push(object);				
								console.log("Should create relationship between :"+typeMapViaId[currElement.relNodeType].name + " and "+typeMapViaId[currElement.currNodeType].name);	
							}
							object = {};						
								
						}	
				}else {  // both nodes are used 
					// (nodesToUpdate[Number(currElement.currNodeType)].action == 'use' ) && (nodesToUpdate[Number( currElement.relNodeType)].action == 'use')){
						//  nodes and edges are already created 
					   console.log(" Edges already exist between "+typeMapViaId[currElement.currNodeType].name + " and "+typeMapViaId[currElement.relNodeType].name);					
				}	
			}else {
				// one of the node does not have uuid 
				console.error("Missing nodes ; can not create edge between "+nodesToUpdate[Number(currElement.currNodeType)].type +"and  "+ nodesToUpdate[Number(currElement.relNodeType)].type )
			}
		}			
		}
	     
	    console.log(createEdgeList );
		
//		// CREATE EDGES 	
//		// Combine All edges to create 
	    if(! $.isEmptyObject(createEdgeList)){
	    	console.log("create edge list is  not empty");
	   
		    console.log("%c Starting Edges creation ", "color:blue");			    
			for( var j=0; j < createEdgeList.length; j++){
				
				if( createEdgeList[j].edge == 'createEdge'  ){
					
					var element = createEdgeList[j];
					var nodeUuid1 = nodesToUpdate[Number(element.currNodeType)].nodeUuid;
					var nodeUuid2 = nodesToUpdate[Number(element.relNodeType)].nodeUuid;
					var jsonData = {};
					if( element.currNodePos == 'asParent'){
						jsonData = NodeUtils.createEdgeJson( element.currNodeType,  nodeUuid1, element.relNodeType, nodeUuid2, element.connection.id  );	
					}else if (element.currNodePos == 'asChild'  ){
						jsonData = NodeUtils.createEdgeJson(  element.relNodeType, nodeUuid2, element.currNodeType,  nodeUuid1, element.connection.id  );
					}else  if ( element.currNodePos == 'asSibling'){	
						jsonData = NodeUtils.createEdgeJson( element.currNodeType,  nodeUuid1, element.relNodeType, nodeUuid2,  element.connection.id  );
					}			
					if(!$.isEmptyObject(jsonData)){
						var apiEdge  = new EdgeApis();				
						var doneFunction = function ( dataEdge ){
							if(!$.isEmptyObject(dataEdge)){
								console.log("Edge created ");
								$('#console-log').append("<p style='color:blue'>Edge creation successfull: </p>");
								// add edge to edgeMap
								NodeUtils.AddEdgeToMap( dataEdge);	
								
								$('#console-log').append("<p style='color:blue'>created Edge between node  :"+typeMapViaId[element.currNodeType].name +' and '+typeMapViaId[element.relNodeType].name  +'</p>');
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
					$('#console-log').append("<p style='color:red'>Problem in jsonData creation for element :"+element +" </p>");
				}
			}				
		}
	    }
		
		var nodeUuid  =  nodesToUpdate[typeId].nodeUuid;
		 if(!nodeUuid){
			 console.error(" Main type node creation failed  ");
		     return;
		 }
		var bodyDiv = $( "#form_body");		
		if (document.getElementById('node_detail_'+nodeUuid) == undefined || document.getElementById('node_detail_'+nodeUuid) == null) {		
			GlobalHTMLUtils.createAppendHTMLEntity('div', 'node_detail_'+nodeUuid , 'node_detail', 'visible', 'inline-block', '', bodyDiv);
		}				
				
		curThreshold  = 0;
		listAllNodes  = [];
		buttonOnOff  = false;
		listErrors = [];
		createEdgeList = [];
		DisplayFormUtils.resetGV ();		
		( new DisplayFormRenderer() ).listNodes(typeId);
//		DisplayFormUtils.viewDetailProperties(nodeUuid);			
    }
    
    DisplayNewFormUtils.verifyConListed = function( connToVerify ){   	
    	for( var i= 0; i< listAllNodes.length; i++){
    		if( listAllNodes[i].connection.id == connToVerify ){
    			console.log( 'true');
    			return true;   		
    		}	
    	}
    	console.log('False');
    	return false;  	
    }
      	
    DisplayNewFormUtils.SaveNodeCreated = function ( nodeTypeId, properties ){
		
		var data = new NodeJsonObject();
		// set the minimum
		data.init(selectedMetaData.toString(), nodeTypeId.toString(), properties);
		data.defaultDecorator = "1";

		var doneFunction = function( dataNode ) {
			if(!$.isEmptyObject(dataNode)){
				$('#console-log').append("<p style='color:blue'>Node created successfully.</p>");
				dataNode.color = typeMapViaId[dataNode.typeId].color;
		 	   // update corresponding section and nb of type nodes 			
				NodeUtils.AddNodeToMap( dataNode);   
				GlobalUtils.addNBTypeInstances(dataNode);						
				listInstUuids[0] = NodeUtils.findUUID (dataNode);
			}else {
				$('#console-log').append("<p style='color:red'>Creation is successfull but no Node returned</p>");
			}
		};
			
		var failFunction = function( xhr, status, error ) {
			console.log('Error Node not created: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Error Node not created:"+ xhr.status+"</p>");	
		};
		
		var api  = new NodeApis();
		api.saveNode( data,  doneFunction, failFunction );
				
	}
    
    DisplayNewFormUtils.buildJsonGetNodesFromEntryNodes = function ( nodeUuidStart, typeIdFinish   ){
		var jsonData    = {}; 
		var properties  = []; 
		var typeIds     = [];
		var entryNode   = {};
		var typeIdsRel  = [];
		//  START FROM :  EntryNode is  uuid and typeId
        var nodeProperty = NodeUtils.createSysJson( nodeUuidStart);	        
		typeIds.push(Number(nodeMap[nodeUuidStart].typeId));
		properties.push(nodeProperty);			
		entryNode["typeIds"]    = typeIds;		
		entryNode["systemProperties"] = properties;		
		jsonData["entryNode"] =  entryNode;
		
		typeIdsRel.push(Number(typeIdFinish));
		jsonData["typeIds"]   = typeIdsRel;
		jsonData['searchDirection'] = 'CHILDREN';
		jsonData['min'] = 1;
		jsonData['max'] = 1;
		
		return jsonData;
		
	}
	
    DisplayNewFormUtils.getNodesFronEntry = function ( jsonData   ){
		historyNode = [];
		var successFunction = function( data ) {
			if($.isEmptyObject(data)|| $.isEmptyObject(data.nodes)){      // at least the node itself is returned if it has no Parent/Children/Sibling
				console.warn (" no  details returned from the API getNodesFromEntryNode");
			}else {		
				console.log("data.nodes are: ");
				console.table(data.nodes); 
				
				$.each(data.nodes, function(key, value){	
					var uuid = NodeUtils.findUUID( value );	
					console.log(" ------    " + uuid )
					historyNode.push(uuid);
					NodeUtils.AddNodeToMap(value);  

				});			
			}
			
		};	
		var failFunction = function( xhr, status, error ) {
			console.log('Not able to load related  Hotel Details: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Not able to load related Hotel Details: "+ xhr.status+"</p>");	
		};	
		var nodeApi = new NodeApis();
		nodeApi.getNodesFromEntryNode(jsonData, successFunction, failFunction);	
	}
 //===================================================================================================   
    DisplayNewFormUtils.listAll = function ( typeId, propToSearch   ){
		
		// hide all the others		
//		$('div.node_detail').hide();			
		$('.work_addInstance').remove();
		$('.pathFormCreate').remove();
				
		if(document.getElementById('work_addInstance_'+typeId) == undefined || document.getElementById('work_addInstance_'+typeId) == null) {		
			GlobalHTMLUtils.createAppendHTMLEntity('div', 'work_addInstance_'+typeId  , 'work_addInstance', 'Display', 'block', '', $('#form_body'));			
		}	
		
		var workDiv = $('#work_addInstance_'+typeId);		
		var entryNodes = GlobalTypeInstanceUtils.getAllInstances( typeId );	
		
		var inputs = "";
		if ( $.isEmptyObject(entryNodes)  ){
			inputs += "<div class='container'><table id='nodesListProperty'  class='nodelist display' >";
			inputs += "<tr><td>No Elements to display yet!!!</td></tr>";
			inputs +="</table></div>";	
			workDiv.append( inputs);	
			DisplayInterfaceUtils.showDivision ("work_addInstance_", typeId); 
			return;
		}
		// get data model to use for verification 
		DisplayFormUtils.resetGV ();
		DisplayNewFormUtils.findAllRelatedTypes( typeId );   // this will return a list of types related to the original type but only required				
		console.log(" typeListFound is "+ typeListFound);
		var listOfNodesToDisplay = DisplayNewFormUtils.filterRelatedNodes2 ( typeListFound  ); // this will return a list of start/end type & node to complete
		
		console.table(listOfNodesToDisplay );
		var listRelated = [];
		var nbRelated = 0;		
		var nbChildren = Object.keys(typeListFound).length - 1;
				  
		// get list of properties of the current type/node ( will have only IDs and values)
		var tableRows = DisplayInterfaceUtils.tableMandatoryProperties(typeId, propToSearch );
		// get typeproperties to retrieve name of properties
		var props = typeMapViaId[typeId].typeProperties;
		
		var  mainHeader1 = '', mainHeader2 = '' , propsHeader = '', bodyTable= '';
		
		inputs += "<div class='container'><table id='nodesListProperty'  class='nodelist display' >";
		mainHeader1 += "<thead><tr class='row2'>";
		propsHeader += '<tr class="row2" >';
		//============================================================================================================================//
		//                               This section display the main type list of properties                                        //
		var nbProps = Object.keys(tableRows).length;   // actual nb of mandatory properties or all   
		
		
		var listPropNames = '';
//		if( nbProps > 0){						    			 		  
//		    	mainHeader1 += '<th colspan="'+nbProps+'" rowspan="2"  style="align:center">'+typeMapViaId[typeId].name+' Properties</th>';
//		    			    
//		    	for( var i=0; i <tableRows.length; i++){
//			    	var value   = props[tableRows[i].id];
//			    	var propName = value.name;
//			    	propsHeader += '<th>  '+propName+'  </th>';
//			    }	 
//    	
//		}else { // nbProps = 0 
//			mainHeader1 += '<th  rowspan="1"  style="align:center">'+typeMapViaId[typeId].name+' Properties</th>';
//			propsHeader += '<th> (type) </th>';
//		} 
		
		
		if( nbProps > 0){						    			 		  	    			    
	    	for( var i=0; i <tableRows.length; i++){
		    	var value   = props[tableRows[i].id];
		    	var propName = value.name;
		    	listPropNames += '<th>  '+propName+'  </th>';
		    }	 	
		}else { // nbProps = 0 	
			listPropNames += '<th> (type) </th>';
		} 
		
		//============================================================================================================================//
		//                               This section display the related  types  list of properties                                  //
		var startMainHeader2 = '<tr class="row2">';
			
    	for( var k=1; k < typeListFound.length; k++){
    		var nameType   = typeMapViaId[typeListFound[k]].name;
    		listRelated.push(typeListFound[k]);	    		
    		var relatedNodeRows = DisplayInterfaceUtils.tableMandatoryProperties(typeListFound[k], 'all' );
    		var propsrelated = typeMapViaId[typeListFound[k]].typeProperties;
    		nb = Object.keys(relatedNodeRows).length;
    		mainHeader2 += "<th colspan='"+nb+"' style='text-align:center' > <button type='button' class='btn btn-primary btn-sm'  onclick=\"(new DisplayFormRenderer() ).selectedType('" + typeListFound[k] +"');(new DisplayFormRenderer() ).listNodes('" + typeListFound[k] +"'); \">"+nameType+" </button></th>";    			    		    	    
    		if( nb > 0 ){
    			nbRelated += nb;
    			for( var i=0; i <relatedNodeRows.length; i++){
    		    	var value   = propsrelated[relatedNodeRows[i].id];
    		    	var propName = value.name;
    		    	listPropNames += '<th>  '+propName+'  </th>';
    		    }
    			
    		}else {  // nb = 0 no property defined for this type --------------- must display type
    			nbRelated = nbRelated + 1;
    			listPropNames += '<th>  (type)  </th>';
    		}    				
    	}
	    mainHeader2 += '</tr>';			   		
			 
	    
	    
		if( nbRelated > 0) { 
			
			    mainHeader2 =  startMainHeader2 + mainHeader2;
			    if( nbProps > 0){						    			 		  
			    	mainHeader1 += '<th colspan="'+nbProps+'" rowspan="2"  style="align:center">'+typeMapViaId[typeId].name+' Properties</th>';
			    }else {
		    	    mainHeader1 = mainHeader1 + '<th  rowspan="2"  style="align:center">'+typeMapViaId[typeId].name+' Properties</th>'; 
		    	    }
			    
			    mainHeader1 += '<th colspan="'+nbRelated+'" style="text-align:center" >Children</th>';
	    	    mainHeader1 +=  '<th rowspan="3">Action</th></tr>';
	    	    inputs = inputs + mainHeader1 + mainHeader2;
	    	    propsHeader = propsHeader + listPropNames + '</tr>';
		    	    
		}else {
			if( nbProps > 0){						    			 		  
		    	mainHeader1 += '<th colspan="'+nbProps+'"  style="align:center">'+typeMapViaId[typeId].name+' Properties</th>';		      
		    }else {
	    	    mainHeader1 = mainHeader1 + '<th   style="align:center">'+typeMapViaId[typeId].name+' Properties</th>'; 
	    	    }
				mainHeader1 += '<th rowspan="2">Action</th></tr>';
	    	    inputs = inputs + mainHeader1;
	    	    propsHeader = propsHeader + listPropNames + '</tr>';
		}
					 			 		 
		inputs = inputs + propsHeader + '</thead><tbody>';

	    //====================================== Finish the Table header ==========================================//
		//=====================================   LOOP to Display the list of NODES values ========================//
	    var rowColor = false;
	    var tableNodesMap = [], rowtableNodes = [];
	    var lineRepeat = 0;
	    
	    
		$.each( entryNodes, function(key, value) {
			var line = "";
			var nodeUuid = NodeUtils.findUUID(value);
			//   skip this node if uuid is missing == display error message 
			if(!nodeUuid ){
				console.log(" no node uuid  given "+ nodeUuid );
				console.log(' Value is : %O'+ value);
				return;
			}
			
			 var nodeProperties = DisplayNewFormUtils.printNodeProps ( rowColor , nodeUuid,tableRows, value );
			
		 //================================== This section display the related nodes properties ============================//			 
			 if( nbChildren != 0) { 
				 var ChildProps = [];
		         var listNodes = [];
		           rowtableNodes = [];
		           rowtableNodes = DisplayNewFormUtils.fillInRowTable( nodeUuid );  //  we suppose only one row 		         		           
		           for(var node = 0; node <typeListFound.length; node++){
		        	   
		        	   var uuid = rowtableNodes[0][Number(typeListFound[node])];
			           if(!$.isEmptyObject(rowtableNodes) && uuid != null ){
			        	    for ( var m = node+1; m < typeListFound.length; m++ ){	
			        	    	
			        	    	var children = DisplayNewFormUtils.getAllChildrenNodesUnderType(uuid, typeListFound[m]);
			        	    	 if( !$.isEmptyObject(children)){		        	    		
				        	    	 for( var j =0; j < children.length; j++){
				        	    		 if( j == 0 ){
				        	    			 rowtableNodes[0][typeListFound[m]]= children[0]; 
				        	    		 }else {
				        	    			 var nextRow =  DisplayNewFormUtils.fillInRowTable( uuid );
				        	    			 nextRow[0][typeListFound[m]]   = children[j];
				        	    			 rowtableNodes[rowtableNodes.length ] = nextRow[0];
				        	    		 }
				        	    	
				        	    	 }	
			        	    	 }
			        	     }
			        	}			   			   
			   	    }		           
		            
		            
		            for ( var r = 0; r < rowtableNodes.length; r++){
		            	var ele = rowtableNodes[r];
		            	message = '';
		            	for ( var kim=0; kim< listRelated.length; kim++ ){
		            		var val = rowtableNodes[r][Number(listRelated[kim])];
		            		var nodeInfo = '';				
							nodeInfo =  DisplayNewFormUtils.listOfPropsValues(listRelated[kim], nodeMap[val]);									
							message = message  + nodeInfo ;	
		            	}
		            	
		            	var updateButton = "<td><button type='button' class='btn btn-primary btn-sm' id='update_"+nodeUuid+"' onclick=\"DisplayFormUpdateNode.updateNode('"+nodeUuid+"')\">Update </button></td></tr>";
		            	line = line + nodeProperties + message + updateButton;
		            }	            				 
			 }else {
				 var updateButton = "<td><button type='button' class='btn btn-primary btn-sm' id='update_"+nodeUuid+"' onclick=\"DisplayFormUpdateNode.updateNode('"+nodeUuid+"')\">Update </button></td></tr>";
				 line = line + nodeProperties+ updateButton;
			 }											 
			 
			 inputs += line;	 		
//			inputs += "<td><button type='button' class='btn btn-primary btn-sm' id='update_"+nodeUuid+"' onclick=\"DisplayFormUpdateNode.updateNode('"+nodeUuid+"')\">Update </button></td></tr>";
		});
				       
		inputs +="</tbody></table></div>";			
		 workDiv.append( inputs);		
		 if( document.getElementById('nodesListProperty')!= null ||document.getElementById('nodesListProperty')!= 0 ) {$('#nodesListProperty').DataTable();}
		 DisplayInterfaceUtils.showDivision ("work_addInstance_", typeId);
	}
    DisplayNewFormUtils.getAllChildrenNodesUnderType = function ( nodeUuid , typeId){
    	
		var jsonData = DisplayNewFormUtils.buildJsonGetNodesFromEntryNodes ( nodeUuid, typeId );
		 // call API					 
		DisplayNewFormUtils.getNodesFronEntry ( jsonData );  // found nodes are returned in historyNode
		console.log("Found these nodes "); console.table(historyNode);   
	   if( !$.isEmptyObject(historyNode)){
		   return historyNode;
	   }else {
		   return [];
	   }				
    	
    }

    DisplayNewFormUtils.fillInRowTable = function(  nodeUuid ){
    	var row =[];
    	if(!$.isEmptyObject(typeListFound) ){
    		var object = {}, listObjects = [];
    		for ( var i=0; i< typeListFound.length; i++){
    			if(typeListFound[i] == nodeMap[nodeUuid].typeId.toString()){
    				object[typeListFound[i]] = nodeUuid;
    			}else {
    				object[typeListFound[i]] = null;
    			}
    		}
    		row.push(object);
    		return row;
    		
    	}else {
    		console.log(" error this function can not be called");
    		return row;
    	}   	   	
    }
    
    DisplayNewFormUtils.printNodeProps = function ( rowColor, nodeUuid , tableRows , value  ){
    	var mainNodeProps = '';
    	var nbProps = Object.keys(tableRows).length; 		
		if(!rowColor){
			mainNodeProps   += "<tr class='row1' id='node_"+nodeUuid+"'>";
			rowColor = true;
		}else {
			mainNodeProps   += "<tr class='row2' id='node_"+nodeUuid+"'>";
			rowColor = false;
		}	
	//====================================================   display properties value for main node ======================//
		if(nbProps == 0  ){
			mainNodeProps   += "<td>(" +typeMapViaId[value.typeId].name + ")</td>";
		}
		for( var i=0; i <tableRows.length; i++){	 
			 var propToShow = DisplayFormUtils.findValueProp (value, tableRows[i].id.toString() );
			 mainNodeProps   += "<td>";
			 if(propToShow != null ){	
				 if (tableRows[i].propType === "FILE") { 
					 var mediaType = NodeUtils.convertNodeFilePropertyValueMediaType(propToShow);
					 if (mediaType.includes("image/")) {
						 mainNodeProps += '<a target="_blank" href="'+ NodeUtils.convertNodeFilePropertyValueToDataUrl(propToShow)+'" class="imgthumb"><img   id="image_file_output_show_'+tableRows[i].id+'" src="'+NodeUtils.convertNodeFilePropertyValueToDataUrl(propToShow)+'" height="50" width="50"></a>';
							 
					 } else {
						 mainNodeProps += '<a id="other_file_output_show_'+tableRows[i].id+'" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propToShow)+'" download="'+propToShow.filename+'">' +propToShow.filename+ '</a>';								   
					 }	
				 }else {
					 mainNodeProps   +=  propToShow ;
				 }					 
			 } else { 
				 mainNodeProps   += "  ";
				 }
			 mainNodeProps   += "  </td>";
		 }
		return mainNodeProps;
    }
    
    
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
    //                     ADDED OPTIONAL   
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    DisplayNewFormUtils.findAllRelatedTypes = function ( typeId ){
		if(!typeId  ){
			console.log(" no type provided "+ typeId );
			return;
		}
		curThreshold = 0;
		
		typeListFound  = [typeId.toString()];				
	    var object = {typeName: typeMapViaId[typeId].name,   mustNode : true, instance: 1};
	    typeListFoundDetails[typeId]= object;
	    
		typeListFound  = typeListFound.concat( DisplayNewFormUtils.findAllNodesRelatted(typeListFound));  
	     // REMOVE DUPLICATE VALUES FROM 
	    console.log( " Element Found before removing duplicate "+ typeListFound);	    
	    var uniqueArray =  GlobalUtils.unique (typeListFound);	    		 	 
	    typeListFound = uniqueArray.slice(0);
	  
	}
    
    DisplayNewFormUtils.findAllNodesRelatted = function (  parentId   ){                                //   function reduced to finding only required related types   	
    	var childrenIds = [];
    	for (var n = 0; n < parentId.length; n++) {   	
		    	 $.each( connMapViaId , function( key, value ) {  
		    		 if ( parentId[n] == value.source.toString() ){
		    			 if ( value.minRel > "0") {
		    				 if( $.inArray(value.target.toString(), childrenIds)  ==  -1 ) {	                   	    	   
                	    	    childrenIds.push(value.target.toString());              	    	    
		    				 } 
		    			 }
		    		 }
		         });  	  
    	} 		 
    	curThreshold += 1;
    	if (childrenIds.length == 0) {
    		return childrenIds;
    	} else {
    		if( curThreshold <=  thresholdNodeCreation ) {                                         //  section which define the depth of searching
    			var ind  = $.inArray(listTypeIds[0], childrenIds);
        		if( ind  !=  -1 ) {  
        		 childrenIds.splice(ind, 1);
        		 console.log(childrenIds );
        		}
        		return childrenIds.concat( DisplayNewFormUtils.findAllNodesRelatted(childrenIds));
    		}  		
    	}  	   		 		    		 
    } 
    	
	DisplayNewFormUtils.filterRelatedNodes2 = function ( list  ){                 // function used for selectedNode   TO BE CHANGED
		var nodes = [];
						
		if(!list  ){
			console.log(" no type provided "+ list );
			return;
		}
		
		list = jQuery.grep(list, function(value) {
			  return value != undefined;
			});
		var listRelatedNodes = [];
		var mustNode = false;
		var nodePos;
		listAllNodes = [];
		for ( var i=0; i <list.length ; i++){
			for ( j= i+1 ; j< list.length ; j++){
				var foundCon = NodeUtils.findConnection ( list[i], list[j] );
				if(foundCon.length >= 1) {
					for(var k = 0; k < foundCon.length; k++){

						 if ( foundCon[k].minRel > '0') { 
							 mustNode = true  
					     } else { mustNode = false };
						 if ( foundCon[k].source.toString()== list[i]){
							 nodePos = 'asParent';
						 }else if (foundCon[k].target.toString()== list[i] ){
							 nodePos = 'asChild';
						 }
					  	 listAllNodes.push({ currNodeType : list[i], currNodePos : nodePos , relNodeType : list[j], typeNode : mustNode , connection : foundCon[k] });  
					  	 listRelatedNodes.push({ startType: list[i] , startNodeUuid: null, endType: list[j]  , endNodeUuid: null,  startTypePos :nodePos  , status: 'initial' });
					  	var objct = {typeName: typeMapViaId[list[j]].name,   mustNode : mustNode, instance: 1};
						if( !typeListFoundDetails[Number(list[j])]) { typeListFoundDetails[Number(list[j])]  = objct;}
						else {
							typeListFoundDetails[Number(list[j])].instance += 1;
						}
					  	 
					}	
				}
			}
		}
		console.table(listRelatedNodes  );
        return listRelatedNodes;
	}
	

	
	