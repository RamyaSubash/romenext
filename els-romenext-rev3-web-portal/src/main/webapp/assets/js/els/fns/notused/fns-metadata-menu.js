//$(document).ready(function() { 
//	onLoadretrieveAllMetadata();
//});
//
//
///** Code copied from fns-metadata.js. Due to refactor, all the codes have to be modified. The modification is still incomplete currently **/
///** To avoid conflict, please do not include fns-metadata.js and fns-metadata-menu.js in the same jsp file at this moment!! **/
//
//function showAddMetadataDialog() {
//	
//	var dlg_width = 400, dlg_height = 50, dlg_offset_x = 300, dlg_margin_top = 300;
//	var dialog = $('#dialog');
//	
//	dialog.dialog({
//		width : dlg_width,
//		autoOpen : false,
//		position : {
//			my : "center center",
//			at : "center center",
//			of : "#mainblock"
//		},
//		buttons : {
//			"Add Metadata" : function() {
//				saveNewMetadata(dialog.find("form"));
//			},
//			Cancel : function() {
//				dialog.dialog("close");
//			}
//		}
//	});
//	
//	if (!hasMoved && dialog.dialog("instance")) {
//		grayOut(true);
//		
//		var formHeader = "<form id='addMetadataDialog'>", inputs = "";
//		
//		// Name field
//		inputs += "<label>Name: <input type='text' name='name' required/></label><br />";
//		 
//		// <!-- Allow form submission with keyboard without duplicating the dialog button -->
//		var formFooter = "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px;' />";
//
//		dialog.dialog("option", "title", "Add Metadata");
//		dialog[0].innerHTML = formHeader + inputs + formFooter;
//		dialog.dialog("open");
//	}
//
//    dialog.find("form").on("submit", function(event) {
//    	event.preventDefault();
//    	saveNewMetadata(this);
//    });
//
//}
//
//function saveNewMetadata(form) {
//	
//	var jsonData = {};
//	
//	$(form).find(':input').each(function (i, field) {
//		if ((field.type != 'submit') && (field.type != 'radio') || field.checked) {
//			if (field.name == 'name') {
//				jsonData[field.name] = field.value;
//			}
//		}
//	});
//
//	console.log(jsonData);
//	
//	$.ajax({
//		type : 'POST',
//		url : apiBaseUrl + 'metadata/',
//		dataType : 'json',
//		data : JSON.stringify(jsonData),
//		contentType : 'application/json',
//		cache : false,
//		success : function(data) {
//			$('#console-log')
//					.append("<p style='color:blue'>Metadata successfully created</p>");
//			console.log("Metadata create success. data: "+ data.name);
//		},
//		error : function(xhr, ajaxOptions, error) {
//			alert(xhr.status);
//			console.log(' Save Metadata Error : '
//					+ xhr.responseText);
//		}
//	}).done(function(data) {
//		console.log("Metadata created ");
//		updateMetadataList(data);
//		//onLoadretrieveAllMetadata();
//	});
//	
//	$(form).parent().dialog("close" );
//	
//}
//
////==============================================================================
////====================********* ADD Repo *********==========================
////==============================================================================
//
//function showAddRepoDialog() {
//	
//	var dlg_width = 400, dlg_height = 50, dlg_offset_x = 300, dlg_margin_top = 300;
//	var dialog = $('#dialog');
//	
//	dialog.dialog({
//		width : dlg_width,
//		autoOpen : false,
//		position : {
//			my : "center center",
//			at : "center center",
//			of : "#mainblock"
//		},
//		buttons : {
//			"Add Repo" : function() {
//				saveNewRepo(dialog.find("form"));
//			},
//			Cancel : function() {
//				dialog.dialog("close");
//			}
//		}
//	});
//	
//	if (!hasMoved && dialog.dialog("instance")) {
//		grayOut(true);
//		
//		var formHeader = "<form id='addRepoDialog'>", inputs = "";
//		
//		var metadataDropdownList = "";
//		$.each(metadataMap, function(i, metadata) {
//			metadataDropdownList += "<option  value='" + metadata.id + "'>" + metadata.name + "</option>";
//		});
//		
//		var neo4jServerDropdownList = "";
//		$.each(neo4jServerMap, function(i, neo4jServer) {
//			neo4jServerDropdownList += "<option  value='" + neo4jServer.id + "'>" + neo4jServer.url + "</option>";
//		});
//		
//		// Name field
//		inputs += "<label>Name: <input type='text' name='name' required/></label><br />";
//		
//		// Metadata field
//		inputs += "<div id='metadataName'><label> Select Metadata: <select name='metadataId'>";
//		inputs += metadataDropdownList;
//		inputs += "</select></label></div>";
//		
//		// Neo4j instance field
//		inputs += "<div id='neo4jServerName'><label> Select Neo4j Server: <select name='neo4jInstanceId'>";
//		inputs += neo4jServerDropdownList;
//		inputs += "</select></label></div>";
//		
//		// <!-- Allow form submission with keyboard without duplicating the dialog button -->
//		var formFooter = "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px;' />";
//
//		dialog.dialog("option", "title", "Add Metadata");
//		dialog[0].innerHTML = formHeader + inputs + formFooter;
//		dialog.dialog("open");
//	}
//
//    dialog.find("form").on("submit", function(event) {
//    	event.preventDefault();
//    	saveNewMetadata(this);
//    });
//
//}
//
//function saveNewRepo(form) {
//	
//	var jsonData = {};
//	
//	$(form).find(':input').each(function (i, field) {
//		if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
//			jsonData[field.name] = field.value;
//		}
//	});
//	
//	console.log(jsonData);
//	
//	$.ajax({
//		type : 'POST',
//		url : apiBaseUrl + 'metadata/repo/',
//		dataType : 'json',
//		data : JSON.stringify(jsonData),
//		contentType : 'application/json',
//		cache : false,
//		success : function(data) {
//			console.log("Repo create success. data: "+data);
//		},
//		error : function(xhr, ajaxOptions, error) {
//			alert(xhr.status);
//			console.log('Error Repo not created: ' + xhr.responseText);
//			
//		}
//	}).done(function(data) {
//		console.log("Repo created ");
//		updateRepoList(data);
//		autoSelectRepoAfterCreation(data.repo.id);
//		//onLoadretrieveAllMetadata();
//	});
//	
//	$(form).parent().dialog( "close" );
//	
//}
//
//function autoSelectRepoAfterCreation(repoId) {
//
//	var metaDataId = repoId;
//	document.getElementById("metadata").value = repoId;
//	
//	$('#console-log').append("MetaData Repo changed to : "+ selectedMetaData+" Workspace view Refreshed<br/>");
//
//	if(selectedMetaData == metaDataId){    
//	}else { 
//		
//		selectedMetaData = metaDataId;
////		resetRepo();
//		
//	}
//
//}
//
////==============================================================================
//
//function updateMetadataList(data) {
//	
//	$('#metadata').empty();
//	metadataMap[data.metadata.name] = data.metadata;
//		
//	$.each(metadataMap, function(key, value){
//			$('#metadata').append("<optgroup style='color: black' id='"+value.id+"' label='"+value.name+"'>");
//		$.each(value.repos, function(key2,value2){
//				$('#metadata').append("<option  value='"+value2.id+"' style='color: green'>"+value2.name+"</option>");	
//			});
//		$('#metadata').append("</optgroup>");
//	});	
//		
//}
//
//function updateRepoList(data) {
//	
//	$('#metadata').empty();
//	
//	$.each(metadataMap, function(key, value){
//		
//		if (value.id == data.metadataId) {
//			newRepo = {};
//			newRepo.id = data.repo.id;
//			newRepo.name = data.repo.name;
//			metadataMap[value.name].repos.push(newRepo);
//		}
//		
//		$('#metadata').append("<optgroup style='color: black' id='"+value.id+"' label='"+value.name+"'>");
//		
//		$.each(value.repos, function(key2,value2){
//			$('#metadata').append("<option  value='"+value2.id+"' style='color: green'>"+value2.name+"</option>");	
//		});
//		
//		$('#metadata').append("</optgroup>");
//	
//	});	
//		
//}
//
//
////############################### NEW ###############################
////========== When User select Repo/MetaData =========================
////=========  Change Type workspace content ==========================
//
//$('#metadata').on('click',  function(e) {
//	var metaDataId = document.getElementById("metadata").value;
//	
//	$('#console-log').append("MetaData Repo changed to : "+ selectedMetaData+" Workspace view Refreshed<br/>");
//
//	selectedMetaData = metaDataId;
//	
//});
////=================================================================================
//function resetRepo (){
//	//  Repo has changed either by selection or new creation
//	//  reset all global used variables
//	emptyAll();
//	emptyAllInst();
//	if($("#grid-types").css('visibility') == 'visible'){$("#grid-types").css({'visibility':'hidden'});}
//	if($("#grid-instances").css('visibility') == 'visible'){$("#grid-instances").css({'visibility':'hidden'});}
//	typeMap = {};       // hold  all types
//	ruleMap = {};       // hold  all rules    --- to be removed later 
//	connMap = {};       // hold  all connections in the typegraph
//	
//	nodeMap = {};       // hold  all nodes of the graph instances
//	edgeMap = {};       // hold  all edges of the graph instances
//	typeMapInst = {};   // hold  the slected type 
//	nodeMapInst = {};
//	NodeInst  ={};
//	loadInst = false;
//	loadInstNode = false;
//	NodeSelected = null;
//	
//	
//	decos = null;
//	// reset the comon used variables
//	nametype=null;      // hold the name of the selected type
//	curType= null;
//	nameconn = null;    // hold the name pf the selected connection
//	ruleSelected=null;  // hold the name of the selected rule 
//	colorIndex = 0;     // used for selecting the color from the array of colors
//	historyNode = [];
//
//	initTypeGraph();    // load the types & connections for the selected Repo if any and build the typeMap and connMap;
//	                    // will also initialise the typeBar for the Design view
//	loadAllrules();     // retrieve  all rules  and build ruleMap  and initialise the ruleBar for the design view
//	if(topLevelTab == "instRelViewTab") {
//        initInstanceGraph();    // load nodes  & edges  for the selected Repo;  build the nodeMap and edgeMap;
//        initRuleBarInst('ruleInstBar'); 
//        generateGeoView();
//        }
//	console.log("Initial value "+selecteddecorator);
//	switchDeco (selecteddecorator);	
//}