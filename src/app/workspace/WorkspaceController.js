var ActionBar = require('./ActionBarController.jsx');
var PanelController = require('./panels/PanelController.jsx');

function WorkSpaceController(app, tablets) {

	this.actionBar = new ActionBar(app);
	this.panels = new PanelController(app, tablets);
}

WorkSpaceController.prototype = {
	constructor: WorkSpaceController,
}

module.exports = WorkSpaceController;