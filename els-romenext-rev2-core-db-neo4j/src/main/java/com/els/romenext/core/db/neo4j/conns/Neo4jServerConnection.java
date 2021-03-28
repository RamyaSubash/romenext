package com.els.romenext.core.db.neo4j.conns;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.neo4j.graphdb.Result;

import com.els.romenext.core.db.neo4j.dao.util.core.PostProcessorUtils;
import com.els.romenext.core.db.neo4j.entity.INeo4jParsable;
import com.els.romenext.core.db.neo4j.enums.Neo4jRESTAPIEndpointEnum;

public class Neo4jServerConnection<T extends INeo4jParsable<T>> implements Neo4jConnection<T> {

	private static Logger log = Logger.getLogger(Neo4jServerConnection.class);
	
	private String neo4jServerUrl;
	private String usernamePassword;
	
	public Neo4jServerConnection(String neo4jServerUrl, String usernamePassword) {
		this.neo4jServerUrl = neo4jServerUrl;
		this.usernamePassword = usernamePassword;
	}
	
	@Override
	public String getVersion() {
		
		if (StringUtils.isBlank(neo4jServerUrl) || StringUtils.isBlank(usernamePassword)) {
			 log.error("No Neo4j Server URL or Username & Password Supplied");
			 return null;
		 } 
		
		 String results = ""; 
		 
		 try {
			 
			 System.out.println("What is the auth: " + usernamePassword );
			 
			 
			 // Build connection
			 System.out.println( "URL:" + neo4jServerUrl + Neo4jRESTAPIEndpointEnum.DB_DATA.getEndpoint() );
			 URL url = new URL(neo4jServerUrl + Neo4jRESTAPIEndpointEnum.DB_DATA.getEndpoint());
			 HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			 
			 conn.setDoOutput( false );
//			 conn.setDoOutput(true);
			 conn.setRequestMethod("GET");
			 conn.setRequestProperty("Accept", "application/json; charset=UTF-8");
			 conn.setRequestProperty("Authorization", "Basic " + usernamePassword);
			 conn.setRequestProperty("Content-Type", "application/json");
			 
			 
			 
			 
			 
			 // create a json object
//			 JSONObject obj = new JSONObject( input );
			 
//			 OutputStream os = conn.getOutputStream();
//			 os.write(input.getBytes());
			 
//			 String escapeJson = StringEscapeUtils.escapeJson(input);
			 
//			 System.out.println("ESCAPED?[" + escapeJson + "]");
			 
//			 os.write( escapeJson.getBytes() );
//			 os.flush();
		     	 
			 // Check response code
			 
			 if(conn.getResponseCode() == HttpURLConnection.HTTP_INTERNAL_ERROR ) {
				 log.error("Failed : HTTP error code: " + conn.getResponseCode());
				 System.out.println( "Failed : HTTP error code: " + conn.getResponseCode() );
				 return null; 
			 }
			 
			 
			 if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {

				 //throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
				 log.error("Failed : HTTP error code: " + conn.getResponseCode());
				 System.out.println( "Failed : HTTP error code: " + conn.getResponseCode() );
				 return null;
				 
			 }
			 
			 BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
			 
			 String output = "";
//			 System.out.println("Output from Server .... \n");
			 while ((output = br.readLine()) != null) {

				 //log.debug("Outputs: " + output);
 			     //System.out.println("Outputs: " + output);
				 results = results + output;
				 
			 }
		 
			 br.close();
			 
			 conn.disconnect();
			 
//			 System.out.println( results );
			 
		 } catch (MalformedURLException e) {
			 
			 e.printStackTrace();
			 return null;
			 
		 } catch (IOException e) {
			 
			 e.printStackTrace();
			 return null;
			 
		 }
		 
		 JSONObject jsonResults = new JSONObject(results);
		 
		 // Handle REST API errors
		 if (jsonResults.has("errors")) {
			 
			 JSONArray apiErros = jsonResults.getJSONArray("errors");
			 
			 if (apiErros != null && apiErros.length() != 0) {
				 
//				 System.out.println(apiErros);
				 log.error(apiErros);
				 return null;
				 
			 }
			 
		 }
		 
		 // Return JSONArray results
		 if (jsonResults.has("neo4j_version")) {
			 
			 return jsonResults.getString("neo4j_version"); 
			 
		 } else {
			 
			 return null;
			 
		 }
	}
	
