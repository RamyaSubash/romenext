package com.els.romenext.core.db.neo4j.utils.internal.property.file;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyEnum;
import com.els.romenext.core.db.neo4j.enums.property.file.ImageCacheMapKeyEnum;
import com.els.romenext.core.db.neo4j.enums.property.system.RomeNodeSystemPropertyEnum;


public class ImageCacheUtils {

	private static Logger logger = Logger.getLogger( ImageCacheUtils.class );
	//	public final static String CACHE_DIR = "/tmp/img/cache";
	public final static String CACHE_DIR = "~/els/romenext/img/cache";
	
	public final static String CHECKSUM_POSTFIX = "_CHKSM";
	public final static String SEQ_POSTFIX = "_SQN";
	
	private static final String[] IMAGE_TYPES = { "and_mdpi", "and_hdpi", "and_xhdpi", "and_xxhdpi", "ios_msdpi", "ios_xhdpi",
		"ios_xxhdpi", "bb_classic", "bb_z30", "bb_q", "bb_z10", "bb_pass", "w8_wvga", "w8_wxga", "w8_720p",
	"w8_1080p" };

	public void cacheImg( Map<String,Neo4jProperty> systemProperties, Neo4jNode dataHoldingNeo4jNode ) {
		
		System.out.println("############## caching image");
		
		if( MapUtils.isEmpty( systemProperties ) ) {
			// if there are no system properties, can't make a cache anyways
			System.out.println("Failed to find a uuid");
			return;
		}
		
//		System.out.println("Wtf: " + valueType );
		Neo4jProperty uuid = systemProperties.get( RomeNodeSystemPropertyEnum.UUID.getValueType() );

		System.out.println("What is the uuid : " + uuid );


		if( uuid != null && MapUtils.isNotEmpty( dataHoldingNeo4jNode.getTypedProperties() )) {
			Map<String, Neo4jProperty> typedProperties = dataHoldingNeo4jNode.getTypedProperties();

			
			for( String key : typedProperties.keySet() ) {
				//						for( Neo4jProperty p : typedProperties.values() ) {

				Neo4jProperty p = typedProperties.get( key );

				if( p.getType() == Neo4jPropertyEnum.FILE ) {
					// save it 

					if( StringUtils.isEmpty( dataHoldingNeo4jNode.getCoreLabel() ) || StringUtils.isEmpty( uuid.getStringValue() ) ) {
						// we are in trouble if either of these are null
//						return;
					}
					
					if( p.getValue() == null || !( p.getValue() instanceof Map )) {
						return;
					}

					// get the map
					// note: BEFORE this is retrieved from the neo4j db, this will be converted intoa  file
					Map<String,Object> fileMap = (Map<String,Object>) p.getValue();

					String filename = (String) fileMap.get( ImageCacheMapKeyEnum.FILENAME.getValueType());
					byte[] file = (byte[]) fileMap.get( ImageCacheMapKeyEnum.FILE.getValueType() );

					ImageCacheUtils utils = new ImageCacheUtils();

					// we original used the "CORE LABEL" but we haven't used that a lot of the time
					// we will try to either grab the CORE or any label
					
					utils.cacheImg( this.getALabelToStoreImages( dataHoldingNeo4jNode ), uuid.getStringValue(), key, filename , null, file );
				}
			}

		}
	}
	
	
	private String getALabelToStoreImages( Neo4jNode node ) {
		if( StringUtils.isNotEmpty( node.getCoreLabel() ) ) {
			return node.getCoreLabel();
		}
		if( CollectionUtils.isNotEmpty( node.getLabels() ) ) {
			for( String label : node.getLabels() ) {
				return label;
			}
		}
		return null;
	}
	
