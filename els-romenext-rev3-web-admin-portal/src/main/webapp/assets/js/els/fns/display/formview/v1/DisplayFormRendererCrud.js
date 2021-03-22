function DisplayFormRendererCrud() {

	this.initView = function() {
	}
};



DisplayFormRendererCrud.NodeCreate = function( jsonData ) {
	
	$('#console-log').append("<p style='color:blue'>Node successfully Created</p>");
	// add to the type bar
	
};

DisplayFormRendererCrud.NodeRead = function( jsonData ) {
	console.log("Inside the NodeRead ");	
};

DisplayFormRendererCrud.NodeUpdate = function( jsonData ) {	
	console.log("Inside the NodeUpdate ");	
};

DisplayFormRendererCrud.typeParentCreate = function( jsonData ) {
	console.log("Inside the type Parent Create ");	
};


DisplayFormRendererCrud.NodeDelete = function( jsonData ) {
	console.log("Inside the NodeDelete ");
};