/**
 * 
 */
//===============================================================================================
function drillDownNode(node){
	if(!node){
		console.log("No node passed. ERROR!!!");
		return;
	}
	// needed  local variables 
	var top, tree={}, result, parent , propertyNode={}, index = 0;
	// check if it is not the last node drilldown already
	if(historyNode.length != 0){   // prevDrilldown should be the last drilldown node
	  top = historyNode.slice(-1)[0];
	  console.log("top element is :"+top.type);
      if(top.value == node) {
    	console.log("node already drilldown. Do Nothing !!!!!!!!!!");
    	$("#console-log").append("Already drilldown this node !!!!!!!!!!");
    	return;
      }
      if(top.element == 'node') parent = top.value;
	}else {
		parent ='none';
		index = listTypeIds;
		document.getElementById("display_logical_return").style.visibility = "visible";
//		Need to know where we start
	}
	
	//  display the children of the node & in the typebar display possible Type children
	console.log("DrilldownNode NodeSelected value is: "+ NodeSelected + " focussed Node is : "+ LD_FocussedNode);
    loadInst = true; 
     
    
    var successFunction = function( jsonData ) {
    	propertyNode = {
			     value : node,
			     element  : 'node',
			     type : nodeMap[node].type,
			     parent: parent,
			     nodeDetails : LD_FocussedNode, 
			     from : index
			     };	
		prevDrilldown = LD_FocussedNode;
		historyNode.push(propertyNode);
		
		
		if(!$.isArray(jsonData.nodes)|| !jsonData.nodes.length){                 // Returned json is empty no nodes 
			$("#console-log").append("No children nodes for the selected "+ node);
			if(irvCy){
				irvCy.remove(irvCy.elements());
			    nodeMapInst = nodeMap[node];
	            nodeMap={}; 		
	          }		
		      console.log(" No children for the selected Node");
		      $('#nodeForm').append("<p style='color:red'>No children nodes for the selected</p> ");
		      NodeSelected = null;
		      (new DisplayLogicalRenderer()).loadTypeInstBar(nodeMap);  
		}else {
//			    Remove the edges 
				connSelected = null;
				delete jsonData.edges;			
				tree.nodes =[];
//				Get the parent node and remove it 
				result = removeParentNode(jsonData.nodes, node);
				(new DisplayLogicalRenderer()).emptyAllInst();
				result.forEach(function(resnode) {  tree.nodes.push(resnode);});
				irvCy = initNodeEdgeGraph(irvCy, "irvCy", DisplayCytoscapeUtils.formatNodesResponse(tree));	// nodeMap && edgeMap is reinitialised	
				NodeSelected = null;
				(new DisplayLogicalRenderer()).loadTypeInstBar(nodeMap);
		}
    }
    
    
	var failFunction = function( xhr, status, error ) {
		$('#console-log').append("Not able to retrieve Instance Related Nodes: " + xhr.status);
		console.log("Error: " + xhr.status);
	};
    
	var apis = new apiRomeNext();
	
	apis.loadSubGraph(node, successFunction, failFunction );	
    
	
}
//===============================================================================================
//=================  Function to return up to higher level of nodes =============================
//===============================================================================================
function RetunUplevel(){
	var nodetop, lastUuid, tree={}, result;
	if ((selectedMetaData != null) && ( topLevelTab == 'instRelViewTab')){
		if(!$.isArray(historyNode)|| !historyNode.length){ // no drilling down history is empty
			 document.getElementById("display_logical_return").style.visibility = "hidden";			
			 nodeMapInst={};
			 NodeSelected = null;
			 prevDrilldown = null;
			 LD_FocussedNode = null;
			 NodeUtils.loadAllNodesAndEdges();
			 (new DisplayLogicalRenderer()).loadView();
//			 initInstanceGraph(); 
		}else{
			  console.log(" NodeSelected is : "+ NodeSelected + " nodeMapInst has "+ nodeMapInst);
			  nodetop   = historyNode.pop();                        // get Top of History
	
			  if(nodetop.parent == 'none'){
				  if (document.getElementById("irvCy").style.display == "block") {		
						  LD_FocussedNode = null;
						  prevDrilldown = null;
//						  initInstanceGraph();
						  if(nodetop.from == 0 ){
							  NodeUtils.loadAllNodesAndEdges();
							  (new DisplayLogicalRenderer()).loadView();
//							  initInstanceGraph(); 		
				         }else {
				        	 loadNodesOfAType(typeMap[nodetop.type].id);
				         }
						  
						  if(document.getElementById('drilldown')){
								 drilldown = document.getElementById('drilldown');
								document.getElementById('drilldown').innerHTML='';
								}
						  (new DisplayLogicalRenderer()).emptyAllInst();
					
								
					} else if (document.getElementById("mrvCy").style.display == "block") {
						loadMapNodesOfType(nodetop.type);
					}
			  }else {

					  if (document.getElementById("irvCy").style.display == "block") {
	  		             // load the children of the node parent
						  				  
						  var successFunction = function( jsonData ) {
								if(!$.isArray(jsonData.nodes)|| !jsonData.nodes.length){                 // Returned json is empty no nodes 
									$("#console-log").append("No children nodes for the selected "+ nodetop.value );
									if(irvCy){
										irvCy.remove(irvCy.elements());
										(new DisplayLogicalRenderer()).emptyAllInst()
										nodeMap={};
										nodeMapInst = {};
									 }

								}else {
//									    Remove the edges 
										connSelected = null;
										delete jsonData.edges;			
										tree.nodes =[];
//										Get the parent node and remove it 
										result = removeParentNode(jsonData.nodes, nodetop.parent  );								
						                // remove the parent node from the jsonData
										(new DisplayLogicalRenderer()).emptyAllInst();
										result.forEach(function(resnode) {  tree.nodes.push(resnode);});
										irvCy = initNodeEdgeGraph(irvCy, "irvCy", DisplayCytoscapeUtils.formatNodesResponse(tree));	// nodeMap && edgeMap is reinitialised

										(new DisplayLogicalRenderer()).loadTypeInstBar(nodeMap);
//										retrieveBar(nodeMap);
								}
						    }
						    
						    
							var failFunction = function( xhr, status, error ) {
								$('#console-log').append("Not able to retrieve Instance Related Nodes: " + xhr.status);
								console.log("Error: " + xhr.status);
								
								
							};
						    
							var apis = new apiRomeNext();
							
							apis.loadSubGraph(nodetop.parent , successFunction, failFunction );	 
						  						 			  

							if(LD_FocussedNode) {
								                ShowFocussedNode(LD_FocussedNode);
							                    prevDrilldown = LD_FocussedNode; 
							                    }
						} else if (document.getElementById("mrvCy").style.display == "block") {
							loadMapNodesOfType(nodetop.type);
							 retrieveBar(nodeMap);
						}
					
				  }  
			  }

		} else {
			alert("can not use this arrow");
			$('#console-log').append("<p style='color:red'>Function not available here</p>");
		}
}








