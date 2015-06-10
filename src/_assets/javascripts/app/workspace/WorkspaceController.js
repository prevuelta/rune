//= require_tree .

function WorkSpace(options) {

	this.options = options;

	// Load data

	this.displayActionBar();



}

WorkSpace.prototype = {
	constructor: WorkSpace,
	displayTablet : function(data) {

		addView($(this.options.tabletContainer), 'toolbar-tablets', { runes : data.runes }, function() {
			$('.rune').on('click', function() {
				var index = $(this).data('rune-index');
				console.log(index);
				app.tablet.setActiveRune(index);
			});
		});
	},
	displayToolbar : function() {

	},
	toggleGrid: function() {
		this.runeView.showGrid = !app.workspace.runeView.showGrid;
		this.runeView.toggleGrid(app.workspace.runeView.showGrid);
	},
	setActiveRune : function(runeModel) {

		this.runeView = new RuneView(runeModel);

		// Populate properties
		var workspace = this;

	},

	displayActionBar : function() {

		var actionBar = new ActionBar();

		addView($(this.options.actionbarContainer), 'toolbar-actions', { "actions" : actionBar.actions}, function() {
			actionBar.init();
		});

	},
	drawLetter : function(letterModel) {
		this.runeView.drawLetter(letterModel);
	},
	updateProperties : function(model) {

	}
}