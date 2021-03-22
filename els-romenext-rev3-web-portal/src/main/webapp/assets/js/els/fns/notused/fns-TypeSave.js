/**
 * 
 */
////################################################################################
////=================================  SAVE  NEW TYPE==============================
////========================= Updated Version with MetaData ========================
////################################################################################
//function saveNewType(form) {
//	// verifying metadata selected first 
//	var foundError=false;
//	if (selectedMetaData != null) {
//		var jsonData = {};
////		var opts = [];
//		var decos = [];
//		//====  retrieve all info from a form to construct the json
//		//====   the typename, classification (node/path),  
//		//====   list of decorators ids selected  
//		$(form).find('div#typeName').find(':input').each(function(i,field){
//			if ((field.type != 'submit') && (field.type != 'radio') || (field.checked)) {		
//				if((field.name == 'name')|| (field.name == 'classification')||(field.name== 'owner')||(field.name=='isRoot')){
//					jsonData[field.name] = field.value;
////					CANNOT ACCEPT EMPTY STRING FOR NAME
//					if(field.name =='name' && !field.value ){
//						console.log("Missing Value for type Name.");
//	          		    $('#typeForm').append("<br/><p style='color:red'>Missing Value for Type name : ");
//	                    foundError= true;
//					}
//				}
//		    }
//		});
//		
//		$(form).find(':input').each(function(i, field) {
//			if (field.name == 'geoActivator') {
//				if (document.getElementById('geoActivator').checked == true) {
//					decos.push($(this).val());
//				}
//			}
////			if (field.name == 'decorators') {  
////				 $("#decorators option:checked").each(function(){
////						console.log(" value form form : ");
////						decos.push($(this).val());
////				});
////				jsonData[field.name] = decos;
////				console.log("value selected are : "+ decos);
////			} 
//		})
//		
//		jsonData['decorators'] = decos;
//		
////		var decoproperty={}, decoProps =[];
////		$(form).find(':input').each(function(i, field) {		
////			if (field.name == 'decorators') {  	// if the field is decorators then Retrieve a list
////				 $("#decorators option:checked").each(function(){
////						console.log(" value form form : ");
////						opts.push($(this).val());
////				});
////				jsonData[field.name] = opts;
////				console.log("value selected are : "+ opts);
////			} 
////		})
//
////		$(form).find('div#decopropertieslist').find('table#decoproperties').each(function(i, decoDiv){
////			$(decoDiv).find(':input').each(function(i,field){
////				if ((field.type != 'submit') && (field.type != 'radio') || (field.checked)) {	
////					decoproperty[field.name] = field.value;
////				}
////			})
////			decoProps.push(decoproperty);
////			decoproperty = {};
////		})
////		
////		console.log(decoProps);
//		//console.log(selectedMetaData);
//	//	jsonData.decoPropertyValues = decoProps;
//		
//		console.log(jsonData);
//        //    make the call to the API with the json
//		if(!foundError){
//			$.ajax({
//					type : 'POST',
//					url : apiBaseUrl + 'type/metadata/' + selectedMetaData,
//					dataType : 'json',
//					data : JSON.stringify(jsonData),
//					contentType : 'application/json',
//					cache : false,
//					success : function(data) {
//						$('#console-log')
//								.append("<p style='color:blue'>Type successfully created</p>");
//						console.log("Type create success. data: "+ data.name);
//					},
//					error : function(xhr, ajaxOptions, error) {
//						console.log(' SAVE TYPE Error : ' + xhr.responseText);
//						$('#console-log').append("<p style='color:red'>Error in Type creation"+xhr.status+"</p>");
//						emptyAll();
//					}
//				}).done(function(data) {
//						// ADd node to the typeGraph with proper format
//					    preTdvPos.push({x: 0, y: 0}); // give a default position for the new node
//						if(!tdvCy) {  
//							initTypeGraph();
//	//						initTypeBar('typeBar2');
//							}
//						else{
//							tdvCy.filter('node[name="' + data.name + '"]').data(data);
//						    // Add node info to typeMap========= update graph
//						    updateTypeGraph(tdvCy, formatNewType(data));
//						    initTypeDesignBar('typeBar');
//	//						initTypeBar('typeBar2');
//						}				
//						// Refresh the Type bay adding new Type
//						emptyAll();
//						var img = document.getElementById("img_create");
//						  img.src = "/webgui/assets/img/design_icons/create.png";
//					});
//		}
//
//	} else {
//		$('#console-log').append("<p style='color:red'>Can not create a TYPE, You must First  select a Metadata</p>");
//	}
//	
//}

