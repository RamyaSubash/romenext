/**
 * 
 */
function DesignDecoUtils() {
	
}

DesignDecoUtils.addTab = function( nameTab , index , script ) {
	
	var newLiElement           = document.createElement( 'li' );
	newLiElement.setAttribute('class', 'nav-item');
	
	var newAElement            = document.createElement ( "a" );
	newAElement.setAttribute('class', 'nav-link');
	newAElement.setAttribute('data-toggle', 'tab');
	newAElement.setAttribute('href', '#'+nameTab+'PaneView');
	newAElement.setAttribute('role', 'tab');
	newAElement.setAttribute('onclick', script+'.initFct('+index+')');
	newAElement.setAttribute('id', nameTab+'PaneViewTab');
	
//    newAElement.innerHTML      =  nameTab + "<span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span>";
	newAElement.innerHTML      =  nameTab;
	newLiElement.appendChild( newAElement);		
	return newLiElement;	
	
}
DesignDecoUtils.addPane = function(nameTab  ) {
	
	var newDivElement           = document.createElement ( "div" );
	newDivElement.className     = "tab-pane";
	newDivElement.id            = nameTab+"PaneView";
	newDivElement.setAttribute('role', 'tabpanel');
	newDivElement.innerHTML     = '';	
	return newDivElement;		
}

DesignDecoUtils.generatingNewTab = function( nameTab , index_tab , script ) {
	// add the Tab navigation 
	var newTab     =  DesignDecoUtils.addTab( nameTab, index_tab, script);
	$('#tabs').append(newTab);
	// add the tab pane
	var newPane    = DesignDecoUtils.addPane(nameTab );
	$('#gvTabContent').append(newPane);
	    // set a header and a body in the pane 
	var mainDiv = $('#'+nameTab+'PaneView');
	mainDiv.innerHTML = '';
		
	var bars = GlobalHTMLUtils.createHTMLEntity('div', 'headers'+nameTab, 'panel-heading', 'visible', 'block', '');	
	mainDiv.innerHTML = bars;
		
	var tabCreationBody = GlobalHTMLUtils.createHTMLEntity('div', 'tabCreationBody'+nameTab, 'cy', 'visible', 'block', '');		
	mainDiv.innerHTML =    tabCreationBody;		
}

DesignDecoUtils.generateListOfPaths = function ( ){
	
	var options = '';
    var totals = Object.keys( typeMapViaId ).length;
    if( totals > 0 ){			
		$.each( typeMapViaId, function(key, value){
			if(value.classification == 'path' ){
				options += '<option  value="pathId_'+value.id+'">'+value.name+'</option>';
			}
		})
	}else {
		console.log("  No Path Type were created ");
		options = '';
		}
	return options;
	
}

DesignDecoUtils.generateAddingToPath = function ( divToAppend ){
	
	var options = DesignDecoUtils.generateListOfPaths();
	
	var pathForm = '';
	if( options != ''){	
        pathForm += '<div id="pathForm"   >';
        pathForm += 'Select Path type: <select id="selectedPath"  onchange="DesignDecoUtils.generatePathNodes()">';
        pathForm += '<option value=""></option>';
    	pathForm = pathForm + options;
	    pathForm += '</select><div class="error" id="selectedPath_error"></div><br/>';
	    pathForm += '<div id="pathNodes"></div><div id="pathNodes_error"></div>';
	    pathForm += '<div id="pathProperties"></div><div id="pathProperties_error"></div>';
	    
	    pathForm += '<label for="createPath" id="lblCreatePath">Create Path: </label><input type="checkbox" id="createPath" value="create" checked="checked"><div class="error" id="createPath_error"></div>'; 
	    pathForm += '</div>';
	    pathForm += '<div id="errorNode_msg"></div>';
	    pathForm += '----------------------------------------------<br/>'
    }else {
    	pathForm += "No Type Path available. Can not attach Deco to Path";
    }
	
	divToAppend.append(pathForm);
    
}

