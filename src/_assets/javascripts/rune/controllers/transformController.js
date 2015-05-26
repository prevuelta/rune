function Transform () {

	console.log("Transform!");

	this.title = "Transform";

	var transform = this;

	this.transforms = [
		{
			id : "weight",
			title : "Fix weight",
			action : function(e) {
				e.preventDefault();

				transform.weight(app.tablet.getActiveRune().letter.selectedPoints, app.tablet.getActiveRune().gridOptions.res);

			}
		}
	];

	this.transforms.forEach(function(transform) {
		console.log("What?");
		console.log(transform);
		$('#rune-panels').on('click', '[data-transform="' + transform.id + '"]', transform.action);
	});

}

Transform.prototype = {
	constructor: Transform,
	weight : function(points, res) {
		
		points = points.map(function(entry) {
			return new paper.Point(app.workspace.runeView.letter.renderedPoints[entry]);
		});


		var showConstructors = true;

		// Draw it all
		// var testPath = new paper.Path();

		// testPath.strokeColor = 'black';

		// testPath.moveTo(points[0]);
		// testPath.lineTo(points[2]);

		// var circle = new paper.Path.Circle(midPoint, res / 2);
		// circle.strokeColor = 'black'

		//testPath.lineTo(otherPoint);

		//testPath.lineTo(points[2]);

		/* ------ Get initial vars ------ */

		console.log(points[0]);

		var midPoint = points[0].getMid(points[2]);

		/* ------ First triangulation ------ */

		// Hypothesis to midpoint
		var t1_hyp = points[2].getDistance(midPoint);

		// Adj 
		var t1_adj = res / 2;

		var t1_phi = 90 - trigUtil.radToDeg(Math.acos( t1_adj / t1_hyp));

		// var vec = new paper.Point(points[2]);
		var vec = new paper.Point();

		vec.angle = (90 - trigUtil.radToDeg( trigUtil.getAngle(points[0], points[2]))) - t1_phi;

		var side = trigUtil.getSize(null, t1_adj, t1_hyp);

		var normalizedVector = vec.normalize();

		var finalVector = new paper.Point();

		finalVector.length = normalizedVector.length * side;

		var tangentPoint = points[2].subtract(finalVector);
	 
		/* ------ Second triangulation ------ */

		var otherPoint = new paper.Point(points[0].x, points[2].y);

		var t2_adj = otherPoint.getDistance(points[2]);

		var t2_hyp = t2_adj / Math.cos( trigUtil.degToRad(vec.angle) );

		// New length for vector (reflects distance to new point[3]
		finalVector.length = Math.abs(t2_hyp) - finalVector.length;

		var newPoint3 = newPoint.subtract(newVector);

		var finalMeasure = points[0].getDistance(newPoint3);

		points[3].y = points[0].y + finalMeasure;
		points[1].y = points[2].y - finalMeasure;

	},
	randomise : function(points) {
		
	}
}