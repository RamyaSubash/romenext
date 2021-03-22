function shapeApis() {

/**
 * 
 */
//==================================================================================================
//    Model APIs
//            . AddModel
//            . GetModels
//    Shape APIs
//            . AddShape3D
//            . GetShapes
//	          . UpdateShape3D
//	          . AddContour3D
//	          . UpdateGroupShapes
	
//	  Proeprties APIs
//	          . AddModelProperties
//	          . GetModelProperties
//	          . SaveAssignShapeToProperty
//	          . UpdateModelProperty
//	          . 
	
	           
	          
	this.addModel = function (jsonData, doneFunction, failFunction ){
		if (selectedMetaData){
			var addModelRequest =$.ajax({
				method : 'POST',
				url : apiBaseUrl + 'model/model/',
				dataType : 'json',
				data : jsonData,
				contentType : 'application/json',
				cache : false			
			});
			addModelRequest.done(function (data) {  
				doneFunction( data );
			});
			addModelRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
	
	this.getModels = function( jsonModel,  doneFunction, failFunction ) {
		var getModelsrequest =$.ajax({
			method : 'POST',
			url : apiBaseUrl + 'model/model/all',
			dataType : 'json',
			data : JSON.stringify(jsonModel),
			contentType : 'application/json',
			async : false,
			cache : false
		});
		getModelsrequest.fail(function(xhr, status, error) {
			failFunction(xhr, status, error);
		});
		getModelsrequest.done(function(data) {
			doneFunction(data);
		});
	}
	
//================================================================================	
	
	this.addShape3D = function ( jsonData,  doneFunction, failFunction ){
		if (selectedMetaData){
			var addShape3DRequest =$.ajax({			
				method : 'POST',
				url : apiBaseUrl + 'model/shape/',
				dataType : 'json',
				data : jsonData,
				contentType : 'application/json',
				cache : false,
				async : false
			});
			addShape3DRequest.done(function (data) {  
				doneFunction( data );
			});
			addShape3DRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
	
	this.getShapes = function( modelId, doneFunction, failFunction ) {	
		var getShapesRequest = $.ajax({
			method : 'GET',
			url : apiBaseUrl + 'model/shape/' + modelId + "/" + loggedInUserName,
			contentType : 'application/json',
			cache : false,
			async : false
		});
		getShapesRequest.fail(function(xhr, status, error) {
			failFunction(xhr, status, error);
		});
		getShapesRequest.done(function(data) {
			doneFunction( data );
		
		});
	}
	
	this.updateShape3D = function ( json_updateShape, doneFunction, failFunction ) {
		
		if (selectedMetaData){
			var updateShape3DRequest =$.ajax({
				method : 'PUT',
				url : apiBaseUrl + 'model/shape/',
				contentType : 'application/json',
				dataType : 'json',
				data : json_updateShape,
				cache : false,
				async : false                                                      // needed only for the axis (added by Shoabow)
			});
			updateShape3DRequest.done(function (data) {  
				doneFunction( data );
			});
			updateShape3DRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	};	
	
	this.addContour3D = function ( jsonData,  doneFunction, failFunction ){
		if (selectedMetaData){
			var addContour3DRequest =$.ajax({
				method : 'POST',
				url : apiBaseUrl + 'model/shape/group',
				dataType : 'json',
				data : jsonData,
				contentType : 'application/json',
				cache : false
			});
			addContour3DRequest.done(function (data) {  
				doneFunction( data );
			});
			addContour3DRequest.fail(function (xhr, status, error) {
				failFunction( xhr, status, error );
			});
		}
	}
	
	this.updateGroup3DShapes = function (jsonDataC, doneFunction, failFunction  ){
		if (selectedMetaData){
			var updateGroup3DShapesRequest = 	$.ajax({
				method : 'PUT',
				url : apiBaseUrl + 'model/shape/group',
				contentType : 'application/json',
				dataType : 'json',
				data : jsonDataC,			
				cache : false
	           });
	           updateGroup3DShapesRequest.done(function (data){
	        	   doneFunction( data );
	           });   
	           updateGroup3DShapesRequest.fail(function (xhr, status, error) {
				   failFunction( xhr, status, error );
			   });
		}
	}

//=====================================================================================
	this.addModelProperty = function( json_addProperty, doneFunction, failFunction ) {	
		if (selectedMetaData != null){
			var addModelPropertyRequest = $.ajax({
				method : 'POST',
				url : apiBaseUrl + 'model/model/property',
				dataType : 'json',
				data : json_addProperty,
				contentType : 'application/json',
				cache : false,
				async : false	
			});
			addModelPropertyRequest.fail(function(xhr, status, error) {
				failFunction(xhr, status, error);
			});
			addModelPropertyRequest.done(function(data) {
				doneFunction( data );
			
		    });
		}
	}
		
	this.getModelProperties = function( json_modelid, doneFunction, failFunction ) {	
		if (selectedMetaData != null){
			var getPropertiesRequest = $.ajax({
				method : 'POST',
				url : apiBaseUrl + 'model/model/property/getall/',
				dataType : 'json',
				data : json_modelid,
				contentType : 'application/json',
				cache : false,
				async : false
				
			});
			getPropertiesRequest.fail(function(xhr, status, error) {
				failFunction(xhr, status, error);
			});
			getPropertiesRequest.done(function(data) {
				doneFunction( data );
			
		    });
		}
	}
	
	this.updateModelProperty = function (json_updateProperty, doneFunction, failFunction ){
			
			if (selectedMetaData){
				var updateModelPropertyRequest = 	$.ajax({
					method : 'PUT',
					url : apiBaseUrl + 'model/model/property',
					contentType : 'application/json',
					dataType : 'json',
					data : json_updateProperty,
					cache : false
		           });
				updateModelPropertyRequest.done(function (data){
		        	   doneFunction( data );
		           });   
				updateModelPropertyRequest.fail(function (xhr, status, error) {
					   failFunction( xhr, status, error );
				   });
			}
				
		}
		
	this.saveAssignShapeToProperty = function( json_assignPropToShape, doneFunction, failFunction ) {	
		
		if (selectedMetaData != null){
			var saveAssignShapeToPropertyRequest = $.ajax({
				method : 'PUT',
				url : apiBaseUrl + 'model/shape/property',
				dataType : 'json',
				data : json_assignPropToShape,
				contentType : 'application/json',
				cache : false,
			});
			saveAssignShapeToPropertyRequest.fail(function(xhr, status, error) {
				failFunction(xhr, status, error);
			});
			saveAssignShapeToPropertyRequest.done(function(data) {
				doneFunction( data );
			
		    });
		}
	}
	
	
}