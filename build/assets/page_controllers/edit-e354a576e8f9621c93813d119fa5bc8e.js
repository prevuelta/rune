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
    	return (localStorage[ref] && typeof localStorage[ref] === 'string') ? JSON.parse(localStorage[ref]) : false;
    },
    dispatchRuneEvent: function(name, data) {
		var runeEvent = new CustomEvent('runeEvent', { 'detail' : { 'event' : name, 'data' :  data }});
		document.dispatchEvent(runeEvent);
	}
}

var trigUtil = {
	getMid : function(p1, p2) {
		return [(p1.x + p2.x) / 2, (p1.y + p2.y) / 2];
	},
	getDistance : function(p1, p2) {
		return this.getSize(p1.y - p2.y, p1.x - p2.x, null);
	},
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

/* ========== JS prototypes ========== */

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};
// Event listeners

function setupEvents() {

	document.addEventListener('runeEvent', function(e) {
		console.log('Event received: ' + e.detail.event);
		eventHandlers[e.detail.event](e.detail.data);

	});

	document.addEventListener('keydown', function(e) {
		console.log(e.keyCode);
		switch(e.keyCode) {
			case 8: //delete
				e.preventDefault();
				app.tablet.deleteSelected();
				app.workspace.drawLetter(app.tablet.getActiveRune().letter);
				
				util.dispatchRuneEvent('deselectAll');

			break;
		}
	});

}

var eventHandlers = {
	addPoint : function(data) {
		app.tablet.addLetterPoint(data);
		app.workspace.drawLetter(app.tablet.getActiveRune().letter);
	},
	selectPoint: function(data) {
		if(data[0]) {
			app.tablet.selectPoint(data[1]);
		} else {
			app.tablet.getActiveRune().letter.selectedPoints = _.without(app.tablet.getActiveRune().letter.selectedPoints, data[1]);
		}
		// console.log(app.tablet.selectedPoints);
	},
	clearGridPoints : function(e) {
		app.tablet.clearLetter();
		app.workspace.runeView.clearLetterView();
	},
	toggleGrid: function(e) {
		app.workspace.toggleGrid();
	},
	deselectAll: function(e) {
		app.tablet.getActiveRune().letter.selectedPoints = [];
	}
}





;
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
				util.dispatchRuneEvent("clearGridPoints");
			}
		},
		{
			id: "grid",
			title: "Toggle Grid",
			action: function(e) {
				e.preventDefault();
				util.dispatchRuneEvent("toggleGrid");
			}
		},
		{
			id: "rune",
			title: "Add rune",
			action: function(e) {
				e.preventDefault();
				app.tablet.addRune();
			}
		},
		{
			id: "svg",
			title: "Export as SVG",
			action: function(e) {
				e.preventDefault();
				var svgString = paper.project.exportSVG({asString:true});
				var url = "data:image/svg+xml;utf8," + encodeURIComponent(svgString);
				var link = document.createElement("a");
				link.download = 'rune_export.svg';
				link.href = url;
				link.click();
			}
		}
	]
}

ActionBar.prototype.init = function(container) {
	for (var i=0; i < this.actions.length; i++) {
		var action = this.actions[i];
		$('[data-action="' + action.id + '"]').on('click', action.action);
	}
};
function Transform () {

	console.log("Transform!");

	this.title = "Transform";

	var transform = this;

	this.transforms = [
		{
			id : "weight",
			title : "Fix weight",
			action : function(e) {
				e.preventDefault();

				transform.weight(app.tablet.getActiveRune().letter.selectedPoints, app.tablet.getActiveRune().gridOptions.res  * 2);

			}
		}
	];

	this.transforms.forEach(function(transform) {
		console.log("What?");
		console.log(transform);
		$('#rune-panels').on('click', '[data-transform="' + transform.id + '"]', transform.action);
	});

}

