/**
*  Display View functions
 * Author:	Baya Benrachi
 * Date: 	18 April 2016
 * Update:  01 June 2016
 */
var $gallery1;
var $gallery2;
//================== Initiate the Type Bar ==========================================
function initTypeBar(bar){
	console.log("Initializing the type bar for display using initType function!!!" + bar  + "with loadInst == " +loadInst);
	var elementsBar = {};	
	elementsBar = typeMap;
	var nb = Object.keys(elementsBar).length;
	var inputs = '';
	if( nb != 0 ){
		inputs ="<table id='typesList'><tr>";
		inputs += "<td><span class='badge'>*("+nb+")</span></td>";
		$.each(elementsBar, function(key, value){
			inputs += "<td ><button type='button' style='color:black; background:"+value.color+"' id='"+value.id+"'  onclick=\"selectedType('" + value.name + "')\"  >"+key;
			if (loadInst) { inputs += "<span class='badge'>";
			                if(value.nb){ inputs += value.nb;}
			                else{ inputs += '0';}
			                inputs += "</span>";}
			inputs += "</button></td>";
			});
		inputs +="</tr></table>";
		document.getElementById(bar).innerHTML = inputs;
		typeNodeBarDraggable();
	}else {    			
			inputs += "<p> No Type created yet</p>";	
		    document.getElementById(bar).innerHTML = inputs;
	}
	
}

//function initNodeBar(bar){
//	var elementsBar = {};
//	elementsBar = typeMapInst;	
//	var nb = Object.keys(elementsBar).length;
//	var inputs = '';
//	if( nb != 0 ){
//		inputs ="<table id='typesList'><tr>";
//		inputs += "<td><span class='badge'>*("+nb+")</span></td>";
//		$.each(elementsBar, function(key, value){
//			inputs += "<td ><button type='button' style='color:black; background:"+value.color+"' id='"+value.id+"'  onclick=\"selectedType('" + value.name + "')\"  >"+key;
//			inputs += "<span class='badge'>";
//			                if(value.nb){ inputs += value.nb;}
//			                else{ inputs += '0';}
//			inputs += "</span>";
//			inputs += "</button></td>";
//			});
//		inputs +="</tr></table>";
//		document.getElementById(bar).innerHTML = inputs;
//		typeNodeBarDraggable();
//	}else {    			
//			inputs += "<p> No Type is created yet</p>";
//		    document.getElementById(bar).innerHTML = inputs;
//	}
//	
//}



//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
function initInstTypeBar(bar){
	console.log("Initializing the type bar for Display using initInstTypeBar!!!" + bar  );
	var elementsInstBar = {};
	var inputs = ''; var nodeName;
	if(loadInstNode)  {  elementsInstBar = nodeMapInst}
	else { elementsInstBar = nodeMap   }
	var nb = Object.keys(elementsInstBar).length;
	if( nb != 0 ){
		inputs ="<table id='nodesList'><tr>";
		inputs += "<td><span class='badge'>*("+nb+")</span></td>";
		$.each(elementsInstBar, function(key, value){
			if(value.cyDisplay != '') { nodeName = value.cyDisplay; }
			else {nodeName ='('+ value.type+')'}
			inputs += "<td  ><span class='badge' style='color:black; background:"+value.color+"' id='"+key+"'  onclick=\"selectedNode('" + key + "')\">"+nodeName+"</span></td>";
		});
		inputs +="</tr></table>"
		document.getElementById(bar).innerHTML = inputs;
		typeNodeBarDraggable();
	}else {    
		inputs += "<p> No Instance Nodes created</p>";
		document.getElementById(bar).innerHTML = inputs;
	}
}
//==================== Selecting a Rule is Creating an edge    ========================================
//function initRuleBarInst(bar){
//	var nb = Object.keys(ruleMap).length;
//	var inputs = '';
//	if(nb != 0) {
//		inputs ="<table id='ruleList'><tr>";
//		inputs += "<td><span class='label label-default'>*("+nb+")</span></td>";
//		$.each(ruleMap, function(key, value){		
//			inputs += "<td><span";
//			if (value.classification == "parentchild") {
//				inputs += " class='label label-primary' " ;	
//			} else if (value.classification == "link") {
//				inputs += " class='label label-success' ";	
//			} else {
//				console.log("Classification Is Wrong: " + value.id);
//			}	    
//			inputs += " id="+value.id+" title='create an edge'  data-content='select Origin & destination Types'   onclick='createEdge(this);'  >"+key+"</span></td>"
//			});
//		inputs +="</tr></table>";
//		document.getElementById(bar).innerHTML = inputs;
//	} else {
//			inputs += "<p> No Rules created yet</p>";   
//			document.getElementById(bar).innerHTML = inputs;
//			}
//}


