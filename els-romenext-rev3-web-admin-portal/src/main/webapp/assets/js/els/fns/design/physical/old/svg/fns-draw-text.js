function toDrawText() {
	if (curModel == null) {
		return;
	}
	
	if (drawingStat == 0) {
		drawingStat = 1;
		shape = "text";
		changeImage();
	} else if (drawingStat == 1 && shape != "text") {
		drawingStat = 1;
		shape = "text";
		changeImage();
	} else {
		drawingStat = 0;
		changeImage();
	}
}

function drawText(selectedIntersection) {	
	var output = "<text id='text" + textNumber + "' x='" + selectedIntersection.x + "' y='" + selectedIntersection.y + "' fill='red'>TEXT</text>";
	
	var py = document.getElementById("pdsvsvg");
	py.innerHTML += output;
	
	var textId = "text" + textNumber;
	var tmpParents = [];
	tmpParents.push(selectedIntersection.parent_y);
	tmpParents.push(selectedIntersection.parent_x);
	texts.push({id:textId, x:selectedIntersection.x, y:selectedIntersection.y, parents:tmpParents});
	textNumber++;
	return textId;
}