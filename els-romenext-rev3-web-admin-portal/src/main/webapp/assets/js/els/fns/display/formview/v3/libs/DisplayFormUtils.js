function DisplayFormUtils() {
	
};

//    Code to create HTML Element with no content 
DisplayFormUtils.createHTMLEntity = function( elementType, elementId, className, visibility, display, innerHtml,  appendToDiv ) {
	
	var newElement = document.createElement( elementType );
	newElement.id = elementId;
	newElement.className = className;
	newElement.style.visibility = visibility;
	newElement.style.display = display;
	newElement.innerHTML = innerHtml;
	
	appendToDiv.append(newElement);
	
	return newElement;
}


DisplayFormUtils.addRightDivsForAType = function( instHolderDiv , key ) {	
	/**
	 * THIS IS FOR THE INFO OF THE INSTANCE
	 */
	var checkInstanceDiv = $( "#form_inst_" + key );	
	if( checkInstanceDiv == null || checkInstanceDiv.length == 0 ) {	
		DisplayFormUtils.createHTMLEntity('div', 'form_inst_'  + key, 'form_inst', 'hidden', 'none', '',  instHolderDiv);		
		checkInstanceDiv = $( "#form_inst_" + key );
	}	
	/**
	 * THIS IS FOR THE EDITING OF  INSTANCE PROPERTIES
	 */
	var checkInstanceEditDiv = $( "#form_inst_edit_" + key );	
	if( checkInstanceEditDiv == null || checkInstanceEditDiv.length == 0 ) {		
		DisplayFormUtils.createHTMLEntity('div', 'form_inst_edit_'  + key, 'form_inst_edit', 'hidden', 'none', '', instHolderDiv);		
		checkInstanceEditDiv = $( "#form_inst_edit_" + key );
	}		
	/**
	 * THIS IS FOR THE CHILDREN OF THE INSTANCE
	 */
	var checkInstanceChildDiv = $( "#form_inst_children_" + key );
	if( checkInstanceChildDiv == null || checkInstanceChildDiv.length == 0 ) {	
		DisplayFormUtils.createHTMLEntity('div', 'form_inst_children_'  + key, 'form_inst_children', 'hidden', 'none', '', instHolderDiv);	
		checkInstanceChildDiv = $( "#form_inst_children_" + key );
	}	
	/**
	 * THIS IS FOR THE PARENT OF THE INSTANCE
	 */
	
	var checkInstanceParDiv = $( "#form_inst_parent_" + key );	
	if( checkInstanceParDiv == null || checkInstanceParDiv.length == 0 ) {		
		DisplayFormUtils.createHTMLEntity('div', 'form_inst_parent_'  + key, 'form_inst_parent', 'hidden', 'none', '',  instHolderDiv);
		checkInstanceParDiv = $( "#form_inst_parent_" + key );
	}	
	/**
	 * THIS IS FOR THE SIBLING OF THE INSTANCE
	 */	
	var checkInstanceSibDiv = $( "#form_inst_sibling_" + key );	
	if( checkInstanceSibDiv == null || checkInstanceSibDiv.length == 0 ) {		
		DisplayFormUtils.createHTMLEntity('div', 'form_inst_sibling_'  + key, 'form_inst_sibling', 'hidden', 'none', '',  instHolderDiv);
		checkInstanceSibDiv = $( "#form_inst_sibling_" + key );
	}
	/**
	 * THIS IS FOR LINKING TO ANOTHER EXISTING INSTANCE
	 */	
	var checkInstanceLinktoDiv = $( "#form_inst_linkto_" + key );	
	if( checkInstanceLinktoDiv == null || checkInstanceLinktoDiv.length == 0 ) {
		// no div found, create it
		DisplayFormUtils.createHTMLEntity('div', 'form_inst_linkto_'  + key, 'form_inst_linkto', 'hidden', 'none', '', instHolderDiv);			
		checkInstanceLinktoDiv = $( "#form_inst_linkto_" + key );
	}	
	/**
	 * THIS IS FOR CONNECTING  TO ANOTHER EXISTING INSTANCE
	 */	
	var checkInstanceConnecttoDiv = $( "#form_inst_connectto_" + key );	
	if( checkInstanceConnecttoDiv == null || checkInstanceConnecttoDiv.length == 0 ) {		
		DisplayFormUtils.createHTMLEntity('div', 'form_inst_connectto_'  + key, 'form_inst_connectto', 'hidden', 'none', '',  instHolderDiv);
		checkInstanceConnecttoDiv = $( "#form_inst_connectto_" + key );
	}		
}

//    ADD sub-Division for a Type to Hold the ADD INSTANCE FORM  && List of Instances
DisplayFormUtils.addFormDivsLeft = function( body, instHolderDivName , typeId ) {
	/**
	 * THIS IS FOR LEFT BODY SECTION
	 */
	
	var instHolderDiv = $( "#" + instHolderDivName );		
	if( instHolderDiv == null || instHolderDiv.length == 0 ) {		
		DisplayFormUtils.createHTMLEntity('div', 'form_deco_left_body_sub_div_'  + typeId, 'form_deco_left_body_sub_div', 'hidden', 'none', '', body);	
		instHolderDiv = $( "#" + instHolderDivName );
	} 
	
	/**
	 * THIS IS FOR ADDING NEW INSTANCE FOR A TYPE 
	 */
//	var checkInstanceAddDiv = $( "#form_inst_add_" + typeId );	
//	if( checkInstanceAddDiv == null || checkInstanceAddDiv.length == 0 ) {		
//		DisplayFormUtils.createHTMLEntity('div', 'form_inst_add_'  + typeId, 'form_inst_add', 'hidden', 'none', '',  instHolderDiv);
////		// no div found, create it
////		var newInstAddDiv = document.createElement('div');
////		newInstAddDiv.id = 'form_inst_add_'  + typeId;
////		newInstAddDiv.className = 'form_inst_add';
////		newInstAddDiv.style.visibility = "hidden";
////		newInstAddDiv.style.display = "none";
////	
////		instHolderDiv.append( newInstAddDiv );
//		
//		checkInstanceAddDiv = $( "#form_inst_add_" + typeId );
//	}
	
	/**
	 * THIS IS FOR THE LISTING ALL INSTANCES OF A TYPE
	 */
	var checkInstanceAddDiv = $( "#form_inst_list_" + typeId );		
	if( checkInstanceAddDiv == null || checkInstanceAddDiv.length == 0 ) {		
		DisplayFormUtils.createHTMLEntity('table', 'form_inst_list_'  + typeId, 'form_inst_list', 'hidden', 'none', '', instHolderDiv);		
		checkInstanceAddDiv = $( "#form_inst_list_" + typeId );
	}
		
}


