
//=============================MAY NOT BE USED==============================//


/**
 * Desc:	Event handlers/functions for romeType
 * Author:	Baya Benrachi
 * Date:	28 March 2016
 * Update:  22 June 2016
 */
//==============================================================================
//====================********* ADD RULE Only DIALOG *********=======================
//==============================================================================

function showAddRule() {
	$("#grid-types").css({'visibility':'visible'});
	if (selectedMetaData != null){
		var Form = document.createElement('div');
		var formHeader = "<form id='addRuleDialog'>", inputs = "";
			
		// Name field
		inputs += "<div id='ruleName'><label>Name: <input type='text' name='name' required='required' /></label><br />";
		
		// Rule Classification Radio Button 
//		inputs += "<label>Classification: ";
//		inputs += "<input type='radio' name='classification' value='parentchild'  checked='checked'/>Parent-Child";
//		inputs += "<input type='radio' name='classification' value='link' />Link";
//		inputs += "</label><br /></div>";
		inputs += "<input type='text' name='classification' value='parentchild' style='visibility:hidden; position:absolute; top:-100px;' /></div>";
		inputs += "<div id='propertiesFields'></div><a href='#' onclick='addProperties()'> + Add property</a><br/>"
			
		// Hidden fields, ownerId
		var ownerId = 123;
		inputs += "<input type='text' name='owner' value='" + ownerId + "' style='visibility:hidden; position:absolute; top:-100px;' />";
		 
		// <!-- Allow form submission with keyboard without duplicating the dialog button -->
		var formFooter = "<input type='button' value='Add Rule' onclick='saveRuleWithProperties(form)'  /></form>";
		Form.innerHTML = formHeader + inputs + formFooter;
		(new DesignLogicalRenderer()).emptyAll();
		$('#typeForm').append(Form);
		
	} else {
		$('#console-log').append("<p style='color:red'>Can not create a Rule, You must First  select a Metadata</p>");
		}
}


//========================================================================
/**
 * DEPRECATED
 * DO NOT USE THIS METHOD, this needs to be moved to the api call
 */
function saveRuleWithProperties(form) {
	var jsonData = {}, ruleProperties = [];
	var property={};
	$(form).find(':input').each(function (i, field) {
		if ((field.type != 'button' && field.type != 'submit' && field.type != 'radio') || field.checked) {
			jsonData[field.name] = field.value;
		}
	});
	$(form).find('div#propertiesFields').find('div').each(function(i, propDiv){
		$(propDiv).find(':input').each(function(i, field){
			if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
				property[field.name] = field.value;		
			}
		});
		console.log(property);
		ruleProperties.push(property);
		property ={};
	});
	
	console.log(ruleProperties);
    jsonData.properties = ruleProperties;

	if (selectedMetaData != null){
		$.ajax({
			type : 'POST',
			url : apiBaseUrl + 'rule/metadata/'+ selectedMetaData,
			dataType : 'json',
			data : JSON.stringify(jsonData),
			contentType : 'application/json',
			cache : false,
			success : function(data) {
				console.log("Rule create success. data: " + data);
			},
			error : function(xhr, ajaxOptions, error) {
				$('#console-log').append("<p style='color:red'>Saving Rule failed."+xhr.status+"</p>" );
				console.log("Save Rule Error: "+ xhr.responseText);
				(new DesignLogicalRenderer()).emptyAll();
			}
		}).done(function(data) {
			console.log(data);
			
			if (!ruleMap[data.name]) {
				ruleMap[data.name] = data;
				ruleMapViaId[ data.id ] = data;
			} 
			(new DesignLogicalRenderer()).initRuleDesignBar('ruleBar');
			//initRuleBarInst('ruleInstBar'); // need to be changed to use a design own function
			(new DesignLogicalRenderer()).emptyAll();
		});
	} else { 
		$('#console-log').append("<p style='color:red'>Can not create a Rule, You must First  select a Metadata</p>");
	}		
	

}






