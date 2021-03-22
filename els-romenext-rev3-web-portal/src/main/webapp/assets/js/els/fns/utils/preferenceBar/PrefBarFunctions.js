/**
 * 
 */
function PrefBarFunctions(){
	
};
//===========================================================================================//
//                           Functions to generate the bar                                   //
//===========================================================================================//
PrefBarFunctions.generateColorOptions = function ( ){
	
	var divColors = document.getElementById("color_selection");
	var inputs = "";
	inputs += "<li ><b>Color:<b></li>";
	for (var i = 0; i < arrayPreColor.length; i++) {
		inputs += "<li class='tdcolor circleColor' style='background:"
			+ arrayPreColor[i] + "' id='color_" + i
			+ "'  onclick='PrefBarFunctions.changeNodeColor(" + i
			+ ")'></li>";
	}
	divColors.innerHTML = inputs;
	
}

PrefBarFunctions.generateSizeOptions = function ( ){
	var divSizes = document.getElementById("size_selection");
	var inputs = "";
	var sizes = [ '20px', '24px', '28px', '32px', '36px', '40px' ];
	inputs += "<li ><b>Size:</b></li>"
	for (var i = 0; i < arrayPreSize.length; i++) {
		var radius = sizes[i].slice(0, -2);
		inputs += "<li class='preftd prefSize  typenode' style='width:" + sizes[i]
			+ "; height:" + sizes[i] + ";' id='size_" + i
			+ "'  onclick='PrefBarFunctions.changeNodeSize(" + i
			+ ")'></li>";

	}
	divSizes.innerHTML = inputs;
}

//===========================================================================================//
//                    END SECTION GENERATE PREF BAR                                          //
//===========================================================================================//



//===========================================================================================//
//                       FUNCTIONS CALLED BY PREF BAR OPTIONS                                //
//===========================================================================================//

PrefBarFunctions.changeNodeSize = function(size) {
	var graph = null; var cytoElement = null;
	if (  guistate_main == 'DESIGN'){
	     graph = tdvCy;	
	
		var listElements = $('[id^="selTypeId_"]');
		if (listElements.length == 1) {
			$('#error_message').empty();
			var Id = listElements[0].id;
			var typeId = Id.slice(10);
			console.log("value of type Id is " + typeId);
			
			if( guistate_main == 'DESIGN'){
				cytoElement = graph.$('#' + typeId);
			}else {
	           cytoElement = graph.filter('node[uuid="'+typeId+'"]'); 
			}
			cytoElement.style('width', arrayPreSize[size]);
			cytoElement.style('height', arrayPreSize[size]);
			
			
			$(".typenode").css("border-color", "#AABFB8");
			$("#size_" + size).css("border-color", "red");
		
			if( guistate_main == 'DESIGN'){
				typeMapViaId[typeId].size = arrayPreSize[size];
			   (new DesignLogicalRenderer()).saveTypePreference(typeId, "size", size);
			}
		} else {
	
			CommonFctsLogical.HandlingErrorMSG("Select A node to change the size", "error");
		}
	}else {
		CommonFctsLogical.HandlingErrorMSG("NOT YET IMPLEMENTED", "warning")
	}

}

PrefBarFunctions.changeNodeColor = function(color) {
	if (  guistate_main == 'DESIGN'){
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
			if (typeMapViaId[typeId].classification != "DCT") {
				document.getElementById(typeId).style.backgroundColor = arrayPreColor[color];
			}
			//change color in active_type
			document.getElementById("selTypeId_" + typeId).style.backgroundColor = arrayPreColor[color];
			// change color in typeMapViaId
			typeMapViaId[typeId].color = arrayPreColor[color];
			$(".circleColor").css("border-color", "#AABFB8");
			$("#color_" + color).css("border-color", "red");
	
			(new DesignLogicalRenderer()).saveTypePreference(typeId, "color", color);
		} else {
			CommonFctsLogical.HandlingErrorMSG("Select A node to change the color", "error")
		}
	}else {
			CommonFctsLogical.HandlingErrorMSG("NOT YET IMPLEMENTED", "warning")
		}
}

