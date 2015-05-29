// Base
//= require rune/global/const
//= require rune/global/util
//= require rune/global/events

// Controllers
//= require rune/controllers/workspaceController
//= require rune/controllers/modelController


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



