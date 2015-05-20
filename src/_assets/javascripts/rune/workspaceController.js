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
	toggleGrid: function() {
		this.runeView.showGrid = !app.workspace.runeView.showGrid;
		this.runeView.toggleGrid(app.workspace.runeView.showGrid);
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
		this.runeView.drawLetter(letterModel);
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

	console.log(runeModel);

	this.drawLetter(runeModel.letter);

	this.redraw();

	this.showGrid = true;


}

RuneView.prototype = {
	clearLetterView : function() {
		this.layers.letter.removeChildren();
		this.redraw();
	},
	drawLetter : function(letter) {

		this.clearLetterView();

		this.letter.computePoints(letter, this.grid);

		this.layers.letter.activate();

		this.letter.draw(letter.selectedPoints);

		this.redraw();

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
	toggleGrid : function(showGrid) {
		this.layers.grid.visible = showGrid;
		this.redraw();
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
	computePoints : function(letter, grid) {

		// console.log(gridPoints);

		var renderTemp = [];

		$.each(letter.points, function(idx, point) {
			var renderedPoint = grid.renderPoint(point);

			// Add Transforms
			if(point[2]){

				renderedPoint[0] += point[2]
				renderedPoint[1] += point[3]
				
				console.log(renderedPoint);
			}
			renderTemp.push( renderedPoint );
		});

		this.renderedPoints = renderTemp;

	},
	draw : function(selected) {

		console.log("Selected");
		console.log(selected);

		var letter = this;
		
		var letterPath = new paper.Path();

		letterPath.strokeColor = 'black';

		$.each(letter.renderedPoints, function(idx, point) {

			letter.createLetterPoint(point, idx, selected.indexOf(idx) > -1);

			if(idx) {
				letterPath.lineTo(point);
			} else {
				letterPath.moveTo(point);
			}

		});
	},
	createLetterPoint: function(point, value, selected) {

		var path = paper.Path.Rectangle([point[0]-5, point[1]-5], 10);

		path.strokeColor = 'red';
		path.fillColor = 'white';

		path.value = value;

		path.selected = selected || false;
		
		path.onMouseEnter = function(e) {
			// this.fillColor = this.selected ? 'red' : 'orange';
		}

		path.onMouseLeave = function(e) {
			// this.fillColor = 'white';
		}

		path.onMouseDown = function(e) {

			this.selected = !this.selected;

			util.dispatchRuneEvent('selectPoint', [this.selected, e.target.value] );

		}
		path.onKeyDown = function(e) {
			console.log(e.key);
			switch(e.key) {
				case 'delete' :
					console.log('de');
				break;
			}
		}
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

		var opaque = new paper.Color(255, 0, 0, 0.2);

		path.fillColor = opaque;
		
		path.onMouseEnter = function(e) {
			this.fillColor = 'orange';
		}

		path.onMouseLeave = function(e) {
			this.fillColor = this.active ? 'red' : opaque;
		}

		path.onMouseDown = function(e) {

			this.fillColor = 'red';

			// this.active = true;

			util.dispatchRuneEvent('addPoint', e.target.value);
			

		}
	}
}
