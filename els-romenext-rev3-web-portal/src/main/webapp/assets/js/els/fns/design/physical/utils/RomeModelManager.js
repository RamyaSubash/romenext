function RomeModelManager() {
	
//	this.getModels = function ( ) {	                                                                      // updated 18-01-2016
//		if(listTypeIds.length == 0  || typeMapViaId.length == 0  ){
//				console.log(" No curType value; no loading for model;");
//				$('#console-log').append("<p style='color:red'> No curType value; no loading for model;</p>");	
//				return;
//		}
//		
//		
//		console.log("Inside  == loadModels ===   loading shape curent type = " + typeMapViaId[listTypeIds[0]].name);
//		
//		// retrieve the models for the currently selected type 
//		// typename eg. Computer
//		// and repo
//			
//		var json_getModel={};
//		json_getModel['typeName'] = typeMapViaId[listTypeIds[0]].name;
//		json_getModel['repoid']   = Number(selectedMetaData);			
//		console.log(json_getModel);
//		
//		
//		var doneFunction = function( data ) {
//			$('#console-log').append("<p style='color:blue'>loaded models for selected Type:</p>");		
//			// set the current workspace models as this type model
//			curModels = data.models;
//		};
//		
//		var failFunction = function( xhr, status, error ) {
//			$('#console-log').append("<p style='color:red'> failed to load models :"+xhr.status+"</p>");
//			console.log('failed to load models : '+ xhr.status);
//		};
//		
//		var apis = new shapeApis();
//		
//		apis.getModels( json_getModel,  doneFunction, failFunction);
//		
//	};
//=================================================================================================
	this.getShapes = function(modelId) {
		console.log("Inside  get shapes for a Model !!! redux");
		if (modelId == null) {
			console.log(" Inside getModelShapes; No model selected yet")
			return;
		}
		
		
		var doneFunction = function( data ) {
			console.log("get model Shapes data: "); 
			console.table(data.shapes);
			curModelShapes = data.shapes;    // updating current Model Shapes global variable
		};
		
		var failFunction = function( xhr, status, error ) {
			$('#console-log').append("<p style='color:red'> failed to load model shapes :"+xhr.status+"</p>");
			console.log('failed to load the shape : '+ xhr.status);
		};
		
		var apis = new shapeApis();
		
		apis.getShapes(modelId,  doneFunction, failFunction);
		
	}
//========================================================================================================	
	this.getModelProperties3D = function(modelId) {
		
		console.log("Inside get Properties for the model!!!");
		if (modelId == null) {                    // if no model selected  return no Properties
			console.log(" Inside getModelProperties; No model selected yet")
			return;
		}
		
		var json_modelid = '{"modelId": '+ modelId + '}'; 
		var doneFunction = function( data ) {
		   console.log("Retrieved Model Properties data: "); console.table(data.properties);
		   $('#console-log').append("<p style='color:blue'> load model properties :</p>");
		   curModelProperties = data.properties;                                  // needs to update curModelShapes
		   
		   ModelPropertyUtils.displayAllModelProperties(curModelProperties);	   
		   ModelPropertyUtils.disablePropsForPlanes3D();                                            // this changes properties created
		   ModelPropertyUtils.organizePropModifierList3D();                                         // this modify the "add property"
			
		};
		
		var failFunction = function( xhr, status, error ) {
			$('#console-log').append("<p style='color:red'> failed to load model properties :"+xhr.status+"</p>");
			console.log('failed to load model properties  '+ xhr.status);
			
		};
		
		var apis = new shapeApis();
		
		apis.getModelProperties(json_modelid,  doneFunction, failFunction);	
	
	}
}