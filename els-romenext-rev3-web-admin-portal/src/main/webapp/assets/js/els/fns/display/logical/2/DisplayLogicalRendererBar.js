function DisplayLogicalRendererBar() {

};

// typeIdList and linkIdList have to be a list of ids which are numbers
DisplayLogicalRendererBar.generateTypeBars = function(typeIdList, linkIdList) {
	
	var barElements = {};
	$.each(typeIdList, function(key, value) {
		barElements[value] = 0;
		$.each(nodeMap, function(uuid, node) {
			if (node.typeId == value) {
				barElements[value]++;
			}
		});
	});
	
	var nodeNb = 0;
	var pathNb = 0;
	var systemNb = 0;
	$.each(barElements, function(key, value) {
		var type = typeMapViaId[key];
		if (type.classification == 'node') {
			nodeNb++;
		} else if (type.classification == 'path') {
			pathNb++;
		} else if (type.classification == 'system') {
			systemNb++;
		} 
	});
	
	var linkNb = linkIdList.length;
	
	var nb = nodeNb + pathNb + systemNb + linkNb;
	
	var inputs = '';
	
	var nodeInputs = "<span class='badge' "
	    	+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
	    	+ "onmouseout='GlobalHTMLUtils.unhighlight(this);' "
	    	+ "onclick='(new DisplayLogicalRenderer()).resetView();'>("
	    	+ nodeNb + ")</span>";

	var pathInputs = "<span class='badge' "
			+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
			+ "onmouseout='GlobalHTMLUtils.unhighlight(this);'>(" 
			+ pathNb + ")</span>";

	var systemInputs = "<span class='badge' "
			+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
			+ "onmouseout='GlobalHTMLUtils.unhighlight(this);'>("
			+ systemNb + ")</span>";

	var linkInputs = "<span class='badge' "
			+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
			+ "onmouseout='GlobalHTMLUtils.unhighlight(this);'>("
			+ linkNb + ")</span>";	
	
	$.each(barElements, function(key, value) {
		
		var type = typeMapViaId[key];
		var tmpInputs = "<span class='badge' style='color:black; background:" + type.color+ "' id='"+ type.id
					  + "' title='Drag and Drop to Create Node of This Type' "
					  + "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
					  + "onmouseout='GlobalHTMLUtils.unhighlight(this);' "
					  + "onclick=\"(new DisplayLogicalRenderer()).selectType('" + type.id + "')\"  >" + type.name + "("
					  + value + ")</span>";
		
		if (type.classification == 'node') {
			nodeInputs += tmpInputs;
		} else if (value.classification == 'path') {
			pathInputs += tmpInputs;	
		} else if (value.classification == 'system') {
			systemInputs += tmpInputs;
		}
		 
	});
	
	$.each(linkIdList, function(key, value) {
		var rule = ruleMapViaId[value];
		linkInputs += "<span class='badge' id='" + rule.id + "'"
				+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
				+ "onmouseout='GlobalHTMLUtils.unhighlight(this);'>" + rule.name + "</span>";
	});
	
	document.getElementById("node_bar").innerHTML = nodeInputs;
	document.getElementById("path_bar").innerHTML = pathInputs;
	document.getElementById("system_bar").innerHTML = systemInputs;
	document.getElementById("link_bar").innerHTML = linkInputs;

	DisplayLogicalRendererBar.typeBarDraggable();
	
	if (hideNode == true) {
		DisplayLogicalRendererBar.hideTypeLinkBar("node_img");
	} else {
		DisplayLogicalRendererBar.showTypeLinkBar("node_img");
	}
	
	if (hidePath == true) {
		DisplayLogicalRendererBar.hideTypeLinkBar("path_img");
	} else {
		DisplayLogicalRendererBar.showTypeLinkBar("path_img");
	}
	
	if (hideSystem == true) {
		DisplayLogicalRendererBar.hideTypeLinkBar("system_img");
	} else {
		DisplayLogicalRendererBar.showTypeLinkBar("system_img");
	}
	
	if (hideLink == true) {
		DisplayLogicalRendererBar.hideTypeLinkBar("link_img");
	} else {
		DisplayLogicalRendererBar.showTypeLinkBar("link_img");
	}
	
	if (nodeNb == 0) {
		DisplayLogicalRendererBar.hideTypeLinkBar("node_img");
	}
	if (pathNb == 0) {
		DisplayLogicalRendererBar.hideTypeLinkBar("path_img");
	}
	if (systemNb == 0) {
		DisplayLogicalRendererBar.hideTypeLinkBar("system_img");
	}
	if (linkNb == 0) {
		DisplayLogicalRendererBar.hideTypeLinkBar("link_img");
	}
	
};

