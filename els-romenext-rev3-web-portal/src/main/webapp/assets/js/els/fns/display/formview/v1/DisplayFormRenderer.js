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
		
		// load all CRUD operations for this decorator	
		selecteddecorator = "Form";		
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
		var typeBar = GlobalHTMLUtils.createHTMLEntity('header', 'display_form_typebar', 'panel-heading', 'visible', 'block', 'Type Bar');
		
//		var typeBar = document.createElement('header');
//		typeBar.id = 'display_form_typebar';		
//		typeBar.className = 'panel-heading';
		typeBar.style = "vertical-align:top;";
//		typeBar.innerHTML = '';

		DisplayFormDecoView.appendChild(typeBar);
			
		// generate for Button creating New Instance for A specific TYPE			
		var typebarSub = document.createElement('header');
		typebarSub.id = 'display_form_typebar_sub';
		typebarSub.className = 'typebar-sub-panel-heading';
		typebarSub.style = "vertical-align:top;";
		typebarSub.innerHTML = '';
	
		DisplayFormDecoView.append( typebarSub );
		
		// generate body Division made of two divisions
		var bodyDiv = document.createElement('div');
		bodyDiv.id = 'form_deco_body';
		bodyDiv.className = 'cy';       //  form_deco_class
		bodyDiv.style.display = 'flex';	
	
		bodyDiv.innerHTML  = '';
					
		DisplayFormDecoView.appendChild(bodyDiv);	
		
		// generate the Left menu Instance 
		var leftBodyDiv = document.createElement('div');
		leftBodyDiv.id = 'form_deco_left_body';
		leftBodyDiv.className = 'left_body';       
		leftBodyDiv.style.display = 'inline-block';	
		leftBodyDiv.innerHTML  = '';
					
		bodyDiv.appendChild(leftBodyDiv);
		
		//generate the Right Division for all actions
		//  VIEW -- EDIT -- Instance 
		//  CREATE CHILDREN -- PARENT -- SIBLING  
		//  LINK/CONNECT  to EXISTING INSTANCES
		var rightBodyDiv = document.createElement('div');
		rightBodyDiv.id = 'form_deco_right_body';
		rightBodyDiv.className = 'right_body';       
		rightBodyDiv.style.display = 'inline-block';	
		rightBodyDiv.innerHTML  = '';
					
		bodyDiv.appendChild(rightBodyDiv);

	};
	
	this.enableFormView = function() {		
		
		var DisplayFormDecoView = document.getElementById(activeDecos_BODY[ this.divHolderId ]);
		
		DisplayFormDecoView.style.display = "block";		
	};
			
	this.checkInitialValues = function() {
		
		if ( !selectedMetaData ) {
			console.log(" No value for metadata ")
			return false;	
	    } else {
//		Build typeMap/typeMapViaId - connMap/connMapViaId  -- ruleMap/ruleMapViaId
	    typeMap ={}; typeMapViaId = {}; ruleMap = {}; ruleMapVia = {}; connMap = {}; connMapViaId = {}; nodeMap = {}; nodeMapViaId = {};
		GlobalUtils.loadAllTypeAndConnections();
		GlobalUtils.loadAllRules();		
		NodeUtils.loadAllNodesAndEdges(); 
		GlobalUtils.initTypeNB(nodeMap);
		return true;		
	    }

	};

	this.initializeTypeBar = function() {
		
		var displayTypeBar_v2 = document.getElementById('display_form_typebar');
		displayTypeBar_v2.innerHTML = "";

		// create the sub typebar for this type
		var typeBarSubDiv = $( "#display_form_typebar_sub" );
		
		// find total number
		var totals = Object.keys( typeMapViaId ).length;
		
		inputs = "<table id='typesList'><tr>";
		inputs += "<td><span class='badge'>*("+ totals +")</span></td>";
		
		$.each( typeMapViaId, function(key, value){
			
			if( totals != 0 ){
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
			} else {
				return;
			}
			
		});
		
		if( totals == 0 ) {
			inputs += " No Type is created yet";
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
		
//		Build the LEFT && RIGHT Division for Each Type 	
		$.each( typeMapViaId, function( typeId, tmpType ) {			
			// grab the left division and add for each Type a division
			// Inside that add the ADD INSTANCE FORM  ++++  List of instances for that Type
			var instHolderDivNameLeft = "form_deco_left_body_sub_div_" + typeId;	
			
			DisplayFormUtils.addFormDivsLeft (bodyleft, instHolderDivNameLeft, typeId   );
			
			var instHolderDivNameRight = "form_deco_right_body_sub_div_" + typeId;	
			
			DisplayFormUtils.addFormDivsRight( bodyright, instHolderDivNameRight , typeId );
						
		});
		
				
//		Populate the List of Instances for each Type 		
		$.each( nodeMap, function( key, value ) {	
			( new DisplayFormRenderer() ).addNodeInstanceToList (key , value );
			( new DisplayFormRenderer() ).createAllRightDivsForNode ( key, value );
			( new DisplayFormRenderer() ).setDefaultsForDivs( key, value );			
			( new DisplayFormRenderer() ).displayParentChildrenNode( key, value);		
		});			
	};
	
//	ADD NODE TO LIST of NODES FOR A TYPE
	this.addNodeInstanceToList = function( key, value){
		var tempType = typeMap[ value.type ];	                                         
		var instHolderDiv = $( "#form_inst_list_" + tempType.id );
		
		// grab the name property of The Node if it exists  or its TYPE
		var instName = NodeUtils.findNameInst ( value  );		
		
		// display the Node link in the subdivision
		instHolderDiv.append( "<tr> <td><a href='#' id ='"+key +"' onclick='( new DisplayFormRenderer() ).selectInstance(\"" + key + "\")'>" + instName + "</a></td></tr>" );
		
	}

	//	ADD ALL RIGHT DIVS For a NODE ( Newly Created or Loaded)
	this.createAllRightDivsForNode = function ( key, value ){
		
		var tempType = typeMap[ value.type ];	  
		
		var instHolderDiv = document.getElementById("form_deco_right_body_sub_div_" +tempType.id);		
		
		DisplayFormUtils.addAllRightFormDivs (instHolderDiv, key );	
	}
	
//    Fill DEFAULT Content For RIGHT DIVISION of A NODE	
	this.setDefaultsForDivs = function( key ){
		DisplayFormUtils.setDefault_ChildrenDiv(key);			
		DisplayFormUtils.setDefault_ParentDiv(key);	
		DisplayFormUtils.setDefault_SiblingDiv(key);
		DisplayFormUtils.setDefault_LinktoDiv(key);
		DisplayFormUtils.setDefault_ConnectToDiv(key);
	}
	
//	BUILT the Content of Node Instance Create Based on TYPE Properties
	this.addTypeInstanceDivContent = function (){	
		
		$.each( typeMapViaId, function( typeId, tmpType ) {	
			
			var instAddDiv = $("#form_inst_add_" + typeId );
			
			DisplayFormUtils.addFormInstCreate( instAddDiv, typeId, tmpType);		
			
		});	
	}
		
	
	this.displayNodeInfo  = function (  key,  value ){
		
		// grab the type of the node
		var tempType = typeMap[ value.type ];

		// display properties VIEW and EDIT Tables for the node 
		this.displayViewEditProperties( tempType,  key, value);
       			
	}

//	BUILT ADD CHILD NODE FORM  Based on SELECTED CHILD TYPE
	this.addChildNodeForm = function( nodeUuid ) {
		var inputChild ='';
        // clear Previous ADDROW
		DisplayFormUtils.clearAddRow();				
		 
		var tableNodeChildDiv = $( "#nodeFormChildTable_" + nodeUuid );
		inputChild   += '<tr class="addChildNodeRow"><td colspan=3>&nbsp;</td></tr>';
		inputChild   += '<tr class="addChildNodeRow">';
		inputChild   += '<td>Select Type: <select id="select_child_type_'+nodeUuid+'"  onchange="DisplayFormUtils.buildTypeProperty(this.value,\''+ nodeUuid +'\');" ></select> </td>';

		inputChild   += '<td id="td_' + nodeUuid + '"></td>';
		inputChild   += '<td><input type="button" name="add" id="addChil_'+nodeUuid+'"   class="btn btn-primary btn-xs" value="Add" onclick="( new DisplayFormRenderer() ).addChildNode(\''+ nodeUuid + '\');">';		
		inputChild   += '<input type="button" name="cancel" value="cancel"  onclick="DisplayFormUtils.cancelAddChild()"></td></tr>';
			
		tableNodeChildDiv.append(inputChild);		

		DisplayFormUtils.buildTypeList(nodeUuid, 'Children');
		
	};	

//	BUILT ADD PARENT NODE FORM  Based on SELECTED CHILD TYPE
	this.addParNodeForm = function( nodeUuid ) {
		var inputPar ='';
		 // clear Previous ADDROW
		DisplayFormUtils.clearAddRow();		

		var tableNodeChildDiv = $( "#nodeFormParTable_" + nodeUuid );
		inputPar   += '<tr class="addParNodeRow"><td colspan=3>&nbsp;</td></tr>';
		inputPar   += '<tr class="addParNodeRow">';
		inputPar   += '<td>Select Type: <select id="select_parent_type_'+nodeUuid+'" onchange="DisplayFormUtils.buildTypeProperty(this.value,\''+ nodeUuid +'\');"   ></select> </td>';

		inputPar   += '<td id="td_' + nodeUuid + '"></td>';
		inputPar   += '<td><input type="button" name="add" id="addPar_'+nodeUuid+'"  class="btn btn-primary btn-xs"   value="Add" onclick="( new DisplayFormRenderer() ).addParentNode(\''+ nodeUuid + '\');">';		
		inputPar   += '<input type="button" name="cancel" value="cancel"  onclick="DisplayFormUtils.cancelAddPar()"></td></tr>';
			
		tableNodeChildDiv.append(inputPar);		

		DisplayFormUtils.buildTypeList(nodeUuid, 'Parent');
		
	};

//	BUILT ADD SIBLING NODE FORM  Based on SELECTED CHILD TYPE
	this.addSibNodeForm = function( nodeUuid ) {
		var inputSibl ='';
        // clear Previous ADDROW
		DisplayFormUtils.clearAddRow();				
		 
		var tableNodeSibDiv = $( "#nodeFormSibTable_" + nodeUuid );
		inputSibl   += '<tr class="addSibNodeRow"><td colspan=3>&nbsp;</td></tr>';
		inputSibl   += '<tr class="addSibNodeRow">';
		inputSibl   += '<td>Select Type: <select id="select_sibling_type_'+nodeUuid+'"  onchange="DisplayFormUtils.buildTypeProperty(this.value,\''+ nodeUuid +'\');" ></select> </td>';

		inputSibl   += '<td id="td_' + nodeUuid + '"></td>';
		inputSibl   += '<td><input type="button" id="addSib_'+nodeUuid+'" name="add"  class="btn btn-primary btn-xs"  value="Add" onclick="( new DisplayFormRenderer() ).addSibNode(\''+ nodeUuid + '\');">';		
		inputSibl   += '<input type="button" name="cancel" value="cancel"  onclick="DisplayFormUtils.cancelAddSib()"></td></tr>';
			
		tableNodeSibDiv.append(inputSibl);		

		DisplayFormUtils.buildTypeList(nodeUuid, 'Sibling');
		
	};	
	
//	RETRIEVE AND SAVE CHILD NODE CREATED
	this.addChildNode = function( nodeuuid){
		
		// grab the properties defined for this Node 
		// create the Node Instance	
		var originNodeUuid = nodeuuid;		
		console.log("Attempting to add a new Node to the Node  :"+ nodeuuid  );
		
		// get the Type selected First 
		var Id = document.getElementById("select_child_type_"+nodeuuid).value;
		
		var typeId = Id.split("|")[0];
		var connId = document.getElementById("form_create_val_connId").value;
		if(!typeId && !connId) {
			console.log(" NO TYPE SElected  and No Connection");
			return;
		}
		// retrieve the Info	
//		var properties = this.retrievePropertiesFromCreate( typeId, 'form_create_val_');
		var properties = NodeUtils.retrieveNodePropertiesFromForm ( typeId , 'form_create_val_');
		
		if(properties[properties.length-1]){                            // if error(missing mandantory properties values  stop process -- error highlighted in form
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
												  				  	
		  	$('#console-log').append("<p style='color:blue'Node created successfully.</p>");	  	
		  	var div = $(".addChildNodeRow");			
			div.hide();
	 	   // update corresponding section and nb of type nodes 		
			NodeUtils.AddNodeToMap( dataNode);   
			GlobalUtils.addNBTypeInstances(dataNode);
			var nbSpan = document.getElementById("nb_"+typeId);
			var nb     = typeMapViaId[typeId].nb;
			nbSpan.innerHTML = nb;			
			var key = NodeUtils.findUUID (dataNode);
			
			
			( new DisplayFormRenderer() ).createAllRightDivsForNode ( key, dataNode );
			( new DisplayFormRenderer() ).setDefaultsForDivs( key, dataNode );
			( new DisplayFormRenderer() ).addNodeInstanceToList(key, dataNode );
			

			var jsonData={};
			
			// create the edge between the node and the new Node
//			 prepare the jsonData for creating an edge
			jsonData["originNodeUuid"] = originNodeUuid;
			var originType             = nodeMap[originNodeUuid].type
			jsonData["originType"]     = typeMap[originType].id;
			
			var destUuid;
			var Props = dataNode.properties;
			Props.forEach(function(prop) {
				if(prop.name=="uuid"){
					destUuid = prop.value;
				}
			});	
			jsonData["destinationNodeUuid"] = destUuid;
			jsonData["destinationType"] = typeMap[dataNode.type].id;					
			jsonData["ruleName"] = connMapViaId[connId].rule;
			
			var apiEdge  = new EdgeApis();
			
			var doneFunction = function ( dataEdge ){
				console.log("Edge created ");
				// add edge to edgeMap
				NodeUtils.AddEdgeToMap( dataEdge);	
				
				( new DisplayFormRenderer() ).displayNodeInfo( key , dataNode );
				( new DisplayFormRenderer() ).addNodeToChildList(nodeuuid, key, dataEdge.type);
				
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
		if(properties[properties.length-1]){      // if error(missing mandantory properties values  stop process -- error highlighted in form
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
												  				  	
		  	$('#console-log').append("<p style='color:blue'Node created successfully.</p>");	  	
		  	var div = $(".addParNodeRow");			
			div.hide();
	 	   // update corresponding section and nb of type nodes 		
			NodeUtils.AddNodeToMap( dataNode);   
			GlobalUtils.addNBTypeInstances(dataNode);
			var nbSpan = document.getElementById("nb_"+typeId);
			var nb     = typeMapViaId[typeId].nb;
			nbSpan.innerHTML = nb;			
			var key = NodeUtils.findUUID (dataNode);
		
			
			( new DisplayFormRenderer() ).createAllRightDivsForNode ( key, dataNode );
			( new DisplayFormRenderer() ).setDefaultsForDivs( key, dataNode );
			( new DisplayFormRenderer() ).addNodeInstanceToList(key, dataNode );
			
			
			var jsonData={};
			
			// create the edge between the node and the new Node
//			 prepare the jsonData for creating an edge
			jsonData["destinationNodeUuid"] = destinationNodeUuid;
			var destinationType             = nodeMap[destinationNodeUuid].type
			jsonData["destinationType"]     = typeMap[destinationType].id;
			
			var originUuid;
			var Props = dataNode.properties;
			Props.forEach(function(prop) {
				if(prop.name=="uuid"){
					originUuid = prop.value;
				}
			});	
			jsonData["originNodeUuid"] = originUuid;
			jsonData["originType"] = typeMap[dataNode.type].id;					
			jsonData["ruleName"] = connMapViaId[connId].rule;
			
			
			var apiEdge  = new EdgeApis();
			
			var doneFunction = function ( dataEdge ){
				console.log("Edge created ");
				// add edge to edgeMap
				NodeUtils.AddEdgeToMap( dataEdge);	
				
				( new DisplayFormRenderer() ).displayNodeInfo( key , dataNode );				  // add the View and Edit section 	
				( new DisplayFormRenderer() ).addNodeToChildList(nodeuuid, key, dataEdge.type);
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
		// retrieve the Info	
//		var typeProperties = typeMapViaId[typeId].properties;
		
//		var properties = this.retrievePropertiesFromCreate( typeId, 'form_create_val_');
		
		var properties = NodeUtils.retrieveNodePropertiesFromForm ( typeId , 'form_create_val_');
		if(properties[properties.length-1]){      // if error(missing mandantory properties values  stop process -- error highlighted in form
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
												  				  	
		  	$('#console-log').append("<p style='color:blue'Node created successfully.</p>");	  	
		  	var div = $(".addSibNodeRow");			
			div.hide();
	 	   // update corresponding section and nb of type nodes 		
			NodeUtils.AddNodeToMap( dataNode);   
			GlobalUtils.addNBTypeInstances(dataNode);
			var nbSpan = document.getElementById("nb_"+typeId);
			var nb     = typeMapViaId[typeId].nb;
			nbSpan.innerHTML = nb;			
			var key = NodeUtils.findUUID (dataNode);
			
			( new DisplayFormRenderer() ).createAllRightDivsForNode ( key, dataNode );
			( new DisplayFormRenderer() ).setDefaultsForDivs( key, dataNode );
			( new DisplayFormRenderer() ).addNodeInstanceToList(key, dataNode );
			
					
			var jsonData={};
			
			// create the edge between the node and the new Node
//			 prepare the jsonData for creating an edge
			jsonData["originNodeUuid"] = originNodeUuid;
			var originType             = nodeMap[originNodeUuid].type
			jsonData["originType"]     = typeMap[originType].id;
			
			var destUuid;
			var Props = dataNode.properties;
			Props.forEach(function(prop) {
				if(prop.name=="uuid"){
					destUuid = prop.value;
				}
			});	
			jsonData["destinationNodeUuid"] = destUuid;
			jsonData["destinationType"] = typeMap[dataNode.type].id;					
			jsonData["ruleName"] = connMapViaId[connId].rule;
			
			var apiEdge  = new EdgeApis();
			
			var doneFunction = function ( dataEdge ){
				console.log("Edge created ");
				// add edge to edgeMap
				NodeUtils.AddEdgeToMap( dataEdge);
				
				( new DisplayFormRenderer() ).displayNodeInfo( key , dataNode );				  // add the View and Edit section 
				( new DisplayFormRenderer() ).addNodeToSibList(nodeuuid, key, dataEdge.type);
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
   
//    BUILD The LIST OF CHILDREN -- PARENT -- SIBLING For a NODE SELECTED
    this.displayParentChildrenNode = function (key, value ){
    	 		
    	 $.each(edgeMap, function(edgename, edgevalue){
    		 // see if it a source 
    		 if( key === edgevalue.originUuid) {
    			  var targetUuid = edgevalue.destinationUuid;
				  var instName = NodeUtils.findNameInst ( nodeMap[targetUuid]  );
    			 
    			  if(edgevalue.classification === 'parentchild'){				  
    				  // create in the table of Nodechildren a row for the target node
    				  var nodeTableChildDiv = $( "#nodeFormChildTable_" + key );
    				  nodeTableChildDiv.append('<tr class="child"><td><a href="#" onclick="( new DisplayFormRenderer() ).selectedType(\'' + typeMap[nodeMap[targetUuid].type].id + '\');( new DisplayFormRenderer() ).selectInstance(\'' +targetUuid + '\')">'+  instName + '</a></td><td>' + edgevalue.type + '</td></td></tr>');
    				  
    			  }else if( edgevalue.classification == 'link'){
    				  var nodeTableSibDiv = $( "#nodeFormSibTable_" + key );
    	        	  nodeTableSibDiv.append('<tr class="sibling"><td><a href="#" onclick="( new DisplayFormRenderer() ).selectedType(\'' + typeMap[nodeMap[targetUuid].type].id + '\');( new DisplayFormRenderer() ).selectInstance(\'' +targetUuid + '\')">' +  instName + '</a></td><td>' + edgevalue.type + '</td></td></tr>');
    	     		
    			  }
    		 }else if(key  === edgevalue.destinationUuid ){
    			 var originUuid = edgevalue.originUuid;
         		 // find name of Node instance
         		 var instName = NodeUtils.findNameInst ( nodeMap[originUuid]  );
    			 
         		 if(edgevalue.classification === 'parentchild'){	 
         			 var nodeTableParDiv = $( "#nodeFormParTable_" + key );
         			 nodeTableParDiv.append('<tr class="parent"><td><a href="#" onclick="( new DisplayFormRenderer() ).selectedType(\'' + typeMap[ nodeMap[originUuid].type].id + '\');( new DisplayFormRenderer() ).selectInstance(\'' +originUuid + '\')">' +  instName + '</a></td><td>' + edgevalue.type + '</td></td></tr>');
         		 }else if( edgevalue.classification == 'link'){
   				  var nodeTableSibDiv = $( "#nodeFormSibTable_" + key );
   	        	  nodeTableSibDiv.append('<tr class="sibling"><td><a href="#" onclick="( new DisplayFormRenderer() ).selectedType(\'' + typeMap[ nodeMap[originUuid].type].id + '\');( new DisplayFormRenderer() ).selectInstance(\'' +targetUuid + '\')">' +  instName + '</a></td><td>' + edgevalue.type + '</td></td></tr>');    		
   			    }	 
         		 
    		 }else {
    			 /// ??????
    		 }
    	 }); 	
	}
   
    this.addNodeToChildList = function ( node, nodetoadd, edgeType){   	
    	var instName = NodeUtils.findNameInst ( nodeMap[nodetoadd]  );
    	var nodeTableChildDiv = $( "#nodeFormChildTable_" + node );
		nodeTableChildDiv.append('<tr class="child"><td><a href="#" onclick="( new DisplayFormRenderer() ).selectedType(\'' + typeMap[nodeMap[nodetoadd].type].id + '\');( new DisplayFormRenderer() ).selectInstance(\'' +nodetoadd + '\')">'+  instName + '</a></td><td>' +edgeType + '</td></td></tr>');		     	
    }
		    
    this.addNodeToParList = function ( node, nodetoadd, edgeType){   	
   	 	var instName = NodeUtils.findNameInst ( nodeMap[nodetoadd]  );
   	    var nodeTableParDiv = $( "#nodeFormParTable_" + node );
		nodeTableParDiv.append('<tr class="parent"><td><a href="#" onclick="( new DisplayFormRenderer() ).selectedType(\'' + typeMap[ nodeMap[nodetoadd].type].id + '\');( new DisplayFormRenderer() ).selectInstance(\'' +nodetoadd + '\')">' +  instName + '</a></td><td>' + edgeType + '</td></td></tr>');
    }
       
    this.addNodeToSibList = function ( node, nodetoadd, edgeType){   	
   	    var instName = NodeUtils.findNameInst ( nodeMap[nodetoadd]  );
	    var nodeTableSibDiv = $( "#nodeFormSibTable_" + node );
   	    nodeTableSibDiv.append('<tr class="sibling"><td><a href="#" onclick="( new DisplayFormRenderer() ).selectedType(\'' + typeMap[nodeMap[nodetoadd].type].id + '\');( new DisplayFormRenderer() ).selectInstance(\'' +nodetoadd + '\')">' +  instName + '</a></td><td>' + edgeType+ '</td></td></tr>');
		
    }
       	
    this.displayViewEditProperties = function( tempType, key, value ){
		
		var instViewDiv       = $( "#form_inst_" + key );
		instViewDiv.html('');
		var instEditDiv       = $("#form_inst_edit_" + key );
		instEditDiv.html('');
		
		var tableViewInstProps = '<br /><table border="2">';
		var tableEditInstProps = '<br /><table border="2">';
		
		var inputpropViewRow = '';
		inputpropViewRow = '<tr>';
			   
		$.each( tempType.typeProperties, function( pkey, pvalue ) {
					
			
		    var inputpropEditRow ='';
		    var propValue;
			
			// build a Row for each property 
			// find the property value in nodeMap
//			value.properties.forEach(function(nodeProperty){
//				if(pvalue.name == nodeProperty.name ){
//			    	propValue = nodeProperty.value;
//			    }
//			});
			  $.each(value.typeProperties, function ( nodeKey, nodeProperty){	
					if( pvalue.id == nodeProperty.id ){
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
			inputpropEditRow +=  '<input type="text" name="propertyName" value="' + pvalue.name + '"  disabled /><input type="hidden" name="propertyId" value="' + pvalue.id + '"> '  ;
									
			if( (propValue != null )&& (propValue != 'undefined' ) ){				
				inputpropViewRow += '<td  width="100px" >'+ propValue +'</td>';
				
				inputpropEditRow +=  '<input type="hidden" name ="value"     value="'+ propValue +'"  />'  ;
				inputpropEditRow +=  '</td><td><input type="text"   name ="newValue"  value="'+ propValue +'"  />';
	
			} else {
				inputpropViewRow += '<td  width="100px"> NONE </td>';
				
				inputpropEditRow +=  '<input type="hidden" name ="value"     value=""  />'  ;
				inputpropEditRow +=  '</td><td><input type="text" style="background-color:yellow"    name ="newValue"  value=""  />';	
			}	
						
			inputpropEditRow +=  '<input type="hidden" name="propertyType" value="' + pvalue.propertyType + '">('+pvalue.propertyType+')</td></tr>';
						
			tableEditInstProps += inputpropEditRow;

		});
		tableViewInstProps += inputpropViewRow;
		var footerView  = "<td colspan='2'> <input type='button' class='btn btn-primary btn-xs'  value='Go Update ' onclick='( new DisplayFormRenderer() ).showNodeUpdate(\"" + key + "\")' /><input type='reset' value='Hide' onclick='( new DisplayFormRenderer() ).hideNodeInfo(\"" + key + "\")' /></td></tr>" ;
		var footerEdit  = "<tr><td colspan='2'> <input type='button' class='btn btn-primary btn-xs'  value='Update' onclick='( new DisplayFormRenderer() ).saveUpdateInfo(\"" + key + "\")' /><input type='reset' value='Cancel' onclick='( new DisplayFormRenderer() ).cancelNodeUpdate(\"" + key + "\")' /></td></tr>";
			
		tableViewInstProps = tableViewInstProps + footerView + "</table>";
		tableEditInstProps = tableEditInstProps + footerEdit + "</table>";
			
		instViewDiv.append(tableViewInstProps);		
		instEditDiv.append(tableEditInstProps);	
	
	}
		
    this.saveUpdateInfo = function ( nodeId ){
		// grab the info from the Node property fields 	
		var instEditDiv = $("#form_inst_edit_" + nodeId );	
					
		var jsonData = {}, nodeProperties = [], newProperties = [];
		var sysProperties = [];
		
		var property = {}, newproperty = {}, foundError=false;
			
		var type         = nodeMap[nodeId].type;
		jsonData["type"] = typeMap[type].id;
		
	
		property['propertyName'] = 'uuid';
		property['propertyType'] = 'STRING';
		property['value']        = nodeId;
		
		sysProperties.push(property);
		
//		nodeProperties.push(property);
//		newProperties.push(property);
		
		property = {}; mewproperty = {};
		
		// grab the node properties
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
            jsonData.sysProperties = sysProperties;
			jsonData.properties = nodeProperties;
			jsonData.newProperties = newProperties;
					
			instEditDiv.hide();
				
			var doneFunction = function( data ) {
				console.log("Node Updated "+data.nodes[0].type);		     
						
				// grab Type and uuid for the node 
				nodeMap[nodeId]   = data.nodes[0];
				var tempType = typeMap[ nodeMap[nodeId].type ];
				var key = NodeUtils.findUUID (data.nodes[0]);
												
				// grab the name property of The Node and update it
				var instName = NodeUtils.findNameInst (  data.nodes[0]  );		
				document.getElementById(key).innerHTML = instName;
				
				// update and display properties info 
				( new DisplayFormRenderer() ).displayViewEditProperties( tempType,  key, data.nodes[0]);			
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
	
	this.createNode = function( selectedTypeId ) {
		
		console.log("Attempting to create :" + selectedTypeId );	
		// note that the SELECTION of a type should indicate a FOCUS
		// ie. Reset the listTypeId's and listConnId's
		GlobalUtils.clearGlobalSelected();		
		// assign the current 
		GlobalUtils.setGlobalTypeSelected( selectedTypeId );
		
		// hide all the others		
		DisplayFormUtils.resetFormAddInst( selectedTypeId );
		
		// add process to check if we can create an orphan node or must have parent first
		var parRequired = this.verifyNodeRelations(selectedTypeId);
		
		if( (parRequired != null) &&( parRequired.length > 0)){
	
			DisplayFormUtils.addFormParmust( selectedTypeId, parRequired );					
			
		}else {
			// no MUST Parent found  -- create Orphan Node Instance
			var instAddDiv = $("#form_inst_add_" + selectedTypeId );
			DisplayFormUtils.addFormInstCreate( instAddDiv, selectedTypeId, typeMapViaId[selectedTypeId ] );
			
			var footer  = '<tr align="center"><td colspan="2"><input type="button"  name="submit" class="btn btn-primary btn-xs"   id="form_inst_add_val_submit_' + selectedTypeId + '" value="Add Instance" onclick="( new DisplayFormRenderer() ).createNode_submit(' + selectedTypeId + ');"/>';		
		    footer += '<input type="button"   name="cancel" id="form_inst_add_val_cancel_' + selectedTypeId + '" value="Cancel" onclick="( new DisplayFormRenderer() ).createNode_cancel(' + selectedTypeId + ');"/></td></tr>';
		    		    
		    $('div#form_inst_add_'+selectedTypeId + '  tr').last().after(footer);	
									
		}
		// Make Form visible 
		var addDiv = document.getElementById("form_inst_add_" + selectedTypeId );
		if( addDiv != null ) {
			addDiv.style.display = "block";
			addDiv.style.visibility = "visible";
		} else {
			// nothing to show?
		}		
		
		
			      
	};

	this.verifyNodeRelations = function( selectedTypeId ){
		// looking for Parents  MUST Connections 
		var listOfConnPar = [];		
	   $.each( connMapViaId , function( key, value ) {			
			if( (selectedTypeId === value.target ) &&( value.minRel > '0'))	{			
				listOfConnPar.push(value);
			}
		});	
	   return  listOfConnPar;		
	}

	
    this.createNode_cancel = function( selectedTypeId ) {
		
		console.log("Attempting to Cancel :" + selectedTypeId );		
		// note that the SELECTION of a type should indicate a FOCUS
		// ie. Reset the listTypeId's and listConnId's
		GlobalUtils.clearGlobalSelected();		
		// assign the current 
		GlobalUtils.setGlobalTypeSelected( selectedTypeId );	
		$('#form_inst_add_' + selectedTypeId ).hide();
				      
	};
	
	
	this.createNodewithParent_submit = function( selectedTypeId ){
				
		console.log("Attempting to add a new Node for this type :" + selectedTypeId );	
		
		// retrieve the Info from the form_inst_create
//		var properties = this.retrievePropertiesFromCreate( selectedTypeId, 'form_inst_add_val_');
		
		var properties = NodeUtils.retrieveNodePropertiesFromForm ( selectedTypeId , 'form_create_val_');
		if(properties[properties.length-1]){      // if error(missing mandatory properties values  stop process -- error highlighted in form
			console.log(" do not continue");
			return;
		}
		properties.pop();
		
		// save node instance created 	
		this.saveNodeCreated (selectedTypeId, properties );
		var key  = listInstUuids[0];
		// retrieve Info from Form for creating the edge
		var jsonData = {};
		var originNodeUuid     =  document.getElementById('nodeInstParent_selected').value;	
		var originType         =  document.getElementById('nodeInstParentType_selected').value;		
		var connId             = document.getElementById("connSelected_").value;
		// build the json
		jsonData["originNodeUuid"]      = originNodeUuid;
		jsonData["originType"]          = typeMap[originType].id;		
		jsonData["ruleName"]            = connMapViaId[connId].rule;	
		jsonData["destinationNodeUuid"] = key;
		var destinationType             = nodeMap[key].type
		jsonData["destinationType"]     = typeMap[destinationType].id;
		
		// Call API for saving the edge
		var apiEdge  = new EdgeApis();
		
		var doneFunction = function ( dataEdge ){
			console.log("Edge created ");
			// add edge to edgeMap
			NodeUtils.AddEdgeToMap( dataEdge);	
			
			( new DisplayFormRenderer() ).createNode_cancel(selectedTypeId );			
			( new DisplayFormRenderer() ).addNodeInstanceToList(key, nodeMap[key] );
			( new DisplayFormRenderer() ).createAllRightDivsForNode ( key, nodeMap[key] );
			( new DisplayFormRenderer() ).setDefaultsForDivs( key, nodeMap[key] );			
			( new DisplayFormRenderer() ).displayNodeInfo(key , nodeMap[key] );				  // add the View and Edit section 	
			( new DisplayFormRenderer() ).addNodeToChildList(key, originNodeUuid, dataEdge.type);
			( new DisplayFormRenderer() ).selectInstance( key );
		}
		
		var failFunction = function (  xhr, status, error ){
			console.log('Error Edge not created: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Error Edge not created:"+ xhr.status+"</p>");	
		}
		
		apiEdge.saveEdge( jsonData,  doneFunction, failFunction );
			
	}
		
	
	this.retrievePropertiesFromCreate = function(selectedTypeId, formElementId )	{
		var typeProperties = typeMapViaId[selectedTypeId].typeProperties;

		var error         = false;
		var properties    = [];
		var nodeproperty  = {};
		
	
		if(!$.isEmptyObject(typeProperties) ){
			$.each( typeProperties, function(propId, tmpProp){
	//			Retrieve the value of property -- prepare the json
				var valueProp = $('#'+formElementId +tmpProp.id ).val();
				if(tmpProp.isMandatory){
					if(!valueProp){
						document.getElementById(formElementId + tmpProp.id ).style.backgroundColor = "yellow"; 
						error = true;
						return;
					}else {
						nodeproperty = NodeUtils.buildPropertyJson( tmpProp, valueProp );
						properties.push(nodeproperty);
											
					}
				}else if (valueProp){
					 nodeproperty = NodeUtils.buildPropertyJson( tmpProp, valueProp );     					                              
		
					properties.push(nodeproperty);
				}
				
				nodeproperty = {};
			});
	    }else {
	    	// no properties were defined for the type  -- we can still create the node instance with no properties
	    }

		properties.push(error);
		return properties;
	}

	
	this.saveNodeCreated = function ( selectedTypeId, properties ){
			
		var data = new NodeJsonObject();
		var  key = null;
		// set the minimum
		data.init(selectedMetaData.toString(), selectedTypeId.toString(), properties);
		data.defaultDecorator = "1";

		var doneFunction = function( dataNode ) {
												  				  	
		  	$('#console-log').append("<p style='color:blue'Node created successfully.</p>");
		  	
	 	   // update corresponding section and nb of type nodes 			
			NodeUtils.AddNodeToMap( dataNode);   

			GlobalUtils.addNBTypeInstances(dataNode);
			var nbSpan = document.getElementById("nb_"+selectedTypeId);
			var nb     = typeMapViaId[selectedTypeId].nb;
			nbSpan.innerHTML = nb;	
			
			listInstUuids[0] = NodeUtils.findUUID (dataNode);	
			  				
		};
			
		var failFunction = function( xhr, status, error ) {
			console.log('Error Node not created: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Error Node not created:"+ xhr.status+"</p>");	
		};
		
		var api  = new NodeApis();
		api.saveNode( data,  doneFunction, failFunction );
				
	}

	
	this.createNodeParent_submit = function ( selectedTypeId ){
		console.log("Attempting to add a new Node for this type :" + selectedTypeId );		
		// retrieve the Info
//		var properties = this.retrievePropertiesFromCreate( selectedTypeId , 'form_inst_add_val_');
		
		var properties = NodeUtils.retrieveNodePropertiesFromForm ( selectedTypeId , 'form_inst_add_val_');
		if(properties[properties.length-1]){
			console.log(" do not continue");
			return;
		}
		properties.pop();
		
		this.saveNodeCreated (selectedTypeId, properties );
		var key  = listInstUuids[0];
		
		DisplayFormUtils.createNodeWithParent( key, selectedTypeId, listTypeIds[0]);	
		
	}
	
	
//	PROCESS FOR A NODE ORPHAN CREATED --   RETRIEVE Node Properties -- SAVE NODE ---- CLEAR FORM --- CREATE RIGHT DIVISION For NODE  
	this.createNode_submit = function( selectedTypeId ) {
		var properties=[];
		var key = null;
		
		console.log("Attempting to add a new Node for this type :" + selectedTypeId );		
		// retrieve the Info
//		properties = this.retrievePropertiesFromCreate( selectedTypeId , 'form_inst_add_val_');	
		
		properties = NodeUtils.retrieveNodePropertiesFromForm ( selectedTypeId , 'form_inst_add_val_');
		
		if(properties[properties.length-1]){
			console.log(" do not continue");
			return;
		}
		properties.pop();
		
		// save Node 
	    this.saveNodeCreated (selectedTypeId, properties );
	    var key  = listInstUuids[0];
	    
		this.createNode_cancel(selectedTypeId );	
		this.addNodeInstanceToList(key, nodeMap[key] );
		this.createAllRightDivsForNode ( key, nodeMap[key] );
		this.setDefaultsForDivs( key, nodeMap[key] );		
		this.displayNodeInfo( key , nodeMap[key] );				  // add the View and Edit section 		
		this.displayParentChildrenNode( key, value);	
		this.selectInstance( key );
		    
	};	
	
	
	this.selectedType = function( selectedTypeId ) {
		
		DisplayFormUtils.clearAddRow();	
		
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
							
		// get all node instances under this type and display list	 as well as update the right section for the instance
		var successFunction = function( data ) {
			console.log(data.nodes);
			
			$.each(data.nodes, function(key, value){
				var uuid = null;
				value.properties.forEach(function(prop) {
					if(prop.name=="uuid"){
						uuid = prop.value 
					}
				}); 
				
				if (uuid != null) {
					if (!nodeMap[uuid]) {
						nodeMap[uuid]= value;
					}else  {nodeMap[uuid] = value;}
				}
				
				var tempType = typeMapViaId[selectedTypeId ];
				( new DisplayFormRenderer() ).displayViewEditProperties(tempType, uuid , value );
				
			});						
		};
		
		var failFunction = function( xhr, status, error ) {
			console.log('Not able to load Nodes for this Type: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Not able to load Nodes for this Type:"+ xhr.status+"</p>");	
		};
		
		var nodeApi = new NodeApis();		
		nodeApi.getNodesUnderType(selectedTypeId, successFunction, failFunction);
			
	};

	this.displayConnectLinkTo = function ( instId ){
		
		var tableInstConnDiv = $("#nodeFormConnecttoTable_" + instId );		
		tableInstConnDiv.empty();				
		var inputRow = '';
        inputRow   +=  "<tr><th>Connect as :<br/><input type='radio' value='asParent' name='typeConnPosition_"+instId+"' onchange='DisplayFormUtils.buildTypeListConnect(\""+ instId+"\" )'/ >Parent<br/><input type='radio' value='asChild' name='typeConnPosition_"+instId+"' onchange='DisplayFormUtils.buildTypeListConnect( \""+ instId+"\" )'>Child</th></tr>";					
		tableInstConnDiv.append(inputRow);
		
		
		var tableInstlinktoDiv = $("#nodeFormLinktoTable_" + instId );		
		tableInstlinktoDiv.empty();				
		var inputRow = '';
        inputRow   +=  "<tr><th>Link as :<br/><input type='radio' value='asParent' name='typelinkPosition_"+instId+"' onchange='DisplayFormUtils.buildTypeListLink(\""+ instId+"\" )'/ >Parent<br/><input type='radio' value='asChild' name='typelinkPosition_"+instId+"' onchange='DisplayFormUtils.buildTypeListLink( \""+ instId+"\" )'>Child</th></tr>";					
        tableInstlinktoDiv.append(inputRow);
		
	}
//==============================================================================================================	
//	UTILITIES 	
	this.selectInstance = function( instId ) {
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
		
		DisplayFormUtils.showDivision ("form_inst_", instId  );	
		
		DisplayFormUtils.showDivision ("form_inst_children_", instId  );	
		
		DisplayFormUtils.showDivision ("form_inst_parent_", instId  );	
		
		DisplayFormUtils.showDivision ("form_inst_sibling_", instId  );	
		
		DisplayFormUtils.showDivision ("form_inst_linkto_", instId  );	
		
		DisplayFormUtils.showDivision ("form_inst_connectto_", instId  );	

		
		
		// reset all forms (Parent-Children-Sibling 
		 DisplayFormUtils.resetParChildSibForms(instId);
		// display updated ones
		 this.displayParentChildrenNode( instId, nodeMap[instId]);
		 
		 this.displayConnectLinkTo( instId);
		 
		 GlobalUtils.setGlobalInstSelected (instId);
	};	
	
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
	
	
	
	
	
	



	


