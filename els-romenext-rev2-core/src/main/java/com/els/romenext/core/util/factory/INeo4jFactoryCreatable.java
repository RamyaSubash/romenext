package com.els.romenext.core.util.factory;

public interface INeo4jFactoryCreatable {

	public INeo4jFactoryCreatable createFactory( String namespace, String ip, String base64Creds );
}
