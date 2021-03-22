/**
*  Design View functions
 * Author:	Baya Benrachi
 * Date: 	18 April 2016
 * Update:  15 Nov 2016
 */


//===================================================================================================
//  This function highlight the Type in the graph if the type is clicked on the type Bar
//  prior to the selection any previous selection is removed
//===================================================================================================
//function typeSelect(type){
//	console.log(type);
//	var thisClick = new Date().getTime();
//	isSingleClick = true;
//	pleaseWait = true;
////	Un-Highlight  previous selected Types
//	var list = DesignCytoscapeUtils.grabTypesSelected();
//	DesignCytoscapeUtils.selectUnselectTypes(list, tdvCy, false);                            // unhighlight the previous type if any in the graph
////  Highlight the selected Type in the Graph
//	tdvCy.filter('node[name="' + type + '"]').select();                  // highlight the type  in graph
//	nametype    = type; 
////	Display its proprietes in sideBar 
//	
//	(new DesignLogicalRenderer()).showOrHideGridTypes(true);
//	document.getElementById('Infotitle').textContent="Type Details";
//	(new DesignLogicalRenderer()).emptyAll();
//	TypePropertyUtils.displayTypeProperties( $('#typeForm'), typeMap[type], true );
//	//showType(typeMap[type]);                                           // should display information on the INFO section 	
//}
//======================================================================================================
//                         CREATE THE RULE BAR  from the list of rules created 
//                            rules are stored in global variable   ruleMap.
//=====================================================================================================
//function initRuleDesignBar(bar){              // bar change based on the display
//	var nb = Object.keys(ruleMap).length;
//	var inputs = '';
//	if(nb != 0) {
//		inputs +="<table id='ruleList'><tr>";
//		inputs +=  '<td onclick="createConnection(\'parentchild\')"><img title="create pc connection" id="img_connect_pc"   src="'+img_path+'design_icons/conn_pc.png"/></td>';
//		inputs +=  '<td onclick="createConnection(\'link\')"><img title="create link connection" id="img_connect_link" src="'+img_path+'design_icons/conn_link.png"/></td>';
//		inputs += "<td><span class='label label-default'>*("+nb+")</span></td>";
//		$.each(ruleMap, function(key, value){
//			if (value.classification == "parentchild") {
//				inputs += "<td><span class='label label-primary'  id="+value.id+">"+key+"</span></td>";	
//			} else if (value.classification == "link") {
//				inputs += "<td><span class='label label-success'  id="+value.id+">"+key+"</span></td>";	
//			} else {
//				console.log("Classification Is Wrong: " + value.id);
//			}	
//	     });
//		inputs +="</tr></table>";
//		document.getElementById(bar).innerHTML = inputs;
//	} else {
//		inputs +="<table id='ruleList'><tr>";
//		inputs +=  '<td value="parentchild" onclick="createConnection(\'parentchild\')"><img title="create pc connection"   id="img_connect_pc"   src="'+img_path+'design_icons/conn_pc.png"/></td>';
//		inputs +=  '<td value="link" onclick="createConnection(\'link\')"><img title="create link connection"   id="img_connect_link"   src="'+img_path+'design_icons/conn_link.png"/></td>';
//		inputs +="</tr></table>";
//
//		document.getElementById(bar).innerHTML = inputs;
//	}
//}
//===========================================================================================================
//                         Create a Connection by selecting Origin and Destination Nodes
//
//===========================================================================================================
//function createConnection(connClassification){
//
//	if (connClassification == "parentchild") {
//		var list=[];
//		if(creatingConnection == false) {
//			creatingConnection = true;
//			ruleSelected = true; //to differentiate between single click and double click
//			createRuleClassification = connClassification;
//			GlobalUtils.cursor_wait();
//		}else{
//			creatingConnection = false;
//			resetConnVariables();
//		}
//	} else if (connClassification == "link") {
//
//	} else {
//		console.log("Wrong Connection Classification: " + connClassification);
//	}
//	
//}

//=================================================================================================
//                             Call API to load All rules;  Call function display RuleBar
//=================================================================================================
//function loadAllRules(){
//	var successFunction = function( jsonData ) {
//					$.each(jsonData, function(key, value){
//						
//						var ruleName = value.name;
//						
//						if( !ruleMap[ruleName] ) {
//							ruleMap[ ruleName ] = value;
//							ruleMapViaId[ value.id ] = value;
//						}
//						
//						
//						// this is the old code
//						// no clue why it's being iterated over like this
////						$.each(value, function(key2,value2){
////							if (key2 == 'name') {
////										if (!ruleMap[value2]) {
////											ruleMap[value2] = value;
////										} 
////							}
////					    });
//				    });
//		
//		initRuleDesignBar('ruleBar');  
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
//
//}
//===============================================================================================
//                       load only Types & Connections under the selected  metaDataRepo 
//
//===============================================================================================

