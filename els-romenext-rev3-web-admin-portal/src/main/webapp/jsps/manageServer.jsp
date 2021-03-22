<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page import="java.util.List" %>
<%@ page import="com.els.romenext.web.admin.rev3.portal.pojo.login.RegularMysqlUser" %>

<html lang="en">
<head>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>
	
	<title>ROMENEXT Design</title>
	
    <!--    IMPORTED CSS  -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >	
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<!-- 	<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.css" /> -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
     
      
    <!--  IMPORTED JS  -->
<!--     <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>	 -->   
<!--      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
      <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
     
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	 <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> 
<!-- 	<script src="https://cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.min.js"></script>  -->
          
    <!--   LOCAL CSS -->
	<style type="text/css">
		<%@include file="/assets/css/BootSideMenu.css" %>
		<%@include file="/assets/css/custom-style.css" %>
	</style>     

        	          	
    <!-- nice scroll -->
	<script type="text/javascript">
		<%@include file="/assets/js/libs/jquery.nicescroll.js" %>
	</script>
    <!-- jquery knob -->
    <script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script>  
    
    <!--  LOCAL JS  -->
	<script type="text/javascript">
		<%@include file="/assets/js/els/utils/BootSideMenu.js" %>
		<%@include file="/assets/js/global-vars-admin.js" %>
		<%@include file="/assets/js/ValidateForms.js" %>
	</script>
    <script>
        types  = "${types}";
        groups = "${groups}";
        users  = "${users}";
        basegroups = "${basegroups}";
        usergroups = "${usergroups}";              
    </script>
    
