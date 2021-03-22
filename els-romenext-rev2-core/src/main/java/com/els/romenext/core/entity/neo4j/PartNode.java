package com.els.romenext.core.entity.neo4j;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.model.ModelDao;
import com.els.romenext.core.db.dao.model.PartDao;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.model.Model;
import com.els.romenext.core.db.entity.model.Part;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;

public class PartNode {
	
	private String uuid;
	private Long metadataId;
	private Long typeId;
	private Long modelId;
	private Long partId;
	
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public Long getMetadataId() {
		return metadataId;
	}
	public void setMetadataId(Long metadataId) {
		this.metadataId = metadataId;
	}
	public Long getTypeId() {
		return typeId;
	}
	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}
	public Long getModelId() {
		return modelId;
	}
	public void setModelId(Long modelId) {
		this.modelId = modelId;
	}
	public Long getPartId() {
		return partId;
	}
	public void setPartId(Long partId) {
		this.partId = partId;
	}

	public PartNode build(Neo4jNode nNode) {
		
		PartNode pn = new PartNode();
		
		if(CollectionUtils.isEmpty(nNode.getLabels())) {
			return null;
		}
		
		String restLabel = "";
		String fullLabel = nNode.getLabels().get(0);
		
		String metadataId = fullLabel.substring(1, fullLabel.indexOf('_'));
		restLabel = fullLabel.substring(fullLabel.indexOf('_')+1, fullLabel.length());
		
		String typeId = restLabel.substring(1, restLabel.indexOf('_'));
		restLabel = restLabel.substring(restLabel.indexOf('_')+1, restLabel.length());
		
		String modelId = restLabel.substring(1, restLabel.indexOf('_'));
		restLabel = restLabel.substring(restLabel.indexOf('_')+1, restLabel.length());
		
//		if (restLabel.split("[a-z]").length != 1) {
//			return null;
//		}
		String partId = restLabel.substring(2, restLabel.length());
		
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(Long.valueOf(metadataId));
		if (metadata == null) {
			return null;
		}
		pn.setMetadataId(metadata.getId());
//		System.out.println("Metadata ID: " + pn.getMetadataId());
		
		RomeTypeDao rtDao = new RomeTypeDao();
		RomeType rt = rtDao.get(Long.valueOf(typeId));
		if (rt == null) {
			return null;
		}
		pn.setTypeId(rt.getId());
//		System.out.println("Rome Type ID: " + pn.getTypeId());
		
		ModelDao mDao = new ModelDao();
		Model m = mDao.get(Long.valueOf(modelId));
		if (m == null) {
			return null;
		}
		pn.setModelId(m.getId());
//		System.out.println("Model ID: " + pn.getModelId());
		
		PartDao pDao = new PartDao();
		List<Part> ps = pDao.findByGroupPart(m, Integer.valueOf(partId));
		if (CollectionUtils.isEmpty(ps)) {
			return null;
		}
		pn.setPartId(Long.valueOf(ps.get(0).getGroup()));
//		System.out.println("Part ID: " + pn.getPartId());
		
		if (StringUtils.isEmpty(nNode.getProperties().get("uuid").toString())) {
			return null;
		}
		pn.setUuid(nNode.getProperties().get("uuid").toString());
//		System.out.println("UUID: " + pn.getUuid());
				
		return pn;

	}
	
}
