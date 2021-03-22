function DisplayLogicalRendererGraph() {

};

DisplayLogicalRendererGraph.drillDown = function() {
	
	// before drill down into a node, this node should be selected first
	if (listInstUuids.length == 1 && listEdgeUuids.length == 0) {
		
		isWorkspaceLoaded = false;
		
		// drill down into a node also will select this node
		var drilledNode = nodeMap[listInstUuids[0]];
	
		// push selected node to drill history list
		drillHistoryList.push(drilledNode);
		
		// load all child nodes
		var childTypeIds = [];
		$.each(connMapViaId, function(connId, conn) {
			if (conn.source == drilledNode.typeId) {
				if (!childTypeIds.includes(conn.target)) {
					childTypeIds.push(conn.target);
				}
			}
		});
//		var childNodes = GlobalNodeUtils.getAllChildrenNodesUnderTypes(drilledNode.sysProperties.uuid.value, childTypeIds);
		var childNodes = GlobalNodeUtils.getAllChildNodes(drilledNode.sysProperties.uuid.value);
		nodeMap = {};
		edgeMap = {};
		$.each(childNodes, function(uuid, node) {
			var name = NodeUtils.findNameInst(node);
			var color = typeMapViaId[node.typeId].color;
			if (!nodeMap[uuid]) {
				nodeMap[uuid] = node;
				nodeMap[uuid]["cyDisplay"] = name;
				nodeMap[uuid]["color"] = color;
				nodeMap[uuid].type = nodeMap[uuid].name;
			}
		});
		
		// regenerate type bars
		(new DisplayLogicalRenderer()).initChildTypeBar2(drilledNode);
		
		// regenerate graph
		if (irvCy) {
			irvCy.remove(irvCy.elements());
		}

		if (JSON.stringify(nodeMap) === JSON.stringify({})) {
			CommonFctsLogical.HandlingErrorMSG("No Instances Created", "warning");
			$("#console-log").append("No Instances Created");
			$('#nodeForm').empty();
		} else {
			var elements = DisplayCytoscapeUtils.formatNodesAndEdges();
			irvCy = initNodeEdgeGraph(irvCy, "irvCy", elements);
			irvCy.zoom(logicalDisplayCytoscapeDefaultZoomLevel);
			irvCy.center();
		}
		
		(new DisplayLogicalRenderer()).showOrNotSmallNodesConnectingBar();
		
		(new DisplayLogicalRenderer()).buildBreadcrum(drilledNode.sysProperties.uuid.value, "node");
		
//		document.getElementById("edge_bar").innerHTML = "<table id='ruleList'><tr><td><span class='label label-default'>*(0)</span></td></tr></table>";
		document.getElementById("edge_bar").style.display = "none";
	}

};

DisplayLogicalRendererGraph.drillDown2 = function(nodeUuid) {
	
	isWorkspaceLoaded = false;
	
	var drilledNode = null;
	$.each(drillHistoryList, function(key, value) {
		if (value.sysProperties.uuid.value == nodeUuid) {
			drilledNode = value;
		}
	});
	
	var tempObject = {};
	$.each(drillHistoryList, function(key, value) {
		if (value.sysProperties.uuid.value != drilledNode.sysProperties.uuid.value) {
			tempObject[value.sysProperties.uuid.value] = value;
		} else {
			return false;
		}
	});
	drillHistoryList = [];
	$.each(tempObject, function(uuid, node) {
		drillHistoryList.push(node); 
	});
	
	// load all child nodes
	var childTypeIds = [];
	$.each(connMapViaId, function(connId, conn) {
		if (conn.source == drilledNode.typeId) {
			if (!childTypeIds.includes(conn.target)) {
				childTypeIds.push(conn.target);
			}
		}
	});
	var childNodes = GlobalNodeUtils.getAllChildNodes2(drilledNode);
	nodeMap = {};
	edgeMap = {};
	$.each(childNodes, function(uuid, node) {
		var name = NodeUtils.findNameInst(node);
		var color = typeMapViaId[node.typeId].color;
		if (!nodeMap[uuid]) {
			nodeMap[uuid] = node;
			nodeMap[uuid]["cyDisplay"] = name;
			nodeMap[uuid]["color"] = color;
			nodeMap[uuid].type = nodeMap[uuid].name;
		}
	});
	
	// regenerate type bars
	(new DisplayLogicalRenderer()).initChildTypeBar2(drilledNode);
	
	// regenerate graph
	if (irvCy) {
		irvCy.remove(irvCy.elements());
	}

	if (JSON.stringify(nodeMap) === JSON.stringify({})) {
		CommonFctsLogical.HandlingErrorMSG("No Instances Created", "warning");
		$("#console-log").append("No Instances Created");
		$('#nodeForm').empty();
	} else {
		var elements = DisplayCytoscapeUtils.formatNodesAndEdges();
		irvCy = initNodeEdgeGraph(irvCy, "irvCy", elements);
		irvCy.zoom(logicalDisplayCytoscapeDefaultZoomLevel);
		irvCy.center();
	}
	
	(new DisplayLogicalRenderer()).showOrNotSmallNodesConnectingBar();
	
	$("#hb_node_" + drilledNode.sysProperties.uuid.value).nextAll("li").remove();

	document.getElementById("edge_bar").style.display = "none";
	
};

