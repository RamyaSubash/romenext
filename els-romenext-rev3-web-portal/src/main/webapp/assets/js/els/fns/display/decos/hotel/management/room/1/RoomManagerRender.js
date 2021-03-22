/**
 * For room reservations, use case follows:
 * 
 * 1. Enter Entry date
 * 2. Enter Personal Info
 * 3. Enter contact Info
 * 4. Enter CC
 * 5. 
 * @param divId
 * @returns
 */
function RoomManagerRender() {
	
	this.divholderId;
	this.DEFAULT_TYPE_NAME = "ROOM";
	this.DEFAULT_TYPE_ROOM = null;

	this.ENTRY_NODES = null;

	this.initBase = function( tmpId ) {
		this.divHolderId = tmpId;
	}
	
	this.initRenderer = function() {

	};

	this.initView = function() {
		
	// reset the Interface  -- Ensuring that only proper division will be displayed
		DisplayInterfaceUtils.resetInterface();
		
		// set up this 
		this.enableFormView();	
		
		this.structureDiv();
			
		this.initData();  // Entry Type defined --  SelectedMetadata defined 
				
		// print out the rooms	
		if( this.DEFAULT_TYPE_ROOM != null ) {
			this.initializeTypeBar();
			this.printRooms();	
		}
							
		
	};
	
	this.enableFormView = function() {
		
		var roomManagerDecoView = document.getElementById(activeDecos_BODY[ this.divHolderId ]);

		roomManagerDecoView.style.display = "block";	
		
	};
	
	this.structureDiv = function() {
		
		var roomManagerDecoView = document.getElementById(activeDecos_BODY[ this.divHolderId ]);
		roomManagerDecoView.style.display = "block";
		roomManagerDecoView.innerHTML = '';
		
		// generate the Room bar
		if (document.getElementById('room_list_type') == undefined || document.getElementById('room_list_type') == null) {
			
			RoomUtils.createAppendHTMLEntity('header', 'room_list_type' , 'panel-heading', 'visible', 'block', '', roomManagerDecoView);
		}
		
		if (document.getElementById('room_inst_list') == undefined || document.getElementById('room_inst_list') == null) {
		
			RoomUtils.createAppendHTMLEntity('header', 'room_inst_list' , 'panel-heading', 'visible', 'block', '', roomManagerDecoView);
			$('#room_inst_list').style = "vertical-align:top;";
		}
		
		
		// generate body Division 
		var bodyDiv ;
		if (document.getElementById('room_body') == undefined || document.getElementById('room_body') == null) {			
			RoomUtils.createAppendHTMLEntity('div', 'room_body' , 'cy', 'visible', 'flex', '', roomManagerDecoView);
			bodyDiv = $( "#room_body");
		}
		// generate the working space for adding new instances
		if(document.getElementById('work_addInstance') == undefined || document.getElementById('work_addInstance') == null) {		
			RoomUtils.createAppendHTMLEntity('div', 'work_addInstance'  , 'work_addInstance', 'hidden', 'none', '', bodyDiv);			
		}	
						

	};
	
    this.initializeTypeBar = function() {
    	
    	if( this.DEFAULT_TYPE_ROOM != null ) {		
		
			var displayTypeBar_v2 = document.getElementById('room_list_type');
			displayTypeBar_v2.innerHTML = "";
			var value = typeMapViaId[listTypeIds[0]];
	
			var inputs = '';
			inputs = "<table id='typesList'><tr>";		
			inputs += "<td ><button type='button' style='color:black; background:"+value.color+"' id='"+value.id+"'  >"+value.name;
			inputs += "<span  id ='nb_"+value.id+"'  class='badge'>";
			inputs += value.nb;
			inputs += "</span></button></td></tr>";
								
			inputs += "<tr><td >Current Rooms</td>";
		    inputs += "<td class='create_icon' onclick=\"( new RoomManagerRender() ).createRoom();\"><img  id='img_create' title='Create Room'   src='"+img_path+ "design_icons/create.png'></td></tr>";	    
		   
		    inputs +="</tr></table>";
			displayTypeBar_v2.innerHTML = inputs;
    	}
		
	};
					
	this.initData = function() {
		if(this.DEFAULT_TYPE_NAME == null){
			console.log("No Default Type Provided --- Can Not Progress ! ");
			return false;
		}
		if ( !selectedMetaData ) {
			console.log(" No value for metadata ")
			return false;	
	    } else {
		
				if( !GlobalUtils.isTypeMapViaIdSet() ) {
					typeMap ={}; typeMapViaId = {}; 
				    ruleMap = {}; ruleMapVia = {}; 
				    connMap = {}; connMapViaId = {}; 
					
					// reload the typeMap if it isn't set yet
					GlobalUtils.loadAllTypeAndConnections();
					GlobalUtils.loadAllRules();		
				}		
				
				if( this.DEFAULT_TYPE_ROOM == null ) {
					
					var tmpRoom = this.DEFAULT_TYPE_NAME;
					var foundRoom = null;
					
					$.each(typeMapViaId, function(key, value){			
						// do a non-case check
						var name = value.name.toUpperCase();
													
						if( name === tmpRoom ) {
							foundRoom = value;
						}
					});
					
					this.DEFAULT_TYPE_ROOM = foundRoom;
				}
				
				if( this.DEFAULT_TYPE_ROOM == null ) {					
					// TODO: This needs to be looked at in the future
					console.log(" Could not found the Info for this DECO  !!"+ tmpRoom);
					return false;
					
				}else {	
						// we set the default to the room type
						GlobalUtils.setGlobalTypeSelected( this.DEFAULT_TYPE_ROOM.id );					
						// we should have all the room nodes
						// note: we treat the room's as the ENTRY NODE for this deco
						var tmpRooms = GlobalTypeInstanceUtils.getAllInstances( this.DEFAULT_TYPE_ROOM.id );
						this.ENTRY_NODES = tmpRooms;
						return true;
				}
	    }
	};
		
	this.printRooms = function() {	
											
//		build List of Type Room Instances available if ANY	
		var roomInfoDiv = document.getElementById('room_inst_list');
			
//		output the entry rooms
		var inputs = "<table id='roomlist'>";
	    inputs += "<tr><td></td>";
		var entryNodes = this.ENTRY_NODES;
	    
		$.each( entryNodes, function(key, value) {
			
			var uuid = NodeUtils.findUUID(value);
			if(!uuid ){
				console.log(" no Room uuid  given "+ uuid );
				console.log(" Can not add the node to the list");
				return;
			}
				
//			create the subdivision for that node 		
			bodyDiv = $( "#room_body");		
			if (document.getElementById('room_detail_'+uuid) == undefined || document.getElementById('room_detail_'+uuid) == null) {		
				RoomUtils.createAppendHTMLEntity('div', 'room_detail_'+uuid , 'room_detail', 'visible', 'block', '', bodyDiv);
			}
//			find the Name of Room 
			var tmpName = NodeUtils.findNameInst(value);
			console.log("This should be the name : " + tmpName );
																	
			inputs += "<td ><button type='button' style='color:black; background:"+value.color+"' id='"+uuid+"'  onclick=\"( new RoomManagerRender() ).selectedRoom('" + uuid + "')\"  >"+ tmpName;
			inputs += "</button></td>";
	     });
			inputs +="</tr></table>";
			roomInfoDiv.innerHTML = inputs;			
	}	
	
	this.addRoomInst = function(uuid ){
		if(!uuid ){
			console.log(" no Node uuid  given "+ uuid );
			console.log(" Can not add the node to the list");
			return;
		}
	
//		create the subdivision for that node 		
		bodyDiv = $( "#room_body");		
		if (document.getElementById('room_detail_'+uuid) == undefined || document.getElementById('room_detail_'+uuid) == null) {		
			RoomUtils.createAppendHTMLEntity('div', 'room_detail_'+uuid , 'room_detail', 'visible', 'block', '', bodyDiv);
		}
		var tmpName = NodeUtils.findNameInst(nodeMap[uuid]);
		console.log("This should be the name : " + tmpName );	
        
		var inputs = '';															
		inputs += "<td ><button type='button' style='color:black; background:"+nodeMap[uuid].color+"' id='"+uuid+"'  onclick=\"( new RoomManagerRender() ).selectedRoom('" + uuid + "')\"  >"+ tmpName;
		inputs += "</button></td>";
	
		$('#roomlist').find('td:last').after( inputs);			
		
	}

	this.setDefaultsForDivs = function( key ){
		if(!key){
			console.log(" no Room key  given "+ key);
			console.log(" Can not set the default divisions for the node ");
			return;
		}
		RoomUtils.setDefault_ChildrenDiv(key);			
		RoomUtils.setDefault_ParentDiv(key);	
		RoomUtils.setDefault_SiblingDiv(key);
		RoomUtils.setDefault_LinktoDiv(key);
		RoomUtils.setDefault_ConnectToDiv(key);
	}
	
	
	
//===========================================================================================================
//              BUILD FORM FOR ADDING:
//              1. CHILDREN
//              2. PARENTS 
//              3. SIBLING
//===========================================================================================================
//	BUILT ADD CHILD NODE FORM  Based on SELECTED CHILD TYPE
	this.addChildNodeForm = function( nodeUuid ) {
		if(!nodeUuid){
			console.log("missing Room  uuid ");
			console.log(" can not add the child Node Form");
			return;
		}
		var inputChild ='';
        // clear Previous ADDROW
		RoomUtils.clearAddRow();	
		if($( ".addChildNodeRow" ).length == 0) {
		 
			var tableNodeChildDiv = $( "#nodeFormChildTable_" + nodeUuid );
			inputChild   += '<tr class="addChildNodeRow"><td colspan=3>&nbsp;</td></tr>';
			inputChild   += '<tr class="addChildNodeRow">';
			inputChild   += '<td>Select Type: <select id="select_child_type_'+nodeUuid+'"  onchange="RoomUtils.buildTypeProperty( \'child\',  this.value,\''+ nodeUuid +'\');" ></select> </td>';
	
			inputChild   += '<td id="td_' + nodeUuid + '"></td>';
			inputChild   += '<td><input type="button" name="add" id="addChil_'+nodeUuid+'"   class="btn btn-primary btn-xs" value="Add" onclick="( new RoomManagerRender() ).addChildNode(\''+ nodeUuid + '\');" style="display:none;">';		
			inputChild   += '<input type="button" name="cancel" value="cancel"  onclick="RoomUtils.cancelAddChild()"></td></tr>';
				
			tableNodeChildDiv.append(inputChild);		
	
			RoomUtils.buildTypeList(nodeUuid, 'Children');
		} else {
			console.log("FOUND SOMETING : " + $( ".addChildNodeRow" ).length);
		}
		
	};	
	
//	BUILT ADD PARENT NODE FORM  Based on SELECTED CHILD TYPE
	this.addParNodeForm = function( nodeUuid ) {
		if(!nodeUuid){
			console.log("missing node uuid ");
			console.log(" can not add the parent Node Form");
			return;
		}
		var inputPar ='';
		 // clear Previous ADDROW
		RoomUtils.clearAddRow();	
		
		if($(".addParentRow").length == 0) {

			var tableNodeChildDiv = $("#nodeFormParTable_" + nodeUuid );
			inputPar   += '<tr class="addParNodeRow"><td colspan=3>&nbsp;</td></tr>';
			inputPar   += '<tr class="addParNodeRow">';
			inputPar   += '<td>Select Type: <select id="select_parent_type_'+nodeUuid+'" onchange="RoomUtils.buildTypeProperty( \'parent\', this.value,\''+ nodeUuid +'\');"   ></select> </td>';
	
			inputPar   += '<td id="td_' + nodeUuid + '"></td>';
			inputPar   += '<td><input type="button" name="add" id="addPar_'+nodeUuid+'"  class="btn btn-primary btn-xs"   value="Add" onclick="( new RoomManagerRender() ).addParentNode(\''+ nodeUuid + '\');" style="display:none;">';		
			inputPar   += '<input type="button" name="cancel" value="cancel"  onclick="RoomUtils.cancelAddPar()"></td></tr>';
				
			tableNodeChildDiv.append(inputPar);		
	
			RoomUtils.buildTypeList(nodeUuid, 'Parent');
		} else {
			console.log("FOUND SOMETING : " + $(".addParentRow").length);
		}
		
	};
	
//	BUILT ADD SIBLING NODE FORM  Based on SELECTED CHILD TYPE
	this.addSibNodeForm = function( nodeUuid ) {
		if(!nodeUuid){
			console.log("missing node uuid ");
			console.log(" can not add the sibling Node Form");
			return;
		}
		var inputSibl ='';
        // clear Previous ADDROW
		RoomUtils.clearAddRow();		
		
		if($(".addSibNodeRow").length == 0) {
		 
			var tableNodeSibDiv = $("#nodeFormSibTable_" + nodeUuid);
			inputSibl   += '<tr class="addSibNodeRow"><td colspan=3>&nbsp;</td></tr>';
			inputSibl   += '<tr class="addSibNodeRow">';
			inputSibl   += '<td>Select Type: <select id="select_sibling_type_'+nodeUuid+'"  onchange="RoomUtils.buildTypeProperty( \'sibling\', this.value,\''+ nodeUuid +'\');" ></select> </td>';
	
			inputSibl   += '<td id="td_' + nodeUuid + '"></td>';
			inputSibl   += '<td><input type="button" id="addSib_'+nodeUuid+'" name="add"  class="btn btn-primary btn-xs"  value="Add" onclick="( new RoomManagerRender() ).addSibNode(\''+ nodeUuid + '\');" style="display:none;">';		
			inputSibl   += '<input type="button" name="cancel" value="cancel"  onclick="RoomUtils.cancelAddSib()"></td></tr>';
				
			tableNodeSibDiv.append(inputSibl);		
	
			RoomUtils.buildTypeList(nodeUuid, 'Sibling');
		} else {
			console.log("FOUND SOMETING : " + $(".addSibNodeRow").length);
		}
		
	};	
	
	
	
//===============================================================================================================================
//          FUNCTIONS   TO SAVE  CREATED :
//                    1. CHILDREN
//                    2. PARENTS 
//                    3. SIBLING
//===============================================================================================================================			
	//	RETRIEVE AND SAVE CHILD NODE CREATED
	this.addChildNode = function( nodeuuid){
		if(!nodeuuid){
			console.log("missing Room uuid ");
			return;
		}
		// grab the properties defined for this Node 
		// create the Node Instance	
		var originNodeUuid = nodeuuid;		
		console.log("Attempting to add a new Node to the Node  :"+ nodeuuid  );
		
		// get the Type selected First 
		var Id = document.getElementById("select_child_type_"+nodeuuid).value;
		if(!Id){
			console.log(" NO TYPE SElected  and No Connection");
			document.getElementById('select_child_type_'+nodeuuid).style.background = 'yellow';
			return;
		}
		document.getElementById('select_child_type_'+nodeuuid).style.background = '';
		var typeId = Id.split("|")[0];
		var connId = document.getElementById("form_create_val_connId").value;
		if(!typeId && !connId) {
			console.log(" NO TYPE Selected  and No Connection given");
			return;
		}
		
		// retrieve the Info	
		var properties = NodeUtils.retrieveNodePropertiesFromForm ( typeId, 'form_create_val_');
		
		if(properties[properties.length-1]){                            // if error(missing mandatory properties values  stop process -- error highlighted in form
			console.log(" do not continue");
			return;
		}
		properties.pop();
		
		
		var api  = new NodeApis();
		var data = new NodeJsonObject();

		// set the minimum
		data.init(selectedMetaData.toString(), typeId.toString(), properties);
		data.defaultDecorator = "1";

		var doneFunction = function( dataNode ) {
			if($.isEmptyObject(dataNode)){
				console.log(" No Details node returned ---- in saving add child to Node");
				return
			}
			
			var destUuid = NodeUtils.findUUID( dataNode );
			if(!destUuid){
				console.log("Missing uuid from returned node ---- in saving add child to Node ");
				return;
			}
			
		  	$('#console-log').append("<p style='color:blue'Node created successfully.</p>");
		  	// clear the form for adding child node
		  	var div = $(".addChildNodeRow");			
			div.hide();
	 	    	                 
			NodeUtils.AddNodeToMap( dataNode);   
			// update corresponding section and nb of type nodes
			GlobalUtils.addNBTypeInstances(dataNode);
											
			var jsonData={};
			
			// create the edge between the node and the new Node
			// prepare the jsonData for creating an edge
			jsonData["originNodeUuid"] = originNodeUuid;					
			jsonData["originType"]     = nodeMap[originNodeUuid].typeId.toString();
			
			jsonData["destinationNodeUuid"] = destUuid;
			jsonData["destinationType"]     = dataNode.typeId.toString()
			
			jsonData["ruleName"]            = connMapViaId[connId].rule;
			
			var apiEdge  = new EdgeApis();
			
			var doneFunction = function ( dataEdge ){
				if($.isEmptyObject(dataEdge)){
					console.log(" missing returned Edge info ");
					return;
				}
				console.log("Edge created ");
				// add edge to edgeMap
				NodeUtils.AddEdgeToMap( dataEdge);	
							
				 NodeUtils.buildChildNodeDetail ( nodeuuid, dataEdge);
				( new RoomManagerRender() ).addNodeToChildList(nodeuuid, destUuid, dataEdge);
				
			}
			
			var failFunction = function (  xhr, status, error ){
				console.log('Error Edge not created: ' + xhr.status);
				$('#console-log').append("<p style='color:red'>Error Edge not created:"+ xhr.status+"</p>");	
			}
					
			apiEdge.saveEdge( jsonData,  doneFunction, failFunction );
								  				
		};
			
		var failFunction = function( xhr, status, error ) {
			console.log('Error Node not created: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Error Node not created:"+ xhr.status+"</p>");	
		};
		
		api.saveNode( data,  doneFunction, failFunction );				
	}
	
//	RETRIEVE AND SAVE PARENT NODE CREATED	
    this.addParentNode = function( nodeuuid){
    	if(!nodeuuid){
			console.log("missing Room uuid ");
			return;
		}
    	
    	// get the Type selected First 
		var Id = document.getElementById("select_parent_type_"+nodeuuid).value;
		
		var typeId = Id.split("|")[0];
		var connId = document.getElementById("form_create_val_connId").value;
    	
    	var numberOfParents = 0;
    	for (var key in nodeMap[nodeuuid].parents) {
    		if (nodeMap[nodeuuid].parents[key].typeId == Number(typeId)) {
    			numberOfParents++;
    		}
    	}
    	
    	if (numberOfParents < Number(connMapViaId[connId].maxRel)) {
    	
        	// grab the properties defined for this Node 
    		// create the Node Instance	
    		var destinationNodeUuid = nodeuuid;		
    		console.log("Attempting to add a new Node to the Node  :"+ nodeuuid  );
    		
    		if(!typeId && !connId) {
    			console.log(" NO TYPE SElected  and No Connection");
    			return;
    		}
    		// retrieve the Info	
    			
    		var properties = NodeUtils.retrieveNodePropertiesFromForm ( typeId, 'form_create_val_');
    		if(properties[properties.length-1]){      // if error(missing mandatory properties values  stop process -- error highlighted in form
    			console.log(" do not continue");
    			return;
    		}
    		properties.pop();
    		
    		var api  = new NodeApis();

    		var data = new NodeJsonObject();

    		// set the minimum
    		data.init(selectedMetaData.toString(), typeId.toString(), properties);
    		data.defaultDecorator = "1";

    		var doneFunction = function( dataNode ) {
    			if($.isEmptyObject(dataNode)){
    				console.log(" No Details node returned ---- in saving add Parrent to Node");
    				return
    			}
    			var originUuid = NodeUtils.findUUID (dataNode);
    			if(!originUuid){
    				console.log(" no node uuid returned;can not proceed for saving edge ");
    				return;
    			}			
    												  				  	
    		  	$('#console-log').append("<p style='color:blue'Node created successfully.</p>");	  	
    		  	var div = $(".addParNodeRow");			
    			div.hide();
    	 	   // update corresponding section and nb of type nodes 		
    			NodeUtils.AddNodeToMap( dataNode);   
    									
    			var jsonData={};
    			
    			// create the edge between the node and the new Node
//    			 prepare the jsonData for creating an edge
    			jsonData["destinationNodeUuid"] = destinationNodeUuid;	
    			jsonData["destinationType"]     = nodeMap[destinationNodeUuid].typeId.toString();
    						
    			jsonData["originNodeUuid"] = originUuid;	
    			jsonData["originType"]     = dataNode.typeId.toString();	
    			
    			jsonData["ruleName"]       = connMapViaId[connId].rule;
    			
    			var apiEdge  = new EdgeApis();
    			
    			var doneFunction = function ( dataEdge ){
    				if($.isEmptyObject(dataEdge)){
    					console.log(" missing returned Edge info ");
    					return;
    				}
    				console.log("Edge created ");
    				
    				// add edge to edgeMap
    				NodeUtils.AddEdgeToMap( dataEdge);	
    								
    				 NodeUtils.buildParentNodeDetail ( nodeuuid, dataEdge);
    				( new RoomManagerRender() ).addNodeToParList(nodeuuid, originUuid, dataEdge);
    			}
    			
    			var failFunction = function (  xhr, status, error ){
    				console.log('Error Edge not created: ' + xhr.status);
    				$('#console-log').append("<p style='color:red'>Error Edge not created:"+ xhr.status+"</p>");	
    			}
    			
    			apiEdge.saveEdge( jsonData,  doneFunction, failFunction );
    			
    			var apiEdgeP  = new EdgeApis();
    			var parentNode = NodeUtils.isSubParent(dataNode.typeId, nodeuuid);
    			if (parentNode) {
    				var jsonDataP = {};
        			jsonDataP["destinationNodeUuid"] = originUuid;	
        			jsonDataP["destinationType"]     = dataNode.typeId.toString();
        			
        			jsonDataP["originNodeUuid"] = parentNode.uuid;
        			jsonDataP["originType"]     = parentNode.typeId.toString();	
        			
        			var tmpConn = GlobalConnUtils.findConnsBySourceAndTarget(parentNode.typeId, dataNode.typeId);
        			jsonDataP["ruleName"] = tmpConn[0].rule;
        			
        			var doneFunctionP = function ( dataEdgeP ){
        				if($.isEmptyObject(dataEdgeP)){
        					console.log(" missing returned Edge info ");
        					return;
        				}
        				console.log("Edge created ");
        				
        				// add edge to edgeMap
        				NodeUtils.AddEdgeToMap( dataEdgeP);	
        								
        				NodeUtils.buildParentNodeDetail ( originUuid, dataEdgeP);
        			}
        			
        			var failFunctionP = function (  xhr, status, error ){
        				console.log('Error Edge not created: ' + xhr.status);
        				$('#console-log').append("<p style='color:red'>Error Edge not created:"+ xhr.status+"</p>");	
        			}
        			
        			apiEdgeP.saveEdge( jsonDataP,  doneFunctionP, failFunctionP );
    			}
    					  				
    		};
    			
    		var failFunction = function( xhr, status, error ) {
    			console.log('Error Node not created: ' + xhr.status);
    			$('#console-log').append("<p style='color:red'>Error Node not created:"+ xhr.status+"</p>");	
    		};
    		
    		api.saveNode( data,  doneFunction, failFunction );
    		
    	}
				
	}
//
////	RETRIEVE AND SAVE SIBLING NODE CREATED	   
    this.addSibNode   =  function( nodeuuid){
    	if(!nodeuuid){
			console.log("missing node uuid ");
			return;
		}
    	
    	console.log(" in the Add sibling");
    	var originNodeUuid = nodeuuid;		
		console.log("Attempting to add a new Node to the Node  :"+ nodeuuid  );
		
		// get the Type selected First 
		var Id = document.getElementById("select_sibling_type_"+nodeuuid).value;
		
		var typeId = Id.split("|")[0];
		var connId = document.getElementById("form_create_val_connId").value;
		if(!typeId && !connId) {
			console.log(" NO TYPE SElected  and No Connection");
			return;
		}

		var properties = NodeUtils.retrieveNodePropertiesFromForm ( typeId, 'form_create_val_');
		if(properties[properties.length-1]){                                            // if error(missing mandatory properties values  stop process -- error highlighted in form
			console.log(" do not continue");
			return;
		}
		properties.pop();
		
			
		var api  = new NodeApis();
		var data = new NodeJsonObject();

		// set the minimum
		data.init(selectedMetaData.toString(), typeId.toString(), properties);
		data.defaultDecorator = "1";

		var doneFunction = function( dataNode ) {    // returned newly created node 
			if($.isEmptyObject(dataNode)){
				console.log(" No Details node returned ---- in saving add Parrent to Node");
				return
			}
									
			var destUuid = NodeUtils.findUUID (dataNode);		
			if(!destUuid){
				console.log(" no node returned can not proceed for saving edge ");
				return;
			}
					
		  	$('#console-log').append("<p style='color:blue'Node created successfully.</p>");	  	
		  	var div = $(".addSibNodeRow");			
			div.hide();
	 	   // add node to nodeMap	
			NodeUtils.AddNodeToMap( dataNode);   
			// update its type nb ??????  not sure if it is needed 

			var jsonData={};
			
			// create the edge between the node and the new Node
//			 prepare the jsonData for creating an edge
			jsonData["originNodeUuid"] = originNodeUuid;
			jsonData["originType"]     = nodeMap[originNodeUuid].typeId.toString();
			
			jsonData["destinationNodeUuid"] = destUuid;			
			jsonData["destinationType"]     = dataNode.typeId.toString()
			
			jsonData["ruleName"]            = connMapViaId[connId].rule;
			
			var apiEdge  = new EdgeApis();
			
			var doneFunction = function ( dataEdge ){
				if($.isEmptyObject(dataEdge)){
					console.log(" missing returned Edge info ");
					return;
				}			
				console.log("Edge created ");
				
				// add edge to edgeMap
				NodeUtils.AddEdgeToMap( dataEdge);
				
				 NodeUtils.buildSiblingNodeDetail ( nodeuuid, dataEdge, 'destination');
				( new RoomManagerRender() ).addNodeToSibList(nodeuuid, destUuid, dataEdge.type);
			}
			
			var failFunction = function (  xhr, status, error ){
				console.log('Error Edge not created: ' + xhr.status);
				$('#console-log').append("<p style='color:red'>Error Edge not created:"+ xhr.status+"</p>");	
			}
					
			apiEdge.saveEdge( jsonData,  doneFunction, failFunction );
								  				
		};
			
		var failFunction = function( xhr, status, error ) {
			console.log('Error Node not created: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Error Node not created:"+ xhr.status+"</p>");	
		};
		
		api.saveNode( data,  doneFunction, failFunction );
					
    }
	
	
			
//=================================================================================================================================
//  FUNCTIONS   TO ADD  CREATED :   //  1. CHILD   //  2. PARENT   //  3. SIBLING  TO   INSTANCE DISPLAYED INFO
//=================================================================================================================================		
	 // display the node child name in the list 
    this.addNodeToChildList = function ( node, nodetoadd, edgeType){  
    	if(!node || !nodetoadd || !edgeType){
    		console.log(" no Node uuid  given "+ node + " no nodetoadd uuid given "+ nodetoadd + " no name given for the edge "+ edgeType);
			console.log(" Can not add the node to the list");
			return;
    	}
    	var instName = NodeUtils.findNameInst ( nodeMap[nodetoadd]  );
    	var nodeTableChildDiv = $( "#nodeFormChildTable_" + node );
		nodeTableChildDiv.append('<tr class="child"><td>'+  instName + '</td><td colspan="2"><a href="#" onclick="RoomUtils.showEdgeDetails(\''+node+'\',' +edgeType.id + ')">' +edgeType.type + '</a><i class="fa fa-eye fa-fw"></i></td></tr>');		     	
    }
	
    // display the node Parent name in the list 
    this.addNodeToParList = function ( node, nodetoadd, edgeType){
    	if(!node || !nodetoadd || !edgeType){
    		console.log(" no Node uuid  given "+ node + " no nodetoadd uuid given "+ nodetoadd + " no name given for the edge "+ edgeType);
			console.log(" Can not add the node to the list");
			return;
    	}
   	 	var instName = NodeUtils.findNameInst ( nodeMap[nodetoadd]  );
   	    var nodeTableParDiv = $( "#nodeFormParTable_" + node );
		nodeTableParDiv.append('<tr class="parent"><td>' +  instName + '</td><td colspan="2"><a href="#" onclick="RoomUtils.showEdgeDetails(\''+node+'\',' +edgeType.id + ')">' + edgeType.type + '</a><i class="fa fa-eye fa-fw"></i></td></tr>');
    }
    
 // display the node Sibling name in the list
    this.addNodeToSibList = function ( node, nodetoadd, edgeType){ 
    	if(!node || !nodetoadd || !edgeType){
    		console.log(" no Node uuid  given "+ node + " no nodetoadd uuid given "+ nodetoadd + " no name given for the edge "+ edgeType);
			console.log(" Can not add the node to the list");
			return;
    	}
   	    var instName = NodeUtils.findNameInst ( nodeMap[nodetoadd]  );
	    var nodeTableSibDiv = $( "#nodeFormSibTable_" + node );
   	    nodeTableSibDiv.append('<tr class="sibling"><td>' +  instName + '</td><td colspan="2"><a href="#" onclick="RoomUtils.showEdgeDetails(\''+node+'\',' +edgeType.id + ')">' + edgeType.type+ '</a><i class="fa fa-eye fa-fw"></i></td></tr>');
		
    }
	
//==========================================================================================================================================	
    this.displayViewEditProperties = function( tempType, key, value  ){
    	
    	if(!key  ){
			console.log(" no Room uuid  given "+ key );
			return;
		}
   	
    	if(!value){
    		console.log(" no  details given for the Room  "+ key);
			console.log(" Can not Display its properties");
			return;
    	}
		
		var instViewDiv       = $( "#form_inst_" + key );
		instViewDiv.html('');
		var instEditDiv       = $("#form_inst_edit_" + key );
		instEditDiv.html('');
		
		var tableViewInstProps = '<br /><table border="2">';
		var tableEditInstProps = '<br /><table border="2">';
		
		var inputpropViewRow = '';
		inputpropViewRow = '<tr>';
		
		if($.isEmptyObject(tempType.typeProperties)){	
			tableViewInstProps = 'NO properties were defined ';
			tableEditInstProps = '';
			
		}else {
		
				$.each( tempType.typeProperties, function( pkey, pvalue ) {							
				    var inputpropEditRow ='';
				    var propValue;
					
					// build a Row for each property 
					// find the property value in nodeMap
							
					$.each(value.typeProperties, function ( nodeKey, nodeProperty){	
						if( pvalue.id == nodeProperty.id ){
							propValue = nodeProperty.value;
						}
					});
	
					inputpropEditRow = '<tr id="props">';
					
					if(pvalue.isMandatory){ 			
						inputpropViewRow += '<td style="color:red;">' ;
						inputpropEditRow += '<td style="color:red;width:100px">' ;
						}
					else{  
						inputpropViewRow += '<td  > ';
						inputpropEditRow += '<td width="100px"> ';
						}	
					inputpropViewRow +=   pvalue.name + ': </td>';
					inputpropEditRow +=  '<input type="text" name="propertyName" value="' + pvalue.name + '"  disabled /> <input type="hidden" name="propertyId" value="' + pvalue.id + '">';
											
					if( (propValue != null )&& (propValue != 'undefined' ) ){				
						inputpropViewRow += '<td  width="100px" >'+ propValue +'</td>';
						
						inputpropEditRow +=  '<input type="hidden" name ="value"     value="'+ propValue +'"  />'  ;
						inputpropEditRow +=  '</td><td><input type="text"   name ="newValue"  value="'+ propValue +'"  />';
			
					} else {
						inputpropViewRow += '<td  width="100px"> NONE </td>';
						
						inputpropEditRow +=  '<input type="hidden" name ="value"     value=""  />'  ;
						inputpropEditRow +=  '</td><td><input type="text" style="background-color:yellow"    name ="newValue"  value=""  />';	
					}	
					
					inputpropViewRow += "</tr>"
					inputpropEditRow +=  '<input type="hidden" name="propertyType" value="' + pvalue.propertyType + '">('+pvalue.propertyType+')</td></tr>';
								
					tableEditInstProps += inputpropEditRow;
		
				});
				tableViewInstProps += inputpropViewRow;
				var footerView  = "<tr><td colspan='2'> <input type='button' class='btn btn-primary btn-xs'  value='Go Update ' onclick='( new RoomManagerRender() ).editRoom(\"" + key + "\")' /></td></tr>" ;
				var footerEdit  = "<tr><td colspan='2'> <input type='button' class='btn btn-primary btn-xs'  value='Update' onclick='( new RoomManagerRender() ).saveUpdateRoom(\"" + key + "\")' />";
					footerEdit += "<input type='reset' value='Cancel' onclick='RoomUtils.updateRoom_cancel(\"" + key + "\")' /></td></tr>";
				tableViewInstProps = tableViewInstProps + footerView + "</table>";
				tableEditInstProps = tableEditInstProps + footerEdit + "</table>";
		}
			
		instViewDiv.append(tableViewInstProps);		
		instEditDiv.append(tableEditInstProps);	
	
	}
    
    this.buildParentChildrenSiblingDivsForANode = function ( nodeUuid ){
		
		if(!nodeUuid){
			console.log(" no Room Uuid provided: cannot build the parents/Children/Sibling list  "); 
			return;
		}
		if($.isEmptyObject(nodeMap[nodeUuid])){
			console.log(" Room does not exist in NodeMap -- can not build its Parents/Children/Sibling")
			return;
		}
		var listTypeParents = [];
		var parents = nodeMap[nodeUuid].parents;
		if(!$.isEmptyObject(parents) ){
			$.each( parents, function( key, value ) {		
                  if($.inArray(value.TypeName, listTypeParents) == '-1' ){listTypeParents.push(value.TypeName);}
				  var nodeTableParDiv = $( "#nodeFormParTable_" + nodeUuid );
	    		  nodeTableParDiv.append('<tr class="parent"><td>' +  value.name + '</td><td colspan="2"><a href="#" onclick="RoomUtils.showEdgeDetails(\''+nodeUuid+'\',' +value.connId + ')">' + value.ruleName + '</a><i class="fa fa-eye fa-fw"></i></td></tr>');		
			});
			var elem = document.getElementById('listTypeParents_'+nodeUuid);
			if (elem) {
				elem.innerHTML = listTypeParents.toString();	
			}
		}
		
		
		
		var listTypeChildren = [];
		var children = nodeMap[nodeUuid].children;
		if(!$.isEmptyObject(children) ){
			$.each( children, function( key, value ) {	
				      if($.inArray(value.TypeName, listTypeChildren) == '-1' ){listTypeChildren.push(value.TypeName);}
					  var nodeTableChildDiv = $( "#nodeFormChildTable_" + nodeUuid );
					  nodeTableChildDiv.append('<tr class="child"><td>'+  value.name + '</td><td colspan="2"><a href="#" onclick="RoomUtils.showEdgeDetails(\''+nodeUuid+'\',' +value.connId + ')">' + value.ruleName + '</a><i class="fa fa-eye fa-fw"></i></td></tr>');  
			});	
			var elem = document.getElementById('listTypeChildren_'+nodeUuid);
			if (elem) {
				elem.innerHTML = listTypeChildren.toString();
			}
		}
		
		
		var listTypeSibling = [];
		var sibling = nodeMap[nodeUuid].sibling;
		if(!$.isEmptyObject(sibling) ){
			$.each( sibling, function( key, value ) {
				      if($.inArray(value.TypeName, listTypeSibling) == '-1' ){listTypeSibling.push(value.TypeName);}
					  var nodeTableSibDiv = $( "#nodeFormSibTable_" + nodeUuid );
		        	  nodeTableSibDiv.append('<tr class="sibling"><td>' +  value.name + '</td><td colspan="2"><a href="#" onclick="RoomUtils.showEdgeDetails(\''+nodeUuid+'\',' +value.connId + ')">' + value.ruleName + '</a><i class="fa fa-eye fa-fw"></i></td></tr>');
		    });	
			var elem = document.getElementById('listTypeSiblings_'+nodeUuid);
		   if (elem) {
			   elem.innerHTML = listTypeSibling.toString();
		   }
		}	
		
		
	}
      
    this.displayConnectTo = function ( instId ){
		if(!instId){
			console.log(" no Room Uuid provided: cannot display the connect to table  "); 
			return;
		}
		
		var tableInstConnDiv = $("#nodeFormConnecttoTable_" + instId );		
		tableInstConnDiv.empty();				
		var inputRow = '';
        inputRow   +=  "<tr><td>Connect as :<br/><input type='radio' value='asParent' name='typeConnPosition_"+instId+"' onchange=\"RoomUtils.buildTypeListConnect(\'"+ instId+"\')\"/ >Parent<br/>";					
		inputRow   +=  "<input type='radio' value='asChild' name='typeConnPosition_"+instId+"' onchange=\"RoomUtils.buildTypeListConnect(\'"+ instId+"\' )\">Child</td></tr>";
        tableInstConnDiv.append(inputRow);
	
	}
	
    this.displayLinkTo  = function(instId) {
    	if(!instId){
			console.log(" no node Uuid provided: cannot display the Link to table  "); 
			return;
		}
		
		var tableInstlinktoDiv = $("#nodeFormLinktoTable_" + instId );		
		tableInstlinktoDiv.empty();				
		var inputRow = '';
        inputRow   +=  "<tr><th><input id='link_to_for_" + instId + "' type='checkbox' value='linkTo'  name='typeLinkPosition_"+instId+"' onchange='RoomUtils.buildTypeListLink(\""+ instId+"\" )'/ >Link To </th></tr>";					
        tableInstlinktoDiv.append(inputRow);
		
	}
    
//========================================================================================================================    
    this.selectedRoom = function( roomId ) {
		
		console.log("Attempting to show :" + roomId );					
		if(!roomId){
			console.log(" no Room Uuid provided: cannot display related info  "); 
			return;
		}
		var roomDetails = nodeMap[roomId];
		
		if(!roomDetails){
			console.log(" no Room details  were Found " );
			return;
		}	
		
		// hide all other divisions
		$('div.room_detail').hide();
		$('div.form_inst_edgedetails').hide();
		$('div.work_addInstance').hide();	

		$("#room_detail_" +roomId).empty();
		
		var instHolderDiv = document.getElementById("room_detail_" +roomId);
		RoomUtils.addDivsForARoomDetails (instHolderDiv, roomId );
		this.setDefaultsForDivs( roomId );		
				
		var successFunction = function( data ) {
			
			if( $.isEmptyObject(data) ||   $.isEmptyObject(data.edges)){      // at least the node itself is returned if it has no Parent/Children/Sibling
				console.log(" no Bed details returned from the API get all related  edges");
			}else {
				
				console.log("data.edges are: ");
				console.table(data.edges);                            // data.edges may be empty if no Parent/Children/Sibling								
				NodeUtils.buildNodeDetails ( roomId, data);
			}					
		};	
		var failFunction = function( xhr, status, error ) {
			console.log('Not able to load related  Room Details: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Not able to load related Room Details: "+ xhr.status+"</p>");	
		};	
		var nodeApi = new NodeApis();			
		nodeApi.getRelatedNodesEdges( nodeMap[roomId].typeId,  roomId, successFunction, failFunction);
			
		var typeInfo = typeMapViaId[listTypeIds[0]];
		this.displayViewEditProperties( typeInfo, roomId,  roomDetails  );
		
		this.buildParentChildrenSiblingDivsForANode( roomId );	 
		this.displayConnectTo( roomId);
		this.displayLinkTo( roomId);
					
		RoomUtils.showDivision ("form_inst_", roomId  );			
		RoomUtils.showDivision ("form_inst_children_", roomId  );		
		RoomUtils.showDivision ("form_inst_parent_", roomId  );	
		RoomUtils.showDivision ("form_inst_sibling_", roomId  );	
		RoomUtils.showDivision ("form_inst_linkto_", roomId  );	
		RoomUtils.showDivision ("form_inst_connectto_", roomId  );
				
		RoomUtils.showDivision ("room_detail_", roomId  );		
		      
	};

//=====================================================================================================      	
	
	this.saveRoomCreated = function ( roomId, properties ){
		
		var data = new NodeJsonObject();
		// set the minimum
		data.init(selectedMetaData.toString(), roomId.toString(), properties);
		data.defaultDecorator = "1";

		var doneFunction = function( dataNode ) {
			
			$('#console-log').append("<p style='color:blue'Node created successfully.</p>");
			dataNode.color = typeMapViaId[dataNode.typeId].color;
	 	   // update corresponding section and nb of type nodes 			
			NodeUtils.AddNodeToMap( dataNode);   

			GlobalUtils.addNBTypeInstances(dataNode);
			
			
			listInstUuids[0] = NodeUtils.findUUID (dataNode);	
							  				
		};
			
		var failFunction = function( xhr, status, error ) {
			console.log('Error Node not created: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Error Node not created:"+ xhr.status+"</p>");	
		};
		
		var api  = new NodeApis();
		api.saveNode( data,  doneFunction, failFunction );
				
	}
		
	this.saveUpdateRoom = function( roomId ) {
		if(!roomId  ){
			console.log(" no Room uuid  given "+ roomId );
			return;
		}
	    	
		// grab the info from the Node property fields 	
		var instEditDiv = $("#form_inst_edit_" + roomId );	
					
		var jsonData = {}, nodeProperties = [], newProperties = [];
		var property = {}, newproperty = {}, foundError=false;			

		// grab type Id 
		var typeId         = nodeMap[roomId].typeId;	
		if(!typeId){
			console.log(" type is not defined for this node "+ roomId);
			return;
		}

		jsonData["type"] = typeId.toString();
		
		var sysProperties = [];
		property =  NodeUtils.createSysJson(roomId );
		sysProperties.push(property);	
		
		property = {}; mewproperty = {};
			
		// grab the values of node properties from the form
		$(instEditDiv).find('tr#props').each(function (i, propsTr){	
			$(propsTr).find(':input').each(function(i,field){
			     if( ( field.type  == 'text')||(field.type == 'hidden')){
			 		console.log(field.name + " value found is :"+field.value);
					if (field.name == 'value')  {   
						  property[field.name] = field.value  
					} else if (field.name == 'newValue') { 
						   newproperty['value'] = field.value
					} else { 
						property [field.name] = field.value;
						newproperty[field.name] = field.value;
					} 
			     }			
			     
			});	
				
			// verify if property has value	
			var isPropMand =  NodeUtils.findPropInType(property.propertyName, jsonData['type']);
			if(isPropMand){ // mandatory property
				if(newproperty.value){
										newProperties.push(newproperty);
		                    		  	if(property.value  && property.value != 'undefined'){ nodeProperties.push(property);}	                    		  	
		         } else {
		        	  $(propsTr).append('error- missing Value');
            		  console.log("Missing Value for Mandatory property : "+ property.propertyName);
                      foundError= true;
                		  }		                    	  
			}else {   // not mandatory
				if(newproperty.value){  // user entered a new value
										newProperties.push(newproperty);
						                if(property.value && property.value != 'undefined' ){ nodeProperties.push(property);}				        			
				}else {  // if there was no value and user did not enter a value don't push it
//					  user may have deleted old value  
					if (property.value && property.value!= 'undefined' ){
						       newproperty.value = null;
						       nodeProperties.push(property);
						       newProperties.push(newproperty);
					}			
				}
        	}
		    property = {}; newproperty ={};
		});
				
			
		if(!foundError ) {
			console.log(" Retrieved Properties are : "+nodeProperties);
			console.log(" The new ones are :"+ newProperties);	

			jsonData.properties = nodeProperties;
			jsonData.newProperties = newProperties;
			jsonData.sysProperties = sysProperties;		
			instEditDiv.hide();
				
			var doneFunction = function( data ) {
				if($.isEmptyObject(data) && S.isEmptyObject(data.nodes)){
					console.log(" no node returned for save update Node Info ");
					return;
				}
				
				console.log("Node Updated "+data.nodes[0].type);		     
				
				// Save the updated properties 					
						
				var key = NodeUtils.findUUID (data.nodes[0]);
				
				nodeMap[key].typeProperties   = data.nodes[0].typeProperties;
												
				// grab the name property of The Node and update it in the list
				var instName = NodeUtils.findNameInst (  data.nodes[0]  );	
				var elem = document.getElementById(key);
			    elem.value = elem.innerHTML = instName;
				
				// update and display properties info 	
				( new RoomManagerRender() ).selectedRoom(key);

	 				
			};
				
			var failFunction = function( xhr, status, error ) {
				console.log("Update Node Properties Error: "+ xhr.status);
				 $('#console-log').append("Update Node Properties Error: "+ xhr.status);
			};
			
			var api  = new NodeApis();
			
			api.updateNode(jsonData, doneFunction, failFunction );	

			}				
		};

//====================================================================================================	
	
    this.editRoom = function( roomId ) {
		if(!roomId  ){
			console.log(" no Room uuid  given "+ roomId );
			return;
		}
		
		console.log("Attempting to edit :" + roomId );			
		RoomUtils.hideDivision ("form_inst_", roomId  );		
		RoomUtils.showDivision ("form_inst_edit_", roomId  );		
		      
	};
			
	this.createRoom = function(  ) {
		
		console.log("Attempting to create Room :" );	
		
		// hide all the others		
		$('div.room_detail').hide();			
		$('.work_addInstance').empty();
		
		historyNode = []; 
		curThreshold = 0;
			
		var workDiv = $('#work_addInstance');
		
		var relatedRequired = this.verifyNodeRelations();
	
		this.addFormCreateRoom( workDiv, relatedRequired );					
					      
	};
	
	this.verifyNodeRelations = function(  ){
      if(!listTypeIds[0]) {
    	  console.log(" No type Id defined ");
    	  return null;
      }    
	   // looking for Parents  MUST Connections 
      var listOfConnPar = []; 
      var listOfConnChild = [];
      var listOfLinkSibling = [];
      $.each( connMapViaId , function( key, value ) {      
              if(value.classification == 'parentchild'){
                      if( (listTypeIds[0] == value.target.toString() ) &&( value.minRel > '0'))      {                       
                                   listOfConnPar.push(value);
                           }else if ( (listTypeIds[0] == value.source.toString() ) &&( value.minRel > '0')){
                                   listOfConnChild.push(value);
                           }
              }else if (value.classification == 'link'){
                                      if((listTypeIds[0] == value.target.toString() ) &&( value.minRel > '0')||(listTypeIds[0] == value.source.toString() ) &&( value.minRel > '0')){
                                              listOfLinkSibling.push(value);
                          }
              }else {
                      // error 
              }            
      });     
      
      var listOfRelated = {};
      listOfRelated['parent'] = listOfConnPar;
      listOfRelated['child'] = listOfConnChild;
      listOfRelated['sibling'] = listOfLinkSibling;
      return  listOfRelated;    
      
	 }
	
		
//=====================================================================================================	
	
	this.addFormCreateRoom = function (workDiv, relatedRequired ){              

		if(!listTypeIds[0]) {
	    	  console.log(" No type Id defined ");
	    	  return null;
	      }   
		var typeId = listTypeIds[0];
		var inputContentList = '';
		var element = {};
		
		inputContentList += '<p> Complete the Following to CREATE Node Instance for: <b>'+typeMapViaId[typeId].name +'</b></p>';
	    inputContentList += '<table border="2" class="addMustParent" >';
	    
	    // should be set based on the data
	    var ableToCreateParent = false;
	    var ableToCreateChild = false;
	    var ableToCreateSibling = false;
	    
		   if(relatedRequired['parent'].length){	   

		    var line = '';
		    for( var i=0; i <relatedRequired['parent'].length ; i++){
		    	line += '<tr id="rowNodeParent_'+relatedRequired['parent'][i].source+'_for_'+typeId+'" >';
		    	var color = typeMapViaId[relatedRequired['parent'][i].target].color;
		    	line += '<td>Parent is: <span class="badge" style="color:black; background:'+color+'">'+relatedRequired['parent'][i].origin +'</span></td>';
		    	
		    	if (typeMapViaId[relatedRequired['parent'][i].source].sysProperties.restrictionStatus == "ROOTONLY") {
		    		ableToCreateParent = false;
		    	} else {
		    		ableToCreateParent = true;
		    	}
		    	
		    	line += '<td>';
		    	if (ableToCreateParent == true) {
			    	line += '<input type="radio" name="mustConn_'+relatedRequired['parent'][i].source+'_for_'+ typeId+'"   value="create" onclick="RoomUtils.showCreateDiv('+relatedRequired['parent'][i].source+', '+typeId+' )"/>Create New </br/>';
		    	}
		    	line += '<input id="connect_parents_in_creation" type="radio" name="mustConn_'+relatedRequired['parent'][i].source+'_for_'+ typeId+'"    value="use" onclick="RoomUtils.showCreateDiv('+relatedRequired['parent'][i].source+', '+typeId+' )" />Select Instance</td>';
		    	
		    	line += '<td>';
		    	if (ableToCreateParent == true) {
		    		line += '<div id="createParent_'+relatedRequired['parent'][i].source+'_for_'+typeId+'" style="display:none;visibility:hidden"></div>';
		    	}
		    	line += '<div id="nodeDisplay_'+relatedRequired['parent'][i].source+'_for_'+typeId+'"></div></td></tr>';

		    	inputContentList += line;
		    	line = '';
		    	// saving these info for the saving process;
		    	
		    	element.currTypeId       = typeId;
		    	element.nodeUuidCurrType = null;
		    	element.typeIdcas        = 'asParent';
		    	element.typeId           = relatedRequired['parent'][i].source;
		    	element.typeConn         = relatedRequired['parent'][i].id;
		    	element.nodeUuid         = null;
		    	element.status           = 'pending';
		    	historyNode.push(element);
		    	element = {};    	
		    } 
		    	
		   }
		   
		   if(relatedRequired['child'].length){	   

			    var line = '';
			    for( var i=0; i <relatedRequired['child'].length ; i++){
			    	line += '<tr id="rowNodeParent_'+relatedRequired['child'][i].target+'_for_'+typeId+'" >';
			    	var color = typeMapViaId[relatedRequired['child'][i].target].color;
			    	line += '<td>Child is: <span class="badge" style="color:black; background:'+color+'">'+relatedRequired['child'][i].destination +'</span></td>';
			    	
			    	if (typeMapViaId[relatedRequired['child'][i].target].sysProperties.restrictionStatus == "ROOTONLY") {
			    		ableToCreateChild = false;
			    	} else {
			    		ableToCreateChild = true;
			    	}
			    	
			    	line += '<td>';
			    	if (ableToCreateChild == true) {
				    	line += '<input type="radio" name="mustConn_'+relatedRequired['child'][i].target+'_for_'+ typeId+'"   value="create" onclick="RoomUtils.showCreateDiv('+relatedRequired['child'][i].target+', '+typeId+' )"/>Create New </br/>';				    		
			    	}
			    	line += '<input id="connect_children_in_creation" type="radio" name="mustConn_'+relatedRequired['child'][i].target+'_for_'+ typeId+'"    value="use" onclick="RoomUtils.showCreateDiv('+relatedRequired['child'][i].target+', '+typeId+' )" />Select Instance</td>';
			    	
			    	line += '<td>';
			    	if (ableToCreateChild == true) {
			    		line += '<div id="createParent_'+relatedRequired['child'][i].target+'_for_'+typeId+'" style="display:none;visibility:hidden"></div>';
			    	}	
			    	line += '<div id="nodeDisplay_'+relatedRequired['child'][i].target+'_for_'+typeId+'"></div></td></tr>';

			    	inputContentList += line;
			    	line = '';
			    	// saving these info for the saving process;
			    	
			    	element.currTypeId       = typeId;
			    	element.nodeUuidCurrType = null;
			    	element.typeIdcas        = 'asChild';
			    	element.typeId           = relatedRequired['child'][i].target;
			    	element.typeConn         = relatedRequired['child'][i].id;
			    	element.nodeUuid         = null;
			    	element.status           = 'pending';
			    	historyNode.push(element);
			    	element = {};    	
			    } 
			    
			   }
		   
		   if(relatedRequired['sibling'].length){	   

			    var line = '';
			    for( var i=0; i <relatedRequired['sibling'].length ; i++){
			    	line += '<tr id="rowNodeParent_'+relatedRequired['sibling'][i].target+'_for_'+typeId+'" >';
			    	var color = typeMapViaId[relatedRequired['sibling'][i].target].color;
			    	line += '<td>Sibling is: <span class="badge" style="color:black; background:'+color+'">'+relatedRequired['sibling'][i].destination +'</span></td>';
			    	
			    	if (typeId === relatedRequired['sibling'][i].source) {
				    	if (typeMapViaId[relatedRequired['sibling'][i].target].sysProperties.restrictionStatus == "ROOTONLY") {
				    		ableToCreateSibling = false;
				    	} else {
				    		ableToCreateSibling = true;
				    	}
			    		
				    	line += '<td>';
			    		if (ableToCreateSibling == true) {
				    		line += '<input type="radio" name="mustConn_'+relatedRequired['sibling'][i].target+'_for_'+ typeId+'"   value="create" onclick="RoomUtils.showCreateDiv('+relatedRequired['sibling'][i].target+', '+typeId+' )"/>Create New </br/>';
				    	}
				    	line += '<input type="radio" name="mustConn_'+relatedRequired['sibling'][i].target+'_for_'+ typeId+'"    value="use" onclick="RoomUtils.showCreateDiv('+relatedRequired['sibling'][i].target+', '+typeId+' )" />Select Instance</td>';
				    	
				    	if (ableToCreateSibling == true) {
				    		line += '<td><div id="createParent_'+relatedRequired['sibling'][i].target+'_for_'+typeId+'" style="display:none;visibility:hidden"></div>';	
				    	}
				    	line += '<div id="nodeDisplay_'+relatedRequired['sibling'][i].target+'_for_'+typeId+'"></div></td></tr>';
			    	} else {
				    	if (typeMapViaId[relatedRequired['sibling'][i].source].sysProperties.restrictionStatus == "ROOTONLY") {
				    		ableToCreateSibling = false;
				    	} else {
				    		ableToCreateSibling = true;
				    	}
			    		
			    		if (ableToCreateSibling == true) {
				    		line += '<input type="radio" name="mustConn_'+relatedRequired['sibling'][i].source+'_for_'+ typeId+'"   value="create" onclick="RoomUtils.showCreateDiv('+relatedRequired['sibling'][i].source+', '+typeId+' )"/>Create New </br/>';
				    	}
				    	line += '<input type="radio" name="mustConn_'+relatedRequired['sibling'][i].source+'_for_'+ typeId+'"    value="use" onclick="RoomUtils.showCreateDiv('+relatedRequired['sibling'][i].source+', '+typeId+' )" />Select Instance</td>';
				    	
				    	line += '<td>';
				    	if (ableToCreateSibling == true) {
				    		line += '<div id="createParent_'+relatedRequired['sibling'][i].source+'_for_'+typeId+'" style="display:none;visibility:hidden"></div>';	
				    	}
				    	line += '<div id="nodeDisplay_'+relatedRequired['sibling'][i].source+'_for_'+typeId+'"></div></td></tr>';
			    	}

			    	inputContentList += line;
			    	line = '';
			    	// saving these info for the saving process;
			    	
			    	element.currTypeId       = typeId;
			    	element.nodeUuidCurrType = null;
			    	element.typeIdcas        = 'asSibling';
			    	element.typeId           = relatedRequired['sibling'][i].target;
			    	element.typeConn         = relatedRequired['sibling'][i].id;
			    	element.nodeUuid         = null;
			    	element.status           = 'pending';
			    	historyNode.push(element);
			    	element = {};    	
			    } 

			 }
		
		   inputContentList += '</table>';	
		   
		 // Also in case of no Must connections/links just display the Add_Form_Inst_create
		 // add division for the node instance creation   
		 inputContentList +=  '<div id="addNodeInst_'+listTypeIds[0]+'"><p> Proprietes for the Type '+typeMapViaId[listTypeIds[0]].name +'</p></div>';  
		 workDiv.append(inputContentList);
		   
//		 RoomUtils.addFormInstCreate( $("#addNodeInst_"+listTypeIds[0]), listTypeIds[0] );
		 NodeUtils.addFormInstCreate( $("#addNodeInst_"+listTypeIds[0]), listTypeIds[0] );
		 var footer  = '<tr align="center"><td colspan="2"><input type="button"  name="submit" class="btn btn-primary btn-xs"   id="addNodeInst_submit_' + listTypeIds[0]+ '" value="Add Instance" onclick="RoomUtils.saveRoomInfo('+listTypeIds[0]+');"/>';		
	         footer += '<input type="button"   name="cancel" id="addNodeInst_cancel_' + listTypeIds[0] + '" value="Cancel" onclick="RoomUtils.createRoom_cancel(' + listTypeIds[0] + ');"/></td></tr>';   		    
		 $('#addNodeInst_'+listTypeIds[0]+' table ').append(footer);
		 
		 RoomUtils.showDivision ("work_addInstance", ''  );
		 
		 $("#connect_parents_in_creation").prop("checked", true);
		 $("#connect_parents_in_creation").click();
		 $("#connect_children_in_creation").prop("checked", true);
		 $("#connect_children_in_creation").click();
		
	}
	

//===========================================================================================================================================


}
	
	

	

