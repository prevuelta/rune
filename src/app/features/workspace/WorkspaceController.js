var ActionBar = require('./actionbar/ActionBarController.jsx');
var PanelController = require('./../panels/PanelController.jsx');

function WorkSpaceController(app) {

	this.actionBar = new ActionBar(app);
	this.panels = new PanelController(app);
}

WorkSpaceController.prototype = {
	constructor: WorkSpaceController,
}

module.exports = WorkSpaceController;