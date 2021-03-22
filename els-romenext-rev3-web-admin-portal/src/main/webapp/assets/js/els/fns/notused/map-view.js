/**
 * Map event handlers/functions
 * Author:  Baya Benrachi
 * Date:    14 April 2016
 * Update:
 */

//================== Initialising the map =====================//

//var map;
//var markers = [];
//var lines = [];
//var nodesMarkers, nodes;

var singleClick = false;

function initMap() {
    
	console.log("Initializing map-view!");
	
//	var myLatLng = {lat: 43.65323, lng: -79.38318};
//	
//	var mapOptions = {
//    	    center: new google.maps.LatLng(43.717899, -79.6582407),
//    	    zoom: 7,
//    	    minZoom: 5,
//    	    maxZoom: 15,
//    	    mapTypeId: google.maps.MapTypeId.TERRAIN
//		};
//    
//	map = new google.maps.Map(document.getElementById('mrvCy'), mapOptions);
//   
//    var infoWindow = new google.maps.InfoWindow({map: map});
//    
//    var marker = new google.maps.Marker({
//        position: myLatLng,
//        map: map,
//        title: 'Toronto!'
//    });
     
    //map.data.addGeoJson(nodes);

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	  infoWindow.setPosition(pos);
	  infoWindow.setContent(browserHasGeolocation ?
	                        'Error: The Geolocation service failed.' :
	                        'Error: Your browser doesn\'t support geolocation.');
}

function generateGeoView() {
	
	$('div[role="tooltip"]').remove();
//	$('div[role="tooltip"]').empty();	
//	document.getElementById('mrvCy').innerHTML = "";
	
	console.log("Generating geo-view!");
	
	var mapOptions = {
    	    center: new google.maps.LatLng(60, -95),
    	    zoom: 4,
//    	    minZoom: 4,
    	    mapTypeId: google.maps.MapTypeId.TERRAIN
		};
    
	map = new google.maps.Map(document.getElementById('mrvCy'), mapOptions);
   
//    var infoWindow = new google.maps.InfoWindow({map: map});
    
	google.maps.event.addListener(map, 'mousemove', function (event) {
		cLat = event.latLng.lat();
		cLng = event.latLng.lng();               
    });
    
	 // Define a symbol using a predefined path (an arrow)
	 // supplied by the Google Maps JavaScript API.
	 var lineSymbol = {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW};
    
    markers = [];
    lines = [];
    
//    map.addListener('center_changed', function() {
//        // 3 seconds after the center of the map has changed, pan back to the marker.
//        window.setTimeout(function() {
//          map.panTo(marker.getPosition());
//        }, 3000);
//    });
    
    var mapNodes = FormatNodesMap(nodeMap);
    var mapEdges = FormatEdgesMap(edgeMap, mapNodes);
   
    var i, nLen;
    nLen = mapNodes.length;
    for (i = 0; i < nLen; i++) {
    	
    	var myLatLng = {};
    	myLatLng.lat = mapNodes[i].lat;
    	myLatLng.lng = mapNodes[i].lng;
    	
    	markers.push(createMarker(myLatLng, mapNodes[i].uuid, mapNodes[i].type, mapNodes[i].name));
        	
    }
    
    // Create the polyline and add the symbol via the 'icons' property.
    var j, eLen;
    eLen = mapEdges.length;
    for (j = 0; j < eLen; j++) {
    	
    	var sLatLng = {};
    	sLatLng.lat = mapEdges[j].origLat;
    	sLatLng.lng = mapEdges[j].origLng;
    	
    	var eLatLng = {};
    	eLatLng.lat = mapEdges[j].destLat;
    	eLatLng.lng = mapEdges[j].destLng;
    	
    	lines.push(createLine(sLatLng, eLatLng, lineSymbol, mapEdges[j].uuid, mapEdges[j].rule, mapEdges[j].origUuid, mapEdges[j].destUuid));

    }
    
    //map.data.addGeoJson(nodes);
	
}

function reloadMarkersAndLines() {
	
	var i, len;
	len = markers.length;
	for (i = 0; i < len; i++) {
		markers[i].setMap(null);
	}
	len = lines.length;
	for (i = 0; i < len; i++) {
		lines[i].setMap(null);
	}
	
	$('div[role="tooltip"]').remove();
	
	console.log("Relaoding all markers and lines.");
	
	 // Define a symbol using a predefined path (an arrow)
	 // supplied by the Google Maps JavaScript API.
	 var lineSymbol = {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW};
    
    markers = [];
    lines = [];
    
    var mapNodes = FormatNodesMap(nodeMap);
    var mapEdges = FormatEdgesMap(edgeMap, mapNodes);
   
    var i, nLen;
    nLen = mapNodes.length;
    for (i = 0; i < nLen; i++) {
    	
    	var myLatLng = {};
    	myLatLng.lat = mapNodes[i].lat;
    	myLatLng.lng = mapNodes[i].lng;
    	
    	markers.push(createMarker(myLatLng, mapNodes[i].uuid, mapNodes[i].type, mapNodes[i].name));
        	
    }
    
    // Create the polyline and add the symbol via the 'icons' property.
    var j, eLen;
    eLen = mapEdges.length;
    for (j = 0; j < eLen; j++) {
    	
    	var sLatLng = {};
    	sLatLng.lat = mapEdges[j].origLat;
    	sLatLng.lng = mapEdges[j].origLng;
    	
    	var eLatLng = {};
    	eLatLng.lat = mapEdges[j].destLat;
    	eLatLng.lng = mapEdges[j].destLng;
    	
    	lines.push(createLine(sLatLng, eLatLng, lineSymbol, mapEdges[j].uuid, mapEdges[j].rule, mapEdges[j].origUuid, mapEdges[j].destUuid));

    }
	
}

