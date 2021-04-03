function saveGenerateEdge(jsonData){
	
//	var result = false;
//	
//	var connection = connMapViaId[jsonData.connection];
//	var startNodeUuid = jsonData.originNodeUuid;
//	var endNodeTypeId = jsonData.destinationType;
//	
//	 // find how many nodes under endNode type have already created for startNode
//	 var children = GlobalNodeUtils.getAllChildrenNodesUnderType(startNodeUuid, endNodeTypeId);
//	 var numberOfChildren = children.length;
//
//	 if (Number(connection.maxRel) == -1) {
//		 result = true;
//	 } else {
//		 if (numberOfChildren < Number(connection.maxRel)) {
//			 result = true;			 
//		 }
//	 }
	
	if(jsonData){
		
		var successFunction = function( data ) {
			console.log("Edge created ");
			DisplayCytoscapeUtils.updateInstanceGraph (irvCy, DisplayCytoscapeUtils.formatSingleEdge(data));			   
			
		};
		
		var failFunction = function( xhr, ajaxOptions, error ) {
			console.log('Error Edge not created: ' + xhr.responseText);
		};
		
		var edgeApi = new EdgeApis();
		edgeApi.saveEdge(jsonData, successFunction, failFunction);

	}

}

function retrieveNodeFromForm(form){
	// get the node details
	var jsonData = {}, nodeProperties = []; 
	var nodeproperty = {}, foundError=false, nodeDecoProperties;
	$(form).find('div#typeName').find(':input').each(function (i, field) {
		jsonData[field.name] = field.value;
	});
	$(form).find('div#nodeProperties').find('tr').each(function (i, propDiv) {
		$(propDiv).find(':input').each(function(i, field){
			if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
				
				if (field.type === 'file') {
					nodeproperty[field.name] = field.files[0];
				} else {
					nodeproperty[field.name] = field.value;
				}

			}
		});
		
		if (nodeproperty.propertyType === "FILE") {
			
			if (nodeproperty.value) {
				var file = nodeproperty.value;
				nodeproperty.value = {};
				if (file.type.includes("image/")) {
					nodeproperty.value.file = document.getElementById('image_file_output_' + nodeproperty.propertyId).src.replace("data:" + file.type + ";base64,", "");
				} else {
					nodeproperty.value.file = document.getElementById('other_file_output_' + nodeproperty.propertyId).href.replace("data:" + file.type + ";base64,", "");
				}
				nodeproperty.value.filename = file.name;
			}
			
		}
		var isPropMand = typeMapViaId[jsonData['typeId']].typeProperties[nodeproperty.propertyId].isMandatory;
		if(isPropMand){  if (nodeproperty.value)	{
	                                          nodeProperties.push(nodeproperty);
		                 }else{
			                      console.log("Missing Value for compulsory property.");
			                      $('#nodeForm').append("<p style='color:red'>Missing Value for Mandatory property : "+ nodeproperty.propertyName);
			                      foundError=true;
			                     
		                  }
		}else {
			// not mandatory look if there is a value
			if (nodeproperty.value)	{  nodeProperties.push(nodeproperty);	}
		}
	    nodeproperty = {};
		
	});
	if(!foundError){
		jsonData.properties = nodeProperties;
		$(form).find('div#defaultDecoForNode').find(':input').each(function (i, field) {
			jsonData[field.name] = field.value;
		});
		

		nodeDecoProperties = [];
	    nodeDecoProperties.push({propertyName:"x", value:dragItemPositionX.toString(), propertyType:"DOUBLE", id: predefinedSelectedDecoPropertiesMap["x"].id.toString()});
	    nodeDecoProperties.push({propertyName:"y", value:dragItemPositionY.toString(), propertyType:"DOUBLE", id: predefinedSelectedDecoPropertiesMap["y"].id.toString()});
	    // nodeDecoProperties.push({propertyName:"z", value:"0", propertyType:"DOUBLE", id: predefinedSelectedDecoPropertiesMap["z"].id.toString()});
	   jsonData.decoProperties = nodeDecoProperties;	
				
	   return jsonData;
	}else { return null;}

}

function retrieveEdgeDetails(form){
	var jsonData2 = {}, uuidType, ruleName;
	var edgeProperties = [], edgeProperty = {};
	$(form).find('div#parentNodeInstance').find(':input').each(function (i, field) {
		if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
			uuidType = field.value;
			var uuidAndType = field.value.split(',');
			jsonData2["originNodeUuid"] = uuidAndType[0];
			jsonData2["originType"]     = typeMap[uuidAndType[1]].id;
		}
	});
	
	$(form).find('div#defaultDecoForNode').find(':input').each(function (i, field) {
		jsonData2[field.name] = field.value;
	});
	
	$(form).find('div#rule_name').find(':input').each(function (i, field) {
		jsonData2["connection"] = field.value;
	});
	
	return jsonData2;		
}
