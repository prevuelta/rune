//= require rune/const
//= require rune/util

// Controllers
//= require rune/workspaceController
//= require rune/tabletModelController

// Models
//= require rune/runeModel

function RuneEditor(options, paper) {

	// Setup workspace

	var editor = this;

	editor.workspace = new WorkSpace(options);

	editor.loadTablet();

	// Event listeners

	document.addEventListener('addPoint', function(e) {
		editor.tablet.getActiveRune().addPoint(e.detail);
		editor.workspace.redrawLetter();
	});

	document.addEventListener('clearGridPoints', function() {

		// console.log('done received');
		// rune.grid.reset();
		// rune.letter.reset();
		// rune.redraw();

	});

	document.addEventListener('toggleGrid', function() {
		rune.showGrid = !rune.showGrid;
		if(rune.showGrid) {
			rune.grid.show();
		} else {
			rune.grid.hide();
		}
		rune.redraw();
	});		

}

RuneEditor.prototype = {
	addListeners : function() {

	},
	loadTablet : function() {
	
		// Load data / create data

		if(localStorage["rune"]) {
			this.tablet = JSON.parse(localStorage["rune"]);
			console.log("Loaded saved tablet");
		} else {
			this.tablet = new TabletModelController();
		}

		console.log(this.tablet);

		this.workspace.displayTablet(this.tablet);

		this.workspace.displayRune(this.tablet.getActiveRune());

	}
}