DisplayLogicalRendererBar.generateChildTypeBars = function(nodeUuid, typeIdList, linkIdList) {
	
	var node = nodeMap[nodeUuid];
	
	var barElements = {};
	$.each(typeIdList, function(key, value) {
		barElements[value] = 0;
		$.each(nodeMap, function(uuid, node) {
			if (node.typeId == value) {
				barElements[value]++;
			}
		});
	});
	
	var nodeNb = 0;
	var pathNb = 0;
	var systemNb = 0;
	$.each(barElements, function(key, value) {
		var type = typeMapViaId[key];
		if (type.classification == 'node') {
			nodeNb++;
		} else if (type.classification == 'path') {
			pathNb++;
		} else if (type.classification == 'system') {
			systemNb++;
		} 
	});
	
	var linkNb = linkIdList.length;
	
	var nb = nodeNb + pathNb + systemNb + linkNb;
	
	var inputs = '';
	
	var nodeInputs = "<span class='badge' "
	    	+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
	    	+ "onmouseout='GlobalHTMLUtils.unhighlight(this);' "
	    	+ "onclick='(new DisplayLogicalRenderer()).resetView();'>("
	    	+ nodeNb + ")</span>";

	var pathInputs = "<span class='badge' "
			+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
			+ "onmouseout='GlobalHTMLUtils.unhighlight(this);'>(" 
			+ pathNb + ")</span>";

	var systemInputs = "<span class='badge' "
			+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
			+ "onmouseout='GlobalHTMLUtils.unhighlight(this);'>("
			+ systemNb + ")</span>";

	var linkInputs = "<span class='badge' "
			+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
			+ "onmouseout='GlobalHTMLUtils.unhighlight(this);'>("
			+ linkNb + ")</span>";	
	
	var selectedInstanceInputs = "<span class='badge' style='color:black; background:"
							+ typeMapViaId[node.typeId].color + "' id='NOT_TYPE_BAR_TYPE'>" 
							+ node.cyDisplay
							+ "</span>"
	if (node.classification == 'node') {
		nodeInputs += selectedInstanceInputs;
	} else if (node.classification == 'path') {
		pathInputs += selectedInstanceInputs;	
	} else if (node.classification == 'system') {
		systemInputs += selectedInstanceInputs;
	}
	
	$.each(barElements, function(key, value) {
		
		var type = typeMapViaId[key];
		var tmpInputs = "<span class='badge' style='color:black; background:" + type.color+ "' id='"+ type.id
					  + "' title='Drag and Drop to Create Node of This Type' "
					  + "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
					  + "onmouseout='GlobalHTMLUtils.unhighlight(this);' "
					  + "onclick=\"(new DisplayLogicalRenderer()).selectType('" + type.id + "')\"  >" + type.name + "("
					  + value + ")</span>";
		
		if (type.classification == 'node') {
			nodeInputs += tmpInputs;
		} else if (value.classification == 'path') {
			pathInputs += tmpInputs;	
		} else if (value.classification == 'system') {
			systemInputs += tmpInputs;
		}
		 
	});
	
	$.each(linkIdList, function(key, value) {
		var rule = ruleMapViaId[value];
		linkInputs += "<span class='badge' id='" + rule.id + "'"
				+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
				+ "onmouseout='GlobalHTMLUtils.unhighlight(this);'>" + rule.name + "</span>";
	});
	
	document.getElementById("node_bar").innerHTML = nodeInputs;
	document.getElementById("path_bar").innerHTML = pathInputs;
	document.getElementById("system_bar").innerHTML = systemInputs;
	document.getElementById("link_bar").innerHTML = linkInputs;

	DisplayLogicalRendererBar.typeBarDraggable();
	
	if (hideNode == true) {
		DisplayLogicalRendererBar.hideTypeLinkBar("node_img");
	} else {
		DisplayLogicalRendererBar.showTypeLinkBar("node_img");
	}
	
	if (hidePath == true) {
		DisplayLogicalRendererBar.hideTypeLinkBar("path_img");
	} else {
		DisplayLogicalRendererBar.showTypeLinkBar("path_img");
	}
	
	if (hideSystem == true) {
		DisplayLogicalRendererBar.hideTypeLinkBar("system_img");
	} else {
		DisplayLogicalRendererBar.showTypeLinkBar("system_img");
	}
	
	if (hideLink == true) {
		DisplayLogicalRendererBar.hideTypeLinkBar("link_img");
	} else {
		DisplayLogicalRendererBar.showTypeLinkBar("link_img");
	}
	
	if (nodeNb == 0 && node.classification != "node") {
		DisplayLogicalRendererBar.hideTypeLinkBar("node_img");
	}
	if (pathNb == 0 && node.classification != "path") {
		DisplayLogicalRendererBar.hideTypeLinkBar("path_img");
	}
	if (systemNb == 0 && node.classification != "system") {
		DisplayLogicalRendererBar.hideTypeLinkBar("system_img");
	}
	if (linkNb == 0) {
		DisplayLogicalRendererBar.hideTypeLinkBar("link_img");
	}
	
};

