package com.els.romenext.web.servlets.gui;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;

import com.els.romenext.web.general.pojo.MysqlUser;

@WebServlet("/romenext/gui/split/design")
public class RomenextDesignServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("Inside design gui get");
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		System.out.println("inside design gui post");
		String selectedMetadata = req.getParameter("selectedMetadata");
		String userGroupHost = req.getParameter("userGroupHost");
		String userGroupName = req.getParameter("userGroupName");
		String userName = req.getParameter("userName");
		
		/**
		 * NOTE: Nothing works if we don't have this information, if any of this information is missing, we attempt to re-load all this from the session
		 * IF: We still don't have this information, we redirect to login page
		 */
		
		HttpSession session = req.getSession();
		
		if( StringUtils.isAnyEmpty(  userGroupHost, userGroupName, userName ) ) {
			
			Object user_obj = session.getAttribute("user");
			
			if( user_obj != null ) {
				MysqlUser user = (MysqlUser) user_obj;
				
//				selectedMetadata = user.getgr
				userGroupHost = user.getGroupHost();
				userGroupName = user.getGroupName();
				userName = user.getNamespace();
			}
			System.out.println("userGroupHost: " + userGroupHost);
			System.out.println("userGroupName: " + userGroupName);
			System.out.println("userName : " + userName);
		}
		
		if( StringUtils.isAnyEmpty(  userGroupHost, userGroupName, userName ) ) {
			
			// something is wrong, send to login page
//			resp.getSession().setAttribute("from", req.getRequestURI());
			resp.sendRedirect("/webguiportal/login");
			return;
		} else {
			
		}
		
//		String selectedDecorator= req.getParameter("selectedDecorator");
//		String nameType = req.getParameter("nameType");
//		String nameConn = req.getParameter("nameConn");
//		String curType = req.getParameter("curType");
		
		String listTypeIdsLength = req.getParameter("listTypeidsLength");
		String listConnIdsLength = req.getParameter("listConnidsLength");
		
		if( StringUtils.isEmpty( listTypeIdsLength ) ) {
			listTypeIdsLength = "0";
		}
		if( StringUtils.isEmpty( listConnIdsLength ) ) {
			listConnIdsLength = "0";
		}
		
		int tmpTypeIdsLength = Integer.parseInt(listTypeIdsLength);
		int tmpConnIdsLength = Integer.parseInt(listConnIdsLength);
		List<String> listTypeIds = new ArrayList<String>();
		for (int i = 0; i < tmpTypeIdsLength; i++) {
			String tmpStr = "type_id_"+String.valueOf(i);
			listTypeIds.add(req.getParameter(tmpStr));
		}
		List<String> listConnIds = new ArrayList<String>();
		for (int i = 0; i < tmpConnIdsLength; i++) {
			String tmpStr = "conn_id_"+String.valueOf(i);
			listConnIds.add(req.getParameter(tmpStr));
		}		
//		String[] listTypeIds = req.getParameterValues("listTypeids");
//		String[] listConnIds = req.getParameterValues("listConnids");
		
		System.out.println("metadata ID in display servlet =============================== " + selectedMetadata);
//		System.out.println("type name in display servlet =============================== " + nameType);
		System.out.println("type id list in display servlet =============================== " + listTypeIds);
		System.out.println("conn id list in display servlet =============================== " + listConnIds);
		
		Map<String, String> user = new HashMap<String, String>();
		user.put("username", userName);
		user.put("proxyUser", userGroupName);
		user.put("proxyUser_host", userGroupHost);
		
		req.setAttribute("metadataSelected", selectedMetadata);
		req.setAttribute("user", user);
//		req.setAttribute("selectedDecorator", selectedDecorator );
//		req.setAttribute("nameType", nameType);
//		req.setAttribute("nameConn", nameConn);
//		req.setAttribute("curType", curType);
		req.setAttribute("listTypeidsLength", listTypeIdsLength);
		req.setAttribute("listConnidsLength", listConnIdsLength);
		req.setAttribute("listTypeids", listTypeIds);
		req.setAttribute("listConnids", listConnIds);
		
		req.setAttribute("startNodeForLinkingTypeId", req.getParameter("startNodeForLinkingTypeId"));
		req.setAttribute("startNodeForLinkingTypeName", req.getParameter("startNodeForLinkingTypeName"));
		req.setAttribute("startNodeForLinkingName", req.getParameter("startNodeForLinkingName"));
		req.setAttribute("startNodeForLinkingUuid", req.getParameter("startNodeForLinkingUuid"));
		
		req.setAttribute("endNodeForLinkingTypeId", req.getParameter("endNodeForLinkingTypeId"));
		req.setAttribute("endNodeForLinkingTypeName", req.getParameter("endNodeForLinkingTypeName"));
		req.setAttribute("endNodeForLinkingName", req.getParameter("endNodeForLinkingName"));
		req.setAttribute("endNodeForLinkingUuid", req.getParameter("endNodeForLinkingUuid"));
				
		// SHoudl we be doing this the entire time or just loading on the session?
		// JPL: TODO: Relook at this in the future
//		DecoratorUtils decoUtils = new DecoratorUtils();
//		HttpSession session = req.getSession( true );
//
//		List<RomeDecoratorVersion> decorators = decoUtils.getDecorators( RomeDecoratorClassification.TYPE );
//		
//		req.setAttribute("activedecos",  decorators );
//		session.setAttribute( "activedecos",  decorators );
		
		
//		resp.sendRedirect("/jsps/split/display.jsp");
		
		
		/**
		 * Assign the state 
		 */
		req.setAttribute("guistate_main", "DESIGN" );
		req.setAttribute("guistate_sub", "BASE" );
		
		session.setAttribute("guistate_main",  "DESIGN" );
		session.setAttribute("guistate_sub",  "BASE" );

		
		req.getRequestDispatcher("/jsps/romenextgui_design.jsp").forward(req, resp);
		return;
		
	}
}
