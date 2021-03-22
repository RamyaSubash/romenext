/**
 * 
 */
function DesignLinkFctsUtils() {

};



    DesignLinkFctsUtils.assignLinkToType = function(event  ){
	   $("#error_message").empty();
	   if (selectedElement != null) {
			
			// some type are selected  -- issue an error message or clear ALL
	   }else {
		   // if no links created first create a link

			var listlinks = GlobalRuleUtils.createAllLinkList();
			if ($.isEmptyObject(listlinks)) {
				CommonFctsLogical.HandlingErrorMSG(	"No links available -- Create a link", "error");
				return;
			} else {
					
				$("#bottom_help").empty();
				DesignLinkFctsUtils.generateLinkWin ();
				document.getElementById("bottom_help").style.display    = 'block';
				document.getElementById("bottom_help").style.visibility = 'visible';
				
				ruleSelected = true; 
				createRuleClassification = "link";
				
				originType = null;
				destType = null;
				linkSelected = null;
				
				GlobalUtils.cursor_wait();
				document.getElementById("assign_link").className = "btn btn-default text-center";
			    $("#besideMouse").html("<span class='badge'>Select Link</span>");
			    ConnectionPropertyUtils.mouseText(event);	
			    
			    var eles = tdvCy.nodes().filter("[classification != 'link']");
			    eles.unselectify();
			    eles.addClass('semitransp');
				
			}		
	   } 
    }

	DesignLinkFctsUtils.saveAssignLinkToType = function() {
	
		var jsonData = {};
	
		console.log("values for assigning link to Type are :");
		console.log(" Link is "+ linkSelected + " Origin Type is : "+originType + " destination type is " + destType);
		if ( linkSelected == null || originType == null ||destType == null ){
			Error_handlingUtils.consolePrint("Operation assign Type to link Can not be achieved","error");
			CommonFctsLogical.HandlingErrorMSG("Operation assign Type to link Can not be achieved", "error");
			return;
		}
				
		jsonData["ruleId"] = linkSelected;
		jsonData["origId"] = originType;
		jsonData["destId"] = destType;
		jsonData["namespace"] = loggedInUserName;
		jsonData["groupname"] = userGroup.name;
		jsonData["grouphost"] = userGroup.host;
	
		console.log(jsonData)
		var successFunction = function(data) {
			if (!$.isEmptyObject(data)) {
				DesignSavingFcts.clearSelection();
				Error_handlingUtils.consolePrint("Assign Link To Type successful","success");
				CommonFctsLogical.HandlingErrorMSG( "Assign Type to Link successfull", "success");
                var newEdge = DesignCytoscapeUtils.formatNewConnection(data);
				ConnectionPropertyUtils.updateConnGraph(tdvCy, newEdge);	
				DesignSavingFcts.clearSelection();
				tdvCy.filter("edge[id='connection" + data.id + "']").select();
			}

		};

		var failFunction = function(xhr, status, error) {
			console.log('Error Link assign not done: ' + xhr.status);
			$("#typecreateForm").append("error in assign node to link -- see log");
			CommonFctsLogical.HandlingErrorMSG("Error Link not created","error");
		};

		var apis = new ConnectionApis();
		apis.assignLinkToTypeAPI(jsonData, successFunction, failFunction);
		
			
	
	}
	
	DesignLinkFctsUtils.formatUpdatedConnections = function() {
	
		var elements = [];
		for ( var key in connMapViaId) {
	
			var conn = connMapViaId[key];
			connMapViaId[conn.id].cyDisplay = '';
			connMap[conn.name].cyDisplay = '';
			var label;
			if (conn.classification == 'link') {
				label = conn.rule;
			} else {
				label = conn.name;
			}
	
			var element = {
				group : 'edges',
				data : {
					id : 'connection' + conn.id,
					connId : conn.id,
					source : conn.source.toString(),
					target : conn.target.toString(),
					name : label,
					rule : conn.rule,
					classification : conn.classification,
					origin : conn.origin,
					destination : conn.destination,
					minRel : conn.minRel.toString(),
					maxRel : conn.maxRel.toString(),
					ruleId : conn.ruleId,
					cyDisplay : ''
				}
			};
			elements.push(element);
	
		}
		return elements;
	}
	
	DesignLinkFctsUtils.formatTypeLinked = function() {
	
		for ( var key in connMapViaId) {
	
			var conn = connMapViaId[key];
			if (conn.classification == 'link' && conn.source == conn.target) {
				var typeId = conn.source;
	
				var elemt = tdvCy.$('#' + typeId);
				elemt.style({
					'border-style' : 'dashed'
				});
	
			}
	
		}
	}
	
	DesignLinkFctsUtils.cancelCreateLink = function( ){
		$("#typecreateForm").empty();
		var divObj = $("#create_type");
		if ($("#create_type").hasClass( 'ui-dialog-content')) {
			$("#create_type").dialog('close');
		}
	}
   
    DesignLinkFctsUtils.generateLinkWin = function( ){

    	var ele = GlobalHTMLUtils.createHTMLEntity( 'div', 'createLK', 'offer', 'visible', 'block', '');
    	var inputs  = "";
    	    inputs += "<h5>Assign a  Link</h5>";
    	    inputs += "<input type='checkbox' id='dis_link_bt' disabled/><label id='dis_link' >Link </label><br/>";
    	    inputs += "<input type='checkbox' id='dis_typeS_bt' disabled/><label id='dis_typeS' >Start Type </label><br/>";
    	    inputs += "<input type='checkbox' id='dis_typeE_bt' disabled/><label id='dis_typeE' >End  Type  </label><br/>";
    	
    	ele.innerHTML= inputs;
    	$("#bottom_help").append(ele);    	   
    }
    

