/**
 * Desc:	Event handlers/functions for romeType
 * Author:	Baya Benrachi
 * Date:	28 March 2016
 * Update:  07 June   2016
 */


////============================== New Section using sidebar =========================
////===================================================================================
//function showType(selectedObj) {
//	$("#grid-types").css({'visibility':'visible'});
//	var name;
//	var Form = document.createElement('div');
//	document.getElementById('Infotitle').textContent="Type Details";
//	var inputs = "";
//	var formHeader = "<table>";
//	$.each(selectedObj, function(key, value) {
//		if(key == 'name')  {
//				inputs += "<tr><th>" + key + "</th>";
//				if (value == '') {inputs += "<td>None</td><tr>"; }
//				else {  name = value; inputs += "<td>" + value + "</td><tr>";	
//				setCurType(value);
//				}
//			} 
//		if (key == 'isRoot') {
//			inputs += "<tr><th>"+key +":</th>";
//			inputs += "<td><input type='radio' name='isRoot' ";
//		    if (value == true) { inputs += " value='true'  checked='checked' >true </td></tr>"}
//		    else { inputs += " value='false'  checked='checked' >false </td></tr>";     }
//		}
//	});
//	var Props = selectedObj.properties;	
//	if (Props.length == 0) {inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";}
//	else {	
//			inputs += "<tr><th colspan='7' style='background-color: #CDEEDD'> Properties:</th></tr>";
////			inputs += "<tr><td><hr COLOR='black'></td></tr>";
//			
////			inputs += "<tr><th> Name</th><th>Type</th><th>isMandatory</th><th>isUnique</th><th>minValue</th><th>maxValue</th><th>defaultValue</th>";
//			Props.forEach(function(property) {
//				 inputs += "<tr style='background-color: grey'><th> Name</th><th>Type</th><th>Default</th></tr>";
//				 //  added other values
//			     inputs += "<tr><td>" + property.name + "</td>";
//			     //  need to change this to Dropdown list
//			     if(property.propertyType == 'STRING'){inputs += "<td>TEXT</td>";}
//			     else {inputs +="<td>" + property.propertyType + "</td>";}
//			     if(property.defaultValue){inputs += "<td>"+property.defaultValue+"</td>";}else {inputs +="<td></td>";};
//			     inputs += "</tr>";
//				
//			     inputs += "<tr><td><button id='type_prop_detail_button_"+property.id+"' onclick=\"showOrHideTypePropDetails('"+property.id+"')\">Show Details</button></td></tr>";
//
////			     class='btn btn-box-tool' 
//			     inputs += "<tr><td><table id='type_prop_detail_"+property.id+"' style='display:none'>";
//			     inputs += "<tr><th>Mandatory</th><th>Unique</th></tr>";
//			     inputs += "<tr>";
////			     if(property.isMandatory){inputs += "<td>"+property.isMandatory+"</td>";}else {inputs +="<td>...</td>";};
////			     if(property.isUnique){inputs += "<td>"+property.isUnique+"</td>";}else {inputs +="<td>...</td>";};
//			     inputs += "<td>"+property.isMandatory+"</td>";
//			     inputs += "<td>"+property.isUnique+"</td>";
//			     
//			     
//			     inputs += "</tr>";
//			     
//			     inputs += "<tr><th>Min</th><th>Max</th></tr>";
//			     inputs += "<tr>";
//			     if(property.minValue){inputs += "<td>"+property.minValue+"</td>";}else {inputs +="<td>...</td>";};
//			     if(property.maxValue){inputs += "<td>"+property.maxValue+"</td>";}else {inputs +="<td>...</td>";};
//				 inputs += "</tr></table></td><tr>";
//				 
//				 inputs += "<tr><td><hr COLOR='black'></td></tr>";
//			});
//	} 
//	var formFooter  = "</table>";
//	    formFooter += "<input type='button' value='Add Properties' class='btn btn-primary btn-xs'    onclick='AddTypeProperties();'/>";
//	    formFooter += "<input type='button' value='Update Type'    class='btn btn-btn-primary btn-xs'    onclick='UpdateTypeForm()'/>";
//	Form.innerHTML = formHeader + inputs + formFooter;
//	$('#typeForm').empty();
//	$('#typeForm').append(Form);	
//}

