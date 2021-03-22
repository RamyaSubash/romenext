/*
 * Desc:	Event handlers/functions for Graph
 * Author:	Baya Benrachi
 * Date:	15 May  2016
 * Update:  17 June   2016
*/

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                 BELOW CODE NEEDED For OLD VERSION
//==========================================================================
//===========================================

function formatNodeEdgeGraph(cy) {
	if (cy.nodes() == null || cy.nodes().length < 1 || cy.edges() == null || cy.edges().length < 1) {
		return;
	}

	for (var i = 0; i < cy.edges().length; i++) {
		var relativeX = null;
		var relativeY = null;
		var props = cy.edges()[i].data().decoProperties;
		for (var j = 0; j < props.length; j++) {
			if (Number(props[j].id) == Number(predefinedSelectedDecoPropertiesMap["x"].id)) {
				relativeX = props[j].value
			}
			if (Number(props[j].id) == Number(predefinedSelectedDecoPropertiesMap["y"].id)) {
				relativeY = props[j].value
			}
		}

		if (relativeX != null && relativeY != null) {
			cy.edges()[i].target().position().x = cy.edges()[i].source().position().x + Number(relativeX);
			cy.edges()[i].target().position().y = cy.edges()[i].source().position().y + Number(relativeY);
		}
	}
}

