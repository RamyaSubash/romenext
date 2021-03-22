function GlobalApiUtils() {
	
};

GlobalApiUtils.assignApiHeaders = function ( jsonData ) {
	
	jsonData["namespace"] = loggedInUserName;
	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name; 
	
	return jsonData;
}; 

