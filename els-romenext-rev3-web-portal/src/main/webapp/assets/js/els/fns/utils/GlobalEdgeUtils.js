function GlobalEdgeUtils() {
	
};

GlobalEdgeUtils.getAnyEdgeLinkByTwoNodes = function (startNodeTypeId, startNodeUuid, endNodeTypeId, endNodeUuid) {
	
	var result = null;
	
	var originNode = {
			typeIds: [startNodeTypeId],
			sysProperties: {
				uuid: {
					propertyName: "uuid",
					propertyType: "STRING",
					value: startNodeUuid
				}
			}
	}
	
	var destNode = {
			typeIds: [endNodeTypeId],
			sysProperties: {
				uuid: {
					propertyName: "uuid",
					propertyType: "STRING",
					value: endNodeUuid
				}
			}
	}
	
	var jsonData = {
			originNode : originNode,
			destNode : destNode,
			grouphost : userGroup.host,
			groupname : userGroup.name,
			namespace : loggedInUserName
	};
		
	var successFunction = function(data) {
		result = data;
	};
	
	var failFunction = function( xhr, status, error ) {
		console.log('Not able to load nodes in workspace: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Not able to load nodes in workspace: " + xhr.status + "</p>");	
	};	
	
	var apis = new EdgeApis();
	apis.getAnyEdgeLinkByTwoNodes(jsonData, successFunction, failFunction);
	
	return result;
	
};
