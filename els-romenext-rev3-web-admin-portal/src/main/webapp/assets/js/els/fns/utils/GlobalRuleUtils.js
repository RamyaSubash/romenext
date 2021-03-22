function GlobalRuleUtils() {
	
};

GlobalRuleUtils.generateLinkRuleDropList = function (elementId, mode) {
	
	if (!document.getElementById("link_rule_select_list")) {
		
		var linkRuleSelectList = '<select id="link_rule_select_list" onchange="';
		
		if (mode == "Logical Display") {
			linkRuleSelectList += '(new DisplayLogicalRenderer()).createLinkEdge(this.value);">';
		}
		
		var blank = '<option value="EMPTY" selected>......</option>';
		linkRuleSelectList += blank;
		
		$.each(ruleMapViaId, function(key, value) {
			
			if (value.classification == "link") {
				var rule = '<option value="' + key + '">' + value.name + '</option>';
				linkRuleSelectList += rule;
			}
			
		});
		
		var cancel = '<option value="CANCEL"><strong>CANCEL</strong></option>';
		linkRuleSelectList += cancel;
		
		linkRuleSelectList += '</select>';
		
		document.getElementById(elementId).innerHTML = linkRuleSelectList;
		
	}

};

GlobalRuleUtils.getAllLinkIdsFromRuleMap = function () {
	var results = [];
	
	$.each(ruleMapViaId, function(id, rule) {
		if (rule.classification == 'link') {
			results.push(id);
		}	
	});
	
	return results;
};

GlobalRuleUtils.createLinkList  = function( ){
	
	var startNode = startNodeForLinking;
	var endNode = endNodeForLinking;
	
	var availableRuleIdList = [];
	$.each(connMapViaId, function(key, value) {
		if (value.source == startNode.typeId && value.target == endNode.typeId && value.classification == "link") {
			if (!availableRuleIdList.includes(value.ruleId)) {
				availableRuleIdList.push(value.ruleId);
			}
		}
	});
	
	var list = '';
	$.each(availableRuleIdList, function(key, value) {
		list += '<option value="' + value + '">' + ruleMapViaId[value].name + '</option>';		
	});
	
	return list;
	
};

GlobalRuleUtils.createAllLinkList  = function( ){
	
	var list = '';
	$.each(ruleMapViaId, function(key, value) {
		if( value.classification == "link"){
		   list += '<option value="' + key + '">' + value.name + '</option>';	
		}
	});
	
	return list;
	
}





GlobalRuleUtils.createParentChildConnectionList  = function( ){
	
	var startNode = startNodeForLinking;
	var endNode = endNodeForLinking;
	
	var list = '';
	$.each(connMapViaId, function(key, value) {
		if (value.source == startNode.typeId && value.target == endNode.typeId && value.classification == "parentchild") {
			list += '<option value="' + key + '">' + value.name + '</option>';	
		}
	});
	
	return list;
	
};

//=========================================================================================
//                           THESE FUNCTIONS are for adding properties
//=========================================================================================

GlobalRuleUtils.addRuleAddProperty = function ( rule  ){
	rule = currentElement;
	var ruleName = rule.name;
	var ruleId   = rule.id;
	currentElement = rule;
	var Form, formHeader, formFooter, inputs = ''; 
	Form = document.createElement('div');  
	formHeader = "<form id='typeProps'  method='post'>";
    inputs += "<div id='ruleName'><label>Rule Selected: </label>"+ruleName+"<input type='hidden' name='ruleid' value='"+ruleId+"'/>" +
    		"   <input type='hidden' name='rulename' value='"+ruleName+"'/></div>";
	inputs += "<button type='button' class='btn btn-success btn-xs'   onclick='GlobalRuleUtils.addProperty()'>Add property</button>";
	formFooter = "<div id='propertiesFields'></div>";
	formFooter += "<input id='save_prop_button' type='button' value='Save properties'  class='btn btn-success btn-xs' onclick='GlobalRuleUtils.saveLinkProperties(form)'>";
	formFooter += "<input type='button' value='Cancel' class='btn btn-success btn-xs' onclick='(new DesignLogicalRenderer()).showProperties(  );'></form>";
	
	Form.innerHTML = formHeader + inputs + formFooter;
	$("#create_type").dialog("open");
	$('#typecreateForm').empty();
	$('#typecreateForm').append(Form);
	GlobalRuleUtils.addProperty();
	
}

