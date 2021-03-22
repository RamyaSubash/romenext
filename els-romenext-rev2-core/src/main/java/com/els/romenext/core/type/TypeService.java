package com.els.romenext.core.type;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.RomeTypeDecoratorPropertyValueDao;
import com.els.romenext.core.db.dao.RomeTypeRomeDecoratorDao;
import com.els.romenext.core.db.dao.deco.RomeDecoratorDao;
import com.els.romenext.core.db.dao.deco.RomeDecoratorPropertyDao;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeDecoratorPropertyValue;
import com.els.romenext.core.db.entity.RomeTypeRomeDecorator;
import com.els.romenext.core.db.entity.deco.RomeDecorator;
import com.els.romenext.core.db.entity.deco.RomeDecoratorProperty;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.db.neo4j.dao.Neo4jNodeDao;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.util.RomeTypeUtils;
import com.els.romenext.core.util.neo4j.Neo4jNodeUtils;
import com.els.romenext.core.util.node.NodeBuilder;
import com.els.romenext.core.util.node.NodeUtils;

public class TypeService {

	private static final Logger log = Logger.getLogger( TypeService.class );
	private String namespace;
	
	public TypeService( String namespace ) {
		this.namespace = namespace;
	}
	
//	public Node createTypeNode( String nodeName, Boolean isRoot, String subRomeClass, Long metadataId ) {
//		return this.createTypeNode(nodeName, isRoot, subRomeClass, metadataId, null );
//	}
	
	public Node createTypeNode( String nodeName, Boolean isRoot, String subRomeClass, Long metadataId ) {
		return this.createTypeNode(nodeName, isRoot, subRomeClass, metadataId, null );
	}
	
	public Node createTypeNode( String nodeName, Boolean isRoot, String subRomeClass, Long metadataId, Map<String,String> options ) {
		Node result;
		
		MetadataContainerDao metadataContainerDao = new MetadataContainerDao();
		MetadataContainer metadata = metadataContainerDao.get(metadataId);
		
		if (metadata == null) {
			return null;
		}
		
		RomeTypeUtils romeTypeUtils = new RomeTypeUtils( this.namespace );
		RomeTypeClassificationEnum romeTypeClass = RomeTypeClassificationEnum.getEnum(subRomeClass);
		
		RomeType newRomeType = romeTypeUtils.createRomeType(nodeName, isRoot, romeTypeClass, null, metadata, options );
		
		NodeUtils utils = new NodeUtils( this.namespace );
		NodeBuilder builder = new NodeBuilder( this.namespace );

		result = builder.build(newRomeType);
		
		
		return result;
	}
	
	
	
	
	
	public Node addDecorator( String typeName, Long metadataId, List<Long> decorators ) {
		
		if (metadataId == null || metadataId <= 0) {
			log.error("No Metada ID Found");
			return null;
		}
		
		if (StringUtils.isBlank(typeName)) {
			log.error("No Type Name Found");
			return null;
		}
		
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		if (metadata == null) {
			log.error("No Metadata Found");
			return null;
		}
		
		RomeTypeDao rtDao = new RomeTypeDao();
		RomeType romeType = rtDao.findByUniqueName(typeName, metadata);
		if (romeType == null) {
			log.error("No Rome Type Found");
			return null;
		}
		
		if (CollectionUtils.isEmpty(decorators) || !decorators.contains(Long.valueOf(1))) {
			decorators.add(Long.valueOf(1)); // Hard code to add logical deco
//			log.error("No Rome Decorators Found");
//			return null;
		}
		
		RomeDecoratorDao rdDao = new RomeDecoratorDao();
		List<RomeDecorator> romeDecoList = new ArrayList<RomeDecorator>();
		for (Long dId : decorators) {
			
			if (dId != null) {
				
				RomeDecorator rd = rdDao.get(dId);
				
				if (rd != null) {
					
					romeDecoList.add(rd);
					
				}
				
			}
			
		}
		
		RomeTypeRomeDecoratorDao rtrdDao = new RomeTypeRomeDecoratorDao();
		List<RomeTypeRomeDecorator> romeTypeRomeDecoList = new ArrayList<RomeTypeRomeDecorator>();
		for (RomeDecorator rd : romeDecoList) {
			
			RomeTypeRomeDecorator rtrd = new RomeTypeRomeDecorator();
			rtrd .setRomeType(romeType);
			rtrd.setRomeDecorator(rd);
			romeTypeRomeDecoList.add(rtrd);
			
		}
		
		try {
			rtrdDao.getTransaction().begin();
			for (RomeTypeRomeDecorator rtrd : romeTypeRomeDecoList) {
				rtrdDao.save(rtrd);
			}
			rtrdDao.getTransaction().commit();
		} catch (Exception e) {
			log.error("Failed to save RomeDecoratorsToRomeType.", e );
			rtrdDao.getTransaction().rollback();
			return null;
		}
		
//		for (RomeTypeRomeDecorator rtrd : romeTypeRomeDecoList) {
//			rtrdDao.getEntityManagerUtil().getSession().refresh(rtrd);
//		}

//		romeType.setDecos(romeDecoList);
//		try {
//			rtDao.getTransaction().begin();
//			rtDao.save(romeType);
//			rtDao.getTransaction().commit();
//		} catch (Exception e) {
//			log.error("Failed to save RomeDecoratorsToRomeType.", e );
//			rtDao.getTransaction().rollback();
//			return null;
//		}
//		rtDao.getEntityManagerUtil().getSession().refresh(romeType);
		
		NodeUtils utils = new NodeUtils( this.namespace );
		NodeBuilder builder = new NodeBuilder( this.namespace );

		return builder.build(romeType);

	}

