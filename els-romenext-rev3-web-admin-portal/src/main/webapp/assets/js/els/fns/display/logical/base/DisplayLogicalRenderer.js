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

	this.initView = function() {
		active_deco = "logical_instance";
		if (document.getElementById(activeDecos_BODY[this.divHolderId]).style.display != 'block') {
			
			DisplayInterfaceUtils.resetInterface();
			
			this.enableLogicalDesignView();
			
			var checked = this.checkInitialValues();
			
			if (checked == true) {
				this.generatePath();
				this.loadView();
			} 
		
		} 
				
	};
	
	this.enableLogicalDesignView = function() {
		
//		document.getElementById("irvCy").style.display = "block";	
		var logicalDecoBody = document.getElementById(activeDecos_BODY[this.divHolderId]);
		logicalDecoBody.style.display = "block";
		
		if (document.getElementById('"typeBar2"') == undefined || document.getElementById('"typeBar2"') == null) {
			var typeBar = document.createElement('header');
			typeBar.className = 'panel-heading';
			typeBar.id = 'typeBar2';
			typeBar.style.display = 'block';
			typeBar.innerHTML = 'Type Bar';
			logicalDecoBody.appendChild(typeBar);
		}
		
		if (document.getElementById('ruleInstBar') == undefined || document.getElementById('ruleInstBar') == null) {
			var ruleBar = document.createElement('header');
			ruleBar.className = 'panel-heading';
			ruleBar.id = 'ruleInstBar';
			ruleBar.style.display = 'block';
			ruleBar.innerHTML = 'Rule Bar';
			logicalDecoBody.appendChild(ruleBar);
		}
		
		if (document.getElementById('irvCy') == undefined || document.getElementById('irvCy') == null) {
			var cy = document.createElement('div');
			cy.className = 'cy';
			cy.id = 'irvCy';
			cy.style.display = 'block';
			logicalDecoBody.appendChild(cy);
		}
		
		var logicalDecoLn = document.getElementById(activeDecos_LN[this.divHolderId]);
		logicalDecoLn.style.display = "block";
		
		if (document.getElementById('grid-types') == undefined || document.getElementById('grid-types') == null) {
			
			var gridTypes = document.createElement('div');
			gridTypes.id = 'grid-instances';
			gridTypes.style.visibility = 'hidden';
			gridTypes.innerHTML += '<div class="box box-solid box-info" style="height: 717.5px; overflow: auto;">'
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
				selecteddecorator = 'Logical';
				(new toolbarManagerRomeNext()).createDisplayTool();	
				if(selectedMetaData.length != "") { 
					this.showOrHideGridInstances(true);
				}	
			}
		}
		
	};
	
	this.checkInitialValues = function() {
			
		if (selectedMetaData == null || selectedMetaData == '') {
			
			return false;
		
		} else {
			
			if (colorIndex != 0) {
				colorIndex = 0;
			}
			
			GlobalUtils.loadAllTypeAndConnections();
			GlobalUtils.loadAllRules();
			GlobalUtils.generateBreadcrumb(selecteddecorator);
			
			topLevelTab = "instRelViewTab";
			NodeSelected = null;
			LD_FocussedNode = null;
			prevDrilldown =null;
			historyNode = [];
			
//			if (listTypeIds.length != 0 || listConnIds.length != 0 || nametype != null || nameconn != null) {
			if (listTypeIds.length != 0 || listConnIds.length != 0) {	
				
				loadInstNode = false;
				loadInst = true;
			    typeMapInst = {}; 
			    nodeMapInst = {};
//			    if (nametype != null) {
//			    	var id = typeMap[nametype].id;
//			    	if(!listTypeIds[id]) {listTypeIds.push(parseInt(id));}
//			    }
//			    if (nameconn != null) {
//			    	var id = connMap[nameconn].id;
//			    	if(!listConnIds[id]) {listConnIds.push(parseInt(id));}
//			    }
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
		this.initRuleBarInst('ruleInstBar');
			
	};
	
	this.loadTypeInstBar = function(source) {
		typeMapInst ={}; 
		this.setTypeNB();
		var elementBase = {}, element;
		if(source != null){
			$.each(source, function(key, value){
				 element = value.type;
				 elementBase = typeMap[element]; 
	             typeMapInst[element].nb = typeMapInst[element].nb + 1;
			});
		}
		this.initNodeBar('typeBar2');
	};
	
	this.setTypeNB = function() {
		typeMapInst = typeMap;
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
			inputs += "<td><span class='badge'>*("+nb+")</span></td>";
			$.each(elementsBar, function(key, value){
				inputs += "<td ><button type='button' style='color:black; background:"+value.color+"' id='"+value.id+"'  onclick=\"selectedType('" + value.name + "')\"  >"+key;
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
	
//	this.getCoordinate = function(value, x) {
//		for (var i = 0; i < value.length; i++) {
//			if (value[i].name == x) {
//				return Number(value[i].value);
//			}
//		}
//		return 0;
//	};
	
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
			        	if (loadInstNode) { 
			        		element = nodeMapInst[nodeName];                        		
			        	} else {
			        		element = nodeMap[nodeName];	        		
			        	}
			        	
			        }
		        }
//		        drop: function() {console.log(this);}
		    });
		   			
		});
		
	};
	
	this.checkTypeIsRoot = function(typeName) {
		
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

}