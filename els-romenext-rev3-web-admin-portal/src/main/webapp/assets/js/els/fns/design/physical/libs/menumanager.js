//==========================================================================
//
//                        functions in Main Physical Menu
//
//=========================================================================
function toDrawGrid3D() {
	resetAllImgs('line');
	if (action3D == "line") {
		var img = document.getElementById("img_grid");
		img.src = "/webgui/assets/img/icons/grid.png";
		console.log(" User cancelling the previous drawing 3D lines function");
		action3D = null;
		document.getElementById('xyz_limitations').style.display = "none";
		document.getElementById('x_limitation').checked = false;
		document.getElementById('y_limitation').checked = false;
		document.getElementById('z_limitation').checked = false;
	} else {		
		var img = document.getElementById("img_grid");
		img.src = "/webgui/assets/img/icons/grid_01.png";
		console.log(" User starting the  drawing 3D lines process")
		action3D = "line";
		document.getElementById('xyz_limitations').style.display = "";
	}
}

//=========================================================================
function toDrawContour3D() {
	// reset the grid image
	resetAllImgs('cntr');
	console.log("Inside the action draw contour");
	var img = document.getElementById("img_cntr");
	if(GlobalUtils.retrieveImgname(img) == "cntr.png") {           // first time clicked on contour
		if(action3D != 'cntr'){ 
					img.src = "/webgui/assets/img/icons/cntr_01.png";
					action3D = "cntr";				
					selectedLine = [];
					selectedElementInters = [];
					contourHolder3D = [];
		}else{                                       // second click on contour
			console.log("Error  1  =====: previous action not finished !! " + action3D);
		}
	}else if(GlobalUtils.retrieveImgname(img) == "cntr_01.png") { 
		      if(action3D == 'cntr'){
		    	                    if(contourHolder3D.length> 0){
		    	                    	saveContour3D("cntr", contourHolder3D);	
		    	                    }
	    	  					    img.src = "/webgui/assets/img/icons/cntr.png";	    	  		
		    	  					action3D = null;
									selectedLine = [];
									selectedElementInters = [];
									contourHolder3D = [];	    	      
			}else {  
				console.log("Error   2  =====  resetting img ");	
				img.src = "/webgui/assets/img/icons/cntr.png";
				action3D = null;
			}	
		}				
	
}

//=========================================================================
function toShowHideConst3D(val){
	if(val)   {
			var lines = lines3d.children;
			for(var j= 0; j < lines.length; j++){
				if( lines[j].type == 'LineSegments'  ){			
						if(lines[j].shape == "LINE" && lines[j].isConstruction ){
							lines[j].visible = false;
//							lines[j].material.color= new THREE.Color('black');
//							lines[j].material.needsUpdate = true;	
						}
			}
			}
			document.getElementById("img_eye").src= '/webgui/assets/img/icons/show.png';
			document.getElementById("show_hide-Const").setAttribute("onClick", "toShowHideConst3D(false)");
	}else {
		var lines = lines3d.children;
		for(var j= 0; j < lines.length; j++){
			if( lines[j].type == 'LineSegments'  ){		
				if(lines[j].shape == "LINE"  && lines[j].isConstruction  ){
					lines[j].visible = true;
//					if (lines[j].hasOwnProperty("axis")) {
//						if (lines[j].axis == "x") {
//							lines[j].material.color= new THREE.Color(xAxisColor);
//						} else if (lines[j].axis == "y") {
//							lines[j].material.color= new THREE.Color(yAxisColor);
//						} else if (lines[j].axis == "z") {
//							lines[j].material.color= new THREE.Color(zAxisColor);
//						} else {
//							console.log("Wrong Shape Data: " + lines[j].dbId);
//						}
//					} else {
//						lines[j].material.color= new THREE.Color(line3dColor);
//					}
//					lines[j].material.needsUpdate = true;	
				}
			}
		}
		document.getElementById("img_eye").src= '/webgui/assets/img/icons/hide.png';
		document.getElementById("show_hide-Const").setAttribute("onClick", "toShowHideConst3D(true)");
		
	}
}

