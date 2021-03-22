/**
 * 
 */
function NodeFctsUtils() {
	
}

    NodeFctsUtils.createNode = function( typeId ) {
			
        console.log("Attempting to create Node of Type :" );	
		
		// hide all the others		
		$('div.reservation_detail').hide();			
		$('.work_addInstance').empty();
		
		historyNode = []; 
		var workDiv = $('#work_addInstance');
						
		NodeFctsUtils.createInstNode( typeId, workDiv, historyNode);
		var name = typeMapViaId[typeId].name;
		
		 var footer  = '<tr><td colspan="2"></td></tr><tr><td colspan="2"></td></tr>';
		 footer += 	'<tr align="center"><td colspan="2"><input type="button"  name="submit" class="btn btn-primary btn-xs"   id="addNodeInst_submit_' + typeId+ '" value="Add  '+name+'" onclick="NodeFctsUtils.saveNodeInfo('+typeId+');"/>';		
         footer += '<input type="button"   name="cancel" id="addNodeInst_cancel_' + typeId + '" value="Cancel" onclick="NodeFctsUtils.createNode_cancel(' + typeId + ');"/></td></tr>';   		    

	    $(workDiv ).append(footer);
	    NodeFctsUtils.showDivision ("work_addInstance", ''  );		
			
	}
           
    NodeFctsUtils.createInstNode = function( typeId, workDiv, listHistory) {
    	var nodeRequired = null;
    	
    	if( curThreshold < thresholdNodeCreation)  {
    		nodeRequired  =    NodeFctsUtils.verifyNodeRelations( typeId );  		
    	}
    	// remove looping  	 
    	if(!$.isEmptyObject(listHistory)||   (listHistory.length > 0)){ 
    	    if(!$.isEmptyObject( nodeRequired)  && !$.isEmptyObject( nodeRequired['parent']) ){
    	    	 for( var i=0; i <nodeRequired['parent'].length ; i++){
    	    		 for ( var j = (listHistory.length - 1); j > -1; j--){
    	    			 if( listHistory[j].currTypeId  == nodeRequired['parent'][i].source  ) { 
    	    				 nodeRequired['parent'].splice(i, 1);
    	    				 if ($.isEmptyObject( nodeRequired['parent'])  ) { break ;}
    	    			 }
    	    		 }
    	    	
    	    	}
    	    }
    	    if(!$.isEmptyObject( nodeRequired)  && !$.isEmptyObject( nodeRequired['child']) ){
    	    
    	    	 for( var i=0; i <nodeRequired['child'].length ; i++){
    	    		 for ( var j = (listHistory.length - 1); j > -1; j--){
    	    			 if( listHistory[j].currTypeId  == nodeRequired['child'][i].target  ) { 
    	    				 nodeRequired['child'].splice(i, 1);
    	    				 if ($.isEmptyObject( nodeRequired['child'])  ) { break ;}
    	    			 }
    	    		 }
    	    	
    	    	} 	 
    	    	 curThreshold += 1;
    	    }
    	    
    	}
//		if(listHistory.length > 0) {		
//			  for( var i=0; i <nodeRequired.length ; i++){
//				  if(listTypeIds[0] == nodeRequired[i].source.toString()) { nodeRequired.splice(i, 1); }  // to remove the loop to initial type
//			  }
//		}
		  NodeFctsUtils.addFormCreateNode(typeId,  workDiv, nodeRequired, listHistory );	

	}
    	
    NodeFctsUtils.verifyNodeRelations = function(  typeId ){
    
    	if(!typeId) {
	    	  console.log(" No type Id defined ");
	    	  return null;
	      }  
  
    // code to get Direct children -- Parents  -- Sibling   
  	        
		   // looking for Parents  MUST Connections 
	      var listOfConnPar = [];                           
	      var listOfConnChild = [];
	      var listOfLinkSibling = [];                      
	      
	      $.each( connMapViaId , function( key, value ) {      
	              if(value.classification == 'parentchild'){
	                      if( (typeId == value.target.toString() ) &&( value.minRel > '0')) {  
	                    	           value.nodePos = 'asParent';
	                    	           value.curThreshold = curThreshold;
	                                   listOfConnPar.push(value);
	                           }else if ( (typeId == value.source.toString() ) &&( value.minRel > '0')){
	                        	       var stayId = NodeUtils.findTypeID("STAY");
	                        	       if( stayId != value.target ) {
	                        	    	   value.nodePos = 'asChild';
		                        	       value.curThreshold = curThreshold;
		                                   listOfConnChild.push(value);
	                        	       }
	                        	       
	                           }
	              }else if (value.classification == 'link'){
	                                      if((typeId == value.target.toString() ) &&( value.minRel > '0')||(typeId == value.source.toString() ) &&( value.minRel > '0')){
	                                    	      value.nodePos = 'asSibling';
	                                    	      value.curThreshold = curThreshold;
	                                              listOfLinkSibling.push(value);
	                          }
	              }else {
	                      // error 
	              }            
	      });  
	      var listOfRelated = {};
	      listOfRelated['parent']  = listOfConnPar;
	      listOfRelated['child']   = listOfConnChild;
	      listOfRelated['sibling'] = listOfLinkSibling;
  
	      return  listOfRelated;   
	      
		 }
	
