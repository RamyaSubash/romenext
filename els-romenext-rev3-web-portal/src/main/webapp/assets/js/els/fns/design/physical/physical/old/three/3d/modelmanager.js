///**
// * Model manager
// */
//
//
//function initPhsical3DView2() {
//	
//	console.log("Entered new viewer");
//	var typeId = findTypeIdByName(curType);
//	
//	console.log("---------------- metadata : " + selectedMetaData );
//	console.log(" --------------- typeid : " + typeId );
//	if (selectedMetaData == null || typeId == null) {
//		return;
//	}
//	
//	
//	// clear off the view and make it ready for the 3d view
//	document.getElementById("tdvCy").style.display = "none";
//	document.getElementById("pdsv").style.display = "none";
//	document.getElementById("pdpv").style.display = "none";
//	
//	document.getElementById("typeBar").style.display = "none";
//	document.getElementById("ruleBar").style.display = "none";
//	
//	document.getElementById("grid-models").style.visibility = "hidden";
//	
//	document.getElementById("pv3d").style.display = "block";
//	
//	document.getElementById("pv3d").innerHTML = "DOES THIS WORK?";
//	
//	
//	
//	// load all needed data
//	// initialize the 3d view
//	// generate the view
//	
//	
//	
//	
//	resetCamera();
//	
//	load3dModels();
//	
//	var toolbarObj = new toolbarManager();
//	
//	toolbarObj.createToolBar();
//	// createToolbar();
//	
//	// create3DPhysicalViewToolBar();  
//
//}
//
//
//
//function resetCamera() {
//	gridCamera = [
////					// ALL TEST
////					// x is red
////					// y is green
////					// z is blue
////					{
////					// TOP LEFT
////					// TOP
////						cameratype: 'ORTH',
////						cameramovable: false,
////						viewpoint: "FRONT",
////
////						left: 0,
////						bottom: 0.8,
////						width: 0.25,
////						height: .2,
////						background: new THREE.Color().setRGB( 255, 255, 255 ),
////						// X Y Z
////						eye: [ 0, 0, 1000 ],
////						up: [ 0, 0, 1 ],
////						fov: 90,
////						zoom: 1,
////						near: -500,
////						far: 2000,
////						updateCamera: function ( camera, scene, mouseX, mouseY ) {
////						  // camera.position.x += mouseX * 0.05;
////						  // camera.position.x = Math.max( Math.min( camera.position.x, 500 ), -500 );
////						  // camera.lookAt( scene.position );
////						}
////					},
////					{
////					// TOP RIGHT
////						cameratype: 'ORTH',
////						cameramovable: false,
////						viewpoint: "BACK",
////
////						left: 0.75,
////						bottom: 0.8,
////						width: 0.25,
////						height: 0.2,
////						background: new THREE.Color().setRGB( 255, 255, 255 ),
////						// x, y, z
////						eye: [  0, 0, -1000 ],
////						up: [ 0, 0, 0 ],
////						fov: 90,
////						zoom: 1,
////						near: -500,
////						far: 10000,
////						updateCamera: function ( camera, scene, mouseX, mouseY ) {
////						  // camera.position.x -= mouseX * 0.05;
////						  // camera.position.x = Math.max( Math.min( camera.position.x, 2000 ), -2000 );
////						  // camera.lookAt( camera.position.clone().setY( 0 ) );
////						}
////					},
////					{
////					// TOP MID-LEFT
////						cameratype: 'ORTH',
////						cameramovable: false,
////						viewpoint: "LEFTSIDE",
////
////						left: 0.25,
////						bottom: 0.8,
////						width: 0.25,
////						height: 0.2,
////						background: new THREE.Color().setRGB( 255, 255, 255 ),
////						// background: new THREE.Color().setRGB( 0,0,0 ),
////						// x y z
////						eye: [  -1000, 0, 0 ],
////						up: [ 0, 0, 1 ],
////						fov: 90,
////						zoom: 1,
////						near: -500,
////						far: 100000,
////						updateCamera: function ( camera, scene, mouseX, mouseY ) {
////						  // camera.position.x -= mouseX * 0.05;
////						  // camera.position.x = Math.max( Math.min( camera.position.x, 500 ), -500 );
////						  // camera.lookAt( camera.position.clone().setY( 0 ) );
////						},
////						near: -200,
////						far: 2000
////					},
////					// TOP MID-RIGHT
////					{
////						cameratype: 'ORTH',
////						cameramovable: false,
////						viewpoint: "RIGHTSIDE",
////
////						left: 0.5,
////						bottom: 0.8,
////						width: 0.25,
////						height: 0.2,
////						background: new THREE.Color().setRGB( 255, 255, 255   ),
////						eye: [ 1000, 0, 0 ],
////						up: [ 0, 1, 0 ],
////						fov: 25,
////						zoom: 1,
////						near: -500,
////						far: 2000,
////						updateCamera: function ( camera, scene, mouseX, mouseY ) {
////						  // camera.position.y -= mouseX * 0.05;
////						  // camera.position.y = Math.max( Math.min( camera.position.y, 1600 ), -1600 );
////						  // camera.lookAt( scene.position );
////						}
////					},
//					
//					{
//					// MAIN VIEWPORT
//						cameratype: 'ORTH',
//						cameramovable: true,
//						viewpoint: "FRONT",
//
//						left: 0,
//						bottom: 0,
//						width: 1,
//						height: 0.8,
//						background: new THREE.Color().setRGB( 255,255,255 ),
//						eye: [  200, 200, 200 ],
//						up: [ 0, 1, 0 ],
//						fov: 60,
//						near: -200,
//						far: 2000,
//						updateCamera: function ( camera, scene, mouseX, mouseY ) {
//						  // camera.position.y -= mouseX * 0.05;
//						  // camera.position.y = Math.max( Math.min( camera.position.y, 1600 ), -1600 );
//						  // camera.lookAt( scene.position ); 
//						}
//					} 
//					
//				];
//}
//
//
//
//function load3dModels() {
//	
//	console.log("Inside  == loadModels ===   loading shape curent type = " + curType);
//	// AL: add a shape if there no shape exists associated with this type
//	if (curType == null) {
//		console.log(" No curType value; no loading for model;")
//		return;
//	}
//	
//	// retrieve the models for the currently selected type 
//	// typename eg. Computer
//	// and repo
//	var json_getModel = '{"typeName": "' + curType + '", "repoid": ' + Number(selectedMetaData) + '}'
//	
////	var successFunction = function( data ) {
////		$('#console-log').append("<p style='color:blue'> Loaded All models successfully</p>");
////	};
////	
//	var doneFunction = function( data ) {
//		$('#console-log').append("<p style='color:blue'>loaded models for selected Type:</p>");
//		
//		// set the current workspace models as this type model
//		curModels = data.models;
//	};
//	
//	var failFunction = function(xhr, status, error ) {
//		$('#console-log').append("<p style='color:red'> failed to load models :"+xhr.status+"</p>");
//		console.log('failed to load models : '+ xhr.status);
//	};
//	
//	var apis = new shapeApis();
//	
////	apis.getModels( json_getModel, successFunction, doneFunction, failFunction);
//	
//	apis.getModels( json_getModel,  doneFunction, failFunction);
//	
//}
//
//function loadModelShapes(modelId) {
//	console.log("Inside  get shapes for a Model !!! redux");
//	if (modelId == null) {
//		console.log(" Inside getModelShapes; No model selected yet")
//		return;
//	}
//	
////	var successFunction = function( data ) {
////		console.log("get model Shapes data: "+ data);
////	};
//	
//	var doneFunction = function( data ) {
//		console.log("get model Shapes data: "+ data);
//		curModelShapes = data.shapes;    // updating current Model Shapes global variable
//	};
//	
//	var failFunction = function( xhr, status, error ) {
//		$('#console-log').append("<p style='color:red'> failed to load model shapes :"+xhr.status+"</p>");
//		console.log('failed to load the shape : '+ xhr.status);
//	};
//	
//	var apis = new shapeApis();
//
//	apis.getShapes(modelId, doneFunction, failFunction);
//	
//}