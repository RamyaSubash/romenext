
function getDefaulPart(nodeUuid){
	curModel = nodeMap[nodeUuid].modelId;
	getModelShapes(curModel); 	
	displayPartShapesParent(curModelShapes,"phy_dspl_view_svg" );
}
function displayButton(){
	var viewChildPartNodeButton = document.getElementById('view_part_child_node_button');
	if (viewChildPartNodeButton.value == 'parent') {
		viewChildPartNodeButton.value = 'child';
		viewChildPartNodeButton.onclick = loadChildPartNodes;
		viewChildPartNodeButton.innerHTML = 'View Children';
	}	
}
//================================================================================
function getGroupPart(nodeUuid){
	var jsonData = '{"modelId":' + nodeMap[nodeUuid].modelId + ', "groupId":' + nodeMap[nodeUuid].partGroup + '}';
	if (selectedMetaData != null){
		$.ajax({
			type : 'POST',
			url : apiBaseUrl + 'model/part/group/get',
			dataType : 'json',
			data : jsonData,
			contentType : 'application/json',
			cache : false,
			async : false,
			success : function(data) {
				console.log("Get node part success. data: ");
				$('#console-log').append("<p style='color:blue'>Got Node Part</p>");
			},
			error : function(xhr, ajaxOptions, error) {
				console.log('Error in getting node part: ' + xhr.responseText);
				$('#console-log').append("<p style='color:red'>Error in getting node part: "+ xhr.status+"</p>");
				
			}
		}).done(function(data) {
			curModel = nodeMap[nodeUuid].modelId;
			var partsGroup = groupParts(data.parts);
			var partShapes = convertPartToShapes(partsGroup[0]);
			var canvas = document.getElementById('phy_dspl_view_svg');
			canvas.setAttribute('draggable', true);
			displayPartShapes(partShapes, "phy_dspl_view_svg");	
			displayButton();
		});
	} else { 
		 $('#console-log').append("<p style='color:red'>You must First select a Metadata!</p>");
	}		
}
function getGroupPartChilds(jsonData){
	if (selectedMetaData != null && jsonData != '[]'){
		$.ajax({
			type : 'POST',
			url : apiBaseUrl + 'model/part/group/batch/get',
			dataType : 'json',
			data : jsonData,
			contentType : 'application/json',
			cache : false,
			async : false,
			success : function(data) {
				console.log("Get child node part success. data: " + data);
				$('#console-log').append("<p style='color:blue'>Got Child Node Part</p>");
			},
			error : function(xhr, ajaxOptions, error) {
				console.log('Error in getting child node part: ' + xhr.responseText);
				$('#console-log').append("<p style='color:red'>Error in getting child node part: "+ xhr.status+"</p>");
				
			}
		}).done(function(data) {
			if (data.parts != null && data.parts.length > 0) {
				for (var i = 0; i < data.parts.length; i++) {
					curModel = data.parts[i][0].modelId;
					var partsGroup = groupParts(data.parts[i]);
					var partShapes = convertPartToShapes(partsGroup[0]);
					displayPartShapes(partShapes, "phy_dspl_view_svg");

				}
				var viewChildPartNodeButton = document.getElementById('view_part_child_node_button');
				viewChildPartNodeButton.value = 'parent';
				viewChildPartNodeButton.onclick = loadNodePartShapes;
				viewChildPartNodeButton.innerHTML = 'Return';
			}else {
				$('#console-log').append("<p style='color:green'>No Children part Nodes </p>");
				$('#nodeForm').append("<p></p><p style='color:red'>No children part nodes for the selected node </p> ");
			}
		});
	} else { 
		 $('#console-log').append("<p style='color:red'>You must First select a Metadata!</p>");
	}
}
//======================================================================

function loadNodePartShapes() {	
	if (NodeSelected == null) {
		console.log('No Node Selected!');
		$('#console-log').append("<p style='color:red'>No Node Selected!</p>");
	} else {
		if (nodeMap[NodeSelected].hasOwnProperty('modelId'))  {
			// partGroup could be 0 ==== for default part  or a number >0 		
			if(!nodeMap[NodeSelected].hasOwnProperty('partGroup')){
				// load the default Model shapes
				
				var canvas = document.getElementById('phy_dspl_view_svg');
				var viewChildPartNodeButton = document.getElementById('view_part_child_node_button');
				if(viewChildPartNodeButton.innerHTML == 'Return'){
					canvas.innerHTML = '';
				}
				canvas.setAttribute('draggable', true);
				displayButton();
				getDefaulPart(NodeSelected);
				
			}else {
				// partGroup is not the default  == Need to retrieve partGroup
				getGroupPart(NodeSelected);
			}
		}else  {
			   console.log("Node selected does not have Model or Parts defined ");
			$('#console-log').append("<p style='color:red'>Node selected does not have Model or Parts defined</p>");
			
		}
	}
}

function loadChildPartNodes() {
	if (NodeSelected == null) {
		console.log('No Node Selected!');
		$('#console-log').append("<p style='color:red'>No Node Selected!</p>");
	} else {
		
		var viewChildPartNodeButton = document.getElementById('view_part_child_node_button');
		if(viewChildPartNodeButton.innerHTML == 'Return'){
			var canvas = document.getElementById('phy_dspl_view_svg');
			canvas.innerHTML = '';
		}
		childNodes = []; 
//		var propertyNode = {value : NodeSelected, element : 'node', type : nodeMap[NodeSelected].type, parent: ,  nodeDetails : LD_FocussedNode}
//		historyNode.push(propertyNode);
//		showNodeProperties(nodeMap[NodeSelected]);
		loadInstanceRelatedNodes_Edges(NodeSelected);
		
		var jsonData = '[';
		if (childNodes != null && childNodes.length > 0) {
			for (var i = 0; i < childNodes.length; i++) {
				if(nodeMap[childNodes[i]].hasOwnProperty('modelId')){
					if(!nodeMap[childNodes[i]].hasOwnProperty('partGroup')){
						// load the default Model shapes
						getDefaulPart(childNodes[i]);
					}else {
						jsonData += '{"modelId":' + nodeMap[childNodes[i]].modelId + ', "groupId":' + nodeMap[childNodes[i]].partGroup+ '},';
				
			         }
				}else {console.log("<p>This child node"+nodeMap[childNodes[i]].cyDisplay +" does not have a part associated with it</p>")}
		}
		jsonData += ']';
		if(jsonData)
		getGroupPartChilds(jsonData);
		childPartsLoaded= true;
		
	}
	}

}

function savePhysicalPosition() {
	
}

function restorePhysicalLayout() {
	
}

function resetPhysicalLayout() {
	
}

function previousPhysicalLayout() {
	
}

function centerPhysicalGraph() {
	
}

function cancelPhysicalEdgeCreation() {
	
}
