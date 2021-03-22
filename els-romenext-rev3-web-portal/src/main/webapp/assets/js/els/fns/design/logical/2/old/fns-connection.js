/**
 * Connection functions Author: Baya Benrachi Date: 18 April 2016 Update: 13
 * June 2016
 */

// ==========================DELETE A CONNECTION
// ======================================
// ==========================Added the metadata parameter
// =============================
//function deleteConnection(form) {
//	var jsonData = {};
//
//	$(form).find(':input').each(
//			function(i, field) {
//				if ((field.type != 'submit' && field.type != 'radio')
//						|| field.checked) {
//					jsonData[field.name] = field.value;
//				}
//			});
//	var name = jsonData["name"];
//	var rule = jsonData["rule"];
//	var origin = jsonData["origin"];
//	var dest = jsonData["destination"];
//
//	console.log(jsonData);
//
//	var doneFunction = function(data) {
//		console.log(data);
//
//		var tmpConn = connMap[name];
//		delete connMapViaId[tmpConn.id]; // delete the conn map via id -
//		// jplee Jan2017
//		delete connMap[name];
//		tdvCy.$(':selected').remove();
//		(new DesignLogicalRenderer()).emptyAll();
//
//	};
//
//	var failFunction = function(xhr, status, error) {
//		console.log('Error Delete Connection not done: ' + xhr.status);
//		$('#console-log').append(
//				"<p style='color:red'>Error Delete Connection not done."
//						+ xhr.status + "</p>");
//		(new DesignLogicalRenderer()).emptyAll();
//	};
//
//	var apis = new apiRomeNext();
//
//	apis.deleteConnection(origin, dest, rule, jsonData, doneFunction,
//			failFunction);
//
//}