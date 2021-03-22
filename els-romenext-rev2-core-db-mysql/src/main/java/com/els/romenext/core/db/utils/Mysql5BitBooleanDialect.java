package com.els.romenext.core.db.utils;

import org.hibernate.dialect.MySQL5Dialect;

public class Mysql5BitBooleanDialect extends MySQL5Dialect{     
    public Mysql5BitBooleanDialect() {
        super();
        registerColumnType( java.sql.Types.BOOLEAN, "bit" );        
        registerColumnType( java.sql.Types.INTEGER, "varchar" );        

    }       
}