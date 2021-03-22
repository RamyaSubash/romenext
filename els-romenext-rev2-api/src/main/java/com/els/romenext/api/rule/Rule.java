package com.els.romenext.api.rule;

import javax.ws.rs.Consumes;
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
import com.els.romenext.api.rule.req.GetRuleRequest;
import com.els.romenext.api.rule.req.UpdateRuleRequest;
import com.els.romenext.api.rule.req.link.CreateLinkRequest;
import com.els.romenext.api.rule.req.link.GetAlinkRequest;
import com.els.romenext.api.rule.req.link.GetAllLinksByGroupRequest;
import com.els.romenext.api.rule.req.link.UpdateLinkRequest;
import com.els.romenext.api.rule.req.property.RuleAddPropertyRequest;
import com.els.romenext.api.rule.req.property.RulePropertyUpdateRequest;
import com.els.romenext.api.rule.service.GetAllRulesByGroupService;
import com.els.romenext.api.rule.service.GetRuleService;
import com.els.romenext.api.rule.service.RulePropertyAddService;
import com.els.romenext.api.rule.service.UpdateRuleService;
import com.els.romenext.api.rule.service.link.CreateLinkService;
import com.els.romenext.api.rule.service.link.GetALinkService;
import com.els.romenext.api.rule.service.link.GetAllLinksByGroupService;
import com.els.romenext.api.rule.service.link.UpdateLinkService;
import com.els.romenext.api.rule.service.property.RulePropertyUpdateService;

@Path("/rule")
public class Rule {
	
	private static Logger log = Logger.getLogger(Rule.class);
	
//	@GET
//	@Path("/all/bygroup/metadata/{metadataid}/{groupname}/{grouphost}/{username}")
//	@Produces("application/json")
//	@Deprecated
//	public Response getAllRulesByGroup(@PathParam("metadataid") String metadataId,
//									   @PathParam("groupname") String groupName,
//									   @PathParam("grouphost") String groupHost,
//									   @PathParam("username") String username) {
//		
//		ResponseBuilder responseBuilder;
//		
//		if (StringUtils.isAnyEmpty(metadataId, groupName, groupHost, username)) {
//			log.error("Path Parameter Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		Long idNum = null;
//		try {
//			idNum = Long.valueOf(metadataId);
//		} catch (Exception e) {
//			log.error("Invalid Number Format!", e);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		GetAllRulesByGroupService service = new GetAllRulesByGroupService();
//		return service.runService(idNum, groupName, groupHost, username);
//	
//	}
	
	@POST
	@Path("/get/all/metadata/{metadataid}")
	@Produces("application/json")
	@Consumes("application/json")
	public Response getAllRulesByGroup_rev2(@PathParam("metadataid") String metadataId,
									   String jsonString ) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty(metadataId ) ) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		
		GroupRequest request = new GroupRequest();
		
		JSONObject json = null;	
		try {
			json = new JSONObject(jsonString);
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
		
		
		
		
		GetAllRulesByGroupService service = new GetAllRulesByGroupService();
		return service.runService( request, idNum  );
	
	}
	
	@POST
	@Path("/get/metadata/{metadataid}")
	@Produces("application/json")
	@Consumes("application/json")
	public Response getRuleByGroup_rev2(@PathParam("metadataid") String metadataId,
									   String jsonString ) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty(metadataId ) ) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		
		GetRuleRequest request = new GetRuleRequest();
		
		JSONObject json = null;	
		try {
			json = new JSONObject(jsonString);
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
		
		
		
		
		GetRuleService service = new GetRuleService();
		return service.runService( request, idNum  );
	
	}
	
	@POST
	@Path("/update/metadata/{metadataid}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response updateRuleByGroup(@PathParam("metadataid") String metadataId,
			String jsonString ) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty(metadataId ) ) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		
		UpdateRuleRequest request = new UpdateRuleRequest();
		
		JSONObject json = null;	
		try {
			json = new JSONObject(jsonString);
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
		
		
		
		
		UpdateRuleService service = new UpdateRuleService();
		return service.runService( request, idNum  );
	
	}
	
	@POST
	@Path("/create/link/{metadataid}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response createALink(@PathParam("metadataid") String metadataId,  
											String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty(metadataId )) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		CreateLinkRequest request = new CreateLinkRequest();
		
		JSONObject json = null;	
		try {
			json = new JSONObject(jsonString);
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
		
		CreateLinkService service = new CreateLinkService();
		
		return service.runService(request, idNum );
		
	}
	
	@POST
	@Path("/get/link/{metadataid}")
	@Produces("application/json")
	@Consumes("application/json")
	public Response getALink_rev2( @PathParam("metadataid") String metadataId, 
											String jsonString ) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty(metadataId )) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetAlinkRequest request = new GetAlinkRequest();
		
		JSONObject json = null;	
		try {
			json = new JSONObject(jsonString);
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
		
		GetALinkService service = new GetALinkService();
		
		return service.runService(request, idNum );
		
	} 
	
 
	
	@POST
	@Path("/get/link/all/metadata/{metadataid}/")
	@Produces("application/json")
	@Consumes("application/json")
	public Response getAllLinksByGroup_rev2(@PathParam("metadataid") String metadataId,
									   String jsonString ) {
		
		ResponseBuilder responseBuilder;
		
		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetAllLinksByGroupRequest request = new GetAllLinksByGroupRequest();
		JSONObject json = null;	
		try {
			json = new JSONObject(jsonString);
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

		GetAllLinksByGroupService service = new GetAllLinksByGroupService();
		return service.runService(request, idNum  );
	
	}
	
	@POST
	@Path("/update/link/metadata/{metadataid}/")
	@Produces("application/json")
	@Consumes("application/json")
	public Response updateLinksByGroup(@PathParam("metadataid") String metadataId,
									   String jsonString ) {
		
		ResponseBuilder responseBuilder;
		
		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		UpdateLinkRequest request = new UpdateLinkRequest();
		JSONObject json = null;	
		try {
			json = new JSONObject(jsonString);
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

		UpdateLinkService service = new UpdateLinkService();
		return service.runService(request, idNum  );
	
	}
	
	
	@POST
	@Path("/add/property/metadata/{metadataid}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response addProperty_rev2(@PathParam("metadataid") String metadataId,  
											String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty(metadataId )) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		RuleAddPropertyRequest request = new RuleAddPropertyRequest();
		
 		JSONObject json = null;	
		try {
			json = new JSONObject(jsonString);
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
		System.out.println("after bad json format 3");
		
		RulePropertyAddService service = new RulePropertyAddService();
		
		return service.runService(request, idNum  );
		
	}
	
	@POST
	@Path("/property/update/{metadataid}/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response propertyUpdate(@PathParam("metadataid") String metadataId,
											String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty(metadataId )) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		RulePropertyUpdateRequest request = new RulePropertyUpdateRequest();
		
		JSONObject json = null;	
		try {
			json = new JSONObject(jsonString);
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
		
		RulePropertyUpdateService service = new RulePropertyUpdateService();
		
		return service.runService( request, idNum  );
		
	}

}
