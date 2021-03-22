/**
 * 
 */
function CommonFctsLogical() {
}
;
//===================================================================================//
//           ALL toggle functions for the Logical Design in the bottom bar are here 
//CommonFctsLogical.toggleTypeName = function() {
//	if (tdvCy) {
//		var element = document.getElementById("node_captions");
//		var state = element.getAttribute("data-state");
//
//		if (state == "hide") {
//			// show text on node
//			changeElementName(tdvCy, "node", 'data(cyDisplay)');
//			document.getElementById("node_captions").className = "btn btn-primary btn-xs";
//			document.getElementById("node_captions").innerHTML = "ON";
//			document.getElementById("node_captions").setAttribute("data-state", "show");
//		} else if (state == "show") {
//
//			tdvCy.style().selector('node[classification != "link"]').style('content', "").update();
//			document.getElementById("node_captions").className = "btn btn-default active btn-xs";
//			document.getElementById("node_captions").innerHTML = "OFF";
//			document.getElementById("node_captions").setAttribute("data-state", "hide");
//		} else {
//			console.log("Inknown state");
//		}
//	} else {
//		document.getElementById("node_captions").className = "btn btn-default btn-xs";
//		document.getElementById("node_captions").innerHTML = "OFF";
//		document.getElementById("node_captions").setAttribute("data-state", "hide");
//	}
//}

//CommonFctsLogical.toggleLabelPosition = function() {
//	if (tdvCy) {
//		var element = document.getElementById("label_node_positions");
//		var elepos = element.options[element.selectedIndex].value;
//		console.log("value read is " + elepos);
//		if (elepos == 'top' || elepos == 'center' || elepos == 'bottom') {
//			tdvCy.style().selector('node[classification != "link"]').style('text-valign', elepos).update();
//		} else {
//			console.log("Position not supported by Cytoscape");
//		}
//
//	}
//}
//
//CommonFctsLogical.toggleLabelSize = function() {
//	if (tdvCy) {
//		var element = document.getElementById("label_node_size");
//		var elesize = element.options[element.selectedIndex].value;
//		console.log("value read is " + elesize);
//		if (elesize == '11px' || elesize == '12px' || elesize == '14px' || elesize == '16px' || elesize == '18px') {
//			tdvCy.style().selector('node[classification != "link"]').style('font-size', elesize).update();
//		} else {
//			console.log("Size not supported by Cytoscape");
//		}
//
//	}
//}

//CommonFctsLogical.toggleConnections = function() {
//	var pcs;
//	if (tdvCy) {
//		var element = document.getElementById("connections");
//		var state = element.getAttribute("data-state");
//		if (state == "hide") {
//			document.getElementById("connections").className = "btn btn-primary btn-xs";
//			document.getElementById("connections").innerHTML = "ON";
//			document.getElementById("connections").setAttribute("data-state", "show");
//
//			pcs = tdvCy.edges().filter("[classification = 'parentchild']");
//			for (var j = 0; j < pcs.length; j++) {
//				pcs[j].style("display", "element");
//			}
//
//		} else if (state == "show") {
//			document.getElementById("connections").className = "btn btn-default active btn-xs";
//			document.getElementById("connections").innerHTML = "OFF";
//			document.getElementById("connections").setAttribute("data-state", "hide");
//
//			pcs = tdvCy.edges().filter("[classification = 'parentchild']");
//			for (var j = 0; j < pcs.length; j++) {
//				pcs[j].style("display", "none");
//			}
//		}
//	}
//
//}

//CommonFctsLogical.toggleToolTips = function() {
//	var pcs;
//	if (tdvCy) {
//		var element = document.getElementById("tooltips");
//		var state = element.getAttribute("data-state");
//		if (state == "hide") {
//			document.getElementById("tooltips").className = "btn btn-primary btn-xs";
//			document.getElementById("tooltips").innerHTML = "ON";
//			document.getElementById("tooltips").setAttribute("data-state", "show");
//			$(".tippy-popper").each(function(i, obj) {
//				if (obj.querySelector('.tippy-content >div').innerHTML != "") {
//					obj.style.display = "block";
//				}
//			})
//
//		}
//		if (state == "show") {
//			document.getElementById("tooltips").className = "btn btn-default active btn-xs";
//			document.getElementById("tooltips").innerHTML = "OFF";
//			document.getElementById("tooltips").setAttribute("data-state", "hide");
//			$(".tippy-popper").hide();
//
//		}
//	}
//}

