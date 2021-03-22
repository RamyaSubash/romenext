function FormTypePropertyUtils(){
	
};
//Used by FormView

FormTypePropertyUtils.displayAddPropertyForm = function( appendTo, type, property, displayFunc ) {
	
	var input = "";
	
	if( displayFunc == null ) {
		input = "<form id='add_property_form' onsubmit=''>";		

		input += "<input type='add_property_hidden_type_id' value='" + type.id + "'/>";
		
		 newProperty = document.createElement('div');
		 input = "<hr/><table>";
		 input += "<tr><th>Name</th><th>Type</th><th>Default Value</th><th>Is Mandatory</th><th>Is Unique</th><th>Max Value</th><th>Min Value</th><th></th></tr>";
		 
		 input += "<tr>";
		 input += "<td><input type='text' id='" + type.id + "_add_property_propertyName'  /></td>";
		 
		 input += "<td><select id='" + type.id + "_add_property_propertyType'>" +
		 		"<option value='STRING'>TEXT</option>"+
		 		"<option value='INTEGER'>INTEGER</option>"+
				"<option value='DOUBLE'>DOUBLE</option>"+
				"<option value='DATE'>DATE</option>"+
				"<option value='BOOLEAN'>BOOLEAN</option>"+
				
				"</select></td>";
		 
		 input += "<td> <input type='text' id='" + type.id + "_add_property_defaultValue'   /></td>";		 

		 input += "<td><input type='radio' name='" + type.id + "_add_property_isMandatory'    value='true' checked='checked'/>Yes<br>";
		 input += "<input type='radio' name='" + type.id + "_add_property_isMandatory'        value='false' />No</td>";
		 		 
		 input += "<td><input type='radio' name='" + type.id + "_add_property_isUnique'  value='true' checked='checked'/>Yes<br>";
		 input += "<input type='radio' name='" + type.id + "_add_property_isUnique'      value='false' />No</td>";
		 	
		 input += "<td> <input type='text' id='" + type.id + "_add_property_maxValue'   /></td>";
		 input += "<td> <input type='text' id='" + type.id + "_add_property_minValue'   /></td>";
		 
		 input += "<td><input type='button' value='Save' class='btn btn-primary btn-xs'    onclick='FormTypePropertyUtils.saveAddPropertyForm(" + type.id + ");'/></td>";
		  
		 input += "</tr></table>";
		 input += "</form>";
	} else {
		input += displayFunc( appendTo, type, property );
	}		
	 return input;
};

FormTypePropertyUtils.displayFinalTypeProperties = function( appendTo, type, showTypeInfo, typeDisplayFunction, propertiesDisplayFunction, propertyDisplayFunction, footerDisplayFunction ) {
	
	console.log("Inside displayFinalTypeProperties");
	var header = "";
	var inputs = "";
	var footer = "";

	if( showTypeInfo ) {
		if( typeDisplayFunction == null ) {
				header = "<table>";
				$.each(type, function(key, value) {
					
					if(key == 'name')  {
						header += "<tr><th>" + key + "</th>";
						if (value == '') {
							header += "<td colspan='7' align='left' >None</td><tr>"; 
						} else { 
							header += "<td colspan='7' align='left' >" + value + "</td><tr>";	
						}
					};
					if (key == 'isRoot') {
						header += "<tr><th>"+key +":</th>";
						header += "<td colspan='7' align='left' ><input type='radio' name='isRoot' ";
						if (value == true) { 
							header += " value='true'  checked='checked' disabled='disabled' >true </td></tr>";
						} else { 
							header += " value='false' disabled='disabled'  >false </td></tr>";     
						}
					}
					
					if( key == 'sysProperties' ){
						if( value.restrictionStatus) {
							header += "<tr><th>Restriction Status :</th>";
							header += "<td colspan='7' align='left' disabled='disabled'  ><input type='text'  ";
							if(value.restrictionStatus.value == 'ROOTONLY'){
								header+= " value='ROOTONLY' disabled ></td></tr>";
							}else {
								header += "value=''  disabled='disabled' ></td></tr>";
							}
						}
					};
				});
		} else {
			header = typeDisplayFunction( type );
		}	
	}
	
	if( propertiesDisplayFunction == null ) {                                                                             //propertyTableFunct 
		// generate the properties fields
		var props = type.typeProperties;	
		
		if ( props == null || props.length == 0 || $.isEmptyObject(props)) {
			inputs += "<tr><th colspan='8'> No properties added </th></tr></table>";
		} else {	
			inputs += "<tr><th colspan='8' style='background-color: #CDEEDD'>Properties:</th></tr>";
			
			$.each(props, function(key, value) {
				var newInput = FormTypePropertyUtils.displayTypeProperty( value, propertyDisplayFunction );
				inputs += newInput ;
			});
			
			var footerupdate =  "<input type='button' value='Update Type'    class='btn btn-primary btn-xs'   onclick=\"(new FormRenderer() ).updateTypeForm("+type.id+");\"/>";
			inputs += footerupdate;			
		} 
	} else {
		inputs = propertiesDisplayFunction( type.typeProperties, propertyDisplayFunction );
		
	}

	if( footerDisplayFunction == null ) {
		// build out footer if neccessary	
		footer  = "</table>";
		footer += "<input type='button' value='Update Type'    class='btn btn-primary btn-xs'    onclick=\"(new FormRenderer() ).updateTypeForm("+type.id+");\"/>";
	} else {
		footer = footerDisplayFunction( type );
	}
	
	appendTo.innerHTML += header + inputs + footer;
};


