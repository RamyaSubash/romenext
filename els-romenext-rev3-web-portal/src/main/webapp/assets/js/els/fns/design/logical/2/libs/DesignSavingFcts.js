/**
 * 
 */
function DesignSavingFcts() {
}
;
/******************* USED ************/
DesignSavingFcts.saveType = function() {
	$("#error_create").empty();
	console.log("===> CALLED Function :  DesignSavingFcts.saveType   ");
	var typeId = null;
	var decoProps = predefinedSelectedDecoPropertiesMap;
	var name = null;
	// retrieve classification
	var classification = $('#add_classification').val();

	// retrieve name 
	if ($('#add_' + typelinkType + '_name').val()) {
		name = $('#add_' + typelinkType + '_name').val();
	} else {
		document.getElementById('error_create').append(classification + " name missing");
		return;

	}
	// retrieve is_Root
	var IsRoot = $('#add_isRoot').val();


	var jsonData = {};
	var newDecoProperties = [];
	if ($.isEmptyObject(posType)) {
		console.log(" Position is not defined ");
	}

	DesignSavingFcts.setJsonDataCreation(name, IsRoot, classification, jsonData);
	var stopStep2 = false;
	console.log(jsonData);
	var successFunction = function(data) {
		if (!$.isEmptyObject(data)) {

			DesignSavingFcts.clearSelection();
			CommonFctsLogical.HandlingErrorMSG(classification + " Creation Successfully", "success");
			Error_handlingUtils.consolePrint(classification + " creation successful", "success");
			console.log("returned data " + data);

			var tmpObj = data;
			DesignLogicalType.afterSaveNewType(tmpObj, posType);

			DesignSavingFcts.closingDialog();
			typeId = tmpObj.id;


		} else {
			CommonFctsLogical.HandlingErrorMSG("Type Created Successfully- API Success but no data returned", "warning");
		}
	};

	var failFunction = function(xhr, status, error) {
		console.log(' SAVE TYPE Error : ' + xhr.status);
		console.log(' what are these : ' + xhr.responseJSON.exceptionCode);
		console.log(' what are these : ' + xhr.statusText);
		console.log(' what are these : ' + status)
		console.log(' what are these : ' + error)
		if (xhr.responseJSON.exceptionNumber == "2.0.2") {
			document.getElementById('error_create').append("TYPE NAME ALREADY_EXISTS");
			CommonFctsLogical.HandlingErrorMSG("TYPE NAME ALREADY_EXISTS.", "warning");
			stopStep2 = true;
			return;
		} else {
			document.getElementById('error_create').append("Type save name : API failed  " + xhr.responseJSON.exceptionNumber);
			console.log("Type save name : API failed  " + xhr.responseJSON.exceptionCode);
			return;
		}
	};

	var apis = new TypeApi();
	apis.createTypeByGroup(selectedMetaData, jsonData, successFunction, failFunction);
	if (stopStep2) {
		return;
	}
	if (typeId != null) {
		var preferenceList = [];
		var preference1 = {
			name : "size",
			propertyType : "STRING",
			defaultValue : "0"
		};
		var preference2 = {
			name : "color",
			propertyType : "STRING",
			defaultValue : "0"
		};
		preferenceList.push(preference1);
		preferenceList.push(preference2);

		var dlRenderer = new DesignLogicalRenderer();
		dlRenderer.addPreferenceToTypeBatch(typeId, preferenceList);
		tdvCy.filter("node[id='" + listTypeIds[0] + "']").select();

	} else {
		CommonFctsLogical.HandlingErrorMSG("Type Creation did not return typeId -- no creation of preferences (size, color)", "error");
	}
}

