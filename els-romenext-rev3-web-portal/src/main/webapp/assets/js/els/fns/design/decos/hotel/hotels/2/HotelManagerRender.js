/**
 * For hotel reservations, use case follows:
 * 
 * 1. Enter Entry date
 * 2. Enter Personal Info
 * 3. Enter contact Info
 * 4. Enter CC
 * 5. 
 * @param divId
 * @returns
 */
function HotelManagerRender() {
	
	this.divholderId;
	
	this.initBase = function( tmpId ) {
		this.divHolderId = tmpId;
	}
	
	this.initRenderer = function() {
		// TypeUtils.globalType_addFn( "create", "form", FormRendererCrud.typeCreate );
	};

	this.initView = function() {
		
		// hide the old versions 
//		DesignInterfaceUtils.hideOldVersion();
		
		// load all CRUD operations for this decorator
		
		// ensure all values are loaded
		DesignInterfaceUtils.resetInterface();
		
//		this.structureDiv();
		
//		this.initializeTypeBar();
//		
		// init the manager for hotel view
		this.createStructure();
		
		
//		// set up this 
//		this.enableFormView();
//		
//		// double check to see if the values have been initialized
//		this.checkInitialValues();
//		
//		this.loadView();
		
	};
	
	this.enableManagerView = function() {
		
	};
	
	this.createStructure = function() {

		var hotelManagerDecoView = document.getElementById(activeDecos_BODY[ this.divHolderId ]);
		hotelManagerDecoView.style.display = "block";
		
		// generate header 
		var hotelHeaderBar = document.createElement('header');
		hotelHeaderBar.className = 'panel-heading';
		hotelHeaderBar.id = 'hotel_manager_bar';
		hotelHeaderBar.style.display = 'block';
		hotelHeaderBar.innerHTML = '';
		
		hotelManagerDecoView.appendChild(hotelHeaderBar);
		
		
		// generate body
		var hotelManagerBody = document.createElement('div');
		hotelManagerBody.className = '';
		hotelManagerBody.id = 'hotel_manager_body';
		hotelManagerBody.style.display = 'block';
		hotelManagerBody.innerHTML = 'hello ver TWOs';
		
		hotelManagerDecoView.appendChild(hotelManagerBody);
	

	};
	
	
	
	this.enableFormView = function() {
		document.getElementById("form_deco_body_div_id").style.display = "block";
		// document.getElementById("pvform").innerHTML = "";
		
	};
	
	this.structureDiv = function() {
		var div = $("#form_deco_body_div_id");
		

		/**
		 * Need to create this structure
		 * 											<header class="panel-heading" id="display_typebar">Display Type Bar</header>
											<header class="panel-heading" id="display_rulebar">Display Rule Bar</header>
											<header class="panel-heading" id="display_connbar">Display Conn Bar</header>
                                         
                                         
											<header class="panel-heading" id="typeFormBar">Type Bar</header>  		
                                         	<div class="form_deco_class" id="form_deco_body_id" style="display:block;"></div>	 
		 */
		
		
		var typebar = document.createElement('header');
		typebar.id = 'display_form_typebar';
		typebar.className = 'panel-heading';
		typebar.style = "vertical-align:top;";
//		newChildDiv.innerHTML = "<table id='form_deco_body_sub_div_table_" + tempType.id + "' border=1><tr><td>Children</td><td class='create_icon' onclick='( new FormRenderer() ).addChildTypeForm(" + tempType.id + ");'><img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td>;</td></tr></table>";
		
		div.append( typebar );

		var typebarSub = document.createElement('header');
		typebarSub.id = 'display_form_typebar_sub';
		typebarSub.className = 'typebar-sub-panel-heading';
		typebarSub.style = "vertical-align:top;";
//		newChildDiv.innerHTML = "<table id='form_deco_body_sub_div_table_" + tempType.id + "' border=1><tr><td>Children</td><td class='create_icon' onclick='( new FormRenderer() ).addChildTypeForm(" + tempType.id + ");'><img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td>;</td></tr></table>";
		
		div.append( typebarSub );

		
		var bodyDiv = document.createElement('div');
		bodyDiv.id = 'form_deco_body_id';
		bodyDiv.className = 'form_deco_class';
		bodyDiv.style.display = "block;";
//		newChildDiv.innerHTML = "<table id='form_deco_body_sub_div_table_" + tempType.id + "' border=1><tr><td>Children</td><td class='create_icon' onclick='( new FormRenderer() ).addChildTypeForm(" + tempType.id + ");'><img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td>;</td></tr></table>";
		
		
		div.append( bodyDiv );
		
		
//		body.appendChild( newInstHolderDiv );
//		
//		instHolderDiv = $( "#" + instHolderDivName );
	};

	this.checkInitialValues = function() {
		
		
//		if( tdvCy == null ) {
//			var successFunction = function( jsonData ) {
//				tdvCy = initTypeConnGraph(tdvCy, "tdvCy", formatTypesAndConnections(jsonData));	// this will initiate typeMap also
//				// initTypeDesignBar('typeBar');			                                        // Display types Bar	
//			};
//			
//			var failFunction = function( xhr, status, error ) {
//				if(status = 400 ) {
//					$('#console-log').append("<p style='color:blue'>No Graph Created at this point!.  "+ status+"</p>");
//				}
//				console.log("Error: " + xhr.status);
//			};
//				
//			var apis = new apiRomeNext();	
//			apis.getAllTypesAndConnections( successFunction, failFunction );
//			saveInitialPosition(tdvCy);
//		}
	};

	this.initializeTypeBar = function() {
		var displayTypeBar_v2 = document.getElementById('display_form_typebar');
		displayTypeBar_v2.innerHTML = "";

		// create the sub typebar for this type
		var typeBarSubDiv = $( "#display_form_typebar_sub" );
		
		// find total number
		var totals = Object.keys( typeMapViaId ).length;
		
		inputs = "<table id='typesList'><tr>";
		inputs += "<td><span class='badge'>*("+ totals +")</span></td>";
		
		$.each( typeMapViaId, function(key, value){
			
			if( totals != 0 ){
				// add the TYPEBAR type
				inputs += "<td ><button type='button' style='color:black; background:"+value.color+"' id='"+value.id+"'  onclick=\"( new DisplayFormRenderer() ).selectedType('" + value.id + "')\"  >"+value.name;
				inputs += "<span class='badge'>";
                if( value.nb ) { 
                	inputs += value.nb;
                } else { 
                	inputs += '0';
                }
				inputs += "</span>";
				inputs += "</button></td>";
				
				// add the TYPEBAR SUB menu
				var checktypeBarSubDiv = $( "#display_form_typebar_sub_" + value.id );

				
				if( checktypeBarSubDiv == null || checktypeBarSubDiv.length == 0 ) {
					// no div found, create it
					var newSubDiv = document.createElement('div');
					newSubDiv.id = 'display_form_typebar_sub_'  + value.id;
					newSubDiv.className = 'display_form_typebar_sub_class';
					newSubDiv.style.visibility = "hidden";
					newSubDiv.style.display = "none";
					newSubDiv.innerHTML = "<table id='display_form_typebar_sub_table_" + value.id + "' border=1><tr><td>Create new " + value.name + "</td><td class='create_icon' onclick='( new DisplayFormRenderer() ).createType(" + value.id + ");'><img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td>;</td></tr></table>";
					
					typeBarSubDiv.append( newSubDiv );
					
					checktypeBarSubDiv = $(  "#display_form_typebar_sub_" + value.id  );
				}
			} else {
				return;
			}
			
			});
		
		if( totals == 0 ) {
			inputs += "<p> No Type is created yet</p>";
		}
		
		// add the rest of the typebar
		inputs +="</tr></table>";
		displayTypeBar_v2.innerHTML = inputs;
		
	};
	
	this.loadView = function() {
		// container = document.getElementById("pvform");
		
		

		
		console.log("Initializing the form view");
		
		
		
		
		// clear the current
		var body = document.getElementById('form_deco_body_id');
		body.innerHTML = "";
		
		
		
		// we add the ADD INSTANCE div here
		// Unfortunately, we need to add it outside of the nodemap loop in the case where NO NODE INSTANCE exists 
		// ie. first node
		
		$.each( typeMapViaId, function( typeId, tmpType ) {
			
			// grab the div that is associated for this 
			// display form type view
			var instHolderDivName = "form_deco_body_sub_div_" + typeId;
			
			
			var instHolderDiv = $( "#" + instHolderDivName );
			
			if( instHolderDiv == null || instHolderDiv.length == 0 ) {
				// found no div so create it
				var newInstHolderDiv = document.createElement('div');
				newInstHolderDiv.id = 'form_deco_body_sub_div_'  + typeId;
				newInstHolderDiv.className = 'form_deco_body_sub_div';
				newInstHolderDiv.style.visibility = "hidden";
				newInstHolderDiv.style.display = "none";
//				newChildDiv.innerHTML = "<table id='form_deco_body_sub_div_table_" + tempType.id + "' border=1><tr><td>Children</td><td class='create_icon' onclick='( new FormRenderer() ).addChildTypeForm(" + tempType.id + ");'><img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td>;</td></tr></table>";
				
				body.appendChild( newInstHolderDiv );
				
				instHolderDiv = $( "#" + instHolderDivName );
			} 
			
			
			
			
			/**
			 * FOR THE ADDING NEW INST OF THIS TYPE 
			 */
			var checkInstanceAddDiv = $( "#form_inst_add_" + typeId );
			
			if( checkInstanceAddDiv == null || checkInstanceAddDiv.length == 0 ) {
				// no div found, create it
				var newInstAddDiv = document.createElement('div');
				newInstAddDiv.id = 'form_inst_add_'  + typeId;
				newInstAddDiv.className = 'form_inst_add';
				newInstAddDiv.style.visibility = "hidden";
				newInstAddDiv.style.display = "none";
//				newChildDiv.innerHTML = "<table id='form_deco_body_sub_div_table_" + tempType.id + "' border=1><tr><td>Children</td><td class='create_icon' onclick='( new FormRenderer() ).addChildTypeForm(" + tempType.id + ");'><img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td>;</td></tr></table>";
				
				instHolderDiv.append( newInstAddDiv );
				
				checkInstanceAddDiv = $( "#form_inst_add_" + typeId );
			}
			
			
			
			
			
			var instAddDiv = $("#form_inst_add_" + typeId );

			
			$.each( tmpType.properties, function( propId, tmpProp ) {
				if( tmpProp.propertyType == "STRING" ) {
					instAddDiv.append( tmpProp.name + ':' + '<input type="text" id="form_inst_add_val_' + tmpProp.id + '" value=""></input><br/>' );						

				} else if( tmpProp.propertyType == "INTEGER" ) {
					instAddDiv.append( tmpProp.name + ':' + '<input type="text" id="form_inst_add_val_' + tmpProp.id + '" value=""></input><br/>' );						

				} else if( tmpProp.propertyType == "DATE" ) {
					instAddDiv.append( tmpProp.name + ':' + '<input type="text" id="form_inst_add_val_' + tmpProp.id + '" value=""></input><br/>' );						

				} else if( tmpProp.propertyType == "DOUBLE" ) {
					instAddDiv.append( tmpProp.name + ':' + '<input type="text" id="form_inst_add_val_' + tmpProp.id + '" value=""></input><br/>' );						

				} else if( tmpProp.propertyType == "BOOLEAN" ) {
					instAddDiv.append( tmpProp.name + ':' + '<input type="text" id="form_inst_add_val_' + tmpProp.id + '" value=""></input><br/>' );						

				} else {
					instAddDiv.append( tmpProp.name + '(UNKNOWN TYPE/' + tmpprop.id + '):<input type="text" id="form_inst_add_val_' + tmpProp.name + '" value=""></input><br/>' );						
				}
			});
			instAddDiv.append( '<input type="button" id="form_inst_add_val_submit_' + typeId + '" value="Cancel" onclick="( new DisplayFormRenderer() ).createType_cancel(' + typeId + ');"></input><br/>' );						
			instAddDiv.append( '<input type="button" id="form_inst_add_val_submit_' + typeId + '" value="Submit" onclick="( new DisplayFormRenderer() ).createType_submit(' + typeId + ');"></input><br/>' );						
			
		});
		
		
		
		$.each( nodeMap, function( key, value ) {
			// grab the type 
			var tempType = typeMap[ value.type ];
			
			var instHolderDiv = $( "#form_deco_body_sub_div_" + tempType.id );
			
			
			
			/**
			 * THIS IS FOR VIEWING THE INSTANCE
			 */
			// check to see if there is a div for this given element
			var checkInstanceDiv = $( "#form_inst_" + key );
			
			if( checkInstanceDiv == null || checkInstanceDiv.length == 0 ) {
				// no div found, create it
				var newChildDiv = document.createElement('div');
				newChildDiv.id = 'form_inst_'  + key;
				newChildDiv.className = 'form_inst';
				newChildDiv.style.visibility = "hidden";
				newChildDiv.style.display = "none";
//				newChildDiv.innerHTML = "<table id='form_deco_body_sub_div_table_" + tempType.id + "' border=1><tr><td>Children</td><td class='create_icon' onclick='( new FormRenderer() ).addChildTypeForm(" + tempType.id + ");'><img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td>;</td></tr></table>";
				
				instHolderDiv.append( newChildDiv );
				
				checkInstanceDiv = $( "#form_inst_" + key );
			}
			
			/**
			 * THIS IS FOR THE EDITING THE INSTANCE
			 */
			var checkInstanceEditDiv = $( "#form_inst_edit_" + key );
			
			if( checkInstanceEditDiv == null || checkInstanceEditDiv.length == 0 ) {
				// no div found, create it
				var newInstEditdDiv = document.createElement('div');
				newInstEditdDiv.id = 'form_inst_edit_'  + key;
				newInstEditdDiv.className = 'form_inst_edit';
				newInstEditdDiv.style.visibility = "hidden";
				newInstEditdDiv.style.display = "none";
//				newChildDiv.innerHTML = "<table id='form_deco_body_sub_div_table_" + tempType.id + "' border=1><tr><td>Children</td><td class='create_icon' onclick='( new FormRenderer() ).addChildTypeForm(" + tempType.id + ");'><img  id='img_create' title='Create New' src='"+img_path+ "design_icons/create.png'></td>;</td></tr></table>";
				
				instHolderDiv.append( newInstEditdDiv );
				
				checkInstanceEditDiv = $( "#form_inst_edit_" + key );
			}
			
			
			
			// build a view based on the current type			
			var instPropMap = {};
			var instName = "NONE";
			
			// now iterate over all properties inside the actual instance and only show any that are found in the map
			$.each( value.properties, function( instkey, instprop ) {
				instPropMap[ instprop.name ]  = instprop;
				
				if( instprop.name == 'name' ) {
					instName = instprop.value;
				}
				
//				var propName = instprop.name;
//				
//				var check = propMap[ propName ];
//				
//				if( check != null ) {
//					// found it
//					// add it to the instance div table?
//					var instDiv = $( "#form_inst_" + key );
////					tableChildDiv.append('<tr class="child"><td>' +  target.name + '</td><td>Jump</td></tr>');
//					instDiv.append('Found this Prop: ' + propName + ' value : ' + instprop.value );
//
//				};
			});
			
			// print out the properties
			/**
			 * Note: We are actually buildilng 3 VIEWS here
			 * 1. View of instance
			 * 2. Edit of instance
			 * 3. Create new of type
			 */
			var propMap = {};
			
			var instViewDiv = $( "#form_inst_" + key );
			var instEditDiv = $("#form_inst_edit_" + key );
			
			
			$.each( tempType.properties, function( pkey, pvalue ) {
				
				var check = instPropMap[ pvalue.name ];

				
				if( check != null ) {
					// output this
					instViewDiv.append('Found this Prop: ' + pvalue.name + ' value : ' + check.value );
					instEditDiv.append('Found this Prop: ' + pvalue.name + ' value : ' + check.value );
//					instAddDiv.append('Found this Prop: ' + pvalue.name + ' value : ' + check.value );
					
				


				} else {
					instViewDiv.append('Found this MISSING Prop: ' + pvalue.name + ' value : NONE' );
					instEditDiv.append('Found this MISSING Prop: ' + pvalue.name + ' value : NONE' );
					
					

				}
				

				
				// things to look for
				// name
				// propertyType
				// note: we ONLY care about the properties currently set in the type
//				propMap[ pvalue.name ] = pvalue;
			});
			
			// after the properties, we need to build an output for every child directly connected
			// and parent
			
//			div.append( "Test12" + tempType.name );
			
//			checkInstanceDiv.innerHTML += "Instance(" + key + ")";
			instHolderDiv.append( "<a href='#' onclick='( new DisplayFormRenderer() ).selectInstance(\"" + key + "\")'>" + instName + "</a><br>" );
		});
		

		
		
		

	};
	
	
	this.createType = function( selectedTypeId ) {
		
		console.log("Attempting to create :" + selectedTypeId );
		
		// note that the SELECTION of a type should indicate a FOCUS
		// ie. Reset the listTypeId's and listConnId's
		GlobalUtils.clearGlobalSelected();
		
		// assign the current 
		GlobalUtils.setGlobalTypeSelected( selectedTypeId );
		
		// hide all the others
//		$('div.form_deco_body_sub_div').hide();
//		$('header.typebar-sub-panel-heading').hide();
		
//		$('div.display_form_typebar_sub_class').hide();
		
		var addDiv = document.getElementById("form_inst_add_" + selectedTypeId );

		
		
		if( addDiv != null ) {
			addDiv.style.display = "block";
			addDiv.style.visibility = "visible";
		} else {
			// nothing to show?
		}
		
		      
	};
	
	this.createType_cancel = function( selectedTypeId ) {
		
		console.log("Attempting to Cancel :" + selectedTypeId );
		
		// note that the SELECTION of a type should indicate a FOCUS
		// ie. Reset the listTypeId's and listConnId's
		GlobalUtils.clearGlobalSelected();
		
		// assign the current 
		GlobalUtils.setGlobalTypeSelected( selectedTypeId );
		$('#form_inst_add_' + selectedTypeId ).hide();
		
		
		      
	};
	
	this.createType_submit = function( selectedTypeId ) {
		
		console.log("Attempting to add a new type :" + selectedTypeId );
		
		
		var api = new NodeApis();
		
		var data = new NodeJsonObject();
		
		// set the minimum
		data.init(selectedMetaData.toString(), selectedTypeId.toString(), null);
		data.defaultDecorator = "1";
		
		api.saveNode( data, selectedMetaData, null, null );
		
		
		
//		
//		
//		var type = typeMapViaId[ selectedTypeId ];
//		
//		var instAddDiv = $("#form_inst_add_" + typeId );
//
//		
//		$.each( type.properties, function( propId, tmpProp ) {
//			if( tmpProp.propertyType == "STRING" ) {
//				instAddDiv.append( tmpProp.name + ':' + '<input type="text" id="form_inst_add_val_' + tmpProp.id + '" value=""></input><br/>' );						
//
//			} else if( tmpProp.propertyType == "INTEGER" ) {
//				instAddDiv.append( tmpProp.name + ':' + '<input type="text" id="form_inst_add_val_' + tmpProp.id + '" value=""></input><br/>' );						
//
//			} else if( tmpProp.propertyType == "DATE" ) {
//				instAddDiv.append( tmpProp.name + ':' + '<input type="text" id="form_inst_add_val_' + tmpProp.id + '" value=""></input><br/>' );						
//
//			} else if( tmpProp.propertyType == "DOUBLE" ) {
//				instAddDiv.append( tmpProp.name + ':' + '<input type="text" id="form_inst_add_val_' + tmpProp.id + '" value=""></input><br/>' );						
//
//			} else if( tmpProp.propertyType == "BOOLEAN" ) {
//				instAddDiv.append( tmpProp.name + ':' + '<input type="text" id="form_inst_add_val_' + tmpProp.id + '" value=""></input><br/>' );						
//
//			} else {
//				instAddDiv.append( tmpProp.name + '(UNKNOWN TYPE/' + tmpprop.id + '):<input type="text" id="form_inst_add_val_' + tmpProp.name + '" value=""></input><br/>' );						
//			}
//		});
//		
//		
//		
//		
//		
//		var jsonData = {};
//		
//		$.each( type.properties, function( propId, tmpProp ) {
//			
//			var valProp = $("#form_inst_add_val_" + propId );
//			
//			var value = valProp.val();
//			
//			if( value == null ) {
//				value = tmpProp.defaultValue;
//			}
//			
//			jsonData[ tmpProp.name ] = value;
//		});
//		
//		
//		
//		
//		var detailNode = {}, foundError = false;
//		var jsonData = {}, nodeProperties = [], nodeproperty = {}, decoproperty={}, decoProps=[],nodeDecoProperties ;
//		$(form).find('div#typeName').find(':input').each(function (i, field) {
//			jsonData[field.name] = field.value;
//		});
//		// Retrieve all properties and create json
//		
//		$(form).find('div#nodeProperties').find('tr').each(function (i, propDiv) {
//			$(propDiv).find(':input').each(function(i, field){
//				if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
//					nodeproperty[field.name] = field.value;
//								
//			   }
//			});
//			// verify if property is mandatory -- is there a value -- store it
//			//        if not mandatory         --- there is no value     ----- do not pass property
//			//                                 --- there is value        ----- pass property 
//			var isPropMand = findPropInType(nodeproperty.propertyName, jsonData['type']);
//			if(isPropMand){  if (nodeproperty.value)	{
//		                                          nodeProperties.push(nodeproperty);
//			                 }else{
//				                      console.log("Missing Value for compulsory property.");
//				                      $('#nodeForm').append("<br/><p style='color:red'>Missing Value for Mandatory property : "+ nodeproperty.propertyName);		                   
//				                      foundError= true;
//			                  }
//			}else {
//				// not mandatory look if there is a value		
//				if (nodeproperty.value)	{  nodeProperties.push(nodeproperty);	}
//			}
//		    nodeproperty = {};
//		});
//
//		//   Retrieve all deco properties and create json
//		console.log(nodeProperties);
//		
//		if(!foundError) {
//			jsonData.properties = nodeProperties;	
//			$(form).find('div#defaultDecoForNode').find(':input').each(function (i, field) {
//				jsonData[field.name] = field.value;
//			});
//			$(form).find('div#modelIdName').find(':input').each(function (i, field) {
//				jsonData['modelId'] = field.value;
//			});
//			if(jsonData.hasOwnProperty('modelId')){
//				if(jsonData['modelId']){
//										$(form).find('div#partsForNodes').find(':input').each(function (i, field) {
//											    console.log("part node value "+field.value);
//												if (field.value != 0) 	jsonData['partGroup'] = field.value;
//			                            });
//				}
//			}
//			nodeDecoProperties = [];
//		    nodeDecoProperties.push({propertyName:"x", value:dragItemPositionX.toString(), propertyType:"DOUBLE", romeDecoPropId:"1"});
//		    nodeDecoProperties.push({propertyName:"y", value:dragItemPositionY.toString(), propertyType:"DOUBLE", romeDecoPropId:"2"});
//
//		jsonData.decoProperties = nodeDecoProperties;	
//		
//		//console.log(jsonData);
//		if (selectedMetaData != null){
//			$.ajax({
//				type : 'POST',
//				url : apiBaseUrl + 'node/metadata/'+ selectedMetaData,
//				// url : apiBaseUrl + 'node/withdeco/metadata/'+ selectedMetaData,
//				dataType : 'json',
//				data : JSON.stringify(jsonData),
//				contentType : 'application/json',
//				cache : false,
//				async : false,
//				success : function(data) {
//					console.log("Node create success. data: " + data);
//					$('#console-log').append("<p style='color:blue'>Node  saved:"+ data.type+"</p>");
//				},
//				error : function(xhr, ajaxOptions, error) {
//					console.log('Error Node not saved: ' + xhr.responseText);
//					$('#console-log').append("<p style='color:red'>Error Node not saved:"+ xhr.status+"</p>");
//					
//				}
//			}).done(function(data) {
//				// check if first node created for this type		
//				if(!irvCy) { 					
//					var nodes = [];	
//					nodes.push(formatSingleNode(data));			
//					setTimeout(function() {irvCy =  initNodeEdgeGraph(irvCy, "irvCy",  nodes);
//					}, 100);
//					
//				}
//				else{
//				    updateInstanceGraph(irvCy, formatSingleNode(data));
//				}
//			    
//				if (document.getElementById("mrvCy").style.display == "block") {
//					updateGeoMapWithNode(data);
//				}
//				// update node bar
//				retrieveBar(nodeMap);
//				emptyAllInst();
//				detailNode.nodes = [];
//				detailNode.nodes.push(data);
//				message = "<p style='color:green'> Node Saved</p>";
//				showUpdateNodePropertiesDialog(detailNode);		
//				message ='';
//			});
//		} else { 
//			 $('#console-log').append("<p style='color:red'>Can not create a Node, You must First  select a Metadata</p>");
//			 cancelInstForm();
//			}	
//		}
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		
//		// note that the SELECTION of a type should indicate a FOCUS
//		// ie. Reset the listTypeId's and listConnId's
//		GlobalUtils.clearGlobalSelected();
//		
//		// assign the current 
//		GlobalUtils.setGlobalTypeSelected( selectedTypeId );
//		
//		// hide all the others
////		$('div.form_deco_body_sub_div').hide();
////		$('header.typebar-sub-panel-heading').hide();
//		
////		$('div.display_form_typebar_sub_class').hide();
//		
//		var addDiv = document.getElementById("form_inst_add_" + selectedTypeId );
//
//		
//		
//		if( addDiv != null ) {
//			addDiv.style.display = "block";
//			addDiv.style.visibility = "visible";
//		} else {
//			// nothing to show?
//		}
		
		
		
		
		
		
		      
	};	
	this.selectedType = function( selectedTypeId ) {
		
		console.log("Attempting to show :" + selectedTypeId );
		
		// note that the SELECTION of a type should indicate a FOCUS
		// ie. Reset the listTypeId's and listConnId's
		GlobalUtils.clearGlobalSelected();
		
		// assign the current 
		GlobalUtils.setGlobalTypeSelected( selectedTypeId );
		
		// hide all the others
		$('div.form_deco_body_sub_div').hide();
//		$('header.typebar-sub-panel-heading').hide();
		
		$('div.display_form_typebar_sub_class').hide();
		
		
		
		var instDiv = document.getElementById("form_deco_body_sub_div_" + selectedTypeId );

		
		
		if( instDiv != null ) {
			instDiv.style.display = "block";
			instDiv.style.visibility = "visible";
		} else {
			// nothing to show?
		}
		
		
//		var subtypebar =  $("#display_form_typebar_sub_" + selectedTypeId);
//		subtypebar.show();
//		$("display_form_typebar_sub_" + selectedTypeId).show();
		
//		// show the type subbar
		var instTypebarSubDiv = document.getElementById("display_form_typebar_sub_" + selectedTypeId );

		
		
		if( instTypebarSubDiv != null ) {
			instTypebarSubDiv.style.display = "block";
			instTypebarSubDiv.style.visibility = "visible";
		} else {
			// nothing to show?
		}
		
		
//		
//		if( cdiv != null ) {
//			cdiv.style.display = "block";
//			cdiv.style.visibility = "visible";
//		}
//
//		if( sdiv != null ) {
//			sdiv.style.display = "block";
//			sdiv.style.visibility = "visible";
//		}
		      
	};
	
	this.selectInstance = function( instId ) {
		var instDiv = document.getElementById("form_inst_" + instId );

		$('div.form_inst').hide();
		
		if( instDiv != null ) {
			instDiv.style.display = "block";
			instDiv.style.visibility = "visible";
		}
	};

	this.activeToolbar = function() {
		var inputs ='';
		inputs = '<div><table  class="toolbar_table"><tr>';
		inputs += '<td width="50px" onclick="( new FormRenderer() ).internal_showAddModel3DDialog()"><img title="Add Model" src="/webgui/assets/img/icons/add.png"></td>';
		// inputs += '</tr></table>';

		if (curModels.length > 0) {
			// inputs += '<table  class="toolbar_table"><tr>';

			inputs += '<td width="50px">';

			inputs += '<select id="select_model" onchange="( new FormRenderer() ).internal_loadModelShapes()"><option value="select model">select model Redux...</option>';
			for (var i = 0; i < curModels.length; i++) {
				inputs += '<option value="' + curModels[i].name + '">' + curModels[i].name + '</option>';
			}
			inputs += '</select>';

			inputs += '</td><td width="50px"></td>';


			inputs += '<td id="design_3d_three_front_td" width="25px" style="display:none"><input id="design_3d_three_front" type="button" style="border:1;visibility:visible;color:" onclick="( new FormRenderer() ).internal_front();" value="Front"></td>';
			inputs += '<td id="design_3d_three_back_td" width="25px" style="display:none"><input id="design_3d_three_back" type="button" style="border:1;visibility:visible;color:" onclick="( new FormRenderer() ).internal_back();" value="Back"></td>';
			inputs += '<td id="design_3d_three_left_td" width="25px" style="display:none"><input id="design_3d_three_left" type="button" style="border:1;visibility:visible;color:" onclick="( new FormRenderer() ).internal_left();" value="Left"></td>';
			inputs += '<td id="design_3d_three_right_td" width="25px" style="display:none"><input id="design_3d_three_right" type="button" style="border:1;visibility:visible;color:" onclick="( new FormRenderer() ).internal_right();" value="Right"></td>';
			inputs += '<td id="design_3d_three_top_td" width="25px" style="display:none"><input id="design_3d_three_top" type="button" style="border:1;visibility:visible;color:" onclick="( new FormRenderer() ).internal_top();" value="Top"></td>';
			inputs += '<td id="design_3d_three_bottom_td" width="25px" style="display:none"><input id="design_3d_three_bottom" type="button" style="border:1;visibility:visible;color:" onclick="( new FormRenderer() ).internal_bottom();" value="Bottom"></td>';
			
			inputs += '<td id="design_3d_three_grid_td" width="25px" style="display:none"><input id="design_3d_three_grid" type="button" style="border:1;visibility:visible;color:" onclick="( new FormRenderer() ).internal_grid_toggle();" value="Toggle Grid"></td>';

			inputs += '<td id="draw_line_td" width="50px" onclick="toDrawGrid3D()" style="display:none"><img id="img_grid" title="Construction Line" src="/webgui/assets/img/icons/grid.png"></td>';

			inputs += '<td id="draw_cntr_td" width="50px" onclick="toDrawContour3D()" style="display:none"><img id="img_cntr" title="Contour" src="/webgui/assets/img/icons/cntr.png"></td>';
			
			
			
//			inputs += '<td width="50px" onchange="( new FormRenderer() ).updateGrid();">X:<input type="text" id="gridx"/> </td>';
//			inputs += '<td width="50px" onchange="( new FormRenderer() ).updateGrid();">Y:<input type="text" id="gridy"/> </td>';
//			inputs += '<td width="50px" onchange="( new FormRenderer() ).updateGrid();">Z:<input type="text" id="gridz"/> </td>';

//			inputs += '<td width="50px" onchange="( new FormRenderer() ).updateOffset();">X:<input type="text" id="offsetx"/> </td>';
//			inputs += '<td width="50px" onchange="( new FormRenderer() ).updateOffset();">Y:<input type="text" id="offsety"/> </td>';
//			inputs += '<td width="50px" onchange="( new FormRenderer() ).updateOffset();">Z:<input type="text" id="offsetz"/> </td>';
			

		} 
		inputs += '</tr></table>';
		inputs += '</div>';

		$('#toolbar_romenext').empty();
		document.getElementById('toolbar_romenext').innerHTML = inputs;  
	};

	this.addListeners = function( cont ) {
		cont.addEventListener('mousedown', this.onViewMouseDown, false);   // ok
		cont.addEventListener('mousemove', this.onViewMouseMove, false);   // ok
		cont.addEventListener('mouseup', this.onViewMouseUp, false);   // ok
		cont.addEventListener('mousewheel', this.onMouseWheel, false); 
	}
	
	this.formTypeSelect = function(type){
		console.log(type);
		
		// from the type, display information in the form view
		TypePropertyUtils.displayTypeProperties( $('#typeForm'), typeMap[type], true );		
		
		var thisClick = new Date().getTime();
		isSingleClick = true;
		pleaseWait = true;
//		Un-Highlight  previous selected Types
		var list = grabTypesSelected();
		DesignCytoscapeUtils.selectUnselectTypes(list, tdvCy, false);                            // unhighlight the previous type if any in the graph
	//  Highlight the selected Type in the Graph
		tdvCy.filter('node[name="' + type + '"]').select();                  // highlight the type  in graph
		nametype    = type; 
//		Display its proprietes in sideBar 
		showType(typeMap[type]);                                           // should display information on the INFO section 	
	}
	
	
	
	this.saveProperty = function( typeid ) {
		TypePropertyUtils.saveAddPropertyForm( typeid );
		
		
		( new FormRenderer() ).updateCachedFormType( typeid );
		
		
//		var formObj = new FormRenderer();
//		
//		var body = document.getElementById('typeFormBody');
//
//		var typeObj = typeMapViaId[ typeid ];
//		
//		TypePropertyUtils.displayFinalTypeProperties( body, typeObj, true, formObj.typeDisplayFunct, formObj.propertyTableFunct, formObj.displayFunct, formObj.footerFunct );

	
//		TypePropertyUtils.displayAddPropertyForm( appendTo, type, property, displayFunc );

	};
	
	this.updateCachedFormType = function( typeid ) {
		
		// delete the div that is currently holding all the information
		
		/**
		 * Should we simply ADD the missing property?
		 * OR 
		 * Should we reload the entire?
		 */
		
		// remove current
		// NOTE: WE need to find out which div we want to load from or add too
		// change this to the new dynamic div
//		var body = document.getElementById('typeFormBody');
		var body = document.getElementById('typeFormPropertyDiv');

		
		
		$("#formtypeprop_" + typeid ).remove();
		
		var typeObj = typeMapViaId[ typeid ];

		var formObj = new FormRenderer();
		
		// do api call to update the value of this
		formObj.removeCurrentTypeInfo(typeid);
		
		
		TypePropertyUtils.displayFinalTypeProperties( body, typeObj, true, formObj.typeDisplayFunct, formObj.propertyTableFunct, formObj.displayFunct, formObj.footerFunct );

		
	};
	
	
	
	
	/**
	 * Display Functions
	 */
	
	// Will remove the current typeid from the form
	this.removeCurrentTypeInfo = function( typeid ) {
		
		// if removeFromTypebar = true, delete it first
//		if( removeFromTypebar == true  ) {
//			
//		} 
		
		var div = $("#formtypeprop_" + typeid );
		
		div.remove();
		
	}
	
	this.typeDisplayFunct = function( type ) {
		console.log("Inside new type display");
		
		var currHeader = "";
		
		currHeader += "<div class='formpropdiv' id='formtypeprop_" + type.id + "' style='display:none'>";
		currHeader += "<table id='myid'>";
		$.each(type, function(key, value) {
			
			if(key == 'name')  {
				currHeader += "<tr><th>" + key + "</th>";
				if (value == '') {
					currHeader += "<td>None</td><tr>"; 
				} else { 
					currHeader += "<td>" + value + "</td><tr>";	
//					setCurType(value);		// ?? Not sure why we do this, but it was in the original code - jpl dec2016
				}
			} else if (key == 'isRoot') {
				currHeader += "<tr><th>"+key +":</th>";
				currHeader += "<td><input type='radio' name='isRoot' ";
				if (value == true) { 
					currHeader += " value='true'  checked='checked' >true </td></tr>";
				} else { 
					currHeader += " value='false'  checked='checked' >false </td></tr>";     
				}
			}
		});
		return currHeader;
	};
	
	this.addPropertyFormDisplayFunc = function( appendTo, type, property ) {
		input = "<form id='add_property_form' onsubmit=''>";
		
		// put the type so we can use this to add it properly later
		input += "<input type='add_property_hidden_type_id' value='" + type.id + "'/>";
		
		// create table
		 newProperty = document.createElement('div');
		 input = "<hr/><table>";
		 input += "<tr><th>Name</th><th>Type</th><th>Is Mandatory</th><th>Is Unique</th><th>Default Value</th><th>Max Value</th><th>Min Value</th><th></th></tr>";
		 
		 input += "<tr>";
		 input += "<td><input type='text' id='" + type.id + "_add_property_propertyName' size='10' /></td>";
		 
		 input += "<td><select id='" + type.id + "_add_property_propertyType'>" +
		 		"<option value='STRING'>TEXT</option>"+
		 		"<option value='INTEGER'>INTEGER</option>"+
				"<option value='DOUBLE'>DOUBLE</option>"+
				"<option value='DATE'>DATE</option>"+
				"<option value='BOOLEAN'>BOOLEAN</option>"+
				"</select></td>";
		 
		 input += "<td><input type='radio' name='" + type.id + "_add_property_isMandatory' id='" + type.id + "_add_property_isMandatory' value='true' checked='checked'/>Yes<br>";
		 input += "<input type='radio' name='" + type.id + "_add_property_isMandatory' id='" + type.id + "_add_property_isMandatory' value='false' />No</td>";
		 
		 
		 input += "<td><input type='radio' name='" + type.id + "_add_property_isUnique' id='" + type.id + "_add_property_isUnique' value='true' checked='checked'/>Yes<br>";
		 input += "<input type='radio' name='" + type.id + "_add_property_isUnique' id='" + type.id + "_add_property_isUnique' value='false' />No";
		 input += "</td>";
		 
		 input += "<td><input type='text' id='" + type.id + "_add_property_defaultValue' /></td>";
		 input += "<td> <input type='text' id='" + type.id + "_add_property_maxValue' /></td>";
		 input += "<td> <input type='text' id='" + type.id + "_add_property_minValue' /></td>";
		 
		 input += "<td><input type='button' value='Save' class='btn btn-primary btn-xs'    onclick='( new FormRenderer() ).saveProperty(" + type.id + ");'/></td>";
		 
		
		 
		 input += "</tr></table>";
		 
		 input += "</form>";
	}
	
	
	this.footerFunct = function( type ) {
		
		var propFunc = function( appendTo, type, property ) {
			var input = "<form id='add_property_form' onsubmit=''>";
			
			// put the type so we can use this to add it properly later
			input += "<input type='add_property_hidden_type_id' value='" + type.id + "'/>";
			
			// create table
			 newProperty = document.createElement('div');
			 input = "<hr/><table>";
			 input += "<tr><th>Name</th><th>Type</th><th>Is Mandatory</th><th>Is Unique</th><th>Default Value</th><th>Max Value</th><th>Min Value</th><th></th></tr>";
			 
			 input += "<tr>";
			 input += "<td><input type='text' id='" + type.id + "_add_property_propertyName' size='10' /></td>";
			 
			 input += "<td><select id='" + type.id + "_add_property_propertyType'>" +
			 		"<option value='STRING'>TEXT</option>"+
			 		"<option value='INTEGER'>INTEGER</option>"+
					"<option value='DOUBLE'>DOUBLE</option>"+
					"<option value='DATE'>DATE</option>"+
					"<option value='BOOLEAN'>BOOLEAN</option>"+
					"</select></td>";
			 
			 input += "<td><input type='radio' name='" + type.id + "_add_property_isMandatory' id='" + type.id + "_add_property_isMandatory' value='true' checked='checked'/>Yes<br>";
			 input += "<input type='radio' name='" + type.id + "_add_property_isMandatory' id='" + type.id + "_add_property_isMandatory' value='false' />No</td>";
			 
			 
			 input += "<td><input type='radio' name='" + type.id + "_add_property_isUnique' id='" + type.id + "_add_property_isUnique' value='true' checked='checked'/>Yes<br>";
			 input += "<input type='radio' name='" + type.id + "_add_property_isUnique' id='" + type.id + "_add_property_isUnique' value='false' />No";
			 input += "</td>";
			 
			 input += "<td><input type='text' id='" + type.id + "_add_property_defaultValue' /></td>";
			 input += "<td> <input type='text' id='" + type.id + "_add_property_maxValue' /></td>";
			 input += "<td> <input type='text' id='" + type.id + "_add_property_minValue' /></td>";
			 
			 input += "<td><input type='button' value='Save' class='btn btn-primary btn-xs'    onclick='( new FormRenderer() ).saveProperty(" + type.id + ");'/></td>";
			 
			
			 
			 input += "</tr></table>";
			 
			 input += "</form>";
			 
			 return input;
		};
		
		var tempFooter = "";
		
		tempFooter += "<tr>";
		
		tempFooter += "<td colspan=8>";
		
		
		tempFooter += TypePropertyUtils.displayAddPropertyForm( null, type, null, propFunc );
		
		
		tempFooter += "</td>";
		tempFooter += "</tr>";

		
		tempFooter += "</table>";
		tempFooter += "<input type='button' value='Add Properties' class='btn btn-primary btn-xs'    onclick='AddTypeProperties();'/>";
		tempFooter += "<input type='button' value='Update Type'    class='btn btn-primary btn-xs'    onclick='UpdateTypeForm()'/>";
		tempFooter += "</div>";
		
		return tempFooter;

	};
	
	this.propertyTableFunct = function(  properties, propertyDisplayFunction ) {
		
		var tempPropInputs = "";
		
		if ( properties == null || properties.length == 0) {
			tempPropInputs += "<tr><th colspan='2'> No properties added </th></tr></table>";
		} else {	
			tempPropInputs += "<tr><th colspan='7' style='background-color: #CDEEDD'>Properties:</th></tr>";
			
			tempPropInputs += "<tr><td colspan=2>";
			tempPropInputs += "<table border=1 class='toolbar_table'>";
			tempPropInputs += "<tr style='background-color: grey'><th>Name</th><th>Type</th><th>Default</th><th>Mandatory</th><th>Unique</th><th>Min</th><th>Max</th><th>options</th></tr>";
			
			
			properties.forEach(function(property) {
				
				// var tempProp = propertyDisplayFunction( property, propertyDisplayFunction );
				
				var tempProp = TypePropertyUtils.displayTypeProperty( property, propertyDisplayFunction );

				
				tempPropInputs += tempProp ;
			});
			
			
			tempPropInputs += "</td>";
		} 
		
		return tempPropInputs;
	};
	
	// we want to be able to hide the different propertiess
	this.displayFunct = function( appendTo, property  ) {
		
		var tmpInputs = "";
		
		console.log("Entered display func");
		
		if ( property == null ) {
			// inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";
		} else {	
			// tmpInputs += "<table border=1 class='toolbar_table'>";
			// tmpInputs += "<tr style='background-color: grey'><th>Name</th><th>Type</th><th>Default</th><th>Mandatory</th><th>Unique</th><th>Min</th><th>Max</th><th>options</th></tr>";
			 //  added other values
			 
			tmpInputs += "<tr><td>" + property.name + "</td>";
		     if( property.propertyType == 'STRING' ) {
		    	 tmpInputs += "<td>TEXT</td>";
		     } else {
		    	 tmpInputs +="<td>" + property.propertyType + "</td>";
		     }
		     
		     if( property.defaultValue ) {
		    	 tmpInputs += "<td>"+property.defaultValue+"</td>";
		     } else {
		    	 tmpInputs +="<td>n/a</td>";
		     };
		     
		     tmpInputs += "<td>"+property.isMandatory+"</td>";
		     tmpInputs += "<td>"+property.isUnique+"</td>";
		     
		     if( property.minValue ) {
		    	 tmpInputs += "<td>"+property.minValue+"</td>";
		     } else {
		    	 tmpInputs +="<td>n/a</td>";
		     };
		     if( property.maxValue ) {
		    	 tmpInputs += "<td>"+property.maxValue+"</td>";
		     } else {
		    	 tmpInputs +="<td>n/a</td>";
		     };
		     
		     tmpInputs += "<td><button id='type_prop_detail_button_"+property.id+"' onclick=\"showOrHideTypePropDetails('"+property.id+"')\">Show Details</button></td>";
		     
		    
		     tmpInputs += "</tr>";
		} 
		
		return tmpInputs;
	};
}
