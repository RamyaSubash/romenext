package com.els.romenext.api.utils;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.db.neo4j.enums.property.file.ImageCacheMapKeyEnum;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.enums.ValueTypeEnum;
import com.els.romenext.core.util.date.RomeDateUtils;

public class PropertyJSONUtils {

	private static Logger log = Logger.getLogger(PropertyJSONUtils.class);

	public static List<Property> parseProperties(JSONArray jsonProperties, Neo4jPropertyTypeEnum propertyType) {

		
		List<Property> properties = new ArrayList<Property>();

		if (jsonProperties != null) {

			switch (propertyType) {
			case SYSTEM:

				for (int i = 0; i < jsonProperties.length(); i++) {
					JSONObject jsonObject = jsonProperties.getJSONObject(i);
					Property property = PropertyJSONUtils.parseSysPropertyJSONObject(jsonObject);
					if (property != null) {
						properties.add(property);
					} else {
						return null;
					}
				}
				return properties;

			case TYPE:

				for (int i = 0; i < jsonProperties.length(); i++) {
					JSONObject jsonObject = jsonProperties.getJSONObject(i);
					Property property = PropertyJSONUtils.parseTypePropertyJSONObject(jsonObject);
					if (property != null) {
						properties.add(property);
					} else {
						return null;
					}
				}
				return properties;

			case DECORATOR:

				for (int i = 0; i < jsonProperties.length(); i++) {
					JSONObject jsonObject = jsonProperties.getJSONObject(i);
					Property property = PropertyJSONUtils.parseDecoPropertyJSONObject(jsonObject);
					if (property != null) {
						properties.add(property);
					} else {
						return null;
					}
				}
				return properties;

			case RULE:

				for (int i = 0; i < jsonProperties.length(); i++) {
					JSONObject jsonObject = jsonProperties.getJSONObject(i);
					Property property = PropertyJSONUtils.parseRulePropertyJSONObject(jsonObject);
					if (property != null) {
						properties.add(property);
					} else {
						return null;
					}
				}
				return properties;
			case PREFERENCE:

				for (int i = 0; i < jsonProperties.length(); i++) {
					JSONObject jsonObject = jsonProperties.getJSONObject(i);
					Property property = PropertyJSONUtils.parseRulePropertyJSONObject(jsonObject);
					if (property != null) {
						properties.add(property);
					} else {
						return null;
					}
				}
				return properties;	
			default:
				return null;
			}

		} else {
			return null;
		}

	}

	public static Object parsePropertyValue(JSONObject jsonProperty, String propertyType) {

		if (jsonProperty == null || StringUtils.isBlank(propertyType)) {
			return null;
		}

		Object value = jsonProperty.get("value");
		if (value.toString().equals("undefined")) {
			return null;
		}
		
		// parse the property
		ValueTypeEnum type = ValueTypeEnum.valueOf( propertyType );
		
		if( type == null ) {
			return null;
		}
		
		return PropertyJSONUtils.parsePropertyValue( jsonProperty,  type );
	}
	
