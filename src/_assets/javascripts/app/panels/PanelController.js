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

		updateProperties : function(model) {

	}