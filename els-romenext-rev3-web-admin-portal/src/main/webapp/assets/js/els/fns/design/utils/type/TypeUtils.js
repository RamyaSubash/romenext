function TypeUtils() {

};

/**
 * Note that
 * 
 * type = full type object
 */

TypeUtils.saveAddTypeForm = function() {

	// grab the new values

	var typeName = null;
	if ($('#add_type_name').val()) {
		typeName = $('#add_type_name').val();
	} else {
		typeName = "ID" + Date.now();
	}

	var typeIsRoot = null;
	if (document.getElementById('add_isRoot').checked == true) {
		typeIsRoot = 'true';
	} else {
		typeIsRoot = 'false';
	}

	var typeClassification = $('#add_classification').val();

	var typeOwner = $('#add_owner').val();

	var typeDecos = [];
	if (document.getElementById('geo_activator').checked == true) {
		typeDecos.push(document.getElementById('geo_activator').value);
	}

	typeRestrictionStatus = $('#add_restrictionStatus').val();

	if (typeName) {
		if (!typeRestrictionStatus) {
			TypeUtils.addType(typeName, typeIsRoot, typeOwner, 	typeClassification, typeDecos);
		} else {
			TypeUtils.addTypeWithRestrictionStatus(typeName, typeIsRoot, typeOwner, typeClassification, typeDecos, typeRestrictionStatus);
		}

	} else {
		if (typeName == '' || typeName == null || typeName == 'Enter a name')
			$('#typecreateForm').append("<br/><p style='color:red'>Missing Value for Type Name");
	}
	
	$('#typecreateForm').empty();
	var divObj = $("#create_type");
	if ($("#create_type").hasClass( 'ui-dialog-content')) {
		$("#create_type").dialog('close');
	}
	

}

TypeUtils.addType = function(typeName, typeIsRoot, owner, classification, decorators) {
	var typeId = null;
	var decoProps = predefinedSelectedDecoPropertiesMap;
	var jsonData = {};
	var newDecoProperties = [];

	jsonData["name"] = typeName;
	jsonData["isRoot"] = typeIsRoot;
	jsonData["classification"] = classification;
	jsonData["owner"] = owner;

	jsonData['decorators'] = decorators;

	jsonData["namespace"] = loggedInUserName;
	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name;

	console.log(jsonData);
	var successFunction = function(data) {
		
		DesignCytoscapeUtils.getAllSelectedTypes(tdvCy);
		CommonFctsLogical.UnselectTypes();
		CommonFctsLogical.UnselectConnections();
		CommonFctsLogical.HandlingErrorMSG("Type Created Succeesfully","success");
		var tmpObj = data;

		// delete the old values
		if (typeMapViaId[tmpObj.id]) {
			delete typeMapViaId[tmpObj.id];
		}

		// re-add the type
		typeMapViaId[tmpObj.id] = tmpObj;

		TypeUtils.globalCreateType(data);
		listTypeIds[0] = data.id;
		typeId = tmpObj.id;

	};

	var failFunction = function(xhr, status, error) {
		console.log(' SAVE TYPE Error : ' + xhr.status);
		console.log(' what are these : ' + xhr.responseJSON);
		console.log(' what are these : ' + xhr.responseJSON.exceptionCode);
		console.log(' what are these : ' + xhr.responseXML);
		console.log(' what are these : ' + xhr.statusText);
		console.log(' what are these : ' + xhr)
		console.log(' what are these : ' + status)
		console.log(' what are these : ' + error)

		if (xhr.responseJSON.exceptionCode == "DUPLICATE_TYPE") {
			console.log("Duplicate type was found");
			$('#typecreateForm').html("<br/><p style='color:red'>Type name is a duplicate. Please choose another name.");
			// $('#console-log').append("<p style='color:red'>Type name is a
			// duplicate. Please choose another name.</p>");
		} else {
			// $('#console-log').append("<p style='color:red'>Error in Type
			// creation"+xhr.status+"</p>");
		}
	};

	var apis = new TypeApi();
	apis.createTypeByGroup(selectedMetaData, jsonData, successFunction, failFunction);

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

	tdvCy.filter("node[id='" + listTypeIds[0] + "']").select();
	document.getElementById(listTypeIds[0]).style.border = "solid red";


}

