function RenderInterface( implers ) {
	
	var activeImpls = implers;
	
	this.initView = function() {
		implers.initView();
	}
	
	this.generalToolbar = function() {
		implers.generalToolbar();
	}
	
	this.initListeners = function() {
		
	};
	
	
	
}