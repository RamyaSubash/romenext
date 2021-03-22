/**
 * 
 */
function DesignLinkFctsUtils() {
};


DesignLinkFctsUtils.assignLinkToType = function(event) {
	$("#error_message").empty();
	if (ruleSelected && createRuleClassification == 'link') {
		CommonFctsLogical.HandlingErrorMSG("Process of Assigning Link to Type -- Aborted", "error");
		DesignLinkFctsUtils.abortAssignLinkToType();
	// some type are selected  -- issue an error message or clear ALL
	} else {
		// if no links created first create a link
		DesignLogicalBarRender.resetSpanBorderInBar();
		var eles = tdvCy.nodes().filter("[classification = 'link']");
		if ($.isEmptyObject(eles) && eles.length == 0) {
			CommonFctsLogical.HandlingErrorMSG("No links available -- Assign a link to Type Fails", "error");
			return;
		}
		// remove any selection
		DesignSavingFcts.clearSelection();

		$(".qtip").remove();
		$(".sidebotnav").empty();
		document.getElementById("mySidebotnav").style.height = 'auto';

		// prepare division 
		var divprop = document.createElement('div');
		divprop.id = 'typeFormlink';
		divprop.className = 'block';
		divprop.innertHTML = '';

		$("#property_win").empty();
		$("#property_win").append(divprop);

		posWin = null;
		var d = document.getElementById("property_win");
		d.style.position = 'absolute';
		d.style.right = '5px';
		d.style.left = '';
		d.style.top = document.getElementById("menu2").getBoundingClientRect().top + 200 + 'px';
		d.style.width = '230px';
		document.getElementById("property_win").style.display = 'block';
		document.getElementById("property_win").style.visible = 'visibility';
	

		var inputs = "";
		inputs += "<h5>Assign a  Link</h5>";
		inputs += "<input type='checkbox' id='dis_link_bt' disabled/><label id='dis_link' >Link </label><br/>";
		inputs += "<input type='checkbox' id='dis_typeS_bt' disabled/><label id='dis_typeS' > </label><br/>";
		inputs += "<input type='checkbox' id='dis_typeE_bt' disabled/><label id='dis_typeE' ></label><br/>";

		$("#typeFormlink").append(inputs);

		selectedElement = null;
		ruleSelected = true;
		createRuleClassification = "link";
		originType = null;
		destType = null;
		linkSelected = null;
		creatingConnection = false;

		GlobalUtils.cursor_wait();
		document.getElementById("assign_link").className = "btn btn-default text-center";
		$("#besideMouse").html("<span class='badge'>Select Link</span>");
		ConnectionPropertyUtils.mouseText(event);

		var eles = tdvCy.nodes().filter("[classification != 'link']");
		var edges = tdvCy.edges();
		eles.unselectify();
		eles.addClass('semitransp');
		edges.unselectify();
		edges.addClass('semitransp');

	}
}

DesignLinkFctsUtils.saveAssignLinkToType = function() {

	var jsonData = {};

	console.log("values for assigning link to Type are :");
	console.log(" Link is " + linkSelected + " Origin Type is : " + originType + " destination type is " + destType);
	if (linkSelected == null || originType == null || destType == null) {
		Error_handlingUtils.consolePrint("Operation assign Type to link Can not be achieved", "error");
		CommonFctsLogical.HandlingErrorMSG("Operation assign Type to link Can not be achieved", "error");
		return;
	}

	jsonData = GlobalApiUtils.assignApiHeaders(jsonData);	
	
	jsonData["ruleId"] = linkSelected;
	jsonData["origId"] = originType;
	jsonData["destId"] = destType;	

	console.log(jsonData)
	var successFunction = function(data) {
		if (!$.isEmptyObject(data)) {
			DesignSavingFcts.clearSelection();
			Error_handlingUtils.consolePrint("Assign Link To Type successful", "success");
			CommonFctsLogical.HandlingErrorMSG("Assign Type to Link successfull", "success");
			
			var newEdge = DesignCytoscapeUtils.formatNewConnection(data);
			ConnectionPropertyUtils.updateConnGraph(tdvCy, newEdge);
			
			tdvCy.filter("edge[id='connection" + data.id + "']").select();

			if (!$.isEmptyObject(ruleMapViaId[linkSelected].typeProperties)) {
				CommonFctsLogical.addRelTooltip(data.id, linkSelected);
			}
		}
	};

	var failFunction = function(xhr, status, error) {
		console.log('Error Link assign not done: ' + xhr.status);
		$("#typeFormlink").append("error in assign node to link -- see log");
		CommonFctsLogical.HandlingErrorMSG("Error Link not created", "error");
	};

	var apis = new ConnectionApis();
	apis.assignLinkToTypeAPI(jsonData, successFunction, failFunction);

}

DesignLinkFctsUtils.abortAssignLinkToType = function() {
	GlobalUtils.cursor_clear();
	$("#besideMouse").html("");
	ConnectionPropertyUtils.mouseText(e);

	document.getElementById("assign_link").className = "btn btn-primary text-center";

	selectedElement = null;
	ruleSelected = false;
	originType = null;
	destType = null;
	createRuleClassification = null;
	linkSelected = null;
	creatingConnection = false;

	mouseEventTime = null;
	$("#typeFormlink").empty();
	$("#property_win").empty();
	document.getElementById("property_win").style.display = 'none';
	document.getElementById("property_win").style.visible = 'hidden';
	//	document.getElementById("mySidebotnav").style.height = 'auto';

	tdvCy.nodes().selectify();
	tdvCy.edges().selectify();
	tdvCy.nodes().removeClass('semitransp');
	tdvCy.edges().removeClass('semitransp');
}

//=====================================================================================================//

DesignLinkFctsUtils.deleteTypeByGroup = function(typeId) {
	var jsonData = {};	
	jsonData = GlobalApiUtils.assignApiHeaders(jsonData);
	jsonData["typeId"] = Number(typeId);

	var classification = typeMapViaId[typeId].classification;
	var name = typeMapViaId[typeId].name;
	console.log("Deleting this type: "); console.log(jsonData);

	var successFunction = function(data) {
		if (data) {  // data = true
			// remove type from global variable holding types
			delete typeMap[name];
			delete typeMapViaId[typeId];

			// remove type from cytoscape
			CytoNodeUtils.removeNode(typeId);
						
			// remove type from bar 
			if (activeElement == typeId) {
				DesignLogicalBarRender.unselect(event);
				activeElement = null;
			} else {
				if (document.getElementById(typeId)) {
					document.getElementById(typeId).remove();
				}
			}
			// display error message in console and message bar
			Error_handlingUtils.consolePrint("Delete Type " + classification + " successful", "success");
			CommonFctsLogical.HandlingErrorMSG("Delete  " + classification + " " + name + " successfully.", "success");
		}

	}

	var failFunction = function(xhr, status, error) {
		CommonFctsLogical.HandlingErrorMSG("Deleting  " + name + " failed.", "error");
		console.log("Delete Type Failed" + xhr.responseText);
	};

	var apis = new TypeApi();
	apis.deleteTypeByGroupAPI(jsonData, successFunction, failFunction);

}