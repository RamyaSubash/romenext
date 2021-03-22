/**
 * 
 */
//===============================********* ADD TYPE DIALOG**************=================
//=============================== adding only a type (no properties) ====================
//=======================================================================================
//function showAddType() {
//	var list=[], Form, formHeader, formFooter, inputs='', img;
//	if (selectedMetaData != null){	
//		(new DesignLogicalRenderer()).showOrHideGridTypes(true);
//		img = document.getElementById("img_create");
//		if(GlobalUtils.retrieveImgname(img) == "create.png") {                       //		first click on the button
//			img.src = img_path + "design_icons/create_01.png";
//			if(tdvCy) {
//				list = DesignCytoscapeUtils.grabTypesSelected();
//				DesignCytoscapeUtils.selectUnselectTypes(list, tdvCy, false);
//			}
//			Form = document.createElement('div');
//			document.getElementById('Infotitle').textContent="Add New Type";
//			formHeader = "<form id='addTypeDialog'>";
//			inputs += "<div id='typeName'><label>Name: <input type='text' name='name' required='required'/></label><br />";
//			inputs += "<label> isRoot: <input type='radio' name='isRoot' value='true' checked='checked'>true  <input type='radio' name='isRoot' value='false'>false<br/> ";
//			//================================================================================
//	//		Hidden fields, ownerId, isRoot flag
//			inputs += "<input type='text' name='classification' value='node' style='visibility:hidden; position:absolute; top:-100px;' />";
//			var ownerId = 123;
//			inputs += "<input type='text' name='owner' value='" + ownerId + "' style='visibility:hidden; position:absolute; top:-100px;' /></div>";	
//			//============= Enable Decorators for Type  ==================================
//			//Hard code the id for geo view now
//			inputs += "<strong>Geo View</strong>&nbsp;&nbsp;<label class=\"switch\"><input id=\"geoActivator\" name=\"geoActivator\" type=\"checkbox\" value=\"4\"><div class=\"slider round\"></div></label><br>"
//								        	
//			// <!-- Allow form submission with keyboard without duplicating the dialog button -->
//			formFooter = "<input type='button'  class='btn btn-primary btn-xs'     value='Add Type' onclick='saveNewType(form)'  />";
//			formFooter += "<input type='button' class='btn btn-primary btn-xs'     value='Cancel' onclick='emptyAll()' />";		
//			Form.innerHTML = formHeader + inputs + formFooter;
//			(new DesignLogicalRenderer()).emptyAll();
//			$('#typeForm').append(Form);
//		}else {
////			Second click for create
//			img.src = img_path +"design_icons/create.png";
//			(new DesignLogicalRenderer()).emptyAll();
//		}
//	} else {
//		$('#console-log').append("<p style='color:red'>Can not create a TYPE, You must First  select a Metadata</p>");
//		}   
//}

//################################################################################
//=================================  SAVE  NEW TYPE==============================
//========================= Updated Version with MetaData ========================
//################################################################################
/**
 * This method is deprecated, DO NOT USE THIS.
 * See TypeUtils.addType method to add a type.
 */