////################################################################################
////==========================SAVE  TYPE PROPERTIES ==================================
////========================= Updated Version with MetaData ========================
////################################################################################
//function saveTypeProperties(form) {
//	if (selectedMetaData != null){
//		var jsonData = {}, typeProperties = [];
//		//  Retrieve type fields from form
//		$(form).find('div#typeName').find(':input').each(function(i,field){
//			jsonData[field.name] =field.value;
//		});
//		//	remove typename from JSON
//		var typename= jsonData["typename"];
//		delete jsonData['typename'];
//	    var initcolor = typeMap[typename].color;
//	  // Retrieve Type properties fields from form
//		var property={};
//		$(form).find('div#propertiesFields').find('div').each(function(i, propDiv){
//			$(propDiv).find(':input').each(function(i, field){
//				if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
//					property[field.name] = field.value;		
//				}
//			});
//			typeProperties.push(property);
//			property ={};
//		});
//		//	attach properties to JSON
//		jsonData = typeProperties;
//	    console.log(jsonData);
//
//		$.ajax({
//			type : 'POST',
//			url : apiBaseUrl + 'type/properties/' + typename+ '/metadata/'+ selectedMetaData,
//			dataType : 'json',
//			data : JSON.stringify(jsonData),
//			contentType : 'application/json',
//			cache : false,
//			success : function(data) {
//				// Update cytoscape instance, note typeMap is updated too 
//				data.color = initcolor;
//				tdvCy.filter('node[name="' + data.name + '"]').data(data);
//				console.log("Type Properties create success. data: " + data.name);
//				
//			},
//			error : function(xhr, ajaxOptions, error) {
//				emptyAll();
//				document.getElementById('typeForm').textContent="Error Type properties not saved";
//				$('#console-log').append("<p style='color:red'>Error Type properties not saved: " + xhr.responseText);
//				
//			}
//		}).done(function(data) {
//			console.log(" Saving Type properties Success: "+data.name);
//			emptyAll();
//			data.color = initcolor;
//			typeMap[data.name]= data;               ///   update the typeMap 
//			initTypeDesignBar('typeBar'); 
//			showType(data);
//		});
//	} else { 
//		$('#console-log').append("<p style='color:red'>Can not create a TYPE, You must First  select a Metadata</p>");
//	}
//}
////===========================  UPDATE TYPE & Properties =============================
////===================================================================================
//function updateType(form) {
//	if (selectedMetaData != null){
//		var jsonData = {}, typeproperties =[],jsonProperty = {}; 
//		var opts = [], decos = [], foundError=false;
//		$(form).find('table#typeName').find(':input').each(function(i, field){		
//			if ((field.type != 'submit') && (field.type != 'radio') || field.checked) {		
//				if((field.name == 'oldtypename')||(field.name == 'name')|| (field.name == 'classification')||(field.name== 'owner')||(field.name=='isRoot')){
//					if(field.name =='name' && !field.value ){
//						console.log("Missing Value for type Name.");
//	          		    $('#typeForm').append("<br/><p style='color:red'>Missing Value for Type name : ");
//	                    foundError= true;
//					}			
//					jsonData[field.name] = field.value;
//					}
//			}
//					
////			    if (field.name == 'decorators') {  	// if the field is decorators then Retrieve a list
////					$("#decorators option:checked").each(function(){
////						console.log(" value form form : ");
////						opts.push($(this).val());
////					});
////					jsonData[field.name] = opts;
////					console.log("value selected are : "+ opts);
////				}
//				
//				if (field.name == 'geoActivator') {
//					if (document.getElementById('geoActivator').checked == true) { 	decos.push($(this).val()); 	}
//				}
//				
//
//		});
//		if(!foundError){
//			jsonData['decorators'] = decos;
//			
//			// remove original typename to pass as path parameter
//			var typename= jsonData["oldtypename"];
//			
//			var c1 = typeMap[typename].color;
//		    delete jsonData['oldtypename'];
//			
//			$(form).find('table#propertiesFields').each(function(i, propDiv){
//				$(propDiv).find(':input').each(function(i,field){
//				        if ( field.type != 'submit') {
//				        		jsonProperty[field.name] = field.value;			
//				}             
//				});
//				typeproperties.push(jsonProperty); 
//				jsonProperty = {};
//			})
//			jsonData.properties = typeproperties;
//			console.log(jsonData);
//	
//			$.ajax({
//				type : 'PUT',
//				url : apiBaseUrl + 'type/typeandproperty/' + typename+ '/metadata/'+ selectedMetaData,
//				dataType : 'json',
//				data : JSON.stringify(jsonData),
//				contentType : 'application/json',
//				cache : false,
//				success : function(data) {
//					console.log("Type create success. data: " + data);
//					data.color = c1;
//					tdvCy.filter('node[name="' + data.name + '"]').data(data);
//				},
//				error : function(xhr, ajaxOptions, error) {
//					console.log(' Update TYPE Error : '+ xhr.responseText);
//					emptyAll();
//				}
//			}).done(function(data) {
//				// User may change the Name so we need to update if the typeBar also
//				// loop through the elements to update the type
//			    // save initial given color
//				
//				if(typename != data.name){
//					 delete typeMap[typename];         // remove old value
//				}
//				 data.color= c1;
//				 typeMap[data.name]= data;         // add the changed element to typeMap
//				 initTypeDesignBar('typeBar'); 
//				 emptyAll();
//				 showType(data);
//	
//			});
//		}
//	} else { 
//		$('#console-log').append("<p style='color:red'>Can not create a TYPE, You must First  select a Metadata</p>");
//	}
//}

