var ActionBar = require('./ActionBarController.jsx');
var PanelController = require('./../panels/PanelController.jsx');
var React = require('React');

function WorkSpaceController(tabletModel) {

	this.addActionBar();
	this.panels = new PanelController(tabletModel);

}

WorkSpaceController.prototype = {
	constructor: WorkSpaceController,
	addLayers : function(data) {
		// addView($(this.options.tabletContainer), 'toolbar-tablets', { runes : data.runes }, function() {
		// 	$('.rune').on('click', function() {
		// 		var index = $(this).data('rune-index');
		// 		console.log(index);
		// 		app.tablet.setActiveRune(index);
		// 	});
		// });
	},
	addActionBar : function() {

		this.actionBar = new ActionBar();

		// addView('#main-header', 'ToolsView', { "actions" : actionBar.actions}, function() {
			// actionBar.init();
		// });
	}
}

module.exports = WorkSpaceController;