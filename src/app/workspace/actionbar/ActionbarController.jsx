var React = require('React');
var util = require('../../global/util.js');

var paper = require('paper');

function ActionBar(app) {

	var actionBar = this;
	actionBar.app = app;

	this.actions = [
		{
			id : "save",
			title : "Save",
			action : function(e) {
				e.preventDefault();
				// debugger;
				actionBar.app.data.save();

			}
		},
		{
			id : "clear",
			title : "Clear",
			action: function(e) {
				e.preventDefault();
				util.dispatchRuneEvent("clearGridPoints");
			}
		},
		{
			id: "grid",
			title: "Preview",
			action: function(e) {
				e.preventDefault();
				util.dispatchRuneEvent("preview");
			}
		},
		{
			id: "rune",
			title: "Add rune",
			action: function(e) {
				e.preventDefault();
				app.tablet.addRune();
			}
		},
		{
			id: "svg",
			title: "Export as SVG",
			action: function(e) {
				e.preventDefault();
                actionBar.app.canvas.displayMode = 'preview';
				var svgString = paper.project.exportSVG({asString:true});
				var url = "data:image/svg+xml;utf8," + encodeURIComponent(svgString);
				var link = document.createElement("a");
				link.download = 'rune_export.svg';
				link.href = url;
				link.click();
                actionBar.app.canvas.displayMode = 'working';
			}
		}
	];
	this.render();
	this.addEvents();
}

ActionBar.prototype.addEvents = function(container) {
	for (var i=0; i < this.actions.length; i++) {
		var action = this.actions[i];
		document.querySelectorAll('[data-action="' + action.id + '"]')[0].onclick = action.action;
	}
};

ActionBar.prototype.render = function() {
	console.log("this is working");

	var actions = this.actions;

	var ActionBarComponent = React.createClass({
	    render: function() {
	        return (
				<ul>
					{
						this.props.actions.map(function(action, i) {
							return <li><a className="action" data-action={ action.id }>{ action.title }</a></li>;
						})
					}
				</ul>
	        );
	    }
	});

	React.render(
	    <ActionBarComponent actions={actions} />,
	    document.getElementById('rune-actionbar')
	);
};

module.exports = ActionBar;