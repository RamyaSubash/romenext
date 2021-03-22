//---------- API URLs ----------
var getAllTypeRootUrl  = apiBaseUrl + 'type/root/all/'
, getChildrenTypeUrl = apiBaseUrl +'type/child/all/' 
, getAllRulesUrl = apiBaseUrl + 'rule/all/'
, getRulesOfClassificationUrl = apiBaseUrl + 'rule/classification/'
, getAllConnectionsByRuleUrl = apiBaseUrl + 'connection/rule/'
, getNodeOfTypeUrl = apiBaseUrl + "node/all/"


function removeNodeFromData (data, node) {
	var i = data.indexOf(node);
	data.splice(i, 1);
};

/**
 * Type Tree Section
 */


function highlightNodesOfType(type) {
	console.log("We want to highlight all nodes of the type");
};

function attachHighlightNodeFn(){
	var anchors = $(".jstree-anchor");
	anchors.click(function() {
		highlightNodesOfType(this);
	});
};
	
function attachLoadNodeFn() {
	// Load all instance nodes for the selected type tree folder
	typeTree.on('select_node.jstree', function(e) {
		typeTree.jstree('get_selected', 'true').forEach(function (selectedNode) {
            // we need to swtich based on what we view we are on
            // what is active tab?
            var topLevelTab = $("#gvTab li.active > a" ).attr("id");
            
			if (topLevelTab == "instRelViewTab") {
				$.ajax({
					url: getNodeOfTypeUrl + selectedNode.text +'/metadata/' + selectedMetaData,
					method: "GET",
					dataType: "json",
					success: function (jsonData) {
						console.log(JSON.stringify(jsonData));
						
						irvCy = initTypeConnGraph(irvCy, "irvCy", formatResponse(jsonData));
					}
				});
			}
		});
	});
};

function setupTypeTreeNodes(node) {
	// Add to typeTreeNodeMap if not already existed
	if(!typeTreeNodeMap[node.id]) {
		typeTreeNodeMap[node.id] = node;
	}
	
	node.id = "type" + node.id
	node.text = node.name;
	node.children = true;
};


function customTypeMenu(data){
	// The default set of all items
    var items = {
        "Create": {
            "separator_before": false,
            "separator_after": false,
            "label": "Create New Type",
            "action": function () { 
            	                     showAddTypeDialog();
                                      }
                    },
        "Add Properties": {
            "separator_before": false,
            "separator_after": false,
            "label": "Add Type Properties",
            "action": function () { 
            						showAddTypePropertiesDialog();
                                      }
                    },             
        "Update": {
            "separator_before": false,
            "separator_after": false,
            "label": "Update Type & Properties",
            "action": function (data) { 
						            	var inst = $.jstree.reference(data.reference),
										obj = inst.get_node(data.reference);
										var id = obj.id.slice(4);
										var node = retrieveTypeProperties(id, 'update');
                                      }
                 }, 
        "View": {
            "separator_before": false,
            "separator_after": false,
            "label": "View Type Properties",
            "action": function (data) { 
            						var inst = $.jstree.reference(data.reference),
            						obj = inst.get_node(data.reference);
            						var id = obj.id.slice(4);
            						console.log(obj);
            						var node = retrieveTypeProperties(id, 'view');
                                     }
        }
    };
    return items;
}

function initTypeTree() {
	
	typeTree = $("#typeTree");
	typeTree.jstree("refresh");
	
	$("#typeTree").jstree({
		"core" : {
			"data": {
				"url":  function(node) {
					return node.id === '#' ? getAllTypeRootUrl + 'metadata/'+ selectedMetaData : getChildrenTypeUrl + node.text +'/metadata/' + selectedMetaData;
				},
				"type": "GET",
				"dataType": "json",
				"success": function (jsonArray) {
					console.log("Entered TypeTree setup, jsonArray: "+ JSON.stringify(jsonArray));
					jsonArray.forEach(function (node) {
						setupTypeTreeNodes(node);
					});
				},
				"error": function (err) {
					console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
				}					
			},
			"multiple" : false,
		},
  		"plugins": ["contextmenu", "types", "ui"],
		 contextmenu : { 'items' : customTypeMenu }
	});

	// Hide the tree until it is fully loaded
	
	typeTree.on("load_all.jstree", function() {$(".panel-content").css("visibility", "visible");});
// typeTree.jstree("load_all", "");
	
	attachLoadNodeFn();
};



//********************************************************
//AJAX CAll to load all Rules and Connections
//No parameter are passed
//********************************************************
var setupRuleTreeNodes = function (node) {
	// Add to ruleTreeNodeMap if not already existed
	if(!ruleTreeNodeMap[node.id]) {
		ruleTreeNodeMap[node.id] = node;
	}
	// If node has type property, it is a connection node
	if (node.type) {
		node.id = "conn" + node.id
		node.text = node.origin + " - " + node.destination;
		node.children = false;
	} else {
		node.id = "rule" + node.id
		node.text = node.name;
		node.children = true;
	}
};

function initRuleTree(ruleTree, classification) {
	ruleTree.jstree("refresh");
	ruleTree.jstree({
		"core" : {
			"data": {
				"url":  function(node) {
                    return node.id === '#' ? getRulesOfClassificationUrl + classification + '/metadata/' + selectedMetaData : getAllConnectionsByRuleUrl + node.text + '/metadata/' + selectedMetaData;
                },
				"type": "GET",
				"dataType": "json",
				"success": function (jsonArray) {
					console.log("Entered ruleTree setup, jsonArray: " + JSON.stringify(jsonArray));
					
					jsonArray.forEach(function (node) {
						setupRuleTreeNodes(node);
						
						if (node.romeClass == "RULE") {
							ruleList.push(node.name);
						}
					});
				},
				"error": function (err) {
					console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
				}					
			},
		},
		"multiple" : false,
		"plugins": [ "contextmenu", "types", "ui"],
		contextmenu : {
			"items" : function (data) {
 				return { 
 					 "Create" : {
 						label: "Create New Rule",
 						action: function() {
 							                showAddRuleDialog();
 											}
 					 			},
 					 "Add Propeties": {
 			            "separator_before": false,
 			            "separator_after": false,
 			            "label": "Add Rule Properties",
 			            "action": function () { 
 			            	 				showAddRulePropertiesDialog();
 			                                      }
 			                    },           
 					 "Update" : {
 						label: "Update Rule & Properties",
 						action: function(data) {
				 							var inst = $.jstree.reference(data.reference),
				 					        obj = inst.get_node(data.reference);
				 							console.log(obj.text);
				 							showUpdateRuleDialog(obj);
 						}
 					},
					"View" : {
						label: "View Rule Details",
						action: function(data) {
											var inst = $.jstree.reference(data.reference),
											obj = inst.get_node(data.reference);
		            						var node = retrieveRuleProperties(obj.text, 'view');

						}
					}

				}
			}
		}
    });
};

//$("#typeTree").bind("load_node.jstree", function (e, data) { if(data.rslt.status) { data.inst.open_node(data.rslt.obj); } });

