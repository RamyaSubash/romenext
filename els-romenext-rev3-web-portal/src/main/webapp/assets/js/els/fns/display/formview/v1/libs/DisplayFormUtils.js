function DisplayFormUtils() {
	
};


DisplayFormUtils.addAllRightFormDivs = function( instHolderDiv , key ) {
	
	/**
	 * THIS IS FOR THE INFO OF THE INSTANCE
	 */
	var checkInstanceDiv = $( "#form_inst_" + key );
	
	if( checkInstanceDiv == null || checkInstanceDiv.length == 0 ) {
		// no div found, create it
		var newInstViewDiv = document.createElement('div');
		newInstViewDiv.id = 'form_inst_'  + key;
		newInstViewDiv.className = 'form_inst';
		newInstViewDiv.style.visibility = "hidden";
		newInstViewDiv.style.display = "none";

		instHolderDiv.append( newInstViewDiv );
		
		checkInstanceDiv = $( "#form_inst_" + key );
	}
	
	/**
	 * THIS IS FOR THE EDITING OF  INSTANCE PROPERTIES
	 */
	var checkInstanceEditDiv = $( "#form_inst_edit_" + key );
	
	if( checkInstanceEditDiv == null || checkInstanceEditDiv.length == 0 ) {
		// no div found, create it
		var newInstEditdDiv = document.createElement('div');
		newInstEditdDiv.id = 'form_inst_edit_'  + key;
		newInstEditdDiv.className = 'form_inst_edit';
		newInstEditdDiv.style.visibility = "hidden";
		newInstEditdDiv.style.display = "none";
	
		instHolderDiv.append( newInstEditdDiv );
		
		checkInstanceEditDiv = $( "#form_inst_edit_" + key );
	}
		
	/**
	 * THIS IS FOR THE CHILDREN OF THE INSTANCE
	 */
	var checkInstanceChildDiv = $( "#form_inst_children_" + key );
	
	if( checkInstanceChildDiv == null || checkInstanceChildDiv.length == 0 ) {
		// no div found, create it
		var newInstChilddDiv = document.createElement('div');
		newInstChilddDiv.id = 'form_inst_children_'  + key;
		newInstChilddDiv.className = 'form_inst_children';
		newInstChilddDiv.style.visibility = "hidden";
		newInstChilddDiv.style.display = "none";
	
		instHolderDiv.append( newInstChilddDiv );
		
		checkInstanceChildDiv = $( "#form_inst_children_" + key );
	}
	
	/**
	 * THIS IS FOR THE PARENT OF THE INSTANCE
	 */
	
	var checkInstanceParDiv = $( "#form_inst_parent_" + key );
	
	if( checkInstanceParDiv == null || checkInstanceParDiv.length == 0 ) {
		// no div found, create it
		var newInstParDiv = document.createElement('div');
		newInstParDiv.id = 'form_inst_parent_'  + key;
		newInstParDiv.className = 'form_inst_parent';
		newInstParDiv.style.visibility = "hidden";
		newInstParDiv.style.display = "none";

		instHolderDiv.append( newInstParDiv );
		
		checkInstanceParDiv = $( "#form_inst_parent_" + key );
	}
	
	/**
	 * THIS IS FOR THE SIBLING OF THE INSTANCE
	 */
	
	var checkInstanceSibDiv = $( "#form_inst_sibling_" + key );
	
	if( checkInstanceSibDiv == null || checkInstanceSibDiv.length == 0 ) {
		// no div found, create it
		var newInstSibDiv = document.createElement('div');
		newInstSibDiv.id = 'form_inst_sibling_'  + key;
		newInstSibDiv.className = 'form_inst_sibling';
		newInstSibDiv.style.visibility = "hidden";
		newInstSibDiv.style.display = "none";

		instHolderDiv.append( newInstSibDiv );
		
		checkInstanceSibDiv = $( "#form_inst_sibling_" + key );
	}
	/**
	 * THIS IS FOR LINKING TO ANOTHER EXISTING INSTANCE
	 */
	
	var checkInstanceLinktoDiv = $( "#form_inst_linkto_" + key );
	
	if( checkInstanceLinktoDiv == null || checkInstanceLinktoDiv.length == 0 ) {
		// no div found, create it
		var newInstLinktoDiv = document.createElement('div');
		newInstLinktoDiv.id = 'form_inst_linkto_'  + key;
		newInstLinktoDiv.className = 'form_inst_linkto';
		newInstLinktoDiv.style.visibility = "hidden";
		newInstLinktoDiv.style.display = "none";

		instHolderDiv.append( newInstLinktoDiv );
		
		checkInstanceLinktoDiv = $( "#form_inst_linkto_" + key );
	}
	
	/**
	 * THIS IS FOR CONNECTING  TO ANOTHER EXISTING INSTANCE
	 */
	
	var checkInstanceConnecttoDiv = $( "#form_inst_connectto_" + key );
	
	if( checkInstanceConnecttoDiv == null || checkInstanceConnecttoDiv.length == 0 ) {
		// no div found, create it
		var newInstConnecttoDiv = document.createElement('div');
		newInstConnecttoDiv.id = 'form_inst_connectto_'  + key;
		newInstConnecttoDiv.className = 'form_inst_connectto';
		newInstConnecttoDiv.style.visibility = "hidden";
		newInstConnecttoDiv.style.display = "none";

		instHolderDiv.append( newInstConnecttoDiv );
		
		checkInstanceConnecttoDiv = $( "#form_inst_connectto_" + key );
	}
		
}

