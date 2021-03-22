function DesignLogicalBarRender() {
}
// Build the bar 

DesignLogicalBarRender.buildInitialLoad = function(list, bar, divName, totalText, type) {
	var nb;
	nb = Object.keys(list).length;
	if (nb == 0) {
		document.getElementById(bar).innerHTML = "";
		DesignLogicalBarRender.turnOffButton(type + "_img");

		if (type != 'node') {
			document.getElementById(type + "tr").style.display = 'none';
			document.getElementById(type + "tr").style.visibility = 'hidden';
		}
		return;
	}

	// list is not empty  but no elements of this classification
	var nbNodes = tdvCy.elements('node[classification="' + type + '"]').length;
	if (nbNodes == 0) {
		document.getElementById(bar).innerHTML = "";
		DesignLogicalBarRender.turnOffButton(type + "_img");
		if (type != 'node') {
			document.getElementById(type + "tr").style.display = 'none';
			document.getElementById(type + "tr").style.visibility = 'hidden';
		}
		return;
	}
	// list not empty and we have elements of this classification
	var listElements = DesignLogicalBarRender.buildList(list, bar, divName, totalText, type);
	document.getElementById(bar).innerHTML = listElements;

	DesignLogicalBarRender.adjustBar(divName, type);

	DesignLogicalBarRender.turnONButton(type + "_img");
	if (type != 'node') {
		document.getElementById(type + "tr").style.display = 'table-row';
		document.getElementById(type + "tr").style.visibility = 'visible';
	}
}

DesignLogicalBarRender.buildList = function(list, bar, divName, totalText, type) {

	// code changed to call adjust bar function 
	var nbNodes = tdvCy.elements('node[classification="' + type + '"]').length;

	var inputs = '';

	inputs = "<div id='" + divName + "'>";
	inputs += "<span class='badge' id='" + totalText + "'>*(" + nbNodes + ")</span>";

	$.each(list, function(key, value) {
		var color = GlobalUtils.getNodeColor(value);
		if (value.classification == type) {
			inputs += "<span class='badge' style='color:black; background:" + color + ";' id='" + value.id
				+ "' title='Select to view in Graph' onclick=\"(new DesignLogicalRenderer()).typeSelect('" + value.id + "')\"  >"
				+ value.name + "</span>";
		}
	});
	inputs += "</div>";
	return inputs;
}

DesignLogicalBarRender.toggleElement = function(iconId, type) {
	if (tdvCy) {
		var ele = document.getElementById(iconId);
		var state = ele.getAttribute("data-state");
		if (state == 'visible') {
			switch (iconId) {
			case "node_img":
				DesignLogicalBarRender.turnElementBarOFF(iconId, type, "typelist");
				break;
			case "path_img":
				DesignLogicalBarRender.turnElementBarOFF(iconId, type, "pathlist");
				break;
			case "system_img":
				DesignLogicalBarRender.turnElementBarOFF(iconId, type, "systemlist");
				break;
			case "link_img":
				DesignLogicalBarRender.turnElementBarOFF(iconId, type, "linklist");
				var links = [];
				links = tdvCy.edges().filter("[classification = 'link']");
				for (var j = 0; j < links.length; j++) {
					links[j].style("display", "none");
				}
				break;
			default:
				console.log("action not defined yet");
			}

		} else {
			switch (iconId) {
			case "node_img":
				DesignLogicalBarRender.turnElementBarON(iconId, type, "typelist", ele);
				break;

			case "path_img":
				DesignLogicalBarRender.turnElementBarON(iconId, type, "pathlist", ele);
				break;
			case "system_img":
				DesignLogicalBarRender.turnElementBarON(iconId, type, "systemlist", ele)
				break;
			case "link_img":
				DesignLogicalBarRender.turnElementBarON(iconId, type, "linklist", ele);
				var links = [];
				links = tdvCy.edges().filter("[classification = 'link']");
				for (var j = 0; j < links.length; j++) {
					links[j].style("display", "element");
				}
				break;
			default:
				console.log("action not defined yet");
			}
		}
	}
};

