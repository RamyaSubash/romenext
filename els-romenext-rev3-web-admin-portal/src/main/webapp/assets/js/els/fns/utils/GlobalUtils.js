function GlobalUtils() {

}

GlobalUtils.clearGlobalSelected = function() {

	listTypeIds = [];
	listConnIds = [];
	selectedRuleIds = [];

};

GlobalUtils.setGlobalTypeSelected = function(typeId) {

	// clear the current list
	listTypeIds = [];

	if (typeId instanceof Array) {
		listTypeIds = typeId;
	} else {
		// just a single
		listTypeIds.push(typeId);
	}
};

GlobalUtils.setGlobalInstSelected = function(uuid) {

	// clear the current list
	listInstUuids = [];

	if (uuid instanceof Array) {
		listInstUuids = uuid;
	} else {
		// just a single
		listInstUuids.push(uuid);
	}
};

GlobalUtils.isTypeMapViaIdSet = function() {

	// attempt to use jquery to check if this is empty
	if (jQuery.isEmptyObject(typeMapViaId)) {
		return false;
	}

	return true;

};

GlobalUtils.loadAllTypeAndConnections = function() {
	var jsonData = {};
	
	jsonData["namespace"] = loggedInUserName;
	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name;

	var successFunction = function(jsonData) {
		GlobalUtils.buildTypeAndConnVars(jsonData);
	};

	var failFunction = function(xhr, status, error) {
//		$('#console-log').append("<p style='color:blue'>Failed to load types and connections: "	+ xhr.status + "</p>");
		CommonFctsLogical.HandlingErrorMSG("Failed to load types and connections:","error");
		console.error("Error: " + xhr.status);
	};

	var apis = new apiRomeNext();
	apis.getAllTypesAndConnections(jsonData, successFunction, failFunction);

}
GlobalUtils.loadAllDCT = function() {
	var jsonData = {};
	jsonData["namespace"] = loggedInUserName;
	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name;

	var successFunction = function(jsonData) {
		$.each(jsonData.dcts, function(key, value) {
			
			value.nb = 0;
			GlobalUtils.setColorAnSizeforType(value);
			value.color  = currentColor;
			value.size   = currentSize;
			if (!typeMapViaId[value.id]) {
				typeMap[value.name] = value;
				typeMapViaId[value.id] = value;
			}		
		});

	};

	var failFunction = function(xhr, status, error) {
//		$('#console-log').append("<p style='color:blue'>Failed to load types and connections: "	+ xhr.status + "</p>");
		CommonFctsLogical.HandlingErrorMSG("Failed to load types and connections:","error");
		console.error("Error: " + xhr.status);
	};

	var apis = new apiRomeNext();
	apis.getAllDCTs(jsonData, successFunction, failFunction);

}

GlobalUtils.loadAllRules = function() {
	// call using new API
	var ruleApis = new RuleApis();
	
	var jsonData = {};
	jsonData["namespace"] = loggedInUserName;
	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name;
	
	var successFunction = function(data1) {
		GlobalUtils.buildRuleVars(data1);
	}

	var failFunction = function(xhr, status, error) {
		CommonFctsLogical.HandlingErrorMSG("Failed to load rules:","error");
		console.error("Error: " + xhr.status);
	};

	ruleApis.getAllRules(jsonData, successFunction, failFunction);
	
	var successFunctionLink = function(data2) {
		$.each(data2, function(key, value) {
			if (!ruleMapViaId[value.id]) {
				ruleMapViaId[value.id] = value;
				ruleMap[value.name] = value;
			}else {
				ruleMapViaId[value.id].decoProperties = value.decoProperties;
				ruleMap[value.name].decoProperties = value.decoProperties;
			}
		});
	}

	var failFunctionLink = function(xhr, status, error) {
		CommonFctsLogical.HandlingErrorMSG("Failed to load links:","error");
		console.error("Error: " + xhr.status);
	};

	ruleApis.getLinkRules( jsonData, successFunctionLink, failFunctionLink);

}

