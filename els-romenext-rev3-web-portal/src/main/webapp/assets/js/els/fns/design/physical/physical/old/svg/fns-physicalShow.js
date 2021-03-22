function showOrHideModelInfo(isDisplay) {
	if (curModel != null) {
		if (isDisplay) {
			$("#model_info").css({'display':'block'});
		} else {
			$("#model_info").css({'display':'none'});
		}
	}
}



//====================================== NOT USED   ===========================================



//=================== show this when user select ashape to link to a property ==== Not used any more
//function showAddModelPropertyForm() {
//	console.log("display add model property form");
//	var ele = document.getElementById("model_info");
//	console.log(ele);
//	
//	displayDiv(ele);
//	
//	var output = "<p>Add New Model Property</p>";
//	output += "<form >Name:<br><input type='text' name='name'><br>";
////	output += "Property Type:<br><input type='text' name='property_type'><br>";
//	output += "Property Type:<br><select name='property_type'><option value='DOUBLE'>Number</option><option value='STRING'>Text</option></select><br>";
//	output += "Minimum:<br><input type='text' name='minimum'><br>";
//	output += "Maximum:<br><input type='text' name='maximum'><br>";
////	output += "Required:<br><input type='text' name='required'><br>";
////	output += "Unique:<br><input type='text' name='unique'><br>";
////	output += "Parent Child:<br><input type='text' name='parent_child'><br>";
//	output += "Modifier:<br><select name='modifier'><option value='1'>Relative x</option><option value='3'>Relative y</option><option value='5'>Absolute x</option><option value='7'>Absolute y</option></select><br>"
//	output += "<br><input type='button' value='Add Property' onclick='createNewModelProperty(form)'></form>"
//	$('#model_info').empty();
//	$('#model_info').append(output);
//	
//}
//===============================================================================
function initPartForm() {
	var pdsv = document.getElementById("pdsv");
}

//========================================================================================================================================
//function displayDiv(ele) {
//	if (ele.style.display == "none") {
//		ele.style.display = "block";
//	}
//}