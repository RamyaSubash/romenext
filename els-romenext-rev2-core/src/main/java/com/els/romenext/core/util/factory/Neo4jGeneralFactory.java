package com.els.romenext.core.util.factory;

import com.els.romenext.core.RelationshipCoreServices;
import com.els.romenext.core.util.core.neo4j.Neo4jGenericFactory;

public class Neo4jGeneralFactory<T extends INeo4jFactoryCreatable> extends Neo4jGenericFactory {

	public T createInstance( String ip, String username, String password, String namespace ) {
		
//		if ( !this.isValid(ip, username, password, namespace) ) {
//			return null;
//		}
//		
//		T t = ( namespace, ip, this.generateCredentialsBase64(username, password) );
//		
//		if (relCoreServices == null || !relCoreServices.isInitialized()) {
//			return null;
//		}
//		
//		return relCoreServices;
		
		
		return null;
	}
}