DesignSavingFcts.saveDCT = function() {
	$("#error_create").empty();
	console.log("===> CALLED Function :  DesignSavingFcts.saveDCT   ");
	var typeId = null;
	var decoProps = predefinedSelectedDecoPropertiesMap;
	var name = null;

	if ($.isEmptyObject(posType)) {
		console.log(" Position is not defined ");
	}

	// retrieve name 
	if ($('#add_dct_name').val()) {
		name = $('#add_dct_name').val();
	} else {
		document.getElementById('error_create').append("DTC name missing");
		return;

	}
	// retrieve is_Root
	var IsRoot = $('#add_isRoot').val();
	// no need to retrieve classification

	var jsonData = {};

	DesignSavingFcts.setJsonDataCreation(name, IsRoot, null, jsonData);
	console.log(jsonData);
	var successFunction = function(data) {
		if (!$.isEmptyObject(data)) {

			// Unselect all nodes/edges in Cytoscape
			DesignSavingFcts.clearSelection();
			// display message in console and page
			Error_handlingUtils.consolePrint("DCT creation successful", "success");
			CommonFctsLogical.HandlingErrorMSG("DCT creation successfull", "success");

			// set position					
			if (!$.isEmptyObject(posType)) {
				DesignCytoscapeUtils.updatePosition(data, 'x', posType.x);
				DesignCytoscapeUtils.updatePosition(data, 'y', posType.y);
			}

			// set default color/size
//			data.color = defaultNodeColor;
//			data.size = defaultTypeSize;
//			data.labelPosition = defaultTypeLabelPosition;
//			data.labelSize = defaultTypeLabelSize;
			// add element in TypeMapViaId
			var tmpObj = data;
			typeMapViaId[tmpObj.id] = data;
			// format element for cytoscape		
//			var element = DesignCytoscapeUtils.formatNewType(data);
//			var element = DesignCytoscapeUtils.formatNewType(typeMapViaId[tmpObj.id]);
			
			var element = CytoNodeUtils.formatNode(typeMapViaId[tmpObj.id]);
			
			// add to cytoscape		
			var newElement = tdvCy.add(element);

			// associate events to element
			DesignCytoscapeUtils.attachTypeClickActions(newElement.filter('node'));

			// close dialog
			DesignSavingFcts.closingDialog();

			typeId = tmpObj.id;
		}

	};

	var failFunction = function(xhr, status, error) {
		console.log(' SAVE TYPE Error : ' + xhr.status);
		console.log(' what are these : ' + xhr.responseJSON.exceptionCode);
		console.log(' what are these : ' + xhr.statusText);
		console.log(' what are these : ' + status)
		console.log(' what are these : ' + error)
		if (xhr.responseJSON.exceptionNumber == "2.0.2") {
			document.getElementById('error_create').append("DTC TYPE NAME ALREADY_EXISTS");
			CommonFctsLogical.HandlingErrorMSG("DTC TYPE NAME ALREADY_EXISTS.", "warning");
			return;
		} else {
			document.getElementById('error_create').append("Saving DTC Node  API failed " + xhr.responseJSON.exceptionNumber);
			console.log("Saving DTC Node  API failed  " + xhr.responseJSON.exceptionCode);
			return;
		}



	};

	var apis = new DCTApis();
	apis.saveNewDCT(jsonData, successFunction, failFunction);

	if (typeId != null) {
		var preferenceList = [];
		var preference1 = {
			name : "size",
			propertyType : "STRING",
			defaultValue : "0"
		};
		var preference2 = {
			name : "color",
			propertyType : "STRING",
			defaultValue : "0"
		};
		preferenceList.push(preference1);
		preferenceList.push(preference2);
		var dlRenderer = new DesignLogicalRenderer();
		dlRenderer.addPreferenceToTypeBatch(typeId, preferenceList);
	}

	tdvCy.filter("node[id='" + typeId + "']").select();

}