FormTypePropertyUtils.displayTypeProperty = function( property, displayFunction  ) {

	var inputs = "";
	
	if( displayFunction == null ) {
		// generate the properties fields
		console.log("Generate properties fields ");
		if ( property == null ) {
			// inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";
		} else {	
			 inputs += "<tr style='background-color: lightgrey'><th> Name</th><th>Type</th><th>Default</th></tr>";
			 //  added other values
			 
		     inputs += "<tr><td>" + property.name + "</td>";
		     if( property.propertyType == 'STRING' ) {
		    	 inputs += "<td>TEXT</td>";
		     } else {
		    	 inputs +="<td>" + property.propertyType + "</td>";
		     }
		     
		     if(property.defaultValue){inputs += "<td>"+property.defaultValue+"</td>";}else {inputs +="<td></td>";};
		     inputs += "</tr>";
			
		     inputs += "<tr><td><button id='type_prop_detail_button_"+property.id+"' onclick=\"showOrHideTypePropDetails('"+property.id+"')\">Show Details</button></td></tr>";

		     
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
		     
			 inputs += "</tr></table></td><tr>";		 
			 inputs += "<tr><td><hr COLOR='black'></td></tr>";
		} 		
	} else {
		return displayFunction( null, property );
	}
	
	return inputs;	
}



FormTypePropertyUtils.displayUpdateTypeProperty = function( property, displayFunction  ) {
	
	var inputs = "";
	
	if( displayFunction == null ) {
		// generate the properties fields
		
		if ( property == null ) {
			// inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";
		} else {	
			console.log(" I am in 123 ");
			 inputs += "<tr style='background-color: grey'><th> Name</th><th>Type</th><th>Default</th></tr>";
			 //  added other values
		     
		     inputs += "<tr class='updateProperty' id='"+property.id+"'>" ; 
		     
		     inputs +="<td><input type='hidden' id='currentPropertyName'   value='"+ property.name + "'/>";
		     inputs +="<input type='text' id='propertyName' value='"+ property.name + "' /></td>";             // user cannot update propertyName

		     inputs += "<td><input type='text' id='propertyType'   value='";
		     if( property.propertyType == 'STRING' ) {
		    	 inputs += "TEXT' /></td>";
		     } else {
		    	 inputs += property.propertyType + "/></td>";
		     }	     	   	    
		       	     
		     if(property.defaultValue){inputs += "<td><input type='text' id='defaultValue'  value='"+property.defaultValue+"'/> </td>";}
		     else {inputs +="<td><input type='text' id='defaultValue' value=''/></td>";};
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
		     
			 inputs += "</tr></table></td><tr>";			 
			 inputs += "<tr><td><hr COLOR='black'></td></tr>";
		} 
		
	} else {
		return displayFunction( null, property );
	}
	
	return inputs;	
}



//===========================================================================
FormTypePropertyUtils.resetAddPropertyForm = function( typeid ) {
	
	$('#' + typeid + '_add_property_propertyName').val("");
	$('#' + typeid + '_add_property_propertyType').val("STRING");
	$('#' + typeid + '_add_property_isMandatory').val(['true']);
	$('#' + typeid + '_add_property_isUnique').val(['true']);
	$('#' + typeid + '_add_property_defaultValue').val("");
	$('#' + typeid + '_add_property_maxValue').val("");
	$('#' + typeid + '_add_property_minValue').val("");
	
};

