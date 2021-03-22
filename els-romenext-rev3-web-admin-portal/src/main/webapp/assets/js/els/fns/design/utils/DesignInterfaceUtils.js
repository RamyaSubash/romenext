function DesignInterfaceUtils() {
	
}

DesignInterfaceUtils.resetInterface = function() {
	
	for (var key in activeDecos_BODY) {
		var decoView = document.getElementById(activeDecos_BODY[key]);
		if (decoView != undefined && decoView != null) {
			decoView.style.display = "none";
			decoView.innerHTML = '';
		}
	}
	
	for (var key in activeDecos_TB) {
		var decoView = document.getElementById(activeDecos_TB[key]);
		if (decoView != undefined && decoView != null) {
			decoView.style.display = "none";
			decoView.innerHTML = '';
		}
	}
	
	for (var key in activeDecos_LN) {
		var decoView = document.getElementById(activeDecos_LN[key]);
		if (decoView != undefined && decoView != null) {
			decoView.style.display = "none";
			decoView.innerHTML = '';
		}
	}
	
//	document.getElementById('path').innerHTML = ""; 
	
	
};

DesignInterfaceUtils.showDivision = function( divName , divId  ) {
	if(!divId){
		console.log("No type id was provided to reset the division");
		return;
	}
	var instDiv = document.getElementById(divName + divId );
	if( instDiv != null ) {
		instDiv.style.display = "block";
		instDiv.style.visibility = "visible";
	} else {
		console.log(" no division to show ");
	}	
}


// Deprecated
DesignInterfaceUtils.generateTypePropertyForm = function( appendTo, generateHtmlFunction, selectedType ) {
	
	(new DesignLogicalRenderer()).showOrHideGridTypes(true);
	document.getElementById('Infotitle').textContent="Type Details";
	var Form, formHeader, formFooter, inputs='', Props;
	
	Form = document.createElement('div');
	
	formHeader = "<table>";
	$.each(selectedObj, function(key, value) {
		if(key == 'name')  {
				inputs += "<tr><th>" + key + "</th>";
				if (value == '') {inputs += "<td>None</td><tr>"; }
				else { inputs += "<td>" + value + "</td><tr>";	
				setCurType(value);                  // should be removed
				}
			} 
		if (key == 'isRoot') {
			inputs += "<tr><th>"+key +":</th>";
			inputs += "<td><input type='radio' name='isRoot' ";
		    if (value == true) { inputs += " value='true'  checked='checked' >true </td></tr>"}
		    else { inputs += " value='false'  checked='checked' >false </td></tr>";     }
		}
	});
	
	Props = selectedObj.properties;	
	if (Props.length == 0) {inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";}
	else {	
		inputs += "<tr><th colspan='7' style='background-color: #CDEEDD'>Properties:</th></tr>";
		Props.forEach(function(property) {
			 inputs += "<tr style='background-color: grey'><th> Name</th><th>Type</th><th>Default</th></tr>";
			 //  added other values
		     inputs += "<tr><td>" + property.name + "</td>";
		     if(property.propertyType == 'STRING'){inputs += "<td>TEXT</td>";}
		     else {inputs +="<td>" + property.propertyType + "</td>";}
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
		     if(property.minValue){inputs += "<td>"+property.minValue+"</td>";}else {inputs +="<td>...</td>";};
		     if(property.maxValue){inputs += "<td>"+property.maxValue+"</td>";}else {inputs +="<td>...</td>";};
			 inputs += "</tr></table></td><tr>";
			 
			 inputs += "<tr><td><hr COLOR='black'></td></tr>";
		});
	} 
	formFooter  = "</table>";
	formFooter += "<input type='button' value='Add Properties' class='btn btn-primary btn-xs'    onclick='AddTypeProperties();'/>";
	formFooter += "<input type='button' value='Update Type'    class='btn btn-primary btn-xs'    onclick='UpdateTypeForm()'/>";
	Form.innerHTML = formHeader + inputs + formFooter;
	(new DesignLogicalRenderer()).emptyAll();
	$('#typeForm').append(Form);	
};