	// Metadata version
	public List<Node> getRoots(Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		List<Node> result = null;
		
		RomeTypeDao romeTypeDao = new RomeTypeDao();
		List<RomeType> romeTypes = romeTypeDao.findRootTypes(metadata);
		
		if (romeTypes == null) {
			return result;
		}
		
		for (RomeType romeType : romeTypes) {
			romeTypeDao.getEntityManagerUtil().getSession().refresh(romeType);					
		}
		
		result = NodeBuilder.batchBuild( this.namespace, romeTypes);
		
		
		return result;
	}
	
	// Metadata version
	public List<Node> updateNodesCoordinates(List<Node> types, Long metadataId) {
		
		if (metadataId == null) {
			return null;
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		if (metadata == null) {
			return null;
		}
		
		if (CollectionUtils.isEmpty(types)) {
			return null;
		}
		
		RomeTypeDecoratorPropertyValueDao rtdpvDao = new RomeTypeDecoratorPropertyValueDao();
		RomeTypeDao rtDao = new RomeTypeDao();
		RomeDecoratorPropertyDao rdpDao = new RomeDecoratorPropertyDao();
		List<RomeTypeDecoratorPropertyValue> uDecoValueList = new ArrayList<RomeTypeDecoratorPropertyValue>();
		List<RomeTypeDecoratorPropertyValue> nDecoValueList = new ArrayList<RomeTypeDecoratorPropertyValue>();
		List<RomeType> romeTypes = new ArrayList<RomeType>();
		for (Node t : types) {
			
			if (t.getId() != null) {
				RomeType rt = rtDao.get(Long.valueOf(t.getId()));
				
				if (rt != null) {
					
					if( t.hasDecoProperties() ) {
						for (Property dp : t.getDecoProperties().values() ) {
							if (dp != null && dp.getRomeDecoPropId() != null && dp.getValue() != null) {
								RomeDecoratorProperty rdp = rdpDao.get(dp.getRomeDecoPropId());
								if (rdp != null) {
									List<RomeTypeDecoratorPropertyValue> rtdpvList = rtdpvDao.findByRomeTypeAndRomeDecorator(rt, rdp);
									if (CollectionUtils.isNotEmpty(rtdpvList) && rtdpvList.size() == 1) {
										RomeTypeDecoratorPropertyValue rtdpv = rtdpvList.get(0);
//										rtdpv.setRomeType(rtDao.get(Long.valueOf(t.getId())));
//										rtdpv.setRomeDecoratorProperty(rdpDao.get(dp.getRomeDecoPropId()));
										rtdpv.setValue(dp.getValue().toString());
										uDecoValueList.add(rtdpv);
	
									} else if (CollectionUtils.isEmpty(rtdpvList)) {
										RomeTypeDecoratorPropertyValue rtdpv = new RomeTypeDecoratorPropertyValue();
										rtdpv.setRomeType(rtDao.get(Long.valueOf(t.getId())));
										rtdpv.setRomeDecoratorProperty(rdpDao.get(dp.getRomeDecoPropId()));
										rtdpv.setValue(dp.getValue().toString());
										nDecoValueList.add(rtdpv);
									}
								}
							}
						}
						
					}
				
					romeTypes.add(rt);
					
				}

			}
		
		}
		
		try {
			rtdpvDao.getTransaction().begin();
			for (RomeTypeDecoratorPropertyValue dv : uDecoValueList) {
				rtdpvDao.save(dv);
			}
			for (RomeTypeDecoratorPropertyValue dv : nDecoValueList) {
				rtdpvDao.insert(dv);
			}
			rtdpvDao.getTransaction().commit();
		} catch (Exception e) {
			rtdpvDao.getTransaction().rollback();
			return null;
		}
				
//		RomeTypeDao romeTypeDao = new RomeTypeDao();
//		List<RomeType> romeTypes = new ArrayList<RomeType>();
//		for (Node t : types) {
//			if (t.getId() != null) {
//				RomeType rt = romeTypeDao.get(Long.valueOf(t.getId()));
//				if (rt != null) {
//					rt.setX(t.getX());
//					rt.setY(t.getY());
//					rt.setZ(t.getZ());
//					romeTypes.add(rt);
//				}
//			}
//		}
//		
//		try {
//			romeTypeDao.getTransaction().begin();
//			for (RomeType rt : romeTypes) {
//				romeTypeDao.save(rt);
//			}
//			romeTypeDao.getTransaction().commit();
//		} catch (Exception e) {
//			romeTypeDao.getTransaction().rollback();
//			return null;
//		}
				
//		List<RomeType> romeTypes = new ArrayList<RomeType>();
//		for (Node t : types) {
//			if (t.getId() != null) {
//				RomeType rt = rtDao.get(Long.valueOf(t.getId()));
//				romeTypes.add(rt);
//			}
//		} 
		
		List<Node> result = null;
		result = NodeBuilder.batchBuild( this.namespace, romeTypes);
		return result;
		
	}
	
	public Node setDecoPropertyValues(String typeName, Long metadataId, List<Property> decoPropertyValues, List<Long> decoIds) {
		
		if (metadataId == null || metadataId <= 0) {
			log.error("No Metada ID Found");
			return null;
		}
		
		if (StringUtils.isBlank(typeName)) {
			log.error("No Type Name Found");
			return null;
		}
		
		if (CollectionUtils.isEmpty(decoPropertyValues)) {
			log.error("No Deco Property Values Found");
			return null;
		}
		
		if (CollectionUtils.isEmpty(decoIds)) {
			log.error("No Deco Ids Found");
			return null;
		}
		
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		if (metadata == null) {
			log.error("No Metadata Found");
			return null;
		}
		
		RomeTypeDao rtDao = new RomeTypeDao();
		RomeType romeType = rtDao.findByUniqueName(typeName, metadata);
		if (romeType == null) {
			log.error("No Rome Type Found");
			return null;
		}
		
		// TODO: Really rely on the default values (records in DB)
		RomeTypeDecoratorPropertyValueDao rtdpvDao = new RomeTypeDecoratorPropertyValueDao();
		RomeDecoratorPropertyDao rdpDao = new RomeDecoratorPropertyDao();
		List<RomeTypeDecoratorPropertyValue> decoValueList = new ArrayList<RomeTypeDecoratorPropertyValue>();
		for (Property dp : decoPropertyValues) {
			if (dp != null && dp.getRomeDecoPropId() != null && dp.getValue() != null) {
				RomeDecoratorProperty rdp = rdpDao.get(dp.getRomeDecoPropId());
				if (rdp != null && rdp.getDesign()) {
					RomeTypeDecoratorPropertyValue rtdpv = new RomeTypeDecoratorPropertyValue();
					rtdpv.setRomeType(romeType);
					rtdpv.setRomeDecoratorProperty(rdp);
					if (StringUtils.isBlank(dp.getValue().toString())) {
						rtdpv.setValue(rdp.getDefaultValue());
					} else {
						rtdpv.setValue(dp.getValue().toString());
					}
					decoValueList.add(rtdpv);
					decoIds.remove(rdp.getRomeDecorator().getId());
				}
			}
		}
		
		RomeDecoratorDao rdDao = new RomeDecoratorDao();
		if (CollectionUtils.isNotEmpty(decoIds)) {
			for (Long did : decoIds) {
				if (did == null) { continue; }
				List<RomeDecoratorProperty> rdpList = rdDao.get(did).getFields();
				for (RomeDecoratorProperty rdp : rdpList) {
					if (rdp == null || !rdp.getDesign()) { continue; }
					RomeTypeDecoratorPropertyValue rtdpv = new RomeTypeDecoratorPropertyValue();
					rtdpv.setRomeType(romeType);
					rtdpv.setRomeDecoratorProperty(rdp);
					if (StringUtils.isNotBlank(rdp.getDefaultValue())) {
						rtdpv.setValue(rdp.getDefaultValue());
					}
					decoValueList.add(rtdpv);
				}
					
			}
		}
				
		try {
			rtdpvDao.getTransaction().begin();
			for (RomeTypeDecoratorPropertyValue dv : decoValueList) {
				rtdpvDao.insert(dv);
			}
			rtdpvDao.getTransaction().commit();
		} catch (Exception e) {
			rtdpvDao.getTransaction().rollback();
			return null;
		}
		
		NodeUtils utils = new NodeUtils( this.namespace );
		NodeBuilder builder = new NodeBuilder( this.namespace );

		return builder.build(romeType);
	
	}
	
	
	
	
	
	/**
	 * Retrieve nodes that were from an entry node
	 * @param typeIds
	 * @param metadataRepo
	 * @return
	 */
	public List<Node> getAllNodesFromEntryNode( NodeCoreServices coreService, Node entryNode, List<Long> searchingTypeIds, MetadataRepoContainer metadataRepo) {
		
		if (metadataRepo == null) {
			log.error("No Metadata Repo Found");
			return null;
		}
		
		if( entryNode == null ) {
			log.error("No entry node was found");
			return null;
		}
		
		if (metadataRepo.getMetadata() == null) {
			
			log.error("No Metadata Found");
			return null;
			
		}
		
		if (CollectionUtils.isEmpty(searchingTypeIds)) {
			
			log.error("No Type Ids Found");
			return null;
			
		}
		
		Long metadataId = metadataRepo.getMetadata().getId();
		Long repoId = metadataRepo.getId();
		
		
		
		
		// need to convert the Node to pieces we can call with
		
		
		
//		Neo4jNodeDao neo4jDao = new Neo4jNodeDao( metadataRepo.getNeo4jInstance() );
		
//		NodeUtils utils = new NodeUtils();
//		Neo4jNode neo4jNode = utils.buildNeo4jNode(metadataRepo, entryNode );
		Neo4jNode neo4jNode = Neo4jNodeUtils.build(entryNode, metadataRepo);
		

		
		
		
//		coreService.
		
		return null;
		
		
//		List<String> labels = new ArrayList<String>();
//		for (Long tId : typeIds) {
//			
//			if (tId != null) {
//				
//				labels.add(this.nodeUtils.buildNodeLabel(metadataRepo.getMetadata(), metadataRepo, tId));
////				labels.add("m" + metadataId + "_" + "r" + repoId + "_" + tn);
//				
//			}
//			
//		}
//		
//		List<String> types = new ArrayList<String>();
//		RomeConnectionDao rcDao= new RomeConnectionDao();
//		List<RomeConnection> rcList = rcDao.findByMetadata(metadataRepo.getMetadata());
////		RomeRuleDao rrDao = new RomeRuleDao();
////		List<RomeRule> rrList = rrDao.findByMetadata(metadataRepo.getMetadata());
//		if (CollectionUtils.isNotEmpty(rcList)) {
//			for (RomeConnection rc : rcList ) {
//				if (rc.getId() != null) {
//					types.add(this.relUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, rc.getId()));
//				}
//			}
//		}
//		
//		List<Neo4jNode> nNodes = this.getDao().getAllSingleNodesUnderLabelsAndTypes(labels, types);
//		
//		// TODO: Handle empty
//		if (CollectionUtils.isEmpty(nNodes)) {
//			
//			return null;
//			
//		}
//		
//		// Build node to pass back
//		List<Node> romeNodes = new ArrayList<Node>();
////		NodeUtils nodeUtils = new NodeUtils();
//		for (Neo4jNode nn : nNodes) {
//			
//			romeNodes.add(this.nodeUtils.build_simplifiedVersion(nn));
//			
//		}
//
//		if (CollectionUtils.isEmpty(romeNodes)) {
//			
//			return null;
//		
//		}
//		
//		return romeNodes;
//		
	}

}
 