//==================================================================================
function initNodeEdgeGraph(cy, containerId, elements) {
	
	if (document.getElementById("irvCy")) {
		$("#irvCy").css("background-image", "");
		$("#irvCy").css("background-repeat", "");
		$("#irvCy").css("background-size", "");
	}
	
	// Clear cytoscape object if already initialised
	if (cy) {
		cy.remove(cy.elements());
	}

	//    if (elements.length != 0) {
	cy = window.cy = cytoscape({
		container : document.getElementById(containerId),
		ready : function() {
			console.log('ready')
		},
		showOverlay : false,
		zoom : 1,
		minZoom : 0.1,
		maxZoom : 10,
		zoomingEnabled : true,
		style : cytoscape.stylesheet()
			.selector('node[classification = "node"]')
			.css({
//				'content' : 'data(cyDisplay)',
				'content' : 'data(label)',
				'text-valign' : 'data(labelPosition)',
								
//				'text-valign' : 'center',
//				'text-halign' : 'center',
				
				'background-color' : 'data(color)',
				'border-color' : '#AABFB8',
				'border-width' : '2px',											
				'width' : 'data(size)',
				'height' : 'data(size)',
				
//				'font-size' : '7px',
				'font-size' : 'data(labelSize)',
				
				'font-weight' : 'bold',
//				'color' : '#337AB7'
				'color' : '#000000',		
												
					
			})
			.selector('node[classification = "path"]')
			.css({
//				'content' : 'data(cyDisplay)',
				'shape' : 'rectangle',
//				'text-valign' : 'center',
//				'text-halign' : 'center',
//				'background-color' : 'data(color)',
//				'border-color' : '#AABFB8',
//				'border-width' : '2px',
//				'width' : 'data(size)',
//				'height' : 'data(size)',
//				'font-size' : '7px',
//				'font-weight' : 'bold',
//				'color' : '#337AB7',
			})
			.selector('node[classification = "system"]')
			.css({
				'display' : 'none'
			})
			.selector('node[classification = "WORKSPACE"]')
			.css({
				'width' : '0px',
				'height' : '0px',
				'background-opacity' : '0',
				'background-clip' : 'none',
				'border-width' : '0',
				'z-compound-depth': 'bottom',
				'background-fit': 'contain'
			})
			
			.selector('edge')
			.css({
				'curve-style' : 'bezier',
				'content' : '',
				'font-size' : '12px',
				
				'text-valign' : 'top',
				'text-background-color' : 'white',
				'text-background-opacity' : '1',
				'text-border-color' : 'black',
				'text-border-opacity' : '1',
				'text-border-width' : '1',
				'text-background-shape' : 'rectangle',
				'text-background-padding' : '3px',
				'control-point-step-size' : '70px', // control the loop edge
				'width' : '2',
				'line-style' : 'dotted',
				
				'overlay-color' : '#c0c0c0',
				'overlay-padding' : '50px',
				'edge-text-rotation' : 'autorotate'
										
			})
			.selector('edge[classification = "parentchild"]')
			.css({
//				'color' : '#0066ff',
				'line-style' : 'solid',
				'target-arrow-shape' : 'triangle',
				'source-arrow-shape' : 'circle',
//				'line-color' : '#000099'
										
				'line-color' : '#2283c5',
				'text-outline-color' : '#2283c5'			
			})
			.selector('edge[classification = "link"]')
			.css({
//				'color' : '#99cc00',
				'line-style' : 'dashed',
				'target-arrow-shape' : 'circle',
				'source-arrow-shape' : 'circle',
//				'line-color' : '#333300'
					
				'line-color' : '#29a329'	
					
					
					
					
			})
			
			.selector('node[classification = "node"].highlight')
			.css({
				'border-color' : '#6ac6ff',
				'border-width' : '4px',
				// 'background-color': '#61bffc',
				'line-color' : '#ffa31a',
				'target-arrow-color' : '#ffa31a',
				// 'transition-property': 'background-color, line-color, target-arrow-color',
				'transition-property' : 'line-color, target-arrow-color',
				'transition-duration' : '0.5s'
			})
			.selector('node[classification = "path"].highlight')
			.css({
				'border-color' : '#6ac6ff',
				'border-width' : '4px',
				'line-color' : '#ffa31a',
				'target-arrow-color' : '#ffa31a',
				'transition-property' : 'line-color, target-arrow-color',
				'transition-duration' : '0.5s'
			})
			.selector('node[classification = "system"].highlight')
			.css({
				'border-color' : '#6ac6ff',
				'border-width' : '4px',
				'line-color' : '#ffa31a',
				'target-arrow-color' : '#ffa31a',
				'transition-property' : 'line-color, target-arrow-color',
				'transition-duration' : '0.5s'
			})
			.selector('node[classification = "WORKSPACE"].highlight')
			.css({
				'background-opacity' : '0',
				'background-clip' : 'none',
				'border-width' : '0',
				'z-compound-depth': 'bottom',
				'background-fit': 'contain'
			})
			.selector('edge.highlight')
			.css({
				'mid-target-arrow-color' : '#000',
				'width' : '5',
				'line-color' : '#ffa31a',
				'target-arrow-color' : '#ffa31a',
				'transition-property' : 'line-color, target-arrow-color',
				'transition-duration' : '0.5s'
			})
//			.selector('.highlighted')
//			.css({
//				//		            	'background-color': '#61bffc',
//				'line-color' : '#ffa31a',
//				'target-arrow-color' : '#ffa31a',
//				//		                'transition-property': 'background-color, line-color, target-arrow-color',
//				'transition-property' : 'line-color, target-arrow-color',
//				'transition-duration' : '0.5s'
//			})
			
			.selector('node[classification = "node"]:selected')
			.css({
				'border-color' : '#CC1430',
				'line-color' : '#CC1430',
				'source-arrow-color' : '#CC1430',
				'target-arrow-color' : '#CC1430',
				'transition-property' : 'line-color,source-arrow-color, target-arrow-color',
				'transition-duration' : '0.5s'
			})
			.selector('node[classification = "path"]:selected')
			.css({
				'border-color' : '#CC1430',
				'line-color' : '#CC1430',
				'source-arrow-color' : '#CC1430',
				'target-arrow-color' : '#CC1430',
				'transition-property' : 'line-color,source-arrow-color, target-arrow-color',
				'transition-duration' : '0.5s'
			})
			.selector('node[classification = "system"]:selected')
			.css({
				'border-color' : '#CC1430',
				'line-color' : '#CC1430',
				'source-arrow-color' : '#CC1430',
				'target-arrow-color' : '#CC1430',
				'transition-property' : 'line-color,source-arrow-color, target-arrow-color',
				'transition-duration' : '0.5s'
			})
			.selector('node[classification = "WORKSPACE"]:selected')
			.css({
				'background-opacity' : '0',
				'background-clip' : 'none',
				'border-width' : '0',
				'z-compound-depth': 'bottom',
				'background-fit': 'contain'
			})
			.selector('edge:selected')
			.css({
				'line-color' : '#CC1430',
				'source-arrow-color' : '#CC1430',
				'target-arrow-color' : '#CC1430',
				'transition-property' : 'line-color,source-arrow-color, target-arrow-color',
				'transition-duration' : '0.5s'
			})
//			.selector('node:selected')
//			.css({
//				'border-color' : '#CC1430',
//			})
//			.selector(':selected')
//			.css({
//				//		            	'background-color': '#61bfff',
//				'line-color' : '#CC1430',
//				'source-arrow-color' : '#CC1430',
//				'target-arrow-color' : '#CC1430',
//				//		                'transition-property': 'background-color, line-color,source-arrow-color, target-arrow-color',
//				'transition-property' : 'line-color,source-arrow-color, target-arrow-color',
//				'transition-duration' : '0.5s'
//			})
			
			.selector('node.semitransp')
			.css({
				'opacity' : '0.5'
			})
			.selector('edge.semitransp')
			.css({
				'opacity' : '0.5'
			})
			.selector("core")
			.css({
				"active-bg-size" : 0
			}),		            	
		elements : elements,
		pan : {
			x : 0,
			y : 0
		},
		layout : {
			name : 'preset',
			fit : true,
			roots : '#',
			padding : 10,
			nodeOverlap : 10,
			nodeRepulsion : 400000,
			avoidOverlap : true,
		},
		pixelRatio : 'auto'
	});

	attachNodeClickActions(cy.nodes());
	attachEdgeClickActions(cy.edges());
	
	
	// THIS IS THE RIGHT MOUSE CLICK MENU --- START
	var contextMenu = cy.contextMenus({
		menuItems : [
			{
				id : 'show_properties_for_node',
				content : 'Show Properties',
				selector : 'node',
				onClickFunction : function(event) {
					DisplayCytoscapeUtils.buildQtip(event, 'node');
					setTimeout(function() {
						showNodeProperties(event.target);
					}, 200);
				}
			},
			{
				id : 'update_properties_for_node',
				content : 'Update Properties',
				selector : 'node',
				onClickFunction : function(event) {
					DisplayCytoscapeUtils.buildQtip(event, 'node');
					setTimeout(function() {
						showUpdateNodePropertiesByUuid(event.target.data().sysProperties.uuid.value);
					}, 200);
				}
			},
			{
				id : 'link_as_start_for_node',
				content : 'Link As Start',
				selector : 'node',
				onClickFunction : function(event) {
					(new DisplayLogicalRenderer()).cacheNodesForLinking(event.target.data().sysProperties.uuid.value, 'start');
				}
			},
			{
				id : 'link_as_end_for_node',
				content : 'Link As End',
				selector : 'node', 
				onClickFunction : function(event) {
					(new DisplayLogicalRenderer()).cacheNodesForLinking(event.target.data().sysProperties.uuid.value, 'end');
				}
			},
			{
				id : 'jump_workspace_for_node',
				content : 'Jump To Workspace',
				selector : 'node', 
				onClickFunction : function(event) {
					DisplayCytoscapeUtils.buildQtip(event, 'node');
					setTimeout(function() {
						DisplayLogicalRendererGraph.buildWorkspaceListForNode(event.target.data().sysProperties.uuid.value);
					}, 200);
				}
			},
			{
				id : 'delete_for_node',
				content : 'Delete Node',
				selector : 'node',
//				show : false,
				onClickFunction : function(event) {
					
					console.log("ENTERED DELETE FUNCTION");
					
					var node = event.target;
					if (event.target.isNode()) {
//						DesignSavingFcts.clearSelection();
						
						var id = node.data("id");
						var edges = node.connectedEdges();
//						var nbNodes = CXTMenuFcts.findInstancesForType(id);
						
						// convert the node
						var romeNode = node.data;
						
						$("#dialog").empty();
						
						if( edges.length == 0 ) {
							$("#dialog").dialog({
								resizable : false,
								height : "auto",
								width : 300,
								modal : true,
								title : "Confirmation",
								buttons : {
									"Confirm" : function() {
										// first delete all PC/Links connections
//										if (edges.length > 0) {
//											edges.forEach(function(edge) {
//												var conid = edge.data("id").substring(10);
//												ConnectionPropertyUtils.deleteConnection(connMapViaId[conid]);
//											});
//										}
										// delete type
//										DesignLinkFctsUtils.deleteTypeByGroup(id);
										
										(new DisplayLogicalRenderer()).deleteNode(event.target.data()  );

										
										
										contextMenu.hideMenuItem('Delete');
										$(this).dialog("close");
									},
									"Cancel" : function() {
										contextMenu.hideMenuItem('Delete');
										$(this).dialog("close");
									}
								}
							})
							var textEdge = "";
							if (edges.length > 0) {
								textEdge += " The following relationships :<br/>"
								edges.forEach(function(edge) {
									textEdge += " <b>" + edge.data("classification") + "</b> from " + edge.data("origin") + " ------> " + edge.data("destination") + "<br/>"
								})
								textEdge += "will also be deleted when type is deleted.<br/>";
							}
							var text = "<p style='color:red'>This process is irreversible and will delete <span class='badge' style='color:black; background:" + node.data('color') + ";'> " + node.data('cyDisplay') + "</span> from all users and workspaces.</p>";
							text = text + textEdge;
							text += "<br/>Please confirm if you would like to delete this?";
							$("#dialog").append(text);
							
						} else {
							$("#dialog").dialog({
								resizable : false,
								height : "auto",
								width : 300,
								modal : true,
								title : "Alert",
								buttons : {
									"OK" : function() {
										contextMenu.hideMenuItem('Delete');
										$(this).dialog("close");
									}
								},
								close : function() {
									contextMenu.hideMenuItem('Delete');
									$(this).dialog("close");
								}
							})
							var text = "The <b>" + node.data("classification") + "</b> <span class='badge' style='color:black; background:" + node.data('color') + ";'> " + node.data('name') +
								"</span> has " + edges.length + " edges assigned to it. <br/> Only instances that do not have edges can be deleted.<br/> Please delete edges first."
							$("#dialog").append(text);
						}
						$("#dialog").dialog("open"); 
						
						 
					} 
					
				}
			},
			{
				id : 'show_properties_for_edge',
				content : 'Show Properties',
				selector : 'edge',
				onClickFunction : function(event) {
					DisplayCytoscapeUtils.buildQtip(event, 'edge');
					setTimeout(function() {
						(new DisplayLogicalRenderer()).showEdgeDetails(event.target.data().sysProperties.uuid.value);
					}, 200);
				}
			},
			{
				id : 'update_properties_for_edge',
				content : 'Update Properties',
				selector : 'edge',
				onClickFunction : function(event) {
					DisplayCytoscapeUtils.buildQtip(event, 'edge');
					setTimeout(function() {
						(new DisplayLogicalRenderer()).showUpdateEdge(event.target.data().sysProperties.uuid.value);
					}, 200);
				}
			},
			{
				id : 'add_to_workspace',
				content : 'Add to a workspace',
				selector : 'node',
//				show : false,
				onClickFunction : function(event) {
					console.log("Entered on click");
					DisplayCytoscapeUtils.buildQtip(event, 'node');
					setTimeout(function() {
						DisplayWorkspaceUtils.buildWorkspaceListNotAttachedForNode_withActions( "DisplayWorkspaceUtils.addNodeToWorkspace", event.target.data().sysProperties.uuid.value);
					}, 200);
				}
			},
			{
				id : 'delete_to_workspace',
				content : 'Delete From a workspace',
				selector : 'node',
//				show : false,
				onClickFunction : function(event) {
					console.log("Entered on click");
					DisplayCytoscapeUtils.buildQtip(event, 'node');
					setTimeout(function() {
						DisplayWorkspaceUtils.buildWorkspaceListForNode_withActions( "DisplayWorkspaceUtils.deleteNodeToWorkspace", event.target.data().sysProperties.uuid.value);
					}, 200);
				}
			},
			{
				id : 'delete_for_edge',
				content : 'Delete',
				selector : 'edge',
//				show : false,
				onClickFunction : function(event) {
					console.log("ENTERED DELETE EDGE FUNCTION");
					
					var edge = event.target;
					if (event.target.isEdge()) {

						var id = edge.data("id"); 

						$("#dialog").empty();
						$("#dialog").dialog({
							resizable : false,
							height : "auto",
							width : 300,
							modal : true,
							title : "Confirmation",
							buttons : {
								"Confirm" : function() { 
									(new DisplayLogicalRenderer()).deleteEdgeViaEvent( event.target.data()  );
									contextMenu.hideMenuItem('Delete');
									$(this).dialog("close");
								},
								"Cancel" : function() {
									contextMenu.hideMenuItem('Delete');
									$(this).dialog("close");
								}
							}
						})
						var textEdge = "";
						var text = "<p style='color:red'>This process is irreversible and will delete the edge from all users and workspaces.</p>";
						text = text + textEdge;
						text += "<br/>Please confirm if you would like to delete this?";
						$("#dialog").append(text);
						
					}  
				}
			}
		],
		menuItemClasses : [ 'custom-menu-item' ],
		contextMenuClasses : [ 'custom-context-menu' ] 
	});
	// THIS IS THE RIGHT MOUSE CLICK MENU --- END
	
	
	cy.on('cxttap', 'node', function(event) {
		var node = event.target;
//		if (node.data) {
//			var sourceName = node.data("cyDisplay");
//			console.log(" right clicked on " + sourceName);
//			console.log(" Position X : " + event.cyPosition.x + " Position Y : " + event.cyPosition.y);
//			console.log(" renderedPosition X : " + event.cyRenderedPosition.x + " renderedPosition Y : " + event.cyRenderedPosition.y);
//		} else {
//			console.log(" Position X : " + event.cyPosition.x + " Position Y : " + event.cyPosition.y);
//			console.log(" renderedPosition X : " + event.cyRenderedPosition.x + " renderedPosition Y : " + event.cyRenderedPosition.y);
//		}
		
		removeHighlightNode();
		DisplayCytoscapeUtils.removeHighlightAndUnhighlight();
		listInstUuids = [];
		listEdgeUuids = [];
		cancelNodeConnection();
	})
	
	cy.on('cxttap', 'edge', function(event) {
		var edge = event.target;

		removeHighlightNode();
		DisplayCytoscapeUtils.removeHighlightAndUnhighlight();
		listInstUuids = [];
		listEdgeUuids = [];
		cancelNodeConnection();
	})

	//   when the mouse is over the node, all others nodes are set to semitransp and the node under the mouse with its own children is 
	cy.on('mouseover', 'node', function(e) {
		
		var sel = e.target;
		if (sel.data().classification != "WORKSPACE") {
			
			var selTmp = sel.incomers('edge[classification = "link"]');
			var selL = selTmp.union(selTmp.sources());
			
			var elements = cy.elements().difference(sel.outgoers().union(selL)).not(sel);
			for (var i = 0; i < elements.length; i++) {
				if (elements[i].data().classification != "WORKSPACE") {
					elements[i].addClass('semitransp');
				}
			}
			
			sel.addClass('highlight').outgoers().addClass('highlight');
			selL.addClass('highlight');

			(new DisplayLogicalRenderer()).showNodePropertiesBottom(e.target.data().sysProperties.uuid.value);
		}

	});

	cy.on('mouseout', 'node', function(e) {
		
		var sel = e.target;

		var selTmp = sel.incomers('edge[classification = "link"]');
		var selL = selTmp.union(selTmp.sources());

		cy.elements().removeClass('semitransp');
		sel.removeClass('highlight').outgoers().removeClass('highlight');
		selL.removeClass('highlight');

		(new DisplayLogicalRenderer()).clearNodePropertiesBottom();

	});

	cy.on('mouseover', 'edge', function(e) {
		(new DisplayLogicalRenderer()).showEdgePropertiesBottom(e.target.data().sysProperties.uuid.value);
	});

	cy.on('mouseout', 'edge', function(e) {
		(new DisplayLogicalRenderer()).clearNodePropertiesBottom();
	});

	cy.on('tap', function(event) {
		console.log(" Inside on cy.on tap")
		$("#error_message").empty();
		if (topLevelTab == "instRelViewTab" && selecteddecorator == 'Logical') {
			var evtTarget = event.target;
			if (evtTarget === cy && evtTarget != event.ctrlKey && !event.shiftKey) {

				console.log('Unselect Node & empty Info section');
				$('#console-log').append("Unselect Node & empty Instance section");
				removeHighlightNode();
				DisplayCytoscapeUtils.removeHighlightAndUnhighlight();

				listInstUuids = [];
				listEdgeUuids = [];

				cancelNodeConnection();

				//		    		document.getElementById("child_type_bar").innerHTML = "<table id='childTypesList'><tr><td><span class='label label-default'>*(0)</span></td></tr></table>";

				if (currentTypeIds.length == 0 && drillHistoryList.length == 0) {

					var linkRuleIds = [];
					var typeIds = [];

					// when search
					if (listTypeIds != 0 || listConnIds != 0) {
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
					} else if (isWorkspaceLoaded == true) { // when load workspace	    				
						$.each(nodeMap, function(nUuid, node) {
							if (!typeIds.includes(node.typeId)) {
								typeIds.push(node.typeId);
							}
						});

						$.each(edgeMap, function(eUuid, edge) {
							if (ruleMapViaId[edge.ruleId].classification == 'link' && !linkRuleIds.includes(edge.ruleId)) {
								linkRuleIds.push(edge.ruleId);
							}
						});
					} else { // when load all
						linkRuleIds = GlobalRuleUtils.getAllLinkIdsFromRuleMap();
						$.each(typeMapViaId, function(id, type) {
							typeIds.push(id);
						});
					}
					DisplayLogicalRendererBar.generateTypeBars(typeIds, linkRuleIds);
				//		    			DisplayLogicalRendererBar.showOrHideTypeLinkBars();
				//		    			(new DisplayLogicalRenderer()).loadTypeInstBar(null);
				} else if (currentTypeIds.length != 0 && drillHistoryList.length == 0) {
					var linkRuleIds = [];
					$.each(edgeMap, function(eUuid, edge) {
						if (ruleMapViaId[edge.ruleId].classification == 'link' && !linkRuleIds.includes(edge.ruleId)) {
							linkRuleIds.push(edge.ruleId);
						}
					});
					DisplayLogicalRendererBar.generateTypeBars(currentTypeIds, linkRuleIds);
				//		    			DisplayLogicalRendererBar.showOrHideTypeLinkBars();
				} else if (drillHistoryList.length != 0) {
					listInstUuids.push(drillHistoryList[drillHistoryList.length - 1].sysProperties.uuid.value);
					(new DisplayLogicalRenderer()).initChildTypeBar2(drillHistoryList[drillHistoryList.length - 1]);
				}
				document.getElementById("edge_bar").style.display = "none";

				(new DisplayLogicalRenderer()).clearNodePropertiesBottom();

				$(".qtip").remove();

			}
		}

	});
	
//	cy.on('drag', 'node', function(e) {
//		var node = e.target;
//		if (node[0].data().classification == "WORKSPACE") {
////			node[0].style().zCompoundDepth = "bottom";
//			node[0].css({
//				'background-opacity' : '0',
//				'background-clip' : 'none',
//				'border-width' : '0',
//				'z-compound-depth': 'bottom'
//			})
//		}
//	});

	cy.resize();
	cy.panzoom();
	return cy;
	//    }

}
function removeHighlightNode() {
	if (NodeSelected != null) {
		if (!irvCy) {
			irvCy.filter('node[name="' + nodeMap[NodeSelected].cyDisplay + '"]').unselect();
		}

	}

}