//=====================================================================================================	
	
    NodeFctsUtils.addFormCreateNode = function (typeId, workDiv, relatedRequired, listHistory ){              
	
		if(!typeId) {
	    	  console.log(" No type Id defined ");
	    	  return null;
	      }   
		var color = 'grey';
		var inputContentList = '';
		color = typeMapViaId[typeId].color;
//		    inputContentList += '<p> Complete the Following to CREATE   : <b>'+typeMapViaId[typeId].name +'</b></p>';
//		    inputContentList += '<p><span class="badge" style="color:black; background:'+color+'"> <b>'+typeMapViaId[typeId].name +'</b></p>';
		// Also in case of no Must connections/links just display the Add_Form_Inst_create
		 // add division for the node instance creation   
		    inputContentList +=  '<div id="addNodeInst_'+ typeId +'"><h3>'+typeMapViaId[typeId].name +' Details:  </h3></div>';  
		 
		var element = {};
		
		var ableToCreateParent    = false;
	    var ableToCreateChild     = false;
	    var ableToCreateSibling   = false;
	    
	    
	    inputContentList += '<div class="addRelatedNodes" >';
		
//	    inputContentList += '<table border="2" class="addMustParent" >';
	    	    
		// if we have any Must Connection/Link do the following
	    
	    if( !$.isEmptyObject( relatedRequired) ){
	    	if ( !$.isEmptyObject( relatedRequired['parent']) &&  relatedRequired['parent'].length){
	    	 
			    var line = '';
			    for( var i=0; i <relatedRequired['parent'].length ; i++){
			    	
			    	var restriction = NodeUtils.findRestriction (typeMapViaId[relatedRequired['parent'][i].source]);		    	
			    	if(restriction == 'ROOTONLY')  {	
			    			ableToCreateParent = false;
			    	}else {
			    			ableToCreateParent = true;
			    		}
			    	var color = typeMapViaId[relatedRequired['parent'][i].source].color;
			    				    			    	
			    	
//			    	line += '<tr id="rowNodeParent_'+relatedRequired['parent'][i].source+'_for_'+typeId+'" >';		    	
			    	line += '<div id="rowNodeParent_'+relatedRequired['parent'][i].source+'_for_'+typeId+'" >';		    	
			    		
//			    	line += '<td><span class="badge" style="color:black; background:'+color+'">'+relatedRequired['parent'][i].origin +'</span></td>';
			    	line += '<p><span class="badge" style="color:black; background:'+color+'">'+relatedRequired['parent'][i].origin +'</span>';			    	
			    	
//			    	line += '<td>';	
			    
			    	if( ableToCreateParent == true )	{
//			    		line += '<input type="radio" name="mustConn_'+relatedRequired['parent'][i].source+'_for_'+ typeId+'"   value="create" onclick="NodeFctsUtils.showCreateDiv('+relatedRequired['parent'][i].source+', '+typeId+' )"/>Create New </br/>';		    		
			    		line += '<input type="radio" name="mustConn_'+relatedRequired['parent'][i].source+'_for_'+ typeId+'"   value="create" onclick="NodeFctsUtils.showCreateDiv('+relatedRequired['parent'][i].source+', '+typeId+' )"/>Create New ';		    					    	
			    	}	    	
			    				    	
//			    	line += '<input id="connect_parents_in_creation" type="radio" name="mustConn_'+relatedRequired['parent'][i].source+'_for_'+ typeId+'"    value="use" onclick="NodeFctsUtils.showCreateDiv('+relatedRequired['parent'][i].source+', '+typeId+' )" />Select </td>';			    			    	
			    	line += '<input id="connect_parents_in_creation" type="radio" name="mustConn_'+relatedRequired['parent'][i].source+'_for_'+ typeId+'"    value="use" onclick="NodeFctsUtils.showCreateDiv('+relatedRequired['parent'][i].source+', '+typeId+' )" />Select </p>';			    			    	
			    	
			    	line += '</p>'
//			    	line += '<td>';
			    	
			    	if( ableToCreateParent == true )  {	
			    		line += '<div id="nodeCreate_'+relatedRequired['parent'][i].source+'_for_'+typeId+'" style="display:none;visibility:hidden"></div>';	
			    	}
			    	
			    	line += '<div id="nodeDisplay_'+relatedRequired['parent'][i].source+'_for_'+typeId+'" style="display:none;visibility:hidden"></div>';
			    	line += '<div id="nodeDisplayDetails_'+relatedRequired['parent'][i].source+'_for_'+typeId+'" style="display:none;visibility:hidden"  ></div>';
//			    	line += '</td></tr>';
                    line += '</div>';
			    	inputContentList += line;
			    	line = '';
			    	
			    	element.currTypeId       = typeId;
			    	element.currNodeUuid     = null;
			    	element.typeIdcas        = relatedRequired['parent'][i].nodePos;         
			    	element.sTypeId          = relatedRequired['parent'][i].source;
			    	element.typeConn         = relatedRequired['parent'][i].id;
			    	element.nodeUuid         = null;
			    	element.curThreshold     = relatedRequired['parent'][i].curThreshold; 
			    	element.status           = 'pending';
			    	listHistory.push(element);
			    	element = {};   
			    	
			    } 
			     
	    }
	    
	    	if ( !$.isEmptyObject( relatedRequired['child']) &&  relatedRequired['child'].length){	
	
			    var line = '';
			    for( var i=0; i <relatedRequired['child'].length ; i++){
			    	var restriction = NodeUtils.findRestriction (typeMapViaId[relatedRequired['child'][i].destination]);
			    	
			    	if (restriction == 'ROOTONLY') {
			    		ableToCreateChild = false;
			    	} else {
			    		ableToCreateChild = true;
			    	}
			    	var color = typeMapViaId[relatedRequired['child'][i].target].color;			    				    	
			    	
//			    	line += '<tr id="rowNodeParent_'+relatedRequired['child'][i].target+'_for_'+typeId+'" >';
			    	line += '<div id="rowNodeParent_'+relatedRequired['child'][i].target+'_for_'+typeId+'" >';
			    	
//			    	line += '<td><span class="badge" style="color:black; background:'+color+'">'+relatedRequired['child'][i].destination +'</span></td>';
			    	line += '<p><span class="badge" style="color:black; background:'+color+'">'+relatedRequired['child'][i].destination +'</span>';
			    		    	
//			    	line += '<td>';
			    	if (ableToCreateChild == true) {
//				    	line += '<input type="radio" name="mustConn_'+relatedRequired['child'][i].target+'_for_'+ typeId+'"   value="create" onclick="NodeFctsUtils.showCreateDiv('+relatedRequired['child'][i].target+', '+typeId+' )"/>Create New </br/>';				    		
				    	line += '<input type="radio" name="mustConn_'+relatedRequired['child'][i].target+'_for_'+ typeId+'"   value="create" onclick="NodeFctsUtils.showCreateDiv('+relatedRequired['child'][i].target+', '+typeId+' )"/>Create New ';				    		
				    	
			    	}
//			    	line += '<input id="connect_children_in_creation" type="radio" name="mustConn_'+relatedRequired['child'][i].target+'_for_'+ typeId+'"    value="use" onclick="NodeFctsUtils.showCreateDiv('+relatedRequired['child'][i].target+', '+typeId+' )" />Select </td>';
			    	line += '<input id="connect_children_in_creation" type="radio" name="mustConn_'+relatedRequired['child'][i].target+'_for_'+ typeId+'"    value="use" onclick="NodeFctsUtils.showCreateDiv('+relatedRequired['child'][i].target+', '+typeId+' )" />Select </p>';
			    	
			    	line += '</p>'
//			    	line += '<td>';
			    	if (ableToCreateChild == true) {
			    		line += '<div id="nodeCreate_'+relatedRequired['child'][i].target+'_for_'+typeId+'" style="display:none;visibility:hidden"></div>';
			    	}	
			    	line += '<div id="nodeDisplay_'+relatedRequired['child'][i].target+'_for_'+typeId+'" style="display:none;visibility:hidden" ></div>';
			    	line += '<div id="nodeDisplayDetails_'+relatedRequired['child'][i].target+'_for_'+typeId+'" style="display:none;visibility:hidden" ></div>';
//			    	line += '</td></tr>';
                    line += '</div>'; 
			    	
			    	inputContentList += line;
			    	line = '';
			    	// saving these info for the saving process;
			    		    		    	
			    	element.currTypeId       = typeId;
			    	element.currNodeUuid     = null;
			    	element.typeIdcas        = relatedRequired['child'][i].nodePos;          // element.typeIdcas        = 'asChild';            // 
			    	element.sTypeId          = relatedRequired['child'][i].target;
			    	element.typeConn         = relatedRequired['child'][i].id;
			    	element.nodeUuid         = null;
			    	element.curThreshold     = relatedRequired['child'][i].curThreshold; 
			    	element.status           = 'pending';
			    	listHistory.push(element);
			    	element = {};    	
			    } 
			    
		   }
	    }
	            	    
	    inputContentList += '</table>';	
	   	

	    
//		   if(requiredNodes.length){	   
//		   
//		    inputContentList += '<table border="2" class="addMustParent" >';
//		    var line = '';
//		    for( var i=0; i <requiredNodes.length ; i++){
//		    	line += '<tr id="rowNodeParent_'+requiredNodes[i].target+'_for_'+typeId+'" >';
//		    	var color = typeMapViaId[requiredNodes[i].target].color;
//		    	line += '<td> <span class="badge" style="color:black; background:'+color+'">'+requiredNodes[i].destination +'</span></td>';
//		    	
//		    	var restriction = NodeUtils.findRestriction (typeMapViaId[requiredNodes[i].target]);
//		    	
//		    	if(restriction != 'ROOTONLY')  {	
//		    		
//		    		line += '<td><input type="radio" name="mustConn_'+requiredNodes[i].target+'_for_'+ typeId+'"   value="create" onclick="NodeFctsUtils.showCreateDiv('+requiredNodes[i].target+', '+typeId+' )"/>Create New </br/>';
//		    	}else {
//		    		line += '<td>';
//		    	}		    	
//		    	
//		    	line += '<input type="radio" name="mustConn_'+requiredNodes[i].target+'_for_'+ typeId+'"    value="use" onclick="NodeFctsUtils.showCreateDiv('+requiredNodes[i].target+', '+typeId+' )" />Select : </td>';
//		    	
//		    	if(restriction != 'ROOTONLY')  {	
//		    		line += '<td><div id="nodeCreate_'+requiredNodes[i].target+'_for_'+typeId+'" style="display:none;visibility:hidden"></div>';	
//		    	}else {
//		    		line += '<td>'
//		    	}
//		    	line += '<div id="nodeDisplay_'+requiredNodes[i].target+'_for_'+typeId+'" style="display:none;visibility:hidden"></div></td></tr>';
//
//		    	inputContentList += line;
//		    	line = '';
//		    	
//		    	element.currTypeId       = typeId;
//		    	element.currNodeUuid     = null;
//		    	element.typeIdcas        = requiredNodes[i].nodePos;          // element.typeIdcas        = 'asChild';            // 
//		    	element.sTypeId          = requiredNodes[i].target;
//		    	element.typeConn         = requiredNodes[i].id;
//		    	element.nodeUuid         = null;
//		    	element.status           = 'pending';
//		    	listHistory.push(element);
//		    	element = {};    	
//		    } 
//		    inputContentList += '</table>';	
//		   }	  
				 
		 workDiv.append(inputContentList);
		 
		 NodeFctsUtils.addNodeDetails( $("#addNodeInst_"+typeId), typeId);	 
		 
	}
    
    NodeFctsUtils.addNodeDetails = function( appendToDiv, typeId ){
    	
    	if(!typeId ){
    		console.log(" no Type Id provided: cannot build create Instance table  "); 
    		return;
    	}
    	var tmpType = typeMapViaId[typeId];
    	// populate the Add INSTANCE FORM with properties	              
    	var propcolor = '';			                           // RED color used to highlight Mandatory property
    				
    	// build the form
    	var inputContent = '';
    	    inputContent += '<table id="create_' + typeMapViaId[typeId].name + '_instance_table_id" border="2">';

       	if(!$.isEmptyObject( tmpType.typeProperties	)){
    		$.each( tmpType.typeProperties, function( propId, tmpProp ) {
    									
    			if(tmpProp.isMandatory){ propcolor='color:red'  } else {propcolor='color:black' };		
    			if( tmpProp.propertyType == "DATE" ) {
    				inputContent += '<tr id="typeProps"><td  style='+propcolor+' class="input-group date" >'+ tmpProp.name + ':</td><td>' + '<input type="date"  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" value="' + today + '" / >(DATE) </td></tr>' ;
    			}else if( tmpProp.propertyType == "BOOLEAN" ) {
    				inputContent += '<tr id="typeProps"><td  style='+propcolor+' class="input-group input-append date " >'+ tmpProp.name + ':</td>';
    				inputContent += '<td><input type="radio" name="'+tmpProp.name+ '" id="form_inst_add_val_' + tmpProp.id + '"  value ="true" checked="checked"/>True'
    				inputContent += ' <input type="radio"    name="'+tmpProp.name+ '" id="form_inst_add_val_' + tmpProp.id + '"  value="false"/>False</td></tr>' ;
    			
    			}else {
    					
    					inputContent += '<tr id="typeProps" ><td  style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" value="" ' ;	
    					if( tmpProp.propertyType == "STRING" ) {
    						inputContent += ' type="text"/ >(TEXT)</td> </tr>' ;
    					} else if( tmpProp.propertyType == "INTEGER" ) {
    						inputContent += 'type="text"/ >(NUMBER) </td></tr>' ;
    					} else if( tmpProp.propertyType == "DOUBLE" ) {
    						inputContent += 'type="text"/ >(DOUBLE) </td></tr>' ;
    					} else {
    						inputContent += 'type="text"/ >(UNKNOWN TYPE) </td></tr>' ;		
    					}			
    			}	
    		});
        }else {    
        	inputContent += "<tr><td colspan='2'> No Properties defined for this Type </td></tr>"   
        };
    	
        inputContent = inputContent + "</table><br />";    
    	appendToDiv.append(inputContent);			
    }
    
    
    
    
    
    
