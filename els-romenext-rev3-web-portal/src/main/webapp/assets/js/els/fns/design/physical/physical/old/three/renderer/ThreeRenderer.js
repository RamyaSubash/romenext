function ThreeRenderer() {

	ThreeRenderer.gridx = 1;
	ThreeRenderer.gridy = 1;
	ThreeRenderer.gridz = 1;
	
	/**
	 * Redefine the origin point
	 */
	ThreeRenderer.offsetX = 0;
	ThreeRenderer.offsetY = 0;
	ThreeRenderer.offsetZ = 0;
	
	

	this.initView = function() {
		// load all needed data
		// initialize the 3d view
		// generate the view

		ThreeRenderer.defaultCamera = 800;
		ThreeRenderer.requestedGrid = "ON";
		ThreeRenderer.activeGrid = "ON";
		
		this.checkInitialValues();
		
		DesignInterfaceUtils.resetInterface();

		this.enablePhysicalView();
			
		PhysicalInterfaceUtils.resetCamera();
		
		var modelManager = new RomeModelManager();		
		GlobalUtils.loadAllModels();
		
		this.activeToolbar();

	};
	
//	Setting initial physical view Container 	
    this.enablePhysicalView = function(){
    	document.getElementById("pv3d").style.display = "block"; 	
    	this.internal_resetView();
    }
    
//  verifying that a type is selected and a metadata 
    this.checkInitialValues = function(){     	
    	if(selectedMetaData == null || listTypeIds.length == 0  || typeMapViaId.length == 0){
    		console.log(" no type selected for the physical design");
    		$('#console-log').append("<p style='color:red'> Missing initial variables( metadata/current Type)</p>");	
    		return;
    	}
    	
    }

    
	this.activeToolbar = function() {
		if(listTypeIds.length == 0){
			console.log(" no type selected for the physical design");
			$('#console-log').append("<p style='color:red'> Missing initial variables( metadata/current Type)</p>");	
    		return;			
		}
		var inputs ='';
		inputs = '<div><table  class="toolbar_table"><tr>';
		inputs += '<td width="50px" onclick="( new ThreeRenderer() ).internal_showAddModel3DDialog()"><img title="Add Model" src="/webgui/assets/img/icons/add.png"></td>';

		if (curModels.length > 0) {

			inputs += '<td width="50px">';

			inputs += '<select id="select_model" onchange="( new ThreeRenderer() ).internal_loadModelShapes()"><option value="select model">select model Redux...</option>';
			for (var i = 0; i < curModels.length; i++) {
				inputs += '<option value="' + curModels[i].name + '">' + curModels[i].name + '</option>';
			}
			inputs += '</select>';

			inputs += '</td><td width="50px"></td>';

			inputs += '<td id="design_3d_three_front_td"  width="25px" style="display:none"><input id="design_3d_three_front" type="button" style="border:1;visibility:visible;color:green" onclick="( new ThreeRenderer() ).internal_front();" value="Front"></td>';
			inputs += '<td id="design_3d_three_back_td"   width="25px" style="display:none"><input id="design_3d_three_back" type="button" style="border:1;visibility:visible;color:" onclick="( new ThreeRenderer() ).internal_back();" value="Back"></td>';
			inputs += '<td id="design_3d_three_left_td"   width="25px" style="display:none"><input id="design_3d_three_left" type="button" style="border:1;visibility:visible;color:" onclick="( new ThreeRenderer() ).internal_left();" value="Left"></td>';
			inputs += '<td id="design_3d_three_right_td"  width="25px" style="display:none"><input id="design_3d_three_right" type="button" style="border:1;visibility:visible;color:" onclick="( new ThreeRenderer() ).internal_right();" value="Right"></td>';
			inputs += '<td id="design_3d_three_top_td"    width="25px" style="display:none"><input id="design_3d_three_top" type="button" style="border:1;visibility:visible;color:" onclick="( new ThreeRenderer() ).internal_top();" value="Top"></td>';
			inputs += '<td id="design_3d_three_bottom_td" width="25px" style="display:none"><input id="design_3d_three_bottom" type="button" style="border:1;visibility:visible;color:" onclick="( new ThreeRenderer() ).internal_bottom();" value="Bottom"></td>';
			inputs += '<td id="design_3d_three_grid_td"   width="25px" style="display:none"><input id="design_3d_three_grid" type="button" style="border:1;visibility:visible;color:" onclick="( new ThreeRenderer() ).internal_grid_toggle();" value="Toggle Grid"></td>';

			inputs += '<td id="draw_line_td"    width="50px" style="display:none"   onclick="toDrawGrid3D()" ><img id="img_grid" title="Construction Line" src="/webgui/assets/img/icons/grid.png"></td>';
			inputs += '<td id="draw_cntr_td"    width="50px" style="display:none"   onclick="toDrawContour3D()"><img id="img_cntr" title="Contour"        src="/webgui/assets/img/icons/cntr.png"></td>';
			inputs += '<td id="show_hide-Const" width="50px" style="display:none"   onclick="toShowHideConst3D(true)"><img id="img_eye"  title="Hide/Show Construction Lines" src="/webgui/assets/img/icons/hide.png"></td>';
			inputs += '<td id="draw_ajust_td"   width="50px" style="display:none"   onclick="toAdjust3D()"><img id="img_ajst" title="Adjust Line" src="/webgui/assets/img/icons/ajst.png"></td>';
			inputs += '<td id="draw_move_td" width="50px" style="display:none" onclick="toMove3D()"><img id="img_move" title="Move" src="/webgui/assets/img/icons/hand.png"></td>';

//			inputs += '<td width="50px" onchange="( new ThreeRenderer() ).updateGrid();">X:<input type="text" id="gridx"/> </td>';
//			inputs += '<td width="50px" onchange="( new ThreeRenderer() ).updateGrid();">Y:<input type="text" id="gridy"/> </td>';
//			inputs += '<td width="50px" onchange="( new ThreeRenderer() ).updateGrid();">Z:<input type="text" id="gridz"/> </td>';
//							
//			inputs += '<td width="25px" id="offsetx_td" style="display:none" onchange="( new ThreeRenderer() ).updateOffset();">X:<input type="text" size="10" id="offsetx"/> </td>';
//			inputs += '<td width="25px" id="offsety_td" style="display:none" onchange="( new ThreeRenderer() ).updateOffset();">Y:<input type="text" size="10" id="offsety"/> </td>';
//			inputs += '<td width="25px" id="offsetz_td" style="display:none" onchange="( new ThreeRenderer() ).updateOffset();">Z:<input type="text" size="10" id="offsetz"/> </td>';

		} 
		inputs += '</tr></table>';
		inputs += '</div>';

		$('#toolbar_romenext').empty();
		document.getElementById('toolbar_romenext').innerHTML = inputs;  
};

	this.addListeners = function( cont ) {
		cont.addEventListener('mousedown', this.onViewMouseDown, false);   // ok
		cont.addEventListener('mousemove', this.onViewMouseMove, false);   // ok
		cont.addEventListener('mouseup', this.onViewMouseUp, false);   // ok
		cont.addEventListener('mousewheel', this.onMouseWheel, false); 
	}
	
//	this.updateGrid = function() {                                       // not used yet
//		ThreeRenderer.gridx = $('#gridx').val();
//		ThreeRenderer.gridy = $('#gridy').val();
//		ThreeRenderer.gridz = $('#gridz').val();
//	}
//
//	this.updateOffset = function() {
//		ThreeRenderer.offsetX = Number( $('#offsetx').val() );
//		ThreeRenderer.offsetY = Number( $('#offsety').val() );
//		ThreeRenderer.offsetZ = Number( $('#offsetz').val() );
//		// TODO: update all the shapes with the offsets
////		this.rerenderAxis();
//	}
	
	this.internal_showAddModel3DDialog = function() {
		
		var dlg_width = 400, dlg_height = 50, dlg_offset_x = 300, dlg_margin_top = 300;
		var dialog = $('#dialog');
		
		dialog.dialog({
			width : dlg_width,
			autoOpen : false,
			position : {
				my : "center center",
				at : "center center",
				of : "#gvTabContent"
			},
			buttons : {
				"Add Model 3D" : function() {
					(new ThreeRenderer()).internal_createNewModel3D(dialog.find("form"));
				},
				Cancel : function() {
					dialog.dialog("close");
				}
			}
		});

		if (!hasMoved && dialog.dialog("instance")) {
			grayOut(true);
			
			var formHeader = "<form id='add_new_model'>", inputs = "";
			
			// Name field
			inputs += "<label>Name: <input type='text' name='name' required/></label><br />";
			 
			// <!-- Allow form submission with keyboard without duplicating the dialog button -->
			var formFooter = "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px;' />";
		
			dialog.dialog("option", "title", "Add Model 3D");
			dialog[0].innerHTML = formHeader + inputs + formFooter;
			dialog.dialog("open");
		}
		
		dialog.find("form").on("submit", function(event) {
			event.preventDefault();
			(new ThreeRenderer()).internal_createNewModel3D(this);
		});
		
	}
	
	this.internal_createNewModel3D = function(form) {
		
		var typeId = listTypeIds[0];
		
		var foundError = false;                  
		if (selectedMetaData == null || typeId == null) {
			console.log(" no type selected for the physical design");
			return;
		}
		var modelName;
		$(form).find(':input').each(function (i, field) {
			if ((field.type != 'submit') && (field.type != 'radio') || field.checked) {	
				if (field.name == 'name') {
					if(!field.value){
						console.log("Missing Value for type Name.");
						$('#dialog').append("<br/><p style='color:red'>Missing Value for Model name : ");
						foundError = true;
					}else {
					       modelName = field.value;
					}
				}
			}
		});
		if (foundError){
			console.log(" No name provided for the model")
			return;
		}
		var json_addModel = {};
		json_addModel = '{"repoid": ' + selectedMetaData + ', "typeid": ' + typeId + ', "name": ' + modelName + '}';	   
			
		var successFunction = function( data ) {
			$('#console-log').append(" Successfully added a Model");
			curModel = data.updatedModel.id;
			
			var modelManager = new RomeModelManager();
			GlobalUtils.loadAllModels( );
							
			(new ThreeRenderer()).activeToolbar();
			
			PhysicalInterfaceUtils.recreateModelDropdownMenu3D();
			
			(new ThreeRenderer()).internal_generateAxisConstructionLines();
			(new ThreeRenderer()).internal_loadModelShapes();					
				
		};
		
		var failFunction = function( xhr, status, error ) {
			$('#console-log').append("<p style='color:red'> failed to create new model:"+xhr.status+"</p>");
			console.log('failed to create a new model: '+ xhr.status);
		};
		
		var apis = new shapeApis();
		
		apis.addModel(json_addModel, successFunction, failFunction );	
		
		$(form).parent().dialog("close" );
		
	}
	
	// private methods
	this.internal_generateAxisConstructionLines = function() {
		var jsonDataX = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, ' + 
					    '"x1":0.0, "y1":0.0, "z1":0.0, "x2":' + gridSize + ', "y2":0.0, "z2":0.0, "x3":0.0, "y3":0.0, "z3":0.0, ' + 
					    '"height":0, "depth":0, "width":0, "angle":0, "parent":-1, "shapeType":1}';
		
		var jsonDataY = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, ' + 
	    				'"x1":0.0, "y1":0.0, "z1":0.0, "x2":0.0, "y2":' + gridSize + ', "z2":0.0, "x3":0.0, "y3":0.0, "z3":0.0, ' + 
	    				'"height":0, "depth":0, "width":0, "angle":90, "parent":-2, "shapeType":3}';
		
		var jsonDataZ = '{"model":' + curModel + ', "shape": "LINE", "isConstruction":true, ' + 
						'"x1":0.0, "y1":0.0, "z1":0.0, "x2":0.0, "y2":0.0, "z2":' + gridSize + ', "x3":0.0, "y3":0.0, "z3":0.0, ' + 
						'"height":0, "depth":0, "width":0, "angle":90, "parent":-3, "shapeType":5}';
		
		var successFunction = function( data ) {
			$('#console-log').append("<p style='color:blue'>Construction Line saved properly</p>");
		}
		
		var failFunction = function ( data ) {
			$('#console-log').append("<p style='color:red'>Failed to save the shape: " + xhr.status +" </p>");
		}

		var apis = new shapeApis();		
		
		apis.addShape3D( jsonDataX, successFunction, failFunction );
		apis.addShape3D( jsonDataY, successFunction, failFunction );
		apis.addShape3D( jsonDataZ, successFunction, failFunction );
		
		
		
	}

	// private methods
	this.internal_loadModelShapes = function() {

		this.internal_resetView();

		// note getModelIdbyName is from fns-model.js
		curModel= getModelIdByName(document.getElementById("select_model").value);

		// get from model manager instead
		var modelManager = new RomeModelManager();
		modelManager.getShapes( curModel );

		this.internal_activatePhysicalTools();

		// found in physical-3d-view.js
		PhysicalInterfaceUtils.reset3DVariables();

		this.internal_init();

		PhysicalInterfaceUtils.animate3D();
		
		displayShapes3D(curModelShapes);   
		
		this.internal_loadModelProperties();
		
	};
	
	this.internal_loadModelProperties = function() {
		console.log("Entered redux 11 load Model Properties for 3d");
		document.getElementById("grid-models").style.visibility = "visible";
		
		this.showHideModelInfo(true);
		
		var modelManager = new RomeModelManager();	
		
		modelManager.getModelProperties3D(curModel);
		
	}
	
	this.showHideModelInfo = function(isDisplay) {
			if (curModel != null) {
				if (isDisplay) {
					$("#model_info").css({'display':'block'});
				} else {
					$("#model_info").css({'display':'none'});
				}
			}
	}
	
	this.internal_resetView = function() {
		// pv3d = the full physical view 3d
		document.getElementById("pv3d").innerHTML = "";
	}

	this.internal_activatePhysicalTools = function() {

		document.getElementById("design_3d_three_front_td").style.display = "";
		document.getElementById("design_3d_three_back_td").style.display = "";
		document.getElementById("design_3d_three_left_td").style.display = "";
		document.getElementById("design_3d_three_right_td").style.display = "";
		document.getElementById("design_3d_three_top_td").style.display = "";
		document.getElementById("design_3d_three_bottom_td").style.display = "";
		document.getElementById("design_3d_three_grid_td").style.display = "";
		
//		document.getElementById("offsetx_td").style.display = "";
//		document.getElementById("offsety_td").style.display = "";
//		document.getElementById("offsetz_td").style.display = "";
		
		document.getElementById("draw_line_td").style.display = "";
		document.getElementById("draw_cntr_td").style.display = "";
		document.getElementById("show_hide-Const").style.display = "";
		document.getElementById("draw_ajust_td").style.display = "";
		document.getElementById("draw_move_td").style.display = "";
	};
	
	this.internal_resetAllPlaneButtonColors = function() {

		document.getElementById("design_3d_three_front").style.color = "";
		document.getElementById("design_3d_three_back").style.color = "";
		document.getElementById("design_3d_three_left").style.color = "";
		document.getElementById("design_3d_three_right").style.color = "";
		document.getElementById("design_3d_three_top").style.color = "";
		document.getElementById("design_3d_three_bottom").style.color = "";

	};

	this.internal_init = function() {

		container = document.getElementById("pv3d");

		scene = new THREE.Scene();

		rendererX = window.innerWidth - $(container).offset().left;
		rendererY = window.innerHeight - $(container).offset().top;

		ThreeRenderer.activeCamera = "FRONT";
		ThreeRenderer.requestedCamera = "FRONT";

		var SCREEN_WIDTH = window.innerWidth;
		var SCREEN_HEIGHT = window.innerHeight;
		var aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

		var frustumSize = 600;
		camera = new THREE.OrthographicCamera( 0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 150, 1000 );
		// camera = new THREE.OrthographicCamera( 0.5 * frustumSize * aspect / - 1, 0.5 * frustumSize * aspect / 1, frustumSize / 1, frustumSize / - 1, 150, 1000 );

		// camera = new THREE.CombinedCamera( rendererX, rendererY, 70, 1, 1000,     -500, 1000);
		// camera = new THREE.PerspectiveCamera(10, rendererX / rendererY, 1, 10000);
		// camera.position.set(plane3d[0],plane3d[1], plane3d[2]);


		// default camera position
		camera.position.set( 0, - ThreeRenderer.defaultCamera, 0 );


// just dots for testing
//		var dotGeometry = new THREE.Geometry();
//		dotGeometry.vertices.push(new THREE.Vector3( 75, 0, 0));
//		var dotMaterial = new THREE.PointCloudMaterial( { size: 10, sizeAttenuation: false } );
//		var dot = new THREE.PointCloud( dotGeometry, dotMaterial );
//		scene.add( dot );
//
//
//		var dotGeometry2 = new THREE.Geometry();
//		dotGeometry2.vertices.push(new THREE.Vector3( 0, 150, 0));
//		var dotMaterial2 = new THREE.PointCloudMaterial( { size: 20, sizeAttenuation: false } );
//		var dot = new THREE.PointCloud( dotGeometry2, dotMaterial2 );
//		scene.add( dot );

		
	

//		// camera = new THREE.OrthographicCamera(10, rendererX / rendererY, 1, 10000);
//		// camera = new THREE.CombinedCamera( rendererX, rendererY, 70, 1, 1000,     -500, 1000);
//		camera = new THREE.PerspectiveCamera(10, rendererX / rendererY, 1, 10000);
//		camera.position.set(plane3d[0],plane3d[1], plane3d[2]);
//		// x y z
//		// camera.position.set(0,0, 1000 );
//		camera.zoom = 1;
////		camera.updateProjectionMatrix();

//		// camera.toFrontView();



		if( ThreeRenderer.activeGrid === "ON" ) {
			scenegrid = new THREE.GridHelper(1000, 100);
			scenegrid.name = "ROMEGRID";
			scene.add(scenegrid);
			
		}


//		tmpgrid = new THREE.GridHelper(1000, 100, 0x99FF99, 0x99FF99 );
//		scene.add(tmpgrid);

		renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(rendererX, rendererY);
		container.appendChild(renderer.domElement);

		controls = new THREE.OrbitControls(camera, renderer.domElement);
//		controls.enableRotate = false;
//		controls.addEventListener('change', render);
		controls.enableDamping = true;
//		scene.add(controls);

		

		
		lines3d = new THREE.Object3D();
		contourHolder3D = [];
		scene.add(lines3d);
		
//		grid = new THREE.GridHelper(gridSize, gridStep);
//		scene.add(grid);

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
			
			ThreeRenderer.internal_render();
		};

		// camera.lookAt( scene.position );
		renderer.render( scene, camera );
		render();


		this.addListeners( container );
		
		window.addEventListener('resize', onWindowResize, false);
	}

	/**
	 * These are the converted x/y/z
	 */
	this.cx = function( x ) {
		return x + Number( ThreeRenderer.offsetX );
	};
	
	this.cy = function( y ) {
		return y + Number( ThreeRenderer.offsetY );
	};
	
	this.cz = function( z ) {
		return z + Number( ThreeRenderer.offsetZ );
	};
	