// only used by Form Design View 

FormTypePropertyUtils.saveAddTypeForm = function(){
	
    var typeName = $('#add_type_name').val();
    
//    if(typeMap[typeName] ){
//    if( TypePropertyUtils.checkDuplicateTypeName (typeName) ){	
//    	
//    	document.getElementById('add_type_name').style.backgroundColor = "yellow";
//    	$('#error_createType').empty();
//    	$('#error_createType').append("<p style='color:red'> Duplicate Type Name; Please change it</p>");
//    	return;
//    }
	
	var typeIsRoot = null;
	if (document.getElementById('add_isRoot').checked == true) {
		typeIsRoot = 'true';
	} else {
		typeIsRoot = 'false';
	}

	var restrictionStatus = $('#add_restrictionStatus').val();
	console.log( restrictionStatus);
	
	var typeClassification = $('#add_classification').val();
	var typeOwner = $('#add_owner').val();	
	var typeDecos = [];
	if (document.getElementById('geo_activator').checked == true) {
		typeDecos.push(document.getElementById('geo_activator').value);
	}
	
	if (typeName == '' || typeName == null || typeName == 'Enter a Value') {		
		 document.getElementById('add_type_name').style.backgroundColor = "yellow";                 // Higlight error
		 $('#error_createType').empty();
	     $('#error_createType').append("<p style='color:red'> Missing Type Name; Please enter it</p>");
	     return;
	}
	if(restrictionStatus ){
		TypeUtils.addTypeWithRestrictionStatus(typeName, typeIsRoot, typeOwner, typeClassification, typeDecos, restrictionStatus);
	}else {
		TypeUtils.addType(typeName, typeIsRoot, typeOwner, typeClassification, typeDecos);
	}	
	( new FormRenderer() ).selectedType(listTypeIds[0]);			
	
	
}


