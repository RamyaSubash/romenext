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
				    
		    	}
	    	}
	    	
	    }); 
	    
	    cy.on('click', function(event){
	    	
	    	// click on blank
	    	if (!event.cyTarget.length) {
	    		
	    		DisplayCytoscapeUtils.removeHighlightAndUnhighlight();
	    		
	    		listInstUuids = [];
	    		listEdgeUuids = [];
	    		
	    		cancelNodeConnection();
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
		var propertyNode= {}, nodeType, nUuid;
		// need to retrieve Node info
		nodeType = this.data().type;
		var nodeElement = this.data();
		
		nUuid =  NodeUtils.findUUID(nodeElement);
		
		console.log("FOUND THIS UUID : "+ nUuid);
		if(nUuid){
			 propertyNode = {value : nUuid,
			                 element  : 'node',
			                 type: nodeType,
			                 parent : 'none',                                                                  // not sure if it is needed
			                 nodeDetails : LD_FocussedNode
			                 }
		}
				
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
	    // e.originalEvent.ctrlKey == true 
	    if (document.body.style.cursor == 'crosshair') {
	    	listInstUuids.push(this.data().sysProperties.uuid.value);
	    } else {
	    	listInstUuids = [];
	    	listEdgeUuids = [];
	    	listInstUuids.push(this.data().sysProperties.uuid.value);
	    	cancelNodeConnection();
	    }
	    
	    if (connSelected == null) {
	    	cancelNodeConnection();
	    }
    	if (listInstUuids.length == 1 && listEdgeUuids.length == 0) {
    		if (typeMapViaId[nodeMap[listInstUuids[0]].typeId].classification == "node") {
    			(new DisplayLogicalRenderer()).initConnectionBarInst();
    		}
//    		(new DisplayLogicalRenderer()).initConnectionBarInst();
    	}
		
    	// getting all edges related to that node
		if (lastClick && ((thisClick - lastClick) < doubleClickThreshold) && lastObj && lastObj == e.cyTarget) {
			// Recognize this as an double click event
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
						 $('#console-log').append("<p style='color:red'>Cannot Connect Destination Node to Seleted Node/p>");
						 if($("#grid-instances").css('visibility') == 'hidden'){$("#grid-instances").css({'visibility':'visible'});}
						 $("#nodeForm").empty();
						 $("#nodeForm").append("<p style='color:red'>Cannot Connect Destination Node to Seleted Node</p>");
					}
					
				}
								
//				if(originNode == null){			
//					                    allow = findConnForNode(connSelected, propertyNode, 1);
//										console.log(" clicked on type: " + propertyNode.parent);
//										if(allow) {originNode = propertyNode; allow = false;}
//										else {
//											$('#console-log').append("<p style='color:red'>Rule Selected and Type of origin Node are not linked/p>");
//											$('#console-log').append("<p style='color:red'>Either Changed Origin Node or Cancel the rule/p>");
//											if($("#grid-instances").css('visibility') == 'hidden'){$("#grid-instances").css({'visibility':'visible'});}
//											$("#nodeForm").empty();
//											$("#nodeForm").append("<p style='color:red'>This Node Origin does not match with the Origin Node of the selected Rule; change the selection or cancel the rule</p>");
//										}
//				}else {
//					
//					 allow =  findConnForNode(connSelected, propertyNode, 2);
//					 if(allow) {
//						       destNode = propertyNode;
//						       GlobalUtils.cursor_clear();	
//							   userActions.prevaction = userActions.currentaction ;
//							   userActions.currentaction = 'createEdge';
//							   addEdgeDialog();
//							   connSelected = null;
//							   originNode = null;
//							   destNode = null;
//							   mouseEventTime = null;
//					 }else {
//						 $('#console-log').append("<p style='color:red'>Rule Selected and Type of Destination Node are not linked/p>");
//						 $('#console-log').append("<p style='color:red'>Either Changed Destination Node or Cancel the rule</p>");
//						 if($("#grid-instances").css('visibility') == 'hidden'){$("#grid-instances").css({'visibility':'visible'});}
//						 $("#nodeForm").empty();
//						 $("#nodeForm").append("<p style='color:red'>This Destination Node does not match with the Destination type of the selected Rule;change the selection or cancel the rule </p>");
//					 }
//				}
			
			}					
		}
		
		// Keep a record of the click action
		lastClick = thisClick;
		lastObj = e.cyTarget;
	});
	
	console.log("attachNodeClickActions done");
};
//====================================================================================
function showNodeProperties(selectedNode) {
	
	var myNode = nodeMap[selectedNode.data().sysProperties.uuid.value];
	pleaseWait = true;
	setTimeout(function() {
		pleaseWait = false;
		if (isSingleClick && selectedNode == lastObj) {
			$('#console-log').append("<p>Single click on this Node (showing its properties)"+selectedNode.data().type+"</p>");
							
//					showUpdateNodeProperties( selectedNode.data());
			

			$("#grid-instances").css({'visibility':'visible'});
			
			var Form = document.createElement('div');
			var node = myNode;
			var formHeader = "<form id='nodeShowDialog'>" , inputs = "";
			
			inputs += "<table id='showNode'>";
			
			inputs += "<tr><th><input type='hidden' name='typeName'  value='"+ node.type+"'><input type='hidden' name='type'  value='"+ node.typeId+"'>" + "Type :</th><td> '"+ node.type+"' </td></tr></table>";

			//	var decorators = typeMap[node.type].decorators;
			var decorators = node.decorators;
			var decoList = "";
			decorators.forEach(function(deco){
				var decoName='';
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
			inputs += "<div id='defaultDecoForNode'>Default Decorator:&nbsp;<select name='defaultDecorator' disabled>" + decoList + "</select></div>";
			
			var typeProperties = typeMapViaId[node.typeId].typeProperties;
			
			var nUuid = NodeUtils.findUUID(node);

			var inputProps="", nodeProperties= node.typeProperties;
			if(!$.isEmptyObject(typeProperties) ){

				inputProps += "<table id='nodeProperties'>";
				inputProps += "<tr><th colspan='3' style='background-color: grey'> Properties:</th><tr>";
				inputProps +="<tr><th>Name</th><th>Value</th</tr> ";
				
				$.each(typeProperties, function( key, typeProperty ) {
					//var isNew = true;
					var pName = typeProperty.name;
					var pId   = typeProperty.id;
					var pType = typeProperty.propertyType;
					var mandatory = typeProperty.isMandatory;
					var pValue, textcolor='black';
					
					$.each(nodeProperties, function( keynode, nodeProperty ) {
					    if(pId == nodeProperty.id) {			    
					    	pValue = nodeProperty.value;
					    }
					});
					inputProps += "<tr id='props'><th>";
					if(mandatory){textcolor="red";}
					inputProps += "<input type='text' style='color:"+textcolor+"' size='6' name='propertyName' value='" + typeProperty.name + "' disabled></th>";
					
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
						if(pValue == null || pValue == undefined) {
							inputProps += "<td ><input  style='background-color:yellow' size='8'  type='text' name='newValue' value='' disabled>";}
						else {inputProps += "<td><input type='text' size='8' name='newValue' value='" + pValue + "' disabled>";}
						
					}
								
					inputProps += "</td></tr>";
				});
				inputProps += "</table>";
			}
			
			var formFooter = "</table>";
			
			formFooter += "<input type='button' value='Update Node'  class='btn btn-primary btn-sm'  onclick='showUpdateNodePropertiesByUuid(\"" + nUuid + "\");' />";
		    formFooter += "<input type='button' value='Cancel'  class='btn btn-primary btn-sm'  onclick='(new DisplayLogicalRenderer()).cancelInstForm();' />";

			Form.innerHTML = message + formHeader + inputs + inputProps + formFooter;
			(new DisplayLogicalRenderer()).emptyAllInst();
			$('#nodeForm').append(Form);
					
					NodeSelected = NodeUtils.findUUID(selectedNode.data());
					
					LD_FocussedNode = nodeMap[NodeSelected];
					LD_FocussedNode.uuid = NodeSelected;
					ShowFocussedNode(LD_FocussedNode);
//			 retrieveNodeProperties(selectedNode);				
			console.log("inside shownode property: " + selectedNode.data().type);
		}
	}, doubleClickThreshold + 10);
};
//===============================================================================================

function showUpdateNodePropertiesByUuid(uuid) {
	
	var node = nodeMap[uuid];
	
	if (node) {
		listDates = [];
		showUpdateNodeProperties(node);
	}
	
};

function showUpdateNodeProperties(detailsNode) {
	
	(new DisplayLogicalRenderer()).cancelInstForm();
	
	$("#grid-instances").css({'visibility':'visible'});
	
	var Form = document.createElement('div');
	var node = detailsNode;
	var formHeader = "<form id='nodeUpdateDialog'>" , inputs = "";
	
	inputs += "<table id='updateNode'>";
	
//	inputs += "<tr><th><input type='hidden' name='typeName'  value='"+ node.type+"'><input type='hidden' name='type'  value='"+ typeMap[node.type].id+"'>" + "Type :</th><td> '"+ node.type+"' </td></tr></table>";
	inputs += "<tr><th><input type='hidden' name='typeName'  value='"+ node.type+"'><input type='hidden' name='type'  value='"+ node.typeId+"'>" + "Type :</th><td> '"+ node.type+"' </td></tr></table>";

	//	var decorators = typeMap[node.type].decorators;
	var decorators = node.decorators;
	var decoList = "";
	decorators.forEach(function(deco){
		var decoName='';
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
	inputs += "<div id='defaultDecoForNode'>Default Decorator:&nbsp;<select name='defaultDecorator'>" + decoList + "</select></div>";
	
	
//	var typeProperties = typeMap[node.type].typeProperties;
	
	var typeProperties = typeMapViaId[node.typeId].typeProperties;
	
	var nUuid = NodeUtils.findUUID(node);

	var inputProps="", nodeProperties= node.typeProperties;
	if(!$.isEmptyObject(typeProperties) ){
	

		inputProps += "<table id='nodeProperties'>";
		inputProps += "<tr><th colspan='3' style='background-color: grey'> Properties:</th><tr>";
		inputProps +="<tr><th>Name</th><th style='display:none;'>Type</th><th>Value</th</tr> ";
		inputProps +="<tr id='props'><td><input type='hidden' name='propertyName' value='uuid'></td><td><input type='hidden'name='value' value='"+nUuid+"'></td><td><input type='hidden'name='propertyType' value='STRING'></td></tr>"

			
		$.each(typeProperties, function( key, typeProperty ) {
			//var isNew = true;
			var pName = typeProperty.name;
			var pId   = typeProperty.id;
			var pType = typeProperty.propertyType;
			var mandatory = typeProperty.isMandatory;
			var pValue, textcolor='black';
			
			$.each(nodeProperties, function( keynode, nodeProperty ) {
			    if(pId == nodeProperty.id) {			    
			    	pValue = nodeProperty.value;
			    }
			});
			inputProps += "<tr id='props'><th>";
			if(mandatory){textcolor="red";}
			inputProps += "<input type='hidden' name='propertyId' value='" + typeProperty.id + "'><input type='text' style='color:"+textcolor+"' size='6' name='propertyName' value='" + typeProperty.name + "' disabled></th>";
			inputProps += "<td style='display:none;'><input type='text' size='8' name='propertyType' value='" + pType + "' disabled></td>";
			
			if (pType === "FILE") {
				var mediaType = NodeUtils.convertNodeFilePropertyValueMediaType(pValue);
				
				// file for new
				if (!pValue) {
					inputProps += '<td><input type="file" name ="newValue" value="" onchange="GlobalUtils.showFile(event, \'' + typeProperty.id + '\')" style="background-color:yellow"/>'
							   + '<a id="show_image_file_output_' + typeProperty.id + '" target="_blank" href="" class="imgthumb" style="display:none;"><img id="image_file_output_' + typeProperty.id + '" height="50" width="50" style="display:none;"></a>'
							   + '<a id="other_file_output_' + typeProperty.id + '" style="display:none;"></a>';
				} else {
					inputProps += '<td><input type="file" name ="newValue" value="'+ NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) +'" onchange="GlobalUtils.showFile(event, \'' + typeProperty.id + '\')"/>';
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
				
				if(pValue == null || pValue == undefined) {
					inputProps += "<td><form><input type='radio' name='newValue' value='true'>true   <input type='radio' name='newValue' value='false'>false</form>";
				} else {
					inputProps += "<td><form><input id='id_for_boolean_property_" + typeProperty.id + "_true' type='radio' name='newValue' value='true' onclick='GlobalHTMLUtils.recheckRadioButtons(\"id_for_boolean_property_" + typeProperty.id + "_true\", \"id_for_boolean_property_" + typeProperty.id + "_false\");'";
				    if (pValue == true) { inputProps += " checked";};   inputProps += ">true   ";
				    inputProps += "<input id='id_for_boolean_property_" + typeProperty.id + "_false' type='radio' name='newValue' value='false' onclick='GlobalHTMLUtils.recheckRadioButtons(\"id_for_boolean_property_" + typeProperty.id + "_false\", \"id_for_boolean_property_" + typeProperty.id + "_true\");'";
				    if (pValue == false) { inputProps += " checked";};  inputProps += ">false</form>";
				}
				
				inputProps += "<input type='hidden' name='value' value='" + pValue + "'>";
			} else if (pType === "DATE"){
				if(!pValue ){
				   inputProps += "<td><input title='" + pType + "'  size='8' type='text' style ='position: relative; z-index: 100000; background-color: yellow;' name='newValue' value='' id= '"+typeProperty.id+"'/>";
				}else {
					inputProps += "<td><input title='" + pType + "' type='text' style ='position: relative; z-index: 100000;' size='8' name='newValue' value='" + pValue + "' id= '"+typeProperty.id+"'   >";
				}   
				listDates.push(typeProperty.id);
				inputProps += "<input type='hidden' name='value' value='" + pValue + "'>";	
			} else if (pType === "INTEGER") {
				if(!pValue) {
					inputProps += "<td ><input  title='" + pType + "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' onkeypress='return event.charCode >= 48 && event.charCode <= 57'>";}
				else {inputProps += "<td><input title='" + pType + "' type='text' size='8' name='newValue' value='" + pValue + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57'>";}
				inputProps += "<input type='hidden' name='value' value='" + pValue + "'>";	
			} else if (pType === "DOUBLE" || pType === "CURRENCY") {
				if(!pValue) {
					inputProps += "<td ><input  title='" + pType + "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'>";}
				else {inputProps += "<td><input title='" + pType + "' type='text' size='8' name='newValue' value='" + pValue + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'>";}
				inputProps += "<input type='hidden' name='value' value='" + pValue + "'>";	
			} else {
				if(!pValue) {
					inputProps += "<td ><input  title='" + pType + "' style='background-color:yellow' size='8'  type='text' name='newValue' value=''>";}
				else {inputProps += "<td><input title='" + pType + "' type='text' size='8' name='newValue' value='" + pValue + "'>";}
				inputProps += "<input type='hidden' name='value' value='" + pValue + "'>";	
			}
						
			inputProps += "</td></tr>";
		});
		inputProps += "</table>";
	}
	
	var formFooter = "</table>";
	
	formFooter += "<input type='button' value='Update Node'  class='btn btn-primary btn-sm'  onclick='saveUpdateNodeDialog(form)' />";
    formFooter += "<input type='button' value='Cancel'  class='btn btn-primary btn-sm'  onclick='(new DisplayLogicalRenderer()).cancelUpdateNodeForm(\"" + nUuid + "\");' />";
    userActions.prevaction = userActions.currentaction ;
	userActions.currentaction = 'updateNode';
	

	Form.innerHTML = message + formHeader + inputs + inputProps + formFooter;
	(new DisplayLogicalRenderer()).emptyAllInst();
	$('#nodeForm').append(Form);
	
	DisplayInterfaceUtils.addDatePicker ('');
		
}



function attachEdgeClickActions(edges) {
	// Handle click events on cytoscape nodes
	edges.on('click', function(e) {
		var thisClick = new Date().getTime();
		pleaseWait = true;
		
		var edge = e.cyTarget;		
		var simpleEdge = {};		
		var uuid = NodeUtils.findUUID(this.data());		
		var originNodeName = this.source().data("cyDisplay");		
		var destinationNodeName = this.target().data("cyDisplay");		
		var edgeName = "Edge between " + originNodeName + " and " + destinationNodeName;		
		simpleEdge.uuid = uuid;		
		simpleEdge.originNodeName = originNodeName;		
		simpleEdge.destinationNodeName = destinationNodeName;		
		var contentText = (new DisplayLogicalRenderer()).showEdgeToolTip(simpleEdge);  		
		        		
		edge.qtip({		
			content: {title: edgeName, text: contentText},		
		    show: {event: e.type, ready: true},		
		    position: {target: 'mouse'},		
		    style: {classes: 'qtip-blue qtip-tipped', tip: {width: 25, height: 15}},		
		    hide: {e: 'mouseout unfocus'}		
		}, e);	
		
	    if (e.originalEvent.ctrlKey == true) {
	    	listEdgeUuids.push(this.data().sysProperties.uuid.value);
	    } else {
	    	listInstUuids = [];
	    	listEdgeUuids = [];
	    	listEdgeUuids.push(this.data().sysProperties.uuid.value);
	    }
	    
	    cancelNodeConnection();
		
		if (lastClick && ((thisClick - lastClick) < doubleClickThreshold) && lastObj && lastObj == e.cyTarget) {
			// Recongnise this as an double click event
			console.log("Double clicked on edge: " + this.data().name);
			isSingleClick = false;
		}
		else {
			isSingleClick = true;
			// Attempt to trigger single click action
			pleaseWait = true;
			setTimeout(function() {
				pleaseWait = false;
				if (isSingleClick && edge == lastObj) {
					$('#console-log').append("<p>Single click on this Edge (showing its properties)"+edge.data().name+"</p>");
					(new DisplayLogicalRenderer()).showEdgeDetails(uuid);
					console.log("Inside ShowEdge property: " + edge.data().name);
				}
			}, doubleClickThreshold + 10);
//			showEdgeProperties(this);
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

function canBeConnected (selectedConnectionId, startNodeUuid, endNodeUuid) {
	
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
		result =  false;
	}
	
	return result;

}

function toggleElementNameDisplay (cy, iconId, eleType, state) {
	
	if (state == 'show') {
		if (irvCy && eleType == "node") {
			changeElementName(cy, eleType, 'data(cyDisplay)')
		} else {
			changeElementName(cy, eleType, 'data(name)')
		}
//		changeElementName(cy, eleType, 'data(name)')
		state = 'hide';
		document.getElementById(iconId).value = 'hide';
	} else if (state == 'hide') {
		changeElementName(cy, eleType, '')
		state = 'show';
		document.getElementById(iconId).value = 'show';
	} else {
		console.log('Wrong State: ' + state);
	}

};

function toggleElementDisplay(iconId, elements, state) {
	
	if (state == 'show') {
		for (var key in elements) {
			elements[key].style('display', "element");
		}
		state = 'hide';
		document.getElementById(iconId).value = 'hide';
	} else if (state == 'hide') {
		for (var key in elements) {
			elements[key].style('display', "none");
		}
		state = 'show';
		document.getElementById(iconId).value = 'show';
	} else {
		console.log('Wrong State: ' + state);
	}

};