//===================================================================================
//Load only  Nodes & Edges under the selected metaDataRepo
//function initInstanceGraph() {
//	var successFunction = function( jsonData ) {
//		console.log(jsonData);
//		if(!$.isArray(jsonData.nodes)|| !jsonData.nodes.length){
//			if(irvCy) {irvCy.remove(irvCy.elements());}	
//			$("#console-log").append("No Nodes Instance GRAPH ");	
//			(new DisplayLogicalRenderer()).showOrHideGridInstances(true);
//			$("#nodeForm").append("No Nodes Instance created Yet");
//			loadTypeInstBar(null);
//		}else {                                                             // API returned a set of nodes and edges  
//			irvCy = initNodeEdgeGraph(irvCy, "irvCy", CytoscapeUtils.formatNodesResponse(jsonData));
////			irvCy.pan({x:230, y:230});
////			retrieveBar(nodeMap);
//			loadTypeInstBar(nodeMap);
//			
//		}	
//	};
//	
//	var failFunction = function( xhr, status, error ) {
//		console.log("Error: " + xhr.responseText);
//		 $('#console-log').append("Error: Not able to load Nodes " + xhr.status);
//	};
//		
//	var apis = new apiRomeNext();	
//	apis.initInstanceGraph( successFunction, failFunction );
//}

//==================================================================================================
//Code added 28-10-2016   modified 17-11-2016
function loadNodesOfAType(type){
	var successFunction = function( Data ) {
			if(!$.isArray(Data.nodes)|| !Data.nodes.length){             //   if No Nodes Returned do not change the Instance bar 
	 			$("#console-log").append("No Nodes Instance/ GRAPH for the selected Type");	
	 			(new DisplayLogicalRenderer()).showOrHideGridInstances(true);

	 			$("#nodeForm").append("No Instances Created ");
	 			(new DisplayLogicalRenderer()).loadTypeInstBar(null);
//	 			retrieveBar(null);
//		        initTypeBar('typeBar2');
	    	 }else {
	    		 irvCy =  initNodeEdgeGraph(irvCy, "irvCy",  DisplayCytoscapeUtils.formatNodesResponse(Data));
	    		 irvCy.pan({x:230, y:230});
	 		     $("#console-log").append(" Instance GRAPH for the selected Type");	   
	 		    (new DisplayLogicalRenderer()).loadTypeInstBar(nodeMap);
//	 	         retrieveBar(nodeMap);          // Build the bar from the list of Nodes uploaded
	 		}
		}
		
		var failFunction = function( xhr, status, error ) {
			 $("#console-log").append("Not able to load Nodes of this "+type+"  Error: " + xhr.status);
	    	  console.log("Error: " + xhr.status);
		};
		
		var apis = new apiRomeNext();
		
		apis.loadNodesOfAType(type, successFunction, failFunction );	

}







