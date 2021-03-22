function DesignCytoscapeUtils(){
	
};

DesignCytoscapeUtils.formatNewType = function(type){
	
	var element = null;
	
	type.cyDisplay = type.name;
	type.color = TYPES_COLOR[colorIndex];
	colorIndex++;
	
	var new_x = GlobalUtils.getCoordinate(type.decoProperties, 'x', null);
	var new_y = GlobalUtils.getCoordinate(type.decoProperties, 'y', null);
	
	if(new_x == 0 && new_y == 0 ){
		   new_x -= (10 * colorIndex);
		   new_y -= (10 * colorIndex);
	}
	
	var element = {
			group: 'nodes',
			data : type,
//			renderedPosition: {x: new_x, y: new_y}
			position: {x: new_x, y: new_y}	
	};
	
	return element;
		
};
DesignCytoscapeUtils.formatNewConnection = function( jsonData ){
	var element = null;
	console.log(jsonData);
	if(jsonData != null){
		// format connection for the graph 
		jsonData.cyDisplay = jsonData.name;
		element = {
				group: 'edges',
				data : {
					id: 'connection' + jsonData.id,
					connId: jsonData.id,
					name: jsonData.name,
					rule: jsonData.ruleName,
					origin: jsonData.origin,
					destination: jsonData.destination,
					source: jsonData.originId.toString(),
					target: jsonData.destinationId.toString(),
					classification : jsonData.classification,
					minRel: jsonData.minRel,
					maxRel: jsonData.maxRel,
					ruleId: jsonData.ruleId
				}
		
			}				
		console.log("Got Connection");
		var connBase = GlobalUtils.createInternalConnMap(jsonData);
		return element;
	}

}
DesignCytoscapeUtils.formatTypesAndConnections = function() {
	
	var elements = [];

	for (var key in typeMapViaId) {
		
		var type = typeMapViaId[key];	
		var element = DesignCytoscapeUtils.formatNewType(type);			
		elements.push(element);
		
	}
	
	for (var key in connMapViaId) {
		
		var conn = connMapViaId[key];
		connMapViaId[conn.id].cyDisplay = '';
		connMap[conn.name].cyDisplay = '';
		
		var element = {
				group: 'edges',
				data : {
					id: 'connection' + conn.id,
					connId: conn.id,
					source: conn.source.toString(),
					target: conn.target.toString(),
					name: conn.name,
					rule: conn.rule,
					classification : conn.classification,
			//		romeClass: conn.romeClass,
					origin: conn.origin,
					destination: conn.destination,
					minRel: conn.minRel.toString(),
					maxRel: conn.maxRel.toString(),
					ruleId: conn.ruleId
				}
		};	
		elements.push(element);	
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
	        container: document.getElementById(containerId),
	        ready: function () {
	            console.log('ready')
	        },
	        showOverlay: false,
	        zoom: 2,
	        minZoom: 0.1,
	        maxZoom: 10,
	        zoomingEnabled: true,
	        style: cytoscape.stylesheet()
	            .selector('node')
		            .css({
		            	'content': 'data(name)',
		            	'background-color': 'data(color)',
//		            	'text-valign': 'center',
		            	'text-outline-color': 'data(color)',    // was     '#ccc'
		                'text-outline-width': 2,
		                'border-color': '#AABFB8',
		                'border-width': '2px',
		                'width': '30px',
		                'height': '30px',
		                'font-size': '11px',
		                'font-weight': 'bold',
		                'color': '#337AB7',                     
		                'overlay-opacity': 100,
		            })
		        .selector('node[classification = "path"]')
		            .css({
		            	'content': 'data(name)',
		            	'shape': 'rectangle',
		            	'background-color': 'data(color)',
//		            	'text-valign': 'center',
		            	'text-outline-color': 'data(color)',    // was     '#ccc'
		                'text-outline-width': 2,
		                'border-color': '#AABFB8',
		                'border-width': '2px',
		                'width': '30px',
		                'height': '30px',
		                'font-size': '11px',
		                'font-weight': 'bold',
		                'color': '#337AB7',                     
		                'overlay-opacity': 100,
		            }) 
		       .selector('node[classification = "system"]')
		            .css({
		            	'content': 'data(name)',
		            	'shape': 'triangle',
		            	'background-color': 'data(color)',
//		            	'text-valign': 'center',
		            	'text-outline-color': 'data(color)',    // was     '#ccc'
		                'text-outline-width': 2,
		                'border-color': '#AABFB8',
		                'border-width': '2px',
		                'width': '30px',
		                'height': '30px',
		                'font-size': '11px',
		                'font-weight': 'bold',
		                'color': '#337AB7',                     
		                'overlay-opacity': 100,
		            }) 
	            .selector('edge')
		            .css({
		                'curve-style': 'bezier',
		                'content': 'data(name)',
		                'font-size': '10px',
		                'line-style': 'dotted',
		                'overlay-color': '#c0c0c0',
		                'overlay-padding': '20px',
		                'overlay-opacity': 100,
		                'edge-text-rotation': 'autorotate'	               
		            })

	            .selector('edge[classification = "parentchild"]')
		            .css({
		            	'target-arrow-shape': 'triangle',
		                'source-arrow-shape': 'circle',
		                'line-color': '#2283c5', 
		                'text-outline-color':'#2283c5'
		            })
	            .selector('edge[classification = "link"]')
		            .css({
		            	'target-arrow-shape': 'circle',
		                'source-arrow-shape': 'circle',
		                'line-color': '#29a329',
		            })

		        .selector('node.highlight')
			        .css ({
			                'border-color': '#000',
			                'border-width': '2px'
			            })
			    .selector('edge.highlight')
			        .css ({
			        		'mid-target-arrow-color': '#000'
			            })
		            
	            .selector('.highlighted')
		            .css({
		            	'background-color': '#61bffc',
		                'line-color': '#ffa31a',
		                'target-arrow-color': '#ffa31a',
		                'transition-property': 'background-color, line-color, target-arrow-color',
		                'transition-duration': '0.5s'
		            })
	            .selector('node:selected')
	               .css({  	'border-color': '#CC1430' 
	            	   })
	            .selector(':selected')
		            .css({
		            	'background-color': '#61bffc',
		                'line-color': '#CC1430',
		                'source-arrow-color': '#CC1430',
		                'target-arrow-color': '#CC1430',
		                'transition-property': 'background-color, line-color,source-arrow-color, target-arrow-color',
		                'transition-duration': '0.5s'
		            })	  
	             .selector('node.semitransp')
	            	.css({
	            		'opacity':'0.5'
	            	})
	            .selector('edge.semitransp')
	            	.css({  
	            		'opacity':'0.5'
	            	})
	            .selector("core")
		            .css({  "active-bg-size": 0 
		            	})
          ,
	        elements: elements,
	        layout: {
	            name: 'preset',
	            fit: false,
	            roots: '#',
	            padding: 10,
	            nodeOverlap  : 10,
	            nodeRepulsion: 400000,
	            avoidOverlap: true,
	        }
	      
	    });
	    
	    DesignCytoscapeUtils.attachTypeClickActions(cy.nodes());
	    DesignCytoscapeUtils.attachRuleConnClickActions(cy.edges());
	    
	    cy.on('tap', function(event){
	    	var evtTarget = event.cyTarget;
	    	if( evtTarget === cy && !event.ctrlKey && ! event.shiftKey){
	    		console.log('Unselect Type & empty Info section');
	    		$('#console-log').append("<p style='color:blue'>Unselect Type & empty Info section</p>");
	    		
	    		if(listTypeIds.length  != 0) {
	    			tdvCy.filter('node[name="' + typeMapViaId[listTypeIds[0]].name + '"]').unselect();
	    			
	    		}
	    			    		
	    		listTypeIds=[];
	    		listConnIds= [];	    		
	    		shiftkeySelected = false;
	    		typeMapInst = {};
	    		
	    		
	    	}	    	
	    });
	    

	    // Selecting multiple nodes
	    cy.on('select', 'node', function(event){
//	    	console.log("Inside the cy select node");	
	    	if(shiftkeySelected) {
	    	              clearTimeout(cy.nodesSelectionTimeout);
	    	              cy.nodesSelectionTimeout = setTimeout(DesignCytoscapeUtils.getAllSelectedTypes(tdvCy), 300);
	    	}
	    	else {
	    		DesignCytoscapeUtils.getAllSelectedTypes(tdvCy)
//	    		console.log("One node selected ");
	    	}   	
	    });
	    cy.on('select', 'edge', function(event){
	    	console.log("Inside the cy select node");
	    	if(shiftkeySelected) {
	    	              clearTimeout(cy.edgesSelectionTimeout);
	    	              cy.edgesSelectionTimeout = setTimeout(DesignCytoscapeUtils.getAllSelectedTypes(tdvCy), 300);
	    	}else {
	    		DesignCytoscapeUtils.getAllSelectedTypes(tdvCy);
//	    		console.log("One edge selected ");
	    	}
	    });
	    
	    cy.on('mouseover', 'node', function(e){
		    var sel = e.cyTarget;
		    
		    var selTmp = sel.incomers('edge[classification = "link"]');
		    var selL = selTmp.union(selTmp.sources());
		    
		    cy.elements().difference(sel.outgoers().union(selL)).not(sel).addClass('semitransp');
		    sel.addClass('highlight').outgoers().addClass('highlight');
		    selL.addClass('highlight');

		});
		cy.on('mouseout', 'node', function(e){
		    var sel = e.cyTarget;
		    
		    var selTmp = sel.incomers('edge[classification = "link"]');
		    var selL = selTmp.union(selTmp.sources());
		    
		    cy.elements().removeClass('semitransp');
		    sel.removeClass('highlight').outgoers().removeClass('highlight');
		    selL.removeClass('highlight');
		});
	
	    cy.on('click', function(event){
	    	
	    	// click on blank
	    	if (!event.cyTarget.length) {
	    		
	    		listTypeIds =[];		
	    		listConnIds=[];
	    		
	    		document.getElementById("img_connect_pc").src = img_path +"design_icons/conn_pc.png";
	    		document.getElementById("img_connect_link").src = img_path +"design_icons/conn_link.png";
	    		resetConnVariables();
	    		(new DesignLogicalRenderer()).emptyAll();
	    		
	    	}
	    	
	    }); 
	    
	    cy.center();
	    return cy;
	    
	}
	
};