//function initTypeGraph() {
//
//	var successFunction = function( jsonData ) {
//		GlobalUtils.buildTypeAndConnVars(jsonData);
//		var elements = DesignCytoscapeUtils.formatTypesAndConnections();
//		tdvCy = DesignCytoscapeUtils.initTypeConnGraph(tdvCy, "tdvCy", elements);	// this will initiate typeMap also
//		initTypeDesignBar('typeBar');			                                        // Display types Bar	
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
//	DesignCytoscapeUtils.saveInitialPosition(tdvCy);
//
//};
//=======================================================================================
//                  Prepare the Current Design Window 
//======================================================================================
//function prepareDesignView() {
//  
//    removeAllPhysicalDesignView();
//	emptyAll();
//	showOrHideGridTypes(false);	
//	initTypeGraph();  
//	loadAllRules();
//	
//	if (selectedMetaData) {	
//		if (listTypeIds.length != 0 || listConnIds.length != 0 || nametype != null || nameconn != null || curType != null) {
//			if (listTypeIds.length != 0) {
//				
//				var tmpListTypeIds = [];
//				for (var i = 0; i < listTypeIds.length; i++) {
//					tmpListTypeIds.push(listTypeIds[i]);
//				}
//				var tmpListConnIds = [];
//				for (var i = 0; i < listConnIds.length; i++) {
//					tmpListConnIds.push(listConnIds[i]);
//				}
//				
//				selectUnselectTypes(tmpListTypeIds, tdvCy, true);
//				console.log("List of types is:"+ listTypeIds);
//				listTypeIds = [];
//				for (var i = 0; i < tmpListTypeIds.length; i++) {
//					listTypeIds.push(tmpListTypeIds[i]);
//				}
//				listConnIds = [];
//				for (var i = 0; i < tmpListConnIds.length; i++) {
//					listConnIds.push(tmpListConnIds[i]);
//				}
//				
//			}
//			if (listConnIds.length != 0) {
//				
//				var tmpListTypeIds = [];
//				for (var i = 0; i < listTypeIds.length; i++) {
//					tmpListTypeIds.push(listTypeIds[i]);
//				}
//				var tmpListConnIds = [];
//				for (var i = 0; i < listConnIds.length; i++) {
//					tmpListConnIds.push(listConnIds[i]);
//				}
//			
//				
//				selectUnselectConnections(tmpListConnIds, tdvCy, true);
//				console.log("List of connections is:"+ listConnIds);
//				listTypeIds = [];
//				for (var i = 0; i < tmpListTypeIds.length; i++) {
//					listTypeIds.push(tmpListTypeIds[i]);
//				}
//				listConnIds = [];
//				for (var i = 0; i < tmpListConnIds.length; i++) {
//					listConnIds.push(tmpListConnIds[i]);
//				}
////				
//			}
//			if (nametype != null) {
//				tdvCy.filter("node[name='"+nametype+"']").select();
//			}
//			if (nameconn != null) {
//				tdvCy.edges("[name='"+nameconn+"']").select();
//			}
//			if (curType != null) {
//				tdvCy.filter("node[name='"+curType+"']").select();
//			}
//		}
//	}
//
//	console.log("Initial value of selectedDecorator is : "+selecteddecorator);
//
//	if (selectedMetaData) {	
//		switch (selecteddecorator) {
//		case "Logical":
//			selecteddecorator = 'Logical';
//			$('#console-log').append("<p>Changing to "+selecteddecorator+" View ------- For TAB: " +topLevelTab +"</p>" );
//			hideGridModels();			
//			showOrHideModelInfo(false);                                               // not needed
//			document.getElementById("pdsv").style.display = "none";
//			document.getElementById("tdvCy").style.display = "block";
//			
//			var toolbarManager = new toolbarManagerRomeNext();
//			toolbarManager.createDesignTool();	
////			createDesignTool();
//			
//			if(selectedMetaData.length != "") { showOrHideGridTypes(true); 	}		
//			break;
//		case "Physical":
//			selecteddecorator = 'Physical';
//			$('#console-log').append("<p>Changing to "+selecteddecorator+" View ------- For TAB: " +topLevelTab +"</p>" );
//			document.getElementById("tdvCy").style.display = "none";
//			document.getElementById("pdsv").style.display = "block";
//			userActions.view3D = 'xy';
//			view3D = 'xy';
//			defaultXYPlaneColor = "#00ccff";
//			defaultYZPlaneColor = "";
//			defaultXZPlaneColor = "";
//			initPhysicalDesignView();		   
//		    showOrHideModelInfo(true);
//		    if(selectedMetaData.length != "") {   	showOrHideGridTypes(true);      }
//		    break;
//		}
//	}
// 	
//}
//=================================================================================================
//=================================== Function to change From Design to Display page ===============
//function callDesignDisplayServlet() {	
//	var transferData = document.getElementById("hidden_info");	
//	document.getElementById("transfer_meta").value = selectedMetaData;
//	document.getElementById("transfer_deco").value = selecteddecorator;
//	document.getElementById("transfer_type").value = nametype;
//	document.getElementById("transfer_conn").value = nameconn;
//	document.getElementById("transfer_cur_type").value = curType;	
//	document.getElementById("transfer_typelist_length").value = listTypeIds.length
//	var inputs = "";
//	if (listTypeIds.length >= 1) {
//		for (var i = 0; i < listTypeIds.length; i++) {
//			inputs += "<td><input name='type_id_"+i+"' value='"+listTypeIds[i]+"'></td>";
//		}
//	}
//	$('#hidden_info').append(inputs);
//	
//	inputs = "";
//	document.getElementById("transfer_connlist_length").value = listConnIds.length
//	if (listConnIds.length >= 1) {
//		for (var i = 0; i < listConnIds.length; i++) {
//			inputs += "<td><input name='conn_id_"+i+"' value='"+listConnIds[i]+"'></td>";
//		}
//	}
//	$('#hidden_info').append(inputs);	
//	transferData.submit();
//}















