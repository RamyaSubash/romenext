function FormRendererCrud() {

	this.initView = function() {
	}
};

/**
 * In form renderer, when types are created, we simple 
 * 1. add element to type bar
 * 2. add div
 * @param jsonData
 */
FormRendererCrud.typeCreate = function( jsonData ) {
	if(!$.isEmptyObject(jsonData)){
	
		$('#console-log').append("<p style='color:blue'>Type successfully Created</p>");
		
		// add  the type to the type bar
		$("#formRenderer_typesList tr:first").append( "<td id='typeId_"+jsonData.id+"'  ><span class='badge' style='color:black; background:"+jsonData.color+"' id='"+jsonData.id+"' title='Select to view in form' onclick=\"( new FormRenderer() ).selectedType('" + jsonData.id + "')\"  >"+jsonData.name+"</span></td>" );
		
		// add it to the div
		var propbody = document.getElementById('typeFormPropertyDiv');
	
		if (propbody != null) {                           // test needed for the logical Design????
			
			// update the total number of types
			var total = document.getElementById('totalNB');
			var nb = Object.keys(typeMap).length;
			total.innerHTML = '('+nb+')';
			
			// reset the image of create
			var img = document.getElementById("img_create");
			img.src = "/webgui/assets/img/design_icons/create.png";
			
			propbody.innertHTML = "";
			//display the type Info and its properties
			var formObj = new FormRenderer();
			FormTypePropertyUtils.displayFinalTypeProperties( propbody, jsonData, true, formObj.typeDisplayFunct, formObj.propertyTableFunct, formObj.displayFunct, formObj.footerFunct );
			// add the conns/rules
			// ie. parents/siblings/children
			FormRelationshipUtils.initRelationshipDivForType( jsonData.id );
		}	
	}else {
		console.log(" Create Type Failed");
	}
};

FormRendererCrud.typeRead = function( jsonData ) {
	console.log("Inside the typeRead ");
	
};

FormRendererCrud.typeUpdate = function( jsonData ) {
	
	if(!$.isEmptyObject(jsonData)){
			console.log("Inside the typeUpdate ");
		
			// associate the old color to the type
			jsonData.color = typeMapViaId[jsonData.id].color;
			console.log("Type Properties update success. data: " + jsonData.name);
		
			//   remove old value
			//   update the typeMap  && typeMapViaId 
			
			// delete the old values
			delete typeMap[jsonData.name];        // does not work   
			delete typeMapViaId[jsonData.id];
						
			// re-add the type
			typeMap[ jsonData.name ] = jsonData;
			typeMapViaId[ jsonData.id ] = jsonData;
			
		   // update name in typebar
		    $('td#typeId_'+jsonData.id).find('span').text(jsonData.name);
			
			( new FormRenderer() ).updateCachedFormType( jsonData.id  );
	}else {
		console.log(" Update of Type Failed");
	}
	
};

FormRendererCrud.typeParentCreate = function( jsonData ) {
	console.log("Inside the type Parent Create ");
	
};


FormRendererCrud.typeDelete = function( jsonData ) {
	console.log("Inside the typeDelete ");
	
};