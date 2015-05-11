//= require rune/const
//= require rune/util

// Controllers
//= require rune/workspaceController
//= require rune/tabletModelController

function RuneEditor(options, paper) {

	// Setup workspace

	var app = this;

	app.workspace = new WorkSpace(options);

	app.addTablet();

	// Event listeners

	document.addEventListener('addPoint', function(e) {

		app.tablet.addLetterPoint(e.detail);
		app.workspace.drawLetter(app.tablet.getActiveRune().letter);
	
	});

	document.addEventListener('clearGridPoints', function() {

		console.log('done received');
		app.tablet.clearLetter();
		app.workspace.runeView.clearLetterView();
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
	addTablet : function() {
	
		// Load data / create data
		console.log(typeof localStorage["rune"]);

		if(localStorage["rune"] && typeof localStorage["rune"] === 'string') {
			var tabletModel= JSON.parse(localStorage["rune"]);
			this.tablet = new TabletModelController(tabletModel);
		} else {
			this.tablet = new TabletModelController();	
		}

		this.workspace.displayTablet(this.tablet.data);

		console.log(this.tablet.getActiveRune());

		this.workspace.displayRune(this.tablet.getActiveRune());

	},
	saveTablet : function() {
		this.tablet.save();
	}
}

