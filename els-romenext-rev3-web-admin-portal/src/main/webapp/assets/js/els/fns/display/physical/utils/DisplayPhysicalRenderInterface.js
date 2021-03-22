function DisplayPhysicalRenderInterface( implers ) {
	
	var activeImpls = implers;
	
	this.initView = function() {
		implers.initView();
	}
	
	this.activeToolBar = function() {
		implers.activeToolBar();
	}
	
	this.initListeners = function() {
		
	};
		
};