//	this.rerenderAxis = function() {
//		scene.remove( lines3d );
//		
//		this.renderAxis();
//
//	}
	
//	this.renderAxis = function() {
//		var SCREEN_WIDTH = window.innerWidth;
//		var SCREEN_HEIGHT = window.innerHeight;
//		var aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
//		
//		lines3d = new THREE.Object3D();
//		axesIds = [];
//		var tmpAxis1 = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3( this.cx( 0 ), this.cy( 0 ), this.cz( 0 ) ), gridSize, "rgb(255, 0, 0)", 0.5, 0.5);
//		var tmpAxis2 = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3( this.cx( 0 ), this.cy( 0 ), this.cz( 0 )), gridSize, "rgb(0, 255, 0)", 0.5, 0.5);
//		var tmpAxis3 = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3( this.cx( 0 ), this.cy( 0 ), this.cz( 0 )), gridSize, "rgb(0, 0, 255)", 0.5, 0.5);
//
//		tmpAxis1.dbId = horizontalAxisId;
//		tmpAxis1.children[0].dbId = horizontalAxisId;
//		tmpAxis1.children[1].dbId = horizontalAxisId;
//		
//		tmpAxis2.dbId = verticalAxisId;
//		tmpAxis2.children[0].dbId = verticalAxisId;
//		tmpAxis2.children[1].dbId = verticalAxisId;
//		
//		tmpAxis3.dbId = -3;
//		tmpAxis3.children[0].dbId = -3;
//		tmpAxis3.children[1].dbId = -3;
//		
//		lines3d.add(tmpAxis1);
//		lines3d.add(tmpAxis2);
//		lines3d.add(tmpAxis3);
//
//		axesIds.push(tmpAxis1.id);
//		axesIds.push(tmpAxis2.id);
//		axesIds.push(tmpAxis3.id);
//		
//		scene.add(lines3d);
//		
//	}
	
	
	
	ThreeRenderer.internal_render = function() {
		
		
		var switchedCamera = false;

		if( ThreeRenderer.activeCamera === ThreeRenderer.requestedCamera ) {
			
		} else {
			switchedCamera = true;
			var current = ThreeRenderer.defaultCamera;
			( new ThreeRenderer() ).internal_resetAllPlaneButtonColors();
			if( ThreeRenderer.requestedCamera === "FRONT" ) {
				if (camera != null) {
					camera.position.set( 0, - ThreeRenderer.defaultCamera, 0 );
				}
//				camera.position.set( 0, - ThreeRenderer.defaultCamera, 0 );
				ThreeRenderer.activeCamera = "FRONT";
				document.getElementById('design_3d_three_front').style.color = 'green';
			} else if( ThreeRenderer.requestedCamera === "BACK" ) {
				if (camera != null) {
					camera.position.set( 0, ThreeRenderer.defaultCamera, 0 );
				}
//				camera.position.set( 0, ThreeRenderer.defaultCamera, 0 );
				ThreeRenderer.activeCamera = "BACK";
				document.getElementById('design_3d_three_back').style.color = 'green';
			} else if( ThreeRenderer.requestedCamera === "LEFT" ) {
				// change camera postition
				if (camera != null) {
					camera.position.set( - ThreeRenderer.defaultCamera, 0, 0 );
				}
//				camera.position.set( - ThreeRenderer.defaultCamera, 0, 0 );
				ThreeRenderer.activeCamera = "LEFT";
				document.getElementById('design_3d_three_left').style.color = 'green';
			} else if( ThreeRenderer.requestedCamera === "RIGHT" ) {
				if (camera != null) {
					camera.position.set( ThreeRenderer.defaultCamera, 0, 0 );
				}
//				camera.position.set( ThreeRenderer.defaultCamera, 0, 0 );

				ThreeRenderer.activeCamera = "RIGHT";
				document.getElementById('design_3d_three_right').style.color = 'green';

			} else if( ThreeRenderer.requestedCamera === "TOP" ) {
				if (camera != null) {
					camera.position.set( 0, 0, ThreeRenderer.defaultCamera );
				}
//				camera.position.set( 0, 0, ThreeRenderer.defaultCamera );
				
				ThreeRenderer.activeCamera = "TOP";
				document.getElementById('design_3d_three_top').style.color = 'green';

			} else if( ThreeRenderer.requestedCamera === "BOTTOM" ) {
				if (camera != null) {
					camera.position.set( 0, 0, - ThreeRenderer.defaultCamera );
				}
//				camera.position.set( 0, 0, - ThreeRenderer.defaultCamera );

				ThreeRenderer.activeCamera = "BOTTOM";
				document.getElementById('design_3d_three_bottom').style.color = 'green';

			} else if( ThreeRenderer.requestedCamera === "PERS" ) {

			}
			if(document.getElementById("model_info").style.visibility = "visible") {
				ModelPropertyUtils.disablePropsForPlanes3D(); 
				ModelPropertyUtils.organizePropModifierList3D();};

		}
		
		if( ThreeRenderer.activeGrid !== ThreeRenderer.requestedGrid || switchedCamera ) {
			// we have to make sure the grid is visible
			if( ThreeRenderer.requestedGrid === "ON" || switchedCamera ) {
				// if they toggle the grid, do we have to remove the old grid?
				// remove old grid
				
				if (scene != null) {
					scene.remove( scenegrid );
				}
//				scene.remove( scenegrid );
				
				scenegrid = new THREE.GridHelper(1000, 100);
				
				// the normal grid will be put on x plane
				// need to rotate based on what the current camera is
				
				// var gridcolor = 0x990000;
				
				// scenegrid2 = new THREE.GridHelper(1000, 80, 0x888888, gridcolor );
				// scenegrid2.rotation.x = Math.PI / 2;
				// scenegrid2.setColors( new THREE.Color(gridcolor), new THREE.Color(gridcolor) );
				
				if( ThreeRenderer.activeCamera === "FRONT" || ThreeRenderer.activeCamera === "BACK" ) {
					scenegrid.rotation.x = Math.PI ;
					
				} else if( ThreeRenderer.activeCamera === "TOP" || ThreeRenderer.activeCamera === "BOTTOM" ) {
					scenegrid.rotation.x = Math.PI / 2;

				} else {
					scenegrid.rotation.z = Math.PI / 2;
				};

				if (scene != null) {
					scene.add(scenegrid);
				}
;
			} else if( ThreeRenderer.requestedGrid === "OFF" ) {
				if (scene != null) {
					scene.remove( scenegrid );
				}

			} 
		
			
			ThreeRenderer.activeGrid = ThreeRenderer.requestedGrid;
			
		} else {
			if( ThreeRenderer.requestedGrid === "ON" ) {
				// if they toggle the grid, do we have to remove the old grid?
				// remove old grid
				
				if (scene != null) {
					scene.remove( scenegrid );
				}
//				scene.remove( scenegrid );
				
				scenegrid = new THREE.GridHelper(1000, 100);
				
				// the normal grid will be put on x plane
				// need to rotate based on what the current camera is
				
				// var gridcolor = 0x990000;
				
				// scenegrid2 = new THREE.GridHelper(1000, 80, 0x888888, gridcolor );
				// scenegrid2.rotation.x = Math.PI / 2;
				// scenegrid2.setColors( new THREE.Color(gridcolor), new THREE.Color(gridcolor) );
				
				if( ThreeRenderer.activeCamera === "FRONT" || ThreeRenderer.activeCamera === "BACK" ) {
					scenegrid.rotation.x = Math.PI ;
					
				} else if( ThreeRenderer.activeCamera === "TOP" || ThreeRenderer.activeCamera === "BOTTOM" ) {
					scenegrid.rotation.x = Math.PI / 2;

				} else {
					scenegrid.rotation.z = Math.PI / 2;
				};

				if (scene != null) {
					scene.add(scenegrid);
				}

			} else if( ThreeRenderer.requestedGrid === "OFF" ) {
				if (scene != null) {
					scene.remove( scenegrid );
				}

			} 
				
			ThreeRenderer.activeGrid = ThreeRenderer.requestedGrid;
			
		}		

	};
	
	
	
	
	// Will attempt to display the grid 
	this.internal_grid_toggle = function() {
		if( ThreeRenderer.requestedGrid === "ON" ) {
			ThreeRenderer.requestedGrid = "OFF";
		} else {
			ThreeRenderer.requestedGrid = "ON";
		}
	};
	

	this.internal_front = function() {
		ThreeRenderer.requestedCamera = "FRONT";
		plane3DName = "xz";
	}

	this.internal_back = function() {
		ThreeRenderer.requestedCamera = "BACK";
		plane3DName = "xz";
	}

	this.internal_left = function() {
		ThreeRenderer.requestedCamera = "LEFT";
		plane3DName = "yz";
	}

	this.internal_right = function() {
		ThreeRenderer.requestedCamera = "RIGHT";
		plane3DName = "yz";
	}

	this.internal_top = function() {
		ThreeRenderer.requestedCamera = "TOP";
		plane3DName = "xy";
	}

	this.internal_bottom = function() {
		ThreeRenderer.requestedCamera = "BOTTOM";
		plane3DName = "xy";
	}
	
	
	/**
	 * Mouse events
	 */

	this.onViewMouseMove = function(event) {
			
		rendererX = window.innerWidth - $(container).offset().left;
		rendererY = window.innerHeight - $(container).offset().top;

		event.preventDefault();

		mouse.x = ((event.pageX-$(container).offset().left)  / (rendererX)) * 2 - 1;
		mouse.y = -((event.pageY-$(container).offset().top-5) / (rendererY)) * 2 + 1;

		
		raycaster.setFromCamera(mouse, camera);
		var intersects = raycaster.intersectObjects(lines3d.children, true);
		
		if (action3D == "line") {
			if (mouseStatus == 1 && new3dElement != null) {
					
				if (plane3DName == "xy") {
					
					if (drawingLineType == 1) {  // parallel to x
						setPlane(0,0,1);
						if (raycaster.ray.intersectPlane(plane, intersection)) {
							new3dElement.position.copy(intersection.sub(offset));
						}
						new3dElement.position.x = 0;
						new3dElement.value = new3dElement.position.y;
						
					} else if (drawingLineType == 3) {    // parallel to y
						setPlane(0,0,1);
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
						setPlane(1,0,0);
						if (raycaster.ray.intersectPlane(plane, intersection)) {
							new3dElement.position.copy(intersection.sub(offset));
						}
						new3dElement.position.y = 0;
						new3dElement.value = new3dElement.position.z;
						
					} else if (drawingLineType == 5) {
						setPlane(1,0,0);
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
						setPlane(0,1,0);       
						if (raycaster.ray.intersectPlane(plane, intersection)) {
							new3dElement.position.copy(intersection.sub(offset));
						}
						new3dElement.position.x = 0;
						new3dElement.value = new3dElement.position.z;
						
					} else if (drawingLineType == 5) {
						setPlane(0,1,0);
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
		} else if(action3D == 'assign'){
			showSelectionIndicator(intersects);
		}else if(action3D == 'unassign'){
			showSelectionIndicator(intersects);	
		}else if(action3D == 'adjust'){		
				if(mouseStatus == 1 && selected3DLine != null){
//				  console.log("adjusting!");
//				   console.log(" Line moved is : "+selected3DLine.dbId);
					if (plane3DName == "xy") {					
						if (selected3DLine.shapeType == 1) {  // parallel to x											
							setPlane(0,0,1);
							if (raycaster.ray.intersectPlane(plane, intersection)) {
								selected3DLine.position.copy(intersection.sub(offset));
							}
							selected3DLine.position.x = 0;
							selected3DLine.value = selected3DLine.position.y;
							selected3DLine.tochange = 'y';
						}else if (selected3DLine.shapeType == 3) {    // parallel to y
                                setPlane(0,0,1);
								if (raycaster.ray.intersectPlane(plane, intersection)) {
									selected3DLine.position.copy(intersection.sub(offset));
								}
								selected3DLine.position.y = 0;
								selected3DLine.value = selected3DLine.position.x;
								selected3DLine.tochange = 'x';
								
							} else {
								console.log("Wrong Line Type");
							}
					
					} else if (plane3DName == "yz") {	
						if (selected3DLine.shapeType  == 3) {
                            setPlane(1,0,0);
							if (raycaster.ray.intersectPlane(plane, intersection)) {
								selected3DLine.position.copy(intersection.sub(offset));
							}
							selected3DLine.position.y = 0;
							selected3DLine.value = selected3DLine.position.z;
							selected3DLine.tochange = 'z';				
						} else if (selected3DLine.shapeType  == 5) {

							 setPlane(1,0,0);
							if (raycaster.ray.intersectPlane(plane, intersection)) {
								selected3DLine.position.copy(intersection.sub(offset));
							}
							selected3DLine.position.z = 0;
							selected3DLine.value = selected3DLine.position.y;
							selected3DLine.tochange = 'y';
							
						} else {
							console.log("Wrong Line Type");
						}
						
					} else if (plane3DName == "xz") {
						
						if (selected3DLine.shapeType == 1) {		
							 setPlane(0,1,0);
							if (raycaster.ray.intersectPlane(plane, intersection)) {
								selected3DLine.position.copy(intersection.sub(offset));
							}
							selected3DLine.position.x = 0;
							selected3DLine.value = selected3DLine.position.z;
							selected3DLine.tochange = 'z';
							
						} else if (selected3DLine.shapeType  == 5) {

							setPlane(0,1,0);
							if (raycaster.ray.intersectPlane(plane, intersection)) {
								selected3DLine.position.copy(intersection.sub(offset));
							}
							selected3DLine.position.z = 0;
							selected3DLine.value = selected3DLine.position.x;
							selected3DLine.tochange = 'x';							
						} 						
					} else {
						console.log("Wrong Plane Name");
					}	
					
					
	
				}else {
					showSelectionIndicator(intersects);
				}
			
	    } else if (action3D == 'move') {
	    	
			// Update all shapes manully
//	    	if (mouseStatus == 1) {
//		    	for (var i = 0; i < lines3d.children.length; i++) {
//		    		if (plane3DName == "xy") {
//		    			lines3d.children[i].position.x += (mouse.x - sMoveX);
//		    			lines3d.children[i].position.y += (mouse.y - sMoveY);
//		    		} else if (plane3DName == "yz") {
//		    			lines3d.children[i].position.y += (mouse.x - sMoveX);
//		    			lines3d.children[i].position.z += (mouse.y - sMoveY);
//		    		} else if (plane3DName == "xz") {
//		    			lines3d.children[i].position.x += (mouse.x - sMoveX);
//		    			lines3d.children[i].position.z += (mouse.y - sMoveY);
//		    		} else {
//		    			console.log("Wrong 3D Plane Name: " + plane3DName);
//		    		}
////		    		if (plane3DName == "xy") {
////		    			lines3d.children[i].geometry.vertices[0].x += mouse.x;
////		    			lines3d.children[i].geometry.vertices[0].y += mouse.y;
////		    			lines3d.children[i].geometry.vertices[1].x += mouse.x;
////		    			lines3d.children[i].geometry.vertices[1].y += mouse.y;
////		    		} else if (plane3DName == "yz") {
////		    			lines3d.children[i].geometry.vertices[0].y += mouse.x;
////		    			lines3d.children[i].geometry.vertices[0].z += mouse.y;
////		    			lines3d.children[i].geometry.vertices[1].y += mouse.x;
////		    			lines3d.children[i].geometry.vertices[1].z += mouse.y;
////		    		} else if (plane3DName == "xz") {
////		    			lines3d.children[i].geometry.vertices[0].x += mouse.x;
////		    			lines3d.children[i].geometry.vertices[0].z += mouse.y;
////		    			lines3d.children[i].geometry.vertices[1].x += mouse.x;
////		    			lines3d.children[i].geometry.vertices[1].z += mouse.y;
////		    		} else {
////		    			console.log("Wrong 3D Plane Name: " + plane3DName);
////		    		}
////		    		lines3d.children[i].geometry.verticesNeedUpdate = true;
//		    	}
//	    	}
	    	
	    	
	    } else if (controls.enabled == true) {
				// controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
			}
			showSelectionIndicator(intersects);
}
		


	this.onViewMouseUp = function(event) {
			
		if (action3D == "line") {
			mouseStatus = 0;
			if (new3dElement != null) {
				lines3d.add(new3dElement);		
				// save 3d object
				new3dElement.shapeType = drawingLineType;
				new3dElement.value = roundNB(new3dElement.value );
				ModelShapeUtils.save3DShape(new3dElement);
			}
			
			// reset variables
			new3dElement = null;
			drawingLineType = null;
			plane = new THREE.Plane();
			offset = new THREE.Vector3();
			intersection = new THREE.Vector3();
		}else if(action3D == "cntr"){
			mouseStatus = 0;			
		}else if(action3D == 'assign'){
			mouseStatus = 0;
		}else if(action3D == 'adjust'){
			console.log("Do update lines");
			if(mouseStatus == 1 && selected3DLine){
				mouseStatus = 0;
				var line2 =lines3DToAdjust[0];
				selected3DLine.value = roundNB(selected3DLine.value);
				line2["value"] = selected3DLine.value;
				line2["tochange"] = selected3DLine.tochange;
				cntrFound = [];
				addLinesToAdjust();		
				ModelShapeUtils.update3DShape();
				console.log("update all related lines by : "+ selected3DLine.value );
				updateRelatedShapes(selected3DLine.value);
//              Release  Variables        
				selected3DLine = null;
				plane = new THREE.Plane();
				offset = new THREE.Vector3();
				intersection = new THREE.Vector3();
			}
		} else if (action3D == 'move') {
			mouseStatus = 0;
//      After release mouse the new position of all objects should be saved somehow 		
			
//			Update all shapes manually
			
//			Use three js TransformControls
			transformControl.enabled = false;
		}else if(action3D == 'unassign'){
			if(mouseStatus == 1 && selected3DLine){
				mouseStatus = 0;
				console.log(" exiting the unassign property -- must update shapes")
//				removePropertyFromShape();
			}
		}
		
}

	this.onViewMouseDown = function(event) {
				
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
								// intersects[i].object.type == "LineSegments"
								if (intersects[i].object.dbParent != null) {
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
									// intersects[i].object.dbId == -1 || intersects[i].object.dbId == -2
									if (intersects[i].object.axis == 'x' || intersects[i].object.axis == 'y') {
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
								}
								if (new3dElement != null) {
									new3dElement.dbParent = intersects[i].object.dbId;
									scene.add(new3dElement);
									setPlane(0,0,1);
									if (raycaster.ray.intersectPlane(plane, intersection)) {
										offset.copy(intersection).sub(new3dElement.position);
									}		
								}
								
							} else if (plane3DName == "yz") {
								// intersects[i].object.type == "LineSegments"
								if (intersects[i].object.dbParent != null) {
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
									// intersects[i].object.dbId == -2 || intersects[i].object.dbId == -3
									if (intersects[i].object.axis == 'y' || intersects[i].object.axis == 'z') {
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
								}
								if (new3dElement != null) {
									new3dElement.dbParent = intersects[i].object.dbId;
									scene.add(new3dElement);
									setPlane(1,0,0);
									if (raycaster.ray.intersectPlane(plane, intersection)) {
										offset.copy(intersection).sub(new3dElement.position);
									}	
								}
								
							} else if (plane3DName == "xz") {
								// intersects[i].object.type == "LineSegments"
								if (intersects[i].object.dbParent != null) {
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
									// intersects[i].object.dbId == -1 || intersects[i].object.dbId == -3
									if (intersects[i].object.axis == 'x' || intersects[i].object.axis == 'z') {
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
								}
								if (new3dElement != null) {
									new3dElement.dbParent = intersects[i].object.dbId;
									scene.add(new3dElement);
									setPlane(0,1,0);
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
			}else if(action3D == "cntr") {                          // ensure there are already construction lines drawn

				controls.enabled = false;		
				
				raycaster.setFromCamera(mouse, camera);
				var intersects = raycaster.intersectObjects(lines3d.children, true);                // return the line clicked 
				console.log(" Found "+intersects.length + " intersection "  );
					
				var foundIntersect = false;
				if (intersects.length > 0) {
					for (var i = 0; i < intersects.length; i++) {	
						if (foundIntersect == false) {
							if (PhysicalInterfaceUtils.verifiedLinePlane(intersects[i].object) && intersects[i].object.isConstruction) {
//							    intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
							   	console.log("Inside start drawing a contour ");	
								if (selectedLine.length <1) {
									selectedLine.push(intersects[i].object);
									mouseStatus = 1;
									foundIntersect = true;
								} else {

									// means we already started the drawing contour  === this is the second line selected
									if(selectedLine.length >= 1 ) {					
									    var selectedElementInter = getIntersection3D(selectedLine[selectedLine.length-1], intersects[i].object);
										if(selectedElementInter != null){
												if (selectedElementInters < 1) {                              // no previous intersection saved
													selectedLine.push(intersects[i].object);                  // push the lines to selectedLine
													selectedElementInters.push(selectedElementInter);         // push the Intersection points
												} else {                                                      // third line selected we need to draw the contour
													if(verifyNewIntersection3D(selectedElementInters[selectedElementInters.length-1]  , selectedElementInter) ){
														selectedLine.push(intersects[i].object);
														selectedElementInters.push(selectedElementInter);
														if (selectedLine.length == 3 && selectedElementInters.length == 2) {
															var contourNew = setContour3D(cntr3DColor, selectedElementInters, selectedLine[1]);
															displayCountour3D(contourNew, plane3DName);		

															contourHolder3D.push(contourNew);
															selectedLine.shift();
															selectedElementInters.shift();
														}	
													}
												}
												foundIntersect = true;
										}else{
											console.log("Wrong type line selection");
										}
									} 
								}
							} else { console.log("Line selected do not below to active Plane");}
						}					
					}
				}


					
			}else if(action3D == 'assign'){
					console.log('Inside mouse down with action  ======== Assign ')
					controls.enabled = false;
					raycaster.setFromCamera(mouse, camera);
					var intersects = raycaster.intersectObjects(lines3d.children, true);                // return the line clicked 
					console.log(" Found "+intersects.length + " intersection "  );
					
					var foundIntersect = false;				
					if (intersects.length >0) {	
						for (var i = 0; i < intersects.length; i++) {	
							if (foundIntersect == false) {			
								if( !verifyLineIsAxis(intersects[0].object) &&  PhysicalInterfaceUtils.verifiedLinePlane(intersects[0].object) && intersects[0].object.isConstruction){ 
										mouseStatus = 1;
									    intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
									   	console.log("Inside assign property to construction line ");
									   	
									   	selectedLine.push(intersects[0].object);
							
//									   	check type of property Text or Number 
									   	if(propText) {   
									   		saveAssignTextProToTextShape3D();
									   		} 
										//  last option it is a property type number 
										else 
											{ 
											findWhatTochange(selectedLine[0]);
											ModelPropertyUtils.saveAssignShapeToProperty3D();
											}
									   	foundIntersect = true; 	
//									}
									
								}else { 
									console.log("Line selected do not below to active Plane/Not a construction line selected ");
									}
									    
							}
						}
					}else {
						console.log(" No line selected " );
					}
								
							
				}else if(action3D == 'adjust'){
					console.log('Inside mouse down with action  ======== Adjust ')
							
					if (mouseStatus == 0) {
							
							controls.enabled = false;				
							raycaster.setFromCamera(mouse, camera);
							var intersects = raycaster.intersectObjects(lines3d.children, true);                // return the line clicked 
							console.log(" Found "+intersects.length + " intersection "  );
							var foundIntersect = false;
							
							if (intersects.length >0) {						
								for (var i = 0; i < intersects.length; i++) {	
										if (foundIntersect == false) {										
											if(PhysicalInterfaceUtils.verifiedLinePlane(intersects[0].object) && intersects[0].object.isConstruction){ 
											   if (!verifyLineIsAxis(intersects[0].object)){ 
												   mouseStatus = 1;
												    intersects[0].object.material.color.setHex(Math.random() * 0xffffff);						    
												   	console.log("Inside adjust construction line ");
												   	selected3DLine = intersects[0].object;
												   	
												   	foundIntersect =true;
												   	if (plane3DName == "xy"){
												   		setPlane(0,0,1);
														if (raycaster.ray.intersectPlane(plane, intersection)) {
															offset.copy(intersection).sub(selected3DLine.position);
														}	
												   	}
												   	else if (plane3DName == "yz"){
												   		setPlane(1,0,0);
														if (raycaster.ray.intersectPlane(plane, intersection)) {
															offset.copy(intersection).sub(selected3DLine.position);
														}
												   		
												   	}else if (plane3DName == "xz"){
												   		setPlane(0,1,0);
														if (raycaster.ray.intersectPlane(plane, intersection)) {
															offset.copy(intersection).sub(selected3DLine.position);
														}
												   	}
												   	findAllLinesToAdjust(selected3DLine);										   
												   	
												   	
											   }else { console.log(" Can not adjust Axis line  " );   }
											
											}else {
												
												console.log(" Can not adjust the line selected (either not part of the plane/ not a construction Line " );							
											}
									}
							}
							
							
						}else {
							console.log(" No line selected " );
						}
					}
					
				} else if (action3D == 'move') {
					mouseStatus = 1;
					
					// Update all shapes manully
//					sMoveX = mouse.x = ((event.pageX-$(container).offset().left)  / (rendererX)) * 2 - 1;
//					sMoveY = mouse.y = -((event.pageY-$(container).offset().top-5) / (rendererY)) * 2 + 1;
					
					// Use three js TransformControls
					transformControl.enabled = true;
				} else if (action3D == 'unassign'){
					console.log('Inside mousedown  action == Unassign ')
					if (mouseStatus == 0) {	
							controls.enabled = false;				
							raycaster.setFromCamera(mouse, camera);
							var intersects = raycaster.intersectObjects(lines3d.children, true);                // return the line clicked 
							var foundIntersect = false;
							if (intersects.length >0) {						
								for (var i = 0; i < intersects.length; i++) {	
										if (foundIntersect == false) {										
											if(PhysicalInterfaceUtils.verifiedLinePlane(intersects[0].object) && intersects[0].object.isConstruction){ 
											   if (!verifyLineIsAxis(intersects[0].object)){ 
												   mouseStatus = 1;
												   selected3DLine = intersects[0].object;
												   foundIntersect =true;
											   }else { console.log(" Axis line selected -- move to next line " );   }
					
											}else {	
												console.log(" Can not adjust the line selected (either not part of the plane/ not a construction Line " );							
											}
										}
								}
							}
					}				
					
				}else { 		
				controls.enabled = true;
			    }
	}
	
	this.onMouseWheel = function(event) {
		
//	    var wheelDelta = event.wheelDelta;
//	    if (wheelDelta > 0){
//	    	camera.zoom = camera.zoom * 1.1;
//	    }
//	    else {
//	    	camera.zoom = camera.zoom * 0.9;
//	    }
//	    camera.updateProjectionMatrix();
		
	}
	
}
	

	
	
   

