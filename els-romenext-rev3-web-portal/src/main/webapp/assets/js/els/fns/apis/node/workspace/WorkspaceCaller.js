function WorkspaceCaller() {

	this.createWorkspace = function() {

		console.log("Workspace Create OIDSFJ");




		var jsonStr = {
				grouphost : userGroup.host,
				groupname : userGroup.name,
				namespace : loggedInUserName,
				nodes : nodeMap,
				edges : edgeMap
		}



//		jsonstrArray2.push(jsonstr);

		var doneFunction = function( data ) {
//			var edge = data[0];
//
//			var uuid = null;
//			uuid = edge.sysProperties.uuid.value;
//
//			if (uuid != null) {
//				edgeMap[uuid].decoProperties = edge.decoProperties;
//			}
		};

		var failFunction = function( xhr, ajaxOptions, error ) {
			$('#console-log').append("<p style='color:red'>Can not save position" + xhr.status + "</p>");
			console.log("Save position error: "+ xhr.responseText);
		};


		var apis = new WorkspaceApis();
		apis.createWorkspace( jsonStr, doneFunction, failFunction);


	}
	
	this.getWorkspace = function() {

		console.log("Workspace get");




		var jsonStr = {
				grouphost : userGroup.host,
				groupname : userGroup.name,
				namespace : loggedInUserName,
				workspaceId : 2
		}



//		jsonstrArray2.push(jsonstr);

		var doneFunction = function( data ) {
			
			NodeUtils.buildNodeAndEdgeVars(data);

			if (irvCy) {
				irvCy.remove(irvCy.elements());
			}
			var elements = DisplayCytoscapeUtils.formatNodesAndEdges();
			irvCy = initNodeEdgeGraph(irvCy, "irvCy", elements);
			
//			var edge = data[0];
//
//			var uuid = null;
//			uuid = edge.sysProperties.uuid.value;
//
//			if (uuid != null) {
//				edgeMap[uuid].decoProperties = edge.decoProperties;
//			}
		};

		var failFunction = function( xhr, ajaxOptions, error ) {
			$('#console-log').append("<p style='color:red'>Can not save position" + xhr.status + "</p>");
			console.log("Save position error: "+ xhr.responseText);
		};


		var apis = new WorkspaceApis();
		apis.getWorkspace( jsonStr, doneFunction, failFunction);


	}
}