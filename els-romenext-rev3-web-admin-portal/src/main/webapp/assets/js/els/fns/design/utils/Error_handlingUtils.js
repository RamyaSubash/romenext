/**
 * 
 */
function Error_handlingUtils() {
	
	
};

	Error_handlingUtils.consolePrint = function( text , type ){
					
		switch(type) {
	    case "success":
	    	console.log('%c '+text, style_success);
	        break;
	    case "error":
	    	console.log('%c '+text, style_error);
	        break;
	        
	    case "warning":
	    	console.log('%c '+text, style_warning);
	        break;
	        
	    case "simple":
	    	console.log('%c '+text, style_simple);
	        break;   
	        
	        
	    default:
	        console,log(text);
    }
}