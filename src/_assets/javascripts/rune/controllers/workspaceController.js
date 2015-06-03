//= require rune/controllers/actionbarController
//= require rune/controllers/transformController

//=require rune/views/RuneView

function WorkSpace(options) {

	this.options = options;

	// Load data

	this.displayActionBar();

	// Canvas

	var canvas = document.getElementById(this.options.canvasId);

	paper.setup(canvas);

	paper.install(window);

	[
		{
			template : 'panel-properties.html',
			data: {
				title: "Properties"
			},
			controller : function() {}
		},
		{
			template : 'panel-transform.html',
			data: {
				title : "Transform",
				res : 0
			},
			controller : Transform
		}
	].forEach(this.loadPanel);

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
	loadPanel : function(options) {

		console.log(options);

		$.get('views/' + options.template, function(template) {

			var ractive = new Ractive({
				el: '#rune-panels',
				template : template,
				data : options.data,
				append : true,
				oncomplete: function() {
					$('.panel').draggable();
					// console.log(options.controller);
					var controller = new options.controller();
				}
			});

			// ractive.observe('gridOptions', function(newValue, oldValue, keyPath) {
			// 	app.tablet.updateGrid(runeModel.gridOptions);
			// 	workspace.runeView.addGrid(runeModel.gridOptions);
			// });

		});
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