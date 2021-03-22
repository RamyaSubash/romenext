package com.els.romenext.api.permission.group;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.permission.group.service.GetGroupService;
import com.els.romenext.api.rule.service.GetAllRulesByGroupService;
import com.els.romenext.api.type.Type;

@Path("/group")
public class Group {
	
	private static Logger log = Logger.getLogger(Type.class);
		
	
	
	
	
	@Deprecated
	@GET
	@Path("/host/{host}/name/{groupName}/username/{username}")
	@Produces("application/json")
	public Response getGroup(@PathParam("host") String host, 
							 @PathParam("groupName") String groupName,
							 @PathParam("username") String username ) {
		
		ResponseBuilder responseBuilder;
	
		if (StringUtils.isAnyEmpty(host, groupName )) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetGroupService service = new GetGroupService();
		return service.runService(host, groupName, username );
	}
	 
	@POST
	@Path("/get/groups")
	@Produces("application/json")
	@Consumes("application/json")
	public Response getGroupRev2(  String jsonString) {
		
		ResponseBuilder responseBuilder;
	
		if (StringUtils.isAnyEmpty( jsonString )) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		  
		
//		Long idNum = null;
//		try {
//			idNum = Long.valueOf(metadataId);
//		} catch (Exception e) {
//			log.error("Invalid Number Format!", e);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		
		
		GroupRequest request = new GroupRequest();
		
		JSONObject json = null;	
		try {
			json = new JSONObject(jsonString);
			System.out.println("GroupRequest is :");
			System.out.println(json);
		} catch (JSONException e) {
			log.error("Bad JSON Format!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
        String empty = request.validateRequest(json);
		if(!StringUtils.isEmpty(empty)) {
			log.debug("This is missing: " + empty);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		try {
			request.parseRequest(json);
		} catch (JSONException e) {
			log.error("Bad JSON Format!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		 
		GetGroupService service = new GetGroupService();
		return service.runService( request ); 
	}
	
}