FormTypePropertyUtils.saveAddPropertyForm = function( typeid, pretext ) {
	
	// grab the new values
	var propName = $('#'+pretext + typeid + '_add_property_propertyName').val();
	var propType = $('#'+pretext + typeid + '_add_property_propertyType').val();
	
	var isMandatory = $('input[name='+pretext+typeid +'_add_property_isMandatory]');
	var propIsMandatory = isMandatory.filter(':checked').val();	
	console.log("value of isMandatory "+propIsMandatory );
	
	var isUnique = $('input[name='+pretext+typeid+'_add_property_isUnique]'); 
	var propIsUnique = isUnique.filter(':checked ').val();
	console.log("value of isUnique "+propIsUnique );
	
	var propDefaultValue = $('#'+pretext + typeid + '_add_property_defaultValue').val();
	var propMaxValue = $('#'+pretext + typeid + '_add_property_maxValue').val();
	var propMinValue = $('#'+pretext + typeid + '_add_property_minValue').val();
	
	errorStatus = false;
//    Ensure at least name is entered
    if( propName == '' || propName == null ) {		
		 document.getElementById(pretext+typeid + '_add_property_propertyName').style.backgroundColor = "yellow";
		 errorStatus = true;
    
    } else {
		// create the type property object
		var newProperty = new TypePropertyObject(null, propName, null, propMaxValue, propMinValue, propDefaultValue, propIsMandatory, propIsUnique, propType );
			
		// grab the json data object
		var jsonData = newProperty.generateJSONPayloadForAPI();
		
		// grab the type object
		var typeObj = typeMapViaId[ typeid ];
		var typePropertyApi = new TypePropertyApi();
				
		var successFunction = function( data ) {
			console.log("data found :" + data );
			
			// if we succeeded, we need to 
			// 1. clear the add property form
			// 2. update the current type/property global vars
			
			FormTypePropertyUtils.resetAddPropertyForm( typeid );
			TypeUtils.updateCacheType( data );
	
		};
		
		var failFunction = function( xhr, status, error ) {
			console.log("error found : " + error );
		};
		
		typePropertyApi.addTypeProperties(typeObj, jsonData, successFunction, failFunction);
    }
	 
};
FormTypePropertyUtils.addProperties = function( connId ,   typeId){
	var connInfo = connMapViaId[connId];
	var pretext = 'conn_';
	var newProperty , properties = '';
	
	 newProperty = document.createElement('div');
	 newProperty.setAttribute('class', 'add_conn_property');
	 
	 properties = "<hr/><form><table>";
	
	 properties += "<tr><th>Name :</th><td><input type='text' id='conn_"+ connInfo.id +"_add_property_propertyName' size='10' /></td></tr>";
	 properties += "<tr><th>Type:</th>";
	 properties += "<td><select id='conn_"+ connInfo.id +"_add_property_propertyType'  onchange=\"FormRelationshipUtils.updateDefaultField("+connInfo.id+", \'"+pretext+"\')\"   >" +
                        "<option value='STRING'>TEXT</option>"+
                        "<option value='INTEGER'>INTEGER</option>"+
                        "<option value='DOUBLE'>DOUBLE</option>"+
                        "<option value='DATE'>DATE</option>"+
                        "<option value='BOOLEAN'>BOOLEAN</option>"+
                        "<option value='FILE'>FILE</option>"+
                        "<option value='CURRENCY'>CURRENCY</option>"+
                        "</select></td></tr>"; 
	 
	 properties += "<tr><th>Default Value:</th><td> <input type='text' id='conn_"+ connInfo.id +"_add_property_defaultValue'  defaultValue='' value='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);' /></td></tr>";
	 
	 properties += "<tr><th> isMandatory:</th>";
	 properties += "<td><input type='radio' name='conn_"+ connInfo.id +"_add_property_isMandatory' value='true' checked='checked'/>Yes<br/>";
	 properties += "<input type='radio' name='conn_"+ connInfo.id +"_add_property_isMandatory' value='false' />No</td></tr>";
	 
	 properties += "<tr><th> isUnique: </th>";
	 properties += "<td><input type='radio' name='conn_"+ connInfo.id +"_add_property_isUnique' value='true' checked='checked'/>Yes<br/>";
	 properties += "<input type='radio' name='conn_"+ connInfo.id +"_add_property_isUnique' value='false' />No</td></tr>";
	 
	 properties += "<tr><th>Min Value:</th><td> <input type='text' id='conn_"+ connInfo.id +"_add_property_minValue' /></td></tr>";		         
     properties += "<tr><th>Max Value:</th><td> <input type='text' id='conn_"+ connInfo.id +"_add_property_maxValue' /></td></tr>";
	 properties += "</table></form>";
	 			 
	 newProperty.innerHTML = properties;
	 document.getElementById('connPropertiesFields').appendChild(newProperty);	
	
}
FormTypePropertyUtils.cancelAddChild = function (  ) {
	var div = $(".addChildRow");			
	div.remove();
}
FormTypePropertyUtils.cancelAddSibling = function (  ) {
	var div = $(".addSiblingRow");			
	div.remove();
}

FormTypePropertyUtils.cancelAddParent = function (  ){
	var div = $(".addParentRow");			
	div.remove();
}

FormTypePropertyUtils.cancel = function ( typeid ){
	( new FormRenderer() ).updateCachedFormType( typeid );
}

