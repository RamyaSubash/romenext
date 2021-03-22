/**
 * Desc:	Event handlers/functions for TYPE Graph
 * Author:	Baya Benrachi
 * Date:	15 May  2016
 * Update:  20 May   2016
 */

////==========================       Format the Elements for the Type Graph =================
//function formatTypesAndConnections(jsonData) {
//	var elements = [];
////	console.log("update type = " + JSON.stringify(jsonData));
//	//=== preparing Type elements for graph
//	$.each(jsonData.types, function(key, value){
//		value.cyDisplay = value.name;
//		value.color  = TYPES_COLOR[colorIndex];
//		colorIndex ++;
//		
//		var new_x = (new DesignLogicalRenderer()).getCoordinate(value.decoProperties, 'x');
//		var new_y = (new DesignLogicalRenderer()).getCoordinate(value.decoProperties, 'y');
//	    console.log("creating a Type at : x = "+ new_x + " and y = "+new_y);	
//		var element = {
//				group: 'nodes',
//				data : value,
//				position: {x: new_x, y: new_y}
//		};
//		
//		elements.push(element);
//		//== Initialising "typeMap" for types ==========
//		if (!typeMap[value.name]) {
//			typeMap[value.name] = value;
//			typeMapViaId[ value.id ] = value;
//		}
//	});
//    // ===  preparing Rules for graph 
//	retrieveConnections(jsonData.connections);
//	$.each(jsonData.connections, function(key, value){
//		value.cyDisplay = '';
//		var element = {
//				group: 'edges',
//				data : {
//					id: 'connection' + value.id,
//					source: value.originId.toString(),
//					target: value.destinationId.toString(),
//					name: value.name,
//					rule: value.type,
//					classification : value.classification,
//			//		romeClass: value.romeClass,
//					origin: value.origin,
//					destination: value.destination,
//					minRel: value.minRel.toString(),
//					maxRel: value.maxRel.toString()
//				}
//			};
//		elements.push(element);
//	});
//	
//	return elements;
//	
//};
//===========================================================================
/**
 * This method looks like it retrieves the connects and updates the connMap 
 * 
 * It's a pretty garbage name tbh. Also, this needs to be moved to the ConnectionUtils class.
 * 
 * - updated to also update the connMapViaId
 * 
 * TODO: move this to ConnectionUtils
 * jplee Jan2017
 */
//function retrieveConnections(connections){
//	connMap = {};
//	connMapViaId = {};
//	
//	var connBase={};
//	
//	$.each(connections, function(key, value){
//		
//		connBase = GlobalUtils.createInternalConnMap( value );
//
////		  connBase = {
////				  name : value.name,
////				  id   : value.id,
////				  origin : value.origin,
////				  destination: value.destination,
////				  source: value.originId,
////				  target: value.destinationId,
////				  minRel: value.minRel.toString(),
////				  maxRel: value.maxRel.toString(),
////				  rule  : value.type,
////				  properties: value.properties,
////				  nb    : 1,
////				  classification : value.classification
////		  }
//		  if (!connMap[value.name]) {
//			  connMap[value.name]= connBase;
//			  connMapViaId[value.id] = connBase;
//			  connBase = {};
//		  } else { 
//			  connMap[value.name].nb += 1; 
//			  connMapViaId[value.id].nb += 1;
//		  }
//		 
//	});
//	console.log( connMap);
//	
//}