function setCoordinates(value, x, newx) {
	for (var i = 0; i < value.length; i++) {
		if (value[i].name == x) {
			value[i].value = newx;
		}
	}
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
	var loadNodesRequest = $.ajax({
//		url: apiBaseUrl + "node/edge/all/simplified/"+type+"/metadata/" + selectedMetaData ,
		url: apiBaseUrl + "node/edge/all/simplified/"+typeMap[type].id+"/metadata/" + selectedMetaData,
		method: "GET",
		dataType: "json",
		async : false
	});
	
	$('div[role="tooltip"]').remove();
	loadNodesRequest.done(function (jsonData) {
	//	console.log("Returned json has : "+jsonData.nodes);
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
			
//			nametype = type;
			
			$("#console-log").append(" Instance GRAPH for the selected Type"+ type);
		}
	});
	
	loadNodesRequest.fail(function (xhr, status, error) {
      $('#console-log').append("Not able to load Type Nodes Error: " + xhr.status);
		console.log("Error: " + xhr.responseText);
	});
	
	
}
//================================= Load All Types Nodes =====================================
/**
 * THIS IS DEPRECATED
 * You should be using the NodeUtils classs to call this.
 * 
 * Left here until the logical Display is redone in a decorator format in the future.
 * JPL: Jan 2017
 * 
 */
//function loadAllNodes(){
//	var jsonData={};
//	nodeMap={}; 
//	edgeMap = {};
//	if(irvCy) {irvCy.remove(irvCy.elements());}
//	//  if available list (types selected) of Types Add this to the Json
//	if (listTypeIds.length != 0 ){jsonData.typeIds = listTypeIds;}
//	//   if available list (connections selected) of Connections Add this to the Json
//	if (listConnIds.length != 0 ){jsonData.connIds = listConnIds;}
//	console.log(jsonData);
//	
//	
//	//       CALL API
//	var successFunction = function( Data ) {
//		 if(!$.isArray(Data.nodes)|| !Data.nodes.length){             //   if No Nodes Returned do not change the Instance bar 
//	 			$("#console-log").append("No Nodes Instance/ GRAPH for the selected Type");		
//	 			$("#grid-instances").css({'visibility':'visible'});
//	 			$("#nodeForm").empty();
//	 			$("#nodeForm").append("No Instances Created ");  
////	 			Should load all types with 0 instances
//	 			loadTypeInstBar(null);
//
//	    	 }else {
//	    		 irvCy =  initNodeEdgeGraph(irvCy, "irvCy",  CytoscapeUtils.formatNodesResponse(Data));
//
//	 		     $("#console-log").append(" Instance GRAPH for the selected Type");	     
//         // Build the bar from the list of Nodes uploaded
//	 	         loadTypeInstBar(nodeMap);
//	 		}
//	}
//	var failFunction = function( xhr, status, error ) {
//		    $("#console-log").append("Not able to load Type Nodes Error: " + xhr.status);
//   	        console.log("Error: " + xhr.responseText); 
//	}
//	
//	var apis = new apiRomeNext();	
//	apis.loadAllNodes( jsonData, successFunction, failFunction );
//
//     
//}


//=====================================================================================
function loadInstanceRelatedNodes_Edges(uuid){
	// load nodes instance for the selected type
	var loadSubGraphRequest = $.ajax({
		url: apiBaseUrl + "node/end/edge/all/simplified/metadata/"+ selectedMetaData +"/uuid/"+uuid  ,
		method: "GET",
		dataType: "json",
		async : false
	});
	
	loadSubGraphRequest.done(function (jsonData) {
		if(!$.isArray(jsonData.nodes)|| !jsonData.nodes.length){                 // Returned json is empty no nodes 
			$("#console-log").append("No Nodes Instance/ GRAPH for the selected node"+ uuid);
			(new DisplayLogicalRenderer()).loadTypeInstBar(null);
		}else {
			    isLoadingChildNodes = true;
				console.log("Returned json has : "+jsonData);
				connSelected = null;           
				updateInstanceGraphBatch(irvCy, formatUpdateNodesResponse(jsonData));
				(new DisplayLogicalRenderer()).loadTypeInstBar(nodeMap);
				isLoadingChildNodes = false;
				
		}
	});
	loadSubGraphRequest.fail(function (xhr, status, error) {
					$('#console-log').append("Not able to retrieve Instance Related Nodes: " + xhr.status);
					console.log("Error: " + xhr.responseText);
	});
}

