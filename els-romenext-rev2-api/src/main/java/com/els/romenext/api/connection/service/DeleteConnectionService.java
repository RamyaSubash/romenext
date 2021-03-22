package com.els.romenext.api.connection.service;

import java.util.Date;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.connection.req.DeleteConnectionRequest;
import com.els.romenext.api.connection.req.UpdateConnectionRequest;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.RelationshipCoreServices;
import com.els.romenext.core.connection.ConnectionService;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.dao.RomeGroupTypeDao;
import com.els.romenext.core.db.dao.log.UserLogDao;
import com.els.romenext.core.db.dao.permission.GroupDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.neo4j.node.Neo4jNodeServices;
import com.els.romenext.core.neo4j.relationship.Neo4jRelationshipServices;
import com.els.romenext.core.rule.RuleService;
import com.els.romenext.core.util.rel.RelationshipBuilder;
import com.google.gson.Gson;

public class DeleteConnectionService {

	private static Logger log = Logger.getLogger(DeleteConnectionService.class);

	private Neo4jRelationshipServices relServices = null;

	public DeleteConnectionService () {
//		this.nodeCoreServices = new Neo4jCoreServiceFactory().getNodeCoreServices(metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), req.namespace );
//		this.relServices = new Neo4jCoreServiceFactory().getRelServices( metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), req.namespace );
	}

	public DeleteConnectionService ( Neo4jRelationshipServices relServices  ) {
//		this.nodeCoreServices = nodeCoreServices;
		this.relServices = relServices;
//		this.neo4jNodeServices = neo4jNodeServices;

	}

	public Response runService(DeleteConnectionRequest req, Long metadataId) {

		ResponseBuilder responseBuilder;

		MetadataContainerDao metaDao = new MetadataContainerDao(req.namespace);
		MetadataContainer metaId = metaDao.get(metadataId);
		if (metaId == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

		GroupDao gDao = new GroupDao(req.namespace);
		Group g = gDao.findByHostAndName(req.grouphost, req.groupname);
		if( g == null ) {
			log.error("The GROUP to Updated Not Exist: " + metadataId );
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_GROUP_FOUND, null).getResponseBuilder();
			return responseBuilder.build();		
		}

		RomeConnectionDao rcDao = new RomeConnectionDao(req.namespace);
		RomeConnection rc = rcDao.get(req.getConnectionId());
		if(rc == null) {
			log.error("The CONNECTION to Updated Not Exist: " + req.getConnectionId());
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CONNECTION_NOT_EXISTS, null).getResponseBuilder();
			return responseBuilder.build();
		}

		
		/**
		 * NOTE: WE only allow BASE connections here, no links!
		 */
		if( rc.getClassification() != RomeRuleClassificationEnum.PARENTCHILD.getInternalId() ) {
			log.error("Attempting to delete a NON-PC connection");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CONNNECTION_DELETE_ATTEMPTED_TO_DELETE_LINK, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		// if there is a repo id, check to see if this exists
		MetadataRepoContainer repo = null;

		if( req.getRepoId() != null ) {
			MetadataRepoContainerDao repoDao = new MetadataRepoContainerDao();
			repo = repoDao.get( req.getRepoId() );

			if( repo == null ) {
				log.error("The REPO to Updated Not Exist: " + req.getConnectionId());
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
				return responseBuilder.build();
			}
		}


		// if a repo was found, check to see if any edges currently use this connection
		if( repo != null ) {
			if (this.relServices == null) {
				this.relServices = new Neo4jCoreServiceFactory().getRelServices( repo.getIp(), repo.getUsername(), repo.getPassword(), req.namespace );
			}
			
			// if rel services == null this is a problem
			
			
			// build the connection relationship
			Relationship relConn = RelationshipBuilder.build( rc );
			Path sanityCheck = this.relServices.getRelationships(relConn, repo);
			
			if( sanityCheck != null ) {
				// check if any relationships?
				if( sanityCheck.getRelationships() != null && sanityCheck.getRelationships().size() > 0 ) {
					// we found relationships that are using this connection? 
					// For now we error against this use case
					log.error("Found relationships that currently use this connection in the repo: " + sanityCheck.getRelationships().size() );
					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CONNNECTION_DELETE_FAILED_EDGE_EXISTS, null).getResponseBuilder();
					return responseBuilder.build();
				}
			}
		}

		// if we are here, no relationshps are found and we should be able to delete the connection
		// do we want to do any other sanity checks?
		
		// Check if the user has access to the TYPES that are currently assigned to this connection? 
		// If they do not have permissions to one of the types, error out?
		// Unknown if this is a valid use case or not
		// TODO: Confirm with Tim if this makes sense.
		



		// sanity check, ensure this connection can be modified by this user
		RomeGroupTypeDao groupTypeDao = new RomeGroupTypeDao(req.namespace);
		RomeGroupType startGroupType = groupTypeDao.findByGroupAndType(g, rc.getStartRomeType());
		RomeGroupType endGroupType = groupTypeDao.findByGroupAndType(g, rc.getEndRomeType());
		if(startGroupType == null || endGroupType == null) {
			// this user does not have access to this connection!!
			log.error("The user does not have access to one of the types that are associated with this connection!: " + rc.getId());
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PERMISSION_DENIED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		
		
		RomeRule romeRule = rc.getRomeRule();
		
		

		// nothing else to do here?
		// delete it
		ConnectionService connService = new ConnectionService( req.namespace );
		
		
		
		
		
		boolean deleteConnection = connService.deleteConnection( rc, metaId );
		RuleService ruleService = new RuleService( req.namespace );
		
		
		// check to see if any other connections exist for this rule
		List<RomeConnection> conns = rcDao.findByRule(romeRule, metaId );
		
		if( CollectionUtils.isEmpty( conns ) ) {
			boolean deleteRule = ruleService.deleteRule(romeRule, metaId );			
		} else {
			// don't do anything for now?
		}
		
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(deleteConnection)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();

	}

}
