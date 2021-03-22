
function ContextMenuFunctions() {
}



//ContextMenuFunctions.addRowProperty = function() {
//
//	var $TABLE = $('#tableProp');
//	var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide');
//	$TABLE.find('.table').append($clone);
//
//
//}

//ContextMenuFunctions.removeRowProperty = function(ele) {
//
//	$(this).parents('tr').detach();
//}

//ContextMenuFunctions.displayTypeProperties = function(type, showTypeInfo, typeDisplayFunction, propertyDisplayFunction) {
//
//	// ************************* EDITABLE TABLE *******************************************//
//	//	var form = document.createElement('div');
//	//    form.className  = 'table-editable';
//	//    form.id         = "tableProp"
//	//    form.innerHTML  = "";
//	//    var inputs     = "";
//	//	var headerTable  = '';
//	//	var props        = type.typeProperties; 
//	//	    headerTable +=  "<div class='caption'  id='typeName'> <span class='badge' style='color:black; background:"+ type.color + ";' id='t_"+ type.id +"'>"+type.name+ "</span></div>";
//	//	    headerTable +=  "<span class='table-add glyphicon glyphicon-plus' onclick='ContextMenuFunctions.addRowProperty()'></span>";
//	//	    headerTable +=  "<table class='table'>";
//	//	    headerTable +=  "<tr class='header-row'><th>name</th><th>propertyType</th><th>isMandatory</th><th>isUnique</th><th>minValue</th><th>maxValue</th><th></th><th></th></tr>";
//	//	
//	//	    if( !$.isEmptyObject(props) ) 	 {
//	//			$.each(props, function(key, value) {
//	//			
//	//					inputs += "<tr id='row_"+value.id+"'>";
//	//					
//	//					// name
//	//					if (value.isMandatory == true) {
//	//					      inputs += "<td contenteditable='true' style='color:red'>";
//	//					} else    {
//	//						  inputs += "<td contenteditable='true' >";
//	//					}        
//	//					 inputs += "<input type='hidden' name='propertyId' value='"+ value.id +"'/>" + value.name+ "</td>";
//	//				
//	//					// proprtyType	 
//	//					inputs += "<td contenteditable='true'>";
//	//
//	//					if (value.propertyType == "STRING") {
//	//						inputs += "TEXT</td>";
//	//					}else {
//	//						inputs += value.name+ "</td>";
//	//					}
//	//					
//	//					
//	//					// mandatory
//	//					inputs += "<td contenteditable='true'>";				 
//	//					if( value.isMandatory == 'true'){
//	//						inputs += "true</td>";
//	//					}else {
//	//						inputs += "false</td>";
//	//					}				   
//	//				  
//	//				    
//	//				    // isUnique
//	//					inputs += "<td contenteditable='true'>";				 
//	//					if( value.isUnique == 'true'){
//	//						inputs += "true</td>";
//	//					}else {
//	//						inputs += "false</td>";
//	//					}		
//	//				    	
//	//	
//	//				    // minValue
//	//					inputs += "<td contenteditable='true'>";				 
//	//						if( value.minValue){
//	//							inputs += value.minValue +"</td>";
//	//						}else {
//	//							inputs += "</td>";
//	//						}	
//	//					
//	//					inputs += "<td contenteditable='true'>";				 
//	//					if( value.maxValue){
//	//						inputs += value.maxValue +"</td>";
//	//					}else {
//	//						inputs += "</td>";
//	//					}	
//	//				   
//	//					inputs += "<td><span class='table-update glyphicon glyphicon-floppy-save'></span></td>";
//	//					inputs += "</tr>";
//	//					
//	//                   
//	//			
//	//			});
//	//     }
//	//	       inputs += "<tr class='hide' id='add_property'><td contenteditable='true'></td><td contenteditable='true'></td><td contenteditable='true'></td>"+
//	//	                 "<td contenteditable='true'></td><td contenteditable='true'></td><td contenteditable='true'></td>"+
//	//	                 "<td><span class='table-update glyphicon glyphicon-floppy-save' onclick='ContextMenuFunctions.saveRowProperty() '></span></td>"+
//	//	                 "<td><span class='table-remove glyphicon glyphicon-remove' onclick='ContextMenuFunctions.removeRowProperty(this) '></span></td></tr></table>";
//	//   
//	//	    
//
//
//	// ************************* DIVISION TABLE *******************************************//
//
//	//	var form = document.createElement('div');
//	//    form.className = 'rTable';
//	//    form.innerHTML = "";
//	//    var formHeader = "";
//	//    var inputs     = "";
//	//    var props      = type.typeProperties;
//	//    formHeader += "<form><div class='rTableHead'  id='typeName'> <span class='badge' style='color:black; background:"+ type.color + ";' id='t_"+ type.id +"'>"+type.name+ "</span>";
//	//    formHeader += "<input type='hidden' name='typeId' value='"+type.id+"'/></div>"
//	//    formHeader += "<div class='rTableRow'><div class='rTableHead'>Field Name</div><div class='rTableHead'>Field Type</div>"+
//	//                  "<div class='rTableHead'>IsMandatory</div><div class='rTableHead'>IsUnique</div>"+
//	//                  "<div class='rTableHead'>minValue</div><div class='rTableHead'>maxValue</div><div class='rTableHead'>Action</div></div>";
//	//        
//	////        
//	////     if ($.isEmptyObject(props)) {
//	////    	 inputs += "<div class='rTableRow'>"+
//	////                       "<div class='rTableCell rTableCellEmpty'></div><div class='rTableCell rTableCellEmpty'></div><div class='rTableCell rTableCellEmpty'></div>"+
//	////                      "<div class='rTableCell rTableCellEmpty'></div><div class='rTableCell rTableCellEmpty'></div><div class='rTableCell rTableCellEmpty'></div>"+
//	////        
//	////                    "<div class='rTableCell'><button onclick=\"saveProperty();\"  id='checkbox'/>Add</button></div></div>";
//	////     } else {
//	////    	 
//	////    	 
//	//     if( !$.isEmptyObject(props) ) 	 {
//	//			$.each(props, function(key, value) {
//	//			
//	//					inputs += "<div class='rTableRow' id='row_"+value.id+"'>";
//	//					
//	//					// name
//	//					if (value.isMandatory == true) {
//	//					      inputs += "<div class='rTableCell' style='color:red'>";
//	//					} else    {
//	//						  inputs += "<div class='rTableCell'>";
//	//					}        
//	//					 inputs += "<input type='hidden' name='propertyId' value='"+ value.id +"'/><input type='text' name='name'  size='20' value='" + value.name+ "'/> </div>";
//	//				
//	//					// proprtyType	 
//	//					
//	//					inputs += "<div class='rTableCell'><select name='propertyType'><option value='STRING' ";
//	//
//	//					if (value.propertyType == "STRING") {
//	//						inputs += "selected='selected'";
//	//					}
//	//					inputs += ">TEXT</option><option value='INTEGER' "
//	//					if (value.propertyType == "INTEGER") {						
//	//						inputs += "selected='selected'";
//	//					}
//	//					inputs += ">INTEGER</option><option value='DOUBLE' ";
//	//
//	//					if (value.propertyType == "DOUBLE") {
//	//						inputs += "selected='selected'";
//	//					}
//	//					inputs += ">DOUBLE</option><option value='DATE' ";
//	//
//	//					if (value.propertyType == "DATE") {
//	//						inputs += "selected='selected'";
//	//					}
//	//					inputs += ">DATE</option><option value='BOOLEAN' ";
//	//
//	//					if (value.propertyType == "BOOLEAN") {
//	//						inputs += "selected='selected'";
//	//					}
//	//					inputs += ">BOOLEAN</option><option value='FILE' ";
//	//
//	//					if (value.propertyType == "FILE") {
//	//						inputs += "selected='selected'";
//	//					}
//	//					inputs += ">FILE</option><option value='CURRENCY' ";
//	//
//	//					if (value.propertyType == "CURRENCY") {
//	//						inputs += "selected='selected'";
//	//					}
//	//						inputs += ">CURRENCY</option></select></div>";
//	//
//	//					// mandatory
//	//					inputs += "<div class='rTableCell'><select name='isMandatory'><option value='true' ";				 
//	//					if( value.isMandatory == 'true'){
//	//						inputs += "selected='selected'";
//	//					}
//	//					    inputs += ">True</option><option value='false' ";
//	//				    if( value.isMandatory == 'false'){
//	//						inputs += "selected='selected'";
//	//					}
//	//				    inputs  += ">False</option></select></div>"
//	//				    
//	//				    // isUnique
//	//				    inputs += "<div class='rTableCell'><select name='isUnique'><option value='true' ";			
//	//			    	if( value.isUnique == 'true'){
//	//						inputs += "selected='selected'";
//	//					}
//	//					    inputs += ">True</option><option value='false' ";
//	//				    if( value.isUnique == 'false'){
//	//						inputs += "selected='selected'";
//	//					}
//	//				    inputs  += ">False</option></select></div>"
//	//					    	
//	//				    	
//	//				    // minValue
//	//				    inputs += "<div class='rTableCell'><input type='text' name='minValue' ";			
//	//					if(value.minValue){
//	//						inputs += "value='"+value.minValue +"' />";
//	//					}else {
//	//						inputs += "value='' />";
//	//					}
//	//					
//	//					inputs += "</div>";
//	//					
//	//	
//	//					inputs +=  "<div class='rTableCell'><input type='text' name='maxValue' value='";			
//	//					if( value.maxValue ){
//	//							inputs += value.maxValue +"' /> ";
//	//					}else {
//	//							inputs += "''  />";
//	//					}
//	//						
//	//					inputs += "</div>";
//	//					
//	//                    inputs +=  "<div class='rTableCell'><button onclick=\"UpdateProperty();\"/>Update</button></div>"+
//	//					"</div>";
//	//			
//	//			});
//	//     }
//	//			
//	//		inputs += "<div class='rTableRow' id='propertiesFields'>"+
//	//                  "<div class='rTableCell rTableCellEmpty'><input type='text' name='name' value=''/></div>"+
//	//                  "<div class='rTableCell rTableCellEmpty'><select name='propertyType'  onchange='(new DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'   >"+
//	//                  "<option value='STRING'>TEXT</option><option value='INTEGER'>INTEGER</option>"+
//	//                  "<option value='DOUBLE'>DOUBLE</option><option value='DATE'>DATE</option>"+
//	//                  "<option value='BOOLEAN'>BOOLEAN</option><option value='FILE'>FILE</option>"+
//	//                  "<option value='CURRENCY'>CURRENCY</option></select></div>"+
//	//                  "<div class='rTableCell rTableCellEmpty'><select name='isMandatory'><option value='true'>True</option><option value='false'>False</option></select></div>"+
//	//                  "<div class='rTableCell rTableCellEmpty'><select name='isUnique'><option value='true'>True</option><option value='false'>False</option></select></div>"+
//	//                  "<div class='rTableCell rTableCellEmpty'><input type='text' name='minValue' value=''/></div>"+
//	//                  "<div class='rTableCell rTableCellEmpty'><input type='text' name='maxValue' value=''/></div>"+
//	//
//	//                  "<div class='rTableCell'><button onclick=\"ContextMenuFunctions.saveTypeProperties(form)\"  id='checkbox'/>Add</button></div></div></form>";
//	//	
//	//   
//	// ************************* QTIP  *******************************************//
//
//	var formHeader = "<table class='table-responsive-sm'>";
//	var inputs = "";
//
//	if (showTypeInfo == true) {
//		$.each(type, function(key, value) {
//			if (key == 'name') {
//				inputs += "<tr><th>" + key + "</th>";
//				if (value == '') {
//					inputs += "<td>None</td><tr>";
//				} else {
//					inputs += "<td>" + value + "</td><tr>";
//				}
//			}
//		//			else if (key == 'classification') {
//		//				inputs += "<tr><th>" + key + ":</th>";
//		//				inputs += "<td>" + value + "</td><tr>";
//		//			}
//		});
//	}
//
//	// generate the properties fields
//	var props = type.typeProperties;
//
//	if (props == null || props.length == 0 || $.isEmptyObject(props)) {
//		inputs += "<tr><th colspan='2'> No properties added </th></tr>";
//	} else {
//		inputs += "<tr><th style='background-color: #CDEEDD'>Properties:</th>";
//		inputs += "<td><input id='type_prop_detail_button_" + type.id + "' type='button' value='+' class='btn btn-primary btn-xs' onclick='ContextMenuFunctions.showOrHideAllTypePropertiesDetails(\""
//			+ type.id + "\");'/></td></tr>";
//
//		inputs += "<tr id='labels_" + type.id + "' style='background-color: grey'><th> Name</th><th>Type</th></tr>";
//		$.each(props, function(key, value) {
//			var newInput = ContextMenuFunctions.displayTypeProperty(value, propertyDisplayFunction);
//			inputs += newInput;
//		});
//	}
//
//	// build out footer if neccessary
//
//	//	footer = "<tr><td><input type='button' value='ADD PROPERTY' class='btn btn-primary btn-xs'    onclick='ContextMenuFunctions.AddTypeProperties(\""+ type.id + "\");'/></td>";
//	//	footer += "<td><input type='button' value='UPDATE TYPE'    class='btn btn-primary btn-xs'    onclick='ContextMenuFunctions.showUpdateType(\""+ type.id + "\")'/></td></tr>";
//	//	footer += "</table>";	
//
//
//
//	//	var form = document.createElement('div');
//	//	    form.innerHTML = formHeader + inputs + footer;
//
//	form.innerHTML = headerTable + inputs;
//
//	return form;
//
//};

