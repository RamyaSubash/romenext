/**
 * Show functions Author: Jim Hsiao, Baya Benrachi Date: 31 March 2016 Update:
 * 17 June 2016
 */

// ============== Init landing page
$(document).ready(
		function() {
			GlobalUserGroupUtils.getUserGroup(userGroup.host, userGroup.name,
					loggedInUserName);
			GlobalMetadataRepoUtils.getAllReposByMetadta(selectedMetaData,
					loggedInUserName);

			if (JSON.stringify(selectedMetaDataRepos) != JSON.stringify({})) {

				var count = 0;
				for ( var key in selectedMetaDataRepos) {
					if (count >= 1) {
						break;
					} else {
						selectedMetaDataRepo = key;
						count++;
					}
				}

			}
			
			
			
			GlobalDecoUtils.getDecoByClassificationAndGrouping(
					selectedDecoClassification, selectedDecoGrouping);

//			$('#right_barslide').BootSideMenu({
//				side : "right",
//				autoClose : true, // start closed
//				pushBody : false, // do not push the body page
//				remember : false
//			});
//			document.body.style.cursor = 'progress';
		});

function toggle_visibility(id) {
    var e = document.getElementById(id);
    if(e.style.display == 'block'){
       e.style.display = 'none';
       $("#a_"+id).empty();
       $("#a_"+id).append("<i class='fa fa-toggle-right' style='margin-left: 4px;font-size:24px;color:blue'  ></i>");
    }else{
       e.style.display = 'block';
       $("#a_"+id).empty();
       $("#a_"+id).append("<i class='fa fa-toggle-down' style='margin-left: 4px;font-size:24px;color:blue'  ></i>");
    }
 }




// $(".barheader").click(function() {
// $barheader = $(this);
// $barcontent = $header.next();
// $barcontent.slideToggle(500, function() {
// $barheader.text(function() {
// return $barcontent.is(":visible") ? "Collapse" : "Expand";
// })
// })
// })

// function initUserActions() {
// userActions.tab = topLevelTab;
// userActions.deco = selecteddecorator;
// userActions.view3D = 'xy';
// userActions.prevaction = 'init';
// userActions.currentaction = 'init';
// }
// function updateUserActions() {
// userActions.tab = topLevelTab;
// userActions.deco = selecteddecorator;
// userActions.meta = selectedMetaData;
// }
// //
// =================================================================================
//
// $("#help-div").click(function() {
// activate_help()
// });

