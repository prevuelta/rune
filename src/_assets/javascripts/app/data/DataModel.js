
/* ========== Tablet Model ========== */

function TabletData(gridOptions) {

	var units = 10;

	this.gridOptions = {
		units: units,
		res: CANVAS_SIZE / units,
		padding: 20
	};

	if(gridOptions != null){
		$.extend(this.gridOptions, gridOptions);
	}

	this.runes = [];

	this.runes.push(new RuneData());

	this.showGrid = true;

	this.renderedSVG = '';

}


/* ========== Rune Model ========== */

function RuneData() {

	this.points = [];
	// eg: 
	// [[0, 2], [[1.5, 230], [1, 180]]];	

	// eg:
	// [10, 10, 230]; // pointIndex, amount, angle
	this.transforms = [];

	this.selectedPoints = [];

	this.currentIndex = 0;

}

