/**
 * 
 */
function ServerStatus() {
}
ServerStatus.setSelectDiv = function() {
	$("#divStatus").empty();
	$("#messages").empty();
	var startIP = api_url.slice(0, api_url.lastIndexOf(".") + 1);
//	var text = AllForms.selectMD(startIP);
//	$("#divStatus").append(text);
	AllForms.selectMD(startIP);
	$(".wrap").css('opacity', '.2');

}

ServerStatus.isValidIpv4Addr = function(ip) {
	return /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/.test(ip);
}

ServerStatus.checkEmpty = function(e) {
	return !str.replace(/^\s+/g, '').length;
}

ServerStatus.newvalidateIp = function(e, idField) {

	var ip = document.getElementById(idField).value;
	
	if (e.which != 8 && e.which != 46 && (e.which < 48 || e.which > 57) && (e.which < 96 || e.which > 105)) {		
//		console.log(e.which);
		return false;
	} else {
		console.log(ip);
		 if (!ServerStatus.isValidIpv4Addr(ip) ) {
			 $("#"+idField).parent().removeClass().addClass('notvalid');
		 }else {
			 $("#"+idField).parent().removeClass().addClass('isvalid');
		 }
		return true;
	}
}




ServerStatus.validateIp = function(e, idField) {

	var ip = document.getElementById("selectip").value;	
	if (e.which != 8 && e.which != 46 && (e.which < 48 || e.which > 57) && (e.which < 96 || e.which > 105)) {
		if ((e.which == 76 || e.which == 16 ) && (ip.length == 1 )) {
			$("#selectip").val('localhost');
			$("#validate_ip").attr("class", "isvalid");
		}
		console.log(e.which);
		return false;
	} else {
		console.log(ip);
		if( !ServerStatus.isValidIpv4Addr(ip)    ){
		     $("#validate_ip").attr("class", "notvalid");
		}else {
			$("#validate_ip").attr("class", "isvalid");
		}
		return true;
	}
}

ServerStatus.pingIP = function() {

	var ip = document.getElementById("selectip").value;

	if (ip == "") {
		$("#validate_ip").append("Field Cannot be empty ");
		$("#selectip").focus();
		return;
	}

	var saveOption = $("#saveInList").val(); 
		console.log(saveOption +"selected option for save ");
		
	var port = document.getElementById("dbmysql").value;
	console.log(port);
	$("#btn_select").prop("disabled", true);
	console.log("STARTING Server connection");
	console.log(" username in session is " + usr);
	sock = new WebSocket("ws://" + api_url + "/admin/boot/socket/server/connect");
	var text = "";
	var sendmsg = {
		"usertoken" : usr,
		"action" : "Find",
		"server_ip" : ip,
		"server_port" : port,
		
	}

	AllForms.openFrame ();
	
	sock.onopen = function(event) {
		$("#messages").empty();
		text = "Starting connection .....<br/>";
		text += "Provided Info : <br/> IP: <b>" + ip + "</b><br/> ";
		text += "Port: <b>" + port + "</b><br/> ";

		$("#messages").append(text);
		sock.send(JSON.stringify(sendmsg));
	}

	sock.onmessage = function(event) {
		console.log('message', event.data);

		// attempt to parse the json response
		var msg = JSON.parse(event.data);


		if (msg.result == "good" && msg.Server == "good") {
			text = "Connection to server established - <span style='color:green'><b>IP " + ip + " reachable</span>";
			$("#messages").append(text);
			$("#divStatus").empty();
			AllForms.connectMD(ip, port);
			sock.close();
		} else {
			if (msg.result == "stopped") {
				text = "Scanning Process .... Terminated By user.";
				$("#messages").append(text);
				$("#btn_select").prop("disabled", false);

			} else if (msg.Server == "error" || msg.result == "error") {
				text = "Connection to server not established....  <span style='color:red'><b>Failure : IP " + ip + "  not reachable</b></span> <br/> ";
				text += "Verify or Change IP  and Try again   "
				$("#messages").append(text);
				$("#btn_select").prop("disabled", false);
			}
		}
	}

	sock.onclose = function(event) {
		$("#msg_window").append(" Process terminated .........");

	}

	//	sock.onerror = function(event) {
	//		$("#msg_window").append(" An error occured ..........");
	//	}

}

