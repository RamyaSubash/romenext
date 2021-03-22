/**
 * Connection functions
 * Author:		Baya Benrachi
 * Date: 		18 April 2016
 * Update:      13 June 2016
 */

//========================== added the metadata parameter ============
//====================== SAVE NEW CONNECTION =========================
//====================================================================
function saveNewConnection(origin, destination) {
	
	var connId = null;
	
	var jsonData = {};
	if(origin == null || destination == null || createRuleClassification == null) { $('#console-log').append("<p style='color:red'>Cannot create Connection missing origin/destination types</p>");  }
	else {
		jsonData['originId'] = parseFloat(origin);
		jsonData['destinationId']= parseFloat(destination);
		jsonData['ruleClassification']= createRuleClassification;
	
		console.log(JSON.stringify(jsonData));
	
		var doneFunction = function( data ) {
			//	console.log(data.rule);
					
		  	updateConnGraph(tdvCy, DesignCytoscapeUtils.formatNewConnection(data.connection));
		  	ruleMap = {};
		  	ruleMapViaId = {};
		  	GlobalUtils.loadAllRules();
		  	
		  	$('#console-log').append("<p style='color:blue'>Connection created successfully.</p>");
		  				
		  	if (createRuleClassification == "parentchild") {
			  	var img = document.getElementById("img_connect_pc");
			    img.src = img_path + "design_icons/conn_pc.png";
		  	} else if (createRuleClassification == "link") {
			  	var img = document.getElementById("img_connect_link");
			  	img.src = img_path + "design_icons/conn_link.png";
		  	} else {
		  		console.log("Wrong Create Rule Classification: " + createRuleClassification);
		  	}
		  	createRuleClassification = null;
		  	
		  	connId = data.connection.id;
		  	
//			document.getElementById("ruleBar").innerHTML = "";
//			(new DesignLogicalRenderer()).initRuleDesignBar('ruleBar'); 
		  	
//		  	(new DesignLogicalRenderer()).showConnRuleProperties(data.connection.id);
//		  	listConnIds.push(Number(data.connection.id));
		  	
//		  	DesignCytoscapeUtils.selectAnEdge(connId);
//		  	DesignCytoscapeUtils.clickAnEdge(connId);
//		  	tdvCy.trigger('tap');
//		  	tdvCy.trigger('click');
//		  	DesignCytoscapeUtils.clickAnEdge(connId);
		  	
		};
			
		var failFunction = function( xhr, status, error ) {
			console.log('Error Connection not created: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Error Connection not created:"+ xhr.status+"</p>");	
		};
		
		var apis = new apiRomeNext();
		
		apis.saveNewConnection(jsonData, doneFunction, failFunction );
	
	}
	
}

//====================================== View Connection Properties ==================================================
//                                       PART OF LOGICAL DESIGN VIEW 
//  This function will display the Connection properties on the side window and allow user to UPDATE/DELETE Connection
//=====================================================================================================================
function DisplayConnRuleProperties(selectedObj) {
	$("#grid-types").css({'visibility':'visible'});
	var connName='';
	var Form = document.createElement('div');
	document.getElementById('Infotitle').textContent="Connection Details";
 	var formHeader = "<form id='propertiesDialog'>"
			, inputs = "";

	inputs += "<table id='connectionInfo'>";
		
	// grab the rule id
//	var ruleid = selectedObj.data().ruleId;
	
	$.each(selectedObj.data(), function(key, value) {
		if (key == "properties") {
			inputs += "<tr><th colspan='3' style='background-color: grey'> Properties:</th><tr>";
			value.forEach(function(property) {
				inputs += "<tr><th>" + property.name + "</th><td>" + property.propertyType + "</td>";
					if (property.value) {
						inputs += "<td>" + property.value + "</td>";
					}
					inputs += "</tr>";
				});
			} else {
				if ((key != "cyDisplay") &&(key != 'id')&&(key != 'source')&&(key != 'target')) {
					if((key == "name") ||( key == 'minRel' )||( key == 'maxRel')){ 
						
//						if(key == 'name') { connName= value;}
//						inputs += "<tr><th>" + key + "</th>";
//						inputs += "<td><input type='text' name='"+key+"' value='"+value+"' ></td><tr>";
						inputs += "<tr><th>" + key + "</th>";
						inputs += "<td><input type='text' name='"+key+"' value='"+value+"' ";
						if(key == 'name') { 
							connName= value;
						} else if (key == 'minRel') {
							inputs += "title='0 means optional, greater than 0 means required.'";
						} else if (key == 'maxRel') {
							inputs += "title='-1 means infinite.'";
						}
						inputs += "></td><tr>";
						
						
					} else {
						inputs += "<tr><th>" + key + "</th>";
						inputs += "<td>" + value + "<input type='hidden' name='"+key+"' value='"+value+"' ></td><tr>";
					}
				}
			}
		});
	

	// add the properties
	var propertyies = ConnectionPropertyUtils.getRulePropertiesHTML( selectedObj.data(), false, false, null, null );

	
	var formFooter =  "<tr><td><input type='button' value='Update Connection'  class='btn btn-primary btn-sm'  onclick=\"updateConnection(form, '"+selectedObj.data().id+"', '"+connName+"')\"/></td>";
		// replace the adding rule properties dialog with just updating connection directly, cause we dont have properties for rule now
		formFooter += "<td><input type='button' value='Add Property'   class='btn btn-primary btn-sm'     onclick='addConnectionProperties(" + selectedObj.data().connId + ")'/>   </td></tr></table></form>";
		formFooter += "<td><input type='button' value='Delete'   class='btn btn-primary btn-sm'     onclick='deleteConnection(form)'/>   </td></tr></table></form>";
	
//	Form.innerHTML = formHeader + inputs + formFooter; 

	Form.innerHTML = formHeader + inputs + propertyies + formFooter; 
	$('#typeForm').empty();
	$('#typeForm').append(Form);
}

//==========================================================================
//=================this will show the dialog for updating rule properties
//=================connections do not have properties, but the rule that associated with the connection have properties
function  UpdateConnForm(connName){
	$("#grid-types").css({'visibility':'visible'});
	var conn = connMap[connName];
	var Form = document.createElement('div');
	document.getElementById('Infotitle').textContent="Update Connection";
 	var formHeader = "<form id='propertiesDialog'>"
			, inputs = "";
 	document.getElementById('Infotitle').textContent="Update Connection";
	inputs += "<table id='connectionInfo'>";
	$.each(conn, function(key, value) {
		if (key == "name") {
			inputs += "<tr><th>" + key + "</th>";
			inputs+= "<input type='hidden' name='oldname' value='"+value+"'/>";
			inputs += "<td><input type='text' name='"+key+"' value='"+value+"'/></td><tr>";
		}else {
			if((key == 'origin')|| (key == 'destination')||(key =='rule') ){
				inputs += "<tr><th>" + key + "</th>";
				inputs += "<td><input type='text' name='"+key+"' value='"+value+"' disabled='disabled'/></td><tr>";
			}else {
				if((key == "minRel")|| (key == "maxRel")  ) {
					inputs += "<tr><th>" + key + "</th>";
					inputs += "<td><input type='text' name='"+key+"' value='"+value+"'/></td><tr>";
					}
			}
		}
	});
	
	var Props = conn.properties;	
	if (Props == null || Props.length == 0) {inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";}
	else {
		inputs += "<tr><th colspan='2' style='background-color: #CDEEDD'> Properties:</th></tr></table>";
		Props.forEach(function(prop) {
			inputs += "<tr><th colspan='3' style='background-color: grey'> Properties:</th><tr>";
			inputs += "<table id='propertiesFields'>";
			$.each(prop, function(key,value){	
				inputs += "<tr><th>" + property.name + "</th><td>(" + property.propertyType + ")</td>";
					if (property.value) {
						inputs += "<td> <input type='text' name='" + property.name + "' value='" + property.value + "'/></td>";
					}else {inputs += "<td> <input type='text' name='" + property.name + "' value=''/></td>";  }
					inputs += "</tr>";
			});	
		});
	}
	inputs += "<a href='#' onclick='addProperties()'> + Add property</a>"

	var formFooter = "<div id='propertiesFields'></div>";
	
	formFooter +=  "<tr><td><input type='button' value='Save'  class='btn btn-primary btn-sm'   onclick='updateConnection(form, '"+connName+"')'/></td>";
    formFooter += "<td><input type='button' value='Cancel'    class='btn btn-primary btn-sm'  onclick='(new DesignLogicalRenderer()).emptyAll()'/></td></tr></table></form>";
	Form.innerHTML = formHeader + inputs + formFooter;
	$('#typeForm').empty();
	$('#typeForm').append(Form);
	
}

//========================================================================================
//===================this update the data of the connection itself, now just the names
function updateConnection(form, connId, oldName) {
	var jsonData = {};
	
	$(form).find(':input').each(function (i, field) {
		if ((field.type != 'submit' && field.type != 'radio'  && field.type !='button') || field.checked) {
			if((field.name == 'minRel')|| (field.name == 'maxRel')) {jsonData[field.name] = parseInt(field.value); }
			else {jsonData[field.name] = field.value;}
		}
	});
	console.log(jsonData);
	
	var origin = jsonData['origin'];
	var dest = jsonData['destination'];
	var rule = jsonData['rule'];
		
	var doneFunction = function( data ) {
		
		var oldConnectionId = data.id;
		var oldConnectionName = oldName
		
//		console.log(connMap[oldName]);	
//		var tmpConn = connMap[oldName];
		
		tdvCy.remove('edge[id = "connection' + oldConnectionId + '"]');
		
		delete connMapViaId[oldConnectionId];	// delete the connMapViaId one as well
		delete connMap[oldConnectionName];
			
		updateConnGraph(tdvCy, DesignCytoscapeUtils.formatNewConnection(data));

		(new DesignLogicalRenderer()).emptyAll();
	};
		
	var failFunction = function( xhr, status, error ) {
		console.log('Error Update Connection not done: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Error Update Connection not done."+xhr.status+"</p>");
		(new DesignLogicalRenderer()).emptyAll();
	};
	
	var apis = new apiRomeNext();
	
	apis.saveUpdateConnectionById(connId.replace(/[^0-9]/g, ''), jsonData, doneFunction, failFunction);

}

//==========================DELETE A CONNECTION ======================================
//==========================Added the metadata parameter =============================
function deleteConnection(form) {
	var jsonData = {};
	
	$(form).find(':input').each(function (i, field) {
		if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
			jsonData[field.name] = field.value;
		}
	});
	var name = jsonData["name"];
	var rule = jsonData["rule"];
	var origin = jsonData["origin"];
	var dest = jsonData["destination"];
	
	console.log(jsonData);
	
	var doneFunction = function( data ) {
		console.log(data);
		
		var tmpConn = connMap[ name ];
		delete connMapViaId[ tmpConn.id ];	// delete the conn map via id - jplee Jan2017
		delete connMap[name];
		tdvCy.$(':selected').remove();
		(new DesignLogicalRenderer()).emptyAll();

	};
		
	var failFunction = function( xhr, status, error ) {
		console.log('Error Delete Connection not done: ' + xhr.status);
		$('#console-log').append("<p style='color:red'>Error Delete Connection not done."+xhr.status+"</p>");
		(new DesignLogicalRenderer()).emptyAll();
	};
	
	var apis = new apiRomeNext();
	
	apis.deleteConnection(origin, dest, rule, jsonData, doneFunction, failFunction);	
	
}

//==========================SHOW/HIDE CONNECTION NAME IN GRAPH ======================================
function toggleElementName(cy, iconId, eleType, state) {
	
	if (state == 'show') {
		changeElementName(cy, eleType, 'data(name)')
		state = 'hide';
		document.getElementById(iconId).value = 'hide';
	} else if (state == 'hide') {
		changeElementName(cy, eleType, '')
		state = 'show';
		document.getElementById(iconId).value = 'show';
	} else {
		console.log('Wrong State: ' + state);
	}

};

function toggleElement(iconId, elements, state) {
	
	if (state == 'show') {
		for (var key in elements) {
			elements[key].style('display', "element");
		}
		state = 'hide';
		document.getElementById(iconId).value = 'hide';
	} else if (state == 'hide') {
		for (var key in elements) {
			elements[key].style('display', 'none').value = "none";
		}
		state = 'show';
		document.getElementById(iconId).value = 'show';
	} else {
		console.log('Wrong State: ' + state);
	}

};
	
function addConnectionProperties( connId ) {                                       // the selected name of the type is saved in the Global variable
//	var type = typeMap[nametype];
	
	// grab the selected connection
//	var conn = connMapViaId[ listConnIds[0] ];
	
	var conn = connMapViaId[ connId ];
	
	
	var Form, formHeader, formFooter, newProperty, properties, inputs=''; 
//	console.log("Type name is " +nametype);
	Form = document.createElement('div');  
	
	formHeader = "<form id='connectionProps'  method='post'>";
	
//    inputs += "<div id='typeName'><label>Type Selected: </label>"+nametype+"<input type='hidden' name='typename' value='"+nametype+"'/></div>";
    
    inputs += "<div id='connPropAddDiv'><label>Connection Selected: </label>" + conn.name 
    	+ "<input type='hidden' name='connid' value='"+ conn.id +"'/>" 
    	+ "<input type='hidden' name='connname' value='"+ conn.name +"'/></div>";
	inputs += "<button type='button' class='btn btn-success btn-xs'   onclick='addProperties()'>Add property</button>";

	formFooter = "<div id='propertiesFields'></div>";
	formFooter += "<input id='save_conn_prop_button' type='button' value='Save properties'  class='btn btn-success btn-xs' onclick='saveConnProperties(form)'></form>";
	formFooter += "<input id='cancel_conn_prop_button' type='button' value='Cancel'  class='btn btn-success btn-xs' onclick='DesignCytoscapeUtils.clickAnEdge(\"" + conn.id + "\");'></form>";
	
	Form.innerHTML = formHeader + inputs + formFooter;
	(new DesignLogicalRenderer()).emptyAll();
	$('#typeForm').append(Form);	
	
	 newProperty = document.createElement('div');
	 properties = "<hr/><table>";
     properties += "<tr><th>Name & Type:</th><td><input type='text' name='propertyName' size='10' />";
     properties += "<select name='propertyType' onchange='(new DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>" +
     		"<option value='STRING'>TEXT</option>"+		
     		"<option value='INTEGER'>INTEGER</option>"+
			"<option value='DOUBLE'>DOUBLE</option>"+
			"<option value='DATE'>DATE</option>"+
			"<option value='BOOLEAN'>BOOLEAN</option>"+
			"<option value='FILE'>FILE</option>"+
			"<option value='CURRENCY'>CURRENCY</option>"+
			"</select></td></tr>"; 
	 properties += "<tr><th> isMandatory:</th><td>";
	 properties += "<input type='checkbox' name='isMandatory'>";
//	 properties += "<input type='radio' name='isMandatory' value='true' checked='checked'/>Yes";
//	 properties += "<input type='radio' name='isMandatory' value='false' />No";
	 properties += "</td></tr>";
	 properties += "<tr><th> isUnique: </th><td>";
	 properties += "<input type='checkbox' name='isUnique'>";
//	 properties += "<input type='radio' name='isUnique' value='true' checked='checked'/>Yes";
//	 properties += "<input type='radio' name='isUnique' value='false' />No";
	 properties += "</td></tr>";
	 properties += "<tr><th>Default Value:</th><td> <input type='text' name='defaultValue' onkeypress='' value='' defaultValue='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></td></tr>";
	 properties += "<tr><th>Max Value:</th><td> <input type='text' name='maxValue' /></td></tr>";
	 properties += "<tr><th>Min Value:</th><td> <input type='text' name='minValue' /></td></tr></table>";
	
	 newProperty.innerHTML = properties;
	
	document.getElementById('propertiesFields').appendChild(newProperty);
	if (document.getElementById('propertiesFields').innerHTML != '') {
		document.getElementById("save_conn_prop_button").style.visibility = 'visible';
		}
}

//################################################################################
//==========================SAVE  TYPE PROPERTIES ==================================
//========================= Updated Version with MetaData ========================
//################################################################################
function saveConnProperties(form) {
	
	var jsonData = {}, connProperties = [], property={}, connname, connId;
	//  Retrieve type fields from form
	
	$(form).find('div#connPropAddDiv').find(':input').each(function(i,field){
		jsonData[field.name] =field.value;
	});
	//	remove typename from JSON
	connname= jsonData["connname"];
	connId = jsonData["connid"];
	
	delete jsonData['connname'];
	
	// grab the conn object
	var connObj = connMapViaId[ connId ];
	
//  initcolor = typeMap[typename].color;
  
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
//				property[field.name] = field.value;		
			}
		});
		connProperties.push(property);
		property ={};
	});
	//	attach properties to JSON
	jsonData = connProperties;
		
			
	var successFunction = function( data ) {
//		data.color = initcolor;
		tdvCy.filter('node[name="' + data.name + '"]').data(data);
		console.log("Rule Properties create success. data: " + data.name);
		
		// on success on a new property for a rule, we just want to update the property list
		
//		(new DesignLogicalRenderer()).emptyAll();
//		typeMap[data.name]= data;               ///   update the typeMap  && typebar
//		typeMapViaId[ data.id ] = data;
//		(new DesignLogicalRenderer()).initTypeDesignBar('typeBar');
//		(new DesignLogicalRenderer()).showOrHideGridTypes(true);
	  	ruleMap = {};
	  	ruleMapViaId = {};
	  	GlobalUtils.loadAllRules();
		
		document.getElementById('Infotitle').textContent="Type Details";
		(new DesignLogicalRenderer()).emptyAll();
		ConnectionPropertyUtils.displayRuleProperties( $('#typeForm'), data, true );
		//showType(data);
		
		DesignCytoscapeUtils.clickAnEdge(connId);
		
	};
	
	var failFunction = function( xhr, status, error ) {
		(new DesignLogicalRenderer()).emptyAll();
		document.getElementById('typeForm').textContent="Error Rule properties not saved";
		$('#console-log').append("<p style='color:red'>Error Rule properties not saved: " + xhr.responseText);
	};
	
//	var apis = new apiRomeNext();
//	apis.saveTypeProperties(typename, jsonData, successFunction, failFunction );
	var apis = new TypePropertyApi();
	
	var connApis = new ConnectionApis();
	
	connApis.addRuleProperties(connObj, jsonData, successFunction, failFunction);
	
//	apis.addTypeProperties(typeMapViaId[typeId], jsonData, successFunction, failFunction );
		
}
