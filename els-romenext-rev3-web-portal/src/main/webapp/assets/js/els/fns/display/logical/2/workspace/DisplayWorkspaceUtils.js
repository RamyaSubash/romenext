function DisplayWorkspaceUtils() {

};

DisplayWorkspaceUtils.buildWorkspaceListForNode_withActions = function( funcName,  nodeUuid) {

	var nodeWorkspaceNodeList = DisplayLogicalRendererGraph.getWorkspaceBasedOnNode(nodeUuid);
	
	if (nodeWorkspaceNodeList.length < 1) {
		CommonFctsLogical.HandlingErrorMSG("No Workspace Found", "warning");
		return;
	}
	
	var workspaceTypeNamePropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("name");
	
	var form = document.createElement('div');
	var inputs = "<form id='node_workspace_node'>";
	inputs += "<table id='workspace_for_node'>";
	inputs += "<tr><th colspan='3' style='background-color: grey'>Workspace List:</th><tr>";
	inputs += "<tr><th><select id='workspace_for_node_list' onchange='" + funcName + "(this.value, \"" + nodeUuid + "\")'><option></option>";

	$.each(nodeWorkspaceNodeList, function(key, workspace) {
		inputs += "<option value='" + workspace.sysProperties.uuid.value + "'>" + workspace.typeProperties[workspaceTypeNamePropertyId].value + "</option>";
	});
	
	inputs += "</select></th></tr></table></form>";

	form.innerHTML = inputs;	
	(new DisplayLogicalRenderer()).emptyAllInst();
	$('#nodeForm').append(form);
	
};

DisplayWorkspaceUtils.buildWorkspaceListNotAttachedForNode_withActions = function( funcName,  nodeUuid) {

	console.log("11111 Entered the workspace for negation node function");
	
	var availableWorkspaces = DisplayWorkspaceUtils.getWorkspaceNotAttachedToNode(nodeUuid);
	
	if ( availableWorkspaces == null || availableWorkspaces.length < 1) {
		CommonFctsLogical.HandlingErrorMSG("No Workspace Found", "warning");
		return;
	}
	
	var workspaceTypeNamePropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("name");
	
	var form = document.createElement('div');
	var inputs = "<form id='node_workspace_node'>";
	inputs += "<table id='workspace_for_node'>";
	inputs += "<tr><th colspan='3' style='background-color: grey'>Workspace List:</th><tr>";
	inputs += "<tr><th><select id='workspace_for_node_list' onchange='" + funcName + "(this.value, \"" + nodeUuid + "\")'><option></option>";

	$.each(availableWorkspaces, function(key, workspace) {
		inputs += "<option value='" + workspace.sysProperties.uuid.value + "'>" + workspace.typeProperties[workspaceTypeNamePropertyId].value + "</option>";
	});
	
	inputs += "</select></th></tr></table></form>";

	form.innerHTML = inputs;	
	(new DisplayLogicalRenderer()).emptyAllInst();
	$('#nodeForm').append(form);
	
};

