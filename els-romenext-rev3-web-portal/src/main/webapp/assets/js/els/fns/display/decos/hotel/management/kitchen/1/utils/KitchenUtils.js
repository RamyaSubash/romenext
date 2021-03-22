function KitchenUtils() {
	
}

	KitchenUtils.createHTMLEntity = function( elementType, elementId, className, visibility, display, innerHtml) {
			
			var newElement = document.createElement( elementType );
			newElement.id = elementId;
			newElement.className = className;
			newElement.style.visibility = visibility;
			newElement.style.display = display;
			newElement.innerHTML = innerHtml;
			
			return newElement;
	}
	
	KitchenUtils.createAppendHTMLEntity = function( elementType, elementId, className, visibility, display, innerHtml, appendToDiv) {
		
		var newElement = document.createElement( elementType );
		newElement.id = elementId;
		newElement.className = className;
		newElement.style.visibility = visibility;
		newElement.style.display = display;
		newElement.innerHTML = innerHtml;
		
		appendToDiv.append(newElement);
	}

//===================================================================================================================================
	KitchenUtils.addDivsForAKitchenDetails = function( instHolderDiv , key ) {	
		/**
		 * THIS IS FOR THE INFO OF THE INSTANCE
		 */
		var checkInstanceDiv = $( "#form_inst_" + key );	
		if( checkInstanceDiv == null || checkInstanceDiv.length == 0 ) {	
			KitchenUtils.createAppendHTMLEntity('div', 'form_inst_'  + key, 'form_inst', 'hidden', 'none', '',  instHolderDiv);		
			checkInstanceDiv = $( "#form_inst_" + key );
		}	
		/**
		 * THIS IS FOR THE EDITING OF  INSTANCE PROPERTIES
		 */
		var checkInstanceEditDiv = $( "#form_inst_edit_" + key );	
		if( checkInstanceEditDiv == null || checkInstanceEditDiv.length == 0 ) {		
			KitchenUtils.createAppendHTMLEntity('div', 'form_inst_edit_'  + key, 'form_inst_edit', 'hidden', 'none', '', instHolderDiv);		
			checkInstanceEditDiv = $( "#form_inst_edit_" + key );
		}		
		/**
		 * THIS IS FOR THE CHILDREN OF THE INSTANCE
		 */
		var checkInstanceChildDiv = $( "#form_inst_children_" + key );
		if( checkInstanceChildDiv == null || checkInstanceChildDiv.length == 0 ) {	
			KitchenUtils.createAppendHTMLEntity('div', 'form_inst_children_'  + key, 'form_inst_children', 'hidden', 'none', '', instHolderDiv);	
			checkInstanceChildDiv = $( "#form_inst_children_" + key );
		}	
		/**
		 * THIS IS FOR THE PARENT OF THE INSTANCE
		 */
		
		var checkInstanceParDiv = $( "#form_inst_parent_" + key );	
		if( checkInstanceParDiv == null || checkInstanceParDiv.length == 0 ) {		
			KitchenUtils.createAppendHTMLEntity('div', 'form_inst_parent_'  + key, 'form_inst_parent', 'hidden', 'none', '',  instHolderDiv);
			checkInstanceParDiv = $( "#form_inst_parent_" + key );
		}	
		/**
		 * THIS IS FOR THE SIBLING OF THE INSTANCE
		 */	
		var checkInstanceSibDiv = $( "#form_inst_sibling_" + key );	
		if( checkInstanceSibDiv == null || checkInstanceSibDiv.length == 0 ) {		
			KitchenUtils.createAppendHTMLEntity('div', 'form_inst_sibling_'  + key, 'form_inst_sibling', 'hidden', 'none', '',  instHolderDiv);
			checkInstanceSibDiv = $( "#form_inst_sibling_" + key );
		}
		/**
		 * THIS IS FOR LINKING TO ANOTHER EXISTING INSTANCE
		 */	
		var checkInstanceLinktoDiv = $( "#form_inst_linkto_" + key );	
		if( checkInstanceLinktoDiv == null || checkInstanceLinktoDiv.length == 0 ) {
			// no div found, create it
			KitchenUtils.createAppendHTMLEntity('div', 'form_inst_linkto_'  + key, 'form_inst_linkto', 'hidden', 'none', '', instHolderDiv);			
			checkInstanceLinktoDiv = $( "#form_inst_linkto_" + key );
		}	
		/**
		 * THIS IS FOR CONNECTING  TO ANOTHER EXISTING INSTANCE
		 */	
		var checkInstanceConnecttoDiv = $( "#form_inst_connectto_" + key );	
		if( checkInstanceConnecttoDiv == null || checkInstanceConnecttoDiv.length == 0 ) {		
			KitchenUtils.createAppendHTMLEntity('div', 'form_inst_connectto_'  + key, 'form_inst_connectto', 'hidden', 'none', '',  instHolderDiv);
			checkInstanceConnecttoDiv = $( "#form_inst_connectto_" + key );
		}	
		
		/**
		 * THIS IS FOR Displaying SELECTED EDGE 
		 */	
		var checkInstanceConnecttoDiv = $( "#form_inst_edgeDetails_" + key );	
		if( checkInstanceConnecttoDiv == null || checkInstanceConnecttoDiv.length == 0 ) {		
			KitchenUtils.createAppendHTMLEntity('div', 'form_inst_edgeDetails_'  + key, 'form_inst_edgeDetails', 'hidden', 'none', '',  instHolderDiv);
			checkInstanceConnecttoDiv = $( "#form_inst_edgeDetails_" + key );
		}	
		
		
	}

