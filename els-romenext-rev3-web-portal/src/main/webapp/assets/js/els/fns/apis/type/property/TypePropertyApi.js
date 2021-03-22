//=====================================================================
function TypePropertyApi() {

	/**
	 * Will add the array of properties to the given type
	 * @param properties
	 * @param doneFunction
	 * @param failFunction
	 */
	this.addTypeProperties = function(properties, doneFunction, failFunction) {

		// should we do a sanity check on the properties to ensure it's the right class?

		if (selectedMetaData) {
			var saveTypePropertiesRequest = $.ajax({
				method : 'POST',
				url : apiBaseUrl + 'type/properties/viaid/metadata/' + selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(properties),
				contentType : 'application/json',
				async : false,
				cache : false,
			});
			saveTypePropertiesRequest.done(function(data) {
				doneFunction(data);
			});
			saveTypePropertiesRequest.fail(function(xhr, status, error) {
				failFunction(xhr, status, error);
			});
		}
	};







	this.getType = function(id, doneFunction, failFunction) {
		if (selectedMetaData != null) { //  not sure if it is needed as this action is from a TypeGraph
			var typerequest = $.ajax({
				type : 'GET',
				url : apiBaseUrl + 'type/id/' + id,
				dataType : 'json',
				contentType : 'application/json',
				async : false,
				cache : false
			});
			typerequest.done(function(data) {
				doneFunction(data);
			});
			typerequest.fail(function(xhr, status, error) {
				failFunction(xhr, status, error);
			});
		}
		;

	};



}