package com.els.romenext.core.db.enums;

public enum RomeRuleClassificationEnum {

	LINK( 1, "link" ), 
	PARENTCHILD( 2, "parentchild" );
	
	private int internalId;
	private String classification;

	private RomeRuleClassificationEnum( int internalId, String classification ) {
		this.internalId = internalId;
		this.classification = classification;
	}

	public int getInternalId() {
		return this.internalId;
	}

	public String getClassification() {
		return classification;
	}

	public static RomeRuleClassificationEnum getEnum(Integer i) {
		switch( i ) {
			case 1: return RomeRuleClassificationEnum.LINK;
			case 2: return RomeRuleClassificationEnum.PARENTCHILD;
		}
		
		return null;
	}
	
	public static RomeRuleClassificationEnum getEnum(String classification) {
		if (classification.equals(RomeRuleClassificationEnum.LINK.getClassification())) {
			return RomeRuleClassificationEnum.LINK;
		}
		
		if (classification.equals(RomeRuleClassificationEnum.PARENTCHILD.getClassification())) {
			return RomeRuleClassificationEnum.PARENTCHILD;
		}
		return null;
	}
	
}