DisplayLogicalRendererBar.generateChildTypeBars2 = function(node, typeIdList, linkIdList) {
	
	var barElements = {};
	$.each(typeIdList, function(key, value) {
		barElements[value] = 0;
		$.each(nodeMap, function(uuid, node) {
			if (node.typeId == value) {
				barElements[value]++;
			}
		});
	});
	
	var nodeNb = 0;
	var pathNb = 0;
	var systemNb = 0;
	$.each(barElements, function(key, value) {
		var type = typeMapViaId[key];
		if (type.classification == 'node') {
			nodeNb++;
		} else if (type.classification == 'path') {
			pathNb++;
		} else if (type.classification == 'system') {
			systemNb++;
		} 
	});
	
	var linkNb = linkIdList.length;
	
	var nb = nodeNb + pathNb + systemNb + linkNb;
	
	var inputs = '';
	
	var nodeInputs = "<span class='badge' "
	    	+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
	    	+ "onmouseout='GlobalHTMLUtils.unhighlight(this);' "
	    	+ "onclick='(new DisplayLogicalRenderer()).resetView();'>("
	    	+ nodeNb + ")</span>";

	var pathInputs = "<span class='badge' "
			+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
			+ "onmouseout='GlobalHTMLUtils.unhighlight(this);'>(" 
			+ pathNb + ")</span>";

	var systemInputs = "<span class='badge' "
			+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
			+ "onmouseout='GlobalHTMLUtils.unhighlight(this);'>("
			+ systemNb + ")</span>";

	var linkInputs = "<span class='badge' "
			+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
			+ "onmouseout='GlobalHTMLUtils.unhighlight(this);'>("
			+ linkNb + ")</span>";	
	
	var selectedInstanceInputs = "<span class='badge' style='color:black; background:"
							+ typeMapViaId[node.typeId].color + "' id='NOT_TYPE_BAR_TYPE'>" 
							+ node.cyDisplay
							+ "</span>"
	if (node.classification == 'node') {
		nodeInputs += selectedInstanceInputs;
	} else if (node.classification == 'path') {
		pathInputs += selectedInstanceInputs;	
	} else if (node.classification == 'system') {
		systemInputs += selectedInstanceInputs;
	}
	
	$.each(barElements, function(key, value) {
		
		var type = typeMapViaId[key];
		var tmpInputs = "<span class='badge' style='color:black; background:" + type.color+ "' id='"+ type.id
					  + "' title='Drag and Drop to Create Node of This Type' "
					  + "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
					  + "onmouseout='GlobalHTMLUtils.unhighlight(this);' "
					  + "onclick=\"(new DisplayLogicalRenderer()).selectType('" + type.id + "')\"  >" + type.name + "("
					  + value + ")</span>";
		
		if (type.classification == 'node') {
			nodeInputs += tmpInputs;
		} else if (value.classification == 'path') {
			pathInputs += tmpInputs;	
		} else if (value.classification == 'system') {
			systemInputs += tmpInputs;
		}
		 
	});
	
	$.each(linkIdList, function(key, value) {
		var rule = ruleMapViaId[value];
		linkInputs += "<span class='badge' id='" + rule.id + "'"
				+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
				+ "onmouseout='GlobalHTMLUtils.unhighlight(this);'>" + rule.name + "</span>";
	});
	
	document.getElementById("node_bar").innerHTML = nodeInputs;
	document.getElementById("path_bar").innerHTML = pathInputs;
	document.getElementById("system_bar").innerHTML = systemInputs;
	document.getElementById("link_bar").innerHTML = linkInputs;
	
	DisplayLogicalRendererBar.typeBarDraggable();
	
	if (hideNode == true) {
		DisplayLogicalRendererBar.hideTypeLinkBar("node_img");
	} else {
		DisplayLogicalRendererBar.showTypeLinkBar("node_img");
	}
	
	if (hidePath == true) {
		DisplayLogicalRendererBar.hideTypeLinkBar("path_img");
	} else {
		DisplayLogicalRendererBar.showTypeLinkBar("path_img");
	}
	
	if (hideSystem == true) {
		DisplayLogicalRendererBar.hideTypeLinkBar("system_img");
	} else {
		DisplayLogicalRendererBar.showTypeLinkBar("system_img");
	}
	
	if (hideLink == true) {
		DisplayLogicalRendererBar.hideTypeLinkBar("link_img");
	} else {
		DisplayLogicalRendererBar.showTypeLinkBar("link_img");
	}
	
	if (nodeNb == 0 && node.classification != "node") {
		DisplayLogicalRendererBar.hideTypeLinkBar("node_img");
	}
	if (pathNb == 0 && node.classification != "path") {
		DisplayLogicalRendererBar.hideTypeLinkBar("path_img");
	}
	if (systemNb == 0 && node.classification != "system") {
		DisplayLogicalRendererBar.hideTypeLinkBar("system_img");
	}
	if (linkNb == 0) {
		DisplayLogicalRendererBar.hideTypeLinkBar("link_img");
	}
	
};