//CommonFctsLogical.toggleLinkMax = function() {
//	var links;
//	if (tdvCy) {
//		var element = document.getElementById("link_maxRel");
//		var state = element.getAttribute("data-state");
//
//		if (state == "hide") {
//			document.getElementById("link_maxRel").className = "btn btn-primary btn-xs";
//			document.getElementById("link_maxRel").innerHTML = "ON";
//			document.getElementById("link_maxRel").setAttribute("data-state", "show");
//			if (document.getElementById("edge_captions").getAttribute("data-state") == "show") {
//				CommonFctsLogical.turnBtnEdgeOFF('edge_captions');
//			}
//			tdvCy.style().selector('edge').style('label', 'data(maxRel)').update();
//		} else if (state == "show") {
//			document.getElementById("link_maxRel").className = "btn btn-default active btn-xs";
//			document.getElementById("link_maxRel").innerHTML = "OFF";
//			document.getElementById("link_maxRel").setAttribute("data-state", "hide");
//			tdvCy.style().selector('edge').style('label', '').update();
//		}
//	} else {
//		document.getElementById("link_maxRel").className = "btn btn-default active btn-xs";
//		document.getElementById("link_maxRel").innerHTML = "OFF";
//		document.getElementById("link_maxRel").setAttribute("data-state", "hide");
//	}
//}

//CommonFctsLogical.toggleEdgeName = function() {
//	if (tdvCy) {
//		var element = document.getElementById("edge_captions");
//		var state = element.getAttribute("data-state");
//
//		if (state == "hide") {
//			// show text on Edges	
//			if (document.getElementById("link_maxRel").getAttribute("data-state") == "show") {
//				CommonFctsLogical.turnBtnEdgeOFF('link_maxRel');
//			}
//
//			tdvCy.style().selector('edge').style('content', 'data(name)').update();
//			document.getElementById("edge_captions").className = "btn btn-primary btn-xs";
//			document.getElementById("edge_captions").innerHTML = "ON";
//			document.getElementById("edge_captions").setAttribute("data-state", "show");
//
//		} else if (state == "show") {
//
//			tdvCy.style().selector('edge').style('content', '').update();
//			document.getElementById("edge_captions").className = "btn btn-default active btn-xs";
//			document.getElementById("edge_captions").innerHTML = "OFF";
//			document.getElementById("edge_captions").setAttribute("data-state", "hide");
//
//		} else {
//			console.log("Inknown state");
//		}
//	} else {
//		document.getElementById("edge_captions").className = "btn btn-default btn-xs";
//		document.getElementById("edge_captions").innerHTML = "OFF";
//		document.getElementById("edge_captions").setAttribute("data-state", "hide");
//	}
//}

//CommonFctsLogical.turnBtnEdgeOFF = function(btn) {
//	tdvCy.style().selector('edge').style('content', '').update();
//	document.getElementById(btn).className = "btn btn-default btn-xs";
//	document.getElementById(btn).innerHTML = "OFF";
//	document.getElementById(btn).setAttribute("data-state", "hide");
//
//}
//========================================================================================//
//       THese two functions generate the  COLOR and SIZE sections elements in the bottom// 
//        bar for the LOGICAL  DESIGN                                                    //
//CommonFctsLogical.drawColorbar = function() {
//
//	var divColors = document.getElementById("color_selection");
//	var inputs = "";
//	inputs += "<li ><b>Color:<b></li>";
//	for (var i = 0; i < arrayPreColor.length; i++) {
//		inputs += "<li class='tdcolor circleColor' style='background:"
//			+ arrayPreColor[i] + "' id='color_" + i
//			+ "'  onclick='DesignPrefFctsUtils.changeColor(" + i
//			+ ")'></li>";
//	}
//	divColors.innerHTML = inputs;
//}
//
//CommonFctsLogical.drawSizebar = function() {

//	var divSizes = document.getElementById("size_selection");
//	var inputs = "";
//	var sizes = [ '20px', '24px', '28px', '32px', '36px', '40px' ];
//	inputs += "<li ><b>Size:</b></li>"
//	for (var i = 0; i < arrayPreSize.length; i++) {
//		var radius = sizes[i].slice(0, -2);
//		inputs += "<li class='preftd prefSize  typenode' style='width:" + sizes[i]
//			+ "; height:" + sizes[i] + ";' id='size_" + i
//			+ "'  onclick='DesignPrefFctsUtils.changeSize(" + i
//			+ ")'></li>";
//
//	}
//	divSizes.innerHTML = inputs;
//}
//=======================================================================================//
CommonFctsLogical.UnselectTypes = function() {
	if (listTypeIds.length >= 1) {
		var typesSelected = "[id='" + listTypeIds[0] + "']";
		if (listTypeIds.length > 1) {
			for (var i = 1; i < listTypeIds.length; i++) {
				typesSelected += ", [id='" + listTypeIds[i] + "']";
			}
		}
		var allNodes = tdvCy.filter('node');
		allNodes.filter(typesSelected).unselect();
	}
	if (listLinkIds.length >= 1) {
		var linksSelected = "[id='rule" + listLinkIds[0] + "']";
		if (listLinkIds.length > 1) {
			for (var i = 1; i < listLinkIds.length; i++) {
				linksSelected += ", [id='rule" + listLinkIds[i] + "']";
			}
		}
		var allNodes = tdvCy.filter('node');
		allNodes.filter(linksSelected).unselect();
	}

}

