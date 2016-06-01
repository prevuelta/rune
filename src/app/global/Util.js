/* ========== Utilities ========== */

class Util {
	static getIndices (points, gridPoints) {
		return points.map(function(point) {
			return gridPoints.indexOf(point);
		});
	}

	static object (o) {
        function F() {}
        F.prototype = o;
        return new F();
    }

    static getLocalData (ref) {
    	return (localStorage[ref] && typeof localStorage[ref] === 'string') ? JSON.parse(localStorage[ref]) : null;
    }
}

module.exports = Util;