DisplayLogicalRendererGraph.drillUp = function() {
	
	if (drillHistoryList.length > 1) {
		
		var drilledNode = drillHistoryList[drillHistoryList.length - 2];
		drillHistoryList.splice(-1, 1);
		
		var childTypeIds = [];
		$.each(connMapViaId, function(connId, conn) {
			if (conn.source == drilledNode.typeId) {
				if (!childTypeIds.includes(conn.target)) {
					childTypeIds.push(conn.target);
				}
			}
		});
//		var childNodes = GlobalNodeUtils.getAllChildrenNodesUnderTypes(drilledNode.sysProperties.uuid.value, childTypeIds);
		var childNodes = GlobalNodeUtils.getAllChildNodes2(drilledNode);
		nodeMap = {};
		edgeMap = {};
		$.each(childNodes, function(uuid, node) {
			var name = NodeUtils.findNameInst(node);
			var color = typeMapViaId[node.typeId].color;
			if (!nodeMap[uuid]) {
				nodeMap[uuid] = node;
				nodeMap[uuid]["cyDisplay"] = name;
				nodeMap[uuid]["color"] = color;
				nodeMap[uuid].type = nodeMap[uuid].name;
			}
		});
		
		// regenerate type bars
		listInstUuids = [];
		listEdgeUuids = [];
		listInstUuids.push(drilledNode.sysProperties.uuid.value);
		(new DisplayLogicalRenderer()).initChildTypeBar2(drilledNode);
		
		// regenerate graph
		if (irvCy) {
			irvCy.remove(irvCy.elements());
		}

		if (JSON.stringify(nodeMap) === JSON.stringify({})) {
			CommonFctsLogical.HandlingErrorMSG("No Instances Created", "warning");
			$("#console-log").append("No Instances Created");
			$('#nodeForm').empty();
		} else {
			var elements = DisplayCytoscapeUtils.formatNodesAndEdges();
			irvCy = initNodeEdgeGraph(irvCy, "irvCy", elements);
			irvCy.zoom(logicalDisplayCytoscapeDefaultZoomLevel);
			irvCy.center();
		}
		
		(new DisplayLogicalRenderer()).showOrNotSmallNodesConnectingBar();
			
		var breadcrumb = document.getElementById("breadcrumb");
		breadcrumb.removeChild(breadcrumb.lastChild);
		
//		document.getElementById("edge_bar").innerHTML = "<table id='ruleList'><tr><td><span class='label label-default'>*(0)</span></td></tr></table>";
		document.getElementById("edge_bar").style.display = "none";
		
	} else if (drillHistoryList.length == 1) {
		$("#breadcrumb li:nth-last-child(2)").click();
	} else if (drillHistoryList.length < 1) {
		(new DisplayLogicalRenderer()).resetView();
	}
	
};