//=====================================================================================================================================================	   
    
    NodeFctsUtils.showCreateDiv = function (parent, typeId ){
    	if(!typeId || !parent ){
    		console.log(" no Type Id or parent typeId provided: cannot show or hide divisions "); 
    		return;
    	};
    	
    	
    	var valueSelected = $('input[name="mustConn_'+parent+'_for_'+ typeId+'"]:checked').val();
    	if(!valueSelected){
    		console.log(" No value selected  "+ valueSelected);	
    		return;
    	}
    	 $('input[name="mustConn_'+parent+'_for_'+typeId+'"]').parent('td').css("backgroundColor", "");
    	 
    	if(valueSelected == 'create' ){
    		
    		// Display the Type properties to create a node
    		$("#nodeCreate_"+parent+"_for_"+typeId ).empty();
    		NodeFctsUtils.createInstNode(parent,   $("#nodeCreate_"+parent+"_for_"+typeId ), historyNode);
    		
    		//  -- hide the select option 
    		NodeFctsUtils.hideDivision('nodeDisplay_'+parent+'_for_', typeId);
    		NodeFctsUtils.hideDivision('nodeDisplayDetails_'+parent+'_for_', typeId);
    		// --  show the create option
    		NodeFctsUtils.showDivision('nodeCreate_'+parent+'_for_', typeId);
    		
    	}else if (valueSelected == 'use'){
    	
    		// build the list of nodes 
    		$("#nodeDisplay_"+parent+"_for_"+typeId).empty();;
    		NodeFctsUtils.generateNodesSearchForm($("#nodeDisplay_"+parent+"_for_"+typeId), parent, typeId);
//    		HotelUtils.buildListNodes($("#nodeDisplay_"+parent+"_for_"+typeId), typeId, parent );
    		
    		// hide the create  option 
    		NodeFctsUtils.hideDivision('nodeCreate_'+parent+'_for_', typeId);
    		// show the list to select from 
    		NodeFctsUtils.showDivision('nodeDisplay_'+parent+'_for_', typeId);	
    	}
    	       					    
    }
    
