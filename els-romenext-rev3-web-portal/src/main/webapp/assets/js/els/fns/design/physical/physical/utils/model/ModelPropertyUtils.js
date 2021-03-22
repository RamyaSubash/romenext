function ModelPropertyUtils() {
	
};

/**
 * Note that
 * 
 * 
 *    displayAllModelProperties
 *    displayModelProperty
 *        showModifier
 *    createModelProperty3D
 *    addModelProperty
 *        buildModifierList3D
 *        selectedModifier
 *    updateModelProperty
 *    saveAssignShapeToProperty3D
 *    updateShapesRelatedToProperty
 *    --------------------------------
 * utilities
 *    disablePropsForPlanes3D
 *    organizePropModifierList3D
 */

ModelPropertyUtils.displayAllModelProperties = function( properties  ) {
	
	var infoEle = document.getElementById("model_info");
    infoEle.innerHTML = '';
    
    var model = '';
    var rows  = ''; 
    
    model  = "<p style='color:green'>Model Properties:      ";
	model += "<input type='image'  id='prop_unassign' title='Unsassign a property click here' src='/webgui/assets/img/model_icons/unlink.png'    onclick=\"toUnAssignProperty3D()\"></p>";
    model += "<table class='table table-reponsive table-condensed table-hover'><thead class='thead-inverse'>";
    model += "<tr><th>Field Name</th><th>type</th> <th>Value</th> <th>Modifier</th><th colspan='3'>Action</th></tr></thead>";
    
	if(properties == null || properties.length == 0){   
		model =  "<p style='color:grey'>No Model Properties created yet </p>";
		model += "<table class='table table-reponsive table-condensed table-hover'><thead class='thead-inverse'>";
	    model += "<tr><th>Field Name</th><th>type</th> <th>Value</th> <th>Modifier</th><th colspan='3'>Action</th></tr></thead>";	
	}else {
	   
	        // NOT SURE IF THIS IS NEEDED 
		    var parentChild = null;
		    if (physicalModelView == 'parent') {
		    	parentChild = 1
		    } else if (physicalModelView == 'child') {
		    	parentChild = 3
		    }
	    
		for (var i = 0; i < properties.length; i++) {
				
			if (properties[i].parentChild == parentChild) {
				
                var row = ModelPropertyUtils.displayModelProperty(properties[i]);
					
				rows = rows + row;
			}
		}
	}
	
	model +=  rows;
	
	model += "<tr><th colspan='7'> Adding property</th></tr>";
	
	model = model + ModelPropertyUtils.addModelProperty()+"</table>";
	
	infoEle.innerHTML = model;
		
}

ModelPropertyUtils.displayModelProperty = function( property  ) {
	
	var  modifierTextOptions = {1: 'Relative x', 3: 'Relative y', 5: 'Absolute x', 7: 'Absolute y', 11: 'Relative z', 17: 'Absolute z'};

	var modifier  = modifierTextOptions[property.propertyModifierType];

	var row ='';
	
	if(property == null){
		
	} else {
	
		row  = "<tr  id='roweditform_"+property.id+"' class='info'>";
		row  = row + "<td><input id='model_prop_name_" + property.id + "' type='text'  size='10' name='name' value ='"+property.name  +"' autofocus></td>";
		row  = row + "<td><input type='text'  size='5' name='property_type'";
		       if(property.propertyType == 7){row = row + "value = 'Number' disabled /></td> " }
		       else  if(property.propertyType == 13) { row = row + "value='Text' disabled /> </td>"};   			
		
		row  = row + "<td><input id='model_prop_defaultvalue_" + property.id + "' type='text'  size='5' name='defaultValue' value='";
		 if(property.propertyType == 7){
			 if (property.defaultValue != null ) {row  = row + Math.round(property.defaultValue);}
		 }else { // propertyType   Text
			 row  = row + property.defaultValue ;
			 }
		row  = row + "'></td>";
		
		if (property.propertyModifierType) {
			row  = row + "<td>"+  ModelPropertyUtils.showModifier(property.propertyModifierType, property.propertyType, property.id)+"</td>";
		} else if (property.propertyPositionType) {
			row  = row + "<td>"+  ModelPropertyUtils.showModifier(property.propertyPositionType, property.propertyType, property.id)+"</td>";
		}
				
		row  = row + "<td><input id='prop_view_"+property.id+"'   type='image' title='View property'   src="+img_path+"'model_icons/view.png'    onclick=\"toViewPropertyOnModel3D('"+property.id+"')\"></td>";
		row  = row + "<td><input id='prop_update_"+property.id+"' type='image' title='Save property'   src="+img_path+"'saveprop.png'            onclick=\"toUpdateModelProperty3D('"+property.id+"')\"></td>";
		row  = row + "<td><input id='prop_assign_"+property.id+"' type='image' title='Assign property' src="+img_path+"'model_icons/assign.png'  onclick=\"toAssignPropertyToShape3D('"+property.id+"')\"></td>";
		
	}
		return row;
	
}

