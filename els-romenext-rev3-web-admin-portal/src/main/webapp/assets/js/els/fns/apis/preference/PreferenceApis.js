function PreferenceApis() {
	
	this.addPreference = function ( jsonData, doneFunction, failFunction ){
		
		if (selectedMetaData != null){
			
			var request =$.ajax({			
							
				url : apiBaseUrl + 'preference/create/bytypeid/' + selectedMetaData + '/',
				method : 'POST',
				dataType : 'json',
				data : JSON.stringify( jsonData ),
				contentType : 'application/json',
				cache : false,
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
	
	this.updatePreferenceAndProperties = function ( jsonData, doneFunction, failFunction ){
		
		if (selectedMetaData != null){
			
			var request =$.ajax({			
							
				url : apiBaseUrl + 'preference/type/update/bytypeid/' + selectedMetaData,
				method : 'PUT',
				dataType : 'json',
				data : JSON.stringify( jsonData ),
				contentType : 'application/json',
				cache : false,
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

	// get preference for type with values
//	this.getAllPreferencesAndConnectionsByGroup = function ( metadataId, grouphost, groupname, username, typeId, doneFunction, failFunction ){
//		
//		if (selectedMetaData != null){
//			
//			var request =$.ajax({			
//							
//				url : apiBaseUrl + 'preference/type/find/typeid/' + metadataId + '/' + groupname + '/' + grouphost + '/' + username 
//								 + '/' + typeId,
//				method : 'GET',
//				dataType : 'json',
//				contentType : 'application/json',
//				cache : false,
//				async : false
//				
//			});
//			
//			request.done(function (data) {  
//				doneFunction( data );
//			});
//			
//			request.fail(function (xhr, status, error) {
//				failFunction( xhr, status, error );
//			});
//			
//		}
//
//	};
	
	// get preference for type with or without values
	this.getAllPreferencesByTypeId = function ( metadataId, jsonData, doneFunction, failFunction ){
		
		if (selectedMetaData != null){
			
			var request =$.ajax({			
							
				url : apiBaseUrl + 'preference/type/find/all/bytypeid/' + metadataId,
				method : 'POST',
				dataType : 'json',
				data : JSON.stringify( jsonData ),
				contentType : 'application/json',
				cache : false,
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
	
};
