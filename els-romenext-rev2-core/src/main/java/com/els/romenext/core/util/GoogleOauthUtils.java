package com.els.romenext.core.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.List;

import org.apache.log4j.Logger;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.GmailScopes;


import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;

//import com.google.api.client.auth.oauth2.Credential;
//import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
//import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
//import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
//import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
//import com.google.api.client.http.HttpTransport;
//import com.google.api.client.json.gson.GsonFactory;
//import com.google.api.client.util.store.FileDataStoreFactory;
//import com.google.api.services.gmail.Gmail;
//import com.google.api.services.gmail.GmailScopes;
//import com.google.api.services.oauth2.Oauth2;
//import com.google.api.services.oauth2.model.Userinfoplus;
//import java.io.BufferedWriter;
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.io.InputStreamReader;
//import java.io.OutputStreamWriter;
//import java.nio.file.Files;
//import java.nio.file.Paths;
//import java.security.GeneralSecurityException;
//import java.util.HashSet;
//import java.util.Set;
//import org.apache.commons.logging.Log;
//import org.apache.commons.logging.LogFactory;
//import org.yccheok.jstock.engine.Pair;

/**
 *
 * @author yccheok
 * 
 * 
 * 
 * DOES NOT DO WHAT I WANT IT TO DO
 */
public class GoogleOauthUtils {
	

	private static final String APPLICATION_NAME =
			"Gmail API Java Quickstart";

	/** Directory to store user credentials for this application. */
	private static final java.io.File DATA_STORE_DIR = new java.io.File( System.getProperty("user.home"), ".credentials/gmail-java-quickstart.json");

	/** Global instance of the {@link FileDataStoreFactory}. */
	private static FileDataStoreFactory DATA_STORE_FACTORY;

	/** Global instance of the JSON factory. */
	private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

	/** Global instance of the HTTP transport. */
	private static HttpTransport HTTP_TRANSPORT;

	/** Global instance of the scopes required by this quickstart.
	 *
	 * If modifying these scopes, delete your previously saved credentials
	 * at ~/.credentials/gmail-java-quickstart.json
	 */
	private static final List<String> SCOPES = Arrays.asList(GmailScopes.GMAIL_LABELS);

	static {
		try {
			HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
			DATA_STORE_FACTORY = new FileDataStoreFactory(DATA_STORE_DIR);
		} catch (Throwable t) {
			t.printStackTrace();
			System.exit(1);
		}
	}



//    /** Global instance of the JSON factory. */
//    private static final GsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

//    /** Global instance of the HTTP transport. */
//    private static HttpTransport httpTransport;

//    private static final Logger log = Logger.getLogger(GoogleOauthUtils.class);
//
//    static {
//        try {
//            // initialize the transport
//            httpTransport = GoogleNetHttpTransport.newTrustedTransport();
//
//        } catch (IOException ex) {
//            log.error(null, ex);
//        } catch (GeneralSecurityException ex) {
//            log.error(null, ex);
//        }
//    }
//
//    private static File getGmailDataDirectory() {
//        return new File(org.yccheok.jstock.gui.GoogleOauthUtils.getUserDataDirectory() + "authentication" + File.separator + "gmail");
//    }
//
//    /**
//     * Send a request to the UserInfo API to retrieve the user's information.
//     *
//     * @param credentials OAuth 2.0 credentials to authorize the request.
//     * @return User's information.
//     * @throws java.io.IOException
//     */
//    public static Userinfoplus getUserInfo(Credential credentials) throws IOException
//    {
//        Oauth2 userInfoService =
//            new Oauth2.Builder(httpTransport, JSON_FACTORY, credentials).setApplicationName("JStock").build();
//        Userinfoplus userInfo  = userInfoService.userinfo().get().execute();
//        return userInfo;
//    }
//
//    public static String loadEmail(File dataStoreDirectory)  {
//        File file = new File(dataStoreDirectory, "email");
//        try {
//            return new String(Files.readAllBytes(Paths.get(file.toURI())), "UTF-8");
//        } catch (IOException ex) {
//            log.error(null, ex);
//            return null;
//        }
//    }
//
//    public static boolean saveEmail(File dataStoreDirectory, String email) {
//        File file = new File(dataStoreDirectory, "email");
//        try {
//            //If the constructor throws an exception, the finally block will NOT execute
//            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file), "UTF-8"));
//            try {
//                writer.write(email);
//            } finally {
//                writer.close();
//            }
//            return true;
//        } catch (IOException ex){
//            log.error(null, ex);
//            return false;
//        }
//    }
//
//    public static void logoutGmail() {
//        File credential = new File(getGmailDataDirectory(), "StoredCredential");
//        File email = new File(getGmailDataDirectory(), "email");
//        credential.delete();
//        email.delete();
//    }
//
//    public static Pair<Pair<Credential, String>, Boolean> authorizeGmail() throws Exception {
//        // Ask for only the permissions you need. Asking for more permissions will
//        // reduce the number of users who finish the process for giving you access
//        // to their accounts. It will also increase the amount of effort you will
//        // have to spend explaining to users what you are doing with their data.
//        // Here we are listing all of the available scopes. You should remove scopes
//        // that you are not actually using.
//        Set<String> scopes = new HashSet<>();
//
//        // We would like to display what email this credential associated to.
//        scopes.add("email");
//
//        scopes.add(GmailScopes.GMAIL_SEND);
//
//        // load client secrets
//        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(GoogleOauthUtils.JSON_FACTORY,
//            new InputStreamReader(GoogleOauthUtils.class.getResourceAsStream("/assets/authentication/gmail/client_secrets.json")));
//
//        return authorize(clientSecrets, scopes, getGmailDataDirectory());
//    }
//
//    /** Authorizes the installed application to access user's protected data.
//     * @return 
//     * @throws java.lang.Exception */
//    private static Pair<Pair<Credential, String>, Boolean> authorize(GoogleClientSecrets clientSecrets, Set<String> scopes, File dataStoreDirectory) throws Exception {
//        // Set up authorization code flow.
//
//        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
//            httpTransport, JSON_FACTORY, clientSecrets, scopes)
//            .setDataStoreFactory(new FileDataStoreFactory(dataStoreDirectory))
//            .build();
//        // authorize
//        return new MyAuthorizationCodeInstalledApp(flow, new LocalServerReceiver()).authorize("user");
//    }
//
    
    public static Credential authorize() throws IOException {
        // Load client secrets.
        InputStream in = GoogleOauthUtils.class.getResourceAsStream("/service_secret.json");
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        // Build flow and trigger user authorization request.
        GoogleAuthorizationCodeFlow flow =
                new GoogleAuthorizationCodeFlow.Builder(
                        HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(DATA_STORE_FACTORY)
                .setAccessType("offline")
                .build();
        Credential credential = new AuthorizationCodeInstalledApp( flow, new LocalServerReceiver()).authorize("user");
        System.out.println(
                "Credentials saved to " + DATA_STORE_DIR.getAbsolutePath());
        return credential;
    }
    
    public static Gmail getGmail(Credential credential) {
        Gmail service = new Gmail.Builder( HTTP_TRANSPORT, JSON_FACTORY, credential).setApplicationName("alltrans").build();
        return service;        
    }
}