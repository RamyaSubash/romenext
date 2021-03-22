package com.els.romenext.api.node.service;
 

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.node.req.GetAllNodesAndEdgesByGroupRequest;
import com.els.romenext.api.node.req.GetFromTypeRequest;
import com.els.romenext.api.node.resp.GetAllNodesAndEdgesResponse;
import com.els.romenext.api.node.resp.GetFromTypeResponse;
import com.els.romenext.api.utils.EdgeUtils;
import com.els.romenext.api.utils.NodeUtils;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.RelationshipCoreServices;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.util.date.RomeDateUtils;
import com.els.romenext.core.util.node.NodeBuilder;
import com.els.romenext.core.util.rel.RelationshipBuilder;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class GetFromTypeService {
	
	private static Logger log = Logger.getLogger(GetFromTypeService.class);
	
	private NodeCoreServices nodeCoreServices = null;
	private RelationshipCoreServices relationshipCoreServices = null;
	 
	public GetFromTypeService() {
		
	}
	
	public GetFromTypeService (NodeCoreServices nodeCoreServices, RelationshipCoreServices relationshipCoreServices) {
		this.nodeCoreServices = nodeCoreServices;
		this.relationshipCoreServices = relationshipCoreServices;
	}
	
	
	public Response runService(GetFromTypeRequest req, Long metadata ) {
		
		ResponseBuilder responseBuilder;
		if (req == null || metadata == null) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// find metadata repo
		MetadataRepoContainerDao mrcDao = new MetadataRepoContainerDao( req.namespace );
		MetadataRepoContainer metadataRepo = mrcDao.get(metadata);
//		MetadataServices metadataServices = new MetadataServices(); 
//		MetadataRepoContainer metadataRepo = metadataServices.getMetadataRepoContainerById(metadata);
		if (metadataRepo == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		CoreServices coreServices = new CoreServices( req.namespace );
		
		// create neo4j server instance connection
		if (this.nodeCoreServices == null) {
			this.nodeCoreServices = new Neo4jCoreServiceFactory().getNodeCoreServices(metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(),  req.namespace );
		}
		if (this.relationshipCoreServices == null) {
			this.relationshipCoreServices = new Neo4jCoreServiceFactory().getRelationshipCoreServices(metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(),  req.namespace );
		}
//		NodeCoreServices nodeCoreServices = new Neo4jCoreServiceFactory().getNodeCoreServices(metadataRepo.getNeo4jInstance());
//		RelationshipCoreServices relationshipCoreServices = new Neo4jCoreServiceFactory().getRelationshipCoreServices(metadataRepo.getNeo4jInstance());
		if (nodeCoreServices == null || relationshipCoreServices == null) {
			log.error("Failed to Create Connection to Neo4j Server Instance!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NEO4J_SERVER_CONNECTION_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
			
		}
				
		List<Node> nodeList = new ArrayList<Node>();
		
		// ensure there is a typeId 
		if( req.getTypeId() == null ) { 
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Node type = coreServices.getTypeById( req.getTypeId() );
		
		if( type == null ) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		// when this get's build by the core services, it actually add's decorator properties and such
		// for now, just remove it
		type.setDecoProperties( new HashMap<String, Property>() );
		
		List<Node> nodes = nodeCoreServices.getNodes( type, metadataRepo);
		
		
		GetFromTypeResponse response = new GetFromTypeResponse();
		response.build(nodes);
		
		 
		
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity( RomeGsonUtils.getDefaultGson().toJson(response)).type(MediaType.APPLICATION_JSON);
		
		return responseBuilder.build();
		
	}

}