DisplayFormUtils.addFormDivsRight = function( body, instHolderDivName , typeId ) {
	/**
	 * THIS IS FOR THE RIGHT BODY SECTION
	 */
    var instHolderDiv = $( "#" + instHolderDivName );		
	if( instHolderDiv == null || instHolderDiv.length == 0 ) {		
		DisplayFormUtils.createHTMLEntity('div', 'form_deco_right_body_sub_div_'  + typeId, 'form_deco_right_body_sub_div', 'hidden', 'none', '', body);					
		instHolderDiv = $( "#" + instHolderDivName );
	} 
	/**
	 * THIS IS FOR THE PROCESS OF CREATING NEW INSTANCE WITH VERIFICATION OF MUST CONNECTIONS
	 */
	  var checkInstanceAddDiv = $( "#work_addInstance" + typeId );		
		if( checkInstanceAddDiv == null || checkInstanceAddDiv.length == 0 ) {		
			DisplayFormUtils.createHTMLEntity('div', 'work_addInstance_'  + typeId, 'work_addInstance', 'hidden', 'none', '', instHolderDiv);			
			checkInstanceAddDiv = $( "#work_addInstance" + typeId );
		}	
}
//=====================================================================================================================================

DisplayFormUtils.setDefault_ChildrenDiv = function ( key   ){
	if(!key){
		console.log(" no node Uuid provided: cannot build the create children table  "); 
		return;
	}

	var checkInstanceChildDiv = $( "#form_inst_children_" + key );
	    var text = '';
	    text += "<br/><table id='nodeFormChildTable_" + key + "' border=1><tr><th>Children</th>";
	    text += "<td colspan='2' class='create_icon' onclick='( new DisplayFormRenderer() ).addChildNodeForm(\"" + key + "\")'>";
	    text += "<img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td></tr></table>";
	checkInstanceChildDiv.append(text);

}

DisplayFormUtils.setDefault_ParentDiv = function ( key   ){
	if(!key){
		console.log(" no node Uuid provided: cannot build the create Parent table  "); 
		return;
	}

	var checkInstanceParDiv = $( "#form_inst_parent_" + key );
	    var text = '';
	    text += "<br /><table id='nodeFormParTable_" + key + "' border=1><tr><th>Parent</th>";
	    text += "<td colspan='2' class='create_icon' onclick='( new DisplayFormRenderer() ).addParNodeForm(\"" + key + "\")'>";
	    text += "<img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td></td></tr></table>";
    checkInstanceParDiv.append(text);

}

DisplayFormUtils.setDefault_SiblingDiv = function ( key   ){
	if(!key){
		console.log(" no node Uuid provided: cannot build the create Sibling table  "); 
		return;
	}

	var checkInstanceSibDiv = $( "#form_inst_sibling_" + key );
	    var text = '';
	    text += "<br /><table id='nodeFormSibTable_" + key + "' border=1><tr><th>Sibling</th>";
	    text += "<td colspan='2' class='create_icon' onclick='( new DisplayFormRenderer() ).addSibNodeForm(\"" + key + "\")'>";
	    text += "<img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td></td></tr></table><br />";
    checkInstanceSibDiv.append(text);

}

DisplayFormUtils.setDefault_LinktoDiv = function ( key   ){
	if(!key){
		console.log(" no node Uuid provided: cannot build the Link To table  "); 
		return;
	}

	var checkInstanceLinktoDiv = $( "#form_inst_linkto_" + key );
	    var text = '';
	    text += "<br /><table id='nodeFormLinktoTable_" + key + "' border=1></table>";
	    checkInstanceLinktoDiv.append(text);

}

DisplayFormUtils.setDefault_ConnectToDiv = function ( key   ){
	if(!key){
		console.log(" no node Uuid provided: cannot build the Connect to table  "); 
		return;
	}

	var checkInstanceConnecttoDiv = $( "#form_inst_connectto_" + key );
	    var text = '';
	    text += "<br /><table id='nodeFormConnecttoTable_" + key + "' border=1></table>";
	    checkInstanceConnecttoDiv.append(text);

}


DisplayFormUtils.showCreateDiv = function (parent, typeId){
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
		$("#createParent_"+parent+"_for_"+typeId ).empty();

		NodeUtils.addFormInstCreate($("#createParent_"+parent+"_for_"+typeId ), parent);

		//  -- hide the select option 
		DisplayFormUtils.hideDivision('nodeDisplay_'+parent+'_for_', typeId);
		// --  show the create option
		DisplayFormUtils.showDivision('createParent_'+parent+'_for_', typeId);
		
	}else if (valueSelected == 'use'){
	
		// build the list of nodes 
		$("#nodeDisplay_"+parent+"_for_"+typeId).empty();;
		DisplayFormUtils.buildListNodes($("#nodeDisplay_"+parent+"_for_"+typeId), typeId, parent );
		
		// hide the create  option 
		DisplayFormUtils.hideDivision('createParent_'+parent+'_for_', typeId);
		// show the list to select from 
		DisplayFormUtils.showDivision('nodeDisplay_'+parent+'_for_', typeId);	
	}
	       					    
}

DisplayFormUtils.addFormForMustCreateNode = function (workDiv,  typeId, parent ){               // based on node and existing connections/links display list of possible parent
	
	if(!typeId ){
		console.log(" no Type Id provided: cannot build create Instance table  "); 
		return;
	};
	// get the right subdivision for this type

	var element = {};
  	
	var inputContentList = '';
	
	// if we have any Must Connection/Link do the following
	   if(parent.length){	   
	    inputContentList += '<p> Complete the Following to CREATE Node Instance for: <b>'+typeMapViaId[typeId].name +'</b></p>';
	    inputContentList += '<table border="2" class="addMustParent" >';
	    var line = '';
	    for( var i=0; i <parent.length ; i++){
	    	line += '<tr id="rowNodeParent_'+parent[i].source+'_for_'+typeId+'" >';
	    	var color = typeMapViaId[parent[i].source].color;
	    	line += '<td>Parent is: <span class="badge" style="color:black; background:'+color+'">'+parent[i].origin +'</span></td>';
	    	line += '<td><input type="radio" name="mustConn_'+parent[i].source+'_for_'+ typeId+'"   value="create" onclick="DisplayFormUtils.showCreateDiv('+parent[i].source+', '+typeId+' )"/>Create New </br/>';
	    	line += '<input type="radio" name="mustConn_'+parent[i].source+'_for_'+ typeId+'"    value="use" onclick="DisplayFormUtils.showCreateDiv('+parent[i].source+', '+typeId+' )" />Select Instance</td>';
	    	
	    	line += '<td><div id="createParent_'+parent[i].source+'_for_'+typeId+'" style="display:none;visibility:hidden"></div>';	
	    	line += '<div id="nodeDisplay_'+parent[i].source+'_for_'+typeId+'" style="display:none;visibility:hidden"></div></td></tr>';

	    	inputContentList += line;
	    	line = '';
	    	// saving these info for the saving process;
	    	
	    	element.currTypeId       = typeId;
	    	element.nodeUuidCurrType = null;
	    	element.typeIdcas        = 'asParent';
	    	element.typeId           = parent[i].source;
	    	element.typeConn         = parent[i].id;
	    	element.nodeUuid         = null;
	    	element.status           = 'pending';
	    	historyNode.push(element);
	    	element = {};    	
	    } 
	    inputContentList += '</table>';	
	   }
	 // Also in case of no Must connections/links just display the Add_Form_Inst_create
	 // add division for the node instance creation   
	 inputContentList =  inputContentList +   '<div id="addNodeInst_'+typeId+'"><p> Proprietes for the Type '+typeMapViaId[typeId].name +'</p></div>';  
	 workDiv.append(inputContentList);
	   
//	 DisplayFormUtils.addFormInstCreate( $("#addNodeInst_"+typeId), typeId );	
	 NodeUtils.addFormInstCreate( $("#addNodeInst_"+typeId), typeId );	
	 var footer  = '<tr align="center"><td colspan="2"><input type="button"  name="submit" class="btn btn-primary btn-xs"   id="addNodeInst_submit_' + typeId+ '" value="Add Instance" onclick="DisplayFormUtils.createSetOfNodesAndEdges('+typeId+');"/>';		
         footer += '<input type="button"   name="cancel" id="addNodeInst_cancel_' + typeId + '" value="Cancel" onclick="DisplayFormUtils.createSetOfNodesAndEdges_cancel(' + typeId + ');"/></td></tr>';   		    
	 $('#addNodeInst_'+typeId+' table ').append(footer);
	 
	 
	 // show the division for adding instance  with/without Must connections/link  
	 $('div.right_body').show(); 
	 DisplayFormUtils.showDivision('form_deco_right_body_sub_div_', typeId);
	 DisplayFormUtils.showDivision('work_addInstance_' , typeId);	 
	
}

