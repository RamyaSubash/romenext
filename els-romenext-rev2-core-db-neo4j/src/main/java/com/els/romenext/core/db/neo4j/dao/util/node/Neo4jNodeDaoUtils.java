package com.els.romenext.core.db.neo4j.dao.util.node;

import java.util.ArrayList;
import java.util.List;

import com.els.romenext.core.db.neo4j.conns.Neo4jConnection;
import com.els.romenext.core.db.neo4j.conns.Neo4jServerConnection;
import com.els.romenext.core.db.neo4j.dao.Neo4jNodeDao;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;

public class Neo4jNodeDaoUtils {
	
	private Neo4jNodeDao dao = null;

	public Neo4jNodeDaoUtils(String neo4jServerUrl, String usernamePassword) {
		this.dao = new Neo4jNodeDao( new Neo4jServerConnection<Neo4jNode>(neo4jServerUrl, usernamePassword) );
//		this.nrDao = new Neo4jRelationshipDao(new Neo4jServerConnection<Neo4jRelationship>(neo4jServerUrl, usernamePassword));
	}
	
	public Neo4jNodeDaoUtils(  Neo4jConnection<Neo4jNode> conn ) {
		this.dao = new Neo4jNodeDao( conn );
	}
	
	public Neo4jNodeDaoUtils( Neo4jNodeDao dao ) {
		this.dao = dao;
	}
	
	private Neo4jNodeDao getDao() {
		return dao;
	}

	public List<Neo4jNode> getNodes( String label, List<Neo4jProperty> props) {

		if( label == null ) {
			return null;
		}

		List<String> labelList = new ArrayList<String>();
		labelList.add( label );

		return this.getDao().getNodes(labelList, props);
	}

	// find nodes with these properties
	public List<Neo4jNode> getNodes( List<String> label, Neo4jProperty props) {

		if( props == null ) {
			return null;
		}

		List<Neo4jProperty> propList = new ArrayList<Neo4jProperty>();
		propList.add( props );

		return this.getDao().getNodes(label, propList);

	}

	public List<Neo4jNode> getNodes( String label, Neo4jProperty props) {

		if( label == null ) {
			return null;
		}

		if( props == null ) {
			return null;
		}

		List<String> labelList = new ArrayList<String>();
		labelList.add( label );

		List<Neo4jProperty> propList = new ArrayList<>();
		propList.add( props );

		return this.getDao().getNodes(labelList, propList );
	}
	
	public List<Neo4jNode> getNodes( Neo4jNode node ) {
		return this.getDao().matchNode( node );
	}
}