DesignDecoUtils.generatePathNodes =function ( ){
	
	var node, pathIdSelected = null, retNodes = {}, pathProps = {};
	var inputSelectNodePath = '', appendToDiv;

	node    = document.getElementById('selectedPath');   	        	
	if(node && node.value == "" ){
    	$('#errorNode_msg').append("<p style='color:red'>Please Select a TYPE Path.</p>");
    	result = "\nYou must select a Type path"; 
        errorElements.push(result); 
        DesignDecoUtils.showError(node, result); 
    	error = true;
    }
	pathIdSelected = node.value.slice(7); 
	
	retNodes  = DesignDecoUtils.loadNodesOfPathType( pathIdSelected );
	if(!$.isEmptyObject( retNodes )){
		// display List of available node Path to choose from
		inputSelectNodePath += 'Select Path Node: <select id="selectedNode"  onchange="DesignDecoUtils.generatePathNodeProperties('+pathIdSelected+')">'; 
		inputSelectNodePath += '<option value=""></option>';
		inputSelectNodePath += '<option value="createNodePath">Create New</option>';
		
		$.each(retNodes, function(key, value){
			 NodeUtils.AddNodeToMap(value);
			var name = NodeUtils.findNameInst ( key )
			inputSelectNodePath += '<option value="nodeUuid_'+key+'">name</option>';
		});
		
		inputSelectNodePath += '<div class="error" id="selectedNode_error"></div><br/>';
		appendToDiv = $('#pathNodes');
		$('#pathNodes').empty();
		$('#pathProperties').empty();
		$('#pathNodes').append ( inputSelectNodePath);
//		$('#lblCreatePath').text("use Path");
		
	}else {
		
		// display Type Path Properties to create new Path Node
		pathProps = typeMapViaId[pathIdSelected].typeProperties;
		appendToDiv = $('#pathProperties');
		$('#pathNodes').empty();
		$('#pathProperties').empty();
		console.log("call from  DesignDecoUtils.generatePathNodes  pathProps =  "+pathProps);
		CreateProcessUtils.addNodeDetails( appendToDiv, pathIdSelected , pathProps );
		$('#lblCreatePath').text("Create Path");
	}

}
DesignDecoUtils.generatePathNodeProperties = function(pathIdSelected ){
	var pathNodeUuid = null;
	var node    = document.getElementById('selectedNode');   	        	
	if(node && node.value == "" ){
    	$('#errorNode_msg').append("<p style='color:red'>Please Select a Path instance.</p>");
    	result = "\nYou must select a path instance"; 
        errorElements.push(result); 
        DesignDecoUtils.showError(node, result); 
    	error = true;
    }
	var appendToDiv = $('#pathProperties');
	if(node.value == 'createNodePath'){
		$('#lblCreatePath').text("Create Path");
		$('#createPath').attr('value', 'create');
		$('#pathProperties').empty();
		$('#pathProperties').append(retProperties);
		var pathProps = typeMapViaId[pathIdSelected].typeProperties;
		
		CreateProcessUtils.addNodeDetails( appendToDiv, pathIdSelected , pathProps );
		
		
	}else {
		pathNodeUuid = node.value.slice(9);
		
		var props  = nodeMap[pathNodeUuid];
		var typeId = nodeMap[pathNodeUuid].typeId;
		
		var retProperties  = DesignDecoUtils.addNodeProperties( pathNodeUuid, props, typeId ) ;
		var appendToDiv = $('#pathProperties');
		$('#lblCreatePath').text("use Path");
		$('#createPath').attr('value', 'use');
		$('#pathProperties').empty();
		$('#pathProperties').append(retProperties);
		$('button.close').attr("disabled", true);
		$('button.nodeDeleteButton').attr("disabled", true);
	}
}

DesignDecoUtils.generatePathTypeProperties =function ( ){

	var node    = document.getElementById('selectedPath');   	        	
	if(node && node.value == "" ){
    	$('#errorNode_msg').append("<p style='color:red'>Please Select a TYPE Path.</p>");
    	result = "\nYou must select a Type path"; 
        errorElements.push(result); 
        DesignDecoUtils.showError(node, result); 
    	error = true;
    }
	var pathIdSelected = node.value.slice(7); 
	var pathProps = typeMapViaId[pathIdSelected].typeProperties;

	var appendToDiv = $('#pathProperties');
	$('#pathProperties').empty();
	console.log("call from  DesignDecoUtils.generatePathTypeProperties  pathProps =  "+pathProps);
	CreateProcessUtils.addNodeDetails( appendToDiv, pathIdSelected , pathProps )
		
}
DesignDecoUtils.loadNodesOfPathType = function ( pathTypeId ){
	
	var retNodes  = {}, jsonData = {}, typeIds = [];
	typeIds.push(pathTypeId)
	jsonData.typeIds = typeIds;
	console.log(jsonData);
	var successFunction = function( data ) {
		if(!$.isEmptyObject(data) && !$.isEmptyObject(data.nodes) ){
			retNodes  = NodeUtils.buildNodes(data.nodes);
		}else {
			console.log("No node Path created yet ");
		}
	}
	
	var failFunction = function( xhr, status, error ) {
		$("#console-log").append("Not able to load Nodes for this type "+ pathIdSelected +"Error: " + xhr.status);
  	    console.log("Error: " + xhr.responseText); 
	}
	
	var apis = new apiRomeNext();	
	apis.loadAllNodes( jsonData, successFunction, failFunction );
	return retNodes;
}


