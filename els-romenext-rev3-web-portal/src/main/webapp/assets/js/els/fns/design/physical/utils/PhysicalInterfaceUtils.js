/**
 * 
 */
function PhysicalInterfaceUtils() {
	
}



//===================================================================================================
//UTILITIES FOR PHYSICAL  (DESIGN)   VIEW


PhysicalInterfaceUtils.findTypeProperty = function(propId){
	propertyId  = Number(propId);
	for(var i=0; i<curModelProperties.length; i++){
		if(curModelProperties[i].id == propId){
			if(curModelProperties[i].propertyType == 13 ){
				console.log('selected Property text is ' +curModelProperties[i].defaultValue );
				propText = true;                                            // user select an intersection		- text	
			}else { 
				propNumber = true;											//  property selected is a Number
				}		
			break;
			}
	}
	console.log(" propText is set to " + propText);
}

PhysicalInterfaceUtils.findModifier = function(){
	var modifier;
	for (var i=0; i< curModelProperties.length; i++){
		if(curModelProperties[i].id == propertyId){
			modifier = curModelProperties[i].propertyModifierType;
			return modifier;
		}
	}
	return null;
}



PhysicalInterfaceUtils.verifiedLinePlane = function(line){
	if (plane3DName == "xy"){
		if (line.hasOwnProperty('axis')) {
			if (line.axis == 'x' || line.axis == 'y') {
				return true;
			}
		} else {
			if ((line.geometry.vertices[1].x == gridSize && line.geometry.vertices[0].y != 0) || 
					(line.geometry.vertices[1].y == gridSize && line.geometry.vertices[0].x != 0) ) {
				return true;
			}
		}

	}else if(plane3DName == "yz"){
		if (line.hasOwnProperty('axis')) {
			if (line.axis == 'y' || line.axis == 'z') {
				return true;
			}
		} else {
			if ((line.geometry.vertices[1].y == gridSize && line.geometry.vertices[0].z != 0) ||
					(line.geometry.vertices[1].z == gridSize && line.geometry.vertices[0].y != 0)){
				return true;
			}
		}	
		
	}else if(plane3DName == "xz"){
		if (line.hasOwnProperty('axis')) {
			if (line.axis == 'x' || line.axis == 'z') {
				return true;
			}
		} else {
			if ((line.geometry.vertices[1].x == gridSize && line.geometry.vertices[0].z != 0) ||
					(line.geometry.vertices[1].z == gridSize && line.geometry.vertices[0].x != 0)){
				return true;
			}	
		}
	
	}else {
		console.log("Wrong Plane Name");
		return false;
	}
	return false;
}


PhysicalInterfaceUtils.reset3DVariables = function() {
	
	if (animationFrameId != null) {
		cancelAnimationFrame(animationFrameId);
	}
	
	if (container != null) {
		container.removeEventListener('mousedown', (new DesignPhysicalRenderer()).onViewMouseDown, false);
		container.removeEventListener('mousemove', (new DesignPhysicalRenderer()).onViewMouseMove, false);
		container.removeEventListener('mouseup', (new DesignPhysicalRenderer()).onViewMouseUp, false);
		container.removeEventListener('mousewheel', (new DesignPhysicalRenderer()).onMouseWheel, false); 
		window.removeEventListener('resize', (new DesignPhysicalRenderer()).onWindowResize, false);
	}

	animationFrameId = null;
	
	container = null;
	scene = null;
	camera = null;
	renderer3D = new RenderInterface( new DesignPhysicalRenderer() );
	controls = null;

	rendererX = null;
	rendererY = null;

	grid = null;
	
	plane3d = [0, 0, gridSize];
	plane3DName = "xz";

	raycaster = null;
	mouse = null;

	mouseStatus = 0; // 0 means mouse up, and 1 means mouse down
	action3D = null; // line, cntr, rect, adjust, ...

	lines3d = null; // include all construction lines and xyz axes
	cntrs3d = null;
	
	contourHolder3D= [];
	groupShapes = [];
	lines = [];
	axesIds = [];

	new3dElement = null;
	drawingLineType = null;

	// for selection indicator
	currentIntersected = undefined;
	sphereInter = new THREE.Mesh(new THREE.SphereGeometry(1.5, 1, 1), new THREE.MeshBasicMaterial({color: 0xff0000}));

	// for moving objects
	plane = new THREE.Plane();
	offset = new THREE.Vector3();
	intersection = new THREE.Vector3();
	
}

PhysicalInterfaceUtils.resetCamera = function() {
	gridCamera = [
//					// ALL TEST
//					// x is red
//					// y is green
//					// z is blue
					
					{
					// MAIN VIEWPORT
						cameratype: 'ORTH',
						cameramovable: true,
						viewpoint: "FRONT",

						left: 0,
						bottom: 0,
						width: 1,
						height: 0.8,
						background: new THREE.Color().setRGB( 255,255,255 ),
						eye: [  200, 200, 200 ],
						up: [ 0, 1, 0 ],
						fov: 60,
						near: -200,
						far: 2000,
						updateCamera: function ( camera, scene, mouseX, mouseY ) {
						}
					} 
					
				];
}



PhysicalInterfaceUtils.recreateModelDropdownMenu3D = function() {                                       // List of models should be already displayed
	if (curModels.length >0){
		console.log("Inside == recreateModelDropdownMenu ==");
		var modelMenu = document.getElementById('select_model');
		var input = '<option value="select model">select model...</option>';
		for (var i = 0; i < curModels.length; i++) {
			if (curModels[i].id == curModel) {
				input += '<option selected value="' + curModels[i].name + '">' + curModels[i].name + '</option>';  // highlight the selected Model
			} else {
				input += '<option value="' + curModels[i].name + '">' + curModels[i].name + '</option>';
			}
		}
		modelMenu.innerHTML = input;
		return input;
	}
}

PhysicalInterfaceUtils.animate3D = function() {
	animationFrameId = requestAnimationFrame(PhysicalInterfaceUtils.animate3D);
	PhysicalInterfaceUtils.render();
}

PhysicalInterfaceUtils.render = function() {
	renderer.render(scene, camera);
}