//function saveNewType(form) {
//	// verifying metadata selected first 
//	var foundError=false, jsonData = {}, decos = [];
//		//====  retrieve all info from a form to construct the json (the typename, classification (node/path), owner, isRoot) 
//		//====   list of decorators ids selected  
//	$(form).find('div#typeName').find(':input').each(function(i,field){
//		if ((field.type != 'submit') && (field.type != 'radio') || (field.checked)) {		
//			if((field.name == 'name')|| (field.name == 'classification')||(field.name== 'owner')||(field.name=='isRoot')){
//				jsonData[field.name] = field.value;
//				if(field.name =='name' && !field.value ){             //					CANNOT ACCEPT EMPTY STRING FOR NAME
//					console.log("Missing Value for type Name.");
//          		    $('#typeForm').append("<br/><p style='color:red'>Missing Value for Type name : ");
//                    foundError= true;
//				}
////				Verifying duplicate typename
//				if(typeMap[field.value]) {
//					console.log("Type Name already exist, choose another one");
//          		    $('#typeForm').append("<br/><p style='color:red'>Type Name already exist, choose another one ");
//                    foundError= true;
//				}
//			}
//	    }
//	});
//		
//	$(form).find(':input').each(function(i, field) {
//		if (field.name == 'geoActivator') {
//			if (document.getElementById('geoActivator').checked == true) {
//				decos.push($(this).val());
//			}
//		}
//	})	
//	jsonData['decorators'] = decos;
//			
//      //    make the call to the API with the json
//	if(foundError){	                            // can not proceed for the save  =====  missing mandatory values
//		return;
//	}
//		
//	var successFunction = function( data ) {
//		$('#console-log').append("<p style='color:blue'>Type successfully created</p>");
//        console.log("Type create success. data: "+ data.name);
//		preTdvPos.push({x: 0, y: 0}); 
//		if(!tdvCy) {    	initTypeGraph();  	}
//		else{
//			tdvCy.filter('node[name="' + data.name + '"]').data(data);
//		    updateTypeGraph(tdvCy, formatNewType(data));
//		    (new DesignLogicalRenderer()).initTypeDesignBar('typeBar');
//		}				
//		// Refresh the Type bay adding new Type
//		(new DesignLogicalRenderer()).emptyAll();
//		var img = document.getElementById("img_create");
//		  img.src = "/webgui/assets/img/design_icons/create.png";
//	};
//	
//	var failFunction = function( xhr, status, error ) {
//		console.log(' SAVE TYPE Error : ' + xhr.status);
//		$('#console-log').append("<p style='color:red'>Error in Type creation"+xhr.status+"</p>");
//		(new DesignLogicalRenderer()).emptyAll();
//	};
//	
//	var apis = new apiRomeNext();
//	
//	apis.saveNewType(jsonData, successFunction, failFunction );			
//	
//}
//===================================================================================
//                          Function Display Type info on the sidebar 
//===================================================================================
//function showType(selectedObj) {
//
//	showOrHideGridTypes(true);
//	document.getElementById('Infotitle').textContent="Type Details";
//	
//	emptyAll();
//	TypePropertyUtils.displayTypeProperties( $('#typeForm'), selectedObj, true );
//	
//	
//	var Form, formHeader, formFooter, inputs='', Props;
//	
//	Form = document.createElement('div');
//	
//	formHeader = "<table>";
//	$.each(selectedObj, function(key, value) {
//		if(key == 'name')  {
//				inputs += "<tr><th>" + key + "</th>";
//				if (value == '') {inputs += "<td>None</td><tr>"; }
//				else { inputs += "<td>" + value + "</td><tr>";	
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
//	Props = selectedObj.properties;	
//	if (Props.length == 0) {inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";}
//	else {	
//		inputs += "<tr><th colspan='7' style='background-color: #CDEEDD'>Properties:</th></tr>";
//		Props.forEach(function(property) {
//			 inputs += "<tr style='background-color: grey'><th> Name</th><th>Type</th><th>Default</th></tr>";
//			 //  added other values
//		     inputs += "<tr><td>" + property.name + "</td>";
//		     if(property.propertyType == 'STRING'){inputs += "<td>TEXT</td>";}
//		     else {inputs +="<td>" + property.propertyType + "</td>";}
//		     if(property.defaultValue){inputs += "<td>"+property.defaultValue+"</td>";}else {inputs +="<td></td>";};
//		     inputs += "</tr>";
//			
//		     inputs += "<tr><td><button id='type_prop_detail_button_"+property.id+"' onclick=\"showOrHideTypePropDetails('"+property.id+"')\">Show Details</button></td></tr>";
//
//		     inputs += "<tr><td><table id='type_prop_detail_"+property.id+"' style='display:none'>";
//		     inputs += "<tr><th>Mandatory</th><th>Unique</th></tr>";
//		     inputs += "<tr>";
//		     inputs += "<td>"+property.isMandatory+"</td>";
//		     inputs += "<td>"+property.isUnique+"</td>";
//		     inputs += "</tr>";
//		     
//		     inputs += "<tr><th>Min</th><th>Max</th></tr>";
//		     inputs += "<tr>";
//		     if(property.minValue){inputs += "<td>"+property.minValue+"</td>";}else {inputs +="<td>...</td>";};
//		     if(property.maxValue){inputs += "<td>"+property.maxValue+"</td>";}else {inputs +="<td>...</td>";};
//			 inputs += "</tr></table></td><tr>";
//			 
//			 inputs += "<tr><td><hr COLOR='black'></td></tr>";
//		});
//	} 
//	formFooter  = "</table>";
//	formFooter += "<input type='button' value='Add Properties' class='btn btn-primary btn-xs'    onclick='AddTypeProperties();'/>";
//	formFooter += "<input type='button' value='Update Type'    class='btn btn-btn-primary btn-xs'    onclick='UpdateTypeForm()'/>";
//	Form.innerHTML = formHeader + inputs + formFooter;
//	emptyAll();
//	$('#typeForm').append(Form);	
//}