//======================================================================================
function showNodeToolTip(NodeUid) {
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

	//	 inputs += "<tr><td><input type='button' value='Set Focus' onclick=\"setFocus('"+NodeUid+"')\"/></td>";
	//	 inputs += "<td><input type='button' value='unSet Focus' onclick=\"unsetFocus('"+NodeUid+"')\"/></td></tr>";

	inputs += "</table>";
	return inputs;
}
;
function unsetFocus(node) {
	if (node) {
		LD_FocussedNode = null;
		NodeSelected = null;
		if (document.getElementById('drilldown')) {
			document.getElementById('drilldown').innerHTML = '';
		}
		userActions.prevaction = userActions.currentaction;
		userActions.currentaction = '';
		userActions.param = '';
	}


}
function setFocus(nodeUuid) {
	if (nodeUuid) {
		LD_FocussedNode = nodeUuid;
		ShowFocussedNode(LD_FocussedNode);
	}
}




//=============================================================================================
function attachNodeClickActions(nodes) {

	// Handle click events on cytoscape nodes
	nodes.on('click', function(e) {

		$(".qtip").remove();
		
		var thisClick = new Date().getTime();
		pleaseWait = true;

		var node = e.target;
		
		if (node.data().classification == "WORKSPACE") {
			return false;
		}
		
		// need to retrieve Node info
		var nodeType = this.data().type;
		var nodeElement = this.data();

		var nUuid = NodeUtils.findUUID(nodeElement);
		console.log("FOUND THIS UUID : " + nUuid); 
		
		(new DisplayLogicalRenderer()).showNodePropertiesBottom(nUuid);
		
		// find out what view we are looking in right now
		
		console.log("HATTE: CHeck this : " + RMPHYSOBJ );
		
		RMPHYSOBJ.testing();
		
		
		// always reset the physical view on a click?
		RMPHYSOBJ.resetView();

		// RMPHYSOBJ.renderNode( nodeElement );
		RMPHYSOBJ.renderParent( nodeElement );
		
		// see if there are any children to render
		
		var children = ChildUtilsModule.findChildViaLocalVariables( nUuid );
		
		
		
		$.each( children, function( id, child ) {
			console.log("Found these last children : " + child );
			RMPHYSOBJ.renderChild( child );

		});
		
		
		

		//		var propertyNode = {};
		//		if(nUuid){
		//			 propertyNode = {value : nUuid,
		//			                 element  : 'node',
		//			                 type: nodeType,
		//			                 parent : 'none',                                                                  // not sure if it is needed
		//			                 nodeDetails : LD_FocussedNode
		//			                 }
		//		}
		//				
		//        var contentText = showNodeToolTip(propertyNode.value);  
		//	    this.qtip({
		//		        	content: {  title: this.data("cyDisplay"),  text: contentText    },
		//		            show:    {  event: e.type,                  ready: true          },
		//		            position:{  target : 'mouse' },
		//		            style:   {  classes: 'qtip-blue qtip-tipped',
		//							    tip: {   width: 25,height: 15   }
		//						     },
		//		            hide:    {   e: 'mouseout unfocus'  }
		//			        }, e);

		if (document.body.style.cursor == 'crosshair') {
			listInstUuids.push(this.data().sysProperties.uuid.value);
		} else {
			if (!e.shiftKey) {
				listInstUuids = [];
			}
			listInstUuids.push(this.data().sysProperties.uuid.value);
		}

		if (connSelected == null) { // && selectedRule == null
			cancelNodeConnection();
		//	    	cancelNodeLink();
		}

		// Will create the edge bar in the TYPE BAR when a user selects a node.
		// Also will not activate if the create edge process is happening.
		if (connSelected == null && (listInstUuids.length == 1 && listEdgeUuids.length == 0)) { // selectedRule == null && 
			if (typeMapViaId[nodeMap[listInstUuids[0]].typeId].classification == "node") {
				(new DisplayLogicalRenderer()).initChildTypeBar();
				(new DisplayLogicalRenderer()).initConnectionBarInst();
			}
		}

		// double click 
		// double clicking a node process
		if (lastClick && ((thisClick - lastClick) < doubleClickThreshold) && lastObj && lastObj == e.target) {

			console.log("Inside Double clicked on node: " + this.data().type);
			isSingleClick = false;

			$(".qtip").remove();
			var qtipDiv = document.createElement('div');
			qtipDiv.id = 'nodeForm';
			qtipDiv.className = 'block';
			qtipDiv.innerHTML = "";
			node.qtip({
				content : {
					title : {
						text : "Node Details",
						button : true
					},
					text : qtipDiv,
				},
				show : {
					ready : true
				},
				position : {
					target : 'mouse',
					adjust : {
						resize : true
					},
					viewport : $(window)
				},
				style : {
					classes : 'qtip-blue qtip-tipped',
					tip : true
				},
				hide : {
					e : false
				}
			}, e);

			showNodePropertiesWithTimeout(this);

			// Make the node Focussed Node 
			// TODO: need to bring this back
			//			LD_FocussedNode= propertyNode;		
			//			(new DisplayLogicalRenderer()).loadTypeInstBar(nodeMap);

			// put all children nodes of selected node into graph
			// generate type bar (all types that nodes in graph have)
			(new DisplayLogicalRenderer()).loadAllTargetNodes(nUuid);

		} else { // single click

			if (connSelected == null) { // && selectedRule == null
				isSingleClick = true;
				GlobalUtils.setActiveNode(this);
			} else if (connSelected != null) { // selectedRule == null &&

				// User want to create an Edge 

				if (listInstUuids.length == 2 && listEdgeUuids.length == 0) {

					var allow = false;
					console.log("connection selected is: " + connSelected.id);
					allow = (canBeConnected(connSelected, listInstUuids[0], listInstUuids[1])) && (typeMapViaId[nodeMap[listInstUuids[1]].typeId].classification == "node");

					if (allow) {

						originNode = nodeMap[listInstUuids[0]];
						destNode = nodeMap[listInstUuids[1]];

						GlobalUtils.cursor_clear();
						userActions.prevaction = userActions.currentaction;
						userActions.currentaction = 'createEdge';

						(new DisplayLogicalRenderer()).showCreateEdge();

						connSelected = null;
						originNode = null;
						destNode = null;
						mouseEventTime = null;

					} else {
						CommonFctsLogical.HandlingErrorMSG("Cannot Connect Destination Node to Seleted Node", "error");
						$('#console-log').append("<p style='color:red'>Cannot Connect Destination Node to Seleted Node/p>");
						//						 if($("#grid-instances").css('visibility') == 'hidden'){$("#grid-instances").css({'visibility':'visible'});}
						//						 $("#create_node").dialog("open");
						//						 $("#nodeForm").empty();
						//						 $("#nodeForm").append("<p style='color:red'>Cannot Connect Destination Node to Seleted Node</p>");

						DisplayCytoscapeUtils.removeHighlightAndUnhighlight();
						listInstUuids = [];
						listEdgeUuids = [];
					}

				}

			}
			//			else if (selectedRule != null && connSelected == null) {
			//				
			//
			//				if (listInstUuids.length == 2 && listEdgeUuids.length == 0) {
			//
			//					console.log("rule selected is: " + selectedRule);
			//
			//					// find connection to match types of start and end node from selected rule
			//					var selectedConns = {};
			//					$.each(connMapViaId, function(key, value){
			//						
			//						if (value.ruleId == selectedRule) {
			//							selectedConns[key] = value;
			//						}
			//						
			//					});
			//					
			//					var selectedConnection = null;
			//					$.each(selectedConns, function(key, value){
			//						if (value.source == nodeMap[listInstUuids[0]].typeId && value.target == nodeMap[listInstUuids[1]].typeId) {
			//							selectedConnection = value;
			//						}
			//					});
			//
			//					if (selectedConnection != null) {
			//						
			//						// no min and max of connection if match number of children and parents checking
			//						
			//						originNode = nodeMap[listInstUuids[0]];
			//						destNode = nodeMap[listInstUuids[1]];
			//						
			//						GlobalUtils.cursor_clear();
			//						userActions.prevaction = userActions.currentaction;
			//						userActions.currentaction = 'createEdge';
			//						
			//						// TODO: This is wrong, need to do it properly.
			//						connSelected = selectedConnection.id;
			//						
			//						(new DisplayLogicalRenderer()).showCreateEdge();
			//						
			//						connSelected = null;
			//						originNode = null;
			//						destNode = null;
			//						mouseEventTime = null;
			//						
			//						cancelNodeLink();
			//						
			//					} else {
			//						 $('#console-log').append("<p style='color:red'>Cannot Link Two Nodes</p>");
			////						 if($("#grid-instances").css('visibility') == 'hidden'){$("#grid-instances").css({'visibility':'visible'});}
			//						 $("#create_node").dialog("open");
			//						 $("#nodeForm").empty();
			//						 $("#nodeForm").append("<p style='color:red'>Cannot Link Two Nodes</p>");
			//						 
			//						 DisplayCytoscapeUtils.removeHighlightAndUnhighlight();
			//						 listInstUuids = [];
			//						 listEdgeUuids = [];
			//					}
			//	
			//				}		
			//				
			//			}

		}

		// Keep a record of the click action
		lastClick = thisClick;
		lastObj = e.target;
	});

	console.log("attachNodeClickActions done");
};

