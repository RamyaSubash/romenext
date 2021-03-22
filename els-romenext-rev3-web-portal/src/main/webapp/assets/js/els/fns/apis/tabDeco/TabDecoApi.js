function TabDecoApi() {
	
	this.loadAllTabActions  = function ( doneFunction, failFunction ){

		if( selectedMetaData == null ) {
			return null;
		}	
		var request = $.ajax({
			method : 'POST',
			url: webguiBaseUrl + "romenext/gui/split/tabAction?metadata="+ selectedMetaData,	
			dataType : 'json',
			contentType : 'application/json',
			async : false
		});
		request.done(function (data) {  
			doneFunction( data );
		});
		request.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});
	};
	
	this.saveNewTab  = function ( jsonData,  doneFunction, failFunction ){
        var json = jsonData;
        console.log(json);
		if( selectedMetaData == null ) {
			return null;
		}
		
		var request = $.ajax({
			method    : 'POST',
			url       : webguiBaseUrl + "romenext/gui/split/tabAdd?metadata="+ selectedMetaData,	
			dataType  : 'json',
			data      : JSON.stringify(jsonData),
			contentType: 'application/json',
			mimeType  : 'application/json',
			async : false
		});

		request.done(function (data) {  
			doneFunction( data );
		});
		request.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});
	};
	
	
	
	this.saveNewObject  = function ( jsonData,  doneFunction, failFunction ){

		if( selectedMetaData == null ) {
			return null;
		}
		
		var request = $.ajax({
			method : 'POST',
			url: webguiBaseUrl + "romenext/gui/split/tabObjectAdd?metadata="+ selectedMetaData,	
			dataType  : 'json',
			data      : JSON.stringify(jsonData),
			contentType: 'application/json',
			mimeType  : 'application/json',
			async : false
		});

		request.done(function (data) {  
			doneFunction( data );
		});
		request.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});
	};
	
	this.saveNewObjectProperty  = function ( jsonData,  doneFunction, failFunction ){

		if( selectedMetaData == null ) {
			return null;
		}
		
		var request = $.ajax({
			method : 'POST',
			url: webguiBaseUrl + "romenext/gui/split/tabObjectPropertyAdd?metadata="+ selectedMetaData,	
			dataType  : 'json',
			data      : JSON.stringify(jsonData),
			contentType: 'application/json',
			mimeType  : 'application/json',
			async : false
		});

		request.done(function (data) {  
			doneFunction( data );
		});
		request.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});
	};
	
	this.loadTab  = function ( jsonData,  doneFunction, failFunction ){
        var json = jsonData;
        console.log(json);
		if( selectedMetaData == null ) {
			return null;
		}
		
		var request = $.ajax({
			method    : 'POST',
			url       : webguiBaseUrl + "romenext/gui/split/tabList?metadata="+ selectedMetaData,	
			dataType  : 'json',
			data      : JSON.stringify(jsonData),
			contentType: 'application/json',
			mimeType  : 'application/json',
			async : false
		});

		request.done(function (data) {  
			doneFunction( data );
		});
		request.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});
	};
	this.loadAllTabs  = function ( doneFunction, failFunction ){
		if( selectedMetaData == null ) {
			return null;
		}
		
		var request = $.ajax({
			method    : 'GET',
			url       : webguiBaseUrl + "romenext/gui/split/allTabList?metadata="+ selectedMetaData,	
			dataType  : 'json',
			contentType: 'application/json',
			mimeType  : 'application/json',
			async : false
		});

		request.done(function (data) {  
			doneFunction( data );
		});
		request.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});
	};
	this.loadObjects  = function ( jsonData,  doneFunction, failFunction ){
        var json = jsonData;
        console.log(json);
		if( selectedMetaData == null ) {
			return null;
		}
		
		var request = $.ajax({
			method    : 'POST',
			url       : webguiBaseUrl + "romenext/gui/split/tabObjectsList?metadata="+ selectedMetaData,	
			dataType  : 'json',
			data      : JSON.stringify(jsonData),
			contentType: 'application/json',
			mimeType  : 'application/json',
			async : false
		});

		request.done(function (data) {  
			doneFunction( data );
		});
		request.fail(function (xhr, status, error) {
			failFunction( xhr, status, error );
		});
	};
	
}