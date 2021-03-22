function DisplayFormUtils() {
	
};
	DisplayFormUtils.addEditDivsForANodeDetails = function( instHolderDiv , key ) {	
		var checkInstanceEditDiv = $( "#form_inst_edit_" + key );	
		if( checkInstanceEditDiv == null || checkInstanceEditDiv.length == 0 ) {		
			GlobalHTMLUtils.createAppendHTMLEntity('div', 'form_inst_edit_'  + key, 'form_inst_edit container', 'visible', 'display', '', instHolderDiv);		
			checkInstanceEditDiv = $( "#form_inst_edit_" + key );
		}	
	}
    DisplayFormUtils.addDivsForANodeDetails = function( instHolderDiv , key ) {	
		/**
		 * THIS IS FOR THE INFO OF THE INSTANCE
		 */ 
		var checkInstanceDiv = $( "#form_inst_" + key );	
		if( checkInstanceDiv == null || checkInstanceDiv.length == 0 ) {	
			GlobalHTMLUtils.createAppendHTMLEntity('div', 'form_inst_'+ key, 'form_inst container', 'visible', 'display', '',  instHolderDiv);		
			checkInstanceDiv = $( "#form_inst_" + key );
		}	
		/**
		 * THIS IS FOR THE EDITING OF  INSTANCE PROPERTIES
		 */
		var checkInstanceEditDiv = $( "#form_inst_edit_" + key );	
		if( checkInstanceEditDiv == null || checkInstanceEditDiv.length == 0 ) {		
			GlobalHTMLUtils.createAppendHTMLEntity('div', 'form_inst_edit_'  + key, 'form_inst_edit container', 'hidden', 'none', '', instHolderDiv);		
			checkInstanceEditDiv = $( "#form_inst_edit_" + key );
		}			
   };
	// changed today 17/07/2017
    DisplayFormUtils.addRelatedTypeDivs = function(typeId, bodyDivToAppendTo, list) {
		if (!typeId) {
			console.log(" No type Id defined ");
			return null;
		}

		console.log( "list before  : "+ list);
		list = DisplayFormUtils.addDivs ( typeId, bodyDivToAppendTo, list   );
				
		DisplayFormUtils.addDivsContentforCreate  ( typeId, list );

   }
    
    DisplayFormUtils.addDivs = function ( typeId, bodyDivToAppendTo, list   ){
    	if (!typeId) {
    		console.log(" No type Id defined ");
    		return null;
    	}
    	var divTypeDetails = {};
    	if (!$.isEmptyObject(listAllNodes)) {
    		for (var node = 0; node < listAllNodes.length; node++) {
    			if (listAllNodes[node].currNodeType == typeId.toString()) {
    				if (listAllNodes[node].connection.minRel >= 0) { // taking  Required and optional linked types
    					var type = listAllNodes[node].relNodeType;
    					if (!divTypes[type]) {                      // first time to find this type
    						GlobalHTMLUtils.createTypeEntity(type,bodyDivToAppendTo);
    						list.push({ type : type, ind : node });
    						divTypeDetails = { type : type.toString(), divCreated : true,  name : typeMapViaId[type].name,  times : 1 };
    						divTypes[type] = divTypeDetails;   						
    						
    					} else {
    						// this is indicating a loop
    						divTypeDetails = divTypes[type];
    						divTypeDetails.times += 1;
    						divTypes[type] = divTypeDetails;
    					}
    				} else {
    					// error in value of minRel
    					console.log(' Connection ignored , minRel value out of range ');
    				}
    			}
    		}
    	}
    	  	 	
    	return list;
    }
    
    DisplayFormUtils.addDivsContentforCreate = function ( typeId, list ){
    	if (!$.isEmptyObject(list)) {
			var textButton = '';
			for (var ele = 0; ele < list.length; ele++) {
				var typeNext = list[ele].type;
				// confirm division is there
				if (document.getElementById('divType_' + typeNext) == undefined	|| document.getElementById('divType_' + typeNext) == null) {
					console.log(" Division not found for type "	+ typeMapViaId[typeNext].name+ " Can not add 'ADD' Button");
					return;
				}
	
				// find connection in listAllNodes where
				var connId = listAllNodes[list[ele].ind].connection.id;
				var connection = listAllNodes[list[ele].ind].connection;
				if (listAllNodes[list[ele].ind].currNodeType == typeId.toString() && listAllNodes[list[ele].ind].relNodeType == typeNext.toString()) {
					// we know that maxRel >= 1
					if (Number(connection.minRel) == 0) {
						textButton = '<input type="button"   value="ADD"   class="btn btn-primary btn-xs"    id="img_'+ typeNext
								+ '" onclick="DisplayNewFormUtils.displayNodeInstance(\''+ typeNext+ '\' , \''+ connId+ '\', \''+ typeId+ '\')"/>(Optional)';
						$('#divTypeHeader_' + typeNext).append(textButton);
						
					} else {
						if (Number(connection.minRel) == 1) {
							$('#divTypeHeader_' + typeNext).css({'color' : 'red','font-size' : '100%'});
							DisplayNewFormUtils.displayNodeInstance(typeNext, connId,typeId);
						} else {
							if (Number(connection.minRel) > 1) {
								textButton = '<input type="button"   value="ADD"   class="btn btn-primary btn-xs"  id="img_'+ typeNext
								+ '" onclick="DisplayNewFormUtils.displayNodeInstance(\''+ typeNext+ '\' , \''+ connId+ '\', \''+ typeId + '\')"/>(1 or More)';
								$('#divTypeHeader_' + typeNext).css({'color' : 'red','font-size' : '100%'});
								$('#divTypeHeader_' + typeNext).append(textButton);
								DisplayNewFormUtils.displayNodeInstance(typeNext,conn, typeId);
								document.getElementById('img_' + typeNext).disabled = true;
							}
						}
					}
					textButton = '';
				}
			}
		}
    }    
       
	DisplayFormUtils.addNodeDetails = function( appendToDiv, typeId ){
    	
    	if(!typeId ){
    		console.log(" no Type Id provided: cannot build create Instance table  "); 
    		return;
    	}
    	var tmpType = typeMapViaId[typeId];
    	// populate the Add INSTANCE FORM with properties	              
    	var propcolor = '', typeDate = 'date';			                           // RED color used to highlight Mandatory property
    		
        var listDates = [];
    	// build the form
    	var inputContent = '';
    	    inputContent += '<table id="tableNodeCreate_' + typeId + '>';

       	if(!$.isEmptyObject( tmpType.typeProperties	)){
    		$.each( tmpType.typeProperties, function( propId, tmpProp ) {
    			var value = tmpProp.defaultValue;		
    			inputContent += '<tr id="typeProps">';
    			if(tmpProp.isMandatory){ propcolor='color:red'  } else {propcolor='color:black' };		
    			if( tmpProp.propertyType == "DATE" ) {    				
    				inputContent += '<td style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input type="text"  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" value="' + today + '" / ></td><td>(DATE) </td></tr>' ;
    				listDates.push(tmpProp.id);
				   				
    			}else if( tmpProp.propertyType == "BOOLEAN" ) {
    				inputContent += '<td style='+propcolor+'>'+ tmpProp.name + ':</td>';
    				inputContent += '<td><input type="radio" name="'+tmpProp.name+ '" id="form_inst_add_val_' + tmpProp.id + '"  value ="true" checked="checked"/>True'
    				inputContent += '<input type="radio"  name="'+tmpProp.name+'" id="form_inst_add_val_' + tmpProp.id + '"  value="false"/>False</td><td>(BOOLEAN)</td></tr>' ;
    			
    			} else {
    					
					inputContent += '<td style='+propcolor+'>'+ tmpProp.name + ':</td><td>' + '<input  name = "'+tmpProp.name+ '"  id="form_inst_add_val_' + tmpProp.id + '" ' ;	
    					
					if( tmpProp.propertyType == "STRING" ) {
						inputContent += ' type="text" value="" / ></td><td>(TEXT)</td> </tr>' ;
					} else if( tmpProp.propertyType == "INTEGER" ) {
						inputContent += 'type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57 " value=""  / ></td><td>(INTEGER) </td></tr>' ;
					} else if( tmpProp.propertyType == "DOUBLE" ) {
						inputContent += 'type="text"  onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 8 || event.charCode === 46" value="" / ></td><td>(DOUBLE) </td></tr>' ;
					} else if( tmpProp.propertyType == "FILE" ) {
						// include thumbnail
						inputContent += 'type="file"  value="" onchange="GlobalUtils.showFile(event, \'' + tmpProp.id + '\')"/>'
						 + '<a target="_blank" id="show_image_file_output_' + tmpProp.id + '"   href=""><img  class="imgthumb" id="image_file_output_' + tmpProp.id + '" style="display:none;" height="50" width="50"  ></a>' 
						 + '<a id="other_file_output_' + tmpProp.id + '" style="display:none;"></a>' 
						 + '(FILE) </td></tr>' ;																	
					} else if( tmpProp.propertyType == "CURRENCY" ) {
						inputContent += 'type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 8 || event.charCode === 46 " value="" / >(CURRENCY) </td></tr>' ;
					} else {
						inputContent += 'type="text" value="" / ></td><td>(UNKNOWN TYPE) </td></tr>' ;		
					}			
    			}	
    		});
        }else {    
        	inputContent += "<tr><td colspan='2'> No Properties defined for this Type </td></tr>";   
        };
    	
        inputContent = inputContent + "</table><br />";   
        appendToDiv.append( inputContent);
        for (var i=0; i< listDates.length; i++){
        	$("#form_inst_add_val_"+listDates[i]).datepicker({
        		changeMonth: true,
      	        changeYear: true,
        	    dateFormat: "yy-mm-dd",
        	    yearRange : "1950:"+(new Date).getFullYear()
        	});
        }	
    }
   	
	
	
	 DisplayFormUtils.SearchType = function(typeId  ){
		 $('div.node_detail').hide();			
			$('.work_addInstance').empty();
			$('.pathFormCreate').remove();
		 
		 
		 if(document.getElementById('work_addInstance_'+typeId) == undefined || document.getElementById('work_addInstance_'+typeId) == null) {		
				GlobalHTMLUtils.createAppendHTMLEntity('div', 'work_addInstance_'+typeId  , 'work_addInstance', 'Display', 'block', '', $('#form_body'));			
			}	
			
			var workDiv = $('#work_addInstance_'+typeId); 			
			var input = "<img  title='under construction'   src='"+img_path+ "tobedone.jpg' >";			
			workDiv.append(input); 	 
		 
	 }
	
	
	
	
	DisplayFormUtils.cleanPreviousResult = function ( typeId ){
		var prevSearchResult = document.getElementById('returnToSearch_'+ typeId );
		
		if (prevSearchResult != undefined || prevSearchResult != null) {	
			// clean the DetailsNode for the typeId and its related nodes
			
			var previousDetailsNode = $('#DetailsNodeDisplay_'+ typeId);
			if(previousDetailsNode ){
				previousDetailsNode.empty();
			}
			var previousNodeDisplayDiv = $('#nodeDisplayDiv_'+ typeId);
			if(previousNodeDisplayDiv ){
				previousNodeDisplayDiv.empty();
			}	

			var typeIdsRel  = DisplayFormUtils.getTypeFromList (typeId);             
						
			for(var i=0; i< typeIdsRel.length ; i++){
				
				var valueSelected = $('input[name="mustConn_'+typeIdsRel[i]+'"]:checked').val();
				if(!valueSelected ){
			        console.log(" user did not add this optional type ");
			
			   }else {	
				   
				   var previousDetailsNode = $('#DetailsNodeDisplay_'+ typeIdsRel[i]);
				   if ( valueSelected == 'use'  &&  previousDetailsNode  ){						
                            previousDetailsNode.empty();

							var previousDisplayDetails = $('#nodeDisplayDiv_'+ typeIdsRel[i]);
							if(previousDisplayDetails ){
								previousDisplayDetails.empty();
							}
							
							$('input[name="mustConn_'+typeIdsRel[i]+'"][value=create]').prop('checked',true)
							if(document.getElementById('nodeCreateDiv_'+typeIdsRel[i])!= undefined ){
								$('input[name="mustConn_'+typeIdsRel[i]+'"][value=create]').trigger("click");
								DisplayInterfaceUtils.showDivision('#nodeCreateDiv_', typeIdsRel[i]);
							}
				   }else {
					   // valueSelected ==  'create' 
				   }
			   }
		   }				
		}	
	};
	
    DisplayFormUtils.getTypeFromList = function(typeId  ){
		var typeIdsRel = [];
		for ( var i=0; i<typeListFound.length; i++){
			if( typeListFound[i] != undefined){
				if( (typeListFound[i] != typeId) && (typeListFound[i] != listTypeIds[0]) ){
					for ( var j=0; j <listAllNodes.length; j++){
						if( typeListFound[i]  ==  listAllNodes[j].relNodeType && typeId == listAllNodes[j].currNodeType){
								typeIdsRel.push(Number(typeListFound[i]) )
						}else {
							if( typeListFound[i]  ==  listAllNodes[j].currNodeType && typeId == listAllNodes[j].relNodeType ){	
								typeIdsRel.push(Number(typeListFound[i]) )
							}
						}
					}
				}
			}
		}
		return typeIdsRel;		
	};
	
    DisplayFormUtils.getTypeListParents  = function(typeLinkTo,  typeId  ){
		var typeIdsRel = [];
		for ( var i=0; i<typeListFound.length; i++){
			if( typeListFound[i] != undefined){
				if( (typeListFound[i] != typeId) && (typeListFound[i] != typeLinkTo )){
					for ( var j=0; j <listAllNodes.length; j++){
						if( typeListFound[i]  ==  listAllNodes[j].currNodeType && typeLinkTo == listAllNodes[j].relNodeType){
								typeIdsRel.push(Number(typeListFound[i]) );
						}
					}
				}
			}
		}
		return typeIdsRel;		
	};
	  
    DisplayFormUtils.findValueProp = function ( data , propId ){
		 if(!$.isEmptyObject(data) ){ 
		    var val = null;
		    if (!$.isEmptyObject(data.typeProperties)){
				 $.each( data.typeProperties, function( key, value ) {		
					if( value.id == propId){
						val = value.value 
					}
				}); 			
		    }
			return val; 
		 }else {
			 console.log(" no node typeProperties provided ");
			 return null;
		 }	 
	 };
   