DisplayWorkspaceUtils.addNodeToWorkspace = function( workspaceUuid, nodeUuid) {
	
	console.log("WorkspaceUuid");
	console.log( workspaceUuid );
	console.log("node uuid " );
	console.log( nodeUuid );

	if (workspaceUuid == null || nodeUuid == null ) {
		return;
	}
	
	var nodeWorkspaceNodeList = [];
	
	var node = nodeMap[nodeUuid];
	var typeNode = {
			typeIds: [node.typeId],
			sysProperties: {
				uuid: {
					propertyName: "uuid",
					propertyType: "STRING",
					value: node.sysProperties.uuid.value
				}
			}	
	};
	
	var toSendNodes = {};
	toSendNodes[ nodeUuid ] = typeNode;
	
//	var nodes = {};
//	var nodesOfCy = irvCy.filter('node');
//	
//	$.each(nodesOfCy, function(key, value) {
//		if (!nodes[value.data().sysProperties.uuid.value] && value.data().classification != "WORKSPACE") {
//			var node = {
//					typeIds: [value.data().typeId],
//					sysProperties: {
//						uuid: {
//							propertyName: "uuid",
//							propertyType: "STRING",
//							value: value.data().sysProperties.uuid.value
//						}
//					}
//			}
//			
//			nodes[value.data().sysProperties.uuid.value] = node;
//		}
//	
//	});
	
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

	var jsonstr = {
		workspaceNode : workspaceNode,
		nodes : toSendNodes,
		edges : {},
		grouphost : userGroup.host,
		groupname : userGroup.name,
		namespace : loggedInUserName
	};

	 

	var successFunction = function(data) {
		if (data.hasOwnProperty('nodes')) {
			nodeWorkspaceNodeList = data.nodes;
		}
	};

	var failFunction = function(xhr, status, error) {
		CommonFctsLogical.HandlingErrorMSG("Get Workspace for Node Error: " + xhr.status, "error");
		$('#console-log').append("<p style='color:red'>Get Workspace for Node Error: " + xhr.status + "</p>");
		console.log("Get Workspace for Node Error: " + xhr.responseText);
	};

	var workspaceApis = new WorkspaceApis();
	workspaceApis.addNodeToWorkspace(jsonstr, successFunction, failFunction);
	
	return nodeWorkspaceNodeList;
	
};

DisplayWorkspaceUtils.deleteNodeToWorkspace = function( workspaceUuid, nodeUuid) {
	
	console.log("WorkspaceUuid");
	console.log( workspaceUuid );
	console.log("node uuid " );
	console.log( nodeUuid );

	if (workspaceUuid == null || nodeUuid == null ) {
		return;
	}
	
	var nodeWorkspaceNodeList = [];
	
	var node = nodeMap[nodeUuid];
	var typeNode = {
			typeIds: [node.typeId],
			sysProperties: {
				uuid: {
					propertyName: "uuid",
					propertyType: "STRING",
					value: node.sysProperties.uuid.value
				}
			}	
	};
	
	var toSendNodes = {};
	toSendNodes[ nodeUuid ] = typeNode;
	
//	var nodes = {};
//	var nodesOfCy = irvCy.filter('node');
//	
//	$.each(nodesOfCy, function(key, value) {
//		if (!nodes[value.data().sysProperties.uuid.value] && value.data().classification != "WORKSPACE") {
//			var node = {
//					typeIds: [value.data().typeId],
//					sysProperties: {
//						uuid: {
//							propertyName: "uuid",
//							propertyType: "STRING",
//							value: value.data().sysProperties.uuid.value
//						}
//					}
//			}
//			
//			nodes[value.data().sysProperties.uuid.value] = node;
//		}
//	
//	});
	
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

	var jsonstr = {
		workspaceNode : workspaceNode,
		nodes : toSendNodes,
		edges : {},
		grouphost : userGroup.host,
		groupname : userGroup.name,
		namespace : loggedInUserName
	};

	 

	var successFunction = function(data) {
		if (data.hasOwnProperty('nodes')) {
			nodeWorkspaceNodeList = data.nodes;
		}
	};

	var failFunction = function(xhr, status, error) {
		CommonFctsLogical.HandlingErrorMSG("Get Workspace for Node Error: " + xhr.status, "error");
		$('#console-log').append("<p style='color:red'>Get Workspace for Node Error: " + xhr.status + "</p>");
		console.log("Get Workspace for Node Error: " + xhr.responseText);
	};

	var workspaceApis = new WorkspaceApis();
	workspaceApis.deleteNodeFromWorkspace(jsonstr, successFunction, failFunction);
	
	return nodeWorkspaceNodeList;
	
};

