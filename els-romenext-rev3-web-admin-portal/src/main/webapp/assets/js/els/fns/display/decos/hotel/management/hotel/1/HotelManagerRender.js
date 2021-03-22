/**
 * For hotel reservations, use case follows:
 * 
 * 1. Enter Entry date
 * 2. Enter Personal Info
 * 3. Enter contact Info
 * 4. Enter CC
 * 5. 
 * @param divId
 * @returns
 */
function HotelManagerRender() {
	
	this.divholderId;
	this.DEFAULT_TYPE_NAME = 'HOTEL';
	this.DEFAULT_TYPE_HOTEL = null;

	this.ENTRY_NODES = null;

	this.initBase = function( tmpId ) {
		this.divHolderId = tmpId;
	}
	
	this.initRenderer = function() {

	};

	this.initView = function() {
		if ( !selectedMetaData ) {
			document.getElementById('path').innerHTML = "<p style='color:red'>No Metadata Selected  !!</p>";
			HotelFormUtils.errorDisplay("Process HALTED!! No value for metadata");
			return false;	
	    } 
		
	// reset the Interface  -- Ensuring that only proper division will be displayed
		DisplayInterfaceUtils.resetInterface();
		
		// set up this 
		this.enableFormView();			
		this.structureDiv();			
		this.initData();  // Entry Type defined --  SelectedMetadata defined 
				
		// print out the hotels	
		if( this.DEFAULT_TYPE_HOTEL != null ) {
			this.initializeTypeBar();
			this.printHotels();	
		}
							
		
	};
	
	this.enableFormView = function() {
		
		var hotelManagerDecoView = document.getElementById(activeDecos_BODY[ this.divHolderId ]);

		hotelManagerDecoView.style.display = "block";	
		
	};
	
	this.structureDiv = function() {
		
		var hotelManagerDecoView = document.getElementById(activeDecos_BODY[ this.divHolderId ]);
		hotelManagerDecoView.style.display = "block";
		hotelManagerDecoView.innerHTML = '';
		
		// generate the Hotel bar
		if (document.getElementById('hotel_list_type') == undefined || document.getElementById('hotel_list_type') == null) {
		
			HotelFormUtils.createAppendHTMLEntity('header', 'hotel_list_type' , 'panel-heading', 'visible', 'block', '', hotelManagerDecoView);
		}
		
		if (document.getElementById('hotel_inst_list') == undefined || document.getElementById('hotel_inst_list') == null) {
		
			HotelFormUtils.createAppendHTMLEntity('header', 'hotel_inst_list' , 'panel-heading', 'visible', 'block', '', hotelManagerDecoView);
			$('#hotel_inst_list').style = "vertical-align:top;";
		}
		
		
		// generate body Division 
		var bodyDiv ;
		if (document.getElementById('hotel_body') == undefined || document.getElementById('hotel_body') == null) {			
			HotelFormUtils.createAppendHTMLEntity('div', 'hotel_body' , 'cy', 'visible', 'flex', '', hotelManagerDecoView);
			bodyDiv = $( "#hotel_body");
		}
		// generate the working space for adding new instances
		if(document.getElementById('work_addInstance') == undefined || document.getElementById('work_addInstance') == null) {		
			HotelFormUtils.createAppendHTMLEntity('div', 'work_addInstance'  , 'work_addInstance', 'hidden', 'none', '', bodyDiv);			
		}	
						

	};
	
    this.initializeTypeBar = function() {
    	
    	if( this.DEFAULT_TYPE_HOTEL != null ) {		
		
			var displayTypeBar_v2 = document.getElementById('hotel_list_type');
			displayTypeBar_v2.innerHTML = "";
			var value = typeMapViaId[listTypeIds[0]];
	
			var inputs = '';
			inputs = "<table id='typesList'><tr>";		
			inputs += "<td ><button type='button' style='color:black; background:"+value.color+"' id='"+value.id+"'  >"+value.name;
			inputs += "<span  id ='nb_"+value.id+"'  class='badge'>";
			inputs += value.nb;
			inputs += "</span></button></td></tr>";
								
			inputs += "<tr><td >Current Hotels</td>";
		    inputs += "<td class='create_icon' onclick=\"( new HotelManagerRender() ).createHotel();\"><img  id='img_create' title='Create Hotel'   src='"+img_path+ "design_icons/create.png'></td></tr>";	    
		   
		    inputs +="</tr></table>";
			displayTypeBar_v2.innerHTML = inputs;
    	}
		
	};
					
	this.initData = function() {
		if(!this.DEFAULT_TYPE_NAME){                                  			
			document.getElementById('path').innerHTML = "<p style='color:red'>No DECO provided  !!</p>";		
			HotelFormUtils.errorDisplay("Process HALTED!! No DECO provided");
			return false;
		}
		if ( !selectedMetaData ) {
			document.getElementById('path').innerHTML = "<p style='color:red'>No Metadata Selected  !!</p>";
			HotelFormUtils.errorDisplay("Process HALTED!! No value for metadata");
			return false;	
	    } 
		
		if( !GlobalUtils.isTypeMapViaIdSet() ) {
			typeMap ={}; typeMapViaId = {}; 
		    ruleMap = {}; ruleMapVia = {}; 
		    connMap = {}; connMapViaId = {}; 
			
			// reload the typeMap if it isn't set yet
			GlobalUtils.loadAllTypeAndConnections();
			GlobalUtils.loadAllRules();		
		}		
				
		if( this.DEFAULT_TYPE_HOTEL == null ) {
			
			var tmpHotel = this.DEFAULT_TYPE_NAME;
			var foundHotel = null;
			
			$.each(typeMapViaId, function(key, value){			
				// do a non-case check
				var name = value.name.toUpperCase();									
				if( name === tmpHotel ) {  		foundHotel = value;
				}
			});
			
			this.DEFAULT_TYPE_HOTEL = foundHotel;
		}
				
		if( this.DEFAULT_TYPE_HOTEL == null ) {		
			document.getElementById('path').innerHTML = "<p style='color:red'>Could not found the Info for this DECO  !!</p>"+tmpHotel;
			HotelFormUtils.errorDisplay("Could not found the Info for this DECO  !!"+tmpHotel);
			return false;
			
		}else {	
				// we set the default to the hotel type
				GlobalUtils.setGlobalTypeSelected( this.DEFAULT_TYPE_HOTEL.id );					
				// we should have all the hotel nodes
				// note: we treat the hotel's as the ENTRY NODE for this deco
				var tmpHotels = GlobalTypeInstanceUtils.getAllInstances( this.DEFAULT_TYPE_HOTEL.id );
				this.ENTRY_NODES = tmpHotels;
				return true;
		}
	    
	};
		
	this.printHotels = function() {	
											
//		build List of Type Hotel Instances available if ANY	
		var hotelInfoDiv = document.getElementById('hotel_inst_list');
			
//		output the entry hotels
		var inputs = "<table id='hotellist'>";
	    inputs += "<tr><td></td>";                 // needed 
		var entryNodes = this.ENTRY_NODES;
	    
		$.each( entryNodes, function(key, value) {
			
			var uuid = NodeUtils.findUUID(value);
			if(!uuid ){
				HotelFormUtils.errorDisplay("No Node uuid  given "+ uuid  + " Can not add the node to the list");
				console.log(' Value is : %O'+ value);
				return;
			}
				
//			create the subdivision for that node 		
			bodyDiv = $( "#hotel_body");		
			if (document.getElementById('hotel_detail_'+uuid) == undefined || document.getElementById('hotel_detail_'+uuid) == null) {		
				HotelFormUtils.createAppendHTMLEntity('div', 'hotel_detail_'+uuid , 'hotel_detail', 'visible', 'block', '', bodyDiv);
			}
//			find the Name of Hotel 
			var tmpName = NodeUtils.findNameInst(value);
			console.log("This should be the name : " + tmpName );
																	
			inputs += "<td ><button type='button' style='color:black; background:"+value.color+"' id='"+uuid+"'  onclick=\"( new HotelManagerRender() ).selectedHotel('" + uuid + "')\"  >"+ tmpName;
			inputs += "</button></td>";
	     });
			inputs +="</tr></table>";
			hotelInfoDiv.innerHTML = inputs;			
	}	
	
	this.addHotelInst = function(uuid ){
		if(!uuid ){
			HotelFormUtils.errorDisplay("No Node uuid  given "+ uuid  + " Can not add the node to the list");
			return;
		}
	
//		create the subdivision for that node 		
		bodyDiv = $( "#hotel_body");		
		if (document.getElementById('hotel_detail_'+uuid) == undefined || document.getElementById('hotel_detail_'+uuid) == null) {		
			HotelFormUtils.createAppendHTMLEntity('div', 'hotel_detail_'+uuid , 'hotel_detail', 'visible', 'block', '', bodyDiv);
		}
		var tmpName = NodeUtils.findNameInst(nodeMap[uuid]);
		console.log("This should be the name : " + tmpName );	
        
		var inputs = '';															
		inputs += "<td ><button type='button' style='color:black; background:"+nodeMap[uuid].color+"' id='"+uuid+"'  onclick=\"( new HotelManagerRender() ).selectedHotel('" + uuid + "')\"  >"+ tmpName;
		inputs += "</button></td>";
	
		$('#hotellist').find('td:last').after( inputs);			
		
	}

	this.setDefaultsForDivs = function( key ){
		if(!key){
			HotelFormUtils.errorDisplay("no Hotel key  given "+ key  + " Can not set the default divisions for the node");
			return;
		}
		HotelFormUtils.setDefault_ChildrenDiv(key);			
		HotelFormUtils.setDefault_ParentDiv(key);	
		HotelFormUtils.setDefault_SiblingDiv(key);
		HotelFormUtils.setDefault_LinktoDiv(key);
		HotelFormUtils.setDefault_ConnectToDiv(key);
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
			HotelFormUtils.errorDisplay("Missing Hotel key   "+ nodeUuid  + " can not add  child Node Form");
			return;
		}
		var inputChild ='';
        // clear Previous ADDROW
		HotelFormUtils.clearAddRow();	
		if($( ".addChildNodeRow" ).length == 0) {
		 
			var tableNodeChildDiv = $( "#nodeFormChildTable_" + nodeUuid );
			inputChild   += '<tr class="addChildNodeRow"><td colspan=3>&nbsp;</td></tr>';
			inputChild   += '<tr class="addChildNodeRow">';
			inputChild   += '<td>Select Type: <select id="select_child_type_'+nodeUuid+'"  onchange="HotelUtils.buildTypeProperty( \'child\',  this.value,\''+ nodeUuid +'\');" ></select> </td>';
	
			inputChild   += '<td id="td_' + nodeUuid + '"></td>';
			inputChild   += '<td><input type="button" name="add" id="addChil_'+nodeUuid+'"   class="btn btn-primary btn-xs" value="Add" onclick="( new HotelManagerRender() ).addChildNode(\''+ nodeUuid + '\');">';		
			inputChild   += '<input type="button" name="cancel" value="cancel"  onclick="HotelFormUtils.cancelAddChild()"></td></tr>';
				
			tableNodeChildDiv.append(inputChild);		
	
			HotelUtils.buildTypeList(nodeUuid, 'Children');
		} else {
			console.warn("FOUND : " + $( ".addChildNodeRow" ).length + " Add Child Node ");
		}
		
	};	
	
