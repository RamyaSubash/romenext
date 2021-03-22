<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


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
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.css" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
     
          		    
    <!--  IMPORTED JS  -->
<!-- <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>	 -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>   
<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.min.js"></script>  -->	  


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
 
    <!--   LOCAL JS  --> 
	<script type="text/javascript">
		<%@include file="/assets/js/els/utils/BootSideMenu.js" %>
		<%@include file="/assets/js/ValidateForms.js" %>
	</script>
     
 
</head>
<body>

	<jsp:include page="/jsps/headers/topBar.jsp"></jsp:include>

    <div class="main">
       <br/>
       <br/>      	 
      <div class="container">
          <h2 class="sub-header">Delete Group : ${deletegroup.username }</h2>
          <div class="table-responsive">
          	 <form class="server-edit-form" name="edit_server_form" action="/admin/boot/group/delete" method="post" >        
				    <input type="hidden" name="delete_id" value="${ deletegroup.hash }">				
					<input type="hidden" name="serverIndex" value="${ server.index }">				
				     
			        <div class="login-wrap">  			           
			           <% if(request.getParameter("error")== null){ %>
			              <div style="color:red">${error }</div>
			           <%} %> 
			           
			           <c:choose>
			           	<c:when	test="${ fn:length(affectedtypes) > 0 }">
			           		<div class="form-group">
						      <label class="col-xs-3 control-label" for="groupselected">Move current assigned types to another group (
						      <c:forEach items="${ affectedtypes }" var="atype" varStatus="counter">
								${atype.name } &nbsp;
							  </c:forEach>
						      ):</label> 
						      <div class="col-xs-5">
						      		<select class="form-control" id="deletegroup_move_group" name="deletegroup_move_group_name">
									<c:forEach items="${ remaininggroups }" var="group" varStatus="counter">
										<option value="${group.key }">
										<c:if test="${group.value.group != null }">
											${group.value.group.friendlyName}
										</c:if>
										${group.value.username }
										</option>
									</c:forEach>
                                  </select> 
                              </div>
								    
						</div>  
			           	</c:when>
			           	<c:otherwise> 
			           	</c:otherwise>
			           </c:choose> 
			           
			           
			           <c:choose>
				           	<c:when	test="${ fn:length(affectedusers) > 0 }">
				           	<br/>
				           	<br/>
				           	<br/>
				           		<div class="form-group">
							      <label class="col-xs-3 control-label" for="groupselected">Move current assigned users to another group (
							        <c:forEach items="${ affectedusers }" var="auser" varStatus="counter">
										${auser.username } &nbsp;
									  </c:forEach>
							      ):</label>
							      <div class="col-xs-5">
							      		<select class="form-control" id="deletegroup_move_user" name="deletegroup_move_user_name"'>
										<c:forEach items="${ remaininggroups }" var="group" varStatus="counter">
											<option value="${group.key }">
											<c:if test="${group.value.group != null }">
												${group.value.group.friendlyName}
											</c:if>
											${group.value.username }
											</option>
										</c:forEach>
	                                  </select> 
	                              </div>
							</div>  
				           	</c:when>
				           	<c:otherwise> 
				           	</c:otherwise>
			           </c:choose> 			           			            
			             <div  style="text-align:center">
			                <button id="deleteGroup" class="btn btn-primary btn-sm" type="submit" name="action" value="save"  >Delete</button>
			                
			            </div>
			        </div>
			</form>
			<br/>
            <a  id="cancel" class="btn btn-default btn-sm" type="button"  href="/admin/boot/server/manage?serverIndex=${server.index }" >Cancel</a>
        </div>
      </div>
    </div>

  </body>
</html>