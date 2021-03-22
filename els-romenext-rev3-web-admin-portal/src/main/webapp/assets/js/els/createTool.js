/**
 * Desc:	Event handlers/functions for Physical design
 * Author:	
 * Date:	22 September  2016
 * Update: 
 */

//=================================== This displays the menu for List of Models ===================
function createModelDropdownMenu() {
	var input = "";
	input += '<select id="select_model" onchange="loadModelShape()"><option value="select model">select model...</option>';
	for (var i = 0; i < curModels.length; i++) {
		input += '<option value="' + curModels[i].name + '">' + curModels[i].name + '</option>';
	}
	input += '</select>';
	return input;
}
//=================================== This will highlight the selected Model in the list ==========
function recreateModelDropdownMenu() {                                       // List of models should be already displayed
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
//======================================================================================================================================
function setModelMenuPart(curModel) {
	console.log("Inside == setModelDropdownMenu ==");
	isPartView = true;
	var input = "";
	input += '<select id="select_model" onchange="loadModelShape()"><option value="select model">select model...</option>';
	for (var i = 0; i < curModels.length; i++) {
		if (curModels[i].id == curModel) {
			input += '<option selected value="' + curModels[i].name + '">' + curModels[i].name + '</option>';  // highlight the selected Model
		} else {
		input += '<option value="' + curModels[i].name + '">' + curModels[i].name + '</option>';
		}
	}
	input += '</select>';
	return input;
}

//================================================================================================================
function   centerGraph()  {
	if (selecteddecorator == 'Logical' && topLevelTab == "typeDesignViewTab") {
		if(tdvCy){tdvCy.fit();}
	}else { 
		if(irvCy){irvCy.fit();}
	}
	
}
//=================================================================================================================
function createPVToolBarForPartsView() {
	
	var toolBar = document.createElement('div');
	
	var tools = [];
	var tmpFunc = function(){
		switchPart3DView(this.value);
	}
	tools.push({className:'tdbutton', innerAction:tmpFunc, tag:'input', innerId:'phy_pv_xy_view', innerType:'button', innerTitle:'xy', innerValue:'bottom(xy)', innerVisibility:'visible'});
	tools.push({className:'tdbutton', innerAction:tmpFunc, tag:'input', innerId:'phy_pv_yz_view', innerType:'button', innerTitle:'yz', innerValue:'front(yz)', innerVisibility:'visible'});
	tools.push({className:'tdbutton', innerAction:tmpFunc, tag:'input', innerId:'phy_pv_xz_view', innerType:'button', innerTitle:'xz', innerValue:'left(xz)', innerVisibility:'visible'});
	tools.push({});
	tools.push({className:'tdicon', tag:'button', innerId:'return_to_model', innerType:'button', innerValue:'model', innerAction:switchToPhysicalView, innerHTML:'Model'});
	tools.push({className:'tdicon', html:setModelMenuPart(curModel)});
	tools.push({className:'tdicon'});
	tmpFunc = function(){
		switchPartDisplay(this.value);
	}
	if(physicalModelView == 'parent' ) {
		tools.push({className:'tdicon', tag:'button', innerId:'part_child', innerType:'button', innerValue:'child', innerAction:tmpFunc, innerHTML:'View Child Parts'});
	} else {
		tools.push({className:'tdicon', tag:'button', innerId:'part_child', innerType:'button', innerValue:'parent', innerAction:tmpFunc, innerHTML:'View Parent Parts'});
	}
	tmpFunc = function(){
		toShowGrid(this.value);
	}
	tools.push({className:'tdicon', tag:'button', innerId:'part_grid_button', innerType:'button', innerValue:'Grid', innerAction:tmpFunc, innerHTML:'Grid'});
	
	tools.push({className:'tdicon', action:toMove, tag:'img', innerId:'img_move', innerTitle:'Move', innerSrc:'/webgui/assets/img/icons/hand.png'});
	tools.push({className:'tdicon', action:toZoomIn, tag:'img', innerId:'img_zmin', innerTitle:'Zoom In', innerSrc:'/webgui/assets/img/icons/zmin.png'});
	tools.push({className:'tdicon', action:toZoomOut, tag:'img', innerId:'img_zmou', innerTitle:'Zoom Out', innerSrc:'/webgui/assets/img/icons/zmou.png'});
	
	var toolbarManager = new toolbarManagerRomeNext();
	toolbarManager.createToolBar(toolBar, 'TABLE', 'toolbar_table', tools);
	$('#toolbar_romenext').empty();
	document.getElementById('toolbar_romenext').appendChild(toolBar);
	
	
//     var inputs ='';
// 	 inputs = '<div><table  class="toolbar_table"><tr>';
// 	 inputs += '<td width="25px"><input id="phy_pv_xy_view" type="button" style="border:1;visibility:visible;color:" onclick="switchPart3DView(this.value)" value="bottom(xy)" disabled="disabled"></td>';
// 	 inputs += '<td width="25px"><input id="phy_pv_yz_view" type="button" style="border:1;visibility:visible;color:" onclick="switchPart3DView(this.value)" value="front(yz)" disabled="disabled"></td>';
// 	 inputs += '<td width="25px"><input id="phy_pv_xz_view" type="button" style="border:1;visibility:visible;color:" onclick="switchPart3DView(this.value)" value="left(xz)" disabled="disabled"></td>';
// 	 
// 	 inputs += '<td></td><td width="150px"> <button id="return_to_model" type="button" value="model" onclick="switchToPhysicalView()">Model</button></td>';
// 
// 	 inputs += '<td width="50px">' + setModelMenuPart(curModel) + '</td><td width="50px"></td>';
//	 if(physicalModelView == 'parent' ) {
//		// physicalModelView == 'parent'		
//		 inputs += '<td width="150px"> <button id="part_child" type="button" value="child" onclick="switchPartDisplay(this.value)">View Child Parts</button></td>';
//	 }else {
//		// physicalModelView == 'child'		
//		inputs += '<td width="150px"><button  id="part_child"  type="button" value="parent" onclick="switchPartDisplay(this.value)">View Parent Parts</button></td>';
//	 }
//	 inputs += '<td width="50px"><button id="part_grid_button" type="button" value="Grid" onclick="toShowGrid(this.value)">Grid</button></td>';
//	 inputs += '<td width="50px" onclick="toMove()"><img id="img_move" title="Move" src="/webgui/assets/img/icons/hand.png"></td>';
//	 inputs += '<td width="50px" onclick="toZoomIn()"><img id="img_zmin" title="Zoom In" src="/webgui/assets/img/icons/zmin.png"></td>';
//     inputs += '<td width="50px" onclick="toZoomOut()"><img id="img_zmou" title="Zoom Out" src="/webgui/assets/img/icons/zmou.png"></td>';
//	 inputs += '</tr></table></div>';
//	 
//	 $('#toolbar_romenext').empty();
// 	 document.getElementById('toolbar_romenext').innerHTML = inputs;  
}
//==================================================================================
function toShowGrid(needGrid) {
	
	var partGridButton = document.getElementById("part_grid_button");
	if (needGrid == "Grid") {
		partGridButton.value = "NonGrid";
		partGridButton.innerHTML = "NonGrid";
		gridOnOff = false;
	} else {
		partGridButton.value = "Grid";
		partGridButton.innerHTML = "Grid";
		gridOnOff = true;
	}
	showGrid("pdpvsvg");
	
}
//===========================================================================================================================
function switchToViewParts(){
	if(prev_img) {
		prev_img.src = img_path + 'model_icons/view.png';
	}
	// should check listTypeIds instead of curType
	if((curType != null)&&(curModel !=null)&& (curModelShapes.length != 0)){             // a model is selected but there might be no shapes yet
		document.getElementById("pdsv").style.display = "none";
		document.getElementById("grid-types").style.visibility = "visible";
		document.getElementById("grid-models").style.visibility = "hidden";
		document.getElementById("pdpv").style.display = "block";
//		loadPartView();                           //              load curParts for the selected model
//		resetPartsToDisplay();                    //              reset curParts based on the  'physicalModelView'  variable
//		displayPartInfo(curParts, true);		  //              display the parts 		
//		createPVToolBarForPartsView();
		LoadingPartInterface();
	}else {
		PlaySound();
		$('#console-log').append("<p style='color:red'>Error: No Type/Model selected to display Parts</p>");
		console.log("No Model selected to display Parts");
		}
}
//======================================================================================================
function resetPartsToDisplay(){
	//  uses CurParts loaded  ==== and curModelProperties ==   and == global variable  physicalModelView
	// determine which view in Part 
	var parentChild = null;
    if (physicalModelView == 'parent') {
    	parentChild = 1
    } else if (physicalModelView == 'child') {
    	parentChild = 3
    }
    // find all properties related to model and view selected (is it a parent or child)
    console.log(" All properties related to this model =====      " +curModelProperties);
    var mp= [];
     for(i=0; i<curModelProperties.length; i++){
    	 if(curModelProperties[i].parentChild == parentChild){
    		 mp.push(curModelProperties[i]);
    	 }
     }
     console.log(" properties found for this model and parts are : "+ mp);
     // filter the parts  based on properties associated with "parentChild" value
     var cparts=[];
     for(i=0; i<curParts.length; i++){
    	 for(j=0; j<mp.length; j++){
    		 if(mp[j].id  == curParts[i].modelPropertyId ){
    			 cparts.push(curParts[i]);
    		 }
    	 }
     }
     console.log("   cparts are "+ cparts);
     curParts = cparts;                                   // reset current parts only to the subset 
}
//==========================================================================================================
function LoadingPartInterface(){
	view3D = 'xy';
	defaultXYPlaneColor = "#00ccff";
	defaultYZPlaneColor = "";
	defaultXZPlaneColor = "";
	loadPartView();                           //              load all curParts for the selected model
	resetPartsToDisplay();                    //              reset curParts based on the  'physicalModelView'  variable
	displayPartInfo(curParts, true);		  //              display the parts 
	createPVToolBarForPartsView();
}

//========================================================================================
function PlaySound() {
    var sound = document.getElementById("audio");
    sound.play()
}

function create3DPhyViews() {

}
