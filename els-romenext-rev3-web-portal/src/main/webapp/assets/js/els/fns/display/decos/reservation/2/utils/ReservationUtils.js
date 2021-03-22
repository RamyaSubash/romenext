function ReservationUtils() {
	
}

	ReservationUtils.createHTMLEntity = function( elementType, elementId, className, visibility, display, innerHtml) {
			
			var newElement = document.createElement( elementType );
			newElement.id = elementId;
			newElement.className = className;
			newElement.style.visibility = visibility;
			newElement.style.display = display;
			newElement.innerHTML = innerHtml;
			
			return newElement;
	}
	
	ReservationUtils.createAppendHTMLEntity = function( elementType, elementId, className, visibility, display, innerHtml, appendToDiv) {
		
		var newElement = document.createElement( elementType );
		newElement.id = elementId;
		newElement.className = className;
		newElement.style.visibility = visibility;
		newElement.style.display = display;
		newElement.innerHTML = innerHtml;
		
		appendToDiv.append(newElement);
	}

//===================================================================================================================================
	ReservationUtils.addDivsForAReservationDetails = function( instHolderDiv , key ) {	
		/**
		 * THIS IS FOR THE INFO OF THE INSTANCE
		 */
		var checkInstanceDiv = $( "#form_inst_" + key );	
		if( checkInstanceDiv == null || checkInstanceDiv.length == 0 ) {	
			ReservationUtils.createAppendHTMLEntity('div', 'form_inst_'  + key, 'form_inst', 'hidden', 'none', '',  instHolderDiv);		
			checkInstanceDiv = $( "#form_inst_" + key );
		}	
		/**
		 * THIS IS FOR THE EDITING OF  INSTANCE PROPERTIES
		 */
		var checkInstanceEditDiv = $( "#form_inst_edit_" + key );	
		if( checkInstanceEditDiv == null || checkInstanceEditDiv.length == 0 ) {		
			ReservationUtils.createAppendHTMLEntity('div', 'form_inst_edit_'  + key, 'form_inst_edit', 'hidden', 'none', '', instHolderDiv);		
			checkInstanceEditDiv = $( "#form_inst_edit_" + key );
		}		
		/**
		 * THIS IS FOR THE CHILDREN OF THE INSTANCE
		 */
		var checkInstanceChildDiv = $( "#form_inst_children_" + key );
		if( checkInstanceChildDiv == null || checkInstanceChildDiv.length == 0 ) {	
			ReservationUtils.createAppendHTMLEntity('div', 'form_inst_children_'  + key, 'form_inst_children', 'hidden', 'none', '', instHolderDiv);	
			checkInstanceChildDiv = $( "#form_inst_children_" + key );
		}	
		/**
		 * THIS IS FOR THE PARENT OF THE INSTANCE
		 */
		
		var checkInstanceParDiv = $( "#form_inst_parent_" + key );	
		if( checkInstanceParDiv == null || checkInstanceParDiv.length == 0 ) {		
			ReservationUtils.createAppendHTMLEntity('div', 'form_inst_parent_'  + key, 'form_inst_parent', 'hidden', 'none', '',  instHolderDiv);
			checkInstanceParDiv = $( "#form_inst_parent_" + key );
		}	
		/**
		 * THIS IS FOR THE SIBLING OF THE INSTANCE
		 */	
		var checkInstanceSibDiv = $( "#form_inst_sibling_" + key );	
		if( checkInstanceSibDiv == null || checkInstanceSibDiv.length == 0 ) {		
			ReservationUtils.createAppendHTMLEntity('div', 'form_inst_sibling_'  + key, 'form_inst_sibling', 'hidden', 'none', '',  instHolderDiv);
			checkInstanceSibDiv = $( "#form_inst_sibling_" + key );
		}
		/**
		 * THIS IS FOR LINKING TO ANOTHER EXISTING INSTANCE
		 */	
		var checkInstanceLinktoDiv = $( "#form_inst_linkto_" + key );	
		if( checkInstanceLinktoDiv == null || checkInstanceLinktoDiv.length == 0 ) {
			// no div found, create it
			ReservationUtils.createAppendHTMLEntity('div', 'form_inst_linkto_'  + key, 'form_inst_linkto', 'hidden', 'none', '', instHolderDiv);			
			checkInstanceLinktoDiv = $( "#form_inst_linkto_" + key );
		}	
		/**
		 * THIS IS FOR CONNECTING  TO ANOTHER EXISTING INSTANCE
		 */	
		var checkInstanceConnecttoDiv = $( "#form_inst_connectto_" + key );	
		if( checkInstanceConnecttoDiv == null || checkInstanceConnecttoDiv.length == 0 ) {		
			ReservationUtils.createAppendHTMLEntity('div', 'form_inst_connectto_'  + key, 'form_inst_connectto', 'hidden', 'none', '',  instHolderDiv);
			checkInstanceConnecttoDiv = $( "#form_inst_connectto_" + key );
		}	
		
		/**
		 * THIS IS FOR Displaying SELECTED EDGE 
		 */	
		var checkInstanceConnecttoDiv = $( "#form_inst_edgeDetails_" + key );	
		if( checkInstanceConnecttoDiv == null || checkInstanceConnecttoDiv.length == 0 ) {		
			ReservationUtils.createAppendHTMLEntity('div', 'form_inst_edgeDetails_'  + key, 'form_inst_edgeDetails', 'hidden', 'none', '',  instHolderDiv);
			checkInstanceConnecttoDiv = $( "#form_inst_edgeDetails_" + key );
		}	
		
		
	}