//==============================================================================
//==========================  ADD RULE PROPERTIES =============================
//==============================================================================
//function showAddRulePropertiesDialog() {
//	if (selectedMetaData != null){
//		var dlg_width = 400, dlg_height = 50, dlg_offset_x = 300, dlg_margin_top = 300;
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
//				"Add Rule Properties" : function() {
//					saveRuleProperties(dialog.find("form"));
//				},
//				Cancel : function() {
//					dialog.dialog("close");
//				}
//			}
//		});
//		
//		if (!hasMoved && dialog.dialog("instance")) {
//			grayOut(true);
//	
//			var formHeader = "<form id='addRulePropertiesDialog'>", inputs = "";
//			// Type name to be selected
//			
//			// list all types
//		    inputs += "<div id='ruleName'><label> Rule: </label><select name='rulename'  onchange='addproperties()'>";
//			
//			ruleList.forEach(function(ruleName) {
//				inputs += "<option value='" + ruleName + "'>" + ruleName + "</option>";			
//			});
//			inputs += "</select><br/></div>";
//		
//			inputs += "<div id='propertiesFields'></div><a href='#' onclick='addProperties()'> + Add property</a>"
//			
//			// <!-- Allow form submission with keyboard without duplicating the dialog button -->
//			var formFooter = "<div id='propertiesFields'></div>";
//			   formFooter += "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px'>";
//	
//			dialog.dialog("option", "title", "Add Rule properties");
//			dialog[0].innerHTML = formHeader + inputs  +formFooter ;
//			dialog.dialog("open");
//		}
//	
//	  dialog.find("form").on("submit", function(event) {
//	  	event.preventDefault();
//	  	saveRuleProperties(this);
//	  });
// } else {alert("please select a MetaData Repo ");}
//}

//====================================================================================
//==========================SAVE ADD Rule PROPERTIES ======================================
//====================================================================================
function saveRuleProperties(form) {
	var jsonData = {}, ruleProperties = [];
	 
	$(form).find('div#ruleName').find(':input').each(function(i,field){
		jsonData[field.name] =field.value;
	});
//	console.log(jsonData);
	var rulename= jsonData["rulename"];
	delete jsonData['rulename'];
	console.log(rulename);
	var property={};
	
	$(form).find('div#propertiesFields').find('div').each(function(i, propDiv){
		$(propDiv).find(':input').each(function(i, field){
			if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
				property[field.name] = field.value;		
			}
		});
		console.log(property);
		ruleProperties.push(property);
		property ={};
	});
	
	console.log(ruleProperties);
    jsonData = ruleProperties;
	console.log(jsonData);
	if (selectedMetaData != null){
		$.ajax({
			type : 'POST',
			url : apiBaseUrl + 'rule/properties/' + rulename +'/metadata/' + selectedMetaData,
			dataType : 'json',
			data : JSON.stringify(jsonData),
			contentType : 'application/json',
			cache : false,
			success : function(data) {
				          console.log("Rule Properties create success. data: " + data);
			},
			error : function(xhr, ajaxOptions, error) {
				alert(xhr.status);
				console.log("Save Rule Properties Error: "+ xhr.responseText);
			}
		}).done(function(data) {
			console.log(data);
		});
	} else { alert("Can not save Rule properties, You must First  select a Metadata");}	
	 $(form).parent().dialog( "close" );
}

//==========================================================================
//     UPDATE RULE and its properties 
//==========================================================================