//==================================================================================//

function FormatNodesMap(nodes){
	
	var mapNodes = [];

	$.each(nodes, function(key, value){
		
		var myLocation = {};
		
		var hasType = false;
		var hasUuid = false;
		var hasName = false;
		var hasLatitude = false;
		var hasLongitude = false;
		
		$.each(value,function (i, field){
			
			if (i == 'type') {
				myLocation.type = field;
				hasType = true;
			}
			
			if (i == 'properties'){
				field.forEach(function (prop){
					if (prop.name == 'uuid') {
						myLocation.uuid = prop.value;
						hasUuid = true;
					}
					if (prop.name == 'name' && prop.value != '') {
						myLocation.name = prop.value;
						hasName = true;
					}
				})
			}
			
			if (i == 'decoProperties') {
				field.forEach(function (decoProp){
					if (decoProp.name == 'latitude') {
						myLocation.lat = decoProp.value;
						hasLatitude = true;
					}
					if (decoProp.name == 'longitude') {
						myLocation.lng = decoProp.value;
						hasLongitude = true;
					}
				})
			}
			
		});
		
		if (hasType && !hasName) {
			myLocation.name = "(" + myLocation.type + ")";
		}
		
		if (hasType && hasUuid && hasLatitude && hasLongitude) {
			mapNodes.push(myLocation);
		}
			
	});
	
	return mapNodes;
	
}

function FormatEdgesMap(edges, nodes){
	
	var mapEdges = [];

    var j, len;
    len = nodes.length;
	
	$.each(edges, function(key, value){
		
		var myArrow = {};
		
		var hasRule = false;
		var hasUuid = false;
		var hasName = false;
		var hasOrig = false;
		var hasDest = false;
		
		$.each(value,function (i, field){
			
			if (i == 'type') {
				myArrow.rule = field;
				hasRule = true;
			}
			
			if (i == 'properties'){
				field.forEach(function (prop){
					if (prop.name == 'uuid') {
						myArrow.uuid = prop.value;
						hasUuid = true;
					}
					if (prop.name == 'name') {
						myArrow.name = prop.value;
						hasName = true;
					}
				})
			}
			
			if (i == 'originUuid') {
				
			    for (j = 0; j < len; j++) {
			    	
			    	if (field == nodes[j].uuid) {
			    		myArrow.origUuid = nodes[j].uuid;
			    		myArrow.origLat = nodes[j].lat;
			    		myArrow.origLng = nodes[j].lng;
			    		hasOrig = true;
			    		break;
			    	} 

			    }
				
			}
			
			if (i == 'destinationUuid') {
				
			    for (j = 0; j < len; j++) {
			    	
			    	if (field == nodes[j].uuid) {
			    		myArrow.destUuid = nodes[j].uuid;
			    		myArrow.destLat = nodes[j].lat;
			    		myArrow.destLng = nodes[j].lng;
			    		hasDest = true;
			    		break;
			    	} 

			    }
				
			}
			
		});
		
		if (hasRule && hasUuid && hasOrig && hasDest) {
			mapEdges.push(myArrow);
		}
			
	});
	
	return mapEdges;
	
}

function FormatSingleNodeMap (singleNode) {
	
	var myLocation = {};
	
	var hasType = false;
	var hasUuid = false;
	var hasName = false;
	var hasLatitude = false;
	var hasLongitude = false;
	
	$.each(singleNode, function (i, field){
		
		if (i == 'type') {
			myLocation.type = field;
			hasType = true;
		}
		
		if (i == 'properties'){
			field.forEach(function (prop){
				if (prop.name == 'uuid') {
					myLocation.uuid = prop.value;
					hasUuid = true;
				}
				if (prop.name == 'name' && prop.value != '') {
					myLocation.name = prop.value;
					hasName = true;
				}
			})
		}
		
		if (i == 'decoProperties') {
			field.forEach(function (decoProp){
				if (decoProp.name == 'latitude') {
					myLocation.lat = decoProp.value;
					hasLatitude = true;
				}
				if (decoProp.name == 'longitude') {
					myLocation.lng = decoProp.value;
					hasLongitude = true;
				}
			})
		}
		
	});
	
	if (hasType && !hasName) {
		myLocation.name = "(" + myLocation.type + ")";
	}
	
	if (hasType && hasUuid && hasLatitude && hasLongitude) {
		return myLocation;
	}
	
}

