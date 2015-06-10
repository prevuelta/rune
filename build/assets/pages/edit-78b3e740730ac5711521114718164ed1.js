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

/* ========== Rune model ========== */


function RuneModel(gridOptions) {

	var units = 10;

	this.gridOptions = {
		units: units,
		res: CANVAS_SIZE / units,
		padding: 20
	};

	if(gridOptions != null){
		$.extend(this.gridOptions, gridOptions);
	}

	this.letter = new LetterModel();

	this.showGrid = true;

	this.renderedSVG = '';

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


/* ========== Data ========== */


function DataController(tabletModel) {

	this.data = tabletModel || this.dataModel();

	this.activeRuneIndex = 0;

}

DataController.prototype = {
	constructor: DataController,
	save : function() {
		localStorage["runeData"] = JSON.stringify(app.data);
	},
	dataModel : function() {
		return {
			runes : [
				new RuneModel(null, this.data.runes.length)
			]
		};
	},
	setActiveRune : function(i) {
		this.activeRune = this.data.runes[i];
	},
	addRune : function() {
		this.data.runes.push(new RuneModel(null));
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
		this.activeRune.letter.points = [];
	},

	updateGrid : function() {
		// var rune = this.getActiveRune();
		// rune.letter.gridPoints.forEach(function(entry, i) {
			
		// });
	},
	deleteSelected : function() {
		var letter = this.activeRune.letter;
		letter.gridPoints = letter.gridPoints.filter(function(entry, idx) {
			return letter.selectedPoints.indexOf(idx) == -1; 
		});
	},
	selectPoint: function(data) {
		var letter = this.activeRune.letter;
		letter.selectedPoints.push(data);
		letter.currentIndex = data;
		this.activeRune.letter.push(data);
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

		addView($(this.options.actionbarContainer), 'toolbar-actions', { "actions" : actionBar.actions}, function() {
			actionBar.init();
		});

	}
}
;
// Base


// Controllers




function App(options) {

	// Setup workspace

	var app = this;
	app.workspace = new WorkSpace();
	app.data = new DataController(util.checkLocal("runeData")); 
	app.canvas = new Canvas(options, app.data);

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

var app = new App({
	toolbarContainer: '',
	tabletContainer: '#rune-tablet',
	canvasId : 'rune-view'
});


// Events
setupEvents();

