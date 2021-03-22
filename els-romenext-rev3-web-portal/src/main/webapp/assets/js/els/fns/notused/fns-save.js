/**
 * Save event handlers/functions
 * Author: Jim Hsiao, Baya Benrachi
 * Date: 31 March 2016
 * Update:
 */










//-------------------- Leave it for example, used in combined.jsp --------------------
var saveProperties = function(event) {
	/* stop form from submitting normally */
	event.preventDefault();

	// Input key value pair object
	var propertiesData = {};

	var buildDataString = function(index, inputElement) {
		if (inputElement.type != "submit" && inputElement.name != "OBJECT_ID") {
			propertiesData[inputElement.name] = inputElement.value;
		}
	};

	// Loop through input fields on the dialog
	$("#propertiesDialog input").each(function(i, e) {
		buildDataString(i, e);
	});

	// Here I call the ajax and post the data
	$.ajax({
		url : hostname + "rome/api/generic",
		method : "POST",
		data : JSON.stringify({
			"action" : "setProperties",
			"objid" : selectedObj[0].objectId,
			"properties" : [ propertiesData ]
		}),
		dataType : "text",
		success : function(resp) {
		},
		error : function(xhr, status, error) {
			
			
		}
	});

	alert("Handler for .submit() called.");
}, saveCoord = function() {
	if (dirtyElements.length == 0) {
		return;
	}
	var dirtyElement = dirtyElements.filter(function(element) {
		return element.objectId = "1313766";
	}).pop();

	$.ajax({
		url : hostname + "rome/api/generic",
		method : "POST",
		data : JSON.stringify({
			"action" : "setCoords",
			"objid" : dirtyElement.objectId,
			"X_COORD" : (dirtyElement.X_COORD * drawingScale).toString(),
			"Y_COORD" : (dirtyElement.Y_COORD * drawingScale).toString(),
		}),
		dataType : "text",
		success : function(data) {
			var jsonData = JSON.parse(data);
			console.log(JSON.stringify(jsonData));

			$("#output")[0].innerHTML = JSON.stringify(jsonData);
		}
	}).done(function(html) {
		console.log("New coords has been saved!!");

	});
};





