package com.els.romenext.api.workspace.service; 

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.NodeUtils;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.api.utils.payloads.GuiNodeRequestPayload;
import com.els.romenext.api.workspace.req.CreateWorkspaceRequest;
import com.els.romenext.api.workspace.req.UpdateWorkspaceRequest;
import com.els.romenext.api.workspace.resp.CreateWorkspaceResponse;
import com.els.romenext.api.workspace.resp.GetWorkspaceResponse;
import com.els.romenext.api.workspace.util.WorkspaceTypeUtils;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.RomeTypePropertyDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeProperty;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.db.enums.RomeTypePropertyEnum;
import com.els.romenext.core.db.enums.type.TypeRestrictionStatusEnum;
import com.els.romenext.core.entity.flatstyle.Graph;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.neo4j.node.Neo4jNodeServices;
import com.els.romenext.core.neo4j.workspace.Neo4jWorkspaceServices;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;

public class UpdateWorkspaceService {
	
	private static Logger log = Logger.getLogger(UpdateWorkspaceService.class);
	
	private Neo4jNodeServices neo4jNodeServices = null;
	private Neo4jWorkspaceServices workspaceServices = null;
	private NodeCoreServices nodeCoreServices = null;

	public UpdateWorkspaceService () {

	}
	
	public UpdateWorkspaceService (Neo4jNodeServices neo4jNodeServices, Neo4jWorkspaceServices workspaceServices, NodeCoreServices nodeCoreServices ) {
		this.neo4jNodeServices = neo4jNodeServices;
		this.workspaceServices = workspaceServices;
		this.nodeCoreServices = nodeCoreServices;
	}
	
