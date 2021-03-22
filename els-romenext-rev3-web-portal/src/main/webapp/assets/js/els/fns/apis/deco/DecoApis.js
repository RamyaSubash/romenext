function DecoApis() {
	
	this.getDecoByClassificationAndGrouping = function (jsonData, doneFunction, failFunction) {
		
		if( selectedMetaData == null ) {
			return null;
		}

		var request = $.ajax({
			method : 'POST',
			url: apiBaseUrl + 'deco/find/byclassgroupname/',
			dataType : 'json',
			data : JSON.stringify(jsonData),
			contentType : 'application/json',
			cache : false,
			async : false
		});

		request.done(function (data) {  
			doneFunction( data );
		});
		request.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});
		
	};
	
};
