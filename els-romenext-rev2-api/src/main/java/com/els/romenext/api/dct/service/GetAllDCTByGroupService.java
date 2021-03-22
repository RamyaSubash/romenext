package com.els.romenext.api.dct.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.dct.req.GetAllDCTByGroupRequest;
import com.els.romenext.api.dct.resp.GetAllDCTByGroupResponse;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.dao.RomeGroupTypeDao;
import com.els.romenext.core.db.dao.log.UserLogDao;
import com.els.romenext.core.db.dao.permission.GroupDao;
import com.els.romenext.core.db.dao.preference.RomePreferenceGroupTypePropertyValueDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.core.db.entity.preference.RomePreferenceGroupTypePropertyValue;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.util.node.NodeBuilder;
import com.els.romenext.core.util.rel.RelationshipBuilder;
import com.google.gson.Gson;

public class GetAllDCTByGroupService {
	
	private static Logger log = Logger.getLogger(GetAllDCTByGroupService.class);
	
	public Response runService( GetAllDCTByGroupRequest req, Long metadataId ) {
		ResponseBuilder responseBuilder;
		
		
		MetadataContainerDao mcDao = new MetadataContainerDao( req.namespace );
		MetadataContainer mc = mcDao.get(metadataId);	
		if (mc == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

		GroupDao gDao = new GroupDao(req.namespace);
		Group g = gDao.findByHostAndName( req.grouphost, req.groupname );
		if (g == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_GROUP_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
//		// sanity check, ensure this type can be modified by this user
//		RomeGroupTypeDao groupTypeDao = new RomeGroupTypeDao( req.namespace );
//		RomeGroupType groupType = groupTypeDao.findByGroupAndType( g,  oldType );
//
//		if( groupType == null ) {
//			// this user does not have access to this type!!
//			log.error("The user does not have access to this type!: " + typeId);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PERMISSION_DENIED, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		
		
		// get types by group
		RomeGroupTypeDao rgtDao = new RomeGroupTypeDao(req.namespace);
		List<RomeGroupType> rgtList = rgtDao.findByGroup(g);
		
//		List<Node> tList = new ArrayList<Node>();
//		List<Long> tIdList = new ArrayList<Long>();
		
		Map<Long, Node> typeFullList = new HashMap<>();
		
//		NodeUtils nodeUtils = new NodeUtils(username);
		NodeBuilder builder = new NodeBuilder( req.namespace );

		// fill in the preferences values if any
		RomePreferenceGroupTypePropertyValueDao prefValueDao = new RomePreferenceGroupTypePropertyValueDao( req.namespace );
		
		
		
//		List<RomeType> rtList = new ArrayList<RomeType>();
		for (RomeGroupType rgt : rgtList) {
			
			if( rgt.getRomeType().getClassificationEnum() == RomeTypeClassificationEnum.DCT ) {
				Node tmpNode = builder.build( rgt.getRomeType() );
				Map<String, Property> prefProps = tmpNode.getPrefProperties();
				List<RomePreferenceGroupTypePropertyValue> prefVals = prefValueDao.findByRomeType( rgt );
				
				for( RomePreferenceGroupTypePropertyValue p : prefVals ) {
					Property property = prefProps.get( p.getRomePreferenceGroupTypeProperty().getId().toString() );
					
					if( property != null ) {
						// found a property, this should awlays happen
						property.setValue( p.getValue() );
						prefProps.put( p.getRomePreferenceGroupTypeProperty().getId().toString(),  property );
					}
					
					
				}
				typeFullList.put( rgt.getRomeType().getId(),  tmpNode );

			}
		}
		
//		// get connections by group
//		RomeConnectionDao rcDao = new RomeConnectionDao(req.namespace);
//		rcDao.getEntityManagerUtil().getSession().clear();
//		
//		List<RomeConnection> rcList = rcDao.getAll();
//		List<Relationship> cList = new ArrayList<Relationship>();
//		for (RomeConnection rc : rcList) {
//			
//			if( typeFullList.containsKey( rc.getStartRomeType().getId() ) && typeFullList.containsKey( rc.getEndRomeType().getId() ) ) {
//				cList.add(RelationshipBuilder.build(rc));
//			}
////			if (tIdList.contains(rc.getStartRomeType().getId()) && tIdList.contains(rc.getEndRomeType().getId())) {
////				cList.add(RelationshipBuilder.build(rc));
////			} 
//		}
		

		
		
		
		
		GetAllDCTByGroupResponse response = new GetAllDCTByGroupResponse();
		response.dcts = typeFullList.values();
//		response.build( typeFullList.values(), cList);
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(response)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
	}
	

}