//=====================================================================================================================================

	KitchenUtils.setDefault_ChildrenDiv = function ( key   ){
		if(!key){
			console.log(" no Kitchen key provided: cannot build the create children table  "); 
			return;
		}
	
		var checkInstanceChildDiv = $( "#form_inst_children_" + key );
		    var text = '';
		    text += "<br/><table id='nodeFormChildTable_" + key + "' border=1><tr><th>Children</th>";
//		    text += "<td colspan='2' class='create_icon' onclick='( new KitchenManagerRender() ).addChildNodeForm(\"" + key + "\")'>";
//		    text += "<img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td><td id='listTypeChildren_"+key+"'></td></tr></table>";
		    text += "<td id='listTypeChildren_"+key+"'></td></table>";
		    
		checkInstanceChildDiv.append(text);
	
	}
	
	KitchenUtils.setDefault_ParentDiv = function ( key   ){
		if(!key){
			console.log(" no Kitchen key provided: cannot build the create Parent table  "); 
			return;
		}
	
		var checkInstanceParDiv = $( "#form_inst_parent_" + key );
		    var text = '';
		    text += "<br /><table id='nodeFormParTable_" + key + "' border=1><tr><th>Parent</th>";
//		    text += "<td colspan='2' class='create_icon' onclick='( new KitchenManagerRender() ).addParNodeForm(\"" + key + "\")'>";
//		    text += "<img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td><td id='listTypeParents_"+key+"'></td></tr></table>";
		    text += "<td id='listTypeParents_"+key+"'></td></table>";
		    
	    checkInstanceParDiv.append(text);
	
	}
	
	KitchenUtils.setDefault_SiblingDiv = function ( key   ){
		if(!key){
			console.log(" no Kitchen key provided: cannot build the create Sibling table  "); 
			return;
		}
	
		var checkInstanceSibDiv = $( "#form_inst_sibling_" + key );
		    var text = '';
		    text += "<br /><table id='nodeFormSibTable_" + key + "' border=1><tr><th>Sibling</th>";
//		    text += "<td colspan='2' class='create_icon' onclick='( new KitchenManagerRender() ).addSibNodeForm(\"" + key + "\")'>";
//		    text += "<img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td><td id='listTypeSiblings_"+key+"'></td></tr></table><br />";
		    text += "<td id='listTypeSiblings_"+key+"'></td></table>";
	    checkInstanceSibDiv.append(text);
	
	}

	KitchenUtils.setDefault_LinktoDiv = function ( key   ){
		if(!key){
			console.log(" no Kitchen key provided: cannot build the Link To table  "); 
			return;
		}
	
		var checkInstanceLinktoDiv = $( "#form_inst_linkto_" + key );
		    var text = '';
		    text += "<br /><table id='nodeFormLinktoTable_" + key + "' border=1></table>";
		    checkInstanceLinktoDiv.append(text);
	
	}
	
	KitchenUtils.setDefault_ConnectToDiv = function ( key   ){
		if(!key){
			console.log(" no Kitchen key provided: cannot build the Connect to table  "); 
			return;
		}
	
		var checkInstanceConnecttoDiv = $( "#form_inst_connectto_" + key );
		    var text = '';
		    text += "<br /><table id='nodeFormConnecttoTable_" + key + "' border=1></table>";
		    checkInstanceConnecttoDiv.append(text);
	
	}