//======================  General !!!! to check ====================================

function updateInstanceGraph(cy, element) {                // could be called after adding a Node or Edge 

	var newElement;
	// found out where we are (should be in Instance view)
	
	if (cy.$('#' + element.data.id + '').length == 0) {
		if (cy) {
//			 newElement = cy.add(element, true);
			 if (element.group == 'nodes')    { 
				 newElement = cy.add(element, true);
				 attachNodeClickActions(newElement.filter('node')); 
			 }
			 else if(element.group == 'edges'){
				 if (cy.nodes("[id='" + element.data.source + "']").length != 0 && cy.nodes("[id='" + element.data.target + "']").length != 0) {
					 newElement = cy.add(element, true);
					 attachEdgeClickActions(newElement.filter('edge')); 
				 }
			 };
		} else {
			var nodes = [];
			nodes.push(element);
			setTimeout(function() {irvCy =  initNodeEdgeGraph(irvCy, "irvCy",  nodes); irvCy.pan({x:230, y:100});
			}, 100);
		}
		
	} else {
		// This only work for updating existing nodes, not work for edges yet
		// not sure should change the id or not
		cy.$('#' + element.data.id + '').data("color", element.data.color);
		cy.$('#' + element.data.id + '').data("cyDisplay", element.data.cyDisplay);
		cy.$('#' + element.data.id + '').data("decoProperties", element.data.decoProperties);
		cy.$('#' + element.data.id + '').data("properties", element.data.properties);
		cy.$('#' + element.data.id + '').data("type", element.data.type);
	}


};

