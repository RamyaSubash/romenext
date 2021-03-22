package com.els.romenext.api.utils.property;

import org.json.JSONObject;

import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.core.enums.ValueTypeEnum;

public class PropertyValidatorUtils {

	/**
	 * Validates the property in json format
	 * 
	 *  expected payload
	 *  {
				"id": "uuid",
				"name": "uuid",
				"value": "b854b3e2-4c6c-4e2a-a32a-ff1c45246516",
				"propertyType": "STRING"
		}
	 * @param p
	 * @return
	 * 
	 * 
	 * NOTE: This doesnt look right?? Do not use?
	 */
	@Deprecated
	public static String validateProperty( JSONObject payload  ) {


		String empty = RomeJSONUtils.findEmptyJson( payload, "name", "propertyType");
		if (empty != null) {
			return empty;
		}

		// we probably need to converge these validation checks
		String toCheck = payload.getString( "propertyType" );
		if( ValueTypeEnum.getEnum( toCheck) == null ) {
			return "Property propertyType value is unknown[" + toCheck + "]";
		}


		return null;
	}

	public static String validateTraditionalPrpoertyField( JSONObject payload ) {

		String empty = RomeJSONUtils.findEmptyJson( payload,"propertyId", "value", "propertyType" );
		if (empty != null) {
			return empty;
		}

		// we probably need to converge these validation checks
		String toCheck = payload.getString( "propertyType" );
		if( ValueTypeEnum.getEnum( toCheck ) == null ) {
			return "Property propertyType value is unknown[" + toCheck + "]";
		}


		return null; 

	}
}