//GlobalUtils.loadAllConnections = function() {
//	
//	var jsonData = {};
//	jsonData["namespace"] = loggedInUserName;
//	jsonData["grouphost"] = userGroup.host;
//	jsonData["groupname"] = userGroup.name;
//	
//
//	var successFunction = function(jsonData) {
//		if (!jQuery.isEmptyObject(jsonData)	&& !jQuery.isEmptyObject(jsonData.connections)) {
//			console.log(jsonData.connections)
//			connMap = {};
//			connMapViaId = {};
//			var connBase = {};
//			$.each(jsonData.connections, function(key, value) {
//				connBase = GlobalUtils.createDesignConnMap(value);
//				connBase = {};
//			});
//
//		} else {
//			// retrieval of connections failed
//			CommonFctsLogical.HandlingErrorMSG("Retrieval successful but did not return Updated Connections  after Assign Type to Link","error");
//		}
//
//	};
//
//	var failFunction = function(xhr, status, error) {
//		console.error("Error: " + xhr.status);
//
//		CommonFctsLogical.HandlingErrorMSG("Retrieval of Updated Connections Failed after Assign Type to Link",	"error");
//	};
//
//	var apis = new apiRomeNext();
//	apis.getAllTypesAndConnections(jsonData, successFunction, failFunction);
//
//}

GlobalUtils.freshAllTypeAndConnections = function() {
	
	var jsonData = {};
	jsonData["namespace"] = loggedInUserName;
	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name;
	

	var successFunction = function(jsonData) {
		GlobalUtils.buildTypeAndConnVars(jsonData);
	};

	var failFunction = function(xhr, status, error) {
		$('#console-log').append("<p style='color:blue'>Failed to load types and connections: "	+ xhr.status + "</p>");
		console.error("Error: " + xhr.status);
	};

	var apis = new apiRomeNext();
	apis.getAllTypesAndConnections(jsonData, successFunction, failFunction);

}

GlobalUtils.buildTypeAndConnVars = function(jsonData) {

	typeMap = {};
	typeMapViaId = {};

	$.each(jsonData.types, function(key, value) {
		value.nb = 0;
		GlobalUtils.setColorAnSizeforType(value);
		value.color = currentColor;
		value.size = currentSize;
		if (!typeMapViaId[value.id]) {
			typeMap[value.name] = value;
			typeMapViaId[value.id] = value;
		}
	});

	connMap = {};
	connMapViaId = {};
	var connBase = {};
	
	$.each(jsonData.connections, function(key, value) {
		connBase = GlobalUtils.createInternalConnMap(value);
		connBase = {};

	});

};

GlobalUtils.buildRuleVars = function(jsonData) {

	ruleMap = {};
	ruleMapViaId = {};

	$.each(jsonData, function(key, value) {
		if (!ruleMapViaId[value.id]) {
			ruleMapViaId[value.id] = value;
			ruleMap[value.name] = value;
		}
	});

};

GlobalUtils.createInternalConnMap = function(apiJson) {
	
	// verify minRel and maxRel  if they have values
		var min = null;
		var max = null;
		if(apiJson.minRel) {min = apiJson.minRel};
		if(apiJson.maxRel) {min = apiJson.maxRel};
	var connBase = {
		name           : apiJson.name,
		id             : apiJson.id,
		classification : apiJson.classification,
		origin         : apiJson.origin,
		destination    : apiJson.destination,
		source         : apiJson.originId,
		target         : apiJson.destinationId,
		minRel         : min,
		maxRel         : max,
		rule           : apiJson.ruleName,
		ruleId         : apiJson.ruleId,
		properties     : apiJson.properties,
	};

	if (!connMapViaId[apiJson.id]) {       // in case of a new connection
		connMap[apiJson.name] = connBase;
		connMapViaId[apiJson.id] = connBase;
	} else {                               // in case of update connection
		connMap[apiJson.name] = connBase;
		connMapViaId[apiJson.id] = connBase;
	}
	return connBase;

}

GlobalUtils.findPCRule = function(origin, destination) {
	for ( var conn in connMap) {
		if (connMap[conn].source == origin
				&& connMap[conn].target == destination) {
			var ruleId = connMap[conn].ruleId;
			if (ruleMapViaId[ruleId].classification == 'parentchild') {
				return true;
			} else
				return false;
		}
	}
	return false;
}

GlobalUtils.findLinkRule = function(origin, destination) {
	for ( var conn in connMap) {
		if ((connMap[conn].source == origin && connMap[conn].target == destination)
				|| (connMap[conn].source == destination && connMap[conn].target == origin)) {
			var ruleId = connMap[conn].ruleId;
			if (ruleMapViaId[ruleId].classification == 'link') {
				return true;
			} else
				return false;
		}
	}
	return false;
}

