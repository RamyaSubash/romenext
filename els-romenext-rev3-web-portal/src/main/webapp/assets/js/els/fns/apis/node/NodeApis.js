//=====================================================================
function NodeApis() {
	
	this.getAllNodesAndEdges = function ( jsonData,  doneFunction, failFunction ){
		
		if( selectedMetaData == null ) {
			return null;
		}
		
		jsonData = GlobalApiUtils.assignApiHeaders( jsonData );
		console.log("Post Request to " + apiBaseUrl + 'node/get/all/withedges/metadata/'+ selectedMetaDataRepo);
		console.log(jsonData);

		var request = $.ajax({
			method : 'POST',
			url : apiBaseUrl + 'node/get/all/withedges/metadata/'+ selectedMetaDataRepo,
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
	
	this.saveNode = function ( jsonData,  doneFunction, failFunction ){
		
		if( selectedMetaData == null ) {
			return null;
		}
		
//		jsonData["namespace"] = loggedInUserName;
//		jsonData["grouphost"] = userGroup.host;
//		jsonData["groupname"] = userGroup.name;
		
		jsonData = GlobalApiUtils.assignApiHeaders( jsonData );
		
		console.log("trying to save node");
		console.log(jsonData);
		console.log("post to url: " + apiBaseUrl + 'node/create/metadata/'+ selectedMetaDataRepo);
		
		var request = $.ajax({
			method : 'POST',
			url : apiBaseUrl + 'node/create/metadata/'+ selectedMetaDataRepo,
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

    this.updateNode = function ( jsonData,  doneFunction, failFunction ){
		
//		if( !(jsonData instanceof NodeJsonObject) ) {
//			return null;
//		}
		
		if( selectedMetaData == null ) {
			return null;
		}
		
		jsonData = GlobalApiUtils.assignApiHeaders( jsonData );

		
		var request = $.ajax({		
			method : 'PUT',
			url : apiBaseUrl + 'node/update/metadata/' + selectedMetaDataRepo,
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
	
    this.getNode = function ( jsonData,  doneFunction, failFunction ){
		
//		if( !(jsonData instanceof NodeJsonObject) ) {
//			return null;
//		}
		
		if( selectedMetaData == null ) {
			return null;
		}
		
		jsonData = GlobalApiUtils.assignApiHeaders( jsonData );

		
		var request = $.ajax({
			
			type : 'POST',
			url : apiBaseUrl + 'node/identifier/metadata/' + selectedMetaData,
			data : JSON.stringify(jsonData),
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
	
	
	
	
	
	
    this.getNodesUnderType = function ( typeid,  doneFunction, failFunction ){
		
		if( selectedMetaData == null ) {
			return null;
		}
		
		jsonData = GlobalApiUtils.assignApiHeaders( jsonData );

		
		var request = $.ajax({
			
			method : 'GET',
			url : apiBaseUrl + 'node/all/'+ typeid + '/metadata/' + selectedMetaData,
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
	
	this.getNodesAndEdgeUnderType = function( typeid, doneFunction, failFunction    ){
		
		if( selectedMetaData == null ) {
			return null;
		}
		
		jsonData = GlobalApiUtils.assignApiHeaders( jsonData );


		var request = $.ajax({
			
			method: "GET",
			url: apiBaseUrl + "node/edge/all/simplified/"+typeid+"/metadata/" + selectedMetaData,
			contentType : 'application/json',
			dataType: "json",
			async : false
				
		});

		request.done(function (data) {  
			doneFunction( data );
		});
		request.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});
	}
	
	
    this.getChildNodes = function (jsonData, doneFunction, failFunction ){
		
		if( selectedMetaDataRepo == null ) {
			return null;
		}
		
		
		jsonData = GlobalApiUtils.assignApiHeaders( jsonData );

		var request = $.ajax({
			
			method : 'POST',
			url: apiBaseUrl + "node/end/edge/all/simplified/repo/" + selectedMetaDataRepo,
			data : JSON.stringify(jsonData),
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
	
	this.getRelatedNodesEdges = function (typeid,  uuid, doneFunction, failFunction ){
		
		if( selectedMetaData == null ) {
			return null;
		}
		
		jsonData = GlobalApiUtils.assignApiHeaders( jsonData );

		
		var request = $.ajax({
			
			method : 'GET',
			url: apiBaseUrl + "node/startend/edge/all/simplified/metadata/" + selectedMetaData + "/typeid/"+typeid+"/uuid/"+uuid,
			dataType : 'json',
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
	
	this.getNodesFromEntryNode = function ( jsonData,  doneFunction, failFunction ){
		
		if( selectedMetaData == null ) {
			return null;
		}

		jsonData = GlobalApiUtils.assignApiHeaders( jsonData );

		var request = $.ajax({
			
			method : 'POST',
			url: apiBaseUrl + "node/search/from/node/repo/" + selectedMetaDataRepo + "/" + loggedInUserName,
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
	}
	
	this.searchNode = function ( jsonData,  doneFunction, failFunction ){
		if( selectedMetaData == null ) {
			return null;
		}
		
		jsonData = GlobalApiUtils.assignApiHeaders( jsonData );

		
		var request = $.ajax({
			
			method : 'POST',
			url: apiBaseUrl + "node/search/byproperties/metadata/" + selectedMetaData,
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
	}
	
	this.deleteNode = function ( jsonData,  doneFunction, failFunction ){
		
		if( selectedMetaData == null ) {
			return null;
		}
		
		jsonData = GlobalApiUtils.assignApiHeaders( jsonData );

//		jsonData["namespace"] = loggedInUserName;
//		jsonData["grouphost"] = userGroup.host;
//		jsonData["groupname"] = userGroup.name;
		
		var request = $.ajax({
			method : 'DELETE',
			url : apiBaseUrl + 'node/delete/metadata/'+ selectedMetaDataRepo,
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
	
}