//=========================================================================================================================   
    DisplayFormUtils.resetGV = function (  ){ 
	    listTree = [];
		listAllNodes = [];
		typeListFound = [];
		typeListFoundDetails = [];
		divTypes =[];	
   };
    
    DisplayFormUtils.updateNode_cancel = function ( key ){	
		
       $(".form_inst_edit").hide();
       var prevFooterEdit  = $('#footer_edit');
		if (prevFooterEdit != undefined || prevFooterEdit != null) {
			$('#footer_edit').hide();
		}
       			
		$(".form_inst").css("display", "block");
		$(".form_inst").css("visibility", "visible");		
		var prevFooterView = $('#footer_view');	
		if (prevFooterView != undefined || prevFooterView != null) {
				$('#footer_view').show();
		}
				
	};	
         
    DisplayFormUtils.createNode_cancel = function( typeId  ) {  	
	   	if(!typeId){
				console.log(" no type given: cannot cancel create Instance  "); 
				return;
			}			
		console.log("Attempting to Cancel :" + typeId );			
		$('.work_addInstance').remove();
		$('.pathFormCreate').remove();
		historyNode = [];		
		DisplayFormUtils.resetGV ();		
   } ;
   
   
//=======================================================================================================================   
    DisplayFormUtils.findlistOfNodesToCreate = function (typeIds ){
	   var listTypes = [];	   
	   for (var m=0; m <typeIds.length; m++ ){
		   for ( var n = 0; n < listAllNodes.length; n++){			   
			   var currElement = listAllNodes[n];
				if( currElement.currNodeType == typeIds[m]){
					 var valueSelected = $('input[name$="mustConn_'+currElement.relNodeType+'"]:checked').val();
					if( currElement.connection.minRel == '0'){
						if(!valueSelected ){
					        console.log(" user did not add this optional type "+typeMapViaId[currElement.relNodeType].name);
						// do not keep this type in the list to flow
					   }else {
						// need to keep this element as it may be required to add
						   if ( valueSelected == 'create'){
							      node  = {type : currElement.relNodeType.toString(), nodeUuid: null, mustOrNot : currElement.typeNode, action : 'createNode' };
							      nodesToUpdate[currElement.relNodeType] = node;
						          listTypes.push(Number(currElement.relNodeType));
						          
						   }else if( valueSelected == 'use' ){
								var ele      = document.getElementById('node_list_'+currElement.relNodeType);
			    			   	if ( !ele ){
			    			   		console.log("could not find the select field to read from ");
			    			   		listErrors.push("button Search is clicked for type "+typeMapViaId[currElement.relNodeType].name+" but missing list of options");
			    			   		return  null;
			    			   	}
				    			var nodeUuid     = ele.options[ele.selectedIndex].value;
			    				if(!nodeUuid ){
			    					listErrors.push("no node selected in search option for "+typeMapViaId[currElement.relNodeType].name+ " node mandatory ");
			    					console.error(" <p>no node selected in search option for "+typeMapViaId[currElement.relNodeType].name+ " node mandatory </p>");
				                	return  null;
			    				}
								node  = {type : currElement.relNodeType.toString(), nodeUuid: nodeUuid, mustOrNot : currElement.typeNode, action : 'use' };
								nodesToUpdate[currElement.relNodeType] = node;
				               listTypes.push(Number(currElement.relNodeType));
					     }						  					   
					   }
					}else {
						// minRel = 1 or > 1
						if(!valueSelected ){
							// error
							console.error(" <p>Error in displaying  "+typeMapViaId[currElement.relNodeType].name+ " details </p>");
							return  null;
						}
						if ( valueSelected == 'create'){
						      node  = {type : currElement.relNodeType.toString(), nodeUuid: null, mustOrNot : currElement.typeNode, action : 'createNode' };
						      nodesToUpdate[currElement.relNodeType] = node;
					          listTypes.push(Number(currElement.relNodeType));
					          
						}else if( valueSelected == 'use' ){
									var ele      = document.getElementById('node_list_'+currElement.relNodeType);
				    			   	if ( ! ele ){
				    			   		console.log("could not find the select field to read from ");
				    			   		listErrors.push("button Search is clicked for type "+typeMapViaId[currElement.relNodeType].name+" but missing list of options ");
				    			   		return  null;
				    			   	}
					    			var nodeUuid     = ele.options[ele.selectedIndex].value;
				    				if(!nodeUuid ){
				    					listErrors.push("no node selected in search option for "+typeMapViaId[currElement.relNodeType].name+ " node mandatory ");
				    					console.error(" <p>no node selected in search option for "+typeMapViaId[currElement.relNodeType].name+ " node mandatory </p>");
					                	return  null;
				    				}
									node  = {type : currElement.relNodeType.toString(), nodeUuid: nodeUuid, mustOrNot : currElement.typeNode, action : 'use' };
									nodesToUpdate[currElement.relNodeType] = node;
					               listTypes.push(Number(currElement.relNodeType));
						     }				
					}
				}			   	   
		   }
	   }

	  console.log( listTypes);	
	  if (listTypes.length == 0) { 		
	  		return listTypes;
	  } else {	  	  	
		  	return listTypes.concat( DisplayFormUtils.findlistOfNodesToCreate (listTypes));
	  	}
   }
   
    DisplayFormUtils.retrieveNodesProperties = function(){
    	
    	 nodesToUpdate.forEach(function( value ){
				// this should create the node for the current Type 
				console.log("%c Inside loop to retrieve nodes properties ", "color:blue"); 						
				if( value.action == 'createNode'){
					console.log("%c Attempting to add a new Node for this type :" + typeMapViaId[value.type].name , "color:purple" );	
					var properties=[];	
						properties = NodeUtils.retrieveNodePropertiesFromForm ( value.type , 'form_inst_add_val_');	
					// look if it is optional or mandatory 	
					if(properties[properties.length-1]){
						for( var ind = 0; ind < listErrorsFromRetrieval.length  ; ind++){
							document.getElementById(listErrorsFromRetrieval[ind] ).style.backgroundColor = "yellow"; 
						}
						listErrorsFromRetrieval =[];
						console.error(" do not continue the saving Process -- error in retrieving properties for type "+value.type);
						$('#console-log').append("<p style='color:red'>Node properties retrieval  Failed for type ."+typeMapViaId[value.type].name +"</p>");
						listErrors.push('no properties found for  '+typeMapViaId[value.type].name);
						return;
					}
					properties.pop();   // everything is fine remove boolean					
					value.properties = properties;				
				}			
			});  	
    }
    
    DisplayFormUtils.checkPropertiesFields = function( typeId    ){
    	var properties=[]; var empty = false;	
		properties = NodeUtils.retrieveNodePropertiesFromForm ( typeId , 'form_inst_add_val_');	
		if(properties[properties.length-1]){
			properties.pop(); 
			if ( !properties || properties.length == 0 ){
				empty = true;
			}else {
				empty = false;
			}
		}else {
			empty = false;
		}
		return empty;
    }
    
    DisplayFormUtils.saveNodes = function(){
    	 nodesToUpdate.forEach(function( value ){ 
    		 if( value.action == 'createNode'){
	    		 DisplayNewFormUtils.SaveNodeCreated (value.type, value.properties ); 
	    		 if(!listInstUuids[0]){
						console.log("failure in creating  node for  "+ value.type);
						$('#console-log').append("<p style='color:red'>Node creation Failed for type :"+typeMapViaId[value.type].name +" </p>");
						return;
				 }
				 value.nodeUuid = listInstUuids[0];
				 console.log("%cNode creation successfully for type "+typeMapViaId[value.type].name , "color:blue");
				 $('#console-log').append("<p style='color:blue'>Node creation successfully for type "+typeMapViaId[value.type].name +"</p>");	
    		 }
    	 });
    }
    
    DisplayFormUtils.checkDuplicateEdgeCreation = function( listOfEdges, connId, element ){
    	// verify that we don't have duplicate edge creation 
    	var foundDuplicate = false;
    	if(!connId){
			console.log(" no connection provided to check for duplicate "); 
			return null;
		}
    	if(!element){
			console.log(" no element provided to check for duplicate "); 
			return null;
		}
    	if(!listOfEdges || listOfEdges.length == 0   ){
			console.log(" no listOfEdges provided to use to check for duplicate "); 
			return foundDuplicate;
		}
    	
    	for ( var i=0; i < listOfEdges.length; i++){
    		var currElement = listOfEdges[i];
    		if( currElement.connection.id == connId ){
    			if ( currElement.currNodeType == element.currNodeType  && currElement.relNodeType == element.relNodeType){   				
    				foundDuplicate = true;         // found duplicate edge
    				break;
    			}
    		}
    	}
    	return foundDuplicate;  	
    }
 
   
    DisplayFormUtils.builtDataModelGraphElements = function( typeId  ) {  	
       var elements = [];
       var element = {};
	   for ( var i=0; i < typeListFound.length; i++){
		   var type = typeMapViaId[typeListFound[i]];
		   type.cyDisplay = type.name;						
		   element = {
					group: 'nodes',
					data : type,
			};		
			elements.push(element);  
			element = {};
	   }
	   console.log(elements);
	   var conns = [];                                                               // global variable
		for ( var i=0; i <elementFound.length ; i++){
			for ( j= i+1 ; j< elementFound.length ; j++){
				var foundCon = NodeUtils.findConnection ( elementFound[i], elementFound[j] );		
				if(foundCon.length == 1) {
					if( !conns[foundCon[0].id]) {
						conns[foundCon[0].id] =  foundCon[0] ;
						}						 					
					}
				var foundCon = NodeUtils.findConnection ( elementFound[j], elementFound[i]  );		
				if(foundCon.length == 1) {
					if( !conns[foundCon[0].id]) {conns[foundCon[0].id] =  foundCon[0] ;}						 					
					} 
	   
			}
		}
		  console.log(conns);
		for (var key in conns) {			
			var conn = conns[key];
			conns[conn.id].cyDisplay = '';	
			
			var element = {
					group: 'edges',
					data : {
						id: 'connection' + conn.id,
						source: conn.source.toString(),
						target: conn.target.toString(),
//						name: conn.name,
						name :'('+conn.minRel+','+conn.maxRel+')',
						rule: conn.rule,
						classification : conn.classification,
						origin: conn.origin,
						destination: conn.destination,
						minRel: conn.minRel.toString(),
						maxRel: conn.maxRel.toString()
					}
			};	
			elements.push(element);	
			element = {};
		}
		console.log(elements);
		return elements;	   
    };
   
    DisplayFormUtils.showDataModel = function(typeId,  elements ){   
	   $("#pathFormCreate"+typeId ).dialog({
		      autoOpen: true,
		      width: '500',    
		      height:'500',
		      title : "Data Model for "+typeMapViaId[typeId].name,
		      modal: false,		    
		      position: {
		    	    off : $('#addNodeInst_submit_' + typeId ),
		  			my: "right",
		  			at: "center",
		  			
					},
		      create: function( event, ui ) {
		    	    // Set maxWidth
		    	    $(this).css("maxWidth", "800px");
		    	  },

           close: function(event,ui){
                $("#pathFormCreate"+typeId).remove();
           }
		      
		    });
	 	 
	   if (elements.length != 0) { 	  
		   var cy = cytoscape({
		        container: document.getElementById('pathFormCreate'+typeId),
		        showOverlay: false,
		        zoom : 4,
		        style: [
		                {
		                  selector: 'node',
		                  style: {
		                	'content': 'data(name)',
		                	'background-color': 'data(color)',
		                	'color': '#337AB7',
		                	'border-color': '#AABFB8',
		                	'text-outline-color': 'data(color)',
		                	'font-size': '12px',
			                'font-weight': 'bold',
		                    'width': '20px',
		                    'height': '20px',                    
		                  }
		                }, {
		                  selector: 'edge',
		                  style: {
		                	  'content': 'data(name)',
		                	  'curve-style': 'bezier',
		                	  'font-size': '12px',
		                	  'target-arrow-shape': 'triangle',
		                	  'target-arrow-color': '#2283c5',
				              'source-arrow-shape': 'circle',
				              'line-color': '#2283c5', 
		                	  'line-style': 'dotted',
		                	  'edge-text-rotation': 'autorotate'	
		                  }
		                }
		              ],          

			    elements: elements,
	            layout: {
	            	 name: 'circle'            
		        }       
		      });
		   cy.center();  
	   }
	       
	   $("#pathFormCreate"+typeId ).dialog( "open" );
   };
   