ServerStatus.stopFinding = function() {
	console.log("STOP Find");
	var sock = new WebSocket("ws://" + api_url + "/admin/boot/socket/server/connect");

	var msg = {
		"usertoken" : "${sessionScope.ROMENEXT_SESS_USER_TKNS.username }",
		"action" : "STOP"
	}

	sock.onopen = function(event) {
		console.log('open');
		sock.send(JSON.stringify(msg));
		sock.close();
	};

	sock.onclose = function() {
		console.log("STOP THE STOPFUNCTION");

	}

}

ServerStatus.close = function() {
	$("#divStatus").empty();
	$("#messages").empty();

}

//   functions for scanning network and selecting IP
ServerStatus.scanNetwork = function() {
	var IP = api_url.slice(0, api_url.lastIndexOf(".") + 1);

	$("#messages").empty();
	$("#messages").append("Starting scanning Network using :   <br/>")
		
	var startIP = IP+"1";
	var endIP   =  IP+ "254";
	var port = "3306";
	
	AllForms.scanForm (startIP, endIP,  port);
	
	
}

ServerStatus.doScan = function() {

	
	$("#btn_scan").prop("disabled", true);
	$("#btn_select").prop("disabled", true);
	$("#btn_close").prop("disabled", true);
    
    var ipstart = document.getElementById("startip").value;
    
    $("#errMsg").empty();
    
    var ipend   = document.getElementById("endip").value;
    if ( ipstart.localeCompare(ipend) > 0  ){
    	$("#errMsg").append("TO: should be equal or greater than   "+ ipstart);
		$("#endip").val(ipstart);
		return;
    }
    
    if( ipstart.length == 0  ){
    	$("#errMsg").append("IP Cannot be empty");
    	$("#startip").focus();
    	return;
    }
    if( ipend.length == 0 ){
    	$("#errMsg").append("IP Cannot be empty");
    	$("#endip").focus();
    	return;
    }
    var port = "3306";
    
    var $iframe = $("#errorText");
   
	var sock = new WebSocket("ws://" + api_url + "/admin/boot/socket/server/scan");
	var msg = {
		"usertoken" : "${sessionScope.ROMENEXT_SESS_USER_TKNS.username }",
		"action" : "START",
		"scan_ip_start" : ipstart,
		"scan_ip_end"   : ipend,
		"scan_port"     : port
	}

	sock.onopen = function(event) {
		console.log('open');
		$("#resultScan").empty();
		$iframe.contents().find("body").empty();
		$iframe.contents().find("body").append("Running process ......");		
		var text = "";
		text += "<br/>Started .....<br/>" ;
		text += "List of Servers Found with MySQL running:<br/>";
		$("#resultScan").append(text);
		
		$("body").css("cursor", "progress");
		
		countActive = 0;countDead = 0;
		
		sock.send(JSON.stringify(msg));
	};
	sock.onmessage = function(e) {
//		console.log('message', e.data);

		var msg = JSON.parse(e.data);
		var output = "";
		var outputErr = "";

		if (msg.pingstatus == "error") {
			console.log("Message was error: " + msg.msg);
			$("#errorScan").text(msg.msg);
		} else if (msg.pingstatus == "good") {
			console.log("message", msg);
			if (msg.accepting == true) {	
				var fct = "ServerStatus.selectIP('"+msg.ip+"');";
				output += '<br></br><span class="serverscan"> ' + msg.ip + '</span><input type="radio" name="foundIp"  onclick="'+fct+'"  />Select';
				countActive++;
			} else {
				outputErr += '<br/>Ping  ' + msg.ip + '  ....  <span style="color:red"> NOT REACHABLE</span>';
				 $iframe.contents().find("body").append(outputErr);
				countDead++;
			}
			$("#resultScan").append(output);
		}
	};

	sock.onclose = function() {
		console.log("STOP THE STOPFUNCTION");
//		$("#resultScan").append("<br></br> <span style='color:green'><b> "+countActive+"</b></span>:Live  &&  <span style='color:red'><b>"+countDead+"</b></span>: Dead ");
		$("body").css("cursor", "default");
	}


}

