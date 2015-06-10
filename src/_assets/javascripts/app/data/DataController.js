//= require_tree .

/* ========== Data ========== */

function DataController(tabletModel) {

	this.data = tabletModel || this.dataModel();

	this.activeRuneIndex = 0;

}

DataController.prototype = {
	constructor: DataController,
	save : function() {
		localStorage["runeData"] = JSON.stringify(app.data);
	},
	dataModel : function() {
		return {
			runes : [
				new RuneModel(null, this.data.runes.length)
			]
		};
	},
	setActiveRune : function(i) {
		this.activeRune = this.data.runes[i];
	},
	addRune : function() {
		this.data.runes.push(new RuneModel(null));
	},
	addLetterPoint: function(gridRef) {
		var letter = this.getActiveRune().letter;
		console.log(letter);
		console.log(gridRef);
		letter.points.insert(letter.currentIndex, gridRef);
		letter.currentIndex++;
		util.dispatchRuneEvent('deselectAll');
	},
	clearLetter: function() {
		this.activeRune.letter.points = [];
	},

	updateGrid : function() {
		// var rune = this.getActiveRune();
		// rune.letter.gridPoints.forEach(function(entry, i) {
			
		// });
	},
	deleteSelected : function() {
		var letter = this.activeRune.letter;
		letter.gridPoints = letter.gridPoints.filter(function(entry, idx) {
			return letter.selectedPoints.indexOf(idx) == -1; 
		});
	},
	selectPoint: function(data) {
		var letter = this.activeRune.letter;
		letter.selectedPoints.push(data);
		letter.currentIndex = data;
		this.activeRune.letter.push(data);
	}
}