PrefBarFunctions.changeLabelPosition = function() {
	if (  guistate_main == 'DESIGN'){
		var listElements = $('[id^="selTypeId_"]');
		if (listElements.length == 1) {
			$('#error_message').empty();
			var Id = listElements[0].id;
			var typeId = Id.slice(10);
			console.log("value of type Id is " + typeId);
	
			var cytoElement = tdvCy.$('#' + typeId);
	
			var element = document.getElementById("label_node_positions");
			var elepos = element.options[element.selectedIndex].value;
			console.log("value read is " + elepos);
	
			// change label position in cytoscape
			if (elepos == 'top' || elepos == 'center' || elepos == 'bottom') {
				cytoElement.style('text-valign', elepos);
			} else {
				console.log("Position not supported by Cytoscape");
			}
	
			// change label position in typeMapViaId
			typeMapViaId[typeId].labelPosition = elepos;
	
			(new DesignLogicalRenderer()).saveTypePreference(typeId, "labelPosition", elepos);
		} else {
			CommonFctsLogical.HandlingErrorMSG("Select A node to change the label position", "error")
		}
	}else {
		CommonFctsLogical.HandlingErrorMSG("NOT YET IMPLEMENTED", "warning")
	}

}

PrefBarFunctions.changeLabelSize = function() {
	if (  guistate_main == 'DESIGN'){
		var listElements = $('[id^="selTypeId_"]');
		if (listElements.length == 1) {
			$('#error_message').empty();
			var Id = listElements[0].id;
			var typeId = Id.slice(10);
			console.log("value of type Id is " + typeId);
	
			var cytoElement = tdvCy.$('#' + typeId);
	
			var element = document.getElementById("label_node_size");
			var elesize = element.options[element.selectedIndex].value;
			console.log("value read is " + elesize);
	
			// change label size in cytoscape
			if (elesize == '11px' || elesize == '12px' || elesize == '14px' || elesize == '16px' || elesize == '18px') {
				cytoElement.style('font-size', elesize);
			} else {
				console.log("Size not supported by Cytoscape");
			}
			typeMapViaId[typeId].labelSize = elesize;
	
			(new DesignLogicalRenderer()).saveTypePreference(typeId, "labelSize", elesize);
		} else {
			CommonFctsLogical.HandlingErrorMSG("Select A node to change the label size", "error")
		}
	}else {
		CommonFctsLogical.HandlingErrorMSG("NOT YET IMPLEMENTED", "warning")
	}

}

PrefBarFunctions.toggleNodeName = function() {
	var graph = null;
	if( guistate_main == 'DESIGN' ){  	graph = tdvCy	}else if ( guistate_main == 'DISPLAY' ){		graph = irvCy	}
	else {
		console.log ("No graph to toggle Node name ");
		return;
	}
	
	if ( graph ) {
		var element = document.getElementById("node_captions");
		var state = element.getAttribute("data-state");

		if (state == "hide") {
			// show text on node
			changeElementName(graph, "node", 'data(label)');			
			PrefBarFunctions.changeBtnState ( "node_captions", "btn btn-primary btn-xs", "ON", "show" );			
		} else if (state == "show") {
			graph.style().selector('node[classification != "link"]').style('content', "").update();	
			PrefBarFunctions.changeBtnState ( "node_captions", "btn btn-default btn-xs", "OFF", "hide" );

		} else {
			console.log("Inknown state");
		}
	} else {
		PrefBarFunctions.changeBtnState ( "node_captions", "btn btn-default btn-xs", "OFF", "hide" );		
	}
}

PrefBarFunctions.toggleRelationshipsOnOff = function() {
	
	var graph = PrefBarFunctions.getGraph();
	if( graph !=null) {
		var pcs;
		var element = document.getElementById("connections");
		var state = element.getAttribute("data-state");
		if (state == "hide") {
			PrefBarFunctions.changeBtnState ( "connections", "btn btn-primary btn-xs", "ON", "show" );				
			pcs = graph.edges().filter("[classification = 'parentchild']");
			for (var j = 0; j < pcs.length; j++) {
				pcs[j].style("display", "element");
			}

		} else if (state == "show") {
			PrefBarFunctions.changeBtnState ( "connections", "btn btn-default btn-xs", "OFF", "hide" );
			pcs = graph.edges().filter("[classification = 'parentchild']");
			for (var j = 0; j < pcs.length; j++) {
				pcs[j].style("display", "none");
			}
		}
	}

}

