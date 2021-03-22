function NodeUtils() {
	
};

 NodeUtils.loadNodes = function() {
	
	var jsonData = {};
	if (listTypeIds.length != 0 ){jsonData.typeIds = listTypeIds;}
	if (listConnIds.length != 0 ){jsonData.connIds = listConnIds;}
	console.log(jsonData);
	
	var successFunction = function( data ) {
		NodeUtils.buildNodeAndEdgeVars(data);
	}
	
	var failFunction = function( xhr, status, error ) {
		$("#console-log").append("Not able to load Type Nodes Error: " + xhr.status);
  	    console.log("Error: " + xhr.responseText); 
	}
	
	var apis = new apiRomeNext();	
	apis.loadAllNodes( jsonData, successFunction, failFunction );
	
};

 NodeUtils.loadAllNodesAndEdges = function() {
	
	var successFunction = function( data ) {
		NodeUtils.buildNodeAndEdgeVars(data);
	};
	
	var failFunction = function( xhr, status, error ) {
		console.log("Error: " + xhr.status);
		$('#console-log').append("Error: Not able to load Nodes " + xhr.status);
	};
		
	var apis = new apiRomeNext();	
	apis.initInstanceGraph( successFunction, failFunction );
	
};

 NodeUtils.buildNodeAndEdgeVars = function(jsonData) {
	
	nodeMap = {}; 
	edgeMap = {};
	
	$.each(jsonData.nodes, function(key, value){
		
		var uuid = NodeUtils.findUUID( value );	
		
		if (uuid != null) {
			if (!nodeMap[uuid]) {
				nodeMap[uuid]= value;
			}
		}
	});
	
	$.each(jsonData.edges, function(key, value){
		
		var uuid = NodeUtils.findUUID( value );	
		
		if (uuid != null) {
			if (!edgeMap[uuid]) {
				edgeMap[uuid]= value;
			}
		}
		
	});
	
};

 NodeUtils.buildNodes = function(jsonData) {
	
	var nodes = {}; 
	
	$.each(jsonData, function(key, value){
		
		var uuid = NodeUtils.findUUID( value );	
		
		if (uuid != null) {
			if (!nodes[uuid]) {
				nodes[uuid]= value;
			}
		}
	});
	
	return nodes;

};

