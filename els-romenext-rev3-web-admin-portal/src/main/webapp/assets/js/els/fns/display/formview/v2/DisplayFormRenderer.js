function DisplayFormRenderer(  ) {
	
	this.divholderId ;
	
	this.initBase = function( divId ) {
		console.log("divId is: "+ divId);
		this.divHolderId = divId;
		
	};
	
	this.initRenderer = function() {

	};

	this.initView = function() {
		var typeId = null;
		if ( !selectedMetaData ) {
			document.getElementById('path').innerHTML = "<p style='color:red'>No Metadata Selected  !!</p>";
			console.log(" No value for metadata ")
			return false;	
	    }else {
	    	document.getElementById('path').innerHTML = "<p style='color:blue'>Meatadata "+selectedMetaData+"</p>";
	    	if(listInstUuids[0] && !$.isEmptyObject(nodeMap )){
	    		typeId = nodeMap[listInstUuids[0]].typeId;
	    	}
	    } 
		active_deco = "form_instance";		
	// reset the Interface  -- Ensuring that only proper division will be displayed
		DisplayInterfaceUtils.resetInterface();
		curThreshold = 0;          
		// set up this 
		this.enableFormView();		
		this.structureDiv();
					
		// double check to see if the values have been initialized
		var loadInitial = this.checkInitialValues();
		
		if ( loadInitial ) {		
			this.initializeTypeBar();
			// add explanation for this page !TODO
			if( typeId ) {
				this.selectedType( typeId );
			}else {	
				// display tutorial
			}
		}	
	};
		
	this.structureDiv = function() {
		
		var DisplayFormDecoView = document.getElementById(activeDecos_BODY[ this.divHolderId ]);
		DisplayFormDecoView.style.display = "block";
		DisplayFormDecoView.innerHTML = '';
		
		// generate the TYPE bar	
		if (document.getElementById('form_typebar') == undefined || document.getElementById('form_typebar') == null) {			
			GlobalHTMLUtils.createAppendHTMLEntity('header', 'form_typebar' , 'panel-heading', 'visible', 'block', 'Type Bar', DisplayFormDecoView);
		}
					
		// generate for Button creating New Instance for A specific TYPE	
		if (document.getElementById('form_typebar_sub') == undefined || document.getElementById('form_typebar_sub') == null) {	
			GlobalHTMLUtils.createAppendHTMLEntity('header', 'form_typebar_sub' , 'typebar-sub-panel-heading', 'visible', 'block', '', DisplayFormDecoView);
		}
		
        if (document.getElementById('Header_search') == undefined || document.getElementById('Header_search') == null) {	
			GlobalHTMLUtils.createAppendHTMLEntity('header', 'Header_search' , 'panel-heading', 'visible', 'block', '', DisplayFormDecoView);	
		}
		
		// generate body Division 
		var bodyDiv ;
		if (document.getElementById('form_body') == undefined || document.getElementById('form_body') == null) {			
			GlobalHTMLUtils.createAppendHTMLEntity('div', 'form_body' , 'cy', 'visible', 'flex', '', DisplayFormDecoView);
			bodyDiv = $( "#form_body");
		}
		
		// generate the working space for adding new instances
		if(document.getElementById('work_addInstance') == undefined || document.getElementById('work_addInstance') == null) {		
			GlobalHTMLUtils.createAppendHTMLEntity('div', 'work_addInstance'  , 'work_addInstance', 'hidden', 'none', '', bodyDiv);			
		}	
	};
	
	this.enableFormView = function() {				
		var DisplayFormDecoView = document.getElementById(activeDecos_BODY[ this.divHolderId ]);		
		DisplayFormDecoView.style.display = "block";		
	};
			
	this.checkInitialValues = function() {		
		if ( !selectedMetaData ) {
			document.getElementById('path').innerHTML = "<p style='color:red'>No Metadata Selected  !!</p>";
			console.error(" No value for metadata ")
			return false;	
	    } else {
	//		Build typeMap/typeMapViaId - connMap/connMapViaId  -- ruleMap/ruleMapViaId
		    typeMap = {}; typeMapViaId = {}; 
		    ruleMap = {}; ruleMapViaId = {}; 
		    connMap = {}; connMapViaId = {}; 
		    nodeMap = {}; nodeMapViaId = {};
		    edgeMap = {}; 
			GlobalUtils.loadAllTypeAndConnections();
			GlobalUtils.loadAllRules();			
			return true;		
	    }
	};

	this.initializeTypeBar = function() {
		
		var displayTypeBar_v2 = document.getElementById('form_typebar');
		displayTypeBar_v2.innerHTML = "";

		// create the sub typebar for this type
		var typeBarSubDiv = $( "#form_typebar_sub" );
		
		if (document.getElementById('form_typebar_sub') == undefined || document.getElementById('form_typebar_sub') == null) {
			console.log(" division to Display Type bar does not exist");
			return;
		}
		
		// find total number
		var totals = Object.keys( typeMapViaId ).length;		
		inputs = "<table id='typesList'><tr>";	
		if( totals > 0 ){
			inputs += "<td><span class='badge'>*("+ totals +")</span></td>";  			
			$.each( typeMapViaId, function(key, value){
				if(value.classification != 'system'){			
					// add the TYPEBAR type
					inputs += "<td ><button type='button' style='color:black; background:"+value.color+"' id='"+value.id+"'  onclick=\"( new DisplayFormRenderer() ).selectedType('" + value.id + "')\"  >"+value.name;
					inputs += "</button></td>";
					
					// add the TYPEBAR SUB menu
					var checktypeBarSubDiv = $( "#form_typebar_sub_" + value.id );
				
					if (document.getElementById('form_typebar_sub_'+ value.id ) == undefined || document.getElementById('form_typebar_sub_'+ value.id ) == null) {	
						var inputSubBar = '';
						inputSubBar = "<table id='display_form_typebar_sub_table_" + value.id + "'><tr>";		
						inputSubBar += "<td class='create_icon' onclick=\"( new DisplayFormRenderer() ).createNode('" + value.id + "'); \"><span class='badge'>Create  New " + value.name + "  <img  id='img_create' title='Create New " + value.name + "'   src='"+img_path+ "createRes.png'></span></td>";
						inputSubBar += "<td  onclick=\"( new DisplayFormRenderer() ).listNodes('" + value.id + "'); \"><span class='badge'> List All " + value.name + "  <img  id='img_create' title='list All Nodes'   src='"+img_path+ "listAll.png'></span> </td>";
						inputSubBar += "<td  onclick=\"( new DisplayFormRenderer() ).searchNode('" + value.id + "'); \"><span class='badge'> Search For " + value.name + "  <img  id='img_create' title='Search a Node'   src='"+img_path+ "search.png'> </span> </td>"
						inputSubBar += "</tr>";	    
						inputSubBar +="</table>";

						GlobalHTMLUtils.createAppendHTMLEntity('div', 'form_typebar_sub_'+ value.id , 'form_typebar_sub_class', 'hidden', 'none', inputSubBar, typeBarSubDiv);
						checktypeBarSubDiv = $(  "#form_typebar_sub_" + value.id  );
					}	
				}
			});
		}
		
		if( totals == 0 ) {
			inputs += "<td>Please Go to Design to create Type</td>";
		}

		inputs +="</tr></table>";
		displayTypeBar_v2.innerHTML = inputs;		
	};
	
	this.createNode = function( selectedTypeId ) {
		if(!selectedTypeId){
			console.log(" no type given: cannot create Instance  "); 
			return;
		}
		console.log("Attempting to create :" + selectedTypeId );	
		// ie. Reset the listTypeId's and listConnId's
		GlobalUtils.clearGlobalSelected();		
		// assign the current 
		GlobalUtils.setGlobalTypeSelected( selectedTypeId );
		
		// hide all the others	
		$('#Header_search').empty();
		$('.pathFormCreate').remove();
		$('.work_addInstance').remove();
		
		historyNode = []; 
		curThreshold = 0;
					
		if(document.getElementById('work_addInstance_'+selectedTypeId) == undefined || document.getElementById('work_addInstance_'+selectedTypeId) == null) {		
			GlobalHTMLUtils.createAppendHTMLEntity('div', 'work_addInstance_'+selectedTypeId  , 'work_addInstance', 'Display', 'block', '', $('#form_body'));			
		}	
		
		var workDiv = $('#work_addInstance_'+selectedTypeId);
		// this division is used to show the Path  
		if(document.getElementById('pathFormCreate'+selectedTypeId) == undefined || document.getElementById('pathFormCreate'+selectedTypeId) == null) {		
			GlobalHTMLUtils.createAppendHTMLEntity('div', 'pathFormCreate'+selectedTypeId  , 'pathFormCreate', '', '', '', $('#form_body'));			
		}

		DisplayNewFormUtils.createNode(selectedTypeId, workDiv  );			
		DisplayInterfaceUtils.showDivision (('work_addInstance_'+selectedTypeId), ''  );
			
	}
			
//	this.selectedNode = function( nodeUuid ) {
//		if(!nodeUuid){
//			console.log(" no node Uuid provided: cannot display related info  "); 
//			return;
//		}
//		$('#Header_search').empty();	
////		$('div.node_detail').remove();
//		$('.work_addInstance').remove();
//		$('.pathFormCreate').remove();
//		var nodeDetails = nodeMap[nodeUuid];
//		
//		if(!nodeDetails){
//			console.log(" no node details  were Found " );
//			return;
//		}	
//		
//		if(  document.getElementById("node_detail_" +nodeUuid) == undefined ||  document.getElementById("node_detail_" +nodeUuid) == null ) {	
//			GlobalHTMLUtils.createAppendHTMLEntity('div', 'node_detail_'+nodeUuid, 'node_detail', 'hidden', 'none', '',  $( "#form_body"));						
//		}	
//		
//		if(document.getElementById('pathFormCreate'+nodeUuid) == undefined || document.getElementById('pathFormCreate'+nodeUuid) == null) {		
//			GlobalHTMLUtils.createAppendHTMLEntity('div', 'pathFormCreate'+nodeUuid  , 'pathFormCreate', 'visible', 'flex', '', $('#form_body'));			
//		}
//				
//		nodesToUpdate = [];                 // this will contains the list of nodes to update		
//		var instHolderDiv = document.getElementById("node_detail_" +nodeUuid);
//		
//	    var typeId        = 	nodeMap[nodeUuid].typeId;	    
//	    DisplayFormUtils.addDivsForANodeDetails (instHolderDiv, nodeUuid );
//		
//		var typeInfo = typeMapViaId[typeId];
//		this.displayViewEditProperties( typeInfo, nodeUuid,  nodeDetails  );			
//		nodesToUpdate.push({type: typeId  , node: nodeUuid});
//		
//		curThreshold = 0;
//		listAllNodes = [];
//		typeListFound  = [];	
//						
//		// USED THIS FOR ONLY REQUIRED 		 	
//		
//		DisplayNewFormUtils.findAllRelatedTypes  ( typeId.toString() );
//		
//		var nodes  =  DisplayNewFormUtils.filterRelatedNodes2(typeId,   typeListFound  );
//		console.log(nodes);
//		
//		 for ( var i = 0; i < nodes.length; i++){
//			 if( nodes[i].startType == typeId  ){
//				 nodes[i].startNodeUuid = nodeUuid;
//			 }
//		 }
//		
//		nodes  = nodes.concat( DisplayNewFormUtils.getNodesLinkedToNode(nodes, instHolderDiv)); 
//			
//        $(".form_inst").css("display", "block");
//        $(".form_inst").css("visibility", "visible");
//        DisplayInterfaceUtils.showDivision ("node_detail_", nodeUuid  );
//		
//		var footerView  = "<div id='footer_view'><br/> <input type='button' class='btn btn-primary btn-xs' id='GoUpdate'  value='Update "+typeMapViaId[typeId].name+"' onclick='( new DisplayFormRenderer() ).editNode(\"" + nodeUuid + "\")' /></div>" ;
//		$("#node_detail_" +nodeUuid).append( footerView);
//	}
	
	this.selectedType = function( selectedTypeId ) {
		if(!selectedTypeId){
			console.log(" no type selected  "); 
			return;
		}
		
		console.log("Attempting to show :" + selectedTypeId );		
		// note that the SELECTION of a type should indicate a FOCUS
		// ie. Reset the listTypeId's and listConnId's
		GlobalUtils.clearGlobalSelected();
		
		// assign the current 
		GlobalUtils.setGlobalTypeSelected( selectedTypeId );
		
		// empty, hide or remove any other divisions
		$('.work_addInstance').remove();
		$('.pathFormCreate').remove();
		$('div.form_typebar_sub_class').hide();	
		$('#Header_search').empty();
					
		DisplayInterfaceUtils.showDivision ("form_typebar_sub_", selectedTypeId  );	
	}
	
    this.listNodes = function (selectedTypeId ){
		
		// hide all the others					
		$('.work_addInstance').empty();
		$('.pathFormCreate').remove();
			
		var nodeInfoDiv = document.getElementById('Header_search');
		nodeInfoDiv.innerHTML = '';
		
		var selectionTxt = '<div> List based on:            ';							 
	 	  
		selectionTxt +=  '<button class="btn btn-primary" id="mandatory"  onclick="DisplayNewFormUtils.listAll( \'' + selectedTypeId + '\'  , \'mandatory\') " /> Mandatory Properties </button> ';		 
		selectionTxt +=  '<button class="btn btn-primary"  id="all"  onclick="DisplayNewFormUtils.listAll( \'' + selectedTypeId + '\'  ,  \'all\') " /> ALL Properties </button> ';
		 
		selectionTxt += '</div>' ; 		
		nodeInfoDiv.innerHTML +=  selectionTxt;
		 
		DisplayInterfaceUtils.showDivision ("Header_search", '' );	 
		DisplayNewFormUtils.listAll(selectedTypeId , 'mandatory');
		
	}
	
    this.editNode = function( nodeUuid ) {
	
	   if(!nodeUuid  ){
			console.log(" no node uuid  given "+ nodeUuid );
			return;
		}
		
		console.log("Attempting to edit :" + nodeUuid );			
	
		var prevFooterView = $('#footer_view');		
		if (prevFooterView != undefined || prevFooterView != null) {
			$('#footer_view').hide();
		}
		
		$(".form_inst").hide();			
		$(".form_inst_edit").css("display", "block");
		$(".form_inst_edit").css("visibility", "visible");
	
		var prevFooterEdit  = $('#footer_edit');
		if (prevFooterEdit != undefined || prevFooterEdit != null) {
			$('#footer_edit').remove();
		}
		var footerEdit  = "<div id='footer_edit'><br/> <input type='button' class='btn btn-primary btn-xs'  value='Update' onclick='( new DisplayFormRenderer() ).saveUpdateNode(\"" + nodeUuid + "\")' />";
		footerEdit += "<input type='reset' value='Cancel' onclick='DisplayFormUtils.updateNode_cancel(\"" + nodeUuid + "\")' /></div>";
		   		
		$("#node_detail_" +nodeUuid).append( footerEdit);		
   }
	   
    this.displayViewEditProperties = function( tempType, key ){
    	
    	if(!key  ){
			console.log(" no Node uuid  given "+ key );
			return;
		}   	
    	var value = nodeMap[key]; 	
    	if(!value){
    		console.log(" no  details given for the Node  "+ key);
			console.log(" Can not Display its properties");
			return;
    	}		
		var instViewDiv       = $( "#form_inst_"+key );
		    instViewDiv.html('');
		var instEditDiv       = $("#form_inst_edit_"+key );
		    instEditDiv.html('');			
		var tableViewInstProps = '<br /><table border="2"><tr><b><font color="blue">'+tempType.name+'  Details</font></b></tr>';
		var tableEditInstProps = '<br /><table border="2"><tr><b><font color="blue">'+tempType.name+'  Details</font></b></tr>';	
		var inputpropViewRow = '';
		    inputpropViewRow = '<tr>';	
		var listDates = [];
		if($.isEmptyObject(tempType.typeProperties)){
			tableViewInstProps = 'NO properties were defined ';
			tableEditInstProps = '';			
		}else {		
				$.each( tempType.typeProperties, function( pkey, pvalue ) {								
				    var inputpropEditRow ='';
				    var propValue, styling ='';			
					// build a Row for each property 
					// find the property value in nodeMap
					$.each( value.typeProperties, function( nodekey, nodevalue ) {	
						if( pkey == nodekey){
					    	propValue = nodevalue.value;
					    }
					});										
					inputpropEditRow = '<tr id="props">';
					if(pvalue.isMandatory){
						styling = 'style="background-color:yellow"';
						inputpropViewRow += '<th style="color:red;">' ;
						inputpropEditRow += '<th style="color:red;width:100px">' ;
						}
					else{  
						inputpropViewRow += '<th > ';
						inputpropEditRow += '<th width="100px"> ';
						}							
					inputpropViewRow +=   pvalue.name + ': </th>';
					inputpropEditRow +=  '<input type="text" name="propertyName" value="' + pvalue.name + '"  disabled /> <input type="hidden" name="propertyId" value="'+pvalue.id+'">';							
					if( (propValue != null )&& (propValue != 'undefined' ) ){				
						if (pvalue.propertyType == "FILE") {	
							// file for show
							var mediaType = NodeUtils.convertNodeFilePropertyValueMediaType(propValue);
							inputpropViewRow += '<td>';
							if (mediaType.includes("image/")) {
								inputpropViewRow += '<a target="_blank" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue)+'" class="imgthumb"><img   id="image_file_output_show_'+pvalue.id+'" src="'+NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue)+'" height="50" width="50"></a></td>';
							} else {
								inputpropViewRow += '<a id="other_file_output_show_'+pvalue.id+'" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue)+'" download="'+propValue.filename+'">' +propValue.filename+ '</a></td>';
							}	
							// file for old
							inputpropEditRow += '<input id="value_'+key+'" type="file" name ="value" value="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue)+'" disabled style="display:none;"/>';
							if (mediaType.includes("image/")) {
								inputpropEditRow += '<a target="_blank" href="'+NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue)+'" class="imgthumb"><img id="image_file_output_fix_'+pvalue.id + '" src="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue)+'" height="50" width="50" style="display:none;"></a>';
							} else {
								inputpropEditRow += '<a id="other_file_output_fix_' + pvalue.id + '" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue)+'" style="display:none;"></a>';
							}		
							
							
							// file for new
							inputpropEditRow += '</td><td><input id="newValue_'+key+'" type="file" name ="newValue" value="'+NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue)+'" onchange="GlobalUtils.showFile(event, \''+pvalue.id+'\')"/>';
							if (mediaType.includes("image/")) {
								inputpropEditRow += '<a  target="_blank" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue) + '" id="show_image_file_output_' +  pvalue.id + '"  ><img id="image_file_output_' + pvalue.id + '" src="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue) + '" height="50" width="50" style="display:;"></a>'
								 				 + '<a id="other_file_output_' + pvalue.id + '" style="display:none;"></a>';
							} else {
								inputpropEditRow += '<img id="image_file_output_' + pvalue.id + '" height="50" width="50" style="display:none;">'
				 				 				 + '<a id="other_file_output_' + pvalue.id + '" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue) + '" style="display:;">' + propValue.filename + '</a>';
							}				
						} else {
							inputpropViewRow += '<td  >'+ propValue +'</td>';
							inputpropEditRow +=  '<input type="hidden" name ="value"  id="value_'+key+'"     value="'+ propValue +'"  />'  ;
							if(pvalue.propertyType == 'DATE'  ){
								
								inputpropEditRow +=  '</td><td><input type="text"   name ="newValue"  id= "'+key+'_date_'+pvalue.id+'"    value="'+ propValue +'"  />';
								listDates.push(pvalue.id );							
							}else {
								inputpropEditRow +=  '</td><td><input type="text"  id="newValue_'+key+'"    name ="newValue"  value="'+ propValue +'"  />';
							}
						}	
					} else {
						inputpropViewRow += '<td  width="100px" style="background-color:grey;"  > NONE </td>';
						inputpropEditRow +=  '<input type="hidden" name ="value"   id="value_'+key+'"   value=""  />'  ;
						if(pvalue.propertyType == 'DATE'  ){
							inputpropEditRow +=  '</td><td><input type="text"  '+styling+'  name ="newValue"  id= "'+key+'_date_'+pvalue.id+'"    value=""  />';
							listDates.push(pvalue.id );						
						}else if (pvalue.propertyType == "FILE") {
							inputpropEditRow += '</td><td><input id="newValue_'+key+'" type="file" name ="newValue" value="" onchange="GlobalUtils.showFile(event, \'' + pvalue.id + '\')" style="background-color:yellow"/>'
			  				 + '<a href="" id="show_image_file_output_' + pvalue.id + '"><img id="image_file_output_' + pvalue.id + '" height="50" width="50" style="display:none;"></a>'
			  				 + '<a id="other_file_output_' + pvalue.id + '" style="display:none;"></a>';
						}else {
							inputpropEditRow +=  '</td><td><input type="text"   id="newValue_'+key+'" '+styling+'   name ="newValue"  value=""  />';
						}	
					}						
					inputpropViewRow += "</tr>"
					inputpropEditRow +=  '<input type="hidden" name="propertyType" value="' + pvalue.propertyType + '">('+pvalue.propertyType+')</td></tr>';								
					tableEditInstProps += inputpropEditRow;	
				});		
				tableViewInstProps += inputpropViewRow;
				tableViewInstProps = tableViewInstProps + "</table>";
				tableEditInstProps = tableEditInstProps + "</table>";			
		}
		instViewDiv.append(tableViewInstProps);		
		instEditDiv.append(tableEditInstProps);	
				
		for (var i=0; i< listDates.length; i++){
        	$("#"+key+"_date_"+listDates[i]).datepicker({
        		changeMonth: true,
      	        changeYear: true,
        		dateFormat: "yy-mm-dd",
        		yearRange : "1950:"+(new Date).getFullYear()
        	});
        }

	}
		
    this.saveUpdateNode = function ( nodeId ){   	
    	if(!nodeId  ){
			console.log(" no  uuid  given "+ nodeId );
			return;
		}	    	
		if(nodesToUpdate){
			console.log( nodesToUpdate);
			for( var ind =0; ind < nodesToUpdate.length; ind++){
				
				var nodeUuid       = nodesToUpdate[ind].node;
				var typeId         = nodeMap[nodeUuid].typeId;
				if(!nodeUuid || !typeId){
					console.log(" Error in the process of saving  typeId found  "+ typeId + " nodeUuid found "+ nodeUuid);
					return;
				}
				
				var jsonData = {}, nodeProperties = [], newProperties = [];
				var property = {}, newproperty = {}, foundError=false;			
				var sysProperties = [];

				jsonData["type"] = typeId.toString();
				
				// push the uuid to sysProperties	
				property =  NodeUtils.createSysJson(nodeUuid );
				sysProperties.push(property);
				
				property = {}; mewproperty = {};
				
				var instEditDiv = $("#form_inst_edit_" + nodeUuid );	
				// grab the values of node properties from the form
				$(instEditDiv).find('tr#props').each(function (i, propsTr){	
					$(propsTr).find(':input').each(function(i,field){
					     if( ( field.type  == 'text')||(field.type == 'hidden')|| (field.type == 'file')){
					 		console.log(field.name + " value found is :"+field.value);
					 		
					 		if (field.name == 'value')  {   
								  property[field.name] = field.value  
							} else if (field.name == 'newValue') { 
								if (field.type === 'file') {
									newproperty['value'] = field.files[0];
								} else {
									newproperty['value'] = field.value;
								}
							} else { 
								property [field.name] = field.value;
								newproperty[field.name] = field.value;
							} 
					     }			
					     
					});	
					console.log(" found this property "+ property + " in this node "+ nodeUuid );
					
					if (newproperty.propertyType === "FILE") {
						if( newproperty.value ){
							var file = newproperty.value;
							newproperty.value = {};
							if (file.type.includes("image/")) {
								newproperty.value.file = document.getElementById('image_file_output_' + newproperty.propertyId).src.replace("data:" + file.type + ";base64,", "");
							} else {
								newproperty.value.file = document.getElementById('other_file_output_' + newproperty.propertyId).href.replace("data:" + file.type + ";base64,", "");
							}
							newproperty.value.filename = file.name;
						}
					}
					
					// verify if property has value	
					var isPropMand =  NodeUtils.findPropInType(property.propertyId, jsonData['type']);
					if(isPropMand){ // mandatory property
						if(newproperty.value){
							
							newProperties.push(newproperty);
                		  	if(property.value  && property.value != 'undefined'){ nodeProperties.push(property);}	                    		  	
				         } else {
				        	  $(propsTr).append('error- missing Value');
		            		  console.log("Missing Value for Mandatory property : "+ property.propertyName);
		                      foundError= true;
		                 }		                    	  
					}else {   // not mandatory
						if(newproperty.value){  // user entered a new value
							
							newProperties.push(newproperty);
			                if(property.value && property.value != 'undefined' ){ nodeProperties.push(property);}				        			
						}else {  // if there was no value and user did not enter a value don't push it
//							  user may have deleted old value  
							if (property.value && property.value!= 'undefined' ){
								       newproperty.value = null;
								       nodeProperties.push(property);
								       newProperties.push(newproperty);
							}			
						}
		        	}
				    property = {}; newproperty ={};
				});		
				
				if(!foundError ) {
					console.log(" Retrieved Properties are : "+nodeProperties);
					console.log(" The new ones are :"+ newProperties);	
					jsonData.sysProperties = sysProperties;	 
					jsonData.properties    = nodeProperties;
					jsonData.newProperties = newProperties;
							
					instEditDiv.hide();
						
					var doneFunction = function( data ) {
						if($.isEmptyObject(data) && S.isEmptyObject(data.nodes)){
							console.log(" no node returned for save update Node Info ");
							return;
						}
						
						console.log("Node Updated "+data.nodes[0].type);		     
						// Save the updated properties 											
						var key = NodeUtils.findUUID (data.nodes[0]);					
						nodeMap[key].typeProperties   = data.nodes[0].typeProperties;													
			 				
					};
						
					var failFunction = function( xhr, status, error ) {
						console.log("Update Node Properties Error: "+ xhr.status);
						 $('#console-log').append("Update Node Properties Error: "+ xhr.status);
					};
					
					var api  = new NodeApis();
					api.updateNode(jsonData, doneFunction, failFunction );	
					}										
			}
		}else {
			// error 
		}
		
		( new DisplayFormRenderer() ).selectedNode(nodeId);
				
	};

	this.searchNode = function (  selectedTypeId ){
		
			// hide all the others		
//			$('div.node_detail').hide();			
			$('.work_addInstance').empty();
			
			var nodeInfoDiv = document.getElementById('Header_search');
			nodeInfoDiv.innerHTML = '';
			console.log(" typeId is : "+ selectedTypeId);
			curThreshold = 0;
			listAllNodes = [];
			typeListFound  = [];	
			
			DisplayNewFormUtils.findAllTypesRelated( selectedTypeId );  
						
			var searchTxt = '<div> Search based on:    ';
								
			 $.each(typeListFound, function( key, value ) {
				 var typeRelId   = typeMapViaId[value].id;
				 var typeRelName = typeMapViaId[value].name;
				 searchTxt +=  '<input type="radio" id='+typeRelId+' name="listChoice"  onclick="DisplayFormUtils.SearchType('+typeRelId+ ') " /><span class="badge badge-info ">'+typeRelName  +'</span>  '; 
			 });
			 
			 searchTxt += '</div>' ; 		
			 nodeInfoDiv.innerHTML +=  searchTxt;			 
			 
		}

	

}

	

		

	
	
	
	



	