ModelPropertyUtils.createModelProperty3D = function (form) {
	
	if(selectedMetaData == null || listTypeIds.length == 0  || typeMapViaId.length == 0){
		console.log(" no type selected for the physical design--- from createModelProperty");
		$('#console-log').append("<p style='color:red'> Missing initial variables( metadata/current Type)</p>");
		return;
	}
	
	var propertyName, propertyType, parentChild, minimum ='', maximum='', defaultValue='';
	var modifier = null;
	var position = null;
	
	$('tr#addform').find(':input').each(function (i, field) {
		if ((field.type != 'submit') && (field.type != 'radio') || field.checked) {
			if (field.name == 'name')          { propertyName = field.value; }
//			if (field.name == 'minimum')       { minimum = field.value;      }
//			if (field.name == 'maximum')       { maximum = field.value; 	 }
			if(field.name == 'defaultvalue')   { defaultValue = field.value; }
			if (field.name == 'property_type') { propertyType = field.value; }
			if (field.name == "modifier")      { modifier = field.value; 	 }
			if (field.name == "position")      { position = field.value; 	 }
		}
	});

//	console.log(" value of  physicalModelView  "+ physicalModelView);
	
    var parentChild = null;
    if (physicalModelView == 'parent')       {      parentChild = 1
    } else if (physicalModelView == 'child') {     	parentChild = 3     }
    console.log(" physicalModelView = "+ physicalModelView+ " parentChild  "+ parentChild);
	
	// no shape is assigned yet
	if((propertyType != '')){	
		var json_addProperty = '{"modelId": ' + curModel + ', "name": "' + propertyName + '", "propertyType":"' + propertyType + '", "parentChild":' + parentChild;
		json_addProperty += ', "defaultValue":"'+defaultValue +'", "minimumValue":"' + minimum + '", "maximumValue":"' + maximum ;
		
		if (modifier) {
			json_addProperty += '", "propertyModifierType":' + modifier + '}';
		} else if (position) {
			json_addProperty += '", "propertyPositionType":' + position + '}';
		} else {
			console.log("No Modifer or Position Found!");
		}
		
		console.log("try to add property " +json_addProperty );
		
		var doneFunction = function( data ) {
			console.log("what we need to do after adding a new model property?  load Model Properties and display these");
			console.log("curModel = " + curModel);
			$('#model_info').empty();					

			var modelManager = new RomeModelManager();	
			modelManager.getModelProperties3D(curModel);
		}
		
		var failFunction = function( xhr, status, error ) {
			$('#console-log').append("<p style='color:red'> failed to save model property :"+xhr.status+"</p>");
			console.log('failed to save the model property : '+ xhr.status);
		}
		
		var apis = new shapeApis();

		apis.addModelProperty(json_addProperty,  doneFunction, failFunction);	
		
		
	}else { console.log("One of your values are not defined ");}
}

ModelPropertyUtils.addModelProperty = function(){
    var formAddModel   = '';
	
    formAddModel += "<tr id='addform'><form id='my-grid-form-add'>";	
	
    formAddModel  += "<td><input type='text'  size='10' name='name' value ='' autofocus></td>";
    formAddModel  += "<td><select id='mpt-1' name='property_type' onchange='ModelPropertyUtils.buildModifierList3D(this.value, this.id);'>"
    formAddModel  += "<option value='DOUBLE'>Number</option><option value='STRING'>Text</option></select></td>";
    formAddModel  += "<td><input type='text'  size='5' name='defaultvalue'/></td>";  
    formAddModel  += "<td>"+ ModelPropertyUtils.selectedModifier(0, -1, 7) +"</td>";	
	
    formAddModel += "<td><input type='button' class='btn btn-primary btn-xs' value='Add' onclick='ModelPropertyUtils.createModelProperty3D(this)'></td>"
    formAddModel += "<td></td></form></tr>";
	
	return formAddModel ;
}		

