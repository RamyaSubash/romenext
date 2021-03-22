// Deprecated
function initPhsical3DView() {
	
	var typeId = findTypeIdByName(curType);
	
	console.log("---------------- metadata : " + selectedMetaData );
	console.log(" --------------- typeid : " + typeId );
	if (selectedMetaData == null || typeId == null) {
		return;
	}
	
	document.getElementById("tdvCy").style.display = "none";
	document.getElementById("pdsv").style.display = "none";
	document.getElementById("pdpv").style.display = "none";
	
	document.getElementById("typeBar").style.display = "none";
	document.getElementById("ruleBar").style.display = "none";
	document.getElementById("grid-models").style.visibility = "hidden";
	
	document.getElementById("pv3d").style.display = "block";
	document.getElementById("pv3d").innerHTML = "";
	
	loadModels();
	create3DPhysicalViewToolBar();  

}
//===============================================================================================
function loadModelShape3D() {
	
	document.getElementById("pv3d").innerHTML = "";
	curModel= getModelIdByName(document.getElementById("select_model").value);
	// TODO: get properties
	getModelShapes(curModel);      
	activatePhysical3DTools();
	reset3DVariables();
	init3D();
	animate3D();
	displayShapes3D(curModelShapes);

}
//===============================================================================================
function saveShape3D(shape3D) {
	if (shape3D.type == "LineSegments") {
		
//		Verify Plane selection done 
		if ((plane3DName != "xy") &&  (plane3DName != "yz")&&(plane3DName != "xz")){
			console.log("Wrong Plane Name");
			return;
		}
//		Build json 
		var jsonData = null, angleValue;		
		 var value = roundNB(shape3D.value );
		if (plane3DName == "xy") {
//			Verify type of Line 
		    if(drawingLineType != 1 && drawingLineType != 3){
		    	console.log("Wrong Line Type");
				return;
		    }
			if (drawingLineType == 1) {
				shape3D.geometry.vertices[0].y +=  value;
				shape3D.geometry.vertices[1].y +=  value;
				angleValue = 0;
			} else if (drawingLineType == 3) {
				shape3D.geometry.vertices[0].x +=  value;
				shape3D.geometry.vertices[1].x +=  value;
				angleValue = 90;
			}	
		};
       if (plane3DName == "yz") {
//			Verify type of Line 
    	   if(drawingLineType != 3 && drawingLineType != 5){
		    	console.log("Wrong Line Type");
				return;
		    }
			if (drawingLineType == 3) {
				shape3D.geometry.vertices[0].z +=  value;
				shape3D.geometry.vertices[1].z +=  value;
				angleValue = 0;
			}else {
				shape3D.geometry.vertices[0].y +=  value;
				shape3D.geometry.vertices[1].y +=  value;
				angleValue = 90;
			}

       };   
       if (plane3DName == "xz") {
//			Verify type of Line 
    	   if(drawingLineType != 1 && drawingLineType != 5){
		    	console.log("Wrong Line Type");
				return;
		    }
			if (drawingLineType == 1) {
				shape3D.geometry.vertices[0].z +=  value;
				shape3D.geometry.vertices[1].z +=  value;
				angleValue = 0;
			}else {
				shape3D.geometry.vertices[0].x += value;
				shape3D.geometry.vertices[1].x += value;
				angleValue = 90;
			}
	};
	
	shape3D.geometry.vertices[0].x = roundNB(shape3D.geometry.vertices[0].x);
	shape3D.geometry.vertices[1].x = roundNB(shape3D.geometry.vertices[1].x);
	shape3D.geometry.vertices[0].y = roundNB(shape3D.geometry.vertices[0].y);
	shape3D.geometry.vertices[1].y = roundNB(shape3D.geometry.vertices[1].y);
	shape3D.geometry.vertices[0].z = roundNB(shape3D.geometry.vertices[0].z);
	shape3D.geometry.vertices[1].z = roundNB(shape3D.geometry.vertices[1].z);
		
	
	shape3D.geometry.verticesNeedUpdate = true;
	
	
	jsonData = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, ';
	jsonData += '"x1":' + shape3D.geometry.vertices[0].x + ', "y1":' + shape3D.geometry.vertices[0].y  + ', "z1":' + shape3D.geometry.vertices[0].z + ', '
	   	 + '"x2":' + shape3D.geometry.vertices[1].x + ', "y2":' + shape3D.geometry.vertices[1].y +  ', "z2":' + shape3D.geometry.vertices[1].z + ', '
		 + '"x3":0.0, "y3":0.0, "z3":0.0, "height":0, "depth":0, "width":0, "angle":'+angleValue+', "parent":' + shape3D.dbParent + ', "shapeType":' + drawingLineType + '}';		
	

  console.log(" build json is "+ jsonData);
  
  
  var successFunction = function( data ) {	
		console.log("Construction Line saved in DB!" + data);	
		$('#console-log').append("<p style='color:blue'>Construction Line saved properly</p>");
		shape3D.position.x = 0;
		shape3D.position.y = 0;
		shape3D.position.z = 0;
		shape3D.dbId = data.id;
		shape3D.shapeType = data.shapeType;
		shape3D.shape = data.shape;
		shape3D.isConstruction = data.isConstruction;
		shape3D.childIds = [];
		shape3D.value = 0;
        shape3D.sn = lines3d.children.length -1;
		addChildLineID(shape3D.dbParent, data.id);
			
		
	};
	
	var failFunction = function( xhr, status, error ) {
		$('#console-log').append("<p style='color:red'>Failed to save the shape"+xhr.status +" </p>");
		console.log('failed to save the shape : '+ xhr.status);
	};
	
//	var apis = new apiRomeNext();
	var apis = new shapeApis();
	
//	apis.saveShape3D(jsonData, successFunction, failFunction );	
	
	apis.addShape3D(jsonData, successFunction, failFunction );	
  
	}	
}
//============================================================================================
function init3D() {
	

	container = document.getElementById("pv3d");
	
	scene = new THREE.Scene();
	
	rendererX = window.innerWidth - $(container).offset().left;
//	rendererY = window.innerHeight - $(container).offset().left;
	rendererY = window.innerHeight - $(container).offset().top;
	
	console.log("rendererX is : "+ rendererX      +  "  rendererY  is  " + rendererY);
	
	
	// camera = new THREE.OrthographicCamera(10, rendererX / rendererY, 1, 10000);
	// camera = new THREE.CombinedCamera( rendererX, rendererY, 70, 1, 1000,     -500, 1000);
	camera = new THREE.PerspectiveCamera(10, rendererX / rendererY, 1, 10000);
	camera.position.set(plane3d[0],plane3d[1], plane3d[2]);
	camera.zoom = cameraDefaultZoomLevel;
//	camera.updateProjectionMatrix();
	
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(rendererX, rendererY);
	container.appendChild(renderer.domElement);
	
	controls = new THREE.OrbitControls(camera, renderer.domElement);
//	controls.enableRotate = false;
	controls.addEventListener('change', render);
	controls.enableDamping = true;
//	scene.add(controls);
	
	lines3d = new THREE.Object3D();
	axesIds = [];
	var tmpAxis1 = new THREE.ArrowHelper(xAxisVertices[0], xAxisVertices[1], gridSize, xAxisColor, axesArrowHeadLength, axesArrowHeadWidth);
	var tmpAxis2 = new THREE.ArrowHelper(yAxisVertices[0], yAxisVertices[1], gridSize, yAxisColor, axesArrowHeadLength, axesArrowHeadWidth);
	tmpAxis1.dbId = horizontalAxisId;
	tmpAxis1.children[0].dbId = horizontalAxisId;
	tmpAxis1.children[1].dbId = horizontalAxisId;
	tmpAxis2.dbId = verticalAxisId;
	tmpAxis2.children[0].dbId = verticalAxisId;
	tmpAxis2.children[1].dbId = verticalAxisId;
	lines3d.add(tmpAxis1);
	lines3d.add(tmpAxis2);
	axesIds.push(tmpAxis1.id);
	axesIds.push(tmpAxis2.id);
	scene.add(lines3d);

	cntrs3d = new THREE.Object3D();
	rects3d = new THREE.Object3D();
	contourHolder3D = [];
		
//	grid = new THREE.GridHelper(gridSize, gridStep);
//	scene.add(grid);
	
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	raycaster.linePrecision = 3;
	sphereInter.visible = false;
	scene.add(sphereInter);
	
//	var render = function () {
//		requestAnimationFrame(render);
//		renderer.render(scene, camera);
//		controls.update();
//	};
//	render();
	
	container.addEventListener('mousedown', onViewMouseDown, false);
	container.addEventListener('mousemove', onViewMouseMove, false);
	container.addEventListener('mouseup', onViewMouseUp, false);
	container.addEventListener('mousewheel', onMouseWheel, false); 
	window.addEventListener('resize', onWindowResize, false);
}
//========================================================================
function animate3D() {
	animationFrameId = requestAnimationFrame(animate3D);
	render();
}
//=======================================================================
function render() {
	renderer.render(scene, camera);
}
//=======================================================================
function onViewMouseDown(event) {
	if (action3D == "line") {
		if (mouseStatus == 0) {
			mouseStatus = 1;
			controls.enabled = false;
			raycaster.setFromCamera(mouse, camera);
			var intersects = raycaster.intersectObjects(lines3d.children, true);
			if (intersects.length > 0) {
				
				for (var i = 0; i < intersects.length; i++) {
					
					if (new3dElement == null) {
						
						if (plane3DName == "xy") {			
							if (intersects[i].object.type == "LineSegments") {
								if (intersects[i].object.geometry.vertices[1].x == gridSize && intersects[i].object.geometry.vertices[0].y != 0) {      //  horizontal line
									new3dElement = drawLine3D(line3dColor, [0, intersects[i].point.y, 0], [gridSize, intersects[i].point.y, 0]);
									drawingLineType = 1;
									new3dElement.shapeType = 1;
								} else if (intersects[i].object.geometry.vertices[1].y == gridSize && intersects[i].object.geometry.vertices[0].x != 0) {
									new3dElement = drawLine3D(line3dColor, [intersects[i].point.x, 0, 0], [intersects[i].point.x, gridSize, 0]);
									drawingLineType = 3;
									new3dElement.shapeType = 3;                            // vertical line
								} else {
									console.log("Wrong Data");
								}
							} else {
								if (intersects[i].point.x != 0) {
									new3dElement = drawLine3D(line3dColor, [0, 0, 0], [gridSize, 0, 0]);
									drawingLineType = 1;
									new3dElement.shapeType = 1;
								} else if (intersects[i].point.y != 0) {
									new3dElement = drawLine3D(line3dColor, [0, 0, 0], [0, gridSize, 0]);
									drawingLineType = 3;
									new3dElement.shapeType = 3; 
								} else {
									console.log("Wrong Parent Line Selected");
								}
							}
							if (new3dElement != null) {
								new3dElement.dbParent = intersects[i].object.dbId;
								scene.add(new3dElement);
								plane.normal.x = 0;
								plane.normal.y = 0;
								plane.normal.z = 1;
								if (raycaster.ray.intersectPlane(plane, intersection)) {
									offset.copy(intersection).sub(new3dElement.position);
								}		
							}
							
						} else if (plane3DName == "yz") {				
							if (intersects[i].object.type == "LineSegments") {
								if (intersects[i].object.geometry.vertices[1].y == gridSize && intersects[i].object.geometry.vertices[0].z != 0) {
									new3dElement = drawLine3D(line3dColor, [0, 0, intersects[i].point.z], [0, gridSize, intersects[i].point.z]);
									drawingLineType = 3;
									new3dElement.shapeType = 3;  
								} else if (intersects[i].object.geometry.vertices[1].z == gridSize && intersects[i].object.geometry.vertices[0].y != 0) {
									new3dElement = drawLine3D(line3dColor, [0, intersects[i].point.y, 0], [0, intersects[i].point.y, gridSize]);
									drawingLineType = 5;
									new3dElement.shapeType = 5;  
								} else {
									console.log("Wrong Data");
								}
							} else {
								if (intersects[i].point.y > 0.01) {
									new3dElement = drawLine3D(line3dColor, [0, 0, 0], [0, gridSize, 0]);
									drawingLineType = 3;
									new3dElement.shapeType = 3;
								} else if (intersects[i].point.z != 0) {
									new3dElement = drawLine3D(line3dColor, [0, 0, 0], [0, 0, gridSize]);
									drawingLineType = 5;
									new3dElement.shapeType = 5;   
								} else {
									console.log("Wrong Parent Line Selected");
								}
							}
							if (new3dElement != null) {
								new3dElement.dbParent = intersects[i].object.dbId;
								scene.add(new3dElement);
								plane.normal.x = 1;
								plane.normal.y = 0;
								plane.normal.z = 0;
								if (raycaster.ray.intersectPlane(plane, intersection)) {
									offset.copy(intersection).sub(new3dElement.position);
								}	
							}
							
						} else if (plane3DName == "xz") {				
							if (intersects[i].object.type == "LineSegments") {
								if (intersects[i].object.geometry.vertices[1].x == gridSize && intersects[i].object.geometry.vertices[0].z != 0) {
									new3dElement = drawLine3D(line3dColor, [0, 0, intersects[i].point.z], [gridSize, 0, intersects[i].point.z]);
									drawingLineType = 1;
									new3dElement.shapeType = 1;
								} else if (intersects[i].object.geometry.vertices[1].z == gridSize && intersects[i].object.geometry.vertices[0].x != 0) {
									new3dElement = drawLine3D(line3dColor, [intersects[i].point.x, 0, 0], [intersects[i].point.x, 0, gridSize]);
									drawingLineType = 5;
									new3dElement.shapeType = 5;  
								} else {
									console.log("Wrong Data");
								}
							} else {
								if (intersects[i].point.x != 0) {
									new3dElement = drawLine3D(line3dColor, [0, 0, 0], [gridSize, 0, 0]);
									drawingLineType = 1;
									new3dElement.shapeType = 1;
								} else if (intersects[i].point.z != 0) {
									new3dElement = drawLine3D(line3dColor, [0, 0, 0], [0, 0, gridSize]);
									drawingLineType = 5;
									new3dElement.shapeType = 5;  
								} else {
									console.log("Wrong Parent Line Selected");
								}
							}
							if (new3dElement != null) {
								new3dElement.dbParent = intersects[i].object.dbId;
								scene.add(new3dElement);
								plane.normal.x = 0;
								plane.normal.y = 1;
								plane.normal.z = 0;
								if (raycaster.ray.intersectPlane(plane, intersection)) {
									offset.copy(intersection).sub(new3dElement.position);
								}
							}
							
						} else {
							console.log("Wrong Plane Name");
						}
						
					}
					
				}
				
			}

			}
		}else if(action3D == "cntr") {                    
			                                 drawingACntr();
                         // ensure there are already construction lines drawn
					
			}else {
			controls.enabled = true;
		}
}