//ContextMenuFunctions.showOrHideAllTypePropertiesDetails = function(typeId) {
//
//	var typePropDetailButton = document.getElementById('type_prop_detail_button_' + typeId);
//	var propDetailHide = typeMapViaId[typeId].typeProperties
//
//	for (var key in typeMapViaId[typeId].typeProperties) {
//		var propId = typeMapViaId[typeId].typeProperties[key].id;
//		var typeDetail = 'type_prop_detail_' + propId;
//		var propDetailHide = document.getElementById(typeDetail).style.display == "none";
//		if (propDetailHide == true) {
//			$("#" + typeDetail).show();
//		} else {
//			$("#" + typeDetail).hide();
//		}
//	}
//
//	if (propDetailHide == true) {
//		typePropDetailButton.value = "-";
//		var inputs = "<th> Name</th><th>Type</th><th>Mandatory</th><th>Unique</th><th>Min</th><th>Max</th>";
//		document.getElementById("labels_" + typeId).innerHTML = inputs;
//	} else {
//		typePropDetailButton.value = "+";
//		var inputs = "<th> Name</th><th>Type</th>";
//		document.getElementById("labels_" + typeId).innerHTML = inputs;
//	}
//
//}

//ContextMenuFunctions.displayTypeProperty = function(property, displayFunction) {
//	console.log("Inside  ContextMenuFunctions.displayTypeProperty   ");
//	var inputs = "";
//
//	if (displayFunction == null) {
//		// generate the properties fields
//		console.log("Generate properties fields ");
//		if (property == null) {
//		} else {
//			//			inputs += "<tr>";
//			if (property.isMandatory == true) {
//				inputs += "<td style='color:red'>" + property.name + "</td>";
//			} else {
//				inputs += "<td>" + property.name + "</td>";
//			}
//
//			if (property.propertyType == 'STRING') {
//				inputs += "<td>TEXT</td>";
//			} else {
//				inputs += "<td>" + property.propertyType + "</td>";
//			}
//
//			//			inputs += "</tr>";
//
//			inputs += "<td><table id='type_prop_detail_" + property.id + "' style='display:none'>";
//			//			inputs += "<tr><th>Mandatory</th><th>Unique</th><th>Min</th><th>Max</th>";
//			inputs += "<tr>";
//			if (property.isMandatory) {
//				inputs += "<td>" + property.isMandatory + "</td>";
//			} else {
//				inputs += "<td>...</td>";
//			}
//			if (property.isUnique) {
//				inputs += "<td>" + property.isUnique + "</td>";
//			} else {
//				inputs += "<td>...</td>";
//			}
//
//
//			//			inputs += "</tr>";
//
//			//			inputs += "";
//			//			inputs += "<tr>";
//			if (property.minValue) {
//				inputs += "<td>" + property.minValue + "</td>";
//			} else {
//				inputs += "<td>...</td>";
//			}
//			;
//			if (property.maxValue) {
//				inputs += "<td>" + property.maxValue + "</td>";
//			} else {
//				inputs += "<td>...</td>";
//			}
//			;
//			//			inputs += "</tr>";
//			//
//			//			inputs += "<tr><th>Default</th></tr>";
//			//			inputs += "<tr>";
//			//			if (property.defaultValue) {
//			//				inputs += "<td style='diaplay:none;'>" + property.defaultValue
//			//						+ "</td>";
//			//			} else {
//			//				inputs += "<td>...</td>";
//			//			};
//			inputs += "</tr></table></td><tr>";
//		}
//	} else {
//		return displayFunction(null, property);
//	}
//	return inputs;
//}

//ContextMenuFunctions.CancelAddTypeProperties = function(typeId) {
//
//	$("#typeForm").empty();
//	$(".qtip").remove();
//
////	var inputs  = ContextMenuFunctions.displayTypeProperties( typeMapViaId[typeId], true);
////	$("#typeForm").empty();
////	$("#typeForm").append(inputs);
//}

