function DesignLogicalRendererCrud() {

};

DesignLogicalRendererCrud.typeCreate = function(jsonData) {
	
	if (document.getElementById('tdvCy') != undefined && document.getElementById('tdvCy') != null) {
		
		$('#console-log').append("<p style='color:blue'>Type successfully Created</p>");
	    console.log("Type create success. data: "+ jsonData.name);
		preTdvPos.push({x: 0, y: 0});
		if (!tdvCy) {
			var successFunction = function( data ) {
				GlobalUtils.buildTypeAndConnVars(data);
				var elements = DesignCytoscapeUtils.formatTypesAndConnections();
				tdvCy = DesignCytoscapeUtils.initTypeConnGraph(tdvCy, "tdvCy", elements);	// this will initiate typeMap also
				(new DesignLogicalRenderer()).initTypeDesignBar('typeBar');			                                        // Display types Bar	
			};
			
			var failFunction = function( xhr, status, error ) {
				if(status = 400 ) {
					$('#console-log').append("<p style='color:blue'>No Graph Created at this point!.  "+ status+"</p>");
				}
				console.log("Error: " + xhr.responseText);
			};
				
			var apis = new apiRomeNext();	
			apis.getAllTypesAndConnections( successFunction, failFunction );
			DesignCytoscapeUtils.saveInitialPosition(tdvCy);
		} else {
			tdvCy.filter('node[name="' + jsonData.name + '"]').data(jsonData);
			DesignCytoscapeUtils.updateTypeGraph(tdvCy, DesignCytoscapeUtils.formatNewType(typeMapViaId[jsonData.id]));
		    (new DesignLogicalRenderer()).initTypeDesignBar('typeBar');	
		}
				
		// Refresh the Type bay adding new Type
		(new DesignLogicalRenderer()).emptyAll();
		var img = document.getElementById("img_create");
		img.src = "/webgui/assets/img/design_icons/create.png";
		
		(new DesignLogicalRenderer()).showTypePropertiesByTypeId(jsonData.id);
		listTypeIds.push(jsonData.id);
	
	}
	
};

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