function showNodePropertiesWithTimeout(selectedNode) {
	var myNode = nodeMap[selectedNode.data().sysProperties.uuid.value];
	pleaseWait = true;
	setTimeout(function() {
		pleaseWait = false;
		// isSingleClick && selectedNode == lastObj
		if (isSingleClick == false && selectedNode == lastObj) {
			$('#console-log').append("<p>Single click on this Node (showing its properties)" + selectedNode.data().type + "</p>");

			//					showUpdateNodeProperties( selectedNode.data());

			//			 $("#create_node").dialog("open");
			//			$("#grid-instances").css({'visibility':'visible'});

			var Form = document.createElement('div');
			var node = myNode;
			var formHeader = "<form id='nodeShowDialog'>",
				inputs = "";

			inputs += "<table id='showNode'>";

			inputs += "<tr><th><input type='hidden' name='typeName'  value='" + node.type + "'><input type='hidden' name='type'  value='" + node.typeId + "'>" + "Type :</th><td> '" + node.type + "' </td></tr></table>";

			//	var decorators = typeMap[node.type].decorators;
			var decorators = node.decorators;
			var decoList = "";
			decorators.forEach(function(deco) {
				var decoName = '';
				for (var key in decoMap) {
					if (decoMap[key].id.toString() == deco) {
						decoName = decoMap[key].name;
						break;
					}
				}
				if (decoName == 'Logical') {
					decoList += "<option value='" + deco + "' selected='selected'>" + decoName + "</option>";
				} else {
					decoList += "<option value='" + deco + "'>" + decoName + "</option>";
				}
			});
			inputs += "<div id='defaultDecoForNode' style='display:none;'>Default Decorator:&nbsp;<select name='defaultDecorator' disabled>" + decoList + "</select></div>";

			var typeProperties = typeMapViaId[node.typeId].typeProperties;

			var nUuid = NodeUtils.findUUID(node);

			var inputProps = "",
				nodeProperties = node.typeProperties;
			if (!$.isEmptyObject(typeProperties)) {

				inputProps += "<table id='nodeProperties'>";
				inputProps += "<tr><th colspan='3' style='background-color: grey'> Properties:</th><tr>";
				inputProps += "<tr><th>Name</th><th>Value</th</tr> ";

				$.each(typeProperties, function(key, typeProperty) {
					//var isNew = true;
					var pName = typeProperty.name;
					var pId = typeProperty.id;
					var pType = typeProperty.propertyType;
					var mandatory = typeProperty.isMandatory;
					var pValue,
						textcolor = 'black';

					$.each(nodeProperties, function(keynode, nodeProperty) {
						if (pId == nodeProperty.id) {
							pValue = nodeProperty.value;
						}
					});
					inputProps += "<tr id='props'><th>";
					if (mandatory) {
						textcolor = "red";
					}
					inputProps += "<input type='text' style='color:" + textcolor + "' size='6' name='propertyName' value='" + typeProperty.name + "' disabled></th>";

					if (pType === "FILE") {



						// file for new
						if (!pValue) {
							inputProps += '<td>'
								+ '<img id="image_file_output_' + typeProperty.id + '" height="50" width="50" style="display:none;">'
								+ '<a id="other_file_output_' + typeProperty.id + '" style="display:none;"></a>';
						} else {
							var mediaType = NodeUtils.convertNodeFilePropertyValueMediaType(pValue);

							inputProps += '<td>';
							if (mediaType.includes("image/")) {
								inputProps += '<a target="_blank" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" class="imgthumb"  ><img id="image_file_output_' + typeProperty.id + '" src="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" height="50" width="50" style="display:;"></a>'
									+ '<a id="other_file_output_' + typeProperty.id + '" style="display:none;"></a>';
							} else {
								inputProps += '<img id="image_file_output_' + typeProperty.id + '" height="50" width="50" style="display:none;">'
									+ '<a id="other_file_output_' + typeProperty.id + '" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" style="display:;">' + pValue.filename + '</a>';
							}
						}

					} else {
						if (pValue == null || pValue == undefined) {
							inputProps += "<td ><input  style='background-color:yellow' size='8'  type='text' name='newValue' value='' disabled>";
						} else {
							inputProps += "<td><input type='text' size='8' name='newValue' value='" + pValue + "' disabled>";
						}

					}

					inputProps += "</td></tr>";
				});
				inputProps += "</table>";
			}

			var formFooter = "</table>";

			formFooter += "<input type='button' value='Update Node'  class='btn btn-primary btn-sm'  onclick='showUpdateNodePropertiesByUuid(\"" + nUuid + "\");' />";
			//		    formFooter += "<input type='button' value='Cancel'  class='btn btn-primary btn-sm'  onclick='(new DisplayLogicalRenderer()).cancelInstForm();' /><br>";
			formFooter += "<input type='button' value='Link As Start'  class='btn btn-primary btn-sm'  onclick='(new DisplayLogicalRenderer()).cacheNodesForLinking(\"" + nUuid + "\", \"start\");'/><br>";
			formFooter += "<input type='button' value='Link As End'  class='btn btn-primary btn-sm'  onclick='(new DisplayLogicalRenderer()).cacheNodesForLinking(\"" + nUuid + "\", \"end\");' />";
			formFooter += "<input type='button' value='Workspace' class='btn btn-primary btn-sm' onclick='DisplayLogicalRendererGraph.buildWorkspaceListForNode(\"" + nUuid + "\");'/><br>";

			Form.innerHTML = message + formHeader + inputs + inputProps + formFooter;
			(new DisplayLogicalRenderer()).emptyAllInst();
			$('#nodeForm').append(Form);

			NodeSelected = NodeUtils.findUUID(selectedNode.data());

			//					LD_FocussedNode = nodeMap[NodeSelected];
			//					LD_FocussedNode.uuid = NodeSelected;
			//					ShowFocussedNode(LD_FocussedNode);
			//			 retrieveNodeProperties(selectedNode);				
			console.log("inside shownode property: " + selectedNode.data().type);
		}
	}, doubleClickThreshold + 10);
};