</head>
<body>
	<jsp:include page="/jsps/headers/topBar.jsp"></jsp:include>   	        
    <div id="main">  
          <% if(request.getParameter("error")== null) { %>
				<div style="color:red">${error }</div>
		  <%} %>  
		  <% if(request.getParameter("msg")== null) { %>
				<div style="color:green">${msg }</div>
		  <%} %> 
		       
          <div class="row">   
                 <h3>Selected Metadata:</h3> 
                 	<c:set var="currstatus" value="${ ! empty sessionScope.rmn_servers[ sessionScope.current_server ] }"/> 
	             <div class="col-sm-3 col-md-2" >	          
			           <div class="card border-primary mb-3 bg-light">		           
	                      <div> <a href="#"><b>${ server.boxname }</b></a></div> 						    
						  <div class="">
						       <img src="/admin/assets/img/admin_icons/msql_icon.jpg" alt="mysql" style="width:100px; height:150px;float:left">   
							    <p>IP:<b>${ server.ip }:${server.port }</b><br/> 
							    MySQL Version Info:<br/> 
							    <b>${ server.condensedInfo }</b><br/> 
							    Account: <b>${ server.username}</b><br/> 
							    Schema: <b>${ server.schema }</b></p>
						  </div>
	  				      <ul  id="btn_fcts"> 
	                         <li><a href="/admin/boot/server/getgraphDB?serverIndex=${server.index}">Graph DBs</a></li>
						  </ul>
						  <c:if test="${currstatus }">
	      					<c:set var="current_server" value="${sessionScope.rmn_servers[ sessionScope.current_server ] }"> </c:set>
	      					<div >
		      					  <b><a href="#">Metadata Status</a> </b>
		      					  <c:if test="${ current_server.schemaObject != null  }">
										Version:<b>${ current_server.schemaObject.tag  }</b><br/>
								  </c:if>	
							        <c:forEach var="status" items="${ current_server.status }">
										<c:choose>
											<c:when test="${status.key.order == 3 && status.value == false }">
												<li>${status.key.name } Failed! : <a href="">Initialize Admin Accounts</a></li>			
											</c:when>
											<c:when test="${status.key.order == 5 && status.value == false }">
												<li>${status.key.name } Failed! : <a href="">Initialize Group Core Accounts</a></li>			
											</c:when>
											<c:when test="${status.key.order == 4 && status.value == false }">
												<script>
													$("#schema_status").html("<span style='color:red'>(Not Reachable! <a href='/admin/boot/server/edit?server=${ current_server.index }'>UPDATE</a>)</span>");
												</script>
												<li>${status.key.name } : ${status.value }</li>	 		
											</c:when>
											<c:otherwise>											    
												<li>${status.key.name } : ${status.value }</li>									
											</c:otherwise>
										</c:choose>
									</c:forEach>
							</div> 
						</c:if>
			 		   </div>	
		        </div>			
				 <div class="col-sm-9 col-md-10" id="gd_for_server_${server.index}" > 
				    <c:if test="${currstatus }">      					
							<c:forEach var="metadata" items="${ server.metadata }">
							    <c:forEach var="repo" items="${ metadata.value.repo }"  varStatus="repoCounter">
							      <div class="col-sm-3">
							      <div class="card neo4j border-primary mb-3 bg-light">	
							        <div> <a href="#"><b>${repo.value.name }</b></a></div>
								    <div>	
							         <img src="/admin/assets/img/admin_icons/neo4j_icon.jpg" alt="neo4j" style="width:100px; height:150px;float:left">
							         <p>IP: <b>${repo.value.ip }</b><br/>
							         Account : <b>${repo.value.username }</b><br/>
							         Neo4J version: <b>${sessionScope.repoVersion }</b>
							         </p>
							        </div>
							        <ul  id="btn_fcts">	
								       <li><button class='btn btn-primary btn-xs'  onclick="location.href='/admin/boot/server/repo/edit?server=${server.index}&metadata=${metadata.value.id }&repo=${repo.value.id }'" > EDIT</button></li> 
							           <li>
							              <button class='btn btn-primary btn-xs'  data-toggle="modal" data-target="#wipeRepo${repoCounter.index}"> WIPE</button>
							              

							              <div class="modal" id="wipeRepo${repoCounter.index}" tabindex="-1" role="dialog">
											  <div class="modal-dialog" role="document">
											    <div class="modal-content">
											      <div class="modal-header">
											        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
											        <h4 class="modal-title">Wipe Repo</h4>
											      </div>
											      <div class="modal-body">
											        <p>Are you sure you want to wipe repo: <b>${repo.value.name }</b> at IP: <b>${repo.value.ip }</b> ? This process is not reversible.</p>
											      </div>
											      <div class="modal-footer">
											        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
											        <button type="button" class="btn btn-primary"  onclick="location.href='/admin/boot/server/repository/wipe?serverIndex=${server.index}&metadata=${metadata.value.id }&repo=${repo.value.id }'">Confirm</button>
											      </div>
											    </div>
											  </div>
											</div>	
							           </li> 
							        </ul>
						            </div>  
						            </div> 
							     </c:forEach>
							</c:forEach>  
					</c:if>
		        </div>            
	     </div>  
	     <br/>
	     <div class="" id="manage_db">      
             <ul class="nav nav-pills">
                <li class="active" ><a data-toggle="pill" href="#Groups" >Groups</a></li> 
			    <li><a data-toggle="pill" href="#Users">Users</a></li>		   
			    <li><a data-toggle="pill" href="#Types">Types</a></li>
			  </ul>      
             <div class="tab-content">
                <div id="Groups" class="tab-pane fade in active">
			      <div  class="tab_title">
			           <div class="col-sm-4">
			           </div>
			           <div class="col-sm-4"></div>
			           <div class="col-sm-4 push-right">
			             <button   class="btn btn-primary btn-xs"  onclick='showHide("add_group");' ><i class="fa fa-users"></i> Add Group</button> 
			         </div>
			     </div>
			     <div class="row col-sm-12">
		              <div class="col-sm-4" >
					      <table class="table table-striped">
					        <thead>
					            <tr> 
									<th>Name</th>
									<th>Host</th>
									<th colspan="2">Options</th>
								</tr> 
					        </thead>
							 <tbody>	
						     <c:forEach items="${ groups }" var="group" varStatus="counter">
								  <tr>
									<td>${group.username}</td>
									<td>${group.host }</td>
									<td>
										<ul  class="groupOptions">
