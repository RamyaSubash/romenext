package com.els.romenext.core.util;

import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;

/**
 * Created to remove the instances of this in the code:
 * 
 * //		String sFullLabel = snNode.getLabels().get( 0 );
		String sRestLabel = sFullLabel.substring(sFullLabel.indexOf('_')+1, sFullLabel.length());
		String sLastLabel = sRestLabel.substring(sRestLabel.indexOf('_')+1, sRestLabel.length());
		String sTypeId = sLastLabel.substring(1, sLastLabel.length());
 * @author jlee
 *
 */
public class RomeTypeLabelUtils {
	
	public final static String METADATA_TOKEN = "m";
	public final static String REPO_TOKEN = "r";
	public final static String TYPE_TOKEN = "t";

	/**
	 * NOTE: The TRUE label will be something like mX_rX_tX or mX_rX_cX
	 * 
	 * System labels will be of PATH,SYSTEM
	 * @param labels
	 * @return
	 */
	public static String getTrueLabel( List<String> labels ) {
		
		if( labels == null || labels.size() <= 0 ) {
			return null;
		}
		
		for( String s : labels ) {
			// attempt to parse
//			RomeTypeClassificationEnum parsed = RomeTypeClassificationEnum.getEnum( s );
			// ensure this isn't the XMETA/XREPO/etc
			RomeTypeClassificationEnum parsed = RomeTypeClassificationEnum.getEnumStartsWith( s );

			if( parsed == null ) {
				// did not match against PATH/NODE/SYSTEM
				// do another sanity check to make sure it's the core label?
				
				return s;
				
			} else {
				continue;
			}
		}
		return null;
	}
	
	public static String getOtherLabel( List<String> labels, RomeTypeClassificationEnum toSearch ) {
		
		if( labels == null || labels.size() <= 0 ) {
			return null;
		}
		
		for( String s : labels ) {
			// attempt to parse
			RomeTypeClassificationEnum parsed = RomeTypeClassificationEnum.getEnumStartsWith( s );
			if( parsed == toSearch ) {
				// did not match against PATH/NODE/SYSTEM
				// do another sanity check to make sure it's the core label?
				
				return s;
				
			} else {
				continue;
			}
		}
		return null;
	}
	
//	/**
//	 * Will retrieve the TYPE id from a given FULL TRUE label.
//	 * 
//	 * Note: If there are multiple labels, it will only work against the true label. ie. Ignore PATH/NODE/SYSTEM
//	 * 
//	 * Also: This will ignore if the last parameter is NOT of type TYPE (ie. connection)
//	 * @param labels
//	 * @return
//	 */
//	public static String getTypeId( List<String> labels ) {
//		
//		String trueLabel = RomeTypeLabelUtils.getTrueLabel( labels );
//		
//		// we only care about the last T label
//		
//		if( labels == null || labels.size() <= 0 ) {
//			return null;
//		}
//		
//		for( String s : labels ) {
//			// attempt to parse
//			RomeTypeClassificationEnum parsed = RomeTypeClassificationEnum.getEnum( s );
//			if( parsed == null ) {
//				// did not match against PATH/NODE/SYSTEM
//				// do another sanity check to make sure it's the core label?
//				
//				return s;
//				
//			} else {
//				continue;
//			}
//		}
//		return null;
//	}
	
	public static String getMetadataId( List<String> labels ) {
		
		
		// we only care about the last T label
		
		if( labels == null || labels.size() <= 0 ) {			
			return null;
		}
		String trueLabel = RomeTypeLabelUtils.getTrueLabel( labels );
		
		if( trueLabel == null ) {
			// if we don't find the true label, should we attempt to find this via the new meta label? (XMETA)
			String otherLabel = RomeTypeLabelUtils.getOtherLabel(labels, RomeTypeClassificationEnum.XMETA );
			
			if( otherLabel == null ) {
				return null;
			}
			
			return RomeTypeLabelUtils.getMetadataIdViaXMeta( otherLabel );
		}
		
		// attempt to just parse the truelabel
		return RomeTypeLabelUtils.getMetadataId( trueLabel );
		
	}
	
	/**
	 * We assume that this is a full true label
	 * @param trueLabel
	 * @return
	 */
	public static String getTypeId( String trueLabel ) {
		
		String[] splits = StringUtils.splitPreserveAllTokens( trueLabel,  '_' );
		
		if( splits.length == 3 ) {
			// this is correct format
			String tlabel = splits[2];
			
			// ensure this starts with t
			if( tlabel.startsWith( RomeTypeLabelUtils.TYPE_TOKEN ) ) {
				String validTypeId = tlabel.substring( 1,  tlabel.length() );
				
				// ensure this is a number
				try {
					 Integer.valueOf( validTypeId );
					 
					 return validTypeId;
				} catch( Exception e ) {
					
				}
			}
		}
		
		return null;
	}
	
	public static String getMetadataId( String trueLabel ) {
		
		String[] splits = StringUtils.splitPreserveAllTokens( trueLabel,  '_' );
		
		if( splits.length == 3 ) {
			// this is correct format
			String tlabel = splits[0];
			
			// ensure this starts with t
			if( tlabel.startsWith( RomeTypeLabelUtils.METADATA_TOKEN ) ) {
				String validTypeId = tlabel.substring( 1,  tlabel.length() );
				
				// ensure this is a number
				try {
					 Integer.valueOf( validTypeId );
					 
					 return validTypeId;
				} catch( Exception e ) {
					
				}
			}
		}
		
		return null;
	}
	
	public static String getMetadataIdViaXMeta( String xmetaToken ) {
		
		if( xmetaToken == null || !StringUtils.startsWithIgnoreCase( xmetaToken,  RomeTypeClassificationEnum.XMETA.getClassification() ) ) {
			return null;
		}
		
		// strip xmeta token and grab the metadata token
		String token = StringUtils.removeStartIgnoreCase( xmetaToken,  RomeTypeClassificationEnum.XMETA.getClassification() ) ;
		
		return token;
		
	}
	
	public static String getTypeId( List<String> labels ) {
		
		String trueLabel = RomeTypeLabelUtils.getTrueLabel( labels );
		
		if( trueLabel == null ) {
			return null;
		}
		
		return RomeTypeLabelUtils.getTypeId( trueLabel );
		
	}
	
	/**
	 * Builds the old legacy full label.
	 * 
	 * ie. m1_r2_t3
	 * 
	 * @param metadata
	 * @param repo
	 * @param typeId
	 * @return
	 */
	public static String buildLegacyLabel(MetadataContainer metadata, MetadataRepoContainer repo, Long typeId) {
		if (metadata == null) {
			return null;
		}
		
		if (repo == null) {
			return null;
		}
		
		if (typeId == null) {
			return null;
		}
		
		return RomeTypeLabelUtils.METADATA_TOKEN + metadata.getId() + "_" + RomeTypeLabelUtils.REPO_TOKEN + repo.getId() + "_" + RomeTypeLabelUtils.TYPE_TOKEN + typeId;
	}
	
}