/**
*  Display View functions
 * Author:	Baya Benrachi
 * Date: 	18 April 2016
 * Update:  01 June 2016
 */
var $gallery1;
var $gallery2;

//==================================================================================================
//Code added 28-10-2016   modified 17-11-2016
function loadNodesOfAType(type){
	var successFunction = function( Data ) {
			if(!$.isArray(Data.nodes)|| !Data.nodes.length){             //   if No Nodes Returned do not change the Instance bar 
	 			$("#console-log").append("No Nodes Instance/ GRAPH for the selected Type");	
	 			(new DisplayLogicalRenderer()).showOrHideGridInstances(true);

	 			$("#nodeForm").append("No Instances Created ");
	 			(new DisplayLogicalRenderer()).loadTypeInstBar(null);
	    	 }else {
	    		 irvCy =  initNodeEdgeGraph(irvCy, "irvCy",  DisplayCytoscapeUtils.formatNodesResponse(Data));
	    		 irvCy.pan({x:230, y:230});
	 		     $("#console-log").append(" Instance GRAPH for the selected Type");	   
	 		    (new DisplayLogicalRenderer()).loadTypeInstBar(nodeMap);

	 		}
		}
		
		var failFunction = function( xhr, status, error ) {
			 $("#console-log").append("Not able to load Nodes of this "+type+"  Error: " + xhr.status);
	    	  console.log("Error: " + xhr.status);
		};
		
		var apis = new apiRomeNext();
		
		apis.loadNodesOfAType(type, successFunction, failFunction );	

}



//=================================================================================
function cancelEdgeCreation(){
	connSelected= null;
	originType = null;
	destType   = null;
	originNode = null;
	destNode = null;
	(new DisplayLogicalRenderer()).initRuleBarInst('ruleInstBar'); 
	mouseEventTime = new Date().getTime();
	pleaseWait = true;
	GlobalUtils.cursor_clear();
	(new DisplayLogicalRenderer()).emptyAllInst();

}

function cancelNodeConnection(){
	connSelected= null;
	originType = null;
	destType   = null;
	originNode = null;
	destNode = null;
	(new DisplayLogicalRenderer()).clearConnectionBarInst();
	mouseEventTime = new Date().getTime();
	pleaseWait = true;
	GlobalUtils.cursor_clear();
	(new DisplayLogicalRenderer()).emptyAllInst();
}


//==================================================================================
function createEdge(rule){
	var rulename = ruleMap[rule.innerHTML];
	console.log("this is the rule selected : "+ rulename.name);
	// user selected a rule to create a connection  -- save the rule
		if(connSelected) {      // previous still there                connSelected has a value
			var change = confirm("Previous rule selected but not done. Do you want to change the rule ");
			if(change) { 
				originType = null;
				destType   = null;
				$(rule).replaceWith( "<span id='highlightRule' title='Select Origin & Destination Type'>" + $( rule ).text() + "</span>" );
				connSelected = rulename;
				mouseEventTime = new Date().getTime();
				pleaseWait = true;
				GlobalUtils.cursor_wait();
			}else {
				// reinitiate the types
				originType = null;
				destType   = null;
				mouseEventTime = new Date().getTime();
				pleaseWait = true;
			}	         	
		}else { // first time that rule is selected  connSelected = null
			originType = null;
			destType   = null;
			$(rule).replaceWith( "<span id='highlightRule' title='Select Origin & Destination Type'>" + $( rule ).text() + "</span>" );
			connSelected = rulename;
			mouseEventTime = new Date().getTime();
			pleaseWait = true;
			GlobalUtils.cursor_wait();
		}
}

