function DesignLogicalRendererCrud() {

};

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
			tdvCy = DesignCytoscapeUtils.initTypeConnGraph(tdvCy, "tdvCy", 	elements); 
			// this will initiate typeMap  also
			DesignLogicalBarRender.buildLoadBar( typeMapViaId, "typelist", "typeslist", "totalNodes" , "node" );
			DesignLogicalBarRender.buildLoadBar( typeMapViaId, "pathlist", "pathslist", "totalPaths" , "path" );
			DesignLogicalBarRender.buildLoadBar( typeMapViaId, "systemlist", "systemslist", "totalSystems", "system"  );
			(new DesignLogicalRenderer()).initDesignBar( ruleMapViaId, "linklist" );	
				
//			DesignLogicalRendererCrud.firstbar(jsonData);
				
		} else {
			tdvCy.filter('node[name="' + jsonData.name + '"]').data(jsonData);
			jsonData.color = defaultNodeColor;
			jsonData.size = defaultTypeSize;

			DesignCytoscapeUtils.updateTypeGraph(tdvCy, DesignCytoscapeUtils.formatNewType(typeMapViaId[jsonData.id]));
								

			if( jsonData.classification == 'node'){
					DesignLogicalBarRender.buildLoadBar( typeMapViaId, "typelist", "typeslist", "totalNodes" , "node" );
			}else if( jsonData.classification == 'path'){
					DesignLogicalBarRender.buildLoadBar( typeMapViaId, "pathlist", "pathslist", "totalPaths" , "path" );
			}else if( jsonData.classification == 'system'  ){
					DesignLogicalBarRender.buildLoadBar( typeMapViaId, "systemlist", "systemslist", "totalSystems", "system"  );
			}
						
		}
//		listTypeIds.push(jsonData.id);
		
		
		
		listTypeIds[0]=jsonData.id;

	}

};


DesignLogicalRendererCrud.firstbar = function(jsonData) {
	
	if(jsonData.classification == "node" ){
		var element = document.getElementById("typelist");
		if( typeof(element) != 'undefined' && element != null  ){
			if( $("#totalNodes").length > 0 ){
				
				var ele     = document.getElementById("node_img"); 
				var state   = ele.getAttribute("data-state");
				if( state == "hidden"){	
					DesignLogicalBarRender.turnONBar("typelist"); 
					DesignLogicalBarRender.turnONButton ("node_img");    
					DesignLogicalBarRender.turnONTypes("node"); 
				}	
			}
			
		}
		 
	}
//	
	
	
	
}


DesignLogicalRendererCrud.typeRead = function(jsonData) {

};

DesignLogicalRendererCrud.typeUpdate = function(jsonData) {

};

DesignLogicalRendererCrud.connectionCreate = function(jsonData) {

};

DesignLogicalRendererCrud.connectionRead = function(jsonData) {

};

DesignLogicalRendererCrud.connectionUpdate = function(jsonData) {

};

DesignLogicalRendererCrud.connectionDelete = function(jsonData) {

};

DesignLogicalRendererCrud.ruleCreate = function(jsonData) {

};

DesignLogicalRendererCrud.ruleRead = function(jsonData) {

};

DesignLogicalRendererCrud.ruleUpdate = function(jsonData) {

};
