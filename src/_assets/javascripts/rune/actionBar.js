function ActionBar() {
	this.actions = [
		{
			id : "save",
			title : "Save tablet",
			action : function(e) {
				e.preventDefault();
				console.log("Saved");
			}
		},
		{
			id : "clear",
			title : "Clear",
			action: function(e) {
				e.preventDefault();
				console.log("done worked");
				var clearPoints = new CustomEvent("clearGridPoints");
				document.dispatchEvent(clearPoints);
			}
		},
		{
			id: "grid",
			title: "Toggle Grid",
			action: function(e) {
				e.preventDefault();
				var clearPoints = new CustomEvent("toggleGrid");
				document.dispatchEvent(clearPoints);
			}
		}
	]
}

ActionBar.prototype.init = function(container) {
	for (var i=0; i < this.actions.length; i++) {
		var action = this.actions[i];
		console.log(action.action);
		$('[data-type="' + action.id + '"]').on('click', action.action );
	}
};