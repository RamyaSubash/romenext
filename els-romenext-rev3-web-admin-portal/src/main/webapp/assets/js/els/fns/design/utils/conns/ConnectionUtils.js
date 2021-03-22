function ConnectionUtils() {

};

/*
 * Updated to include the connMapViaId setting
 */
ConnectionUtils.updateConnections = function( connections ) {
	connMap = {}; 
	connMapViaId = {};
	
	var connBase={};

	$.each(connections, function(key, value){		
		connBase = GlobalUtils.createInternalConnMap( value );
	});
	console.log( connMap);
}



//ConnectionUtils.findPCRule = function(origin, destination){
//	for(var conn in connMap ){
//		if(connMap[conn].source == origin && connMap[conn].target == destination){
//			var ruleId = connMap[conn].ruleId;
//			if(ruleMapViaId[ruleId].classification == 'parentchild'){
//				return true;
//			}else return false;
//		}
//	}
//	return false;
//}

//ConnectionUtils.createInternalConnMap = function( apiJson ) {
//connBase = {
//		name : apiJson.name,
//		id   : apiJson.id,
//		classification: apiJson.classification,
//		origin : apiJson.origin,
//		destination: apiJson.destination,
//		source: apiJson.originId,
//		target: apiJson.destinationId,
//		minRel: apiJson.minRel.toString(),
//		maxRel: apiJson.maxRel.toString(),
////		rule  : apiJson.type,                               
//		rule  : apiJon.ruleName,  
//		ruleId : apiJson.ruleId,
//		properties: apiJson.properties,
//		nb    : 1
//};
//if (!connMap[apiJson.name]) {
//	connMap[apiJson.name]= connBase;
//	connMapViaId[apiJson.id] = connBase;
//	
//} else { 
//	connMap[apiJson.name].nb += 1;
//	connMapViaId[ apiJson.id ].nb += 1;		// no clue whta this does - jplee Jan 2017
//}
//
//return connBase;
//}


