DisplayLogicalRendererGraph.generateDisplayWorkspaceMenu = function() {
	
	var displayWorkspaceMenu = document.getElementById("display_workspace_menu");
	var inputs = '';
	$.each(workspaceMap, function(key, workspace) {
		inputs += '<button type="button" class="btn btn-primary btn-md text-center" style="width:100%" onclick="DisplayLogicalRendererGraph.generateWorkspace(\'' + key + '\');">' + workspace.typeProperties[Object.keys(workspace.typeProperties)[0]].value + '</button>';
	});
	
//	inputs += '<button type="button" class="btn btn-primary btn-md text-center" style="width:100%" onclick="DisplayLogicalRendererGraph.showCreateWorkspaceForm();"><i class="fa fa-plus f3x" aria-hidden="true"></i></button>';
	displayWorkspaceMenu.innerHTML = inputs;
	
	var displayWorkspaceMenu2 = document.getElementById("display_workspace_menu_2");	
	inputs = '';
	$.each(workspaceMap, function(key, workspace) {
		inputs += '<li><button type="button" class="btn btn-primary btn-md text-center" style="width:100%" onclick="DisplayLogicalRendererGraph.updateWorkspace(\'' + key + '\');">' + workspace.typeProperties[Object.keys(workspace.typeProperties)[0]].value + '</button></li>'; 
	});
	
	inputs += '<li><button type="button" class="btn btn-primary btn-md text-center" style="width:100%" onclick="DisplayLogicalRendererGraph.showCreateWorkspaceForm();"><i class="fa fa-plus f3x" aria-hidden="true"></i></button></li>';
	displayWorkspaceMenu2.innerHTML = inputs;

};

DisplayLogicalRendererGraph.showCreateWorkspaceForm = function() {
	
	$("#create_node").dialog("open");
	$('#create_node_form').empty();
	
	if (selectedMetaData != null) {

		if (irvCy) {
			
			var form = document.createElement('form');
			form.id = 'display_logical_create_workspace_form';

			var label = document.createElement('label');
			label.innerHTML = 'Name: ';
			var inputName = document.createElement('input');
			inputName.id = 'add_workspace_name';
			inputName.type = 'text';
			inputName.name = 'name';
			inputName.size = '6';
			label.appendChild(inputName);

			form.appendChild(label);
			
			var buttonCreate = "<input type='button' class='btn btn-primary btn-xs' value='Create Workspace' onclick='DisplayLogicalRendererGraph.createWorkspace();'>";
			var buttonCancel = "<input type='button' class='btn btn-primary btn-xs' value='Cancel' onclick='(new DisplayLogicalRenderer()).cancelInstForm();'>";
			form.innerHTML += "<br>" + buttonCreate + buttonCancel;

			$("#create_node").dialog("open");
			$('#create_node_form').empty();
			$("#create_node_form").append(form);
			
		} else {
			CommonFctsLogical.HandlingErrorMSG("You Do Not Have Any Current Graph to Save", "warning");
			$('#console-log').append("<p style='color:red'>You Do Not Have Any Current Graph to Save</p>");
		}
		
	} else {
		CommonFctsLogical.HandlingErrorMSG("You Must Select Metadata Repo", "warning");
		$('#console-log').append("<p style='color:red'>You Must Select Metadata Repo</p>");
	}

};

DisplayLogicalRendererGraph.createWorkspace = function() {

	var nodes = {};
	var nodesOfCy = irvCy.filter('node');
	
	$.each(nodesOfCy, function(key, value) {
		if (!nodes[value.data().sysProperties.uuid.value]) {
			var node = {
					typeIds: [value.data().typeId],
					sysProperties: {
						uuid: {
							propertyName: "uuid",
							propertyType: "STRING",
							value: value.data().sysProperties.uuid.value
						}
					}
			}
			
			nodes[value.data().sysProperties.uuid.value] = node;
		}
	
	});

	var jsonstr = {
		name : document.getElementById("add_workspace_name").value,
		nodes : nodes,
		edges : {},
		grouphost : userGroup.host,
		groupname : userGroup.name,
		namespace : loggedInUserName
	};

	var successFunction = function(data) {
		console.log("Save Workspace Succeeded!");
		$('#create_node_form').empty();
		$("#create_node").dialog("close");
		
		if (!workspaceMap[data.workspace.sysProperties.uuid.value]) {
			workspaceMap[data.workspace.sysProperties.uuid.value] = data.workspace;
		}
		
		DisplayLogicalRendererGraph.generateDisplayWorkspaceMenu();
	};

	var failFunction = function(xhr, status, error) {
		CommonFctsLogical.HandlingErrorMSG("Save Workspace Error: " + xhr.status, "error");
		$('#console-log').append("<p style='color:red'>Save Workspace Error: " + xhr.status + "</p>");
		console.log("Save Workspace Error: " + xhr.responseText);
	};

	var workspaceApis = new WorkspaceApis();
	workspaceApis.createWorkspace(jsonstr, successFunction, failFunction);
	
};