TypeUtils.addRule = function(ruleName, owner, classification) {
	var jsonData = {};

	jsonData["name"] = ruleName;
	jsonData["classification"] = classification;
	jsonData["owner"] = owner;
	console.log(jsonData);
	var successFunction = function(data) {
		$('#console-log').append("<p style='color:blue'>Rule creation successful</p>");
		selectedRuleIds[0] = data.id;
	};

	var failFunction = function(xhr, status, error) {
		console.log(' SAVE TYPE Error : ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Error in Type creation" + xhr.status	+ "</p>");
	};

	var apis = new apiRomeNext();
	apis.saveNewRule(jsonData, successFunction, failFunction);
}


TypeUtils.addTypeWithRestrictionStatus = function(typeName, typeIsRoot, owner,
		classification, decorators, typeRestrictionStatus) {

	var typeId = null;

	var jsonData = {};

	jsonData["name"] = typeName;
	jsonData["isRoot"] = typeIsRoot;
	jsonData["classification"] = classification;
	jsonData["owner"] = owner;

	jsonData["namespace"] = loggedInUserName;
	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name;

	jsonData['decorators'] = decorators;
	jsonData['restrictionStatus'] = typeRestrictionStatus;

	console.log(jsonData);
	var successFunction = function(data) {
//		$('#console-log').append("<p style='color:blue'>Type creation successful</p>");
		CommonFctsLogical.HandlingErrorMSG("Type Created Succeesfully","success");
		TypeUtils.updateCacheType(data);
		TypeUtils.globalCreateType(data);
		listTypeIds[0] = data.id;
		typeId = data.id;
	};

	var failFunction = function(xhr, status, error) {
		console.log(' SAVE TYPE Error : ' + xhr.status);
		console.log(' what are these : ' + xhr.responseJSON);
		console.log(' what are these : ' + xhr.responseJSON.exceptionCode);
		console.log(' what are these : ' + xhr.responseXML);
		console.log(' what are these : ' + xhr.statusText);
		console.log(' what are these : ' + xhr)
		console.log(' what are these : ' + status)
		console.log(' what are these : ' + error)

		if (xhr.responseJSON.exceptionCode == "DUPLICATE_TYPE") {
			console.log("Duplicate type was found");
			$('#typecreateForm').append("<br/><p style='color:red'>Type name is a duplicate. Please choose another name.");
//			$('#console-log').append("<p style='color:red'>Type name is a duplicate. Please choose another name.</p>");
		} else {
			$('#console-log').append("<p style='color:red'>Error in Type creation" + xhr.status	+ "</p>");
		}

	};

	var apis = new TypeApi();
	apis.createTypeByGroup(selectedMetaData, jsonData, successFunction,	failFunction);
	
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

}


TypeUtils.updateType = function(typeid, typeName, typeIsRoot, owner,classification, decorators, properties) {

	var jsonData = {};

	jsonData["name"] = typeName;
	jsonData["classification"] = classification;
	jsonData["isRoot"] = typeIsRoot;
	jsonData["owner"] = owner;

	jsonData['decorators'] = decorators;

	jsonData.properties = properties;
	console.log(jsonData);
	var successFunction = function(data) {
		TypeUtils.globalUpdateType(data);
	};

	var failFunction = function(xhr, status, error) {
		document.getElementById('typeForm').textContent = "Error Type properties not updated";
//		$('#console-log').append("<p style='color:red'>Error Type properties not updated: "+ xhr.status);
	};

	var apis = new apiRomeNext();
	apis.saveUpdateType(selectedMetaData, userGroup.host, userGroup.name, typeid, jsonData, successFunction, failFunction);

}

TypeUtils.updateCacheType = function(type) {

	var apicaller = new TypePropertyApi();

	var doneFunction = function(jsonData) {
		// going to update the global vars type

		var tmpObj = jsonData.node;

		// delete the old values
		if (typeMap[tmpObj.name]) {
			delete typeMap[tmpObj.name];
		}
		if (typeMapViaId[tmpObj.id]) {
			delete typeMapViaId[tmpObj.id];
		}

		// re-add the type
		typeMap[tmpObj.name] = tmpObj;
		typeMapViaId[tmpObj.id] = tmpObj;

	};

	var failFunction = function(xhr, status, error) {
		console.log('Update Type failed ' + xhr.status);
//		$('#console-log').append("<p style='color:red'>Update Type failed" + xhr.status+ "</p>");
	};

	apicaller.getType(type.id, doneFunction, failFunction)

};

TypeUtils.globalCreateType = function(data) {

	// we expect the data to be in json format that is equiv to the api call

	var createFunctions = global_type_fns["create"];
	$.each(createFunctions, function(key, value) {
		value(data);
	});

};

TypeUtils.globalUpdateType = function(data) {

	// we expect the data to be in json format that is equiv to the api call
	var updateFunctions = global_type_fns["update"];

	$.each(updateFunctions, function(key, value) {
		value(data);
	});
}

TypeUtils.globalReadType = function(data) {

	// we expect the data to be in json format that is equiv to the api call
	var readFunctions = global_type_fns["read"];

	$.each(readFunctions, function(key, value) {
		value.readType(data);
	});
}

TypeUtils.globalType_addFn = function(type, subtype, fns) {
	if (!global_type_fns[type]) {
		// if not type, create it
		global_type_fns[type] = {};

	}
	;

	(global_type_fns[type])[subtype] = fns;
};
