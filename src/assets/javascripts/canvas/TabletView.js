/* ========== Tablet ========== */

function TabletView() {

	this.points = [];
	
}


TabletView.prototype = {
	constructor: TabletView,
	draw : function(letterModel, grid) {

		// var letter = this;
		
		// var letterPath = new paper.Path();

		// letterPath.strokeColor = 'black';

		// letter.letterPoints = [];

		// $.each(letterModel.points, function(idx, point) {

		// 	var letterPoint = letter.createLetterPoint(grid.renderPoint(point), idx, letterModel.selectedPoints.indexOf(idx) > -1, letterModel.transforms[idx] || null);

		// 	letter.points.push(letterPoint);

		// 	if(idx) {
		// 		letterPath.lineTo(letterPoint.point);
		// 	} else {
		// 		letterPath.moveTo(letterPoint.point);
		// 	}

		// });
	},
	createLetterPoint: function(point, value, selected, transform) {

		// var paperPoint = new paper.Point(point);

		// if(transform) {
		// 	console.log(transform);
		// 	paperPoint.add((function() { var point = new paper.Point(); point.angle = transform[0]; point.length = transform[1]; return point;})());
		// }

		// var path = new paper.Path.Rectangle(paperPoint.subtract([5, 5]), 10);
		

		// console.log(path);

		// path.strokeColor = 'red';
		// path.fillColor = 'white';

		// path.value = value;

		// path.selected = selected || false;
		
		// path.onMouseEnter = function(e) {
		// 	// this.fillColor = this.selected ? 'red' : 'orange';
		// }

		// path.onMouseLeave = function(e) {
		// 	// this.fillColor = 'white';
		// }

		// path.onMouseDown = function(e) {

		// 	this.selected = !this.selected;

		// 	util.dispatchRuneEvent('selectPoint', [this.selected, e.target.value] );

		// }

		// path.onKeyDown = function(e) {
		// 	console.log(e.key);
		// 	switch(e.key) {
		// 		case 'delete' :
		// 			console.log('de');
		// 		break;
		// 	}
		// }

		// return {point:paperPoint, path:path};
	}
}

module.exports = TabletView;
