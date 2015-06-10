// Base
//= require app/global/const
//= require app/global/util
//= require app/global/events

// Controllers
//= require app/data/DataController
//= require app/workspace/WorkspaceController


function App(options) {

	// Setup workspace

	var app = this;
	app.workspace = new WorkSpace(options);
	app.addTablet();

}

App.prototype = {
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



