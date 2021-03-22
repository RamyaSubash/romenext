/**
 * 
 */
function CytoNodeUtils(){}

CytoNodeUtils.formatNode = function (node){
	var element = null;
	var name = null;
	var type;
	if (  guistate_main == 'DESIGN'){
		name = node.name;
		GlobalUtils.setPreferencesforType(node);
	}else {
		name  = NodeUtils.findNameInst(node);
		node.uuid = node.sysProperties.uuid.value;		
		type = typeMapViaId[node.typeId];
		if (name == null ){ name = type.name }
		GlobalUtils.setPreferencesforType(type);		
	}
	
	node.color = currentColor;
	node.size  = currentSize;
	node.labelPosition = currentLabelPosition;
	node.labelSize  = currentLabelSize;	
	
	node.cyDisplay = name;
	node.label     = name;

	// getting the coords
	var new_x = GlobalDecoUtils.getDecoPropertyValueFromInstance(node, 'x');
	var new_y = GlobalDecoUtils.getDecoPropertyValueFromInstance(node, 'y');    
	if (new_x == null) {
		new_x = 0;	
	}
	if (new_y == null) {
		new_y = 0;	
	}
		
	// format node for cytoscape
	element = {
		group : 'nodes',
		data : node,
		classification: node.classification,
		renderedPosition : {
			x : new_x,
			y : new_y
		}
	};
	return element;				
}

//=================== Function formating Connection for DESIGN ================//
CytoNodeUtils.formatConnection = function ( jsonData ){	
	var element = null;
	var label;
	console.log(jsonData);
	if (jsonData != null) {
		// format connection for the graph
		jsonData.cyDisplay = '';
		if (jsonData.classification == 'link') {
			label = jsonData.ruleName;
		} else {
			label = jsonData.name;
		}
		// verify minRel and maxRel  if they have values
		var minRel = null;
		var maxRel = null;
		if (jsonData.minRel != null) {
			minRel = jsonData.minRel
		}
		if (jsonData.maxRel != null) {
			maxRel = jsonData.maxRel
		}

		element = {
			group : 'edges',
			data : {
				id : 'connection' + jsonData.id,
				connId : jsonData.id,
				name : label,
				rule : jsonData.ruleName,
				origin : jsonData.origin,
				destination : jsonData.destination,
				source : jsonData.originId.toString(),
				target : jsonData.destinationId.toString(),
				classification : jsonData.classification,
				minRel : minRel,
				maxRel : maxRel,
				ruleId : jsonData.ruleId,
				cyDisplay : ''
			}
		}
		console.log("Got Connection");
		var connBase = GlobalUtils.createInternalConnMap(jsonData);
		if (connBase == null) {
			element = null;
		}
	}
	return element;			
	
}
//=================Function formatting edge for DISPLAY ================//
CytoNodeUtils.formatEdge = function ( edge ){
	// find origin name & destination Name
		var originName       = NodeUtils.findNameInst(edge.originNode);
		var destinationName = NodeUtils.findNameInst(edge.destinationNode);

		edge.cyDisplay= '';
		edge.label    = '';
		edge.uuid = edge.sysProperties.uuid.value;
		
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
				name: edgeName,
				label : edgeName,
				connectionId : edge.connectionId.toString(),
				origin: originName,
				destination: destinationName,
				classification: edge.classification,
				sysProperties : edge.sysProperties
			}
		};	

		return element;		
}


CytoNodeUtils.addNode = function (){
	
	
}
CytoNodeUtils.addEdge = function (){}

CytoNodeUtils.removeNode = function ( typeId ){
	if (  guistate_main == 'DESIGN'){
		// remove tooltip for the type
		$("[data-id=type" + typeId + "]").parent().parent().parent().remove();
		// remove element from graph using its id
		tdvCy.$("#" + typeId).remove();
	}
	
}
CytoNodeUtils.removeEdge = function (){}