function showUpdateRuleDialog(node) {
	var rule = node.original;
	var dlg_width = 400, dlg_height = 50, dlg_offset_x = 300, dlg_margin_top = 300;
	var dialog = $('#dialog');
	
	dialog.dialog({
		width : dlg_width,
		autoOpen : false,
		position : {
			my : "center center",
			at : "center center",
			of : "#gvTabContent"
		},
		buttons : {
			"Update Rule" : function() {
				updateRule(dialog.find("form"));
			},
			Cancel : function() {
				dialog.dialog("close");
			}
		}
	});
	if (!hasMoved && dialog.dialog("instance")) {
		grayOut(true);
		console.log(rule);
		var formHeader = "<form id='updateRuleDialog'>", inputs = "";
		
        inputs += "<table id='ruleName'>";
        inputs += "<tr><td><input type='hidden' name='rulename'  value='"+ rule.text+"'></td></tr>";
		$.each(rule, function(key, value) {
		if((key == "name") || (key == "classification")) {
				inputs += "<tr><td>"+key + "</td><td><input type='text' name ='"+key+"' value='"+value+"'</td><tr>";
			}
		});
		inputs += "<tr><th colspan='2' style='background-color: grey'> Properties:</th></tr></table>";
		var Props = rule.properties;
		console.log("*********"+Props);
		if(Props.length == 0) {inputs +=" No properties available";}
		
		Props.forEach(function(prop) {
			inputs += "<table id='properietesFields'>";
			$.each(prop, function(key,value){
				if (key == 'name') { 
					inputs += "<input type='hidden' name='currentPropertyName' value='"+value+"'>";
					inputs += "<tr><td>"+key+"</td><td><input type='text' name='propertyName' value='"+value+"'/></td></tr>";
					}
				else  {
			    inputs += "<tr><td>"+key+"</td><td><input type='text' name='"+key+"' value='"+value+"'/></td></tr>";
			     }
			});
		});
		inputs += "</table></div></div></form>";
		
		// <!-- Allow form submission with keyboard without duplicating the dialog button -->
		var formFooter = "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px;' />";

		dialog.dialog("option", "title", "Update Rule");
		dialog[0].innerHTML = formHeader + inputs + formFooter;
		dialog.dialog("open");
	}

    dialog.find("form").on("submit", function(event) {
    	event.preventDefault();
    	updateRule(this);
    });
}

//=======================================================================================
function updateRule(form) {
	var jsonData = {}; var ruleproperties =[];
	var jsonProperty = {};
		
	$(form).find('table#ruleName').find(':input').each(function(i, field){
		if ( field.type != 'radio' || field.checked ||field.type != 'submit') {
		              jsonData[field.name] = field.value;
		}
	})
	//console.log(jsonData);
	// remove original typename to pass as path parameter
    var rulename = jsonData["rulename"];
	delete jsonData['rulename'];
	console.log(jsonData);
	
	$(form).find('table#properietesFields').each(function(i, propDiv){
		$(propDiv).find(':input').each(function(i,field){
		        if ( field.type != 'submit') {
		        		jsonProperty[field.name] = field.value;			
		}             
		});
		//console.log(jsonProperty);
		ruleproperties.push(jsonProperty); 
		jsonProperty = {};
		
	})
	
		
	//console.log(ruleproperties);
	jsonData.properties = ruleproperties;
	console.log(jsonData);
	if (selectedMetaData != null){	
		$.ajax({
			type : 'PUT',
			url : apiBaseUrl + 'rule/ruleandproperty/' + rulename +'/metadata/' + selectedMetaData,
			dataType : 'json',
			data : JSON.stringify(jsonData),
			contentType : 'application/json',
			cache : false,
			success : function(data) {
				console.log("Rule Properties updated success. data: " + data);
			},
			error : function(xhr, ajaxOptions, error) {
				alert(xhr.status);
				console.log("Update Rule Properties Error: "+ xhr.responseText);
				
			}
		}).done(function(data) {
			console.log(data);
			
		});
	} else { alert("Can not update Rule, You must First  select a Metadata");}	
    $(form).parent().dialog( "close" );
}