	public static Object parsePropertyValue(JSONObject jsonProperty, ValueTypeEnum propertyType) {

		if (jsonProperty == null || propertyType == null ) {
			return null;
		}

		Object value = jsonProperty.get("value");
		if (value.toString().equals("undefined")) {
			return null;
		}

		if (propertyType == ValueTypeEnum.INTEGER ) {

			try {
				value = Integer.valueOf(value.toString());
			} catch (Exception e) {
				log.error("Illegal Integer Format");
				return null;
			}

		} else if (propertyType == ValueTypeEnum.BOOLEAN  ) {

			try {
				value = Boolean.valueOf(value.toString());
			} catch (Exception e) {
				log.error("Illegal Boolean Format");
				return null;
			}

		} else if (propertyType == ValueTypeEnum.STRING ) {
			value = value.toString();
		} else if (propertyType == ValueTypeEnum.DOUBLE ) {

			try {
				value = Double.valueOf(value.toString());
			} catch (Exception e) {
				log.error("Illegal Double Format");
				return null;
			}

		} else if (propertyType == ValueTypeEnum.DATE ) {

			String doubleCheck = value.toString();
			
			try {
				value = RomeDateUtils.formatDateForced(value.toString());
			} catch (Exception e) {
				log.error("Illegal Date Format");
			}
			
//			try {
//				value = RomeDateUtils.formatDate(value.toString());
//			} catch (Exception e) {
//				log.error("Illegal Date Format");
//			}
//			
//			if( value == null ) {
//				// before we fail, try to parse the optional dates
//				value = RomeDateUtils.formatDate_optional1(doubleCheck );
//				
//				if( value == null ) {
//					log.error("Failed to parse the date with optional date format : " + doubleCheck );
//					return null;
//				}
//			}


		} else if (propertyType == ValueTypeEnum.FILE ) {

			Map<String, Object> tmpMap = new HashMap<String, Object>();
			JSONObject jsonValue = (JSONObject) value;

			Object file = null;
			try {
				byte[] tmpByteArray = Base64.decodeBase64(jsonValue.getString(ImageCacheMapKeyEnum.FILE.getValueType()));
				file = tmpByteArray;
			} catch (Exception e) {
				log.error("Illegal Base 64 Format");
				return null;
			}

			tmpMap.put(ImageCacheMapKeyEnum.FILENAME.getValueType(), jsonValue.getString(ImageCacheMapKeyEnum.FILENAME.getValueType()));
			tmpMap.put(ImageCacheMapKeyEnum.FILE.getValueType(), file);
			value = tmpMap;

		} else if (propertyType == ValueTypeEnum.CURRENCY ) {

			try {

				Double doubleCurrencyValue = Double.valueOf(value.toString());
				if (doubleCurrencyValue != null && doubleCurrencyValue >= 0) {
					value = (int)(doubleCurrencyValue * 100);
				} else {
					log.error("Illegal Currency Format");
					return null;
				}

			} catch (Exception e) {
				log.error("Illegal Currency Format");
				return null;
			}

		} else if (propertyType == ValueTypeEnum.REFERENCE ) {
			// TODO: what is reference?
		} else {
			log.error("Illegal Value Type");
		}

		return value;
	}

	public static Property parseRulePropertyJSONObject(JSONObject json) {

		if (json == null) {
			return null;
		}

		String id = null;
		String propertyType = null;
		if (json.has("propertyId")) {
			id = json.getString("propertyId");
		}
		if (json.has("propertyType")) {
			propertyType = json.getString("propertyType");
		}

		Object value = parsePropertyValue(json, propertyType);

		/**
		 * If the id == null AND the propertytype == null AND the value == null....
		 * 
		 * this doesn't exist?
		 */

		//		if( id == null && propertyType == null && value == null ) {
		//			return null;
		//		}

		return Property.buildNodeProperty(id, propertyType, value);

	}

	public static Property parseSysPropertyJSONObject(JSONObject json) {

		if (json == null) {
			return null;
		}

		String propertyName = null;
		String propertyType = null;


		// note: we have issues where sometimes we use propertyName and sometimes we just use name
		if (json.has("propertyName")) {
			propertyName = json.getString("propertyName");
		} else if( json.has("name") ) {
			propertyName = json.getString("name");
		}


		if (json.has("propertyType")) {
			propertyType = json.getString("propertyType");
		}

		Object value = parsePropertyValue(json, propertyType);

		Property build = Property.build(propertyName, propertyType, null, null, value, null, null, null, null);
		build.setId( propertyName );

		return build;

	}

	public static Property parsePreferencePropertyJSONObject(JSONObject json) {

		if (json == null) {
			return null;
		}

		String propertyName = null;
		String propertyType = null;


		// note: we have issues where sometimes we use propertyName and sometimes we just use name
		if (json.has("propertyName")) {
			propertyName = json.getString("propertyName");
		} else if( json.has("name") ) {
			propertyName = json.getString("name");
		}


		if (json.has("propertyType")) {
			propertyType = json.getString("propertyType");
		}

		//		String value = null;
		//		if( json.has("value")) {
		//			value = json.getString( "value" );
		//		}

		Object value = parsePropertyValue(json, propertyType);

		return Property.build(propertyName, propertyType, null, null, value, null, null, null, null);

	}

