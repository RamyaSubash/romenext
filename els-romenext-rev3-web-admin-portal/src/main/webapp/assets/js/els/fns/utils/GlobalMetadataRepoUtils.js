function GlobalMetadataRepoUtils() {
	
};

GlobalMetadataRepoUtils.getAllReposByMetadta = function(metadata, username) {
	
	var successFunction = function(data) {
		
		$.each(data.repos, function(key, value){
			if (!selectedMetaDataRepos[value.id]) {
				selectedMetaDataRepos[value.id] = value;
			}
			
			selectedMetaDataRepos[value.id] = value;
		});
		
	};
	
	var failFunction = function(xhr, status, error) {
		console.log('Get Repos Error: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Error in Get Repos: " + xhr.status + "</p>");
	};
	
	var apis = new apiRomeNext();
	apis.retrieveAllReposByMetadata(metadata, username, successFunction, failFunction);	

};