// ===============================================================================
function switchDeco(deco) {
	// need to clear the interface
	DesignInterfaceUtils.resetInterface(); // jpl - added this to ensure that
	// any time a switch is done, it
	// clears the interface

	GlobalUtils.generateBreadcrumb(deco);
	updateUserActions();
	switch (deco) {
	case "Logical":
		selecteddecorator = 'Logical';
		$('#console-log').append(
				"<p>Changing to " + selecteddecorator
						+ " View ------- For TAB: " + topLevelTab + "</p>");
		showOrHideModelInfo(false);
		if (topLevelTab == "typeDesignViewTab") {
			if (document.getElementById("grid-models").style.visibility == 'visible')
				document.getElementById("grid-models").style.visibility = "hidden";
			document.getElementById("model_info").style.display = "none";
			document.getElementById("pdpv").style.display = "none";
			document.getElementById("pdsv").style.display = "none";

			reset3DVariables();
			document.getElementById("pv3d").innerHTML = "";
			document.getElementById("pv3d").style.display = "none";

			document.getElementById("typeBar").style.display = "";
			document.getElementById("ruleBar").style.display = "";

			var toolbarManager = new toolbarManagerRomeNext();
			toolbarManager.createDesignTool();
			// createDesignTool();
			document.getElementById("tdvCy").style.display = "block";
			displayIRVCYCoords('tdvCy');
			if (selectedMetaData && selectedMetaData.length != "") {
				if ($("#grid-types").css('visibility') == 'hidden') {
					$("#grid-types").css({
						'visibility' : 'visible'
					});
				}
			}
		} else {
			if (topLevelTab == "instRelViewTab") {
				document.getElementById("mrvCy").style.display = "none";
				var toolbarManager = new toolbarManagerRomeNext();
				toolbarManager.createDisplayTool();
				// createDisplayTool();
				document.getElementById("irvCy").style.display = "block";
				if (irvCy) {
					irvCy.pan({
						x : 230,
						y : 230
					})
				}

				if (selectedMetaData && selectedMetaData.length != "") {
					if ($("#grid-instances").css('visibility') == 'hidden') {
						(new DisplayLogicalRenderer()).emptyAllInst();
						$("#grid-instances").css({
							'visibility' : 'visible'
						});
					}
				}
			}
		}

		break;
	case "Physical":
		if (topLevelTab == "typeDesignViewTab") {
			reset3DVariables();
			document.getElementById("pv3d").innerHTML = "";
			document.getElementById("pv3d").style.display = "none";

			selecteddecorator = 'Physical';
			$('#console-log').append(
					"<p>Changing to " + selecteddecorator
							+ " View ------- For TAB: " + topLevelTab + "</p>");
			document.getElementById("tdvCy").style.display = "none";
			document.getElementById("pdsv").style.display = "block";
			displayIRVCYCoords('pdsv');
			userActions.view3D = 'xy';
			userActions.currentaction = 'drawing';
			view3D = 'xy';
			defaultXYPlaneColor = "#00ccff";
			defaultYZPlaneColor = "";
			defaultXZPlaneColor = "";
			initPhysicalDesignView();
			showOrHideModelInfo(true);
			if (selectedMetaData && selectedMetaData.length != "") {
				if ($("#grid-types").css('visibility') == 'hidden') {
					$("#grid-types").css({
						'visibility' : 'visible'
					});
				}
			}
		} else if (topLevelTab == "instRelViewTab") {
			if ((NodeSelected != null)
					&& (nodeMap[NodeSelected].hasOwnProperty('modelId'))) {
				selecteddecorator = 'Physical';
				$('#console-log').append(
						"<p>Changing to " + selecteddecorator
								+ " View ------- For TAB: " + topLevelTab
								+ "</p>");
				// Prepare the window to display
				document.getElementById("irvCy").style.display = "none";
				document.getElementById("mrvCy").style.display = "none";
				document.getElementById("phy_dspl_view").style.display = "block";
				// Display the bar
				var toolbarManager = new toolbarManagerRomeNext();
				toolbarManager.createDisplayTool();
				// createDisplayTool();
				LD_FocussedNode = nodeMap[NodeSelected];
				if (userActions.currentaction == 'Drilldown') {
					ShowFocussedNode(LD_FocussedNode);
					document.getElementById('drill').disabled = true;
				}
				;
				var canvas = document.getElementById('phy_dspl_view_svg');
				canvas.innerHTML = '';
				childPartsLoaded = false;
				loadNodePartShapes();
				if (selectedMetaData && selectedMetaData.length != "") {
					if ($("#grid-instances").css('visibility') == 'hidden') {
						$("#grid-instances").css({
							'visibility' : 'visible'
						});
					}
				}
			} else {
				$('#nodeForm')
						.append(
								'<br /><p style="color:red"> Select a Node with a model</p>');
				PlaySound();
				console
						.log(" No Current Node selected/ Node selected does not have a model; Cannot switch to Physical Display View");
				$('#console-log')
						.append(
								" No Node selected/Node selected does not have a model; Cannot switch to Physical Display View");
			}
		}
		break;
	case "Geo":
		selecteddecorator = 'Geo';
		$('#console-log').append(
				"<p>Changing to " + selecteddecorator
						+ " View ------- For TAB: " + topLevelTab + "</p>");
		// document.getElementById("irvCy").style.display = "none";
		// document.getElementById("phy_dspl_view").style.display = "none";
		// document.getElementById("pdsv").style.display = "none";
		if (topLevelTab == "typeDesignViewTab") { // / ?????????????????????
			// NOt sure if correct
			document.getElementById("pdsv").style.display = "none";
			var toolbarManager = new toolbarManagerRomeNext();
			toolbarManager.createDesignTool();
			// createDesignTool();
			document.getElementById("tdvCy").style.display = "block";
			if (selectedMetaData && selectedMetaData.length != "") {
				if ($("#grid-types").css('visibility') == 'hidden') {
					$("#grid-types").css({
						'visibility' : 'visible'
					});
				}
			}
		} else {
			document.getElementById("irvCy").style.display = "none";
			document.getElementById("phy_dspl_view").style.display = "none";
			document.getElementById("pdpv").style.display = "none";
			var toolbarManager = new toolbarManagerRomeNext();
			toolbarManager.createDisplayTool();
			// createDisplayTool();
			document.getElementById("mrvCy").style.display = "block";
			generateGeoView();
			if (selectedMetaData && selectedMetaData.length != "") {
				if ($("#grid-instances").css('visibility') == 'hidden') {
					$("#grid-instances").css({
						'visibility' : 'visible'
					});
				}
			}
		}
		break;
	case "textview":
		selecteddecorator = 'textview';
		$('#console-log').append(
				"<p>Changing to " + selecteddecorator
						+ " View ------- For TAB: " + topLevelTab + "</p>");
		// document.getElementById("irvCy").style.display = "none";
		// document.getElementById("phy_dspl_view").style.display = "none";
		// document.getElementById("pdsv").style.display = "none";
		if (topLevelTab == "typeDesignViewTab") { // / ?????????????????????
			// NOt sure if correct
			document.getElementById("pdsv").style.display = "none";
			var toolbarManager = new toolbarManagerRomeNext();
			toolbarManager.createDesignTool();
			// createDesignTool();
			document.getElementById("tdvCy").style.display = "block";
			if (selectedMetaData && selectedMetaData.length != "") {
				if ($("#grid-types").css('visibility') == 'hidden') {
					$("#grid-types").css({
						'visibility' : 'visible'
					});
				}
			}
		} else {
			document.getElementById("irvCy").style.display = "none";
			document.getElementById("phy_dspl_view").style.display = "none";
			document.getElementById("pdpv").style.display = "none";
			var toolbarManager = new toolbarManagerRomeNext();
			toolbarManager.createDisplayTool();
			// createDisplayTool();
			document.getElementById("mrvCy").style.display = "block";
			generateGeoView();
			if (selectedMetaData && selectedMetaData.length != "") {
				if ($("#grid-instances").css('visibility') == 'hidden') {
					$("#grid-instances").css({
						'visibility' : 'visible'
					});
				}
			}
		}
		break;
	default: // not sure what to do !!!!!!!!!!!!!!
		break;
	}

}

