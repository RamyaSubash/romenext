function DesignLogicalRenderer() {
	this.divholderId;

	this.initBase = function(divId) {
		console.log("divId is: " + divId);
		this.divHolderId = divId;
	};

	this.initRenderer = function() {

		TypeUtils.globalType_addFn("create", "logical", DesignLogicalRendererCrud.typeCreate);
	};

	this.initView = function() {
		active_deco = "logical_type";

		
		if( $( "#main-content-workingarea" ).is(":visible") ) {
			console.log("THis was visible");

			selecteddecorator = "Logical";
			this.enableLogicalDesignView();
			document.getElementById("design").className = "btn btn-raised btn-default btn-md text-center active";
			var checked = this.checkInitialValues();
			if (checked == true) {
				this.loadView();
			}
		} else {
			console.log("THIS WAS INVISIBLE");

			
			selecteddecorator = "Logical";
//			this.enableLogicalDesignView();
			document.getElementById("design").className = "btn btn-raised btn-default btn-md text-center active";
			var checked = this.checkInitialValues();
			if (checked == true) {
//				this.loadView();
			}
		}
		
		
//		if (document.getElementById("main-content-workingarea").style.display != 'block') {
//			selecteddecorator = "Logical";
//			this.enableLogicalDesignView();
//			document.getElementById("design").className = "btn btn-raised btn-default btn-md text-center active";
//			var checked = this.checkInitialValues();
//			if (checked == true) {
//				this.loadView();
//			}
//		}
	}

	this.enableLogicalDesignView = function() {

		var logicalDecoBody = document.getElementById("main-content-workingarea");
		logicalDecoBody.style.display = "block";

		if (document.getElementById('tdvCy') == undefined || document.getElementById('tdvCy') == null) {
			var cy = GlobalHTMLUtils.createHTMLEntity('div', 'tdvCy', 'cy', 'visible', 'block', '');
			logicalDecoBody.appendChild(cy);
		}
		// implement permissions on interface
		if (userGroup.CREATE == false) {
			$("#plus_icon").prop('disabled', true);
			document.getElementById("plus_icon").setAttribute("class", "btn btn-default dropdown-toggle");
			document.getElementById("plus_icon").style.cursor = 'not-allowed';
		}

	};

	this.checkInitialValues = function() {

		if (!$.isEmptyObject(userGroup.name) && !$.isEmptyObject(userGroup.host)) {

			if (selectedMetaData == null || selectedMetaData == '') {
				CommonFctsLogical.HandlingErrorMSG("No Metadata Selected  !!", "error");
				return false;
			} else {
				GlobalUtils.loadAllTypeAndConnections();
				//			GlobalUtils.loadAllDCT();
				GlobalUtils.loadAllRules();		
				action = null;
				return true;
			}
		} else {
			console.log(" User group  Name is " + userGroup.name + " User Group Host " + userGroup.host + "Can not API call ");
			return false;
		}
	};

	this.refresh = function () {
		GlobalUtils.loadAllTypeAndConnections();
		GlobalUtils.loadAllRules();
		action = null;
		this.loadView();
	}
	
	/**
	 * Loads the initial cytoscape view. All instances should be preloaded by now.
	 * 
	 */
	this.loadView = function() {
		// preparing the bottom bar
//		CommonFctsLogical.drawColorbar();
//		CommonFctsLogical.drawSizebar();
		
		PrefBarFunctions.generateColorOptions();
		PrefBarFunctions.generateSizeOptions();
		
		// getting all types and connections
		var elements = DesignCytoscapeUtils.formatTypesAndConnections();
		// build cytoscape graph
		tdvCy = DesignCytoscapeUtils.initTypeConnGraph(tdvCy, "tdvCy", elements);

		// initialise the bars Nodes/Paths/Systems/Links
		DesignLogicalBarRender.buildInitialLoad(typeMapViaId, "typelist", "typeslist", "totalNodes", "node");
		DesignLogicalBarRender.buildInitialLoad(typeMapViaId, "pathlist", "pathslist", "totalPaths", "path");
		DesignLogicalBarRender.buildInitialLoad(typeMapViaId, "systemlist", "systemslist", "totalSystems", "system");

		//		designAction.currAction = 'load';
		this.initDesignBar(ruleMapViaId, "linklist");

		DesignLogicalBarRender.barStatus();
		DesignCytoscapeUtils.saveInitialPosition(tdvCy);

		// turn On Nodes labels
//		if (!tdvCy) {
//			CommonFctsLogical.toggleTypeName();
//		}

		// Turn OFF PC labels
//		CommonFctsLogical.toggleEdgeName();
		PrefBarFunctions.toggleToolTips();

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
					console.log("List of types is:" + listTypeIds);
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
					console.log("List of connections is:" + listConnIds);
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
		document.body.style.cursor = 'default';
	}

	this.generatePath = function() {
		var list = '';
		list += "<ul  class='list-inline'>";
		list += "<li><span class='glyphicon glyphicon-home'></span>Home<i class='fa fa-angle-right'></i></li>";
		list += "<li>Logical Design<i class='fa fa-angle-right'></i></li>";
		list += "<li><a href='#'>Nodes</a></li>";
		list += "</ul>";
		document.getElementById('breadcrumb').innerHTML = list;
	};

	this.initDesignBar = function(list, bar) {

		//		console.log("Function initialise a bar in Design View!!!");
		var inputs = '',
			nbElements = 0;
		var nb = Object.keys(list).length;

		if (nb == 0) {
			// no elements at all in the list   typeMapViaId is empty 
			// hide all bars leave only nodes
			document.getElementById(bar).innerHTML = "";
			DesignLogicalBarRender.turnOffButton("link_img");
			document.getElementById("linktr").style.display = 'none';
			document.getElementById("linktr").style.visibility = 'hidden';
			return;
		}
		var nbNodes = tdvCy.elements('node[classification="link"]').length;
		if (nbNodes == 0) {
			DesignLogicalBarRender.turnOffButton("link_img");
			document.getElementById(bar).innerHTML = "";
			document.getElementById("linktr").style.display = 'none';
			document.getElementById("linktr").style.visibility = 'hidden';
			return;
		}

		//======== new code for constructing the rule bar ========================//		
		var inputs = '';
		inputs = "<div id='linksList'>";
		inputs += "<span class='badge' id='totalLinks'>*(" + nbNodes + ")</span>";
		$.each(list, function(key, value) {
			if (value.classification == "link") {
				inputs += "<span class='label label-default'  id='rule_" + value.id
					+ "' title='Select to view in Graph' onclick=\"(new DesignLogicalRenderer()).ruleSelect('" + value.id + "')\"  >" + value.name + "</span>";
			}
		});
		inputs += "</div>";

		document.getElementById(bar).innerHTML = inputs;
		DesignLogicalBarRender.adjustBar('linksList', 'link');
		//========================================================================//
		document.getElementById(bar).style.display = 'block';
		document.getElementById(bar).style.visibility = 'visible';
		DesignLogicalBarRender.turnONButton("link_img");
		document.getElementById("linktr").style.display = 'table-row';
		document.getElementById("linktr").style.visibility = 'visible';

	}

	this.showAddType = function(event, typeNode) {

		if (action == null) {
			typelinkCreate = true;
			GlobalUtils.cursor_create();
			$("#besideMouseCreate").html("<span class='badge'>Select the position to drop the " + typeNode + "</span>");
			ConnectionPropertyUtils.mouseTextCreate(event);
			typelinkType = typeNode;
			posType = null;
			posWin = null;
		}

	}

	/**************USED**************/
	this.buildCreateWindow = function(event) {

		DesignLogicalBarRender.resetSpanBorderInBar();
		$(".sidebotnav").empty();
		// create the window
		var divprop = document.createElement('div');
		divprop.id = 'typecreateForm';
		divprop.className = 'block';
		divprop.innertHTML = '';

		$("#property_win").empty();
		$("#property_win").append(divprop);

		var d = document.getElementById("property_win");
		d.style.position = 'absolute';
		d.style.left = posWin.x + 'px';
		d.style.top = posWin.y + 'px';
		d.style.width = '230px';
		document.getElementById("property_win").style.display = 'block';
		document.getElementById("property_win").style.visible = 'visibility';


		var callFct = "";
		var input = "<form id='add_form'>";
		input += "<table border='1'>";
		input += "<tr><td colspan='2'><h5>Create " + typelinkType + " Form </h5></td></tr>"
		input += "<tr><th>Name</th><td><input type='text' id='add_" + typelinkType + "_name'  name='add_name'  /></td></tr>";
		input += "<tr><td colspan='2'><input type='hidden' id='add_isRoot'  name='isRoot' value='true' /></td></tr>";
		input += "<tr><td colspan='2'><input type='hidden' id='add_classification' name='classification' value='" + typelinkType + "' /></td></tr>";

		if (typelinkType == 'dct') {
			callFct = "DesignSavingFcts.saveDCT()";
		} else if (typelinkType == 'link') {
			callFct = "DesignSavingFcts.saveLink()";
		} else {
			callFct = "DesignSavingFcts.saveType()";
		}

		input += "<tr align='center'><td colspan='2'><input type='button' id='save_new_type_name' class='btn btn-primary btn-xs'  value='Add " + typelinkType + "' onclick='" + callFct + "'/>";
		input += "<input type='button'  class='btn btn-primary btn-xs'  value='Cancel'  onclick='DesignSavingFcts.cancelCreate()' /></td></tr>";
		input += "</table></form>";
		input += "<div id='error_create'></div>";

		$("#typecreateForm").empty();
		$("#typecreateForm").append(input);
		$("#add_" + typelinkType + "_name").focus();

	}

	this.typeSelect = function(typeId) {
		//		console.log(typeId);
		var thisClick = new Date().getTime();
		isSingleClick = true;
		pleaseWait = true;
		DesignSavingFcts.clearSelection();
		// Highlight the selected Type in the Graph
		tdvCy.filter('node[id="' + typeId + '"]').select(); // highlight the type in graph
		listTypeIds[0] = typeMapViaId[typeId].id;

		// display its name in bottom bar
		GlobalUtils.setActiveType(typeMapViaId[typeId]);

		tdvCy.center(tdvCy.$("#" + typeId));
	}

	this.ruleSelect = function(ruleId) {
		//		console.log(ruleId);
		var thisClick = new Date().getTime();
		isSingleClick = true;
		pleaseWait = true;

		DesignSavingFcts.clearSelection();

		GlobalUtils.setActiveRule(ruleMapViaId[ruleId]);
		// Highlight the selected Type in the Graph
		tdvCy.filter('node[id="rule' + ruleId + '"]').select();
		tdvCy.center(tdvCy.$("#rule" + ruleId));


	}

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
						} else if (propertyType == "DOUBLE"
							|| propertyType == "CURRENCY") {
							child.children.defaultValue.outerHTML = "<input type='number' name='defaultValue' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 46' value='0.0' defaultValue='0.0' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/>";
						} else if (propertyType == "BOOLEAN") {
							child.children.defaultValue.outerHTML = "<select name='defaultValue'>"
								+ "<option value='true'>true</option>"
								+ "<option value='false'>false</option>"
								+ "</select>";
						} else if (propertyType == "DATE") {
							child.children.defaultValue.outerHTML = "<input type='date' name='defaultValue' onkeypress='' value='"
								+ today + "' defaultValue='" + today + "' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/>";
						}
					}
				}
			}
		}

	};

	this.addPreferenceToTypeBatch = function(typeId, preferenceList) {

		var json = {
			grouphost : userGroup.host,
			groupname : userGroup.name,
			namespace : loggedInUserName,
			typeId : Number(typeId),
			properties : preferenceList
		};

		var successFunction = function(data) {

			//				console.log('Get Preference for Type Successfully!');
			$.each(data.preferences, function(key, value) {
				typeMapViaId[typeId].prefProperties[value.id] = value;
			});

		};

		var failFunction = function(xhr, status, error) {
			console.log('Get Preference Error: ' + xhr.status);
			CommonFctsLogical.HandlingErrorMSG("Setting Initial preferences failed" + xhr.status, "error");
			console.log(' SAVE TYPE Error : ' + xhr.status);
			console.log(' what are these : ' + xhr.responseJSON);
			console.log(' what are these : ' + xhr.responseJSON.exceptionCode);
			console.log(' what are these : ' + xhr.responseXML);
			console.log(' what are these : ' + xhr.statusText);
			console.log(' what are these : ' + xhr)
			console.log(' what are these : ' + status)
			console.log(' what are these : ' + error)

		};

		var apis = new PreferenceApis();
		apis.addPreference(json, successFunction, failFunction);

	};

	this.getAllPreferenceForType = function(typeId) {

		var typePreferenceProperties = null;

		var json = {
			grouphost : userGroup.host,
			groupname : userGroup.name,
			namespace : loggedInUserName,
			typeId : Number(typeId)
		};

		var successFunction = function(data) {
			//			console.log('Get Preference for Type Successfully!');
			CommonFctsLogical.HandlingErrorMSG("Get Preference for Type Successfully!", "success");
			typePreferenceProperties = data.preferences;
		};

		var failFunction = function(xhr, status, error) {
			//			console.log('Get Preference Error: ' + xhr.status);
			CommonFctsLogical.HandlingErrorMSG("Error in Get Preference:" + xhr.status, "error");

		};

		var apis = new PreferenceApis();
		apis.getAllPreferencesByTypeId(selectedMetaData, json, successFunction, failFunction);
		return typePreferenceProperties;

	};

	this.saveTypePreference = function(typeId, preferenceName, preferenceValue) {

		var typePreferenceProperties = this.getAllPreferenceForType(typeId);

		var hasCurrentPreference = false;
		$.each(typePreferenceProperties, function(key, value) {
			if (value.name == preferenceName) {
				hasCurrentPreference = true
				return false;
			}
		});

		if (hasCurrentPreference == false) {

			var preferenceList = [];
			var preference = null;
			if (preferenceName == "size") {
				preference = {
					name : "size",
					propertyType : "STRING",
					defaultValue : "0"
				};
			} else if (preferenceName == "color") {
				preference = {
					name : "color",
					propertyType : "STRING",
					defaultValue : "0"
				};
			} else if (preferenceName == "labelPosition") {
				preference = {
					name : "labelPosition",
					propertyType : "STRING",
					defaultValue : defaultTypeLabelPosition
				};
			} else if (preferenceName == "labelSize") {
				preference = {
					name : "labelSize",
					propertyType : "STRING",
					defaultValue : defaultTypeLabelSize
				};
			} else {
				console.log('Invalid Preference!');
				CommonFctsLogical.HandlingErrorMSG("Invalid Preference!", "error");
				return;
			}

			preferenceList.push(preference);

			var dlRenderer = new DesignLogicalRenderer();
			dlRenderer.addPreferenceToTypeBatch(Number(typeId), preferenceList);
			typePreferenceProperties = dlRenderer.getAllPreferenceForType(typeId);
		}

		var typePreferenceProperty = null;
		$.each(typePreferenceProperties, function(key, value) {
			if (value.name == preferenceName) {
				typePreferenceProperty = value;
				return false;
			}
		});

		if (typePreferenceProperty != null && typePreferenceProperty.value != preferenceValue.toString()) {
			var properties = [];
			var property = {
				id : typePreferenceProperty.id,
				name : typePreferenceProperty.name,
				value : preferenceValue.toString(),
				propertyType : typePreferenceProperty.propertyType
			};
			properties.push(property);

			var json = {
				grouphost : userGroup.host,
				groupname : userGroup.name,
				namespace : loggedInUserName,
				typeId : Number(typeId),
				properties : properties
			};

			var successFunction = function(data) {
				if (data.preferences.length != 0) {
					//					console.log('Save Preference for Type Successfully!');
					CommonFctsLogical.HandlingErrorMSG("Save Preference for Type Successfully!", "success");
					//					var prefProperty = data.preferences[0];
					//					
					//					typeMapViaId[typeId].prefProperties[prefProperty.id].value = prefProperty.value;

					$.each(data.preferences, function(key, value) {
						var prefProperty = value;
						typeMapViaId[typeId].prefProperties[prefProperty.id] = prefProperty;
					});

				}
			};

			var failFunction = function(xhr, status, error) {
				console.log('Save Preference Error: ' + xhr.status);
				CommonFctsLogical.HandlingErrorMSG("Error in Save Preference:", "error");
			};

			var apis = new PreferenceApis();
			apis.updatePreferenceAndProperties(json, successFunction, failFunction);
		} else {
			console.log('Preference Not Found!');
			CommonFctsLogical.HandlingErrorMSG("Preference Not Found!", "error");
		}

	};

	this.saveTypePreferenceBatch = function(typeId, preferenceNameValueMap) {

		var properties = [];
		$.each(preferenceNameValueMap, function(key, value) {

			var dlr = new DesignLogicalRenderer();
			var preferenceName = key;
			var preferenceValue = value;
			var typePreferenceProperties = dlr.getAllPreferenceForType(typeId);
			var typePreferenceProperty = null;
			$.each(typePreferenceProperties, function(key, value) {
				if (value.name == preferenceName) {
					typePreferenceProperty = value;
					return false;
				}
			});

			if (typePreferenceProperty != null) {
				var properties = [];
				var property = {
					id : typePreferenceProperty.id,
					name : typePreferenceProperty.name,
					value : preferenceValue.toString(),
					propertyType : typePreferenceProperty.propertyType
				};
				properties.push(property);
			} else {
				console.log('Preference Not Found!');
				CommonFctsLogical.HandlingErrorMSG("Preference Not Found!", "error");
				properties = [];
				return false;
			}
		});

		if (properties.length > 0) {

			var json = {
				grouphost : userGroup.host,
				groupname : userGroup.name,
				namespace : loggedInUserName,

				typeId : Number(typeId),
				properties : properties
			};

			var successFunction = function(data) {
				console.log('Save Preference for Type Successfully!');
				CommonFctsLogical.HandlingErrorMSG("Save Preference for Type Successfully!", "success");
				// update preference property value in type from typeMapViaId
				$.each(data.preferences, function(key, value) {
					var prefProperty = value;
					typeMapViaId[typeId].prefProperties[prefProperty.id] = prefProperty;
				});
			};

			var failFunction = function(xhr, status, error) {
				console.log('Save Preference Error: ' + xhr.status);
				CommonFctsLogical.HandlingErrorMSG("Error in Save Preference:" + xhr.status, "error");
			};

			var apis = new PreferenceApis();
			apis.updatePreferenceAndProperties(json, successFunction, failFunction);

		} else {
			console.log('Preference Not Found!');
			CommonFctsLogical.HandlingErrorMSG("Preference Not Found!", "error");
		}

	};



}