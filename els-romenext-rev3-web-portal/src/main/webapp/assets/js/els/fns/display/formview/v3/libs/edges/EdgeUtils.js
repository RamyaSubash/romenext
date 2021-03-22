function EdgeUtils() {
	
};

 EdgeUtils.loadNodes = function() {
	
	var jsonData = {};
	if (listTypeIds.length != 0 ){jsonData.typeIds = listTypeIds;}
	if (listConnIds.length != 0 ){jsonData.connIds = listConnIds;}
	console.log(jsonData);
	
	var successFunction = function( data ) {
		EdgeUtils.buildNodeAndEdgeVars(data);
	}
	
	var failFunction = function( xhr, status, error ) {
		$("#console-log").append("Not able to load Type Nodes Error: " + xhr.status);
  	    console.log("Error: " + xhr.responseText); 
	}
	
	var apis = new apiRomeNext();	
	apis.loadAllNodes( jsonData, successFunction, failFunction );
	
};

 EdgeUtils.loadAllNodesAndEdges = function() {
	
	var successFunction = function( data ) {
		EdgeUtils.buildNodeAndEdgeVars(data);
	};
	
	var failFunction = function( xhr, status, error ) {
		console.log("Error: " + xhr.status);
		$('#console-log').append("Error: Not able to load Nodes " + xhr.status);
	};
		
	var apis = new apiRomeNext();	
	apis.initInstanceGraph( successFunction, failFunction );
	
};

 EdgeUtils.buildNodeAndEdgeVars = function(jsonData) {
	
	nodeMap = {}; 
	edgeMap = {};
	
	$.each(jsonData.nodes, function(key, value){
		
		var uuid = EdgeUtils.findUUID( value );	
		
		if (uuid != null) {
			if (!nodeMap[uuid]) {
				nodeMap[uuid]= value;
			}
		}
	});
	
	$.each(jsonData.edges, function(key, value){
		
		var uuid = EdgeUtils.findUUID( value );	
		
		if (uuid != null) {
			if (!edgeMap[uuid]) {
				edgeMap[uuid]= value;
			}
		}
		
	});
	
};
/*
 * Function to Add Node  to the nodeMap 
 * 
 * data provided is a json for a node with all details  (id, type, typeId, properties [], decoproperties [])
 */
 EdgeUtils.AddNodeToMap = function (data) {
	 if(!$.isEmptyObject(data) ){
		var uuid = EdgeUtils.findUUID( data );	
		
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

 EdgeUtils.AddEdgeToMap = function (data) {
	 if(!$.isEmptyObject(data) ){
			var uuid = EdgeUtils.findUUID( data );	 
			
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

 EdgeUtils.findUUID = function( data ){
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
 
 EdgeUtils.findRestriction = function( data ){
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
 EdgeUtils.findIdNamePropertyFromType = function ( typeId ){
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
 

 EdgeUtils.findNameInst = function ( data){
	 if(!$.isEmptyObject(data) ){ 
	    var name = null;
	    if (!$.isEmptyObject(data.typeProperties)){
//			data.properties.forEach(function(prop) {
	    	var propId = EdgeUtils.findIdNamePropertyFromType(data.typeId);
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
 EdgeUtils.buildNodeDetails = function ( nodeUuid,  data){
	 if(!nodeUuid ){
		 console.log("missing Uuid for the node to build its Parents - Children -- Sibling");
		 return;
	 }
//	 if($.isEmptyObject(data.nodes) ){                            // 
//		 console.log(" no node details provided ");
//		 return;
//	 }
//	 $.each(data.nodes, function(key, value){		       // add nodes to nodeMap
//		EdgeUtils.AddNodeToMap(value); 
//	 });
	 
	 if($.isEmptyObject(data.edges) ){                     // no parent -- no children -- no sibling                                                 
		 console.log(" no edge details provided ");
		 return;
	 }
	 
	 $.each(data.edges, function(key, value){	
		 	// add Edge to edgemap	 
			var edgeUuid = EdgeUtils.findUUID( value );
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
			
			var originNodeUuid = EdgeUtils.findUUID( value.originNode);
			var destinationNodeUuid = EdgeUtils.findUUID( value.destinationNode );
			
			if(!originNodeUuid || !destinationNodeUuid ){
				console.log(" This edge does not have approriate origin and destination nodes info "+ edgeUuid);
			}else {
				if(value.classification == 'parentchild') {
					 if ( originNodeUuid == nodeUuid ) {  // destination is the node to save 
						                                  EdgeUtils.AddNodeToMap(value.destinationNode);   
						                                  EdgeUtils.buildChildNodeDetail( nodeUuid, value);
					 }else if( destinationNodeUuid == nodeUuid ){	   // origin node to save 
						                                  EdgeUtils.AddNodeToMap(value.originNode); 
						                                  EdgeUtils.buildParentNodeDetail( nodeUuid, value);
					 }else {
						 // error     Remove edge from list   
					 }
					 
				 }else if ( value.classification == 'link'){ 
					            if ( originNodeUuid == nodeUuid ) {
					            	                EdgeUtils.AddNodeToMap(value.destinationNode); 
						                            EdgeUtils.buildSiblingNodeDetail ( nodeUuid, value, 'destination');
								 }else if( destinationNodeUuid == nodeUuid ){
													 EdgeUtils.AddNodeToMap(value.originNode); 
													 EdgeUtils.buildSiblingNodeDetail ( nodeUuid, value, 'origin');
								 }
				 }				
			} 
		});
	 
 }
 
 EdgeUtils.buildChildNodeDetail = function ( nodeUuid, edgevalue){
	 if(!nodeUuid || $.isEmptyObject(edgevalue)){
		 console.log(" missing node uuid or edge value to build Info Child ");
		 return;
	 }
	  
	 var child ={}, val;
	 
	 var newuuid  = EdgeUtils.findUUID (edgevalue.destinationNode);
	 var instName = EdgeUtils.findNameInst(edgevalue.destinationNode);
	 
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
 
 EdgeUtils.buildParentNodeDetail = function ( nodeUuid, edgevalue){
	 if(!nodeUuid || $.isEmptyObject(edgevalue)){
		 console.log(" missing node uuid or edge value to build Info parent ");
		 return;
	 }
	 
	 var parent ={}, val;
	 var newuuid  = EdgeUtils.findUUID (edgevalue.originNode);
	 var instName = EdgeUtils.findNameInst(edgevalue.originNode);
	 
	
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

 EdgeUtils.buildSiblingNodeDetail = function ( nodeUuid, edgevalue, from){
	 if(!nodeUuid || $.isEmptyObject(edgevalue)){
		 console.log(" missing node uuid or edge value to build Info Sibling ");
		 return;
	 }
	 
	
	var sibling = {}, val;
	var newuuid  = EdgeUtils.findUUID (edgevalue[from+'Node']);
	var instName = EdgeUtils.findNameInst(edgevalue[from+'Node']);
	
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
 

 EdgeUtils.findPropInType = function (propId, type){  
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



EdgeUtils.globalCreateNode = function( data ) {
	
	// we expect the data to be in json format that is equiv to the api call
	
	var createFunctions = globalNode_fns["create"];
	
	$.each(createFunctions, function(key, value) {	
		value.createNode( data );
	});
	
};


EdgeUtils.globalNode_addFn = function( type, subtype, fns ) {
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
EdgeUtils.retrieveModelProperties   =  function (shapes) {
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
EdgeUtils.isSubParent = function (typeId, nodeUuid) {
	for (var key in nodeMap[nodeUuid].parents) {
		var tmpConns = GlobalConnUtils.findConnsBySourceAndTarget(nodeMap[nodeUuid].parents[key].typeId, typeId);
		if (tmpConns) {
			return nodeMap[nodeUuid].parents[key];
		}
	}
	
	return null;
}

//to find if a node is a child of another node
EdgeUtils.isChild = function (parentNode, childNodeUuid) {
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
EdgeUtils.createEdgeJson = function(originType, originUuid, destinationType,destinationUuid, connection){
	
	var jsonData = {};	
	 jsonData["originType"]         =  originType.toString() ;
	 jsonData["originNodeUuid"]     =  originUuid;
	 jsonData["destinationType"]    =  destinationType.toString(); 
	 jsonData["destinationNodeUuid"]=  destinationUuid ;	
	 jsonData["connection"]         =  connection.toString();
	 return jsonData;
	
}
EdgeUtils.createSysJson = function(nodeUuid){
	
	var property = {};
	property['propertyType'] = 'STRING';
	property['value']        = nodeUuid;	
	property['propertyName'] = 'uuid';
	return property;

}
EdgeUtils.buildPropertyJson = function( tmpProp , valueProp   ){

	var nodeProperty = {};
	nodeProperty.propertyId    = tmpProp.id;
	nodeProperty.propertyName  = tmpProp.name;
	nodeProperty.propertyType  = tmpProp.propertyType;
	nodeProperty.value         = valueProp; 
	return nodeProperty;
}

EdgeUtils.retrieveNodePropertiesFromForm = function( typeId, formElementId )	{
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
					nodeproperty = EdgeUtils.buildPropertyJson( tmpProp, valueProp );
					properties.push(nodeproperty);
				}
			}else if (valueProp){
				 nodeproperty = EdgeUtils.buildPropertyJson( tmpProp, valueProp );                            
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

EdgeUtils.addFormInstCreate = function( appendToDiv, typeId ){
	
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



EdgeUtils.findTypeID = function(typeName){
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

EdgeUtils.getRangeDates = function (startDate, endDate ){

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

