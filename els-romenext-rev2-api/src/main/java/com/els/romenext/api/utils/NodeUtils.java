package com.els.romenext.api.utils;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;

import com.els.romenext.core.db.dao.deco.RomeDecoratorDao;
import com.els.romenext.core.db.entity.deco.RomeDecorator;
import com.els.romenext.core.db.entity.deco.RomeDecoratorProperty;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.util.node.NodeBuilder;

public class NodeUtils {
	
	public static Node fixNodeObjectForJsonResponse(Node node) {
		
		if (node != null) {
			if (node.hasProperties()) {
				for (Property property : node.getTypeProperties().values()) {
					property = PropertyJSONUtils.fixPropertyObjectForJsonResponse(property);
				}
			}
			
			if (node.hasSystemProperties()) {
				for (Property property : node.getSysProperties().values()) {
					property = PropertyJSONUtils.fixPropertyObjectForJsonResponse(property);
				}
			}
			
			if (node.hasDecoProperties()) {
				for (Property property : node.getDecoProperties().values()) {
					property = PropertyJSONUtils.fixPropertyObjectForJsonResponse(property);
				}
			}
		}
		
		return node;
		
	}
	
	public static List<Node> fixNodeObjectListForJsonResponse(List<Node> nodeList) {
		
		if (CollectionUtils.isNotEmpty(nodeList)) {
			for (Node node : nodeList) {
				
				if (node != null) {
					if (node.hasProperties()) {
						for (Property property : node.getTypeProperties().values()) {
							property = PropertyJSONUtils.fixPropertyObjectForJsonResponse(property);
						}
					}
					
					if (node.hasSystemProperties()) {
						for (Property property : node.getSysProperties().values()) {
							property = PropertyJSONUtils.fixPropertyObjectForJsonResponse(property);
						}
					}
					
//					if (node.hasDecoProperties()) {
//						for (Property property : node.getDecoProperties().values()) {
//							property = PropertyUtils.fixPropertyObjectForJsonResponse(property);
//						}
//					}
				}
				
			}
		}
		
		return nodeList;
		
	}
	
	public static String validNodeJson(JSONObject json) {
		return RomeJSONUtils.findEmptyJson(json, "name", "value");
	}
	
	/**
	 * JSONObject should be in Node.java format.
	 * 
	 * @param namespace
	 * @param json
	 * @return
	 */
	public static Node parseNodeJSONObject( String namespace, JSONObject json ) {
		
		if (json == null) {
			return null;
		}
		
		String typeId = "";
		if (json.has("typeId")) {
			typeId = json.getString("typeId");
		}
		Long decoId = null;
		if (json.has("decoId")) {
			decoId = Long.valueOf(json.getString("decoId"));
		}
		if (StringUtils.isBlank(typeId) || decoId == null) {
			return null;
		}
		
		RomeDecoratorDao rdDao = new RomeDecoratorDao( namespace );
		RomeDecorator deco = rdDao.get(decoId);
		if (deco == null) {
			return null;
		}
		
		//RomeDecoratorPropertyDao rdpDao = new RomeDecoratorPropertyDao();
		List<RomeDecoratorProperty> decoPropList = deco.getFields();
		if (CollectionUtils.isEmpty(decoPropList)) {
			return null;
		}
		
		List<Property> decoPropValueList = new ArrayList<Property>();
		for (RomeDecoratorProperty rdp : decoPropList) {
			
			if (json.has(rdp.getId().toString())) {
			
				Property propValue = new Property();
				propValue.setId(rdp.getId().toString());
				propValue.setName(rdp.getName());
				propValue.setValue(json.getString(rdp.getId().toString()));
				propValue.setRomeDecoPropId(rdp.getId());
				
				decoPropValueList.add(propValue);
				
			}

		}
				
//		Double x = Double.valueOf(json.getString("x"));
//		Double y = Double.valueOf(json.getString("y"));
//		Double z = Double.valueOf(json.getString("z"));
		
		Node node = new Node();
		node.setId(typeId);
		
//		NodeBuilder.setDecoroatorPropertyIntoNode( node, decoPropValueList );
//		NodeBuilder.setDecoroatorPropertyIntoNode( node, decoPropValueList );
//		NodeBuilder.setDecoroatorPropertyIntoNode( node, decoPropValueList );

		
		
		NodeBuilder.setDecoroatorPropertyIntoNode( node, decoPropValueList );
//		node.setDecoProperties(decoPropValueList);
//		node.setX(x);
//		node.setY(y);
//		node.setZ(z);
		
		return node;
		
	}
	
	
	@Deprecated
	public static Node parseNodeJSONObjectForDecoView(JSONObject json) {
		
		if (json == null) {
			return null;
		}
		
		String typeId = "";
		if (json.has("typeId")) {
			typeId = json.getString("typeId");
		}
		Long decoId = null;
		if (json.has("decoId")) {
			decoId = Long.valueOf(json.getString("decoId"));
		}
		if (StringUtils.isBlank(typeId) || decoId == null) {
			return null;
		}
		
		RomeDecoratorDao rdDao = new RomeDecoratorDao();
		RomeDecorator deco = rdDao.get(decoId);
		if (deco == null) {
			return null;
		}
		
		//RomeDecoratorPropertyDao rdpDao = new RomeDecoratorPropertyDao();
		List<RomeDecoratorProperty> decoPropList = deco.getFields();
		if (CollectionUtils.isEmpty(decoPropList)) {
			return null;
		}
		
		List<Property> decoPropValueList = new ArrayList<Property>();
		for (RomeDecoratorProperty rdp : decoPropList) {
			
			if (json.has(rdp.getId().toString())) {
			
				Property propValue = new Property();
				propValue.setId(rdp.getId().toString());
				propValue.setName(rdp.getName());
				propValue.setValue(json.getString(rdp.getId().toString()));
				propValue.setRomeDecoPropId(rdp.getId());
				
				decoPropValueList.add(propValue);
				
			}

		}
				
//		Double x = Double.valueOf(json.getString("x"));
//		Double y = Double.valueOf(json.getString("y"));
//		Double z = Double.valueOf(json.getString("z"));
		
		Node node = new Node();
		node.setId(typeId);
		
		NodeBuilder.setDecoroatorPropertyIntoNode( node, decoPropValueList );
//		node.setDecoProperties(decoPropValueList);
//		node.setX(x);
//		node.setY(y);
//		node.setZ(z);
		
		return node;
		
	}
	
	public static boolean containsDuplication(List<Node> nodes) {
		
		if (nodes == null) {
			return false;
		}
		
		Set<String> types = new HashSet<String>();
		
		for (Node node : nodes) {
			if (types.contains(node.getId())) {
				return true;
			}
			types.add(node.getId());
		}
		
		return false;
	}

}
