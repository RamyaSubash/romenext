/**
 * 
 */
function Error_handlingUtils() {
	var list_errors = [];
	list_errors.push({
		err_nb : '01',
		err_text : 'No Link property added'
	}, {
		err_nb : '02',
		err_text : 'No Node property added'
	}, {
		err_nb : '03',
		err_text : 'No connection property added'
	}, {
		err_nb : '04',
		err_text : ''
	}, {
		err_nb : '05',
		err_text : ''
	}, {
		err_nb : '06',
		err_text : ''
	}, {
		err_nb : '07',
		err_text : ''
	}, {
		err_nb : '07',
		err_text : ''
	}
	)


}
;

Error_handlingUtils.consolePrint = function(text, type) {

	switch (type) {
	case "success":
		console.log('%c ' + text, style_success);
		break;
	case "error":
		console.log('%c ' + text, style_error);
		break;

	case "warning":
		console.log('%c ' + text, style_warning);
		break;

	case "simple":
		console.log('%c ' + text, style_simple);
		break;


	default:
		console, log(text);
	}
}