DesignLogicalBarRender.turnElementBarOFF = function(iconId, type, bar) {

	var elements = [];
	document.getElementById(bar).style.display = "none";
	DesignLogicalBarRender.turnOffButton(iconId);

	var classif = "[classification = '" + type + "']";
	elements = tdvCy.nodes().filter(classif);
	for (var i = 0; i < elements.length; i++) {
		elements[i].style("display", "none");

	}
	CommonFctsLogical.turnOffToolTips();
}

DesignLogicalBarRender.turnElementBarON = function(iconId, type, bar, ele) {
	var elements = [];
	var classif = "[classification = '" + type + "']";
	elements = tdvCy.nodes().filter(classif);

	if (elements.length > 0) {
		document.getElementById(bar).style.display = "block";
		DesignLogicalBarRender.turnONButton(iconId);
		for (var i = 0; i < elements.length; i++) {
			elements[i].style("display", "element");
		}
	}
}

DesignLogicalBarRender.turnOffButton = function(img) {
	var ele = document.getElementById(img);
	ele.className = "btn btn-default btn-default btn-block";
	if (img == "node_img") {
		ele.innerHTML = "<span class='glyphicon glyphicon-off'></span>";
	}
	if (img == "link_img") {
		ele.innerHTML = "<span class='glyphicon glyphicon-random'></span>";
	}
	if (img == "path_img") {
		ele.innerHTML = "<span class='glyphicon glyphicon-unchecked'></span>";
	}
	if (img == "system_img") {
		ele.innerHTML = "<span class='glyphicon glyphicon-warning-sign'></span>";
	}
	ele.setAttribute("data-state", "hidden");
}

DesignLogicalBarRender.turnOffTypes = function(classification) {
	if (tdvCy) {
		var elements = tdvCy.nodes().filter("[classification = '" + classification + "']");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style("display", "none");
		}
	}
}

DesignLogicalBarRender.turnONBar = function(bar) {
	document.getElementById(bar).style.display = "block";
}

DesignLogicalBarRender.turnONButton = function(img) {
	var ele = document.getElementById(img);
	ele.className = "btn btn-primary btn-primary btn-block";
	if (img == "node_img") {
		ele.innerHTML = "<span class='glyphicon glyphicon-off'></span><br/>Nodes";
	}
	if (img == "link_img") {
		ele.innerHTML = "<span class='glyphicon glyphicon-random'></span><br/>Links";
	}
	if (img == "path_img") {
		ele.innerHTML = "<span class='glyphicon glyphicon-unchecked'></span><br/>Paths";
	}
	if (img == "system_img") {
		ele.innerHTML = "<span class='glyphicon glyphicon-warning-sign'></span><br/>Systems";
	}
	ele.setAttribute("data-state", "visible");
}

DesignLogicalBarRender.turnONTypes = function(classification) {
	if (tdvCy) {
		var elements = tdvCy.nodes().filter("[classification = '" + classification + "']");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style("display", "element");
		}
	}

}

DesignLogicalBarRender.unselect = function(event) {
	$(".circleColor").css("border-color", "black");
	$(".typenode").css("border-color", "black");
	document.getElementById("label_node_positions").value = defaultTypeLabelPosition;
	document.getElementById("label_node_size").value = defaultTypeLabelSize;
	$('#error_message').empty();
	$("#active_type").empty();
	$(".qtip").remove();

	var divObj = $("#create_type");
	if ($("#create_type").hasClass('ui-dialog-content')) {
		$("#create_type").dialog('close');
	}

	DesignSavingFcts.clearSelection();

	selectedElement = null;
	list = [];

	ruleSelected = false;
	originType = null;
	destType = null;
	creatingConnection = false;
	mouseEventTime = new Date().getTime();
	pleaseWait = true;
	shiftkeySelected = false;
	activeElement = null;
	createRuleClassification = null;
	// reset the cursor
	GlobalUtils.cursor_clear();
	tdvCy.nodes().selectify();
	tdvCy.nodes().removeClass('semitransp');

	// cancel assign link to type 
	$("#bottom_help").empty();
	//	document.getElementById("bottom_help").style.display = 'none';
	//	document.getElementById("bottom_help").style.visibility = 'hidden';
	typelinkCreate = false;
	typelinkType = '';
	// remove any attached text to mouse
	$("#besideMouse").html("");
	$("#besideMouseCreate").html("");
	ConnectionPropertyUtils.mouseText(event);
	ConnectionPropertyUtils.mouseTextCreate(event);

	// reset the buttons for create PC and Assign type
	document.getElementById("create_PC").className = "btn btn-primary text-center";
	document.getElementById("assign_link").className = "btn btn-primary text-center";
	ContextMenuFunctions.closeNav();
	currentColor = defaultNodeColor;
	currentSize = defaultTypeSize;
	currentIdxColor = 0;
	currentIdxSize = 0;
	action = null;

	listTypeIds = [];
	listConnIds = [];
	// hide create division
	$("#property_win").empty();
	document.getElementById("property_win").style.display = 'none';
	document.getElementById("property_win").style.visible = 'hidden';

	DesignLogicalBarRender.barUnSelection(typeMapViaId, "typelist", "typeslist", "totalNodes", "node");
	DesignLogicalBarRender.barUnSelection(typeMapViaId, "pathlist", "pathslist", "totalPaths", "path");
	DesignLogicalBarRender.barUnSelection(typeMapViaId, "systemlist", "systemslist", "totalSystems", "system");
	DesignLogicalBarRender.barRuleUnSelection(ruleMapViaId, "linklist", "linkslist", "totalLinks", "link");

}

