package com.els.romenext.web.general.utils.session;

import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpSession;

import com.els.romenext.web.general.pojo.session.VersionHolder;
import com.els.romenext.web.general.session.ManifestUtils;

public class SessionManagerUtils {

	public static void assignVersion( HttpServlet ctx, HttpSession session ) {
		ManifestUtils mutils = new ManifestUtils();
		List<String> manifest = mutils.loadManifestFile( ctx );
		VersionHolder manifestInfo = mutils.setVersionHolder( manifest );
		
		session.setAttribute("manifest",  manifestInfo );
	} 
}
