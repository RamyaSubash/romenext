function DesignLogicalBarRender() {
	
}
// Build the bar 

	DesignLogicalBarRender.buildLoadBar = function(list, bar, divName, totalText, type) {
	       // divName could be   = typesList , pathsList, systemsList, ListElements
	    // bar     could be   = typelist  , pathlist,  systemlist,  linklist
	       // list is the list of items
	       // need an ID for totalElements : totalNodes, totalPaths, totalSystems, totalLinks
	       
	//       console.log("Build the bar contents based from a list");
	       var nb;
	       nb = Object.keys(list).length;
	       
	       if( nb == 0  && type != 'node'){
	    	   // no elements at all in the list   typeMapViaId is empty 
	    	   // hide all bars leave only nodes
	    	   document.getElementById(type+"tr").style.display = 'none';
	    	   document.getElementById(type+"tr").style.visibility = 'hidden';
	    	  
	    	   return;
	       }else  if ( nb == 0  && type == 'node'  ){
	    	   DesignLogicalBarRender.turnOffButton("node_img" );
	    	   return;
	       }
	       
	       
	       var  nbNodes = tdvCy.elements('node[classification="'+type+'"]').length;
	       console.log("There are  "+nbNodes+"  of type "+ type);
	       
	       if( nbNodes == 0 && type != 'node'){
	    	   document.getElementById(type+"tr").style.display = 'none';
	    	   document.getElementById(type+"tr").style.visibility = 'hidden';
	    	   return;
	       }else if (nbNodes == 0 && type == 'node'){
	    	   // what to do if no nodes created yet
	    	   DesignLogicalBarRender.turnOffButton("node_img" );
	    	   return;  
	       }
	       
	       // Here it means we have elements of type   nbNodes > 0 
	       
    	   var tdwidth = document.getElementById("td_"+bar).offsetWidth;
    	   console.log("bar offsetwidth is "+tdwidth);
    	   var ncount = 0;
           var nbrow =1;
           var text = 'toggle_visibility("'+type+'_suite")';
           var inputs = '', nbNodesFound = 0;
        
           inputs = "<div id='"+divName+"'>";
           inputs += "<span class='badge' id='"+totalText+"'>*(" + nbNodes + ")</span>";
           ncount++;
           $.each( list, function(key, value) {
                   var color = GlobalUtils.getNodeColor(value);
                   if (value.classification == type) {
                           inputs += "<span class='badge' style='color:black; background:"+ color + ";' id='"+ value.id
                                           + "' title='Select to view in Graph' onclick=\"(new DesignLogicalRenderer()).typeSelect('"+ value.id+ "')\"  >"
                                           + value.name+ "</span>";
                         
                           ncount++;
                           if (ncount == 25) {
                        	   inputs += "<a onclick='"+text+"' id='a_"+type+"_suite' ><i class='fa fa-toggle-right' style='margin-left: 4px;font-size:24px;color:blue'  ></i></a> <div id='"+type+"_suite' style='display:none' >";
       					   }
                           nbNodesFound++;
                   }
           });
           if(ncount>25){  inputs += "</div>";  }
           inputs += "</div>";
	        
	       document.getElementById(bar).innerHTML = inputs;
	       DesignLogicalBarRender.turnONButton(type+"_img" );
	       if( type != 'node'){
	    	   document.getElementById(type+"tr").style.display = 'block';
	    	   document.getElementById(type+"tr").style.visibility = 'visible';
	       }
	      
  
	}