//=============================== UTILITIES ===================================================
//=============================================================================================
//             Highlight / Un-Highlight  any nodes/ all edges   in Type Graph
//=============================================================================================
// function selectUnselectTypes(listTypes, cy, sel){
//	 if(listTypes != null){
//		 if (listTypes.length == 1) {
//				 if(sel )  { cy.filter("node[id='"+listTypes[0]+"']").select();}
//				 else   { cy.filter("node[id='"+listTypes[0]+"']").unselect();}
//		} else {if(listTypes.length > 1){
//				var nodeConditions = "[id='"+listTypes[0]+"']";
//				for (var i = 1; i < listTypes.length; i++) {
//					nodeConditions += ", [id='"+listTypes[i]+"']";
//				}		
//				var allNodes = cy.filter('node');
//				if(sel )  {   allNodes.filter(nodeConditions).select();}
//				else {  allNodes.filter(nodeConditions).unselect();  }
//		}
//		} 
//	 }
// }
// function selectUnselectConnections(listConns, cy, sel){
//	 if (listConns.length == 1) {	
//		 if(sel )  {cy.filter("edge[id='connection"+listConns[0].toString()+"']").select();}
//		 else {cy.filter("edge[id='connection"+listConns[0].toString()+"']").unselect(); }
//	} else {
//			var edgeConditions = "[id='connection"+listConns[0]+"']";
//			for (var i = 1; i < listConns.length; i++) {
//				edgeConditions += ", [id='connection"+listConns[i]+"']";
//			}
//			var allEdges = cy.filter('edge');
//			if(sel )  {   allEdges.filter(edgeConditions).select();}
//			else {  allEdges.filter(edgeConditions).unselect();  }
//	} 
// }
// function copyList(tmpListTypeIds ){
//	 var tmpListTypeIds = [];
//		for (var i = 0; i < listTypeIds.length; i++) {
//			tmpListTypeIds.push(listTypeIds[i]);
//		}
//	var tmpListConnIds = [];
//	for (var i = 0; i < listConnIds.length; i++) {
//		tmpListConnIds.push(listConnIds[i]);
//	}
// }
////=============================================================================================
////             Save Nodes Initial positions in the Type Graph
//=============================================================================================
// function saveInitialPosition(cy ){
//		if (cy != null) {
//			if (preTdvPos == null) {
//				preTdvPos = [];
//				for (var i = 0; i < cy.nodes().length; i++) {
//					preTdvPos.push({id: cy.nodes()[i].data().id, x: cy.nodes()[i].position().x, y: cy.nodes()[i].position().y});
//				}
//			}
//		
//			defTdvPos = [];
//			for (var i = 0; i < cy.nodes().length; i++) {
//				defTdvPos.push({id: cy.nodes()[i].data().id, x: cy.nodes()[i].position().x, y: cy.nodes()[i].position().y});
//			}
//		}
//		
//	}
//=============================================================================
// function retrieveImgname(img){
// 	var file = img.src;
// 	var i = file.lastIndexOf("/")+ 1;
// 	var pathimg = file.substr(i);
// 	return pathimg;
// }
//=============================================================================================
//              Grab List of nodes Highlighted in the Type Graph
//=============================================================================================
// function grabTypesSelected(){
//	 if(tdvCy){
//		 var typeIds = tdvCy.elements("node:selected"),list=[];
//		 for( var i=0; i < typeIds.length; i++){
//			 // display the name of type selected
//			 var ele = typeIds[i].data('name');
//			 console.log("element grabbed is : "+ele );
//			 // save the id in the list
//			 list.push(parseInt(typeIds[i].data('id')));	
//		 }
//		 return list;
//	 } else return null;
// }

