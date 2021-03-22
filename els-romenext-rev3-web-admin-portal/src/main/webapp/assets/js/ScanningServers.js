/**
 * 
 */
function ScanningServers() {
}
ScanningServers.setScanDiv = function() {
	var inputs = "";

	inputs += '<div class="table-responsive">';
	inputs += '<form class="scan-form" action="/admin/boot/server/scan" 	method="post">';
	inputs += '<input type="hidden" name="edit_id" value="${ id }">';
	inputs += '<input type="hidden" id="appi_url" value = "${api_url }"/>';
	inputs += '<div class="input-group">';
	inputs += '<span class="input-group-addon"><i class="fa fa-server" aria-hidden="true"></i>Start IP</span>';
	inputs += '<input type="text" class="form-control" placeholder="" name="scan_ip_min" id="scan_ip_min_id" value="192.168.2.226">';
	inputs += '<span class="input-group-addon"><i class="icon_key_alt"></i>End IP</span>';
	inputs += '<input type="text" class="form-control" placeholder="3306" name="scan_ip_max" id="scan_ip_max_id" value="192.168.2.255">';
	inputs += '</div>';
	inputs += '<div class="input-group">';
	inputs += '<span class="input-group-addon"><i class="fa fa-server" aria-hidden="true"></i>Port</span>';
	inputs += '<input type="text" class="form-control" placeholder="" name="scan_port" id="scan_port_id" value="3306">';
	inputs += '</div>';
	inputs += '<div style="text-align: center">';
	inputs += '<button id="scanserver" class="btn btn-primary btn-sn" type="button" onclick="ScanningServers.startNewScan()">Start Scan</button>';
	inputs += '<button id="stopscan" class="btn btn-primary btn-sm" type="button" onclick="ScanningServers.cancelScan()">Cancel</button>';
	//	inputs += '<button id="loginAdmin" class="btn btn-primary btn-md" type="button" onclick="ScanningServers.stopScan()">Stop Scan</button>';
	inputs += '</div>';
	inputs += '</form>';
	inputs += '<div><span id="error_msg"></span>';
	inputs += '</div>';
	inputs += '<div>';
	inputs += '<table border=1 id="output_table" class="table table-hover table-condensed">';
	inputs += '<thead>';
	inputs += '<tr><th>IP Address</th><th>Status</th><th>Ping Result</th><th>Options</th></tr>';
	inputs += '</thead>';
	inputs += '<tbody id="output_body">';
	inputs += '</tbody>';
	inputs += '</table>';
	inputs += '</div></div>';


	//	var div = document.getElementById("scanning_servers");
	$("#scanning_servers").empty();
	$("#scanning_servers").append(inputs);
};

ScanningServers.startNewScan = function() {
	console.log("STARTING NEW SCAN");

	var startIP = $("#scan_ip_min_id");
	var endIP = $("#scan_ip_max_id");
	var port = $("#scan_port_id");

	//	var api = $("#appi_url");
	console.log(" session is " + api_url);
	var sock = new WebSocket("ws://" + api_url + "/admin/boot/socket/server/scan");

	var msg = {
		"usertoken" : "${sessionScope.ROMENEXT_SESS_USER_TKNS.username }",
		"action" : "START",
		"scan_ip_start" : startIP.val(),
		"scan_ip_end" : endIP.val(),
		"scan_port" : port.val()
	}

	sock.onopen = function(event) {
		console.log('open');
		sock.send(JSON.stringify(msg));
	};


	sock.onmessage = function(e) {
		console.log('message', e.data);

		// attempt to parse the json response
		var msg = JSON.parse(e.data);

		if (msg.pingstatus == "error") {
			console.log("Message error: " + msg.msg);
			$("#error_msg").text(msg.msg);
		} else if (msg.pingstatus == "good") {
			console.log("mesage", msg);
			var output = "<tr><td>" + msg.ip + "</td><td>";

			if (msg.accepting == true) {
				output += "<span style='color:green;font-weight:bold'>YES</td><td>" + msg.ping + "</td><td><a href='/admin/boot/server/add?ip=" + msg.ip_num + "&port=" + msg.port + "'>Add Server</a></td></tr>";
			//				output += "<span style='color:green;font-weight:bold'>YES</td><td>" + msg.ping + "</td><td>Go To Add Server</td></tr>";
			} else {
				output += "<span style='color:red;font-weight:bold'>NO</td><td>n/a</td><td>n/a</td></tr>";
			}

			$("#output_table tbody").after(output);
		}

	};

	sock.onclose = function() {
		console.log('CLOSING STARTING?');
	};

}

ScanningServers.cancelScan = function() {
	console.log("Cancel SCAN");
	var sock = new WebSocket("ws://" + api_url + "/admin/boot/socket/server/scan");

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

	$("#scanning_servers").empty();

}

ScanningServers.stopScan = function() {
	console.log("STOP SCAN");
	var sock = new WebSocket("ws://" + api_url + "/admin/boot/socket/server/scan");

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