FormTypePropertyUtils.saveNodeParentChildSiblingWithConnection = function (   typeId,  typeNode ){
	
	var errorMessage = 0;                                      // typeNode values are :  'Parent' , 'Child' or 'Sibling' 
	var classText = '',  ruleClassification;
	switch ( typeNode ){
		case 'Parent'  :    classText ='addParentRow';  
							ruleClassification = "parentchild";
		                    break;
		case 'Child'   :    classText ='addChildRow';  
							ruleClassification = "parentchild";
							break;
		case 'Sibling' :    classText ='addSiblingRow';  
							ruleClassification = "link";
							break;
		default: console.log('Error can not proceed '); return;
	}
	// show a new table under neith the last row of the table for parents	
	if($( "."+ classText  ).length == 0) {	
		// if no parent rows are found, is this an error?
		console.log("No "+ typeNode + "Type rows were found! X843843");
	} else {
		//====================================== get rule info 
		var ownerId = "123";
				
		//===================================== get type info
		var typeName = $('#'+classText+'_'+typeId+'_name').val();
		if(!typeName){
			  $('input[id="'+classText+'_'+typeId+'_name"]').val('Missing Name');
			  errorMessage++;			
		}
		
		var typeClassification = $('#'+classText+'_'+typeId+'_classification').val();
		console.log( typeClassification );
		var typeIsRoot = null;
		if (document.getElementById(classText+'_'+typeId+'_isRoot').checked == true) {	
			typeIsRoot = 'true';
		} else {
			typeIsRoot = 'false';
		}
		var restrictionStatus = null;
		if (document.getElementById(classText+'_'+typeId+'_restrictionStatus').checked == true) {	
			restrictionStatus = 'ROOTONLY';
		} else {
			restrictionStatus = '';
		}
		
		//=================================== get connection info	
		var minRel =  $('#'+classText+'_'+typeId+'_minRel').val();
		if(!minRel){
			  $('input[id="'+classText+'_'+typeId+'_minRel"]').val('Missing value');
			  errorMessage++;	
		}
		var maxRel =  $('#'+classText+'_'+typeId+'_maxRel').val();
		if(!maxRel){
			  $('input[id="'+classText+'_'+typeId+'_maxRel"]').val('Missing value');
			  errorMessage++;	
		}							

		if( errorMessage == 0  ){             
			var typeDecos = [];
			if (!restrictionStatus) {
				TypeUtils.addType(typeName, typeIsRoot, ownerId, typeClassification, typeDecos);
			} else {
				TypeUtils.addType(typeName, typeIsRoot, ownerId, typeClassification, typeDecos, restrictionStatus);
			}
			var destination, origin;
			var div = $("."+ classText);
			div.remove();
			switch ( typeNode ){
				case 'Parent'  : 	destination = typeId;
									origin      = listTypeIds[0];
					                break;
				case 'Child'   :    destination = listTypeIds[0];
								    origin      = typeId;   				
					                break;
				case 'Sibling' :    destination = listTypeIds[0];
									origin      = typeId;   
									break;
				default: 
			}
			
			TypeUtils.addConnection(origin, destination, ruleClassification, minRel, maxRel );
			( new FormRenderer() ).updateParentChildrenSibling(listTypeIds[0]);			
			( new FormRenderer() ).populateConnectTo(listTypeIds[0]);
		}
	}			
}


FormTypePropertyUtils.saveUpdateTypePropertyForm = function( typeid ) {
	
	// grab the new values
	 if(!typeid) {
	 	  console.log(" No type Id defined ");
	 	  return null;
	   }  
	var typename         = $('#name_'+typeid).val();
	var classification   = $('#classification_'+typeid).val();
	var isRoot = null;
	if (document.getElementById('isRoot_'+typeid).checked == true) {
		isRoot = 'true';
	} else {
		isRoot = 'false';
	}
	
	
//	var restrictionStatus = null;
//	if (document.getElementById('restrictionStatus_'+typeid).checked == true) {
//		restrictionStatus = 'true';
//	} else {
//		restrictionStatus = 'false';
//	}
//	
//	console.log("restrictionStatus " + restrictionStatus);
	var owner            = $('#owner').val();	
	var decorators =[];		
	console.log("Type values are: "+ typename + '  '+ classification +'  '+ isRoot + '   ' + owner  );
	
	var properties =[];	
	if($( ".updateProperty" ).length == 0) {
	}else {		
		$("tr.updateProperty").each(function(row, tr){			
			var propertyId          =  tr.id.split("_")[0];
			console.log("propertyId is: "+ propertyId);
			
			var currentPropName     = $("#currentPropertyName", this).val();
			var propName            = $("#propertyName", this).val();
			var propType            = $("#propertyType", this).val();
			var propDefaultValue    = $("#defaultValue_"+propertyId, this).val();
			var propMinValue        = $("#minValue", this).val();
			var propMaxValue        = $("#maxValue",this).val();	
					
			var propIsMandatory = $('input[name=isMandatory_'+propertyId+']:checked').val();		
//			console.log("value of isMandatory "+propIsMandatory );
						
		
			var propIsUnique = $('input[name=isUnique_'+propertyId+']:checked').val();		
//			console.log("value of isUnique_ "+propIsUnique );
									
			console.log("Properties values are : "+propName+"   "+propType+"    "+propIsMandatory+"    "+propIsUnique+"   "+ propMinValue +"   "+ propMaxValue);
			
			if(propType == 'TEXT') { propType = 'STRING'};
			if(propDefaultValue == 'n/a') {propDefaultValue = ''};
			if(propMinValue == 'n/a'){propMinValue = '' };
			if(propMaxValue == 'n/a'){propMaxValue = '' };
			
			var newProperty = new TypePropertyObject(propertyId, propName, null, propMaxValue, propMinValue, propDefaultValue, propIsMandatory, propIsUnique, propType );			
			var jsonProperty = newProperty.generateJSONPayloadForAPI();

			console.table(jsonProperty);
			jsonProperty[0]["currentPropertyName"]= currentPropName;
			properties.push(jsonProperty[0]);
		})		
	};

	
	TypeUtils.updateType( typeid, typename, isRoot, owner, classification, decorators, properties   );
	
	
//	if (!restrictionStatus) {
//		TypeUtils.updateType(typeid, typename, isRoot, owner, classification, decorators, properties);
//	} else {
//		TypeUtils.updateType(typeid, typename, isRoot, owner, classification, decorators, properties, restrictionStatus);
//	}
	
};

