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
		  	
			document.getElementById("ruleBar").innerHTML = "";
			(new DesignLogicalRenderer()).initRuleDesignBar('ruleBar');  
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
						if(key == 'name') { connName= value;}
						inputs += "<tr><th>" + key + "</th>";
						inputs += "<td><input type='text' name='"+key+"' value='"+value+"' ></td><tr>";
					} else {
						inputs += "<tr><th>" + key + "</th>";
						inputs += "<td>" + value + "<input type='hidden' name='"+key+"' value='"+value+"' ></td><tr>";
					}
				}
			}
		});
	var formFooter =  "<tr><td><input type='button' value='Update Connection'  class='btn btn-primary btn-sm'  onclick=\"updateConnection(form, '"+selectedObj.data().id+"', '"+connName+"')\"/></td>";
		// replace the adding rule properties dialog with just updating connection directly, cause we dont have properties for rule now
		formFooter += "<td><input type='button' value='Delete'   class='btn btn-primary btn-sm'     onclick='deleteConnection(form)'/>   </td></tr></table></form>";
	
	Form.innerHTML = formHeader + inputs + formFooter;
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
	
//	if (jsonData['name'] == oldName) {
//		return;
//	}	
//	var name = jsonData["oldname"];
//	delete jsonData['oldname'];
	var origin = jsonData['origin'];
	var dest = jsonData['destination'];
	var rule = jsonData['rule'];
	
	
	var doneFunction = function( data ) {
		console.log(data);
//		if (oldName != data.name) {
			console.log(connMap[oldName]);
			
			var tmpConn = connMap[oldName];
			delete connMapViaId[ tmpConn.id ];	// delete the connMapViaId one as well
			delete connMap[oldName];
			
			tdvCy.$(':selected').remove();
			updateConnGraph(tdvCy, DesignCytoscapeUtils.formatNewConnection(data));
//		} else {   }
//		nameconn = null;
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

}
	