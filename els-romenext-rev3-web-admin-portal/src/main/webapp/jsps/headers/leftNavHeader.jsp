<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
 
        <div class="col-sm-3 col-md-2 sidebar" style="margin-top: 50px">
		<c:set var="leftnav_current_server" value="${sessionScope.rmn_servers[ sessionScope.current_server ] }"> </c:set>
        
          <ul class="nav nav-sidebar">
            <li class="active"><a href="/admin/boot/dashboard">Home <span class="sr-only">(current)</span></a></li>
            <li><a href="#"></a></li>
            <li>Server Menu
            	<ul class="nav nav-sidebar">
            		<li><a href="/admin/boot/server/view">View Servers</a></li>
            		<li><a href="/admin/boot/server/add">Add Server</a></li>
            		<li><a href="/admin/boot/server/scan">Scan for Servers</a></li>
            		
            		
            	</ul>
            </li>
            <c:if test="${leftnav_current_server.connectable == true }">
            <li>Group Menu
            	<ul class="nav nav-sidebar">
            		<li><a href="/admin/boot/group/view">View Groups</a></li>
            		<li><a href="/admin/boot/group/create">Create Group</a></li>
            		
            	</ul>
            </li>
            <li>User Menu
            	<ul class="nav nav-sidebar">
            		<li><a href="/admin/boot/user/view">View Users for Current</a></li>
            		<li><a href="/admin/boot/user/create">Create User</a></li>
            		
            	</ul>
            </li>
			<li>Type Menu
            	<ul class="nav nav-sidebar">
            		<li><a href="/admin/boot/types/view">View Types</a></li> 
            		
            	</ul>
            </li>
            </c:if>
            <li><hr/></li>
            
          </ul>
        </div>