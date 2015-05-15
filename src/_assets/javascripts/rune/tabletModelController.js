/* ========== Tablet ========== */


function TabletModelController(tabletModel) {

	console.log(tabletModel);

	if(!tabletModel) {
		console.log("no tablet module");
		this.newTabletModel();
	} else {
		this.data = tabletModel;
	}

	this.activeRuneIndex = 0;

	this.getActiveRune();

}

TabletModelController.prototype = {
	save : function() {
		var tabletString = JSON.stringify(app.tablet.data);

		localStorage["runeData"] = tabletString;
	
	},
	newTabletModel : function() {
		this.data = {
			runes : []
		};
		this.addRune();
	},
	getActiveRune : function() {
		if(typeof this.data.runes[this.activeRuneIndex] === 'undefined') {
			this.addRune();
		}

		return this.data.runes[this.activeRuneIndex];
	},
	addRune : function() {
		this.data.runes.push(new RuneModel());
	},
	delRune : function() {

	},
	addLetterPoint: function(gridRef) {
		var letter = this.getActiveRune().letter;
		letter.gridPoints.insert(letter.currentIndex, gridRef);
		letter.currentIndex++;
		util.dispatchRuneEvent('deselectAll');
	},
	clearLetter: function() {
		this.getActiveRune().letter.gridPoints = [];
	},

	updateGrid : function() {
		var rune = this.getActiveRune();
		// rune.letter.gridPoints.forEach(function(entry, i) {
			
		// });
	},
	deleteSelected : function() {
		var tablet = this;
		var letter = this.getActiveRune().letter;
		letter.gridPoints = letter.gridPoints.filter(function(entry, idx) {
			return letter.selectedPoints.indexOf(idx) == -1; 
		});
	},
	selectPoint: function(data) {
		var letter = this.getActiveRune().letter;
		letter.selectedPoints.push(data);
		letter.currentIndex = data;
	}
}


/* ========== Rune model ========== */


function RuneModel(gridOptions) {

	this.gridOptions = {
		xUnits: 10,
		yUnits: 10,
		res: 30,
		padding: 20
	};

	$.extend(this.gridOptions, gridOptions);

	this.letter = new LetterModel();

	this.distortions = [];

	this.showGrid = true;

}


/* ========== Letter ========== */

function LetterModel() {

	this.points = [];

	this.selectedPoints = [];

	this.currentIndex = 0;

}