DesignLogicalBarRender.toggleElement = function(iconId, type) {
	if(tdvCy  ){
		var ele = document.getElementById(iconId);
		var state = ele.getAttribute("data-state");
		if (state == 'visible') {
			switch (iconId) {
			case "node_img":			   
							DesignLogicalBarRender.turnElementBarOFF ( iconId, type,   "typelist"  );
							break;
				
			case "path_img":
							DesignLogicalBarRender.turnElementBarOFF ( iconId, type,   "pathlist"  );				
							break;
				
			case "system_img":
						    DesignLogicalBarRender.turnElementBarOFF ( iconId, type,   "systemlist"  );
							break;
				
			case "link_img":			    
						    DesignLogicalBarRender.turnElementBarOFF ( iconId, type,   "linklist"  );
						    var links = [];
							links = tdvCy.edges().filter("[classification = 'link']");
							for (var j = 0; j < links.length; j++) {
								links[j].style("display", "none");
							}
							break;
			default:
				console.log("action not defined yet");
			}

		} else {
			switch (iconId) {
				case "node_img":
							DesignLogicalBarRender.turnElementBarON ( iconId, type,   "typelist" , ele  );
							break;
					
				case "path_img":
					       DesignLogicalBarRender.turnElementBarON ( iconId, type,   "pathlist", ele   );
						   break;
				case "system_img":					
					       DesignLogicalBarRender.turnElementBarON ( iconId, type,   "systemlist", ele   )
					       break;
				case "link_img":					
					       DesignLogicalBarRender.turnElementBarON ( iconId, type,   "linklist", ele  );
					       var links = [];
						   links = tdvCy.edges().filter("[classification = 'link']");
						   for (var j = 0; j < links.length; j++) {
								links[j].style("display", "element");
							}
							break;
				default:
					console.log("action not defined yet");
			}
		}
	}
};

DesignLogicalBarRender.turnElementBarOFF = function ( iconId, type,   bar  ){
	
	var elements = [];
	document.getElementById(bar).style.display = "none";			
    DesignLogicalBarRender.turnOffButton(iconId);
    
    var classif = "[classification = '"+type+"']";     
	elements = tdvCy.nodes().filter(classif);
	for (var i = 0; i < elements.length; i++) {
		elements[i].style("display", "none" );
	}
}

DesignLogicalBarRender.turnElementBarON = function ( iconId, type,   bar, ele  ){
	var elements = [];
	var classif = "[classification = '"+type+"']";
	elements = tdvCy.nodes().filter(classif);
	
	if( elements.length > 0 ){
	       document.getElementById(bar).style.display = "block";
	       DesignLogicalBarRender.turnONButton(iconId);
		   for (var i = 0; i < elements.length; i++) {
				elements[i].style("display", "element" );
			}
	}
}



DesignLogicalBarRender.turnOffButton = function ( img , text){
	var ele     = document.getElementById(img);
	ele.className = "btn btn-default btn-default btn-block";
	ele.setAttribute("data-state", "hidden");		
}


DesignLogicalBarRender.turnOffTypes = function ( classification ){
	if(tdvCy){	
		var elements = tdvCy.nodes().filter("[classification = '"+classification+"']");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style("display", "none");
		}
	}
	
}

DesignLogicalBarRender.turnONBar = function ( bar ){
	document.getElementById(bar).style.display = "block";	
}

DesignLogicalBarRender.turnONButton = function (img  ){
	var ele     = document.getElementById(img);
	ele.className = "btn btn-primary btn-primary btn-block";
	ele.setAttribute("data-state", "visible");	
}

DesignLogicalBarRender.turnONTypes = function ( classification ){
	if(tdvCy){	
		var elements = tdvCy.nodes().filter("[classification = '"+classification+"']");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style("display", "element");
		}
	}
	
}