GlobalRuleUtils.addProperty = function ( ){
	 var  newProperty, properties, inputs=''; 
	
	 newProperty = document.createElement('div');
	 properties = "<hr/><table>";
     properties += "<tr><th>Name & Type:</th><td><input type='text' name='name' size='10' />";
     properties += "<select name='propertyType' onchange='(new DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>" +
     		"<option value='STRING'>TEXT</option>"+
			"<option value='INTEGER'>INTEGER</option>"+
			"<option value='DOUBLE'>DOUBLE</option>"+
			"<option value='DATE'>DATE</option>"+
			"<option value='BOOLEAN'>BOOLEAN</option>"+
			"<option value='FILE'>FILE</option>"+
			"<option value='CURRENCY'>CURRENCY</option>"+
			"<option value='STATUS'>STATUS</option>"+
			"<option value='PARENTVALUE'>PARENTVALUE</option>"+
			"<option value='CONCAT'>CONCAT</option>"+
			"</select></td></tr>";
     
	 properties += "<tr><th> isMandatory: </th><td>";
	 properties += "<input type='checkbox' name='isMandatory'  >";

	 properties += "</td></tr>";
	 properties += "<tr><th> isUnique: </th><td>";
	 properties += "<input type='checkbox' name='isUnique'  >";

	 properties += "</td></tr>";
	 properties += "<tr><th>Default Value:</th><td> <input type='text' name='defaultValue' onkeypress='' value='' defaultValue='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></td></tr>";
	 properties += "<tr><th>Max Value:</th><td> <input type='text' name='maxValue' /></td></tr>";
	 properties += "<tr><th>Min Value:</th><td> <input type='text' name='minValue' /></td></tr></table>";
	 
	 newProperty.innerHTML = properties;
	 document.getElementById('propertiesFields').appendChild(newProperty);
	 if (document.getElementById('propertiesFields').innerHTML != '') {
		document.getElementById("save_prop_button").style.visibility = 'visible';
		}
	 
}
//===================================================================================
//    SECTION TO DISPLAY 
//
//===================================================================================
//GlobalRuleUtils.displayProperties = function( type, showTypeInfo, typeDisplayFunction, propertyDisplayFunction ) {
GlobalRuleUtils.displayProperties = function( appendTo, type, showTypeInfo, typeDisplayFunction, propertyDisplayFunction ) {	
	var formHeader = "<table>";
	var inputs = "";
	
	if( showTypeInfo == true ) {
		$.each(type, function(key, value) {
			
			if(key == 'name')  {
				inputs += "<tr><th>" + key + "</th>";
				if (value == '') {
					inputs += "<td>None</td><tr>"; 
				} else { 
					inputs += "<td>" + value + "</td><tr>";	
				}
			} else if (key == 'classification') {
					inputs += "<tr><th>"+key +":</th>";
					inputs += "<td>" + value + "</td><tr>";
			}
			
		});
	}
	currentElement = type;	

	// generate the properties fields
	var props = type.typeProperties;	
	
	if ( props == null || props.length == 0 || $.isEmptyObject(props)  ) {
		inputs += "<tr><th colspan='2'> No properties added </th></tr>";
	} else {	
		inputs += "<tr><th colspan='7' style='background-color: #CDEEDD'>Properties:</th></tr>";
		inputs += "<tr style='background-color: grey'><th> Name</th><th>Type</th></tr>"; 
		$.each(props, function(key, value) {	

			var newInput = GlobalRuleUtils.displayProperty( value , propertyDisplayFunction );
			inputs += newInput ;
		});
		
		inputs += "<tr><td><input id='type_prop_detail_button_" + type.id + "' type='button' value='Show Details' class='btn btn-primary btn-xs' onclick='GlobalRuleUtils.showOrHideAllRulePropertiesDetails(\"" + type.id + "\");'/></td></tr>";
		
	} 
	
	var footer = "";
	
	footer  = "<tr><td><input type='button' value='Add Properties' class='btn btn-primary btn-xs'    onclick='GlobalRuleUtils.addRuleAddProperty(\"" + type + "\");'/></td>";
	footer += "<td><input type='button' value='Update '    class='btn btn-primary btn-xs'    onclick='GlobalRuleUtils.UpdateForm(\"" + type + "\")'/></td></tr>";
	footer += "</table>";
	var form = document.createElement('div');
	form.innerHTML = formHeader + inputs + footer;
	
	appendTo.append( form );	
//    return form;
};