//====================================================================
function selectedType(type){         // called only from Display view
	if(type){
		console.log("Inside selectedType function");
		var  stype,  propertyNode;  // user select a Type in the Bar (type/Node)
		historyNode = [];
		stype = type; 
		if (topLevelTab == "instRelViewTab") {   
			  // verify graph already loaded  // type was selected in Design view and Bar has that Type
			 if (document.getElementById("irvCy").style.display == "block") {
							loadTypeNodes(stype);
							$('#console-log').append("<p>Loading All Instance of this type in Instance view  -------"+stype+"</p>");
							centerGraph();
			} else if (document.getElementById("mrvCy").style.display == "block") {
							loadTypeMapNodes(stype);
							$('#console-log').append("<p>Loading All Instance of this type  in Map view -------"+stype+"</p>");
			}
		//  save the value of the Type drilldown	 
			 
		 propertyNode = {value    : stype,
	 			         element  : 'type',
	 			         type     : stype,
	 			         parent : 'none', 
	 			        nodeDetails : null
	 			         }
		 historyNode.push(propertyNode);	 
	    }
	}
}






//===================================================================================
function loadTypeNodes(type){
	// Retrieve  nodes instance for the selected type
//	var loadNodesRequest = $.ajax({
//		url: apiBaseUrl + "node/edge/all/simplified/"+typeMap[type].id+"/metadata/" + selectedMetaData,
//		method: "GET",
//		dataType: "json",
//		async : false
//	});
	
	$('div[role="tooltip"]').remove();
	var successFunction = function( jsonData ) {
//	loadNodesRequest.done(function (jsonData) {
	//	console.log("Returned json has : "+jsonData.nodes);
		if(!$.isEmptyObject(jsonData)){	
			//  verify that we have instance for the selected Type 
			if(!$.isArray(jsonData.nodes)|| !jsonData.nodes.length){             //   if Not do not change the Instance bar 
				$("#console-log").append("No Nodes Instance/ GRAPH for the selected Type"+ type);
				$("#grid-instances").css({'visibility':'visible'});
				(new DisplayLogicalRenderer()).emptyAllInst();
				$("#nodeForm").append("No Instances Created for this Node");
				nodeMap={}; 
				edgeMap = {}; 
				if(irvCy) {irvCy.remove(irvCy.elements());}
			}else {// API returned a set of nodes and edges  
				irvCy = initNodeEdgeGraph(irvCy, "irvCy", DisplayCytoscapeUtils.formatNodesResponse(jsonData));
				irvCy.pan({x:230, y:100});
				
				listTypeIds = typeMap[type].id;			
				$("#console-log").append(" Instance GRAPH for the selected Type"+ type);
			}
		}else {
			$("#console-log").append("No Nodes Instance/ GRAPH for the selected Type"+ type);
			console.log("No Nodes Instance/ GRAPH for the selected Type"+ type);
			$("#grid-instances").css({'visibility':'visible'});
			(new DisplayLogicalRenderer()).emptyAllInst();
			$("#nodeForm").append("No Instances Created for this Node");
			nodeMap={}; 
			edgeMap = {}; 
			if(irvCy) {irvCy.remove(irvCy.elements());}
		}
		};
	
	var failFunction = function( xhr, status, error ) {
//	loadNodesRequest.fail(function (xhr, status, error) {
      $('#console-log').append("Not able to load Type Nodes Error: " + xhr.status);
		console.log("Error: " + xhr.responseText);
	};
	
	var nodeApi = new NodeApis();
	nodeApi.getNodesAndEdgeUnderType( typeMap[type].id , successFunction, failFunction);
	
}

//=====================================================================================
function loadInstanceRelatedNodes_Edges(uuid){
	var typeid = nodeMap[uuid].typeId;
	// load nodes instance for the selected type	
	var successFunction = function( jsonData ) {
		
		if($.isEmptyObject(jsonData) && S.isEmptyObject(jsonData.edges)){
			
			$("#console-log").append("No Nodes Instance/ GRAPH for the selected node"+ uuid);
			(new DisplayLogicalRenderer()).loadTypeInstBar(null);
			
		}else {
			isLoadingChildNodes = true;
			console.log("Returned json has : "+jsonData.edges);
			connSelected = null;    
			var tree ={};					
			tree.nodes =[];
			tree.edges = [];
			
			var result = jsonData.edges;	
			// build the nodes list from edges  
			 result.forEach( function (resEdge ){
				 var nodeUuid = NodeUtils.findUUID( resEdge.destinationNode);
				 
				 resEdge.destinationNode.type = resEdge.destinationNode.name;
				 resEdge.originNode.type      = resEdge.originNode.name;
				 tree.nodes.push(resEdge.destinationNode);
				 tree.edges.push(resEdge);
			 })
			
//			result.forEach(function(resnode) {  tree.nodes.push(resnode.destinationNode);});
			
			DisplayCytoscapeUtils.updateInstanceGraphBatch(irvCy, DisplayCytoscapeUtils.formatUpdateNodesResponse(tree));
			(new DisplayLogicalRenderer()).loadTypeInstBar(nodeMap);
			isLoadingChildNodes = false;
			
		}
		
	};
	
	var failFunction = function( xhr, status, error ) {
		$('#console-log').append("Not able to retrieve Instance Related Nodes: " + xhr.status);
		console.log("Error: " + xhr.responseText);
	};
	
	var nodeApi = new NodeApis();
	nodeApi.getChildNodes( typeid , uuid, successFunction, failFunction);

}