DisplayFormUtils.createSetOfNodesAndEdges = function ( currentType ){
	console.log(" Inside the saving process : multiple saving will take place.");
	if(!currentType ){
		console.log(" Missing Type Id for creation of Node instance ");
        return;
		}
		// must first create all Parents if any then create node Instance then edges.
	createEdgeList = []; var last = null;
	
	historyNode.forEach(function ( element) {

		 last = jQuery.extend({}, element);
		 console.log("top element is :");
		 console.log(last);
	        // get the selection Create or Select
		 
		 var option = $('input[name="mustConn_'+last.typeId+'_for_'+last.currTypeId+'"]:checked').val();				
		 console.log(" Type connection is : "+ option);
		 if( option == 'create' ) {
			     // create Parent 
			    var properties=[];
				
				console.log("Attempting to add a new Node for this type :" + last.typeId );		
				// retrieve the Info
//				properties = new DisplayFormRenderer().retrievePropertiesFromCreate( last.typeId , 'form_inst_add_val_');	
				properties = NodeUtils.retrieveNodePropertiesFromForm ( last.typeId , 'form_inst_add_val_');
				if(properties[properties.length-1]){
					console.log(" do not continue");
					return;
				}
				properties.pop();
				console.table(properties);
				new DisplayFormRenderer().saveNodeCreated (last.typeId, properties );
				if(!listInstUuids[0]){
					console.log("failure in creating parent node ");
					return;
				}
				last.nodeUuid =  listInstUuids[0];
				last.status   = 'pending';
				createEdgeList.push(last);                    // save this for later			
 
		 }else if( option == 'use' ) {
			    var ele          = document.getElementById('nodeInstParent_'+last.typeId);	
				var nodeUuid     = ele.options[ele.selectedIndex].value;
				if(!nodeUuid){
					console.log(" Missing Node UUid for the selected node ");
					$('#nodeInstParent_'+last.typeId).css("backgroundColor", "yellow");
					console.log("Cannot create a link between the node instance and its "+ last.typeIdcas +' for Type Id '+last.typeId);					
					return;
				}else {
					// store the uuid for creating later the edge;
					last.nodeUuid = nodeUuid;
					last.status   = 'pending';
					createEdgeList.push(last);                    // save this for later
				}
		
		 }else {
			 // error 
			 $('input[name="mustConn_'+last.typeId+'_for_'+last.currTypeId+'"]').parent('td').css("backgroundColor", "yellow");
			 console.log(" process of creation stopped with error highlighted");
			 return;
		 }
		 last = {};
	});
	
	// this should create the node for the current Type 
		
		console.log(" Creation of simple Node instance ");		 
		var properties=[];
		console.log("Attempting to add a new Node for this type :" + currentType );		
		// retrieve the Info	
		properties = NodeUtils.retrieveNodePropertiesFromForm ( currentType , 'form_inst_add_val_');
		
		if(properties[properties.length-1]){
			console.log(" do not continue");
			return;
		}
		properties.pop();
		console.table(properties);
			
		//==== SAVE NODE INSTANCE CREATED FOR THE CURRENT TYPE  
		new DisplayFormRenderer().saveNodeCreated (currentType, properties );
		
		// UPDATE ALL Elements in LIst to CREATE EDGES IF ANY withe new node Uuid	
		createEdgeList.forEach(function ( element) {
			if( element.currTypeId ==  currentType ){
				 if(!listInstUuids[0]){   element.status = 'error' }
				 else {
					 element.nodeUuidCurrType = listInstUuids[0];
				 }
			}
		})
	
	// create all edges 
	console.table(createEdgeList);

	 DisplayFormUtils.saveEdges();
	
	 // Clear the Form for creation
	$('#work_addInstance_'+currentType).remove();
	
	// ADD Node Name in the List of Instnaces 
	// DISPLAY ALL INFO on the Right for the newly created Node
	if(listInstUuids[0] != null) {( new DisplayFormRenderer() ).addNodeInstanceToList (listInstUuids[0]);	}	
	( new DisplayFormRenderer() ).selectInstance( listInstUuids[0] );
		
}

//  Saving all edges at the end 
  DisplayFormUtils.saveEdges = function( ){
	// LOOP Through the list to Create All required edges if ANY
	var  jsonData = {};
	createEdgeList.forEach(function ( element) {
		
		if(element.status == 'pending'){                                // avoid all error records if any
			jsonData = {};
			if( element.typeIdcas == 'asParent' || element.typeIdcas == 'asSibling'){	
				
				jsonData = NodeUtils.createEdgeJson(element.typeId  ,  element.nodeUuid, element.currTypeId , element.nodeUuidCurrType, element.typeConn);
				   
		    }else {
		    	jsonData = NodeUtils.createEdgeJson(element.currTypeId  ,  element.nodeUuidCurrType, element.typeId , element.nodeUuid, element.typeConn);
		    	
		    }
			var apiEdge  = new EdgeApis();
			
			var doneFunction = function ( dataEdge ){
				if(!$.isEmptyObject(dataEdge)){
					console.log("Edge created ");
					// add edge to edgeMap
					NodeUtils.AddEdgeToMap( dataEdge);	
						
					 if(element.typeIdcas == 'asParent' ){						 						 
						   NodeUtils.buildParentNodeDetail ( element.nodeUuidCurrType, dataEdge);
						   ( new DisplayFormRenderer() ).addNodeToParList(element.nodeUuidCurrType, element.nodeUuid, dataEdge.type);
						   

					 }else if ( element.typeIdcas == 'asChild'){
						 NodeUtils.buildChildNodeDetail (  element.nodeUuidCurrType, dataEdge);
						 ( new DisplayFormRenderer() ).addNodeToChildList( element.nodeUuidCurrType, element.nodeUuid, dataEdge.type);
						 
					 }else if ( element.typeIdcas == 'asSibling'){
						 NodeUtils.buildSiblingNodeDetail ( element.nodeUuidCurrType, dataEdge, 'destination');
						 ( new DisplayFormRenderer() ).addNodeToSibList(element.nodeUuidCurrType, element.nodeUuid, dataEdge.type);
					 }
					 element.status = 'Completed';
			
				}else {
					// error
					console.log("creation of edge failed "); 
				}
				
			}
			
			var failFunction = function (  xhr, status, error ){
				console.log('Error Edge not created: ' + xhr.status);
				$('#console-log').append("<p style='color:red'>Error Edge not created:"+ xhr.status+"</p>");	
			}
					
			apiEdge.saveEdge( jsonData,  doneFunction, failFunction );			
		}
		
	});
	
}





