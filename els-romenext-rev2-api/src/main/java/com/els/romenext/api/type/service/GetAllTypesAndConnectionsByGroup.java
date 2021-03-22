package com.els.romenext.api.type.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.type.req.GetAllTypesAndConnectionsByGroupRequest;
import com.els.romenext.api.type.resp.GetAllTypesAndConnectionsByGroupResponse;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.dao.RomeGroupTypeDao;
import com.els.romenext.core.db.dao.log.UserLogDao;
import com.els.romenext.core.db.dao.permission.GroupDao;
import com.els.romenext.core.db.dao.preference.RomePreferenceGroupTypePropertyValueDao;
import com.els.romenext.core.db.dao.version.RomeVersionDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.core.db.entity.preference.RomePreferenceGroupTypePropertyValue;
import com.els.romenext.core.db.entity.version.RomeVersion;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.util.node.NodeBuilder;
import com.els.romenext.core.util.rel.RelationshipBuilder;
import com.google.gson.Gson;

/**
 * NOTE: THIS WILL ONLY RETURN TYPES of classification TYPE
 * 
 * @author jplee
 *
 */
public class GetAllTypesAndConnectionsByGroup {
	
	private static Logger log = Logger.getLogger(GetAllTypesAndConnectionsByGroup.class);
	
	public Response runService( GetAllTypesAndConnectionsByGroupRequest req, Long metaId ) {
		return this.runService( metaId, req.grouphost, req.groupname, req.namespace );
	}
	
	/**
	 * DO NOT USE THIS METHOD EXTERNALLY
	 * @param metadataId
	 * @param host
	 * @param name
	 * @param username
	 * @return
	 */
	@Deprecated
	public Response runService(Long metadataId, String host, String name, String username) {
		
		ResponseBuilder responseBuilder;
		
		UserLogDao dao = new UserLogDao(username);
		dao.getEntityManagerUtil().getSession().clear();
		
		MetadataContainerDao mcDao = new MetadataContainerDao( username );
		MetadataContainer mc = mcDao.get(metadataId);	
		if (mc == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

		GroupDao gDao = new GroupDao(username);
		Group g = gDao.findByHostAndName(host, name);
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
		RomeGroupTypeDao rgtDao = new RomeGroupTypeDao(username);
		List<RomeGroupType> rgtList = rgtDao.findByGroup(g);
		
//		List<Node> tList = new ArrayList<Node>();
//		List<Long> tIdList = new ArrayList<Long>();
		
		Map<Long, Node> typeFullList = new HashMap<>();
		
//		NodeUtils nodeUtils = new NodeUtils(username);
		NodeBuilder builder = new NodeBuilder( username );

		// fill in the preferences values if any
		RomePreferenceGroupTypePropertyValueDao prefValueDao = new RomePreferenceGroupTypePropertyValueDao( username );
		
		
		
//		List<RomeType> rtList = new ArrayList<RomeType>();
		for (RomeGroupType rgt : rgtList) {
			
			if( rgt.getRomeType().getClassificationEnum() == RomeTypeClassificationEnum.NODE || rgt.getRomeType().getClassificationEnum() == RomeTypeClassificationEnum.DCT  ) {
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
		
		// get connections by group
		RomeConnectionDao rcDao = new RomeConnectionDao(username);
		rcDao.getEntityManagerUtil().getSession().clear();
		
		List<RomeConnection> rcList = rcDao.getAll();
		List<Relationship> cList = new ArrayList<Relationship>();
		for (RomeConnection rc : rcList) {
			
			if( typeFullList.containsKey( rc.getStartRomeType().getId() ) && typeFullList.containsKey( rc.getEndRomeType().getId() ) ) {
				cList.add(RelationshipBuilder.build(rc));
			}
//			if (tIdList.contains(rc.getStartRomeType().getId()) && tIdList.contains(rc.getEndRomeType().getId())) {
//				cList.add(RelationshipBuilder.build(rc));
//			} 
		}
		

		
		
		
		
		GetAllTypesAndConnectionsByGroupResponse response = new GetAllTypesAndConnectionsByGroupResponse();
		response.build( typeFullList.values(), cList);
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(response)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