function FormatSingleEdgeMap (singleEdge, nodes) {
	
    var j, len;
    len = nodes.length;
	
	var myArrow = {};
	
	var hasRule = false;
	var hasUuid = false;
	var hasName = false;
	var hasOrig = false;
	var hasDest = false;
	
	$.each(singleEdge, function (i, field){
		
		if (i == 'type') {
			myArrow.rule = field;
			hasRule = true;
		}
		
		if (i == 'properties'){
			field.forEach(function (prop){
				if (prop.name == 'uuid') {
					myArrow.uuid = prop.value;
					hasUuid = true;
				}
				if (prop.name == 'name') {
					myArrow.name = prop.value;
					hasName = true;
				}
			})
		}
		
		if (i == 'originUuid') {
			
		    for (j = 0; j < len; j++) {
		    	
		    	if (field == nodes[j].uuid) {
		    		myArrow.origUuid = nodes[j].uuid;
		    		myArrow.origLat = nodes[j].lat;
		    		myArrow.origLng = nodes[j].lng;
		    		hasOrig = true;
		    		break;
		    	} 

		    }
			
		}
		
		if (i == 'destinationUuid') {
			
		    for (j = 0; j < len; j++) {
		    	
		    	if (field == nodes[j].uuid) {
		    		myArrow.destUuid = nodes[j].uuid;
		    		myArrow.destLat = nodes[j].lat;
		    		myArrow.destLng = nodes[j].lng;
		    		hasDest = true;
		    		break;
		    	} 

		    }
			
		}
		
	});
	
	if (hasRule && hasUuid && hasOrig && hasDest) {
		return myArrow;
	}
	
}

function createMarker(pos, uuid, type, name) {
	
	var marker = new google.maps.Marker({
        position: pos,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        title: name,
        type: type,
        label: name,
        uuid: uuid
    });
	
	marker.addListener('click', function() {

		
		if (connSelected != null) {
			
			if (originNode == null) {
				originNode = {value: marker.uuid,
							  type: 'node',
							  parent: marker.type};
			}else {
				destNode = {value: marker.uuid,
						  	type: 'node',
						  	parent: marker.type};
				   addEdgeDialog();
				   connSelected = null;
				   originNode = null;
				   destNode = null;
				   cursor_clear();
				   mouseEventTime = null;

			}
			
		} else {
			
			singleClick = true;
			
			setTimeout(function(){
				saveMapPositionAndRetrieveNodePropertiesInMap(marker);
				console.log("The marker is " + marker.title);
			}, 300); 
			
		}

	});
	
	marker.addListener('dragstart', function() {
		previousMovedMarkerPos = {};
		previousMovedMarkerPos.lat = marker.getPosition().lat();
		previousMovedMarkerPos.lng = marker.getPosition().lng();
		previousMovedMarkerPos.uuid = marker.uuid;
		previousMovedMarkerPos.type = marker.type;
		previousMovedMarkerPos.title = marker.title;
		console.log("Old Position " + marker.getPosition());
	});
	
	marker.addListener('dragend', function() {
		
		updateArrowPosition(marker);
		(new DisplayLogicalRenderer()).emptyAllInst();
		$("#grid-instances").css({'visibility':'hidden'});
		console.log("New Position " + marker.getPosition());
		
	});
	
	marker.addListener('dblclick', function() {
		
		singleClick = false;
		
		nodeType = marker.type;
		nodeUuid = marker.uuid;

		propertyNode = {value: nodeUuid, type: 'node', parent: nodeType}	
		historyNode.push(propertyNode);
		console.log(historyNode);
		var i, len;
		len = markers.length;
		for (i = 0; i < len; i++) {
			markers[i].setMap(null);
		}
		len = lines.length;
		for (i = 0; i < len; i++) {
			lines[i].setMap(null);
		}
		loadRelatedMapNodes_Edges(nodeUuid);
		
		console.log("This is a double click test " + marker.title);
	
	});
	
	return marker;
	
}

function createLine(sPos, ePos, lineSymbol, uuid, rule, origin, destinaiton) {
	
    var line = new google.maps.Polyline({
        path: [sPos, ePos],
        icons: [{
          icon: lineSymbol,
          offset: '100%'
        }],
        map: map,
        title: uuid,
        rule: rule,
        origin: origin,
        destination: destinaiton,
        uuid:uuid
    });
	
    line.addListener('click', function() {
    	
    	singleClick = true;
    	
		setTimeout(function(){
	    	retrieveEdgePropertiesInMap(line)
			console.log("Attached click on this line.");
		}, 300); 
	});
    
	line.addListener('dblclick', function() {
		
		singleClick = false;
		
		console.log("This is a double click test.");
	});
	
	return line;
	
}

function retrieveNodePropertiesInMap(marker) {
	
	if (selectedMetaData != null && singleClick){
	    
		var jsonData = {}, propertyNode = {}, properties = [];
	    
		propertyNode = {propertyName : "uuid", propertyType : "STRING", value : marker.uuid};
		jsonData['type']= marker.type;
	    
	    properties.push(propertyNode);
	    jsonData.properties =properties;
	    console.log(jsonData);
	    
		var rulerequest =$.ajax({
			type : 'POST',
			url : apiBaseUrl + 'node/identifier/metadata/' + selectedMetaData,
			data : JSON.stringify(jsonData),
			dataType : 'json',
			contentType : 'application/json',
			cache : false,
			success : function(data) {
				console.log("Type retrieval success. data: " + data);
			},
			error : function(xhr, ajaxOptions, error) {
				alert(xhr.status);
				console.log("Node properties retrieval failed Error: "+ xhr.responseText);
				return null;
			}
		});
		rulerequest.done(function(data) {
			console.log(data.nodes);
			showUpdateNodePropertiesDialog( data);	
		});
	}
		
}

