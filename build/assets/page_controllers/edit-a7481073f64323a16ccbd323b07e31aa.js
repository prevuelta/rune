const SILVER_RATIO = Math.sqrt(2);
const GOLDEN_RATIO =  (1 + Math.sqrt(5)) / 2;

/* ========== Utilities ========== */


var util = {
	getIndices: function(points, gridPoints) {
		return points.map(function(point) {
			return gridPoints.indexOf(point);
		});
	},
	object: function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    },
    checkLocal: function(ref) {
    	return (localStorage[ref] && typeof localStorage[ref] === 'String') ? JSON.parse(localStorage[ref]) : false;
    }
}

var trigUtil = {
	getSize : function (adj, opp, hyp) {
			if(adj & hyp) {
				return Math.sqrt(hyp*hyp - adj*adj);
			} else if(adj & opp) {
				return Math.sqrt(opp*opp + adj*adj);
			} else if(opp & hyp) {
				return Math.sqrt(hyp*hyp - opp*opp);
			}				
	},
	getAngle: function(p1, p2) {
		// var adj = that.xRes;

		var adj = p1.getDistance(new paper.Point(p2.x, p1.y));
		var hyp = p1.getDistance(p2);

		// cos() = a / h;

		return (Math.PI / 2) - Math.acos( adj / hyp );

	},
	radToDeg: function(radians) {
		return radians * (180 / Math.PI)
	},
	degToRad: function(degrees) {
		return degrees / (180 / Math.PI);
	}
}

/* ========== Paper prototypes ========== */

paper.Point.prototype.getMid = function(p2) {
	return new paper.Point((this.x + p2.x) / 2, (this.y + p2.y) / 2);
};
function ActionBar() {

	this.actions = [
		{
			id : "save",
			title : "Save tablet",
			action : function(e) {
				e.preventDefault();

				app.saveTablet();

			}
		},
		{
			id : "clear",
			title : "Clear",
			action: function(e) {
				e.preventDefault();
				var clearPoints = new CustomEvent("clearGridPoints");
				document.dispatchEvent(clearPoints);
			}
		},
		{
			id: "grid",
			title: "Toggle Grid",
			action: function(e) {
				e.preventDefault();
				var clearPoints = new CustomEvent("toggleGrid");
				document.dispatchEvent(clearPoints);
			}
		},
		{
			id: "rune",
			title: "Add rune",
			action: function(e) {
				e.preventDefault();
				app.workspace.tablet.addRune();
			}
		}
	]
}

ActionBar.prototype.init = function(container) {
	for (var i=0; i < this.actions.length; i++) {
		var action = this.actions[i];
		$('[data-type="' + action.id + '"]').on('click', action.action);
	}
};

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
				app.tablet.updateGrid();
				workspace.runeView = new RuneView(runeModel);
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

	},
	updateGrid: function(runeModel) {
		this.runeView.updateGrid(runeModel.gridOptions);
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

	this.drawGrid(runeModel.gridOptions);

	this.drawLetter(runeModel.letter.gridPoints);

	this.redraw();

	this.showGrid = true;


}

RuneView.prototype = {
	updateGrid : function(gridOptions) {
	// this.letter.clear()
	// this.letter.render(rune.grid);
	// this.letter.draw(this.paper);
	},
	clearLetterView : function() {
		this.layers.letter.removeChildren();
		this.redraw();
	},
	drawLetter : function(gridPoints) {

		this.letter.computePoints(gridPoints, this.grid);

		this.layers.letter.activate();

		this.letter.draw(this);
	},
	addGrid : function(gridOptions) {
		this.grid = new GridView(gridOptions);
	},
	drawGrid : function(gridPoints) {

		this.layers.grid.removeChildren();

		this.layers.grid.activate();

		this.grid.draw();

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
			renderTemp.push(grid.points[point]);
		});


		var indices = util.getIndices(gridPoints, grid.points);

		var punits = indices.map(function(idx) {
			return renderTemp[idx];
		});

		this.renderedPoints = renderTemp;

		console.log(this);

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
			
			var point = [col * this.res + this.padding, row * this.res + this.padding];
			this.points[row].push(point);

		}

		col = 0;
	}

	this.draw();
}