//    DisplayFormUtils.viewDetailProperties = function ( nodeUuid ){
//	      	
//    	$('.pathFormCreate').remove();
//	   var nodeDetails = nodeMap[nodeUuid];		
//		if(!nodeDetails){
//			console.log(" no node details  were Found " );
//			// TODO!  display message
//			return;
//		}	
//		if(document.getElementById('pathFormCreate_'+nodeUuid) == undefined || document.getElementById('pathFormCreate_'+nodeUuid) == null) {		
//			GlobalHTMLUtils.createAppendHTMLEntity('div', 'pathFormCreate_'+nodeUuid  , 'pathFormCreate', 'visible', '', '', $('#form_body'));			
//		}		
//        var instHolderDiv = document.getElementById("pathFormCreate_" +nodeUuid);		
//        instHolderDiv.innerHTML ='';
//        
//	    DisplayFormUtils.addDivsForANodeDetails (instHolderDiv, nodeUuid );
//	    
//	    var typeId        = nodeMap[nodeUuid].typeId;
//		var typeInfo      = typeMapViaId[typeId];
//		( new DisplayFormRenderer() ).displayViewEditProperties( typeInfo, nodeUuid,  nodeDetails  );
//		
//		$("#pathFormCreate_"+nodeUuid ).dialog({
//		      autoOpen: true,
//		      width: '500',
//		      height:'500',
//		      title : typeMapViaId[typeId].name +"  Properties Details ",
//		      modal: false,
//		      position: {
//		  			my: "center",
//		  			at: "center"
//					},
//		      create: function( event, ui ) {
//		    	    // Set maxWidth
//		    	    $(this).css("maxWidth", "800px");
//		    	  },
//	         close: function(event,ui){
//	              $("#pathFormCreate_" +nodeUuid).remove();
//	         }
//		});
//	   
//		var footerView  = "<div id='footer_view'><br/> <input type='button' class='btn btn-primary btn-xs' id='GoUpdate'  value='Update "+typeMapViaId[typeId].name+" Properties' onclick='DisplayFormUtils.editNode(\"" + nodeUuid + "\")' /></div>" ;
//		$("#pathFormCreate_" +nodeUuid).append(footerView);	   
//   }
    
    
    
    
//    
//    DisplayFormUtils.editNode = function ( nodeUuid){
//	   if(!nodeUuid  ){
//			console.log(" no element found to show update window "+ nodeUuid );
//			$('#console-log').append("<p style='color:red'>no element found to show update window: "+ nodeUuid+"</p>");	
//			return;
//		}
//	   
//	   var prevFooterView = $('#footer_view');		
//		if (prevFooterView != undefined || prevFooterView != null) {
//			$('#footer_view').hide();
//		}
//		
//		$(".form_inst").hide();			
//		$("#form_inst_edit_"+ nodeUuid ).css("display", "block");
//		$("#form_inst_edit_"+ nodeUuid).css("visibility", "visible");
//		var prevFooterEdit  = $('#footer_edit');
//		if (prevFooterEdit != undefined || prevFooterEdit != null) {
//			$('#footer_edit').remove();
//		}
//		var footerEdit  = "<div id='footer_edit'><br/> <input type='button' class='btn btn-primary btn-xs'  value='Update' onclick='DisplayFormUtils.saveUpdateNode(\"" + nodeUuid + "\")' />";
//		footerEdit += "<input type='reset' value='Cancel' onclick='DisplayFormUtils.updateNode_cancel(\""+nodeUuid+"\")' /></div>";
//		$("#pathFormCreate_" +nodeUuid).append(footerEdit);
//   }
   