//function showOrHideTypePropDetails(id) {	
//	var typeDetail = 'type_prop_detail_'+id;;
//	var buttondetail = 'type_prop_detail_button_' + id
//	var typePropDetailButton = document.getElementById(buttondetail);
//	var propDetailHide = document.getElementById(typeDetail).style.display == "none";
//	
//	if (propDetailHide == true) {
//		$("#"+typeDetail).show();
//		typePropDetailButton.innerHTML = "Hide Details";
//		
//	} else {
//		$("#"+typeDetail).hide();	
//		typePropDetailButton.innerHTML = "Show Details";
//		
//	}
//}

////#########################################################################################
////========================== This to update TYPE info and its Properties
////#########################################################################################
//function UpdateTypeForm() {
//	var Form = document.createElement('div'); var type = typeMap[nametype];
//	document.getElementById('Infotitle').textContent="Update Type";
//	var formHeader = "<form id='updateTypeDialog'>", inputs = "";
//	    inputs += "<table id='typeName'>";
//	    inputs += "<tr><td colspan='2'><input type='hidden' name='oldtypename'  value='"+ nametype+"'></td></tr>";
//	    $.each(type, function(key, value) {
//	    	if(key == "name") {
//				inputs += "<tr><th>"+key + "</th><td><input type='text' name ='"+key+"' value='"+value+"' disabled/></td></tr>";
//			}
//	    	
//			if(key == "classification") {
//				inputs += "<tr><th>"+key + "</th><td><input type='text' name ='"+key+"' value='"+value+"' /></td></tr>";
//			}
//			
//			if (key == 'isRoot') {
//				inputs += "<tr><th>"+key +":</th>";
//				inputs += "<td><input type='radio' name='isRoot' value='true'";
//			    if (value == true) { inputs += "checked='checked'";};   inputs += ">true<br/>";
//			    inputs += "<input type='radio' name='isRoot' value='false'";
//			    if (value == false) { inputs += "checked='checked'";};  inputs += ">false</td></tr> ";
//			}
//			});
//           
//		// set value
//		var ownerId = 123;
//		inputs += "<tr><td colspan='2'><input type='text' name='owner' value='" + ownerId + "' style='visibility:hidden; position:absolute; top:-100px;' /></td></tr>";
//		inputs += "<tr><td colspan='2'><input type='text' name='isRoot' value='true' style='visibility:hidden; position:absolute; top:-100px;' /></td></tr>";
//
//		//============= Enable Decorators for Type  ==================================
//		//For Geo
//		//Hard code the id for geo view now
//		var hasGeo = false;
//		for (var i = 0; i < type.decorators.length; i++) {
//			if (type.decorators[i] == 4) { //Hard code the id for geo view now 
//				hasGeo = true;
//				break;
//			}
//		}
//		if (hasGeo == true) {
//			inputs += "<tr><td colspan='2'>Geo View&nbsp;&nbsp;<label class=\"switch\"><input id=\"geoActivator\" name=\"geoActivator\" type=\"checkbox\" value=\"4\" checked=\"checked\"><div class=\"slider round\"></div></label><br></td></tr>"
//		} else { 
//			inputs += "<tr><td colspan='2'>Geo View&nbsp;&nbsp;<label class=\"switch\"><input id=\"geoActivator\" name=\"geoActivator\" type=\"checkbox\" value=\"4\"><div class=\"slider round\"></div></label><br></td></tr>"
//		}
//		//============= Updating Decorators  ==================================
////		var decoDropdownList = "";
////		$.each(decoMap, function(i, deco) {
////			if (type.decorators.indexOf(deco.id) >= 0) {
////				decoDropdownList += "<option  value='" + deco.id + "' selected='selected'>" + deco.name + "</option>";
////			} else {
////				decoDropdownList += "<option  value='" + deco.id + "'>" + deco.name + "</option>";
////			}
////		});
////		inputs += "<tr><td><label style='visibility:visible;> Update Decorators: <span style='color:red'>*Required</span> <select name='decorators' id='decorators' =" +
////		"  multiple='multiple'>";
//////		inputs += "<label style='visibility:hidden; position:absolute; top:-100px;'> Select Decorator: <span style='color:red'>*Required</span> <select name='decorators' id='decorators' =" +
//////				"  multiple='multiple'  onclick='displayDecoProperties(this);'>";
////		inputs += decoDropdownList;
////		inputs += "</select></label><br/></td></tr>";
//		
//		var Props = type.properties;
//		if (Props == null) {inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";}
//		else {
//			inputs += "<tr><th colspan='2' style='background-color: #CDEEDD'> Properties:</th></tr></table>";
//			Props.forEach(function(prop) {
//					inputs += "<table id='propertiesFields'>";
//					$.each(prop, function(key,value){	
//							if (key == 'name') { 
//								inputs += "<input type='hidden' name='currentPropertyName' value='"+value+"'>";
//								inputs += "<tr><th>"+key+"</th><td><input type='text' name='propertyName' value='"+value+"' disabled/></td></tr>";
//								}
//							else  { if((key != 'id')&& (key!='romeDecoPropId')&& (key != 'validValues'))
//								{inputs += "<tr><th>"+key+"</th><td><input type='text' name='"+key+"' value='"+value+"'/></td></tr>";}
//						     }
//						});
//					inputs += "<tr><td colspan='2'>---------------------------------</td></tr>";
//					});
//			 }
//	
//			
//			// <!-- Allow form submission with keyboard without duplicating the dialog button -->
//			var formFooter = "<tr><td><input type='button' value='Update Type' class='btn btn-primary btn-xs'   onclick='updateType(form)' /></td>";
//			formFooter += "<td><input type='button'  value='Cancel'     class='btn btn-primary btn-xs' onclick='emptyAll()'></td></tr><table></form>";
//			Form.innerHTML = formHeader + inputs + formFooter;
//			$('#typeForm').empty();
//			$('#typeForm').append(Form);
//			
//}
////===================================================================================
//function AddTypeProperties() {                                       // the selected name of the type is saved in the Global variable
//	var type = typeMap[nametype];
//	console.log("Type name is " +nametype);
//	var Form = document.createElement('div');  
//	var formHeader = "<form id='typeProps'  method='post'>", inputs = "";
//     	inputs += "<div id='typeName'><label>Type Selected: </label>"+nametype+"<input type='hidden' name='typename' value='"+nametype+"'/></div>";
////		inputs += "<a href='#' onclick='addProperties()'> + Add property</a>";
//		inputs += "<button type='button' class='btn btn-success btn-xs'   onclick='addProperties()'>Add property</button>";
//
//	var formFooter = "<div id='propertiesFields'></div>";
//		formFooter += "<input id='save_type_prop_button' type='button' value='Save properties'  class='btn btn-success btn-xs' onclick='saveTypeProperties(form)'></form>";
//	Form.innerHTML = formHeader + inputs + formFooter;
//	$('#typeForm').empty();
//	$('#typeForm').append(Form);	
//	
//	
//	 var newProperty = document.createElement('div');
//	 var properties = "<hr/><table>";
//	    properties += "<tr><th>Name & Type:</th><td><input type='text' name='propertyName' size='10' />";
//	    properties += "<select name='propertyType'>" +
//				"<option value='INTEGER'>INTEGER</option>"+
//				"<option value='DOUBLE'>DOUBLE</option>"+
//				"<option value='DATE'>DATE</option>"+
//				"<option value='STRING'>TEXT</option>"+
//				"<option value='BOOLEAN'>BOOLEAN</option>"+
//				"</select></td></tr>";
//	 
//		properties += "<tr><th> isMandatory:</th><td>";
//		properties += "<input type='radio' name='isMandatory' value='true' checked='checked'/>Yes";
//		properties += "<input type='radio' name='isMandatory' value='false' />No";
//		properties += "</td></tr>";
//		
//		properties += "<tr><th> isUnique: </th><td>";
//		properties += "<input type='radio' name='isUnique' value='true' checked='checked'/>Yes";
//		properties += "<input type='radio' name='isUnique' value='false' />No";
//		properties += "</td></tr>";
//		
//		
//		properties += "<tr><th>Default Value:</th><td> <input type='text' name='defaultValue' /></td></tr>";
//		properties += "<tr><th>Max Value:</th><td> <input type='text' name='maxValue' /></td></tr>";
//		properties += "<tr><th>Min Value:</th><td> <input type='text' name='minValue' /></td></tr></table>";
//		
//		newProperty.innerHTML = properties;
//		document.getElementById('propertiesFields').appendChild(newProperty);
//		if (document.getElementById('propertiesFields').innerHTML != '') {
//			document.getElementById("save_type_prop_button").style.visibility = 'visible';
//		}
//}
////=====================================================================================
////======================================================================================================
////This is used for displaying properties for TYPE and Rule
////======================================================================================================
//function addProperties(){
// var newProperty = document.createElement('div');
// var properties = "<hr/><table>";
//    properties += "<tr><th>Name & Type:</th><td><input type='text' name='propertyName' size='10' />";
//    properties += "<select name='propertyType'>" +
//			"<option value='INTEGER'>INTEGER</option>"+
//			"<option value='DOUBLE'>DOUBLE</option>"+
//			"<option value='DATE'>DATE</option>"+
//			"<option value='STRING'>TEXT</option>"+
//			"<option value='BOOLEAN'>BOOLEAN</option>"+
//			"</select></td></tr>";
// 
//	properties += "<tr><th> isMandatory:</th><td>";
//	properties += "<input type='radio' name='isMandatory' value='true' checked='checked'/>Yes";
//	properties += "<input type='radio' name='isMandatory' value='false' />No";
//	properties += "</td></tr>";
//	
//	properties += "<tr><th> isUnique: </th><td>";
//	properties += "<input type='radio' name='isUnique' value='true' checked='checked'/>Yes";
//	properties += "<input type='radio' name='isUnique' value='false' />No";
//	properties += "</td></tr>";
//	
//	
//	properties += "<tr><th>Default Value:</th><td> <input type='text' name='defaultValue' /></td></tr>";
//	properties += "<tr><th>Max Value:</th><td> <input type='text' name='maxValue' /></td></tr>";
//	properties += "<tr><th>Min Value:</th><td> <input type='text' name='minValue' /></td></tr></table>";
//	
//	newProperty.innerHTML = properties;
//	document.getElementById('propertiesFields').appendChild(newProperty);
//	if (document.getElementById('propertiesFields').innerHTML != '') {
//		document.getElementById("save_type_prop_button").style.visibility = 'visible';
//	}
// 
//}

