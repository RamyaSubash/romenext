function showAddModel3DDialog() {
//	$("#model_info").empty();
	
	var dlg_width = 400, dlg_height = 50, dlg_offset_x = 300, dlg_margin_top = 300;
	var dialog = $('#dialog');
	
	dialog.dialog({
		width : dlg_width,
		autoOpen : false,
		position : {
			my : "center center",
			at : "center center",
			of : "#gvTabContent"
		},
		buttons : {
			"Add Model 3D" : function() {
				createNewModel3D(dialog.find("form"));
			},
			Cancel : function() {
				dialog.dialog("close");
			}
		}
	});

	if (!hasMoved && dialog.dialog("instance")) {
		grayOut(true);
		
		var formHeader = "<form id='add_new_model'>", inputs = "";
		
		// Name field
		inputs += "<label>Name: <input type='text' name='name' required/></label><br />";
		 
		// <!-- Allow form submission with keyboard without duplicating the dialog button -->
		var formFooter = "<input type='submit' tabindex='-1' style='visibility:hidden; position:absolute; top:-100px;' />";
	
		dialog.dialog("option", "title", "Add Model 3D");
		dialog[0].innerHTML = formHeader + inputs + formFooter;
		dialog.dialog("open");
	}
	
	dialog.find("form").on("submit", function(event) {
		event.preventDefault();
		createNewModel3D(this);
	});
	
	
}
//==========================================================================================================
// Deprecated
function createNewModel3D(form) {

	var typeId = findTypeIdByName(curType), foundError = false;
	if (selectedMetaData == null || typeId == null) {
		return;
	}
	var modelName;
	$(form).find(':input').each(function (i, field) {
		if ((field.type != 'submit') && (field.type != 'radio') || field.checked) {	
			if (field.name == 'name') {
				if(!field.value){
					console.log("Missing Value for type Name.");
					$('#dialog').append("<br/><p style='color:red'>Missing Value for Model name : ");
					foundError = true;
				}else {
				       modelName = field.value;
				}
			}
		}
	});
	if (foundError){
		return;
	}
		var json_addModel = '{"repoid": ' + selectedMetaData + ', "typeid": ' + Number(typeId) + ', "name": ' + modelName + '}';
		
		var successFunction = function( data ) {
//			console.log("success to add a model");
			$('#console-log').append(" Successfully added a Model");
			curModel = data.updatedModel.id;
			loadModels();
			create3DPhysicalViewToolBar();
			recreateModelDropdownMenu3D(); 
			loadModelShape3D();	
		};
		
		var failFunction = function( xhr, status, error ) {
			$('#console-log').append("<p style='color:red'> failed to create new model:"+xhr.status+"</p>");
			console.log('failed to create a new model: '+ xhr.responseText);
		};
		
		var apis = new apiRomeNext();
		apis.addModel(json_addModel, successFunction, failFunction );		
		$(form).parent().dialog("close" );

}
