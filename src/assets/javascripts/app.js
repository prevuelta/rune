'use strict';

// Rune
var util = require('./global/util');
var Events = require('./global/Events');
var WorkSpaceController = require('./workspace/WorkspaceController');
var CanvasController = require('./canvas/CanvasController');
var DataController = require('./data/DataController');

function App() {

	var app = this;

	// Setup workspace
	app.data = new DataController(util.checkLocal("runeData"));
	app.workspace = new WorkSpaceController(app);
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
		this.data.save();
	}
}


var app = new App();