//function hasDeco (type, decoId) {
//	var typeHasDeco = false;
//	if(type && type.decorators){
//	for (var i = 0; i < type.decorators.length; i++) {
//		if (type.decorators[i] == decoId) {
//			typeHasDeco = true;
//			break;
//		}
//	}
//	}
//	return typeHasDeco;
//}

//=====================================================================================
//============== OLD Code using Dialog  ===============================================
//=====================================================================================
//function showAddTypeDialog() {
//	if (selectedMetaData != null){
//		var dlg_width = 300, dlg_height = 300, dlg_offset_x = 300, dlg_margin_top = 300;
//		var dialog = $('#dialog');
//		
//		dialog.dialog({
//			width : dlg_width,
//			autoOpen : false,
//			position : {
//				my : "center center",
//				at : "center center",
//				of : "#gvTabContent"
//			},
//			buttons : {
//				"Add Type" : function() {
//					var elt = document.getElementById('decorators');
//					var unfilled = $('[required').filter(function(){ return $(this).val().length === 0;});
//					console.log(" returned "+unfilled);
//					if((unfilled.length==0)&&(elt.selectedIndex != -1)) {
//													saveNewType(dialog.find("form"));}
//					else {alert("Please Enter infor or select decorator(s)");}
//				},
//			Cancel : function() {
//					dialog.dialog("close");
//				}
//			}
//		});
//		if (!hasMoved && dialog.dialog("instance")) {
//			grayOut(true);
//	
//			var formHeader = "<form id='addTypeDialog'>", inputs = "";
//			
//			// Name field
//			inputs += "<div id='typeName'><label>Name: <input type='text' name='name' required='required'/></label><br />";
//			
//			// Type Classification Radio Button 
//			inputs += "<label>Classification: ";
//			inputs += "<input type='radio' name='classification' value='node' checked='checked' />Node";
//			inputs += "<input type='radio' name='classification' value='path' />Path";
//			inputs += "</label><br />";
//			//================================================================================
//			// Hidden fields, ownerId, isRoot flag
//			var ownerId = 123;
//			inputs += "<input type='text' name='owner' value='" + ownerId + "' style='visibility:hidden; position:absolute; top:-100px;' />";
//			var isRoot = true;
//			inputs += "<input type='text' name='isRoot' value='"+ isRoot + "' style='visibility:hidden; position:absolute; top:-100px;' /></div>";
//			
//			//============= Adding selection of Decorators  ==================================
//			var decoDropdownList = "";
//			$.each(decoMap, function(i, deco) {
//				decoDropdownList += "<option  value='" + deco.id + "' selected='selected'>" + deco.name + "</option>";
//			});
//			inputs += "<label style='visibility:hidden; position:absolute; top:-100px; > Select Decorator: <span style='color:red'  >*Required</span> <select name='decorators' id='decorators' =" +
//					"  multiple='multiple'  onclick='displayDecoProperties(this);'>";
//			inputs += decoDropdownList;
//			inputs += "</select></label><br/>";
//			
//			//============ Adding Deco properties after selection of decos==================
//	         inputs += "<div id='decopropertieslist'></div>";
//	        
//			
//			// <!-- Allow form submission with keyboard without duplicating the dialog button -->
//			var formFooter = "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px;' />";
//	
//			dialog.dialog("option", "title", "Add Type");
//			dialog[0].innerHTML = formHeader + inputs + formFooter;
//			dialog.dialog("open");
//		}
//	
//	    dialog.find("form").on("submit", function(event) {
//	    	event.preventDefault();
//	    	var elt = document.getElementById('decorators');
//			var unfilled = $('[required').filter(function(){ return $(this).val().length === 0;});
//			console.log(" returned "+unfilled);
//			if((unfilled.length==0)&&(elt.selectedIndex != -1)) {
//											saveNewType(this);}
//			else {alert("Please Enter infor or select decorator(s)");}
//	    });
//	} else {alert("please select a MetaData Repo ");}   
//}
//
////==============================================================================
//function displayDecoProperties(decoList){
//
//	var inputs = ""; 
//	// retrieve the selected decorators to display their properties: 
//	var opts = [], opt;
//	var values = decoList.options;
//	for(var i=0; i<values.length; i++ ){   
//	//	opt = values[i];
//		if(values[i].selected) { 
//			console.log(values[i].value);
//			opts.push(values[i]);
//			}
//	}
//   var  decoProps; var inputsDecoProps ='';
//   for( var i=0; i<opts.length; i++){        // loop through all selected decorators
//	//   display the decorator ID selected
//	   $.each(decos, function(key, value){   
//		  if (value.id == opts[i].value) {
//			  // retrieve all deco properties 
//			  decoProps = value.decoProps;
//			  inputsDecoProps = "<table  id='decoproperties'>";
//			  inputsDecoProps += "<tr><td colspan='2'>Fill in the Properties values for Decorator "+value.name;
//			  inputsDecoProps += " :<input type='hidden' name='decoId' value='"+ value.id+"'></label></td>,</tr>";
//			  // loop through to display list of properties to enter values for
//			  decoProps.forEach(function(decoProperty){
//				  if(decoProperty.design && !decoProperty.isHidden){
//				      inputsDecoProps += "<tr><th>" + decoProperty.name +"</th><td>: <input type='text' name='"+decoProperty.name+"'  />(" + 
//					              decoProperty.propertyType + ")</td></tr>";
//				  }
//				});
//			  inputsDecoProps += "</table>";
//			  inputs += inputsDecoProps;
//    		  }
//    	   });
//       }
//	document.getElementById('decopropertieslist').innerHTML = inputs;
//	
//}