function selectedNode(nodeUuid) {
	if (document.getElementById("irvCy").style.display == "block") {
		// dig into deeper level may be
	} else if (document.getElementById("mrvCy").style.display == "block") {
		// map marker zoom in
		markerZoomIn(nodeUuid);
	}
}

//=============================================================================================\\

function saveLogicalPosition() {
	console.log("Entered 1/old");
	var jsonstrArray1 = [];
	if (irvCy.nodes() == null || irvCy.nodes().length < 1) {
		return;
	}
	//=========================================================================
	//     RETRIEVING ALL NODES POSITIONS
	for (var i = 0; i < irvCy.nodes().length; i++) {
		// Retrieve  Node uuid
		
		var nUuid = null;
		    nUuid = NodeUtils.findUUID(irvCy.nodes()[i].data());
	
//		var props = irvCy.nodes()[i].data().properties;
//		for (var j = 0; j < props.length; j++) {
//			 if(props[j].name=="uuid"){  nUuid = props[j].value }
//		}
		// save it in properties
//		 properties.push({propertyId: "uuid", propertyName: "uuid", 	value: nUuid, propertyType:"STRING"});
		var sysProperties = [], sysprop = {};
		
//		     sysprop["propertyName"] = "uuid";
//		     sysprop["propertyType"] = "STRING";
//		     sysprop["value"]        = nUuid;
		     
		     sysProperties.push({ propertyName: "uuid",propertyType:"STRING", value: nUuid});
		                                  
		var newDecoProperties = [];
        // Retrieve  the positions of the node
		newDecoProperties.push({propertyName: "x", value: irvCy.nodes()[i].position().x.toString(), propertyType:"DOUBLE", romeDecoPropId: "1"});
		newDecoProperties.push({propertyName: "y", value: irvCy.nodes()[i].position().y.toString(), propertyType:"DOUBLE", romeDecoPropId: "2"});
		
		// create a json for that node with its type, uuid and positions
		var jsonstr = {
				type: typeMap[irvCy.nodes()[i].data().type].id,
				sysProperties: sysProperties,
				newDecoProperties: newDecoProperties, 
				decorators       : nodeMap[nUuid].decorators
		};
		
		jsonstrArray1.push(jsonstr);
		
	}
	//=========================================================================
	//        SAVING NODES POSITIONS
	var successFunction = function( data ) {
		console.log("Successfully Saved Graph Nodes position: ");
		$('#console-log').append("<p style='color:green'>Successfully Saved Graph Nodes position</p>");
		$.each(data.nodes, function(key, value) {
			var uuid = null;
			uuid = NodeUtils.findUUID(value);
			
//			value.properties.forEach(function(prop) {
//				if(prop.name == "uuid"){
//					uuid = prop.value;
//				}
//			});
			if (uuid != null) {
				nodeMap[uuid].decoProperties = value.decoProperties;
			}
		});		
	};
	
	var failFunction = function( xhr, status, error ) {
		$('#console-log').append("<p style='color:red'>Can not save Graph Nodes position" + xhr.status + "</p>");
		console.log("Save position error: "+ xhr.responseText);
	};
	
	var apis = new apiRomeNext();
	
	apis.saveLogicalPosition(jsonstrArray1, successFunction, failFunction );	
	
	
	
	//===========================================================================
	//   RETREIVING   ALL EDGES POSITIONS 
	var jsonstrArray2 = [];

	if (irvCy.nodes() == null || irvCy.nodes().length < 1 || irvCy.edges() == null || irvCy.edges().length < 1) {
		return;
	}
	
	for (var i = 0; i < irvCy.edges().length; i++) {	
		
		
		var eUuid = NodeUtils.findUUID(irvCy.edges()[i].data());
		
//		var props = irvCy.edges()[i].data().properties;
//		for (var j = 0; j < props.length; j++) {
//			 if(props[j].name=="uuid"){  eUuid = props[j].value }
//		}
		
		var sysProperties = [], sysprop = {};
//	     sysprop["propertyName"] = "uuid";
//	     sysprop["propertyType"] = "STRING";
//	     sysprop["value"]        = eUuid;
//	     
//	     sysProperties.push({uuid: sysprop});
	     sysProperties.push({ propertyName: "uuid",propertyType:"STRING", value: eUuid});
		
		
		var decoProps = [];
		// Will store the substraction between the target and source
		decoProps.push({propertyName: "x", value: (irvCy.edges()[i].target().position().x - irvCy.edges()[i].source().position().x).toString(), propertyType: "DOUBLE", romeDecoPropId: "1"});
		decoProps.push({propertyName: "y", value: (irvCy.edges()[i].target().position().y - irvCy.edges()[i].source().position().y).toString(), propertyType: "DOUBLE", romeDecoPropId: "2"});
		decoProps.push({propertyName: "z", value: "0", propertyType:"DOUBLE", romeDecoPropId:"3"});
		
		var jsonstr = {
//				ruleName: irvCy.edges()[i].data().name,
				connection : irvCy.edges()[i].data().connectionId,
//				uuid: eUuid,
				edgeSysProperties : sysProperties,
				
				originType: typeMap[irvCy.edges()[i].source().data().type].id,
				destinationType: typeMap[irvCy.edges()[i].target().data().type].id,
				newEdgeDecoProperties: decoProps
			
		};	
		jsonstrArray2.push(jsonstr);	
	}
	
	
	//================================================================================================
	//    SAVING ALL EDGES POSITIONS
		
		var doneFunction = function( data ) {
			console.log("Successfully Saved Graph Edges position: ");
			$('#console-log').append("<p style='color:green'>Successfully Saved Graph Edges position</p>");	
			
			
			
		};
		
		var failFunction = function( xhr, ajaxOptions, error ) {
			$('#console-log').append("<p style='color:red'>Can not save position" + xhr.status + "</p>");
			console.log("Save position error: "+ xhr.responseText);
		};
		
		var apis = new apiRomeNext();
		
		apis.saveEdgeBatch(jsonstrArray2, doneFunction, failFunction);
		
	
}

