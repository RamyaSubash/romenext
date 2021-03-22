package com.els.romenext.api.errors;

public enum ApiResponseState {

	SUCCESS( 0 ),
	PARTIAL_FAILURE( 1 ),
	FAILURE( 2 ),
	BUSY( 3 ),
	TIME_OUT( 4 ),
	PARSING_ERROR( 5 ),
	VALIDATION_ERROR( 6 ),
	MISSING_MANDATORY_DATA( 7 ),
	CORE_INTERNAL_ERROR( 8 );
	
	
	private int value;
	
	private ApiResponseState( int value ) {
		this.value = value;
	}
	
	public int getValue() {
		return this.value;
	}
}
