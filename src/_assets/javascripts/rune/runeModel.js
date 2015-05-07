
/* ========== Rune model ========== */

function RuneModelController(model) {
	this.model = model;
}

RuneModelController.prototype = {
	addPoint: function(gridRef) {
		console.log("Addingpoint " + gridRef);
		var letterController = new LetterModelController(this.model.letter);
		letterController.addPoint(gridRef);
	}
}

function RuneModel(gridOptions) {

	this.gridOptions = {
		xUnits: 10,
		yUnits: 10,
		res: 30,
		padding: 20
	};

	$.extend(this.gridOptions, gridOptions);

	this.letter = new LetterModel();

	this.distortions = [];

	this.showGrid = true;

}


/* ========== Letter ========== */

function LetterModel() {

	this.renderedPoints = [];

	this.gridPoints = [];

	this.distortions = [];

}

function LetterModelController(model){
	this.model = model;
}

LetterModelController.prototype = {
	clearPoints: function() {
		this.model.gridPoints = [];
	},
	addPoint :function(point) {
		this.model.gridPoints.push(point);
	},
	// preRender : function(grid) {

	// 	var renderTemp = [];

	// 	$.each(this.gridPoints, function(idx, point) {
	// 		renderTemp.push(grid.points[point]);
	// 	});


	// 	var indices = util.getIndices(this.gridPoints, grid.points);

	// 	var punits = indices.map(function(idx) {
	// 		return renderTemp[idx];
	// 	});

	// 	this.actualPoints = renderTemp;


	// },
	distort : function(type) {
		switch(type) {
			case "random" : 
				this.renderedPoints.forEach(function(idx, element) {
					// Insert randomness here
				});
			break;
			default:
			break;
		}
	},
	changeWeight : function(points, type) {

		var showConstructors = true;

		// Draw it all
		// var testPath = new paper.Path();

		// testPath.strokeColor = 'black';

		// testPath.moveTo(points[0]);
		// testPath.lineTo(points[2]);

		// var circle = new paper.Path.Circle(midPoint, that.xRes / 2);
		// circle.strokeColor = 'black'

		//testPath.lineTo(otherPoint);

		//testPath.lineTo(points[2]);

		/* ------ Get initial vars ------ */

		var midPoint = points[0].getMid(points[2]);

		/* ------ First triangulation ------ */

		// Hypothesis to midpoint
		var t1_hyp = points[2].getDistance(midPoint);

		// Adj 
		var t1_adj = that.xRes / 2;

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

		var t2_hyp = t2_adj / Math.cos( degRad(vec.angle) );

		// New length for vector (reflects distance to new point[3]
		finalVector.length = Math.abs(t2_hyp) - finalVector.length;

		var newPoint3 = newPoint.subtract(newVector);

		var finalMeasure = points[0].getDistance(newPoint3);

		points[3].y = points[0].y + finalMeasure;
		points[1].y = points[2].y - finalMeasure;

	}
}