//=============================================================================
//function initTypeConnGraph(cy, containerId, elements) {	
//	// Clear cytoscape object if already initialised
//	if (cy) {
//      cy.remove(cy.elements());
//	}
//      
//  if (elements.length != 0) {
//	    cy = cytoscape({
//	        container: document.getElementById(containerId),
//	        ready: function () {
//	            console.log('ready')
//	        },
//	        showOverlay: false,
//	        zoom: 2,
//	        minZoom: 0.1,
//	        maxZoom: 10,
//	        zoomingEnabled: true,
//	        style: cytoscape.stylesheet()
//	            .selector('node')
//		            .css({
//		            	'content': 'data(name)',
//		            	'background-color': 'data(color)',
////		            	'text-valign': 'center',
//		            	'text-outline-color': 'data(color)',    // was     '#ccc'
//		                'text-outline-width': 2,
//		                'border-color': '#AABFB8',
//		                'border-width': '2px',
//		                'width': '30px',
//		                'height': '30px',
//		                'font-size': '11px',
//		                'font-weight': 'bold',
//		                'color': '#337AB7',                     
//		                'overlay-opacity': 100,
//		            })             
//	            .selector('edge')
//		            .css({
//		                'curve-style': 'bezier',
//		                'content': 'data(name)',
//		                'font-size': '10px',
//		                'line-style': 'dotted',
//		                'overlay-color': '#c0c0c0',
//		                'overlay-padding': '20px',
//		                'overlay-opacity': 100,
//		                'edge-text-rotation': 'autorotate'	               
//		            })
//
//	            .selector('edge[classification = "parentchild"]')
//		            .css({
//		            	'target-arrow-shape': 'triangle',
//		                'source-arrow-shape': 'circle',
//		                'line-color': '#2283c5', 
//		                'text-outline-color':'#2283c5'
//		            })
//	            .selector('edge[classification = "link"]')
//		            .css({
//		            	'target-arrow-shape': 'circle',
//		                'source-arrow-shape': 'circle',
//		                'line-color': '#29a329',
//		            })
//
//		        .selector('node.highlight')
//			        .css ({
//			                'border-color': '#000',
//			                'border-width': '2px'
//			            })
//			    .selector('edge.highlight')
//			        .css ({
//			        		'mid-target-arrow-color': '#000'
//			            })
//		            
//	            .selector('.highlighted')
//		            .css({
//		            	'background-color': '#61bffc',
//		                'line-color': '#ffa31a',
//		                'target-arrow-color': '#ffa31a',
//		                'transition-property': 'background-color, line-color, target-arrow-color',
//		                'transition-duration': '0.5s'
//		            })
//	            .selector('node:selected')
//	               .css({  	'border-color': '#CC1430' 
//	            	   })
//	            .selector(':selected')
//		            .css({
//		            	'background-color': '#61bffc',
//		                'line-color': '#CC1430',
//		                'source-arrow-color': '#CC1430',
//		                'target-arrow-color': '#CC1430',
//		                'transition-property': 'background-color, line-color,source-arrow-color, target-arrow-color',
//		                'transition-duration': '0.5s'
//		            })	  
//	             .selector('node.semitransp')
//	            	.css({
//	            		'opacity':'0.5'
//	            	})
//	            .selector('edge.semitransp')
//	            	.css({  
//	            		'opacity':'0.5'
//	            	})
//	            .selector("core")
//		            .css({  "active-bg-size": 0 
//		            	})
//          ,
//	        elements: elements,
//	        layout: {
//	            name: 'preset',
//	            fit: false,
//	            roots: '#',
//	            padding: 10,
//	            nodeOverlap  : 10,
//	            nodeRepulsion: 400000,
//	            avoidOverlap: true,
//	        }
//	      
//	    });
//	    
//	    DesignCytoscapeUtils.attachTypeClickActions(cy.nodes());
//	    DesignCytoscapeUtils.attachRuleConnClickActions(cy.edges());
//	    
//	    cy.on('tap', function(event){
//	    	var evtTarget = event.cyTarget;
//	    	if( evtTarget === cy && !event.ctrlKey && ! event.shiftKey){
//	    		console.log('Unselect Type & empty Info section');
//	    		$('#console-log').append("<p style='color:blue'>Unselect Type & empty Info section</p>");
//	    		if(nametype != null) {tdvCy.filter('node[name="' + nametype + '"]').unselect();}
//	    		nameconn = null;   
//	    		nametype = null;    	    		curType = null;
//	    		listTypeIds=[];
//	    		listConnIds= [];	    		
//	    		shiftkeySelected = false;
//	    		typeMapInst = {};
//	    	}	    	
//	    });
//	    
//
//	    // Selecting multiple nodes
//	    cy.on('select', 'node', function(event){
////	    	console.log("Inside the cy select node");	
//	    	if(shiftkeySelected) {
//	    	              clearTimeout(cy.nodesSelectionTimeout);
//	    	              cy.nodesSelectionTimeout = setTimeout(DesignCytoscapeUtils.getAllSelectedTypes(tdvCy), 300);
//	    	}
//	    	else {
//	    		DesignCytoscapeUtils.getAllSelectedTypes(tdvCy)
////	    		listTypeIds=[];
////	    		listConnIds= [];
////	    		console.log("One node selected ");
//	    	}   	
//	    });
//	    cy.on('select', 'edge', function(event){
//	    	console.log("Inside the cy select node");
//	    	if(shiftkeySelected) {
//	    	              clearTimeout(cy.edgesSelectionTimeout);
//	    	              cy.edgesSelectionTimeout = setTimeout(DesignCytoscapeUtils.getAllSelectedTypes(tdvCy), 300);
//	    	}else {
//	    		DesignCytoscapeUtils.getAllSelectedTypes(tdvCy)
////	    		listTypeIds=[];
////	    		listConnIds= [];
////	    		console.log("One edge selected ");
//	    	}
//	    });
//	    
//	    cy.on('mouseover', 'node', function(e){
//		    var sel = e.cyTarget;
//		    
//		    var selTmp = sel.incomers('edge[classification = "link"]');
//		    var selL = selTmp.union(selTmp.sources());
//		    
//		    cy.elements().difference(sel.outgoers().union(selL)).not(sel).addClass('semitransp');
//		    sel.addClass('highlight').outgoers().addClass('highlight');
//		    selL.addClass('highlight');
//
//		});
//		cy.on('mouseout', 'node', function(e){
//		    var sel = e.cyTarget;
//		    
//		    var selTmp = sel.incomers('edge[classification = "link"]');
//		    var selL = selTmp.union(selTmp.sources());
//		    
//		    cy.elements().removeClass('semitransp');
//		    sel.removeClass('highlight').outgoers().removeClass('highlight');
//		    selL.removeClass('highlight');
//		});
//	    
//	    
//	    
//	    
//	    
//	   
//	    cy.center();
//	    return cy;
//  }
//};
//==============================================================================================
function showTypeTooltip(sourceName){
	var nodeType = typeMap[sourceName];
	var inputs='', props;
	 inputs +="<table>";
     inputs +="<tr><th>Type:</th> <td>"+nodeType.name+"</td></tr>";
     inputs +="<tr><th>isRoot:</th><td>"+nodeType.isRoot+"</td></tr>";
     inputs +="<tr><th colspan='2'>Properties--------</th></tr>";
     props = typeMap[sourceName].properties;
     for (var i=0; i<props.length;i++){
    	 if(props[i].isMandatory){ inputs +="<tr><th style='color:red'>"+props[i].name+"</th><td></td></tr>";    }
    	 else { inputs +="<tr><th>"+props[i].name+"</th><td></td></tr>";}
     }
	 inputs +="</table>"; 
	 return inputs;
}


