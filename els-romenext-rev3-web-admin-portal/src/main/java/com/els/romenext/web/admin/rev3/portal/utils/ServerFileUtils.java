package com.els.romenext.web.admin.rev3.portal.utils; 

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
 


public class ServerFileUtils {

	private static Logger logger = Logger.getLogger( ServerFileUtils.class );
	public final static String CACHE_DIR = "/opt/els/romenext/admin/server";
	
	public final static String CHECKSUM_POSTFIX = "_CHKSM";
	public final static String SEQ_POSTFIX = "_SL";
	public final static String SEQ_EXT = "SL";


	public void cacheServer( List<MetadataServer> servers ) {
		
		System.out.println("############## caching image");
		
		if( CollectionUtils.isEmpty( servers ) ) {
			// if there are no system properties, can't make a cache anyways
			System.out.println("No servers ");
			return;
		}
		
		JSONArray serverJsonArray = new JSONArray();
		
		// for now just convert to json 
		for( MetadataServer s : servers ) {
			
			JSONObject json = new JSONObject();
			
			json.put( "boxname",  s.getBoxname() );
			json.put( "port",  s.getPort() );
			json.put( "hash",  s.getHash() );
			json.put( "index",  s.getIndex()  );
			json.put( "ip",  s.getIp() );
			json.put( "pw",  s.getPw() );
			json.put( "schema",  s.getSchema() );
			json.put( "username",  s.getUsername() );
		}
		
		
//		
//		System.out.println("## Inside getCache for " + hashedFilename  );
//		
//		final String filename = hashedFilename;
//		final String imgDir = ServerFileUtils.CACHE_DIR + File.separatorChar + corelabel + File.separatorChar + uuid + File.separatorChar + propertyId;
//		String fullImgPath = null;
//		
//		try {
//			Integer seqNum = this.findCurrentSeqNumber(corelabel, uuid, propertyId, hashedFilename);
//
//			//			if( seqNum == null ) {
//			//				seqNum = 1;
//			//			} else {
//			//				seqNum
//			//			}
//
//			fullImgPath = imgDir + File.separatorChar + filename  + SEQ_POSTFIX + seqNum;    	  
//
//
//			File f = new File( fullImgPath );
//			
//			System.out.println("Got the file : " + f );
//
//			byte[] imgByteArr = FileUtils.readFileToByteArray( f );				
//			return imgByteArr;
//
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
////			e.printStackTrace();
//			System.out.println("Failed to find the file : " + fullImgPath );
//			logger.error("Failed to find the file : " + fullImgPath, e );
//			return null;
//		}
//		
//		
//		
////		System.out.println("Wtf: " + valueType );
//		Neo4jProperty uuid = systemProperties.get( RomeNodeSystemPropertyEnum.UUID.getValueType() );
//
//		System.out.println("What is the uuid : " + uuid );
//
//
//		if( uuid != null && MapUtils.isNotEmpty( dataHoldingNeo4jNode.getTypedProperties() )) {
//			Map<String, Neo4jProperty> typedProperties = dataHoldingNeo4jNode.getTypedProperties();
//
//			
//			for( String key : typedProperties.keySet() ) {
//				//						for( Neo4jProperty p : typedProperties.values() ) {
//
//				Neo4jProperty p = typedProperties.get( key );
//
//				if( p.getType() == Neo4jPropertyEnum.FILE ) {
//					// save it 
//
//					if( StringUtils.isEmpty( dataHoldingNeo4jNode.getCoreLabel() ) || StringUtils.isEmpty( uuid.getStringValue() ) ) {
//						// we are in trouble if either of these are null
////						return;
//					}
//					
//					if( p.getValue() == null || !( p.getValue() instanceof Map )) {
//						return;
//					}
//
//					// get the map
//					// note: BEFORE this is retrieved from the neo4j db, this will be converted intoa  file
//					Map<String,Object> fileMap = (Map<String,Object>) p.getValue();
//
//					String filename = (String) fileMap.get( ImageCacheMapKeyEnum.FILENAME.getValueType());
//					byte[] file = (byte[]) fileMap.get( ImageCacheMapKeyEnum.FILE.getValueType() );
//
//					ServerFileUtils utils = new ServerFileUtils();
//
//					// we original used the "CORE LABEL" but we haven't used that a lot of the time
//					// we will try to either grab the CORE or any label
//					
//					utils.cacheImg( this.getALabelToStoreImages( dataHoldingNeo4jNode ), uuid.getStringValue(), key, filename , null, file );
//				}
//			}
//
//		}
	}
	
//	
//	private String getALabelToStoreImages( Neo4jNode node ) {
//		if( StringUtils.isNotEmpty( node.getCoreLabel() ) ) {
//			return node.getCoreLabel();
//		}
//		if( CollectionUtils.isNotEmpty( node.getLabels() ) ) {
//			for( String label : node.getLabels() ) {
//				return label;
//			}
//		}
//		return null;
//	}
//	
//	public void getCacheImg( Neo4jNode node ) {
//		
//		System.out.println("");
//		
////		System.out.println("NODE: " + node );
//		Map<String, Neo4jProperty> systemProperties = node.getSystemProperties();
//
//		if( MapUtils.isEmpty( systemProperties ) ) {
//			return;
//		}
//		
//		Neo4jProperty uuid = systemProperties.get( RomeNodeSystemPropertyEnum.UUID.getValueType() );
//
////		System.out.println("What is the uuid : " + uuid );
//
//
//		if( uuid != null ) {
//			Map<String, Neo4jProperty> typedProperties = node.getTypedProperties();
//
//			if( MapUtils.isEmpty( typedProperties ) ) {
//				// if no type properties, nothing to do
//				return;
//			}
//			
//			for( String key : typedProperties.keySet() ) {
//				//						for( Neo4jProperty p : typedProperties.values() ) {
//
//				Neo4jProperty p = typedProperties.get( key );
//
//				if( p.getType() == Neo4jPropertyEnum.FILE ) {
//					// save it 
//
//					String label = this.getALabelToStoreImages( node );
//					
//					if( StringUtils.isEmpty( label ) || StringUtils.isEmpty( uuid.getStringValue() ) ) {
//						// we are in trouble if either of these are null
//					}
//
//					// get the current filename
//					String filename = null;	// this should be the file name
//					try {
//						filename = (String) p.getValue();	// this should be the file name						
//					} catch( Exception e ) {
//						
//					}
//					
//					try {
//						File filename_file = (File) p.getValue();	// this should be the file name	
//						filename = filename_file.getName();
//					} catch( Exception e ) {
//						
//					}
//
//					ServerFileUtils utils = new ServerFileUtils();
//					
//					byte[] data = utils.getCache( label, uuid.getStringValue(), key, filename );
//					String checksum = utils.getChecksum( label, uuid.getStringValue(), key, filename );
//					
//					
//					Map<String,Object> fileMap = new HashMap<>();
//					fileMap.put( ImageCacheMapKeyEnum.FILENAME.getValueType(),  filename );
//					fileMap.put( ImageCacheMapKeyEnum.FILE.getValueType(),  data );
//					fileMap.put( ImageCacheMapKeyEnum.CHECKSUM.getValueType(),  checksum );
//
//					p.setValue( fileMap );
//
//				}
//			}
//
//		}
//	}
//	
//	public void getCacheImg( Neo4jRelationship rel ) {
//		this.getCacheImg( rel.getStartNode() );
//		this.getCacheImg( rel.getEndNode() );
//	}
//
//	
//	/**
//	 * Shoudl only be used internally.
//	 * 
//	 * Might make this private
//	 * 
//	 * @param corelabel
//	 * @param uuid
//	 * @param propertyId
//	 * @param hashedFilename
//	 * @param seqNum
//	 * @param data
//	 * @return
//	 */
//	public File cacheImg( String corelabel, String uuid,  String propertyId, String hashedFilename, Integer seqNum, byte[] data  ) {
//
//		// ensure it's been init
//		this.initCacheDir();
//
//		final String filename = hashedFilename;
//		final String imgDir = ServerFileUtils.CACHE_DIR + File.separatorChar + corelabel + File.separatorChar + uuid + File.separatorChar + propertyId;
//
//
//		String fullImgPath;
//
//		if( seqNum == null ) {
//			seqNum = 1;
//		}
//		fullImgPath = imgDir + File.separatorChar + filename  + SEQ_POSTFIX + seqNum;    	  
//		String checksum = fullImgPath + CHECKSUM_POSTFIX;
//
//
//		final File imgDirFile = new File( imgDir );
//
//		if( !imgDirFile.exists() ) {
//			imgDirFile.mkdirs();
//		}
//
//		try {
//			// create a checksum for this to match against
//			String sha1Hex = DigestUtils.sha1Hex( data );
//			
//			FileUtils.writeStringToFile( new File( checksum ),  sha1Hex );
//			
//			File newImg = new File( fullImgPath  );
//			FileUtils.writeByteArrayToFile( newImg, data );
//
//			return newImg;
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			//			return null;
//		}
//
//		return null;
//	}
//
//	public File cacheImgIncrement( Neo4jNode node, String propertyId, String hashedFilename, byte[] data  ) {
//
//		System.out.println("********** CACHE IMAGE : " + hashedFilename );
//		// ensure it's been init
//		this.initCacheDir();
//		
//		if( MapUtils.isEmpty( node.getSystemProperties() ) ) {
//			// if there are no system properties, can't make a cache anyways
//			System.out.println("Failed to find a uuid");
//			return null;
//		}
//		
//		Neo4jProperty uuid = node.getSystemProperties().get( RomeNodeSystemPropertyEnum.UUID.getValueType() );
//		
//		String corelabel = this.getALabelToStoreImages( node );
//		
//		return this.cacheImgIncrement(corelabel, uuid.getStringValue(), propertyId, hashedFilename, data);
//	}
//	
//	
//	public File cacheImgIncrement( String corelabel, String uuid,  String propertyId, String hashedFilename, byte[] data  ) {
//
//		// ensure it's been init
//		this.initCacheDir();
//
//		final String imgDir = ServerFileUtils.CACHE_DIR + File.separatorChar + corelabel + File.separatorChar + uuid + File.separatorChar + propertyId;
//
//		// grab all current images
//		File dir = new File( imgDir ) ;
//
//		if( !dir.exists() ) {
//			return this.cacheImg(corelabel, uuid, propertyId, hashedFilename, null, data);
//		}
//
//		Integer curSeq = this.findNextSeqNumber(corelabel, uuid, propertyId, hashedFilename);
//
//		//		if( curSeq == null || curSeq == 0 ) {
//		//			curSeq = 1;
//		//		} else {
//		//			curSeq++;
//		//		}
//
//		return this.cacheImg(corelabel, uuid, propertyId, hashedFilename, curSeq, data);
//	}
//
//	
//	
//	
//	
//	
//	public Integer findCurrentSeqNumber( String corelabel, String uuid,  String propertyId, String hashedFilename ) {
//
//		final String imgDir = ServerFileUtils.CACHE_DIR + File.separatorChar + corelabel + File.separatorChar + uuid + File.separatorChar + propertyId;
//
//		// grab all current images
//		File dir = new File( imgDir ) ;
//
//		if( !dir.exists() ) {
//			return null;
//		}
//
//		// check for latest sequent number
//		String[] list = dir.list();
//
//		Integer curSeq = 0;
//
//		for( String name : list ) {
//			if( name.startsWith( hashedFilename ) && !name.endsWith( ServerFileUtils.CHECKSUM_POSTFIX)) {
//				// find out the increment
//
//				
//				
//				// get the seq number
//				String[] values = StringUtils.splitByWholeSeparator( name, "_SQN" );
//
//				if( values.length > 0 ) {
//					String v = values[ values.length - 1 ];
//
//					Integer foundSeq = Integer.valueOf( v );
//
//					if( foundSeq > curSeq ) {
//						curSeq = foundSeq;						
//					}
//				}
//			}
//		}
//
//		if( curSeq == null || curSeq == 0 ) {
//			return null;
//		}
//
//		return curSeq;
//	}
//
//	public Integer findNextSeqNumber( String corelabel, String uuid,  String propertyId, String hashedFilename ) {
//
//		Integer curSeq = this.findCurrentSeqNumber(corelabel, uuid, propertyId, hashedFilename);
//
//		if( curSeq == null || curSeq == 0 ) {
//			return 1;
//		}
//
//		return ++curSeq;
//	}
//
//	/**
//	 * Note: You always retrieve the HIGHEST seq number
//	 * 
//	 * @param corelabel
//	 * @param uuid
//	 * @param propertyId
//	 * @param hashedFilename
//	 * @return
//	 */
//	public byte[] getCache( String corelabel, String uuid,  String propertyId, String hashedFilename ) {
//		System.out.println("## Inside getCache for " + hashedFilename  );
//		
//		final String filename = hashedFilename;
//		final String imgDir = ServerFileUtils.CACHE_DIR + File.separatorChar + corelabel + File.separatorChar + uuid + File.separatorChar + propertyId;
//		String fullImgPath = null;
//		
//		try {
//			Integer seqNum = this.findCurrentSeqNumber(corelabel, uuid, propertyId, hashedFilename);
//
//			//			if( seqNum == null ) {
//			//				seqNum = 1;
//			//			} else {
//			//				seqNum
//			//			}
//
//			fullImgPath = imgDir + File.separatorChar + filename  + SEQ_POSTFIX + seqNum;    	  
//
//
//			File f = new File( fullImgPath );
//			
//			System.out.println("Got the file : " + f );
//
//			byte[] imgByteArr = FileUtils.readFileToByteArray( f );				
//			return imgByteArr;
//
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
////			e.printStackTrace();
//			System.out.println("Failed to find the file : " + fullImgPath );
//			logger.error("Failed to find the file : " + fullImgPath, e );
//			return null;
//		}
//	}
//	
//	public String getChecksum( String corelabel, String uuid,  String propertyId, String hashedFilename ) {
////		System.out.println("## Inside getCache for " + hashedFilename  );
//		
//		final String filename = hashedFilename;
//		final String imgDir = ServerFileUtils.CACHE_DIR + File.separatorChar + corelabel + File.separatorChar + uuid + File.separatorChar + propertyId;
//		String fullImgPath = null;
//		
//		try {
//			Integer seqNum = this.findCurrentSeqNumber(corelabel, uuid, propertyId, hashedFilename);
//
//			//			if( seqNum == null ) {
//			//				seqNum = 1;
//			//			} else {
//			//				seqNum
//			//			}
//
//			fullImgPath = imgDir + File.separatorChar + filename  + SEQ_POSTFIX + seqNum;    	  
//			fullImgPath = fullImgPath + ServerFileUtils.CHECKSUM_POSTFIX;    	  
//
//			
//			File f = new File( fullImgPath );
//			
//			if( f.exists() ) {
//				// read it
//				String found = FileUtils.readFileToString( f );
//				
//				return found;
//			}
//
////			byte[] imgByteArr = FileUtils.readFileToByteArray( f );				
////			return imgByteArr;
//
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
////			e.printStackTrace();
//			System.out.println("Failed to find the file : " + fullImgPath );
//			logger.error("Failed to find the file : " + fullImgPath, e );
//			return null;
//		}
//		
//		return null;
//	}
//
//	/**
//	 * Excepted BB0001
//	 * Excepted AA0001
//	 * Excepted II0001
//	 * or
//	 * 010001
//	 * @param type
//	 * @param id
//	 * @return
//	 */
//	public void deleteTopCache(  String type, String id ) {
//
//		final String imgDir = ServerFileUtils.CACHE_DIR + File.separatorChar + type + File.separatorChar + id;
//
//
//		final File imgDirFile = new File( imgDir );
//
//		if( !imgDirFile.exists() ) {
//			imgDirFile.mkdirs();
//		}
//
//		for( File f : imgDirFile.listFiles() ) {
//			if( !f.isDirectory() ) {
//				f.delete();
//			}
//		}
//
//	}
//
//	public String createFullCacheImgPath( String type, String id, String seq, String filetype ) {
//		final String filename = type + id + seq + "." + filetype;
//		final String imgDir = ServerFileUtils.CACHE_DIR + File.separatorChar + type + File.separatorChar + id;
//		final String fullImgPath = imgDir + File.separatorChar + filename;
//
//		return fullImgPath;
//	}
//
//	public void initCacheDir() {
//		final File cacheDirFile = new File( ServerFileUtils.CACHE_DIR  );
//
//		System.out.println("Does this dir exist: " + cacheDirFile.exists() );
//
//		if( !cacheDirFile.exists() ) {
//			// create one
//			// try to create?
//			cacheDirFile.mkdirs();
//		}
//	}
//
//	//	public static void instance() {
//	//		
//	//	}

}
