function GlobalUserGroupUtils() {
	
};

GlobalUserGroupUtils.getUserGroup = function(userHost, groupName, userName) {
	
	var successFunction = function(data) {
		console.log(userHost);
		console.log(groupName);
		console.log(userName);
		userGroup.CREATE = data.CREATE;
		userGroup.READ = data.READ;
		userGroup.UPDATE = data.UPDATE;
		userGroup.DELETE = data.DELETE;
	};
	
	var failFunction = function(xhr, status, error) {
		console.log('Get Group Error: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Error in Get Group: " + xhr.status + "</p>");
	};
	
	var apis = new GroupApi();
	apis.getGroup(userHost, groupName, userName, successFunction, failFunction);	

};
