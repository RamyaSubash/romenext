package com.els.romenext.api.edge.service;

import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.edge.req.DeleteEdgeRequest;
import com.els.romenext.api.edge.req.UpdateEdgeInstanceRequest;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.EdgeUtils;
import com.els.romenext.api.utils.NodeUtils;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.api.utils.payloads.GuiEdgeRequestPayload;
import com.els.romenext.api.utils.payloads.GuiNodeRequestPayload;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.RelationshipCoreServices;
import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.metadata.MetadataServices;
import com.els.romenext.core.relationship.RelationshipDeleteCoreService;
import com.els.romenext.core.util.node.NodeBuilder;
import com.els.romenext.core.util.rel.RelationshipBuilder;
import com.els.romenext.core.util.rel.RelationshipPropertyUtil;
import com.google.gson.Gson;

public class DeleteEdgeService {
	
	private static Logger log = Logger.getLogger(DeleteEdgeService.class);
	
	private NodeCoreServices nodeCoreServices = null;
	private RelationshipCoreServices relationshipCoreServices = null;
	
	public DeleteEdgeService () {

	}
	
	public DeleteEdgeService (NodeCoreServices nodeCoreServices, RelationshipCoreServices relationshipCoreServices) {
		this.nodeCoreServices = nodeCoreServices;
		this.relationshipCoreServices = relationshipCoreServices;
	}
	
	public Response runService(DeleteEdgeRequest req, Long metadata) {
		
		ResponseBuilder responseBuilder;
		
		if (req == null) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GuiEdgeRequestPayload connGuiNode = req.getConnection();
		
		if( connGuiNode == null || CollectionUtils.isEmpty( connGuiNode.getConnections() ) ) {
			log.error("Connection Not Exists");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CONNECTION_NOT_EXISTS, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		if( req.getConnection().getOriginNode() == null || req.getConnection().getDestinationNode() == null  ) {
			log.error("Connection Not Exists");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		CoreServices coreServices = new CoreServices( req.namespace );
		MetadataServices metadataServices = new MetadataServices( req.namespace );
		
		
		MetadataRepoContainer metadataRepo = metadataServices.getMetadataRepoContainerById(metadata);
		
		if (metadataRepo == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// create neo4j server instance connection
		if (this.nodeCoreServices == null) {
			this.nodeCoreServices = new Neo4jCoreServiceFactory().getNodeCoreServices(metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), req.namespace );
		}
		if (this.relationshipCoreServices == null) {
			this.relationshipCoreServices = new Neo4jCoreServiceFactory().getRelationshipCoreServices(  metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), req.namespace );
		}
		 
		if (nodeCoreServices == null || relationshipCoreServices == null) {
			log.error("Failed to Create Connection to Neo4j Server Instance!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NEO4J_SERVER_CONNECTION_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
			
		}
		
		
		
		
		List<Long> connIds = connGuiNode.getConnections();
		if( CollectionUtils.isEmpty( connIds ) ) {
			log.error("Connection ids for origin node are missing");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long connId = connIds.get( 0 );
		
		RomeConnectionDao connDao = new RomeConnectionDao( req.namespace );
		
		RomeConnection romeConnection = connDao.get( connId );
		
		if( romeConnection == null ) {
			log.error("Rome Connection are missing");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CONNECTION_NOT_EXISTS, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		
		
		GuiNodeRequestPayload originNodeGui = connGuiNode.getOriginNode();
		
		
		List<Long> orginTypeIds = originNodeGui.getTypes();
		if( CollectionUtils.isEmpty( orginTypeIds ) ) {
			log.error("Type ids for origin node are missing");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long originTypeId = orginTypeIds.get( 0 );
		
		RomeTypeDao typeDao = new RomeTypeDao( req.namespace );
		RomeType originType = typeDao.get( originTypeId );

		
		if( originType == null ) {
			log.error("Origin type or dest type is missing");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		
		
		
		GuiNodeRequestPayload destNodeGui = connGuiNode.getDestinationNode();  
		
		
		List<Long> destTypeIds = destNodeGui.getTypes();
		if( CollectionUtils.isEmpty( destTypeIds ) ) {
			log.error("Type ids for origin node are missing");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long destTypeId = destTypeIds.get( 0 );
		 
		RomeType destType = typeDao.get( destTypeId );
		
		
		if( destType == null ) {
			log.error("Origin type or dest type is missing");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		
		Node originNode = originNodeGui.convert( req.namespace, originType );
		
		if( originNode == null ) {
			log.error("originNode is missing");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DELETE_EDGE_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		Node destNode = destNodeGui.convert( req.namespace, destType );	
		
		if( destNode == null ) {
			log.error("destNode is missing");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DELETE_EDGE_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		// if we get this far, we have both nodes, now confirm the relationship
		Relationship rel = connGuiNode.convert( req.namespace , romeConnection );
		
		if( rel == null ) {
			log.error("rel is missing");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DELETE_EDGE_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		// find the one connection that represents this
		Path sanityCheck = this.relationshipCoreServices.getConnection(rel, originNode, destNode, metadataRepo);
		
		if( sanityCheck == null || sanityCheck.getRelationships() == null ) {
			log.error("Sanity check failed");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DELETE_EDGE_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		if( sanityCheck.getRelationships().size() > 1 ) {
			log.error("Found more than 1 relationship to delete?");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DELETE_EDGE_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		  
		// if we got here, delete it
//		this.relationshipCoreServices.deleteConnectionFrom(originNode, metadataRepo);
		 
		
//		RelationshipDeleteCoreService relDeleteServ = new RelationshipDeleteCoreService(req.namespace,  metadataRepo.getUsername(),  metadataRepo.getPassword());
		RelationshipDeleteCoreService relDeleteServ = new Neo4jCoreServiceFactory().getRelationshipDeleteCoreServices(  metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), req.namespace );

		
		boolean deleteEdge = relDeleteServ.deleteEdge(originNode, destNode, rel, metadataRepo);
		
		
		if ( !deleteEdge ) {
			log.error("Delete Edge Failed");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DELETE_EDGE_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
		} 
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( deleteEdge )).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
