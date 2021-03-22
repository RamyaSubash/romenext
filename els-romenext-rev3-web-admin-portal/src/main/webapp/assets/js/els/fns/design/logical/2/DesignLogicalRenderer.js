function DesignLogicalRenderer() {

	this.divholderId;

	this.initBase = function(divId) {
		console.log("divId is: " + divId);
		this.divHolderId = divId;
	};

	this.initRenderer = function() {

		TypeUtils.globalType_addFn("create", "logical",	DesignLogicalRendererCrud.typeCreate);
	};

	this.initView = function() {
		active_deco = "logical_type";

		if (document.getElementById("main-content-workingarea").style.display != 'block') {
			selecteddecorator = "Logical";
			this.enableLogicalDesignView();
			
			var checked = this.checkInitialValues();
			if (checked == true) {
				this.loadView();
			}
			document.body.style.cursor = 'default';
		}
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
				designAction.currAction = '';
				designAction.prevAction = '';
				return true;
			}
		}else {
			console.log(" User group  Name is " + userGroup.name + " User Group Host " + userGroup.host + "Can not API call ");
			return false;
		}
	};

	this.loadView = function() {
		// preparing the bottom bar
		CommonFctsLogical.drawColorbar();
		CommonFctsLogical.drawSizebar();
		// getting all types and connections
		var elements = DesignCytoscapeUtils.formatTypesAndConnections();
		// build cytoscape graph
		tdvCy = DesignCytoscapeUtils.initTypeConnGraph(tdvCy, "tdvCy", elements);
		
		// initialise the bars Nodes/Paths/Systems/Links
		DesignLogicalBarRender.buildLoadBar( typeMapViaId, "typelist", "typeslist", "totalNodes" , "node" );
		DesignLogicalBarRender.buildLoadBar( typeMapViaId, "pathlist", "pathslist", "totalPaths" , "path" );
		DesignLogicalBarRender.buildLoadBar( typeMapViaId, "systemlist", "systemslist", "totalSystems", "system"  );
		
//		DesignLogicalBarRender.adjustBar("typeslist", "node");
		
		designAction.currAction = 'load';
		this.initDesignBar( ruleMapViaId, "linklist" );
		DesignLogicalBarRender.barStatus();
      
		DesignCytoscapeUtils.saveInitialPosition(tdvCy);

		// turn On Nodes labels
		if (!tdvCy) {
			CommonFctsLogical.toggleTypeName();
		}
		// Turn OFF PC labels
		CommonFctsLogical.toggleEdgeName();

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

					DesignCytoscapeUtils.selectUnselectConnections( tmpListConnIds, tdvCy, true);
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
		console.log($(window).height());   // returns height of browser viewport
		console.log($(document).height()); // returns height of HTML document (same as pageHeight in screenshot)
		console.log($(window).width());   // returns width of browser viewport
		console.log($(document).width()); // returns width of HTML document (same as pageWidth in screenshot)
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

	this.initDesignBar = function( list , bar ) {

		console.log("Function initialise a bar in Design View!!!");
		var inputs = '', nbElements = 0;	
		var nb = Object.keys(list).length;
		
		var ncount = 0;
	    var nbrow =1;
	    var text = 'toggle_visibility("link_suite")';
		
		if (nb != 0) {
			inputs = "<div id='linksList'>";
			inputs += "<span class='badge' id='totalLinks'>*(" + nb	+ ")</span>";
			ncount++;
			$.each( list, function(key, value) {
				if (value.classification == "link") {
					inputs += "<span class='label label-default'  id='rule_"+ value.id
							+ "' title='Select to view in Graph' onclick=\"(new DesignLogicalRenderer()).ruleSelect('"+ value.id + "')\"  >" + value.name+ "</span>";
					nbElements++;
					ncount++;
					if (ncount == 24) {
                 	   inputs += "<a onclick='"+text+"' id='a_link_suite' ><i class='fa fa-toggle-right' style='font-size:20px;color:blue'  ></i></a> <div id='link_suite' style='display:none' >";
					   }else {
						   if( ncount % 24  == 0 && ncount != 0){
							   inputs += "<br/>";
						   }
					   }
				}
			});
			if(ncount>24){  inputs += "</div>";  }
	        inputs += "</div>";
		} else {
			inputs = "";
		}
	
		if (nbElements != 0) {
			document.getElementById(bar).innerHTML = inputs;
			$("#totalLinks").empty();
			$("#totalLinks").append("(" + nbElements + ")");

		} else {	
			document.getElementById(bar).innerHTML = '';
			document.getElementById(bar).style.display = "none";
			document.getElementById("link_img").className = "btn btn-default btn-xs text-center";
			document.getElementById("link_img").innerHTML = "LINK";	
			document.getElementById("link_img").setAttribute("data-state", "hidden");				
		}
	}

	this.showAddType = function(event, typeNode) {
		
		typelinkCreate = true;
		GlobalUtils.cursor_create ();
	    $("#besideMouseCreate").html("<span class='badge'>Select the position to drop the "+typeNode +"</span>");
	    ConnectionPropertyUtils.mouseTextCreate(event);
		typelinkType = typeNode;
		posType  = null;
		posWin   = null;
				
	}
		
	this.buildCreateWindow = function ( event ){
		
		
		// create the window
		
		var divprop  = document.createElement('div');
	    divprop.id = 'typecreateForm';
	    divprop.className = 'block';
	    divprop.innertHTML = '';
	    
	    $("#property_win").empty();
	    $("#property_win").append(divprop);

	    var d = document.getElementById("property_win");
	    d.style.position = 'absolute';
	    d.style.left     = posWin.x+'px';
	    d.style.top      = posWin.y+'px';
		document.getElementById("property_win").style.display = 'block';
		document.getElementById("property_win").style.visible = 'visibility';	
		
	   	
//		CommonFctsLogical.openDialogForCreation("New "+typelinkType, event );
//		$("#create_type").dialog("open");
		
		// clear the error_message
		$("#error_message").empty();
		
		var callFct = "";
		var input = "<form id='add_form'>";
		input += "<table border='1'>";
		input += "<tr><th>Name</th><td><input type='text' id='add_"+typelinkType+"_name' autofocus  name='add_name' onfocus=\" this.value = ''; \"      onblur=\"if(this.value == '') { this.value = 'Enter a Value'; }\" /></td></tr>";
		input += "<tr><td colspan='2'><input type='hidden' id='add_isRoot'         name='isRoot' value='true' /></td></tr>";
		input += "<tr><td colspan='2'><input type='hidden' id='add_classification' name='classification' value='"+typelinkType+"' /></td></tr>";
		
		if ( typelinkType == 'dct'){
			callFct = "DesignSavingFcts.saveDCT()";
		}else if(  typelinkType == 'link'){
			callFct = "DesignSavingFcts.saveLink()";
		}else {
			callFct = "DesignSavingFcts.saveType()";
		}
				
		input += "<tr align='center'><td colspan='2'><input type='button'  class='btn btn-primary btn-xs'  value='Add "+typelinkType+"' onclick='"+callFct+"'/>";
		input += "<input type='button'  class='btn btn-primary btn-xs'  value='Cancel'  onclick='DesignSavingFcts.cancelCreate()' /></td></tr>";
		input += "</table></form>";
		input += "<div id='error_create'></div>";

		$("#typecreateForm").empty();
		$("#typecreateForm").append(input);	
			
	}
	
    this.assignLink = function(event) {
//
//    	// Old Flow for assigning link to type
//		if (selectedElement != null) {
//			$("#error_message").empty();
//
//			var listlinks = GlobalRuleUtils.createAllLinkList();
//							
//			if ($.isEmptyObject(listlinks)) {
//				CommonFctsLogical.HandlingErrorMSG(	"No links available -- Create a link", "error");
//			} else {
//
//				var cytoElement = tdvCy.$('#' + selectedElement);
//				var divObj = $("#create_type");
//
//				divObj.dialog({
//					autoOpen : false,
//					width : 'auto',
//					height : 'auto',
//					title : "Assign Link",
//					modal : false,
//
//					position : {
//						at : "center center",
//						offset : "10 10",
//						collision : "fit flip"
//					},
//					closeText : "",
//					create : function(event, ui) {
//						// Set maxWidth
//						$(this).css("maxWidth", "800px");
//					},
//					close : function(event, ui) {
//						$("#create_type").hide();
//					}
//
//				});
//
//				var inputBody = "";
//				inputBody = '<div id="typecreateForm"></div>';
//				$("#create_type").empty();
//				$("#create_type").append(inputBody);
//				$("#create_type").dialog("open");
//
//				var inputs = "";
//				inputs += "<form id='assignNodeToLink'>";
//				inputs += "<table border='1'>";
//
//				inputs += "<tr><th>FTo Node :</th><td><input type='hidden' id='node_selected' value="+ selectedElement	+ " disabled/>"
//						+ typeMapViaId[selectedElement].name + "</td></tr>";
//				inputs += "<tr><th>Select a Link</th><td><select id='link_selected'>"
//						+ listlinks + "</select></td></tr> ";
//				inputs += "<tr><td><input type='button'  class='btn btn-primary btn-xs'  value='Assign Link' onclick='DesignLinkFctsUtils.assignNodeToLink(form)'></td>  ";
//				inputs += "<td><input type='button' value='Cancel' class='btn btn-primary btn-xs' onclick='#'></td></tr></table></form>";
//				$("#typecreateForm").empty();
//				$("#typecreateForm").append(inputs);
//
//			}
//
//		} else {
//			console.log("You must select a node first ");
//			CommonFctsLogical.HandlingErrorMSG( "To Assign a node to alink -- First select a Node", "error");
//		}
//
	}

	this.typeSelect = function(typeId) {
		console.log(typeId);
		var thisClick = new Date().getTime();
		isSingleClick = true;
		pleaseWait = true;

		// Highlight the selected Type in the Graph
		tdvCy.filter('node[id="' + typeId + '"]').select(); // highlight the type in graph
		listTypeIds[0] = typeMapViaId[typeId].id;

		// display its name in bottom bar
		GlobalUtils.setActiveType(typeMapViaId[typeId]);
		
		tdvCy.center(tdvCy.$("#" + typeId));
	}

	this.ruleSelect = function(ruleId) {
		console.log(ruleId);
		var thisClick = new Date().getTime();
		isSingleClick = true;
		pleaseWait = true;

		// Un-Highlight previous selected Types
		var list = DesignCytoscapeUtils.grabTypesSelected();
		DesignCytoscapeUtils.selectUnselectTypes(list, tdvCy, false);
		// unhighlight the previous type if any in the graph

		
		GlobalUtils.setActiveRule( ruleMapViaId[ruleId] );
		// Highlight the selected Type in the Graph
		tdvCy.filter('node[id="rule' + ruleId + '"]').select();
		tdvCy.center(tdvCy.$("#rule" + ruleId));
	
		
	}
	
	this.repopulateDefaultPropertyValue = function(propertyTypeElement) {

		var propertyType = propertyTypeElement.value;

		var tdParent = propertyTypeElement.parentElement;
		var trParent = tdParent.parentElement;
		var tbodyParent = trParent.parentElement;

		for ( var key1 in tbodyParent.children) {
			var asd = tbodyParent.children[key1];
			for ( var key2 in asd.children) {
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
									+ today	+ "' defaultValue='"+ today	+ "' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/>";
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
		
				console.log('Get Preference for Type Successfully!');
				$('#console-log').append("<p style='color:green'>Get Preference for Type Successfully!</p>");
				$.each(data.preferences, function(key, value) {
					typeMapViaId[typeId].prefProperties[value.id] = value;
				});
			
		};

		var failFunction = function(xhr, status, error) {
			console.log('Get Preference Error: ' + xhr.status);
			CommonFctsLogical.HandlingErrorMSG(	"Setting Initial preferences failed" + xhr.status, "error");
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
			console.log('Get Preference for Type Successfully!');
			CommonFctsLogical.HandlingErrorMSG("Get Preference for Type Successfully!" , "success");
			typePreferenceProperties = data.preferences;
		};

		var failFunction = function(xhr, status, error) {
			console.log('Get Preference Error: ' + xhr.status);
			CommonFctsLogical.HandlingErrorMSG("Error in Get Preference:" + xhr.status, "error");

		};

		var apis = new PreferenceApis();
		apis.getAllPreferencesByTypeId(selectedMetaData, json, successFunction, failFunction);

		return typePreferenceProperties;

	};

	this.saveTypePreference = function(typeId, preferenceName, preferenceValue) {

		var typePreferenceProperties = this.getAllPreferenceForType(typeId);

		if (typePreferenceProperties.length == 0) {

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

		if (typePreferenceProperty != null) {
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
					console.log('Save Preference for Type Successfully!');
					CommonFctsLogical.HandlingErrorMSG( "Save Preference for Type Successfully!", "success");
//					var prefProperty = data.preferences[0];
//					
//					typeMapViaId[typeId].prefProperties[prefProperty.id].value = prefProperty.value;
					
					$.each(	data.preferences, function(key, value) {
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
				CommonFctsLogical.HandlingErrorMSG("Preference Not Found!" , "error");
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
				$.each(	data.preferences, function(key, value) {
						var prefProperty = value;
						typeMapViaId[typeId].prefProperties[prefProperty.id] = prefProperty;
				});
			};

			var failFunction = function(xhr, status, error) {
				console.log('Save Preference Error: ' + xhr.status);
				CommonFctsLogical.HandlingErrorMSG("Error in Save Preference:" 	+ xhr.status, "error");
			};

			var apis = new PreferenceApis();
			apis.updatePreferenceAndProperties(json, successFunction, failFunction);
			
		} else {
			console.log('Preference Not Found!');
			CommonFctsLogical.HandlingErrorMSG("Preference Not Found!" , "error");
		}

	};

	
//==============================================  NOT USED =====================	
	this.initTypeDesignBar = function(list, bar) {
//	console.log("Initializing the type bar for the Design View!!!");
//	var nb;
//	nb = Object.keys(list).length;
//	var inputs = '', nbNodes = 0;
//	if (nb != 0) {
//		inputs = "<div id='typesList'>";
//		inputs += "<span class='badge' id='totalNodes'>*(" + nb	+ ")</span>";
//		$.each( list, function(key, value) {
//			var color = GlobalUtils.getNodeColor(value);
//			if (value.classification == "node") {
//				inputs += "<span class='badge' style='color:black; background:"+ color + ";' id='"+ value.id
//						+ "' title='Select to view in Graph' onclick=\"(new DesignLogicalRenderer()).typeSelect('"+ value.id+ "')\"  >"
//						+ value.name+ "</span>";
//				nbNodes++;
//			}
//		});
//		inputs += "</div>";
//	} else {
//		inputs = "No type created Yet";
//	}
//	
//	if (nbNodes != 0) {
//		document.getElementById(bar).innerHTML = inputs;
//		GlobalHTMLUtils.buildButtonBar("typelist");
//		$("#totalNodes").empty();
//		$("#totalNodes").append("(" + nbNodes + ")");
//		
//	} else {
//		document.getElementById("typelist").style.display = "none";
//		document.getElementById("node_img").className = "btn btn-default btn-xs text-center";
//		document.getElementById("node_img").innerHTML = "<i class='fa fa-circle-o' aria-hidden='true'></i>Nodes";
//		document.getElementById("node_img").setAttribute("data-state", "hidden");	
//	}
}

    this.initPathDesignBar = function(list, bar) {
//	console.log("Initializing the path bar for the Design View!!!");
//	var nb = Object.keys(list).length;
//	var inputs = '', nbPaths = 0;
//	if (nb != 0) {
//		inputs = "<div id='pathsList'>";
//		inputs += "<span class='badge'id='totalPaths' >*(" + nb	+ ")</span>";
//		$.each( list, function(key, value) {
//			var color = GlobalUtils.getNodeColor(value);
//			if (value.classification == "path") {
//				inputs += "<span class='label label-info' style='color:black; background:"+ color+ ";'  id='"+ value.id
//						+ "' title='Select to view in Graph' onclick=\"(new DesignLogicalRenderer()).typeSelect('"+ value.id+ "')\"  >"
//						+ value.name+ "</span>";
//				nbPaths++;
//			}
//		});
//		inputs += "</div>";
//	} else {
//		inputs = "No Path nodes";
//	}
//
//	if (nbPaths > 0) {
//		document.getElementById(bar).innerHTML = inputs;
//		GlobalHTMLUtils.buildButtonBar("pathlist");
//		$("#totalPaths").empty();
//		$("#totalPaths").append("(" + nbPaths + ")");			
//		
//	} else {
//
//		document.getElementById("path_img").innerHTML = "<i class='fa fa-square-o' aria-hidden='true'></i>Paths";
//		document.getElementById("path_img").className = "btn btn-default btn-xs text-center";
//		document.getElementById("pathlist").style.display = "none";
//		document.getElementById("path_img").setAttribute("data-state", "hidden");		
//	}
}

    
    
    
    
    
    
    
    
    
    
    
//this.initSystemDesignBar = function(list, bar) {
//	console.log("Initializing the system bar for the Design View!!!");
//	var nb = Object.keys(list).length;
//
//	var inputs = '', nbSystems = 0;
//	if (nb != 0) {
//		inputs = "<div id='systemsList'>";
//		inputs += "<span class='badge'id='totalSystems' >*(" + nb+ ")</span>";
//		$.each( list, function(key, value) {
//			var color = GlobalUtils.getNodeColor(value);
//			if (value.classification == "system") {
//				inputs += "<span class='badge' style='color:black; background:"+ color+ ";'  id='"+ value.id
//						+ "' title='Select to view in Graph' onclick=\"(new DesignLogicalRenderer()).typeSelect('"
//						+ value.id+ "')\"  >"+ value.name+ "</span>";
//				nbSystems++;
//			}
//		});
//		inputs += "</div>";
//	} else {
//		inputs = "No System nodes";
//	}
//
//	if (nbSystems > 0) {
//		document.getElementById(bar).innerHTML = inputs;
//		GlobalHTMLUtils.buildButtonBar("systemlist");
//		$("#totalSystems").empty();
//		$("#totalSystems").append("(" + nbSystems + ")");
//		
//	} else {			
////		document.getElementById(bar).innerHTML = "&nbsp;";
////		document.getElementById("csystem_img").innerHTML = "&nbsp;";	
//		
//		document.getElementById("system_img").innerHTML = "Systems";
//		document.getElementById("system_img").className = "btn btn-defauly btn-xs text-center";
//		document.getElementById("systemlist").style.display = "none";
//		document.getElementById("system_img").setAttribute("data-state", "hidden");
//			
//	}
//}

//this.showTypePropertiesQtip = function(type) {
//	pleaseWait = true;
//	setTimeout(function() {
//		pleaseWait = false;
//		if (isSingleClick == false  && type == lastObj) {
//			console.log(type.data().classification);
//			listTypeIds[0] = type.data().id;
//			$('#typeForm').empty();
//			CommonFctsLogical.displayTypeProperties($('#typeForm'), typeMapViaId[type.data().id], true);
//		}
//
//	}, doubleClickThreshold + 10);
//};

// should be changed
//this.showTypePropertiesByTypeId = function(typeId) {
//	$('#typeForm').empty();
//	CommonFctsLogical.displayTypeProperties($('#typeForm'),	typeMapViaId[typeId], true);
//	GlobalUtils.setActiveType(typeMapViaId[typeId]);
//};
//	this.createConnection = function(connClassification) {
	//
//			if (connClassification == "parentchild") {
//				var list = [];
//				if (creatingConnection == false) {
//					creatingConnection = true;
//					ruleSelected = true; // to differentiate between single click and double click
//					createRuleClassification = connClassification;
//					// get all previously selected types and connections -- clear these
//					DesignCytoscapeUtils.getAllSelectedTypes();
//					if( listTypeIds.length >= 1){
//						var typesSelected = "[id='" + listTypeIds[0] + "']";
//						if( listTypeIds.length > 1 ) {
//							for ( var i = 1; i< listTypeIds.length;i++ ){
//							   typesSelected += ", [id='" + listTypeIds[i] + "']";
//							}
//						}
//						var allNodes = cy.filter('node');
//						allNodes.filter(typesSelected).unselect();
//					}
//					if( listLinkIds.length >= 1){
//						var linksSelected = "[id='rule" + listLinkIds[0] + "']";
//						if( listLinkIds.length > 1 ) {
//							for ( var i = 1; i< listLinkIds.length;i++ ){
//							   typesSelected += ", [id='rule" + listLinkIds[i] + "']";
//							}
//						}
//						var allNodes = cy.filter('node');
//						allNodes.filter(typesSelected).unselect();
//					}
//					
//					
//					GlobalUtils.cursor_wait();
//				} else {
//					creatingConnection = false;
//					list = DesignCytoscapeUtils.grabTypesSelected();
//					DesignCytoscapeUtils.selectUnselectTypes(list, tdvCy, false);
//					list = [];
//					ruleSelected = false;
//					originType = null;
//					destType = null;
//					mouseEventTime = new Date().getTime();
//					pleaseWait = true;
//					createRuleClassification = null;
//					GlobalUtils.cursor_clear();
//				}
	//
//			} else {
//				console.log("Wrong Connection Classification: "	+ connClassification);
//			}
	//
//		};
	
//	this.resetPage = function (){
//	$(".circleColor").css("border-color", "black");
//	$(".circle").css("border-color", "black");
//
//	listTypeIds = [];
//	listConnIds = [];
//
//	var list = DesignCytoscapeUtils.grabTypesSelected();
//	DesignCytoscapeUtils.selectUnselectTypes(list, tdvCy, false);
//	 tdvCy.elements().unselect();
//	$('#error_message').empty();
//	$("#active_type").empty();
//	currentColor = defaultNodeColor;
//	currentSize = defaultTypeSize;
//	currentIdxColor = 0;
//	currentIdxSize = 0;
//	$(".qtip").remove();
//	selectedElement = null;
//	list = [];
//	ruleSelected = false;
//	originType = null;
//	destType = null;
//	mouseEventTime = new Date().getTime();
//	pleaseWait = true;
//	createRuleClassification = null;
//	GlobalUtils.cursor_clear();
//	var divObj = $("#create_type");
//	if ($("#create_type").hasClass( 'ui-dialog-content')) {
//		$("#create_type").dialog('close');
//	}
//
//	(new DesignLogicalRenderer()).initTypeDesignBar( typeMapViaId, "typelist");
//	(new DesignLogicalRenderer()).initPathDesignBar( typeMapViaId, "pathlist");
//	(new DesignLogicalRenderer()).initSystemDesignBar( typeMapViaId, "systemlist");
//	(new DesignLogicalRenderer()).initDesignBar( ruleMapViaId, "linklist" );
//
//	activeType = null;
//}	
//    this.showAddType = function(){
//		CommonFctsLogical.openDialogForCreation("New Type", event);
//		$("#create_type").dialog("open");
//
//		if (selectedMetaData != null) {
//
//			if (tdvCy) {
//				list = DesignCytoscapeUtils.grabTypesSelected();
//				DesignCytoscapeUtils.selectUnselectTypes(list, tdvCy, false);
//			}
//
//			var form = document.createElement('form');
//			form.id = 'design_logical_create_type_form';
//
//			var label1 = document.createElement('label');
//			label1.innerHTML = 'Name: ';
//			var inputName = document.createElement('input');
//			inputName.id = 'add_type_name';
//			inputName.type = 'text';
//			inputName.name = 'name';
//			inputName.size = '6';
//			// inputName.required = 'required';
//			label1.appendChild(inputName);
//
//			var label2 = document.createElement('label');
//			label2.innerHTML = 'isRoot: ';
//			var inputIsRoot = document.createElement('input');
//			inputIsRoot.id = 'add_isRoot';
//			inputIsRoot.type = 'checkbox';
//			inputIsRoot.name = 'isRoot';
//			inputIsRoot.checked = 'checked';
//			label2.appendChild(inputIsRoot);
//
//			var label3 = document.createElement('label');
//			label3.innerHTML = 'Classification: ';
//
//			var inputClassification = document.createElement('select');
//			inputClassification.id = 'add_classification';
//			inputClassification.name = 'classification';
//
//			var inputClassificationOption1 = document.createElement('option');
//			inputClassificationOption1.value = "node";
//			inputClassificationOption1.innerHTML = "node";
//
//			var inputClassificationOption2 = document.createElement('option');
//			inputClassificationOption2.value = "path";
//			inputClassificationOption2.innerHTML = "path";
//			// inputClassification.appendChild(inputClassificationOption1);
//			// inputClassification.appendChild(inputClassificationOption2);
//
//			var inputClassificationOption3 = document.createElement('option');
//			inputClassificationOption3.value = "system";
//			inputClassificationOption3.innerHTML = "system";
//			if (typeNode == 1) {
//				inputClassification.appendChild(inputClassificationOption1);
//			} else if (typeNode == 2) {
//				inputClassification.appendChild(inputClassificationOption2);
//			} else if (typeNode == 3) {
//				inputClassification.appendChild(inputClassificationOption3);
//			}
//
//			label3.appendChild(inputClassification);
//
//			var label4 = document.createElement('label');
//			label4.innerHTML = 'Restriction Status: ';
//			var inputRestrictionStatus = document.createElement('select');
//			inputRestrictionStatus.id = 'add_restrictionStatus';
//			inputRestrictionStatus.name = 'restrictionStatus';
//			var inputRestrictionStatusOption1 = document
//					.createElement('option');
//			inputRestrictionStatusOption1.value = "";
//			inputRestrictionStatusOption1.innerHTML = "";
//			var inputRestrictionStatusOption2 = document
//					.createElement('option');
//			inputRestrictionStatusOption2.value = "ROOTONLY";
//			inputRestrictionStatusOption2.innerHTML = "Root Only";
//
//			inputRestrictionStatus.appendChild(inputRestrictionStatusOption1);
//			inputRestrictionStatus.appendChild(inputRestrictionStatusOption2);
//			label4.appendChild(inputRestrictionStatus);
//
//			label2.style.display = "none";
//			label3.style.display = "none";
//			label4.style.display = "none";
//
//			// hidden fields: classification and owner
//			var inputClassification = '<input id="add_classification" type="text" name="classification" value="node" style="visibility: hidden; position: absolute; top: -100px;">';
//			var inputOwner = '<input id="add_owner" type="text" name="owner" value="123" style="visibility: hidden; position: absolute; top: -100px;">';
//
//			// enable decorators for type
//			// hard code the id for geo view now
//			var geoActivator = "<strong style=\"display:none;\">Geo View</strong><label class=\"switch\" style=\"display:none;\"><input id=\"geo_activator\" name=\"geo_activator\" type=\"checkbox\" value=\"4\"><div class=\"slider round\"></div></label>";
//			// var geoActivator = "<strong>Geo View</strong>&nbsp;&nbsp;<label
//			// class=\"switch\"><input id=\"geo_activator\"
//			// name=\"geo_activator\" type=\"checkbox\" value=\"4\"><div
//			// class=\"slider round\"></div></label><br>";
//
//			var buttonCreate = "<input type='button' class='btn btn-primary btn-xs' value='Create Type' onclick='TypeUtils.saveAddTypeForm()'>";
//			var buttonCancel = "<input type='button' class='btn btn-primary btn-xs' value='Cancel' onclick='DesignLinkFctsUtils.cancelCreateLink()'>";
//
//			form.appendChild(label1);
//			form.innerHTML += '<br/>';
//			form.appendChild(label2);
//			// form.innerHTML += '<br/>';
//			form.appendChild(label3);
//			// form.innerHTML += '<br/>';
//			form.appendChild(label4);
//			// form.innerHTML += '<br/>';
//			form.innerHTML += inputClassification;
//			form.innerHTML += inputOwner;
//
//			form.innerHTML += geoActivator;
//			form.innerHTML += buttonCreate;
//			// form.innerHTML += buttonCancel;
//
//			$("#typecreateForm").empty();
//			$("#typecreateForm").append(form);
//
//		} else {
//			$('#console-log').append("<p style='color:red'>Can not create a TYPE, You must First select a Metadata.</p>");
//		}

//    }
//	this.addDCTObject = function( event ){
//		CommonFctsLogical.openDialogForCreation("New DCT Node", event);
//		$("#create_type").dialog("open");
//
//		if (selectedMetaData != null) {
//			$("#error_message").empty();
//			var input = "<form id='add_dct_form'>";
//			input += "<table border='1'>";
//			input += "<tr><th>Name</th><td><input type='text' id='add_dct_name' autofocus  name='add_dct_name' onfocus=\" this.value = ''; \"      onblur=\"if(this.value == '') { this.value = 'Enter a Value'; }\" /></td></tr>";
//			input += "<tr><td colspan='2'><input type='hidden' id='add_isRoot' name='add_isRoot' value='true' /></td></tr>";
//			input += "<tr align='center'><td colspan='2'><input type='button'  class='btn btn-primary btn-xs'     value='Add DCT' onclick='DesignLinkFctsUtils.saveDCT()'/>";
//			input += "<input type='button'  class='btn btn-primary btn-xs'  value='Cancel'  onclick='DesignLinkFctsUtils.cancelCreateDCT()' /></td></tr>";
//			input += "</table></form>";
//			input += "<div id='error_createDCT'></div>";
//
//			$("#typecreateForm").empty();
//			$("#typecreateForm").append(input);
//
//		} else {
//			CommonFctsLogical.HandlingErrorMSG(	"Can not create a DCT, You must First select a Metadata.",	"error");
//		}
//	}
//
//	this.addLink = function(event) {
//
//		CommonFctsLogical.openDialogForCreation("New Link", event);
//		$("#create_type").dialog("open");
//
//		if (selectedMetaData != null) {
//			$("#error_message").empty();
//			var input = "<form id='add_link_form'>";
//			input += "<table border='1'>";
//			input += "<tr><th>Name</th><td><input type='text' id='add_link_name'  autofocus name='add_link_name' onfocus=\" this.value = ''; \"      onblur=\"if(this.value == '') { this.value = 'Enter a Value'; }\" /></td></tr>";
//			input += "<tr><td colspan='2'><input type='hidden' id='add_classification' name='classification' value='link' /></td></tr>";
//			input += "<tr align='center'><td colspan='2'><input type='button'  class='btn btn-primary btn-xs'     value='Add Link' onclick='DesignLinkFctsUtils.saveLink()'/>";
//			input += "<input type='button'  class='btn btn-primary btn-xs'  value='Cancel'  onclick='DesignLinkFctsUtils.cancelCreateLink()' /></td></tr>";
//			input += "</table></form>";
//			input += "<div id='error_createlink'></div>";
//
//			$("#typecreateForm").empty();
//			$("#typecreateForm").append(input);
//
//		} else {
//			CommonFctsLogical.HandlingErrorMSG(	"Can not create a Link, You must First select a Metadata.",	"error");
//		}
//
//	}
//	
//	
}