function updateInstanceGraphBatch(cy, elements) {                // could be called after adding a Node or Edge 

	var i;
	for (i = 0; i < elements.length; i++) {
		if (cy.$('#' + elements[i].data.id + '').length == 0) { // if element is not already in the graph 
			var newElement;
			// This works for updating both new nodes and edges
//			newElement = cy.add(elements[i], true);
			 if (elements[i].group == 'nodes') { 
				 newElement = cy.add(elements[i], true);
				 attachNodeClickActions(newElement.filter('node')); 
			 }
			 else if(elements[i].group == 'edges'){ 
				 if (cy.nodes("[id='" + elements[i].data.source + "']").length != 0 && cy.nodes("[id='" + elements[i].data.target + "']").length != 0) {
					 newElement = cy.add(elements[i], true);
					 attachEdgeClickActions(newElement.filter('edge')); 
				 }
			 };
		
		} else {
			// This should work for updating existing nodes and edges
			console.log("Do nothing for now.");
		}		
	}

};

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
	console.log("Entered base/old");
	var jsonstrArray1 = [];
	if (irvCy.nodes() == null || irvCy.nodes().length < 1) {
		return;
	}
	//=========================================================================
	//     RETRIEVING ALL NODES POSITIONS
	for (var i = 0; i < irvCy.nodes().length; i++) {
		// Retrieve  Node uuid
		var nUuid;
		var props = irvCy.nodes()[i].data().properties;
		for (var j = 0; j < props.length; j++) {
			 if(props[j].name=="uuid"){  nUuid = props[j].value }
		}
		// save it in properties
		var properties = [];
		properties.push({propertyName: "uuid", value: nUuid, propertyType:"STRING"});
		var newDecoProperties = [];
        // Retrieve  the positions of the node
		newDecoProperties.push({propertyName: "x", value: irvCy.nodes()[i].position().x.toString(), propertyType:"DOUBLE", romeDecoPropId: "1"});
		newDecoProperties.push({propertyName: "y", value: irvCy.nodes()[i].position().y.toString(), propertyType:"DOUBLE", romeDecoPropId: "2"});
		// create a json for that node with its type, uuid and positions
		var jsonstr = {
				type: typeMap[irvCy.nodes()[i].data().type].id,
				properties: properties,
				newDecoProperties: newDecoProperties
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
			value.properties.forEach(function(prop) {
				if(prop.name == "uuid"){
					uuid = prop.value;
				}
			});
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
		var eUuid;
		var props = irvCy.edges()[i].data().properties;
		for (var j = 0; j < props.length; j++) {
			 if(props[j].name=="uuid"){  eUuid = props[j].value }
		}
		
		var decoProps = [];
		// Will store the substraction between the target and source
		decoProps.push({propertyName: "x", value: (irvCy.edges()[i].target().position().x - irvCy.edges()[i].source().position().x).toString(), propertyType: "DOUBLE", romeDecoPropId: "1"});
		decoProps.push({propertyName: "y", value: (irvCy.edges()[i].target().position().y - irvCy.edges()[i].source().position().y).toString(), propertyType: "DOUBLE", romeDecoPropId: "2"});
		decoProps.push({propertyName: "z", value: "0", propertyType:"DOUBLE", romeDecoPropId:"3"});
		
		var jsonstr = {
				ruleName: irvCy.edges()[i].data().name,
				uuid: eUuid,
				originType: typeMap[irvCy.edges()[i].source().data().type].id,
				destinationType: typeMap[irvCy.edges()[i].target().data().type].id,
				decoProperties: decoProps
			
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

//===============================================================================================
//============================= RELOAD PREVIOUS DATA ===============================================
//function loadPreviousDesignVariables() {
//	reloadTypesAndConns();
//	reloadRules();
//	reloadDecos();
//	generateBreadcrumb(selecteddecorator);
//}
//===========================================================================================================
//function reloadTypesAndConns() {	
//	var successFunction = function( jsonData ) {
//		GlobalUtils.buildTypeAndConnVars(jsonData);
//		var elements = DesignCytoscapeUtils.formatTypesAndConnections();
//	};
//	
//	var failFunction = function( xhr, status, error ) {
//		if(status = 400 ) {
//			$('#console-log').append("<p style='color:blue'>No Graph Created at this point!.  "+ status+"</p>");
//		}
//		console.log("Error: " + xhr.responseText);
//	};
//	
//	var apis = new apiRomeNext();	
//	apis.getAllTypesAndConnections( successFunction, failFunction );
//}
//===============================================================================================
/**
 * This needs to be moved to a RulesUtils class
 * TODO: Move this somewhere else
 */
//function reloadRules() {
//	
//	var successFunction = function( jsonData ) {
//		$.each(jsonData, function(key, value){
//			
//			if( !ruleMap[ value.name ] ) {
//				ruleMap[ value.name ] = value;
//				ruleMapViaId[ value.id ] = value;
//			}
//			
//			// old code
//			// which is WRONG i think - jplee Jan 2017
////			$.each(value, function(key2,value2){
////				if (key2 == 'name') {
////							if (!ruleMap[value2]) {
////								ruleMap[value2] = value;
////							} 
////				}
////		    });
//	    });
//	};
//	
//	var failFunction = function( xhr, status, error ) {
//		console.log("Error: " + xhr.responseText);
//		$('#console-log').append("<p style='color:blue'>loading all rules failed: '"+ status+"'</p>");
//	};
//	
//	var apis = new apiRomeNext();
//	
//	apis.getAllRules(successFunction, failFunction);
//}
//================================================================================================
//function reloadDecos() {
//	
//	var successFunction = function( jsonData ) {
//		decos = jsonData.decos;
//		$.each(jsonData.decos, function(key, value){
//			if (!decoMap[value.name]) {
//				decoMap[value.name] = value;
//			}
//			$('#decorator').append("<option  value='"+value.id+"' >"+value.name+"</option>");
//		});	
//	};
//	
//	var failFunction = function( xhr, status, error ) {
//		$('#decorator').append("<option id='-1'  style='color: red' >No Decorator</option>");
//		$('#console-log').append("<p style='color:red'>Error in Retrieval of Decorators"+xhr.status+"</p>");
//		console.log("Error in Retrieval of Decorators: " + xhr.responseText);
//	};
//	
//	var apis = new apiRomeNext();
//	
//	apis.getallDecos( successFunction, failFunction);
//	
//}
//==========================================================================================
//function prepareDisplayView() {
//	 
//	(new DisplayLogicalRenderer()).emptyAllInst()
//    (new DisplayLogicalRenderer()).showOrHideGridInstances(false);   
//    removeAllPhysicalDisplayView();
//	
//	topLevelTab = "instRelViewTab";
//	NodeSelected = null;
//	LD_FocussedNode = null;
//	prevDrilldown =null;
//	historyNode = [];
//	if (selectedMetaData) {		
//		var toolbarManager = new toolbarManagerRomeNext();
//		toolbarManager.createDisplayTool();	
//
//		
//		switch (selecteddecorator) {
//		case "Logical":
//						if (listTypeIds.length != 0 || listConnIds.length != 0 || nametype != null || nameconn != null) {
//							loadInstNode = false;
//							loadInst = true;
//						    typeMapInst = {}; 
//						    nodeMap = {};
//						    nodeMapInst = {};
//						    if(irvCy) {irvCy.remove(irvCy.elements());}
//						    if (nametype != null) {
//						    	var id = typeMap[nametype].id;
//						    	if(!listTypeIds[id]) {listTypeIds.push(parseInt(id));}
//						    }
//						    if (nameconn != null) {
//						    	var id = connMap[nameconn].id;
//						    	if(!listConnIds[id]) {listConnIds.push(parseInt(id));}
//						    }
//						    if(listTypeIds.length != 0) {
//						    	   for (i=0; i<listTypeIds.length; i++ ){	
//						    			$.each(typeMap, function(key, value){
//						    				if(value.id == listTypeIds[i]) {  value.nb = 0; typeMapInst[key] = typeMap[key];   }
//						    			});
//						    	   }                 
//						    }
//						    loadAllNodes();
//						} else {
//							(new DisplayLogicalRenderer()).emptyAllInst();
//							loadInst = false;
//							NodeUtils.loadAllNodesAndEdges();
//							(new DisplayLogicalRenderer()).loadView();
////							initInstanceGraph();                // should display TypeBar with all nodes counted
//						}
//						initRuleBarInst('ruleInstBar');
//						
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
//                 SHOW/HIDE   GRID INSTANCES DIV
//function showOrHideGridInstances(value){
//	 if(value){
//		 if($("#grid-instances").css('visibility') == 'hidden'){$("#grid-instances").css({'visibility':'visible'});}
//	 }else {
//		 if($("#grid-instances").css('visibility') == 'visible'){$("#grid-instances").css({'visibility':'hidden'});}
//	 }
//}
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


//function setTypeNB(){
//	typeMapInst = typeMap;
//	var elementBase = {};
//	$.each(typeMapInst, function(key, value){
//		 elementBase = value; 
//		 elementBase.nb = 0;
//		typeMapInst[key] =elementBase;
//	})
//	
//}

//function loadTypeInstBar(source){
//	typeMapInst ={}; 
//	setTypeNB();
//	var elementBase = {}, element;
//	if(source != null){
//		$.each(source, function(key, value){
//			 element = value.type;
//			 elementBase = typeMap[element]; 
//             typeMapInst[element].nb = typeMapInst[element].nb + 1;
//		});
//	}
//	initNodeBar('typeBar2');
//}



