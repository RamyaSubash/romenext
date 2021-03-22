package com.els.romenext.api.errors;

public enum RomeNextResponseCodeEnum {
	
	// General Messages
	SUCCESS( "0.0.0", "SUCCESS"),
	ERROR("1.0.0", "ERROR"),
	MISSING_MANDATORY_DATA("1.0.1", "MISSING_MANDATORY_DATA"),
	BAD_JSON_FORMAT("1.0.2", "BAD_JSON_FORMAT"),
	ILLEGAL_PARAMETER("1.0.3", "ILLEGAL_PARAMETER"),
	INVALID_NUMBER_FORMAT("1.0.4", "INVALID_NUMBER_FORMAT"),
	CREATE_NEO4J_SERVER_CONNECTION_FAILED("1.0.5", "CREATE_NEO4J_SERVER_CONNECTION_FAILED"),
	
	// Messages Related to Type
	CREATE_TYPE_FAILED("2.0.1", "CREATE_TYPE_FAILED"),
	DUPLICATE_TYPE("2.0.2", "DUPLICATE_TYPE"),
	ADD_TYPE_PROPERTY_FAILED("2.0.3", "ADD_TYPE_PROPERTY_FAILED"),
	NO_ROOT_TYPE_FOUND("2.0.4", "NO_ROOT_TYPE_FOUND"),
	DUPLICATE_TYPE_PROPERTY("2.0.5", "DUPLICATE_TYPE_PROPERTY"),
	NO_TYPE_FOUND("2.0.6", "NO_TYPE_FOUND"),
	NO_CHILD_TYPE_FOUND("2.0.7", "NO_CHILD_TYPE_FOUND"),
	MULTIPLE_TYPE_FOUND("2.0.8", "MULTIPLE_TYPE_FOUND"),
	
	NO_TYPE_PROPERTY_FOUND("2.0.10", "NO_TYPE_PROPERTY_FOUND"),
	TYPE_PROPERTY_ALREADY_EXISTS("2.0.11", "TYPE_PROPERTY_ALREADY_EXISTS"),
	MULTIPLE_TYPE_PROPERTY_FOUND("2.0.12", "MULTIPLE_TYPE_PROPERTY_FOUND"),
	BAD_TYPE_CLASSIFICATION("2.0.13", "BAD_TYPE_CLASSIFICATION"),
	RETRIEVE_PARENT_TYPE_FAILED("2.0.14", "RETRIEVE_PARENT_TYPE_FAILED"),
	RETRIEVE_ROOT_TYPE_FAILED("2.0.15", "RETRIEVE_ROOT_TYPE_FAILED"),
	RETRIEVE_TYPE_FAILED("2.0.16", "RETRIEVE_TYPE_FAILED"),
	ADD_DECORATOR_TO_TYPE_FAILED("2.0.17", "ADD_DECORATOR_TO_TYPE_FAILED"),
	BAD_TYPE_COORDINATES("2.0.18", "BAD_TYPE_COORDINATES"),
	ADD_DECORATOR_PROPERTY_VALUES_FAILED("2.0.19", "ADD_DECORATOR_PROPERTY_VALUES_FAILED"),
	BAD_TYPE_NAME("2.0.20", "BAD_TYPE_NAME"),
	NO_TYPE_DECORATOR_FOUND("2.0.21", "NO_TYPE_DECORATOR_FOUND"),
	UPATE_TYPE_FAILED("2.0.22", "UPATE_TYPE_FAILED"),
	NO_TYPE_PROPERTIES_TO_ADD("2.0.23", "NO_TYPE_PROPERTIES_TO_ADD"),
	
	// Messages Related to Rule
	CREATE_RULE_FAILED("2.1.1", "CREATE_RULE_FAILED"),
	DUPLICATE_RULE("2.1.2", "DUPLICATE_RULE"),
	ADD_RULE_PROPERTY_FAILED("2.1.3", "ADD_RULE_PROPERTY_FAILED"),
	MULTIPLE_RULE_FOUND("2.1.4", "MULTIPLE_RULE_FOUND"),
	DUPLICATE_RULE_PROPERTY("2.1.5", "DUPLICATE_RULE_PROPERTY"),
	NO_RULE_FOUND("2.1.6", "NO_RULE_FOUND"),
	RULE_ALREADY_EXISTS("2.1.7", "RULE_ALREADY_EXISTS"),
	NO_RULE_PROPERTY_FOUND("2.1.8", "NO_RULE_PROPERTY_FOUND"),
	RULE_PROPERTY_ALREADY_EXISTS("2.1.9", "RULE_PROPERTY_ALREADY_EXISTS"),
	MULTIPLE_RULE_PROPERTY_FOUND("2.1.10", "MULTIPLE_RULE_PROPERTY_FOUND"),
	BAD_RULE_CLASSIFICATION("2.1.11", "BAD_RULE_CLASSIFICATION"),
	ADD_RUlE_PROPERTY_FAILED("2.1.12", "ADD_RUlE_PROPERTY_FAILED"),
	RETRIEVE_RULE_FAILED("2.1.13", "RETRIEVE_RULE_FAILED"),
	BAD_RULE_NAME("2.1.14", "BAD_RULE_NAME"),
	