//====================================================================================================================================	
	

	KitchenUtils.saveKitchenInfo = function ( currentType ){
		console.log(" Inside the saving process ");
		if(!currentType ){
			console.log(" Missing Type Id for creation of Node instance ");
	        return;
			}		
			
		// this should create the node for the current Type 
			
		console.log(" Creation of simple Node instance ");		 
		var properties=[];
		console.log("Attempting to add a new Node for this type :" + currentType );		
		// retrieve the Info form the Form		
		properties = NodeUtils.retrieveNodePropertiesFromForm ( currentType , 'form_inst_add_val_');
		if(properties[properties.length-1]){
			console.log(" do not continue");
			return;
		}
		properties.pop();
		console.table(properties);
				
		//==== SAVE NODE INSTANCE CREATED FOR THE CURRENT TYPE  
		new KitchenManagerRender().saveKitchenCreated (currentType, properties );
		
		
		var nbSpan = document.getElementById("nb_"+currentType);
		var nb     = typeMapViaId[currentType].nb;
		nbSpan.innerHTML = nb;	
				
		 // Clear the Form for creation
		$('#work_addInstance').empty();	
			
		if(listInstUuids[0] != null) {( new KitchenManagerRender() ).addKitchenInst (listInstUuids[0]);	}	
		( new KitchenManagerRender() ).selectedKitchen( listInstUuids[0] );	
			
	}
		