	public static Property parseDecoPropertyJSONObject(JSONObject json) {

		if (json == null) {
			return null;
		}

		Long propId = null;
		String decoPropId = null;

		/**
		 * This sucks, but the original only checked for propertyId
		 * but we are now mapping this to a clean Property.java
		 * We now do a few sanity checks
		 */
		if (json.has("propertyId")) {
			String propId_str = json.getString("propertyId");
			propId = Long.valueOf( propId_str );
		} else if( json.has("id") ) {

			boolean foundStringId = false;
			try {
				String propId_str = json.getString("id");
				propId = Long.valueOf( propId_str );
				foundStringId = true;
			} catch( JSONException ex ) {
				//ignore this, probably because it's not a string
			}

			if( !foundStringId ) {
				// try to find this in long format
				try {
					propId = json.getLong("id");
				} catch( JSONException ex ) {
					//ignore this, probably because it's not a string
				}
			}
		}

		if( propId == null ) {
			log.error("Could not find a valid property id " );
			return null;
		}

		//		if (json.has("romeDecoPropId")) {
		//			decoPropId = json.getString("romeDecoPropId");
		//		}

		//		String id = null;
		//		if ( StringUtils.isNotBlank(propId) && StringUtils.isNotBlank(decoPropId) && !propId.equals(decoPropId)) {
		//			log.error("Wrong Data");
		//			return null;
		//		} else {
		//			if (StringUtils.isNotBlank(propId)) {
		//				id = propId;
		//			} else {
		//				if (StringUtils.isNotBlank(decoPropId)) {
		//					id = decoPropId;
		//				} else {
		//					log.error("Wrong Data");
		//					return null;
		//				}
		//			}
		//		}

		String propertyType = null;
		if (json.has("propertyType")) {
			propertyType = json.getString("propertyType");
		}

		Object value = parsePropertyValue(json, propertyType);



		Property property = Property.build(null, propertyType, value, propId );
		property.setId( propId.toString());

		// parse the name as well if found
		if( json.has("name")) {
			property.setName( json.getString("name"));
		}


		return property;

	}

	public static Property parseTypePropertyJSONObject(JSONObject json) {

		if (json == null) {
			return null;
		}

		String id = null;
		String propertyType = null;

		/**
		 * Note: We originally had a propertyId only but we really should only have 1 id here, either propertyId or just id.
		 * 
		 * SO if we don't have a propertyID, try to parse the id then
		 * 
		 */
		if (json.has("propertyId")) {
			id = json.getString("propertyId");
		} else if( json.has("id") ) {

			boolean foundStringId = false;
			try {
				id = json.getString("id");
				//				propId = Long.valueOf( propId_str );
				foundStringId = true;
			} catch( JSONException ex ) {
				//ignore this, probably because it's not a string
			}

			if( !foundStringId ) {
				// try to find this in long format
				try {
					Long propIdtmp = json.getLong("id");
					id = propIdtmp.toString();
				} catch( JSONException ex ) {
					//ignore this, probably because it's not a string
				}
			}
		}

		if (json.has("propertyType")) {
			propertyType = json.getString("propertyType");
		}

		Object value = null;
		if(json.has("value")) {
			value = parsePropertyValue(json, propertyType);
		}


		String name = null;
		if( json.has("name")) {
			name = json.getString("name");
		}

		String maxValue = null;
		if( json.has("maxValue")) {
			maxValue = json.getString("maxValue");
		}

		String minValue = null;
		if( json.has("minValue") ) {
			minValue = json.getString("minValue");
		}

		String defaultValue = null;
		if( json.has("defaultValue")) {
			defaultValue = json.getString("defaultValue");
		}

		Boolean isMandatory = null;
		if( json.has("isMandatory")) {
			isMandatory = json.getBoolean("isMandatory");
		}

		Boolean isUnique = null;
		if( json.has("isUnique")) {
			isUnique = json.getBoolean("isUnique");
		}



		Property build = Property.build(name, propertyType, maxValue, minValue, value, defaultValue, null, isMandatory, isUnique);
		build.setId( id );

		return build;

		//		return Property.buildNodeProperty(id, propertyType, value);

	}

