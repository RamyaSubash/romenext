function GlobalTypeUtils() {
	
}

GlobalTypeUtils.emptyFun = function() {
	

	
};

GlobalTypeUtils.findTypePropertyByTypeAndPropertyName = function(type, typePropertyName) {
	
	var typeProperties = [];
	if (type) {
		$.each(type.typeProperties, function(key, value) {
			
			var name = value.name.toUpperCase();
			
			if (name === typePropertyName) {
				typeProperties.push(value);			
			}
			
		});
	}
	
	if (typeProperties.length == 1) {
		return typeProperties[0];
	} else {
		return null;
	}

};

GlobalTypeUtils.findTypePropertyByTypeNameAndPropertyName = function(typeName, typePropertyName) {
	
	var types = [];
	var typeProperties = [];
	
	if (typeName) {
		$.each(typeMapViaId, function(key, value) {
			var name = value.name.toUpperCase();
			if( name === typeName ) {
				types.push(value);
			}
			
		});
	}

	if (types.length != 1) {
		return null;
	}
	
	var type = types[0];
	
	if (type) {
		$.each(type.typeProperties, function(key, value) {
			
			var name = value.name.toUpperCase();
			
			if (name === typePropertyName) {
				typeProperties.push(value);			
			}
			
		});
	}
	
	if (typeProperties.length == 1) {
		return typeProperties[0];
	} else {
		return null;
	}

};

GlobalTypeUtils.loadType = function( typeid ) {
	
	if( typeid != null ) {
		var successFunction = function( jsonData ) {
//			typeMap = {};
//			typeMapViaId = {};

			colorIndex = 0;
			
			var type = jsonData.type;
			
			if (!typeMapViaId[type.id]) {
				typeMap[type.name] = type;
				
				typeMapViaId[type.id] = type;
				colorIndex++;
				
			}
			
			
//			$.each(jsonData.types, function(key, value){
//				value.nb = 0;
//				value.color = TYPES_COLOR[colorIndex]; 
//				
//				if (!typeMapViaId[value.id]) {
//					typeMap[value.name] = value;
//					
//					typeMapViaId[value.id] = value;
//					colorIndex++;
//					
//				}
//			});
//			
//			connMap = {};
//			connMapViaId = {};
//			
//			var connBase={};
//			
//			$.each(jsonData.connections, function(key, value){
//				
//				connBase = GlobalUtils.createInternalConnMap( value );
//								
//				connBase = {}; 
//				 
//			});
		};
		
		var failFunction = function( xhr, status, error ) {
			$('#console-log').append("<p style='color:blue'>Failed to load types and connections: " + xhr.status + "</p>");
			console.error("Error: " + xhr.status);
		};
			
//		var apis = new apiRomeNext();	
//		apis.getAllTypesAndConnections( successFunction, failFunction );
		
		var apis = new TypeApi();	
		apis.getTypeByGroup(selectedMetaData, userGroup.host, userGroup.name, typeid, successFunction, failFunction);
	}
	
}
