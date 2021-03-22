/**
 * 
 */
/**
 * 
 */
function FloorManagerCrud() {

	this.initView = function() {
	}
};

	FloorManagerCrud.floorCreate = function( jsonData ) {
		if(!$.isEmptyObject(jsonData)){
			
			$('#console-log').append("<p style='color:blue'Node created successfully.</p>");
			jsonData.color = typeMapViaId[jsonData.typeId].color;
	 	   // update corresponding section and nb of type nodes 			
			NodeUtils.AddNodeToMap( jsonData);   

			GlobalUtils.addNBTypeInstances(jsonData);
			var nbSpan = document.getElementById("nb_"+jsonData.typeId);
			var nb     = typeMapViaId[jsonData.typeId].nb;
			nbSpan.innerHTML = nb;	
			
			listInstUuids[0] = NodeUtils.findUUID (jsonData);	
				
		}else {
			console.log(" Create Floor Instance Failed");
		}
	};

	FloorManagerCrud.floorRead = function( jsonData ) {
		
		console.log("Inside the typeRead ");
		
	};

    FloorManagerCrud.floorUpdate = function( jsonData ) {
    	if(!$.isEmptyObject(jsonData.nodes)){
	    	console.log("Node Updated "+jsonData.nodes[0].type);		     
			
			// Save the updated properties 					
					
			var key = NodeUtils.findUUID (jsonData.nodes[0]);
			
			nodeMap[key].properties   = jsonData.nodes[0].properties;
											
			// grab the name property of The Node and update it in the list
			var instName = NodeUtils.findNameInst (  jsonData.nodes[0]  );	
			var elem = document.getElementById(key);
		    elem.value = elem.innerHTML = instName;
			
			// update and display properties info 	
			( new FloorManagerRender() ).selectedFloor(key);
		}else {
			console.log(" Update of Type Failed");
		}
    	
    }  	
    
    
	FloorManagerCrud.floorDelete = function( jsonData ) {
		
		if(!$.isEmptyObject(jsonData)){
		}
	}
	