DesignLogicalBarRender.buildBar = function ( list, bar, divName, totalText, type  ){
	
//	console.log("Build the bar contents based from a list");
	var nb;
	nb = Object.keys(list).length;
	var divStart="", inputs = "", divEnd="", nbNodes = 0;
	 var ncount = 0;
     var nbrow =1;
     var text = 'toggle_visibility("'+type+'_suite")';
	
	if (nb != 0) {
		inputs = "<div id='"+divName+"'>";
		inputs += "<span class='badge' id='"+totalText+"'>*(" + nb	+ ")</span>";
		
		$.each( list, function(key, value) {
			var color = GlobalUtils.getNodeColor(value);
			if (value.classification == type) {
				inputs += "<span class='badge' style='color:black; background:"+ color + ";' id='"+ value.id
						+ "' title='Select to view in Graph' onclick=\"(new DesignLogicalRenderer()).typeSelect('"+ value.id+ "')\"  >"
						+ value.name+ "</span>";
			ncount++;	
			if (ncount == 25) {
          	   inputs += "<a onclick='"+text+"' id='a_"+type+"_suite' ><i class='fa fa-toggle-right' style='margin-left: 4px;font-size:24px;color:blue'  ></i></a> <div id='"+type+"_suite' style='display:none' >";
		    }else {
			   if( ncount % 25  == 0 && ncount != 0){
				   inputs += "<br/>";
			   }
		    }
			nbNodes++;
			}
		});
		if(ncount>20){  inputs += "</div>";  }
        inputs += "</div>";
		
	} else {
		inputs = "";
	}
	if(nbNodes > 0) {
		document.getElementById(bar).innerHTML = inputs;
		$("#"+totalText).empty();
		$("#"+totalText).append("(" + nbNodes + ")");
	
	}else { 
		document.getElementById(bar).innerHTML = '' ;  
		}
	return nbNodes;
	
}

DesignLogicalBarRender.buildRuleBar = function ( list, bar, divName, totalText, type  ){
	
	var inputs = '', nbElements = 0;	
	var nb = Object.keys(list).length;
	var ncount = 0;
    var nbrow =1;
    var text = 'toggle_visibility("link_suite")';
	if (nb != 0) {
		inputs = "<div id='"+divName+"'>";
		inputs += "<span class='badge' id='"+totalText+"'>*(" + nb	+ ")</span>";
		$.each( list, function(key, value) {
			if (value.classification == "link") {
				inputs += "<span class='label label-default'  id='rule_"+ value.id
						+ "' title='Select to view in Graph' onclick=\"(new DesignLogicalRenderer()).ruleSelect('"+ value.id + "')\"  >" + value.name+ "</span>";
				nbElements++;
				ncount++;
				if (ncount == 24) {
              	   inputs += "<a onclick='"+text+"' id='a_link_suite' ><i class='fa fa-toggle-right' style='margin-left: 4px;font-size:24px;color:blue'  ></i></a> <div id='link_suite' style='display:none' >";
				}else {
					   if( ncount % 24  == 0 && ncount != 0){
						   inputs += "<br/>";
					   }
				}
			}
		});
		if(ncount>24){  
			inputs += "</div>";  
		}
        inputs += "</div>";
	} else {
		inputs = "";
	}
	if(nbElements > 0){		
		document.getElementById(bar).innerHTML = inputs;
		$("#"+totalText).empty();
		$("#"+totalText).append("(" + nbElements + ")");
	}else {
		document.getElementById(bar).innerHTML = "";
	}
	
	return nbElements;
	
}

DesignLogicalBarRender.updateTypeBar = function ( jsonData ){
	// before calling function test is done to verify that the bar is not empty
	// This function is used to update the corresponding bar  with the newly created node if the bar has some content
	var input = "";
	
	input += "<span class='badge' style='color:black; background:"+ jsonData.color + ";' id='"+ jsonData.id
		+ "' title='Select to view in Graph' onclick=\"(new DesignLogicalRenderer()).typeSelect('"+ jsonData.id+ "')\"  >"
		+ jsonData.name+ "</span>";
	
	var nbElements, value , divName, totalText;
	if( jsonData.classification == 'node'){
		nbElements = document.getElementById("totalNodes");
		divName = "typeslist";
		totalText = "totalNodes";
	}else if( jsonData.classification == 'path'  ){
		nbElements = document.getElementById("totalPaths");
		divName = "pathslist";
		totalText = "totalPaths";
	}else if( jsonData.classification == 'system'  ){
		nbElements = document.getElementById("totalSystems");
		divName = "systemslist";
		totalText = "totalSystems";
	}
	
	value = nbElements.innerHTML.split('(').pop().split(')').shift();
	var total = Number(value)+ 1;
	$("#"+totalText).empty();
	$("#"+totalText).append("(" + total + ")")
	$("#"+divName).append(input);
	
}

