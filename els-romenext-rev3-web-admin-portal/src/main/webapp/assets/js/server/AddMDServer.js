/**
 * 
 */

function AddMDServer() {
}
AddMDServer.addForm = function() {}

AddMDServer.showForm = function() {
	$("#msg_window").empty();
	document.getElementById("add_server_form").style.display = '';
}
AddMDServer.showSelectForm = function() {
	$("#msg_window").empty();

	document.getElementById("select_server_form").style.display = '';
}

AddMDServer.CancelConnectServer = function() {

	document.getElementById("add_server_form").style.display = 'none';
}
AddMDServer.CancelSelectServer = function() {
	$("#msg_window").empty();
	document.getElementById("select_server_form").style.display = 'none';
}
AddMDServer.submitForm = function() {

	console.log("Validating Form ...... ");
	console.log(" api url is " + api_url);
	$(".err_msg").empty();

	var ip = document.getElementById("add_ip").value;
	var port = document.getElementById("add_port").value;
	var boxname = document.getElementById("add_boxname").value;

	if (ip == "") {
		$("#err_add_ip").append("Empty IP address ");
		$("#add_ip").focus();
		return;
	}

	if (!(ip.toLowerCase() == 'localhost') && !ValidateForms.ValidIpAddress(ip)) {
		$("#err_add_ip").append("Invalid IP address ");
		$("#add_ip").focus();
		return;
	}


	if (port == "") {
		$("#err_add_port").append("Field Cannot be empty ");
		$("#add_port").focus();
		return;
	}

	if (boxname == "") {
		boxname = "Default";
	}

	$("#Find").prop("disabled", true);
	//========================================================================//
	console.log("STARTING Server connection");
	console.log(" username in session is " + usr);
	sock = new WebSocket("ws://" + api_url + "/admin/boot/socket/server/connect");
	var text = "";
	var sendmsg = {
		"usertoken" : usr,
		"action" : "Find",
		"server_ip" : ip,
		"server_port" : port,
		"server_name" : boxname
	}

	sock.onopen = function(event) {
		$("#msg_window").empty();
		text = "Starting connection .....<br/>";
		$("#add_server_form").append(text);
		sock.send(JSON.stringify(sendmsg));
	}

	sock.onmessage = function(event) {
		console.log('message', event.data);

		// attempt to parse the json response
		var msg = JSON.parse(event.data);


		text = "Provided Info : <br/> IP: " + ip + "<br/> Port : " + port + "<br/>";

		if (msg.result == "good" && msg.Server == "good" && msg.Port == "good") {

			text += "Connection to server established - Server reachable";

			$("#add_server_form").append(text);
			//			AddMDServer.CancelConnectServer();

			var addText = "",
				btnText = "Add " + ip;
			addText += "<form method='post'  action='/admin/boot/server/add3'>";
			addText += "<input type='hidden' name='add_boxname' value='" + boxname + "'>";
			addText += "<input type='hidden' name='add_ip' value='" + ip + "'>";
			addText += "<input type='hidden' name='add_port' value='" + port + "'>";
			addText += "<input type='submit' class='btn btn-primary btn-md' value='" + btnText + " To list'>";
			addText += "</form>";
			addText += "<input type='button' class='btn btn-primary btn-md' value='Drop' onclick='AddMDServer.dropServer()'>"

			$("#add_server_form").append(addText);
			document.getElementById("add_ip").value = "";
			document.getElementById("add_port").value = "";
			document.getElementById("add_boxname").value = "";
			$("#Find").prop("disabled", false);
		} else {
			if (msg.Server == "error") {
				text = "Connection to server not established....  Failure <br/> ";
				text += "Verify/Change IP "
				$("#msg_window").append(text);

			}
			if (msg.Port == "error") {
				text = "Wrong port provided ";
				$("#msg_window").append(text);
			}
			$("#Find").prop("disabled", false);
		}
	}

	sock.onclose = function(event) {
		//		$("#msg_window").append(" Process terminated .........");

	}

	//	sock.onerror = function(event) {
	//		$("#msg_window").append(" An error occured ..........");
	//	}


}
AddMDServer.dropServer = function() {
	AddMDServer.CancelConnectServer();
	$("#msg_window").empty();
}
AddMDServer.validate = function() {

	console.log("Validating Form ...... ");
	console.log(" api url is " + api_url);
	$(".err_msg").empty();

	console.log($("#md_server").val());
	console.log(document.getElementById("md_server").selectedIndex);

	var values = $("#md_server").val();
	var ipportValues = values.split("|");

	console.log(" IP is :" + ipportValues[0]);
	console.log(" Port is :" + ipportValues[1]);

	var ip = ipportValues[0];
	var port = ipportValues[1];
	var username = document.getElementById("s_username").value;
	var password = document.getElementById("s_password").value;
	var schema = document.getElementById("s_schema").value;

	if (username == "") {
		$("#err_s_username").append("Empty IP address ");
		$("#s_username").focus();
		return;
	}

	if (password == "") {
		$("#err_s_password").append("Field Cannot be empty ");
		$("#s_password").focus();
		return;
	}
	if (schema == "") {
		$("#err_s_schema").append("Field Cannot be empty ");
		$("#s_schema").focus();
		return;
	}

	$("#Validate").prop("disabled", true)
	sock = new WebSocket("ws://" + api_url + "/admin/boot/socket/server/validate");
	var text = "";
	var sendmsg = {
		"usertoken" : usr,
		"action" : "Validate",
		"server_ip" : ip,
		"server_port" : port,
		"server_username" : username,
		"server_password" : password,
		"server_schema" : schema
	}

	sock.onopen = function(event) {
		$("#msg_window").empty();
		text = "Starting Validation .....<br/>";
		$("#msg_window").append(text);
		sock.send(JSON.stringify(sendmsg));
	}

	sock.onmessage = function(event) {
		console.log('message', event.data);

		// attempt to parse the json response
		var msg = JSON.parse(event.data);


	}





}


AddMDServer.checkStatus = function() {

	console.log("Validating Form ...... ");
	console.log(" api url is " + api_url);
	$(".err_msg").empty();

	console.log($("#md_server").val());
	console.log(document.getElementById("md_server").selectedIndex);

	var values = $("#md_server").val();
	var ipportValues = values.split("|");

	console.log(" IP is :" + ipportValues[0]);
	console.log(" Port is :" + ipportValues[1]);
	var username = document.getElementById("s_username").value;
	var password = document.getElementById("s_password").value;
	var schema = document.getElementById("s_schema").value;

	if (username == "") {
		$("#err_s_username").append("Empty IP address ");
		$("#s_username").focus();
		return;
	}

	if (password == "") {
		$("#err_s_password").append("Field Cannot be empty ");
		$("#s_password").focus();
		return;
	}
	if (schema == "") {
		$("#err_s_schema").append("Field Cannot be empty ");
		$("#s_schema").focus();
		return;
	}

	$("#Validate").prop("disabled", true);





	sock = new WebSocket("ws://" + api_url + "/admin/server/status");
	var text = "";
	var sendmsg = {
		"usertoken" : usr,
		"action" : "Validate",
		"server_ip" : ip,
		"server_port" : port,
		"server_username" : username,
		"server_password" : password,
		"server_schema" : schema
	}

	sock.onopen = function(event) {
		$("#msg_window").empty();
		text = "Starting Validation .....<br/>";
		$("#msg_window").append(text);
		sock.send(JSON.stringify(sendmsg));
	}

	sock.onmessage = function(event) {
		console.log('message', event.data);

		// attempt to parse the json response
		var msg = JSON.parse(event.data);


	}





}