Transform.prototype = {
	constructor: Transform,
	weight : function(originalPoints, res) {
		
		points = originalPoints.map(function(entry) {
			return new paper.Point(app.workspace.runeView.letter.points[entry].point);
		});


				// Hypothesis to midpoint
	// 				var t1_hyp = points[2].getDistance(midPoint);
	// 				var t1_adj = that.xRes / 2;

	// 				// var theta = 
	// 				var t1_phi = 90 - radDeg(Math.acos( t1_adj / t1_hyp));

	// 				console.log("Phi " + t1_phi);

	// 				// New vector
	// 				var vec = new paper.Point(points[2]);
	// 				vec.angle = (90 - radDeg( getAngle(points[0], points[2]))) - t1_phi;

	// 				var side = getSize(null, t1_adj, t1_hyp);

	// 				var newVector = vec.normalize();

	// 				console.log("Side" + side);

	// 				newVector.length = newVector.length * side;

	// 				var newPoint = points[2].subtract(newVector);

	// 				console.log(newPoint);

	// 				// testPath.lineTo(newPoint);

	// // 
	// 				/* ------ Second triangulation ------ */

	// 				var otherPoint = new paper.Point(points[0].x, points[2].y);

	// 				console.log(otherPoint + " " + points[2]);

	// 				testPath.lineTo(otherPoint);

	// 				testPath.lineTo(points[2]);

	// 				var t2_adj = otherPoint.getDistance(points[2]);

	// 				console.log("adj" + t2_adj);

	// 				console.log("Vec angle" + vec.angle);

	// 				var t2_hyp = t2_adj / Math.cos( degRad(vec.angle) );

	// 				console.log("Hyp: " + t2_hyp + "  " +  newVector.length);

	// 				newVector.length = Math.abs(t2_hyp) - newVector.length;

	// 				var newnewpoint = newPoint.subtract(newVector);

	// 				testPath.lineTo(newnewpoint);

	// 				var finalMeasure = points[0].getDistance(newnewpoint);

	// 				points[3].y = points[0].y + finalMeasure;
	// 				points[1].y = points[2].y - finalMeasure;

		// var showConstructors = true;

		// Draw it all
		// var testPath = new paper.Path();

		// testPath.strokeColor = 'orange';

		// testPath.moveTo(points[0]);
		// testPath.lineTo(points[2]);


		// testPath.lineTo(otherPoint);

		// testPath.lineTo(points[2]);

		var testPath = new paper.Path();
		testPath.strokeColor = 'red';

		/* ------ Get initial vars ------ */

		// console.log(points);

		var midPoint = points[0].getMid(points[2]);

		// Show mid circle
		var circle = new paper.Path.Circle(midPoint, res / 2);
		circle.strokeColor = 'black'

		/* ------ First triangulation ------ */

		// Hypothesis to midpoint
		var t1_hyp = points[2].getDistance(midPoint);

		// Adj 
		var t1_adj = res / 2;

		var t1_phi = 90 - trigUtil.radToDeg(Math.acos( t1_adj / t1_hyp));

		// var vec = new paper.Point(points[2]);
		var vec = new paper.Point();

		vec.angle = (90 - trigUtil.radToDeg( trigUtil.getAngle(points[0], points[2]))) - t1_phi;

		var side = trigUtil.getSize(null, t1_adj, t1_hyp);

		vec.length = side;

		var tangentPoint = points[2].subtract(vec);
	 
		testPath.moveTo(points[2]);
		testPath.lineTo(tangentPoint);

		/* ------ Second triangulation ------ */

		var otherPoint = new paper.Point(points[0].x, points[2].y);

		// Distance between points[2] and 0 on y axis
		var t2_adj = otherPoint.getDistance(points[2]);

		var t2_hyp = t2_adj / Math.cos( trigUtil.degToRad(vec.angle) );

		// New length for vector (reflects distance to new point[3]
		vec.length = Math.abs(t2_hyp) - vec.length;

		// var newPoint = points[2].subtract(finalVector.length);

		var newPoint3 = tangentPoint.subtract(vec);

		testPath.lineTo(newPoint3);

		// var newPoint3 = otherPoint.subtract(finalVector);

		var finalMeasure = points[0].getDistance(newPoint3);

		console.log("Distance" + finalMeasure);

		// points[3].y = points[0].y + finalMeasure;
		// points[1].y = points[2].y - finalMeasure;

		app.tablet.getActiveRune().letter.transforms = {};

		app.tablet.getActiveRune().letter.transforms[originalPoints[3]] = [-90, -finalMeasure];
		app.tablet.getActiveRune().letter.transforms[originalPoints[1]] = [90, finalMeasure];


	},
	randomise : function(points) {

	}
}
;


/* ========== Letter ========== */


function LetterView() {

	this.points = [];
	
}