//=============================================================================================
//function getAllSelectedTypes(cy ){
//	// initialise these variables
//	listTypeIds=[];
//	listConnIds=[];
//
//	//   retrieve all types selected 
//	var typeIds = cy.elements("node:selected");	
//	// retrieve all connections selected
//	var connIds = cy.elements("edge:selected");
//	
//	// Grab all selected nodes 
//	 for( var i=0; i < typeIds.length; i++){
//		 // display the name of type selected
//		 var ele = typeIds[i].data('name');															
//		 console.log("element grabbed is : "+ele );
//		 // save the id in the list
//		 listTypeIds.push(parseInt(typeIds[i].data('id')));	
//		 }
//	 // grab all selected   connections and their sources/destinations 
//	 for(var i=0; i <connIds.length; i++){
//		 // grab the connection ID
//		 listConnIds.push(parseInt(connIds[i].data('id').slice(10)));
//		 var connName = connIds[i].data('name');
//		 // display its origin and destination 
//		 console.log("Selected connection "+connName + " with  Origin is : "+connIds[i].data('origin')+" and  Destination is : "+connIds[i].data('destination'));
//		 $('#console-log').append("<p style='color:green'>Selected connection "+connName + " with  Origin is : "+connIds[i].data('origin')+" and  Destination is : "+connIds[i].data('destination'));
//	 }
//	 nametype = null;    	 
//	 curType = null;
//	 nameconn = null;
//	console.log(" List of nodes are "+ listTypeIds+ " list of connections are :  "+listConnIds );
//}
//=================================================================================	
//function attachTypeClickActions(types) {
//	// Handle click events on cytoscape nodes
//	types.on('click', function(e) {
//	
//		if($("#grid-types").is(':hidden')){$("#grid-types").css({'visibility':'visible'});}
//		var thisClick = new Date().getTime();
//		pleaseWait = true;
//		//  this part will display a tooltip once the user hover over the node
//	    
//	        var node = e.cyTarget;
//	        var sourceName = node.data("name");
//	        var contentText = showTypeTooltip(sourceName);
//	        node.qtip({
//						content: {  title: sourceName,
//								    text: contentText    },
//			            show:    {  event: e.type,
//			                        ready: true,         },
//			            position:{  target : 'mouse',    },
//		                style:   {  classes: 'qtip-blue qtip-tipped',
//								    tip:    { width: 25,   height: 15  }
//							     },
//			            hide:    {    e: 'mouseout unfocus'    }
//	                 }, e);		
//	    if (lastClick && ((thisClick - lastClick) < doubleClickThreshold) && lastObj && lastObj == e.cyTarget) {
////			// Recognise this as an double click event
//		   $('#console-log').append("<p style='color:blue'>Double clicked on type: " + this.data().name+"'</p>");
//   		   isSingleClick = false;
//	    }else {  	
//            // no rule selected previously 
//		    if( !ruleSelected ){
//					  isSingleClick = true;
//					// Attempt to trigger single click action
//					 $('#console-log').append("<p style='color:blue'>Attempted single clicked on type: " + this.data().name+"'</p>");
//					//console.log("Attempted single clicked on type: " + this.data().name);
//					if( !shiftkeySelected ) {
//						(new DesignLogicalRenderer()).showTypeProperties(this);
//					}					
//					
//			} else {    // rule selected     ==== create a connection
//					console.log(" rule selected is : "+ ruleSelected);
//					if (originType == null){
//						console.log(" clicked on type: " + this.data().name);
//						originType = this.data().id;       // retrieve Id
//					}else {  
//						   destType = this.data().id ; 
//						   destTypeName = this.data().name;
//						   console.log("Destination is : "+ this.data().name );
//						   saveNewConnection(originType, destType);
//						   GlobalUtils.cursor_clear();
//						   ruleSelected = false;
//						   originType = null;
//						   destType = null;
//						   mouseEventTime = null;		        
//			              }
//		}
//	}
//		// Keep a record of the click action
//		lastClick = thisClick;
//		lastObj = e.cyTarget;		
//		
//	});
//	
//	types.on('mousedown', function(e) {
//		prePos = {id: this.data().id, x: this.position('x'), y: this.position('y')};
//		
//	})
//	
//	
//	types.on('free', function(e) {	
//		var new_x = this.position('x');
//		var new_y = this.position('y');
//		var typeId = this.data().id.toString();
//		
//		this.position('x', new_x);
//		this.position('y', new_y);
//		
//		var typeFound;
//		for (var key in typeMap) {
////			console.log("typemap id = " + typeMap[key].id);
//			if (typeMap[key].id == typeId) {
//				typeFound = typeMap[key];
//				break;
//			}
//		}
//		
//		TypeUtils.updatePosition(typeFound, 'x', new_x);
//		TypeUtils.updatePosition(typeFound, 'y', new_y);
//		
//		var old_x = prePos.x;
//		var old_y = prePos.y;		
//		if ((new_x - old_x) * (new_x - old_x) + (new_y - old_y) * (new_y - old_y) > 10) {		
//			preTdvPos = [];
//			for (var i = 0; i < tdvCy.nodes().length; i++) {
//				preTdvPos.push({id: tdvCy.nodes()[i].data().id, x: tdvCy.nodes()[i].position().x, y: tdvCy.nodes()[i].position().y});
//			}
//			var current;
//			for (var i = 0; i < preTdvPos.length; i++) {
//				if (preTdvPos[i].id == this.data().id) {
//					current = i;
//					break;
//				}
//			}
//			preTdvPos[current].x = old_x;
//			preTdvPos[current].y = old_y;
//		}
//	})
//	
//	console.log("attachTypeClickActions done");
//};
//======================================================================================
//function attachRuleConnClickActions(conns) {
//	// Handle click events on cytoscape nodes
//	conns.on('click', function(e) {
//		var thisClick = new Date().getTime();
//		pleaseWait = true;	
//		if (lastClick && ((thisClick - lastClick) < doubleClickThreshold) && lastObj && lastObj == e.cyTarget) {
//			// Identify this as an double click event
//			console.log("Double clicked on conn: " + this.data().name);
//			isSingleClick = false;
//		}
//		else {
//			isSingleClick = true;
//			// Attempt to trigger single click action
//			console.log("Attempted single clicked on conn: " + this.data().name);
//			nameconn = this.data().name;
//			(new DesignLogicalRenderer()).showConnRuleProperties(this);
//		}
//		
//		// Keep a record of the click action
//		lastClick = thisClick;
//		lastObj = e.cyTarget;
//	});
//	
//	console.log("attachRuleConnClickActions done");
//};