GlobalRuleUtils.displayProperty = function( property, displayFunction  ) {
	console.log("Inside  GlobalRuleUtils.displayProperty   ");
	var inputs = "";
	
	if( displayFunction == null ) {
		// generate the properties fields
		console.log("Generate properties fields ");
		if ( property == null ) {

		} else {	

			if (property.isMandatory == true) {
				inputs += "<tr><td style='color:red'>" + property.name + "</td>";
			} else {
				inputs += "<tr><td>" + property.name + "</td>";
			}
		     if( property.propertyType == 'STRING' ) {
		    	 inputs += "<td>TEXT</td>";
		     } else {
		    	 inputs +="<td>" + property.propertyType + "</td>";
		     }
		     
		     inputs += "</tr>";
		     
		     inputs += "<tr><td><table id='type_prop_detail_"+property.id+"' style='display:none'>";
		     inputs += "<tr><th>Mandatory</th><th>Unique</th></tr>";
		     inputs += "<tr>";
		     inputs += "<td>"+property.isMandatory+"</td>";
		     inputs += "<td>"+property.isUnique+"</td>";
		     inputs += "</tr>";
		     
		     inputs += "<tr><th>Min</th><th>Max</th></tr>";
		     inputs += "<tr>";
		     if( property.minValue ) {
		    	 inputs += "<td>"+property.minValue+"</td>";
		     } else {
		    	 inputs +="<td>...</td>";
		     };
		     if( property.maxValue ) {
		    	 inputs += "<td>"+property.maxValue+"</td>";
		     } else {
		    	 inputs +="<td>...</td>";
		     };
		     inputs += "</tr>";
		     
		     inputs += "<tr><th>Default</th></tr>";
		     inputs += "<tr>";
		     if(property.defaultValue){inputs += "<td style='display:none;'>"+property.defaultValue+"</td>";}else {inputs +="<td>...</td>";};
		     
			 inputs += "</tr></table></td><tr>";
			 
		} 
		
	} else {
		return displayFunction( null, property );
	}
	
	return inputs;	
}

GlobalRuleUtils.showOrHideAllRulePropertiesDetails  = function(typeId) {	
	
	var typePropDetailButton = document.getElementById('type_prop_detail_button_' + typeId);
	var propDetailHide = ruleMapViaId[typeId].typeProperties
	
	for (var key in ruleMapViaId[typeId].typeProperties) {
		var propId = ruleMapViaId[typeId].typeProperties[key].id;
		var typeDetail = 'type_prop_detail_' + propId;
		var propDetailHide = document.getElementById(typeDetail).style.display == "none";
		if (propDetailHide == true) {
			$("#"+typeDetail).show();
		} else {
			$("#"+typeDetail).hide();
		}
	}
	
	if (propDetailHide == true) {
		typePropDetailButton.value = "Hide Details";
	} else {
		typePropDetailButton.value = "Show Details";		
	}
	
}