//	DesignLinkFctsUtils.saveLink = function() {
//
//		var linkName = null;
//		if ($('#add_link_name').val()) {
//			linkName = $('#add_link_name').val();
//		} else {
//			linkName = "LK" + Date.now();
//		}
//	
//		var classification = $('#add_classification').val();
//		var jsonData = {};
//		jsonData["name"] = linkName;
//		jsonData["ruleclassification"] = classification;
//		
//		jsonData["namespace"] = loggedInUserName;
//		jsonData["grouphost"] = userGroup.host;
//		jsonData["groupname"] = userGroup.name;
//	
//		console.log(jsonData);
//	
//		var successFunction = function(data) {
//			Error_handlingUtils.consolePrint("Link creation successful","success");
//			CommonFctsLogical.HandlingErrorMSG("Create  Link successfull","success");
//			
//			if (!ruleMapViaId[data.id]) {
//				ruleMapViaId[data.id] = data;
//			}
//			var element = DesignCytoscapeUtils.formatNewLink(data);
//			var newElement = tdvCy.add(element);
//			tdvCy.filter('node[name="' + data.name + '"]').data(data);
//			DesignCytoscapeUtils.attachTypeClickActions(newElement.filter('node'));
//			(new DesignLogicalRenderer()).initDesignBar( ruleMapViaId ,"linklist" );
//			
//			$('#typecreateForm').empty();
//			$("#create_type").dialog("close");
//			
//		
//			listTypeIds[0]=null;
//			tdvCy.filter("node[id='#rule" + data.id + "']").select();
//			
//	
//		};
//	
//		var failFunction = function(xhr, status, error) {
//			console.log('Error Link not created: ' + xhr.status);
//			CommonFctsLogical.HandlingErrorMSG("Error Link not created", "error");
//		};
//	
//		var apis = new ConnectionApis();
//		apis.saveNewLink(selectedMetaData, jsonData, successFunction, failFunction);
//	
//	};

