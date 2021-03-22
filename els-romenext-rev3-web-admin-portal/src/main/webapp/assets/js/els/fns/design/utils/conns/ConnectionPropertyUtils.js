/**
 * This is used to generate a list of properties for a connection (actually RULE)
 */
function ConnectionPropertyUtils() {
	
};


	ConnectionPropertyUtils.displayRuleProperty = function( property, displayFunction  ) {
		console.log("Inside  ConnectionPropertyUtils.displayTypeProperty   ");
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
			     
			     inputs += "<tr><td><table id='connection_prop_detail_"+property.id+"' style='display:none'>";
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
			     if(property.defaultValue){inputs += "<td style='diaplay:none;'>"+property.defaultValue+"</td>";}else {inputs +="<td>...</td>";};
			     
				 inputs += "</tr></table></td><tr>";
				 
			} 
			
		} else {
			return displayFunction( null, property );
		}
		
		return inputs;	
	};
	
	ConnectionPropertyUtils.showOrHideAllConnectionPropertiesDetails = function (connId) {	
	
		var connPropDetailButton = document.getElementById('connection_prop_detail_button_' + connId);
		
		var props = ruleMapViaId[connMapViaId[connId].ruleId].typeProperties;
		var propDetailHide = null
		
		for (var key in props) {
			var propId = props[key].id;
			var connDetail = 'connection_prop_detail_' + propId;
			var propDetailHide = document.getElementById(connDetail).style.display == "none";
			if (propDetailHide == true) {
				$("#"+connDetail).show();
			} else {
				$("#"+connDetail).hide();
			}
		}
		
		if (propDetailHide == true) {
			connPropDetailButton.value = "Hide Details";
		} else {
			connPropDetailButton.value = "Show Details";		
		}
		
	};