//ContextMenuFunctions.AddTypeProperties = function(typeId) {
//	// the selected name of the type is saved in the Global variable
//
//	var typeName = typeMapViaId[typeId].name;
//	var Form,
//		formHeader,
//		formFooter,
//		newProperty,
//		properties,
//		inputs = '';
//
//	Form = document.createElement('div');
//	formHeader = "<form id='typeProps'  method='post'>";
//
//	//	inputs += "<div id='typeName'><label>Type Selected: </label>" + typeName + "<input type='hidden' name='typeId' value='" + typeId
//	//		+ "'/><input type='hidden' name='typename' value='" + typeName + "'/></div>";
//	inputs += "<div id='typeName'><input type='hidden' name='typeId' value='" + typeId + "'/><input type='hidden' name='typename' value='" + typeName + "'/></div>";
//
//
//	inputs += "<button type='button' class='btn btn-primary btn-xs'   onclick='ContextMenuFunctions.addProperties()'>ADD PROPERTY</button>";
//
//	formFooter = "<div id='propertiesFields'></div>";
//	formFooter += "<input id='save_type_prop_button' type='button' value='SAVE PROPERTIES'  class='btn btn-primary btn-xs' onclick='ContextMenuFunctions.saveTypeProperties(form)'>";
//	formFooter += "<input type='button' value='CANCEL' class='btn btn-primary btn-xs' onclick='ContextMenuFunctions.CancelAddTypeProperties(" + typeId + ");'></form>";
//	Form.innerHTML = formHeader + inputs + formFooter;
//
//	$('#typeForm').empty();
//	$('#typeForm').append(Form);
//
//	newProperty = document.createElement('div');
//	properties = "<hr/><table>";
//	properties += "<tr><th>Name & Type:</th><td><input type='text' name='name' autofocus  size='10' />";
//	properties += "<select name='propertyType' onchange='(new DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>"
//		+ "<option value='STRING'>TEXT</option>"
//		+ "<option value='INTEGER'>INTEGER</option>"
//		+ "<option value='DOUBLE'>DOUBLE</option>"
//		+ "<option value='DATE'>DATE</option>"
//		+ "<option value='BOOLEAN'>BOOLEAN</option>"
//		+ "<option value='FILE'>FILE</option>"
//		+ "<option value='CURRENCY'>CURRENCY</option>"
//		+ "<option value='STATUS'>STATUS</option>"
//		+ "<option value='PARENTVALUE'>PARENTVALUE</option>"
//		+ "<option value='CONCAT'>CONCAT</option>" + "</select></td></tr>";
//
//	properties += "<tr><th> isMandatory: </th><td>";
//	properties += "<input type='checkbox' name='isMandatory'>";
//
//	properties += "</td></tr>";
//	properties += "<tr><th> isUnique: </th><td>";
//	properties += "<input type='checkbox' name='isUnique'>";
//
//	properties += "</td></tr>";
//	properties += "<tr><th>Default Value:</th><td> <input type='text' size='10' name='defaultValue' onkeypress='' value='' defaultValue='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></td></tr>";
//	properties += "<tr><th>Max Value:</th><td> <input type='text' size='10' name='maxValue' /></td></tr>";
//	properties += "<tr><th>Min Value:</th><td> <input type='text' size='10' name='minValue' /></td></tr></table>";
//
//	newProperty.innerHTML = properties;
//
//	document.getElementById('propertiesFields').appendChild(newProperty);
//	if (document.getElementById('propertiesFields').innerHTML != '') {
//		document.getElementById("save_type_prop_button").style.visibility = 'visible';
//	}
//}

ContextMenuFunctions.addProperties = function() {
	var newProperty = document.createElement('div');
	var properties = "<hr/><table>";
	properties += "<tr><th>Name & Type:</th><td><input type='text' name='name' size='10' />";
	properties += "<select name='propertyType' onchange='(new DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>"
		+ "<option value='INTEGER'>INTEGER</option>"
		+ "<option value='DOUBLE'>DOUBLE</option>"
		+ "<option value='DATE'>DATE</option>"
		+ "<option value='STRING'>TEXT</option>"
		+ "<option value='BOOLEAN'>BOOLEAN</option>"
		+ "<option value='FILE'>FILE</option>"
		//		+ "<option value='CURRENCY'>CURRENCY</option>"
		//		+ "<option value='STATUS'>STATUS</option>"
		//		+ "<option value='PARENTVALUE'>PARENTVALUE</option>"
		//		+ "<option value='CONCAT'>CONCAT</option>"
		+ "</select></td></tr>";

	properties += "<tr><th> isMandatory:</th><td>";
	properties += "<input type='checkbox' name='isMandatory'>";
	properties += "</td></tr>";

	properties += "<tr><th> isUnique: </th><td>";
	properties += "<input type='checkbox' name='isUnique'>";
	properties += "</td></tr>";

	properties += "<tr><th>Default Value:</th><td> <input type='text' size='10' name='defaultValue' onkeypress='' value='' defaultValue='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></td></tr>";
	properties += "<tr><th>Max Value:</th><td> <input type='text' size='10' name='maxValue' /></td></tr>";
	properties += "<tr><th>Min Value:</th><td> <input type='text' size='10' name='minValue' /></td></tr></table>";

	newProperty.innerHTML = properties;
	document.getElementById('propertiesFields').appendChild(newProperty);

}

