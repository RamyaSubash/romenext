/**
 * For reservation reservations, use case follows:
 * 
 * 1. Enter Entry date
 * 2. Enter Reservational Info
 * 3. Enter contact Info
 * 4. Enter CC
 * 5. 
 * @param divId
 * @returns
 */
function ReservationManagerRender() {
	
	this.divholderId;
	this.DEFAULT_TYPE_NAME = "RESERVATION";
	this.DEFAULT_TYPE_RESERVATION = null;
	

	this.ENTRY_NODES = null;

	this.initBase = function( divId ) {
		console.log("divId is: "+ divId);
		this.divHolderId = divId;
	}
	
	this.initRenderer = function() {

	};

	this.initView = function() {
		if ( !selectedMetaData ) {
			document.getElementById('path').innerHTML = "<p style='color:red'>No Metadata Selected  !!</p>";
			console.log(" No value for metadata ")
			return false;	
	    } 
		active_deco = "reservation";		
	// reset the Interface  -- Ensuring that only proper division will be displayed
		DisplayInterfaceUtils.resetInterface();
		curThreshold = 3;
		// set up this 
		this.enableFormView();	
		
		this.structureDiv();
			
		this.initData();  // Entry Type defined --  SelectedMetadata defined 
				
		// print out the reservations	
		if( this.DEFAULT_TYPE_RESERVATION != null ) {
			this.initializeTypeBar();			
		}							
	};
	
	this.enableFormView = function() {
		
		var reservationManagerDecoView = document.getElementById(activeDecos_BODY[ this.divHolderId ]);

		reservationManagerDecoView.style.display = "block";	
		
	};
	
	this.structureDiv = function() {
		
		var reservationManagerDecoView = document.getElementById(activeDecos_BODY[ this.divHolderId ]);
		reservationManagerDecoView.style.display = "block";
		reservationManagerDecoView.innerHTML = '';
		
		// generate the Reservation bar
		if (document.getElementById('Header_deco') == undefined || document.getElementById('Header_deco') == null) {
			
			GlobalHTMLUtils.createAppendHTMLEntity('header', 'Header_deco' , 'panel-heading', 'visible', 'block', '', reservationManagerDecoView);
		}
		
		if (document.getElementById('Header_search') == undefined || document.getElementById('Header_search') == null) {
			
			GlobalHTMLUtils.createAppendHTMLEntity('header', 'Header_search' , 'panel-heading', 'visible', 'block', '', reservationManagerDecoView);
		
		}
		
		
		// generate body Division 
		var bodyDiv ;
		if (document.getElementById('reservation_body') == undefined || document.getElementById('reservation_body') == null) {			
			GlobalHTMLUtils.createAppendHTMLEntity('div', 'reservation_body' , 'cy', 'visible', 'flex', '', reservationManagerDecoView);
			bodyDiv = $( "#reservation_body");
		}
		// generate the working space for adding new instances
		if(document.getElementById('work_addInstance') == undefined || document.getElementById('work_addInstance') == null) {		
			GlobalHTMLUtils.createAppendHTMLEntity('div', 'work_addInstance'  , 'work_addInstance', 'hidden', 'none', '', bodyDiv);			
		}	
						

	};
	
    this.initializeTypeBar = function() {
    	 curThreshold = 0;
    	 var nbReservation = '';
    	 
    	if( this.DEFAULT_TYPE_RESERVATION != null ) {		
		
			var displayTypeBar_v2 = document.getElementById('Header_deco');
			displayTypeBar_v2.innerHTML = "";
			var value = typeMapViaId[listTypeIds[0]];
	        if ( value.nb != 0) { nbReservation = value.nb;}
			var inputs = '';
			inputs = "<table id='typesList'><tr>";		
			inputs += "<td ><h4 >"+value.name+"</h4>";
			inputs += "</td></tr>";

			inputs += "<tr>";
		    inputs += "<td class='create_icon' onclick=\"( new ReservationManagerRender() ).createReservation(); \"><span class='badge'>Create <img  id='img_create' title='Create New Reservation'   src='"+img_path+ "createRes.png'></span></td>";
		    inputs += "<td  onclick=\"( new ReservationManagerRender() ).listReservations(); \"><span class='badge'> List All  "+nbReservation +" <img  id='img_create' title='Search a Reservation'   src='"+img_path+ "listAll.png'></span> </td>";
		    inputs += "<td  onclick=\"( new ReservationManagerRender() ).searchReservation(); \"><span class='badge'> Search <img  id='img_create' title='Search a Reservation'   src='"+img_path+ "search.png'> </span> </td>"
		    inputs += "</tr>";	    
		   
		    inputs +="</table>";
			displayTypeBar_v2.innerHTML = inputs;
    	}
		
	};
			
	this.initData = function() {
		if(this.DEFAULT_TYPE_NAME == null){
			document.getElementById('path').innerHTML = "<p style='color:red'>No DECO provided  !!</p>";
			$('#console-log').append("Process HALTED!! No DECO provided");
			console.log("No Default Type Provided --- Can Not Progress ! ");
			return false;
		}
		if ( !selectedMetaData ) {
			document.getElementById('path').innerHTML = "<p style='color:red'>No Metadata Selected  !!</p>";
			console.log(" No value for metadata ")
			return false;	
	    } 
		
		if( !GlobalUtils.isTypeMapViaIdSet() ) {
			typeMap ={}; typeMapViaId = {}; 
		    ruleMap = {}; ruleMapVia = {}; 
		    connMap = {}; connMapViaId = {}; 
			
			// reload the typeMap if it isn't set yet
			GlobalUtils.loadAllTypeAndConnections();
			GlobalUtils.loadAllRules();		
		}		
				
		if( this.DEFAULT_TYPE_RESERVATION == null ) {
			
			var tmpReservation = this.DEFAULT_TYPE_NAME;
			var foundReservation = null;

			$.each(typeMapViaId, function(key, value){			
				// do a non-case check
				var name = value.name.toUpperCase();										
				if( name === tmpReservation ) {
					foundReservation = value;
				}
			});
			
			this.DEFAULT_TYPE_RESERVATION = foundReservation;
		}
				
		if( this.DEFAULT_TYPE_RESERVATION == null ) {					
			document.getElementById('path').innerHTML = "<p style='color:red'>Could not found the Info for this DECO  !!</p>"+tmpReservation;
			$('#console-log').append("Could not found the Info for this DECO  !!"+tmpReservation);
			console.log(" Could not found the Info !!" +tmpReservation);
			return false;
			
		}else {			
				// we set the default to the reservation type
				GlobalUtils.setGlobalTypeSelected( this.DEFAULT_TYPE_RESERVATION.id );					
				// note: we treat the reservation's as the ENTRY NODE for this deco
				var tmpReservations = GlobalTypeInstanceUtils.getAllInstances( this.DEFAULT_TYPE_RESERVATION.id );
				return true;
		}
	};
						
	this.createReservation = function (){
		
		curThreshold = 0;

		console.log("Attempting to create Node of Type :" );	
			
		// hide all the others	
		$('#Header_search').empty();
		$('div.reservation_detail').hide();				
		$('.work_addInstance').empty();
		
		ReservationNewUtils.createNode(listTypeIds[0]);
		
		// set the default option to "CREATE" for Related Nodes 
		var a = document.getElementsByClassName("createOptions");
		for ( var i = 0; i < a.length ; i++){
			ReservationNewUtils.simulateClick( a[i]);
		}
			
	}
	
	this.listReservations = function ( ){
		
		// hide all the others		
		$('div.reservation_detail').hide();			
		$('.work_addInstance').empty();
			
		var reservationInfoDiv = document.getElementById('Header_search');
		reservationInfoDiv.innerHTML = '';
		
		var selectionTxt = '<div> List based on:            ';				
		var props = typeMapViaId[listTypeIds[0]].typeProperties;
				 
		 selectionTxt +=  '<label > <input type="radio" id="mandatory" name="listChoice"  onclick="ReservationNewUtils.listAll(\'mandatory\') " /> Mandatory Properties  ';
		 selectionTxt +=  ' <input type="radio" id="all" name="listChoice"  onclick="ReservationNewUtils.listAll(\'all\') " /> ALL Properties  ';
		 
		 
		 selectionTxt += '</div>' ; 		
		 reservationInfoDiv.innerHTML +=  selectionTxt;		
		
	}
	
	this.searchReservation = function ( ){
	//  alows search by Reservation ID, by Person, by Contact
	
		// hide all the others		
		$('div.reservation_detail').hide();			
		$('.work_addInstance').empty();
		
		var reservationInfoDiv = document.getElementById('Header_search');
		reservationInfoDiv.innerHTML = '';
		console.log(" typeId is : "+ listTypeIds[0]);
		curThreshold = 0;
		listAllNodes = [];
		elementFound  = [];	
		
		ReservationNewUtils.findAllTypesRelated( listTypeIds[0] );  
		var walkinID = NodeUtils.findTypeID ("WALKIN" );
		
		elementFound = jQuery.grep(elementFound, function(value) {
			  return value != walkinID;
			})
				
		var searchTxt = '<div> Search based on:    ';
							
		 $.each(elementFound, function( key, value ) {
			 var typeRelId   = typeMapViaId[value].id;
			 var typeRelName = typeMapViaId[value].name;
			 searchTxt +=  '<input type="radio" id='+typeRelId+' name="listChoice"  onclick="ReservationNewUtils.SearchType('+typeRelId+ ') " /><span class="badge">'+typeRelName  +'</span>  ';
			 
		 });
		 
		 searchTxt += '</div>' ; 		
		 reservationInfoDiv.innerHTML +=  searchTxt;				
		
	}
		
	this.selectedNode = function( nodeUuid ) {
			
			console.log("Attempting to show :" + nodeUuid );					
			if(!nodeUuid){
				console.log(" no Reservation Uuid provided: cannot display related info  "); 
				return;
			}
			var reservationDetails = nodeMap[nodeUuid];
			
			if(!reservationDetails){
				console.log(" no Reservation details  were Found " );
				return;
			}	
			
			// hide all other divisions
			$('div.reservation_detail').remove();
			$('div.form_inst_edgedetails').hide();
			$('div.work_addInstance').hide();	
		
			if(  document.getElementById("reservation_detail_" +nodeUuid) == null ||  document.getElementById("reservation_detail_" +nodeUuid).length == 0 ) {	
				GlobalHTMLUtils.createAppendHTMLEntity('div', 'reservation_detail_'  + nodeUuid, 'reservation_detail', 'hidden', 'none', '',  $( "#reservation_body"));						
			}	
				
			nodesToUpdate = [];                 // this will contains the list of nodes to update
			
			var instHolderDiv = document.getElementById("reservation_detail_" +nodeUuid);
			
		    var typeId        = 	nodeMap[nodeUuid].typeId;	    
			ReservationUtils.addDivsForAReservationDetails (instHolderDiv, nodeUuid );
			
			var typeInfo = typeMapViaId[typeId];
			this.displayViewEditProperties( typeInfo, nodeUuid,  reservationDetails  );			
			nodesToUpdate.push({type: typeId  , node: nodeUuid});
			
			curThreshold = 0;
			listAllNodes = [];
			elementFound  = [];	
			
			ReservationNewUtils.findAllTypesRelated  ( typeId.toString() );
			var nodes  =  ReservationNewUtils.filterRelatedNodes2(typeId,   elementFound  );
			console.log(nodes);

			// Need to loop through related nodes
			// we have ElementFound    contains all types related
			//         listAllNodes  ======   currNodeType : list[i], currNodePos : nodePos , relNodeType : list[j], typeNode : mustNode , connection : foundCon[0] 
			//         nodes         ======   startType: list[i] , startNodeUuid: null, endType: list[j]  , endNodeUuid: null,  startTypePos :nodePos  , status: 'initial'

	 
//			 // setting the node for reservation 
			 for ( var i = 0; i < nodes.length; i++){
				 if( nodes[i].startType == typeId  ){
					 nodes[i].startNodeUuid = nodeUuid;
				 }
			 }
			 			 
			 nodes  = nodes.concat( ReservationNewUtils.getNodesLinkedToReservation(nodes, instHolderDiv)); 
			 		
                      
            $(".form_inst").css("display", "block");
            $(".form_inst").css("visibility", "visible");
            DisplayInterfaceUtils.showDivision ("reservation_detail_", nodeUuid  );
			
			var footerView  = "<tr id='footer_view'><td colspan='2'> <input type='button' class='btn btn-primary btn-xs' id='GoUpdate'  value='Go Update ' onclick='( new ReservationManagerRender() ).editReservation(\"" + nodeUuid + "\")' /></tr>" ;
	
			$("#reservation_detail_" +nodeUuid).append( footerView);
		
		   		   
	   };  
		
	this.displayViewEditProperties = function( tempType, key, value  ){
	    	
	    	if(!key  ){
				console.log(" no Reservation uuid  given "+ key );
				return;
			}
	   	
	    	if(!value){
	    		console.log(" no  details given for the Reservation  "+ key);
				console.log(" Can not Display its properties");
				return;
	    	}
			
			var instViewDiv       = $("#form_inst_" + key );
			instViewDiv.html('');
			var instEditDiv       = $("#form_inst_edit_" + key );
			instEditDiv.html('');
			
			var tableViewInstProps = '<br /><table border="2"><tr>'+tempType.name+'  Details</tr>';
			var tableEditInstProps = '<br /><table border="2"><tr>'+tempType.name+'  Details</tr>';
			
			var inputpropViewRow = '';
			inputpropViewRow = '<tr>';
			
			var listDates = [];
			if($.isEmptyObject(tempType.typeProperties)){
				tableViewInstProps = 'NO properties were defined ';
				tableEditInstProps = '';
				
			}else {
			
					$.each( tempType.typeProperties, function( pkey, pvalue ) {
										
					    var inputpropEditRow ='';
					    var propValue;
						
						// build a Row for each property 
						// find the property value in nodeMap
											
						$.each(value.typeProperties, function ( nodeKey, nodeProperty){	
							if( pvalue.id == nodeProperty.id ){
								propValue = nodeProperty.value;
							}
						});
						
						
						inputpropEditRow = '<tr id="props">';
						
						if(pvalue.isMandatory){ 			
							inputpropViewRow += '<td style="color:red; ">' ;
							inputpropEditRow += '<td style="color:red;width:100px">' ;
							}
						else{  
							inputpropViewRow += '<td  > ';
							inputpropEditRow += '<td width="100px"> ';
							}	
						inputpropViewRow +=   pvalue.name + ': </td>';
						
						inputpropEditRow +=  '<input type="text" name="propertyName" value="' + pvalue.name + '"  disabled /> <input type="hidden" name="propertyId" value="' + pvalue.id + '">';
												
						if( (propValue != null )&& (propValue != 'undefined' ) ){				
							inputpropViewRow += '<td  width="100px" >'+ propValue +'</td>';
							inputpropEditRow +=  '<input type="hidden" name ="value"   id="value_'+key+'"  value="'+ propValue +'"  />'  ;

							if(pvalue.propertyType == 'DATE'  ){
								inputpropEditRow +=  '</td><td><input type="text"   name ="newValue"  id= "'+key+'_date_'+pvalue.id+'"    value="'+ propValue +'"  />';
								listDates.push(pvalue.id );							
							}else {
								inputpropEditRow +=  '</td><td><input type="text"  id="newValue_'+key+'"    name ="newValue"  value="'+ propValue +'"  />';
							}

						} else {
							inputpropViewRow += '<td  width="100px"> NONE </td>';
							
							inputpropEditRow +=  '<input type="hidden" name ="value"   id="value_'+key+'"   value=""  />'  ;
							
							if(pvalue.propertyType == 'DATE'  ){
								inputpropEditRow +=  '</td><td><input type="text"   style="background-color:yellow"  name ="newValue"  id= "'+key+'_date_'+pvalue.id+'"    value=""  />';
								listDates.push(pvalue.id );						

							}else {
								inputpropEditRow +=  '</td><td><input type="text"   id="newValue_'+key+'" style="background-color:yellow"   name ="newValue"  value=""  />';
							}	
							
						}	
						
						inputpropViewRow += "</tr>"
						inputpropEditRow +=  '<input type="hidden" name="propertyType" value="' + pvalue.propertyType + '">('+pvalue.propertyType+')</td></tr>';
									
						tableEditInstProps += inputpropEditRow;
			
					});
					tableViewInstProps += inputpropViewRow;
					tableViewInstProps = tableViewInstProps + "</table>";
					tableEditInstProps = tableEditInstProps + "</table>";
			}
				
			instViewDiv.append(tableViewInstProps);		
			instEditDiv.append(tableEditInstProps);	
		
			for (var i=0; i< listDates.length; i++){
	        	$("#"+key+"_date_"+listDates[i]).datepicker({
	        		  dateFormat: "yy-mm-dd"
	        	});
	        }
			
			
	}
	 
	
//=====================================================================================================      	
		
	this.saveUpdateReservation = function( resUuid ) {
		if(!resUuid  ){
			console.log(" no Reservation uuid  given "+ resUuid );
			return;
		}
	    	
		// grab the info from the Node property fields 	
		
		if(nodesToUpdate){
			
			for( var ind =0; ind < nodesToUpdate.length; ind++){
				
				var nodeUuid       = nodesToUpdate[ind].node;
				var typeId         = nodeMap[nodeUuid].typeId;
				if(!nodeUuid || !typeId){
					console.log(" Error in the process of saving  typeId found  "+ typeId + " nodeUuid found "+ nodeUuid);
					return;
				}
				
				var jsonData = {}, nodeProperties = [], newProperties = [];
				var property = {}, newproperty = {}, foundError=false;			
				var sysProperties = [];

				jsonData["type"] = typeId.toString();
				
				// push the uuid to sysProperties	
				property =  NodeUtils.createSysJson(nodeUuid );
				sysProperties.push(property);
				
				property = {}; mewproperty = {};
				
				var instEditDiv = $("#form_inst_edit_" + nodeUuid );	
				// grab the values of node properties from the form
				$(instEditDiv).find('tr#props').each(function (i, propsTr){	
					$(propsTr).find(':input').each(function(i,field){
					     if( ( field.type  == 'text')||(field.type == 'hidden')){
					 		console.log(field.name + " value found is :"+field.value);
							if (field.name == 'value')  {   
								  property[field.name] = field.value  
							} else if (field.name == 'newValue') { 
								   newproperty['value'] = field.value
							} else { 
								property [field.name] = field.value;
								newproperty[field.name] = field.value;
							} 
					     }			
					     
					});	
					console.log(" found this property "+ property + " in this node "+ nodeUuid );
					// verify if property has value	
					var isPropMand =  NodeUtils.findPropInType(property.propertyId, jsonData['type']);
					if(isPropMand){ // mandatory property
						if(newproperty.value){
												newProperties.push(newproperty);
				                    		  	if(property.value  && property.value != 'undefined'){ nodeProperties.push(property);}	                    		  	
				         } else {
				        	  $(propsTr).append('error- missing Value');
		            		  console.log("Missing Value for Mandatory property : "+ property.propertyName);
		                      foundError= true;
		                		  }		                    	  
					}else {   // not mandatory
						if(newproperty.value){  // user entered a new value
												newProperties.push(newproperty);
								                if(property.value && property.value != 'undefined' ){ nodeProperties.push(property);}				        			
						}else {  // if there was no value and user did not enter a value don't push it
//							  user may have deleted old value  
							if (property.value && property.value!= 'undefined' ){
								       newproperty.value = null;
								       nodeProperties.push(property);
								       newProperties.push(newproperty);
							}			
						}
		        	}
				    property = {}; newproperty ={};
				});		
				
				if(!foundError ) {
					console.log(" Retrieved Properties are : "+nodeProperties);
					console.log(" The new ones are :"+ newProperties);	
					jsonData.sysProperties = sysProperties;	 
					jsonData.properties    = nodeProperties;
					jsonData.newProperties = newProperties;
							
					instEditDiv.hide();
						
					var doneFunction = function( data ) {
						if($.isEmptyObject(data) && S.isEmptyObject(data.nodes)){
							console.log(" no node returned for save update Node Info ");
							return;
						}
						
						console.log("Node Updated "+data.nodes[0].type);		     
						
						// Save the updated properties 											
						var key = NodeUtils.findUUID (data.nodes[0]);					
						nodeMap[key].typeProperties   = data.nodes[0].typeProperties;													
			 				
					};
						
					var failFunction = function( xhr, status, error ) {
						console.log("Update Node Properties Error: "+ xhr.status);
						 $('#console-log').append("Update Node Properties Error: "+ xhr.status);
					};
					
					var api  = new NodeApis();
					
					api.updateNode(jsonData, doneFunction, failFunction );	
					}										
			}
			
			
		}else {
			// error 
		}
		
		( new ReservationManagerRender() ).selectedNode(resUuid);
		
		};

//====================================================================================================	
	
    this.editReservation = function( nodeUuid ) {
		if(!nodeUuid  ){
			console.log(" no Reservation uuid  given "+ nodeUuid );
			return;
		}
		
		console.log("Attempting to edit :" + nodeUuid );			
//		ReservationUtils.hideDivision ("form_inst_", nodeUuid  );	
		var prevFooterView = $('#footer_view');
		
		if (prevFooterView != undefined || prevFooterView != null) {
			$('#footer_view').hide();
		}
		
		$(".form_inst").hide();	
		
		 $(".form_inst_edit").css("display", "block");
		 $(".form_inst_edit").css("visibility", "visible");

		var prevFooterEdit  = $('#footer_edit');
		if (prevFooterEdit != undefined || prevFooterEdit != null) {
			$('#footer_edit').remove();
		}
		var footerEdit  = "<tr id='footer_edit'><td colspan='2'> <input type='button' class='btn btn-primary btn-xs'  value='Update' onclick='( new ReservationManagerRender() ).saveUpdateReservation(\"" + nodeUuid + "\")' />";
		footerEdit += "<input type='reset' value='Cancel' onclick='ReservationNewUtils.updateReservation_cancel(\"" + nodeUuid + "\")' /></td></tr>";
		   		
		$("#reservation_detail_" +nodeUuid).append( footerEdit);
		
		
	}
		
	
}
	

