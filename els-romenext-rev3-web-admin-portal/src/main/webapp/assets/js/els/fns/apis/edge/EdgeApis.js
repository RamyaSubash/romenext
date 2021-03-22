function EdgeApis() {
	
	this.saveEdge = function ( jsonData,  doneFunction, failFunction ){
		
		if( selectedMetaDataRepo == null ) {
			return null;
		}

		var request = $.ajax({
			method : 'POST',
			url : apiBaseUrl + 'edge/repo/'+ selectedMetaDataRepo + '/' + loggedInUserName,
			dataType : 'json',
			data : JSON.stringify(jsonData),
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
	
	this.updateEdge = function ( jsonData,  doneFunction, failFunction ){
		
		if( selectedMetaDataRepo == null ) {
			return null;
		}
		
		var request = $.ajax({
			method : 'PUT',
			url : apiBaseUrl + 'edge/update/' + selectedMetaDataRepo,
			dataType : 'json',
			data : JSON.stringify(jsonData),
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
	
	this.getAnyEdgeLinkByTwoNodes = function ( jsonData,  doneFunction, failFunction ){
		
		if( selectedMetaDataRepo == null ) {
			return null;
		}
		
		var request = $.ajax({
			method : 'POST',
			url : apiBaseUrl + 'edge/link/getany/' + selectedMetaDataRepo,
			dataType : 'json',
			data : JSON.stringify(jsonData),
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
	
	this.getEdge = function ( jsonData,  doneFunction, failFunction ){
		
		if( selectedMetaData == null ) {
			return null;
		}
		
		var request = $.ajax({
			method : 'POST',
			url : apiBaseUrl + 'edge/simplified/metadata/' + selectedMetaData,
			dataType : 'json',
			data : JSON.stringify(jsonData),
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
	
	this.deleteEdge = function ( jsonData,  doneFunction, failFunction ){
		
		if( selectedMetaData == null ) {
			return null;
		}
		
		var request = $.ajax({
			method : 'DELETE',
			url : apiBaseUrl + 'edge/metadata/' + selectedMetaData,
			dataType : 'json',
			data : JSON.stringify(jsonData),
			contentType : 'application/json',
			cache : false,
			async : false
		});

		request.complete(function () {  
			doneFunction();
		});
		request.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});
		
	};
	
};