'use strict';

// Rune
var util = require('./global/util');
var events = require('./global/events');
var WorkSpaceController = require('./workspace/WorkspaceController');
var CanvasController = require('./canvas/CanvasController');
var DataController = require('./data/DataController');

function App() {

	// Setup workspace
	console.log("What");
	console.log(DataController);
	console.log(CanvasController);

	var app = this;
	app.workspace = new WorkSpaceController();
	app.data = new DataController(util.checkLocal("runeData")); 
	app.canvas = new CanvasController(app.data);

	// Events
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
