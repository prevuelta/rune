
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

	this.addLetter();

	var rune = this;

	document.addEventListener('addGridPoint', function(e) { 
		// that.addGridPoint(e.detail) ;
		console.log("point added" + e.detail);
		// rune.letter.push(e.detail);

		rune.letter.gridPoints.push(e.detail);
		rune.letter.render(rune.grid);
		rune.letter.draw();
	} );

	// Setup grid
	this.grid = new Grid(
		this.options.xUnits, 
		this.options.yUnits,
		this.options.xRes,
		this.options.yRes,
		this.options.padding
	);

	this.paper.setup(this.canvas);

	this.drawGrid();

	this.finishDraw();

}

Rune.prototype.draw = function(pointArray) {

	var that = this;

	$.each(pointArray, function(idx, point) {

		var paperPoint = new that.paper.Point(point);

		var path = GridPoint(paper, paperPoint, idx);

		console.log(path);

	});

};

Rune.prototype.drawGrid = function() {

	this.draw(this.grid.points);

	// console.log(paper.project.exportSVG());
};

Rune.prototype.finishDraw = function() {
	paper.view.draw();
}

Rune.prototype.addLetter = function(options) {
	this.letter = new Letter(options);
}