// function grabIdsConnections(){
//	 if(tdvCy){
//		 var connIds = cy.elements("edge:selected"); 
//		// grab all selected   connections and their sources/destinations 
//		 for(var i=0; i <connIds.length; i++){
//			 // grab the connection ID
//			 listConnIds.push(parseInt(connIds[i].data('id').slice(10)));
//			 var connName = connIds[i].data('name');
//			 // display its origin and destination 
//			 console.log("Selected connection "+connName + " with  Origin is : "+connIds[i].data('origin')+" and  Destination is : "+connIds[i].data('destination'));
//			 $('#console-log').append("<p style='color:green'>Selected connection "+connName + " with  Origin is : "+connIds[i].data('origin')+" and  Destination is : "+connIds[i].data('destination'));
//		 }
//	 }
//	
//	 
// }
//// function showHideModelInfo(isDisplay) {
////		if (curModel != null) {
////			if (isDisplay) {
////				$("#model_info").css({'display':'block'});
////			} else {
//				$("#model_info").css({'display':'none'});
//			}
//		}
//}

// function removeHighlightType(){
//		if(nametype != null ) {tdvCy.filter('node[name="' + nametype + '"]').unselect(); }  
//	}
// function cursor_wait() {
// 	document.body.style.cursor = 'crosshair';
// 	}
// function cursor_clear() {
// 	document.body.style.cursor = 'default';
// 	}
// function resetConnVariables(){
// 	 var list = DesignCytoscapeUtils.grabTypesSelected();
// 	DesignCytoscapeUtils.selectUnselectTypes(list, tdvCy, false);
// 	 list=[];
// 	 ruleSelected = false;
// 	 originType = null;
// 	 destType = null;
// 	 mouseEventTime = new Date().getTime();
// 	 pleaseWait = true;
// 	 createRuleClassification = null;
// 	GlobalUtils.cursor_clear();
// }
// function removeAllPhysicalDesignView() {	
// 	var canvasPhy = document.getElementById("pdsvsvg");
// 	canvasPhy.innerHTML = "";
// }

// function emptyAll(){
//		document.getElementById('Infotitle').textContent="Design Details";
//		$('#typeForm').empty();
//	}

// function hideGridModels(){
//	 if(document.getElementById("grid-models").style.visibility == 'visible') {
//			document.getElementById("grid-models").style.visibility = "hidden";
//		}
// }
// function showOrHideGridTypes(value){
//	 if(value){
//		 if($("#grid-types").css('visibility') == 'hidden'){$("#grid-types").css({'visibility':'visible'});}
//	 }else {
//		 if($("#grid-types").css('visibility') == 'visible'){$("#grid-types").css({'visibility':'hidden'});}
//	 }
// }


//==================================================================================================== 
//============================================ NOT USED ==============================================
//============================================  NEW FOR CONNECTIONS BAR ==============================
// function initConnDesignBar(bar){              // bar change based on the display
// 	var nb = Object.keys(connMap).length;
// 	var inputs = '';
// 	if(nb != 0) {
// 		inputs ="<table id='ruleList'><tr>";
// 		inputs +=  '<td onclick="createConnection()"><img title="create connection"  src="'+img_path+'design_icons/connect2.png"/></td>';	
// 		inputs += "<td><span class='label label-default'>*("+nb+")</span></td>";
// 		$.each(connMap, function(key, value){
// 			inputs += "<td><span class='label label-primary'  id="+value.id+">"+key+" *("+value.nb+")</span></td>";			
//         });
// 		inputs +="</tr></table>";
// 		document.getElementById(bar).innerHTML = inputs;
// 	} else {
// 		inputs +=  '<p onclick="createConnection()"><img title="create connection"   src="'+img_path+'design_icons/connect2.png"/></p>';
// 		document.getElementById(bar).innerHTML = inputs;
// 	}
// }
// 
//================================================================================
// function cancelConnCreation(){
// 	var img = document.getElementById("img_connect"), list=[];
// 	  img.src = img_path +"design_icons/connect2.png";
// 	// reset all variables     ===========  remove any highlighted elements
// 	list = DesignCytoscapeUtils.grabTypesSelected();
// 	DesignCytoscapeUtils.selectUnselectTypes(list, tdvCy, false);
// 	ruleSelected= false;
// 	originType = null;
// 	destType = null;
// 	mouseEventTime = new Date().getTime();
// 	pleaseWait = true;
// 	
// }

// function loadCurrentDesignView() {
//		resetRepo();
//		document.getElementById("pdsvsvg").innerHTML = "";
//	}