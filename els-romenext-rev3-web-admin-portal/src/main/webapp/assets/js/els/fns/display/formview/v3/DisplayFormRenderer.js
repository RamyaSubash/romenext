function DisplayFormRenderer(  ) {
	
	this.divholderId ;
	
	this.initBase = function( divId ) {
		console.log("divId is: "+ divId);
		this.divHolderId = divId;
		
	};
	
	this.initRenderer = function() {
//		 NodeUtils.globalNode_addFn( "create", "form", DisplayFormRendererCrud.NodeCreate );
	};

	this.initView = function() {
		active_deco = "form_instance";
		// load all CRUD operations for this decorator	
		// ensure all values are loaded
		DisplayInterfaceUtils.resetInterface();
		
		// set up this 
		this.enableFormView();	
		
		this.structureDiv();
					
		// double check to see if the values have been initialized
		var loadInitial = this.checkInitialValues();
		
		if ( loadInitial ) {		
			this.initializeTypeBar();			
			this.loadView();
		}
			
	};
		
	this.structureDiv = function() {
		
		var DisplayFormDecoView = document.getElementById(activeDecos_BODY[ this.divHolderId ]);
		DisplayFormDecoView.style.display = "block";
		DisplayFormDecoView.innerHTML = '';
		
		// generate the TYPE bar	
		if (document.getElementById('display_form_typebar') == undefined || document.getElementById('display_form_typebar') == null) {		
			var typeBar = GlobalHTMLUtils.createHTMLEntity('header', 'display_form_typebar', 'panel-heading', 'visible', 'block', 'Type Bar');
			typeBar.style = "vertical-align:top;";
			DisplayFormDecoView.appendChild(typeBar);
		}
			
		// generate for Button creating New Instance for A specific TYPE	
		if (document.getElementById('display_form_typebar_sub') == undefined || document.getElementById('display_form_typebar_sub') == null) {		
			var typebarSub = GlobalHTMLUtils.createHTMLEntity('header', 'display_form_typebar_sub', 'typebar-sub-panel-heading', 'visible', 'block', '');
			typebarSub.style = "vertical-align:top;";
			DisplayFormDecoView.append( typebarSub );
		}
		
		// generate body Division made of two divisions
		if (document.getElementById('form_deco_body') == undefined || document.getElementById('form_deco_body') == null) {
			var bodyDiv = GlobalHTMLUtils.createHTMLEntity('div', 'form_deco_body', 'cy', 'visible', 'flex', '');						
			DisplayFormDecoView.appendChild(bodyDiv);	
		}
		
		// generate the Left menu Instance 
		if (document.getElementById('form_deco_left_body') == undefined || document.getElementById('form_deco_left_body') == null) {
			var leftBodyDiv = GlobalHTMLUtils.createHTMLEntity('div', 'form_deco_left_body', 'left_body', 'visible', 'inline-block', '');								
			bodyDiv.appendChild(leftBodyDiv);
		}
		
		//generate the Right Division for all actions
		//  VIEW -- EDIT -- Instance 
		//  CREATE CHILDREN -- PARENT -- SIBLING  
		//  LINK/CONNECT  to EXISTING INSTANCES
		if (document.getElementById('form_deco_right_body') == undefined || document.getElementById('form_deco_right_body') == null) {
			var rightBodyDiv = GlobalHTMLUtils.createHTMLEntity('div', 'form_deco_right_body', 'right_body', 'visible', 'inline-block', '');	
			bodyDiv.appendChild(rightBodyDiv);
		}

	};
	
	this.enableFormView = function() {		
		
		var DisplayFormDecoView = document.getElementById(activeDecos_BODY[ this.divHolderId ]);
		
		DisplayFormDecoView.style.display = "block";		
	};
			
	this.checkInitialValues = function() {
		
		if ( !selectedMetaData ) {
			document.getElementById('path').innerHTML = "<p style='color:red'>No Metadata Selected  !!</p>";
			console.error(" No value for metadata ")
			return false;	
	    } else {
//		Build typeMap/typeMapViaId - connMap/connMapViaId  -- ruleMap/ruleMapViaId
	    typeMap ={}; typeMapViaId = {}; 
	    ruleMap = {}; ruleMapVia = {}; 
	    connMap = {}; connMapViaId = {}; 
	    nodeMap = {}; nodeMapViaId = {};
		GlobalUtils.loadAllTypeAndConnections();
		GlobalUtils.loadAllRules();		

		return true;		
	    }

	};

	this.initializeTypeBar = function() {
		
		var displayTypeBar_v2 = document.getElementById('display_form_typebar');
		displayTypeBar_v2.innerHTML = "";

		// create the sub typebar for this type
		var typeBarSubDiv = $( "#display_form_typebar_sub" );
		
		if (document.getElementById('display_form_typebar_sub') == undefined || document.getElementById('display_form_typebar_sub') == null) {
			console.log(" division to Display Type bar does not exist");
			return;
		}
		
		// find total number
		var totals = Object.keys( typeMapViaId ).length;
		
		inputs = "<table id='typesList'><tr>";
		inputs += "<td><span class='badge'>*("+ totals +")</span></td>";
		
		if( totals > 0 ){
			$.each( typeMapViaId, function(key, value){
							
					// add the TYPEBAR type
					inputs += "<td ><button type='button' style='color:black; background:"+value.color+"' id='"+value.id+"'  onclick=\"( new DisplayFormRenderer() ).selectedType('" + value.id + "')\"  >"+value.name;
					inputs += "<span  id ='nb_"+value.id+"'  class='badge'>";
	                if( value.nb ) { 
	                	inputs += value.nb;
	                } else { 
	                	inputs += '0';
	                }
					inputs += "</span>";
					inputs += "</button></td>";
					
					// add the TYPEBAR SUB menu
					var checktypeBarSubDiv = $( "#display_form_typebar_sub_" + value.id );
					
					if( checktypeBarSubDiv == null || checktypeBarSubDiv.length == 0 ) {
						// no div found, create it
						var newSubDiv = document.createElement('div');
						newSubDiv.id = 'display_form_typebar_sub_'  + value.id;
						newSubDiv.className = 'display_form_typebar_sub_class';
						newSubDiv.style.visibility = "hidden";
						newSubDiv.style.display = "none";
						newSubDiv.innerHTML = "<br/><table id='display_form_typebar_sub_table_" + value.id + "' border=1><tr><th>Create new <span style='background:"+value.color+"'>" + value.name + "</th><td class='create_icon' onclick='( new DisplayFormRenderer() ).createNode(" + value.id + ");'><img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td></tr></table>";
						
						typeBarSubDiv.append( newSubDiv );			
						checktypeBarSubDiv = $(  "#display_form_typebar_sub_" + value.id  );
					}	
			});
		}
		
		if( totals == 0 ) {
			inputs += "<td> No Type is created yet</td>";
		}

		inputs +="</tr></table>";
		displayTypeBar_v2.innerHTML = inputs;
		
	};
	
	this.loadView = function() {
				
		console.log("Initializing the form view");				
		// clear the current  body 
		var bodyleft = document.getElementById('form_deco_left_body');
		bodyleft.innerHTML = "";
					
		var bodyright =  document.getElementById('form_deco_right_body');
		bodyright.innerHTML = "";
		
		if (document.getElementById('form_deco_left_body') == undefined || document.getElementById('form_deco_left_body') == null) {
			console.log(" division to Display left Body does not exist");
			return;
		}
		if (document.getElementById('form_deco_right_body') == undefined || document.getElementById('form_deco_right_body') == null) {
			console.log(" division to Display  Right body does not exist");
			return;
		}
		
//		Build the LEFT && RIGHT Division for Each Type 	
		$.each( typeMapViaId, function( typeId, tmpType ) {			
			// grab the left division and add for each Type a division
			// Inside that add the ADD INSTANCE FORM  ++++  List of instances for that Type
			var instHolderDivNameLeft = "form_deco_left_body_sub_div_" + typeId;	
			
			DisplayFormUtils.addFormDivsLeft (bodyleft, instHolderDivNameLeft, typeId   );
			
			var instHolderDivNameRight = "form_deco_right_body_sub_div_" + typeId;	
			
			DisplayFormUtils.addFormDivsRight( bodyright, instHolderDivNameRight , typeId );
						
		});
					
	};
	
    //	ADD NODE TO LIST of NODES FOR A TYPE
	this.addNodeInstanceToList = function( key){
		if(!key ){
			console.log(" no Node uuid  given "+ key );
			console.log(" Can not add the node to the list");
			return;
		}
		if(!nodeMap[key]){
			console.log(" no Node details  given "+ nodeMap[key] );
			return;
		}
		var value = nodeMap[key];		
		var instHolderDiv = $( "#form_inst_list_" + value.typeId );
		
		// grab the name property of The Node if it exists  or its TYPE
		var instName = NodeUtils.findNameInst ( value  );		
        
		// display the Node link in the subdivision
		instHolderDiv.append( "<tr> <td class=eleInst><a href='#' id ='"+key +"' onclick='( new DisplayFormRenderer() ).selectInstance(\"" + key + "\")'>" + instName + "</a></td></tr>" );

	}

	//	ADD ALL RIGHT DIVS For a NODE ( Newly Created or Loaded)
	this.createAllRightDivsForNode = function ( key ){
		if(!key ){
			console.log(" no Node uuid  given "+ key );
			console.log(" Can not create the different divisions for the node ");
			return;
		}
		if(!nodeMap[key]){
			console.log(" no Node details  Found in nodeMap "+ nodeMap[key] );
			return;
		}
		var value = nodeMap[key];
					
		var instHolderDiv = document.getElementById("form_deco_right_body_sub_div_" +value.typeId);	
				
		DisplayFormUtils.addRightDivsForAType (instHolderDiv, key );	
	}
	
    //  Fill DEFAULT Content For RIGHT DIVISION of A NODE	
	this.setDefaultsForDivs = function( key ){
		if(!key){
			console.log(" no Node uuid  given "+ key);
			console.log(" Can not set the default divisions for the node ");
			return;
		}
		DisplayFormUtils.setDefault_ChildrenDiv(key);			
		DisplayFormUtils.setDefault_ParentDiv(key);	
		DisplayFormUtils.setDefault_SiblingDiv(key);
		DisplayFormUtils.setDefault_LinktoDiv(key);
		DisplayFormUtils.setDefault_ConnectToDiv(key);
	}
	

//	BUILT ADD CHILD NODE FORM  Based on SELECTED CHILD TYPE
	this.addChildNodeForm = function( nodeUuid ) {
		if(!nodeUuid){
			console.log("missing node uuid ");
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
			inputChild   += '<td>Select Type: <select id="select_child_type_'+nodeUuid+'"  onchange="DisplayFormUtils.buildTypeProperty( \'child\',  this.value,\''+ nodeUuid +'\');" ></select> </td>';
	
			inputChild   += '<td id="td_' + nodeUuid + '"></td>';
			inputChild   += '<td><input type="button" name="add" id="addChil_'+nodeUuid+'"   class="btn btn-primary btn-xs" value="Add" onclick="( new DisplayFormRenderer() ).addChildNode(\''+ nodeUuid + '\');">';		
			inputChild   += '<input type="button" name="cancel" value="cancel"  onclick="DisplayFormUtils.cancelAddChild()"></td></tr>';
				
			tableNodeChildDiv.append(inputChild);		
	
			DisplayFormUtils.buildTypeList(nodeUuid, 'Children');
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
			inputPar   += '<td>Select Type: <select id="select_parent_type_'+nodeUuid+'" onchange="DisplayFormUtils.buildTypeProperty( \'parent\', this.value,\''+ nodeUuid +'\');"   ></select> </td>';
	
			inputPar   += '<td id="td_' + nodeUuid + '"></td>';
			inputPar   += '<td><input type="button" name="add" id="addPar_'+nodeUuid+'"  class="btn btn-primary btn-xs"   value="Add" onclick="( new DisplayFormRenderer() ).addParentNode(\''+ nodeUuid + '\');">';		
			inputPar   += '<input type="button" name="cancel" value="cancel"  onclick="DisplayFormUtils.cancelAddPar()"></td></tr>';
				
			tableNodeChildDiv.append(inputPar);		
	
			DisplayFormUtils.buildTypeList(nodeUuid, 'Parent');
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
			inputSibl   += '<td>Select Type: <select id="select_sibling_type_'+nodeUuid+'"  onchange="DisplayFormUtils.buildTypeProperty( \'sibling\', this.value,\''+ nodeUuid +'\');" ></select> </td>';
	
			inputSibl   += '<td id="td_' + nodeUuid + '"></td>';
			inputSibl   += '<td><input type="button" id="addSib_'+nodeUuid+'" name="add"  class="btn btn-primary btn-xs"  value="Add" onclick="( new DisplayFormRenderer() ).addSibNode(\''+ nodeUuid + '\');">';		
			inputSibl   += '<input type="button" name="cancel" value="cancel"  onclick="DisplayFormUtils.cancelAddSib()"></td></tr>';
				
			tableNodeSibDiv.append(inputSibl);		
	
			DisplayFormUtils.buildTypeList(nodeUuid, 'Sibling');
		} else {
			console.log("FOUND SOMETING : " + $(".addSibNodeRow").length);
		}
		
	};	
	
//	RETRIEVE AND SAVE CHILD NODE CREATED
	this.addChildNode = function( nodeuuid){
		if(!nodeuuid){
			console.log("missing node uuid ");
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
//		var properties = this.retrievePropertiesFromCreate( typeId, 'form_create_val_');
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
			
			var nbSpan = document.getElementById("nb_"+typeId);
			var nb     = typeMapViaId[typeId].nb;
			nbSpan.innerHTML = nb;		
							
			var jsonData={};
			
			// create the edge between the node and the new Node
//			 prepare the jsonData for creating an edge			
			jsonData = NodeUtils.createEdgeJson(nodeMap[originNodeUuid].typeId  , originNodeUuid, dataNode.typeId , destUuid, connId);
			
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
				( new DisplayFormRenderer() ).addNodeToChildList(nodeuuid, destUuid, dataEdge.type);
				
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
			console.log("missing node uuid ");
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
			
			GlobalUtils.addNBTypeInstances(dataNode);
			var nbSpan = document.getElementById("nb_"+typeId);
			var nb     = typeMapViaId[typeId].nb;
			nbSpan.innerHTML = nb;	
									
			var jsonData={};
			
			// create the edge between the node and the new Node
//			 prepare the jsonData for creating an edge
			jsonData = NodeUtils.createEdgeJson(dataNode.typeId  , originUuid, nodeMap[destinationNodeUuid].typeId , destinationNodeUuid, connId);
					
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
				( new DisplayFormRenderer() ).addNodeToParList(nodeuuid, originUuid, dataEdge.type);
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
			GlobalUtils.addNBTypeInstances(dataNode);
			var nbSpan = document.getElementById("nb_"+typeId);
			var nb     = typeMapViaId[typeId].nb;
			nbSpan.innerHTML = nb;	

			var jsonData={};
			
			// create the edge between the node and the new Node
//			 prepare the jsonData for creating an edge
			jsonData = NodeUtils.createEdgeJson(nodeMap[originNodeUuid].typeId  , originNodeUuid, dataNode.typeId , destUuid, connId);
			
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
				( new DisplayFormRenderer() ).addNodeToSibList(nodeuuid, destUuid, dataEdge.type);
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
   
   // display the node child name in the list 
    this.addNodeToChildList = function ( node, nodetoadd, edgeType){  
    	if(!node || !nodetoadd || !edgeType){
    		console.log(" no Node uuid  given "+ node + " no nodetoadd uuid given "+ nodetoadd + " no name given for the edge "+ edgeType);
			console.log(" Can not add the node to the list");
			return;
    	}
    	var instName = NodeUtils.findNameInst ( nodeMap[nodetoadd]  );
    	var nodeTableChildDiv = $( "#nodeFormChildTable_" + node );
		nodeTableChildDiv.append('<tr class="child"><td><a href="#" onclick="( new DisplayFormRenderer() ).selectedType(\'' + nodeMap[nodetoadd].typeId + '\');( new DisplayFormRenderer() ).selectInstance(\'' +nodetoadd + '\')">'+  instName + '</a></td><td>' +edgeType + '</td></td></tr>');		     	
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
		nodeTableParDiv.append('<tr class="parent"><td><a href="#" onclick="( new DisplayFormRenderer() ).selectedType(\'' + nodeMap[nodetoadd].typeId + '\');( new DisplayFormRenderer() ).selectInstance(\'' +nodetoadd + '\')">' +  instName + '</a></td><td>' + edgeType + '</td></td></tr>');
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
   	    nodeTableSibDiv.append('<tr class="sibling"><td><a href="#" onclick="( new DisplayFormRenderer() ).selectedType(\'' + nodeMap[nodetoadd].typeId + '\');( new DisplayFormRenderer() ).selectInstance(\'' +nodetoadd + '\')">' +  instName + '</a></td><td>' + edgeType+ '</td></td></tr>');
		
    }
  
    
    this.displayViewEditProperties = function( tempType, key ){
    	
    	if(!key  ){
			console.log(" no Node uuid  given "+ key );
			return;
		}
    	var value = nodeMap[key];
    	
    	if(!value){
    		console.log(" no  details given for the Node  "+ key);
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
			
		// TODO! test if tempType is empty
		
		if($.isEmptyObject(tempType.typeProperties)){
			tableViewInstProps = 'NO properties were defined ';
			tableEditInstProps = '';
			
		}else {
		
				$.each( tempType.typeProperties, function( pkey, pvalue ) {
									
				    var inputpropEditRow ='';
				    var propValue;
					
					// build a Row for each property 
					// find the property value in nodeMap
					$.each( value.typeProperties, function( nodekey, nodevalue ) {	
						if( pkey == nodekey){
					    	propValue = nodevalue.value;
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
				var footerView  = "<tr><td colspan='2'> <input type='button' class='btn btn-primary btn-xs'  value='Go Update ' onclick='( new DisplayFormRenderer() ).showNodeUpdate(\"" + key + "\")' /></tr>" ;
				var footerEdit  = "<tr><td colspan='2'> <input type='button' class='btn btn-primary btn-xs'  value='Update' onclick='( new DisplayFormRenderer() ).saveUpdateInfo(\"" + key + "\")' /><input type='reset' value='Cancel' onclick='( new DisplayFormRenderer() ).cancelNodeUpdate(\"" + key + "\")' /></td></tr>";
					
				tableViewInstProps = tableViewInstProps + footerView + "</table>";
				tableEditInstProps = tableEditInstProps + footerEdit + "</table>";
		}
		instViewDiv.append(tableViewInstProps);		
		instEditDiv.append(tableEditInstProps);	
	
	}
		
    this.saveUpdateInfo = function ( nodeId ){
    	if(!nodeId ){
			console.log(" no Node uuid  given "+ nodeId );
			console.log(" Can not add the node to the list");
			return;
		}
    	
		// grab the info from the Node property fields 	
		var instEditDiv = $("#form_inst_edit_" + nodeId );	
					
		var jsonData = {}, nodeProperties = [], newProperties = [];
		var property = {}, newproperty = {}, foundError=false;			
        
		var sysProperties = [];
		
		// grab type Id 
		var type         = nodeMap[nodeId].typeId;	
		if(!type){
			console.log(" type is not defined for this node "+ nodeId);
			return;
		}

		jsonData["type"] = type.toString();
			
		property =  NodeUtils.createSysJson(nodeId );
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
			var isPropMand =  NodeUtils.findPropInType(property.propertyId, jsonData['type']);
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
//				  user may have deleted old value  
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
				nodeMap[nodeId].typeProperties   = data.nodes[0].typeProperties;
				
				var key = NodeUtils.findUUID (data.nodes[0]);
												
				// grab the name property of The Node and update it in the list
				var instName = NodeUtils.findNameInst (  data.nodes[0]  );		
				document.getElementById(key).innerHTML = instName;
				
				// update and display properties info 	
				( new DisplayFormRenderer() ).selectInstance(key);
	 				
			};
				
			var failFunction = function( xhr, status, error ) {
				console.log("Update Node Properties Error: "+ xhr.status);
				 $('#console-log').append("Update Node Properties Error: "+ xhr.status);
			};
			
			var api  = new NodeApis();
			
			api.updateNode(jsonData, doneFunction, failFunction );	

		}				
	};
	
	// THIS FOR CREATING A NODE INSTANCE --   Must GET List of   "MUST CONNECTIONS/LINKS"  First
	this.createNode = function( selectedTypeId ) {
		if(!selectedTypeId){
			console.log(" no type given: cannot create Instance  "); 
			return;
		}
		console.log("Attempting to create :" + selectedTypeId );	
		// note that the SELECTION of a type should indicate a FOCUS
		// ie. Reset the listTypeId's and listConnId's
		GlobalUtils.clearGlobalSelected();		
		// assign the current 
		GlobalUtils.setGlobalTypeSelected( selectedTypeId );
		
		// hide all the others		
		DisplayFormUtils.resetFormAddInst( selectedTypeId );
		$('.form_deco_right_body_sub_div').hide();
		$('#form_deco_right_body_sub_div_'+ selectedTypeId).empty();		
		$('.work_addInstance').remove();
		
		DisplayFormUtils.resetWorkDiv(selectedTypeId, $('#form_deco_right_body_sub_div_'+ selectedTypeId) );
	
		historyNode = []; 
		curThreshold = 0;
			
		var workDiv = $('#work_addInstance_'+selectedTypeId);
		var parRequired = this.verifyNodeRelations(selectedTypeId);
	
		DisplayFormUtils.addFormForMustCreateNode( workDiv, selectedTypeId, parRequired );					
					      
	};
	// Get List of "MUST CONNECTION/LINKS ---  this works only for Parents now -- Need to add Children and Siblings

	this.verifyNodeRelations = function( selectedTypeId ){
		              
      if(!selectedTypeId){
                   console.log(" no type given: cannot proceed for getting list of MUST Conn/Link "); 
                   return;
       }
           // looking for Parents  MUST Connections 
       var listOfConnPar = []; 
       var listOfConnChild = [];
       var listOfLinkSibling = [];
      $.each( connMapViaId , function( key, value ) {      
              if(value.classification = 'parentchild'){
                      if( (selectedTypeId === value.target ) &&( value.minRel > '0'))      {                       
                                   listOfConnPar.push(value);
                           }else if ( (selectedTypeId === value.source ) &&( value.minRel > '0')){
                                   listOfConnChild.push(value);
                           }
              }else if (value.classification = 'link'){
                                      if((selectedTypeId === value.target ) &&( value.minRel > '0')||(selectedTypeId === value.source ) &&( value.minRel > '0')){
                                              listOfLinkSibling.push(value);
                          }
              }else {
                      // error 
              }            
           });     
      return  listOfConnChild;               
 }


	
	this.saveNodeCreated = function ( selectedTypeId, properties ){
		
		if(!selectedTypeId){
			console.log(" no type given: cannot create Instance with Parent NODE  "); 
			return;
		}
			
		var data = new NodeJsonObject();

		// set the minimum
		data.init(selectedMetaData.toString(), selectedTypeId.toString(), properties);
		data.defaultDecorator = "1";

		var doneFunction = function( dataNode ) {
			if($.isEmptyObject(dataNode)){
				console.log(' No data returned for save Node ');
				return;
			}
												  				  	
		  	$('#console-log').append("<p style='color:blue'Node created successfully.</p>");
		  	
	 	   // update corresponding section and nb of type nodes 			
			NodeUtils.AddNodeToMap( dataNode);   

			GlobalUtils.addNBTypeInstances(dataNode);
			var nbSpan = document.getElementById("nb_"+selectedTypeId);
			var nb     = typeMapViaId[selectedTypeId].nb;
			nbSpan.innerHTML = nb;	
			
			listInstUuids[0] = NodeUtils.findUUID (dataNode);
			 if(!listInstUuids[0]){
				 console.log(" missing node uuid in save node ");
				 return;
			 }
			  				
		};
			
		var failFunction = function( xhr, status, error ) {
			console.log('Error Node not created: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Error Node not created:"+ xhr.status+"</p>");	
		};
		
		var api  = new NodeApis();
		api.saveNode( data,  doneFunction, failFunction );
				
	}

	
		
	this.selectedType = function( selectedTypeId ) {
		if(!selectedTypeId){
			console.log(" no type selected  "); 
			return;
		}
		
		DisplayFormUtils.clearAddRow();	                        // clearing all previous add Row for children/Parents/Sibling
		
		console.log("Attempting to show :" + selectedTypeId );		
		// note that the SELECTION of a type should indicate a FOCUS
		// ie. Reset the listTypeId's and listConnId's
		GlobalUtils.clearGlobalSelected();
		
		// assign the current 
		GlobalUtils.setGlobalTypeSelected( selectedTypeId );
		
		// hide all  others
		$('div.right_body').hide();		
		$('div.display_form_typebar_sub_class').hide();	
		$('div.form_inst_add').hide();
		$('table.form_inst_list').hide();
	
		// show the TYPE Bar  + Sub-Bar for Creation + List of Instances
		DisplayFormUtils.showDivision ("form_deco_left_body_sub_div_", selectedTypeId  );				
		DisplayFormUtils.showDivision ("display_form_typebar_sub_", selectedTypeId  );	
		DisplayFormUtils.showDivision ("form_inst_list_", selectedTypeId  );
		
//		make sure list is empty and reset nodeMap
		$( "#form_inst_list_" + selectedTypeId + " > tbody " ).empty();
		nodeMap = {};
		nodeMapViaId = {};
								
		// get all node instances under this type and display list	 as well as update the right section for the instance
		var successFunction = function( data ) {
	
			if((!$.isEmptyObject(data))  &&(  !$.isEmptyObject(data.nodes))){
				console.log(" Loaded these nodes : ")
				console.table(data.nodes);
				GlobalUtils.resetNBType(selectedTypeId); 
				$.each(data.nodes, function(key, value){
					// increase the number of Instance for this type
					GlobalUtils.addNBTypeInstances( value );
					// and node to nodeMap
					NodeUtils.AddNodeToMap(value);
					// find the node uuid 
					var uuid = NodeUtils.findUUID( value ); 
					// Add the node to the list 
					if(uuid != null) {( new DisplayFormRenderer() ).addNodeInstanceToList (uuid );	}					
					
				});	
				// display the total number of instances next to the Type name
				var nbSpan = document.getElementById("nb_"+selectedTypeId);
				var nb     = typeMapViaId[selectedTypeId].nb;
				nbSpan.innerHTML = nb;	
				
			}else {
				console.log("This Type: "+selectedTypeId+" has No nodes.")         // empty list is displayed
			}
		}
		
		var failFunction = function( xhr, status, error ) {
			console.log('Not able to load Nodes for this Type: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Not able to load Nodes for this Type:"+ xhr.status+"</p>");	
		};
		
		var nodeApi = new NodeApis();		
		
		nodeApi.getNodesUnderType(selectedTypeId, successFunction, failFunction);
			
	};
		
	this.displayConnectTo = function ( instId ){
		if(!instId){
			console.log(" no node Uuid provided: cannot display the connect to table  "); 
			return;
		}
		
		var tableInstConnDiv = $("#nodeFormConnecttoTable_" + instId );		
		tableInstConnDiv.empty();				
		var inputRow = '';
        inputRow   +=  "<tr><td>Connect as :<br/><input type='radio' value='asParent' name='typeConnPosition_"+instId+"' onchange=\"DisplayFormUtils.buildTypeListConnect(\'"+ instId+"\')\"/ >Parent<br/>";					
		inputRow   +=  "<input type='radio' value='asChild' name='typeConnPosition_"+instId+"' onchange=\"DisplayFormUtils.buildTypeListConnect(\'"+ instId+"\' )\">Child</td></tr>";
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
        inputRow   +=  "<tr><th><input type='checkbox' value='linkTo'  name='typeLinkPosition_"+instId+"' onchange='DisplayFormUtils.buildTypeListLink(\""+ instId+"\" )'/ >Link To </th></tr>";					
        tableInstlinktoDiv.append(inputRow);
		
	}
//==============================================================================================================	
//	UTILITIES 	
	this.selectInstance = function( instId ) {
		if(!instId){
			console.log(" no node Uuid provided: cannot display related info  "); 
			return;
		}
			
		// hide all other divisions
		$('div.form_deco_right_body_sub_div').hide();
		
		$('div.form_inst').hide();	
		$('div.form_inst_edit_').hide();	
		$('div.form_inst_children').hide();
		$('div.form_inst_parent').hide();
		$('div.form_inst_sibling').hide();
		$('div.form_inst_linkto').hide();
		$('div.form_inst_connectto').hide();
		
		// show right division
		$('div.right_body').show();
				
		DisplayFormUtils.showDivision ("form_deco_right_body_sub_div_", listTypeIds[0]  );	
		
		$( "#form_deco_right_body_sub_div_" + listTypeIds[0] ).empty();
		
		( new DisplayFormRenderer() ).createAllRightDivsForNode ( instId );
		( new DisplayFormRenderer() ).setDefaultsForDivs( instId, nodeMap[instId] );	
		
		var tempType = typeMapViaId[listTypeIds[0] ];
		( new DisplayFormRenderer() ).displayViewEditProperties(tempType, instId );
		
		// get all related nodes and edges to the selected node 
		var successFunction = function( data ) {
			
			if($.isEmptyObject(data)||    $.isEmptyObject(data.edges)){      // at least the node itself is returned if it has no Parent/Children/Sibling
				console.warn (" no nodes details returned from the API get all related Nodes and edges");
			}else {		
				console.log("data.edges are: ");
				console.table(data.edges);                            // data.edges may be empty if no Parent/Children/Sibling								
				NodeUtils.buildNodeDetails ( instId, data);
			}				
						
		};
		
		var failFunction = function( xhr, status, error ) {
			console.log('Not able to load related  Node Details: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Not able to load related Node Details: "+ xhr.status+"</p>");	
		};
		
		var nodeApi = new NodeApis();	 
		//   must typeId in the path         
		
		nodeApi.getRelatedNodesEdges(listTypeIds[0] , instId, successFunction, failFunction);
		
		
		( new DisplayFormRenderer() ).buildParentChildrenSiblingDivsForANode( instId );	 
		( new DisplayFormRenderer() ).displayConnectTo( instId);
		( new DisplayFormRenderer() ).displayLinkTo( instId);
							
		DisplayFormUtils.showDivision ("form_inst_", instId  );			
		DisplayFormUtils.showDivision ("form_inst_children_", instId  );		
		DisplayFormUtils.showDivision ("form_inst_parent_", instId  );	
		DisplayFormUtils.showDivision ("form_inst_sibling_", instId  );	
		DisplayFormUtils.showDivision ("form_inst_linkto_", instId  );	
		DisplayFormUtils.showDivision ("form_inst_connectto_", instId  );

		 GlobalUtils.setGlobalInstSelected (instId);
			
	};	
	
	this.buildParentChildrenSiblingDivsForANode = function ( nodeUuid ){
		
		if(!nodeUuid){
			console.log(" no node Uuid provided: cannot build the parents/Children/Sibling list  "); 
			return;
		}
		if($.isEmptyObject(nodeMap[nodeUuid])){
			console.log(" Node does not exist in NodeMap -- can not build its Parents/Children/Sibling")
			return;
		}
		var parents = nodeMap[nodeUuid].parents;
		if(!$.isEmptyObject(parents) ){
			$.each( parents, function( key, value ) {		
				  var nodeTableParDiv = $( "#nodeFormParTable_" + nodeUuid );
	    		  nodeTableParDiv.append('<tr class="parent"><td><a href="#" onclick="( new DisplayFormRenderer() ).selectedType(\'' + value.typeId + '\');( new DisplayFormRenderer() ).selectInstance(\'' +key + '\')">' +  value.name + '</a></td><td>' + value.ruleName + '</td></td></tr>');		
			});
		}
		var children = nodeMap[nodeUuid].children;
		if(!$.isEmptyObject(children) ){
			$.each( children, function( key, value ) {	
				  var nodeTableChildDiv = $( "#nodeFormChildTable_" + nodeUuid );
				  nodeTableChildDiv.append('<tr class="child"><td><a href="#" onclick="( new DisplayFormRenderer() ).selectedType(\'' + value.typeId + '\');( new DisplayFormRenderer() ).selectInstance(\'' +key + '\')">'+  value.name + '</a></td><td>' + value.ruleName + '</td></td></tr>');  
			});		
		}
		var sibling = nodeMap[nodeUuid].sibling;
		if(!$.isEmptyObject(sibling) ){
			$.each( sibling, function( key, value ) {
				  var nodeTableSibDiv = $( "#nodeFormSibTable_" + nodeUuid );
	        	  nodeTableSibDiv.append('<tr class="sibling"><td><a href="#" onclick="( new DisplayFormRenderer() ).selectedType(\'' + value.typeId + '\');( new DisplayFormRenderer() ).selectInstance(\'' +key + '\')">' +  value.name + '</a></td><td>' + value.ruleName + '</td></td></tr>');
		    });	
		}	
		
	}

	this.hideNodeInfo = function ( key ){	
		 DisplayFormUtils.hideDivision ("form_inst_", key  );	
	};
		
    this.showNodeUpdate = function ( key ){  
	    DisplayFormUtils.hideDivision ("form_inst_", key  );	
	    DisplayFormUtils.showDivision ("form_inst_edit_", key  );	
	
	};
	
	this.cancelNodeUpdate = function ( key ){	
		// hide Edit Form		
		DisplayFormUtils.hideDivision ("form_inst_edit_", key  );	

		// show View Form
		DisplayFormUtils.showDivision ("form_inst_", key  );	
	};
	

}	


//this.createNodeParent_submit = function ( selectedTypeId ){
//	
//	if(!selectedTypeId){
//		console.log(" no type given: cannot create Instance with Parent NODE  "); 
//		return;
//	}
//	console.log("Attempting to add a new Node for this type :" + selectedTypeId );		
//	// retrieve the Info
//	var properties = this.retrievePropertiesFromCreate( selectedTypeId , 'form_inst_add_val_');		
//	if(properties[properties.length-1]){
//		console.log(" do not continue");
//		return;
//	}
//	properties.pop();
//	
//	this.saveNodeCreated (selectedTypeId, properties );
//	var key  = listInstUuids[0];
//	if(!key){
//		console.log(" no node save !!!!");
//		return;
//	}
//	DisplayFormUtils.createNodeWithParent( key, selectedTypeId, listTypeIds[0]);	
//	
//}


//PROCESS FOR A NODE ORPHAN CREATED --   RETRIEVE Node Properties -- SAVE NODE ---- CLEAR FORM --- CREATE RIGHT DIVISION For NODE  
//this.createNode_submit = function( selectedTypeId ) {
//	
//	if(!selectedTypeId){
//		console.log(" no type given: cannot create Instance   "); 
//		return;
//	}
//	var properties=[];
//	var key = null;
//	
//	console.log("Attempting to add a new Node for this type :" + selectedTypeId );		
//	// retrieve the Info
//	properties = this.retrievePropertiesFromCreate( selectedTypeId , 'form_inst_add_val_');		
//	if(properties[properties.length-1]){
//		console.log(" do not continue");
//		return;
//	}
//	properties.pop();
//	
//	// save Node 
//    this.saveNodeCreated (selectedTypeId, properties );
//    
//    var key  = listInstUuids[0];
//    
//	this.createNode_cancel(selectedTypeId );
//	
//	if(!key){
//		console.log(" No node to add to the list !!!!");
//		return;
//	}
//	
//	this.addNodeInstanceToList( key );	    
//};		



//this.createNode_cancel = function( selectedTypeId ) {
//	
//	if(!selectedTypeId){
//		console.log(" no type given: cannot cancel create Instance  "); 
//		return;
//	}
//		
//	console.log("Attempting to Cancel :" + selectedTypeId );		
//	// note that the SELECTION of a type should indicate a FOCUS
//	// ie. Reset the listTypeId's and listConnId's
//	GlobalUtils.clearGlobalSelected();	
//	
//	// assign the current 
//	GlobalUtils.setGlobalTypeSelected( selectedTypeId );
//	
//	$('#form_inst_add_' + selectedTypeId ).hide();
//			      
//};


//this.createNodewithParent_submit = function( selectedTypeId ){
//	
//	if(!selectedTypeId){
//		console.log(" no type given: cannot create Instance with Parent NODE  "); 
//		return;
//	}
//			
//	console.log("Attempting to add a new Node for this type :" + selectedTypeId );	
//	
//	// retrieve the Info from the form_inst_create
//	var properties = this.retrievePropertiesFromCreate( selectedTypeId, 'form_inst_add_val_');		
//	if(properties[properties.length-1]){      // if error(missing mandatory properties values  stop process -- error highlighted in form
//		console.log(" do not continue");
//		return;
//	}
//	properties.pop();
//	
//	// save node instance created 	
//	this.saveNodeCreated (selectedTypeId, properties );
//	var key  = listInstUuids[0];
//	if(!key ){
//		console.log(" no nodeUuid found for the saved node in createNode with Parent selected "); 
//		return;
//	}
//	// retrieve Info from Form for creating the edge
//	var jsonData = {};
//	var originNodeUuid     =  document.getElementById('nodeInstParent_selected').value;	
//	var originType         =  document.getElementById('nodeInstParentType_selected').value;		
//	var connId             =  document.getElementById("connSelected_").value;
//	console.log(' value of connection selected :'+ connId);
//	if(!originNodeUuid || !originType    || !connId ){
//		console.log(" no nodeUuid/nodeType/connection Id given: cannot create Instance with Parent NODE  "); 
//		return;
//	}
//	
//	// build the json
//	jsonData["originNodeUuid"]      = originNodeUuid;
//	jsonData["originType"]          = typeMap[originType].id;		
//	jsonData["ruleName"]            = connMapViaId[connId].rule;	
//	jsonData["destinationNodeUuid"] = key;
//	var destinationType             = nodeMap[key].type
//	jsonData["destinationType"]     = typeMap[destinationType].id;
//	
//	// Call API for saving the edge
//	var apiEdge  = new EdgeApis();
//	
//	var doneFunction = function ( dataEdge ){
//		if($.isEmptyObject(dataEdge)){
//			console.log(' No data returned for save Edge in create Node with Parent');
//			return;
//		}
//		console.log("Edge created ");
//		// add edge to edgeMap
//		NodeUtils.AddEdgeToMap( dataEdge);	
//		
//		( new DisplayFormRenderer() ).createNode_cancel(selectedTypeId );			
//		( new DisplayFormRenderer() ).addNodeInstanceToList(key);
//				
//		( new DisplayFormRenderer() ).selectInstance( key );
//	};
//	
//	var failFunction = function (  xhr, status, error ){
//		console.log('Error Edge not created: ' + xhr.status);
//		$('#console-log').append("<p style='color:red'>Error Edge not created:"+ xhr.status+"</p>");	
//	};
//	
//	apiEdge.saveEdge( jsonData,  doneFunction, failFunction );
//		
//}
//	
//
		

	
	
	
	



	