//ContextMenuFunctions.showUpdateType = function(type, ele) {
//
//	var Form,
//		type,
//		formHeader,
//		formFooter,
//		Props,
//		inputs = '';
//	Form = document.createElement('div');
//
//	formHeader = "<form id='updateTypeDialog'>";
//
//	inputs += "<table class='table-responsive'  >";
//	inputs += "<tr id='typeName' ><th><input type='hidden' name='id'  value='" + type.id + "'>";
//	$.each(type, function(key, value) {
//		if (key == "name") {
//			inputs += key + "</th><td><input type='text' name ='" + key + "' autofocus  value='" + value + "'/><input type='hidden' name ='oldName' value='" + value + "'/>";
//		}
//	});
//
//	inputs += "<input type='text' name='classification' value='" + type.classification + "' style='visibility:hidden; position:absolute; top:-100px;' />";
//	inputs += "<input type='text' name='isRoot' value='" + type.isRoot + "' style='visibility:hidden; position:absolute; top:-100px;' />";
//	inputs += "<input type='text' name='owner' value='123' style='visibility:hidden; position:absolute; top:-100px;' /></td></tr>";
//
//
//	Props = type.typeProperties;
//	if (!jQuery.isEmptyObject(Props)) {
//		inputs += "<tr><th colspan='7' style='background-color: #CDEEDD'> Properties:</th></tr>";
//		inputs += "<tr><th>Name</th><th>Type</th><th>minValue</th><th>maxValue</th></tr>";
//		var inputTable = ""
//		$.each(Props, function(key, value2) {
//			inputTable += "<tr id='propertiesFields'>";
//			var idth = "",
//				nameth = "",
//				typeth = "",
//				minvalueth = "",
//				maxvalueth = "",
//				uniqueth = "",
//				mandatoryth = "";
//			$.each(value2, function(key, value) {
//				if (key == 'id') {
//					idth = "<td><input type='hidden' name='propertyId' value='" + value + "'>";
//				}
//				if (key == 'name') {
//					nameth = "<input type='text' name='name' value='" + value + "'/></td>";
//				}
//				if (key == 'minValue') {
//					minvalueth = "<td><select name='" + key + "'><option value='true'";
//					if (value == 'true') {
//						minvalueth += "selected='selected'";
//					}
//					minvalueth += ">True</option><option value='false' ";
//					if (value == 'false') {
//						minvalueth += "selected='selected'";
//					}
//					minvalueth += ">false</option></select></td>";
//				}
//				if (key == 'maxValue') {
//					maxvalueth = "<td><select name='" + key + "'><option value='true'";
//					if (value == 'true') {
//						maxvalueth += "selected='selected'";
//					}
//					maxvalueth += ">True</option><option value='false' ";
//					if (value == 'false') {
//						maxvalueth += "selected='selected'";
//					}
//					maxvalueth += ">false</option></select></td>";
//				}
//				if (key == 'propertyType') {
//					typeth = "<td><select name='" + key + "'><option value='INTEGER' ";
//
//					if (value == "INTEGER") {
//						typeth += "selected='selected'";
//					}
//					typeth += ">INTEGER</option><option value='DOUBLE' ";
//
//					if (value == "DOUBLE") {
//						typeth += "selected='selected'";
//					}
//					typeth += ">DOUBLE</option><option value='DATE' ";
//
//					if (value == "DATE") {
//						typeth += "selected='selected'";
//					}
//					typeth += ">DATE</option><option value='STRING' ";
//
//					if (value == "STRING") {
//						typeth += "selected='selected'";
//					}
//					typeth += ">TEXT</option><option value='BOOLEAN' ";
//
//					if (value == "BOOLEAN") {
//						typeth += "selected='selected'";
//					}
//					typeth += ">BOOLEAN</option><option value='FILE' ";
//
//					if (value == "FILE") {
//						typeth += "selected='selected'";
//					}
//					typeth += ">FILE</option><option value='CURRENCY' ";
//
//					if (value == "CURRENCY") {
//						typeth += "selected='selected'";
//					}
//					typeth += ">CURRENCY</option></select></td>";
//
//				}
//			});
//
//			inputTable += idth + nameth + typeth + minvalueth + maxvalueth + "</tr>";
//			inputs += inputTable;
//			inputTable = "";
//		});
//	}
//	formFooter = "<tr><td><input type='button' value='UPDATE TYPE' class='btn btn-primary btn-xs'   onclick='ContextMenuFunctions.saveUpdateTypeByGroup(form)' /></td>";
//	formFooter += "<td><input type='button'  value='CANCEL'     class='btn btn-primary btn-xs' onclick='ContextMenuFunctions.CancelAddTypeProperties(" + type.id + ")'></td></tr><table></form>";
//	Form.innerHTML = formHeader + inputs + formFooter;
//
//	return Form;
//
//
//
//
//
//	//	var Form, type, formHeader, formFooter, hasGeo, Props, inputs = '';
//	//	Form = document.createElement('div');
//	//	type = typeMapViaId[listTypeIds[0]];
//	//
//	//	formHeader = "<form id='updateTypeDialog'>";
//	//
//	//	inputs += "<table class='table-responsive-sm'  >";
//	//	inputs += "<tr id='typeName' ><th><input type='hidden' name='id'  value='"+ type.id + "'>";
//	//	$.each(	type, function(key, value) {
//	//		if (key == 'id') {
//	////			inputs += "<tr><td><input type='hidden' name ='"+ key + "' value='" + value+ "' /></td></tr>";
//	//		} 
//	//		if (key == "name") {
//	//			inputs +=  key+ "</th><td><input type='text' name ='"+ key+ "' autofocus  value='"+ value+ "'/><input type='hidden' name ='oldName' value='"+ value + "'/>";
//	//		}
//	////		else if (key == "classification") {
//	////			inputs += "<tr><th>" + key+ "</th><td><input type='text' name ='"+ key + "' value='" + value+ "'/></td></tr>";
//	////		} else if (key == 'isRoot') {
//	////			inputs += "<tr><th>"+ key+ ":</th><td><input type='text' name='isRoot'  value='true'/></td></tr>";
//	////		}
//	//	});
//	//
//	//	
//	//	inputs += "<input type='text' name='classification' value='"+ type.classification+ "' style='visibility:hidden; position:absolute; top:-100px;' />";
//	//	inputs += "<input type='text' name='isRoot' value='"+ type.isRoot+ "' style='visibility:hidden; position:absolute; top:-100px;' />";
//	//	
//	//	
//	//	// set value
//	//	var ownerId = 123;
//	//	inputs += "<input type='text' name='owner' value='"+ ownerId+ "' style='visibility:hidden; position:absolute; top:-100px;' /></td></tr>";
//	//
//	//	// ============= Enable Decorators for Type ==================================
//	//	// Hard code the id for geo view now
//	////	hasGeo = false;
//	////	for (var i = 0; i < type.decorators.length; i++) {
//	////		if (type.decorators[i] == 4) { // Hard code the id for geo view now
//	////			hasGeo = true;
//	////			break;
//	////		}
//	////	}
//	////	inputs += "<tr><td colspan='2'>Geo View&nbsp;&nbsp;<label class=\"switch\"><input id=\"geoActivator\" name=\"geoActivator\" type=\"checkbox\" value=\"4\"";
//	////	if (hasGeo == true) {
//	////		inputs += "checked=\"checked\"";
//	////	}
//	////	inputs += "><div class=\"slider round\"></div></label><br></td></tr>";
//	//
//	//	Props = type.typeProperties;
//	//	if (jQuery.isEmptyObject(Props)) {
//	//		inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";
//	//	} else {
//	//		inputs += "<tr><th colspan='7' style='background-color: #CDEEDD'> Properties:</th></tr>";
//	//		inputs += "<tr><th>Name</th><th>Type</th><th>minValue</th><th>maxValue</th></tr>";
//	//		var inputTable = ""
//	//		$.each(	Props,function(key, value2) {
//	//			inputTable += "<tr id='propertiesFields'>";
//	//			var idth="", nameth="", typeth="", minvalueth="", maxvalueth="", uniqueth="", manadatoryth="";
//	//			$.each(	value2,	function(key, value) {
//	//				if (key == 'id') {
//	//					idth = "<td><input type='hidden' name='propertyId' value='"+ value + "'>";
//	//				}
//	//				if (key == 'name') {
//	//					nameth = "<input type='text' name='name' value='"+ value	+ "'/></td>";
//	//				}
//	//				if(key == 'minValue'){
//	//					minvalueth = "<td><select name='"+ key+ "'><option value='true'";
//	//					if( value == 'true'){
//	//						minvalueth += "selected='selected'";
//	//					}
//	//					minvalueth += ">True</option><option value='false' ";
//	//					if(value == 'false') {
//	//						minvalueth += "selected='selected'";
//	//					}
//	//					minvalueth += ">false</option></select></td>";
//	//				}
//	//				if(key == 'maxValue'){
//	//					maxvalueth = "<td><select name='"+ key+ "'><option value='true'";
//	//					if( value == 'true'){
//	//						maxvalueth += "selected='selected'";
//	//					}
//	//					maxvalueth += ">True</option><option value='false' ";
//	//					if(value == 'false') {
//	//						maxvalueth += "selected='selected'";
//	//					}
//	//					maxvalueth += ">false</option></select></td>";
//	//				}
//	//				if (key == 'propertyType') {
//	//					typeth = "<td><select name='"+ key+ "'><option value='INTEGER' ";
//	//
//	//					if (value == "INTEGER") {
//	//						typeth += "selected='selected'";
//	//					}
//	//					typeth += ">INTEGER</option><option value='DOUBLE' ";
//	//
//	//					if (value == "DOUBLE") {
//	//						typeth += "selected='selected'";
//	//					}
//	//					typeth += ">DOUBLE</option><option value='DATE' ";
//	//
//	//					if (value == "DATE") {
//	//						typeth += "selected='selected'";
//	//					}
//	//					typeth += ">DATE</option><option value='STRING' ";
//	//
//	//					if (value == "STRING") {
//	//						typeth += "selected='selected'";
//	//					}
//	//					typeth += ">TEXT</option><option value='BOOLEAN' ";
//	//
//	//					if (value == "BOOLEAN") {
//	//						typeth += "selected='selected'";
//	//					}
//	//					typeth += ">BOOLEAN</option><option value='FILE' ";
//	//
//	//					if (value == "FILE") {
//	//						typeth += "selected='selected'";
//	//					}
//	//					typeth += ">FILE</option><option value='CURRENCY' ";
//	//
//	//					if (value == "CURRENCY") {
//	//						typeth += "selected='selected'";
//	//					}
//	//					typeth += ">CURRENCY</option></select></td>";
//	//
//	//				}
//	//				
//	//				
//
//	//				if (key == 'id') {
//	//					inputs += "<input type='hidden' name='propertyId' value='"+ value + "'>";
//	//				} else if (key == 'name') {
//	//					inputs += "<th>"+ key+ "</th><td><input type='text' name='name' value='"+ value	+ "'/></td></tr>";
//	//				} else if (key == 'isMandatory'	|| key == 'isUnique') {
//	//					inputs += "<tr><th>" + key+ ":</th>";
//	//					inputs += "<td><input type='checkbox' name='"+ key + "' ";
//	//					if (value == true) {
//	//						inputs += "checked";
//	//					}
//	//					inputs += "></td></tr>";
//	//				} else if (key == 'propertyType') {
//	//					inputs += "<tr><th>"+ key+ "</th><td><select name='"+ key+ "'><option value='INTEGER' ";
//	//
//	//					if (value == "INTEGER") {
//	//						inputs += "selected='selected'";
//	//					}
//	//					inputs += ">INTEGER</option><option value='DOUBLE' ";
//	//
//	//					if (value == "DOUBLE") {
//	//						inputs += "selected='selected'";
//	//					}
//	//					inputs += ">DOUBLE</option><option value='DATE' ";
//	//
//	//					if (value == "DATE") {
//	//						inputs += "selected='selected'";
//	//					}
//	//					inputs += ">DATE</option><option value='STRING' ";
//	//
//	//					if (value == "STRING") {
//	//						inputs += "selected='selected'";
//	//					}
//	//					inputs += ">TEXT</option><option value='BOOLEAN' ";
//	//
//	//					if (value == "BOOLEAN") {
//	//						inputs += "selected='selected'";
//	//					}
//	//					inputs += ">BOOLEAN</option><option value='FILE' ";
//	//
//	//					if (value == "FILE") {
//	//						inputs += "selected='selected'";
//	//					}
//	//					inputs += ">FILE</option><option value='CURRENCY' ";
//	//
//	//					if (value == "CURRENCY") {
//	//						inputs += "selected='selected'";
//	//					}
//	//					inputs += ">CURRENCY</option></select></td></tr>";
//	//
//	//				} else {
//	//					if ((key != 'id')&& (key != 'romeDecoPropId')&& (key != 'validValues')) {
//	//						inputs += "<tr><th>"+ key+ "</th><td><input type='text' name='"	+ key+ "' value='"+ value+ "'/></td></tr>";
//	//					}
//	//				}
//	//			});
//	//			
//	//			inputTable += idth + nameth + typeth + minvalueth + maxvalueth + "</tr>";
//	//			inputs += inputTable;
//	//			inputTable = "";
//	////			inputs += "<tr><td colspan='2'>---------------------------------</td></tr>";
//	//		});
//	//	}
//
//	// <!-- Allow form submission with keyboard without duplicating the dialog
//	// button -->
//	//	formFooter = "<tr><td><input type='button' value='UPDATE TYPE' class='btn btn-primary btn-xs'   onclick='ContextMenuFunctions.saveUpdateTypeByGroup(form)' /></td>";
//	//	formFooter += "<td><input type='button'  value='CANCEL'     class='btn btn-primary btn-xs' onclick='ContextMenuFunctions.CancelAddTypeProperties("+ type.id + ")'></td></tr><table></form>";
//	//	Form.innerHTML = formHeader + inputs + formFooter;
//
//	//	$('#typeForm').empty();
//	//	$('#typeForm').append(Form);
//
//}

