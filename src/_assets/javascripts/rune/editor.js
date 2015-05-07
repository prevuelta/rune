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
		var activeRune = editor.tablet.getActiveRune();
		console.log("Adding point");
		console.log(activeRune);
		activeRune.addPoint(e.detail);
		editor.workspace.drawLetter(activeRune.model.letter);
	});

	document.addEventListener('clearGridPoints', function() {

		console.log('done received');
		// rune.grid.reset();
		editor.workspace.clearLetter();
		editor.workspace.drawLetter();
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
		console.log(typeof localStorage["rune"]);

		if(localStorage["rune"] && typeof localStorage["rune"] === 'string') {
			var tabletModel= JSON.parse(localStorage["rune"]);
			this.tablet = new TabletModelController(tabletModel);
		} else {
			this.tablet = new TabletModelController();	
		}

		console.log(this.tablet);

		this.workspace.displayTablet(this.tablet);

		this.workspace.displayRune(this.tablet.getActiveRune().model);

	},
	saveTablet : function() {
						var tabletString = JSON.stringify(app.tablet.model);

				localStorage["rune"] = tabletString;

				console.log(tabletString);
	}
}
