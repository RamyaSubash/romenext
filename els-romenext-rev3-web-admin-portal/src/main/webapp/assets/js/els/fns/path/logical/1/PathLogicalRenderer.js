function PathLogicalRenderer() {
	
	this.initRenderer = function() {
		
	};
	
	this.initView = function() {
		
		// reset all views
		DisplayInterfaceUtils.resetInterface();
		
		// enable path view (main, bars, leftnav, and right-bottom small window)
		this.enableView();
		
		topLevelTab = "pathInstanceViewTab";
		
		// check and complete need values
		var checked = this.checkInitialValues();
		if (checked == true) {
			// generate main view (graph, bars, right-bottom small window)
			this.loadView();
		} 
						
	};
	
	this.enableView = function() {
		
		var pathView = document.getElementById("PathView");
		pathView.style.display = "block";
		
		var nodeBar = GlobalHTMLUtils.createHTMLEntity('header', 'nodeBar', 'panel-heading', 'visible', 'block', 'Node Bar');
		nodeBar.style = "vertical-align:top;";
		pathView.appendChild(nodeBar);
		
//		var pathBar = GlobalHTMLUtils.createHTMLEntity('header', 'pathBar', 'panel-heading', 'visible', 'block', 'Path Bar');
//		pathBar.style = "vertical-align:top;";
//		pathView.appendChild(pathBar);
		
		var cy = GlobalHTMLUtils.createHTMLEntity('div', 'pirvCy', 'cy', 'visible', 'block', '');	
		pathView.appendChild(cy);
		
		// TODO: right-bottom small window to show which path is selected
//		pathView.appendChild();
		
		var pathLn = document.getElementById("path_view_leftnav");
		pathLn.style.display = "block";
		$( "#path_view_leftnav" ).draggable({
		      cursor: "move",
		      containment: [0, 260, 0, 750]
		});
		var gridPathNodes = document.createElement('div');
		gridPathNodes.id = 'grid-path-nodes';
		gridPathNodes.style.visibility = 'hidden';
		gridPathNodes.innerHTML += '<div class="box box-solid box-info" style="overflow: auto;">' // height: 717.5px; 
							+ '<div class="box-header with-border">'
							+ '<h2 class="box-title">Path Node Details</h2>'
							+ '<div class="pull-right box-tools">'
							+ '<button id="path_node_window_button" class="btn btn-box-tool" data-widget="collapse" title="Collapse"><i class="fa fa-minus"></i></button>'
							+ '</div></div><div class="box-body" id="pathNodeForm"></div></div>';
		pathLn.appendChild(gridPathNodes);
		
		this.emptyPathNodeForm()
	    this.showOrHideGridPathNodes(false); 
		
		// TODO: add tool bar
				
	};
	
	this.checkInitialValues = function() {
		
		if (selectedMetaData == null || selectedMetaData == '') {
			
			document.getElementById('path').innerHTML = "<p style='color:red'>No Metadata Selected!!</p>";
			return false;
		
		} else {
			
//			GlobalUtils.loadAllTypeAndConnections();
//			GlobalUtils.loadAllRules();
			
			if (listInstUuids.length == 1 && listEdgeUuids.length == 0) {
				
				var type = typeMapViaId[nodeMap[listInstUuids[0]].typeId];
				if (type.classification == "path") {
					
					NodeUtils.loadAllNodesAndEdges();
					
					GlobalUtils.generateBreadcrumb(null);
					
					// reset all variables related to path view
					selectedPathNode = nodeMap[listInstUuids[0]];
					pathNodeMap = {};
					
					// load all nodes in selected path node
					this.loadAllNodesInPath(selectedPathNode.sysProperties.uuid.value);
					
				    return true;
					
				} else {
					return false
				}
				
			} else {
				return false;
			}
			

			GlobalUtils.generateBreadcrumb(null);
			
		}
		
	};
	
	this.loadView = function() {
		
		if (pirvCy) {
			pirvCy.remove(pirvCy.elements());
		}

// 		this.showOrHideGridPathNodes(true);
// 		this.emptyPathNodeForm();
		
		// generate graph
		// generate node bar
		if (JSON.stringify(pathNodeMap) === JSON.stringify({})) {
			$("#console-log").append("<strong>No Nodes in Path Node</strong>");
//			$("#pathNodeForm").append("<strong>No Nodes in Path Node</strong>");
			var restNodeMap = [];
			for (var key in nodeMap) {
				if (nodeMap[key].classification == "node") {
					restNodeMap.push(nodeMap[key]);
				}
			}
 			this.loadNodeBar(restNodeMap);
		} else {
			$("#console-log").append("<strong>There are " + Object.keys(pathNodeMap).length + " Nodes in Path Node</strong>");
//			$("#pathNodeForm").append("<strong>There are " + Object.keys(pathNodeMap).length + " Nodes in Path Node</strong>");
			var elements = PathCytoscapeUtils.formatNodes(pathNodeMap);
			pirvCy = PathCytoscapeUtils.initNodeEdgeGraph(pirvCy, "pirvCy", elements);
			var restNodeMap = [];
			for (var key1 in nodeMap) {
				var inPath = false;
				for (var key2 in pathNodeMap) {
					if (key1 == key2) {
						inPath = true;
					}
				}
				if (inPath == false && nodeMap[key1].classification == "node") {
					restNodeMap.push(nodeMap[key1]);
				}
			}
			this.loadNodeBar(restNodeMap);
		}
		
		this.showPathNodeDetails(selectedPathNode.sysProperties.uuid.value);
		
		// TODO: generate path node bar
		
		// right-bottom small window
		
		// populate show selected path node in LN
					
	};
	
	this.loadNodeBar = function(nodes) {
		
		var elementsBar = {};
		elementsBar = nodes;
		var nb = Object.keys(elementsBar).length;
		var inputs = "<span class='badge'>*("+nb+")</span>";
		if( nb != 0 ){
			inputs += "<table id='node_list'><tr>";
			$.each(elementsBar, function(key, value){
				inputs += "<td ><button type='button' style='color:black; background:" + value.color + ";' id='" + value.sysProperties.uuid.value + "'  onclick='nodeSelect(this.id)'>" + value.cyDisplay;
				inputs += "</button></td>";
			});
			inputs +="</tr></table>";
			document.getElementById("nodeBar").innerHTML = inputs;
			this.nodeBarDraggable();
		} else {    			
			inputs += "<p>No Node is Created</p>";
			document.getElementById("nodeBar").innerHTML = inputs;
		}
		
	};
	
	this.loadAllNodesInPath = function(pathNodeUuid) {
		
		var node = nodeMap[pathNodeUuid];
		
		var jsonData = {};
		jsonData["pathTypeId"] = node.typeId;
		jsonData["pathNodeSysProperties"] = [];
		var nodeUuidSysProperty = {};
		nodeUuidSysProperty["propertyName"] = "uuid";
		nodeUuidSysProperty["propertyType"] = "STRING";
		nodeUuidSysProperty["value"] = pathNodeUuid;
		jsonData["pathNodeSysProperties"].push(nodeUuidSysProperty);

		console.log(jsonData);
		
//		var jsonData = '{"pathTypeId":'+node.typeId+', "pathNodeSysProperties":[{"propertyName":"uuid", "propertyType":"STRING", "value":"'+pathNodeUuid+'"}]}';
		
		var successFunction = function( data ) {			
			
			var nodes = [];
			for (var key in data.edges) {
				nodes.push(data.edges[key].destinationNode);
			}
			pathNodeMap = NodeUtils.buildNodes(nodes);
			
		}
		
		var failFunction = function( xhr, status, error ) {
			$("#console-log").append("Failed to Get Nodes in Path Node: " + xhr.status);
	  	    console.log("Error: " + xhr.responseText); 
		}
		
		var pathNodeApis = new PathNodeApis();
		pathNodeApis.getNodesInPath(jsonData, successFunction, failFunction);
		
	};
	
	this.assignNodeToPathNode = function(nodeUuid) {
		
		var node = nodeMap[nodeUuid];

		var jsonData = {};
		
		jsonData["pathTypeId"] = selectedPathNode.typeId;
		jsonData["pathNodeSysProperties"] = [];
		var pathNodeUuidSysProperty = {};
		pathNodeUuidSysProperty["propertyName"] = "uuid";
		pathNodeUuidSysProperty["propertyType"] = "STRING";
		pathNodeUuidSysProperty["value"] = selectedPathNode.sysProperties.uuid.value;
		jsonData["pathNodeSysProperties"].push(pathNodeUuidSysProperty);
		
		jsonData["nodeTypeId"] = node.typeId;
		jsonData["nodeSysProperties"] = [];
		var nodeUuidSysProperty = {};
		nodeUuidSysProperty["propertyName"] = "uuid";
		nodeUuidSysProperty["propertyType"] = "STRING";
		nodeUuidSysProperty["value"] = node.sysProperties.uuid.value;
		jsonData["nodeSysProperties"].push(nodeUuidSysProperty);

		console.log(jsonData);
		
		var successFunction = function( data ) {			
			
			var node = data.edges[0].destinationNode;
			var uuid = NodeUtils.findUUID( node );	
			if (uuid != null) {
				if (!pathNodeMap[uuid]) {
					pathNodeMap[uuid]= node;
				}
			}
			
			if (Object.keys(pathNodeMap).length == 1) {
				var elements = PathCytoscapeUtils.formatNodes(pathNodeMap);
				pirvCy = PathCytoscapeUtils.initNodeEdgeGraph(pirvCy, "pirvCy", elements);
			} else {
				PathCytoscapeUtils.updateNodeEdgeGraph(pirvCy, PathCytoscapeUtils.formatNode(node));
			}
			
			var restNodeMap = [];
			for (var key1 in nodeMap) {
				var inPath = false;
				for (var key2 in pathNodeMap) {
					if (key1 == key2) {
						inPath = true;
					}
				}
				if (inPath == false && nodeMap[key1].classification == "node") {
					restNodeMap.push(nodeMap[key1]);
				}
			}
			(new PathLogicalRenderer()).loadNodeBar(restNodeMap);
			
		}
		
		var failFunction = function( xhr, status, error ) {
			$("#console-log").append("Failed to Assign Node To Path Node: " + xhr.status);
	  	    console.log("Error: " + xhr.responseText); 
		}
		
		var pathNodeApis = new PathNodeApis();
		pathNodeApis.assignNodeToPath(jsonData, successFunction, failFunction);
		
	};
	
	this.removeNodeFromPath = function(nodeUuid) {
		
		var node = nodeMap[nodeUuid];

		var jsonData = {};
		
		jsonData["pathTypeId"] = selectedPathNode.typeId;
		jsonData["pathNodeSysProperties"] = [];
		var pathNodeUuidSysProperty = {};
		pathNodeUuidSysProperty["propertyName"] = "uuid";
		pathNodeUuidSysProperty["propertyType"] = "STRING";
		pathNodeUuidSysProperty["value"] = selectedPathNode.sysProperties.uuid.value;
		jsonData["pathNodeSysProperties"].push(pathNodeUuidSysProperty);
		
		jsonData["nodeTypeId"] = node.typeId;
		jsonData["nodeSysProperties"] = [];
		var nodeUuidSysProperty = {};
		nodeUuidSysProperty["propertyName"] = "uuid";
		nodeUuidSysProperty["propertyType"] = "STRING";
		nodeUuidSysProperty["value"] = node.sysProperties.uuid.value;
		jsonData["nodeSysProperties"].push(nodeUuidSysProperty);

		console.log(jsonData);
		
		var successFunction = function() {			
			
			// remove node from global variable
			if (nodeUuid) {
				if (pathNodeMap[nodeUuid]) {
					delete pathNodeMap[nodeUuid];
				}
			}
			
			// remove node from graph
			pirvCy.$(':selected').remove();
//			pirvCy.filter('node[sysProperties.uuid.value="' + nodeUuid + '"]').remove();
			
			var restNodeMap = [];
			for (var key1 in nodeMap) {
				var inPath = false;
				for (var key2 in pathNodeMap) {
					if (key1 == key2) {
						inPath = true;
					}
				}
				if (inPath == false && nodeMap[key1].classification == "node") {
					restNodeMap.push(nodeMap[key1]);
				}
			}
			(new PathLogicalRenderer()).loadNodeBar(restNodeMap);
			
			PathCytoscapeUtils.unselectNodes();
    		(new PathLogicalRenderer()).showPathNodeDetails(selectedPathNode.sysProperties.uuid.value);
			
		}
		
		var failFunction = function( xhr, status, error ) {
			$("#console-log").append("Failed to Remove Node From Path Node: " + xhr.status);
	  	    console.log("Error: " + xhr.responseText); 
		}
		
		var pathNodeApis = new PathNodeApis();
		pathNodeApis.removeNodeFromPath(jsonData, successFunction, failFunction);
		
	};
	
	this.saveUpdateNodeDetails = function(form) {
		
		console.log("inside saveUpdateNodeDetails");
		var jsonData = {}, nodeProperties = [], newProperties = [];
		var decoProps=[],newDecoProps=[], decoproperty ={}, newdecoproperty ={} ;
		var property = {}, newproperty = {}, foundError=false;
		var sysProperties = [];
		$(form).find('table#updateNode').find(':input').each(function (i, field) {
			jsonData[field.name] = field.value;
		});
		console.log(jsonData);
		// API will remove the uuid from newProperties
		$(form).find('table#nodeProperties').find('tr#props').each(function (i, propsTr){
			$(propsTr).find(':input').each(function(i,field){
				if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
					console.log(field.name + " value found is :"+field.value);
					if (field.name == 'value')  {   // && field.value != "undefined"
						  property[field.name] = field.value  
					} else if (field.name == 'newValue') {
						if (field.type === 'file') {
							newproperty['value'] = field.files[0];
						} else {
							newproperty['value'] = field.value;
						}
					} else { 
						property [field.name] = field.value;
						newproperty[field.name] = field.value;
					}
				}
						
			});
			
			if (newproperty.propertyType === "FILE") {
				
				if (newproperty.value) {
					var file = newproperty.value;
					newproperty.value = {};
					if (file.type.includes("image/")) {
						newproperty.value.file = document.getElementById('image_file_output_' + newproperty.propertyId).src.replace("data:" + file.type + ";base64,", "");
					} else {
						newproperty.value.file = document.getElementById('other_file_output_' + newproperty.propertyId).href.replace("data:" + file.type + ";base64,", "");
					}
					newproperty.value.filename = file.name;
				}
			
			}
			
			if((property.propertyName == 'uuid') && (newproperty.propertyName == 'uuid')){
//				nodeProperties.push(property);
				sysProperties.push(property);
	;		}else{
//					var isPropMand = findPropInType(property.propertyName, jsonData['type']);
					var isPropMand = typeMapViaId[jsonData['type']].typeProperties[property.propertyId].isMandatory;
					if(isPropMand){ // mandatory property
						if(newproperty.value){
												newProperties.push(newproperty);
				                    		  	if(property.value  && property.value != 'undefined'){ nodeProperties.push(property);}
				                    		  	
				         } else {
				        	 
				        	 if (newproperty.propertyType != "FILE") {
				        		 console.log("Missing Value for compulsory property.");
	                   		  	 $('#nodeForm').append("<br/><p style='color:red'>Missing Value for Mandatory property : "+ property.propertyName);
			                     foundError= true;
				        	 }
	                    		 
	                    }		                    	  
			
					}else {   // not mandatory
						if(newproperty.value){  // user entered a new value
												newProperties.push(newproperty);
								                if(property.value && property.value != 'undefined' ){ nodeProperties.push(property);}
							        			
						}else {  // if there was no value and user did not enter a value don't push it
//						  user may have deleted old value  
							if (property.value && property.value!= 'undefined' ){
//								       if (property.propertyType == 'INTEGER'|| property.propertyType == 'DOUBLE') { 
//								                          newproperty.value = null; }				
//							            else if(property.propertyType == 'STRING') { newproperty.value = 'null'; }  
								       newproperty.value = null;
								       nodeProperties.push(property);
								       newProperties.push(newproperty);
							}
							
						}
		        	}
			}
				           property = {}; newproperty ={};
			
		});
		//      build the set of new properties
		
		console.log(" Retrieved Properties are : "+nodeProperties);
		console.log(" The new ones are :"+ newProperties);
		if(!foundError) {
			jsonData.properties         = nodeProperties;
			jsonData.newProperties      = newProperties;
			jsonData.sysProperties      = sysProperties;
			
			$(form).find('#decoproperties').find('tr').each(function(i, decoDiv){
				$(decoDiv).find(':input').each(function(i,field){
					if ((field.type != 'submit') && (field.type != 'radio') || (field.checked)) {
						if(field.name == 'value'){ decoproperty[field.name] = field.value }
						else if (field.name == 'newValue') { 
							newdecoproperty['value'] = field.value
						} else { 
							newdecoproperty [field.name] = field.value;
							decoproperty[field.name] = field.value;
						}
					
					}
				});
				decoProps.push(decoproperty);
				newDecoProps.push(newdecoproperty);
				decoproperty = {}; newdecoproperty={};
			});
			jsonData.decoProperties = decoProps;
			jsonData.newDecoProperties = newDecoProps;
		
			$(form).find('div#defaultDecoForNode').find(':input').each(function (i, field) {
				jsonData[field.name] = field.value;
			});	
			console.log("Json constructed before mode taken"+jsonData);
			$(form).find('div#modelIdName').find(':input').each(function (i, field) {
				jsonData['modelId'] = field.value;
			});
			if(jsonData.hasOwnProperty('modelId')){
				if(jsonData['modelId']){
										$(form).find('div#partsForNodes').find(':input').each(function (i, field) {
											    console.log("part node value "+field.value);
												if (field.value != 0) 	jsonData['partGroup'] = field.value;
			                            });
				}
				console.log("Json constructed after mode taken"+jsonData.modelId );	
			}
				
			console.log(jsonData);
			
			if (selectedMetaData != null && jsonData){
				
				var successFunction = function( data ) {
					
					var node = data.nodes[0];
					var type = typeMapViaId[node.typeId]
					var nodeUuid = node.sysProperties.uuid.value;
					var nodeName  = NodeUtils.findNameInst(node);
					if (!nodeName) {
						nodeName = type.name;
					}
				    var nodeColor = type.color;
					
					if (nodeUuid == selectedPathNode.sysProperties.uuid.value) {
						
						// update node in global variable
						if (nodeUuid) {
							if (selectedPathNode) {
								selectedPathNode = node;
								selectedPathNode["cyDisplay"] = nodeName;
								selectedPathNode["color"] = nodeColor;
							}
							if (nodeMap[nodeUuid]) {
								nodeMap[nodeUuid] = node;
								nodeMap[nodeUuid]["cyDisplay"] = nodeName;
								nodeMap[nodeUuid]["color"] = nodeColor;
								
							}
						}
						
						(new PathLogicalRenderer()).showPathNodeDetails(selectedPathNode.sysProperties.uuid.value);
					
					} else {
						
						// update node in global variable
						if (nodeUuid) {
							if (pathNodeMap[nodeUuid]) {
								pathNodeMap[nodeUuid] = node;
								pathNodeMap[nodeUuid]["cyDisplay"] = nodeName;
								pathNodeMap[nodeUuid]["color"] = nodeColor;
							}
							if (nodeMap[nodeUuid]) {
								nodeMap[nodeUuid] = node;
								nodeMap[nodeUuid]["cyDisplay"] = nodeName;
								nodeMap[nodeUuid]["color"] = nodeColor;
								
							}
						}
						
						// update node from graph
						var formattedNode = PathCytoscapeUtils.formatNode(node);
						PathCytoscapeUtils.updateNodeEdgeGraph (pirvCy, formattedNode);
						
						(new PathLogicalRenderer()).showNodeDetails(nodeUuid);
					
					}
					
				};
				
				var failFunction = function( xhr, ajaxOptions, error ) {
					console.log("Update Node Properties Error: "+ xhr.status);
					$('#console-log').append("Update Node Properties Error: "+ xhr.status);
					(new PathLogicalRenderer()).emptyPathNodeForm();
					$("#pathNodeForm").append("<p style='color:red'>Update Node Properties Error: " + xhr.status + "</p>");
				};
				
				var nodeApi = new NodeApis();
				nodeApi.updateNode(jsonData, successFunction, failFunction);
			
			} else { 
				 $('#console-log').append("<p style='color:red'>Can not create a Node, You must First  select a Metadata</p>");
				 (new PathLogicalRenderer()).emptyPathNodeForm();
				 $("#pathNodeForm").append("<p style='color:red'>Can not create a Node, You must First  select a Metadata</p>");
			}
		}

		
	};
	
	this.showPathNodeDetails = function(pathNodeUuid) {
		
		var node = nodeMap[pathNodeUuid];
		
		$('#console-log').append("<p>Show Path Node Details for " + pathNodeUuid + "</p>");
		
		var form = document.createElement('div');
		var formHeader = "<form id='pathNodeShowDialog'>"; 
		var inputs = "";
		
		inputs += "<table id='showPathNode'>";
		inputs += "<tr><th><input type='hidden' name='typeName' value='" + node.type + "'><input type='hidden' name='type' value='" + node.typeId + "'>" + "Type :</th><td> '" + node.type + "' </td></tr></table>";

		var decorators = node.decorators;
		var decoList = "";
		decorators.forEach(function(deco){
			var decoName='';
			for (var key in decoMap) {
				if (decoMap[key].id.toString() == deco) {
					decoName = decoMap[key].name;
					break;
				}
			}
			if (decoName == 'Logical') {
				decoList += "<option value='" + deco + "' selected='selected'>" + decoName + "</option>";
			} else {
				decoList += "<option value='" + deco + "'>" + decoName + "</option>";
			}
		});
		inputs += "<div id='defaultDecoForNode'>Default Decorator:&nbsp;<select name='defaultDecorator' disabled>" + decoList + "</select></div>";
		
		var typeProperties = typeMapViaId[node.typeId].typeProperties;

		var inputProps="", nodeProperties= node.typeProperties;
		if(!$.isEmptyObject(typeProperties) ){

			inputProps += "<table id='nodeProperties'>";
			inputProps += "<tr><th colspan='3' style='background-color: grey'> Properties:</th><tr>";
			inputProps +="<tr><th>Name</th><th>Value</th</tr> ";
			
			$.each(typeProperties, function( key, typeProperty ) {
				//var isNew = true;
				var pName = typeProperty.name;
				var pId   = typeProperty.id;
				var pType = typeProperty.propertyType;
				var mandatory = typeProperty.isMandatory;
				var pValue, textcolor='black';
				
				$.each(nodeProperties, function( keynode, nodeProperty ) {
				    if(pId == nodeProperty.id) {			    
				    	pValue = nodeProperty.value;
				    }
				});
				inputProps += "<tr id='props'><th>";
				if(mandatory){textcolor="red";}
				inputProps += "<input type='text' style='color:"+textcolor+"' size='6' name='propertyName' value='" + typeProperty.name + "' disabled></th>";
				
				if (pType === "FILE") {
					
					// file for new
					if (!pValue) {
						inputProps += '<td>'
								   + '<img id="image_file_output_' + typeProperty.id + '" height="50" width="50" style="display:none;">'
								   + '<a id="other_file_output_' + typeProperty.id + '" style="display:none;"></a>';
					} else {
						var mediaType = NodeUtils.convertNodeFilePropertyValueMediaType(pValue);

						inputProps += '<td>';
						if (mediaType.includes("image/")) {
							inputProps += '<a target="_blank" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" class="imgthumb"  ><img id="image_file_output_' + typeProperty.id + '" src="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" height="50" width="50" style="display:;"></a>'
							 		   + '<a id="other_file_output_' + typeProperty.id + '" style="display:none;"></a>';
						} else {
							inputProps += '<img id="image_file_output_' + typeProperty.id + '" height="50" width="50" style="display:none;">'
			 				 		   + '<a id="other_file_output_' + typeProperty.id + '" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" style="display:;">' + pValue.filename + '</a>';
						}
					}
					
				} else {
					if(pValue == null || pValue == undefined) {
						inputProps += "<td ><input  style='background-color:yellow' size='8'  type='text' name='newValue' value='' disabled>";}
					else {inputProps += "<td><input type='text' size='8' name='newValue' value='" + pValue + "' disabled>";}
					
				}
							
				inputProps += "</td></tr>";
			});
			inputProps += "</table>";
		}
		
		var formFooter = "</table>";
		
		formFooter += "<input type='button' value='Update Path Node' class='btn btn-primary btn-sm' onclick='(new PathLogicalRenderer()).showUpdateNodeDetails(\"" + pathNodeUuid + "\");'/>";

		form.innerHTML = message + formHeader + inputs + inputProps + formFooter;
		
		this.showOrHideGridPathNodes(true);
 		this.emptyPathNodeForm();
 		
 		if (JSON.stringify(pathNodeMap) === JSON.stringify({})) {
 			$("#pathNodeForm").append("<strong>No Nodes in Path Node</strong>");
 		} else {
 			$("#pathNodeForm").append("<strong>There are " + Object.keys(pathNodeMap).length + " Nodes in Path Node</strong>");
 		}

		$('#pathNodeForm').append(form);
				
	};
	
	this.showNodeDetails = function(nodeUuid) {
		
		var node = nodeMap[nodeUuid];
		
		$('#console-log').append("<p>Show Path Node Details for " + nodeUuid + "</p>");
		
		var form = document.createElement('div');
		var formHeader = "<form id='nodeShowDialog'>"; 
		var inputs = "";
		
		inputs += "<table id='showNode'>";
		inputs += "<tr><th><input type='hidden' name='typeName' value='" + node.type + "'><input type='hidden' name='type' value='" + node.typeId + "'>" + "Type :</th><td> '" + node.type + "' </td></tr></table>";

		var decorators = node.decorators;
		var decoList = "";
		decorators.forEach(function(deco){
			var decoName='';
			for (var key in decoMap) {
				if (decoMap[key].id.toString() == deco) {
					decoName = decoMap[key].name;
					break;
				}
			}
			if (decoName == 'Logical') {
				decoList += "<option value='" + deco + "' selected='selected'>" + decoName + "</option>";
			} else {
				decoList += "<option value='" + deco + "'>" + decoName + "</option>";
			}
		});
		inputs += "<div id='defaultDecoForNode'>Default Decorator:&nbsp;<select name='defaultDecorator' disabled>" + decoList + "</select></div>";
		
		var typeProperties = typeMapViaId[node.typeId].typeProperties;

		var inputProps="";
		var nodeProperties = node.typeProperties;
		if(!$.isEmptyObject(typeProperties) ){

			inputProps += "<table id='nodeProperties'>";
			inputProps += "<tr><th colspan='3' style='background-color: grey'> Properties:</th><tr>";
			inputProps +="<tr><th>Name</th><th>Value</th</tr> ";
			
			$.each(typeProperties, function( key, typeProperty ) {
				//var isNew = true;
				var pName = typeProperty.name;
				var pId   = typeProperty.id;
				var pType = typeProperty.propertyType;
				var mandatory = typeProperty.isMandatory;
				var pValue, textcolor='black';
				
				$.each(nodeProperties, function( keynode, nodeProperty ) {
				    if(pId == nodeProperty.id) {			    
				    	pValue = nodeProperty.value;
				    }
				});
				inputProps += "<tr id='props'><th>";
				if(mandatory){textcolor="red";}
				inputProps += "<input type='text' style='color:"+textcolor+"' size='6' name='propertyName' value='" + typeProperty.name + "' disabled></th>";
				
				if (pType === "FILE") {
					
					// file for new
					if (!pValue) {
						inputProps += '<td>'
								   + '<img id="image_file_output_' + typeProperty.id + '" height="50" width="50" style="display:none;">'
								   + '<a id="other_file_output_' + typeProperty.id + '" style="display:none;"></a>';
					} else {
						var mediaType = NodeUtils.convertNodeFilePropertyValueMediaType(pValue);

						inputProps += '<td>';
						if (mediaType.includes("image/")) {
							inputProps += '<a target="_blank" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" class="imgthumb"  ><img id="image_file_output_' + typeProperty.id + '" src="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" height="50" width="50" style="display:;"></a>'
							 		   + '<a id="other_file_output_' + typeProperty.id + '" style="display:none;"></a>';
						} else {
							inputProps += '<img id="image_file_output_' + typeProperty.id + '" height="50" width="50" style="display:none;">'
			 				 		   + '<a id="other_file_output_' + typeProperty.id + '" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" style="display:;">' + pValue.filename + '</a>';
						}
					}
					
				} else {
					if(pValue == null || pValue == undefined) {
						inputProps += "<td ><input  style='background-color:yellow' size='8'  type='text' name='newValue' value='' disabled>";}
					else {inputProps += "<td><input type='text' size='8' name='newValue' value='" + pValue + "' disabled>";}
					
				}
							
				inputProps += "</td></tr>";
			});
			inputProps += "</table>";
		}
		
		var formFooter = "</table>";
		
		formFooter += "<input type='button' value='Remove Node' class='btn btn-primary btn-sm' onclick='(new PathLogicalRenderer()).removeNodeFromPath(\"" + nodeUuid + "\");'/>";
		formFooter += "<input type='button' value='Update Node' class='btn btn-primary btn-sm' onclick='(new PathLogicalRenderer()).showUpdateNodeDetails(\"" + nodeUuid + "\");'/>";

		form.innerHTML = message + formHeader + inputs + inputProps + formFooter;
		
		this.showOrHideGridPathNodes(true);
 		this.emptyPathNodeForm();
 		
		$('#pathNodeForm').append(form);
				
	};
	
	this.showUpdateNodeDetails = function(nodeUuid) {
		
		var node = nodeMap[nodeUuid];
		
		var form = document.createElement('div');
		var formHeader = "<form id='nodeUpdateDialog'>";
		var inputs = "";
		
		inputs += "<table id='updateNode'>";
		inputs += "<tr><th><input type='hidden' name='typeName' value='" + node.type + "'><input type='hidden' name='type' value='" + node.typeId+"'>" + "Type :</th><td> '" + node.type + "' </td></tr></table>";

		var decorators = node.decorators;
		var decoList = "";
		decorators.forEach(function(deco){
			var decoName='';
			for (var key in decoMap) {
				if (decoMap[key].id.toString() == deco) {
					decoName = decoMap[key].name;
					break;
				}
			}
			if (decoName == 'Logical') {
				decoList += "<option value='" + deco + "' selected='selected'>" + decoName + "</option>";
			} else {
				decoList += "<option value='" + deco + "'>" + decoName + "</option>";
			}
		});
		inputs += "<div id='defaultDecoForNode'>Default Decorator:&nbsp;<select name='defaultDecorator'>" + decoList + "</select></div>";
		
		var typeProperties = typeMapViaId[node.typeId].typeProperties;
		var nodeProperties= node.typeProperties;

		var inputProps="";
		if(!$.isEmptyObject(typeProperties) ){
		
			inputProps += "<table id='nodeProperties'>";
			inputProps += "<tr><th colspan='3' style='background-color: grey'> Properties:</th><tr>";
			inputProps +="<tr><th>Name</th><th style='display:none;'>Type</th><th>Value</th</tr> ";
			inputProps +="<tr id='props'><td><input type='hidden' name='propertyName' value='uuid'></td><td><input type='hidden'name='value' value='" + nodeUuid + "'></td><td><input type='hidden'name='propertyType' value='STRING'></td></tr>";
				
			$.each(typeProperties, function( key, typeProperty ) {
				var pName = typeProperty.name;
				var pId   = typeProperty.id;
				var pType = typeProperty.propertyType;
				var mandatory = typeProperty.isMandatory;
				var pValue, textcolor='black';
				
				$.each(nodeProperties, function( keynode, nodeProperty ) {
				    if(pId == nodeProperty.id) {			    
				    	pValue = nodeProperty.value;
				    }
				});
				inputProps += "<tr id='props'><th>";
				if(mandatory){textcolor="red";}
				inputProps += "<input type='hidden' name='propertyId' value='" + typeProperty.id + "'><input type='text' style='color:"+textcolor+"' size='6' name='propertyName' value='" + typeProperty.name + "' disabled></th>";
				inputProps += "<td style='display:none;'><input type='text' size='8' name='propertyType' value='" + pType + "' disabled></td>";
				
				if (pType === "FILE") {
					var mediaType = NodeUtils.convertNodeFilePropertyValueMediaType(pValue);
					
					// file for new
					if (!pValue) {
						inputProps += '<td><input type="file" name ="newValue" value="" onchange="GlobalUtils.showFile(event, \'' + typeProperty.id + '\')" style="background-color:yellow"/>'
								   + '<a id="show_image_file_output_' + typeProperty.id + '" target="_blank" href="" class="imgthumb" style="display:none;"><img id="image_file_output_' + typeProperty.id + '" height="50" width="50" style="display:none;"></a>'
								   + '<a id="other_file_output_' + typeProperty.id + '" style="display:none;"></a>';
					} else {
						inputProps += '<td><input type="file" name ="newValue" value="'+ NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) +'" onchange="GlobalUtils.showFile(event, \'' + typeProperty.id + '\')"/>';
						if (mediaType.includes("image/")) {
							inputProps += '<a id="show_image_file_output_' + typeProperty.id + '" target="_blank" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" class="imgthumb" style="display:;"><img id="image_file_output_' + typeProperty.id + '" src="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" height="50" width="50" style="display:;"></a>'
							 		   + '<a id="other_file_output_' + typeProperty.id + '" style="display:none;"></a>';
						} else {
							inputProps += '<a id="show_image_file_output_' + typeProperty.id + '" target="_blank" href="" class="imgthumb" style="display:none;"><img id="image_file_output_' + typeProperty.id + '" height="50" width="50" style="display:none;"></a>'
			 				 		   + '<a id="other_file_output_' + typeProperty.id + '" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" style="display:;">' + pValue.filename + '</a>';
						}
					}
					// file for old
					if (pValue) {
						inputProps += '<input type="file" name ="value" value="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" disabled style="display:none;"/>';
						if (mediaType.includes("image/")) {
							inputProps += '<img id="image_file_output_fix_' + typeProperty.id + '" src="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" height="50" width="50" style="display:none;">';
						} else {
							inputProps += '<a id="other_file_output_fix_' + typeProperty.id + '" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" style="display:none;"></a>';
						}
					}
					
				} else if (pType === "BOOLEAN") {
					
					if(pValue == null || pValue == undefined) {
						inputProps += "<td><form><input type='radio' name='newValue' value='true'>true   <input type='radio' name='newValue' value='false'>false</form>";
					} else {
						inputProps += "<td><form><input id='id_for_boolean_property_" + typeProperty.id + "_true' type='radio' name='newValue' value='true' onclick='GlobalHTMLUtils.recheckRadioButtons(\"id_for_boolean_property_" + typeProperty.id + "_true\", \"id_for_boolean_property_" + typeProperty.id + "_false\");'";
					    if (pValue == true) { inputProps += " checked";};   inputProps += ">true   ";
					    inputProps += "<input id='id_for_boolean_property_" + typeProperty.id + "_false' type='radio' name='newValue' value='false' onclick='GlobalHTMLUtils.recheckRadioButtons(\"id_for_boolean_property_" + typeProperty.id + "_false\", \"id_for_boolean_property_" + typeProperty.id + "_true\");'";
					    if (pValue == false) { inputProps += " checked";};  inputProps += ">false</form>";
					}
					
					inputProps += "<input type='hidden' name='value' value='" + pValue + "'>";
				} else if (pType === "DATE"){
					if(!pValue ){
					   inputProps += "<td><input title='" + pType + "'  size='8' type='text' style ='position: relative; z-index: 100000; background-color: yellow;' name='newValue' value='' id= '"+typeProperty.id+"'/>";
					}else {
						inputProps += "<td><input title='" + pType + "' type='text' style ='position: relative; z-index: 100000;' size='8' name='newValue' value='" + pValue + "' id= '"+typeProperty.id+"'   >";
					}   
					listDates.push(typeProperty.id);
					inputProps += "<input type='hidden' name='value' value='" + pValue + "'>";	
				} else if (pType === "INTEGER") {
					if(!pValue) {
						inputProps += "<td ><input  title='" + pType + "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' onkeypress='return event.charCode >= 48 && event.charCode <= 57'>";}
					else {inputProps += "<td><input title='" + pType + "' type='text' size='8' name='newValue' value='" + pValue + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57'>";}
					inputProps += "<input type='hidden' name='value' value='" + pValue + "'>";	
				} else if (pType === "DOUBLE" || pType === "CURRENCY") {
					if(!pValue) {
						inputProps += "<td ><input  title='" + pType + "' style='background-color:yellow' size='8'  type='text' name='newValue' value='' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'>";}
					else {inputProps += "<td><input title='" + pType + "' type='text' size='8' name='newValue' value='" + pValue + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'>";}
					inputProps += "<input type='hidden' name='value' value='" + pValue + "'>";	
				} else {
					if(!pValue) {
						inputProps += "<td ><input  title='" + pType + "' style='background-color:yellow' size='8'  type='text' name='newValue' value=''>";}
					else {inputProps += "<td><input title='" + pType + "' type='text' size='8' name='newValue' value='" + pValue + "'>";}
					inputProps += "<input type='hidden' name='value' value='" + pValue + "'>";	
				}
							
				inputProps += "</td></tr>";
			});
			inputProps += "</table>";
		}
		
		var formFooter = "</table>";
		
		formFooter += "<input type='button' value='Update'  class='btn btn-primary btn-sm'  onclick='(new PathLogicalRenderer()).saveUpdateNodeDetails(form)' />";
	    formFooter += "<input type='button' value='Cancel'  class='btn btn-primary btn-sm'  onclick='(new PathLogicalRenderer()).cancelUpdateNodeDetails(\"" + nodeUuid + "\");' />";
	    form.innerHTML = message + formHeader + inputs + inputProps + formFooter;
	   	    
		this.showOrHideGridPathNodes(true);
 		this.emptyPathNodeForm();
 		
		$('#pathNodeForm').append(form);
		
		DisplayInterfaceUtils.addDatePicker ('');

	};
	
	this.cancelUpdateNodeDetails = function(nodeUuid) {
		
		if (nodeUuid == selectedPathNode.sysProperties.uuid.value) {
			this.showPathNodeDetails(nodeUuid);
		} else {
			this.showNodeDetails(nodeUuid);
		}
		
	};
	
	this.nodeBarDraggable = function(pathNodeUuid) {
		
		$(function() {
			
			console.log("making node bar draggable");
			
			$gallery = $( "#nodeBar" );
			
		    // let the gallery items be draggable
		    $('td', $gallery).draggable({
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
		    var $workspace = $("#pirvCy");
		    $workspace.droppable({
		    	accept: "td",
		        activeClass: "ui-state-highlight",
		        drop: function(event, ui) {
		        	
		        	dragItemPositionX=0; dragItemPositionY=0;
		        	var offset = $("#pirvCy").offset();
		            
		            // get mouse position relative to drop target: 
		            dragItemPositionX = event.originalEvent.pageX - offset.left ;
		            dragItemPositionY = event.originalEvent.pageY - offset.top;
		            
		            console.log("Dropped at X: " + dragItemPositionX + " Y: " + dragItemPositionY);	
		            
		            (new PathLogicalRenderer()).assignNodeToPathNode(ui.helper.children()[0].id);
		            
		        }
		    });
		   			
		});
		
	};
	
	this.nodeSelect = function(nodeUuid) {
		if (nodeUuid in pathNodeMap) {
			pirvCy.filter('node[sysProperties.uuid.value="' + nodeUuid + '"]').select();
		}
	};
	
	this.emptyPathNodeForm = function() {
		$('#pathNodeForm').empty();
	};
	
	this.showOrHideGridPathNodes = function(value) {
		 if(value){
			 $("#grid-path-nodes").css({'visibility':'visible'});
		 }else {
			 $("#grid-path-nodes").css({'visibility':'hidden'});
		 }
	};
	
};