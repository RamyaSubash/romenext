function DisplayInterfaceUtils() {
	
}

DisplayInterfaceUtils.hideOldVersion = function() {
	
	var typeBar2Check = document.getElementById("typeBar2");
	
	if( typeBar2Check != null && typeBar2Check.value == ''  ) {
		typeBar2Check.style.display = "none";
	}
	
	var ruleCheck = document.getElementById("ruleInstBar");
	
	if( ruleCheck != null && ruleCheck.value == ''  ) {
		ruleCheck.style.display = "none";
	}
	
	var toolbarCheck = document.getElementById("toolbar_romenext");
	
	if( toolbarCheck != null && toolbarCheck.value == ''  ) {
		toolbarCheck.style.display = "none";
	}
	
	
	var leftNavCheck = document.getElementById("grid-instances");
	
	if( leftNavCheck != null && leftNavCheck.value == ''  ) {
		leftNavCheck.style.display = "none";
	}
	

};

DisplayInterfaceUtils.showOldVersion = function() {
    var typeBar2Check = document.getElementById("typeBar2");
	
	if( typeBar2Check != null && typeBar2Check.value == ''  ) {
		typeBar2Check.style.display = "none";
	}
	
	var ruleCheck = document.getElementById("ruleInstBar");
	
	if( ruleCheck != null && ruleCheck.value == ''  ) {
		ruleCheck.style.display = "none";
	}
	
};

//  This is used by DisplayFormRenderer -- HotelManagerRender -- DisplayLogicalRedenrer -- PersonmanagerRender --  KitchenManagerRender -- ResrvationManagerRender --

DisplayInterfaceUtils.resetInterface = function() {
	
	for (var key in activeDecos_BODY) {
		var decoView = document.getElementById(activeDecos_BODY[key]);
		if (decoView != undefined && decoView != null) {
			decoView.style.display = "none";
			decoView.innerHTML = "";
		}
	}

	
	for (var key in activeDecos_TB) {
		var decoView = document.getElementById(activeDecos_TB[key]);
		if (decoView != undefined && decoView != null) {
			decoView.style.display = "none";
			decoView.innerHTML = "";
		}
	}
	
	for (var key in activeDecos_LN) {
		var decoView = document.getElementById(activeDecos_LN[key]);
		if (decoView != undefined && decoView != null) {
			decoView.style.display = "none";
			decoView.innerHTML = "";
		}
	}
	
	$('.pathFormCreate').remove();
	document.getElementById('path').innerHTML = "";
	
	var pathView = document.getElementById("PathView");
	if (pathView != undefined && pathView != null) {
		pathView.style.display = "none";
		pathView.innerHTML = "";
	}
	
	var pathViewLN = document.getElementById('path_view_leftnav');
	if (pathViewLN != undefined && pathViewLN != null) {
		pathViewLN.style.display = "none";
		pathViewLN.innerHTML = "";
	}

};

DisplayInterfaceUtils.generateNodesSearchTypeSelection = function(typePropertyId) {
	
	var nodesSearchTypeSelection = "<select id='nodes_search_type_selection_for_" + typePropertyId + "' disabled='disabled'><option value='WILDCARD'>Wildcard</option>" +
			"<option value='STARTSWITH'>Start with</option>" +
			"<option value='ENDSWITH'>End with</option>" +
			"<option value='GREATERTHAN'>Greater than</option>" +
			"<option value='LESSTHAN'>Less than</option></select>";
	
	return nodesSearchTypeSelection
}

DisplayInterfaceUtils.generateNodesSearchFormById = function (workspaceId, typeId) {
	DisplayInterfaceUtils.generateNodesSearchForm($('#' + workspaceId + ''), typeId);
};

DisplayInterfaceUtils.generateNodesSearchForm = function( workspace, typeId ) {

	if(!typeId ){
		console.log(" no Type Id provided: cannot build search Instance table  "); 
		return;
	}
	var tmpType = typeMapViaId[typeId];              
	
	var previousSearch = $('#search_' + typeId + '_instance_table_id');
	if (previousSearch) {
		previousSearch.remove();
	}

	
	// build the form
	var inputContent = '';
	    inputContent += '<br /><table id="search_' + typeId + '_instance_table_id" >';

   	if(!$.isEmptyObject( tmpType.typeProperties	)){
		$.each( tmpType.typeProperties, function( propId, tmpProp ) {
			
			var nodesSearchTypeSelection = DisplayInterfaceUtils.generateNodesSearchTypeSelection(propId);
			// TODO: Only search by STRING properties for now
			if( tmpProp.propertyType == "STRING" ) {
				inputContent += '<tr id="searchTypeProps"><td>' + tmpProp.name + ':</td><td>' + '<input name="' + tmpProp.name + '" id="form_inst_search_prop_val_' + tmpProp.id + '" value="" type="text"/>(TEXT)' + nodesSearchTypeSelection + '</td></tr>';	
			}
	
		});
    }else {    
    	inputContent += "<tr><td colspan='2'> No Properties defined for this Type </td></tr>";   
    };
	
    inputContent += '<tr><td colspan="2"><input type="button" name="submit" class="btn btn-primary btn-xs" id="search_node_submit_' + typeId + '" value="Search" onclick="NodeUtils.searchNodesByProperties(\'' + workspace.attr('id') + '\', \'search_' + typeId + '_instance_table_id\', ' + typeId + ');"/></td></tr></table>';    
	
	workspace.append(inputContent);

};

