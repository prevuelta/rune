
/* ========== Rune model ========== */

function RuneModel(gridOptions, index) {

	var units = 10;

	this.gridOptions = {
		units: units,
		res: CANVAS_SIZE / units,
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
	// eg: 
	// [[0, 2], [[1.5, 230], [1, 180]]];	

	// eg:
	// [10, 10, 230]; // pointIndex, amount, angle
	this.transforms = [];

	this.selectedPoints = [];

	this.currentIndex = 0;

}