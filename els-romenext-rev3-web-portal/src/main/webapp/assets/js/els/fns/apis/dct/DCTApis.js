/**
 * 
 */
function DCTApis (){
	this.saveNewDCT = function saveNewDCT(jsonData, doneFunction, failFunction ){
			
			if (selectedMetaData){
				var saveNewDCTRequest = $.ajax({
					method : 'POST',
					url : apiBaseUrl + 'dct/create/metadata/' + selectedMetaData,
					dataType : 'json',
					data : JSON.stringify(jsonData),
					contentType : 'application/json',
					cache : false,
					async:false,
				});
				saveNewDCTRequest.done(function (data) {  
					doneFunction( data );
				});
				saveNewDCTRequest.fail(function (xhr, status, error) {
					failFunction( xhr, status, error );
				});
	
			}
		
		}
	}