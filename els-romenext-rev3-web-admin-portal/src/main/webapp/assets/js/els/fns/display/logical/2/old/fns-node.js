//============================================================================================
function ShowFocussedNode(node){
	// keep this node value --- and Display it in the Path bar
	if(node){

	var drilldown='';
	if(document.getElementById('drilldown')){
		 drilldown = document.getElementById('drilldown');
		 drilldown.innerHTML='';
		}
	else {
		drilldown =  document.createElement('li');
		drilldown.setAttribute('id','drilldown');
	}
	var nodeList = '';
	userActions.currentaction='Drilldown';
	userActions.param = node;
	nodeList += "<span class='badge' style='color:black; background:"+node.color+"'>"+node.cyDisplay + "</span>";
	nodeList += "<input type='button' id='drill' value ='Drilldown'  class='btn btn-primary'  onclick=\"drillDownNode('"+node.uuid+"');\" /> "
	drilldown.innerHTML = nodeList;
	document.getElementById('breadcrumb').appendChild(drilldown);
	}else { console.log(" no node selected");}
}

function saveUpdateNodeDialog(form) {
	console.log("inside  saveUpdateNodeDialog  ");
	var jsonData = {}, nodeProperties = [], newProperties = [];
	var decoProps=[],newDecoProps=[], decoproperty ={}, newdecoproperty ={} ;
	var property = {}, newproperty = {}, foundError=false;
	var sysProperties = [];
	$(form).find('table#updateNode').find(':input').each(function (i, field) {
		jsonData[field.name] = field.value;
	});
	console.log(jsonData);
	// API will remove the uuid from newProperties
	$(form).find('table#nodeProperties').find('tr#props').each(function (i, propsTr){
		$(propsTr).find(':input').each(function(i,field){
			if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
				console.log(field.name + " value found is :"+field.value);
				if (field.name == 'value')  {   // && field.value != "undefined"
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
		
		if (newproperty.propertyType === "FILE") {
			
			if (newproperty.value) {
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
		
		if((property.propertyName == 'uuid') && (newproperty.propertyName == 'uuid')){
//			nodeProperties.push(property);
			property.name = property.propertyName;
			sysProperties.push(property);
;		}else{
				var isPropMand = typeMapViaId[jsonData['type']].typeProperties[property.propertyId].isMandatory;
				if(isPropMand){ // mandatory property
					if(newproperty.value){
											newProperties.push(newproperty);
			                    		  	if(property.value  && property.value != 'undefined' && property.value != 'null'){ 
			                    		  		nodeProperties.push(property);
			                    		  	}
			                    		  	
			         } else {
			        	 
			        	 if (newproperty.propertyType != "FILE") {
			        		 console.log("Missing Value for compulsory property.");
                   		  	 $('#nodeForm').append("<br/><p style='color:red'>Missing Value for Mandatory property : "+ property.propertyName);
		                     foundError= true;
			        	 }
                    		 
                    }		                    	  
		
				}else {   // not mandatory
					if(newproperty.value){  // user entered a new value
											newProperties.push(newproperty);
							                if(property.value && property.value != 'undefined' && property.value != 'null'){ 
							                	nodeProperties.push(property);
							                }
						        			
					}else {  // if there was no value and user did not enter a value don't push it
//					  user may have deleted old value  
						if (property.value && property.value!= 'undefined' ){
//							       if (property.propertyType == 'INTEGER'|| property.propertyType == 'DOUBLE') { 
//							                          newproperty.value = null; }				
//						            else if(property.propertyType == 'STRING') { newproperty.value = 'null'; }  
							       newproperty.value = null;
							       nodeProperties.push(property);
							       newProperties.push(newproperty);
						}
						
					}
	        	}
		}
			           property = {}; newproperty ={};
		
	});
	//      build the set of new properties
	
	console.log(" Retrieved Properties are : "+nodeProperties);
	console.log(" The new ones are :"+ newProperties);
	if(!foundError) {
		jsonData.properties         = nodeProperties;
		jsonData.newProperties      = newProperties;
		jsonData.sysProperties      = sysProperties;
		
		$(form).find('#decoproperties').find('tr').each(function(i, decoDiv){
			$(decoDiv).find(':input').each(function(i,field){
				if ((field.type != 'submit') && (field.type != 'radio') || (field.checked)) {
					if(field.name == 'value'){ decoproperty[field.name] = field.value }
					else if (field.name == 'newValue') { 
						newdecoproperty['value'] = field.value
					} else { 
						newdecoproperty [field.name] = field.value;
						decoproperty[field.name] = field.value;
					}
				
				}
			});
			decoProps.push(decoproperty);
			newDecoProps.push(newdecoproperty);
			decoproperty = {}; newdecoproperty={};
		});
		jsonData.decoProperties = decoProps;
		jsonData.newDecoProperties = newDecoProps;
	
		$(form).find('div#defaultDecoForNode').find(':input').each(function (i, field) {
			jsonData[field.name] = field.value;
		});	
		console.log("Json constructed before mode taken"+jsonData);
		$(form).find('div#modelIdName').find(':input').each(function (i, field) {
			jsonData['modelId'] = field.value;
		});
		if(jsonData.hasOwnProperty('modelId')){
			if(jsonData['modelId']){
									$(form).find('div#partsForNodes').find(':input').each(function (i, field) {
										    console.log("part node value "+field.value);
											if (field.value != 0) 	jsonData['partGroup'] = field.value;
		                            });
			}
			console.log("Json constructed after mode taken"+jsonData.modelId );	
		}
			
		console.log(jsonData);
		
		if (selectedMetaData != null && jsonData){
			
			var successFunction = function( data ) {
				
				var node = data.node;			
				console.log("Node Updated: " + node.type);
				
				if (document.getElementById("irvCy").style.display == "block") {
//					displayIRVCYCoords('irvCy');
//				    update the instance graph view if displayed
					var formatNode = DisplayCytoscapeUtils.formatSingleNode(node);
					DisplayCytoscapeUtils.updateInstanceGraph (irvCy, formatNode); 
		      
//				    (new DisplayLogicalRenderer()).emptyAllInst();
				    $('#nodeForm').empty();
				    $(".qtip").remove();
				    message = "<p style='color:green'> Node Properties updated successfully</p>";
				    
				    message = '';
				    
				    DisplayCytoscapeUtils.doubleclickANode(node.sysProperties.uuid.value);
				    
				} 			
//				else if (document.getElementById("mrvCy").style.display == "block") {
//					updateGeoMapWithNode(node);
//				} 
			};
			
			var failFunction = function( xhr, ajaxOptions, error ) {
				console.log("Update Node Properties Error: " + xhr.status);
				CommonFctsLogical.HandlingErrorMSG("Update Node Properties Error: " + xhr.status, "error");
				$('#console-log').append("Update Node Properties Error: " + xhr.status);
			};
			
			jsonData['typeId'] = Number(jsonData['type']);
			
			jsonData.grouphost = userGroup.host;
			jsonData.groupname = userGroup.name;
			jsonData.namespace = loggedInUserName;
		
			var nodeApi = new NodeApis();
			nodeApi.updateNode(jsonData, successFunction, failFunction);
		
		} else {
			CommonFctsLogical.HandlingErrorMSG("You Must Select Metadata Repo", "warning");
			$('#console-log').append("<p style='color:red'>You Must Select Metadata Repo</p>");
			cancelInstForm();	
		}
	}
}

//===========================================================================
function cancelInstForm() {
	(new DisplayLogicalRenderer()).emptyAllInst();
}
