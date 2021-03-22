function DisplayPhysicalRenderer() {
	
	this.divholderId;
	
	DisplayPhysicalRenderer.gridx = 1;
	DisplayPhysicalRenderer.gridy = 1;
	DisplayPhysicalRenderer.gridz = 1;
	
	/**
	 * Redefine the origin point
	 */
	DisplayPhysicalRenderer.offsetX = 0;
	DisplayPhysicalRenderer.offsetY = 0;
	DisplayPhysicalRenderer.offsetZ = 0;
	
	this.initBase = function( divId ) {
		this.divHolderId = divId;
	};
	
	this.initRenderer = function() {
		
	};
	
	this.initView = function() {

		if (document.getElementById(activeDecos_BODY[this.divHolderId]).style.display != 'block') {
			
			DisplayPhysicalRenderer.defaultCamera = 800;
			DisplayPhysicalRenderer.requestedGrid = "ON";
			DisplayPhysicalRenderer.activeGrid = "ON";
			
			DisplayInterfaceUtils.resetInterface();
			
			this.enablePhysicalView();
			
			if (this.checkInitialValues() == true) {
				
				this.generatePath();
				
				DisplayPhysicalInterfaceUtils.resetCamera();
				
				this.activeToolBar();
				
				this.internal_init();
				
			}
		
		}

	};
	
	this.enablePhysicalView = function() {
		
//		document.getElementById("phy_dspl_view").style.display = "none";
		var physicalDecoBody = document.getElementById(activeDecos_BODY[this.divHolderId]);
		physicalDecoBody.style.display = "block";
			
		if (document.getElementById('phy_dspl_view') == undefined || document.getElementById('phy_dspl_view') == null) {
			var ph3d = document.createElement('div');
			ph3d.id = 'phy_dspl_view';
			ph3d.style.display = 'block';
			physicalDecoBody.appendChild(ph3d);
		}
		
		var physicalDecoLn = document.getElementById(activeDecos_LN[this.divHolderId]);
		physicalDecoLn.style.display = "block";
				
		var physicalDecoTb = document.getElementById(activeDecos_TB[this.divHolderId]);
		physicalDecoTb.style.display = "block";
		
		if (document.getElementById('toolbar_romenext') == undefined || document.getElementById('toolbar_romenext') == null) {
			var toolBar = document.createElement('div');
			toolBar.id = 'toolbar_romenext';
			physicalDecoTb.appendChild(toolBar);
		}
		
	};
	
	this.checkInitialValues = function() {
		
    	if(selectedMetaData == null || NodeSelected == null){
    		console.log("no node selected for the physical display");
    		$('#console-log').append("<p style='color:red'> Missing initial variables( metadata/node selected )</p>");	
    		return false;
    	} else {
    		return true;
    	}
				
	};
	
	this.generatePath = function() {
		var list = '';
		list += "<li><i class='fa fa-home'></i><a href='#'>Home</a><i class='fa fa-angle-right'></i></li>";
		list += "<li><a href='#'>Physical Display</a></li>";
		list += "<li><a href='#'>" + typeMapViaId[listTypeIds[0]].name + "</a></li>";
		var nodeName = null;
		for (var key in nodeMap[NodeSelected].properties) {
			if (nodeMap[NodeSelected].properties[key].name == 'name') {
				nodeName = nodeMap[NodeSelected].properties[key].value;
			}
			
		}
		if (nodeName != null) {
			list += "<li><a href='#'>" + nodeName + "</a></li>";
		} else {
			list += "<li><a href='#'>" + NodeSelected + "</a></li>";
		}
		document.getElementById('path').innerHTML = list;
	};
	
	this.internal_init = function() {

		this.internal_resetView();

		this.internal_activatePhysicalTools();
		
		DisplayPhysicalInterfaceUtils.reset3DVariables();

		container = document.getElementById("phy_dspl_view");

		scene = new THREE.Scene();

		rendererX = window.innerWidth - $(container).offset().left;
		rendererY = window.innerHeight - $(container).offset().top;

		DisplayPhysicalRenderer.activeCamera = "FRONT";
		DisplayPhysicalRenderer.requestedCamera = "FRONT";

		var SCREEN_WIDTH = window.innerWidth;
		var SCREEN_HEIGHT = window.innerHeight;
		var aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

		var frustumSize = 600;
		camera = new THREE.OrthographicCamera( 0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 150, 1000 );

		// default camera position
		camera.position.set( 0, - DisplayPhysicalRenderer.defaultCamera, 0 );
		
		if( DisplayPhysicalRenderer.activeGrid === "ON" ) {
			scenegrid = new THREE.GridHelper(1000, 100);
			scenegrid.name = "ROMEGRID";
			scene.add(scenegrid);	
		}

		renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(rendererX, rendererY);
		container.appendChild(renderer.domElement);

		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		
		lines3d = new THREE.Object3D();
		scene.add(lines3d);

		raycaster = new THREE.Raycaster();
		mouse = new THREE.Vector2();
		raycaster.linePrecision = 3;
		sphereInter.visible = false;
		scene.add(sphereInter);

		var render = function () {
			animationFrameId = requestAnimationFrame(render);
//			renderer.render(scene, camera);
			if (controls != null) {
				controls.update();
			}
			
			DisplayPhysicalRenderer.internal_render();
		};

		// camera.lookAt( scene.position );
		renderer.render( scene, camera );
		render();

		this.addListeners( container );
		
		window.addEventListener('resize', (new DisplayPhysicalInterfaceUtils()).onWindowResize, false);
		
		DisplayPhysicalInterfaceUtils.animate3D();
		
		// TODO: generate the whole object with shapes (shapes data includes axes)
	
	};
	
	this.activeToolBar = function() {
		
		if (NodeSelected == null) {
			console.log("no node selected for the physical display");
			$('#console-log').append("<p style='color:red'> Missing initial variables( metadata/current node )</p>");	
    		return;	
		}

		var inputs = '<div><table  class="toolbar_table"><tr>';
		inputs += '<td id="display_3d_three_front_td"  width="25px" style="display:none"><input id="display_3d_three_front" type="button" style="border:1;visibility:visible;color:green" onclick="( new DisplayPhysicalRenderer() ).internal_front();" value="Front"></td>';
		inputs += '<td id="display_3d_three_back_td"   width="25px" style="display:none"><input id="display_3d_three_back" type="button" style="border:1;visibility:visible;color:" onclick="( new DisplayPhysicalRenderer() ).internal_back();" value="Back"></td>';
		inputs += '<td id="display_3d_three_left_td"   width="25px" style="display:none"><input id="display_3d_three_left" type="button" style="border:1;visibility:visible;color:" onclick="( new DisplayPhysicalRenderer() ).internal_left();" value="Left"></td>';
		inputs += '<td id="display_3d_three_right_td"  width="25px" style="display:none"><input id="display_3d_three_right" type="button" style="border:1;visibility:visible;color:" onclick="( new DisplayPhysicalRenderer() ).internal_right();" value="Right"></td>';
		inputs += '<td id="display_3d_three_top_td"    width="25px" style="display:none"><input id="display_3d_three_top" type="button" style="border:1;visibility:visible;color:" onclick="( new DisplayPhysicalRenderer() ).internal_top();" value="Top"></td>';
		inputs += '<td id="display_3d_three_bottom_td" width="25px" style="display:none"><input id="display_3d_three_bottom" type="button" style="border:1;visibility:visible;color:" onclick="( new DisplayPhysicalRenderer() ).internal_bottom();" value="Bottom"></td>';
		inputs += '<td id="display_3d_three_grid_td"   width="25px" style="display:none"><input id="display_3d_three_grid" type="button" style="border:1;visibility:visible;color:" onclick="( new DisplayPhysicalRenderer() ).internal_grid_toggle();" value="Toggle Grid"></td>';
		inputs += '</tr></table></div>';

		$('#toolbar_romenext').empty();
		document.getElementById('toolbar_romenext').innerHTML = inputs;  

	};
	
	this.internal_activatePhysicalTools = function() {

		document.getElementById("display_3d_three_front_td").style.display = "";
		document.getElementById("display_3d_three_back_td").style.display = "";
		document.getElementById("display_3d_three_left_td").style.display = "";
		document.getElementById("display_3d_three_right_td").style.display = "";
		document.getElementById("display_3d_three_top_td").style.display = "";
		document.getElementById("display_3d_three_bottom_td").style.display = "";
		document.getElementById("display_3d_three_grid_td").style.display = "";
		
	};

	this.internal_resetView = function() {
		document.getElementById("phy_dspl_view").innerHTML = "";
	};
	
	// Will attempt to display the grid 
	this.internal_grid_toggle = function() {
		if( DisplayPhysicalRenderer.requestedGrid === "ON" ) {
			DisplayPhysicalRenderer.requestedGrid = "OFF";
		} else {
			DisplayPhysicalRenderer.requestedGrid = "ON";
		}
	};
	
	this.internal_front = function() {
		DisplayPhysicalRenderer.requestedCamera = "FRONT";
		plane3DName = "xz";
	};

	this.internal_back = function() {
		DisplayPhysicalRenderer.requestedCamera = "BACK";
		plane3DName = "xz";
	};

	this.internal_left = function() {
		DisplayPhysicalRenderer.requestedCamera = "LEFT";
		plane3DName = "yz";
	};

	this.internal_right = function() {
		DisplayPhysicalRenderer.requestedCamera = "RIGHT";
		plane3DName = "yz";
	}

	this.internal_top = function() {
		DisplayPhysicalRenderer.requestedCamera = "TOP";
		plane3DName = "xy";
	};

	this.internal_bottom = function() {
		DisplayPhysicalRenderer.requestedCamera = "BOTTOM";
		plane3DName = "xy";
	};
	
	this.internal_resetAllPlaneButtonColors = function() {

		document.getElementById("display_3d_three_front").style.color = "";
		document.getElementById("display_3d_three_back").style.color = "";
		document.getElementById("display_3d_three_left").style.color = "";
		document.getElementById("display_3d_three_right").style.color = "";
		document.getElementById("display_3d_three_top").style.color = "";
		document.getElementById("display_3d_three_bottom").style.color = "";

	};
	
	this.addListeners = function( cont ) {
		cont.addEventListener('mousedown', this.onViewMouseDown, false);  
		cont.addEventListener('mousemove', this.onViewMouseMove, false);  
		cont.addEventListener('mouseup', this.onViewMouseUp, false);   
		cont.addEventListener('mousewheel', this.onMouseWheel, false); 
	}
	
	/**
	 * Mouse events
	 */

	this.onViewMouseMove = function(event) {
			
	};
		
	this.onViewMouseUp = function(event) {
		
	};

	this.onViewMouseDown = function(event) {
		
	};
	
	this.onMouseWheel = function(event) {
		
	};
	
	this.onWindowResize = function() {
		rendererX = window.innerWidth - $(container).offset().left;
		rendererY = window.innerHeight - $(container).offset().left;
		
		camera.aspect = rendererX / rendererY;
		camera.updateProjectionMatrix();
		renderer.setSize(rendererX, rendererY);
	};
	
};

