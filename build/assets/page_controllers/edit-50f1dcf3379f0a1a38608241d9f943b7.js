const SILVER_RATIO = Math.sqrt(2);
const GOLDEN_RATIO =  (1 + Math.sqrt(5)) / 2;

/* ========== Utilities ========== */


var util = {
	getIndices: function(points, gridPoints) {
		console.log(points);
		return points.map(function(point) {
			return gridPoints.indexOf(point);
		});
	},
	object: function (o) {
        function F() {}
        F.prototype = o;
        return new F();
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

				var tabletString = JSON.stringify(app.tablet.model);

				localStorage["rune"] = tabletString;

				console.log(tabletString);
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

/* ========== Grid ========== */


function Grid(options) {
	
	this.res = options.res;
	this.xUnits = options.xUnits;
	this.yUnits = options.yUnits;
	this.padding = options.padding;

	// console.log(this);

	/* ------ Setup default points ------ */

	var currentY = 0;
	var currentX = 0;

	this.points = [];

	for(var i = 0; i < this.getTotalUnits(); i++) {
		if(i % this.yUnits == 0 && i != 0) {
			currentY++;
			currentX = 0;
		}

		var point = [currentX * this.res + options.padding, currentY * this.res + options.padding];

		this.points[i] = point;

		currentX++;
	
	}

	// this.layer = new paper.Layer();

}

Grid.prototype.getTotalUnits = function() {
 	return this.xUnits * this.yUnits;
};

Grid.prototype.getWidth = function() {
	return this.res * this.xUnits;
};

Grid.prototype.getHeight =  function() {
	return this.res * this.yUnits;
};

Grid.prototype.hide = function() {
	this.layer.visible = false;
}

Grid.prototype.show = function() {
	this.layer.visible = true;
}


Grid.prototype.reset = function() {
	
}

var createGridPoint = function(point, value) {

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
;



function WorkSpace(options) {

	this.options = options;

	// Load data

	this.displayActionBar();

	// Canvas

	var canvas = document.getElementById(this.options.canvasId);

	paper.setup(canvas);


}

WorkSpace.prototype = {
	displayTablet : function(tablet) {
		addView($(this.options.tabletContainer), 'rune-tablets', { runes : tablet.runes }, null);
	},
	displayToolbar : function() {

	},
	displayRune : function(runeModel) {
		this.runeView = new RuneView(runeModel);
	},
	displayActionBar : function() {

		var actionBar = new ActionBar();

		addView($(this.options.actionbarContainer), 'rune-actionbar', { "actions" : actionBar.actions}, function() {
			actionBar.init();
		});
	},
	drawLetter : function(letterModel) {
		console.log(letterModel);
		this.runeView.drawLetter(letterModel.gridPoints);
	}
}

/* ========== Render Rune ========== */

function RuneView (runeModel) {

	var rune = this;

	// Setup grid
	this.grid = new Grid(
		runeModel.gridOptions
	);

	// console.log(runeModel);

	this.addLetterView();

	this.layers = {
		"grid" : new paper.Layer(),
		"letter" : new paper.Layer()
	}

	this.drawGrid();

	console.log(runeModel);

	this.drawLetter(runeModel.model.letter.gridPoints);

	this.redraw();

	this.showGrid = true;


}

RuneView.prototype = {
	update : function() {
	// this.letter.clear()
	// this.letter.render(rune.grid);
	// this.letter.draw(this.paper);
	},
	drawLetter : function(gridPoints) {

		this.letter.computePoints(gridPoints, this.grid);

		this.layers.letter.activate();

		this.letter.draw(this);
	},
	drawGrid : function() {

		this.layers.grid.activate();

		$.each(this.grid.points, function(idx, point) {

			var paperPoint = new paper.Point(point);

			createGridPoint(paperPoint, idx);

		});

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
	clear : function() {
		this.layer.removeChildren();
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
;

/* ========== Rune model ========== */


function RuneModelController(model) {
	this.model = model;
}

RuneModelController.prototype = {
	addPoint: function(gridRef) {
		console.log("Addingpoint " + gridRef);
		var letterController = new LetterModelController(this.model.letter);
		letterController.addPoint(gridRef);
	}
}

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

function LetterModelController(model){
	this.model = model;
}

LetterModelController.prototype = {
	clearPoints: function() {
		this.model.gridPoints = [];
	},
	addPoint :function(point) {
		this.model.gridPoints.push(point);
	},
	// preRender : function(grid) {

	// 	var renderTemp = [];

	// 	$.each(this.gridPoints, function(idx, point) {
	// 		renderTemp.push(grid.points[point]);
	// 	});


	// 	var indices = util.getIndices(this.gridPoints, grid.points);

	// 	var punits = indices.map(function(idx) {
	// 		return renderTemp[idx];
	// 	});

	// 	this.actualPoints = renderTemp;


	// },
	distort : function(type) {
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
	changeWeight : function(points, type) {

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
;


/* ========== Tablet ========== */



function TabletModelController(tabletModel) {

	if(tabletModel) {
		this.model = tabletModel;
	} else {
		this.newTabletModel();
	}
	this.activeRuneIndex = 0;

}

TabletModelController.prototype = {
	newTabletModel : function() {
		this.model = {
			runes : []
		};
		this.addRune();
	},
	getActiveRune : function() {
		if(typeof this.model.runes[this.activeRuneIndex] === 'undefined') {
			this.addRune();
		}

		return this.model.runes[this.activeRuneIndex];
	},
	addRune : function() {
		console.log("Adding rune");
		console.log(this.model);
		this.model.runes.push(new RuneModelController(new RuneModel( )) );
	},
	delRune : function() {

	}
}
;



// Controllers



// Models


function RuneEditor(options, paper) {

	// Setup workspace

	var editor = this;

	editor.workspace = new WorkSpace(options);

	editor.loadTablet();

	// Event listeners

	document.addEventListener('addPoint', function(e) {
		var activeRune = editor.tablet.getActiveRune();
		console.log("Adding point");
		console.log(activeRune);
		activeRune.addPoint(e.detail);
		editor.workspace.drawLetter(activeRune.model.letter);
	});

	document.addEventListener('clearGridPoints', function() {

		console.log('done received');
		// rune.grid.reset();
		editor.workspace.clearLetter();
		editor.workspace.drawLetter();
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
	loadTablet : function() {
	
		// Load data / create data
		console.log(typeof localStorage["rune"]);

		if(localStorage["rune"] && typeof localStorage["rune"] === 'string') {
			var tabletModel= JSON.parse(localStorage["rune"]);
			this.tablet = new TabletModelController(tabletModel);
		} else {
			this.tablet = new TabletModelController();	
		}

		console.log(this.tablet);

		this.workspace.displayTablet(this.tablet);

		this.workspace.displayRune(this.tablet.getActiveRune().model);

	}
}

;

var app = new RuneEditor({
	toolbarContainer: '',
	actionbarContainer: 'header#main-header',
	tabletContainer: '#rune-tablet',
	canvasId : 'rune-grid'
});
