package com.els.romenext.api.errors;

import java.util.Hashtable;
import java.util.Map;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.google.gson.Gson;

public class ErrorResponse {

	// 	result = TextUtils.getFormattedResultMessage("Failure", "2.2.4", "CHECK_INTEGRITY_AND_DECRYPT_DATA_FAILED.");
	/*
	  	error.put("overallResult",  result);
		error.put("exception#",  exceptionNo);
		error.put("exceptionCode", exceptionCode);
	 */
	private ApiResponseState overallResult;
	private String exceptionNumber;
	private String exceptionCode;
	private String userStoryNumber;
	
	public ErrorResponse( ApiResponseState overallResult, RomeNextResponseCodeEnum responseCode, String userStoryNumber ) {

			this.overallResult = overallResult;
			this.exceptionNumber = responseCode.getErrorCode();
			this.exceptionCode = responseCode.getErrorDesc();
			this.userStoryNumber = userStoryNumber;
	}
	
	// This stop direct creation of the object
	private ErrorResponse() {
	}
	
	public static final ErrorResponse getSuccess() {
		return new ErrorResponse( ApiResponseState.SUCCESS,  RomeNextResponseCodeEnum.SUCCESS, null );
	}
	
	public static final ErrorResponse build( ApiResponseState overallResult, RomeNextResponseCodeEnum responseCode, String userStoryNumber ) {
		return new ErrorResponse( overallResult,  responseCode,  userStoryNumber );
	}
	
	public static final ErrorResponse build( String additionalInfoHeader, Object additionalInfoObj, ApiResponseState overallResult, RomeNextResponseCodeEnum responseCode, String userStoryNumber ) {
		return new ErrorResponse( overallResult,  responseCode,  userStoryNumber );
	}

	public final ResponseBuilder getResponseBuilder() {
		ResponseBuilder responseBuilder = null;
				
		switch(overallResult) {
			case SUCCESS:
				responseBuilder = Response.status(200); // OK
				break;
			case PARTIAL_FAILURE:
			case FAILURE:
			case PARSING_ERROR:
			case VALIDATION_ERROR:
			case MISSING_MANDATORY_DATA:
				responseBuilder = Response.status(400); // Bad Request
				break;
			case TIME_OUT:
				responseBuilder = Response.status(408); // Request Timeout
				break;
			case CORE_INTERNAL_ERROR:
				responseBuilder = Response.status(500); // Internal Server Error
				break;
			case BUSY:
				responseBuilder = Response.status(503); // Service Unavailable
				break;
			default:
				responseBuilder = Response.status(501); // Not Implemented
		}
		if (overallResult != ApiResponseState.SUCCESS) {
			responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(getExceptionBody())).type(MediaType.APPLICATION_JSON);
		}
	
		return responseBuilder.header("result", overallResult);
	}
	
	public final ResponseBuilder getResponseBuilder( String additionalInfoHeader, Object additionalInfoObj ) {
		ResponseBuilder responseBuilder = null;
				
		switch(overallResult) {
			case SUCCESS:
				responseBuilder = Response.status(200); // OK
				break;
			case PARTIAL_FAILURE:
			case FAILURE:
			case PARSING_ERROR:
			case VALIDATION_ERROR:
			case MISSING_MANDATORY_DATA:
				responseBuilder = Response.status(400); // Bad Request
				break;
			case TIME_OUT:
				responseBuilder = Response.status(408); // Request Timeout
				break;
			case CORE_INTERNAL_ERROR:
				responseBuilder = Response.status(500); // Internal Server Error
				break;
			case BUSY:
				responseBuilder = Response.status(503); // Service Unavailable
				break;
			default:
				responseBuilder = Response.status(501); // Not Implemented
		}
		if (overallResult != ApiResponseState.SUCCESS) {
			responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(getExceptionBody( additionalInfoHeader, additionalInfoObj ))).type(MediaType.APPLICATION_JSON);
		}
	
		return responseBuilder.header("result", overallResult);
	}
	
	private Map<String, String> getExceptionBody() {
		Map<String, String> exceptionBody = new Hashtable<String, String>();
		exceptionBody.put("exceptionNumber", exceptionNumber);
		exceptionBody.put("exceptionCode", exceptionCode);
		return exceptionBody;
	}
	
	private Map<String, Object> getExceptionBody( String additionalInfoHeader, Object additionalInfoObj ) {
		Map<String, Object> exceptionBody = new Hashtable<String, Object>();
		exceptionBody.put("exceptionNumber", exceptionNumber);
		exceptionBody.put("exceptionCode", exceptionCode);
		exceptionBody.put( additionalInfoHeader,  additionalInfoObj );
		return exceptionBody;
	}

	public ApiResponseState getOverallResult() {
		return overallResult;
	}

	public String getExceptionNumber() {
		return exceptionNumber;
	}

	public String getExceptionCode() {
		return exceptionCode;
	}

	public String getUserStoryNumber() {
		return userStoryNumber;
	}	
}