DisplayLogicalRendererBar.typeBarDraggable = function() {

	console.log("making type bar draggable");

	$gallery1 = $("#node_bar");
	$gallery2 = $("#path_bar");
	$gallery3 = $("#system_bar");

	// let the gallery items be draggable
	$('span', $gallery1).draggable({
		cancel : "a.ui-icon", // clicking an icon won't initiate
		// dragging
		revert : "invalid", // when not dropped, the item will revert
		// back to its initial position
		containment : "document",
		helper : "clone",
		cursor : "move",
		create : function() {
			$(this).css({
				'zIndex' : 1000
			});
		},
		start : function() {
			$(this).css({
				'zIndex' : 1000
			});
		},
		stop : function() {
			$(this).css({
				'zIndex' : 1000
			});
		}
	});
	
	// let the gallery items be draggable
	$('span', $gallery2).draggable({
		cancel : "a.ui-icon", // clicking an icon won't initiate
		// dragging
		revert : "invalid", // when not dropped, the item will revert
		// back to its initial position
		containment : "document",
		helper : "clone",
		cursor : "move",
		create : function() {
			$(this).css({
				'zIndex' : 1000
			});
		},
		start : function() {
			$(this).css({
				'zIndex' : 1000
			});
		},
		stop : function() {
			$(this).css({
				'zIndex' : 1000
			});
		}
	});
	
	// let the gallery items be draggable
	$('span', $gallery3).draggable({
		cancel : "a.ui-icon", // clicking an icon won't initiate
		// dragging
		revert : "invalid", // when not dropped, the item will revert
		// back to its initial position
		containment : "document",
		helper : "clone",
		cursor : "move",
		create : function() {
			$(this).css({
				'zIndex' : 1000
			});
		},
		start : function() {
			$(this).css({
				'zIndex' : 1000
			});
		},
		stop : function() {
			$(this).css({
				'zIndex' : 1000
			});
		}
	});
	
	var element;
	var $workspace = $("#irvCy");
	$workspace.droppable({
				accept : "span",
				activeClass : "ui-state-highlight",
				drop : function(event, ui) {

					dragItemPositionX = 0;
					dragItemPositionY = 0;
					var offset = $("#irvCy").offset();

					// get mouse position relative to drop target:
					dragItemPositionX = event.originalEvent.pageX - offset.left;
					dragItemPositionY = event.originalEvent.pageY - offset.top;
					console.log("Dropped at  X: " + dragItemPositionX + " Y:  " + dragItemPositionY);

					if (!isNaN(ui.helper.context.id)) {
						var id = ui.helper.context.id;
						if (id != "NOT_TYPE_BAR_TYPE") {
							(new DisplayLogicalRenderer()).createNode(id);
						}
					}					
//					if (!isNaN(ui.helper.children()[0].id)) {
//
//						var name = ui.helper.children()[0].innerHTML;
//						var id = ui.helper.children()[0].id;
//						if (name.includes("<")) {
//							name = name.substring(0, name.indexOf('<'));
//							console.log("Found this " + name);
//						}
//						if (id != "NOT_TYPE_BAR_TYPE") {
//							(new DisplayLogicalRenderer()).createNode(id);
//						}
//
//					} else {
//						console.log(ui);
//						// got the name of the node
//						var nodeName = ui.helper.children()[0].innerHTML;
//						console.log("dragged this node " + nodeName);
//						if (loadInstNode) {
//							element = nodeMapInst[nodeName];
//						} else {
//							element = nodeMap[nodeName];
//						}
//
//					}
			}
	});

};

