package com.els.romenext.api.connection.service;

import java.util.Date;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.connection.req.UpdateConnectionRequest;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.dao.RomeGroupTypeDao;
import com.els.romenext.core.db.dao.log.UserLogDao;
import com.els.romenext.core.db.dao.permission.GroupDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.util.rel.RelationshipBuilder;
import com.google.gson.Gson;

public class UpdateConnectionService {
	
	private static Logger log = Logger.getLogger(UpdateConnectionService.class);
	
	public Response runService(UpdateConnectionRequest req, Long metadataId) {
		
		ResponseBuilder responseBuilder;
		
		MetadataContainerDao metaDao = new MetadataContainerDao(req.namespace);
		MetadataContainer metaId = metaDao.get(metadataId);
		if (metaId == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

		GroupDao gDao = new GroupDao(req.namespace);
		Group g = gDao.findByHostAndName(req.grouphost, req.groupname);
		if( g == null ) {
			log.error("The GROUP to Updated Not Exist: " + req.getId());
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_GROUP_FOUND, null).getResponseBuilder();
			return responseBuilder.build();		
		}
		
		RomeConnectionDao rcDao = new RomeConnectionDao(req.namespace);
		RomeConnection rc = rcDao.get(req.getId());
		if(rc == null) {
			log.error("The CONNECTION to Updated Not Exist: " + req.getId());
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CONNECTION_NOT_EXISTS, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// sanity check, ensure this connection can be modified by this user
		RomeGroupTypeDao groupTypeDao = new RomeGroupTypeDao(req.namespace);
		RomeGroupType startGroupType = groupTypeDao.findByGroupAndType(g, rc.getStartRomeType());
		RomeGroupType endGroupType = groupTypeDao.findByGroupAndType(g, rc.getEndRomeType());
		if(startGroupType == null || endGroupType == null) {
			// this user does not have access to this connection!!
			log.error("The user does not have access to this connection!: " + rc.getId());
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PERMISSION_DENIED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// now we can update connection
		if (StringUtils.isNotEmpty(req.getName())) {
			rc.setName(req.getName());
		}
		if (req.getMinRel() != null) {
			rc.setMinimum(req.getMinRel());
		}
		if (req.getMaxRel() != null) {
			rc.setMaximum(req.getMaxRel());
		}
		Date currentDate = new Date();
		rc.setModifiedDate(currentDate);

		try {
			rcDao.getTransaction().begin();
			rcDao.save(rc);
			rcDao.getTransaction().commit();
		} catch (Exception e) {
			log.error("Failed to insert RomeConnection.", e );
			rcDao.getTransaction().rollback();
			return null;
		}
		
		rcDao.refresh(rc);
		
		Relationship connection = RelationshipBuilder.build(rc);
		
		if (connection == null) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.UPDATE_CONNECTION_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(connection)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
