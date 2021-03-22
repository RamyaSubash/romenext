function PathCytoscapeUtils() {
	
};

PathCytoscapeUtils.formatNode = function(node) {
	
	// Find name to display for node
	var name  = NodeUtils.findNameInst(node);	
	    node.cyDisplay = name;
	// associate the same color as the type to the node
	    node.color = typeMapViaId[node.typeId].color;
	
	// getting the coords
	var new_x = GlobalUtils.getCoordinate(node.decoProperties, 'x', node.typeId);
	var new_y = GlobalUtils.getCoordinate(node.decoProperties, 'y', node.typeId);	
	
	var type = typeMapViaId[node.typeId];
	
	// format node for cytoscape
	var element = {
		group: 'nodes',
		data: node,
		classification: type.classification,
		renderedPosition: {x: new_x, y: new_y}
	};
	
	return element;	
};

PathCytoscapeUtils.formatNodes = function(nodes) {
	
	var elements = [];
	
	// start the format for nodes
	for (var key in nodes) {
		var element = {};
		element = PathCytoscapeUtils.formatNode(nodes[key]);
		elements.push(element);
	}
	
	return elements;

}

PathCytoscapeUtils.initNodeEdgeGraph = function(cy, containerId, elements) {	
	
	if (cy) {
        cy.remove(cy.elements());
	}
        
    if (elements.length != 0) {
	    cy = cytoscape({
	        container: document.getElementById(containerId),
	        ready: function () {    console.log('ready')      },
	        showOverlay: false,
	        zoom:1,
	        minZoom: 0.1,
	        maxZoom: 10,
	        zoomingEnabled: true,
	        style: cytoscape.stylesheet()
	            .selector('node')
		            .css({
		            	'content': 'data(cyDisplay)',
		            	'text-valign': 'center',
		                'text-halign': 'center',
		            	'background-color': 'data(color)',
		                'border-color': '#AABFB8',
		                'border-width': '2px',
		                'width': '20px',
		                'height': '20px',
		                'font-size': '7px',
		                'font-weight': 'bold',
		                'color': '#337AB7',
		                'overlay-opacity': 100
		            })
		        .selector('node[classification = "path"]')
		            .css({
		            	'content': 'data(cyDisplay)',
		            	'shape': 'rectangle',
		            	'text-valign': 'center',
		                'text-halign': 'center',
		            	'background-color': 'data(color)',
		                'border-color': '#AABFB8',
		                'border-width': '2px',
		                'width': '20px',
		                'height': '20px',
		                'font-size': '7px',
		                'font-weight': 'bold',
		                'color': '#337AB7',
		                'overlay-opacity': 100
		            })
		        .selector('node[classification = "system"]')
		            .css({
		            	'display': 'none'
		            })
	            .selector('edge')
		            .css({
		                'curve-style': 'bezier',
		                'content': 'data(name)',
		                'color': '#337AB7',
		                'font-size': '10px',	              
		                'line-style': 'dotted',
		                'overlay-color': '#c0c0c0',
		                'overlay-padding': '50px',
		                'overlay-opacity': '100',
		                'edge-text-rotation': 'autorotate'	  
		            })
	            .selector('edge[classification = "parentchild"]')
		            .css({
		            	'target-arrow-shape': 'triangle',
		                'source-arrow-shape': 'circle',
		                'line-color': '#2283c5'
		            })
	            .selector('edge[classification = "link"]')
		            .css({
		            	'target-arrow-shape': 'circle',
		                'source-arrow-shape': 'circle',
		                'line-color': '#29a329'
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
	            	.css({   'border-color': '#CC1430',
	            	})
	            
	            .selector(':selected')
		            .css({
		            	'background-color': '#61bfff',
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
	            	.css({  'opacity':'0.5'
	            	})
	            .selector("core")
	            	.css({   "active-bg-size": 0 })	
	            	
            ,
	        elements: elements,
	        pan: { x:0, y:0},
	        layout: {
	            name: 'preset',
	            fit: true,
	            roots: '#',
	            padding: 10,
	            nodeOverlap  : 10,
	            nodeRepulsion: 400000,
	            avoidOverlap: true,
	        }
	       
	    });
	    
	    
	    PathCytoscapeUtils.attachNodeClickActions(cy.nodes());
	    
	    cy.on('click', function(event){
	    	
	    	// click on blank
	    	if (!event.cyTarget.length) {
	    		
	    		PathCytoscapeUtils.unselectNodes();
	    		
	    		(new PathLogicalRenderer()).showPathNodeDetails(selectedPathNode.sysProperties.uuid.value);
	    		
	    	}
	    	
	    }); 
	    
	    cy.resize();
	    return cy;
    
    }
    
};

PathCytoscapeUtils.updateNodeEdgeGraph  = function (cy, element) {

	var newElement;
	
	if (cy.$('#' + element.data.id + '').length == 0) {
		if (cy) {
			 if (element.group == 'nodes')    { 
				 newElement = cy.add(element, true);
			 }
		}
	} else {
		if (element.group == 'nodes') {
			cy.$('#' + element.data.id + '').data("color", element.data.color);
			cy.$('#' + element.data.id + '').data("cyDisplay", element.data.cyDisplay);
			cy.$('#' + element.data.id + '').data("decoProperties", element.data.decoProperties);
			cy.$('#' + element.data.id + '').data("properties", element.data.properties);
			cy.$('#' + element.data.id + '').data("type", element.data.type);
		}
	}
	
};

PathCytoscapeUtils.unselectNodes = function () {
	if(pirvCy){
		pirvCy.filter('node').unselect(); 
	}
};

PathCytoscapeUtils.attachNodeClickActions = function (nodes) {
	
	// Handle click events on cytoscape nodes
	nodes.on('click', function(e) {
		
		var thisClick = new Date().getTime();
		pleaseWait = true;
		
		var nodeElement = this.data();
		var nodeType = this.data().type;
		var nUuid = NodeUtils.findUUID(nodeElement);
		var propertyNode= {};
		
		console.log("FOUND THIS UUID : "+ nUuid);
		
		if (nUuid) {
			
	        var contentText = PathCytoscapeUtils.showNodeToolTip(nUuid);  
		    this.qtip({
			        	content: {  title: this.data("cyDisplay"),  text: contentText    },
			            show:    {  event: e.type,                  ready: true          },
			            position:{  target : 'mouse' },
			            style:   {  classes: 'qtip-blue qtip-tipped',
								    tip: {   width: 25,height: 15   }
							     },
			            hide:    {   e: 'mouseout unfocus'  }
				      }, e);	    
			
	    	// getting all edges related to that node
			if (lastClick && ((thisClick - lastClick) < doubleClickThreshold) && lastObj && lastObj == e.cyTarget) {
				
				// Recognize this as an double click event
				console.log("Inside Double clicked on node: " + this.data().type);
				isSingleClick = false;
				(new PathLogicalRenderer()).showNodeDetails(nUuid);

			} else {
				
				// Recognize this as an single click event
				isSingleClick = true;
				// Attempt to trigger single click action
				(new PathLogicalRenderer()).showNodeDetails(nUuid);
						
			}
			
		}
		
	});
	
	console.log("attachNodeClickActions done");
	
};

PathCytoscapeUtils.showNodeToolTip = function (nodeUuid) {
	
	// show the details of Node and Its model default 
	var node = nodeMap[nodeUuid];
	
	var inputs='';
	 inputs += "<table><tr><th>Type:</th><td>"+node.type+"</td></tr>";
	 inputs += "<tr><th>Name:</th><td>"+node.cyDisplay+"</td></tr>";
	 inputs +="<tr><th colspan='2'>--------</th></tr>";
	 inputs += "<tr><th>Model</th><td>";
	 if(node.modelId){ 
		 inputs+=node.modelId;
		 inputs+="</td></tr>";
		 inputs += "<tr><th>PartGroup</th><td>";
		 if(node.partGroup){ inputs+=node.partGroup;}
		 else{ inputs += "default Part "}
		 }
	 else{inputs += "no model associated "}
	 inputs +="</td></tr>";
	 
	 inputs +="</table>";
	 return inputs;
	 
};