DesignLogicalBarRender.unselect = function(event ){
	$(".circleColor").css("border-color", "black");
	$(".typenode").css("border-color", "black");
	$('#error_message').empty();
	$("#active_type").empty();
	$(".qtip").remove();
	
	var divObj = $("#create_type");
	if ($("#create_type").hasClass( 'ui-dialog-content')) {
		$("#create_type").dialog('close');
	}
	
	DesignSavingFcts.clearSelection();
	
	selectedElement = null;
	list = [];
	
	ruleSelected = false;
	originType = null;
	destType = null;
	creatingConnection = false;
	mouseEventTime = new Date().getTime();
	pleaseWait = true;
	shiftkeySelected = false;
	createRuleClassification = null;
	// reset the cursor
	GlobalUtils.cursor_clear();
    tdvCy.nodes().selectify();	
	tdvCy.nodes().removeClass('semitransp');
	
	// cancel assign link to type 
	$("#bottom_help").empty();
	document.getElementById("bottom_help").style.display    = 'none';
	document.getElementById("bottom_help").style.visibility = 'hidden';
	typelinkCreate = false;
	typelinkType   = '';
	// remove any attached text to mouse
	$("#besideMouse").html("");
	$("#besideMouseCreate").html("");
	ConnectionPropertyUtils.mouseText(event);
	ConnectionPropertyUtils.mouseTextCreate(event);
	
	// reset the buttons for create PC and Assign type
	document.getElementById("create_PC").className = "btn btn-primary text-center";
	document.getElementById("assign_link").className = "btn btn-primary text-center"; 
	 
	currentColor = defaultNodeColor;
	currentSize = defaultTypeSize;
	currentIdxColor = 0;
	currentIdxSize = 0;
	
	listTypeIds = [];
	listConnIds = [];
	// hide create division
	document.getElementById("property_win").style.display = 'none';
	document.getElementById("property_win").style.visible = 'hidden';	
	
	DesignLogicalBarRender.buildLoadBar( typeMapViaId, "typelist", "typeslist", "totalNodes" , "node" );
	DesignLogicalBarRender.buildLoadBar( typeMapViaId, "pathlist", "pathslist", "totalPaths" , "path" );
	DesignLogicalBarRender.buildLoadBar( typeMapViaId, "systemlist", "systemslist", "totalSystems", "system"  );
	
	
	
	
	
//	DesignLogicalBarRender.barUnSelection( typeMapViaId, "typelist", "typeslist", "totalNodes" , "node" );
//	DesignLogicalBarRender.barUnSelection( typeMapViaId, "pathlist", "pathslist", "totalPaths" , "path" );
//	DesignLogicalBarRender.barUnSelection( typeMapViaId, "systemlist", "systemslist", "totalSystems", "system"  );	
	DesignLogicalBarRender.barRuleUnSelection( ruleMapViaId, "linklist", "linkslist", "totalLinks" , "link" );
		
}
                                                
DesignLogicalBarRender.barSelection = function ( list, bar, divName, totalText, type  ){
	var nbNodes = DesignLogicalBarRender.buildBar( list, bar, divName, totalText, type  );
		if( nbNodes == 0){		
			var ele     = document.getElementById(type+"_img"); 
			var state   = ele.getAttribute("data-state");
			if( state == "visible"){	
				document.getElementById(bar).style.display = "none";	
				DesignLogicalBarRender.turnOffButton (type+"_img");    
				DesignLogicalBarRender.turnOffTypes(type);  
			}	
		}
}

DesignLogicalBarRender.barUnSelection = function ( list, bar, divName, totalText, type  ){
	var nbNodes = DesignLogicalBarRender.buildBar( list, bar, divName, totalText, type  );
	var ele     = document.getElementById(type+"_img"); 
	var state   = ele.getAttribute("data-state");
		if( nbNodes == 0){		
			
			if( state == "visible"){
				document.getElementById(bar).style.display = "none";	
				DesignLogicalBarRender.turnOffButton (type+"_img");    
				DesignLogicalBarRender.turnOffTypes(type);  
			}	
		}else if (nbNodes > 0){
			if(state == 'hidden'){
				
				DesignLogicalBarRender.turnONBar(bar); 
				DesignLogicalBarRender.turnONButton (type+"_img");    
				DesignLogicalBarRender.turnONTypes(type);  
			}
			
		}
}

