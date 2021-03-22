function PathNodeApis() {
	
	// get all nodes in a path node
	this.getNodesInPath = function ( jsonData, doneFunction, failFunction ){
		
		if (selectedMetaData != null){
			
			var request =$.ajax({			
							
				url : apiBaseUrl + 'pathEndpoint/get/metadata/' + selectedMetaData,
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
	
	// assign a node to a path node
	this.assignNodeToPath = function ( jsonData, doneFunction, failFunction ){
		
		if (selectedMetaData != null){
			
			var request =$.ajax({			
				
				method : 'POST',
				url : apiBaseUrl + 'pathEndpoint/metadata/' + selectedMetaData,
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
	
	// remove a node from a path node
	this.removeNodeFromPath = function ( jsonData, doneFunction, failFunction ){
		
		if (selectedMetaData != null){
			
			var request =$.ajax({			
				
				method : 'DELETE',
				url : apiBaseUrl + 'pathEndpoint/metadata/' + selectedMetaData,
				dataType : 'json',
				data : JSON.stringify( jsonData ),
				contentType : 'application/json',
				cache : false,
				async : false
				
			});
			
			request.complete(function (data) {  
				doneFunction( data );
			});
			
			request.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
			
		}

	};
	
};