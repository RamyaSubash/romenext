/* Mouse event handlers/functions
Author: Jim Hsiao
Date: 	14 July 2015
Update:	

 */
  

var dragAndDrop = function (objX, objY, objW, objH, widthBoundry, heightBoundry) {
		// Coordinate is relative to the very original value
		var me = this,
			lx = 0,
			ly = 0,
			ox = 0, // Original transformation x
			oy = 0, // Original transformation y
			odx = 0,
			ody = 0,
			transformedObjX = objX + ox,
			transformedObjY = objY + oy,
			doubleClickThreshold = 500,
			lastClick = 0;

		move = function (dx, dy) {
			if (dx == 0 && dy == 0) {
				return;
			}

			odx = dx,
			ody = dy;

			// Only start moving if it has been moved for more than 5 px
			if (!hasMoved) {
				checkMoveDistance(odx, ody);
			}

			console.log("dx: " + dx.toFixed(0) + "dy: " + dy.toFixed(0) + "<br>odx: " + odx.toFixed(0) + ",ody: " + ody.toFixed(0) + "<br>lx: " + lx.toFixed(0) + ",ly: " + ly.toFixed(0));


			// Adjust for scale
			dx = dx / mouseMovementScale;
			dy = dy / mouseMovementScale;


			// Snap to rect element closer then edgeDetection
			paper.forEach(function (objToDetect) {
				var objToDetectX = objToDetect.attr("x");
				var objToDetectY = objToDetect.attr("y");

				if (objToDetect.type != "rect" || objToDetect === activeObj) {
					return;
				}

				// If objToDetect has been transformed, get its current position
				if (objToDetect.transform().length && objToDetect.transform()[0][0] == "T") {
					objToDetectX += objToDetect.transform()[0][1];
					objToDetectY += objToDetect.transform()[0][2];
				}

				var intersectOnX = false,
					intersectOnY = false;

				// Right edge is close to the object to detect
				if (Math.abs((transformedObjX + dx + objW) - objToDetectX) < edgeDetection) {

					// Will be better that we check if top and bottom also overlaps
					dx = objToDetectX - objW - transformedObjX;
				}

				// Left edge is close to the object to detect
				if (Math.abs((transformedObjX + dx) - (objToDetectX + objToDetect.attr("width"))) < edgeDetection) {
					// Will be better that we check if top and bottom also overlaps
					dx = objToDetectX + objToDetect.attr("width") - transformedObjX;
				}

				// Bottom edge is close to the object to detect
				if (Math.abs((transformedObjY + dy + objH) - objToDetectY) < edgeDetection) {
					// Will be better that we check if left and right also overlaps
					dy = objToDetectY - objH - transformedObjY;
				}

				// Top edge is close to the object to detect
				if (Math.abs((transformedObjY + dy) - (objToDetectY + objToDetect.attr("height"))) < edgeDetection) {
					// Will be better that we check if left and right also overlaps
					dy = objToDetectY + objToDetect.attr("height") - transformedObjY;
				}


				//                if (activeObj.intersectsWithObject(objToDetect) && objToDetect.intersectsWithObject(activeObj)) {
			});

			// Snap to grid
			if (dx == odx) {
				dx = snapToGrid(transformedObjX, dx, objW, widthBoundry);
			}
			if (dy == ody) {
				dy = snapToGrid(transformedObjY, dy, objH, heightBoundry);
			}

			lx = dx + ox;
			ly = dy + oy;
			
			// Keep text rotation
			
			me.transform('T' + lx + ',' + ly);

			function snapToGrid(origCoord, movement, objectSize, boundry) {

				// TODO: mouseMovementScale not correct
				newCoord = Math.round((origCoord + movement) / CELL_SIZE) * CELL_SIZE;

				if ((newCoord + objectSize) > boundry) {
					newCoord = boundry - objectSize;
				}

				if (newCoord < 0) {
					newCoord = 0;
				}

				movement = newCoord - origCoord;

				return movement;
			};
		},
		start = function () {
			me.animate({
				opacity: 0.25
			}, 0);
			me.toFront();
			activeObj = me.rect;
		},
		end = function () {
			var thisClick = new Date().getTime();

			// Determine if it is a click or a drag
			if (!hasMoved) {

				if ((thisClick - lastClick) < doubleClickThreshold) {
					$('#dialog').dialog("destroy");
					loadBayView(me[0].objectId);
				} else {

					// Unselect
					// if (activeObj) {
					// activeObj = null;
					// }

					me.unhover(hoverIn, hoverOut);
					showPropertiesBox(me);
				}

				lastClick = thisClick;
			}

			// Only update if element actually has been moved
			if (lx != 0 || ly != 0) {
				ox = lx;
				oy = ly;

				transformedObjX = objX + ox;
				transformedObjY = objY + oy;

				activeObj.X_COORD = transformedObjX.toFixed(0);
				activeObj.Y_COORD = transformedObjY.toFixed(0);

				dirtyElements.push(activeObj);
				activeObj = null;

				// Reset lx & ly
				lx = 0;
				ly = 0;
			}

			hasMoved = false;
			me.animate({
				opacity: 0.7
			}, 0);
		},
		checkMoveDistance = function (x, y) {
			if (Math.abs(x) > 5 || Math.abs(y) > 5) {
				hasMoved = true;
			} else {
				hasMoved = false;
			}
		};

		this.drag(move, start, end);
	},
	hoverIn = function () {
		this.animate({
			"stroke-width": 2
		}, 0);
	},
	hoverOut = function () {
		this.animate({
			"stroke-width": 0
		}, 0);
	},
	mouseDownOnCanvas = function (e) {
		if (paper.getElementByPoint(e.pageX, e.pageY) != null) {
			return;
		}
		mouseDown = true;
		startX = e.pageX;
		startY = e.pageY;
	},
	mouseMoveOnCanvas = function (e) {
		if (mouseDown == false) {
			return;
		}
		dX = startX - e.pageX;
		dY = startY - e.pageY;
		x = currentVBWidth / paper.width;
		y = currentVBHeight / paper.height;

		dX *= x;
		dY *= y;

		paper.setViewBox(viewBox.X + dX, viewBox.Y + dY, currentVBWidth, currentVBHeight);
	},
	mouseUpOnCanvas = function (e) {
		if (mouseDown == false) return;
		viewBox.X += dX;
		viewBox.Y += dY;
		mouseDown = false;
	};