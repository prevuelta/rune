

/* ========== Letter ========== */

function LetterView() {

	this.renderedPoints = [];
	
}


LetterView.prototype = {
	constructor: LetterView,
	computePoints : function(letter, grid) {

		// console.log(gridPoints);

		var renderTemp = [];

		$.each(letter.points, function(idx, point) {
			console.log("Pointypoiunt: "+point[0]);
			var renderedPoint = grid.renderPoint(point[0]);

			// // Add Transforms
			// if(point[2]){

			// 	renderedPoint[0] += point[2]
			// 	renderedPoint[1] += point[3]
				
				console.log(renderedPoint);
			// }
			renderTemp.push( renderedPoint );
		});

		this.renderedPoints = renderTemp;

	},
	draw : function(selected) {

		console.log("Selected");
		console.log(selected);

		var letter = this;
		
		var letterPath = new paper.Path();

		letterPath.strokeColor = 'black';

		$.each(letter.renderedPoints, function(idx, point) {

			letter.createLetterPoint(point, idx, selected.indexOf(idx) > -1);

			if(idx) {
				letterPath.lineTo(point);
			} else {
				letterPath.moveTo(point);
			}

		});
	},
	createLetterPoint: function(point, value, selected) {

		console.log("Point" + point);

		var path = paper.Path.Rectangle([point[0]-5, point[1]-5], 10);

		path.strokeColor = 'red';
		path.fillColor = 'white';

		path.value = value;

		path.selected = selected || false;
		
		path.onMouseEnter = function(e) {
			// this.fillColor = this.selected ? 'red' : 'orange';
		}

		path.onMouseLeave = function(e) {
			// this.fillColor = 'white';
		}

		path.onMouseDown = function(e) {

			this.selected = !this.selected;

			util.dispatchRuneEvent('selectPoint', [this.selected, e.target.value] );

		}
		path.onKeyDown = function(e) {
			console.log(e.key);
			switch(e.key) {
				case 'delete' :
					console.log('de');
				break;
			}
		}
	}
}