//	BUILT ADD PARENT NODE FORM  Based on SELECTED CHILD TYPE
	this.addParNodeForm = function( nodeUuid ) {
		if(!nodeUuid){
			HotelFormUtils.errorDisplay("Missing Hotel key   "+ nodeUuid  + " can not add  parent Node Form");
			return;
		}
		var inputPar ='';
		 // clear Previous ADDROW
		HotelFormUtils.clearAddRow();	
		
		if($(".addParentRow").length == 0) {

			var tableNodeChildDiv = $("#nodeFormParTable_" + nodeUuid );
			inputPar   += '<tr class="addParNodeRow"><td colspan=3>&nbsp;</td></tr>';
			inputPar   += '<tr class="addParNodeRow">';
			inputPar   += '<td>Select Type: <select id="select_parent_type_'+nodeUuid+'" onchange="HotelUtils.buildTypeProperty( \'parent\', this.value,\''+ nodeUuid +'\');"   ></select> </td>';
	
			inputPar   += '<td id="td_' + nodeUuid + '"></td>';
			inputPar   += '<td><input type="button" name="add" id="addPar_'+nodeUuid+'"  class="btn btn-primary btn-xs"   value="Add" onclick="( new HotelManagerRender() ).addParentNode(\''+ nodeUuid + '\');">';		
			inputPar   += '<input type="button" name="cancel" value="cancel"  onclick="HotelFormUtils.cancelAddPar()"></td></tr>';
				
			tableNodeChildDiv.append(inputPar);		
	
			HotelUtils.buildTypeList(nodeUuid, 'Parent');
		} else {
			console.warn("FOUND : " + $( ".addParentRow" ).length + " Add Parent Node ");
		}
		
	};
	
