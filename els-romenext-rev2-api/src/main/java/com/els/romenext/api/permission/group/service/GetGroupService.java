package com.els.romenext.api.permission.group.service;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.entities.UserGroup;
import com.els.romenext.api.entities.utils.UserGroupUtils;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.db.dao.permission.GroupDao;
import com.els.romenext.core.db.entity.permission.Group;
import com.google.gson.Gson;

public class GetGroupService {
	
	private static Logger log = Logger.getLogger(GetGroupService.class);
	
	
	public Response runService( GroupRequest req ) {
		return this.runService(  req.grouphost, req.groupname, req.namespace );
	}
	
	public Response runService(String host, String groupName, String username ) {
		
		ResponseBuilder responseBuilder;
	
		GroupDao gDao = new GroupDao( username );
		Group g = gDao.findByHostAndName(host, groupName);
		
		UserGroup ug= (new UserGroupUtils()).build(g);
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(ug)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