ModelPropertyUtils.updateModelProperty3D =  function (propId){
	console.log("Inside Update Model Property"+ propId);

	if(selectedMetaData == null || listTypeIds.length == 0  || typeMapViaId.length == 0 || propId == null ){
		console.log(" no type selected for the physical design");
		$('#console-log').append("<p style='color:red'> Missing elements for update model properties</p>");	
		return;
	}
		
	var propertyId = Number(propId);
		
	var propertyName ,propertyType, minimum, maximum, defaultValue;
	var modifier = null;
	var position = null;
 //   Retrieve all info from the table row
	$('tr#roweditform_'+propId).find(':input').each(function (i, field) {
		if ((field.type != 'submit') && (field.type != 'radio') || field.checked) {
			if (field.name == 'name')         {  propertyName = field.value;	}
//			if (field.name == 'minimum')      {  minimum = field.value;		    }
//			if (field.name == 'maximum')      {  maximum = field.value;		    }
			if (field.name == 'defaultValue') {  defaultValue = field.value;	}
			if (field.name == 'property_type'){  
				if( field.value == 'Number' ) {propertyType = "DOUBLE"}
				else {  propertyType = "STRING";		}
			}
			if (field.name == "modifier")     {  modifier = field.value;		}
			if (field.name == "position")     {  position = field.value; 		}
		}
	});
	
	var parentChild = null;
	var json_updatePropetty = {};
    if (physicalModelView == 'parent') {        	parentChild = 1    } 
    else if (physicalModelView == 'child') {    	parentChild = 3    }	
	
	if((defaultValue != null)){  
		// no shape is assigned yet
	    
		json_updateProperty = '{"propertyId":'+propertyId+', "modelId": ' + curModel + ', "name": "' + propertyName + '", "propertyType":"' + propertyType + '", "parentChild":' + parentChild;
		json_updateProperty += ',"defaultValue":"'+defaultValue+'", "minimumValue":"' + minimum + '", "maximumValue":"' + maximum ;
		
		if (modifier) {
			json_updateProperty += '", "propertyModifierType":' + modifier + '}';
		} else if (position) {
			json_updateProperty += '", "propertyPositionType":' + position + '}';
		} else {
			console.log("No Modifer or Position Found!");
		}
		
		console.log("try to update property " +json_updateProperty );
			
		var doneFunction = function( data ) {
			
			console.log("curModel = " + curModel);
			$('#model_info').empty();

			var modelManager = new RomeModelManager();					
			modelManager.getModelProperties3D(curModel);
						
//			Update All shapes associated with this propety 
//			find shapes linked to this property
			var shapes = findShapeByPropertyId(propId);
			if(shapes.length >0){
				for(var j=0; j<shapes.length; j++){
					lines3d.children[shapes[j]].property = data.updatedProperty;
					
//					find children lines of the linked shape
					ModelPropertyUtils.updateShapesRelatedToProperty(shapes[j], data.updatedProperty.id);
				}
			}
		}
		
		var failFunction = function( xhr, status, error ) {
			$('#console-log').append("<p style='color:red'> failed to update  model property :"+xhr.status+"</p>");
			console.log('failed to update the model property : '+ xhr.status);
		}
		
		var apis = new shapeApis();

		apis.updateModelProperty(json_updateProperty,  doneFunction, failFunction);	
						
	}else { console.log("no defaultValue assigned ");}

	
}

ModelPropertyUtils.saveAssignShapeToProperty3D = function (){
	
	console.log("Inside save assign property");
	var modifier = PhysicalInterfaceUtils.findModifier();
	
	if(selectedLine  ){            // test could be removed 
//		verifying that property to associate with selected line is acceptable
		var accept = false;
	    if ((selectedLine[0].shapeType == 1) && (modifier == 3 || modifier == 7 || modifier == 11 || modifier == 17)){
	    	accept = true;
	    }
	    if ((selectedLine[0].shapeType == 3) && (modifier == 1 || modifier == 5 || modifier == 11 || modifier == 17)){
	    	accept = true;
	    }
	    if ((selectedLine[0].shapeType == 5) && (modifier == 1 || modifier == 3 || modifier == 5 || modifier == 7)){
	    	accept = true;
	    }
		
	    // {1: 'Relative x', 3: 'Relative y', 5: 'Absolute x', 7: 'Absolute y', 11: 'Relative z', 17: 'Absolute z'};
//		if (plane3DName == 'xy') {
//		    if ((selectedLine[0].shapeType == 3) && (modifier == 1 || modifier == 5)){
//		    	accept = true;
//		    }
//		    if((selectedLine[0].shapeType == 1) && (modifier == 3 || modifier == 7 )) {
//				accept = true ;
//		    }
//		} else if (plane3DName == 'yz') {
//		    if ((selectedLine[0].shapeType == 3) && (modifier == 3 || modifier == 7)){
//		    	accept = true;
//		    }
//		    if((selectedLine[0].shapeType == 5) && (modifier == 11 || modifier == 17 )) {
//				accept = true ;
//		    }
//		} else if (plane3DName == 'xz') {
//		    if ((selectedLine[0].shapeType == 5) && (modifier == 1 || modifier == 5)){
//		    	accept = true;
//		    }
//		    if((selectedLine[0].shapeType == 1) && (modifier == 11 || modifier == 17 )) {
//				accept = true ;
//		    }
//		}

		if( accept ){
//				var typeId = findTypeIdByName(curType);       
				
				if (selectedMetaData == null ||  propertyId == null) {
					return;
				}
				var json_assignPropToShape;
				json_assignPropToShape  = '{"propertyId":'+propertyId+', "shapeId": ' + selectedLine[0].dbId + '}';
				console.log(json_assignPropToShape);	
		
				var doneFunction = function( data ) {					
					console.log("curModel = " + curModel);
					$('#model_info').empty();
					
					console.log("updated property and Shape "+data.updatedShape);
									
					lines3d.children[selectedLine[0].line3dIndex].property = data.updatedShape.property;
					
					findAllLinesToAdjust(selectedLine[0]);
					console.table(lines3DToAdjust);
					var modelManager = new RomeModelManager();	
					modelManager.getModelProperties3D(curModel);	

					action3D = null;
					actionImg = '';
					modelManager.getShapes(curModel);
								
					ModelPropertyUtils.updateShapesRelatedToProperty(selectedLine[0].line3dIndex, propertyId);
					
					controls.enabled = true;				 					 					
				};
				
				var failFunction = function( xhr, status, error ) {
					$('#console-log').append("<p style='color:red'> failed to assign  a property to a shape:"+xhr.status+"</p>");
					console.log('failed to assign  a property to a shape: '+ xhr.status);
				};
				
				var apis = new shapeApis();
				
				apis.saveAssignShapeToProperty(json_assignPropToShape, doneFunction, failFunction );						
						
		}else {
			PlaySound();
			console.log("cannot assign this shape to this property");
			}
	}else {console.log("No line selected");}
	
}