	public Response runService(UpdateWorkspaceRequest req, Long repoId ) {
		
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
		if (this.nodeCoreServices == null) {
			this.nodeCoreServices = new Neo4jCoreServiceFactory().getNodeCoreServices(  mrc.getIp(), mrc.getUsername(), mrc.getPassword(), req.namespace );
		}
		
		if (neo4jNodeServices == null) {
			log.error("Failed to Create Connection to Neo4j Server Instance!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NEO4J_SERVER_CONNECTION_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
			
		}
		
		RomeTypeDao typeDao = new RomeTypeDao( req.namespace );

		
		
		if( req.getNodes() != null && req.getNodes().size() > 0 ) {
			// check to ensure they have a type assigned to them
			for( GuiNodeRequestPayload p : req.getNodes() ) {
				
				
				if( p.getTypes() == null || p.getTypes().size() == 0 ) {
					log.error("Missing Mandatory Data, one of the nodes does not have an assigned type");
					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
					return responseBuilder.build();
				}
				
				List<Long> types = p.getTypes();
				
				RomeType nodeType = typeDao.findById( types.get( 0 ), mrc.getMetadata() );
				
				// what if there are multiple here? for now assume 1
				Node convert = p.convert( req.namespace, nodeType );
				
				// also ensure we can find ALL these nodes
				List<Node> node = this.neo4jNodeServices.getNode( convert, mrc );
				
				if( node == null || node.size() == 0 ) {
					log.error("Missing Mandatory Data, one of the nodes could not be found," + p );
					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
					return responseBuilder.build();
				}
				// also ensure PERMISSIONS here
				
			}
			
			
			
			
		}
		
		
		// attempt to retrieve the curernt WORKSPACE type from metadata
		// if NONE exists, insert one
		
//		
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
		
		
//		
//		Set<String> expected = new HashSet<>(); 
//		expected.add( "name" );
//		expected.add( "usergroup" );
//		expected.add( "backgroundImage" );
//		
//		
//		// for the update, we do a check to see if all th eproperties are there		
//		if( workspaceType.getFields() == null ) {
//			workspaceType.setFields( new ArrayList<>() );;
//		}
//		
//		for( RomeTypeProperty p : workspaceType.getFields() ) {
//			
//			if( expected.contains( p.getName() ) ) {
//				expected.remove( p.getName() );
//			}
//			
//		}
//		
//		List<RomeTypeProperty> toAddTypeProperty = new ArrayList<>();
//		Date currentDate = new Date();
//
//		for( String s : expected ) {
//			
//			if( "name".equalsIgnoreCase( s ) ) {
//				RomeTypeProperty nameProp = new RomeTypeProperty();
//				nameProp.setRomeType( workspaceType );
//				nameProp.setName( "name" );
//				nameProp.setPropertyType( RomeTypePropertyEnum.STRING );
//				nameProp.setMaximumValue( null );
//				nameProp.setMinimumValue( null );
//				nameProp.setIsRequired( true );
//				nameProp.setMustBeUnique( false );
//				nameProp.setDefaultValue( null );
//				nameProp.setCreatedDate(currentDate);
//				nameProp.setModifiedDate(currentDate);
//				
//				toAddTypeProperty.add( nameProp );
//			} else if( "usergroup".equalsIgnoreCase( s ) ) {
//				RomeTypeProperty groupProp = new RomeTypeProperty();
//				groupProp.setRomeType( workspaceType );
//				groupProp.setName( "usergroup" );
//				groupProp.setPropertyType( RomeTypePropertyEnum.STRING );
//				groupProp.setMaximumValue( null );
//				groupProp.setMinimumValue( null );
//				groupProp.setIsRequired( true );
//				groupProp.setMustBeUnique( false );
//				groupProp.setDefaultValue( null );
//				groupProp.setCreatedDate(currentDate);
//				groupProp.setModifiedDate(currentDate);
//				
//				toAddTypeProperty.add( groupProp );
//
//			} else if( "backgroundImage".equalsIgnoreCase( s ) ) {
//				RomeTypeProperty backgroundImage = new RomeTypeProperty();
//				backgroundImage.setRomeType( workspaceType );
//				backgroundImage.setName( "backgroundImage" );
//				backgroundImage.setPropertyType( RomeTypePropertyEnum.FILE );
//				backgroundImage.setMaximumValue( null );
//				backgroundImage.setMinimumValue( null );
//				backgroundImage.setIsRequired( false );
//				backgroundImage.setMustBeUnique( false );
//				backgroundImage.setDefaultValue( null );
//				backgroundImage.setCreatedDate(currentDate);
//				backgroundImage.setModifiedDate(currentDate);
//				
//				toAddTypeProperty.add( backgroundImage );
//
//			}
//			
//			if( toAddTypeProperty != null && toAddTypeProperty.size() > 0 ) {
//				RomeTypePropertyDao rtpDao = new RomeTypePropertyDao( req.namespace );
//				try {
//					rtpDao.getTransaction().begin();
//					
//					for( RomeTypeProperty p : toAddTypeProperty ) {
//						rtpDao.insert( p );							
//					}
//					rtpDao.getTransaction().commit();
//				} catch (Exception e) {
//					log.error("Failed to insert RomeTypeProp.", e);
//					rtpDao.getTransaction().rollback();
//					return null;
//				}
//				
//				typeDao.refresh( workspaceType );
//			}
//		}
		
		
		// attempt to retrieve the current WORKSPACE edges from metadata
		// if NONE exists, insert a new connection
		
		RomeConnectionDao connDao = new RomeConnectionDao( req.namespace );
		RomeRuleDao ruleDao = new RomeRuleDao( req.namespace );
		
		
		RomeRule romeRule = ruleDao.get( 1L );
		
		
		
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
		Graph workspaceNodes = this.workspaceServices.getWorkspaceNodes(finalWorkspaceNode, mrc );
		
		if( workspaceNodes == null ) {
			log.debug("No workspace found");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_UNKNOWN, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		/**
		 * Delete all the current edges from this node
		 */
		this.workspaceServices.deleteWorkspaceNodeLinks(finalWorkspaceNode, mrc);
		
		
		
		// update any changes for the workspace like the name etc
//		this.neo4j updateNodeWithTypeProperties
		
		// note we are going to add the background image here if they pass it to us
		List<Property> toUpdateProperties = new ArrayList<>();
		if( req.getBackgroundImage() != null ) {
			toUpdateProperties = req.getUpdatedProperties();
			toUpdateProperties.add( req.getBackgroundImage() );
		} else {
			toUpdateProperties = req.getUpdatedProperties();
		}
		
		this.nodeCoreServices.updateNodeWithTypeProperties(finalWorkspaceNode, req.getUpdatedProperties(), mrc );
		
		
		// UPDATED: We update here now for the file property!
		
		
		
		// link new nodes
		
		
		
		/**
		 * With WORKSPACES, we need to create:
		 * 
		 * MYSQL: RomeType of WORKSPACE
		 * NEO4J: Create the instance of this workspace with this name, create edges for all NODES that are in side this WORKSPACE
		 */
		 
//		Node workspaceNode = builder.build(workspaceType);
//		
//		// grab the name property
//		List<RomeTypeProperty> fields = workspaceType.getFields();
//		Property nameProperty = null;
//		for( RomeTypeProperty p : fields ) {
//			if( p.getName().equalsIgnoreCase("name") ) {
//				nameProperty = Property.build( p );
//				break;
//			}
//		}
//		
//		if( nameProperty == null ) {
//			// This should never happen
//			log.error("Failed to Find a name proprty for workspaces??");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_UNKNOWN, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		// assign the name
//		workspaceNode.updateTypeProperty( req.getName(), nameProperty );
//		
//		Node createdWorkspaceNode = this.workspaceServices.createWorkspaceNode(workspaceNode, mrc);
//		
//		if ( createdWorkspaceNode == null) {
//			log.error("Failed to Create a Workspace!!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_CREATION_FAILURE, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		
		// if nodes were sent, we connect all those nodes to the given workspace
		if( req.getNodes() != null && req.getNodes().size() > 0 ) {
			
			List<Node> toAddNodes = new ArrayList<>();
			for( GuiNodeRequestPayload toAdd : req.getNodes() ) {
				// find the node type
				List<Long> types = toAdd.getTypes();
				
				RomeType nodeType = typeDao.findById( types.get( 0 ), mrc.getMetadata() );
				
				// what if there are multiple here? for now assume 1
				Node convert = toAdd.convert( req.namespace, nodeType );
				
				toAddNodes.add( convert );
			}
			
			
			this.workspaceServices.addNodesToWorkspaceNode(finalWorkspaceNode, toAddNodes, mrc);
			
		}
		
		
		
		
		GetWorkspaceResponse resp = new GetWorkspaceResponse();

//		CreateWorkspaceResponse resp = new CreateWorkspaceResponse();
		
//		resp.setWorkspace( NodeUtils.fixNodeObjectForJsonResponse(createdWorkspaceNode)  );;
		
		
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( resp )).type(MediaType.APPLICATION_JSON);
		
		
		return responseBuilder.build();
		
	}

}