//==========================================================================
function toAdjust3D(){
	resetAllImgs('adjust');
    console.log("Inside to adjust function ");
	if (curModel == null) {
		console.log("No Model was selected == nothing to ajust")
		return;
	}
	if(action3D == 'adjust'){
		var img = document.getElementById("img_ajst");
		img.src = "/webgui/assets/img/icons/ajst.png";
		console.log(" User cancelling the previous ajust function");
		action3D = null;
	}else {
		var img = document.getElementById("img_ajst");
		img.src = "/webgui/assets/img/icons/ajst_01.png";
		console.log(" User starting the  ajust process");
		action3D = "adjust";
	}
}

//==========================================================================
function toMove3D(){
	resetAllImgs('move');
    console.log("Inside to move function");
	if (curModel == null) {
		console.log("No Model was selected == nothing to move")
		return;
	}
	
	if(action3D == 'move'){
		var img = document.getElementById("img_move");
		img.src = "/webgui/assets/img/icons/hand.png";
		console.log("User cancelling the previous move function");
		action3D = null;
		controls.enabled = true;
		transformControl.enableDamping = false;
		transformControl.detach(lines3d);
		scene.remove(transformControl);
		transformControl = null;
	}else {
		var img = document.getElementById("img_move");
		img.src = "/webgui/assets/img/icons/hand_01.png";
		console.log("User starting the move process");
		action3D = "move";
		controls.enabled = false;
		transformControl = new THREE.TransformControls(camera, renderer.domElement);
		transformControl.enableDamping = true;
		transformControl.attach(lines3d);
		scene.add(transformControl);
	}
	
}

//==========================================================================
//
// functions associated with PROPERTIES MENU options : 
//          . AssignProperty,  
//          . ViewPropertyOnShape
//
//=========================================================================
function toAssignPropertyToShape3D (propId){
	resetAllImgs('assign');
	var img = document.getElementById("prop_assign_"+propId);
	console.log(" actionImg is: "+actionImg + "previous image is :"+prev_img);
		
	if(!restoreImage3D('assign', propId)){	
		img.src = img_path + "model_icons/assign_active.png";
		prev_img = img;				
		actionImg ='assign';				
		PhysicalInterfaceUtils.findTypeProperty(propId);
		action3D = 'assign';
		selectedLine = [];
	}
}

function toViewPropertyOnModel3D( propId ) {
	console.log(" Inside View Property on Current Model: ");
	if ( propId == null) {
		console.log(" No value for property is passed");
		return;
	}
	var img = document.getElementById("prop_view_"+propId);
	// if button was enabled for the same item === disable it
//	console.log(" actionImg is: "+actionImg + "previous image is :"+prev_img);
	if(restoreImage3D('view', propId)){								
		resetConstLineColor();           // Need to reset color of construction lines
	}else {	
//		if(!restoreImage3D('view', propId)){		
			img.src = img_path + "model_icons/view_active.png";
			prev_img = img;
			actionImg ='view';
			resetConstLineColor();
			for(var i=0; i<lines3d.children.length; i++){
				if(lines3d.children[i].hasOwnProperty("property")){
					if(lines3d.children[i].property.id == Number(propId)){	
						if(lines3d.children[i].shape == "LINE" ){
							  lines3d.children[i].material.color= new THREE.Color('pink');
							  lines3d.children[i].material.needsUpdate = true;	
							}
						
						}
					}
				
			}			
	   }
//	}
}

function toUnAssignProperty(){
	if(curModelProperties.length == 0 ){
		console.log("No properties for this model yet ");             // option should be disabled if no properties
		return;
		} 
	
	var img = document.getElementById("prop_unassign");
	console.log(" actionImg is: "+actionImg + "previous image is :"+prev_img);
	if(restoreImage3D('unassign', null)){								
				resetConstLineColor();           // Need to reset color of construction lines
	}else {
		
		action3d= 'unassign';
}

}


function toUpdateModelProperty3D(propId){
	console.log("Inside Update Model Property  : "+ propId);
	console.log(" actionImg is:   "+actionImg + "previous image is :   "+prev_img);
	
	var img = document.getElementById("prop_update_"+propId);
		img.src = img_path+ "saveprop.png";
		prev_img = img;
		actionImg ='update';
		action3D = 'update';
		ModelPropertyUtils.updateModelProperty3D(propId);	
		
}
//###################################################################################