//	BUILT ADD SIBLING NODE FORM  Based on SELECTED CHILD TYPE
	this.addSibNodeForm = function( nodeUuid ) {
		if(!nodeUuid){
			HotelFormUtils.errorDisplay("Missing Hotel key   "+ nodeUuid  + " can not add Sibling Node Form");
			return;
		}
		var inputSibl ='';
        // clear Previous ADDROW
		HotelFormUtils.clearAddRow();		
		
		if($(".addSibNodeRow").length == 0) {
		 
			var tableNodeSibDiv = $("#nodeFormSibTable_" + nodeUuid);
			inputSibl   += '<tr class="addSibNodeRow"><td colspan=3>&nbsp;</td></tr>';
			inputSibl   += '<tr class="addSibNodeRow">';
			inputSibl   += '<td>Select Type: <select id="select_sibling_type_'+nodeUuid+'"  onchange="HotelUtils.buildTypeProperty( \'sibling\', this.value,\''+ nodeUuid +'\');" ></select> </td>';
	
			inputSibl   += '<td id="td_' + nodeUuid + '"></td>';
			inputSibl   += '<td><input type="button" id="addSib_'+nodeUuid+'" name="add"  class="btn btn-primary btn-xs"  value="Add" onclick="( new HotelManagerRender() ).addSibNode(\''+ nodeUuid + '\');">';		
			inputSibl   += '<input type="button" name="cancel" value="cancel"  onclick="HotelFormUtils.cancelAddSib()"></td></tr>';
				
			tableNodeSibDiv.append(inputSibl);		
	
			HotelUtils.buildTypeList(nodeUuid, 'Sibling');
		} else {
			console.warn("FOUND : " + $( ".addSibNodeRow" ).length + " Add Sibling Node ");
		}
		
	};	
		
