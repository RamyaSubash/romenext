package com.els.romenext.core.db.neo4j.conns;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.Result;
import org.neo4j.graphdb.Transaction;

import com.els.romenext.core.db.neo4j.dao.util.core.PostProcessorUtils;
import com.els.romenext.core.db.neo4j.entity.INeo4jParsable;

public class Neo4jEmbeddedServerConnection<T extends INeo4jParsable<T>> implements Neo4jConnection<T> {

	protected GraphDatabaseService graphDb;

	public Neo4jEmbeddedServerConnection(GraphDatabaseService graphDb) {
		this.graphDb = graphDb;
	}
	
	@Override 
	public String getVersion() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public List<T> execute(String cypher, Class<T> clazz) {
		
	    List<T> tList = new ArrayList<T>();
	    
	    Transaction tx = graphDb.beginTx();
		
		try {
			
			Result results = graphDb.execute( cypher );
			
			tList = this.convert( results, clazz);		
		
			tx.success();
			
			return tList;
			
		} finally {
			
			tx.close();
			
		}
	
	}
	
	@Override
	public List<T> executeList(List<String> cypherList, Class<T> clazz) {
		
	    List<T> tList = new ArrayList<T>();
	    
	    Transaction tx = graphDb.beginTx();
		
		try {
			
			for (String cql : cypherList) {
				List<T> list = new ArrayList<T>();
				Result results = graphDb.execute( cql );
				list = this.convert( results, clazz);
				tList.addAll(list);
			}
				
			tx.success();
			
			return tList;
			
		} finally {
			
			tx.close();
			
		}
	
	}

	@Override
	public List<T> convert(Object result, Class<T> clazz) {
		T t;
		
		if( result instanceof JSONArray ) {
			
			try {
				
				t = clazz.newInstance();
				
				List<T> results = t.parseNeo4jAPIResults( result );
				
//				System.out.println("--------------- Preprocessing JSON --------------------");
//				// post processer
//				PostProcessorUtils<T> utils = new PostProcessorUtils<T>();
//				utils.post( results );
				
				return results;
				
				
				
//				t = clazz.newInstance();
//				return t.parseNeo4jAPIResults( result );
			} catch (InstantiationException | IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
		} else if( result instanceof Result ) {
			
			try {
				
				t = clazz.newInstance();
				
				List<T> results = t.parseNeo4jAPIResults( result );
				
//				System.out.println("--------------- Preprocessing RESULT  --------------------");
//				// post processer
//				PostProcessorUtils<T> utils = new PostProcessorUtils<T>();
//				utils.post( results );
				
				return results;
				
				
//				t = clazz.newInstance();
//				return t.parseNeo4jAPIResults( result );
			} catch (InstantiationException | IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		return null;
	}

}