// =========================================================================================
// $('#dialog').on("dialogclose", function(event, ui) {
// grayOut(false);
// // selectedObj.hover(hoverIn, hoverOut);
// this.innerHTML = "";
// });
// =========================================================================================
// $(function(){
// var originalWidth =
// parseInt(document.getElementById("romenext_sidebar").offsetWidth);
// $("#romenext_sidebar").resizable({
// minWidth: originalWidth
// });
// });
// =========================================================================================
// function toggleSidebar() {
// document.getElementById("type_window_button").click();
// document.getElementById("instance_window_button").click();
// }
// =========================================================================================
function getPos(el) {
	// yay readability
	for (var lx = 0, ly = 0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent)
		;
	return {
		x : lx,
		y : ly
	};
}
// =========================================================================================
// function displayIRVCYCoords(division) {
// var offsetsTabs = document.getElementById('gvTabContent')
// .getBoundingClientRect();
// var top = offsetsTabs.top;
// var left = offsetsTabs.left;
// console.log("gvTabContent is at top: " + top + " left : " + left);
// var offsets = document.getElementById(division).getBoundingClientRect();
// var top = offsets.top;
// var left = offsets.left;
// console.log(division + " is at top: " + top + " left : " + left);
// }
// //
// =========================================================================================
// function getIRVCYPosition(el) {
// var xPos = 0;
// var yPos = 0;
//
// while (el) {
// if (el.tagName == "BODY") {
// // deal with browser quirks with body/window/document and page
// // scroll
// var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
// var yScroll = el.scrollTop || document.documentElement.scrollTop;
//
// xPos += (el.offsetLeft - xScroll + el.clientLeft);
// yPos += (el.offsetTop - yScroll + el.clientTop);
// } else {
// // for all other non-BODY elements
// xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
// yPos += (el.offsetTop - el.scrollTop + el.clientTop);
// }
//
// el = el.offsetParent;
// }
// return {
// x : xPos,
// y : yPos
// };
// }
//
// function displayDecorator() {
// var nb = Object.keys(decoMap).length;
// var inputs = '';
// if (nb != 0) {
//
// $
// .each(
// decoMap,
// function(key, value) {
// inputs += "<li class='sub-menu'>";
// inputs += "<a href='javascript:;' class=''><i
// class='icon_document_alt'></i>";
// inputs += "<span title='decorators' data-placement='top'
// data-toggle='tooltip' >"
// + key + "</span>";
// // inputs += "<span class='menu-arrow
// // arrow_carrot-right'></span>";
// inputs += " </a></li>";
// });
// $('.sidebar-menu').append(inputs);
// }
//
// }
function init(svgId) {
	console.log('SVGID is ' + svgId)
	bmouseDragging = false;
	var svgElement = document.getElementById('svg' + svgId);
	console.log(" svgElement is " + svgElement.innerHTML);
}