//    DisplayFormUtils.saveUpdateNode = function (nodeUuid ){
//	   if(!nodeUuid  ){
//			console.log(" no  uuid  given "+ nodeId );
//			return;
//		}	    							
//    	var typeId         = nodeMap[nodeUuid].typeId;
//		if(!typeId){
//			console.log(" Error in the process of saving  typeId found  "+ typeId + " nodeUuid found "+ nodeUuid);
//			return;
//		}				
//		var jsonData = {}, nodeProperties = [], newProperties = [];
//		var property = {}, newproperty = {}, foundError=false;			
//		var sysProperties = [];
//
//		jsonData["type"] = typeId.toString();
//				
//		// push the uuid to sysProperties	
//		property =  NodeUtils.createSysJson(nodeUuid );
//		sysProperties.push(property);
//				
//		property = {}; mewproperty = {};
//		
//		var instEditDiv = $("#form_inst_edit_" + nodeUuid );	
//		// grab the values of node properties from the form
//		$(instEditDiv).find('tr#props').each(function (i, propsTr){	
//			$(propsTr).find(':input').each(function(i,field){
//			     if( ( field.type  == 'text')||(field.type == 'hidden')|| (field.type == 'file')){
////			 		console.log(field.name + " value found is :"+field.value);		 		
//			 		if (field.name == 'value')  {   
//						  property[field.name] = field.value  
//					} else if (field.name == 'newValue') { 
//						if (field.type === 'file') {
//							newproperty['value'] = field.files[0];
//						} else {
//							newproperty['value'] = field.value;
//						}
//					} else { 
//						property [field.name] = field.value;
//						newproperty[field.name] = field.value;
//					} 
//			     }						     
//			});	
////			console.log(" found this property "+ property + " in this node "+ nodeUuid );			
//			if (newproperty.propertyType === "FILE") {
//				if( newproperty.value ){
//					var file = newproperty.value;
//					newproperty.value = {};
//					if (file.type.includes("image/")) {
//						newproperty.value.file = document.getElementById('image_file_output_' + newproperty.propertyId).src.replace("data:" + file.type + ";base64,", "");
//					} else {
//						newproperty.value.file = document.getElementById('other_file_output_' + newproperty.propertyId).href.replace("data:" + file.type + ";base64,", "");
//					}
//					newproperty.value.filename = file.name;
//				}
//			}
//					
//			// verify if property has value	
//			var isPropMand =  NodeUtils.findPropInType(property.propertyId, jsonData['type']);
//			if(isPropMand){ // mandatory property
//				if(newproperty.value){					
//					newProperties.push(newproperty);
//       		  	if(property.value  && property.value != 'undefined'){ nodeProperties.push(property);}	                    		  	
//		         } else {
//		        	  $(propsTr).append('error- missing Value');
//            		  console.log("Missing Value for Mandatory property : "+ property.propertyName);
//                      foundError= true;
//                 }		                    	  
//			}else {   // not mandatory
//				if(newproperty.value){  // user entered a new value					
//					newProperties.push(newproperty);
//	                if(property.value && property.value != 'undefined' ){ nodeProperties.push(property);}				        			
//				}else {  // if there was no value and user did not enter a value don't push it
////							  user may have deleted old value  
//					if (property.value && property.value!= 'undefined' ){
//						       newproperty.value = null;
//						       nodeProperties.push(property);
//						       newProperties.push(newproperty);
//					}			
//				}
//        	}
//		    property = {}; newproperty ={};
//		});		
//				
//		if(!foundError ) {
//			console.log(" Retrieved Properties are : ");
//			console.table(nodeProperties);
//			console.log(" The new ones are :");
//			console.table(newProperties);	
//			jsonData.sysProperties = sysProperties;	 
//			jsonData.properties    = nodeProperties;
//			jsonData.newProperties = newProperties;					
//			instEditDiv.hide();
//			
//			
//			var doneFunction = function( data ) {
//				if($.isEmptyObject(data) && S.isEmptyObject(data.nodes)){
//					console.log(" no node returned for save update Node Info ");
//					return;
//				}				
//				console.log("Node Updated "+data.nodes[0].type);		     
//				// Save the updated properties 											
//				var key = NodeUtils.findUUID (data.nodes[0]);					
//				nodeMap[key].typeProperties   = data.nodes[0].typeProperties;	
//				
//				DisplayNewFormUtils.listAll (typeId, 'mandatory' );				
//				DisplayFormUtils.viewDetailProperties(key)	;
//			};				
//			var failFunction = function( xhr, status, error ) {
//				console.log("Update Node Properties Error: "+ xhr.status);
//				 $('#console-log').append("Update Node Properties Error: "+ xhr.status);
//			};			
//			var api  = new NodeApis();
//			api.updateNode(jsonData, doneFunction, failFunction );							
//			
//		}										 		
//				
//   }