	// Messages Related to Connection
	CONNECTION_ALREADY_EXSITS("2.2.1", "CONNECTION_ALREADY_EXSITS"),
	CONNECTION_NOT_EXISTS("2.2.2", "CONNECTION_NOT_EXISTS"),
	UPDATE_CONNECTION_FAILED("2.2.3", "UPDATE_CONNECTION_FAILED"),
	RETRIEVE_CONNECTION_FAILED("2.2.4", "RETRIEVE_CONNECTION_FAILED"),
	CREATE_CONNECTION_FAILED("2.2.5", "CREATE_CONNECTION_FAILED"),
	DELETE_CONNECTION_FAILED("2.2.6", "DELETE_CONNECTION_FAILED"),
	CONNNECTION_DELETE_FAILED_EDGE_EXISTS( "2.2.7", "CONNNECTION_DELETE_FAILED_EDGE_EXISTS" ),
	CONNNECTION_DELETE_ATTEMPTED_TO_DELETE_LINK( "2.2.8", "CONNNECTION_DELETE_ATTEMPTED_TO_DELETE_LINK" ),

	BAD_PROPERTY_TYPE("2.3.1", "BAD_PROPERTY_TYPE"),
	
	
	// Messages Related to Node
	CREATE_NODE_FAILED("3.0.1", "CREATE_NODE_FAILED"),
	RETRIEVE_NODE_FAILED("3.0.2", "RETRIEVE_NODE_FAILED"),
	DUPLICATE_NODE_PROPERTY("3.0.3", "DUPLICATE_NODE_PROPERTY"),
	UPDATE_NODE_FAILED("3.0.4", "UPDATE_NODE_FAILED"),
	ASSOCIATE_PART_NODE_FAILED("3.0.5", "ASSOCIATE_PART_NODE_FAILED"),
	NODE_UPDATE_FAILED_NOMATCH("3.0.6", "NODE_UPDATE_FAILED_NOMATCH"),
	NODE_UPDATE_FAILED_NOTHINGTOUPDATE("3.0.7", "NODE_UPDATE_FAILED_NOTHINGTOUPDATE"),
	NODE_GET_FAILED_INCORRECT_TYPE_FORMAT("3.0.8", "NODE_GET_FAILED_INCORRECT_TYPE_FORMAT"),
	NODE_NOT_FOUND("3.0.9", "NODE_NOT_FOUND"),
	NODE_DELETE_TRIED_TO_DELETE_MULTIPLE("3.0.10", "NODE_DELETE_TRIED_TO_DELETE_MULTIPLE"),
	NODE_DELETE_CONNECTION_STILL_FOUND("3.0.10", "NODE_DELETE_CONNECTION_STILL_FOUND"),

	
	// Messages Related to Edge
	CREATE_EDGE_FAILED("3.1.1", "CREATE_EDGE_FAILED"),
	DUPLICATE_EDGE_PROPERTY("3.1.2", "DUPLICATE_EDGE_PROPERTY"),
	UPDATE_EDGE_FAILED("3.1.3", "UPDATE_EDGE_FAILED"),
	GET_EDGE_FAILED("3.1.4", "GET_EDGE_FAILED"),
	DELETE_EDGE_FAILED("3.2.1", "DELETE_EDGE_FAILED"),

	
	// Messages Related to Metadata
	NO_METADATAREPO_FOUND("4.0.1", "NO_METADATAREPO_FOUND"),
	CREATE_METADATAREPO_FAILED("4.0.2", "CREATE_METADATAREPO_FAILED"),
	CREATE_METADATA_FAILED("4.0.3", "CREATE_METADATA_FAILED"),
	NO_METADATA_FOUND("4.0.4", "NO_METADATA_FOUND"),
	CREATE_METADATAREPO_NODE_FAILED("4.0.5", "CREATE_METADATAREPO_NODE_FAILED"),
	
	
	// Messages Related to Decorators

	NO_DECORATOR_FOUND("5.0.1", "NO_DECORATOR_FOUND"),
	DECORATOR_CLASS_UNKNOWN("5.0.2", "DECORATOR_CLASS_UNKNOWN"),
	DECORATOR_INTERNAL_ERROR("5.0.3", "DECORATOR_INTERNAL_ERROR"),

