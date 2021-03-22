<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Admin Portal Template</title>

<!--    IMPORTED CSS  -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet"
	href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet"
	href="http://cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.css" />
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">

<!--  IMPORTED JS  -->
<!--     <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>	 -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<!-- 	<script src="https://cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.min.js"></script>  -->


<!--   LOCAL CSS -->
<style type="text/css">
<%@include file ="/assets/css/BootSideMenu.css" %>
<%@include file ="/assets/css/custom-style.css"%>
<%@include file ="/assets/css/Forms.css" %>
</style>

<script type="text/javascript">	
<%@include file="/assets/js/libs/jquery.nicescroll.js" %>	
<%@include file="/assets/js/CheckConnectionUtils.js" %>	
</script>

<script>
	api_url = "${ sessionScope.api_url }";
	usr = "${sessionScope.ROMENEXT_SESS_USER_TKNS.username }";
</script>

</head>
<body>
	<div class="container">

		<nav class="navbar navbar-inverse navbar-fixed-top">
			<div class="container-fluid">

				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed"
						data-toggle="collapse" data-target="#navbar" aria-expanded="false"
						aria-controls="navbar">
						<span class="sr-only">Toggle navigation</span> <span
							class="icon-bar"></span> <span class="icon-bar"></span> <span
							class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="/admin/boot/dashboard2">RomeNeXt
						Administration</a>

				</div>

				<div id="navbar" class="navbar-collapse collapse">
					<ul class="nav navbar-nav navbar-right">
						<li><a href="/admin/boot/dashboard">Bootstrap Link</a></li>
						<li class="dropdown"><a href="#">Settings</a></li>
						<li class="dropdown"><a href="#" class="dropdown-toggle"
							data-toggle="dropdown" role="button">${sessionScope.ROMENEXT_SESS_USER_TKNS.loggedInUser }
								${sessionScope.ROMENEXT_SESS_USER_TKNS.username } Profile<span
								class="caret"></span>
						</a>
							<ul class="dropdown-menu">
								<li><a href="/admin/logout">Logout</a></li>
							</ul></li>
						<li class="dropdown"><a href="#" class="dropdown-toggle"
							data-toggle="dropdown" role="button" aria-haspopup="true"
							aria-expanded="false">About <span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li>Version ${sessionScope.manifest.version }</li>
								<li role="separator" class="divider"></li>
								<li>Build Time ${sessionScope.manifest.dateString }</li>
							</ul></li>

					</ul>
				</div>


			</div>
		</nav>
	</div>
	<section>
		<!--    Here start the main window work area -  divived into three left bar  main  right bar -->
		<div class="row" id="main-content">
			<div class="col-sm-1" id="Left-bar"></div>
			<div class="col-sm-10" id="main-content-workingarea">
				<h4>Welcome ${sessionScope.user.loggedInUser } to the Setting
					Admin user</h4>
				<h4>Version ${sessionScope.manifest.version } on
					${sessionScope.manifest.dateString }</h4>

				<div>
					<div class="form-check">
  						<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onclick="CheckConnectionUtils.checkConnectionUpdateValue( '${ sessionScope.user.ip }', '${ sessionScope.user.port}', 'conn_1' )">
  						<label class="form-check-label" for="flexCheckDefault">
    							Metadata Information
 						 </label>
					</div>
					
					<c:choose>
						<c:when test="${ sessionScope.user.ip != null && fn:length( sessionScope.user.ip ) > 0  }">
							<div class="table-responsive">
								<table class="table">
									<thead class="thead-dark">
									    <tr>
									      <th scope="col">Location</th>
									      <th scope="col">BoxName</th>
									      <th scope="col">Database</th>
									      <th scope="col">Version</th>
									      <th scope="col">Schema</th>
									      <th scope="col">Account</th>
									      <th scope="col">Status</th>
									      <th scope="col">StatusOptions</th>
									      <th scope="col">ConnectableOptions</th>
									      <th scope="col">Repository</th>
									    </tr>
									 </thead>
									 <tbody>
									 <c:forEach items="${sessionScope.rmn_servers }" var="server" varStatus="counter">
									 	<tr>
									      <td>${ server.value.ip }:${server.value.port }</td>
									      <td>${ server.value.boxname }</td>
									      <td>MYSQL</td>
									      <td>5.5</td>
									      <td>${ server.value.schema }</td>
									      <td>${ server.value.username}</td>
									      <td>
									        <table style="width: 100%; padding: 15px">
									          <tr>
									            <td style="white-space: nowrap">1. Ping</td>
									            <td id="conn_${ server.key }_1"></td>
									          </tr>
									          <tr>
									            <td style="white-space: nowrap">2. Valid Account</td>
									            <td id="conn_${ server.key }_2"></td>
									          </tr>
									          <tr>
									            <td style="white-space: nowrap">3. Metadata Connected</td>
									            <td id="conn_${ server.key }_3"></td>
									          </tr>
									          <tr>
									            <td style="white-space: nowrap">4. Metadata Validated</td>
									            <td id="conn_${ server.key }_4"></td>
									          </tr>
									        </table>
									      </td>
									      <td>
									      	<ul>
									      		<li>
									      			<a href="#" onclick="CheckConnectionUtils.checkConnectionUpdateValue( '${ server.value.ip }', '${ server.value.port}', 'conn_${ server.key }_1' )">Re-Ping</a>
									      		</li>
									      		<li>
									      			<a href="#" onclick="CheckConnectionUtils.connectViaCurrentAccount( '${server.value.index }', '${ server.value.ip }', '${ server.value.port}', 'conn_${ server.key }_2' )">Connect Via Account</a>
									      		</li>
									      		<li>
									      			<a href="#">Check Status</a>
									      		</li>
									      		<li>
									      			<a href="#">Verify</a>
									      		</li>
									      		<li>
									      			<a href="">Wipe</a>
									      		</li>
									      		<li>
									      			<a href="/admin/server/edit?server=${ server.key }">Edit</a>
									      		</li>
									      	</ul>
									      </td>
									      <td id="connected_opt_${ server.key }"></td>
									      <td>
									        <table class="table table-bordered">
									          <tr>
									            <th>Location</th>
									            <th>192.168.2.225</th>
									          </tr>
									          <tr>
									            <th>Type</th>
									            <th>Neo4j</th>
									          </tr>
									          <tr>
									            <th>Version</th>
									            <th>2.3.3</th>
									          </tr>
									          <tr>
									            <th>Uptime</th>
									            <th>443:43:34</th>
									          </tr>
									          <tr>
									            <th>Options</th>
									            <th>
									              <ul>
									                <li><a href="#">Backup</a></li>
									                <li><a href="#">Detailed Information</a></li>
									                <li><a href="#">Wipe</a></li>
									              </ul>
									            </th>
									          </tr>
									        </table>
									      </td>
									    </tr>
									 </c:forEach>
									</tbody>
								<tr>
									<td><a href="/admin/boot/server/add">Add New Server</a><br></td>
								</tr>
							</table>
							</div>
						</c:when>
						<c:otherwise>
							<p style="color: red">Please Enter a database</p>

						</c:otherwise>
					</c:choose>
				</div>
				<c:choose>
					<c:when test="${not empty userList }">
						<p>You database contains</p>
						<table border='2'>
							<tr>
								<th>user</th>
								<th>Group</th>
							</tr>
							<c:forEach items="${userList}" var="item">
								<tr>
									<td>${item.username }</td>
									<td>${item.group }</td>
								</tr>
							</c:forEach>
						</table>
						<br />
	                	 Do You want to reset the Admin password? <input
							type="button" value="Yes" id="butreset"
							onclick="ConfigurationUtils.show()" />
						<br />

						<div id="resetPWD" style="display: none; visibility: hidden">
							<input type="hidden" name="userroot" id="userroot"
								value="${sessionScope.user.loggedInUser }" /> <input
								type="hidden" name="ip" id="ip" value="${sessionScope.user.ip }" />
							New Password: <input type="password" id="rpassword" /><br />
							Confirm password: <input type="password" id="rpassword2" /><span
								id="pwd_msg"></span><br />
							<br /> Input Root Password : <input type="password"
								name="rootpwd" id="rootpwd" /><span id="rootpwd1_msg"></span><br />
							<input type="submit" value="Reset password "
								onclick="ConfigurationUtils.resetPWD()" />
						</div>
					</c:when>
					<c:otherwise>
						<p style="color: red">Your database is empty</p>
						<div id="create_admin">
							You need to Create Admin user :<br />
							<table>
								<tr>
									<td><input type="hidden" name="userroot" id="userroot"
										value="${sessionScope.user.loggedInUser }" /></td>
									<td><input type="hidden" name="ip" id="ip"
										value="${sessionScope.user.ip }" /></td>
								</tr>

								<tr>
									<td>Input <b>Admin</b> Username :
									</td>
									<td><input type="text" id="romeuser" value="RomenextAdmin" />
										<span id="romeuser_msg"></span></td>
								</tr>
								<tr>
									<td>Input <b>Admin</b> password :
									</td>
									<td><input type="password" id="romepassword"
										name="romepassword" value="" /><span id="romepassword_msg"></span></td>
									<br />
								</tr>
								<tr>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>Input <b>${sessionScope.user.loggedInUser }</b>
										Password :
									</td>
									<td><input type="password" name="rootpwd" id="rootpwd" /><span
										id="rootpwd_msg"></span></td>
								</tr>
								<br />
								<tr>
									<td colspan="2"><input type="submit" class=""
										value="Create" onclick="ConfigurationUtils.createAdmin()" /></td>
								</tr>
							</table>
						</div>
					</c:otherwise>
				</c:choose>
			</div>
			<div class="col-sm-1" id="right-bar"></div>
		</div>

	</section>
	<div class="row">
		<div class="col-sm-3" id="Left-bar"></div>
		<div class="col-sm-8">
			<footer>
				<p>&copy;ELS Copyright 2017</p>
			</footer>
		</div>
		<div class="col-sm-1" id="right-bar"></div>
	</div>
	</div>
</body>
<script>
	var today = new Date();
	document.getElementById('time').innerHTML = today.toDateString();
</script>

<c:forEach items="${sessionScope.rmn_servers }" var="server"
	varStatus="counter">
	<script>
		CheckConnectionUtils.checkConnectionUpdateValue('${ server.value.ip }',
				'${ server.value.port}', 'conn_${ server.key }_1');
		CheckConnectionUtils.connectViaCurrentAccount('${server.value.index }',
				'${ server.value.ip }', '${ server.value.port}',
				'conn_${ server.key }_2');
	</script>
</c:forEach>

</html>
