function CommonFctsLogicalDisplay() {

};

CommonFctsLogicalDisplay.toggleNodeName = function() {
	if (irvCy) {
		var element = document.getElementById("node_captions");
		var state = element.getAttribute("data-state");

		if (state == "hide") {
			// show text on node
			changeElementName(irvCy, "node", 'data(cyDisplay)');
			document.getElementById("node_captions").className = "btn btn-primary btn-sm";
			document.getElementById("node_captions").innerHTML = "ON";
			document.getElementById("node_captions").setAttribute("data-state","show");
		} else if (state == "show") {
					
			irvCy.style().selector('node[classification != "link"]').style('content', "" ).update();
		
			document.getElementById("node_captions").className = "btn btn-default btn-sm active";
			document.getElementById("node_captions").innerHTML = "OFF";
			document.getElementById("node_captions").setAttribute("data-state",	"hide");
		} else {
			console.log("Inknown state");
		}
	} else {
		document.getElementById("node_captions").className = "btn btn-default btn-sm";
		document.getElementById("node_captions").innerHTML = "OFF";
		document.getElementById("node_captions").setAttribute("data-state",	"hide");
	}
};

CommonFctsLogicalDisplay.toggleEdgeName = function() {
	if (irvCy) {
		var element = document.getElementById("edge_captions");
		var state = element.getAttribute("data-state");

		if (state == "hide") {
			// show text on node
			irvCy.style().selector('edge').style('content', 'data(name)' ).update();
			document.getElementById("edge_captions").className = "btn btn-primary btn-sm ";
			document.getElementById("edge_captions").innerHTML = "ON";
			document.getElementById("edge_captions").setAttribute("data-state", "show");
		} else if (state == "show") {
			irvCy.style().selector('edge').style('content', '' ).update();		
			document.getElementById("edge_captions").className = "btn btn-default btn-sm  active";
			document.getElementById("edge_captions").innerHTML = "OFF";
			document.getElementById("edge_captions").setAttribute("data-state", "hide");
		} else {
			console.log("Inknown state");
		}
	} else {
		document.getElementById("edge_captions").className = "btn btn-default btn-sm";
		document.getElementById("edge_captions").innerHTML = "OFF";
		document.getElementById("edge_captions").setAttribute("data-state",	"hide");
	}
};


CommonFctsLogicalDisplay.toggleConnections = function ( ){
	var pcs;
	if (irvCy) {
		var element = document.getElementById("connections");
		var state   = element.getAttribute("data-state");
		if (state == "hide"){
			document.getElementById("connections").className = "btn btn-primary btn-sm";
			document.getElementById("connections").innerHTML = "ON";
			document.getElementById("connections").setAttribute("data-state","show");

			pcs = irvCy.edges().filter("[classification = 'parentchild']");
			for (var j = 0; j < pcs.length; j++) {
				pcs[j].style("display", "element");
			}
			
			
		}else if (state == "show") {
			document.getElementById("connections").className = "btn btn-default btn-sm active";
			document.getElementById("connections").innerHTML = "OFF";
			document.getElementById("connections").setAttribute("data-state","hide");
					
			pcs = irvCy.edges().filter("[classification = 'parentchild']");
			for (var j = 0; j < pcs.length; j++) {
				pcs[j].style("display", "none");
			}
		}
	}
	
};