//ContextMenuFunctions.saveTypeProperties = function(form) {
//
//	var jsonData = {},
//		typeProperties = [],
//		property = {},
//		typename,
//		typeId;
//	// Retrieve type fields from form
//	$(form).find('div#typeName').find(':input').each(function(i, field) {
//		jsonData[field.name] = field.value;
//	});
//	// remove typename from JSON
//	//	typename = jsonData["typename"];
//	typeId = jsonData["typeId"];
//	//	delete jsonData['typename'];
//
//	jsonData["namespace"] = loggedInUserName;
//	jsonData["grouphost"] = userGroup.host;
//	jsonData["groupname"] = userGroup.name;
//
//
//	// Retrieve Type properties fields from form
//
//	$(form).find('div#propertiesFields').find('div').each(function(i, propDiv) {
//		$(propDiv).find(':input').each(
//			function(i, field) {
//				if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
//					if (field.name == 'isMandatory' || field.name == 'isUnique') {
//						if (field.checked == true) {
//							property[field.name] = 'true';
//						} else {
//							property[field.name] = 'false';
//						}
//					} else {
//						property[field.name] = field.value;
//					}
//				}
//			});
//		typeProperties.push(property);
//		property = {};
//	});
//	// attach properties to JSON
//	jsonData.properties = typeProperties;
//
//	var successFunction = function(data) {
//		//!TO DO verify that this update does not break DATA
//		tdvCy.filter('node[name="' + data.name + '"]').data(data);
//		console.log("Type Properties create success. data: " + data.name);
//		// update global variable typeMapViaId
//		typeMapViaId[data.id] = data;
//		// update the corresponding bar
//		if (data.classification == 'node') {
//			DesignLogicalBarRender.buildLoadBar(typeMapViaId, "typelist", "typeslist", "totalNodes", "node");
//		} else if (data.classification == 'path') {
//			DesignLogicalBarRender.buildLoadBar(typeMapViaId, "pathlist", "pathslist", "totalPaths", "path");
//		} else if (data.classification == 'system') {
//			DesignLogicalBarRender.buildLoadBar(typeMapViaId, "systemlist", "systemslist", "totalSystems", "system");
//		}
//		// refresh display properties
//		ContextMenuFunctions.CancelAddTypeProperties(data.id);
//		// update the name of the node in cytoscape
//		tdvCy.$('#' + data.id + '').data('name', data.name);
//	};
//
//	var failFunction = function(xhr, status, error) {
//		document.getElementById('typeForm').textContent = "Error Type properties not saved";
//	};
//
//	var apis = new TypePropertyApi();
//	apis.addTypeProperties(jsonData, successFunction, failFunction);
//
//}
//
//ContextMenuFunctions.saveUpdateTypeByGroup = function(form) {
//	var jsonData = {},
//		typeproperties = [],
//		jsonProperty = {},
//		decos = [],
//		foundError = false,
//		oldName,
//		typeId,
//		initcolor;
//	var node = {};
//	$(form).find('tr#typeName').find(':input').each(function(i, field) {
//		if ((field.type != 'submit') && (field.type != 'radio') || field.checked && (field.value != 'Cancel')) {
//			if ((field.name == 'id') || (field.name == 'oldName') || (field.name == 'name') || (field.name == 'classification') || (field.name == 'owner') || (field.name == 'isRoot')) {
//				if (field.name == 'name' && !field.value) {
//					console.log("Missing Value for type Name.");
//					$('#typeForm').append("<br/><p style='color:red'>Missing Value for Type name : ");
//					foundError = true;
//				}
//
//				if (field.name == 'isRoot') {
//					node[field.name] = field.value;
//				} else {
//					node[field.name] = field.value;
//				}
//			}
//		}
//
//	});
//
//	typeId = node["id"];
//
//	if (foundError) {
//		return;
//	}
//	// remove original typename to pass as path parameter
//	oldName = node["oldName"];
//	if (typeMapViaId[typeId].decorators) {
//		jsonData["decorators"] = typeMapViaId[typeId].decorators;
//	}
//
//	delete node['oldName'];
//	// ADD VALIDATION HERE
//	$(form).find('tr#propertiesFields').each(
//		function(i, propDiv) {
//			$(propDiv).find(':input').each(
//				function(i, field) {
//					if (field.type != 'submit' && field.type != 'button' && field.value != 'Cancel') {
//
//						if ((field.name == 'propertyType') && (field.value == 'TEXT')) {
//							jsonProperty[field.name] = 'STRING';
//						} else {
//							if (field.name == 'isMandatory' || field.name == 'isUnique') {
//								if (field.checked == true) {
//									jsonProperty[field.name] = "true";
//								} else {
//									jsonProperty[field.name] = "false";
//								}
//							} else {
//								jsonProperty[field.name] = field.value;
//							}
//						}
//					}
//				});
//			typeproperties.push(jsonProperty);
//			jsonProperty = {};
//		})
//	node.properties = typeproperties;
//
//	jsonData["namespace"] = loggedInUserName;
//	jsonData["grouphost"] = userGroup.host;
//	jsonData["groupname"] = userGroup.name;
//	jsonData["node"] = node;
//
//	console.log(jsonData);
//	var successFunction = function(data) {
//
//		tdvCy.filter('node[name="' + data.name + '"]').data(data);
//		console.log("Type Properties update success. data: " + data.name);
//
//		typeMapViaId[data.id] = data; // added the new type map keyed on id
//
//		if (data.classification == 'node') {
//			DesignLogicalBarRender.buildLoadBar(typeMapViaId, "typelist", "typeslist", "totalNodes", "node");
//		} else if (data.classification == 'path') {
//			DesignLogicalBarRender.buildLoadBar(typeMapViaId, "pathlist", "pathslist", "totalPaths", "path");
//		} else if (data.classification == 'system') {
//			DesignLogicalBarRender.buildLoadBar(typeMapViaId, "systemlist", "systemslist", "totalSystems", "system");
//		}
//		$("#typeForm").empty();
//		$(".qtip").remove();
//
//
//		CommonFctsLogical.updateTooltip(data);
//
//
//
//		//		ContextMenuFunctions.CancelAddTypeProperties( data.id )
//		tdvCy.$('#' + data.id + '').data('name', data.name); // update type in cytoscape
//	};
//
//	var failFunction = function(xhr, status, error) {
//		document.getElementById('typeForm').textContent = "Error Type properties not updated";
//		console.log("Error Type properties not updated: " + xhr.responseText);
//	};
//
//	var apis = new TypeApi();
//	apis.saveUpdateTypeByGroup(typeId, jsonData, successFunction, failFunction);
//};

//***************************************************************************************************************//
//**************************** PC Connections Functions**********************************************************//
//ContextMenuFunctions.showConnRuleProperties = function(connId) {
//	var conn = connMapViaId[connId];
//	var formHeader = "<form><table class='table-responsive-sm'>";
//	var inputs = "";
//
//	$.each(conn, function(key, value) {
//		if (key == "name") {
//			inputs += "<tr><th>" + key + "  </th><td><input type='text' name='" + key + "' value='" + value + "' disabled/></td></tr>";
//		}
//		;
//		if (key == "maxRel") {
//			inputs += "<tr><th>" + key + " :</th><td><input type='text' name='" + key + "' value='" + value + "' disabled/></td></tr>";
//		}
//		;
//		if (key == "minRel") {
//			inputs += "<tr><th>" + key + " :</th><td><input type='text' name='" + key + "' value='" + value + "' disabled/></td></tr>";
//		}
//		;
//	});
//
//	// generate the properties fields
//	var props = ruleMapViaId[conn.ruleId].typeProperties;
//	listConnIds[0] = connId;
//	if (props == null || props.length == 0 || $.isEmptyObject(props)) {
//		inputs += "<tr><th colspan='2'> No properties added </th></tr>";
//	} else {
//		inputs += "<tr><th colspan='2' style='background-color: #CDEEDD'>Properties:</th></tr>";
//		inputs += "<tr style='background-color: grey'><th> Name</th><th>Type</th></tr>";
//		$.each(props, function(key, value) {
//			var newInput = ContextMenuFunctions.displayRuleProperty(value, null);
//			inputs += newInput ;
//		});
//	}
//
//	// build out footer if neccessary
//	var footer = "";
//	footer = "<tr><td><input type='button' value='Add Property' class='btn btn-primary btn-xs' onclick='ConnectionPropertyUtils.addConnectionProperties(\"" + conn.id + "\");'/></td>";
//	footer += "<td><input type='button' value='Update' class='btn btn-primary btn-xs' onclick='ConnectionPropertyUtils.updateRuleConnection(\"" + conn.id + "\");'/>";
//	footer += "</table></form>";
//
//	var form = document.createElement('div');
//	form.innerHTML = formHeader + inputs + footer;
//	$('#typeForm').empty();
//	$('#typeForm').append(form);
//}


//**************************** Links Functions  QTIP WORKING 28-03-2018 ********************************/

