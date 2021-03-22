function EdgeUtils() {
	
};

EdgeUtils.findNamePropertyValue = function ( edge ){
	
	var edgeName = null;
	
	console.log( edge.ruleId );
	
	var ruleProperties = ruleMapViaId[edge.ruleId].typeProperties;
	var edgeProperties = edge.ruleProperties;
	$.each(edgeProperties, function( propId, tmpProp ) {
		if (ruleProperties[propId].name == 'name') {
			edgeName = tmpProp.value;
		}
	})
	
	return edgeName;

};

EdgeUtils.convertEdgeFilePropertyValueToDataUrl = function (edgeFilePropertyValue){

	var fileName = edgeFilePropertyValue.filename;
	var fileType = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
	var mediaType = MIMEExtensionMap[fileType];
	
	return "data:" + mediaType + ";base64," + edgeFilePropertyValue.file;
	
};

EdgeUtils.convertEdgeFilePropertyValueMediaType = function (edgeFilePropertyValue){
	
	if( edgeFilePropertyValue == null) {
		return null;
	}

	var fileName = edgeFilePropertyValue.filename;
	return MIMEExtensionMap[fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length)];
	
};