ServerStatus.cancelScan = function() {
	console.log("Cancel SCAN");
	var sock = new WebSocket("ws://" + api_url + "/admin/boot/socket/server/scan");

	var msg = {
		"usertoken" : "${sessionScope.ROMENEXT_SESS_USER_TKNS.username }",
		"action" : "STOP"
	}

	sock.onopen = function(event) {
		console.log('open');
		sock.send(JSON.stringify(msg));
		$("#btn_scan").prop("disabled", false);
		$("#btn_select").prop("disabled", false);
		$("#btn_close").prop("disabled", false);
		sock.close();
	};

	sock.onclose = function() {
		console.log("STOP THE STOPFUNCTION");
		var text = "<br/>Scanning Process .... Terminated By user.";
		$("#resultScan").append(text);
		$("#resultScan").append("<br></br> <span style='color:green'><b> "+countActive+"</b></span>:Live  ----  <span style='color:red'><b>"+countDead+"</b></span>: Dead ");
		$("body").css("cursor", "default");
	}
}

ServerStatus.selectIP = function ( ip ){
	$("#selectip").empty();
	$("#selectip").val(ip);
	$("#btn_scan").prop("disabled", false);
	$("#btn_select").prop("disabled", false);
	$("#btn_close").prop("disabled", false);
	
}
//=======================================================//

ServerStatus.disableSpace = function(elem) {
	return elem.val(elem.val().replace(/\s/g, ""));
}

ServerStatus.callCheckStatus = function(serverIndex) {

	console.log("STARTING Server checking");
	console.log(" api url is " + api_url);

	var ip = document.getElementById("ip").value;
	var port = document.getElementById("port").value;


	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var schema = document.getElementById("schema").value;

	if (username == "") {
		$("#validate_username").append("Field Cannot be empty ");
		$("#username").focus();
		return;
	}

	if (password == "") {
		$("#validate_password").append("Field Cannot be empty ");
		$("#password").focus();
		return;
	}
	if (schema == "") {
		$("#validate_schema").append("Field Cannot be empty ");
		$("#schema").focus();
		return;
	}
	$("#messages").empty();
	var text = '';
	text += "<h4>Connecting to MySQL Server @  <b>" + ip + ":" + port + "</b></h4><br/>";
	text += "Starting Connection with schema ......<br/>";
	$("#messages").append(text);
	var jsonData = {};
	jsonData["username"] = username;
	jsonData["password"] = password;
	jsonData["ip"] = ip;
	jsonData["port"] = port;
	jsonData["schema"] = schema;


	var checkStatusRequest = $.ajax({
		url : "http://" + api_url + "/admin/boot/server/status",
		method : "POST",
		dataType : 'json',
		data : JSON.stringify(jsonData),
		contentType : 'application/json',
		cache : false,
		async : false
	});
	var finish = false,
		valserver = null;
	
	checkStatusRequest.done(function(data) {
		if (!$.isEmptyObject(data)) {

			console.log("Return from checkStatus");
			console.log(data);
			if (data.success) {
				valserver = data.server;
				if (data.server.connectable) {
					text = "Server connection: <span style='color:green'><b>ESTABLISHED</b></span><br/>";
					$("#messages").append(text);
					
					if (data.server.schemaConnectable) {
						text = "Schema connection: <span style='color:green'><b>ESTABLISHED</b></span><br/>";
						$("#messages").append(text);
						text = "MySQL Version : " + data.server.innodb + "Found is ";
						if (data.server.innodb.localeCompare("5.7.20") >= 0) {
							text += " supported    <span style='color:green'><b>PASSED</b></span><br/>";
							$("#messages").append(text);
							text = "";
							finish = true;

							//						text += "Schema Version   : " + data.server.schemaObject.tag +"<br/>";
							//						text += "Schema configuration : <span style='color:green'><b>Passed </b><br/>";
							//						text += "Schema validation    : <span style='color:green'><b>Passed </b><br/>";

						} else {
							text += " not supported <span style='color:green'><b>FAILED</b><br/>";
							text += " Deploy MySQL Server version  5.7.20 or plus<br/>";
							$("#messages").append(text);
						}
					} else {
						text = "Schema connection: <span style='color:red'><b>Failed</b></span><br/>";
						text += "Check AccoutName/Password/Schema Name and Try again.....";
						$("#messages").append(text);
					}
				} else {
					text = " Could not Reach server <br/>";
					$("#messages").append(text);
				}

//				$("#messages").append(text);


			} else {
				if (data.server.connectable) {
					text = "Server connection: <span style='color:green'><b>ESTABLISHED</b></span><br/>";
					if (!data.server.schemaConnectable) {
						text += "Schema connection: <span style='color:red'><b>Failed</b></span><br/>";
						text += "Check AccoutName/Password/Schema Name and Try again....."
					} else {
						text += " Sever check Status Failed ..... because    <b>" + data.successmsg + "</b>";
					}
				} else {
					text = " Sever check Status Failed ..... because    <b>" + data.successmsg + "</b>";
				}
				$("#messages").append(text);
			}


		}
	});
	checkStatusRequest.fail(function(xhr, status, error) {
		console.log("Error: Not able to load check status  " + xhr.responseText);
		$("#resp_ConnectForm").append(" Failure  ");
	});

	if (finish) {

		text = "<input type='button' class='btn btn-primary' value='Refresh' id='btn_saved'  onclick=\"location.href='/admin/boot/dashboard2'\"/><br/>";
		$("#messages").append(text);
//		AllForms.saveMDForm(valserver.ip, valserver.port, valserver.username, valserver.pw, valserver.schema, valserver.innodb);
		$("#divStatus").empty();
	}
}