//====================================== Function related to Connection ===================================
	ConnectionPropertyUtils.createConnection = function(connClassification, event) {

		if (connClassification == "parentchild") {
			var list = [];
			if (creatingConnection == false) {
				creatingConnection = true;
				ruleSelected = true; // to differentiate between single click and double click
				createRuleClassification = connClassification;
				
				// get all previously selected types, links and connections -- clear these
				DesignCytoscapeUtils.getAllSelectedTypes(tdvCy);
				CommonFctsLogical.UnselectTypes();
				CommonFctsLogical.UnselectConnections();
				// make links invisible and unselectable
				tdvCy.nodes().selectify();	
				tdvCy.nodes().removeClass('semitransp');
				var eles = tdvCy.nodes().filter("[classification = 'link']");
				eles.unselectify();
				eles.addClass('semitransp');
				
				// reinitialise where to keep the two types
				originType = null;
				destType = null;
				// set the cursor
				GlobalUtils.cursor_wait();
				document.getElementById("create_PC").className = "btn btn-default text-center";
			    $("#besideMouse").html("<span class='badge'>Select First Type</span>");
			    ConnectionPropertyUtils.mouseText(event);
			    	
				
			} else {
				creatingConnection = false;
			
				DesignCytoscapeUtils.getAllSelectedTypes(tdvCy);
				CommonFctsLogical.UnselectTypes();
				CommonFctsLogical.UnselectConnections();
				
				list = [];
				ruleSelected = false;
				originType = null;
				destType = null;
				mouseEventTime = new Date().getTime();
				pleaseWait = true;
				createRuleClassification = null;
				
				GlobalUtils.cursor_clear();
				$("#besideMouse").html("");
				ConnectionPropertyUtils.mouseText(event);
				document.getElementById("create_PC").className = "btn btn-primary text-center";
			}
	
		} else {
			console.log("Wrong Connection Classification: "	+ connClassification);
		}
	
	};
	
	ConnectionPropertyUtils.mouseText = function( event ) {
		if(ruleSelected ){
			e = event || window.event;
		    var pageX = e.pageX;
		    var pageY = e.pageY;
		    console.log(pageX, pageY);
		    var cpos = {top: e.pageY+10, left:e.pageX+10};	    
		    $(document).mousemove(function(e){	    	
		        var cpos = { top: e.pageY + 10, left: e.pageX + 10 };
		        $('#besideMouse').offset(cpos);
		    	
		     });
		}
	}
	
	ConnectionPropertyUtils.mouseTextCreate = function( event ) {
		if( typelinkCreate){
			e = event || window.event;
		    var pageX = e.pageX;
		    var pageY = e.pageY;
		    console.log(pageX, pageY);
		    var cpos = {top: e.pageY+10, left:e.pageX+10};	    
		    $(document).mousemove(function(e){	    	
		        var cpos = { top: e.pageY + 10, left: e.pageX + 10 };
		        $('#besideMouseCreate').offset(cpos);
		    	
		     });
		}
	}

	// using New API
	ConnectionPropertyUtils.saveNewConnection = function (origin, destination) {

		var connId = null;

		var jsonData = {};
		if (origin == null || destination == null || createRuleClassification == null) {
			$('#console-log').append("<p style='color:red'>Cannot create Connection missing origin/destination types</p>");
		} else {
			jsonData['originId']           = parseFloat(origin);
			jsonData['destinationId']      = parseFloat(destination);
			jsonData['ruleClassification'] = createRuleClassification;
			jsonData["grouphost"]          = userGroup.host;
			jsonData["groupname"]          = userGroup.name;
			jsonData["namespace"]          = loggedInUserName;
			
			console.log(JSON.stringify(jsonData));

			var doneFunction = function(data) {
				// console.log(data.rule);
			
				ConnectionPropertyUtils.updateConnGraph(tdvCy, DesignCytoscapeUtils.formatNewConnection(data.connection));
				
				var rule = ConnectionPropertyUtils.getRuleFromId(data.connection.ruleId);
				
				if ( rule ) {
					ruleMapViaId[data.connection.ruleId] =rule;
				}
				
//				ruleMap = {};
//				ruleMapViaId = {};
//				GlobalUtils.loadAllRules();
				
				creatingConnection = false;
				createRuleClassification = null;
				connId = data.connection.id;
				
				DesignSavingFcts.clearSelection();
				
				 tdvCy.filter("edge[id='connection" + connId + "']").select();

			};

			var failFunction = function(xhr, status, error) {
				console.log('Error Connection not created: ' + xhr.status);
			};

			var apis = new ConnectionApis();
			apis.saveNewConnectionAPI(jsonData, doneFunction, failFunction);
		}
	}

	ConnectionPropertyUtils.showConnRuleProperties = function(connId) {
		
		var conn = connMapViaId[connId];			
		var formHeader = "<form><table>";		
		var inputs = "";
		
		$.each(conn, function(key, value) {
			
		    if( key == "name"){
		    	inputs += "<tr><th>" + key + "</th><td><input type='text' name='" + key + "' value='" + value + "' disabled/></td></tr>";
		    };
		    if( key == "origin"){
		    	inputs += "<tr><th>Parent :</th><td><input type='text' name='" + key + "' value='" + value + "' disabled/></td></tr>";
		    };
		    if( key == "destination"){
		    	inputs += "<tr><th>Child :</th><td><input type='text' name='" + key + "' value='" + value + "' disabled/></td></tr>";
		    };
		
		});

		// generate the properties fields
		var props = ruleMapViaId[conn.ruleId].typeProperties;	
//		listConnIds[0] = connId;
		if ( props == null || props.length == 0 || $.isEmptyObject(props)  ) {
			inputs += "<tr><th colspan='2'> No properties added </th></tr>";
		} else {	
			inputs += "<tr><th style='background-color: #CDEEDD'>Properties:</th>";
			inputs += "<td><input id='connection_prop_detail_button_" + conn.id + "' type='button' value='Show Details' class='btn btn-primary btn-xs' onclick='ConnectionPropertyUtils.showOrHideAllConnectionPropertiesDetails(\"" + conn.id + "\");'/></td></tr>";
			
			inputs += "<tr style='background-color: grey'><th> Name</th><th>Type</th></tr>"; 
			$.each(props, function(key, value) {	
				var newInput = ConnectionPropertyUtils.displayRuleProperty( value , null );
				inputs += newInput ;
			});
			
		} 
		
		// build out footer if neccessary
		var footer = "";		
		footer  = "<tr><td><input type='button' value='ADD Properties' class='btn btn-primary btn-xs' onclick='ConnectionPropertyUtils.addConnectionProperties(\"" + connId + "\");'/></td>";
		footer += "<td><input type='button' value='UPDATE' class='btn btn-primary btn-xs' onclick='ConnectionPropertyUtils.updateRuleConnection(\"" + connId + "\");'/>";
		footer += "<input type='button' value='DELETE' class='btn btn-primary btn-xs' disabled='disabled' onclick='deleteConnection(form);'/></td></tr>";
		footer += "</table></form>";
		
		var form = document.createElement('div');
		form.innerHTML = formHeader + inputs + footer;			
		$('#typeForm').empty();
		$('#typeForm').append(form);	
	};

	ConnectionPropertyUtils.addConnectionProperties = function (connId) { // the selected name of the type is
		// saved in the Global variable

		var conn = connMapViaId[connId];	
		var Form, formHeader, formFooter, newProperty, properties, inputs = '';
		Form = document.createElement('div');
		
		formHeader = "<form id='connectionProps'  method='post'>";
		inputs += "<div id='connPropAddDiv'><label>Rule Selected: </label>"
		           + conn.name + "<input type='hidden' name='connid' value='"
		           + conn.id + "'/>" + "<input type='hidden' name='connname' value='"
		           + conn.name + "'/><input type='hidden' name='ruleid' value='"+conn.ruleId+"'/></div>";
		inputs += "<button type='button' class='btn btn-primary btn-xs'   onclick='TypePropertyUtils.addProperties()'>Add More property</button>";
		
		formFooter = "<div id='propertiesFields'></div>";
		formFooter += "<input id='save_conn_prop_button' type='button' value='SAVE properties'  class='btn btn-primary btn-xs' onclick='ConnectionPropertyUtils.saveConnProperties(form)'></form>";
		formFooter += "<input id='cancel_conn_prop_button' type='button' value='CANCEL'  class='btn btn-primary btn-xs' onclick='ConnectionPropertyUtils.cancelUpdateConn(\"" + conn.id + "\");'></form>";
		
		Form.innerHTML = formHeader + inputs + formFooter;
		
		$('#typeForm').empty();
		$('#typeForm').append(Form);
		
		newProperty = document.createElement('div');
		properties = "<hr/><table>";
		
		properties += "<tr><th>Name & Type:</th><td><input type='text' name='name' size='10' />";
		properties += "<select name='propertyType' onchange='(new DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>"
		              + "<option value='STRING'>TEXT</option>"
		              + "<option value='INTEGER'>INTEGER</option>"
		              + "<option value='DOUBLE'>DOUBLE</option>"
		              + "<option value='DATE'>DATE</option>"
		              + "<option value='BOOLEAN'>BOOLEAN</option>"
		              + "<option value='FILE'>FILE</option>"
		              + "<option value='CURRENCY'>CURRENCY</option>"
		              + "<option value='STATUS'>STATUS</option>"
		+ "<option value='PARENTVALUE'>PARENTVALUE</option>"
		+ "<option value='CONCAT'>CONCAT</option>"
		+ "</select></td></tr>";
		properties += "<tr><th> isMandatory:</th><td>";
		properties += "<input type='checkbox' name='isMandatory'>";
		
		properties += "</td></tr>";
		properties += "<tr><th> isUnique: </th><td>";
		properties += "<input type='checkbox' name='isUnique'>";
		
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

	
	ConnectionPropertyUtils.saveConnProperties = function(form) {

		var jsonData = {}, connProperties = [], property = {}, connname, connId, ruleId;
		// Retrieve type fields from form

		$(form).find('div#connPropAddDiv').find(':input').each(function(i, field) {
			jsonData[field.name] = field.value;
		});
		// remove typename from JSON
		connname = jsonData["connname"];
		connId = jsonData["connid"];
		ruleId = jsonData["ruleid"];
		delete jsonData['connname'];
		delete jsonData["connid"];

		// grab the conn object
		var connObj = connMapViaId[connId];

		// Retrieve Type properties fields from form
		$(form).find('div#propertiesFields').find('div')
			.each(	function(i, propDiv) {
				$(propDiv).find(':input')
					.each( function(i, field) {
						if ((field.type != 'submit' && field.type != 'radio' && field.type != 'button')|| field.checked) {
							if (field.name == 'isMandatory'|| field.name == 'isUnique') {
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
			connProperties.push(property);
			property = {};
		});
		// attach properties to JSON
	    
		jsonData["grouphost"] = userGroup.host;
		jsonData["groupname"] = userGroup.name;
		jsonData["namespace"] = loggedInUserName;
		jsonData["fields"] = connProperties;

	    console.log(jsonData);
		var successFunction = function(data) {
			
			console.log("Rule Properties create success. data: " + data.name);       
			// on success on a new property for a rule, we just want to update the property list
			ruleMapViaId[ruleId].typeProperties = data.typeProperties;
			ConnectionPropertyUtils.showConnRuleProperties(connId);	
		};

		var failFunction = function(xhr, status, error) {
			$('#typeForm').empty();
			document.getElementById('typeForm').textContent = "Error Rule properties not saved";
			
			$('#error_message').empty();
			$('#error_message').append("error in add properties for rule-- API failed")
		};

		var connApis = new ConnectionApis();
		connApis.addRuleProperties(jsonData, successFunction, failFunction);
				
	}

	
	ConnectionPropertyUtils.updateRuleConnection = function (connId) {		
						
		var conn = connMapViaId[connId];		
		var Form, formHeader, formFooter; 
		Form = document.createElement('div');
		
		formHeader = "<form id='update_connection_form'>";
		var inputs = "";
		
	    inputs += "<table id='update_connection_table'>";
	    inputs += "<tr><td colspan='2'><input type='hidden' name='id'  value='" + conn.id + "'></td></tr>";
	    
	    $.each(conn, function(key, value) {
			
	    	if (key == 'name') {
	    		inputs += "<tr><th>" + key + "</th><td><input type='text' name ='" + key + "' value='" + value + "'/></td></tr>";
	    	} else if (key == 'minRel' || key == 'maxRel' ) {
	    		inputs += "<tr><th>" + key + "</th><td><input type='number' name ='" + key + "' value='" + value + "'/></td></tr>";
	    	} else {
	    		  if( key == 'ruleId')
	    	   		inputs += "<tr><td colspan='2'><input type='hidden' name='ruleId'  value='" + conn.ruleId + "'></td></tr>";
	    	}
	    	
		});
	        
		var Props = ruleMapViaId[conn.ruleId].typeProperties;
		if (Props == null) {inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";}
		else {
			inputs += "<tr><th colspan='2' style='background-color: #CDEEDD'> Properties:</th></tr></table>";
			$.each(Props, function(key, value2) {
					inputs += "<table id='propertiesFields'>";
					$.each(value2, function(key,value){	
						if (key == 'id') {
							inputs += "<input type='hidden' name='id' value='"+value+"'>";
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
		formFooter = "<tr><td><input type='button' value='UPDATE' class='btn btn-primary btn-xs' onclick='ConnectionPropertyUtils.saveUpdateRuleConnection(form)' /></td>";
		formFooter += "<td><input type='button'  value='CANCEL' class='btn btn-primary btn-xs' onclick='ConnectionPropertyUtils.cancelUpdateConn(\"" + conn.id + "\");'></td></tr><table></form>";
		Form.innerHTML = formHeader + inputs + formFooter;

		$('#typeForm').empty();	
		$('#typeForm').append(Form);			
	};

	ConnectionPropertyUtils.cancelUpdateConn = function (connId) {
		$(".qtip").remove();
		tdvCy.filter("edge[id='connection" + connId.toString() + "']").unselect();
	}

	
	ConnectionPropertyUtils.saveUpdateRuleConnection = function (form) {
		
		var jsonData = {};
		var connProperties = [],jsonProperty = {}, foundError = false;
		$(form).find('table#update_connection_table').find(':input').each(function(i, field){		
			if ((field.type != 'submit') && (field.type != 'radio') || field.checked) {		
				if((field.name == 'ruleId')||(field.name == 'id')||(field.name == 'name')|| (field.name== 'minRel')||(field.name=='maxRel')){
					if(field.name =='name' && !field.value ){
						console.log("Missing Value for Connection Name.");
	          		    $('#typeForm').append("<br/><p style='color:red'>Missing Value for Connection name : ");
	                    foundError= true;
					}
					jsonData[field.name] = field.value;		
				}
			}
		
		});
				
		jsonData["namespace"] = loggedInUserName;
		jsonData["grouphost"] = userGroup.host;
		jsonData["groupname"] = userGroup.name;
		
		console.log(jsonData);
	    if(!foundError){
			var connId = jsonData["id"];
			var ruleId = jsonData["ruleId"];
			var connName = connMapViaId[connId].name;
			delete jsonData["ruleId"];	
			var doneFunction = function( data ) {
				
				var oldConnectionId = connId;
				var oldConnectionName = connName					
				tdvCy.remove('edge[id = "connection' + oldConnectionId + '"]');			
				delete connMapViaId[oldConnectionId];	// delete the connMapViaId one as well
				delete connMap[oldConnectionName];
					
				ConnectionPropertyUtils.updateConnGraph(tdvCy, DesignCytoscapeUtils.formatNewConnection(data));
		
			};
				
			var failFunction = function( xhr, status, error ) {
				console.log('Error Update Connection not done: ' + xhr.status);	
				CommonFctsLogical.HandlingErrorMSG(	"error in update Connection-- API failed", "error");
				
			};
			
			var apis = new ConnectionApis();
			apis.saveUpdateConnectionById(jsonData, doneFunction, failFunction);
			
			console.log(jsonData);
					
			var jsonData2 = {};
			
			var ruleProperties = [];
			var jsonProperty = {};
			$(form).find('table#propertiesFields').each(function(i, propDiv){
				$(propDiv).find(':input').each(function(i,field){
				        if ( field.type != 'button' ) {
				        	
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
				ruleProperties.push(jsonProperty); 
				jsonProperty = {};
			});
			
			
			var retproperties=[];
			var jsonDatarule = {};
			var error = false;
			$.each(ruleProperties, function(key, value) {
				jsonDatarule["updateProperty"] = value;
				jsonDatarule["ruleId"]         = Number(ruleId);
				jsonDatarule["namespace"]      = loggedInUserName;
				jsonDatarule["groupname"]      = userGroup.name;
				jsonDatarule["grouphost"]      = userGroup.host;
				var successFunction = function( data ) {
				
					console.log("Rule Properties update success. data: " + data.name);									
					retproperties = data.rule.typeProperties;
					
				};
				
				var failFunction = function( xhr, status, error ) {
					document.getElementById('typeForm').append("Error Rule properties not updated");
					error = true;
				};
				
				var ruleapis = new RuleApis();
				ruleapis.updateRuleAndProperties( ruleId, jsonDatarule,  successFunction, failFunction );	
			
			});
			
			if(!error){
		        ruleMapViaId[ruleId].typeProperties = retproperties;
				$('#typeForm').empty();		
				ConnectionPropertyUtils.showConnRuleProperties(connId)
				
			}	
		}
					
	};

	ConnectionPropertyUtils.updateConnGraph  = function (cy, elements) {
	    console.log(elements);
		var newElements = cy.add(elements);
		DesignCytoscapeUtils.attachRuleConnClickActions(newElements.filter('edge'));
		if (layoutStatus == 0) {
	    	console.log("update graph with connection  using preset layout!");
	    	cy.layout({name: 'preset',fit : false})
	    } else {
	    	console.log("update graph with connection using default layout !");
	    	cy.layout(defaultLayout);
	    }
	};

	ConnectionPropertyUtils.getRuleFromId = function ( ruleId ){
		var jsonData = {}; var res = null;
		if (  ruleId  == null) {
			$('#console-log').append("<p style='color:red'>No ruleId passed/p>");
			return null;
		} else {
			jsonData['ruleId']           = ruleId;
			
			jsonData["grouphost"]          = userGroup.host;
			jsonData["groupname"]          = userGroup.name;
			jsonData["namespace"]          = loggedInUserName;
			
			console.log(JSON.stringify(jsonData));
			var doneFunction = function(data) {
				// console.log(data.rule);
				if (data !=null ){
					res =data.rule;
				}

			};

			var failFunction = function(xhr, status, error) {
				console.log('Can not retrieved rule from ruleId: ' + xhr.status);
			};

			var apis = new RuleApis();
			apis.getRuleAPI(jsonData, doneFunction, failFunction);
			
		}
		return res;
		
	}





/**
 * For creating Connection Rule Properties
 */


//ConnectionPropertyUtils.createFormRuleProperty = function( connJsonObj, showTypeInfo, showbuttons, typeDisplayFunction, propertyDisplayFunction ) {
//	
//	// should we wrap this in a div?
//	var formHeader = "<table>";
//	var inputs = "";
//	
//	if( showTypeInfo == true ) {
//		// formHeader = "<table>";
//		$.each(connJsonObj, function(key, value) {
//			
//			if(key == 'name')  {
//				inputs += "<tr><th>" + key + "</th>";
//				if (value == '') {
//					inputs += "<td>None</td><tr>"; 
//				} else { 
//					inputs += "<td>" + value + "</td><tr>";	
//				}
//			} else if (key == 'isRoot') {
//				inputs += "<tr><th>"+key +":</th>";
//				inputs += "<td><input type='radio'  ";
//				if (value == true) { 
//					inputs += " value='true'  checked='checked' >true </td></tr>";
//				} else { 
//					inputs += " value='false'  checked='checked' >false </td></tr>";     
//				}
//			}
//		});
//	}
//
//	// to generate the properties from a conn we need the rule
//	// this can happen 2 ways
//	// 1. the connJsonObj HAS a ruleId
//	// 2. the connJsonObj DOES NOT have a ruleId, but has a CONNID
//	
//	var rule = null;
//	if( connJsonObj.ruleId != null ) {
//		// retrieve the rule
//		rule = ruleMapViaId[ connJsonObj.ruleId ];
//	} else {
//		var connId = connJsonObj.id;
//		var conn = connMapViaId[ connId ];
//		
//		// retrieve the rule
//		rule = ruleMapViaId[ conn.ruleId ];
//	}
//	
//	
//	
//	// generate the properties fields
//	var props = rule.typeProperties;	
//	
//	if ( props == null || props.length == 0 || $.isEmptyObject(props)  ) {
//		inputs += "<tr><th colspan='2'> No properties added </th></tr>";
//	} else {	
//		inputs += "<tr><th colspan='7' style='background-color: #CDEEDD'>Properties:</th></tr>";
//		inputs += "<tr style='background-color: grey'><th> Name</th><th>Type</th></tr>"; 
//		$.each(props, function(key, value) {	
//
//			var newInput = ConnectionPropertyUtils.createRuleProperty( value , null, propertyDisplayFunction );
//			inputs += newInput ;
//		});
//		
//		if( showbuttons == true ) {
//			inputs += "<tr><td><input id='type_prop_detail_button_" + connJsonObj.id + "' type='button' value='Show Details' class='btn btn-primary btn-xs' onclick='showOrHideAllTypePropertiesDetails(\"" + connJsonObj.id + "\");'/></td></tr>";			
//		}		
//	} 
//	
//	// build out footer if neccessary
//	var footer = "";
//	
//	if( showbuttons == true ) {
//		footer  = "<tr><td><input type='button' value='Add Properties' class='btn btn-primary btn-xs'    onclick='AddTypeProperties();'/></td>";
//		footer += "<td><input type='button' value='Update Type'    class='btn btn-primary btn-xs'    onclick='UpdateTypeForm()'/></td></tr>";
//	}
//
//	footer += "</table>";
//	
//	return formHeader + inputs + footer;
//};

/**
 * We should be expecting a 3 columns
 */
//ConnectionPropertyUtils.createRuleProperty = function( property, prefix, displayFunction  ) {
//	
//	if( prefix == null ) {
//		prefix = "create_edge_property_"; 
//	}
//	
//	console.log("Inside  ConnectionPropertyUtils.createRuleProperty   ");
//	var inputs = "";
//	
//	if( displayFunction == null ) {
//		// generate the properties fields
//		console.log("Generate properties fields ");
//		if ( property == null ) {
//			// inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";
//		} else {	
//			
//			 //  added other values			
//			var inputid = "create_node_property_" + property.id + "'";
//			 
//			if(property.isMandatory) { propcolor='color:red'; }
//			else{ propcolor='color:black';   }
//			
//			inputs += "<tr><th style=" + propcolor + "><input type='hidden' name='propertyId' value='" + property.id + "'>" + property.name + ": </th><td>";
//			
//			if (property.propertyType === "FILE") {
//				inputs += "<input id='" + inputid + "' type='file' name='value' onchange='GlobalUtils.showFile(event, \"" + property.id + "\")'/>"
//							+ "<a id='show_image_file_output_" + property.id + "' target='_blank' href='' class='imgthumb' style='display:none;'><img id='image_file_output_" + property.id + "' style='display:none;' height='50' width='50'></a>"
//							+ "<a id='other_file_output_" + property.id + "' style='display:none;'></a>"
//							+"(" + property.propertyType + ")";
//			} else if (property.propertyType == 'DATE') {
//				// this needs to use the typeProperty.id?
//				// ie. id='create_node_property_" + typeProperty.id + "'
//				inputid = prefix + typeProperty.id ;
//				inputs += "<input id='" + inputid + "' type='text' size='10'  style ='position: relative; z-index: 100000;' name='value' id= '"+property.id+"'  value='" + today + "'/>(" + typeProperty.propertyType + ")";
//				listDates.push(property.id);
//			} else if (property.propertyType == 'INTEGER') {
//				inputs += "<input id='" + inputid + "' type='text' size='10' name='value' onkeypress='return event.charCode >= 48 && event.charCode <= 57 ' />(" + property.propertyType + ")";
//			} else if (property.propertyType == 'BOOLEAN') {
//				inputs += "<form><input id='" + inputid + "' type='radio' name='value' value='true'>true   <input type='radio' name='value' value='false'>false</form>";
//			} else {
//				inputs += "<input id='" + inputid + "' type='text' size='10' name='value' />(" + property.propertyType + ")";
//			}
//			
//			inputs += "<input type='hidden' name='propertyType' value='" + property.propertyType + "'></td></tr>";
//				 
//		} 
//		
//	} else {
//		return displayFunction( null, property );
//	}
//	
//	return inputs;	
//};

//ConnectionPropertyUtils.createNewRuleProperty = function( displayFunction  ) {
//	console.log("Inside  ConnectionPropertyUtils.createNewRuleProperty   ");
//	var inputs = "";
//	
//	if( displayFunction == null ) {
//		
//		properties = "<table>";
//		properties += "<tr><th>Name & Type:</th><td><input type='text' name='propertyName' size='10' />";
//		properties += "<select name='propertyType'>" +
//				"<option value='INTEGER'>INTEGER</option>"+
//				"<option value='DOUBLE'>DOUBLE</option>"+
//				"<option value='DATE'>DATE</option>"+
//				"<option value='STRING'>TEXT</option>"+
//				"<option value='BOOLEAN'>BOOLEAN</option>"+
//				"<option value='FILE'>FILE</option>"+
//				"<option value='CURRENCY'>CURRENCY</option>"+
//				"</select></td></tr>"; 
//		properties += "<tr><th> isMandatory:</th><td>";
//		properties += "<input type='radio' name='isMandatory' value='true' checked='checked'/>Yes";
//		properties += "<input type='radio' name='isMandatory' value='false' />No";
//		properties += "</td></tr>";
//		properties += "<tr><th> isUnique: </th><td>";
//		properties += "<input type='radio' name='isUnique' value='true' checked='checked'/>Yes";
//		properties += "<input type='radio' name='isUnique' value='false' />No";
//		properties += "</td></tr>";
//		properties += "<tr><th>Default Value:</th><td> <input type='text' name='defaultValue' /></td></tr>";
//		properties += "<tr><th>Max Value:</th><td> <input type='text' name='maxValue' /></td></tr>";
//		properties += "<tr><th>Min Value:</th><td> <input type='text' name='minValue' /></td></tr>";
//		properties += "</table>";
//			 
//		return properties;
//		
//	} else {
//		return displayFunction( null, property );
//	}
//	
//	return inputs;	
//};



//ConnectionPropertyUtils.AddTypeProperties = function () {                                       // the selected name of the type is saved in the Global variable
//
//	var ruleName = ruleMapViaId[listConnIds[0]].name;
//	var ruleId = ruleMapViaId[listConnIds[0]].id;
//	
//	var Form, formHeader, formFooter, newProperty, properties, inputs=''; 
//	Form = document.createElement('div');  
//	
//	formHeader = "<form id='typeProps'  method='post'>";
//	
//    inputs += "<div id='ruleName'><label>Type Selected: </label>"+ruleName+"<input type='hidden' name='ruleid' value='"+ruleId+"'/><input type='hidden' name='rulename' value='"+ruleName+"'/></div>";
//	inputs += "<button type='button' class='btn btn-success btn-xs'   onclick='addProperties()'>Add property</button>";
//
//	formFooter = "<div id='propertiesFields'></div>";
//	formFooter += "<input id='save_type_prop_button' type='button' value='Save properties'  class='btn btn-success btn-xs' onclick='saveTypeProperties(form)'>";
//	formFooter += "<input type='button' value='Cancel' class='btn btn-success btn-xs' onclick='(new DesignLogicalRenderer()).showLinkPropertiesByRuleId(" + ruleId + ");'></form>";
//	Form.innerHTML = formHeader + inputs + formFooter;
//
//	$('#typeForm').empty();
//	$('#typeForm').append(Form);	
//	
//	 newProperty = document.createElement('div');
//	 properties = "<hr/><table>";
//     properties += "<tr><th>Name & Type:</th><td><input type='text' name='name' size='10' />";
//     properties += "<select name='propertyType' onchange='(new DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>" +
//     		"<option value='STRING'>TEXT</option>"+
//			"<option value='INTEGER'>INTEGER</option>"+
//			"<option value='DOUBLE'>DOUBLE</option>"+
//			"<option value='DATE'>DATE</option>"+
//			"<option value='BOOLEAN'>BOOLEAN</option>"+
//			"<option value='FILE'>FILE</option>"+
//			"<option value='CURRENCY'>CURRENCY</option>"+
//			"<option value='STATUS'>STATUS</option>"+
//			"<option value='PARENTVALUE'>PARENTVALUE</option>"+
//			"<option value='CONCAT'>CONCAT</option>"+
//			"</select></td></tr>";
//     
//	 properties += "<tr><th> isMandatory: </th><td>";
//	 properties += "<input type='checkbox' name='isMandatory'>";
//
//	 properties += "</td></tr>";
//	 properties += "<tr><th> isUnique: </th><td>";
//	 properties += "<input type='checkbox' name='isUnique'>";
//
//	 properties += "</td></tr>";
//	 properties += "<tr><th>Default Value:</th><td> <input type='text' name='defaultValue' onkeypress='' value='' defaultValue='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></td></tr>";
//	 properties += "<tr><th>Max Value:</th><td> <input type='text' name='maxValue' /></td></tr>";
//	 properties += "<tr><th>Min Value:</th><td> <input type='text' name='minValue' /></td></tr></table>";
//	
//	 newProperty.innerHTML = properties;
//	
//	document.getElementById('propertiesFields').appendChild(newProperty);
//	if (document.getElementById('propertiesFields').innerHTML != '') {
//		document.getElementById("save_type_prop_button").style.visibility = 'visible';
//		}
//}






//ConnectionPropertyUtils.displayRuleProperties = function( appendTo, connJsonObj, showTypeInfo, typeDisplayFunction, propertyDisplayFunction ) {
//
//var form = document.createElement('div');
//form.innerHTML = ConnectionPropertyUtils.getRulePropertiesHTML( connJsonObj, showTypeInfo, true, typeDisplayFunction, propertyDisplayFunction );
//appendTo.append( form );	
//};
//
//
//ConnectionPropertyUtils.getRulePropertiesHTML = function( connJsonObj, showTypeInfo, showbuttons, typeDisplayFunction, propertyDisplayFunction ) {
//
//var formHeader = "<table>";
//var inputs = "";
//
//if( showTypeInfo == true ) {
//// formHeader = "<table>";
//$.each(connJsonObj, function(key, value) {
//	
//	if(key == 'name')  {
//		inputs += "<tr><th>" + key + "</th>";
//		if (value == '') {
//			inputs += "<td>None</td><tr>"; 
//		} else { 
//			inputs += "<td>" + value + "</td><tr>";	
//		}
//	} else if (key == 'isRoot') {
//		inputs += "<tr><th>"+key +":</th>";
//		inputs += "<td><input type='radio'  ";
//		if (value == true) { 
//			inputs += " value='true'  checked='checked' >true </td></tr>";
//		} else { 
//			inputs += " value='false'  checked='checked' >false </td></tr>";     
//		}
//	}
//});
//}
//
//// to generate the properties from a conn we need the rule
//// this can happen 2 ways
//// 1. the connJsonObj HAS a ruleId
//// 2. the connJsonObj DOES NOT have a ruleId, but has a CONNID
//
//var rule = null;
//if( connJsonObj.ruleId != null ) {
//// retrieve the rule
//rule = ruleMapViaId[ connJsonObj.ruleId ];
//} else {
//var connId = connJsonObj.id;
//var conn = connMapViaId[ connId ];
//
//// retrieve the rule
//rule = ruleMapViaId[ conn.ruleId ];
//}
//
//
//// generate the properties fields
//var props = rule.typeProperties;	
//
//if ( props == null || props.length == 0 || $.isEmptyObject(props)  ) {
//inputs += "<tr><th colspan='2'> No properties added </th></tr>";
//} else {	
//inputs += "<tr><th colspan='7' style='background-color: #CDEEDD'>Properties:</th></tr>";
//inputs += "<tr style='background-color: grey'><th> Name</th><th>Type</th></tr>"; 
//$.each(props, function(key, value) {	
//
//	var newInput = ConnectionPropertyUtils.displayRuleProperty( value , propertyDisplayFunction );
//	inputs += newInput ;
//});
//
//if( showbuttons == true ) {
//	inputs += "<tr><td><input id='type_prop_detail_button_" + connJsonObj.id + "' type='button' value='Show Details' class='btn btn-primary btn-xs' onclick='showOrHideAllTypePropertiesDetails(\"" + connJsonObj.id + "\");'/></td></tr>";			
//}		
//} 
//
//// build out footer if neccessary
//var footer = "";
//
//if( showbuttons == true ) {
//footer  = "<tr><td><input type='button' value='Add Properties' class='btn btn-primary btn-xs'    onclick='AddTypeProperties();'/></td>";
//footer += "<td><input type='button' value='Update Type'    class='btn btn-primary btn-xs'    onclick='UpdateTypeForm()'/></td></tr>";
//}
//
//footer += "</table>";
//
//return formHeader + inputs + footer;
//};