LetterView.prototype = {
	constructor: LetterView,
	draw : function(letterModel, grid) {

		var letter = this;
		
		var letterPath = new paper.Path();

		letterPath.strokeColor = 'black';

		letter.letterPoints = [];

		$.each(letterModel.points, function(idx, point) {

			var path = letter.createLetterPoint(grid.renderPoint(point), idx, letterModel.selectedPoints.indexOf(idx) > -1, letterModel.transforms[idx] || null);

			letter.points.push(path);

			if(idx) {
				letterPath.lineTo(path.point);
			} else {
				letterPath.moveTo(path.point);
			}

		});
	},
	createLetterPoint: function(point, value, selected, transform) {

		var point = new paper.Point(point);

				if(transform)
			path.point.add((function() { var point = new paper.Point(); point.angle = transform[0]; point.length = transform[1]; return point;})());


		var path = paper.Path.Rectangle([point[0]-5, point[1]-5], 10);

		path.


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

		return path;
	}
}
;

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
	constructor: GridView,
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
;



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
	constructor: RuneView,
	clearLetterView : function() {
		this.layers.letter.removeChildren();
		this.redraw();
	},
	drawLetter : function(letter) {

		this.clearLetterView();

		this.layers.letter.activate();

		this.letter.draw(letter, this.grid);

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
;





function WorkSpace(options) {

	this.options = options;

	// Load data

	this.displayActionBar();

	// Canvas

	var canvas = document.getElementById(this.options.canvasId);

	paper.setup(canvas);

	paper.install(window);

	[
		{
			template : 'panel-properties.html',
			data: {
				title: "Properties"
			},
			controller : function() {}
		},
		{
			template : 'panel-transform.html',
			data: {
				title : "Transform",
				res : 0
			},
			controller : Transform
		}
	].forEach(this.loadPanel);

}

WorkSpace.prototype = {
	constructor: WorkSpace,
	displayTablet : function(data) {

		addView($(this.options.tabletContainer), 'toolbar-tablets', { runes : data.runes }, function() {
			$('.rune').on('click', function() {
				var index = $(this).data('rune-index');
				console.log(index);
				app.tablet.setActiveRune(index);
			});
		});
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

	},
	loadPanel : function(options) {

		console.log(options);

		$.get('views/' + options.template, function(template) {

			var ractive = new Ractive({
				el: '#rune-panels',
				template : template,
				data : options.data,
				append : true,
				oncomplete: function() {
					$('.panel').draggable();
					// console.log(options.controller);
					var controller = new options.controller();
				}
			});

			// ractive.observe('gridOptions', function(newValue, oldValue, keyPath) {
			// 	app.tablet.updateGrid(runeModel.gridOptions);
			// 	workspace.runeView.addGrid(runeModel.gridOptions);
			// });

		});
	},
	displayActionBar : function() {

		var actionBar = new ActionBar();

		addView($(this.options.actionbarContainer), 'toolbar-actions', { "actions" : actionBar.actions}, function() {
			actionBar.init();
		});

	},
	drawLetter : function(letterModel) {
		this.runeView.drawLetter(letterModel);
	},
	updateProperties : function(model) {

	}
}
;

/* ========== Rune model ========== */


function RuneModel(gridOptions, index) {

	this.gridOptions = {
		xUnits: 10,
		yUnits: 10,
		res: 30,
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

}

TabletModelController.prototype = {
	constructor: TabletModelController,
	save : function() {
		var svgString = app.workspace.runeView.layers["letter"].exportSVG({asString:true});
		app.tablet.getActiveRune().renderedSvg = svgString;
		
		var tabletString = JSON.stringify(app.tablet.data);

		localStorage["runeData"] = tabletString;
	
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
	setActiveRune : function(index) {
		this.activeRuneIndex = index;
	},
	addRune : function() {
		this.data.runes.push(new RuneModel(null, this.data.runes.length ));
	},
	delRune : function() {

	},
	addLetterPoint: function(gridRef) {
		var letter = this.getActiveRune().letter;
		console.log(letter);
		console.log(gridRef);
		letter.points.insert(letter.currentIndex, gridRef);
		letter.currentIndex++;
		util.dispatchRuneEvent('deselectAll');
	},
	clearLetter: function() {
		this.getActiveRune().letter.points = [];
	},

	updateGrid : function() {
		var rune = this.getActiveRune();
		// rune.letter.gridPoints.forEach(function(entry, i) {
			
		// });
	},
	deleteSelected : function() {
		var tablet = this;
		var letter = this.getActiveRune().letter;
		letter.gridPoints = letter.gridPoints.filter(function(entry, idx) {
			return letter.selectedPoints.indexOf(idx) == -1; 
		});
	},
	selectPoint: function(data) {
		var letter = this.getActiveRune().letter;
		letter.selectedPoints.push(data);
		letter.currentIndex = data;
	}
}
;
// Base




// Controllers




function RuneEditor(options) {

	// Setup workspace

	var app = this;
	app.workspace = new WorkSpace(options);
	app.addTablet();

}

RuneEditor.prototype = {
	constructor: RuneEditor,
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
	canvasId : 'rune-view'
});


// Events
setupEvents();