//#########################################################################################
//function addProperties(){
//	 var newProperty = document.createElement('tr');
//	 var properties='';
//	     properties += "<tr><td><input type='text' name='propertyName' /></td>";
//	     properties += "<td><select name='propertyType'>" +
//				"<option value='INTEGER'>INTEGER</option>"+
//				"<option value='DOUBLE'>DOUBLE</option>"+
//				"<option value='DATE'>DATE</option>"+
//				"<option value='STRING'>STRING</option>"+
//				"<option value='BOOLEAN'>BOOLEAN</option>"+
//				"</select></td>";
//
//		properties += "<td><input type='radio' name='isMandatory' value='true' />Yes";
//		properties += "<input type='radio' name='isMandatory' value='false' />No";
//		properties += "</td>";
//
//		properties += "<td><input type='radio' name='isUnique' value='true' />Yes";
//		properties += "<input type='radio' name='isUnique' value='false' />No";
//		properties += "</td>";
//		
//		properties += "<td><input type='text' name='maxValue' /></td>";
//		properties += "<td>Min Value: <input type='text' name='minValue' /></td></tr></table>";
//		
//		newProperty.innerHTML = properties;
//		$('#propertiesFields table').appendTo(newProperty);
//	 
//	}


//function addProperties(){
//	 var newProperty = document.createElement('div');
//	 var properties = "<hr/>";
//	    properties += "<label>Property Name:<input type='text' name='propertyName' /></label>";
//	    properties += "<label>" +
//				"<select name='propertyType'>" +
//				"<option value='INTEGER'>INTEGER</option>"+
//				"<option value='DOUBLE'>DOUBLE</option>"+
//				"<option value='DATE'>DATE</option>"+
//				"<option value='STRING'>TEXT</option>"+
//				"<option value='BOOLEAN'>BOOLEAN</option>"+
//				"</select></label><br />";
//	 
//		properties += "<label> isMandatory";
//		properties += "<input type='radio' name='isMandatory' value='true' />Yes";
//		properties += "<input type='radio' name='isMandatory' value='false' />No";
//		properties += "</label><br />";
//		
//		properties += "<label> isUnique";
//		properties += "<input type='radio' name='isUnique' value='true' />Yes";
//		properties += "<input type='radio' name='isUnique' value='false' />No";
//		properties += "</label><br />";
//		
//		properties += "<label>Max Value: <input type='text' name='maxValue' /></label><br />";
//		properties += "<label>Min Value: <input type='text' name='minValue' /></label><br />";
//		
//		newProperty.innerHTML = properties;
//		document.getElementById('propertiesFields').appendChild(newProperty);
//	 
//	}