function restoreLogicalLayout() {	

}

function resetLogicalLayout() {
	
}

function previousLogicalLayout() {

}

//=================================================================================================
function typeNodeBarDraggable() {
	
	$(function() {
		//$("#grid-instances").css({'visibility':'visible'});
		console.log("making type and node bar draggable!");
		
		$gallery1 = $( "#typeBar2" );
		$gallery2 = $( "#typeInstBar" );
		
	    // let the gallery items be draggable
	    $('td', $gallery1).draggable({
	      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
	      revert: "invalid", // when not dropped, the item will revert back to its initial position
	      containment: "document",
	      helper: "clone",
	      cursor: "move",
	      create: function() {
	          $(this).css({'zIndex': 1000});
	      },
	      start:function() {
	          $(this).css({'zIndex': 1000});
	      },
	      stop:function() {
	    	  $(this).css({'zIndex': 1000});
	      }
	    });
	    
	    // let the gallery items be draggable
	    $('td', $gallery2).draggable({
	      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
	      revert: "invalid", // when not dropped, the item will revert back to its initial position
	      containment: "document",
	      helper: "clone",
	      cursor: "move",
	      create: function() {
	          $(this).css({'zIndex': 1000});
	      },
	      start:function() {
	          $(this).css({'zIndex': 1000});
	      },
	      stop:function() {
	    	  $(this).css({'zIndex': 1000});
	      }
	    });
	    var element; 
	    var $workspace1 = $("#irvCy");
	    $workspace1.droppable({
	    	accept: "td",
	        activeClass: "ui-state-highlight",
	        drop: function(event, ui) {
	        	// this needs to test for typeBar2 and typeInstBar == could be a Type   or a Node instance
	        	
	        	dragItemPositionX=0; dragItemPositionY=0;
	        	var offset = $("#irvCy").offset();
	            
	         // Get mouse position relative to drop target: 
            
	            dragItemPositionX = event.originalEvent.pageX - offset.left ;
	            dragItemPositionY = event.originalEvent.pageY - offset.top;
	            
	            console.log("Dropped at  X: "+dragItemPositionX + " Y:  "+dragItemPositionY);	            
      	
		        if (!isNaN(ui.helper.children()[0].id)) {
		        	
		        	var name = ui.helper.children()[0].innerHTML; 
		        	if (name.includes("<")){
		        		name = name.substring(0, name.indexOf('<'));
			        	console.log("Found this "+name);
			        	}	        	
			       	checkTypeIsRoot(name);
		        	
		        } else {
		        	console.log(ui);
		        	// got the name of the node
		        	var nodeName = ui.helper.children()[0].innerHTML;
		        	console.log("dragged this node "+ nodeName);
		        	if (loadInstNode) { element = nodeMapInst[nodeName];                    
		        	                    // create a similar node        		
		        	}else {
		        		element = nodeMap[nodeName];	        		
		        	}
		        	
		        }
	        }
//	        drop: function() {console.log(this);}
	    });
	    
	    var $workspace2 = $("#mrvCy");
	    $workspace2.droppable({
	    	accept: "td",
	        activeClass: "ui-state-highlight",
	        drop: function(event, ui) {
	        	fLat = cLat;
	        	fLng = cLng;
		        if (!isNaN(ui.helper.children()[0].id)) {
		        	checkTypeIsRoot(ui.helper.children()[0].innerHTML);
		        } else {
		        	updateNodeLatLng(ui.helper.children()[0].id);
		        }
	        }
//	        drop: function() {console.log(this);}
	    });
	    
	    var $workspace_pdsv = $("#phy_dspl_view");
	    
	    $workspace_pdsv.droppable({
	    	accept: "*",
	        activeClass: "ui-state-highlight",
	        drop: function() {showAddPhysicalInstDialog();}
	    });
	    
		
	});
	
}
//==========================================================================================
//                      UTILITIES 
//
//==========================================================================================
//                  RETRIEVE NODE NAME for Display
function retrieveNameFromProps( nodeDetails){
	var props = nodeDetails.properties, nameNode;
    var display = $.grep(props, function(i, prop) {
    	 if(i.name == 'name') {
    		                    nameNode = i.value;
    		 					}
     })
     // display the name if exits or type of node 
     if (nameNode ) { nodeDetails.cyDisplay = nameNode}
     else {nodeDetails.cyDisplay ='' + '(' + nodeDetails.type + ')' ;}
	return nodeDetails;
	
}

//===========================================================================================
//                    CLEAR PHYSICAL DISPLAY VIEW
function removeAllPhysicalDisplayView() {	
 	var canvasPhy = document.getElementById("phy_dspl_view_svg");
 	canvasPhy.innerHTML = "";
 }
//==========================================================================================
function retrieveBar(source){  // retrieving types from NodeMap
	typeMapInst ={}; 
	if(!loadInst) { (new DisplayLogicalRenderer()).setTypeNB(); }
	var elementBase = {}, element;
	if(source != null){
		$.each(source, function(key, value){
			 element = value.type;
			 elementBase = typeMap[element]; 
			if (!typeMapInst[element]) {
				 elementBase.nb =  1;
				 typeMapInst[element] = elementBase;
			}else { typeMapInst[element].nb = typeMapInst[element].nb + 1}
		});
	}
	(new DisplayLogicalRenderer()).initNodeBar('typeBar2');
}