GlobalRuleUtils.UpdateForm    =    function ( type ) {
	var Form, type, formHeader, formFooter,  Props, inputs=''; 
	type = currentElement;
	Form = document.createElement('div');
	
	formHeader = "<form id='updateTypeDialog'>";
	currentElement = type;
    inputs += "<table id='ruleName'>";
    inputs += "<tr><td colspan='2'><input type='hidden' name='ruleId'  value='"+ type.id+"'></td></tr>";
    $.each(type, function(key, value) {
		
    	if (key == 'id') {
    		inputs += "<tr><th>"+key + "</th><td><input type='hidden' name ='"+key+"' value='"+value+"' /></td></tr>";
    	} else if (key == "name") {
    		inputs += "<tr><th>"+key + "</th><td><input type='text' name ='"+key+"' value='"+value+"'/>" +
    				"<input type='hidden' name ='oldName' value='"+value+"'/></td></tr>";
    	} else if (key == "classification") {
    		inputs += "<tr><th>"+key + "</th><td><input type='text' name ='"+key+"' value='"+value+"'/></td></tr>";
    	} 
	});
         
	
	Props = type.typeProperties;
	if (Props == null) {inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";}
	else {
		inputs += "<tr><th colspan='2' style='background-color: #CDEEDD'> Properties:</th></tr></table>";
		$.each(Props, function(key, value2) {
				inputs += "<table id='propertiesFields'>";
				$.each(value2, function(key,value){	
					if (key == 'id') {
						inputs += "<input type='hidden' name='propertyId' value='"+value+"'>";
					} else if (key == 'name') { 
						inputs += "<tr><th>"+key+"</th><td><input type='text' name='name' value='"+value+"'/></td></tr>";
					} else if (key == 'isMandatory' || key == 'isUnique') {
			    		inputs += "<tr><th>"+key +":</th>";
			    		inputs += "<td><input type='checkbox' name='" + key + "' ";
			    		if (value == true) {
			    			inputs += "checked";
			    		}
			    		inputs += "></td></tr>";
					} else if (key == 'propertyType') {
						inputs += "<tr><th>"+key+"</th><td><select name='" + key + "'><option value='INTEGER' ";
						
						if (value == "INTEGER") {
							inputs += "selected='selected'";
						} 
						inputs += ">INTEGER</option><option value='DOUBLE' ";
						
						if (value == "DOUBLE") {
							inputs += "selected='selected'";
						} 
						inputs += ">DOUBLE</option><option value='DATE' ";
						
						if (value == "DATE") {
							inputs += "selected='selected'";
						} 
						inputs += ">DATE</option><option value='STRING' ";
						
						if (value == "STRING") {
							inputs += "selected='selected'";
						} 
						inputs += ">TEXT</option><option value='BOOLEAN' ";
						
						if (value == "BOOLEAN") {
							inputs += "selected='selected'";
						} 
						inputs += ">BOOLEAN</option><option value='FILE' ";
						
						if (value == "FILE") {
							inputs += "selected='selected'";
						} 
						inputs += ">FILE</option><option value='CURRENCY' ";
						
						if (value == "CURRENCY") {
							inputs += "selected='selected'";
						} 
						inputs += ">CURRENCY</option></select></td></tr>";
						
					} else { 
						if((key != 'id')&& (key!='romeDecoPropId')&& (key != 'validValues')){
							inputs += "<tr><th>"+key+"</th><td><input type='text' name='"+key+"' value='"+value+"'/></td></tr>";
						}
					}
				});
				inputs += "<tr><td colspan='2'>---------------------------------</td></tr>";
				});
	}
		
	// <!-- Allow form submission with keyboard without duplicating the dialog button -->
	formFooter = "<tr><td><input type='button' value='Update ' class='btn btn-primary btn-xs'   onclick='GlobalRuleUtils.saveUpdate(form)' /></td>";
	
	formFooter += "<td><input type='button'  value='Cancel'     class='btn btn-primary btn-xs' onclick='(new DesignLogicalRenderer()).showProperties()'></td></tr><table></form>";
	
	Form.innerHTML = formHeader + inputs + formFooter;

	$("#create_type").dialog("open");
	$('#typecreateForm').empty();	
	$("#create_type").dialog("option", 'title','Update Link');
	$('#typecreateForm').append(Form);
			
}


	GlobalRuleUtils.saveUpdate = function ( form){
		
		var jsonData = {}, ruleproperties =[],jsonProperty = {}, decos = [], foundError=false, oldName, typeId, initcolor;
		
		$(form).find('table#ruleName').find(':input').each(function(i, field){		
			if ((field.type != 'submit') && (field.type != 'radio') || field.checked) {		
				if((field.name == 'id')||(field.name == 'oldName')||(field.name == 'name')|| (field.name == 'classification')){
					if(field.name =='name' && !field.value ){
						console.log("Missing Value for type Name.");
	          		    $('#typeForm').append("<br/><p style='color:red'>Missing Value for Type name : ");
	                    foundError= true;
					}					
					jsonData[field.name] = field.value;
				}
			}
		});
		
		
		
		ruleId = jsonData["ruleId"];
		
		if(foundError){
			return;
		}
		oldName= jsonData["oldName"];
	    delete jsonData['oldtypename'];
	    
	    
	    
//		ADD VALIDATION HERE
		$(form).find('table#propertiesFields').each(function(i, propDiv){
			$(propDiv).find(':input').each(function(i,field){
			        if ( field.type != 'submit' || field.value != 'Cancel') {
			        	
			        	if ((field.name == 'propertyType')&&(field.value == 'TEXT')) {
			        		jsonProperty[field.name] ='STRING';
			        	} else {
							if (field.name == 'isMandatory' || field.name == 'isUnique') {
								if (field.checked == true) {
									jsonProperty[field.name] = "true";
								} else {
									jsonProperty[field.name] = "false";
								}
							} else {
								jsonProperty[field.name] = field.value;
							}	
			        	}   	  
			}             
			});
			ruleproperties.push(jsonProperty); 
			jsonProperty = {};
		})
		jsonData.properties = ruleproperties;
		console.log(jsonData);
		
		// update  link 
		// update proprties
		var newproperties = [], newruleproperty={}, retproperties=[];
		var error = false;
		var jsonDatarule = {};
		$.each(ruleproperties, function(key, value) {
			jsonDatarule["updateProperty"] = value;
			jsonDatarule["ruleId"]         = Number(ruleId);
			jsonDatarule["namespace"]      = loggedInUserName;
			jsonDatarule["groupname"]      = userGroup.name;
			jsonDatarule["grouphost"]      = userGroup.host;
			var successFunction = function( data ) {
			
				tdvCy.filter('node[name="' + data.name + '"]').data(data);
				console.log("Link Properties update success. data: " + data.name);
										
				tdvCy.$('#' + data.id + '').data('name', data.name);
				
			};
			
			var failFunction = function( xhr, status, error ) {
				(new DesignLogicalRenderer()).emptyAll();
				document.getElementById('typeForm').append("Error Type properties not updated");
			};
			
			var ruleapis = new ConnectionApis();
			ruleapis.updateLinkProperty( jsonDatarule,  successFunction, failFunction );	
		
		});
		
		if(!error){
            ruleMapViaId[ruleId].typeProperties = retproperties;
//			$("#create_type").dialog("option", "title","Link Details");
			$('#typeForm').empty();
//			GlobalRuleUtils.displayProperties( $('#typeForm'), ruleMapViaId[ruleId], true );
			
			var result = GlobalRuleUtils.displayProperties(  ruleMapViaId[ruleId], true );
			$("#typeForm").append(result);
			
		}
		
		
		
	}
	
	//======================================================================================
	
	GlobalRuleUtils.saveLinkProperties = function (form ){
		var jsonData = {}, ruleProperties = [], property={}, rulename, ruleId;
		//  Retrieve type fields from form
		$(form).find('div#ruleName').find(':input').each(function(i,field){
			jsonData[field.name] =field.value;
		});
	
		rulename= jsonData["rulename"];
		ruleId = jsonData["ruleid"];
		
		delete jsonData['rulename'];
	    
	  // Retrieve Type properties fields from form

		$(form).find('div#propertiesFields').find('div').each(function(i, propDiv){
			$(propDiv).find(':input').each(function(i, field){
				if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
					if (field.name == 'isMandatory' || field.name == 'isUnique') {
						if (field.checked == true) {
							property[field.name] = 'true';
						} else {
							property[field.name] = 'false';
						}
					} else {
						property[field.name] = field.value;
					}		
				}
			});
			
			ruleProperties.push(property);
			property ={};
		});
		//	attach properties to JSON
		rulename = ruleId.slice(4);
		console.log(jsonData);
		var newproperties = [],  retproperties= {};
		var error = false;
		jsonData = {};
		$.each(ruleProperties, function(key, value) {
			newproperties.push(value);
			jsonData["fields"] = newproperties;
		    jsonData["ruleid"]= Number(rulename);
		    jsonData["namespace"] = loggedInUserName;
			var successFunction = function( data ) {
				console.log("Type Properties create success. data: " + data.name);
	             console.log(data.typeProperties);
				retproperties = data.typeProperties;
			
			};
			
			var failFunction = function( xhr, status, error ) {
			    error = true;
				document.getElementById('typeForm').append("Error Link properties not saved");	
			};
			
			var ruleapis = new ConnectionApis();
			ruleapis.addLinkProperty(  jsonData, loggedInUserName, successFunction, failFunction)
			newproperties = [];
		});
		
		
		if(!error){
			console.log(retproperties);
			console.log(rulename);
            ruleMapViaId[rulename].typeProperties = retproperties;

			$('#typeForm').empty();
			GlobalRuleUtils.displayProperties( $('#typeForm'), ruleMapViaId[rulename], true );	
			
//			var result = GlobalRuleUtils.displayProperties(  ruleMapViaId[rulename], true );
//			$("#typeForm").append(result);
			
		}
		
		
	}

