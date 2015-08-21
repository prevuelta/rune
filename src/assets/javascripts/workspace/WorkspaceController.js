var ActionBar = require('./ActionBarController.jsx');
var React = require('React');

function WorkSpaceController() {

	this.addActionBar();

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