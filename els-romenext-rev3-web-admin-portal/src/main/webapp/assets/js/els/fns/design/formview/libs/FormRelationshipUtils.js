function FormRelationshipUtils() {
	
};

FormRelationshipUtils.initAllRelationshipDivs = function( body ) {
	
	// Division for Type and Its properties if any
	
	var iDiv = GlobalHTMLUtils.createHTMLEntity( 'div', 'typeFormPropertyDiv', 'block', 'visible', 'block', '') 
//	var iDiv = document.createElement('div');
//	iDiv.id = 'typeFormPropertyDiv';
//	iDiv.className = 'block';
//	iDiv.innerHTML = "";
	
	body.appendChild( iDiv );
	
	// division for Creating New Parent (type & PC Connection)
	var parentDiv = document.createElement('div');
	parentDiv.id = 'typeFormPropertyParentDiv';
	parentDiv.className = 'block';
	parentDiv.innerHTML = "";
	
	body.appendChild( parentDiv ); 

	// Division for Creating New Child (Type & PC Connection)
	var childDiv = document.createElement('div');
	childDiv.id = 'typeFormPropertyChildDiv';
	childDiv.className = 'block';
	childDiv.innerHTML = "";
	
	body.appendChild( childDiv );	
	
	// division for creating  New Sibling (Type & Link)
	var siblingDiv = document.createElement('div');
	siblingDiv.id = 'typeFormPropertySiblingDiv';
	siblingDiv.className = 'block';
	siblingDiv.innerHTML = "";
	
	body.appendChild( siblingDiv );
	
	
//    Division for Creating Connection/link  for existing Types
	var connectionDiv = document.createElement('div');
	connectionDiv.id = 'typeFormConnectionDiv';
	connectionDiv.className = 'block';
	connectionDiv.innerHTML = "";
	
	body.appendChild( connectionDiv );	
	
	var showConnLinkDiv = document.createElement('div');
	showConnLinkDiv.id = 'typeFormRuleDiv';
	showConnLinkDiv.className = 'block';
	showConnLinkDiv.innerHTML = "";
	
	body.appendChild( showConnLinkDiv );	
	
	
	// Division for Creating New TYpe alone		
	var typeDiv = document.createElement('div');	
	typeDiv.id = 'typeFormCreateDiv';
	typeDiv.className = 'block';
	typeDiv.innerHTML = "";
	
	body.appendChild( typeDiv );	
		
};

FormRelationshipUtils.initRelationshipDivForType = function( typeid ) {
		
	var sibbody       = document.getElementById('typeFormPropertySiblingDiv');	
	var cbody         = document.getElementById('typeFormPropertyChildDiv');
	var pbody         = document.getElementById('typeFormPropertyParentDiv');	
	var connlinkbody  = document.getElementById('typeFormConnectionDiv');	
	var showConn      = document.getElementById('typeFormRuleDiv');	
	var typeDiv       =  document.getElementById('typeFormCreateDiv');
	typeDiv.innerHTML = "";
	
	FormRelationshipUtils.child_defaultDiv( cbody, typeid );
	FormRelationshipUtils.sibling_defaultDiv( sibbody, typeid );
	FormRelationshipUtils.parent_defaultDiv( pbody, typeid );
	FormRelationshipUtils.connect_defaultDiv( connlinkbody, typeid);
	FormRelationshipUtils.show_defaultConnDiv( showConn, typeid);
	
};

FormRelationshipUtils.child_defaultDiv = function( toAppend, typeid ) {
	if( !typeid ){
		console.log("no typeid provided ");
		return;
	}	
	var newChildDiv = document.createElement('div');
	newChildDiv.id = 'typeFormPropertyChildDiv_'  + typeid;
	newChildDiv.className = 'typeFormPropertyChildDiv';
	newChildDiv.style.visibility = "hidden";
	newChildDiv.style.display = "none";
	newChildDiv.innerHTML = "<br/><table id='typeFormPropertyChildTable_" + typeid + "' border=1><tr><th>Children:</th><td class='create_icon' onclick='( new FormRenderer() ).addChildTypeForm(" + typeid + ");'><img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td></tr></table>";
	
	toAppend.appendChild( newChildDiv );
};

FormRelationshipUtils.sibling_defaultDiv = function( toAppend, typeid ) {
	if( !typeid ){
		console.log("no typeid provided ");
		return;
	}
	var newSiblingDiv = document.createElement('div');
	newSiblingDiv.id = 'typeFormPropertySiblingDiv_'  + typeid;
	newSiblingDiv.className = 'typeFormPropertySiblingDiv';
	newSiblingDiv.style.visibility = "hidden";
	newSiblingDiv.style.display = "none";
	newSiblingDiv.innerHTML = "<br/><table id='typeFormPropertySiblingTable_" + typeid + "' border=1><tr><th>Sibling:</th><td class='create_icon' onclick='( new FormRenderer() ).addSiblingTypeForm(" + typeid + ");'><img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td></tr></table>";

	toAppend.appendChild( newSiblingDiv );

};

