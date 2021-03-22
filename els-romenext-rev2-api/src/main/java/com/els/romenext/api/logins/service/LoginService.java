package com.els.romenext.api.logins.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;
import org.jboss.as.controller.client.ModelControllerClient;
import org.jboss.as.controller.client.OperationBuilder;
import org.jboss.as.controller.client.helpers.ClientConstants;
import org.jboss.dmr.ModelNode;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.logins.req.LoginRequest;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.db.dao.mysql.RomeMysqlUserDao;
import com.els.romenext.core.db.entity.mysql.RomeMysqlUser;
import com.els.romenext.dbaccess.enums.RomeAdminPersistenceUnit;
import com.els.romenext.dbaccess.utils.DatabaseManager;
import com.els.romenext.dbaccess.utils.dynamic.DynamicEMFactory;
import com.els.romenext.web.general.pojo.MysqlUser;
import com.els.romenext.web.general.utils.LoginUtils;
import com.google.gson.Gson;

public class LoginService {

	private static Logger log = Logger.getLogger(LoginService.class);
		
	public Response runService( LoginRequest req ) {
		
//		ResponseBuilder responseBuilder;
//		
//		if (req == null) {
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		
//		
//		String datasource = null;
//		
//		try {
//			datasource = this.createMySQLDatasource( req.getHost(), req.getPort(), req.getUsername(), req.getPassword()  );
//		} catch (Exception e1) {
//			// TODO Auto-generated catch block
//			e1.printStackTrace();
//		}
//		
//		
//		if( datasource == null ) {
//			log.error("Failed to create the datasource");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		// generate the hibernate
//		DatabaseManager db = DatabaseManager.get( req.getUsername() );
//		
////		if( db == null ) {
////			db = new DatabaseManager( username,  username, ip, port, username, password, "GOOD", "", "update", persistenceUnit)
////		}
//		
//		if( db != null ) {
//			DynamicEMFactory.deleteInstance( db.getNamespace() );	    			
//		} else {
//			db = new DatabaseManager( req.getUsername(),  req.getUsername(), req.getHost(), req.getPort(), req.getUsername(), req.getPassword(), "GOOD", "", "update", RomeAdminPersistenceUnit.FULL ); 
//		}
//		
//		// attempt to create a connection
//		boolean successful = false;
//		String dberror = "";
//		try {
//			
//			DynamicEMFactory.createInstance( req.getUsername(), datasource, "update");
//
////			DynamicEMFactoryV2.createInstance(namespace, name, ip, port, username, password, "validate");
//			//					DynamicEMFactory.createInstance(namespace, name, ip, port, username, password, "validate");
//
//			// just try a random connection
////			RomeUserDao userDao = new RomeUserDao( namespace );
////
////			List<RomeUser> all = userDao.getAll();
////
////			System.out.println("All : " + all );
//			successful = true;
//		} catch (Throwable e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			dberror = e.getCause().getMessage();
//		}
//
//		String status = "GOOD";
//		if( !successful ) {
//			status = "INVALID";
//		}
//		
//		db.setStatus( status );
//		db.setDbMessage( dberror );
//		db.setHbmStatus( "update" );
//		
//		
//		
//		DatabaseManager.put( req.getUsername(), db);
//		
//		
//		
//		
//		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
//		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( true )).type(MediaType.APPLICATION_JSON);
//		return responseBuilder.build();
//		
		
		
		
		
		
		
		
		ResponseBuilder responseBuilder;
		






		Connection conn;
		MysqlUser user = null;
		try {
			String test = "jdbc:mysql://" + req.getHost() + ":" + req.getPort() + "/?" + "user=" + req.getUsername() + "&password=" + req.getPassword() + "&serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true";
//			conn = DriverManager.getConnection("jdbc:mysql://" + req.getHost() + ":" + req.getPort() + "/?" + "user=" + req.getUsername() + "&password=" + req.getPassword() );
			
			System.out.println("DB URL: "  + test );
			
			conn = DriverManager.getConnection( test );

			
			System.out.println("==============Connection established "+ conn);
			LoginUtils utils = new LoginUtils();

			user = utils.attemptToLoadUser( conn );

			System.out.println("User found : " + user );

		} catch (SQLException e2) {
			e2.printStackTrace();
			log.warn("Failed to log in with username" + req.getUsername() );
//			String error = e2.getCause().getMessage();
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( false )).type(MediaType.APPLICATION_JSON);
			return responseBuilder.build();
		}


		String datasource = null;

		try {
			datasource = this.createMySQLDatasource( req.getHost(), req.getPort(), req.getUsername(), req.getPassword()  );
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}


