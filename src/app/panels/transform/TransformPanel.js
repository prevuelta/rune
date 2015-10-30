function TransformPanel () {

	console.log("Transform!");

	this.title = "Transform";

	var transform = this;

	this.transforms = [
		{
			id : "weight",
			title : "Fix weight",
			action : function(e) {
				e.preventDefault();

				transform.weight(
					app.tablet.activeRune.letter.selectedPoints,
					app.tablet.activeRune.data.gridOptions.res * 2
				);

			}
		}
	];

	this.transforms.forEach(function(transform) {
		console.log("What?");
		console.log(transform);
		$('#rune-panels').on('click', '[data-transform="' + transform.id + '"]', transform.action);
	});

}

TransformPanel.prototype = {
	constructor: TransformPanel
}

module.exports = TransformPanel;