DisplayLogicalRendererBar.showTypeLinkBar = function(iconId) {
	
	var elements = [];
	
	var ele = document.getElementById(iconId);
	var state = ele.getAttribute("data-state");
	
	switch (iconId) {
	case "node_img":
		document.getElementById("node_bar").style.display = "block";
		if (irvCy) {
			elements = irvCy.nodes().filter("[classification = 'node']");
		}
		document.getElementById("node_img").className = "btn btn-primary btn-sm text-center";
		document.getElementById("node_img").innerHTML = '<img src="/webguiportal/assets/img/newdesign/node.png"/>';
		hideNode = false;
		break;
	case "path_img":
		document.getElementById("path_bar").style.display = "block";
		if (irvCy) {
			elements = irvCy.nodes().filter("[classification = 'path']");
		}
		document.getElementById("path_img").className = "btn btn-primary btn-sm text-center";
		document.getElementById("path_img").innerHTML = '<img src="/webguiportal/assets/img/newdesign/path.png"/>';
		hidePath = false;
		break;
	case "system_img":
		document.getElementById("system_bar").style.display = "block";
		if (irvCy) {
			elements = irvCy.nodes().filter("[classification = 'system']");
		}
		document.getElementById("system_img").className = "btn btn-primary btn-sm text-center";
		document.getElementById("system_img").innerHTML = '<img src="/webguiportal/assets/img/newdesign/system.png"/>';
		hideSystem = false;
		break;
	case "link_img":
		document.getElementById("link_bar").style.display = "block";
		if (irvCy) {
			elements = irvCy.edges().filter("[classification = 'link']");
		}
		document.getElementById("link_img").className = "btn btn-primary btn-sm text-center";
		document.getElementById("link_img").innerHTML = '<img src="/webguiportal/assets/img/newdesign/link.png"/>';
		hideLink = false;
		break;
	default:
		console.log("action not defined yet");
	}
	ele.setAttribute("data-state", "visible");
	for (var i = 0; i < elements.length; i++) {
		elements[i].style("display", 'element');
	}
		
};

DisplayLogicalRendererBar.hideTypeLinkBar = function(iconId) {
	
	var elements = [];
	
	var ele = document.getElementById(iconId);
	var state = ele.getAttribute("data-state");
	
	switch (iconId) {
	case "node_img":
		document.getElementById("node_bar").style.display = "none";
		if (irvCy) {
			elements = irvCy.nodes().filter("[classification = 'node']");
		}
		document.getElementById("node_img").className = "btn btn-default btn-xs text-center";
		document.getElementById("node_img").innerHTML = "NODE";
		hideNode = true;
		break;
	case "path_img":
		document.getElementById("path_bar").style.display = "none";
		if (irvCy) {
			elements = irvCy.nodes().filter("[classification = 'path']");
		}
		document.getElementById("path_img").className = "btn btn-default btn-xs text-center";
		document.getElementById("path_img").innerHTML = "PATH";
		hidePath = true;
		break;
	case "system_img":
		document.getElementById("system_bar").style.display = "none";
		if (irvCy) {
			elements = irvCy.nodes().filter("[classification = 'system']");
		}
		document.getElementById("system_img").className = "btn btn-defauly btn-xs text-center";
		document.getElementById("system_img").innerHTML = "SYSTEM";
		hideSystem = true;
		break;
	case "link_img":
		document.getElementById("link_bar").style.display = "none";
		if (irvCy) {
			elements = irvCy.edges().filter("[classification = 'link']");
		}
		document.getElementById("link_img").className = "btn btn-default btn-xs text-center";
		document.getElementById("link_img").innerHTML = "LINK";
		hideLink = true;
		break;
	default:
		console.log("action not defined yet");
	}
	ele.setAttribute("data-state", "hidden");
	for (var i = 0; i < elements.length; i++) {
		elements[i].style("display", "none");
	}
		
};

