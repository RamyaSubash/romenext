function WorkspaceApis() {
	
	this.createWorkspace = function ( jsonData,  doneFunction, failFunction ) {
		
		if( selectedMetaData == null ) {
			return null;
		}
		
		var request = $.ajax({
			
			method : 'POST',
			url: apiBaseUrl + "workspace/create/" + selectedMetaDataRepo,
			data     : JSON.stringify(jsonData),
			dataType : 'json',
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
		
	};
	
	this.getWorkspace = function ( jsonData,  doneFunction, failFunction ) {
		
		if( selectedMetaData == null ) {
			return null;
		}
		
		var request = $.ajax({
			
			method : 'POST',
			url: apiBaseUrl + "workspace/get/" + selectedMetaDataRepo,
			data     : JSON.stringify(jsonData),
			dataType : 'json',
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
		
	};
	
	this.getAllWorkspaces = function ( jsonData,  doneFunction, failFunction ) {
		
		if( selectedMetaData == null ) {
			return null;
		}
		
		var request = $.ajax({
			
			method : 'POST',
			url: apiBaseUrl + "workspace/get/all/" + selectedMetaDataRepo,
			data     : JSON.stringify(jsonData),
			dataType : 'json',
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
		
	};
	
	this.updateWorkspace = function ( jsonData,  doneFunction, failFunction ) {
		
		if( selectedMetaDataRepo == null ) {
			return null;
		}
		
		var request = $.ajax({
			
			method : 'POST',
			url: apiBaseUrl + "workspace/update/" + selectedMetaDataRepo,
			data     : JSON.stringify(jsonData),
			dataType : 'json',
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
		
	};
	
}