DesignLogicalBarRender.barRuleUnSelection = function ( list, bar, divName, totalText, type  ){
	var nbNodes = DesignLogicalBarRender.buildRuleBar( list, bar, divName, totalText, type  );
	var ele     = document.getElementById(type+"_img"); 
	var state   = ele.getAttribute("data-state");
		if( nbNodes == 0){			
			if( state == "visible"){
				document.getElementById(bar).style.display = "none";	
//				DesignLogicalBarRender.turnOffBar(bar); 
				DesignLogicalBarRender.turnOffButton (type+"_img");    
				DesignLogicalBarRender.turnOffTypes(type);  
			}	
		}else if (nbNodes > 0){
			if(state == 'hidden'){
				DesignLogicalBarRender.turnONBar(bar); 
				DesignLogicalBarRender.turnONButton (type+"_img");    
				DesignLogicalBarRender.turnONTypes(type);  
			}
		}
}

DesignLogicalBarRender.barStatus = function( ){
	
	if( $.isEmptyObject(barStatus)){
		// just loading page
		var ele     = document.getElementById('node_img');
		var state   = ele.getAttribute("data-state");
		barStatus["node"]= {curentState : state}
		ele     = document.getElementById('path_img');
		state   = ele.getAttribute("data-state");
		barStatus["path"]= {curentState : state}
		ele     = document.getElementById('system_img');
		state   = ele.getAttribute("data-state");
		barStatus["system"]= {curentState : state}
		ele     = document.getElementById('link_img');
		state   = ele.getAttribute("data-state");
		barStatus["link"]= {curentState : state}
		
	}
	
}


//Display/Hide the bar
DesignLogicalBarRender.displayHideBar = function( img, bar, nbElements , text, ucase , type ){
		
	var ele     = document.getElementById(img);
	var state   = ele.getAttribute("data-state");
	// actual state in the bar is hidden 
	if( state == 'hidden' ) {
		if ( nbElements > 0 ){
			//show the bar 
			document.getElementById(bar).style.display = "block";
			// change the button
			document.getElementById(img).className = "btn btn-primary  text-center";
			document.getElementById(img).innerHTML = "<img src='/webguiportal/assets/img/newdesign/"+text+".png'/>"+text;
			document.getElementById(img).setAttribute("data-state", "visible");
			// show the lements in cytoscape
			elements = tdvCy.nodes().filter("[classification = '"+type+"']");
			for (var i = 0; i < elements.length; i++) {
				elements[i].style("display", "element");
			}
			
		}else {
			// state hidden and there are no elements to show
			
		}
	}else {
		// state is visible
		if(  nbElements == 0 ){
			// hide the bar 
			document.getElementById(bar).style.display = "none";
			// change the button 
			document.getElementById(img).className = "btn btn-default text-center";
			document.getElementById(img).innerHTML = "<i class='fa fa-circle-o' aria-hidden='true'></i>"+text;	
		}
	}
}

DesignLogicalBarRender.adjustBar = function(barElementId, type) {
	
	var typeBar = document.getElementById(barElementId);
	
	var maxLength = typeBar.parentElement.parentElement.offsetWidth - 20;
	
	var currentLenth = 0;
	var finishedFirstLine = false;
	$("#" + barElementId).children("span").each(function () {
		
		if (finishedFirstLine == false) {
			currentLenth = currentLenth + this.offsetWidth;
			
			if (currentLenth > maxLength) {
				$('<a onclick="toggle_visibility(\''
						+ type +'_suite\');" id="a_' 
						+ type + '_suite"><i class="fa fa-toggle-right"; style="font-size:20px; color:blue"></i></a><div id="' 
						+ type + '_suite" style="display:none"></div>').insertBefore(this);

//				$("<br>").insertBefore(this);
				
				$("#" + type + "_suite").append(this);
				
				finishedFirstLine = true;
			}
		} else {
			$("#" + type + "_suite").append(this);
		}
	});
		
};