//ContextMenuFunctions.displayLinkProperties = function(node, ruleId, pos, e) {
//
//	$(".qtip").remove();
//
//	var qtipDiv = document.createElement('div');
//	qtipDiv.id = 'typeForm';
//	qtipDiv.className = 'block';
//	qtipDiv.innerHTML = "";
//
//	node.qtip({
//		id : ruleId,
//		content : {
//			title : {	text : ruleMapViaId[ruleId].name +" Details",	button : true   },
//			text : function() {
//				var inputs = ContextMenuFunctions.displayRuleProperties(ruleMapViaId[ruleId], true);
//				qtipDiv.append(inputs);
//				return qtipDiv;
//			}
//		},
//		show : {  ready : true,	},
//		position : {
//			target : 'mouse',
//			adjust : { 	method : 'shift', 	resize : true	},
//			viewport : $(window)
//		},
//		style : {
//			classes : 'qtip-blue qtip-tipped',
//			tip : true,
//		},
//		hide : { 	e : 'click'	},
//		events : {
//			hide : function(event, api) {
//				api.destroy();
//			}
//		}
//	}, e);
//
//}

//ContextMenuFunctions.displayRuleProperties = function(rule, showlinkInfo, ruleDisplayFunction, propertyDisplayFunction) {
//
//	var formHeader = "<table class='table-responsive'>";
//	var inputs = "";
//
////	inputs += "<tr><th>name : </th><th>" + rule.name + "</th></tr>";
//
//	//	if( showlinkInfo == true ) {
//	//		$.each(rule, function(key, value) {
//	//			
//	//			if(key == 'name')  {
//	//				inputs += "<tr><th>" + key + "</th>";
//	//				if (value == '') {
//	//					inputs += "<td>None</td><tr>"; 
//	//				} else { 
//	//					inputs += "<td>" + value + "</td><tr>";	
//	//				}
//	//			} else if (key == 'classification') {
//	//					inputs += "<tr><th>"+key +":</th>";
//	//					inputs += "<td>" + value + "</td><tr>";
//	//			}
//	//			
//	//		});
//	//	}
//
//	// generate the properties fields
//	var props = rule.typeProperties;
//	listConnIds[0] = rule.id;
//
//	if (props == null || props.length == 0 || $.isEmptyObject(props)) {
//		inputs += "<tr><th colspan='2'> No properties added </th></tr>";
//
//	} else {
//		inputs += "<tr><th style='background-color: #CDEEDD'>Properties:</th></tr>";
//		inputs += "<td><input id='connection_prop_detail_button_" + rule.id + "' type='button' value='MORE DETAILS' class='btn btn-primary btn-xs' onclick='ContextMenuFunctions.showOrHideAllRulePropertiesDetails(\"" + rule.id + "\");'/></td></tr>";
//
//		inputs += "<tr style='background-color: grey'><th> Name</th><th>Type</th></tr>";
//		$.each(props, function(key, value) {
//
//			var newInput = ContextMenuFunctions.displayRuleProperty(value, propertyDisplayFunction);
//			inputs += newInput ;
//		});
//	}
//
//	// build out footer if neccessary
//	var footer = "";
//
//	footer = "<tr><td><input type='button' value='ADD PROPERTY' class='btn btn-primary btn-xs'    onclick='ContextMenuFunctions.AddRuleProperties(\"" + rule.id + "\");'/></td>";
//	footer += "<td><input type='button' value='UPDATE LINK'    class='btn btn-primary btn-xs'    onclick='ContextMenuFunctions.showUpdateLink(\"" + rule.id + "\")'/></td></tr>";
//	footer += "</table>";
//	var form = document.createElement('div');
//	form.innerHTML = formHeader + inputs + footer;
//
//	return form;
//
//};

ContextMenuFunctions.displayRuleProperty = function(property, displayFunction) {
	console.log("Inside  ContextMenuFunctions.displayRuleProperty   ");
	var inputs = "";

	if (displayFunction == null) {
		// generate the properties fields
		console.log("Generate properties fields ");
		if (property == null) {
		} else {
			if (property.isMandatory == true) {
				inputs += "<tr><td style='color:red'>" + property.name + "</td>";
			} else {
				inputs += "<tr><td>" + property.name + "</td>";
			}
			if (property.propertyType == 'STRING') {
				inputs += "<td>TEXT</td>";
			} else {
				inputs += "<td>" + property.propertyType + "</td>";
			}

			inputs += "</tr>";

			inputs += "<tr><td><table id='connection_prop_detail_" + property.id + "' style='display:none'>";
			inputs += "<tr><th>Mandatory</th><th>Unique</th></tr>";
			inputs += "<tr>";
			inputs += "<td>" + property.isMandatory + "</td>";
			inputs += "<td>" + property.isUnique + "</td>";
			inputs += "</tr>";

			inputs += "<tr><th>Min</th><th>Max</th></tr>";
			inputs += "<tr>";
			if (property.minValue) {
				inputs += "<td>" + property.minValue + "</td>";
			} else {
				inputs += "<td>...</td>";
			}
			;
			if (property.maxValue) {
				inputs += "<td>" + property.maxValue + "</td>";
			} else {
				inputs += "<td>...</td>";
			}
			;
			inputs += "</tr>";

			inputs += "<tr><th>Default</th></tr>";
			inputs += "<tr>";
			if (property.defaultValue) {
				inputs += "<td style='diaplay:none;'>" + property.defaultValue + "</td>";
			} else {
				inputs += "<td>...</td>";
			}
			;

			inputs += "</tr></table></td><tr>";
		}

	} else {
		return displayFunction(null, property);
	}

	return inputs;
};

ContextMenuFunctions.AddRuleProperties = function(ruleId) { // the selected name of the type is saved in the Global variable

	var ruleName = ruleMapViaId[ruleId].name;

	var Form,
		formHeader,
		formFooter,
		newProperty,
		properties,
		inputs = '';
	Form = document.createElement('div');

	formHeader = "<form id='typeProps'  method='post'>";

	//	inputs += "<div id='ruleName'><label>Rule Selected: </label>" + ruleName + "<input type='hidden' name='ruleid' value='" + ruleId + "'/><input type='hidden' name='rulename' value='" + ruleName + "'/></div>";
	inputs += "<div id='ruleName'><input type='hidden' name='ruleid' value='" + ruleId + "'/><input type='hidden' name='rulename' value='" + ruleName + "'/></div>";

	inputs += "<button type='button' class='btn btn-primary btn-xs'   onclick='ContextMenuFunctions.addProperties()'>ADD PROPERTY</button>";

	formFooter = "<div id='propertiesFields'></div>";
	formFooter += "<input id='save_type_prop_button' type='button' value='SAVE PROPERTIES'  class='btn btn-primary btn-xs' onclick='ContextMenuFunctions.saveRuleProperties(form)'>";
	formFooter += "<input type='button' value='CANCEL' class='btn btn-primary btn-xs' onclick='ContextMenuFunctions.CancelAddRuleProperties(" + ruleId + ");'></form>";
	Form.innerHTML = formHeader + inputs + formFooter;

	$('#typeForm').empty();
	$('#typeForm').append(Form);

	newProperty = document.createElement('div');
	properties = "<hr/><table>";
	properties += "<tr><th>Name & Type:</th><td><input type='text' name='name' size='10' />";
	properties += "<select name='propertyType' onchange='(new DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>" +
		"<option value='STRING'>TEXT</option>" +
		"<option value='INTEGER'>INTEGER</option>" +
		"<option value='DOUBLE'>DOUBLE</option>" +
		"<option value='DATE'>DATE</option>" +
		"<option value='BOOLEAN'>BOOLEAN</option>" +
		"<option value='FILE'>FILE</option>" +
		//		"<option value='CURRENCY' disabled='disabled'>CURRENCY</option>" +
		//		"<option value='STATUS'>STATUS</option>" +
		//		"<option value='PARENTVALUE'>PARENTVALUE</option>" +
		//		"<option value='CONCAT'>CONCAT</option>" +
		"</select></td></tr>";

	properties += "<tr><th> isMandatory: </th><td>";
	properties += "<input type='checkbox' name='isMandatory'>";

	properties += "</td></tr>";
	properties += "<tr><th> isUnique: </th><td>";
	properties += "<input type='checkbox' name='isUnique'>";

	properties += "</td></tr>";
	properties += "<tr><th>Default Value:</th><td> <input type='text' size='10' name='defaultValue' onkeypress='' value='' defaultValue='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></td></tr>";
	properties += "<tr><th>Max Value:</th><td> <input type='text' size='10' name='maxValue' /></td></tr>";
	properties += "<tr><th>Min Value:</th><td> <input type='text' size='10' name='minValue' /></td></tr></table>";

	newProperty.innerHTML = properties;

	document.getElementById('propertiesFields').appendChild(newProperty);
	if (document.getElementById('propertiesFields').innerHTML != '') {
		document.getElementById("save_type_prop_button").style.visibility = 'visible';
	}
}

ContextMenuFunctions.CancelAddRuleProperties = function(ruleId) {

	var inputs = ContextMenuFunctions.displayRuleProperties(ruleMapViaId[ruleId], true);
	$("#typeForm").empty();
	$("#typeForm").append(inputs);
}

