function GlobalDecoUtils() {
	
};

GlobalDecoUtils.getDecoByClassificationAndGrouping = function (classification, grouping) {
	
	var json = {
			grouphost: userGroup.host,
			groupname: userGroup.name,
			namespace: loggedInUserName, 
			classification: selectedDecoClassification,
			grouping: selectedDecoGrouping
	};
	
	
	var successFunction = function(data) {
		selectedDeco = data.decorator;
	
		predefinedSelectedDecoPropertiesMap = {}
		$.each(selectedDeco.decoProps, function(key, value) {
			for (var i = 0; i < predefinedSelectedDecoPropertiesNames.length; i++) {
				if (predefinedSelectedDecoPropertiesNames[i] == value.name) {
					predefinedSelectedDecoPropertiesMap[predefinedSelectedDecoPropertiesNames[i]] = value;
					break;
				}
			}
		});
	};
	
	var failFunction = function(xhr, status, error) {
		console.log('Get Deco Error: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Error in Get Deco: " + xhr.status + "</p>");
	};
	
	var apis = new DecoApis();
	console.log("Deco Json To Request");
	console.log(json);
	apis.getDecoByClassificationAndGrouping(json, successFunction, failFunction);
	
};

GlobalDecoUtils.getDecoPropertyValueFromInstance = function (node, decoPropertyName) {
	
	if (!decoPropertyName) {
		return null;
	}
	if (!predefinedSelectedDecoPropertiesMap[decoPropertyName]) {
		return null;
	}
	if (!predefinedSelectedDecoPropertiesMap[decoPropertyName].id) {
		return null;
	}
	if (!predefinedSelectedDecoPropertiesMap[decoPropertyName].id) {
		return null;
	}
	
	if (node.decoProperties[predefinedSelectedDecoPropertiesMap[decoPropertyName].id]) {
		return node.decoProperties[predefinedSelectedDecoPropertiesMap[decoPropertyName].id].value;
	} else {
		return null;
	}
	
};