function showNodeProperties(selectedNode) {
	
	var myNode = nodeMap[selectedNode.data().sysProperties.uuid.value];
	
	var Form = document.createElement('div');
	var node = myNode;
	var formHeader = "<form id='nodeShowDialog'>",
		inputs = "";

	inputs += "<table id='showNode'>";

	inputs += "<tr><th><input type='hidden' name='typeName'  value='" + node.type + "'><input type='hidden' name='type'  value='" + node.typeId + "'>" + "Type :</th><td> '" + node.type + "' </td></tr></table>";

	//	var decorators = typeMap[node.type].decorators;
	var decorators = node.decorators;
	var decoList = "";
	decorators.forEach(function(deco) {
		var decoName = '';
		for (var key in decoMap) {
			if (decoMap[key].id.toString() == deco) {
				decoName = decoMap[key].name;
				break;
			}
		}
		if (decoName == 'Logical') {
			decoList += "<option value='" + deco + "' selected='selected'>" + decoName + "</option>";
		} else {
			decoList += "<option value='" + deco + "'>" + decoName + "</option>";
		}
	});
	inputs += "<div id='defaultDecoForNode' style='display:none;'>Default Decorator:&nbsp;<select name='defaultDecorator' disabled>" + decoList + "</select></div>";

	var typeProperties = typeMapViaId[node.typeId].typeProperties;

	var nUuid = NodeUtils.findUUID(node);

	var inputProps = "",
		nodeProperties = node.typeProperties;
	if (!$.isEmptyObject(typeProperties)) {

		inputProps += "<table id='nodeProperties'>";
		inputProps += "<tr><th colspan='3' style='background-color: grey'> Properties:</th><tr>";
		inputProps += "<tr><th>Name</th><th>Value</th</tr> ";

		$.each(typeProperties, function(key, typeProperty) {
			//var isNew = true;
			var pName = typeProperty.name;
			var pId = typeProperty.id;
			var pType = typeProperty.propertyType;
			var mandatory = typeProperty.isMandatory;
			var pValue,
				textcolor = 'black';

			$.each(nodeProperties, function(keynode, nodeProperty) {
				if (pId == nodeProperty.id) {
					pValue = nodeProperty.value;
				}
			});
			inputProps += "<tr id='props'><th>";
			if (mandatory) {
				textcolor = "red";
			}
			inputProps += "<input type='text' style='color:" + textcolor + "' size='6' name='propertyName' value='" + typeProperty.name + "' disabled></th>";

			if (pType === "FILE") {



				// file for new
				if (!pValue) {
					inputProps += '<td>'
						+ '<img id="image_file_output_' + typeProperty.id + '" height="50" width="50" style="display:none;">'
						+ '<a id="other_file_output_' + typeProperty.id + '" style="display:none;"></a>';
				} else {
					var mediaType = NodeUtils.convertNodeFilePropertyValueMediaType(pValue);

					inputProps += '<td>';
					if (mediaType.includes("image/")) {
						inputProps += '<a target="_blank" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" class="imgthumb"  ><img id="image_file_output_' + typeProperty.id + '" src="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" height="50" width="50" style="display:;"></a>'
							+ '<a id="other_file_output_' + typeProperty.id + '" style="display:none;"></a>';
					} else {
						inputProps += '<img id="image_file_output_' + typeProperty.id + '" height="50" width="50" style="display:none;">'
							+ '<a id="other_file_output_' + typeProperty.id + '" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" style="display:;">' + pValue.filename + '</a>';
					}
				}

			} else {
				if (pValue == null || pValue == undefined) {
					inputProps += "<td ><input  style='background-color:yellow' size='8'  type='text' name='newValue' value='' disabled>";
				} else {
					inputProps += "<td><input type='text' size='8' name='newValue' value='" + pValue + "' disabled>";
				}

			}

			inputProps += "</td></tr>";
		});
		inputProps += "</table>";
	}

	var formFooter = "</table>";

	formFooter += "<input type='button' value='Update Node'  class='btn btn-primary btn-sm'  onclick='showUpdateNodePropertiesByUuid(\"" + nUuid + "\");' />";
	//		    formFooter += "<input type='button' value='Cancel'  class='btn btn-primary btn-sm'  onclick='(new DisplayLogicalRenderer()).cancelInstForm();' /><br>";
	formFooter += "<input type='button' value='Link As Start'  class='btn btn-primary btn-sm'  onclick='(new DisplayLogicalRenderer()).cacheNodesForLinking(\"" + nUuid + "\", \"start\");'/><br>";
	formFooter += "<input type='button' value='Link As End'  class='btn btn-primary btn-sm'  onclick='(new DisplayLogicalRenderer()).cacheNodesForLinking(\"" + nUuid + "\", \"end\");' />";
	formFooter += "<input type='button' value='Workspace' class='btn btn-primary btn-sm' onclick='DisplayLogicalRendererGraph.buildWorkspaceListForNode(\"" + nUuid + "\");'/><br>";

	Form.innerHTML = message + formHeader + inputs + inputProps + formFooter;
	(new DisplayLogicalRenderer()).emptyAllInst();
	$('#nodeForm').append(Form);

	NodeSelected = NodeUtils.findUUID(selectedNode.data());
	
	console.log("inside shownode property: " + selectedNode.data().type);

};

