//= require_tree .

/* ========== Data ========== */

function DataController(tabletModel) {

	this.tablet = tabletModel || new TabletModel(null);
	this.activeRune = this.tablet.runes[0];

}

DataController.prototype = {
	constructor: DataController,
	save : function() {
		localStorage["runeData"] = JSON.stringify(app.data);
	},
	setActiveRune : function(i) {
		this.activeRune = this.tablet.runes[i];
	},
	addRune : function() {
		this.tablet.runes.push(new RuneModel(null));
	},
	addRunePoint: function(gridRef) {
		this.activeRune.points.insert(letter.currentIndex, gridRef);
		this.activeRune.currentIndex++;

		util.dispatchRuneEvent('deselectAll');
	},
	clearRune: function() {
		this.activeRune.points = [];
	},

	updateGrid : function() {
		// var rune = this.getActiveRune();
		// rune.letter.gridPoints.forEach(function(entry, i) {
			
		// });
	},
	deleteSelected : function() {
		this.activeRune.gridPoints = this.activeRune.gridPoints.filter(function(entry, idx) {
			return this.activeRune.selectedPoints.indexOf(idx) == -1; 
		});
	},
	selectPoint: function(data) {
		console.log(data);
		this.activeRune.selectedPoints.push(data);
		this.activeRune.currentIndex = data;
		// this.activeRune.letter.push(data);
	}
}