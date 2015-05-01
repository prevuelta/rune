
/* ========== Rune master class ========== */

function Rune(options, paper) {

	this.options = {
		xUnits: 4, 
		yUnits: 4,
		xRes: 20,
		yRes: 20,
		padding: 20,
		canvasId: 'RuneCanvas'
	};

	$.extend(this.options, options);

	console.log(options);

	this.letter = {};

	this.canvas = document.getElementById(this.options.canvasId);

	this.paper = paper;

	var rune = this;

	this.paper.setup(this.canvas);

	// Setup grid
	this.grid = new Grid(
		this.options.xUnits, 
		this.options.yUnits,
		this.options.xRes,
		this.options.yRes,
		this.options.padding,
		paper
	);

	
	this.drawGrid();

	this.addLetter(this.paper);

	this.reDraw();

	// Event listeners

	document.addEventListener('addGridPoint', function(e) { 

		rune.letter.gridPoints.push(e.detail);

		rune.update();
	
	});


	document.addEventListener('clearGridPoints', function() {

		console.log('done received');
		rune.grid.reset();
		rune.letter.reset();
		rune.reDraw();

	});

	document.addEventListener('toggleGrid', function() {
		console.log('Hide Grid');
		rune.grid.hide();
	});

}

Rune.prototype.update = function() {
	this.letter.clear()
	this.letter.render(rune.grid);
	this.letter.draw(this.paper);
}

Rune.prototype.draw = function(pointArray) {

	var rune = this;

	$.each(pointArray, function(idx, point) {

		var paperPoint = new rune.paper.Point(point);

		var path = createGridPoint(rune.paper, paperPoint, idx);

		console.log(path);

	});

};

Rune.prototype.drawGrid = function() {

	this.draw(this.grid.points);

};

Rune.prototype.hideGrid = function() {
	this.grid.hide();
}

Rune.prototype.reDraw = function() {
	paper.view.draw();
}

Rune.prototype.addLetter = function(paper) {
	this.letter = new Letter(paper);
}