function showUpdateNodePropertiesByUuid(uuid) {
	var node = nodeMap[uuid];

	if (node) {
		listDates = [];
		showUpdateNodeProperties(node);
	}

}
;

function showUpdateNodeProperties(detailsNode) {
	var Form = document.createElement('div');
	var node = detailsNode;
	var formHeader = "<form id='nodeUpdateDialog'>",
		inputs = "";

	inputs += "<table id='updateNode'>";

	//	inputs += "<tr><th><input type='hidden' name='typeName'  value='"+ node.type+"'><input type='hidden' name='type'  value='"+ typeMap[node.type].id+"'>" + "Type :</th><td> '"+ node.type+"' </td></tr></table>";
	inputs += "<tr><th><input type='hidden' name='typeName'  value='" + node.type + "'><input type='hidden' name='type'  value='" + node.typeId + "'>" + "Type :</th><td> '" + node.type + "' </td></tr></table>";

	//	var decorators = typeMap[node.type].decorators;
	var decorators = node.decorators;
	var decoList = "";
	decorators.forEach(function(deco) {
		var decoName = '';
		for (var key in decoMap) {
			if (decoMap[key].id.toString() == deco) {
				decoName = decoMap[key].name;
				break;
			}
		}
		if (decoName == 'Logical') {
			decoList += "<option value='" + deco + "' selected='selected'>" + decoName + "</option>";
		} else {
			decoList += "<option value='" + deco + "'>" + decoName + "</option>";
		}
	});
	inputs += "<div id='defaultDecoForNode' style='display:none;'>Default Decorator:&nbsp;<select name='defaultDecorator'>" + decoList + "</select></div>";


	//	var typeProperties = typeMap[node.type].typeProperties;

	var typeProperties = typeMapViaId[node.typeId].typeProperties;

	var nUuid = NodeUtils.findUUID(node);

	var inputProps = "",
		nodeProperties = node.typeProperties;
	if (!$.isEmptyObject(typeProperties)) {


		inputProps += "<table id='nodeProperties'>";
		inputProps += "<tr><th colspan='3' style='background-color: grey'> Properties:</th><tr>";
		inputProps += "<tr><th>Name</th><th style='display:none;'>Type</th><th>Value</th</tr> ";
		inputProps += "<tr id='props'><td><input type='hidden' name='propertyName' value='uuid'></td><td><input type='hidden'name='value' value='" + nUuid + "'></td><td><input type='hidden'name='propertyType' value='STRING'></td></tr>"

		var loopCounter = 0;
		$.each(typeProperties, function(key, typeProperty) {
			//var isNew = true;
			var pName = typeProperty.name;
			var pId = typeProperty.id;
			var pType = typeProperty.propertyType;
			var mandatory = typeProperty.isMandatory;
			var pValue,
				textcolor = 'black';

			$.each(nodeProperties, function(keynode, nodeProperty) {
				if (pId == nodeProperty.id) {
					pValue = nodeProperty.value;
				}
			});
			inputProps += "<tr id='props'><th>";
			if (mandatory) {
				textcolor = "red";
			}
			inputProps += "<input type='hidden' name='propertyId' value='" + typeProperty.id + "'><input type='text' style='color:" + textcolor + "' size='6' name='propertyName' value='" + typeProperty.name + "' disabled></th>";
			inputProps += "<td style='display:none;'><input type='text' size='8' name='propertyType' value='" + pType + "' disabled></td>";

			if (pType === "FILE") {
				var mediaType = NodeUtils.convertNodeFilePropertyValueMediaType(pValue);

				// file for new
				if (!pValue) {
					inputProps += '<td><input type="file" name ="newValue" value="" onchange="GlobalUtils.showFile(event, \'' + typeProperty.id + '\')" style="background-color:yellow"/>'
						+ '<a id="show_image_file_output_' + typeProperty.id + '" target="_blank" href="" class="imgthumb" style="display:none;"><img id="image_file_output_' + typeProperty.id + '" height="50" width="50" style="display:none;"></a>'
						+ '<a id="other_file_output_' + typeProperty.id + '" style="display:none;"></a>';
				} else {
					inputProps += '<td><input type="file" name ="newValue" value="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" onchange="GlobalUtils.showFile(event, \'' + typeProperty.id + '\')"/>';
					if (mediaType.includes("image/")) {
						inputProps += '<a id="show_image_file_output_' + typeProperty.id + '" target="_blank" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" class="imgthumb" style="display:;"><img id="image_file_output_' + typeProperty.id + '" src="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" height="50" width="50" style="display:;"></a>'
							+ '<a id="other_file_output_' + typeProperty.id + '" style="display:none;"></a>';
					} else {
						inputProps += '<a id="show_image_file_output_' + typeProperty.id + '" target="_blank" href="" class="imgthumb" style="display:none;"><img id="image_file_output_' + typeProperty.id + '" height="50" width="50" style="display:none;"></a>'
							+ '<a id="other_file_output_' + typeProperty.id + '" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" style="display:;">' + pValue.filename + '</a>';
					}
				}
				// file for old
				if (pValue) {
					inputProps += '<input type="file" name ="value" value="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" disabled style="display:none;"/>';
					if (mediaType.includes("image/")) {
						inputProps += '<img id="image_file_output_fix_' + typeProperty.id + '" src="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" height="50" width="50" style="display:none;">';
					} else {
						inputProps += '<a id="other_file_output_fix_' + typeProperty.id + '" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" style="display:none;"></a>';
					}
				}

			} else if (pType === "BOOLEAN") {

				if (pValue == null || pValue == undefined) {
					inputProps += "<td><form><input type='radio' name='newValue' value='true'>true   <input type='radio' name='newValue' value='false'>false</form>";
				} else {
					inputProps += "<td><form><input id='id_for_boolean_property_" + typeProperty.id + "_true' type='radio' name='newValue' value='true' onclick='GlobalHTMLUtils.recheckRadioButtons(\"id_for_boolean_property_" + typeProperty.id + "_true\", \"id_for_boolean_property_" + typeProperty.id + "_false\");'";
					if (pValue == true) {
						inputProps += " checked";
					}
					;inputProps += ">true   ";
					inputProps += "<input id='id_for_boolean_property_" + typeProperty.id + "_false' type='radio' name='newValue' value='false' onclick='GlobalHTMLUtils.recheckRadioButtons(\"id_for_boolean_property_" + typeProperty.id + "_false\", \"id_for_boolean_property_" + typeProperty.id + "_true\");'";
					if (pValue == false) {
						inputProps += " checked";
					}
					;inputProps += ">false</form>";
				}

				inputProps += "<input type='hidden' name='value' value='" + pValue + "'>";
			} else if (pType === "DATE") {
				if (!pValue) {
					inputProps += "<td><input title='" + pType + "'  size='8' type='text' style ='position: relative; z-index: 100000; background-color: yellow;' name='newValue' value='' id= '" + typeProperty.id + "'/>";
				} else {
					inputProps += "<td><input title='" + pType + "' type='text' style ='position: relative; z-index: 100000;' size='8' name='newValue' value='" + pValue + "' id= '" + typeProperty.id + "'   >";
				}
				listDates.push(typeProperty.id);
				inputProps += "<input type='hidden' name='value' value='" + pValue + "'>";
			} else if (pType === "INTEGER") {
				if (loopCounter == 0) {
					if (!pValue) {
						inputProps += "<td ><input  title='" + pType + "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' onkeypress='return event.charCode >= 48 && event.charCode <= 57' autofocus onfocus=\"var temp_value=this.value; this.value=''; this.value=temp_value;\">";
					} else {
						inputProps += "<td><input title='" + pType + "' type='text' size='8' name='newValue' value='" + pValue + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57' autofocus onfocus=\"var temp_value=this.value; this.value=''; this.value=temp_value;\">";
					}
				} else {
					if (!pValue) {
						inputProps += "<td ><input  title='" + pType + "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' onkeypress='return event.charCode >= 48 && event.charCode <= 57'>";
					} else {
						inputProps += "<td><input title='" + pType + "' type='text' size='8' name='newValue' value='" + pValue + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57'>";
					}
				}
				//				if(!pValue) {
				//					inputProps += "<td ><input  title='" + pType + "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' onkeypress='return event.charCode >= 48 && event.charCode <= 57'>";}
				//				else {inputProps += "<td><input title='" + pType + "' type='text' size='8' name='newValue' value='" + pValue + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57'>";}
				inputProps += "<input type='hidden' name='value' value='" + pValue + "'>";
			} else if (pType === "DOUBLE" || pType === "CURRENCY") {
				if (loopCounter == 0) {
					if (!pValue) {
						inputProps += "<td ><input  title='" + pType + "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46' autofocus onfocus=\"var temp_value=this.value; this.value=''; this.value=temp_value;\">";
					} else {
						inputProps += "<td><input title='" + pType + "' type='text' size='8' name='newValue' value='" + pValue + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46' autofocus onfocus=\"var temp_value=this.value; this.value=''; this.value=temp_value;\">";
					}
				} else {
					if (!pValue) {
						inputProps += "<td ><input  title='" + pType + "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'>";
					} else {
						inputProps += "<td><input title='" + pType + "' type='text' size='8' name='newValue' value='" + pValue + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'>";
					}
				}
				//				if(!pValue) {
				//					inputProps += "<td ><input  title='" + pType + "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'>";}
				//				else {inputProps += "<td><input title='" + pType + "' type='text' size='8' name='newValue' value='" + pValue + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'>";}
				inputProps += "<input type='hidden' name='value' value='" + pValue + "'>";
			} else {
				if (loopCounter == 0) {
					if (!pValue) {
						inputProps += "<td ><input  title='" + pType + "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' autofocus onfocus=\"var temp_value=this.value; this.value=''; this.value=temp_value;\">";
					} else {
						inputProps += "<td><input title='" + pType + "' type='text' size='8' name='newValue' value='" + pValue + "' autofocus onfocus=\"var temp_value=this.value; this.value=''; this.value=temp_value;\">";
					}
				} else {
					if (!pValue) {
						inputProps += "<td ><input  title='" + pType + "' style='background-color:yellow' size='8'  type='text' name='newValue' value=''>";
					} else {
						inputProps += "<td><input title='" + pType + "' type='text' size='8' name='newValue' value='" + pValue + "'>";
					}
				}
				//				if(!pValue) {
				//					inputProps += "<td ><input  title='" + pType + "' style='background-color:yellow' size='8'  type='text' name='newValue' value=''>";}
				//				else {inputProps += "<td><input title='" + pType + "' type='text' size='8' name='newValue' value='" + pValue + "'>";}
				inputProps += "<input type='hidden' name='value' value='" + pValue + "'>";
			}

			inputProps += "</td></tr>";

			loopCounter++;
		});
		inputProps += "</table>";
	}

	var formFooter = "</table>";

	formFooter += "<input id='update_instance_button_id' type='button' value='Update Node'  class='btn btn-primary btn-sm'  onclick='saveUpdateNodeDialog(form)' />";
	formFooter += "<input id='cancel_update_instance_button_id' type='button' value='Cancel'  class='btn btn-primary btn-sm'  onclick='(new DisplayLogicalRenderer()).cancelUpdateNodeForm(\"" + nUuid + "\");' />";
	userActions.prevaction = userActions.currentaction ;
	userActions.currentaction = 'updateNode';


	Form.innerHTML = message + formHeader + inputs + inputProps + formFooter;
	//	(new DisplayLogicalRenderer()).emptyAllInst();
	$('#nodeForm').empty();
	$('#nodeForm').append(Form);

	DisplayInterfaceUtils.addDatePicker('');

}