GridView.prototype = {
	draw: function() {

		var grid = this;

		for(var i = 0, arr; arr = grid.points[i++];) {
			for( var j = 0, point; point = arr[j++];) {

				var paperPoint = new paper.Point(point);
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
	createGridPoint : function(point, value) {

		console.log(point + " " + value);

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
;
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

		console.log(tabletString);
	
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
		console.log("Adding rune");
		console.log(this.model);
		this.data.runes.push(new RuneModel());
	},
	delRune : function() {

	},
	addLetterPoint: function(gridRef) {
		console.log("Addingpoint " + gridRef);
		console.log(this);
		this.getActiveRune().letter.gridPoints.push(gridRef);
	},
	clearLetter: function() {
		this.getActiveRune().letter.gridPoints = [];
	},
	distortPoints : function(type) {
		switch(type) {
			case "random" : 
				this.renderedPoints.forEach(function(idx, element) {
					// Insert randomness here
				});
			break;
			default:
			break;
		}
	},
	updateGrid : function() {
		var rune = this.getActiveRune();
		// rune.letter.gridPoints.forEach(function(entry, i) {
			
		// });
	},
	changeSelectedWeight : function(points, type) {

		var showConstructors = true;

		// Draw it all
		// var testPath = new paper.Path();

		// testPath.strokeColor = 'black';

		// testPath.moveTo(points[0]);
		// testPath.lineTo(points[2]);

		// var circle = new paper.Path.Circle(midPoint, that.xRes / 2);
		// circle.strokeColor = 'black'

		//testPath.lineTo(otherPoint);

		//testPath.lineTo(points[2]);

		/* ------ Get initial vars ------ */

		var midPoint = points[0].getMid(points[2]);

		/* ------ First triangulation ------ */

		// Hypothesis to midpoint
		var t1_hyp = points[2].getDistance(midPoint);

		// Adj 
		var t1_adj = that.xRes / 2;

		var t1_phi = 90 - trigUtil.radToDeg(Math.acos( t1_adj / t1_hyp));

		// var vec = new paper.Point(points[2]);
		var vec = new paper.Point();

		vec.angle = (90 - trigUtil.radToDeg( trigUtil.getAngle(points[0], points[2]))) - t1_phi;

		var side = trigUtil.getSize(null, t1_adj, t1_hyp);

		var normalizedVector = vec.normalize();

		var finalVector = new paper.Point();

		finalVector.length = normalizedVector.length * side;

		var tangentPoint = points[2].subtract(finalVector);
	 
		/* ------ Second triangulation ------ */

		var otherPoint = new paper.Point(points[0].x, points[2].y);

		var t2_adj = otherPoint.getDistance(points[2]);

		var t2_hyp = t2_adj / Math.cos( degRad(vec.angle) );

		// New length for vector (reflects distance to new point[3]
		finalVector.length = Math.abs(t2_hyp) - finalVector.length;

		var newPoint3 = newPoint.subtract(newVector);

		var finalMeasure = points[0].getDistance(newPoint3);

		points[3].y = points[0].y + finalMeasure;
		points[1].y = points[2].y - finalMeasure;

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

	this.renderedPoints = [];

	this.gridPoints = [];

	this.distortions = [];

}
;



// Controllers



function RuneEditor(options, paper) {

	// Setup workspace

	var app = this;

	app.workspace = new WorkSpace(options);

	app.addTablet();

	// Event listeners

	document.addEventListener('addPoint', function(e) {

		app.tablet.addLetterPoint(e.detail);
		app.workspace.drawLetter(app.tablet.getActiveRune().letter);
	
	});

	document.addEventListener('clearGridPoints', function() {

		console.log('done received');
		app.tablet.clearLetter();
		app.workspace.runeView.clearLetterView();
	});

	document.addEventListener('toggleGrid', function() {
		rune.showGrid = !rune.showGrid;
		if(rune.showGrid) {
			rune.grid.show();
		} else {
			rune.grid.hide();
		}
		rune.redraw();
	});		

}

RuneEditor.prototype = {
	addListeners : function() {

	},
	addTablet : function() {

		this.tablet = new TabletModelController(util.checkLocal("runeData")); 

		this.workspace.displayTablet(this.tablet.data);

		this.workspace.setActiveRune(this.tablet.getActiveRune());

	},
	saveTablet : function() {
		this.tablet.save();
	}
}

;

var app = new RuneEditor({
	toolbarContainer: '',
	actionbarContainer: 'header#main-header',
	tabletContainer: '#rune-tablet',
	canvasId : 'rune-grid'
});