//===============================================================================================================================
//          FUNCTIONS   TO SAVE  CREATED :
//                    1. CHILDREN
//                    2. PARENTS 
//                    3. SIBLING
//===============================================================================================================================			

	//	RETRIEVE AND SAVE CHILD NODE CREATED
	this.addChildNode  = function( nodeuuid){
		if(!nodeuuid){
			HotelFormUtils.errorDisplay("Missing Hotel key   "+ nodeuuid  + " can not add the child  Node ");
			return;
		}
		// grab the properties defined for this Node 
		// create the Node Instance	
		
		console.log("%c Attempting to add a new Node to the Node  :"+ nodeuuid , "colo:blue" );
		
		// get the Type selected First 
		var Id = document.getElementById("select_child_type_"+nodeuuid).value;
		if(!Id){
			console.error(" NO TYPE SElected  and No Connection");
			document.getElementById('select_child_type_'+nodeuuid).style.background = 'yellow';
			return;
		}
		document.getElementById('select_child_type_'+nodeuuid).style.background = '';
			
		var typeId = Id.split("|")[0];
		var connId = Id.split("|")[1];
		
		if(!typeId && !connId) {
			console.error(" NO TYPE Selected  and No Connection given");
			return;
		}
		
		HotelUtils.loopStackForSaving();
		
		HotelUtils.retrievPropertiesSaveHotel (  typeId );
        
		if(!listInstUuids[0]){
			console.error("failure in creating  node ");
			return;
		}
		createEdgeList.forEach(function ( element) {
			if( element.currTypeId == typeId ){	
					 element.currNodeUuid = listInstUuids[0];	
			}
		})
		
		var originNodeUuid = nodeuuid;			
		var destUuid = listInstUuids[0];
		
		
		var element = {};
		element.currTypeId       = listTypeIds[0];
    	element.currNodeUuid = originNodeUuid;
    	element.typeIdcas        = 'asChild';            // element.typeIdcas        = 'asChild';            // 
    	element.sTypeId          = typeId;               // ?????????????????
    	element.typeConn         = connId;
    	element.nodeUuid         = destUuid;
    	element.status           = 'pending';
    	createEdgeList.push(element);
    	element = {};    	
				
    	// create all edges 
		 console.table(createEdgeList);
		 HotelUtils.createEdges();
			
		 var div = $(".addChildNodeRow");			
		div.remove();	
		 		 
	}
	
