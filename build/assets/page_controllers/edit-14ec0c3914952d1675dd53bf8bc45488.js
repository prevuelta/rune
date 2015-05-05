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
				console.log("Saved");
				// console.log(tablet);
				var tabletString = JSON.stringify(tablet);

				localStorage["rune"]  = tabletString;

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


function Grid(baseUnit, xRes, yRes, padding) {
	
	this.baseUnit = baseUnit;
	this.xRes = xRes;
	this.yRes = yRes;
	this.padding = padding;

	console.log(this);

	/* ------ Setup default points ------ */

	var currentY = 0;
	var currentX = 0;

	this.points = [];

	for(var i = 0; i < this.getTotalUnits(); i++) {
		if(i % this.yRes == 0 && i != 0) {
			currentY++;
			currentX = 0;
		}

		var point = [currentX * this.baseUnit + padding, currentY * this.baseUnit + padding];

		this.points[i] = point;

		currentX++;
	
	}

	// this.layer = new paper.Layer();

}

Grid.prototype.getTotalUnits = function() {
 	return this.baseUnit * this.baseUnit;
};

Grid.prototype.getWidth = function() {
	return this.baseUnit * this.xRes;
};

Grid.prototype.getHeight =  function() {
	return this.baseUnit * this.yRes;
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

		var event = new CustomEvent('addGridPoint', { 'detail' : e.target.value});
		
		document.dispatchEvent(event);

	}
}
;



function WorkSpace(options) {

	this.options = options;

	// Load data

	this.displayActionBar();

	// Canvas

	console.log(options.canvasId);

	var canvas = document.getElementById(this.options.canvasId);

	paper.setup(canvas);


}

WorkSpace.prototype.displayTablet = function(tablet) {
	addView($(this.options.tabletContainer), 'rune-tablets', { runes : tablet.runes }, null);
}

WorkSpace.prototype.displayToolbar = function() {

}

WorkSpace.prototype.displayRune = function(runeModel) {
	this.runeView = new RuneView(runeModel);
}

/* ========== Render Action bar ========== */

WorkSpace.prototype.displayActionBar = function() {

	var actionBar = new ActionBar();

	addView($(this.options.actionbarContainer), 'rune-actionbar', { "actions" : actionBar.actions}, function() {
		actionBar.init();
	});
}

/* ========== Render Rune ========== */

function RuneView (runeModel) {

	var rune = this;

	// Setup grid
	this.grid = new Grid(
		runeModel.options.baseUnit,
		runeModel.options.xRes,
		runeModel.options.yRes,
		runeModel.options.padding
	);

	this.drawGrid();

	this.redraw();

	this.showGrid = true;



}

RuneView.prototype.update = function() {
	// this.letter.clear()
	// this.letter.render(rune.grid);
	// this.letter.draw(this.paper);
}

RuneView.prototype.draw = function(pointArray) {

	$.each(pointArray, function(idx, point) {

		var paperPoint = new paper.Point(point);

		createGridPoint(paperPoint, idx);

	});

};

RuneView.prototype.drawGrid = function() {

	this.draw(this.grid.points);

};

RuneView.prototype.hideGrid = function() {
	this.grid.hide();
}

RuneView.prototype.redraw = function() {
	paper.view.draw();
}

RuneView.prototype.addLetterView = function(paper) {
	this.letter = new Letter(paper);
}


/* ========== Letter ========== */

function Letter(paper) {


	// var _options = {
		
	// }

	// this.options = $.extend(_options, options);

	this.renderedPoints = [];

	this.gridPoints = [];

	this.layer = new paper.Layer();

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
;

/* ========== Rune model ========== */


function RuneModel(options) {

	this.options = {
		baseUnit: 30,
		xRes: 10,
		yRes: 10,
		padding: 20
	};

	$.extend(this.options, options);

	this.letter = {};

	this.distortions = [];

	var rune = this;

	this.showGrid = true;

}

RuneModel.prototype.addLetter = function(paper) {
	this.letter = new LetterModel();
}


/* ========== Letter ========== */

function LetterModel() {

	this.renderedPoints = [];

	this.gridPoints = [];

	this.distortions = [];

}

Letter.prototype.clearPoints = function() {
	this.options.gridPoints = [];
}

Letter.prototype.addPoint= function(point) {
	this.options.gridPoints.push(point);
}

Letter.prototype.preRender = function(grid) {

	var renderTemp = [];

	$.each(this.gridPoints, function(idx, point) {
		renderTemp.push(grid.points[point]);
	});

	// console.log(grid.points);

	var indices = util.getIndices(this.gridPoints, grid.points);

	var punits = indices.map(function(idx) {
		return renderTemp[idx];
	});

	this.actualPoints = renderTemp;

}

Letter.prototype.reset = function() {
	this.gridPoints = [];
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

Letter.prototype.changeWeight = function(points, type) {

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
;


/* ========== Tablet ========== */



function TabletModelController() {

	this.runes = [];
	this.activeRuneIndex = 0;

}

TabletModelController.prototype.getActiveRune = function() {
	if(typeof this.runes[this.activeRuneIndex] === 'undefined') {
		this.addRune();
	}

	return this.runes[this.activeRuneIndex];
}

TabletModelController.prototype.addRune = function() {
	this.runes.push(new RuneModel());
}

TabletModelController.prototype.delRune = function() {

}
;



// Controllers



// Models


		// tablet.runes.push(
		// 	rune = new Rune({
		// 		xUnits: 6,
		// 		yUnits: 6,
		// 		xRes: 30,
		// 		yRes: 30,
		// 		canvasId: 'rune-grid',
		// 		padding: 30
		// 	}, paper)
		// );r

function RuneEditor(options, paper) {

	// Setup workspace

	this.workspace = new WorkSpace(options);

	this.loadTablet();

	// Event listeners

	document.addEventListener('addGridPoint', function(e) { 
		this.workspace.tablet.getActiveRune().gridPoints.push(e.detail);

	});

	document.addEventListener('clearGridPoints', function() {

		// console.log('done received');
		// rune.grid.reset();
		// rune.letter.reset();
		// rune.redraw();

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

RuneEditor.prototype.addListeners = function() {

}

RuneEditor.prototype.loadTablet = function() {
	
	// Load data / create data

	if(localStorage["rune"]) {
		this.tablet = JSON.parse(localStorage["rune"]);
		console.log("Loaded saved tablet");
	} else {
		this.tablet = new TabletModelController();
	}

	console.log(this.tablet);

	this.workspace.displayTablet(this.tablet);

	this.workspace.displayRune(this.tablet.getActiveRune());

}

;

'use strict';

var app = new RuneEditor({
	toolbarContainer: '',
	actionbarContainer: 'header#main-header',
	tabletContainer: '#rune-tablet',
	canvasId : 'rune-grid'
});

