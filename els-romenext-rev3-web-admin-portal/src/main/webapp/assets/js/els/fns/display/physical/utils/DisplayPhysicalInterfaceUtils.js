function DisplayPhysicalInterfaceUtils() {
	
}

DisplayPhysicalInterfaceUtils.reset3DVariables = function() {
	
	if (animationFrameId != null) {
		cancelAnimationFrame(animationFrameId);
	}
	
	if (container != null) {
		container.removeEventListener('mousedown', (new DisplayPhysicalRenderer()).onViewMouseDown, false);
		container.removeEventListener('mousemove', (new DisplayPhysicalRenderer()).onViewMouseMove, false);
		container.removeEventListener('mouseup', (new DisplayPhysicalRenderer()).onViewMouseUp, false);
		container.removeEventListener('mousewheel', (new DisplayPhysicalRenderer()).onMouseWheel, false); 
		window.removeEventListener('resize', (new DisplayPhysicalRenderer()).onWindowResize, false);
	}

	animationFrameId = null;
	
	container = null;
	scene = null;
	scenegrid = null;
	camera = null;
	renderer3D = new DisplayPhysicalRenderInterface( new DisplayPhysicalRenderer() );
	controls = null;

	rendererX = null;
	rendererY = null;

	
	plane3d = [0, 0, gridSize];
	plane3DName = "xz";

	raycaster = null;
	mouse = null;

	mouseStatus = 0; // 0 means mouse up, and 1 means mouse down

	// for selection indicator
	currentIntersected = undefined;
	sphereInter = new THREE.Mesh(new THREE.SphereGeometry(1.5, 1, 1), new THREE.MeshBasicMaterial({color: 0xff0000}));

	// for moving objects
	plane = new THREE.Plane();
	offset = new THREE.Vector3();
	intersection = new THREE.Vector3();
	
	lines3d = null;
	
}

DisplayPhysicalInterfaceUtils.resetCamera = function() {
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
};

DisplayPhysicalInterfaceUtils.animate3D = function() {
	animationFrameId = requestAnimationFrame(DisplayPhysicalInterfaceUtils.animate3D);
	DisplayPhysicalInterfaceUtils.render();
};

DisplayPhysicalInterfaceUtils.render = function() {
	renderer.render(scene, camera);
};