//=====================================================================================================================================

	ReservationUtils.setDefault_ChildrenDiv = function ( key   ){
		if(!key){
			console.log(" no Reservation key provided: cannot build the create children table  "); 
			return;
		}
	
		var checkInstanceChildDiv = $( "#form_inst_children_" + key );
		    var text = '';
		    text += "<br/><table id='nodeFormChildTable_" + key + "' border=1><tr><th>Children</th>";
		    text += "<td  class='create_icon' onclick='( new ReservationManagerRender() ).addChildNodeForm(\"" + key + "\")'>";
		    text += "<img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td><td id='listTypeChildren_"+key+"'></td></tr></table>";
		checkInstanceChildDiv.append(text);
	
	}
	
	ReservationUtils.setDefault_ParentDiv = function ( key   ){
		if(!key){
			console.log(" no Reservation key provided: cannot build the create Parent table  "); 
			return;
		}
	
		var checkInstanceParDiv = $( "#form_inst_parent_" + key );
		    var text = '';
		    text += "<br /><table id='nodeFormParTable_" + key + "' border=1><tr><th>Parent</th>";
		
		    text += "<td  class='create_icon' onclick='( new ReservationManagerRender() ).addParNodeForm(\"" + key + "\")'>";
		    text += "<img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td><td id='listTypeParents_"+key+"'></td></tr></table>";
	    checkInstanceParDiv.append(text);
	
	}
	
	ReservationUtils.setDefault_SiblingDiv = function ( key   ){
		if(!key){
			console.log(" no Reservation key provided: cannot build the create Sibling table  "); 
			return;
		}
	
		var checkInstanceSibDiv = $( "#form_inst_sibling_" + key );
		    var text = '';
		    text += "<br /><table id='nodeFormSibTable_" + key + "' border=1><tr><th>Sibling</th>";
		    text += "<td  class='create_icon' onclick='( new ReservationManagerRender() ).addSibNodeForm(\"" + key + "\")'>";
		    text += "<img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td><td id='listTypeSiblings_"+key+"'></td></tr></table><br />";
	    checkInstanceSibDiv.append(text);
	
	}

	ReservationUtils.setDefault_LinktoDiv = function ( key   ){
		if(!key){
			console.log(" no Reservation key provided: cannot build the Link To table  "); 
			return;
		}
	
		var checkInstanceLinktoDiv = $( "#form_inst_linkto_" + key );
		    var text = '';
		    text += "<br /><table id='nodeFormLinktoTable_" + key + "' border=1></table>";
		    checkInstanceLinktoDiv.append(text);
	
	}
	
	ReservationUtils.setDefault_ConnectToDiv = function ( key   ){
		if(!key){
			console.log(" no Reservation key provided: cannot build the Connect to table  "); 
			return;
		}
	
		var checkInstanceConnecttoDiv = $( "#form_inst_connectto_" + key );
		    var text = '';
		    text += "<br /><table id='nodeFormConnecttoTable_" + key + "' border=1></table>";
		    checkInstanceConnecttoDiv.append(text);
	
	}