<%-- 											<li><button type="button" class="btn btn-primary btn-xs" onclick="location.href='/admin/boot/group/edit?serverHash=${server.hash}&groupHash=${group.hash }&serverIndex=${server.index }'" >Edit</button> --%>
<!-- 											</li> -->
											<li><button type="button" class="btn btn-primary btn-xs"  onclick="location.href='/admin/boot/group/delete?server=${server.index}&groupHash=${group.hash }'">Delete</button>										
											</li> 												
										</ul> 
									</td>  		
								</tr>
							 </c:forEach>
							 </tbody>		
						  </table> 
					  </div>
					  <div class="col-sm-4"></div>
				      <div class="col-sm-4" id="add_group"  style="display:none"> 
								<h4>Add New Group</h4>	
								<div>				
					               <form  class="form-horizontal"  name="add_newgroup" action="/admin/boot/group/create" method="post" onSubmit="ValidateForms.showAddGroup(event)">        
					                    <input type="hidden" name="serverIndex" value="${server.index }"/>
									    <div class="form-group">
										      <label class="col-xs-3 control-label" for="groupname">Name </label>
										      <div class="col-xs-5">
										         <input type="text" class="form-control" id="groupname" placeholder="Enter group name"  name="add_groupname">
										         <span class="msg_err"  id="err_add_groupname"></span>
										      </div>
										</div>																							
										<div class="form-group">
										      <label class="col-xs-3 control-label" for="groupbase">Default Permission:</label>
										      <div class="col-xs-5">
					                               <select class="form-control" id="add_group" name="add_groupbase">
					                                   	<c:forEach items="${ basegroups }" var="basegroup">
					                                    		<option value="${basegroup.username}">${basegroup.group }</option> 
													 	</c:forEach>
					                               </select>
					                               <span  class="msg_err" id="err_add_groupbase"></span>
					                          </div>
					                    </div>  
					                    <div class="form-group">
					        				   <div class="col-xs-5 col-xs-offset-3">
					        					   		<button id="addGroup" class="btn btn-primary btn-xs" type="submit">Add</button> 
					        			       </div>
					    			    </div>
								</form>
								</div>   
							
				        </div> 	
				 </div>	 
		      </div>
		      <div id="Users" class="tab-pane fade"> 			    
			       <div  class="tab_title" >
			           <div class="col-sm-4"></div>
			           <div class="col-sm-4"></div>
			           <div class="col-sm-4 push-right">
			               <button    class="btn btn-primary btn-xs"  onclick='showHide("add_user");' ><i class="fa fa-user"></i>Add User</button>  	               
			           </div>		      		 
	              </div>
	              <div class="row col-sm-12">
	                  <div class="col-sm-4" >
				         <table class="table table-striped">
			              <thead>
			                <tr> 
			                  <th>User name</th>
			                  <th>Group</th>
			                  <th>Last Logged In</th>
			                  <th colspan="2" >Options</th>
			                </tr>
			              </thead>
		                  <tbody>
		              		<c:forEach items="${ users }" var="user" varStatus="counter2">
								<tr> 
									<td>${ user.username } </td>
									<td>${ user.groupName }</td>
									<td></td>									 
									<td>
										<ul  class="userOptions">
											<li><button type="button" class="btn btn-primary btn-xs" onclick="location.href='/admin/boot/user/edit?serverHash=${server.hash}&userHash=${user.hash }&serverIdx=${server.index }'" >Edit</button>												
											</li>
											<li><button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#remove_user${counter2.index}">Delete</button>
											<div class="modal" id="remove_user${counter2.index}" tabindex="-1" role="dialog">
											  <div class="modal-dialog" role="document">
											    <div class="modal-content">
											      <div class="modal-header">
											        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
											        <h4 class="modal-title">Remove</h4>
											      </div>
											      <div class="modal-body">
											        <p>Are you sure you want to remove User: <b>${user.username }</b> from the system? This is not reversible.</p>
											      </div>
											      <div class="modal-footer">
											        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
											        <button type="button" class="btn btn-primary"  onclick="location.href='/admin/boot/user/delete?serverHash=${server.hash}&userHash=${user.hash }'">Confirm</button>
											      </div>
											    </div>
											  </div>
											</div>											
											</li> 												
										</ul> 
									</td>  
								</tr>
							</c:forEach>							 
		                  </tbody>
		                </table>
			          </div>
			          <div class="col-sm-4"></div>
			          <div class="col-sm-4" id="add_user"  style="display:none"> 
			                <h2 class="sub-header">Create User</h2>
					          <div >								      
								<form   class="form-horizontal" action="/admin/boot/user/create" method="post" name="addUserForm" onSubmit="ValidateForms.showAddUser(event)" >        
								        <input type="hidden" name="serverIndx" value="${server.index }"/>
								        <div class="form-group">
										      <label class="col-xs-3 control-label" for="username">Username:</label>
										      <div class="col-xs-5">
										         <input type="text" class="form-control" id="newusername" placeholder="Enter username"  name="user_username">
										         <span  class="msg_err" id="err_user_username"></span>
										      </div>
										</div>
										<div class="form-group">
										      <label class="col-xs-3 control-label" for="userpwd">Password:</label>
										      <div class="col-xs-5">
										         <input type="password" class="form-control" id="userpwd" placeholder="Enter password"  name="user_pw1">
										         <span  class="msg_err"  id="err_user_pw1"></span>
										      </div>
										</div>
										<div class="form-group">
										      <label class="col-xs-3 control-label" for="confuserpwd">Confirm Password:</label>
										      <div class="col-xs-5">
										          <input type="password" class="form-control" id="confuserpwd" placeholder="Confirm password"  name="user_pw2">
										          <span  class="msg_err" id="err_user_pw2"></span>
										      </div>
										</div>
										<div class="form-group">
										      <label class="col-xs-3 control-label" for="user_groupselected">Group:</label>
										      <div class="col-xs-5">
										      		<select class="form-control"  name="user_groupselected">
													<c:forEach items="${usergroups }" var="usergroup">
														<option value="${usergroup.key }">
														      ${usergroup.value.username }
														</option>
													</c:forEach>
				                                  </select> 
				                                  <span  class="msg_err" id="err_user_groupselected"></span>
				                              </div>
										</div>  				
										<div class="form-group">
				      						<div class="col-xs-5 col-xs-offset-3">
				      						<button id="adduser" class="btn btn-primary btn-xs" type="submit" >Add</button>
				      						</div>
				  						</div>
								</form>	
					       </div> 
			           
			          </div>
			      </div>
		      </div>
		      <div id="Types" class="tab-pane fade">
		             <div  class="tab_title" >
