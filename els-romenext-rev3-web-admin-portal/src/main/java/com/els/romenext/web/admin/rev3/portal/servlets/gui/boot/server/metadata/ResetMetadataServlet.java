package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.server.metadata;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.MysqlMetadataServer;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.general.enums.RomeVersionEnum;

@WebServlet("/boot/server/metadata/reset")
public class ResetMetadataServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( ResetMetadataServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		String serverId = req.getParameter("serverIndex");
		String metaId = req.getParameter("metadata"); 
		
		if( StringUtils.isEmpty( serverId ) ||  StringUtils.isEmpty( metaId )) {
			// ? No servers found? How are we editing no servers?
			// kick him out
			log.error("Session was null");
			req.setAttribute("error", "No server ID Found");
			resp.sendRedirect("/admin/boot/dashboard");
			return;
		}
		
		Integer server = null; 
//		Long meta = null;

		try {
			server = Integer.valueOf( serverId ); 
//			meta = Long.valueOf( metaId );

		} catch( Exception e ) {
			// cast exception
			log.error("Session was null");
			req.setAttribute("error", "Server ID Was not valid");
			resp.sendRedirect("/admin/boot/dashboard");
			return;
		}
		
		HttpSession session = req.getSession();
		
		if( session == null ) {
			// kick him out
			log.error("Session was null");
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);

		}
		
		Map<Integer,MetadataServer> servers = ServerUtils.loadFromSession( session );
		
		if( servers == null ) {
			// ? No servers found? How are we editing no servers?
			// kick him out
			log.error("Session was null");
			req.setAttribute("error", "No servers loaded");
			resp.sendRedirect("/admin/boot/dashboard");

		}
		
		
		MetadataServer s = servers.get( server );
		
		
		
		
//		Map<Long, MysqlMetadataServer> metadata = s.getMetadata();
//		
//		MysqlMetadataServer metadataInstance = metadata.get( meta );
//		
//		if( metadataInstance == null ) {
//			log.error("metadataInstance was null");
//			req.setAttribute("error", "No servers loaded");
//			resp.sendRedirect("/admin/boot/dashboard");
//		}
		
		
		
		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();
		Connection conn = connUtils.getConnectionWithSchema( s );
		
		
		
		
		try {
			
			
			Statement batch = conn.createStatement();
			
			conn.setAutoCommit( false );
			
			batch.addBatch("SET FOREIGN_KEY_CHECKS = 0"); 

			
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_decos_version`");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_decos_properties`");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_decos`");
			
			
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_metadata`");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_metadata_repo`");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_version`");
			
			
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_connections`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_model`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_model_part`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_model_property`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_model_shape`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_mysql_group`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_mysql_group_type`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_neo4j_instances`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_perm_metadata_group_join`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_perm_user_group`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_perm_user_group_join`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_pref_grouptype_property`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_pref_grouptype_property_value`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_rule_decorator_property_value`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_rule_properties`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_rules`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_tabActions`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_tabContainers`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_tabObject_properties`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_tabObjects`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_type_decorator_property_value`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_type_properties`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_types`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_types_els_romenext_decos`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_user_log`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_users`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_users_admin`;");
			batch.addBatch("DROP TABLE IF EXISTS `" + s.getSchema() + "`.`els_romenext_workspace_dislay`;");
			
			//
			
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_decos_version`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_decos_properties`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_decos`");
//			
//			
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_metadata`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_metadata_repo`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_version`");
//			
//			
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_connections`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_model`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_model_part`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_model_property`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_model_shape`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_mysql_group`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_mysql_group_type`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_neo4j_instances`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_perm_metadata_group_join`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_perm_user_group`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_perm_user_group_join`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_pref_grouptype_property`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_pref_grouptype_property_value`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_rule_decorator_property_value`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_rule_properties`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_rules`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_tabActions`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_tabContainers`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_tabObject_properties`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_tabObjects`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_type_decorator_property_value`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_type_properties`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_types`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_types_els_romenext_decos`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_user_log`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_users`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_users_admin`");
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_workspace_dislay`");;

			/**
			 * TYPES 
			 */
			
//			// truncate the type/deco property values
//			batch.addBatch( "TRUNCATE `" + s.getSchema() + "`.`els_romenext_type_decorator_property_value`;" );
//			// truncate the types out of the decorators
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_types_els_romenext_decos`;");
//			// truncate type properties
//			batch.addBatch( "TRUNCATE `" + s.getSchema() + "`.`els_romenext_type_properties`;" );
//			// truncate types
//			batch.addBatch("TRUNCATE `" + s.getSchema() + "`.`els_romenext_types`;");
			
			
			
			
			batch.addBatch("SET FOREIGN_KEY_CHECKS=1");
			
			batch.executeBatch();
			
			conn.commit();
			conn.setAutoCommit( true );
			
			
			// now that everything is reset, attempt to reload to version 1
			conn.setAutoCommit( false );
			batch.addBatch("SET FOREIGN_KEY_CHECKS = 0"); 
			
			ServerUtils serverUtils = new ServerUtils();
			int status = serverUtils.attemptVersionUpgrade(conn, s, RomeVersionEnum.VERSION_1 );
			batch.addBatch("SET FOREIGN_KEY_CHECKS = 1"); 

			System.out.println("Found this status : " + status );
			

			conn.commit();
			conn.setAutoCommit( true );
			
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		connUtils.closeConnection( conn );

		req.getRequestDispatcher("/jsps/boot/servers/metarepo/view_metarepo.jsp").forward(req, resp);
		
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		
		
		resp.sendRedirect("/admin/dashboard");

	} 
	
	
	public static void main(String[] args) {
		
		for( int i = 0; i < 100; i++ ) {
			System.out.println( "( '1', now(), '1', '1', now(), '_TEMP_TYPE" + i + "', '1', NULL, '1'),");
		}
		
	}

 
}