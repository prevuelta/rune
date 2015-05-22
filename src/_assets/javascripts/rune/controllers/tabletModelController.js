//= require rune/models/RuneModel

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

}

TabletModelController.prototype = {
	constructor: TabletModelController,
	save : function() {
		var svgString = app.workspace.runeView.layers["letter"].exportSVG({asString:true});
		app.tablet.getActiveRune().renderedSvg = svgString;
		
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
	setActiveRune : function(index) {
		this.activeRuneIndex = index;
	},
	addRune : function() {
		this.data.runes.push(new RuneModel(null, this.data.runes.length ));
	},
	delRune : function() {

	},
	addLetterPoint: function(gridRef) {
		var letter = this.getActiveRune().letter;
		console.log(letter);
		letter.points.insert(letter.currentIndex, gridRef);
		letter.currentIndex++;
		util.dispatchRuneEvent('deselectAll');
	},
	clearLetter: function() {
		this.getActiveRune().letter.points = [];
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