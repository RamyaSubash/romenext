function DisplayLogicalRenderer() {
	
	this.divholderId;
	
	this.initBase = function( divId ) {
		this.divHolderId = divId;
	};
	
	this.initRenderer = function() {
		
//		NodeUtils.global_node_fns( "create", "logical", DisplayLogicalRendererCrud.nodeCreate );
//		NodeUtils.global_node_fns( "read", "logical", DisplayLogicalRendererCrud.nodeRead );
//		NodeUtils.global_node_fns( "update", "logical", DisplayLogicalRendererCrud.nodeUpdate );
		
	};

	this.resetView = function() {
		
		document.getElementById(activeDecos_BODY[this.divHolderId]).style.display = 'none';
		
		typeMap = {};      
		typeMapViaId = {};		
		ruleMap = {};         
		ruleMapViaId = {};
		connMap = {};
		connMapViaId = {};
		
		nodeMap = {};        
		edgeMap = {};
		
		listTypeIds =[];
		listConnIds=[];
		
		this.initView();
					
	};
	
	this.initView = function() {
		
		if (document.getElementById(activeDecos_BODY[this.divHolderId]).style.display != 'block') {
			selecteddecorator = "Logical";	
			DisplayInterfaceUtils.resetInterface();
			
			this.enableLogicalDesignView();
			
			var checked = this.checkInitialValues();
			
			if (checked == true) {
				this.generatePath();
				this.loadView();
			} 
			var tabs = GlobalUtils.loadAllTabs();
			if(!$.isEmptyObject(tabs) ){
			   GlobalUtils.generateAllTAbs(tabs );
			}
		} 
				
	};
	
	this.enableLogicalDesignView = function() {
		
		var logicalDecoBody = document.getElementById(activeDecos_BODY[this.divHolderId]);
		logicalDecoBody.style.display = "block";
		
		if (document.getElementById('"typeBar2"') == undefined || document.getElementById('"typeBar2"') == null) {
			
			var typeBar = GlobalHTMLUtils.createHTMLEntity('header', 'typeBar2', 'panel-heading', 'visible', 'block', 'Type Bar');
			typeBar.style = "vertical-align:top;";
			logicalDecoBody.appendChild(typeBar);
		}
		
//		if (document.getElementById('ruleInstBar') == undefined || document.getElementById('ruleInstBar') == null) {
//			
//			var ruleBar = GlobalHTMLUtils.createHTMLEntity('header', 'ruleInstBar', 'panel-heading', 'visible', 'block', 'Rule Bar');
//			ruleBar.style = "vertical-align:top;";
//
//			logicalDecoBody.appendChild(ruleBar);
//		}
		
		if (document.getElementById('connectionInstBar') == undefined || document.getElementById('connectionInstBar') == null) {
			
			var connectionBar = GlobalHTMLUtils.createHTMLEntity('header', 'connectionInstBar', 'panel-heading', 'visible', 'block', 'Connection Bar');
			connectionBar.style = "vertical-align:top;";

			logicalDecoBody.appendChild(connectionBar);
		}
		
		if (document.getElementById('irvCy') == undefined || document.getElementById('irvCy') == null) {
			
			var cy = GlobalHTMLUtils.createHTMLEntity('div', 'irvCy', 'cy', 'visible', 'block', '');	
			
			logicalDecoBody.appendChild(cy);
		}
		
		var logicalDecoLn = document.getElementById(activeDecos_LN[this.divHolderId]);
		logicalDecoLn.style.display = "block";
		$( "#" + activeDecos_LN[this.divHolderId] ).draggable({
		      cursor: "move",
		      containment: [0, 260, 0, 750]
		});
		
		if (document.getElementById('grid-types') == undefined || document.getElementById('grid-types') == null) {
			
			var gridTypes = document.createElement('div');
			gridTypes.id = 'grid-instances';
			gridTypes.style.visibility = 'hidden';
			gridTypes.innerHTML += '<div class="box box-solid box-info" style="overflow: auto;">' // height: 717.5px; 
								+ '<div class="box-header with-border">'
								+ '<h2 class="box-title">Instance Details</h2>'
								+ '<div class="pull-right box-tools">'
								+ '<button id="instance_window_button" class="btn btn-box-tool" data-widget="collapse" title="Collapse"><i class="fa fa-minus"></i></button>'
								+ '</div></div><div class="box-body" id="nodeForm"></div></div>';
			logicalDecoLn.appendChild(gridTypes);
			
		}
		this.emptyAllInst()
	    this.showOrHideGridInstances(false); 
		
		var logicalDecoTb = document.getElementById(activeDecos_TB[this.divHolderId]);
		logicalDecoTb.style.display = "block";
		
		if (document.getElementById('toolbar_romenext') == undefined || document.getElementById('toolbar_romenext') == null) {
			var toolBar = document.createElement('div');
			toolBar.id = 'toolbar_romenext';
			logicalDecoTb.appendChild(toolBar);
			
			console.log("Initial value of selectedDecorator is : "+selecteddecorator);
			if (selectedMetaData) {
//				selecteddecorator = 'Logical';
				(new toolbarManagerRomeNext()).createDisplayTool();	
				if(selectedMetaData.length != "") { 
					this.showOrHideGridInstances(true);
				}	
			}
		}
		
	};
	
	this.checkInitialValues = function() {
			
		if (selectedMetaData == null || selectedMetaData == '') {
			document.getElementById('path').innerHTML = "<p style='color:red'>No Metadata Selected  !!</p>";
			return false;
		
		} else {
			
			GlobalUtils.freshAllTypeAndConnections();
			GlobalUtils.freshAllRules();
			GlobalUtils.generateBreadcrumb(selecteddecorator);
			
			topLevelTab = "instRelViewTab";
			NodeSelected = null;
			LD_FocussedNode = null;
			prevDrilldown =null;
			historyNode = [];
			
			listInstUuids = [];
			listEdgeUuids = [];
			
			if (listTypeIds.length != 0 || listConnIds.length != 0) {		
				loadInstNode = false;
				loadInst = true;
			    typeMapInst = {}; 
			    nodeMapInst = {};

			    if(listTypeIds.length != 0) {
			    	   for (i=0; i<listTypeIds.length; i++ ){	
			    			$.each(typeMap, function(key, value){
			    				if(value.id == listTypeIds[i]) {  value.nb = 0; typeMapInst[key] = typeMap[key];   }
			    			});
			    	   }                 
			    }
			    NodeUtils.loadNodes();
			} else {
				NodeUtils.loadAllNodesAndEdges();
			}
			
			return true;
			
		}
		
	};
	
	this.generatePath = function() {
		var list = '';
		list += "<li><i class='fa fa-home'></i><a href='#'>Home</a><i class='fa fa-angle-right'></i></li>";
		list += "<li><a href='#'>Logical Display</a></li>";
		for (var key in listTypeIds) {
			list += "<li><a href='#'>" + typeMapViaId[listTypeIds[key]].name + "</a></li>";
		}
		document.getElementById('path').innerHTML = list;
	};
	
	this.loadView = function() {
		
		if(irvCy) {irvCy.remove(irvCy.elements());}
		
		if (JSON.stringify(nodeMap) === JSON.stringify({})) {
 			$("#console-log").append("No Instances Created");
 			this.showOrHideGridInstances(true);
 			this.emptyAllInst();
 			$("#nodeForm").append("No Instances Created");  
 			this.loadTypeInstBar(null);
		} else {
			var elements = DisplayCytoscapeUtils.formatNodesAndEdges();
			irvCy = initNodeEdgeGraph(irvCy, "irvCy", elements);
			this.loadTypeInstBar(nodeMap);
		}
//		this.initRuleBarInst('ruleInstBar');
			
	};
	
	this.loadTypeInstBar = function(source) {
		typeMapInst ={}; 
		this.setTypeNB();
		var elementBase = {}, element;
		if(source != null){
			$.each(source, function(key, value){
				 element = value.typeId;
				 elementBase = typeMapViaId[element];
	             typeMapInst[element].nb = typeMapInst[element].nb + 1;
			});
		}
		this.initNodeBar('typeBar2');
	};
	
	this.setTypeNB = function() {
		typeMapInst = typeMapViaId;
		var elementBase = {};
		$.each(typeMapInst, function(key, value){
			 elementBase = value; 
			 elementBase.nb = 0;
			typeMapInst[key] =elementBase;
		});
	};
	
	this.initNodeBar = function(bar) {
		var elementsBar = {};
		elementsBar = typeMapInst;	
		var nb = Object.keys(elementsBar).length;
		var inputs = '';
		if( nb != 0 ){
			inputs ="<table id='typesList'><tr>";
			// TODO: should use id to get the function
			inputs += "<td><span class='badge' onclick='displayLogicalRenderer.resetView();'>*("+nb+")</span></td>";
			$.each(elementsBar, function(key, value){
				inputs += "<td ><button type='button' style='color:black; background:"+value.color+"' id='"+value.id+"'  onclick=\"selectedType('" + value.name + "')\"  >"+value.name;
				inputs += "<span class='badge'>";
				if(value.nb){ 
					inputs += value.nb;
				} else {
					inputs += '0';
				}
				inputs += "</span>";
				inputs += "</button></td>";
			});
			inputs +="</tr></table>";
			document.getElementById(bar).innerHTML = inputs;
			this.typeNodeBarDraggable();
		} else {    			
			inputs += "<p> No Type is created yet</p>";
			document.getElementById(bar).innerHTML = inputs;
		}
		
	};
	
	this.initRuleBarInst = function(bar) {
		var nb = Object.keys(ruleMap).length;
		var inputs = '';
		if(nb != 0) {
			inputs ="<table id='ruleList'><tr>";
			inputs += "<td><span class='label label-default'>*("+nb+")</span></td>";
			$.each(ruleMap, function(key, value){		
				inputs += "<td><span";
				if (value.classification == "parentchild") {
					inputs += " class='label label-primary' " ;	
				} else if (value.classification == "link") {
					inputs += " class='label label-success' ";	
				} else {
					console.log("Classification Is Wrong: " + value.id);
				}	    
				inputs += " id="+value.id+" title='create an edge'  data-content='select Origin & destination Types'   onclick='createEdge(this);'  >"+key+"</span></td>"
			});
			inputs +="</tr></table>";
			document.getElementById(bar).innerHTML = inputs;
		} else {
			inputs += "<p> No Rules created yet</p>";   
			document.getElementById(bar).innerHTML = inputs;
		}
	};
	
	this.initConnectionBarInst = function() {
		
		if (listInstUuids.length == 1 && listEdgeUuids.length == 0) {
			
			// find all the connections by the child types of the type of the selected node
			var childConnectionsId = GlobalConnUtils.getAllChildConnections(nodeMap[listInstUuids[0]].typeId);
			
			// show the connections like Connect Room (child type name)
			var nb = childConnectionsId.length;
			var inputs = '';
			if(nb != 0) {
				inputs ="<table id='connectionList'><tr>";
				inputs += "<td><span class='label label-default'>*("+nb+")</span></td>";
				$.each(childConnectionsId, function(key, value){
					var connection = connMapViaId[value];
					var min = Number(connection.minRel);
					var max = Number(connection.maxRel);
					if (max == -1) {
						max = Number.POSITIVE_INFINITY;
					}
					inputs += "<td id='connection_bar_element_" + value + "'><span class='label label-primary' id=" + connMapViaId[value].id + " title='Connect Node' data-content='Select Destination Node' onclick='(new DisplayLogicalRenderer()).createEdge(this);'>Connect " + typeMapViaId[connMapViaId[value].target].name + " [" + min + ", " + max + "]</span></td>";
				});
				inputs += "</tr></table>";
				document.getElementById("connectionInstBar").innerHTML = inputs;
			} else {
				inputs += "<p>No Child Connections Found</p>";   
				document.getElementById("connectionInstBar").innerHTML = inputs;
			}
			
		}
		
	};
	
	this.clearConnectionBarInst = function() {
		$('#connectionInstBar').empty();
	};
	
	this.emptyAllInst = function() {
		$('#nodeForm').empty();
	};
	
	this.showOrHideGridInstances = function(value) {
		 if(value){
			 if($("#grid-instances").css('visibility') == 'hidden'){$("#grid-instances").css({'visibility':'visible'});}
		 }else {
			 if($("#grid-instances").css('visibility') == 'visible'){$("#grid-instances").css({'visibility':'hidden'});}
		 }
	};
	
	
	this.typeNodeBarDraggable = function() {
		
		$(function() {
			console.log("making type bar draggable");
			
			$gallery = $( "#typeBar2" );
			
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
		    var $workspace = $("#irvCy");
		    $workspace.droppable({
		    	accept: "td",
		        activeClass: "ui-state-highlight",
		        drop: function(event, ui) {
		        	
		        	// this needs to test for typeBar2 and typeInstBar == could be a Type   or a Node instance
		        	dragItemPositionX=0; dragItemPositionY=0;
		        	var offset = $("#irvCy").offset();
		            
		            // get mouse position relative to drop target: 
		            dragItemPositionX = event.originalEvent.pageX - offset.left ;
		            dragItemPositionY = event.originalEvent.pageY - offset.top;
		            
		            console.log("Dropped at  X: "+dragItemPositionX + " Y:  "+dragItemPositionY);	            
	      	
			        if (!isNaN(ui.helper.children()[0].id)) {
			        	
			        	var name = ui.helper.children()[0].innerHTML; 
			        	var id = ui.helper.children()[0].id;
			        	if (name.includes("<")){
			        		name = name.substring(0, name.indexOf('<'));
				        	console.log("Found this "+name);
				        }	        	
//				       	checkTypeIsRoot(name);
			        	(new DisplayLogicalRenderer()).createNode(id);
			        	
			        } else {
			        	console.log(ui);
			        	// got the name of the node
			        	var nodeName = ui.helper.children()[0].innerHTML;
			        	console.log("dragged this node "+ nodeName);
			        	if (loadInstNode) { 
			        		element = nodeMapInst[nodeName];                        		
			        	} else {
			        		element = nodeMap[nodeName];	        		
			        	}
			        	
			        }
		        }
		    });
		   			
		});
		
	};
	
	this.changeMessagesForEdgeClassifications = function() {
		
		var rule = document.getElementById('rule_name_selector_id').value;
		
		var message = document.getElementById('create_node_message');
		
		if (ruleMap[rule].classification == "parentchild") {
			message.innerHTML = "Creating a node with: <b>" + message.value + "</b> as Parent";
			message.style.color = 'blue';
		} else if (ruleMap[rule].classification == "link") {
			message.innerHTML = "Creating a node with: <b>" + message.value + "</b> as Connected";
			message.style.color = 'blue';
		} else {
			message.innerHTML = "Wrong Connection Classification: " + ruleMap[rule].classification;
			message.style.color = 'red';
		}
	};
	
	this.createNode = function(typeId) {
		
		this.cancelCreateNode();
		
		if (!typeId || !typeMapViaId[typeId]) {
			console.log("Wrong Data: " + typeId);
			return;
		}
		
		if (typeMapViaId[typeId].classification == "system") {
			console.log("Cannot Create System Node: " + typeId);
			return;
		}
		
		$("#grid-instances").css({'visibility':'visible'});
		
		if (listInstUuids.length == 1 && listEdgeUuids.length == 0) {
			
			var selectedStartNode = nodeMap[listInstUuids[0]];
			var endNodeTypeId = typeId;
			
			var conns = GlobalConnUtils.findConnsBySourceAndTarget(selectedStartNode.typeId, endNodeTypeId);
//			var conns2 = GlobalConnUtils.findConnsBySourceAndTarget(endNodeTypeId, selectedStartNode.typeId);
			
			var children = GlobalNodeUtils.getAllChildrenNodesUnderType(listInstUuids[0], endNodeTypeId);
//			var children2 = GlobalNodeUtils.getAllChildrenNodesUnderType(endNodeTypeId, listInstUuids[0]);
			
			if (conns) {
				
				if (conns.length > 0) {
					for (var key in conns) {
						
						var numberOfChildren = Object.keys(children).length;
//						var numberOfChildren1 = children.length;
							
						 if (Number(conns[key].maxRel) != -1) {
							 if (numberOfChildren >= Number(conns[key].maxRel)) {
								 $('#nodeForm').append("<p style='color:red'>" + typeMapViaId[selectedStartNode.typeId].name + " Cannot Have More " + typeMapViaId[endNodeTypeId].name + "</p>");
								 return;			 
							 }

						 }
						
					}
				} else {
					$("#nodeForm").empty();
					$("#nodeForm").append("<p style='color:red'>Cannot Create Destination Node to Seleted Node</p>");
					return;
				}
				
			} else {
				 $("#nodeForm").empty();
				 $("#nodeForm").append("<p style='color:red'>Cannot Create Destination Node to Seleted Node</p>");
				 return;
			}
			
//			if (conns2) {
//				for (var key in conns2) {
//					var numberOfChildren2 = Object.keys(children).length;
////					var numberOfChildren2 = children.length;
//					 if (Number(conns2[key].maxRel) != -1) {
//						 if (numberOfChildren2 >= Number(conns2[key].maxRel)) {
//							 $('#nodeForm').append("<p style='color:red'>" + typeMapViaId[endNodeTypeId].name + " Cannot Have More " + typeMapViaId[selectedStartNode.typeId].name + "</p>");
//							 return;			 
//						 }
//
//					 }
//				}
//			}
			
		}
		
		var nodeForm = document.getElementById("nodeForm");
		
		var createSelectedTypeNodeForm = this.generateCreateNodeForm(typeId);
		nodeForm.innerHTML += createSelectedTypeNodeForm;
	
		// add one time add buttons for all directly required types
		var requiredTypeIds = [];
		requiredTypeIds = this.getAllRequiredChildTypes(typeId);
		
		var inputs = this.generateAddButtonsForAllRequiredTypes(typeId, requiredTypeIds);
		nodeForm.innerHTML += inputs;
		
		// add create and cancel buttons
		var createButton = '<br><input type="button" value="Add Node" class="btn btn-primary btn-sm" onclick="(new DisplayLogicalRenderer()).saveNodeInfo(' + typeId + ');"/>';
		var cancelButton = '<input type="button" value="Cancel" class="btn btn-primary btn-sm" onclick="(new DisplayLogicalRenderer()).cancelCreateNode();"/>';
		nodeForm.innerHTML += createButton + cancelButton + "<div id='create_node_error_message_" + typeId + "'></div>";
		DisplayInterfaceUtils.addDatePicker ('create_node_property_');
	};
	
	this.createEdge = function(connectionBarElement) {
		
		if (connSelected) {
			var change = confirm("Previous connection selected but not done. Do you want to change connection?");
			if (change) {
//				originType = null;
//				destType = null;
				$('#connection_bar_element_' + connSelected).replaceWith( "<span class='label label-primary' id=" + connSelected + " title='Connect Node' data-content='Select Destination Node' onclick='(new DisplayLogicalRenderer()).createEdge(this);'>" + $('#connection_bar_element_' + connSelected).text() + "</span>" );
				$(connectionBarElement).replaceWith( "<span id='highlightConnection' title='Select Destination Node'>" + $( connectionBarElement ).text() + "</span>" );
				connSelected = connectionBarElement.id;
				
				DisplayCytoscapeUtils.removeHighlightAndUnhighlight();
				var type = typeMapViaId[connMapViaId[connSelected].target];
				var nodesUnderType = irvCy.nodes("[typeId=" + Number(type.id) + "]");
				nodesUnderType.addClass('highlight');
				irvCy.elements().not(nodesUnderType).addClass('semitransp');
				
				mouseEventTime = new Date().getTime();
				pleaseWait = true;
				GlobalUtils.cursor_wait();
			} else {
				// reinitiate
//				originType = null;
//				destType = null;
				mouseEventTime = new Date().getTime();
				pleaseWait = true;
			}
		} else { // first time that connection is selected  connSelected = null
//			originType = null;
//			destType = null;
			$(connectionBarElement).replaceWith( "<span id='highlightConnection' title='Select Destination Node'>" + $( connectionBarElement ).text() + "</span>" );
			connSelected = connectionBarElement.id;
			
			DisplayCytoscapeUtils.removeHighlightAndUnhighlight();
			var type = typeMapViaId[connMapViaId[connSelected].target];
			var nodesUnderType = irvCy.nodes("[typeId=" + Number(type.id) + "]");
			nodesUnderType.addClass('highlight');
			irvCy.elements().not(nodesUnderType).addClass('semitransp');
			
			mouseEventTime = new Date().getTime();
			pleaseWait = true;
			GlobalUtils.cursor_wait();
		}
		
	};
	
	this.showCreateEdge = function () {
		
		$("#grid-instances").css({'visibility':'visible'});
		var Form = document.createElement('div');
		if (selectedMetaData != null) {
			
			var connection = connMapViaId[connSelected];
			var startNode = originNode;
			var endNode = destNode;
			
			var oNodeName = NodeUtils.findNameInst(startNode);
			var dNodeName = NodeUtils.findNameInst(endNode);
			
			var formHeader = "<form id='addEdgeDialog'>", inputs = "";
			//  Given origin type and destination type 
			
			/**
			 * Creating edge from
			 * [ BAY ] -> [ OPTIONAL ]
			 * 
			 * 
			 */
						
//			inputs += "Creating an edge using [" + connection.name + "] connection to connect <br>";
//			inputs += "[" + startNode.type + "] -- (" + connection.name +")" + "--> [" + endNode.type + "]<br>";
//			inputs += "[" + oNodeName + "] -- (" + connection.name +")" + "--> [" + dNodeName + "]<br>"; 
			
//			inputs += "<table>";
//			inputs += "</table>";
			
			inputs += "<div id='edge_detal'>";
			inputs += "<label>Origin Type:&nbsp;</label>" + startNode.type + "<input type='hidden' name='originTypeName' value='" + startNode.type + "'/><input type='hidden' name='originType' value='"+typeMap[startNode.type].id+"'/><br>";
			inputs += "<label>Origin Node:&nbsp;</label>" + oNodeName + "<input type='hidden' name='originNodeUuid' value='" + startNode.sysProperties.uuid.value + "' disabled/><br>";
			inputs += "<label>Destination Type:&nbsp;</label>" + endNode.type + "<input type='hidden' name='destinationTypeName' value='" + endNode.type + "'/><input type='hidden' name='destinationType' value='"+typeMap[endNode.type].id+"'/><br>";
			inputs += "<label>Destination Node:&nbsp;</label>" + dNodeName + "<input type='hidden' name='destinationNodeUuid' value='" + endNode.sysProperties.uuid.value + "' disabled/><br>";
			inputs += "<label>Connection:&nbsp;</label>" + connection.name + "<input type='hidden' name='connection' value='"+connection.id+"'/><br>";
			
//			inputs += "<table>";
//			inputs += "<tr><th><label>Origin: </th><td>"+startNode.type+"<input type='hidden' name='originTypeName' value='"+startNode.type+"'/><input type='hidden' name='originType' value='"+typeMap[startNode.type].id+"'/> </label></td></tr>";
//			inputs += "<tr><td><label>Instance: </td><td>"+oNodeName+"<input type='hidden' name='originNodeUuid' value='"+originNode.sysProperties.uuid.value+"' disabled/></td></tr>";
//			inputs += "<tr><td colspan='2'>-------------------</td>";
//			inputs += "<tr><th><label>Destination: </th><td>"+endNode.type+"<input type='hidden' name='destinationTypeName' value='"+endNode.type+"'/><input type='hidden' name='destinationType' value='"+typeMap[endNode.type].id+"'/> </label></td></tr>";
//			inputs += "<tr><td><label>Instance: </td><td>"+dNodeName+"<input type='hidden' name='destinationNodeUuid' value='"+destNode.sysProperties.uuid.value+"' disabled/></td></tr>";
//			inputs += "<tr><td colspan='2'>-------------------</td>";
//	        inputs += "<tr><th>Connection used:</th><td>"+connection.name+"<input type='hidden' name='connection' value='"+connection.id+"'/></td></tr>";
	        
			// display the list of properties for this Connection
	        connProperties = ruleMapViaId[connection.ruleId].typeProperties;
			inputsProps = "<table  id='properties'>";
			$.each(connProperties, function(key, ruleProperty){    
				if(ruleProperty.isMandatory) {propcolor='color:red'}
				else{propcolor='color:black'   }
				
				inputsProps += "<tr><th style=" + propcolor + "><input type='hidden' name='propertyId' value='" + ruleProperty.id + "'>" + ruleProperty.name + ": </th><td>";
				
				if (ruleProperty.propertyType === "FILE") {
					inputsProps += "<input id='create_node_property_" + ruleProperty.id + "' type='file' name='value' onchange='GlobalUtils.showFile(event, \"" + ruleProperty.id + "\")'/>"
								+ "<a id='show_image_file_output_" + ruleProperty.id + "' target='_blank' href='' class='imgthumb' style='display:none;'><img id='image_file_output_" + ruleProperty.id + "' style='display:none;' height='50' width='50'></a>"
								+ "<a id='other_file_output_" + ruleProperty.id + "' style='display:none;'></a>"
								+"(" + ruleProperty.propertyType + ")";
				} else if (ruleProperty.propertyType == 'DATE') {
					inputsProps += "<input id='create_node_property_" + ruleProperty.id + "' type='text' size='10'  style ='position: relative; z-index: 100000;' name='value' id= '"+ruleProperty.id+"'  value='" + today + "'/>(" + ruleProperty.propertyType + ")";
					listDates.push(ruleProperty.id);
				} else if (ruleProperty.propertyType == 'INTEGER') {
					inputsProps += "<input id='create_node_property_" + ruleProperty.id + "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>(" + ruleProperty.propertyType + ")";
				} else if (ruleProperty.propertyType == 'DOUBLE' || ruleProperty.propertyType == 'CURRENCY') {
					inputsProps += "<input id='create_node_property_" + ruleProperty.id + "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'/>(" + ruleProperty.propertyType + ")";
				} else if (ruleProperty.propertyType == 'BOOLEAN') {
					inputsProps += "<form><input id='create_node_property_" + ruleProperty.id + "' type='radio' name='value' value='true'>true   <input type='radio' name='value' value='false'>false</form>";
				} else {
					inputsProps += "<input id='create_node_property_" + ruleProperty.id + "' type='text' size='10' name='value' />(" + ruleProperty.propertyType + ")";
				}
				
				inputsProps += "<input type='hidden' name='propertyType' value='" + ruleProperty.propertyType + "'></td></tr>";
		
			});
			inputsProps += "</table>";	
	        	        
//	    	var propertyies = ConnectionPropertyUtils.getRulePropertiesHTML( connection, true, false, null, null );

//	    	var properties2 = ConnectionPropertyUtils.createFormRuleProperty( connection, true, false, null, null ) ;
	    	
	        inputs += "<label>Properties</label><br>";
//		    inputs += "<div id='edgeProperties'>" + propertyies + "</div>";
//		    inputs += "<div id='edgeProperties'>" + properties2 + "</div>";
		    inputs += "<div id='edgeProperties'>" + inputsProps + "</div><br>";

//		    inputs += "</td></tr>";
		    
		    formFooter = "<input type='button' value='Add Edge' class='btn btn-primary btn-sm' onclick='(new DisplayLogicalRenderer()).saveEdge(form);'/>";
		    formFooter += "<input type='button' value='Cancel' class='btn btn-primary btn-sm' onclick='cancelNodeConnection();'/>";
			Form.innerHTML = formHeader + inputs + formFooter;
			(new DisplayLogicalRenderer()).emptyAllInst();
			$('#nodeForm').append(Form);
			
		} else {
			 $('#console-log').append("<p style='color:red'>Can not create an Edge, You must First  select a Metadata</p>");
		}
	}
	
	this.generateCreateNodeForm = function(typeId) {

		if (selectedMetaData != null) {
			
			var inputs = '';
			var typeProperties = null;
			var inputsProps = '';
			var decorators = null;
			var propcolor = '';
	
			var currentType = typeMapViaId[typeId];
			
			var formHeader = '<form id="create_node_form_for_' + typeId + '">';
			
			inputs += "<div id='typeName'>";
			if (listInstUuids.length == 1 && listEdgeUuids.length == 0) {
				inputs += "<label> Creating " + currentType.name + " Node to Connect " + nodeMap[listInstUuids[0]].type + " Node </label>";
			} else {
				inputs += "<label> Creating " + currentType.name + " Node </label>";
			}
			inputs += "<input type='hidden' name='type' value='"+currentType.name+"'/><input type='hidden' name='typeId' value='"+currentType.id+"'/></div>";
	        
			// display the list of properties for this Type  
			typeProperties = currentType.typeProperties;
			inputsProps = "<table  id='properties'>";
			$.each(typeProperties, function(key, typeProperty){    
				if(typeProperty.isMandatory) {propcolor='color:red'}
				else{propcolor='color:black'   }
				
				inputsProps += "<tr><th style=" + propcolor + "><input type='hidden' name='propertyId' value='" + typeProperty.id + "'>" + typeProperty.name + ": </th><td>";
				
				if (typeProperty.propertyType === "FILE") {
					inputsProps += "<input id='create_node_property_" + typeProperty.id + "' type='file' name='value' onchange='GlobalUtils.showFile(event, \"" + typeProperty.id + "\")'/>"
								+ "<a id='show_image_file_output_" + typeProperty.id + "' target='_blank' href='' class='imgthumb' style='display:none;'><img id='image_file_output_" + typeProperty.id + "' style='display:none;' height='50' width='50'></a>"
								+ "<a id='other_file_output_" + typeProperty.id + "' style='display:none;'></a>"
								+"(" + typeProperty.propertyType + ")";
				} else if (typeProperty.propertyType == 'DATE') {
					inputsProps += "<input id='create_node_property_" + typeProperty.id + "' type='text' size='10'  style ='position: relative; z-index: 100000;' name='value' id= '"+typeProperty.id+"'  value='" + today + "'/>(" + typeProperty.propertyType + ")";
					listDates.push(typeProperty.id);
				} else if (typeProperty.propertyType == 'INTEGER') {
					inputsProps += "<input id='create_node_property_" + typeProperty.id + "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>(" + typeProperty.propertyType + ")";
				} else if (typeProperty.propertyType == 'DOUBLE' || typeProperty.propertyType == 'CURRENCY') {
					inputsProps += "<input id='create_node_property_" + typeProperty.id + "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46'/>(" + typeProperty.propertyType + ")";
				} else if (typeProperty.propertyType == 'BOOLEAN') {
					inputsProps += "<form><input id='create_node_property_" + typeProperty.id + "' type='radio' name='value' value='true'>true   <input type='radio' name='value' value='false'>false</form>";
				} else {
					inputsProps += "<input id='create_node_property_" + typeProperty.id + "' type='text' size='10' name='value' />(" + typeProperty.propertyType + ")";
				}
				
				inputsProps += "<input type='hidden' name='propertyType' value='" + typeProperty.propertyType + "'></td></tr>";
		
			});
			inputsProps += "</table>";	
			
			// display the list of decorators properties for this Type
			decorators = currentType.decorators;  // list of decorators for the type.
			var decoProps, inputsDecoProps, inputDecoAll='';
			decorators.forEach(function(deco){            // for each of the decorator 
				$.each(decos, function(key, value){       // look into the deco-properties table for that decorator
					  if (value.id == deco) {
						decoProps = value.decoProps;      // retrieve the properties 
						  inputsDecoProps = "<table  id='decoproperties' style='display:none'>";
						  inputsDecoProps += "<caption>Fill in the Properties values for Decorator "+value.name+"</caption>";
						  // loop through to display list of properties to enter values for
						  decoProps.forEach(function(decoProperty){
							  if(decoProperty.display && !decoProperty.isHidden){
								  if (decoProperty.name == "latitude" && cLat != null) {
								      inputsDecoProps += "<tr><th><input type='hidden' name='romeDecoPropId' value='"+decoProperty.id+"'><input type='hidden' name='propertyName' value='"+decoProperty.name+"'>" + 
								      decoProperty.name +"</th><td>: <input type='text' name='value' value='" +  cLat + "'/>(" + 
									              decoProperty.propertyType + ")<input type='hidden' name='propertyType' value='"+decoProperty.propertyType+"'></td></tr>";
								  } else if (decoProperty.name == "longitude" && cLng != null) {
								      inputsDecoProps += "<tr><th><input type='hidden' name='romeDecoPropId' value='"+decoProperty.id+"'><input type='hidden' name='propertyName' value='"+decoProperty.name+"'>" + 
								      decoProperty.name +"</th><td>: <input type='text' name='value' value='" +  cLng + "'/>(" + 
									              decoProperty.propertyType + ")<input type='hidden' name='propertyType' value='"+decoProperty.propertyType+"'></td></tr>";
								  } else {
								      inputsDecoProps += "<tr><th><input type='hidden' name='romeDecoPropId' value='"+decoProperty.id+"'><input type='hidden' name='propertyName' value='"+decoProperty.name+"'>" + 
								      decoProperty.name +"</th><td>: <input type='text' name='value' />(" + 
									              decoProperty.propertyType + ")<input type='hidden' name='propertyType' value='"+decoProperty.propertyType+"'></td></tr>";
								  }
							  }
							});
						  inputsDecoProps += "</table>";
						  inputDecoAll += inputsDecoProps;
					  }
				});
			});
			
			var decoList = "";
			decorators.forEach(function(deco){
				var decoName;
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
			var inputsDefaultDeco = "<strong>Default Decorator:&nbsp;</strong>";
			inputsDefaultDeco += "<select name='defaultDecorator'>" + decoList + "</select>";
					
			// <!-- Allow form submission with keyboard without duplicating the dialog button -->

			var formFooter = "<div id='nodeProperties'>"+inputsProps+"</div><div id='decopropertieslist'>"+inputDecoAll+"</div>" +  "<div id='defaultDecoForNode'>" + inputsDefaultDeco + "</div>";			
			
	    	return formHeader  + inputs + formFooter;
		
		} else { 
			$('#console-log').append("<p style='color:red'>Please select a MetaData Repo</p>"); 
		}
	
	};
	
	this.generateCreateOrSearchLinkOptionsOnlyOneTimes = function(divId, typeId) {
		
		var div = document.getElementById(divId);
		div.innerHTML = "";
		var inputs = this.generateCreateNodeForm(typeId);
		div.innerHTML += inputs;
			
		// add one time add buttons for all directly required types
		var requiredTypeIds = [];
		requiredTypeIds = this.getAllRequiredChildTypes(typeId);
		var newAddButtonsHTML = this.generateAddButtonsForAllRequiredTypes(typeId, requiredTypeIds);
		
//		var input = '';
//		input += '<input type="radio" class="createOptions" name="mustConn_63" value="create" onclick="DisplayNewFormUtils.showCreateDiv(63, 62 )">';
//		input += 'Create';
//		input += '<input type="radio" class="createOptions" name="mustConn_63" value="create" onclick="DisplayNewFormUtils.showCreateDiv(63, 62 )">';
//		input += 'Search';
		
		// append new add buttons right after this div
		$( "#" + divId ).after( newAddButtonsHTML );
		
	};
	
	this.generateAddButtonsForAllRequiredTypes = function(typeId, requiredTypeIds) {
		
		var inputs = "";
		
		var organizedRequiredTypeIds = [];
		
		$.each( requiredTypeIds, function( index, requiredTypeId ) {
			
			var haveTypeId = false;
			for (var key1 in requiredTypeIdMap) {
				for (var key2 in requiredTypeIdMap[key1]) {
					if (requiredTypeIdMap[key1][key2].toString() == requiredTypeId.toString() || key1.toString() == requiredTypeId.toString()) {
						haveTypeId = true
					}
				}
			}
			
			if (haveTypeId == false) {
				organizedRequiredTypeIds.push(requiredTypeId);
			}
			
		});
		
		requiredTypeIdMap[typeId] = organizedRequiredTypeIds;
		
		$.each( organizedRequiredTypeIds, function( index, organizedRequiredTypeId ) {
			
			var type = typeMapViaId[organizedRequiredTypeId];
			if (listInstUuids.length != 1 || listEdgeUuids.length != 0) {
				var type = typeMapViaId[organizedRequiredTypeId];
				var input = "";
				input += '<br><p style="color:Blue">' + typeMapViaId[typeId].name + ' ======> ' + type.name + '</p>';		
				input += '<div id="add_node_div_for_' + type.id + '">';
				input += '<input id="add_node_button_' + type.id + '" type="button" value="Add" class="btn btn-primary btn-sm" onclick="(new DisplayLogicalRenderer()).generateCreateOrSearchLinkOptionsOnlyOneTimes(\'add_node_div_for_' + type.id + '\', ' + type.id + ');">';
				input += '</div>';
				inputs += input;
			} else {
				if (Number(type.id) != nodeMap[listInstUuids[0]].typeId) {
					var type = typeMapViaId[organizedRequiredTypeId];
					var input = "";
					input += '<br><p style="color:Blue">' + typeMapViaId[typeId].name + ' ======> ' + type.name + '</p>';		
					input += '<div id="add_node_div_for_' + type.id + '">';
					input += '<input id="add_node_button_' + type.id + '" type="button" value="Add" class="btn btn-primary btn-sm" onclick="(new DisplayLogicalRenderer()).generateCreateOrSearchLinkOptionsOnlyOneTimes(\'add_node_div_for_' + type.id + '\', ' + type.id + ');">';
					input += '</div>';
					inputs += input;
				}
			}
			
//			var type = typeMapViaId[organizedRequiredTypeId];
//			var input = "";
//			input += '<br><p style="color:Blue">' + typeMapViaId[typeId].name + ' ======> ' + type.name + '</p>';		
//			input += '<div id="add_node_div_for_' + type.id + '">';
//			input += '<input id="add_node_button_' + type.id + '" type="button" value="Add" class="btn btn-primary btn-sm" onclick="(new DisplayLogicalRenderer()).generateCreateOrSearchLinkOptionsOnlyOneTimes(\'add_node_div_for_' + type.id + '\', ' + type.id + ');">';
//			input += '</div>';
//			inputs += input;
		
		});
		
		return inputs;
		
	};
	
	this.generateCreateOrSearchLinkOptions = function(divId, typeId) {
		
		var div = document.getElementById(divId);
		
		var input = "";
		
		div.innerHTML += input;
		
	};
	
	this.getAllRequiredChildTypes = function(typeId) {
		
		var typeIds = [];
		
//		$.each( connMap, function( connName, conn ) {
//			if (conn.source == typeId) {
//				// TODO: greater than 1 really not be considered here
//				if (conn.minRel >= 1) {
//					typeIds.push(conn.target);
//				}
//			}
//		});
		
		$.each( connMapViaId, function( connId, conn ) {
			if (conn.source == typeId) {
				// TODO: greater than 1 really not be considered here
				if (conn.minRel >= 1) {
					typeIds.push(conn.target);
				}
			}
		});
		
		return typeIds;
		
	};
	
	this.saveNodeInfo = function(typeId) {
		
		var allRequiredHaveFilled = true;
		allRequiredHaveFilled = this.allRequiredPropertyFieldsHaveBeenFilled(typeId, 'create');
		
		for (var key in requiredTypeIdMap) {
			
			$.each( requiredTypeIdMap[key], function( index, requiredTypeId ) {
				
				var addNodeButton = document.getElementById('add_node_button_' + requiredTypeId);
				if (!addNodeButton) {
					// check if all mandatory property fields have been filled
					allRequiredHaveFilled = allRequiredHaveFilled && (new DisplayLogicalRenderer()).allRequiredPropertyFieldsHaveBeenFilled(requiredTypeId, 'create');
				} else {
					allRequiredHaveFilled = allRequiredHaveFilled && false;
				} 
				
			});
			
		}
		
		if (listInstUuids.length == 1 && listEdgeUuids.length == 0) {
			if ($.inArray(nodeMap[listInstUuids[0]].typeId, requiredTypeIdMap[typeId]) == -1) {
				requiredTypeIdMap[typeId].push(nodeMap[listInstUuids[0]].typeId);
			}
		}
		
		if (allRequiredHaveFilled == true) {
			var createNodeFormIdPart = "create_node_form_for_";
			
			for (var key in requiredTypeIdMap) {
				
				var node = null;
				if (!requiredTypeIdNodeMap[key]) {
					
					if ((listInstUuids.length != 1 || listEdgeUuids.length != 0) || Number(key) != nodeMap[listInstUuids[0]].typeId) {
						var createSelectedTypeNodeForm = document.getElementById(createNodeFormIdPart + key);
						node = this.saveNode(createSelectedTypeNodeForm);
						requiredTypeIdNodeMap[key] = node;
					} else {
						node = nodeMap[listInstUuids[0]];
					}

				} else {
					
					if ((listInstUuids.length != 1 || listEdgeUuids.length != 0) || Number(key) != nodeMap[listInstUuids[0]].typeId) {
						node = requiredTypeIdNodeMap[key];
					} else {
						node = nodeMap[listInstUuids[0]];
					}

				}
				
				$.each( requiredTypeIdMap[key], function( index, requiredTypeId ) {
					
					if ((listInstUuids.length != 1 || listEdgeUuids.length != 0) || Number(requiredTypeId) != nodeMap[listInstUuids[0]].typeId) {
						var createRequiredNodeFormIdPart = "create_node_form_for_";
						var createRequiredTypeNodeForm = document.getElementById(createRequiredNodeFormIdPart + requiredTypeId);
						(new DisplayLogicalRenderer()).saveNodeAndEdgeBidirection(node, createRequiredTypeNodeForm);
					} else {
						// just save edge
						(new DisplayLogicalRenderer()).saveEdgeBidirection(node, nodeMap[listInstUuids[0]]);
					}
					
//					var createRequiredNodeFormIdPart = "create_node_form_for_";
//					var createRequiredTypeNodeForm = document.getElementById(createRequiredNodeFormIdPart + requiredTypeId);
//					(new DisplayLogicalRenderer()).saveNodeAndEdgeBidirection(node, createRequiredTypeNodeForm);
					
				});
			
			}
			
			// show node after creation
			var uuid = requiredTypeIdNodeMap[typeId].sysProperties.uuid.value;
			this.cancelCreateNode();
			DisplayCytoscapeUtils.clickANode(uuid);
			
		} else {
			// show PLEASE FILL ALL REQUIRED FILEDS message
			$('#create_node_error_message_' + typeId).empty()	
			$('#create_node_error_message_' + typeId).append("<p style='color:red'>Please Fill All Required Fields</p>");
		}
		
	};
		
	this.allRequiredPropertyFieldsHaveBeenFilled = function(typeId, action) {
		
		var allRequiredHaveFilled = true;
		
		var typeProperties = typeMapViaId[typeId].typeProperties;
		
		if (action == 'create') {
			
			for (var key in typeProperties) {
				
				if (typeProperties[key].isMandatory == true) {
					var propertyFiled = document.getElementById('create_node_property_' + key);
					if (propertyFiled) {
						if (!propertyFiled.value) {
							allRequiredHaveFilled = false;
						}
					}
				}
					
			}
				
		}
		
		return allRequiredHaveFilled;
		
	};
	
	this.saveNode = function (form) {
		
		var nodeDetails = retrieveNodeFromForm(form);
		
		if (nodeDetails) {
			
			var detailNode = {}, result= null;
			
			var successFunction = function( data ) {
				result = data;
				console.log("Node created "+data.type);
				if(data){
					if(!irvCy) {
						NodeUtils.loadAllNodesAndEdges();
						(new DisplayLogicalRenderer()).loadView();
//						initInstanceGraph();    // should never execute
					}
					else{
						DisplayCytoscapeUtils.updateInstanceGraph (irvCy, DisplayCytoscapeUtils.formatSingleNode(data));
					    (new DisplayLogicalRenderer()).loadTypeInstBar(nodeMap);
					}

					detailNode.nodes = [];
					detailNode.nodes.push(data);
					message = "<p style='color:green'> Node Saved</p>";
					message = '';			
				}
			};
			
			var failFunction = function( xhr, ajaxOptions, error ) {
				console.log('Error Node not saved: ' + xhr.status);
				$('#console-log').append('Error Node not created: ' + xhr.status);
			};
			
			var nodeApi = new NodeApis();
			nodeApi.saveNode(nodeDetails, successFunction, failFunction);
			
			return result;	
		}
		
	};
	
	this.saveNodeAndEdgeBidirection = function (nodeToConnect, form) {

		var destUuid = "";
		var EdgeDetails = {};
		
		if (selectedMetaData != null){
			
			var typeInfo = {};
			$(form).find('div#typeName').find(':input').each(function (i, field) {
				typeInfo[field.name] = field.value;
			});
			
			var data = null;
			if (!requiredTypeIdNodeMap[typeInfo.typeId]) {
				data = this.saveNode(form);
				requiredTypeIdNodeMap[typeInfo.typeId] = data;
			} else {
				data = requiredTypeIdNodeMap[typeInfo.typeId];
			}
			
			if(data){ 
				
				console.log("Node created "+data.type );
				
				//Retrieve the new uuid 
				var nodeUuid = NodeUtils.findUUID(data);
				var nodeType = data.typeId;
				
				var conns1 = GlobalConnUtils.findConnsBySourceAndTarget(data.typeId, nodeToConnect.typeId);
				var conns2 = GlobalConnUtils.findConnsBySourceAndTarget(nodeToConnect.typeId, data.typeId);
				var edgeNodeUuid = nodeToConnect.sysProperties.uuid.value;
				var edgeNodeType = nodeToConnect.typeId;
				
				if (conns1) {
					for (var key in conns1) {
						EdgeDetails.originType = nodeType.toString();
						EdgeDetails.originNodeUuid = nodeUuid;
						EdgeDetails.destinationType = edgeNodeType.toString();
						EdgeDetails.destinationNodeUuid = edgeNodeUuid;
						EdgeDetails.connection = conns1[key].id.toString();
						saveGenerateEdge(EdgeDetails);
					}
				}
				
				if (conns2) {
					for (var key in conns2) {
						EdgeDetails.originType = edgeNodeType.toString();
						EdgeDetails.originNodeUuid = edgeNodeUuid;
						EdgeDetails.destinationType = nodeType.toString();
						EdgeDetails.destinationNodeUuid = nodeUuid;
						EdgeDetails.connection = conns2[key].id.toString();
						saveGenerateEdge(EdgeDetails);
					}
				}
				
			}
			
		} else { 
			 $('#console-log').append("<p style='color:red'>Can not create a a New connected Node, You must First  select a Metadata</p>");
			 cancelInstForm();
		}
			 
	};
	
	this.saveEdge = function (form) {
		var jsonData = {}, edgeProperties = [], edgeProperty = {};
		
		$(form).find(':input').each(function (i, field) {
			if ((field.type != 'submit' && field.type != 'radio' && field.type != 'button') || field.checked) {
				jsonData[field.name] = field.value;
			}
		});
		
//		// need to grab any property edges that were defined for this edge type
//		$(form).find(':input').each(function (i, field) {
//			if ((field.type != 'submit' && field.type != 'radio' && field.type != 'button') || field.checked) {
//				jsonData[field.name] = field.value;
//			}
//		});
		
		$(form).find('div#edgeProperties').find('tr').each(function (i, propDiv) {
			
			$(propDiv).find(':input').each(function(i, field){
				if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
					if (field.type === 'file') {
						edgeProperty[field.name] = field.files[0];
					} else {
						edgeProperty[field.name] = field.value;
					}
//					edgeProperty[field.name] = field.value;
				}
			});
			
			if (edgeProperty.propertyType === "FILE") {
				
				if (edgeProperty.value) {
					var file = edgeProperty.value;
					edgeProperty.value = {};
					if (file.type.includes("image/")) {
						edgeProperty.value.file = document.getElementById('image_file_output_' + edgeProperty.propertyId).src.replace("data:" + file.type + ";base64,", "");
					} else {
						edgeProperty.value.file = document.getElementById('other_file_output_' + edgeProperty.propertyId).href.replace("data:" + file.type + ";base64,", "");
					}
					edgeProperty.value.filename = file.name;
				}
				
			}
			var isPropMand = ruleMapViaId[connMapViaId[jsonData['connection']].ruleId].typeProperties[edgeProperty.propertyId].isMandatory;
			if(isPropMand){  if (edgeProperty.value)	{
				edgeProperties.push(nodeproperty);
			                 }else{
				                      console.log("Missing Value for compulsory property.");
				                      $('#nodeForm').append("<p style='color:red'>Missing Value for Mandatory property : "+ nodeproperty.propertyName);
				                      foundError=true;
				                     
			                  }
			}else {
				// not mandatory look if there is a value
				if (edgeProperty.value)	{  edgeProperties.push(edgeProperty);	}
			}
			edgeProperty = {};
		
//			console.log(edgeProperty);
//			if ($.isEmptyObject(edgeProperty) == false) {
//				edgeProperties.push(edgeProperty);
//			}
//		    edgeProperty = {};
		});
		jsonData.edgeProperties = edgeProperties;
		
		console.log(jsonData);
		if (selectedMetaData != null){
			
			var successFunction = function( data ) {
				console.log("Edge create success. data: "+data);
				$('#console-log').append("Edge create success. data: "+data);
				
//				(new DisplayLogicalRenderer()).initRuleBarInst('ruleInstBar');
				(new DisplayLogicalRenderer()).initConnectionBarInst();
				DisplayCytoscapeUtils.updateInstanceGraph (irvCy, DisplayCytoscapeUtils.formatSingleEdge(data));
				(new DisplayLogicalRenderer()).emptyAllInst();
				cancelNodeConnection();
				
				if (selecteddecorator == 'Geo') {
					updateGeoMapWithEdge(data);
				}
				
				irvCy.filter('node').removeClass('highlight');
				
//				DisplayCytoscapeUtils.clickAEdge(NodeUtils.findUUID(data));
			
			};
			
			var failFunction = function( xhr, ajaxOptions, error ) {
				console.log('Error Edge not created: ' + xhr.responseText);
				$('#console-log').append("<p style='color:red'>Edge can not be created: " + xhr.status + "</p>");
				$("#nodeForm").empty();
				$("#nodeForm").append("<p style='color:red'>Cannot Connect Destination Node to Seletec Node</p>");
				cancelNodeConnection();
//				(new DisplayLogicalRenderer()).initRuleBarInst('ruleInstBar');
			};
			
			var edgeApi = new EdgeApis();
			edgeApi.saveEdge(jsonData, successFunction, failFunction);
		
		} else { 
			 $('#console-log').append("<p style='color:red'>Can not create an Edge, You must First  select a Metadata</p>");
			 this.cancelInstForm();
		}	

	};
	
	this.saveEdgeBidirection = function (node1, node2) {
		
		var node1Uuid = node1.sysProperties.uuid.value;
		var node2Uuid = node2.sysProperties.uuid.value;
		
		var conns1 = GlobalConnUtils.findConnsBySourceAndTarget(node1.typeId, node2.typeId);
		var conns2 = GlobalConnUtils.findConnsBySourceAndTarget(node2.typeId, node1.typeId);
		
		var EdgeDetails = {};
		
		if (conns1) {
			for (var key in conns1) {
				EdgeDetails.originType = node1.typeId.toString();
				EdgeDetails.originNodeUuid = node1Uuid;
				EdgeDetails.destinationType = node2.typeId.toString();
				EdgeDetails.destinationNodeUuid = node2Uuid;
				EdgeDetails.connection = conns1[key].id.toString();
				saveGenerateEdge(EdgeDetails);
			}
		}
		
		if (conns2) {
			for (var key in conns2) {
				EdgeDetails.originType = node2.typeId.toString();
				EdgeDetails.originNodeUuid = node2Uuid;
				EdgeDetails.destinationType = node1.typeId.toString();
				EdgeDetails.destinationNodeUuid = node1Uuid;
				EdgeDetails.connection = conns2[key].id.toString();
				saveGenerateEdge(EdgeDetails);
			}
		}

	};
	
	this.cancelInstForm = function() {
		this.emptyAllInst();
		$("#grid-instances").css({'visibility':'hidden'});
	};
	
	this.cancelCreateNode = function() {
		this.cancelInstForm();
		requiredTypeIdMap = {};
		requiredTypeIdNodeMap = {};
	};
	
	this.showNodeToolTip = function (NodeUid) {
		// show the details of Node and Its model default 
		var node = nodeMap[NodeUid];
		var inputs='';
		 inputs += "<table><tr><th>Type:</th><td>"+node.type+"</td></tr>";
		 inputs += "<tr><th>Name:</th><td>"+node.cyDisplay+"</td></tr>";
		 inputs +="<tr><th colspan='2'>--------</th></tr>";
		 inputs += "<tr><th>Model</th><td>";
		 if(node.modelId){ 
			 inputs+=node.modelId;
			 inputs+="</td></tr>";
			 inputs += "<tr><th>PartGroup</th><td>";
			 if(node.partGroup){ inputs+=node.partGroup;}
			 else{ inputs += "default Part "}
			 }
		 else{inputs += "no model associated "}
		 inputs +="</td></tr>";
		 
//		 inputs += "<tr><td><input type='button' value='Set Focus' onclick=\"setFocus('"+NodeUid+"')\"/></td>";
//		 inputs += "<td><input type='button' value='unSet Focus' onclick=\"unsetFocus('"+NodeUid+"')\"/></td></tr>";
		
		 inputs +="</table>";
		 return inputs;
	};
	
	this.showEdgeToolTip = function (simpleEdge) {
		
		var edge = edgeMap[simpleEdge.uuid];
		var connection = connMapViaId[edge.connectionId];
		
		inputs = "<table><tr><th>Connection: </th><td>" + connection.name + "</td></tr>";
		inputs += "<tr><th>Rule: </th><td>" + edge.ruleName + "</td></tr>";
		inputs += "<tr><th>Origin Node: </th><td>" + simpleEdge.originNodeName + "</td></tr>";
		inputs += "<tr><th>Destination Node: </th><td>" + simpleEdge.destinationNodeName + "</td></tr>";
		inputs += "<tr><th title='-1 means infinite.'>Max Rel: </th><td>" + connection.maxRel + "</td></tr>";
		inputs += "<tr><th title='0 means optional, greater than 0 means required.'>Min Rel: </th><td>" + connection.minRel + "</td></tr>";
		inputs +="</table>";
		
		return inputs;
		
	};
	
	this.showEdgeDetails = function (edgeUuid) {
		
		var edge = edgeMap[edgeUuid];
		var connection = connMapViaId[edge.connectionId];
		var rule = ruleMapViaId[edge.ruleId];
		var startNode = nodeMap[edge.originNode.sysProperties.uuid.value];
		var endNode = nodeMap[edge.destinationNode.sysProperties.uuid.value];

		$("#grid-instances").css({'visibility':'visible'});	
		(new DisplayLogicalRenderer()).emptyAllInst();
		
		// Number(connection.minRel) < 1
		if (true) {
			
			var Form = document.createElement('div');
			
			var formHeader = "<form id='updateEdgeDialog'>", inputs = "";
			var formFooter = '';
			inputs += "<table id='updateEdgeTable'>";
			
			inputs += "<tr><td><b>Connection: </b></td><td><input type='hidden' name='connection' value='" + connection.id + "'><input type='hidden' name='edge' value='" + edge.sysProperties.uuid.value + "'>" + connection.name + "</td></tr>";
			inputs += "<tr><td><b>Start Type: </b></td><td><input type='hidden' name='startNodeType' value='" + startNode.typeId + "'>" + startNode.type + "</td></tr>";
			inputs += "<tr><td><b>Start Node: </b></td><td><input type='hidden' name='startNode' value='" + startNode.sysProperties.uuid.value + "'>" + startNode.cyDisplay + "</td></tr>";
			inputs += "<tr><td><b>End Type: </b></td><td><input type='hidden' name='endNodeType' value='" + endNode.typeId + "'>" + endNode.type + "</td></tr>";
			inputs += "<tr><td><b>End Node: </b></td><td><input type='hidden' name='endNode' value='" + endNode.sysProperties.uuid.value + "'>" + endNode.cyDisplay + "</td></tr>";
			
			inputs += "</table>";
			
			if(!$.isEmptyObject(rule.typeProperties)){
				
				inputs += "<table id='edgeProperties'>";
				inputs += "<tr><th colspan='3' style='background-color: grey'> Edge Properties:</th><tr>";
				inputs +="<tr><th>Name</th><th>Value</th</tr> ";
	
				Object.values(rule.typeProperties).forEach(function (prop){
					
					var ruleProperty = rule.typeProperties[prop.id];

					var pName = ruleProperty.name;
					var pId   = ruleProperty.id;
					var pType = ruleProperty.propertyType;
					var mandatory = ruleProperty.isMandatory;
					
					var pValue = null;
					if (edge.ruleProperties && edge.ruleProperties[prop.id]) {
						pValue = edge.ruleProperties[prop.id].value;
					}
//					var pValue = edge.ruleProperties[prop.id].value;
					
					var textcolor='black';
					
					inputs += "<tr id='props'><th>";
					if(mandatory){textcolor="red";}
					inputs += "<input type='text' style='color:"+textcolor+"' size='6' name='propertyName' value='" + pName + "' disabled></th>";
					
					if (pType === "FILE") {
						
						// file for new
						if (!pValue) {
							inputs += '<td>'
									   + '<img id="image_file_output_' + pId + '" height="50" width="50" style="display:none;">'
									   + '<a id="other_file_output_' + pId + '" style="display:none;"></a>';
						} else {
							var mediaType = EdgeUtils.convertEdgeFilePropertyValueMediaType(pValue);

							inputs += '<td>';
							if (mediaType.includes("image/")) {
								inputs += '<a target="_blank" href="' + EdgeUtils.convertEdgeFilePropertyValueToDataUrl(pValue) + '" class="imgthumb"  ><img id="image_file_output_' + typeProperty.id + '" src="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(pValue) + '" height="50" width="50" style="display:;"></a>'
								 		   + '<a id="other_file_output_' + pId + '" style="display:none;"></a>';
							} else {
								inputs += '<img id="image_file_output_' + pId + '" height="50" width="50" style="display:none;">'
				 				 		   + '<a id="other_file_output_' + pId + '" href="' + EdgeUtils.convertEdgeFilePropertyValueToDataUrl(pValue) + '" style="display:;">' + pValue.filename + '</a>';
							}
						}
						
					} else {
						if(pValue == null || pValue == undefined) {
							inputs += "<td ><input  style='background-color:yellow' size='8'  type='text' name='newValue' value='' disabled>";}
						else {inputs += "<td><input type='text' size='8' name='newValue' value='" + pValue + "' disabled>";}
						
					}
								
					inputs += "</td></tr>";
				});
				inputs += "</table>";
					
			}
			
			formFooter += "<input type='button' value='Update' class='btn btn-primary btn-sm' onclick='(new DisplayLogicalRenderer()).showUpdateEdge(\"" + edgeUuid + "\");'/>";
			formFooter += "<input type='button' value='Delete' class='btn btn-primary btn-sm' onclick='(new DisplayLogicalRenderer()).deleteEdge(form);'/>";	
			formFooter += "</form>";
		    
			Form.innerHTML = formHeader + inputs + formFooter;
			
			$('#nodeForm').append(Form);
			
		} else {
			$('#nodeForm').append("<p style='color:red'>Cannot Delete This Edge</p>");
		}
		
	};
	
	this.showUpdateEdge = function (edgeUuid) {
		
		(new DisplayLogicalRenderer()).cancelInstForm();
		$("#grid-instances").css({'visibility':'visible'});
		
		var edge = edgeMap[edgeUuid];
		var connection = connMapViaId[edge.connectionId];
		var rule = ruleMapViaId[edge.ruleId];
		var startNode = nodeMap[edge.originNode.sysProperties.uuid.value];
		var endNode = nodeMap[edge.destinationNode.sysProperties.uuid.value];
		
		var Form = document.createElement('div');
		
		var formHeader = "<form id='edge_update_dialog'>";
		
		var inputs = "";
		
		inputs += "<table id='updateEdgeTable'>";
		
		inputs += "<tr><td><b>Connection: </b></td><td><input type='hidden' name='connection' value='" + connection.id + "'><input type='hidden' name='edge' value='" + edge.sysProperties.uuid.value + "'>" + connection.name + "</td></tr>";
		inputs += "<tr><td><b>Start Type: </b></td><td><input type='hidden' name='startNodeType' value='" + startNode.typeId + "'>" + startNode.type + "</td></tr>";
		inputs += "<tr><td><b>Start Node: </b></td><td><input type='hidden' name='startNode' value='" + startNode.sysProperties.uuid.value + "'>" + startNode.cyDisplay + "</td></tr>";
		inputs += "<tr><td><b>End Type: </b></td><td><input type='hidden' name='endNodeType' value='" + endNode.typeId + "'>" + endNode.type + "</td></tr>";
		inputs += "<tr><td><b>End Node: </b></td><td><input type='hidden' name='endNode' value='" + endNode.sysProperties.uuid.value + "'>" + endNode.cyDisplay + "</td></tr>";
		
		inputs += "</table>";
		
		var ruleProperties = rule.typeProperties;
		var edgeProperties = edge.ruleProperties;
		var eUuid = edge.sysProperties.uuid.value;
		var inputProps="";
		
		if(!$.isEmptyObject(ruleProperties) ){
		

			inputProps += "<table id='edge_properties'>";
			inputProps += "<tr><th colspan='3' style='background-color: grey'> Properties:</th><tr>";
			inputProps +="<tr><th>Name</th><th style='display:none;'>Type</th><th>Value</th</tr> ";
			inputProps +="<tr id='props'><td><input type='hidden' name='propertyName' value='uuid'></td><td><input type='hidden'name='value' value='"+eUuid+"'></td><td><input type='hidden'name='propertyType' value='STRING'></td></tr>"

				
			$.each(ruleProperties, function( key, property ) {
				//var isNew = true;
				var pName = property.name;
				var pId   = property.id;
				var pType = property.propertyType;
				var mandatory = property.isMandatory;
				
				var pValue = null;
				if (edgeProperties && edgeProperties[key]) {
					pValue = edgeProperties[key].value;
				}

				var textcolor = 'black';
				
				inputProps += "<tr id='props'><th>";
				if(mandatory){textcolor="red";}
				inputProps += "<input type='hidden' name='propertyId' value='" + pId + "'><input type='text' style='color:"+textcolor+"' size='6' name='propertyName' value='" + pName + "' disabled></th>";
				inputProps += "<td style='display:none;'><input type='text' size='8' name='propertyType' value='" + pType + "' disabled></td>";
				
				if (pType === "FILE") {
					var mediaType = EdgeUtils.convertEdgeFilePropertyValueMediaType(pValue);
					
					// file for new
					if (!pValue) {
						inputProps += '<td><input type="file" name ="newValue" value="" onchange="GlobalUtils.showFile(event, \'' + pId + '\')" style="background-color:yellow"/>'
								   + '<a id="show_image_file_output_' + pId + '" target="_blank" href="" class="imgthumb" style="display:none;"><img id="image_file_output_' + pId + '" height="50" width="50" style="display:none;"></a>'
								   + '<a id="other_file_output_' + pId + '" style="display:none;"></a>';
					} else {
						inputProps += '<td><input type="file" name ="newValue" value="'+ EdgeUtils.convertEdgeFilePropertyValueToDataUrl(pValue) +'" onchange="GlobalUtils.showFile(event, \'' + pId + '\')"/>';
						if (mediaType.includes("image/")) {
							inputProps += '<a id="show_image_file_output_' + pId + '" target="_blank" href="' + EdgeUtils.convertEdgeFilePropertyValueToDataUrl(pValue) + '" class="imgthumb" style="display:;"><img id="image_file_output_' + pId + '" src="' + EdgeUtils.convertEdgeFilePropertyValueToDataUrl(pValue) + '" height="50" width="50" style="display:;"></a>'
							 		   + '<a id="other_file_output_' + pId + '" style="display:none;"></a>';
						} else {
							inputProps += '<a id="show_image_file_output_' + pId + '" target="_blank" href="" class="imgthumb" style="display:none;"><img id="image_file_output_' + pId + '" height="50" width="50" style="display:none;"></a>'
			 				 		   + '<a id="other_file_output_' + pId + '" href="' + EdgeUtils.convertEdgeFilePropertyValueToDataUrl(pValue) + '" style="display:;">' + pValue.filename + '</a>';
						}
					}
					// file for old
					if (pValue) {
						inputProps += '<input type="file" name ="value" value="' + EdgeUtils.convertEdgeFilePropertyValueToDataUrl(pValue) + '" disabled style="display:none;"/>';
						if (mediaType.includes("image/")) {
							inputProps += '<img id="image_file_output_fix_' + pId + '" src="' + EdgeUtils.convertEdgeFilePropertyValueToDataUrl(pValue) + '" height="50" width="50" style="display:none;">';
						} else {
							inputProps += '<a id="other_file_output_fix_' + pId + '" href="' + EdgeUtils.convertEdgeFilePropertyValueToDataUrl(pValue) + '" style="display:none;"></a>';
						}
					}
					
				} else if (pType === "BOOLEAN") {
					
					if(pValue == null || pValue == undefined) {
						inputProps += "<td><form><input type='radio' name='newValue' value='true'>true   <input type='radio' name='newValue' value='false'>false</form>";
					} else {
						inputProps += "<td><form><input id='id_for_boolean_property_" + pId + "_true' type='radio' name='newValue' value='true' onclick='GlobalHTMLUtils.recheckRadioButtons(\"id_for_boolean_property_" + pId + "_true\", \"id_for_boolean_property_" + pId + "_false\");'";
					    if (pValue == true) { inputProps += " checked";};   inputProps += ">true   ";
					    inputProps += "<input id='id_for_boolean_property_" + pId + "_false' type='radio' name='newValue' value='false' onclick='GlobalHTMLUtils.recheckRadioButtons(\"id_for_boolean_property_" + pId + "_false\", \"id_for_boolean_property_" + pId + "_true\");'";
					    if (pValue == false) { inputProps += " checked";};  inputProps += ">false</form>";
					}
					
					inputProps += "<input type='hidden' name='value' value='" + pValue + "'>";
				} else if (pType === "DATE"){
					if(!pValue ){
					   inputProps += "<td><input title='" + pType + "' size='8' type='text' style ='background-color: yellow; position: relative; z-index: 100000;' name='newValue' value='' id= '"+pId+"'/>";
					}else {
						inputProps += "<td><input title='" + pType + "' type='text' style ='position: relative; z-index: 100000;' size='8' name='newValue' value='" + pValue + "' id= '"+pId+"'/>";
					}   
					listDates.push(pId);
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
		
		var formFooter = "<input type='button' value='Update' class='btn btn-primary btn-sm'  onclick='updateEdgeProperties(form)' />";
	    formFooter += "<input type='button' value='Cancel' class='btn btn-primary btn-sm'  onclick='(new DisplayLogicalRenderer()).showEdgeDetails(\"" + eUuid + "\");' />";
	    userActions.prevaction = userActions.currentaction ;
		userActions.currentaction = 'updateEdge';
		

		Form.innerHTML = formHeader + inputs + inputProps + formFooter;
		(new DisplayLogicalRenderer()).emptyAllInst();
		$('#nodeForm').append(Form);
		
		DisplayInterfaceUtils.addDatePicker ('');
		
	};
	
	this.deleteEdge = function (form) {
		
		var inputData = {};
		$(form).find(':input').each(function (i, field) {
			if ((field.type != 'submit' && field.type != 'radio' && field.type != 'button') || field.checked) {
				inputData[field.name] = field.value;
			}
		});
		
		var jsonData = {};
		jsonData.connection = Number(inputData.connection);
		
		var startNode = {};
		startNode.typeIds = [];
		startNode.typeIds.push(Number(inputData.startNodeType));
		var sysProperty1 = {};
		sysProperty1.propertyName = "uuid"
		sysProperty1.propertyType = "STRING";
		sysProperty1.value = inputData.startNode;
		startNode.sysProperties = [];
		startNode.sysProperties.push(sysProperty1);
		jsonData.startNode = startNode;
		
		var endNode = {};
		endNode.typeIds = [];
		endNode.typeIds.push(Number(inputData.endNodeType));
		var sysProperty2 = {};
		sysProperty2.propertyName = "uuid"
		sysProperty2.propertyType = "STRING";
		sysProperty2.value = inputData.endNode;
		endNode.sysProperties = [];
		endNode.sysProperties.push(sysProperty2);
		jsonData.endNode = endNode;
		
		var toDeleteEdge = {};
		toDeleteEdge.connection = inputData.connection.toString();
		var sysProperty3 = {};
		sysProperty3.propertyName = "uuid"
		sysProperty3.propertyType = "STRING";
		sysProperty3.value = inputData.edge;
		toDeleteEdge.sysProperties = [];
		toDeleteEdge.sysProperties.push(sysProperty3);
		jsonData.toDeleteEdge = toDeleteEdge;
		
		console.log(jsonData);
		
		if (selectedMetaData != null){
			
			var successFunction = function() {
				
				// delete element in edgeMap and  irvCy
				delete edgeMap[inputData.edge];
				irvCy.$(':selected').remove();
				
				(new DisplayLogicalRenderer()).emptyAllInst();
				
			};
			
			var failFunction = function( xhr, status, error ) {
				
				if (xhr.status != 200) {
					console.log('Error Edge not created: ' + xhr.responseText);
					$('#console-log').append("<p style='color:red'>Failed to delete edge: " + xhr.status + "</p>");
					$("#nodeForm").empty();
					$("#nodeForm").append("<p style='color:red'>Failed to delete edge.</p>");
				}
		
			};
			
			var edgeApi = new EdgeApis();
			edgeApi.deleteEdge(jsonData, successFunction, failFunction);
		
		} else { 
			 $('#console-log').append("<p style='color:red'>Missing Metadata</p>");
			 this.cancelInstForm();
		}
		
	};
	
	this.cancelUpdateNodeForm = function (uuid) {
		this.emptyAllInst();
		DisplayCytoscapeUtils.clickANode(uuid);
	}

}