//	RETRIEVE AND SAVE PARENT NODE CREATED	  --- OPTION NOT ACTIVE FOR HOTEL -- SHOULD BE CHANGED IF ACTIVATE
    this.addParentNode = function( nodeuuid){
    	if(!nodeuuid){
			console.log("missing Hotel uuid ");
			return;
		}
    	
    	// grab the properties defined for this Node 
		// create the Node Instance	
		var destinationNodeUuid = nodeuuid;		
		console.log("Attempting to add a new Node to the Node  :"+ nodeuuid  );
		
		// get the Type selected First 
		var Id = document.getElementById("select_parent_type_"+nodeuuid).value;
		
		var typeId = Id.split("|")[0];
//		var connId = document.getElementById("form_create_val_connId").value;
		var connId = Id.split("|")[1];
		if(!typeId && !connId) {
			console.log(" NO TYPE SElected  and No Connection");
			return;
		}
		// retrieve the Info	
		
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
									
			var jsonData={};
			
			// create the edge between the node and the new Node
//			 prepare the jsonData for creating an edge
			
			jsonData = NodeUtils.createEdgeJson(  element.currTypeId, element.currNodeUuid, element.sTypeId, element.nodeUuid, element.typeConn  );
			
			
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
				( new HotelManagerRender() ).addNodeToParList(nodeuuid, originUuid, dataEdge.type);
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

////	RETRIEVE AND SAVE SIBLING NODE CREATED	   
    this.addSibNode    =  function( nodeuuid){
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

			var jsonData={};
			
			// create the edge between the node and the new Node
//			 prepare the jsonData for creating an edge
			jsonData = NodeUtils.createEdgeJson(  nodeMap[originNodeUuid].typeId, originNodeUuid, dataNode.typeId, destUuid, connId  );
			
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
				( new HotelManagerRender() ).addNodeToSibList(nodeuuid, destUuid, dataEdge.type);
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
		nodeTableChildDiv.append('<tr class="child"><td>'+  instName + '</td><td colspan="2"><a href="#" onclick="HotelUtils.showEdgeDetails(\''+node+'\',' +edgeType.id + ')">' +edgeType.type + '</a><i class="fa fa-eye fa-fw"></i></td></tr>');		     	 
    
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
		nodeTableParDiv.append('<tr class="parent"><td>' +  instName + '</td><td colspan="2"><a href="#" onclick="HotelUtils.showEdgeDetails(\''+node+'\',' +edgeType.id + ')">' + edgeType.type + '</a><i class="fa fa-eye fa-fw"></i></td></tr>');
    
    
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
   	    nodeTableSibDiv.append('<tr class="sibling"><td>' +  instName + '</td><td colspan="2"><a href="#" onclick="HotelUtils.showEdgeDetails(\''+node+'\',' +edgeType.id + ')">' + edgeType.type+ '</a><i class="fa fa-eye fa-fw"></i></td></tr>');
		
    }
	
//==========================================================================================================================================	
    this.displayViewEditProperties = function( tempType, key, value  ){
    	
    	if(!key  ){
			console.log(" no Hotel uuid  given "+ key );
			return;
		}
   	
    	if(!value){
    		console.log(" no  details given for the Hotel  "+ key);
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
				var footerView  = "<tr><td colspan='2'> <input type='button' class='btn btn-primary btn-xs'  value='Go Update ' onclick='( new HotelManagerRender() ).editHotel(\"" + key + "\")' /></td></tr>" ;
				var footerEdit  = "<tr><td colspan='2'> <input type='button' class='btn btn-primary btn-xs'  value='Update' onclick='( new HotelManagerRender() ).saveUpdateHotel(\"" + key + "\")' />";
					footerEdit += "<input type='reset' value='Cancel' onclick='HotelFormUtils.updateHotel_cancel(\"" + key + "\")' /></td></tr>";
				tableViewInstProps = tableViewInstProps + footerView + "</table>";
				tableEditInstProps = tableEditInstProps + footerEdit + "</table>";
		}
			
		instViewDiv.append(tableViewInstProps);		
		instEditDiv.append(tableEditInstProps);	
	
	}
    
    this.buildParentChildrenSiblingDivsForANode = function ( nodeUuid ){
		
		if(!nodeUuid){
			console.log(" no Hotel Uuid provided: cannot build the parents/Children/Sibling list  "); 
			return;
		}
		if($.isEmptyObject(nodeMap[nodeUuid])){
			console.log(" Hotel does not exist in NodeMap -- can not build its Parents/Children/Sibling")
			return;
		}
		var listTypeParents = [];
		var parents = nodeMap[nodeUuid].parents;
		if(!$.isEmptyObject(parents) ){
			$.each( parents, function( key, value ) {		
                  if($.inArray(value.TypeName, listTypeParents) == '-1' ){listTypeParents.push(value.TypeName);}
				  var nodeTableParDiv = $( "#nodeFormParTable_" + nodeUuid );
	    		  nodeTableParDiv.append('<tr class="parent"><td>' +  value.name + '</td><td colspan="2"><a href="#" onclick="HotelUtils.showEdgeDetails(\''+nodeUuid+'\',' +value.connId + ')">' + value.ruleName + '</a><i class="fa fa-eye fa-fw"></i></td></tr>');		
			});
			var elem = document.getElementById('listTypeParents_'+nodeUuid);
		    elem.innerHTML = listTypeParents.toString();	
		}
		
		
		
		var listTypeChildren = [];
		var children = nodeMap[nodeUuid].children;
		if(!$.isEmptyObject(children) ){
			$.each( children, function( key, value ) {	
				      if($.inArray(value.TypeName, listTypeChildren) == '-1' ){listTypeChildren.push(value.TypeName);}
					  var nodeTableChildDiv = $( "#nodeFormChildTable_" + nodeUuid );
					  nodeTableChildDiv.append('<tr class="child"><td>'+  value.name + '</td><td colspan="2"><a href="#" onclick="HotelUtils.showEdgeDetails(\''+nodeUuid+'\',' +value.connId + ')">' + value.ruleName + '</a><i class="fa fa-eye fa-fw"></i></td></tr>');  
			});	
			var elem = document.getElementById('listTypeChildren_'+nodeUuid);
		    elem.innerHTML = listTypeChildren.toString();
		}
		
		
		var listTypeSibling = [];
		var sibling = nodeMap[nodeUuid].sibling;
		if(!$.isEmptyObject(sibling) ){
			$.each( sibling, function( key, value ) {
				      if($.inArray(value.TypeName, listTypeSibling) == '-1' ){listTypeSibling.push(value.TypeName);}
					  var nodeTableSibDiv = $( "#nodeFormSibTable_" + nodeUuid );
		        	  nodeTableSibDiv.append('<tr class="sibling"><td>' +  value.name + '</td><td colspan="2"><a href="#" onclick="HotelUtils.showEdgeDetails(\''+nodeUuid+'\',' +value.connId + ')">' + value.ruleName + '</a><i class="fa fa-eye fa-fw"></i></td></tr>');
		    });	
			var elem = document.getElementById('listTypeSiblings_'+nodeUuid);
		   elem.innerHTML = listTypeSibling.toString();
		}	
		
		
	}
      
    this.displayConnectTo = function ( instId ){
		if(!instId){
			console.log(" no Hotel Uuid provided: cannot display the connect to table  "); 
			return;
		}
		
		var tableInstConnDiv = $("#nodeFormConnecttoTable_" + instId );		
		tableInstConnDiv.empty();				
		var inputRow = '';
        inputRow   +=  "<tr><td>Connect Hotel as :<br/><input type='radio' value='asParent' name='typeConnPosition_"+instId+"' onchange=\"HotelUtils.buildTypeListConnect(\'"+ instId+"\')\"/ >Parent of:<br/>";					
		inputRow   +=  "<input type='radio' value='asChild' name='typeConnPosition_"+instId+"' onchange=\"HotelUtils.buildTypeListConnect(\'"+ instId+"\' )\">Child of:</td></tr>";
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
        inputRow   +=  "<tr><th><input type='checkbox' value='linkTo'  name='typeLinkPosition_"+instId+"' onchange='HotelUtils.buildTypeListLink(\""+ instId+"\" )'/ >Link Hotel  To:  </th></tr>";					
        tableInstlinktoDiv.append(inputRow);
		
	}
    
//========================================================================================================================================= 
    
    this.selectedHotel = function( hotelId ) {
		
		console.log("Attempting to show :" + hotelId );					
		if(!hotelId){
			console.log(" no Hotel Uuid provided: cannot display related info  "); 
			return;
		}
		var hotelDetails = nodeMap[hotelId];
		
		if(!hotelDetails){
			console.log(" no Hotel details  were Found " );
			return;
		}	
		
		// hide all other divisions
		$('div.hotel_detail').hide();
		$('div.form_inst_edgedetails').hide();
		$('div.work_addInstance').empty();	

		$("#hotel_detail_" +hotelId).empty();
		
		var instHolderDiv = document.getElementById("hotel_detail_" +hotelId);
		HotelFormUtils.addDivsForAHotelDetails (instHolderDiv, hotelId );
		this.setDefaultsForDivs( hotelId );		
				
		var successFunction = function( data ) {	
			if($.isEmptyObject(data)||    $.isEmptyObject(data.edges)){      // at least the node itself is returned if it has no Parent/Children/Sibling
				console.warn (" no Hotel details returned from the API getRelatedNodes&Edges");
			}else {		
				console.log("data.edges are: ");
				console.table(data.edges);                            // data.edges may be empty if no Parent/Children/Sibling								
				NodeUtils.buildNodeDetails ( hotelId, data);
			}			
								
		};	
		var failFunction = function( xhr, status, error ) {
			console.log('Not able to load related  Hotel Details: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Not able to load related Hotel Details: "+ xhr.status+"</p>");	
		};	
		var nodeApi = new NodeApis();			
		nodeApi.getRelatedNodesEdges(nodeMap[hotelId].typeId , hotelId, successFunction, failFunction);
			
		var typeInfo = typeMapViaId[listTypeIds[0]];
		this.displayViewEditProperties( typeInfo, hotelId,  hotelDetails  );
		
		this.buildParentChildrenSiblingDivsForANode( hotelId );	 
		this.displayConnectTo( hotelId);
		this.displayLinkTo( hotelId);
					
		HotelFormUtils.showDivision ("form_inst_", hotelId  );			
		HotelFormUtils.showDivision ("form_inst_children_", hotelId  );		
//		HotelFormUtils.showDivision ("form_inst_parent_", hotelId  );	
		HotelFormUtils.showDivision ("form_inst_sibling_", hotelId  );	
		HotelFormUtils.showDivision ("form_inst_linkto_", hotelId  );	
		HotelFormUtils.showDivision ("form_inst_connectto_", hotelId  );
				
		HotelFormUtils.showDivision ("hotel_detail_", hotelId  );		
		      
	};

//=====================================================================================================      	
	
	this.saveHotelCreated = function ( hotelId, properties ){
		
		var data = new NodeJsonObject();
		// set the minimum
		data.init(selectedMetaData.toString(), hotelId.toString(), properties);
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
		
	this.saveUpdateHotel = function( hotelId ) {
		if(!hotelId  ){
			console.log(" no Hotel uuid  given "+ hotelId );
			return;
		}
	    	
		// grab the info from the Node property fields 	
		var instEditDiv = $("#form_inst_edit_" + hotelId );	
					
		var jsonData = {}, nodeProperties = [], newProperties = [];
		var property = {}, newproperty = {}, foundError=false;			
		
		// grab type Id 
		var typeId         = nodeMap[hotelId].typeId;	
		if(!typeId){
			console.log(" type is not defined for this node "+ hotelId);
			return;
		}

		jsonData["type"] = typeId.toString();
		
		// push the uuid to properties
		
		var sysProperties = [];
		property =  NodeUtils.createSysJson(hotelId );
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
			console.log(" The new ones are :"+ sysProperties);
			
            jsonData.sysProperties = sysProperties;
			jsonData.properties    = nodeProperties;
			jsonData.newProperties = newProperties;
					
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
				( new HotelManagerRender() ).selectedHotel(key);
 				
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
	
    this.editHotel = function( hotelId ) {
		if(!hotelId  ){
			console.log(" no Hotel uuid  given "+ hotelId );
			return;
		}
		
		console.log("%cAttempting to edit :" + hotelId, "color:blue" );			
		HotelFormUtils.hideDivision ("form_inst_", hotelId  );		
		HotelFormUtils.showDivision ("form_inst_edit_", hotelId  );		
		      
	};
			
	this.createHotel = function(  ) {
		
		console.log("Attempting to create Hotel :" );	
		
		// hide all the others		
		$('div.hotel_detail').hide();			
		$('.work_addInstance').empty();
		
		historyNode = []; 
		curThreshold = 0;
			
		var workDiv = $('#work_addInstance');
		var typeId = listTypeIds[0];
				
		HotelUtils.createInstHotel( typeId, workDiv, historyNode );
		
		 var footer  = '<tr align="center"><td colspan="2"><input type="button"  name="submit" class="btn btn-primary btn-xs"   id="addNodeInst_submit_' + typeId+ '" value="Add Instance" onclick="HotelUtils.saveHotelInfo('+typeId+');"/>';		
         footer += '<input type="button"   name="cancel" id="addNodeInst_cancel_' + typeId + '" value="Cancel" onclick="HotelUtils.createHotel_cancel(' + typeId + ');"/></td></tr>';   		    
	    $('#addNodeInst_'+typeId+' table ').append(footer);
	    
	    HotelFormUtils.showDivision ("work_addInstance", ''  );				
					      
	};
	

}
	
	

	

