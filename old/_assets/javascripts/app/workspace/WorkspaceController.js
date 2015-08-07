//= require_tree .

function WorkSpace() {

	this.addActionBar();

}

WorkSpace.prototype = {
	constructor: WorkSpace,
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

		var actionBar = new ActionBar();

		addView($('header#main-header'), 'ToolsView', { "actions" : actionBar.actions}, function() {
			actionBar.init();
		});

	}
}