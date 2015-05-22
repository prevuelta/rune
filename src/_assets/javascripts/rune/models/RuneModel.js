
/* ========== Rune model ========== */

function RuneModel(gridOptions, index) {

	this.gridOptions = {
		xUnits: 10,
		yUnits: 10,
		res: 30,
		padding: 20
	};

	if(gridOptions != null){
		$.extend(this.gridOptions, gridOptions);
	}

	this.letter = new LetterModel();

	this.showGrid = true;

	this.renderedSVG = '';

	this.runeIndex = index;

}


/* ========== Letter ========== */

function LetterModel() {

	this.points = [];

	this.selectedPoints = [];

	this.currentIndex = 0;

}