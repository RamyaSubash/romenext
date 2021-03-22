/* Drawing functions
Author: Jim Hsiao
Date: 	14 July 2015
Update:	

 */
 var clearPaper = function () {
		paper.clear();
		viewBox.X = ORIG_VB_X;
		viewBox.Y = ORIG_VB_Y;
		paper.setViewBox(ORIG_VB_X, ORIG_VB_Y, currentVBWidth, currentVBHeight, "true");
	},
	drawGrid = function (x, y, w, h, size, color) {
		color = color || "#000";

		var path = [
			"M",
		Math.round(x) + 0.5,
		Math.round(y) + 0.5,
			"L",
		Math.round(x + w) + 0.5,
		Math.round(y) + 0.5,

		Math.round(x + w) + 0.5,
		Math.round(y + h) + 0.5,
		Math.round(x) + 0.5,
		Math.round(y + h) + 0.5,
		Math.round(x) + 0.5,
		Math.round(y) + 0.5], // Grid boundry
		rowCount = h / size,
		columnCount = w / size;

		for (var i = 1; i < rowCount; i++) {
			path = path.concat(["M",
			Math.round(x) + 0.5,
			Math.round(y + i * size) + 0.5,
				"H",
			Math.round(x + w) + 0.5]);
		}

		for (i = 1; i < columnCount; i++) {
			path = path.concat(["M",
			Math.round(x + i * size) + 0.5,
			Math.round(y) + 0.5,
				"V",
			Math.round(y + h) + 0.5]);
		}

		return this.path(path.join(",")).attr({
			stroke: color
		});
	},
	drawCoordView = function (objId) {
		
		$.ajax({
			url: hostname + "rome/api/generic",
			method: "POST",
			data: JSON.stringify({
				"action": "getchildren",
					"objid": objId
			}),
			dataType: "json",
			success: function (jsonData) {
				// Drawing bay(s) from JSON model
				console.log(JSON.stringify(jsonData));
	
				$.each(jsonData, function (key, value) {
					var typeLabel, setArray;
					if (!value.labels) {
						return;
					}
					else {
						typeLabel = value.labels[0];
						if (!fieldNameToUse[typeLabel]) {
							return;
						}
					}
					console.log("What is the type label: " + typeLabel );

					// Trigger actions according to tab toggled
					switch (typeLabel) {
						case "BAY":
							if (baySets) {
								setArray = baySets;
							}
							else {
								setArray = baySets = paper.set();
							}
							
							break;
						case "SHELF":
							if (shelfSets) {
								setArray = shelfSets;
							}
							else {
								setArray = shelfSets = paper.set();
							}

							break;
						case "CARD":
							if (cardSets) {
								setArray = cardSets;
							}
							else {
								setArray = cardSets = paper.set();	
							}
							
							break;
						default:
							
							break;
					}
					
					var set = paper.set();
					var x = parseInt(value.fields.X_COORD) / drawingScale,
						y = parseInt(value.fields.Y_COORD) / drawingScale,
						w = parseInt(value.model.WIDTH) / drawingScale,
						// Front view uses HEIGHT
						//h = parseInt(value.model.HEIGHT) / drawingScale;
	
						// Top view uses DEPTH
						h = parseInt(value.model.DEPTH) / drawingScale;
	
					var bay = paper.rect(x, y, w, h, 10).attr({
						fill: "hsb(0, 1, 1)",
						stroke: "blue",
							"stroke-width": 0,
						opacity: 0.7
					});
	
					bay.objectId = value.objectId;
					bay.properties = value.fields;
	
					bay.hover(hoverIn, hoverOut);
	
					set.rect = bay;
					set.push(bay);
	
	                // Label for the bay taken from fieldNameToUse dictionary
	    	        var label = paper.text(x + 10, y + 10, value.fields[fieldNameToUse[typeLabel]]).attr({
	    	            'text-anchor': 'start'
	    	        });
	    	        
	    	        set.label = label;
	    	        set.push(label);
	    	        
	    	        
	    	        set.draggable(x , y , w, h, floorWidth, floorHeight);
					setArray.push(set);
				});
			}
		}).done(function (html) {
			console.log("hello in drawFloorPlanViaAPI");
		});
	},
	drawCoordViewShelf = function (objId) {
		
		$.ajax({
			url: hostname + "rome/api/generic",
			method: "POST",
			data: JSON.stringify({
				"action": "getchildren",
					"objid": objId
			}),
			dataType: "json",
			success: function (jsonData) {
				// Drawing bay(s) from JSON model
				console.log(JSON.stringify(jsonData));
	
				$.each(jsonData, function (key, value) {
					var typeLabel, setArray;
					if (!value.labels) {
						return;
					}
					else {
						typeLabel = value.labels[0];
						if (!fieldNameToUse[typeLabel]) {
							return;
						}
					}
					

					// Trigger actions according to tab toggled
					switch (typeLabel) {
						case "BAY":
							if (baySets) {
								setArray = baySets;
							}
							else {
								setArray = baySets = paper.set();
							}
							
							break;
						case "SHELF":
							if (shelfSets) {
								setArray = shelfSets;
							}
							else {
								setArray = shelfSets = paper.set();
							}

							break;
						case "CARD":
							if (cardSets) {
								setArray = cardSets;
							}
							else {
								setArray = cardSets = paper.set();	
							}
							
							break;
						default:
							
							break;
					}
					
					var set = paper.set();
					var x = parseInt(value.fields.X_COORD),
						y = parseInt(value.fields.Y_COORD),
						w = parseInt(value.model.WIDTH),
						// Front view uses HEIGHT
						h = parseInt(value.model.HEIGHT);
	
						// Top view uses DEPTH
						// h = parseInt(value.model.DEPTH) / drawingScale;
	
					var bay = paper.rect(x, y, w, h, 10).attr({
						fill: "hsb(0, 1, 1)",
						stroke: "blue",
							"stroke-width": 0,
						opacity: 0.7
					});
	
					bay.objectId = value.objectId;
					bay.properties = value.fields;
	
					bay.hover(hoverIn, hoverOut);
	
					set.rect = bay;
					set.push(bay);
	
	                // Label for the bay taken from fieldNameToUse dictionary
	    	        var label = paper.text(x + 10, y + 10, value.fields[fieldNameToUse[typeLabel]]).attr({
	    	            'text-anchor': 'start'
	    	        });
	    	        
	    	        set.label = label;
	    	        set.push(label);
	    	        
	    	        
	    	        set.draggable(x , y , w, h, floorWidth, floorHeight);
					setArray.push(set);
				});
			}
		}).done(function (html) {
			console.log("hello in drawFloorPlanViaAPI");
		});
	},
	zoomOnViewBox = function (delta) {
		var prevVBWidth = currentVBWidth,
			prevVBHeight = currentVBHeight;

		if (delta == 0) {
			mouseMovementScale = 1;
			currentVBWidth = ORIG_VB_WIDTH;
			currentVBHeight = ORIG_VB_HEIGHT;
		} else {
			if (delta < 0) {
				delta *= -1;
				mouseMovementScale = 0.95;
			} else {
				mouseMovementScale = 1.05;
			}

			for (var i = 1; delta > i; delta--) {
				mouseMovementScale *= mouseMovementScale;
			}

			currentVBWidth *= mouseMovementScale;
			currentVBHeight *= mouseMovementScale;
		}

		viewBox.X -= (currentVBWidth - prevVBWidth) / 2;
		viewBox.Y -= (currentVBHeight - prevVBHeight) / 2;
		paper.setViewBox(viewBox.X, viewBox.Y, currentVBWidth, currentVBHeight);
	},
	initializeSlider = function () {
		$("#slider-vertical").slider({
			orientation: "vertical",
			min: minZoomLevel,
			max: maxZoomLevel,
			value: ORIG_ZOOM_LEVEL,
			slide: function (event, ui) {
				var newZoomLevel = ui.value;

				if (newZoomLevel == ORIG_ZOOM_LEVEL) {
					zoomOnViewBox(0);
				} else {
					zoomOnViewBox(currentZoomLevel - newZoomLevel);
				}
				currentZoomLevel = ui.value;
			}
		});
	};
	// Draw outline then each horizontal line and vertical line
	Raphael.fn.drawGrid = drawGrid;