GlobalUtils.getRuleId = function(origin, destination) {
	var ruleId = null;
	$.each(connMapViaId, function(key, value) {
		if (value.source == origin && value.target == destination) {
			if (connMapViaId[ruleId].classification == 'parentchild') {
				return value.ruleId;
			} else {
				return ruleId
			}
		}
	});
	return ruleId;
}

GlobalUtils.cursor_clear = function() {
	document.body.style.cursor = 'default';
};

GlobalUtils.cursor_wait = function() {
	document.body.style.cursor = 'crosshair';
};

GlobalUtils.cursor_create = function(){
	document.body.style.cursor = "copy";
}

GlobalUtils.retrieveImgname = function(img) {
	var file = img.src;
	var i = file.lastIndexOf("/") + 1;
	var pathimg = file.substr(i);
	return pathimg;
};

GlobalUtils.generateBreadcrumb = function(deco) {
	var list = '';
	list += "<li><i class='fa fa-home'></i><a href='romenextgui-design.jsp'>Home</a><i class='fa fa-angle-right'></i></li>";
	list += "<li><i class=''></i>";

	if (topLevelTab == "typeDesignViewTab") {
		list += "<a href='#'> Design(" + deco + ")";
		if (listTypeIds.length != 0) {
			list += " > " + typeMapViaId[listTypeIds[0]];
		}
	} else if (topLevelTab == "instRelViewTab") {
		list += "<a href='#'> Instance(" + deco + ")";
		if (listTypeIds.length != 0) {
			list += " > " + typeMapViaId[listTypeIds[0]];
		}
	} else if (topLevelTab == "pathInstanceViewTab") {
		list += "<a href='#'>Path Instance";
	}

	// if(listTypeIds.length != 0 ) { list += " > "+
	// typeMapViaId[listTypeIds[0]];}

	list += "</a></li>";
	document.getElementById('breadcrumb').innerHTML = list;
}

GlobalUtils.findDecosProperties = function(selectedDeco) {
	var props = [];
	if (!$.isEmptyObject(decoMapViaId)) {
		$.each(decoMapViaId, function(key, value) {
			if (value.name == selectedDeco) {
				props = value.decoProps;
				return false;
			}
		});
		return props;
	} else {
		console.log(" no decorators  provided ");
		return props;
	}
}

GlobalUtils.findDecoPropId = function(typeId, decoId, param) {
	if (!typeId) {
		console.log("Error  missing type Id ");
		return null;
	}
	if (!decoId) {
		console.log("Error  missing deco Id ");
		return null;
	}

	var props = typeMapViaId[typeId].decoProperties;
	var romeDecoId = null;
	if ($.isEmptyObject(props)) {
		console.log(" no decorators  provided ");
		return romeDecoId;
	}
	$.each(props, function(key, value) {
		if (value.name == param) {
			romeDecoId = value.romeDecoPropId;
			return false;
		}
	});
	return romeDecoId;
}

GlobalUtils.callLogoutServlet = function() {
	var transferData = document.getElementById("hidden_info");

	document.getElementById("transfer_user_group_host").value = userGroup.host;
	document.getElementById("transfer_user_group_name").value = userGroup.name;
	document.getElementById("transfer_user_name").value = loggedInUserName;
	$("#hidden_info").attr("action", "/webguiportal/logout");
	transferData.submit();
}

