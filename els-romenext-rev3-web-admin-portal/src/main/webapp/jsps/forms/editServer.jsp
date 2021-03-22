<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


 <c:set var="server" value="${sessionScope.rmn_servers[server.value.index ] }"></c:set>
 <div class="modal" id="edit-server-form" tabindex="-1" role="dialog">
	   <div class="modal-dialog modal-md" role="document">
	      <div class="modal-content">
               <div class="modal-header">
          			<button type="button" class="close" data-dismiss="modal">&times;</button>
         			 <div class="logo">
							<img src="/admin/assets/img/admin_icons/add-server.png" width="100px"/>
						</div>
					<h4>EDIT Server</h4>
        		</div>
				<div class="form-content">
					<form method="post" action="/admin/boot/server/edit2?serverIndex="${ server.value.index } class="edit-server"   onsubmit="return(ValidateForms.crudServer('edit'));" >
					   <% if(request.getParameter("error")== null){ %> 
				              <div style="color:red">${error }</div> 
				       <%} %> 
						<div class="input-container">
							Box Name:
							<input type="text"  name="edit_boxname"  id="edit_boxname" value="${ server.value.boxname}">
							<span  class="msg_err" id="err_edit_boxname"></span>	
						</div>
						<div class="input-container">
							IP:
							 <input type="text"   name="edit_ip" id="edit_ip" value="${ server.value.ip }">
							 <span  class="msg_err" id="err_edit_ip"></span>
						</div>
						<div class="input-container">
							Port:
							 <input type="text"   name="edit_port" id="edit_port" value="${ server.value.port}">
							 <span class="msg_err" id="err_edit_port"></span>
						</div>						
						<div class="input-container">
							Username:
							 <input type="text"   name="edit_username" id="edit_username" value="${ server.value.username}">
							 <span  class="msg_err" id="err_edit_username"></span>
						</div>
						<div class="input-container">
							Password:
							 <input type="password"   name="edit_password"  id="edit_password" value="${ server.value.password }">
							 <span  class="msg_err" id="err_edit_password"></span>
						</div>						
						<div class="input-container">
							Schema:
							 <input type="text"   name="edit_schema"  id="edit_schema" value="${ server.value.schema}"> 
							 <span class="msg_err" id="err_edit_schema"></span>
						</div>
		
						<input type="submit"  value="SAVE" class="button"    />
						
<!-- 						<a href="#" class="cancel">CANCEL</a> -->
					</form>				
<!-- 				</div> -->
			</div>
			</div>
		</div>
	</div>