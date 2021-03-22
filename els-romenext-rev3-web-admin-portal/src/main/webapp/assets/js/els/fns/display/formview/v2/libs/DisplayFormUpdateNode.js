/**
 * 
 */
function DisplayFormUpdateNode() {
	
};
   DisplayFormUpdateNode.updateNode = function ( nodeUuid ){	
		// reset all divs 
//		$('div.node_detail').hide();			
		$('.work_addInstance').remove();
		$('.pathFormCreate').remove();
		$('#Header_search').empty();
		nodesToUpdate = [];
				
		// create work div for update node
		var selectedTypeId = nodeMap[nodeUuid].typeId;		
		if(document.getElementById('work_addInstance_'+selectedTypeId) == undefined || document.getElementById('work_addInstance_'+selectedTypeId) == null) {		
			GlobalHTMLUtils.createAppendHTMLEntity('div', 'work_addInstance_'+selectedTypeId  , 'work_addInstance', 'Display', 'block', '', $('#form_body'));			
		}			
		var workDiv = $('#work_addInstance_'+selectedTypeId); 
		// this division is used to show the Path  
		if(document.getElementById('pathFormCreate'+selectedTypeId) == undefined || document.getElementById('pathFormCreate'+selectedTypeId) == null) {		
			GlobalHTMLUtils.createAppendHTMLEntity('div', 'pathFormCreate'+selectedTypeId  , 'pathFormCreate', '', '', '', $('#form_body'));			
		}
					
		// get list of type for data model and relationships 	
		DisplayFormUpdateNode.getTypesAndRelationshipsOfNode ( selectedTypeId  );
		
		// create div for the node and the footer
		divTypes = [];		
		GlobalHTMLUtils.createTypeEntity ( selectedTypeId, workDiv);		
		var bodyTypeDiv   = $( "#divType_"+selectedTypeId);
		if (document.getElementById('divTypeFooter_'+selectedTypeId) == undefined || document.getElementById('divTypeFooter_'+selectedTypeId) == null) {			
			GlobalHTMLUtils.createAppendHTMLEntity('div', 'divTypeFooter_'+selectedTypeId , 'footer', 'visible', '', '', bodyTypeDiv);
		} 		 
		var footerEdit  = "<div id='footer_edit'><br/>";
		    footerEdit += '<hr/><p><font color="red">Red Color Property</font> are Mandatory<br/><font color="red">Red Color Type</font>  are mandatory  </p>';
		    footerEdit += "<input type='button' class='btn btn-primary btn-xs' id='GoUpdate'  value='Update "+typeMapViaId[selectedTypeId].name+" Properties' onclick='DisplayFormUpdateNode.saveUpdatedNode(\"" + nodeUuid + "\")' />";
		    footerEdit  += "<input type='reset' value='Cancel' onclick='DisplayFormUpdateNode.updateNode_cancel(\""+nodeUuid+"\")' /</div><div id='error_messages'></div>" ;
		$( "#divTypeFooter_"+selectedTypeId).append(footerEdit)	;
		
		// display old node details in its division
		var  bodyDivProperty = $( "#divTypeProperty_"+selectedTypeId);  	
		DisplayFormUtils.addEditDivsForANodeDetails  (bodyDivProperty, nodeUuid );				
		DisplayFormUpdateNode.displayNodeDetailsForEditing( selectedTypeId, nodeUuid);
				
		  //  keep track of all divisions  created  
	    var divTypeDetails = {};
	        divTypeDetails = {type :selectedTypeId.toString(), divCreated : true, name: typeMapViaId[selectedTypeId].name, times: 1};
	    divTypes[selectedTypeId] =  divTypeDetails;  
		
	    var  bodyDivRelated  =  $( "#divTypeRelatedNodes_"+selectedTypeId);	
	    var list = [];
		list = DisplayFormUtils.addDivs ( selectedTypeId, bodyDivRelated, list   );
		
			    
	    console.log(" nodesToUpdate "+ nodesToUpdate);
	    var object = {type : selectedTypeId.toString(), relNodeUuid: nodeUuid, mustOrNot : true, action : 'update' };
	    nodesToUpdate.push(object);
	    
	    DisplayFormUpdateNode.findNodesChildren (selectedTypeId,  nodeUuid );  
	   // add the ADD button for optional which are not created 
	    
	   divTypes.forEach( function (obj ){
		   if( obj.type.toString() != selectedTypeId.toString()){
			   if( document.getElementById('instanceType_'+ obj.type.toString()) == undefined  || document.getElementById('instanceType_'+ obj.type.toString()) == null ){
				  var line = '';
				   textButton = '<input type="button"   value="ADD"   class="btn btn-primary btn-xs"  id="img_'+ obj.type.toString()
					+ '" onclick="DisplayFormUpdateNode.removeAdd(\''+ obj.type.toString()+ '\');   DisplayFormUpdateNode.displayNodeInstanceUpdate(\''+ obj.type.toString()+ '\' , \''+ selectedTypeId + '\', null,'+line+' )"/>';
					DisplayFormUtils.addNodeDetails( $("#nodeCreateDiv_"+obj.type.toString()) , obj.type.toString() );
					$('#divTypeHeader_' + obj.type.toString()).append(textButton);			   			   
			   }
		   }
	   })   
   }

	DisplayFormUpdateNode.getTypesAndRelationshipsOfNode = function( typeId  ) {
		//   reset all needed global variables
		//   typeListFound  ---- 
		//   elementFound  ----- 
		//   typeListFoundDetails  --- 
		//   listAllNodes  ---
		//   divTypes 
		DisplayFormUtils.resetGV ();		
		DisplayNewFormUtils.findAllTypesRelated( typeId ); 

		elementFound = typeListFound.slice();
		var elements = DisplayFormUtils.builtDataModelGraphElements(typeId);  // build the elements for the Data Model 
		
		DisplayNewFormUtils.builtListOfRelations(typeListFound  );	
		console.log(" typeListFound contains "+typeListFound );	
		
		DisplayFormUtils.showDataModel (typeId,  elements ); 
	}		
	
	DisplayFormUpdateNode.displayNodeDetailsForEditing = function ( selectedTypeId, nodeUuid){
		
		if(!nodeUuid  ){
			console.log(" no Node uuid  given "+ nodeUuid );
			return;
		}   	
    	var value = nodeMap[nodeUuid]; 	
    	if(!value){
    		console.log(" no  details given for the Node  "+ nodeUuid);
			console.log(" Can not Display its properties");
			return;
    	}		
	    var tempType = typeMapViaId[selectedTypeId];
		var instEditDiv       = $("#form_inst_edit_"+nodeUuid );
//		    instEditDiv.html('');			

		var tableEditInstProps = '<br /><table border="2">';	

		var listDates = [];
		if($.isEmptyObject(tempType.typeProperties)){
			tableViewInstProps = 'NO properties were defined ';
			tableEditInstProps = '';			
		}else {		
				$.each( tempType.typeProperties, function( pkey, pvalue ) {								
				    var inputpropEditRow ='';
				    var propValue, styling ='';			
					// build a Row for each property 
					// find the property value in nodeMap
					$.each( value.typeProperties, function( nodekey, nodevalue ) {	
						if( pkey == nodekey){
					    	propValue = nodevalue.value;
					    }
					});										
					inputpropEditRow = '<tr id="props">';
					if(pvalue.isMandatory){
						styling = 'style="background-color:yellow"';
						inputpropEditRow += '<th style="color:red;width:100px">' ;
						}
					else{  
						inputpropEditRow += '<th width="100px"> ';
						}							

					inputpropEditRow +=  '<input type="text" name="propertyName" value="' + pvalue.name + '"  disabled /> <input type="hidden" name="propertyId" value="'+pvalue.id+'">';							
					if( (propValue != null )&& (propValue != 'undefined' ) ){	
						
						switch(pvalue.propertyType) {
			    	    case "FILE":
			    	    	// file for show
							var mediaType = NodeUtils.convertNodeFilePropertyValueMediaType(propValue);		
							// file for old
							inputpropEditRow += '<input id="value_'+nodeUuid+'" type="file" name ="value" value="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue)+'" disabled style="display:none;"/>';
							if (mediaType.includes("image/")) {
								inputpropEditRow += '<a target="_blank" href="'+NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue)+'" class="imgthumb"><img id="image_file_output_fix_'+pvalue.id + '" src="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue)+'" height="50" width="50" style="display:none;"></a>';
							} else {
								inputpropEditRow += '<a id="other_file_output_fix_' + pvalue.id + '" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue)+'" style="display:none;"></a>';
							}		
														
							// file for new
							inputpropEditRow += '</td><td><input id="newValue_'+nodeUuid+'" type="file" name ="newValue" value="'+NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue)+'" onchange="GlobalUtils.showFile(event, \''+pvalue.id+'\')"/>';
							if (mediaType.includes("image/")) {
								inputpropEditRow += '<a  target="_blank" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue) + '" id="show_image_file_output_' +  pvalue.id + '"  ><img id="image_file_output_' + pvalue.id + '" src="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue) + '" height="50" width="50" style="display:;"></a>'
								 				 + '<a id="other_file_output_' + pvalue.id + '" style="display:none;"></a>';
							} else {
								inputpropEditRow += '<img id="image_file_output_' + pvalue.id + '" height="50" width="50" style="display:none;">'
				 				 				 + '<a id="other_file_output_' + pvalue.id + '" href="' + NodeUtils.convertNodeFilePropertyValueToDataUrl(propValue) + '" style="display:;">' + propValue.filename + '</a>';
							}				    	    
			    	        break;
						case "DATE":
							inputpropEditRow +=  '<input type="hidden" name ="value"  id="value_'+nodeUuid+'"     value="'+ propValue +'"  />'  ;
							inputpropEditRow +=  '</td><td><input type="text"   name ="newValue"  id= "'+nodeUuid+'_date_'+pvalue.id+'"    value="'+ propValue +'"  />';
							listDates.push(pvalue.id );							
							break;
						case "INTEGER":
							inputpropEditRow +=  '<input type="hidden" name ="value"  id="value_'+nodeUuid+'"     value="'+ propValue +'"  />'  ;
							 inputpropEditRow +=  '</td><td><input type="text"   name ="newValue"  id= "newValue_'+nodeUuid+'"  onkeypress="return event.charCode >= 48 && event.charCode <= 57 "    value="'+ propValue +'"  />';			
							break;
						case "DOUBLE":
							inputpropEditRow +=  '<input type="hidden" name ="value"  id="value_'+nodeUuid+'"     value="'+ propValue +'"  />'  ;
							inputpropEditRow +=  '</td><td><input type="text"   name ="newValue"  id= "newValue_'+nodeUuid+'"  onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 8 || event.charCode === 46"    value="'+ propValue +'"  />';
							
							break;
						case "CURRENCY":
							inputpropEditRow +=  '<input type="hidden" name ="value"  id="value_'+nodeUuid+'"     value="'+ propValue +'"  />'  ;
							inputpropEditRow +=  '</td><td><input type="text"   name ="newValue"  id= "newValue_'+nodeUuid+'"  onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 8 || event.charCode === 46"    value="'+ propValue +'"  />';
							
							break;	
						default : 
							inputpropEditRow +=  '<input type="hidden" name ="value"  id="value_'+nodeUuid+'"     value="'+ propValue +'"  />'  ;
						    inputpropEditRow +=  '</td><td><input type="text"  id="newValue_'+nodeUuid+'"    name ="newValue"  value="'+ propValue +'"  />';
						}
											
					} else {
						inputpropEditRow +=  '<input type="hidden" name ="value"   id="value_'+nodeUuid+'"   value=""  />'  ;
						if(pvalue.propertyType == 'DATE'  ){
							inputpropEditRow +=  '</td><td><input type="text"  '+styling+'  name ="newValue"  id= "'+nodeUuid+'_date_'+pvalue.id+'"    value=""  />';
							listDates.push(pvalue.id );						
						}else if (pvalue.propertyType == "FILE") {
							inputpropEditRow += '</td><td><input id="newValue_'+nodeUuid+'" type="file" name ="newValue" value="" onchange="GlobalUtils.showFile(event, \'' + pvalue.id + '\')" style="background-color:yellow"/>'
			  				 + '<a href="" id="show_image_file_output_' + pvalue.id + '"><img id="image_file_output_' + pvalue.id + '" height="50" width="50" style="display:none;"></a>'
			  				 + '<a id="other_file_output_' + pvalue.id + '" style="display:none;"></a>';
						}else {
							inputpropEditRow +=  '</td><td><input type="text"   id="newValue_'+nodeUuid+'" '+styling+'   name ="newValue"  value=""  />';
						}	
					}						

					inputpropEditRow +=  '<input type="hidden" name="propertyType" value="' + pvalue.propertyType + '">('+pvalue.propertyType+')</td></tr>';								
					tableEditInstProps += inputpropEditRow;	
				});		

				tableEditInstProps = tableEditInstProps + "</table>";			
		}
	
		instEditDiv.append(tableEditInstProps);	
				
		for (var i=0; i< listDates.length; i++){
        	$("#"+nodeUuid+"_date_"+listDates[i]).datepicker({
        		changeMonth: true,
      	        changeYear: true,
        		dateFormat: "yy-mm-dd",
        		yearRange : "1950:"+(new Date).getFullYear()
        	});
        }			
	}	
			                                           
	
	
	DisplayFormUpdateNode.findNodesChildren  = function (selectedTypeId,  nodeUuid ){ 
		historyNode = [];
		if(!nodeUuid  ){
			console.log(" no Node uuid  given "+ nodeUuid );
			return null;
		}  
		console.log( nodeMap[nodeUuid].name +" node type passed ");
		console.log( selectedTypeId + " type passed ");
				
    	if( divTypes[Number(selectedTypeId)]){
	    	for( var indNode = 0; indNode < listAllNodes.length; indNode++){
	    		var currElement = listAllNodes[indNode];
	    		if( currElement.currNodeType.toString() == selectedTypeId.toString() ){
	    			if( divTypes[Number(currElement.relNodeType)] ){      
	    				// should get all nodes children of nodeUuid and of Type : currElement.relNodeType
	    				// build json for API call
	    				var jsonData =  DisplayNewFormUtils.buildJsonGetNodesFromEntryNodes ( nodeUuid, currElement.relNodeType );
	   				    // call API	
	    				historyNode = [];
	   				    DisplayNewFormUtils.getNodesFronEntry ( jsonData );  // found nodes are returned in historyNode
	   				    
	   				    if( !$.isEmptyObject(historyNode) &&  (historyNode.length >= 1)   ){
	   				    	var listChildren = [];
	   				    	for ( var child=0; child < historyNode.length; child++ ){
	   				    		listChildren.push(historyNode[child]);
	   				    	}
	   				    	if(!nodeMap[nodeUuid].children[currElement.relNodeType]) {
	   				    		nodeMap[nodeUuid].children[currElement.relNodeType] =listChildren;
	   				    	}	   				    					    	
	   				        if( currElement.typeNode ) { 
	   				        	$('#divTypeHeader_' + currElement.relNodeType).css({'color' : 'red','font-size' : '150%'});
	   				        }
	   				        var line = '';  
	   				         line += '<div><div  id="instanceType_'+currElement.relNodeType+'"  data-nbInstance = "'+(historyNode.length)+'" style="border-left: solid #2299cc ;"><br/>'; 
	   				        var subElement = ''; 
	   				        for ( var child = 0; child < historyNode.length; child++ ){  
	   				        	 
	   				           subElement = subElement + DisplayFormUpdateNode.oneNodeDivsActions ( currElement.relNodeType,  historyNode[child], selectedTypeId,  nodeUuid  );

	   				        }
	   				        line = line + subElement ;
	   				        var restriction     = NodeUtils.findRestriction (typeMapViaId[currElement.relNodeType]);	
	   				         line += '<h4>Section Create/search</h4>';
		   				    if( restriction != 'ROOTONLY' )	{    		
		   						line += '<input type="radio" class="createOptions" name="mustConn_'+currElement.relNodeType+'" data-typeBeg="'+selectedTypeId+'"  value="create" onclick="DisplayFormUpdateNode.showUpdateDiv('+currElement.relNodeType+', '+selectedTypeId+')"/>Add New     ';		    					    	
		   					}	    		    				    	
		   					line += '<input  type="radio" class="searchOptions"  name="mustConn_'+currElement.relNodeType+'"  data-typeBeg="'+selectedTypeId+'"  value="use" onclick="DisplayFormUpdateNode.showUpdateDiv('+currElement.relNodeType+', '+selectedTypeId+')"/>Search New <br/>';			    			    			    	   	    
		   			          
		   					if( restriction != 'ROOTONLY' )  {	
		   					  line += '<div id="nodeCreateDiv_'+currElement.relNodeType+'" style="display:none;visibility:hidden"></div>';	
		   					}		
		   					line += '<div id="nodeDisplayDiv_'+currElement.relNodeType+'" style="display:none;visibility:hidden"></div>';
		   					line += '<div id="DetailsNodeDisplay_'+currElement.relNodeType+'" class="DetailsNode" style="display:none;visibility:hidden"></div><br/>';
	   				        line = line + '</div>';
			   				$('#divTypeProperty_'+currElement.relNodeType).append(line);
			   				for ( var child=0; child < historyNode.length; child++ ){
			   					   DisplayFormUpdateNode.displayNodeDetailsForEditing( currElement.relNodeType , historyNode[child]);
			   				}
			   				
			   				
			   				
	   				      
						 }
		   			}else {
		   				    	// missing required element   built the normal add process 
	
	   				    } 
	    				    			
	    		}else if( (currElement.relNodeType.toString() == selectedTypeId.toString())  &&  divTypes[Number(currElement.relNodeType)] ){      
	    				// should get all nodes children of nodeUuid and of Type : currElement.relNodeType
	    				// build json for API call
	    				var jsonData =  DisplayNewFormUtils.buildJsonGetNodesFromEntryNodes ( nodeUuid, currElement.relNodeType );
	   				    // call API	
	    				historyNode = [];
	   				    DisplayNewFormUtils.getNodesFronEntry ( jsonData );  // found nodes are returned in historyNode
	   				    
	   				 if( !$.isEmptyObject(historyNode) &&  (historyNode.length >= 1)   ){
	   				    	var listChildren = [];
	   				    	for ( var child=0; child < historyNode.length; child++ ){
	   				    		listChildren.push(historyNode[child]);
	   				    	}
	   				    	if(!nodeMap[nodeUuid].children[currElement.relNodeType]) {nodeMap[nodeUuid].children[currElement.relNodeType] =listChildren;}
	   				        if( currElement.typeNode ) { 
	   				        	$('#divTypeHeader_' + currElement.relNodeType).css({'color' : 'red','font-size' : '150%'});
	   				        }   				           
	   				        var line = '';
	   					    line += '<div  id="instanceType_'+currElement.relNodeType+'" class="instanceType_'+currElement.relNodeType+'"  style="border-left: solid #2299cc ;"><br/>';
	   					    line += '<input type="radio"  class="updateOptions" data-typeBeg = "'+currElement.currNodeType+'"    data-valbeg = "'+nodeUuid+'" data-valend = "'+historyNode[0]+'" name="updateOption_'+currElement.relNodeType+'"  value="update" >Update  ';
	   					    line += '<input type="radio"  class="updateOptions" data-typeBeg = "'+currElement.currNodeType+'"    data-valbeg = "'+nodeUuid+'" data-valend = "'+historyNode[0]+'" name="updateOption_'+currElement.relNodeType+'"  value="replace" >Replace <br/>   ';			   					    
	   					    line += '<div id="nodeUpdateDiv_'+currElement.relNodeType+'" style="display:none;visibility:hidden"></div><br/>';		
	   						DisplayFormUpdateNode.displayNodeInstanceUpdate(currElement.relNodeType, currElement.currNodeType, historyNode[0], line );
	   				    }
	    			}
	    	}
	  	}else {
	  		// there is no division for this Type
	  	}	  	
	 }
	DisplayFormUpdateNode.oneNodeDivsActions = function ( type,  nodeChildUuid, selectedTypeId,  nodeUuid  ){
		
		 var line = '';
		  		  	
		  line  += '<div id="form_inst_edit_'+ nodeChildUuid+'" class="form_inst_edit container">';
		  line  += '<h4> Section update/delete</h4>';
		  line  += '<input type="radio"  class="updateOptions"  data-typeBeg ="'+selectedTypeId+'"    data-valbeg = "'+nodeUuid+'" data-valend ="'+nodeChildUuid+'" name="updateOption_'+nodeChildUuid+'"  value="update"  checked="checked">Update  ';
		  line  += '<input type="radio"  class="updateOptions"  data-typeBeg ="'+selectedTypeId+'"    data-valbeg = "'+nodeUuid+'" data-valend ="'+nodeChildUuid+'" name="updateOption_'+nodeChildUuid+'"  value="delete" >Delete';	
		  line  +='</div>';
		  		
		  console.log(line);
		  return line;
		
	}

