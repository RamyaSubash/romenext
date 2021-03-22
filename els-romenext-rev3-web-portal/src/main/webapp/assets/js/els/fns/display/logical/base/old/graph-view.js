/*
 * Desc:	Event handlers/functions for Graph
 * Author:	Baya Benrachi
 * Date:	15 May  2016
 * Update:  17 June   2016
*/

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                 BELOW CODE NEEDED For OLD VERSION
//==========================================================================
// format SINGLE newly created node 
//function formatSingleNode (jsonData) {          // old name formatSingleResponse
//	var element,props, display, name;
//	    // what to display as a name for the node -- look into the properties for name first or other attr if none display the type in ()
//	    var props = jsonData.properties;
//	    var display = $.grep(props, function(i, prop) {
//	    	 if(i.name == 'name') {
//	    		 					name = i.value;
//	    		 					return name
//	    		 					}
//	     })
//	     // display the name if exits or type of node 
//	     if (name ) { jsonData.cyDisplay = name}
//	     else {jsonData.cyDisplay ='' + '(' + jsonData.type + ')' ;}
//	    // associate the same color as the type to the node
//		jsonData.color = typeMap[jsonData.type].color;
//		// getting the coords
//		var new_x = getCoordinate(jsonData.decoProperties, 'x');
//		var new_y = getCoordinate(jsonData.decoProperties, 'y');	
//		
//		// format node for cytoscape
//		element = {
//			group: 'nodes',
//			data: jsonData,
//			renderedPosition: {x: new_x, y: new_y}
//		};
//		props.forEach(function(prop) {
//			     if(prop.name=="uuid"){  uuid = prop.value }
//		});  
//		// add the node to the nodeMap list ===========
//		if (!nodeMap[uuid]) {
//			nodeMap[uuid]= jsonData;
//		}else {
//			nodeMap[uuid]=jsonData;
//		}
//    console.log("added this element"+element);
//	return element;
//};

//=====================================================
//function formatSingleEdge (jsonData) {
//	var element, Props, uuid;
//	jsonData.cyDisplay= '';
//	// jsonData is an edge == format it for the graph
//	element = {
//		group: 'edges',
//		data:{
//			id: 'edge' + jsonData.id,
//			source: jsonData.originId.toString(),
//			target: jsonData.destinationId.toString(),
//			name: jsonData.type,
//			origin: jsonData.origin,
//			destination: jsonData.destination,
//			properties: jsonData.properties,
//			decoProperties: jsonData.decoProperties,
//			classification: jsonData.classification
//		}
//	};	
//	// add the edge to the edgeMap list
//	Props = jsonData.properties;
//	Props.forEach(function(prop) {
//	     if(prop.name=="uuid"){  uuid = prop.value }
//	});  
//	if (!edgeMap[uuid]) {
//		edgeMap[uuid]= jsonData;
//	}
//	return element;
//};