////==================================================================================
//function formatNewType(jsonData){
//	var element = null;
//	if (jsonData.romeClass = 'TYPE'){
//		jsonData.cyDisplay = jsonData.name;
////		jsonData.color =  TYPES_COLOR[colorIndex];  // add color to type
////		colorIndex ++;
//
//		var new_x = (new DesignLogicalRenderer()).getCoordinate(jsonData.decoProperties, 'x');
//		if(new_x == 0){
//			   new_x += (10* colorIndex);
//		}
//		var new_y = (new DesignLogicalRenderer()).getCoordinate(jsonData.decoProperties, 'y');
//		if(new_y == 0 ){
//			   new_y += (10* colorIndex);
//		}
//		console.log("coordinates" +new_x + new_y)
//		var element = {
//				group: 'nodes',
//				data : jsonData,
//				position: {x: new_x, y: new_y}
//			
//		};
//		
//		return element;
//	}
//	
//}
//======================================================================
function formatNewConnection(jsonData){
	var element = null;
	var connBase = {};
	console.log(jsonData);
	if(jsonData != null){
		// format connection for the graph 
		jsonData.cyDisplay = jsonData.name;
		element = {
				group: 'edges',
				data : {
					id: 'connection' + jsonData.id,
					name: jsonData.name,
//					rule: jsonData.type,
					rule: jsonData.ruleName,
					origin: jsonData.origin,
					destination: jsonData.destination,
					source: jsonData.originId.toString(),
					target: jsonData.destinationId.toString(),
			//		romeClass: jsonData.romeClass,
					classification : jsonData.classification,
					minRel: jsonData.minRel,
					maxRel: jsonData.maxRel
				}
		
			}
        // format the connMap   list of connections

		connBase = GlobalUtils.createInternalConnMap( jsonData );
		
//		  if (!connMap[jsonData.name]) {
//			  connMap[jsonData.name]= connBase;
//			  connMapViaId[ jsonData.id ] = connBase;
//			  connBase = {};
//		  }else { 
//			  connMap[jsonData.name].nb += 1;
//			  connMapViaId[ jsonData.id ].nb += 1;
//		  }
		
		console.log("Got Connection");
		return element;
	}
}

