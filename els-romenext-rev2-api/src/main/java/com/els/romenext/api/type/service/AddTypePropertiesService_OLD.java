package com.els.romenext.api.type.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.type.req.AddTypePropertiesRequest_OLD;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.RomeTypePropertyDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeProperty;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.enums.ValueTypeEnum;
import com.els.romenext.core.util.node.NodeBuilder;
import com.els.romenext.core.util.property.RomeTypePropertyUtils;
import com.google.gson.Gson;

public class AddTypePropertiesService_OLD {
	
	private static Logger log = Logger.getLogger(AddTypePropertiesService_OLD.class);

	public Response runService(Long typeId, AddTypePropertiesRequest_OLD req, Long metadataId, String username) {
		
		
		ResponseBuilder responseBuilder;
		
		if (typeId == null || req == null) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
//		UserLogDao dao = new UserLogDao(username);
//		dao.getEntityManagerUtil().getSession().clear();
		
		MetadataContainerDao mcDao = new MetadataContainerDao(username);
		MetadataContainer mc = mcDao.get(metadataId);		
		if (mc == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		RomeTypeDao rtDao = new RomeTypeDao(username);
		RomeType rt = rtDao.get(typeId);
		
		// check if the type exist
		if (rt == null) {
			log.error("Type Not Exists");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		List<RomeTypeProperty> rtpList = new ArrayList<RomeTypeProperty>();
		for (Property p : req.getProperties()) {
			
			Date currentDate = new Date();
			
			RomeTypeProperty rtp = new RomeTypeProperty();
			rtp.setRomeType(rt);
			rtp.setName(p.getName());
			rtp.setPropertyType(RomeTypePropertyUtils.convert(ValueTypeEnum.getEnum(p.getPropertyType())));
			rtp.setMaximumValue(p.getMaxValue());
			rtp.setMinimumValue(p.getMinValue());
			rtp.setIsRequired(p.getIsMandatory());
			rtp.setMustBeUnique(p.getIsUnique());
			rtp.setDefaultValue(p.getDefaultValue());
			rtp.setCreatedDate(currentDate);
			rtp.setModifiedDate(currentDate);
			
			rtpList.add(rtp);
			
		}
		
		RomeTypePropertyDao rtpDao = new RomeTypePropertyDao(username);
		try {
			rtpDao.getTransaction().begin();
			for (RomeTypeProperty rtp : rtpList) {
				rtpDao.insert(rtp);
			}
			rtpDao.getTransaction().commit();
		} catch (Exception e) {
			log.error("Failed to insert RomeTypeProp.", e);
			rtpDao.getTransaction().rollback();
			return null;
		}
		
		RomeType newRt = rtDao.get(typeId);
		
		NodeBuilder builder = new NodeBuilder( username );
		Node type = builder.build(newRt);
		
		if (type == null) {
			log.error("Add TYPE Property Failed");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ADD_TYPE_PROPERTY_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(type)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}
	
}