DisplayPhysicalRenderer.internal_render = function() {

	var switchedCamera = false;

	if( DisplayPhysicalRenderer.activeCamera === DisplayPhysicalRenderer.requestedCamera ) {
		
	} else {
		switchedCamera = true;
		var current = DisplayPhysicalRenderer.defaultCamera;
		( new DisplayPhysicalRenderer() ).internal_resetAllPlaneButtonColors();
		if( DisplayPhysicalRenderer.requestedCamera === "FRONT" ) {
			if (camera != null) {
				camera.position.set( 0, - DisplayPhysicalRenderer.defaultCamera, 0 );
			}
//			camera.position.set( 0, - DisplayPhysicalRenderer.defaultCamera, 0 );
			DisplayPhysicalRenderer.activeCamera = "FRONT";
			document.getElementById('display_3d_three_front').style.color = 'green';
		} else if( DisplayPhysicalRenderer.requestedCamera === "BACK" ) {
			if (camera != null) {
				camera.position.set( 0, DisplayPhysicalRenderer.defaultCamera, 0 );
			}
//			camera.position.set( 0, DisplayPhysicalRenderer.defaultCamera, 0 );
			DisplayPhysicalRenderer.activeCamera = "BACK";
			document.getElementById('display_3d_three_back').style.color = 'green';
		} else if( DisplayPhysicalRenderer.requestedCamera === "LEFT" ) {
			// change camera postition
			if (camera != null) {
				camera.position.set( - DisplayPhysicalRenderer.defaultCamera, 0, 0 );
			}
//			camera.position.set( - DisplayPhysicalRenderer.defaultCamera, 0, 0 );
			DisplayPhysicalRenderer.activeCamera = "LEFT";
			document.getElementById('display_3d_three_left').style.color = 'green';
		} else if( DisplayPhysicalRenderer.requestedCamera === "RIGHT" ) {
			if (camera != null) {
				camera.position.set( DisplayPhysicalRenderer.defaultCamera, 0, 0 );
			}
//			camera.position.set( DisplayPhysicalRenderer.defaultCamera, 0, 0 );

			DisplayPhysicalRenderer.activeCamera = "RIGHT";
			document.getElementById('display_3d_three_right').style.color = 'green';

		} else if( DisplayPhysicalRenderer.requestedCamera === "TOP" ) {
			if (camera != null) {
				camera.position.set( 0, 0, DisplayPhysicalRenderer.defaultCamera );
			}
//			camera.position.set( 0, 0, DisplayPhysicalRenderer.defaultCamera );
			
			DisplayPhysicalRenderer.activeCamera = "TOP";
			document.getElementById('display_3d_three_top').style.color = 'green';

		} else if( DisplayPhysicalRenderer.requestedCamera === "BOTTOM" ) {
			if (camera != null) {
				camera.position.set( 0, 0, - DisplayPhysicalRenderer.defaultCamera );
			}
//			camera.position.set( 0, 0, - DisplayPhysicalRenderer.defaultCamera );

			DisplayPhysicalRenderer.activeCamera = "BOTTOM";
			document.getElementById('display_3d_three_bottom').style.color = 'green';

		} else if( DisplayPhysicalRenderer.requestedCamera === "PERS" ) {

		}

	}
	
	if( DisplayPhysicalRenderer.activeGrid !== DisplayPhysicalRenderer.requestedGrid || switchedCamera ) {
		// we have to make sure the grid is visible
		if( DisplayPhysicalRenderer.requestedGrid === "ON" || switchedCamera ) {
			// if they toggle the grid, do we have to remove the old grid?
			// remove old grid
			
			if (scene != null) {
				scene.remove( scenegrid );
			}
//			scene.remove( scenegrid );
			
			scenegrid = new THREE.GridHelper(1000, 100);
			
			// the normal grid will be put on x plane
			// need to rotate based on what the current camera is
			
			// var gridcolor = 0x990000;
			
			// scenegrid2 = new THREE.GridHelper(1000, 80, 0x888888, gridcolor );
			// scenegrid2.rotation.x = Math.PI / 2;
			// scenegrid2.setColors( new THREE.Color(gridcolor), new THREE.Color(gridcolor) );
			
			if( DisplayPhysicalRenderer.activeCamera === "FRONT" || DisplayPhysicalRenderer.activeCamera === "BACK" ) {
				scenegrid.rotation.x = Math.PI ;
				
			} else if( DisplayPhysicalRenderer.activeCamera === "TOP" || DisplayPhysicalRenderer.activeCamera === "BOTTOM" ) {
				scenegrid.rotation.x = Math.PI / 2;

			} else {
				scenegrid.rotation.z = Math.PI / 2;
			};

			if (scene != null) {
				scene.add(scenegrid);
			};
		} else if( DisplayPhysicalRenderer.requestedGrid === "OFF" ) {
			if (scene != null) {
				scene.remove( scenegrid );
			}

		} 
	
		DisplayPhysicalRenderer.activeGrid = DisplayPhysicalRenderer.requestedGrid;
		
	} else {
		if( DisplayPhysicalRenderer.requestedGrid === "ON" ) {
			// if they toggle the grid, do we have to remove the old grid?
			// remove old grid
			
			if (scene != null) {
				scene.remove( scenegrid );
			}
//			scene.remove( scenegrid );
			
			scenegrid = new THREE.GridHelper(1000, 100);
			
			// the normal grid will be put on x plane
			// need to rotate based on what the current camera is
			
			// var gridcolor = 0x990000;
			
			// scenegrid2 = new THREE.GridHelper(1000, 80, 0x888888, gridcolor );
			// scenegrid2.rotation.x = Math.PI / 2;
			// scenegrid2.setColors( new THREE.Color(gridcolor), new THREE.Color(gridcolor) );
			
			if( DisplayPhysicalRenderer.activeCamera === "FRONT" || DisplayPhysicalRenderer.activeCamera === "BACK" ) {
				scenegrid.rotation.x = Math.PI ;
				
			} else if( DisplayPhysicalRenderer.activeCamera === "TOP" || DisplayPhysicalRenderer.activeCamera === "BOTTOM" ) {
				scenegrid.rotation.x = Math.PI / 2;

			} else {
				scenegrid.rotation.z = Math.PI / 2;
			};

			if (scene != null) {
				scene.add(scenegrid);
			}

		} else if( DisplayPhysicalRenderer.requestedGrid === "OFF" ) {
			if (scene != null) {
				scene.remove( scenegrid );
			}

		} 
					
	}		

};
