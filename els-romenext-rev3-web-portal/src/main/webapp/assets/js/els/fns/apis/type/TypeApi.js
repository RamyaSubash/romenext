function TypeApi() {
	this.getTypeByGroup = function(metadataId, userHost, userName, typeId, doneFunction, failFunction) {

		if (selectedMetaData) {
			var request = $.ajax({
				method: 'GET',
				crossDomain: true,
				url : apiBaseUrl + 'type/all/bygroup/host/' + userHost + '/name/' + userName + '/metadata/' + metadataId + "/" + loggedInUserName + "/" + typeId,
				dataType : 'json',
				contentType : 'application/json',
				cache : false,
				async : false
			});
			request.done(function(data) {
				doneFunction(data);
			});
			request.fail(function(xhr, status, error) {
				failFunction(xhr, status, error);
			});
		}

	}

	//	this.createTypeByGroup = function (metadataId, userHost, userName, typeData, doneFunction, failFunction){
	this.createTypeByGroup = function(metadataId, typeData, doneFunction, failFunction) {
		if (selectedMetaData) {
			var request = $.ajax({
				method: 'POST',
				headers: {  'Access-Control-Allow-Origin': '*' },
				url : apiBaseUrl + 'type/create/metadata/' + metadataId,
				dataType : 'json',
				data : JSON.stringify(typeData),
				contentType : 'application/json',
				cache : false,
				async : false
			});
			request.done(function(data) {
				// explicitly call the global done functions
				// data.color = TYPES_COLOR[colorIndex]; // add color to type
				// colorIndex++;
				doneFunction(data);
			});
			request.fail(function(xhr, status, error) {
				failFunction(xhr, status, error);
			});
		}

	}

	this.saveUpdateTypeByGroup = function(typeId, typeData, doneFunction, failFunction) {
		if (selectedMetaData) {
			var updateTypeRequest = $.ajax({
				method: 'PUT',
				crossDomain: true,
				url : apiBaseUrl + "type/update/withproperties/" + typeId + "/" + selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(typeData),
				contentType : 'application/json',
				cache : false,
				async : false
			});
			updateTypeRequest.done(function(data) {
				doneFunction(data);
			});
			updateTypeRequest.fail(function(xhr, status, error) {
				failFunction(xhr, status, error);
			});
		}
	}

	// saving graph nodes positions        /update/withproperties/{typeid}/{id}"
	this.saveTypeCoordinates = function(typeId, typeData, doneFunction, failFunction) {
		if (selectedMetaData) {
			var request = $.ajax({
				method: 'PUT',
				crossDomain: true,
				url : apiBaseUrl + "type/update/withproperties/" + typeId + "/" + selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(typeData),
				contentType : 'application/json',
				cache : false,
				async : false
			});
			request.done(function(data) {
				doneFunction(data);
			});
			request.fail(function(xhr, status, error) {
				failFunction(xhr, status, error);
			});
		}
	}


	this.deleteTypeByGroupAPI = function(jsonData, doneFunction, failFunction) {
		if (selectedMetaData) {
			var deleteTypeRequest = $.ajax({
				method: 'PUT',
				crossDomain: true,
				url : apiBaseUrl + "type/delete/" + selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(jsonData),
				contentType : 'application/json',
				cache : false,
				async : false
			});
			deleteTypeRequest.done(function(data) {
				doneFunction(data);
			});
			deleteTypeRequest.fail(function(xhr, status, error) {
				failFunction(xhr, status, error);
			});
		}
	}

	// this will get all nodes and edges given a set of TypeIds;
	//    this.getAllNodesAndEdges = function ( jsonData,  doneFunction, failFunction ){
	//		
	//		if( selectedMetaData == null ) {
	//			return null;
	//		}
	//		
	//		var request = $.ajax({
	//			method : 'POST',
	//			url : apiBaseUrl + 'node/get/all/withedges/metadata/'+ selectedMetaDataRepo,
	//			dataType : 'json',
	//			data : JSON.stringify(jsonData),
	//			contentType : 'application/json',
	//			cache : false,
	//			async : false
	//		});
	//
	//		request.done(function (data) {  
	//			doneFunction( data );
	//		});
	//		request.fail(function (xhr, status, error) {
	//			failFunction( xhr, status, error );
	//		});
	//	};


	this.getAllNodesFromType = function(jsonData, doneFunction, failFunction) {

		if (selectedMetaDataRepo == null) {
			return null;
		}

		var request = $.ajax({
			method: 'POST',
			crossDomain: true,
			url : apiBaseUrl + 'node/get/from/type/' + selectedMetaDataRepo,
			dataType : 'json',
			data : JSON.stringify(jsonData),
			contentType : 'application/json',
			cache : false,
			async : false
		});

		request.done(function(data) {
			doneFunction(data);
		});
		request.fail(function(xhr, status, error) {
			failFunction(xhr, status, error);
		});
	};

	this.getAllEdgesFromConnection = function(jsonData, doneFunction, failFunction) {

		if (selectedMetaDataRepo == null) {
			return null;
		}

		var request = $.ajax({
			method: 'POST',
			crossDomain: true,
			url : apiBaseUrl + 'edge/get/' + selectedMetaDataRepo,
			dataType : 'json',
			data : JSON.stringify(jsonData),
			contentType : 'application/json',
			cache : false,
			async : false
		});

		request.done(function(data) {
			doneFunction(data);
		});
		request.fail(function(xhr, status, error) {
			failFunction(xhr, status, error);
		});
	};

}
;