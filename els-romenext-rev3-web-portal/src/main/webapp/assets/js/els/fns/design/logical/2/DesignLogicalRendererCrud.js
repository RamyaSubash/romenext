function DesignLogicalRendererCrud() {
}
;

DesignLogicalRendererCrud.typeCreate = function(jsonData) {

	if (document.getElementById('tdvCy') != undefined && document.getElementById('tdvCy') != null) {

		console.log("Type create success. data: " + jsonData.name);
		preTdvPos.push({
			x : 0,
			y : 0
		});
		if (!tdvCy) {
			GlobalUtils.loadAllTypeAndConnections();
			var elements = DesignCytoscapeUtils.formatTypesAndConnections();
			tdvCy = DesignCytoscapeUtils.initTypeConnGraph(tdvCy, "tdvCy", elements);
			// this will initiate typeMap  also
			DesignLogicalBarRender.buildInitialLoad(typeMapViaId, "typelist", "typeslist", "totalNodes", "node");
			DesignLogicalBarRender.buildInitialLoad(typeMapViaId, "pathlist", "pathslist", "totalPaths", "path");
			DesignLogicalBarRender.buildInitialLoad(typeMapViaId, "systemlist", "systemslist", "totalSystems", "system");
			(new DesignLogicalRenderer()).initDesignBar(ruleMapViaId, "linklist");

		} else {
			tdvCy.filter('node[name="' + jsonData.name + '"]').data(jsonData);
			var element = CytoNodeUtils.formatNode(typeMapViaId[jsonData.id]);

//			DesignCytoscapeUtils.updateTypeGraph(tdvCy, DesignCytoscapeUtils.formatNewType(typeMapViaId[jsonData.id]));
			DesignCytoscapeUtils.updateTypeGraph(tdvCy, element);

			if (jsonData.classification == 'node') {
				DesignLogicalBarRender.buildInitialLoad(typeMapViaId, "typelist", "typeslist", "totalNodes", "node");
			} else if (jsonData.classification == 'path') {
				DesignLogicalBarRender.buildInitialLoad(typeMapViaId, "pathlist", "pathslist", "totalPaths", "path");
			} else if (jsonData.classification == 'system') {
				DesignLogicalBarRender.buildInitialLoad(typeMapViaId, "systemlist", "systemslist", "totalSystems", "system");
			}

		}

		listTypeIds[0] = jsonData.id;

	}

};


DesignLogicalRendererCrud.firstbar = function(jsonData) {

	if (jsonData.classification == "node") {
		var element = document.getElementById("typelist");
		if (typeof (element) != 'undefined' && element != null) {
			if ($("#totalNodes").length > 0) {

				var ele = document.getElementById("node_img");
				var state = ele.getAttribute("data-state");
				if (state == "hidden") {
					DesignLogicalBarRender.turnONBar("typelist");
					DesignLogicalBarRender.turnONButton("node_img");
					DesignLogicalBarRender.turnONTypes("node");
				}
			}

		}

	}
	//	



}


DesignLogicalRendererCrud.typeRead = function(jsonData) {};

DesignLogicalRendererCrud.typeUpdate = function(jsonData) {};

DesignLogicalRendererCrud.connectionCreate = function(jsonData) {};

DesignLogicalRendererCrud.connectionRead = function(jsonData) {};

DesignLogicalRendererCrud.connectionUpdate = function(jsonData) {};

DesignLogicalRendererCrud.connectionDelete = function(jsonData) {};

DesignLogicalRendererCrud.ruleCreate = function(jsonData) {};

DesignLogicalRendererCrud.ruleRead = function(jsonData) {};

DesignLogicalRendererCrud.ruleUpdate = function(jsonData) {};