	public static Property parseJSONObject(JSONObject json) {

		if (json == null) {
			return null;
		}

		String name = null;
		if (json.has("name")) {
			name = json.getString("name");
		}

		String propertyType = null;
		if (json.has("propertyType")) {
			propertyType = json.getString("propertyType");
		}

		String maxValue = null;
		if (json.has("maxValue")) {
			maxValue = json.getString("maxValue");
		}

		String minValue = null;
		if (json.has("minValue")) {
			minValue = json.getString("minValue");
		}

		String defaultValue = null;
		if (json.has("defaultValue")) {
			defaultValue = json.getString("defaultValue");
		}

		List<String> validValues = null;
		if (json.has("validValues")) {
			validValues = findValidValues(json.getJSONArray("validValues"));
		}

		Boolean isMandatary = null;
		if (json.has("isMandatory")) {
			isMandatary = json.getBoolean("isMandatory");
		}

		Boolean isUnique = null;
		if (json.has("isUnique")) {
			isUnique = json.getBoolean("isUnique");
		}

		//TODO: validValues need updated
		Property build = Property.build(name, propertyType, maxValue, minValue, null, defaultValue, validValues, isMandatary, isUnique);

		// if an id is found we set that too
		if( json.has("id") ) {

			//			try {
			//				json.getString("id");
			//			} catch( JSONException e ) {
			//				// might be because it's a long?
			//			}

			build.setId( json.getString("id" ));
		}
		return build;

	}

	private static List<String> findValidValues(JSONArray jsonArray) {

		if (jsonArray == null) {
			return new ArrayList<String>();
		}

		List<String> result = new ArrayList<String>();
		for (int i = 0; i < jsonArray.length(); i++) {
			result.add(jsonArray.getString(i));
		}
		return result;
	}

	public static Property fixPropertyObjectForJsonResponse(Property property) {

		if (property != null) {

			if (property.getPropertyTypeEnum().getValueType().equals(ValueTypeEnum.FILE.getValueType())) {

				if (property.getValue() instanceof Map<?, ?>) {

					Map<String, Object> tmpMap = (Map<String, Object>) property.getValue();

					if (tmpMap.containsKey(ImageCacheMapKeyEnum.FILE.getValueType())) {

						if (!(tmpMap.get(ImageCacheMapKeyEnum.FILE.getValueType()) instanceof String)) {
							byte[] tmpArray= (byte[]) tmpMap.get(ImageCacheMapKeyEnum.FILE.getValueType());
							String tmyString = Base64.encodeBase64String(tmpArray);
							tmpMap.put(ImageCacheMapKeyEnum.FILE.getValueType(), tmyString);

							property.setValue(tmpMap);
						}

					}

				}

			} else if (property.getPropertyTypeEnum().getValueType().equals(ValueTypeEnum.CURRENCY.getValueType())) {

				if (property.getValue() != null) {
					Integer integerCurrency = Integer.valueOf(property.getValue().toString());
					if (integerCurrency != null) {
						DecimalFormat decim = new DecimalFormat("0.00");
						String doubleCurrency = decim.format(((double) integerCurrency) / 100);
						if (doubleCurrency != null) {
							property.setValue(doubleCurrency);
						}
					}
				}

			} else if (property.getPropertyTypeEnum().getValueType().equals(ValueTypeEnum.DATE.getValueType())) {

				if (property.getValue() != null) {

//					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//					String strDate = sdf.format(property.getValue());
					
					// we now force all dates to go through the RomeDateUtils method.
					String strDate = RomeDateUtils.formatToRomeDate( (Date) property.getValue() );
					if (StringUtils.isNoneBlank(strDate)) {
						property.setValue(strDate);
					}

				}

			}

		}

		return property;

	}

	public static List<Property> fixPropertyObjectListForJsonResponse(List<Property> propertyList) {

		if (CollectionUtils.isNotEmpty(propertyList)) {

			for (Property property : propertyList) {

				property = PropertyJSONUtils.fixPropertyObjectForJsonResponse(property);

			}

		}

		return propertyList;

	}

	public static boolean containsDuplicationPropertyId(List<Property> properties) {

		if (properties == null) {
			return false;
		}

		Set<String> propertyIds = new HashSet<String>();

		for (Property property : properties) {

			if( propertyIds.contains( property.getId() ) ) {
				return true;
			}
			propertyIds.add( property.getId() );

		}

		return false;
	}

}
