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
		app.workspace.runeView.showGrid = !app.workspace.runeView.showGrid;
		app.workspace.runeView.toggleGrid(app.workspace.runeView.showGrid);
		// if(rune.showGrid) {
		// 	rune.grid.show();
		// } else {
		// 	rune.grid.hide();
		// }
		// rune.redraw();
	});		

}

RuneEditor.prototype = {
	addListeners : function() {

	},
	addTablet : function() {

		this.tablet = new TabletModelController(util.checkLocal("runeData")); 

		this.workspace.displayTablet(this.tablet.data);

		this.workspace.setActiveRune(this.tablet.getActiveRune());

	},
	saveTablet : function() {
		this.tablet.save();
	}
}

