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
				app.workspace.tablet.addRune();
			}
		},
		{
			id: "svg",
			title: "Export as SVG",
			action: function(e) {
				e.preventDefault();
				var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}));
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

		console.log("Letter");
		console.log(letter);

		this.letter.computePoints(letter.gridPoints, this.grid);

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
	computePoints : function(gridPoints, grid) {

		console.log(gridPoints);

		var renderTemp = [];

		$.each(gridPoints, function(idx, point) {
			var renderedPoint = grid.renderPoint(point);
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
		this.data.runes.push(new RuneModel());
	},
	delRune : function() {

	},
	addLetterPoint: function(gridRef) {
		this.getActiveRune().letter.gridPoints.push(gridRef);
	},
	clearLetter: function() {
		this.getActiveRune().letter.gridPoints = [];
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
		letter.gridPoints.push(letter.gridPoints.pop(data));
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

	this.gridPoints = [];

	this.distortions = [];

	this.selectedPoints = [];

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
		app.workspace.drawLetter(app.tablet.getActiveRune().letter);
	}
}





;



var app = new RuneEditor({
	toolbarContainer: '',
	actionbarContainer: 'header#main-header',
	tabletContainer: '#rune-tablet',
	canvasId : 'rune-grid'
});


// Events
setupEvents();