//==========================================================================
//        VIEW RULE and its properties 
//==========================================================================
function showRuleProperties(node) {
	var dlg_width = 400, dlg_height = 50, dlg_offset_x = 300, dlg_margin_top = 300;
	var dialog = $('#dialog');
	
	dialog.dialog({
		width : dlg_width,
		autoOpen : false,
		position : {
			my : "center center",
			at : "center center",
			of : "#gvTabContent"
		},
		buttons : {
			CLose : function() {
				dialog.dialog("close");
			}
		}
	});
	if (!hasMoved && dialog.dialog("instance")) {
		grayOut(true);
		console.log(node);
		var formHeader = "", inputs = "";
        inputs += "<table>";
		$.each(node, function(key, value) {
			if(key != 'properties'){
				inputs += "<tr><td>"+key + "</td><td>"+value+"</td></tr>";
			}
		});
		var Props = node.properties;
		inputs +="<tr><td colspan='2' style='background-color: grey'> Properties:</td></tr>";
		
		Props.forEach(function(prop) {
			$.each(prop, function(key,value){
			    inputs += "<tr><td>"+key+"</td><td>"+value+"</td></tr>";
			});
			inputs +="<tr></tr>";
		});
		
		inputs += "</table></form>";
		// <!-- Allow form submission with keyboard without duplicating the dialog button -->
		var formFooter = "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px;' />";

		dialog.dialog("option", "title", "Rule Details");
		dialog[0].innerHTML = formHeader + inputs + formFooter;
		dialog.dialog("open");
	}

    dialog.find("form").on("submit", function(event) {
    	event.preventDefault();
    });
}




//function showAddRuleDialog() {
//	if (selectedMetaData != null){
//		var dlg_width = 400, dlg_height = 50, dlg_offset_x = 300, dlg_margin_top = 300;
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
//				"Add Rule" : function() {
//					//saveNewRule(dialog.find("form"));
//					saveRuleWithProperties(dialog.find("form"));
//				},
//				Cancel : function() {
//					dialog.dialog("close");
//				}
//			}
//		});
//		
//		if (!hasMoved && dialog.dialog("instance")) {
//			grayOut(true);
//			
//	
//			var formHeader = "<form id='addRuleDialog'>", inputs = "";
//			
//			// Name field
//			inputs += "<div id='ruleName'><label>Name: <input type='text' name='name' required='required' /></label><br />";
//			
//			// Rule Classification Radio Button 
//			inputs += "<label>Classification: ";
//			inputs += "<input type='radio' name='classification' value='parentchild'  checked='checked'/>Parent-Child";
//			inputs += "<input type='radio' name='classification' value='link' />Link";
//			inputs += "</label><br /></div>";
//			
//			
//			
//			inputs += "<div id='propertiesFields'></div><a href='#' onclick='addProperties()'> + Add property</a>"
//			
//	
//			// Hidden fields, ownerId
//			var ownerId = 123;
//			inputs += "<input type='text' name='owner' value='" + ownerId + "' style='visibility:hidden; position:absolute; top:-100px;' />";
//			 
//			// <!-- Allow form submission with keyboard without duplicating the dialog button -->
//			var formFooter = "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px;' />";
//	
//			dialog.dialog("option", "title", "Add Rule");
//			dialog[0].innerHTML = formHeader + inputs + formFooter;
//			dialog.dialog("open");
//		}
//	
//	    dialog.find("form").on("submit", function(event) {
//	    	event.preventDefault();
//	    	//saveNewRule(this);
//	    	saveRuleWithProperties(dialog.find("form"));
//	    });
//	} else {alert("please select a MetaData Repo ");}
//}

//=====================================================================================
//function saveNewRule(form) {
//	var jsonData = {};
//	
//	$(form).find(':input').each(function (i, field) {
//		if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
//			jsonData[field.name] = field.value;
//		}
//	});
//	if (selectedMetaData != null){
//		$.ajax({
//			type : 'POST',
//			url : apiBaseUrl + 'rule/metadata/'+ selectedMetaData,
//			dataType : 'json',
//			data : JSON.stringify(jsonData),
//			contentType : 'application/json',
//			cache : false,
//			success : function(data) {
//				console.log("Rule create success. data: " + data);
//			},
//			error : function(xhr, ajaxOptions, error) {
//				alert(xhr.status);
//				console.log("Save Rule Error: "+ xhr.responseText);
//			}
//		}).done(function(data) {
//			console.log(data);
//			if (!ruleMap[data.name]) {
//				ruleMap[data.name] = data;
//			} 
//			initRuleBar('ruleBar');
//
//		});
//	} else { alert("Can not create a Rule, You must First  select a Metadata");}		
//	
////	$(form).parent().dialog( "close" );
//}