DesignSavingFcts.saveLink = function() {

	$("#error_create").empty();
	console.log("===> CALLED Function :  DesignSavingFcts.saveLink   ");
	var linkName = null;

	if ($.isEmptyObject(posType)) {
		console.log(" Position is not defined ");
	}

	if ($('#add_link_name').val()) {
		linkName = $('#add_link_name').val();
	} else {
		document.getElementById('error_create').append("Link name missing");
		return;
	}
	var ruleId = null;
	var classification = $('#add_classification').val();
	var jsonData = {};
	jsonData["name"] = linkName;
	jsonData["ruleclassification"] = classification;
	jsonData["namespace"] = loggedInUserName;
	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name;

	console.log(jsonData);

	var successFunction = function(data) {
		DesignSavingFcts.clearSelection();
		Error_handlingUtils.consolePrint("Link creation successful", "success");
		CommonFctsLogical.HandlingErrorMSG("Link creation successfull", "success");

		var tmpObj = data;
		if (!$.isEmptyObject(posType)) {
			DesignCytoscapeUtils.updatePosition(data, 'x', posType.x);
			DesignCytoscapeUtils.updatePosition(data, 'y', posType.y);
		}
		if (!ruleMapViaId[data.id]) {
			ruleMapViaId[data.id] = data;
		}
		var element = DesignCytoscapeUtils.formatNewLink(data);
		var newElement = tdvCy.add(element);
		//		tdvCy.filter('node[name="' + data.name + '"]').data(data);
		DesignCytoscapeUtils.attachTypeClickActions(newElement.filter('node'));
		(new DesignLogicalRenderer()).initDesignBar(ruleMapViaId, "linklist");
		tdvCy.filter("node[id='#rule" + data.id + "']").select();
		listLinkIds[0] = data.id;
		ruleId = data.id;
		DesignSavingFcts.closingDialog();
	};

	var failFunction = function(xhr, status, error) {
		if (xhr.responseJSON.exceptionNumber == "2.1.7") {
			CommonFctsLogical.HandlingErrorMSG("LINK NAME ALREADY_EXISTS.", "warning");
			document.getElementById('error_create').append("LINK NAME ALREADY_EXISTS");
			return;

		} else {
			document.getElementById('error_create').append("link update name : API failed not updated");
			console.log("link update name : API failed not updated: " + xhr.responseJSON.exceptionCode);
			return;
		}


	};

	var apis = new ConnectionApis();
	apis.saveNewLink(selectedMetaData, jsonData, successFunction, failFunction);

	CommonFctsLogical.saveNewLinkPos(ruleId);
}

DesignSavingFcts.setJsonDataCreation = function(name, IsRoot, classification, jsonData) {

		jsonData["name"] = name;
		jsonData["isRoot"] = IsRoot;
		if (classification) {
			jsonData["classification"] = classification;
		}
		if (classification != 'dct') {
			jsonData["owner"] = loggedInUserName;
		}
		jsonData['decorators'] = [];
		jsonData["namespace"] = loggedInUserName;
		jsonData["grouphost"] = userGroup.host;
		jsonData["groupname"] = userGroup.name;
}

//=========================================================================================//
DesignSavingFcts.cancelCreate = function() {
	DesignSavingFcts.closingDialog();
}

DesignSavingFcts.closingDialog = function() {
	$("#typecreateForm").empty();

	typelinkCreate = false;
	typelinkType = '';
	posType = null;
	posWin = null;
	$("#property_win").empty();
	document.getElementById("property_win").style.display = 'none';
	document.getElementById("property_win").style.visible = 'hidden';

}

DesignSavingFcts.clearSelection = function() {
	if (tdvCy) {
		tdvCy.nodes().unselect();
		tdvCy.edges().unselect();
	}

	listTypeIds = [];
	listLinkIds = [];
	listConnIds = [];

}

DesignSavingFcts.clearAssignLink = function() {

	ruleSelected = false;
	createRuleClassification = null;

	originType = null;
	destType = null;
	linkSelected = null;

	GlobalUtils.cursor_clear();
	document.getElementById("assign_link").className = "btn btn-default text-center";
	$("#besideMouse").html("<span class='badge'>Select Link</span>");
	ConnectionPropertyUtils.mouseText(event);

}