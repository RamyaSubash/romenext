package com.els.romenext.api.type.service;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.type.req.GetTypeByGroupRequest;
import com.els.romenext.api.type.resp.GetTypeByGroupResponse;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeGroupTypeDao;
import com.els.romenext.core.db.dao.permission.GroupDao;
import com.els.romenext.core.db.dao.version.RomeVersionDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.core.db.entity.version.RomeVersion;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.util.node.NodeBuilder;
import com.els.romenext.core.util.node.NodeUtils;
import com.google.gson.Gson;

public class GetTypeByGroupService {
	
	private static Logger log = Logger.getLogger(GetTypeByGroupService.class);
	
	public Response runService( GetTypeByGroupRequest req, Long metadataId ) {
		return this.runService(metadataId, req.grouphost, req.groupname, req.namespace, req.typeId );
	}
	
	public Response runService(Long metadataId, String host, String name, String username, Long typeid ) {
		
		ResponseBuilder responseBuilder;
		
//		UserLogDao dao = new UserLogDao(username);
//		dao.getEntityManagerUtil().getSession().clear();
		
		
		MetadataContainerDao mcDao = new MetadataContainerDao( username );
		MetadataContainer mc = mcDao.get(metadataId);	
		if (mc == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

		GroupDao gDao = new GroupDao(username);
		Group g = gDao.findByHostAndName(host, name);
		
		
		
		RomeGroupTypeDao rgtDao = new RomeGroupTypeDao(username);
		List<RomeGroupType> rgtList = rgtDao.findByGroup(g);
		
		List<RomeType> rtList = new ArrayList<RomeType>();
		for (RomeGroupType rgt : rgtList) {
			
			// if this is the type searching, return it
			
			if( rgt.getRomeType().getId() == typeid ) {
				
				NodeUtils nodeUtils = new NodeUtils(username);
				NodeBuilder builder = new NodeBuilder( username );

				Node node = builder.build(rgt.getRomeType() );
				
				
				GetTypeByGroupResponse response = new GetTypeByGroupResponse();
				response.build( node );
				
				responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
				responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(response)).type(MediaType.APPLICATION_JSON);
				return responseBuilder.build();
			}
		}
		
		
		GetTypeByGroupResponse response = new GetTypeByGroupResponse();

		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(response)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
