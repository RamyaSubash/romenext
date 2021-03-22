function changeElementName(cy, eleType, eleName) {
	
	cy.style()
	 .selector(eleType)
	     .style('content', eleName)
	 .update() // update the elements in the graph with the new style
	;

}