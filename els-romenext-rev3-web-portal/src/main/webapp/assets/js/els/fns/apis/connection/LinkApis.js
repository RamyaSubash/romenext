/**
 * 
 */
function LinkApis() {
	
	 this.deleteConnectionAPI = function (connData, doneFunction, failFunction ){
			
			if (selectedMetaData){
				var deleteConnectionRequest = $.ajax({
					method : 'POST',
					url : apiBaseUrl + 'connection/delete/link/'+ selectedMetaData,
					dataType : 'json',
					data : JSON.stringify(connData),
					contentType : 'application/json',
					cache : false,
					async:false,
				});
				deleteConnectionRequest.done(function (data) {  
					doneFunction( data );
				});
				deleteConnectionRequest.fail(function (xhr, status, error) {
					failFunction( xhr, status, error );
				});
		
			}
		
		}
		
		
	
	
	
}