// Attach the edge methods that will execute against edges when clicked
function attachEdgeClickActions(edges) {
	// Handle click events on cytoscape nodes
	edges.on('click', function(e) {
		var thisClick = new Date().getTime();
		pleaseWait = true;

		var edge = e.target;
		var simpleEdge = {};
		var uuid = NodeUtils.findUUID(edge.data());
		var originNodeName = this.source().data("cyDisplay");
		var destinationNodeName = this.target().data("cyDisplay");
		var edgeName = "Edge between " + originNodeName + " and " + destinationNodeName;
		simpleEdge.uuid = uuid;
		simpleEdge.originNodeName = originNodeName;
		simpleEdge.destinationNodeName = destinationNodeName;

		(new DisplayLogicalRenderer()).showEdgePropertiesBottom(uuid);

		//		var contentText = (new DisplayLogicalRenderer()).showEdgeToolTip(simpleEdge);  	  		
		//		edge.qtip({		
		//			content: {title: edgeName, text: contentText},		
		//		    show: {event: e.type, ready: true},		
		//		    position: {target: 'mouse'},		
		//		    style: {classes: 'qtip-blue qtip-tipped', tip: {width: 25, height: 15}},		
		//		    hide: {e: 'mouseout unfocus'}		
		//		}, e);	

		if (e.originalEvent.ctrlKey == true) {
			listEdgeUuids.push(this.data().sysProperties.uuid.value);
		} else {
			listInstUuids = [];
			listEdgeUuids = [];
			listEdgeUuids.push(this.data().sysProperties.uuid.value);
		}

		cancelNodeConnection();

		if (lastClick && ((thisClick - lastClick) < doubleClickThreshold) && lastObj && lastObj == e.target) {
			// Recongnise this as an double click event
			console.log("Double clicked on edge: " + this.data().name);
			isSingleClick = false;

			$(".qtip").remove();
			var qtipDiv = document.createElement('div');
			qtipDiv.id = 'nodeForm';
			qtipDiv.className = 'block';
			qtipDiv.innerHTML = "";
			edge.qtip({
				content : {
					title : {
						text : "Edge Details",
						button : true
					},
					text : qtipDiv,
				},
				show : {
					ready : true
				},
				position : {
					target : 'mouse',
					adjust : {
						resize : true
					},
					viewport : $(window)
				},
				style : {
					classes : 'qtip-blue qtip-tipped',
					tip : true
				},
				hide : {
					e : false
				}
			}, e);

			(new DisplayLogicalRenderer()).showEdgeDetailsWait(this);



			//			pleaseWait = true;
			//			setTimeout(function() {
			//				pleaseWait = false;
			//				if (isSingleClick == false  && this == lastObj) {
			//					 
			//				    (new DisplayLogicalRenderer()).showEdgeDetails(uuid);
			//				
			//				}				
			//			}, doubleClickThreshold + 10);

		} else {
			isSingleClick = true;
			(new DisplayLogicalRenderer()).showEdgePropertiesBottom(uuid);

		// Attempt to trigger single click action
		//			pleaseWait = true;
		//			setTimeout(function() {
		//				pleaseWait = false;
		//				if (isSingleClick && edge == lastObj) {
		//					$('#console-log').append("<p>Single click on this Edge (showing its properties)"+edge.data().name+"</p>");
		//					(new DisplayLogicalRenderer()).showEdgePropertiesBottom(uuid);
		////					(new DisplayLogicalRenderer()).showEdgeDetails(uuid);
		//					console.log("Inside ShowEdge property: " + edge.data().name);
		//				}
		//			}, doubleClickThreshold + 10);
		//			showEdgeProperties(this);
		}

		// Keep a record of the click action
		lastClick = thisClick;
		lastObj = e.target;
	});

	console.log("attachEdgeClickActions done");
}
;