CommonFctsLogical.UnselectConnections = function() {
	if (listConnIds.length >= 1) {
		var connectionsSelected = "[id='connection" + listConnIds[0] + "']";
		if (listConnIds.length > 1) {
			for (var i = 1; i < listConnIds.length; i++) {
				connectionsSelected += ", [id='rule" + listConnIds[i] + "']";
			}
		}
		var allNodes = tdvCy.filter('edge');
		allNodes.filter(connectionsSelected).unselect();
	}
}
//=======================================================================================//


CommonFctsLogical.openDialogForCreation = function(title, event) {

	var dialogPosition = [ posWin.x, posWin.y ];
	console.log(posWin.x + " ----- -----  " + posWin.y)
	var divObj = $("#create_type");

	divObj.dialog({
		autoOpen : false,
		width : 'auto',
		height : 'auto',
		title : title,
		modal : false,
		create : function(event, ui) {
			// Set maxWidth
			$(this).css("maxWidth", "800px");
			$(this).position(dialogPosition);
		},
		close : function(event, ui) {
			DesignSavingFcts.closingDialog()
		},
		open : function(event, ui) {
			$(this).position(dialogPosition);
		}
	});


	var inputBody = "";
	inputBody = '<div id="typecreateForm"> Hello</div>';
	$("#create_type").empty();
	$("#create_type").append(inputBody);

}
//============================================================================================//
CommonFctsLogical.HandlingErrorMSG = function(message, type) {

	$('#error_message').empty();
	var textFormat = "";
	if (type == "error") {
		textFormat = "<p style='" + style_error + "'>" + message + "</p>";

	} else if (type == "success") {
		textFormat = "<p style='" + style_success + "'>" + message + "</p>";

	} else if (type == "warning") {
		textFormat = "<p style='" + style_warning + "'>" + message + "</p>";
	} else {
		textFormat = "<p style='" + style_simple + "'>" + message + "</p>";
	}
	$('#error_message').append(textFormat);
	setTimeout(function() {
		$('#error_message').empty();
	}, 5000);
}


//==================================================================================================//
//  This section CRETE/UPDATE the text preview properties for type (Node/Path/System/DTC) and links //
//  It also create the text preview properies for the Connection (Parentchild/Link)                 //
//==================================================================================================//
CommonFctsLogical.updateTooltip = function(type) {
	var props = type.typeProperties;
	if (!$.isEmptyObject(props)) {
		var text = '';
		text = "<span class='closetippy-tooltip' onclick='CommonFctsLogical.signleTurnOffTooltip(this)'>x</span>";
		$.each(props, function(key, value) {
			text += "{" + value.name + ": " + value.propertyType + "}<br/>";
		})
		if (type.classification == 'link') {
			$("[data-id=rule" + type.id + "]").empty();
			$("[data-id=rule" + type.id + "]").append(text);
		} else {
			$("[data-id=type" + type.id + "]").empty();
			$("[data-id=type" + type.id + "]").append(text);
		}

	}
}

CommonFctsLogical.updateRuleTooltip = function(rule, connId) {
	var props = rule.typeProperties;
	if (!$.isEmptyObject(props)) {
		var text = '';
		text = "<span class='closetippy-tooltip' onclick='CommonFctsLogical.signleTurnOffTooltip(this)'>x</span>";
		$.each(props, function(key, value) {
			text += "{" + value.name + ": " + value.propertyType + "}<br/>"
		})
		$("[data-id=connection" + connId + "]").empty();
		$("[data-id=connection" + connId + "]").append(text);
	}
}

CommonFctsLogical.addTooltip = function(element) {
	var node = null;
	if (element.classification == 'link') {
		node = tdvCy.$("#rule" + element.id);
	} else
		node = tdvCy.$("#" + element.id);
	var props = element.typeProperties;
	var text = '';
	if (!$.isEmptyObject(props)) {
		text = "<span class='closetippy-tooltip' onclick='CommonFctsLogical.signleTurnOffTooltip(this)'>x</span>";
		$.each(props, function(key, value) {
			text += "{" + value.name + ": " + value.propertyType + "}<br/>"
		})
	}
	var nodeSel = node[0];
	var Tp = makeTippyNode(nodeSel, text);

	Tp.show();
}

