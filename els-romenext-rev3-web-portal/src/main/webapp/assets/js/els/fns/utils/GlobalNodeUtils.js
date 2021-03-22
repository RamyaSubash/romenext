function GlobalNodeUtils() {
	
};

GlobalNodeUtils.getAllChildrenNodesUnderType = function (nodeUuid, typeId) {
	
	var jsonData    = {}; 
	var properties  = []; 
	var typeIds     = [];
	var entryNode   = {};
	var typeIdsRel  = [];
	
    var nodeProperty = NodeUtils.createSysJson(nodeUuid);
    
    if (nodeMap[nodeUuid]) {
    	typeIds.push(Number(nodeMap[nodeUuid].typeId));
    } else {
    	var node = null
		$.each(drillHistoryList, function(key, value) {
			if (value.sysProperties.uuid.value == nodeUuid) {
				node = value;
			}
		});
    	typeIds.push(Number(node.typeId));
    }
//	typeIds.push(Number(nodeMap[nodeUuid].typeId));
	
	properties.push(nodeProperty);			
	entryNode["typeIds"]    = typeIds;		
	entryNode["systemProperties"] = properties;		
	jsonData["entryNode"] =  entryNode;
	
	typeIdsRel.push(Number(typeId));
	jsonData["typeIds"]   = typeIdsRel;
	jsonData['searchDirection'] = 'CHILDREN';
	jsonData['min'] = 1;
	jsonData['max'] = 1;
	
	var results = {};
	
	var successFunction = function( data ) {
		
		nodeMapInst = {};
		if($.isEmptyObject(data) || $.isEmptyObject(data.nodes)){      // at least the node itself is returned if it has no Parent/Children/Sibling
			console.warn ("no node details returned from the API getRelatedNodes&Edges");
		}else {		
			console.log("data.nodes are: ");
			console.table(data.nodes);

			$.each(data.nodes, function(key, value){
				var uuid = NodeUtils.findUUID( value );
				results[uuid] = value;
			});
		}
	};
	
	var failFunction = function( xhr, status, error ) {
		console.log('Not able to load related  Node Details: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Not able to load related Node Details: "+ xhr.status+"</p>");	
	};
	
	var nodeApi = new NodeApis();
	nodeApi.getNodesFromEntryNode(jsonData, successFunction, failFunction);	
	
	return results;
	
};

GlobalNodeUtils.getAllChildrenNodesUnderTypes = function (nodeUuid, typeIds) {
	
	var jsonData    = {}; 
	var properties  = []; 
	var entryTypeIds = [];
	var entryNode   = {};
	var typeIdsRel  = [];
	
    var nodeProperty = NodeUtils.createSysJson(nodeUuid);	        
    entryTypeIds.push(Number(nodeMap[nodeUuid].typeId));
	properties.push(nodeProperty);			
	entryNode["typeIds"]    = entryTypeIds;		
	entryNode["systemProperties"] = properties;		
	jsonData["entryNode"] =  entryNode;
	
	$.each(typeIds, function(key, value) {
		typeIdsRel.push(Number(value));
	});
//	typeIdsRel.push(Number(typeId));
	jsonData["typeIds"]   = typeIdsRel;
	jsonData['searchDirection'] = 'CHILDREN';
	jsonData['min'] = 1;
	jsonData['max'] = 1;
	
	var results = {};
	
	var successFunction = function( data ) {
		
		nodeMapInst = {};
		if($.isEmptyObject(data) || $.isEmptyObject(data.nodes)){      // at least the node itself is returned if it has no Parent/Children/Sibling
			console.warn ("no node details returned from the API getRelatedNodes&Edges");
		}else {		
			console.log("data.nodes are: ");
			console.table(data.nodes);

			$.each(data.nodes, function(key, value){
				var uuid = NodeUtils.findUUID( value );
				results[uuid] = value;
			});
		}
	};
	
	var failFunction = function( xhr, status, error ) {
		console.log('Not able to load related  Node Details: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Not able to load related Node Details: "+ xhr.status+"</p>");	
	};
	
	var nodeApi = new NodeApis();
	nodeApi.getNodesFromEntryNode(jsonData, successFunction, failFunction);	
	
	return results;
	
};

GlobalNodeUtils.getAllChildNodes = function(nodeUuid) {

	var node = nodeMap[nodeUuid];
	var jsonstr = {
		typeId : node.typeId,
		nodeUuid : nodeUuid,
		grouphost : userGroup.host,
		groupname : userGroup.name,
		namespace : loggedInUserName
	};

	var resultNodes = {};
	
	var successFunction = function(data) {
//		$.each(data.nodes, function(key, value) {
//			if (value.sysProperties.uuid.value != nodeUuid) {
//				resultNodes[key] = value;
//			}
//		});

		$.each(data.edges, function(key, value) {
			if (value.destinationNode.sysProperties.uuid.value != nodeUuid) {
				resultNodes[value.destinationNode.sysProperties.uuid.value] = value.destinationNode;
			}
		});
	};

	var failFunction = function(xhr, status, error) {
		$('#console-log').append(
				"<p style='color:red'>Load Child Nodes Error: "
						+ xhr.status + "</p>");
		console.log("Load Child Nodes Error: " + xhr.responseText);
	};

	var nodeApis = new NodeApis();
	nodeApis.getChildNodes(jsonstr, successFunction, failFunction);
	
	return resultNodes;

};

GlobalNodeUtils.getAllChildNodes2 = function(node) {

//	var node = nodeMap[nodeUuid];
	var jsonstr = {
		typeId : node.typeId,
		nodeUuid : node.sysProperties.uuid.value,
		grouphost : userGroup.host,
		groupname : userGroup.name,
		namespace : loggedInUserName
	};

	var resultNodes = {};
	
	var successFunction = function(data) {
//		$.each(data.nodes, function(key, value) {
//			if (value.sysProperties.uuid.value != nodeUuid) {
//				resultNodes[key] = value;
//			}
//		});

		$.each(data.edges, function(key, value) {
			if (value.destinationNode.sysProperties.uuid.value != node.sysProperties.uuid.value) {
				resultNodes[value.destinationNode.sysProperties.uuid.value] = value.destinationNode;
			}
		});
	};

	var failFunction = function(xhr, status, error) {
		$('#console-log').append(
				"<p style='color:red'>Load Child Nodes Error: "
						+ xhr.status + "</p>");
		console.log("Load Child Nodes Error: " + xhr.responseText);
	};

	var nodeApis = new NodeApis();
	nodeApis.getChildNodes(jsonstr, successFunction, failFunction);
	
	return resultNodes;

};

GlobalNodeUtils.createWorkspace = function () {
	
	console.log("Entered the global node utils create workspace");
	
	var jsonData    = {}; 
	var properties  = []; 
	var typeIds     = [];
	var entryNode   = {};
	var typeIdsRel  = [];
	
//    var nodeProperty = NodeUtils.createSysJson(nodeUuid);	        
//	typeIds.push(Number(nodeMap[nodeUuid].typeId));
//	properties.push(nodeProperty);			
//	entryNode["typeIds"]    = typeIds;		
//	entryNode["systemProperties"] = properties;		
	jsonData["nodes"] =  nodeMap;
	jsonData["edges"] = edgeMap;
	
	
//	typeIdsRel.push(Number(typeId));
//	jsonData["typeIds"]   = typeIdsRel;
//	jsonData['searchDirection'] = 'CHILDREN';
//	jsonData['min'] = 1;
//	jsonData['max'] = 1;
	
	var results = {};
	
	var successFunction = function( data ) {
		
		nodeMapInst = {};
		if($.isEmptyObject(data) || $.isEmptyObject(data.nodes)){      // at least the node itself is returned if it has no Parent/Children/Sibling
			console.warn ("no node details returned from the API getRelatedNodes&Edges");
		}else {		
			console.log("data.nodes are: ");
			console.table(data.nodes);

			$.each(data.nodes, function(key, value){
				var uuid = NodeUtils.findUUID( value );
				results[uuid] = value;
			});
		}
	};
	
	var failFunction = function( xhr, status, error ) {
		console.log('Not able to load related  Node Details: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Not able to load related Node Details: "+ xhr.status+"</p>");	
	};
	
	var nodeApi = new NodeApis();
	nodeApi.createWorkspace(jsonData, successFunction, failFunction);	
	
	return results;
	
};

GlobalNodeUtils.loadAllNodeWorkspaces = function () {
	
	var jsonData = {
			grouphost : userGroup.host,
			groupname : userGroup.name,
			namespace : loggedInUserName
	};
		
	var successFunction = function( data ) {
		workspaceMap = {};
		$.each(data.workspaces, function(key, value){
			if (!workspaceMap[value.sysProperties.uuid.value]) {
				workspaceMap[value.sysProperties.uuid.value] = value;
			}
		});
	};
	
	var failFunction = function( xhr, status, error ) {
		console.log('Not able to load all workspaces: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Not able to load all workspaces: " + xhr.status + "</p>");	
	};
	
	var workspaceApis = new WorkspaceApis();
	workspaceApis.getAllWorkspaces(jsonData, successFunction, failFunction);	
	
	GlobalNodeUtils.loadWorkspaceType();
	
};

GlobalNodeUtils.loadWorkspaceType = function () {
	
	var jsonData = {
			grouphost : userGroup.host,
			groupname : userGroup.name,
			namespace : loggedInUserName
	};
		
	var successFunction = function( data ) {
		workspaceInternalType = data.workspaceType;
	};
	
	var failFunction = function( xhr, status, error ) {
		CommonFctsLogical.HandlingErrorMSG("Failed to load internal workspace type", "error");
		console.error("Error: " + xhr.status);	
	};
	
	var workspaceApis = new WorkspaceApis();
	workspaceApis.getWorkspaceType(jsonData, successFunction, failFunction);	
	
};

GlobalNodeUtils.loadAllNodesInWorkspace = function (workspaceUuid) {
	
	var workspaceNode = {
			typeIds: [workspaceMap[workspaceUuid].typeId],
			sysProperties: {
				uuid: {
					propertyName: "uuid",
					propertyType: "STRING",
					value: workspaceUuid
				}
			}
	}
	
	var jsonData = {
			workspaceNode : workspaceNode, 
			grouphost : userGroup.host,
			groupname : userGroup.name,
			namespace : loggedInUserName
	};
		
	var successFunction = function(data) {
		NodeUtils.buildNodeAndEdgeVars(data);
	};
	
	var failFunction = function( xhr, status, error ) {
		console.log('Not able to load nodes in workspace: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Not able to load nodes in workspace: " + xhr.status + "</p>");	
	};
	
	var workspaceApis = new WorkspaceApis();
	workspaceApis.getWorkspace(jsonData, successFunction, failFunction);	
};
