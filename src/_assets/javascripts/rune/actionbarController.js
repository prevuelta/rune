function ActionBar() {

	this.actions = [
		{
			id : "save",
			title : "Save tablet",
			action : function(e) {
				e.preventDefault();
				console.log("Saved");
				// console.log(tablet);
				var tabletString = JSON.stringify(tablet);

				localStorage["rune"]  = tabletString;

				console.log(tabletString);
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
				var clearPoints = new CustomEvent("toggleGrid");
				document.dispatchEvent(clearPoints);
			}
		},
		{
			id: "rune",
			title: "Add rune",
			action: function(e) {
				e.preventDefault();
				workspace.tablet.addRune();
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