DesignLogicalBarRender.barUnSelection = function(list, bar, divName, totalText, type) {

	var nbNodes = tdvCy.elements('node[classification="' + type + '"]').length;
	if (nbNodes == 0) {
		DesignLogicalBarRender.turnOffButton(type + "_img");
		document.getElementById(bar).innerHTML = "";
		if (type != 'node') {
			document.getElementById(type + "tr").style.display = 'none';
			document.getElementById(type + "tr").style.visibility = 'hidden';
		}
		return;
	}

	var listElements = DesignLogicalBarRender.buildList(list, bar, divName, totalText, type);
	document.getElementById(bar).innerHTML = listElements;

	DesignLogicalBarRender.adjustBar(divName, type);

	var ele = document.getElementById(type + "_img");
	var state = ele.getAttribute("data-state");
	if (state == "visible") {
		DesignLogicalBarRender.turnONButton(type + "_img");
		if (type != 'node') {
			document.getElementById(type + "tr").style.display = 'table-row';
			document.getElementById(type + "tr").style.visibility = 'visible';
		}
		DesignLogicalBarRender.turnONTypes(type);
	} else {
		DesignLogicalBarRender.turnONButton(type + "_img");
		if (type != 'node') {
			document.getElementById(type + "tr").style.display = 'table-row';
			document.getElementById(type + "tr").style.visibility = 'visible';
		}
		document.getElementById(bar).style.display = 'block';
		document.getElementById(bar).style.visibility = 'visible';

		DesignLogicalBarRender.turnONTypes(type);

	}
}

DesignLogicalBarRender.barRuleUnSelection = function(list, bar, divName, totalText, type) {

	var nbNodes = tdvCy.elements('node[classification="link"]').length;
	if (nbNodes == 0) {
		DesignLogicalBarRender.turnOffButton("link_img");
		document.getElementById(bar).innerHTML = "";
		document.getElementById("linktr").style.display = 'none';
		document.getElementById("linktr").style.visibility = 'hidden';
		return;
	}

	var ele = document.getElementById(type + "_img");
	var state = ele.getAttribute("data-state");

	var inputs = '';
	inputs = "<div id='linksList'>";
	inputs += "<span class='badge' id='totalLinks'>*(" + nbNodes + ")</span>";

	$.each(list, function(key, value) {
		if (value.classification == "link") {
			inputs += "<span class='label label-default'  id='rule_" + value.id
				+ "' title='Select to view in Graph' onclick=\"(new DesignLogicalRenderer()).ruleSelect('" + value.id + "')\"  >" + value.name + "</span>";
		}
	});
	inputs += "</div>";
	document.getElementById(bar).innerHTML = "";
	document.getElementById(bar).innerHTML = inputs;

	DesignLogicalBarRender.adjustBar('linksList', 'link');

	if (state == "visible") {
		DesignLogicalBarRender.turnONButton("link_img");
		document.getElementById(bar).style.display = 'block';
		document.getElementById(bar).style.visibility = 'visible';
		document.getElementById("linktr").style.display = 'table-row';
		document.getElementById("linktr").style.visibility = 'visible';
		if (tdvCy) {
			var elements = tdvCy.nodes().filter("[classification = '" + type + "']");
			for (var i = 0; i < elements.length; i++) {
				elements[i].style("display", "element");
			}
		}
		var links = [];
		links = tdvCy.edges().filter("[classification = 'link']");
		for (var j = 0; j < links.length; j++) {
			links[j].style("display", "element");
		}
	} else {
		DesignLogicalBarRender.turnONButton("link_img");
		document.getElementById(bar).style.display = 'block';
		document.getElementById(bar).style.visibility = 'visible';

		document.getElementById("linktr").style.display = 'table-row';
		document.getElementById("linktr").style.visibility = 'visible';
		if (tdvCy) {
			var elements = tdvCy.nodes().filter("[classification = '" + type + "']");
			for (var i = 0; i < elements.length; i++) {
				elements[i].style("display", "element");
			}
		}
		var links = [];
		links = tdvCy.edges().filter("[classification = 'link']");
		for (var j = 0; j < links.length; j++) {
			links[j].style("display", "element");
		}
	}

}

