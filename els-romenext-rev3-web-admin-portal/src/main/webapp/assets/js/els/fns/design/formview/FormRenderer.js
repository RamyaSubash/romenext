function FormRenderer() {

	this.divholderId;
	
	this.initBase = function( divId ) {
		console.log("divId is: "+ divId);
		this.divHolderId = divId;
	};
	
	this.initRenderer = function() {
		
		TypeUtils.globalType_addFn( "create", "form", FormRendererCrud.typeCreate );
		TypeUtils.globalType_addFn( "update", "form", FormRendererCrud.typeUpdate );

	};

	this.initView = function() {
		active_deco = "form_design";

		// ensure all values are loaded
		DesignInterfaceUtils.resetInterface();
		
		// set up this 
		this.enableFormView();
		
		// double check to see if the values have been initialized
		var load =  this.checkInitialValues();
		
		if(load ){
			this.loadView();
			if( listTypeIds[0] ) {this.selectedType(listTypeIds[0]);}
			else {
				FormRelationshipUtils.tutorialFormDesign ();
			}
		}else {
			console.log(" Not able to load the Form View : Missing SelectedMetaData "); 
		}			
	};
			
	this.enableFormView = function() {

		var FormDecoView = document.getElementById(activeDecos_BODY[ this.divHolderId ]);
		FormDecoView.style.display = "block";
		
		// generate header 		
		var typeFormBar = GlobalHTMLUtils.createHTMLEntity('header', 'typeFormBar', 'panel-heading', 'visible', 'block', '');	
		FormDecoView.appendChild(typeFormBar);
		
		// generate the typebar table
		var tableTypes = document.createElement('table');
		tableTypes.id = 'formRenderer_typesList';	
		tableTypes.innerHTML = '';		
		FormDecoView.appendChild(tableTypes);
		
		// generate body
		var typeFormBody = GlobalHTMLUtils.createHTMLEntity('div', 'typeFormBody', 'cy', 'visible', 'block', '');		
		FormDecoView.appendChild(typeFormBody);
	};

	this.checkInitialValues = function() {
			
		if ( !selectedMetaData ) {
			    document.getElementById('path').innerHTML = "<p style='color:red'>No Metadata Selected  !!</p>";
				console.log(" No value for metadata ")
				return false;	
		} else {
			colorIndex = 0;			
			GlobalUtils.loadAllTypeAndConnections();
			GlobalUtils.loadAllRules();		
			return true;			
		}				
		
	};
	
	this.loadView = function() {
		
		console.log("Initializing the form view");
						
		this.initHeaderBar();
				
		// clear the current
		var body  = document.getElementById('typeFormBody') ;
		body.innerHTML = "";
		
		// set up the RELATIONSHIPS  divs
		FormRelationshipUtils.initAllRelationshipDivs( body );
		
		var pbody = document.getElementById('typeFormPropertyParentDiv');
		pbody.innerHTML = "";
		
		var cbody = document.getElementById('typeFormPropertyChildDiv');
		cbody.innerHTML = "";
		
		var sibbody = document.getElementById('typeFormPropertySiblingDiv');
		sibbody.innerHTML = "";
		
		var connectbody = document.getElementById('typeFormConnectionDiv');
		connectbody.innerHTML = "";
								
		var showConnBody = document.getElementById('typeFormRuleDiv');
		showConnBody.innerHTML = "";
		
		FormRelationshipUtils.resetCreateTypeDiv();			
		/**
		 * Initialize all the containers needed for each type
		 * Each TYPE
		 * - Property DIV
		 * - Parent/Child/Sibling Div
		 */
		$.each(typeMapViaId, function(key, value) {				
			FormRelationshipUtils.child_defaultDiv( cbody, value.id );
			FormRelationshipUtils.sibling_defaultDiv( sibbody, value.id );
			FormRelationshipUtils.parent_defaultDiv( pbody, value.id );
			FormRelationshipUtils.connect_defaultDiv( connectbody, value.id);
			FormRelationshipUtils.show_defaultConnDiv( showConnBody, value.id );
		});
				
		$.each(connMapViaId, function(key, value){			
			// grab the rule to find out if it's a link or PC
			var rule = ruleMapViaId[ value.ruleId ];		
			// for TARGET
			/**    * For PC : Put it as CHILD of the TARGET           	 * For Link : Put it as SIBLING as both TARGET/SOURCE    */	
			// for SOURCE
			/**    * For PC : Put it as PARENT of the SOURCE     		 * For Link : Put it as SIBLING as both TARGET/SOURCE	 */
			var target = typeMapViaId[ value.target ];
			var source = typeMapViaId[ value.source ];			
			( new FormRenderer() ).populateParentSiblingChild(rule, source, target);						 
		});
				
		var propbody = document.getElementById('typeFormPropertyDiv');
		propbody.innertHTML = "";
				
		$.each(typeMapViaId, function(key, value){	
			var formObj = new FormRenderer();
			FormTypePropertyUtils.displayFinalTypeProperties( propbody, value, true, formObj.typeDisplayFunct, formObj.propertyTableFunct, formObj.displayFunct, formObj.footerFunct );	
		});
		
	};
	
	this.initHeaderBar = function(){
		
		var nb = Object.keys(typeMapViaId).length;
		var inputs = '';	
		var mapOfTypes = new Map();
					
	    inputs += "<tr><td class='create_icon' onclick=\"( new FormRenderer() ).addCreateType();\"><img  id='img_create' title='Create type'   src='"+img_path+ "design_icons/create.png'></td>";	    
		inputs += "<td><img src='"+img_path+ "icons/Help-icon.png' title='Help'  width='25' onclick='FormRelationshipUtils.tutorialFormDesign ();' alt='Help'> <span id='totalNB' class='badge'>*("+nb+")</span></td>";

		if( nb != 0 ){							
			$.each(typeMapViaId, function(key, value){						
				// add it to the current map
				var check = mapOfTypes.get( value.id );							
				if( check == null ) {			
					var holder = new TypeHolder();				
					mapOfTypes.set( value.id, holder );
				}				
				 inputs += "<td  id='typeId_"+value.id+"' >";
				 if( value.classification == 'node' ) {
					 inputs += "<span class='badge'  style='color:black; background:"+value.color+"'  ";
				  }else {
					  inputs += "<span class='label label-info' ";
				  }
				 inputs += "  id='"+value.id+"' title='Select to view in form' onclick=\"( new FormRenderer() ).selectedType('" + value.id + "')\"  >"+value.name+"</span></td>"; 	
			});			
					
		}else {   
			// may need to display a message
		}
		inputs +="</tr>";			
		document.getElementById('formRenderer_typesList').innerHTML = inputs;				
   };
		
	this.populateParentSiblingChild = function ( rule, source, target) {
				
		var connName  = connMapViaId[rule.id].name;
		var minRel    = connMapViaId[rule.id].minRel;
		var maxRel    = connMapViaId[rule.id].maxRel;
		if( Number(maxRel) == -1) {
			var connMax = 'infinity'
		}else connMax = maxRel;
		if ( Number(minRel) == 0 ){ 
			var connMin = 'optional';
		}else connMin = minRel;
		if(  rule.classification == 'parentchild' ) {			
			
			// add to the table  Child
			var tableChildDiv = $( "#typeFormPropertyChildTable_" + source.id );
			tableChildDiv.append('<tr class="child"><td><a href="#" onclick="( new FormRenderer() ).selectedType(' + target.id + ')">' +  
					target.name + '</a></td><td><a href="#" id="" onclick="( new FormRenderer() ).showConnection( event, ' +rule.id + ')">' + connName +'('+connMin+','+connMax+')</td></tr>');
		
			// add to the table  Parent 
			var tableChildDiv = $( "#typeFormPropertyParentTable_" + target.id );
			tableChildDiv.append('<tr class="parent"><td><a href="#" onclick="( new FormRenderer() ).selectedType(' + source.id + ')">' +  
					source.name + '</a></td><td><a href="#" onclick="( new FormRenderer() ).showConnection( event, ' +rule.id + ')">' + connName +'('+connMin+','+connMax+')</td></tr>');

		} else if(  rule.classification == 'link' ) {
			// add to the table  Sibling
			var tableSib1Div = $( "#typeFormPropertySiblingTable_" + target.id );
			tableSib1Div.append('<tr class="sibling"><td><a href="#" onclick="( new FormRenderer() ).selectedType(' + source.id + ')">' +  
					source.name + '</a></td><td><a href="#" onclick="( new FormRenderer() ).showConnection( event, ' +rule.id + ')">' + connName  +'('+connMin+','+connMax+')</td></tr>');
					
			var tableSib2dDiv = $( "#typeFormPropertySiblingTable_" + source.id );
			tableSib2dDiv.append('<tr class="sibling"><td><a href="#" onclick="( new FormRenderer() ).selectedType(' + target.id + ')">' +  
					target.name + '</a></td><td><a href="#" onclick="( new FormRenderer() ).showConnection( event, ' +rule.id + ')">' + connName +'('+connMin+','+connMax+')</td></tr>');
			
		} else {
			// ? What could this be?
		}			
	};
	
	this.populateConnectTo = function( typeid) {	
		
		if( !typeid ){
			console.log("no typeid provided ");
			return;
		}
		var classificationTypeId = typeMapViaId[typeid].classification;
		var tableConnectDiv = $( "#typeFormConnectTable_" + typeid );		
		$(".addConnection_"+typeid).remove() ;
			
		var inputRow = "<tr class='addConnection_"+typeid+"'>";		
		inputRow   +=  "<th><input type='radio' value='parentchild' id='parentchild"+typeid+"' name='typeConnection_"+typeid+"'  onclick='(new FormRenderer() ).showTd("+typeid+")' / >Parent/Child<br/>";	
		inputRow   +=  "<input type='radio' value='link' id='link"+typeid+"'  name='typeConnection_"+typeid+"'  onclick='(new FormRenderer() ).showTd("+typeid+")'  >Link</th>";		
		inputRow   +=  "<td id='ifConnection"+typeid+"' style='display:none;visibility:hidden' ><input type='radio' value='parent' name='typeposition_"+typeid+"' checked='checked'/ ><b>"+typeMapViaId[typeid].name +"</b> will be parent of <br/>";	
		inputRow   +=  "<input type='radio' value='child' name='typeposition_"+typeid+"'/ ><b>"+typeMapViaId[typeid].name +"</b> will be Child of <br/></td>";	
		inputRow   +=  "<td><select  id='typeIdValue_"+typeid+"'><option value=''>select Type ...</option> ";
	
		$.each(typeMapViaId, function(key, value) {
			if( classificationTypeId == value.classification && classificationTypeId != 'path' ){
			       inputRow  += "<option value='"+key+"'>"+value.name+"</option>";	
			}
		});
			
		inputRow   +=  "</select></tr>";
		inputRow   +=  "<tr class='addConnection_"+typeid+"'><td> minRel :</td><td colspan='2'><input type=number id='addConnection_" + typeid +"_minRel' value='0' ></td></tr>";
		inputRow   +=  "<tr class='addConnection_"+typeid+"'><td> maxRel :</td><td colspan='2'><input type=number id='addConnection_" + typeid +"_maxRel' value='-1' ></td></tr>";		
		inputRow   +=  "<tr class='addConnection_"+typeid+"'  ><td colspan='3'><input type=button value='Add' onclick=\"( new FormRenderer() ).addConnectionLink('" + typeid +"');\"></td></tr>";
		inputRow   +=  "</td></tr><tr class='addConnection_"+typeid+"' id='errorMsgCreateRelationship"+typeid+"'><td colspan='3'></td</tr>";
				
		tableConnectDiv.append(inputRow);
	}
	
	this.showTd = function (typeid){
		if(document.getElementById('parentchild'+typeid).checked){
			document.getElementById('ifConnection'+typeid).style.visibility = 'visible';
			document.getElementById('ifConnection'+typeid).style.display = 'block';
		}else {
			document.getElementById('ifConnection'+typeid).style.display = 'none';
			document.getElementById('ifConnection'+typeid).style.visibility = 'hidden';
		}         					    
	}	
	
	/**
	 * Display Functions
	 */
	

//	Display the TYPE Info	
	this.typeDisplayFunct = function( type ) {		
		var currHeader = "";
		var color = type.color;
		currHeader += "<div class='formpropdiv' id='formtypeprop_" + type.id + "' style='display:none'>";
		var classification = type.classification;
		currHeader += "<br/><div id='type'>";
		$.each(type, function(key, value) {
			
			if(key == 'name')  {                                  
				currHeader += "<p><b>" + key + ": </b>    ";	
				if( classification == 'node' ) {
					currHeader += "<span class='badge'  style='color:black; background:"+color+"'  ";
				  }else {
					  currHeader += "<span class='label label-info' ";
				  }
				currHeader += "> " + value + "</span> </td><td colspan='6'></p>";	
			};
			if(key == 'classification'){
				currHeader += "<p><b>"+key + ": </b>  ";
				currHeader += value+"</p>";
			};
			if (key == 'isRoot') {
				currHeader += "<p><b>"+key + ": </b>  ";
				currHeader += "<input type='checkbox'  ";
				if (value == true) { 
					currHeader += "checked='checked' disabled='disabled'  > </p>";
				} else { 
					currHeader += " ></p>";     
				}
			};
			if( key == 'sysProperties' ){
				if( value.restrictionStatus) {
					currHeader += "<p><b>Restriction Status :</b>";
					currHeader += "<input type='text'  ";
					if(value.restrictionStatus.value == 'ROOTONLY'){
						currHeader+= " value='ROOTONLY' disabled='disabled'  ></p>";
					}else {
						currHeader += "value=''  disabled='disabled' ></p>";
					}
				}
			};			
		});
		currHeader += "</div>"
		return currHeader;
	};
	
//	Display table of TYPE PROPRIETES
	this.propertyTableFunct = function(  properties, propertyDisplayFunction ) {
		
		var tempPropInputs = "";		
		if ( properties == null || properties.length == 0 || $.isEmptyObject(properties)  ) {

			tempPropInputs += "<p> No properties added </p>";
		} else {	
			tempPropInputs += "<br/><table border=1 class='properties' ><tr><th colspan='8' style='background-color: #CDEEDD'>Properties:</th></tr>";			
			tempPropInputs += "<tr style='background-color: lightgrey'><th>Name</th><th>Type</th><th>Default</th><th>Mandatory</th><th>Unique</th><th>Min</th><th>Max</th></tr>";			
	
			$.each(properties, function(key, value) {
				var tempProp = FormTypePropertyUtils.displayTypeProperty( value, propertyDisplayFunction );	
				tempPropInputs += tempProp ;
			});
		
			tempPropInputs += "</table>";
		} 		
		return tempPropInputs;
	};
	
//	Display Row for EACH PROPERTY
	this.displayFunct = function( appendTo, property  ) {
		
		var tmpInputs = "";		
//		console.log("Entered display  line 295 func");
		
		if ( property == null ) {
			// inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";
		} else {			 
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
		     tmpInputs += "</tr>";
		} 		
		return tmpInputs;
	};
	
//    Display Row for ADDING NEW PROPERTY	
	this.footerFunct = function( type ) {
		var pretext = 'type_';
		var propFunc = function( appendTo, type, property ) {
		var input = "<form id='add_property_form_'" + type.id + "' onsubmit=''>";
			
			// put the type so we can use this to add it properly later
			input += "<input type='add_property_hidden_type_id' value='" + type.id + "'/>";           
			
			// create table
			 input = "<hr/><table  width='60%'>";
			 input += "<tr class='addproperty'><th>Name</th><th>Type</th><th>Default Value</th><th>Is Mandatory</th><th>Is Unique</th><th>Max Value</th><th>Min Value</th><th></th></tr>";			 
			 input += "<tr class='addproperty'>";
			 input += "<td><input type='text'    id='type_" + type.id + "_add_property_propertyName'  /></td>";
			 
			 input += "<td><select id='type_" + type.id + "_add_property_propertyType' onchange=\"FormRelationshipUtils.updateDefaultField("+type.id+", \'"+pretext+"\')\">" +
			 		"<option value='STRING'>TEXT</option>"+
			 		"<option value='INTEGER'>INTEGER</option>"+
					"<option value='DOUBLE'>DOUBLE</option>"+
					"<option value='DATE'>DATE</option>"+
					"<option value='BOOLEAN'>BOOLEAN</option>"+
					"<option value='FILE'>FILE</option>"+
					"<option value='CURRENCY'>CURRENCY</option>"+
					"</select></td>";
			 				 
			 input += "<td> <input type='text' id='type_" + type.id + "_add_property_defaultValue' defaultValue='' value='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></td>";
			 input += "<td align='center' ><input type='radio' name='type_" + type.id + "_add_property_isMandatory'    value='true' checked='checked'/>Yes<br>";
			 input += "<input type='radio'     name='type_" + type.id + "_add_property_isMandatory'    value='false' />No</td>";
			 input += "<td align='center' ><input type='radio' name='type_" + type.id + "_add_property_isUnique'  value='true' checked='checked'/>Yes<br>";
			 input += "<input type='radio'     name='type_" + type.id + "_add_property_isUnique'  value='false' />No</td>";			 				 	
			 input += "<td> <input type='text' id='type_" + type.id + "_add_property_maxValue'  /></td>";
			 input += "<td> <input type='text' id='type_" + type.id + "_add_property_minValue'  /></td>";		 
			 input += "<td><input type='button' value='Save  Property' class='btn btn-primary btn-xs'    onclick='( new FormRenderer() ).saveProperty(" + type.id + ");'/></td>";			 	 
			 input += "</tr></table>"; 
			 input += "</form>";			 
			 return input;
		};
		
		var tempFooter = "";
		tempFooter += "<tr><td colspan=8> ";
		tempFooter += "<input type='button' value='Update "+typeMapViaId[type.id].name+"'    class='btn btn-primary btn-xs'    onclick='(new FormRenderer() ).updateTypeForm("+type.id+")'/>";
		tempFooter += "</td></tr>";
		tempFooter += "<tr><td colspan=8>";				
		tempFooter += FormTypePropertyUtils.displayAddPropertyForm( null, type, null, propFunc );			
		tempFooter += "</td></tr></table>";
		tempFooter += "</div>";		
		return tempFooter;

	};
			
	this.addConnectionLink = function (typeid){
		// this function retrieve all details from the form : 
		//          Type Focussed on;  
		//          Type Destination 
        //          Connection  (as Parent o0r as child )  or Link
		//    IF Any missing  process will issue errors and stop
		if(!typeid ){
			console.log(" missing typeid " + typeid);
			return;
		}
		var errorList = 0;
		// retrieve type of connection
		var typeConnection = $('input[name="typeConnection_'+typeid+'"]:checked').val();				
		console.log(" Type connection is : "+ typeConnection);
		
		if(!typeConnection ){
			console.log(" missing typeConnection:  "+ typeConnection  +"  or type Destination not selected "+ typeDestId);
			$('#errorMsgCreateRelationship'+typeid).append("no selection of connection or link");
			errorList++;
		}
				
	   // retrieve typeId  selected for destination
		var ele = document.getElementById('typeIdValue_'+typeid);	
		var typeDestId     = ele.options[ele.selectedIndex].value;
		
		if(!typeDestId ){
			console.log(" missing  type Destination not selected "+ typeDestId);
			$('#errorMsgCreateRelationship'+typeid).append("missing  type Destination not selected");
			errorList++;
		}
		
		var minRel = $('#addConnection_'+typeid+'_minRel').val();
		console.log( minRel);
		if(!minRel){
			  $('input[id="addConnection_'+typeid+'_minRel"]').val('Missing value');
			  $('#errorMsgCreateRelationship'+typeid).append("missing  minRel value ");
			  errorList++;	
		}		
		
		var maxRel = $('#addConnection_'+typeid+'_maxRel').val();
		if(!maxRel){
			  $('input[id="addConnection_'+typeid+'_maxRel"]').val('Missing value');
			  $('#errorMsgCreateRelationship'+typeid).append("missing  maxRel value ");
			  errorList++;	
		}
		
		if(typeConnection == 'parentchild'){
			var position       = $('input[name="typeposition_'+typeid+'"]:checked').val();
			if(!position){
				console.log(" error missing position (Node as Parent/child ");
				$('#errorMsgCreateRelationship'+typeid).append("select the position of the type as 'Parent' or 'Child' ");
				  errorList++;
			}
		}
		
		if( errorList> 0 ){   // stop saving process
			return;
		}
		console.log("Type Focussed on : "+typeid+" type Destination is "+ typeDestId+"  typeConnection "+typeConnection);

		if(typeConnection == 'parentchild'){						
				if( position == 'parent') {
					TypeUtils.addConnection(typeid, typeDestId, typeConnection, minRel, maxRel );
																				
				}else if(position == 'child'){
					TypeUtils.addConnection( typeDestId,typeid, typeConnection, minRel, maxRel );
				}
		}else {				
				TypeUtils.addConnection( typeDestId,typeid, typeConnection, minRel, maxRel );		
		}
		( new FormRenderer() ).updateParentChildrenSibling(typeid);			
	  	( new FormRenderer() ).populateConnectTo(typeid);
				
	}
	
	this.addParentTypeForm = function( typeid ) {
		var classification = typeMapViaId[typeid].classification;
		if($( ".addParentRow" ).length == 0 && classification != 'path') {
			var tableSib2dDiv = $( "#typeFormPropertyParentTable_" + typeid );
			tableSib2dDiv.append('<tr class="addParentRow"><td colspan=2>&nbsp;</td></tr>');
			tableSib2dDiv.append('<tr class="addParentRow"><td colspan="2" style="background:grey">Type values:</td></tr>');
			tableSib2dDiv.append('<tr class="addParentRow"><td> Name :</td><td><input type=text id="addParentRow_' + typeid + '_name" onfocus="this.value = \'\'" ></td></tr>');
			tableSib2dDiv.append('<tr class="addParentRow"><td> Classification :</td><td><input type=text id="addParentRow_' + typeid + '_classification" value = "'+classification+'" disabled="disabled" ></td></tr>');
			tableSib2dDiv.append('<tr class="addParentRow"><td> isRoot :</td><td><input type=checkbox id="addParentRow_' + typeid + '_isRoot" value="true" checked="checked" >true</td></tr>');	
			tableSib2dDiv.append('<tr class="addParentRow"><td> Restriction Status :</td><td><input type=checkbox id="addParentRow_' + typeid + '_restrictionStatus" value="true" checked="checked">true</td></tr>');
			
			tableSib2dDiv.append('<tr class="addParentRow"><td colspan="2" style="background:grey">Relationship values:</td></tr>');			
			tableSib2dDiv.append('<tr class="addParentRow"><td> minRel :</td><td><input type=number id="addParentRow_' + typeid + '_minRel" value="0" ></td></tr>');
			tableSib2dDiv.append('<tr class="addParentRow"><td> maxRel :</td><td><input type=number id="addParentRow_' + typeid + '_maxRel" value="-1" ></td></tr>');
			tableSib2dDiv.append('<tr class="addParentRow"><td colspan="2" align="center"><input type=button name="add" class="btn btn-primary btn-xs" value="Add Parent" onclick=\"FormTypePropertyUtils.saveNodeParentChildSiblingWithConnection('+typeid+',\'Parent\');\"><input type=button name="cancel" value="cancel" onclick="FormTypePropertyUtils.cancelAddParent()"></td></tr>');
			
	} else {
			console.log("FOUND SOMETING : " + $( ".addParentRow" ).length);
		}
	};

	this.addChildTypeForm = function( typeid ) {
		var classification = typeMapViaId[typeid].classification;
		if($( ".addChildRow" ).length == 0 && classification != 'path' ) {		
			var tableSib2dDiv = $( "#typeFormPropertyChildTable_" + typeid );
			tableSib2dDiv.append('<tr class="addChildRow"><td colspan="2">&nbsp;</td></tr>');
			tableSib2dDiv.append('<tr class="addChildRow"><td colspan="2" style="background:grey">Type values:</td></tr>');			
			tableSib2dDiv.append('<tr class="addChildRow"><td> Name :</td><td><input type=text id="addChildRow_' + typeid + '_name" onfocus="this.value = \'\'" ></td></tr>');
			tableSib2dDiv.append('<tr class="addChildRow"><td> Classification :</td><td><input type=text id="addChildRow_' + typeid + '_classification" value = "'+classification+'" disabled="disabled" ></td></tr>');
			tableSib2dDiv.append('<tr class="addChildRow"><td> isRoot :</td><td><input type=checkbox id="addChildRow_' + typeid + '_isRoot" value="true" checked="checked" >true</td></tr>');
			tableSib2dDiv.append('<tr class="addChildRow"><td> Restriction Status :</td><td><input type=checkbox id="addChildRow_' + typeid + '_restrictionStatus" value="true" checked="checked">true</td></tr>');
			
			tableSib2dDiv.append('<tr class="addChildRow"><td colspan="2" style="background:grey">Relationship values:</td></tr>');			
			tableSib2dDiv.append('<tr class="addChildRow"><td> minRel :</td><td><input type=number id="addChildRow_' + typeid + '_minRel" value="0" ></td></tr>');
			tableSib2dDiv.append('<tr class="addChildRow"><td> maxRel :</td><td><input type=number id="addChildRow_' + typeid + '_maxRel" value="-1" ></td></tr>');
			tableSib2dDiv.append('<tr class="addChildRow"><td colspan="2" align="center"><input type=button name="add" class="btn btn-primary btn-xs" value="Add Child" onclick=\"FormTypePropertyUtils.saveNodeParentChildSiblingWithConnection('+typeid+',\'Child\');\"><input type=button name="cancel" value="cancel" onclick="FormTypePropertyUtils.cancelAddChild()"></td></tr>');
			
		} else {
			console.log("FOUND SOMETING : " + $( ".addChildRow" ).length);
		}
		
	};	

	this.addSiblingTypeForm = function( typeid ) {
		var classification = typeMapViaId[typeid].classification;
		if($( ".addSiblingRow" ).length == 0 && classification != 'path' ) {
			var tableSib2dDiv = $( "#typeFormPropertySiblingTable_" + typeid );
			tableSib2dDiv.append('<tr class="addSiblingRow"><td colspan=2>&nbsp;</td></tr>');
			tableSib2dDiv.append('<tr class="addSiblingRow"><td colspan="2" style="background:grey">Type values:</td></tr>');		
			tableSib2dDiv.append('<tr class="addSiblingRow"><td> Name :</td><td><input type=text id="addSiblingRow_' + typeid + '_name" onfocus="this.value = \'\'" ></td></tr>');
			tableSib2dDiv.append('<tr class="addSiblingRow"><td> Classification :</td><td><input type=text id="addSiblingRow_' + typeid + '_classification" value = "'+classification+'" disabled="disabled" ></td></tr>');
			tableSib2dDiv.append('<tr class="addSiblingRow"><td> isRoot :</td><td><input type=checkbox id="addSiblingRow_' + typeid + '_isRoot" value="true" checked="checked" >true</td></tr>');
			tableSib2dDiv.append('<tr class="addSiblingRow"><td> Restriction Status :</td><td><input type=checkbox id="addSiblingRow_' + typeid + '_restrictionStatus" value="true" checked="checked">true</td></tr>');
			
			tableSib2dDiv.append('<tr class="addSiblingRow"><td colspan="2" style="background:grey">Relationship values:</td></tr>');			
			tableSib2dDiv.append('<tr class="addSiblingRow"><td> minRel :</td><td><input type=number id="addSiblingRow_' + typeid + '_minRel" value="0" ></td></tr>');
			tableSib2dDiv.append('<tr class="addSiblingRow"><td> maxRel :</td><td><input type=number id="addSiblingRow_' + typeid + '_maxRel" value="-1" ></td></tr>');
			tableSib2dDiv.append('<tr class="addSiblingRow"><td colspan="2" align="center"><input type=button name="add Sibbling" class="btn btn-primary btn-xs" value="Add Sibling" onclick=\"FormTypePropertyUtils.saveNodeParentChildSiblingWithConnection('+typeid+',\'Sibling\');\"><input type=button name="cancel" value="cancel" onclick="FormTypePropertyUtils.cancelAddSibling()"></td></tr>');
			
		} else {
			console.log("FOUND SOMETING : " + $( ".addSiblingRow" ).length);
		}
			
	};
			
	this.showConnection = function ( event, connId ){
		
		 svgXValue = event.clientX;
		 svgYValue = event.clientY;
		console.log( "coords : X=  "+ svgXValue + " Y= "+ svgYValue )
		var currInput = "";		
		$('div#typeFormRuleUpdateDiv_'+listTypeIds[0]).empty();
		
        currInput += "<br /><table id='connectionPropDiv_" + connId + "' ><tr><th colspan='2' style='background-color:grey'>Connection Details</th></tr> ";
		var connInfo = connMapViaId[connId];
		$.each(connInfo, function(key, value) {
			if ((key == 'classification') || (key == 'origin')||(key == 'destination') ||( key == 'name') ||( key == 'minRel') || (key == 'maxRel') || (key == 'ruleId')) {
				currInput += "<tr><th>" + key + "</th>";
				if( (key == 'name') ||( key == 'minRel')||(key == 'maxRel')) {
					currInput += "<td><input type='text' name='"+key+'_'+connId+"_updateConn' id='"+key+'_'+connId+"_updateConn' value='"+value+"'>";
					
					if( key == 'minRel'){
						if(value == '0') { currInput += "(Optional)";}
						else if(value >= '1'){ currInput += "(Mandatory)"; }
						currInput += "</td><tr>";
					};
					
					if( key == 'maxRel'){  						
						if(value == '-1') { 
							currInput += "(infinity)";  
						}
						currInput += "</td><tr>"; 
					};
					if (key == 'name') { currInput += "</td><tr>"; }
						
				}else { 
					currInput += "<td><input type='text' name='"+key+"' value='"+value+"' disabled='disabled' ></td><tr>"; 
					}
			}						 
		});
		
		currInput += "<tr><td colspan='2'><br/></td></tr>";
				
		var ruleId = connMapViaId[connId].ruleId;
		var connProperties = ruleMapViaId[ruleId].typeProperties;
		
		var tempPropInputs = "";		
		if ( connProperties == null || connProperties.length == 0   || $.isEmptyObject(connProperties) ) {
			tempPropInputs += "<tr><th colspan='7'> No properties added </th></tr>";
		} else {
			console.log(" I am in this.propertyUpdateTableFunct  else ");
			tempPropInputs += "<tr><th colspan='7' style='background-color: #CDEEDD'>Properties:</th></tr>";			
			tempPropInputs += "<tr><td colspan='7'>";
			tempPropInputs += "<table border=1  class ='updateConProperties' >";
			tempPropInputs += "<tr style='background-color: grey'><th>Name</th><th>Type</th><th>Default</th><th>Mandatory</th><th>Unique</th><th>Min</th><th>Max</th></tr>";
				
			var inputs = '';
			$.each(connProperties, function(key, value) {
				var newInput = ( new FormRenderer() ).displayUpdateFunct(null,  value );
				inputs += newInput ;
			});
		
			tempPropInputs = tempPropInputs + inputs;
		}
		currInput = currInput + tempPropInputs;
	
		currInput += "<tr><td colspan='7'></td></tr>";
		currInput += "<tr><td colspan='7'><input type='button' class='btn btn-primary btn-xs' name='update' value='Update Connection' onclick='FormTypePropertyUtils.updateConnectionAndProperties(" +connId + ", "+listTypeIds[0]+");'>";
		currInput += "<input type='button' name='delProperty' value='Delete Connection'  onclick='( new FormRenderer() ).deleteConnection(" +connId + ", "+listTypeIds[0]+")'>";
		currInput += "<input type='button' name='addProperty' value='Add Property'  onclick='( new FormRenderer() ).addConnProperty(" +connId + ", "+listTypeIds[0]+")'>";			
		currInput += "<input type='button' name='Cancel' value='Hide'  onclick='( new FormRenderer() ).cancelUpdateConn("+listTypeIds[0]+")'></td></tr>";

		currInput += "</table>";
		$('div#typeFormRuleUpdateDiv_'+listTypeIds[0]).append(currInput);		
		
		 var position = document.querySelector('div#typeFormRuleUpdateDiv_'+listTypeIds[0]);
		 $('div#typeFormRuleUpdateDiv_'+listTypeIds[0]).show().css( {position:"absolute", top:svgYValue + 50, left: svgXValue + 50});
		
		var showconnDiv = document.getElementById("typeFormRuleUpdateDiv_"+listTypeIds[0] );
			if( showconnDiv != null ) {
				showconnDiv.style.display = "block";
				showconnDiv.style.visibility = "visible";
			}		
	}
	
	this.addConnProperty = function ( connId, typeId ){
		var connInfo = connMapViaId[connId];		
		$('div#typeFormRuleUpdateDiv_'+typeId).empty();						
		var Form, formHeader, formFooter, newProperty, properties, inputs='', pretext = 'conn_'; 
		Form = document.createElement('div');  
			  
	    inputs += "<div id='connPropAddDiv'><label style='background-color:grey'>Connection Selected: </label>" + connInfo.name 
	    	      + "<input type='hidden' id='connid' value='"+ connInfo.id +"'/>" 
	    	      + "<input type='hidden' id='connname' value='"+ connInfo.name +"'/><br/>";
		inputs += "<button type='button' class='btn btn-primary btn-xs'   onclick=\"FormTypePropertyUtils.addProperties("+connInfo.id+","+typeId+")\">Add property</button></div>";

		formFooter = "<div id='connPropertiesFields'></div>";
		formFooter += "<div><input id='save_conn_prop_button' type='button' value='Save properties'  class='btn btn-primary btn-xs' onclick=\"FormTypePropertyUtils.saveConnProperties("+connInfo.id+","+typeId+" )\">";
		formFooter += "<input id='cancel_conn_prop_button' type='button' value='Cancel'  class='btn btn-primary btn-xs' onclick=\"( new FormRenderer() ).cancelUpdateConn("+typeId+" )\" /></div>";
		
		Form.innerHTML =  inputs + formFooter;

		$('div#typeFormRuleUpdateDiv_'+typeId).append(Form);
					
		 newProperty = document.createElement('div');
		 newProperty.setAttribute('class', 'add_conn_property');
		 
		 properties = "<hr/><form><table>";
		 properties += "<tr><th>Name :</th><td><input type='text' id='conn_"+ connInfo.id +"_add_property_propertyName' size='10' /></td></tr>";
		 properties += "<tr><th>Type:</th>";
		 properties += "<td><select id='conn_"+ connInfo.id +"_add_property_propertyType'  onchange=\"FormRelationshipUtils.updateDefaultField("+connInfo.id+", \'"+pretext+"\')\"   >" +
                            "<option value='STRING'>TEXT</option>"+
                            "<option value='INTEGER'>INTEGER</option>"+
                            "<option value='DOUBLE'>DOUBLE</option>"+
                            "<option value='DATE'>DATE</option>"+
                            "<option value='BOOLEAN'>BOOLEAN</option>"+
                            "<option value='FILE'>FILE</option>"+
                            "<option value='CURRENCY'>CURRENCY</option>"+       

                            "</select></td></tr>"; 
		 properties += "<tr><th>Default Value:</th><td> <input type='text' id='conn_"+ connInfo.id +"_add_property_defaultValue'  defaultValue='' value='' onchange='GlobalHTMLUtils.setDefaultValueForInput(this);' /></td></tr>";
		 properties += "<tr><th> isMandatory:</th>";
		 properties += "<td><input type='radio' name='conn_"+ connInfo.id +"_add_property_isMandatory' value='true' checked='checked'/>Yes<br/>";
		 properties += "<input type='radio' name='conn_"+ connInfo.id +"_add_property_isMandatory' value='false' />No</td></tr>";
		 
		 properties += "<tr><th> isUnique: </th>";
		 properties += "<td><input type='radio' name='conn_"+ connInfo.id +"_add_property_isUnique' value='true' checked='checked'/>Yes<br/>";
		 properties += "<input type='radio' name='conn_"+ connInfo.id +"_add_property_isUnique' value='false' />No</td></tr>";
		 
		 properties += "<tr><th>Min Value:</th><td> <input type='text' id='conn_"+ connInfo.id +"_add_property_minValue' /></td></tr>";		         
	     properties += "<tr><th>Max Value:</th><td> <input type='text' id='conn_"+ connInfo.id +"_add_property_maxValue' /></td></tr>";
		 properties += "</table></form>";
		 			 
		 newProperty.innerHTML = properties;
		 document.getElementById('connPropertiesFields').appendChild(newProperty);
				
	}
	
	this.deleteConnection  = function (  connId , typeId){
		var connInfo = connMapViaId[connId];
		var jsonData = {};
		
		var origin      = connInfo.origin;
		var destination = connInfo.destination;
		var rule        = connInfo.rule;
		var name        = connInfo.name;		
		
		console.table(jsonData);
			
		var doneFunction = function( data ) {
			console.log(data);
			$('#console-log').append("<p style='color:blue'>Connection Deleted successfully.</p>");
            delete connMapViaId[connInfo.id]; 
            delete connMap[name];
			delete ruleMapViaId[connInfo.ruleId];
			( new FormRenderer() ).cancelUpdateConn(typeId);
			( new FormRenderer() ).updateParentChildrenSibling(typeId);		
			
		};
			
		var failFunction = function( xhr, status, error ) {
			console.log('Error Delete Connection not done: ' + xhr.status);
			$('#console-log').append("<p style='color:red'>Error Delete Connection not done."+xhr.status+"</p>");
		};
		
		var apis = new apiRomeNext();			
		apis.deleteConnection(origin, destination, rule, jsonData, doneFunction, failFunction);												
		
	}
				
	this.cancelUpdateConn = function( selectedTypeId ){
		
		 svgXValue = 0;
		 svgYValue = 0;
		var showconnDiv = document.getElementById("typeFormRuleUpdateDiv_"+selectedTypeId );			  	
		if( showconnDiv != null ) {
			$('div#typeFormRuleUpdateDiv_'+selectedTypeId).empty()
			showconnDiv.style.display = "none";
			showconnDiv.style.visibility = "hidden";
					
		}		
	}
		

	this.updateParentChildrenSibling = function ( selectedTypeId ){
		
		FormRelationshipUtils.resetDivision('Child',   selectedTypeId);
		FormRelationshipUtils.resetDivision('Parent',  selectedTypeId);
		FormRelationshipUtils.resetDivision('Sibling', selectedTypeId);
		$.each(connMapViaId, function(key, value){		
			// grab the rule to find out if it's a link or PC
			var rule = ruleMapViaId[ value.ruleId ];
			var target = typeMapViaId[ value.target ];
			var source = typeMapViaId[ value.source ];
			if( source.id == selectedTypeId || target.id ==  selectedTypeId )  {
				( new FormRenderer() ).populateParentSiblingChild(rule, source, target);		
			}
		});
	};		
	
	this.selectedType = function( selectedTypeId ) {
		
		console.log("Attempting to show :" + selectedTypeId );
		// hide all the others
		$('div.formpropdiv').hide();
		$('div.typeFormPropertyParentDiv').hide();
		$('div.typeFormPropertyChildDiv').hide();
		$('div.typeFormPropertySiblingDiv').hide();
		$('div.typeFormConnectionDiv').hide();
		$('div.typeFormRuleUpdateDiv').hide();
		$('#typeFormCreateDiv').hide();
		var img = document.getElementById("img_create");
		    img.src = img_path +"design_icons/create.png";	
		$('#typeFormTutorial').hide(); 
		// nedd also to clear all .addParentRow, addChildRow, .addSiblingRow
		FormTypePropertyUtils.cancelAddChild();
		FormTypePropertyUtils.cancelAddParent();
		FormTypePropertyUtils.cancelAddSibling();
		if(selectedTypeId !=null){
		
			// we don't care about this, just enable it if it exists
			document.getElementById("formtypeprop_" + selectedTypeId ).style.display = "block";            //show the Type info
			if( typeMapViaId[selectedTypeId].classification != 'path')	{	
				( new FormRenderer() ).updateParentChildrenSibling(selectedTypeId);
				( new FormRenderer() ).populateConnectTo(selectedTypeId);
			
			    // show the different division		
				DesignInterfaceUtils.showDivision("typeFormPropertyParentDiv_", selectedTypeId );		
				DesignInterfaceUtils.showDivision("typeFormPropertyChildDiv_", selectedTypeId );		
				DesignInterfaceUtils.showDivision("typeFormPropertySiblingDiv_", selectedTypeId );		
				DesignInterfaceUtils.showDivision("typeFormConnectionDiv_", selectedTypeId );	
			}
			
			listTypeIds[0]=selectedTypeId ;
	    }
		
	}
		
	this.saveProperty = function( typeid ) {		
		FormTypePropertyUtils.saveAddPropertyForm( typeid, 'type_' );			
		 if( !errorStatus ) {( new FormRenderer() ).updateCachedFormType( typeid );}		
	};
	
	this.updateCachedFormType = function( typeid ) {
		
		var body = document.getElementById('typeFormPropertyDiv');	
		$("#formtypeprop_" + typeid ).remove();
		
		var typeObj = typeMapViaId[ typeid ];
		var formObj = new FormRenderer();		
		// do api call to update the value of this
		formObj.removeCurrentTypeInfo(typeid);				
		FormTypePropertyUtils.displayFinalTypeProperties( body, typeObj, true, formObj.typeDisplayFunct, formObj.propertyTableFunct, formObj.displayFunct, formObj.footerFunct );        
		( new FormRenderer() ).selectedType(typeid);
		
	};
			
	// Will remove the current typeid from the form
	this.removeCurrentTypeInfo = function( typeid ) {			
		var div = $("#formtypeprop_" + typeid );		
		div.remove();		
	}

//	Display For CREATE  NEW  TYPE 	
	this.addCreateType = function(){
		$('#typeFormTutorial').hide(); 
		var img = document.getElementById("img_create");
		
		if(GlobalUtils.retrieveImgname(img) == "create.png") {                       //		first click on the button
			img.src = img_path + "design_icons/create_01.png";
			
			(new FormRenderer() ).selectedType(null);			
			var input = "<form id='add_type_form'>";			
			 input += "<hr/><table border='2'>";
			 input += "<caption>CREATE TYPE</caption>";
			 input += "<tr><th>Name</th><td><input type='text' id='add_type_name' name='name' onfocus=\" this.value = ''; \"      onblur=\"if(this.value == '') { this.value = 'Enter a Value'; }\" /></td></tr>";		 	
			 input += "<tr><th>isRoot</th><td><input type='checkbox' id='add_isRoot' name='isRoot' value='true' checked='checked'>true</td></tr> ";			 
			 input += "<tr><th>Classification: </th><td><select id='add_classification' name='classification'><option value='node'>node</option><option value='path'>Path</option><option value='system'>system</option></select></td>";
			 var ownerId = 123;
			 input += "<input type='text' id='add_owner' name='owner' value='" + ownerId + "' style='visibility:hidden; position:absolute; top:-100px;' />";			 							 
			 input += "<tr><th >Geo View</th><td><label class=\"switch\"><input id=\"geo_activator\" name=\"geo_activator\" type=\"checkbox\" value=\"4\"><div class=\"slider round\"></div></label></td></tr>";
			 input += "<tr><th >Restriction Satus:</th><td><select id='add_restrictionStatus' name='restrictionStatus'><option value=''></option><option value='ROOTONLY'>Root only</option></select></td></tr>";
			 input += "<tr align='center'><td colspan='2'><input type='button'  class='btn btn-primary btn-xs'     value='Add Type' onclick='FormTypePropertyUtils.saveAddTypeForm()'/>";		 	 
			 input += "<input type='button'      class='btn btn-primary btn-xs'     value='Cancel'   onclick='FormRelationshipUtils.resetCreateTypeDiv()' /></td></tr>";							 
			 input += "</table></form>";
			 input += "<div id='error_createType'></div>";
			 var createType = document.getElementById('typeFormCreateDiv');
			 createType.innerHTML = input;	 
			 createType.style.display = "block";			
			
		}else {
//			Second click for create
			img.src = img_path +"design_icons/create.png";			
			var createType = document.getElementById('typeFormCreateDiv');
			createType.innerHTML = "";
			createType.style.display = "none";				
		}
	}
	
		
//====================================Function for update Type & Proprietes ================================	
	this.updateTypeForm = function(typeid){
		
		var body = document.getElementById('typeFormPropertyDiv');		
		$("#formtypeprop_" + typeid ).remove();	
		
        var formObj = new FormRenderer();       
        var typeObj = typeMapViaId[ typeid ];
		
		// do api call to update the value of this
		formObj.removeCurrentTypeInfo(typeid);	
		listDates =[];
		FormTypePropertyUtils.displayFinalTypeProperties( body, typeObj, true, formObj.typeUpdateDisplayFunct, formObj.propertyUpdateTableFunct, formObj.displayUpdateFunct, formObj.footerUpdateFunct );
         
		for (var i=0; i< listDates.length; i++){
        	$(".dateValue").datepicker({
        		changeMonth: true,
      	        changeYear: true,
        		dateFormat: "yy-mm-dd",
        		yearRange : "1950:"+(new Date).getFullYear()
        	});
        }		
		var eleDiv =  document.getElementById('formtypeprop_'+typeid);	
		eleDiv.style.visibility = "visible";
		eleDiv.style.display = "block";
		
	}
	
	this.typeUpdateDisplayFunct = function( type ) {
		console.log("Inside Update type display");
		console.log(" I am in this.typeUpdateDisplayFunct  ");
		var currHeader = "";		
		currHeader += "<div class='formpropdiv' id='formtypeprop_" + type.id + "' style='display:none'>";
		currHeader += "<br/><table id='myid'>";
		$.each(type, function(key, value) {			
			switch ( key ){
				case  'id'            :  currHeader += "<tr><td colspan='7'><input type='hidden' id='"+key+'_'+type.id+"'   value=" + value + " /></td></tr>";	
										 break;
				case  'name'          :	 currHeader += "<tr><th>" + key + "</th>";						
				                         currHeader += "<td><input type='text' id='"+key+'_'+type.id+"'   value=" + value + "  /></td><td colspan='5'></td></tr>";
				                         break;
				case  'classification':  currHeader += "<tr><th>"+key + "</th>";
										 currHeader += "<td><input type='text' id ='"+key+'_'+type.id+"'  value='"+value+"' /></td><td colspan='5'></td></tr>";
										 break;
				case  'isRoot'        :  currHeader += "<tr><th>"+key +":</th>";
										 currHeader += "<td><input type='checkbox' name='isRoot'  id='"+key+'_'+type.id+"'";
										 if (value == true) { 
											currHeader += "  checked='checked' ></td><td colspan='5'></td></tr>";
										 } else { 
											currHeader += "  ></td><td colspan='5'></td></tr>";     
										 }
										 break;
				case  'sysProperties' :  if( value.restrictionStatus) {
											currHeader += "<tr><th>Restriction Status :</th>";
											currHeader += "<td><input type='checkbox' name='restrictionStatus' id='restrictionStatus_"+type.id+"'";
											if(value.restrictionStatus.value == 'ROOTONLY'){
												currHeader+= " checked='checked' ></td><td colspan='5'></td></tr>";
											}else {
												currHeader += " ></td><td colspan='5'></td></tr>";
											}
										}
										break;
				default: 	
				     // other values are not considered;
			
			}	
		});
		currHeader += "<tr><td colspan='7'><input type='hidden' id='owner' value='12'/> </td></tr>";
		return currHeader;
	};
	
	this.propertyUpdateTableFunct = function(  properties, propertyDisplayFunction ) {		
		var tempPropInputs = "";		
		if ( properties == null || properties.length == 0   || $.isEmptyObject(properties) ) {
			tempPropInputs += "<tr><th colspan='7'> No properties added </th></tr></table>";
		} else {
			console.log(" I am in this.propertyUpdateTableFunct  else ");
			tempPropInputs += "<tr><th colspan='7' style='background-color: #CDEEDD'>Properties:</th></tr>";			
			tempPropInputs += "<tr><td colspan='7'>";
			tempPropInputs += "<table border=1 >";
			tempPropInputs += "<tr style='background-color: grey'><th>Name</th><th>Type</th><th>Default</th><th>Mandatory</th><th>Unique</th><th>Min</th><th>Max</th></tr>";
			
			$.each(properties, function(key, value) {
				var tempProp = FormTypePropertyUtils.displayUpdateTypeProperty( value, propertyDisplayFunction );
				tempPropInputs += tempProp ;
			});		
			tempPropInputs += "</td>";
		} 		
		return tempPropInputs;
	};
	
	this.displayUpdateFunct = function( appendTo, property  ) {       //   function used ti display the properties for update
		console.log(" I am in this.displayUpdateFunct ");
			var tmpInputs = "";			
			    console.log("Entered display  update func for property "+ property.name);			
			if ( property == null ) {
				// inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";
			} else {	
				console.log(" I am in this.displayUpdateFunct  else ");
				tmpInputs += "<tr class='updateProperty' id='"+property.id+"_property'>";
				tmpInputs += "<td><input type='hidden' id='currentPropertyName' value='"+ property.name + "'/>";
				tmpInputs += "<input type='text' id='propertyName' value='"+ property.name + "'   /></td>";             // user cannot update propertyName
				tmpInputs += "<td><select id='propertyType'  onselect=''>";			
				tmpInputs += "<option value='STRING'";	
				if( property.propertyType == 'STRING' ){  	tmpInputs += " selected ";	}
				tmpInputs += ">TEXT</option><option value='INTEGER'";	
				if( property.propertyType == 'INTEGER' ){	tmpInputs += " selected ";	}				
				tmpInputs += ">INTEGER</option><option value='DOUBLE'";	
				if( property.propertyType == 'DOUBLE' ){	tmpInputs += " selected ";	}							
				tmpInputs += ">DOUBLE</option><option value='DATE'";	
				if( property.propertyType == 'DATE' ){		tmpInputs += " selected ";	}			
				tmpInputs += ">DATE</option><option value='FILE'";	
				if( property.propertyType == 'FILE' ){	tmpInputs += " selected ";	}				
				tmpInputs += ">FILE</option><option value='CURRENCY'";	
				if( property.propertyType == 'CURRENCY' ){	tmpInputs += " selected ";	}	
				tmpInputs += ">CURRENCY</option><option value='BOOLEAN'";	
				if( property.propertyType == 'BOOLEAN' ){	tmpInputs += " selected ";	}			
				tmpInputs += ">BOOLEAN</option></select></td>";
							     		
				switch ( property.propertyType ){
				case  'INTEGER'  :   if(property.defaultValue){
										tmpInputs += "<td><input type='number' id='defaultValue_"+property.id+"'  defaultValue='"+property.defaultValue+"' value='"+property.defaultValue+"'/> </td>";
									 }else {
									   	tmpInputs +="<td><input type='number' id='defaultValue_"+property.id+"'   value=''/></td>";
									 }
									 break;	
				case  'DOUBLE'   :   if(property.defaultValue){
										tmpInputs += "<td><input type='number' id='defaultValue_"+property.id+"'  defaultValue='"+property.defaultValue+"' value='"+property.defaultValue+"'/> </td>";
									 }else {
									   	tmpInputs +="<td><input type='number' id='defaultValue_"+property.id+"'   value=''/></td>";
									 }
					
									 break;
				case  'CURRENCY' :   if(property.defaultValue){
										tmpInputs += "<td><input type='number' id='defaultValue_"+property.id+"'  defaultValue='"+property.defaultValue+"' value='"+property.defaultValue+"'/> </td>";
									 }else {
									   	tmpInputs +="<td><input type='number' id='defaultValue_"+property.id+"'   value=''/></td>";
									 }
									 break;
				case  'DATE'     :   listDates.push(property.id);
									 if(property.defaultValue){
											tmpInputs += "<td><input type='text' id='defaultValue_"+property.id+"' class='dateValue'    defaultValue='"+property.defaultValue+"'  value='"+property.defaultValue+"'/> </td>";
										 }else {
										   	tmpInputs +="<td><input type='text' id='defaultValue_"+property.id+"' class='dateValue'  value=''/></td>";
									 }
									 break;
                // default covers FILE , STRING, BOOLEAN 
			    default          : 	 if(property.defaultValue){
							        	tmpInputs += "<td><input type='text' id='defaultValue_"+property.id+"'  defaultValue='"+property.defaultValue+"'   value='"+property.defaultValue+"'/> </td>";
							        }else {
							        	tmpInputs +="<td><input type='text' id='defaultValue_"+property.id+"'   value='n/a'/></td>";
							        }	                 
				}
		        
				 tmpInputs += "<td align='center'><input type='radio'  name='isMandatory_"+property.id+"' id='isMandatory' value='true'";
				 if(property.isMandatory) { tmpInputs += "checked='checked'";}
				 tmpInputs += " />Yes<br/>";
				 tmpInputs += "<input type='radio'  name='isMandatory_"+property.id+"' id='isMandatory' value='false'";
				 if(!property.isMandatory) { tmpInputs += "checked='checked'";}
				 tmpInputs += " />No</td>";			 
		        	
				 tmpInputs += "<td align='center' ><input type='radio'  name='isUnique_"+property.id+"' id='isUnique' value='true'";
				 if(property.isUnique) { tmpInputs += "checked='checked'";}
				 tmpInputs += " />Yes<br/>";
				 tmpInputs += "<input type='radio'  name='isUnique_"+property.id+"' id='isUnique' value='false'";
				 if(!property.isUnique) { tmpInputs += "checked='checked'";}
				 tmpInputs += " />No</td>";
				 		        		    
			   if(property.minValue){
			   	tmpInputs += "<td><input type='text' id='minValue'   name='minValue' value='"+property.minValue+"'/> </td>";
			   }else {
			   	tmpInputs += "<td><input type='text' id='minValue'  name='minValue' value=''/></td>";
			   	}			   
	   
			   if(property.maxValue){
		        	tmpInputs += "<td><input type='text' id='maxValue'   name='maxValue' value='"+property.maxValue+"'/> </td>";
		        }else {
		        	tmpInputs += "<td><input type='text' id='maxValue'   name='maxValue'  value=''/></td>";
		        }                		     		    
			     tmpInputs += "</tr>";
			} 			
			return tmpInputs;
	   };
				
	this.footerUpdateFunct = function( type ) {			
			var tempFooter = "";
			tempFooter += "<br/><tr>"	
			tempFooter += "<td colspan='7' align='center'><input type='button' value='Save Changes' class='btn btn-primary btn-xs'  onclick='FormTypePropertyUtils.saveUpdateTypePropertyForm ("+type.id+")' />";
			tempFooter += "<input type='button' value='Cancel'      class='btn btn-primary btn-xs'  onclick='FormTypePropertyUtils.cancel("+type.id+")'></td>";	
			tempFooter += "</tr></table>";			
			return tempFooter;
	};			 

}


