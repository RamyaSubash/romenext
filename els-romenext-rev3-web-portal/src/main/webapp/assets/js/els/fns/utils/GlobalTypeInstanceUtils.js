function GlobalTypeInstanceUtils() {
	
}

GlobalTypeInstanceUtils.getAllInstances = function( typeId ) {
	
	var apis = new apiRomeNext();	
	var nodeApi = new NodeApis();
	nodeMap = {};
	var tmpNodeMap = null;
	
	// get all node instances under this type and display list	 as well as update the right section for the instance
	var successFunction = function( data ) {
		if(!$.isEmptyObject(data) && !$.isEmptyObject(data.nodes)){
			    GlobalUtils.resetNBType(typeId); 
				console.log(data.nodes);
				tmpNodeMap = {};
								
				$.each(data.nodes, function(key, value){					
					GlobalUtils.addNBTypeInstances( value );				
					// and node to nodeMap
					NodeUtils.AddNodeToMap(value);
					var uuid = NodeUtils.findUUID( value );  
					value.color = typeMapViaId[value.typeId].color;
					// not sure if it needed 
					if (uuid != null) {
						if (!tmpNodeMap[uuid]) {
							tmpNodeMap[uuid]= value;
						}else  {tmpNodeMap[uuid] = value;}
					}
					
				});
				
		}else {
			console.log("This Type: "+typeId+" has No nodes.")         // empty list is displayed
		}
		
		
	};
	
	var failFunction = function( xhr, status, error ) {
		console.log('Not able to load Nodes for this Type: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Not able to load Nodes for this Type:"+ xhr.status+"</p>");	
	};
	
	nodeApi.getNodesUnderType( typeId, successFunction, failFunction);
	return tmpNodeMap;
	
};