/*
 * Function to Add Node  to the nodeMap 
 * 
 * data provided is a json for a node with all details  (id, type, typeId, properties [], decoproperties [])
 */
 NodeUtils.AddNodeToMap = function (data) {
	 if(!$.isEmptyObject(data) ){
		var uuid = NodeUtils.findUUID( data );	
		
		if (uuid != null) {				
			if (!nodeMap[uuid]) {    // if node does not exist in the nodeMap
				data.parents  = {};
				data.children = {};
				data.sibling  = {};				
				nodeMap[uuid]= data;
			}
		}else {
			console.log(" Could not find the uuid of the node -- node not added to the nodeMap");
		}
	 }else {
		 console.log(" no Node details provided ");
		 return null;
	 }
}
/*
 * Function to Add Edge to the edgeMap 
 * 
 * data provided is a json for the edge  with all details  (id, classification, connectionId, origin, destination, originId, destinationId, type, originUuid, destinationUuid, minRel, maxRel, properties [])
 */

 NodeUtils.AddEdgeToMap = function (data) {
	 if(!$.isEmptyObject(data) ){
			var uuid = NodeUtils.findUUID( data );	 
			
			if (uuid != null) {
				if (!edgeMap[uuid]) {
					edgeMap[uuid]= data;
				}
			}else{
				console.log(" Could not find the edge uuid ");
			}
	 }else {
		 console.log(" No edge details provided ");
		 return null;
	 }
}
/*
 * Function to find UUID from the sysProperties[] of the info provided (node/edge)
 * 
 */

 NodeUtils.findUUID = function( data ){
	 if(!$.isEmptyObject(data) ){
		 var uuid = null;
		 if (!$.isEmptyObject(data.sysProperties)){
			 $.each( data.sysProperties, function( key, value ) {	
				if(value.name=="uuid"){
					uuid = value.value 
				}
			}); 
		 }
		 return uuid;
	 }else {
		 console.log(" no node/edge details provided ");
		 return null;
	 }
 }
 
 NodeUtils.findRestriction = function( data ){
	 if(!$.isEmptyObject(data) ){
		 var restriction = null;
		 if (!$.isEmptyObject(data.sysProperties)){
			 $.each( data.sysProperties, function( key, value ) {	
				if(value.name=="restrictionStatus"){
					restriction = value.value 
				}
			}); 
		 }
		 return restriction;
	 }else {
		 console.log(" no node details provided ");
		 return null;
	 }
 }
 /*
  * Function to find NAME from the properties[{name, propertyType, value}] of the node provided 
  * 
  */
 NodeUtils.findIdNamePropertyFromType = function ( typeId ){
	 var namePropertyId = null;
	 if(typeId){
		 var props = typeMapViaId[typeId].typeProperties;
		 $.each(props, function( propId, tmpProp ) {
			 if(tmpProp.name == "name") { namePropertyId = propId}
		 })
		 return namePropertyId;
	 }else {
		 console.error("Missing type Id ! Cannot find Name property ");
		 return null;
	 }
 }
 

 NodeUtils.findNameInst = function ( data){
	 if(!$.isEmptyObject(data) ){ 
	    var name = null;
	    if (!$.isEmptyObject(data.typeProperties)){
//			data.properties.forEach(function(prop) {
	    	var propId = NodeUtils.findIdNamePropertyFromType(data.typeId);
			 $.each( data.typeProperties, function( key, value ) {		
				if( value.id == propId){
					name = value.value 
				}
			}); 
			if( name == null){ 
				name = '('+data.type +')' ;
				} // if there is no name return the Type of the node
	    }
		return name; 
	 }else {
		 console.log(" no node typeProperties provided ");
		 return null;
	 }
	 
 }
 
 
 
 
 
 
 /*
  * Function to build the list of Parents/Children/Sibling from the nodes and edges provided when node is selected 
  * 
  *  data will contains a list of nodes [{id, type, typeId, properties [], decoproperties []},{},...... ]
  *       and edges linking these nodes  [{id, classification, connectionId, origin, destination, originId, destinationId, type, originUuid, destinationUuid, minRel, maxRel, properties [)},{},{}]
  */
 NodeUtils.buildNodeDetails = function ( nodeUuid,  data){
	 if(!nodeUuid ){
		 console.log("missing Uuid for the node to build its Parents - Children -- Sibling");
		 return;
	 }
//	 if($.isEmptyObject(data.nodes) ){                            // 
//		 console.log(" no node details provided ");
//		 return;
//	 }
//	 $.each(data.nodes, function(key, value){		       // add nodes to nodeMap
//		NodeUtils.AddNodeToMap(value); 
//	 });
	 
	 if($.isEmptyObject(data.edges) ){                     // no parent -- no children -- no sibling                                                 
		 console.log(" no edge details provided ");
		 return;
	 }
	 
	 $.each(data.edges, function(key, value){	
		 	// add Edge to edgemap	 
			var edgeUuid = NodeUtils.findUUID( value );
			if (edgeUuid != null) {                          // add edge to the edgeMap
				if (!edgeMap[edgeUuid]) {
					edgeMap[edgeUuid]= value;
				}
			}else {
				console.log("missing uuid for the edge ");	
				return;
			}
			
           // based on the connection ADD a Child or Parent or Sibling to corresponding list
			var parent = {}, child = {}, sibling = {};
			
			var originNodeUuid = NodeUtils.findUUID( value.originNode);
			var destinationNodeUuid = NodeUtils.findUUID( value.destinationNode );
			
			if(!originNodeUuid || !destinationNodeUuid ){
				console.log(" This edge does not have approriate origin and destination nodes info "+ edgeUuid);
			}else {
				if(value.classification == 'parentchild') {
					 if ( originNodeUuid == nodeUuid ) {  // destination is the node to save 
						                                  NodeUtils.AddNodeToMap(value.destinationNode);   
						                                  NodeUtils.buildChildNodeDetail( nodeUuid, value);
					 }else if( destinationNodeUuid == nodeUuid ){	   // origin node to save 
						                                  NodeUtils.AddNodeToMap(value.originNode); 
						                                  NodeUtils.buildParentNodeDetail( nodeUuid, value);
					 }else {
						 // error     Remove edge from list   
					 }
					 
				 }else if ( value.classification == 'link'){ 
					            if ( originNodeUuid == nodeUuid ) {
					            	                NodeUtils.AddNodeToMap(value.destinationNode); 
						                            NodeUtils.buildSiblingNodeDetail ( nodeUuid, value, 'destination');
								 }else if( destinationNodeUuid == nodeUuid ){
													 NodeUtils.AddNodeToMap(value.originNode); 
													 NodeUtils.buildSiblingNodeDetail ( nodeUuid, value, 'origin');
								 }
				 }				
			} 
		});
	 
 }
 
 NodeUtils.buildChildNodeDetail = function ( nodeUuid, edgevalue){
	 if(!nodeUuid || $.isEmptyObject(edgevalue)){
		 console.log(" missing node uuid or edge value to build Info Child ");
		 return;
	 }
	  
	 var child ={}, val;
	 
	 var newuuid  = NodeUtils.findUUID (edgevalue.destinationNode);
	 var instName = NodeUtils.findNameInst(edgevalue.destinationNode);
	 
	 child.typeId         = edgevalue.destinationTypeId;
	 child.Typename       = edgevalue.destinationNode.name;
	 child.uuid           = newuuid;
	 child.classification = edgevalue.classification ;             // may not be needed  ????
	 child.connId         = edgevalue.connectionId;                // may not be needed   ???
	 child.ruleName       = edgevalue.type;	 
	 child.name           = instName;
	 
	 val = nodeMap[nodeUuid].children;
	 	 
	 if( !val[newuuid]) { 
		 val[newuuid] = child;
		 }
	 //update the list of children
	 nodeMap[nodeUuid].children = val;
	 
 }
 
 NodeUtils.buildParentNodeDetail = function ( nodeUuid, edgevalue){
	 if(!nodeUuid || $.isEmptyObject(edgevalue)){
		 console.log(" missing node uuid or edge value to build Info parent ");
		 return;
	 }
	 
	 var parent ={}, val;
	 var newuuid  = NodeUtils.findUUID (edgevalue.originNode);
	 var instName = NodeUtils.findNameInst(edgevalue.originNode);
	 
	
	 parent.typeId         = edgevalue.originTypeId;
	 parent.TypeName       = edgevalue.originNode.name
	 parent.uuid           = newuuid;
	 parent.classification = edgevalue.classification ;
	 parent.connId         = edgevalue.connectionId;
	 parent.ruleName       = edgevalue.type;
	 parent.name           = instName;
	 
	 val = nodeMap[nodeUuid].parents;
	 
	 if( !val[newuuid]) {
		 val[newuuid] = parent;
		 }
	 nodeMap[nodeUuid].parents = val;
	 
 } 

 NodeUtils.buildSiblingNodeDetail = function ( nodeUuid, edgevalue, from){
	 if(!nodeUuid || $.isEmptyObject(edgevalue)){
		 console.log(" missing node uuid or edge value to build Info Sibling ");
		 return;
	 }
	 
	
	var sibling = {}, val;
	var newuuid  = NodeUtils.findUUID (edgevalue[from+'Node']);
	var instName = NodeUtils.findNameInst(edgevalue[from+'Node']);
	
	sibling["typeId"]         = edgevalue[from+'TypeId'];
	sibling["typeName"]       = edgevalue[from+'Node.name'];
	sibling["uuid"]           = newuuid;
	sibling["classification"] = edgevalue["classification"];
	sibling["connId"]         = edgevalue["connectionId"];
	sibling["ruleName"]       = edgevalue["type"];
    sibling.name              = instName;
	
    val = nodeMap[nodeUuid].sibling;
	 
	 if( !val[newuuid]) { 
		 val[newuuid] = (sibling);
		 }
	 nodeMap[nodeUuid].sibling = val;	
}
 

 NodeUtils.findPropInType = function (propId, type){  
		var props = null;
		if (typeMap[type] == undefined) {
			props = typeMapViaId[type].typeProperties;
		} else {
			props = typeMap[type].typeProperties;
		}
			
		 if (!$.isEmptyObject(props)){
			 $.each( props, function( key, value ) {
				 if(value.id == propId ){ return value.isMandatory }
		     });	
	     }
 }