//================= Format loaded nodes and edges for an instance ====
//===================================================================
//function formatNodesResponse(jsonData) {                 // main assumption is that there is always at least one property == uuid
//	var elements = []; nodeMap = {}; edgeMap = {}
//    // Start the format for Nodes
//	$.each(jsonData.nodes, function(key, value2){
//		var uuid, Props, display; var name='';
//		// finding if the node has a name to display it
//		Props = value2.properties;
//			display = $.grep(Props, function(i,item) {
//		    	 if(i.name == 'name') { name = i.value;
//		    		    return name}
//		});
//		// if not found display the type
//		 if(name ) { value2.cyDisplay = name}
//			    else {value2.cyDisplay ='' + '(' + value2.type + ')' ;}	
//		 // getting the color of the type
//		 value2.color = typeMap[value2.type].color;
//		 
//		// getting the coords
//		var new_x = getCoordinate(value2.decoProperties, 'x');
//		var new_y = getCoordinate(value2.decoProperties, 'y');	
//		 
//		var element = {
//				group: 'nodes',
//				data : value2,
//				renderedPosition: {x: new_x, y: new_y}
//				};
//		elements.push(element);
//		
//		// Retrieve the uuid value 
//		Props.forEach(function(prop) {
//			     if(prop.name=="uuid"){  uuid = prop.value }
//		});  
//		// update the nodeMap list  // May be we should change this with every call to API
//		if (!nodeMap[uuid]) {
//			nodeMap[uuid]= value2;
//		}
//		
//		
//	});
//  console.log(elements);
//   // start the format for edges 
//	$.each(jsonData.edges, function(key, value){
//		var uuid, Props;
//		value.cyDisplay = '';
//		var element = {
//				group: 'edges',
//				data : {
//					id: 'edge' + value.id,
//					source: value.originId.toString(),
//					target: value.destinationId.toString(),
//					name: value.type,
//					origin: value.origin,
//					destination: value.destination,
//					properties: value.properties,
//					decoProperties: value.decoProperties,
//					classification: value.classification
//				}
//			};
//		// section adding the edge to the edgeMap list
//		Props = value.properties;
//		Props.forEach(function(prop) {
//		     if(prop.name=="uuid"){  uuid = prop.value }
//		});  
//		if (!edgeMap[uuid]) {
//			edgeMap[uuid]= value;
//		}
//	//	edgeMap[uuid]= value;
//		elements.push(element);
//	});
//	return elements;
//}
//=========================================================================================
function formatUpdateNodesResponse(jsonData) {                 // main assumption is that there is always at least one property == uuid
	var elements = []; // nodeMap = {}; edgeMap = {}
    // Start the format for Nodes
	$.each(jsonData.nodes, function(key, value2){
		
		var uuid, Props, display; var name='';
		// Retrieve the uuid value 
		Props = value2.properties;
		// finding if the node has a name to display it
		display = $.grep(Props, function(i,item) {
	    	 if(i.name == 'name') { name = i.value;    return name}
	    });
		Props.forEach(function(prop) {
			     if(prop.name=="uuid"){  uuid = prop.value }
		});  
//		if (isLoadingChildNodes == true && uuid != NodeSelected) {
//			childNodes.push(uuid);
//		}
		if (!nodeMap[uuid]) {
			     
				// if not found display the type
				 if(name ) { value2.cyDisplay = name}
					    else {value2.cyDisplay ='' + '(' + value2.type + ')' ;}	
				 // getting the color of the type
				 value2.color = typeMap[value2.type].color;	
				 
				// getting the coords
				var new_x = (new DisplayLogicalRenderer()).getCoordinate(value2.decoProperties, 'x');
				var new_y = (new DisplayLogicalRenderer()).getCoordinate(value2.decoProperties, 'y');	
				
				var element = {
						group: 'nodes',
						data : value2,
						renderedPosition: {x: new_x, y: new_y}
						};
				elements.push(element);
				nodeMap[uuid]= value2;
		}else {
			// grasp thye node position in irvCy
			var new_x = irvCy.$('').position('x');
			var new_y = irvCy.$('').position('y');	
			
		}
		
	});
  console.log(elements);
   // start the format for edges 
	$.each(jsonData.edges, function(key, value){
		var uuid, Props;
		value.cyDisplay = '';
		var element = {
				group: 'edges',
				data : {
					id: 'edge' + value.id,
					source: value.originId.toString(),
					target: value.destinationId.toString(),
					name: value.type,
					origin: value.origin,
					destination: value.destination,
					properties: value.properties,
					decoProperties: value.decoProperties,
					classification: value.classification
				}
			};
		// section adding the edge to the edgeMap list
		Props = value.properties;
		Props.forEach(function(prop) {
		     if(prop.name=="uuid"){  uuid = prop.value }
		});  

		edgeMap[uuid]= value;
		elements.push(element);
	});
	return elements;
}
function formatNodeEdgeGraph(cy) {

	if (cy.nodes() == null || cy.nodes().length < 1 || cy.edges() == null || cy.edges().length < 1) {
		return;
	}
	
	for (var i = 0; i < cy.edges().length; i++) {	
		var relativeX = null;
		var relativeY = null;
		var props = cy.edges()[i].data().decoProperties;
		for (var j = 0; j < props.length; j++) {
			 if(props[j].name=="x"){  relativeX = props[j].value }
			 if(props[j].name=="y"){  relativeY = props[j].value }
		}
		
		if (relativeX != null && relativeY != null) {
			cy.edges()[i].target().position().x = cy.edges()[i].source().position().x + Number(relativeX);
			cy.edges()[i].target().position().y = cy.edges()[i].source().position().y + Number(relativeY);
		}	
	}	
}