DesignCytoscapeUtils.updateTypeGraph = function(cy, elements) {
    console.log(elements);
	var newElements = cy.add(elements);
	DesignCytoscapeUtils.attachTypeClickActions(newElements.filter('node'));
    if (layoutStatus == 0) {
    	console.log("update using preset!");
    	cy.layout({name: 'preset',fit : false})
    } else {
    	console.log("update using default!");
    	cy.layout(defaultLayout);
    }
    
};

DesignCytoscapeUtils.attachTypeClickActions = function(types) {
	
	// Handle click events on cytoscape nodes
	types.on('click', function(e) {
	
		if($("#grid-types").is(':hidden')){$("#grid-types").css({'visibility':'visible'});}
		var thisClick = new Date().getTime();
		pleaseWait = true;
		//  this part will display a tooltip once the user hover over the node
	    
	        var node = e.cyTarget;
	        var sourceName = node.data("name");
	        var sourceId = node.data("id");
	        var contentText = (new DesignLogicalRenderer()).showTypeTooltip(sourceId);
	        node.qtip({
						content: {  title: sourceName,
								    text: contentText    },
			            show:    {  event: e.type,
			                        ready: true,         },
			            position:{  target : 'mouse',    },
		                style:   {  classes: 'qtip-blue qtip-tipped',
								    tip:    { width: 25,   height: 15  }
							     },
			            hide:    {    e: 'mouseout unfocus'    }
	                 }, e);		
	    if (lastClick && ((thisClick - lastClick) < doubleClickThreshold) && lastObj && lastObj == e.cyTarget) {
//			// Recognise this as an double click event
		   $('#console-log').append("<p style='color:blue'>Double clicked on type: " + this.data().name+"'</p>");
   		   isSingleClick = false;
	    }else {  	
            // no rule selected previously 
		    if( !ruleSelected ){
					  isSingleClick = true;
					// Attempt to trigger single click action
					 $('#console-log').append("<p style='color:blue'>Attempted single clicked on type: " + this.data().name+"'</p>");
					//console.log("Attempted single clicked on type: " + this.data().name);
					if( !shiftkeySelected ) {
						(new DesignLogicalRenderer()).showTypeProperties(this);
					}					
					
			} else {    // rule selected     ==== create a connection
					console.log(" rule selected is : "+ ruleSelected);
					if (originType == null){
						console.log(" clicked on type: " + this.data().name);
						originType = this.data().id;       // retrieve Id			
						if (typeMapViaId[originType].classification == "path") {
							originType = null;
							$('#typeForm').empty();
							$('#typeForm').append("<p style='color:red'>Only Node And System Can Be Connected</p>");
						}
						
					}else {
						
						destType = this.data().id ; 
						destTypeName = this.data().name;
						
						var st = typeMapViaId[originType];
						var et = typeMapViaId[destType];
						
						if (st.classification == et.classification) {
							if (st.classification != "path" && et.classification != "path") {
								 console.log("Destination is : "+ this.data().name );
								 saveNewConnection(originType, destType);
								 GlobalUtils.cursor_clear();
								 ruleSelected = false;
								 originType = null;
								 destType = null;
								 mouseEventTime = null;	
							} else {
								destType = null;
								$('#typeForm').empty();
								$('#typeForm').append("<p style='color:red'>Only Node And System Can Be Connected</p>");
							}
						} else {
							 destType = null;
							 $('#typeForm').empty();
							 $('#typeForm').append("<p style='color:red'>Only Node And System Can Be Connected</p>");
						}
	        
			        }
		}
	}
		// Keep a record of the click action
		lastClick = thisClick;
		lastObj = e.cyTarget;		
		
	});
	
	types.on('mousedown', function(e) {
		prePos = {id: this.data().id, x: this.position('x'), y: this.position('y')};
		
	})
	
	
	types.on('free', function(e) {	
		var new_x = this.position('x');
		var new_y = this.position('y');
		var typeId = this.data().id.toString();
		
		this.position('x', new_x);
		this.position('y', new_y);
		
		var typeFound;
		for (var key in typeMap) {
			if (typeMap[key].id == typeId) {
				typeFound = typeMap[key];
				break;
			}
		}
		
		DesignCytoscapeUtils.updatePosition(typeFound, 'x', new_x);
		DesignCytoscapeUtils.updatePosition(typeFound, 'y', new_y);
		
		var old_x = prePos.x;
		var old_y = prePos.y;		
		if ((new_x - old_x) * (new_x - old_x) + (new_y - old_y) * (new_y - old_y) > 10) {		
			preTdvPos = [];
			for (var i = 0; i < tdvCy.nodes().length; i++) {
				preTdvPos.push({id: tdvCy.nodes()[i].data().id, x: tdvCy.nodes()[i].position().x, y: tdvCy.nodes()[i].position().y});
			}
			var current;
			for (var i = 0; i < preTdvPos.length; i++) {
				if (preTdvPos[i].id == this.data().id) {
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
        var sourceId = connection.data("id").substring(10); // TODO: Wrong!
        var contentText = (new DesignLogicalRenderer()).showConnectionTooltip(sourceId);
        var x = connection._private.rscratch.midX;
        var y = connection._private.rscratch.midY;
        connection.qtip({       	
					content: {  title: sourceName,
							    text: contentText    },
//		            show:    {  event: e.type,
//		                        ready: true,         },
		            position:{  target: connection  }, 
	                style:   {  classes: 'qtip-blue qtip-tipped',
							    tip:    { width: 25,   height: 15  }
						     },
		            hide:    {    e: 'mouseout unfocus'    }
         }, e);	
		
		
		if (lastClick && ((thisClick - lastClick) < doubleClickThreshold) && lastObj && lastObj == e.cyTarget) {
			// Identify this as an double click event
			console.log("Double clicked on conn: " + this.data().name);
			isSingleClick = false;
		} else {
			isSingleClick = true;
			// Attempt to trigger single click action
			console.log("Attempted single clicked on conn: " + this.data().name);
//			nameconn = this.data().name;
		
			pleaseWait = true;
			setTimeout(function() {
				pleaseWait = false;
				if (isSingleClick) {
					$('#console-log').append("<p>Single click on this connection (showing its properties)"+conn.data().name+"</p>");
					(new DesignLogicalRenderer()).showConnRuleProperties(conn.data().connId);
//					DisplayConnRuleProperties(conn);
					console.log("inside showConnection property: " + conn.data().name);
				}
			}, doubleClickThreshold + 10)
//			(new DesignLogicalRenderer()).showConnRuleProperties(this);
		}
		
		// Keep a record of the click action
		lastClick = thisClick;
		lastObj = e.cyTarget;
	});
	
	console.log("attachRuleConnClickActions done");
	
};

//************ for position ************
DesignCytoscapeUtils.updatePosition = function(type, x, new_x) {
	
	for (var i = 0; i < type.decoProperties.length; i++) {
		if (type.decoProperties[i].name == x) {
			type.decoProperties[i].value = new_x;
			break;
		}
	}

};

DesignCytoscapeUtils.saveInitialPosition = function(cy) {
	if (cy != null) {
		if (preTdvPos == null) {
			preTdvPos = [];
			for (var i = 0; i < cy.nodes().length; i++) {
				preTdvPos.push({id: cy.nodes()[i].data().id, x: cy.nodes()[i].position().x, y: cy.nodes()[i].position().y});
			}
		}
	
		defTdvPos = [];
		for (var i = 0; i < cy.nodes().length; i++) {
			defTdvPos.push({id: cy.nodes()[i].data().id, x: cy.nodes()[i].position().x, y: cy.nodes()[i].position().y});
		}
	}
	
};

DesignCytoscapeUtils.toggleLayout = function() {
	
	console.log("toggle layout!");
	if (layoutStatus == 0) {
		preTdvPos = [];
		for (var i = 0; i < tdvCy.nodes().length; i++) {
			preTdvPos.push({x: tdvCy.nodes()[i].position().x, y: tdvCy.nodes()[i].position().y});
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
		
		var option = {name: 'preset'};
		var layout = tdvCy.makeLayout(option);
		layout.run();
		layoutStatus = 0;
	}
	
};

DesignCytoscapeUtils.resetLayout = function() {
	
	if (tdvCy == null) {
		return;
	}
	
	if (layoutStatus == 0) {
		preTdvPos = [];
		for (var i = 0; i < tdvCy.nodes().length; i++) {
			preTdvPos.push({id: tdvCy.nodes()[i].data().id, x: tdvCy.nodes()[i].position().x, y: tdvCy.nodes()[i].position().y});
		}
	}

	var layout = tdvCy.makeLayout(defaultLayout);
	layout.run();
	
	var typeFound;
	
	if (layoutStatus == 0) {
		for (var i = 0; i < tdvCy.nodes().length; i++) {
			for (var key in typeMap) {
				console.log("tdvCy id = " + tdvCy.nodes()[i].data().id);
				if (typeMap[key].id == tdvCy.nodes()[i].data().id) {
					typeFound = typeMap[key];
					console.log("type found: " + typeFound.id);
					break;
				}
			}
			
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
	
	var option = {name: 'preset'};
	var layout = tdvCy.makeLayout(option);
	layout.run();
	layoutStatus = 0;
	
	for (var i = 0; i < tdvCy.nodes().length; i++) {
		for (var key in typeMap) {
			console.log("tdvCy id = " + tdvCy.nodes()[i].data().id);
			if (typeMap[key].id == tdvCy.nodes()[i].data().id) {
				typeFound = typeMap[key];
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
	
	var option = {name: 'preset'};
	var layout = tdvCy.makeLayout(option);
	layout.run();
	layoutStatus = 0;

};

////////////////////////////////////////////////////////////////////////
DesignCytoscapeUtils.getAllSelectedTypes = function(cy){
	// initialise these variables
	listTypeIds=[];
	listConnIds=[];

	//   retrieve all types selected 
	var typeIds = cy.elements("node:selected");	
	// retrieve all connections selected
	var connIds = cy.elements("edge:selected");
	
	// Grab all selected nodes 
	 for( var i=0; i < typeIds.length; i++){
		 // display the name of type selected
		 var ele = typeIds[i].data('name');															
		 console.log("element grabbed is : "+ele );
		 // save the id in the list
		 listTypeIds.push(parseInt(typeIds[i].data('id')));	
		 }
	 // grab all selected   connections and their sources/destinations 
	 for(var i=0; i <connIds.length; i++){
		 // grab the connection ID
		 listConnIds.push(parseInt(connIds[i].data('id').slice(10)));
		 var connName = connIds[i].data('name');
		 // display its origin and destination 
		 console.log("Selected connection "+connName + " with  Origin is : "+connIds[i].data('origin')+" and  Destination is : "+connIds[i].data('destination'));
		 $('#console-log').append("<p style='color:green'>Selected connection "+connName + " with  Origin is : "+connIds[i].data('origin')+" and  Destination is : "+connIds[i].data('destination'));
	 }

	console.log(" List of nodes are "+ listTypeIds+ " list of connections are :  "+listConnIds );
};

DesignCytoscapeUtils.selectUnselectTypes = function(listTypes, cy, sel){
	 if(listTypes != null){
		 if (listTypes.length == 1) {
				 if(sel )  { cy.filter("node[id='"+listTypes[0]+"']").select();}
				 else   { cy.filter("node[id='"+listTypes[0]+"']").unselect();}
		} else {if(listTypes.length > 1){
				var nodeConditions = "[id='"+listTypes[0]+"']";
				for (var i = 1; i < listTypes.length; i++) {
					nodeConditions += ", [id='"+listTypes[i]+"']";
				}		
				var allNodes = cy.filter('node');
				if(sel )  {   allNodes.filter(nodeConditions).select();}
				else {  allNodes.filter(nodeConditions).unselect();  }
		}
		} 
	 }
};

DesignCytoscapeUtils.selectUnselectConnections = function(listConns, cy, sel){
	 if (listConns.length == 1) {	
		 if(sel )  {cy.filter("edge[id='connection"+listConns[0].toString()+"']").select();}
		 else {cy.filter("edge[id='connection"+listConns[0].toString()+"']").unselect(); }
	} else {
			var edgeConditions = "[id='connection"+listConns[0]+"']";
			for (var i = 1; i < listConns.length; i++) {
				edgeConditions += ", [id='connection"+listConns[i]+"']";
			}
			var allEdges = cy.filter('edge');
			if(sel )  {   allEdges.filter(edgeConditions).select();}
			else {  allEdges.filter(edgeConditions).unselect();  }
	} 
};

DesignCytoscapeUtils.grabTypesSelected = function(){
	 if(tdvCy){
		 var typeIds = tdvCy.elements("node:selected"),list=[];
		 for( var i=0; i < typeIds.length; i++){
			 // display the name of type selected
			 var ele = typeIds[i].data('name');
			 console.log("element grabbed is : "+ele );
			 // save the id in the list
			 list.push(parseInt(typeIds[i].data('id')));	
		 }
		 return list;
	 } else return null;
};


$(document).keyup(function(e){
	e = e || window.event;
	e = e;
	
	var cy;
  //  console.log(e.keyCode);
	if(topLevelTab == "typeDesignViewTab")  {
		cy  = tdvCy;	
	}
	else{ cy = irvCy}
    // Panning the Graph using arrow keys
	if (e.keyCode == 16 ){
		// shilft key pressed 
//		 console.log('Pressed [SHIFT]');
		 shiftkeySelected = false;
		
	}
});

$(document).keydown(function(e){
	e = e || window.event;
	e = e;
	
	var cy;
  //  console.log(e.keyCode);
	if(topLevelTab == "typeDesignViewTab")  {
		cy  = tdvCy;	
	}
	else{ cy = irvCy}
    // Panning the Graph using arrow keys
	if (e.keyCode == 16 ){
		// shilft key pressed 
//		 console.log('Pressed [SHIFT]');
		 shiftkeySelected = true;
		
	}
	
	
    if (e.keyCode == 39) { 
        // go right
        cy.panBy({
            x: 25,
            y: 0 
        });
       return false;
    }
    if (e.keyCode == 37) { 
        // go left
        cy.panBy({
            x: -25,
            y: 0 
        });
       return false;
    }
    if (e.keyCode == 40) { 
        // go down
        cy.panBy({
            x: 0,
            y: 25 
        });
       return false;
    }
    if (e.keyCode == 38) { 
        // go up
        cy.panBy({
            x: 0,
            y: -25 
        });
       return false;
    }
 // Character 'c' is pressed == All the visible instances are cleared. (Actually hidden)
    if ( e.ctrlKey && e.shiftKey && e.keyCode == 67  && topLevelTab == "typeDesignViewTab") { 
    	$("#grid-types").css({'visibility':'hidden'});
//    	nametype = null;
//    	curType = null;
    	shiftkeySelected = false;
    	listTypeIds=[];
    	listConnIds=[];
    }else {if (e.ctrlKey && e.shiftKey && e.keyCode == 67  && topLevelTab == "instRelViewTab")
    	   { $("#grid-instances").css({'visibility':'hidden'});  }}
        
});

DesignCytoscapeUtils.clickAnEdge = function (id) {
	
	var edge = tdvCy.filter(function(i, element){
		if (element.isEdge()) {
			if (Number(element.data().connId) == Number(id)) {
				return element;
			}
		}
	});
	
	edge.trigger('click');

};

DesignCytoscapeUtils.selectAnEdge = function (id) {
	
	var edge = tdvCy.filter(function(i, element){
		if (element.isEdge()) {
			if (Number(element.data().connId) == Number(id)) {
				return element;
			}
		}
	});
	
	edge.select();

};