FormTypePropertyUtils.saveConnProperties = function  ( connId , typeId){
	var connectionId         = $('#connid').val();
	var connectionName       = $('#connname').val();	
	var connProperties = [], property = {}; 
	
	console.log(" connection Id is: "+ connectionId + " connection Name is "+ connectionName);
	var errorStatus = false;
	$("div.add_conn_property").each(function(row, tr){	
		var propName            = $("#conn_"+connId+"_add_property_propertyName", this).val();
		var propType            = $("#conn_"+connId+"_add_property_propertyType", this).val();	
		var propDefaultValue    = $("#conn_"+connId+"_add_property_defaultValue", this).val();
		var propIsMandatory     = $('input[name=conn_'+connId+'_add_property_isMandatory]:checked').val();	
		var propIsUnique        = $('input[name=conn_'+connId+'_add_property_isUnique]:checked').val();				
		var propMinValue        = $("#conn_"+connId+"_add_property_minValue", this).val();
		var propMaxValue        = $("#conn_"+connId+"_add_property_maxValue",this).val();	
					
		 if( propName == '' || propName == null ) {		
			 document.getElementById('conn_'+connId + '_add_property_propertyName').style.backgroundColor = "yellow";
			 errorStatus = true;
	    
	    } else {
			// create the type property object							
	    	property["propertyName"]	= propName;
	    	property["propertyType"]	= propType;
	    	property["isMandatory"]  	= propIsMandatory;	
	    	property["isUnique"]	    = propIsUnique;
	    	property["defaultValue"]	= propDefaultValue;
	    	property["minValue"]	    = propMinValue;
	    	property["maxValue"]	    = propMaxValue;
			
			console.log(property);			
			connProperties.push(property);
			property ={};
	    }
		
	});
		
	var connObj = connMapViaId[ connectionId ];
	var jsonData = {};	
	jsonData = connProperties;
	
	var successFunction = function( data ) {
		
		console.log("Rule Properties created successuly. data: " + data.name);			
	  	ruleMap = {};                            // could just save typeProperties in the corresponding rule inside ruleMapViaId
	  	ruleMapViaId = {};
	  	GlobalUtils.loadAllRules();
	  		  	
	  	$('div#typeFormRuleUpdateDiv_'+typeId).empty();	  		  	
	  	( new FormRenderer() ).cancelUpdateConn(typeId);
	};
	
	var failFunction = function( xhr, status, error ) {
		$('#console-log').append("<p style='color:red'>Error Rule properties not saved: " + xhr.responseText);
	};

	var connApis = new ConnectionApis();	
	connApis.addRuleProperties(connObj, jsonData, successFunction, failFunction);	
}