DesignLogicalBarRender.barSelection = function(list, bar, divName, totalText, type) {

	var nb;
	nb = Object.keys(list).length;
	if (nb == 0) {
		document.getElementById(bar).innerHTML = "";
		DesignLogicalBarRender.turnOffButton(type + "_img");
		return;
	}

	var found = DesignLogicalBarRender.foundTypeInList(list, type);

	if (!found) {
		document.getElementById(bar).innerHTML = "";
		DesignLogicalBarRender.turnOffButton(type + "_img");
		return;
	}
	var listElements = DesignLogicalBarRender.buildList(list, bar, divName, totalText, type);
	document.getElementById(bar).innerHTML = listElements;
	DesignLogicalBarRender.adjustBar(divName, type);

	document.getElementById(bar).style.display = 'block';
	document.getElementById(bar).style.visibility = 'visible';
	DesignLogicalBarRender.turnONButton(type + "_img");
	if (type != 'node') {
		document.getElementById(type + "tr").style.display = 'table-row';
		document.getElementById(type + "tr").style.visibility = 'visible';
	}
	if (tdvCy) {
		var elements = tdvCy.nodes().filter("[classification = '" + type + "']");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style("display", "element");
		}
	}
}

DesignLogicalBarRender.foundTypeInList = function(list, type) {
	var found = false;
	$.each(list, function(key, value) {
		if (value.classification == type) {
			found = true
		}
	});
	return found;
}

DesignLogicalBarRender.barRuleSelection = function(list, bar, divName, totalText, type) {

	var nb;
	nb = Object.keys(list).length;
	if (nb == 0) {
		document.getElementById(bar).innerHTML = "";
		DesignLogicalBarRender.turnOffButton(type + "_img");
		return;
	}

	// new code for rule bar selection ===================================//
	var inputs = '';
	inputs = "<div id='linksList'>";
	inputs += "<span class='badge' id='totalLinks'>*(" + nb + ")</span>";

	$.each(list, function(key, value) {
		if (value.classification == "link") {
			inputs += "<span class='label label-default'  id='rule_" + value.id
				+ "' title='Select to view in Graph' onclick=\"(new DesignLogicalRenderer()).ruleSelect('" + value.id + "')\"  >" + value.name + "</span>";
		}
	});
	inputs += "</div>";
	document.getElementById(bar).innerHTML = "";
	document.getElementById(bar).innerHTML = inputs;
	DesignLogicalBarRender.adjustBar('linksList', 'link');
	//=====================================================================//

	DesignLogicalBarRender.turnONButton(type + "_img");
	document.getElementById(bar).style.display = 'block';
	document.getElementById(bar).style.visibility = 'visible';
	document.getElementById(type + "tr").style.display = 'table-row';
	document.getElementById(type + "tr").style.visibility = 'visible';
	if (tdvCy) {
		var elements = tdvCy.nodes().filter("[classification = '" + type + "']");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style("display", "element");
		}
	}
	var links = [];
	links = tdvCy.edges().filter("[classification = 'link']");
	for (var j = 0; j < links.length; j++) {
		links[j].style("display", "element");
	}

}