NodeUtils.globalCreateNode = function( data ) {
	
	// we expect the data to be in json format that is equiv to the api call
	
	var createFunctions = globalNode_fns["create"];
	
	$.each(createFunctions, function(key, value) {	
		value.createNode( data );
	});
	
};


NodeUtils.globalNode_addFn = function( type, subtype, fns ) {
	if (!global_node_fns[ type ]) {
		// if not type, create it
		global_node_fns[ type ] = {};

	};
	
	( global_node_fns[ type ] )[subtype] = fns;
};



//   NOTE  : this may be used once a mixed deco (Display Logical - Physical ) is activated
//=======================================================================
//              UTILITIES   For CREATE NODE
//=======================================================================
NodeUtils.retrieveModelProperties   =  function (shapes) {
	var result = [];	
	var parentChild = null;
    if (physicalModelView == 'parent') {		parentChild = 1
    } else if (physicalModelView == 'child') {	parentChild = 3
    }
	
	
	for (var i = 0; i < shapes.length; i++) {
		if ((shapes[i].hasOwnProperty("property")) &&(shapes[i].parentChildState== parentChild)){
			var hasProp = false;
			for (var j = 0; j < result.length; j++) {
				if (result[j].id == shapes[i].property.id) {
					hasProp = true;
				}
			}
			if (hasProp == false) {
				result.push(shapes[i].property);
			}
		}
	}
//	curModelProperties = result;    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	return result;
}

