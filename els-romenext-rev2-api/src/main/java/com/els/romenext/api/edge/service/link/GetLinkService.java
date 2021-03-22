package com.els.romenext.api.edge.service.link;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.edge.req.link.GetLinkRequest;
import com.els.romenext.api.edge.resp.link.GetLinkResponse;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.RelationshipCoreServices;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.neo4j.node.Neo4jNodeServices;
import com.google.gson.Gson;

public class GetLinkService {
	
	private static Logger log = Logger.getLogger(GetLinkService.class);
	
	private NodeCoreServices nodeCoreServices = null;
	private RelationshipCoreServices relationshipCoreServices = null;
	private Neo4jNodeServices neo4jNodeServices = null;

	public GetLinkService () {

	}
	
	public GetLinkService (NodeCoreServices nodeCoreServices, RelationshipCoreServices relationshipCoreServices,Neo4jNodeServices neo4jNodeServices ) {
		this.nodeCoreServices = nodeCoreServices;
		this.relationshipCoreServices = relationshipCoreServices;
		this.neo4jNodeServices = neo4jNodeServices;

	}
	
	public Response runService( GetLinkRequest req, Long repoId ) {
		
		ResponseBuilder responseBuilder;
		
		if (req == null || repoId == null ) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		MetadataRepoContainerDao mrcDao = new MetadataRepoContainerDao( req.namespace );
		MetadataRepoContainer metadataRepo = mrcDao.get(repoId);
		
		if (metadataRepo == null) {
			log.error("No Metadata Repo Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		CoreServices coreServices = new CoreServices( req.namespace );
		
		// create neo4j server instance connection
		if (this.neo4jNodeServices == null) {
			this.neo4jNodeServices = new Neo4jNodeServices(metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), req.namespace );
		}
		if (this.nodeCoreServices == null) {
			this.nodeCoreServices = new Neo4jCoreServiceFactory().getNodeCoreServices(metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), req.namespace);
		}
		if (this.relationshipCoreServices == null) {
			this.relationshipCoreServices = new Neo4jCoreServiceFactory().getRelationshipCoreServices(metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), req.namespace );
		}
		if (nodeCoreServices == null || relationshipCoreServices == null) {
			log.error("Failed to Create Connection to Neo4j Server Instance!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NEO4J_SERVER_CONNECTION_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
			
		}
		
		/**
		 * While there are a few ways of doing this, we will be doing:
		 * 
		 * 1. Search for both nodes
		 * 2. Search for any edges between those nodes with edge = link
		 * 3. Do a reverse lookup based on the edge
		 * 
		 */
		
		// ensure both nodes exist
		RomeTypeDao typeDao = new RomeTypeDao( req.namespace );
		List<Long> types = req.originNode.getTypes();
		
		RomeType nodeType = typeDao.get( types.get( 0 ) );
		
		// what if there are multiple here? for now assume 1
		Node convert = req.originNode.convert( req.namespace, nodeType );
		
		
		
		List<Node> originNode = this.neo4jNodeServices.getNode(convert, metadataRepo);
		
		if( originNode == null || originNode.size() == 0 ) {
			log.error("Missing Mandatory Data, one of the nodes could not be found," + req.originNode );
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		types = req.destNode.getTypes();
		
		nodeType = typeDao.get( types.get( 0 ) );
		
		// what if there are multiple here? for now assume 1
		convert = req.destNode.convert( req.namespace, nodeType );
		
		
		
		List<Node> destNode = this.neo4jNodeServices.getNode(convert, metadataRepo);
		
		if( destNode == null || destNode.size() == 0 ) {
			log.error("Missing Mandatory Data, one of the nodes could not be found," + req.destNode );
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// if we found both, we search for any links
		Path connection = this.relationshipCoreServices.getConnection_AnyDirection(originNode.get( 0 ), destNode.get( 0 ), metadataRepo);
		
		GetLinkResponse resp = new GetLinkResponse();
		
		if( connection != null && connection.relationships != null ) {
			resp.links = new ArrayList<>();
			
			for( Relationship r : connection.relationships ) {
				if( r.getClassification() != null  ) {
					// parse the classification
					RomeRuleClassificationEnum ruleClass = RomeRuleClassificationEnum.getEnum( r.getClassification() );
					
					if( ruleClass == RomeRuleClassificationEnum.LINK ) {
						resp.links.add( r );
					}
				}
			}
		}
		
		
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( resp )).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
