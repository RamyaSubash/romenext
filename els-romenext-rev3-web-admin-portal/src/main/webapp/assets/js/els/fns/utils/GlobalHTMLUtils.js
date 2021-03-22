/**
 * 
 */
function GlobalHTMLUtils() {
	
};
GlobalHTMLUtils.createHTMLEntity = function( elementType, elementId, className, visibility, display, innerHtml ) {
	
	var newElement = document.createElement( elementType );
	newElement.id = elementId;
	newElement.className = className;
	newElement.style.visibility = visibility;
	newElement.style.display = display;
	newElement.innerHTML = innerHtml;
		
	return newElement;
}

GlobalHTMLUtils.createHTMLInputEntity = function( elementType, elementId, type, name, value, visibility ) {
	
	var newElement       = document.createElement( elementType );
	newElement.id        = elementId;
	newElement.type      = type;
	newElement.name      = name;
	newElement.value     = value;
	newElement.style.visibility = visibility;
		
	return newElement;
} 

GlobalHTMLUtils.createAppendHTMLEntity = function( elementType, elementId, className, visibility, display, innerHtml, appendToDiv) {
	
	var newElement = document.createElement( elementType );
	newElement.id = elementId;
	newElement.className = className;
	newElement.style.visibility = visibility;
	newElement.style.display = display;
	newElement.innerHTML = innerHtml;
	
	appendToDiv.append(newElement);
	
} 

//GlobalHTMLUtils.createTypeEntity = function (  type, bodyToAppendTo){
//	
//	GlobalHTMLUtils.createAppendHTMLEntity('div', 'divType_'+type , 'container addRelatedNodes ', 'visible', 'block', '', bodyToAppendTo);
//	
//	var divCheck = $('#divType_'+type )
//	if (document.getElementById('divTypeProperty_'+type) == undefined || document.getElementById('divTypeProperty_'+type) == null) {			
//		GlobalHTMLUtils.createAppendHTMLEntity('div', 'divTypeProperty_'+type , 'divTypeProperty', 'visible', 'block', '', divCheck);
//		var subDivProperty = $( "#divTypeProperty_"+type);
//	}    
//    
//    if (document.getElementById('divTypeRelatedNodes_'+type) == undefined || document.getElementById('divTypeRelatedNodes_'+type) == null) {			
//		GlobalHTMLUtils.createAppendHTMLEntity('div', 'divTypeRelatedNodes_'+type , '', 'visible', 'block', '', divCheck);
//		var subDivRelated = $( "#divTypeRelatedNodes_"+type);
//	}  
//}
// modified using card
GlobalHTMLUtils.createTypeEntity = function (  type, bodyToAppendTo){
	
	GlobalHTMLUtils.createAppendHTMLEntity('div', 'divType_'+type , 'card', 'visible', '', '', bodyToAppendTo);	
	var divCheck = $('#divType_'+type );

	var header = '<br/><span style="border:4px solid '+typeMapViaId[type].color +'">'+typeMapViaId[type].name +' Details:</span>';
	
	GlobalHTMLUtils.createAppendHTMLEntity('div', 'divTypeHeader_'+type , 'card-header', '', '', header, divCheck);
	GlobalHTMLUtils.createAppendHTMLEntity('div', 'divTypeMain_'+type , 'card-main container', '', '', '', divCheck);
	var divMain = $('#divTypeMain_'+type);
	if (document.getElementById('divTypeProperty_'+type) == undefined || document.getElementById('divTypeProperty_'+type) == null) {			
		GlobalHTMLUtils.createAppendHTMLEntity('div', 'divTypeProperty_'+type , 'divTypeProperty', 'visible', '', '', divMain);
		var subDivProperty = $( "#divTypeProperty_"+type);
	}    
    
    if (document.getElementById('divTypeRelatedNodes_'+type) == undefined || document.getElementById('divTypeRelatedNodes_'+type) == null) {			
		GlobalHTMLUtils.createAppendHTMLEntity('div', 'divTypeRelatedNodes_'+type , '', 'visible', '', '', divMain);
		var subDivRelated = $( "#divTypeRelatedNodes_"+type);
	}  
}
GlobalHTMLUtils.createSubTypeEntity = function (  type, bodyToAppendTo, typeOrig, nb, copy){
	
	GlobalHTMLUtils.createAppendHTMLEntity('div', nb+'_divType_'+type , 'container card', 'visible', '', '', bodyToAppendTo);
	
	var divCheck = $('#'+nb+'_divType_'+type );
	    divCheck.attr('data-type','divType_'+type);
	    divCheck.attr('data-copy',copy);
	var header = '<font color="blue">'+typeMapViaId[type].name +' Details:</font>';
	
	GlobalHTMLUtils.createAppendHTMLEntity('div',  nb+'_divTypeHeader_'+type , 'card-header', '', '', header, divCheck);
//	GlobalHTMLUtils.createAppendHTMLEntity('div', 'divTypeMain_'+type , 'card-main container', '', '', '', divCheck);
//	var divMain = $('#divTypeMain_'+type);
	if (document.getElementById(nb+'_divInstances_'+type) == undefined || document.getElementById(nb+'_divInstances_'+type) == null) {			
		GlobalHTMLUtils.createAppendHTMLEntity('div', nb+'_divInstances_'+type , 'divInstances', 'visible', '', '', divCheck);
	
	}    
    divCheck.append('<br />');
  
}