// to find if a type is a sub-parent type of a node
NodeUtils.isSubParent = function (typeId, nodeUuid) {
	for (var key in nodeMap[nodeUuid].parents) {
		var tmpConns = GlobalConnUtils.findConnsBySourceAndTarget(nodeMap[nodeUuid].parents[key].typeId, typeId);
		if (tmpConns) {
			return nodeMap[nodeUuid].parents[key];
		}
	}
	
	return null;
}

//to find if a node is a child of another node
NodeUtils.isChild = function (parentNode, childNodeUuid) {
	for (var key in parentNode.children) {
		var tmpChildNodeUuid = parentNode.children[key].uuid;
		if (tmpChildNodeUuid == childNodeUuid) {
			return true;
		}
	}
	
	return false;
}
//=======================================================================================================
//                    FUNCTIONS  USED BY ALL DECOS  ---- DO NOT CHANGE UNLESS IT DOES NOT IMPACT
//
//
//=======================================================================================================
NodeUtils.createEdgeJson = function(originType, originUuid, destinationType,destinationUuid, connection){
	
	var jsonData = {};	
	 jsonData["originType"]         =  originType.toString() ;
	 jsonData["originNodeUuid"]     =  originUuid;
	 jsonData["destinationType"]    =  destinationType.toString(); 
	 jsonData["destinationNodeUuid"]=  destinationUuid ;	
	 jsonData["connection"]         =  connection.toString();
	 return jsonData;
	
}
NodeUtils.createSysJson = function(nodeUuid){
	
	var property = {};
	property['propertyType'] = 'STRING';
	property['value']        = nodeUuid;	
	property['propertyName'] = 'uuid';
	return property;

}
NodeUtils.buildPropertyJson = function( tmpProp , valueProp   ){

	var nodeProperty = {};
	nodeProperty.propertyId    = tmpProp.id;
	nodeProperty.propertyName  = tmpProp.name;
	nodeProperty.propertyType  = tmpProp.propertyType;
	nodeProperty.value         = valueProp; 
	return nodeProperty;
}

