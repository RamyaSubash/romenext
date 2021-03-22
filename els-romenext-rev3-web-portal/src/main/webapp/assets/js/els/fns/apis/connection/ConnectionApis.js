function ConnectionApis() {
	
	/**
	 * API Calls for Connections
	 */
	/***************************************************************************************/
	this.saveNewConnectionAPI = function saveNewConnectionAPI(jsonData, doneFunction, failFunction ){
		
		if (selectedMetaData){
			var saveNewConnectionRequest = $.ajax({
				method : 'POST',
				url : apiBaseUrl + 'connection/create/metadata/' + selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(jsonData),
				contentType : 'application/json',
				cache : false,
				async:false,
			});
			saveNewConnectionRequest.done(function (data) {  
				doneFunction( data );
			});
			saveNewConnectionRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}


	//=================================================================================================
	// updated with new api
	this.saveUpdateConnectionById = function saveUpdateConnection(connData, doneFunction, failFunction){
		
		if (selectedMetaData){
			var saveUpdatetConnectionRequest = $.ajax({
				method : 'PUT',
				url : apiBaseUrl + 'connection/update/metadata/'+ selectedMetaData,
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
	
//	this.deleteConnection = function deleteConnection(origin, dest, rule, connData, doneFunction, failFunction ){
//		
//		if (selectedMetaData){
//			var deleteConnectionRequest = $.ajax({
//				method : 'DELETE',
//				url : apiBaseUrl + 'connection/origin/'+origin+'/dest/'+dest+'/rule/'+rule+ '/metadata/'+ selectedMetaData,
//				dataType : 'json',
//				contentType : 'application/json',
//				cache : false,
//				async:false,
//			});
//			deleteConnectionRequest.done(function (data) {  
//				doneFunction( data );
//			});
//			deleteConnectionRequest.fail(function (xhr, status, error) {
//				failFunction( xhr, status, error );
//			});
//	
//		}
//	
//	}
	
	/**
	 * Note, this is really adding a RULE property
	 */
	// Calling new API
	this.addRuleProperties = function( jsonData,  doneFunction, failFunction ) {	
		// should we do a sanity check on the properties to ensure it's the right class?
		
		// properties should be an array of TypePRopertyObj's
		// first create a json string for data

		if (selectedMetaData){
			var saveRulePropertiesRequest =$.ajax({
				method : 'POST',
				url : apiBaseUrl + 'rule/add/property/metadata/'+ selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(jsonData),
				contentType : 'application/json',
				async : false,	
				cache : false,
			});
			saveRulePropertiesRequest.done(function (data) {  
				doneFunction( data );
			});
			saveRulePropertiesRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	};
	
	

	// =================================================NEW ==========================================
	// CALLING NEW API
    this.saveNewLink = function saveNewLink(metadataId, jsonData, doneFunction, failFunction ){
		
		if (selectedMetaData){
			var saveNewLinkRequest = $.ajax({
				method : 'POST',
				url : apiBaseUrl + 'rule/create/link/'+ metadataId,
				dataType : 'json',
				data : JSON.stringify(jsonData),
				contentType : 'application/json',
				cache : false,
				async:false,
			});
			saveNewLinkRequest.done(function (data) {  
				doneFunction( data );
			});
			saveNewLinkRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});

		}
	
	}
	
    this.addLinkProperty = function( property, loggedInUserName, doneFunction, failFunction ) {	
		
		if (selectedMetaData){
			var saveLinkPropertyRequest =$.ajax({
				method : 'POST',
				url : apiBaseUrl + 'rule/property/add/'+ selectedMetaData+ '/' + loggedInUserName,
				dataType : 'json',
				data : JSON.stringify(property),
				contentType : 'application/json',
				async : false,	
				cache : false,
			});
			saveLinkPropertyRequest.done(function (data) {  
				doneFunction( data );
			});
			saveLinkPropertyRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
    
    this.updateLinkProperty = function( property,  doneFunction, failFunction ) {	
		
		if (selectedMetaData){
			var updateLinkPropertyRequest =$.ajax({
				method : 'POST',
				url : apiBaseUrl + 'rule/property/update/'+ selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(property),
				contentType : 'application/json',
				async : false,	
				cache : false,
			});
			updateLinkPropertyRequest.done(function (data) {  
				doneFunction( data );
			});
			updateLinkPropertyRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
	
	this.assignLinkToTypeAPI  = function ( jsonData,  doneFunction, failFunction  ){
		
		if (selectedMetaData){
			var assignLinkRequest =$.ajax({
				method : 'POST',
				url : apiBaseUrl + 'connection/link/assign/direct/metadata/'+ selectedMetaData +"/",
				dataType : 'json',
				data : JSON.stringify(jsonData),
				contentType : 'application/json',
				async : false,	
				cache : false
			});
			assignLinkRequest.done(function (data) {  
				doneFunction( data );
			});
			assignLinkRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}

    this.deleteConnectionAPI = function (connData, doneFunction, failFunction ){
		
		if (selectedMetaData){
			var deleteConnectionRequest = $.ajax({
				method : 'POST',
				url : apiBaseUrl + 'connection/delete/'+ selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(connData),
				contentType : 'application/json',
				cache : false,
				async:false,
			});
			deleteConnectionRequest.done(function (data) {  
				doneFunction( data );
			});
			deleteConnectionRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
	
		}
	
	}
	
	
	
	// old API for assign type to link
//    this.assignTypeTolink  = function ( jsonData,  doneFunction, failFunction  ){
//		
//		if (selectedMetaData){
//			var assignLinkRequest =$.ajax({
//				method : 'POST',
//				url : apiBaseUrl + 'connection/link/assign/metadata/'+ selectedMetaData +"/",
//				dataType : 'json',
//				data : JSON.stringify(jsonData),
//				contentType : 'application/json',
//				async : false,	
//				cache : false
//			});
//			assignLinkRequest.done(function (data) {  
//				doneFunction( data );
//			});
//			assignLinkRequest.fail(function (xhr, status, error) {
//				failFunction( xhr, status, error );
//			});
//		}
//	}
	
//	this.saveUpdateConnection = function saveUpdateConnection(name, origin, dest, rule, connData, doneFunction, failFunction){
//	
//	if (selectedMetaData){
//		var saveUpdatetConnectionRequest = $.ajax({
//			method : 'PUT',
//			url : apiBaseUrl + 'connection/'+name+'/'+origin+'/'+dest+'/'+rule+ '/metadata/'+ selectedMetaData,
//			dataType : 'json',
//			data : JSON.stringify(connData),
//			contentType : 'application/json',
//			cache : false,
//			async:false,
//		});
//		saveUpdatetConnectionRequest.done(function (data) {  
//			doneFunction( data );
//		});
//		saveUpdatetConnectionRequest.fail(function (xhr, status, error) {
//			failFunction( xhr, status, error );
//		});
//
//	}
//
//}
//  this.updateRuleProperties = function( ruleName, properties, doneFunction, failFunction ) {
//	
//	// should we do a sanity check on the properties to ensure it's the right class?
//	
//	// properties should be an array of TypePRopertyObj's
//	// first create a json string for data
//	
//	
//	if (selectedMetaData){
//		var updateRulePropertiesRequest =$.ajax({
//			method : 'PUT',
//			url : apiBaseUrl + 'rule/ruleandproperty/'+ruleName+'/metadata/'+ selectedMetaData,
//			dataType : 'json',
//			data : JSON.stringify(properties),
//			contentType : 'application/json',
//			async : false,	
//			cache : false,
//		});
//		updateRulePropertiesRequest.done(function (data) {  
//			doneFunction( data );
//		});
//		updateRulePropertiesRequest.fail(function (xhr, status, error) {
//			failFunction( xhr, status, error );
//		});
//	}
//};
	
	
	
	
	
};