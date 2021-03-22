package com.els.romenext.core.neo4j.workspace;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.CoreServices;
import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.RelationshipCoreServices;
import com.els.romenext.core.connection.ConnectionService;
import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeRuleProperty;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.db.enums.RomeRulePropertyEnum;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.db.enums.rule.RuleTypeEnum;
import com.els.romenext.core.db.neo4j.conns.Neo4jConnection;
import com.els.romenext.core.db.neo4j.conns.Neo4jServerConnection;
import com.els.romenext.core.db.neo4j.dao.Neo4jNodeDao;
import com.els.romenext.core.db.neo4j.dao.Neo4jRelationshipDao;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.entity.flatstyle.Graph;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.enums.ValueTypeEnum;
import com.els.romenext.core.neo4j.relationship.Neo4jRelationshipServices;
import com.els.romenext.core.rule.RuleService;
import com.els.romenext.core.util.RomeConnectionUtils;
import com.els.romenext.core.util.RomeRuleUtils;
import com.els.romenext.core.util.rel.RelationshipBuilder;

/**
 * Used for any calls that should hit the neo4j eventually that is related to path node
 */

public class Neo4jWorkspaceServices {

	private static Logger logger = Logger.getLogger( Neo4jWorkspaceServices.class );

	private Neo4jNodeDao neo4jNodeDao;
	private Neo4jRelationshipDao neo4jRelationshipDao;
	private NodeCoreServices nodeServices;
	private RelationshipCoreServices relationshipCoreServices;
	private Neo4jRelationshipServices neo4jRelServices;

	private String namespace;

	public Neo4jWorkspaceServices( String namespace, String neo4jServerUrl, String usernamePassword) {

		this.namespace = namespace;

		this.neo4jNodeDao = new Neo4jNodeDao( new Neo4jServerConnection<Neo4jNode>(neo4jServerUrl, usernamePassword) );
		this.neo4jRelationshipDao = new Neo4jRelationshipDao( new Neo4jServerConnection<Neo4jRelationship>(neo4jServerUrl, usernamePassword) );
		this.nodeServices = new NodeCoreServices( new Neo4jServerConnection<Neo4jNode>(neo4jServerUrl, usernamePassword), this.namespace );
		this.relationshipCoreServices = new RelationshipCoreServices( this.namespace, new Neo4jServerConnection<Neo4jRelationship>(neo4jServerUrl, usernamePassword) );
		this.neo4jRelServices = new Neo4jRelationshipServices( this.namespace, new Neo4jServerConnection<Neo4jRelationship>(neo4jServerUrl, usernamePassword) );
	}

	public Neo4jWorkspaceServices( String namespace, Neo4jConnection<Neo4jNode> nodeConn, Neo4jConnection<Neo4jRelationship> relationshipConn ) {

		this.namespace = namespace;

		this.neo4jNodeDao = new Neo4jNodeDao(nodeConn);
		this.neo4jRelationshipDao = new Neo4jRelationshipDao(relationshipConn);
		this.nodeServices = new NodeCoreServices( nodeConn, this.namespace  );
		this.relationshipCoreServices = new RelationshipCoreServices( this.namespace, relationshipConn );
		this.neo4jRelServices = new Neo4jRelationshipServices( this.namespace, relationshipConn ) ;

	}

	public Neo4jNodeDao getNeo4jNodeDao() {
		return neo4jNodeDao;
	}

	public Neo4jRelationshipDao getNeo4jRelationshipDao() {
		return neo4jRelationshipDao;
	}

	public NodeCoreServices getNodeServices() {
		return nodeServices;
	}

	public RelationshipCoreServices getRelationshipCoreServices() {
		return relationshipCoreServices;
	}

	public Neo4jRelationshipServices getNeo4jRelServices() {
		return neo4jRelServices;
	}