DisplayInterfaceUtils.generateNodeList = function( workspace, title, typeId, nodes ) {
	
	var inputSelect = title + ': <select id="node_list_' + typeId + '"   >';
	inputSelect += '<option value="None"  ></option>';
	$.each(nodes, function(key, node){
		var name = NodeUtils.findNameInst(node);
		var uuid = NodeUtils.findUUID(node);
		inputSelect += '<option value='+uuid+'>' + name + '</option>'; 
	});
	inputSelect += '</select>'
	
	workspace.append(inputSelect);
	
};

DisplayInterfaceUtils.addNewInstanceToInstanceBar = function( instanceBarId, instance ) {
	
	var instanceBar = document.getElementById(instanceBarId);
	var instanceBarElement = '';
	instanceBarElement += "<td><button type='button' style='color:black;background:" + instance.color + "' id='" + uuid + "' onclick=\"( new CheckinManagerRender() ).selectedCheckin('" + uuid + "')\"  >"+ tmpName;
	instanceBarElement += "</button></td>";
	
	instanceBar.append(instanceBarElement);
	
};

DisplayInterfaceUtils.errorDisplay = function  (errorMessage ){
	if(errorMessage) {
		$('#console-log').append(errorMessage);
		console.log('%c'+errorMessage, 'background: #F90; color: red');
	}
}

DisplayInterfaceUtils.hideDivision = function ( divName, divId ){
	
	var instDiv = document.getElementById(divName + divId );
	if( instDiv != null ) {
		instDiv.style.display = "none";
		instDiv.style.visibility = "hidden";
	} else {
		// nothing to hide?
		console.log(" no division to hide ");
	}		
 }

DisplayInterfaceUtils.showDivision = function( divName , divId  ) {
	var instDiv = document.getElementById(divName + divId );
	if( instDiv != null ) {
		instDiv.style.display = "block";
		instDiv.style.visibility = "visible";
	} else {
		// nothing to show?
		console.log(" no division to show ");
	}	
}

DisplayInterfaceUtils.showDivisionClass = function( divName   ) {
	var instDiv = document.getElementsByClassName(divName );
	if( instDiv != null ) {
		instDiv.style.display = "block";
		instDiv.style.visibility = "visible";
	} else {
		// nothing to show?
		console.log(" no division to show ");
	}	
}

DisplayInterfaceUtils.hideDivisionClass = function( divName   ) {
	var instDiv = document.getElementsByClassName(divName );
	if( instDiv != null ) {
		instDiv.style.display = "none";
		instDiv.style.visibility = "hidden";
	} else {
		// nothing to show?
		console.log(" no division to show ");
	}	
}
   
DisplayInterfaceUtils.setTotalNBType = function ( typeId ){
	
	var nbSpan = document.getElementById("nb_"+typeId);		
	var nb     = typeMapViaId[typeId].nb;		
	nbSpan.innerHTML = nb;	
}

DisplayInterfaceUtils.tableMandatoryProperties = function ( typeId, mandatoryOrNot ){
	if(!typeId ){
		console.log(" no Type Id provided: cannot build search Instance table  "); 
		return;
	}
	var list = [];
	var props = typeMapViaId[typeId].typeProperties;
	$.each(props, function( propId, tmpProp ) {
		if( mandatoryOrNot == 'mandatory'){
			 if(tmpProp.isMandatory  ){
//				 list.push( tmpProp.id);
				 list.push({ id: tmpProp.id, propType :tmpProp.propertyType} );
		    }	
		}else {
			list.push({ id: tmpProp.id, propType :tmpProp.propertyType} );
		}
				 
	});
	return list;
}

DisplayInterfaceUtils.addDatePicker = function (name){
	for (var i=0; i< listDates.length; i++){
		$("#"+name+listDates[i]).datepicker({
			changeMonth: true,
  	        changeYear: true,
			dateFormat: "yy-mm-dd", 		  
			yearRange: "1950:2017"  
		});
	}
	
}




	