//===============================Used after Create Type =============================
//function updateTypeGraph(cy, elements) {
//    console.log(elements);
//	var newElements = cy.add(elements);
//	DesignCytoscapeUtils.attachTypeClickActions(newElements.filter('node'));
//    if (layoutStatus == 0) {
//    	console.log("update using preset!");
//    	cy.layout({name: 'preset',fit : false})
//    } else {
//    	console.log("update using default!");
//    	cy.layout(defaultLayout);
//    }
//    
//};
//================================Used after Create Connection ======================
function updateConnGraph(cy, elements) {
    console.log(elements);
	var newElements = cy.add(elements);
	DesignCytoscapeUtils.attachRuleConnClickActions(newElements.filter('edge'));
	if (layoutStatus == 0) {
    	console.log("update graph with connection  using preset layout!");
    	cy.layout({name: 'preset',fit : false})
    } else {
    	console.log("update graph with connection using default layout !");
    	cy.layout(defaultLayout);
    }
	
};

//====================================================================================
//function showTypeProperties(type) {
//	pleaseWait = true;
//	setTimeout(function() {
//		pleaseWait = false;
//		if (isSingleClick && type == lastObj) {
//			nametype = type.data().name;  // save type name		
//			$('#console-log').append("Single click on this type (showing its properties)"+type.data().name);
//			showType(type.data());
//		}
//	}, doubleClickThreshold + 10);
//};

