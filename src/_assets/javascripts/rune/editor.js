//= require rune/const
//= require rune/util

// Controllers
//= require rune/workspaceController
//= require rune/tabletModelController

// Models
//= require rune/runeModel
//= require rune/letterModel

		// tablet.runes.push(
		// 	rune = new Rune({
		// 		xUnits: 6,
		// 		yUnits: 6,
		// 		xRes: 30,
		// 		yRes: 30,
		// 		canvasId: 'rune-grid',
		// 		padding: 30
		// 	}, paper)
		// );r

function RuneEditor(options, paper) {

	// Setup workspace

	this.workspace = new WorkSpace(options);

	this.loadTablet();

	// Event listeners

	document.addEventListener('addGridPoint', function(e) { 
		rune.letter.gridPoints.push(e.detail);
		rune.update();

	});

	document.addEventListener('clearGridPoints', function() {

		console.log('done received');
		rune.grid.reset();
		rune.letter.reset();
		rune.redraw();

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

RuneEditor.prototype.addListeners = function() {

}

RuneEditor.prototype.loadTablet = function() {
	
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