function retrieveEdgePropertiesInMap(line) {
	
	if (selectedMetaData != null && singleClick){
		
		var jsonData = {}, propertyEdge = {}, properties = [];
		
		propertyEdge = {propertyName : "uuid", propertyType : "STRING", value : line.uuid};
		jsonData['rule'] = line.rule;
	
		properties.push(propertyEdge);
	    jsonData.edgeProperties =properties;
		console.log(jsonData);

	var edgeRequest =$.ajax({
		type : 'POST',
		url : apiBaseUrl + 'edge/simplified/metadata/' + selectedMetaData,
		data : JSON.stringify(jsonData),
		dataType : 'json',
		contentType : 'application/json',
		cache : false,
		success : function(data) {
			console.log("Type retrieval success. data: " + data);
		},
		error : function(xhr, ajaxOptions, error) {
			return null;
		}
	});
	edgeRequest.done(function(data) {
			console.log(data);
			showUpdateEdgePropertiesDialog( data);	
	});
	}
	
}

//==================================================================================//

function saveMapPosition() {
	
	var jsonstrArray = [];

	if (markers == null || markers.length < 1) {
		return;
	}
	
	for (var i = 0; i < markers.length; i++) {
		
//		console.log("Saving " + markers[i].uuid);
//		console.log("Saving " + markers[i].getPosition());
		
		var properties = [];
		properties.push({propertyName: "uuid", value: markers[i].uuid, propertyType:"STRING"});
		var newDecoProperties = [];
//		console.log("Latitude " + markers[i].getPosition().lat());
//		console.log("Longitude " + markers[i].getPosition().lng());
		newDecoProperties.push({propertyName: "latitude", value: markers[i].getPosition().lat().toString(), propertyType:"DOUBLE", romeDecoPropId: "5"});
		newDecoProperties.push({propertyName: "longitude", value: markers[i].getPosition().lng().toString(), propertyType:"DOUBLE", romeDecoPropId: "4"});
		
		var jsonstr = {
				type: markers[i].type,
				properties: properties,
				newDecoProperties: newDecoProperties
		};
		
		jsonstrArray.push(jsonstr);
		
	}
	
	if (selectedMetaData != null){
		$.ajax({
			type : 'PUT',
			url: apiBaseUrl + "node/withdeco/batch/metadata/" + selectedMetaData,
			dataType : 'json',
			data : JSON.stringify(jsonstrArray),
			contentType : 'application/json',
			cache : false,
			success : function(data) {
				console.log("Save position success. data: " + data);
			},
			error : function(xhr, ajaxOptions, error) {
				$('#console-log').append("<p style='color:red'>Can not save position" + xhr.status + "</p>");
//				alert(xhr.status);
				console.log("Save position error: "+ xhr.responseText);
			}
		}).done(function(data) {
			
			updateNodeMapLatLng(data);
			
			console.log(data);
		});
			
	} else { $('#console-log').append("<p style='color:red'>Can not save position</p>"); }
	
}

function restoreMapPosition() {
	
	generateGeoView();
	
}

function previousMapPosition() {
	
	var i, len;
	len = markers.length;
    for (i = 0; i < len; i++) {
    	
    	if (markers[i].uuid == previousMovedMarkerPos.uuid) {
    		
    		markers[i].setMap(null);
  
    		var myLatLng = {};
    		myLatLng.lat = previousMovedMarkerPos.lat;
    		myLatLng.lng = previousMovedMarkerPos.lng;    		 		
       		markers.splice(i, 1);
       		var m = createMarker(myLatLng, previousMovedMarkerPos.uuid, previousMovedMarkerPos.type, previousMovedMarkerPos.title);
       		updateArrowPosition(m);
       		markers.push(m);
       		
       		break;
       		
    	}

    }
      
}

function updateGeoMapWithNode(singleNode) {
	
	console.log("Updating geo-view!");
	
	var myLocation = FormatSingleNodeMap(singleNode);
	
	var myLatLng = {};
	myLatLng.lat = myLocation.lat;
	myLatLng.lng = myLocation.lng;
	
	uuid = myLocation.uuid;
	var hasUuid = false;
	var nodeIndex;
	var i, len;
	len = markers.length;
	for (i = 0; i < len; i++) {
		if (markers[i].uuid == uuid) {
			hasUuid = true;
			nodeIndex = i;
		}
	}
	
	if (hasUuid == true) {
		markers[nodeIndex].setMap(null);
		markers.splice(nodeIndex, 1);
	}
	
	markers.push(createMarker(myLatLng, myLocation.uuid, myLocation.type, myLocation.name));
	
}

