function DisplayCytoscapeUtils() {
	
};

DisplayCytoscapeUtils.formatSingleNode = function  (jsonData) {          // old name formatSingleResponse

	var element = DisplayCytoscapeUtils.formatNode(jsonData);
	
	var uuid = NodeUtils.findUUID(jsonData);
  
	// add the node to the nodeMap list ===========
	
	nodeMap[uuid]= element.data;
		
    console.log("added this element"+element.data.name);
    return element;
};

DisplayCytoscapeUtils.formatSingleEdge = function  (jsonData) {
	

	jsonData.cyDisplay= '';
	
//	// add the edge to the edgeMap list
	var element = DisplayCytoscapeUtils.formatEdge(jsonData);
	
	var uuid = NodeUtils.findUUID(jsonData);
	 
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
	
	// Find name to display for node
	var name  = NodeUtils.findNameInst(node);	
	    node.cyDisplay = name;
	// associate the same color as the type to the node
	    node.color = typeMapViaId[node.typeId].color;
	
	// getting the coords
	var new_x = GlobalUtils.getCoordinate(node.decoProperties, 'x', node.typeId);
	var new_y = GlobalUtils.getCoordinate(node.decoProperties, 'y', node.typeId);	
	
	var type = typeMapViaId[node.typeId];
	
	// format node for cytoscape
	var element = {
		group: 'nodes',
		data: node,
		classification: type.classification,
		renderedPosition: {x: new_x, y: new_y}
	};
	
	return element;	
};

DisplayCytoscapeUtils.formatEdge = function(edge) {
	// find origin name & destination Name
	var originName       = NodeUtils.findNameInst(edge.originNode);
//	console.log("Origin Name is : "+ originName + " id = "+ edge.originNode.id);
	var destinationName = NodeUtils.findNameInst(edge.destinationNode);
//	console.log("Destination  Name is : "+ destinationName + " Id =  "+edge.destinationNode.id );	
	edge.cyDisplay= '';
	
	var edgeName = EdgeUtils.findNamePropertyValue(edge);
	if (!edgeName) {
		edgeName = connMapViaId[edge.connectionId].name;
	}
	
	// format edge for the graph
	var edgeUuid = NodeUtils.findUUID( edge );
	var element  = {
		group: 'edges',
		data:{
			id: 'edge' + edge.id,
			source: edge.originNode.id.toString(),	
			target: edge.destinationNode.id.toString(),
//			name: edge.type,
//			name: connMapViaId[edge.connectionId].name,
			name: edgeName,
			connectionId : edge.connectionId.toString(),
			origin: originName,
			destination: destinationName,
			classification: edge.classification,
			sysProperties : edge.sysProperties
		}
	};	

	return element;
	
};



//main assumption is that there is always at least one property == uuid
// This is used when loading all nodes and edges
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

DisplayCytoscapeUtils.formatUpdateNodesResponse =  function (jsonData) {                 // main assumption is that there is always at least one property == uuid
	var elements = []; 
	// nodeMap = {}; edgeMap = {}
    // Start the format for Nodes
	$.each(jsonData.nodes, function(key, value2){
		 
		var uuid, name ;
		// Retrieve the uuid value 
		uuid = NodeUtils.findUUID( value2 );	
		if (!nodeMap[uuid]) {
			
			var element = {};
			element = DisplayCytoscapeUtils.formatNode(value2);
			
			nodeMap[uuid]= element.data;
			elements.push(element);
		
//			nodeMap[uuid]= value2;
		}
		
	});
    console.log(elements);
   // start the format for edges 
	$.each(jsonData.edges, function(key, value){
		var uuid = NodeUtils.findUUID( value );
		value.cyDisplay = '';
		if(!edgeMap[uuid]){
			
			var element = {};
			element = DisplayCytoscapeUtils.formatEdge(value);	
					
					// section adding the edge to the edgeMap list
			edgeMap[uuid]= value;	
			elements.push(element);
		}
	});
	return elements;
}


