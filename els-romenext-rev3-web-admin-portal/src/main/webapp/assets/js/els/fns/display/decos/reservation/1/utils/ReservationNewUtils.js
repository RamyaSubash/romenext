/**
 * 
 */
function ReservationNewUtils() {
	
};

	ReservationNewUtils.createNode = function( typeId ) {
				
		historyNode = [];	
		var workDiv = $('#work_addInstance');
		listAllNodes = [];
		// load all related nodes to set threshold = 3
		// threshold = 3 ; typeId initial type ; historyNode = [];
		  
		ReservationNewUtils.findAllTypesRelated( typeId );  		  	
		ReservationNewUtils.filterRelatedNodes(typeId,   elementFound  );
		console.log(" elementFound contains "+elementFound );
			
		// build the page with all nodes to create 
	
		ReservationNewUtils.addFormCreateNode (typeId, workDiv, listAllNodes, historyNode, elementFound ); 
		var name = typeMapViaId[typeId].name;
		
		var footer  = '<tr><td colspan="2"></td></tr><tr><td colspan="2"><font color="red">Red Color Property</font> are Mandatory </td></tr>';
		 footer += 	'<tr align="center"><td colspan="2"><input type="button"  name="submit" class="btn btn-primary btn-xs"   id="addNodeInst_submit_' + typeId+ '" value="Add  '+name+'" onclick="ReservationNewUtils.saveNodeInfo('+typeId+');"/>';		
	     footer += '<input type="button"   name="cancel" id="addNodeInst_cancel_' + typeId + '" value="Cancel" onclick="ReservationNewUtils.createNode_cancel(' + typeId + ');"/></td></tr>';
	
	    $(workDiv ).append(footer);
	    NodeFctsUtils.showDivision ("work_addInstance", ''  );		
		
	};
	
	ReservationNewUtils.findAllTypesRelated = function ( typeId ){
			if(!typeId  ){
				console.log(" no type provided "+ typeId );
				return;
			}
			console.log( elementFound);
			curThreshold = 0;
			listAllNodes = [];
			elementFound  = [];		 
		    elementFound  = [typeId];
		    elementFound  = elementFound.concat( ReservationNewUtils.findAllRelatedNodes(elementFound));  // a bug one entry with undefined
		     // REMOVE DUPLICATE VALUES FROM 
		    console.log( " Element Found before removing duplicate "+ elementFound);
			var uniqueArray = elementFound.filter(function(elem,i,rep){
				  return i == rep.indexOf(elem);
				 })
					 	 
		    elementFound = uniqueArray.slice(0);
		    console.log( " Element Found after removing duplicate "+ elementFound); 
		    elementFound = jQuery.grep(elementFound, function(value) {
			  return value != undefined;
			});		
	}
			
    ReservationNewUtils.findAllRelatedNodes = function (  parentId   ){  	
    	var childrenIds = [];
    	var mustNode = false;
        var stayId = NodeUtils.findTypeID("STAY"); 
    	for (var n = 0; n < parentId.length; n++) { 
      	
	    	 $.each( connMapViaId , function( key, value ) {  
	    		 if ( value.minRel > '0') { mustNode = true  } else { mustNode = false };           	  
                 if( parentId[n] == value.target.toString()) { 
                	 if( stayId != value.source  && $.inArray(value.source.toString(), childrenIds)  ==  -1 ) {     
//                	 if ( $.inArray(value.source.toString() , childrenIds)  ==  -1 ){
                		 childrenIds.push(value.source.toString());
                	 }
                 }else if ( parentId[n] == value.source.toString() ){
                	      if( stayId != value.target  && $.inArray(value.target.toString(), childrenIds)  ==  -1 ) {
//                   	       if( $.inArray(value.target.toString(), childrenIds)  ==  -1 ) {
                   	    	childrenIds.push(value.target.toString());    
                   	       }                   	       
                      }          
	         });  
    	}
    	curThreshold += 1;
    	if (childrenIds.length == 0) {
    		return childrenIds;
    	} else {
    		if( curThreshold <=  thresholdNodeCreation ) {
    			var ind  = $.inArray(listTypeIds[0], childrenIds);
        		if( ind  !=  -1 ) {  
        		 childrenIds.splice(ind, 1);
        		 console.log(childrenIds );
        		}
        		return childrenIds.concat( ReservationNewUtils.findAllRelatedNodes(childrenIds));
    		}  		
    	}  	
    	
    }
	
    ReservationNewUtils.getNodesLinkedToReservation = function ( nodes ,instHolderDiv){
 
    	 var jsonData = {}, returnedNodes = [];
    	 var childrenNodes = [];
		 var addedNodes = [];
		 var otherToAdd = [];
		 
		 for ( var i = 0; i < nodes.length; i++){
			 var currType  =  nodes[i].startType;
			 if( nodes[i].startNodeUuid != null){
				 if( nodes[i].endNodeUuid == null  && nodes[i].status  == 'initial'  ){
					 // build json for API call 
					 jsonData = ReservationNewUtils.buildJsonGetNodesFromEntryNodes ( nodes[i].startNodeUuid, nodes[i].endType  );
					 // call API					 
					 ReservationNewUtils.getNodesFronEntry ( jsonData, i, nodes  );
					   
					 // complete the nodes info
						 if( !$.isEmptyObject(historyNode)){
							 
							 if (historyNode.length >= 1  ){ 
								 nodes[i].endNodeUuid = historyNode[0];
								 nodes[i].status  = 'ready';
								 var typeId2     = 	nodeMap[historyNode[0]].typeId;
								 for ( var j = i+1; j < nodes.length; j++){
									 if( nodes[j].startType == typeId2 ){
										 otherToAdd.push( nodes[j]);
										 nodes[j].startNodeUuid = historyNode[0];
									 }
								 }
								
								 ReservationUtils.addDivsForAReservationDetails (instHolderDiv, historyNode[0] );
						
								 var typeInfo2 = typeMapViaId[typeId2];
								 ( new ReservationManagerRender() ).displayViewEditProperties( typeInfo2, historyNode[0],  nodeMap[historyNode[0]]  );
								 nodesToUpdate.push({type: typeId2  , node: historyNode[0]});
								 
								 
								 for ( var k = 1; k< historyNode.length; k++){
									 var addNode = {};
									   addNode.startType      = nodes[i].startType   ;
									   addNode.startNodeUuid = nodes[i].startNodeUuid ;
									   addNode.endType       = nodes[i].endType;
									   addNode.endNodeUuid   = historyNode[k];
									   addNode.startTypePos  = nodes[i].startTypePos;
									   addNode.status        = 'ready';
									   addedNodes.push(addNode);
									   addNode = {};

									   var typeId2     = 	nodeMap[historyNode[k]].typeId;
									   ReservationUtils.addDivsForAReservationDetails (instHolderDiv, historyNode[k] );
									   
									   var typeInfo2 = typeMapViaId[typeId2];
									   ( new ReservationManagerRender() ).displayViewEditProperties( typeInfo2, historyNode[k],  nodeMap[historyNode[k]]  );
									   nodesToUpdate.push({type: typeId2  , node: historyNode[k]});

								 }
								 								 								 
								 for ( var l=1; l< historyNode.length; l++){
									 for( var ind = 0; ind< otherToAdd.length; ind++){											 
											 var child = {};
												 child.startType        = otherToAdd[ind].startType;
												 child.startNodeUuid   = historyNode[l];
												 child.endType         = otherToAdd[ind].endType;
												 child.endNodeUuid     = null;
												 child.startTypePos    =  otherToAdd[ind].startTypePos;
												 child.status          = 'initial';
												 childrenNodes.push(child);										 
									 }
								 }							 				 
							 }							 			 
							
						 }else {
							 // no nodes found display error 
							 nodes[i].status  =  'error';
							 console.log(" Could not find related node instances "+ nodes[i].startNodeUuid);
						 }
						 jsonData = {}; historyNode = [];
				 }				 				 
			 }			 	 		 
		 }
		 		 
        console.log( nodes );
        if (childrenNodes.length == 0) {
    		return childrenNodes;
    	} else { 
        		return childrenNodes.concat( ReservationNewUtils.getNodesLinkedToReservation(childrenNodes,instHolderDiv ));  	 		
    	}  		
    	
    }  
    
	ReservationNewUtils.filterRelatedNodes = function ( typeId, list  ){
		var nodes = [];
		// remove  WALKIN
		var walkinID = NodeUtils.findTypeID ("WALKIN" );
			
		list = jQuery.grep(list, function(value) {
			  return value != walkinID;
			});
		
		list = jQuery.grep(list, function(value) {
			  return value != undefined;
			});

		var mustNode = false;
		var nodePos;
		listAllNodes = [];
		for ( var i=0; i <list.length ; i++){
			for ( j= i+1 ; j< list.length ; j++){
				var foundCon = NodeUtils.findConnection ( list[i], list[j] );
			
				if(foundCon.length == 1) {

					 if ( foundCon[0].minRel > '0') { mustNode = true  } else { mustNode = false };
					 if ( foundCon[0].source.toString()== list[i]){
						 nodePos = 'asParent';
					 }else if (foundCon[0].target.toString()== list[i] ){
						 nodePos = 'asChild';
					 }
				  	 listAllNodes.push({ currNodeType : list[i], currNodePos : nodePos , relNodeType : list[j], typeNode : mustNode , connection : foundCon[0] });
//				  	 listRelatedNodes.push({ startType: list[i] , startNodeUuid: null, endType: list[j]  , endNodeUuid: null,  startTypePos :nodePos  , status: 'initial' });
					}else {
						// what to do if more connection
					}
			}
		}

	}
	   
