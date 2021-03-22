package com.els.romenext.core.entity.flatstyle;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.dao.RomeRulePropertyDao;
import com.els.romenext.core.db.dao.RomeTypePropertyDao;
import com.els.romenext.core.db.dao.deco.RomeDecoratorPropertyDao;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeRuleProperty;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeProperty;
import com.els.romenext.core.db.entity.deco.RomeDecoratorProperty;
import com.els.romenext.core.db.entity.preference.RomePreferenceGroupTypeProperty;
import com.els.romenext.core.db.entity.rule.RomeRuleDecoratorPropertyValue;
import com.els.romenext.core.db.enums.RomeRulePropertyEnum;
import com.els.romenext.core.db.enums.RomeTypePropertyEnum;
import com.els.romenext.core.enums.ValueTypeEnum;
import com.els.romenext.core.util.date.RomeDateUtils;

public class Property {

	private static Logger log = Logger.getLogger( Property.class );
	
	private String id;
	private String name;
	private Object value;
	private String maxValue;
	private String minValue;
	private String defaultValue;
	private Boolean isMandatory;
	private Boolean isUnique;
	private String propertyType;			// NOTE: This is suppose to reference ValueTypeEnum here! TODO: We need to refactor this JPL: apr11/2017
	private List<String> validValues;
	
	@Deprecated
	private Long romeDecoPropId;			// NOTE: This is really a duplicate of the ID when the property is a deco property. This shoudl be deleted. JPL : May2/2017


	public Property() {
		
	}

