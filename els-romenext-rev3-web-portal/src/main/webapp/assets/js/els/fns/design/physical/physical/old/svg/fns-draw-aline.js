function toDrawAngleLine() {
	if (curModel == null) {
		return;
	}
	
	if (drawingStat == 0) {
		drawingStat = 1;
		shape = "aline";
		changeImage();
	} else if (drawingStat == 1 && shape != "aline") {
		drawingStat = 1;
		shape = "aline";
		changeImage();
	} else {
		drawingStat = 0;
		changeImage();
	}
}

function selectPoint(event) {
	var bound = document.getElementById("pdsvsvg").getBoundingClientRect();
	
	x0 = bound.left;
	y0 = bound.top;
	
	var currentX = event.clientX;
	var currentY = event.clientY;
	
	currentX = currentX - x0;
	currentY = currentY - y0;
	
	console.log("currentX = " + currentX);
	console.log("currentY = " + currentY);
	
	return {x:currentX, y:currentY};
}

function drawAline(selectedPoint) {	
//	var bound = document.getElementById("pdsvsvg").getBoundingClientRect();
//	x0 = bound.left;
//	y0 = bound.top;
//	xo = verticalLines[0].val + x0;
//	yo = horizontalLines[0].val + y0;

	var output = "<line id='aline_tmp' x1='100' y1='650' x2='" + selectedPoint.x + "' y2='" + selectedPoint.y + "' stroke=rgb(255,0,0) stroke-width='2' stroke-dasharray='10,10' />";
	
	var py = document.getElementById("pdsvsvg");
	py.innerHTML += output;
}

function moveAline(event) {
	var aline = $("#aline_tmp");
	var diffX = event.clientX - x0;
	var diffY = event.clientY - y0;
	aline.attr({x2:diffX, y2:diffX});	
}