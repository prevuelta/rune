var ActionBar = require('./ActionBarController.jsx');
var PanelController = require('./../panels/PanelController.jsx');
var React = require('React');

function WorkSpaceController(app) {

	this.actionBar = new ActionBar(app);
	this.panels = new PanelController(app.data);
}

WorkSpaceController.prototype = {
	constructor: WorkSpaceController,
}

module.exports = WorkSpaceController;