//    DisplayFormUtils.viewActualListRelatedNodes = function( nodeUuid ){
//		if(!nodeUuid  ){
//			console.error(" no node provided "+ nodeUuid );
//			return;
//		}
//		// use nodeUuid and typeListFound to show what exists 
//		var list  = [], childs =[];
//		var nodes = [];
//			nodes[nodeUuid] = nodeMap[nodeUuid];
//
//		for(var i = 0; i< listAllNodes.length; i++){
//			var element = listAllNodes[i];
//			if( element.currNodeType.toString() == nodeMap[nodeUuid].typeId.toString() ){
//			    var jsonData = DisplayNewFormUtils.buildJsonGetNodesFromEntryNodes ( nodeUuid, element.relNodeType  );
//					 // call API					 
//				DisplayNewFormUtils.getNodesFronEntry ( jsonData );  // found nodes are returned in historyNode
//			    console.log("Found these nodes "); console.table(historyNode);   
//			// complete the nodes info
//				 if( !$.isEmptyObject(historyNode)){
//					 childs =[]; var object = {};
//					for (var k=0; k < historyNode.length; k++  ){  
//						     childs.push(historyNode[k]);
//						     object = { type : Number(element.relNodeType) , children : childs}
//						     if( !list[Number(element.relNodeType)]) {
//						    	 list[Number(element.relNodeType)] = object;
//						    	 nodes[historyNode[k]] = nodeMap[historyNode[k]];
//						     }else {
//						    	 var ele =  list[Number(element.relNodeType)].children;
//						    	     ele.push(historyNode[k]);
//						    	     list[Number(element.relNodeType)].children = ele;
//						    	     nodes[historyNode[k]] = nodeMap[historyNode[k]];
//						     }
//					 }
//				 }
//			}
//		}
//		console.log( list );
//		var inputList = '';
//		if(!$.isEmptyObject(list) ){	
//			list.forEach( function (object ){			     
//				inputList += typeMapViaId[object.type].name + ': ( ';
//				var eles = object.children;
//				eles.forEach( function ( val){
//					var tmpName = NodeUtils.findNameInst( nodeMap[val]);
//					inputList += tmpName + ",  ";
//				})
//				inputList += ")<br/>";
//			});
//		}
//		var button = "";
//		if( inputList != ''){
//			document.getElementById('related_' + nodeUuid).remove();
//			button = "<button type='button' class='btn btn-primary btn-sm' id='update_"+nodeUuid+"' onclick=\"DisplayFormUtils.updateNode('"+nodeUuid+"')\">Update  </button></td>";
//			button += "<button type='button' class='btn btn-primary btn-sm' id='hide_"+nodeUuid+"' onclick=\"DisplayFormUtils.revertToList('"+nodeUuid+"')\">Hide  </button></td>";
//			inputList = inputList + button;
//			$("#listRelatedNodes_"+nodeUuid).append(inputList);
//		}else {
//			document.getElementById('related_' + nodeUuid).remove();
//			button = "<button type='button' class='btn btn-primary btn-sm' id='update_"+nodeUuid+"' onclick=\"DisplayFormUtils.updateNode('"+nodeUuid+"')\">Update  </button></td>";
//			button += "<button type='button' class='btn btn-primary btn-sm' id='hide_"+nodeUuid+"' onclick=\"DisplayFormUtils.revertToList('"+nodeUuid+"')\">Hide  </button></td>";
//			inputList = ' No nodes linked ' + button;
//			$("#listRelatedNodes_"+nodeUuid).append(inputList);
//		}
//		
//	}
  
   