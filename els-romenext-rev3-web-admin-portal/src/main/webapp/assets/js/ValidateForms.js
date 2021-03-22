/**
 * 
 */
function ValidateForms() {
}
//  OLD VERsion validation  
ValidateForms.addServer = function() {
	console.log("Inside validate");
	var boxname = document.getElementById('add_boxname');
	var ip = document.getElementById('add_ip');
	var port = document.getElementById('add_port');
	var username = document.getElementById('add_username');
	var password = document.getElementById('add_password');
	var schema = document.getElementById('add_schema');
	$(".msg_err").empty();

	if (!ValidateForms.notEmpty(boxname)) {
		$("#err_add_boxname").append("Field Cannot be empty");
		return false;
	}
	if (!ValidateForms.notEmpty(ip)) {
		$("#err_add_ip").append("Field Cannot be empty");
		return false;
	}
	if (!ValidateForms.isIPAddress(ip.value)) {
		$("#err_add_ip").append("Field not a proper ip");
		return false;
	}
	if (!ValidateForms.notEmpty(port)) {
		$("#err_add_port").append("Field Cannot be empty");
		return false;
	}
	if (!ValidateForms.isNumeric(port.value)) {
		$("#err_add_port").append("Field should be numeric");
		return false;
	}

	if (!ValidateForms.notEmpty(username)) {
		$("#err_add_username").append("Field Cannot be empty");
		return false;
	}
	if (!ValidateForms.notEmpty(password)) {
		$("#err_add_password").append("Field Cannot be empty");
		return false;
	}
	if (!ValidateForms.notEmpty(schema)) {
		$("#err_add_schema").append("Field Cannot be empty");
		return false;
	}
	return true;

}
ValidateForms.addServer2 = function(pre) {
	console.log("Inside validate EDIT Server");

	$(".msg_err").empty();

	var formName = document.add_server_form;

	var boxname = formName.add_boxname.value;
	var ip = formName.add_ip.value;
	var port = formName.add_port.value;
	var schema = formName.add_schema.value;
	var username = formName.add_username.value;
	var password = formName.add_password.value;

	var error = false;

	if (boxname.length == 0) {
		$("#err_" + pre + "_boxname").append("Field Cannot be empty");
		error = true;
	}
	if (ip.length == 0) {
		$("#err_" + pre + "_ip").append("Field Cannot be empty");
		error = true;
	}
	if (!ValidateForms.isIPAddress(ip)) {
		$("#err_" + pre + "_ip").append("Field not a proper ip");
		error = true;
	}
	if (port.length == 0) {
		$("#err_" + pre + "_port").append("Field Cannot be empty");
		error = true;
	}
	if (port.length == 0) {
		$("#err_" + pre + "_port").append("Field should be numeric");
		error = true;
	}

	if (username.length == 0) {
		$("#err_" + pre + "_username").append("Field Cannot be empty");
		error = true;
	}
	if (password.length == 0) {
		$("#err_" + pre + "_password").append("Field Cannot be empty");
		error = true;
	}
	if (schema.length == 0) {
		$("#err_" + pre + "_schema").append("Field Cannot be empty");
		error = true;
	}
	if (!error) {
		return true;
	}
	else return false;

}
ValidateForms.editServer = function(pre) {
	console.log("Inside validate EDIT Server");

	$(".msg_err").empty();

	var boxname = document.edit_server_form.edit_boxname.value;
	var ip = document.edit_server_form.edit_ip.value;
	var port = document.edit_server_form.edit_port.value;
	var schema = document.edit_server_form.edit_schema.value;
	var username = document.edit_server_form.edit_username.value;
	var password = document.edit_server_form.edit_password.value;

	var error = false;

	if (boxname.length == 0) {
		$("#err_" + pre + "_boxname").append("Field Cannot be empty");
		error = true;
	}
	if (ip.length == 0) {
		$("#err_" + pre + "_ip").append("Field Cannot be empty");
		error = true;
	}
	if (!ValidateForms.isIPAddress(ip)) {
		$("#err_" + pre + "_ip").append("Field not a proper ip");
		error = true;
	}
	if (port.length == 0) {
		$("#err_" + pre + "_port").append("Field Cannot be empty");
		error = true;
	}
	if (port.length == 0) {
		$("#err_" + pre + "_port").append("Field should be numeric");
		error = true;
	}

	if (username.length == 0) {
		$("#err_" + pre + "_username").append("Field Cannot be empty");
		error = true;
	}
	if (password.length == 0) {
		$("#err_" + pre + "_password").append("Field Cannot be empty");
		error = true;
	}
	if (schema.length == 0) {
		$("#err_" + pre + "_schema").append("Field Cannot be empty");
		error = true;
	}
	if (!error) {
		return true;
	}
	else return false;

}
ValidateForms.editRepo = function(pre) {
	console.log("Inside validate Repo");

	$(".msg_err").empty();

	var name = document.edit_repo_form.edit_name.value;
	var desc = document.edit_repo_form.edit_desc.value;
	var ip = document.edit_repo_form.edit_ip.value;
	var username = document.edit_repo_form.edit_username.value;
	var password = document.edit_repo_form.edit_password.value;

	var error = false;

	if (name.length == 0) {
		$("#err_" + pre + "_name").append("Field Cannot be empty");
		error = true;
	}
	if (ip.length == 0) {
		$("#err_" + pre + "_ip").append("Field Cannot be empty");
		error = true;
	}
	if (desc.length == 0) {
		$("#err_" + pre + "_desc").append("Field Cannot be empty");
		error = true;
	}

	if (username.length == 0) {
		$("#err_" + pre + "_username").append("Field Cannot be empty");
		error = true;
	}
	if (password.length == 0) {
		$("#err_" + pre + "_password").append("Field Cannot be empty");
		error = true;
	}
	if (!error) {
		return true;
	}
	else return false;

}
ValidateForms.notEmpty = function(elem) {
	if (elem.value.length == 0) {
		elem.focus(); // set the focus to this input
		return false;
	}
	return true;
}
ValidateForms.isNumeric = function(elem) {
	var numericExpression = /^[0-9]+$/;
	if (elem.match(numericExpression)) {
		return true;
	} else {
		return false;
	}
}
ValidateForms.isIPAddress = function(elem) {
	var alphaExp = /^[0-9.]+$/;
	if (elem == "localhost" || elem.match(alphaExp)) {
		return true;
	} else {
		return false;
	}
}
ValidateForms.showAddGroup = function(event) {
	console.log("Inside validate ADD GROUP");
	event.preventDefault();
	$(".msg_err").empty();

	var formName = document.add_newgroup;

	var groupname = formName.add_groupname.value;

	var error = true;

	if (groupname === "") {
		$("#err_add_groupname").append("Field Cannot be empty");
		error = false;
	}
	var space = groupname.indexOf(' ') >= 0;
	if (space) {
		$("#err_add_groupname").append("Group name can not have space");
		error = false;
	}
	if (document.add_newgroup.add_groupbase.selectIndex == "") {
		$("#err_add_groupbase").append("Please select option");
		error = false;
	}

	if (error) {
		document.add_newgroup.submit()
	} else return false;
}
ValidateForms.showAddUser = function(event) {
	console.log("Inside validate ADD USER");
	event.preventDefault();
	$(".msg_err").empty();

	var formName = document.addUserForm;

	var username = formName.user_username.value;
	var password = formName.user_pw1.value;
	var confpwd = formName.user_pw2.value;
	var groupbase = formName.user_groupselected;

	var error = true;

	if (username === "") {
		$("#err_user_username").append("Field Cannot be empty");
		error = false;
	}
	var space = username.indexOf(' ') >= 0;
	if (space) {
		$("#err_user_username").append("Username can not have space");
		error = false;
	}


	if (password === "") {
		$("#err_user_pw1").append("Field Cannot be empty<br/>");
		error = false;
	}
	if (confpwd === "") {
		$("#err_user_pw2").append("Field Cannot be empty<br/>");
		error = false;
	}
	if (password.localeCompare(confpwd) != 0) {
		$("#err_user_pw2").append("Password & confirmed password are different");
		error = false;
	}

	if (groupbase.selectIndex == "") {
		$("#err_user_groupselected").append("Please select a group ");
		error = false;
	}

	if (error) {
		formName.submit()
	} else return false;
}
ValidateForms.editGroup = function(event) {
	console.log("Inside validate EDIT GROUP");
	event.preventDefault();
	$(".msg_err").empty();

	var formName = document.editGroupForm;
	var groupname = formName.edit_groupname.value;
	var error = true;

	if (groupname === "") {
		$("#err_edit_groupname").append("Field Cannot be empty");
		error = false;
	}
	var space = groupname.indexOf(' ') >= 0;
	if (space) {
		$("#err_edit_groupname").append("Group name can not have space");
		error = false;
	}

	if (error) {
		document.editGroupForm.submit()
	} else return false;
}
ValidateForms.configure = function(event) {

	console.log("Inside validate Configure server");
	event.preventDefault();
	$(".msg_err").empty();

	var formName = document.server_config_form;

	var ip = formName.server_ip.value;
	var port = formName.server_port.value;
	var user = formName.server_username.value;
	var password = formName.server_password.value;

	var error = true;
	if (!ValidateForms.emptyField(ip, "Field Cannot be empty  ", "server_ip")) {
		error = false;
	} else {
		if (!(ip.toLowerCase() == 'localhost') && !ValidateForms.ValidIpAddress(ip)) {
			$("#err_server_ip").append("Invalid IP address ");
			error = false;
		}
	}

	if (port == "") {
		$("#err_server_port").append("Field Cannot be empty ");
		error = false;
	}

	if (user == "") {
		$("#err_server_username").append("Field Cannot be empty");
		error = false;
	} else {
		var space = user.indexOf(' ') >= 0;
		if (space) {
			$("#err_server_username").append("Username can not have space");
			error = false;
		}
	}


	if (password == "") {
		$("#err_server_password").append("Field Cannot be empty");
		error = false;
	}

	if (error) {
		formName.submit()
	} else return false;
}
ValidateForms.emptyField = function(field, errormsg, errmsgfield) {
	if (field == "") {
		$("#err_" + errmsgfield).append(errormsg);
		return false;
	}
	return true;
}

// NEW VERSION validation
ValidateForms.ValidIpAddress = function(ip) {
	//	if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
	return (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip));
}
ValidateForms.ValidPort = function(port) {
	//	if (/^(6553[0-5]|655[0-2][0-9]\d|65[0-4](\d){2}|6[0-4](\d){3}|[1-5](\d){4}|[1-9](\d){0,3})$/.test(port)) {
	return portpattern.test(port);
}
ValidateForms.keyedInIp = function() {}