function DesignCytoscapeUtils() {
}
;

//DesignCytoscapeUtils.formatNewType = function(type) {
//
//	var element = null;
//	type.cyDisplay = type.name;
//
//	GlobalUtils.setPreferencesforType(type);
//	type.color = currentColor; 
//	type.size  = currentSize;
//	type.labelPosition = currentLabelPosition;
//	type.labelSize  = currentLabelSize;	
//		
//	var new_x = GlobalDecoUtils.getDecoPropertyValueFromInstance(type, 'x');
//	var	new_y = GlobalDecoUtils.getDecoPropertyValueFromInstance(type, 'y');
//		
//	if (new_x == null) {
//		new_x = 0;	
//	}
//	if (new_y == null) {
//		new_y = 0;	
//	}
//	
//
////	if (new_x == 0 && new_y == 0) {
////
////		DesignCytoscapeUtils.updatePosition(type, 'x', '600');
////		DesignCytoscapeUtils.updatePosition(type, 'y', '400');
////
////		new_x = 600;
////		new_y = 400;
////	}
//
//	var element = {
//		group : 'nodes',
//		data : type,
//		renderedPosition : {
//			x : new_x,
//			y : new_y
//		}
//	};
//	return element;
//};

DesignCytoscapeUtils.formatNewLink = function(data) {

	var element = null;
	var link = data;
	var new_x = 0,
		new_y = 0;
	if (!$.isEmptyObject(data.decoProperties)) {
		new_x = GlobalDecoUtils.getDecoPropertyValueFromInstance(data, 'x');
		new_y = GlobalDecoUtils.getDecoPropertyValueFromInstance(data, 'y');
	}

//	if (new_x == 0 && new_y == 0) {
//		DesignCytoscapeUtils.updatePosition(data, 'x', '600');
//		DesignCytoscapeUtils.updatePosition(data, 'y', '400');
//
//		var new_x = 600;
//		var new_y = 400;
//	}

	var element = {
		group : 'nodes',
		data : {
			id : 'rule' + data.id,
			ruleId : data.id,
			name : data.name,
			classification : data.classification,
			label : data.name,
			cyDisplay : data.name,
			typeProperties : data.typeProperties,
			sysProperties : data.sysProperties,
			decoProperties : data.decoProperties,
			color : 'grey'
		},
		renderedPosition : {
			x : new_x,
			y : new_y
		}
	};
	return element;
};

DesignCytoscapeUtils.formatNewConnection = function(jsonData) {
	var element = null;
	var label;
	console.log(jsonData);
	if (jsonData != null) {
		// format connection for the graph
		jsonData.cyDisplay = '';
		if (jsonData.classification == 'link') {
			label = jsonData.ruleName;
		} else {
			label = jsonData.name;
		}
		// verify minRel and maxRel  if they have values
		var minRel = null;
		var maxRel = null;
		if (jsonData.minRel != null) {
			minRel = jsonData.minRel
		}
		;
		if (jsonData.maxRel != null) {
			maxRel = jsonData.maxRel
		}
		;

		element = {
			group : 'edges',
			data : {
				id : 'connection' + jsonData.id,
				connId : jsonData.id,
				name : label,
				rule : jsonData.ruleName,
				origin : jsonData.origin,
				destination : jsonData.destination,
				source : jsonData.originId.toString(),
				target : jsonData.destinationId.toString(),
				classification : jsonData.classification,
				minRel : minRel,
				maxRel : maxRel,
				ruleId : jsonData.ruleId,
				cyDisplay : ''
			}
		}
		console.log("Got Connection");
		var connBase = GlobalUtils.createInternalConnMap(jsonData);
		if (connBase == null) {
			element = null;
		}
	}
	return element;
}

DesignCytoscapeUtils.formatTypesAndConnections = function() {

	var elements = [];

	for (var key in typeMapViaId) {
		var type = typeMapViaId[key];
//		var element = DesignCytoscapeUtils.formatNewType(type);
		
		var element = CytoNodeUtils.formatNode(type);
		
		elements.push(element);
	}

	for (var key in connMapViaId) {
		var conn = connMapViaId[key];
		connMapViaId[conn.id].cyDisplay = '';
		connMap[conn.name].cyDisplay = '';
		var label;
		if (conn.classification == 'link') {
			label = conn.rule;
		} else {
			label = conn.name;
		}
		// verify minRel and maxRel  if they have values
		var minRel = null;
		var maxRel = null;
		if (conn.minRel != null) {
			minRel = conn.minRel
		}
		;
		if (conn.maxRel != null) {
			maxRel = conn.maxRel
		}
		;

		var element = {
			group : 'edges',
			data : {
				id : 'connection' + conn.id,
				connId : conn.id,
				source : conn.source.toString(),
				target : conn.target.toString(),
				name : label,
				rule : conn.rule,
				classification : conn.classification,
				origin : conn.origin,
				destination : conn.destination,
				minRel : minRel,
				maxRel : maxRel,
				ruleId : conn.ruleId,
				cyDisplay : ''
			}
		};

		elements.push(element);
	}

	for (var key in ruleMapViaId) {
		var rule = ruleMapViaId[key];
		if (rule.classification == 'link') {
			var element = DesignCytoscapeUtils.formatNewLink(rule);
			elements.push(element);
		}
	}

	return elements;

};

