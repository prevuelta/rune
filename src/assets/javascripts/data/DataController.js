var TabletData = require('./DataModel');
var util = require('../global/util');

/* ========== Data ========== */

function DataController(tabletModel) {

	this.tablet = tabletModel || new TabletData(null);
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
		this.tablet.runes.push(new RuneData(null));
	},
	addPoint: function(gridRef) {

		var rune = this.activeRune;

		rune.points.splice(rune.currentIndex, 0, gridRef);
		rune.currentIndex++;
		util.dispatchRuneEvent('deselectAll')

		console.log(this.activeRune);

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
		var rune = this.activeRune;
		rune.points = rune.points.filter(function(entry, idx) {
			return rune.selectedPoints.indexOf(idx) == -1; 
		});
	},
	selectPoint: function(data) {
		console.log(data);
		this.activeRune.selectedPoints.push(data);
		this.activeRune.currentIndex = data;
		// this.activeRune.letter.push(data);
	}
}

module.exports = DataController;