// LOAD ALL NODES For PARENT TYPE SELECTED
 DisplayFormUtils.buildListNodes = function(div,  typeId, typeParent ){                   // based on type selected load existing node Instances and display these
	
	if(!typeParent ){
		console.log("No parent type Id provided selected");	
		return;
	}
	
	if(!typeId ){
		console.log("No type Id provided selected");	
		return;
	}
	// grab all nodes under the selected type
	var successFunction = function( data ) {
		var inputSelect = '';
		if(!$.isEmptyObject(data) && !$.isEmptyObject(data.nodes) ){
		
//		if ( data.nodes.length  > 0 ){	
		    console.log(data.nodes);
		
			inputSelect += 'Select Node <select id="nodeInstParent_'+typeParent+'" onchange=""><option value="">....</option>'; 
			$.each(data.nodes, function(key, value){
				// add loaded node to nodeMap
				NodeUtils.AddNodeToMap( value);			
				var uuid     = NodeUtils.findUUID( value );	
				if(!uuid){
					console.log(" Could not find the Node uuid ");
					return;
				}
			    var instName = NodeUtils.findNameInst( value);									
			    inputSelect += '<option value='+uuid+'>'+ instName +'</option>';    			
			});
			
			inputSelect +=' </select></p>';		
			// add this list to the form 
			div.append( inputSelect); 	
		}else {
			div.append("NO Node available --  click create New");
		}
		
	};
	
	var failFunction = function( xhr, status, error ) {
		console.log('Not able to load Nodes for this Type: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Not able to load Nodes for this Type:"+typeParent +'  '+ xhr.status+"</p>");	
	};
	
	var nodeApi = new NodeApis();
	
	nodeApi.getNodesUnderType(typeParent, successFunction, failFunction);
			
}

DisplayFormUtils.createSetOfNodesAndEdges_cancel = function( typeId){
	if(!typeId){
		console.log(" no type given: cannot cancel create Instance  "); 
		return;
	}
		
	console.log("Attempting to Cancel :" + typeId );		
	// note that the SELECTION of a type should indicate a FOCUS
	// ie. Reset the listTypeId's and listConnId's
	GlobalUtils.clearGlobalSelected();	
	
	// assign the current 
	GlobalUtils.setGlobalTypeSelected( typeId );
	$('#work_addInstance_'+typeId).remove();

}



DisplayFormUtils.buildTypeList = function ( nodeUuid, text ){
	
	if(!nodeUuid ){
		console.log(" no node uuid provided  in buildTypeList");
		return;
	}
	if(!text){
		console.log("No text provided: should be (Children/Parent/Sibling ");
		return;
	}
//	// grab the TYPE of the Node Instance
//	var typeNode = nodeMap[nodeUuid].type;
//	// grab the ID for this TYPE
//	var typeNodeId = typeMap[typeNode].id;
	
	// grab the type Id for this node
	var typeNodeId = nodeMap[nodeUuid].typeId;

	var listChildrenTypes = [];
	var listParentTypes   = [];
	var typeOfConn = {};
	$.each( connMapViaId, function( key, value ) {
	
		if ( value.source  == typeNodeId ){           // Type of the Node instance is a Source in this connection
			typeOfConn[ "typeId" ] = value.target;
			typeOfConn[ "connection"] =  value.id;
			listChildrenTypes.push(typeOfConn);
		}
		
		if ( value.target  == typeNodeId ){           // Type of the Node instance is a Source in this connection
			typeOfConn[ "typeId" ] = value.source;
			typeOfConn[ "connection"] =  value.id;
			listParentTypes.push(typeOfConn);
		}
	    typeOfConn = {};
	
	});
	
	var inputTypeList =''; 

	var first  ='<option value="">select '+text+' Type ...</option>'
	
	if(text == 'Children'){
		if(listChildrenTypes.length > 0 ){	
			
			for(var i=0; i< listChildrenTypes.length ; i++){
				if(connMapViaId[listChildrenTypes[i].connection].classification == 'parentchild')
				{
					inputTypeList += '<option value="'+listChildrenTypes[i].typeId+'|'+listChildrenTypes[i].connection+'" style="color:black" >'+typeMapViaId[listChildrenTypes[i].typeId].name +'(PC)</option>';
				}
			}
		}
		if(inputTypeList == '' ){ document.getElementById("addChil_"+ nodeUuid).disabled = true; }
			
		document.getElementById('select_child_type_'+nodeUuid).innerHTML= first + inputTypeList;
		
	}else if( text == 'Parent'){
			inputTypeList = '';	
			if(listParentTypes.length > 0 ){
				for(var i=0; i< listParentTypes.length ; i++){
					if(connMapViaId[listParentTypes[i].connection].classification == 'parentchild')
					{
					inputTypeList += '<option value="'+listParentTypes[i].typeId+'|'+listParentTypes[i].connection+'" style="color:black"  >'+typeMapViaId[listParentTypes[i].typeId].name +'(PC)</option>';
					}
				}
			}
			if(inputTypeList == '' ){ document.getElementById("addPar_"+ nodeUuid).disabled = true; }
			
		    document.getElementById('select_parent_type_'+nodeUuid).innerHTML =  first + inputTypeList;	
		    
	}else if( text == 'Sibling'){
			inputTypeList = '<option value="">select Sibling Type ...</option>';
			var inputSibling = '';
			if(listParentTypes.length > 0 || listChildrenTypes.length  > 0){
				for(var i=0; i< listParentTypes.length ; i++){
					if(connMapViaId[listParentTypes[i].connection].classification == 'link')
					{
					  inputSibling += '<option value="'+listParentTypes[i].typeId+'|'+listParentTypes[i].connection+'" style="color:green"  >'+typeMapViaId[listParentTypes[i].typeId].name +'(Link)</option>';
					} 
				}
				for(var i=0; i< listChildrenTypes.length ; i++){
					if(connMapViaId[listChildrenTypes[i].connection].classification == 'link')
					{
					  inputSibling += '<option value="'+listChildrenTypes[i].typeId+'|'+listChildrenTypes[i].connection+'" style="color:green" >'+typeMapViaId[listChildrenTypes[i].typeId].name +'(Link)</option>';
					}	
				}
				if(inputSibling == '' ) {document.getElementById("addSib_"+ nodeUuid).disabled = true;}
				
				else inputTypeList = inputTypeList + inputSibling;
				
			}else {
				document.getElementById("addSib_"+ nodeUuid).disabled = true;	
					
				}
		   document.getElementById('select_sibling_type_'+nodeUuid).innerHTML = inputTypeList;	
		}
			
}

DisplayFormUtils.buildTypeProperty =  function ( text,  combinedIds, nodeUuid){
	if(!nodeUuid){
		// place we should append the text - in a Node
		return;
	}
	if(!combinedIds){
		console.log(" No type/connection provided ");
		return;
	}
	var typeIdConnId = combinedIds.split("|");
	var typeId = typeIdConnId[0];
	var connId = typeIdConnId[1];
	if(!typeId){
		console.log(" Missing Value of Type Id ");
		return;
	}
	if(!connId){
		console.log(" Missing Value of Connection Id  ");
		return;
	}
	var tmpType = typeMapViaId[typeId];    /// get the properties for the type
	
	var inputCreate = '';
    inputCreate = '<table border="2">';
    if($.isEmptyObject(tmpType.typeProperties)){ 
    	inputCreate += " No properties";
    }else {
	  
	    $.each( tmpType.typeProperties, function( propId, tmpProp ) {
								
			if(tmpProp.isMandatory){ propcolor='color:red'  } else {propcolor='color:black' };	
			
			if( tmpProp.propertyType == "DATE"  ){ 
				inputCreate += '<tr><td  style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input type="hidden" name="propertyId" value="'+tmpProp.id+'"/><input type="date"  name = "'+tmpProp.name+ '"  id="form_create_val_' + tmpProp.id + '" value="" / >(DATE)</td</tr>' ; 
			}else {
				inputCreate += '<tr><td  style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input type="hidden" name="propertyId" value="'+tmpProp.id+'"/><input type="text"  name = "'+tmpProp.name+ '"  id="form_create_val_' + tmpProp.id + '" value="" / >' ;	
				if( tmpProp.propertyType == "STRING" )              {   inputCreate += '(TEXT)</td> </tr>' ;
				} else if( tmpProp.propertyType == "INTEGER" )      {	inputCreate += '(NUMBER) </td></tr>' ;
				} else if( tmpProp.propertyType == "DOUBLE" )       {   inputCreate += '(DOUBLE) </td></tr>' ;
				} else if( tmpProp.propertyType == "BOOLEAN" )      {	inputCreate += '(BOOLEAN) </td></tr>' ;
				} else                                              {   inputCreate += '(UNKNOWN TYPE) </td></tr>' ;
				}
			}
		
	    });
    }
    inputCreate = inputCreate + "<input type ='hidden' id='form_create_val_connId' value='"+connId+"'>"
    inputCreate = inputCreate + "</table>";
	
	document.getElementById('td_'+nodeUuid).innerHTML = inputCreate;
}


DisplayFormUtils.buildTypeListConnect = function ( instId ){
	if(!instId){
		console.log(" no node uuid provided ");
		return;
	}
		
	
	var typeNodeId = nodeMap[instId].typeId;
	
	// grab the option selected 
	var listConnToChildren = [];
	var listConnToParent   = [];
	
	var detailConn = {};	
	
	var valueSelected = $('input[name="typeConnPosition_'+ instId+'"]:checked').val();
	if(!valueSelected){
		console.log(" No value selected for the connect as parent or as Child "+ valueSelected);	
		return;
	}
	
	console.log(" value is : "+ valueSelected);
	
	$.each( connMapViaId, function( key, value ) {
		if( value.classification == 'parentchild'){
			if ( value.source  == typeNodeId && valueSelected == 'asParent' ){           // Type of the Node instance is a Source in this connection
				detailConn[ "typeIdTarget" ]    = value.target;
				detailConn[ "connectionId"]     = value.ruleId;
				listConnToChildren.push(detailConn);
			}else if ( value.target  == typeNodeId &&  valueSelected == 'asChild'){           // Type of the Node instance is a target in this connection
				detailConn[ "typeIdSource" ]    = value.source;
				detailConn[ "connectionId"]     = value.ruleId;
				listConnToParent.push(detailConn);		
			}
		}
			detailConn = {};
	});
	
	// build the list of Types and append it 
	 if( valueSelected == 'asParent'){
		 
		 var tableInstConnDiv = $("#nodeFormConnecttoTable_" + instId );
		 
		 var inputTypeList =''; 
		 inputTypeList = '<td valign="middle" class="childType" ><select id="childType_'+instId+'" onchange="DisplayFormUtils.buildTypeListInstanceConnect(\'child\',\''+ instId+'\');"><option value="">Select Children Type ...</option>';
		 if(listConnToChildren.length  >0 ){	
				
				for(var i=0; i< listConnToChildren.length ; i++){	
					var text ='(use: ';
					text += connMapViaId[listConnToChildren[i].connectionId].name +')';
					inputTypeList += '<option value="'+listConnToChildren[i].typeIdTarget+'|'+listConnToChildren[i].connectionId+'">'+typeMapViaId[listConnToChildren[i].typeIdTarget].name + '<b>'+text +'</b>)</option>';
				}
				inputTypeList +='</td></tr>';
			}else {
				inputTypeList = '<td> No Children available</td>';
				var  footer = '<td><input type="button"     value="Cancel" onclick="DisplayFormUtils.cancelConnectToInst(\''+ instId+'\');" /></td>';
				inputTypeList = inputTypeList + footer;
			}		
			
		    $('#nodeFormConnecttoTable_'+instId).find("td:not(:nth-child(1)),td:not(:nth-child(1))").remove();
			$('#nodeFormConnecttoTable_'+instId).find('tr:first').append( inputTypeList);		 
		 
	 };
	 if( valueSelected == 'asChild'){
		 
		 var tableInstConnDiv = $("#nodeFormConnecttoTable_" + instId );
		 var inputTypeList =''; 
		 inputTypeList = '<td valign="middle" class="parentType"><select id="parentType_'+instId+'"   onchange="DisplayFormUtils.buildTypeListInstanceConnect(\'parent\',\''+ instId+'\');" ><option value="">Select Parent Type ...</option>';
		 if(listConnToParent.length  > 0 ){	
			
				for(var i=0; i< listConnToParent.length ; i++){	
					var text ='(use: ';
					text += connMapViaId[listConnToParent[i].connectionId].name +')';
					inputTypeList += '<option value="'+listConnToParent[i].typeIdSource+'|'+listConnToParent[i].connectionId+'">'+typeMapViaId[listConnToParent[i].typeIdSource].name + '<b>'+text +'</b>)</option>';
				}
				inputTypeList +='</td>';
			}else {
				inputTypeList = '<td> No Children available</td>';
				
				var  footer = '<td><input type="button"     value="Cancel" onclick="DisplayFormUtils.cancelConnectToInst(\''+ instId+'\');" /></td>';
				inputTypeList = inputTypeList + footer;
				
			}		
		    $('#nodeFormConnecttoTable_'+instId ).find("td:not(:nth-child(1))").remove();
			$('#nodeFormConnecttoTable_'+instId).find('tr:first').append( inputTypeList);		 
		 
	 };	 
	
}

DisplayFormUtils.buildTypeListInstanceConnect = function (text,  keyOrigin ){
	if(!keyOrigin){
		console.log("no Node uuid provided"+keyOrigin);
		return;
	}
	
	var ele              = document.getElementById(text + 'Type_'+keyOrigin);	
	var eleValue         = ele.options[ele.selectedIndex].value;
	if(!eleValue){
		console.log("no Type provided"+eleValue);
		document.getElementById(text + 'Type_'+keyOrigin).style.background = 'yellow';
		 $('#nodeFormConnecttoTable_'+keyOrigin).find("td:gt(1)").remove();
		return;
	}
	console.log(" Selected is : "+ eleValue);
	
	var Id = eleValue.split("|");   // an array made of TypeId & ConnId;
	if(!Id[0]){
		console.log(" Missing Value of Type Id ");
		return;
	}
	
	var tableInstConnDiv = $("#nodeFormConnecttoTable_" + keyOrigin );
	document.getElementById(text + 'Type_'+keyOrigin).style.background = '';
	 $('#nodeFormConnecttoTable_'+keyOrigin).find("td:gt(1)").remove();
	// Load All instances for this Type
	var successFunction = function( data ) {
		
		 var inputInstList =''; 
			if ( data.nodes.length  > 0 ){	
				console.log(data.nodes);
				 inputInstList = '<td valign="middle"><select id="childInst_'+keyOrigin+'"><option value="">Select Instance ...</option>';
				$.each(data.nodes, function(key, value){
					var uuid     = NodeUtils.findUUID( value );	
					if(!uuid){
						console.log(" Could not find the Node uuid ");
						return;
					}
				    var instName = NodeUtils.findNameInst( value);
				    
			        NodeUtils.AddNodeToMap(value);
				    inputInstList += '<option value='+uuid+'>'+ instName +'</option>';  
									
				});
				var footer  = '<td><input type="button"  value="Add"   onclick="DisplayFormUtils.addEdgeConn(\''+ keyOrigin+'\')" />';
					footer += '<input type="button"     value="Cancel" onclick="DisplayFormUtils.cancelConnectToInst(\''+ keyOrigin+'\');" /></td>';
				inputInstList = inputInstList + footer;
				$('#nodeFormConnecttoTable_'+keyOrigin).find('tr:first').append( inputInstList);	
				
			}else {  // no nodes Returned 
				
				inputInstList += '<td> No node available;  change your selection  </td>';
				inputInstList += '<td><input type="button"     value="Cancel" onclick="DisplayFormUtils.cancelConnectToInst(\''+ keyOrigin+'\');" /></td>';
				
				$('#nodeFormConnecttoTable_'+keyOrigin).find('tr:first').append( inputInstList);
			}
	};
	
	var failFunction = function( xhr, status, error ) {
		console.log('Not able to load Nodes for this Type: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Not able to load Nodes for this Type:"+ xhr.status+"</p>");	
	};
	
	var nodeApi = new NodeApis();		
	
	nodeApi.getNodesUnderType(Id[0], successFunction, failFunction);	
	
}

DisplayFormUtils.addEdgeConn = function( keyOrigin ){

	if(!keyOrigin){
		console.log("no Node uuid provided"+keyOrigin);
		return;
	}
	// get the value selected Connection As Parent or Child
	var typeConnLink = $('input[name="typeConnPosition_'+ keyOrigin+'"]:checked').val();
	if(!typeConnLink){
		console.log(" No value selected for the connect "+ typeConnLink);
		return;
	}
	var text ='';
	 if( typeConnLink == 'asParent'){  	 text = 'child';
			 }
	 else {   text = 'parent';
		 }
	 
	// get the Type  and connId/linkId selected for this conn/link	
	var ele              = document.getElementById(text + 'Type_'+keyOrigin);	
	var eleType         = ele.options[ele.selectedIndex].value;
	if(!eleType){
		console.log("No element selected for the type "+eleType);
		return;
	}
	
	var typeId = eleType.split("|")[0];
	var connId = eleType.split("|")[1];
	
	var ele              = document.getElementById('childInst_'+keyOrigin);	
	var eleInst          = ele.options[ele.selectedIndex].value;
	if(!eleInst){
		console.log("no Node uuid provided"+eleInst);
		document.getElementById('childInst_'+keyOrigin).style.background = 'yellow';
		return;
	}
	
	document.getElementById('childInst_'+keyOrigin).style.background = '';
	
	// all three values are collected Create Edge and save it.
	var jsonData ={};
	
	 if( typeConnLink == 'asParent'){ 
		                     jsonData = NodeUtils.createEdgeJson(nodeMap[keyOrigin].typeId  , keyOrigin, typeId , eleInst, connId);
//									jsonData["originNodeUuid"]     =  keyOrigin;
//									jsonData["originType"]         =  nodeMap[keyOrigin].typeId.toString() ;
//									
//									jsonData["destinationNodeUuid"]= eleInst ;
//									jsonData["destinationType"]    = typeId.toString();
									
	 }else if(typeConnLink == 'asChild' ){
		                     jsonData = NodeUtils.createEdgeJson(typeId  , eleInst, nodeMap[keyOrigin].typeId , keyOrigin, connId);
//									jsonData["destinationNodeUuid"]     =  keyOrigin;
//									jsonData["destinationType"]         =  nodeMap[keyOrigin].typeId.toString() ;
//										
//									jsonData["originNodeUuid"]= eleInst ;
//									jsonData["originType"]    = typeId.toString();
	 }
	
//	 jsonData["ruleName"] = connMapViaId[connId].rule;
//	 jsonData["connection"] = connId.toString();
	 var apiEdge  = new EdgeApis();
		
	var doneFunction = function ( dataEdge ){
		console.log("Edge created ");
		// add edge to edgeMap
		NodeUtils.AddEdgeToMap( dataEdge);	
			
		 if(typeConnLink == 'asParent' ){
			 NodeUtils.buildChildNodeDetail ( keyOrigin, dataEdge);
			 ( new DisplayFormRenderer() ).addNodeToChildList(keyOrigin, eleInst, dataEdge.type);
		 }else {
			 NodeUtils.buildParentNodeDetail ( keyOrigin, dataEdge);
			 ( new DisplayFormRenderer() ).addNodeToParList(keyOrigin, eleInst, dataEdge.type);
		 }
		 DisplayFormUtils.cancelConnectToInst(keyOrigin);		 
		
	}
	
	var failFunction = function (  xhr, status, error ){
		console.log('Error Edge not created: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Error Edge not created:"+ xhr.status+"</p>");	
	}
			
	apiEdge.saveEdge( jsonData,  doneFunction, failFunction );	 	 
}

DisplayFormUtils.buildTypeListLink = function ( instId ){
	
	// grab all connections where the Type of this instance is Source
//	var typeNode = nodeMap[instId].type;
//	// grab the ID for this TYPE
//	var typeNodeId = typeMap[typeNode].id;
	
	if(!instId){
		console.log(" no node uuid provided ");
		return;
	}
	var typeNodeId = nodeMap[instId].typeId;
	
	
	// grab the option selected 
	var listLinks = [];
	var detailLink = {};
	

	var valueSelected = $('input[name="typeLinkPosition_'+ instId+'"]:checked').val()
		console.log(" value is : "+ valueSelected);
	
	if(!valueSelected){
			console.log(" No value selected for the connect as parent or as Child "+ valueSelected);
			$('input[name="typeLinkPosition_'+ instId+'"]').css("backgroundColor", "yellow");
			return;
	}	
	    	// grab all possible children 
	$.each( connMapViaId, function( key, value ) {	
		if ( value.classification == 'link'  ){
	    		if ( value.source  == typeNodeId ){           
	    				detailLink[ "typeIdtoLinkTo" ]    = value.target;
	    				detailLink[ "linkId"]             =  value.ruleId;
	    				listLinks.push(detailLink);
	    		}else  if ( value.target  == typeNodeId ){          
	    				detailLink[ "typeIdtoLinkTo" ]    = value.source;
	    				detailLink[ "linkId"]             = value.ruleId;
	    				listLinks.push(detailLink);
	    			}	
		}
		detailLink = {};
	});
		 var tableInstLinkDiv = $("#nodeFormLinktoTable_" + instId );
		 
		 var inputTypeList =''; 
		 inputTypeList = '<td valign="middle"><select id="linkType_'+instId+'"  onchange="DisplayFormUtils.buildTypeListInstanceLink(\''+ instId+'\');"     ><option value="">Select Sibling Type ...</option>';
		 if(listLinks.length  != 0 ){			
				for(var i=0; i< listLinks.length ; i++){	
					var text ='(use link: ';
					text += connMapViaId[listLinks[i].linkId].name +')';
					inputTypeList += '<option value="'+listLinks[i].typeIdtoLinkTo+'|'+listLinks[i].linkId+'">'+typeMapViaId[listLinks[i].typeIdtoLinkTo].name + '<b>'+text +'</b>)</option>';
				}
				inputTypeList +='</td>';
			}else {
				inputTypeList = '<td> No Sibling available';
				var  footer = '<input type="button"     value="Cancel" onclick="DisplayFormUtils.cancelLinkToInst(\''+ instId+'\');" /></td>';
				inputTypeList = inputTypeList + footer;
			}		
			
		    $('#nodeFormLinktoTable_'+instId).find("th:not(:nth-child(1)),td:not(:nth-child(1))").remove();
			$('#nodeFormLinktoTable_'+instId).find('tr:first').append( inputTypeList);				 	
}

DisplayFormUtils.buildTypeListInstanceLink = function (keyOrigin ){
	if(!keyOrigin){
		console.log("no Node uuid provided"+keyOrigin);
		return;
	}
	
	var ele              = document.getElementById('linkType_'+keyOrigin);	
	var eleValue         = ele.options[ele.selectedIndex].value;
	if(!eleValue){
		console.log("no Type provided"+eleValue);
		document.getElementById('linkType_'+keyOrigin).style.background = 'yellow';
		return;
	}
	
	console.log(" Selected is : "+ eleValue);
	
	var Id = eleValue.split("|");   // an array made of TypeId & ConnId;
	
	var tableInstLinkDiv = $("#nodeFormLinktoTable_" + keyOrigin );
	
	// Load All instances for this Type
	var successFunction = function( data ) {
		console.log(data.nodes);
		
		 var inputInstList =''; 
			if ( data.nodes.length  > 0 ){	
		 
				 inputInstList = '<td valign="middle"><select id="linkInst_'+keyOrigin+'"><option value="">Select Instance ...</option>';
				$.each(data.nodes, function(key, value){
					var uuid     = NodeUtils.findUUID( value );	
				    var instName = NodeUtils.findNameInst( value)
			           NodeUtils.AddNodeToMap(value);
				    inputInstList += '<option value='+uuid+'>'+ instName +'</option>';  
									
				});
				var footer  = '<td><input type="button"  value="Add"    onclick="DisplayFormUtils.addEdgeLink(\''+ keyOrigin+'\')" />';
					footer += '<input type="button"      value="Cancel" onclick="DisplayFormUtils.cancelLinkToInst(\''+ keyOrigin+'\');" /></td>';
				inputInstList = inputInstList + footer;
				$('#nodeFormLinktoTable_'+keyOrigin).find('tr:first').append( inputInstList);	
				
			}else {  // no nodes created 
				
				inputInstList += '<td> No node available;  change your selection  </td>';
			}
	};
	
	var failFunction = function( xhr, status, error ) {
		console.log('Not able to load Nodes for this Type: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Not able to load Nodes for this Type:"+ xhr.status+"</p>");	
	};
	
	var nodeApi = new NodeApis();		
	
	nodeApi.getNodesUnderType(Id[0], successFunction, failFunction);	
	
}

DisplayFormUtils.addEdgeLink = function( keyOrigin ){
	// this function is only reachable if some Type list is provided for the user to choose from

	if(!keyOrigin){
		console.log("no Node uuid provided"+keyOrigin);
		return;
	}
	// get the value selected Connection As Parent or Child
	var typeConnLink = $('input[name="typeLinkPosition_'+ keyOrigin+'"]:checked').val();
	if(!typeConnLink){
		console.log(" No value selected for the connect "+ typeConnLink);
		return;
	}
	
 
	// get the Type  and connId/linkId selected for this conn/link	
	var ele              = document.getElementById('linkType_'+keyOrigin);	
	var eleType         = ele.options[ele.selectedIndex].value;
	if(!eleType){
		console.log("No element selected for the type parent "+eleType);
		return;
	}
	
	var typeId = eleType.split("|")[0];
	var linkId = eleType.split("|")[1];
	
	if(!typeId || !linkId){
		console.log(" values returned are not correct");
		return;
		// error 
	}
	
	var ele              = document.getElementById('linkInst_'+keyOrigin);	
	var eleInst          = ele.options[ele.selectedIndex].value;
	if(!eleInst){
		console.log("no Node selected  "+eleInst);
		// document.getElementById()
		return;
	}

	// all three values are collected Create Edge and save it.
	var jsonData ={};
	
	 jsonData = NodeUtils.createEdgeJson(nodeMap[keyOrigin].typeId  , keyOrigin, typeId , eleInst, linkId);
	
//	jsonData["originNodeUuid"]     =  keyOrigin;
//	jsonData["originType"]         =  nodeMap[keyOrigin].typeId.toString() ;
//									
//	jsonData["destinationNodeUuid"]= eleInst ;
//	jsonData["destinationType"]    = typeId.toString();
//									
////	jsonData["ruleName"] = connMapViaId[linkId].rule;
//	 jsonData["connection"] = linkId.toString(); 
	 var apiEdge  = new EdgeApis();
		
	var doneFunction = function ( dataEdge ){
		if($.isEmptyObject(dataEdge)){
			console.log(" No Edge returned ---- in saving link Edge ");
			return
		}
		
		
		console.log("Edge created ");
		// add edge to edgeMap
		NodeUtils.AddEdgeToMap( dataEdge);	
		
		 NodeUtils.buildSiblingNodeDetail ( keyOrigin, dataEdge, 'destination');
		 ( new DisplayFormRenderer() ).addNodeToSibList(keyOrigin, eleInst, dataEdge.type);
		
		 DisplayFormUtils.cancelLinkToInst(keyOrigin);		
	}
	
	var failFunction = function (  xhr, status, error ){
		console.log('Error Edge not created: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Error Edge not created:"+ xhr.status+"</p>");	
	}
			
	apiEdge.saveEdge( jsonData,  doneFunction, failFunction );	 
}


//========================================================================================================================
DisplayFormUtils.resetWorkDiv = function( typeId , appendTo ){
	
	 var checkInstanceAddDiv = $( "#work_addInstance" + typeId );		 

	 if(!$("#work_addInstance" + typeId).length){
			// no div found, create it
			var newInstAddDiv = document.createElement('div');
			newInstAddDiv.id = 'work_addInstance_'  + typeId;
			newInstAddDiv.className = 'work_addInstance';
			newInstAddDiv.style.visibility = "hidden";
			newInstAddDiv.style.display = "none";
		
			appendTo.append( newInstAddDiv );

		}		
}

DisplayFormUtils.cancelLinkToInst = function ( instId ){
	
	( new DisplayFormRenderer() ).displayLinkTo(instId);
	
}

DisplayFormUtils.cancelConnectToInst  = function ( instId ){
	
	( new DisplayFormRenderer() ).displayConnectTo(instId);	
	
}

DisplayFormUtils.resetParChildSibForms = function (instId){
	
	var checkInstanceChildDiv = $( "#form_inst_children_" + instId );
	if( checkInstanceChildDiv != null || checkInstanceChildDiv.length != 0 ) {	
		$("#nodeFormChildTable_"+ instId).find("tr:not(:nth-child(1))").remove();
	}
	
	var checkInstanceParDiv = $( "#form_inst_parent_" + instId );
	if( checkInstanceParDiv != null || checkInstanceParDiv.length != 0 ) {	
		$("#nodeFormParTable_"+ instId).find("tr:not(:nth-child(1))").remove();
	}
	
	var checkInstanceSibDiv = $( "#form_inst_sibling_" + instId );
	if( checkInstanceSibDiv != null || checkInstanceSibDiv.length != 0 ) {	
		$("#nodeFormSibTable_"+ instId).find("tr:not(:nth-child(1))").remove();
	}
		
};

DisplayFormUtils.resetFormAddInst = function ( typeId ){ 
	
	var checkInstanceCreateDiv = $( "#form_inst_add_" + typeId );
	
	if( checkInstanceCreateDiv != null || checkInstanceCreateDiv.length != 0 ) {	
		checkInstanceCreateDiv.empty();
	}
}

DisplayFormUtils.cancelAddChild = function(){
	var div = $(".addChildNodeRow");
	if( div.length > 0  ) {
		div.remove();
	}
}

DisplayFormUtils.cancelAddSib = function(){
	
	var div = $(".addSibNodeRow");
	if( div.length > 0  ) {
	 div.remove();
	}
}

DisplayFormUtils.cancelAddPar =function(){
	var div = $(".addParNodeRow");		
	if( div.length > 0  ) {
		div.remove();
	}
}

 DisplayFormUtils.clearAddRow = function(){
	if($( ".addChildNodeRow" ).length >  0) {
		console.log("FOUND SOMETING : " + $( ".addChildNodeRow" ).length + "Clearing these ");
		// previous created rows not deleted
		var div = $(".addChildNodeRow");			
		div.remove();
	}
	if($( ".addParNodeRow" ).length > 0) {
		console.log("FOUND SOMETING : " + $( ".addParNodeRow" ).length + " Clearing these");
		var div = $(".addParNodeRow");			
		div.remove();
	}
	if($( ".addSibNodeRow" ).length > 0) {
		console.log("FOUND SOMETING : " + $( ".addSibNodeRow" ).length + " Clearing these");
		var div = $(".addSibNodeRow");			
		div.remove();
	}
 }


 DisplayFormUtils.showDivision = function ( divName, divId ){
	
	var instDiv = document.getElementById(divName + divId );
	if( instDiv != null ) {
		instDiv.style.display = "block";
		instDiv.style.visibility = "visible";
	} else {
		// nothing to show?
		console.log(" no division to show ");
	}		
 }

 DisplayFormUtils.hideDivision = function ( divName, divId ){
	
	var instDiv = document.getElementById(divName + divId );
	if( instDiv != null ) {
		instDiv.style.display = "none";
		instDiv.style.visibility = "hidden";
	} else {
		// nothing to hide?
		console.log(" no division to hide ");
	}		
 }



//DisplayFormUtils.createNodeWithParent = function ( nodeSelected, typeParent, curType){
//if(!nodeSelected){
//	console.log("no node selected to create ");
//	return;
//}
//if(!typeParent){
//	console.log(" No type Id parent provided ");
//	return;
//}
//if(!curType){
//	console.log(" Missing Id for the current Type");
//	return;
//}
//
////var name = $('nodeInstParent_'+typeParent);
//console.log(" values are : node Selected :  "+ nodeSelected + " type Parent :"+ typeParent + " current Type : "+ curType);
//
//// prepare the node selected as parent
//// the Type of this Parent
//var inputText = '';
//inputText    += '<tr><th>NodeParent:</th><td><input type="text" id="nodeInstParent_selected" value="'+ nodeSelected+'"  disabled="disabled"/></td></tr>'; 
//inputText    += '<tr><th>TypeParent:</th><td><input type="text" id="nodeInstParentType_selected" value="'+typeMapViaId[typeParent].name+'" disabled></td></tr>';
//
//// prepare the connection to choose from
//var listOfConnPar = [];
//   $.each( connMapViaId , function( key, value ) {				
//		if( (curType === value.target ) &&( typeParent == value.source))	{			
//			listOfConnPar.push(value);
//		}
//   });
//   
//   
//var connText = '';
//connText   += '<tr><td>Select Connection</td><td><select  id="connSelected_">';
//for(var i=0; i< listOfConnPar.length ; i++){
//	connText  += '<option value="'+listOfConnPar[i].id+'">'+listOfConnPar[i].name+'('+listOfConnPar[i].id+')</option>';
//}
//
//connText  += '</select></td></tr><br />';
//
//inputText = inputText + connText;
//
//
//// display the list of properties to be entered.
//var instAddDiv = $("#form_inst_add_" + curType );
//instAddDiv.empty();
//DisplayFormUtils.addFormInstCreate( instAddDiv, curType);
//
//$('div#form_inst_add_'+curType + '  tr').first().before(inputText);
//
//
//var footer  = '<tr align="center"><td colspan="2"><input type="button"  name="submit" class="btn btn-primary btn-xs"   id="form_inst_add_val_submit_' + curType + '" value="Add Instance" onclick="( new DisplayFormRenderer() ).createNodewithParent_submit(' + curType + ');"/>';	
//footer += '<input type="button"   name="cancel" id="form_inst_add_val_cancel_' + curType + '" value="Cancel" onclick="( new DisplayFormRenderer() ).createNode_cancel(' + curType + ');"/></td></tr>';
//$('div#form_inst_add_'+curType + '  tr').last().after(footer);	
//	
//
//}