FormTypePropertyUtils.updateConnectionAndProperties = function ( connId, typeId ){
	// retrieve  connection  Info
	var connInfo = connMapViaId[connId];
	var oldName  = connMapViaId[connId].name;
	var jsonData = {};
	var error = false;
	if(!( $('#name_'+connId+'_updateConn').val())) { document.getElementById('name_'+connId+'_updateConn').style.backgroundColor = "yellow"; error = true; }
	if(!( $('#minRel_'+connId+'_updateConn').val())) { document.getElementById('minRel_'+connId+'_updateConn').style.backgroundColor = "yellow"; error = true;   }
	if(!( $('#maxRel_'+connId+'_updateConn').val())) { document.getElementById('maxRel_'+connId+'_updateConn').style.backgroundColor = "yellow"; error = true;  }
	
	// retrieve  rule properties
	var connProperties =[], property = {};	
	if($( ".updateProperty" ).length == 0) {
	}else {		
		$("tr.updateProperty").each(function(row, tr){			
			var propertyId          =  tr.id.split("_")[0];
			console.log("propertyId is: "+ propertyId);
			
			var currentPropName     = $("#currentPropertyName", this).val();
			var propName            = $("#propertyName", this).val();
			var propType            = $("#propertyType", this).val();
			var propDefaultValue    = $("#defaultValue_"+propertyId, this).val();
			var propMinValue        = $("#minValue", this).val();
			var propMaxValue        = $("#maxValue",this).val();	
					
			var propIsMandatory = $('input[name=isMandatory_'+propertyId+']:checked').val();		
			console.log("value of isMandatory "+propIsMandatory );
								
			var propIsUnique = $('input[name=isUnique_'+propertyId+']:checked').val();		
			console.log("value of isUnique_ "+propIsUnique );
									
			console.log("Properties values are : "+propertyId+"  "+propName+"   "+propType+"    "+propIsMandatory+"    "+propIsUnique+"   "+ propMinValue +"   "+ propMaxValue);
			
			
			if(propDefaultValue == 'n/a') {propDefaultValue = ''};
			if(propMinValue == 'n/a'){propMinValue = '' };
			if(propMaxValue == 'n/a'){propMaxValue = '' };
			
			 if( currentPropName == '' || currentPropName == null ) {		
				 document.getElementById('#currentPropertyName').style.backgroundColor = "yellow";
				 error = true;
		    
		    } else {
			
				property["propertyId"]      = propertyId;
				property["propertyName"]	= propName;
		    	property["propertyType"]	= propType;
		    	property["isMandatory"]  	= propIsMandatory;	
		    	property["isUnique"]	    = propIsUnique;
		    	property["defaultValue"]	= propDefaultValue;
		    	property["minValue"]	    = propMinValue;
		    	property["maxValue"]	    = propMaxValue;
				
		    	property["currentPropertyName"] = currentPropName;
	    	
				console.log(property);			
				connProperties.push(property);
		    }
				property ={};
		});
	}
	
	if(!error){
		// update connection 
		jsonData['name']           = $('#name_'+connId+'_updateConn').val();
		jsonData['minRel']         = parseInt($('#minRel_'+connId+'_updateConn').val());
		jsonData['maxRel']         = parseInt($('#maxRel_'+connId+'_updateConn').val());     			
		console.log(jsonData);
		
		var doneFunction = function( data ) {
			console.log('Update Connection done successfully ');
			console.log(data);			
			if(oldName != data.name){			
				delete connMapViaId[ connId ];	
				delete connMap[oldName];
			}
			
			var connBase = GlobalUtils.createInternalConnMap( data );
			error = true;
		};
			
		var failFunction = function( xhr, status, error ) {
			console.log('Error Update Connection not done: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Error Update Connection not done."+xhr.status+"</p>");
		};
		
		var apis = new ConnectionApis();			
		apis.saveUpdateConnectionById(connId, jsonData, doneFunction, failFunction);	
		
	}		
		// update rule properties
		
	if ( error ){
		jsonData = {};
		jsonData["properties"] = connProperties;
		if(  !$.isEmptyObject(connProperties) ){
			var doneFunction = function( data ) {
				console.log("Rule Properties created successuly. data: " + data.name);			
			  	ruleMap = {};                            // could just save typeProperties in the corresponding rule inside ruleMapViaId
			  	ruleMapViaId = {};
			  	GlobalUtils.loadAllRules();
			  	
			  	( new FormRenderer() ).updateParentChildrenSibling(listTypeIds[0]);
			 	( new FormRenderer() ).cancelUpdateConn(typeId);
			  	
			};
				
			var failFunction = function( xhr, status, error ) {
				console.log('Error Update Connection not done: ' + xhr.status);
				$('#console-log').append("<p style='color:red'>Error Update rule properties not done."+xhr.status+"</p>");
			};
			
			var apis = new ConnectionApis();			
			apis.updateRuleProperties(connInfo.rule, jsonData, doneFunction, failFunction);

		}else {
			// no properties to update
			( new FormRenderer() ).updateParentChildrenSibling(listTypeIds[0]);
			( new FormRenderer() ).cancelUpdateConn(typeId);
		  	
		}
		

	}
										
}