//    ADD sub-Division for a Type to Hold the ADD INSTANCE FORM  && List of Instances
DisplayFormUtils.addFormDivsLeft = function( body, instHolderDivName , typeId ) {
	
	var instHolderDiv = $( "#" + instHolderDivName );	
	
	if( instHolderDiv == null || instHolderDiv.length == 0 ) {
		// found no div so create it
		var newInstHolderDiv = document.createElement('div');
		newInstHolderDiv.id = 'form_deco_left_body_sub_div_'  + typeId;
		newInstHolderDiv.className = 'form_deco_left_body_sub_div';
		newInstHolderDiv.style.visibility = "hidden";
		newInstHolderDiv.style.display = "none";
	
		body.appendChild( newInstHolderDiv );
		
		instHolderDiv = $( "#" + instHolderDivName );
	} 
	
	/**
	 * FOR THE ADDING NEW INST OF THIS TYPE 
	 */
	var checkInstanceAddDiv = $( "#form_inst_add_" + typeId );	
	
	if( checkInstanceAddDiv == null || checkInstanceAddDiv.length == 0 ) {
		// no div found, create it
		var newInstAddDiv = document.createElement('div');
		newInstAddDiv.id = 'form_inst_add_'  + typeId;
		newInstAddDiv.className = 'form_inst_add';
		newInstAddDiv.style.visibility = "hidden";
		newInstAddDiv.style.display = "none";
	
		instHolderDiv.append( newInstAddDiv );
		
		checkInstanceAddDiv = $( "#form_inst_add_" + typeId );
	}
	
	/**
	 * FOR THE List of  INST OF THIS TYPE 
	 */
	
	
	var checkInstanceAddDiv = $( "#form_inst_list_" + typeId );	
	
	if( checkInstanceAddDiv == null || checkInstanceAddDiv.length == 0 ) {
		// no div found, create it
		var newInstListDiv = document.createElement('table');
		newInstListDiv.id = 'form_inst_list_'  + typeId;
		newInstListDiv.className = 'form_inst_list';
		newInstListDiv.style.visibility = "hidden";
		newInstListDiv.style.display = "none";
	
		instHolderDiv.append( newInstListDiv );
		
		checkInstanceAddDiv = $( "#form_inst_list_" + typeId );
	}
		
}


DisplayFormUtils.addFormDivsRight = function( body, instHolderDivName , typeId ) {
	
    var instHolderDiv = $( "#" + instHolderDivName );	
	
	if( instHolderDiv == null || instHolderDiv.length == 0 ) {
		// found no div so create it
		var newInstHolderDiv = document.createElement('div');
		newInstHolderDiv.id = 'form_deco_right_body_sub_div_'  + typeId;
		newInstHolderDiv.className = 'form_deco_right_body_sub_div';
		newInstHolderDiv.style.visibility = "hidden";
		newInstHolderDiv.style.display = "none";
	
		body.appendChild( newInstHolderDiv );
		
		instHolderDiv = $( "#" + instHolderDivName );
	} 
	
}

