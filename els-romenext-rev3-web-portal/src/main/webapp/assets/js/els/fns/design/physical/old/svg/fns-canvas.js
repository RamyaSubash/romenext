/**
 * 
 */
//==============================================================================================
//    Given a Div  draw the grid  wher objects are designed or displayed
//     spacing is set as global variable = 100 
//=============================================================================================
function showGrid(div){
	
	var ele, linesGrid='', n=0, canvas , color ;
//	Get element   and initialise canvas	
	canvas = document.getElementById(div);
//	ele = $(div), canvas = ele[0];
//	Create lines for the grid
	if(gridOnOff) {
		gridOnOff = false;
		verticalTexts = [];
		horizontalTexts = [];
		verticalBggds = [];
		horizontalBggds = [];
	
		var n = 0;
		for (var i = -20; i <= 20; i++) {
			document.getElementById("bggd"+(2*n)+"_pv").remove();;
			document.getElementById("bggd"+(2*n+1)+"_pv").remove();
			n++
		}
		document.getElementById("grid_x_pv").remove();
		document.getElementById("grid_y_pv").remove();
		document.getElementById("text0_pv").remove();
		document.getElementById("text1_pv").remove();
		document.getElementById("text2_pv").remove();	
		
	}else {
		gridOnOff = true;
		
		verticalTexts = [];
		horizontalTexts = [];
		verticalBggds = [];
		horizontalBggds = [];
		
		var grid = "<line id='grid_x_pv' x1='0%' y1='650' x2='100%' y2='650' stroke=rgb(0,0,0) stroke-width='2'></line>";
		grid += "<line id='grid_y_pv' x1='100' y1='3' x2='100' y2='897' stroke=rgb(0,0,0) stroke-width='2'></line>";
		grid += "<text id='text0_pv' x='45' y='672' font-family='sans-serif' font-size='20px' fill='black'>(0, 0)</text>";
		grid += "<text id='text1_pv' x='95%' y='672' font-family='sans-serif' font-size='20px' fill='black'>x</text>";
		grid += "<text id='text2_pv' x='75' y='20' font-family='sans-serif' font-size='20px' fill='black'>y</text>";

		var n = 0;
		for (var i = -20; i <= 20; i++) {
			grid += "<line id='bggd" + (2 * n) + "_pv' x1='0%' y1='" + (650 + i * spacing) + "' x2='100%' y2='" + (650 + i * spacing) + "' style='stroke:rgb(128,128,128);stroke-width:0.4' stroke-dasharray='5,5'></line>"
			grid += "<line id='bggd" + (2 * n + 1) + "_pv' x1='" + (100 + i * spacing) + "' y1='3' x2='" + (100 + i * spacing) + "' y2='897' style='stroke:rgb(128,128,128);stroke-width:0.4' stroke-dasharray='5,5'></line>"
			verticalBggds.push({id: 'bggd' + (2 * n + 1) + '_pv', val: Number(100 + i * spacing)});
			horizontalBggds.push({id: 'bggd' + (2 * n) + '_pv', val: Number(650 + i * spacing)});
			n++;
		}
		
		verticalTexts.push({id: 'text2_pv', val: 75});
		horizontalTexts.push({id: 'text1_pv', val: 672});

		
		var oldCanvasInnerHtml = canvas.innerHTML.toString();
		var newCanvasInnerHtml = grid + oldCanvasInnerHtml;
		canvas.innerHTML = newCanvasInnerHtml;

	}
	
}
//==============================================================================================
function showPlaneLabel(element, ele1, ele2){
//	var canvas = document.getElementById(div);
	var showText='';
	showText += "<text id='text0' x='45' y='672' font-family='sans-serif' font-size='20px' fill='black'>(0, 0)</text>";
	showText += "<text id='text1' x='95%' y='672' font-family='sans-serif' font-size='20px' fill='black'>"+ele1+"</text>";
	showText += "<text id='text2' x='75' y='20' font-family='sans-serif' font-size='20px' fill='black'>"+ele2+"</text>";
	element.innerHTML += showText;
}