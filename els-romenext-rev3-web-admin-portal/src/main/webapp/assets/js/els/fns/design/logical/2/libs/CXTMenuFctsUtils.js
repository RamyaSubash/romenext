/**
 * 
 */
function CXTMenuFctsUtils () {
	
}

CXTMenuFctsUtils.ViewNodeAsProperties = function ( event, node , pos  ){
	
	DesignCytoscapeUtils.grabElementsSelected();
    DesignCytoscapeUtils.UnselectElements(tdvCy);
    if (  event.cyTarget.isNode() ){
    	
		console.log(node.data("id"));
		console.log(node.data("classification"));
		tdvCy.$('#'+node.data("id")).select();
		if( node.data("classification") === 'link'  ){
			// call display rule link properties
			var id = node.data("id").slice(4);
			console.log(id);
			GlobalUtils.setActiveRule(ruleMapViaId[id]);
			ContextMenuFunctions.displayLinkProperties( node, id , pos , event)	                				                			
		}else {
			
			var id = node.data("id");
			GlobalUtils.setActiveType( typeMapViaId[id]);
			console.log(id);
			CXTMenuFctsUtils.displayNodeProperties( node, id , pos, event)		
		}	                		                		
	}         
    
}


CXTMenuFctsUtils.displayNodeProperties  = function( node, typeId , pos , e){
	
    // build the window to display
	
	var divprop  = document.createElement('div');
        divprop.id = 'typeForm';
        divprop.className = 'block';
        divprop.innertHTML = '';
    
    $("#property_win").empty();
    $("#property_win").append(divprop);

    var d = document.getElementById("property_win");
    d.style.position = 'absolute';
    d.style.left     = pos.x+'px';
    d.style.top      = pos.y+'px';
	document.getElementById("property_win").style.display = 'block';
	document.getElementById("property_win").style.visible = 'visibility';	
	

	// build the properties
	
	var inputs  = CXTMenuFctsUtils.displayTypeProperties( typeMapViaId[typeId], true);
	
	// show
	
	if ( typeMapViaId[typeId].classification != 'DCT'  ){
		  if(document.getElementById(typeId).length>0 ) {document.getElementById(typeId).style.border = "solid red";}
		}
	
	$("#typeForm").empty();
	$("#typeForm").append(inputs);
					
}

CXTMenuFctsUtils.displayTypeProperties = function( type, showTypeInfo, typeDisplayFunction, propertyDisplayFunction) {

	
	var form = document.createElement('div');
	    form.className = 'rTable';
	    form.innerHTML = "";
	    

	var inputs     = "";
	
	var props      = type.typeProperties;
	inputs += "<div class='rTableRow'><div class='rTableHead'>Field Name</div><div class='rTableHead'>Field Type</div></div>";
	
	if ($.isEmptyObject(props)) {
		inputs += "<div class='rTableRow'>"+
                       "<div class='rTableCell rTableCellEmpty'></div>"+
                       "<div class='rTableCell rTableCellEmpty'></div>"+
                      
                  "</div>";
	} else {
		$.each(props, function(key, value) {
			
			inputs += "<div class='rTableRow'>";
			if (value.isMandatory == true) {
				inputs += "<div class='rTableCell' style='color:red'>" + value.name+ "</div>";
			} else {
				inputs += "<div class='rTableCell'>" + value.name + "</div>";
			}
			
			if (value.propertyType == 'STRING') {
				inputs += "<div class='rTableCell'>TEXT</div>";
			} else {
				inputs += "<div class='rTableCell'>" + value.propertyType + "</div>";
			}
			inputs +=  "</div>";
			
			
		});
		inputs += "<div class='rTableRow'>"+
                     "<div class='rTableCell rTableCellEmpty'></div>"+
                     "<div class='rTableCell rTableCellEmpty'></div>"+
                 
                  "</div>";
	}
		
	form.innerHTML =  inputs ;
	return form;

};


CXTMenuFctsUtils.displayTypeProperty = function(property, displayFunction) {
	
	var inputs = "";

	if (displayFunction == null) {
		// generate the properties fields
		console.log("Generate properties fields ");
		if (property == null) {
		} else {
			inputs += "<tr>";
			if (property.isMandatory == true) {
				inputs += "<td style='color:red'>" + property.name+ "</td>";
			} else {
				inputs += "<td>" + property.name + "</td>";
			}

			if (property.propertyType == 'STRING') {
				inputs += "<td>TEXT</td>";
			} else {
				inputs += "<td>" + property.propertyType + "</td>";
			}

//			inputs += "</tr>";

			inputs += "<td><table id='type_prop_detail_" + property.id+ "' style='display:none'>";
//			inputs += "<tr><th>Mandatory</th><th>Unique</th><th>Min</th><th>Max</th>";
			inputs += "<tr>";
			if (property.isMandatory) {
			     inputs += "<td>" + property.isMandatory + "</td>";
			}else {
				inputs += "<td>...</td>";
			}
			if (property.isUnique) {
			     inputs += "<td>" + property.isUnique + "</td>";
			}else {
				inputs += "<td>...</td>";
			}
			
			
//			inputs += "</tr>";

//			inputs += "";
//			inputs += "<tr>";
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
//			inputs += "</tr>";
//
//			inputs += "<tr><th>Default</th></tr>";
//			inputs += "<tr>";
//			if (property.defaultValue) {
//				inputs += "<td style='diaplay:none;'>" + property.defaultValue
//						+ "</td>";
//			} else {
//				inputs += "<td>...</td>";
//			};
			inputs += "</tr></table></td><tr>";
		}
	} else {
		return displayFunction(null, property);
	}
	return inputs;
}