DisplayWorkspaceUtils.getWorkspaceBasedOnNode = function(nodeUuid) {

	var nodeWorkspaceNodeList = [];
	
	var node = nodeMap[nodeUuid];
	var typeNode = {
			typeIds: [node.typeId],
			sysProperties: {
				uuid: {
					propertyName: "uuid",
					propertyType: "STRING",
					value: node.sysProperties.uuid.value
				}
			}	
	};
	
	var jsonstr = {
		typeNode : typeNode,
		grouphost : userGroup.host,
		groupname : userGroup.name,
		namespace : loggedInUserName
	};

	var successFunction = function(data) {
		if (data.hasOwnProperty('nodes')) {
			nodeWorkspaceNodeList = data.nodes;
		}
	};

	var failFunction = function(xhr, status, error) {
		CommonFctsLogical.HandlingErrorMSG("Get Workspace for Node Error: " + xhr.status, "error");
		$('#console-log').append("<p style='color:red'>Get Workspace for Node Error: " + xhr.status + "</p>");
		console.log("Get Workspace for Node Error: " + xhr.responseText);
	};

	var workspaceApis = new WorkspaceApis();
	workspaceApis.getWorkspaceBasedOnNode(jsonstr, successFunction, failFunction);
	
	return nodeWorkspaceNodeList;
	
};






DisplayWorkspaceUtils.getWorkspaceNotAttachedToNode = function(nodeUuid) { 
	
	var nodeWorkspaceNodeList = [];
	
	var node = nodeMap[nodeUuid];
	var typeNode = {
			typeIds: [node.typeId],
			sysProperties: {
				uuid: {
					propertyName: "uuid",
					propertyType: "STRING",
					value: node.sysProperties.uuid.value
				}
			}	
	};
	
//	var workspaceMapTmp;
	var workspaceMapTmp  = jQuery.extend(true, {}, workspaceMap);
	
	
//	console.log(" --------------------------------- WORKSPACE CURRENT --------------------------------------");
//	$.each(workspaceMapTmp, function(key, workspace) { 
//		
//		console.log( workspace.typeProperties[2].value );
//	});
//	console.log(" --------------------------------- WORKSPACE CURRENT END  --------------------------------------");
	
	var jsonstr = {
		typeNode : typeNode,
		grouphost : userGroup.host,
		groupname : userGroup.name,
		namespace : loggedInUserName
	};

	var successFunction = function(data) {
		if (data.hasOwnProperty('nodes')) {
			nodeWorkspaceNodeList = data.nodes;
		}
	};

	var failFunction = function(xhr, status, error) {
		CommonFctsLogical.HandlingErrorMSG("Get Workspace for Node Error: " + xhr.status, "error");
		$('#console-log').append("<p style='color:red'>Get Workspace for Node Error: " + xhr.status + "</p>");
		console.log("Get Workspace for Node Error: " + xhr.responseText);
	};

	var workspaceApis = new WorkspaceApis();
	workspaceApis.getWorkspaceBasedOnNode(jsonstr, successFunction, failFunction);
	
//	return nodeWorkspaceNodeList;
	
	// need to find out which ones in the map are not needed
//	$.each(workspaceMap, function(key, workspace) {
//		
//		var check = workspaceMap[ workspace.sysProperties.uuid.value ];
//		
//		if( check == null ) {
//			workspaceMapTmp[  workspace.sysProperties.uuid.value ] = workspace;
//		}
//		
//		console.log("UUID?:");
//		console.log( workspace.sysProperties.uuid.value );
//		
//		console.log("Inside the check");
//		console.log( key );
//		console.log( workspace );
//	});
	
//	console.log(" --------------------------------- RETURN FROM API CALL --------------------------------------");
//	$.each(nodeWorkspaceNodeList, function(key, workspace) { 
//		
//		console.log( workspace.typeProperties[2].value );
//	});
//	console.log(" --------------------------------- RETURN FROM API CALL END --------------------------------------");

	// need to find out which ones in the map are not needed
	$.each(nodeWorkspaceNodeList, function(key, workspace) {
		
//		var check = workspaceMap[ workspace.sysProperties.uuid.value ];
//		
//		if( check == null ) {
//			workspaceMapTmp[  workspace.sysProperties.uuid.value ] = workspace;
//		}
		
		delete workspaceMapTmp[ workspace.sysProperties.uuid.value ];
		
		console.log("UUID?:");
		console.log( workspace.sysProperties.uuid.value );
		
		console.log("Inside the check");
		console.log( key );
		console.log( workspace );
	});
	
	return workspaceMapTmp;
	
};
