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


				// Hypothesis to midpoint
// 				var t1_hyp = points[2].getDistance(midPoint);
// 				var t1_adj = that.xRes / 2;

// 				// var theta = 
// 				var t1_phi = 90 - radDeg(Math.acos( t1_adj / t1_hyp));

// 				console.log("Phi " + t1_phi);

// 				// New vector
// 				var vec = new paper.Point(points[2]);
// 				vec.angle = (90 - radDeg( getAngle(points[0], points[2]))) - t1_phi;

// 				var side = getSize(null, t1_adj, t1_hyp);

// 				var newVector = vec.normalize();

// 				console.log("Side" + side);

// 				newVector.length = newVector.length * side;

// 				var newPoint = points[2].subtract(newVector);

// 				console.log(newPoint);

// 				// testPath.lineTo(newPoint);

// // 
// 				/* ------ Second triangulation ------ */

// 				var otherPoint = new paper.Point(points[0].x, points[2].y);

// 				console.log(otherPoint + " " + points[2]);

// 				testPath.lineTo(otherPoint);

// 				testPath.lineTo(points[2]);

// 				var t2_adj = otherPoint.getDistance(points[2]);

// 				console.log("adj" + t2_adj);

// 				console.log("Vec angle" + vec.angle);

// 				var t2_hyp = t2_adj / Math.cos( degRad(vec.angle) );

// 				console.log("Hyp: " + t2_hyp + "  " +  newVector.length);

// 				newVector.length = Math.abs(t2_hyp) - newVector.length;

// 				var newnewpoint = newPoint.subtract(newVector);

// 				testPath.lineTo(newnewpoint);

// 				var finalMeasure = points[0].getDistance(newnewpoint);

// 				points[3].y = points[0].y + finalMeasure;
// 				points[1].y = points[2].y - finalMeasure;

		// var showConstructors = true;

		// Draw it all
		// var testPath = new paper.Path();

		// testPath.strokeColor = 'orange';

		// testPath.moveTo(points[0]);
		// testPath.lineTo(points[2]);


		// testPath.lineTo(otherPoint);

		// testPath.lineTo(points[2]);

		/* ------ Get initial vars ------ */

		console.log(points);

		var midPoint = points[0].getMid(points[2]);

		// Show mid circle
		var circle = new paper.Path.Circle(midPoint, res / 2);
		circle.strokeColor = 'black'

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

		console.log("Side" + side);

		var normalizedVector = vec.normalize();

		var finalVector = new paper.Point();

		finalVector.length = side;

		console.log(normalizedVector.length);

		var tangentPoint = points[2].subtract(finalVector);
	 
		/* ------ Second triangulation ------ */


		var otherPoint = new paper.Point(points[0].x, points[2].y);

		// Distance between points[2] and 0 on y axis
		var t2_adj = otherPoint.getDistance(points[2]);

		var t2_hyp = t2_adj / Math.cos( trigUtil.degToRad(vec.angle) );

		// New length for vector (reflects distance to new point[3]
		finalVector.length = Math.abs(t2_hyp) - finalVector.length;

		// var newPoint = points[2].subtract(finalVector.length);

		var newPoint3 = tangentPoint.subtract(normalizedVector);
		// var newPoint3 = otherPoint.subtract(finalVector);

		var finalMeasure = points[0].getDistance(newPoint3);

		console.log("Distance" + points[0].getDistance(newPoint3));

		points[3].y = points[0].y + finalMeasure;
		points[1].y = points[2].y - finalMeasure;

// 				newVector.length = Math.abs(t2_hyp) - newVector.length;

// 				var newnewpoint = newPoint.subtract(newVector);

// 				testPath.lineTo(newnewpoint);

// 				var finalMeasure = points[0].getDistance(newnewpoint);


		var testPath = new paper.Path();

		testPath.strokeColor = 'red';

		// testPath.moveTo(newPoint);
		testPath.moveTo(newPoint3);

		// testPath.moveTo(points[0]);
		// testPath.lineTo(points[1]);
		// testPath.lineTo(points[2]);
		testPath.lineTo(points[3]);

		// Work out vector here?
		console.log(points);

	},
	randomise : function(points) {

	}
}