//===================================================================================
//function showTypePropertiesDialog1(selectedObj) {
//	var dlg_width = 400, dlg_height = 150, dlg_offset_x = 300, dlg_margin_top = 300;
//	var dialog = $('#dialog');
//	
//	dialog.dialog({
//		width : dlg_width,
//		autoOpen : false,
//		position : {
//			my : "center center",
//			at : "center center",
//			of : "#gvTabContent"
//		},
//		buttons : {
//			"Add Properties": function(){
//				showAddTypePropertiesDialog(selectedObj.data());
//			},
//			"Update Type" : function() {
//				retrieveTypeProperties(selectedObj.data().id, 'update');
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
//		var formHeader = "<form id='propertiesDialog'>"
//			, inputs = "";
//
//		inputs += "<table>";
//		$.each(selectedObj.data(), function(key, value) {
//			 if((key == 'name')||(key == 'classification') ||( key == 'isRoot')|| (key == 'decorators') ) {
//					inputs += "<tr><th>" + key + "</th>";
//					if (value == '') {inputs += "<td>No value given previosusly</td><tr>"; }
//					else {  if (key == 'decorators') {
//														value.forEach(function(val){
//															 var namedeco = $.grep(decos, function(i,prop){
//																 if(i.id == val){ return i.name}
//																 });
//															 inputs += "<td>"+namedeco[0].name+"</td>";
//															 });
//														 inputs += "</tr>";
//							}else {	inputs += "<td>" + value + "</td><tr>";	}
//				} 	
//				}
//		});
//		var Props = selectedObj.data().properties;	
//		if (Props.length == 0) {inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";}
//		else {	
//				inputs += "<tr><th colspan='7' style='background-color: #CDEEDD'> Properties:</th><tr>";
//				inputs += "<tr><th> Name</th><th>Type</th><th>isMandatory</th><th>isUnique</th><th>minValue</th><th>maxValue</th><th>defaultValue</th>";
//				Props.forEach(function(property) {
//					//  added other values
//				     inputs += "<tr><th>" + property.name + "</th><td>" + property.propertyType + "</td>";
//				     if(property.isMandatory){inputs += "<td>"+property.isMandatory+"</td>";}else {inputs +="<td></td>";};
//				     if(property.isUnique){inputs += "<td>"+property.isUnique+"</td>";}else {inputs +="<td></td>";};
//				     if(property.minValue){inputs += "<td>"+property.minValue+"</td>";}else {inputs +="<td></td>";};
//				     if(property.maxValue){inputs += "<td>"+property.maxValue+"</td>";}else {inputs +="<td></td>";};
//				     if(property.defaultValue){inputs += "<td>"+property.defaultValue+"</td>";}else {inputs +="<td></td>";};
//					 inputs += "</tr>";
//				});
//				} 
//		var formFooter = "</table></form>";
//
//		dialog.dialog("option", "title", "Type");
//		dialog[0].innerHTML = formHeader + inputs + formFooter;
//		dialog.dialog("open");
//	}
//}