DisplayCytoscapeUtils.updateInstanceGraph  = function (cy, element) {                // could be called after adding a Node or Edge 

	var newElement;
	// found out where we are (should be in Instance view)
	
	if (cy.$('#' + element.data.id + '').length == 0) {
		if (cy) {
//			 newElement = cy.add(element, true);
			 if (element.group == 'nodes')    { 
				 newElement = cy.add(element, true);
				 attachNodeClickActions(newElement.filter('node')); 
			 }
			 else if(element.group == 'edges'){
				 if (cy.nodes("[id='" + element.data.source + "']").length != 0 && cy.nodes("[id='" + element.data.target + "']").length != 0) {
					 newElement = cy.add(element, true);
					 attachEdgeClickActions(newElement.filter('edge')); 
				 }
			 };
		} else {
			var nodes = [];
			nodes.push(element);
			setTimeout(function() {irvCy =  initNodeEdgeGraph(irvCy, "irvCy",  nodes); irvCy.pan({x:230, y:100});
			}, 100);
		}
		
	} else {
		// This only work for updating existing nodes, not work for edges yet
		// not sure should change the id or not
		if (element.group == 'nodes') {
			cy.$('#' + element.data.id + '').data("color", element.data.color);
			cy.$('#' + element.data.id + '').data("cyDisplay", element.data.cyDisplay);
			cy.$('#' + element.data.id + '').data("decoProperties", element.data.decoProperties);
			cy.$('#' + element.data.id + '').data("properties", element.data.properties);
			cy.$('#' + element.data.id + '').data("type", element.data.type);
		} else if (element.group == 'edges') {
			cy.$('#' + element.data.id + '').data("name", element.data.name);
		}
//		cy.$('#' + element.data.id + '').data("color", element.data.color);
//		cy.$('#' + element.data.id + '').data("cyDisplay", element.data.cyDisplay);
//		cy.$('#' + element.data.id + '').data("decoProperties", element.data.decoProperties);
//		cy.$('#' + element.data.id + '').data("properties", element.data.properties);
//		cy.$('#' + element.data.id + '').data("type", element.data.type);
	}


};


DisplayCytoscapeUtils.updateInstanceGraphBatch = function (cy, elements) {                // could be called after adding a Node or Edge 

	var i;
	for (i = 0; i < elements.length; i++) {
		if (cy.$('#' + elements[i].data.id + '').length == 0) { // if element is not already in the graph 
			var newElement;
			// This works for updating both new nodes and edges
//			newElement = cy.add(elements[i], true);
			 if (elements[i].group == 'nodes') { 
				 newElement = cy.add(elements[i], true);
				 attachNodeClickActions(newElement.filter('node')); 
			 }
			 else if(elements[i].group == 'edges'){ 
				 if (cy.nodes("[id='" + elements[i].data.source + "']").length != 0 && cy.nodes("[id='" + elements[i].data.target + "']").length != 0) {
					 newElement = cy.add(elements[i], true);
					 attachEdgeClickActions(newElement.filter('edge')); 
				 }
			 };
		
		} else {
			// This should work for updating existing nodes and edges
			console.log("Do nothing for now.");
		}		
	}

};

DisplayCytoscapeUtils.toggleElementName = function (cy, iconId, eleType, state) {
	
	if (state == 'show') {
		changeElementName(cy, eleType, 'data(name)')
		state = 'hide';
		document.getElementById(iconId).value = 'hide';
	} else if (state == 'hide') {
		changeElementName(cy, eleType, '')
		state = 'show';
		document.getElementById(iconId).value = 'show';
	} else {
		console.log('Wrong State: ' + state);
	}

};

DisplayCytoscapeUtils.clickANode = function (uuid) {
	
	var node = irvCy.filter(function(i, element){
		if (element.isNode()) {
			if (element.data().sysProperties.uuid.value == uuid) {
				return element;
			}
		}
	});
	
	node.trigger('click');

};

DisplayCytoscapeUtils.clickAEdge = function (uuid) {
	
	var edge = irvCy.filter(function(i, element){
		if (element.isEdge()) {
			if (element.data().sysProperties.uuid.value == uuid) {
				return element;
			}
		}
	});
	
	edge.trigger('click');

};

DisplayCytoscapeUtils.hightlightAndUnhighlight = function (elements1, elements2) {
    elements1.addClass('highlight');
    elements1.addClass('semitransp');
};

DisplayCytoscapeUtils.removeHighlightAndUnhighlight = function () {
	irvCy.elements().removeClass('semitransp');
	irvCy.elements().removeClass('highlight');
};
