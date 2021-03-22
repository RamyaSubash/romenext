/**
 * 
 */
function DesignPrefFctsUtils() {

}

DesignPrefFctsUtils.changeSize = function(size) {
	var listElements = $('[id^="selTypeId_"]');
	if (listElements.length == 1) {
		$('#error_message').empty();
		var Id = listElements[0].id;
		var typeId = Id.slice(10);
		console.log("value of type Id is " + typeId);

		var cytoElement = tdvCy.$('#' + typeId);
		cytoElement.style('width', arrayPreSize[size]);
		cytoElement.style('height', arrayPreSize[size]);
		typeMapViaId[typeId].color =  arrayPreSize[size];
		$(".typenode").css("border-color", "#AABFB8");
		$("#size_" + size).css("border-color", "red");

		(new DesignLogicalRenderer()).saveTypePreference(typeId, "size", size);
	} else {

		CommonFctsLogical.HandlingErrorMSG("Select A node to change the size","error");
	}

}

DesignPrefFctsUtils.changeColor = function(color) {
	var listElements = $('[id^="selTypeId_"]');
	if (listElements.length == 1) {
		$('#error_message').empty();
		var Id = listElements[0].id;
		var typeId = Id.slice(10);
		console.log("value of type Id is " + typeId);

		var cytoElement = tdvCy.$('#' + typeId);
		// change color in cytoscape
		cytoElement.style('background-color', arrayPreColor[color]);
		// change color in bar
		if( typeMapViaId[typeId].classification !="DCT") {
			document.getElementById(typeId).style.backgroundColor = arrayPreColor[color];
			}
		//change color in active_type
		document.getElementById("selTypeId_" + typeId).style.backgroundColor = arrayPreColor[color];
		// change color in typeMapViaId
		typeMapViaId[typeId].color =  arrayPreColor[color];
		$(".circleColor").css("border-color", "#AABFB8");
		$("#color_" + color).css("border-color", "red");

		(new DesignLogicalRenderer()).saveTypePreference(typeId, "color", color);
	} else {
		CommonFctsLogical.HandlingErrorMSG("Select A node to change the color",	"error")
	}
}



//DesignPrefFctsUtils.linkBarSelection = function( list ){
//    // before changing bar verify if bar is active or not
//	// need to know from where we reach here type/rule?
//	
//	var ele     = document.getElementById("link_img");
//	var state = ele.getAttribute("data-state");
//	(new DesignLogicalRenderer()).initDesignBar(list, 'linklist');
//	if ( state == 'hidden') {		
//		DesignPrefFctsUtils.hideNodeBar('linklist', 'link_img', 'Links');
//	}			
//}




DesignPrefFctsUtils.hideNodeBar = function( bar, img, text ){
	document.getElementById(bar).style.display = "none";
	document.getElementById(img).className = "btn btn-default btn-xs text-center";
	document.getElementById(img).innerHTML = text;
}