DesignDecoUtils.showError = function (node, message) { 
    var id = node.id + "_error"; 
     
    var node_error = document.getElementById( id ); 
     
    if( node_error ) 
          node_error.innerHTML = '<span style="color:red">'+message+'</span>'; 
           
    if( message == "" ) 
       node_error.style.display = "none"; 
    else 
       node_error.style.display = "inline"; 
               
  }

DesignDecoUtils.loadTabActions = function(   ){
	var result = null;
	var doneFunction = function( data ) {
		if(!$.isEmptyObject(data) && data.success){	
			result = data.tabactions;
		}														
	};
		
	var failFunction = function( xhr, status, error ) {
		console.log('Error getting the Tab Action functions ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Error getting the Tab Action functions :"+ xhr.status+"</p>");	
	};
	
	
	var api  = new TabDecoApi();
	api.loadAllTabActions( doneFunction, failFunction );		
	return result;	
}

DesignDecoUtils.createNewTab = function( jsonData  ){
	var tabId = null;
	var doneFunction = function( data ) {
		
		if($.isEmptyObject(data)){
			console.log(" no value  returned for save New tab ");
			$("#error_msg").append("Error in saving new Tab");
			return null;
		}else {
			tabId = data.tab.id;
		}																
	};
		
	var failFunction = function( xhr, status, error ) {
		console.log('Error in saving new Tab  ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Error in saving new Tab :"+ xhr.status+"</p>");	
		$("#error_msg").append("Error in saving new Tab");
		return null
	};
		
	var api  = new TabDecoApi();
	api.saveNewTab(jsonData, doneFunction, failFunction );		
	return tabId;
}

DesignDecoUtils.createObject = function( jsonData ){
	var objectId = null;
	var doneFunction = function( data ) {
		if($.isEmptyObject(data)){
			console.log(" no value  returned for save new object ");
			$("#error_msg").append("Error in saving new Object");
			return null;
		}else {
			objectId = data.id;
		}							     														
	};
		
	var failFunction = function( xhr, status, error ) {
		console.log("saving an object failed : "+ xhr.status);
		 $('#console-log').append("saving new object failed : "+ xhr.status);
		 $("#error_msg").append("Error in saving new Object");
		 return null;
	};
		
	var api  = new TabDecoApi();
	api.saveNewObject(jsonData, doneFunction, failFunction );	
	return objectId;
}

DesignDecoUtils.createObjectProperty = function( jsonData   ){
	
	var doneFunction = function( data ) {
		if($.isEmptyObject(data)){
			console.log(" no value  returned for save new object property ");
			$("#error_msg").append("Error in saving new Object property");
			return null;
		}else {
			
		}																
	};
		
	var failFunction = function( xhr, status, error ) {
		console.log("saving object prorty failed "+ xhr.status);
		 $('#console-log').append("saving object property failed "+ xhr.status);
	};
		
	var api  = new TabDecoApi();
	api.saveNewObjectProperty(jsonData, doneFunction, failFunction );	
}

DesignDecoUtils.savePath  = function (pathIdSelected, nodes  ){
	
	if(!pathIdSelected){
		console.log(" no path Type Id provided: cannot create  "); 
		errorNode_msg
		$("#errorNode_msg").append("Error missing Path selection, cannot complete creation ");
		return;
	}
	
	if($.isEmptyObject(nodes)){
		console.log(" no nodes provided to add to a path cannot create  "); 
		errorNode_msg
		$("#errorNode_msg").append("Error missing nodes to complete  Path creation ");
		return;
	}
	
	// create a Node of type path 
	
	var data = new NodeJsonObject();
	// set the minimum
	data.init(selectedMetaData.toString(), pathIdSelected.toString(), []);
	data.defaultDecorator = "1";

	var doneFunction = function( dataNode ) {
		if(!$.isEmptyObject(dataNode)){
			$('#console-log').append("<p style='color:blue'>Node created successfully.</p>");
			dataNode.color = typeMapViaId[dataNode.typeId].color;
	 	   // update corresponding section and nb of type nodes 			
			NodeUtils.AddNodeToMap( dataNode);   
			GlobalUtils.addNBTypeInstances(dataNode);						
			listInstUuids[0] = NodeUtils.findUUID (dataNode);
		}else {
			$('#console-log').append("<p style='color:red'>Creation is successfull but no Node returned</p>");
		}
	};
		
	var failFunction = function( xhr, status, error ) {
		console.log('Error Node not created: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Error Node not created:"+ xhr.status+"</p>");	
	};
	
	var api  = new NodeApis();
	api.saveNode( data,  doneFunction, failFunction );
	
	pathNodeMap  = [];
	
	
	
	
	// add selected nodes to the created node Path
	for (var key in nodes) {
		var element = nodes[key];		
        var jsonData = {};
		
		jsonData["pathTypeId"] = pathIdSelected;
		jsonData["pathNodeSysProperties"] = [];
		var pathNodeUuidSysProperty = {};		
		pathNodeUuidSysProperty = NodeUtils.createSysJson( listInstUuids[0] );			
		jsonData["pathNodeSysProperties"].push(pathNodeUuidSysProperty);
		
		
		jsonData["nodeTypeId"] = element.typeId;
		jsonData["nodeSysProperties"] = [];
		var nodeUuidSysProperty = {};
		nodeUuidSysProperty  = NodeUtils.createSysJson( key );
		
		jsonData["nodeSysProperties"].push(nodeUuidSysProperty);

		console.log(jsonData);
		// create edge between node path and node type
        var successFunction = function( data ) {			
			
			var node = data.edges[0].destinationNode;
			var uuid = NodeUtils.findUUID( node );	
			if (uuid != null  && key == uuid) {
				if (!pathNodeMap[uuid]) {
					pathNodeMap[uuid]= node;
				}
			}
			
					
		}
		
		var failFunction = function( xhr, status, error ) {
			$("#console-log").append("Failed to Assign Node To Path Node: " + xhr.status);
	  	    console.log("Error: " + xhr.responseText); 
		}
		
		var pathNodeApis = new PathNodeApis();
		pathNodeApis.assignNodeToPath(jsonData, successFunction, failFunction);
		
	
	}
	
	console.log(" Created a Path  whose uuid is : "+ listInstUuids[0] );
	console.log(" There are "+ Object.keys(pathNodeMap).length +" nodes added " );
	
	
	
}
DesignDecoUtils.addNodeProperties = function ( nodeUuid, value, typeId ) {
	
		  var tempType = typeMapViaId[typeId];       	  
	
		  $('#errorNode_msg').empty();
		  var tableViewInstProps = '<table border="2" id="tableNodeInfo_' + nodeUuid + '" style="border-color:'+tempType.color+'"  >';				
		  var inputpropViewRow = '';
		      inputpropViewRow += '<tr><td colspan="2"><span class="badge" style="color:black; background:'+tempType.color+'">'+tempType.name+'</span></td>';
		      inputpropViewRow += '<td><button type="button" class="close" aria-label="Close"   onclick=\"( new DesignDecoRenderer()).deleteNode(\''
		    	  +nodeUuid+'\')\"/><span aria-hidden="true">&times;</span></button></td></tr>';
		      inputpropViewRow += '<tr><td colspan="3">List of Properties:</td></tr>';
		
		      if($.isEmptyObject(tempType.typeProperties)){
		    	inputpropViewRow += '<tr><td colspan="3">NO properties were defined </td></tr>';			
		      }else {	
					$.each( tempType.typeProperties, function( propId, tmpProp ) {								
					    var propValue;				
						// build a Row for each property 
						// find the property value in nodeMap										
						$.each(value.typeProperties, function ( nodeKey, nodeProperty){	
							if( tmpProp.id == nodeProperty.id ){
								propValue = nodeProperty.value;
							}
						});
						inputpropViewRow += '<tr id="prop_' +tmpProp.id+'">' ;				
						if(tmpProp.isMandatory){ 			
							inputpropViewRow += '<td><font color="red">'+ tmpProp.name + ' ('+tmpProp.propertyType+')</font></td>' ;
							}
						else{  
							inputpropViewRow += '<td>'+ tmpProp.name + ' ('+tmpProp.propertyType+')</td>';
							}		      						
						if( (propValue != null )&& (propValue != 'undefined' ) ){	
							if (tmpProp.propertyType == "FILE") {
								var mediaType = NodeUtils.convertNodeFilePropertyValueMediaType(propValue);
								if (mediaType.includes("image/")) {
									inputpropViewRow += '<td><img id="image_file_output_show_' + tmpProp.id + '" class="imgthumb"    src="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue) + '" height="50" width="50"></td>';
								} else {
									inputpropViewRow += '<td><a id="other_file_output_show_' + tmpProp.id + '"   href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue) + '" download="' + propValue.filename + '">' + propValue.filename + '</a></td>';
								}
							}else {
									inputpropViewRow += '<td  width="100px" >'+ propValue +'</td>';
							}
						} else {
							inputpropViewRow += '<td  width="100px"> NONE </td>';	
						}
						if(tmpProp.isMandatory ){
							inputpropViewRow += '<td></td>';
						}else {
	
							inputpropViewRow += '<td><input type="button" class="nodeDeleteButton"  value="X" onclick=\"( new DesignDecoRenderer()).deleteNodeProperty('+tmpProp.id+')\"/></td>';
						}
						inputpropViewRow += '</tr>';										
					});	
		    }	
		    tableViewInstProps = tableViewInstProps + inputpropViewRow + "</table><br />";  
		    return tableViewInstProps;
		
}