DisplayLogicalRendererBar.showOrHideTypeLinkBar = function(iconId) {
	
	var elements = [];
	
	var ele = document.getElementById(iconId);
	var state = ele.getAttribute("data-state");
	if (state == 'visible') {
		switch (iconId) {
		case "node_img":
			document.getElementById("node_bar").style.display = "none";
			if (irvCy) {
				elements = irvCy.nodes().filter("[classification = 'node']");
			}
			document.getElementById("node_img").className = "btn btn-default btn-xs text-center";
			document.getElementById("node_img").innerHTML = "NODE";
			hideNode = true;
			break;
		case "path_img":
			document.getElementById("path_bar").style.display = "none";
			if (irvCy) {
				elements = irvCy.nodes().filter("[classification = 'path']");
			}
			document.getElementById("path_img").className = "btn btn-default btn-xs text-center";
			document.getElementById("path_img").innerHTML = "PATH";
			hidePath = true;
			break;
		case "system_img":
			document.getElementById("system_bar").style.display = "none";
			if (irvCy) {
				elements = irvCy.nodes().filter("[classification = 'system']");
			}
			document.getElementById("system_img").className = "btn btn-defauly btn-xs text-center";
			document.getElementById("system_img").innerHTML = "SYSTEM";
			hideSystem = true;
			break;
		case "link_img":
			document.getElementById("link_bar").style.display = "none";
			if (irvCy) {
				elements = irvCy.edges().filter("[classification = 'link']");
			}
			document.getElementById("link_img").className = "btn btn-default btn-xs text-center";
			document.getElementById("link_img").innerHTML = "LINK";
			hideLink = true;
			break;
		default:
			console.log("action not defined yet");
		}
		ele.setAttribute("data-state", "hidden");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style("display", "none");
		}
	} else {
		switch (iconId) {
		case "node_img":
			document.getElementById("node_bar").style.display = "block";
			if (irvCy) {
				elements = irvCy.nodes().filter("[classification = 'node']");
			}
			document.getElementById("node_img").className = "btn btn-primary btn-sm text-center";
			document.getElementById("node_img").innerHTML = '<img src="/webguiportal/assets/img/newdesign/node.png"/>';
			hideNode = false;
			break;
		case "path_img":
			document.getElementById("path_bar").style.display = "block";
			if (irvCy) {
				elements = irvCy.nodes().filter("[classification = 'path']");
			}
			document.getElementById("path_img").className = "btn btn-primary btn-sm text-center";
			document.getElementById("path_img").innerHTML = '<img src="/webguiportal/assets/img/newdesign/path.png"/>';
			hidePath = false;
			break;
		case "system_img":
			document.getElementById("system_bar").style.display = "block";
			if (irvCy) {
				elements = irvCy.nodes().filter("[classification = 'system']");
			}
			document.getElementById("system_img").className = "btn btn-primary btn-sm text-center";
			document.getElementById("system_img").innerHTML = '<img src="/webguiportal/assets/img/newdesign/system.png"/>';
			hideSystem = false;
			break;
		case "link_img":
			document.getElementById("link_bar").style.display = "block";
			if (irvCy) {
				elements = irvCy.edges().filter("[classification = 'link']");
			}
			document.getElementById("link_img").className = "btn btn-primary btn-sm text-center";
			document.getElementById("link_img").innerHTML = '<img src="/webguiportal/assets/img/newdesign/link.png"/>';
			hideLink = false;
			break;
		default:
			console.log("action not defined yet");
		}
		ele.setAttribute("data-state", "visible");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style("display", 'element');
		}
	}
	
};