//################################## Other version of filter used for selectNode ##################################################
    ReservationNewUtils.filterRelatedNodes2 = function ( typeId, list  ){
		var nodes = [];
				
		list = jQuery.grep(list, function(value) {
			  return value != undefined;
			});
		var listRelatedNodes = [];
		var listConns = [];
		var mustNode = false;
		var nodePos;
		listAllNodes = [];
		for ( var i=0; i <list.length ; i++){
			for ( j= i+1 ; j< list.length ; j++){
				var foundCon = NodeUtils.findConnection ( list[i], list[j] );
			
				if(foundCon.length == 1) {
					listConns.push(foundCon[0] );

					 if ( foundCon[0].minRel > '0') { mustNode = true  } else { mustNode = false };
					 if ( foundCon[0].source.toString()== list[i]){
						 nodePos = 'asParent';
					 }else if (foundCon[0].target.toString()== list[i] ){
						 nodePos = 'asChild';
					 }
				  	 listAllNodes.push({ currNodeType : list[i], currNodePos : nodePos , relNodeType : list[j], typeNode : mustNode , connection : foundCon[0] });  
				  	 listRelatedNodes.push({ startType: list[i] , startNodeUuid: null, endType: list[j]  , endNodeUuid: null,  startTypePos :nodePos  , status: 'initial' });				
					}

				
			}
		}
		console.table(listRelatedNodes  );
        return listRelatedNodes;
	}
      	
	ReservationNewUtils.addFormCreateNode = function (typeId, workDiv, relatedNodes, listHistory, list ){     // list [ , , , ] contains all types Related; relatedNodes -- how nodes are related        
			
			if(!typeId) {
		    	  console.log(" No type Id defined ");
		    	  return null;
		      }   
			var color = 'grey';
			var inputContentList = '';
			    color = typeMapViaId[typeId].color;
					    
			inputContentList +=  '<fieldset" ><legend>'+typeMapViaId[typeId].name +' Details: </legend> ';
			    // add division for the node instance creation      
			    inputContentList +=  '<div id="addNodeInst_'+ typeId +'"></div>';
                // add divisions for all related Nodes
			    inputContentList +=  '<div class="addRelatedNodes" >';
				if ( !$.isEmptyObject(list) )  {  				
					for (var node = 0; node < list.length ; node++ ) {				
						inputContentList += ReservationNewUtils.loopThroughRelatedNodesToDisplay( list[node]  , relatedNodes,listHistory  );						
					}
				}      	    
				inputContentList += '</div>';	
		     inputContentList += '</fieldset>';
		   					 
			 workDiv.append(inputContentList);
	         // add the properties details for the node 
			 ReservationNewUtils.addNodeDetails( $("#addNodeInst_"+typeId), typeId);
			 ReservationNewUtils.setDates();
			 
		}
	
	ReservationNewUtils.loopThroughRelatedNodesToDisplay = function ( typeId, relatedNodes , listHistory ){
//		var element = {};		
		var ableToCreate    = false;
	 
	    var contentList = '';
		var line = '', endNode,  restriction ;
		
		// if we have any Must Connection/Link do the following
	    
	    if( !$.isEmptyObject( relatedNodes) ){
	    	for ( var node = 0; node < relatedNodes.length ; node++){
	    		var text = '(Optional)';	
	    		if( relatedNodes[node].currNodeType == typeId  ){
				    line = '';	
				    endNode = relatedNodes[node].relNodeType;
				   	restriction = NodeUtils.findRestriction (typeMapViaId[endNode]);		    	
			    	if(restriction == 'ROOTONLY')  {	
			    		ableToCreate = false;
			    	}else {
			    		ableToCreate = true;
			    		}
			    	var color = typeMapViaId[endNode].color;
				    var field = '';	    			    		    		    	
	                if(relatedNodes[node].typeNode)   { text = "(Mandatory)"};
	                if ( text == 'Otional'){ field += '<input type="radio" id="optional" value="include" />Include ' };
			        if ( endNode == relatedNodes[node].connection.source  ){			    
			        	line += '<fieldset  ><legend  id ="fieldType_'+relatedNodes[node].connection.source+'" >'+relatedNodes[node].connection.origin +' '+text+ field +'</legend>' ;		        	
			        }else {
			        	line += '<fieldset  ><legend  id ="fieldType_'+relatedNodes[node].connection.target+'" >'+relatedNodes[node].connection.destination +' '+text+ field +'</legend>';
			        }

				        line += '<div>';
					    if( ableToCreate == true )	{    		
					   		line += '<input type="radio" class="createOptions" name="mustConn_'+endNode+'"   value="create" onclick="ReservationNewUtils.showCreateDiv('+endNode+', '+typeId+' )"/>Create New ';		    					    	
					   	}	    		    				    	
				    	line += '<input id="connect_parents_in_creation" type="radio" name="mustConn_'+endNode+'"    value="use" onclick="ReservationNewUtils.showCreateDiv('+endNode+', '+typeId+' )" />Search ';			    			    			    	

					    
					   	if( ableToCreate == true )  {	
					    		line += '<div id="nodeCreateDiv_'+endNode+'" style="display:none;visibility:hidden"></div>';	
					   	}			    	
					    line += '<div id="nodeDisplayDiv_'+endNode+'" style="display:none;visibility:hidden"></div>';
					   	line += '<div id="DetailsNodeDisplay_'+endNode+'" class="DetailsNode" style="display:none;visibility:hidden"  ></div>';
					   	
					   	line += '</div>';
					line += ' </fieldset>';

	                contentList += line;
				    line = '';
				    	 
	    	}
	   } 			        			    	
	}
	    return contentList;
	}
		
	ReservationNewUtils.addNodeDetails = function( appendToDiv, typeId ){
	    	
	    	if(!typeId ){
	    		console.log(" no Type Id provided: cannot build create Instance table  "); 
	    		return;
	    	}
	    	var tmpType = typeMapViaId[typeId];
	    	// populate the Add INSTANCE FORM with properties	              
	    	var propcolor = '', typeDate = 'date';			                           // RED color used to highlight Mandatory property
	    		
	        var listDates = [];
	    	// build the form
	    	var inputContent = '';
	    	    inputContent += '<br /><table id="tableNodeCreate_' + typeId + '>';

	       	if(!$.isEmptyObject( tmpType.typeProperties	)){
	    		$.each( tmpType.typeProperties, function( propId, tmpProp ) {
	    					
	    			inputContent += '<tr id="typeProps">';
	    			if(tmpProp.isMandatory){ propcolor='color:red'  } else {propcolor='color:black' };		
	    			if( tmpProp.propertyType == "DATE" ) {
	    				
    				inputContent += '<td   ><p style='+propcolor+'>'+ tmpProp.name + ':</p></td><td>' + '<input type="text"  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" value="' + today + '" / ></td><td>(DATE) </td></tr>' ;
    				listDates.push(tmpProp.id);
    				
    				
	    			}else if( tmpProp.propertyType == "BOOLEAN" ) {
	    				inputContent += '<td  ><p style='+propcolor+'>'+ tmpProp.name + ':</p></td>';
	    				inputContent += '<td><input type="radio" name="'+tmpProp.name+ '" id="form_inst_add_val_' + tmpProp.id + '"  value ="true" checked="checked"/>True'
	    				inputContent += ' <input type="radio"    name="'+tmpProp.name+ '" id="form_inst_add_val_' + tmpProp.id + '"  value="false"/>False</td><td></td></tr>' ;
	    			
	    			}else if( tmpProp.propertyType == "FILE" ) {
		    			
	    				inputContent += '<td ><p style='+propcolor+'>'+ tmpProp.name + ':</p></td><td>' + '<input  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" value=""  type="file"/ ></td><td>(FILE)</td> </tr>  ' ;	
	    			}else {
	    					
    					inputContent += '<td ><p style='+propcolor+'>'+ tmpProp.name + ':</p></td><td>' + '<input  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" value="" ' ;	
	    					
	    					if( tmpProp.propertyType == "STRING" ) {
	    						inputContent += ' type="text"/ ></td><td>(TEXT)</td> </tr>' ;
	    					} else if( tmpProp.propertyType == "INTEGER" ) {
	    						inputContent += 'type="text"/ ></td><td>(NUMBER) </td></tr>' ;
	    					} else if( tmpProp.propertyType == "DOUBLE" ) {
	    						inputContent += 'type="text"/ ></td><td>(DOUBLE) </td></tr>' ;
	    					} else {
	    						inputContent += 'type="text"/ ></td><td>(UNKNOWN TYPE) </td></tr>' ;		
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
	        		  dateFormat: "yy-mm-dd"
	        	});
	        }
	        ReservationNewUtils.setDates();
	      
		
	    }
	    
	ReservationNewUtils.showCreateDiv = function (parent, typeId ){
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
	    		
	    		ReservationNewUtils.addNodeDetails( $("#nodeCreateDiv_"+parent) , parent  );
    		
	    		//  -- hide the select option 
	    		DisplayInterfaceUtils.hideDivision('nodeDisplayDiv_', parent);
	    		DisplayInterfaceUtils.hideDivision('DetailsNodeDisplay_', parent);
	    		// --  show the create option
	    		DisplayInterfaceUtils.showDivision('nodeCreateDiv_', parent );
	    		
	    	}else if (valueSelected == 'use'){
	    	
	    		// build the list of nodes 
	    		$("#nodeDisplayDiv_"+parent).empty();;
	    		ReservationNewUtils.generateNodesSearchForm($("#nodeDisplayDiv_"+parent), parent);
	    			    		
	    		// hide the create  option 
	    		DisplayInterfaceUtils.hideDivision('nodeCreateDiv_', parent);
	    		// show the list to select from 
	    		DisplayInterfaceUtils.showDivision('nodeDisplayDiv_',parent);	
	    	}
	    	       					    
	    } 
	
	ReservationNewUtils.cleanPreviousResult = function ( typeId ){
		var prevSearchResult = document.getElementById('returnToSearch_'+ typeId );
		
		if (prevSearchResult != undefined || prevSearchResult != null) {	
			// clean the DetailsNode for the typeId and its related nodes
			
			var previousDetailsNode = $('#DetailsNodeDisplay_'+ typeId);
			if(previousDetailsNode ){
				previousDetailsNode.empty();
			}
			var previousNodeDisplayDiv = $('#nodeDisplayDiv_'+ typeId);
			if(previousNodeDisplayDiv ){
				previousNodeDisplayDiv.empty();
			}	

			var typeIdsRel  = ReservationNewUtils.getTypeFromList (typeId);             
			if( typeIdsRel ){                                                    // NEED to change this to Loop through list
					
				var previousDetailsNode = $('#DetailsNodeDisplay_'+ typeIdsRel[0]);
				if(previousDetailsNode ){
					previousDetailsNode.empty();
				}
				
				var previousDisplayDetails = $('#nodeDisplayDiv_'+ typeIdsRel[0]);
				if(previousDisplayDetails ){
					previousDisplayDetails.empty();
				}
				
				$('input[name="mustConn_'+typeIdsRel[0]+'"][value=create]').prop('checked',true)
			    NodeFctsUtils.showDivision('nodeCreateDiv_', typeIdsRel[0]);				
			}						
		}		
	}
		
	ReservationNewUtils.generateNodesSearchForm = function( workspace, typeId ) {
	    	if(!typeId ){
	    		console.log(" no Type Id provided: cannot build search Instance table  "); 
	    		return;
	    	}
	    	var tmpType = typeMapViaId[typeId];  	
	    	ReservationNewUtils.cleanPreviousResult ( typeId );
	    	
	    	// build the form
	    	var inputContent = '';
	    	    inputContent += '<br /><table  class="SearchNodesTable"   id="tableNodeSearch_' + typeId + '" border="2">';

	       	if(!$.isEmptyObject( tmpType.typeProperties	)){
	    		$.each( tmpType.typeProperties, function( propId, tmpProp ) {
	    			
	    			var nodesSearchTypeSelection = DisplayInterfaceUtils.generateNodesSearchTypeSelection(propId);
	    			// TODO: Only search by STRING properties for now
	    			if( tmpProp.propertyType == "STRING" ) {
	    				inputContent += '<tr id="searchTypeProps"><td>' + tmpProp.name + ':</td><td>' + '<input name="' + tmpProp.name + '" id="form_inst_search_prop_val_' + tmpProp.id + '" value="" type="text"/>(TEXT)' + nodesSearchTypeSelection + '</td></tr>';	
	    			}
	    	
	    		});
	        }else {    
	        	inputContent += "<tr><td colspan='2'> No Properties defined for this Type </td></tr>";   
	        };
	    	
	        inputContent += '<tr><td colspan="2"><input type="button" name="submit" class="btn btn-primary btn-xs" id="search_node_submit_' + typeId + '" value="Search" onclick="ReservationNewUtils.searchNodes(\'' + workspace.attr('id') + '\', \'tableNodeSearch_' + typeId + '\', '  + typeId + ');"/></td></tr></table>';                                                                                                       
	    	workspace.append(inputContent);

	    };
	    
	ReservationNewUtils.searchNodes = function ( outterWorkspaceId, innerWorkspaceId, typeId){
	    	NodeUtils.searchNodesByProperties(outterWorkspaceId, innerWorkspaceId, typeId );
	  
	    	$('#node_list_'+typeId).attr('onclick', 'ReservationNewUtils.viewNode('+typeId +')');
	    	$('#returnToSearch_'+typeId).attr('onclick', 'ReservationNewUtils.generateNodesSearchForm($("#nodeDisplayDiv_'+typeId+'"),'+ typeId+')');
	}
	    
	ReservationNewUtils.viewNode = function ( typeId){
		
		if(!typeId ){
    		console.log(" no Type Id provided: cannot build search Instance table  "); 
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
		var div = $('#DetailsNodeDisplay_'+typeId);
		div.empty();
						
		ReservationNewUtils.displayInfoNodeSelected(typeId, nodeUuid, value, div );
		DisplayInterfaceUtils.showDivision('DetailsNodeDisplay_',typeId);	
			
			// load  Parent or children if available 
		var typeIdsRel  = ReservationNewUtils.getTypeFromList (typeId);
		if( typeIdsRel ){
			
			ReservationNewUtils.getSubTree (nodeUuid, typeId, typeIdsRel  );
			
			if(listInstUuids[0]){
				var typeN = nodeMap[listInstUuids[0]].typeId;
				
				var nodes = [];
				nodes.push(nodeMap[listInstUuids[0]]);				
				$("#nodeDisplayDiv_"+typeN).empty();		
				var inputContent = '';
			    inputContent += '<table id="tableNodeSearch_' + typeN + '" class="SearchNodesTable"    ></table>';		 
			    $("#nodeDisplayDiv_"+typeN).append(inputContent);  
			    
				var title = 'Select ' + typeMapViaId[typeN].name;
				DisplayInterfaceUtils.generateNodeList ( $("#nodeDisplayDiv_"+typeN+" table"), title, typeN, nodes );			
				DisplayInterfaceUtils.showDivision('nodeDisplayDiv_',typeN);
				
				var div2 = $('#DetailsNodeDisplay_'+typeN);					
				DisplayInterfaceUtils.hideDivision('nodeCreateDiv_', typeN);
			    
				var value  = nodeMap[listInstUuids[0]];						
				ReservationNewUtils.displayInfoNodeSelected(typeN, listInstUuids[0], value, div2 );
				
				DisplayInterfaceUtils.showDivision('DetailsNodeDisplay_', typeN);				
				$('input[name="mustConn_'+typeN+'"][value=use]').prop('checked',true)
			}else {
				console.log(" no value returned for related nodes");
				$("#nodeDisplayDiv_"+typeIdsRel[0]).empty();
				$('#DetailsNodeDisplay_'+typeIdsRel[0]).empty();		
				$('input[name="mustConn_'+typeIdsRel[0]+'"][value=create]').prop('checked',true)
			    DisplayInterfaceUtils.showDivision('nodeCreateDiv_', typeIdsRel[0]);
	
			}
		}				

	 }
	    
	ReservationNewUtils.displayInfoNodeSelected = function (typeId,  key , value, where ){
	    	if(!key  ){
				console.log(" no Reservation uuid  given "+ key );
				return;
			}
	   	
	    	if(!value){
	    		console.log(" no  details given for the   "+ key);
				console.log(" Can not Display its properties");
				return;
	    	}
			
			var instViewDiv       = where;
			instViewDiv.html('');
			
			
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
							inputpropViewRow += '<td  width="100px" >'+ propValue +'</td>';
				
						} else {
							inputpropViewRow += '<td  width="100px"> NONE </td>';	
						}						
						inputpropViewRow += "</tr>"										
					});
					tableViewInstProps = tableViewInstProps + inputpropViewRow + "</table><br /><br />";
			}
				
			where.append(tableViewInstProps);		
	  }
	
	ReservationNewUtils.listAll = function ( propToSearch   ){
		
		// hide all the others		
		$('div.reservation_detail').hide();			
		$('.work_addInstance').empty();
		var workDiv = $('#work_addInstance');
		
		var entryNodes = GlobalTypeInstanceUtils.getAllInstances( listTypeIds[0] );
		
		var tableRows = DisplayInterfaceUtils.tableMandatoryProperties(listTypeIds[0], propToSearch );
		var props = typeMapViaId[listTypeIds[0]].typeProperties;
		
		var inputs = "<div class='container'><table id='reservationlist'  class='reservation' >";
	    inputs += "<thead><tr>";
		   
    	for( var i=0; i <tableRows.length; i++){
	    	var value   = props[tableRows[i].id];
	    	var name = value.name;
	    	inputs += '<th>  '+name+'  </th>';
	    }
	     inputs += '<th> Details </th></tr></thead>';
	     inputs += '<tbody>';
		    	    
	    var rowColor = false;
		$.each( entryNodes, function(key, value) {
			
			var uuid = NodeUtils.findUUID(value);
			if(!uuid ){
				console.log(" no Reservation uuid  given "+ uuid );
				console.log(" Can not add the node to the list");
				console.log(' Value is : %O'+ value);
				return;
			}
			if(!rowColor){
				inputs += "<tr class='row1'>";
				rowColor = true;
			}else {
				inputs += "<tr class='row2'>";
				rowColor = false;
			}	
			
			 for( var i=0; i <tableRows.length; i++){	 
				 var propToShow = ReservationNewUtils.findValueProp (value, tableRows[i].id.toString() );
				 inputs += "<td>  "+ propToShow+"  </td>";
			    }
			inputs += "<td><button type='button'  id='"+uuid+"'  onclick=\"( new ReservationManagerRender() ).selectedNode('" + uuid + "')\"  >View details</td> </tr>";		
	     });
			inputs +="</tbody></table></div>";
			
	
		 workDiv.append( inputs);		
		      
		 DisplayInterfaceUtils.showDivision ("work_addInstance", '');
		 
		 
//			var listProperties = '';
//			 for ( var j=0; j<tableRows.length; j++){
//				if ( tableRows[j].propType == 'STRING') {
//					listProperties += ",'s'";
//				}else if(tableRows[j].propType == 'DATE' ){
//					listProperties += ", 'd'";
//				}else if(tableRows[j].propType == 'INTEGER' ){
//					listProperties += ",'i'";
//				}else {
//					listProperties += ",''";
//				}
//			 }
//	 
//		 
//		 var scriptText = "";
//	
//		 scriptText  += "var TSort_Data = new Array('reservationlist'"+listProperties+");";
////		 scriptText  += "var TSort_Initial = 1;";	
//		 scriptText  += "tsRegister();";
//
//		 var tag = document.createElement("script");
//		 tag.type  = 'text/javascript';
//		 tag.innerHTML = scriptText;
////		 document.getElementsByTagName("head")[0].appendChild(tag);
//		 document.head.appendChild(tag);
	}

