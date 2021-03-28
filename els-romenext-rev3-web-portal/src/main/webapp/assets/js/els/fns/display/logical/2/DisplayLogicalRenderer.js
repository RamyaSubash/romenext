function DisplayLogicalRenderer() {

	this.divholderId;

	this.initBase = function(divId) {
		this.divHolderId = divId;
	};

	this.initRenderer = function() {

		// NodeUtils.global_node_fns( "create", "logical",
		// DisplayLogicalRendererCrud.nodeCreate );
		// NodeUtils.global_node_fns( "read", "logical",
		// DisplayLogicalRendererCrud.nodeRead );
		// NodeUtils.global_node_fns( "update", "logical",
		// DisplayLogicalRendererCrud.nodeUpdate );

	};

	this.resetView = function() {

		loadedWorkspaceUuid = null;
		isWorkspaceLoaded = false;
		DisplayLogicalRendererGraph.clearLoadedWorkspace();
		
		// document.getElementById(activeDecos_BODY[this.divHolderId]).style.display
		// = 'none';
		document.getElementById("logical_display_view").style.display = 'none';

		typeMap = {};
		typeMapViaId = {};
		ruleMap = {};
		ruleMapViaId = {};
		connMap = {};
		connMapViaId = {};

		nodeMap = {};
		edgeMap = {};

		listTypeIds = [];
		listConnIds = [];

		currentTypeIds = [];

		drillHistoryList = [];
		
		document.getElementById("breadcrumb").innerHTML = '<li onclick="(new DisplayLogicalRenderer()).resetView();"><a href="#"><span class="glyphicon glyphicon-home"></span>Home</a></li>' 
			 											+ '<li onclick="(new DisplayLogicalRenderer()).resetView();"><a href="#">Logical View</a></li>';
		
		this.initView();

//		document.getElementById("edge_bar").innerHTML = "<table id='ruleList'><tr><td><span class='label label-default'>*(0)</span></td></tr></table>";
		document.getElementById("edge_bar").style.display = "none";
		this.cancelInstForm();

	};

	this.initView = function() {

		if (document.getElementById("logical_display_view").style.display != 'block') {
			selecteddecorator = "Logical";
			// DisplayInterfaceUtils.resetInterface();
			document.getElementById("display").className = "btn btn-default btn-md text-center active";
			this.enableLogicalDesignView();

			var checked = this.checkInitialValues();

			if (checked == true) {
				this.loadView();
			}
			// var tabs = GlobalUtils.loadAllTabs();
			// if(!$.isEmptyObject(tabs) ){
			// GlobalUtils.generateAllTAbs(tabs );
			// }
		}

	};

	this.enableLogicalDesignView = function() {

		// var logicalDecoBody =
		// document.getElementById(activeDecos_BODY[this.divHolderId]);

		var logicalDecoBody = document.getElementById("logical_display_view");
		logicalDecoBody.style.display = "block";

		// var typeList = document.getElementById("typelist");
		// if (document.getElementById('"typeBar2"') == undefined ||
		// document.getElementById('"typeBar2"') == null) {
		//			
		// var typeBar = GlobalHTMLUtils.createHTMLEntity('header', 'typeBar2',
		// 'panel-heading', 'visible', 'block', '');
		// typeBar.style = "vertical-align:top;";
		// typeList.appendChild(typeBar);
		// }

		// if (document.getElementById('ruleInstBar') == undefined ||
		// document.getElementById('ruleInstBar') == null) {
		//			
		// var ruleBar = GlobalHTMLUtils.createHTMLEntity('header',
		// 'ruleInstBar', 'panel-heading', 'visible', 'block', 'Rule Bar');
		// ruleBar.style = "vertical-align:top;";
		//
		// logicalDecoBody.appendChild(ruleBar);
		// }

		// if (document.getElementById('connectionInstBar') == undefined ||
		// document.getElementById('connectionInstBar') == null) {
		//			
		// var connectionBar = GlobalHTMLUtils.createHTMLEntity('header',
		// 'connectionInstBar', 'panel-heading', 'visible', 'block', 'Connection
		// Bar');
		// connectionBar.style = "vertical-align:top;";
		//
		// typeList.appendChild(connectionBar);
		// }

		if (document.getElementById('irvCy') == undefined || document.getElementById('irvCy') == null) {
			var cy = GlobalHTMLUtils.createHTMLEntity("div", "irvCy", "cy", "visible", "block", "");
			logicalDecoBody.appendChild(cy);
		}

		this.buildWindowNodeDetails("Instance Details");
		this.buildNodesLinkingBucket();
		// var logicalDecoLn =
		// document.getElementById(activeDecos_LN[this.divHolderId]);
		// logicalDecoLn.style.display = "block";
		// $( "#" + activeDecos_LN[this.divHolderId] ).draggable({
		// cursor: "move",
		// containment: [0, 260, 0, 750]
		// });

		// var dialog = document.getElementById('dialog')
		// if (document.getElementById('grid-instances') == undefined ||
		// document.getElementById('grid-instances') == null) {
		//			
		// var gridTypes = document.createElement('div');
		// gridTypes.id = 'grid-instances';
		// gridTypes.style.visibility = 'hidden';
		// gridTypes.innerHTML += '<div class="box box-solid box-info"
		// style="overflow: auto;">' // height: 717.5px;
		// + '<div class="box-header with-border">'
		// + '<h2 class="box-title">Instance Details</h2>'
		// + '<div class="pull-right box-tools">'
		// + '<button id="instance_window_button" class="btn btn-box-tool"
		// data-widget="collapse" title="Collapse"><i class="fa
		// fa-minus"></i></button>'
		// + '</div></div><div class="box-body" id="nodeForm"></div></div>';
		// dialog.appendChild(gridTypes);
		//			
		// }
		// this.emptyAllInst()
		// this.showOrHideGridInstances(false);

		// var logicalDecoTb =
		// document.getElementById(activeDecos_TB[this.divHolderId]);
		// logicalDecoTb.style.display = "block";
		//		
		// if (document.getElementById('toolbar_romenext') == undefined ||
		// document.getElementById('toolbar_romenext') == null) {
		// var toolBar = document.createElement('div');
		// toolBar.id = 'toolbar_romenext';
		// logicalDecoTb.appendChild(toolBar);
		//			
		// console.log("Initial value of selectedDecorator is :
		// "+selecteddecorator);
		// if (selectedMetaData) {
		// // selecteddecorator = 'Logical';
		// (new toolbarManagerRomeNext()).createDisplayTool();
		// if(selectedMetaData.length != "") {
		// this.showOrHideGridInstances(true);
		// }
		// }
		// }

		// TODO: implement permissions on interface

	};

	this.buildWindowNodeDetails = function(titleMSG) {

		$("#create_node").dialog({
			autoOpen : false,
			width : '300',
			height : '300',
			title : titleMSG,
			modal : false,
			position : {
				// off : $('#plus_icon'),
				my : "right",
				at : "center",

			},
			create : function(event, ui) {
				// Set maxWidth
				$(this).css("maxWidth", "800px");
			},

			close : function(event, ui) {
				$("#create_node").hide();
			}

		});
		var inputBody = "";
		inputBody = '<div id="create_node_form"></div>';

		$("#create_node").append(inputBody);

	}

	this.checkInitialValues = function() {

		if ($.isEmptyObject(userGroup.name) || $.isEmptyObject(userGroup.host)) {
			console.log(" User group  Name is " + userGroup.name
					+ " User Group Host " + userGroup.host
					+ "Can not API call ");
			return false;
		}

		if (selectedMetaData == null || selectedMetaData == '') {
			document.getElementById('error_msg').innerHTML = "<p style='color:red'>No Metadata Selected  !!</p>";
			return false;

		} else {
//			PrefBarFunctions.generateColorOptions();
//			PrefBarFunctions.generateSizeOptions();
			GlobalUtils.freshAllTypeAndConnections();
			NodeFctsUtils.setTypePrefrences();
			
//			GlobalUtils.freshAllRules();
			GlobalUtils.loadAllRules();
//			GlobalUtils.generateBreadcrumb(selecteddecorator);

			topLevelTab = "instRelViewTab";
			NodeSelected = null;
			LD_FocussedNode = null;
			prevDrilldown = null;
			
			historyNode = [];

			listInstUuids = [];
			listEdgeUuids = [];

			if (listTypeIds.length != 0 || listConnIds.length != 0) {
				loadInstNode = false;
				loadInst = true;
				typeMapInst = {};
				nodeMapInst = {};

				if (listTypeIds.length != 0) {
					for (i = 0; i < listTypeIds.length; i++) {
						$.each(typeMap, function(key, value) {
							if (value.id == listTypeIds[i]) {
								value.nb = 0;
								typeMapInst[key] = typeMap[key];
							}
						});
					}
				}
				NodeUtils.loadNodes();
			} else {
				$.each(typeMapViaId, function(key, value){
					listTypeIds.push(key);
				});
				$.each(connMapViaId, function(key, value){
					listConnIds.push(key);
				});
				NodeUtils.loadNodes();
				listTypeIds = [];
				listConnIds = [];
				// NodeUtils.loadAllNodesAndEdges();
			 }

			GlobalNodeUtils.loadAllNodeWorkspaces();
			DisplayLogicalRendererGraph.generateDisplayWorkspaceMenu();
					
			return true;

		}

	};

	this.buildBreadcrum = function(elementId, isTypeOrNode) {
		
		// Home --> Logical View --> Type --> Node --> Node --> ......

		var newBreadcrumbElement = "";

		if (isTypeOrNode == "type") {
			var type = typeMapViaId[elementId];
			newBreadcrumbElement = '<li onclick="(new DisplayLogicalRenderer()).resetView();"><a href="#"><span class="glyphicon glyphicon-home"></span>Home > </a></li>' 
								 + '<li onclick="(new DisplayLogicalRenderer()).resetView();"><a href="#">Logical View > </a></li>'
								 + '<li id="hb_type_' + type.typeId + '" onclick="(new DisplayLogicalRenderer()).selectType(\'' + type.typeId + '\');"><a href="#">' + type.name + ' > </a></li>';
			document.getElementById("breadcrumb").innerHTML = newBreadcrumbElement;
		} else if (isTypeOrNode == "node") {
			var node = null;
			$.each(drillHistoryList, function(key, value) {
				if (value.sysProperties.uuid.value == elementId) {
					node = value;
				}
			});
			newBreadcrumbElement = '<li id="hb_node_' + node.sysProperties.uuid.value + '" onclick="DisplayLogicalRendererGraph.drillDown2(\'' + node.sysProperties.uuid.value + '\');"><a href="#">' + node.cyDisplay + ' > </a></li>';
			$("#breadcrumb").append(newBreadcrumbElement);
		} else if (isTypeOrNode == "workspace") {
			var workspace = workspaceMap[elementId];
			var workspaceTypeNamePropertyId = DisplayLogicalRendererGraph.getWorkspaceTypePropertyIdByName("name");
			newBreadcrumbElement = '<li onclick="(new DisplayLogicalRenderer()).resetView();"><a href="#"><span class="glyphicon glyphicon-home"></span>Home > </a></li>' 
								 + '<li onclick="(new DisplayLogicalRenderer()).resetView();"><a href="#">Logical View > </a></li>'
								 + '<li id="hb_workspace_' + workspace.sysProperties.uuid.value + '" onclick="DisplayLogicalRendererGraph.generateWorkspace(\'' + workspace.sysProperties.uuid.value + '\');"><a href="#">' + workspace.typeProperties[workspaceTypeNamePropertyId].value + ' > </a></li>';
			document.getElementById("breadcrumb").innerHTML = newBreadcrumbElement;
			
		}

//		var list = '';
//		list += "<li><i class='fa fa-home'></i><a href='#'>Home</a><i class='fa fa-angle-right'></i></li>";
//		list += "<li><a href='#'>Logical Display</a></li>";
//		for ( var key in listTypeIds) {
//			list += "<li><a href='#'>" + typeMapViaId[listTypeIds[key]].name
//					+ "</a></li>";
//		}
//		document.getElementById('breadcrumb').innerHTML = list;
	};

	this.loadView = function() {

		// Clears everything in the graph first
		if (irvCy) {
			irvCy.remove(irvCy.elements());
		}

		// Check if the nodeMap is empty or not. 
		if (JSON.stringify(nodeMap) === JSON.stringify({})) {
			// If nodemap is empty, jsut generate the empty type bar.
			console.log("No Instances Created");
			
			
			// this.showOrHideGridInstances(true);
			// this.emptyAllInst();
			// $("#create_node").dialog("open");
			// $('#nodeForm').empty();
			// $("#nodeForm").append("No Instances Created");
			
			var linkRuleIds = GlobalRuleUtils.getAllLinkIdsFromRuleMap();
			var typeIds = [];
			console.log("typeMapViaId in DisplayLogicalRenderer");
			console.log(typeMapViaId);
			$.each(typeMapViaId, function(id, type) {
				typeIds.push(id);	
			});
			console.log("what is in typeIds?");
			console.log(typeIds);
			console.log("what is in linkRuleIds?")
			console.log(linkRuleIds);
			DisplayLogicalRendererBar.generateTypeBars(typeIds, linkRuleIds);
//			DisplayLogicalRendererBar.showOrHideTypeLinkBars();
//			this.loadTypeInstBar(null);
		} else {
			var elements = DisplayCytoscapeUtils.formatNodesAndEdges();
			irvCy = initNodeEdgeGraph(irvCy, "irvCy", elements);
			irvCy.zoom(logicalDisplayCytoscapeDefaultZoomLevel);
			irvCy.center();
			
			var linkRuleIds = [];
			var typeIds = [];
			
			if (listTypeIds.length == 0 && listConnIds.length == 0) {
				linkRuleIds = GlobalRuleUtils.getAllLinkIdsFromRuleMap();
				$.each(typeMapViaId, function(id, type) {
					typeIds.push(id);	
				});
			} else {
				$.each(listTypeIds, function(key, value) {
					typeIds.push(value);	
				});
				
				$.each(listConnIds, function(key, value) {
					var conn = connMapViaId[value];
					if (ruleMapViaId[conn.ruleId].classification == 'link' && !linkRuleIds.includes(conn.ruleId)) {
						linkRuleIds.push(conn.ruleId);
					}
					if (!typeIds.includes(conn.source)) {
						typeIds.push(conn.source);
					}
					if (!typeIds.includes(conn.target)) {
						typeIds.push(conn.target);
					}
				});
			}
			
			DisplayLogicalRendererBar.generateTypeBars(typeIds, linkRuleIds);
//			DisplayLogicalRendererBar.showOrHideTypeLinkBars();
//			this.loadTypeInstBar(nodeMap);
		}

		// This should do validation check against the link connection form. 
		// Since this is session based, it must be generated on the fly to see if it should be shown or not.
		this.showOrNotSmallNodesConnectingBar();
	
	};
	
	this.loadTypeInstBar = function(source) {
		typeMapInst = {};
		this.setTypeNB();
		var elementBase = {}, element;
		if (source != null) {
			$.each(source, function(key, value) {
				element = value.typeId;
				elementBase = typeMapViaId[element];
				typeMapInst[element].nb = typeMapInst[element].nb + 1;
			});
		}
		this.initNodeBar('node_bar');
	};

	this.setTypeNB = function() {
		typeMapInst = typeMapViaId;
		var elementBase = {};
		$.each(typeMapInst, function(key, value) {
			elementBase = value;
			elementBase.nb = 0;
			typeMapInst[key] = elementBase;
		});
	};

	this.initNodeBar = function(bar) {
		var elementsBar = {};
		elementsBar = typeMapInst;
		var nb = Object.keys(elementsBar).length;
		
		var nodeNb = 0;
		var pathNb = 0;
		var systemNb = 0;
		$.each( elementsBar, function(key, value) {
			if (value.classification == 'node') {
				nodeNb++;
			} else if (value.classification == 'path') {
				pathNb++;
			} else if (value.classification == 'system') {
				systemNb++;
			} 
		});
		
		var inputs = '';
		var nodeInputs = '';
		var pathInputs = '';
		var systemInputs = '';
		if (nb != 0) {
			
			nodeInputs = "<table id='typesList'>" 
					    + "<td><span class='badge' "
					    + "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
					    + "onmouseout='GlobalHTMLUtils.unhighlight(this);' "
					    + "onclick='(new DisplayLogicalRenderer()).resetView();'>*("
					    + nodeNb + ")</span></td><tr>";
			
			pathInputs = "<table id='pathsList'>" 
			    		+ "<td><span class='badge' "
			    		+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
			    		+ "onmouseout='GlobalHTMLUtils.unhighlight(this);'>*(" 
			    		+ pathNb + ")</span></td><tr>";
			
			systemInputs = "<table id='systemsList'>" 
			    		+ "<td><span class='badge' "
			    		+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
			    		+ "onmouseout='GlobalHTMLUtils.unhighlight(this);'>*("
			    		+ systemNb + ")</span></td><tr>";
			
			
//			inputs = "<table id='typesList'>";
//			inputs += "<td><span class='badge' "
//					+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
//					+ "onmouseout='GlobalHTMLUtils.unhighlight(this);' "
//					+ "onclick='(new DisplayLogicalRenderer()).resetView();'>*("
//					+ nb + ")</span></td><tr>";
			
//			var count = 1;
			var nodeCount = 1;
			var pathCount = 1;
			var systemCount = 1;
			$.each( elementsBar, function(key, value) {
				
				if (value.classification == 'node') {
					nodeInputs += "<td><span class='badge' style='color:black; background:"+ value.color+ "' id='"+ value.id
								+ "' title='Drag and Drop to Create Node of This Type' "
								+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
								+ "onmouseout='GlobalHTMLUtils.unhighlight(this);' "
								+ "onclick=\"(new DisplayLogicalRenderer()).selectType('"+ value.id+ "')\"  >"+ value.name+ "<b><font color='black'>(";
					
					if (value.nb) {
						nodeInputs += value.nb;
					} else {
						nodeInputs += '0';
					}
					nodeInputs += ")</font></b></span></td>";

					if (nodeCount % 15 == 0 && nodeCount != 0) {
						nodeInputs += "</tr><tr>"
					}

					nodeCount++;
				} else if (value.classification == 'path') {
					pathInputs += "<td><span class='badge' style='color:black; background:"+ value.color+ "' id='"+ value.id
								+ "' title='Drag and Drop to Create Node of This Type' "
								+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
								+ "onmouseout='GlobalHTMLUtils.unhighlight(this);' "
								+ "onclick=\"(new DisplayLogicalRenderer()).selectType('"+ value.id+ "')\"  >"+ value.name+ "<b><font color='black'>(";
		
					if (value.nb) {
						pathInputs += value.nb;
					} else {
						pathInputs += '0';
					}
					pathInputs += ")</font></b></span></td>";

					if (pathCount % 15 == 0 && pathCount != 0) {
						pathInputs += "</tr><tr>"
					}

					pathCount++;	
				} else if (value.classification == 'system') {
					systemInputs += "<td><span class='badge' style='color:black; background:"+ value.color+ "' id='"+ value.id
								+ "' title='Drag and Drop to Create Node of This Type' "
								+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
								+ "onmouseout='GlobalHTMLUtils.unhighlight(this);' "
								+ "onclick=\"(new DisplayLogicalRenderer()).selectType('"+ value.id+ "')\"  >"+ value.name+ "<b><font color='black'>(";
		
					if (value.nb) {
						systemInputs += value.nb;
					} else {
						systemInputs += '0';
					}
					systemInputs += ")</font></b></span></td>";

					if (systemCount % 15 == 0 && systemCount != 0) {
						systemInputs += "</tr><tr>"
					}

					systemCount++;
				}
				
//					inputs += "<td><span class='badge' style='color:black; background:"+ value.color+ "' id='"+ value.id
//							+ "' title='Drag and Drop to Create Node of This Type' "
//							+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
//							+ "onmouseout='GlobalHTMLUtils.unhighlight(this);' "
//							+ "onclick=\"(new DisplayLogicalRenderer()).selectType('"+ value.id+ "')\"  >"+ value.name+ "<b><font color='black'>(";
//
//					if (value.nb) {
//						inputs += value.nb;
//					} else {
//						inputs += '0';
//					}
//					inputs += ")</font></b></span></td>";
//					// nodeTypeBarTypeIds.push(value.id);
//
//					if (count % 15 == 0 && count != 0) {
//						inputs += "</tr><tr>"
//					}
//
//					count++;
			});
			
//			inputs += "</tr></table>";
			nodeInputs += "</tr></table>";
			pathInputs += "</tr></table>";
			systemInputs += "</tr></table>";
			document.getElementById(bar).innerHTML = nodeInputs + pathInputs + systemInputs;
			this.typeNodeBarDraggable();
		} else {
			inputs = "<p> No Type created yet -- go to Design</p>";
			document.getElementById(bar).innerHTML = inputs;
		}

	};

	this.initTypeBar = function(listTypeIds) {

		var listTypeIdNbMap = {};
		var totalNb = 0;
		$.each(listTypeIds, function(key, typeId) {
			var nb = 0;
			$.each(nodeMap, function(uuid, node) {
				if (node.typeId == typeId) {
					nb++;
				}
			});
			listTypeIdNbMap[typeId] = nb;
			totalNb = totalNb + nb;
		});

		var inputs = '';
		inputs = "<table id='typesList'><tr>";
		inputs += "<td><span class='badge' onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
				+ "onmouseout='GlobalHTMLUtils.unhighlight(this);' "
				+ "onclick='(new DisplayLogicalRenderer()).resetView();'>*("
				+ totalNb + ")</span></td>";
		$.each(	listTypeIdNbMap,function(key, value) {
			inputs += "<td><span class='badge' style='color:black; background:"
					+ typeMapViaId[key].color+ "' id='"	+ typeMapViaId[key].id
					+ "' title='Drag and Drop to Create Node of This Type' "
					+ "onmouseover='GlobalHTMLUtils.highlightWithRedBorder(this);' "
					+ "onmouseout='GlobalHTMLUtils.unhighlight(this);' "
					+ "onclick=\"(new DisplayLogicalRenderer()).selectType('"
					+ typeMapViaId[key].id+ "')\"  >"+ typeMapViaId[key].name+ "<b><font color='black'>(";

			if (value) {
				inputs += value;
			} else {
				inputs += '0';
			}
			inputs += ")</font></b></span></td>";
		});
		inputs += "</tr></table>";
		document.getElementById("node_bar").innerHTML = inputs;
		this.typeNodeBarDraggable();

		// if( totalNb != 0 ){
		// inputs ="<table id='typesList'><tr>";
		// inputs += "<td><span class='badge' onclick='(new
		// DisplayLogicalRenderer()).resetView();'>*("+totalNb+")</span></td>";
		// $.each(listTypeIdNbMap, function(key, value){
		// inputs += "<td><span class='badge' style='color:black; background:"
		// + defaultNodeColor + "' id='"
		// + typeMapViaId[key].id + "' title='Drag and Drop to Create Node of
		// This Type' onclick=\"(new DisplayLogicalRenderer()).selectType('"
		// + typeMapViaId[key].id + "')\" >"
		// + typeMapViaId[key].name + "<b><font color='black'>(";
		//				
		// if(value){
		// inputs += value;
		// } else {
		// inputs += '0';
		// }
		// inputs += ")</font></b></span></td>";
		// });
		// inputs +="</tr></table>";
		// document.getElementById("node_bar").innerHTML = inputs;
		// this.typeNodeBarDraggable();
		// } else {
		// inputs += "<p> No Type created yet -- go to Design</p>";
		// document.getElementById("node_bar").innerHTML = inputs;
		// }

	};

	this.selectType = function(typeId) {
		
		drillHistoryList = [];
		
		loadedWorkspaceUuid = null;
		isWorkspaceLoaded = false;
		DisplayLogicalRendererGraph.clearLoadedWorkspace();
		
		// make api call to load all nodes of selected type
		currentTypeIds = [];
		currentTypeIds.push(Number(typeId));
		
		listTypeIds = [];
		listConnIds = [];
		listTypeIds.push(Number(typeId));
		$.each(connMapViaId, function(connId, conn) {
			if (conn.source == Number(typeId) && conn.target == Number(typeId)) {
				listConnIds.push(Number(connId));
			}
		});
		NodeUtils.loadNodes();
		listTypeIds = [];
		listConnIds = [];
		
		var linkRuleIds = [];
		var typeIds = [Number(typeId)];
		DisplayLogicalRendererBar.generateTypeBars(typeIds, linkRuleIds);
//		DisplayLogicalRendererBar.showOrHideTypeLinkBars();
//		this.initTypeBar(currentTypeIds);

		if (irvCy) {
			irvCy.remove(irvCy.elements());
		}

		if (JSON.stringify(nodeMap) === JSON.stringify({})) {
			$("#console-log").append("No Instances Created");
			// $("#create_node").dialog("open");
			$('#nodeForm').empty();
			// $("#nodeForm").append("No Instances Created");
		} else {
			var elements = DisplayCytoscapeUtils.formatNodesAndEdges();
			irvCy = initNodeEdgeGraph(irvCy, "irvCy", elements);
			irvCy.zoom(logicalDisplayCytoscapeDefaultZoomLevel);
			irvCy.center();
		}
		
		this.showOrNotSmallNodesConnectingBar();
		
		this.buildBreadcrum(typeId, "type");

		// if (typeId) {
		// //only show selected type and its nodes
		// var type = typeMapViaId[typeId]
		//			
		// var nodes = {};
		// var edges = {};
		// var nb = 0;
		// $.each(nodeMap, function(uuid, node){
		// if (node.typeId == type.typeId) {
		// nodes[uuid] = node;
		// nb++;
		// }
		// });
		//			
		// var inputs = "<table id='typesList'><tr><td><span class='badge'
		// onclick='(new DisplayLogicalRenderer()).resetView();'>*("
		// + nb + ")</span></td><td><span class='badge' style='color:black;
		// background:" + defaultNodeColor + "' id='"
		// + type.id + "' title='Drag and Drop to Create Node of This Type'>" +
		// type.name + "<b><font color='black'>("
		// + nb + ")</font></b></span></td></tr></table>";
		// nodeTypeBarTypeIds = [];
		// nodeTypeBarTypeIds.push(type.id);
		// document.getElementById('node_bar').innerHTML = inputs;
		// this.typeNodeBarDraggable();
		//			
		// if(irvCy) {irvCy.remove(irvCy.elements());}
		// if(nb > 0){
		// irvCy = initNodeEdgeGraph(irvCy, "irvCy",
		// DisplayCytoscapeUtils.formatNodesAndEdgesForGraph(nodes, edges));
		// listTypeIds = type.id;
		// $("#console-log").append("Instance Graph for Selected Type: " +
		// type.id);
		// }else {
		// $("#console-log").append("No Instances Created Selected Type: " +
		// type.id);
		// $("#create_node").dialog("open");
		// $('#nodeForm').empty();
		// $("#nodeForm").append("No Instances Created Selected Type: " +
		// type.id);
		// }
		//
		// }

	};

	this.initChildTypeBar = function() {

		if (listInstUuids.length == 1 && listEdgeUuids.length == 0) {

			var node = nodeMap[listInstUuids[0]];
			var type = typeMapViaId[node.typeId];
			var childNodes = {};
			var childTypeIdNbMap = {};
			
			var firstLevelChildTypeIds = [];
			var firstLevelParentTypeIds = [];
//			var secondLevelChildTypeIds = [];
//			var secondLevelParentTypeIds = [];

			$.each(connMapViaId, function(id, conn) {
				if (conn.source == type.typeId) {
					if (!childTypeIdNbMap.hasOwnProperty(conn.target)) {
						childTypeIdNbMap[conn.target] = 0;
					}
					if (!firstLevelChildTypeIds.includes(conn.target)) {
						firstLevelChildTypeIds.push(conn.target);
					}
				}
				if (conn.target == type.typeId) {
					if (!childTypeIdNbMap.hasOwnProperty(conn.source)) {
						childTypeIdNbMap[conn.source] = 0;
					}
					if (!firstLevelParentTypeIds.includes(conn.source)) {
						firstLevelParentTypeIds.push(conn.source);
					}
				}
			});
			
//			$.each(firstLevelChildTypeIds, function(key, value) {
//				$.each(connMapViaId, function(id, conn) {
//					if (conn.source == value) {
//						if (!childTypeIdNbMap.hasOwnProperty(conn.target)) {
//							childTypeIdNbMap[conn.target] = 0;
//						}
//						if (!secondLevelChildTypeIds.includes(conn.target)) {
//							secondLevelChildTypeIds.push(conn.target);
//						}
//					}
//				});
//			});
//			
//			$.each(firstLevelParentTypeIds, function(key, value) {
//				$.each(connMapViaId, function(id, conn) {
//					if (conn.target == type.typeId) {
//						if (!childTypeIdNbMap.hasOwnProperty(conn.source)) {
//							childTypeIdNbMap[conn.source] = 0;
//						}
//						if (!secondLevelParentTypeIds.includes(conn.source)) {
//							secondLevelParentTypeIds.push(conn.source);
//						}
//					}
//				});
//			});
			
			$.each(	edgeMap,function(uuid, edge) {
				if (edge.originNode.sysProperties.uuid.value == node.sysProperties.uuid.value) {
					childNodes[edge.destinationNode.sysProperties.uuid.value] = edge.destinationNode;
					if (!childTypeIdNbMap.hasOwnProperty(edge.destinationTypeId)) {
						childTypeIdNbMap[edge.destinationTypeId] = 0;
					}
				}
			});

			$.each( childTypeIdNbMap, function(typeId, nb) {
				$.each( childNodes, function(uuid, childNode) {
					if (childNode.typeId == Number(typeId)) {
						childTypeIdNbMap[typeId] = childTypeIdNbMap[typeId] + 1;
					}
				});
			});

			var typeIds = [];
//			$.each(childTypeIdNbMap, function(key, value) {
//				typeIds.push(key);
//			});
//			$.each(secondLevelParentTypeIds, function(key, value) {
//				if (!typeIds.includes(value)) {
//					typeIds.push(value);
//				}
//			});
			$.each(firstLevelParentTypeIds, function(key, value) {
				if (!typeIds.includes(value)) {
					typeIds.push(value);
				}
			});
			if (!typeIds.includes(type.typeId)) {
				typeIds.push(type.typeId);
			}
			$.each(firstLevelChildTypeIds, function(key, value) {
				if (!typeIds.includes(value)) {
					typeIds.push(value);
				}
			});
//			$.each(secondLevelChildTypeIds, function(key, value) {
//				if (!typeIds.includes(value)) {
//					typeIds.push(value);
//				}
//			});
			
			var linkRuleIds = [];
			if (edgeMap) {
				$.each(edgeMap, function(key, value) {
					if ((value.originNode.sysProperties.uuid.value == listInstUuids[0] || value.destinationNode.sysProperties.uuid.value == listInstUuids[0]) && value.classification == 'link') {
						linkRuleIds.push(value.ruleId);
					}
				});
			}
			DisplayLogicalRendererBar.generateChildTypeBars(listInstUuids[0], typeIds, linkRuleIds);
//			DisplayLogicalRendererBar.showOrHideTypeLinkBars();
			
//			document.getElementById("node_bar").innerHTML = "";
//
//			inputs = "<table id='childTypesList'><tr>";
//			inputs += "<td><span class='label label-default'>*("
//					+ Object.keys(childNodes).length + ")</span></td>";
//			inputs += "<td><span class='badge' style='color:black; background:"
//					+ type.color + "' id='NOT_TYPE_BAR_TYPE'>" + node.cyDisplay
//					+ "</span></td>";
//			$.each( childTypeIdNbMap, function(key, value) {
//				var t = typeMapViaId[key];
//				inputs += "<td><span class='badge' style='color:black; background:"
//						+ t.color
//						+ "' id='"
//						+ t.id
//						+ "' title='Drag and Drop to Create Node of This Type'>"
//						+ t.name
//						+ "("
//						+ value
//						+ ")</span></td>";
//			});
//			inputs += "</tr></table>";
//			document.getElementById("node_bar").innerHTML = inputs;
//			this.typeNodeBarDraggable();

		}

	};
	
	// being used in drill down and up
	this.initChildTypeBar2 = function(node) {

//		var node = nodeMap[listInstUuids[0]];
		var type = typeMapViaId[node.typeId];
		var childNodes = {};
		var childTypeIdNbMap = {};

//		$.each(connMapViaId, function(id, conn) {
//			if (conn.source == type.typeId) {
//				if (!childTypeIdNbMap.hasOwnProperty(conn.target)) {
//					childTypeIdNbMap[conn.target] = 0;
//				}
//			}
//		});

		var firstLevelChildTypeIds = [];
		var firstLevelParentTypeIds = [];
//		var secondLevelChildTypeIds = [];
//		var secondLevelParentTypeIds = [];

		$.each(connMapViaId, function(id, conn) {
			if (conn.source == type.typeId) {
				if (!childTypeIdNbMap.hasOwnProperty(conn.target)) {
					childTypeIdNbMap[conn.target] = 0;
				}
				if (!firstLevelChildTypeIds.includes(conn.target)) {
					firstLevelChildTypeIds.push(conn.target);
				}
			}
			if (conn.target == type.typeId) {
				if (!childTypeIdNbMap.hasOwnProperty(conn.source)) {
					childTypeIdNbMap[conn.source] = 0;
				}
				if (!firstLevelParentTypeIds.includes(conn.source)) {
					firstLevelParentTypeIds.push(conn.source);
				}
			}
		});
		
//		$.each(firstLevelChildTypeIds, function(key, value) {
//			$.each(connMapViaId, function(id, conn) {
//				if (conn.source == value) {
//					if (!childTypeIdNbMap.hasOwnProperty(conn.target)) {
//						childTypeIdNbMap[conn.target] = 0;
//					}
//					if (!secondLevelChildTypeIds.includes(conn.target)) {
//						secondLevelChildTypeIds.push(conn.target);
//					}
//				}
//			});
//		});
//		
//		$.each(firstLevelParentTypeIds, function(key, value) {
//			$.each(connMapViaId, function(id, conn) {
//				if (conn.target == type.typeId) {
//					if (!childTypeIdNbMap.hasOwnProperty(conn.source)) {
//						childTypeIdNbMap[conn.source] = 0;
//					}
//					if (!secondLevelParentTypeIds.includes(conn.source)) {
//						secondLevelParentTypeIds.push(conn.source);
//					}
//				}
//			});
//		});
		
		$.each(	nodeMap,function(uuid, node) {
			if (childTypeIdNbMap.hasOwnProperty(node.typeId)) {
				childTypeIdNbMap[node.typeId]++;
			}
		});
		
//		$.each(	edgeMap,function(uuid, edge) {
//			if (edge.originNode.sysProperties.uuid.value == node.sysProperties.uuid.value) {
//				childNodes[edge.destinationNode.sysProperties.uuid.value] = edge.destinationNode;
//				if (!childTypeIdNbMap
//						.hasOwnProperty(edge.destinationTypeId)) {
//					childTypeIdNbMap[edge.destinationTypeId] = 0;
//				}
//			}
//		});
//
//		$.each( childTypeIdNbMap, function(typeId, nb) {
//			$.each( childNodes, function(uuid, childNode) {
//				if (childNode.typeId == Number(typeId)) {
//					childTypeIdNbMap[typeId] = childTypeIdNbMap[typeId] + 1;
//				}
//			});
//		});

		
		var typeIds = [];
//		$.each(childTypeIdNbMap, function(key, value) {
//			typeIds.push(key);
//		});
//		$.each(secondLevelParentTypeIds, function(key, value) {
//			if (!typeIds.includes(value)) {
//				typeIds.push(value);
//			}
//		});
		$.each(firstLevelParentTypeIds, function(key, value) {
			if (!typeIds.includes(value)) {
				typeIds.push(value);
			}
		});
		if (!typeIds.includes(type.typeId)) {
			typeIds.push(type.typeId);
		}
		$.each(firstLevelChildTypeIds, function(key, value) {
			if (!typeIds.includes(value)) {
				typeIds.push(value);
			}
		});
//		$.each(secondLevelChildTypeIds, function(key, value) {
//			if (!typeIds.includes(value)) {
//				typeIds.push(value);
//			}
//		});
		
		if (!typeIds.includes(type.typeId)) {
			typeIds.push(type.typeId);
		}
		
		var linkRuleIds = [];
		$.each(edgeMap, function(key, value) {
			if (value.originNode.sysProperties.uuid.value == node.sysProperties.uuid.value && value.classification == 'link') {
				linkRuleIds.push(value.ruleId);
			}
		});
		DisplayLogicalRendererBar.generateChildTypeBars2(node, typeIds, linkRuleIds);
//		DisplayLogicalRendererBar.showOrHideTypeLinkBars();
		
//		document.getElementById("node_bar").innerHTML = "";
//
//		inputs = "<table id='childTypesList'><tr>";
//		inputs += "<td><span class='label label-default'>*("
//				+ Object.keys(childNodes).length + ")</span></td>";
//		inputs += "<td><span class='badge' style='color:black; background:"
//				+ type.color + "' id='NOT_TYPE_BAR_TYPE'>" + node.cyDisplay
//				+ "</span></td>";
//		$.each( childTypeIdNbMap, function(key, value) {
//			var t = typeMapViaId[key];
//			inputs += "<td><span class='badge' style='color:black; background:"
//					+ t.color
//					+ "' id='"
//					+ t.id
//					+ "' title='Drag and Drop to Create Node of This Type'>"
//					+ t.name
//					+ "("
//					+ value
//					+ ")</span></td>";
//		});
//		inputs += "</tr></table>";
//		document.getElementById("node_bar").innerHTML = inputs;
//		this.typeNodeBarDraggable();

	};

	this.initConnectionBarInst = function() {

		if (listInstUuids.length == 1 && listEdgeUuids.length == 0) {

			document.getElementById("edge_bar").innerHTML = "";

			// find all the connections by the child types of the type of the
			// selected node
			var childConnectionsId = GlobalConnUtils
					.getAllChildConnections(nodeMap[listInstUuids[0]].typeId);

			// show the connections like Connect Room (child type name)
			var nb = childConnectionsId.length;
			var inputs = '';
			if (nb != 0) {
				inputs = "<table id='connectionList'><tr>";
				inputs += "<td><span class='label label-default'>*(" + nb
						+ ")</span></td>";
			$.each( childConnectionsId, function(key, value) {
					var connection = connMapViaId[value];
					var min = Number(connection.minRel);
					var max = Number(connection.maxRel);
					if (max == -1) {
						max = Number.POSITIVE_INFINITY;
					}

					if (connection.classification == "parentchild") {
						inputs += "<td id='connection_bar_element_"
								+ value
								+ "'><span class='label label-primary' id="
								+ connMapViaId[value].id
								+ " title='Connect Node' data-content='Select Destination Node' onclick='(new DisplayLogicalRenderer()).createEdge(this);'>Connect "
								+ typeMapViaId[connMapViaId[value].target].name;
//												+ " ["
//												+ min
//												+ ", "
//												+ max
//												+ "]</span></td>";
					} else if (connection.classification == "link") {
						inputs += "<td id='connection_bar_element_"
								+ value
								+ "'><span class='label label-primary' id="
								+ connMapViaId[value].id
								+ " title='Connect Node' style='color:black; background:green;' data-content='Select Destination Node'>Link "
								+ typeMapViaId[connMapViaId[value].target].name;
						// onclick='(new DisplayLogicalRenderer()).createEdge(this);'
//												+ " ["
//												+ min
//												+ ", "
//												+ max
//												+ "]</span></td>";
					}
					// inputs += "<td
					// id='connection_bar_element_" + value +
					// "'><span class='label label-primary' id="
					// + connMapViaId[value].id + "
					// title='Connect Node' data-content='Select
					// Destination Node' onclick='(new
					// DisplayLogicalRenderer()).createEdge(this);'>Connect
					// " +
					// typeMapViaId[connMapViaId[value].target].name
					// + " [" + min + ", " + max +
					// "]</span></td>";
				});
				inputs += "</tr></table>";
				document.getElementById("edge_bar").innerHTML = inputs;
			} else {
				inputs += "<p>No Child Connections Found</p>";
				document.getElementById("edge_bar").innerHTML = inputs;
			}
			
			document.getElementById("edge_bar").style.display = "";

		}

	};

	this.clearConnectionBarInst = function() {
		$('#edge_bar').empty();
	};

	this.emptyAllInst = function() {
		$('#nodeForm').empty();
		$('#create_node_form').empty();
	};

	this.showOrHideGridInstances = function(value) {
		if (value) {
			if ($("#grid-instances").css('visibility') == 'hidden') {
				$("#grid-instances").css({
					'visibility' : 'visible'
				});
			}
		} else {
			if ($("#grid-instances").css('visibility') == 'visible') {
				$("#grid-instances").css({
					'visibility' : 'hidden'
				});
			}
		}
	};

	this.typeNodeBarDraggable = function() {

		console.log("making type bar draggable");

		$gallery = $("#node_bar");

		// let the gallery items be draggable
		$('td', $gallery).draggable({
			cancel : "a.ui-icon", // clicking an icon won't initiate
			// dragging
			revert : "invalid", // when not dropped, the item will revert
			// back to its initial position
			containment : "document",
			helper : "clone",
			cursor : "move",
			create : function() {
				$(this).css({
					'zIndex' : 1000
				});
			},
			start : function() {
				$(this).css({
					'zIndex' : 1000
				});
			},
			stop : function() {
				$(this).css({
					'zIndex' : 1000
				});
			}
		});
		
		var element;
		var $workspace = $("#irvCy");
		$workspace
				.droppable({
					accept : "td",
					activeClass : "ui-state-highlight",
					drop : function(event, ui) {

						// this needs to test for typeBar2 and typeInstBar
						// == could be a Type or a Node instance
						dragItemPositionX = 0;
						dragItemPositionY = 0;
						var offset = $("#irvCy").offset();

						// get mouse position relative to drop target:
						dragItemPositionX = event.originalEvent.pageX
								- offset.left;
						dragItemPositionY = event.originalEvent.pageY
								- offset.top;

						console.log("Dropped at  X: " + dragItemPositionX
								+ " Y:  " + dragItemPositionY);

						if (!isNaN(ui.helper.children()[0].id)) {

							var name = ui.helper.children()[0].innerHTML;
							var id = ui.helper.children()[0].id;
							if (name.includes("<")) {
								name = name.substring(0, name.indexOf('<'));
								console.log("Found this " + name);
							}
							if (id != "NOT_TYPE_BAR_TYPE") {
								(new DisplayLogicalRenderer()).createNode(id);
							}

						} else {
							console.log(ui);
							// got the name of the node
							var nodeName = ui.helper.children()[0].innerHTML;
							console.log("dragged this node " + nodeName);
							if (loadInstNode) {
								element = nodeMapInst[nodeName];
							} else {
								element = nodeMap[nodeName];
							}

						}
					}
				});
		
	};

	this.typeBarDraggable = function(barId) {

		$(function() {

			$gallery = $("#" + barId);

			// let the gallery items be draggable
			$('td', $gallery).draggable({
				cancel : "a.ui-icon", // clicking an icon won't initiate
				// dragging
				revert : "invalid", // when not dropped, the item will revert
				// back to its initial position
				containment : "document",
				helper : "clone",
				cursor : "move",
				create : function() {
					$(this).css({
						'zIndex' : 1000
					});
				},
				start : function() {
					$(this).css({
						'zIndex' : 1000
					});
				},
				stop : function() {
					$(this).css({
						'zIndex' : 1000
					});
				}
			});

			var element;
			var $workspace = $("#irvCy");
			$workspace
					.droppable({
						accept : "td",
						activeClass : "ui-state-highlight",
						drop : function(event, ui) {

							// this needs to test for typeBar2 and typeInstBar
							// == could be a Type or a Node instance
							dragItemPositionX = 0;
							dragItemPositionY = 0;
							var offset = $("#irvCy").offset();

							// get mouse position relative to drop target:
							dragItemPositionX = event.originalEvent.pageX
									- offset.left;
							dragItemPositionY = event.originalEvent.pageY
									- offset.top;

							console.log("Dropped at  X: " + dragItemPositionX
									+ " Y:  " + dragItemPositionY);

							if (!isNaN(ui.helper.children()[0].id)) {

								var name = ui.helper.children()[0].innerHTML;
								var id = ui.helper.children()[0].id;
								if (name.includes("<")) {
									name = name.substring(0, name.indexOf('<'));
									console.log("Found this " + name);
								}
								(new DisplayLogicalRenderer()).createNode(id);

							} else {
								console.log(ui);
								// got the name of the node
								var nodeName = ui.helper.children()[0].innerHTML;
								console.log("dragged this node " + nodeName);
								if (loadInstNode) {
									element = nodeMapInst[nodeName];
								} else {
									element = nodeMap[nodeName];
								}

							}
						}
					});

		});

	};

	this.changeMessagesForEdgeClassifications = function() {

		var rule = document.getElementById('rule_name_selector_id').value;

		var message = document.getElementById('create_node_message');

		if (ruleMap[rule].classification == "parentchild") {
			message.innerHTML = "Creating a node with: <b>" + message.value
					+ "</b> as Parent";
			message.style.color = 'blue';
		} else if (ruleMap[rule].classification == "link") {
			message.innerHTML = "Creating a node with: <b>" + message.value
					+ "</b> as Connected";
			message.style.color = 'blue';
		} else {
			message.innerHTML = "Wrong Connection Classification: "
					+ ruleMap[rule].classification;
			message.style.color = 'red';
		}
	};

	this.createNode = function(typeId) {

		this.cancelCreateNode();

		if (!typeId || !typeMapViaId[typeId]) {
			console.log("Wrong Data: " + typeId);
			return;
		}

		if (typeMapViaId[typeId].classification == "system") {
			console.log("Cannot Create System Node: " + typeId);
			return;
		}

		$("#create_node").dialog("open");
		$('#create_node_form').empty();
		
//		if (listInstUuids.length == 1 && listEdgeUuids.length == 0) {
//			
//			var selectedStartNode = nodeMap[listInstUuids[0]];
//			var endNodeTypeId = typeId;
//			
//			var conns = GlobalConnUtils.findConnsBySourceAndTarget(selectedStartNode.typeId, endNodeTypeId);
//			var children = GlobalNodeUtils.getAllChildrenNodesUnderType(listInstUuids[0], endNodeTypeId);
//			if (conns) {
//				
//				if (conns.length > 0) {
//					
//					for (var key in conns) {
//						var numberOfChildren = Object.keys(children).length;
//
//						if (Number(conns[key].maxRel) != -1) {
//							if (numberOfChildren >= Number(conns[key].maxRel)) {
//								
//								conns.splice(key, 1);
//								
//							}
//						}
//					}	
//				} else {
//					$("#create_node_form").append("<p style='color:red'>Cannot Create Destination Node to Seleted Node</p>");
//					return;
//				}
//			} else {
//				$("#create_node_form").append("<p style='color:red'>Cannot Create Destination Node to Seleted Node</p>");
//				return;
//			}
//			
//		}
		
		if (listInstUuids.length == 1 && listEdgeUuids.length == 0) {

			var endNodeTypeId = typeId;
			var selectedStartNode = null;
			var children = null;
			
			if (drillHistoryList.length > 0) {
				selectedStartNode = nodeMap[listInstUuids[0]];
				if (!selectedStartNode) {
					$.each(drillHistoryList, function(key, value) {
						if (value.sysProperties.uuid.value == listInstUuids[0]) {
							selectedStartNode = value;
						}
					});
					children = GlobalNodeUtils.getAllChildrenNodesUnderType(listInstUuids[0], endNodeTypeId);
				} else {
					children = GlobalNodeUtils.getAllChildrenNodesUnderType(listInstUuids[0], endNodeTypeId);
				}
			} else {
				selectedStartNode = nodeMap[listInstUuids[0]];
				children = GlobalNodeUtils.getAllChildrenNodesUnderType(listInstUuids[0], endNodeTypeId);
			}
			
//			var selectedStartNode = nodeMap[listInstUuids[0]];
//			var endNodeTypeId = typeId;			
			
			var conns = GlobalConnUtils.findConnsBySourceAndTarget(selectedStartNode.typeId, endNodeTypeId);
//			var children = GlobalNodeUtils.getAllChildrenNodesUnderType(listInstUuids[0], endNodeTypeId);
			for (var key in conns) {
				if (conns[key].classification != 'parentchild') {
					delete conns[key];
				}
			}
			conns = GlobalUtils.unique(conns);
			
			if (conns) {

				if (conns.length > 0) {
					
					$.each(conns, function(key, value) {
						
						var numberOfChildren = Object.keys(children).length;
						// var numberOfChildren1 = children.length;

						if (Number(value.maxRel) != -1) {
							if (numberOfChildren >= Number(value.maxRel)) {
								$('#create_node_form').append("<p style='color:red'>"
														+ typeMapViaId[selectedStartNode.typeId].name
														+ " Cannot Have More "
														+ typeMapViaId[endNodeTypeId].name
														+ "</p>");
								return;
							}

						}
					});
										
				} else {
					$("#create_node_form").empty();
					$("#create_node_form").append("<p style='color:red'>Cannot Create Destination Node to Seleted Node</p>");
					return;
				}

			} else {
				$("#create_node_form").empty();
				$("#create_node_form").append("<p style='color:red'>Cannot Create Destination Node to Seleted Node</p>");
				return;
			}

		}

		var nodeForm = document.getElementById("create_node_form");

		var createSelectedTypeNodeForm = this.generateCreateNodeForm(typeId);
		nodeForm.innerHTML += createSelectedTypeNodeForm;

		// add one time add buttons for all directly required types
		var requiredTypeIds = [];
//		requiredTypeIds = this.getAllRequiredChildTypes(typeId);
		requiredTypeIds = this.getAllRequiredChildTypesWithoutLinks(typeId);

		var inputs = this.generateAddButtonsForAllRequiredTypes(typeId,
				requiredTypeIds);
		nodeForm.innerHTML += inputs;

		// add create and cancel buttons
		var createButton = '<br><input id="create_instance_button_id" type="button" value="Add Node" class="btn btn-primary btn-sm" onclick="(new DisplayLogicalRenderer()).saveNodeInfo('
				+ typeId + ');"/>';
		var cancelButton = '<input type="button" value="Cancel" class="btn btn-primary btn-sm" onclick="(new DisplayLogicalRenderer()).cancelCreateNode();"/>';
		nodeForm.innerHTML += createButton + cancelButton + "<div id='create_node_error_message_" + typeId + "'></div>";
		DisplayInterfaceUtils.addDatePicker('create_node_property_');
//		document.getElementById("create_instance_button_id").addEventListener("keydown", function(event) {
//			event.preventDefault();
//			if (event.keyCode === 13) {
//				document.getElementById("create_instance_button_id").click()
//			}			
//		});
	};

	this.createEdge = function(connectionBarElement) {

		if (connSelected) {
			var change = confirm("Previous connection selected but not done. Do you want to change connection?");
			if (change) {
				// originType = null;
				// destType = null;
				$('#connection_bar_element_' + connSelected)
						.replaceWith(
								"<span class='label label-primary' id="
										+ connSelected
										+ " title='Connect Node' data-content='Select Destination Node' onclick='(new DisplayLogicalRenderer()).createEdge(this);'>"
										+ $(
												'#connection_bar_element_'
														+ connSelected).text()
										+ "</span>");
				$(connectionBarElement).replaceWith(
						"<span id='highlightConnection' title='Select Destination Node'>"
								+ $(connectionBarElement).text() + "</span>");
				connSelected = connectionBarElement.id;

				DisplayCytoscapeUtils.removeHighlightAndUnhighlight();
				var type = typeMapViaId[connMapViaId[connSelected].target];
				var nodesUnderType = irvCy.nodes("[typeId=" + Number(type.id)
						+ "]");
				nodesUnderType.addClass('highlight');
				irvCy.elements().not(nodesUnderType).addClass('semitransp');

				mouseEventTime = new Date().getTime();
				pleaseWait = true;
				GlobalUtils.cursor_wait();
			} else {
				// reinitiate
				// originType = null;
				// destType = null;
				mouseEventTime = new Date().getTime();
				pleaseWait = true;
			}
		} else { // first time that connection is selected connSelected =
			// null
			// originType = null;
			// destType = null;
			$(connectionBarElement).replaceWith(
					"<span id='highlightConnection' title='Select Destination Node'>"
							+ $(connectionBarElement).text() + "</span>");
			connSelected = connectionBarElement.id;

			DisplayCytoscapeUtils.removeHighlightAndUnhighlight();
			var type = typeMapViaId[connMapViaId[connSelected].target];
			var nodesUnderType = irvCy
					.nodes("[typeId=" + Number(type.id) + "]");
			nodesUnderType.addClass('highlight');
			irvCy.elements().not(nodesUnderType).addClass('semitransp');

			mouseEventTime = new Date().getTime();
			pleaseWait = true;
			GlobalUtils.cursor_wait();
		}

	};

	this.createLinkEdge = function(selectedRuleId) {

		// clear all selected nodes
		DisplayCytoscapeUtils.removeHighlightAndUnhighlight();
		listInstUuids = [];
		listEdgeUuids = [];

		if (selectedRuleId) {

			if (selectedRuleId == "CANCEL") {

				GlobalUtils.cursor_clear();
				selectedRule = null;

				// remove link rule list
				document.getElementById("create_link").innerHTML = '<span class="glyphicon glyphicon-resize-horizontal bigglyphicon"></span>';

			} else if (selectedRuleId == "EMPTY") {

				GlobalUtils.cursor_clear();
				selectedRule = null;

			} else {

				mouseEventTime = new Date().getTime();
				pleaseWait = true;
				GlobalUtils.cursor_wait();

				selectedRule = selectedRuleId;

			}

		} else {

			GlobalUtils.cursor_clear();
			selectedRule = null;

			// remove link rule list
			var linkRuleList = document.getElementById("link_rule_select_list");
			document.getElementById("create_link_icon").removeChild(
					linkRuleList);
		}

	};

	this.showCreateEdge = function() {

		// $("#grid-instances").css({'visibility':'visible'});
		$("#create_node").dialog("open");
		var Form = document.createElement('div');
		if (selectedMetaData != null) {

			var connection = connMapViaId[connSelected];
			var startNode = originNode;
			var endNode = destNode;

			var oNodeName = NodeUtils.findNameInst(startNode);
			var dNodeName = NodeUtils.findNameInst(endNode);

			var formHeader = "<form id='addEdgeDialog'>", inputs = "";
			// Given origin type and destination type

			/**
			 * Creating edge from [ BAY ] -> [ OPTIONAL ]
			 * 
			 * 
			 */

			// inputs += "Creating an edge using [" + connection.name + "]
			// connection to connect <br>";
			// inputs += "[" + startNode.type + "] -- (" + connection.name +")"
			// + "--> [" + endNode.type + "]<br>";
			// inputs += "[" + oNodeName + "] -- (" + connection.name +")" +
			// "--> [" + dNodeName + "]<br>";
			// inputs += "<table>";
			// inputs += "</table>";
			inputs += "<div id='edge_detal'>";
			inputs += "<label>Origin Type:&nbsp;</label>" + startNode.type
					+ "<input type='hidden' name='originTypeName' value='"
					+ startNode.type
					+ "'/><input type='hidden' name='originType' value='"
					+ typeMapViaId[startNode.typeId].id + "'/><br>";
			inputs += "<label>Origin Node:&nbsp;</label>" + oNodeName
					+ "<input type='hidden' name='originNodeUuid' value='"
					+ startNode.sysProperties.uuid.value + "' disabled/><br>";
			inputs += "<label>Destination Type:&nbsp;</label>" + endNode.type
					+ "<input type='hidden' name='destinationTypeName' value='"
					+ endNode.type
					+ "'/><input type='hidden' name='destinationType' value='"
					+ typeMapViaId[endNode.typeId].id + "'/><br>";
			inputs += "<label>Destination Node:&nbsp;</label>" + dNodeName
					+ "<input type='hidden' name='destinationNodeUuid' value='"
					+ endNode.sysProperties.uuid.value + "' disabled/><br>";
			inputs += "<label>Connection:&nbsp;</label>" + connection.name
					+ "<input type='hidden' name='connection' value='"
					+ connection.id + "'/><br>";

			// inputs += "<table>";
			// inputs += "<tr><th><label>Origin:
			// </th><td>"+startNode.type+"<input type='hidden'
			// name='originTypeName' value='"+startNode.type+"'/><input
			// type='hidden' name='originType'
			// value='"+typeMap[startNode.type].id+"'/> </label></td></tr>";
			// inputs += "<tr><td><label>Instance: </td><td>"+oNodeName+"<input
			// type='hidden' name='originNodeUuid'
			// value='"+originNode.sysProperties.uuid.value+"'
			// disabled/></td></tr>";
			// inputs += "<tr><td colspan='2'>-------------------</td>";
			// inputs += "<tr><th><label>Destination:
			// </th><td>"+endNode.type+"<input type='hidden'
			// name='destinationTypeName' value='"+endNode.type+"'/><input
			// type='hidden' name='destinationType'
			// value='"+typeMap[endNode.type].id+"'/> </label></td></tr>";
			// inputs += "<tr><td><label>Instance: </td><td>"+dNodeName+"<input
			// type='hidden' name='destinationNodeUuid'
			// value='"+destNode.sysProperties.uuid.value+"'
			// disabled/></td></tr>";
			// inputs += "<tr><td colspan='2'>-------------------</td>";
			// inputs += "<tr><th>Connection
			// used:</th><td>"+connection.name+"<input type='hidden'
			// name='connection' value='"+connection.id+"'/></td></tr>";

			// display the list of properties for this Connection
			connProperties = ruleMapViaId[connection.ruleId].typeProperties;
			inputsProps = "<table  id='properties'>";
			
			var loopCounter = 0;			
			$.each(connProperties, function(key, ruleProperty) {
								if (ruleProperty.isMandatory) {
									propcolor = 'color:red'
								} else {
									propcolor = 'color:black'
								}

								inputsProps += "<tr><th style="
										+ propcolor
										+ "><input type='hidden' name='propertyId' value='"
										+ ruleProperty.id + "'>"
										+ ruleProperty.name + ": </th><td>";

								if (ruleProperty.propertyType === "FILE") {
									inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='file' name='value' onchange='GlobalUtils.showFile(event, \""
											+ ruleProperty.id
											+ "\")'/>"
											+ "<a id='show_image_file_output_"
											+ ruleProperty.id
											+ "' target='_blank' href='' class='imgthumb' style='display:none;'><img id='image_file_output_"
											+ ruleProperty.id
											+ "' style='display:none;' height='50' width='50'></a>"
											+ "<a id='other_file_output_"
											+ ruleProperty.id
											+ "' style='display:none;'></a>"
											+ "("
											+ ruleProperty.propertyType
											+ ")";
								} else if (ruleProperty.propertyType == 'DATE') {
									inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10'  style ='position: relative; z-index: 100000;' name='value' id= '"
											+ ruleProperty.id
											+ "'  value='"
											+ today
											+ "'/>("
											+ ruleProperty.propertyType + ")";
									listDates.push(ruleProperty.id);
								} else if (ruleProperty.propertyType == 'INTEGER') {								
									if (loopCounter == 0) {
										inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57' autofocus/>("
											+ ruleProperty.propertyType + ")";
										
									} else {
										inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>("
											+ ruleProperty.propertyType + ")";
									}									
									inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>("
											+ ruleProperty.propertyType + ")";
								} else if (ruleProperty.propertyType == 'DOUBLE' || ruleProperty.propertyType == 'CURRENCY') {								
									if (loopCounter == 0) {
										inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46' autofocus/>("
											+ ruleProperty.propertyType + ")";
										
									} else {
										inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'/>("
											+ ruleProperty.propertyType + ")";
									}
//									inputsProps += "<input id='create_node_property_"
//											+ ruleProperty.id
//											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'/>("
//											+ ruleProperty.propertyType + ")";
								} else if (ruleProperty.propertyType == 'BOOLEAN') {
									inputsProps += "<form><input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='radio' name='value' value='true'>true   <input type='radio' name='value' value='false'>false</form>";
								} else {
									if (loopCounter == 0) {
										inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10' name='value' autofocus/>("
											+ ruleProperty.propertyType + ")";
										
									} else {
										inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10' name='value' />("
											+ ruleProperty.propertyType + ")";
									}
//									inputsProps += "<input id='create_node_property_"
//											+ ruleProperty.id
//											+ "' type='text' size='10' name='value' />("
//											+ ruleProperty.propertyType + ")";
								}

								inputsProps += "<input type='hidden' name='propertyType' value='"
										+ ruleProperty.propertyType
										+ "'></td></tr>";
								
								loopCounter ++;

							});
			inputsProps += "</table>";

			// var propertyies = ConnectionPropertyUtils.getRulePropertiesHTML(
			// connection, true, false, null, null );

			// var properties2 = ConnectionPropertyUtils.createFormRuleProperty(
			// connection, true, false, null, null ) ;

			inputs += "<label>Properties</label><br>";
			// inputs += "<div id='edgeProperties'>" + propertyies + "</div>";
			// inputs += "<div id='edgeProperties'>" + properties2 + "</div>";
			inputs += "<div id='edgeProperties'>" + inputsProps + "</div><br>";

			// inputs += "</td></tr>";

			formFooter = "<input id='create_edge_button_id' type='button' value='Add Edge' class='btn btn-primary btn-sm' onclick='(new DisplayLogicalRenderer()).saveEdge(form);'/>";
			formFooter += "<input type='button' value='Cancel' class='btn btn-primary btn-sm' onclick='cancelNodeConnection();'/>";
			Form.innerHTML = formHeader + inputs + formFooter;
			// (new DisplayLogicalRenderer()).emptyAllInst();
			$('#create_node_form').empty();
			$('#create_node_form').append(Form);

		} else {
			CommonFctsLogical.HandlingErrorMSG("You Must Select Metadata Repo", "warning");
			$('#console-log').append("<p style='color:red'>You Must Select Metadata Repo</p>");
		}
	}

	this.generateCreateNodeForm = function(typeId) {

		if (selectedMetaData != null) {

			var inputs = '';
			var typeProperties = null;
			var inputsProps = '';
			var decorators = null;
			var propcolor = '';

			var currentType = typeMapViaId[typeId];

			var formHeader = '<form id="create_node_form_for_' + typeId + '">';

			inputs += "<div id='typeName'>";
			if (listInstUuids.length == 1 && listEdgeUuids.length == 0) {
				
				if (drillHistoryList.length > 0) {
					inputs += "<label> Creating " + currentType.name
					+ " Node to Connect " + drillHistoryList[drillHistoryList.length - 1].type
					+ " Node </label>";
				} else {
					inputs += "<label> Creating " + currentType.name
					+ " Node to Connect " + nodeMap[listInstUuids[0]].type
					+ " Node </label>";
				}
//				inputs += "<label> Creating " + currentType.name
//						+ " Node to Connect " + nodeMap[listInstUuids[0]].type
//						+ " Node </label>";
			} else {
				inputs += "<label> Creating " + currentType.name
						+ " Node </label>";
			}
			inputs += "<input type='hidden' name='type' value='"
					+ currentType.name
					+ "'/><input type='hidden' name='typeId' value='"
					+ currentType.id + "'/></div>";

			// display the list of properties for this Type
			typeProperties = currentType.typeProperties;
			inputsProps = "<table  id='properties'>";
			var loopCounter = 0;
			$.each(typeProperties, function(key, typeProperty) {
				
								if (typeProperty.isMandatory) {
									propcolor = 'color:red'
								} else {
									propcolor = 'color:black'
								}

								inputsProps += "<tr><th style="
										+ propcolor
										+ "><input type='hidden' name='propertyId' value='"
										+ typeProperty.id + "'>"
										+ typeProperty.name + ": </th><td>";

								if (typeProperty.propertyType === "FILE") {
									inputsProps += "<input id='create_node_property_"
											+ typeProperty.id
											+ "' type='file' name='value' onchange='GlobalUtils.showFile(event, \""
											+ typeProperty.id
											+ "\")' autofocus/>"
											+ "<a id='show_image_file_output_"
											+ typeProperty.id
											+ "' target='_blank' href='' class='imgthumb' style='display:none;'><img id='image_file_output_"
											+ typeProperty.id
											+ "' style='display:none;' height='50' width='50'></a>"
											+ "<a id='other_file_output_"
											+ typeProperty.id
											+ "' style='display:none;'></a>"
											+ "("
											+ typeProperty.propertyType
											+ ")";
								} else if (typeProperty.propertyType == 'DATE') {
									inputsProps += "<input id='create_node_property_"
											+ typeProperty.id
											+ "' type='text' size='10'  style ='position: relative; z-index: 100000;' name='value' id= '"
											+ typeProperty.id
											+ "'  value='"
											+ today
											+ "'/>("
											+ typeProperty.propertyType + ")";
									listDates.push(typeProperty.id);
								} else if (typeProperty.propertyType == 'INTEGER') {								
									if (loopCounter == 0) {
										inputsProps += "<input id='create_node_property_"
											+ typeProperty.id
											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57' autofocus/>("
											+ typeProperty.propertyType + ")";
										
									} else {
										inputsProps += "<input id='create_node_property_"
											+ typeProperty.id
											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>("
											+ typeProperty.propertyType + ")";
									}
//									inputsProps += "<input id='create_node_property_"
//											+ typeProperty.id
//											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>("
//											+ typeProperty.propertyType + ")";
								} else if (typeProperty.propertyType == 'DOUBLE' || typeProperty.propertyType == 'CURRENCY') {
									if (loopCounter == 0) {										
										inputsProps += "<input id='create_node_property_"
											+ typeProperty.id
											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46' autofocus/>("
											+ typeProperty.propertyType + ")";
										
									} else {
										inputsProps += "<input id='create_node_property_"
											+ typeProperty.id
											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'/>("
											+ typeProperty.propertyType + ")";
									}
//									inputsProps += "<input id='create_node_property_"
//											+ typeProperty.id
//											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'/>("
//											+ typeProperty.propertyType + ")";
								} else if (typeProperty.propertyType == 'BOOLEAN') {
									inputsProps += "<form><input id='create_node_property_"
											+ typeProperty.id
											+ "' type='radio' name='value' value='true'>true   <input type='radio' name='value' value='false'>false</form>";
								} else {
									if (loopCounter == 0) {
										inputsProps += "<input id='create_node_property_"
											+ typeProperty.id
											+ "' type='text' size='10' name='value' autofocus/>("
											+ typeProperty.propertyType + ")";
										
									} else {
										inputsProps += "<input id='create_node_property_"
											+ typeProperty.id
											+ "' type='text' size='10' name='value' />("
											+ typeProperty.propertyType + ")";
									}
//									inputsProps += "<input id='create_node_property_"
//											+ typeProperty.id
//											+ "' type='text' size='10' name='value' />("
//											+ typeProperty.propertyType + ")";
								}

								inputsProps += "<input type='hidden' name='propertyType' value='"
										+ typeProperty.propertyType
										+ "'></td></tr>";
								
								loopCounter ++;

							});
			inputsProps += "</table>";

			// display the list of decorators properties for this Type
			decorators = currentType.decorators; // list of decorators for
			// the type.
			var inputDecoAll = '';
			decorators
					.forEach(function(deco) {

						// look into the deco-properties table for that
						// decorator
						if (deco == selectedDeco.id) {
							// retrieve the properties
							var decoProps = selectedDeco.decoProps;
							var inputsDecoProps = "<table  id='decoproperties' style='display:none'>";
							inputsDecoProps += "<caption>Fill in the Properties values for Decorator "
									+ selectedDeco.name + "</caption>";

							// loop through to display list of properties to
							// enter values for
							decoProps
									.forEach(function(decoProperty) {
										if (decoProperty.display
												&& !decoProperty.isHidden) {

											if (decoProperty.name == "x"
													&& dragItemPositionX != null) {
												inputsDecoProps += "<tr><th><input type='hidden' name='id' value='"
														+ decoProperty.id
														+ "'>"
														+ "<input type='hidden' name='propertyName' value='"
														+ decoProperty.name
														+ "'>"
														+ decoProperty.name
														+ "</th><td>: "
														+ "<input type='text' name='value' value='"
														+ dragItemPositionX
														+ "'/>("
														+ decoProperty.propertyType
														+ ")"
														+ "<input type='hidden' name='propertyType' value='"
														+ decoProperty.propertyType
														+ "'></td></tr>";
											} else if (decoProperty.name == "y"
													&& dragItemPositionY != null) {
												inputsDecoProps += "<tr><th><input type='hidden' name='id' value='"
														+ decoProperty.id
														+ "'>"
														+ "<input type='hidden' name='propertyName' value='"
														+ decoProperty.name
														+ "'>"
														+ decoProperty.name
														+ "</th><td>: "
														+ "<input type='text' name='value' value='"
														+ dragItemPositionY
														+ "'/>("
														+ decoProperty.propertyType
														+ ")"
														+ "<input type='hidden' name='propertyType' value='"
														+ decoProperty.propertyType
														+ "'></td></tr>";
											} else if (decoProperty.name == "z") {
												inputsDecoProps += "<tr><th><input type='hidden' name='id' value='"
														+ decoProperty.id
														+ "'>"
														+ "<input type='hidden' name='propertyName' value='"
														+ decoProperty.name
														+ "'>"
														+ decoProperty.name
														+ "</th><td>: "
														+ "<input type='text' name='value' value='"
														+ 0
														+ "'/>("
														+ decoProperty.propertyType
														+ ")"
														+ "<input type='hidden' name='propertyType' value='"
														+ decoProperty.propertyType
														+ "'></td></tr>";
											} else {
												asd
												inputsDecoProps += "<tr><th><input type='hidden' name='id' value='"
														+ decoProperty.id
														+ "'>"
														+ "<input type='hidden' name='propertyName' value='"
														+ decoProperty.name
														+ "'>"
														+ decoProperty.name
														+ "</th><td>: "
														+ "<input type='text' name='value'/>("
														+ decoProperty.propertyType
														+ ")"
														+ "<input type='hidden' name='propertyType' value='"
														+ decoProperty.propertyType
														+ "'></td></tr>";
											}

										}

									});
							inputsDecoProps += "</table>";
							inputDecoAll += inputsDecoProps;
						}

					});

			// var decoProps, inputsDecoProps, inputDecoAll='';
			// // for each of the decorator
			// decorators.forEach(function(deco){
			// $.each(decos, function(key, value){ // look into the
			// deco-properties table for that decorator
			// if (value.id == deco) {
			// decoProps = value.decoProps; // retrieve the properties
			// inputsDecoProps = "<table id='decoproperties'
			// style='display:none'>";
			// inputsDecoProps += "<caption>Fill in the Properties values for
			// Decorator "+value.name+"</caption>";
			// // loop through to display list of properties to enter values for
			// decoProps.forEach(function(decoProperty){
			// if(decoProperty.display && !decoProperty.isHidden){
			// if (decoProperty.name == "latitude" && cLat != null) {
			// inputsDecoProps += "<tr><th><input type='hidden'
			// name='romeDecoPropId' value='"+decoProperty.id+"'><input
			// type='hidden' name='propertyName' value='"+decoProperty.name+"'>"
			// +
			// decoProperty.name +"</th><td>: <input type='text' name='value'
			// value='" + cLat + "'/>(" +
			// decoProperty.propertyType + ")<input type='hidden'
			// name='propertyType'
			// value='"+decoProperty.propertyType+"'></td></tr>";
			// } else if (decoProperty.name == "longitude" && cLng != null) {
			// inputsDecoProps += "<tr><th><input type='hidden'
			// name='romeDecoPropId' value='"+decoProperty.id+"'><input
			// type='hidden' name='propertyName' value='"+decoProperty.name+"'>"
			// +
			// decoProperty.name +"</th><td>: <input type='text' name='value'
			// value='" + cLng + "'/>(" +
			// decoProperty.propertyType + ")<input type='hidden'
			// name='propertyType'
			// value='"+decoProperty.propertyType+"'></td></tr>";
			// } else {
			// inputsDecoProps += "<tr><th><input type='hidden'
			// name='romeDecoPropId' value='"+decoProperty.id+"'><input
			// type='hidden' name='propertyName' value='"+decoProperty.name+"'>"
			// +
			// decoProperty.name +"</th><td>: <input type='text' name='value'
			// />(" +
			// decoProperty.propertyType + ")<input type='hidden'
			// name='propertyType'
			// value='"+decoProperty.propertyType+"'></td></tr>";
			// }
			// }
			// });
			// inputsDecoProps += "</table>";
			// inputDecoAll += inputsDecoProps;
			// }
			// });
			// });

			var decoList = "";
			decorators
					.forEach(function(deco) {
						var decoName;
						for ( var key in decoMap) {
							if (decoMap[key].id.toString() == deco) {
								decoName = decoMap[key].name;
								break;
							}
						}
						if (decoName == 'Logical') {
							decoList += "<option value='" + deco
									+ "' selected='selected'>" + decoName
									+ "</option>";
						} else {
							decoList += "<option value='" + deco + "'>"
									+ decoName + "</option>";
						}
					});
			var inputsDefaultDeco = "<strong>Default Decorator:&nbsp;</strong>";
			inputsDefaultDeco += "<select name='defaultDecorator'>" + decoList
					+ "</select>";

			// <!-- Allow form submission with keyboard without duplicating the
			// dialog button -->

			var formFooter = "<div id='nodeProperties'>" + inputsProps
					+ "</div><div id='decopropertieslist'>" + inputDecoAll
					+ "</div>"
					+ "<div id='defaultDecoForNode' style='display:none;'>"
					+ inputsDefaultDeco + "</div>";

			return formHeader + inputs + formFooter;

		} else {
			CommonFctsLogical.HandlingErrorMSG("You Must Select Metadata Repo", "warning");
			$('#console-log').append("<p style='color:red'>You Must Select Metadata Repo</p>");
		}

	};

	this.generateCreateOrSearchLinkOptionsOnlyOneTimes = function(divId, typeId) {

		var div = document.getElementById(divId);
		div.innerHTML = "";
		var inputs = this.generateCreateNodeForm(typeId);
		div.innerHTML += inputs;

		// add one time add buttons for all directly required types
		var requiredTypeIds = [];
		requiredTypeIds = this.getAllRequiredChildTypes(typeId);
		var newAddButtonsHTML = this.generateAddButtonsForAllRequiredTypes(
				typeId, requiredTypeIds);

		// var input = '';
		// input += '<input type="radio" class="createOptions"
		// name="mustConn_63" value="create"
		// onclick="DisplayNewFormUtils.showCreateDiv(63, 62 )">';
		// input += 'Create';
		// input += '<input type="radio" class="createOptions"
		// name="mustConn_63" value="create"
		// onclick="DisplayNewFormUtils.showCreateDiv(63, 62 )">';
		// input += 'Search';

		// append new add buttons right after this div
		$("#" + divId).after(newAddButtonsHTML);

	};

	this.generateAddButtonsForAllRequiredTypes = function(typeId,
			requiredTypeIds) {

		var inputs = "";

		var organizedRequiredTypeIds = [];

		$
				.each(
						requiredTypeIds,
						function(index, requiredTypeId) {

							var haveTypeId = false;
							for ( var key1 in requiredTypeIdMap) {
								for ( var key2 in requiredTypeIdMap[key1]) {
									if (requiredTypeIdMap[key1][key2]
											.toString() == requiredTypeId
											.toString()
											|| key1.toString() == requiredTypeId
													.toString()) {
										haveTypeId = true
									}
								}
							}

							if (haveTypeId == false) {
								organizedRequiredTypeIds.push(requiredTypeId);
							}

						});

		requiredTypeIdMap[typeId] = organizedRequiredTypeIds;

		$
				.each(
						organizedRequiredTypeIds,
						function(index, organizedRequiredTypeId) {

							var type = typeMapViaId[organizedRequiredTypeId];
							if (listInstUuids.length != 1
									|| listEdgeUuids.length != 0) {
								var type = typeMapViaId[organizedRequiredTypeId];
								var input = "";
								input += '<br><p style="color:Blue">'
										+ typeMapViaId[typeId].name
										+ ' ======> ' + type.name + '</p>';
								input += '<div id="add_node_div_for_' + type.id
										+ '">';
								input += '<input id="add_node_button_'
										+ type.id
										+ '" type="button" value="Add" class="btn btn-primary btn-sm" onclick="(new DisplayLogicalRenderer()).generateCreateOrSearchLinkOptionsOnlyOneTimes(\'add_node_div_for_'
										+ type.id + '\', ' + type.id + ');">';
								input += '</div>';
								inputs += input;
							} else {
								if (Number(type.id) != nodeMap[listInstUuids[0]].typeId) {
									var type = typeMapViaId[organizedRequiredTypeId];
									var input = "";
									input += '<br><p style="color:Blue">'
											+ typeMapViaId[typeId].name
											+ ' ======> ' + type.name + '</p>';
									input += '<div id="add_node_div_for_'
											+ type.id + '">';
									input += '<input id="add_node_button_'
											+ type.id
											+ '" type="button" value="Add" class="btn btn-primary btn-sm" onclick="(new DisplayLogicalRenderer()).generateCreateOrSearchLinkOptionsOnlyOneTimes(\'add_node_div_for_'
											+ type.id + '\', ' + type.id
											+ ');">';
									input += '</div>';
									inputs += input;
								}
							}

							// var type = typeMapViaId[organizedRequiredTypeId];
							// var input = "";
							// input += '<br><p style="color:Blue">' +
							// typeMapViaId[typeId].name + ' ======> ' +
							// type.name + '</p>';
							// input += '<div id="add_node_div_for_' + type.id +
							// '">';
							// input += '<input id="add_node_button_' + type.id
							// + '" type="button" value="Add" class="btn
							// btn-primary btn-sm" onclick="(new
							// DisplayLogicalRenderer()).generateCreateOrSearchLinkOptionsOnlyOneTimes(\'add_node_div_for_'
							// + type.id + '\', ' + type.id + ');">';
							// input += '</div>';
							// inputs += input;

						});

		return inputs;

	};

	this.generateCreateOrSearchLinkOptions = function(divId, typeId) {

		var div = document.getElementById(divId);

		var input = "";

		div.innerHTML += input;

	};

	this.getAllRequiredChildTypes = function(typeId) {

		var typeIds = [];

		// $.each( connMap, function( connName, conn ) {
		// if (conn.source == typeId) {
		// // TODO: greater than 1 really not be considered here
		// if (conn.minRel >= 1) {
		// typeIds.push(conn.target);
		// }
		// }
		// });

		$.each(connMapViaId, function(connId, conn) {
			if (conn.source == typeId) {
				// TODO: greater than 1 really not be considered here
				if (conn.minRel >= 1) {
					typeIds.push(conn.target);
				}
			}
		});

		return typeIds;

	};
	
	this.getAllRequiredChildTypesWithoutLinks = function(typeId) {

		var typeIds = [];

		$.each(connMapViaId, function(connId, conn) {
			if (conn.source == typeId && conn.classification == 'parentchild') {
				// TODO: greater than 1 really not be considered here
				if (conn.minRel >= 1) {
					typeIds.push(conn.target);
				}
			}
		});

		return typeIds;

	};

	this.saveNodeInfo = function(typeId) {
		
		var parentNode = null;
		if (drillHistoryList.length > 0) {
			parentNode = drillHistoryList[drillHistoryList.length - 1];
		} else {
			parentNode = nodeMap[listInstUuids[0]];
		}

		var allRequiredHaveFilled = true;
		allRequiredHaveFilled = this.allRequiredPropertyFieldsHaveBeenFilled(typeId, 'create');

		for ( var key in requiredTypeIdMap) {

			$.each(requiredTypeIdMap[key], function(index, requiredTypeId) {

				var addNodeButton = document.getElementById('add_node_button_' + requiredTypeId);
				if (!addNodeButton) {
					// check if all mandatory property fields have been filled
					allRequiredHaveFilled = allRequiredHaveFilled && (new DisplayLogicalRenderer()).allRequiredPropertyFieldsHaveBeenFilled(requiredTypeId, 'create');
				} else {
					allRequiredHaveFilled = allRequiredHaveFilled && false;
				}

			});

		}

		if (listInstUuids.length == 1 && listEdgeUuids.length == 0) {
			if ($.inArray(parentNode.typeId, requiredTypeIdMap[typeId]) == -1) {
				requiredTypeIdMap[typeId].push(parentNode.typeId);
			}
		}

		if (allRequiredHaveFilled == true) {
			var createNodeFormIdPart = "create_node_form_for_";

			for ( var key in requiredTypeIdMap) {

				var node = null;
				if (!requiredTypeIdNodeMap[key]) {

					if ((listInstUuids.length != 1 || listEdgeUuids.length != 0)
							|| Number(key) != parentNode.typeId) {
						var createSelectedTypeNodeForm = document.getElementById(createNodeFormIdPart + key);
						node = this.saveNode(createSelectedTypeNodeForm);
						requiredTypeIdNodeMap[key] = node;
					} else {
						node = parentNode;
					}

				} else {

					if ((listInstUuids.length != 1 || listEdgeUuids.length != 0)
							|| Number(key) != parentNode.typeId) {
						node = requiredTypeIdNodeMap[key];
					} else {
						node = parentNode;
					}

				}
				

				$.each(requiredTypeIdMap[key], function(index, requiredTypeId) {

									if ((listInstUuids.length != 1 || listEdgeUuids.length != 0) || Number(requiredTypeId) != parentNode.typeId) {
										var createRequiredNodeFormIdPart = "create_node_form_for_";
										var createRequiredTypeNodeForm = document.getElementById(createRequiredNodeFormIdPart + requiredTypeId);
										(new DisplayLogicalRenderer()).saveNodeAndEdgeBidirection(node, createRequiredTypeNodeForm);
									} else {
										// just save edge
										
										if (node.sysProperties.uuid.value == parentNode.sysProperties.uuid.value) {
											var createRequiredNodeFormIdPart = "create_node_form_for_";
											var createRequiredTypeNodeForm = document.getElementById(createRequiredNodeFormIdPart + requiredTypeId);
											(new DisplayLogicalRenderer()).saveNodeAndEdgeBidirection(node, createRequiredTypeNodeForm);
										} else {
											(new DisplayLogicalRenderer()).saveEdgeBidirection(node, parentNode);
										}
										
									}

									// var createRequiredNodeFormIdPart =
									// "create_node_form_for_";
									// var createRequiredTypeNodeForm =
									// document.getElementById(createRequiredNodeFormIdPart
									// + requiredTypeId);
									// (new
									// DisplayLogicalRenderer()).saveNodeAndEdgeBidirection(node,
									// createRequiredTypeNodeForm);

								});

			}

			// show node after creation
			var uuid = requiredTypeIdNodeMap[typeId].sysProperties.uuid.value;
			this.cancelCreateNode();
			DisplayCytoscapeUtils.clickANode(uuid);

		} else {
			// show PLEASE FILL ALL REQUIRED FILEDS message
			$('#create_node_error_message_' + typeId).empty()
			$('#create_node_error_message_' + typeId).append(
					"<p style='color:red'>Please Fill All Required Fields</p>");
		}

	};

	this.allRequiredPropertyFieldsHaveBeenFilled = function(typeId, action) {

		var allRequiredHaveFilled = true;

		var typeProperties = typeMapViaId[typeId].typeProperties;

		if (action == 'create') {

			for ( var key in typeProperties) {

				if (typeProperties[key].isMandatory == true) {
					var propertyFiled = document
							.getElementById('create_node_property_' + key);
					if (propertyFiled) {
						if (!propertyFiled.value) {
							allRequiredHaveFilled = false;
						}
					}
				}

			}

		}

		return allRequiredHaveFilled;

	};

	this.saveNode = function(form) {

		var nodeDetails = retrieveNodeFromForm(form);

		if (nodeDetails) {

			var detailNode = {}, result = null;

			var successFunction = function(data) {
				result = data;
				console.log("Node created " + data.type);
				console.log(data);
				if (data) {
					if (!irvCy) {

						console.log("irvCy is empty")

//						$.each(typeMapViaId, function(key, value) {
//							listTypeIds.push(key);
//						});
//						$.each(connMapViaId, function(key, value) {
//							listConnIds.push(key);
//						});
						
						if (currentTypeIds.length == 0) {
							listTypeIds.push(data.typeId);
						} else {
							$.each(currentTypeIds, function(key, value) {
								listTypeIds.push(value);
							});
						}						
//						$.each(currentTypeIds, function(key, value) {
//							listTypeIds.push(value);
//						});
						NodeUtils.loadNodes();
						console.log(listTypeIds);
//						listConnIds = [];
						// NodeUtils.loadAllNodesAndEdges();

						(new DisplayLogicalRenderer()).loadView();
						// initInstanceGraph(); // should never execute
					} else {
						DisplayCytoscapeUtils.updateInstanceGraph(irvCy, DisplayCytoscapeUtils.formatSingleNode(data));
						(new DisplayLogicalRenderer()).loadTypeInstBar(nodeMap);
					}

					detailNode.nodes = [];
					detailNode.nodes.push(data);
					message = "<p style='color:green'> Node Saved</p>";
					message = '';
					
					saveLogicalPosition();
					
				}
			};

			var failFunction = function(xhr, ajaxOptions, error) {
				console.log('Node Create Error: ' + xhr.status);
				CommonFctsLogical.HandlingErrorMSG('Node Create Error: ' + xhr.status, "error");
				$('#console-log').append('Node Create Error: ' + xhr.status);
			};

			var nodeApi = new NodeApis();
			nodeApi.saveNode(nodeDetails, successFunction, failFunction);

			return result;
		}

	};

	this.saveNodeAndEdgeBidirection = function(nodeToConnect, form) {

		var destUuid = "";
		var EdgeDetails = {};

		if (selectedMetaData != null) {

			var typeInfo = {};
			$(form).find('div#typeName').find(':input').each(
					function(i, field) {
						typeInfo[field.name] = field.value;
					});

			var data = null;
			if (!requiredTypeIdNodeMap[typeInfo.typeId]) {
				data = this.saveNode(form);
				requiredTypeIdNodeMap[typeInfo.typeId] = data;
			} else {
				data = requiredTypeIdNodeMap[typeInfo.typeId];
			}

			if (data) {

				console.log("Node created " + data.type);

				// Retrieve the new uuid
				var nodeUuid = NodeUtils.findUUID(data);
				var nodeType = data.typeId;

				var conns1 = GlobalConnUtils.findConnsBySourceAndTarget(
						data.typeId, nodeToConnect.typeId);
				var conns2 = GlobalConnUtils.findConnsBySourceAndTarget(
						nodeToConnect.typeId, data.typeId);
				var edgeNodeUuid = nodeToConnect.sysProperties.uuid.value;
				var edgeNodeType = nodeToConnect.typeId;

				if (conns1) {
					for ( var key in conns1) {
						EdgeDetails.originType = nodeType.toString();
						EdgeDetails.originNodeUuid = nodeUuid;
						EdgeDetails.destinationType = edgeNodeType.toString();
						EdgeDetails.destinationNodeUuid = edgeNodeUuid;
						EdgeDetails.connection = conns1[key].id.toString();
						if (conns1[key].classification == 'parentchild') {
							saveGenerateEdge(EdgeDetails);
						}
//						saveGenerateEdge(EdgeDetails);
					}
				}

				if (conns2) {
					for ( var key in conns2) {
						EdgeDetails.originType = edgeNodeType.toString();
						EdgeDetails.originNodeUuid = edgeNodeUuid;
						EdgeDetails.destinationType = nodeType.toString();
						EdgeDetails.destinationNodeUuid = nodeUuid;
						EdgeDetails.connection = conns2[key].id.toString();
						if (conns2[key].classification == 'parentchild') {
							saveGenerateEdge(EdgeDetails);
						}
//						saveGenerateEdge(EdgeDetails);
					}
				}

			}

		} else {
			CommonFctsLogical.HandlingErrorMSG("You Must Select Metadata Repo", "warning");
			$('#console-log').append("<p style='color:red'>You Must Select Metadata Repo</p>");
			cancelInstForm();
		}

	};

	this.saveEdge = function(form) {
		var jsonData = {}, edgeProperties = [], edgeProperty = {};

		$(form)
				.find(':input')
				.each(
						function(i, field) {
							if ((field.type != 'submit'
									&& field.type != 'radio' && field.type != 'button')
									|| field.checked) {
								jsonData[field.name] = field.value;
							}
						});

		// // need to grab any property edges that were defined for this edge
		// type
		// $(form).find(':input').each(function (i, field) {
		// if ((field.type != 'submit' && field.type != 'radio' && field.type !=
		// 'button') || field.checked) {
		// jsonData[field.name] = field.value;
		// }
		// });

		$(form)
				.find('div#edgeProperties')
				.find('tr')
				.each(
						function(i, propDiv) {

							$(propDiv)
									.find(':input')
									.each(
											function(i, field) {
												if ((field.type != 'submit' && field.type != 'radio')
														|| field.checked) {
													if (field.type === 'file') {
														edgeProperty[field.name] = field.files[0];
													} else {
														edgeProperty[field.name] = field.value;
													}
													// edgeProperty[field.name]
													// = field.value;
												}
											});

							if (edgeProperty.propertyType === "FILE") {

								if (edgeProperty.value) {
									var file = edgeProperty.value;
									edgeProperty.value = {};
									if (file.type.includes("image/")) {
										edgeProperty.value.file = document
												.getElementById('image_file_output_'
														+ edgeProperty.propertyId).src
												.replace("data:" + file.type
														+ ";base64,", "");
									} else {
										edgeProperty.value.file = document
												.getElementById('other_file_output_'
														+ edgeProperty.propertyId).href
												.replace("data:" + file.type
														+ ";base64,", "");
									}
									edgeProperty.value.filename = file.name;
								}

							}
							var isPropMand = ruleMapViaId[connMapViaId[jsonData['connection']].ruleId].typeProperties[edgeProperty.propertyId].isMandatory;
							if (isPropMand) {
								if (edgeProperty.value) {
									edgeProperties.push(edgeProperty);
								} else {
									console
											.log("Missing Value for compulsory property.");
									$('#nodeForm')
											.append(
													"<p style='color:red'>Missing Value for Mandatory property : "
															+ edgeProperty.propertyName);
									foundError = true;

								}
							} else {
								// not mandatory look if there is a value
								if (edgeProperty.value) {
									edgeProperties.push(edgeProperty);
								}
							}
							edgeProperty = {};

							// console.log(edgeProperty);
							// if ($.isEmptyObject(edgeProperty) == false) {
							// edgeProperties.push(edgeProperty);
							// }
							// edgeProperty = {};
						});
		jsonData.edgeProperties = edgeProperties;

		console.log(jsonData);
		if (selectedMetaData != null) {

			var successFunction = function(data) {
				console.log("Edge Create Success: " + data);
				CommonFctsLogical.HandlingErrorMSG("Edge Create Success", "success");
				$('#console-log').append("Edge Create Success: " + data);

//				(new DisplayLogicalRenderer()).initConnectionBarInst();
				
//				DisplayCytoscapeUtils.updateInstanceGraph(irvCy, DisplayCytoscapeUtils.formatSingleEdge(data));
				if (nodeMap[data.originNode.sysProperties.uuid.value] && nodeMap[data.destinationNode.sysProperties.uuid.value]) {
					DisplayCytoscapeUtils.updateInstanceGraph(irvCy, DisplayCytoscapeUtils.formatSingleEdge(data));
				}
//				if (currentTypeIds.length != 0) {
//					if (currentTypeIds.includes(data.originTypeId) && currentTypeIds.includes(data.destinationTypeId)) {
//						DisplayCytoscapeUtils.updateInstanceGraph(irvCy, DisplayCytoscapeUtils.formatSingleEdge(data));
//					} else if (nodeMap[data.originNode.sysProperties.uuid.value] && nodeMap[data.destinationNode.sysProperties.uuid.value]) {
//						DisplayCytoscapeUtils.updateInstanceGraph(irvCy, DisplayCytoscapeUtils.formatSingleEdge(data));
//					}
//				}

				(new DisplayLogicalRenderer()).emptyAllInst();
				$("#create_node").dialog("close");
				cancelNodeConnection();

				if (irvCy) {
					irvCy.filter('node').removeClass('highlight');
				}
				// irvCy.filter('node').removeClass('highlight');

				// DisplayCytoscapeUtils.clickAEdge(NodeUtils.findUUID(data));

				startNodeForLinking = null;
				endNodeForLinking = null;
				$('#nodes_for_linking_cache_form').empty();
				$("#cache_nodes_for_linking").dialog("close");

			};

			var failFunction = function(xhr, ajaxOptions, error) {
				console.log('Edge Create Error: ' + xhr.responseText);
				CommonFctsLogical.HandlingErrorMSG("Edge Create Error: " + xhr.status, "error");
				$('#console-log').append("<p style='color:red'>Edge Create Error: " + xhr.status + "</p>");
				$("#nodeForm").empty();
				$("#nodeForm")
						.append(
								"<p style='color:red'>Cannot Connect Destination Node to Seletec Node</p>");
				cancelNodeConnection();
			};

			var edgeApi = new EdgeApis();
			edgeApi.saveEdge(jsonData, successFunction, failFunction);

		} else {
			CommonFctsLogical.HandlingErrorMSG("You Must Select Metadata Repo", "warning");
			$('#console-log').append("<p style='color:red'>You Must Select Metadata Repo</p>");
			this.cancelInstForm();
		}

	};

	this.saveEdgeBidirection = function(node1, node2) {

		var node1Uuid = node1.sysProperties.uuid.value;
		var node2Uuid = node2.sysProperties.uuid.value;

		var conns1 = GlobalConnUtils.findConnsBySourceAndTarget(node1.typeId,
				node2.typeId);
		var conns2 = GlobalConnUtils.findConnsBySourceAndTarget(node2.typeId,
				node1.typeId);

		var EdgeDetails = {};

		if (conns1) {
			for ( var key in conns1) {
				EdgeDetails.originType = node1.typeId.toString();
				EdgeDetails.originNodeUuid = node1Uuid;
				EdgeDetails.destinationType = node2.typeId.toString();
				EdgeDetails.destinationNodeUuid = node2Uuid;
				EdgeDetails.connection = conns1[key].id.toString();
				if (conns1[key].classification == 'parentchild') {
					saveGenerateEdge(EdgeDetails);
				}
//				saveGenerateEdge(EdgeDetails);
			}
		}

		if (conns2) {
			for ( var key in conns2) {
				EdgeDetails.originType = node2.typeId.toString();
				EdgeDetails.originNodeUuid = node2Uuid;
				EdgeDetails.destinationType = node1.typeId.toString();
				EdgeDetails.destinationNodeUuid = node1Uuid;
				EdgeDetails.connection = conns2[key].id.toString();
				if (conns2[key].classification == 'parentchild') {
					saveGenerateEdge(EdgeDetails);
				}
//				saveGenerateEdge(EdgeDetails);
			}
		}

	};

	this.cancelInstForm = function() {
		$('#nodeForm').empty();
		$('#create_node_form').empty();
		$("#create_node").dialog("close");
	};

	this.cancelCreateNode = function() {
		$('#create_node_form').empty();
		$("#create_node").dialog("close");
		requiredTypeIdMap = {};
		requiredTypeIdNodeMap = {};
	};

	this.showNodeToolTip = function(NodeUid) {
		// show the details of Node and Its model default
		var node = nodeMap[NodeUid];
		var inputs = '';
		inputs += "<table><tr><th>Type:</th><td>" + node.type + "</td></tr>";
		inputs += "<tr><th>Name:</th><td>" + node.cyDisplay + "</td></tr>";
		inputs += "<tr><th colspan='2'>--------</th></tr>";
		inputs += "<tr><th>Model</th><td>";
		if (node.modelId) {
			inputs += node.modelId;
			inputs += "</td></tr>";
			inputs += "<tr><th>PartGroup</th><td>";
			if (node.partGroup) {
				inputs += node.partGroup;
			} else {
				inputs += "default Part "
			}
		} else {
			inputs += "no model associated "
		}
		inputs += "</td></tr>";

		// inputs += "<tr><td><input type='button' value='Set Focus'
		// onclick=\"setFocus('"+NodeUid+"')\"/></td>";
		// inputs += "<td><input type='button' value='unSet Focus'
		// onclick=\"unsetFocus('"+NodeUid+"')\"/></td></tr>";

		inputs += "</table>";
		return inputs;
	};

	this.showEdgeToolTip = function(simpleEdge) {

		var edge = edgeMap[simpleEdge.uuid];
		var connection = connMapViaId[edge.connectionId];

		inputs = "<table><tr><th>Connection: </th><td>" + connection.name
				+ "</td></tr>";
		inputs += "<tr><th>Rule: </th><td>" + edge.ruleName + "</td></tr>";
		inputs += "<tr><th>Origin Node: </th><td>" + simpleEdge.originNodeName
				+ "</td></tr>";
		inputs += "<tr><th>Destination Node: </th><td>"
				+ simpleEdge.destinationNodeName + "</td></tr>";
		inputs += "<tr><th title='-1 means infinite.'>Max Rel: </th><td>"
				+ connection.maxRel + "</td></tr>";
		inputs += "<tr><th title='0 means optional, greater than 0 means required.'>Min Rel: </th><td>"
				+ connection.minRel + "</td></tr>";
		inputs += "</table>";

		return inputs;

	};

	this.showEdgeDetails = function(edgeUuid) {

		var edge = edgeMap[edgeUuid];
		var connection = connMapViaId[edge.connectionId];
		var rule = ruleMapViaId[edge.ruleId];
		var startNode = nodeMap[edge.originNode.sysProperties.uuid.value];
		var endNode = nodeMap[edge.destinationNode.sysProperties.uuid.value];

		// $("#grid-instances").css({'visibility':'visible'});
		// (new DisplayLogicalRenderer()).emptyAllInst();
		// $("#create_node").dialog("open");

		// Number(connection.minRel) < 1
		if (true) {

			var Form = document.createElement('div');

			var formHeader = "<form id='updateEdgeDialog'>", inputs = "";
			var formFooter = '';
			inputs += "<table id='updateEdgeTable'>";

			inputs += "<tr><td><b>Connection: </b></td><td><input type='hidden' name='connection' value='"
					+ connection.id
					+ "'><input type='hidden' name='edge' value='"
					+ edge.sysProperties.uuid.value
					+ "'>"
					+ connection.name
					+ "</td></tr>";
			inputs += "<tr><td><b>Start Type: </b></td><td><input type='hidden' name='startNodeType' value='"
					+ startNode.typeId + "'>" + startNode.type + "</td></tr>";
			inputs += "<tr><td><b>Start Node: </b></td><td><input type='hidden' name='startNode' value='"
					+ startNode.sysProperties.uuid.value
					+ "'>"
					+ startNode.cyDisplay + "</td></tr>";
			inputs += "<tr><td><b>End Type: </b></td><td><input type='hidden' name='endNodeType' value='"
					+ endNode.typeId + "'>" + endNode.type + "</td></tr>";
			inputs += "<tr><td><b>End Node: </b></td><td><input type='hidden' name='endNode' value='"
					+ endNode.sysProperties.uuid.value
					+ "'>"
					+ endNode.cyDisplay + "</td></tr>";

			inputs += "</table>";

			if (!$.isEmptyObject(rule.typeProperties)) {

				inputs += "<table id='edgeProperties'>";
				inputs += "<tr><th colspan='3' style='background-color: grey'> Edge Properties:</th><tr>";
				inputs += "<tr><th>Name</th><th>Value</th</tr> ";

				Object
						.values(rule.typeProperties)
						.forEach(
								function(prop) {

									var ruleProperty = rule.typeProperties[prop.id];

									var pName = ruleProperty.name;
									var pId = ruleProperty.id;
									var pType = ruleProperty.propertyType;
									var mandatory = ruleProperty.isMandatory;

									var pValue = null;
									if (edge.ruleProperties
											&& edge.ruleProperties[prop.id]) {
										pValue = edge.ruleProperties[prop.id].value;
									}
									// var pValue =
									// edge.ruleProperties[prop.id].value;

									var textcolor = 'black';

									inputs += "<tr id='props'><th>";
									if (mandatory) {
										textcolor = "red";
									}
									inputs += "<input type='text' style='color:"
											+ textcolor
											+ "' size='6' name='propertyName' value='"
											+ pName + "' disabled></th>";

									if (pType === "FILE") {

										// file for new
										if (!pValue) {
											inputs += '<td>'
													+ '<img id="image_file_output_'
													+ pId
													+ '" height="50" width="50" style="display:none;">'
													+ '<a id="other_file_output_'
													+ pId
													+ '" style="display:none;"></a>';
										} else {
											var mediaType = EdgeUtils
													.convertEdgeFilePropertyValueMediaType(pValue);

											inputs += '<td>';
											if (mediaType.includes("image/")) {
												inputs += '<a target="_blank" href="'
														+ EdgeUtils
																.convertEdgeFilePropertyValueToDataUrl(pValue)
														+ '" class="imgthumb"  ><img id="image_file_output_'
														+ typeProperty.id
														+ '" src="'
														+ NodeUtils
																.convertNodeFilePropertyValueToDataUrl(pValue)
														+ '" height="50" width="50" style="display:;"></a>'
														+ '<a id="other_file_output_'
														+ pId
														+ '" style="display:none;"></a>';
											} else {
												inputs += '<img id="image_file_output_'
														+ pId
														+ '" height="50" width="50" style="display:none;">'
														+ '<a id="other_file_output_'
														+ pId
														+ '" href="'
														+ EdgeUtils
																.convertEdgeFilePropertyValueToDataUrl(pValue)
														+ '" style="display:;">'
														+ pValue.filename
														+ '</a>';
											}
										}

									} else {
										if (pValue == null
												|| pValue == undefined) {
											inputs += "<td ><input  style='background-color:yellow' size='8'  type='text' name='newValue' value='' disabled>";
										} else {
											inputs += "<td><input type='text' size='8' name='newValue' value='"
													+ pValue + "' disabled>";
										}

									}

									inputs += "</td></tr>";
								});
				inputs += "</table>";

			}

			formFooter += "<input type='button' value='Update' class='btn btn-primary btn-sm' onclick='(new DisplayLogicalRenderer()).showUpdateEdge(\""
					+ edgeUuid + "\");'/>";
			formFooter += "<input type='button' value='Delete' class='btn btn-primary btn-sm' onclick='(new DisplayLogicalRenderer()).deleteEdge(form);'/>";
			formFooter += "</form>";

			Form.innerHTML = formHeader + inputs + formFooter;
			$('#nodeForm').empty();
			$('#nodeForm').append(Form);

		} else {
			$('#nodeForm').append(
					"<p style='color:red'>Cannot Delete This Edge</p>");
		}

	};

	this.showEdgeDetailsWait = function(edgeElement) {

		var edgeUuid = NodeUtils.findUUID(edgeElement.data());

		pleaseWait = true;
		setTimeout(
				function() {
					pleaseWait = false;
					if (isSingleClick == false && edgeElement == lastObj) {

						var edge = edgeMap[edgeUuid];
						var connection = connMapViaId[edge.connectionId];
						var rule = ruleMapViaId[edge.ruleId];
						var startNode = nodeMap[edge.originNode.sysProperties.uuid.value];
						var endNode = nodeMap[edge.destinationNode.sysProperties.uuid.value];

						// $("#grid-instances").css({'visibility':'visible'});
						// (new DisplayLogicalRenderer()).emptyAllInst();
						// $("#create_node").dialog("open");

						// Number(connection.minRel) < 1
						if (true) {

							var Form = document.createElement('div');

							var formHeader = "<form id='updateEdgeDialog'>", inputs = "";
							var formFooter = '';
							inputs += "<table id='updateEdgeTable'>";

							inputs += "<tr><td><b>Connection: </b></td><td><input type='hidden' name='connection' value='"
									+ connection.id
									+ "'><input type='hidden' name='edge' value='"
									+ edge.sysProperties.uuid.value
									+ "'>"
									+ connection.name + "</td></tr>";
							inputs += "<tr><td><b>Start Type: </b></td><td><input type='hidden' name='startNodeType' value='"
									+ startNode.typeId
									+ "'>"
									+ startNode.type
									+ "</td></tr>";
							inputs += "<tr><td><b>Start Node: </b></td><td><input type='hidden' name='startNode' value='"
									+ startNode.sysProperties.uuid.value
									+ "'>"
									+ startNode.cyDisplay + "</td></tr>";
							inputs += "<tr><td><b>End Type: </b></td><td><input type='hidden' name='endNodeType' value='"
									+ endNode.typeId
									+ "'>"
									+ endNode.type
									+ "</td></tr>";
							inputs += "<tr><td><b>End Node: </b></td><td><input type='hidden' name='endNode' value='"
									+ endNode.sysProperties.uuid.value
									+ "'>"
									+ endNode.cyDisplay + "</td></tr>";

							inputs += "</table>";

							if (!$.isEmptyObject(rule.typeProperties)) {

								inputs += "<table id='edgeProperties'>";
								inputs += "<tr><th colspan='3' style='background-color: grey'> Edge Properties:</th><tr>";
								inputs += "<tr><th>Name</th><th>Value</th</tr> ";

								Object.values(rule.typeProperties).forEach(function(prop) {

													var ruleProperty = rule.typeProperties[prop.id];

													var pName = ruleProperty.name;
													var pId = ruleProperty.id;
													var pType = ruleProperty.propertyType;
													var mandatory = ruleProperty.isMandatory;

													var pValue = null;
													if (edge.ruleProperties
															&& edge.ruleProperties[prop.id]) {
														pValue = edge.ruleProperties[prop.id].value;
													}
													// var pValue =
													// edge.ruleProperties[prop.id].value;

													var textcolor = 'black';

													inputs += "<tr id='props'><th>";
													if (mandatory) {
														textcolor = "red";
													}
													inputs += "<input type='text' style='color:"
															+ textcolor
															+ "' size='6' name='propertyName' value='"
															+ pName
															+ "' disabled></th>";

													if (pType === "FILE") {

														// file for new
														if (!pValue) {
															inputs += '<td>'
																	+ '<img id="image_file_output_'
																	+ pId
																	+ '" height="50" width="50" style="display:none;">'
																	+ '<a id="other_file_output_'
																	+ pId
																	+ '" style="display:none;"></a>';
														} else {
															var mediaType = EdgeUtils
																	.convertEdgeFilePropertyValueMediaType(pValue);

															inputs += '<td>';
															if (mediaType
																	.includes("image/")) {
																inputs += '<a target="_blank" href="'
																		+ EdgeUtils
																				.convertEdgeFilePropertyValueToDataUrl(pValue)
																		+ '" class="imgthumb"  ><img id="image_file_output_'
																		+ typeProperty.id
																		+ '" src="'
																		+ NodeUtils
																				.convertNodeFilePropertyValueToDataUrl(pValue)
																		+ '" height="50" width="50" style="display:;"></a>'
																		+ '<a id="other_file_output_'
																		+ pId
																		+ '" style="display:none;"></a>';
															} else {
																inputs += '<img id="image_file_output_'
																		+ pId
																		+ '" height="50" width="50" style="display:none;">'
																		+ '<a id="other_file_output_'
																		+ pId
																		+ '" href="'
																		+ EdgeUtils
																				.convertEdgeFilePropertyValueToDataUrl(pValue)
																		+ '" style="display:;">'
																		+ pValue.filename
																		+ '</a>';
															}
														}

													} else {
														if (pValue == null
																|| pValue == undefined) {
															inputs += "<td ><input  style='background-color:yellow' size='8'  type='text' name='newValue' value='' disabled>";
														} else {
															inputs += "<td><input type='text' size='8' name='newValue' value='"
																	+ pValue
																	+ "' disabled>";
														}

													}

													inputs += "</td></tr>";
												});
								inputs += "</table>";

							}

							formFooter += "<input type='button' value='Update' class='btn btn-primary btn-sm' onclick='(new DisplayLogicalRenderer()).showUpdateEdge(\""
									+ edgeUuid + "\");'/>";
							formFooter += "<input type='button' value='Delete' class='btn btn-primary btn-sm' onclick='(new DisplayLogicalRenderer()).deleteEdge(form);'/>";
							formFooter += "</form>";

							Form.innerHTML = formHeader + inputs + formFooter;
							$('#nodeForm').empty();
							$('#nodeForm').append(Form);

						} else {
							$('#nodeForm').append("<p style='color:red'>Cannot Delete This Edge</p>");
						}

					}
				}, doubleClickThreshold + 10);

	};

	this.showUpdateEdge = function(edgeUuid) {
		
		// (new DisplayLogicalRenderer()).cancelInstForm();
		// $("#grid-instances").css({'visibility':'visible'});
		// $("#create_node").dialog("open");

		var edge = edgeMap[edgeUuid];
		var connection = connMapViaId[edge.connectionId];
		var rule = ruleMapViaId[edge.ruleId];
		var startNode = nodeMap[edge.originNode.sysProperties.uuid.value];
		var endNode = nodeMap[edge.destinationNode.sysProperties.uuid.value];

		var Form = document.createElement('div');

		var formHeader = "<form id='edge_update_dialog'>";

		var inputs = "";

		inputs += "<table id='updateEdgeTable'>";

		inputs += "<tr><td><b>Connection: </b></td><td><input type='hidden' name='connection' value='"
				+ connection.id
				+ "'><input type='hidden' name='edge' value='"
				+ edge.sysProperties.uuid.value
				+ "'>"
				+ connection.name
				+ "</td></tr>";
		inputs += "<tr><td><b>Start Type: </b></td><td><input type='hidden' name='startNodeType' value='"
				+ startNode.typeId + "'>" + startNode.type + "</td></tr>";
		inputs += "<tr><td><b>Start Node: </b></td><td><input type='hidden' name='startNode' value='"
				+ startNode.sysProperties.uuid.value
				+ "'>"
				+ startNode.cyDisplay + "</td></tr>";
		inputs += "<tr><td><b>End Type: </b></td><td><input type='hidden' name='endNodeType' value='"
				+ endNode.typeId + "'>" + endNode.type + "</td></tr>";
		inputs += "<tr><td><b>End Node: </b></td><td><input type='hidden' name='endNode' value='"
				+ endNode.sysProperties.uuid.value
				+ "'>"
				+ endNode.cyDisplay
				+ "</td></tr>";

		inputs += "</table>";

		var ruleProperties = rule.typeProperties;
		var edgeProperties = edge.ruleProperties;
		var eUuid = edge.sysProperties.uuid.value;
		var inputProps = "";

		if (!$.isEmptyObject(ruleProperties)) {

			inputProps += "<table id='edge_properties'>";
			inputProps += "<tr><th colspan='3' style='background-color: grey'> Properties:</th><tr>";
			inputProps += "<tr><th>Name</th><th style='display:none;'>Type</th><th>Value</th</tr> ";
			inputProps += "<tr id='props'><td><input type='hidden' name='propertyName' value='uuid'></td><td><input type='hidden'name='value' value='"
					+ eUuid
					+ "'></td><td><input type='hidden'name='propertyType' value='STRING'></td></tr>"

			var loopCounter = 0;
			$.each(ruleProperties, function(key, property) {
								// var isNew = true;
								var pName = property.name;
								var pId = property.id;
								var pType = property.propertyType;
								var mandatory = property.isMandatory;

								var pValue = null;
								if (edgeProperties && edgeProperties[key]) {
									pValue = edgeProperties[key].value;
								}

								var textcolor = 'black';

								inputProps += "<tr id='props'><th>";
								if (mandatory) {
									textcolor = "red";
								}
								inputProps += "<input type='hidden' name='propertyId' value='"
										+ pId
										+ "'><input type='text' style='color:"
										+ textcolor
										+ "' size='6' name='propertyName' value='"
										+ pName + "' disabled></th>";
								inputProps += "<td style='display:none;'><input type='text' size='8' name='propertyType' value='"
										+ pType + "' disabled></td>";

								if (pType === "FILE") {
									var mediaType = EdgeUtils
											.convertEdgeFilePropertyValueMediaType(pValue);

									// file for new
									if (!pValue) {
										inputProps += '<td><input type="file" name ="newValue" value="" onchange="GlobalUtils.showFile(event, \''
												+ pId
												+ '\')" style="background-color:yellow"/>'
												+ '<a id="show_image_file_output_'
												+ pId
												+ '" target="_blank" href="" class="imgthumb" style="display:none;"><img id="image_file_output_'
												+ pId
												+ '" height="50" width="50" style="display:none;"></a>'
												+ '<a id="other_file_output_'
												+ pId
												+ '" style="display:none;"></a>';
									} else {
										inputProps += '<td><input type="file" name ="newValue" value="'
												+ EdgeUtils
														.convertEdgeFilePropertyValueToDataUrl(pValue)
												+ '" onchange="GlobalUtils.showFile(event, \''
												+ pId + '\')"/>';
										if (mediaType.includes("image/")) {
											inputProps += '<a id="show_image_file_output_'
													+ pId
													+ '" target="_blank" href="'
													+ EdgeUtils
															.convertEdgeFilePropertyValueToDataUrl(pValue)
													+ '" class="imgthumb" style="display:;"><img id="image_file_output_'
													+ pId
													+ '" src="'
													+ EdgeUtils
															.convertEdgeFilePropertyValueToDataUrl(pValue)
													+ '" height="50" width="50" style="display:;"></a>'
													+ '<a id="other_file_output_'
													+ pId
													+ '" style="display:none;"></a>';
										} else {
											inputProps += '<a id="show_image_file_output_'
													+ pId
													+ '" target="_blank" href="" class="imgthumb" style="display:none;"><img id="image_file_output_'
													+ pId
													+ '" height="50" width="50" style="display:none;"></a>'
													+ '<a id="other_file_output_'
													+ pId
													+ '" href="'
													+ EdgeUtils
															.convertEdgeFilePropertyValueToDataUrl(pValue)
													+ '" style="display:;">'
													+ pValue.filename + '</a>';
										}
									}
									// file for old
									if (pValue) {
										inputProps += '<input type="file" name ="value" value="'
												+ EdgeUtils
														.convertEdgeFilePropertyValueToDataUrl(pValue)
												+ '" disabled style="display:none;"/>';
										if (mediaType.includes("image/")) {
											inputProps += '<img id="image_file_output_fix_'
													+ pId
													+ '" src="'
													+ EdgeUtils
															.convertEdgeFilePropertyValueToDataUrl(pValue)
													+ '" height="50" width="50" style="display:none;">';
										} else {
											inputProps += '<a id="other_file_output_fix_'
													+ pId
													+ '" href="'
													+ EdgeUtils
															.convertEdgeFilePropertyValueToDataUrl(pValue)
													+ '" style="display:none;"></a>';
										}
									}

								} else if (pType === "BOOLEAN") {

									if (pValue == null || pValue == undefined) {
										inputProps += "<td><form><input type='radio' name='newValue' value='true'>true   <input type='radio' name='newValue' value='false'>false</form>";
									} else {
										inputProps += "<td><form><input id='id_for_boolean_property_"
												+ pId
												+ "_true' type='radio' name='newValue' value='true' onclick='GlobalHTMLUtils.recheckRadioButtons(\"id_for_boolean_property_"
												+ pId
												+ "_true\", \"id_for_boolean_property_"
												+ pId + "_false\");'";
										if (pValue == true) {
											inputProps += " checked";
										}
										;
										inputProps += ">true   ";
										inputProps += "<input id='id_for_boolean_property_"
												+ pId
												+ "_false' type='radio' name='newValue' value='false' onclick='GlobalHTMLUtils.recheckRadioButtons(\"id_for_boolean_property_"
												+ pId
												+ "_false\", \"id_for_boolean_property_"
												+ pId + "_true\");'";
										if (pValue == false) {
											inputProps += " checked";
										}
										;
										inputProps += ">false</form>";
									}

									inputProps += "<input type='hidden' name='value' value='"
											+ pValue + "'>";
								} else if (pType === "DATE") {
									if (!pValue) {
										inputProps += "<td><input title='"
												+ pType
												+ "' size='8' type='text' style ='background-color: yellow; position: relative; z-index: 100000;' name='newValue' value='' id= '"
												+ pId + "'/>";
									} else {
										inputProps += "<td><input title='"
												+ pType
												+ "' type='text' style ='position: relative; z-index: 100000;' size='8' name='newValue' value='"
												+ pValue + "' id= '" + pId
												+ "'/>";
									}
									listDates.push(pId);
									inputProps += "<input type='hidden' name='value' value='"
											+ pValue + "'>";
								} else if (pType === "INTEGER") {
									if (loopCounter == 0) {
										if (!pValue) {
											inputProps += "<td ><input  title='"
													+ pType
													+ "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' onkeypress='return event.charCode >= 48 && event.charCode <= 57' autofocus onfocus=\"var temp_value=this.value; this.value=''; this.value=temp_value;\">";
										} else {
											inputProps += "<td><input title='"
													+ pType
													+ "' type='text' size='8' name='newValue' value='"
													+ pValue
													+ "' onkeypress='return event.charCode >= 48 && event.charCode <= 57' autofocus onfocus=\"var temp_value=this.value; this.value=''; this.value=temp_value;\">";
										}				
									} else {
										if (!pValue) {
											inputProps += "<td ><input  title='"
													+ pType
													+ "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' onkeypress='return event.charCode >= 48 && event.charCode <= 57'>";
										} else {
											inputProps += "<td><input title='"
													+ pType
													+ "' type='text' size='8' name='newValue' value='"
													+ pValue
													+ "' onkeypress='return event.charCode >= 48 && event.charCode <= 57'>";
										}
									}
//									if (!pValue) {
//										inputProps += "<td ><input  title='"
//												+ pType
//												+ "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' onkeypress='return event.charCode >= 48 && event.charCode <= 57'>";
//									} else {
//										inputProps += "<td><input title='"
//												+ pType
//												+ "' type='text' size='8' name='newValue' value='"
//												+ pValue
//												+ "' onkeypress='return event.charCode >= 48 && event.charCode <= 57'>";
//									}
									inputProps += "<input type='hidden' name='value' value='"
											+ pValue + "'>";
								} else if (pType === "DOUBLE" || pType === "CURRENCY") {
									if (loopCounter == 0) {
										if (!pValue) {
											inputProps += "<td ><input  title='"
													+ pType
													+ "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46' autofocus onfocus=\"var temp_value=this.value; this.value=''; this.value=temp_value;\">";
										} else {
											inputProps += "<td><input title='"
													+ pType
													+ "' type='text' size='8' name='newValue' value='"
													+ pValue
													+ "' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46' autofocus onfocus=\"var temp_value=this.value; this.value=''; this.value=temp_value;\">";
										}				
									} else {
										if (!pValue) {
											inputProps += "<td ><input  title='"
													+ pType
													+ "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'>";
										} else {
											inputProps += "<td><input title='"
													+ pType
													+ "' type='text' size='8' name='newValue' value='"
													+ pValue
													+ "' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'>";
										}
									}
//									if (!pValue) {
//										inputProps += "<td ><input  title='"
//												+ pType
//												+ "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'>";
//									} else {
//										inputProps += "<td><input title='"
//												+ pType
//												+ "' type='text' size='8' name='newValue' value='"
//												+ pValue
//												+ "' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'>";
//									}
									inputProps += "<input type='hidden' name='value' value='"
											+ pValue + "'>";
								} else {
									if (loopCounter == 0) {
										if (!pValue) {
											inputProps += "<td ><input  title='"
													+ pType
													+ "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' autofocus onfocus=\"var temp_value=this.value; this.value=''; this.value=temp_value;\">";
										} else {
											inputProps += "<td><input title='"
													+ pType
													+ "' type='text' size='8' name='newValue' value='"
													+ pValue + "' autofocus onfocus=\"var temp_value=this.value; this.value=''; this.value=temp_value;\">";
										}				
									} else {
										if (!pValue) {
											inputProps += "<td ><input  title='"
													+ pType
													+ "' style='background-color:yellow' size='8'  type='text' name='newValue' value=''>";
										} else {
											inputProps += "<td><input title='"
													+ pType
													+ "' type='text' size='8' name='newValue' value='"
													+ pValue + "'>";
										}
									}
//									if (!pValue) {
//										inputProps += "<td ><input  title='"
//												+ pType
//												+ "' style='background-color:yellow' size='8'  type='text' name='newValue' value=''>";
//									} else {
//										inputProps += "<td><input title='"
//												+ pType
//												+ "' type='text' size='8' name='newValue' value='"
//												+ pValue + "'>";
//									}
									inputProps += "<input type='hidden' name='value' value='"
											+ pValue + "'>";
								}

								inputProps += "</td></tr>";
								loopCounter ++;
							});
			inputProps += "</table>";
		}

		var formFooter = "<input id='update_edge_button_id' type='button' value='Update' class='btn btn-primary btn-sm'  onclick='updateEdgeProperties(form)' />";
		formFooter += "<input id='cancel_update_edge_button_id' type='button' value='Cancel' class='btn btn-primary btn-sm'  onclick='(new DisplayLogicalRenderer()).showEdgeDetails(\""
				+ eUuid + "\");' />";
		userActions.prevaction = userActions.currentaction;
		userActions.currentaction = 'updateEdge';

		Form.innerHTML = formHeader + inputs + inputProps + formFooter;
		// (new DisplayLogicalRenderer()).emptyAllInst();
		$('#nodeForm').empty();
		$('#nodeForm').append(Form);

		DisplayInterfaceUtils.addDatePicker('');

	};

	this.deleteEdge = function(form) {

		var inputData = {};
		$(form)
				.find(':input')
				.each(
						function(i, field) {
							if ((field.type != 'submit'
									&& field.type != 'radio' && field.type != 'button')
									|| field.checked) {
								inputData[field.name] = field.value;
							}
						});

		

		
		var jsonData = {};
		jsonData.connection = Number(inputData.connection);

		var startNode = {};
		startNode.typeIds = [];
		startNode.typeIds.push(Number(inputData.startNodeType));
		var sysProperty1 = {};
		sysProperty1.propertyName = "uuid"
		sysProperty1.propertyType = "STRING";
		sysProperty1.value = inputData.startNode;
		startNode.sysProperties = [];
		startNode.sysProperties.push(sysProperty1);
		jsonData.startNode = startNode;

		var endNode = {};
		endNode.typeIds = [];
		endNode.typeIds.push(Number(inputData.endNodeType));
		var sysProperty2 = {};
		sysProperty2.propertyName = "uuid"
		sysProperty2.propertyType = "STRING";
		sysProperty2.value = inputData.endNode;
		endNode.sysProperties = [];
		endNode.sysProperties.push(sysProperty2);
		jsonData.endNode = endNode;

		var toDeleteEdge = {};
		toDeleteEdge.connection = inputData.connection.toString();
		var sysProperty3 = {};
		sysProperty3.propertyName = "uuid"
		sysProperty3.propertyType = "STRING";
		sysProperty3.value = inputData.edge;
		toDeleteEdge.sysProperties = [];
		toDeleteEdge.sysProperties.push(sysProperty3);
		jsonData.toDeleteEdge = toDeleteEdge;
		
		var jsonDataEdge = {};
		
		var edgeTmp = edgeMap[inputData.edge];
		jsonDataEdge.connection = edgeTmp;
		
//		console.log("Edge id?:" + inputData.edge );
//		console.log( edgeTmp );
//		
//		console.log("NEW DATA");
//		console.log( jsonDataEdge );
//		console.log("OLD DATA" );
//		console.log( jsonData);
		

		if (selectedMetaData != null) {

			var successFunction = function() {

				// delete element in edgeMap and irvCy
				delete edgeMap[inputData.edge];
				irvCy.$(':selected').remove();

				(new DisplayLogicalRenderer()).emptyAllInst();

			};

			var failFunction = function(xhr, status, error) {

				if (xhr.status != 200) {
					console.log('Edge Create Error: ' + xhr.responseText);
					CommonFctsLogical.HandlingErrorMSG("Edge Create Error: " + xhr.status, "error");
					$('#console-log').append("<p style='color:red'>Edge Create Error: " + xhr.status + "</p>");
					$("#nodeForm").empty();
					$("#nodeForm").append(
							"<p style='color:red'>Failed to delete edge.</p>");
				}

			};

			var edgeApi = new EdgeApis();
			edgeApi.deleteEdge(jsonDataEdge, successFunction, failFunction);

		} else {
			CommonFctsLogical.HandlingErrorMSG("You Must Select Metadata Repo", "warning");
			$('#console-log').append("<p style='color:red'>You Must Select Metadata Repo</p>");
			this.cancelInstForm();
		}

	};
	
	

	this.cancelUpdateNodeForm = function(uuid) {
		this.emptyAllInst();
		$(".qtip").remove();
		DisplayCytoscapeUtils.clickANode(uuid);
	}

	this.cacheNodesForLinking = function(nodeUuid, asStartOrEnd) {

		var temp = {};
		
		if (asStartOrEnd == "start") {
			temp = startNodeForLinking;
			startNodeForLinking = {};
			startNodeForLinking.typeId = nodeMap[nodeUuid].typeId
			startNodeForLinking.typeName = nodeMap[nodeUuid].type;
			startNodeForLinking.name = NodeUtils.findNameInst(nodeMap[nodeUuid]);
			startNodeForLinking.uuid = nodeMap[nodeUuid].sysProperties.uuid.value;
			
			if (endNodeForLinking != null) {
				var availableRuleIdList = [];
				$.each(connMapViaId, function(key, value) {
					if (value.source == startNodeForLinking.typeId && value.target == endNodeForLinking.typeId && value.classification == "link") {
						if (!availableRuleIdList.includes(value.ruleId)) {
							availableRuleIdList.push(value.ruleId);
						}
					}
				});
				
				if (availableRuleIdList.length < 1) {
					CommonFctsLogical.HandlingErrorMSG("No Available Links Found", "error");
					startNodeForLinking = temp;	
				} else {
					document.getElementById("session_based_connecting_nodes_small_element_start_id").innerHTML = '<span class="glyphicon glyphicon-remove" onclick="(new DisplayLogicalRenderer()).clearCacheNodesForLinking(\'start\');"></span><br>' + nodeMap[nodeUuid].cyDisplay;
				}
			} else {
				document.getElementById("session_based_connecting_nodes_small_element_start_id").innerHTML = '<span class="glyphicon glyphicon-remove" onclick="(new DisplayLogicalRenderer()).clearCacheNodesForLinking(\'start\');"></span><br>' + nodeMap[nodeUuid].cyDisplay;
			}			
		} else if (asStartOrEnd == "end") {
			temp = endNodeForLinking;
			endNodeForLinking = {};
			endNodeForLinking.typeId = nodeMap[nodeUuid].typeId
			endNodeForLinking.typeName = nodeMap[nodeUuid].type;
			endNodeForLinking.name = NodeUtils.findNameInst(nodeMap[nodeUuid]);
			endNodeForLinking.uuid = nodeMap[nodeUuid].sysProperties.uuid.value;
			
			if (startNodeForLinking != null) {
				var availableRuleIdList = [];
				$.each(connMapViaId, function(key, value) {
					if (value.source == startNodeForLinking.typeId && value.target == endNodeForLinking.typeId && value.classification == "link") {
						if (!availableRuleIdList.includes(value.ruleId)) {
							availableRuleIdList.push(value.ruleId);
						}
					}
				});
				
				if (availableRuleIdList.length < 1) {
					CommonFctsLogical.HandlingErrorMSG("No Available Links Found", "error");
					endNodeForLinking = temp;	
				} else {
					document.getElementById("session_based_connecting_nodes_small_element_end_id").innerHTML = '<span class="glyphicon glyphicon-remove" onclick="(new DisplayLogicalRenderer()).clearCacheNodesForLinking(\'end\');"></span><br>' + nodeMap[nodeUuid].cyDisplay;
				}
			} else {
				document.getElementById("session_based_connecting_nodes_small_element_end_id").innerHTML = '<span class="glyphicon glyphicon-remove" onclick="(new DisplayLogicalRenderer()).clearCacheNodesForLinking(\'end\');"></span><br>' + nodeMap[nodeUuid].cyDisplay;
			}
		} else {
			console.log("Wrong String for Linking Nodes: " + asStartOrEnd);
		}
		
		this.showOrNotSmallNodesConnectingBar();

	}
	
	this.clearCacheNodesForLinking = function(startOrEnd) {
		
		if (startOrEnd == "start") {
			startNodeForLinking = null;
			document.getElementById("session_based_connecting_nodes_small_element_start_id").innerHTML = '';			
		} else if (startOrEnd == "end") {
			endNodeForLinking = null;
			document.getElementById("session_based_connecting_nodes_small_element_end_id").innerHTML = '';
		} else {
			console.log("Wrong String for Linking Nodes: " + asStartOrEnd);
		}
		
		this.showOrNotSmallNodesConnectingBar();

	}
	
	this.showOrNotSmallNodesConnectingBar = function() {

		var startConnectingReady = false;
		if (startNodeForLinking != null) {
			if (startNodeForLinking.name) {
				document.getElementById("session_based_connecting_nodes_small_element_start_id").innerHTML = '<span class="glyphicon glyphicon-remove" onclick="(new DisplayLogicalRenderer()).clearCacheNodesForLinking(\'start\');"></span><br>' 
					+ startNodeForLinking.name;
			} else {
				document.getElementById("session_based_connecting_nodes_small_element_start_id").innerHTML = '<span class="glyphicon glyphicon-remove" onclick="(new DisplayLogicalRenderer()).clearCacheNodesForLinking(\'start\');"></span><br>' 
					+ startNodeForLinking.typeName;
			}
			
			if (nodeMap[startNodeForLinking.uuid]) {
				startConnectingReady = true;
			}
		}
		
		var endConnectingReady = false;
		if (endNodeForLinking != null) {
			if (endNodeForLinking.name) {
				document.getElementById("session_based_connecting_nodes_small_element_end_id").innerHTML = '<span class="glyphicon glyphicon-remove" onclick="(new DisplayLogicalRenderer()).clearCacheNodesForLinking(\'end\');"></span><br>' 
					+ endNodeForLinking.name;
			} else {
				document.getElementById("session_based_connecting_nodes_small_element_end_id").innerHTML = '<span class="glyphicon glyphicon-remove" onclick="(new DisplayLogicalRenderer()).clearCacheNodesForLinking(\'end\');"></span><br>' 
					+ endNodeForLinking.typeName;
			}
			
			if (nodeMap[endNodeForLinking.uuid]) {
				endConnectingReady = true;
//				document.getElementById("session_based_connecting_nodes_small_element_end_id").innerHTML = '<span class="glyphicon glyphicon-asterisk"></span><br>' + nodeMap[endNodeForLinking.uuid].cyDisplay;
			}
		}
		
		if (startNodeForLinking != null || endNodeForLinking != null) {
			document.getElementById("session_based_connecting_nodes_small_div_id").style.display = "";
		} 
//		else {
//			document.getElementById("session_based_connecting_nodes_small_div_id").style.display = "none";
//		}
		
//		startConnectingReady == true && endConnectingReady == true
		if (startNodeForLinking != null && endNodeForLinking != null) {
			$('#session_based_connecting_nodes_small_element_connect_id').attr('disabled', false);
		} else {
			$('#session_based_connecting_nodes_small_element_connect_id').attr('disabled', true);
		}

	}

	this.buildNodesLinkingBucket = function() {

		$("#cache_nodes_for_linking").dialog({
			autoOpen : false,
			width : 'auto',
			height : 'auto',
			title : "Nodes for Linking",
			modal : false,
			top : '249px',
			left : '1486px',
			// position: {
			// my: "right",
			// at: "top"
			// },
			create : function(event, ui) {
				// Set maxWidth
				$(this).css("maxWidth", "800px");
			},
			close : function(event, ui) {
				$("#cache_nodes_for_linking").hide();
			}

		});
		var inputBody = "";
		inputBody = '<div id="nodes_for_linking_cache_form"></div>';
		$("#cache_nodes_for_linking").append(inputBody);

	}

	this.generateNodesForLinkingCacheForm = function() {
		
		if (startNodeForLinking != null || endNodeForLinking != null) {
			$("#cache_nodes_for_linking").dialog("open");

			var Form = document.createElement('div');
			if (selectedMetaData != null) {

				var formHeader = "<form id='addEdgeDialog'>"
				var inputs = "";

				inputs += "<div id='edge_detail'>";

				if (startNodeForLinking != null) {
					inputs += "<label>Origin Type:&nbsp;</label>"
							+ startNodeForLinking.typeName
							+ "<input type='hidden' name='originTypeName' value='"
							+ startNodeForLinking.typeName
							+ "'/><input type='hidden' name='originType' value='"
							+ startNodeForLinking.typeId + "'/><br>";
					inputs += "<label>Origin Node:&nbsp;</label>"
							+ startNodeForLinking.name
							+ "<input type='hidden' name='originNodeUuid' value='"
							+ startNodeForLinking.uuid + "' disabled/><br>";
				} else {
					inputs += "<label>Origin Type:&nbsp;</label>null<input type='hidden' name='originTypeName' value=null/><input type='hidden' name='originType' value=null/><br>";
					inputs += "<label>Origin Node:&nbsp;</label>null<input type='hidden' name='originNodeUuid' value=null disabled/><br>";
				}

				if (endNodeForLinking != null) {
					inputs += "<label>Destination Type:&nbsp;</label>"
							+ endNodeForLinking.typeName
							+ "<input type='hidden' name='destinationTypeName' value='"
							+ endNodeForLinking.typeName
							+ "'/><input type='hidden' name='destinationType' value='"
							+ endNodeForLinking.typeId + "'/><br>";
					inputs += "<label>Destination Node:&nbsp;</label>"
							+ endNodeForLinking.name
							+ "<input type='hidden' name='destinationNodeUuid' value='"
							+ endNodeForLinking.uuid + "' disabled/><br>";
				} else {
					inputs += "<label>Destination Type:&nbsp;</label>null<input type='hidden' name='destinationTypeName' value=null/><input type='hidden' name='destinationType' value=null/><br>";
					inputs += "<label>Destination Node:&nbsp;</label>null<input type='hidden' name='destinationNodeUuid' value=null disabled/><br>";
				}
					
				if (startNodeForLinking != null && endNodeForLinking != null) {
					
					var linkEdges = GlobalEdgeUtils.getAnyEdgeLinkByTwoNodes(startNodeForLinking.typeId, startNodeForLinking.uuid, endNodeForLinking.typeId, endNodeForLinking.uuid);
					var availableRuleIdList = [];
					$.each(connMapViaId, function(key, value) {
						if (value.source == startNodeForLinking.typeId && value.target == endNodeForLinking.typeId && value.classification == "link") {
							if (!availableRuleIdList.includes(value.ruleId)) {
								availableRuleIdList.push(value.ruleId);
							}
						}
					});
					
					if (availableRuleIdList.length > 0) {
						
						if (linkEdges == null) {
							CommonFctsLogical.HandlingErrorMSG("Wrong Data", "error");
							$('#console-log').append("<p style='color:red'>Wrong Data</p>");
							$("#cache_nodes_for_linking").dialog("close");
							return;
						}
						
						if (linkEdges != null && linkEdges.hasOwnProperty("links") && linkEdges.links.length > 0) {
							inputs += "<p style='color:red'>Link Already Exist</p>";
						}
						
//						inputs += "<label>Classification:&nbsp;</label>"
//						+ "<select id='link_rule_select_list' onchange='(new DisplayLogicalRenderer()).generatePCLinkList(this.value);'>"
//						+ "<option value=''></option>"
//						+ "<option value='parentchild'>parentchild</option>"
//						+ "<option value='link'>link</option>"
//						+ "</select><br>";
						var linkOptions = GlobalRuleUtils.createLinkList();
						inputs += "<label>Link:&nbsp;</label><select id='link_rule_select_list' onchange='(new DisplayLogicalRenderer()).generateLinkPropertyForm(this.value);'>"
								+ linkOptions + "</select><br>";
						
					} else {
						CommonFctsLogical.HandlingErrorMSG("No Available Links Found", "error");
						$('#console-log').append("<p style='color:red'>No Available Links Found</p>");
						$("#cache_nodes_for_linking").dialog("close");
						return;
					}
					
				}

//				inputs += "<div id=pc_link_list></div><br>";
				inputs += "<label id='selected_link_connection_label_id'>Connection:&nbsp;</label><input type='hidden' id='selected_link_connection_input_id' name='connection' value='null'/><br>";
				inputs += "<label>Properties</label><br>";
				inputs += "<div id='edgeProperties'></div><br>";

				formFooter = "<input id='create_link_button_id' type='button' value='Add Edge' class='btn btn-primary btn-sm' onclick='(new DisplayLogicalRenderer()).saveEdge(form);'/>";
				formFooter += "<input type='button' value='Cancel' class='btn btn-primary btn-sm' onclick='(new DisplayLogicalRenderer()).cancelNodesForLinkingCacheForm();'/>";
				Form.innerHTML = formHeader + inputs + formFooter;

				$('#nodes_for_linking_cache_form').empty();
				$('#nodes_for_linking_cache_form').append(Form);

				if (document.getElementById("link_rule_select_list") != null) {
					this.generateLinkPropertyForm(document.getElementById("link_rule_select_list").value);
				}

			} else {
				CommonFctsLogical.HandlingErrorMSG("You Must Select Metadata Repo", "warning");
				$('#console-log').append("<p style='color:red'>You Must Select Metadata Repo</p>");
			}
		}

	};
	
	this.cancelNodesForLinkingCacheForm = function() {
		$('#nodes_for_linking_cache_form').empty();
		$("#cache_nodes_for_linking").dialog("close");
	};
	
	this.generatePCLinkList = function(classification) {
		
		var pcLinkList = document.getElementById("pc_link_list");
		
		var inputs = "";
		if (classification == "parentchild") {
			var linkOptions = GlobalRuleUtils.createParentChildConnectionList();
			inputs += "<label>ParentChild:&nbsp;</label><select id='pc_connection_select_list' onchange='(new DisplayLogicalRenderer()).generatePCPropertyForm(this.value);'><option value=''></option>"
				   + linkOptions + "</select><br>";	
		} else if (classification == "link") {
			var linkOptions = GlobalRuleUtils.createLinkList();
			inputs += "<label>Link:&nbsp;</label><select id='link_rule_select_list' onchange='(new DisplayLogicalRenderer()).generateLinkPropertyForm(this.value);'><option value=''></option>"
				   + linkOptions + "</select><br>";
		} else {
//			$('#error_message').empty();
//			$('#error_message').append("<p style='color:red'>Wrong Classification for Creating Edge!</p>");
		}
		
		pcLinkList.innerHTML = inputs;
		
	};

	this.generateLinkPropertyForm = function(ruleId) {

		// find connection to match types of start and end node from selected
		// rule
		var selectedConns = {};
		$.each(connMapViaId, function(key, value) {

			if (value.ruleId == ruleId) {
				selectedConns[key] = value;
			}

		});

		var selectedConnection = null;
		if (startNodeForLinking != null || endNodeForLinking != null) {
			$.each(selectedConns, function(key, value) {
				if (value.source == startNodeForLinking.typeId
						&& value.target == endNodeForLinking.typeId) {
					selectedConnection = value;
				}
			});
		}

		var inputs = "";

		if (selectedConnection != null) {

			// var connection = connMapViaId[selectedConnection];
			var connection = selectedConnection;
			document.getElementById("selected_link_connection_input_id").value = connection.id;

			$("#selected_link_connection_label_id").after(connection.name);

			// display the list of properties for this Connection
			connProperties = ruleMapViaId[connection.ruleId].typeProperties;
			inputsProps = "<table  id='properties'>";
			
			var loopCounter = 0;
			$.each(connProperties, function(key, ruleProperty) {

								if (ruleProperty.isMandatory) {
									propcolor = 'color:red'
								} else {
									propcolor = 'color:black'
								}

								inputsProps += "<tr><th style="
										+ propcolor
										+ "><input type='hidden' name='propertyId' value='"
										+ ruleProperty.id + "'>"
										+ ruleProperty.name + ": </th><td>";

								if (ruleProperty.propertyType === "FILE") {
									inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='file' name='value' onchange='GlobalUtils.showFile(event, \""
											+ ruleProperty.id
											+ "\")'/>"
											+ "<a id='show_image_file_output_"
											+ ruleProperty.id
											+ "' target='_blank' href='' class='imgthumb' style='display:none;'><img id='image_file_output_"
											+ ruleProperty.id
											+ "' style='display:none;' height='50' width='50'></a>"
											+ "<a id='other_file_output_"
											+ ruleProperty.id
											+ "' style='display:none;'></a>"
											+ "("
											+ ruleProperty.propertyType
											+ ")";
								} else if (ruleProperty.propertyType == 'DATE') {
									inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10'  style ='position: relative; z-index: 100000;' name='value' id= '"
											+ ruleProperty.id
											+ "'  value='"
											+ today
											+ "'/>("
											+ ruleProperty.propertyType + ")";
									listDates.push(ruleProperty.id);
								} else if (ruleProperty.propertyType == 'INTEGER') {								
									if (loopCounter == 0) {
										inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57' autofocus/>("
											+ ruleProperty.propertyType + ")";
										
									} else {
										inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>("
											+ ruleProperty.propertyType + ")";
									}
//									inputsProps += "<input id='create_node_property_"
//											+ ruleProperty.id
//											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>("
//											+ ruleProperty.propertyType + ")";
								} else if (ruleProperty.propertyType == 'DOUBLE' || ruleProperty.propertyType == 'CURRENCY') {
									if (loopCounter == 0) {
										inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46' autofocus/>("
											+ ruleProperty.propertyType + ")";
										
									} else {
										inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'/>("
											+ ruleProperty.propertyType + ")";
									}
//									inputsProps += "<input id='create_node_property_"
//											+ ruleProperty.id
//											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'/>("
//											+ ruleProperty.propertyType + ")";
								} else if (ruleProperty.propertyType == 'BOOLEAN') {
									inputsProps += "<form><input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='radio' name='value' value='true'>true   <input type='radio' name='value' value='false'>false</form>";
								} else {								
									if (loopCounter == 0) {
										inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10' name='value' autofocus/>("
											+ ruleProperty.propertyType + ")";
										
									} else {
										inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10' name='value' />("
											+ ruleProperty.propertyType + ")";
									}
									inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10' name='value' />("
											+ ruleProperty.propertyType + ")";
								}

								inputsProps += "<input type='hidden' name='propertyType' value='"
										+ ruleProperty.propertyType
										+ "'></td></tr>";
								
								loopCounter ++;
							});
			inputsProps += "</table>";
			document.getElementById("edgeProperties").innerHTML = inputsProps;

		}

		return inputs;

	};
	
	this.generatePCPropertyForm = function(connId) {

		var connection = connMapViaId[connId];
		
		var inputs = "";
		if (connection) {
			
			document.getElementById("selected_link_connection_input_id").value = connection.id;
			$("#selected_link_connection_label_id").after(connection.name);

			// display the list of properties for this Connection
			connProperties = ruleMapViaId[connection.ruleId].typeProperties;
			inputsProps = "<table  id='properties'>";
			$
					.each(
							connProperties,
							function(key, ruleProperty) {

								if (ruleProperty.isMandatory) {
									propcolor = 'color:red'
								} else {
									propcolor = 'color:black'
								}

								inputsProps += "<tr><th style="
										+ propcolor
										+ "><input type='hidden' name='propertyId' value='"
										+ ruleProperty.id + "'>"
										+ ruleProperty.name + ": </th><td>";

								if (ruleProperty.propertyType === "FILE") {
									inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='file' name='value' onchange='GlobalUtils.showFile(event, \""
											+ ruleProperty.id
											+ "\")'/>"
											+ "<a id='show_image_file_output_"
											+ ruleProperty.id
											+ "' target='_blank' href='' class='imgthumb' style='display:none;'><img id='image_file_output_"
											+ ruleProperty.id
											+ "' style='display:none;' height='50' width='50'></a>"
											+ "<a id='other_file_output_"
											+ ruleProperty.id
											+ "' style='display:none;'></a>"
											+ "("
											+ ruleProperty.propertyType
											+ ")";
								} else if (ruleProperty.propertyType == 'DATE') {
									inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10'  style ='position: relative; z-index: 100000;' name='value' id= '"
											+ ruleProperty.id
											+ "'  value='"
											+ today
											+ "'/>("
											+ ruleProperty.propertyType + ")";
									listDates.push(ruleProperty.id);
								} else if (ruleProperty.propertyType == 'INTEGER') {
									inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>("
											+ ruleProperty.propertyType + ")";
								} else if (ruleProperty.propertyType == 'DOUBLE'
										|| ruleProperty.propertyType == 'CURRENCY') {
									inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'/>("
											+ ruleProperty.propertyType + ")";
								} else if (ruleProperty.propertyType == 'BOOLEAN') {
									inputsProps += "<form><input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='radio' name='value' value='true'>true   <input type='radio' name='value' value='false'>false</form>";
								} else {
									inputsProps += "<input id='create_node_property_"
											+ ruleProperty.id
											+ "' type='text' size='10' name='value' />("
											+ ruleProperty.propertyType + ")";
								}

								inputsProps += "<input type='hidden' name='propertyType' value='"
										+ ruleProperty.propertyType
										+ "'></td></tr>";

							});
			inputsProps += "</table>";
			document.getElementById("edgeProperties").innerHTML = inputsProps;

		}

		return inputs;

	};

	

	this.showNodePropertiesBottom = function(selectedNodeUuid) {

		var node = nodeMap[selectedNodeUuid];

		var inputs = "&nbsp;&nbsp;&nbsp;&nbsp;<span class='badge' id='selTypeId_"+selectedNodeUuid+"' style='color:black; background:"
				+ typeMapViaId[node.typeId].color
				+ "'>"
				+ typeMapViaId[node.typeId].name + "</span>&nbsp;";
		$.each(node.typeProperties, function(key, prop) {
			inputs += "<strong>"
					+ typeMapViaId[node.typeId].typeProperties[key].name
					+ ": </strong>" + prop.value + "&nbsp;";
		});

		var nodePropertiesBottomList = document
				.getElementById("bottom_node_properties_list");
		nodePropertiesBottomList.style.display = "";
		nodePropertiesBottomList.innerHTML = inputs;

	};

	this.showEdgePropertiesBottom = function(selectedEdgeUuid) {

		var edge = edgeMap[selectedEdgeUuid];

		var color = "";
		if (edge.classification == "parentchild") {
			color = "blue";
		} else if (edge.classification == "link") {
			color = "green";
		}
		var inputs = "&nbsp;&nbsp;&nbsp;&nbsp;<span class='badge' style='color:black; background:"
				+ color
				+ "'>"
				+ connMapViaId[edge.connectionId].name
				+ "</span>&nbsp;";
		
		if (!jQuery.isEmptyObject(edge.ruleProperties) ){
			$.each(edge.ruleProperties, function(key, prop) {
				inputs += "<strong>"
						+ ruleMapViaId[edge.ruleId].typeProperties[key].name
						+ ": </strong>" + prop.value + "&nbsp;";
			});
		}
		
		

		var nodePropertiesBottomList = document
				.getElementById("bottom_node_properties_list");
		nodePropertiesBottomList.style.display = "";
		nodePropertiesBottomList.innerHTML = inputs;

	};

	this.clearNodePropertiesBottom = function() {

		var nodePropertiesBottomList = document
				.getElementById("bottom_node_properties_list");
		nodePropertiesBottomList.innerHTML = "Element Details";

	};
	
	
	
	
	
	
	
	
	
	// THESE METHODS NEED TO BE REFACTORS AND MOVED OUT OF THIS CLASS 
	
	
	this.loadAllTargetNodes = function(nodeUuid) {

		// get all destination types
		var typeIds = [];
		var node = nodeMap[nodeUuid];
		$.each(connMapViaId, function(id, conn) {
			if (conn.source == node.typeId) {
				if (!typeIds.includes(conn.target)) {
					typeIds.push(conn.target);
				}
			}
		});

		
		
		
		
		var jsonstr = {
			typeId : node.typeId,
			nodeUuid : nodeUuid,
			grouphost : userGroup.host,
			groupname : userGroup.name,
			namespace : loggedInUserName
		};

		var successFunction = function(data) {

			var nodes = {};
			var edges = {};

			// update global vars
			$.each(data.nodes, function(key, value) {
				var uuid = NodeUtils.findUUID(value);
				var name = NodeUtils.findNameInst(value);
				if (!name) {
					name = typeMapViaId[value.typeId].name;
				}
				var color = typeMapViaId[value.typeId].color;

				if (uuid != null) {
					if (!nodeMap[uuid]) {
						nodeMap[uuid] = value;
						nodeMap[uuid]["cyDisplay"] = name;
						nodeMap[uuid]["color"] = color;
						nodeMap[uuid].type = nodeMap[uuid].name;
						nodes[uuid] = nodeMap[uuid];
					}
				}
			});

			$
					.each(
							data.edges,
							function(key, value) {
								var uuid = NodeUtils.findUUID(value);
								var originNodeUuid = NodeUtils
										.findUUID(value.originNode);
								var originNodeName = NodeUtils
										.findNameInst(value.originNode);
								var originNodeColor = typeMapViaId[value.originNode.typeId].color;
								var destinationNodeUuid = NodeUtils
										.findUUID(value.destinationNode);
								var destinationNodeName = NodeUtils
										.findNameInst(value.destinationNode);
								var destinationNodeColor = typeMapViaId[value.destinationNode.typeId].color;
								var edgeName = EdgeUtils
										.findNamePropertyValue(value);
								if (!edgeName) {
									edgeName = connMapViaId[value.connectionId].name;
								}

								if (uuid != null) {
									if (!edgeMap[uuid]) {
										edgeMap[uuid] = value;
										edgeMap[uuid]["name"] = edgeName;
										edges[uuid] = edgeMap[uuid]
										
										if (originNodeUuid != null) {
											if (!nodeMap[originNodeUuid]) {
												nodeMap[originNodeUuid] = value.originNode;
												nodeMap[originNodeUuid]["cyDisplay"] = originNodeName;
												nodeMap[originNodeUuid]["color"] = originNodeColor;
												nodeMap[originNodeUuid]["type"] = nodeMap[originNodeUuid]["name"];
												nodes[originNodeUuid] = nodeMap[originNodeUuid];
											}
										}

										if (destinationNodeUuid != null) {
											if (!nodeMap[destinationNodeUuid]) {
												nodeMap[destinationNodeUuid] = value.destinationNode;
												nodeMap[destinationNodeUuid]["cyDisplay"] = destinationNodeName;
												nodeMap[destinationNodeUuid]["color"] = destinationNodeColor;
												nodeMap[destinationNodeUuid]["type"] = nodeMap[destinationNodeUuid]["name"];
												nodes[destinationNodeUuid] = nodeMap[destinationNodeUuid];
											}
										}
										
									}
								}
								
							});

			// update graph
			$.each(nodes, function(uuid, node){
				DisplayCytoscapeUtils.updateInstanceGraph (irvCy, DisplayCytoscapeUtils.formatSingleNode(node));
//				var element = irvCy.$('node[uuid="' + uuid + '"]');
//				element.animate({
//					position: { x: node.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value, y: node.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value },
//					position: { x: (Number(node.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value) - 100), y: (Number(node.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value) - 100) },
//				}, {duration: 1000});
			});

			$.each(edges, function(uuid, edge){
				DisplayCytoscapeUtils.updateInstanceGraph (irvCy, DisplayCytoscapeUtils.formatSingleEdge(edge));
				var destinationNodeUuid = edge.destinationNode.sysProperties.uuid.value;
				var destinationNode = nodeMap[destinationNodeUuid];
				
				var element = irvCy.$('node[uuid="' + destinationNodeUuid + '"]');
				
				if (destinationNode.hasOwnProperty('decoProperties')) {
					element.animate({
						position: { x: destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value, y: destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value },
					}, {duration: 100});
					for (var i = 0; i < logicalDisplayCytoscapeGraphAnimationBubblingUpTimes; i++) {
						var randomFactor = Math.random() < 0.5 ? -1 : 1;
						element.animate({
							position: { x: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value) + randomFactor * 10), y: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value) + randomFactor * 10) },
						}, {duration: 20});
					}
				}
				
//				if (edge.hasOwnProperty('decoProperties')) {
//					element.animate({
//						position: { x: destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value, y: destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value },
//						position: { x: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value) - 10), y: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value) - 10) },
//						position: { x: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value) + 10), y: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value) + 10) },
//						position: { x: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value) - 10), y: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value) - 10) },
//						position: { x: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value) + 10), y: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value) + 10) },
//					}, {duration: 200});
////					element.animate({
////						position: { x: edge.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value, y: edge.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value },
////						position: { x: (Number(edge.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value) - 10), y: (Number(edge.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value) - 10) },
////						position: { x: (Number(edge.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value) + 10), y: (Number(edge.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value) + 10) },
////						position: { x: (Number(edge.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value) - 10), y: (Number(edge.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value) - 10) },
////						position: { x: (Number(edge.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value) + 10), y: (Number(edge.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value) + 10) },
////					}, {duration: 800});
//				} else {
//					element.animate({
//						position: { x: destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value, y: destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value },
//						position: { x: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value) - 10), y: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value) - 10) },
//						position: { x: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value) + 10), y: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value) + 10) },
//						position: { x: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value) - 10), y: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value) - 10) },
//						position: { x: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["x"].id].value) + 10), y: (Number(destinationNode.decoProperties[predefinedSelectedDecoPropertiesMap["y"].id].value) + 10) },
//					}, {duration: 200});
//				}
				
//				irvCy.animate({
//					 zoom: logicalDisplayCytoscapeDefaultZoomLevel,
////					 fit: {
////						 eles: element,
////						 padding: 20
////					 }					 
//				 }, {
//					 duration: 500
//				 });

			});
			
			irvCy.zoom(logicalDisplayCytoscapeDefaultZoomLevel);
//			irvCy.center();

			// update type bar
			var linkRuleIds = [];
			var typeIdsForBars = [];
			
			$.each(typeIds, function(key, typeId) {
				if (!typeIdsForBars.includes(typeId)) {
					typeIdsForBars.push(typeId);
				}
			});
			
			$.each(edgeMap, function(uuid, edge) {				
				if (edge.classification == 'link') {
					linkRuleIds.push(edge.ruleId)
				}
			});
			
    		if (currentTypeIds.length == 0 && drillHistoryList.length == 0) {
    			
    			// when search
    			if (listTypeIds != 0 || listConnIds != 0) {		    				
    				$.each(listTypeIds, function(key, value) {
    					if (!typeIdsForBars.includes(value)) {
    						typeIdsForBars.push(value);
    					}
    				});
    				
    				$.each(listConnIds, function(key, value) {
    					var conn = connMapViaId[value];
    					if (ruleMapViaId[conn.ruleId].classification == 'link' && !linkRuleIds.includes(conn.ruleId)) {
    						linkRuleIds.push(conn.ruleId);
    					}
    					if (!typeIdsForBars.includes(conn.source)) {
    						typeIdsForBars.push(conn.source);
    					}
    					if (!typeIdsForBars.includes(conn.target)) {
    						typeIdsForBars.push(conn.target);
    					}
    				});		    				
    			} else if (isWorkspaceLoaded == true) { // when load workspace	    				
    				$.each(nodeMap, function(nUuid, node) {
    					if (!typeIdsForBars.includes(node.typeId)) {
    						typeIdsForBars.push(node.typeId);
    					}	
    				});
    				
    				$.each(edgeMap, function(eUuid, edge) {
    					if (ruleMapViaId[edge.ruleId].classification == 'link' && !linkRuleIds.includes(edge.ruleId)) {
    						linkRuleIds.push(edge.ruleId);0
    					}	
    				});
    			} else { // when load all
	    			linkRuleIds = GlobalRuleUtils.getAllLinkIdsFromRuleMap();
	    			$.each(typeMapViaId, function(id, type) {
	    				if (!typeIdsForBars.includes(id)) {
    						typeIdsForBars.push(id);
    					}	
	    			});
    			}
    			DisplayLogicalRendererBar.generateTypeBars(typeIdsForBars, linkRuleIds);
    		} else if (currentTypeIds.length != 0 && drillHistoryList.length == 0) {
    			$.each(typeIds, function(key, typeId) {
    				if (!currentTypeIds.includes(typeId)) {
    					currentTypeIds.push(typeId);
    				}
    			});
    			DisplayLogicalRendererBar.generateTypeBars(currentTypeIds, linkRuleIds);
    		} else if (drillHistoryList.length != 0) {
    			listInstUuids.push(drillHistoryList[drillHistoryList.length - 1].sysProperties.uuid.value);
				(new DisplayLogicalRenderer()).initChildTypeBar2(drillHistoryList[drillHistoryList.length - 1]); 			
    		}
			
//			DisplayLogicalRendererBar.showOrHideTypeLinkBars();
//			(new DisplayLogicalRenderer()).initTypeBar(currentTypeIds);

		};

		var failFunction = function(xhr, status, error) {
			CommonFctsLogical.HandlingErrorMSG("Load Child Nodes Error: " + xhr.status, "error");
			$('#console-log').append("<p style='color:red'>Load Child Nodes Error: " + xhr.status + "</p>");
			console.log("Load Child Nodes Error: " + xhr.responseText);
		};

		var nodeApis = new NodeApis();
		nodeApis.getChildNodes(jsonstr, successFunction, failFunction);
		
		this.showOrNotSmallNodesConnectingBar();

		// if (node) {
		//			
		// var nodes = {};
		// nodes[node.sysProperties.uuid.value] = node;
		// var edges = {};
		// $.each(edgeMap, function(uuid, edge){
		// if (edge.originNode.sysProperties.uuid.value ==
		// node.sysProperties.uuid.value) {
		// DisplayCytoscapeUtils.updateInstanceGraph (irvCy,
		// DisplayCytoscapeUtils.formatSingleNode(edge.destinationNode));
		// nodes[edge.destinationNode.sysProperties.uuid.value] =
		// edge.destinationNode;
		// DisplayCytoscapeUtils.updateInstanceGraph (irvCy,
		// DisplayCytoscapeUtils.formatSingleEdge(edge));
		// edges[uuid] = edge;
		// }
		// });
		//			
		// // TODO: Update type bar with all types of nodes in graph
		//			
		// }

	};
	
	
	
	this.deleteNode = function( node ) {
		
		console.log("DELETING THE NODE ATTEMPT");

		var uuid = 	node.sysProperties.uuid.value;
 
		

		
		var jsonData = {}; 
		jsonData = GlobalApiUtils.assignApiHeaders( jsonData );

		
		// grab the node
		var guinode = nodeMap[ uuid ];
		
		jsonData.node = guinode;
 

		if (selectedMetaData != null) {

			var successFunction = function() {

				// we have to delete the edges too?
				
				// delete from cytoscape
//				var cytoNode = DisplayCytoscapeUtils.formatNode( guinode );
				var cytoNode = CytoNodeUtils.formatNode( guinode );
				
				
				irvCy.$( "#" + cytoNode.data.id ).remove();
//				tdvCy.$("#" + typeId).remove();

				
				// delete element in edgeMap and irvCy
				delete nodeMap[ uuid ];
//				irvCy.$(':selected').remove();

				(new DisplayLogicalRenderer()).emptyAllInst();

			};

			var failFunction = function(xhr, status, error) {

				if (xhr.status != 200) {
					console.log('Edge Create Error: ' + xhr.responseText);
					CommonFctsLogical.HandlingErrorMSG("Edge Create Error: " + xhr.status, "error");
					$('#console-log').append("<p style='color:red'>Node Delete Error: " + xhr.status + "</p>");
					$("#nodeForm").empty();
					$("#nodeForm").append(
							"<p style='color:red'>Failed to delete node.</p>");
				}

			};

			var nodeApi = new NodeApis();
			nodeApi.deleteNode(jsonData, successFunction, failFunction);

		} else {
			CommonFctsLogical.HandlingErrorMSG("You Must Select Metadata Repo", "warning");
			$('#console-log').append("<p style='color:red'>You Must Select Metadata Repo</p>");
			this.cancelInstForm();
		}

	};
	
	this.deleteEdgeViaEvent = function( edge ) {
		
		console.log("DELETING THE EDGE ATTEMPT");

		var uuid = 	edge.sysProperties.uuid.value;
		
		var jsonData = {}; 
		
		jsonData = GlobalApiUtils.assignApiHeaders( jsonData );
		
		
		// grab the node
		var guiedge = edgeMap[ uuid ];
		
		jsonData.connection = guiedge;
 
		if (selectedMetaData != null) {

			var successFunction = function() {

				// we have to delete the edges too?
				
				// delete from cytoscape
				var cytoEdge = DisplayCytoscapeUtils.formatEdge( guiedge );
				
				irvCy.$( "#" + cytoEdge.data.id ).remove();
	 
				// delete element in edgeMap and irvCy
				delete edgeMap[ uuid ];
				irvCy.$(':selected').remove();

				(new DisplayLogicalRenderer()).emptyAllInst();

			};

			var failFunction = function(xhr, status, error) {

				if (xhr.status != 200) {
					console.log('Edge Create Error: ' + xhr.responseText);
					CommonFctsLogical.HandlingErrorMSG("Edge Create Error: " + xhr.status, "error");
					$('#console-log').append("<p style='color:red'>Edge Delete Error: " + xhr.status + "</p>");
					$("#nodeForm").empty();
					$("#nodeForm").append(
							"<p style='color:red'>Failed to delete edge.</p>");
				}

			};


			var edgeApi = new EdgeApis();
			edgeApi.deleteEdge(jsonData, successFunction, failFunction); 

		} else {
			CommonFctsLogical.HandlingErrorMSG("You Must Select Metadata Repo", "warning");
			$('#console-log').append("<p style='color:red'>You Must Select Metadata Repo</p>");
			this.cancelInstForm();
		}
		
		
		
		
		

	};

}