ServerStatus.displayDash = function ( ip, username, pwd, schema){
	
	$("#messages").empty();
	console.log("Inside displaying dashboard ");
	if( ip == "" || username == "" || pwd == "" || schema == ""){
		$("#messages").append("Missing required values -- can not display status ");
		return;
	}
	
	$("#divStatus").empty();
	var text = '';
	text += "<h4>Starting Process 'Checking Server Status'</h4><br/>";
	$("#messages").append(text);
	
	var jsonData = {};
	jsonData["username"] = username;
	jsonData["password"] = pwd;
	jsonData["ip"] = ip;
	jsonData["port"] = "3306";
	jsonData["schema"] = schema;

	var getServerStatusRequest = $.ajax({
		url : "http://" + api_url + "/admin/boot/server/fullstatus",
		method : "POST",
		dataType : 'json',
		data : JSON.stringify(jsonData),
		contentType : 'application/json',
		cache : false,
		async : false
	});
	var finish = false,
		valserver = null;
	
	getServerStatusRequest.done(function(data) {
		if (!$.isEmptyObject(data)) {
            valserver = data.server;
			console.log(data.server);
			AllForms.statusForm ( ip );
			
			if (data.success) {	
				if(valserver.connectable){
			          if(valserver.status.ADMIN_ACCOUNTS_FOUND && valserver.status.CORE_GROUP_INIT){
						if (valserver.baseGroups){
						     $("div[id='green']").attr("class", 'lamp lampGreen');
						}else {
							 $("div[id='yellow']").attr("class", 'lamp lampYellow');
						}
				      }else {
				    	  
				    	  $("div[id='yellow']").attr("class", 'lamp lampYellow');
				    	  }				      
			} else {
				 $("div[id='red']").attr("class", 'lamp lampRed');
			}
			}else {
				 $("div[id='red']").attr("class", 'lamp lampRed');
			}

		}
	});
	getServerStatusRequest.fail(function(xhr, status, error) {
		console.log("Error: Not able to load check status  " + xhr.responseText);
		$("#messages").append("Ajax call  /admin/boot/server/fullstatus   Failed to execute  ");
	});
	

	
}

ServerStatus.genInput = function (){}

ServerStatus.genRadioStatus = function ( id ){
//	id = 'ready'
        var inputReady =	$("<input/>", {
									type : 'radio',
									id : id,
								})
	
}
ServerStatus.genInput = function (){}


ServerStatus.setEndIP = function (event, startip){
	 var ipstart = document.getElementById("startip").value;
	 if ( ipstart.length == 0 ){
		 $("#errMsg").append("IP Cannot be empty");
	     $("#startip").focus();
	    	return;
	 }else {
		 $("#endip").val(ipstart);
	 }
	
	
}



