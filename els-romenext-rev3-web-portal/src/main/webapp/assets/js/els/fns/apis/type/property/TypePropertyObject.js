//=====================================================================
function TypePropertyObject( id, name, value, maxValue, minValue, defaultValue, isMandatory, isUnique, propertyType ) {
	
	this.id   = id;
	this.name = name;
	this.value = value;
	this.maxValue = maxValue;
	this.minValue = minValue;
	this.defaultValue = defaultValue;
	this.isMandatory = isMandatory;
	this.isUnique = isUnique;
	this.propertyType = propertyType;
	
	// General API Calls
	this.generateJSONPayloadForAPI = function ( properties ){
		
		var property={};
		
		if( properties == null ) {
			properties = [];			
		}
		if( this.id != null ) {
			property["propertyId"] = this.id;	
		}
		
		if( this.name != null ) {
			property["propertyName"] = this.name;	
		}
		if( this.maxValue != null ) {
			property["propertyType"] = this.propertyType;
		}
		if( this.maxValue != null ) {
			property["maxValue"] = this.maxValue;
		}
		if( this.maxValue != null ) {
			property["minValue"] = this.minValue;
		}
		if( this.maxValue != null ) {
			property["defaultValue"] = this.defaultValue;
		}
//		if( this.maxValue != null ) {
//			property["validValues"] = this.name;
//		}
		if( this.maxValue != null ) {
			property["isMandatory"] = this.isMandatory;
		}
		if( this.maxValue != null ) {
			property["isUnique"] = this.isUnique;
		}	

		properties.push(property);
		property ={};
		
		return properties;
		
	}
}

//TypePropertyObject.createTypeProperty( name, value, maxValue, minValue, defaultValue, isMandatory, isUnique, propertyType  ) {
//	
//}

//private String id;
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