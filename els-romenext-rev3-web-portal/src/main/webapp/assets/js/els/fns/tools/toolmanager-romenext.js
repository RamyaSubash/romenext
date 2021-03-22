function toolbarManagerRomeNext() {
	
	this.createSingleTool = function(tool, toolContainer) {
		
		if (tool.className) {
			toolContainer.className = tool.className;
		}
		
		if (tool.id) {
			toolContainer.id = tool.id;
		}
		
		if (tool.action) {
			toolContainer.addEventListener("click", tool.action, false);
		}
		
		if (tool.html) {
			toolContainer.innerHTML = tool.html;
		}
		
		if (tool.value) {
			toolContainer.value = tool.value;
		}
		
		if (tool.tag) {
			var innerTool = document.createElement(tool.tag);
			if (tool.innerId) {
				innerTool.id = tool.innerId;
			}
			if (tool.innerType) {
				innerTool.type = tool.innerType;
			}
			if (tool.innerTitle) {
				innerTool.title = tool.innerTitle;
			}
			if (tool.innerSrc) {
				innerTool.src = tool.innerSrc;
			}
			if (tool.innerValue) {
				innerTool.value = tool.innerValue;
			}
			if (tool.innerHTML) {
				innerTool.innerHTML = tool.innerHTML;
			}
			if (tool.innerDisplay) {
				innerTool.style.display = tool.innerDisplay;
			}
			if (tool.innerVisibility) {
				innerTool.style.visibility = tool.innerVisibility;
			}
			if (tool.innerColor) {
				innerTool.style.color = tool.innerColor;
			}
			if (tool.innerDisabled) {
				innerTool.disabled = tool.innerDisabled;
			}
			if (tool.innerAction) {
				innerTool.addEventListener("click", tool.innerAction, false);
			}
			toolContainer.appendChild(innerTool);
		}
		
	};
	
	this.createToolBar = function(div, toolBarType, className, tools) {
		
		var toolBar = document.createElement(toolBarType); // tool bar table
		toolBar.className = className;
		
		var toolSet = toolBar.insertRow(0); // row in tool bar table
	    
		for (var i = 0; i < tools.length; i++) {
			var toolContainer = toolSet.insertCell(i);
			this.createSingleTool(tools[i], toolContainer);
		}

		div.appendChild(toolBar); // put tool bar into the div for tool bar
		
	};
	
	// for logical design
	this.createDesignTool = function() {
		
		var toolBar = document.createElement('div');
		
		var tools = [];
		tools.push({className:'tdicon', action:savePosition, tag:'input', innerId:'design_logical_save', innerType:'image', innerTitle:'save', innerSrc:'/webgui/assets/img/icons/save.png'});
		tools.push({className:'tdicon', action:DesignCytoscapeUtils.restoreLayout, tag:'input', innerId:'design_logical_restore', innerType:'image', innerTitle:'restore', innerSrc:'/webgui/assets/img/icons/restore.png'});
		tools.push({className:'tdicon', action:DesignCytoscapeUtils.resetLayout, tag:'input', innerId:'design_logical_reset', innerType:'image', innerTitle:'reset', innerSrc:'/webgui/assets/img/icons/toggle.png'});
		tools.push({className:'tdicon', action:DesignCytoscapeUtils.previousLayout, tag:'input', innerId:'design_logical_back', innerType:'image', innerTitle:'back', innerSrc:'/webgui/assets/img/icons/back.png'});
		tools.push({className:'tdicon', action:centerGraph, tag:'input', innerId:'design_logical_center', innerType:'image', innerTitle:'center', innerSrc:'/webgui/assets/img/fit.png'});
		var tmpFunc2 = function(){
			toggleElementName(tdvCy, 'showhide_node_id', 'node', this.value);
		}
		tools.push({className:'tdicon', id:'showhide_node_id', value:'hide', action:tmpFunc2, tag:'input', innerId:'design_logical_toggle_type', innerType:'image', innerTitle:'toggle type', innerSrc:'/webgui/assets/img/type_node_toggle.png'});
		var tmpFunc = function(){
			toggleElementName(tdvCy, 'showhide_conn_id', 'edge', this.value);
		}
		tools.push({className:'tdicon', id:'showhide_conn_id', value:'hide', action:tmpFunc, tag:'input', innerId:'design_logical_toggle_connection', innerType:'image', innerTitle:'toggle connection', innerSrc:'/webgui/assets/img/conn_edge_toggle.png'});
		
		var tmpFunc3 = function(){
			
			var edges = tdvCy.filter('edge');
			var elements = [];
			
			$.each(edges, function( index, value ) {
				
				var sourceType = typeMapViaId[value.data().source];
				var targetType = typeMapViaId[value.data().target];
				if (sourceType.classification == 'path' && targetType.classification == 'node') {
					elements.push(value);
				}
			});
			
			toggleElement('showhide_conn_between_path_and_node_id', elements, this.value);
		}
		tools.push({className:'tdicon', id:'showhide_conn_between_path_and_node_id', value:'hide', action:tmpFunc3, tag:'input', innerId:'design_logical_toggle_connection_between_path_and_node', innerType:'image', innerTitle:'toggle connection between path and node', innerSrc:'/webgui/assets/img/conn_edge_between_path_and_node_toggle.png'});
		
		this.createToolBar(toolBar, 'TABLE', 'toolbar_table', tools);
		
		$('#toolbar_romenext').empty();
		document.getElementById('toolbar_romenext').appendChild(toolBar);
		

	
	};
	
	// for all decos of display
	this.createDisplayTool = function() {
		
		var toolBar = document.createElement('div');
		
		var tools = [];
		if (selecteddecorator == 'Geo') {
			tools.push({className:'tdicon', action:saveMapPosition, tag:'input', innerId:'saveMapIcon', innerType:'image', innerTitle:'save', innerSrc:'/webgui/assets/img/icons/save.png'});
			tools.push({className:'tdicon', action:restoreMapPosition, tag:'input', innerId:'restoreMapIcon', innerType:'image', innerTitle:'restore', innerSrc:'/webgui/assets/img/icons/restore.png'});
			tools.push({className:'tdicon', action:previousMapPosition, tag:'input', innerId:'previousMapIcon', innerType:'image', innerTitle:'back', innerSrc:'/webgui/assets/img/icons/back.png'});
			tools.push({className:'tdicon', action:centerMap, tag:'input', innerId:'display_geo_center', innerType:'image', innerTitle:'center', innerSrc:'/webgui/assets/img/fit.png'});
			tools.push({className:'tdicon', action:cancelEdgeCreation, tag:'input', innerId:'display_geo_cancel', innerType:'image', innerTitle:'cancel', innerSrc:'/webgui/assets/img/cancelrule.png'});
		} else if (selecteddecorator == 'Logical') {
			tools.push({className:'tdicon', action:saveLogicalPosition, tag:'input', innerId:'display_logical_save', innerType:'image', innerTitle:'save', innerSrc:'/webgui/assets/img/icons/save.png'});
			tools.push({className:'tdicon', action:restoreLogicalLayout, tag:'input', innerId:'display_logical_restore', innerType:'image', innerTitle:'restore', innerSrc:'/webgui/assets/img/icons/restore.png'});
			tools.push({className:'tdicon', action:resetLogicalLayout, tag:'input', innerId:'display_logical_reset', innerType:'image', innerTitle:'reset', innerSrc:'/webgui/assets/img/icons/toggle.png'});
			tools.push({className:'tdicon', action:previousLogicalLayout, tag:'input', innerId:'display_logical_back', innerType:'image', innerTitle:'back', innerSrc:'/webgui/assets/img/icons/back.png'});
			tools.push({className:'tdicon', action:centerGraph, tag:'input', innerId:'display_logical_center', innerType:'image', innerTitle:'center', innerSrc:'/webgui/assets/img/fit.png'});
						
			var tmpFunc1 = function(){
				toggleElementNameDisplay(irvCy, 'showhide_node_id', 'node', this.value);
			}
			tools.push({className:'tdicon', id:'showhide_node_id', value:'hide', action:tmpFunc1, tag:'input', innerId:'display_logical_toggle_node', innerType:'image', innerTitle:'toggle node', innerSrc:'/webgui/assets/img/type_node_toggle.png'});
			
			var tmpFunc2 = function(){
				toggleElementNameDisplay(irvCy, 'showhide_edge_id', 'edge', this.value);
			}
			tools.push({className:'tdicon', id:'showhide_edge_id', value:'hide', action:tmpFunc2, tag:'input', innerId:'display_logical_toggle_edge', innerType:'image', innerTitle:'toggle edge', innerSrc:'/webgui/assets/img/conn_edge_toggle.png'});
				
			var tmpFunc3 = function(){
				
				var edges = irvCy.filter('edge');
				var elements = [];
				
				$.each(edges, function( index, value ) {
					var connection = connMapViaId[value.data().connectionId];
					var sourceType = typeMapViaId[connection.source];
					var targetType = typeMapViaId[connection.target];
					if (sourceType.classification == 'path' && targetType.classification == 'node') {
						elements.push(value);
					}
				});
				
				toggleElementDisplay('showhide_edge_between_path_and_node_id', elements, this.value);
			}
			tools.push({className:'tdicon', id:'showhide_edge_between_path_and_node_id', value:'hide', action:tmpFunc3, tag:'input', innerId:'display_logical_toggle_edge_between_path_and_node', innerType:'image', innerTitle:'toggle edge between path and node', innerSrc:'/webgui/assets/img/conn_edge_between_path_and_node_toggle.png'});
			
//			var tmpFunc = function(){
//				toggleElementName(irvCy, 'showhide_edge_id', 'edge', this.value);
//			}
//			tools.push({className:'tdicon', id:'showhide_edge_id', value:'hide', action:tmpFunc, tag:'input', innerId:'display_logical_toggle_edge', innerType:'image', innerTitle:'toggle edge', innerSrc:'/webgui/assets/img/design_icons/conn_toggle.png'});			
//			tools.push({className:'tdicon', action:cancelEdgeCreation, tag:'input', innerId:'display_logical_cancel', innerType:'image', innerTitle:'cancel', innerSrc:'/webgui/assets/img/cancelrule.png'});
			tools.push({className:'tdicon', action:cancelNodeConnection, tag:'input', innerId:'display_logical_cancel', innerType:'image', innerTitle:'cancel', innerSrc:'/webgui/assets/img/cancelrule.png'});
			tmpFunc = function(){
				switchDeco('Physical');
			}
			
			tools.push({className:'tdicon', action:RetunUplevel, tag:'input', innerId:'display_logical_return', innerType:'image', innerTitle:'return', innerSrc:'/webgui/assets/img/Up-icon.png', innerVisibility:'hidden'});
//			tools.push({className:'tdicon', action:tmpFunc, tag:'input', innerId:'display_logical_switch', innerType:'button', innerTitle:'switch', innerValue:'Switch Physical'});
		} else if (selecteddecorator == 'Physical') {
			var tmpFunc = function(){
				showGrid('phy_dspl_view_svg');
			}
			tools.push({className:'tdicon', action:tmpFunc, tag:'input', innerId:'display_physical_grid', innerType:'image', innerTitle:'grid', innerSrc:'/webgui/assets/img/display_icons/grid.jpg'});
			tools.push({className:'tdicon', action:savePhysicalPosition, tag:'input', innerId:'display_physical_save', innerType:'image', innerTitle:'save', innerSrc:'/webgui/assets/img/icons/save.png'});
			tools.push({className:'tdicon', action:restorePhysicalLayout, tag:'input', innerId:'display_physical_restore', innerType:'image', innerTitle:'restore', innerSrc:'/webgui/assets/img/icons/restore.png'});
			tools.push({className:'tdicon', action:resetPhysicalLayout, tag:'input', innerId:'display_physical_reset', innerType:'image', innerTitle:'reset', innerSrc:'/webgui/assets/img/icons/toggle.png'});
			tools.push({className:'tdicon', action:previousPhysicalLayout, tag:'input', innerId:'display_physical_back', innerType:'image', innerTitle:'back', innerSrc:'/webgui/assets/img/icons/back.png'});
			tools.push({className:'tdicon', action:centerPhysicalGraph, tag:'input', innerId:'display_physical_center', innerType:'image', innerTitle:'center', innerSrc:'/webgui/assets/img/fit.png'});
			tools.push({className:'tdicon', action:cancelPhysicalEdgeCreation, tag:'input', innerId:'display_physical_cancel', innerType:'image', innerTitle:'cancel', innerSrc:'/webgui/assets/img/cancelrule.png'});
			
			tools.push({className:'tdicon', action:toMovePart, tag:'img', innerId:'img_move', innerType:'image', innerTitle:'move', innerSrc:'/webgui/assets/img/icons/hand.png'});
			tmpFunc = function(){
				switchDeco('Logical');
			}
			tools.push({className:'tdicon', action:tmpFunc, tag:'input', innerId:'display_physical_switch', type:'button', innerTitle:'switch', innerValue:'Switch Logical'});
			tools.push({className:'tdicon', action:loadChildPartNodes, tag:'button', innerId:'view_part_child_node_button', type:'button', innerTitle:'pc', innerValue:'child', innerHTML:'View Children'});
			
		}

		this.createToolBar(toolBar, 'TABLE', 'toolbar_table', tools);
		
		$('#toolbar_romenext').empty();
		document.getElementById('toolbar_romenext').appendChild(toolBar);
		
//		var inputs ='';
//		inputs +=  '<div><table class="toolbar_table"><tr>';
//		if (selecteddecorator == 'Geo') {
//			inputs +=  '<td width="50px" onclick="saveMapPosition()"><input  type="image" id="saveMapIcon" title="save" src="/webgui/assets/img/icons/save.png" ></td>';
//			inputs +=  '<td width="50px" onclick="restoreMapPosition()"><input  type="image" id="restoreMapIcon" title="restore" src="/webgui/assets/img/icons/restore.png"></td>';
//			inputs +=  '<td width="50px" onclick="previousMapPosition()"><input  type="image" id="previousMapIcon" title="previous" src="/webgui/assets/img/icons/back.png"></td>';
//			inputs +=  '<td width="50px" onclick="centerMap()"><input  type="image"  title="center Map" src="/webgui/assets/img/fit.png"/></td>';
//			inputs +=  '<td width="50px" onclick="cancelEdgeCreation()"><input  type="image" title="cancel_rule" src="/webgui/assets/img/cancelrule.png"/></td>';
//		}else if (selecteddecorator == 'Logical'){
//		    inputs +=  '<td width="50px" onclick="saveLogicalPosition()"><input type="image" title="save" src="/webgui/assets/img/icons/save.png"/></td>';
//		    inputs +=  '<td width="50px" onclick="restoreLogicalLayout()"><input type="image" src="/webgui/assets/img/icons/restore.png" title="restore" /></td>';
//		    inputs +=  '<td width="50px" onclick="resetLogicalLayout()"><input type="image" title="toggle" src="/webgui/assets/img/icons/toggle.png"/></td>';
//		    inputs +=  '<td width="50px" onclick="previousLogicalLayout()"><input type="image" title="back" src="/webgui/assets/img/icons/back.png"/></td>';  
//			inputs +=  '<td width="50px" onclick="centerGraph()"><input  type="image"  title="center Graph" src="/webgui/assets/img/fit.png"/></td>';
//			inputs +=  '<td width="50px" onclick="cancelEdgeCreation()" ><input  type="image" title="cancel_rule" src="/webgui/assets/img/cancelrule.png"/></td>';
//			inputs +=  '<td width="50px" onclick="switchDeco(\'Physical\')" ><input type="button" style="border:1;" value="Switch Physical"/></td>';
//			inputs +=  '<td width="50px" onclick="RetunUplevel()"><input  type="image" title="Go Up" src="/webgui/assets/img/arrow-down.png" width="30px" height="30px"></td>';  
//			
//		} else if (selecteddecorator == 'Physical') {
//			var v = "phy_dspl_view_svg";
//			inputs +=  '<td width="50px" onclick="showGrid('+v+')"><input type="image" title="grid" src="/webgui/assets/img/display_icons/grid.jpg"/></td>';
//		    inputs +=  '<td width="50px" onclick="savePhysicalPosition()"><input type="image" title="save" src="/webgui/assets/img/icons/save.png"/></td>';
//		    inputs +=  '<td width="50px" onclick="restorePhysicalLayout()"><input type="image" title="restore" src="/webgui/assets/img/icons/restore.png"/></td>';
//		    inputs +=  '<td width="50px" onclick="resetPhysicalLayout()"><input type="image" title="toggle" src="/webgui/assets/img/icons/toggle.png"/></td>';
//		    inputs +=  '<td width="50px" onclick="previousPhysicalLayout()"><input type="image" title="back" src="/webgui/assets/img/icons/back.png"/></td>';  
//			inputs +=  '<td width="50px" onclick="centerPhysicalGraph()"><input  type="image"  title="center" src="/webgui/assets/img/fit.png"/></td>';
//			inputs +=  '<td width="50px" onclick="cancelPhysicalEdgeCreation()" ><input  type="image" title="cancel" src="/webgui/assets/img/cancelrule.png"/></td>';
//			
//			inputs += '<td width="50px" onclick="toMovePart()"><img id="img_move" title="Move" src="/webgui/assets/img/icons/hand.png"></td>';
//			inputs +=  '<td width="50px" onclick="switchDeco(\'Logical\')" ><input type="button" style="border:1;" value="Switch Logical"/></td>';
//			inputs += '<td><button id="view_part_child_node_button" type="button" value="child" onclick="loadChildPartNodes()">View Children</button></td>';
//		}
		          
//		inputs +=  '<td width="100px"  >';
//		inputs +=  '<select valign="baseline"  id="decoSwitcher" onchange="switchDeco(this.value)">';
//		inputs +=  '<option>Select Deco</option>';
//		inputs +=  '	<option value="Logical">Logical</option>';
//		inputs +=  '	<option value="Physical">Physical</option>';
////		inputs +=  '	<option value="Geo">Geo</option>';
////		inputs +=  '	<option value="Textual">Textual</option>';
//		inputs +=  '</select>';

//		inputs +=  '</td><td width="150px"></td></tr></table></div>';
//		inputs +=  '</tr></table></div>';
//		 $('#toolbar_romenext').empty();
//		document.getElementById('toolbar_romenext').innerHTML = inputs;
		
	};
	
	// for physical design
	this.createPhyTool = function() {
		
		var toolBar = document.createElement('div');
		
		var tools = [];
		var visibility;
		if (curModel == null) {
			visibility = 'hidden';
		} else {
			visibility = '';
		}
		
		var tmpFunc = function(){
			switchPy3DView(this.value);
		}
		tools.push({className:'tdbutton', innerAction:tmpFunc, tag:'input', innerId:'phy_xy_view', innerType:'button', innerTitle:'xy', innerValue:'bottom(xy)', innerVisibility:visibility, innerColor:defaultXYPlaneColor});
		tools.push({className:'tdbutton', innerAction:tmpFunc, tag:'input', innerId:'phy_yz_view', innerType:'button', innerTitle:'yz', innerValue:'front(yz)', innerVisibility:visibility, innerColor:defaultYZPlaneColor});
		tools.push({className:'tdbutton', innerAction:tmpFunc, tag:'input', innerId:'phy_xz_view', innerType:'button', innerTitle:'xz', innerValue:'left(xz)', innerVisibility:visibility, innerColor:defaultXZPlaneColor});
		
		if (curModels.length >0) {
			tools.push({className:'tdicon', html:createModelDropdownMenu()});
			tools.push({className:'tdicon'});
			tools.push({className:'tdicon', tag:'input', innerAction:switchToViewParts, innerId:'design_physical_switch_parts', innerType:'button', innerValue:'View Parts'});
			tools.push({className:'tdicon'});
				
			tools.push({className:'tdicon', action:toDrawGrid, tag:'img', innerId:'img_grid', innerTitle:'Construction Line', innerSrc:'/webgui/assets/img/icons/grid.png'});
			tools.push({className:'tdicon', action:toDrawCirc, tag:'img', innerId:'img_circ', innerTitle:'Circle Construction Line', innerSrc:'/webgui/assets/img/icons/circ.png'});
			tools.push({className:'tdicon', action:toDrawText, tag:'img', innerId:'img_text', innerTitle:'Text', innerSrc:'/webgui/assets/img/icons/text.png'});
			tools.push({className:'tdicon', action:toDrawRcfl, tag:'img', innerId:'img_rcfl', innerTitle:'Rectangle', innerSrc:'/webgui/assets/img/icons/rcfl.png'});
			tools.push({className:'tdicon', action:toDrawContour, tag:'img', innerId:'img_cntr', innerTitle:'Contour', innerSrc:'/webgui/assets/img/icons/cntr.png'});
			tools.push({className:'tdicon', action:toMove, tag:'img', innerId:'img_move', innerTitle:'Move', innerSrc:'/webgui/assets/img/icons/hand.png'});
			tools.push({className:'tdicon', action:toZoomIn, tag:'img', innerId:'img_zmin', innerTitle:'Zoom In', innerSrc:'/webgui/assets/img/icons/zmin.png'});
			tools.push({className:'tdicon', action:toZoomOut, tag:'img', innerId:'img_zmou', innerTitle:'Zoom Out', innerSrc:'/webgui/assets/img/icons/zmou.png'});
			tools.push({className:'tdicon', action:toAdjust, tag:'img', innerId:'img_ajst', innerTitle:'Adjust', innerSrc:'/webgui/assets/img/icons/ajst.png'});
			
			tools.push({className:'tdicon', action:toEdit, tag:'img', innerId:'img_edit', innerTitle:'Add Model', innerDiaply:'none', innerSrc:'/webgui/assets/img/icons/edit.png'});
			tools.push({className:'tdicon', action:toDrawAngleLine, tag:'img', innerId:'img_aline', innerTitle:'Angle Construction Line', innerDisplay:'none', innerSrc:'/webgui/assets/img/icons/line.png'});
			
			tools.push({id:'physicalParentChildSwitcher'});

		}
		
		this.createToolBar(toolBar, 'TABLE', 'toolbar_table', tools);
		$('#toolbar_romenext').empty();
		document.getElementById('toolbar_romenext').appendChild(toolBar);
		
//		var inputs ='';
//		inputs += '<div><table  class="toolbar_table"><tr>';
	//	
//		if (curModel == null) {
//			if (view3D == 'xy') {
//				inputs += '<td width="25px"><input id="phy_xy_view" type="button" style="border:1;visibility:hidden;color:#00ccff" onclick="switchPy3DView(this.value)" value="bottom(xy)"></td>';
//				inputs += '<td width="25px"><input id="phy_yz_view" type="button" style="border:1;visibility:hidden;color:" onclick="switchPy3DView(this.value)" value="front(yz)"></td>';
//				inputs += '<td width="25px"><input id="phy_xz_view" type="button" style="border:1;visibility:hidden;color:" onclick="switchPy3DView(this.value)" value="left(xz)"></td>';
//			} else if (view3D == 'yz') {
//				inputs += '<td width="25px"><input id="phy_xy_view" type="button" style="border:1;visibility:hidden;color:" onclick="switchPy3DView(this.value)" value="bottom(xy)"></td>';
//				inputs += '<td width="25px"><input id="phy_yz_view" type="button" style="border:1;visibility:hidden;color:#42f465" onclick="switchPy3DView(this.value)" value="front(yz)"></td>';
//				inputs += '<td width="25px"><input id="phy_xz_view" type="button" style="border:1;visibility:hidden;color:" onclick="switchPy3DView(this.value)" value="left(xz)"></td>';
//			} else if (view3D == 'xz') {
//				inputs += '<td width="25px"><input id="phy_xy_view" type="button" style="border:1;visibility:hidden;color:" onclick="switchPy3DView(this.value)" value="bottom(xy)"></td>';
//				inputs += '<td width="25px"><input id="phy_yz_view" type="button" style="border:1;visibility:hidden;color:" onclick="switchPy3DView(this.value)" value="front(yz)"></td>';
//				inputs += '<td width="25px"><input id="phy_xz_view" type="button" style="border:1;visibility:hidden;color:#800080" onclick="switchPy3DView(this.value)" value="left(xz)"></td>';
//			}
////			inputs += '<td width="25px"><input id="phy_xy_view" type="button" style="border:1;visibility:hidden;color:#42f465" onclick="switchPy3DView(this.value)" value="bottom(xy)"></td>';
////			inputs += '<td width="25px"><input id="phy_yz_view" type="button" style="border:1;visibility:hidden;color:" onclick="switchPy3DView(this.value)" value="front(yz)"></td>';
////			inputs += '<td width="25px"><input id="phy_xz_view" type="button" style="border:1;visibility:hidden;color:" onclick="switchPy3DView(this.value)" value="left(xz)"></td>';
//		} else {
//			if (view3D == 'xy') {
//				inputs += '<td width="25px"><input id="phy_xy_view" type="button" style="border:1;visibility:visible;color:#00ccff" onclick="switchPy3DView(this.value)" value="bottom(xy)"></td>';
//				inputs += '<td width="25px"><input id="phy_yz_view" type="button" style="border:1;visibility:visible;color:" onclick="switchPy3DView(this.value)" value="front(yz)"></td>';
//				inputs += '<td width="25px"><input id="phy_xz_view" type="button" style="border:1;visibility:visible;color:" onclick="switchPy3DView(this.value)" value="left(xz)"></td>';
//			} else if (view3D == 'yz') {
//				inputs += '<td width="25px"><input id="phy_xy_view" type="button" style="border:1;visibility:visible;color:" onclick="switchPy3DView(this.value)" value="bottom(xy)"></td>';
//				inputs += '<td width="25px"><input id="phy_yz_view" type="button" style="border:1;visibility:visible;color:#42f465" onclick="switchPy3DView(this.value)" value="front(yz)"></td>';
//				inputs += '<td width="25px"><input id="phy_xz_view" type="button" style="border:1;visibility:visible;color:" onclick="switchPy3DView(this.value)" value="left(xz)"></td>';
//			} else if (view3D == 'xz') {
//				inputs += '<td width="25px"><input id="phy_xy_view" type="button" style="border:1;visibility:visible;color:" onclick="switchPy3DView(this.value)" value="bottom(xy)"></td>';
//				inputs += '<td width="25px"><input id="phy_yz_view" type="button" style="border:1;visibility:visible;color:" onclick="switchPy3DView(this.value)" value="front(yz)"></td>';
//				inputs += '<td width="25px"><input id="phy_xz_view" type="button" style="border:1;visibility:visible;color:#800080" onclick="switchPy3DView(this.value)" value="left(xz)"></td>';
//			}
////			inputs += '<td width="25px"><input id="phy_xy_view" type="button" style="border:1;visibility:visible;color:#42f465" onclick="switchPy3DView(this.value)" value="bottom(xy)"></td>';
////			inputs += '<td width="25px"><input id="phy_yz_view" type="button" style="border:1;visibility:visible;color:" onclick="switchPy3DView(this.value)" value="front(yz)"></td>';
////			inputs += '<td width="25px"><input id="phy_xz_view" type="button" style="border:1;visibility:visible;color:" onclick="switchPy3DView(this.value)" value="left(xz)"></td>';
//		}	
////		inputs += '<td width="25px"><input id="phy_xy_view" type="button" style="border:1;visibility:hidden;" onclick="switchPy3DView(this.value)" value="bottom(xy)"></td>';
////		inputs += '<td width="25px"><input id="phy_yz_view" type="button" style="border:1;visibility:hidden;" onclick="switchPy3DView(this.value)" value="front(yz)"></td>';
////		inputs += '<td width="25px"><input id="phy_xz_view" type="button" style="border:1;visibility:hidden;" onclick="switchPy3DView(this.value)" value="left(xz)"></td>';
	//	
//		inputs += '<td width="50px" onclick="addNewModel()"><img title="Add Model" src="/webgui/assets/img/icons/add.png"></td>';
//		// If no model created yet This part will not show
//		if(curModels.length >0){
//			inputs += '<td width="50px">' + createModelDropdownMenu() + '</td><td width="50px"></td>';
//			inputs += '<td width="50px"><input type="button" style="border:1;" onclick="switchToViewParts()" value="View Parts"></td><td width="50px"></td>';
//			inputs += '<td width="50px" onclick="toDrawGrid()"><img id="img_grid" title="Construction Line" src="/webgui/assets/img/icons/grid.png"></td>';
//			inputs += '<td width="50px" onclick="toDrawCirc()"><img id="img_circ" title="Circle Construction Line" src="/webgui/assets/img/icons/circ.png"></td>';
//			inputs += '<td width="50px" onclick="toDrawText()"><img id="img_text" title="Text" src="/webgui/assets/img/icons/text.png"></td>';
//			inputs += '<td width="50px" onclick="toDrawRcfl()"><img id="img_rcfl" title="Rectangle" src="/webgui/assets/img/icons/rcfl.png"></td>';
//			inputs += '<td width="50px" onclick="toDrawContour()"><img id="img_cntr" title="Contour" src="/webgui/assets/img/icons/cntr.png"></td>';
//			inputs += '<td width="50px" onclick="toMove()"><img id="img_move" title="Move" src="/webgui/assets/img/icons/hand.png"></td>';
//			inputs += '<td width="50px" onclick="toZoomIn()"><img id="img_zmin" title="Zoom In" src="/webgui/assets/img/icons/zmin.png"></td>';
//			inputs += '<td width="50px" onclick="toZoomOut()"><img id="img_zmou" title="Zoom Out" src="/webgui/assets/img/icons/zmou.png"></td>';
//			inputs += '<td width="50px" onclick="toAdjust()"><img id="img_ajst" title="Adjust" src="/webgui/assets/img/icons/ajst.png"></td>';
//			inputs += '<td width="50px" onclick="toEdit()"><img id="img_edit" title="Edit Model" style="display:none;" src="/webgui/assets/img/icons/edit.png"></td>';
//			inputs += '<td width="50px" onclick="toDrawAngleLine()"><img id="img_aline" title="Angle Construction Line" style="display:none;" src="/webgui/assets/img/icons/line.png"></td>';
//			inputs +=  '<td id="physicalParentChildSwitcher"></td></tr>';	
//		}
	//	
//		inputs += '</table></div>';
//		 $('#toolbar_romenext').empty();
//		document.getElementById('toolbar_romenext').innerHTML = inputs;
		
	};
	
	// for physical design part view
	this.createPVToolBarForPartsView = function() {
		
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
		
		this.createToolBar(toolBar, 'TABLE', 'toolbar_table', tools);
		$('#toolbar_romenext').empty();
		document.getElementById('toolbar_romenext').appendChild(toolBar);
				
//	     var inputs ='';
//	 	 inputs = '<div><table  class="toolbar_table"><tr>';
//	 	 inputs += '<td width="25px"><input id="phy_pv_xy_view" type="button" style="border:1;visibility:visible;color:" onclick="switchPart3DView(this.value)" value="bottom(xy)" disabled="disabled"></td>';
//	 	 inputs += '<td width="25px"><input id="phy_pv_yz_view" type="button" style="border:1;visibility:visible;color:" onclick="switchPart3DView(this.value)" value="front(yz)" disabled="disabled"></td>';
//	 	 inputs += '<td width="25px"><input id="phy_pv_xz_view" type="button" style="border:1;visibility:visible;color:" onclick="switchPart3DView(this.value)" value="left(xz)" disabled="disabled"></td>';
//	 	 
//	 	 inputs += '<td></td><td width="150px"> <button id="return_to_model" type="button" value="model" onclick="switchToPhysicalView()">Model</button></td>';
	// 
//	 	 inputs += '<td width="50px">' + setModelMenuPart(curModel) + '</td><td width="50px"></td>';
//		 if(physicalModelView == 'parent' ) {
//			// physicalModelView == 'parent'		
//			 inputs += '<td width="150px"> <button id="part_child" type="button" value="child" onclick="switchPartDisplay(this.value)">View Child Parts</button></td>';
//		 }else {
//			// physicalModelView == 'child'		
//			inputs += '<td width="150px"><button  id="part_child"  type="button" value="parent" onclick="switchPartDisplay(this.value)">View Parent Parts</button></td>';
//		 }
//		 inputs += '<td width="50px"><button id="part_grid_button" type="button" value="Grid" onclick="toShowGrid(this.value)">Grid</button></td>';
//		 inputs += '<td width="50px" onclick="toMove()"><img id="img_move" title="Move" src="/webgui/assets/img/icons/hand.png"></td>';
//		 inputs += '<td width="50px" onclick="toZoomIn()"><img id="img_zmin" title="Zoom In" src="/webgui/assets/img/icons/zmin.png"></td>';
//	     inputs += '<td width="50px" onclick="toZoomOut()"><img id="img_zmou" title="Zoom Out" src="/webgui/assets/img/icons/zmou.png"></td>';
//		 inputs += '</tr></table></div>';
//		 
//		 $('#toolbar_romenext').empty();
//	 	 document.getElementById('toolbar_romenext').innerHTML = inputs;  
		
	};	
	
}
