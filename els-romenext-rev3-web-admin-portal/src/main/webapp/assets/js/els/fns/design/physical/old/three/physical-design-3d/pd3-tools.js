function create3DPhysicalViewToolBar() {
	
    var inputs ='';
	 inputs = '<div><table  class="toolbar_table"><tr>';
	 inputs += '<td width="50px" onclick="showAddModel3DDialog()"><img title="Add Model" src="/webgui/assets/img/icons/add.png"></td>';
	 if (curModels.length > 0) {
		 inputs += '<td width="50px">' + createModelDropdownMenu3D() + '</td><td width="50px"></td>';
		 
		 inputs += '<td id="xy_3d_plane_td" width="25px" style="display:none"><input id="xy_3d_plane" type="button" style="border:1;visibility:visible;color:rgb(0, 255, 0)" onclick="switch3DPlane(this.value)" value="xy"></td>';
	 	 inputs += '<td id="yz_3d_plane_td" width="25px" style="display:none"><input id="yz_3d_plane" type="button" style="border:1;visibility:visible;color:" onclick="switch3DPlane(this.value)" value="yz"></td>';
	 	 inputs += '<td id="xz_3d_plane_td" width="25px" style="display:none"><input id="xz_3d_plane" type="button" style="border:1;visibility:visible;color:" onclick="switch3DPlane(this.value)" value="xz"></td>';	 	 
		 
	 	 inputs += '<td id="draw_line_td"  width="50px" style="display:none"  onclick="toDrawGrid3D()" ><img id="img_grid" title="Construction Line" src="/webgui/assets/img/icons/grid.png"></td>';
	 	 inputs += '<td id="draw_cntr_td"  width="50px" style="display:none"  onclick="toDrawContour3D()"><img id="img_cntr" title="Contour" src="/webgui/assets/img/icons/cntr.png"></td>';
	 	 inputs += '<td id="draw_rect_td"  width="50px" style="display:none"  onclick="toDrawRectangle3D()"><img id="img_rect" title="Rectangle" src="/webgui/assets/img/icons/rcfl.png"></td>';
	 	 inputs += '<td id="draw_ajust_td" width="50px" style="display:none"  onclick="toAdjust3D()"><img id="img_ajst" title="Adjust" src="/webgui/assets/img/icons/ajst.png"></td>';
		
	 } 
	 inputs += '</tr></table></div>';
	 
	 $('#toolbar_romenext').empty();
	 document.getElementById('toolbar_romenext').innerHTML = inputs;  
}
//========================================================================================
function activatePhysical3DTools() {
	document.getElementById("xy_3d_plane_td").style.display = "";
	document.getElementById("yz_3d_plane_td").style.display = "";
	document.getElementById("xz_3d_plane_td").style.display = "";

	document.getElementById("draw_line_td").style.display = "";
	document.getElementById("draw_cntr_td").style.display = "";
	document.getElementById("draw_rect_td").style.display = "";
	document.getElementById("draw_ajust").style.display = "";
}

function createModelDropdownMenu3D() {
	var input = "";
	input += '<select id="select_model" onchange="loadModelShape3D()"><option value="select model">select model...</option>';
	for (var i = 0; i < curModels.length; i++) {
		input += '<option value="' + curModels[i].name + '">' + curModels[i].name + '</option>';
	}
	input += '</select>';
	return input;
}

function recreateModelDropdownMenu3D() {                                       // List of models should be already displayed
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