	/**
	 * Call Neo4j transactional API
	 * @param input
	 * @return results
	 */
	public JSONArray callTransactionalAPI (String input) {
		 
		 if (StringUtils.isBlank(neo4jServerUrl) || StringUtils.isBlank(usernamePassword)) {
			 log.error("No Neo4j Server URL or Username & Password Supplied");
			 return null;
		 } 
		
		 String results = "";
		 
		 System.out.println("What is the FINAL QUERY: [" + input + "]");
		 
		 try {
			 
			 // Build connection
			 System.out.println( "URL:" + neo4jServerUrl + Neo4jRESTAPIEndpointEnum.TRANSACTIONAL_ENDPOINT.getEndpoint() );
			 URL url = new URL(neo4jServerUrl + Neo4jRESTAPIEndpointEnum.TRANSACTIONAL_ENDPOINT.getEndpoint());
			 HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			 conn.setDoOutput(true);
			 conn.setRequestMethod("POST");
			 conn.setRequestProperty("Accept", "application/json; charset=UTF-8");
			 conn.setRequestProperty("Authorization", "Basic " + usernamePassword);
			 conn.setRequestProperty("Content-Type", "application/json");
			 
			 // create a json object
			 JSONObject obj = new JSONObject( input );
			 
			 OutputStream os = conn.getOutputStream();
			 os.write(input.getBytes());
			 
//			 String escapeJson = StringEscapeUtils.escapeJson(input);
			 
//			 System.out.println("ESCAPED?[" + escapeJson + "]");
			 
//			 os.write( escapeJson.getBytes() );
			 os.flush();
		     	 
			 // Check response code
			 if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {

				 //throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
				 log.error("Failed : HTTP error code: " + conn.getResponseCode());
				 return null;
				 
			 }
			 
			 BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
			 
			 String output = "";
//			 System.out.println("Output from Server .... \n");
			 while ((output = br.readLine()) != null) {

				 //log.debug("Outputs: " + output);
  			     //System.out.println("Outputs: " + output);
				 results = results + output;
				 
			 }
		 	 System.out.println("Printing the results from neo4j api");
			 System.out.println(results);
			 br.close();
			 
			 conn.disconnect();
			 
		 } catch (MalformedURLException e) {
			 
			 e.printStackTrace();
			 return null;
			 
		 } catch (IOException e) {
			 
			 e.printStackTrace();
			 return null;
			 
		 }
		 
		 JSONObject jsonResults = new JSONObject(results);
		 
		 // Handle REST API errors
		 if (jsonResults.has("errors")) {
			 
			 JSONArray apiErros = jsonResults.getJSONArray("errors");
			 
			 if (apiErros != null && apiErros.length() != 0) {
				 
//				 System.out.println(apiErros);
				 log.error(apiErros);
				 return null;
				 
			 }
			 
		 }
		 
		 // Return JSONArray results
		 if (jsonResults.has("results")) {
			 
			 JSONArray apiResults = jsonResults.getJSONArray("results");
			 
			 return apiResults;
			 
		 } else {
			 
			 return null;
			 
		 }
		
	}

	@Override
	public List<T> convert(Object result, Class<T> clazz ) {
		
		if( result instanceof JSONArray ) {
			
			T t;
			try {
				t = clazz.newInstance();
			
				
				List<T> results = t.parseNeo4jAPIResults( result );
				
				System.out.println("--------------- Preprocessing --------------------");
				// post processer
				PostProcessorUtils<T> utils = new PostProcessorUtils<T>();
				utils.post(results);
				
				return results;
				
			} catch (InstantiationException | IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
		} else if( result instanceof Result ) {
//			converted = converted.parseNeo4jAPIResults( result );
//			return;
		}
		
		return null;
	}

	@Override
	public List<T> execute(String cypher, Class<T> clazz ) {
		
		 String escapeJson = StringEscapeUtils.escapeJson(cypher);

		
		String input = "{\"statements\":[{\"statement\":\"" + escapeJson + "\", \"resultDataContents\":[\"row\", \"graph\"]}]}";
		//System.out.println(input);
		
		
		JSONArray result = this.callTransactionalAPI( input );
		return this.convert( result, clazz  );
	}
	
	@Override
	public List<T> executeList(List<String> cypherList, Class<T> clazz ) {
		
		 String escapeJson = StringEscapeUtils.escapeJson( cypherList.get(0) );

		//final long startTime1 = System.currentTimeMillis();
		String fStatement = "{\"statement\":\"" + escapeJson + "\", \"resultDataContents\":[\"row\", \"graph\"]}";
		String input = "{\"statements\":[" + fStatement;		
		for (int i = 1; i < cypherList.size(); i++) {
			
			 String tmpEscJson = StringEscapeUtils.escapeJson( cypherList.get(i) );

			String statement = "{\"statement\":\"" + tmpEscJson + "\", \"resultDataContents\":[\"row\", \"graph\"]}";
			input += ", " + statement;					
		}
		input += "]}";
		//final long endTime1 = System.currentTimeMillis();
		//System.out.println("Total input building time: " + (endTime1 - startTime1) );
		//System.out.println(input);
		
		//final long startTime2 = System.currentTimeMillis();
		JSONArray result = this.callTransactionalAPI( input );
		//final long endTime2 = System.currentTimeMillis();
		//System.out.println("Total calling time: " + (endTime2 - startTime2) );
		
		return this.convert( result, clazz  );
	}
	
//	@Override
//	public List<T> executeList(String cypher, Map<String, Object> cypherList, Class<T> clazz) {
//		
//		// build the param map
//		JSONObject props = new JSONObject();
//		for( String key : cypherList.keySet() ) {
//			Object val = cypherList.get( key );
//			
//			props.put( key, val );
//		}
//		
//		String input = "{\"statements\":[{\"statement\":\"" + cypher + "\", \"resultDataContents\":[\"row\", \"graph\"]}]}";
//		//System.out.println(input);
//		JSONArray result = this.callTransactionalAPI( input );
//		return this.convert( result, clazz  );
//	}
}
