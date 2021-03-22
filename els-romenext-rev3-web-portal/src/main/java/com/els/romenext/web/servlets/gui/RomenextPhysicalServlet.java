package com.els.romenext.web.servlets.gui;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.util.node.NodeUtils;
import com.google.gson.Gson;

@WebServlet("/romenext/gui/split/physical")
public class RomenextPhysicalServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("Inside dispaly gui get");
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		System.out.println("inside display gui post");
		HttpSession session = req.getSession( true );

		String selectedMetadata = req.getParameter("selectedMetadata");
		String userGroupHost = req.getParameter("userGroupHost");
		String userGroupName = req.getParameter("userGroupName");
		String userName = req.getParameter("userName");
		String type = req.getParameter("typeid");

		
//		System.out.println("TYpe id : " + type );
//		
//		Long id = Long.valueOf( type );
		
		
		// load the type
//		RomeTypeDao dao = new RomeTypeDao( userName );
//		
//		RomeType romeType = dao.get( id );
		
//		String selectedDecorator= req.getParameter("selectedDecorator");
//		String nameType = req.getParameter("nameType");
//		String nameConn = req.getParameter("nameConn");
//		String curType = req.getParameter("curType");
		
//		String listTypeIdsLength = req.getParameter("listTypeidsLength");
//		String listConnIdsLength = req.getParameter("listConnidsLength");
//
//		int tmpTypeIdsLength = Integer.parseInt(listTypeIdsLength);
//		int tmpConnIdsLength = Integer.parseInt(listConnIdsLength);
//		List<String> listTypeIds = new ArrayList<String>();
//		for (int i = 0; i < tmpTypeIdsLength; i++) {
//			String tmpStr = "type_id_"+String.valueOf(i);
//			listTypeIds.add(req.getParameter(tmpStr));
//		}
//		List<String> listConnIds = new ArrayList<String>();
//		for (int i = 0; i < tmpConnIdsLength; i++) {
//			String tmpStr = "conn_id_"+String.valueOf(i);
//			listConnIds.add(req.getParameter(tmpStr));
//		}		
//		String[] listTypeIds = req.getParameterValues("listTypeids");
//		String[] listConnIds = req.getParameterValues("listConnids");
		
		System.out.println("metadata ID in physical servlet =============================== " + selectedMetadata);
//		System.out.println("type name in display servlet =============================== " + nameType);
//		System.out.println("type id list in display servlet =============================== " + listTypeIds);
//		System.out.println("conn id list in display servlet =============================== " + listConnIds);
		
		Map<String, String> user = new HashMap<String, String>();
		user.put("username", userName);
		user.put("proxyUser", userGroupName);
		user.put("proxyUser_host", userGroupHost);
		
		req.setAttribute("metadataSelected", selectedMetadata);
		
//		NodeUtils utils = new NodeUtils( userName );
//
//		Node node = utils.build(romeType);
//		String json = new Gson().toJson(node);
//		
//		req.setAttribute("node",  json );
		req.setAttribute("typeid",  type );
//		
//
//		req.setAttribute("user", romeType );
		
		
		
		
		
//		req.setAttribute("selectedDecorator", selectedDecorator );
//		req.setAttribute("nameType", nameType);
//		req.setAttribute("nameConn", nameConn);
//		req.setAttribute("curType", curType);
//		req.setAttribute("listTypeidsLength", listTypeIdsLength);
//		req.setAttribute("listConnidsLength", listConnIdsLength);
//		req.setAttribute("listTypeids", listTypeIds);
//		req.setAttribute("listConnids", listConnIds);
			
		/**
		 * Add the new decorator loader
		 */

		// get all decos
//		DecoratorUtils decoUtils = new DecoratorUtils();
		
//		DecoratorUtils decoUtils = new DecoratorUtils();
//		List<RomeDecoratorVersion> decorators = decoUtils.getDecorators( RomeDecoratorClassification.INSTANCE );
//		
//		
//		req.setAttribute("activedecos",  decorators );
//		session.setAttribute( "activedecos",  decorators );
		
		req.getRequestDispatcher("/jsps/romenextgui_physical.jsp").forward(req, resp);
//		resp.sendRedirect("/jsps/split/display.jsp");
		
		return;
		
	}
}