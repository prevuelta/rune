'use strict';

// Rune
var util = require('./global/util');
var Events = require('./global/Events');
var WorkSpaceController = require('./workspace/WorkspaceController');
var CanvasController = require('./canvas/CanvasController');
var DataController = require('./data/DataController');

function App() {

	// Setup workspace

	var app = this;
	app.data = new DataController(util.checkLocal("runeData")); 
	app.workspace = new WorkSpaceController(app.data);
	app.canvas = new CanvasController(app.data);

	// Events
	var events = new Events(app);
	events.init();

}

App.prototype = {
	constructor: App,
	setup: function() {

	},
	save : function() {
		this.tablet.save();
	}
}


var app = new App();