//=============================================================================================
function showOrHideTypePropDetails(id) {	
	var typeDetail, buttonDetail, typePropDetailButton, propDetailHide;
	typeDetail   = 'type_prop_detail_'+id;;
	buttondetail = 'type_prop_detail_button_' + id
	typePropDetailButton = document.getElementById(buttondetail);
	propDetailHide = document.getElementById(typeDetail).style.display == "none";
	
	if (propDetailHide == true) {
		$("#"+typeDetail).show();
		typePropDetailButton.innerHTML = "Hide Details";
		
	} else {
		$("#"+typeDetail).hide();	
		typePropDetailButton.innerHTML = "Show Details";
		
	}
}
//==================================================================================================
function AddTypeProperties() {                                       // the selected name of the type is saved in the Global variable
//	var type = typeMap[nametype];
	
	var typeName = typeMapViaId[listTypeIds[0]].name;
	
	var Form, formHeader, formFooter, newProperty, properties, inputs=''; 
//	console.log("Type name is " +nametype);
	Form = document.createElement('div');  
	
	formHeader = "<form id='typeProps'  method='post'>";
	
//    inputs += "<div id='typeName'><label>Type Selected: </label>"+nametype+"<input type='hidden' name='typename' value='"+nametype+"'/></div>";
    
    inputs += "<div id='typeName'><label>Type Selected: </label>"+typeName+"<input type='hidden' name='typename' value='"+typeName+"'/></div>";
	inputs += "<button type='button' class='btn btn-success btn-xs'   onclick='addProperties()'>Add property</button>";

	formFooter = "<div id='propertiesFields'></div>";
	formFooter += "<input id='save_type_prop_button' type='button' value='Save properties'  class='btn btn-success btn-xs' onclick='saveTypeProperties(form)'></form>";
	
	Form.innerHTML = formHeader + inputs + formFooter;
	(new DesignLogicalRenderer()).emptyAll();
	$('#typeForm').append(Form);	
	
	 newProperty = document.createElement('div');
	 properties = "<hr/><table>";
     properties += "<tr><th>Name & Type:</th><td><input type='text' name='propertyName' size='10' />";
     properties += "<select name='propertyType'>" +
			"<option value='INTEGER'>INTEGER</option>"+
			"<option value='DOUBLE'>DOUBLE</option>"+
			"<option value='DATE'>DATE</option>"+
			"<option value='STRING'>TEXT</option>"+
			"<option value='BOOLEAN'>BOOLEAN</option>"+
			"</select></td></tr>"; 
	 properties += "<tr><th> isMandatory:</th><td>";
	 properties += "<input type='radio' name='isMandatory' value='true' checked='checked'/>Yes";
	 properties += "<input type='radio' name='isMandatory' value='false' />No";
	 properties += "</td></tr>";
	 properties += "<tr><th> isUnique: </th><td>";
	 properties += "<input type='radio' name='isUnique' value='true' checked='checked'/>Yes";
	 properties += "<input type='radio' name='isUnique' value='false' />No";
	 properties += "</td></tr>";
	 properties += "<tr><th>Default Value:</th><td> <input type='text' name='defaultValue' /></td></tr>";
	 properties += "<tr><th>Max Value:</th><td> <input type='text' name='maxValue' /></td></tr>";
	 properties += "<tr><th>Min Value:</th><td> <input type='text' name='minValue' /></td></tr></table>";
	
	 newProperty.innerHTML = properties;
	
	document.getElementById('propertiesFields').appendChild(newProperty);
	if (document.getElementById('propertiesFields').innerHTML != '') {
		document.getElementById("save_type_prop_button").style.visibility = 'visible';
		}
}
//=====================================================================================
//======================================================================================================
//This is used for displaying properties for TYPE and Rule
//======================================================================================================
function addProperties(){
 var newProperty = document.createElement('div');
 var properties = "<hr/><table>";
    properties += "<tr><th>Name & Type:</th><td><input type='text' name='propertyName' size='10' />";
    properties += "<select name='propertyType'>" +
			"<option value='INTEGER'>INTEGER</option>"+
			"<option value='DOUBLE'>DOUBLE</option>"+
			"<option value='DATE'>DATE</option>"+
			"<option value='STRING'>TEXT</option>"+
			"<option value='BOOLEAN'>BOOLEAN</option>"+
			"</select></td></tr>";
 
	properties += "<tr><th> isMandatory:</th><td>";
	properties += "<input type='radio' name='isMandatory' value='true' checked='checked'/>Yes";
	properties += "<input type='radio' name='isMandatory' value='false' />No";
	properties += "</td></tr>";
	
	properties += "<tr><th> isUnique: </th><td>";
	properties += "<input type='radio' name='isUnique' value='true' checked='checked'/>Yes";
	properties += "<input type='radio' name='isUnique' value='false' />No";
	properties += "</td></tr>";
	
	
	properties += "<tr><th>Default Value:</th><td> <input type='text' name='defaultValue' /></td></tr>";
	properties += "<tr><th>Max Value:</th><td> <input type='text' name='maxValue' /></td></tr>";
	properties += "<tr><th>Min Value:</th><td> <input type='text' name='minValue' /></td></tr></table>";
	
	newProperty.innerHTML = properties;
	document.getElementById('propertiesFields').appendChild(newProperty);
	if (document.getElementById('propertiesFields').innerHTML != '') {
		document.getElementById("save_type_prop_button").style.visibility = 'visible';
	}
 
}


