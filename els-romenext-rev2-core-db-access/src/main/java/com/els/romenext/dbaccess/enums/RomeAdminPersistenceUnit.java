package com.els.romenext.dbaccess.enums;

public enum RomeAdminPersistenceUnit {

	EMPTY("romenext_empty"),
	VERSION_ONLY("romenext_version"),
	FULL("romenext");

	private String persistenceUnitName;

	private RomeAdminPersistenceUnit( String name ) {
		this.persistenceUnitName = name;
	}

	public String getPersistenceUnit() {
		return this.persistenceUnitName;
	}

	public static RomeAdminPersistenceUnit getValue( String name ) {

		switch( name ) {
		case "romenext_empty":
			return RomeAdminPersistenceUnit.EMPTY;
		case "romenext_version":
			return RomeAdminPersistenceUnit.VERSION_ONLY;
		case "romenext":
			return RomeAdminPersistenceUnit.FULL;
		default: return null;
		}

	}
}