ContextMenuFunctions.showOrHideAllRulePropertiesDetails = function(ruleId) {

	var connPropDetailButton = document.getElementById('connection_prop_detail_button_' + ruleId);

	var props = ruleMapViaId[ruleId].typeProperties;
	var propDetailHide = null

	for (var key in props) {
		var propId = props[key].id;
		var connDetail = 'connection_prop_detail_' + propId;
		var propDetailHide = document.getElementById(connDetail).style.display == "none";
		if (propDetailHide == true) {
			$("#" + connDetail).show();
		} else {
			$("#" + connDetail).hide();
		}
	}

	if (propDetailHide == true) {
		connPropDetailButton.value = "HIDE DETAILS";
	} else {
		connPropDetailButton.value = "MORE DETAILS";
	}
};

ContextMenuFunctions.saveRuleProperties = function(form) {

	var jsonData = {},
		ruleProperties = [],
		property = {},
		connname,
		connId,
		ruleId;
		// Retrieve type fields from form

	$(form).find('div#ruleName').find(':input').each(function(i, field) {
		jsonData[field.name] = field.value;
	});

	ruleId = jsonData["ruleid"];
	var first = true;
	if (ruleMapViaId[ruleId].typeProperties.length > 0) {
		first = false
	}


	// grab the conn object
	var connObj = connMapViaId[connId];

	// Retrieve Type properties fields from form
	$(form).find('div#propertiesFields').find('div')
		.each(function(i, propDiv) {
			$(propDiv).find(':input').each(
				function(i, field) {
					if ((field.type != 'submit' && field.type != 'radio' && field.type != 'button') || field.checked) {
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
			property = {};
		});
		// attach properties to JSON

	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name;
	jsonData["namespace"] = loggedInUserName;
	jsonData["fields"] = ruleProperties;

	console.log(jsonData);
	var successFunction = function(data) {

		CommonFctsLogical.HandlingErrorMSG("Rule Properties added successfully. data:" + data.name, "success");
		console.log("Rule Properties create success. data: " + data.name);
		// on success on a new property for a rule, we just want to update the property list
		ruleMapViaId[ruleId].typeProperties = data.typeProperties;
		console.log("returned properties" + data.typeProperties)
		tdvCy.filter('node[name="' + data.name + '"]').data(data);
		tdvCy.$('#' + data.id + '').data('name', data.name);
		ContextMenuFunctions.CancelAddRuleProperties(ruleId);

		if (first) {
			CommonFctsLogical.addTooltip(data);
		} else {
			CommonFctsLogical.updateTooltip(data);
		}

		$("[data-id=rule" + ruleId + "]").parent().parent().parent().css({
			"display" : "none"
		});

		//		CommonFctsLogical.updateTooltip(data);

	};

	var failFunction = function(xhr, status, error) {
		$('#typeForm').empty();
		document.getElementById('typeForm').textContent = "Error Rule properties not saved";
		CommonFctsLogical.HandlingErrorMSG("Rule Properties Failed to be added for rule:" + data.name, "error");
	};

	var connApis = new ConnectionApis();
	connApis.addRuleProperties(jsonData, successFunction, failFunction);

}

ContextMenuFunctions.showUpdateLink = function(ruleid) {

	var Form,
		rule,
		formHeader,
		formFooter,
		Props,
		inputs = '';
	Form = document.createElement('div');
	rule = ruleMapViaId[ruleid];

	formHeader = "<form id='updateruleDialog'>";

	inputs += "<table class='table-responsive-sm'  id='ruleName'>";
	inputs += "<tr><td colspan='2'><input type='hidden' name='ruleId'  value='" + rule.id + "'></td></tr>";
	$.each(rule, function(key, value) {
		if (key == 'id') {
			inputs += "<tr><td colspan='2'><input type='hidden' name ='" + key + "' value='" + value + "' /></td></tr>";
		} else if (key == "name") {
			inputs += "<tr><th>" + key + "</th><td><input type='text' name ='newName' value='" + value + "'/></td></tr>";
		}
	//		else if (key == "classification") {
	//			inputs += "<tr><th>" + key + "</th><td><input type='text' name ='" + key + "' value='" + value + "'/></td></tr>";
	//		}
	});


	Props = rule.typeProperties;
	if (Props == null) {
		inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";
	} else {
		inputs += "<tr><th colspan='2' style='background-color: #CDEEDD'> Properties:</th></tr></table>";
		$.each(Props, function(key, value2) {
			inputs += "<table id='propertiesFields'>";
			$.each(value2, function(key, value) {
				if (key == 'id') {
					inputs += "<input type='hidden' name='id' value='" + value + "'>";
				} else if (key == 'name') {
					inputs += "<tr><th>" + key + "</th><td><input type='text' name='name' value='" + value + "'/></td></tr>";
				} else if (key == 'isMandatory' || key == 'isUnique') {
					inputs += "<tr><th>" + key + ":</th>";
					inputs += "<td><input type='checkbox' name='" + key + "' ";
					if (value == true) {
						inputs += "checked";
					}
					inputs += "></td></tr>";
				} else if (key == 'propertyType') {
					inputs += "<tr><th>" + key + "</th><td><select name='" + key + "'><option value='INTEGER' ";

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
					//					inputs += ">FILE</option><option value='CURRENCY' ";
					//
					//					if (value == "CURRENCY") {
					//						inputs += "selected='selected'";
					//					}
					//					inputs += ">CURRENCY";
					inputs += ">FILE</option></select></td></tr>";

				} else if (key == 'maxValue' || key == 'minValue') {
					inputs += "<tr><th>" + key + ":</th>";
					inputs += "<td><input type='text' name='" + key + "' value='" + value + "'></td></tr>";
				}
			//				else {
			//					if ((key != 'id') && (key != 'romeDecoPropId') && (key != 'validValues')) {
			//						inputs += "<tr><th>" + key + "</th><td><input type='text' name='" + key + "' value='" + value + "'/></td></tr>";
			//					}
			//				}
			});
			inputs += "<tr><td colspan='2'>---------------------------------</td></tr>";
		});
	}

	// <!-- Allow form submission with keyboard without duplicating the dialog
	// button -->
	formFooter = "<tr><td><input type='button' value='UPDATE LINK' class='btn btn-primary btn-xs'   onclick='ContextMenuFunctions.saveUpdateLinkByGroup(form)' /></td>";
	formFooter += "<td><input type='button'  value='CANCEL'     class='btn btn-primary btn-xs' onclick='ContextMenuFunctions.CancelAddRuleProperties(" + rule.id + ")'></td></tr><table></form>";
	Form.innerHTML = formHeader + inputs + formFooter;

	$('#typeForm').empty();
	$('#typeForm').append(Form);

}

ContextMenuFunctions.saveUpdateLinkByGroup = function(form) {
	var jsonData = {},
		ruleProperties = [],
		jsonProperty = {},
		decos = [],
		foundError = false,
		ruleId;
	var node = {};
	$(form).find('table#ruleName').find(':input').each(function(i, field) {
		if ((field.type != 'submit') && (field.type != 'radio') || field.checked && (field.value != 'Cancel')) {
			if ((field.name == 'ruleId') || (field.name == 'newName') || (field.name == 'classification')) {
				if (field.name == 'newName' && !field.value) {
					console.log("Missing Value for rule Name.");
					$('#typeForm').append("<br/><p style='color:red'>Missing Value for rule name : </p>");
					foundError = true;
				}
				jsonData[field.name] = field.value;
			}
		}

	});

	ruleId = jsonData["ruleId"];
	var oldname = ruleMapViaId[ruleId].name;
	var newname = jsonData["newName"];
	if (foundError) {
		return;
	}
	// remove original typename to pass as path parameter
	//	if (ruleMapViaId[ruleId].decorators) {
	//		jsonData["decorators"] = ruleMapViaId[ruleId].decorators;
	//	}

	jsonData["namespace"] = loggedInUserName;
	jsonData["grouphost"] = userGroup.host;
	jsonData["groupname"] = userGroup.name;

	jsonData["owner"] = loggedInUserName;
	console.log(jsonData);

	var successFunction = function(data) {
		if (!jQuery.isEmptyObject(data.rule)) {
			console.log("Rule update success. data: " + data.rule);
			ruleMapViaId[ruleId] = data.rule;
		} else {
			console.log("API call successful but error in return response in rule update");
		}
		//		tdvCy.filter('node[name="' +data.name + '"]').data(data.rule);

	};

	var failFunction = function(xhr, status, error) {
		document.getElementById('typeForm').textContent = "Error Rule not updated";
		console.log("Error Rule not updated: " + xhr.responseText);
		return;
	};

	var apis = new RuleApis();
	apis.updateRule(jsonData, successFunction, failFunction);

	$(form).find('table#propertiesFields').each(
		function(i, propDiv) {
			$(propDiv).find(':input').each(
				function(i, field) {
					if (field.type != 'submit' && field.type != 'button' && field.value != 'CANCEL') {
						if ((field.name == 'propertyType') && (field.value == 'TEXT')) {
							jsonProperty[field.name] = 'STRING';
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
			ruleProperties.push(jsonProperty);
			jsonProperty = {};
		})


	var retproperties = [];
	var jsonDatarule = {};
	var error = false;
	if (!jQuery.isEmptyObject(ruleProperties)) {
		$.each(ruleProperties, function(key, value) {
			jsonDatarule["updateProperty"] = value;
			jsonDatarule["ruleId"] = Number(ruleId);

			jsonDatarule["namespace"] = loggedInUserName;
			jsonDatarule["groupname"] = userGroup.name;
			jsonDatarule["grouphost"] = userGroup.host;
			var successFunction = function(data) {

				console.log("Rule Properties update success. data: " + data.rule.name);
				retproperties = data.rule.typeProperties;

			};

			var failFunction = function(xhr, status, error) {
				document.getElementById('typeForm').append("Error Rule properties not updated");
				error = true;
			};

			var ruleapis = new RuleApis();
			ruleapis.updateRuleAndProperties(ruleId, jsonDatarule, successFunction, failFunction);
		});
	}

	if (!error) {
		if (oldname != newname) {
			tdvCy.$('#rule' + ruleId + '').data('name', newname); // update type in cytoscape
			document.getElementById("rule_" + ruleId).innerHTML = newname;
		}
		ruleMapViaId[ruleId].typeProperties = retproperties;
		$('#typeForm').empty();

		//		tdvCy.filter('node[name="' + ruleMapViaId[ruleId].name + '"]').data(data); ??? how to update the cytoscape elements
		ContextMenuFunctions.CancelAddRuleProperties(ruleId)
		CommonFctsLogical.updateTooltip(ruleMapViaId[ruleId]);

	}
};

ContextMenuFunctions.closeNav = function() {
	document.getElementById("mySidebotnav").style.height = '';
}




//**************************** NODE Functions 
//ContextMenuFunctions.addType = function(typeName, typeIsRoot, owner, classification, decorators, pos) {
//	var typeId = null;
//	var decoProps = predefinedSelectedDecoPropertiesMap;
//	var jsonData = {};
//	var newDecoProperties = [];
//	if ($.isEmptyObject(pos)) {
//		console.log(" Position is not defined ");
//	}
//
//	jsonData["name"] = typeName;
//	jsonData["isRoot"] = typeIsRoot;
//	jsonData["classification"] = classification;
//	jsonData["owner"] = owner;
//	jsonData['decorators'] = decorators;
//
//	jsonData["namespace"] = loggedInUserName;
//	jsonData["grouphost"] = userGroup.host;
//	jsonData["groupname"] = userGroup.name;
//
//	DesignSavingFcts.setJsonDataCreation(typeName, typeIsRoot, classification, jsonData);
//
//	console.log(jsonData);
//	var successFunction = function(data) {
//		if (!$.isEmptyObject(data)) {
//
//			DesignSavingFcts.clearSelection();
//			CommonFctsLogical.HandlingErrorMSG(classification + " Creation Successfully", "success");
//
//			if (!$.isEmptyObject(pos)) {
//				DesignCytoscapeUtils.updatePosition(data, 'x', pos.x);
//				DesignCytoscapeUtils.updatePosition(data, 'y', pos.y);
//			}
//			var tmpObj = data;
//			console.log(data);
//
//
//			if (typeMapViaId[tmpObj.id]) {
//				delete typeMapViaId[tmpObj.id];
//			}
//			data.color = defaultNodeColor;
//			data.size = defaultTypeSize;
//
//			typeMapViaId[tmpObj.id] = data;
//
//			TypeUtils.globalCreateType(data);
//			listTypeIds[0] = data.id;
//			typeId = tmpObj.id;
//
//		} else {
//			CommonFctsLogical.HandlingErrorMSG("Type Created Succeesfully- API Success but no data returned", "warning");
//		}
//	};
//
//	var failFunction = function(xhr, status, error) {
//		console.log(' SAVE TYPE Error : ' + xhr.status);
//		console.log(' what are these : ' + xhr.responseJSON);
//		console.log(' what are these : ' + xhr.responseJSON.exceptionCode);
//		console.log(' what are these : ' + xhr.responseXML);
//		console.log(' what are these : ' + xhr.statusText);
//		console.log(' what are these : ' + xhr)
//		console.log(' what are these : ' + status)
//		console.log(' what are these : ' + error)
//
//	};
//
//	var apis = new TypeApi();
//	apis.createTypeByGroup(selectedMetaData, jsonData, successFunction, failFunction);
//
//	if (typeId != null) {
//		var preferenceList = [];
//		var preference1 = {
//			name : "size",
//			propertyType : "STRING",
//			defaultValue : "0"
//		};
//		var preference2 = {
//			name : "color",
//			propertyType : "STRING",
//			defaultValue : "0"
//		};
//		preferenceList.push(preference1);
//		preferenceList.push(preference2);
//
//		var dlRenderer = new DesignLogicalRenderer();
//		dlRenderer.addPreferenceToTypeBatch(typeId, preferenceList);
//		tdvCy.filter("node[id='" + listTypeIds[0] + "']").select();
//
//	} else {
//		CommonFctsLogical.HandlingErrorMSG("Type Creation did not return typeId -- no creation of preferences (size, color)", "warning");
//	}
//	return typeId;
//}
//ContextMenuFunctions.addLink = function(linkName, classification, pos) {
//
//	var jsonData = {};
//	jsonData["name"] = linkName;
//	jsonData["ruleclassification"] = classification;
//
//	jsonData["namespace"] = loggedInUserName;
//	jsonData["grouphost"] = userGroup.host;
//	jsonData["groupname"] = userGroup.name;
//
//	console.log(jsonData);
//
//	var successFunction = function(data) {
//		console.log("<p style='color:blue'>Link creation successful</p>");
//		DesignCytoscapeUtils.getAllSelectedTypes(tdvCy);
//		CommonFctsLogical.UnselectTypes();
//		CommonFctsLogical.UnselectConnections();
//		if (!ruleMapViaId[data.id]) {
//			ruleMapViaId[data.id] = data;
//		//			ruleMap[data.name] = data;
//		}
//		CommonFctsLogical.HandlingErrorMSG("Create  Link successfull", "success");
//
//		var element = DesignCytoscapeUtils.formatNewLink(data);
//		element.renderedPosition.x = pos.x;
//		element.renderedPosition.y = pos.y;
//		var newElement = tdvCy.add(element);
//		tdvCy.filter('node[name="' + data.name + '"]').data(data);
//		DesignCytoscapeUtils.attachTypeClickActions(newElement.filter('node'));
//
//		(new DesignLogicalRenderer()).initDesignBar(ruleMapViaId, "linklist");
//
//		listTypeIds[0] = null;
//		tdvCy.filter("node[id='#rule" + data.id + "']").select();
//
//	};
//
//	var failFunction = function(xhr, status, error) {
//		console.log('Error Link not created: ' + xhr.status);
//		CommonFctsLogical.HandlingErrorMSG("Error Link not created", "error");
//	};
//
//	var apis = new ConnectionApis();
//	apis.saveNewLink(selectedMetaData, jsonData, successFunction, failFunction);
//}

//ContextMenuFunctions.displayRuleProperty = function( property, displayFunction  ) {
//console.log("Inside  ContextMenuFunctions.displayRuleProperty   ");
//var inputs = "";
//if( displayFunction == null ) {
//	// generate the properties fields
//	console.log("Generate properties fields ");
//	if ( property == null ) {
//	} else {	
//		if (property.isMandatory == true) {
//			inputs += "<tr><td style='color:red'>" + property.name + "</td>";
//		} else {
//			inputs += "<tr><td>" + property.name + "</td>";
//		}
//	     if( property.propertyType == 'STRING' ) {
//	    	 inputs += "<td>TEXT</td>";
//	     } else {
//	    	 inputs +="<td>" + property.propertyType + "</td>";
//	     }
//		 inputs += "</tr></table></td><tr>"; 
//	} 	
//} else {
//	return displayFunction( null, property );
//}
//return inputs;	
//};

//ContextMenuFunctions.displayNodeProperties = function(node, typeId, pos, e) {
//
//	$(".qtip").remove();
//
//	var qtipDiv = document.createElement('div');
//	qtipDiv.id = 'typeForm';
//	qtipDiv.className = 'block';
//	qtipDiv.innerHTML = "";
//
//	node.qtip({
//		content : {
//			title : {
//				text : "Type Details",
//				button : true
//			},
//			text : function() {
//				//						var inputs  = ContextMenuFunctions.displayTypeProperties( typeMapViaId[typeId], true);
//				var inputs = ContextMenuFunctions.showUpdateType(typeMapViaId[typeId], true);
//				qtipDiv.innerHTML = "";
//				qtipDiv.append(inputs);
//				if (typeMapViaId[typeId].classification != 'DCT') {
//					if (document.getElementById(typeId).length > 0) {
//						document.getElementById(typeId).style.border = "solid red";
//					}
//				}
//				return qtipDiv;
//			}
//		},
//		show : {
//			event : 'cxttap',
//			ready : true,
//		},
//		position : {
//			my : 'top center',
//			at : 'bottom center',
//			//					target : 'mouse',
//			adjust : {
//				method : 'shift',
//				resize : true,
//				scroll : true
//			},
//			viewport : $("#cy")
//		},
//		style : {
//			classes : 'qtip-rounded',
//			tip : true
//		},
//		hide : {
//			e : 'click',
//			leave : 'window'
//		},
//		events : {
//			hide : function(event, api) {
//				api.destroy();
//				if (typeMapViaId[typeId].classification != 'link' && typeMapViaId[typeId].classification != 'DCT') {
//					document.getElementById(typeId).style.border = "";
//				}
//				tdvCy.$("#" + typeId).unselect();
//				listTypeIds = [];
//			}
//		}
//	}, e);
//
//}