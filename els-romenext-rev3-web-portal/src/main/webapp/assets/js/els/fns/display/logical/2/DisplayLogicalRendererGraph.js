function DisplayLogicalRendererGraph() {

};

DisplayLogicalRendererGraph.drillDown = function() {
	
	// before drill down into a node, this node should be selected first
	if (listInstUuids.length == 1 && listEdgeUuids.length == 0) {
		
		loadedWorkspaceUuid = null;
		isWorkspaceLoaded = false;
		
		// resets the workspace if one was set (including clearing the bottom bar)
		DisplayLogicalRendererGraph.clearLoadedWorkspace();
		
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

/**
 * This is used for the breadcrumbs for now! Maybe look at changing this in the future!
 */
DisplayLogicalRendererGraph.drillDown2 = function(nodeUuid) {
	
	loadedWorkspaceUuid = null;
	isWorkspaceLoaded = false;
	DisplayLogicalRendererGraph.clearLoadedWorkspace();
	
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
	var workspaceTypeNamePropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("name");

	var inputs = '';
	$.each(workspaceMap, function(key, workspace) {
		inputs += '<button type="button" class="btn btn-primary btn-md text-center" style="width:100%" onclick="DisplayLogicalRendererGraph.generateWorkspace(\'' + key + '\');">' + workspace.typeProperties[workspaceTypeNamePropertyId].value + '</button>';
	});
	
//	inputs += '<button type="button" class="btn btn-primary btn-md text-center" style="width:100%" onclick="DisplayLogicalRendererGraph.showCreateWorkspaceForm();"><i class="fa fa-plus f3x" aria-hidden="true"></i></button>';
	displayWorkspaceMenu.innerHTML = inputs;
	
	var displayWorkspaceMenu2 = document.getElementById("display_workspace_menu_2");	
	inputs = '';
	$.each(workspaceMap, function(key, workspace) {
		inputs += '<li><button type="button" class="btn btn-primary btn-md text-center" style="width:100%" onclick="DisplayLogicalRendererGraph.updateWorkspace(\'' + key + '\');">' + workspace.typeProperties[workspaceTypeNamePropertyId].value + '</button></li>'; 
	});
	
	inputs += '<li><button type="button" class="btn btn-primary btn-md text-center" style="width:100%" onclick="DisplayLogicalRendererGraph.showCreateWorkspaceForm();"><i class="fa fa-plus f3x" aria-hidden="true"></i></button></li>';
	displayWorkspaceMenu2.innerHTML = inputs;

};

DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName = function( name ) {
	
	var workspaceTypeNamePropertyId = null;
	
	$.each(workspaceInternalType.typeProperties, function(key, value) {
		if (value.name == name) {
			workspaceTypeNamePropertyId = Number(value.id);
			return false;
		}
	});
	
	return workspaceTypeNamePropertyId;

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
			inputName.autofocus = true;
			label.appendChild(inputName);

			form.appendChild(label);
			
			var buttonCreate = "<input type='submit' class='btn btn-primary btn-xs' value='Create Workspace' onclick='DisplayLogicalRendererGraph.createWorkspace();'>";
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
	
	console.log("Entered the display renderer for creating workspace");
	

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
		edges : edgeMap,
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
		
		DisplayLogicalRendererGraph.generateWorkspace(data.workspace.sysProperties.uuid.value);
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

DisplayLogicalRendererGraph.formatWorkspaceNode = function(workspaceNode) {
	
	var new_x = GlobalDecoUtils.getDecoPropertyValueFromInstance(workspaceNode, 'x');
	var new_y = GlobalDecoUtils.getDecoPropertyValueFromInstance(workspaceNode, 'y');    
	
	if (new_x == null) {
		new_x = 0;	
	}
	if (new_y == null) {
		new_y = 0;	
	}
	
	var element = {
			group: 'nodes',
			data: workspaceNode,
			classification: "WORKSPACE",
			position: {x: new_x, y: new_y}
	};
	
	return element;
	
};

DisplayLogicalRendererGraph.generateWorkspace = function(workspaceUuid) {
	
	
	// STATE CHANGE
	guistate_main = 'WORKSPACE';
	guistate_sub = 'VIEW';
	
	
	
	
	$(".qtip").remove();
	
	if (!workspaceUuid) {
		return;
	}
	
	hideNode = false;
	hidePath = false;
	hideSystem = false;
	hideLink = false;
	
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
	
//	var element = {
//		group: 'nodes',
//		data: workspaceMap[workspaceUuid],
//		classification: "WORKSPACE"
//	};
	var newElement = irvCy.add(DisplayLogicalRendererGraph.formatWorkspaceNode(workspaceMap[workspaceUuid]), true);
		
//	var navBarWidth = document.getElementById("myNavbar").offsetWidth;
//	var navBarHeight = document.getElementById("myNavbar").offsetHeight;
//	
//	var mainWidth = document.getElementById("main").offsetWidth;
//	var mainHeight = document.getElementById("main").offsetHeight;
//	
//	var topBarsWidth = document.getElementById("top_bars").offsetWidth;
//	var topBarsHeight = document.getElementById("top_bars").offsetHeight;
//	
//	var leftBarWidth = document.getElementById("left_bar").offsetWidth;
//	var leftBarHeight = document.getElementById("left_bar").offsetHeight;
//	var rightBarWidth = document.getElementById("right_bar").offsetWidth;
//	var rightBarHeight = document.getElementById("right_bar").offsetHeight;
//	
//	var bottomBarWidth = document.getElementById("bottom_bar").offsetWidth;
//	var bottomBarHeight = document.getElementById("bottom_bar").offsetHeight;
//	
//	var workspaceWidth = document.getElementById("main-content-workingarea").offsetWidth;
//	var workspaceHeight = document.getElementById("main-content-workingarea").offsetHeight;
//	
//	var backgroundPositionX = 0;
//	var backgroundPositionY = topBarsHeight - mainHeight + workspaceHeight;
//	var backgroundWidth = workspaceWidth;
//	var backgroundHeight = mainHeight - topBarsHeight - bottomBarHeight;
	
	var workspaceTypeBackgroundImagePropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("backgroundImage");
	var workspaceTypeBackgroundImageWidthPropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("width");
	var workspaceTypeBackgroundImageHeightPropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("height");
	
	var workspaceTypeBackgroundImageWidth = workspaceMap[workspaceUuid].typeProperties[workspaceTypeBackgroundImageWidthPropertyId];
	var workspaceTypeBackgroundImageHeight = workspaceMap[workspaceUuid].typeProperties[workspaceTypeBackgroundImageHeightPropertyId];
	
	if (workspaceMap[workspaceUuid].typeProperties[workspaceTypeBackgroundImagePropertyId]) {
		var workspaceBackgroundImage = workspaceMap[workspaceUuid].typeProperties[workspaceTypeBackgroundImagePropertyId].value;
		if (workspaceBackgroundImage) {
			irvCy.nodes("[classification='WORKSPACE']").css({'background-image':'url("' + NodeUtils.convertNodeFilePropertyValueToDataUrl2(workspaceBackgroundImage) + '")'});			
			
			// TODO: This is a hack to get the original width and height of the original image.
			// TODO: Fix this
			$("body").append("<img id='hiddenImage' src='" + NodeUtils.convertNodeFilePropertyValueToDataUrl2(workspaceBackgroundImage) + "'>");
			
			
			setTimeout(function() {
				
				var width = document.getElementById('hiddenImage').width; 
				var height = document.getElementById('hiddenImage').height;
				
				if (workspaceTypeBackgroundImageWidth && workspaceTypeBackgroundImageWidth.value != "null") {
					width = workspaceTypeBackgroundImageWidth.value;
				}
				
				if (workspaceTypeBackgroundImageHeight && workspaceTypeBackgroundImageHeight.value != "null") {
					height = workspaceTypeBackgroundImageHeight.value;
				}
				
				loadedWorkspaceImageWidth = width
				loadedWorkspaceImageHeight = height;
				
				if (document.getElementById("update_workspace_property_width")) {
					document.getElementById("update_workspace_property_width").value = width;
				}
				if (document.getElementById("update_workspace_property_height")) {
					document.getElementById("update_workspace_property_height").value = height;
				}
				
				$("#hiddenImage").remove();
				
				// NOTE: If we have the proper width and height, we can just set it with the below code!
				// TODO: Check this
				irvCy.nodes("[classification='WORKSPACE']").css({'width':width});
				irvCy.nodes("[classification='WORKSPACE']").css({'height':height});
				
				
			}, 10);	
			// TODO: END OF HACK
			
			
//			$("#irvCy").css("background-image", "url('" + NodeUtils.convertNodeFilePropertyValueToDataUrl2(workspaceBackgroundImage) + "')");
//			$("#irvCy").css("background-position-x", backgroundPositionX.toString() + "px");
//			$("#irvCy").css("background-position-y", backgroundPositionY.toString() + "px");
//			$("#irvCy").css("background-size", backgroundWidth.toString() + "px " + backgroundHeight.toString() + "px");
//			$("#irvCy").css("background-repeat", "no-repeat");
//			$("#irvCy").css("background-size", "cover");
		}
	}
	
	loadedWorkspaceUuid = workspaceUuid;
	isWorkspaceLoaded = true;
	
//	window.addEventListener("resize", function(event){
//		setTimeout(function() {
//			if (isWorkspaceLoaded == true) {
//				var navBarWidth = document.getElementById("myNavbar").offsetWidth;
//				var navBarHeight = document.getElementById("myNavbar").offsetHeight;
//				
//				var mainWidth = document.getElementById("main").offsetWidth;
//				var mainHeight = document.getElementById("main").offsetHeight;
//				
//				var topBarsWidth = document.getElementById("top_bars").offsetWidth;
//				var topBarsHeight = document.getElementById("top_bars").offsetHeight;
//				
//				var leftBarWidth = document.getElementById("left_bar").offsetWidth;
//				var leftBarHeight = document.getElementById("left_bar").offsetHeight;
//				var rightBarWidth = document.getElementById("right_bar").offsetWidth;
//				var rightBarHeight = document.getElementById("right_bar").offsetHeight;
//				
//				var bottomBarWidth = document.getElementById("bottom_bar").offsetWidth;
//				var bottomBarHeight = document.getElementById("bottom_bar").offsetHeight;
//				
//				var workspaceWidth = document.getElementById("main-content-workingarea").offsetWidth;
//				var workspaceHeight = document.getElementById("main-content-workingarea").offsetHeight;
//				
//				var backgroundPositionX = 0;
//				var backgroundPositionY = topBarsHeight - mainHeight + workspaceHeight;
//				var backgroundWidth = workspaceWidth;
//				var backgroundHeight = mainHeight - topBarsHeight - bottomBarHeight;
//				
//				var workspaceTypeBackgroundImagePropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("backgroundImage");
//				if (workspaceMap[workspaceUuid].typeProperties[workspaceTypeBackgroundImagePropertyId]) {
//					var workspaceBackgroundImage = workspaceMap[workspaceUuid].typeProperties[workspaceTypeBackgroundImagePropertyId].value;
//					if (workspaceBackgroundImage) {
//						$("#irvCy").css("background-image", "url('" + NodeUtils.convertNodeFilePropertyValueToDataUrl2(workspaceBackgroundImage) + "')");
//						$("#irvCy").css("background-position-x", backgroundPositionX.toString() + "px");
//						$("#irvCy").css("background-position-y", backgroundPositionY.toString() + "px");
//						$("#irvCy").css("background-size", backgroundWidth.toString() + "px " + backgroundHeight.toString() + "px");
//						$("#irvCy").css("background-repeat", "no-repeat");
////						$("#irvCy").css("background-size", "cover");
//					}
//				}
//			}
//		
//		}, 100);
//	});
	
	(new DisplayLogicalRenderer()).buildBreadcrum(workspaceUuid, "workspace");
	
	DisplayLogicalRendererGraph.buildWorkspacePropertyList(workspaceUuid);
	
	(new DisplayLogicalRenderer()).showOrNotSmallNodesConnectingBar();
		
};

DisplayLogicalRendererGraph.buildWorkspacePropertyList = function(workspaceUuid) {
	
	var workspace = workspaceMap[workspaceUuid];
	var workspaceTypeNamePropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("name");
	var workspaceTypeBackgroundImagePropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("backgroundImage");
	var workspaceTypeBackgroundImageWidthPropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("width");
	var workspaceTypeBackgroundImageHeightPropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("height");
		
	var inputs = '<table cellspacing="10px"><tr><td>Name</td><td>Background Image</td><td></td><td></td><td id="update_workspace_property_width_header" style="display:none;">Width</td><td id="update_workspace_property_height_header" style="display:none;">Height</td><td></td></tr><tr>';
	
	inputs += '<td><input id="update_workspace_property_name" type="text" name="name" value="'
		+ workspace.typeProperties[workspaceTypeNamePropertyId].value
		+ '" size="12" disabled/></td>';
	
	if (workspace.typeProperties[workspaceTypeBackgroundImagePropertyId]) {
		var workspaceBackgroundImage = workspace.typeProperties[workspaceTypeBackgroundImagePropertyId].value;
		if (workspaceBackgroundImage.filename != "") {
			inputs += '<td><input id="update_workspace_property_backgroundimage" type="file" name="background image" accept="image/*" onchange="GlobalUtils.showImageFile(event, \'' 
				+ workspaceTypeBackgroundImagePropertyId 
				+ '\');" size="6" disabled style="display:inline; width: 180px;"/></td>';
			inputs += '<td><a id="show_image_file_output_'
				+ workspaceTypeBackgroundImagePropertyId
				+ '" type="file" target="_blank" href="';		
			inputs += NodeUtils.convertNodeFilePropertyValueToDataUrl2(workspaceBackgroundImage)
				+ '" class="imgthumb" style="display:inline;"><img id="image_file_output_'
				+ workspaceTypeBackgroundImagePropertyId
				+ '" src="'
				+ NodeUtils.convertNodeFilePropertyValueToDataUrl2(workspaceBackgroundImage)
				+ '" style="display:inline;" height="50" width="50"></a></td>';
			
		} else {
			inputs += '<td><input id="update_workspace_property_backgroundimage" type="file" name="background image" accept="image/*" onchange="GlobalUtils.showImageFile(event, \'' 
				+ workspaceTypeBackgroundImagePropertyId 
				+ '\');" size="6" disabled style="display:inline; width: 180px;"/></td>';
			inputs += '<td><a id="show_image_file_output_'
				+ workspaceTypeBackgroundImagePropertyId
				+ '" type="file" target="_blank" href="';
			inputs += '" class="imgthumb" style="display:none;"><img id="image_file_output_'
				+ workspaceTypeBackgroundImagePropertyId
				+ '" src="" style="display:none;" height="50" width="50"></a></td>';
		}
	} else {
		inputs += '<td><input id="update_workspace_property_backgroundimage" type="file" name="background image" accept="image/*" onchange="GlobalUtils.showImageFile(event, \'' 
			+ workspaceTypeBackgroundImagePropertyId 
			+ '\');" size="6" disabled style="display:inline; width: 180px;"/></td>';
		inputs += '<td><a id="show_image_file_output_'
			+ workspaceTypeBackgroundImagePropertyId
			+ '" type="file" target="_blank" href="';
		inputs += '" class="imgthumb" style="display:none;"><img id="image_file_output_'
			+ workspaceTypeBackgroundImagePropertyId
			+ '" src="" style="display:none;" height="50" width="50"></a></td>';
	}
	
	inputs += '<td><input id="remove_workspace_background_image_button" type="button" value="x" onclick="DisplayLogicalRendererGraph.removeWorkspaceBackgroundImage();" style="display:none;"/></td>';
	
	inputs += '<td><input id="update_workspace_property_width" type="text" name="width" value="'
		+ loadedWorkspaceImageWidth
		+ '" size="10" onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46" disabled style="display:none;"/></td>';
	inputs += '<td><input id="update_workspace_property_height" type="text" name="height" value="'
		+ loadedWorkspaceImageHeight
		+ '" size="10" onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46" disabled style="display:none;"/></td>';
	
	inputs += '<td><input id="update_workspace_property_button" type="button" value="Update" class="btn btn-primary btn-sm" onclick="DisplayLogicalRendererGraph.enableUpdateWorkspaceProperties(\'' + workspaceUuid + '\');"/></td></tr></table>';
	
	var bottomWorkspacePropertyList = document.getElementById("bottom_workspace_property_list");
	bottomWorkspacePropertyList.innerHTML = inputs;
	bottomWorkspacePropertyList.style.display = "";
	
};

DisplayLogicalRendererGraph.enableUpdateWorkspaceProperties = function(workspaceUuid) {	
	document.getElementById("update_workspace_property_name").disabled = false;
	document.getElementById("update_workspace_property_backgroundimage").disabled = false;
	document.getElementById("update_workspace_property_button").outerHTML = '<input id="update_workspace_property_button" type="button" value="Save" class="btn btn-primary btn-sm" onclick="DisplayLogicalRendererGraph.updateWorkspaceProperties(\'' + workspaceUuid + '\');"/>';

	var workspace = workspaceMap[workspaceUuid];
	var workspaceTypeBackgroundImagePropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("backgroundImage");
	if (workspace.typeProperties[workspaceTypeBackgroundImagePropertyId]) {
		var workspaceBackgroundImage = workspace.typeProperties[workspaceTypeBackgroundImagePropertyId].value;
		if (workspaceBackgroundImage.filename != "") {
			document.getElementById("update_workspace_property_width_header").style.display = "";
			document.getElementById("update_workspace_property_height_header").style.display = "";
			document.getElementById("update_workspace_property_width").style.display = "";
			document.getElementById("update_workspace_property_height").style.display = "";
			document.getElementById("update_workspace_property_width").disabled = false;
			document.getElementById("update_workspace_property_height").disabled = false;
			document.getElementById("remove_workspace_background_image_button").style.display = "";
		}
	}
};

DisplayLogicalRendererGraph.disableUpdateWorkspaceProperties = function(workspaceUuid) {	
	document.getElementById("update_workspace_property_name").disabled = true;
	document.getElementById("update_workspace_property_backgroundimage").disabled = true;
	document.getElementById("update_workspace_property_button").outerHTML = '<input id="update_workspace_property_button" type="button" value="Update" class="btn btn-primary btn-sm" onclick="DisplayLogicalRendererGraph.enableUpdateWorkspaceProperties(\'' + workspaceUuid + '\');"/>';

	var workspace = workspaceMap[workspaceUuid];
	var workspaceTypeBackgroundImagePropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("backgroundImage");
	if (workspace.typeProperties[workspaceTypeBackgroundImagePropertyId]) {
		var workspaceBackgroundImage = workspace.typeProperties[workspaceTypeBackgroundImagePropertyId].value;
		if (workspaceBackgroundImage.filename != "") {
			document.getElementById("update_workspace_property_width_header").style.display = "none";
			document.getElementById("update_workspace_property_height_header").style.display = "none";
			document.getElementById("update_workspace_property_width").style.display = "none";
			document.getElementById("update_workspace_property_height").style.display = "none";
			document.getElementById("update_workspace_property_width").disabled = true;
			document.getElementById("update_workspace_property_height").disabled = true;
			document.getElementById("remove_workspace_background_image_button").style.display = "none";
		}
	}
};

DisplayLogicalRendererGraph.updateWorkspaceProperties = function(workspaceUuid) {
	
	var workspace = workspaceMap[workspaceUuid];
	var workspaceTypeNamePropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("name");
	var workspaceTypeBackgroundImagePropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("backgroundImage");	
	var workspaceTypeBackgroundImageWidthPropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("width");
	var workspaceTypeBackgroundImageHeightPropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("height");
	
	var updatedNameProperty = {};
	updatedNameProperty["propertyId"] = workspaceTypeNamePropertyId.toString();
	updatedNameProperty["propertyType"] = "STRING";
	updatedNameProperty["value"] = document.getElementById("update_workspace_property_name").value;
	
	var updatedProperties = [];
	updatedProperties.push(updatedNameProperty);
		
	if (document.getElementById("update_workspace_property_width")) {
		var updatedWidthProperty = {};
		updatedWidthProperty["propertyId"] = workspaceTypeBackgroundImageWidthPropertyId.toString();
		updatedWidthProperty["propertyType"] = "STRING";
		updatedWidthProperty["value"] = document.getElementById("update_workspace_property_width").value;
		updatedProperties.push(updatedWidthProperty);
	}
	
	if (document.getElementById("update_workspace_property_height")) {
		var updatedHeightProperty = {};
		updatedHeightProperty["propertyId"] = workspaceTypeBackgroundImageHeightPropertyId.toString();
		updatedHeightProperty["propertyType"] = "STRING";
		updatedHeightProperty["value"] = document.getElementById("update_workspace_property_height").value;
		updatedProperties.push(updatedHeightProperty);
	}
	
	var backgroundImage = {};
	backgroundImage["propertyId"] = workspaceTypeBackgroundImagePropertyId.toString();
	backgroundImage["propertyType"] = "FILE";
	
	if (document.getElementById("update_workspace_property_backgroundimage").value != "") {
		var file = document.getElementById("update_workspace_property_backgroundimage").files[0];
		backgroundImage["value"] = {};
		backgroundImage["value"]["file"] = document.getElementById('image_file_output_' + workspaceTypeBackgroundImagePropertyId).src.replace("data:" + file.type + ";base64,", "");
		backgroundImage["value"]["filename"] = file.name;
	} else {
		if (isWorkspaceBackgroundImageDeleted == true) {
			backgroundImage["value"] = {};
			backgroundImage["value"]["file"] = "";
			backgroundImage["value"]["filename"] = "";
		}
	}
	
//	if (document.getElementById("update_workspace_property_backgroundimage").value == "" && isWorkspaceBackgroundImageDeleted == true) {
//		backgroundImage["value"] = {};
//		backgroundImage["value"]["file"] = "";
//		backgroundImage["value"]["filename"] = "";
//	} else {
//		var file = document.getElementById("update_workspace_property_backgroundimage").files[0];
//		backgroundImage["value"] = {};
//		backgroundImage["value"]["file"] = document.getElementById('image_file_output_' + workspaceTypeBackgroundImagePropertyId).src.replace("data:" + file.type + ";base64,", "");
//		backgroundImage["value"]["filename"] = file.name;
//	}
	
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

	var nodes = {};
	var nodesOfCy = irvCy.filter('node');
	
	$.each(nodesOfCy, function(key, value) {
		if (!nodes[value.data().sysProperties.uuid.value] && value.data().classification != "WORKSPACE") {
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
	
	var jsonData = {};
	
	jsonData["namespace"] = loggedInUserName;
	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name;
	jsonData["updatedProperties"] = updatedProperties;
	jsonData["backgroundImage"] = backgroundImage;
	jsonData["workspaceNode"] = workspaceNode;
	jsonData["nodes"] = nodes;
	jsonData["edges"] = {};
	
	var successFunction = function(jsonData) {
		console.log("Update Workspace Succeeded!");
			
		DisplayLogicalRendererGraph.disableUpdateWorkspaceProperties(workspaceUuid);
		
//		document.getElementById("update_workspace_property_name").disabled = true;
//		document.getElementById("update_workspace_property_backgroundimage").disabled = true;
//		document.getElementById("update_workspace_property_button").outerHTML = '<input id="update_workspace_property_button" type="button" value="Update" class="btn btn-primary btn-sm" onclick="DisplayLogicalRendererGraph.enableUpdateWorkspaceProperties(\'' + workspaceUuid + '\');"/>';
//		document.getElementById("remove_workspace_background_image_button").style.display = "none";
		
		// update in global var
		// update name in display drop
		// update name in save hover menu
		GlobalNodeUtils.loadAllNodeWorkspaces();
		DisplayLogicalRendererGraph.generateDisplayWorkspaceMenu();

		// update file in background
//		var navBarWidth = document.getElementById("myNavbar").offsetWidth;
//		var navBarHeight = document.getElementById("myNavbar").offsetHeight;
//		
//		var mainWidth = document.getElementById("main").offsetWidth;
//		var mainHeight = document.getElementById("main").offsetHeight;
//		
//		var topBarsWidth = document.getElementById("top_bars").offsetWidth;
//		var topBarsHeight = document.getElementById("top_bars").offsetHeight;
//		
//		var leftBarWidth = document.getElementById("left_bar").offsetWidth;
//		var leftBarHeight = document.getElementById("left_bar").offsetHeight;
//		var rightBarWidth = document.getElementById("right_bar").offsetWidth;
//		var rightBarHeight = document.getElementById("right_bar").offsetHeight;
//		
//		var bottomBarWidth = document.getElementById("bottom_bar").offsetWidth;
//		var bottomBarHeight = document.getElementById("bottom_bar").offsetHeight;
//		
//		var workspaceWidth = document.getElementById("main-content-workingarea").offsetWidth;
//		var workspaceHeight = document.getElementById("main-content-workingarea").offsetHeight;
//		
//		var backgroundPositionX = 0;
//		var backgroundPositionY = topBarsHeight - mainHeight + workspaceHeight;
//		var backgroundWidth = workspaceWidth

		irvCy.remove(irvCy.nodes("[classification='WORKSPACE']"));
		var newElement = irvCy.add(DisplayLogicalRendererGraph.formatWorkspaceNode(workspaceMap[workspaceUuid]), true);
		
		if (workspaceMap[workspaceUuid].typeProperties[workspaceTypeBackgroundImagePropertyId]) {
			
			var workspaceBackgroundImage = workspaceMap[workspaceUuid].typeProperties[workspaceTypeBackgroundImagePropertyId].value;			
			var workspaceTypeBackgroundImageWidth = workspaceMap[workspaceUuid].typeProperties[workspaceTypeBackgroundImageWidthPropertyId];
			var workspaceTypeBackgroundImageHeight = workspaceMap[workspaceUuid].typeProperties[workspaceTypeBackgroundImageHeightPropertyId];
			
			if (workspaceBackgroundImage) {
				irvCy.nodes("[classification='WORKSPACE']").css({'background-image':'url("' + NodeUtils.convertNodeFilePropertyValueToDataUrl2(workspaceBackgroundImage) + '")'});			
				
				$("body").append("<img id='hiddenImage' src='" + NodeUtils.convertNodeFilePropertyValueToDataUrl2(workspaceBackgroundImage) + "'>");
				setTimeout(function() {
					
					var width = document.getElementById('hiddenImage').width; 
					var height = document.getElementById('hiddenImage').height;
					
					if (workspaceTypeBackgroundImageWidth && workspaceTypeBackgroundImageWidth.value != "null") {
						width = workspaceTypeBackgroundImageWidth.value;
					}
					
					if (workspaceTypeBackgroundImageHeight && workspaceTypeBackgroundImageHeight.value != "null") {
						height = workspaceTypeBackgroundImageHeight.value;
					}

					loadedWorkspaceImageWidth = width
					loadedWorkspaceImageHeight = height;
					
					if (document.getElementById("update_workspace_property_width")) {
						document.getElementById("update_workspace_property_width").value = width;
					}
					if (document.getElementById("update_workspace_property_height")) {
						document.getElementById("update_workspace_property_height").value = height;
					}
					
					$("#hiddenImage").remove();
					irvCy.nodes("[classification='WORKSPACE']").css({'width':width});
					irvCy.nodes("[classification='WORKSPACE']").css({'height':height});
				}, 10);	
				
//				$("#irvCy").css("background-position-x", backgroundPositionX.toString() + "px");
//				$("#irvCy").css("background-position-y", backgroundPositionY.toString() + "px");
//				$("#irvCy").css("background-size", backgroundWidth.toString() + "px " + backgroundHeight.toString() + "px");
//				$("#irvCy").css("background-repeat", "no-repeat");
//				$("#irvCy").css("background-size", "cover");
			}
		}
		
		// update name in HB
		document.getElementById("hb_workspace_" + workspaceUuid).innerHTML = '<a href="#">' + workspaceMap[workspaceUuid].typeProperties[workspaceTypeNamePropertyId].value + ' > </a>';
	
		isWorkspaceBackgroundImageDeleted = false;
		
	};

	var failFunction = function(xhr, status, error) {
		CommonFctsLogical.HandlingErrorMSG("Failed to update workspace properties: ", "error");
		console.error("Error: " + xhr.status);
	};

	var apis = new WorkspaceApis();
	apis.updateWorkspace(jsonData, successFunction, failFunction);
	
	DisplayLogicalRendererGraph.updateWorkspaceGraph(workspaceUuid);
	
//	nodes = {};
//	nodesOfCy = irvCy.filter('node');
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
//	
//	workspaceNode = {
//			typeIds: [workspaceMap[workspaceUuid].typeId],
//			sysProperties: {
//				uuid: {
//					propertyName: "uuid",
//					propertyType: "STRING",
//					value: workspaceUuid
//				}
//			}
//	}
//
//	var jsonstr = {
//		workspaceNode : workspaceNode,
//		nodes : nodes,
//		edges : {},
//		grouphost : userGroup.host,
//		groupname : userGroup.name,
//		namespace : loggedInUserName
//	};
//
//	var successFunction = function(data) {
//		console.log("Save Workspace Succeeded!");
//	};
//
//	var failFunction = function(xhr, status, error) {
//		CommonFctsLogical.HandlingErrorMSG("Save Workspace Error: " + xhr.status, "error");
//		$('#console-log').append("<p style='color:red'>Save Workspace Error: " + xhr.status + "</p>");
//		console.log("Save Workspace Error: " + xhr.responseText);
//	};
//
//	var workspaceApis = new WorkspaceApis();
//	workspaceApis.updateWorkspace(jsonstr, successFunction, failFunction);
			
};

DisplayLogicalRendererGraph.updateWorkspaceGraph = function(workspaceUuid) {
	
	if (workspaceUuid == null) {
		return;
	}
	
	var nodes = {};
	var nodesOfCy = irvCy.filter('node');
	
	$.each(nodesOfCy, function(key, value) {
		if (!nodes[value.data().sysProperties.uuid.value] && value.data().classification != "WORKSPACE") {
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
		nodes : nodes,
		edges : {},
		grouphost : userGroup.host,
		groupname : userGroup.name,
		namespace : loggedInUserName
	};

	var successFunction = function(data) {
		console.log("Save Workspace Succeeded!");
	};

	var failFunction = function(xhr, status, error) {
		CommonFctsLogical.HandlingErrorMSG("Save Workspace Error: " + xhr.status, "error");
		$('#console-log').append("<p style='color:red'>Save Workspace Error: " + xhr.status + "</p>");
		console.log("Save Workspace Error: " + xhr.responseText);
	};

	var workspaceApis = new WorkspaceApis();
	workspaceApis.updateWorkspace(jsonstr, successFunction, failFunction);
	
};

DisplayLogicalRendererGraph.saveWorkspaceNodePosition = function(workspaceUuid) {
	
	if (workspaceUuid == null) {
		return;
	}
	
	var workspaceNode = irvCy.nodes("[classification='WORKSPACE']")[0];
	
	var sysProperties = []
	sysProperties.push({ name: "uuid", id: "uuid", propertyType:"STRING", value: workspaceUuid});
	                                  
	var newDecoProperties = [];
	newDecoProperties.push({propertyName: "x", value: workspaceNode.position().x.toString(), propertyType:"DOUBLE", id: predefinedSelectedDecoPropertiesMap["x"].id.toString()});
	newDecoProperties.push({propertyName: "y", value: workspaceNode.position().y.toString(), propertyType:"DOUBLE", id: predefinedSelectedDecoPropertiesMap["y"].id.toString()});
	newDecoProperties.push({propertyName: "z", value: "0", propertyType:"DOUBLE", id: predefinedSelectedDecoPropertiesMap["z"].id.toString()});

	var jsonstr = {
			typeId: Number(workspaceMap[workspaceUuid].typeId),
			sysProperties: sysProperties,
			newDecoProperties: newDecoProperties, 
			decorators       : workspaceMap[workspaceUuid].decorators,
			grouphost: userGroup.host,
			groupname: userGroup.name,
			namespace: loggedInUserName
	};
	

	var successFunction = function( data ) {
		workspaceMap[workspaceUuid].decoProperties = data.node.decoProperties;
	};
	
	var failFunction = function( xhr, status, error ) {
		CommonFctsLogical.HandlingErrorMSG("Cannot Save Graph Position " + xhr.status, "error");
		$('#console-log').append("<p style='color:red'>Cannot Save Graph Position " + xhr.status + "</p>");
		console.log("Save position error: "+ xhr.responseText);
	};
	
	var apis = new NodeApis();
	apis.updateNode(jsonstr, successFunction, failFunction);	

};

DisplayLogicalRendererGraph.clearLoadedWorkspace = function() {
	
	if (irvCy) {
		irvCy.remove(irvCy.elements());
	}
	
	var bottomWorkspacePropertyList = document.getElementById("bottom_workspace_property_list");
	bottomWorkspacePropertyList.innerHTML = "";
	bottomWorkspacePropertyList.style.display = "none";
	
};

DisplayLogicalRendererGraph.removeWorkspaceBackgroundImage = function() {

	document.getElementById("update_workspace_property_backgroundimage").value = "";
	
	isWorkspaceBackgroundImageDeleted = true;
	
	var workspaceTypeBackgroundImagePropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("backgroundImage");
	document.getElementById("show_image_file_output_" + workspaceTypeBackgroundImagePropertyId).href = "";
	document.getElementById("show_image_file_output_" + workspaceTypeBackgroundImagePropertyId).style.display = "none";
	document.getElementById("image_file_output_" + workspaceTypeBackgroundImagePropertyId).src = "";
	document.getElementById("image_file_output_" + workspaceTypeBackgroundImagePropertyId).style.display = "none";
	
};

DisplayLogicalRendererGraph.buildWorkspaceListForNode = function(nodeUuid) {

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
	inputs += "<tr><th><select id='workspace_for_node_list' onchange='DisplayLogicalRendererGraph.generateWorkspace(this.value)'><option></option>";

	$.each(nodeWorkspaceNodeList, function(key, workspace) {
		inputs += "<option value='" + workspace.sysProperties.uuid.value + "'>" + workspace.typeProperties[workspaceTypeNamePropertyId].value + "</option>";
	});
	
	inputs += "</select></th></tr></table></form>";

	form.innerHTML = inputs;	
	(new DisplayLogicalRenderer()).emptyAllInst();
	$('#nodeForm').append(form);
	
};

DisplayLogicalRendererGraph.getWorkspaceBasedOnNode = function(nodeUuid) {

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


