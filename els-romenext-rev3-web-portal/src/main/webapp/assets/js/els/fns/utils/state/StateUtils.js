const DESIGN_SUB_STATES =  {
	BASE : "BASE"
};

const DISPLAY_SUB_STATES = Object.freeze( {
	BASE : "BASE",
	WORKSPACE : "WORKSPACE"
})

const MAIN_STATE = {
		DISPLAY : {
			name: "DISPLAY",
			substates : DISPLAY_SUB_STATES
		},
		DESIGN : {
			name : Symbol("DESIGN"),
			substates : DESIGN_SUB_STATES
		}
	} 




/**
 * var guistate_main = '';	// SHOULD BE DESIGN/DISPLAY
var guistate_sub = '';	// This would be so far only BASE/WORKSPACE/etc
 * @returns
 */
function getCurrentState() {
	
	if( !guistate_main  ) {
		if( guistate_main == MAIN_STATE.DISPLAY ) {
			return MAIN_STATE.DISPLAY;
		} else if( guistate_main == MAIN_STATE.DESIGN ) {
			return MAIN_STATE.DESIGN;

		}
	}
	
	// make the default DESIGN
	return MAIN_STATE.DESIGN;
}

function isDesignView() {
	if( !guistate_main ) {
		
		if( guistate_main == MAIN_STATE.DESIGN ) {
			return true;
		}
		
	}
	return false;
}

function isDisplayView() {
	if( !guistate_main ) {
		
		if( guistate_main == MAIN_STATE.DISPLAY ) {
			return true;
		}
		
	}
	return false;
}

function getSubState() {
	
}