// ================================================  FUNCTIONS FOR SAVING  RESERVATION ===========================================
//=======================================================================================================================    
	ReservationNewUtils.saveNodeInfo = function( typeId  ) {
    	
    	console.log(" Inside the saving process ");
		if(!typeId ){
			console.error(" Missing Type Id for creation of Node instance ");
	        return;
			}	
		var foundNodes = [];
		var node = {};
		   node  = {type : typeId.toString(), nodeUuid: null, action : 'create' };
		   foundNodes[typeId] = node;
		   node = {};

		for( var i = 1; i <elementFound.length; i++){
			var valueSelected = $('input[name="mustConn_'+elementFound[i]+'"]:checked').val();
	    	if(!valueSelected){
	    		console.log(" No value selected  "+ valueSelected);	
	    		return;
	    	}
			
	    	node.type = elementFound[i];
	    	if(valueSelected == 'create'){
	    		node.nodeUuid = null;
	    		node.action   = 'create'
	    			
	    	}else {
	    		if( valueSelected == 'use'  ){
	    			 var ele          = document.getElementById('node_list_'+elementFound[i]);
	    			 var nodeUuid     = ele.options[ele.selectedIndex].value;
    				 if(!nodeUuid ){
    		    		console.log(" no node found  in selection  "); 
    		    		break;
    		    	 }	 
    				 node.nodeUuid = nodeUuid;
    		    	 node.action   = 'use';
	    		}else {
	    			console.log('error in collecting options create/use');
	    		}
	    		
	    	}

	    	foundNodes[elementFound[i] ] = node ;
	    	node = {};
			
		}
		
		console.log(" Found theese nodes in the Process : ")
		console.table(foundNodes);

		for( var j=0; j < listAllNodes.length; j++){
			var currElement = listAllNodes[j];
			if( foundNodes [ currElement.currNodeType].nodeUuid == null ){
				currElement.edge = 'createEdge';
				listAllNodes[j] = currElement;
			}else {
				// first Type  has the node uuid 
				if( foundNodes [ currElement.relNodeType].nodeUuid == null ){
					currElement.edge = 'createEdge';
					listAllNodes[j] = currElement;
				}else {  // both types have nodes  === we are in a selecte options
					currElement.edge = 'edgeExists';
					listAllNodes[j] = currElement;	
				}
				
			}		
		}
		console.log(" Finally listAllNodes is: ");
		console.table(listAllNodes);
		
		
		// CREATE NODES    				
		foundNodes.forEach(function( value ){
			// this should create the node for the current Type 
			console.log("%c Creation of simple Node instance ", "color:blue"); 	
			console.log("%c Attempting to add a new Node for this type :" + value.type , "color:blue" );		
			
			if( value.action == 'create'){
				var properties=[];	
					properties = NodeUtils.retrieveNodePropertiesFromForm ( value.type , 'form_inst_add_val_');
				if(properties[properties.length-1]){
						console.error(" do not continue the saving Process");
						return;
				}
				properties.pop();   // everything is fine remove boolean
				ReservationNewUtils.SaveNodeCreated (value.type, properties ); 
				
				if(!listInstUuids[0]){
					console.log("failure in creating  node ");
					return;
				}
				value.nodeUuid = listInstUuids[0];		
			}
			
		});
		// CREATE EDGES 
		
		for( var j=0; j < listAllNodes.length; j++){
			console.log("%c Creation of Edge ", "color:blue");
			if( listAllNodes[j].edge == 'createEdge'  ){
				
				var element = listAllNodes[j];
				var nodeUuid1 = foundNodes[element.currNodeType].nodeUuid;
				var nodeUuid2 = foundNodes[element.relNodeType].nodeUuid;
				var jsonData = {};
				if( element.currNodePos == 'asParent'){
					jsonData = NodeUtils.createEdgeJson( element.currNodeType,  nodeUuid1, element.relNodeType, nodeUuid2, listAllNodes[j].connection.id  );	
				}else if (element.currNodePos == 'asChild'  ){
					jsonData = NodeUtils.createEdgeJson(  element.relNodeType, nodeUuid2, element.currNodeType,  nodeUuid1, listAllNodes[j].connection.id  );
				}else  if ( element.currNodePos == 'asSibling'){	
					jsonData = NodeUtils.createEdgeJson( element.currNodeType,  nodeUuid1, element.relNodeType, nodeUuid2,  listAllNodes[j].connection.id  );
				}			
				
				var apiEdge  = new EdgeApis();
				
				var doneFunction = function ( dataEdge ){
					if(!$.isEmptyObject(dataEdge)){
						console.log("Edge created ");
						// add edge to edgeMap
						NodeUtils.AddEdgeToMap( dataEdge);								
					}else {
						// error
						console.error("Creation of Edge did not return a value for edge "); 
					}
				}
				
				var failFunction = function (  xhr, status, error ){
					console.error('Error Edge not created: ' + xhr.status);
					$('#console-log').append("<p style='color:red'>Error Edge not created:"+ xhr.status+"</p>");	
				}
						
				apiEdge.saveEdge( jsonData,  doneFunction, failFunction );			
			}
			
		}
		
		var resUuid  =  foundNodes[typeId].nodeUuid;
		var bodyDiv = $( "#reservation_body");		
		if (document.getElementById('reservation_detail_'+resUuid) == undefined || document.getElementById('reservation_detail_'+resUuid) == null) {		
			ReservationUtils.createAppendHTMLEntity('div', 'reservation_detail_'+resUuid , 'reservation_detail', 'visible', 'inline-block', '', bodyDiv);
		}
					
		( new ReservationManagerRender() ).selectedNode( resUuid );	
		
		curThreshold  = 0;
		listAllNodes  = [];
		historyNode   =[];
		
    	 	
    }
	
	ReservationNewUtils.SaveNodeCreated = function ( nodeTypeId, properties ){
		
		var data = new NodeJsonObject();
		// set the minimum
		data.init(selectedMetaData.toString(), nodeTypeId.toString(), properties);
		data.defaultDecorator = "1";

		var doneFunction = function( dataNode ) {
			if(!$.isEmptyObject(dataNode)){
				$('#console-log').append("<p style='color:blue'Node created successfully.</p>");
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
		
	ReservationNewUtils.getTypeFromList = function(typeId  ){
		var typeIdsRel = [];
		for ( var i=0; i<elementFound.length; i++){
			if( elementFound[i] != undefined){
			if( (elementFound[i] != typeId) && (elementFound[i] != listTypeIds[0]) ){
				for ( var j=0; j <listAllNodes.length; j++){
					if( elementFound[i]  ==  listAllNodes[j].relNodeType && typeId == listAllNodes[j].currNodeType){
							typeIdsRel.push(Number(elementFound[i]) )
					}else {
						if( elementFound[i]  ==  listAllNodes[j].currNodeType && typeId == listAllNodes[j].relNodeType ){	
							typeIdsRel.push(Number(elementFound[i]) )
						}
					}
				}
			}
			
			}
		}
		return typeIdsRel;
		
	}
			
	ReservationNewUtils.getSubTree = function (nodeUuid, typeId ,typeIdsRel ){
		
		console.log('Node uuid is : '+ nodeUuid + ' typeId is '+typeId);
		var jsonData    = {}; 
		var properties  = []; 
		var typeIds     = [];
		var entryNode   = {};
		
		//  START FROM :  EntryNode is  uuid and typeId
        var nodeProperty = NodeUtils.createSysJson( nodeUuid);	        
		typeIds.push(Number(nodeMap[nodeUuid].typeId));
		properties.push(nodeProperty);			
		entryNode["typeIds"]    = typeIds;		
		entryNode["systemProperties"] = properties;		
		jsonData["entryNode"] =  entryNode;
		jsonData['searchDirection'] = 'ALL';
			
		jsonData["typeIds"]   = typeIdsRel;
		
		console.log('Related type is '+typeIdsRel)
	
		var successFunction = function( data ) {
			if($.isEmptyObject(data)||    $.isEmptyObject(data.nodes)){      // at least the node itself is returned if it has no Parent/Children/Sibling
				console.warn (" no Hotel details returned from the API getRelatedNodes&Edges");
				listInstUuids= [];
			}else {		
				console.log("data.nodes are: ");
				console.table(data.nodes); 
				NodeUtils.AddNodeToMap( data.nodes[0]);  
			
				listInstUuids[0] = NodeUtils.findUUID(data.nodes[0]);
			}		
					
								
		};	
		var failFunction = function( xhr, status, error ) {
			console.log('Not able to load related  Hotel Details: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Not able to load related Hotel Details: "+ xhr.status+"</p>");	
		};	
		var nodeApi = new NodeApis();
		nodeApi.getNodesFromEntryNode(jsonData, successFunction, failFunction);	
		
	}
	
	ReservationNewUtils.buildJsonGetNodesFromEntryNodes = function ( nodeUuidStart, typeIdFinish   ){
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
		jsonData['searchDirection'] = 'ALL';
		
		return jsonData;
		
	}
	
	ReservationNewUtils.getNodesFronEntry = function ( jsonData, ind , nodes   ){
		historyNode = [];
		var successFunction = function( data ) {
			if($.isEmptyObject(data)||    $.isEmptyObject(data.nodes)){      // at least the node itself is returned if it has no Parent/Children/Sibling
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
				
	ReservationNewUtils.findPropertyIdType = function ( typeId , propId){
		 var namePropertyId = null;
		 if(typeId){
			 var props = typeMapViaId[typeId].typeProperties;
			 $.each(props, function( propId, tmpProp ) {
				 if(tmpProp.name == "Arrival") { namePropertyId = propId}
			 })
			 return namePropertyId;
		 }else {
			 console.error("Missing type Id ! Cannot find Name property ");
			 return null;
		 }
	 }
	
	ReservationNewUtils.findFirstProperty = function ( typeId ){
		 var namePropertyId = null;
		 if(typeId){
			 var props = typeMapViaId[typeId].typeProperties;
			 if( props.length >= 1 )  {
				 $.each(props, function( propId, tmpProp ) { 
					 if(tmpProp.isMandatory  && tmpProp.propertyType == 'STRING' ){
				           namePropertyId = tmpProp.id; }
				 });
			 }
			 return namePropertyId;
		 }else {
			 console.error("Missing type Id ! Cannot find Name property ");
			 return null;
		 }
	 }
		
	ReservationNewUtils.findValueProp = function ( data , propId ){
		 if(!$.isEmptyObject(data) ){ 
		    var val = null;
		    if (!$.isEmptyObject(data.typeProperties)){
				 $.each( data.typeProperties, function( key, value ) {		
					if( value.id == propId){
						val = value.value 
					}
				}); 			
		    }
			return val; 
		 }else {
			 console.log(" no node typeProperties provided ");
			 return null;
		 }
		 
	 }
			
	// this function will simulate a user click for an identified element
	ReservationNewUtils.simulateClick  = function ( text ) {
		  var evt = document.createEvent("MouseEvents");
		  evt.initMouseEvent("click", true, true, window,
		    0, 0, 0, 0, 0, false, false, false, false, 0, null);
//		  var a = document.getElementsByClassName( text ); 
		  text.dispatchEvent(evt);      
		}
	
	ReservationNewUtils.setDates = function(){
		 
	    var dateFormat = "yyyy-mm-dd",
//	    from = $( "#Arrival" )
	    from = $( 'input[name="Arrival"]')
	      .datepicker({
	    	  minDate    : 0,
		      defaultDate: "+1w",
		      changeMonth: true,
		      numberOfMonths: 2
	      })
	      .on( "change", function() {
	        to.datepicker( "option", "minDate", getDate( this ) );
	      }),
//	    to = $( "#Departure" )
	    to = $( 'input[name="Departure"]')
	         .datepicker({	
			      defaultDate: "+1w",
			      changeMonth: true,
			      numberOfMonths: 2
	    })
	    .on( "change", function() {
	      from.datepicker( "option", "maxDate", getDate( this ) );
	    });

	  function getDate( element ) {
	    var date;
	    try {
	      date = $.datepicker.parseDate( dateFormat, element.value );
	    } catch( error ) {
	      date = null;
	    }

	    return date;
	  }
	}
	
	ReservationNewUtils.updateReservation_cancel = function ( key ){	
		
        $(".form_inst_edit").hide();
        var prevFooterEdit  = $('#footer_edit');
		if (prevFooterEdit != undefined || prevFooterEdit != null) {
			$('#footer_edit').hide();
		}
        	
		
		$(".form_inst").css("display", "block");
		$(".form_inst").css("visibility", "visible");		
		var prevFooterView = $('#footer_view');	
		if (prevFooterView != undefined || prevFooterView != null) {
				$('#footer_view').show();
		}
		
		
		};	
	
	ReservationNewUtils.createNode_cancel = function( typeId  ) {
	    	
	    	if(!typeId){
				console.log(" no type given: cannot cancel create Instance  "); 
				return;
			}
				
			console.log("Attempting to Cancel :" + typeId );		
			
			$('#work_addInstance').empty();
			historyNode = [];
			createEdgeList = [];
			listAllNodes = [];
			elementFound = [];
	    	
	    }
	
	

	
	