//========================================================================================================

function onViewMouseMove(event) {
			
	rendererX = window.innerWidth - $(container).offset().left;
//	rendererY = window.innerHeight - $(container).offset().left;
	rendererY = window.innerHeight - $(container).offset().top;

	event.preventDefault();
//	console.log(" value of event.pageX  : "+ event.pageX + " value of container.offsetleft"+ $(container).offset().left);
	mouse.x = ((event.pageX-$(container).offset().left)  / (rendererX)) * 2 - 1;
	mouse.y = -((event.pageY-$(container).offset().top+10) / (rendererY)) * 2 + 1;

	
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(lines3d.children, true);
	
	if (action3D == "line") {
		if (mouseStatus == 1 && new3dElement != null) {
			
			
			if (plane3DName == "xy") {
				
				if (drawingLineType == 1) {  // parallel to x
					
					plane.normal.x = 0;
					plane.normal.y = 0;
					plane.normal.z = 1;
					if (raycaster.ray.intersectPlane(plane, intersection)) {
						new3dElement.position.copy(intersection.sub(offset));
					}
					new3dElement.position.x = 0;
					new3dElement.value = new3dElement.position.y;
					
				} else if (drawingLineType == 3) {    // parallel to y

					plane.normal.x = 0;
					plane.normal.y = 0;
					plane.normal.z = 1;
					if (raycaster.ray.intersectPlane(plane, intersection)) {
						new3dElement.position.copy(intersection.sub(offset));
					}
					new3dElement.position.y = 0;
					new3dElement.value = new3dElement.position.x;
					
				} else {
					console.log("Wrong Line Type");
				}
				
			} else if (plane3DName == "yz") {
				
				if (drawingLineType == 3) {

					plane.normal.x = 1;
					plane.normal.y = 0;
					plane.normal.z = 0;
					if (raycaster.ray.intersectPlane(plane, intersection)) {
						new3dElement.position.copy(intersection.sub(offset));
					}
					new3dElement.position.y = 0;
					new3dElement.value = new3dElement.position.z;
					
				} else if (drawingLineType == 5) {

					plane.normal.x = 1;
					plane.normal.y = 0;
					plane.normal.z = 0;
					if (raycaster.ray.intersectPlane(plane, intersection)) {
						new3dElement.position.copy(intersection.sub(offset));
					}
					new3dElement.position.z = 0;
					new3dElement.value = new3dElement.position.y;
					
				} else {
					console.log("Wrong Line Type");
				}
				
			} else if (plane3DName == "xz") {
				
				if (drawingLineType == 1) {
					
					plane.normal.x = 0;
					plane.normal.y = 1;
					plane.normal.z = 0;
					if (raycaster.ray.intersectPlane(plane, intersection)) {
						new3dElement.position.copy(intersection.sub(offset));
					}
					new3dElement.position.x = 0;
					new3dElement.value = new3dElement.position.z;
					
				} else if (drawingLineType == 5) {

					plane.normal.x = 0;
					plane.normal.y = 1;
					plane.normal.z = 0;
					if (raycaster.ray.intersectPlane(plane, intersection)) {
						new3dElement.position.copy(intersection.sub(offset));
					}
					new3dElement.position.z = 0;
					new3dElement.value = new3dElement.position.x;
					
				} else {
					console.log("Wrong Line Type");
				}
				
			} else {
				console.log("Wrong Plane Name");
			}
			
		} else {
			showSelectionIndicator(intersects);
		}
		
	} else if (action3D == "cntr") {
		showSelectionIndicator(intersects);
	} else {
		if (controls.enabled == true) {
			controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
		}
		showSelectionIndicator(intersects);
	}
	
}

