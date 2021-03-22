function DesignCytoscapeUtils() {

};

DesignCytoscapeUtils.formatNewType = function(type) {

	var element = null;
 
	type.cyDisplay = type.name;

	var new_x = 0, new_y = 0;
	if (!$.isEmptyObject(type.decoProperties)) {
		new_x = GlobalDecoUtils.getDecoPropertyValueFromInstance(type, 'x');
		new_y = GlobalDecoUtils.getDecoPropertyValueFromInstance(type, 'y');
	}

	if (new_x == 0 && new_y == 0) {
		new_x = 600;
		new_y = 400;
	}

	var element = {
		group : 'nodes',
		data : type,
		renderedPosition : {
			x : new_x,
			y : new_y
		}
	};

	return element;

};

DesignCytoscapeUtils.formatNewLink = function(data) {

	var element = null;
	var link    = data;
	var new_x = 0, new_y = 0;
	if (!$.isEmptyObject(data.decoProperties)) {
		new_x = GlobalDecoUtils.getDecoPropertyValueFromInstance(link, 'x');
		new_y = GlobalDecoUtils.getDecoPropertyValueFromInstance(link, 'y');
	}
	
	if (new_x == 0 && new_y == 0) {
		var new_x = 600;
		var new_y = 400;
	}
	
	var element = {
		group : 'nodes',
		data : {
			id : 'rule' + data.id,
			ruleId : data.id,
			name : data.name,
			classification : data.classification,
			cyDisplay : data.name,
			typeProperties : data.typeProperties,
			sysProperties : data.sysProperties,
			decoProperties : data.decoPropeties,
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
		if(jsonData.minRel) {minRel = jsonData.minRel};
		if(jsonData.maxRel) {maxRel = jsonData.maxRel};
		
		element = {
			group : 'edges',
			data : {
				id              : 'connection' + jsonData.id,
				connId          : jsonData.id,
				name            : label,
				rule            : jsonData.ruleName,
				origin          : jsonData.origin,
				destination     : jsonData.destination,
				source          : jsonData.originId.toString(),
				target          : jsonData.destinationId.toString(),
				classification  : jsonData.classification,
				minRel          : minRel,
				maxRel          : maxRel,
				ruleId          : jsonData.ruleId,
				cyDisplay       : ''
			}
		}
		console.log("Got Connection");
		// add connection to connMapViaId				
		var connBase = GlobalUtils.createInternalConnMap(jsonData);
		if (connBase == null) {  // if error in adding empty element
			element = null;
		}
	}
	return element;
}

DesignCytoscapeUtils.formatTypesAndConnections = function() {

	var elements = [];

	for ( var key in typeMapViaId) {

		var type = typeMapViaId[key];
		var element = DesignCytoscapeUtils.formatNewType(type);
		elements.push(element);

	}

	for ( var key in connMapViaId) {

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
		if(conn.minRel) {minRel = conn.minRel};
		if(conn.maxRel) {maxRel = conn.maxRel};
		var element = {
			group : 'edges',
			data : {
				id             : 'connection' + conn.id,
				connId         : conn.id,
				source         : conn.source.toString(),
				target         : conn.target.toString(),
				name           : label,
				rule           : conn.rule,
				classification : conn.classification,
				origin         : conn.origin,
				destination    : conn.destination,
				minRel         : minRel,
				maxRel         : maxRel,
				ruleId         : conn.ruleId,
				cyDisplay      : ''
			}
		};

		elements.push(element);
	}
	
	 for(var key in ruleMapViaId){
		 var rule = ruleMapViaId[key];
		 if(rule.classification == 'link'){
			 var element = DesignCytoscapeUtils.formatNewLink(rule);
			 elements.push(element);
		 }
	 }
	
	return elements;

};

DesignCytoscapeUtils.initTypeConnGraph = function(cy, containerId, elements) {

	// Clear cytoscape object if already initialised
	if (cy) {
		cy.remove(cy.elements());
	}
		

	if (elements.length != 0) {
		cy = cytoscape({
			container : document.getElementById(containerId),
			ready : function() {
				console.log('ready')
			},
			spacingFactor: 1.5,
			avoidOverlap: true,
			style : cytoscape
					.stylesheet()
					.selector('node')
					.css({
						'content' : 'data(name)',
						'text-valign' : 'center',
						'text-halign' : 'center',
						'background-color' : 'data(color)',
						'border-color' : '#AABFB8',
						'border-width' : '2px',
						'width' : 'data(size)',
						'height' : 'data(size)',
						'font-size' : '11px',
						'font-weight' : 'bold',
						'color' : '#000000',
						'overlay-opacity' : 100
					})
					.selector('node[classification = "DCT"]')
					.css({
//						'content' : 'data(name)',
//						'text-valign' : 'center',
//						'text-halign' : 'center',
						'shape' : 'roundrectangle',
//						'background-color' : 'data(color)',
//						'border-color' : '#AABFB8',
//						'border-width' : '2px',
//						'width' : 'data(size)',
//						'height' : 'data(size)',
//						'font-size' : '11px',
//						'font-weight' : 'bold',
//						'color' : '#000000',
//						'overlay-opacity' : 100
					})	
					.selector('node[classification = "path"]')
					.css({
//						'content' : 'data(name)',
//						'text-valign' : 'center',
//						'text-halign' : 'center',
						'shape' : 'rectangle',
//						'background-color' : 'data(color)',
//						'border-color' : '#AABFB8',
//						'border-width' : '2px',
//						'width' : 'data(size)',
//						'height' : 'data(size)',
//						'font-size' : '11px',
//						'font-weight' : 'bold',
//						'color' : '#000000',
//						'overlay-opacity' : 100
					})
					.selector('node[classification = "system"]')
					.css({
//						'content' : 'data(name)',
//						'text-valign' : 'center',
//						'text-halign' : 'center',
						'shape' : 'triangle',
//						'background-color' : 'data(color)',
//						'border-color' : '#AABFB8',
//						'border-width' : '2px',
//						'width' : 'data(size)',
//						'height' : 'data(size)',
//						'font-size' : '11px',
//						'font-weight' : 'bold',
//						'color' : '#000000',
//						'overlay-opacity' : '100'
					})
					
					 .selector('node[classification = "link"]')
					 .css({
//						 'content': 'data(name)',
						 'shape': 'diamond',
						 'background-color': 'grey',
						 'text-valign' : 'top',
						 'text-halign' : 'top',
//						 'border-width': '2px',
						 'width': '20px',
						 'height': '20px',
						 'font-size': '9px',
//						 'font-weight': 'bold',
//						 'color': '#000000',
//						 'overlay-opacity': '100'
					 })
					
					.selector('edge')
					.css({
						'curve-style'     : 'bezier',
						'content'         : 'data(name)',
						'font-size'       : '10px',
						'text-valign'     : 'top',
						'text-halign'     : 'top',
						'width'           : '2',
						'line-style'      : 'dotted',
						'overlay-color'   : '#c0c0c0',
						'overlay-padding' : '50px',
						'overlay-opacity' : '100',
						'edge-text-rotation' : 'autorotate'
					})

					.selector('edge[classification = "parentchild"]')
					.css({
						'target-arrow-shape' : 'triangle',
						'source-arrow-shape' : 'circle',
						'line-style'         : 'solid',
						'line-color'         : '#2283c5',
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
						'width' : '5'
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
						'border-color' : '#CC1430' // could use this #6ac6ff
					// similar to Neo4j
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
					})
					.selector('edge.semitransp')
					.css({
						'opacity' : '0.3'
					})
					.selector("core")
					.css({
						"active-bg-size" : '0'
					})
					.selector(".collapsed-child")
					.css({
						'opacity':'0'
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
            menuItems: [
            	// menu for node and edge  
                {  	
	                id: 'showproperties',
	                content: 'View As Properties',
	                tooltipText: '',
	                selector: 'node',
	               
	                onClickFunction: function (event) {
    
	    				    DesignCytoscapeUtils.grabElementsSelected();
	    				    DesignCytoscapeUtils.UnselectElements(tdvCy);
	    				    
	                	    var node = event.cyTarget;
//	                	    var pos  = event.cyRenderedPosition;    
	                	    var pos  = { x: event.originalEvent.clientX -40, y: event.originalEvent.clientY-40};
	                	    CXTMenuFctsUtils.ViewNodeAsProperties ( event, node , pos );
	                	    
	                	    
//		                	if (  event.cyTarget.isNode() ){
//		                	
//		                		console.log(node.data("id"));
//		                		console.log(node.data("classification"));
//		                		cy.$('#'+node.data("id")).select();
//		                		if( node.data("classification") === 'link'  ){
//		                			// call display rule link properties
//		                			var id = node.data("id").slice(4);
//		                			console.log(id);
//		                			GlobalUtils.setActiveRule(ruleMapViaId[id]);
//		                			ContextMenuFunctions.displayLinkProperties( node, id , pos , event)	                				                			
//		                		}else {
//		                			
//		                			var id = node.data("id");
//		                			GlobalUtils.setActiveType( typeMapViaId[id]);
//		                			console.log(id);
//		            				ContextMenuFunctions.displayNodeProperties( node, id , pos, event)		
//		                		}	                		                		
//		                	}               	
	                },
	                hasTrailingDivider: true
                },
//                {
//	                id: 'Select',
//	                content: 'Select',
//	                tooltipText: 'select',
//	                selector: 'node',
//	                onClickFunction: function (event) {
//	                	// case it is a node/path/system
//	                	var node = event.cyTarget;
//	                	if (  event.cyTarget.isNode()  &&  node.data("classification") != 'link'   ){
//	                		console.log(node.data("id")) ;               	
//	                	   (new DesignLogicalRenderer()).resetPage();
//						    activeType = node.data().id;			
//					        listTypeIds[0] = node.data().id;
//					        GlobalUtils.setActiveType(typeMapViaId[listTypeIds[0]]);
//	                	}
//	                	// case it is a rule(link)
//	                	if ( event.cyTarget.isNode()  &&  node.data("classification") == 'link'  ){
//	                		var id = node.data().id.slice(4);
//	                		if(activeType){
//	                			 (new DesignLogicalRenderer()).resetPage();
//	                		}
//	                		listConnIds[0] = id;
//	                		GlobalUtils.setActiveRule( ruleMapViaId[id]  );
//	                	}
//	                	
////	                	 contextMenu.showMenuItem('unselect');
//	                	
//	                	// case it is a parentchild edge 
//	                },
////	                disabled: false
//                },
                  //    menu for space in cytoscape
                {
	                id: 'add-node',
	                content: 'Add node',
	                image   : {src : "/webguiportal/assets/img/newdesign/Node-small.png", width : 12, height : 12, x : 6, y : 4},
	                tooltipText: 'add node',
	                coreAsWell: true,
	                onClickFunction: function (event) {
	                	var pos = event.cyRenderedPosition;	                
	                	console.log("this is the position "+ pos);
	                	ContextMenuFunctions.addType("ID" + Date.now(), "false", loggedInUserName, "node", [],pos);                   
	                }
                },
                
                {
	                id: 'add-link',
	                content: 'Add Link',
	                image   : {src : "/webguiportal/assets/img/newdesign/link.png", width : 12, height : 12, x : 6, y : 4},
	                tooltipText: 'add link',
	                coreAsWell: true,
	                onClickFunction: function (event) {
	                	var pos = event.cyRenderedPosition;	    
	                	ContextMenuFunctions.addLink("LK" + Date.now(), "link", pos);
	                },
	                hasTrailingDivider: true
                },
                
                
                
                
                
                
//                  
//                {
//		            id: 'add-path',
//		            content: 'Add path',
//		            tooltipText: 'add path',
//		            image   : {src : "/webguiportal/assets/img/newdesign/Path-small.png", width : 12, height : 12, x : 6, y : 4},
//		            coreAsWell: true,
//		            onClickFunction: function (event) {
//		            	var pos = event.position || event.cyPosition;       
//		            	ContextMenuFunctions.addType("ID" + Date.now(), "false", loggedInUserName, "path", [], pos);
//		            }
//                },
//                {
//	                id: 'add-system',
//	                content: 'Add System',
//	                image   : {src : "/webguiportal/assets/img/newdesign/System-small.png", width : 12, height : 12, x : 6, y : 4},
//	                tooltipText: 'add system',
//	                coreAsWell: true,
//	                onClickFunction: function (event) {
//	                	var pos = event.position || event.cyPosition;       
//	                	ContextMenuFunctions.addType("ID" + Date.now(), "false", loggedInUserName, "system", [],pos);
//	                }
//                },
//              
                
                              
//                {
//                    id: 'unselect',
//                    content: 'Unselect',
//                    tooltipText: 'unselect',
//                    show: false,
//                    coreAsWell: true,
//                    onClickFunction: function (event) {                	
//                    	(new DesignLogicalRenderer()).resetPage();
//                    	contextMenu.hideMenuItem('unselect');
//                    }
//                },
                {
	                id: 'create-connection',
	                content: 'Connect To',
	                tooltipText: 'Create Connection',
	                selector: 'node',
	                onClickFunction: function (event) {
	                	var node = event.cyTarget;
	                	if (  event.cyTarget.isNode()  &&  node.data("classification") != 'link'   ){
	                		console.log(node.data("id")) ;               	
	                	
	//                        selectAllOfTheSameType(event.target || event.cyTarget);
	                	}
	                }
                },
//                {
//                    id: 'assign-link',
//                    content: 'Assign Link',
//                    tooltipText: 'assign link',
//                    selector: 'node',
//                    onClickFunction: function (event) {
////                          selectAllOfTheSameType(event.target || event.cyTarget);
//                    }
//                }
                  
//                {
//                    id: 'select-all-nodes',
//                    content: 'Select all nodes',
//                    tooltipText: 'select all nodes',
//                    selector: 'node',
//                    show : true,
//                    onClickFunction: function (event) {
//                      selectAllOfTheSameType(event.target || event.cyTarget);
//                      contextMenu.hideMenuItem('select-all-nodes');
//                      contextMenu.showMenuItem('unselect-all-nodes');
//                    }
//                },
//                {
//                    id: 'unselect-all-nodes',
//                    content: 'unselect all nodes',
//                    tooltipText: 'select all nodes',
//                    selector: 'node',
//                    show: false,
//                    onClickFunction: function (event) {
//                        unselectAllOfTheSameType(event.target || event.cyTarget);
//						  
//                        contextMenu.showMenuItem('select-all-nodes');
//                        contextMenu.hideMenuItem('unselect-all-nodes');
//                    }
//                },	 
//                {
//                    id: 'select-all-edges',
//                    content: 'select all edges',
//                    tooltipText: 'select all edges',
//                    selector: 'edge',
//                    show: true,
//                    onClickFunction: function (event) {
//                      selectAllOfTheSameType(event.target || event.cyTarget);
//                      contextMenu.hideMenuItem('select-all-edges');
//                      contextMenu.showMenuItem('unselect-all-edges');	
//                    }
//                },
//                {
//                    id: 'unselect-all-edges',
//                    content: 'unselect all edges',
//                    selector: 'edge',
//                    show: false,
//                    onClickFunction: function (event) {
//                      unselectAllOfTheSameType(event.target || event.cyTarget);
//                      contextMenu.showMenuItem('select-all-edges');
//                      contextMenu.hideMenuItem('unselect-all-edges');
//                    }
//                  }
                ],
                menuItemClasses: ['custom-menu-item'],
                contextMenuClasses: ['custom-context-menu']
              });
		cy.on('cxttap', 'node', function(event){
			if (event.cyTarget.data().classification == 'link'){
				var instance = cy.contextMenus();
				instance.hideMenuitem('create-connection');
			}
		})
		
		// Selecting multiple nodes
		cy.on('select', 'node', function(event) {
			// console.log("Inside the cy select node");
			if (shiftkeySelected) {
				clearTimeout(cy.nodesSelectionTimeout);
				cy.nodesSelectionTimeout = setTimeout(DesignCytoscapeUtils.getAllSelectedTypes(tdvCy), 300);
			}else {
				DesignCytoscapeUtils.getAllSelectedTypes(tdvCy)
			}
		});

		cy.on('select', 'edge', function(event) {
			console.log("Inside the cy select node");
			if (shiftkeySelected) {
				clearTimeout(cy.edgesSelectionTimeout);
				cy.edgesSelectionTimeout = setTimeout(DesignCytoscapeUtils.getAllSelectedTypes(tdvCy), 300);
			}else {
				DesignCytoscapeUtils.getAllSelectedTypes(tdvCy);
			}
		});

		cy.on('mouseover', 'node', function(e) {
			if(! ruleSelected ){
				var sel = e.cyTarget;
				
				if( sel.data().classification == 'link'){
					var id = sel.data().id.slice(4);				
					var eles = cy.elements("edge[ruleId ="+id+"]");
					var nodes = eles.connectedNodes();
											
					cy.elements().difference(eles.union(nodes)).not(sel).addClass('semitransp');
					if(nodes){ nodes.addClass('highlight');}
					if(eles) { eles.addClass('highlight');}
					sel.addClass('highlight');
					
				}else {
					var id = sel.data().id;	
					var eles = cy.$("#"+id).neighborhood();
					var edges = cy.$("#"+id).connectedEdges();
					
					var links = [];
					edges.forEach(function(edge){
						if( edge.data('classification') == 'link'){
							links.push(edge.data("ruleId"));
						}
					})
					
					cy.elements().not(sel).addClass('semitransp');		
					sel.addClass('highlight');
					if(eles) {eles.removeClass('semitransp').addClass('highlight')};
					
					if( links.length >= 1){
						for (var i= 0; i< links.length; i++){
							cy.$("#rule"+links[i]).removeClass('semitransp').addClass('highlight');
						}					
					}				
				}	
			}
		});
		
		cy.on('mouseout', 'node', function(e) {
			if(! ruleSelected ){
				var sel = e.cyTarget;	
	            var id = sel.data().id;	
				var eles = cy.$("#"+id).neighborhood();
				cy.elements().removeClass('semitransp');
				cy.elements().removeClass('highlight');
			}
			
		});
		
		cy.on('click', function(event) {
			// click on core
			if (!event.cyTarget.length) {	
				if( typelinkCreate ){

					posType = event.cyRenderedPosition;
					posWin  = event.originalEvent;
	
//					offset = $("tdvCy").offset(),
					posWin = {
				        x: event.originalEvent.clientX ,             //- offset.left,
				        y: event.originalEvent.clientY               //- offset.top
				    };
					
                    console.log("X: " + posWin.x + "  Y: " + posWin.y);
                	console.log("this is the position "+ posType.x + "----------------"+posType.y);
                	// clear the cursor and the attached text
            		GlobalUtils.cursor_clear();
            		$("#besideMouseCreate").html("");
            		
                	(new DesignLogicalRenderer()).buildCreateWindow( event);              					
                		
				}else {
					DesignLogicalBarRender.unselect(event   );	
				}
					
			}
		});
		
		cy.resize();
		
		cy.center();
		
		cy.panzoom( );
				
		return cy;
	}
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
	types.on( 'click', function(e) {
		// Cases :   
		//   1. Click with no shift 
		//   2. Click with shift 
		var thisClick = new Date().getTime();
		pleaseWait = true;
	
		var node = e.cyTarget;
		var sourceName = node.data("name");	
		console.log(" clicked on type: "+ this.data().name);
		
		// type  selected is a link
		if( node.data().classification == 'link'){
			var id = node.data().id.slice(4);
			if( ! ruleSelected ){
				// simple selection of link
	    		GlobalUtils.setActiveRule( ruleMapViaId[Number(id)]  );	
				
			}else {
				// Assign click process
				if ( linkSelected == null ){
					linkSelected = Number(id);
					$("#dis_link").html("<b>"+ruleMapViaId[linkSelected].name+"</b>");
					document.getElementById("dis_link_bt").checked = true;
					$("#besideMouse").html("<span class='badge'>Select First Type</span>");
					ConnectionPropertyUtils.mouseText(event);
					tdvCy.nodes().selectify();	
					tdvCy.nodes().removeClass('semitransp');
					var eles = tdvCy.nodes().filter("[classification = 'link']");
					eles.unselectify();
					eles.addClass('semitransp');
				}else {
					CommonFctsLogical.HandlingErrorMSG("Assigning Link To Type: Link already selected","error");
					// ASK if He want to change the selected link
				}
			}
				
			
	    	
		}else if( node.data().classification == 'node' || node.data().classification == 'path'   || node.data().classification == 'system' || node.data().classification == 'DCT'  ){
				// type selected is a node/path/system
			var id = node.data().id;					
			console.log("Clicked on element: " + this.data().name);		
			if (lastClick && ((thisClick - lastClick) < doubleClickThreshold) && lastObj && lastObj == e.cyTarget) {
				// // Recognise this as an double click event
				console.log("Double clicked on type: "+ this.data().name);
				isSingleClick = false;				

			} else {					
				// no rule selected previously
				if (!ruleSelected) {
					isSingleClick = true;
				    if( selectedElement  && shiftkeySelected){
				    	//
				    }else {
				    	selectedElement = Number(id);	
						// reset any previous element 		
						GlobalUtils.setActiveType(typeMapViaId[selectedElement]);	
				    }				
								
				}else if( ruleSelected  && createRuleClassification == 'parentchild'){
					
					console.log(" rule selected is : " + ruleSelected);
					if (originType == null) {
					       						        
							if (typeMapViaId[Number(id)].classification == "path") {
								originType = null;
								CommonFctsLogical.HandlingErrorMSG("Only Node And System Can Be Connected","error");
							}else {
								selectedElement = Number(id);
								originType = Number(id);// retrieve  Id
								 $("#besideMouse").html("<span class='badge'>Select Second Type</span>");
								 ConnectionPropertyUtils.mouseText(e);
							}								
					} else {
						var st = typeMapViaId[originType];
						var et = typeMapViaId[Number(id)];
                        // both types should be different, of the same classification and different from path
						if( st.id != et.id ){
								if (st.classification != "path" && et.classification != "path") {
									
									destType = Number(id);									
									console.log("Destination is : "	+ this.data().name);
									tdvCy.nodes().removeClass('semitransp');
									tdvCy.nodes().selectify();
									DesignSavingFcts.clearSelection();
									
									ConnectionPropertyUtils.saveNewConnection( originType, destType);
									
									GlobalUtils.cursor_clear();
									$("#besideMouse").html("");
									ConnectionPropertyUtils.mouseText(e);
									document.getElementById("create_PC").className = "btn btn-primary text-center";
									ruleSelected = false;
									originType = null;
									destType = null;
									mouseEventTime = null;
									
								
									
									
								} else {
									destType = null;
									CommonFctsLogical.HandlingErrorMSG("Only Node And System Can Be Connected", "error");
								}
						}else {
							CommonFctsLogical.HandlingErrorMSG( "Cannot create PC on the same type- change second type or Cancel creation", "error");
							destType = null;
						}						
					}						
				}else if (ruleSelected  && createRuleClassification == 'link'  )	{
						console.log(" rule selected is : " + ruleSelected);
						if( linkSelected == null ) {
							console.log(" Please select a link first");
							return;
						}
						if (originType == null) {
						       						        
								if (typeMapViaId[Number(id)].classification == "path") {
									originType = null;
									CommonFctsLogical.HandlingErrorMSG("Only Node And System Can Be linked","error");
								}else {
									selectedElement = Number(id);
									originType = Number(id);// retrieve  Id
									
									$("#dis_typeS").html("<b>"+typeMapViaId[originType].name +"</b>");
									document.getElementById("dis_typeS_bt").checked = true;
									
									 $("#besideMouse").html("<span class='badge'>Select Second Type</span>");
									 ConnectionPropertyUtils.mouseText(e);
								}	
						}else {
							var st = typeMapViaId[originType];
							var et = typeMapViaId[Number(id)];
							destType = Number(id);	
							
							
							$("#dis_typeE").html("<b>"+typeMapViaId[destType].name+"</b>" );
							document.getElementById("dis_typeE_bt").checked = true;
							
							console.log("Destination is : "	+ this.data().name);
							
							DesignLinkFctsUtils.saveAssignLinkToType();
							
							GlobalUtils.cursor_clear();
							$("#besideMouse").html("");
							ConnectionPropertyUtils.mouseText(e);
							document.getElementById("assign_link").className = "btn btn-primary text-center";
							ruleSelected = false;
							originType = null;
							destType = null;
							mouseEventTime = null;
							$("#bottom_help").empty();
							document.getElementById("bottom_help").style.display    = 'none';
							document.getElementById("bottom_help").style.visibility = 'hidden';
							
							tdvCy.nodes().selectify();
							tdvCy.nodes().removeClass('semitransp');
						}
				}		
				
			}
		}

		// Keep a record of the click action
		lastClick = thisClick;
		lastObj = e.cyTarget;

	});
	
	types.on('mousedown', function(e) {
		var id, ctype;
		var node = e.cyTarget;
		
		if(this.data().classification == 'link' || this.data().classification == 'node' ||this.data().classification == 'path'|| this.data().classification == 'system' || this.data().classification == 'DCT'){
		
		   if( this.data().classification == 'link' ){   
			   id = this.data().id.slice(4);
			   ctype = 'link';
		   }else {
			   id = this.data().id;
			   ctype = 'type';
		   }
			prePos = {
						id     : id,
						x      : this.position('x'),
						y      : this.position('y'),
						type   : ctype
				     }
		}
	})

	types.on('free', function(e) {
		//get position of mouse
		var new_x = this.position('x');
		var new_y = this.position('y');
		var id, ctype;
		if (this.data().classification == 'link') {
			id = this.data().id.slice(4);
			ctype = 'link';
		} else{
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
		} else{
			typeFound = typeMapViaId[id];
		}	
						
		DesignCytoscapeUtils.updatePosition(typeFound, 'x', new_x);
		DesignCytoscapeUtils.updatePosition(typeFound, 'y', new_y);
        // get old node position
		var old_x = prePos.x;
		var old_y = prePos.y;
		
		
		// compare the two positions
		if ((new_x - old_x) * (new_x - old_x) + (new_y - old_y)* (new_y - old_y) > 10) {
				
			if( ctype == 'type'){
				nodesTdvPosChanged[id] = {type : ctype, id: id, x: new_x, y: new_y};
			}else {
				linksTdvPosChanged[id] = {type : ctype, id: id, x: new_x, y: new_y};
			}
		
			var id2, ctype2;			
			preTdvPos = [];
			for (var i = 0; i < tdvCy.nodes().length; i++) {
				if (this.data().classification == 'link') {
					id2 = this.data().id.slice(4);
					 ctype2 = 'link';
				} else{
					id2 = this.data().id;
					  ctype2 = 'type';
				}
				preTdvPos.push({
					type: ctype2,
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
	
	console.log("attachTypeClickActions done");

};

DesignCytoscapeUtils.attachRuleConnClickActions = function(conns) {

	// Handle click events on cytoscape nodes
	conns.on('click', function(e) {

		var conn = this;
		var thisClick = new Date().getTime();
		pleaseWait = true;
		var connection = e.cyTarget;
		var sourceName = connection.data("name");
		var sourceId = connection.data("id").substring(10); 

		if (lastClick && ((thisClick - lastClick) < doubleClickThreshold) && lastObj && lastObj == e.cyTarget) {
			// Identify this as an double click event
			console.log("Double clicked on conn: " + this.data().name);
			isSingleClick = false;
		} else {
			isSingleClick = true;
			if( shiftkeySelected ){
				
			}else {
				// Attempt to trigger single click action
				console.log("Attempted single clicked on conn: "+ this.data().name);
				$(".qtip").remove();
				var ruleId = conn.data().ruleId;
				
				var qtipDiv = document.createElement('div');
				qtipDiv.id = 'typeForm';
				qtipDiv.className = 'block';
				qtipDiv.innerHTML = "";
	
				connection.qtip({
					id: sourceId,
					content : {
						title : {text: "Connection Details",button : true},
						text : qtipDiv,
					},
					show : {
						event : e.type,
						ready : true,
					},
					position : {
						target : 'mouse',
						adjust : {	resize : true },
						viewport : $(document)
					},
					style : { classes : 'qtip-blue qtip-tipped',
					},
					hide : {e : false},
					events: {
						hide: function(event, api){
							api.destroy();
							if(conn.data().classification == 'link' && document.getElementById("rule_"+ruleId).length > 0 ) {document.getElementById("rule_"+ruleId).style.border = "";}
							tdvCy.$("#connection"+sourceId).unselect();
							
						}
					}
				}, e);
	
				pleaseWait = true;
				setTimeout(function() {
					pleaseWait = false;
					if (isSingleClick) {
						ConnectionPropertyUtils.showConnRuleProperties(conn.data().connId);
						console.log("inside showConnection property: "+ conn.data().name);
						var ruleId = conn.data().ruleId;
						if( conn.data().classification == 'link' && document.getElementById("rule_"+ruleId).length > 0){
							document.getElementById("rule_"+ruleId).style.border = "solid red";
						}
						
	
					}
				}, doubleClickThreshold + 10)
		    }
		
		}
		// Keep a record of the click action
		lastClick = thisClick;
		lastObj = e.cyTarget;
	});

	console.log("attachRuleConnClickActions done");

};

// ************ for position ************
//new taking care of types and links
DesignCytoscapeUtils.updatePosition = function(type, x, new_x) {

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
				var id , ctype;
				if (cy.nodes().data().classification != 'link') {
					id = cy.nodes()[i].data().id;
					ctype = 'type';
				}else {
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
			
			var id , ctype;
			if (cy.nodes().data().classification != 'link') {
				id = cy.nodes()[i].data().id;
				ctype = 'type';
			}else {
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
			for ( var key in typeMapViaId) {
				console.log("tdvCy id = " + tdvCy.nodes()[i].data().id);
				if (key == tdvCy.nodes()[i].data().id) {
					typeFound = typeMapViaId[key];
					console.log("type found: " + key);
					break;
				}
			}
			!TODO
			DesignCytoscapeUtils.updatePosition(typeFound, 'x',	tdvCy.nodes()[i].position().x);
			DesignCytoscapeUtils.updatePosition(typeFound, 'y',	tdvCy.nodes()[i].position().y);
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
		for ( var key in typeMapViaId) {
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
//old function
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
	listLinkIds   = [];
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
		console.log("Selected connection " + connName + " with  Origin is : "+ connIds[i].data('origin') + " and  Destination is : "+ connIds[i].data('destination'));
	}

	console.log(" List of nodes are " + listTypeIds	+ " list of connections are :  " + listConnIds);
};

DesignCytoscapeUtils.selectUnselectTypes = function(listTypes, cy, sel) {
	if (listTypes != null) {
		if (listTypes.length == 1) {
			if (sel) {
				cy.filter("node[id='" + listTypes[0] + "']").select();
//				GlobalUtils.setActiveType(typeMapViaId[listTypes[0]]);

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
			cy.filter("edge[id='connection" + listConns[0].toString() + "']").select();
		} else {
			cy.filter("edge[id='connection" + listConns[0].toString() + "']").unselect();
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
		var typeIds = tdvCy.elements("node:selected"), list = [];
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
	lkIdsSelectedList  = [];
	if (tdvCy) {
		var typeIds = tdvCy.elements("node:selected"), list = [];
		for (var i = 0; i < typeIds.length; i++) {
			// display the name of type selected
			var ele = typeIds[i];
			console.log("element grabbed is : " + ele.data('name'));
			// save the id in the list
			if( ele.data('classification')  == 'link'){
				lkIdsSelectedList.push(parseInt(ele.data('id').slice(4)));
			}else {
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
//			 listTypeIds = [];
//			 listConnIds = [];
		 } else {
			 if (e.ctrlKey && e.shiftKey && e.keyCode == 67 && topLevelTab == "instRelViewTab") {
			 $("#grid-instances").css({ 'visibility' : 'hidden'  });
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
		CommonFctsLogical.HandlingErrorMSG(	"Nograph nodes to save position", "error");	
		return;
	}
	
	 if( $.isEmptyObject(nodesTdvPosChanged) && $.isEmptyObject(linksTdvPosChanged)){
		CommonFctsLogical.HandlingErrorMSG(	"No nodes/links position changes to save", "warning");	
		return;
	}
	
	document.getElementById("save_Pos").className = "btn btn-default text-center";
	// RETRIEVING ALL TYPES POSITIONS
	var jsonElement = {};
	var typeId, linkId,node = {};
	var newDecoProperties = [];

	var decoProps = predefinedSelectedDecoPropertiesMap;
	
	$.each( nodesTdvPosChanged, function(key, value) {	
				
		var element = value;
		newDecoProperties.push({
			propertyName : "x",
			name         : "x",
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
				CommonFctsLogical.HandlingErrorMSG(	"Save position for typeId "+typeId + "failed ", "error");	
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
	
	$.each( linksTdvPosChanged, function(key, value) {	
		
		var element = value;
		linkId = element.id;
		console.log("Saving position for link : "+ linkId);
		jsonElement.linkId = linkId;
		
		newDecoProperties.push({
			propertyName : "x",
			name         : "x",
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
			CommonFctsLogical.HandlingErrorMSG(	"Save position for linkId "+linkId + "failed ", "error");
		};

		var apis = new RuleApis();
		apis.updateLinkDeco(jsonElement, doneFunction, failFunction);
			
	
		jsonElement = {};
		newDecoProperties = [];
		node = {};
		linkId = null;
		
	});
	CommonFctsLogical.HandlingErrorMSG(	"Save position Completed", "success");
	nodesTdvPosChanged = {};
	linksTdvPosChanged = {};
	document.getElementById("save_Pos").className = "btn btn-primary text-center";
};

DesignCytoscapeUtils.formatNodeLink = function() {

	for ( var key in connMapViaId) {
		var conn = connMapViaId[key];
		if (conn.classification == 'link' && conn.source == conn.target) {
			var elemt = tdvCy.$('#' + conn.source);
			elemt.style({'border-style' : 'dashed' 	});
		}
	}

}

DesignCytoscapeUtils.reAlignCytoscape = function() {

	var resizeViewport = function() {
		$(".cy").height($(window).height());
		tdvCy.resize();
		tdvCy.fit();
	};
//	$(window).resize(resizeViewport);
//	resizeViewport();
}
