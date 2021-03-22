/**
 * 
 */
function DesignLogicalType() {
}

//DesignLogicalType.saveNewType = function(typeName, typeIsRoot, owner, classification, decorators, pos) {
//	console.log("===> CALLED Function :  DesignLogicalType.saveNewType   ");
//	var typeId = null;
//	var decoProps = predefinedSelectedDecoPropertiesMap;
//	var jsonData = {};
//	var newDecoProperties = [];
//
//	jsonData = DesignLogicalType.buildSaveNewTypeJson(typeName, typeIsRoot, owner, classification, decorators);
//	console.log(jsonData);
//
//	var successFunction = function(data) {
//		if (!$.isEmptyObject(data)) {
//			CommonFctsLogical.HandlingErrorMSG("Type Created Successfully", "success");
//			var tmpObj = data;
//			DesignLogicalType.afterSaveNewType(tmpObj, pos);
//			typeId = tmpObj.id;
//		} else {
//			CommonFctsLogical.HandlingErrorMSG("Type Created Succeesfully- API Success but no data returned", "warning");
//		}
//	};
//
//	var failFunction = function(xhr, status, error) {
//		console.log(' SAVE TYPE Error : ' + xhr.status);
//		console.log(' what are these : ' + error)
//		CommonFctsLogical.HandlingErrorMSG("API save Type Failed", "error");
//
//	};
//
//	var apis = new TypeApi();
//	apis.createTypeByGroup(selectedMetaData, jsonData, successFunction, failFunction);
//
//	if (typeId != null) {
//		var preferenceList = [];
//		var preference1 = {
//			name : "size",
//			propertyType : "STRING",
//			defaultValue : "0"
//		};
//		var preference2 = {
//			name : "color",
//			propertyType : "STRING",
//			defaultValue : "0"
//		};
//		preferenceList.push(preference1);
//		preferenceList.push(preference2);
//
//		var dlRenderer = new DesignLogicalRenderer();
//		dlRenderer.addPreferenceToTypeBatch(typeId, preferenceList);
//		tdvCy.filter("node[id='" + listTypeIds[0] + "']").select();
//
//	} else {
//		CommonFctsLogical.HandlingErrorMSG("Type Creation did not return typeId -- no creation of preferences (size, color)", "warning");
//	}
//	return typeId;
//
//}

DesignLogicalType.buildSaveNewTypeJson = function(typeName, typeIsRoot, owner, classification, decorators) {
	var jsonData = {};

	jsonData["name"] = typeName;
	jsonData["isRoot"] = typeIsRoot;
	jsonData["classification"] = classification;
	jsonData["owner"] = owner;
	jsonData['decorators'] = decorators;

	jsonData["namespace"] = loggedInUserName;
	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name;

	console.log(jsonData);
	return jsonData;
}

DesignLogicalType.afterSaveNewType = function(tmpObj, pos) {
	console.log("===> CALLED Function :  DesignLogicalType.afterSaveNewType   ");
	DesignSavingFcts.clearSelection();
	if (!$.isEmptyObject(pos)) {
		console.log(" Position is not defined ");
		DesignCytoscapeUtils.updatePosition(tmpObj, 'x', pos.x);
		DesignCytoscapeUtils.updatePosition(tmpObj, 'y', pos.y);

	}

	if (typeMapViaId[tmpObj.id]) {
		delete typeMapViaId[tmpObj.id];
	}

//	tmpObj.color = defaultNodeColor;
//	tmpObj.size = defaultTypeSize;
//	tmpObj.labelPosition = defaultTypeLabelPosition;
//	tmpObj.labelSize = defaultTypeLabelSize;

	typeMapViaId[tmpObj.id] = tmpObj;
	
//	TypeUtils.globalCreateType(tmpObj);
	
	TypeUtils.globalCreateType(typeMapViaId[tmpObj.id]);
	
	
	listTypeIds[0] = tmpObj.id;

	CommonFctsLogical.saveNewTypePos(tmpObj.id);

}