	public void getCacheImg( Neo4jNode node ) {
		
		System.out.println("");
		
//		System.out.println("NODE: " + node );
		Map<String, Neo4jProperty> systemProperties = node.getSystemProperties();

		if( MapUtils.isEmpty( systemProperties ) ) {
			return;
		}
		
		Neo4jProperty uuid = systemProperties.get( RomeNodeSystemPropertyEnum.UUID.getValueType() );

//		System.out.println("What is the uuid : " + uuid );


		if( uuid != null ) {
			Map<String, Neo4jProperty> typedProperties = node.getTypedProperties();

			if( MapUtils.isEmpty( typedProperties ) ) {
				// if no type properties, nothing to do
				return;
			}
			
			for( String key : typedProperties.keySet() ) {
				//						for( Neo4jProperty p : typedProperties.values() ) {

				Neo4jProperty p = typedProperties.get( key );

				if( p.getType() == Neo4jPropertyEnum.FILE ) {
					// save it 

					String label = this.getALabelToStoreImages( node );
					
					if( StringUtils.isEmpty( label ) || StringUtils.isEmpty( uuid.getStringValue() ) ) {
						// we are in trouble if either of these are null
					}

					// get the current filename
					String filename = null;	// this should be the file name
					try {
						filename = (String) p.getValue();	// this should be the file name						
					} catch( Exception e ) {
						
					}
					
					try {
						File filename_file = (File) p.getValue();	// this should be the file name	
						filename = filename_file.getName();
					} catch( Exception e ) {
						
					}

					ImageCacheUtils utils = new ImageCacheUtils();
					
					byte[] data = utils.getCache( label, uuid.getStringValue(), key, filename );
					String checksum = utils.getChecksum( label, uuid.getStringValue(), key, filename );
					
					
					Map<String,Object> fileMap = new HashMap<>();
					fileMap.put( ImageCacheMapKeyEnum.FILENAME.getValueType(),  filename );
					fileMap.put( ImageCacheMapKeyEnum.FILE.getValueType(),  data );
					fileMap.put( ImageCacheMapKeyEnum.CHECKSUM.getValueType(),  checksum );

					p.setValue( fileMap );

				}
			}

		}
	}
	
	public void getCacheImg( Neo4jRelationship rel ) {
		this.getCacheImg( rel.getStartNode() );
		this.getCacheImg( rel.getEndNode() );
	}

	
	/**
	 * Shoudl only be used internally.
	 * 
	 * Might make this private
	 * 
	 * @param corelabel
	 * @param uuid
	 * @param propertyId
	 * @param hashedFilename
	 * @param seqNum
	 * @param data
	 * @return
	 */
	public File cacheImg( String corelabel, String uuid,  String propertyId, String hashedFilename, Integer seqNum, byte[] data  ) {

		// ensure it's been init
		this.initCacheDir();

		final String filename = hashedFilename;
		final String imgDir = ImageCacheUtils.CACHE_DIR + File.separatorChar + corelabel + File.separatorChar + uuid + File.separatorChar + propertyId;


		String fullImgPath;

		if( seqNum == null ) {
			seqNum = 1;
		}
		fullImgPath = imgDir + File.separatorChar + filename  + SEQ_POSTFIX + seqNum;    	  
		String checksum = fullImgPath + CHECKSUM_POSTFIX;


		final File imgDirFile = new File( imgDir );

		if( !imgDirFile.exists() ) {
			imgDirFile.mkdirs();
		}

		try {
			// create a checksum for this to match against
			String sha1Hex = DigestUtils.sha1Hex( data );
			
			FileUtils.writeStringToFile( new File( checksum ),  sha1Hex );
			
			File newImg = new File( fullImgPath  );
			FileUtils.writeByteArrayToFile( newImg, data );

			return newImg;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//			return null;
		}

		return null;
	}

	public File cacheImgIncrement( Neo4jNode node, String propertyId, String hashedFilename, byte[] data  ) {

		System.out.println("********** CACHE IMAGE : " + hashedFilename );
		// ensure it's been init
		this.initCacheDir();
		
		if( MapUtils.isEmpty( node.getSystemProperties() ) ) {
			// if there are no system properties, can't make a cache anyways
			System.out.println("Failed to find a uuid");
			return null;
		}
		
		Neo4jProperty uuid = node.getSystemProperties().get( RomeNodeSystemPropertyEnum.UUID.getValueType() );
		
		String corelabel = this.getALabelToStoreImages( node );
		
		return this.cacheImgIncrement(corelabel, uuid.getStringValue(), propertyId, hashedFilename, data);
	}
	
	
	public File cacheImgIncrement( String corelabel, String uuid,  String propertyId, String hashedFilename, byte[] data  ) {

		// ensure it's been init
		this.initCacheDir();

		final String imgDir = ImageCacheUtils.CACHE_DIR + File.separatorChar + corelabel + File.separatorChar + uuid + File.separatorChar + propertyId;

		// grab all current images
		File dir = new File( imgDir ) ;

		if( !dir.exists() ) {
			return this.cacheImg(corelabel, uuid, propertyId, hashedFilename, null, data);
		}

		Integer curSeq = this.findNextSeqNumber(corelabel, uuid, propertyId, hashedFilename);

		//		if( curSeq == null || curSeq == 0 ) {
		//			curSeq = 1;
		//		} else {
		//			curSeq++;
		//		}

		return this.cacheImg(corelabel, uuid, propertyId, hashedFilename, curSeq, data);
	}

	
	
	
	
	
	public Integer findCurrentSeqNumber( String corelabel, String uuid,  String propertyId, String hashedFilename ) {

		final String imgDir = ImageCacheUtils.CACHE_DIR + File.separatorChar + corelabel + File.separatorChar + uuid + File.separatorChar + propertyId;

		// grab all current images
		File dir = new File( imgDir ) ;

		if( !dir.exists() ) {
			return null;
		}

		// check for latest sequent number
		String[] list = dir.list();

		Integer curSeq = 0;

		for( String name : list ) {
			if( name.startsWith( hashedFilename ) && !name.endsWith( ImageCacheUtils.CHECKSUM_POSTFIX)) {
				// find out the increment

				
				
				// get the seq number
				String[] values = StringUtils.splitByWholeSeparator( name, "_SQN" );

				if( values.length > 0 ) {
					String v = values[ values.length - 1 ];

					Integer foundSeq = Integer.valueOf( v );

					if( foundSeq > curSeq ) {
						curSeq = foundSeq;						
					}
				}
			}
		}

		if( curSeq == null || curSeq == 0 ) {
			return null;
		}

		return curSeq;
	}