ModelPropertyUtils.updateShapesRelatedToProperty = function(lineIndex, propId){

	if (curModelProperties.length != 0) {
		
		// find property details
		var prop = null;
    	for (var i = 0; i < curModelProperties.length; i++) {
    		if (curModelProperties[i].id == propId) {
    		   prop = curModelProperties[i];
    		   break; 
    		}
    	}
		 // find its parents
    	var shapeParent = lines3d.children[lineIndex].dbParent;  // needs to find this line 
    	var indexShapeParent = findLineIndex(shapeParent);
    	
    	// a Number property
    	if (indexShapeParent != null & prop.propertyType == 7) {
    		
    		var newShapeVal = null; 
    		var diff = null;
    		
    		// {1: 'Relative x', 3: 'Relative y', 5: 'Absolute x', 7: 'Absolute y', 11: 'Relative z', 17: 'Absolute z'};
    		if (prop.propertyModifierType == 1) {
    			newShapeVal = lines3d.children[indexShapeParent].geometry.vertices[0].x + Number(prop.defaultValue);
    			diff = newShapeVal - lines3d.children[lineIndex].geometry.vertices[0].x; 
    		} else if (prop.propertyModifierType == 3) {
    			newShapeVal = lines3d.children[indexShapeParent].geometry.vertices[0].y + Number(prop.defaultValue);
    			diff = newShapeVal - lines3d.children[lineIndex].geometry.vertices[0].y; 
    		} else if (prop.propertyModifierType == 5) {
    			newShapeVal = Number(prop.defaultValue);
    			diff = newShapeVal - lines3d.children[lineIndex].geometry.vertices[0].x; 
    		} else if (prop.propertyModifierType == 7) {
    			newShapeVal = Number(prop.defaultValue);
    			diff = newShapeVal - lines3d.children[lineIndex].geometry.vertices[0].y; 
    		} else if (prop.propertyModifierType == 11) {
    			newShapeVal = lines3d.children[indexShapeParent].geometry.vertices[0].z + Number(prop.defaultValue);
    			diff = newShapeVal - lines3d.children[lineIndex].geometry.vertices[0].z; 
    		} else if (prop.propertyModifierType == 17) {
    			newShapeVal = Number(prop.defaultValue);
    			diff = newShapeVal - lines3d.children[lineIndex].geometry.vertices[0].z; 
    		} else {
    			console.log("Wrong Data!");
    		}
    		
    		if (selectedLine[0].coords == 'x') {
    			
        		lines3d.children[lineIndex].geometry.vertices[0].x = newShapeVal;
         		lines3d.children[lineIndex].geometry.vertices[1].x = newShapeVal;
         		lines3d.children[lineIndex].geometry.verticesNeedUpdate = true;
         		
         		for (var i = 1; i < lines3DToAdjust.length; i++) {
         			var ind =  lines3DToAdjust[i].line3dIndex;
         			
         			lines3d.children[ind].geometry.vertices[0].x += diff;
           		    lines3d.children[ind].geometry.vertices[1].x += diff;   		   
           		    lines3d.children[ind].geometry.verticesNeedUpdate = true;
//           		    var angleValue = findAngleForLine(lines3d.children[ind]);
           		    var angleValue = lines3d.children[ind].dbAngle;
           		    ModelShapeUtils.saveUpdated3DShape(lines3d.children[ind], angleValue);
         		}
         		
    		} else if (selectedLine[0].coords == 'y') {
    			
        		lines3d.children[lineIndex].geometry.vertices[0].y = newShapeVal;
         		lines3d.children[lineIndex].geometry.vertices[1].y = newShapeVal;
         		lines3d.children[lineIndex].geometry.verticesNeedUpdate = true;
         		
         		for (var i = 1; i < lines3DToAdjust.length; i++) {
         			var ind =  lines3DToAdjust[i].line3dIndex;
         			
         			lines3d.children[ind].geometry.vertices[0].y += diff;
           		    lines3d.children[ind].geometry.vertices[1].y += diff;   		   
           		    lines3d.children[ind].geometry.verticesNeedUpdate = true;
//           		    var angleValue = findAngleForLine(lines3d.children[ind]);
           		    var angleValue = lines3d.children[ind].dbAngle;
           		    ModelShapeUtils.saveUpdated3DShape(lines3d.children[ind], angleValue);
         		}
         		
    		} else if (selectedLine[0].coords == 'z') {
    			
        		lines3d.children[lineIndex].geometry.vertices[0].z = newShapeVal;
         		lines3d.children[lineIndex].geometry.vertices[1].z = newShapeVal;
         		lines3d.children[lineIndex].geometry.verticesNeedUpdate = true;
         		
         		for (var i = 1; i < lines3DToAdjust.length; i++) {
         			var ind =  lines3DToAdjust[i].line3dIndex;
         			
         			lines3d.children[ind].geometry.vertices[0].z += diff;
           		    lines3d.children[ind].geometry.vertices[1].z += diff;   		   
           		    lines3d.children[ind].geometry.verticesNeedUpdate = true;
//           		    var angleValue = findAngleForLine(lines3d.children[ind]);
           		    var angleValue = lines3d.children[ind].dbAngle;
           		    ModelShapeUtils.saveUpdated3DShape(lines3d.children[ind], angleValue);
         		}
         		
    		} else {
    			console.log("Wrong Data!");
    		}
    		
//    		var angleValue = findAngleForLine(lines3d.children[lineIndex]);
    		var angleValue = lines3d.children[lineIndex].dbAngle;
    		ModelShapeUtils.saveUpdated3DShape(lines3d.children[lineIndex], angleValue);
    		resetConstLineColor();
    		
    	}
    	
//         if (indexShapeParent != null & prop.propertyType == 7) {	                              
//    		    	
//    		var newShapeVal = null; 
//    		var diff = null;
//    		
//    		if (plane3DName == 'xy') {
//    			 if(lines3d.children[lineIndex]. shapeType == 1 ){
//	            	 if(prop.propertyModifierType == 3){
//	            		 newShapeVal = lines3d.children[indexShapeParent].geometry.vertices[0].y + Number(prop.defaultValue);
//	            	 }
//	            	 if(prop.propertyModifierType == 7) {
//	            		 newShapeVal = Number(prop.defaultValue);
//	            	 }
//	            	 diff = newShapeVal - lines3d.children[lineIndex].geometry.vertices[0].y; 
//	            	 
//	            	 console.log('old value ');
//	            	 console.table( lines3d.children[lineIndex].geometry.vertices);
//	            	 
//	            	 lines3d.children[lineIndex].geometry.vertices[0].y = newShapeVal;
//	          		 lines3d.children[lineIndex].geometry.vertices[1].y = newShapeVal;
//	          		 lines3d.children[lineIndex].geometry.verticesNeedUpdate = true;
//	          		 
//	          		 console.log('New value ');
//	            	 console.table( lines3d.children[lineIndex].geometry.vertices);
//                     
//	            	 for(var l=1; l<lines3DToAdjust.length; l++){
//	          		   var ind =  lines3DToAdjust[l].line3dIndex;
//	          		   
//	          		   console.log("before");
//	          		   console.table( lines3d.children[ind].geometry.vertices);
//	          		   
//	          		   lines3d.children[ind].geometry.vertices[0].y += diff;
//	          		   lines3d.children[ind].geometry.vertices[1].y += diff;   		   
//	          		   lines3d.children[ind].geometry.verticesNeedUpdate = true;
//	          		   
//	          		   console.log("After");
//	          		   console.table( lines3d.children[ind].geometry.vertices);
//	          		   
//	          		   var angleValue = findAngleForLine(lines3d.children[ind]);
//		         	   ModelShapeUtils.saveUpdated3DShape(lines3d.children[ind], angleValue);
//	          	   } 
//	            	 
//	             };
//    			
//	             if(lines3d.children[lineIndex]. shapeType == 3 ){
//	            	 if(prop.propertyModifierType == 1){
//	            		 newShapeVal = lines3d.children[indexShapeParent].geometry.vertices[0].x + Number(prop.defaultValue);
//	            	 }
//	            	 if(prop.propertyModifierType == 5) {
//	            		 newShapeVal = Number(prop.defaultValue);
//	            	 }
//                     diff = newShapeVal - lines3d.children[lineIndex].geometry.vertices[0].x;
//	            	 
//	            	 lines3d.children[lineIndex].geometry.vertices[0].x = newShapeVal;
//	          		 lines3d.children[lineIndex].geometry.vertices[1].x = newShapeVal;
//	          		 lines3d.children[lineIndex].geometry.verticesNeedUpdate = true;
//	            	 
//	            	 
//	            	 for(var l=1; l<lines3DToAdjust.length; l++){
//	          		   var ind =  lines3DToAdjust[l].line3dIndex
//	          		   lines3d.children[ind].geometry.vertices[0].x += diff;
//	          		   lines3d.children[ind].geometry.vertices[1].x += diff;	          		   
//	          		   lines3d.children[ind].geometry.verticesNeedUpdate = true;
//	          		   
//	          		   console.log("After");
//	          		   console.table( lines3d.children[ind].geometry.vertices);
//	          		   
//	          		   var angleValue = findAngleForLine(lines3d.children[ind]);
//		         	   ModelShapeUtils.saveUpdated3DShape(lines3d.children[ind], angleValue);
//	          		   
//	          	   } 
//    			}
//    			
//    			
//
//    		} else if (plane3DName == 'yz') {
//    			
//    			if(lines3d.children[lineIndex]. shapeType == 3 ){
//	            	 if(prop.propertyModifierType == 11){
//	            		 newShapeVal = lines3d.children[indexShapeParent].geometry.vertices[0].z + Number(prop.defaultValue);
//	            	 }
//	            	 if(prop.propertyModifierType == 17) {
//	            		 newShapeVal = Number(prop.defaultValue);
//	            	 }
//                     diff = newShapeVal - lines3d.children[lineIndex].geometry.vertices[0].z;          	 
//	            	 lines3d.children[lineIndex].geometry.vertices[0].z = newShapeVal;
//	          		 lines3d.children[lineIndex].geometry.vertices[1].z = newShapeVal;
//	          		 lines3d.children[lineIndex].geometry.verticesNeedUpdate = true;      	        	 
//	            	 for(var l=1; l<lines3DToAdjust.length; l++){	            		
//	          		   var ind =  lines3DToAdjust[l].line3dIndex
//	          		   
//	          		   lines3d.children[ind].geometry.vertices[0].z += diff;
//	          		   lines3d.children[ind].geometry.vertices[1].z += diff;   
//	          		   lines3d.children[ind].geometry.verticesNeedUpdate = true;
//	          		   
//	          		   console.log("After");
//	          		   console.table( lines3d.children[ind].geometry.vertices);
//	          		   
//	          		   var angleValue = findAngleForLine(lines3d.children[ind]);
//		         	   ModelShapeUtils.saveUpdated3DShape(lines3d.children[ind], angleValue);
//	          	   } 
//    			}
//    			 if(lines3d.children[lineIndex]. shapeType == 5 ){
//	            	 if(prop.propertyModifierType == 3){
//	            		 newShapeVal = lines3d.children[indexShapeParent].geometry.vertices[0].y + Number(prop.defaultValue);
//	            	 }
//	            	 if(prop.propertyModifierType == 7) {
//	            		 newShapeVal = Number(prop.defaultValue);
//	            	 }            	 
//	            	 diff = newShapeVal - lines3d.children[lineIndex].geometry.vertices[0].y;            	 
//	            	 lines3d.children[lineIndex].geometry.vertices[0].y = newShapeVal;
//	          		 lines3d.children[lineIndex].geometry.vertices[1].y = newShapeVal;
//	          		 lines3d.children[lineIndex].geometry.verticesNeedUpdate = true;            	 
//	            	 for(var l=1; l<lines3DToAdjust.length; l++){
//		          		   var ind =  lines3DToAdjust[l].line3dIndex;
//		          		   
//		          		   console.log("before");
//		          		   console.table( lines3d.children[ind].geometry.vertices);
//		          		   
//		          		   lines3d.children[ind].geometry.vertices[0].y += diff;
//		          		   lines3d.children[ind].geometry.vertices[1].y += diff; 		   
//		          		   lines3d.children[ind].geometry.verticesNeedUpdate = true;
//		          		   
//		          		   console.log("After");
//		          		   console.table( lines3d.children[ind].geometry.vertices);
//		          		   
//		          		   var angleValue = findAngleForLine(lines3d.children[ind]);
//			         	   ModelShapeUtils.saveUpdated3DShape(lines3d.children[ind], angleValue);
//		          	   } 
//    			 }	
//    			
//    		} else if (plane3DName == 'xz') {
//		             if(lines3d.children[lineIndex]. shapeType == 1 ){
//		            	 if(prop.propertyModifierType == 11){
//		            		 newShapeVal = lines3d.children[indexShapeParent].geometry.vertices[0].z + Number(prop.defaultValue);
//		            	 }
//		            	 if(prop.propertyModifierType == 17) {
//		            		 newShapeVal = Number(prop.defaultValue);
//		            	 }
//		            	 diff = newShapeVal - lines3d.children[lineIndex].geometry.vertices[0].z;           	 
//		            	 lines3d.children[lineIndex].geometry.vertices[0].z = newShapeVal;
//		          		 lines3d.children[lineIndex].geometry.vertices[1].z = newShapeVal;
//		          		 lines3d.children[lineIndex].geometry.verticesNeedUpdate = true;
//		            	 for(var l=1; l<lines3DToAdjust.length; l++){
//		          		   var ind =  lines3DToAdjust[l].line3dIndex;
//		          		   
//		          		   console.log("before");
//		          		   console.table( lines3d.children[ind].geometry.vertices);
//		          		   
//		          		   lines3d.children[ind].geometry.vertices[0].z += diff;
//		          		   lines3d.children[ind].geometry.vertices[1].z += diff;		   
//		          		   lines3d.children[ind].geometry.verticesNeedUpdate = true;
//		          		   
//		          		   console.log("After");
//		          		   console.table( lines3d.children[ind].geometry.vertices);
//		          		   
//		          		   var angleValue = findAngleForLine(lines3d.children[ind]);
//			         	   ModelShapeUtils.saveUpdated3DShape(lines3d.children[ind], angleValue);
//		          		   
//		          	   } 
//		            	 
//		             };
//		             if(lines3d.children[lineIndex]. shapeType == 5 ){
//		            	 if(prop.propertyModifierType == 1){
//		            		 newShapeVal = lines3d.children[indexShapeParent].geometry.vertices[0].x + Number(prop.defaultValue);
//		            	 }
//		            	 if(prop.propertyModifierType == 5) {
//		            		 newShapeVal = Number(prop.defaultValue);
//		            	 }
//		            	 diff = newShapeVal - lines3d.children[lineIndex].geometry.vertices[0].x;	            	 
//		            	 lines3d.children[lineIndex].geometry.vertices[0].x = newShapeVal;
//		          		 lines3d.children[lineIndex].geometry.vertices[1].x = newShapeVal;
//		          		 lines3d.children[lineIndex].geometry.verticesNeedUpdate = true;	            	 	            	 
//		            	 for(var l=1; l<lines3DToAdjust.length; l++){
//		          		   var ind =  lines3DToAdjust[l].line3dIndex;
//		          		   
//		          		  console.log("before");
//		          		   console.table( lines3d.children[ind].geometry.vertices);
//		          		   
//		          		   lines3d.children[ind].geometry.vertices[0].x  += diff;
//		          		   lines3d.children[ind].geometry.vertices[1].x  += diff;          		   
//		          		   lines3d.children[ind].geometry.verticesNeedUpdate = true;
//		          		   
//		          		   console.log("After");
//		          		   console.table( lines3d.children[ind].geometry.vertices);
//		          		   
//		          		 var angleValue = findAngleForLine(lines3d.children[ind]);
//		         		ModelShapeUtils.saveUpdated3DShape(lines3d.children[ind], angleValue);          		   
//		          		   
//		          	   }            	 			            	 
//    			    };
//    		}
//    		
//    		var angleValue = findAngleForLine(lines3d.children[lineIndex]);
//    		ModelShapeUtils.saveUpdated3DShape(lines3d.children[lineIndex], angleValue);
//    		resetConstLineColor();
//         }
	}
}