DisplayLogicalRendererBar.checkShowOrHideTypeLinkBar = function(iconId) {
	
	var elements = [];
	
	var ele = document.getElementById(iconId);
	var state = ele.getAttribute("data-state");
	if (state == 'hidden') {
		switch (iconId) {
		case "node_img":
			document.getElementById("node_bar").style.display = "none";
			if (irvCy) {
				elements = irvCy.nodes().filter("[classification = 'node']");
			}
			document.getElementById("node_img").className = "btn btn-default btn-xs text-center";
			document.getElementById("node_img").innerHTML = "NODE";
			hideNode = true;
			break;
		case "path_img":
			document.getElementById("path_bar").style.display = "none";
			if (irvCy) {
				elements = irvCy.nodes().filter("[classification = 'path']");
			}
			document.getElementById("path_img").className = "btn btn-default btn-xs text-center";
			document.getElementById("path_img").innerHTML = "PATH";
			hidePath = true;
			break;
		case "system_img":
			document.getElementById("system_bar").style.display = "none";
			if (irvCy) {
				elements = irvCy.nodes().filter("[classification = 'system']");
			}
			document.getElementById("system_img").className = "btn btn-defauly btn-xs text-center";
			document.getElementById("system_img").innerHTML = "SYSTEM";
			hideSystem = true;
			break;
		case "link_img":
			document.getElementById("link_bar").style.display = "none";
			if (irvCy) {
				elements = irvCy.edges().filter("[classification = 'link']");
			}
			document.getElementById("link_img").className = "btn btn-default btn-xs text-center";
			document.getElementById("link_img").innerHTML = "LINK";
			hideLink = true;
			break;
		default:
			console.log("action not defined yet");
		}
		ele.setAttribute("data-state", "hidden");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style("display", "none");
		}
	} else {
		switch (iconId) {
		case "node_img":
			document.getElementById("node_bar").style.display = "block";
			if (irvCy) {
				elements = irvCy.nodes().filter("[classification = 'node']");
			}
			document.getElementById("node_img").className = "btn btn-primary btn-sm text-center";
			document.getElementById("node_img").innerHTML = '<img src="/webguiportal/assets/img/newdesign/node.png"/>';
			hideNode = false;
			break;
		case "path_img":
			document.getElementById("path_bar").style.display = "block";
			if (irvCy) {
				elements = irvCy.nodes().filter("[classification = 'path']");
			}
			document.getElementById("path_img").className = "btn btn-primary btn-sm text-center";
			document.getElementById("path_img").innerHTML = '<img src="/webguiportal/assets/img/newdesign/path.png"/>';
			hidePath = false;
			break;
		case "system_img":
			document.getElementById("system_bar").style.display = "block";
			if (irvCy) {
				elements = irvCy.nodes().filter("[classification = 'system']");
			}
			document.getElementById("system_img").className = "btn btn-primary btn-sm text-center";
			document.getElementById("system_img").innerHTML = '<img src="/webguiportal/assets/img/newdesign/system.png"/>';
			hideSystem = false;
			break;
		case "link_img":
			document.getElementById("link_bar").style.display = "block";
			if (irvCy) {
				elements = irvCy.edges().filter("[classification = 'link']");
			}
			document.getElementById("link_img").className = "btn btn-primary btn-sm text-center";
			document.getElementById("link_img").innerHTML = '<img src="/webguiportal/assets/img/newdesign/link.png"/>';
			hideLink = false;
			break;
		default:
			console.log("action not defined yet");
		}
		ele.setAttribute("data-state", "visible");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style("display", 'element');
		}
	}
	
};

DisplayLogicalRendererBar.showOrHideTypeLinkBars = function() {
	DisplayLogicalRendererBar.checkShowOrHideTypeLinkBar("node_img");
	DisplayLogicalRendererBar.checkShowOrHideTypeLinkBar("path_img");
	DisplayLogicalRendererBar.checkShowOrHideTypeLinkBar("system_img");
	DisplayLogicalRendererBar.checkShowOrHideTypeLinkBar("link_img");
};
