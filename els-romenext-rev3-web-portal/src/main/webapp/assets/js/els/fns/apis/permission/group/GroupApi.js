function GroupApi(){


	// OLD API CALL
	// UPDATED CALL BELOW
//	this.getGroup = function (host, name, username, doneFunction, failFunction){
//		
//		if (selectedMetaData) {
//			var request =$.ajax({			
//				method : 'GET',
//				url : apiBaseUrl + 'group/host/' + host + '/name/' + name + '/username/' + username,
//				dataType : 'json',
//				contentType : 'application/json',
//				cache : false,
//				async : false
//				
//			});
//			request.done(function (data) {  
//				doneFunction( data );
//			});
//			request.fail(function (xhr, status, error) {
//				failFunction( xhr, status, error );
//			});
//		}
//	
//	}
	
	this.getGroup = function (host, name, username, doneFunction, failFunction){
		
		var jsonData = {};
		
		jsonData = GlobalApiUtils.assignApiHeaders(jsonData);
		console.log(jsonData);
	
		
		var request = $.ajax({
			method: "POST",
			url: apiBaseUrl + 'group/get/groups',
			dataType: "json",
			data : JSON.stringify(jsonData),
			contentType : 'application/json',
			cache: false,
			async : false
		});
		
		 
		request.done(function (data) {  
			doneFunction( data );
		});
		request.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});
		
		 
	
	}
	
	
};
