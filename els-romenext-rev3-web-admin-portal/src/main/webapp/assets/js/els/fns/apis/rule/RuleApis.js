function RuleApis() {
	// NEW API
	this.getAllRules = function ( jsonData, doneFunction, failFunction ){

		if (selectedMetaData){
			var allRuleRequest =$.ajax({
				method : 'POST',
				url : apiBaseUrl + 'rule/get/all/metadata/' + selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(jsonData),
				contentType : 'application/json',
				cache : false,
				async:false
			});
			allRuleRequest.done(function (jsonData) {  
				doneFunction( jsonData );
			});
			allRuleRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
	
	this.getLinkRules = function ( jsonData, doneFunction, failFunction ){
		
		var getLinkRules =$.ajax({
			method : 'POST',
			url : apiBaseUrl + 'rule/get/link/all/metadata/' + selectedMetaData,
			dataType : 'json',
			data : JSON.stringify(jsonData),
			contentType : 'application/json',
			cache : false,
			async : false	
		});
		
		getLinkRules.done(function (data) {  
			doneFunction( data );
		});
		getLinkRules.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});
		
	};
	// New API 
	this.updateRuleAndProperties = function ( rule, jsonData, doneFunction, failFunction ){
				
		var request =$.ajax({
			method : 'POST',
			url : apiBaseUrl + 'rule/property/update/' + selectedMetaData ,
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
	
	this.updateRule = function (jsonData, doneFunction, failFunction ){
		
		var updateRuleRequest =$.ajax({
			method : 'POST',
			url : apiBaseUrl + 'rule/update/metadata/' + selectedMetaData ,
			dataType : 'json',
			data : JSON.stringify(jsonData),
			contentType : 'application/json',
			cache : false,
			async : false	
		});
		updateRuleRequest.done(function (data) {  
			doneFunction( data );
		});
		updateRuleRequest.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});
		
		
	}
    
	this.updateLinkDeco = function (jsonData, doneFunction, failFunction ){
		
		var updateLinkRequest =$.ajax({
			method : 'POST',
			url : apiBaseUrl + 'rule/update/link/metadata/' + selectedMetaData ,
			dataType : 'json',
			data : JSON.stringify(jsonData),
			contentType : 'application/json',
			cache : false,
			async : false	
		});
		updateLinkRequest.done(function (data) {  
			doneFunction( data );
		});
		updateLinkRequest.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});	
	}
	
	this.getRuleAPI = function ( jsonData, doneFunction, failFunction ){

		if (selectedMetaData){
			var getRuleRequest =$.ajax({
				method : 'POST',
				url : apiBaseUrl + 'rule/get/metadata/' + selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(jsonData),
				contentType : 'application/json',
				cache : false,
				async:false
			});
			getRuleRequest.done(function (jsonData) {  
				doneFunction( jsonData );
			});
			getRuleRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
	
	
};