function onViewMouseUp(event) {
	mouseStatus = 0;
	if (action3D == "line") {
		if (new3dElement != null) {
			lines3d.add(new3dElement);
			
			// save 3d object
			saveShape3D(new3dElement);
		}
		
		// reset variables
		new3dElement = null;
		drawingLineType = null;
		plane = new THREE.Plane();
		offset = new THREE.Vector3();
		intersection = new THREE.Vector3();
	}else if(action3D == "cntr"){
		
//		if (selectedLine.length == 3 && selectedElementInters.length == 2) {
//			var contourNew = setContour3D("blue", selectedElementInters, selectedLine[1]);
//			addCountour3D(contourNew, plane3DName);		
//			updateContourHolder3D(contourNew)
//			selectedLine.shift();
//			selectedElementInters.shift();
//		}	
		
	
	}else if(action3D == "rect"){
		
	}
	
}

function onWindowResize() {
	rendererX = window.innerWidth - $(container).offset().left;
	rendererY = window.innerHeight - $(container).offset().left;
	
	camera.aspect = rendererX / rendererY;
	camera.updateProjectionMatrix();
	renderer.setSize(rendererX, rendererY);
}

function onMouseWheel(event) {
	
//    var wheelDelta = event.wheelDelta;
//    if (wheelDelta > 0){
//    	camera.zoom = camera.zoom * 1.1;
//    }
//    else {
//    	camera.zoom = camera.zoom * 0.9;
//    }
//    camera.updateProjectionMatrix();
	
}

