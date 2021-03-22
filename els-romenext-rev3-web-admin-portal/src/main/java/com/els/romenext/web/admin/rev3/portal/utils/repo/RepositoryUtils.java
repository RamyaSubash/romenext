package com.els.romenext.web.admin.rev3.portal.utils.repo;

import com.els.romenext.core.db.neo4j.conns.Neo4jConnection;
import com.els.romenext.core.db.neo4j.conns.Neo4jServerConnection;
import com.els.romenext.core.db.neo4j.dao.Neo4jNodeDao;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.util.core.neo4j.Neo4jGenericFactory;

public class RepositoryUtils {
	
	private String namespace;
	private Neo4jNodeDao dao;
	
	public RepositoryUtils(String neo4jServerUrl, String usernamePassword, String namespace) {
		this.namespace = namespace;
		this.dao = new Neo4jNodeDao( new Neo4jServerConnection<Neo4jNode>(neo4jServerUrl, usernamePassword) ); 
	}
	
	public RepositoryUtils(  Neo4jConnection<Neo4jNode> conn, String namespace ) {
		this.namespace = namespace;
		this.dao = new Neo4jNodeDao( conn ); 
	} 

	
	/**
	 * Will attempt to hit the version URL off a neo4j instance
	 * 
	 * ie.
	 * 
	 * http://localhost:7474/db/manage/server/version
	 * http://localhost:7474/db/data
	 * @param url
	 * @return
	 */
	public String getRepoVersionUsingURL(  ) { 
		return this.dao.getVersionStatus(); 
	}
	
	
	public static void main(String[] args) {
		
		
		Neo4jGenericFactory fact = new Neo4jGenericFactory();
		System.out.println("auth: " + fact.generateCredentialsBase64("neo4j", "superman") );
		RepositoryUtils utils = new RepositoryUtils( "http://localhost:7474", fact.generateCredentialsBase64("neo4j", "superman"), "test1" );
		
		String ver = utils.getRepoVersionUsingURL();
		
		System.out.println("Verseion : " + ver );
		
//		NodeCoreServices nodeCoreServices = new NodeCoreServices(ip, this.generateCredentialsBase64(username, password), namespace); 
		
		
	}
	
}