function updateGeoMapWithEdge(singleEdge) {
	
	console.log("Updating geo-view!");
	
	var myArrow = FormatSingleEdgeMap(singleEdge, FormatNodesMap(nodeMap));
	
	var sPos = {};
	sPos.lat = myArrow.origLat;
	sPos.lng = myArrow.origLng;
	
	var ePos = {};
	ePos.lat = myArrow.destLat;
	ePos.lng = myArrow.destLng;
	
	var lineSymbol = {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW};
	
	lines.push(createLine(sPos, ePos, lineSymbol, myArrow.uuid, myArrow.rule, myArrow.origUuid, myArrow.destUuid));
	
}

function loadTypeMapNodes(stype) {
	
	// Retrieve  nodes instance for the selected type
	var loadNodesRequest = $.ajax({
		url: apiBaseUrl + "node/edge/all/simplified/"+stype+"/metadata/" + selectedMetaData ,
		method: "GET",
		dataType: "json"
	});
	
	loadNodesRequest.done(function (jsonData) {
		
		if(!$.isArray(jsonData.nodes)|| !jsonData.nodes.length){
			$("#console-log").append("No Nodes Instance/ GRAPH for the selected Type"+ stype);
			initInstTypeBar('typeInstBar');
		}else {
			nodeMap = {}; 
			edgeMap = {};
			irvCy = initNodeEdgeGraph(irvCy, "irvCy", DisplayCytoscapeUtils.formatNodesResponse(jsonData));
			markers = [];
			lines = [];
			generateGeoView();
			$("#console-log").append(" Instance GRAPH for the selected Type"+ stype);
		}
		
	});
	
	loadNodesRequest.fail(function (xhr, status, error) {
		$('#console-log').append(xhr.status);
		console.log("Error: " + xhr.responseText);
	});

}

function loadRelatedMapNodes_Edges(uuid) {
	
	// load nodes instance for the selected type
	var loadSubGraphRequest = $.ajax({
		url: apiBaseUrl + "node/end/edge/all/simplified/metadata/"+ selectedMetaData +"/uuid/"+uuid  ,
		method: "GET",
		dataType: "json"
	});
	
	loadSubGraphRequest.done(function (jsonData) {
		
		if(!$.isArray(jsonData.nodes)|| !jsonData.nodes.length){
			$("#console-log").append("No Nodes Instance/ GRAPH for the selected node"+ uuid);
			var parent = $.grep(historyNode, function(e){ return e.parent ;});
			if(parent != 'none') {historyNode.pop(); }
		}else {
				console.log("Returned json has : "+jsonData);
				connSelected = null; 
				updateInstanceGraphBatch(irvCy, formatUpdateNodesResponse(jsonData));
				initInstTypeBar("typeBar2");
				markers = [];
				lines = [];
				generateGeoView();
		}
		
	});
	loadSubGraphRequest.fail(function (xhr, status, error) {
		$('#console-log').append(xhr.status);
		console.log("Error: " + xhr.responseText);
	});

}

//==================================================================================//

function updateArrowPosition(marker) {
	
	var lineSymbol = {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW};
	
	var newLines = [];
	
	var sLatLng = {};
	var eLatLng = {};
	var t;
	var u;
	var r;
	var su;
	var eu;
	
	var i, len;
	len = lines.length;
	for (i = 0; i < len; i++) {
		
		if (lines[i] != null && marker.uuid == lines[i].origin) {
			sLatLng = {};
        	sLatLng.lat = marker.getPosition().lat();
        	sLatLng.lng = marker.getPosition().lng();
        	eLatLng = {};
        	eLatLng.lat = lines[i].getPath().getArray()[1].lat();
        	eLatLng.lng = lines[i].getPath().getArray()[1].lng();
        	t = marker.type;
        	u = lines[i].uuid;
        	r = lines[i].rule;
        	su = lines[i].origin;
        	eu = lines[i].destination;
    		lines[i].setMap(null);
    		lines.splice(i,1);
    		i--;
    		len--;
       		newLines.push(createLine(sLatLng, eLatLng, lineSymbol, u, t, su, eu));
		}
		
		if (lines[i] != null && marker.uuid == lines[i].destination) {
        	sLatLng = {};
        	sLatLng.lat = lines[i].getPath().getArray()[0].lat();
        	sLatLng.lng = lines[i].getPath().getArray()[0].lng();
        	eLatLng = {};
        	eLatLng.lat = marker.getPosition().lat();
        	eLatLng.lng = marker.getPosition().lng();
        	t = marker.type;
        	u = lines[i].uuid;
        	r = lines[i].rule;
        	su = lines[i].origin;
        	eu = lines[i].destination;
    		lines[i].setMap(null);
    		lines.splice(i,1);
    		i--;
    		len--;
       		newLines.push(createLine(sLatLng, eLatLng, lineSymbol, u, t, su, eu));
		}
		
	}
	
	if (newLines != null && newLines.length >= 1) {
		len = newLines.length;
		for (i = 0; i < len; i++) {
			lines.push(newLines[i]);	
		}
	}
	
}

