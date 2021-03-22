var ChildUtilsModule = (function(  ) {
	 
    
    
    return {
    	/******* Add the create scene function ******/
            
            findChildViaLocalVariables : function( parentUuid  ) {
            	
            	
            	// global vars should be set when we are in here
            	
            	
            	// process:
            	// 1. Search for the actual node
            	// 2. Save the NODE INFO into a variable
            	// 3. Look up edge map
            	// 4. Find all edges where source == parent.
            	// 5. Find all nodes based on edge map result.
            	// 6. Return all nodes from edge map.
            	
            	var edges = {};
            	var nodes = {};
            	
            	var foundNode = null;
            	
            	$.each( nodeMap, function( nodeId, node ) {
            		console.log("Output 1 : " + nodeId );
            		console.log("Found node : " + node );
            		
            		if( parentUuid == node.uuid ) {
            			foundNode = node;
            			return false;
            		}
            	} );
            	
            	if( foundNode == null ) {
            		console.log("Failed to find the node [" + parentUuid + "]");
            		return null;
            	}
            	
            	$.each( edgeMap, function( edgeId, edge ) {
            		 
            		var uuidString  = edge.originUuid.trim();
            		
            		var uuidIndex = uuidString.indexOf("value="); 
            		var realUuid = uuidString.substr( uuidIndex + 6, uuidString.length );
            		
            		// now do it again
            		// no clue why this won't work when i do it in the substr for uuidString.length - 1
            		realUuid = realUuid.substr( 0, realUuid.indexOf("]" ) ); 

            		if( realUuid === parentUuid ) {
            			
            			console.log("Found an edge: " +  edge );
            			
            			edges[ edgeId ] = edge;
            			nodes[ edge.destinationNode.sysProperties.uuid.value ] = edge.destinationNode;
            			
            		}
            		
            	} );
            	
            	// now we iterate and find the actual node for these
            	
            	
            	
            	return nodes;
            	
            }
    };

    

      

	   
})( );

  