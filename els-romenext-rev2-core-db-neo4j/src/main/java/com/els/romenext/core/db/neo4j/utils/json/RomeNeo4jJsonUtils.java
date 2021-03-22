package com.els.romenext.core.db.neo4j.utils.json;

import java.io.File;
import java.util.Date;
//import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;

import com.els.romenext.core.db.neo4j.cypher.CypherCoreUtils;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;

public class RomeNeo4jJsonUtils {

	/**
	 * There is nothing wrong with this method, but it should ONLY be used to read the json and put it into a property map
	 * @see parseNodeProperties_type
	 * @param jsonProps
	 * @return
	 */
	public static Map<String, Object> parseNodeProperties(JSONObject jsonProps) {

		if (jsonProps == null) {

			return null;

		}

		Map<String, Object> propMap = new HashMap<String, Object>();

		for (String key : jsonProps.keySet()) {

			Object prop = jsonProps.get(key);

			if (prop != null) {

				propMap.put(key, jsonProps.get(key));

			}

		}

		return propMap;

	}

	/**
	 * Attempt to parse the neo4j property passed in
	 * 
	 * @param neo4jPureId	expecting a pure neo4j id ie. tp12, sys_uuid, 
	 * @param value
	 * @return
	 */
	public static Neo4jProperty parseNeo4jProperty( String neo4jPureId, Object value  ) {



		/**
		 * TODO: WOrk here to add the POSTFIX typing information
		 * 
		 * if this has neo4jPureId has a postfix, convert against that INSTEAD of the infer method
		 * 
		 * 
		 * 
		 * 
		 */








		Neo4jProperty p = null;
		Neo4jPropertyEnum foundProperty = null;
		Object finalValue = value;
		String finalNeo4jPureId = neo4jPureId;

		if( CypherCoreUtils.hasPostfixProperty(neo4jPureId ) ) {

			// get the postfix
			String postfixProperty = CypherCoreUtils.getPostfixProperty( neo4jPureId );
			String prefixProperty = CypherCoreUtils.getPrefixProperty( neo4jPureId );

			if( postfixProperty != null ) {

				if( postfixProperty.equals( CypherCoreUtils.NEO4J_POSTFIX_DATEEPOCH ) ) {

					// with an infered date value, we need to conver this epoch time to a date object


					// tp12-date
					// sys

					// try to convert int first
					Long l = null;

					try {
						l = (Long) value;
					} catch( Exception e ) {
						// didn't work 
					}

					if( l == null ) {
						// try long
						Integer i = (Integer) value;
						l = i.longValue();
					}

					if( l == null ) {
						// this did not convert properly?

						return null;
					}

					Date d = new Date( l );

					finalValue = d;
					finalNeo4jPureId = prefixProperty;
					foundProperty = Neo4jPropertyEnum.DATE;

				} else if( postfixProperty.equals( CypherCoreUtils.NEO4J_POSTFIX_FILE ) ) {

					// with an infered file value, we need to load the file


					// try to convert int first
					String filelocation = null;
					try {
						filelocation = (String) value;
					} catch( Exception e ) {
						// didn't work 
					}

					if( filelocation == null ) {
						// this did not convert properly?

						return null;
					}

					File f = new File( filelocation );

					finalValue = f;
					finalNeo4jPureId = prefixProperty;
					foundProperty = Neo4jPropertyEnum.FILE;
				} else if( postfixProperty.equals( CypherCoreUtils.NEO4J_POSTFIX_CURRENCY ) ) {
					// currency is just basically an integer object
					
					Long l = null;

					try {
						l = (Long) value;
					} catch( Exception e ) {
						// didn't work 
					}

					if( l == null ) {
						// try long
						Integer i = (Integer) value;
						l = i.longValue();
					}

					if( l == null ) {
						// this did not convert properly?

						return null;
					}

					finalValue = l;
					finalNeo4jPureId = prefixProperty;
					foundProperty = Neo4jPropertyEnum.CURRENCY;
				}
			}
		} else {
			foundProperty = Neo4jPropertyEnum.inferType( finalValue );

			// note here: if this type is of type string, we need to escape it here

			finalValue = CypherCoreUtils.unescapeIfNeeded(foundProperty, finalValue );
		}



		if( Neo4jPropertyTypeEnum.TYPE.isOf( finalNeo4jPureId ) ) {

			String assumedId = StringUtils.removeStart( finalNeo4jPureId,  Neo4jPropertyTypeEnum.TYPE.getName() );
			p = new Neo4jProperty(assumedId, null, foundProperty, Neo4jPropertyTypeEnum.TYPE, finalValue);

		} else if( Neo4jPropertyTypeEnum.SYSTEM.isOf( finalNeo4jPureId ) ) {

			String assumedId = StringUtils.removeStart( finalNeo4jPureId,  Neo4jPropertyTypeEnum.SYSTEM.getName() );

			// should we do a sanity check here to ensure this is really a system property?
			// TODO: think about this : jpleeApril29/2017
			p = new Neo4jProperty(assumedId, assumedId, foundProperty, Neo4jPropertyTypeEnum.SYSTEM, finalValue);
		} else if( Neo4jPropertyTypeEnum.DECORATOR.isOf( finalNeo4jPureId ) ) {

			String assumedId = StringUtils.removeStart( finalNeo4jPureId,  Neo4jPropertyTypeEnum.DECORATOR.getName() );
			p = new Neo4jProperty(assumedId, null, foundProperty, Neo4jPropertyTypeEnum.DECORATOR, finalValue);



		} else if( Neo4jPropertyTypeEnum.RULE.isOf( finalNeo4jPureId ) ) {

			String assumedId = StringUtils.removeStart( finalNeo4jPureId,  Neo4jPropertyTypeEnum.RULE.getName() );
			p = new Neo4jProperty(assumedId, null, foundProperty, Neo4jPropertyTypeEnum.RULE, finalValue);
		} else {
			System.out.println("Found a non TYPE or SYSTEM property : " + finalNeo4jPureId + ":" + finalValue  );
		}
		return p;


	}
}