DisplayFormUtils.setDefault_ChildrenDiv = function ( key   ){

	var checkInstanceChildDiv = $( "#form_inst_children_" + key );
	    var text = '';
	    text += "<br/><table id='nodeFormChildTable_" + key + "' border=1><tr><th>Children</th>";
	    text += "<td colspan='2' class='create_icon' onclick='( new DisplayFormRenderer() ).addChildNodeForm(\"" + key + "\")'>";
	    text += "<img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td></tr></table>";
	checkInstanceChildDiv.append(text);

}

DisplayFormUtils.setDefault_ParentDiv = function ( key   ){

	var checkInstanceParDiv = $( "#form_inst_parent_" + key );
	    var text = '';
	    text += "<br /><table id='nodeFormParTable_" + key + "' border=1><tr><th>Parent</th>";
	    text += "<td colspan='2' class='create_icon' onclick='( new DisplayFormRenderer() ).addParNodeForm(\"" + key + "\")'>";
	    text += "<img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td></td></tr></table>";
    checkInstanceParDiv.append(text);

}

DisplayFormUtils.setDefault_SiblingDiv = function ( key   ){

	var checkInstanceSibDiv = $( "#form_inst_sibling_" + key );
	    var text = '';
	    text += "<br /><table id='nodeFormSibTable_" + key + "' border=1><tr><th>Sibling</th>";
	    text += "<td colspan='2' class='create_icon' onclick='( new DisplayFormRenderer() ).addSibNodeForm(\"" + key + "\")'>";
	    text += "<img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td></td></tr></table><br />";
    checkInstanceSibDiv.append(text);

}

DisplayFormUtils.setDefault_LinktoDiv = function ( key   ){

	var checkInstanceLinktoDiv = $( "#form_inst_linkto_" + key );
	    var text = '';
	    text += "<br /><table id='nodeFormLinktoTable_" + key + "' border=1></table>";
	    checkInstanceLinktoDiv.append(text);

}

DisplayFormUtils.setDefault_ConnectToDiv = function ( key   ){

	var checkInstanceConnecttoDiv = $( "#form_inst_connectto_" + key );
	    var text = '';
	    text += "<br /><table id='nodeFormConnecttoTable_" + key + "' border=1></table>";
	    checkInstanceConnecttoDiv.append(text);

}

DisplayFormUtils.addFormInstCreate = function( appendToDiv, typeId, tmpType ){
	// populate the Add INSTANCE FORM with properties	              ---   did not delete comments as we may change these to appropriate fields type	
	var propcolor = '';			                           // RED color used to highlight Mandatory property
	
	$('div.right_body').hide();	
	// build the form
	var inputContent = '';
	    inputContent += '<br /><table border="2">';
    if ( tmpType.properties.length != 0 ) {
		$.each( tmpType.properties, function( propId, tmpProp ) {
									
			if(tmpProp.isMandatory){ propcolor='color:red'  } else {propcolor='color:black' };
						
//			inputContent += '<tr><td  style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input type="text"  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" value="" / >' ;
			inputContent += '<tr><td  style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input   name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" ' ;
			
			if( tmpProp.propertyType == "STRING" ) {
//				inputContent += '(TEXT)</td> </tr>' ;
				
				inputContent += 'type="text" value="" / >(TEXT)</td> </tr>' ;
				

			} else if( tmpProp.propertyType == "INTEGER" ) {
//				inputContent += '(NUMBER) </td></tr>' ;
				inputContent += 'type="number" value="" / >(NUMBER)</td> </tr>' ;
				

			} else if( tmpProp.propertyType == "DATE" ) {
//				inputContent += '(DATE) </td></tr>' ;
				inputContent += 'type="date" value="" / >(DATE)</td> </tr>' ;
				

			} else if( tmpProp.propertyType == "DOUBLE" ) {
				inputContent += '(DOUBLE) </td></tr>' ;
				inputContent += 'type="text" value="" / >(DOUBLE)</td> </tr>' ;

			} else if( tmpProp.propertyType == "BOOLEAN" ) {
//				inputContent += '(BOOLEAN) </td></tr>' ;
				inputContent += 'type="text" value="" / >(BOOLEAN)</td> </tr>' ;

			} else {
//				inputContent += '(UNKNOWN TYPE) </td></tr>' ;
				inputContent += 'type="text" value="" / >(UNKNOWN TYPE)</td> </tr>' ;
    		}
			
		});
    }else {    
    	inputContent += "<tr><td colspan='2'> No Properties defined for this Type </td></tr>"   
    };
//	var footer  = '<tr align="center"><td colspan="2"><input type="button"  name="submit" class="btn btn-primary btn-xs"   id="form_inst_add_val_submit_' + typeId + '" value="Add Instance" onclick="( new DisplayFormRenderer() ).createNode_submit(' + typeId + ');"/>';
//	
//	    footer += '<input type="button"   name="cancel" id="form_inst_add_val_cancel_' + typeId + '" value="Cancel" onclick="( new DisplayFormRenderer() ).createNode_cancel(' + typeId + ');"/></td></tr>';
//	    footer += '</table><br />'
//	    inputContent = inputContent + footer;	
    inputContent = inputContent + "</table><br />";
	    
	appendToDiv.append(inputContent);
			
}

