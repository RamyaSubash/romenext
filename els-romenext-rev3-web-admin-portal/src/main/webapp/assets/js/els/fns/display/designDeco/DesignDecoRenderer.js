/**
 * Desc:	Event handlers/functions for Design Decorator
 * Author:	Baya Benrachi
 * Date:	September 2017 
 * 
 * It divides the tab into two sections : headers and Mainbody
 *  headers  = Different bars are displayed based on user selection 
 *            * "TYPEBAR" list all Type nodes existing within the selected metadata
 *            * "NODEBAR" list all nodes existing within the metadata and repo
 *  Mainbody = based on user selection it will create the area of work where user selection 
 *             from the bars is dropped within other required information entered.
 * 
 *  Global variables used here are : 
 *      typeMapViaId     --- ruleMapViaId  -- connMap  -- edgeMap 
 *      selectedMetaData ---  
 */
function DesignDecoRenderer(){
	
	this.initView = function (){
		/**
		 * function used to initiate the main content of the tab
		 * It divides the tab into two divisions : headers and Mainbody
		 *  headers  = will contain
		 *            * "TYPEBAR" list all Type nodes existing within the selected metadata
		 *            * "NODEBAR" list all nodes existing within the metadata and repo
		 *  Mainbody = will contain all forms necessary for the creation of deco
		 *  
		 */
		active_deco = "Deco_design";
				
		var mainDiv = $('#DecoDesignView');
		mainDiv.empty();
		if (document.getElementById("headers") == undefined || document.getElementById("headers") == null) {	
			var bars = GlobalHTMLUtils.createHTMLEntity('div', 'headers', 'panel-heading', 'visible', 'block', '');	
			mainDiv.append(bars);
		}
		if (document.getElementById("tabCreationBody") == undefined || document.getElementById("tabCreationBody") == null) {		
		  var tabCreationBody = GlobalHTMLUtils.createHTMLEntity('div', 'tabCreationBody', 'cy', 'visible', 'block', '');		
		  mainDiv.append(tabCreationBody);
		}
		
	}

	this.checkInitialValues = function(){
		/**
		 * function used to prepare the global variables required for the process of deco creation
		 * Global variables used  are : 
		 *           1. typeMapViaId  ( all types details are loaded from the selected metadata)
		 *           2. ruleMapViaId  ( all rules details are loaded from the selected metadata)
		 *           3. connMapViaId  ( all relationships( Parent/children) are loaded )
		 *           4. nodeMap  ( all nodes related to types are loaded here )
		 *           5. edgeMap  ( all edges connecting the previous nodes are loaded here )
		 */
		if ( !selectedMetaData ) {
		    document.getElementById('path').innerHTML = "<p style='color:red'>No Metadata Selected  !!</p>";
			console.log(" No value for metadata ")
			return false;	
		} else {
			colorIndex = 0;
			typeMap = {}; typeMapViaId = {}; 
		    ruleMap = {}; ruleMapViaId = {}; 
		    connMap = {}; connMapViaId = {}; 
		    nodeMap = {}; nodeMapViaId = {};
		    edgeMap = {}; 
			GlobalUtils.loadAllTypeAndConnections();
			GlobalUtils.loadAllRules();	
			NodeUtils.loadAllNodesAndEdges();
			return true;			
		}			
	}

	this.startSelection = function( ){
		/**
		 * function used to display the main selection menu for the Design deco 
		 * Options are : 
		 *           1. tab Creation
		 *           2. Path Creation
		 * Prior to this, it will first perform an initialisation
		 *     1. set different divisions
		 *     2. check a metadata is selected
		 *     3. load different global variables
		 *     4. Display the options for selection
		 *   It will also set two global variables  needed to keep track of what objects are to be 
		 *   included (Tab info, Nodes dragged with their properties, etc..)
		 */
		( new DesignDecoRenderer()).initView();
		temp_tabObjects = [];
		tabObjects      = [];
		var load =  ( new DesignDecoRenderer()).checkInitialValues();
		if(load){
			// option to create a new Deco --- what to load   types; nodes, rules/connections?
			var barDiv = document.getElementById('headers');
			var inputs = '';
			    inputs += '<div style="border:solid 1px red;width:auto;"> ';
			    inputs += '<input type="radio" name="actionToDo" id="typeBar" value="typeBar"><label for="typeBar">Tab Creation </label>';
			    inputs += '<input type="radio" name="actionToDo" id="nodeBar" value="nodeBar"><label for="nodeBar">Path Creation</label>';
			    inputs += '<button type="button" style="" id="" onclick="( new DesignDecoRenderer()).createTab();">Load</button> '
			    inputs += '</div><div id="bar_error_msg"></div>';
			
			barDiv.innerHTML = inputs;
		}else {
			console.log(" Not able to load the Design deco View : Missing SelectedMetaData "); 
		}		
    	   	
    }
	
	this.initializeTypeBar = function() {
		/**
		 * function used to display in the typebarDeco ( headers division) the list of "Type nodes" loaded.
		 * information retrieved from the global variable : 
		 *           1. typeMapViaId  ( all types details for the selected metadata  are available  here)
		 *  in case no Type nodes are available user will be asked to go back to "DESIGN" view to create types
		 */
		var decoTypeBar = document.getElementById('typebarDeco');
		decoTypeBar.innerHTML = "";
				
		// find total number
		var totals = Object.keys( typeMapViaId ).length;		
		inputs = "<table id='typesList'><tr>";	
		if( totals > 0 ){			
			$.each( typeMapViaId, function(key, value){
				if(value.classification == 'node' ){			
  				 inputs += "<td ><button type='button' style='color:black; background:"+value.color+"' id='"+value.id+"'>"+value.name;
					inputs += "</button></td>";								
				}
			});
		}
		
		if( totals == 0 ) {
			inputs += "<td>Please Go to Design to create Type</td>";
			// !TODO include a link to DESIN ??? 
		}
	
		inputs +="</tr></table>";
		decoTypeBar.innerHTML = inputs;	
		
	};
	
    this.initializeNodeBar = function() {
    	/**
		 * function used to display in the nodebarDeco ( headers division) the list of "nodes" from neo4j  loaded.
		 * information retrieved from the global variable : 
		 *           1. nodeMap  ( all nodes details for the selected metadata are available here )
		 *  in case no nodes are available user will be asked to go back to create nodes in DISPLAY view
		 *  the bar is then made draggable.
		 *  Please note the node is identified by its property name -- if not available it will be identified by its TYPE
		 */
		var decoNodeBar = document.getElementById('nodebarDeco');
		decoNodeBar.innerHTML = "";
				
		// find total number
		var totals = Object.keys( nodeMap ).length;		
		inputs = "<table id='nodesList'><tr>";	
		if( totals > 0 ){			
			$.each( nodeMap, function(key, value){
				var name  = NodeUtils.findNameInst(value);
				if (!name) {
					name = value.name;
				}
				if(value.classification == 'node' ){			
             		inputs += "<td ><button type='button' style='color:black; background:"+value.color+"' id='"+key+"'>"+name;
					inputs += "</button></td>";								
				}
			});
		}
		
		if( totals == 0 ) {
			inputs += "<td>Please create nodes priory to create path </td>";
		}
	
		inputs +="</tr></table>";
		decoNodeBar.innerHTML = inputs;	
		this.barDraggable("node", "nodebarDeco", "listnodesForpath");
	};
			
	this.initializeConnBar = function() {
		/**
		 * function not used yet .
		 */  
		
		var decoNodeBar = document.getElementById('connbarDeco');
		decoNodeBar.innerHTML = "";
				
		// find total number
		var totals = Object.keys( typeMapViaId ).length;		
		inputs = "<table id='connectionsList'><tr>";	
		if( totals > 0 ){
			var color;
			$.each( connMapViaId, function(key, value){
				if(value.classification == 'parentchild' ){
					color = 'green';
				}else {
					color = 'back';
				}
				inputs += "<td ><button type='button' style='color:black; background:"+color+"' id='"+value.id+"'  onclick=\"\"  >"+value.name;
				inputs += "</button></td>";									
			});
		}
		
		if( totals == 0 ) {
			inputs += "<td>Please Go to Display to create Node</td>";
		}	
		inputs +="</tr></table>";
		decoNodeBar.innerHTML = inputs;		
	};
		
    this.createTab = function (){
    	/**
		 *   Function used to read the user selection from the main options 
		 *     1. create a Tab Deco
		 *          In this case, it will load the "TYPEBAR", make it draggable, 
		 *                        it will display the create "TABFROM" 
		 *     2. create a Path from nodes
		 *          In this case, it will load the "TYPEBAY" just for user Information
		 *                        it will load the "NODEBAR" from where user will select nodes, make it draggable
		 *                        it will display the create "PATHFORM" 
		 */   	
    	var optionSelected = $('input[name="actionToDo"]:checked').val();   	
    	
    	if(!optionSelected){
    		console.log(" No value selected  "+ optionSelected);
    		$("bar_error_msg").append("please select an option ");
    		return;
    	}
    	
    	var barDiv = document.getElementById('headers');
    	barDiv.innerHTML = '';
    	switch(optionSelected) {
		    case "typeBar":
		    	( new DesignDecoRenderer()).createFormTab();
		    	if ( document.getElementById('typebar') == undefined || document.getElementById('typebar') == null) {			
			    		GlobalHTMLUtils.createAppendHTMLEntity('header', 'typebarDeco' , 'typebar-subpanel-heading', 'visible', 'block', 'Type Bar', barDiv);
					}
				( new DesignDecoRenderer()).initializeTypeBar();
				( new DesignDecoRenderer()).barDraggable( "type", "typebarDeco", "listTypesFortabs");
		        break;
		    case "nodeBar":
		    	( new DesignDecoRenderer()).addPathForm();
		    	if ( document.getElementById('typebar') == undefined || document.getElementById('typebar') == null) {			
		    		GlobalHTMLUtils.createAppendHTMLEntity('header', 'typebarDeco' , 'typebar-subpanel-heading', 'visible', 'block', 'Type Bar', barDiv);
				}
			    ( new DesignDecoRenderer()).initializeTypeBar();
		    	
				if ( document.getElementById('nodebar') == undefined || document.getElementById('nodebar') == null) {	
					GlobalHTMLUtils.createAppendHTMLEntity('header', 'nodebarDeco' , 'nodebar-subpanel-heading', 'visible', 'block', 'Instance Bar', barDiv);
				}
				( new DesignDecoRenderer()).initializeNodeBar();    	
		        break;
		        
		    default:
		       ;
    	} 	 	          	 									
    }
  
    this.createFormTab = function(){
    	/**
		 *   Function used to display the "TABFORM" creation  
		 *   Elements required for the creation are : 
		 *      1. Tab text which will be displayed on the Tab label
		 *      2. Button label which will be displayed inside the form on the button
		 *      3. List of available actions which are loaded from the DB table (els_romenext_tabActions) 
		 *      4. An area where the nodes will be dropped
		 *      
		 *   This function make an ajax call to the servlet romenext/gui/split/tabAction which loads all tab Actions
		 *       
		 */   	    		   		   	
    	var tabCreationBody = document.getElementById('tabCreationBody');
    	$('#tabCreationBody').empty();
  		  	
    	var tabForm = '';
    	tabForm += '<table id="tabCreate">';
    	tabForm += '<tr><td>Tab Name: </td><td><input type="text" id="tabName"  value=""/> <div class="error" id="tabName_error"></div></td></tr>';
    	tabForm += '<tr><td>Button label: </td><td><input type="text" id="actionLabel"  value=""/><div class="error" id="actionLabel_error"></div></td></tr>';
    	tabForm += '<tr><td>Action:</td><td><div  id="tabActions" style="border:solid 1px red;">';
    	tabForm += '</div><div class="error" id="action_error"></div></td></tr>';
    	tabForm += '<tr><td colspan="2" style="background-color:lime">List Types: </td></tr>';
    	tabForm += '<tr><td colspan="2" ><div  id="listTypesFortabs" class="typesHolder" ><li> Drop a Type here <hr/></li></div><div class="error" id="listTypesFortabs_error"></div></td></tr>';
    	tabForm += '<tr><td colspan="2" ></td></tr>';
    	tabForm += '<tr><td colspan="2" ><input type="button" name="" id="" value="Create Tab"  onclick=\"( new DesignDecoRenderer()).addTab()\"/></td></tr>';
    	tabForm += '</table>';
    	tabForm += '<div id="error_msg"></div>';
    	 	
    	$('#tabCreationBody').append(tabForm)
    	// get Tab action from servlets 
    	var actions = DesignDecoUtils.loadTabActions(); 
    	actionTable =[];
		     $("#tabActions").empty();
		   	 var div = $("#tabActions");
		   	 var input = "";
		   	 $.each(actions, function(key,value) { 
		   		 input += "<label for='action'><input type='radio' name='action' id='"+value.id+"' value='"+value.actionLabel
		   		      +"' class='activeRadio'>"+value.actionLabel+"</label><br/>";
		   		 actionTable.push(value);
		   	 });
		   	div.append(input);	
    }
    
    
    this.addPathForm = function (  ){
    	/**
		 *   Function used to display the "PATHFORM" creation  
		 *   Elements required for the creation are : 
		 *      1. Tab text which will be displayed on the Tab label
		 *      2. Button label which will be displayed inside the form on the button
		 *      3. List of available actions which are loaded from the DB table (els_romenext_tabActions) 
		 *      4. An area where the nodes will be dropped
		 *      
		 *   This function make an ajax call to the servlet romenext/gui/split/tabAction which loads all tab Actions    
		 */  
    	var tabCreationBody = document.getElementById('tabCreationBody');
    	$('#tabCreationBody').empty(); 
    	
    	var pathForm = '';
	    pathForm += '<div id="pathForm"   >';
	    pathForm += 'Select Path type: <select id="selectPath"    >';
	    
//	    var options = '';
//	    var totals = Object.keys( typeMapViaId ).length;
//	    if( totals > 0 ){			
//			$.each( typeMapViaId, function(key, value){
//				if(value.classification == 'path' ){
//					options += '<option  value="pathId_'+value.id+'">'+value.name+'</option>';
//				}
//			})
//		}
	    var options = DesignDecoUtils.generateListOfPaths();
	    
	    if( options != ''){
	    	pathForm = pathForm + options;
		    pathForm += '</select><div class="error" id="selectPath_error"></div>';
		    pathForm += '<div id="pathProperties"></div><div id="pathProperties_error"></div>';
	//	    pathForm += '<label for="createPath">Create Path: </label><input type="checkbox" id="createPath" value="create" class=""><div class="error" id="createPath_error"></div>'; 
		    pathForm += '<div  id="listnodesForpath" class="nodesHolder" style="border:solid 1px green;"  >   <p> Drop nodes here to create path </p> ';
	        pathForm += '</div><div class="error" id="listnodesForpath_error"></div>';
		    pathForm += '<input type="button" name="" id="" value="Create Path"  onclick=\"( new DesignDecoRenderer()).addPath()\"/>';
		    pathForm += '</div>';
		    pathForm += '<div id="errorNode_msg"></div>';
		    tabCreationBody.innerHTML = pathForm; 
	    }else {
	    	 tabCreationBody.innerHTML = "<h3><font color='red'> No path available. Go back to Design to Create a Path TYPE</font></h3>";
	    }
	
	        	
    }
    
    this.addPath = function ( ){
    	// retrieve all info
    	var error =  false;
    	$('#errorNode_msg').empty();
    	var errorElements = new Array();
    	var result;
    	var node    = document.getElementById('selectPath');   	        	
    	if(node && node.value == "" ){
	    	result = "\nYou must select a Type path"; 
	        errorElements.push(result); 
	        DesignDecoUtils.showError(node, result); 
	    	error = true;
	    }
    	var pathIdSelected = node.value.slice(7);  // pathId_XXXX
    	   	
    	var tables= $('table[id^="tableNodeInfo_"]');
	    console.log("Number of tables are "+ tables.length);
	    if(tables.length == 0 ){
	    	$('#errorNode_msg').append("<p style='color:red'>Please select Nodes from the NodeBar .</p>");
	    	result = "\nYou must select Nodes from the Bar"; 
	        errorElements.push(result); 
	        node = document.getElementById('listnodesForpath');
	        DesignDecoUtils.showError(node, result); 
	    	error = true;
	    }
	    if(!error){
	    	var nodes = [], nodeUuid = {};
	    	L2 = tables.length;	            	    
       	    while(L2){
        	   temp2 = tables[--L2].id || '';
        	   if( temp2.indexOf("tableNodeInfo_") == 0 ){
        		   nodeUuid = temp2.slice(14);
        	       nodes[nodeUuid] = nodeMap[nodeUuid];
        	    }
    	    }
	    	// retrieved all nodes 
       	    
       	    DesignDecoUtils.savePath (pathIdSelected, nodes  );
       	    var mainDiv = $('#DecoDesignView');
		    mainDiv.empty();

		    ( new DesignDecoRenderer()).startSelection();		    	
	    }	
    }
          
    this.addTab  = function(){
    	// retrieve all info
    	var error =  false;
    	$('#error_msg').empty();
    	var errorElements = new Array();
    	var result;
    	var node ;
    	
    	
    	// get the tab name
    	node    = document.getElementById('tabName');   	        	
    	if(node && node.value == "" ){
	    	result = "\nYou must enter Tab name"; 
	        errorElements.push(result); 
	        DesignDecoUtils.showError(node, result); 
	    	error = true;
	    }
    	var tabName = node.value;
    	// get the tab action label
    	node   = document.getElementById('actionLabel');   	
    	if(node && node.value == "" ){
	    	result = "\nYou must enter Button Label for the Action"; 
	        errorElements.push(result); 
	        DesignDecoUtils.showError(node, result); 
	    	error = true;
	    }
    	var label = node.value;
    	
    	var actions = $("input[name='action']:checked");
	    if( actions.length > 0){
	    	actionSelected = actions.val();
	    	console.log(" value of id "+ actions[0].id);
	    	 console.log("Action selected is "+actionSelected);
	    }else {
	    	$('#error_msg').append("<p style='color:red'>Please select the Action.</p>");
	    	error = true;
	    }
	   
	    // retrieve the Types Tables added	   
	    var tables= $('table[id^="tableTypeInfo_"]');
	    console.log("Number of tables are "+ tables.length);
	    if(tables.length == 0 ){
	    	$('#error_msg').append("<p style='color:red'>Please select Types from the bar .</p>");
	    	result = "\nYou must select Types from the Bar"; 
	        errorElements.push(result); 
	        node = document.getElementById('listTypesFortabs');
	        DesignDecoUtils.showError(node, result); 
	    	error = true;
	    }
	    if(!error){
	        // Save Tab Info in DB  
            //===================================================
	    	// saving  the new Tab 
	    	var jsonData = {};
	    	jsonData["tabName"]        = tabName;
	    	jsonData["buttonLabel"]    = label;
	    	jsonData["tabAction"]      = actions[0].id;
	    	    	
	    	var tabId = DesignDecoUtils.createNewTab(jsonData);
	    	
	    	// Build List of Objects and their properties 
	    	//=========================================================
	    	for( var j=0; j< temp_tabObjects.length; j++ ){
	    		 var Id = temp_tabObjects[j].typeId;
	    	
	    		 var rows =  $('#tableTypeInfo_'+Id).find('tr[id^="prop_"]');    		 
	    		 var propIds = [], temp2, L2, propId = null;
         	     if(rows.length == 0 ){
         	    	$('#error_msg').append("<p style='color:red'>Type "+ typeMapViaId[Id].name+" does not have any properties .</p>");
         	     }else {
	            	    L2 = rows.length;	            	    
	            	    var totals = Object.keys( temp_tabObjects[j].propertiesIds ).length;
	            	    if(L2 !=  totals ){	
		            	    while(L2){
		            	    	temp2 = rows[--L2].id || '';
		            	    	if( temp2.indexOf("prop_") == 0 ){
		            	    		propId = temp2.slice(5);
		            	    		propIds[propId]= typeMapViaId[Id].typeProperties[propId];
		            	    	}
		            	    }
		            	    temp_tabObjects[j].propertiesIds = propIds;
	            	    }
	            	   
         	    }
         	    temp_tabObjects[j].tabtableIndex = tabId; 
	    	}
	    	    	    	
	    	console.log(temp_tabObjects);
	    	for(var i=0; i< temp_tabObjects.length; i++ ){
	    		tabObjects.push(temp_tabObjects[i]);
	    	}	 
	    	// Save All selected Objects in DB
	    	//=========================================================
	    	var jsonDataProps = {};
	    	for ( var j=0; j < tabObjects.length; j++ ){
	    		var element = tabObjects[j];
	    		jsonData = {};
	    		jsonData["name"] =  "type" ;
	    		jsonData["typeId"] =  element.typeId;
	    		jsonData["tabContainer"] = tabId ;
	    		var objectId = DesignDecoUtils.createObject(jsonData);
	    		// Save All  selected properties   for a given Object in DB
		    	//=========================================================
	    		var props = element.propertiesIds;
	    		props.forEach(function( value ){	
	    			jsonDataProps["romeTypeProperty"] = value.id ;
	    			jsonDataProps["tabObject"] =  objectId;
	    			jsonDataProps["tabContainer"] =  tabId;
	    			DesignDecoUtils.createObjectProperty(jsonDataProps);
	    			jsonDataProps = {};
	    		})
	    	}
	    	
		    var mainDiv = $('#DecoDesignView');
		    mainDiv.empty();
		    
		    // Find all info about selected CRUD option 
		    var tabAction = GlobalUtils.findTabAction(actions[0].id );
		    var script = tabAction.onclickScript;
		    
		    // if no error create the Tab and associate the script to run when the tab is clicked
		    if(!$.isEmptyObject(script) && tabId != null && tabName != null ){
		    	// generate the tab with all Info
		    	DesignDecoUtils.generatingNewTab(tabName, tabId, script );
			    
		    }else {
		    	console.log(" Cannot create the tab ");
		    }
	    	// Clear the Page and redisplay the options for user to select next Action
		    ( new DesignDecoRenderer()).startSelection();	
	    }
    	
    }
   
    
   
    this.addType = function( typeId){
    	 var workDiv = document.getElementById('listTypesFortabs');
    	 
    	if(!typeId ){
    		console.log(" no Type Id provided: cannot build create Instance table  "); 
    		return;
    	}
    	var tmpType = typeMapViaId[typeId];
    	// populate the Add INSTANCE FORM with properties	              
        var tableType = $('table#tableTypeInfo_'+typeId);
        if( tableType.length == 0 ){
        	$('#error_msg').empty();
        	var addTypeInfo = '';
        	var propsList   = '';
        	    addTypeInfo += '<table id="tableTypeInfo_' + typeId + '" border="4" style="border-color:'+tmpType.color+'">';
        	 
        	    addTypeInfo += '<tr><td colspan="2"><span class="badge" style="color:black; background:'+tmpType.color+'">'+tmpType.name+'</span></td>';
        	    addTypeInfo += '<td><button type="button" class="close" aria-label="Close"   onclick=\"( new DesignDecoRenderer()).deleteType('+typeId+')\"/><span aria-hidden="true">&times;</span></button></td></tr>';
        	    addTypeInfo += '<tr><td colspan="3">List of Properties:</td></tr>';
        	    var propIds = [];
        	    if(!$.isEmptyObject( tmpType.typeProperties	)){
            		$.each( tmpType.typeProperties, function( propId, tmpProp ) {
            			propsList  += '<tr id="prop_' +tmpProp.id+'">';
            			if(tmpProp.isMandatory){
            				propsList  += '<td><font color="red">'+ tmpProp.name + '</font></td>';
            			}else {
            				propsList  += '<td>'+ tmpProp.name + '</td>';
            			} 
            			if(tmpProp.isMandatory ){
            				propsList += '<td></td>';
      					}else {
            			    propsList  += '<td>'+tmpProp.propertyType+'</td><td><input type="button"   value="X" onclick=\"( new DesignDecoRenderer()).deleteProperty('+tmpProp.id+')\"/></td>';
      					}
            			propsList  += '</tr>';
            			propIds[tmpProp.id]= tmpProp;
            		});
        	    }
        	    
        	    addTypeInfo = addTypeInfo + propsList;
        	    addTypeInfo += '</table>';
        	    addTypeInfo += '<tr><td colspan="2">------------<td></tr>';
        	    if(workDiv.innerHTML == '') {
        	    	 workDiv.innerHTML = addTypeInfo ;    
        	    }else {
        	    	document.getElementById("listTypesFortabs").innerHTML+=   addTypeInfo;
        	    }
        	    var object = {};
        	        object.typeId         = typeId;
        	        object.propertiesIds  = propIds;
        	        temp_tabObjects.push(object);
        }else {
        	console.log("type already added ");
        	$('#error_msg').append("type already added ");
        }    	 	       	    
    }
    
    this.deleteType     = function ( typeId ){
    	// this function remove the selected Type from the Droppable area
    	document.getElementById('tableTypeInfo_'+typeId).remove();
    	var found = false;
    	for (var i=0; i < temp_tabObjects.length; i++){
    		if(temp_tabObjects[i].typeId == typeId ){
    			found = true;
    			break;
    		}
    	}
    	if(found){	
    		temp_tabObjects.splice(i,1);
    	}
    }
    
    this.deleteProperty = function ( propertyId ){
    		   
        var table = $('#prop_'+propertyId).closest('table');
        document.getElementById('prop_'+propertyId).remove();
    }
    
    this.deleteNode     = function ( typeId ){
    	// this function remove the selected Node from the Droppable area
    	document.getElementById('tableNodeInfo_'+typeId).remove();
    	var found = false;
    	for (var i=0; i < temp_tabObjects.length; i++){
    		if(temp_tabObjects[i].typeId == typeId ){
    			found = true;
    			break;
    		}
    	}
    	if(found){	
    		temp_tabObjects.splice(i,1);
    	}
    }
    
    this.deleteNodeProperty = function ( propertyId ){
    		   
        var table = $('#prop_'+propertyId).closest('table');
        document.getElementById('prop_'+propertyId).remove();
    }
    
    
    
	this.main = function(){
		( new DesignDecoRenderer()).startSelection();
		
	}
	//==========================================================================
	this.barDraggable = function( kind, bar, area ) {
		
		$(function() {
			console.log("making bar draggable");
			
//			$gallery = $( "#typebarDeco" );
			$gallery = $( "#"+bar );
			
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
		    		    
//		    var $workspace = $("#listTypesFortabs");
		    var $workspace = $("#"+area);
		    $workspace.droppable({
		    	accept: "td",
		        activeClass: "ui-state-highlight",
		        drop: function(event, ui) {
		        		
			          var name = ui.helper.children()[0].innerHTML; 
			          var id   = ui.helper.children()[0].id;		      
			          if( kind == 'type' ) {
			        	  (new DesignDecoRenderer()).addType(id); 
			          }else {
			        	  var workDiv = document.getElementById('listnodesForpath');
			        	  (new DesignDecoRenderer()).addNode(id, workDiv ); 
			          }
		        }
		    });
		   			
		});
		
	};
	
	 this.addNode = function( nodeUuid, workDiv ){
    	 var workDiv = document.getElementById('listnodesForpath');
    	 
    	if(!nodeUuid ){
    		console.log(" no node uuid provided:   "); 
    		return;
    	}
    	
    	var value = nodeMap[nodeUuid];
    	var typeId = value.typeId;
    	
    	  var tableType = $('table#tableNodeInfo_'+nodeUuid);
          if( tableType.length == 0 ){
        	  
        	 var inputProperties =  DesignDecoUtils.addNodeProperties ( nodeUuid, value, typeId ); 
//        	  var tempType = typeMapViaId[typeId];       	  
//  
//        	  $('#errorNode_msg').empty();
//        	  var tableViewInstProps = '<table border="2" id="tableNodeInfo_' + nodeUuid + '" style="border-color:'+tempType.color+'"  >';				
//      		  var inputpropViewRow = '';
//      		      inputpropViewRow += '<tr><td colspan="2"><span class="badge" style="color:black; background:'+tempType.color+'">'+tempType.name+'</span></td>';
//      		      inputpropViewRow += '<td><button type="button" class="close" aria-label="Close"   onclick=\"( new DesignDecoRenderer()).deleteNode('
//      		    	  +nodeUuid+')\"/><span aria-hidden="true">&times;</span></button></td></tr>';
//      		      inputpropViewRow += '<tr><td colspan="3">List of Properties:</td></tr>';
//      		
//      		      if($.isEmptyObject(tempType.typeProperties)){
//      		    	inputpropViewRow += '<tr><td colspan="3">NO properties were defined </td></tr>';			
//      		      }else {	
//	      				$.each( tempType.typeProperties, function( propId, tmpProp ) {								
//	      				    var propValue;				
//	      					// build a Row for each property 
//	      					// find the property value in nodeMap										
//	      					$.each(value.typeProperties, function ( nodeKey, nodeProperty){	
//	      						if( tmpProp.id == nodeProperty.id ){
//	      							propValue = nodeProperty.value;
//	      						}
//	      					});
//	      					inputpropViewRow += '<tr id="prop_' +tmpProp.id+'">' ;				
//	      					if(tmpProp.isMandatory){ 			
//	      						inputpropViewRow += '<td><font color="red">'+ tmpProp.name + ' ('+tmpProp.propertyType+')</font></td>' ;
//	      						}
//	      					else{  
//	      						inputpropViewRow += '<td>'+ tmpProp.name + ' ('+tmpProp.propertyType+')</td>';
//	      						}		      						
//	      					if( (propValue != null )&& (propValue != 'undefined' ) ){	
//	      						if (tmpProp.propertyType == "FILE") {
//	      							var mediaType = NodeUtils.convertNodeFilePropertyValueMediaType(propValue);
//	      							if (mediaType.includes("image/")) {
//	      								inputpropViewRow += '<td><img id="image_file_output_show_' + tmpProp.id + '" class="imgthumb"    src="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue) + '" height="50" width="50"></td>';
//	      							} else {
//	      								inputpropViewRow += '<td><a id="other_file_output_show_' + tmpProp.id + '"   href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue) + '" download="' + propValue.filename + '">' + propValue.filename + '</a></td>';
//	      							}
//	      						}else {
//	      								inputpropViewRow += '<td  width="100px" >'+ propValue +'</td>';
//	      						}
//	      					} else {
//	      						inputpropViewRow += '<td  width="100px"> NONE </td>';	
//	      					}
//	      					if(tmpProp.isMandatory ){
//	      						inputpropViewRow += '<td></td>';
//	      					}else {
//	   
//	      						inputpropViewRow += '<td><input type="button" class="nodeDeleteButton"  value="X" onclick=\"( new DesignDecoRenderer()).deleteNodeProperty('+tmpProp.id+')\"/></td>';
//	      					}
//	      					
//	      					inputpropViewRow += '</tr>';										
//	      				});
//      				
//      		}	
//
//      		    tableViewInstProps = tableViewInstProps + inputpropViewRow + "</table><br />";  
        	  
      		  if(workDiv.innerHTML == '') {
//      			 	    	 workDiv.innerHTML = tableViewInstProps ; 
      			 	    	 workDiv.innerHTML =  inputProperties
      		  }else {
//      			   	document.getElementById("listnodesForpath").innerHTML+=   tableViewInstProps;
      			   	
      				document.getElementById("listnodesForpath").innerHTML+=   inputProperties
      		  }
        	  
          }else {
        	console.log("Node already added ");
        	$('#errorNode_msg').append("Node already added ");
        } 
  
    }

	 


}