	public Node createWorkspaceNode( Node node, MetadataRepoContainer metadataRepo ) {

		if (node == null) {
			logger.error("No Node Found");
			return null;	
		}

		if (!node.hasTypeId()) {
			logger.error("No Type Id Found");
			return null;
		}

		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;	
		}

		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;			
		}

		if( RomeTypeClassificationEnum.WORKSPACE != RomeTypeClassificationEnum.getEnum( node.getClassification() ) ) {
			logger.error("Node was not a path!");
			return null;	
		}

		NodeCoreServices nserv = this.getNodeServices(); 

		return nserv.createNode(node, metadataRepo);

	}

	public Path addNodesToWorkspaceNode( Node workspaceNode, List<Node> nodes, MetadataRepoContainer metadataRepo ) {

		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;	
		}

		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;			
		}

		if (workspaceNode == null) {
			logger.error("No workspaceNode Node Found");
			return null;	
		}

		if (!workspaceNode.hasUuid()) {
			logger.error("No workspaceNode Node Uuid Found");
			return null;
		}

		if( RomeTypeClassificationEnum.WORKSPACE != RomeTypeClassificationEnum.getEnum(workspaceNode.getClassification())) {
			logger.error("workspaceNode Node Is Not WORKSPACE Node");
			return null;	
		}

		if (CollectionUtils.isEmpty(nodes)) {
			logger.error("No Node Found");
			return null;
		}

		for (Node n : nodes) {
			if (n == null) {
				logger.error("Invalid Node Input");
				return null;
			}
			if (!n.hasUuid()) {
				logger.error("Invalid Node Input");
				return null;
			}
			if( RomeTypeClassificationEnum.NODE != RomeTypeClassificationEnum.getEnum(n.getClassification())) {
				logger.error("Node Is Not Node");
				return null;	
			}
		}




		Path results = new Path();

		CoreServices cserv = new CoreServices( this.namespace );
		RelationshipCoreServices rserv = this.getRelationshipCoreServices();
		ConnectionService connServ = new ConnectionService( this.namespace ); 



		for (Node n : nodes) {

			// we are looking ONLY for connection/rules that 
			List<Relationship> conns = connServ.getConnectionsFiltered( workspaceNode.getTypeId(),  n.getTypeId(),  RuleTypeEnum.NODETONODE, metadataRepo.getMetadata() );


			if (CollectionUtils.isEmpty( conns )) {

				/**
				 * TODO: Re think this.
				 * 
				 * While this makes sense for a lot of things, for things that really don't care about WHAT is being connected, should we create a way to ignore this feature?
				 */

				// if no connection exists currently, we are going to auto create a connection between the path type and node type

				// how do we ensure that these are going to be unique?

				// if there is no, create rule and connetion
				RomeTypeDao typeDao = new RomeTypeDao( this.namespace );
				RomeType workspaceType = typeDao.get( workspaceNode.getTypeId() );

				RomeType destinationType = typeDao.get( n.getTypeId() );		

				RomeConnectionUtils rcUtils = new RomeConnectionUtils( this.namespace );	
				String finalTokenedName = rcUtils.generateInternalPathName( "", "", workspaceType.getName(), destinationType.getName() );


				// service call
				RuleService ruleService = new RuleService( this.namespace );



				// create a new rule that is of the type PATHTONODE

				int count = 0;
				String baseRuleName = "RULE";
				String finalRuleName = baseRuleName + count;
				while( ruleService.doesRuleExist( finalTokenedName + finalRuleName, metadataRepo.getMetadata() ) ) {
					finalRuleName = baseRuleName + (++count);
				};


				// create the final RULE
				RomeRule rule = ruleService.createRuleNode( finalTokenedName + finalRuleName, true, RomeRuleClassificationEnum.PARENTCHILD, metadataRepo.getMetadata(), RuleTypeEnum.NODETONODE );

				//				 should we be double checking the connection names?
				// creat the final CONNECTION
				RomeConnection romeConnection = cserv.createConnection( finalTokenedName + "CONN", rule, workspaceType.getId(), destinationType.getId(), RomeRuleClassificationEnum.PARENTCHILD, 0, -1, metadataRepo.getMetadata() );





				Relationship connection = RelationshipBuilder.build(romeConnection);
				Path path = rserv.createEdge(connection, workspaceNode, n, metadataRepo);


				results.getNodes().addAll( path.getNodes() );
				results.getRelationships().addAll( path.getRelationships() ); 



			} else {

				// if we found a connection
				// ensure we only have 1 connection/relationship to use
				if( conns.size() == 1 ) {
					Relationship connection = conns.get(0);


					// double check to make sure this connection does not alreayd exist
					// NOTE: This should be done better?

					Path doublecheck = rserv.getConnection(connection, workspaceNode, n, metadataRepo);

					if( doublecheck != null ) {
						// doubling?
					} else {
						// no path found?

						Path path = rserv.createEdge(connection, workspaceNode, n, metadataRepo);

						if( path == null ) {
							logger.error("Failed to create the path!");
							return null;
						}
						results.getNodes().addAll( path.getNodes() );
						results.getRelationships().addAll( path.getRelationships() );

					}




				}


			}

		} 

		return results;

	}

	/**
	 * This method will add the nodes to the workspace.
	 * 
	 * For the edgeProperties: These are for any reference properties that need to be assigned to the edge between the workspace and the node. 
	 * NOTE: These are generally internal properties (ie. xyz) that are not created by the user. As such, we will be auto-generating these 
	 * properties on the fly:
	 * 
	 * 1. Create the RULE if neccessary between WORKSPACETYPE -> NODETYPE
	 * 2. Create CONNECTION if necessary between WORKSPACETYPE -> NODETYPE
	 * 3. Create RULE PROPERTIES if necessary between WORKSPACETYPE -> NODETYPE
	 * 4. Create NODE for WORKSPACETYPE if needed
	 * 5. Create NODE for NODETYPE if needed. (actually, this should never be needed. The NODE should already exist before entering here)
	 * 6. Create EDGE between NODE of WORKSPACETYPE and NODE of NODETYPE
	 * 7. Add properties to EDGE 
	 * 
	 * @param workspaceNode
	 * @param nodes
	 * @param edgeProperties
	 * @param metadataRepo
	 * @return
	 */
	public Path addNodesToWorkspaceNode( Node workspaceNode, List<Node> nodes, Map<String,List<Property>> edgeProperties, MetadataRepoContainer metadataRepo ) {

		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;	
		}

		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;			
		}

		if (workspaceNode == null) {
			logger.error("No workspaceNode Node Found");
			return null;	
		}

		if (!workspaceNode.hasUuid()) {
			logger.error("No workspaceNode Node Uuid Found");
			return null;
		}

		if( RomeTypeClassificationEnum.WORKSPACE != RomeTypeClassificationEnum.getEnum(workspaceNode.getClassification())) {
			logger.error("workspaceNode Node Is Not WORKSPACE Node");
			return null;	
		}

		if (CollectionUtils.isEmpty(nodes)) {
			logger.error("No Node Found");
			return null;
		}

		for (Node n : nodes) {
			if (n == null) {
				logger.error("Invalid Node Input");
				return null;
			}
			if (!n.hasUuid()) {
				logger.error("Invalid Node Input");
				return null;
			}
			if( RomeTypeClassificationEnum.NODE != RomeTypeClassificationEnum.getEnum(n.getClassification())) {
				logger.error("Node Is Not Node");
				return null;	
			}
		}




		Path results = new Path();

		CoreServices cserv = new CoreServices( this.namespace );
		RelationshipCoreServices rserv = this.getRelationshipCoreServices();
		ConnectionService connServ = new ConnectionService( this.namespace ); 



		for (Node n : nodes) {

			// we are looking ONLY for connection/rules that 
			List<Relationship> conns = connServ.getConnectionsFiltered( workspaceNode.getTypeId(),  n.getTypeId(),  RuleTypeEnum.NODETONODE, metadataRepo.getMetadata() );


			if (CollectionUtils.isEmpty( conns )) {

				/**
				 * TODO: Re think this.
				 * 
				 * While this makes sense for a lot of things, for things that really don't care about WHAT is being connected, should we create a way to ignore this feature?
				 */

				// if no connection exists currently, we are going to auto create a connection between the path type and node type

				// how do we ensure that these are going to be unique?

				// if there is no, create rule and connetion
				RomeTypeDao typeDao = new RomeTypeDao( this.namespace );
				RomeType workspaceType = typeDao.get( workspaceNode.getTypeId() );

				RomeType destinationType = typeDao.get( n.getTypeId() );		

				RomeConnectionUtils rcUtils = new RomeConnectionUtils( this.namespace );	
				String finalTokenedName = rcUtils.generateInternalPathName( "", "", workspaceType.getName(), destinationType.getName() );


				// service call
				RuleService ruleService = new RuleService( this.namespace );



				// create a new rule that is of the type PATHTONODE

				int count = 0;
				String baseRuleName = "RULE";
				String finalRuleName = baseRuleName + count;
				while( ruleService.doesRuleExist( finalTokenedName + finalRuleName, metadataRepo.getMetadata() ) ) {
					finalRuleName = baseRuleName + (++count);
				};





				// create the final RULE
				RomeRule rule = ruleService.createRuleNode( finalTokenedName + finalRuleName, true, RomeRuleClassificationEnum.PARENTCHILD, metadataRepo.getMetadata(), RuleTypeEnum.NODETONODE );


				// if we found reference properties, we need to add this to the rule properties for this rule


				/**
				 * How can the rule property/fields be here anything BUT nothing?
				 * TODO: Delete the bottom code?
				 */
				// create a rule property map to check for validation
				List<RomeRuleProperty> ruleProps = rule.getFields();
				Map<String, RomeRuleProperty> rulePropMap = new HashMap<String, RomeRuleProperty>();
				for( RomeRuleProperty rp : ruleProps ) {
					rulePropMap.put( rp.getName(),  rp );
				}
				/**
				 * End of potential useless code.
				 */



				if( MapUtils.isNotEmpty( edgeProperties ) ) {

					List<Property> props = edgeProperties.get( n.getId() );
					List<RomeRuleProperty> toAdd = new ArrayList<RomeRuleProperty>();
					List<RomeRuleProperty> toSave = new ArrayList<RomeRuleProperty>();

					if( !CollectionUtils.isEmpty( props ) ) {

						for( Property pp : props ) {

							// build the property
							//							RomeRuleProperty prop = GeneralRomeRulePropertyRequest.build( rule, r );

							// We need to do a check to see if 
							// there are already properties of this. We don't want to add duplicate xyz properties

							if( !rulePropMap.containsKey( pp.getName() ) ) {
								RomeRuleProperty newProp = RomeRuleUtils.build( pp );

								if( newProp != null ) { 

									newProp.setRomeRule( rule );
									toAdd.add( newProp );
								} else {
									// ? 

								}


							} else {
								// already there?
								// ignore this
							}



						}

					}


					// update the rule if toAdd's were found
					if( CollectionUtils.isNotEmpty( toAdd ) ) {

						// save the updated properties
						for( RomeRuleProperty p : toAdd ) {
							rule.getFields().add( p );
						}



						RomeRuleDao ruleDao = new RomeRuleDao( this.namespace );

						ruleDao.getTransaction().begin(); 
						ruleDao.save( rule ); 
						ruleDao.getTransaction().commit();
					}
				}




				//				 should we be double checking the connection names?
				// creat the final CONNECTION
				RomeConnection romeConnection = cserv.createConnection( finalTokenedName + "CONN", rule, workspaceType.getId(), destinationType.getId(), RomeRuleClassificationEnum.PARENTCHILD, 0, -1, metadataRepo.getMetadata() );



				Relationship connection = RelationshipBuilder.build(romeConnection);

				// note: if we had passed in edge properties for this workspace -> node entry, we need to save the actual properties of these to the edge
				if( MapUtils.isNotEmpty( edgeProperties ) ) {

					List<Property> props = edgeProperties.get( n.getId() );

					if( CollectionUtils.isNotEmpty( props ) ) {

						// if we find properties, try to save the properties into the edge

						//						Map<String, Property> currentProps = connection.getRuleProperties();

						for( Property p : props ) {
							connection.addRuleProperty( p.getId(), p); 
						}

					}

				} 



				Path path = rserv.createEdge(connection, workspaceNode, n, metadataRepo);


				results.getNodes().addAll( path.getNodes() );
				results.getRelationships().addAll( path.getRelationships() ); 



			} else {

				// if we found a connection
				// ensure we only have 1 connection/relationship to use
				if( conns.size() == 1 ) {
					Relationship connection = conns.get(0);


					// double check to make sure this connection does not alreayd exist
					// NOTE: This should be done better?

					Path doublecheck = rserv.getConnection(connection, workspaceNode, n, metadataRepo);

					if( doublecheck != null ) {
						// doubling?
					} else {
						// no path found?


						// note: if we had passed in edge properties for this workspace -> node entry, we need to save the actual properties of these to the edge
						if( MapUtils.isNotEmpty( edgeProperties ) ) {

							/**
							 * For these edge properties, this really sucks.
							 * 
							 * 1. If the connection exists, and reference property exists
							 * 2. We need to GRAB the connection that exists
							 * 3. Load all the properties that are assigned to this RULE
							 * 4. Check to see if the edge properties are ALREADY assigned
							 * 5. IF EXISTS:
							 * 			a. Good?
							 * 			b. Just add it to the edge with the appropriate id
							 * 6. IF DOES NOT EXISTS:
							 * 			a. We need to add this to the RULE property list FIRST
							 * 			b. We then add this to the edge		
							 * 
							 * 
							 * 
							 * 
							 */


							Long connId = connection.getConnectionId();

							if( connId == null ) {
								// this can never happen?r
								return null;
							}

							RomeConnectionDao connDao = new RomeConnectionDao( this.namespace );

							RomeConnection conn = connDao.get( connId );

							if( conn == null ) {
								logger.error("Couldn't find this connection" + connId );
								return null;
							}


							RomeRule romeRule = conn.getRomeRule();

							/**
							 * This sucks a bit. We have a set of rule properties, but for workspaces, we really care about connection properties, which we don't have.
							 * For now, work with the rule properties
							 */

							List<RomeRuleProperty> fields = romeRule.getFields();
							Map<String, RomeRuleProperty> fieldMapViaName = new HashMap<String, RomeRuleProperty>();
							Map<String, RomeRuleProperty> fieldMapViaId = new HashMap<String, RomeRuleProperty>();
							
							for( RomeRuleProperty rp : fields ) {
								String name = rp.getName();

								fieldMapViaName.put( name,  rp );
								fieldMapViaId.put( rp.getId().toString(),  rp );
							}

							// check to see if the current list of edge properties 
							List<Property> props = edgeProperties.get( n.getId() );
							List<RomeRuleProperty> toAdd = new ArrayList<RomeRuleProperty>();
							
							
							
							RomeRuleUtils ruleUtils = new RomeRuleUtils( this.namespace );
							
							if( CollectionUtils.isNotEmpty( props ) ) {


								// check to see if this property exists

								for( Property p : props ) {

									String id = p.getId();
									String name = p.getName();
									
									// if the prop has an ID, double check to seee if it's valid
									if( StringUtils.isEmpty( id ) ) {
										
										// if no id, check to see if a property already exists with this name
										if( fieldMapViaName.containsKey( name )) {
											// if the fields also have a field with the same name, double check to see if the types are the same
											RomeRuleProperty propCheck = fieldMapViaName.get( name );
											
											RomeRulePropertyEnum sanityCheck1 = propCheck.getPropertyTypeEnum();
											RomeRulePropertyEnum sanityCheck2 = ValueTypeEnum.convertToRulePropertyEnum( p.getPropertyTypeEnum() );
											
											if( sanityCheck1 != sanityCheck2  ) {
												logger.error("Attempt to assign a property that already exists and has a different property type [" + sanityCheck1.getValue() + "]!=[" + sanityCheck2.getValue() + "]");
												return null;
											}
											
											// if we get here, means everything is ok
											// just update the id
											p.setId( propCheck.getId().toString() );
											
										} else {
											// if the name wasn't found, we need to add this 
											RomeRuleProperty r = RomeRuleUtils.build( p ); 
											r.setRomeRule( romeRule );
											toAdd.add( r );
											
										} 
										
									} else {
										
										// if we have an ID, we need to:
										// 1. check if ID exists on the current list
										// 2. If we find the ID, validate the name/type
										// 3. if it doesn't exist....? Weird, but just add it?
										
										if( fieldMapViaId.containsKey( id ) ) {
											
											// if the fields also have a field with the same name, double check to see if the types are the same
											RomeRuleProperty propCheck = fieldMapViaId.get( name );
											
											RomeRulePropertyEnum sanityCheck1 = propCheck.getPropertyTypeEnum();
											RomeRulePropertyEnum sanityCheck2 = ValueTypeEnum.convertToRulePropertyEnum( p.getPropertyTypeEnum() );
											
											if( sanityCheck1 != sanityCheck2  ) {
												logger.error("Attempt to assign a property that already exists and has a different property type [" + sanityCheck1.getValue() + "]!=[" + sanityCheck2.getValue() + "]");
												return null;
											}
											
											// if we get here, means everything is ok
											// just update the id
											p.setId( propCheck.getId().toString() );
											
											
											
										} else {
											RomeRuleProperty r = RomeRuleUtils.build( p ); 
											r.setRomeRule( romeRule );
											toAdd.add( r );
										}
										
									} 

								}


								// at this point, we want to take all the rule properties in the toAdd, and update them
								// try to just add it to the rule
								for( RomeRuleProperty p : toAdd ) {
									fields.add( p );
								}
								
								romeRule.setFields( fields );
								
								RomeRuleDao romeRuleDao = new RomeRuleDao( this.namespace );
								
								romeRuleDao.getTransaction().begin();
								romeRuleDao.save( romeRule );
								romeRuleDao.getTransaction().commit();
								romeRuleDao.refresh( romeRule );;
								
								List<RomeRuleProperty> updatedFields = romeRule.getFields();
								
								
								// we want to back fill the id's that are missing
								// we need to get a re-map of the rule properties again
								fieldMapViaName.clear();
								fieldMapViaId.clear();
								
								for( RomeRuleProperty rp : updatedFields ) {
									String name = rp.getName();

									fieldMapViaName.put( name,  rp );
									fieldMapViaId.put( rp.getId().toString(),  rp );
								}
								
								// BEFORE we save the edges, we need to now update the property list we originally had to ensure they all have id's
//								List<RomeRuleProperty> emptyIds = updatedFields.stream().filter( r -> r.getId() == null ).collect( Collectors.toList() );
								
								for( Property p : props ) {
									
									String idcheck = p.getId();
									
									if( StringUtils.isEmpty( idcheck ) ) {
										// shouldn't be any? but make sure
										String name = p.getName();
										
										RomeRuleProperty toAssign = fieldMapViaName.get( name );
										
										p.setId( toAssign.getId().toString() );
									}
									
									
								}
								
								
								
								// FINALLY
								// LAST STEP
								
								// if we find properties, try to save the properties into the edge 
								for( Property p : props ) { 
									connection.addRuleProperty( p.getId(), p); 
								}

							}

						} 





						Path path = rserv.createEdge(connection, workspaceNode, n, metadataRepo);

						if( path == null ) {
							logger.error("Failed to create the path!");
							return null;
						}
						results.getNodes().addAll( path.getNodes() );
						results.getRelationships().addAll( path.getRelationships() );

					}




				} else {
					// if multiple connections were found, how do we know which one to use?
					// for now return error
					logger.error("Failed to find just a single connection, not sure which one to use");
					return null;
				}


			}

		} 

		return results;

	}


	//	public Path getWorkspaceNode( Node workspace, MetadataRepoContainer metadataRepo ) {
	//		
	//		if (metadataRepo == null) {
	//			logger.error("No Metadata Repo Found");
	//			return null;	
	//		}
	//		
	//		if (metadataRepo.getMetadata() == null) {
	//			logger.error("No Metadata Found");
	//			return null;			
	//		}
	//		
	//		if (workspace == null) {
	//			logger.error("No Worskpace Node Found");
	//			return null;	
	//		}
	//		
	//		if (!workspace.hasUuid()) {
	//			logger.error("No Worskpace Node Uuid Found");
	//			return null;
	//		}
	//	
	//		if( RomeTypeClassificationEnum.WORKSPACE != RomeTypeClassificationEnum.getEnum(workspace.getClassification())) {
	//			logger.error("Worskpace Node Is Not Worskpace Node");
	//			return null;	
	//		}
	//		
	//		Path results = new Path();
	//		
	//		CoreServices cserv = new CoreServices( this.namespace );
	//		RelationshipCoreServices rserv = this.getRelationshipCoreServices();
	//		ConnectionService connServ = new ConnectionService( this.namespace ); 
	//		
	//		
	//		
	//		
	//		
	//		
	//		
	//		
	//		// this is a bit brutal on the way this is beign done right now
	//		// just hack this in for now
	//		
	//		
	//		
	//		List<Relationship> conns = connServ.getConnectionsFiltered( pathNode.getTypeId(), RuleTypeEnum.PATHTONODE, metadataRepo.getMetadata() );
	//
	//		
	//		// this is only the list of the connections that we want to look for
	//		Path connectionFrom = rserv.getConnectionFrom( pathNode,  metadataRepo );
	//		
	//		
	//		return connectionFrom;
	//		
	////		
	////		results.setRelationships( conns );
	////		
	////		
	////		
	////		
	////	
	////
	////		// TODO: Should remove all the duplicated nodes and edges
	////		
	////		return results;
	//		
	//	}

	public Graph getWorkspaceNodes( Node workspace, MetadataRepoContainer metadataRepo ) {

		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;	
		}

		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;			
		}

		if (workspace == null) {
			logger.error("No Worskpace Node Found");
			return null;	
		}

		/**
		 * Not sure if we want to enforce this or not right now. 
		 */
		//		if (!workspace.hasUuid()) {
		//			logger.error("No Worskpace Node Uuid Found");
		//			return null;
		//		}

		if( RomeTypeClassificationEnum.WORKSPACE != RomeTypeClassificationEnum.getEnum(workspace.getClassification())) {
			logger.error("Worskpace Node Is Not Worskpace Node");
			return null;	
		}

		Path results = new Path();

		CoreServices cserv = new CoreServices( this.namespace );
		RelationshipCoreServices rserv = this.getRelationshipCoreServices();
		ConnectionService connServ = new ConnectionService( this.namespace ); 








		// this is a bit brutal on the way this is beign done right now
		// just hack this in for now



		//	List<Relationship> conns = connServ.getConnectionsFiltered( pathNode.getTypeId(), RuleTypeEnum.PATHTONODE, metadataRepo.getMetadata() );



		Graph result = new Graph();

		Path workspaceNodes = rserv.getConnectionFrom(workspace, metadataRepo);

		if( workspaceNodes == null ) {
			// no nodes currently in this workspace
			return result;
		}

		Map<String,Node> coreNode = new HashMap<String, Node>();
		Set<String> orphanCheck = new HashSet<String>(); 

		// rip out the actual nodes 
		if( workspaceNodes.getRelationships() != null ) {
			for( Relationship r : workspaceNodes.getRelationships() ) {
				coreNode.put( r.getDestinationUuid(),  r.getDestinationNode() );
				orphanCheck.add( r.getDestinationUuid() );
			}
		}



		// this is only the list of the connections that we want to look for
		Path connectionFrom = rserv.getConnectionFromWithAttachedRelationships( workspace,  metadataRepo );

		List<Relationship> realRels = new ArrayList<Relationship>();

		if( connectionFrom.getRelationships() != null ) {
			for( Relationship r : connectionFrom.getRelationships() ) {
				if( coreNode.containsKey( r.getDestinationUuid() ) && coreNode.containsKey( r.getOriginUuid() ) ) {

					// this relationship exists
					realRels.add( r );

					if( coreNode.containsKey( r.getDestinationUuid() )) {
						orphanCheck.remove( r.getDestinationUuid() );
					}
					if( coreNode.containsKey( r.getOriginUuid() )) {
						orphanCheck.remove( r.getOriginUuid() );
					}
				}
			}
		}


		result.setRelationships( realRels );

		List<Node> orphanNodes = new ArrayList<Node>();

		// add any orphans
		for( String s : orphanCheck ) {
			orphanNodes.add( coreNode.get( s ) );
		}

		result.setNodes( orphanNodes );

		return result;

		//	
		//	results.setRelationships( conns );
		//	
		//	
		//	
		//	
		//
		//
		//	// TODO: Should remove all the duplicated nodes and edges
		//	
		//	return results;

	}



	/**
	 * ??? 
	 * 
	 * Duplicate method? 
	 * 
	 * 
	 * @param workspace
	 * @param metadataRepo
	 * @return
	 */
	@Deprecated
	public boolean deleteWorkspaceNodeLinks( Node workspace, MetadataRepoContainer metadataRepo ) {

		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return false;	
		}

		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return false;			
		}

		if (workspace == null) {
			logger.error("No Worskpace Node Found");
			return false;	
		}

		if (!workspace.hasUuid()) {
			logger.error("No Worskpace Node Uuid Found");
			return false;
		}

		if( RomeTypeClassificationEnum.WORKSPACE != RomeTypeClassificationEnum.getEnum(workspace.getClassification())) {
			logger.error("Worskpace Node Is Not Worskpace Node");
			return false;	
		}

		Path results = new Path();

		CoreServices cserv = new CoreServices( this.namespace );
		RelationshipCoreServices rserv = this.getRelationshipCoreServices();
		ConnectionService connServ = new ConnectionService( this.namespace ); 








		// this is a bit brutal on the way this is beign done right now
		// just hack this in for now



		//	List<Relationship> conns = connServ.getConnectionsFiltered( pathNode.getTypeId(), RuleTypeEnum.PATHTONODE, metadataRepo.getMetadata() );

		Path deletedWorkspace = rserv.deleteConnectionFrom(workspace, metadataRepo);

		return true;
	}

	/**
	 * This will delete all nodes GOING from the workspace node.
	 * 
	 * In essence, this will simply delete/empty the workspace (though it will leave the actual workspace still in the system).
	 * 
	 * @param workspace
	 * @param metadataRepo
	 * @return
	 */
	public boolean deleteWorkspaceNode( Node workspace, MetadataRepoContainer metadataRepo ) {

		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return false;	
		}

		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return false;			
		}

		if (workspace == null) {
			logger.error("No Worskpace Node Found");
			return false;	
		}

		if (!workspace.hasUuid()) {
			logger.error("No Worskpace Node Uuid Found");
			return false;
		}

		if( RomeTypeClassificationEnum.WORKSPACE != RomeTypeClassificationEnum.getEnum(workspace.getClassification())) {
			logger.error("Worskpace Node Is Not Worskpace Node");
			return false;	
		}

		Path results = new Path();

		CoreServices cserv = new CoreServices( this.namespace );
		RelationshipCoreServices rserv = this.getRelationshipCoreServices();
		ConnectionService connServ = new ConnectionService( this.namespace ); 







		// this is a bit brutal on the way this is beign done right now
		// just hack this in for now



		//	List<Relationship> conns = connServ.getConnectionsFiltered( pathNode.getTypeId(), RuleTypeEnum.PATHTONODE, metadataRepo.getMetadata() );

		Path deletedWorkspace = rserv.deleteConnectionFrom(workspace, metadataRepo);



		return true;
	}

	/**
	 * This will remove any of the given nodes from the passed in workspace.
	 * 
	 * Note: This will not DELETE anything, but simply remove the connections. 
	 * 
	 * @param workspaceNode
	 * @param nodes
	 * @param metadataRepo
	 * @return
	 */
	public boolean removeNodesFromWorkspaceNode( Node workspaceNode, List<Node> toDeleteNodes, MetadataRepoContainer metadataRepo ) {

		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return false;	
		}

		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return false;			
		}

		if (workspaceNode == null) {
			logger.error("No workspaceNode Node Found");
			return false;	
		}

		if (!workspaceNode.hasUuid()) {
			logger.error("No workspaceNode Node Uuid Found");
			return false;
		}

		if( RomeTypeClassificationEnum.WORKSPACE != RomeTypeClassificationEnum.getEnum(workspaceNode.getClassification())) {
			logger.error("workspaceNode Node Is Not WORKSPACE Node");
			return false;	
		}

		if (CollectionUtils.isEmpty(toDeleteNodes)) {
			logger.error("No Node Found");
			return false;
		}

		for (Node n : toDeleteNodes) {
			if (n == null) {
				logger.error("Invalid Node Input");
				return false;
			}
			if (!n.hasUuid()) {
				logger.error("Invalid Node Input");
				return false;
			}
			if( RomeTypeClassificationEnum.NODE != RomeTypeClassificationEnum.getEnum(n.getClassification())) {
				logger.error("Node Is Not Node");
				return false;	
			}
		}



		Path results = new Path();

		CoreServices cserv = new CoreServices( this.namespace );
		RelationshipCoreServices rserv = this.getRelationshipCoreServices();
		ConnectionService connServ = new ConnectionService( this.namespace ); 


		for( Node destNode : toDeleteNodes ) {

			// we need to find the appropriate relationsihp between the start (workspace) to end node (node in workspace).
			// we are looking ONLY for connection/rules that 
			List<Relationship> conns = connServ.getConnectionsFiltered( workspaceNode.getTypeId(),  destNode.getTypeId(),  RuleTypeEnum.NODETONODE, metadataRepo.getMetadata() );


			if (CollectionUtils.isEmpty( conns )) {
				/**
				 * OK, if we did NOT find a connection to use, how can there be a connection currently between this workspace and node?
				 * 
				 * Is this something we should just force? ie. Delete any arbitrary relationship between workspace and node?
				 * Or attempt to fix?
				 * 
				 * For now, just skip and error output.
				 */
				logger.error( "Failed to find a relationship between workspace and node! How is this possible? " + destNode );
			} else {
				// if we found a connection, get it, build a relationship, and delete that relationship!
				if( conns.size() == 1 ) {
					Relationship rel = conns.get(0);

					boolean deleteRelationship = this.getNeo4jRelServices().deleteRelationship(rel, workspaceNode, destNode, metadataRepo);			

					if( !deleteRelationship ) {
						// something went wrong, fail over
						logger.error( "Failed to find a success state after attmpting to delete a relationship");
						return false;
					}
				} else {
					// we found a number greater than 1? How is this possible?
					logger.error("Found more one than relationship between connection from Workspace to node? " + conns.size() );
				}
			}


		}



		return true;

	}

}