//====================================================================================
function showEdgeProperties(edge) {
	// showProperties(e.cyTarget);
	pleaseWait = true;
	setTimeout(function() {
		pleaseWait = false;
		if (isSingleClick && edge == lastObj) {
			$('#console-log').append("<p>Single click on this Edge (showing its properties)" + edge.data().name + "</p>");
			retrieveEdgeProperties(edge);
			console.log("Inside ShowEdge property: " + edge.data().name);
		}
	}, doubleClickThreshold + 10);
}
;


//====================== Edited 07-11-2016======================================
function findConnForNode(connSelected, Node, nb) {
	var connS,
		result = false;
	;
	$.each(connMapViaId, function(key, value) {
		if (value.rule == connSelected.name) {
			connS = key;
		}
	//		if(value.id == connSelected.id)  {connS = key; }
	});
	console.log("found this connection " + connS);
	if (connS) {
		if (connMapViaId[connS].classification == 'link') {
			if (nb == 1) {
				if (connMapViaId[connS].origin == Node.type || connMapViaId[connS].destination == Node.type) {
					result = true;
				}
			} else {
				if (nb == 2) {
					if ((connMapViaId[connS].destination == Node.type && connMapViaId[connS].origin == originNode.type) || (connMapViaId[connS].origin == Node.type && connMapViaId[connS].destination == originNode.type)) {
						result = true;
					}
				} else {
					console.log("unknow type of node");
					result = false;
				}
			}
		} else {
			if (nb == 1) {
				if (connMapViaId[connS].origin == Node.type) {
					result = true;
				}
			} else {
				if (nb == 2) {
					if (connMapViaId[connS].destination == Node.type) {
						result = true;
					}
				} else {
					console.log("unknow type of node");
					result = false;
				}
			}
		}
	} else {
		console.log(" connection not found");
		result = false;
	}
	return result;

}

function canBeConnected(selectedConnectionId, startNodeUuid, endNodeUuid) {
	var result = false;

	var startNode = nodeMap[startNodeUuid];
	var endNode = nodeMap[endNodeUuid];
	var connection = connMapViaId[selectedConnectionId];

	if (connection && startNode && endNode) {
		if (connection.source == startNode.typeId && connection.target == endNode.typeId) {
			// find how many nodes under endNode type have already created for startNode
			var children = GlobalNodeUtils.getAllChildrenNodesUnderType(startNodeUuid, endNode.typeId);
			var numberOfChildren = Object.keys(children).length;

			if (Number(connection.maxRel) == -1) {
				result = true;
			} else {
				if (numberOfChildren < Number(connection.maxRel)) {
					result = true;
				}
			}
		}
	} else {
		console.log("Missing Mandatory Data");
		result = false;
	}

	return result;

}


function toggleElementNameDisplay(iconId, state, eleType) { // iconId, state,

	var cy = irvCy;

	// if show, going to show it
	if (state == 'show') {
		if (cy && eleType == "node") {
			changeElementName(cy, eleType, 'data(cyDisplay)')
		} else {
			changeElementName(cy, eleType, 'data(name)')
		}
		state = 'hide';
		//		document.getElementById(iconId).value = 'hide';
		document.getElementById(iconId).innerHTML = '<span class="glyphicon glyphicon-eye-close bigglyphicon" ></span>';
		document.getElementById(iconId).name = state;
	} else if (state == 'hide') {
		changeElementName(cy, eleType, '')
		state = 'show';
		//		document.getElementById(iconId).value = 'show';
		document.getElementById(iconId).innerHTML = '<span class="glyphicon glyphicon-eye-open bigglyphicon" ></span>';
		document.getElementById(iconId).name = state;
	} else {
		console.log('Wrong State: ' + state);
	}

}
;

function toggleElementDisplay(iconId, state, elements) {
	if (state == 'show') {
		for (var key in elements) {
			elements[key].style('display', "element");
		}
		state = 'hide';

		document.getElementById(iconId).innerHTML = '<span class="glyphicon glyphicon-transfer bigglyphicon" ></span>';
		document.getElementById(iconId).name = state;
	} else if (state == 'hide') {
		for (var key in elements) {
			elements[key].style('display', "none");
		}
		state = 'show';

		document.getElementById(iconId).innerHTML = '<span class="glyphicon glyphicon-transfer bigglyphicon" ></span>';
		document.getElementById(iconId).name = state;
	} else {
		console.log('Wrong State: ' + state);
	}

}
;