//====================================================================================
//function showConnRuleProperties(conn) {
//	pleaseWait = true;
//	setTimeout(function() {
//		pleaseWait = false;
//		if (isSingleClick && conn == lastObj) {
//			$('#console-log').append("<p>Single click on this connection (showing its properties)"+conn.data().name+"</p>");
//			DisplayConnRuleProperties(conn);
//			console.log("inside showConnection property: " + conn.data().name);
//		}
//	}, doubleClickThreshold + 10)
//};







//***************************************************************************************************************
//******************************** CYTOSCAPE FUNCTIONS 
//***************************************************************************************************************







//================== Added by Allen ====================================
//function getCoordinate(value, x) {
//	for (var i = 0; i < value.length; i++) {
//		if (value[i].name == x) {
//			return Number(value[i].value);
//		}
//	}
//	return 0;
//}


//=======================================================================================
function savePosition() {	
	var jsonstrArray = [];
	if (tdvCy.nodes() == null || tdvCy.nodes().length < 1) {
		$('#console-log').append("<p style='color:red'>Nograph nodes to save position </p>");	
		return;
	}
	//   RETRIEVING ALL TYPES POSITIONS
	for (var i = 0; i < tdvCy.nodes().length; i++) {		
		console.log("typemap x for Type "+tdvCy.nodes()[i].data().name+ " = " + tdvCy.nodes()[i].position().x);
		console.log("typemap y for Type "+tdvCy.nodes()[i].data().name+ " = " + tdvCy.nodes()[i].position().y);	
		var jsonstr = {
				typeId: tdvCy.nodes()[i].data().id.toString(),
				decoId: "1", // hard coded now
				x: tdvCy.nodes()[i].position().x.toString(),
				y: tdvCy.nodes()[i].position().y.toString(),
				z: "0"
		};
		
		jsonstrArray.push(jsonstr);
		
	}
	
	var doneFunction = function( data ) {
		console.log(data);
		$.each(data.types, function(key, value) {
			typeMapViaId[value.id].decoProperties = value.decoProperties;
		});
	};
		
	var failFunction = function( xhr, status, error ) {
		$('#console-log').append("<p style='color:red'>Can not save position" + xhr.status + "</p>");			
		console.log("Save position error: "+ xhr.responseText);
	};
	
	var apis = new apiRomeNext();
	
	apis.saveTypeCoordinates(jsonstrArray, doneFunction, failFunction );	
	
	$('#console-log').append("Graph Position saved ");
	console.log("saved position");
	
};

