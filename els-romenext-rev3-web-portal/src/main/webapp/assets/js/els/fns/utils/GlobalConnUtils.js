function GlobalConnUtils() {
	
};

GlobalConnUtils.findConnsBySourceAndTarget = function (source, target) {
	var results = [];
	for (var key in connMapViaId) {
		if (connMapViaId[key].source == source && connMapViaId[key].target == target) {
			results.push(connMapViaId[key]);
		}
	}
	
	return results;
};

GlobalConnUtils.findConnsBySource = function (source) {
	var results = [];
	for (var key in connMapViaId) {
		if (connMapViaId[key].source == source) {
			results.push(connMapViaId[key]);
		}
	}
	
	return results;
};

GlobalConnUtils.getAllChildConnections = function(typeId) {
	
	var connectionIds = [];
	
//	$.each( connMap, function( connName, conn ) {
//		if (conn.source == typeId) {
//			connectionIds.push(conn.id);
//		}
//	});
	
	$.each( connMapViaId, function( connId, conn ) {
		if (conn.source == typeId) {
			connectionIds.push(conn.id);
		}
	});
	
	return connectionIds;
	
};