//  Saving all edges at the end 
	KitchenUtils.saveEdges = function( ){
		// LOOP Through the list to Create All required edges if ANY
		var  jsonData = {};
		createEdgeList.forEach(function ( element) {
			
			if(element.status == 'pending'){                                // avoid all error records if any
				jsonData = {};
				if( element.typeIdcas == 'asParent' || element.typeIdcas == 'asSibling'){	
					
					  jsonData = NodeUtils.createEdgeJson(element.typeId, element.nodeUuid, element.currNodeUuid,element.currTypeId,element.typeConn  );
				
			    }else {
			    	 jsonData = NodeUtils.createEdgeJson( element.currNodeUuid, element.currTypeId, element.typeId, element.nodeUuid,  element.typeConn  );
			    	
			    }
				var apiEdge  = new EdgeApis();
				
				var doneFunction = function ( dataEdge ){
					if(!$.isEmptyObject(dataEdge)){
						console.log("Edge created ");
						// add edge to edgeMap
						NodeUtils.AddEdgeToMap( dataEdge);	
							
						 if(element.typeIdcas == 'asParent' ){						 						 
							   NodeUtils.buildParentNodeDetail ( element.currNodeUuid, dataEdge);
							   ( new KitchenManagerRender() ).addNodeToParList(element.currNodeUuid, element.nodeUuid, dataEdge);
							   

						 }else if ( element.typeIdcas == 'asChild'){
							 NodeUtils.buildChildNodeDetail (  element.currNodeUuid, dataEdge);
							 ( new KitchenManagerRender() ).addNodeToChildList( element.currNodeUuid, element.nodeUuid, dataEdge);
							 
						 }else if ( element.typeIdcas == 'asSibling'){
							 NodeUtils.buildSiblingNodeDetail ( element.currNodeUuid, dataEdge, 'destination');
							 ( new KitchenManagerRender() ).addNodeToSibList(element.currNodeUuid, element.nodeUuid, dataEdge);
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
	
	
	
	KitchenUtils.showEdgeDetails = function (key,  connId ){
		
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
		currInput += "<input type='button' name='Cancel' value='Cancel'  onclick='KitchenUtils.closeEdgeDetails(\""+key +"\")'></td</tr>";
		currInput += "</table>";
		$('#form_inst_edgeDetails_'+key ).append(currInput);
				
		KitchenUtils.showDivision("form_inst_edgeDetails_", key );
		
	}
	
	KitchenUtils.closeEdgeDetails = function( key ){
		
		KitchenUtils.hideDivision("form_inst_edgeDetails_", key);
		
	}
	

	
	KitchenUtils.addEdgeConn = function( keyOrigin ){

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
			 jsonData = NodeUtils.createEdgeJson(nodeMap[keyOrigin].typeId, keyOrigin,  typeId,  eleInst,  connId  );
																				
		 }else if(typeConnLink == 'asChild' ){
			 jsonData = NodeUtils.createEdgeJson(  typeId,  eleInst, nodeMap[keyOrigin].typeId, keyOrigin,  connId  );
			 							
		 }
		 
		 var apiEdge  = new EdgeApis();
			
		var doneFunction = function ( dataEdge ){
			console.log("Edge created ");
			// add edge to edgeMap
			NodeUtils.AddEdgeToMap( dataEdge);	
				
			 if(typeConnLink == 'asParent' ){
				 NodeUtils.buildChildNodeDetail ( keyOrigin, dataEdge);
				 ( new KitchenManagerRender() ).addNodeToChildList(keyOrigin, eleInst, dataEdge);
			 }else {
				 NodeUtils.buildParentNodeDetail ( keyOrigin, dataEdge);
				 ( new KitchenManagerRender() ).addNodeToParList(keyOrigin, eleInst, dataEdge);
			 }
			 KitchenUtils.cancelConnectToInst(keyOrigin);		 
			
		}
		
		var failFunction = function (  xhr, status, error ){
			console.log('Error Edge not created: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Error Edge not created:"+ xhr.status+"</p>");	
		};
				
		apiEdge.saveEdge( jsonData,  doneFunction, failFunction );	 	 
	}

	KitchenUtils.addEdgeLink = function( keyOrigin ){
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
		
		jsonData = NodeUtils.createEdgeJson( nodeMap[keyOrigin].typeId, keyOrigin,  typeId,  eleInst,  linkId  );
	 
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
			 ( new KitchenManagerRender() ).addNodeToSibList(keyOrigin, eleInst, dataEdge.type);
			
			 KitchenUtils.cancelLinkToInst(keyOrigin);		
		};
		
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
	KitchenUtils.buildTypeList = function ( nodeUuid, text ){
		
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
		
	KitchenUtils.buildTypeProperty =  function ( text,  combinedIds, nodeUuid){
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
//	    if(tmpType.typeProperties.length <= 0 ){ 
	    if($.isEmptyObject(tmpType.typeProperties) ){	
	    	inputCreate += " No properties";
	    	}
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
	    inputCreate = inputCreate + "<input type ='hidden' id='form_create_val_connId' value='"+connId+"'>"
	    inputCreate = inputCreate + "</table>";
		
		document.getElementById('td_'+nodeUuid).innerHTML = inputCreate;
	}
		
//==============================================================================================================================	
	KitchenUtils.buildTypeListConnect = function ( instId ){
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
			 inputTypeList = '<td valign="middle" class="childType" ><select id="childType_'+instId+'" onchange="KitchenUtils.buildTypeListInstanceConnect(\'child\',\''+ instId+'\');"><option value="">Select Children Type ...</option>';
			 if(listConnToChildren.length  >0 ){	
					
					for(var i=0; i< listConnToChildren.length ; i++){	
						var text ='(use: ';
						text += connMapViaId[listConnToChildren[i].connectionId].name +')';
						inputTypeList += '<option value="'+listConnToChildren[i].typeIdTarget+'|'+listConnToChildren[i].connectionId+'">'+typeMapViaId[listConnToChildren[i].typeIdTarget].name + '<b>'+text +'</b>)</option>';
					}
					inputTypeList +='</td></tr>';
				}else {
					inputTypeList = '<td> No Children available</td>';
					var  footer = '<td><input type="button"     value="Cancel" onclick="KitchenUtils.cancelConnectToInst(\''+ instId+'\');" /></td>';
					inputTypeList = inputTypeList + footer;
				}		
				
			    $('#nodeFormConnecttoTable_'+instId).find("td:not(:nth-child(1)),td:not(:nth-child(1))").remove();
				$('#nodeFormConnecttoTable_'+instId).find('tr:first').append( inputTypeList);		 
			 
		 };
		 if( valueSelected == 'asChild'){
			 
			 var tableInstConnDiv = $("#nodeFormConnecttoTable_" + instId );
			 var inputTypeList =''; 
			 inputTypeList = '<td valign="middle" class="parentType"><select id="parentType_'+instId+'"   onchange="KitchenUtils.buildTypeListInstanceConnect(\'parent\',\''+ instId+'\');" ><option value="">Select Parent Type ...</option>';
			 if(listConnToParent.length  > 0 ){	
				
					for(var i=0; i< listConnToParent.length ; i++){	
						var text ='(use: ';
						text += connMapViaId[listConnToParent[i].connectionId].name +')';
						inputTypeList += '<option value="'+listConnToParent[i].typeIdSource+'|'+listConnToParent[i].connectionId+'">'+typeMapViaId[listConnToParent[i].typeIdSource].name + '<b>'+text +'</b>)</option>';
					}
					inputTypeList +='</td>';
				}else {
					inputTypeList = '<td> No Children available</td>';
					
					var  footer = '<td><input type="button"     value="Cancel" onclick="KitchenUtils.cancelConnectToInst(\''+ instId+'\');" /></td>';
					inputTypeList = inputTypeList + footer;
					
				}		
			    $('#nodeFormConnecttoTable_'+instId ).find("td:not(:nth-child(1))").remove();
				$('#nodeFormConnecttoTable_'+instId).find('tr:first').append( inputTypeList);		 
			 
		 };	 
		
	}
    
	KitchenUtils.buildTypeListLink = function ( instId ){
		
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
			 inputTypeList = '<td valign="middle"><select id="linkType_'+instId+'"  onchange="KitchenUtils.buildTypeListInstanceLink(\''+ instId+'\');"     ><option value="">Select Sibling Type ...</option>';
			 if(listLinks.length  != 0 ){			
					for(var i=0; i< listLinks.length ; i++){	
						var text ='(use link: ';
						text += connMapViaId[listLinks[i].linkId].name +')';
						inputTypeList += '<option value="'+listLinks[i].typeIdtoLinkTo+'|'+listLinks[i].linkId+'">'+typeMapViaId[listLinks[i].typeIdtoLinkTo].name + '<b>'+text +'</b>)</option>';
					}
					inputTypeList +='</td>';
				}else {
					inputTypeList = '<td> No Children available';
					var  footer = '<input type="button"     value="Cancel" onclick="KitchenUtils.cancelLinkToInst(\''+ instId+'\');" /></td>';
					inputTypeList = inputTypeList + footer;
				}		
				
			    $('#nodeFormLinktoTable_'+instId).find("th:not(:nth-child(1)),td:not(:nth-child(1))").remove();
				$('#nodeFormLinktoTable_'+instId).find('tr:first').append( inputTypeList);				 	
	}

	
    KitchenUtils.buildTypeListInstanceConnect = function (text,  keyOrigin ){
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
					var footer  = '<td><input type="button"  value="Add"   onclick="KitchenUtils.addEdgeConn(\''+ keyOrigin+'\')" />';
						footer += '<input type="button"     value="Cancel" onclick="KitchenUtils.cancelConnectToInst(\''+ keyOrigin+'\');" /></td>';
					inputInstList = inputInstList + footer;
					$('#nodeFormConnecttoTable_'+keyOrigin).find('tr:first').append( inputInstList);	
					
				}else {  // no nodes Returned 
					
					inputInstList += '<td> No node available;  change your selection  </td>';
					inputInstList += '<td><input type="button"     value="Cancel" onclick="KitchenUtils.cancelConnectToInst(\''+ keyOrigin+'\');" /></td>';
					
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
	
    KitchenUtils.buildTypeListInstanceLink = function (keyOrigin ){
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
					var footer  = '<td><input type="button"  value="Add"    onclick="KitchenUtils.addEdgeLink(\''+ keyOrigin+'\')" />';
						footer += '<input type="button"      value="Cancel" onclick="KitchenUtils.cancelLinkToInst(\''+ keyOrigin+'\');" /></td>';
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


    KitchenUtils.showCreateDiv = function (parent, typeId){
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

    		NodeUtils.addFormInstCreate( $("#createParent_"+parent+"_for_"+typeId) , parent);	 
    		
    		//  -- hide the select option 
    		KitchenUtils.hideDivision('nodeDisplay_'+parent+'_for_', typeId);
    		// --  show the create option
    		KitchenUtils.showDivision('createParent_'+parent+'_for_', typeId);
    		
    	}else if (valueSelected == 'use'){
    	
    		// build the list of nodes 
    		$("#nodeDisplay_"+parent+"_for_"+typeId).empty();;
    		KitchenUtils.buildListNodes($("#nodeDisplay_"+parent+"_for_"+typeId), typeId, parent );
    		
    		// hide the create  option 
    		KitchenUtils.hideDivision('createParent_'+parent+'_for_', typeId);
    		// show the list to select from 
    		KitchenUtils.showDivision('nodeDisplay_'+parent+'_for_', typeId);	
    	}
    	       					    
    }
    
 // LOAD ALL NODES For PARENT TYPE SELECTED
    KitchenUtils.buildListNodes = function(div,  typeId, typeParent ){                   // based on type selected load existing node Instances and display these
   	
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
	KitchenUtils.createKitchen_cancel = function( typeId){
		if(!typeId){
			console.log(" no type given: cannot cancel create Instance  "); 
			return;
		}
			
		console.log("Attempting to Cancel :" + typeId );		

		GlobalUtils.clearGlobalSelected();	
		
		// assign the current 
		GlobalUtils.setGlobalTypeSelected( typeId );
		$('#work_addInstance').hide();

	}
	
    KitchenUtils.updateKitchen_cancel = function ( key ){	
		// hide Edit Form		
		KitchenUtils.hideDivision ("form_inst_edit_", key  );	

		// show View Form
		KitchenUtils.showDivision ("form_inst_", key  );	
		
	};	
	
	KitchenUtils.cancelAddChild = function(){
		var div = $(".addChildNodeRow");
		if( div.length > 0  ) {
			div.remove();
		}
	}

	KitchenUtils.cancelAddSib = function(){
		
		var div = $(".addSibNodeRow");	
		if( div.length > 0  ) {
			div.remove();
		}
	}

	KitchenUtils.cancelAddPar =function(){
		var div = $(".addParNodeRow");			
		if( div.length > 0  ) {
			div.remove();
		}
	}
	
	
	KitchenUtils.cancelLinkToInst = function ( instId ){		
		( new KitchenManagerRender() ).displayLinkTo(instId);	
	}

	KitchenUtils.cancelConnectToInst  = function ( instId ){	
		( new KitchenManagerRender() ).displayConnectTo(instId);		
	}

//===============================================================================================================================	
	KitchenUtils.clearAddRow = function(){
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
		
//===================================================================================================
	KitchenUtils.showDivision = function ( divName, divId ){
		
		var instDiv = document.getElementById(divName + divId );
		if( instDiv != null ) {
			instDiv.style.display = "block";
			instDiv.style.visibility = "visible";
		} else {
			// nothing to show?
			console.log(" no division to show ");
		}		
	 }
	
	KitchenUtils.hideDivision = function ( divName, divId ){
		
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





