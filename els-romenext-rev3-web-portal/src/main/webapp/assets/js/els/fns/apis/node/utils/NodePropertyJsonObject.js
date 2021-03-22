//	private String id;
//	private String name;
//	private Object value;
//	private String maxValue;
//	private String minValue;
//	private String defaultValue;
//	private Boolean isMandatory;
//	private Boolean isUnique;
//	private String propertyType;
//	private List<String> validValues;
//	private Long romeDecoPropId;
function NodeJsonObject() {

	var id;
	var typeIdname;
	var value;
	var maxValue;
	var minValue;
	var defaultValue;
	var isMandatory;
	
	var modelId;
	
	this.init = function( tmpSelectedMetaData, tmpTypeId, tmpProps ) {
		this.selectedMetaData = tmpSelectedMetaData;
		this.typeId = tmpTypeId;
		this.properties = tmpProps;
	};
	
	this.createJsonObject = function () {
		return null;
	};
	
};