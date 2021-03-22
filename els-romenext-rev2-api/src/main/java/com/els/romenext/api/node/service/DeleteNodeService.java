package com.els.romenext.api.node.service; 

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.node.req.DeleteNodeRequest;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.api.utils.payloads.GuiNodeRequestPayload;
import com.els.romenext.api.workspace.util.WorkspaceTypeUtils;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.RelationshipCoreServices;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.metadata.MetadataServices;
import com.els.romenext.core.neo4j.relationship.Neo4jRelationshipServices;
import com.google.gson.Gson;

public class DeleteNodeService {
	
	private static Logger log = Logger.getLogger(DeleteNodeService.class);
	
	private NodeCoreServices nodeCoreServices = null;
	private RelationshipCoreServices relationshipCoreServices = null;
	
	public DeleteNodeService () {

	}
	
	public DeleteNodeService (NodeCoreServices nodeCoreServices, RelationshipCoreServices relationshipCoreServices) {
		this.nodeCoreServices = nodeCoreServices;
		this.relationshipCoreServices = relationshipCoreServices;
	}
	
	public Response runService(DeleteNodeRequest req, Long repoid ) {
		
		ResponseBuilder responseBuilder;
		
		if (req == null) {
			log.error("Missing Mandatory Data");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		CoreServices coreServices = new CoreServices( req.namespace );
		
		MetadataServices metadataServices = new MetadataServices( req.namespace );
		MetadataRepoContainer metadataRepo = metadataServices.getMetadataRepoContainerById(repoid);
		
		if (metadataRepo == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
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

		
		// get a node based on the input
		// grab the type
		GuiNodeRequestPayload deleteGuiNode = req.getNode();
		
		List<Long> types = deleteGuiNode.getTypes();
		
		if( CollectionUtils.isEmpty( types ) ) {
			log.error("No type found for these deleted Node");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		RomeTypeDao typeDao = new RomeTypeDao( req.namespace );
		
		RomeType romeType = typeDao.get( types.get( 0 ) );
		
		if( romeType == null ) {
			log.error("No type found for these deleted Node");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// build the property node
		
		Node convert = deleteGuiNode.convert( req.namespace, romeType );
		
		
		// check to see if we can find this node first
		// sanity check
		List<Node> sanityCheck = nodeCoreServices.getNodes(convert, metadataRepo);
		
		
		if( CollectionUtils.isEmpty( sanityCheck ) ) {
			log.error("No node to delete?");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NODE_NOT_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		if( sanityCheck.size() != 1 ) {
			// do not allow deletion of multiple nodes
			log.error("No node to delete?");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NODE_DELETE_TRIED_TO_DELETE_MULTIPLE, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		Node nodeCheck = sanityCheck.get( 0 );
		
		Path connectionFrom = this.relationshipCoreServices.getConnectionFrom(nodeCheck, metadataRepo);
		
		// preload the workspace node
		WorkspaceTypeUtils workspaceUtils = new WorkspaceTypeUtils( req.namespace );
		RomeType workspaceType = workspaceUtils.getWorkspaceBaseType( metadataRepo.getMetadata() );
		
		List<Relationship> toDeleteWorkspaces = new ArrayList<Relationship>();
		
		if( connectionFrom != null ) {
			
			List<Relationship> check = connectionFrom.getRelationships();
			
			if( !CollectionUtils.isEmpty( check ) && check.size() > 0 ) {

				/**
				 * Note: If any of these relationships are going towards a workspace, we don't care!
				 */
				for( Relationship r : check ) {
					
					Node originNode = r.getOriginNode();
					
					if( originNode.getTypeId() != workspaceType.getId() ) {
						log.error("No node to delete?");
						responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NODE_DELETE_CONNECTION_STILL_FOUND, null).getResponseBuilder();
						return responseBuilder.build();
					} else {
						toDeleteWorkspaces.add( r );
					}
					
				} 
				

				
			}
		}
		
		Path connectionFrom2 = this.relationshipCoreServices.getConnectionTo(nodeCheck, metadataRepo);
		
		if( connectionFrom2 != null ) {
			
			List<Relationship> check = connectionFrom2.getRelationships();
			
			if( !CollectionUtils.isEmpty( check ) && check.size() > 0 ) {
				
				/**
				 * Note: If any of these relationships are going towards a workspace, we don't care!
				 */
				for( Relationship r : check ) {
					
					Node originNode = r.getOriginNode();
					
					if( originNode.getTypeId() != workspaceType.getId() ) {
						log.error("No node to delete?");
						responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NODE_DELETE_CONNECTION_STILL_FOUND, null).getResponseBuilder();
						return responseBuilder.build();
					}  else {
						toDeleteWorkspaces.add( r );
					}
					
				}
				
			}
		}
		 
		Neo4jRelationshipServices relServices = new Neo4jCoreServiceFactory().getRelServices( metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), req.namespace );
		
		
		// when attempt to delete these, we want to delete all the workspace relationships first
		for( Relationship r : toDeleteWorkspaces ) {
			relServices.deleteRelationship(r, metadataRepo);			
		} 
		
		
		boolean deleteStatus = nodeCoreServices.deleteNode(convert, metadataRepo); 
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( deleteStatus )).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build(); 
	}

}
