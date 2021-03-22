function CytoscapeCoreUtils() {
	
}; 

/**
 * This will return the given appropriate cyto graph
 * If you are in design, it returns irvCy
 * DISPLAY: mrvCy
 * PHYSICAL: 
 * GEO: mrvCy
 * 
 * These all should have been create as global-vars
 * //Cytoscape variables
var tdvCy, // for typeDesignView
	irvCy, // for instRelView
	mrvCy; // for mapView  
 * 
 */
CytoscapeCoreUtils.getCurrentGraph = function() {
	// if you are in design, it returns
	var currentState = getCurrentState();
	
	if( isDesignView() ) {
		return tdvCy;
	} else if( isDisplayView() ) {
		return irvCy;
	}
	
	return tdvCy;
}
 
CytoscapeCoreUtils.clearGraph = function( cytoscapeGraph ) {
	
	if( cytoscapeGraph ) {
		cytoscapeGraph.remove( cytoscapeGraph.elements() );
	}
}

CytoscapeCoreUtils.clearGraphAuto = function() {
	
	var cy = CytoscapeCoreUtils.getCurrentGraph();
	
	if( cy ) {
		cy.remove( cy.elements() );
	}
}