function updateNodeLatLng(nodeUuid) {
	
	var jsonData = {}, props = [], prop = {};
	var decoProps = [], latProp = {}, lngProp = {};
	
	prop.propertyName = "uuid";
	prop.propertyType = "STRING";
	prop.value = nodeUuid;
	props.push(prop);
	
	latProp.propertyName = "latitude";
	latProp.propertyType = "DOUBLE";
	latProp.value = fLat.toString();
	latProp.romeDecoPropId = "5";
	decoProps.push(latProp);
	
	lngProp.propertyName = "longitude";
	lngProp.propertyType = "DOUBLE";
	lngProp.value = fLng.toString();
	lngProp.romeDecoPropId = "4";
	decoProps.push(lngProp);
	
	jsonData.properties = props;
	jsonData.newDecoProperties = decoProps;
	jsonData.type = nodeMap[nodeUuid].type;
	
	console.log(jsonData);
	
	if (selectedMetaData != null){
		$.ajax({
			type : 'PUT',
			url : apiBaseUrl + 'node/withdeco/metadata/' + selectedMetaData,
			dataType : 'json',
			data : JSON.stringify(jsonData),
			contentType : 'application/json',
			cache : false,
			success : function(data) {
				console.log("Node create success. data: " + data.nodes[0]);
			},
			error : function(xhr, ajaxOptions, error) {
				alert(xhr.status);
				console.log("Update Node Properties Error: "+ xhr.responseText);
			}
		}).done(function(data) {
					
			formatUpdateNodesResponse(data);
			reloadMarkersAndLines();
//			
//			updateGeoMapWithNode(data.nodes[0]);
//			updateArrowPosition(markers[markers.length-1]);
//			updateNodeMapLatLng(data);
			
		});
	} else { 
		$('#console-log').append("<p style='color:red'>Must Select a Repo</p>");
		cancelInstForm();
	}	
	
}

function updateNodeMapLatLng(jsonData) {
	
	$.each(jsonData.nodes, function(key, value){
		var uuid, props, display; var name='';
		// finding if the node has a name to display it
		props = value.properties;
			display = $.grep(props, function(i,item) {
		    	 if(i.name == 'name') { name = i.value;
		    		    return name}
		});
		// if not found display the type
		 if(name ) { value.cyDisplay = name}
			    else {value.cyDisplay ='' + '(' + value.type + ')' ;}	
		 // getting the color of the type
		 value.color = typeMap[value.type].color;	
		
		// Retrieve the uuid value 
		props.forEach(function(prop) {
			     if(prop.name=="uuid"){  uuid = prop.value }
		});  
		// update the nodeMap list  // May be we should change this with every call to API
		nodeMap[uuid]= value;
		
	});
	
}

function updateNodeMapLatLngSingle(node) {
	
	var props = node.properties;
	var uuid;
	var name;
	props.forEach(function(prop) {
	     if(prop.name=="uuid"){  uuid = prop.value; }
	     if(prop.name=="name"){  name = prop.value; }
	});
	
	if(name) { node.cyDisplay = name;}
	else {node.cyDisplay ='' + '(' + node.type + ')';}	
	node.color = typeMap[node.type].color;
	
	nodeMap[uuid]= node;
	
}

function saveNewNodeWithLatLng(form) {
	
	var detailNode = {};
	
	var jsonData = {}, nodeProperties = []; var nodeProperty = {}, latProp={}, lngProp={}, decoProps=[];
	
	$(form).find('div#typeName').find(':input').each(function (i, field) {
		jsonData[field.name] = field.value;
	});

	$(form).find('div#nodeProperties').find('tr').each(function (i, propDiv) {
		$(propDiv).find(':input').each(function(i, field){
			if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
				nodeProperty[field.name] = field.value;
			}
		});
	    nodeProperties.push(nodeProperty);
	    nodeProperty = {};
	});
	jsonData.properties = nodeProperties;
	
	
	latProp.propertyName = "latitude";
	latProp.propertyType = "DOUBLE";
	latProp.value = fLat.toString();
	latProp.romeDecoPropId = "5";
	decoProps.push(latProp);
	
	lngProp.propertyName = "longitude";
	lngProp.propertyType = "DOUBLE";
	lngProp.value = fLng.toString();
	lngProp.romeDecoPropId = "4";
	decoProps.push(lngProp);

	jsonData.decoProperties = decoProps;
	
	$(form).find('div#defaultDecoForNode').find(':input').each(function (i, field) {
		jsonData[field.name] = field.value;
	});
	
	$(form).find('div#modelIdName').find(':input').each(function (i, field) {
		jsonData['modelId'] = field.value;
	});
	
	$(form).find('div#partsForNodes').find(':input').each(function (i, field) {
		jsonData['partGroup'] = field.value;
	});
	
	//console.log(jsonData);
	
	if (selectedMetaData != null){
		$.ajax({
			type : 'POST',
			url : apiBaseUrl + 'node/withdeco/metadata/'+ selectedMetaData,
			dataType : 'json',
			data : JSON.stringify(jsonData),
			contentType : 'application/json',
			cache : false,
			async : false,
			success : function(data) {
				console.log("Node create success. data: " + data);
			},
			error : function(xhr, ajaxOptions, error) {
				$('#console-log').append("<p style='color:red'>Can not create node" + xhr.status + "</p>");
//				alert(xhr.status);
				console.log('Error Node not saved: ' + xhr.responseText);
				
			}
		}).done(function(data) {
			console.log("Node created "+data.type);
			updateNodeMapLatLngSingle(data);
			updateGeoMapWithNode(data);
			
			if(!irvCy) { 
				NodeUtils.loadAllNodesAndEdges();
				(new DisplayLogicalRenderer()).loadView();
//				initInstanceGraph(); 
			}
			else{						
			    updateInstanceGraph(irvCy, DisplayCytoscapeUtils.formatSingleNode(data)); 						    
			}
			
			detailNode.nodes = [];
			detailNode.nodes.push(data);
			
			showUpdateNodePropertiesDialog(detailNode);
			
		});
	} else { 
		$('#console-log').append("<p style='color:red'>Can not create a Node, You must First  select a Metadata</p>");
		cancelInstForm();
	}	
 
}

