package com.els.romenext.api.workspace.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.NodeUtils;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.api.workspace.req.CreateReferenceWorkspaceRequest;
import com.els.romenext.api.workspace.req.pojo.WorkspaceGuiNodeRequestPayload;
import com.els.romenext.api.workspace.resp.CreateWorkspaceResponse;
import com.els.romenext.api.workspace.util.WorkspaceTypeUtils;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeProperty;
import com.els.romenext.core.entity.flatstyle.Graph;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.neo4j.node.Neo4jNodeServices;
import com.els.romenext.core.neo4j.workspace.Neo4jWorkspaceServices;
import com.els.romenext.core.util.node.NodeBuilder;

public class CreateReferenceWorkspaceService {
	
	private static Logger log = Logger.getLogger(CreateReferenceWorkspaceService.class);
	
	private Neo4jNodeServices neo4jNodeServices = null;
	private Neo4jWorkspaceServices workspaceServices = null;
	
	public CreateReferenceWorkspaceService () {

	}
	
	public CreateReferenceWorkspaceService (Neo4jNodeServices neo4jNodeServices, Neo4jWorkspaceServices workspaceServices ) {
		this.neo4jNodeServices = neo4jNodeServices;
		this.workspaceServices = workspaceServices;
	}
	
	public Response runService(CreateReferenceWorkspaceRequest req, Long repoId ) {
		
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

		
		
		if( req.getNodes() != null && req.getNodes().size() > 0 ) {
			// check to ensure they have a type assigned to them
			for( WorkspaceGuiNodeRequestPayload p : req.getNodes() ) {
				
				
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
					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_CREATE_UNKNOWN_NODE, null).getResponseBuilder();
					return responseBuilder.build();
				}
				// also ensure PERMISSIONS here
				
			}
			
			
			
			
		}
		
		
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
//		
//		if( workspaceType.getFields() == null || workspaceType.getFields().size() == 0 ) {
//			// fields were not initialized
//			
//			// add the name as a property and required
//			Date currentDate = new Date();
//			
//			RomeTypeProperty nameProp = new RomeTypeProperty();
//			nameProp.setRomeType( workspaceType );
//			nameProp.setName( "name" );
//			nameProp.setPropertyType( RomeTypePropertyEnum.STRING );
//			nameProp.setMaximumValue( null );
//			nameProp.setMinimumValue( null );
//			nameProp.setIsRequired( true );
//			nameProp.setMustBeUnique( false );
//			nameProp.setDefaultValue( null );
//			nameProp.setCreatedDate(currentDate);
//			nameProp.setModifiedDate(currentDate);
//			
//			RomeTypeProperty groupProp = new RomeTypeProperty();
//			groupProp.setRomeType( workspaceType );
//			groupProp.setName( "usergroup" );
//			groupProp.setPropertyType( RomeTypePropertyEnum.STRING );
//			groupProp.setMaximumValue( null );
//			groupProp.setMinimumValue( null );
//			groupProp.setIsRequired( true );
//			groupProp.setMustBeUnique( false );
//			groupProp.setDefaultValue( null );
//			groupProp.setCreatedDate(currentDate);
//			groupProp.setModifiedDate(currentDate);
//			
//			
//			RomeTypeProperty backgroundImage = new RomeTypeProperty();
//			backgroundImage.setRomeType( workspaceType );
//			backgroundImage.setName( "backgroundImage" );
//			backgroundImage.setPropertyType( RomeTypePropertyEnum.FILE );
//			backgroundImage.setMaximumValue( null );
//			backgroundImage.setMinimumValue( null );
//			backgroundImage.setIsRequired( false );
//			backgroundImage.setMustBeUnique( false );
//			backgroundImage.setDefaultValue( null );
//			backgroundImage.setCreatedDate(currentDate);
//			backgroundImage.setModifiedDate(currentDate);
//			
//			RomeTypePropertyDao rtpDao = new RomeTypePropertyDao( req.namespace );
//			try {
//				rtpDao.getTransaction().begin();
//				rtpDao.insert(nameProp);
//				rtpDao.insert(groupProp);
//				rtpDao.insert( backgroundImage );
//				rtpDao.getTransaction().commit();
//			} catch (Exception e) {
//				log.error("Failed to insert RomeTypeProp.", e);
//				rtpDao.getTransaction().rollback();
//				return null;
//			}
//			
//			typeDao.refresh( workspaceType );
//			
//		}
		
		// attempt to retrieve the current WORKSPACE edges from metadata
		// if NONE exists, insert a new connection
		
		RomeConnectionDao connDao = new RomeConnectionDao( req.namespace );
		RomeRuleDao ruleDao = new RomeRuleDao( req.namespace );
		
		
		RomeRule romeRule = ruleDao.get( 1L );
		
		
		
		
		
	
		
		/**
		 * With WORKSPACES, we need to create:
		 * 
		 * MYSQL: RomeType of WORKSPACE
		 * NEO4J: Create the instance of this workspace with this name, create edges for all NODES that are in side this WORKSPACE
		 */
		
		// NEO4j version:
		NodeBuilder builder = new NodeBuilder( req.namespace );
		Node workspaceNode = builder.build(workspaceType);

		// grab the name property
		List<RomeTypeProperty> fields = workspaceType.getFields();
		Property nameProperty = null;
		for( RomeTypeProperty p : fields ) {
			if( p.getName().equalsIgnoreCase("name") ) {
				nameProperty = Property.build( p );
				break;
			}
		}
		
		if( nameProperty == null ) {
			// This should never happen
			log.error("Failed to Find a name proprty for workspaces??");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_UNKNOWN, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// assign the name
		workspaceNode.updateTypeProperty( req.getName(), nameProperty );
		
		
		// should we allow workspaces with the same name?
		// TODO: Confirm with Tim if we should allow this?
		/**
		 * For now, disallow workspaces with the same name
		 */
		Graph check = this.workspaceServices.getWorkspaceNodes(workspaceNode, mrc);
		
		if( check != null &&  CollectionUtils.isNotEmpty( check.getNodes() ) ) {
			log.error("Failed to Create a Workspace!!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_CREATE_DUPLICATE_NAME, null).getResponseBuilder();
			return responseBuilder.build();
		}
		 
		Node createdWorkspaceNode = this.workspaceServices.createWorkspaceNode(workspaceNode, mrc);
		
		if ( createdWorkspaceNode == null) {
			log.error("Failed to Create a Workspace!!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_CREATION_FAILURE, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		// if nodes were sent, we connect all those nodes to the given workspace
		if( req.getNodes() != null && req.getNodes().size() > 0 ) {
			
			
			List<Node> toAddNodes = new ArrayList<>();
			Map<String, List<Property>> refProperties = new HashMap<String, List<Property>>();
			
			
			for( WorkspaceGuiNodeRequestPayload toAdd : req.getNodes() ) {
				// find the node type
				List<Long> types = toAdd.getTypes();
				
				RomeType nodeType = typeDao.findById( types.get( 0 ), mrc.getMetadata() );
				
				// what if there are multiple here? for now assume 1
				Node convert = toAdd.convert( req.namespace, nodeType );
				
				toAddNodes.add( convert );
				
				System.out.println("Attempting to apply this id: " + convert.getId() );
				
				refProperties.put( convert.getId(),  toAdd.getReferenceProperties() );
			}
			
			
			
			
			
			
			this.workspaceServices.addNodesToWorkspaceNode(createdWorkspaceNode, toAddNodes, refProperties, mrc);
			
			
			
		}
		
		
		
		
		
		CreateWorkspaceResponse resp = new CreateWorkspaceResponse();
		
		resp.setWorkspace( NodeUtils.fixNodeObjectForJsonResponse(createdWorkspaceNode)  );;
		
		
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( resp )).type(MediaType.APPLICATION_JSON);
		
		
		return responseBuilder.build();
		
	}

}
