function ActionBar() {

	this.actions = [
		{
			id : "save",
			title : "Save tablet",
			action : function(e) {
				e.preventDefault();

				app.saveTablet();

			}
		},
		{
			id : "clear",
			title : "Clear",
			action: function(e) {
				e.preventDefault();
				var clearPoints = new CustomEvent("clearGridPoints");
				document.dispatchEvent(clearPoints);
			}
		},
		{
			id: "grid",
			title: "Toggle Grid",
			action: function(e) {
				e.preventDefault();
				var toggleGrid = new CustomEvent("toggleGrid");
				document.dispatchEvent(toggleGrid);
			}
		},
		{
			id: "rune",
			title: "Add rune",
			action: function(e) {
				e.preventDefault();
				app.workspace.tablet.addRune();
			}
		}
	]
}

ActionBar.prototype.init = function(container) {
	for (var i=0; i < this.actions.length; i++) {
		var action = this.actions[i];
		$('[data-type="' + action.id + '"]').on('click', action.action);
	}
};