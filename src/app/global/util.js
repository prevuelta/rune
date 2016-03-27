
var paper = require('paper');

/* ========== Utilities ========== */

module.exports = {
	getIndices: function(points, gridPoints) {
		return points.map(function(point) {
			return gridPoints.indexOf(point);
		});
	},
	object: function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    },
    checkLocal: function(ref) {
    	return (localStorage[ref] && typeof localStorage[ref] === 'string') ? JSON.parse(localStorage[ref]) : false;
    },
    dispatchRuneEvent: function(name, data) {
		var runeEvent = new CustomEvent('runeEvent', { 'detail' : { 'event' : name, 'data' :  data }});
		document.dispatchEvent(runeEvent);
	},
	trig: {
		getMid : function(p1, p2) {
			return [(p1.x + p2.x) / 2, (p1.y + p2.y) / 2];
		},
		getDistance : function(p1, p2) {
			return this.getSize(p1.y - p2.y, p1.x - p2.x, null);
		},
		getSize : function (adj, opp, hyp) {
				if(adj & hyp) {
					return Math.sqrt(hyp*hyp - adj*adj);
				} else if(adj & opp) {
					return Math.sqrt(opp*opp + adj*adj);
				} else if(opp & hyp) {
					return Math.sqrt(hyp*hyp - opp*opp);
				}
		},
		getAngle: function(p1, p2) {
			// var adj = that.xRes;

			var adj = p1.getDistance(new paper.Point(p2.x, p1.y));
			var hyp = p1.getDistance(p2);

			// cos() = a / h;

			return (Math.PI / 2) - Math.acos( adj / hyp );

		},
		radToDeg: function(radians) {
			return radians * (180 / Math.PI)
		},
		degToRad: function(degrees) {
			return degrees / (180 / Math.PI);
		}
	}
};

/* ========== Paper prototypes ========== */

paper.Point.prototype.getMid = function(p2) {
	return new paper.Point((this.x + p2.x) / 2, (this.y + p2.y) / 2);
};