//    NodeFctsUtils.generateNodesSearchForm = function( workspace, typeId , currType) {
   	 NodeFctsUtils.generateNodesSearchForm = function( workspace, typeId ) {
    	if(!typeId ){
    		console.log(" no Type Id provided: cannot build search Instance table  "); 
    		return;
    	}
    	var tmpType = typeMapViaId[typeId];  
    	
    	var previousSearch = $('#search_' + typeId + '_instance_table_id');
    	if (previousSearch) {
    		previousSearch.remove();
    	}
    	
    	
    	// build the form
    	var inputContent = '';
    	    inputContent += '<table id="search_' + typeId + '_instance_table_id" border="2">';

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
    	
        inputContent += '<tr><td colspan="2"><input type="button" name="submit" class="btn btn-primary btn-xs" id="search_node_submit_' + typeId + '" value="Search" onclick="NodeFctsUtils.searchNodes(\'' + workspace.attr('id') + '\', \'search_' + typeId + '_instance_table_id\', '  + typeId + ');"/></td></tr></table>';    
                                                                                                   
    	workspace.append(inputContent);

    };
         
    NodeFctsUtils.searchNodes = function ( outterWorkspaceId, innerWorkspaceId, typeId){
    	NodeUtils.searchNodesByProperties(outterWorkspaceId, innerWorkspaceId, typeId );
    	var currType = outterWorkspaceId.split("_for_")[1]
    	$('#node_list_'+typeId).attr('onclick', 'NodeFctsUtils.viewNode('+typeId +','+currType+')');
    }
    
    NodeFctsUtils.viewNode = function ( typeId, currType){
    	console.log("Inside the select View Node  for type "+typeId);
    	   	
    	var ele          = document.getElementById('node_list_'+typeId);
		var nodeUuid     = ele.options[ele.selectedIndex].value;
    	 
		var value = nodeMap[nodeUuid];
		var div = $('#DetailsNodeDisplay_'+typeId+'_for_'+currType);
		div.empty();
		 NodeFctsUtils.displayInfoNodeSelected(typeId, nodeUuid, value, div );
		 NodeFctsUtils.showDivision('DetailsNodeDisplay_'+typeId+'_for_'+currType, '');	
		 	
    }
       