function saveNewNodeAndNewEdgeWithLatLng(form) {
	
	var detailNode = {};
	
	var jsonData1 = {}, nodeProperties = [];
	var jsonData2 = {}; 
	var nodeProperty = {}, latProp={}, lngProp={}, decoProps=[];
	
	var uuidType;
	var ruleName;
	
	var hasLatLng;
	
	$(form).find('div#typeName').find(':input').each(function (i, field) {
		jsonData1[field.name] = field.value;
	});

	$(form).find('div#nodeProperties').find('tr').each(function (i, propDiv) {
		$(propDiv).find(':input').each(function(i, field){
			if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
				nodeProperty[field.name] = field.value;
			}
		});
	    nodeProperties.push(nodeProperty);
	    nodeProperty = {};
	});
	jsonData1.properties = nodeProperties;
	
	latProp.propertyName = "latitude";
	latProp.propertyType = "DOUBLE";
	latProp.value = fLat.toString();
	latProp.romeDecoPropId = "5";
	decoProps.push(latProp);
	
	lngProp.propertyName = "longitude";
	lngProp.propertyType = "DOUBLE";
	lngProp.value = fLng.toString();
	lngProp.romeDecoPropId = "4";
	decoProps.push(lngProp);

	jsonData1.decoProperties = decoProps;
	
	$(form).find('div#defaultDecoForNode').find(':input').each(function (i, field) {
		jsonData1[field.name] = field.value;
	});
	
	$(form).find('div#modelIdName').find(':input').each(function (i, field) {
		jsonData1['modelId'] = field.value;
	});
	
	$(form).find('div#partsForNodes').find(':input').each(function (i, field) {
		jsonData1['partGroup'] = field.value;
	});
	
	$(form).find('div#parentNodeInstance').find(':input').each(function (i, field) {
		if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
			uuidType = field.value;
			var uuidAndType = field.value.split(',');
			jsonData2["originNodeUuid"] = uuidAndType[0];
			jsonData2["originTypeName"] = uuidAndType[1];
			for (var i = 0; i < markers.length; i++) {
				if (markers[i].uuid == uuidAndType[0]) {
					hasLatLng = true;
					break;
				}
			}
		}
	});
	
	$(form).find('div#connectionIdName').find(':input').each(function (i, field) {
		if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
			jsonData2["ruleName"] = field.value.split(',')[0];
			ruleName = field.value.split(',')[0];
		}
	});
	
	var edgeProperties = [], edgeProperty = {};
	$(form).find('div#edgeProperties').find('tr').each(function (i, propDiv) {
		$(propDiv).find(':input').each(function(i, field){
			if ((field.type != 'submit' && field.type != 'radio') || field.checked) {
				edgeProperty[field.name] = field.value;
			}
		});
		console.log(edgeProperty);
		edgeProperties.push(edgeProperty);
	    edgeProperty = {};
	});
	jsonData2.edgeProperties = edgeProperties;
	
	console.log(jsonData1);
	console.log(jsonData2);
	
	var destUuid;
	var destinationType;
	
	if (selectedMetaData != null && hasLatLng == true){
		
		if (!ruleName) {
			
			$.ajax({
				type : 'POST',
				url : apiBaseUrl + 'node/withdeco/metadata/'+ selectedMetaData,
				dataType : 'json',
				data : JSON.stringify(jsonData1),
				contentType : 'application/json',
				cache : false,
				async : false,
				success : function(data) {
					console.log("Node create success. data: " + data);
				},
				error : function(xhr, ajaxOptions, error) {
					$('#console-log').append("<p style='color:red'>Can not create node" + xhr.status + "</p>");
					console.log('Error Node not saved: ' + xhr.responseText);
					
				}
			}).done(function(data) {
				// update the instance logical graph
				if(!irvCy) { 
					NodeUtils.loadAllNodesAndEdges();
					(new DisplayLogicalRenderer()).loadView();
//					initInstanceGraph(); 
				}
				else{	
				    updateInstanceGraph(irvCy, DisplayCytoscapeUtils.formatSingleNode(data)); 						    
				}
				// update the instance map graph
				console.log("Node created "+data.type);
				updateNodeMapLatLngSingle(data);
				updateGeoMapWithNode(data);
				
				destinationType = data.type;
				var Props = data.properties;
				Props.forEach(function(prop) {
					if(prop.name=="uuid"){
						destUuid = prop.value;
					}
				});
				
				detailNode.nodes = [];
				detailNode.nodes.push(data);
				
				showUpdateNodePropertiesDialog(detailNode);
				
			});
			
		} else {
			
			if (uuidType) {
				
				$.ajax({
					type : 'POST',
					url : apiBaseUrl + 'node/withdeco/metadata/'+ selectedMetaData,
					dataType : 'json',
					data : JSON.stringify(jsonData1),
					contentType : 'application/json',
					cache : false,
					async : false,
					success : function(data) {
						console.log("Node create success. data: " + data);
					},
					error : function(xhr, ajaxOptions, error) {
						$('#console-log').append("<p style='color:red'>Can not create node" + xhr.status + "</p>");
						console.log('Error Node not saved: ' + xhr.responseText);
						
					}
				}).done(function(data) {
					
					if(!irvCy) { 
						NodeUtils.loadAllNodesAndEdges();
						(new DisplayLogicalRenderer()).loadView();
//						initInstanceGraph(); 
					}
					else{						
					    updateInstanceGraph(irvCy, DisplayCytoscapeUtils.formatSingleNode(data)); 						    
					}
					
					console.log("Node created "+data.type);
					updateNodeMapLatLngSingle(data);
					updateGeoMapWithNode(data);
					
					destinationType = data.type;
					var Props = data.properties;
					Props.forEach(function(prop) {
						if(prop.name=="uuid"){
							destUuid = prop.value;
						}
					});
					
					detailNode.nodes = [];
					detailNode.nodes.push(data);
					showUpdateNodePropertiesDialog(detailNode);
					
				});
				
				jsonData2.destinationNodeUuid = destUuid;
				jsonData2.destinationTypeName = destinationType;
				
				$.ajax({
					type : 'POST',
					url : apiBaseUrl + 'edge/byrule/metadata/'+ selectedMetaData,
					dataType : 'json',
					data : JSON.stringify(jsonData2),
					contentType : 'application/json',
					cache : false,
					success : function(data) {
						console.log("Edge create success. data: "+data);
						(new DisplayLogicalRenderer()).initRuleBarInst('ruleInstBar');
						updateInstanceGraph(irvCy, DisplayCytoscapeUtils.formatSingleEdge(data));
						
						if (selecteddecorator == 'Geo') {
							updateGeoMapWithEdge(data);
						}
						
					},
					error : function(xhr, ajaxOptions, error) {
						$('#console-log').append("<p style='color:red'>Can not create edge" + xhr.status + "</p>");
						console.log('Error Edge not created: ' + xhr.responseText);
						(new DisplayLogicalRenderer()).initRuleBarInst('ruleInstBar');
						
					}
				}).done(function(data) {
					console.log("Edge created ");
					
				});
				
			} else { $("#console-log").append("Please create a parent node first. OR This is a root node."); } 
			
		}
		
	} else { 
		$('#console-log').append("<p style='color:red'>Can not create a Node, You must First  select a Metadata</p>"); 
		cancelInstForm();
	}

}

