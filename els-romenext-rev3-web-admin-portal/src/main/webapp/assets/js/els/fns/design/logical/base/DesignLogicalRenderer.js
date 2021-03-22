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
		
//		document.getElementById("tdvCy").style.display = "block";
		var logicalDecoBody = document.getElementById(activeDecos_BODY[this.divHolderId]);
		logicalDecoBody.style.display = "block";
		
		if (document.getElementById('typeBar') == undefined || document.getElementById('typeBar') == null) {
			
			var typeBar = GlobalHTMLUtils.createHTMLEntity('header', 'typeBar', 'panel-heading', 'visible', 'block', 'Type Bar');					
			logicalDecoBody.appendChild(typeBar);
			
		}
		
		if (document.getElementById('ruleBar') == undefined || document.getElementById('ruleBar') == null) {
			
			var ruleBar = GlobalHTMLUtils.createHTMLEntity('header', 'ruleBar', 'panel-heading', 'visible', 'block', 'Rule Bar');
			logicalDecoBody.appendChild(ruleBar);

		}
		
		if (document.getElementById('tdvCy') == undefined || document.getElementById('tdvCy') == null) {
			
			var cy = GlobalHTMLUtils.createHTMLEntity('div', 'tdvCy', 'cy', 'visible', 'block', '');
			logicalDecoBody.appendChild(cy);

		}
		
		var logicalDecoLn = document.getElementById(activeDecos_LN[this.divHolderId]);
		logicalDecoLn.style.display = "block";
		
		if (document.getElementById('grid-types') == undefined || document.getElementById('grid-types') == null) {
			
			var gridTypes = document.createElement('div');
			gridTypes.id = 'grid-types';
			gridTypes.style.visibility = 'hidden';
			gridTypes.innerHTML += '<div class="box box-solid box-info" style="height: 600px; overflow: auto;">'
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
//				selecteddecorator = 'Logical';
				(new toolbarManagerRomeNext()).createDesignTool();	
				if(selectedMetaData.length != "") { 
					this.showOrHideGridTypes(true);
				}	
			}
		}
		
	};
	
	this.checkInitialValues = function() {
		
		if (selectedMetaData == null || selectedMetaData == '') {
			
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
//		var nb = Object.keys(typeMap).length;
		var nb = Object.keys(typeMapViaId).length;
		var inputs = '';
		if( nb != 0 ){
			inputs ="<table id='typesList'><tr>";
		    inputs += "<td class='create_icon' onclick='(new DesignLogicalRenderer()).showAddType();'><img  id='img_create' title='Create type'   src='"+img_path+ "design_icons/create.png'></td>";
			inputs += "<td><span class='badge'>*("+nb+")</span></td>";
//			$.each(typeMap, function(key, value){
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
		if(nb != 0) {
			inputs +="<table id='ruleList'><tr>";
			inputs +=  '<td onclick="createConnection(\'parentchild\')"><img title="create pc connection" id="img_connect_pc"   src="'+img_path+'design_icons/conn_pc.png"/></td>';
			inputs +=  '<td onclick="createConnection(\'link\')"><img title="create link connection" id="img_connect_link" src="'+img_path+'design_icons/conn_link.png"/></td>';
			inputs += "<td><span class='label label-default'>*("+nb+")</span></td>";
			$.each(ruleMap, function(key, value){
				if (value.classification == "parentchild") {
					inputs += "<td><span class='label label-primary'  id="+value.id+">"+key+"</span></td>";	
				} else if (value.classification == "link") {
					inputs += "<td><span class='label label-success'  id="+value.id+">"+key+"</span></td>";	
				} else {
					console.log("Classification Is Wrong: " + value.id);
				}	
		     });
			inputs +="</tr></table>";
			document.getElementById(bar).innerHTML = inputs;
		} else {
			inputs +="<table id='ruleList'><tr>";
			inputs +=  '<td value="parentchild" onclick="createConnection(\'parentchild\')"><img title="create pc connection"   id="img_connect_pc"   src="'+img_path+'design_icons/conn_pc.png"/></td>';
			inputs +=  '<td value="link" onclick="createConnection(\'link\')"><img title="create link connection"   id="img_connect_link"   src="'+img_path+'design_icons/conn_link.png"/></td>';
			inputs +="</tr></table>";

			document.getElementById(bar).innerHTML = inputs;
		}
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
		
	}
	
	// should be changed
	this.showConnRuleProperties = function(conn) {
		pleaseWait = true;
		setTimeout(function() {
			pleaseWait = false;
			if (isSingleClick && conn == lastObj) {
				$('#console-log').append("<p>Single click on this connection (showing its properties)"+conn.data().name+"</p>");
				DisplayConnRuleProperties(conn);
				console.log("inside showConnection property: " + conn.data().name);
			}
		}, doubleClickThreshold + 10)
	};
	
	this.showOrHideGridTypes = function(value) {
		if(value){
			if($("#grid-types").css('visibility') == 'hidden'){$("#grid-types").css({'visibility':'visible'});}
		}else {
			if($("#grid-types").css('visibility') == 'visible'){$("#grid-types").css({'visibility':'hidden'});}
		}
	};
	
	this.getCoordinate = function(value, x) {
		for (var i = 0; i < value.length; i++) {
			if (value[i].name == x) {
				return Number(value[i].value);
			}
		}
		return 0;
	}
	
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
				form.innerHTML += inputClassification;
				form.innerHTML += inputOwner;

				form.innerHTML += geoActivator;
				form.innerHTML += buttonCreate;
				form.innerHTML += buttonCancel;
								
				document.getElementById('Infotitle').textContent="Create New Type";
				(new DesignLogicalRenderer()).emptyAll();				
				$('#typeForm').append(form);
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
//		nametype    = type; 
//		Display its proprietes in sideBar 
		
		(new DesignLogicalRenderer()).showOrHideGridTypes(true);
		document.getElementById('Infotitle').textContent="Type Details";
		(new DesignLogicalRenderer()).emptyAll();
		TypePropertyUtils.displayTypeProperties( $('#typeForm'), typeMap[type], true );
		//showType(typeMap[type]);                                           // should display information on the INFO section 	
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
	    	if(key == "name") {
				inputs += "<tr><th>"+key + "</th><td><input type='text' name ='"+key+"' value='"+value+"' disabled/></td></tr>";
			}
	    	
			if(key == "classification") {
				inputs += "<tr><th>"+key + "</th><td><input type='text' name ='"+key+"' value='"+value+"' /></td></tr>";
			}
			
			if (key == 'isRoot') {
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
			
		Props = type.properties;
		if (Props == null) {inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";}
		else {
			inputs += "<tr><th colspan='2' style='background-color: #CDEEDD'> Properties:</th></tr></table>";
			Props.forEach(function(prop) {
					inputs += "<table id='propertiesFields'>";
					$.each(prop, function(key,value){	
							if (key == 'name') { 
								inputs += "<input type='hidden' name='currentPropertyName' value='"+value+"'>";
								inputs += "<tr><th>"+key+"</th><td><input type='text' name='propertyName' value='"+value+"' disabled/></td></tr>";
								}
							else  { if((key != 'id')&& (key!='romeDecoPropId')&& (key != 'validValues'))
								{inputs += "<tr><th>"+key+"</th><td><input type='text' name='"+key+"' value='"+value+"'/></td></tr>";}
						     }
						});
					inputs += "<tr><td colspan='2'>---------------------------------</td></tr>";
					});
		}
			
	}
	
//	this.AddTypeProperties() {                                       // the selected name of the type is saved in the Global variable
//		var type = typeMap[nametype];
//		var Form, formHeader, formFooter, newProperty, properties, inputs=''; 
//		console.log("Type name is " +nametype);
//		Form = document.createElement('div');  
//		
//		formHeader = "<form id='typeProps'  method='post'>";
//		
//	    inputs += "<div id='typeName'><label>Type Selected: </label>"+nametype+"<input type='hidden' name='typename' value='"+nametype+"'/></div>";
//		inputs += "<button type='button' class='btn btn-success btn-xs'   onclick='addProperties()'>Add property</button>";
//
//		formFooter = "<div id='propertiesFields'></div>";
//		formFooter += "<input id='save_type_prop_button' type='button' value='Save properties'  class='btn btn-success btn-xs' onclick='saveTypeProperties(form)'></form>";
//		
//		Form.innerHTML = formHeader + inputs + formFooter;
//		(new DesignLogicalRenderer()).emptyAll();
//		$('#typeForm').append(Form);	
//		
//		 newProperty = document.createElement('div');
//		 properties = "<hr/><table>";
//	     properties += "<tr><th>Name & Type:</th><td><input type='text' name='propertyName' size='10' />";
//	     properties += "<select name='propertyType'>" +
//				"<option value='INTEGER'>INTEGER</option>"+
//				"<option value='DOUBLE'>DOUBLE</option>"+
//				"<option value='DATE'>DATE</option>"+
//				"<option value='STRING'>TEXT</option>"+
//				"<option value='BOOLEAN'>BOOLEAN</option>"+
//				"</select></td></tr>"; 
//		 properties += "<tr><th> isMandatory:</th><td>";
//		 properties += "<input type='radio' name='isMandatory' value='true' checked='checked'/>Yes";
//		 properties += "<input type='radio' name='isMandatory' value='false' />No";
//		 properties += "</td></tr>";
//		 properties += "<tr><th> isUnique: </th><td>";
//		 properties += "<input type='radio' name='isUnique' value='true' checked='checked'/>Yes";
//		 properties += "<input type='radio' name='isUnique' value='false' />No";
//		 properties += "</td></tr>";
//		 properties += "<tr><th>Default Value:</th><td> <input type='text' name='defaultValue' /></td></tr>";
//		 properties += "<tr><th>Max Value:</th><td> <input type='text' name='maxValue' /></td></tr>";
//		 properties += "<tr><th>Min Value:</th><td> <input type='text' name='minValue' /></td></tr></table>";
//		
//		 newProperty.innerHTML = properties;
//		
//		document.getElementById('propertiesFields').appendChild(newProperty);
//		if (document.getElementById('propertiesFields').innerHTML != '') {
//			document.getElementById("save_type_prop_button").style.visibility = 'visible';
//			}
//	}
//	//=====================================================================================
//	//======================================================================================================
//	//This is used for displaying properties for TYPE and Rule
//	//======================================================================================================
//	function addProperties(){
//	 var newProperty = document.createElement('div');
//	 var properties = "<hr/><table>";
//	    properties += "<tr><th>Name & Type:</th><td><input type='text' name='propertyName' size='10' />";
//	    properties += "<select name='propertyType'>" +
//				"<option value='INTEGER'>INTEGER</option>"+
//				"<option value='DOUBLE'>DOUBLE</option>"+
//				"<option value='DATE'>DATE</option>"+
//				"<option value='STRING'>TEXT</option>"+
//				"<option value='BOOLEAN'>BOOLEAN</option>"+
//				"</select></td></tr>";
//	 
//		properties += "<tr><th> isMandatory:</th><td>";
//		properties += "<input type='radio' name='isMandatory' value='true' checked='checked'/>Yes";
//		properties += "<input type='radio' name='isMandatory' value='false' />No";
//		properties += "</td></tr>";
//		
//		properties += "<tr><th> isUnique: </th><td>";
//		properties += "<input type='radio' name='isUnique' value='true' checked='checked'/>Yes";
//		properties += "<input type='radio' name='isUnique' value='false' />No";
//		properties += "</td></tr>";
//		
//		
//		properties += "<tr><th>Default Value:</th><td> <input type='text' name='defaultValue' /></td></tr>";
//		properties += "<tr><th>Max Value:</th><td> <input type='text' name='maxValue' /></td></tr>";
//		properties += "<tr><th>Min Value:</th><td> <input type='text' name='minValue' /></td></tr></table>";
//		
//		newProperty.innerHTML = properties;
//		document.getElementById('propertiesFields').appendChild(newProperty);
//		if (document.getElementById('propertiesFields').innerHTML != '') {
//			document.getElementById("save_type_prop_button").style.visibility = 'visible';
//		}
//	 
//	}
		
}