	public Integer findNextSeqNumber( String corelabel, String uuid,  String propertyId, String hashedFilename ) {

		Integer curSeq = this.findCurrentSeqNumber(corelabel, uuid, propertyId, hashedFilename);

		if( curSeq == null || curSeq == 0 ) {
			return 1;
		}

		return ++curSeq;
	}

	/**
	 * Note: You always retrieve the HIGHEST seq number
	 * 
	 * @param corelabel
	 * @param uuid
	 * @param propertyId
	 * @param hashedFilename
	 * @return
	 */
	public byte[] getCache( String corelabel, String uuid,  String propertyId, String hashedFilename ) {
		System.out.println("## Inside getCache for " + hashedFilename  );
		
		final String filename = hashedFilename;
		final String imgDir = ImageCacheUtils.CACHE_DIR + File.separatorChar + corelabel + File.separatorChar + uuid + File.separatorChar + propertyId;
		String fullImgPath = null;
		
		try {
			Integer seqNum = this.findCurrentSeqNumber(corelabel, uuid, propertyId, hashedFilename);

			//			if( seqNum == null ) {
			//				seqNum = 1;
			//			} else {
			//				seqNum
			//			}

			fullImgPath = imgDir + File.separatorChar + filename  + SEQ_POSTFIX + seqNum;    	  


			File f = new File( fullImgPath );
			
			System.out.println("Got the file : " + f );

			byte[] imgByteArr = FileUtils.readFileToByteArray( f );				
			return imgByteArr;

		} catch (IOException e) {
			// TODO Auto-generated catch block
//			e.printStackTrace();
			System.out.println("Failed to find the file : " + fullImgPath );
			logger.error("Failed to find the file : " + fullImgPath, e );
			return null;
		}
	}
	
	public String getChecksum( String corelabel, String uuid,  String propertyId, String hashedFilename ) {
//		System.out.println("## Inside getCache for " + hashedFilename  );
		
		final String filename = hashedFilename;
		final String imgDir = ImageCacheUtils.CACHE_DIR + File.separatorChar + corelabel + File.separatorChar + uuid + File.separatorChar + propertyId;
		String fullImgPath = null;
		
		try {
			Integer seqNum = this.findCurrentSeqNumber(corelabel, uuid, propertyId, hashedFilename);

			//			if( seqNum == null ) {
			//				seqNum = 1;
			//			} else {
			//				seqNum
			//			}

			fullImgPath = imgDir + File.separatorChar + filename  + SEQ_POSTFIX + seqNum;    	  
			fullImgPath = fullImgPath + ImageCacheUtils.CHECKSUM_POSTFIX;    	  

			
			File f = new File( fullImgPath );
			
			if( f.exists() ) {
				// read it
				String found = FileUtils.readFileToString( f );
				
				return found;
			}

//			byte[] imgByteArr = FileUtils.readFileToByteArray( f );				
//			return imgByteArr;

		} catch (IOException e) {
			// TODO Auto-generated catch block
//			e.printStackTrace();
			System.out.println("Failed to find the file : " + fullImgPath );
			logger.error("Failed to find the file : " + fullImgPath, e );
			return null;
		}
		
		return null;
	}