//============================UTILITIES ==================================  
function resetConstLineColor(){  	
	var lines = lines3d.children;    	
	for(var i= 0; i < lines.length; i++){
		if(lines[i].type == 'LineSegments'  && lines[i].isConstruction && !verifyLineIsAxis(lines[i])){
			lines[i].material.color= new THREE.Color(line3dColor);
			lines[i].material.needsUpdate = true;
		}		
	}	
} 

function restoreImage3D(curraction, currId){
	var restoreImg='';
	switch (actionImg){
		case "view":   if(prev_img) {restoreImg = img_path + 'model_icons/view.png';break;}
		case "assign": if(prev_img) {restoreImg = img_path + 'model_icons/assign.png';break;}
		case "update": if(prev_img) {restoreImg = '/webgui/assets/img/saveprop.png';break;}
		case "unassign" : if(prev_img) { restoreImg = img_path + 'model_icons/unlink.png'; break;}
		default : {console.log("No Image active/to be changed");break;}
	}
	
	if(curraction === actionImg){
		                            if(currId == prev_Id){
		                            	prev_img.src = restoreImg;
	                                    if (actionImg != 'view' && actionImg != 'update') {
	                                    	action3D = null;
	                                    }
	                                    actionImg='';
	                                    prev_img=''; 
	                                    prev_Id='';
	                                    return true;
		                            }else{
		                            	prev_img.src = restoreImg;
		                            	actionImg='';
	                                    prev_img=''; 
	                                    prev_Id=currId;
		                            	return false;
		                            }
	}else {
		resetConstLineColor();
//		prev_img.src = restoreImg;
		actionImg='';
	    prev_img=''; 
	    prev_Id=currId;
		return false;
	}
}

function resetAllImgs(newAction){
    console.log("Resettimg active images ");
	if(action3D =='line' && newAction !='line') { 
		resetGridImg();
		document.getElementById('xyz_limitations').style.display = "none";
		document.getElementById('x_limitation').checked = false;
		document.getElementById('y_limitation').checked = false;
		document.getElementById('z_limitation').checked = false;
	}
	
	if(action3D == 'cntr' && newAction != 'cntr'){
			if(contourHolder3D.length != 0){
					var resp = confirm("do you want to save contour");
			        if(resp){   saveContour3D("cntr", contourHolder3D);	};
			}
			selectedLine = [];
			selectedElementInters = [];
			contourHolder3D = [];	
			resetCntrImg();
		};
   
    if(action3D == 'rect' && newAction != 'rect') { 
    	// TO DO !!!!  Save data
    	resetRectImg();
    	}
    if(action3D == 'adjust' && newAction != 'adjust'){
    	// TO DO !!!!  Save data
    	resetAdjustImg();	
      }
    
    if (action3D == 'move' && newAction != 'move') {
    	resetMoveImg();
		action3D = null;
		controls.enabled = true;
		transformControl.enableDamping = false;
		transformControl.detach(lines3d);
		scene.remove(transformControl);
		transformControl = null;
    }
    
    if (action3D == 'assign' && newAction != 'assign') {
    	resetAssignImg();
    }
}

//=========================================================================
//                  Handling previous image selection
//=========================================================================
function resetGridImg(){
var img =  document.getElementById("img_grid");
img.src = "/webgui/assets/img/icons/grid.png";
}
function resetCntrImg(){
var img = document.getElementById("img_cntr");
img.src = "/webgui/assets/img/icons/cntr.png";
}
function resetRectImg(){
var img = document.getElementById("img_rect");
img.src = "/webgui/assets/img/icons/rcfl.png";
}
function resetAdjustImg(){
var img = document.getElementById("img_ajst");
img.src = "/webgui/assets/img/icons/ajst.png";
}

function resetMoveImg(){
	var img = document.getElementById("img_move");
	img.src = "/webgui/assets/img/icons/hand.png";
}

function resetAssignImg(){
	var img = document.getElementById("img_assign");
	img.src = img_path + 'model_icons/assign.png';
}
