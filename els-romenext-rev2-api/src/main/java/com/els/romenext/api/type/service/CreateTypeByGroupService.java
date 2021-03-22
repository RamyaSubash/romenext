package com.els.romenext.api.type.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.type.req.CreateTypeByGroupRequest;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeGroupTypeDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.RomeTypeDecoratorPropertyValueDao;
import com.els.romenext.core.db.dao.RomeTypeRomeDecoratorDao;
import com.els.romenext.core.db.dao.deco.RomeDecoratorDao;
import com.els.romenext.core.db.dao.permission.GroupDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeDecoratorPropertyValue;
import com.els.romenext.core.db.entity.RomeTypeRomeDecorator;
import com.els.romenext.core.db.entity.deco.RomeDecorator;
import com.els.romenext.core.db.entity.deco.RomeDecoratorProperty;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.db.enums.type.TypeRestrictionStatusEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;

public class CreateTypeByGroupService {

	private static Logger log = Logger.getLogger(CreateTypeByGroupService.class);
		
	public Response runService(CreateTypeByGroupRequest req, Long metadataId ) {
		
		ResponseBuilder responseBuilder;
		
		if (req == null) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
//		UserLogDao dao = new UserLogDao(username);
//		dao.getEntityManagerUtil().getSession().clear();
		
		
		GroupDao gDao = new GroupDao( req.namespace );
		Group g = gDao.findByHostAndName( req.grouphost, req.groupname );
		
		if( g == null ) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_GROUP_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		
		
		MetadataContainerDao mcDao = new MetadataContainerDao( req.namespace  );
		MetadataContainer mc = mcDao.get(metadataId);	
		if (mc == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// verify if the type to be created already exist or not
		RomeTypeDao romeTypeDao = new RomeTypeDao( req.namespace );
		List<RomeType> rtList = romeTypeDao.findByName(req.getTypeName(), mc);
		if (CollectionUtils.isNotEmpty(rtList)) {
			// type to be created already exists 
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DUPLICATE_TYPE, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// type to be created not occupied, so we can create a new one
		
		RomeType newRomeType = new RomeType();
		
		Date currentDate = new Date();
		newRomeType.setCreatedDate(currentDate);
		newRomeType.setModifiedDate(currentDate);
		newRomeType.setName(req.getTypeName());
		newRomeType.setIsRootType(req.getIsRoot());
		newRomeType.setClassification(RomeTypeClassificationEnum.getEnum(req.getClassification()));
		newRomeType.setMetadata(mc);
		if (req.getRestrictionStatus() != null) {
			newRomeType.setRestrictionStatus(TypeRestrictionStatusEnum.valueOf(req.getRestrictionStatus()));
		}
		// TODO: set isInternal from request
		newRomeType.setIsInternal( false );	// default this to false
		// TODO: add properties to the type
//		newRomeType.setFields(fields);
			
		try {
			romeTypeDao.getTransaction().begin();
			romeTypeDao.insert(newRomeType);
			romeTypeDao.getTransaction().commit();
			
			
			romeTypeDao.refresh(newRomeType);
		} catch (Exception e) {
			log.error("Failed to insert RomeType.", e );
			romeTypeDao.getTransaction().rollback();
			
			return null;
		}
	
		
		// TODO: add properties to this type
//		List<Property> propertiesToAdd = req.getProperties();
//		if (!CollectionUtils.isEmpty(propertiesToAdd)) {
//			log.info("Try to Add Properties!");
//			
//			typeCreated = coreServices.addPropertyToTypeNode(RomeNodeClassEnum.TYPE, req.getTypeName(), propertiesToAdd, repo.getMetadata().getId());
//			
//			if (typeCreated == null) {
//				log.error("Failed to Create a New Rome Type!");
//				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ADD_TYPE_PROPERTY_FAILED, null).getResponseBuilder();
//				return responseBuilder.build();
//			}
//		}
			
		// TODO: add decorator from response to the type
		// add default decorator to the type
		RomeDecoratorDao rdDao = new RomeDecoratorDao( req.namespace );
		// TODO: more reliable way to find default decorator
		List<RomeDecorator> rdList = rdDao.findByNameAndGrouping("Logical", "LOGICALGROUP");
		if (rdList.size() < 1) {
			log.error("Default Decorator for Type Not Found!");
		}
		
		RomeTypeRomeDecoratorDao rtrdDao = new RomeTypeRomeDecoratorDao( req.namespace );
		RomeTypeRomeDecorator rtrd = new RomeTypeRomeDecorator();
		rtrd .setRomeType(newRomeType);
		rtrd.setRomeDecorator(rdList.get(0));
		try {
			rtrdDao.getTransaction().begin();
			rtrdDao.save(rtrd);
			rtrdDao.getTransaction().commit();
			
		} catch (Exception e) {
			log.error("Failed to save RomeDecoratorsToRomeType.", e );
			rtrdDao.getTransaction().rollback();
			return null;
		}


		RomeGroupTypeDao romeGroupTypeDao = new RomeGroupTypeDao( req.namespace );
		RomeGroupType rgt = new RomeGroupType();
		
		rgt.setGroup(g);
		rgt.setRomeType(newRomeType);
		
		
		try {
			romeGroupTypeDao.getTransaction().begin();
			romeGroupTypeDao.insert(rgt);
			romeGroupTypeDao.getTransaction().commit();
			romeGroupTypeDao.refresh( rgt );;
			
		} catch (Exception e) {
			log.error("Failed to save RomeDecoratorsToRomeType.", e );
			romeGroupTypeDao.getTransaction().rollback();
			return null;
		}
		
		
		// add decorator Property values
		RomeTypeDecoratorPropertyValueDao rtdpvDao = new RomeTypeDecoratorPropertyValueDao( req.namespace );
		List<RomeTypeDecoratorPropertyValue> rtdpvList = new ArrayList<RomeTypeDecoratorPropertyValue>();
		for (RomeDecoratorProperty rdp : rdList.get(0).getFields()) {
			
			RomeTypeDecoratorPropertyValue rtdpv = new RomeTypeDecoratorPropertyValue();
			
			rtdpv.setRomeGroupType( rgt );
			rtdpv.setRomeDecoratorProperty(rdp);
			rtdpv.setRomeType(newRomeType); 
			rtdpv.setValue(rdp.getDefaultValue());
			
			
			rtdpvList.add(rtdpv);
		}
		try {
			rtdpvDao.getTransaction().begin();
			for (RomeTypeDecoratorPropertyValue rtdpv : rtdpvList) {
//				rtdpvDao.save(rtdpv);
				rtdpvDao.insert( rtdpv );
			}
			rtdpvDao.getTransaction().commit();
		} catch (Exception e) {
			log.error("Failed to save RomeDecoratorsToRomeType.", e );
			rtdpvDao.getTransaction().rollback();
			return null;
		}
		
		
		
		
		// debugging
		RomeType fromSession = romeTypeDao.getFromSession( RomeType.class , newRomeType.getId() );
		
		
	
	
		NodeBuilder builder = new NodeBuilder( req.namespace );

		Node newType = builder.build(newRomeType);
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(newType)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
