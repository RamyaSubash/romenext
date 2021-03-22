/**
 * 
 */
function CheckConnectionUtils () {

}


CheckConnectionUtils.checkConnection = function ( ip, port ){ 
	 
	var jsonData = {}; 
	jsonData["ip"]          = ip;

	jsonData["all"]  = true;
	
	
	
	var connCheckRequest =$.ajax({	
		url: "connection/check",
		method: "GET", 
		data      : {
			"ip":ip,
			"port":port
		},
		cache : false,
	});
	connCheckRequest.done(function (data) {  

		console.log("Entered the done login token retireval :" + data ); 
	     
	     

	});
	
	connCheckRequest.fail(function (xhr, status, error) {
		console.log("Error: Not able to retrieve token [" + xhr.responseText) + "]"; 
	});
	return null;
};

CheckConnectionUtils.checkConnectionUpdateValue = function ( ip, port, id ){ 
	
	
    $( "#" + id ).html( "<p><strong style='color:RED'>...loading</strong></p>" )

	var connCheckRequest =$.ajax({	
		url: "connection/check",
		method: "GET", 
		dataType : 'json',
		contentType : 'application/json',
		data      : {
			"ip":ip,
			"port":port
		},
		cache : false,
	});
	connCheckRequest.done(function (data) {  

		console.log("Entered the done login token retireval :" + data ); 
		
//		var obj = $.parseJSON( data );
//		
//		console.log("Full: " + obj );
//		console.log("HellO:" + obj.cstatus );
		
		if( data.cstatus  == true  ) {
		    $( "#" + id ).html( "<p><strong style='color:GREEN'>YES</strong></p>" )
		} else {
		    $( "#" + id ).html( "<p><strong style='color:RED'>NO</strong></p>" )

		} 

	});
	
	connCheckRequest.fail(function (xhr, status, error) {
		console.log("Error: Not able to retrieve token [" + xhr.responseText) + "]"; 
	    $( "#" + id ).html( "<p><strong style='color:RED'>NO</strong></p>" )

	}); 
	
	return null;
};

CheckConnectionUtils.connectViaCurrentAccount = function ( serverIndex, ip, port, id ){ 
	 
    $( "#" + id ).html( "<p><strong style='color:RED'>...loading</strong></p>" )

	
	
	var jsonData = {};
	jsonData["nothing"] = "nope";
	jsonData["serverIndex"] = serverIndex;
	
	// attempt to get the connection into the server
	var connCheckRequest =$.ajax({	
		url: "server/status",
		method: "POST", 
		dataType : 'json',
		contentType : 'application/json',
		data      : JSON.stringify(jsonData),
		cache : false,
	});
	connCheckRequest.done(function (data) {  

		console.log("Entered the done login token retireval :" + data ); 
	    
		
		if( data.success ) {
		    $( "#" + id ).html( "<p><strong style='color:GREEN'>YES</strong></p>" )
		} else {
		    $( "#" + id ).html( "<p><strong style='color:RED'>NO</strong></p>" )

		}
		
		CheckConnectionUtils.updateConnectedOptions( serverIndex, id, "connected_opt_" + serverIndex );

	});
	
	connCheckRequest.fail(function (xhr, status, error) {
		console.log("Error: Not able to retrieve token [" + xhr.responseText) + "]"; 
	    $( "#" + id ).html( "<p><strong style='color:RED'>NO</strong></p>" )

	});
	
	return null;
};

CheckConnectionUtils.updateConnectedOptions = function ( serverIndex, checkId, outputId ){ 
	 
    var check = $( "#" + checkId ).text();

	
    
    if( check == "YES" ) {
    	$("#" + outputId ).html( "<a href='/admin/groups/view?server=" + serverIndex + "'>View Groups</a><br> " + 
    							 "<a href='/admin/groups/add?server=" + serverIndex + "'>Add Groups</a><br> " + 
    							 "<a href='/admin/users/view?server=" + serverIndex + "'>View Users</a><br> " + 
    							 "<a href='/admin/users/add?server=" + serverIndex + "'>Add Users</a><br> " );
    } else {
    	$("#" + outputId ).html( "Server must be connectable " );
    }
    
    
};