GlobalUtils.callDesignDisplayServlet = function() {
	var transferData = document.getElementById("hidden_info");
	document.getElementById("transfer_meta").value = selectedMetaData;
	// document.getElementById("transfer_deco").value = selecteddecorator;
	document.getElementById("transfer_user_group_host").value = userGroup.host;
	document.getElementById("transfer_user_group_name").value = userGroup.name;
	document.getElementById("transfer_user_name").value = loggedInUserName;

	if (startNodeForLinking != null) {
		document.getElementById("start_node_for_linking_type_id").value = startNodeForLinking.typeId;
		document.getElementById("start_node_for_linking_type_name").value = startNodeForLinking.typeName;
		document.getElementById("start_node_for_linking_name").value = startNodeForLinking.name;
		document.getElementById("start_node_for_linking_uuid").value = startNodeForLinking.uuid;
	}

	if (endNodeForLinking != null) {
		document.getElementById("end_node_for_linking_type_id").value = endNodeForLinking.typeId;
		document.getElementById("end_node_for_linking_type_name").value = endNodeForLinking.typeName;
		document.getElementById("end_node_for_linking_name").value = endNodeForLinking.name;
		document.getElementById("end_node_for_linking_uuid").value = endNodeForLinking.uuid;
	}

	document.getElementById("transfer_typelist_length").value = listTypeIds.length;
	var inputs = "";
	if (listTypeIds.length >= 1) {
		for (var i = 0; i < listTypeIds.length; i++) {
			inputs += "<td><input name='type_id_" + i + "' value='"
					+ listTypeIds[i] + "'></td>";
		}
	}
	$('#hidden_info').append(inputs);

	document.getElementById("transfer_connlist_length").value = listConnIds.length;
	inputs = "";
	if (listConnIds.length >= 1) {
		for (var i = 0; i < listConnIds.length; i++) {
			inputs += "<td><input name='conn_id_" + i + "' value='"
					+ listConnIds[i] + "'></td>";
		}
	}
	$('#hidden_info').append(inputs);

	transferData.submit();

};

GlobalUtils.callDesignPhysicalServlet = function() {
	var transferData = document.getElementById("hidden_info_physical");
	document.getElementById("transfer_meta1").value = selectedMetaData;
	document.getElementById("transfer_user_group_host1").value = userGroup.host;
	document.getElementById("transfer_user_group_name1").value = userGroup.name;
	document.getElementById("transfer_user_name1").value = loggedInUserName;

	document.getElementById("transfer_user_type1").value = listTypeIds[0];

	// document.getElementById("transfer_deco").value = selecteddecorator;
	// document.getElementById("transfer_typelist_length").value =
	// listTypeIds.length
	// var inputs = "";
	// if (listTypeIds.length >= 1) {
	// for (var i = 0; i < listTypeIds.length; i++) {
	// inputs += "<td><input name='type_id_"+i+"'
	// value='"+listTypeIds[i]+"'></td>";
	// }
	// }
	// $('#hidden_info').append(inputs);
	//	
	// inputs = "";
	// document.getElementById("transfer_connlist_length").value =
	// listConnIds.length
	// if (listConnIds.length >= 1) {
	// for (var i = 0; i < listConnIds.length; i++) {
	// inputs += "<td><input name='conn_id_"+i+"'
	// value='"+listConnIds[i]+"'></td>";
	// }
	// }
	// $('#hidden_info').append(inputs);
	transferData.submit();

};

GlobalUtils.createDesignConnMap = function(apiJson) {
	var found = false;
	for ( var key in connMapViaId) {
		if (apiJson.classification == "link" && connMapViaId[key].ruleId == apiJson.ruleId) {
			if (connMapViaId[key].source == apiJson.destinationId && connMapViaId[key].target == apiJson.originId && apiJson.originId != apiJson.destinationId ) {
				found = true;
				break;
			}
		}
	}
	if (!found) {
		connBase = {
			name : apiJson.name,
			id : apiJson.id,
			classification : apiJson.classification,
			origin : apiJson.origin,
			destination : apiJson.destination,
			source : apiJson.originId,
			target : apiJson.destinationId,
			minRel : apiJson.minRel.toString(),
			maxRel : apiJson.maxRel.toString(),
			rule : apiJson.ruleName,
			ruleId : apiJson.ruleId,
			properties : apiJson.properties,
		};

		if (!connMapViaId[apiJson.id]) { // in case of a new connection
			connMap[apiJson.name] = connBase;
			connMapViaId[apiJson.id] = connBase;
		} else { // in case of update connection
			connMap[apiJson.name] = connBase;
			connMapViaId[apiJson.id] = connBase;
		}
		return connBase;
	} else {
		return null;
	}

}