//	DisplayFormUpdateNode.showAddNodeInstance = function( nodeUuid, type, typeBeg ){
//		var line = '';
//		var ableToCreate;
//		var restriction = NodeUtils.findRestriction (typeMapViaId[type]);	 	
//	    
//	    if( restriction != 'ROOTONLY' )	{    		
//		  	line += '<input type="radio" class="createOptions" name="'+nodeUuid+'_mustConn_'+type+'" data-typeBeg="'+typeBeg+'"  value="create" onclick="DisplayFormUpdateNode.showUpdateDiv('+type+', '+typeBeg+')"/>Create New     ';		    					    	
//	   	}	    		    				    	
//	    line += '<input  type="radio" class="searchOptions"   name="'+nodeUuid+'_mustConn_'+type+'"  data-typeBeg="'+typeBeg+'"  value="use" onclick="DisplayFormUpdateNode.showUpdateDiv('+type+', '+typeBeg+')"/>Search <br/>';			    			    			    	   	    
//	    if( restriction != 'ROOTONLY' )  {	
//		    	line += '<div id="nodeCreateDiv_'+type+'" style="display:none;visibility:hidden"></div>';	
//		}		
//		line += '<div id="nodeDisplayDiv_'+type+'" style="display:none;visibility:hidden"></div>';
//		line += '<div id="DetailsNodeDisplay_'+type+'" class="DetailsNode" style="display:none;visibility:hidden"></div><br/>';							
//		return line;	
//	}

	DisplayFormUpdateNode.displayNodeInstanceUpdate = function ( type,  typeBeg  , nodeUuid , line){				
		if(!type) {
	    	  console.log(" No type Id defined ");
	    	  return null;
	      } 								    		    		    	            		   		  		   
	    var other = DisplayFormUpdateNode.showAddNode ( type, typeBeg  );
	    if(!line ){
	    	line = other;
	    }else  line = line + other;
	    line += '</div>';	
	    
		$('#divTypeProperty_'+type).append(line);		
			
		var  bodyDivProperty = $( "#nodeUpdateDiv_"+type);  	
		if ( document.getElementById("nodeUpdateDiv_"+type ) != undefined &&  document.getElementById("nodeUpdateDiv_"+type )!= null ){
			if(!nodeUuid  ){
				console.log(" no Node uuid  given "+ nodeUuid );
				return null;
			}  
			DisplayFormUtils.addEditDivsForANodeDetails  (bodyDivProperty, nodeUuid );
			DisplayFormUpdateNode.displayNodeDetailsForEditing( type , nodeUuid);
			DisplayInterfaceUtils.showDivision('nodeUpdateDiv_', type);
		}

		var instToAppend =  $( "#divTypeRelatedNodes_"+type);		
		var list = [];
			list = DisplayFormUtils.addDivs ( type, instToAppend, list   );
				    
		if(nodeUuid  ){
			for( var k=0; k<list.length; k++){
				DisplayFormUpdateNode.findNodesChildren (list[k].type,  nodeUuid ); 
			}
		}else {
		
			for( var k=0; k<list.length; k++){
				if( document.getElementById('nodeUpdateDiv_'+ list[k].type) == undefined  || document.getElementById('nodeUpdateDiv_'+ list[k].type) == null ){
					  var line = '';
					   textButton = '<input type="button"   value="ADD"   class="btn btn-primary btn-xs"  id="img_'+ list[k].type
						+ '" onclick="DisplayFormUpdateNode.removeAdd(\''+ list[k].type+ '\');   DisplayFormUpdateNode.displayNodeInstanceUpdate(\''+ list[k].type+ '\' , \''+ type + '\', null,'+line+' )"/>';
						DisplayFormUtils.addNodeDetails( $("#nodeCreateDiv_"+list[k].type) , list[k].type );
						$('#divTypeHeader_' + list[k].type).append(textButton);			   			   
				   }
			}
		}		
	} 
	DisplayFormUpdateNode.removeAdd = function (typeId ){
		document.getElementById("img_"+typeId).remove();
	}
	
	
	
	DisplayFormUpdateNode.showAddNode = function( type, typeBeg ){
		var line = '';
		var ableToCreate;
		var restriction = NodeUtils.findRestriction (typeMapViaId[type]);	 	
	    
	    if( restriction != 'ROOTONLY' )	{    		
		  	line += '<input type="radio" class="createOptions" name="mustConn_'+type+'" data-typeBeg="'+typeBeg+'"  value="create" onclick="DisplayFormUpdateNode.showUpdateDiv('+type+', '+typeBeg+')"/>Create New     ';		    					    	
	   	}	    		    				    	
	    line += '<input  type="radio" class="searchOptions"   name="mustConn_'+type+'"  data-typeBeg="'+typeBeg+'"  value="use" onclick="DisplayFormUpdateNode.showUpdateDiv('+type+', '+typeBeg+')"/>Search <br/>';			    			    			    	   	    
	    if( restriction != 'ROOTONLY' )  {	
		    	line += '<div id="nodeCreateDiv_'+type+'" style="display:none;visibility:hidden"></div>';	
		}		
		line += '<div id="nodeDisplayDiv_'+type+'" style="display:none;visibility:hidden"></div>';
		line += '<div id="DetailsNodeDisplay_'+type+'" class="DetailsNode" style="display:none;visibility:hidden"></div><br/>';							
		return line;	
	}
	

	DisplayFormUpdateNode.showUpdateDiv = function (parent, typeId ){ 
    	if(!parent ){
    		console.log(" no Type Id  provided: cannot show or hide divisions "); 
    		return;
    	};

    	var valueSelected = $('input[name="mustConn_'+parent+'"]:checked').val();   	
    	if(!valueSelected){
    		console.log(" No value selected  "+ valueSelected);	
    		return;
    	}

    	 $('input[name="mustConn_'+parent+'"]').parent('td').css("backgroundColor", "");   	 
    	 switch(valueSelected) {
    	    case "create":
    	    	$("#nodeCreateDiv_"+parent).empty();  		
	    		DisplayFormUtils.addNodeDetails( $("#nodeCreateDiv_"+parent) , parent );
	    		DisplayInterfaceUtils.showDivision('nodeCreateDiv_', parent );
	    		//  -- hide the select option 
	    		DisplayInterfaceUtils.hideDivision('nodeDisplayDiv_', parent);
	    		DisplayInterfaceUtils.hideDivision('DetailsNodeDisplay_', parent);
	    		// --  show the create option
    	        break;
    	    case "use":
    	    	// build the list of nodes    		
	    		$("#nodeDisplayDiv_"+parent).empty();
	    		DisplayNewFormUtils.generateNodesSearchForm("nodeDisplayDiv_"+parent, parent);
	    		DisplayInterfaceUtils.showDivision('nodeDisplayDiv_',parent);		    		
	    		// hide the create  option 
	    		DisplayInterfaceUtils.hideDivision('nodeCreateDiv_', parent);
	    		// show the list to select from 
    	        break;
    	    default:
    	       ;
    	} 	 	          					    
	} 

	
	//=========================================== Functions for Saving UPDATE NODE ==============================	
	DisplayFormUpdateNode.saveUpdatedNode = function (nodeUuid ){
		if(!nodeUuid  ){
			console.log(" no  uuid  given "+ nodeUuid );
			return;
		}	
		var node = {}, name='', typeBeg = null, type= null, Uuid = null, UuidBeg = null;
		var nbCreate=0, nbUpdate = 0, nbUse= 0;
		var optCreate= $('input[type=radio].createOptions:checked');
		$(optCreate).each(function(i){	
		  name        = $(this).attr('name');
		  typeBeg     = $(this).attr('data-typeBeg');
		  type        = name.slice(9); 
		  node        = {};
		  node        = {type : type,typeBeg: typeBeg , currNodeUuid: null, relNodeUuid: null, mustOrNot :typeListFoundDetails[type].mustNode , action : 'createNode' };
	      nodesToUpdate.push(node);	
	      nbCreate++;
		});
		console.log(" there are "+nbCreate  +" nodes to create ");
		$('#console-log').append("there are "+nbCreate  +" nodes to create ");
		var optUpdate = $('input[type=radio].updateOptions:checked');
		$(optUpdate).each(function(i){	
			  name = $(this).attr('name');
			  Uuid = $(this).attr('data-valend');
			  Uuidbeg = $(this).attr('data-valbeg');
			  typeBeg = $(this).attr('data-typeBeg');
			  var action = $(this).attr('value');
//			  var type = name.slice(13); 
			  type = nodeMap[Uuid].typeId;
			  node = {};
			  node  = {type : type, typeBeg: typeBeg, currNodeUuid: Uuidbeg, relNodeUuid: Uuid, mustOrNot :typeListFoundDetails[type].mustNode , action : action };
		      nodesToUpdate.push(node);	
		      nbUpdate++;
			});
		console.log(" there are "+nbUpdate  +" nodes to update/delete ");
		$('#console-log').append("there are "+nbUpdate  +" nodes to update/delete ");
		
		var optSearch= $('input[type=radio].searchOptions:checked');
		$(optSearch).each(function(i){	
			name = $(this).attr('name');
			type = name.slice(9);
			typeBeg = $(this).attr('data-typeBeg');
			var ele      = document.getElementById('node_list_'+type);
		   	if ( !ele ){
		   		console.log("could not find the select field to read from ");
		   		listErrors.push("button Search is clicked for type "+typeMapViaId[type].name+" but missing list of options");
		   		return  null;
		   	}
			var Uuid     = ele.options[ele.selectedIndex].value;
			node = {};
			node  = {type : type, typeBeg: typeBeg, currNodeUuid: null, relNodeUuid: Uuid, mustOrNot :typeListFoundDetails[type].mustNode , action : 'use' };
			nodesToUpdate.push(node);	
	        nbUse++;
		});
		console.log(" there are "+nbUse  +" nodes to use ");
		$('#console-log').append("there are "+nbUse  +" nodes to use ");
		
		
		 for ( var mem = 0; mem < nodesToUpdate.length; mem++ ){	 
			 if ( (nodesToUpdate[mem].action == 'createNode') && (nodesToUpdate[mem].typeBeg ==  nodeMap[nodeUuid].typeId) && (nodesToUpdate[mem].currNodeUuid == null )  ){
				 nodesToUpdate[mem].currNodeUuid = nodeUuid;
			 }else if( (nodesToUpdate[mem].action == 'use') &&  (nodesToUpdate[mem].typeBeg ==  nodeMap[nodeUuid].typeId) && (nodesToUpdate[mem].currNodeUuid == null )   ){
				 nodesToUpdate[mem].currNodeUuid = nodeUuid;
			 }
		 }
	
		// verify that for each replace there either a create or use ----- we could have update & create for the same type		
		if( $.isEmptyObject(nodesToUpdate)  ){
			// error 
		}else {			
			for( var node = 0; node< nodesToUpdate.length; node++){
				
				switch (nodesToUpdate[node].action  ){
				case "createNode" :
					   console.log(" Node of type : "+typeMapViaId[nodesToUpdate[node].type].name + "  will be created" );
					   console.log("%c Attempting to add a new Node for this type :" + typeMapViaId[nodesToUpdate[node].type].name , "color:purple" );	
						var properties=[];	
							properties = NodeUtils.retrieveNodePropertiesFromForm (nodesToUpdate[node].type , 'form_inst_add_val_');	
						// look if it is optional or mandatory 	
						if(properties[properties.length-1]){
							for( var ind = 0; ind < listErrorsFromRetrieval.length  ; ind++){
								document.getElementById(listErrorsFromRetrieval[ind] ).style.backgroundColor = "yellow"; 
							}
							listErrorsFromRetrieval =[];
							console.error(" do not continue the saving Process -- error in retrieving properties for type "+nodesToUpdate[node].type);
							$('#console-log').append("<p style='color:red'>Node properties retrieval  Failed for type ."+typeMapViaId[nodesToUpdate[node].type].name +"</p>");
							listErrors.push('no properties found for  '+typeMapViaId[nodesToUpdate[node].type].name);
							$('#error_messages').append(" do not continue the saving Process -- error in retrieving properties for type "+typeMapViaId[nodesToUpdate[node].type].name );
							return;
						}
						properties.pop();   // everything is fine remove boolean					
						nodesToUpdate[node].properties = properties;	
					   
						DisplayNewFormUtils.SaveNodeCreated (nodesToUpdate[node].type, nodesToUpdate[node].properties ); 
			    		 if(!listInstUuids[0]){
								console.log("failure in creating  node for  "+ nodesToUpdate[node].type);
								$('#console-log').append("<p style='color:red'>Node creation Failed for type :"+typeMapViaId[nodesToUpdate[node].type].name +" </p>");
								 nodesToUpdate[node].process = 'createFailed';
								 $('#error_messages').append("<p style='color:red'>Node creation Failed for type :"+typeMapViaId[nodesToUpdate[node].type].name +" </p>" );
								return;
						 }
			    		 nodesToUpdate[node].relNodeUuid = listInstUuids[0];
			    		 nodesToUpdate[node].process = 'createSaved';
			    		 
			    		 for ( var mem = 0; mem < nodesToUpdate.length; mem++ ){
			    			 if( mem != node ){
			    				 if ( (nodesToUpdate[mem].action == 'createNode') &&(nodesToUpdate[mem].typeBeg ==  nodesToUpdate[node].type) && (nodesToUpdate[node].currNodeUuid == null )  ){
			    					 nodesToUpdate[node].currNodeUuid = listInstUuids[0];
			    				 }
			    			 }
			    		 }
			    		 
						 console.log("%cNode creation successfully for type "+typeMapViaId[nodesToUpdate[node].type].name , "color:blue");
						 $('#console-log').append("<p style='color:blue'>Node creation successfully for type "+typeMapViaId[nodesToUpdate[node].type].name +"</p>"); 						  
					break;
				case "use":					
						// create edge 
					     console.log(" Need to create an edge  to node of  type : "+typeMapViaId[nodesToUpdate[node].type].name );

					break;
				case "delete":
					console.log(" Need to delete  an edge  from node of  type : "+typeMapViaId[nodesToUpdate[node].type].name );
					// given node beg and node end and connections get edges 
					var element      = nodesToUpdate[node];
					
					var actionToDo = '';                                                      //  = 1 delete Both; = 0 do not delete ; = 2 delete one 
					if( element.currNodeUuid && element.relNodeUuid  ){
						var conn1 = NodeUtils.findConnection ( element.typeBeg, element.type );	
						var conn2 = NodeUtils.findConnection ( element.type,    element.typeBeg );	
						
						//  case  connection exists and optional 
						if(conn1.length >= 1){
							if(Number(conn1[0].minRel) == 0 ){
								if(conn2.length >= 1){
									if(Number(conn2[0].minRel) == 0 ){
										actionToDo = 'deleteBoth';           //  delete edges
										DisplayFormUpdateNode.removeEdge(conn1[0].id, element.typeBeg, element.type,     element.currNodeUuid,  element.relNodeUuid);
										DisplayFormUpdateNode.removeEdge(conn2[0].id, element.type,    element.typeBeg,  element.relNodeUuid ,  element.currNodeUuid);
										nodesToUpdate[node].process = "edgeDeleted";
										break;
										
									}else {
										nodesToUpdate[node].process = "edgeNotDeleted";
										console.log("cannot detach node --  break the data model");
										break;
									}
								
								// no connection in the opposite way  ---  delete edge 
								}else {  
									actionTodo = 'deleteOne';
									DisplayFormUpdateNode.removeEdge(conn1[0].id, element.typeBeg, element.type, element.currNodeUuid, element.relNodeUuid);							
									nodesToUpdate[node].process = "edgeDeleted";
									break;
								}
							}
							// connection is not optional ==== verify what is minimum of children required				
							var children   = GlobalNodeUtils.getAllChildrenNodesUnderType(element.currNodeUuid, element.type);
							var nbOfChildren = Object.keys(children).length;
								
							if( nbOfChildren > Number(conn1[0].minRel) ){  // possible to delete
								if($.isEmptyObject( conn2)  ){
									actionTodo = 'deleteOne';
									DisplayFormUpdateNode.removeEdge(conn1[0].id, element.typeBeg, element.type, element.currNodeUuid, element.relNodeUuid);							
									nodesToUpdate[node].process = "edgeDeleted";
									break;
									
								}
								if(conn2.length >= 1){
									if(Number(conn2[0].minRel) == 0 ){
										actionToDo = 'deleteBoth';           //  delete edges
										DisplayFormUpdateNode.removeEdge(conn1[0].id, element.typeBeg, element.type,     element.currNodeUuid,  element.relNodeUuid);
										DisplayFormUpdateNode.removeEdge(conn2[0].id, element.type,    element.typeBeg,  element.relNodeUuid ,  element.currNodeUuid);
										nodesToUpdate[node].process = "edgeDeleted";
										break;
									}
	
								//   verify the opposite way 
									var children2   = GlobalNodeUtils.getAllChildrenNodesUnderType(element.relNodeUuid, element.typeBeg);
									var nbOfChildren2 = Object.keys(children2).length;
									if( nbOfChildren2 > Number(conn2[0].minRel) ){ 
										// may be to verify that other than the node in element.currNodeUuid
										actionToDo = 'deleteBoth';           //  delete edges
										DisplayFormUpdateNode.removeEdge(conn1[0].id, element.typeBeg, element.type,     element.currNodeUuid,  element.relNodeUuid);
										DisplayFormUpdateNode.removeEdge(conn2[0].id, element.type,    element.typeBeg,  element.relNodeUuid ,  element.currNodeUuid);
										nodesToUpdate[node].process = "edgeDeleted";
										break;
									}								
							  }							
							}else {
								nodesToUpdate[node].process = "edgeNotDeleted";
								console.log("cannot detach node --  break the data model");
								break;
							}		
						}
		
					}else {
						// missing start and end nodes uuids
					}            
					break;
				case "update" :
					 console.log(" Need to update Node of type : "+typeMapViaId[nodesToUpdate[node].type].name );
					DisplayFormUpdateNode.saveUpdateANode( node );	
					break;
				default:
					;
				}				
			}	
		}	
		
		DisplayFormUpdateNode.createlistEdges();
		DisplayNewFormUtils.listAll (nodesToUpdate[0].type, 'mandatory' );						
	}
	
	DisplayFormUpdateNode.removeEdge = function ( conn1Id, typeBeg, type, currNodeUuid, relNodeUuid ){
		var edgeUuid1 = DisplayFormUpdateNode.getEdgeUuid( conn1Id, typeBeg, type, currNodeUuid,relNodeUuid);
		if( edgeUuid1 !=null ){ DisplayFormUpdateNode.deleteEdge( conn1Id, typeBeg, type, currNodeUuid,relNodeUuid, edgeUuid1    );  }
	}
	
	
	
	DisplayFormUpdateNode.createlistEdges = function(  ){
		var addEdge = false;
		    createEdgeList = [];
	    var  typeBeg = null, typeEnd = null;
	    for( var node = 0; node< nodesToUpdate.length; node++){
			if(nodesToUpdate[node].action  == 'createNode'){
				if (nodesToUpdate[node].process == 'createSaved'){
					var nodeEdge = nodesToUpdate[node];
					typeBeg = nodeEdge.typeBeg;
					typeEnd = nodeEdge.type;
					
					var conns      = GlobalConnUtils.findConnsBySourceAndTarget ( typeBeg, typeEnd );
					var otherconns = GlobalConnUtils.findConnsBySourceAndTarget ( typeEnd, typeBeg );
					var children   = GlobalNodeUtils.getAllChildrenNodesUnderType(nodeEdge.currNodeUuid, typeEnd);
					var numberOfChildren = Object.keys(children).length;
					if(!$.isEmptyObject( conns)){

						if(Number(conns[0].maxRel) != -1 ){
							 if (numberOfChildren >= Number(conns[0].maxRel)) {	
								 console.log(" error Cannot create edge; children maximum reached ");
								 nodesToUpdate[node].connection   = null;
							 }
						}
						nodesToUpdate[node].connection   = conns[0];
						var object = { 
								currNodeType : typeBeg,
								currNodeUuid : nodeEdge.currNodeUuid,
								relNodeType  : typeEnd,
								relNodeUuid  : nodeEdge.relNodeUuid,
								currNodePos  : 'asParent',
								connection   : nodesToUpdate[node].connection,
								typeNode     : nodeEdge.mustOrNot,
								edge         : 'createEdge'
							}
						var conId = nodesToUpdate[node].connection.id;
						addEdge = DisplayFormUtils.checkDuplicateEdgeCreation( createEdgeList, conId , object );
						if(addEdge != null && !addEdge ) {
							createEdgeList.push(object);	
							object = {};
						    console.log("Should create relationship between :"+typeMapViaId[typeBeg].name + " and "+typeMapViaId[typeEnd].name);	
						}
						if(!$.isEmptyObject( otherconns)){
						
							if((otherconns.length == 1)  &&  (otherconns[0].id !=  conId)) {
								object = { 
										currNodeType : typeEnd,
										currNodeUuid : nodeEdge.relNodeUuid,
										relNodeType  : typeBeg,
										relNodeUuid  : nodeEdge.currNodeUuid,
										currNodePos  : 'asParent',
										connection   : otherconns[0],
										typeNode     : nodeEdge.mustOrNot,
										edge         : 'createEdge'
									}
								var conId = otherconns[0].id;
								addEdge = DisplayFormUtils.checkDuplicateEdgeCreation ( createEdgeList, conId , object );
								if(addEdge != null && !addEdge ) {
									createEdgeList.push(object);				
									console.log("Should create relationship between :"+typeMapViaId[typeEnd].name + " and "+typeMapViaId[typeBeg].name);	
								}
								object = {};	
							}									
						}else {
							// there are no connection from child to parent  --- no error 
						}
					}else {
						console.log(" No connection between these two types : "+typeMapViaId[typeBeg].name + " and "+typeMapViaId[typeEnd].name)
					}
										
			}else if (nodesToUpdate[node].process == 'createFailed'  ){
				console.log(" error in creating node; Cannot create edge ");
				nodesToUpdate[node].connection   = null;
			}
		} else {
			if( nodesToUpdate[node].action  == 'use'  ){
				var nodeEdge = nodesToUpdate[node];
				typeBeg = nodeEdge.typeBeg;
				typeEnd = nodeEdge.type;
				for( var j=0; j < listAllNodes.length; j++){
					var currElement = listAllNodes[j];
					if((currElement.currNodeType == typeBeg ) &&  (currElement.relNodeType == typeEnd)){
						nodesToUpdate[node].connection   = currElement.connection;				
						console.log("Should create relationship between :"+typeMapViaId[typeBeg].name + " and "+typeMapViaId[typeEnd].name);
						break;
					}
				}
				var object = { 
						currNodeType : typeBeg,
						currNodeUuid : nodeEdge.currNodeUuid,
						relNodeType  : typeEnd,
						relNodeUuid  : nodeEdge.relNodeUuid,
						currNodePos  : 'asParent',
						connection   : nodesToUpdate[node].connection,
						typeNode     : nodeEdge.mustOrNot,
						edge         : 'createEdge'
					}
				var conId = nodesToUpdate[node].connection.id;
				addEdge = DisplayFormUtils.checkDuplicateEdgeCreation( createEdgeList, conId , object );
				if(addEdge != null && !addEdge ) {
					createEdgeList.push(object);				
				    console.log("Should create relationship between :"+typeMapViaId[typeBeg].name + " and "+typeMapViaId[typeEnd].name);	
				}
				var otherConn = NodeUtils.findConnection ( typeEnd, typeBeg );	
				if((otherConn.length == 1)  &&  (otherConn[0].id !=  conId)) {
					object = { 
							currNodeType : typeEnd,
							currNodeUuid : nodeEdge.relNodeUuid,
							relNodeType  : typeBeg,
							relNodeUuid  : nodeEdge.currNodeUuid,
							currNodePos  : 'asParent',
							connection   : otherConn[0],
							typeNode     : nodeEdge.mustOrNot,
							edge         : 'createEdge'
						}
					var conId = otherConn[0].id;
					addEdge = DisplayFormUtils.checkDuplicateEdgeCreation ( createEdgeList, conId , object );
					if(addEdge != null && !addEdge ) {
						createEdgeList.push(object);				
						console.log("Should create relationship between :"+typeMapViaId[typeEnd].name + " and "+typeMapViaId[typeBeg].name);	
					}
					object = {};	
			}
			
		} 	    	   
	  }
	    }
	    
	    if(! $.isEmptyObject(createEdgeList)){
	    	console.log("create edge list is  not empty");
	    	 DisplayFormUpdateNode.createEdges ();	   
	    }
				    
	}
	
   
	DisplayFormUpdateNode.saveUpdateANode  = function ( node){           //   node is an entry in nodesToUpdate list , will save the update for one node 
		   	   
	   var nodeUuid = nodesToUpdate[node].relNodeUuid; 		
	   if(!nodeUuid  ){
			console.log(" no  uuid  given "+ nodeUuid );
			return;
		}			   
	   var typeId         = nodeMap[nodeUuid].typeId;
		if(!typeId){
			console.log(" Error in the process of saving  typeId found  "+ typeId + " nodeUuid found "+ nodeUuid);
			return;
		}
	   var jsonData = {};
		jsonData = DisplayFormUpdateNode.retrievePropertiesForUpdatedNode ( nodeUuid , typeId );
				
		if(!$.isEmptyObject(jsonData)) {
			console.log(" Retrieved Properties are : ");
			console.table(jsonData.properties);
			console.log(" The new ones are :");
			console.table(jsonData.newProperties);	
							
			var doneFunction = function( data ) {
				if($.isEmptyObject(data) && S.isEmptyObject(data.nodes)){
					console.log(" no node returned for save update Node Info ");
					return;
				}				
				console.log("Node Updated "+data.nodes[0].type);		     
				// Save the updated properties 											
				var key = NodeUtils.findUUID (data.nodes[0]);					
				nodeMap[key].typeProperties   = data.nodes[0].typeProperties;
				nodesToUpdate[node].process = 'updateSuccessed';

			};				
			var failFunction = function( xhr, status, error ) {
				console.log("Update Node Properties Error: "+ xhr.status);
				nodesToUpdate[node].process = 'updateFailed';
				 $('#console-log').append("Update Node Properties Error: "+ xhr.status);
			};			
			var api  = new NodeApis();
			api.updateNode(jsonData, doneFunction, failFunction );							
			
		}else {
			nodesToUpdate[node].process = 'errorInJson';
		}										
		      
	}
	
	DisplayFormUpdateNode.retrievePropertiesForUpdatedNode = function( nodeUuid , typeId ){
		     
		   var jsonData = {}, nodeProperties = [], newProperties = [];
		   var property = {}, newproperty = {}, foundError=false;			
		   var sysProperties = [];
		   	   
		// push the uuid to sysProperties	
			property =  NodeUtils.createSysJson(nodeUuid );
			sysProperties.push(property);					
			property = {}; 
		   
		   var instEditDiv = $("#form_inst_edit_" + nodeUuid );	
			// grab the values of node properties from the form
			$(instEditDiv).find('tr#props').each(function (i, propsTr){	
				$(propsTr).find(':input').each(function(i,field){
				     if( ( field.type  == 'text')||(field.type == 'hidden')|| (field.type == 'file')){		 		
				 		if (field.name == 'value')  {   
							  property[field.name] = field.value  
						} else if (field.name == 'newValue') { 
									if (field.type === 'file') {
										newproperty['value'] = field.files[0];
									} else {
										newproperty['value'] = field.value;
									}
							} else { 
								property [field.name] = field.value;
								newproperty[field.name] = field.value;
							} 
				     }						     
				});	
//				console.log(" found this property "+ property + " in this node "+ nodeUuid );			
				if (newproperty.propertyType === "FILE") {
					if( newproperty.value ){
						var file = newproperty.value;
						newproperty.value = {};
						if (file.type.includes("image/")) {
							newproperty.value.file = document.getElementById('image_file_output_' + newproperty.propertyId).src.replace("data:" + file.type + ";base64,", "");
						} else {
							newproperty.value.file = document.getElementById('other_file_output_' + newproperty.propertyId).href.replace("data:" + file.type + ";base64,", "");
						}
						newproperty.value.filename = file.name;
					}
				}
						
				// verify if property has value	
				var isPropMand =  NodeUtils.findPropInType(property.propertyId, typeId);
				if(isPropMand){ // mandatory property
					if(newproperty.value){					
						  newProperties.push(newproperty);
	       		  	      if(property.value  && property.value != 'undefined'){ 
	       		  	    	  nodeProperties.push(property);
	       		  	    	  }	                    		  	
			         } else {
			        	  $(propsTr).append('error- missing Value');
	            		  console.log("Missing Value for Mandatory property : "+ property.propertyName);
	                      foundError= true;
	                 }		                    	  
				}else {   // not mandatory
					if(newproperty.value){                                             // user entered a new value					
						  newProperties.push(newproperty);
		                  if(property.value && property.value != 'undefined' ){ 
		                	  nodeProperties.push(property);
		                	  }				        			
					}else {  // if there was no value and user did not enter a value don't push it
//								  user may have deleted old value  
						if (property.value && property.value!= 'undefined' ){
							       newproperty.value = null;
							       nodeProperties.push(property);
							       newProperties.push(newproperty);
						}			
					}
	        	}
			    property = {}; newproperty ={};
			});		
		   if(! foundError ){		   
		        jsonData["type"]       = typeId.toString();
			   	jsonData.sysProperties = sysProperties;	 
			   	jsonData.properties    = nodeProperties;
			   	jsonData.newProperties = newProperties;				
				instEditDiv.remove();	
				
			   	return jsonData;
		   }else {
			   // found error in properties retrieval 
			   console.log(" Properties retrieval for node  "+nodeUuid+ " failed " );
			   return null;
		   }
		   
	}
	   
	DisplayFormUpdateNode.updateNode_cancel = function ( nodeUuid ){	
		   		   
		    $('div.node_detail').remove();			
			$('.work_addInstance').remove();
			$('.pathFormCreate').remove();
			$('#Header_search').empty();
			nodesToUpdate = [];
		   
			DisplayNewFormUtils.listAll (nodeMap[nodeUuid].typeId, 'mandatory' );	
	       					
	};	

	DisplayFormUpdateNode.getEdgeUuid = function (connId, originType, destinationType, originNode, destinationNode  ){	
		
		var jsonData = {};
		jsonData.connection               = Number(connId);
		jsonData.originType               = Number(originType);
		jsonData.destinationType          = Number(destinationType);
		jsonData.originSysProperties      = [];
		var sysStartNode                  = NodeUtils.createSysJson( originNode);
		jsonData.originSysProperties.push(sysStartNode);
		
		var sysEndNode                    = NodeUtils.createSysJson( destinationNode);
		jsonData.destinationSysProperties = [];
		jsonData.destinationSysProperties.push(sysEndNode);
		
		if(!$.isEmptyObject(jsonData) ){
			var uuid = null; 
			var successFunction = function(data) {
				if(!$.isEmptyObject(data)){
					console.log(' EDGE retrieved successfully');
				    uuid = NodeUtils.findUUID( data[0]);
				    if (uuid != null) {			   	
						if (!edgeMap[uuid]) {
							edgeMap[uuid]= data[0];
						}
				    }else {
				    	console.log(" successful call API did not return the edge uuid");
				    }
				 }else {
				    	console.log(" successful call API did not return the edge value");				    	
				 }
			};
			
			var failFunction = function( xhr, status, error ) {
				$('#console-log').append("<p style='color:red'>Failed to retrieve edge: " + xhr.status + "</p>");
				nodesToUpdate[node].edgeUuid = null;
			};
		   
		    var edgeApi = new EdgeApis();
			edgeApi.getEdge(jsonData, successFunction, failFunction);
			return uuid;
			
		}else {
			return null;
		}				
	}
	
	DisplayFormUpdateNode.deleteEdge = function (connId, originType, destinationType, originNode, destinationNode, edgeUuid){	
		
		var jsonData = {};
		jsonData.connection = Number(connId);
		
		var startNode = {}; 
		startNode.typeIds = [];
		startNode.typeIds.push(Number(originType));		
		var sysStartNode = NodeUtils.createSysJson(originNode); 	
		startNode.sysProperties = [];
		startNode.sysProperties.push(sysStartNode);
		
		var endNode = {}; 
		endNode.typeIds = [];
		endNode.typeIds.push(Number(destinationType));		
		var sysEndNode = NodeUtils.createSysJson(destinationNode); 
		endNode.sysProperties = [];
		endNode.sysProperties.push(sysEndNode);		
		
		var toDeleteEdge = {};
		toDeleteEdge.connection = connId;
		var sysEdge = NodeUtils.createSysJson( edgeUuid);
		toDeleteEdge.sysProperties = [];
		toDeleteEdge.sysProperties.push(sysEdge);
						
		jsonData.startNode    = startNode;
		jsonData.endNode      = endNode;
		jsonData.toDeleteEdge = toDeleteEdge;
						
		console.log(jsonData);
	
		var successFunction = function() {
			console.log(' EDGE deleted successfully');					
		};
		
		var failFunction = function( xhr, status, error ) {
			$('#console-log').append("<p style='color:red'>Failed to delete edge: " + xhr.status + "</p>");
		};
		
		var edgeApi = new EdgeApis();
		edgeApi.deleteEdge(jsonData, successFunction, failFunction);
		
	     					
     };	
     
     DisplayFormUpdateNode.createEdges = function (  ){	
    	 console.log("%c Starting Edges creation ", "color:blue");			    
			for( var j=0; j < createEdgeList.length; j++){
				
				if( createEdgeList[j].edge == 'createEdge'  ){
					var element   = createEdgeList[j];	
							
					var jsonData = {};
					if( element.currNodePos == 'asParent'){
						jsonData = NodeUtils.createEdgeJson( element.currNodeType,  element.currNodeUuid, element.relNodeType, element.relNodeUuid, element.connection.id  );	
					}else if (element.currNodePos == 'asChild'  ){
						jsonData = NodeUtils.createEdgeJson(  element.relNodeType, element.relNodeUuid, element.currNodeType,  element.currNodeUuid, element.connection.id  );
					}else  if ( element.currNodePos == 'asSibling'){	
						jsonData = NodeUtils.createEdgeJson( element.currNodeType,  element.currNodeUuid, element.relNodeType, element.relNodeUuid,  element.connection.id  );
					}			
					if(!$.isEmptyObject(jsonData))
						var apiEdge  = new EdgeApis();				
						var doneFunction = function ( dataEdge ){
							if(!$.isEmptyObject(dataEdge)){
								console.log("Edge created ");
								$('#console-log').append("<p style='color:blue'>Edge creation successfull: </p>");
								// add edge to edgeMap
								NodeUtils.AddEdgeToMap( dataEdge);	
								createEdgeList[j].process = 'completed';
								$('#console-log').append("<p style='color:blue'>created Edge between node  :"+typeMapViaId[element.currNodeType].name +' and '+typeMapViaId[element.relNodeType].name  +'</p>');
							}else {
								// error
								$('#console-log').append("<p style='color:red'>Creation of Edge did not return a value for edge :"+jsonData +" </p>");
								createEdgeList[j].process = 'completedWithError';
								console.error("Creation of Edge did not return a value for edge "); 
							}
						}				
						var failFunction = function (  xhr, status, error ){
							console.error('Error Edge not created: ' + xhr.status);
							$('#console-log').append("<p style='color:red'>Error Edge not created:"+ xhr.status+"</p>");
							createEdgeList[j].process = 'failed';
						}						
						apiEdge.saveEdge( jsonData,  doneFunction, failFunction );	
				}else {
					$('#console-log').append("<p style='color:red'>Problem in jsonData creation for element :"+element +" </p>");
				}
			}
			for(var j=0; j < createEdgeList.length; j++  ){
				var number = 0;
				if(createEdgeList[j].process != 'completed'){
					var element   = createEdgeList[j];	
					console.log(" Process to create edge between   "+typeMapViaId[element.currNodeType].name + "  and "+typeMapViaId[element.relNodeType].name + "  failed ");
					number = number +1;
				}
				console.log(" number of failed to create edges is "+ number);
			}
     }
