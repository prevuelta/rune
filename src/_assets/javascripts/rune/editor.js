// Base
//= require rune/const
//= require rune/util

// Controllers
//= require rune/workspaceController
//= require rune/tabletModelController

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



