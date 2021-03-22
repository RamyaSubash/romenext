<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<table width="100%" class='table-responsive'>
  <tr>
      <c:if test="${ sessionScope.guistate_main == 'DESIGN' }">
          	<td width="10%"> <div id="active_type"></div>    </td>
      </c:if> 
      <c:if test="${ sessionScope.guistate_main == 'DISPLAY' }">
        	<td width="5%"><div id="bottom_node_properties_list">Element Details</div></td>
        	<td width="15%"><div id="bottom_workspace_property_list" style="display:none;"></div></td>
      </c:if>
      <c:if test="${ sessionScope.guistate_main == 'DESIGN' }">
	      <td width="15%">  <div><ul class="list-inline" id="color_selection"></ul></div> </td>
	      <td width="15%">  <div><ul class="list-inline" id="size_selection"></ul></div></td>
      </c:if>
     
     
    <td width="20%" id="node_features"> 
         <div><ul class="list-inline" >
              <li > <b>Node :</b> </li>
              <li >
  			    Label:<button type="button" class="btn btn-primary btn-xs" id="node_captions" data-state="show" 
  			                   onclick="PrefBarFunctions.toggleNodeName()">ON</button>
  			 </li>
  			  <c:if test="${ sessionScope.guistate_main == 'DESIGN' }">
	              <li id="node_label_pos" >location: 
	  			     <select  id="label_node_positions"  onChange="PrefBarFunctions.changeLabelPosition();">
	  			           <option value='top'>Above</option>
	  			           <option value='center'>Center</option>          			      
	  			           <option value='bottom'>Below</option>
	  			     </select>
	  			   </li>	
	  			   <li id="node_label_size" >Size:
	  			     <select  id="label_node_size"   onChange="PrefBarFunctions.changeLabelSize();">
	  			           <option value='11px'>11px</option>
	  			           <option value='12px'>12px</option>
	  			           <option value='14px'>14px</option>
	  			           <option value='16px'>16px</option>
	  			           <option value='18px'>18px</option>
	  			     </select>
	  			  </li>
  			  </c:if>
  			  
         </ul></div>
     </td>
     <td width="25%" id="rel_features" > 
         <div>
           <ul class="list-inline" >
  			 <li > <b>Relationship:</b></li>
  			 <li >
  			    <button type="button" class="btn btn-primary btn-xs" id="connections" data-state="show" onclick="PrefBarFunctions.toggleRelationshipsOnOff()">ON</button>
  			</li> 	
  			<li >
  			    Label:<button type="button" class="btn btn-default btn-xs" id="edge_captions" data-state="hide" onclick="PrefBarFunctions.toggleEdgeName()">OFF</button>
  			</li>
  			 <c:if test="${ sessionScope.guistate_main == 'DESIGN' }">       			
	  			<li id="node_label">
	  			    Maximum:<button type="button" class="btn btn-default btn-xs" id="link_maxRel" data-state="hide" onclick="PrefBarFunctions.toggleLinkMax()">OFF</button>
	  			</li>  
  			
	  			<li > |</li>    			
	  			
	  			<li >
	  			    Toolstips:<button type="button" class="btn btn-primary btn-xs" id="tooltips" data-state="show" onclick="PrefBarFunctions.toggleToolTips()">ON</button>
	  			</li> 
  			</c:if>		       			 
         </ul>
         </div>
      </td>
   
  </tr>

</table>




