PrefBarFunctions.toggleEdgeName = function() {
	
	var graph = PrefBarFunctions.getGraph();
	if( graph !=null) {	
		var element = document.getElementById("edge_captions");
		var state = element.getAttribute("data-state");

		if (state == "hide") {
			// show text on Edges	
			if ( graph == tdvCy && document.getElementById("link_maxRel").getAttribute("data-state") == "show") {
				PrefBarFunctions.turnBtnEdgeOFF('link_maxRel', graph);
			}			
			PrefBarFunctions.changeBtnState ( "edge_captions", "btn btn-primary btn-xs", "ON", "show" );	
			graph.style().selector('edge').style('content', 'data(name)').update();	

		} else if (state == "show") {			
			PrefBarFunctions.changeBtnState ( "edge_captions", "btn btn-default btn-xs", "OFF", "hide" );
			graph.style().selector('edge').style('content', '').update();				

		} else {
			console.log("Inknown state");
		}
	} 
}

PrefBarFunctions.toggleLinkMax = function() {
	
	var graph = PrefBarFunctions.getGraph();
	if( graph !=null) {	
	    var links;
		var element = document.getElementById("link_maxRel");
		var state = element.getAttribute("data-state");
		if (state == "hide") {
			PrefBarFunctions.changeBtnState ( "link_maxRel", "btn btn-primary btn-xs", "ON", "show" );	
			if ( graph == tdvCy &&  document.getElementById("edge_captions").getAttribute("data-state") == "show") {
				PrefBarFunctions.turnBtnEdgeOFF('edge_captions', graph);
			}
			graph.style().selector('edge').style('label', 'data(maxRel)').update();
		} else if (state == "show") {
			PrefBarFunctions.changeBtnState ( "link_maxRel", "btn btn-default btn-xs", "OFF", "hide" );
			graph.style().selector('edge').style('label', '').update();
		}
	}
}

PrefBarFunctions.toggleToolTips = function() {
	
	var graph = PrefBarFunctions.getGraph();
	if( graph !=null) {	
		var element = document.getElementById("tooltips");
		var state = element.getAttribute("data-state");
		if (state == "hide") {
			PrefBarFunctions.changeBtnState ( "tooltips", "btn btn-primary btn-xs", "ON", "show" );	
			$(".tippy-popper").each(function(i, obj) {
				if (obj.querySelector('.tippy-content >div').innerHTML != "") {
					obj.style.display = "block";
				}
			})
		}
		if (state == "show") {
			PrefBarFunctions.changeBtnState ( "tooltips", "btn btn-default btn-xs", "OFF", "hide" );
			$(".tippy-popper").hide();
		}
	}
}
//==============================================================================================//

PrefBarFunctions.turnEdgeNameOn = function( ){
	var graph = PrefBarFunctions.getGraph();
	if( graph !=null) {
          graph.style().selector('edge').style('content', 'data(name)').update();	
	      PrefBarFunctions.changeBtnState( "edge_captions", "btn btn-primary btn-xs", "ON", "show");		
	}
}

PrefBarFunctions.turnEdgeNameOff = function( ){
	var graph = PrefBarFunctions.getGraph();
	if( graph !=null) {
          graph.style().selector('edge').style('content', '').update();	
	      PrefBarFunctions.changeBtnState( "edge_captions", "btn btn-default btn-xs", "OFF", "hide");		
	}
	
	
}

PrefBarFunctions.changeBtnState = function ( btnId, className, OnOff, statevalue ){
	
	document.getElementById(btnId).className = className
	document.getElementById(btnId).innerHTML = OnOff;
	document.getElementById(btnId).setAttribute("data-state", statevalue);
}

PrefBarFunctions.getGraph = function ( ){
	if (  guistate_main == 'DESIGN'){
	     graph = tdvCy;	
	}else if( guistate_main == 'DISPLAY'  ){
		graph = irvCy;
	}else {
		graph = null;
	}
	return graph;
}

PrefBarFunctions.turnBtnEdgeOFF = function(btn, graph) {
	
	graph.style().selector('edge').style('content', '').update();
	PrefBarFunctions.changeBtnState ( btn, "btn btn-default btn-xs", "OFF", "hide" );

}