//	DesignLinkFctsUtils.saveDCT = function() {
//		var typeId = null;
//		var decoProps = predefinedSelectedDecoPropertiesMap;
//		var dctName = null;
//		if ($('#add_dct_name').val()) {
//			dctName = $('#add_dct_name').val();
//		} else {
//			dctName = "DCT" + Date.now();
//		}
//	
//		var dctIsRoot = $('#add_isRoot').val();
//		
//		var jsonData = {};
//		jsonData["name"] = dctName;
//		jsonData["isRoot"] = dctIsRoot;
//		jsonData["decorators"] = [];
//		
//		jsonData["namespace"] = loggedInUserName;
//		jsonData["grouphost"] = userGroup.host;
//		jsonData["groupname"] = userGroup.name;
//	
//		console.log(jsonData);
//	
//		var successFunction = function(data) {
//			if (!$.isEmptyObject(data)) {
//				console.log("DCT creation successful");
//				CommonFctsLogical.HandlingErrorMSG("DCT Created successfully","success");
//				
//				var tmpObj = data;
//				typeMapViaId[tmpObj.id] = tmpObj;
//				data.color = defaultNodeColor;
//				data.size  = defaultTypeSize;	
//				var element = DesignCytoscapeUtils.formatNewType(data);
//				var newElement = tdvCy.add(element);
//				tdvCy.filter('node[name="' + data.name + '"]').data(data);
//				DesignCytoscapeUtils.attachTypeClickActions(newElement.filter('node'));
//				
//				$('#typecreateForm').empty();
//				$("#create_type").dialog("close");
//				typeId = tmpObj.id;
//			}
//	
//		};
//	
//		var failFunction = function(xhr, status, error) {
//			console.log('Error DTC not created: ' + xhr.status);
//			CommonFctsLogical.HandlingErrorMSG("Error DTC not created", "error");
//		};
//	
//		var apis = new DCTApis();
//		apis.saveNewDCT( jsonData, successFunction, failFunction);
//	
//		
//		if (typeId != null) {
//			var preferenceList = [];
//			var preference1 = {
//								name : "size",
//								propertyType : "STRING",
//								defaultValue : "0"
//			};
//			var preference2 = {
//								name : "color",
//								propertyType : "STRING",
//								defaultValue : "0"
//			};
//			preferenceList.push(preference1);
//			preferenceList.push(preference2);
//	
//			var dlRenderer = new DesignLogicalRenderer();
//			dlRenderer.addPreferenceToTypeBatch(typeId, preferenceList);
//		}
//	
//		tdvCy.filter("node[id='" + typeId + "']").select();
//	
//		
//	};
	
//	DesignLinkFctsUtils.assignNodeToLink = function(form) {
//		
//		var jsonData = {}, typeProperties = [], property = {}, typename, typeId, initcolor;
//		var typeId = $("#node_selected").val();
//		var linkId = $("#link_selected").val();
//		console.log("values Read are :" + typeId + " and " + linkId);
//		if (typeId && linkId) {
//			jsonData["typeId"] = Number(typeId);
//			jsonData["ruleId"] = Number(linkId);
//			jsonData["namespace"] = loggedInUserName;
//			jsonData["groupname"] = userGroup.name;
//			jsonData["grouphost"] = userGroup.host;
//	
//			console.log(jsonData)
//			var successFunction = function(data) {
//				if (!$.isEmptyObject(data)) {
//					console.log("Link assign successful");
//	
//					// successfull");
//					CommonFctsLogical.HandlingErrorMSG( "Assign Type to Link successfull", "success");
//	
//					$("#typecreateForm").empty();
//					$("#create_type").dialog("close");
//					var edges = tdvCy.edges();
//					console.log(edges);
//					tdvCy.remove(edges);
//					GlobalUtils.loadAllConnections();
//					var newEdges = DesignLinkFctsUtils.formatUpdatedConnections(jsonData.connections);
//					console.log(newEdges);
//					tdvCy.add(newEdges);
//					DesignCytoscapeUtils.attachRuleConnClickActions(tdvCy.edges());
//	
//				}
//	
//			};
//	
//			var failFunction = function(xhr, status, error) {
//				console.log('Error Link assign not done: ' + xhr.status);
//				$("#typecreateForm").append("error in assign node to link -- see log");
//				CommonFctsLogical.HandlingErrorMSG("Error Link not created","error");
//			};
//	
//			var apis = new ConnectionApis();
//			apis.assignTypeTolink(jsonData, successFunction, failFunction);
//		} else {
//			console.log("error");
//			CommonFctsLogical.HandlingErrorMSG("Operation assign Type to link Can not be achieved", "error");
//		}
//	
//	}
	
	
	