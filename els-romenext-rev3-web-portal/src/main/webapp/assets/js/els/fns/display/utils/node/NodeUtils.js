function NodeUtils() {
	
};

 NodeUtils.loadNodes = function() {
	
	var jsonData = {};
	if (listTypeIds.length != 0 ){
		jsonData.typeIds = listTypeIds;
	} else {
		jsonData.typeIds = [];
	}
	if (listConnIds.length != 0 ){
		jsonData.connIds = listConnIds;
	} else {
		jsonData.connIds = [];
	}

	jsonData["namespace"] = loggedInUserName;
	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name;
	
	console.log(jsonData);
	
	var successFunction = function( data ) {
		NodeUtils.buildNodeAndEdgeVars(data);
	}
	
	var failFunction = function( xhr, status, error ) {
		$("#console-log").append("Not able to load Type Nodes Error: " + xhr.status);
  	    console.log("Error: " + xhr.responseText); 
	}
	
	var apis = new NodeApis();	
	apis.getAllNodesAndEdges( jsonData, successFunction, failFunction );
	
//	var apis = new apiRomeNext();	
//	apis.loadAllNodes( jsonData, successFunction, failFunction );
	
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
	console.log("Inside buildNodeAndEdgeVars");
	$.each(jsonData.nodes, function(key, value){
		
		console.log(key);
		console.log(value);
		
		var uuid = NodeUtils.findUUID( value );	
		var name  = NodeUtils.findNameInst(value);
		if (!name) {
			name = typeMapViaId[value.typeId].name;
		}
		
	    var color = typeMapViaId[value.typeId].color;
		
		if (uuid != null) {
			if (!nodeMap[uuid]) {
				nodeMap[uuid]= value;
				nodeMap[uuid]["cyDisplay"] = name;
				nodeMap[uuid]["color"] = color;
			}
		}
	});
	
	$.each(jsonData.edges, function(key, value){
		
		var uuid = NodeUtils.findUUID( value );	
		var originNodeUuid = NodeUtils.findUUID( value.originNode );
		var destinationNodeUuid = NodeUtils.findUUID( value.destinationNode );
		
		var edgeName = EdgeUtils.findNamePropertyValue(value);
		if (!edgeName) {
			edgeName = connMapViaId[value.connectionId].name;
		}
		
		if (uuid != null) {
			if (!edgeMap[uuid]) {
				edgeMap[uuid]= value;
				edgeMap[uuid]["name"] = edgeName;
				if (originNodeUuid != null) {
					if (!nodeMap[originNodeUuid]) {
						nodeMap[originNodeUuid]= value.originNode;
					}
				}
				
				if (destinationNodeUuid != null) {
					if (!nodeMap[destinationNodeUuid]) {
						nodeMap[destinationNodeUuid]= value.destinationNode;
					}
				}
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
			 $.each(data.sysProperties, function (key, value) {
				 console.log("Checking data.sysProperties.name")
				 console.log(value.name);
				 console.log(value.value);
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
 /*
  * Retrieve the value of "retrisctionStatus" from the sysProperties
  * 
  */
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
  * Function to find the Id of the NAME property  from the TYPE  Properties[{name, propertyType, value}] 
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
 
 NodeUtils.findIdPropertyFromType = function ( typeId, propertyName ){
	 var namePropertyId = null;
	 if(typeId){
		 var props = typeMapViaId[typeId].typeProperties;
		 $.each(props, function( propId, tmpProp ) {
			 if(tmpProp.name == propertyName) { namePropertyId = propId}
		 })
		 return namePropertyId;
	 }else {
		 console.error("Missing type Id ! Cannot find Name property ");
		 return null;
	 }
 }
 
 /**
  * @memberOf NodeUtils.findPropertyFromType
  */
 NodeUtils.findIdPropertyFromType = function ( typeId, propertyId ){
	 var property = {};
	 if(typeId){
		 var props = typeMapViaId[typeId].typeProperties;
		 $.each(props, function( propId, tmpProp ) {
			 if(tmpProp.id == propertyId) { property = tmpProp}
		 })
		 return property;
	 }else {
		 console.error("Missing type Id ! Cannot find  property ");
		 return null;
	 }
 }
 
 
 /*
  * Function to find NAME  of the node from the its properties [{name, propertyType, value}] 
  * 
  */

 NodeUtils.findNameInst = function (data){
	 if(!$.isEmptyObject(data) ){ 
	    var name = '('+data.name +')';
	    if (!$.isEmptyObject(data.typeProperties)){
	    	var propId = NodeUtils.findIdNamePropertyFromType(data.typeId);
			 $.each( data.typeProperties, function( key, value ) {		
				if( value.id == propId){
					name = value.value 
				}
			}); 
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
     // Retrieving the nodes from the edges 
	 
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
					 }else if( destinationNodeUuid == nodeUuid ){	   // origin is the node to save 
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
	listErrorsFromRetrieval  = [];
	if(!$.isEmptyObject(typeProperties) ){
		
		$.each( typeProperties, function(propId, tmpProp){
//			Retrieve the value of property -- prepare the json
//			var valueProp = $('#'+formElementId +tmpProp.id ).val();
			var valueProp = null;
			if (tmpProp.propertyType == "FILE") {
				
				if(tmpProp.isMandatory){	
					if ((document.getElementById('image_file_output_'+tmpProp.id).style.display === "none") && (document.getElementById('other_file_output_'+tmpProp.id).style.display === "none")) {		
//						document.getElementById(formElementId + tmpProp.id ).style.backgroundColor = "yellow"; 
						listErrorsFromRetrieval.push( formElementId + tmpProp.id );
						error = true;
						return;
					} else {
						valueProp = {}
						valueProp.filename = document.getElementById(formElementId + tmpProp.id).files[0].name;
						var fileType = document.getElementById(formElementId + tmpProp.id).files[0].type;
						if (fileType.includes("image/")) {
							valueProp.file = document.getElementById('image_file_output_'+tmpProp.id).src.replace("data:" + fileType + ";base64,", "");
						} else {
							valueProp.file = document.getElementById('other_file_output_'+tmpProp.id).href.replace("data:" + fileType + ";base64,", "");
						}
					}
				}
				
			} else {
				valueProp = $('#'+formElementId +tmpProp.id ).val();
			}
			
			if(tmpProp.isMandatory){
				if(!valueProp){
//					document.getElementById(formElementId + tmpProp.id ).style.backgroundColor = "yellow"; 
					listErrorsFromRetrieval.push( formElementId + tmpProp.id );
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

   	if(!$.isEmptyObject( tmpType.typeProperties	)){
		$.each( tmpType.typeProperties, function( propId, tmpProp ) {
									
			if(tmpProp.isMandatory){ propcolor='color:red'  } else {propcolor='color:black' };		
			if( tmpProp.propertyType == "DATE" ) {
				inputContent += '<tr id="typeProps"><td  style='+propcolor+' class="input-group input-append date " >'+ tmpProp.name + ':</td><td>' + '<input type="date"  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" value="' + today + '" / >(DATE) </td></tr>' ;
			}else if( tmpProp.propertyType == "BOOLEAN" ) {
				inputContent += '<tr id="typeProps"><td  style='+propcolor+' class="input-group input-append date " >'+ tmpProp.name + ':</td>';
				inputContent += '<td><input type="radio" name="'+tmpProp.name+ '" id="form_inst_add_val_' + tmpProp.id + '"  value ="true"/>True'
				inputContent += ' <input type="radio"    name="'+tmpProp.name+ '" id="form_inst_add_val_' + tmpProp.id + '"  value="false"/>False</td></tr>' ;
			
			}else {
					
					inputContent += '<tr id="typeProps" ><td  style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" value="" ' ;	
					if( tmpProp.propertyType == "STRING" ) {
						inputContent += ' type="text"/ >(TEXT)</td> </tr>' ;
					} else if( tmpProp.propertyType == "INTEGER" ) {
						inputContent += 'type="text"/ >(NUMBER) </td></tr>' ;
					} else if( tmpProp.propertyType == "DOUBLE" ) {
						inputContent += 'type="text"/ >(DOUBLE) </td></tr>' ;
					} else if( tmpProp.propertyType == "FILE" ) {
						inputContent += 'type="file" onchange="GlobalUtils.showFile(event, \'form_inst_add_val_' + tmpProp.id + '\', \'file_output_' + tmpProp.id + '\')"/ >(FILE) </td></tr>' ;
					} else if( tmpProp.propertyType == "CURRENCY" ) {
						inputContent += 'type="text"/ >(CURRENCY) </td></tr>' ;
					} else {
						inputContent += 'type="text"/ >(UNKNOWN TYPE) </td></tr>' ;		
					}			
			}	
		});
    }else {    
    	inputContent += "<tr><td colspan='2'> No Properties defined for this Type </td></tr>" ;  
    };
	
    inputContent = inputContent + "</table><br />";    
	appendToDiv.append(inputContent);			
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
// new changes   04-07-2017
NodeUtils.findConnection = function ( startType, endType ){
	
	if(!startType || !endType  ){
		console.error(" No Types  passed "+startType +"  " + endType +"; Process Aborted; "); 
		 return null;
	}
	var foundConnection = [];
	$.each( connMapViaId , function( key, value ) {  	           	  
            if( startType ==  value.source.toString()   &&  endType ==  value.target.toString() ) { 
            	foundConnection.push( value)
           		  
            }               
    });  
	
	if( !foundConnection ){
		console.error(" Did not found connections ; Process Aborted; "); 
		return null;
	}
	
	return foundConnection;
		
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


//NodeUtils.searchNodesByProperties = function ( typeId, currType ){

NodeUtils.searchNodesByProperties = function (outterWorkspaceId, innerWorkspaceId, typeId ){

	
	var jsonData = {};
	jsonData['typeId'] = typeId;
	
	var typeProperties = [];
	var tmpType = typeMapViaId[typeId]; 
	$.each( tmpType.typeProperties, function( propId, tmpProp ) {
		
		var typePropertyElement = document.getElementById('form_inst_search_prop_val_' + tmpProp.id);
		var nodesTypePropertySearchType = document.getElementById('nodes_search_type_selection_for_' + tmpProp.id);
		if (typePropertyElement && typePropertyElement.value) {
			var typeProperty = {};
			typeProperty['propertyId'] = tmpProp.id;
			typeProperty['propertyName'] = tmpProp.name;
			typeProperty['propertyType'] = tmpProp.propertyType;
			typeProperty['value'] = typePropertyElement.value;
			typeProperty['searchType'] = nodesTypePropertySearchType.value;
			typeProperties.push(typeProperty);
		}
	
	});
	jsonData["properties"] = typeProperties;

	var doneFunction = function( data ) {
		
		$('#console-log').append("<p style='color:blue'Node search successfully.</p>");
		
		var nodes = data.nodes
		if (nodes.length == 0) {
			var nodeSearchNoResultsFoundMessage = document.getElementById('node_search_no_results_found_messages_id');
			if (!nodeSearchNoResultsFoundMessage) {
				$("#" + innerWorkspaceId).append('<br><font id="node_search_no_results_found_messages_id" color="red">No Results Found</font>');
			}
		} else {
			var formattedNodes = [];
			for (var key in nodes) {
				nodes[key].color = typeMapViaId[nodes[key].typeId].color;			
				NodeUtils.AddNodeToMap(nodes[key]);   
				GlobalUtils.addNBTypeInstances(nodes[key]);
				var uuid = NodeUtils.findUUID(nodes[key]);
				formattedNodes.push(nodeMap[uuid]);
			}
			
			$("#" + innerWorkspaceId).empty();
//			$("#nodeDisplay_"+typeId+"_for_"+currType).empty();
			var title = 'Select ' + typeMapViaId[typeId].name;
			DisplayInterfaceUtils.generateNodeList($("#" + innerWorkspaceId), title, typeId, formattedNodes);
//			DisplayInterfaceUtils.generateNodeList($("#nodeDisplay_"+typeId+"_for_"+currType), title, typeId, formattedNodes);
			$("#" + innerWorkspaceId).append('<input type="button" name="submit" class="btn btn-primary btn-xs"  id="returnToSearch_' + typeId + '"  value="Return" onclick="DisplayInterfaceUtils.generateNodesSearchFormById(\'' + outterWorkspaceId + '\', ' + typeId + ');"/>');
//			$("#nodeDisplay_"+typeId+"_for_"+currType).append("<input type='button' name='submit' class='btn btn-primary btn-xs' value='Back To Search' onclick='NodeFctsUtils.showCreateDiv(" + typeId + ", " + currType + ");'/>");
		}

		
	};
		
	var failFunction = function( xhr, status, error ) {
		console.log('Node Search Failed: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Node Search Failed: " + xhr.status+"</p>");	
	};
	
	var api  = new NodeApis();
	api.searchNode( jsonData,  doneFunction, failFunction );
	
};



/**
 * IMAGE UTIL METHODS
 */

NodeUtils.convertNodeFilePropertyValueToDataUrl = function (nodeFilePropertyValue){

	var fileName = nodeFilePropertyValue.filename;
	var fileType = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
	var mediaType = MIMEExtensionMap[fileType];
	
	return "data:" + mediaType + ";base64," + nodeFilePropertyValue.file;
	
};

NodeUtils.convertNodeFilePropertyValueToDataUrl2 = function (nodeFilePropertyValue){

	var fileName = nodeFilePropertyValue.filename;
	var fileType = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
	var mediaType = MIMEExtensionMap[fileType];
	
//	var fileU8 = new Uint8Array(nodeFilePropertyValue.file);
//	var decoder = new TextDecoder("utf8");
//	var fileBase64String = btoa(decoder.decode(fileU8));
	
//	var fileBase64String = btoa(String.fromCharCode.apply(null, new Uint8Array(nodeFilePropertyValue.file)));
	
	var fileBytes = new Uint8Array(nodeFilePropertyValue.file);
	var len = fileBytes.byteLength;
	var binary = "";
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(fileBytes[i]);
	}
	var fileBase64String = window.btoa(binary);
	
	return "data:" + mediaType + ";base64," + fileBase64String;
	
};

NodeUtils.convertNodeFilePropertyValueMediaType = function (nodeFilePropertyValue){
	
	if( nodeFilePropertyValue == null) {
		return null;
	}

	var fileName = nodeFilePropertyValue.filename;
	return MIMEExtensionMap[fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length)];
	
};

NodeUtils.retrieveNodePropsFromTabForm = function( typeId, formElementId , props)	{
	if(!typeId){
		console.log(" no type given: cannot create Instance with Parent NODE  "); 
		return;
	}
	
	var error         = false;
	var properties    = [];
	var nodeproperty  = {};
	listErrorsFromRetrieval  = [];
	if(!$.isEmptyObject(props) ){
		
//		props.forEach(function( tmpProp ){
			$.each( props, function(propId, tmpProp){	
//			Retrieve the value of property -- prepare the json
//			var valueProp = $('#'+formElementId +tmpProp.id ).val();
			var valueProp = null;
			if (tmpProp.propertyType == "FILE") {
				
				if(tmpProp.isMandatory){	
					if ((document.getElementById('image_file_output_'+tmpProp.id).style.display === "none") && (document.getElementById('other_file_output_'+tmpProp.id).style.display === "none")) {		
						listErrorsFromRetrieval.push( formElementId + tmpProp.id );
						error = true;
						return;
					} else {
						valueProp = {}
						valueProp.filename = document.getElementById(formElementId + tmpProp.id).files[0].name;
						var fileType = document.getElementById(formElementId + tmpProp.id).files[0].type;
						if (fileType.includes("image/")) {
							valueProp.file = document.getElementById('image_file_output_'+tmpProp.id).src.replace("data:" + fileType + ";base64,", "");
						} else {
							valueProp.file = document.getElementById('other_file_output_'+tmpProp.id).href.replace("data:" + fileType + ";base64,", "");
						}
					}
				}
				
			} else {
				valueProp = $('#'+formElementId +tmpProp.id ).val();
			}
			if(tmpProp.isMandatory){
				if(!valueProp){
//					document.getElementById(formElementId + tmpProp.id ).style.backgroundColor = "yellow"; 
					listErrorsFromRetrieval.push( formElementId + tmpProp.id );
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
    	console.log("no properties were found for this type ????");
    }

	properties.push(error);
	return properties;
}


NodeUtils.SaveNodeCreated = function ( nodeTypeId, properties ){
		
	var jsonData = {};
	jsonData[ "typeId" ] = nodeTypeId.toString();
	jsonData[ "defaultDecorator" ] = "1";
	jsonData[ "properties" ]       = properties;

		
	var doneFunction = function( dataNode ) {
		if(!$.isEmptyObject(dataNode)){
			$('#console-log').append("<p style='color:blue'>Node created successfully.</p>");
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
	api.saveNode( jsonData,  doneFunction, failFunction );
			
}
