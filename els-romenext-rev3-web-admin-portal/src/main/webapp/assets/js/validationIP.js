/**
 * 
 */

function validationIP() {
}


validationIP.isValidIpv4Addr = function(ip) {
	return /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/.test(ip);
}

validationIP.validateIp = function(e) {
	if (e.which != 8 && e.which != 46 && (e.which < 48 || e.which > 57) && (e.which < 96 || e.which > 105)) {
		console.log(e.which);
		return false;
	} else {
		var ip = document.getElementById("selectip").value;
		console.log(ip);
		document.getElementById("validate_ip").innerHTML = isValidIpv4Addr(ip) ? 'VALID!' : 'INVALID!' ;
		return true;
	}

}