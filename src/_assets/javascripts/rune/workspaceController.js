//= require rune/actionbarController

function WorkSpace(options) {

	this.options = options;

	// Load data

	this.displayActionBar();

	// Canvas

	var canvas = document.getElementById(this.options.canvasId);

	paper.setup(canvas);


}

WorkSpace.prototype = {
	displayTablet : function(data) {

		addView($(this.options.tabletContainer), 'rune-tablets', { runes : data.runes }, null);
	},
	displayToolbar : function() {

	},
	setActiveRune : function(runeModel) {

		this.runeView = new RuneView(runeModel);

		// Populate properties
		var workspace = this;

		$.get('views/rune-properties.html', function(template) {

			var ractive = new Ractive({
				el: '#rune-properties',
				template : template,
				data : runeModel
			});

			ractive.observe('gridOptions', function(newValue, oldValue, keyPath) {
				app.tablet.updateGrid(runeModel.gridOptions);
				workspace.runeView.addGrid(runeModel.gridOptions);
			});

		
		});

	},
	displayActionBar : function() {

		var actionBar = new ActionBar();

		addView($(this.options.actionbarContainer), 'rune-actionbar', { "actions" : actionBar.actions}, function() {
			actionBar.init();
		});
	},
	drawLetter : function(letterModel) {
		this.runeView.drawLetter(letterModel.gridPoints);
	},
	updateProperties : function(model) {

	}
}

/* ========== Render Rune ========== */

function RuneView (runeModel) {

	var rune = this;

	this.layers = {
		"grid" : new paper.Layer(),
		"letter" : new paper.Layer()
	}

	// Setup grid

	this.addGrid(runeModel.gridOptions);

	this.addLetterView();

	this.drawLetter(runeModel.letter.gridPoints);

	this.redraw();

	this.showGrid = true;


}

RuneView.prototype = {
	clearLetterView : function() {
		this.layers.letter.removeChildren();
		this.redraw();
	},
	drawLetter : function(gridPoints) {

		this.clearLetterView();

		this.letter.computePoints(gridPoints, this.grid);

		this.layers.letter.activate();

		this.letter.draw(this);

	},
	addGrid : function(gridOptions) {
		this.grid = new GridView(gridOptions);
		this.drawGrid(gridOptions);
	},
	drawGrid : function(gridPoints) {

		this.layers.grid.removeChildren();

		this.layers.grid.activate();

		this.grid.draw();

		this.redraw();

	},
	hideGrid : function() {
		this.grid.hide();
	},
	redraw : function() {
		paper.view.draw();
	},
	addLetterView : function() {
		this.letter = new LetterView();
	}
}


/* ========== Letter ========== */

function LetterView() {

	this.renderedPoints = [];
	
}


LetterView.prototype = {
	computePoints : function(gridPoints, grid) {

		var renderTemp = [];

		$.each(gridPoints, function(idx, point) {
			var renderedPoint = grid.renderPoint(point);
			renderTemp.push( renderedPoint );
		});

		this.renderedPoints = renderTemp;

	},
	draw : function() {

		var letter = this;
		
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
}

/* ========== Grid view ========== */

function GridView(options) {

	this.res = options.res;
	this.xUnits = options.xUnits;
	this.yUnits = options.yUnits;
	this.padding = options.padding;

	this.points = [];

	for(var row = 0; row < this.xUnits; row++) {
		
		this.points[row] = [];

		for(var col = 0; col < this.yUnits; col++) {
			
			var point = [row, col];
			this.points[row].push(point);

		}

		col = 0;
	}
}

GridView.prototype = {
	draw: function() {

		var grid = this;

		for(var i = 0, arr; arr = grid.points[i++];) {
			for( var j = 0, point; point = arr[j++];) {

				var paperPoint = new paper.Point( this.renderPoint(point) );
				grid.createGridPoint(paperPoint, point);
			}
		}
	},
	getWidth : function() {
		return this.res * this.xUnits;
	},
	getHeight :  function() {
		return this.res * this.yUnits;
	},
	renderPoint: function(point){
		return [point[0] * this.res + this.padding, point[1] * this.res + this.padding];
	},
	createGridPoint : function(point, value) {

		var path = paper.Path.Circle(point, 15);

		path.value = value;
		path.active = false;

		var grey = new paper.Color(255, 0, 0, 0.2);

		path.fillColor = grey;
		
		path.onMouseEnter = function(e) {
			if(!this.active) {
				this.fillColor = 'orange';
			}
		}

		path.onMouseLeave = function(e) {
			if(!this.active) {
				this.fillColor = grey;
			}
		}

		path.onMouseDown = function(e) {

			this.fillColor = 'red';

			this.active = true;

			var event = new CustomEvent('addPoint', { 'detail' : e.target.value});
			
			document.dispatchEvent(event);

		}
	}
}