	/**
	 * Excepted BB0001
	 * Excepted AA0001
	 * Excepted II0001
	 * or
	 * 010001
	 * @param type
	 * @param id
	 * @return
	 */
	public void deleteTopCache(  String type, String id ) {

		final String imgDir = ImageCacheUtils.CACHE_DIR + File.separatorChar + type + File.separatorChar + id;


		final File imgDirFile = new File( imgDir );

		if( !imgDirFile.exists() ) {
			imgDirFile.mkdirs();
		}

		for( File f : imgDirFile.listFiles() ) {
			if( !f.isDirectory() ) {
				f.delete();
			}
		}

	}

	//	public SuretapImage updateCache(  byte[] newFile, String newFileName, String device, String type, String id, String seqNum  ) {
	//
	//		final String filename = type + id + seqNum + ".";
	//		final String imgDir = ImageCacheUtils.CACHE_DIR + File.separatorChar + type + File.separatorChar + id;
	//
	//
	//		String fullImgPath;
	//		if( device == null ) {
	//			fullImgPath = imgDir + File.separatorChar + filename;    	  
	//		} else {
	//			fullImgPath = imgDir + File.separatorChar + device + File.separatorChar + filename;    	  
	//		}
	//
	//		final File imgDirFile = new File( imgDir );
	//
	//		if( !imgDirFile.exists() ) {
	//			imgDirFile.mkdirs();
	//		}
	//
	//		SuretapImage image = null;
	//		
	//		image = new SuretapImage();
	//		image.content = newFile;
	//		image.type = FilenameUtils.getExtension( newFileName );
	//		
	//		if (null == image || null == image.type || null == image.content) {
	//			return null;
	//		}
	//
	//		try {
	//			File newImg = new File( fullImgPath + image.type );
	//			FileUtils.writeByteArrayToFile(newImg, image.content );
	//		} catch (IOException e) {
	//			// TODO Auto-generated catch block
	//			e.printStackTrace();
	//			return null;
	//		}
	//
	//		return image;
	//	}
	//
	//	public SuretapImage getCache( File cachedImg  ) {
	//		try {
	//			byte[] imgByteArr = FileUtils.readFileToByteArray( cachedImg );
	//
	//			SuretapImage image = new SuretapImage();
	//			image.content = imgByteArr;
	//			image.type = FilenameUtils.getExtension( cachedImg.getName() );
	//
	//			return image;
	//		} catch (IOException e) {
	//			// TODO Auto-generated catch block
	//			e.printStackTrace();
	//			return null;
	//		}
	//	}

	//	public SuretapImage cacheImg( String device, String type, String id, String seqNum  ) {
	//
	//		final String filename = type + id + seqNum + ".";
	//		final String imgDir = ImageCacheUtils.CACHE_DIR + File.separatorChar + type + File.separatorChar + id;
	//
	//
	//		String fullImgPath;
	//		if( device == null ) {
	//			fullImgPath = imgDir + File.separatorChar + filename;    	  
	//		} else {
	//			fullImgPath = imgDir + File.separatorChar + device + File.separatorChar + filename;    	  
	//		}
	//
	//		final File imgDirFile = new File( imgDir );
	//
	//		if( !imgDirFile.exists() ) {
	//			imgDirFile.mkdirs();
	//		}
	//
	//
	//		SuretapImage image = null;
	//
	//		if( "BB".equalsIgnoreCase( type ) ) {
	//			// BB Image
	//			CCSBannerDao bdao = new CCSBannerDao();
	//			// attempt to find via banner exteral id
	//
	//			List<CCSBanner> banners = bdao.findByExternalImageId( type + id + seqNum );
	//
	//			if( banners == null || banners.size() == 0 ) {
	//				return null;
	//			}
	//
	//			CCSBanner ccsBanner = banners.get( 0 );
	//			image = getImage( device, ccsBanner );
	//
	//		} else if ("AA".equalsIgnoreCase (type)) {
	//			// AA image
	//			CSAggregatorDao agdao = new CSAggregatorDao();
	//			
	//			CSAggregator aggregator  = agdao.findByExternalImageId(type + id +seqNum);
	//			if (aggregator == null ) {
	//				return null;
	//			}
	//			
	//			if (null == device) {
	//				return getAnyImage(aggregator);
	//			}
	//			else {
	//				return getImageByType(aggregator, device);
	//			}
	//		} else if ("II".equalsIgnoreCase (type)){
	//			CardIssuerDao issdao = new CardIssuerDao();
	//
	//			CardIssuer cardissuer = issdao.findByExternalImageId(type + id + seqNum);
	//			if (cardissuer == null) {
	//				return null;
	//			}
	//
	//			if (null == device) {
	//				return getAnyImage(cardissuer);
	//			} else {
	//				return getImageByType(cardissuer, device);
	//			}
	//			
	//		}
	//		
	//		
	//		else {
	//			ProductImageStoreDao pdao = new ProductImageStoreDao();
	//
	//			// load the product for this
	//			CardProductDao prodDao = new CardProductDao();
	//			CSProductTypeDao csProdDao = new CSProductTypeDao();
	//
	//			// it's a little silly but the external type is apparnetly just a single digit
	//			String hackedtypeId = Integer.valueOf( type ).toString();
	//			CSProductType productType = csProdDao.findByExternalId( hackedtypeId );
	//
	//			CardProduct product = prodDao.findByTypeAndId( id , productType);
	//
	//			List<ProductImageStore> productInstances = pdao.findByProductAndSeqNum(product, Integer.valueOf( seqNum ) );
	//
	//			// should only be one
	//			if( productInstances == null || productInstances.size() != 1 ) {
	//				return null;
	//			}
	//			ProductImageStore img = productInstances.get( 0 );
	//
	//			if (null == img) {
	//				return null;
	//			}
	//			image = getImage( device, img);
	//
	//		}
	//
	//
	//
	//		if (null == image || null == image.type || null == image.content) {
	//			return null;
	//		}
	//
	//		try {
	//			File newImg = new File( fullImgPath + image.type );
	//			FileUtils.writeByteArrayToFile(newImg, image.content );
	//		} catch (IOException e) {
	//			// TODO Auto-generated catch block
	//			e.printStackTrace();
	//			return null;
	//		}
	//
	//		return image;
	//	}