<!-- 			                <h3>Types</h3> -->
			         </div>
					 <div class="row col-sm-12">
				              <div class="col-sm-2" >Groups
				              </div>
				              <div class="col-sm-8" >
					              <h3>Types</h3>
					               <div>
					                   <table class="table table-striped">
							              <thead>
							                <tr> 
							                  <th>Name</th>
							                  <th>Assigned to Group</th>
							                  <th>Internal</th>
							                  <th>Options</th>
							                </tr>
							              </thead>
							              <tbody>
							              		<c:forEach items="${ types }" var="type" varStatus="counter">
														<tr> 
															<td>${ type.name } </td>
															<td>
																<ul>
																	<c:forEach items="${ type.groups }" var="group" varStatus="counter"> 
																		<li>${group.name }</li>
																	</c:forEach>									
																</ul>
															</td>
															<td>${ type.isInternal }</td>  
															<td>
														</td>  
														</tr>
													</c:forEach>				 
							              </tbody>
							            </table>     
					               </div>
				              </div>
				              <div class="col-sm-2" >Users
				              </div>
				     </div>
			  </div>
			</div>
	     </div>      
    </div>
</body>
      <script>   	
		function showHide ( form  ){
			$(".msg_err").empty();
			var e = document.getElementById(form);
			if (e.style.display == 'block') {
				e.style.display = 'none';
			} else {
				e.style.display = 'block';
			}
		}				
  </script>


</html>