NodeUtils.retrieveNodePropertiesFromForm = function( typeId, formElementId )	{
	if(!typeId){
		console.log(" no type given: cannot create Instance with Parent NODE  "); 
		return;
	}
	
	var typeProperties = typeMapViaId[typeId].typeProperties;
	
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

NodeUtils.addFormInstCreate = function( appendToDiv, typeId ){
	
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
//    if ( tmpType.properties.length > 0 ) {
   	if(!$.isEmptyObject( tmpType.typeProperties	)){
		$.each( tmpType.typeProperties, function( propId, tmpProp ) {
									
			if(tmpProp.isMandatory){ propcolor='color:red'  } else {propcolor='color:black' };		
			if( tmpProp.propertyType == "DATE" ) {
				inputContent += '<tr id="typeProps"><td  style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input type="date"  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" value="" / >(DATE) </td></tr>' ;
			}else {
					
					inputContent += '<tr id="typeProps" ><td  style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" value="" ' ;	
					if( tmpProp.propertyType == "STRING" ) {
						inputContent += ' type="text"/ >(TEXT)</td> </tr>' ;
					} else if( tmpProp.propertyType == "INTEGER" ) {
						inputContent += 'type="text"/ >(NUMBER) </td></tr>' ;
					} else if( tmpProp.propertyType == "DOUBLE" ) {
						inputContent += 'type="text"/ >(DOUBLE) </td></tr>' ;
					} else if( tmpProp.propertyType == "BOOLEAN" ) {
						inputContent += 'type="text"/ >(BOOLEAN) </td></tr>' ;
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

NodeUtils.getAllRelations = function( type ){
	if( type == null ) {
		console.log(" No type Id defined ");
		return null;
	}    
	// looking for Parents  MUST Connections 
	var listOfConnPar = []; 
	var listOfConnChild = [];
	var listOfLinkSibling = [];
	$.each( connMapViaId , function( key, value ) {      
		if(value.classification == 'parentchild'){
			
			// WHY IS THIS ONLY GRABBING REQUIRED? NOT OPTIONAL?
			
			if( ( type.id == value.target ) && ( value.minRel > '0'))      {                       
				listOfConnPar.push(value);
			}else if ( (listTypeIds[0] == value.source.toString() ) &&( value.minRel > '0')){
				
				listOfConnChild.push(value);
			}
		}else if (value.classification == 'link'){
			if(( type.id == value.target ) &&( value.minRel > '0')||( type.id == value.source.toString() ) &&( value.minRel > '0')){
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

NodeUtils.addParentsIfNeeded = function( appendToDiv, typeId ){
	
	if(!typeId ){
		console.log(" no Type Id provided: cannot build create Instance table  "); 
		return;
	}
	var tmpType = typeMapViaId[typeId];
	// populate the Add INSTANCE FORM with properties	              
	var propcolor = '';			                           // RED color used to highlight Mandatory property
				
	var relationships = NodeUtils.getAllRelations( tmpType );
	
	// find the parents
	if( relationships['parent'].length ){	   

		var parents = relationships['parent'];

		var line = '';
		
		for( var i=0; i < parents.length ; i++){
			
			line += '<tr id="rowNodeParent_'+ parents[i].source+'_for_'+typeId+'" >';
			
			var color = typeMapViaId[relatedRequired['parent'][i].target].color;
			
			line += '<td><span class="badge" style="color:black; background:'+color+'">'+ parents[i].origin +'</span></td>';

			if (typeMapViaId[ parents[i].source].sysProperties.restrictionStatus == "ROOTONLY") {
				ableToCreateParent = false;
			} else {
				ableToCreateParent = true;
			}

			line += '<td>';
			if (ableToCreateParent == true) {
				line += '<input type="radio" name="mustConn_'+ parents[i].source+'_for_'+ typeId+'"   value="create" onclick="ReservationUtils.showCreateDiv('+relatedRequired['parent'][i].source+', '+typeId+' )"/>Create</br/>';
			}
			line += '<input id="connect_parents_in_creation" type="radio" name="mustConn_'+relatedRequired['parent'][i].source+'_for_'+ typeId+'"    value="use" onclick="ReservationUtils.showCreateDiv('+relatedRequired['parent'][i].source+', '+typeId+' )" />Select</td>';

			line += '<td>';
			if (ableToCreateParent == true) {
				line += '<div id="createParent_'+ parents[i].source+'_for_'+typeId+'" style="display:none;visibility:hidden"></div>';
			}
			line += '<div id="nodeDisplay_'+ parents[i].source+'_for_'+typeId+'"></div></td></tr>';

			inputSupportContentList += line;
			line = '';
			// saving these info for the saving process;

			element.currTypeId       = typeId;
			element.nodeUuidCurrType = null;
			element.typeIdcas        = 'asParent';
			element.typeId           = parents[i].source;
			element.typeConn         = parents[i].id;
			element.nodeUuid         = null;
			element.status           = 'pending';
			historyNode.push(element);
			element = {};    	
		} 

	}


	
	
	
//	
//	
//	
//	// build the form
//	var inputContent = '';
//	    inputContent += '<table id="create_' + typeMapViaId[typeId].name + '_instance_table_id" border="2">';
////    if ( tmpType.properties.length > 0 ) {
//   	if(!$.isEmptyObject( tmpType.typeProperties	)){
//		$.each( tmpType.typeProperties, function( propId, tmpProp ) {
//									
//			if(tmpProp.isMandatory){ propcolor='color:red'  } else {propcolor='color:black' };		
//			if( tmpProp.propertyType == "DATE" ) {
//				inputContent += '<tr id="typeProps"><td  style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input type="date"  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" value="" / >(DATE) </td></tr>' ;
//			}else {
//					
//					inputContent += '<tr id="typeProps" ><td  style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" value="" ' ;	
//					if( tmpProp.propertyType == "STRING" ) {
//						inputContent += ' type="text"/ >(TEXT)</td> </tr>' ;
//					} else if( tmpProp.propertyType == "INTEGER" ) {
//						inputContent += 'type="text"/ >(NUMBER) </td></tr>' ;
//					} else if( tmpProp.propertyType == "DOUBLE" ) {
//						inputContent += 'type="text"/ >(DOUBLE) </td></tr>' ;
//					} else if( tmpProp.propertyType == "BOOLEAN" ) {
//						inputContent += 'type="text"/ >(BOOLEAN) </td></tr>' ;
//					} else {
//						inputContent += 'type="text"/ >(UNKNOWN TYPE) </td></tr>' ;		
//					}			
//			}	
//		});
//    }else {    
//    	inputContent += "<tr><td colspan='2'> No Properties defined for this Type </td></tr>"   
//    };
//	
//    inputContent = inputContent + "</table><br />";    
//	appendToDiv.append(inputContent);			
}


NodeUtils.showParentCreateDiv = function (parent, typeId){
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
//		ReservationUtils.addFormInstCreate($("#createParent_"+parent+"_for_"+typeId ), parent);
		NodeUtils.addFormInstCreate($("#createParent_"+parent+"_for_"+typeId ), parent);
		//  -- hide the select option 
		ReservationUtils.hideDivision('nodeDisplay_'+parent+'_for_', typeId);
		// --  show the create option
		ReservationUtils.showDivision('createParent_'+parent+'_for_', typeId);
		
//		var parentChild = typeMapViaId[GlobalConnUtils.findConnsBySource(parent)[0].target];
//		var createChildForParent = '<tr id="create_"></tr>';
//		$("#create_" + typeMapViaId[parent].id + "_for_" + typeMapViaId[parent].id).empty();
		// clear <tr id>
		// create contact
		// append to $('#create_' + typeMapViaId[typeId].name + '_instance_table_id').append(inputSupportContentList);
		
		
	}else if (valueSelected == 'use'){
	
		// build the list of nodes 
		$("#nodeDisplay_"+parent+"_for_"+typeId).empty();;
		ReservationUtils.buildListNodes($("#nodeDisplay_"+parent+"_for_"+typeId), typeId, parent );
		
		// hide the create  option 
		ReservationUtils.hideDivision('createParent_'+parent+'_for_', typeId);
		// show the list to select from 
		ReservationUtils.showDivision('nodeDisplay_'+parent+'_for_', typeId);	
		
		// clear <tr id>
		// load contact
	}
	       					    
}


NodeUtils.findTypeID = function(typeName){
	 var typeId = null;
	 if(!typeName){
		 console.error(" No typeName passed "+typeName +"; Process Aborted; "); 
		 return null;
	 }
	 
	$.each(typeMapViaId, function(key, value){			
		// do a non-case check
		var name = value.name.toUpperCase();									
		if( name === typeName ) {
			typeId = value.id;
		}
	});
	return typeId ;
}

NodeUtils.getRangeDates = function (startDate, endDate ){

	var datesFormatted = [];
	var start 	= new Date(startDate),
    	end 	= new Date(endDate),
    	year 	= start.getFullYear(),
    	month 	= start.getMonth(),  
    	day 	= start.getDate(), 
    	dates 	= [start];
	var i = 0;
	var getDate, getMonth = '';
	while(dates[dates.length-1] < end) {
		getMonth = dates[i].getMonth()+1;
		getDate  = dates[i].getDate();

		if( getMonth < 10) {  getMonth = '0'+ getMonth; }

		if( getDate < 10) {   getDate = '0'+ getDate; }

	  datesFormatted.push(getMonth+'/'+ getDate+'/'+dates[i].getFullYear());
	  dates.push(new Date(year, month, ++day));
	  i++; 
	}
	return datesFormatted;
}







// CREATE PARENT GENERIC FUNCTIONS

NodeUtils.generateParentForm = function( appendToDiv, rootTypeId ){
	
	if(!rootTypeId ){
		console.log(" no Type Id provided: cannot build create Instance table  "); 
		return;
	}
	var tmpType = typeMapViaId[rootTypeId];
	// populate the Add INSTANCE FORM with properties	              
	var propcolor = '';			                           // RED color used to highlight Mandatory property
				
	var relationships = NodeUtils.getAllRelations( tmpType );
	
	var parents = relationships["parent"];
	
	// generate table for this
	// format
	//      NAME  |    OPTIONS     |  DETAILS
	var tableParentForm = "<table>";
	
	var line = "";
	
	for( var i=0; i < parents.length ; i++) {
		
		// dest
//		var tmpType = typeMapViaId[parents[i].target];
		var parentInfo = typeMapViaId[parents[i].source];

		
		tableParentForm += "<tr>";
		
		// name section
		line += "<td>";
		var color = parentInfo.color;
		line += '<span class="badge" style="color:black; background:'+color+'">'+ parentInfo.name +'</span>';
		line += "</td>";
		
		
		// option section
		var ableToCreateSibling = true;
		
		if (typeMapViaId[ parents[i].target].sysProperties.restrictionStatus == "ROOTONLY") {
    		ableToCreateSibling = false;
    	}
		
    	line += '<td>';
    	
//		if (ableToCreateSibling == true) {
//    	}
    	
    	var createDivName_details = "createParent_";
    	var searchDivName_details = "";
		
		line += '<input type="radio" name="mustConn_'+ parentInfo.id +'_for_'+ rootTypeId+'"   value="create" onclick="ReservationUtils.showCreateDiv('+ parents[i].target+', '+ parentInfo.id +' )"/>Create</br/>';
    	line += '<input type="radio" name="mustConn_'+ parentInfo.id +'_for_'+ rootTypeId+'"    value="use" onclick="ReservationUtils.showCreateDiv('+ parents[i].target+', '+rootTypeId+' )" />Search';
    	generateCreateDivBlock_generic
    	line += '</td>';
    	
    	line += '<td>';
//    	if (ableToCreateSibling == true) {
//    	}
    	line += '<div id="createParent_'+ parents[i].target+'_for_'+rootTypeId+'" style="display:none;visibility:hidden"></div>';	
    	line += '<div id="nodeDisplay_'+ parents[i].target+'_for_'+rootTypeId+'"></div>';
    	line += '</td>';
    	
    	
    	// details section
    	line += "<td>";
//    	if(!rootTypeId || !parents ){
//    		console.log(" no Type Id or parent typeId provided: cannot show or hide divisions "); 
//    		return;
//    	};
    	
    	
//    	ReservationUtils.createAppendHTMLEntity = function( elementType, elementId, className, visibility, display, innerHtml, appendToDiv) {
//    		
//    		var newElement = document.createElement( elementType );
//    		newElement.id = elementId;
//    		newElement.className = className;
//    		newElement.style.visibility = visibility;
//    		newElement.style.display = display;
//    		newElement.innerHTML = innerHtml;
//    		
//    		appendToDiv.append(newElement);
//    	}
    	
//    	ReservationUtils.createHTMLEntity( );
		var testDiv = ReservationUtils.createHTMLEntity( 'div', "testing_div_name_1" , 'cy', 'visible', 'flex', '' );

    	// make div for parent
    	
		NodeUtils.addFormInstCreate( testDiv, parents.id );

    	
//    	
//    	var valueSelected = $('input[name="mustConn_'+parent+'_for_'+ typeId+'"]:checked').val();
//    	if(!valueSelected){
//    		console.log(" No value selected  "+ valueSelected);	
//    		return;
//    	}
//    	$('input[name="mustConn_'+parent+'_for_'+typeId+'"]').parent('td').css("backgroundColor", "");
//    	 
//    	if(valueSelected == 'create' ){
//    		// Display the Type properties to create a node
//    		$("#createParent_"+parent+"_for_"+typeId ).empty();
////    		ReservationUtils.addFormInstCreate($("#createParent_"+parent+"_for_"+typeId ), parent);
//    		NodeUtils.addFormInstCreate($("#createParent_"+parent+"_for_"+typeId ), parent);
//    		//  -- hide the select option 
//    		ReservationUtils.hideDivision('nodeDisplay_'+parent+'_for_', typeId);
//    		// --  show the create option
//    		ReservationUtils.showDivision('createParent_'+parent+'_for_', typeId);
//    		
////    		var parentChild = typeMapViaId[GlobalConnUtils.findConnsBySource(parent)[0].target];
////    		var createChildForParent = '<tr id="create_"></tr>';
////    		$("#create_" + typeMapViaId[parent].id + "_for_" + typeMapViaId[parent].id).empty();
//    		// clear <tr id>
//    		// create contact
//    		// append to $('#create_' + typeMapViaId[typeId].name + '_instance_table_id').append(inputSupportContentList);
//    		
//    		
//    	}else if (valueSelected == 'use'){
//    	
//    		// build the list of nodes 
//    		$("#nodeDisplay_"+parent+"_for_"+typeId).empty();;
//    		ReservationUtils.buildListNodes($("#nodeDisplay_"+parent+"_for_"+typeId), typeId, parent );
//    		
//    		// hide the create  option 
//    		ReservationUtils.hideDivision('createParent_'+parent+'_for_', typeId);
//    		// show the list to select from 
//    		ReservationUtils.showDivision('nodeDisplay_'+parent+'_for_', typeId);	
//    		
//    		// clear <tr id>
//    		// load contact
//    	}
    	line += "</td>";
    	
    	line += "</tr>";
    	
    	tableParentForm += line;
	}


	
	
	tableParentForm += "</table>";
	
	
	
	appendToDiv.append(tableParentForm);			

	
	



	
	
	
//	
//	
//	
//	// build the form
//	var inputContent = '';
//	    inputContent += '<table id="create_' + typeMapViaId[typeId].name + '_instance_table_id" border="2">';
////    if ( tmpType.properties.length > 0 ) {
//   	if(!$.isEmptyObject( tmpType.typeProperties	)){
//		$.each( tmpType.typeProperties, function( propId, tmpProp ) {
//									
//			if(tmpProp.isMandatory){ propcolor='color:red'  } else {propcolor='color:black' };		
//			if( tmpProp.propertyType == "DATE" ) {
//				inputContent += '<tr id="typeProps"><td  style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input type="date"  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" value="" / >(DATE) </td></tr>' ;
//			}else {
//					
//					inputContent += '<tr id="typeProps" ><td  style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" value="" ' ;	
//					if( tmpProp.propertyType == "STRING" ) {
//						inputContent += ' type="text"/ >(TEXT)</td> </tr>' ;
//					} else if( tmpProp.propertyType == "INTEGER" ) {
//						inputContent += 'type="text"/ >(NUMBER) </td></tr>' ;
//					} else if( tmpProp.propertyType == "DOUBLE" ) {
//						inputContent += 'type="text"/ >(DOUBLE) </td></tr>' ;
//					} else if( tmpProp.propertyType == "BOOLEAN" ) {
//						inputContent += 'type="text"/ >(BOOLEAN) </td></tr>' ;
//					} else {
//						inputContent += 'type="text"/ >(UNKNOWN TYPE) </td></tr>' ;		
//					}			
//			}	
//		});
//    }else {    
//    	inputContent += "<tr><td colspan='2'> No Properties defined for this Type </td></tr>"   
//    };
//	
//    inputContent = inputContent + "</table><br />";    
//	appendToDiv.append(inputContent);			
}

NodeUtils.generateCreateDivBlock_generic = function ( divToAppendTo, parent, typeId){
	
	if(!typeId || !parent ){
		console.log(" no Type Id or parent typeId provided: cannot show or hide divisions "); 
		return;
	};
	
	
	var valueSelected = $('input[name="mustConn_'+parent+'_for_'+ typeId+'"]:checked').val();
//	if(!valueSelected){
//		console.log(" No value selected  "+ valueSelected);	
//		return;
//	}
//	 $('input[name="mustConn_'+parent+'_for_'+typeId+'"]').parent('td').css("backgroundColor", "");
	 
	if(valueSelected == 'create' ){
		// Display the Type properties to create a node
		$("#createParent_"+parent+"_for_"+typeId ).empty();
//		ReservationUtils.addFormInstCreate($("#createParent_"+parent+"_for_"+typeId ), parent);
		NodeUtils.addFormInstCreate_generic( divToAppendTo, parent);
		
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
		
		// clear <tr id>
		// load contact
	}
	       					    
}

NodeUtils.addFormInstCreate_generic = function( appendToDiv, tablePrefix, tablePostfix, valuePrefix, typeId ){
	
	if(!typeId ){
		console.log(" no Type Id provided: cannot build create Instance table  "); 
		return;
	}
	
	if( !tablePrefix ) {
		tablePrefx = "create_";
	}
	
	if( !tablePostfix ) {
		tablePostfix = "_instance_table_id";
	}
	
	if( !valuePrefix ) {
		valuePrefix = "form_inst_add_val_";
	}
	
	
	var tmpType = typeMapViaId[typeId];
	// populate the Add INSTANCE FORM with properties	              
	var propcolor = '';			                           // RED color used to highlight Mandatory property
				
	// build the form
	var inputContent = '';
	    inputContent += '<table id="' + tablePrefix + typeMapViaId[typeId].name + tablePostfix + '" border="2">';
//    if ( tmpType.properties.length > 0 ) {
   	if(!$.isEmptyObject( tmpType.typeProperties	)){
		$.each( tmpType.typeProperties, function( propId, tmpProp ) {
									
			if(tmpProp.isMandatory){ propcolor='color:red'  } else {propcolor='color:black' };		
			if( tmpProp.propertyType == "DATE" ) {
				inputContent += '<tr id="typeProps"><td  style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input type="date"  name = "'+tmpProp.name+ '"  id="'+ valuePrefix + tmpProp.id + '" value="" / >(DATE) </td></tr>' ;
			}else {
					
					inputContent += '<tr id="typeProps" ><td  style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input  name = "'+tmpProp.name+ '"  id="' + valuePrefix + tmpProp.id + '" value="" ' ;	
					if( tmpProp.propertyType == "STRING" ) {
						inputContent += ' type="text"/ >(TEXT)</td> </tr>' ;
					} else if( tmpProp.propertyType == "INTEGER" ) {
						inputContent += 'type="text"/ >(NUMBER) </td></tr>' ;
					} else if( tmpProp.propertyType == "DOUBLE" ) {
						inputContent += 'type="text"/ >(DOUBLE) </td></tr>' ;
					} else if( tmpProp.propertyType == "BOOLEAN" ) {
						inputContent += 'type="text"/ >(BOOLEAN) </td></tr>' ;
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