DisplayFormUtils.addFormParmust = function ( typeId, parent ){               // based on node and existing connections/links display list of possible parent
	
	var instAddDiv = $("#form_inst_add_" + typeId );
	instAddDiv.innerHTML = '';
	// build the form
	var inputContent = '';
    inputContent += '<p> YOU MUST  Select Its Parent Type  </p>'
    inputContent += '<table border="2" id="tablenodeParent_'+typeId+'" >';	
    inputContent += '<tr><td>Select Its Parent Type: <select id="nodeTypeParent_'+ typeId +'" onchange="DisplayFormUtils.buildListNodes(this.value)"><option value="">....</option>'; 

    for( var i=0; i <parent.length ; i++){
    	    inputContent += '<option value="'+parent[i].source+'">'+parent[i].origin+'( using conn/link '+parent[i].name +')</option>';
    }
     
    inputContent += '</select></td>';
    inputContent += '</tr></table><br/>';
    instAddDiv.append(inputContent);  
	
}

DisplayFormUtils.buildListNodes = function(typeParent ){                   // based on type selected load existing node Instances and display these
	
	// grab all nodes under the selected type
	var successFunction = function( data ) {
		console.log(data.nodes);
		var inputSelect = '';
		if ( data.nodes.length  > 0 ){	
			inputSelect += '<p>Select Node <select id="nodeInstParent_'+typeParent+'" onchange="DisplayFormUtils.createNodeWithParent(this.value,'+typeParent+','+ listTypeIds[0]+')"><option value="">....</option>'; 
			$.each(data.nodes, function(key, value){
				var uuid = null; 
				var instName = '('+value.type+')';
				value.properties.forEach(function(prop) {
					if(prop.name=="uuid"){
						uuid = prop.value 
					}else if( prop.name == 'name'){
						instName = prop.value;
					}
				}); 
			
			    inputSelect += '<option value='+uuid+'>'+ instName +'</option>';    
			
			});
			
			inputSelect +=' </select></p>';
			var place = $("td > select#nodeTypeParent_" + listTypeIds[0]);
		
			$(inputSelect).insertAfter(place); //$("#nodeParent_" + listTypeIds[0]).after(inputSelect);
			
		}else {  // no nodes created 
			
			inputSelect += '<p> No node available: Creating Node Instance for: '+typeMapViaId[typeParent].name+' </p>';
			
			var place = $("td > select#nodeTypeParent_" + listTypeIds[0]);
			$(inputSelect).insertAfter(place);
			
			var instAddDiv = $("#form_inst_add_" + listTypeIds[0] );
			DisplayFormUtils.addFormInstCreate( instAddDiv, typeParent, typeMapViaId[typeParent]  );
			var footer  = '<tr align="center"><td colspan="2"><input type="button"  name="submit" class="btn btn-primary btn-xs"   id="form_inst_add_val_submit_' + typeParent+ '" value="Add Instance" onclick="( new DisplayFormRenderer() ).createNodeParent_submit(' + typeParent + ');"/>';		
		    footer += '<input type="button"   name="cancel" id="form_inst_add_val_cancel_' + listTypeIds[0] + '" value="Cancel" onclick="( new DisplayFormRenderer() ).createNode_cancel(' + listTypeIds[0] + ');"/></td></tr>';
		    		    
		    $('div#form_inst_add_'+listTypeIds[0]+ '  tr').last().after(footer);	
		    
		    
		    
			
		}
		
		
	};
	
	var failFunction = function( xhr, status, error ) {
		console.log('Not able to load Nodes for this Type: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Not able to load Nodes for this Type:"+ xhr.status+"</p>");	
	};
	
	var nodeApi = new NodeApis();
	
	nodeApi.getNodesUnderType(typeParent, successFunction, failFunction);
			
}

DisplayFormUtils.createNodeWithParent = function ( nodeSelected, typeParent, curType){
	
//	var name = $('nodeInstParent_'+typeParent);
	console.log(" values are : node Selected :  "+ nodeSelected + " type Parent :"+ typeParent + " current Type : "+ curType);
	
	// prepare the node selected as parent
	// the Type of this Parent
	var inputText = '';
	inputText    += '<tr><th>NodeParent:</th><td><input type="text" id="nodeInstParent_selected" value="'+ nodeSelected+'"  disabled="disabled"/></td></tr>'; 
	inputText    += '<tr><th>TypeParent:</th><td><input type="text" id="nodeInstParentType_selected" value="'+typeMapViaId[typeParent].name+'" disabled></td></tr>';
	
	// prepare the connection to choose from
	var listOfConnPar = [];
	   $.each( connMapViaId , function( key, value ) {				
			if( (curType === value.target ) &&( typeParent == value.source))	{			
				listOfConnPar.push(value);
			}
	   });
	   
	   
	var connText = '';
	connText   += '<tr><td>Select Connection</td><td><select  id="connSelected_">';
	for(var i=0; i< listOfConnPar.length ; i++){
		connText  += '<option value="'+listOfConnPar[i].id+'">'+listOfConnPar[i].name+'('+listOfConnPar[i].id+')</option>';
	}
	
	connText  += '</select></td></tr><br />';
	
	inputText = inputText + connText;
	
	
	// display the list of properties to be entered.
	var instAddDiv = $("#form_inst_add_" + curType );
	instAddDiv.empty();
	DisplayFormUtils.addFormInstCreate( instAddDiv, curType, typeMapViaId[curType ] );

	$('div#form_inst_add_'+curType + '  tr').first().before(inputText);
	
	
	var footer  = '<tr align="center"><td colspan="2"><input type="button"  name="submit" class="btn btn-primary btn-xs"   id="form_inst_add_val_submit_' + curType + '" value="Add Instance" onclick="( new DisplayFormRenderer() ).createNodewithParent_submit(' + curType + ');"/>';	
    footer += '<input type="button"   name="cancel" id="form_inst_add_val_cancel_' + curType + '" value="Cancel" onclick="( new DisplayFormRenderer() ).createNode_cancel(' + curType + ');"/></td></tr>';
    $('div#form_inst_add_'+curType + '  tr').last().after(footer);	
    	
	
}

DisplayFormUtils.buildTypeList = function ( nodeUuid, type ){
	// grab the TYPE of the Node Instance
	var typeNode = nodeMap[nodeUuid].type;
	// grab the ID for this TYPE
	var typeNodeId = typeMap[typeNode].id;
	
	var listChildrenTypes = [];
	var listParentTypes   = [];
	var typeOfConn = {};
	$.each( connMap, function( key, value ) {
	
		if ( value.source  == typeNodeId ){           // Type of the Node instance is a Source in this connection
			typeOfConn[ "typeId" ] = value.target;
			typeOfConn[ "connection"] =  value.id;
			listChildrenTypes.push(typeOfConn);
		}
		
		if ( value.target  == typeNodeId ){           // Type of the Node instance is a Source in this connection
			typeOfConn[ "typeId" ] = value.source;
			typeOfConn[ "connection"] =  value.id;
			listParentTypes.push(typeOfConn);
		}
	    typeOfConn = {};
	
	});
	
	var inputTypeList =''; 

	var first  ='<option value="">select '+type+' Type ...</option>'
	
	if(type == 'Children'){
//		inputTypeList = '<option value="">select Children Type ...</option>';
		if(listChildrenTypes.length  != 0 ){	
			
			for(var i=0; i< listChildrenTypes.length ; i++){
				if(connMapViaId[listChildrenTypes[i].connection].classification == 'parentchild')
				{
					inputTypeList += '<option value="'+listChildrenTypes[i].typeId+'|'+listChildrenTypes[i].connection+'" style="color:black" >'+typeMapViaId[listChildrenTypes[i].typeId].name +'(PC)</option>';
				}
			}
		}
		if(inputTypeList == '' ){ document.getElementById("addChil_"+ nodeUuid).disabled = true; }
			
		document.getElementById('select_child_type_'+nodeUuid).innerHTML= first + inputTypeList;
		
	}else if( type == 'Parent'){
			inputTypeList = '';	
			if(listParentTypes.length != 0 ){
				for(var i=0; i< listParentTypes.length ; i++){
					if(connMapViaId[listParentTypes[i].connection].classification == 'parentchild')
					{
					inputTypeList += '<option value="'+listParentTypes[i].typeId+'|'+listParentTypes[i].connection+'" style="color:black"  >'+typeMapViaId[listParentTypes[i].typeId].name +'(PC)</option>';
					}
				}
			}
			if(inputTypeList == '' ){ document.getElementById("addPar_"+ nodeUuid).disabled = true; }
			
		    document.getElementById('select_parent_type_'+nodeUuid).innerHTML =  first + inputTypeList;	
		    
	}else if( type == 'Sibling'){
			inputTypeList = '<option value="">select Sibling Type ...</option>';
			var inputSibling = '';
			if(listParentTypes.length != 0 || listChildrenTypes.length  != 0){
				for(var i=0; i< listParentTypes.length ; i++){
					if(connMapViaId[listParentTypes[i].connection].classification == 'link')
					{
					  inputSibling += '<option value="'+listParentTypes[i].typeId+'|'+listParentTypes[i].connection+'" style="color:green"  >'+typeMapViaId[listParentTypes[i].typeId].name +'(Link)</option>';
					} 
				}
				for(var i=0; i< listChildrenTypes.length ; i++){
					if(connMapViaId[listChildrenTypes[i].connection].classification == 'link')
					{
					  inputSibling += '<option value="'+listChildrenTypes[i].typeId+'|'+listChildrenTypes[i].connection+'" style="color:green" >'+typeMapViaId[listChildrenTypes[i].typeId].name +'(Link)</option>';
					}	
				}
				if(inputSibling == '' ) {document.getElementById("addSib_"+ nodeUuid).disabled = true;}
				
				else inputTypeList = inputTypeList + inputSibling;
				
			}else {
				document.getElementById("addSib_"+ nodeUuid).disabled = true;	
					
				}
		   document.getElementById('select_sibling_type_'+nodeUuid).innerHTML = inputTypeList;	
		}
			
}

DisplayFormUtils.buildTypeProperty =  function ( typeId, nodeUuid){
	
	var Id = typeId.split("|")
	var tmpType = typeMapViaId[Id[0]];
	
	var inputCreate = '';
    inputCreate = '<table border="2">';
    if(tmpType.properties.length == 0 ){ inputCreate += " No properties";}
    $.each( tmpType.properties, function( propId, tmpProp ) {
							
		if(tmpProp.isMandatory){ propcolor='color:red'  } else {propcolor='color:black' };				
		inputCreate += '<tr><td  style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input type="text"  name = "'+tmpProp.name+ '"  id="form_create_val_' + tmpProp.id + '" value="" / >' ;	
		if( tmpProp.propertyType == "STRING" )              {   inputCreate += '(TEXT)</td> </tr>' ;
		} else if( tmpProp.propertyType == "INTEGER" )      {	inputCreate += '(NUMBER) </td></tr>' ;
		} else if( tmpProp.propertyType == "DATE" )         {	inputCreate += '(DATE) </td></tr>' ;
		} else if( tmpProp.propertyType == "DOUBLE" )       {   inputCreate += '(DOUBLE) </td></tr>' ;
		} else if( tmpProp.propertyType == "BOOLEAN" )      {	inputCreate += '(BOOLEAN) </td></tr>' ;
		} else                                              {   inputCreate += '(UNKNOWN TYPE) </td></tr>' ;
		}
	
    });
    inputCreate = inputCreate + "<input type ='hidden' id='form_create_val_connId' value='"+Id[1]+"'>"
    inputCreate = inputCreate + "</table>";
	
	document.getElementById('td_'+nodeUuid).innerHTML = inputCreate;
}

DisplayFormUtils.buildTypeListConnect = function ( instId ){
	
	
	// grab all connections where the Type of this instance is Source
	var typeNode = nodeMap[instId].type;
	// grab the ID for this TYPE
	var typeNodeId = typeMap[typeNode].id;
	
	// grab the option selected 
	var listConnToChildren = [];
	var listConnToParent   = [];
	var listLinks = [];
	var detailConn = {};
	var detailLink = {};
	
	
	var valueSelected = $('input[name="typeConnPosition_'+ instId+'"]:checked').val()
	
    if( valueSelected == 'asParent'){
    	// grab all possible children 
    	$.each( connMapViaId, function( key, value ) {	
    		if ( value.source  == typeNodeId ){           // Type of the Node instance is a Source in this connection
    			if( value.classification == 'parentchild'){
    				detailConn[ "typeIdTarget" ]    = value.target;
    				detailConn[ "connectionId"]     = value.ruleId;
    				listConnToChildren.push(detailConn);
    			}else if( value.classification == 'link'){
    				detailLink[ "parentTypeId" ]    = value.source;
    				detailLink[ "typeIdTarget" ]    = value.target;
    				detailLink[ "linkId"]     =  value.ruleId;
    				listLinks.push(detailLink);
    			}
    			detailConn = {}; detailLink = {};
    		}; 		
    	});
    	
    	
    }else if( valueSelected == 'asChild'){
    	$.each( connMapViaId, function( key, value ) {	
    		if ( value.target  == typeNodeId ){           // Type of the Node instance is a Source in this connection
    			if( value.classification == 'parentchild'){
    				detailConn[ "typeIdSource" ]    = value.source;
    				detailConn[ "connectionId"]     = value.ruleId;
    				listConnToParent.push(detailConn);
    			}else if( value.classification == 'link'){
    				detailLink[ "typeIdSource" ]    = value.source;
    				detailLink[ "linkId"]           = value.ruleId;
    				listLinks.push(detailLink);
    			}	
    			detailConn = {}; detailLink = {};
    		}
    	});
    	  	  	
    }
	// build the list of Types and append it 
	 if( valueSelected == 'asParent'){
		 
		 var tableInstConnDiv = $("#nodeFormConnecttoTable_" + instId );
		 
		 var inputTypeList =''; 
		 inputTypeList = '<td valign="middle"><select name="childType_'+instId+'"   ><option value="">Select Children Type ...</option>';
		 if(listConnToChildren.length  != 0 ){	
				
				for(var i=0; i< listConnToChildren.length ; i++){	
					var text ='';
					if( connMapViaId[listConnToChildren[i].connectionId].classification == 'parentchild' ){ text += '(using Connection: ';  }
					else { text += '(using link: ';}
					text += connMapViaId[listConnToChildren[i].connectionId].name +')';
					inputTypeList += '<option value="'+listConnToChildren[i].typeIdTarget+'|'+listConnToChildren[i].connectionId+'">'+typeMapViaId[listConnToChildren[i].typeIdTarget].name + '<b>'+text +'</b>)</option>';
				}
				inputTypeList +='</td></tr>';
			}else {
				inputTypeList = '<tr><td> No Children available</td>';
			}		
			
		    $('#nodeFormConnecttoTable_'+instId +' tr ').find('th:first').after('');
			$('#nodeFormConnecttoTable_'+instId).find('tr:first').append( inputTypeList);		 
		 
	 };
	 if( valueSelected == 'asChild'){
		 
		 var tableInstConnDiv = $("#nodeFormConnecttoTable_" + instId );
		 var inputTypeList =''; 
		 inputTypeList = '<td valign="middle"><select name="parentType_'+instId+'"   ><option value="">Select Parent Type ...</option>';
		 if(listConnToParent.length  != 0 ){	
			
				for(var i=0; i< listConnToParent.length ; i++){	
					var text ='';
					if( connMapViaId[listConnToParent[i].connectionId].classification == 'parentchild' ){ text += '(using Connection: ';  }
					else { text += '(using link: ';}
					text += connMapViaId[listConnToParent[i].connectionId].name +')';
					inputTypeList += '<option value="'+listConnToParent[i].typeIdSource+'|'+listConnToParent[i].connectionId+'">'+typeMapViaId[listConnToParent[i].typeIdSource].name + '<b>'+text +'</b>)</option>';
				}
				inputTypeList +='</td></tr>';
			}else {
				inputTypeList = '<tr><td> No Children available</td>';
			}		
			
			$('#nodeFormConnecttoTable_'+instId).find('tr:first').append( inputTypeList);		 
		 
	 };
	
}

DisplayFormUtils.resetParChildSibForms = function (instId){
	
	var checkInstanceChildDiv = $( "#form_inst_children_" + instId );
	if( checkInstanceChildDiv != null || checkInstanceChildDiv.length != 0 ) {	
		$("#nodeFormChildTable_"+ instId).find("tr:not(:nth-child(1))").remove();
	}
	
	var checkInstanceParDiv = $( "#form_inst_parent_" + instId );
	if( checkInstanceParDiv != null || checkInstanceParDiv.length != 0 ) {	
		$("#nodeFormParTable_"+ instId).find("tr:not(:nth-child(1))").remove();
	}
	
	var checkInstanceSibDiv = $( "#form_inst_sibling_" + instId );
	if( checkInstanceSibDiv != null || checkInstanceSibDiv.length != 0 ) {	
		$("#nodeFormSibTable_"+ instId).find("tr:not(:nth-child(1))").remove();
	}
	
	
};

DisplayFormUtils.resetFormAddInst = function ( typeId ){ 
	
	var checkInstanceCreateDiv = $( "#form_inst_add_" + typeId );
	
	if( checkInstanceCreateDiv != null || checkInstanceCreateDiv.length != 0 ) {	
		checkInstanceCreateDiv.empty();
	}
}

DisplayFormUtils.cancelAddChild = function(){
	var div = $(".addChildNodeRow");			
	div.remove();
}

DisplayFormUtils.cancelAddSib = function(){
	var div = $(".addSibNodeRow");			
	div.remove();
}

DisplayFormUtils.cancelAddPar =function(){
	var div = $(".addParNodeRow");			
	div.remove();
}

DisplayFormUtils.clearAddRow = function(){
	if($( ".addChildNodeRow" ).length >  0) {
		console.log("FOUND SOMETING : " + $( ".addChildNodeRow" ).length + "Clearing these ");
		// previous created rows not deleted
		var div = $(".addChildNodeRow");			
		div.remove();
	}
	if($( ".addParNodeRow" ).length > 0) {
		console.log("FOUND SOMETING : " + $( ".addParNodeRow" ).length + " Clearing these");
		var div = $(".addParNodeRow");			
		div.remove();
	}
	if($( ".addSibNodeRow" ).length > 0) {
		console.log("FOUND SOMETING : " + $( ".addSibNodeRow" ).length + " Clearing these");
		var div = $(".addSibNodeRow");			
		div.remove();
	}
}

DisplayFormUtils.getTypeOfNodeInstance = function( nodeUuid){
	var typeNode = nodeMap[nodeUuid].type;
	// grab the ID for this TYPE
	var typeNodeId = typeMap[typeNode].id;
}

DisplayFormUtils.showDivision = function ( divName, divId ){
	
	var instDiv = document.getElementById(divName + divId );
	if( instDiv != null ) {
		instDiv.style.display = "block";
		instDiv.style.visibility = "visible";
	} else {
		// nothing to show?
	}	
	
}

DisplayFormUtils.hideDivision = function ( divName, divId ){
	
	var instDiv = document.getElementById(divName + divId );
	if( instDiv != null ) {
		instDiv.style.display = "none";
		instDiv.style.visibility = "hidden";
	} else {
		// nothing to show?
	}	
	
}


