package com.els.romenext.core.db.enums;

public enum RomeUserStatusEnum {
	DISABLED(777),
	ENABLED(666);
	
	private int statusId;
	
	
	private RomeUserStatusEnum( int statusId ) {
		this.statusId = statusId;
	}
	
	public int getUserStatusId() {
		return this.statusId;
    }

	public static RomeUserStatusEnum getEnum( Integer i ) {
		switch( i ) {
			case 777: return RomeUserStatusEnum.DISABLED;
			case 666: return RomeUserStatusEnum.ENABLED;
		}
		
		return null;
	}
};