FormRelationshipUtils.parent_defaultDiv = function( toAppend, typeid ) {
	if( !typeid ){
		console.log("no typeid provided ");
		return;
	}
	var newParentDiv = document.createElement('div');
	newParentDiv.id = 'typeFormPropertyParentDiv_'  + typeid;
	newParentDiv.className = 'typeFormPropertyParentDiv';
	newParentDiv.style.visibility = "hidden";
	newParentDiv.style.display = "none";
	newParentDiv.innerHTML = "<br/><table id='typeFormPropertyParentTable_" + typeid + "' border=1><tr><th>Parent:</th><td class='create_icon' onclick='( new FormRenderer() ).addParentTypeForm(" + typeid + ");'><img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td></tr></table>";

	toAppend.appendChild( newParentDiv );
	
};

FormRelationshipUtils.connect_defaultDiv = function( toAppend, typeid ) {
	if( !typeid ){
		console.log("no typeid provided ");
		return;
	}
	var newConnDiv = document.createElement('div');
	newConnDiv.id = 'typeFormConnectionDiv_'  + typeid;
	newConnDiv.className = 'typeFormConnectionDiv';
	newConnDiv.style.visibility = "hidden";
	newConnDiv.style.display = "none";

	newConnDiv.innerHTML = "<br/><table id='typeFormConnectTable_" + typeid + "' border=1><tr><th colspan='3' align='center'>Creating Relationship</th></tr></table>";

	toAppend.appendChild( newConnDiv );
	
};

FormRelationshipUtils.show_defaultConnDiv = function( toAppend, typeid ) {
	if( !typeid ){
		console.log("no typeid provided ");
		return;
	}
	var showConnDiv = document.createElement('div');
	showConnDiv.id = 'typeFormRuleUpdateDiv_'  + typeid;
	showConnDiv.className = 'typeFormRuleUpdateDiv';
	showConnDiv.style.visibility = "hidden";
	showConnDiv.style.display = "none";
//	showConnDiv.innerHTML = "<br/><table id='typeFormRuleUpdateTable_" + typeid + "' border='2'><tr></tr></table>";

	showConnDiv.innerHTML = "<br/>";
	toAppend.appendChild( showConnDiv );	
};


FormRelationshipUtils.resetCreateTypeDiv = function(){
	var typeDiv =  document.getElementById('typeFormCreateDiv');
	typeDiv.innerHTML = "";
	var img = document.getElementById("img_create");
	img.src = img_path +"design_icons/create.png";	
}

FormRelationshipUtils.resetDivision = function ( which , typeid){
	if(!typeid || !which ){
		console.log("No type id was provided to reset the division");
		return;
	}
	
	var divToResetId ='';
	var divToReset   = '';
	var text =':';
	if( which == 'Parent') { divToResetId = 'typeFormPropertyParentDiv_'}
	else if ( which == 'Child') { divToResetId = 'typeFormPropertyChildDiv_'; text = 'ren :'}
	else if ( which == 'Sibling' )  { divToResetId = 'typeFormPropertySiblingDiv_' };
		
    divToReset	= document.getElementById(divToResetId + typeid);
    if( divToReset != null  || divToReset.length != 0 ){
    	divToReset.innerHTML = '';
    	divToReset.innerHTML = "<br/><table id='typeFormProperty"+which+"Table_" + typeid + "' border=1><tr><th>"+which+text+"</th><td class='create_icon' onclick='( new FormRenderer() ).add"+which+"TypeForm(" + typeid + ");'><img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td></tr></table> ";
    }	
	
}

FormRelationshipUtils.hideDivision = function ( divName, divId ){
	if(!divId){
		console.log("No type id was provided to reset the division");
		return;
	}
	
	var instDiv = document.getElementById(divName + divId );
	if( instDiv != null ) {
		instDiv.style.display = "none";
		instDiv.style.visibility = "hidden";
	} else {
		// nothing to show?
	}	
	
}

