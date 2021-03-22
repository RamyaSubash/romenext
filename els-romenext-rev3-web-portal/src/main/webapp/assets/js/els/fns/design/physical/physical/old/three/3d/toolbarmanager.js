//function toolbarManager() {
//	
//	this.createToolBar = function() {
//		this.create3DPhysicalView();
//	};
//	
//	this.create3DPhysicalView = function() {
//		 var inputs ='';
//		 inputs = '<div><table  class="toolbar_table"><tr>';
//		 inputs += '<td width="50px" onclick="showAddModel3DDialog()"><img title="Add Model" src="/webgui/assets/img/icons/add.png"></td>';
//		 if (curModels.length > 0) {
//			inputs += '<td width="50px">' + this.createModelDropDownMenu() + '</td><td width="50px"></td>';
//			 
//			inputs += '<td id="xy_3d_plane_td" width="25px" style="display:none"><input id="xy_3d_plane" type="button" style="border:1;visibility:visible;color:rgb(0, 255, 0)" onclick="switch3DPlane(this.value)" value="xxy"></td>';
//		 	inputs += '<td id="yz_3d_plane_td" width="25px" style="display:none"><input id="yz_3d_plane" type="button" style="border:1;visibility:visible;color:" onclick="switch3DPlane(this.value)" value="yyz"></td>';
//		 	inputs += '<td id="xz_3d_plane_td" width="25px" style="display:none"><input id="xz_3d_plane" type="button" style="border:1;visibility:visible;color:" onclick="switch3DPlane(this.value)" value="xxz"></td>';	 	 
//			 
//		 	inputs += '<td id="design_3d_flip_td" width="25px" style="display:none"><input id="design_3d_flip" type="button" style="border:1;visibility:visible;color:" onclick="switch3DPlane(this.value)" value="Flip Xzz"></td>';	 	 
//		 	inputs += '<td id="design_3d_flip1_td" width="25px" style="display:none"><input id="design_3d_flip1" type="button" style="border:1;visibility:visible;color:" onclick="( new toolbarManager() ).changePersCamera();" value="Flip Pers"></td>';
//		 	inputs += '<td id="design_3d_flip2_td" width="25px" style="display:none"><input id="design_3d_flip2" type="button" style="border:1;visibility:visible;color:" onclick="( new toolbarManager() ).changeOrthCamera();" value="Flip Orth"></td>';
//		 	
//		 	 
//		 	 inputs += '<td id="draw_line_td"  width="50px" onclick="toDrawGrid3D()"    style="display:none"><img id="img_grid" title="Construction Line" src="/webgui/assets/img/icons/grid.png"></td>';
//		 	 inputs += '<td id="draw_cntr_td"  width="50px" onclick="toDrawContour3D()" style="display:none"><img id="img_cntr" title="Contour" src="/webgui/assets/img/icons/cntr.png"></td>';
//		 } 
//		 inputs += '</tr></table></div>';
//		 
//		 $('#toolbar_romenext').empty();
//		 document.getElementById('toolbar_romenext').innerHTML = inputs;  
//	}
//	
//	this.createModelDropDownMenu = function() {
//		var input = "";
//		input += '<select id="select_model" onchange="( new toolbarManager() ).loadModelShapes3D()"><option value="select model">select model Redux...</option>';
//		for (var i = 0; i < curModels.length; i++) {
//			input += '<option value="' + curModels[i].name + '">' + curModels[i].name + '</option>';
//		}
//		input += '</select>';
//		return input;
//	};
//	
//	this.activatePhysicalTools = function() {
//		document.getElementById("xy_3d_plane_td").style.display = "";
//		document.getElementById("yz_3d_plane_td").style.display = "";
//		document.getElementById("xz_3d_plane_td").style.display = "";
//		
//		document.getElementById("design_3d_flip_td").style.display = "";
//		document.getElementById("design_3d_flip1_td").style.display = "";
//		document.getElementById("design_3d_flip2_td").style.display = "";
//
//		document.getElementById("draw_line_td").style.display = "";
//		document.getElementById("draw_cntr_td").style.display = "";
//	};
//	
//	this.loadModelShapes3D = function() {
//		console.log("Entered redux loadmodel shape 3d");
//		
//		// pv3d = the full physical view 3d
//		document.getElementById("pv3d").innerHTML = "";
//		
//		// note getModelIdbyName is from fns-model.js
//		curModel= getModelIdByName(document.getElementById("select_model").value);
//		
//		// TODO: get properties
//		// getModelShapes(curModel);
//		// get from model manager instead
//		loadModelShapes( curModel );
//		
//		this.activatePhysicalTools();
//		// _activatePhysical3DTools();
//		
//		reset3DVariables();
//		
//		this.init();
//		// _initModel3D();
//		
//		animate3D();
//		
//		displayShapes3D(curModelShapes);
//	};
//	
//	this.changePersCamera = function() {
//		camera = new THREE.PerspectiveCamera(10, rendererX / rendererY, 1, 10000);
//	};
//	
//	this.changeOrthCamera = function() {
//		camera = new THREE.OrthographicCamera(10, rendererX / rendererY, 1, 10000);
//	};
//	
//	this.init = function() {
//		container = document.getElementById("pv3d");
//		
//		scene = new THREE.Scene();
//		
//		rendererX = window.innerWidth - $(container).offset().left;
//		rendererY = window.innerHeight - $(container).offset().top;
//		
//		// camera = new THREE.OrthographicCamera(10, rendererX / rendererY, 1, 10000);
//		// camera = new THREE.CombinedCamera( rendererX, rendererY, 70, 1, 1000,     -500, 1000);
//		camera = new THREE.PerspectiveCamera(10, rendererX / rendererY, 1, 10000);
//		camera.position.set(plane3d[0],plane3d[1], plane3d[2]);
//		// x y z
//		// camera.position.set(0,0, 1000 );
//		camera.zoom = 1;
////		camera.updateProjectionMatrix();
//		
//		// camera.toFrontView();
//
//		
//		
//		var grid = new THREE.GridHelper(1000, 100);
//		scene.add(grid);
//		
//		
//		
//		renderer = new THREE.WebGLRenderer({antialias: true});
//		renderer.setPixelRatio(window.devicePixelRatio);
//		renderer.setSize(rendererX, rendererY);
//		container.appendChild(renderer.domElement);
//		
//		controls = new THREE.OrbitControls(camera, renderer.domElement);
////		controls.enableRotate = false;
//		controls.addEventListener('change', render);
//		controls.enableDamping = true;
////		scene.add(controls);
//		
//		lines3d = new THREE.Object3D();
//		axesIds = [];
//		var tmpAxis1 = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), gridSize, "rgb(255, 0, 0)", 0.5, 0.5);
//		var tmpAxis2 = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), gridSize, "rgb(0, 255, 0)", 0.5, 0.5);
//		tmpAxis1.dbId = horizontalAxisId;
//		tmpAxis1.children[0].dbId = horizontalAxisId;
//		tmpAxis1.children[1].dbId = horizontalAxisId;
//		tmpAxis2.dbId = verticalAxisId;
//		tmpAxis2.children[0].dbId = verticalAxisId;
//		tmpAxis2.children[1].dbId = verticalAxisId;
//		lines3d.add(tmpAxis1);
//		lines3d.add(tmpAxis2);
//		axesIds.push(tmpAxis1.id);
//		axesIds.push(tmpAxis2.id);
//		scene.add(lines3d);
//
//		cntrs3d = new THREE.Object3D();
//		
//			
////		grid = new THREE.GridHelper(gridSize, gridStep);
////		scene.add(grid);
//		
//		raycaster = new THREE.Raycaster();
//		mouse = new THREE.Vector2();
//		raycaster.linePrecision = 3;
//		sphereInter.visible = false;
//		scene.add(sphereInter);
//		
////		var render = function () {
////			requestAnimationFrame(render);
////			renderer.render(scene, camera);
////			controls.update();
////		};
////		render();
//		
//		container.addEventListener('mousedown', onViewMouseDown, false);
//		container.addEventListener('mousemove', onViewMouseMove, false);
//		container.addEventListener('mouseup', onViewMouseUp, false);
//		container.addEventListener('mousewheel', onMouseWheel, false); 
//		window.addEventListener('resize', onWindowResize, false);
//	}
//}
//
////function _createToolbar() {
////	_create3DPhysicalView();
////}
////
////function _create3DPhysicalView() {
////	
////    var inputs ='';
////	 inputs = '<div><table  class="toolbar_table"><tr>';
////	 inputs += '<td width="50px" onclick="showAddModel3DDialog()"><img title="Add Model" src="/webgui/assets/img/icons/add.png"></td>';
////	 if (curModels.length > 0) {
////		 inputs += '<td width="50px">' + _createModelDropdownMenu3D() + '</td><td width="50px"></td>';
////		 
////		 inputs += '<td id="xy_3d_plane_td" width="25px" style="display:none"><input id="xy_3d_plane" type="button" style="border:1;visibility:visible;color:rgb(0, 255, 0)" onclick="switch3DPlane(this.value)" value="xxy"></td>';
////	 	 inputs += '<td id="yz_3d_plane_td" width="25px" style="display:none"><input id="yz_3d_plane" type="button" style="border:1;visibility:visible;color:" onclick="switch3DPlane(this.value)" value="yyz"></td>';
////	 	 inputs += '<td id="xz_3d_plane_td" width="25px" style="display:none"><input id="xz_3d_plane" type="button" style="border:1;visibility:visible;color:" onclick="switch3DPlane(this.value)" value="xxz"></td>';	 	 
////		 
////	 	 inputs += '<td id="design_3d_flip_td" width="25px" style="display:none"><input id="design_3d_flip" type="button" style="border:1;visibility:visible;color:" onclick="switch3DPlane(this.value)" value="Flip Xzz"></td>';	 	 
////
////	 	 
////	 	 inputs += '<td id="draw_line_td" width="50px" onclick="toDrawGrid3D()" style="display:none"><img id="img_grid" title="Construction Line" src="/webgui/assets/img/icons/grid.png"></td>';
////	 } 
////	 inputs += '</tr></table></div>';
////	 
////	 $('#toolbar_romenext').empty();
////	 document.getElementById('toolbar_romenext').innerHTML = inputs;  
////}
////
////
////function _createModelDropdownMenu3D() {
////	var input = "";
////	input += '<select id="select_model" onchange="_loadModelShape3D()"><option value="select model">select model Redux...</option>';
////	for (var i = 0; i < curModels.length; i++) {
////		input += '<option value="' + curModels[i].name + '">' + curModels[i].name + '</option>';
////	}
////	input += '</select>';
////	return input;
////}
////
////function _activatePhysical3DTools() {
////	document.getElementById("xy_3d_plane_td").style.display = "";
////	document.getElementById("yz_3d_plane_td").style.display = "";
////	document.getElementById("xz_3d_plane_td").style.display = "";
////	
////	document.getElementById("design_3d_flip_td").style.display = "";
////
////	document.getElementById("draw_line_td").style.display = "";
////}
//
////function _loadModelShape3D() {
////	
////	console.log("Entered redux loadmodel shape 3d");
////	document.getElementById("pv3d").innerHTML = "";
////	
////	curModel= getModelIdByName(document.getElementById("select_model").value);
////	
////	// TODO: get properties
////	// getModelShapes(curModel);
////	// get from model manager instead
////	loadModelShapes( curModel );
////	
////	
////	_activatePhysical3DTools();
////	
////	reset3DVariables();
////	
////	_initModel3D();
////	animate3D();
////	
////	displayShapes3D(curModelShapes);
////
////}
////
////
////function _initModel3D() {
////	
////	
////	
////	
////	
////	
////	
////	
////	
////	container = document.getElementById("pv3d");
////	
////	scene = new THREE.Scene();
////	
////	rendererX = window.innerWidth - $(container).offset().left;
////	rendererY = window.innerHeight - $(container).offset().left;
////	
////	// camera = new THREE.OrthographicCamera(10, rendererX / rendererY, 1, 10000);
////	camera = new THREE.CombinedCamera( rendererX, rendererY, 70, 1, 1000,     -500, 1000);
////	// camera = new THREE.PerspectiveCamera(10, rendererX / rendererY, 1, 10000);
////	camera.position.set(plane3d[0],plane3d[1], plane3d[2]);
////	camera.zoom = 1;
//////	camera.updateProjectionMatrix();
////	
////	camera.toFrontView();
////
////	
////	
////	
////	renderer = new THREE.WebGLRenderer({antialias: true});
////	renderer.setPixelRatio(window.devicePixelRatio);
////	renderer.setSize(rendererX, rendererY);
////	container.appendChild(renderer.domElement);
////	
////	controls = new THREE.OrbitControls(camera, renderer.domElement);
//////	controls.enableRotate = false;
////	controls.addEventListener('change', render);
////	controls.enableDamping = true;
//////	scene.add(controls);
////	
////	lines3d = new THREE.Object3D();
////	axesIds = [];
////	var tmpAxis1 = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), gridSize, "rgb(255, 0, 0)", 0.5, 0.5);
////	var tmpAxis2 = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), gridSize, "rgb(0, 255, 0)", 0.5, 0.5);
////	tmpAxis1.dbId = horizontalAxisId;
////	tmpAxis1.children[0].dbId = horizontalAxisId;
////	tmpAxis1.children[1].dbId = horizontalAxisId;
////	tmpAxis2.dbId = verticalAxisId;
////	tmpAxis2.children[0].dbId = verticalAxisId;
////	tmpAxis2.children[1].dbId = verticalAxisId;
////	lines3d.add(tmpAxis1);
////	lines3d.add(tmpAxis2);
////	axesIds.push(tmpAxis1.id);
////	axesIds.push(tmpAxis2.id);
////	scene.add(lines3d);
////
////	cntrs3d = new THREE.Object3D();
/////		
//////	grid = new THREE.GridHelper(gridSize, gridStep);
//////	scene.add(grid);
////	
////	raycaster = new THREE.Raycaster();
////	mouse = new THREE.Vector2();
////	raycaster.linePrecision = 3;
////	sphereInter.visible = false;
////	scene.add(sphereInter);
////	
//////	var render = function () {
//////		requestAnimationFrame(render);
//////		renderer.render(scene, camera);
//////		controls.update();
//////	};
//////	render();
////	
////	container.addEventListener('mousedown', onViewMouseDown, false);
////	container.addEventListener('mousemove', onViewMouseMove, false);
////	container.addEventListener('mouseup', onViewMouseUp, false);
////	container.addEventListener('mousewheel', onMouseWheel, false); 
////	window.addEventListener('resize', onWindowResize, false);
////}