	// Model/Shape response codes
	UPDATE_SHAPE_FAILED("6.0.1", "UPDATE_SHAPE_FAILED"),
	ADD_SHAPE_FAILED("6.0.3", "ADD_SHAPE_FAILED"),
	ADD_MODEL_FAILED("6.0.2", "ADD_MODEL_FAILED"),
	ADD_PROPERTY_FAILED("6.0.4", "ADD_PROPERTY_FAILED"),
	UPDATE_PROPERTY_FAILED("6.0.5", "UPDATE_PROPERTY_FAILED" ),
	ADD_SHAPE_GROUP_FAILED("6.0.6", "ADD_SHAPE_GROUP_FAILED" ),
	UPDATE_SHAPE_GROUP_FAILED("6.0.7", "UPDATE_SHAPE_GROUP_FAILED" ),
	ADD_PART_FAILED( "6.0.8", "ADD_PART_FAILED" ),
	UPDATE_PART_FAILED( "6.0.9", "UPDATE_PART_FAILED" ),
	MODEL_NOT_FOUND( "6.0.10", "MODEL_NOT_FOUND" ),
	PART_NODE_ALREADY_EXISTS("6.0.11", "PART_NODE_ALREADY_EXISTS"),
	PART_NOT_FOUND("6.0.12", "PART_NOT_FOUND"),
	
	CONVERT_MODEL_FAILED("6.0.13", "CONVERT_MODEL_FAILED"),
	GET_PROPERTY_ALL("6.0.14", "GET_PROPERTY_ALL"),
	
	// Model/Shape response codes
	DUPLICATE_NODE("7.0.1", "DUPLICATE_NODE"), 
	
	MISSING_SCRIPT("8.0.1", "MISSING_SCRIPT"),
	
	// Messages Related to Permissions
	PERMISSION_DENIED("9.0.1", "PERMISSION_DENIED"),
	NO_GROUP_FOUND("9.0.2", "NO_GROUP_FOUND"),
	
	PREFERENCE_NO_ID("10.0.1", "PREFERENCE_NO_ID"),
	PREFERENCE_ALREADY_ADDED("10.0.2", "PREFERENCE_ALREADY_ADDED"),
	PREFERENCE_UNKNOWN("10.0.3", "PREFERENCE_UNKNOWN"),
	PREFERENCE_UPDATE_FAILED_NOTHINGTOUPDATE("10.0.4", "PREFERENCE_UPDATE_FAILED_NOTHINGTOUPDATE"),
	PREFERENCE_CREATE_DUPLICATENAME("10.0.5", "PREFERENCE_CREATE_DUPLICATENAME"),

	LOGIN_FAILED( "11.0.1", "LOGIN_FAILED"),
	LOGIN_NOT_LOGGED_IN( "11.0.2", "LOGIN_NOT_LOGGED_IN"),

	PATH_NOT_FOUND( "12.0.1", "PATH_NOT_FOUND"),
	PATH_INVALID_INPUTDATA( "12.0.2", "PATH_INVALID_INPUTDATA"),
	PATH_ASSIGNNODE_FAILED( "12.0.3", "PATH_ASSIGNNODE_FAILED"),

	
	WORKSPACE_CREATION_FAILURE( "13.0.1", "WORKSPACE_CREATION_FAILURE" ),
	WORKSPACE_UNKNOWN( "13.0.2", "WORKSPACE_UNKNOWN" ),
	WORKSPACE_CREATE_UNKNOWN_NODE( "13.0.5", "WORKSPACE_CREATE_UNKNOWN_NODE" ),
	WORKSPACE_CREATE_DUPLICATE_NAME( "13.0.6", "WORKSPACE_CREATE_DUPLICATE_NAME" ),

	WORKSPACE_DELETE_NODE_FAILED( "13.2.1", "WORKSPACE_DELETE_NODE_FAILED" ),
	WORKSPACE_DELETE_NODE_FAILED_FOUND_MULTIPLE_TO_DELETE( "13.2.2", "WORKSPACE_DELETE_NODE_FAILED_FOUND_MULTIPLE_TO_DELETE" ),
	
	WORKSPACE_ADD_NODE_FAILED( "13.1.1", "WORKSPACE_ADD_NODE_FAILED" ),
	WORKSPACE_ADD_NODE_FAILED_FOUND_MULTIPLE_TO_ADD( "13.1.2", "WORKSPACE_ADD_NODE_FAILED_FOUND_MULTIPLE_TO_ADD" ),

	
	LINK_UNKNOWN( "14.0.1", "LINK_UNKNOWN" ),
	LINK_NOTALINK( "14.0.2", "LINK_NOTALINK" ),
	LINK_INVALID_DATA( "14.0.3", "LINK_INVALID_DATA" ),
	LINK_DELETE_ATTEMPTED_TO_DELETE_CONN( "14.0.4", "LINK_DELETE_ATTEMPTED_TO_DELETE_CONN" ),


	DCT_UNKNOWN( "15.0.1", "DCT_UNKNOWN" ),
	DCT_DUPLICATE( "15.0.2", "DCT_DUPLICATE" )

	;
	
	
	private String errorCode;
	private String errorDesc;
	
	private RomeNextResponseCodeEnum( String errorCode, String errorDesc ) {
		this.errorCode = errorCode;
		this.errorDesc = errorDesc;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public String getErrorDesc() {
		return errorDesc;
	}
}