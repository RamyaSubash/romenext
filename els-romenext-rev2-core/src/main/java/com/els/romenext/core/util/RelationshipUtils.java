package com.els.romenext.core.util;

import org.apache.commons.lang3.StringUtils;

import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.util.rel.RelationshipBuilder;

public class RelationshipUtils {
	
	private RomeRuleDao rrDao;
	private String rdbUsername;
	
	public RelationshipUtils() {
		this.rrDao = new RomeRuleDao();
	}
	
	public RelationshipUtils( RomeRuleDao dao ) {
		this.rrDao = dao;
	}
	
	public RelationshipUtils( String rdbUsername ) {
		this.rrDao = new RomeRuleDao(rdbUsername);
		this.rdbUsername = rdbUsername;
	}
	
	public Relationship build(Neo4jRelationship nRel) {
			
		String fullType = nRel.getType();
		if(StringUtils.isBlank(fullType)) {
			return null;
		}
		String metadataId = fullType.substring(1, fullType.indexOf('_'));
		
		String restType = fullType.substring(fullType.indexOf('_')+1, fullType.length());
		String repoId = restType.substring(1, restType.indexOf('_'));
		
		String lastType = restType.substring(restType.indexOf('_')+1, restType.length());
		String connectionId = lastType.substring(1, lastType.length());
		
		MetadataContainerDao mdcDao = new MetadataContainerDao(this.rdbUsername);
		MetadataContainer metadata = mdcDao.get(Long.valueOf(metadataId));
		
		// Get romeConnection
		RomeConnectionDao rcDao = new RomeConnectionDao(this.rdbUsername);
		RomeConnection rc= rcDao.get(Long.parseLong(connectionId));
		if (rc == null) {
			return null;
		}
		
		Long internalId = nRel.getInternalId();
		
		// Build rel only with rule name as type
		nRel.setType(rc.getRomeRule().getName());
		
		return RelationshipBuilder.build(rc, nRel, this.rdbUsername);

	}
	
//	@Deprecated
//	public String buildRelationshipType(MetadataContainer metadata, MetadataRepoContainer repo, String ruleName) {
//		if (metadata == null) {
//			return null;
//		}
//		
//		if (repo == null) {
//			return null;
//		}
//		
//		if (StringUtils.isEmpty(ruleName)) {
//			return null;
//		}
//		
//		return "m" + metadata.getId() + "_" + "r" + repo.getId() + "_" + ruleName;
//	}
	
	public static String buildRelationshipType(MetadataContainer metadata, MetadataRepoContainer repo, Long connectionId) {
		if (metadata == null) {
			return null;
		}
		
		if (repo == null) {
			return null;
		}
		
		if (connectionId == null) {
			return null;
		}
		
		return "m" + metadata.getId() + "_" + "r" + repo.getId() + "_c" + connectionId;
	}

}
