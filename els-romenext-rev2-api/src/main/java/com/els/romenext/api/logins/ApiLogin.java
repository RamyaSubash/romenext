package com.els.romenext.api.logins;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.jboss.as.controller.client.ModelControllerClient;
import org.jboss.as.controller.client.OperationBuilder;
import org.jboss.as.controller.client.helpers.ClientConstants;
import org.jboss.dmr.ModelNode;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.logins.req.LoginRequest;
import com.els.romenext.api.logins.service.LoginService;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.dbaccess.enums.RomeAdminPersistenceUnit;
import com.els.romenext.dbaccess.utils.DatabaseManager;
import com.els.romenext.dbaccess.utils.dynamic.DynamicEMFactory;
import com.els.romenext.web.general.pojo.MysqlUser;
import com.els.romenext.web.general.utils.LoginUtils;
import com.google.gson.Gson;

@Path("/login")
public class ApiLogin {

	private static Logger log = Logger.getLogger(ApiLogin.class);

	/**
	 * ONLY FOR TESTING
	 * 
	 * DELETE LATER
	 * 
	 * TODO: DELETE LATER
	 * @param host
	 * @param port
	 * @param username
	 * @param pw
	 * @return
	 */
	@GET
	@Path("/login/{host}/{port}/{username}/{pw}")
	@Produces("application/json")
	public Response getAllLoginsByGroup(@PathParam("host") String host, 
			@PathParam("port") String port, 
			@PathParam("username") String username,
			@PathParam("pw") String pw ) {

		ResponseBuilder responseBuilder;

		if (StringUtils.isAnyEmpty(host, port, username, pw )) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}






		Connection conn;
		MysqlUser user = null;
		String url = "jdbc:mysql://" + host + "/?" + "user=" + username + "&password=" + pw + "&autoReconnect=true&serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true";
		try {
			System.out.println("Attempting to connect : " + url );
			conn = DriverManager.getConnection( url );

			System.out.println("==============Connection established "+ conn);
			LoginUtils utils = new LoginUtils();

			user = utils.attemptToLoadUser( conn );

			System.out.println("User found : " + user );

		} catch (SQLException e2) {
//			 e2.printStackTrace();
//			String error = e2.getCause().getMessage();
			log.info("Failed to log in user", e2 );
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.LOGIN_FAILED, null).getResponseBuilder();
			responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( false )).type(MediaType.APPLICATION_JSON);
			return responseBuilder.build();
		}






		String datasource = null;

		try {
			datasource = this.createMySQLDatasource( host, "3306", username, pw );
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( false )).type(MediaType.APPLICATION_JSON);
			return responseBuilder.build();
		}


		if( datasource == null ) {
			log.error("Failed to create the datasource");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( false )).type(MediaType.APPLICATION_JSON);

			return responseBuilder.build();
		}

		// generate the hibernate
		DatabaseManager db = DatabaseManager.get( username );

		//		if( db == null ) {
		//			db = new DatabaseManager( username,  username, ip, port, username, password, "GOOD", "", "update", persistenceUnit)
		//		}

		if( db != null ) {
			DynamicEMFactory.deleteInstance( db.getNamespace() );	    			
		} else {
			db = new DatabaseManager( username,  username, host, port, username, pw, "GOOD", "", "update", RomeAdminPersistenceUnit.FULL ); 
		}

		// attempt to create a connection
		boolean successful = false;
		String dberror = "";
		try {

			System.out.println("===== START Tryhing to build factory dynamically");
			DynamicEMFactory.createInstance( username, "romenext", host, port, username, pw, "update" );

			//			DynamicEMFactory.createInstance( username, datasource, "update");
			System.out.println("===== END ");
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
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( false )).type(MediaType.APPLICATION_JSON);
			return responseBuilder.build();
		}

		String status = "GOOD";
		if( !successful ) {
			status = "INVALID";
		}

		db.setStatus( status );
		db.setDbMessage( dberror );
		db.setHbmStatus( "update" );



		DatabaseManager.put( username, db );



		RomeTypeDao dao = new RomeTypeDao( username );

		List<RomeType> all = dao.getAll();

		System.out.println("Entereing?");
		for( RomeType t : all ) {
			System.out.println( t );
		}



		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( user )).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
	}



	@POST
	@Path("/login/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response login( String jsonString ) {

		ResponseBuilder responseBuilder;

		JSONObject json = null;

		try {
			json = new JSONObject(jsonString);
		} catch (JSONException e) {
			log.error("Bad JSON Format!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}

		LoginRequest request = new LoginRequest();

		String empty = request.validateRequest(json);

		if(!StringUtils.isEmpty(empty)) {
			log.debug("This is missing: " + empty);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}

		try {
			request.parseRequest(json);
			System.out.println(request);
		} catch (JSONException e) {
			log.error("Bad JSON Format!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}

		Response reponse = request.preprocessor();

		if (reponse != null) {
			return reponse;
		}

		LoginService service = new LoginService();

		return service.runService( request );
	}


	public String createMySQLDatasource( String ip, String port, String username, String pw ) throws Exception{


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
		request.get("connection-url").set("jdbc:mysql://" + ip + ":" + port + "/romenext?serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true");
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

		return datasource;

	}

}