//################################################################################
//==========================SAVE  TYPE PROPERTIES ==================================
//========================= Updated Version with MetaData ========================
//################################################################################
function saveTypeProperties(form) {
	
	var jsonData = {}, typeProperties = [], property={}, typename, initcolor;
	//  Retrieve type fields from form
	$(form).find('div#typeName').find(':input').each(function(i,field){
		jsonData[field.name] =field.value;
	});
	//	remove typename from JSON
	typename= jsonData["typename"];
	delete jsonData['typename'];
    initcolor = typeMap[typename].color;
  // Retrieve Type properties fields from form

	$(form).find('div#propertiesFields').find('div').each(function(i, propDiv){
		$(propDiv).find(':input').each(function(i, field){
			if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
				property[field.name] = field.value;		
			}
		});
		typeProperties.push(property);
		property ={};
	});
	//	attach properties to JSON
	jsonData = typeProperties;
		
			
	var successFunction = function( data ) {
		data.color = initcolor;
		tdvCy.filter('node[name="' + data.name + '"]').data(data);
		console.log("Type Properties create success. data: " + data.name);
		(new DesignLogicalRenderer()).emptyAll();
		
		typeMap[data.name]= data;               ///   update the typeMap  && typebar
		typeMapViaId[ data.id ] = data;
		
		(new DesignLogicalRenderer()).initTypeDesignBar('typeBar');
		
		(new DesignLogicalRenderer()).showOrHideGridTypes(true);
		document.getElementById('Infotitle').textContent="Type Details";
		(new DesignLogicalRenderer()).emptyAll();
		TypePropertyUtils.displayTypeProperties( $('#typeForm'), data, true );
		//showType(data);			
	};
	
	var failFunction = function( xhr, status, error ) {
		(new DesignLogicalRenderer()).emptyAll();
		document.getElementById('typeForm').textContent="Error Type properties not saved";
		$('#console-log').append("<p style='color:red'>Error Type properties not saved: " + xhr.responseText);
	};
	
	var apis = new apiRomeNext();
	
	apis.saveTypeProperties(typename, jsonData, successFunction, failFunction );	
		
}
//#########################################################################################
//========================== This to update TYPE info and its Properties
//#########################################################################################
function UpdateTypeForm() {
	var Form, type, formHeader, formFooter, hasGeo, Props, inputs=''; 
	
	Form = document.createElement('div');
	type = typeMapViaId[listTypeIds[0]];
//	type = typeMap[nametype];
	document.getElementById('Infotitle').textContent="Update Type";
	
	formHeader = "<form id='updateTypeDialog'>";
	
    inputs += "<table id='typeName'>";
    inputs += "<tr><td colspan='2'><input type='hidden' name='oldtypename'  value='"+ type.name+"'></td></tr>";
    $.each(type, function(key, value) {
    	if(key == "name") {
			inputs += "<tr><th>"+key + "</th><td><input type='text' name ='"+key+"' value='"+value+"' disabled/></td></tr>";
		}
    	
		if(key == "classification") {
			inputs += "<tr><th>"+key + "</th><td><input type='text' name ='"+key+"' value='"+value+"' /></td></tr>";
		}
		
		if (key == 'isRoot') {
			inputs += "<tr><th>"+key +":</th>";
			inputs += "<td><input type='radio' name='isRoot' value='true'";
		    if (value == true) { inputs += "checked='checked'";};   inputs += ">true<br/>";
		    inputs += "<input type='radio' name='isRoot' value='false'";
		    if (value == false) { inputs += "checked='checked'";};  inputs += ">false</td></tr> ";
		}
	});
         
	// set value
	var ownerId = 123;
	inputs += "<tr><td colspan='2'><input type='text' name='owner' value='" + ownerId + "' style='visibility:hidden; position:absolute; top:-100px;' /></td></tr>";
	inputs += "<tr><td colspan='2'><input type='text' name='isRoot' value='true' style='visibility:hidden; position:absolute; top:-100px;' /></td></tr>";

	//============= Enable Decorators for Type  ==================================
	//Hard code the id for geo view now
	hasGeo = false;
	for (var i = 0; i < type.decorators.length; i++) {
		if (type.decorators[i] == 4) { //Hard code the id for geo view now 
			hasGeo = true;
			break;
		}
	}
	inputs += "<tr><td colspan='2'>Geo View&nbsp;&nbsp;<label class=\"switch\"><input id=\"geoActivator\" name=\"geoActivator\" type=\"checkbox\" value=\"4\"";
	if (hasGeo == true) {
		 inputs += "checked=\"checked\"";
	} 
	inputs += "><div class=\"slider round\"></div></label><br></td></tr>";
		
	Props = type.properties;
	if (Props == null) {inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";}
	else {
		inputs += "<tr><th colspan='2' style='background-color: #CDEEDD'> Properties:</th></tr></table>";
		Props.forEach(function(prop) {
				inputs += "<table id='propertiesFields'>";
				$.each(prop, function(key,value){	
						if (key == 'name') { 
							inputs += "<input type='hidden' name='currentPropertyName' value='"+value+"'>";
							inputs += "<tr><th>"+key+"</th><td><input type='text' name='propertyName' value='"+value+"' disabled/></td></tr>";
							}
						else  { if((key != 'id')&& (key!='romeDecoPropId')&& (key != 'validValues'))
							{inputs += "<tr><th>"+key+"</th><td><input type='text' name='"+key+"' value='"+value+"'/></td></tr>";}
					     }
					});
				inputs += "<tr><td colspan='2'>---------------------------------</td></tr>";
				});
	}
		
	// <!-- Allow form submission with keyboard without duplicating the dialog button -->
	formFooter = "<tr><td><input type='button' value='Update Type' class='btn btn-primary btn-xs'   onclick='saveUpdateType(form)' /></td>";
	formFooter += "<td><input type='button'  value='Cancel'     class='btn btn-primary btn-xs' onclick='(new DesignLogicalRenderer()).emptyAll()'></td></tr><table></form>";
	Form.innerHTML = formHeader + inputs + formFooter;
	(new DesignLogicalRenderer()).emptyAll();
	$('#typeForm').append(Form);
			
}

//===========================  UPDATE TYPE & Properties =============================
//===================================================================================
function saveUpdateType(form) {
	var jsonData = {}, typeproperties =[],jsonProperty = {}, decos = [], foundError=false, typename, initcolor;
	
	$(form).find('table#typeName').find(':input').each(function(i, field){		
		if ((field.type != 'submit') && (field.type != 'radio') || field.checked) {		
			if((field.name == 'oldtypename')||(field.name == 'name')|| (field.name == 'classification')||(field.name== 'owner')||(field.name=='isRoot')){
				if(field.name =='name' && !field.value ){
					console.log("Missing Value for type Name.");
          		    $('#typeForm').append("<br/><p style='color:red'>Missing Value for Type name : ");
                    foundError= true;
				}			
				jsonData[field.name] = field.value;
				}
			}
								
		if (field.name == 'geoActivator') {
			if (document.getElementById('geoActivator').checked == true) { 	decos.push($(this).val()); 	}
		}
				

	});
	if(foundError){
		return;
	}
	jsonData['decorators'] = decos;
			
			// remove original typename to pass as path parameter
	typename= jsonData["oldtypename"];
	initcolor = typeMap[typename].color;
    delete jsonData['oldtypename'];
//			ADD VALIDATION HERE
	$(form).find('table#propertiesFields').each(function(i, propDiv){
		$(propDiv).find(':input').each(function(i,field){
		        if ( field.type != 'submit' || field.value != 'Cancel') {
		        	  if((field.name == 'propertyType')&&(field.value == 'TEXT')){jsonProperty[field.name] ='STRING'}
		        	  else jsonProperty[field.name] = field.value;			
		}             
		});
		typeproperties.push(jsonProperty); 
		jsonProperty = {};
	})
	jsonData.properties = typeproperties;
	console.log(jsonData);
	
	var successFunction = function( data ) {
		data.color = initcolor;
		tdvCy.filter('node[name="' + data.name + '"]').data(data);
		console.log("Type Properties update success. data: " + data.name);
		(new DesignLogicalRenderer()).emptyAll();
		if(typename != data.name){
			 delete typeMap[typename];         // remove old value
		}
		typeMap[data.name]= data;               ///   update the typeMap  && typebar
		typeMapViaId[ data.id ] = data;			// added the new type map keyed on id
		
		(new DesignLogicalRenderer()).initTypeDesignBar('typeBar');
		
		(new DesignLogicalRenderer()).showOrHideGridTypes(true);
		document.getElementById('Infotitle').textContent="Type Details";
		(new DesignLogicalRenderer()).emptyAll();
		TypePropertyUtils.displayTypeProperties( $('#typeForm'), data, true );
		//showType(data);			
	};
	
	var failFunction = function( xhr, status, error ) {
		(new DesignLogicalRenderer()).emptyAll();
		document.getElementById('typeForm').textContent="Error Type properties not updated";
		$('#console-log').append("<p style='color:red'>Error Type properties not updated: " + xhr.responseText);
	};
	
	var apis = new apiRomeNext();
	
	apis.saveUpdateType(typename, jsonData, successFunction, failFunction );	
				
}