//=======================================================================================================================    
    NodeFctsUtils.saveNodeInfo = function( typeId  ) {
    	
    	console.log(" Inside the saving process ");
		if(!typeId ){
			console.error(" Missing Type Id for creation of Node instance ");
	        return;
			}	
		// loop through all available options 		
		NodeFctsUtils.loopStackForSaving();

//		//==== SAVE NODE INSTANCE CREATED FOR THE CURRENT TYPE  		
		// this should create the node for the current Type 
		console.log("%c Creation of simple Node instance ", "color:blue");
		
		 var properties=[];		
		console.log("%c Attempting to add a new Node for this type :" + typeId, "color:blue" );		
		
		
		properties = NodeUtils.retrieveNodePropertiesFromForm ( typeId , 'form_inst_add_val_');
		if(properties[properties.length-1]){
			for( var ind = 0; ind < listErrorsFromRetrieval.length  ; ind++){
				document.getElementById(listErrorsFromRetrieval[ind] ).style.backgroundColor = "yellow"; 
			}
			listErrorsFromRetrieval =[];
			console.log(" do not continue");
			return;
		}
		properties.pop();   // everything is fine remove boolean
		NodeFctsUtils.SaveNodeCreated (typeId, properties );  
		
		var reservationUuid = listInstUuids[0];
		
//		NodeFctsUtils.createStayNodeAndEdge(typeId, properties, reservationUuid  );
							
		
//       increase the number next to TYPE
		NodeFctsUtils.setTotalNBType ( typeId );
					
		// UPDATE ALL Elements in LIst to CREATE EDGES IF ANY with new node Uuid	
		createEdgeList.forEach(function ( element) {
			if( element.currTypeId ==  typeId ){
				 if(!reservationUuid){   element.status = 'error' }
				 else {
					 element.currNodeUuid = reservationUuid;
				 }
			}
		})
	
		// create all edges 
		 console.table(createEdgeList);
		
		NodeFctsUtils.createEdges();
						
		 // Clear the Form for creation
		$('#work_addInstance').empty();		
		
		curThreshold = 0;
		historyNode =[];
		createEdgeList = [];
			
		if(reservationUuid != null) {( new ReservationManagerRender() ).addReservationInst (reservationUuid);	}	
		( new ReservationManagerRender() ).selectedNode( reservationUuid );	
			
    	 	
    }
     
    NodeFctsUtils.createNode_cancel = function( typeId  ) {
    	
    	if(!typeId){
			console.log(" no type given: cannot cancel create Instance  "); 
			return;
		}
			
		console.log("Attempting to Cancel :" + typeId );		
		
		$('#work_addInstance').empty();
		historyNode = [];
		createEdgeList = [];
		listAllNodes = [];
		typeListFound = [];
    	
    }