GlobalUtils.loadAllModels = function() {

	var jsonData = {};

	jsonData['namespace'] = loggedInUserName;
	jsonData['typeName'] = typeMapViaId[listTypeIds[0]].name;
	// jsonData['repoid'] = Number(selectedMetaData);
	jsonData['metaid'] = Number(selectedMetaData);

	console.log(jsonData);

	if (listTypeIds.length == 0 || typeMapViaId.length == 0) {
		console.warning(" No curType value; no loading for model;");
		$('#console-log')
				.append(
						"<p style='color:red'> No curType value; no loading for model;</p>");
		return;
	}

	var doneFunction = function(data) {
		$('#console-log').append(
				"<p style='color:blue'>loaded models for selected Type:</p>");
		// set the current workspace models as this type model
		curModels = data.models;
	};

	var failFunction = function(xhr, status, error) {
		$('#console-log').append(
				"<p style='color:red'> failed to load models :" + xhr.status
						+ "</p>");
		console.error('failed to load models : ' + xhr.status);
	};

	var apis = new shapeApis();
	apis.getModels(jsonData, doneFunction, failFunction);

};

// Update number of Instances for each type
GlobalUtils.initTypeNB = function(source) {

	for (var i = 0; i < typeMapViaId.length; i++) {
		typeMapViaId[i].nb = 0;
	}

	var element;
	if (source != null) {
		$.each(source, function(key, value) {
			element = value.type;
			typeMap[element].nb = typeMap[element].nb + 1;
			typeMapViaId[value.typeId].nb += 1;
		});
	}
}

GlobalUtils.getCoordinate = function(value, param, from) {
	if (from == null) {
		for ( var key in value) {
			if (value[key].name == param) {
				return Number(value[key].value);
			}
		}
	} else {
		var id = GlobalUtils.findDecoPropId(from, '1', param);
		for ( var key in value) {
			if (value[key].id == id) {
				return Number(value[key].value);
			}
		}
	}
	return 0;
}

GlobalUtils.getDecoId = function(value, param) {
	if (!$.isEmptyObject(value) && param != null) {
		for ( var key in value) {
			if (value[key].name == param) {
				return Number(key);
			}
		}
	}
	return 0;
}

GlobalUtils.addNBTypeInstances = function(data) {

	var elementId = data.typeId;
	typeMapViaId[elementId].nb += 1;

}

GlobalUtils.resetNBType = function(typeid) {
	typeMapViaId[typeid].nb = 0;

}

GlobalUtils.isDate = function(dateArg) {

	var t = (dateArg instanceof Date) ? dateArg : (new Date(dateArg));
	return !isNaN(t.valueOf());
}

GlobalUtils.showFile = function(event, showElementId) {

	var input = event.target;
	var file = input.files[0];

	var reader = new FileReader();
	reader.onload = function() {
		var dataURL = reader.result;

		if (file.type.includes("image/")) {
			var output = document.getElementById("image_file_output_"
					+ showElementId);
			output.src = dataURL;
			output.style.display = "";
			var output2 = document.getElementById("show_image_file_output_"
					+ showElementId);
			output2.href = dataURL;
			output2.style.display = "";
			document.getElementById("other_file_output_" + showElementId).style.display = "none";
		} else {
			var output = document.getElementById("other_file_output_"
					+ showElementId);
			output.href = dataURL;
			output.download = file.name;
			output.innerHTML = file.name;
			output.style.display = "";
			document.getElementById("image_file_output_" + showElementId).style.display = "none";
			document.getElementById("show_image_file_output_" + showElementId).style.display = "none";
		}

	};
	reader.readAsDataURL(input.files[0]);

};

GlobalUtils.simulateClick = function(text) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false,
			false, false, false, 0, null);
	text.dispatchEvent(evt);
}

GlobalUtils.unique = function(list) {
	var result = [];
	$.each(list, function(i, e) {
		if ($.inArray(e, result) == -1)
			result.push(e);
	});

	result = jQuery.grep(result, function(value) {
		return value != undefined;
	});

	return result;
}

GlobalUtils.switchPathTab = function() {

	console.log(selecteddecorator);
	// DisplayInterfaceUtils.resetInterface();
	$("#pathView").trigger('click');

	// call your main function here
	(new PathLogicalRenderer()).initView();

}

GlobalUtils.switchDesignDeco = function() {
	console.log(selecteddecorator);

	DisplayInterfaceUtils.resetInterface();
	$("#DecoDesignView").trigger('click');
	// call your main function here
	(new DesignDecoRenderer()).main();
}

GlobalUtils.switchDisplayTab = function() {

	$("#DecoDesignView").trigger('click');
	// call your main function here

	(new DisplayLogicalRenderer()).initView();

}

