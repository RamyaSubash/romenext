package com.els.romenext.api.workspace.service; 

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
import com.els.romenext.api.type.req.GetTypeByGroupRequest;
import com.els.romenext.api.type.resp.GetTypeByGroupResponse;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.api.workspace.req.GetWorkspaceTypeRequest;
import com.els.romenext.api.workspace.resp.GetWorkspaceTypeResponse;
import com.els.romenext.api.workspace.util.WorkspaceTypeUtils;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeGroupTypeDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.RomeTypePropertyDao;
import com.els.romenext.core.db.dao.permission.GroupDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeProperty;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.db.enums.RomeTypePropertyEnum;
import com.els.romenext.core.db.enums.type.TypeRestrictionStatusEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.util.node.NodeBuilder;
import com.els.romenext.core.util.node.NodeUtils;
import com.google.gson.Gson;

public class GetWorkspaceTypeService {

	private static Logger log = Logger.getLogger(GetWorkspaceTypeService.class);

	public Response runService( GetWorkspaceTypeRequest req, Long metadataId ) {

		ResponseBuilder responseBuilder; 


		MetadataContainerDao mcDao = new MetadataContainerDao( req.namespace );
		MetadataContainer mc = mcDao.get(metadataId);	
		if (mc == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

		/**
		 * Shouldn't ALL accoounts have access to the workspace type??
		 */
		
//		GroupDao gDao = new GroupDao( req.namespace );
//		Group g = gDao.findByHostAndName( req.grouphost, req.groupname );
//
//		RomeGroupTypeDao rgtDao = new RomeGroupTypeDao( req.namespace );
//		List<RomeGroupType> rgtList = rgtDao.findByGroup(g);
//
//		List<RomeType> rtList = new ArrayList<RomeType>();
//		for (RomeGroupType rgt : rgtList) {
//
//			// if this is the type searching, return it
//
//			if( rgt.getRomeType().getId() == typeid ) {
//
//				NodeUtils nodeUtils = new NodeUtils(username);
//				NodeBuilder builder = new NodeBuilder( username );
//
//				Node node = builder.build(rgt.getRomeType() );
//
//
//				GetTypeByGroupResponse response = new GetTypeByGroupResponse();
//				response.build( node );
//
//				responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
//				responseBuilder.entity(new Gson().toJson(response)).type(MediaType.APPLICATION_JSON);
//				return responseBuilder.build();
//			}
//		}

		
//		RomeTypeDao typeDao = new RomeTypeDao( req.namespace );
//		
//		RomeType workspace = typeDao.findInternalTypeByName( "_WORKSPACE" );
//		
//		if( workspace == null ) {  
//			workspace = new RomeType();
//
//			workspace.setClassification( RomeTypeClassificationEnum.WORKSPACE );
//			workspace.setCreatedDate( new Date() );
//			workspace.setIsInternal( true );
//			workspace.setIsRootType( true );
//			workspace.setMetadata( mc );
//			workspace.setModifiedDate( new Date() );
//			workspace.setName( "_WORKSPACE" );
//			workspace.setRestrictionStatus( TypeRestrictionStatusEnum.ROOTONLY );
//
//			typeDao.getTransaction().begin();
//			typeDao.insert( workspace );
//			typeDao.getTransaction().commit();
//
//			typeDao.refresh( workspace ); 
//			
//
//			
//		}
		
		WorkspaceTypeUtils utils = new WorkspaceTypeUtils( req.namespace );
		RomeType workspace = utils.addMissingWorkspaceType(mc);
		workspace = utils.addMissingProperties(workspace);
		

		GetWorkspaceTypeResponse response = new GetWorkspaceTypeResponse();
		NodeBuilder builder = new NodeBuilder( req.namespace );

		response.workspaceType = builder.build( workspace );

		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(response)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
	}


}