function switch3DPlane(plane) {
	
	if (plane == "xy") {
		plane3d = [0, 0, gridSize];
		camera.position.set(plane3d[0],plane3d[1], plane3d[2]);
		camera.zoom = cameraDefaultZoomLevel;
//		camera.updateProjectionMatrix();
		controls.update();
		document.getElementById("xy_3d_plane").style.color = activePlaneButtonColor;
		document.getElementById("yz_3d_plane").style.color = "";
		document.getElementById("xz_3d_plane").style.color = "";
		plane3DName = "xy";
		
		lines3d.remove(scene.getObjectById(axesIds[0], true ));
		lines3d.remove(scene.getObjectById(axesIds[1], true ));
		axesIds = [];
		var tmpAxis1 = new THREE.ArrowHelper(xAxisVertices[0], xAxisVertices[1], 200, xAxisColor, axesArrowHeadLength, axesArrowHeadWidth);
		var tmpAxis2 = new THREE.ArrowHelper(yAxisVertices[0], yAxisVertices[1], 200, yAxisColor, axesArrowHeadLength, axesArrowHeadWidth);
		tmpAxis1.dbId = horizontalAxisId;
		tmpAxis1.children[0].dbId = horizontalAxisId;
		tmpAxis1.children[1].dbId = horizontalAxisId;
		tmpAxis2.dbId = verticalAxisId;
		tmpAxis2.children[0].dbId = verticalAxisId;
		tmpAxis2.children[1].dbId = verticalAxisId;
		lines3d.add(tmpAxis1);
		lines3d.add(tmpAxis2);
		axesIds.push(tmpAxis1.id);
		axesIds.push(tmpAxis2.id);
		scene.remove(lines3d);
		scene.add(lines3d);

	} else if (plane == "yz") {
		plane3d = [gridSize, 0, 0];
		camera.position.set(plane3d[0],plane3d[1], plane3d[2]);
		camera.zoom = cameraDefaultZoomLevel;
//		camera.updateProjectionMatrix();
		controls.update();
		document.getElementById("xy_3d_plane").style.color = "";
		document.getElementById("yz_3d_plane").style.color = activePlaneButtonColor;
		document.getElementById("xz_3d_plane").style.color = "";
		plane3DName = "yz";
		
		lines3d.remove(scene.getObjectById(axesIds[0], true ));
		lines3d.remove(scene.getObjectById(axesIds[1], true ));
		axesIds = [];
		var tmpAxis1 = new THREE.ArrowHelper(yAxisVertices[0], yAxisVertices[1], 200, yAxisColor, axesArrowHeadLength, axesArrowHeadWidth);
		var tmpAxis2 = new THREE.ArrowHelper(zAxisVertices[0], zAxisVertices[1], 200, zAxisColor, axesArrowHeadLength, axesArrowHeadWidth);
		tmpAxis1.dbId = horizontalAxisId;
		tmpAxis1.children[0].dbId = horizontalAxisId;
		tmpAxis1.children[1].dbId = horizontalAxisId;
		tmpAxis2.dbId = verticalAxisId;
		tmpAxis2.children[0].dbId = verticalAxisId;
		tmpAxis2.children[1].dbId = verticalAxisId;
		lines3d.add(tmpAxis1);
		lines3d.add(tmpAxis2);
		axesIds.push(tmpAxis1.id);
		axesIds.push(tmpAxis2.id);
		scene.remove(lines3d);
		scene.add(lines3d);
		
	} else if (plane == "xz") {
		plane3d = [0, gridSize, 0];
		camera.position.set(plane3d[0],plane3d[1], plane3d[2]);
		camera.zoom = cameraDefaultZoomLevel;
//		camera.updateProjectionMatrix();
		controls.update();
		document.getElementById("xy_3d_plane").style.color = "";
		document.getElementById("yz_3d_plane").style.color = "";
		document.getElementById("xz_3d_plane").style.color = activePlaneButtonColor;
		plane3DName = "xz";
		
		lines3d.remove(scene.getObjectById(axesIds[0], true ));
		lines3d.remove(scene.getObjectById(axesIds[1], true ));
		axesIds = [];
		var tmpAxis1 = new THREE.ArrowHelper(xAxisVertices[0], xAxisVertices[1], 200, xAxisColor, axesArrowHeadLength, axesArrowHeadWidth);
		var tmpAxis2 = new THREE.ArrowHelper(zAxisVertices[0], zAxisVertices[1], 200, zAxisColor, axesArrowHeadLength, axesArrowHeadWidth);
		tmpAxis1.dbId = horizontalAxisId;
		tmpAxis1.children[0].dbId = horizontalAxisId;
		tmpAxis1.children[1].dbId = horizontalAxisId;
		tmpAxis2.dbId = verticalAxisId;
		tmpAxis2.children[0].dbId = verticalAxisId;
		tmpAxis2.children[1].dbId = verticalAxisId;
		lines3d.add(tmpAxis1);
		lines3d.add(tmpAxis2);
		axesIds.push(tmpAxis1.id);
		axesIds.push(tmpAxis2.id);
		scene.remove(lines3d);
		scene.add(lines3d);
		
	} else {
		console.log("Wrong Plane name");
	}
	
}

function reset3DVariables() {
	
	if (animationFrameId != null) {
		cancelAnimationFrame(animationFrameId);
	}
	
	if (container != null) {
		container.removeEventListener('mousedown', onViewMouseDown, false);
		container.removeEventListener('mousemove', onViewMouseMove, false);
		container.removeEventListener('mouseup', onViewMouseUp, false);
		container.removeEventListener('mousewheel', onMouseWheel, false); 
		window.removeEventListener('resize', onWindowResize, false);
	}

	animationFrameId = null;
	
	container = null;
	scene = null;
	camera = null;
	renderer3D = new RenderInterface( new ThreeRenderer() );
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
	rects3d = null;
	contourHolder3D= [];
	groupShapes = [];
	lines = [];
	axesIds = [];

	new3dElement = null;
	drawingLineType = null;

	// for selection indicator
	currentIntersected = undefined;
	sphereInter = new THREE.Mesh(new THREE.SphereGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0xff0000}));

	// for moving objects
	plane = new THREE.Plane();
	offset = new THREE.Vector3();
	intersection = new THREE.Vector3();
	
}