// function htmCursor(event) {
// var event = event || window.event;
// var htmlMouseXValue = document.getElementById("htmlMouseXValue");
// var htmlMouseYValue = document.getElementById("htmlMouseYValue");
// var myMouseX = event.clientX;
// var myMouseY = event.clientY;
// myMouseX = myMouseX + document.documentElement.scrollLeft;
// myMouseY = myMouseY + document.documentElement.scrollTop;
//
// htmlMouseXValue.value = myMouseX
// htmlMouseYValue.value = myMouseY
// }
//
// function svgCursor(evt) {
// var svgXValue = document.getElementById("svgXValue");
// var svgYValue = document.getElementById("svgYValue");
// var rect = phy_dspl_view.getBoundingClientRect();
// svgXValue.value = evt.clientX - rect.left
// svgYValue.value = evt.clientY - rect.top;
// // htmCursor(evt);
// }

function selectObject(evt) {
	if (!bmouseDragging) {
		selectedObject = evt.target;
		svgElement = document.getElementById('svg' + svgNB);
		svgElement.setAttribute("style", "cursor:move");
		var pnt = svgElement.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;

		console.log('Values of pnt.x=  ' + pnt.x + '  , pnt.y=  ' + pnt.y);

		var sCTM = svgElement.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		TransformRequestObj = svgElement.ownerSVGElement.createSVGTransform()
		var myTransListAnim = svgElement.transform;
		TransList = myTransListAnim.baseVal;
		bmouseDragging = true;

		console.log("element target is: " + svgElement);
		startX = Pnt.x;
		startY = Pnt.y;
		console.log('Values of Pnt.X=  ' + startX + '  , Pnt.Y=  ' + startY);

		// svgElement.setAttributeNS(null, "onmousemove",
		// "svgCursor(evt),moveElement(evt)");
		// svgElement.setAttributeNS(null, "onmouseout", "deselectObject(evt)");
		// svgElement.setAttributeNS(null, "onmouseup", "mouseUp(evt)");
	}
}

function moveElement(evt) {
	if (bmouseDragging) {
		var pnt = svgElement.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		// ---elements in different(svg) viewports, and/or transformed ---
		var sCTM = svgElement.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());
		Pnt.x -= startX;
		Pnt.y -= startY;

		TransformRequestObj.setTranslate(Pnt.x, Pnt.y)
		TransList.appendItem(TransformRequestObj)
		TransList.consolidate()
	}
}

function mouseUp(evt) {
	svgElement.setAttribute("style", "cursor:default")
	bmouseDragging = false;
}