//function showAddTypePropertiesDialog(node) {
//	if (selectedMetaData != null){
//		var dlg_width = 400, dlg_height = 300, dlg_offset_x = 300, dlg_margin_top = 300;
//		var dialog = $('#dialog');
//		
//		dialog.dialog({
//			width : dlg_width,
//			autoOpen : false,
//			position : {
//				my : "center center",
//				at : "center center",
//				of : "#gvTabContent"
//			},
//			buttons : {
//				"ADD Type Properties" : function() {
//					saveTypeProperties(dialog.find("form"));
//				},
//			Cancel : function() {
//					dialog.dialog("close");
//				}
//			}
//		});
//		
//		if (!hasMoved && dialog.dialog("instance")) {
//			grayOut(true); 
//			count = 1;
//			var formHeader = "<form id='addTypePropertiesDialog'>", inputs = "";
//			// Type name to be selected
//			// list all types
//			// we need to add properties to one specific type
//			
//			inputs += "<div id='typeName'><label>Type Selected: </label>"+node.name+"<input type='hidden' name='typename' value='"+node.name+"'/></div>";
//			
//		    inputs += "<a href='#' onclick='addProperties()'> + Add property</a>"
//		
//			// <!-- Allow form submission with keyboard without duplicating the dialog button -->
//			var formFooter  = "<div id='propertiesFields'></div>";
//				formFooter += "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px'>";
//	
//			dialog.dialog("option", "title", "Add Type properties");
//			dialog[0].innerHTML = formHeader + inputs +formFooter ;
//			dialog.dialog("open");
//		}
//	
//	  dialog.find("form").on("submit", function(event) {
//	  		event.preventDefault();
//	  		saveTypeProperties(this);
//	  });
//	} else {alert("please select a MetaData Repo ");}
//}
//#########################################################################################
//========================== This to update TYPE info and its Properties
//#########################################################################################
//function showUpdateTypeDialog(node) {
//	if (selectedMetaData != null){
//		var dlg_width = 400, dlg_height = 300, dlg_offset_x = 300, dlg_margin_top = 300;
//		var dialog = $('#dialog');
//		
//		dialog.dialog({
//			width : dlg_width,
//			autoOpen : false,
//			position : {
//				my : "center center",
//				at : "center center",
//				of : "#gvTabContent"
//			},
//			buttons : {
//				"Update Type" : function() {
//											var elt = document.getElementById('decorators');
//											if(elt.selectedIndex != -1) {
//												updateType(dialog.find("form"));}
//											else {alert("Please select decorator(s)");}
//				},
//				Cancel : function() {
//					dialog.dialog("close");
//				}
//			}
//		});
//		if (!hasMoved && dialog.dialog("instance")) {
//			grayOut(true);
//			
//			var formHeader = "<form id='updateTypeDialog'>", inputs = "";
//	        inputs += "<table id='typeName'>";
//	        inputs += "<tr><td><input type='hidden' name='oldtypename'  value='"+ node.name+"'></td></tr>";
//	        
//			$.each(node, function(key, value) {
//				if((key == "name") || (key == "classification")|| (key == "isRoot")) {
//						inputs += "<tr><th>"+key + "</th><td><input type='text' name ='"+key+"' value='"+value+"' required='required'/></td><tr>";
//					}
//				// this display the previously selected decorators if any
//				if(key == 'decorators'){
//					 if ( value == '') {inputs += "<tr><th> Initial Selected Decorators </th><td>No value selected previously</td></tr>";}
//					 else {
//						 inputs += "<tr><th> Initial Selected Decorators </th>";
//						 value.forEach(function(val){
//							 var namedeco = $.grep(decos, function(i,prop){
//								 if(i.id == val){ return i.name}
//								 });
//							 inputs += "<td>"+namedeco[0].name+"</td>";
//							 });
//						 inputs += "</tr>";
//						 }
//				}
//			});
//			// user can select and update decorators
//			var decoDropdownList = "";
//			$.each(decoMap, function(i, deco) {
//				decoDropdownList += "<option  value='" + deco.id + "'>" + deco.name + "</option>";
//			});
//			inputs += "<tr><th> Select Decorator: <span style='color:red'>*Required</span></th><td><select name='decorators' id='decorators'   multiple='multiple'>";
//			inputs += decoDropdownList;
//			inputs += "</select></td></tr>";
//			
//			// set value
//			var ownerId = 123;
//			inputs += "<tr><td colspan='2'><input type='text' name='owner' value='" + ownerId + "' style='visibility:hidden; position:absolute; top:-100px;' /></td></tr>";
//			
//			var Props = node.properties;
//			if (Props == null) {inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";}
//			 else {
//				inputs += "<tr><th colspan='2' style='background-color: #CDEEDD'> Properties:</th></tr></table>";
//				Props.forEach(function(prop) {
//					inputs += "<table id='propertiesFields'>";
//					$.each(prop, function(key,value){	
//							if (key == 'name') { 
//								inputs += "<input type='hidden' name='currentPropertyName' value='"+value+"'>";
//								inputs += "<tr><th>"+key+"</th><td><input type='text' name='propertyName' value='"+value+"'/></td></tr>";
//								}
//							else  {
//								inputs += "<tr><th>"+key+"</th><td><input type='text' name='"+key+"' value='"+value+"'/></td></tr>";
//						     }
//						});
//					inputs += "</table>";
//					});
//			 }
//			inputs += "</form>";
//			
//			// <!-- Allow form submission with keyboard without duplicating the dialog button -->
//			var formFooter = "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px;' />";
//	
//			dialog.dialog("option", "title", "Update Type");
//			dialog[0].innerHTML = formHeader + inputs + formFooter;
//			dialog.dialog("open");
//		}
//	
//	    dialog.find("form").on("submit", function(event) {
//	    	event.preventDefault();
//	    	var elt = document.getElementById('decorators');
//			var unfilled = $('[required').filter(function(){ return $(this).val().length === 0;});
//			console.log(" returned "+unfilled);
//			if((unfilled.length==0)&&(elt.selectedIndex != -1)) {
//											saveNewType(this);}
//			else {alert("Please Enter infor or select decorator(s)");}
//	    	
//	    	
//	    	
//	    	updateType(this);
//	    });
//	    
//	} else {alert("please select a MetaData Repo ");}
//}