DesignLogicalBarRender.resetSpanBorderInBar = function() {
	$("[id^='rule_']").css({
		'border' : ''
	});
	$("#typeslist").find("span").css({
		'border' : ''
	});
}

DesignLogicalBarRender.barStatus = function() {

	if ($.isEmptyObject(barStatus)) {
		// just loading page
		var ele = document.getElementById('node_img');
		var state = ele.getAttribute("data-state");
		barStatus["node"] = {
			curentState : state
		}
		ele = document.getElementById('path_img');
		state = ele.getAttribute("data-state");
		barStatus["path"] = {
			curentState : state
		}
		ele = document.getElementById('system_img');
		state = ele.getAttribute("data-state");
		barStatus["system"] = {
			curentState : state
		}
		ele = document.getElementById('link_img');
		state = ele.getAttribute("data-state");
		barStatus["link"] = {
			curentState : state
		}
	}
}

DesignLogicalBarRender.adjustBar = function(barElementId, type) {

	var typeBar = document.getElementById(barElementId);
	var maxLength = typeBar.parentElement.parentElement.offsetWidth - 20;
	var currentLenth = 0;
	var finishedFirstLine = false;
	$("#" + barElementId).children("span").each(function() {

		if (finishedFirstLine == false) {
			currentLenth = currentLenth + this.offsetWidth;

			if (currentLenth > maxLength && maxLength > 100) {
				$('<a onclick="toggle_visibility(\''
					+ type + '_suite\');" id="a_'
					+ type + '_suite"><i class="fa fa-toggle-right";"></i></a><div id="'
					+ type + '_suite" style="display:none"></div>').insertBefore(this);

				$("#" + type + "_suite").append(this);

				finishedFirstLine = true;
			}
		} else {

			$("#" + type + "_suite").append(this);
		}
	});
};

//==================================================================================================================================//
//============================================= OLD CODE ===========================================================================//

//Display/Hide the bar
//DesignLogicalBarRender.displayHideBar = function(img, bar, nbElements, text, ucase, type) {
//
//	var ele = document.getElementById(img);
//	var state = ele.getAttribute("data-state");
//	// actual state in the bar is hidden 
//	if (state == 'hidden') {
//		if (nbElements > 0) {
//			//show the bar 
//			document.getElementById(bar).style.display = "block";
//			// change the button
//			document.getElementById(img).className = "btn btn-primary  text-center";
//			document.getElementById(img).innerHTML = "<img src='/webguiportal/assets/img/newdesign/" + text + ".png'/>" + text;
//			document.getElementById(img).setAttribute("data-state", "visible");
//			// show the lements in cytoscape
//			elements = tdvCy.nodes().filter("[classification = '" + type + "']");
//			for (var i = 0; i < elements.length; i++) {
//				elements[i].style("display", "element");
//			}
//
//		} else {
//			// state hidden and there are no elements to show
//
//		}
//	} else {
//		// state is visible
//		if (nbElements == 0) {
//			// hide the bar 
//			document.getElementById(bar).style.display = "none";
//			// change the button 
//			document.getElementById(img).className = "btn btn-default text-center";
//			document.getElementById(img).innerHTML = "<i class='fa fa-circle-o' aria-hidden='true'></i>" + text;
//		}
//	}
//}


//DesignLogicalBarRender.buildListLinks = function(list, bar, divName, totalText, type) {
//
//	var nbNodes = tdvCy.elements('node[classification="' + type + '"]').length;
//	var ncount = 0;
//	var text = 'toggle_visibility("' + type + '_suite")';
//	var inputs = '';
//	inputs = "<div id='" + divName + "'>";
//	inputs += "<span class='badge' id='" + totalText + "'>*(" + nbNodes + ")</span>";
//	ncount++;
//	$.each(list, function(key, value) {
//		if (value.classification == "link") {
//			inputs += "<span class='label label-default'  id='rule_" + value.id
//				+ "' title='Select to view in Graph' onclick=\"(new DesignLogicalRenderer()).ruleSelect('" + value.id + "')\"  >" + value.name + "</span>";
//
//			ncount++;
//			if (ncount == 25) {
//				inputs += "<a onclick='" + text + "' id='a_link_suite' ><i class='fa fa-toggle-right'></i></a> <div id='" + type + "_suite' style='display:none' >";
//
//			//				inputs += "<a onclick='" + text + "' id='a_link_suite' ><i class='fa fa-toggle-right' style='margin-left: 4px;font-size:24px;color:blue'  ></i></a> <div id='" + type + "_suite' style='display:none' >";
//			}
//		}
//	});
//	if (ncount > 25) {
//		inputs += "</div>";
//	}
//	inputs += "</div>";
//	return inputs;
//
//}