function onLoadretrieveAllMetadata() {

	var doneFunction = function(data) {
		// console.log(jsonData);
		$('#metadata').empty();
		$.each(data.metadatas, function(key, value) {
			$('#metadata').append(
					"<optgroup style='color: black' id='" + value.id
							+ "' label='" + value.name + "'>");
			metadataMap[value.name] = value;
			$.each(value.repos, function(key2, value2) {
				$('#metadata').append(
						"<option  value='" + value2.id
								+ "' style='color: green'>" + value2.name
								+ "</option>");
			});
			$('#metadata').append("</optgroup>");
		});
	};

	var failFunction = function(xhr, status, error) {
		$('#metadata').append(
				"<option id='-1'  style='color: red' >No Metadata</option>");
		$('#console-log').append(
				"<p style='color:red'>Error in Retrieval of MetaData"
						+ xhr.status + "</p>");
		console.log("Error in Retrieval of MetaData: " + xhr.status);
	};

	var apis = new apiRomeNext();

	apis.retrieveAllMetadata(doneFunction, failFunction);

}
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
function onLoadretrieveAllDecorators() {

	var doneFunction = function(data) {
		// console.log(jsonData);
		decos = data.decos;
		$.each(data.decos, function(key, value) {
			decoMapViaId[value.id] = value;
			if (!decoMap[value.name]) {
				decoMap[value.name] = value;
			}
			$('#decorator').append(
					"<option  value='" + value.id + "' >" + value.name
							+ "</option>");
		});
	};

	var failFunction = function(xhr, status, error) {
		$('#decorator').append(
				"<option id='-1'  style='color: red' >No Decorator</option>");
		$('#console-log').append(
				"<p style='color:red'>Error in Retrieval of Decorators"
						+ xhr.status + "</p>");
		console.log("Error in Retrieval of Decorators: " + xhr.status);
	};

	var apis = new apiRomeNext();

	apis.retrieveAllDecorators(doneFunction, failFunction);

}
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
function onLoadretrieveAllNeo4jServerInstances() {

	var doneFunction = function(data) {
		// console.log(jsonData);
		$.each(data.neo4js, function(key, value) {
			if (!neo4jServerMap[value.description]) {
				neo4jServerMap[value.description] = value;
			}
		});
	};

	var failFunction = function(xhr, status, error) {
		$('#console-log').append(
				"<p style='color:red'>Error in Retrieval of Neo4j Instances"
						+ xhr.status + "</p>");
		console.log("Error in Retrieval of Neo4j Instances: " + xhr.status);
	};

	var apis = new apiRomeNext();

	apis.retrieveAllNeo4jServerInstances(doneFunction, failFunction);

}

// $(document).keyup(function(e) {
// e = e || window.event;
// e = e;
//
// var cy;
// // console.log(e.keyCode);
// if (topLevelTab == "typeDesignViewTab") {
// cy = tdvCy;
// } else {
// cy = irvCy
// }
// // Panning the Graph using arrow keys
// if (e.keyCode == 16) {
// // shilft key pressed
// // console.log('Pressed [SHIFT]');
// shiftkeySelected = false;
//
// }
// });

// $(document).keydown(
// function(e) {
// e = e || window.event;
// e = e;
//
// var cy;
// // console.log(e.keyCode);
// if (topLevelTab == "typeDesignViewTab") {
// cy = tdvCy;
// } else {
// cy = irvCy
// }
// // Panning the Graph using arrow keys
// if (e.keyCode == 16) {
// // shilft key pressed
// // console.log('Pressed [SHIFT]');
// shiftkeySelected = true;
//
// }
//
// if (e.keyCode == 39) {
// // go right
// cy.panBy({
// x : 25,
// y : 0
// });
// return false;
// }
// if (e.keyCode == 37) {
// // go left
// cy.panBy({
// x : -25,
// y : 0
// });
// return false;
// }
// if (e.keyCode == 40) {
// // go down
// cy.panBy({
// x : 0,
// y : 25
// });
// return false;
// }
// if (e.keyCode == 38) {
// // go up
// cy.panBy({
// x : 0,
// y : -25
// });
// return false;
// }
// // Character 'c' is pressed == All the visible instances are
// // cleared. (Actually hidden)
// if (e.ctrlKey && e.shiftKey && e.keyCode == 67
// && topLevelTab == "typeDesignViewTab") {
// $("#grid-types").css({
// 'visibility' : 'hidden'
// });
// // nametype = null;
// // curType = null;
// shiftkeySelected = false;
// listTypeIds = [];
// listConnIds = [];
// } else {
// if (e.ctrlKey && e.shiftKey && e.keyCode == 67
// && topLevelTab == "instRelViewTab") {
// $("#grid-instances").css({
// 'visibility' : 'hidden'
// });
// }
// }
//
// });
