function DesignLogicalRenderer() {
	
	this.divholderId;
	
	this.initBase = function( divId ) {
		console.log("divId is: "+ divId);
		this.divHolderId = divId;
	};
	
	this.initRenderer = function() {
		
		TypeUtils.globalType_addFn( "create", "logical", DesignLogicalRendererCrud.typeCreate );
//		TypeUtils.globalType_addFn( "read", "logical", DesignLogicalRendererCrud.typeRead );
//		TypeUtils.globalType_addFn( "update", "logical", DesignLogicalRendererCrud.typeUpdate );
		
	};

	this.initView = function() {
		active_deco = "logical_type";
		console.log("You are in this deco" +this.divHolderId);
		if (document.getElementById(activeDecos_BODY[this.divHolderId]).style.display != 'block') {
			selecteddecorator = "Logical";
			
			DesignInterfaceUtils.resetInterface();
			
			this.enableLogicalDesignView();
			
			var checked = this.checkInitialValues();
			
			if (checked == true) {
				this.generatePath();
				this.loadView();
			} 
		
		}
	
	}
	
	this.enableLogicalDesignView = function() {
		
		var logicalDecoBody = document.getElementById(activeDecos_BODY[this.divHolderId]);
		logicalDecoBody.style.display = "block";
		
		if (document.getElementById('typeBar') == undefined || document.getElementById('typeBar') == null) {	
			                                            // ( elementType, elementId, className, visibility, display, innerHtml )
			var typeBar = GlobalHTMLUtils.createHTMLEntity('header', 'typeBar', 'panel-heading', 'visible', 'block', 'Type Bar');					
			logicalDecoBody.appendChild(typeBar);
		}
		
		if (document.getElementById('ruleBar') == undefined || document.getElementById('ruleBar') == null) {
			var ruleBar = GlobalHTMLUtils.createHTMLEntity('header', 'ruleBar', 'panel-heading', 'visible', 'block', 'Rule Bar');
			logicalDecoBody.appendChild(ruleBar);
			ruleBar.style.display = "none";
		}
		
		if (document.getElementById('tdvCy') == undefined || document.getElementById('tdvCy') == null) {
			var cy = GlobalHTMLUtils.createHTMLEntity('div', 'tdvCy', 'cy', 'visible', 'block', '');
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
			gridTypes.id = 'grid-types';
			gridTypes.style.visibility = 'hidden';
			gridTypes.innerHTML += '<div class="box box-solid box-info" style="overflow: auto;">' // height: 600px;
								+ '<div class="box-header with-border">'
								+ '<h2 class="box-title" id="Infotitle">Design Details</h2>'
								+ '<div class="pull-right box-tools">'
								+ '<button id="type_window_button" class="btn btn-box-tool" data-widget="collapse" title="Collapse" ><i class="fa fa-minus"></i></button>'
								+ '</div></div><div class="box-body" id="typeForm"></div></div>';
			logicalDecoLn.appendChild(gridTypes);
		
		}
		this.emptyAll();
		this.showOrHideGridTypes(false);
		
		var logicalDecoTb = document.getElementById(activeDecos_TB[this.divHolderId]);
		logicalDecoTb.style.display = "block";
		
		if (document.getElementById('toolbar_romenext') == undefined || document.getElementById('toolbar_romenext') == null) {
			var toolBar = document.createElement('div');
			toolBar.id = 'toolbar_romenext';
			logicalDecoTb.appendChild(toolBar);
			
			console.log("Initial value of selectedDecorator is : "+selecteddecorator);
			if (selectedMetaData) {
				
				(new toolbarManagerRomeNext()).createDesignTool();	
				if(selectedMetaData.length != "") { 
					this.showOrHideGridTypes(true);
				}	
			}
		}
		
	};
	
	this.checkInitialValues = function() {
		
		if (selectedMetaData == null || selectedMetaData == '') {					
			document.getElementById('path').innerHTML = "<p style='color:red'>No Metadata Selected  !!</p>";
			return false;
		
		} else {
					
			GlobalUtils.loadAllTypeAndConnections();		
			GlobalUtils.loadAllRules();			
			return true;
			
		}
	
	};
		
	this.loadView = function() {

		var elements = DesignCytoscapeUtils.formatTypesAndConnections();
		tdvCy = DesignCytoscapeUtils.initTypeConnGraph(tdvCy, "tdvCy", elements);
	
		// should be moved to somewhere else
		document.getElementById("typeBar").style.display = "block";
		document.getElementById("ruleBar").style.display = "block";
		this.initTypeDesignBar('typeBar');
		this.initRuleDesignBar('ruleBar');  
		
		DesignCytoscapeUtils.saveInitialPosition(tdvCy);
		
		if (selectedMetaData) {	
			if (listTypeIds.length != 0 || listConnIds.length != 0) {		
				if (listTypeIds.length != 0) {
					
					var tmpListTypeIds = [];
					for (var i = 0; i < listTypeIds.length; i++) {
						tmpListTypeIds.push(listTypeIds[i]);
					}
					var tmpListConnIds = [];
					for (var i = 0; i < listConnIds.length; i++) {
						tmpListConnIds.push(listConnIds[i]);
					}
					
					DesignCytoscapeUtils.selectUnselectTypes(tmpListTypeIds, tdvCy, true);
					console.log("List of types is:"+ listTypeIds);
					listTypeIds = [];
					for (var i = 0; i < tmpListTypeIds.length; i++) {
						listTypeIds.push(tmpListTypeIds[i]);
					}
					listConnIds = [];
					for (var i = 0; i < tmpListConnIds.length; i++) {
						listConnIds.push(tmpListConnIds[i]);
					}
					
				}
				if (listConnIds.length != 0) {
					
					var tmpListTypeIds = [];
					for (var i = 0; i < listTypeIds.length; i++) {
						tmpListTypeIds.push(listTypeIds[i]);
					}
					var tmpListConnIds = [];
					for (var i = 0; i < listConnIds.length; i++) {
						tmpListConnIds.push(listConnIds[i]);
					}
				
					
					DesignCytoscapeUtils.selectUnselectConnections(tmpListConnIds, tdvCy, true);
					console.log("List of connections is:"+ listConnIds);
					listTypeIds = [];
					for (var i = 0; i < tmpListTypeIds.length; i++) {
						listTypeIds.push(tmpListTypeIds[i]);
					}
					listConnIds = [];
					for (var i = 0; i < tmpListConnIds.length; i++) {
						listConnIds.push(tmpListConnIds[i]);
					}				
				}

			}
		}
			
	}
	
	this.generatePath = function() {
		var list = '';
		list += "<li><i class='fa fa-home'></i><a href='#'>Home</a><i class='fa fa-angle-right'></i></li>";
		list += "<li><a href='#'>Logical Design</a></li>";
		document.getElementById('path').innerHTML = list;
	};
	
	this.initTypeDesignBar = function(bar){
		console.log("Initializing the type bar for the Design View!!!");
		var nb = Object.keys(typeMapViaId).length;
		var inputs = '';
		if( nb != 0 ){
			inputs ="<table id='typesList'><tr>";
		    inputs += "<td class='create_icon' onclick='(new DesignLogicalRenderer()).showAddType();'><img  id='img_create' title='Create type'   src='"+img_path+ "design_icons/create.png'></td>";
			inputs += "<td><span class='badge'>*("+nb+")</span></td>";
			$.each( typeMapViaId, function(key, value){	
				 inputs += "<td  ><span class='badge' style='color:black; background:"+value.color+"' id='"+value.id+"' title='Select to view in Graph' onclick=\"(new DesignLogicalRenderer()).typeSelect('" + value.name + "')\"  >"+value.name+"</span></td>";
				});
			inputs +="</tr></table>";
		}else {    
			inputs += "<p class='create_icon' onclick='(new DesignLogicalRenderer()).showAddType()'><img  id='img_create' title='Create type'  src='"+img_path+ "design_icons/create.png'></p>";	
		}
		document.getElementById(bar).innerHTML = inputs;
	}
	
	this.initRuleDesignBar = function(bar){
		var nb = Object.keys(ruleMap).length;
		var inputs = '';
		
		inputs +="<table id='ruleList'><tr>";
		inputs +=  '<td value="parentchild" onclick="createConnection(\'parentchild\')"><img title="create pc connection"   id="img_connect_pc"   src="'+img_path+'design_icons/conn_pc.png"/></td>';
		inputs +=  '<td value="link" onclick="createConnection(\'link\')"><img title="create link connection"   id="img_connect_link"   src="'+img_path+'design_icons/conn_link.png"/></td>';
		inputs +="</tr></table>";

		document.getElementById(bar).innerHTML = inputs;
		
//		if(nb != 0) {
//			inputs +="<table id='ruleList'><tr>";
//			inputs +=  '<td onclick="createConnection(\'parentchild\')"><img title="create pc connection" id="img_connect_pc"   src="'+img_path+'design_icons/conn_pc.png"/></td>';
//			inputs +=  '<td onclick="createConnection(\'link\')"><img title="create link connection" id="img_connect_link" src="'+img_path+'design_icons/conn_link.png"/></td>';
//			inputs += "<td><span class='label label-default'>*("+nb+")</span></td>";
//			$.each(ruleMap, function(key, value){
//				if (value.classification == "parentchild") {
//					inputs += "<td><span class='label label-primary'  id="+value.id+">"+key+"</span></td>";	
//				} else if (value.classification == "link") {
//					inputs += "<td><span class='label label-success'  id="+value.id+">"+key+"</span></td>";	
//				} else {
//					console.log("Classification Is Wrong: " + value.id);
//				}	
//		     });
//			inputs +="</tr></table>";
//			document.getElementById(bar).innerHTML = inputs;
//		} else {
//			inputs +="<table id='ruleList'><tr>";
//			inputs +=  '<td value="parentchild" onclick="createConnection(\'parentchild\')"><img title="create pc connection"   id="img_connect_pc"   src="'+img_path+'design_icons/conn_pc.png"/></td>';
//			inputs +=  '<td value="link" onclick="createConnection(\'link\')"><img title="create link connection"   id="img_connect_link"   src="'+img_path+'design_icons/conn_link.png"/></td>';
//			inputs +="</tr></table>";
//
//			document.getElementById(bar).innerHTML = inputs;
//		}
	}
	
	// should be changed
	this.showTypeProperties = function(type) {
		
		pleaseWait = true;
		setTimeout(function() {
			pleaseWait = false;
			if (isSingleClick && type == lastObj) {
					
				listTypeIds[0] = type.data().id;
				$('#console-log').append("Single click on this type (showing its properties)"+type.data().id);
				(new DesignLogicalRenderer()).showOrHideGridTypes(true);
				document.getElementById('Infotitle').textContent="Type Details";
				
				$('#typeForm').empty();
				TypePropertyUtils.displayTypeProperties( $('#typeForm'), type.data(), true );
			}
		}, doubleClickThreshold + 10);
		
	};
	
	// should be changed
	this.showTypePropertiesByTypeId = function(typeId) {
		
		$('#typeForm').empty();
		TypePropertyUtils.displayTypeProperties( $('#typeForm'), typeMapViaId[typeId], true );
		
	};
	
	// should be changed
	this.showConnRuleProperties = function(connId) {
		
//		listConnIds.push(Number(connId));
		var conn = connMapViaId[connId];
		
		$("#grid-types").css({'visibility':'visible'});
		document.getElementById('Infotitle').textContent="Connection Details";
		
		var formHeader = "<form><table>";
		
		var inputs = "";
		
		$.each(conn, function(key, value) {
			
			if ((key != "cyDisplay") && (key != 'id') && (key != 'source') && (key != 'target') && (key != 'ruleId') && (key != 'properties')) {
							
				inputs += "<tr><th>" + key + "</th>";
				inputs += "<td><input type='text' name='" + key + "' value='" + value + "' ";
				
				if (key == 'minRel') {
					inputs += "title='0 means optional, greater than 0 means required.'";
				} else if (key == 'maxRel') {
					inputs += "title='-1 means infinite.'";
				}
				
				inputs += " disabled/></td><tr>";
				
			}
		
		});

		// generate the properties fields
		var props = ruleMapViaId[conn.ruleId].typeProperties;	
		
		if ( props == null || props.length == 0 || $.isEmptyObject(props)  ) {
			inputs += "<tr><th colspan='2'> No properties added </th></tr>";
		} else {	
			inputs += "<tr><th colspan='7' style='background-color: #CDEEDD'>Properties:</th></tr>";
			inputs += "<tr style='background-color: grey'><th> Name</th><th>Type</th></tr>"; 
			$.each(props, function(key, value) {	
				var newInput = ConnectionPropertyUtils.displayRuleProperty( value , null );
				inputs += newInput ;
			});
			inputs += "<tr><td><input id='connection_prop_detail_button_" + conn.id + "' type='button' value='Show Details' class='btn btn-primary btn-xs' onclick='ConnectionPropertyUtils.showOrHideAllConnectionPropertiesDetails(\"" + conn.id + "\");'/></td></tr>";
			
		} 
		
		// build out footer if neccessary
		var footer = "";		
		footer  = "<tr><td><input type='button' value='Add Properties' class='btn btn-primary btn-xs' onclick='addConnectionProperties(\"" + conn.id + "\");'/></td>";
		footer += "<td><input type='button' value='Update' class='btn btn-primary btn-xs' onclick='(new DesignLogicalRenderer()).updateRuleConnection();'/>";
		footer += "<input type='button' value='Delete' class='btn btn-primary btn-xs' onclick='deleteConnection(form);'/></td></tr>";
		footer += "</table></form>";
		
		var form = document.createElement('div');
		form.innerHTML = formHeader + inputs + footer;
			
		$('#typeForm').empty();
		$('#typeForm').append(form);
		
	};
	
	this.showOrHideGridTypes = function(value) {
		if(value){
			if($("#grid-types").css('visibility') == 'hidden'){$("#grid-types").css({'visibility':'visible'});}
		}else {
			if($("#grid-types").css('visibility') == 'visible'){$("#grid-types").css({'visibility':'hidden'});}
		}
	};
	
	
	this.emptyAll = function() {
		document.getElementById('Infotitle').textContent="Design Details";
		$('#typeForm').empty();
	}
	
	//************* Type Functions *************
	
	this.showAddType = function() {
		
		var img;
		if (selectedMetaData != null) {
			
			(new DesignLogicalRenderer()).showOrHideGridTypes(true);
		
			img = document.getElementById("img_create");
			if (GlobalUtils.retrieveImgname(img) == "create.png") {
				img.src = img_path + "design_icons/create_01.png";
				if(tdvCy) {
					list = DesignCytoscapeUtils.grabTypesSelected();
					DesignCytoscapeUtils.selectUnselectTypes(list, tdvCy, false);
				}
				
				var form = document.createElement('form');
				form.id = 'design_logical_create_type_form';
				
				var label1 = document.createElement('label');
				label1.innerHTML = 'Name: ';
				var inputName = document.createElement('input');
				inputName.id = 'add_type_name';
				inputName.type = 'text';
				inputName.name = 'name';
				inputName.required = 'required';							
				label1.appendChild(inputName);
							
				var label2 = document.createElement('label');
				label2.innerHTML = 'isRoot: ';							
				var inputIsRoot = document.createElement('input');
				inputIsRoot.id = 'add_isRoot';
				inputIsRoot.type = 'checkbox';
				inputIsRoot.name = 'isRoot';
				inputIsRoot.checked = 'checked';
				label2.appendChild(inputIsRoot);
				
				var label3 = document.createElement('label');
				label3.innerHTML = 'Classification: ';							
				var inputClassification = document.createElement('select');
				inputClassification.id = 'add_classification';
				inputClassification.name = 'classification';
				var inputClassificationOption1 = document.createElement('option');
				inputClassificationOption1.value = "node";
				inputClassificationOption1.innerHTML = "node";
				var inputClassificationOption2 = document.createElement('option');
				inputClassificationOption2.value = "path";
				inputClassificationOption2.innerHTML = "path";
				inputClassification.appendChild(inputClassificationOption1);
				inputClassification.appendChild(inputClassificationOption2);
				var inputClassificationOption3 = document.createElement('option');
				inputClassificationOption3.value = "system";
				inputClassificationOption3.innerHTML = "system";
				inputClassification.appendChild(inputClassificationOption1);
				inputClassification.appendChild(inputClassificationOption2);
				inputClassification.appendChild(inputClassificationOption3);
				label3.appendChild(inputClassification);
				
				var label4 = document.createElement('label');
				label4.innerHTML = 'Restriction Status: ';							
				var inputRestrictionStatus = document.createElement('select');
				inputRestrictionStatus.id = 'add_restrictionStatus';
				inputRestrictionStatus.name = 'restrictionStatus';
				var inputRestrictionStatusOption1 = document.createElement('option');
				inputRestrictionStatusOption1.value = "";
				inputRestrictionStatusOption1.innerHTML = "";
				var inputRestrictionStatusOption2 = document.createElement('option');
				inputRestrictionStatusOption2.value = "ROOTONLY";
				inputRestrictionStatusOption2.innerHTML = "Root Only";
				inputRestrictionStatus.appendChild(inputRestrictionStatusOption1);
				inputRestrictionStatus.appendChild(inputRestrictionStatusOption2);
				label4.appendChild(inputRestrictionStatus);

			    // hidden fields: classification and owner
				var inputClassification = '<input id="add_classification" type="text" name="classification" value="node" style="visibility: hidden; position: absolute; top: -100px;">';
				var inputOwner = '<input id="add_owner" type="text" name="owner" value="123" style="visibility: hidden; position: absolute; top: -100px;">';
						
				// enable decorators for type
				// hard code the id for geo view now
				var geoActivator = "<strong>Geo View</strong>&nbsp;&nbsp;<label class=\"switch\"><input id=\"geo_activator\" name=\"geo_activator\" type=\"checkbox\" value=\"4\"><div class=\"slider round\"></div></label><br>";
				
				var buttonCreate = "<input type='button' class='btn btn-primary btn-xs' value='Create Type' onclick='TypeUtils.saveAddTypeForm()'>";
				var buttonCancel = "<input type='button' class='btn btn-primary btn-xs' value='Cancel' onclick='(new DesignLogicalRenderer()).emptyAll()'>";				
				
				form.appendChild(label1);
				form.innerHTML += '<br/>';
				form.appendChild(label2);
				form.innerHTML += '<br/>';
				form.appendChild(label3);
				form.innerHTML += '<br/>';
				form.appendChild(label4);
				form.innerHTML += '<br/>';
				form.innerHTML += inputClassification;
				form.innerHTML += inputOwner;

				form.innerHTML += geoActivator;
				form.innerHTML += buttonCreate;
				form.innerHTML += buttonCancel;

								
				document.getElementById('Infotitle').textContent="Create New Type";
				(new DesignLogicalRenderer()).emptyAll();				
				$('#typeForm').append(form);
				
				document.getElementById("add_type_name").focus();
				
			} else {
				// Second click for create
				img.src = img_path +"design_icons/create.png";
				(new DesignLogicalRenderer()).emptyAll();
			}
			
		} else {
			$('#console-log').append("<p style='color:red'>Can not create a TYPE, You must First select a Metadata.</p>");
		}
		
	}
	
	this.typeSelect = function (type){
		console.log(type);
		var thisClick = new Date().getTime();
		isSingleClick = true;
		pleaseWait = true;
//		Un-Highlight  previous selected Types
		var list = DesignCytoscapeUtils.grabTypesSelected();
		DesignCytoscapeUtils.selectUnselectTypes(list, tdvCy, false);                            // unhighlight the previous type if any in the graph
	//  Highlight the selected Type in the Graph
		tdvCy.filter('node[name="' + type + '"]').select();                  // highlight the type  in graph
		listTypeIds[0] = typeMap[type].id;
//		Display its proprietes in sideBar 
		
		(new DesignLogicalRenderer()).showOrHideGridTypes(true);
		document.getElementById('Infotitle').textContent="Type Details";
		(new DesignLogicalRenderer()).emptyAll();
		TypePropertyUtils.displayTypeProperties( $('#typeForm'), typeMap[type], true );
	}
	
		
	// TODO: not done
	this.showUpdateType = function() {
		
		type = typeMapViaId[listTypeIds[0]];
		document.getElementById('Infotitle').textContent="Update Type";
		
		var form = document.createElement('form');
		form.id = 'design_logical_update_type_' + type.id + '_form';
		var table = document.createElement('table');
		table.id = 'design_logical_update_type_' + type.id + '_table';
		
		var buttonTr = document.createElement('tr');
		var buttonUpdate = "<td><input type='button' value='Update Type' class='btn btn-primary btn-xs'   onclick='saveUpdateType(form)' /></td>";
		var buttonCancel = "<td><input type='button'  value='Cancel'     class='btn btn-primary btn-xs' onclick='(new DesignLogicalRenderer()).emptyAll()'></td>";
		buttonTr.innerHTML += buttonUpdate;
		buttonTr.innerHTML += buttonCancel;
		table.appendChild(buttonTr);
		
		form.appendChild(table);
		(new DesignLogicalRenderer()).emptyAll();
		$('#typeForm').append(form);
		
		
	    inputs += "<tr><td colspan='2'><input type='hidden' name='oldtypename'  value='"+ type.name+"'></td></tr>";
	    $.each(type, function(key, value) {
	    	
	    	if (key == 'id') {
	    		inputs += "<tr><th>"+key + "</th><td><input type='hidden' name ='"+key+"' value='"+value+"' /></td></tr>";
	    	} else if (key == "name") {
	    		inputs += "<tr><th>"+key + "</th><td><input type='text' name ='"+key+"' value='"+value+"'/><input type='hidden' name ='oldName' value='"+value+"'/></td></tr>";
	    	} else if (key == "classification") {
	    		inputs += "<tr><th>"+key + "</th><td><input type='text' name ='"+key+"' value='"+value+"'/></td></tr>";
	    	} else if (key == 'isRoot') {
	    		inputs += "<tr><th>"+key +":</th>";
				inputs += "<td><input type='radio' name='isRoot' value='true'";
			    if (value == true) { inputs += "checked='checked'";};   inputs += ">true<br/>";
			    inputs += "<input type='radio' name='isRoot' value='false'";
			    if (value == false) { inputs += "checked='checked'";};  inputs += ">false</td></tr> ";
	    	}
	    	
		});
	         
		// set value
		var ownerId = 123;
		inputs += "<tr><td colspan='2'><input type='text' name='owner' value='" + ownerId + "' style='visibility:hidden; position:absolute; top:-100px;' /></td></tr>";
		inputs += "<tr><td colspan='2'><input type='text' name='isRoot' value='true' style='visibility:hidden; position:absolute; top:-100px;' /></td></tr>";

		//============= Enable Decorators for Type  ==================================
		//Hard code the id for geo view now
		hasGeo = false;
		for (var i = 0; i < type.decorators.length; i++) {
			if (type.decorators[i] == 4) { //Hard code the id for geo view now 
				hasGeo = true;
				break;
			}
		}
		inputs += "<tr><td colspan='2'>Geo View&nbsp;&nbsp;<label class=\"switch\"><input id=\"geoActivator\" name=\"geoActivator\" type=\"checkbox\" value=\"4\"";
		if (hasGeo == true) {
			 inputs += "checked=\"checked\"";
		} 
		inputs += "><div class=\"slider round\"></div></label><br></td></tr>";
			
		Props = type.typeProperties;
		if (Props == null || $.isEmptyObject(Props)) {inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";}
		else {
			inputs += "<tr><th colspan='2' style='background-color: #CDEEDD'> Properties:</th></tr></table>";
			$.each(Props, function(key, value2) {	
					inputs += "<table id='propertiesFields'>";
					$.each(value2, function(key,value){	
						if (key == 'id') {
							inputs += "<input type='hidden' name='propertyId' value='"+value+"'>";
						} else if (key == 'name') { 
							inputs += "<tr><th>"+key+"</th><td><input type='text' name='propertyName' value='"+value+"'/></td></tr>";
						} else  { if((key != 'id')&& (key!='romeDecoPropId')&& (key != 'validValues'))
							{inputs += "<tr><th>"+key+"</th><td><input type='text' name='"+key+"' value='"+value+"'/></td></tr>";}
						}						
						});
					inputs += "<tr><td colspan='2'>---------------------------------</td></tr>";
					});
		}
			
	};
	
	this.showTypeTooltip = function(sourceId) {
		
		var nodeType = typeMapViaId[sourceId];
		var inputs='', props;
		 inputs +="<table>";
	     inputs +="<tr><th>Type:</th> <td>"+nodeType.name+"</td></tr>";
	     inputs +="<tr><th>isRoot:</th><td>"+nodeType.isRoot+"</td></tr>";
	     inputs +="<tr><th>Classification:</th> <td>"+nodeType.classification+"</td></tr>";
	     if (nodeType.sysProperties.restrictionStatus) {
	    	 inputs +="<tr><th>Restriction Status:</th><td>"+nodeType.sysProperties.restrictionStatus.value+"</td></tr>";
	     }
	     inputs +="<tr><th colspan='2'>Properties--------</th></tr>";
	     props = nodeType.typeProperties;
	     $.each(props, function(key, value) {
	    	 if(value.isMandatory){ 
	    		 inputs +="<tr><th style='color:red'>"+value.name+"</th><td></td></tr>";   
	    		 }
	    	 else { inputs +="<tr><th>"+value.name+"</th><td></td></tr>";}
	     });
		 inputs +="</table>"; 
		 return inputs;
		
	};
	
	this.showConnectionTooltip = function(sourceId) {
		
		var connection = connMapViaId[sourceId];
	
		inputs ="<table>";
	    inputs +="<tr><th>Name: </th><td>" + connection.name + "</td></tr>";
	    inputs +="<tr><th>Origin: </th><td>" + connection.origin + "</td></tr>";
	    inputs +="<tr><th>Destination: </th><td>" + connection.destination + "</td></tr>";
	    inputs +="<tr><th>Rule: </th><td>" + connection.rule + "</td></tr>";
	    inputs +="<tr><th title='-1 means infinite.'>Max Rel: </th><td>" + connection.maxRel + "</td></tr>";
	    inputs +="<tr><th title='0 means optional, greater than 0 means required.'>Min Rel: </th><td>" + connection.minRel + "</td></tr>";
	    
		inputs +="</table>"; 
		return inputs;
		
	};
	
	this.repopulateDefaultPropertyValue = function(propertyTypeElement) {
		
		var propertyType = propertyTypeElement.value;
		
		var tdParent = propertyTypeElement.parentElement;
		var trParent = tdParent.parentElement;
		var tbodyParent = trParent.parentElement;
		
		for (var key1 in tbodyParent.children) {
			var asd = tbodyParent.children[key1];
			for (var key2 in asd.children) {
				var child = asd.children[key2];
				if (child.tagName == "TD") {
					if (child.children.defaultValue) {
						
						if (propertyType == "STRING" || propertyType == "FILE") {
							child.children.defaultValue.outerHTML = "<input type='text' name='defaultValue' onkeypress='' value='' defaultValue='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/>";
						} else if (propertyType == "INTEGER") {
							child.children.defaultValue.outerHTML = "<input type='number' name='defaultValue' onkeypress='return event.charCode >= 48 && event.charCode <= 57' value='0' defaultValue='0' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/>";
						} else if (propertyType == "DOUBLE" || propertyType == "CURRENCY") {
							child.children.defaultValue.outerHTML = "<input type='number' name='defaultValue' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46' value='0.0' defaultValue='0.0' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/>";
						} else if (propertyType == "BOOLEAN") {
							child.children.defaultValue.outerHTML = "<select name='defaultValue'>" +
					     		"<option value='true'>true</option>" +
								"<option value='false'>false</option>" +
								"</select>";
						} else if (propertyType == "DATE") {
							child.children.defaultValue.outerHTML = "<input type='date' name='defaultValue' onkeypress='' value='" + today + "' defaultValue='" + today + "' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/>";
						}
					}
				}
			}
		}
		
	};
	
	this.updateRuleConnection = function () {
		
		$("#grid-types").css({'visibility':'visible'});
		var conn = connMapViaId[listConnIds[0]];
		
		var Form, formHeader, formFooter; 
		Form = document.createElement('div');
		document.getElementById('Infotitle').textContent = "Update Connection";
		
		formHeader = "<form id='update_connection_form'>";
		var inputs = "";
		
	    inputs += "<table id='update_connection_table'>";
	    inputs += "<tr><td colspan='2'><input type='hidden' name='id'  value='" + conn.id + "'></td></tr>";
	    
	    $.each(conn, function(key, value) {
			
	    	if (key == 'name') {
	    		inputs += "<tr><th>" + key + "</th><td><input type='text' name ='" + key + "' value='" + value + "'/></td></tr>";
	    	} else if (key == 'minRel' || key == 'maxRel') {
	    		inputs += "<tr><th>" + key + "</th><td><input type='number' name ='" + key + "' value='" + value + "'/></td></tr>";
	    	} else {
	    		inputs += "<tr><th>" + key + "</th><td>" + value + "</td></tr>";
	    	}
	    	
		});
	        
		var Props = ruleMapViaId[conn.ruleId].typeProperties;
		if (Props == null) {inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";}
		else {
			inputs += "<tr><th colspan='2' style='background-color: #CDEEDD'> Properties:</th></tr></table>";
			$.each(Props, function(key, value2) {
//			Props.forEach(function(prop) {
					inputs += "<table id='propertiesFields'>";
//					$.each(prop, function(key,value){
					$.each(value2, function(key,value){	
						if (key == 'id') {
							inputs += "<input type='hidden' name='propertyId' value='"+value+"'>";
						} else if (key == 'name') { 
							inputs += "<input type='hidden' name='currentPropertyName' value='"+value+"'>";
							inputs += "<tr><th>"+key+"</th><td><input type='text' name='propertyName' value='"+value+"'/></td></tr>";
						} else if (key == 'isMandatory' || key == 'isUnique') {
				    		inputs += "<tr><th>"+key +":</th>";
				    		inputs += "<td><input type='checkbox' name='" + key + "' ";
				    		if (value == true) {
				    			inputs += "checked";
				    		}
				    		inputs += "></td></tr>";
//							inputs += "<td><form><input type='radio' name='" + key + "' value='true'";
//						    if (value == true) { inputs += "checked";};   inputs += ">true   ";
//						    inputs += "<input type='radio' name='" + key + "' value='false'";
//						    if (value == false) { inputs += "checked";};  inputs += ">false</form></td></tr> ";
						} else if (key == 'propertyType') {
							inputs += "<tr><th>"+key+"</th><td><select name='" + key + "'><option value='INTEGER' ";
							
							if (value == "INTEGER") {
								inputs += "selected='selected'";
							} 
							inputs += ">INTEGER</option><option value='DOUBLE' ";
							
							if (value == "DOUBLE") {
								inputs += "selected='selected'";
							} 
							inputs += ">DOUBLE</option><option value='DATE' ";
							
							if (value == "DATE") {
								inputs += "selected='selected'";
							} 
							inputs += ">DATE</option><option value='STRING' ";
							
							if (value == "STRING") {
								inputs += "selected='selected'";
							} 
							inputs += ">TEXT</option><option value='BOOLEAN' ";
							
							if (value == "BOOLEAN") {
								inputs += "selected='selected'";
							} 
							inputs += ">BOOLEAN</option><option value='FILE' ";
							
							if (value == "FILE") {
								inputs += "selected='selected'";
							} 
							inputs += ">FILE</option><option value='CURRENCY' ";
							
							if (value == "CURRENCY") {
								inputs += "selected='selected'";
							} 
							inputs += ">CURRENCY</option></select></td></tr>";
							
						} else { 
							if((key != 'id')&& (key!='romeDecoPropId')&& (key != 'validValues')){
								inputs += "<tr><th>"+key+"</th><td><input type='text' name='"+key+"' value='"+value+"'/></td></tr>";
							}
						}
					});
					inputs += "<tr><td colspan='2'>---------------------------------</td></tr>";
					});
		}
			
		// <!-- Allow form submission with keyboard without duplicating the dialog button -->
		formFooter = "<tr><td><input type='button' value='Update Type' class='btn btn-primary btn-xs' onclick='(new DesignLogicalRenderer()).saveUpdateRuleConnection(form)' /></td>";
		formFooter += "<td><input type='button'  value='Cancel' class='btn btn-primary btn-xs' onclick='DesignCytoscapeUtils.clickAnEdge(\"" + conn.id + "\");'></td></tr><table></form>";
		Form.innerHTML = formHeader + inputs + formFooter;
		(new DesignLogicalRenderer()).emptyAll();
		$('#typeForm').append(Form);
				
	};
	
	this.saveUpdateRuleConnection = function (form) {
		
		var jsonData = {};
		
		$(form).find(':input').each(function (i, field) {
			if ((field.type != 'submit' && field.type != 'radio'  && field.type !='button') || field.checked) {
				if((field.name == 'minRel')|| (field.name == 'maxRel')) {jsonData[field.name] = parseInt(field.value); }
				else {jsonData[field.name] = field.value;}
			}
		});
		console.log(jsonData);
		
		var connId = jsonData["id"];
		var connName = connMapViaId[connId].name;
			
		var doneFunction = function( data ) {
			
			var oldConnectionId = connId;
			var oldConnectionName = connName
			
//			console.log(connMap[oldName]);	
//			var tmpConn = connMap[oldName];
			
			tdvCy.remove('edge[id = "connection' + oldConnectionId + '"]');
			
			delete connMapViaId[oldConnectionId];	// delete the connMapViaId one as well
			delete connMap[oldConnectionName];
				
			updateConnGraph(tdvCy, DesignCytoscapeUtils.formatNewConnection(data));

			(new DesignLogicalRenderer()).emptyAll();
		};
			
		var failFunction = function( xhr, status, error ) {
			console.log('Error Update Connection not done: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Error Update Connection not done."+xhr.status+"</p>");
			(new DesignLogicalRenderer()).emptyAll();
		};
		
		var apis = new apiRomeNext();
		
		apis.saveUpdateConnectionById(connId, jsonData, doneFunction, failFunction);
		
		var jsonData2 = {};
		
		var ruleProperties = [];
		var jsonProperty = {};
		$(form).find('table#propertiesFields').each(function(i, propDiv){
			$(propDiv).find(':input').each(function(i,field){
			        if ( field.type != 'submit' || field.value != 'Cancel') {
			        	
			        	if ((field.name == 'propertyType')&&(field.value == 'TEXT')) {
			        		jsonProperty[field.name] ='STRING';
			        	} else {
							if (field.name == 'isMandatory' || field.name == 'isUnique') {
								if (field.checked == true) {
									jsonProperty[field.name] = "true";
								} else {
									jsonProperty[field.name] = "false";
								}
							} else {
								jsonProperty[field.name] = field.value;
							}	
//			        		jsonProperty[field.name] = field.value;
			        	}
			        	  
			        }             
			});
			ruleProperties.push(jsonProperty); 
			jsonProperty = {};
		});
		
		jsonData2.properties = ruleProperties;
		var ruleName = connMapViaId[connId].rule;
		jsonData2.name = ruleName;
		var doneFunction2 = function( data ) {
			
			ruleMap[data.name]= data;               
			ruleMapViaId[ data.id ] = data;			
		
		};
			
		var failFunction2 = function( xhr, status, error ) {
			(new DesignLogicalRenderer()).emptyAll();
			document.getElementById('typeForm').textContent="Error Connection properties not updated";
			$('#console-log').append("<p style='color:red'>Error Connection properties not updated: " + xhr.responseText);
		};
		
		var ruleApis = new RuleApis();
		ruleApis.updateRuleAndProperties(ruleName, jsonData2, doneFunction2, failFunction2);
		
		DesignCytoscapeUtils.clickAnEdge(connId);
				
	};
	
}