FormRelationshipUtils.updateDefaultField = function( typeid, preText ){
	if(!typeid){
		console.log(" no typeId provided ");
		return;
	}
	
	var ele              = document.getElementById(preText+typeid+'_add_property_propertyType');	
	var eleValue         = ele.options[ele.selectedIndex].value;
	if(!eleValue){
		console.log(" error no value selected ");
		return;
	}	
	switch(eleValue) {
	    case "DATE":
	    	document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('type', 'date');
	    	document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('onkeypress', '');
			document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('value', today);
			document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('defaultValue', today);
	        break;
	    case "INTEGER":
	    	document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('type', 'number');
			document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('onkeypress', 'return event.charCode >= 48 && event.charCode <= 57');
			document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('value', '0');
			document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('defaultValue', '0');
	        break;
	    case "DOUBLE":
	    	document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('type', 'number');
			document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('onkeypress', 'return event.charCode >= 48 && event.charCode <= 57');
			document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('value', '0.0');
			document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('defaultValue', '0.0');
	        break;
	    case "CURRENCY":
	    	document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('type', 'number');
			document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('onkeypress', 'return event.charCode >= 48 && event.charCode <= 57');
			document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('value', '0.0');
			document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('defaultValue', '0.0');
	        break;  
	    case "BOOLEAN":
	    	document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('type', 'text');
			document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('onkeypress', '');
	    	document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('value', true);
	    	document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('defaultValue', true);
	    	break;
	    case "STRING":
	    	document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('type', 'text');
	    	document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('onkeypress', '');
	    	document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('value', '');	
	    	document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('defaultValue','');
	    	break;	
	    case "FILE":
	    	document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('type', 'text');
	    	document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('onkeypress', '');
	    	document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('value', '');	
	    	document.getElementById(preText+typeid+'_add_property_defaultValue').setAttribute('defaultValue','');
	    	break;	
	    default:
	    	;	
	}
}

FormRelationshipUtils.tutorialFormDesign = function (  ){
	var body  = document.getElementById('typeFormBody') ;
	var typeFormTutorial = GlobalHTMLUtils.createAppendHTMLEntity('div', 'typeFormTutorial', 'container', 'hidden', 'none', '', body);	
	
	var inputs = '';
//	    inputs += '<div class="row"><div class="col">';
        inputs += '<div id="tutorialLeftmenu"><div id="tutorialLeftmenu_top"></div>';
        inputs += '<div id="tutorialLeftmenu_main"><h3>How to:</h3><ul>'+
                  '<li><a href="#">Main Components</a></li><li><a href="#CreateType">Create a Type</a></li><li><a href="#ViewType">View a Type</a></li><li><a href="#">Add a Property</a></li>'+
                  '<li><a href="#">Add a parent</a></li><li><a href="#">Add a child</a></li><li><a href="#">View a Relationship</a></li><li><a href="#">Modify a Relationship</a></li>'+
                  '<li><a href="#">.......</a></li></ul></div>';
        inputs += '<div id="tutorialLeftmenu_bottom"></div></div>';
//        inputs += '</div><div class="col">';
        inputs += '<div id="tutorialContent"><div id="tutorialContent_top"></div><div id="tutorialContent_main">'+
            	'<h2>RomeNext Form Design Deco </h2><p>&nbsp;</p><p>&nbsp;</p><p>This is a guide for using the Form Design page </p><p>&nbsp;</p><h3>Main Components </h3>'+
    			'<div  title="Form Design Deco"><a target="_blank" href="'+img_path+'design_tutorial/ForDes.png"><img src="'+img_path+'design_tutorial/ForDes.png" alt=""  width="200px" height="200px" /></a></div>'+
            	'<p>The above screen shows the Form Design page including elements. This will be the result of the different actions which can be carried on this page; such as creating a Type, adding or updating properties to the Type; adding parents/children/sibling to this type; linking to existing types.</p>';
        inputs += '<p>&nbsp;</p><h3>Create a Type</h3>'+
                  '<div  id="CreateType"><a target="_blank" href="'+img_path+'design_tutorial/create_type.png"><img src="'+img_path+'design_tutorial/create_type.png" alt=""  width="150px" height="150px" /></a></div>'+ 
                  '<p>The above screen shows the create Type Form. user will enter the information and click the "Add Type" button.  Successful creation will add the Type to the bar and display its info. </p>';
        inputs += '<p>&nbsp;</p><h3>View Type</h3>'+
                  '<div  id="ViewType"><a target="_blank" href="'+img_path+'design_tutorial/ForDes.png"><img src="'+img_path+'design_tutorial/ForDes.png" alt=""  width="150px" height="150px" /></a></div>'+
                  '<p>The above screen shows "View selected Type". ';
        inputs += '</div><div id="tutorialContent_bottom"></div>';
        inputs += ' <div style="clear: both;"></div></div>';
        
        $('#typeFormTutorial').empty();
        
        $('div.formpropdiv').hide();
		$('div.typeFormPropertyParentDiv').hide();
		$('div.typeFormPropertyChildDiv').hide();
		$('div.typeFormPropertySiblingDiv').hide();
		$('div.typeFormConnectionDiv').hide();
		$('div.typeFormRuleUpdateDiv').hide();
		$('#typeFormCreateDiv').hide();
        
        $('#typeFormTutorial').append(inputs);
       
        var eleDiv =  document.getElementById('typeFormTutorial');	
		eleDiv.style.visibility = "visible";
		eleDiv.style.display = "block";
        
        
}