//=======================================================================================================================   
    NodeFctsUtils.loopStackForSaving = function (){
		createEdgeList = []; 
		var last = null;
		var len = historyNode.length;
		
		for(var i = len -1 ; i>= 0 ; i--)	{
			
			 last = jQuery.extend({}, historyNode[i]);			 
			 console.log("top element is :" + last);

		     // get the selected option :  Create or Select
			 
			 var option = $('input[name="mustConn_'+last.sTypeId+'_for_'+last.currTypeId+'"]:checked').val();				
			 console.log(" Type connection is : "+ option);
			 if( option == 'create' ) {
				 
				     // create Parent 			 
				 NodeFctsUtils.retrievePropertiesSaveNode (  last.sTypeId );

				if(!listInstUuids[0]){
					console.log("failure in creating  node ");
					return;
				}
				
				createEdgeList.forEach(function ( element) {
					if( element.currTypeId == last.sTypeId ){	
							 element.currNodeUuid = listInstUuids[0];	
					}
				})
				
				historyNode.forEach(function(element){
					if(element.sTypeId == last.sTypeId) { element.nodeUuid =  listInstUuids[0]; }
				})
				
				last.nodeUuid =  listInstUuids[0];
				last.status   = 'pending';
				createEdgeList.push(last);                    // save this for later			
	 
			 }else if( option == 'use' ) {
				    // get the node uuid selected
//				    var ele          = document.getElementById('nodeInstParent_'+last.sTypeId);
				    var ele          = document.getElementById('node_list_'+last.sTypeId);
					var nodeUuid     = ele.options[ele.selectedIndex].value;
					if(!nodeUuid){
						console.log(" Missing Node UUid for the selected node ");
//						$('#nodeInstParent_'+last.sTypeId).css("backgroundColor", "yellow");
						$('#node_list_'+last.sTypeId).css("backgroundColor", "yellow");
						console.error("Cannot create a link between the node instance and its "+ last.typeIdcas +' for Type Id '+last.sTypeId);					
						return;
					}else {

						last.nodeUuid = nodeUuid;
						last.status   = 'pending';
						createEdgeList.push(last);                    // save this for later
					}
			
			 }else {
				 // error 
				 $('input[name="mustConn_'+last.sTypeId+'_for_'+last.currTypeId+'"]').parent('td').css("backgroundColor", "yellow");
				 console.error(" process of creation stopped with error highlighted");
				 return;
			 }
			 last = {};
		};
	}
    
    NodeFctsUtils.retrievePropertiesSaveNode = function( typeId  ) {
        
	    var properties=[];		
		console.log("%c Attempting to add a new Node for this type :" + typeId, "color:blue" );		
			
		properties = NodeUtils.retrieveNodePropertiesFromForm ( typeId , 'form_inst_add_val_');
		if(properties[properties.length-1]){
			for( var ind = 0; ind < listErrorsFromRetrieval.length  ; ind++){
				document.getElementById(listErrorsFromRetrieval[ind] ).style.backgroundColor = "yellow"; 
			}
			listErrorsFromRetrieval =[];
			console.log(" do not continue");
			return;
		}
		properties.pop();   // everything is fine remove boolean

		NodeFctsUtils.SaveNodeCreated (typeId, properties );   
    
    }
    
    NodeFctsUtils.SaveNodeCreated = function( typeId ,  properties) {
	    var data = new NodeJsonObject();
		// set the minimum
		data.init(selectedMetaData.toString(), typeId.toString(), properties);
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
      
    NodeFctsUtils.createStayNodeAndEdge   = function (typeId, properties, reservationUuid  ){
//    	// creating a stay node and its edge
//    	// added these fields for stay as required by Shoabo
//    	
//    	properties = [];
//    	
//    	
//    	var stayId = NodeUtils.findTypeID("STAY");
//    	NodeFctsUtils.SaveNodeCreated (stayId, properties );
//    	
//    	var jsonData = {};
//    	var typeConn = GlobalUtils.getRuleId(typeId, stayId);
//    	if(!typeConn ){
//    		console.log("No defined relationship between theese two types "+typeID + "  and  "+ stayId + " Cannot create edge ");
//    		return;
//    	}
//    	jsonData = NodeUtils.createEdgeJson(typeId , reservationUuid,  stayId,  listInstUuids[0],   typeConn  );	
//    	
//    	var apiEdge  = new EdgeApis();
//		
//		var doneFunction = function ( dataEdge ){
//			if(!$.isEmptyObject(dataEdge)){
//				console.log("Edge created ");
//				// add edge to edgeMap
//				NodeUtils.AddEdgeToMap( dataEdge);	
//				listInstUuids[0] = reservationUuid;
//				
//		
//			}else {
//				// error
//				console.error("creation of edge failed "); 
//			}
//			
//		}
//		
//		var failFunction = function (  xhr, status, error ){
//			console.error('Error Edge not created: ' + xhr.status);
//			$('#console-log').append("<p style='color:red'>Error Edge not created:"+ xhr.status+"</p>");	
//		}
//				
//		apiEdge.saveEdge( jsonData,  doneFunction, failFunction );		
//    	
//    	
    	
    }
    
    NodeFctsUtils.createEdges = function( ){
		// LOOP Through the list to Create All required edges if ANY
		var  jsonData = {};
		createEdgeList.forEach(function ( element) {
			
			if(element.status == 'pending'){                                // avoid all error records if any
				jsonData = {};
				if( element.typeIdcas == 'asParent' || element.typeIdcas == 'asSibling'){	
					
					  jsonData = NodeUtils.createEdgeJson(element.sTypeId, element.nodeUuid,  element.currTypeId,  element.currNodeUuid,   element.typeConn  );				

			    }else {
			    	
			    	 jsonData = NodeUtils.createEdgeJson(  element.currTypeId, element.currNodeUuid, element.sTypeId, element.nodeUuid, element.typeConn  );			    	
			    	
			    }
				
				var apiEdge  = new EdgeApis();
				
				var doneFunction = function ( dataEdge ){
					if(!$.isEmptyObject(dataEdge)){
						console.log("Edge created ");
						// add edge to edgeMap
						NodeUtils.AddEdgeToMap( dataEdge);	
							
						 if(element.typeIdcas == 'asParent' ){						 						 
							   NodeUtils.buildParentNodeDetail ( element.currNodeUuid, dataEdge);				   
                               //  remove update Parents
						 }else if ( element.typeIdcas == 'asChild'){
							 NodeUtils.buildChildNodeDetail (  element.currNodeUuid, dataEdge);
							 // remove update Children
						 }else if ( element.typeIdcas == 'asSibling'){
							 NodeUtils.buildSiblingNodeDetail ( element.currNodeUuid, dataEdge, 'destination');
                            // remove update Sibling
						 }
						 element.status = 'Completed';
				
					}else {
						// error
						console.error("creation of edge failed "); 
					}
					
				}
				
				var failFunction = function (  xhr, status, error ){
					console.error('Error Edge not created: ' + xhr.status);
					$('#console-log').append("<p style='color:red'>Error Edge not created:"+ xhr.status+"</p>");	
				}
						
				apiEdge.saveEdge( jsonData,  doneFunction, failFunction );			
			}		
		});
		
		createEdgeList.forEach(function ( element) {
			if (element.status != 'Completed'){
				NodeFctsUtils.errorDisplay("Could not create Edge for   "+ element.currTypeId  + " and "+ element.sTypeId);
			}
		});
		
		
	}
      
    NodeFctsUtils.displayInfoNodeSelected = function (typeId,  key , value, where ){
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
				tableViewInstProps = tableViewInstProps + inputpropViewRow + "</table>";
		}
			
		where.append(tableViewInstProps);		
    }
                
    NodeFctsUtils.showDivision = function( divName , divId  ) {
    	var instDiv = document.getElementById(divName + divId );
		if( instDiv != null ) {
			instDiv.style.display = "block";
			instDiv.style.visibility = "visible";
		} else {
			// nothing to show?
			console.log(" no division to show ");
		}	
    }
       
    NodeFctsUtils.setTotalNBType = function ( typeId ){
		
		var nbSpan = document.getElementById("nb_"+typeId);		
		var nb     = typeMapViaId[typeId].nb;		
		nbSpan.innerHTML = nb;	
	}
    
    NodeFctsUtils.errorDisplay = function  (errorMessage ){
		if(errorMessage) {
			$('#console-log').append(errorMessage);
			console.log('%c'+errorMessage, 'background: #F90; color: red');
		}
    }
    NodeFctsUtils.hideDivision = function ( divName, divId ){
		
		var instDiv = document.getElementById(divName + divId );
		if( instDiv != null ) {
			instDiv.style.display = "none";
			instDiv.style.visibility = "hidden";
		} else {
			// nothing to hide?
			console.log(" no division to hide ");
		}		
	 }	
    // Not used YET  ---   will only work based on assumption that Fields will be called Arrival ans Departure.
    NodeFctsUtils.setDates = function(){
		 
	    var dateFormat = "mm/dd/yy",
	    from = $( "#Arrival" )
	      .datepicker({
	    	  minDate    : 0,
		      defaultDate: "+1w",
		      changeMonth: true,
		      numberOfMonths: 2
	      })
	      .on( "change", function() {
	        to.datepicker( "option", "minDate", getDate( this ) );
	      }),
	    to = $( "#Departure" ).datepicker({
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

    NodeFctsUtils.setTypePrefrences = function (){
    	$.each(typeMapViaId, function(key, value) {
    		GlobalUtils.setPreferencesforType(value);
    		value.color = currentColor;
    		value.size = currentSize;
    		value.labelPosition = currentLabelPosition;
    		value.labelSize = currentLabelSize;
    	});
    }
    
    
    