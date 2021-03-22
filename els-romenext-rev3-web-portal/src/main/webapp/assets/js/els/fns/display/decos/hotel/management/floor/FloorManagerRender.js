/**
 * 
 */
/**
 * For floor reservations, use case follows:

 */
function FloorManagerRender() {
	
	this.divholderId;
	this.DEFAULT_TYPE_NAME = "FLOOR";
	this.DEFAULT_TYPE_FLOOR = null;
	this.ENTRY_NODES = null;


	this.initBase = function( tmpId ) {
		this.divHolderId = tmpId;
	}
	
	this.initRenderer = function() {
//		FloorUtils.globalFloor_addFn( "create", "form", FloorManagerCrud.floorCreate );
//		
//		FloorUtils.globalFloor_addFn( "update", "form", FloorManagerCrud.floorUpdate );
	};

	this.initView = function() {
		
	// reset the Interface  -- Ensuring that only proper division will be displayed
		DisplayInterfaceUtils.resetInterface();
		
		// set up this 
		this.enableFormView();	
		
		this.structureDiv();
			
		this.initData();  // Entry Type defined --  SelectedMetadata defined 
				
		// print out the floors	
		if( this.DEFAULT_TYPE_FLOOR != null ) {
			this.initializeTypeBar();
			this.printFloors();	
		}
							
		
	};
	
	this.enableFormView = function() {
		
		var floorManagerDecoView = document.getElementById(activeDecos_BODY[ this.divHolderId ]);

		floorManagerDecoView.style.display = "block";	
		
	};
	
	this.structureDiv = function() {
		
		var floorManagerDecoView = document.getElementById(activeDecos_BODY[ this.divHolderId ]);
		floorManagerDecoView.style.display = "block";
		floorManagerDecoView.innerHTML = '';
		
		// generate the floor bar
		if (document.getElementById('floor_mgr_floor_list_id') == undefined || document.getElementById('floor_mgr_floor_list_id') == null) {
			//                          elementType, elementId,                 className,     visibility, display, innerHtml
			FloorUtils.createAppendHTMLEntity('header', 'floor_mgr_floor_list_id' , 'panel-heading', 'visible', 'block', '', floorManagerDecoView);
		}
		
		if (document.getElementById('floor_mgr_floor_inst_id') == undefined || document.getElementById('floor_mgr_floor_inst_id') == null) {
			//                          elementType, elementId,                 className,     visibility, display, innerHtml
			FloorUtils.createAppendHTMLEntity('header', 'floor_mgr_floor_inst_id' , 'panel-heading', 'visible', 'block', '', floorManagerDecoView);
			$('#floor_mgr_floor_inst_id').style = "vertical-align:top;";
		}
		
		
		// generate body Division 
		var bodyDiv ;
		if (document.getElementById('floor_body') == undefined || document.getElementById('floor_body') == null) {			
			FloorUtils.createAppendHTMLEntity('div', 'floor_body' , 'cy', 'visible', 'flex', '', floorManagerDecoView);
			bodyDiv = $( "#floor_body");
		}
		// generate the working space for adding new instances
		if(document.getElementById('work_addInstance') == undefined || document.getElementById('work_addInstance') == null) {		
			DisplayFormUtils.createHTMLEntity('div', 'work_addInstance'  , 'work_addInstance', 'hidden', 'none', '', bodyDiv);			
		}	
						

	};
	
    this.initializeTypeBar = function() {
    	
    	if( this.DEFAULT_TYPE_FLOOR != null ) {		
		
			var displayTypeBar_v2 = document.getElementById('floor_mgr_floor_list_id');
			displayTypeBar_v2.innerHTML = "";
			var value = typeMapViaId[listTypeIds[0]];
	
			var inputs = '';
			inputs = "<table id='typesList'><tr>";		
			inputs += "<td ><button type='button' style='color:black; background:"+value.color+"' id='"+value.id+"'  >"+value.name;
			inputs += "<span  id ='nb_"+value.id+"'  class='badge'>";
			inputs += value.nb;
			inputs += "</span></button></td>";
			inputs +="</tr></table>";
				
			displayTypeBar_v2.innerHTML = inputs;
    	}
		
	};
					
	this.initData = function() {
		if(this.DEFAULT_TYPE_NAME == null){
			document.getElementById('path').innerHTML = "<p style='color:red'>No DECO provided  !!</p>";	
			console.error("No Default Type Provided --- Can Not Progress ! ");
			return false;
		}
		if ( !selectedMetaData ) {
			document.getElementById('path').innerHTML = "<p style='color:red'>No Metadata Selected  !!</p>";
			console.error(" No value for metadata ")
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
				
				if( this.DEFAULT_TYPE_FLOOR == null ) {
					
					var tmpFloor = this.DEFAULT_TYPE_NAME;
					var foundFloor = null;
					
					$.each(typeMapViaId, function(key, value){			
						// do a non-case check
						var name = value.name.toUpperCase();
													
						if( name === tmpFloor ) {
							foundFloor = value;
						}
					});
					
					this.DEFAULT_TYPE_FLOOR = foundFloor;
				}
				
				if( this.DEFAULT_TYPE_FLOOR == null ) {					
					// TODO: This needs to be looked at in the future
					console.log(" Could not found the Info !!");
					return false;
					
				}else {	
						// we set the default to the floor type
						GlobalUtils.setGlobalTypeSelected( this.DEFAULT_TYPE_FLOOR.id );					
						// we should have all the floor nodes
						// note: we treat the floor's as the ENTRY NODE for this deco
						var tmpFloors = GlobalTypeInstanceUtils.getAllInstances( this.DEFAULT_TYPE_FLOOR.id );
								
						if(tmpFloors)  {
							this.ENTRY_NODES = tmpFloors;
							console.table(tmpFloors);
							return true;
						}else { 
							return false; 
							}
				}
	    }
	};
		
	this.printFloors = function() {	
											
//		build List of Type floor Instances available if ANY	
		var floorInfoDiv = document.getElementById('floor_mgr_floor_inst_id');
			
//		output the entry floors
		var inputs = "<table id='floorlist'>";
//		first row should have an add feature
		inputs += "<tr><td colspan=''>Current Floors</td>";
	    inputs += "<td class='create_icon' onclick=\"( new FloorManagerRender() ).createFloor();\"><img  id='img_create' title='Create Floor'   src='"+img_path+ "design_icons/create.png'></td></tr><tr>";	    
	   
	    var entryNodes = this.ENTRY_NODES;
	    
		$.each( entryNodes, function(key, value) {
			
			var uuid = NodeUtils.findUUID(value);
			if(!uuid ){
				console.log(" no Floor uuid  given "+ uuid );
				console.log(" Can not add the node to the list");
				return;
			}
				
//			create the subdivision for that node 		
			bodyDiv = $( "#floor_body");		
			if (document.getElementById('floor_detail_'+uuid) == undefined || document.getElementById('floor_detail_'+uuid) == null) {		
				FloorUtils.createAppendHTMLEntity('div', 'floor_detail_'+uuid , 'floor_detail', 'visible', 'inline-block', '', bodyDiv);
			}
//			find the Name of floor 
			var tmpName = NodeUtils.findNameInst(value);
			console.log("This should be the name : " + tmpName );
																		
			inputs += "<td ><button type='button' style='color:black; background:"+value.color+"' id='"+uuid+"'  onclick=\"( new FloorManagerRender() ).selectedFloor('" + uuid + "')\"  >"+ tmpName;
			inputs += "</button></td>";
	     });
			inputs +="</tr></table>";
			floorInfoDiv.innerHTML = inputs;			
	}	
	
	this.addFloorInst = function(uuid ){
		if(!uuid ){
			console.log(" no Node uuid  given "+ uuid );
			console.log(" Can not add the node to the list");
			return;
		}
	
//		create the subdivision for that node 		
		bodyDiv = $( "#floor_body");		
		if (document.getElementById('floor_detail_'+uuid) == undefined || document.getElementById('floor_detail_'+uuid) == null) {		
			FloorUtils.createAppendHTMLEntity('div', 'floor_detail_'+uuid , 'floor_detail', 'visible', 'inline-block', '', bodyDiv);
		}
		var tmpName = NodeUtils.findNameInst(nodeMap[uuid]);
		console.log("This should be the name : " + tmpName );	
        
		var inputs = '';															
		inputs += "<td ><button type='button' style='color:black; background:"+nodeMap[uuid].color+"' id='"+uuid+"'  onclick=\"( new FloorManagerRender() ).selectedFloor('" + uuid + "')\"  >"+ tmpName;
		inputs += "</button></td>";
	
		$('#floorlist').find('td:last').after( inputs);			
		
	}

	this.setDefaultsForDivs = function( key ){
		if(!key){
			console.log(" no Floor key  given "+ key);
			console.log(" Can not set the default divisions for the node ");
			return;
		}
		FloorUtils.setDefault_ChildrenDiv(key);			
		FloorUtils.setDefault_ParentDiv(key);	
		FloorUtils.setDefault_SiblingDiv(key);
		FloorUtils.setDefault_LinktoDiv(key);
		FloorUtils.setDefault_ConnectToDiv(key);
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
			console.log("missing floor  uuid ");
			console.log(" can not add the child Node Form");
			return;
		}
		var inputChild ='';
        // clear Previous ADDROW
		DisplayFormUtils.clearAddRow();	
		if($( ".addChildNodeRow" ).length == 0) {
		 
			var tableNodeChildDiv = $( "#nodeFormChildTable_" + nodeUuid );
			inputChild   += '<tr class="addChildNodeRow"><td colspan=3>&nbsp;</td></tr>';
			inputChild   += '<tr class="addChildNodeRow">';
			inputChild   += '<td>Select Type: <select id="select_child_type_'+nodeUuid+'"  onchange="FloorUtils.buildTypeProperty( \'child\',  this.value,\''+ nodeUuid +'\');" ></select> </td>';
	
			inputChild   += '<td id="td_' + nodeUuid + '"></td>';
			inputChild   += '<td><input type="button" name="add" id="addChil_'+nodeUuid+'"   class="btn btn-primary btn-xs" value="Add" onclick="( new FloorManagerRender() ).addChildNode(\''+ nodeUuid + '\');">';		
			inputChild   += '<input type="button" name="cancel" value="cancel"  onclick="FloorUtils.cancelAddChild()"></td></tr>';
				
			tableNodeChildDiv.append(inputChild);		
	
			FloorUtils.buildTypeList(nodeUuid, 'Children');
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
		DisplayFormUtils.clearAddRow();	
		
		if($(".addParentRow").length == 0) {

			var tableNodeChildDiv = $("#nodeFormParTable_" + nodeUuid );
			inputPar   += '<tr class="addParNodeRow"><td colspan=3>&nbsp;</td></tr>';
			inputPar   += '<tr class="addParNodeRow">';
			inputPar   += '<td>Select Type: <select id="select_parent_type_'+nodeUuid+'" onchange="FloorUtils.buildTypeProperty( \'parent\', this.value,\''+ nodeUuid +'\');"   ></select> </td>';
	
			inputPar   += '<td id="td_' + nodeUuid + '"></td>';
			inputPar   += '<td><input type="button" name="add" id="addPar_'+nodeUuid+'"  class="btn btn-primary btn-xs"   value="Add" onclick="( new FloorManagerRender() ).addParentNode(\''+ nodeUuid + '\');">';		
			inputPar   += '<input type="button" name="cancel" value="cancel"  onclick="FloorUtils.cancelAddPar()"></td></tr>';
				
			tableNodeChildDiv.append(inputPar);		
	
			FloorUtils.buildTypeList(nodeUuid, 'Parent');
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
		DisplayFormUtils.clearAddRow();		
		
		if($(".addSibNodeRow").length == 0) {
		 
			var tableNodeSibDiv = $("#nodeFormSibTable_" + nodeUuid);
			inputSibl   += '<tr class="addSibNodeRow"><td colspan=3>&nbsp;</td></tr>';
			inputSibl   += '<tr class="addSibNodeRow">';
			inputSibl   += '<td>Select Type: <select id="select_sibling_type_'+nodeUuid+'"  onchange="FloorUtils.buildTypeProperty( \'sibling\', this.value,\''+ nodeUuid +'\');" ></select> </td>';
	
			inputSibl   += '<td id="td_' + nodeUuid + '"></td>';
			inputSibl   += '<td><input type="button" id="addSib_'+nodeUuid+'" name="add"  class="btn btn-primary btn-xs"  value="Add" onclick="( new FloorManagerRender() ).addSibNode(\''+ nodeUuid + '\');">';		
			inputSibl   += '<input type="button" name="cancel" value="cancel"  onclick="FloorUtils.cancelAddSib()"></td></tr>';
				
			tableNodeSibDiv.append(inputSibl);		
	
			FloorUtils.buildTypeList(nodeUuid, 'Sibling');
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
			console.log("missing Floor uuid ");
			return;
		}
		// grab the properties defined for this Node 
		// create the Node Instance	
		var originNodeUuid = nodeuuid;		
		console.log("Attempting to add a new Node to the Node  :"+ nodeuuid  );
		
		// get the Type selected First 
		var Id = document.getElementById("select_child_type_"+nodeuuid).value;
		if(!Id){
			console.log(" NO TYPE Selected  and No Connection");
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
//		var properties = this.retrievePropertiesFromCreate( typeId, 'form_create_val_');
		var properties = NodeUtils.retrieveNodePropertiesFromForm ( typeId , 'form_create_val_');
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
			
//			var nbSpan = document.getElementById("nb_"+typeId);
//			var nb     = typeMapViaId[typeId].nb;
//			nbSpan.innerHTML = nb;		
							
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
							
				 NodeUtils.buildChildNodeDetail ( nodeuuid, dataEdge);
				( new FloorManagerRender() ).addNodeToChildList(nodeuuid, destUuid, dataEdge.type);
				
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
			console.log("missing floor uuid ");
			return;
		}
    	
    	// grab the properties defined for this Node 
		// create the Node Instance	
		var destinationNodeUuid = nodeuuid;		
		console.log("Attempting to add a new Node to the Node  :"+ nodeuuid  );
		
		// get the Type selected First 
		var Id = document.getElementById("select_parent_type_"+nodeuuid).value;
		
		var typeId = Id.split("|")[0];
		var connId = document.getElementById("form_create_val_connId").value;
		if(!typeId && !connId) {
			console.log(" NO TYPE SElected  and No Connection");
			return;
		}
		// retrieve the Info	
		
//		var properties = this.retrievePropertiesFromCreate( typeId, 'form_create_val_');
		
		var properties = NodeUtils.retrieveNodePropertiesFromForm ( typeId , 'form_create_val_');
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
			
//			GlobalUtils.addNBTypeInstances(dataNode);
//			var nbSpan = document.getElementById("nb_"+typeId);
//			var nb     = typeMapViaId[typeId].nb;
//			nbSpan.innerHTML = nb;	
									
			var jsonData={};
			
			// create the edge between the node and the new Node
//			 prepare the jsonData for creating an edge
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
				( new FloorManagerRender() ).addNodeToParList(nodeuuid, originUuid, dataEdge.type);
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

//	RETRIEVE AND SAVE SIBLING NODE CREATED	   
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

//		var properties = this.retrievePropertiesFromCreate( typeId, 'form_create_val_');
		
		var properties = NodeUtils.retrieveNodePropertiesFromForm ( typeId , 'form_create_val_');
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
//			GlobalUtils.addNBTypeInstances(dataNode);
//			var nbSpan = document.getElementById("nb_"+typeId);
//			var nb     = typeMapViaId[typeId].nb;
//			nbSpan.innerHTML = nb;	

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
				( new FloorManagerRender() ).addNodeToSibList(nodeuuid, destUuid, dataEdge.type);
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
  
	
	
	
	
////============================ FUNCTION TO RETRIEVE PROPERTIES OF INSTANCES FROM CHILD?PARENT?SIBLING FORM =======================
//	this.retrievePropertiesFromCreate = function(selectedTypeId, formElementId )	{
//		if(!selectedTypeId){
//			console.log(" no type given: cannot create Instance with Parent NODE  "); 
//			return;
//		}
//		
//		var typeProperties = typeMapViaId[selectedTypeId].properties;
//		
//		var error         = false;
//		var properties    = [];
//		var nodeproperty  = {};
//		
//		if(typeProperties.length != 0 ){ 
//		
//			$.each( typeProperties, function(propId, tmpProp){
//	//			Retrieve the value of property -- prepare the json
//				var valueProp = $('#'+formElementId +tmpProp.id ).val();
//				if(tmpProp.isMandatory){
//					if(!valueProp){
//						document.getElementById(formElementId + tmpProp.id ).style.backgroundColor = "yellow"; 
//						error = true;
//						return;
//					}else {
//
//						nodeproperty.propertyId    = tmpProp.id;
//
//						nodeproperty.propertyName  = tmpProp.name;
//						nodeproperty.propertyType  = tmpProp.propertyType;
//						nodeproperty.value         = valueProp;                               
//			
//						properties.push(nodeproperty);
//					}
//				}else if (valueProp){
//
//					nodeproperty.propertyId    = tmpProp.id;
//
//					nodeproperty.propertyName  = tmpProp.name;
//					nodeproperty.propertyType  = tmpProp.propertyType;
//					nodeproperty.value         = valueProp;                               
//		
//					properties.push(nodeproperty);
//				}
//				
//				nodeproperty = {};
//			});
//	    }else {
//	    	// no properties were defined for the type  -- we can still create the node instance with no properties
//	    }
//
//		properties.push(error);
//		return properties;
//	}
	
			
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
		nodeTableChildDiv.append('<tr class="child"><td><a href="#" onclick="">'+  instName + '</a></td><td>' +edgeType + '</td></td></tr>');		     	
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
		nodeTableParDiv.append('<tr class="parent"><td><a href="#" onclick="">' +  instName + '</a></td><td>' + edgeType + '</td></td></tr>');
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
   	    nodeTableSibDiv.append('<tr class="sibling"><td><a href="#" onclick="">' +  instName + '</a></td><td>' + edgeType+ '</td></td></tr>');
		
    }
	
//==========================================================================================================================================	
    this.displayViewEditProperties = function( tempType, key, value  ){
    	
    	if(!key  ){
			console.log(" no floor uuid  given "+ key );
			return;
		}
   	
    	if(!value){
    		console.log(" no  details given for the floor  "+ key);
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
		
		if($.isEmptyObject(tempType.properties)){
			tableViewInstProps = 'NO properties were defined ';
			tableEditInstProps = '';
			
		}else {
		
				$.each( tempType.properties, function( pkey, pvalue ) {
									
				    var inputpropEditRow ='';
				    var propValue;
					
					// build a Row for each property 
					// find the property value in nodeMap
					value.properties.forEach(function(nodeProperty){
						if(pvalue.name == nodeProperty.name ){
					    	propValue = nodeProperty.value;
					    }
					});
								
					
					inputpropEditRow = '<tr id="props">';
					
					if(pvalue.isMandatory){ 			
						inputpropViewRow += '<td style="color:red; background-color:grey">' ;
						inputpropEditRow += '<td style="color:red;width:100px">' ;
						}
					else{  
						inputpropViewRow += '<td style="background-color:grey" > ';
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
				var footerView  = "<tr><td colspan='2'> <input type='button' class='btn btn-primary btn-xs'  value='Go Update ' onclick='( new FloorManagerRender() ).editFloor(\"" + key + "\")' /></tr>" ;
				var footerEdit  = "<tr><td colspan='2'> <input type='button' class='btn btn-primary btn-xs'  value='Update' onclick='( new FloorManagerRender() ).saveUpdateFloor(\"" + key + "\")' />";
					footerEdit += "<input type='reset' value='Cancel' onclick='FloorUtils.updateFloor_cancel(\"" + key + "\")' /></td></tr>";
				tableViewInstProps = tableViewInstProps + footerView + "</table>";
				tableEditInstProps = tableEditInstProps + footerEdit + "</table>";
		}
			
		instViewDiv.append(tableViewInstProps);		
		instEditDiv.append(tableEditInstProps);	
	
	}
    
    this.buildParentChildrenSiblingDivsForANode = function ( nodeUuid ){
		
		if(!nodeUuid){
			console.log(" no Floor Uuid provided: cannot build the parents/Children/Sibling list  "); 
			return;
		}
		if($.isEmptyObject(nodeMap[nodeUuid])){
			console.log(" Floor does not exist in NodeMap -- can not build its Parents/Children/Sibling")
			return;
		}
		var parents = nodeMap[nodeUuid].parents;
		if(!$.isEmptyObject(parents) ){
			$.each( parents, function( key, value ) {		

				  var nodeTableParDiv = $( "#nodeFormParTable_" + nodeUuid );
	    		  nodeTableParDiv.append('<tr class="parent"><td><a href="#" onclick="">' +  value.name + '</a></td><td>' + value.ruleName + '</td></td></tr>');		
			});
		}
		var children = nodeMap[nodeUuid].children;
		if(!$.isEmptyObject(children) ){
			$.each( children, function( key, value ) {	

					  var nodeTableChildDiv = $( "#nodeFormChildTable_" + nodeUuid );
					  nodeTableChildDiv.append('<tr class="child"><td><a href="#" onclick="">'+  value.name + '</a></td><td>' + value.ruleName + '</td></td></tr>');  
			});		
		}
		var sibling = nodeMap[nodeUuid].sibling;
		if(!$.isEmptyObject(sibling) ){
			$.each( sibling, function( key, value ) {

					  var nodeTableSibDiv = $( "#nodeFormSibTable_" + nodeUuid );
		        	  nodeTableSibDiv.append('<tr class="sibling"><td><a href="#" onclick="">' +  value.name + '</a></td><td>' + value.ruleName + '</td></td></tr>');
		    });	
		}	
	}
      
    this.displayConnectTo = function ( instId ){
		if(!instId){
			console.log(" no Floor Uuid provided: cannot display the connect to table  "); 
			return;
		}
		
		var tableInstConnDiv = $("#nodeFormConnecttoTable_" + instId );		
		tableInstConnDiv.empty();				
		var inputRow = '';
        inputRow   +=  "<tr><td>Connect as :<br/><input type='radio' value='asParent' name='typeConnPosition_"+instId+"' onchange=\"FloorUtils.buildTypeListConnect(\'"+ instId+"\')\"/ >Parent<br/>";					
		inputRow   +=  "<input type='radio' value='asChild' name='typeConnPosition_"+instId+"' onchange=\"FloorUtils.buildTypeListConnect(\'"+ instId+"\' )\">Child</td></tr>";
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
        inputRow   +=  "<tr><th><input type='checkbox' value='linkTo'  name='typeLinkPosition_"+instId+"' onchange='FloorUtils.buildTypeListLink(\""+ instId+"\" )'/ >Link To </th></tr>";					
        tableInstlinktoDiv.append(inputRow);
		
	}
    
//========================================================================================================================    
    this.selectedFloor = function( instId ) {
		
		console.log("Attempting to show :" + instId );					
		if(!instId){
			console.log(" no Floor Uuid provided: cannot display related info  "); 
			return;
		}
		var floorDetails = nodeMap[instId];
		
		if(!floorDetails){
			console.log(" no Floor details  were Found " );
			return;
		}	
		
		// hide all other divisions
		$('div.floor_detail').hide();
		$('div.work_addInstance').hide();	

		$("#floor_detail_" +instId).empty();
		
		var instHolderDiv = document.getElementById("floor_detail_" +instId);
		FloorUtils.addDivsForAFloorDetails (instHolderDiv, instId );
		this.setDefaultsForDivs( instId );		
				
		var successFunction = function( data ) {		
			if($.isEmptyObject(data.nodes)){      // at least the node itself is returned if it has no Parent/Children/Sibling
				console.log(" no floor details returned from the API get all related Nodes and edges");
			}else {
				console.log("data.nodes results are : ");
				console.table(data.nodes)
				console.log("data.edges are: ");
				console.table(data.edges);                            // data.edges may be empty if no Parent/Children/Sibling								
				NodeUtils.buildNodeDetails ( instId, data);
			}					
		};	
		var failFunction = function( xhr, status, error ) {
			console.log('Not able to load related  floor Details: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Not able to load related floor Details: "+ xhr.status+"</p>");	
		};	
		var nodeApi = new NodeApis();			
		nodeApi.getRelatedNodesEdges(instId, successFunction, failFunction);
			
		var typeInfo = typeMapViaId[listTypeIds[0]];
		this.displayViewEditProperties( typeInfo, instId,  floorDetails  );
		
		this.buildParentChildrenSiblingDivsForANode( instId );	 
		this.displayConnectTo( instId);
		this.displayLinkTo( instId);
					
		FloorUtils.showDivision ("form_inst_", instId  );			
		FloorUtils.showDivision ("form_inst_children_", instId  );		
		FloorUtils.showDivision ("form_inst_parent_", instId  );	
		FloorUtils.showDivision ("form_inst_sibling_", instId  );	
		FloorUtils.showDivision ("form_inst_linkto_", instId  );	
		FloorUtils.showDivision ("form_inst_connectto_", instId  );
				
		FloorUtils.showDivision ("floor_detail_", instId  );		
		      
	};

//=====================================================================================================      	
	
	this.saveFloorCreated = function ( instId, properties ){
		
		var data = new NodeJsonObject();
		// set the minimum
		data.init(selectedMetaData.toString(), instId.toString(), properties);
		data.defaultDecorator = "1";

		var doneFunction = function( dataNode ) {
			
			$('#console-log').append("<p style='color:blue'Node created successfully.</p>");
			dataNode.color = typeMapViaId[dataNode.typeId].color;
	 	   // update corresponding section and nb of type nodes 			
			NodeUtils.AddNodeToMap( dataNode);   

			GlobalUtils.addNBTypeInstances(dataNode);
					
			listInstUuids[0] = NodeUtils.findUUID (dataNode);	
			
			// ADD Node Name in the List of Instances 
			// DISPLAY ALL INFO 	
			if(listInstUuids[0] != null) {( new FloorManagerRender() ).addFloorInst (listInstUuids[0]);	}	
			( new FloorManagerRender() ).selectedFloor( listInstUuids[0] );	
			  				
		};
			
		var failFunction = function( xhr, status, error ) {
			console.log('Error Node not created: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Error Node not created:"+ xhr.status+"</p>");	
		};
		
		var api  = new NodeApis();
		api.saveNode( data,  doneFunction, failFunction );
				
	}
		
	this.saveUpdateFloor = function( instId ) {
		if(!instId  ){
			console.log(" no floor uuid  given "+ instId );
			return;
		}
	    	
		// grab the info from the Node property fields 	
		var instEditDiv = $("#form_inst_edit_" + instId );	
					
		var jsonData = {}, nodeProperties = [], newProperties = [];
		var property = {}, newproperty = {}, foundError=false;			

		// grab type Id 
		var typeId         = nodeMap[instId].typeId;	
		if(!typeId){
			console.log(" type is not defined for this node "+ instId);
			return;
		}

		jsonData["type"] = typeId.toString();
		
		// push the uuid to properties
		var sysProperties = [];
		property =  NodeUtils.createSysJson(instId );
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

			jsonData.properties    = nodeProperties;
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
				
				nodeMap[key].properties   = data.nodes[0].properties;
												
				// grab the name property of The Node and update it in the list
				var instName = NodeUtils.findNameInst (  data.nodes[0]  );	
				var elem = document.getElementById(key);
			    elem.value = elem.innerHTML = instName;
				
			 // update and display properties info 	
				( new KitchenManagerRender() ).selectedKitchen(key);
							
	 				
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
	
    this.editFloor = function( instId ) {
		if(!instId  ){
			console.log(" no floor uuid  given "+ instId );
			return;
		}
		
		console.log("Attempting to edit :" + instId );			
		FloorUtils.hideDivision ("form_inst_", instId  );		
		FloorUtils.showDivision ("form_inst_edit_", instId  );		
		      
	};
			
	this.createFloor = function(  ) {
		
		console.log("Attempting to create Floor :" );	
		
		// hide all the others		
		$('div.floor_detail').hide();			
		$('.work_addInstance').empty();
		
		historyNode = []; 
		curThreshold = 0;
			
		var workDiv = $('#work_addInstance');		
	
		this.addFormCreateFloor( workDiv );					
					      
	};
	
//=====================================================================================================	
	
	this.addFormCreateFloor = function (workDiv ){              
	
		var inputContentList = '';
		
		 // Also in case of no Must connections/links just display the Add_Form_Inst_create
		 // add division for the node instance creation   
		 inputContentList =  '<div id="addNodeInst_'+listTypeIds[0]+'"><p> Proprietes for the Type '+typeMapViaId[listTypeIds[0]].name +'</p></div>';  
		 workDiv.append(inputContentList);
		   
		 NodeUtils.addFormInstCreate( $("#addNodeInst_"+listTypeIds[0]), listTypeIds[0] );	    
		 var footer  = '<tr align="center"><td colspan="2"><input type="button"  name="submit" class="btn btn-primary btn-xs"   id="addNodeInst_submit_' + listTypeIds[0]+ '" value="Add Instance" onclick="FloorUtils.saveFloorInfo('+listTypeIds[0]+');"/>';		
	         footer += '<input type="button"   name="cancel" id="addNodeInst_cancel_' + listTypeIds[0] + '" value="Cancel" onclick="FloorUtils.createFloor_cancel(' + listTypeIds[0] + ');"/></td></tr>';   		    
		 $('#addNodeInst_'+listTypeIds[0]+' table ').append(footer);
		 
		 FloorUtils.showDivision ("work_addInstance", ''  );		 
		
	}
	
	
	
}
	
	

	