/*******************USED***********/
DesignCytoscapeUtils.initTypeConnGraph = function(cy, containerId, elements) {

	// Clear cytoscape object if already initialised
//	if (cy) {
//		cy.remove(cy.elements());
//	}

	CytoscapeCoreUtils.clearGraphAuto();
	
	
	
	
	//	if (elements.length != 0) {
	var $container = $("#" + containerId);
	cy = window.cy = cytoscape({
		container : $container,
		ready : function() {
			console.log('ready');
			height = $container.height();
			width = $container.width();

		},
		// showOverlay : false,
		spacingFactor : 1.5,
		avoidOverlap : true,

		style : cytoscape
			.stylesheet()
			.selector('node')
			.css({
				'content' : 'data(name)',
				'text-valign' : 'data(labelPosition)',
				'background-color' : 'data(color)',
				'border-color' : '#AABFB8',
				'border-width' : '2px',
				'width' : 'data(size)',
				'height' : 'data(size)',
				'font-size' : 'data(labelSize)',
				'font-weight' : 'bold',
				'color' : '#000000',
			})
			.selector('node[classification = "DCT"]')
			.css({
				'shape' : 'roundrectangle'
			})

			.selector('node[classification = "path"]')
			.css({
				'shape' : 'rectangle'
			})
			.selector('node[classification = "system"]')
			.css({
				'shape' : 'triangle'
			})

			.selector('node[classification = "link"]')
			.css({
				'shape' : 'diamond',
				'background-color' : 'grey',
				'text-valign' : 'top',
				'width' : '30px',
				'height' : '30px',
				'font-size' : '11px',
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
				'target-arrow-shape' : 'triangle',
				'source-arrow-shape' : 'circle',
				'line-style' : 'solid',
				'line-color' : '#2283c5',
				'text-outline-color' : '#2283c5'
			})
			.selector('edge[classification = "link"]')
			.css({
				'target-arrow-shape' : 'circle',
				'source-arrow-shape' : 'circle',
				'line-style' : 'dashed',
				'line-color' : '#29a329'
			})
		
			.selector('node.highlight')
			.css({
				'border-color' : '#6ac6ff',
				'border-width' : '4px'
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

			.selector('.highlighted')
			.css({
				'line-color' : '#ffa31a',
				'target-arrow-color' : '#ffa31a',
				'transition-property' : 'line-color, target-arrow-color',
				'transition-duration' : '0.5s'
			})
			.selector('node:selected')
			.css({
				'border-color' : '#CC1430' // could use this #6ac6ff similar to Neo4j
			})
			.selector(':selected')
			.css({
				'line-color' : '#CC1430',
				'source-arrow-color' : '#CC1430',
				'target-arrow-color' : '#CC1430',
				'transition-property' : 'line-color, source-arrow-color, target-arrow-color',
				'transition-duration' : '0.5s'
			})
			.selector('node.semitransp')
			.css({
				'opacity' : '0.3'
			}).selector('edge.semitransp')
			.css({
				'opacity' : '0.3'
			})
			.selector("core")
			.css({
				"active-bg-size" : '0'
			})
			.selector(".collapsed-child")
			.css({
				'opacity' : '0'
			}),
		elements : elements,
		layout : {
			name : 'preset',
			fit : false,
			roots : '#',
			padding : 10,
			nodeOverlap : 10,
			nodeRepulsion : 400000,
			avoidOverlap : true,
		},
		pixelRatio : 'auto'
	});

	DesignCytoscapeUtils.attachTypeClickActions(cy.nodes());
	DesignCytoscapeUtils.attachRuleConnClickActions(cy.edges());
	var contextMenu = cy.contextMenus({
		menuItems : [
			{
				id : 'add-node',
				content : 'Add node',
				image : {
					src : "/webguiportal/assets/img/newdesign/Node-small.png",
					width : 12,
					height : 12,
					x : 6,
					y : 4
				},
				tooltipText : 'add node',
				coreAsWell : true,
				onClickFunction : function(event) {
					posType = {
						x : event.renderedPosition.x,
						y : event.renderedPosition.y
					};
					posWin = {
						x : event.originalEvent.clientX,
						y : event.originalEvent.clientY
					};
					typelinkType = 'node';
					DesignSavingFcts.clearSelection();
					(new DesignLogicalRenderer()).buildCreateWindow(event);
				}
			},
			{
				id : 'add-link',
				content : 'Add Link',
				image : {
					src : "/webguiportal/assets/img/newdesign/link.png",
					width : 12,
					height : 12,
					x : 6,
					y : 4
				},
				tooltipText : 'add link',
				coreAsWell : true,
				onClickFunction : function(event) {
					posType = {
						x : event.renderedPosition.x,
						y : event.renderedPosition.y
					};
					posWin = {
						x : event.originalEvent.clientX,
						y : event.originalEvent.clientY
					};

					//					console.log("this is the position " + posWin);

					typelinkType = 'link';
					DesignSavingFcts.clearSelection();
					(new DesignLogicalRenderer()).buildCreateWindow(event);

				},
				hasTrailingDivider : true
			},
			{
				id : 'show properties',
				content : 'View properties',
				tooltipText : '',
				selector : 'node',

				onClickFunction : function(event) {
					DesignSavingFcts.clearSelection();
					var node = event.target;

					if (event.target.isNode()) {
						cy.$('#' + node.data("id")).select();
						if (node.data("classification") === 'link') {
							// call display rule link properties
							var id = node.data("id").slice(4);
							CXTMenuFcts.displayLink(id, event);
						} else {
							var id = node.data("id");
							CXTMenuFcts.displayType(id, event)
						}
					}
				},
			},
			{
				id : 'show properties',
				content : 'View properties',
				tooltipText : '',
				selector : 'edge',

				onClickFunction : function(event) {
					DesignSavingFcts.clearSelection();
					var node = event.target;

					if (event.target.isEdge()) {
						cy.$('#' + node.data("id")).select();
						var id = node.data("id").slice(10);
						CXTMenuFcts.displayConnection(id);
					}
				},
			},

			{
				id : 'Showtooltip',
				content : 'Preview properties ',
				selector : 'node',
				onClickFunction : function(event) {
					var node = event.target;
					if (event.target.isNode()) {
						if (node.data("classification") === 'link') {
							var id = node.data("id");
							if ($("[data-id=" + id + "]").children().length) {
								$("[data-id=" + id + "]").parent().parent().parent().css({
									"display" : "block"
								})

							} else {
								var ruleId = node.data("id").slice(4);
								if (!$.isEmptyObject(ruleMapViaId[ruleId].typeProperties)) {
									CommonFctsLogical.addTooltip(ruleMapViaId[ruleId]);
								} else {
									CommonFctsLogical.HandlingErrorMSG("No Link property to show", "warning");
								}
							}
						} else {
							var id = "type" + node.data("id");
							if ($("[data-id=" + id + "]").children().length) {
								$("[data-id=" + id + "]").parent().parent().parent().css({
									"display" : "block"
								})
							} else {
								var typeId = node.data('id')
								if (!$.isEmptyObject(typeMapViaId[typeId].typeProperties)) {
									CommonFctsLogical.addTooltip(typeMapViaId[typeId]);
								} else {
									CommonFctsLogical.HandlingErrorMSG("No Node property to show", "warning");
								}
							}
						}
					}

				},
			},

			{
				id : 'ShowReltip',
				content : 'Preview properties',
				selector : 'edge',
				onClickFunction : function(event) {
					var node = event.target;
					if (event.target.isEdge()) {
						var id = node.data("id");
						if ($("[data-id=" + id + "]").children().length) {
							$("[data-id=" + id + "]").parent().parent().parent().css({
								"display" : "block"
							})
						} else {
							var ruleId = node.data("ruleId");
							var connId = id.slice(10);
							if (!$.isEmptyObject(ruleMapViaId[ruleId].typeProperties)) {
								CommonFctsLogical.addRelTooltip(connId, ruleId);

							} else {
								CommonFctsLogical.HandlingErrorMSG("No property defined for connection", "warning");
							}
						}
					}


				},
			},
			{
				id : 'Connect-to',
				content : 'Create an Edge',
				selector : 'node',
				show : false,
				onClickFunction : function(event) {
					var node = event.target;
					if (event.target.isNode()) {
						DesignSavingFcts.clearSelection();
						creatingConnection = true;
						ruleSelected = true; // to differentiate between single click and double click
						createRuleClassification = 'parentchild';
						// reinitialise where to keep the two types
						originType = null;
						destType = null;

						tdvCy.nodes().removeClass('semitransp');
						tdvCy.nodes().selectify();
						var eles = tdvCy.nodes().filter("[classification = 'link']");
						eles.unselectify();
						eles.addClass('semitransp');
						tdvCy.edges().addClass('semitransp');
						tdvCy.edges().unselectify();


						GlobalUtils.cursor_wait();
						document.getElementById("create_PC").className = "btn btn-default text-center";
						$("#besideMouse").html("<span class='badge'>Select Type to Connect To</span>");
						ConnectionPropertyUtils.mouseText(event);
						var id = node.data("id");
						tdvCy.filter('node[id="' + id + '"]').select();
						selectedElement = Number(id);
						originType = Number(id);


					}
				}
			},
			{
				id : 'Delete',
				content : 'Delete',
				selector : 'node',
				show : false,
				onClickFunction : function(event) {
					var node = event.target;
					if (event.target.isNode()) {
						DesignSavingFcts.clearSelection();
						var id = node.data("id");
						var edges = node.connectedEdges();
						var nbNodes = CXTMenuFcts.findInstancesForType(id);
						$("#dialog").empty();
						if (nbNodes == 0) {
							$("#dialog").dialog({
								resizable : false,
								height : "auto",
								width : 300,
								modal : true,
								title : "Confirmation",
								buttons : {
									"Confirm" : function() {
										// first delete all PC/Links connections
										if (edges.length > 0) {
											edges.forEach(function(edge) {
												var conid = edge.data("id").substring(10);
												ConnectionPropertyUtils.deleteConnection(connMapViaId[conid]);
											});
										}
										// delete type
										DesignLinkFctsUtils.deleteTypeByGroup(id);
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
							var text = "<p style='color:red'>This process is irreversible and will delete <span class='badge' style='color:black; background:" + node.data('color') + ";'> " + node.data('name') + "</span> from all users.</p>";
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
								"</span> has " + nbNodes + " instances derived from it. <br/> Only types that do not have instances can be deleted.<br/> Please delete instances first."
							$("#dialog").append(text);
						}
						$("#dialog").dialog("open");
					}
				}
			},
			{
				id : 'deletRep',
				content : 'Delete',
				selector : 'edge',
				onClickFunction : function(event) {
					var node = event.target;
					if (event.target.isEdge()) {
						var id = node.data("id").substring(10);
						var ftcToCall = null;
						var nbEdges = CXTMenuFcts.findEdgesForConnection(id);
						$("#dialog").empty();
						$("#dialog").dialog({
							resizable : false,
							height : "auto",
							width  : 300,
							modal  : true,
							title  : '',
							buttons: {} ,	
							close  : function() {
								$(this).dialog("close");
							}
						})
						var divDialog = $("#dialog").dialog();
						var buttons   = divDialog.dialog("option","buttons");  // getter
						var title     = divDialog.dialog("option","title");    // getter
						var text      = "";						
						if ( nbEdges == 0 ){
							title = "Confirmation";
							var text = "<p style='color:red'> This process is irreversible and will delete this '" + node.data('classification') + "' relationship from all users. </p>" +
							"The '" + node.data('classification') + "' relationship from  " + node.data("origin") + " ---> " + node.data("destination") + " will be permantely deleted.<br/>" +
							" Please confirm if you would like to delete this?";
							$.extend(buttons, {	Confirm : function() {
													ConnectionPropertyUtils.deleteConnection(connMapViaId[id]);
													$(this).dialog("close");
												}},
												{Cancel : function() {
													$(this).dialog("close");
												}
											});
						}else {
							title = 'Alert';
							var text = "This <b>'" + node.data('classification') + "'</b> relationship has " + nbEdges + " edges derived from it.<br/> Only relationships that " +
							"do not have edges can be deleted. <br/>Please delete the edges first.";
							$.extend(buttons, {
												"OK" : function() {
													$(this).dialog("close");
												}
											})
						}
						$("#dialog").dialog("option","title", title);     // setter
						divDialog.dialog("option","buttons", buttons); // setter
						$("#dialog").append(text);
						
//						if (nbEdges == 0) {
//							$("#dialog").dialog({
//								resizable : false,
//								height : "auto",
//								width : 300,
//								modal : true,
//								title : "Confirmation",
//								buttons : {
//									"Confirm" : function() {
//										ConnectionPropertyUtils.deleteConnection(connMapViaId[id]);
//										$(this).dialog("close");
//									},
//									"Cancel" : function() {
//										$(this).dialog("close");
//									}
//								},
//								close : function() {
//									$(this).dialog("close");
//								}
//							})
//							var text = "<p style='color:red'> This process is irreversible and will delete this '" + node.data('classification') + "' relationship from all users. </p>" +
//								"The '" + node.data('classification') + "' relationship from  " + node.data("origin") + " ---> " + node.data("destination") + " will be permantely deleted.<br/>" +
//								" Please confirm if you would like to delete this?"
//							$("#dialog").append(text);
//						} else {
//							$("#dialog").dialog({
//								resizable : false,
//								height : "auto",
//								width : 300,
//								modal : true,
//								title : "Alert",
//								buttons : {
//									"OK" : function() {
//										$(this).dialog("close");
//									}
//								},
//								close : function() {
//									$(this).dialog("close");
//								}
//							})
//
//							var text = "This <b>'" + node.data('classification') + "'</b> relationship has " + nbEdges + " edges derived from it.<br/> Only relationships that " +
//								"do not have edges can be deleted. <br/>Please delete the edges first."
//							$("#dialog").append(text);
//						}
						$("#dialog").dialog("open");
					}
				},
				hasTrailingDivider : true
			}
		],
		menuItemClasses : [ 'custom-menu-item' ],
		contextMenuClasses : [ 'custom-context-menu' ]
	});

	makeTippyNode = function(node, text, type) {

		return tippy(node.popperRef(), {
			html : (function() {
				var div = document.createElement('div');

				if (node.data('classification') == 'link') {
					div.setAttribute('data-id', "rule" + node.data('ruleId'));
				} else {
					div.setAttribute('data-id', "type" + node.data('id'));
				}
				div.setAttribute('data-type', node.data('classification'));

				div.innerHTML = text;
				return div;
			})(),
			trigger : 'manual',
			arrow : true,
			theme : 'honeybee',
			placement : 'bottom',
			hideOnClick : false,
			multiple : true,
			sticky : true,
			interactive : true,
			offset : 0,
			popperOptions : {
				modifiers : {
					preventOverflow : {
						enabled : false
					},
					hide : {
						enabled : false
					}
				}
			},
		}).tooltips[0];
	};
	makeTippyRel = function(node, text) {
		return tippy(node.popperRef(), {
			html : (function() {
				var div = document.createElement('div');
				div.setAttribute('data-conn', node.data('classification'));
				div.setAttribute('data-id', node.data('id'));
				div.innerHTML = text;
				return div;
			})(),
			trigger : 'manual',
			theme : 'light',
			arrow : true,
			placement : 'top',
			interactive : true,
			hideOnClick : false,
			multiple : true,
			sticky : true,

			popperOptions : {
				modifiers : {
					preventOverflow : {
						enabled : false
					},
					hide : {
						enabled : false
					}
				}
			},
		}).tooltips[0];
	};

	if (elements.length != 0) {
		cy.nodes().forEach(function(ele) {
			var props = ele.data('typeProperties')
			var text = '';
			if (!$.isEmptyObject(props)) {
				text = "<span class='closetippy-tooltip' onclick='CommonFctsLogical.signleTurnOffTooltip(this)'>x</span><br/>";
				$.each(props, function(key, value) {
					text += "{" + value.name + ": " + value.propertyType + "}<br/>"
				})
			}
			var type = ele.data('classification');
			if (ele.data('classification') == 'link') {
				type = type + ele.data('ruleId');
			} else {
				type = type + ele.data('id');
			}
			var tippT = makeTippyNode(ele, text, type);
			tippT.show();
		});
		cy.edges().forEach(function(ele) {
			var ruleId = ele.data('ruleId');
			var props = ruleMapViaId[ruleId].typeProperties;

			var text = '';
			if (!$.isEmptyObject(props)) {
				text = "<span class='closetippy-tooltip' onclick='CommonFctsLogical.signleTurnOffTooltip(this)'>x</span><br/>";
				$.each(props, function(key, value) {
					text += "{" + value.name + ": " + value.propertyType + "}<br/>"
				})
			}
			var tippR = makeTippyRel(ele, text);
			tippR.show();
		});
	}

	// Selecting multiple nodes
	cy.on('select', 'node', function(event) {
		// console.log("Inside the cy select node");
		if (shiftkeySelected) {
			clearTimeout(cy.nodesSelectionTimeout);
			cy.nodesSelectionTimeout = setTimeout(DesignCytoscapeUtils.getAllSelectedTypes(tdvCy), 300);
		} else {
			DesignCytoscapeUtils.getAllSelectedTypes(tdvCy)
		}
	});
	cy.on('select', 'edge', function(event) {
		console.log("Inside the cy select node");
		if (shiftkeySelected) {
			clearTimeout(cy.edgesSelectionTimeout);
			cy.edgesSelectionTimeout = setTimeout(DesignCytoscapeUtils.getAllSelectedTypes(tdvCy), 300);
		} else {
			DesignCytoscapeUtils.getAllSelectedTypes(tdvCy);
		}
	});

	cy.on('mouseover', 'node', function(e) {
		if (!ruleSelected) {
			var sel = e.target;
			if (sel.data().classification == 'link') {
				var id = sel.data().id.slice(4);
				var eles = cy.elements("edge[ruleId =" + id + "]");
				var nodes = eles.connectedNodes();
				cy.elements().difference(eles.union(nodes)).not(sel).addClass(
					'semitransp');
				if (nodes) {
					nodes.addClass('highlight');
				}
				if (eles) {
					eles.addClass('highlight');
				}
				sel.addClass('highlight');

			} else {
				var id = sel.data().id;
				var eles = cy.$("#" + id).neighborhood();
				var edges = cy.$("#" + id).connectedEdges();
				var links = [];
				edges.forEach(function(edge) {
					if (edge.data('classification') == 'link') {
						links.push(edge.data("ruleId"));
					}
				})

				cy.elements().not(sel).addClass('semitransp');
				sel.addClass('highlight');
				if (eles) {
					eles.removeClass('semitransp').addClass('highlight')
				}
				;

				if (links.length >= 1) {
					for (var i = 0; i < links.length; i++) {
						cy.$("#rule" + links[i]).removeClass('semitransp')
							.addClass('highlight');
					}
				}
			}
		}
	});
	cy.on('mouseout', 'node', function(e) {
		if (!ruleSelected) {
			var sel = e.target;
			var id = sel.data().id;
			var eles = cy.$("#" + id).neighborhood();
			cy.elements().removeClass('semitransp');
			cy.elements().removeClass('highlight');
		}

	});

	cy.on('mouseover', 'edge', function(event) {
		if (!ruleSelected) {
			var sel = event.target;
			var id = sel.data().id.slice(10);
			//			console.log("ID found is" + id);
			if (sel.data().classification == 'link') {
				var ruleId = sel.data('ruleId');
				var eles = cy.elements("edge[ruleId =" + ruleId + "]");
				var nodes = eles.connectedNodes();
				var ele = cy.$("#rule" + ruleId);
				cy.elements().difference(eles.union(nodes)).not(ele).addClass('semitransp');
				if (nodes) {
					nodes.addClass('highlight');
				}
				if (eles) {
					eles.addClass('highlight');
				}
				ele.addClass('highlight');
			} else {
				var nodes = sel.connectedNodes();
				cy.elements().difference(nodes).not(sel).addClass('semitransp');
				if (nodes) {
					nodes.addClass('highlight');
				}
				sel.addClass('highlight');
			}
		}

	})
	cy.on('mouseout', 'edge', function(event) {
		if (!ruleSelected) {
			var sel = event.target;
			var id = sel.data().id;
			var eles = cy.$("#" + id).neighborhood();
			cy.elements().removeClass('semitransp');
			cy.elements().removeClass('highlight');
		}
	})

	cy.on('cxttap', 'node', function(event) {
		contextMenu.hideMenuItem('Connect-to');
		contextMenu.hideMenuItem('Delete');
		if (!ruleSelected) {
			var sel = event.target;
			if (sel.data().classification != 'link' && sel.data().classification != 'path') {
				contextMenu.showMenuItem('Connect-to');
				if (sel.data().classification == 'node') {
					var id = sel.data().id;
					contextMenu.showMenuItem('Delete');
				}
			}
		}
	});
	cy.on('cxttap', 'edge', function(event) {

		contextMenu.hideMenuItem('deletRep');
		if (!ruleSelected) {
			var sel = event.target;
			contextMenu.showMenuItem('deletRep');
		}

	});

	cy.on('click', function(event) {
		if (!event.target.length) {
			if (typelinkCreate) {

				posWin = {
					x : event.originalEvent.clientX,
					y : event.originalEvent.clientY
				};
				console.log("originalEvenet X:    " + posWin.x + " --  Y: " + posWin.y);
				posType = {
					x : event.renderedPosition.x,
					y : event.renderedPosition.y
				}

				// clear the cursor and the attached text
				GlobalUtils.cursor_clear();
				$("#besideMouseCreate").html("");
				$(".sidebotnav").empty();

				DesignSavingFcts.clearSelection();

				(new DesignLogicalRenderer()).buildCreateWindow(event);

			} else {
				DesignLogicalBarRender.unselect(event);
			}

		}
	});
	cy.resize();
	cy.center();
	cy.panzoom();
	return cy;

}

DesignCytoscapeUtils.updateTypeGraph = function(cy, elements) {
	console.log(elements);
	var newElements = cy.add(elements);
	DesignCytoscapeUtils.attachTypeClickActions(newElements.filter('node'));
	if (layoutStatus == 0) {
		console.log("update using preset!");
		cy.layout({
			name : 'preset',
			fit : false
		})
	} else {
		console.log("update using default!");
		cy.layout(defaultLayout);
	}

};

DesignCytoscapeUtils.attachTypeClickActions = function(types) {

	// Handle click events on cytoscape nodes
	types.on('click', function(e) {
		// Cases :   
		//   1. Click with no shift 
		//   2. Click with shift 
		var thisClick = new Date().getTime();
		pleaseWait = true;

		var node = e.target;
		var sourceName = node.data("name");
		console.log(" clicked on type: " + sourceName);

		// type  selected is a link
		if (node.data().classification == 'link') {
			var id = node.data().id.slice(4);
			if (!ruleSelected) {
				// simple selection of link
				GlobalUtils.setActiveRule(ruleMapViaId[Number(id)]);

			} else {
				// Assign click process
				if (linkSelected == null) {
					linkSelected = Number(id);
					$("#dis_link").html("<b>" + ruleMapViaId[linkSelected].name + "</b>");
					document.getElementById("dis_link_bt").checked = true;
					$("#besideMouse").html("<span class='badge'>Select First Type</span>");
					ConnectionPropertyUtils.mouseText(event);
					tdvCy.nodes().selectify();
					tdvCy.nodes().removeClass('semitransp');
					var eles = tdvCy.nodes().filter("[classification = 'link']");
					eles.unselectify();
					eles.addClass('semitransp');
				} else {
					CommonFctsLogical.HandlingErrorMSG("Assigning Link To Type: Link already selected", "error");
				// ASK if He want to change the selected link
				}
			}



		} else if (node.data().classification == 'node' || node.data().classification == 'path' || node.data().classification == 'system' || node.data().classification == 'DCT') {
			// type selected is a node/path/system
			var id = node.data().id;
			console.log("Clicked on element: " + this.data().name);
			if (lastClick && ((thisClick - lastClick) < doubleClickThreshold) && lastObj && lastObj == e.target) {
				// // Recognise this as an double click event
				console.log("Double clicked on type: " + this.data().name);
				isSingleClick = false;

			} else {
				// no rule selected previously
				if (!ruleSelected) {
					isSingleClick = true;
					GlobalUtils.setActiveType(typeMapViaId[Number(id)]);
				} else if (ruleSelected && createRuleClassification == 'parentchild') {
					if (originType == null) {

						if (typeMapViaId[Number(id)].classification == "path") {
							originType = null;
							CommonFctsLogical.HandlingErrorMSG("Only Node And System Can Be Connected", "error");
						} else {
							//							selectedElement = Number(id);
							originType = Number(id); // retrieve  Id
							$("#besideMouse").html("<span class='badge'>Select Second Type</span>");
							ConnectionPropertyUtils.mouseText(e);
						}
					} else {
						var st = typeMapViaId[originType];
						var et = typeMapViaId[Number(id)];
						// both types should be different, of the same classification and different from path
						if (st.id != et.id) {
							if (st.classification != "path" && et.classification != "path") {

								destType = Number(id);
								console.log("Destination is : " + et.name);
								tdvCy.nodes().removeClass('semitransp');
								tdvCy.nodes().selectify();

								ConnectionPropertyUtils.saveNewConnection(originType, destType);

								GlobalUtils.cursor_clear();
								$("#besideMouse").html("");
								ConnectionPropertyUtils.mouseText(e);
								document.getElementById("create_PC").className = "btn btn-primary text-center";

								creatingConnection = false;
								ruleSelected = false;
								originType = null;
								destType = null;
								createRuleClassification = null;
								linkSelected = null;
								selectedElement = null;

								mouseEventTime = new Date().getTime();
								pleaseWait = true;
							} else {
								destType = null;
								CommonFctsLogical.HandlingErrorMSG("Only Node And System Can Be Connected", "error");
							}
						} else {
							CommonFctsLogical.HandlingErrorMSG("Cannot create PC on the same type- change second type or Cancel creation", "error");
							destType = null;
						}
					}
				} else if (ruleSelected && createRuleClassification == 'link') {
					//					console.log(" rule selected is : " + ruleSelected);
					if (linkSelected == null) {
						console.log(" Please select a link first");
						return;
					}
					if (originType == null) {
						if (typeMapViaId[Number(id)].classification == "path") {
							originType = null;
							CommonFctsLogical.HandlingErrorMSG("Only Node And System Can Be linked", "error");
						} else {
							//							selectedElement = Number(id);
							originType = Number(id); // retrieve  Id

							$("#dis_typeS").html("<b>" + typeMapViaId[originType].name + "</b>");
							document.getElementById("dis_typeS_bt").checked = true;

							$("#besideMouse").html("<span class='badge'>Select Second Type</span>");
							ConnectionPropertyUtils.mouseText(e);
						}
					} else {
						var st = typeMapViaId[originType];
						var et = typeMapViaId[Number(id)];
						destType = Number(id);

						$("#dis_typeE").html("<b>" + typeMapViaId[destType].name + "</b>");
						document.getElementById("dis_typeE_bt").checked = true;
						console.log("Destination is : " + et.name);
						DesignLinkFctsUtils.saveAssignLinkToType();
						DesignLinkFctsUtils.abortAssignLinkToType();
					}
				}

			}
		}

		// Keep a record of the click action
		lastClick = thisClick;
		lastObj = e.target;

	});

	types.on('mousedown', function(e) {
		var id,
			ctype;
		var node = e.target;

		if (this.data().classification == 'link' || this.data().classification == 'node' || this.data().classification == 'path' || this.data().classification == 'system' || this.data().classification == 'DCT') {

			if (this.data().classification == 'link') {
				id = this.data().id.slice(4);
				ctype = 'link';
			} else {
				id = this.data().id;
				ctype = 'type';
			}
			prePos = {
				id : id,
				x : this.position('x'),
				y : this.position('y'),
				type : ctype
			}
		}
	})

	types.on('free', function(e) {
		//get position of mouse
		var new_x = this.position('x');
		var new_y = this.position('y');
		var id,
			ctype;
		if (this.data().classification == 'link') {
			id = this.data().id.slice(4);
			ctype = 'link';
		} else {
			id = this.data().id;
			ctype = 'type';
		}

		// update position in cytoscape
		this.position('x', new_x);
		this.position('y', new_y);

		// find element and update in typeMapViaId or ruleMapViaId
		var typeFound;
		if (this.data().classification == 'link') {
			typeFound = ruleMapViaId[id];
		} else {
			typeFound = typeMapViaId[id];
		}

		DesignCytoscapeUtils.updatePosition(typeFound, 'x', new_x);
		DesignCytoscapeUtils.updatePosition(typeFound, 'y', new_y);
		// get old node position
		var old_x = prePos.x;
		var old_y = prePos.y;


		// compare the two positions
		if ((new_x - old_x) * (new_x - old_x) + (new_y - old_y) * (new_y - old_y) > 10) {

			if (ctype == 'type') {
				nodesTdvPosChanged[id] = {
					type : ctype,
					id : id,
					x : new_x,
					y : new_y
				};
			} else {
				linksTdvPosChanged[id] = {
					type : ctype,
					id : id,
					x : new_x,
					y : new_y
				};
			}

			var id2,
				ctype2;
			preTdvPos = [];
			for (var i = 0; i < tdvCy.nodes().length; i++) {
				if (this.data().classification == 'link') {
					id2 = this.data().id.slice(4);
					ctype2 = 'link';
				} else {
					id2 = this.data().id;
					ctype2 = 'type';
				}
				preTdvPos.push({
					type : ctype2,
					id : id2,
					x : tdvCy.nodes()[i].position().x,
					y : tdvCy.nodes()[i].position().y
				});
			}
			var current;
			for (var i = 0; i < preTdvPos.length; i++) {
				if (preTdvPos[i].id == id) {
					current = i;
					break;
				}
			}
			preTdvPos[current].x = old_x;
			preTdvPos[current].y = old_y;
		}

	})

	//	console.log("attachTypeClickActions done");

};

DesignCytoscapeUtils.attachRuleConnClickActions = function(conns) {

	// Handle click events on cytoscape nodes
	conns.on('click', function(e) {

		var conn = e.target;
		var thisClick = new Date().getTime();
		pleaseWait = true;
		var connection = e.target;
		var connName = connection.data("name");
		var sourceId = connection.data("id").substring(10);

		if (lastClick && ((thisClick - lastClick) < doubleClickThreshold) && lastObj && lastObj == e.target) {
			// Identify this as an double click event
			console.log("Double clicked on conn: " + e.target.data().name);
			isSingleClick = false;
		} else {
			isSingleClick = true;
			//			if (shiftkeySelected) {
			//
			//			} else {
			//				// Attempt to trigger single click action
			//				console.log("Attempted single clicked on conn: " + e.target.data().name);
			//				if (!ruleSelected) {
			//					var pos = {
			//						x : e.originalEvent.clientX,
			//						y : e.originalEvent.clientY
			//					};
			//
			//					$(".qtip").remove();
			//					var ruleId = conn.data().ruleId;
			//					var qtipDiv = document.createElement('div');
			//					qtipDiv.id = 'typeForm';
			//					qtipDiv.className = 'block';
			//					qtipDiv.innerHTML = "";
			//
			//					connection.qtip({
			//						id : sourceId,
			//						content : {
			//							title : {
			//								text : connName + " Details",
			//								button : true
			//							},
			//							text : qtipDiv,
			//						},
			//						show : {
			//							ready : true,
			//						},
			//						position : {
			//							target : 'mouse',
			//							adjust : {
			//								method : 'shift',
			//								resize : true
			//							},
			//							viewport : $(window)
			//						},
			//						style : {
			//							classes : 'qtip-blue qtip-tipped',
			//							tip : true
			//						},
			//						hide : {
			//							e : false
			//						},
			//						events : {
			//							hide : function(event, api) {
			//								//							api.destroy();
			//								$(".qtip").empty();
			//								if (conn.data().classification == 'link' && document.getElementById("rule_" + ruleId)) {
			//									document.getElementById("rule_" + ruleId).style.border = "";
			//								}
			//								tdvCy.$("#connection" + sourceId).unselect();
			//
			//							}
			//						}
			//					}, e);
			//				}
			//				pleaseWait = true;
			//				setTimeout(function() {
			//					pleaseWait = false;
			//					if (isSingleClick) {
			//						var inputs = ConnectionPropertyUtils.showConnRuleProperties(conn.data().connId);
			//						$("#typeForm").empty();
			//						$("#typeForm").append(inputs);
			//						console.log("inside showConnection property: " + conn.data().name);
			//						var ruleId = conn.data().ruleId;
			//						if (conn.data().classification == 'link' && document.getElementById("rule_" + ruleId)) {
			//							document.getElementById("rule_" + ruleId).style.border = "solid red";
			//						}
			//					}
			//				}, doubleClickThreshold + 10)
			//			}

		}
		// Keep a record of the click action
		lastClick = thisClick;
		lastObj = e.target;
	});

	//	console.log("attachRuleConnClickActions done");

};

// ************ for position ************
// new taking care of types and links
DesignCytoscapeUtils.updatePosition = function(type, x, new_x) {
	if ($.isEmptyObject(type.decoProperties)) {
		return;
	}
	$.each(type.decoProperties, function(key, value) {
		if (value.name == x) {
			value.value = new_x;
			return false;
		}
	});
};

// new taking care of types and links
DesignCytoscapeUtils.saveInitialPosition = function(cy) {
	if (cy != null) {
		if (preTdvPos == null) {
			preTdvPos = [];
			for (var i = 0; i < cy.nodes().length; i++) {
				var id,
					ctype;
				if (cy.nodes().data().classification != 'link') {
					id = cy.nodes()[i].data().id;
					ctype = 'type';
				} else {
					id = cy.nodes()[i].data().id.slice(4);
					ctype = 'rule';
				}

				preTdvPos.push({
					id : id,
					type : ctype,
					x : cy.nodes()[i].position().x,
					y : cy.nodes()[i].position().y
				});
			}

		}

		defTdvPos = [];
		for (var i = 0; i < cy.nodes().length; i++) {

			var id,
				ctype;
			if (cy.nodes().data().classification != 'link') {
				id = cy.nodes()[i].data().id;
				ctype = 'type';
			} else {
				id = cy.nodes()[i].data().id.slice(4);
				ctype = 'rule';
			}

			defTdvPos.push({
				id : id,
				type : ctype,
				x : cy.nodes()[i].position().x,
				y : cy.nodes()[i].position().y
			});

		}
	}

};

//=====================================================================//
DesignCytoscapeUtils.toggleLayout = function() {

	console.log("toggle layout!");
	if (layoutStatus == 0) {
		preTdvPos = [];
		for (var i = 0; i < tdvCy.nodes().length; i++) {
			preTdvPos.push({
				x : tdvCy.nodes()[i].position().x,
				y : tdvCy.nodes()[i].position().y
			});
		}

		console.log("layout status = " + layoutStatus);
		var layout = tdvCy.makeLayout(defaultLayout);
		layout.run();
		layoutStatus = 1;
	} else {
		console.log("layout status = " + layoutStatus);
		tdvCy.nodes().positions(function(i, node) {
			return preTdvPos[i];
		});

		var option = {
			name : 'preset'
		};
		var layout = tdvCy.makeLayout(option);
		layout.run();
		layoutStatus = 0;
	}

};

DesignCytoscapeUtils.resetLayout = function() {

	if (layoutStatus == 0) {
		preTdvPos = [];
		for (var i = 0; i < tdvCy.nodes().length; i++) {
			preTdvPos.push({
				id : tdvCy.nodes()[i].data().id,
				x : tdvCy.nodes()[i].position().x,
				y : tdvCy.nodes()[i].position().y
			});
		}
	}

	var layout = tdvCy.makeLayout(defaultLayout);
	if (tdvCy == null) {
		return;
	}
	layout.run();

	var typeFound;

	if (layoutStatus == 0) {
		for (var i = 0; i < tdvCy.nodes().length; i++) {
			for (var key in typeMapViaId) {
				console.log("tdvCy id = " + tdvCy.nodes()[i].data().id);
				if (key == tdvCy.nodes()[i].data().id) {
					typeFound = typeMapViaId[key];
					console.log("type found: " + key);
					break;
				}
			}
			!TODO
			DesignCytoscapeUtils.updatePosition(typeFound, 'x', tdvCy.nodes()[i].position().x);
			DesignCytoscapeUtils.updatePosition(typeFound, 'y', tdvCy.nodes()[i].position().y);
		}
	}

	layoutStatus = 1;

};

DesignCytoscapeUtils.previousLayout = function() {

	if (tdvCy == null) {
		return;
	}

	tdvCy.nodes().positions(function(i, node) {
		return preTdvPos[i];
	});

	var option = {
		name : 'preset'
	};
	var layout = tdvCy.makeLayout(option);
	layout.run();
	layoutStatus = 0;

	for (var i = 0; i < tdvCy.nodes().length; i++) {
		for (var key in typeMapViaId) {
			console.log("tdvCy id = " + tdvCy.nodes()[i].data().id);
			if (key == tdvCy.nodes()[i].data().id) {
				typeFound = typeMapViaId[key];
				console.log("type found: " + typeFound.id);
				break;
			}
		}
		DesignCytoscapeUtils.updatePosition(typeFound, 'x', tdvCy.nodes()[i].position().x);
		DesignCytoscapeUtils.updatePosition(typeFound, 'y', tdvCy.nodes()[i].position().y);
	}

};

DesignCytoscapeUtils.restoreLayout = function() {

	if (tdvCy == null) {
		return;
	}

	tdvCy.nodes().positions(function(i, node) {
		return defTdvPos[i];
	});

	var option = {
		name : 'preset'
	};
	var layout = tdvCy.makeLayout(option);
	layout.run();
	layoutStatus = 0;

};

// //////////////////////////////////////////////////////////////////////
DesignCytoscapeUtils.getAllSelectedTypes = function(cy) {
	// initialise these variables
	listTypeIds = [];
	listConnIds = [];
	listLinkIds = [];
	// retrieve all types selected
	var typeIds = cy.elements("node:selected");
	// retrieve all connections selected
	var connIds = cy.elements("edge:selected");

	// Grab all selected nodes
	for (var i = 0; i < typeIds.length; i++) {
		// display the name of type selected
		var ele = typeIds[i].data('name');
		console.log("element grabbed is : " + ele);
		// save the id in the list
		var classification = typeIds[i].data('classification');
		if (classification == 'link') {
			listLinkIds.push(parseInt(typeIds[i].data('id').slice(4)));
		} else {
			listTypeIds.push(parseInt(typeIds[i].data('id')));
		}
	}
	// grab all selected connections and their sources/destinations
	for (var i = 0; i < connIds.length; i++) {
		// grab the connection ID
		listConnIds.push(parseInt(connIds[i].data('id').slice(10)));
		var connName = connIds[i].data('name');
		// display its origin and destination
		console.log("Selected connection " + connName + " with  Origin is : " + connIds[i].data('origin') + " and  Destination is : " + connIds[i].data('destination'));
	}

	console.log(" List of nodes are " + listTypeIds + " list of connections are :  " + listConnIds);
};

DesignCytoscapeUtils.selectUnselectTypes = function(listTypes, cy, sel) {
	if (listTypes != null) {
		if (listTypes.length == 1) {
			if (sel) {
				cy.filter("node[id='" + listTypes[0] + "']").select();
			} else {
				cy.filter("node[id='" + listTypes[0] + "']").unselect();
				$("#active_type").empty();
			}
		} else {
			if (listTypes.length > 1) {
				var nodeConditions = "[id='" + listTypes[0] + "']";
				for (var i = 1; i < listTypes.length; i++) {
					nodeConditions += ", [id='" + listTypes[i] + "']";
				}
				var allNodes = cy.filter('node');
				if (sel) {
					allNodes.filter(nodeConditions).select();
				} else {
					allNodes.filter(nodeConditions).unselect();
				}
			}
		}
	}
};
// used for switch from display to design

DesignCytoscapeUtils.selectUnselectConnections = function(listConns, cy, sel) {
	if (listConns.length == 1) {
		if (sel) {
			cy.filter("edge[id='connection" + listConns[0].toString() + "']")
				.select();
		} else {
			cy.filter("edge[id='connection" + listConns[0].toString() + "']")
				.unselect();
		}
	} else {
		var edgeConditions = "[id='connection" + listConns[0] + "']";
		for (var i = 1; i < listConns.length; i++) {
			edgeConditions += ", [id='connection" + listConns[i] + "']";
		}
		var allEdges = cy.filter('edge');
		if (sel) {
			allEdges.filter(edgeConditions).select();
		} else {
			allEdges.filter(edgeConditions).unselect();
		}
	}
};
// OLD Function
DesignCytoscapeUtils.grabTypesSelected = function() {
	if (tdvCy) {
		var typeIds = tdvCy.elements("node:selected"),
			list = [];
		for (var i = 0; i < typeIds.length; i++) {
			// display the name of type selected
			var ele = typeIds[i].data('name');
			console.log("element grabbed is : " + ele);
			// save the id in the list
			list.push(parseInt(typeIds[i].data('id')));
		}
		return list;
	} else
		return null;
};
// NEW FUNCTION
DesignCytoscapeUtils.grabElementsSelected = function() {

	eleIdsSelectedList = [];
	lkIdsSelectedList = [];
	if (tdvCy) {
		var typeIds = tdvCy.elements("node:selected"),
			list = [];
		for (var i = 0; i < typeIds.length; i++) {
			// display the name of type selected
			var ele = typeIds[i];
			console.log("element grabbed is : " + ele.data('name'));
			// save the id in the list
			if (ele.data('classification') == 'link') {
				lkIdsSelectedList.push(parseInt(ele.data('id').slice(4)));
			} else {
				// it could be node/path/system/dct
				eleIdsSelectedList.push(parseInt(typeIds[i].data('id')))
				list.push(parseInt(typeIds[i].data('id')));
			}
		}
		return list;
	} else
		return null;
};

DesignCytoscapeUtils.UnselectElements = function(cy) {
	if (eleIdsSelectedList != null) {
		if (eleIdsSelectedList.length == 1) {
			cy.filter("node[id='" + eleIdsSelectedList[0] + "']").unselect();
		} else {
			if (eleIdsSelectedList.length > 1) {
				var nodeConditions = "[id='" + eleIdsSelectedList[0] + "']";
				for (var i = 1; i < eleIdsSelectedList.length; i++) {
					nodeConditions += ", [id='" + listTypes[i] + "']";
				}
				var allNodes = cy.filter('node');
				allNodes.filter(nodeConditions).unselect()
			}
		}
	}
	if (lkIdsSelectedList != null) {
		if (lkIdsSelectedList.length == 1) {
			cy.filter("node[id='rule" + lkIdsSelectedList[0] + "']").unselect();
		} else {
			if (lkIdsSelectedList.length > 1) {
				var nodeConditions = "[id='" + lkIdsSelectedList[0] + "']";
				for (var i = 1; i < lkIdsSelectedList.length; i++) {
					nodeConditions += ", [id='" + listTypes[i] + "']";
				}
				var allNodes = cy.filter('node');
				allNodes.filter(nodeConditions).unselect()
			}
		}
	}
};

$(document).keyup(function(e) {
	e = e || window.event;
	e = e;

	var cy;
	// console.log(e.keyCode);
	if (topLevelTab == "typeDesignViewTab") {
		cy = tdvCy;
	} else {
		cy = irvCy
	}
	// Panning the Graph using arrow keys
	if (e.keyCode == 16) {
		// shilft key pressed
		// console.log('Pressed [SHIFT]');
		shiftkeySelected = false;

	}
});

$(document).keydown(function(e) {
	e = e || window.event;
	e = e;

	var cy;
	// console.log(e.keyCode);
	if (topLevelTab == "typeDesignViewTab") {
		cy = tdvCy;
	} else {
		cy = irvCy
	}
	// Panning the Graph using arrow keys
	if (e.keyCode == 16) {
		// shilft key pressed
		shiftkeySelected = true;
	}

	if (e.keyCode == 39) {
		// go right
		cy.panBy({
			x : 10,
			y : 0
		});
		return false;
	}
	if (e.keyCode == 37) {
		// go left
		cy.panBy({
			x : -10,
			y : 0
		});
		return false;
	}
	if (e.keyCode == 40) {
		// go down
		cy.panBy({
			x : 0,
			y : 10
		});
		return false;
	}
	if (e.keyCode == 38) {
		// go up
		cy.panBy({
			x : 0,
			y : -10
		});
		return false;
	}
	// Character 'c' is pressed == All the visible instances are
	// cleared. (Actually hidden)
	if (e.ctrlKey && e.shiftKey && e.keyCode == 67 && topLevelTab == "typeDesignViewTab") {
		shiftkeySelected = false;
	} else {
		if (e.ctrlKey && e.shiftKey && e.keyCode == 67 && topLevelTab == "instRelViewTab") {

		}
	}

});

DesignCytoscapeUtils.clickAnEdge = function(id) {

	var edge = tdvCy.filter(function(i, element) {
		if (element.isEdge()) {
			if (Number(element.data().connId) == Number(id)) {
				return element;
			}
		}
	});

	edge.trigger('click');

};

DesignCytoscapeUtils.centerGraph = function() {

	var layout = tdvCy.layout({
		name : 'random'
	});

}

DesignCytoscapeUtils.savePosition = function() {
	$("#error_message").empty();
	if (tdvCy.nodes() == null || tdvCy.nodes().length < 1) {
		CommonFctsLogical.HandlingErrorMSG("Nograph nodes to save position", "error");
		return;
	}

	if ($.isEmptyObject(nodesTdvPosChanged) && $.isEmptyObject(linksTdvPosChanged)) {
		CommonFctsLogical.HandlingErrorMSG("No nodes/links position changes to save", "warning");
		return;
	}

	document.getElementById("save_Pos").className = "btn btn-default text-center";
	// RETRIEVING ALL TYPES POSITIONS
	var jsonElement = {};
	var typeId,
		linkId,
		node = {};
	var newDecoProperties = [];

	var decoProps = predefinedSelectedDecoPropertiesMap;

	$.each(nodesTdvPosChanged, function(key, value) {

		var element = value;
		newDecoProperties.push({
			propertyName : "x",
			name : "x",
			value : element.x.toString(),
			propertyType : "DOUBLE",
			id : decoProps["x"].id.toString()
		});
		newDecoProperties.push({
			propertyName : "y",
			name : "y",
			value : element.y.toString(),
			propertyType : "DOUBLE",
			id : decoProps["y"].id.toString()
		});
		newDecoProperties.push({
			propertyName : "z",
			name : "z",
			value : "0",
			propertyType : "DOUBLE",
			id : decoProps["z"].id.toString()
		});
		jsonElement.grouphost = userGroup.host;
		jsonElement.groupname = userGroup.name;
		jsonElement.namespace = loggedInUserName;

		if (element.type != 'link') {
			typeId = element.id;
			node.typeId = element.id.toString();
			node.decorators = typeMapViaId[typeId].decorators;
			node.decoProperties = newDecoProperties;
			jsonElement.node = node;

			console.log(jsonElement);
			var doneFunction = function(data) {
				if (!$.isEmptyObject(data.decoProperties)) {
					console.log(data);
					typeMapViaId[typeId].decoProperties = data.decoProperties;
				}
			};

			var failFunction = function(xhr, status, error) {
				console.log("Save position error: " + xhr.responseText);
				CommonFctsLogical.HandlingErrorMSG("Save position for typeId " + typeId + "failed ", "error");
			};

			var apis = new TypeApi();
			apis.saveTypeCoordinates(typeId, jsonElement, doneFunction, failFunction);

			console.log("saved position");

		}
		jsonElement = {};
		newDecoProperties = [];
		node = {};
		typeId = null;
	});

	$.each(linksTdvPosChanged, function(key, value) {

		var element = value;
		linkId = element.id;
		console.log("Saving position for link : " + linkId);
		jsonElement.linkId = linkId;

		newDecoProperties.push({
			propertyName : "x",
			name : "x",
			value : element.x.toString(),
			propertyType : "DOUBLE",
			id : decoProps["x"].id.toString()
		});
		newDecoProperties.push({
			propertyName : "y",
			name : "y",
			value : element.y.toString(),
			propertyType : "DOUBLE",
			id : decoProps["y"].id.toString()
		});
		newDecoProperties.push({
			propertyName : "z",
			name : "z",
			value : "0",
			propertyType : "DOUBLE",
			id : decoProps["z"].id.toString()
		});
		jsonElement.grouphost = userGroup.host;
		jsonElement.groupname = userGroup.name;
		jsonElement.namespace = loggedInUserName;


		jsonElement.decoratorProperties = newDecoProperties;
		console.log(jsonElement);
		var doneFunction = function(data) {
			if (!$.isEmptyObject(data.decoProperties)) {
				console.log(data);
				ruleMapViaId[linkId].decoProperties = data.decoProperties;
			}
		};

		var failFunction = function(xhr, status, error) {
			console.log("Save position error: " + xhr.responseText);
			CommonFctsLogical.HandlingErrorMSG("Save position for linkId " + linkId + "failed ", "error");
		};

		var apis = new RuleApis();
		apis.updateLinkDeco(jsonElement, doneFunction, failFunction);


		jsonElement = {};
		newDecoProperties = [];
		node = {};
		linkId = null;

	});
	CommonFctsLogical.HandlingErrorMSG("Save position Completed", "success");
	nodesTdvPosChanged = {};
	linksTdvPosChanged = {};
	document.getElementById("save_Pos").className = "btn btn-primary text-center";
};

DesignCytoscapeUtils.formatNodeLink = function() {

	for (var key in connMapViaId) {
		var conn = connMapViaId[key];
		if (conn.classification == 'link' && conn.source == conn.target) {
			var elemt = tdvCy.$('#' + conn.source);
			elemt.style({
				'border-style' : 'dashed'
			});
		}
	}

}

DesignCytoscapeUtils.reAlignCytoscape = function() {

	var resizeViewport = function() {
		$(".cy").height($(window).height());
		tdvCy.resize();
		tdvCy.fit();
	};
// $(window).resize(resizeViewport);
// resizeViewport();
}