		if( datasource == null ) {
			log.error("Failed to create the datasource");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( false )).type(MediaType.APPLICATION_JSON);

			return responseBuilder.build();
		}

		
		// generate the hibernate
		DatabaseManager db = DatabaseManager.get( req.getUsername() );
		
//		if( db == null ) {
//			db = new DatabaseManager( username,  username, ip, port, username, password, "GOOD", "", "update", persistenceUnit)
//		}
		
		if( db != null ) {
			DynamicEMFactory.deleteInstance( db.getNamespace() );	    			
		} else {
			db = new DatabaseManager( req.getUsername(),  req.getUsername(), req.getHost(), req.getPort(), req.getUsername(), req.getPassword(), "GOOD", "", "update", RomeAdminPersistenceUnit.FULL ); 
		}
		
		// attempt to create a connection
		boolean successful = false;
		String dberror = "";
		try {
			DynamicEMFactory.createInstance( req.getUsername(), "romenext", req.getHost(), req.getPort(), req.getUsername(), req.getPassword(), "update" );

//			DynamicEMFactory.createInstance( req.getUsername(), datasource, "update");

//			DynamicEMFactoryV2.createInstance(namespace, name, ip, port, username, password, "validate");
			//					DynamicEMFactory.createInstance(namespace, name, ip, port, username, password, "validate");

			// just try a random connection
//			RomeUserDao userDao = new RomeUserDao( namespace );
//
//			List<RomeUser> all = userDao.getAll();
//
//			System.out.println("All : " + all );
			successful = true;
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			dberror = e.getCause().getMessage();
		}

		String status = "GOOD";
		if( !successful ) {
			status = "INVALID";
		}
		
		db.setStatus( status );
		db.setDbMessage( dberror );
		db.setHbmStatus( "update" );
		
		
		
		DatabaseManager.put( req.getUsername(), db);

		System.out.println("Configured db manager done");
		
		
		
		
		/**
		 * We add some logic here to see if this is a redirected user.
		 * 
		 * NOTE: Redirected users are entereing the system via a proxy ip, and as such, the user MUST hit the proxy ip, not the
		 * currently assigned IP
		 */
		
		RomeMysqlUserDao userDao = new RomeMysqlUserDao( req.getUsername() );

		System.out.println("Configured RomeMysqlUserDao done");
		
		RomeMysqlUser redirected = userDao.findByUsername( req.getUsername() );
		
		System.out.println("Configured RomeMysqlUser done");
		if( redirected != null && redirected.getIsRedirected() ) {
			// he is being redirected!
			// pass the api ip 
			
			System.out.println("Setting this user as redirected");
			
			user.setIsRedirected( Boolean.TRUE );
			user.setRedirectedIp( redirected.getRedirectIp() );
		}
		
		
		
		



		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		System.out.println("Configured responseBuilder error resp done");
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( user )).type(MediaType.APPLICATION_JSON);
		
		return responseBuilder.build();
		
		
		
		
		
		
		
		
		
		
		
		
	}
	
	private String createMySQLDatasource( String ip, String port, String username, String pw ) throws Exception{
		
		
		ModelControllerClient client = ModelControllerClient.Factory.create("localhost",  9990 );
		
		if( client == null ) {
			return null;
		}
		
		String datasource = "java:/mysqlDS_" + username;
		
		ModelNode request = new ModelNode();
		request.get(ClientConstants.OP).set(ClientConstants.ADD);
		request.get(ClientConstants.OP_ADDR).add("subsystem","datasources");
		request.get(ClientConstants.OP_ADDR).add("data-source","java:/mysqlDS_" + username);
		request.get("jndi-name").set("java:/mysqlDS_" + username );
		request.get("connection-url").set("jdbc:mysql://" + ip + ":" + port + "/romenext?autoReconnect=true&serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true");
		//		  request.get("driver-class").set("com.mysql.jdbc.Driver");

		// should find this another way?
		//		  request.get("driver-name").set("mysql-connector-java-5.1.44-bin.jar");
		request.get("driver-name").set("mysql");

		request.get("user-name").set( username );
		request.get("password").set( pw );
		request.get("pool-name").set("dynamicpool_" + username );

		//		  ModelControllerClient client = ModelControllerClient.Factory.create(InetAddress.getByName("localhost"), 9990);
		//		  ModelControllerClient client = ModelControllerClient.Factory.create(InetAddress.getLocalHost(), 9990);

		client.execute(new OperationBuilder(request).build());
		
		System.out.println(datasource);
		
		  
		return datasource;
		  
		}

}
