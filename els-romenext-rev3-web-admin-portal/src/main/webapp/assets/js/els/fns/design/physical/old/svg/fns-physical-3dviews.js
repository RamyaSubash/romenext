function switchPy3DView(viewChange) {
	if (viewChange == 'bottom(xy)') {
		view3D = 'xy';
		defaultXYPlaneColor = "#00ccff";
		defaultYZPlaneColor = "";
		defaultXZPlaneColor = "";
		document.getElementById('phy_xy_view').style.color = '#00ccff';
		document.getElementById('phy_yz_view').style.color = '';
		document.getElementById('phy_xz_view').style.color = '';
		if (curModel == null) {
			document.getElementById('text1').innerHTML = 'x';
			document.getElementById('text2').innerHTML = 'y';
		} else {
			getModelShapes(curModel);
			refreshShapes();
		}
	} else if (viewChange == 'left(xz)') {
		view3D = 'xz';
		defaultXYPlaneColor = "";
		defaultYZPlaneColor = "";
		defaultXZPlaneColor = "#800080";
		document.getElementById('phy_xy_view').style.color = '';
		document.getElementById('phy_yz_view').style.color = '';
		document.getElementById('phy_xz_view').style.color = '#800080';
		if (curModel == null) {
			document.getElementById('text1').innerHTML = 'x';
			document.getElementById('text2').innerHTML = 'z';
		} else {
			getModelShapes(curModel);
			refreshShapes();
		}
	} else if (viewChange == 'front(yz)') {
		view3D = 'yz';
		defaultXYPlaneColor = "";
		defaultYZPlaneColor = "#42f465";
		defaultXZPlaneColor = "";
		document.getElementById('phy_xy_view').style.color = '';
		document.getElementById('phy_yz_view').style.color = '#42f465';
		document.getElementById('phy_xz_view').style.color = '';
		if (curModel == null) {
			document.getElementById('text1').innerHTML = 'y';
			document.getElementById('text2').innerHTML = 'z';
		} else {
			getModelShapes(curModel);
			refreshShapes();
		}
	} else {
		console.log("Wrong Physical View Name: " + viewChange);
		$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
	}
	drawingStat = 0;
	shape = "";	
	disablePropsForPlanes();
	organizePropModifierList();
}

function organizePropModifierList() {
	
	var propModifierList = document.getElementById("mpmmpt-1");
	
	if (propModifierList.name == "modifier") {
		
		$("#mpmmpt-1 option[value='1']").show();
		$("#mpmmpt-1 option[value='3']").show();
		$("#mpmmpt-1 option[value='5']").show();
		$("#mpmmpt-1 option[value='7']").show();
		$("#mpmmpt-1 option[value='11']").show();
		$("#mpmmpt-1 option[value='17']").show();
		
		if (view3D == 'xy') {
			$("#mpmmpt-1 option[value='11']").hide();
			$("#mpmmpt-1 option[value='17']").hide();
			$("#mpmmpt-1 option[value='1']").attr("selected", "selected");
//			propModifierList.remove(2);
//			propModifierList.remove(5);
		} else if (view3D == 'yz') {
			$("#mpmmpt-1 option[value='1']").hide();
			$("#mpmmpt-1 option[value='5']").hide();
			$("#mpmmpt-1 option[value='3']").attr("selected", "selected");
//			propModifierList.remove(0);
//			propModifierList.remove(3);
		} else if (view3D == 'xz') {
			$("#mpmmpt-1 option[value='3']").hide();
			$("#mpmmpt-1 option[value='7']").hide();
			$("#mpmmpt-1 option[value='1']").attr("selected", "selected");
//			propModifierList.remove(1);
//			propModifierList.remove(4);
		}
		
	}
	
}

function getParentShapeType(shapeParent) {
	
	var shapeType = null;
	for (var i = 0; i < curModelShapes.length; i++) {
		if (curModelShapes[i].id == shapeParent) {
			shapeType = curModelShapes[i].shapeType;
			break;
		}
	}
	return shapeType;
	
}