CommonFctsLogical.addRelTooltip = function(connId, ruleId) {
	var edge = tdvCy.$("#connection" + connId);
	var props = ruleMapViaId[ruleId].typeProperties;
	var text = '';
	if (!$.isEmptyObject(props)) {
		text = "<span class='closetippy-tooltip' onclick='CommonFctsLogical.signleTurnOffTooltip(this)'>x</span>";
		$.each(props, function(key, value) {
			text += "{" + value.name + ": " + value.propertyType + "}<br/>"
		})

	}
	var TR = makeTippyRel(edge[0], text);
	TR.show();

}
//=================================================================================//


CommonFctsLogical.saveNewTypePos = function(typeId) {
	var jsonElement = {};
	var node = {};
	var newDecoProperties = [];
	var element = typeMapViaId[typeId];

	var newpos = tdvCy.$("#" + typeId).position();
	console.log(" Node position X : " + newpos.x + "  y  =   " + newpos.y);

	newDecoProperties = CommonFctsLogical.setPosItemDecos(newpos);

	jsonElement.grouphost = userGroup.host;
	jsonElement.groupname = userGroup.name;
	jsonElement.namespace = loggedInUserName;

	node.typeId = typeId.toString();
	node.decorators = typeMapViaId[typeId].decorators;
	node.decoProperties = newDecoProperties;
	jsonElement.node = node;

	console.log(jsonElement);
	var doneFunction = function(data) {
		if (!$.isEmptyObject(data.decoProperties)) {
			console.log(data);
			typeMapViaId[typeId].decoProperties = data.decoProperties;
		}
	};

	var failFunction = function(xhr, status, error) {
		console.log("Save Initial position error: " + xhr.responseText);
		CommonFctsLogical.HandlingErrorMSG("Save position for typeId " + typeId + "failed ", "error");
	};

	var apis = new TypeApi();
	apis.saveTypeCoordinates(typeId, jsonElement, doneFunction, failFunction);

}

CommonFctsLogical.saveNewLinkPos = function(linkId) {
	var jsonElement = {};
	var node = {};
	var newDecoProperties = [];
	var element = ruleMapViaId[linkId];

	var newpos = tdvCy.$("#rule" + linkId).position();
	newDecoProperties = CommonFctsLogical.setPosItemDecos(newpos);

	jsonElement.grouphost = userGroup.host;
	jsonElement.groupname = userGroup.name;
	jsonElement.namespace = loggedInUserName;
	jsonElement.linkId = linkId;
	jsonElement.decoratorProperties = newDecoProperties;

	console.log(jsonElement);
	var doneFunction = function(data) {
		if (!$.isEmptyObject(data.decoProperties)) {
			console.log(data);
			ruleMapViaId[linkId].decoProperties = data.decoProperties;
		}
	};

	var failFunction = function(xhr, status, error) {
		console.log("Save position error: " + xhr.responseText);
		CommonFctsLogical.HandlingErrorMSG("Save position for linkId " + linkId + "failed ", "error");
	};

	var apis = new RuleApis();
	apis.updateLinkDeco(jsonElement, doneFunction, failFunction);

}

CommonFctsLogical.setPosItemDecos = function(pos) {
	var newDecoProperties = [];

	var decoProps = predefinedSelectedDecoPropertiesMap;
	newDecoProperties.push({
		propertyName : "x",
		name : "x",
		value : pos.x.toString(),
		propertyType : "DOUBLE",
		id : decoProps["x"].id.toString()
	});
	newDecoProperties.push({
		propertyName : "y",
		name : "y",
		value : pos.y.toString(),
		propertyType : "DOUBLE",
		id : decoProps["y"].id.toString()
	});
	newDecoProperties.push({
		propertyName : "z",
		name : "z",
		value : "0",
		propertyType : "DOUBLE",
		id : decoProps["z"].id.toString()
	});

	return newDecoProperties;
}

CommonFctsLogical.turnOffToolTips = function() {
	document.getElementById("tooltips").className = "btn btn-default active btn-xs";
	document.getElementById("tooltips").innerHTML = "OFF";
	document.getElementById("tooltips").setAttribute("data-state", "hide");
	$(".tippy-popper").hide();
}

CommonFctsLogical.signleTurnOffTooltip = function(ele) {
	//	console.log(ele);
	var par = ele.parentElement;
	var id = par.getAttribute('data-id');
	$("[data-id=" + id + "]").parent().parent().parent().css({
		"display" : "none"
	});
}

CommonFctsLogical.verifyPropertiesName = function(newProperty, element) {
	var found = false;
	$.each(element, function(key, value) {
		if (value.name == newProperty) {
			found = true;
			return false;
		}
	})
	return found;
}