	public Property( Property p ) {
		this.id = p.getId();
		this.name = p.getName();
		this.value = p.getValue();
		this.maxValue = p.getMaxValue();
		this.minValue = p.getMinValue();
		this.defaultValue = p.getDefaultValue();
		this.isMandatory = p.getIsMandatory();
		this.isUnique = p.getIsUnique();
		this.propertyType = p.getPropertyType();
		this.validValues = p.getValidValues();
		this.romeDecoPropId = p.getRomeDecoPropId();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public void setMaxValue(String maxValue) {
		this.maxValue = maxValue;
	}

	public void setMinValue(String minValue) {
		this.minValue = minValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public void setIsMandatory(Boolean isMandatary) {
		this.isMandatory = isMandatary;
	}

	public void setIsUnique(Boolean isUnique) {
		this.isUnique = isUnique;
	}

	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}

	public void setPropertyType( ValueTypeEnum typeEnum ) {
		this.propertyType = typeEnum.getValueType();
	}

	public void setValidValues(List<String> validValues) {
		this.validValues = validValues;
	}

	public String getName() {
		return name;
	}

	public Object getValue() {
		return value;
	}

	public String getMaxValue() {
		return maxValue;
	}

	public String getMinValue() {
		return minValue;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public Boolean getIsMandatory() {
		return isMandatory;
	}

	public Boolean getIsUnique() {
		return isUnique;
	}

	public String getPropertyType() {
		return propertyType;
	}
	
	public ValueTypeEnum getPropertyTypeEnum() {
		return ValueTypeEnum.getEnum( this.propertyType );
	}

	public List<String> getValidValues() {
		return validValues;
	}

	public Long getRomeDecoPropId() {
		return romeDecoPropId;
	}

	public void setRomeDecoPropId(Long romeDecoId) {
		this.romeDecoPropId = romeDecoId;
	}

	public boolean hasId () {

		return StringUtils.isNotBlank(this.id);

	}

	public boolean hasName () {

		return StringUtils.isNotBlank(this.name);

	}

	public boolean hasValue () {

		return this.value != null;

	}

	public boolean hasPropertyType () {

		return StringUtils.isNotBlank(this.propertyType);

	}

	public boolean hasRomeDecoPropId () {

		return this.romeDecoPropId != null;

	}

	@Override
	public boolean equals(Object obj) {
		if (obj == this) {
			return true;
		}

		if (!(obj instanceof Property)) {
			return false;
		}

		Property property = (Property) obj;

		return (property.name == name || property.name.equals(name))
				&& (property.value == value || property.value.equals(value));
	}

	/**
	 * What should this be?
	 * @param romeTypeProperty
	 * @return
	 */
//	@Override
//	public int hashCode() {
//		int result = 17;
//		result = 31 * result + name.hashCode();
//		result = 31 * result + value.hashCode();
//
//		return result;
//	}


	public static Property build(RomeTypeProperty romeTypeProperty) {

		Property property = new Property();
		property.setId(romeTypeProperty.getId().toString());
		property.setName(romeTypeProperty.getName());
		property.setMaxValue(romeTypeProperty.getMaximumValue());
		property.setMinValue(romeTypeProperty.getMinimumValue());
		property.setDefaultValue(romeTypeProperty.getDefaultValue());
		property.setIsMandatory(romeTypeProperty.getIsRequired());
		property.setIsUnique(romeTypeProperty.getMustBeUnique());
		
		RomeTypePropertyEnum romeTypeEnum = romeTypeProperty.getPropertyTypeEnum();
		property.setPropertyType(ValueTypeEnum.convert( romeTypeEnum ) );  //TODO: need to verify if there is bad data from database

//		property.setPropertyType(ValueTypeEnum.getEnum(romeTypeProperty.getPropertyType()).getValueType());  //TODO: need to verify if there is bad data from database

		return property;
	}

	@Override
	public String toString() {
		return "Property [id=" + id + ", name=" + name + ", value=" + value
				+ ", propertyType="
				+ propertyType + ", romeDecoPropId=" + romeDecoPropId + "]";
	}

	public static Property build(RomeTypeProperty romeTypeProperty, Object value ) {

		Property p = Property.build( romeTypeProperty );
		p.setValue( value );

		return p;
	}
	
	public static Property build(RomeRuleProperty romeRuleProperty, Object value ) {

		Property p = Property.build( romeRuleProperty );
		p.setValue( value );

		return p;
	}

	public static Property build(RomeRuleProperty romeRuleProperty) {

		Property property = new Property();

		property.setId( romeRuleProperty.getId().toString() );
		
		property.setName(romeRuleProperty.getName());
		property.setMaxValue(romeRuleProperty.getMaximumValue());
		property.setMinValue(romeRuleProperty.getMinimumValue());
		property.setDefaultValue(romeRuleProperty.getDefaultValue());
		property.setIsMandatory(romeRuleProperty.getIsRequired());
		property.setIsUnique(romeRuleProperty.getMustBeUnique());
		
		// note, we need to convert the RomeRulePropertyEnum to the property ValueTypeEnum
		RomeRulePropertyEnum rulePropType = romeRuleProperty.getPropertyTypeEnum();
		
//		property.setPropertyType(ValueTypeEnum.getEnum(romeRuleProperty.getPropertyType()).getValueType());
		property.setPropertyType( ValueTypeEnum.convert( rulePropType ).getValueType());

		return property;
	}

	public static Property build(RomeDecoratorProperty decoProp) {

		Property property = new Property();

		property.setId( decoProp.getId().toString() );
		
		property.setName(decoProp.getName());
		property.setMaxValue(decoProp.getMaximumValue());
		property.setMinValue(decoProp.getMinimumValue());
		property.setDefaultValue(decoProp.getDefaultValue());
		property.setIsMandatory(decoProp.getIsRequired());
		property.setIsUnique(decoProp.getMustBeUnique());
		
		/**
		 * WARNING: THIS IS WRONG
		 * We should convert from RomeDecoProperty ENUM to ValueTypeENUM NOT int to int
		 */
		
		ValueTypeEnum typeEnum = ValueTypeEnum.getEnum( decoProp.getPropertyType() );
		
		property.setPropertyType( typeEnum );
	

		return property;
	}
	
	/**
	 * Convience method that simply adds the value
	 * @param decoPropValue
	 * @return
	 */
	public static Property build( RomeRuleDecoratorPropertyValue decoPropValue ) {
		Property decoProp = Property.build( decoPropValue.getRomeDecoratorProperty() );
		
		if( decoPropValue.getValue() != null ) {
			decoProp.setValue( decoPropValue.getValue() );
		}
		
		return decoProp;
	}
	
	public static Property build(RomePreferenceGroupTypeProperty prefProp) {

		Property property = new Property();

		property.setId( prefProp.getId().toString() );
		
		property.setName(prefProp.getName());
		property.setMaxValue(prefProp.getMaximumValue());
		property.setMinValue(prefProp.getMinimumValue());
		property.setDefaultValue(prefProp.getDefaultValue());
		property.setIsMandatory(prefProp.getIsRequired());
		property.setIsUnique(prefProp.getMustBeUnique());
		
		ValueTypeEnum typeEnum = ValueTypeEnum.convert( prefProp.getPropertyTypeEnum() );
		
		property.setPropertyType( typeEnum );
	

		return property;
	}

	public static Property build(String name, String propertyType, String maxValue, String minValue, Object value,
			String defaultValue, List<String> validValues, Boolean isMandatary, Boolean isUnique) {

		Property property = new Property();
		property.setName(name);
		property.setPropertyType(propertyType);
		property.setMaxValue(maxValue);
		property.setMinValue(minValue);
		property.setValue(value);
		property.setDefaultValue(defaultValue);
		property.setValidValues(validValues);
		property.setIsMandatory(isMandatary);
		property.setIsUnique(isUnique);

		return property;

	}

	@Deprecated
	public static Property buildNodeProperty(String id, String propertyType, Object value) {

		Property property = new Property();
		property.setId(id);
		property.setPropertyType(propertyType);
		property.setValue(value);

		return property;

	}

//	/**
//	 * Originally this looks wrong, but we need a method to create NEW properties, which would not have potentially id's
//	 * @param name
//	 * @param propertyType
//	 * @param value
//	 * @return
//	 */
//	public static Property buildNodeProperty(String name, String propertyType, Object value) {
//
//		Property property = new Property();
//		property.setName(name);
//		property.setPropertyType(propertyType);
//		property.setValue(value);
//
//		return property;
//
//	}

	// Builder for node property for api
	/**
	 * I am not 100% if this is needed still
	 * 
	 * @param name
	 * @param propertyType
	 * @param value
	 * @param romeDecoPropId
	 * @return
	 */
	@Deprecated
	public static Property build (String name, String propertyType, Object value, Long romeDecoPropId) {

		Property property = new Property();

		property.setName(name);
		property.setValue(value);
		property.setPropertyType(propertyType);
		property.setRomeDecoPropId(romeDecoPropId);

		return property;

	}

	// Builder for neo4j node property
	public static Property build (RomeType romeType, String key, Object value) {

		// property key cannot be model_id, group_part_id, and default_decorator_id    	
		if (romeType == null || StringUtils.isBlank(key) || value == null) {	
			return null;
		}

		RomeTypePropertyDao rtpDao = new RomeTypePropertyDao();
		RomeTypeProperty rtp = new RomeTypeProperty();

		Property property = new Property();
		String propType = "";
		boolean isDecoProp = false;

		if (key.substring(0, 2).equals("tp")) { // type properties e.g. tp1
			rtp = rtpDao.get(Long.parseLong(key.substring(2, key.length())));
			property.setId(key.substring(2, key.length()));
			property.setName(rtp.getName());
			property.setValue(value);
		} else if (key.contains("_") && key.charAt(0) == 'd') { // deco properties e.g. d1_x

			String decoPropId = key.substring(1, key.indexOf('_'));
			String decoPropKey = key.substring(key.indexOf('_')+1, key.length());

			if (StringUtils.isNumeric(decoPropId)) {

				RomeDecoratorPropertyDao rdpDao = new RomeDecoratorPropertyDao();
				RomeDecoratorProperty romeDecoProp = rdpDao.get(Long.valueOf(decoPropId));

				if (romeDecoProp != null) {

					propType = ValueTypeEnum.getEnum(romeDecoProp.getPropertyType()).toString();
					property.setRomeDecoPropId(romeDecoProp.getId());
					property.setName(decoPropKey);
					property.setValue(value);
					isDecoProp = true;

				}

			}

		} else { // other properties (system properties) e.g. uuid
			property.setName(key);
			property.setValue(value);
		}

		// Find romeTypeProperty by romeType
		//		RomeTypePropertyDao rtpDao = new RomeTypePropertyDao();
		List<RomeTypeProperty> romeTypeProperties = rtpDao.findByRomeTypeAndName(romeType, key);
		if (!isDecoProp) {

			if (CollectionUtils.isEmpty(romeTypeProperties) || romeTypeProperties.size() != 1) {

				// Direct Check 
				if (value instanceof Integer || value instanceof Long) {

					propType = ValueTypeEnum.getEnum(3).toString();


				} else if (value instanceof Double || value instanceof Float) {

					propType = ValueTypeEnum.getEnum(7).toString();

				} 
				else if (value instanceof String || value instanceof Character) {

					propType = ValueTypeEnum.getEnum(13).toString();

				} else if (value instanceof Boolean) {

					propType = ValueTypeEnum.getEnum(17).toString();

				}

			} else {

				propType = ValueTypeEnum.getEnum(romeTypeProperties.get(0).getPropertyType()).toString();

			}

		}

		if (StringUtils.isBlank(propType)) {
			return null;
		}
		// TODO: Handle DATE and REFERRENCE value types
		property.setPropertyType(propType);

		return property;

	}

	// Builder only for neo4j node deco property
	public static Property buildDecoProperty(String key, Object value) {

		Property property = new Property();

		if (StringUtils.isBlank(key) || value == null) {

			return null;

		}

		property.setName(key);
		property.setValue(value);

		String propType = "";

		// Check if is Deco Property
		boolean isDecoProp = false;
		if (key.contains("_")) {

			String decoPropId = key.substring(1, key.indexOf('_'));
			String decoPropKey = key.substring(key.indexOf('_')+1, key.length());

			if (StringUtils.isNumeric(decoPropId)) {

				RomeDecoratorPropertyDao rdpDao = new RomeDecoratorPropertyDao();
				RomeDecoratorProperty romeDecoProp = rdpDao.get(Long.valueOf(decoPropId));

				if (romeDecoProp != null) {

					propType = ValueTypeEnum.getEnum(romeDecoProp.getPropertyType()).toString();
					property.setRomeDecoPropId(romeDecoProp.getId());
					property.setName(decoPropKey);
					isDecoProp = true;

				}

			}

		}

		if (StringUtils.isBlank(propType) || !isDecoProp) {

			return null;

		}

		// TODO: Handle DATE and REFERRENCE value types
		property.setPropertyType(propType);

		return property;

	} 

	// Builder for neo4j rel property
	public static Property build(RomeRule romeRule, String key, Object value) {

		if (romeRule == null || StringUtils.isBlank(key) || value == null) {
			return null;   		
		}

		Property property = new Property();

		property.setName(key);
		property.setValue(value);

		String propType = "";

		// Find romeRuleProperty by romeRule
		RomeRulePropertyDao rrpDao = new RomeRulePropertyDao();
		List<RomeRuleProperty> romeRuleProperties = rrpDao.findByRomeRuleAndName(romeRule, key);
		//List<RomeRuleProperty> romeRuleProperties = romeRule.getFields();

		//Check if is Deco Property
		boolean isDecoProp = false;
		if (key.contains("_")) {

			String decoPropId = key.substring(1, key.indexOf('_'));
			String decoPropKey = key.substring(key.indexOf('_')+1, key.length());

			if (StringUtils.isNumeric(decoPropId)) {

				RomeDecoratorPropertyDao rdpDao = new RomeDecoratorPropertyDao();
				RomeDecoratorProperty romeDecoProp = rdpDao.get(Long.valueOf(decoPropId));

				if (romeDecoProp != null) {

					propType = ValueTypeEnum.getEnum(romeDecoProp.getPropertyType()).toString();
					property.setRomeDecoPropId(romeDecoProp.getId());
					property.setName(decoPropKey);
					isDecoProp = true;

				}

			}

		}

		if (!isDecoProp) {

			if (CollectionUtils.isEmpty(romeRuleProperties) || romeRuleProperties.size() != 1) {

				// Direct Check 
				if (value instanceof Integer || value instanceof Long) {

					propType = ValueTypeEnum.getEnum(3).toString();


				} else if (value instanceof Double || value instanceof Float) {

					propType = ValueTypeEnum.getEnum(7).toString();

				} 
				else if (value instanceof String || value instanceof Character) {

					propType = ValueTypeEnum.getEnum(13).toString();

				} else if (value instanceof Boolean) {

					propType = ValueTypeEnum.getEnum(17).toString();

				}

			} else {  			
				propType = ValueTypeEnum.getEnum(romeRuleProperties.get(0).getPropertyType()).toString();    			
			}

		}

		//    	if (CollectionUtils.isEmpty(romeRuleProperties)) {
		//    		
		//    		// Direct Check 
		//        	if (value instanceof Integer || value instanceof Long) {
		//        		
		//        		propType = ValueTypeEnum.getEnum(3).toString();
		//        		
		//        		
		//        	} else if (value instanceof Double || value instanceof Float) {
		//        		
		//        		propType = ValueTypeEnum.getEnum(7).toString();
		//        		
		//        	} 
		//        	else if (value instanceof String || value instanceof Character) {
		//        		
		//        		propType = ValueTypeEnum.getEnum(13).toString();
		//        		
		//        	} else if (value instanceof Boolean) {
		//        		
		//        		propType = ValueTypeEnum.getEnum(17).toString();
		//        		
		//        	}
		//    		
		//    	} else {
		//    		
		//    		for (RomeRuleProperty rrp : romeRuleProperties) {
		//    			
		//    			if (rrp.getName().equals(key)) {
		//    				
		//    				propType = ValueTypeEnum.getEnum(rrp.getPropertyType()).toString();
		//    				
		//    				break;
		//    				
		//    			}
		//    			
		//    		}
		//    		
		//    	}

		if (StringUtils.isBlank(propType)) { 		
			return null;    		
		}

		// TODO: Handle DATE and REFERRENCE value types
		property.setPropertyType(propType);

		return property;

	}

	public static List<Property> batchBuildTypeProperties(List<RomeTypeProperty> properties) {

		if (properties == null) {
			return null;
		}

		List<Property> result = new ArrayList<Property>();

		for (RomeTypeProperty property : properties) {
			result.add(build(property));
		}

		return result;

	}

	public static List<Property> batchBuildRuleProperties(List<RomeRuleProperty> properties) {

		if (properties == null) {
			return null;
		}

		List<Property> result = new ArrayList<Property>();

		for (RomeRuleProperty property : properties) {
			result.add(build(property));
		}

		return result;

	}

	public static Property build(String name, Object value) {

		String propType = "";
		// Direct Check 
		if (value instanceof Integer || value instanceof Long) {

			propType = ValueTypeEnum.getEnum(3).toString();


		} else if (value instanceof Double || value instanceof Float) {

			propType = ValueTypeEnum.getEnum(7).toString();

		} 
		else if (value instanceof String || value instanceof Character) {

			propType = ValueTypeEnum.getEnum(13).toString();

		} else if (value instanceof Boolean) {

			propType = ValueTypeEnum.getEnum(17).toString();

		}

		if (StringUtils.isBlank(name) || value == null || StringUtils.isBlank(propType)) {
			return null;
		}

		Property property = new Property();
		property.setName(name);
		property.setPropertyType(propType);
		property.setValue(value);
		return property;
	}

	public Long getLongValue() {
		
		if( this.value == null ) {
			return null;
		}
		
		ValueTypeEnum enumType = this.getPropertyTypeEnum();
		
		if( enumType == ValueTypeEnum.INTEGER || enumType == ValueTypeEnum.CURRENCY ) {
			if (value instanceof Integer || value instanceof Long) {

				try {
					Long l = (Long) value;
					
					return l;
				} catch( ClassCastException ex ) {
					// failed to cast to long, try to cast to Int
				}

				try {
					Integer i = (Integer) value;
					
					Long returnLong = new Long( i );
					
					return returnLong;
				} catch( ClassCastException ex ) {
					// failed to cast to long, try to cast to Int
				}
			}
		}
		return null;
		
	}
	
	public String getStringValue() {
		
		if( this.value == null ) {
			return null;
		}
		
		ValueTypeEnum enumType = this.getPropertyTypeEnum();

		if( enumType == ValueTypeEnum.STRING ) {
			if (value instanceof String ) {

				try {
					String s = (String) value;
					
					return s;
				} catch( ClassCastException ex ) {
					// failed to cast to long, try to cast to Int
				}

			}
		}
		return null;
	}
	
	public void setValueFromDefaultValue() {
		
		try {
			if( this.getPropertyTypeEnum() == ValueTypeEnum.STRING ) {
				this.setValue( this.getDefaultValue() );
			} else if( this.getPropertyTypeEnum() == ValueTypeEnum.INTEGER ) {
				Integer i = Integer.valueOf( this.getDefaultValue() );
				this.setValue( i );
			} else if( this.getPropertyTypeEnum() == ValueTypeEnum.DOUBLE ) {
				
				try {
					Double d = Double.valueOf( this.getDefaultValue() );
					this.setValue( d );	
					return;
				} catch ( NumberFormatException nex ) {
					log.error("Failed to convert this default value [" + this.getDefaultValue() + "]");
				}
				this.setValue( null );
			} else if( this.getPropertyTypeEnum() == ValueTypeEnum.BOOLEAN ) {
				Boolean b = Boolean.valueOf( this.getDefaultValue() );
				this.setValue( b );
			} else if( this.getPropertyTypeEnum() == ValueTypeEnum.DATE ) {
				// YYYY-MM-DD
				
				Date d = RomeDateUtils.formatDateForced( this.getDefaultValue() );

				
				
				
//				Date d = RomeDateUtils.formatDate( this.getDefaultValue() );
				this.setValue( d );
			} else if( this.getPropertyTypeEnum() == ValueTypeEnum.CURRENCY ) {
				// Integer
				Integer i = Integer.valueOf( this.getDefaultValue() );
				this.setValue( i );
			} else {
				this.setValue( this.getDefaultValue() );
			}
		}  catch( Exception ex ) {
			log.error("Failed to parse this into an integer :" +  this.getDefaultValue(), ex );
		}
	}
}