//==================================================================================
function initNodeEdgeGraph(cy, containerId, elements) {	
	// Clear cytoscape object if already initialised
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
	    
	    attachNodeClickActions(cy.nodes());
	    attachEdgeClickActions(cy.edges());
	    
	    cy.on('cxttap', function(event){
	    	var node = event.cyTarget;
	    	if(node.data){
	    		var sourceName = node.data("cyDisplay");
		    	console.log(" right clicked on "+sourceName );
		    	console.log(" Position X : "+event.cyPosition.x + " Position Y : "+event.cyPosition.y );
		    	console.log(" renderedPosition X : "+event.cyRenderedPosition.x + " renderedPosition Y : "+event.cyRenderedPosition.y );
	    	}else {
	    		console.log(" Position X : "+event.cyPosition.x + " Position Y : "+event.cyPosition.y );
	    		console.log(" renderedPosition X : "+event.cyRenderedPosition.x + " renderedPosition Y : "+event.cyRenderedPosition.y );
	    	}
	    	
	    })
	    //   when the mouse is over the node, all others nodes are set to semitransp and the node under the mouse with its own children is 
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
	    
	    cy.on('tap', function(event){
	    	console.log(" Inside on cy.on tap")
	    	if (topLevelTab == "instRelViewTab"  && selecteddecorator == 'Logical'){
		    	var evtTarget = event.cyTarget;
		    	if( evtTarget === cy   && evtTarget != event.ctrlKey && ! event.shiftKey){
		    		console.log('Unselect Node & empty Info section');
		    		$('#console-log').append("<p style='color:blue'>Unselect Node & empty Instance section</p>");
		    		removeHighlightNode();
//		    		nametype = null; 
//		    		nameconn = null;
//		    		curType= null;     
		    		loadInstNode = false;
				    loadInst = false;  
				    if(prevDrilldown){
				    	ShowFocussedNode(prevDrilldown);
				    	LD_FocussedNode = prevDrilldown;
				    	retrieveBar(nodeMap);
				    }else {
				    	 unsetFocus(NodeSelected);
				    	 retrieveBar(null);
				    }
				    
//				    If there was a drilldown we should keep something about the node.
				   
		    	}
	    	}
	    	
	    }); 

  
	    cy.resize();
	    return cy;
    }
    
}
function removeHighlightNode(){
	if(NodeSelected != null ) {
		if(!irvCy){
		irvCy.filter('node[name="' + nodeMap[NodeSelected].cyDisplay + '"]').unselect(); }

		}  
	
}


//======================================================================================
function showNodeToolTip(NodeUid){
	// show the details of Node and Its model default 
	var node = nodeMap[NodeUid];
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
	 
//	 inputs += "<tr><td><input type='button' value='Set Focus' onclick=\"setFocus('"+NodeUid+"')\"/></td>";
//	 inputs += "<td><input type='button' value='unSet Focus' onclick=\"unsetFocus('"+NodeUid+"')\"/></td></tr>";
	
	 inputs +="</table>";
	 return inputs;
};
function unsetFocus(node){
	if(node){
	   LD_FocussedNode = null;
	   NodeSelected = null;
	   if(document.getElementById('drilldown')){document.getElementById('drilldown').innerHTML='';}
       userActions.prevaction = userActions.currentaction;
       userActions.currentaction = '';
       userActions.param ='';
	}
		
		
}
function setFocus(nodeUuid){
	if(nodeUuid){
		LD_FocussedNode = nodeUuid;
		ShowFocussedNode(LD_FocussedNode);
	}
}