function saveMapPositionAndRetrieveNodePropertiesInMap(marker) {
	
	var jsonstrArray = [];

	if (markers == null || markers.length < 1) {
		return;
	}
	
	for (var i = 0; i < markers.length; i++) {
		
//		console.log("Saving " + markers[i].uuid);
//		console.log("Saving " + markers[i].getPosition());
		
		var properties = [];
		properties.push({propertyName: "uuid", value: markers[i].uuid, propertyType:"STRING"});
		var newDecoProperties = [];
//		console.log("Latitude " + markers[i].getPosition().lat());
//		console.log("Longitude " + markers[i].getPosition().lng());
		newDecoProperties.push({propertyName: "latitude", value: markers[i].getPosition().lat().toString(), propertyType:"DOUBLE", romeDecoPropId: "5"});
		newDecoProperties.push({propertyName: "longitude", value: markers[i].getPosition().lng().toString(), propertyType:"DOUBLE", romeDecoPropId: "4"});
		
		var jsonstr = {
				type: markers[i].type,
				properties: properties,
				newDecoProperties: newDecoProperties
		};
		
		jsonstrArray.push(jsonstr);
		
	}
	
	if (selectedMetaData != null){
		$.ajax({
			type : 'PUT',
			url: apiBaseUrl + "node/withdeco/batch/metadata/" + selectedMetaData,
			dataType : 'json',
			data : JSON.stringify(jsonstrArray),
			contentType : 'application/json',
			cache : false,
			success : function(data) {
				console.log("Save position success. data: " + data);
			},
			error : function(xhr, ajaxOptions, error) {
				alert(xhr.status);
				console.log("Save position error: "+ xhr.responseText);
			}
		}).done(function(data) {
			updateNodeMapLatLng(data);
			retrieveNodePropertiesInMap(marker);
			console.log(data);
		});
			
	} else { $('#console-log').append("<p style='color:red'>Can not save position</p>"); }

}

//==================================================================================//

function markerZoomIn(nodeUuid) {
	
    map.setZoom(12);
	var i, len;
	len = markers.length;
	var ziMarker;
	for (i = 0; i < len; i++) {
		if (markers[i].uuid == nodeUuid) {
			ziMarker = markers[i];
		}
	}
        
    map.panTo(ziMarker.position);

}

function centerMap () {
	map.setCenter({lat:60, lng:-95});
}
