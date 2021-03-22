package com.els.romenext.dbaccess.utils;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.els.romenext.dbaccess.enums.RomeAdminPersistenceUnit;

public class DatabaseManager {

	/**
	 * Should be a concurrentmap, 
	 * TODO: Change this to a concurrentmap later
	 */
	private static Map<String, DatabaseManager> holder = new HashMap<String, DatabaseManager>();  
	
	public String namespace;
	public String name;
	public String ip;
	public String port;
	public String username;
	public String password;
	
	public String status;
	public String dbMessage;
	
	public String version;
	
	public String hbmStatus;
	public RomeAdminPersistenceUnit persistenceUnit;
	
	public DatabaseManager( String namespace, String name, String ip, String port, String username, String password ) {
		this.namespace = namespace;
		this.name = name;
		this.ip = ip;
		this.port = port;
		this.username = username;
		this.password = password;
	}
	
	public DatabaseManager( String namespace, String name, String ip, String port, String username, String password, String status, String dbMessage, 
			String hbmStatus, RomeAdminPersistenceUnit persistenceUnit ) {
		this.namespace = namespace;
		this.name = name;
		this.ip = ip;
		this.port = port;
		this.username = username;
		this.password = password;
		this.status = status;
		this.dbMessage = dbMessage;
		this.hbmStatus = hbmStatus;
		
		this.persistenceUnit = persistenceUnit;
	}
	
	public static Set<String> getAllNamespaces() {
		return DatabaseManager.holder.keySet();
	}
	
	public static DatabaseManager get( String key ) {
		return DatabaseManager.holder.get( key );
	}
	
	public static Collection<DatabaseManager> getAllValues() {
		return DatabaseManager.holder.values();
	}
	
//	public static void add( String namespace, String name, String ip, String port, String username, String password ) {
//		DatabaseManager m = new DatabaseManager(namespace, name, ip, port, username, password);
//		
//		DatabaseManager.holder.put( namespace,  m );
//	}
	
	public static void add( String namespace, String name, String ip, String port, String username, String password, String status, String dbMessage, String hbmStatus, RomeAdminPersistenceUnit pu ) {
		DatabaseManager m = new DatabaseManager(namespace, name, ip, port, username, password, status, dbMessage, hbmStatus, pu );
		
		DatabaseManager.holder.put( namespace,  m );
	}

	public static Map<String, DatabaseManager> getHolder() {
		return holder;
	}

	public static void setHolder(Map<String, DatabaseManager> holder) {
		DatabaseManager.holder = holder;
	}
	
	public static void put( String key, DatabaseManager db) {
		DatabaseManager.holder.put( key,  db );
	}
	
	public static void remove( String key ) {
		DatabaseManager.holder.remove( key );
	}
	
	
	

	public String getNamespace() {
		return namespace;
	}

	public void setNamespace(String namespace) {
		this.namespace = namespace;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDbMessage() {
		return dbMessage;
	}

	public void setDbMessage(String dbMessage) {
		this.dbMessage = dbMessage;
	}

	public String getHbmStatus() {
		return hbmStatus;
	}

	public void setHbmStatus(String hbmStatus) {
		this.hbmStatus = hbmStatus;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public RomeAdminPersistenceUnit getPersistenceUnit() {
		return persistenceUnit;
	}

	public void setPersistenceUnit(RomeAdminPersistenceUnit persistenceUnit) {
		this.persistenceUnit = persistenceUnit;
	}
	
	
}