	//	private SuretapImage getImage( String device, CCSBanner banner ) {
	//		if( device == null ) {
	//			return this.getAnyImage(banner);
	//		}
	//
	//		return this.getImageByType( banner, device );
	//	}
	//	private SuretapImage getImage( String device, CSAggregator aggregator ) {
	//		if( device == null ) {
	//			return this.getAnyImage(aggregator);
	//		}
	//
	//		return this.getImageByType( aggregator, device );
	//	}
	//	
	//	private SuretapImage getImage( String device, CardIssuer cardissuer ) {
	//		if( device == null ) {
	//			return this.getAnyImage(cardissuer);
	//		}
	//
	//		return this.getImageByType( cardissuer, device );
	//	}
	//	
	//	
	//	
	//	
	//
	//	private SuretapImage getImage( String device, ProductImageStore imgstore ) {
	//		if( device == null ) {
	//			return this.getAnyImage( imgstore);
	//		}
	//
	//		return this.getImageByType( imgstore, device );
	//	}
	//
	//	private SuretapImage getAnyImage(CCSBanner banner) {
	//		for (String imageType : IMAGE_TYPES) {
	//			SuretapImage image = getImageByType(banner, imageType);
	//			if (null != image && null != image.type && null != image.content) {
	//				return image;
	//			}
	//		}
	//		return null;
	//	}
	//	
	//	private SuretapImage getAnyImage(CardIssuer issuer) {
	//		for (String imageType : IMAGE_TYPES) {
	//			SuretapImage image = getImageByType(issuer, imageType);
	//			if (null != image && null != image.type && null != image.content) {
	//				return image;
	//			}
	//		}
	//		return null;
	//	}
	//	
	//
	//	private SuretapImage getAnyImage(ProductImageStore productImageStore) {
	//		for (String imageType : IMAGE_TYPES) {
	//			SuretapImage image = getImageByType(productImageStore, imageType);
	//			if (null != image && null != image.type && null != image.content) {
	//				return image;
	//			}
	//		}
	//		return null;
	//	}
	//	
	//	private SuretapImage getAnyImage(CSAggregator agg) {
	//		for (String imageType : IMAGE_TYPES) {
	//			SuretapImage image = getImageByType(agg, imageType);
	//			if (null != image && null != image.type && null != image.content) {
	//				return image;
	//			}
	//		}
	//		return null;
	//	}
	//	
	//	 private SuretapImage getImageByType(CardIssuer issuerImageStore, String imageType) {
	//			SuretapImage image = new SuretapImage();
	//			switch (imageType) {
	//			case "and_mdpi":
	//				image.type = issuerImageStore.getAndroidImages().getAndroidMdpiType();
	//				image.content = issuerImageStore.getAndroidImages().getAndroidMdpi();
	//				break;
	//			case "and_hdpi":
	//				image.type = issuerImageStore.getAndroidImages().getAndroidHdpiType();
	//				image.content = issuerImageStore.getAndroidImages().getAndroidHdpi();
	//				break;
	//			case "and_xhdpi":
	//				image.type = issuerImageStore.getAndroidImages().getAndroidXhdpiType();
	//				image.content = issuerImageStore.getAndroidImages().getAndroidXhdpi();
	//				break;
	//			case "and_xxhdpi":
	//				image.type = issuerImageStore.getAndroidImages().getAndroidXxhdpiType();
	//				image.content = issuerImageStore.getAndroidImages().getAndroidXxhdpi();
	//				break;
	//			case "ios_msdpi":
	//				image.type = issuerImageStore.getIosImages().getIosMsdpiType();
	//				image.content = issuerImageStore.getIosImages().getIosMsdpi();
	//				break;
	//			case "ios_xhdpi":
	//				image.type = issuerImageStore.getIosImages().getIosXhdpiType();
	//				image.content = issuerImageStore.getIosImages().getIosXhdpi();
	//				break;
	//			case "ios_xxhdpi":
	//				image.type = issuerImageStore.getIosImages().getIosXxhdpiType();
	//				image.content = issuerImageStore.getIosImages().getIosXxhdpi();
	//				break;
	//			case "bb_classic":
	//				image.type = issuerImageStore.getBbImages().getBbClassicType();
	//				image.content = issuerImageStore.getBbImages().getBbClassic();
	//				break;
	//			case "bb_z30":
	//				image.type = issuerImageStore.getBbImages().getBbZ30Type();
	//				image.content = issuerImageStore.getBbImages().getBbZ30();
	//				break;
	//			case "bb_q":
	//				image.type = issuerImageStore.getBbImages().getBbQType();
	//				image.content = issuerImageStore.getBbImages().getBbQ();
	//				break;
	//			case "bb_z10":
	//				image.type = issuerImageStore.getBbImages().getBbZ10Type();
	//				image.content = issuerImageStore.getBbImages().getBbZ10();
	//				break;
	//			case "bb_pass":
	//				image.type = issuerImageStore.getBbImages().getBbPassType();
	//				image.content = issuerImageStore.getBbImages().getBbPass();
	//				break;
	//			case "w8_wvga":
	//				image.type = issuerImageStore.getWin8Images().getW8WvgaType();
	//				image.content = issuerImageStore.getWin8Images().getW8Wvga();
	//				break;
	//			case "w8_wxga":
	//				image.type = issuerImageStore.getWin8Images().getW8WxgaType();
	//				image.content = issuerImageStore.getWin8Images().getW8Wxga();
	//				break;
	//			case "w8_720p":
	//				image.type = issuerImageStore.getWin8Images().getW8720pType();
	//				image.content = issuerImageStore.getWin8Images().getW8720p();
	//				break;
	//			case "w8_1080p":
	//				image.type = issuerImageStore.getWin8Images().getW81080pType();
	//				image.content = issuerImageStore.getWin8Images().getW81080p();
	//				break;
	//			default:
	//				return null;
	//			}
	//			return image;
	//		}
	//	   
	//
	//	private SuretapImage getImageByType(CSAggregator aggregatorImageStore, String imageType) {
	//		SuretapImage image = new SuretapImage();
	//		switch (imageType) {
	//		case "and_mdpi":
	//			image.type = aggregatorImageStore.getAndroidImages().getAndroidMdpiType();
	//			image.content = aggregatorImageStore.getAndroidImages().getAndroidMdpi();
	//			break;
	//		case "and_hdpi":
	//			image.type = aggregatorImageStore.getAndroidImages().getAndroidHdpiType();
	//			image.content = aggregatorImageStore.getAndroidImages().getAndroidHdpi();
	//			break;
	//		case "and_xhdpi":
	//			image.type = aggregatorImageStore.getAndroidImages().getAndroidXhdpiType();
	//			image.content = aggregatorImageStore.getAndroidImages().getAndroidXhdpi();
	//			break;
	//		case "and_xxhdpi":
	//			image.type = aggregatorImageStore.getAndroidImages().getAndroidXxhdpiType();
	//			image.content = aggregatorImageStore.getAndroidImages().getAndroidXxhdpi();
	//			break;
	//		case "ios_msdpi":
	//			image.type = aggregatorImageStore.getIosImages().getIosMsdpiType();
	//			image.content = aggregatorImageStore.getIosImages().getIosMsdpi();
	//			break;
	//		case "ios_xhdpi":
	//			image.type = aggregatorImageStore.getIosImages().getIosXhdpiType();
	//			image.content = aggregatorImageStore.getIosImages().getIosXhdpi();
	//			break;
	//		case "ios_xxhdpi":
	//			image.type = aggregatorImageStore.getIosImages().getIosXxhdpiType();
	//			image.content = aggregatorImageStore.getIosImages().getIosXxhdpi();
	//			break;
	//		case "bb_classic":
	//			image.type = aggregatorImageStore.getBbImages().getBbClassicType();
	//			image.content = aggregatorImageStore.getBbImages().getBbClassic();
	//			break;
	//		case "bb_z30":
	//			image.type = aggregatorImageStore.getBbImages().getBbZ30Type();
	//			image.content = aggregatorImageStore.getBbImages().getBbZ30();
	//			break;
	//		case "bb_q":
	//			image.type = aggregatorImageStore.getBbImages().getBbQType();
	//			image.content = aggregatorImageStore.getBbImages().getBbQ();
	//			break;
	//		case "bb_z10":
	//			image.type = aggregatorImageStore.getBbImages().getBbZ10Type();
	//			image.content = aggregatorImageStore.getBbImages().getBbZ10();
	//			break;
	//		case "bb_pass":
	//			image.type = aggregatorImageStore.getBbImages().getBbPassType();
	//			image.content = aggregatorImageStore.getBbImages().getBbPass();
	//			break;
	//		case "w8_wvga":
	//			image.type = aggregatorImageStore.getWin8Images().getW8WvgaType();
	//			image.content = aggregatorImageStore.getWin8Images().getW8Wvga();
	//			break;
	//		case "w8_wxga":
	//			image.type = aggregatorImageStore.getWin8Images().getW8WxgaType();
	//			image.content = aggregatorImageStore.getWin8Images().getW8Wxga();
	//			break;
	//		case "w8_720p":
	//			image.type = aggregatorImageStore.getWin8Images().getW8720pType();
	//			image.content = aggregatorImageStore.getWin8Images().getW8720p();
	//			break;
	//		case "w8_1080p":
	//			image.type = aggregatorImageStore.getWin8Images().getW81080pType();
	//			image.content = aggregatorImageStore.getWin8Images().getW81080p();
	//			break;
	//		default:
	//			return null;
	//		}
	//		return image;
	//	}
	//
	//	private SuretapImage getImageByType(ProductImageStore productImageStore, String imageType) {
	//		SuretapImage image = new SuretapImage();
	//		switch (imageType) {
	//		case "and_mdpi":
	//			image.type = productImageStore.getAndroidImages().getAndroidMdpiType();
	//			image.content = productImageStore.getAndroidImages().getAndroidMdpi();
	//			break;
	//		case "and_hdpi":
	//			image.type = productImageStore.getAndroidImages().getAndroidHdpiType();
	//			image.content = productImageStore.getAndroidImages().getAndroidHdpi();
	//			break;
	//		case "and_xhdpi":
	//			image.type = productImageStore.getAndroidImages().getAndroidXhdpiType();
	//			image.content = productImageStore.getAndroidImages().getAndroidXhdpi();
	//			break;
	//		case "and_xxhdpi":
	//			image.type = productImageStore.getAndroidImages().getAndroidXxhdpiType();
	//			image.content = productImageStore.getAndroidImages().getAndroidXxhdpi();
	//			break;
	//		case "ios_msdpi":
	//			image.type = productImageStore.getIosImages().getIosMsdpiType();
	//			image.content = productImageStore.getIosImages().getIosMsdpi();
	//			break;
	//		case "ios_xhdpi":
	//			image.type = productImageStore.getIosImages().getIosXhdpiType();
	//			image.content = productImageStore.getIosImages().getIosXhdpi();
	//			break;
	//		case "ios_xxhdpi":
	//			image.type = productImageStore.getIosImages().getIosXxhdpiType();
	//			image.content = productImageStore.getIosImages().getIosXxhdpi();
	//			break;
	//		case "bb_classic":
	//			image.type = productImageStore.getBbImages().getBbClassicType();
	//			image.content = productImageStore.getBbImages().getBbClassic();
	//			break;
	//		case "bb_z30":
	//			image.type = productImageStore.getBbImages().getBbZ30Type();
	//			image.content = productImageStore.getBbImages().getBbZ30();
	//			break;
	//		case "bb_q":
	//			image.type = productImageStore.getBbImages().getBbQType();
	//			image.content = productImageStore.getBbImages().getBbQ();
	//			break;
	//		case "bb_z10":
	//			image.type = productImageStore.getBbImages().getBbZ10Type();
	//			image.content = productImageStore.getBbImages().getBbZ10();
	//			break;
	//		case "bb_pass":
	//			image.type = productImageStore.getBbImages().getBbPassType();
	//			image.content = productImageStore.getBbImages().getBbPass();
	//			break;
	//		case "w8_wvga":
	//			image.type = productImageStore.getWin8Images().getW8WvgaType();
	//			image.content = productImageStore.getWin8Images().getW8Wvga();
	//			break;
	//		case "w8_wxga":
	//			image.type = productImageStore.getWin8Images().getW8WxgaType();
	//			image.content = productImageStore.getWin8Images().getW8Wxga();
	//			break;
	//		case "w8_720p":
	//			image.type = productImageStore.getWin8Images().getW8720pType();
	//			image.content = productImageStore.getWin8Images().getW8720p();
	//			break;
	//		case "w8_1080p":
	//			image.type = productImageStore.getWin8Images().getW81080pType();
	//			image.content = productImageStore.getWin8Images().getW81080p();
	//			break;
	//		default:
	//			return null;
	//		}
	//		return image;
	//	}
	//
	//	private SuretapImage getImageByType(CCSBanner banner, String imageType) {
	//		SuretapImage image = new SuretapImage();
	//		switch (imageType) {
	//		case "and_mdpi":
	//			image.type = banner.getAndroidImages().getAndroidMdpiType();
	//			image.content = banner.getAndroidImages().getAndroidMdpi();
	//			break;
	//		case "and_hdpi":
	//			image.type = banner.getAndroidImages().getAndroidHdpiType();
	//			image.content = banner.getAndroidImages().getAndroidHdpi();
	//			break;
	//		case "and_xhdpi":
	//			image.type = banner.getAndroidImages().getAndroidXhdpiType();
	//			image.content = banner.getAndroidImages().getAndroidXhdpi();
	//			break;
	//		case "and_xxhdpi":
	//			image.type = banner.getAndroidImages().getAndroidXxhdpiType();
	//			image.content = banner.getAndroidImages().getAndroidXxhdpi();
	//			break;
	//		case "ios_msdpi":
	//			image.type = banner.getIosImages().getIosMsdpiType();
	//			image.content = banner.getIosImages().getIosMsdpi();
	//			break;
	//		case "ios_xhdpi":
	//			image.type = banner.getIosImages().getIosXhdpiType();
	//			image.content = banner.getIosImages().getIosXhdpi();
	//			break;
	//		case "ios_xxhdpi":
	//			image.type = banner.getIosImages().getIosXxhdpiType();
	//			image.content = banner.getIosImages().getIosXxhdpi();
	//			break;
	//		case "bb_classic":
	//			image.type = banner.getBbImages().getBbClassicType();
	//			image.content = banner.getBbImages().getBbClassic();
	//			break;
	//		case "bb_z30":
	//			image.type = banner.getBbImages().getBbZ30Type();
	//			image.content = banner.getBbImages().getBbZ30();
	//			break;
	//		case "bb_q":
	//			image.type = banner.getBbImages().getBbQType();
	//			image.content = banner.getBbImages().getBbQ();
	//			break;
	//		case "bb_z10":
	//			image.type = banner.getBbImages().getBbZ10Type();
	//			image.content = banner.getBbImages().getBbZ10();
	//			break;
	//		case "bb_pass":
	//			image.type = banner.getBbImages().getBbPassType();
	//			image.content = banner.getBbImages().getBbPass();
	//			break;
	//		case "w8_wvga":
	//			image.type = banner.getWin8Images().getW8WvgaType();
	//			image.content = banner.getWin8Images().getW8Wvga();
	//			break;
	//		case "w8_wxga":
	//			image.type = banner.getWin8Images().getW8WxgaType();
	//			image.content = banner.getWin8Images().getW8Wxga();
	//			break;
	//		case "w8_720p":
	//			image.type = banner.getWin8Images().getW8720pType();
	//			image.content = banner.getWin8Images().getW8720p();
	//			break;
	//		case "w8_1080p":
	//			image.type = banner.getWin8Images().getW81080pType();
	//			image.content = banner.getWin8Images().getW81080p();
	//			break;
	//		default:
	//			return null;
	//		}
	//		return image;
	//	}

	public String createFullCacheImgPath( String type, String id, String seq, String filetype ) {
		final String filename = type + id + seq + "." + filetype;
		final String imgDir = ImageCacheUtils.CACHE_DIR + File.separatorChar + type + File.separatorChar + id;
		final String fullImgPath = imgDir + File.separatorChar + filename;

		return fullImgPath;
	}

	public void initCacheDir() {
		final File cacheDirFile = new File( ImageCacheUtils.CACHE_DIR  );

		System.out.println("Does this dir exist: " + cacheDirFile.exists() );

		if( !cacheDirFile.exists() ) {
			// create one
			// try to create?
			cacheDirFile.mkdirs();
		}
	}

	//	public static void instance() {
	//		
	//	}

}
