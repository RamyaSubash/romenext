package com.els.romenext.core;

import com.els.romenext.core.neo4j.path.Neo4jPathServices;
import com.els.romenext.core.neo4j.relationship.Neo4jRelationshipServices;
import com.els.romenext.core.neo4j.workspace.Neo4jWorkspaceServices;
import com.els.romenext.core.relationship.RelationshipDeleteCoreService;
import com.els.romenext.core.util.core.neo4j.Neo4jGenericFactory;

public class Neo4jCoreServiceFactory extends Neo4jGenericFactory {
	
	public NodeCoreServices getNodeCoreServices (String ip, String username, String password, String namespace) {
		
		if ( !this.isValid(ip, username, password, namespace) ) {
			return null;
		}
		
		NodeCoreServices nodeCoreServices = new NodeCoreServices(ip, this.generateCredentialsBase64(username, password), namespace);
		
		
		if (nodeCoreServices == null || !nodeCoreServices.isInitialized()) {
			return null;
		}
		
		return nodeCoreServices;
	
	}
	
	public RelationshipCoreServices getRelationshipCoreServices (String ip, String username, String password, String namespace) {
		
		if ( !this.isValid(ip, username, password, namespace) ) {
			return null;
		}
		
		RelationshipCoreServices relCoreServices = new RelationshipCoreServices( namespace, ip, this.generateCredentialsBase64(username, password) );
		
		if (relCoreServices == null || !relCoreServices.isInitialized()) {
			return null;
		}
		
		return relCoreServices;
	
	}
	
	public Neo4jPathServices getPathCoreServices (String ip, String username, String password, String namespace) {
		
		if ( !this.isValid(ip, username, password, namespace) ) {
			return null;
		}
		
		Neo4jPathServices relCoreServices = new Neo4jPathServices( namespace, ip, this.generateCredentialsBase64(username, password) );
		
		return relCoreServices;
	
	}
	
	public Neo4jRelationshipServices getRelServices (  String ip, String username, String password, String namespace) {
		
		if ( !this.isValid(ip, username, password, namespace) ) {
			return null;
		}
		
		return new Neo4jRelationshipServices( namespace, ip, this.generateCredentialsBase64(username, password) );

	}
	
	public Neo4jWorkspaceServices getWorkspaceServices (String ip, String username, String password, String namespace) {
		
		if ( !this.isValid(ip, username, password, namespace) ) {
			return null;
		}
		
		Neo4jWorkspaceServices wsServices = new Neo4jWorkspaceServices( namespace, ip, this.generateCredentialsBase64(username, password) );
		
		return wsServices;
	
	}
	

	public RelationshipDeleteCoreService getRelationshipDeleteCoreServices (String ip, String username, String password, String namespace) {
		
		if ( !this.isValid(ip, username, password, namespace) ) {
			return null;
		}
		
		RelationshipDeleteCoreService relCoreServices = new RelationshipDeleteCoreService( namespace, ip, this.generateCredentialsBase64(username, password) );
		
		if (relCoreServices == null || !relCoreServices.isInitialized()) {
			return null;
		}
		
		return relCoreServices;
	
	}
}
