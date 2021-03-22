package com.els.romenext.api.workspace.service; 

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.api.workspace.req.DeleteWorkspaceRequest;
import com.els.romenext.api.workspace.resp.GetWorkspaceResponse;
import com.els.romenext.api.workspace.util.WorkspaceTypeUtils;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.RomeTypePropertyDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeProperty;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.db.enums.RomeTypePropertyEnum;
import com.els.romenext.core.db.enums.type.TypeRestrictionStatusEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.neo4j.node.Neo4jNodeServices;
import com.els.romenext.core.neo4j.workspace.Neo4jWorkspaceServices;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;

public class DeleteWorkspaceService {
	
	private static Logger log = Logger.getLogger(DeleteWorkspaceService.class);
	
	private Neo4jNodeServices neo4jNodeServices = null;
	private Neo4jWorkspaceServices workspaceServices = null;
	
	public DeleteWorkspaceService () {

	}
	
	public DeleteWorkspaceService (Neo4jNodeServices neo4jNodeServices, Neo4jWorkspaceServices workspaceServices ) {
		this.neo4jNodeServices = neo4jNodeServices;
		this.workspaceServices = workspaceServices;
	}
	
	public Response runService(DeleteWorkspaceRequest req, Long repoId ) {
		
		ResponseBuilder responseBuilder;
		
		if (req == null || repoId == null  ) {
			log.error("Missing Mandatory Data");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		MetadataRepoContainerDao mrcDao = new MetadataRepoContainerDao( req.namespace );
		MetadataRepoContainer mrc = mrcDao.get(repoId);	
		if (mrc == null) {
			log.error("No Metadata Repo Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		if (this.neo4jNodeServices == null) {
			this.neo4jNodeServices = new Neo4jNodeServices(mrc.getIp(), mrc.getUsername(), mrc.getPassword(), req.namespace );
		}
		if (this.workspaceServices == null) {
			this.workspaceServices = new Neo4jCoreServiceFactory().getWorkspaceServices( mrc.getIp(), mrc.getUsername(), mrc.getPassword(), req.namespace );
		}
		
		if (neo4jNodeServices == null) {
			log.error("Failed to Create Connection to Neo4j Server Instance!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NEO4J_SERVER_CONNECTION_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
			
		}
		
		RomeTypeDao typeDao = new RomeTypeDao( req.namespace );

		
		
		
		// attempt to retrieve the curernt WORKSPACE type from metadata
		// if NONE exists, insert one
		
		
//		/**
//		 * Just a hack for now
//		 */
//		RomeType workspaceType = typeDao.findInternalTypeByName("_WORKSPACE");
//		
//		if( workspaceType == null ) {
//			workspaceType = new RomeType();
//			
//			workspaceType.setClassification( RomeTypeClassificationEnum.WORKSPACE );
//			workspaceType.setCreatedDate( new Date() );
//			workspaceType.setIsInternal( true );
//			workspaceType.setIsRootType( true );
//			workspaceType.setMetadata( mrc.getMetadata() );
//			workspaceType.setModifiedDate( new Date() );
//			workspaceType.setName( "_WORKSPACE" );
//			workspaceType.setRestrictionStatus( TypeRestrictionStatusEnum.ROOTONLY );
//			
//			typeDao.getTransaction().begin();
//			typeDao.insert( workspaceType );
//			typeDao.getTransaction().commit();
//			
//			typeDao.refresh( workspaceType );
//			
//			
//		
//			
//		}
		
		WorkspaceTypeUtils utils = new WorkspaceTypeUtils( req.namespace );
		RomeType workspaceType = utils.addMissingWorkspaceType(mrc.getMetadata());
		workspaceType = utils.addMissingProperties(workspaceType);
		
		
		
		
		// attempt to retrieve the current WORKSPACE edges from metadata
		// if NONE exists, insert a new connection
		 
		RomeRuleDao ruleDao = new RomeRuleDao( req.namespace ); 
		
		
		
		// ensure this workspace even exists!
		
		
		
		
		/**
		 * FIRST DELETE THE OLD ONE
		 */
		// build the workspace node
		NodeBuilder builder = new NodeBuilder( req.namespace );
		
		
		Node oldWorkspace = req.getWorkspaceNode().convert( req.namespace,  workspaceType );
		
		
		
		
		
		Map<String, Property> typeProperties = oldWorkspace.getTypeProperties();
		Collection<Property> nodeTypeProps = null;
		if( typeProperties != null ) {
			nodeTypeProps = typeProperties.values();
		}
		List<Node> nodes = this.neo4jNodeServices.getNodesFromTypesAndSysProperties( workspaceType, nodeTypeProps , oldWorkspace.getSysProperties().values(), mrc );
		
		// this should only be one?
		// but we'll return all of them
		
		
		
		Node finalWorkspaceNode = null;
		if( nodes == null || nodes.size() == 0 ) {
			// if no workspace was found
			log.debug("No workspace found");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_UNKNOWN, null).getResponseBuilder();
			return responseBuilder.build();
			
//			responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
//			responseBuilder.entity(new Gson().toJson( resp )).type(MediaType.APPLICATION_JSON);
//			return responseBuilder.build();
		} else {
			finalWorkspaceNode = nodes.get( 0 );
		}
		
		
		/**
		 * We originally got the nodes here, but now we search and delete all links 
		 */
		
		
		
		
		
		// try to retrieve all nodes that go from here
//		Graph workspaceNodes = this.workspaceServices.getWorkspaceNodes(finalWorkspaceNode, mrc );
//		
//		if( workspaceNodes == null ) {
//			log.debug("No workspace found");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_UNKNOWN, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		this.workspaceServices.deleteWorkspaceNodeLinks(finalWorkspaceNode, mrc);
		
		
		
		
		
		GetWorkspaceResponse resp = new GetWorkspaceResponse();

//		CreateWorkspaceResponse resp = new CreateWorkspaceResponse();
		
//		resp.setWorkspace( NodeUtils.fixNodeObjectForJsonResponse(createdWorkspaceNode)  );;
		
		
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( resp )).type(MediaType.APPLICATION_JSON);
		
		
		return responseBuilder.build();
		
	}

}
