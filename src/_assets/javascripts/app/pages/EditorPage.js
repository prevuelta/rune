// Base
//= require_tree ../global/.

// Controllers
//= require app/canvas/CanvasController
//= require app/data/DataController
//= require app/workspace/WorkspaceController


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