//==================================================================================================
//                                            RESETTING  PROPERTIES BASED ON PLANE VIEW
ModelPropertyUtils.disablePropsForPlanes3D  = function () {
   	
   	if (curModelProperties.length != 0) {
   		
   		for (var i = 0; i < curModelProperties.length; i++) {
   			
   			if (curModelProperties[i].propertyModifierType) {
   				
   				document.getElementById('prop_view_'+curModelProperties[i].id).src = img_path + "model_icons/view.png";
   				document.getElementById('prop_update_'+curModelProperties[i].id).src = img_path + "saveprop.png";
   				document.getElementById('prop_assign_'+curModelProperties[i].id).src = img_path + "model_icons/assign.png";
   				
   				$("#model_prop_name_"+curModelProperties[i].id).removeAttr("disabled");
   				$("#model_prop_defaultvalue_"+curModelProperties[i].id).removeAttr("disabled");
   				
   				$("#prop_view_"+curModelProperties[i].id).removeAttr("disabled");
   				$("#prop_update_"+curModelProperties[i].id).removeAttr("disabled");
   				$("#prop_assign_"+curModelProperties[i].id).removeAttr("disabled");
   				
//   				if (plane3DName == 'xy') {
//   					if (curModelProperties[i].propertyModifierType == 11 || curModelProperties[i].selectedValue == 17) {
//   						$("#model_prop_name_"+curModelProperties[i].id).attr('disabled', 'disabled');
//   						$("#model_prop_defaultvalue_"+curModelProperties[i].id).attr('disabled', 'disabled');
//   						$("#prop_view_"+curModelProperties[i].id).attr('disabled', 'disabled');
//   						$("#prop_update_"+curModelProperties[i].id).attr('disabled', 'disabled');
//   						$("#prop_assign_"+curModelProperties[i].id).attr('disabled', 'disabled');
//   					}
//   				} else if (plane3DName == 'yz') {
//   					if (curModelProperties[i].propertyModifierType == 1 || curModelProperties[i].selectedValue == 5) {
//   						$("#model_prop_name_"+curModelProperties[i].id).attr('disabled', 'disabled');
//   						$("#model_prop_defaultvalue_"+curModelProperties[i].id).attr('disabled', 'disabled');
//   						$("#prop_view_"+curModelProperties[i].id).attr('disabled', 'disabled');
//   						$("#prop_update_"+curModelProperties[i].id).attr('disabled', 'disabled');
//   						$("#prop_assign_"+curModelProperties[i].id).attr('disabled', 'disabled');
//   					}
//   				} else if (plane3DName == 'xz') {
//   					if (curModelProperties[i].propertyModifierType == 3 || curModelProperties[i].selectedValue == 7) {
//   						$("#model_prop_name_"+curModelProperties[i].id).attr('disabled', 'disabled');
//   						$("#model_prop_defaultvalue_"+curModelProperties[i].id).attr('disabled', 'disabled');
//   						$("#prop_view_"+curModelProperties[i].id).attr('disabled', 'disabled');
//   						$("#prop_update_"+curModelProperties[i].id).attr('disabled', 'disabled');
//   						$("#prop_assign_"+curModelProperties[i].id).attr('disabled', 'disabled');
//   					}
//   				}
   			}
   		}
   		
   	}
   }
   
