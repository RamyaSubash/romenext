/**
 * 
 */
function HotelFormUtils() {
	
}
	
	HotelFormUtils.createAppendHTMLEntity = function( elementType, elementId, className, visibility, display, innerHtml, appendToDiv) {
	
		var newElement = document.createElement( elementType );
		newElement.id = elementId;
		newElement.className = className;
		newElement.style.visibility = visibility;
		newElement.style.display = display;
		newElement.innerHTML = innerHtml;
		
		appendToDiv.append(newElement);
	}
	
	//===================================================================================================================================
	HotelFormUtils.addDivsForAHotelDetails = function( instHolderDiv , key ) {	
			/**
			 * THIS IS FOR THE INFO OF THE INSTANCE
			 */
			var checkInstanceDiv = $( "#form_inst_" + key );	
			if( checkInstanceDiv == null || checkInstanceDiv.length == 0 ) {	
				HotelFormUtils.createAppendHTMLEntity('div', 'form_inst_'  + key, 'form_inst', 'hidden', 'none', '',  instHolderDiv);		
				checkInstanceDiv = $( "#form_inst_" + key );
			}	
			/**
			 * THIS IS FOR THE EDITING OF  INSTANCE PROPERTIES
			 */
			var checkInstanceEditDiv = $( "#form_inst_edit_" + key );	
			if( checkInstanceEditDiv == null || checkInstanceEditDiv.length == 0 ) {		
				HotelFormUtils.createAppendHTMLEntity('div', 'form_inst_edit_'  + key, 'form_inst_edit', 'hidden', 'none', '', instHolderDiv);		
				checkInstanceEditDiv = $( "#form_inst_edit_" + key );
			}		
			/**
			 * THIS IS FOR THE CHILDREN OF THE INSTANCE
			 */
			var checkInstanceChildDiv = $( "#form_inst_children_" + key );
			if( checkInstanceChildDiv == null || checkInstanceChildDiv.length == 0 ) {	
				HotelFormUtils.createAppendHTMLEntity('div', 'form_inst_children_'  + key, 'form_inst_children', 'hidden', 'none', '', instHolderDiv);	
				checkInstanceChildDiv = $( "#form_inst_children_" + key );
			}	
			/**
			 * THIS IS FOR THE PARENT OF THE INSTANCE
			 */
			
			var checkInstanceParDiv = $( "#form_inst_parent_" + key );	
			if( checkInstanceParDiv == null || checkInstanceParDiv.length == 0 ) {		
				HotelFormUtils.createAppendHTMLEntity('div', 'form_inst_parent_'  + key, 'form_inst_parent', 'hidden', 'none', '',  instHolderDiv);
				checkInstanceParDiv = $( "#form_inst_parent_" + key );
			}	
			/**
			 * THIS IS FOR THE SIBLING OF THE INSTANCE
			 */	
			var checkInstanceSibDiv = $( "#form_inst_sibling_" + key );	
			if( checkInstanceSibDiv == null || checkInstanceSibDiv.length == 0 ) {		
				HotelFormUtils.createAppendHTMLEntity('div', 'form_inst_sibling_'  + key, 'form_inst_sibling', 'hidden', 'none', '',  instHolderDiv);
				checkInstanceSibDiv = $( "#form_inst_sibling_" + key );
			}
			/**
			 * THIS IS FOR LINKING TO ANOTHER EXISTING INSTANCE
			 */	
			var checkInstanceLinktoDiv = $( "#form_inst_linkto_" + key );	
			if( checkInstanceLinktoDiv == null || checkInstanceLinktoDiv.length == 0 ) {
				// no div found, create it
				HotelFormUtils.createAppendHTMLEntity('div', 'form_inst_linkto_'  + key, 'form_inst_linkto', 'hidden', 'none', '', instHolderDiv);			
				checkInstanceLinktoDiv = $( "#form_inst_linkto_" + key );
			}	
			/**
			 * THIS IS FOR CONNECTING  TO ANOTHER EXISTING INSTANCE
			 */	
			var checkInstanceConnecttoDiv = $( "#form_inst_connectto_" + key );	
			if( checkInstanceConnecttoDiv == null || checkInstanceConnecttoDiv.length == 0 ) {		
				HotelFormUtils.createAppendHTMLEntity('div', 'form_inst_connectto_'  + key, 'form_inst_connectto', 'hidden', 'none', '',  instHolderDiv);
				checkInstanceConnecttoDiv = $( "#form_inst_connectto_" + key );
			}	
			
			/**
			 * THIS IS FOR Displaying SELECTED EDGE 
			 */	
			var checkInstanceConnecttoDiv = $( "#form_inst_edgeDetails_" + key );	
			if( checkInstanceConnecttoDiv == null || checkInstanceConnecttoDiv.length == 0 ) {		
				HotelFormUtils.createAppendHTMLEntity('div', 'form_inst_edgeDetails_'  + key, 'form_inst_edgeDetails', 'hidden', 'none', '',  instHolderDiv);
				checkInstanceConnecttoDiv = $( "#form_inst_edgeDetails_" + key );
			}	
			
			
		}
		
	//=====================================================================================================================================

	HotelFormUtils.setDefault_ChildrenDiv = function ( key   ){
		if(!key){
			console.log(" no Hotel key provided: cannot build the create children table  "); 
			return;
		}
	
		var checkInstanceChildDiv = $( "#form_inst_children_" + key );
		    var text = '';
		    text += "<br/><table id='nodeFormChildTable_" + key + "' border=1><tr><th>Children</th>";
		    text += "<td  class='create_icon' onclick='( new HotelManagerRender() ).addChildNodeForm(\"" + key + "\")'>";
		    text += "<img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td><td id='listTypeChildren_"+key+"'></td></tr></table>";
		checkInstanceChildDiv.append(text);
	
	}
	
	HotelFormUtils.setDefault_ParentDiv = function ( key   ){
		if(!key){
			console.log(" no Hotel key provided: cannot build the create Parent table  "); 
			return;
		}
	
		var checkInstanceParDiv = $( "#form_inst_parent_" + key );
		    var text = '';
		    text += "<br /><table id='nodeFormParTable_" + key + "' border=1><tr><th>Parent</th>";
//	        text += "<td></td></table>";
		    text += "<td  class='create_icon' onclick='( new HotelManagerRender() ).addParNodeForm(\"" + key + "\")'>";
		    text += "<img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td><td id='listTypeParents_"+key+"'></td></tr></table>";
	    checkInstanceParDiv.append(text);
	
	}
		
     HotelFormUtils.setDefault_SiblingDiv = function ( key   ){
		if(!key){
			console.log(" no Hotel key provided: cannot build the create Sibling table  "); 
			return;
		}
	
		var checkInstanceSibDiv = $( "#form_inst_sibling_" + key );
		    var text = '';
		    text += "<br /><table id='nodeFormSibTable_" + key + "' border=1><tr><th>Sibling</th>";
		    text += "<td  class='create_icon' onclick='( new HotelManagerRender() ).addSibNodeForm(\"" + key + "\")'>";
		    text += "<img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td><td id='listTypeSiblings_"+key+"'></td></tr></table><br />";
	    checkInstanceSibDiv.append(text);
	
	}

	HotelFormUtils.setDefault_LinktoDiv = function ( key   ){
		if(!key){
			console.log(" no Hotel key provided: cannot build the Link To table  "); 
			return;
		}
	
		var checkInstanceLinktoDiv = $( "#form_inst_linkto_" + key );
		    var text = '';
		    text += "<br /><table id='nodeFormLinktoTable_" + key + "' border=1></table>";
		    checkInstanceLinktoDiv.append(text);
	
	}
	
	HotelFormUtils.setDefault_ConnectToDiv = function ( key   ){
		if(!key){
			console.log(" no Hotel key provided: cannot build the Connect to table  "); 
			return;
		}
	
		var checkInstanceConnecttoDiv = $( "#form_inst_connectto_" + key );
		    var text = '';
		    text += "<br /><table id='nodeFormConnecttoTable_" + key + "' border=1></table>";
		    checkInstanceConnecttoDiv.append(text);
	
	}

	
	HotelFormUtils.closeEdgeDetails = function( key ){
		
		HotelFormUtils.hideDivision("form_inst_edgeDetails_", key);
		
	}
	
	
	
	HotelFormUtils.updateHotel_cancel = function ( key ){	
			// hide Edit Form		
			HotelFormUtils.hideDivision ("form_inst_edit_", key  );	

			// show View Form
			HotelFormUtils.showDivision ("form_inst_", key  );	
			
		};	
		
	HotelFormUtils.cancelAddChild = function(){
		historyNode = [];		
		if($( ".addChildNodeRow" ).length >  0) {
			console.warn("FOUND  : " + $( ".addChildNodeRow" ).length + " previous rows for Add Child Node! Clearing these");		
			// previous created rows not deleted
			var div = $(".addChildNodeRow");			
			div.remove();
		}	
		
	}

	HotelFormUtils.cancelAddSib = function(){
		historyNode = [];
		if($( ".addSibNodeRow" ).length > 0) {
			console.warn("FOUND  : " + $( ".addChildNodeRow" ).length + " previous rows for Add Sibling Node! Clearing these");
			var div = $(".addSibNodeRow");			
			div.remove();
		}			
		
	}

	HotelFormUtils.cancelAddPar =function(){
		historyNode = [];
		if($( ".addParNodeRow" ).length > 0) {
			console.warn("FOUND  : " + $( ".addChildNodeRow" ).length + " previous rows for Add Parent Node! Clearing these");
			var div = $(".addParNodeRow");			
			div.remove();
		}			
		
	}
		
		
	HotelFormUtils.cancelLinkToInst = function ( instId ){	
		
		( new HotelManagerRender() ).displayLinkTo(instId);	
		
	}

	HotelFormUtils.cancelConnectToInst  = function ( instId ){	
		
		( new HotelManagerRender() ).displayConnectTo(instId);	
		
	}

	//===============================================================================================================================	
	HotelFormUtils.clearAddRow = function(){
			
		HotelFormUtils.cancelAddChild ();
				
		HotelFormUtils.cancelAddPar();
		
		HotelFormUtils.cancelAddSib();
	 }
			
	//===================================================================================================
	HotelFormUtils.showDivision = function ( divName, divId ){
		
		var instDiv = document.getElementById(divName + divId );
		if( instDiv != null ) {
			instDiv.style.display = "block";
			instDiv.style.visibility = "visible";
		} else {
			// nothing to show?
			console.log(" no division to show ");
		}		
	 }
		
	HotelFormUtils.hideDivision = function ( divName, divId ){
		
		var instDiv = document.getElementById(divName + divId );
		if( instDiv != null ) {
			instDiv.style.display = "none";
			instDiv.style.visibility = "hidden";
		} else {
			// nothing to hide?
			console.log(" no division to hide ");
		}		
	 }	
	
	HotelFormUtils.setTotalNBType = function ( typeId ){
		
		var nbSpan = document.getElementById("nb_"+typeId);
		
		var nb     = typeMapViaId[typeId].nb;
		
		nbSpan.innerHTML = nb;	
	}
//===================================================================================================================================================

//	     DISPLAYING ERROR MESSAGE  
		
	HotelFormUtils.errorDisplay = function  (errorMessage ){
			if(errorMessage) {
				$('#console-log').append(errorMessage);
				console.log('%c'+errorMessage, 'background: #F90; color: red');
			}
	}
