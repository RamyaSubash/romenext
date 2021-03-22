<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

    <div class="modal" id="add-server-form" tabindex="-1" role="dialog">
	   <div class="modal-dialog modal-sm" role="document">
	      <div class="modal-content">
               <div class="modal-header">
          			<button type="button" class="close" data-dismiss="modal">&times;</button>
         			 <div class="logo">
							<img src="/admin/assets/img/admin_icons/add-server.png" width="100px"/>
						</div>
					<h4>Add Server</h4>
        		</div>
				<div class="form-content">
					<form method="post" action="/admin/boot/server/add2" class="add-server"   onsubmit="return(ValidateForms.addServer());" >
					   <% if(request.getParameter("error")== null){ %> 
				              <div style="color:red">${error }</div> 
				       <%} %> 
						<div class="input-container">
							<i class="fa fa-server"></i>
							<input type="text"  placeholder="Box Name" name="add_boxname"  id="add_boxname" value="">
							<span  class="msg_err" id="err_add_boxname"></span>	
						</div>
						<div class="input-container">
							<i class="fa fa-server"></i>
							 <input type="text"  placeholder="IP" name="add_ip" id="add_ip" value="">
							 <span  class="msg_err" id="err_add_ip"></span>
						</div>
						<div class="input-container">
							<i class="icon_key_alt"></i>
							 <input type="text"  placeholder="3306" name="add_port" id="add_port" value="3306">
							 <span class="msg_err" id="err_add_port"></span>
						</div>						
						<div class="input-container">
							<i class="fa fa-user"></i>
							 <input type="text"  placeholder="Account username" name="add_username" id="add_username" value="">
							 <span  class="msg_err" id="err_add_username"></span>
						</div>
						<div class="input-container">
							<i class="fa fa-lock"></i>
							 <input type="password"  placeholder="Password" name="add_password"  id="add_password" value="">
							 <span  class="msg_err" id="err_add_password"></span>
						</div>						
						<div class="input-container">
							 <i class="fa fa-database"></i>
							 <input type="text"  placeholder="Schema name" name="add_schema"  id="add_schema" value=""> 
							 <span class="msg_err" id="err_add_schema"></span>
						</div>
		
						<input type="submit"  value="ADD" class="button"    />
						
<!-- 						<a href="#" class="cancel">CANCEL</a> -->
					</form>				
<!-- 				</div> -->
			</div>
			</div>
		</div>
	</div>