ModelPropertyUtils.organizePropModifierList3D = function () {
   	
   	var propModifierList = document.getElementById("mpmmpt-1"); 	
   	if (propModifierList.name == "modifier") { 		
   		$("#mpmmpt-1 option[value='1']").show();
   		$("#mpmmpt-1 option[value='3']").show();
   		$("#mpmmpt-1 option[value='5']").show();
   		$("#mpmmpt-1 option[value='7']").show();
   		$("#mpmmpt-1 option[value='11']").show();
   		$("#mpmmpt-1 option[value='17']").show();
   		
   		$("#mpmmpt-1 option[value='1']").attr("selected", "selected");
   		
//   		if (plane3DName == 'xy') {
//   			$("#mpmmpt-1 option[value='11']").hide();
//   			$("#mpmmpt-1 option[value='17']").hide();
//   			$("#mpmmpt-1 option[value='1']").attr("selected", "selected");
//   		} else if (plane3DName == 'yz') {
//   			$("#mpmmpt-1 option[value='1']").hide();
//   			$("#mpmmpt-1 option[value='5']").hide();
//   			$("#mpmmpt-1 option[value='3']").attr("selected", "selected");
//   		} else if (plane3DName == 'xz') {
//   			$("#mpmmpt-1 option[value='3']").hide();
//   			$("#mpmmpt-1 option[value='7']").hide();
//   			$("#mpmmpt-1 option[value='1']").attr("selected", "selected");
//   		}
   		
   	}
   	
   }   
   