////===============================================================================================================
//function showAddTypePropertiesDialog(node) {
//	if (selectedMetaData != null){
//		var dlg_width = 400, dlg_height = 300, dlg_offset_x = 300, dlg_margin_top = 300;
//		var dialog = $('#dialog');
//		
//		dialog.dialog({
//			width : dlg_width,
//			autoOpen : false,
//			position : {
//				my : "center center",
//				at : "center center",
//				of : "#gvTabContent"
//			},
//			buttons : {
//				"ADD Type Properties" : function() {
//					saveTypeProperties(dialog.find("form"));
//				},
//			Cancel : function() {
//					dialog.dialog("close");
//				}
//			}
//		});
//		
//		if (!hasMoved && dialog.dialog("instance")) {
//			grayOut(true); 
//			count = 1;
//			var formHeader = "<form id='addTypePropertiesDialog'>", inputs = "";
//			// Type name to be selected
//			// list all types
//			// we need to add properties to one specific type
//			
//			inputs += "<div id='typeName'><label>Type Selected: </label>"+node.name+"<input type='hidden' name='typename' value='"+node.name+"'/></div>";
//			
//		    inputs += "<a href='#' onclick='addProperties()'> + Add property</a>"
//		
//			// <!-- Allow form submission with keyboard without duplicating the dialog button -->
//			var formFooter  = "<div id='propertiesFields'></div>";
//				formFooter += "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px'>";
//	
//			dialog.dialog("option", "title", "Add Type properties");
//			dialog[0].innerHTML = formHeader + inputs +formFooter ;
//			dialog.dialog("open");
//		}
//	
//	  dialog.find("form").on("submit", function(event) {
//	  		event.preventDefault();
//	  		saveTypeProperties(this);
//	  });
//	} else {alert("please select a MetaData Repo ");}
//}
///==============================================================================
//	//==========================Adding properties for a selected Type 
//	//==============================================================================
//	function showAddTypePropertiesDialog2(node) {
//		if (selectedMetaData != null){
//			var dlg_width = 400, dlg_height = 300, dlg_offset_x = 300, dlg_margin_top = 300;
//			var dialog = $('#dialog');
//			
//			dialog.dialog({
//				width : dlg_width,
//				autoOpen : false,
//				position : {
//					my : "center center",
//					at : "center center",
//					of : "#gvTabContent"
//				},
//				buttons : {
//					"ADD Type Properties" : function() {
//						saveTypeProperties(dialog.find("form"));
//					},
//				Cancel : function() {
//						dialog.dialog("close");
//					}
//				}
//			});
//			
//			if (!hasMoved && dialog.dialog("instance")) {
//				grayOut(true); 
//				count = 1;
//				var formHeader = "<form id='addTypePropertiesDialog'>", inputs = "";
//				// Type name to be selected
//				// list all types
//				// we need to add properties to one specific type
//				
//				inputs += "<div id='typeName'><label>Type Selected: </label>"+node.name+"<input type='hidden' name='typename' value='"+node.name+"'/></div>";
//				
//			    inputs += "<a href='#' onclick='addProperties()'> + Add property</a>"
//			
//				// <!-- Allow form submission with keyboard without duplicating the dialog button -->
//				var formFooter  = "<div id='propertiesFields'></div>";
//					formFooter += "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px'>";
//		
//				dialog.dialog("option", "title", "Add Type properties");
//				dialog[0].innerHTML = formHeader + inputs +formFooter ;
//				dialog.dialog("open");
//			}
//		
//		  dialog.find("form").on("submit", function(event) {
//		  		event.preventDefault();
//		  		saveTypeProperties(this);
//		  });
//		} else {alert("please select a MetaData Repo ");}
//	}


	
