const SILVER_RATIO = Math.sqrt(2);
const GOLDEN_RATIO =  (1 + Math.sqrt(5)) / 2;
const CANVAS_SIZE = 360;
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
				app.data.deleteSelected();
				app.workspace.drawRune(app.data.activeRune);
				
				util.dispatchRuneEvent('deselectAll');

			break;
		}
	});

}

var eventHandlers = {
	addPoint : function(data) {
		app.data.addRunePoint(data);
		app.workspace.drawRune(app.data.activeRune);
	},
	selectPoint: function(data) {
		if(data[0]) {
			app.data.selectPoint(data[1]);
		} else {
			app.data.activeRune.selectedPoints = _.without(app.data.activeRune.selectedPoints, data[1]);
		}
		// console.log(app.tablet.selectedPoints);
	},
	clearGridPoints : function(e) {
		app.data.clearRune();
		// app.workspace.runeView.clearLetterView();
	},
	toggleGrid: function(e) {
		app.workspace.toggleGrid();
	},
	deselectAll: function(e) {
		app.data.activeRune.selectedPoints = [];
	}
}





;
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


/* ========== Grid view ========== */


function GridView(options) {

	this.res = options.res;
	this.units = options.units;
	this.padding = options.padding;

	this.points = [];

	for(var row = 0; row < this.units; row++) {
		
		this.points[row] = [];

		for(var col = 0; col < this.units; col++) {
			
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
	renderPoint: function(point){
		return [point[0] * this.res + this.padding, point[1] * this.res + this.padding];
	},
	createGridPoint : function(point, value) {

		var path = paper.Path.Circle(point, this.res / 2);

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
/* ========== Tablet ========== */


function TabletView() {

	this.points = [];
	
}


TabletView.prototype = {
	constructor: TabletView,
	draw : function(letterModel, grid) {

		// var letter = this;
		
		// var letterPath = new paper.Path();

		// letterPath.strokeColor = 'black';

		// letter.letterPoints = [];

		// $.each(letterModel.points, function(idx, point) {

		// 	var letterPoint = letter.createLetterPoint(grid.renderPoint(point), idx, letterModel.selectedPoints.indexOf(idx) > -1, letterModel.transforms[idx] || null);

		// 	letter.points.push(letterPoint);

		// 	if(idx) {
		// 		letterPath.lineTo(letterPoint.point);
		// 	} else {
		// 		letterPath.moveTo(letterPoint.point);
		// 	}

		// });
	},
	createLetterPoint: function(point, value, selected, transform) {

		// var paperPoint = new paper.Point(point);

		// if(transform) {
		// 	console.log(transform);
		// 	paperPoint.add((function() { var point = new paper.Point(); point.angle = transform[0]; point.length = transform[1]; return point;})());
		// }

		// var path = new paper.Path.Rectangle(paperPoint.subtract([5, 5]), 10);
		

		// console.log(path);

		// path.strokeColor = 'red';
		// path.fillColor = 'white';

		// path.value = value;

		// path.selected = selected || false;
		
		// path.onMouseEnter = function(e) {
		// 	// this.fillColor = this.selected ? 'red' : 'orange';
		// }

		// path.onMouseLeave = function(e) {
		// 	// this.fillColor = 'white';
		// }

		// path.onMouseDown = function(e) {

		// 	this.selected = !this.selected;

		// 	util.dispatchRuneEvent('selectPoint', [this.selected, e.target.value] );

		// }

		// path.onKeyDown = function(e) {
		// 	console.log(e.key);
		// 	switch(e.key) {
		// 		case 'delete' :
		// 			console.log('de');
		// 		break;
		// 	}
		// }

		// return {point:paperPoint, path:path};
	}
}
;


/* ========== Render Tablet ========== */


function CanvasController (tabletModel) {

	// Canvas

	this.canvas = document.getElementById('tablet');

	paper.setup(this.canvas).install(window);

	this.layers = {
		"grid" : new paper.Layer()
	};

	// Setup grid

	this.setupGrid(tabletModel.tablet.gridOptions);

	// this.drawLetter(runeModel.letter);

	this.redraw();

	this.showGrid = true;

}

CanvasController.prototype = {
	constructor: CanvasController,
	toggleGrid: function() {
		this.runeView.showGrid = !app.workspace.runeView.showGrid;
		this.runeView.toggleGrid(app.workspace.runeView.showGrid);
	},	
	drawRune : function(data) {
		this.runeView.draw(data);
	},

	setActiveRune : function(runeModel) {

		this.runeView = new RuneView(runeModel);

	},
	clearLetterView : function() {
		this.layers.letter.removeChildren();
		this.redraw();
	},
	drawLetter : function(letter) {

		// this.clearLetterView();

		// this.layers.letter.activate();

		// this.letter.draw(letter, this.grid);

		// this.redraw();

	},
	setupGrid : function(gridOptions) {
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

;


/* ========== Data ========== */


function DataController(tabletModel) {

	this.tablet = tabletModel || new TabletData(null);
	this.activeRune = this.tablet.runes[0];

}

DataController.prototype = {
	constructor: DataController,
	save : function() {
		localStorage["runeData"] = JSON.stringify(app.data);
	},
	setActiveRune : function(i) {
		this.activeRune = this.tablet.runes[i];
	},
	addRune : function() {
		this.tablet.runes.push(new RuneData(null));
	},
	addRunePoint: function(gridRef) {

		var rune = this.activeRune;

		rune.points.splice(rune.currentIndex, 0, gridRef);
		rune.currentIndex++;
		util.dispatchRuneEvent('deselectAll');

	},
	clearRune: function() {
		this.activeRune.points = [];
	},

	updateGrid : function() {
		// var rune = this.getActiveRune();
		// rune.letter.gridPoints.forEach(function(entry, i) {
			
		// });
	},
	deleteSelected : function() {
		this.activeRune.gridPoints = this.activeRune.gridPoints.filter(function(entry, idx) {
			return this.activeRune.selectedPoints.indexOf(idx) == -1; 
		});
	},
	selectPoint: function(data) {
		console.log(data);
		this.activeRune.selectedPoints.push(data);
		this.activeRune.currentIndex = data;
		// this.activeRune.letter.push(data);
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

function WorkSpace() {

	this.addActionBar();

}

WorkSpace.prototype = {
	constructor: WorkSpace,
	addLayers : function(data) {
		// addView($(this.options.tabletContainer), 'toolbar-tablets', { runes : data.runes }, function() {
		// 	$('.rune').on('click', function() {
		// 		var index = $(this).data('rune-index');
		// 		console.log(index);
		// 		app.tablet.setActiveRune(index);
		// 	});
		// });
	},
	addActionBar : function() {

		var actionBar = new ActionBar();

		addView($('header#main-header'), 'ToolsView', { "actions" : actionBar.actions}, function() {
			actionBar.init();
		});

	}
}
;
// Base


// Controllers





function App() {

	// Setup workspace

	var app = this;
	app.workspace = new WorkSpace();
	app.data = new DataController(util.checkLocal("runeData")); 
	app.canvas = new CanvasController(app.data);

	// Events
	setupEvents();

}

App.prototype = {
	constructor: App,
	setup: function() {

	},
	save : function() {
		this.tablet.save();
	}
}



;

var app = new App();