DesignLogicalType.setNodenameCreated = function(typeId, nclass) {

	var divprop = document.createElement('div');
	divprop.id = 'typecreateForm';
	divprop.className = 'block';
	divprop.innertHTML = '';

	$("#property_win").empty();
	$("#property_win").append(divprop);

	var d = document.getElementById("property_win");
	d.style.position = 'absolute';
	d.style.left = posType.x + 'px';
	d.style.top = posType.y + 'px';
	document.getElementById("property_win").style.display = 'block';
	document.getElementById("property_win").style.visible = 'visibility';


	var callFct = "";
	var info = null;
	if (nclass == 'link') {
		info = ruleMapViaId[typeId];
		callFct = "DesignLogicalType.updateLinkName(" + info.id + ")";

	} else {
		info = typeMapViaId[typeId];
		callFct = "DesignLogicalType.updateTypeName(" + info.id + ")";

	}

	var input = "<form id='add_form'>";
	input += "<table border='1'>";
	input += "<tr><th>Name</th><td><input type='hidden' id='update_Id' value='" + info.id + "'/>" +
		"<input type='hidden' id='update_Classification' value ='" + info.classification + "'/>" +
		"<input type='text'   id='update_name' value='" + info.name + "'/></td></tr>";

	input += "<tr align='center'><td colspan='2'><input type='button' id='save_new_type_name' class='btn btn-primary btn-xs'  value='Update Name' onclick='" + callFct + "'/>";
	input += "<input type='button'  class='btn btn-primary btn-xs'  value='Cancel'  onclick='DesignSavingFcts.cancelCreate()' /></td></tr>";
	input += "</table></form>";
	input += "<div id='error_create'></div>";

	$("#typecreateForm").empty();
	$("#typecreateForm").append(input);
	$("#update_name").focus();

}

DesignLogicalType.updateTypeName = function(typeId) {
	console.log("===> CALLED Function :  DesignLogicalType.updateTypeName   ");
	var id = $("#update_Id").val();
	var classification = $('#update_Classification').val();
	var name = $('#update_name').val();

	var jsonData = {},
		node = {};

	node["name"] = name;
	node["id"] = id;
	node["classification"] = classification;

	jsonData["node"] = node;
	jsonData["namespace"] = loggedInUserName;
	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name;

	console.log(jsonData);

	var successFunction = function(data) {
		CommonFctsLogical.HandlingErrorMSG("Type update name success.", "success");
		console.log("Type update name success. " + data.name);
		typeMapViaId[data.id].name = data.name;
		typeMapViaId[data.id].type = data.name;
		typeMapViaId[data.id].cyDisplay = data.name;

		$("#" + data.id).empty();
		$("#" + data.id).append(data.name);

		$("#typecreateForm").empty();
		$("#property_win").empty();
		document.getElementById("property_win").style.display = 'none';
		document.getElementById("property_win").style.visible = 'hidden';

		tdvCy.$('#' + data.id).data('name', data.name); // update type in cytoscape 
		tdvCy.$('#' + data.id).data('cyDisplay', data.name);
		tdvCy.$('#' + data.id).data('type', data.name);


	};

	var failFunction = function(xhr, status, error) {
		//		console.log(' SAVE TYPE Error : ' + xhr.status);
		//		console.log(' what are these : ' + xhr.responseJSON);
		//		console.log(' what are these : ' + xhr.responseJSON.exceptionCode);
		//		console.log(' what are these : ' + xhr.responseJSON.exceptionNumber);
		//		console.log(' what are these : ' + xhr.responseXML);
		//		console.log(' what are these : ' + xhr.statusText);
		//		console.log(' what are these : ' + xhr)
		//		console.log(' what are these : ' + status)
		//		console.log(' what are these : ' + error)


		if (xhr.responseJSON.exceptionNumber == "2.0.2") {
			CommonFctsLogical.HandlingErrorMSG("TYPE NAME ALREADY_EXISTS.", "warning");
			document.getElementById('typecreateForm').append("TYPE NAME ALREADY_EXISTS");
			return;

		} else {
			document.getElementById('typecreateForm').append("Type update name : API failed not updated");
			console.log("Type update name : API failed not updated: " + xhr.responseJSON);
			return;
		}
	};

	var apis = new TypeApi();
	apis.saveUpdateTypeByGroup(typeId, jsonData, successFunction, failFunction);
}

