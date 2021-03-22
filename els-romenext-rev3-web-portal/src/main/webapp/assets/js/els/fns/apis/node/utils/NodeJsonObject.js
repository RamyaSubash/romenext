//	private Long typeId;
//	private List<Property> properties;
//	private List<Property> decoProperties;
//	private List<Long> decorators;
//	private Long defaultDecoId;
//	private Long partGroup;
//	private Long modelId;
function NodeJsonObject() {

	var selectedMetaData;
	var typeId;			// must be a string
	var properties= [];
	
	
	var decoProperties = [];
	var decorators = [];
	var defaultDecorator;
	var partGroup;
	var modelId;
	
	this.init = function( tmpSelectedMetaData, tmpTypeId, tmpProps ) {
		this.selectedMetaData = tmpSelectedMetaData;
		this.typeId = tmpTypeId;
		this.properties = tmpProps;
	};
	
	this.createJson = function() {
		
		var jsonObj = {};
		
		// grab the type
		jsonObj[ "typeId" ] = this.typeId;
		jsonObj[ "selectedMetaData" ] = this.selectedMetaData;
		jsonObj[ "defaultDecorator" ] = this.defaultDecorator;
		jsonObj[ "properties" ]       = this.properties
		
		var stringified = JSON.stringify( jsonObj );
		
		return stringified; 
	}
	
};