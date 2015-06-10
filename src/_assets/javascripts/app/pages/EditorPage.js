// Base
//= require_tree ../global/.

// Controllers
//= require app/canvas/CanvasController
//= require app/data/DataController
//= require app/workspace/WorkspaceController


function App(options) {

	// Setup workspace

	var app = this;
	app.workspace = new WorkSpace();
	app.data = new DataController(util.checkLocal("runeData")); 
	app.canvas = new CanvasController(options, app.data);

}

App.prototype = {
	constructor: App,
	setup: function() {

	},
	save : function() {
		this.tablet.save();
	}
}