GlobalUtils.findTabAction = function(id) {
	var result = '', found = false;
	for (var i = 0; i < actionTable.length; i++) {
		if (actionTable[i].id == id) {
			result = actionTable[i];
			found = true;
			break;
		}
	}
	return result;
}

GlobalUtils.loadAllTabs = function() {
	var result;
	var doneFunction = function(data) {
		if (!$.isEmptyObject(data) && data.success) {
			result = data.tabs;
		}
	};

	var failFunction = function(xhr, status, error) {
		console.log('Error getting the Tab  ' + xhr.status);
		$('#console-log').append(
				"<p style='color:red'>Error getting the Tab :" + xhr.status
						+ "</p>");
	};
	var api = new TabDecoApi();
	api.loadAllTabs(doneFunction, failFunction);
	return result;
}

GlobalUtils.generateAllTAbs = function(tabs) {
	var tabName, index, script;
	tab_table = [];
	for (var i = 0; i < tabs.length; i++) {
		tabName = tabs[i].tabName;
		index = tabs[i].id;
		script = tabs[i].tabAction.onclickScript;
		if (document.getElementById(tabName + 'PaneView') == undefined
				|| document.getElementById(tabName + 'PaneView') == null) {
			DesignDecoUtils.generatingNewTab(tabName, index, script);
		}
		tab_table[i] = tabs[i];
	}
};

GlobalUtils.getNodeColor = function(type) {
	var prefs = [], color;
	var ind = 0;
	color = defaultNodeColor;

	prefs = type.prefProperties;
	$.each(prefs, function(key, value) {
		if (value.name == 'color') {

			if (value.hasOwnProperty('value')) {
				ind = value.value;
			} else {
				ind = value.defaultValue;
			}
			color = arrayPreColor[ind];
			return false;
		}
	});

	return color;
}

GlobalUtils.setColorAnSizeforType = function(type) {
	currentColor = defaultNodeColor;
	currentSize = defaultTypeSize;
	currentIdxColor = 0;
	currentIdxSize = 0;

	var prefs = type.prefProperties;
	if (!$.isEmptyObject(prefs)) {
		$.each(prefs, function(key, value) {
			if (value.name == 'size' && value.value) {
				currentSize = arrayPreSize[Number(value.value)];
				currentIdxSize = value.value;
			}
			;
			if (value.name == 'color' && value.value) {
				currentColor = arrayPreColor[Number(value.value)];
				currentIdxColor = value.value;
			}
			;
		});

	}
}

GlobalUtils.setActiveRule = function(node) {
	// node has the rule
	$(".circleColor").css("border-color", "black");
	$(".typenode").css("border-color", "black");
	
	// get All bar status
	var listChildNodes = {};
	var listLinks = {};
	    listLinks[node.id] = ruleMapViaId[node.id];
	var listConns = {};
	for ( var key in connMapViaId) {
		var conn = connMapViaId[key];
		if (conn.classification != "parentchild") {
			if (conn.ruleId == Number(node.id)) {
				listChildNodes[conn.target] = typeMapViaId[conn.target];
				listChildNodes[conn.source] = typeMapViaId[conn.source];
				listConns[conn.id] = conn;
			}
		} 
	}
	console.log(listChildNodes);
		
	DesignLogicalBarRender.barSelection ( listChildNodes, "typelist", "typeslist", "totalNodes" , "node"  );
	DesignLogicalBarRender.barSelection ( listChildNodes, "pathlist", "pathslist", "totalPaths" , "path"   );
	DesignLogicalBarRender.barSelection ( listChildNodes, "systemlist", "systemslist", "totalSystems" , "system"   );
				
//	$.each( listChildNodes, function(key, value) {		 
////		 tdvCy.$('#'+value.id).style("border-color", "#CC1430");
//		 tdvCy.filter("node[id='" + value.id + "']").select();
//	});
//	
//	$.each( listConns, function(key, value) {			
//			tdvCy.filter("edge[id='connection" + value.id + "']").select();
//	});
		
	var nblinks = DesignLogicalBarRender.buildRuleBar(listLinks, "linklist", "linkslist", "totalLinks" , "link");
	if( nblinks == 0 ){
		var ele     = document.getElementById("link_img");
		var state   = ele.getAttribute("data-state");
		if( state == "visible"){	
			document.getElementById("linklist").style.display = "none";	
//			DesignLogicalBarRender.turnOffBar("linklist");
			DesignLogicalBarRender.turnOffButton ("link_img", "LINK");
			DesignLogicalBarRender.turnOffTypes('link');
		}	
	}
	 document.getElementById("rule_"+node.id).style.border = "solid red";
	 tdvCy.filter("node[id='rule" + node.id + "']").select();
//	 tdvCy.$('#rule'+node.id).style("border-color", "#CC1430");
	
	 $("#active_type").empty();
	 $("#active_type").append("<span class='badge' style='color:black;' id='selTypeId_" + node.id + "'>"	+ node.name + "</span>");
		
	
}
	
