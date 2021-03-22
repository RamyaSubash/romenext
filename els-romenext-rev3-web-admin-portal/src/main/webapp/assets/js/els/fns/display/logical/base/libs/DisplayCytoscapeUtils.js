function DisplayCytoscapeUtils() {
	
};

DisplayCytoscapeUtils.formatSingleNode = function  (jsonData) {          // old name formatSingleResponse
	var element, name;
    // what to display as a name for the node -- look into the properties for name first or other attr if none display the type in ()
    
	name = NodeUtils.findNameInst(jsonData);
     // display the name if exits or type of node 
     if (name ) { jsonData.cyDisplay = name}
     else {jsonData.cyDisplay ='' + '(' + jsonData.type + ')' ;}
    // associate the same color as the type to the node
	jsonData.color = typeMapViaId[jsonData.typeId].color;
	// getting the coords
	var new_x = GlobalUtils.getCoordinate(jsonData.decoProperties, 'x');
	var new_y = GlobalUtils.getCoordinate(jsonData.decoProperties, 'y');	
	
	// format node for cytoscape
	element = {
		group: 'nodes',
		data: jsonData,
		renderedPosition: {x: new_x, y: new_y}
	};
	
	var uuid = NodeUtils.findUUID(jsonData);  
	// add the node to the nodeMap list ===========
	if (!nodeMap[uuid]) {
		nodeMap[uuid]= jsonData;
	}else {
		nodeMap[uuid]=jsonData;
	}
	console.log("added this element"+element);
	return element;
};

DisplayCytoscapeUtils.formatSingleEdge = function  (jsonData) {
	var element, Props, uuid;
	jsonData.cyDisplay= '';
	// jsonData is an edge == format it for the graph
	element = {
		group: 'edges',
		data:{
			id: 'edge' + jsonData.id,
			source: jsonData.originId.toString(),
			target: jsonData.destinationId.toString(),
			name: jsonData.type,
			origin: jsonData.origin,
			destination: jsonData.destination,
			properties: jsonData.properties,
			decoProperties: jsonData.decoProperties,
			classification: jsonData.classification
		}
	};	
	// add the edge to the edgeMap list
	Props = jsonData.properties;
	Props.forEach(function(prop) {
	     if(prop.name=="uuid"){  uuid = prop.value }
	});  
	if (!edgeMap[uuid]) {
		edgeMap[uuid]= jsonData;
	}
	return element;
};

//===================================================================
DisplayCytoscapeUtils.formatNodesResponse  = function (jsonData) {                 // main assumption is that there is always at least one property == uuid
	var elements = [], element={};
	nodeMap = {}; edgeMap = {}
  // Start the format for Nodes
	$.each(jsonData.nodes, function(key, value2){		
		element = DisplayCytoscapeUtils.formatSingleNode(value2);		
		elements.push(element);		
	});
	
  console.log(elements);
 // start the format for edges 
	$.each(jsonData.edges, function(key, value){			
		var element = DisplayCytoscapeUtils.formatSingleEdge(value);		
		elements.push(element);		
	});
	return elements;
}


//old name formatSingleResponse
DisplayCytoscapeUtils.formatNode = function(node) {
	
	var element;
	// display the name if exits or type of node 
	
	var name = NodeUtils.findNameInst(jsonData);
	if (name) {
		node.cyDisplay = name
	} else {
		node.cyDisplay = '(' + node.type + ')';
	}
	
	// associate the same color as the type to the node
	node.color = typeMapViaId[node.typeId].color;
	
	// getting the coords
	var new_x = GlobalUtils.getCoordinate(node.decoProperties, 'x');
	var new_y = GlobalUtils.getCoordinate(node.decoProperties, 'y');	
	
	// format node for cytoscape
	element = {
		group: 'nodes',
		data: node,
		renderedPosition: {x: new_x, y: new_y}
	};
	
	return element;
	
};

DisplayCytoscapeUtils.formatEdge = function(edge) {
	
	var element;
	
	edge.cyDisplay= '';
	// format edge for the graph
	element = {
		group: 'edges',
		data:{
			id: 'edge' + edge.id,
			source: edge.originId.toString(),
			target: edge.destinationId.toString(),
			name: edge.type,
			origin: edge.origin,
			destination: edge.destination,
			properties: edge.properties,
			decoProperties: edge.decoProperties,
			classification: edge.classification
		}
	};	

	return element;
	
};

//main assumption is that there is always at least one property == uuid
DisplayCytoscapeUtils.formatNodesAndEdges = function() {
	
	var elements = [];
	
	// start the format for nodes
	for (var key in nodeMap) {
		var element = {};
		element = DisplayCytoscapeUtils.formatNode(nodeMap[key]);
		elements.push(element);
	}
	
	// start the format for edges
	for (var key in edgeMap) {
		var element = {};
		element = DisplayCytoscapeUtils.formatEdge(edgeMap[key]);
		elements.push(element);
	}
	
	return elements;

}