//====================================================================================================================================	
	
	ReservationUtils.retrievePropertiesSaveReservation = function (typeId){
		
		var properties=[];		
		console.log("%c Attempting to add a new Node for this type :" + typeId, "color:blue" );		
		// retrieve the Info

		properties = NodeUtils.retrieveNodePropertiesFromForm ( typeId , 'form_inst_add_val_');
		if(properties[properties.length-1]){
			console.log(" do not continue");
			return;
		}
		properties.pop();   // everything is fine remove boolean
		console.table(properties);
		new ReservationManagerRender().saveReservationCreated  (typeId, properties );
	}
	
	ReservationUtils.loopStackForSaving = function (){
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
				 ReservationUtils.retrievePropertiesSaveReservation (  last.sTypeId );

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
				    var ele          = document.getElementById('nodeInstParent_'+last.sTypeId);	
					var nodeUuid     = ele.options[ele.selectedIndex].value;
					if(!nodeUuid){
						console.log(" Missing Node UUid for the selected node ");
						$('#nodeInstParent_'+last.sTypeId).css("backgroundColor", "yellow");
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
	
	ReservationUtils.saveResInfo = function ( typeId ){
		console.log(" Inside the saving process ");
		if(!typeId ){
			console.log(" Missing Type Id for creation of Node instance ");
	        return;
			}	
		console.log("%c Creation of simple Node instance ", "color:blue");
		
		var properties=[];		
		console.log("%c Attempting to add a new Node for this type :" + typeId, "color:blue" );		
		

		properties = NodeUtils.retrieveNodePropertiesFromForm ( typeId , 'form_inst_add_val_');
		if(properties[properties.length-1]){
			console.log(" do not continue");
			return;
		}
		properties.pop();   // everything is fine remove boolean
		console.table(properties);
		
	}
	
	ReservationUtils.saveReservationInfo = function ( currentType ){
		console.log(" Inside the saving process ");
		if(!currentType ){
			console.log(" Missing Type Id for creation of Node instance ");
	        return;
			}		
		
		// loop through all available options 		
		ReservationUtils.loopStackForSaving();
		
//		createEdgeList = []; var last = null;
//		
//		historyNode.forEach(function ( element) {
//
//			 last = jQuery.extend({}, element);
//			 console.log("top element is :");
//			 console.log(last);
//		        // get the selection Create or Select
//			 
//			 var option = $('input[name="mustConn_'+last.typeId+'_for_'+last.currTypeId+'"]:checked').val();				
//			 console.log(" Type connection is : "+ option);
//			 if( option == 'create' ) {
//				     // create Parent 
//				    var properties=[];
//					
//					console.log("Attempting to add a new Node for this type :" + last.typeId );		
//					// retrieve the Info
////					properties = new ReservationManagerRender().retrievePropertiesFromCreate( last.typeId , 'form_inst_add_val_');	
//		            properties = NodeUtils.retrieveNodePropertiesFromForm ( last.typeId , 'form_inst_add_val_');
//					if(properties[properties.length-1]){
//						console.log(" do not continue");
//						return;
//					}
//					properties.pop();
//					console.table(properties);
//					new ReservationManagerRender().saveReservationCreated  (last.typeId, properties );
//					
//					if(!listInstUuids[0]){
//						console.log("failure in creating  node ");
//						return;
//					}
//					last.nodeUuid =  listInstUuids[0];
//					last.status   = 'pending';
//					createEdgeList.push(last);                    // save this for later			
//	 
//			 }else if( option == 'use' ) {
//				    var ele          = document.getElementById('nodeInstParent_'+last.typeId);	
//					var nodeUuid     = ele.options[ele.selectedIndex].value;
//					if(!nodeUuid){
//						console.log(" Missing Node UUid for the selected node ");
//						$('#nodeInstParent_'+last.typeId).css("backgroundColor", "yellow");
//						console.log("Cannot create a link between the node instance and its "+ last.typeIdcas +' for Type Id '+last.typeId);					
//						return;
//					}else {
//						// store the uuid for creating later the edge;
//						last.nodeUuid = nodeUuid;
//						last.status   = 'pending';
//						createEdgeList.push(last);                    // save this for later
//					}
//			
//			 }else {
//				 // error 
//				 $('input[name="mustConn_'+last.typeId+'_for_'+last.currTypeId+'"]').parent('td').css("backgroundColor", "yellow");
//				 console.log(" process of creation stopped with error highlighted");
//				 return;
//			 }
//			 last = {};
//		});
//		
		
		// this should create the node for the current Type 
		console.log("%c Creation of simple Node instance ", "color:blue");
		ReservationUtils.retrievePropertiesSaveReservation (  currentType );
		
		
//		console.log(" Creation of simple Node instance ");		 
//		var properties=[];
//		console.log("Attempting to add a new Node for this type :" + currentType );		
//		// retrieve the Info form the Form
////		properties = new ReservationManagerRender().retrievePropertiesFromCreate( currentType , 'form_inst_add_val_');
//		properties = NodeUtils.retrieveNodePropertiesFromForm ( currentType , 'form_inst_add_val_');
//		if(properties[properties.length-1]){
//			console.log(" do not continue");
//			return;
//		}
//		properties.pop();
//		console.table(properties);
//				
//		//==== SAVE NODE INSTANCE CREATED FOR THE CURRENT TYPE  
//		new ReservationManagerRender().saveReservationCreated (currentType, properties );
		
		//       increase the number next to TYPE
		ReservationUtils.setTotalNBType ( currentType );
		 
//		var nbSpan = document.getElementById("nb_"+currentType);
//		var nb     = typeMapViaId[currentType].nb;
//		nbSpan.innerHTML = nb;	
			
		// UPDATE ALL Elements in LIst to CREATE EDGES IF ANY withe new node Uuid	
		createEdgeList.forEach(function ( element) {
			if( element.currTypeId ==  currentType ){
				 if(!listInstUuids[0]){   element.status = 'error' }
				 else {
					 element.currNodeUuid = listInstUuids[0];
				 }
			}
		})
	
		// create all edges 
		 console.table(createEdgeList);
		 ReservationUtils.createEdges();
						
		 // Clear the Form for creation
		$('#work_addInstance').empty();	
			
		if(listInstUuids[0] != null) {( new ReservationManagerRender() ).addReservationInst (listInstUuids[0]);	}	
		( new ReservationManagerRender() ).selectedReservation( listInstUuids[0] );	
			
	}
		
//  Saving all edges at the end 
	ReservationUtils.createEdges = function( ){
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
							   ( new ReservationManagerRender() ).addNodeToParList(element.currNodeUuid, element.nodeUuid, dataEdge);
							   

						 }else if ( element.typeIdcas == 'asChild'){
							 NodeUtils.buildChildNodeDetail (  element.currNodeUuid, dataEdge);
							 ( new ReservationManagerRender() ).addNodeToChildList( element.currNodeUuid, element.nodeUuid, dataEdge);
							 
						 }else if ( element.typeIdcas == 'asSibling'){
							 NodeUtils.buildSiblingNodeDetail ( element.currNodeUuid, dataEdge, 'destination');
							 ( new ReservationManagerRender() ).addNodeToSibList(element.currNodeUuid, element.nodeUuid, dataEdge);
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
	
	ReservationUtils.showEdgeDetails = function (key,  connId ){
		
		var currInput = "";
		
		$('#form_inst_edgeDetails_'+key ).empty();
		
        currInput += "<br/><br/><table id='connectionPropDiv_" + connId + "' ><tr><th colspan='3'>View Edge Details</th></tr> ";
		var connInfo = connMapViaId[connId];
		$.each(connInfo, function(key, value) {
			if ((key == 'classification') || (key == 'origin')||(key == 'destination') ||( key == 'name') ||( key == 'minRel') || (key == 'maxRel')) {
				currInput += "<tr><th>" + key + "</th>";
				if( (key == 'name') ||( key == 'minRel')||(key == 'maxRel')) {
					currInput += "<td><input type='text' name='"+key+'_'+connId+"' id='"+key+'_'+connId+"' value='"+value+"' ></td><tr>";
				}else { 
					currInput += "<td><input type='text' name='"+key+"' value='"+value+"' disabled='disabled' ></td><tr>"; 
					}
			}			
			 
		});
		currInput += "<tr><td colspan='2'>"
		currInput += "<input type='button' name='Cancel' value='Cancel'  onclick='ReservationUtils.closeEdgeDetails(\""+key +"\")'></td</tr>";
		currInput += "</table>";
		$('#form_inst_edgeDetails_'+key ).append(currInput);
				
		ReservationUtils.showDivision("form_inst_edgeDetails_", key );
		
	}
	
	ReservationUtils.closeEdgeDetails = function( key ){
		
		ReservationUtils.hideDivision("form_inst_edgeDetails_", key);
		
	}
	
	ReservationUtils.addEdgeConn = function( keyOrigin ){

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
			 jsonData = NodeUtils.createEdgeJson(nodeMap[keyOrigin].typeId, keyOrigin,  typeId,  eleInst,   connId );
			 							
										
		 }else if(typeConnLink == 'asChild' ){
			 
			 jsonData = NodeUtils.createEdgeJson( typeId,  eleInst, nodeMap[keyOrigin].typeId, keyOrigin,  connId );
										
		 }
		
		 
		 var apiEdge  = new EdgeApis();
			
		var doneFunction = function ( dataEdge ){
			console.log("Edge created ");
			// add edge to edgeMap
			NodeUtils.AddEdgeToMap( dataEdge);	
				
			 if(typeConnLink == 'asParent' ){
				 NodeUtils.buildChildNodeDetail ( keyOrigin, dataEdge);
				 ( new ReservationManagerRender() ).addNodeToChildList(keyOrigin, eleInst, dataEdge);
			 }else {
				 NodeUtils.buildParentNodeDetail ( keyOrigin, dataEdge);
				 ( new ReservationManagerRender() ).addNodeToParList(keyOrigin, eleInst, dataEdge);
			 }
			 ReservationUtils.cancelConnectToInst(keyOrigin);		 
			
		}
		
		var failFunction = function (  xhr, status, error ){
			console.log('Error Edge not created: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Error Edge not created:"+ xhr.status+"</p>");	
		};
				
		apiEdge.saveEdge( jsonData,  doneFunction, failFunction );	 	 
	}

	ReservationUtils.addEdgeLink = function( keyOrigin ){
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
		
		 jsonData = NodeUtils.createEdgeJson(nodeMap[keyOrigin].typeId, keyOrigin,  typeId,  eleInst,   linkId );
				
		 
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
			 ( new ReservationManagerRender() ).addNodeToSibList(keyOrigin, eleInst, dataEdge.type);
			
			 ReservationUtils.cancelLinkToInst(keyOrigin);		
		}
		
		var failFunction = function (  xhr, status, error ){
			console.log('Error Edge not created: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Error Edge not created:"+ xhr.status+"</p>");	
		};
				
		apiEdge.saveEdge( jsonData,  doneFunction, failFunction );	 
	}

//========================================================================================================
//             FUNCTIONS USED FOR CREATING CHILDREN / PARENTS  / SIBLING 
//              TO DISPLAY LIST OF TYPES & INSTANCES  ACCORDINGLY
//=========================================================================================================
	ReservationUtils.buildTypeList = function ( nodeUuid, text ){
		
		if(!nodeUuid ){
			console.log(" no node uuid provided  in buildTypeList");
			return;
		}
		if(!text){
			console.log("No text provided: should be (Children/Parent/Sibling ");
			return;
		}
		
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
		
	ReservationUtils.buildTypeProperty =  function ( text,  combinedIds, nodeUuid){
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
		
		var workDiv = $('#td_'+nodeUuid);
		workDiv.empty();
		historyNode= [];
		createEdgeList = [];	
		ReservationUtils.createInstReservation( typeId, workDiv, historyNode );	
		
	}
	
	ReservationUtils.createInstReservation = function ( typeId, workDiv, listHistory ){
		
		var nodeRequired = ReservationUtils.verifyNodeRelations( typeId );
	
		if(listHistory.length > 0) {		
			  for( var i=0; i <nodeRequired.length ; i++){
				  if(listTypeIds[0] == nodeRequired[i].source.toString()) { nodeRequired.splice(i, 1); }  // to remove the loop to initial type
			  }
		}
		ReservationUtils.addFormCreateReservation (typeId,  workDiv, nodeRequired, listHistory );	

	}
	
	
	ReservationUtils.verifyNodeRelations = function(  typeId  ){
	      if(!typeId) {
	    	  console.log(" No type Id defined ");
	    	  return null;
	      }    
		   // looking for Parents  MUST Connections 
	      var listOfConnPar = []; 
	      var listOfConnChild = [];
	      var listOfLinkSibling = [];
	      
	      $.each( connMapViaId , function( key, value ) {      
	              if(value.classification == 'parentchild'){
	                      if( (typeId == value.target.toString() ) &&( value.minRel > '0'))      {  
	                    	           value.nodePos = 'asParent';
	                                   listOfConnPar.push(value);
	                           }else if ( (typeId == value.source.toString() ) &&( value.minRel > '0')){
	                        	       value.nodePos = 'asChild';
	                                   listOfConnChild.push(value);
	                           }
	              }else if (value.classification == 'link'){
	                                      if((typeId == value.target.toString() ) &&( value.minRel > '0')||(typeId == value.source.toString() ) &&( value.minRel > '0')){
	                                    	      value.nodePos = 'asSibling';
	                                              listOfLinkSibling.push(value);
	                          }
	              }else {
	                     Console.log(" Connection classification not defined "+value.classification ); // error 
	              }            
	      }); 
	      // to be added   --- IMPORTANT 
//	      var listOfRelated = {};
//	      listOfRelated['parent'] = listOfConnPar;
//	      listOfRelated['child'] = listOfConnChild;
//	      listOfRelated['sibling'] = listOfLinkSibling;
//	      return  listOfRelated;          
	      return  listOfConnChild;    
	      
		 }
	
//=====================================================================================================	
	
	ReservationUtils.addFormCreateReservation = function (typeId, workDiv, requiredNodes, listHistory ){              
	
		if(!typeId) {
	    	  console.log(" No type Id defined ");
	    	  return null;
	      }   
	
		var inputContentList = '';
		var element = {};
	
		
		// if we have any Must Connection/Link do the following
	    
		   if(requiredNodes.length){	   
		    inputContentList += '<p> Complete the Following to CREATE Node Instance for: <b>'+typeMapViaId[typeId].name +'</b></p>';
		    inputContentList += '<table border="2" class="addMustParent" >';
		    var line = '';
		    for( var i=0; i <requiredNodes.length ; i++){
		    	line += '<tr id="rowNodeParent_'+requiredNodes[i].target+'_for_'+typeId+'" >';
		    	var color = typeMapViaId[requiredNodes[i].target].color;
		    	line += '<td>'+ requiredNodes[i].nodePos+' is: <span class="badge" style="color:black; background:'+color+'">'+requiredNodes[i].destination +'</span></td>';
		    	line += '<td><input type="radio" name="mustConn_'+requiredNodes[i].target+'_for_'+ typeId+'"   value="create" onclick="ReservationUtils.showCreateDiv('+requiredNodes[i].target+', '+typeId+' )"/>Create New </br/>';
		    	line += '<input type="radio" name="mustConn_'+requiredNodes[i].target+'_for_'+ typeId+'"    value="use" onclick="ReservationUtils.showCreateDiv('+requiredNodes[i].target+', '+typeId+' )" />Select Instance</td>';
		    	
		    	line += '<td><div id="createParent_'+requiredNodes[i].target+'_for_'+typeId+'" style="display:none;visibility:hidden"></div>';	
		    	line += '<div id="nodeDisplay_'+requiredNodes[i].target+'_for_'+typeId+'" style="display:none;visibility:hidden"></div></td></tr>';

		    	inputContentList += line;
		    	line = '';
		    	
		    	element.currTypeId       = typeId;
		    	element.currNodeUuid = null;
		    	element.typeIdcas        = requiredNodes[i].nodePos;          // element.typeIdcas        = 'asChild';            // 
		    	element.sTypeId          = requiredNodes[i].target;
		    	element.typeConn         = requiredNodes[i].id;
		    	element.nodeUuid         = null;
		    	element.status           = 'pending';
		    	listHistory.push(element);
		    	element = {};    	
		    } 
		    inputContentList += '</table>';	
		   }
		
		 // Also in case of no Must connections/links just display the Add_Form_Inst_create
		 // add division for the node instance creation   
		 inputContentList +=  '<div id="addNodeInst_'+ typeId +'"><p> Proprietes for the Type '+typeMapViaId[typeId].name +'</p></div>';  
		 workDiv.append(inputContentList);
		   
//		 ReservationUtils.addFormInstCreate( $("#addNodeInst_"+typeId), typeId);
		 NodeUtils.addFormInstCreate( $("#addNodeInst_"+typeId), typeId);
		
	}
	
	
//==============================================================================================================================	
	ReservationUtils.buildTypeListConnect = function ( instId ){
		if(!instId){
			console.log(" no node uuid provided ");
			return;
		}
			
		// grab all connections where the Type of this instance is Source
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
			 inputTypeList = '<td valign="middle" class="childType" ><select id="childType_'+instId+'" onchange="ReservationUtils.buildTypeListInstanceConnect(\'child\',\''+ instId+'\');"><option value="">Select Children Type ...</option>';
			 if(listConnToChildren.length  >0 ){	
					
					for(var i=0; i< listConnToChildren.length ; i++){	
						var text ='(use: ';
						text += connMapViaId[listConnToChildren[i].connectionId].name +')';
						inputTypeList += '<option value="'+listConnToChildren[i].typeIdTarget+'|'+listConnToChildren[i].connectionId+'">'+typeMapViaId[listConnToChildren[i].typeIdTarget].name + '<b>'+text +'</b>)</option>';
					}
					inputTypeList +='</td></tr>';
				}else {
					inputTypeList = '<td> No Children available</td>';
					var  footer = '<td><input type="button"     value="Cancel" onclick="ReservationUtils.cancelConnectToInst(\''+ instId+'\');" /></td>';
					inputTypeList = inputTypeList + footer;
				}		
				
			    $('#nodeFormConnecttoTable_'+instId).find("td:not(:nth-child(1)),td:not(:nth-child(1))").remove();
				$('#nodeFormConnecttoTable_'+instId).find('tr:first').append( inputTypeList);		 
			 
		 };
		 if( valueSelected == 'asChild'){
			 
			 var tableInstConnDiv = $("#nodeFormConnecttoTable_" + instId );
			 var inputTypeList =''; 
			 inputTypeList = '<td valign="middle" class="parentType"><select id="parentType_'+instId+'"   onchange="ReservationUtils.buildTypeListInstanceConnect(\'parent\',\''+ instId+'\');" ><option value="">Select Parent Type ...</option>';
			 if(listConnToParent.length  > 0 ){	
				
					for(var i=0; i< listConnToParent.length ; i++){	
						var text ='(use: ';
						text += connMapViaId[listConnToParent[i].connectionId].name +')';
						inputTypeList += '<option value="'+listConnToParent[i].typeIdSource+'|'+listConnToParent[i].connectionId+'">'+typeMapViaId[listConnToParent[i].typeIdSource].name + '<b>'+text +'</b>)</option>';
					}
					inputTypeList +='</td>';
				}else {
					inputTypeList = '<td> No Children available</td>';
					
					var  footer = '<td><input type="button"     value="Cancel" onclick="ReservationUtils.cancelConnectToInst(\''+ instId+'\');" /></td>';
					inputTypeList = inputTypeList + footer;
					
				}		
			    $('#nodeFormConnecttoTable_'+instId ).find("td:not(:nth-child(1))").remove();
				$('#nodeFormConnecttoTable_'+instId).find('tr:first').append( inputTypeList);		 
			 
		 };	 
		
	}
    
	ReservationUtils.buildTypeListLink = function ( instId ){
		
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
			 inputTypeList = '<td valign="middle"><select id="linkType_'+instId+'"  onchange="ReservationUtils.buildTypeListInstanceLink(\''+ instId+'\');"     ><option value="">Select Sibling Type ...</option>';
			 if(listLinks.length  != 0 ){			
					for(var i=0; i< listLinks.length ; i++){	
						var text ='(use link: ';
						text += connMapViaId[listLinks[i].linkId].name +')';
						inputTypeList += '<option value="'+listLinks[i].typeIdtoLinkTo+'|'+listLinks[i].linkId+'">'+typeMapViaId[listLinks[i].typeIdtoLinkTo].name + '<b>'+text +'</b>)</option>';
					}
					inputTypeList +='</td>';
				}else {
					inputTypeList = '<td> No Children available';
					var  footer = '<input type="button"     value="Cancel" onclick="ReservationUtils.cancelLinkToInst(\''+ instId+'\');" /></td>';
					inputTypeList = inputTypeList + footer;
				}		
				
			    $('#nodeFormLinktoTable_'+instId).find("th:not(:nth-child(1)),td:not(:nth-child(1))").remove();
				$('#nodeFormLinktoTable_'+instId).find('tr:first').append( inputTypeList);				 	
	}

	
    ReservationUtils.buildTypeListInstanceConnect = function (text,  keyOrigin ){
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
					var footer  = '<td><input type="button"  value="Add"   onclick="ReservationUtils.addEdgeConn(\''+ keyOrigin+'\')" />';
						footer += '<input type="button"     value="Cancel" onclick="ReservationUtils.cancelConnectToInst(\''+ keyOrigin+'\');" /></td>';
					inputInstList = inputInstList + footer;
					$('#nodeFormConnecttoTable_'+keyOrigin).find('tr:first').append( inputInstList);	
					
				}else {  // no nodes Returned 
					
					inputInstList += '<td> No node available;  change your selection  </td>';
					inputInstList += '<td><input type="button"     value="Cancel" onclick="ReservationUtils.cancelConnectToInst(\''+ keyOrigin+'\');" /></td>';
					
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
	
    ReservationUtils.buildTypeListInstanceLink = function (keyOrigin ){
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
					var footer  = '<td><input type="button"  value="Add"    onclick="ReservationUtils.addEdgeLink(\''+ keyOrigin+'\')" />';
						footer += '<input type="button"      value="Cancel" onclick="ReservationUtils.cancelLinkToInst(\''+ keyOrigin+'\');" /></td>';
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


//=============================================================================================================================
    //    Creating New instances  -- these function are part of checking Must Parents/Children / Sibling Connections/links
    //
//============================================================================================================================
    ReservationUtils.showCreateDiv = function (parent, typeId){
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
    		ReservationUtils.createInstReservation(parent, $("#createParent_"+parent+"_for_"+typeId ), historyNode);
    		
    		//  -- hide the select option 
    		ReservationUtils.hideDivision('nodeDisplay_'+parent+'_for_', typeId);
    		// --  show the create option
    		ReservationUtils.showDivision('createParent_'+parent+'_for_', typeId);
    		
    	}else if (valueSelected == 'use'){
    	
    		// build the list of nodes 
    		$("#nodeDisplay_"+parent+"_for_"+typeId).empty();;
    		ReservationUtils.buildListNodes($("#nodeDisplay_"+parent+"_for_"+typeId), typeId, parent );
    		
    		// hide the create  option 
    		ReservationUtils.hideDivision('createParent_'+parent+'_for_', typeId);
    		// show the list to select from 
    		ReservationUtils.showDivision('nodeDisplay_'+parent+'_for_', typeId);	
    	}
    	       					    
    }
    
 // LOAD ALL NODES For PARENT TYPE SELECTED
    ReservationUtils.buildListNodes = function(div,  typeId, typeParent ){                   // based on type selected load existing node Instances and display these
   	
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
	   		if ( data.nodes.length  > 0 ){	
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
//****************************************************************************	
//	FUnctions for Cancel Buttons 
//*****************************************************************************
	ReservationUtils.createReservation_cancel = function( typeId){
		if(!typeId){
			console.log(" no type given: cannot cancel create Instance  "); 
			return;
		}
			
		console.log("Attempting to Cancel :" + typeId );		

		$('#work_addInstance').empty();
		historyNode = [];
		createEdgeList = [];

	}
	
    ReservationUtils.updateReservation_cancel = function ( key ){	
		// hide Edit Form		
		ReservationUtils.hideDivision ("form_inst_edit_", key  );	

		// show View Form
		ReservationUtils.showDivision ("form_inst_", key  );	
		
	};	
	
	ReservationUtils.cancelAddChild = function(){
		historyNode = [];		
		if($( ".addChildNodeRow" ).length >  0) {
			console.warn("FOUND  : " + $( ".addChildNodeRow" ).length + " previous rows for Add Child Node! Clearing these");		
			// previous created rows not deleted
			var div = $(".addChildNodeRow");			
			div.remove();
		}	
	}

	ReservationUtils.cancelAddSib = function(){
		
		historyNode = [];
		if($( ".addSibNodeRow" ).length > 0) {
			console.warn("FOUND  : " + $( ".addChildNodeRow" ).length + " previous rows for Add Sibling Node! Clearing these");
			var div = $(".addSibNodeRow");			
			div.remove();
		}	
	}

	ReservationUtils.cancelAddPar =function(){
		historyNode = [];
		if($( ".addParNodeRow" ).length > 0) {
			console.warn("FOUND  : " + $( ".addChildNodeRow" ).length + " previous rows for Add Parent Node! Clearing these");
			var div = $(".addParNodeRow");			
			div.remove();
		}	
	}
	
	
	ReservationUtils.cancelLinkToInst = function ( instId ){		
		( new ReservationManagerRender() ).displayLinkTo(instId);	
	}

	ReservationUtils.cancelConnectToInst  = function ( instId ){	
		( new ReservationManagerRender() ).displayConnectTo(instId);		
	}

//===============================================================================================================================	
	ReservationUtils.clearAddRow = function(){
		ReservationUtils.cancelAddChild();
		ReservationUtils.cancelAddSib();
		ReservationUtils.cancelAddPar();
		
	 }
		
//===================================================================================================
	ReservationUtils.showDivision = function ( divName, divId ){
		
		var instDiv = document.getElementById(divName + divId );
		if( instDiv != null ) {
			instDiv.style.display = "block";
			instDiv.style.visibility = "visible";
		} else {
			// nothing to show?
			console.log(" no division to show ");
		}		
	 }
	
	ReservationUtils.hideDivision = function ( divName, divId ){
		
		var instDiv = document.getElementById(divName + divId );
		if( instDiv != null ) {
			instDiv.style.display = "none";
			instDiv.style.visibility = "hidden";
		} else {
			// nothing to hide?
			console.log(" no division to hide ");
		}		
	 }	

//===================================================================================================================================================
	ReservationUtils.errorDisplay = function  (errorMessage ){
		if(errorMessage) {
			$('#console-log').append(errorMessage);
			console.log('%c'+errorMessage, 'background: #F90; color: red');
		}
    }

	ReservationUtils.setTotalNBType = function ( typeId ){
		
		var nbSpan = document.getElementById("nb_"+typeId);	
		var nb     = typeMapViaId[typeId].nb;	
		nbSpan.innerHTML = nb;	
	}

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& NEW CODE &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    ReservationUtils.buildSearchRoomForm = function( divToAppend ){
		
		// load all hotels -- display select 
        var hotelOptions =  ReservationUtils.buildHotelsList();
        if(!hotelOptions){
        	console.error(" can not create reservation ");
        	document.getElementById('path').innerHTML = "<p style='color:red'>Cannot Create reservation no hotel instances</p>";
        	return;
        }
		
		var inputSearchText  = '', inputResultText = '';
		var inputSearch      =  '<div class="search" >';
		
		    inputSearchText += '<div id="searchDates" ><h3>Reservation Details:</h3>';

		    //  section to display Hotel selection
		    inputSearchText += '<div  class="form-group" >';
		    inputSearchText += '<label>Select Hotel : </label><select  class="form-control"  id="hotel_selected">'+hotelOptions+'</select>';
		    inputSearchText += '</div>';
		    // section for check-in & check-out dates
		    inputSearchText += '<div class="form-group">';		 
		    inputSearchText += '<label class="control-label">Check-in :</label>';	    
		    inputSearchText += '<div  class="input-group input-append date ">';
		    inputSearchText += '<input  type="text"  class="form-control" id="from_date"   placeholder="  mm/dd/yyyy" />  ';
		    inputSearchText += '<span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>';
		    inputSearchText += '</div></div>';
		    
		    inputSearchText += '<div class="form-group">';		 
		    inputSearchText += '<label class="control-label">Check-out  :</label>';	
		    inputSearchText += '<div  class="input-group input-append date ">';	
		    inputSearchText += '<input  type="text"  class="form-control"  id="to_date"   placeholder="  mm/dd/yyyy" /> ';
		    inputSearchText += '<span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>';
		    inputSearchText += '</div></div>';
		    
		    // section for search button 
		    inputSearchText += '<div  class="form-group" id="searchButton"  align="center" ><br/>';
		    inputSearchText += '<button type="sudmit" class="btn btn-primary "  onclick="ReservationUtils.searchRoom();"  >';
		    inputSearchText += '<span class="glyphicon glyphicon-search"></span>Search</button>';	  
		    inputSearchText += '<button type="reset"  class="btn btn-primary "  onclick="ReservationUtils.cancelSearch();" >Cancel</button></div>';
		      		    
		    inputSearchText += '</div>';  // end  searchDates
		    
		    inputResultText += '<div   id="resultSearch" style="display:none;visibility:hidden"  >';
		    inputResultText += '<h3 class="heading">Room available</h3>';
		    inputResultText += '<div  class="form-group" id="room_list"></div>';	    	    	    
		    inputResultText += '</div>';  // end result div	  
		    
		    inputResultText += '<div id="resultReserve" style="display:none;visibility:hidden">';
		    inputResultText += '</div>'
		    		    
		    inputResultText += '</div>';  // end search div
		    			    	    	    
		    inputSearch = inputSearch + inputSearchText  +  inputResultText;		
		    
		    divToAppend.append(inputSearch);
		    ReservationUtils.setDates();
			
	}

	ReservationUtils.buildHotelsList = function( ){
		var inputList ='';
		var hotelId = NodeUtils.findTypeID('HOTEL');	
		if(!hotelId){
			console.error(" Did not Found  TypeId for HOTEL ; Process Aborted; ");
			document.getElementById('path').innerHTML = "<p style='color:red'>No Hotel TYPE defined!! Process Halted</p>";	
			return;
		}
		// keep a copy of Reservation existing Nodes -- getAllInstances of 'HOTEL' will empty this
		var currentNodeMap = jQuery.extend({}, nodeMap);
		// get All Hotel Instances
		var tmpHotels = GlobalTypeInstanceUtils.getAllInstances( hotelId );
		// Combine Reservation Nodes with Hotel Nodes
		$.extend( true, nodeMap, currentNodeMap )
		console.log("Attempting to create Reservation :" );	
		// build the options for select Hotel			
		inputList ='<option value="" >Select Hotel: </option>'; 
		// loop through Hotel Instances to Build the Options   --- Rem if a node does not have uuid it will be skipped
		if ( tmpHotels   ){	
			console.log(tmpHotels);			 
			$.each(tmpHotels, function(key, value){
				var uuid     = NodeUtils.findUUID( value );	
				if(!uuid){                                                     // Process is not halted -- just skip Node
					console.log(" Could not find the Node uuid ");
					return;
				}
			    var instName = NodeUtils.findNameInst( value);		    
		        NodeUtils.AddNodeToMap(value);
		        inputList += '<option value='+uuid+'>'+ instName +'</option>';  							
			});			
			
		}else {  // no Hotel instances were found  
			
			inputList += 'No Hotel available;';
			console.error("Can Not proceed with reservation. No Hotel Founds");
			return null;
			
		}			
		return inputList;
    }

	
	ReservationUtils.searchRoom = function(){
		// get the hotel 
	
		document.getElementById('hotel_selected').style.background = '';
			
		var ele               = document.getElementById('hotel_selected');	
		var hotelUuid         = ele.options[ele.selectedIndex].value;
		if(!hotelUuid){
			console.error("no Hotel selected"+hotelUuid);
			document.getElementById('hotel_selected').style.background = 'yellow';
			return;
		}
		console.log(" Selected is : "+ hotelUuid);
		
		// get the check-in date
		var date_in    = document.getElementById('from_date').value;
		var errorin = ((GlobalUtils.isDate(date_in))) ? false : true;
		if(!date_in || errorin){
			console.error("no Checkin date  selected -- entered value is not a date"+date_in);
			document.getElementById('from_date').style.background = 'yellow';
			return;
		}
		console.log(" date_in Selected is : "+ date_in);
		
		//get the check-out date
		var date_out   = document.getElementById('to_date').value;
		var errorout = ((GlobalUtils.isDate(date_out))) ? false : true;
		if(!date_out || errorout){
			console.error("no Checkout date  selected -- entered value is not a date  "+date_out);
			document.getElementById('to_date').style.background = 'yellow';
			return;
		}
		console.log(" Date_out Selected is : "+ date_out);
		
		var dates =  NodeUtils.getRangeDates(date_in, date_out);				
		console.log(dates);
		
		
		var jsonData    = {}; 
		var properties  = []; 
		var typeIds     = [];
		var entryNode   = {};
		
		//  START FROM :  EntryNode is Hotel uuid and typeId
        var hotelProperty = NodeUtils.createSysJson( hotelUuid);	        
		typeIds.push(Number(nodeMap[hotelUuid].typeId));
		properties.push(hotelProperty);			
		entryNode["typeIds"]    = typeIds;		
		entryNode["systemProperties"] = properties;		
		jsonData["entryNode"] =  entryNode;
		
		// GO TO : Room typeId and dates
        var roomId = NodeUtils.findTypeID('ROOM');		
		if(!roomId){
			console.error(" Did not Found  Room Id for ; Process Aborted; "); 
			return;
		}
		typeIds = [];
		typeIds.push(Number(roomId));		
		jsonData["typeIds"]   = typeIds;
	
		var workDiv = document.getElementById('resultReserve');
	    workDiv.style.display = 'none';
	    workDiv.style.visibility = 'hidden';
		
		console.log(jsonData);
		
		var divToAppend = $('#room_list');
		divToAppend.empty();
		
		var successFunction = function( data ) {		

	   		if ( data.nodes.length  > 0 ){	
	   		    console.log(data.nodes);
	   		
	   			$.each(data.nodes, function(key, value){
	   				   				
	   				ReservationUtils.buildRoomDisplay( key, value ,divToAppend, hotelUuid , date_in, date_out);
		
	   			});  
	         
	   		 var footer = '<input type="submit"  class="form-control btn btn-primary " id="reserve"  value="Book" onclick="ReservationUtils.saveReservation();" / >';
	   		 
	   		divToAppend.append(footer);
	   		
	   		}else {
	   			inputSelect = 'NO Room available -- For The date provided -  Change your dates ';
	   		
	   			divToAppend.append(inputSelect);
	   		
	   		}		
	   		
	   		var row = document.getElementById('resultSearch');
   			row.style.display = "block";
   			row.style.visibility = "visible";

	   		
		};	
		var failFunction = function( xhr, status, error ) {
			console.error('Not able to load related  Bed Details: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Not able to load related Bed Details: "+ xhr.status+"</p>");	
		};	
		var nodeApi = new NodeApis();
		
		nodeApi.getNodesFromEntryNode(jsonData, successFunction, failFunction);	
			
		
	}   
//#########################################################################################################
	ReservationUtils.buildRoomDisplay = function ( key, value, appendToDiv, hotelUuid, dateIn, dateOut ){
		NodeUtils.AddNodeToMap( value);
			
		var uuid     = NodeUtils.findUUID( value );	
		if(!uuid){
			console.log(" Could not find the Node uuid ");
			return;
		}
	    var instName = NodeUtils.findNameInst( value);
//	    var capacity = NodeUtils.findPropertyValue( value, 'occupancy');
//	    var price    = NodeUtils.findPropertyValue( value, 'Price')
		
	    if (document.getElementById('room_'+uuid) == undefined || document.getElementById('room_'+uuid) == null) {
			//                          elementType, elementId,                 className,     visibility, display, innerHtml
			ReservationUtils.createAppendHTMLEntity('div', 'room_'+uuid , 'flex-item', 'visible', 'block', '', appendToDiv);
		}
	    
		roomBody = $('#room_'+uuid);
		
		var inputRoom = '';
//		    inputRoom += '<form id="buttonGroupForm" method="post" class="form-horizontal">';
//		    inputRoom += '<div class="item_photo" style="display:in-line">';
		    inputRoom += '<div class="form-group">';
		    inputRoom += '<div class="radio"><label><input type="radio"   name="room" value="uuid_'+uuid+'" > Selected</label>';
		    inputRoom += '<input type="hidden" id="hotelUuid" value="'+hotelUuid+'"/>';
		    inputRoom += '<input type="hidden" id="dateIn_'+uuid+'" value="'+dateIn+'"/>';
		    inputRoom += '<input type="hidden" id="dateOut_'+uuid+'" value="'+dateOut+'"/>';
		    inputRoom += '</div>';
		    
		    inputRoom += '<div class="item_content" style="display:in-line" >';	
		    inputRoom += '<form class="form-inline">';
		    inputRoom += '<div  class="form-group"><input  type="text"  class="form-control" id="roomName"   value="'+instName+'"  disabled />';	    
//		    inputRoom += '<input  type="text"  class="form-control" id="capacity"   value="'+capacity+'"  disabled />';	    
//		    inputRoom += '<input  type="text"  class="form-control" id="price"   value="CN$'+price+'"  disabled />';	    
		    inputRoom += '</div></form></div>';
		
		roomBody.html(inputRoom);
		
		appendToDiv.append(roomBody);
		
	}
	
	ReservationUtils.saveReservation = function(  ){
		// get HotelUuid
		// get Date Range
		// get Room uuid
		reservationInfo = {};
		//**********************************************************************************   ROOM 
		var roomUuid  = $('input[name=room]:checked').val();
		if(!roomUuid){
			$('input[name=room]').addClass('has-error');
			console.log("no room selected   "+roomUuid);
			
			return;
		}
		roomUuid = roomUuid.substr(5);	
		
		var roomProperty     = NodeUtils.BuildPropertyJson(null, 'uuid', roomUuid, 'STRING');
		reservationInfo.room   = roomProperty;
		//***********************************************************************************	HOTEL	
		var hotelUuid      = document.getElementById('hotelUuid').value;	
		if(!hotelUuid){
			console.error("no Hotel selected"+hotelUuid);
			return;
		}
		var hotelProperty   = NodeUtils.BuildPropertyJson('uuid', 'uuid', hotelUuid, 'STRING');	
		reservationInfo.hotel = hotelProperty;
		//**********************************************************************************    STAY	
		// CREATE  a stay Node
		var properties = [];
		var stayId = NodeUtils.findTypeID('STAY');
		if(!stayId){
			console.error("type STAY not created yet. Cannot proceed !!! ");
			return;
		}
		//**********************************************************************************	DATE_IN	
		// get the check-in date
		var date_in        = document.getElementById('dateIn_'+roomUuid).value;
		var errorin = ((GlobalUtils.isDate(date_in))) ? false : true;
		if(!date_in || errorin){
			console.error("no Checkin date  selected -- entered value is not a date"+date_in);
			return;
		}
		var dateIn_ID        = NodeUtils.findPropertyID(stayId,'CheckIn');
		var dateInProperty   = NodeUtils.BuildPropertyJson(dateIn_ID, 'CheckIn', date_in, 'DATE');
		reservationInfo.dateIn  = dateInProperty;
		//*********************************************************************************     DATE_OUT
		//get the check-out date
		var date_out   = document.getElementById('dateOut_'+roomUuid).value;
		var errorout = ((GlobalUtils.isDate(date_out))) ? false : true;
		if(!date_out || errorout){
			console.error("no Checkout date  selected -- entered value is not a date  "+date_out);
			return;
		}		
		var dateOut_ID       = NodeUtils.findPropertyID(stayId,'CkeckOut');
		var dateOutProperty  = NodeUtils.BuildPropertyJson(dateOut_ID, 'CkeckOut', date_out, 'DATE');		
		reservationInfo.dateOut = dateOutProperty;
		//********************************************************************************     DATE RANGE
        var dates =  NodeUtils.getRangeDates(date_in, date_out);
		reservationInfo.rangeDates =  dates;
		
		var row = document.getElementById('resultSearch');
			row.style.display = "none";
			row.style.visibility = "hidden";
		
		//********************************************************************************	
			
			
			
			
			
		
		// build json 
		var workDiv = document.getElementById('resultReserve');
		    workDiv.style.display = 'block';
		    workDiv.style.visibility = 'visible';
		historyNode = []; 
		var typeId = listTypeIds[0];
		ReservationUtils.createInstReservation( typeId, workDiv, historyNode );
		
		
		
		
		 ReservationUtils.addFormInstCreate( $("#addNodeInst_"+typeId), typeId);	
		
		
		
		
		
		
		 var footer  = '<tr align="center"><td colspan="2"><input type="button"  name="submit" class="btn btn-primary btn-xs"   id="addNodeInst_submit_' + typeId+ '" value="Add Instance" onclick="HotelUtils.saveHotelInfo('+typeId+');"/>';		
         footer += '<input type="button"   name="cancel" id="addNodeInst_cancel_' + typeId + '" value="Cancel" onclick="HotelUtils.createHotel_cancel(' + typeId + ');"/></td></tr>';   		    
	    $('#addNodeInst_'+typeId+' table ').append(footer);
		
	  
		
//		
//					
//		console.log(" Hotel is: "+ hotelUuid+ " room is  : "+roomUuid+" for the start date :"+date_in+ " and end date : "+ date_out);
//	
//		
//		
//		properties.push(dateInProperty, dateOutProperty );
//		console.table(properties);
//		new ReservationManagerRender().saveReservationCreated  (stayId, properties );
//		if(!listInstUuids[0]){
//			console.error("creation of stay failed . Cannot proceed !!! ");
//			return;
//		}
//		var destNodeUuid = listInstUuids[0];
//        listInstUuids = [];
//        
	    
	    
	    
	    
	    
	    
//        var input = '';
//          
//        
//        
//        
//        
//        
//        
//        
//		// CREATE a Res Node 
//		properties = [];
//		var typeId = listTypeIds[0];
//		
//		var res_ID          = NodeUtils.findPropertyID(typeId,'resId');
//		var resProperty     = NodeUtils.BuildPropertyJson(res_ID, 'resId', resId, 'STRING');
//		
//		var dateIn_ID        = NodeUtils.findPropertyID(typeId,'check_in');
//		var dateOut_ID       = NodeUtils.findPropertyID(typeId,'check_out');
//		var dateInProperty   = NodeUtils.BuildPropertyJson(dateIn_ID, 'check_in', date_in, 'DATE');
//		var dateOutProperty  = NodeUtils.BuildPropertyJson(dateOut_ID, 'check_out', date_out, 'DATE');
//		
//		
//		var hotelProperty   = NodeUtils.BuildPropertyJson('uuid', 'uuid', hotelUuid, 'STRING');
//		properties.push(resProperty,dateInProperty, dateOutProperty );
//		console.table(properties);
//		
//		new ReservationManagerRender().saveReservationCreated  (typeId, properties );
//		
//		if(!listInstUuids[0]){
//			console.error("creation of reservation failed . Cannot proceed !!! ");
//			return;
//		}
//		
//		GlobalUtils.addNBTypeInstances(nodeMap[listInstUuids[0]]);
//		var nbSpan = document.getElementById("nb_"+typeId);
//		var nb     = typeMapViaId[typeId].nb;
//		nbSpan.innerHTML = nb;	
//		
//		$('div.work_addInstance').empty();	
//		if(listInstUuids[0] != null) {( new ReservationManagerRender() ).addReservationInstToList (listInstUuids[0]);	}
//	
//		( new ReservationManagerRender() ).selectedReservation(listInstUuids[0]);
//		
//		
//		// create edges from stay Node to room Node
//		var connId = GlobalConnUtils.findConnsBySourceAndTarget( typeId, stayId );
//		( new ReservationManagerRender() ).saveEdge( listInstUuids[0], destNodeUuid, connId[0].id );	
//		
//		// update the interface with new node 
//		if(listEdgeUuids[0]) {
//			NodeUtils.buildChildNodeDetail ( listInstUuids[0],listEdgeUuids[0]);
//			( new ReservationManagerRender() ).addNodeToChildList(listInstUuids[0], destNodeUuid, listEdgeUuids[0]);
//		}
		
		
		
		
	}
	
	
	
	
	
	
	ReservationUtils.getAllDays = function (from_date, to_date){

		  var current_date = new Date(from_date);
		  var end_date     = new Date(to_date);
	
		  console.log( current_date +"   "+ end_date)
		  var getTimeDiff = Math.abs(current_date.getTime() - end_date.getTime());
		  var date_range = Math.ceil(getTimeDiff / (1000 * 3600 * 24)) + 1 ;
	
		  var weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
		  var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
		  var dates = new Array();
	
		  for (var i = 0; i <= date_range; i++) {
		     var getDate, getMonth = '';
	
		     if(current_date.getDate() < 10) { getDate = ('0'+ current_date.getDate());}
		     else{getDate = current_date.getDate();}
	
		    if(current_date.getMonth() < 9) { getMonth = ('0'+ (current_date.getMonth()+1));}
		    else{getMonth = current_date.getMonth();}
	
		    var row_date = {day: getDate, month: getMonth, year: current_date.getFullYear()};
		    var fmt_date = {weekDay: weekday[current_date.getDay()], date: getDate, month: months[current_date.getMonth()]};
		    var is_weekend = false;
		    if (current_date.getDay() == 0 || current_date.getDay() == 6) {
		        is_weekend = true;
		    }
		    dates.push({row_date: row_date, fmt_date: fmt_date, is_weekend: is_weekend});
		    current_date.setDate(current_date.getDate() + 1);
		 }
		 return dates;
		}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	ReservationUtils.setDates = function(){
		 
	    var dateFormat = "mm/dd/yy",
	    from = $( "#from_date" )
	      .datepicker({
	    	  minDate    : 0,
		      defaultDate: "+1w",
		      changeMonth: true,
		      numberOfMonths: 2
	      })
	      .on( "change", function() {
	        to.datepicker( "option", "minDate", getDate( this ) );
	      }),
	    to = $( "#to_date" ).datepicker({
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