GlobalUtils.setActiveType = function(node) {

	var ele  = document.getElementById(node.id);
	
    // remove all previously highlighted size and color
	$(".circleColor").css("border-color", "black");
	$(".typenode").css("border-color", "black");

	// get the size and color of selected type
	GlobalUtils.setColorAnSizeforType(node)
	$("#color_" + currentIdxColor).css("border-color", "red");
	$("#size_" + currentIdxSize).css("border-color", "red");
	
	var listChildNodes = {};
	listChildNodes[node.id] = typeMapViaId[node.id];
	var listLinks = {};
	var listConns = {};
	for ( var key in connMapViaId) {
		var conn = connMapViaId[key];
		if (conn.classification == "parentchild") {
			if (conn.source == Number(node.id)) {
				listChildNodes[conn.target] = typeMapViaId[conn.target];
				listConns[conn.id] = conn;
			}else if( conn.target == Number(node.id )){
				listChildNodes[conn.source] = typeMapViaId[conn.source];
				listConns[conn.id] = conn;
			}
		} else {
			if (conn.source == Number(node.id)) {
				listChildNodes[conn.target] = typeMapViaId[conn.target];
				listConns[conn.id] = conn;
				listLinks[conn.ruleId] = ruleMapViaId[conn.ruleId];
			} else if (conn.target == Number(node.id)) {
				listChildNodes[conn.source] = typeMapViaId[conn.source];
				listConns[conn.id] = conn;
				listLinks[conn.ruleId] = ruleMapViaId[conn.ruleId];
			}
		}
	}
	console.log(listChildNodes);
	if( node.classification != 'DCT'){
		
		DesignLogicalBarRender.barSelection ( listChildNodes, "typelist", "typeslist", "totalNodes" , "node"  );
		DesignLogicalBarRender.barSelection ( listChildNodes, "pathlist", "pathslist", "totalPaths" , "path"   );
		DesignLogicalBarRender.barSelection ( listChildNodes, "systemlist", "systemslist", "totalSystems" , "system"   );
		document.getElementById(node.id).style.border = "solid red";
	
		var nblinks = DesignLogicalBarRender.buildRuleBar(listLinks, "linklist", "linkslist", "totalLinks" , "link");
		if( nblinks == 0 ){
			var ele     = document.getElementById("link_img");
			var state   = ele.getAttribute("data-state");
			if( state == "visible"){	
				document.getElementById("linklist").style.display = "none";	
//				DesignLogicalBarRender.turnOffBar("linklist");
				DesignLogicalBarRender.turnOffButton ("link_img", "LINK");
				DesignLogicalBarRender.turnOffTypes('link');
			}	
		}	
	}	
	$("#active_type").empty();
	$("#active_type").append("<span class='badge' style='color:black; background:"+ currentColor + ";' id='selTypeId_" + node.id + "'>"	+ node.name + "</span>");
	
	
							
//	$.each( listChildNodes, function(key, value) {
//	  tdvCy.filter("node[id='" + value.id + "']").select();
//});	
//$.each( listConns, function(key, value) {
//	 tdvCy.filter("edge[id='connection" + value.id + "']").select();
//});	
	
	
//	$.each( listLinks, function(key, value) {
//		  tdvCy.filter("node[id='rule" + value.id + "']").select();
//	});	
		
	// /highlight node in bar


	

}

GlobalUtils.setActiveNode = function(node) {
	$("#active_type").empty();
	var cyId = node.data().id;
	var myNode = nodeMap[node.data().sysProperties.uuid.value];
	var nUuid = NodeUtils.findUUID(myNode);
	var name = NodeUtils.findNameInst(myNode);
	$("#active_type").append("<span class='badge' id='selNodeUuid_" + cyId + "'  data-uuid = '"+ nUuid + "'>" + name + "</span>");

}
