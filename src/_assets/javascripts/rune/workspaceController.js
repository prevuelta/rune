//= require rune/actionbarController

function WorkSpace(options) {

	this.options = options;

	// Load data

	this.displayActionBar();

	// Canvas

	var canvas = document.getElementById(this.options.canvasId);

	paper.setup(canvas);

}

WorkSpace.prototype.displayTablet = function(tablet) {
	addView($(this.options.tabletContainer), 'rune-tablets', { runes : tablet.runes }, null);
}

WorkSpace.prototype.displayToolbar = function() {

}

/* ========== Render Action bar ========== */

WorkSpace.prototype.displayActionBar = function() {

	var actionBar = new ActionBar();

	addView($(this.options.actionbarContainer), 'rune-actionbar', { "actions" : actionBar.actions}, function() {
		actionBar.init();
	});
}

/* ========== Render Rune ========== */

WorkSpace.prototype.renderRune = function (runeModel) {

	var rune = this;

	// Setup grid
	this.grid = new Grid(
		runeModel.options.baseUnit,
		runeModel.options.xRes,
		runeModel.options.yRes
	);

	this.drawGrid();

	this.addLetterView();

	this.redraw();

	this.showGrid = true;

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

Rune.prototype.redraw = function() {
	paper.view.draw();
}

Rune.prototype.addLetterView = function(paper) {
	this.letter = new Letter(paper);
}


/* ========== Letter ========== */

function Letter(paper) {


	// var _options = {
		
	// }

	// this.options = $.extend(_options, options);

	this.renderedPoints = [];

	this.gridPoints = [];

	console.log(paper.project);

	this.layer = new paper.Layer();

}

Letter.prototype.clearPoints = function() {
	this.options.gridPoints = [];
}

Letter.prototype.addPoint= function(point) {
	this.options.gridPoints.push(point);
}

Letter.prototype.render = function(grid) {

	var renderTemp = [];

	$.each(this.gridPoints, function(idx, point) {
		renderTemp.push(grid.points[point]);
	});

	// console.log(grid.points);

	var indices = util.getIndices(this.gridPoints, grid.points);

	var punits = indices.map(function(idx) {
		return renderTemp[idx];
	});

	this.renderedPoints = renderTemp;

}

Letter.prototype.clear = function() {
	this.layer.removeChildren();
}

Letter.prototype.reset = function() {
	this.gridPoints = [];
	this.clear();
}

Letter.prototype.draw = function(paper) {

	var letter = this;

	letter.layer.activate();

	var letterPath = new paper.Path();

	letterPath.strokeColor = 'black';

	$.each(letter.renderedPoints, function(idx, point) {

		if(idx) {
			letterPath.lineTo(point);
		} else {
			letterPath.moveTo(point);
		}

	});
}

Letter.prototype.distort = function(type) {
	switch(type) {
		case "random" : 
			this.renderedPoints.forEach(function(idx, element) {
				// Insert randomness here
			});
		break;
		default:
		break;
	}
}