function switchPart3DView(viewChange) {
	$("#phy_pv_xy_view").removeAttr("disabled");
	$("#phy_pv_yz_view").removeAttr("disabled");
	$("#phy_pv_xz_view").removeAttr("disabled");
	if (viewChange == 'bottom(xy)') {
		view3D = 'xy';
		defaultXYPlaneColor = "#00ccff";
		defaultYZPlaneColor = "";
		defaultXZPlaneColor = "";
		document.getElementById('phy_pv_xy_view').style.color = '#00ccff';
		document.getElementById('phy_pv_yz_view').style.color = '';
		document.getElementById('phy_pv_xz_view').style.color = '';
		viewPart(partPos);
	} else if (viewChange == 'left(xz)') {
		view3D = 'xz';
		defaultXYPlaneColor = "";
		defaultYZPlaneColor = "";
		defaultXZPlaneColor = "#800080";
		document.getElementById('phy_pv_xy_view').style.color = '';
		document.getElementById('phy_pv_yz_view').style.color = '';
		document.getElementById('phy_pv_xz_view').style.color = '#800080';
		viewPart(partPos);
	} else if (viewChange == 'front(yz)') {
		view3D = 'yz';
		defaultXYPlaneColor = "";
		defaultYZPlaneColor = "#42f465";
		defaultXZPlaneColor = "";
		document.getElementById('phy_pv_xy_view').style.color = '';
		document.getElementById('phy_pv_yz_view').style.color = '#42f465';
		document.getElementById('phy_pv_xz_view').style.color = '';
		viewPart(partPos);
	} else {
		console.log("Wrong Physical View Name: " + viewChange);
		$('#console-log').append("<p style='color:blue'>Wrong Physical View Name: " + viewChange + "</p>");
	}
}

function organizeShapesFromOtherPlanes() {
	var verticalLinesToAdjust = [];
	for (var i = 0; i < verticalLines.length; i++) {
		if (verticalLines[i].plane != view3D) {
			verticalLinesToAdjust.push(verticalLines[i]);
		}
	}
	var horizontalLinesToAdjust = [];
	for (var i = 0; i < horizontalLines.length; i++) {
		if (horizontalLines[i].plane != view3D) {
			horizontalLinesToAdjust.push(horizontalLines[i]);
		}
	}
	
	if (verticalLinesToAdjust.length >= 1) {
		for (var i = 0; i < verticalLinesToAdjust.length; i++) {
			adjustShapes(verticalLinesToAdjust[i], "vertical");
		}
	}
	
	if (horizontalLinesToAdjust.length >= 1) {
		for (var i = 0; i < horizontalLinesToAdjust.length; i++) {
			adjustShapes(horizontalLinesToAdjust[i], "horizontal");
		}
	}
}

function getCLineOldValueFromGShapesNotAdjusted(shape, gShape, gShapeType) {
	
	if (shape.plane == "xy") {
		if (view3D == "yz") {
			if (gShapeType == "cntrGroup") {
				return gShape.x1;
			} else if (gShapeType == "textGroup") {
				return gShape.x;
			} else if (gShapeType == "rectGroup") {
				
			} else {
				return null;
			}
		} else if (view3D == "xz") {
			if (gShapeType == "cntrGroup") {
				return gShape.x1;
			} else if (gShapeType == "textGroup") {
				return gShape.x;
			} else if (gShapeType == "rectGroup") {
				
			} else {
				return null;
			}
		} else {
			return null;
		}
	} else if (shape.plane == "yz") {
		if (view3D == "xy") {
			if (gShapeType == "cntrGroup") {
				return gShape.y1;
			} else if (gShapeType == "textGroup") {
				return gShape.y;
			} else if (gShapeType == "rectGroup") {
				
			} else {
				return null;
			}
		} else if (view3D == "xz") {
			if (gShapeType == "cntrGroup") {
				return gShape.y1;
			} else if (gShapeType == "textGroup") {
				return gShape.y;
			} else if (gShapeType == "rectGroup") {
				
			} else {
				return null;
			}
		} else {
			return null;
		}
	} else if (shape.plane == "xz") {
		if (view3D == "xy") {
			if (gShapeType == "cntrGroup") {
				return gShape.x1;
			} else if (gShapeType == "textGroup") {
				return gShape.x;
			} else if (gShapeType == "rectGroup") {
				
			} else {
				return null;
			}
		} else if (view3D == "xz") {
			if (gShapeType == "cntrGroup") {
				return gShape.y1;
			} else if (gShapeType == "textGroup") {
				return gShape.y;
			} else if (gShapeType == "rectGroup") {
				
			} else {
				return null;
			}
		} else {
			return null;
		}
	} else {
		return null;
	}
	
}