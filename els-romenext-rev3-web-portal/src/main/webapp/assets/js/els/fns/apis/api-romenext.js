//=====================================================================
function apiRomeNext() {
	
	
	// General API Calls
	this.retrieveAllMetadata = function ( doneFunction, failFunction ){
		var request =$.ajax({			
			method: 'GET',
			crossDomain: true,
			url : apiBaseUrl + 'metadata/all',
			dataType : 'json',
			contentType : 'application/json',
			cache : false,
			
		});
		request.done(function (data) {  
			doneFunction( data );
		});
		request.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});
	}
	
	
	// DO NOT USE THIS METHOD
	// See the updated version below
//	this.retrieveAllReposByMetadata = function ( metadata, username, doneFunction, failFunction ){
//		var request =$.ajax({			
//			method : 'GET',
//			url : apiBaseUrl + 'metadata/all/repos/' + metadata + '/' + username,
//			dataType : 'json',
//			contentType : 'application/json',
//			cache : false,
//			async:false
//			
//		});
//		request.done(function (data) {  
//			doneFunction( data );
//		});
//		request.fail(function (xhr, status, error) {
//			failFunction( xhr, status, error );
//		});
//	}
	
	
	// This is an updated version of the api that now uses the post/groupreqeust api
	this.retrieveAllReposByMetadata = function ( metadata, username, doneFunction, failFunction ){
		
		var jsonData = {};
		
		jsonData = GlobalApiUtils.assignApiHeaders( jsonData );
	
		
		var request = $.ajax({
			method: "POST",
			url: apiBaseUrl + 'metadata/all/repos/' + selectedMetaData,
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
	
	
	
	this.retrieveAllDecorators = function ( doneFunction, failFunction ){
		var request =$.ajax({			
			method: 'GET',
			crossDomain: true,
			url : apiBaseUrl + 'deco/all',
			dataType : 'json',
			contentType : 'application/json',
			cache : false,
			
		});
		request.done(function (data) {  
			doneFunction( data );
		});
		request.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});
	}
	
	this.retrieveAllNeo4jServerInstances = function ( doneFunction, failFunction ){
		var request =$.ajax({			
			method: 'GET',
			crossDomain: true,
			url : apiBaseUrl + 'neo4jserver/all',
			dataType : 'json',
			contentType : 'application/json',
			cache : false,
		});
		request.done(function (data) {  
			doneFunction( data );
		});
		request.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});
	}
	
	// Physical API Calls

	


	
	
	
	
	
	/**
	 * Note: This should do a check against metadata and fail gracefully
	 * 
	 * also, this is currently silly way of doing things, WE are doing multiple ways of things
	 * 
	 * ie. 
	 * success/error/fail/done
	 * 
	 */
	this.saveEdgeBatch = function( edgeData, doneFunction, failFunction ) {
		if (selectedMetaData != null){
			var saveEdgeBatchRequest =$.ajax({
				method: 'PUT',
				crossDomain: true,
//				url: apiBaseUrl + "edge/withdeco/batch/metadata/" + selectedMetaData,
				url: apiBaseUrl + "edge/batch/metadata/" + selectedMetaData,
				dataType : 'json',
				data : JSON.stringify( edgeData ),
				contentType : 'application/json',
				cache : false
			});
			saveEdgeBatchRequest.done(function(data) {
				doneFunction(data);
		    });	
			saveEdgeBatchRequest.fail(function(xhr, status, error) {
					failFunction( xhr, status, error );
			});
				
		}
	}

	this.getallDecos = function ( doneFunction, failFunction ) {
		var decoratorRequest =$.ajax({
			method: 'GET',
			crossDomain: true,
			url : apiBaseUrl + 'deco/all',
			dataType : 'json',
			contentType : 'application/json',
			cache : false,
		});
		decoratorRequest.done(function (jsonData) {
			doneFunction( jsonData );
		});

		decoratorRequest.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});
	};

    // Calling new API 
	this.getAllTypesAndConnections = function ( jsonData, doneFunction, failFunction ) {	
		
		if (selectedMetaData) {
			console.log("Get into requesting " +  apiBaseUrl + 'type/connection/all/bygroup/metadata/' +  selectedMetaData);
			var request = $.ajax({
				method: "POST",
				crossDomain: true,
				url   : apiBaseUrl + 'type/connection/all/bygroup/metadata/' +  selectedMetaData,
				dataType: "json",
				data : JSON.stringify(jsonData),
				contentType : 'application/json',
				cache: false,
				async : false
			});
			request.done(function (jsonData) {  
				console.log(jsonData);
				doneFunction( jsonData );	
			});
			request.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	};
	this.getAllDCTs = function ( jsonData, doneFunction, failFunction ) {	
		if(selectedMetaData){
			var request = $.ajax({
				method: "POST",
				crossDomain: true,
				url   : apiBaseUrl + 'dct/get/all/bygroup/metadata/' +  selectedMetaData,
				dataType: "json",
				data : JSON.stringify(jsonData),
				contentType : 'application/json',
				cache: false,
				async : false
			});
			request.done(function (jsonData) {  
				doneFunction( jsonData );	
			});
			request.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	};

	
	
	
	
	

//	this.getAllRules = function loadAllRules( doneFunction, failFunction ){
//		if (selectedMetaData){
//			var allRuleRequest =$.ajax({
//				method : 'GET',
//				url : apiBaseUrl + 'rule/all/bygroup/metadata/' + selectedMetaData + '/' + userGroup.name + '/' + userGroup.host + '/' + loggedInUserName,
//				dataType : 'json',
//				contentType : 'application/json',
//				cache : false,
//				async:false
//			});
//			allRuleRequest.done(function (jsonData) {  
//				doneFunction( jsonData );
//			});
//			allRuleRequest.fail(function (xhr, status, error) {
//				failFunction( xhr, status, error );
//			});
//		}
//	}
	
	this.saveNewRule = function ( ruleData,  doneFunction, failFunction ){
		if (selectedMetaData){
			var saveNewRuleRequest =$.ajax({
				method: 'POST',
				crossDomain: true,
				url : apiBaseUrl + 'rule/metadata/' + selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(ruleData),
				contentType : 'application/json',
				cache : false,
				async : false,
			});
			saveTypeRequest.done(function (data) {  
				doneFunction( data );
			});
			saveTypeRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
	
	
	
	this.saveNewType = function ( typeData,  doneFunction, failFunction ){
		if (selectedMetaData){
			var saveTypeRequest =$.ajax({
				method: 'POST',
				crossDomain: true,
				url : apiBaseUrl + 'type/metadata/' + selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(typeData),
				contentType : 'application/json',
				cache : false,
				async : false,
			});
			saveTypeRequest.done(function (data) {  
				// explicitly call the global done functions
				data.color =  TYPES_COLOR[colorIndex];  // add color to type
				colorIndex ++;				
				doneFunction( data );
			});
			saveTypeRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
	
	
	
	
	
	
	
	// DEPRECATED
	// PLEASE USE THE TYPE PROPERTY SAVE CLASS
	this.saveTypeProperties = function saveTypeProperties(typename, typeData,  doneFunction, failFunction ){
		if (selectedMetaData){
			var saveTypePropertiesRequest =$.ajax({
				method: 'POST',
				crossDomain: true,
				url : apiBaseUrl + 'type/properties/' + typename+ '/metadata/'+ selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(typeData),
				contentType : 'application/json',
				cache : false,
			});
			saveTypePropertiesRequest.done(function (data) {  
				doneFunction( data );
			});
			saveTypePropertiesRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
	
	this.saveUpdateType = function ( typeId, typeData,  doneFunction, failFunction ){
		if (selectedMetaData){
			var updateTypeRequest =$.ajax({			
				method: 'PUT',
				crossDomain: true,
				url : apiBaseUrl + 'type/typeandproperty/' + typeId+ '/metadata/'+ selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(typeData),
				contentType : 'application/json',
				cache : false,
				
			});
			updateTypeRequest.done(function (data) {  
				doneFunction( data );
			});
			updateTypeRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
	// OLD ONE  
	this.saveTypeCoordinates = function ( typeCoorData, doneFunction, failFunction ){
		if (selectedMetaData){
			var request =$.ajax({			
				method: 'POST',
				crossDomain: true,
				url: apiBaseUrl + "type/coordinates/metadata/" + selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(typeCoorData),
				contentType : 'application/json',
				cache : false,
				
			});
			request.done(function (data) {  
				doneFunction( data );
			});
			request.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
	
	/**
	 * API Calls for Connections
	 */
	
	
	this.saveUpdateConnection = function saveUpdateConnection(name, origin, dest, rule, connData, doneFunction, failFunction){
		
		if (selectedMetaData){
			var saveUpdatetConnectionRequest = $.ajax({
				method: 'PUT',
				crossDomain: true,
				url : apiBaseUrl + 'connection/'+name+'/'+origin+'/'+dest+'/'+rule+ '/metadata/'+ selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(connData),
				contentType : 'application/json',
				cache : false,
				async:false,
			});
			saveUpdatetConnectionRequest.done(function (data) {  
				doneFunction( data );
			});
			saveUpdatetConnectionRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
	
		}
	
	}
	
//	this.saveUpdateConnectionById = function saveUpdateConnection(connId, connData, doneFunction, failFunction){
//		
//		if (selectedMetaData){
//			var saveUpdatetConnectionRequest = $.ajax({
//				method : 'PUT',
//				url : apiBaseUrl + 'connection/byid/'+connId+'/metadata/'+ selectedMetaData,
//				dataType : 'json',
//				data : JSON.stringify(connData),
//				contentType : 'application/json',
//				cache : false,
//				async:false,
//			});
//			saveUpdatetConnectionRequest.done(function (data) {  
//				doneFunction( data );
//			});
//			saveUpdatetConnectionRequest.fail(function (xhr, status, error) {
//				failFunction( xhr, status, error );
//			});
//	
//		}
//	
//	}
	
	this.deleteConnection = function deleteConnection(origin, dest, rule, connData, doneFunction, failFunction ){
		
		if (selectedMetaData){
			var deleteConnectionRequest = $.ajax({
				method: 'DELETE',
				crossDomain: true,
				url : apiBaseUrl + 'connection/origin/'+origin+'/dest/'+dest+'/rule/'+rule+ '/metadata/'+ selectedMetaData,
				dataType : 'json',
				contentType : 'application/json',
				cache : false,
			});
			deleteConnectionRequest.done(function (data) {  
				doneFunction( data );
			});
			deleteConnectionRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
	
		}
	
	}
//***************************************************************************************************
//                       API CALL FOR DISPLAY 
//**************************************************************************************************
	this.loadNodesOfAType = function loadNodesOfAType( type,  doneFunction, failFunction ){
		if (selectedMetaData){
			var loadNodesOfATypeRequest =$.ajax({	
				
				url: apiBaseUrl + "node/all/"+type+"/metadata/" + selectedMetaData ,
				method: "GET",
				crossDomain: true,
		 		dataType : 'json',
				contentType : 'application/json',
				cache : false,			
			});
			loadNodesOfATypeRequest.done(function (data) {  
				doneFunction( data );
			});
			loadNodesOfATypeRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
	
	this.loadAllNodes = function loadAllNodes( jsonData,  doneFunction, failFunction ){
		if (selectedMetaData){
			var loadAllNodesRequest =$.ajax({	
				url: apiBaseUrl + "node/edge/simplified/metadata/" + selectedMetaDataRepo + "/" + loggedInUserName,
				method: "POST",
				crossDomain: true,
		 		dataType : 'json',
				data : JSON.stringify(jsonData),
				contentType : 'application/json',
				cache : false,
				async : false
			});
			loadAllNodesRequest.done(function (data) {  
				doneFunction( data );
			});
			loadAllNodesRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
	
	
	this.initInstanceGraph = function initInstanceGraph(doneFunction, failFunction ){
		if (selectedMetaData){
			var initInstanceGraphRequest =$.ajax({		
				url: apiBaseUrl + "node/edge/all/simplified/metadata/" + selectedMetaData ,
				method: "GET",
				crossDomain: true,
				dataType: "json",
				contentType : 'application/json',
				cache : false,
				async : false
			});
			initInstanceGraphRequest.done(function (data) {  
				doneFunction( data );
			});
			initInstanceGraphRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
//	API for Drilldown 
	
//	this.loadSubGraph = function loadSubGraph(node, doneFunction, failFunction ){
//		if (selectedMetaData){
//	
//			var loadSubGraphRequest = $.ajax({
//				url: apiBaseUrl + "node/end/edge/all/simplified/metadata/"+ selectedMetaData +"/uuid/"+node  ,
//				method: "GET",
//				dataType: "json",
//				async : false,
//				cache : false
//				
//			});
//			loadSubGraphRequest.done(function (data) {  
//				doneFunction( data );
//			});
//			loadSubGraphRequest.fail(function (xhr, status, error) {
//				failFunction( xhr, status, error );
//			});
//		}
//	}
	
	
	
	this.saveLogicalPosition = function saveLogicalPosition(jsonData, doneFunction, failFunction ){
		if (selectedMetaData){
			var saveLogicalPositionRequest =$.ajax({
				method: 'PUT',
				crossDomain: true,
				url: apiBaseUrl + "node/batch/metadata/" + selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(jsonData),
				contentType : 'application/json',
				cache : false, 
				async : false
			});
			saveLogicalPositionRequest.done(function (data) {  
				doneFunction( data );
			});
			saveLogicalPositionRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
	
//===========================================================================================
//                  APIS for PHYSICAL DESIGN 
//===========================================================================================
	

	
	
//	Used by OLd ODT and Model management                 ==   the
	this.getModelShapes = function getModelShapes(modelId, doneFunction, failFunction ){
		if (selectedMetaData){
			var getModelShapesRequest =$.ajax({
				method: 'GET',
				crossDomain: true,
				url : apiBaseUrl + 'model/shape/' + modelId,
				contentType : 'application/json',
				cache : false,	
				async:false
			});
			getModelShapesRequest.done(function (data) {  
				doneFunction( data );
			});
			getModelShapesRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
	
	
	
	
	
	
	
//========================================== SAVING CREATED SHAPES ===========================
	
//==================================== SAVING CONSTRUCTION LINE
	
	// this used by Old ODT                --------   use the one in shapeApis  addShape3D
	this.saveShape3D = function saveShape3D( jsonData,  doneFunction, failFunction ){
		if (selectedMetaData){
			var saveShape3DRequest =$.ajax({			
				method: 'POST',
				crossDomain: true,
				url : apiBaseUrl + 'model/shape/',
				dataType : 'json',
				data : jsonData,
				contentType : 'application/json',
				cache : false,
				async : false,
			});
			saveShape3DRequest.done(function (data) {  
				doneFunction( data );
			});
			saveShape3DRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
	
//==================================== SAVING CONTOUR ====================================	
	this.save3DContour = function save3DContour( jsonData,  doneFunction, failFunction ){
		if (selectedMetaData){
			var save3DContourRequest =$.ajax({
				method: 'POST',
				crossDomain: true,
				url : apiBaseUrl + 'model/shape/group',
				dataType : 'json',
				data : jsonData,
				contentType : 'application/json',
				cache : false
			});
			save3DContourRequest.done(function (data) {  
				doneFunction( data );
			});
			save3DContourRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
		
	
}