//=============================================================================================
function attachNodeClickActions(nodes) {
	// Handle click events on cytoscape nodes
	nodes.on('click', function(e) {
		
		var thisClick = new Date().getTime();
		pleaseWait = true;
		var propertyNode= {}, nodeType;
		// need to retrieve Node info
		nodeType = this.data().type;
		$.each(this.data(), function(key, value) {
			if (key == "properties") {
				value.forEach(function(property){
					 if(property.name == 'uuid') {
						 propertyNode = {value : property.value,
						                 element  : 'node',
						                 type: nodeType,
						                 parent : 'none',                                                                  // not sure if it is needed
						                 nodeDetails : LD_FocussedNode
						                 }
					 }
				});
			}
		});
        var contentText = showNodeToolTip(propertyNode.value);  
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
			// Recongnise this as an double click event
			console.log("Inside Double clicked on node: " + this.data().type);
			isSingleClick = false;
			showNodeProperties(this);
//			Make the node Focussed Node 
			LD_FocussedNode= propertyNode;		
			loadInstanceRelatedNodes_Edges(propertyNode.value);
			(new DisplayLogicalRenderer()).loadTypeInstBar(nodeMap);
		}
		else {
			if(connSelected == null) {   // no Rule(connection) selected ==== no Edge creation 
											isSingleClick = true;
											// Attempt to trigger single click action
									     	showNodeProperties(this);
				
			} else {  // User want to create an Edge 
				
				var allow = false;
				console.log(" rule selected is : "+ connSelected.id);
				if(originNode == null){			
					                    allow = findConnForNode(connSelected, propertyNode, 1);
										console.log(" clicked on type: " + propertyNode.parent);
										if(allow) {originNode = propertyNode; allow = false;}
										else {
											$('#console-log').append("<p style='color:red'>Rule Selected and Type of origin Node are not linked/p>");
											$('#console-log').append("<p style='color:red'>Either Changed Origin Node or Cancel the rule/p>");
											if($("#grid-instances").css('visibility') == 'hidden'){$("#grid-instances").css({'visibility':'visible'});}
											$("#nodeForm").empty();
											$("#nodeForm").append("<p style='color:red'>This Node Origin does not match with the Origin Node of the selected Rule; change the selection or cancel the rule</p>");
										}
				}else {
					
					 allow =  findConnForNode(connSelected, propertyNode, 2);
					 if(allow) {
						       destNode = propertyNode;
						       GlobalUtils.cursor_clear();	
							   userActions.prevaction = userActions.currentaction ;
							   userActions.currentaction = 'createEdge';
							   addEdgeDialog();
							   connSelected = null;
							   originNode = null;
							   destNode = null;
							   mouseEventTime = null;
					 }else {
						 $('#console-log').append("<p style='color:red'>Rule Selected and Type of Destination Node are not linked/p>");
						 $('#console-log').append("<p style='color:red'>Either Changed Destination Node or Cancel the rule</p>");
						 if($("#grid-instances").css('visibility') == 'hidden'){$("#grid-instances").css({'visibility':'visible'});}
						 $("#nodeForm").empty();
						 $("#nodeForm").append("<p style='color:red'>This Destination Node does not match with the Destination type of the selected Rule;change the selection or cancel the rule </p>");
					 }
				}
			}					
		}
		
		// Keep a record of the click action
		lastClick = thisClick;
		lastObj = e.cyTarget;
	});
	
	console.log("attachNodeClickActions done");
};
//====================================================================================
function showNodeProperties(node) {
	pleaseWait = true;
	setTimeout(function() {
		pleaseWait = false;
		if (isSingleClick && node == lastObj) {
			$('#console-log').append("<p>Single click on this Node (showing its properties)"+node.data().type+"</p>");
			 retrieveNodeProperties(node);				
			console.log("inside shownode property: " + node.data().type);
		}
	}, doubleClickThreshold + 10);
};
//===============================================================================================
function attachEdgeClickActions(edges) {
	// Handle click events on cytoscape nodes
	edges.on('click', function(e) {
		var thisClick = new Date().getTime();
		pleaseWait = true;
		
		if (lastClick && ((thisClick - lastClick) < doubleClickThreshold) && lastObj && lastObj == e.cyTarget) {
			// Recongnise this as an double click event
			console.log("Double clicked on edge: " + this.data().name);
			isSingleClick = false;
		}
		else {
			isSingleClick = true;
			// Attempt to trigger single click action
			showEdgeProperties(this);
		}
		
		// Keep a record of the click action
		lastClick = thisClick;
		lastObj = e.cyTarget;
	});
	
	console.log("attachEdgeClickActions done");
};

//====================================================================================
function showEdgeProperties(edge) {
	// showProperties(e.cyTarget);
	pleaseWait = true;
	setTimeout(function() {
		pleaseWait = false;
		if (isSingleClick && edge == lastObj) {
			$('#console-log').append("<p>Single click on this Edge (showing its properties)"+edge.data().name+"</p>");
			retrieveEdgeProperties(edge);
			console.log("Inside ShowEdge property: " + edge.data().name);
		}
	}, doubleClickThreshold + 10);
};








//====================== Edited 07-11-2016======================================
function  findConnForNode(connSelected, Node, nb){
	var  connS, result=false;;
	$.each(connMapViaId, function(key, value){
		if(value.rule == connSelected.name)  {connS = key; }
//		if(value.id == connSelected.id)  {connS = key; }
	});
	console.log("found this connection "+ connS);
	 if(connS){		 
		 if (connMapViaId[connS].classification == 'link') {
				if(nb== 1){
					 if(connMapViaId[connS].origin == Node.type || connMapViaId[connS].destination == Node.type) { result = true;}
				}else {
					if(nb == 2 ){
						 if((connMapViaId[connS].destination == Node.type && connMapViaId[connS].origin == originNode.type) || (connMapViaId[connS].origin == Node.type && connMapViaId[connS].destination == originNode.type)) { result = true;}
					}else {
						console.log("unknow type of node"); result = false;
					}
				}  
		 } else {
				if(nb== 1){
					 if(connMapViaId[connS].origin == Node.type) { result = true;}
				}else {
					if(nb == 2 ){
						 if(connMapViaId[connS].destination == Node.type) { result = true;}
					}else {
						console.log("unknow type of node"); result = false;
					}
				}
		 }
	 }else {
		 console.log(" connection not found"); result =  false;
	 }
	 return result;
	
}

//================================================================================
//                   UTILITIES 
//===============================================================================
//function emptyAllInst(){
//	$('#nodeForm').empty();
//}