GlobalHTMLUtils.recheckRadioButtons = function () {
	
    for (var i = 0; i < arguments.length; i++) {
    	if (arguments[i]) {
    		if (i == 0) {
    			document.getElementById(arguments[i]).checked = true;
    		} else {
    			document.getElementById(arguments[i]).checked = false;
    		}
    	}
    }
  
};

GlobalHTMLUtils.setDefaultValueForInput = function(inputElement) {
	
	if (inputElement.value == '') {
		inputElement.value = inputElement.defaultValue;
	}
	
};
GlobalHTMLUtils.showBar = function( bar ){
		
	var instDiv = document.getElementById(bar );
	if( instDiv != null ) {
		instDiv.style.display = "block";
		instDiv.style.visibility = "visible";
	} else {
		// nothing to show?
		console.log(" no division to show ");
	}	

//	DesignCytoscapeUtils.reAlignCytoscape();
}

//GlobalHTMLUtils.hideAllBar =  function ( bar, imgsrc){
//	
//	document.getElementById(bar).style.display = "none";
//	document.getElementById(bar).style.visibility = "hidden";
//	document.getElementById(imgsrc).style.display = "none";
//	document.getElementById(imgsrc).style.visibility = "hidden";
//	
//	
//}
GlobalHTMLUtils.buildButtonBar = function ( bar ){
	var inputs = '<button type="button" class="btn btn-primary btn-sm text-center"  data-state="visible" ';
	if( bar == 'typelist'){
		inputs +=  ' id="node_img" onclick="DesignCytoscapeUtils.toggleElement(\'node_img\')">'
			+'<img src="/webguiportal/assets/img/newdesign/node.png"/></button>';	
		document.getElementById("cnode_img").innerHTML = inputs;
	}
	if( bar == 'pathlist'){
		inputs +=  ' id="path_img" data-state="visible" onclick="DesignCytoscapeUtils.toggleElement(\'path_img\')">'+
		'<img src="/webguiportal/assets/img/newdesign/path.png"/></button>';
		document.getElementById("cpath_img").innerHTML  = inputs; 	
	}
	if( bar == 'systemlist'){
		inputs += ' id="system_img" data-state="visible" onclick="DesignCytoscapeUtils.toggleElement(\'system_img\')">'+
		'<img src="/webguiportal/assets/img/newdesign/system.png"/></button>';	
		document.getElementById("csystem_img").innerHTML  = inputs;
	}
	if( bar == 'linklist'){
		inputs +=  ' id="link_img" data-state="visible" onclick="DesignCytoscapeUtils.toggleElement(\'link_img\')"> '+ 
		'<img src="/webguiportal/assets/img/newdesign/link.png"/></button>';
		document.getElementById("clink_img").innerHTML  = 	inputs;
	}	
}


GlobalHTMLUtils.highlightWithRedBorder = function(element){
	element.style.border = "solid red";
};

GlobalHTMLUtils.unhighlight = function(element){
	element.style.border = "";
};

GlobalHTMLUtils.toggleFullScreen = function(elem){
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        
        document.getElementById("full_screen_toggler_element_id").innerHTML = '<span class="glyphicon glyphicon-resize-small bigglyphicon"></span>';
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        
        document.getElementById("full_screen_toggler_element_id").innerHTML = '<span class="glyphicon glyphicon-resize-full bigglyphicon"></span>';
    }
};
