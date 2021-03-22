/**
 * Desc:	Event handlers/functions for TYPE Graph
 * Author:	Baya Benrachi
 * Date:	15 May  2016
 * Update:  20 May   2016
 */



//==============================================================================================
//function showTypeTooltip(sourceName){
//	var nodeType = typeMap[sourceName];
//	var inputs='', props;
//	 inputs +="<table>";
//     inputs +="<tr><th>Type:</th> <td>"+nodeType.name+"</td></tr>";
//     inputs +="<tr><th>isRoot:</th><td>"+nodeType.isRoot+"</td></tr>";
//     inputs +="<tr><th colspan='2'>Properties--------</th></tr>";
//     props = typeMap[sourceName].typeProperties;
//     $.each(props, function(key, value) {
//    	 if(value.isMandatory){ 
//    		 inputs +="<tr><th style='color:red'>"+value.name+"</th><td></td></tr>";   
//    		 }
//    	 else { inputs +="<tr><th>"+value.name+"</th><td></td></tr>";}
//     });
//	 inputs +="</table>"; 
//	 return inputs;
//}


//================================Used after Create Connection ======================
//function updateConnGraph(cy, elements) {
//    console.log(elements);
//	var newElements = cy.add(elements);
//	DesignCytoscapeUtils.attachRuleConnClickActions(newElements.filter('edge'));
//	if (layoutStatus == 0) {
//    	console.log("update graph with connection  using preset layout!");
//    	cy.layout({name: 'preset',fit : false})
//    } else {
//    	console.log("update graph with connection using default layout !");
//    	cy.layout(defaultLayout);
//    }
////	newElements.trigger('click');
//};

//=======================================================================================
//function savePosition() {	
//	var jsonstrArray = [];
//	if (tdvCy.nodes() == null || tdvCy.nodes().length < 1) {
//		$('#console-log').append("<p style='color:red'>Nograph nodes to save position </p>");	
//		return;
//	}
//	//   RETRIEVING ALL TYPES POSITIONS
//	var jsonElement = {};
//	
//	for (var i = 0; i < tdvCy.nodes().length; i++) {		
//		console.log("typemap x for Type "+tdvCy.nodes()[i].data().name+ " = " + tdvCy.nodes()[i].position().x);
//		console.log("typemap y for Type "+tdvCy.nodes()[i].data().name+ " = " + tdvCy.nodes()[i].position().y);	
//		var typeId = tdvCy.nodes()[i].data().id.toString();
//		var decoId = "1";
//
//		
//
//		jsonElement.typeId = typeId;
//		jsonElement.decoId = decoId;   
//		 // Need to be change as it is hard coded
////			jsonElement[propertyIdX]     = tdvCy.nodes()[i].position().x.toString();
////			jsonElement[propertyIdY]     = tdvCy.nodes()[i].position().y.toString();
//		
//		jsonElement["1"]     = tdvCy.nodes()[i].position().x.toString();
//		jsonElement["2"]     = tdvCy.nodes()[i].position().y.toString();
//		jsonElement["3"]     = "0";
//		
//		
//		
//		console.log(jsonElement);
//		jsonstrArray.push(jsonElement);
//		jsonElement = {};
//			
//			
////		}
//		// old code 
////		var jsonstr = {
////				typeId: tdvCy.nodes()[i].data().id.toString(),
////				decoId: "1", // hard coded now			
//////				x: tdvCy.nodes()[i].position().x.toString(),
//////				y: tdvCy.nodes()[i].position().y.toString(),
//////				z: "0"
////		};
//				
////		console.log(jsonElement);
////		jsonstrArray.push(jsonstr);
//
//		
//	}
//	
//	var doneFunction = function( data ) {
//		console.log(data);
//		$.each(data.types, function(key, value) {
//			typeMapViaId[value.id].decoProperties = value.decoProperties;
//		});
//	};
//		
//	var failFunction = function( xhr, status, error ) {
//		$('#console-log').append("<p style='color:red'>Can not save position" + xhr.status + "</p>");			
//		console.log("Save position error: "+ xhr.responseText);
//	};
//	
//	var apis = new apiRomeNext();
//	
//	apis.saveTypeCoordinates(jsonstrArray, doneFunction, failFunction );	
//	
//	$('#console-log').append("Graph Position saved ");
//	console.log("saved position");
//	
//};

