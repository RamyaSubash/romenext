package com.els.romenext.core.connection;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.enums.rule.RuleTypeEnum;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.util.rel.RelationshipBuilder;

public class ConnectionService {
	
	private static Logger logger = Logger.getLogger( ConnectionService.class );

	private String namespace = null;
	
	public ConnectionService( String namespace ) {
		this.namespace = namespace;
	}
	
	public List<Relationship> getConnectionsFiltered(Long typeId1, Long typeId2, RuleTypeEnum ruleTypeEnum, MetadataContainer metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		
		if (typeId1 == null || typeId2 == null) {
			
			return null;
		}
		
		RomeTypeDao typeDao = new RomeTypeDao( this.namespace );
		
		RomeType startType = typeDao.get(typeId1);
		RomeType endType = typeDao.get(typeId2);
		
		RomeConnectionDao connectionDao = new RomeConnectionDao( this.namespace );
		List<RomeConnection> connections = connectionDao.findByTypes(startType, endType, metadataId );
		
		List<RomeConnection> results = new ArrayList<RomeConnection>();
		
		for( RomeConnection c : connections  ) {
			// seems like a bad way to do this :(
			if( c.getRomeRule().getRuleTypeEnum() == ruleTypeEnum ) {
				results.add( c );
			}
		}
		
		return RelationshipBuilder.batchBuild(results);
		
	}
	
	public List<Relationship> getConnectionsFiltered(Long startTypeId, RuleTypeEnum ruleTypeEnum, MetadataContainer metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		
		if ( startTypeId == null ) {
			
			return null;
		}
		
		RomeTypeDao typeDao = new RomeTypeDao( this.namespace );
		
		RomeType startType = typeDao.get(startTypeId);
		
		RomeConnectionDao connectionDao = new RomeConnectionDao( this.namespace );
		
		List<RomeConnection> connections = connectionDao.findByStartRomeType(startType, metadataId);
		
		List<RomeConnection> results = new ArrayList<RomeConnection>();
		
		for( RomeConnection c : connections  ) {
			// seems like a bad way to do this :(
			if( c.getRomeRule().getRuleTypeEnum() == ruleTypeEnum ) {
				results.add( c );
			}
		}
		
		return RelationshipBuilder.batchBuild(results);
		
	}
	
	public boolean deleteConnection( RomeConnection toDelete, MetadataContainer metadata ) {
		if (toDelete == null) {
			return false;
		}
		
		if ( metadata == null ) {
			return false;
		}
		
		RomeConnectionDao connectionDao = new RomeConnectionDao( this.namespace );

		
		// ensure this exists
		
		try {
			connectionDao.getTransaction().begin();
			
			connectionDao.delete( toDelete );
			connectionDao.getTransaction().commit();
			return true;
		} catch( Exception e ) {
			logger.error( "Failed to delete this connection : " + toDelete.getName() , e );
			connectionDao.getTransaction().rollback();
		}

		
		return false;
	}
	
}