DisplayLogicalRendererGraph.updateWorkspace = function(workspaceNodeUuid) {

	var nodes = {};
	var nodesOfCy = irvCy.filter('node');
	
	$.each(nodesOfCy, function(key, value) {
		if (!nodes[value.data().sysProperties.uuid.value]) {
			var node = {
					typeIds: [value.data().typeId],
					sysProperties: {
						uuid: {
							propertyName: "uuid",
							propertyType: "STRING",
							value: value.data().sysProperties.uuid.value
						}
					}
			}
			
			nodes[value.data().sysProperties.uuid.value] = node;
		}
	
	});
	
	var workspaceNode = {
			typeIds: [workspaceMap[workspaceNodeUuid].typeId],
			sysProperties: {
				uuid: {
					propertyName: "uuid",
					propertyType: "STRING",
					value: workspaceNodeUuid
				}
			}
	}

	var jsonstr = {
		workspaceNode : workspaceNode,
		nodes : nodes,
		edges : {},
		grouphost : userGroup.host,
		groupname : userGroup.name,
		namespace : loggedInUserName
	};

	var successFunction = function(data) {
		console.log("Save Workspace Succeeded!");
//		workspaceMap[data.workspace.sysProperties.uuid.value] = data.workspace;		
	};

	var failFunction = function(xhr, status, error) {
		CommonFctsLogical.HandlingErrorMSG("Save Workspace Error: " + xhr.status, "error");
		$('#console-log').append("<p style='color:red'>Save Workspace Error: " + xhr.status + "</p>");
		console.log("Save Workspace Error: " + xhr.responseText);
	};

	var workspaceApis = new WorkspaceApis();
	workspaceApis.updateWorkspace(jsonstr, successFunction, failFunction);
	
};

DisplayLogicalRendererGraph.generateWorkspace = function(workspaceUuid) {
	
	drillHistoryList = [];
	
	GlobalNodeUtils.loadAllNodesInWorkspace(workspaceUuid);

	if (irvCy) {
		irvCy.remove(irvCy.elements());
	}

	if (JSON.stringify(nodeMap) === JSON.stringify({})) {
		$("#console-log").append("No Instances Created");
		// $("#create_node").dialog("open");
		$('#nodeForm').empty();
		// $("#nodeForm").append("No Instances Created");
	} else {
		var elements = DisplayCytoscapeUtils.formatNodesAndEdges();
		irvCy = initNodeEdgeGraph(irvCy, "irvCy", elements);
		irvCy.zoom(logicalDisplayCytoscapeDefaultZoomLevel);
		irvCy.center();
	}
	
	// generate new type bars
	
	var linkRuleIds = [];
	var typeIds = [];
	
	$.each(nodeMap, function(nUuid, node) {
		if (!typeIds.includes(node.typeId)) {
			typeIds.push(node.typeId);
		}	
	});
	
	$.each(edgeMap, function(eUuid, edge) {
		if (ruleMapViaId[edge.ruleId].classification == 'link' && !linkRuleIds.includes(edge.ruleId)) {
			linkRuleIds.push(edge.ruleId);
		}	
	});
	
	DisplayLogicalRendererBar.generateTypeBars(typeIds, linkRuleIds);
	
	isWorkspaceLoaded = true;
	
	(new DisplayLogicalRenderer()).buildBreadcrum(workspaceUuid, "workspace");
	
	(new DisplayLogicalRenderer()).showOrNotSmallNodesConnectingBar();
		
};