//DesignLogicalType.saveNewLink = function(linkName, classification, pos) {
//	console.log("===> CALLED Function :  DesignLogicalType.saveNewLink   ");
//	var jsonData = {};
//	var ruleId = null;
//	jsonData["name"] = linkName;
//	jsonData["ruleclassification"] = classification;
//
//	jsonData["namespace"] = loggedInUserName;
//	jsonData["grouphost"] = userGroup.host;
//	jsonData["groupname"] = userGroup.name;
//
//	console.log(jsonData);
//
//	var successFunction = function(data) {
//
//		if (!$.isEmptyObject(data)) {
//			CommonFctsLogical.HandlingErrorMSG("Link Created Successfully", "success");
//			Error_handlingUtils.consolePrint("Link creation successful", "success");
//			DesignSavingFcts.clearSelection();
//			if (!$.isEmptyObject(pos)) {
//				console.log(" Position is not defined ");
//				DesignCytoscapeUtils.updatePosition(data, 'x', pos.x);
//				DesignCytoscapeUtils.updatePosition(data, 'y', pos.y);
//
//			}
//
//
//			if (!ruleMapViaId[data.id]) {
//				ruleMapViaId[data.id] = data;
//			}
//			ruleId = data.id;
//			var element = DesignCytoscapeUtils.formatNewLink(data);
//			var newElement = tdvCy.add(element);
//
//			//			tdvCy.filter('node[name="' + data.name + '"]').data(data);
//
//			DesignCytoscapeUtils.attachTypeClickActions(newElement.filter('node'));
//			(new DesignLogicalRenderer()).initDesignBar(ruleMapViaId, "linklist");
//			listLinkIds[0] = data.id;
//			listTypeIds[0] = null;
//			tdvCy.filter("node[id='#rule" + data.id + "']").select();
//
//			CommonFctsLogical.saveNewLinkPos(data.id);
//		}
//	};
//
//	var failFunction = function(xhr, status, error) {
//		console.log('Error Link not created: ' + xhr.status);
//		CommonFctsLogical.HandlingErrorMSG("Error Link not created", "error");
//	};
//
//	var apis = new ConnectionApis();
//	apis.saveNewLink(selectedMetaData, jsonData, successFunction, failFunction);
//
//	//	CommonFctsLogical.addTooltip(ruleMapViaId[ruleId]);
//	return ruleId;
//}

DesignLogicalType.updateLinkName = function(typeId) {
	console.log("===> CALLED Function :  DesignLogicalType.updateLinkName   ");
	var id = $("#update_Id").val();
	var classification = $('#update_Classification').val();
	var name = $('#update_name').val();

	var jsonData = {};

	jsonData["newName"] = name;
	jsonData["ruleId"] = id;
	jsonData["classification"] = classification;

	jsonData["namespace"] = loggedInUserName;
	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name;

	console.log(jsonData);

	var successFunction = function(data) {
		CommonFctsLogical.HandlingErrorMSG("Type update name success.", "success");
		console.log("Type update name success. " + data.rule.name);

		ruleMapViaId[data.rule.id].name = data.rule.name;


		$("#rule_" + data.rule.id).empty();
		$("#rule_" + data.rule.id).append(data.rule.name);

		$("#typecreateForm").empty();
		$("#property_win").empty();
		document.getElementById("property_win").style.display = 'none';
		document.getElementById("property_win").style.visible = 'hidden';

		tdvCy.$('#rule' + data.rule.id).data('name', data.rule.name);
		tdvCy.$('#rule' + data.rule.id).data('cyDisplay', data.rule.name);
	};

	var failFunction = function(xhr, status, error) {

		if (xhr.responseJSON.exceptionNumber == "2.1.7") {
			CommonFctsLogical.HandlingErrorMSG("RULE NAME ALREADY_EXISTS.", "warning");
			document.getElementById('typecreateForm').append("RULE NAME ALREADY_EXISTS");
			return;

		} else {
			document.getElementById('typecreateForm').append("Rule update name : API failed not updated");
			console.log("Rule update name : API failed not updated: " + xhr.responseJSON);
			return;
		}

	};

	var apis = new RuleApis();
	apis.updateRule(jsonData, successFunction, failFunction);
}