//DesignLogicalBarRender.buildLoadBar = function(list, bar, divName, totalText, type) {
//	// divName could be   = typesList , pathsList, systemsList, ListElements
//	// bar     could be   = typelist  , pathlist,  systemlist,  linklist
//	// list is the list of items
//	// need an ID for totalElements : totalNodes, totalPaths, totalSystems, totalLinks
//
//	//       console.log("Build the bar contents based from a list");
//	var nb;
//	nb = Object.keys(list).length;
//
//	if (nb == 0 && type != 'node') {
//		// no elements at all in the list   typeMapViaId is empty 
//		// hide all bars leave only nodes
//		document.getElementById(type + "tr").style.display = 'none';
//		document.getElementById(type + "tr").style.visibility = 'hidden';
//
//		return;
//	} else if (nb == 0 && type == 'node') {
//		DesignLogicalBarRender.turnOffButton("node_img");
//		return;
//	}
//
//
//	var nbNodes = tdvCy.elements('node[classification="' + type + '"]').length;
//	console.log("There are  " + nbNodes + "  of type " + type);
//
//	if (nbNodes == 0 && type != 'node') {
//		document.getElementById(type + "tr").style.display = 'none';
//		document.getElementById(type + "tr").style.visibility = 'hidden';
//		return;
//	} else if (nbNodes == 0 && type == 'node') {
//		// what to do if no nodes created yet
//		DesignLogicalBarRender.turnOffButton("node_img");
//		return;
//	}
//
//	// Here it means we have elements of type   nbNodes > 0 
//
//	var tdwidth = document.getElementById("td_" + bar).offsetWidth;
//	console.log("bar offsetwidth is " + tdwidth);
//	var ncount = 0;
//	var nbrow = 1;
//	var text = 'toggle_visibility("' + type + '_suite")';
//	var inputs = '',
//		nbNodesFound = 0;
//
//	inputs = "<div id='" + divName + "'>";
//	inputs += "<span class='badge' id='" + totalText + "'>*(" + nbNodes + ")</span>";
//	ncount++;
//	$.each(list, function(key, value) {
//		var color = GlobalUtils.getNodeColor(value);
//		if (value.classification == type) {
//			inputs += "<span class='badge' style='color:black; background:" + color + ";' id='" + value.id
//				+ "' title='Select to view in Graph' onclick=\"(new DesignLogicalRenderer()).typeSelect('" + value.id + "')\"  >"
//				+ value.name + "</span>";
//
//			ncount++;
//			if (ncount == 25) {
//				inputs += "<a onclick='" + text + "' id='a_" + type + "_suite' ><i class='fa fa-toggle-right' ></i></a> <div id='" + type + "_suite' style='display:none' >";
//
//			//				inputs += "<a onclick='" + text + "' id='a_" + type + "_suite' ><i class='fa fa-toggle-right' style='margin-left: 4px;font-size:24px;color:blue'  ></i></a> <div id='" + type + "_suite' style='display:none' >";
//			}
//			nbNodesFound++;
//		}
//	});
//	if (ncount > 25) {
//		inputs += "</div>";
//	}
//	inputs += "</div>";
//
//	document.getElementById(bar).innerHTML = inputs;
//	document.getElementById(bar).style.display = 'table-row';
//	document.getElementById(bar).style.visibility = 'visible';
//	DesignLogicalBarRender.turnONButton(type + "_img");
//	if (type != 'node') {
//		document.getElementById(type + "tr").style.display = 'table-row';
//		document.getElementById(type + "tr").style.visibility = 'visible';
//	}
//
//
//}