//==========================================================================
//                            Utilities  for  displayModelProperty
//=========================================================================

ModelPropertyUtils.showModifier  = function (mod, propType, propId){
	var selectedMod   = "";
	
	if (propType == 7) {
	selectedMod +="<input id='prop_modifier_" + propId + "' type='hidden' name='modifier' value= ";
	if(mod== 1)  { selectedMod +="'1' /> Relative x"}
	if(mod== 3)  { selectedMod +="'3' /> Relative y"}
	if(mod== 11) { selectedMod +="'11'/> Relative z"}
	if(mod== 5)  { selectedMod +="'5' /> Absolute x"}
	if(mod== 7)  { selectedMod +="'7' /> Absolute y"}
	if(mod== 17) { selectedMod +="'17'/> Absolute z"}
	
	} else if (propType == 13) {
	selectedMod   = "<select name='position' >";
	selectedMod  += "<option value='1'"; if (mod == 1)  { selectedMod += "selected";};  selectedMod += ">Start</option>";
	selectedMod  += "<option value='3'"; if (mod == 3)  { selectedMod += "selected";};  selectedMod += ">Middle</option>";
	selectedMod  += "<option value='5'"; if (mod == 5)  { selectedMod += "selected";};  selectedMod += ">End</option>";
	selectedMod  += "</select>";	
	} 
	return selectedMod;
}

