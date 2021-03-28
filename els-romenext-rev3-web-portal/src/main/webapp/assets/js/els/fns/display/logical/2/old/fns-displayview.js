var $gallery1;
var $gallery2;

function cancelNodeConnection(){
	
//	DisplayCytoscapeUtils.removeHighlightAndUnhighlight();
//	listInstUuids = [];
//	listEdgeUuids = [];
	
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
	$("#create_node").dialog("close");

}

function cancelNodeLink(){
	
	DisplayCytoscapeUtils.removeHighlightAndUnhighlight();
	listInstUuids = [];
	listEdgeUuids = [];
	
	GlobalUtils.cursor_clear();
	selectedRule = null;
	
	// remove link rule list
	document.getElementById("create_link").innerHTML = '<span class="glyphicon glyphicon-resize-horizontal bigglyphicon"></span>';
//	var linkRuleList = document.getElementById("link_rule_select_list");
//	document.getElementById("create_link_icon").removeChild(linkRuleList);
	
}

function saveLogicalPosition() {
	console.log("Entered 2/old");
	var jsonstrArray1 = [];
	console.log("what is irvCy?")
	console.log(irvCy);
	if (irvCy.nodes() == null || irvCy.nodes().length < 1) {
		return;
	}
	
	var decoProps = predefinedSelectedDecoPropertiesMap;
	
	//=========================================================================
	//     RETRIEVING ALL NODES POSITIONS
	for (var i = 0; i < irvCy.nodes().length; i++) {
		
		if (irvCy.nodes()[i].data().classification == "WORKSPACE") {
			continue;
		}
				
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
		     
		     sysProperties.push({ name: "uuid", id: "uuid", propertyType:"STRING", value: nUuid});
		                                  
		var nodeTmp = irvCy.nodes()[i];
		var nodeTmp_pos = nodeTmp.position();
		     
		var newDecoProperties = [];
        // Retrieve  the positions of the node
		newDecoProperties.push({propertyName: "x", value: irvCy.nodes()[i].position().x.toString(), propertyType:"DOUBLE", id: predefinedSelectedDecoPropertiesMap["x"].id.toString()});
		newDecoProperties.push({propertyName: "y", value: irvCy.nodes()[i].position().y.toString(), propertyType:"DOUBLE", id: predefinedSelectedDecoPropertiesMap["y"].id.toString()});
		//newDecoProperties.push({propertyName: "z", value: "0", propertyType:"DOUBLE", id: predefinedSelectedDecoPropertiesMap["z"].id.toString()});
		
		// create a json for that node with its type, uuid and positions
		var jsonstr = {
				typeId: Number(irvCy.nodes()[i].data().typeId),
				sysProperties: sysProperties,
				newDecoProperties: newDecoProperties, 
				decorators       : nodeMap[nUuid].decorators,
				grouphost: userGroup.host,
				groupname: userGroup.name,
				namespace: loggedInUserName
		};
		
//		jsonstrArray1.push(jsonstr);

		var successFunction = function( data ) {
			
			var node = data.node;
			
			var uuid = null;
			uuid = NodeUtils.findUUID(node);

			if (uuid != null) {
				nodeMap[uuid].decoProperties = node.decoProperties;
			}
				
		};
		
		var failFunction = function( xhr, status, error ) {
			CommonFctsLogical.HandlingErrorMSG("Cannot Save Graph Position " + xhr.status, "error");
			$('#console-log').append("<p style='color:red'>Cannot Save Graph Position " + xhr.status + "</p>");
			console.log("Save position error: "+ xhr.responseText);
		};
		
		var apis = new NodeApis();
		
		apis.updateNode(jsonstr, successFunction, failFunction );	
		
	}
	
	DisplayLogicalRendererGraph.updateWorkspaceGraph(loadedWorkspaceUuid);
	DisplayLogicalRendererGraph.saveWorkspaceNodePosition(loadedWorkspaceUuid);
	
//	//=========================================================================
//	//        SAVING NODES POSITIONS
//	var successFunction = function( data ) {
//		console.log("Successfully Saved Graph Nodes position: ");
//		$('#console-log').append("<p style='color:green'>Successfully Saved Graph Nodes position</p>");
//		$.each(data.nodes, function(key, value) {
//			var uuid = null;
//			uuid = NodeUtils.findUUID(value);
//			
////			value.properties.forEach(function(prop) {
////				if(prop.name == "uuid"){
////					uuid = prop.value;
////				}
////			});
//			if (uuid != null) {
//				nodeMap[uuid].decoProperties = value.decoProperties;
//			}
//		});		
//	};
//	
//	var failFunction = function( xhr, status, error ) {
//		$('#console-log').append("<p style='color:red'>Can not save Graph Nodes position" + xhr.status + "</p>");
//		console.log("Save position error: "+ xhr.responseText);
//	};
//	
////	var apis = new apiRomeNext();
////	apis.saveLogicalPosition(jsonstrArray1, successFunction, failFunction );
//	
//	var apis = new NodeApis();
//	
//	apis.updateNode(jsonstrArray1, successFunction, failFunction );	
	
	
	
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
	     sysProperties.push({ name: "uuid", id: "uuid", propertyType:"STRING", value: eUuid});
		
		
		var edgeDecoProps = [];
		// Will store the substraction between the target and source
		edgeDecoProps.push({propertyName: "x", value: (irvCy.edges()[i].target().position().x - irvCy.edges()[i].source().position().x).toString(), propertyType: "DOUBLE", id: predefinedSelectedDecoPropertiesMap["x"].id.toString()});
		edgeDecoProps.push({propertyName: "y", value: (irvCy.edges()[i].target().position().y - irvCy.edges()[i].source().position().y).toString(), propertyType: "DOUBLE", id: predefinedSelectedDecoPropertiesMap["y"].id.toString()});
		edgeDecoProps.push({propertyName: "z", value: "0", propertyType:"DOUBLE", id: predefinedSelectedDecoPropertiesMap["z"].id.toString()});
		
//		var startSysProperties = [];
//		startSysProperties.push({ name: "uuid",propertyType:"STRING", value: });
//		var endSysProperties = [];
//		endSysProperties.push({ name: "uuid",propertyType:"STRING", value: });
		
		var jsonstr = {
				connection : Number(irvCy.edges()[i].data().connectionId),
//				originType: Number(typeMap[irvCy.edges()[i].source().data().type].id),
//				originSysProperties: startSysProperties,
//				destinationType: Number(typeMap[irvCy.edges()[i].target().data().type].id),
//				destinationSysProperties: endSysProperties,
				edgeSysProperties : sysProperties,
				newEdgeDecoProperties: edgeDecoProps,
				grouphost: userGroup.host,
				groupname: userGroup.name,
				namespace: loggedInUserName
		};
		
//		jsonstrArray2.push(jsonstr);
		
		var doneFunction = function( data ) {
			var edge = data[0];
			
			var uuid = null;
			uuid = edge.sysProperties.uuid.value;

			if (uuid != null) {
				edgeMap[uuid].decoProperties = edge.decoProperties;
			}
		};
		
		var failFunction = function( xhr, ajaxOptions, error ) {
			CommonFctsLogical.HandlingErrorMSG("Cannot Save Graph Position " + xhr.status, "error");
			$('#console-log').append("<p style='color:red'>Cannot Save Graph Position " + xhr.status + "</p>");
			console.log("Save position error: "+ xhr.responseText);
		};
		
		var apis = new EdgeApis();
		apis.updateEdge(jsonstr, doneFunction, failFunction);
		
	}
	
	//================================================================================================
	//    SAVING ALL EDGES POSITIONS
		
//		var doneFunction = function( data ) {
//			console.log("Successfully Saved Graph Edges position: ");
//			$('#console-log').append("<p style='color:green'>Successfully Saved Graph Edges position</p>");	
//			
//			
//			
//		};
//		
//		var failFunction = function( xhr, ajaxOptions, error ) {
//			$('#console-log').append("<p style='color:red'>Can not save position" + xhr.status + "</p>");
//			console.log("Save position error: "+ xhr.responseText);
//		};
//		
////		var apis = new apiRomeNext();
////		apis.saveEdgeBatch(jsonstrArray2, doneFunction, failFunction);
//		
//		var apis = new EdgeApis();
//		apis.updateEdge(jsonstrArray2, doneFunction, failFunction);
		
}

function restoreLogicalLayout() {	

}

function resetLogicalLayout() {
	
}

function previousLogicalLayout() {

}