//=============================================================================================
//function toggleLayout() {
//	
//	console.log("toggle layout!");
//	if (layoutStatus == 0) {
//		preTdvPos = [];
//		for (var i = 0; i < tdvCy.nodes().length; i++) {
//			preTdvPos.push({x: tdvCy.nodes()[i].position().x, y: tdvCy.nodes()[i].position().y});
//		}
//		
//		console.log("layout status = " + layoutStatus);
////		var option = {name: defaultLayout};
////		var layout = tdvCy.makeLayout(option);
//		var layout = tdvCy.makeLayout(defaultLayout);
//		layout.run();
//		layoutStatus = 1;
//	} else {
//		console.log("layout status = " + layoutStatus);
//		tdvCy.nodes().positions(function(i, node) {
//			return preTdvPos[i];
//		});
//		
//		var option = {name: 'preset'};
//		var layout = tdvCy.makeLayout(option);
//		layout.run();
//		layoutStatus = 0;
//	}
//	
//};
//========================================================================================
//function updatePosition(type, x, new_x) {
//	
//	for (var i = 0; i < type.decoProperties.length; i++) {
//		if (type.decoProperties[i].name == x) {
//			type.decoProperties[i].value = new_x;
//			break;
//		}
//	}
//	
//};
//=====================================================================================
//function resetLayout() {
//	
//	if (tdvCy == null) {
//		return;
//	}
//	
//	if (layoutStatus == 0) {
//		preTdvPos = [];
//		for (var i = 0; i < tdvCy.nodes().length; i++) {
//			preTdvPos.push({id: tdvCy.nodes()[i].data().id, x: tdvCy.nodes()[i].position().x, y: tdvCy.nodes()[i].position().y});
//		}
//	}
//	
////	var option = {name: defaultLayout};
////	var layout = tdvCy.makeLayout(option);
//	var layout = tdvCy.makeLayout(defaultLayout);
//	layout.run();
//	
//	var typeFound;
//	
//	if (layoutStatus == 0) {
//		for (var i = 0; i < tdvCy.nodes().length; i++) {
//			for (var key in typeMap) {
//				console.log("tdvCy id = " + tdvCy.nodes()[i].data().id);
//				if (typeMap[key].id == tdvCy.nodes()[i].data().id) {
//					typeFound = typeMap[key];
//					console.log("type found: " + typeFound.id);
//					break;
//				}
//			}
//			
//			DesignCytoscapeUtils.updatePosition(typeFound, 'x', tdvCy.nodes()[i].position().x);
//			DesignCytoscapeUtils.updatePosition(typeFound, 'y', tdvCy.nodes()[i].position().y);
//		}	
//	}
//	
//	
//	layoutStatus = 1;
//	
//};

//function previousLayout() {
//	
//	if (tdvCy == null) {
//		return;
//	}
//	
//	tdvCy.nodes().positions(function(i, node) {
//		return preTdvPos[i];
//	});
//	
//	var option = {name: 'preset'};
//	var layout = tdvCy.makeLayout(option);
//	layout.run();
//	layoutStatus = 0;
//	
//	for (var i = 0; i < tdvCy.nodes().length; i++) {
//		for (var key in typeMap) {
//			console.log("tdvCy id = " + tdvCy.nodes()[i].data().id);
//			if (typeMap[key].id == tdvCy.nodes()[i].data().id) {
//				typeFound = typeMap[key];
//				console.log("type found: " + typeFound.id);
//				break;
//			}
//		}
//		
//		DesignCytoscapeUtils.updatePosition(typeFound, 'x', tdvCy.nodes()[i].position().x);
//		DesignCytoscapeUtils.updatePosition(typeFound, 'y', tdvCy.nodes()[i].position().y);
//	}
//	
//	
//};
//
//function restoreLayout() {
//
//	
//	if (tdvCy == null) {
//		return;
//	}
//	
//	tdvCy.nodes().positions(function(i, node) {
//		return defTdvPos[i];
//	});
//	
//	var option = {name: 'preset'};
//	var layout = tdvCy.makeLayout(option);
//	layout.run();
//	layoutStatus = 0;
//	
//	
//}
