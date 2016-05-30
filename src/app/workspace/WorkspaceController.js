var ActionBar = require('./ActionBarController.jsx');
var PanelController = require('./panels/PanelController.jsx');

function WorkSpaceController(app) {

	this.actionBar = new ActionBar(app);
	this.panels = new PanelController(app, app.savedTablets);
}

WorkSpaceController.prototype = {
	constructor: WorkSpaceController,
}

module.exports = WorkSpaceController;