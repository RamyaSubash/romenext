///**
//*  Display View functions
// * Author:	Baya Benrachi
// * Date: 	18 April 2016
// * Update:  01 June 2016
// */
//
////================== Initiate the Type Bar ==========================================
////function initTypeBar(bar){
////	console.log("Initializing the type bar for display using initType function!!!" + bar  + "with loadInst == " +loadInst);
////	var elementsBar = {};
////	if(loadInst)  {
////		elementsBar = typeMapInst;
////	}else { elementsBar = typeMap; }
////	var nb = Object.keys(elementsBar).length;
////	var inputs = '';
////	if( nb != 0 ){
////		inputs ="<table id='typesList'><tr>";
////		inputs += "<td><span class='badge'>*("+nb+")</span></td>";
////		$.each(elementsBar, function(key, value){
////			inputs += "<td  ><span class='badge' style='color:black; background:"+value.color+"' id='"+value.id+"'  onclick=\"selectedType('" + value.name + "')\"  >"+key;
////			if (loadInst) { inputs += "(";
////			                if(value.nb){ inputs += value.nb;}
////			                else{ inputs += '0';}
////			                inputs += ")";}
////			inputs += "</span></td>";
////			});
////		inputs +="</tr></table>";
////		document.getElementById(bar).innerHTML = inputs;
////		typeNodeBarDraggable();
////	}else {    
////			if (loadInst) {inputs += "<p> No instances for this Type is created yet</p>";}
////			else {inputs += "<p> No Type created yet</p>";  }
////		document.getElementById(bar).innerHTML = inputs;
////	}
////	
////}
//
////$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
////function initInstTypeBar(bar){
////	console.log("Initializing the type bar for Display using initInstTypeBar!!!" + bar  + "with loadInstNode == " +loadInst);
////	var elementsInstBar = {};
////	var inputs = ''; var nodeName;
////	if(loadInstNode)  {  elementsInstBar = nodeMapInst}
////	else { elementsInstBar = nodeMap   }
////	var nb = Object.keys(elementsInstBar).length;
////	if( nb != 0 ){
////		inputs ="<table id='nodesList'><tr>";
////		inputs += "<td><span class='badge'>*("+nb+")</span></td>";
////		$.each(elementsInstBar, function(key, value){
////			if(value.cyDisplay != '') { nodeName = value.cyDisplay; }
////			else {nodeName ='('+ value.type+')'}
////			inputs += "<td  ><span class='badge' style='color:black; background:"+value.color+"' id='"+key+"'  onclick=\"selectedNode('" + key + "')\">"+nodeName+"</span></td>";
////		});
////		inputs +="</tr></table>"
////		document.getElementById(bar).innerHTML = inputs;
////		typeNodeBarDraggable();
////	}else {    
////		inputs += "<p> No Instance Nodes created</p>";
////		document.getElementById(bar).innerHTML = inputs;
////	}
////}
//////==============================================================================================
////function initRuleBar (bar){              // bar change based on the display
////	var nb = Object.keys(ruleMap).length;
////	var inputs = '';
////	if(nb != 0) {
////		inputs ="<table id='ruleList'><tr>";
////		inputs += "<td><span class='label label-default'>*("+nb+")</span></td>";
////		$.each(ruleMap, function(key, value){
////				inputs += "<td><span class='label label-primary'  id="+value.id+">"+key+"</span></td>";
////			});
////		inputs +="</tr></table>";
////	} else {
////			inputs += "<p> No Rules created yet</p>";   
////			}
////	document.getElementById(bar).innerHTML = inputs;
////}
//
////==================== Initiate the Rule Bar   for Display View========================================
//
//
////Code added 28-10-2016 
//function loadNodesOfType(type){
//	if (selectedMetaData != null){
//		var loadNodesTypeRequest = $.ajax({
//	 		url: apiBaseUrl + "node/all/"+type+"/metadata/" + selectedMetaData ,
//	 		method: "GET",
//	 		dataType : 'json',
//			contentType : 'application/json',
//			cache : false,
//	 		async : false
//	 	});
//		loadNodesTypeRequest.fail(function(xhr, status, error){
//	    	  $("#console-log").append("Not able to load Nodes of this "+type+"  Error: " + xhr.status);
//	    	  console.log("Error: " + xhr.responseText);
//	     });
//		loadNodesTypeRequest.done(function(Data){
//	    	 if(!$.isArray(Data.nodes)|| !Data.nodes.length){             //   if No Nodes Returned do not change the Instance bar 
//	 			$("#console-log").append("No Nodes Instance/ GRAPH for the selected Type");	
//	 			$("#grid-instances").css({'visibility':'visible'});
//	 			$("#nodeForm").append("No Instances Created ");
//		        initTypeBar('typeBar2');
//	    	 }else {
//	    		 irvCy =  initNodeEdgeGraph(irvCy, "irvCy",  formatNodesResponse(Data));
//	 		     $("#console-log").append(" Instance GRAPH for the selected Type");	     
//	 	         retrieveBar(nodeMap);          // Build the bar from the list of Nodes uploaded
//	 		}
//	     });
//	
//	}else {
//		$('#console-log').append("<p style='color:red'>Can not load Nodes, You must First  select a Metadata</p>");
//		}   
//	
//}
//
//
//
////==================== Selecting a Rule is Creating an edge    ========================================
//function initRuleBarInst(bar){
//	var nb = Object.keys(ruleMap).length;
//	var inputs = '';
//	if(nb != 0) {
//		inputs ="<table id='ruleList'><tr>";
//		inputs += "<td><span class='label label-default'>*("+nb+")</span></td>";
//		$.each(ruleMap, function(key, value){
//			inputs += "<td><span class='label label-primary'  id="+value.id+
//				"title='create an edge'  data-content='select Origin & destination Types'  onclick='createEdge(this);' >"+key+"</span></td>";
//			});
//		inputs +="</tr></table>";
//		document.getElementById(bar).innerHTML = inputs;
//	} else {
//			inputs += "<p> No Rules created yet</p>";   
//			document.getElementById(bar).innerHTML = inputs;
//			}
//}
//
//
////===================================================================================
////Load only  Nodes & Edges under the selected metaDataRepo
//function initInstanceGraph() {
//	if (selectedMetaData != null) {
//
//	var request = $.ajax({
//		url: apiBaseUrl + "node/edge/all/simplified/metadata/" + selectedMetaData ,
//		method: "GET",
//		dataType: "json",
//		async:false,
//		cache : false
//		
//	});
//	
//	request.done(function (jsonData) {
//		console.log(jsonData);
//		if(!$.isArray(jsonData.nodes)|| !jsonData.nodes.length){
//			//   if Not do not change the Instance bar 
//			 //   No change to the Graph displayed
//			 //    !!!! Need to retrive element from history
//			if(irvCy) {irvCy.remove(irvCy.elements());}
//			
//			$("#grid-instances").css({'visibility':'visible'});
//			$("#nodeForm").append("No Nodes Instance created Yet");
//			initTypeBar('typeBar2');
//		}else {// API returned a set of nodes and edges
//			//    
//			irvCy = initNodeEdgeGraph(irvCy, "irvCy", formatNodesResponse(jsonData));
//			initTypeBar('typeBar2');
//		}	
//	});
//	
//	request.fail(function (xhr, status, error) {
//		console.log("Error: " + xhr.responseText);
//		 $('#console-log').append("Error: " + xhr.status);
//		
//	});
//	} else {
//	         $('#console-log')
//				.append("<p style='color:red'>Can Load Graph, You must First  select a Metadata</p>");
//           }
//}
////==========================================================================================
//function retrieveNameFromProps( nodeDetails){
//	var props = nodeDetails.properties, nameNode;
//    var display = $.grep(props, function(i, prop) {
//    	 if(i.name == 'name') {
//    		                    nameNode = i.value;
//    		 					}
//     })
//     // display the name if exits or type of node 
//     if (nameNode ) { nodeDetails.cyDisplay = nameNode}
//     else {nodeDetails.cyDisplay ='' + '(' + nodeDetails.type + ')' ;}
//	return nodeDetails;
//	
//}
//
////==========================================================================
//// format SINGLE newly created node 
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
//	
//		var new_x = getCoordinate(jsonData.decoProperties, 'x');			
//		var new_y = getCoordinate(jsonData.decoProperties, 'y');	
//		
//		
//		
////		var pos = renderedPosition(irvCy);
//		// format node for cytoscape
//		element = {
//			group: 'nodes',
//			data: jsonData,
//			renderedPosition: {x: new_x, y: new_y}
////		    position: pos
//		};
//		props.forEach(function(prop) {
//			     if(prop.name=="uuid"){  uuid = prop.value }
//		});  
//		// add the node to the nodeMap list =========== shoabo to correct the return properties to include the uuid
//		if (!nodeMap[uuid]) {
//			nodeMap[uuid]= jsonData;
//		}else {
//			nodeMap[uuid]=jsonData;
//		}
//    console.log("added this element"+element);
//	return element;
//};
//
//
//function renderedPosition(cy) {
//    var pan = cy.pan();
//    var zoom = cy.zoom();
//    var x = (dragItemPositionX - pan.x) / zoom;
//    var y = (dragItemPositionY - pan.y) / zoom;
//    return {
//      x: x,
//      y: y
//    };
//}
//function setCoordinates(value, x, newx) {
//	for (var i = 0; i < value.length; i++) {
//		if (value[i].name == x) {
//			value[i].value = newx;
//		}
//	}
//}
//
////=====================================================
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
//
////================= Format loaded nodes and edges for an instance ====
////===================================================================
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
//
//function formatUpdateNodesResponse(jsonData) {                 // main assumption is that there is always at least one property == uuid
//	var elements = []; // nodeMap = {}; edgeMap = {}
//    // Start the format for Nodes
//	$.each(jsonData.nodes, function(key, value2){
//		
//		var uuid, Props, display; var name='';
//		// Retrieve the uuid value 
//		Props = value2.properties;
//		// finding if the node has a name to display it
//		display = $.grep(Props, function(i,item) {
//	    	 if(i.name == 'name') { name = i.value;    return name}
//	    });
//		Props.forEach(function(prop) {
//			     if(prop.name=="uuid"){  uuid = prop.value }
//		});  
//		if (isLoadingChildNodes == true && uuid != NodeSelected) {
//			childNodes.push(uuid);
//		}
//		if (!nodeMap[uuid]) {
//			     
//				// if not found display the type
//				 if(name ) { value2.cyDisplay = name}
//					    else {value2.cyDisplay ='' + '(' + value2.type + ')' ;}	
//				 // getting the color of the type
//				 value2.color = typeMap[value2.type].color;	
//				 
//				// getting the coords
//				var new_x = getCoordinate(value2.decoProperties, 'x');
//				var new_y = getCoordinate(value2.decoProperties, 'y');	
//				
//				var element = {
//						group: 'nodes',
//						data : value2,
//						renderedPosition: {x: new_x, y: new_y}
//						};
//				elements.push(element);
//				nodeMap[uuid]= value2;
//		}else {
//			// grasp the node position in irvCy
//			var new_x = irvCy.$('').position('x');
//			var new_y = irvCy.$('').position('y');	
//			
//		}
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
////		if (!edgeMap[uuid]) {
////			edgeMap[uuid]= value;
////		}
//		edgeMap[uuid]= value;
//		elements.push(element);
//	});
//	return elements;
//}
//
//function formatNodeEdgeGraph(cy) {
//
//	if (cy.nodes() == null || cy.nodes().length < 1 || cy.edges() == null || cy.edges().length < 1) {
//		return;
//	}
//	
//	for (var i = 0; i < cy.edges().length; i++) {	
//		var relativeX = null;
//		var relativeY = null;
//		var props = cy.edges()[i].data().decoProperties;
//		for (var j = 0; j < props.length; j++) {
//			 if(props[j].name=="x"){  relativeX = props[j].value }
//			 if(props[j].name=="y"){  relativeY = props[j].value }
//		}
//		
//		if (relativeX != null && relativeY != null) {
//			cy.edges()[i].target().position().x = cy.edges()[i].source().position().x + Number(relativeX);
//			cy.edges()[i].target().position().y = cy.edges()[i].source().position().y + Number(relativeY);
//		}
//		
//	}
//	
//}
//
////=================================================================================
//function cancelEdgeCreation(){
//	// reset all variables for creating an edge == emptying the text message on instance details == reset the rulebar == clear the cursor
//	connSelected= null;
//	originType = null;
//	destType   = null;
//	originNode = null;
//	destNode = null;
//	emptyAllInst();
//	initRuleBarInst('ruleInstBar'); 
//	mouseEventTime = new Date().getTime();
//	pleaseWait = true;
//	cursor_clear();
//}
//
//
////==================================================================================
//function createEdge(rule){
//	var rulename = ruleMap[rule.innerHTML];
//	console.log("this is the rule selected : "+ rulename.name);
//	// user selected a rule to create a connection  -- save the rule
//		if(connSelected) {      // previous still there                connSelected has a value
//			var change = confirm("Previous rule selected but not done. Do you want to change the rule ");
//			if(change) { 
//				originType = null;
//				destType   = null;
//	//			initInstTypeBar('typeInstBar');
//				$(rule).replaceWith( "<span id='highlightRule' title='Select Origin & Destination Type'>" + $( rule ).text() + "</span>" );
//				connSelected = rulename;
//				mouseEventTime = new Date().getTime();
//				pleaseWait = true;
//				cursor_wait();
//			}else {
//				// reinitiate the types
//				originType = null;
//				destType   = null;
//				mouseEventTime = new Date().getTime();
//				pleaseWait = true;
//			}	         	
//		}else { // first time that rule is selected  connSelected = null
//			originType = null;
//			destType   = null;
//			$(rule).replaceWith( "<span id='highlightRule' title='Select Origin & Destination Type'>" + $( rule ).text() + "</span>" );
//			connSelected = rulename;
//			mouseEventTime = new Date().getTime();
//			pleaseWait = true;
//			cursor_wait();
//		}
//}
////=================================== Verify if a rule has connections or not 
////function ruleHasConnection(rulename){
////	 var connExists= false;
////	 $.ajax({
////		type : 'GET',    
////		url : apiBaseUrl + 'connection/rule/'+rulename.name+ '/metadata/' + selectedMetaData,
////		dataType : 'json',
////		contentType : 'application/json',
////		cache : false,
////		success : function(data) {
////					console.log("Connections returned success. data: " + data);
////					},
////		error : function(xhr, ajaxOptions, error) {
////							//alert(xhr.status);
////							 $('#console-log').append("Not able to retrieve Connections Error: " + xhr.status);
////								
////							console.log("Not able to retrieve Connections Error: "+ xhr.responseText);
////					}
////		}).done(function(data) {
////				console.log(data.length+ " Content is "+ data);
////				if(data.length < 1){ 
////					 $('#console-log').append("no connections available for this rule"+rulename);
////					//  alert("no connections available for this rule"+rulename);
////					  connExists = false;
////					  }
////				else {
////					connExists = true;
////				     }
////				});
////	 return connExists;
////}
//
////===================================================================================
//function loadTypeNodes(type){
//	// Retrieve  nodes instance for the selected type
//	var loadNodesRequest = $.ajax({
//		url: apiBaseUrl + "node/edge/all/simplified/"+type+"/metadata/" + selectedMetaData ,
//		method: "GET",
//		dataType: "json",
//		async : false
//	});
//	
//	$('div[role="tooltip"]').remove();
//	loadNodesRequest.done(function (jsonData) {
//	//	console.log("Returned json has : "+jsonData.nodes);
//		//  verify that we have instance for the selected Type 
//		if(!$.isArray(jsonData.nodes)|| !jsonData.nodes.length){             //   if Not do not change the Instance bar 
//			$("#console-log").append("No Nodes Instance/ GRAPH for the selected Type"+ type);
//			$("#grid-instances").css({'visibility':'visible'});
//			emptyAllInst();
//			$("#nodeForm").append("No Instances Created for this Node");
//			nodeMap={}; 
//			edgeMap = {}; 
//			if(irvCy) {irvCy.remove(irvCy.elements());}
//		}else {// API returned a set of nodes and edges  
//			irvCy = initNodeEdgeGraph(irvCy, "irvCy", formatNodesResponse(jsonData));
//		//	initInstTypeBar('typeBar2');
//			nametype = type;
//			$("#console-log").append(" Instance GRAPH for the selected Type"+ type);
//		}
//	});
//	
//	loadNodesRequest.fail(function (xhr, status, error) {
//      $('#console-log').append("Not able to load Type Nodes Error: " + xhr.status);
//		console.log("Error: " + xhr.responseText);
//	});
//	
//	
//}
////================================= Load All Types Nodes =====================================
//function loadAllTypeNodes(){
//	var jsonData={};
//	nodeMap={}; 
//	edgeMap = {}
//	if(irvCy) {irvCy.remove(irvCy.elements());}
//	//  if available list (types selected) of Types Add this to the Json
//	if (listTypeIds.length != 0 ){jsonData.typeIds = listTypeIds;}
//	//   if available list (connections selected) of Connections Add this to the Json
//	if (listConnIds.length != 0 ){jsonData.connIds = listConnIds;}
//	console.log(jsonData);
//	var loadTypeInstRequest = $.ajax({
// 		url: apiBaseUrl + "node/edge/simplified/metadata/" + selectedMetaData ,
// 		method: "POST",
// 		dataType : 'json',
//		data : JSON.stringify(jsonData),
//		contentType : 'application/json',
//		cache : false,
// 		async : false
// 	});
//     loadTypeInstRequest.fail(function(xhr, status, error){
//    	  $("#console-log").append("Not able to load Type Nodes Error: " + xhr.status);
//    	  console.log("Error: " + xhr.responseText);
//     });
//     loadTypeInstRequest.done(function(Data){
//    	 if(!$.isArray(Data.nodes)|| !Data.nodes.length){             //   if No Nodes Returned do not change the Instance bar 
// 			$("#console-log").append("No Nodes Instance/ GRAPH for the selected Type");		
// 			$("#grid-instances").css({'visibility':'visible'});
// 			$("#nodeForm").empty();
// 			$("#nodeForm").append("No Instances Created ");			      
//	        initTypeBar('typeBar2');
//    	 }else {
//    		 irvCy =  initNodeEdgeGraph(irvCy, "irvCy",  formatNodesResponse(Data));
// 		     $("#console-log").append(" Instance GRAPH for the selected Type");	     
// 	         retrieveBar(nodeMap);                                                   // Build the bar from the list of Nodes uploaded
// 		}
//     });	
//}
//
//
////=====================================================================================
//function loadInstanceRelatedNodes_Edges(uuid){
//	// load nodes instance for the selected type
//	var loadSubGraphRequest = $.ajax({
//		url: apiBaseUrl + "node/end/edge/all/simplified/metadata/"+ selectedMetaData +"/uuid/"+uuid  ,
//		method: "GET",
//		dataType: "json",
//		async : false
//	});
//	
//	loadSubGraphRequest.done(function (jsonData) {
//		if(!$.isArray(jsonData.nodes)|| !jsonData.nodes.length){                 // Returned json is empty no nodes 
//			$("#console-log").append("No Nodes Instance/ GRAPH for the selected node"+ uuid);
//			initInstTypeBar('typeBar2');
//		}else {
//			    isLoadingChildNodes = true;
//				console.log("Returned json has : "+jsonData);
//				connSelected = null;           
//				updateInstanceGraphBatch(irvCy, formatUpdateNodesResponse(jsonData));
////				initInstTypeBar('typeBar2');
//				isLoadingChildNodes = false;
//		}
//	});
//	loadSubGraphRequest.fail(function (xhr, status, error) {
//					$('#console-log').append("Not able to retrieve Instance Related Nodes: " + xhr.status);
//					console.log("Error: " + xhr.responseText);
//	});
//}
//
////======================  General !!!! to check ====================================
//
//function updateInstanceGraph(cy, element) {                // could be called after adding a Node or Edge 
//
//	var newElement;
//	// found out where we are (should be in Instance view)
//	
//	if (cy.$('#' + element.data.id + '').length == 0) {
//		
//		if (cy) {
//			 newElement = cy.add(element);
//			 if (element.group == 'nodes')    { attachNodeClickActions(newElement.filter('node')); }
//			 else if(element.group == 'edges'){ attachEdgeClickActions(newElement.filter('edge')); };
////			 cy.$('#' + element.data.id + '').layout(defaultLayout);
//		} else {
//			var nodes = [];
//			nodes.push(element);
//			setTimeout(function() {irvCy =  initNodeEdgeGraph(irvCy, "irvCy",  nodes); 
//			}, 100);
//		}
//		
//	} else {
//		// This only work for updating existing nodes, not work for edges yet
//		// not sure should change the id or not
//		cy.$('#' + element.data.id + '').data("color", element.data.color);
//		cy.$('#' + element.data.id + '').data("cyDisplay", element.data.cyDisplay);
//		cy.$('#' + element.data.id + '').data("decoProperties", element.data.decoProperties);
//		cy.$('#' + element.data.id + '').data("properties", element.data.properties);
//		cy.$('#' + element.data.id + '').data("type", element.data.type);
//	}
//	
//	//formatNodeEdgeGraph(cy);
//
//};
//
//function updateInstanceGraphBatch(cy, elements) {                // could be called after adding a Node or Edge 
//
//	var i;
//	for (i = 0; i < elements.length; i++) {
//		if (cy.$('#' + elements[i].data.id + '').length == 0) { // if element is not already in the graph 
//			var newElement;
//			// This works for updating both new nodes and edges
//			newElement = cy.add(elements[i]);
//			 if (elements[i].group == 'nodes') { attachNodeClickActions(newElement.filter('node')); }
//			 else if(elements[i].group == 'edges'){ attachEdgeClickActions(newElement.filter('edge')); };
//			
////			 cy.$('#' + elements[i].data.id + '').layout(defaultLayout);
////			 cy.center();
////			 cy.fit();
//		} else {
//			// This should work for updating existing nodes and edges
//			console.log("Do nothing for now.");
//		}		
//	}
//	 cy.resize();
////	formatNodeEdgeGraph(cy);
//
//};
//
//function selectedNode(nodeUuid) {
//	if (document.getElementById("irvCy").style.display == "block") {
//		// dig into deeper level may be
//	} else if (document.getElementById("mrvCy").style.display == "block") {
//		// map marker zoom in
//		markerZoomIn(nodeUuid);
//	}
//}
//
////=============================================================================================\\
//
//function saveLogicalPosition() {
//	var jsonstrArray1 = [];
//	if (irvCy.nodes() == null || irvCy.nodes().length < 1) {
//		return;
//	}
//	//=========================================================================
//	//     RETRIEVING ALL NODES POSITIONS
//	for (var i = 0; i < irvCy.nodes().length; i++) {
//		// Retrieve  Node uuid
//		var nUuid;
//		var props = irvCy.nodes()[i].data().properties;
//		for (var j = 0; j < props.length; j++) {
//			 if(props[j].name=="uuid"){  nUuid = props[j].value }
//		}
//		// save it in properties
//		var properties = [];
//		properties.push({propertyName: "uuid", value: nUuid, propertyType:"STRING"});
//		var newDecoProperties = [];
//        // Retrieve  the positions of the node
//		newDecoProperties.push({propertyName: "x", value: irvCy.nodes()[i].position().x.toString(), propertyType:"DOUBLE", romeDecoPropId: "1"});
//		newDecoProperties.push({propertyName: "y", value: irvCy.nodes()[i].position().y.toString(), propertyType:"DOUBLE", romeDecoPropId: "2"});
//		// create a json for that node with its type, uuid and positions
//		var jsonstr = {
//				type: irvCy.nodes()[i].data().type,
//				properties: properties,
//				newDecoProperties: newDecoProperties
//		};
//		
//		jsonstrArray1.push(jsonstr);
//		
//	}
//	//=========================================================================
//	//        SAVING NODES POSITIONS
//	if (selectedMetaData != null){
//		$.ajax({
//			type : 'PUT',
//			url: apiBaseUrl + "node/withdeco/batch/metadata/" + selectedMetaData,
//			dataType : 'json',
//			data : JSON.stringify(jsonstrArray1),
//			contentType : 'application/json',
//			cache : false,
//			success : function(data) {
//				console.log("Save position success. data: " + data);
//			},
//			error : function(xhr, ajaxOptions, error) {
//				$('#console-log').append("<p style='color:red'>Can not save position" + xhr.status + "</p>");
//				console.log("Save position error: "+ xhr.responseText);
//			}
//		}).done(function(data) {
//			console.log(data);
//		});
//			
//	} else { $('#console-log').append("<p style='color:red'>Can not save position</p>"); }
//	
//	var jsonstrArray2 = [];
//
//	if (irvCy.nodes() == null || irvCy.nodes().length < 1 || irvCy.edges() == null || irvCy.edges().length < 1) {
//		return;
//	}
//	//===========================================================================
//	//   RETREIVING   ALL EDGES POSITIONS 
//	for (var i = 0; i < irvCy.edges().length; i++) {
//		
//		var eUuid;
//		var props = irvCy.edges()[i].data().properties;
//		for (var j = 0; j < props.length; j++) {
//			 if(props[j].name=="uuid"){  eUuid = props[j].value }
//		}
//		
//		var decoProps = [];
//		// Will store the substraction between the target and source
//		decoProps.push({propertyName: "x", value: (irvCy.edges()[i].target().position().x - irvCy.edges()[i].source().position().x).toString(), propertyType: "DOUBLE", romeDecoPropId: "1"});
//		decoProps.push({propertyName: "y", value: (irvCy.edges()[i].target().position().y - irvCy.edges()[i].source().position().y).toString(), propertyType: "DOUBLE", romeDecoPropId: "2"});
//		decoProps.push({propertyName: "z", value: "0", propertyType:"DOUBLE", romeDecoPropId:"3"});
//		
//		var jsonstr = {
//				ruleName: irvCy.edges()[i].data().name,
//				uuid: eUuid,
//				originType: irvCy.edges()[i].source().data().type,
//				decoProperties: decoProps
//			
//		};
//		
//		jsonstrArray2.push(jsonstr);
//		
//	}
//	//    SAVING ALL EDGES POSITIONS
//	if (selectedMetaData != null){
//		
//		$.ajax({
//			type : 'PUT',
//			url: apiBaseUrl + "edge/withdeco/batch/metadata/" + selectedMetaData,
//			dataType : 'json',
//			data : JSON.stringify(jsonstrArray2),
//			contentType : 'application/json',
//			cache : false,
//			success : function(data) {
//				console.log("Save position success. data: " + data);
//			},
//			error : function(xhr, ajaxOptions, error) {
//				$('#console-log').append("<p style='color:red'>Can not save position" + xhr.status + "</p>");
//				console.log("Save position error: "+ xhr.responseText);
//			}
//		}).done(function(data) {
//			console.log(data);
//		});
//		
//	} else { $('#console-log').append("<p style='color:red'>Can not save position</p>"); }
//	
//}
//
//function restoreLogicalLayout() {	
//	
//}
//
//function resetLogicalLayout() {
//		
//}
//
//function previousLogicalLayout() {
//
//}
//
//
////function loadCurrentDisplayView() {	
////	topLevelTab = "instRelViewTab";		
////	console.log("I entered here!!-new");
////	switch(selecteddecorator) {
////		case "Logical" :   
////              console.log(" Deco is : "+ selecteddecorator);
////              if(listTypeIds.length != 0|| listConnIds.length != 0 || nametype !=null || nameconn !=null) { 
////            	     loadInstNode = false;
////				     loadInst = true;
////				     typeMapInst = {}; 
////				     nodeMap = {}; 
////				     if(irvCy) {irvCy.remove(irvCy.elements());}			                	
////					    
////				     if(nametype != null){  // means that one type is selected
////				    	 var id = typeMap[nametype].id;
////				    	 listTypeIds.push(parseInt(id));
////				     }
////				     if (nameconn != null){
////				    	 var id = connMap[nameconn].id;
////				    	 listConnIds.push(parseInt(id));
////				     }
////        		     initRuleBarInst('ruleInstBar');
////        		     loadAllTypeNodes();	
////              } else {			            
////            	    emptyAllInst();						                
////            	    loadInst = false;
////            	    initInstanceGraph();
////            	    initRuleBarInst('ruleInstBar'); 
////              }
////             setTimeout(function() {switchDeco(selecteddecorator);}, 100);		 
////             break;
////		case "Physical" : 
////	          console.log(" Deco is : "+ selecteddecorator);
////	          // don't know what to do   
////	          initTypeBar('typeBar2');
////	          setTimeout(function() {switchDeco(selecteddecorator);}, 100);		 
////	          break;
////		case "Geo"      : 
////	          console.log(" Deco is : "+ selecteddecorator);
////	          if(nametype != null) {  
////	        	  // type selected need to load typebar in instance with this node
////				  // Need to load its chile node instances and load instance bar with these
////				  typeMapInst = {}; nodeMap = {};
////				  if(irvCy) {irvCy.remove(irvCy.elements());}
////				  typeMapInst[nametype] = typeMap[nametype];
////				  loadInstNode = false;
////				  loadInst = true;
////				  initTypeBar('typeBar2');
////				  loadTypeMapNodes(nametype);
////				  loadTypeNodes(nametype);
////				  initRuleBarInst('ruleInstBar'); 
////	          }else {
////	        	  loadInst = false;
////	        	  initInstanceGraph();
////	        	  generateGeoView();
////	        	  initRuleBarInst('ruleInstBar'); 
////	          }
////	          setTimeout(function() {switchDeco(selecteddecorator);}, 200);
////	}
////	
////	console.log("initialization complete!");
////}
////============================= CODE ADDED BY SHOABO
//function loadPreviousDesignVariables() {
//	reloadTypesAndConns();
//	reloadRules();
//	reloadDecos();
//	generateBreadcrumb(selecteddecorator);
//}
//
//function reloadTypesAndConns() {
//	if(selectedMetaData){
//		var request = $.ajax({
//			url: apiBaseUrl + "type/connection/all/metadata/"+ selectedMetaData,
//			method: "GET",
//			dataType: "json",
//			async : false
//		});
//		request.done(function (jsonData) {
//			var elements = formatTypesAndConnections(jsonData);		
//		});
//		request.fail(function (xhr, status, error) {
//			if(status = 400 ) {
//				$('#console-log').append("<p style='color:blue'>No Graph Created at this point!.  "+ status+"</p>");
//			}
//			console.log("Error: " + xhr.responseText);
//		});
//		
//	}
//}
//
//function reloadRules() {
//	if (selectedMetaData){
//		var allRuleRequest =$.ajax({
//			type : 'GET',
//			url : apiBaseUrl + 'rule/all/metadata/' + selectedMetaData,
//			dataType : 'json',
//			contentType : 'application/json',
//			async:false
//		});
//		allRuleRequest.done(function (jsonData) {  
//			$.each(jsonData, function(key, value){
//				$.each(value, function(key2,value2){
//					if (key2 == 'name') {
//								if (!ruleMap[value2]) {
//									ruleMap[value2] = value;
//								} 
//					}
//			    });
//		    });
//		});
//		allRuleRequest.fail(function (xhr, status, error) {
//			console.log("Error: " + xhr.responseText);
//			$('#console-log').append("<p style='color:blue'>loading all rules failed: '"+ status+"'</p>");
//		});
//	}
//}
//
//function reloadDecos() {
//	var decoratorRequest =$.ajax({
//		type : 'GET',
//		url : apiBaseUrl + 'deco/all',
//		dataType : 'json',
//		contentType : 'application/json',
//	//	async : false,
//		cache : false,
//	});
//	decoratorRequest.done(function (jsonData) {
//		decos = jsonData.decos;
//		$.each(jsonData.decos, function(key, value){
//			if (!decoMap[value.name]) {
//				decoMap[value.name] = value;
//			}
//			$('#decorator').append("<option  value='"+value.id+"' >"+value.name+"</option>");
//		});	
//	});
//	
//	decoratorRequest.fail(function (xhr, status, error) {
//		$('#decorator').append("<option id='-1'  style='color: red' >No Decorator</option>");
//		$('#console-log').append("<p style='color:red'>Error in Retrieval of Decorators"+xhr.status+"</p>");
//		console.log("Error in Retrieval of Decorators: " + xhr.responseText);
//	});
//}
//
//function prepareDisplayView() {
//	
//    var offsets = document.getElementById('irvCy').getBoundingClientRect();
//    var top = offsets.top;
//    var left = offsets.left;
//    console.log("irvCy is at  top: " + top + "  left :  "+ left);
//    
//    emptyAllInst()
//    if($("#grid-instances").css('visibility') == 'visible'){$("#grid-instances").css({'visibility':'hidden'});}
//	
//	var canvasPhy = document.getElementById("phy_dspl_view_svg");
//	canvasPhy.innerHTML = "";
//	
//	topLevelTab = "instRelViewTab";
//	NodeSelected = null;
//	
//	if (selectedMetaData) {
//		createDisplayTool();
//		
//		switch (selecteddecorator) {
//		case "Logical":
//						if (listTypeIds.length != 0 || listConnIds.length != 0 || nametype != null || nameconn != null) {
//							loadInstNode = false;
//							loadInst = true;
//						    typeMapInst = {}; 
//						    nodeMap = {};
//						    nodeMapInst = {};
//						    historyNode = [];
//						    prevDrilldown =null;
//						    if(irvCy) {irvCy.remove(irvCy.elements());}
//						    if (nametype != null) {
//						    	var id = typeMap[nametype].id;
//						    	listTypeIds.push(parseInt(id));
//						    }
//						    if (nameconn != null) {
//						    	var id = connMap[nameconn].id;
//						    	listConnIds.push(parseInt(id));
//						    }
//						    
//						    
//						    
//						    
//						    typeMapInst[nametype] = typeMap[nametype];
//						    
//						    loadAllTypeNodes();
//						    displayIRVCYCoords('irvCy');
//						    initRuleBarInst('ruleInstBar');
//						} else {
//							emptyAllInst();
//							loadInst = false;
//							historyNode = [];
//							prevDrilldown =null;
//							initInstanceGraph();
//							displayIRVCYCoords('irvCy');
//							initRuleBarInst('ruleInstBar');
//						}
//						break;
//		case "Physical":
//						// TODO: initialize physical display view (dont know what to do)
//						break;
//						
//	
//	}
//	}
//	
//}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
