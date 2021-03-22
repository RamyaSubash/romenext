package com.els.romenext.core.db.neo4j.conns;

import java.util.UUID;

import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.Node;
import org.neo4j.graphdb.Relationship;
import org.neo4j.graphdb.event.PropertyEntry;
import org.neo4j.graphdb.event.TransactionData;
import org.neo4j.graphdb.event.TransactionEventHandler;

public class TransactionEventHandlerUUID implements TransactionEventHandler {
	
    public static GraphDatabaseService db;
    private static String identifier = "sys_uuid";

    public TransactionEventHandlerUUID(GraphDatabaseService graphDatabaseService) {
        db = graphDatabaseService;
    }

    @Override
    public Object beforeCommit(TransactionData transactionData) throws Exception {
        
        // Check if the UUID has been modified from the node and throw an error
        for (PropertyEntry<Node> change : transactionData.assignedNodeProperties()) {
            if (change.key().equals(identifier)) {
            	throw new Exception("You are not allowed to modify the "+ identifier + " property");           
            }
        }
        
        // Check if the UUID has been modified from the rel and throw an error
        for (PropertyEntry<Relationship> change : transactionData.assignedRelationshipProperties()) {
            if (change.key().equals(identifier)) {
            	throw new Exception("You are not allowed to modify the "+ identifier + " property");           
            }
        }
    	
        // Check if the UUID has been removed from the node and throw an error
        for (PropertyEntry<Node> change : transactionData.removedNodeProperties()) {
        	if (change.key().equals(identifier) && !transactionData.isDeleted(change.entity())) {
        		throw new Exception("You are not allowed to remove the "+ identifier + " property");
            }
        }
        
        // Check if the UUID has been removed from the rel and throw an error
        for (PropertyEntry<Relationship> change : transactionData.removedRelationshipProperties()) {
        	if (change.key().equals(identifier) && !transactionData.isDeleted(change.entity())) {
        		throw new Exception("You are not allowed to remove the "+ identifier + " property");
            }
        }
    	
    	// Set the UUID on all created nodes
        for (Node node : transactionData.createdNodes()) {
        	assignUuid(node);
        }
        
    	// Set the UUID on all created rels
        for (Relationship rel : transactionData.createdRelationships()) {
        	assignUuid(rel);
        }
        
    	return null;
    
    }

    @Override
    public void afterCommit(TransactionData transactionData, Object o) {
        
    }

    @Override
    public void afterRollback(TransactionData transactionData, Object o) {

    }
    
    private void assignUuid(Node node) throws Exception {
        if (!node.hasProperty(identifier)) {
        	String uuid = UUID.randomUUID().toString();
            node.setProperty(identifier, uuid);
        } else {
            Node existingNode = db.findNode(null, identifier, node.getProperties(identifier).toString());
            if (existingNode != null && existingNode.getId() != node.getId()) {
                throw new Exception("Another node with UUID " + identifier + " already exists (" + existingNode + ")!");
            }
        }
    }
    
    private void assignUuid(Relationship rel) throws Exception {
    	String uuid = UUID.randomUUID().toString();
        rel.setProperty(identifier, uuid);
        // TODO: Check existence of uuid before inserting
//        if (!rel.hasProperty(identifier)) {
//        	String uuid = UUID.randomUUID().toString();
//            rel.setProperty(identifier, uuid);
//        } else {
//            Relationship existingRel = db.findRelationship(null, identifier, rel.getProperties(identifier).toString());
//            if (existingRel != null && existingRel.getId() != rel.getId()) {
//                throw new Exception("Another rel with UUID " + identifier + " already exists (" + existingRel + ")!");
//            }
//        }
    }

}