//==========================================================================
//                            Utilities  for  addModelProperty
//=========================================================================

ModelPropertyUtils.buildModifierList3D  = function (propType, propId) {
	if (propType == 'DOUBLE') {
		document.getElementById('mpm' + propId).innerHTML = "<select name='modifier'><option value='1'>Relative x</option><option value='3'>Relative y</option><option value='11'>Relative z</option>"
															+"<option value='5'>Absolute x</option><option value='7'>Absolute y</option><option value='17'>Absolute z</option></select>";
		document.getElementById('mpm' + propId).setAttribute("name","modifier");
	} else if (propType == 'STRING') {
		document.getElementById('mpm' + propId).innerHTML = "<select name='position'><option value='1'>Start</option><option value='3'>Middle</option><option value='5'>End</option></select>";
		document.getElementById('mpm' + propId).setAttribute("name","position");
	} else {
		console.log('Nothing Selected');
	}
	ModelPropertyUtils.organizePropModifierList3D();
}

ModelPropertyUtils.selectedModifier = function(mod, mpId, propType){

	var selectedMod = "";
	
	if (propType == 7) {
		selectedMod  += "<select name='modifier' id='mpmmpt" + mpId + "'>";
	    selectedMod  += "<option value='1'"; if (mod == 1)    { selectedMod += "selected";};  selectedMod += ">Relative x</option>";
	    selectedMod  += "<option value='3'"; if (mod == 3)    { selectedMod += "selected";};  selectedMod += ">Relative y</option>";
	    selectedMod  += "<option value='11'"; if (mod == 11)  { selectedMod += "selected";};  selectedMod += ">Relative z</option>";	    
	    selectedMod  += "<option value='5'"; if (mod == 5)    { selectedMod += "selected";};  selectedMod += ">Absolute x</option>";
	    selectedMod  += "<option value='7'"; if (mod == 7)    { selectedMod += "selected";};  selectedMod += ">Absolute y</option>";
	    selectedMod  += "<option value='17'"; if (mod == 17)  { selectedMod += "selected";};  selectedMod += ">Absolute z</option>";
	    selectedMod  += "</select>";
	} else if (propType == 13) {
		selectedMod  += "<select name='position' id='mpmmpt" + mpId + "'>";
	    selectedMod  += "<option value='1'"; if (mod == 1)  { selectedMod += "selected";};  selectedMod += ">Start</option>";
	    selectedMod  += "<option value='3'"; if (mod == 3)  { selectedMod += "selected";};  selectedMod += ">Middle</option>";
	    selectedMod  += "<option value='5'"; if (mod == 5)  { selectedMod += "selected";};  selectedMod += ">End</option>";
	    selectedMod  += "</select>";
	} 
	
	return selectedMod;
}


		
			
			