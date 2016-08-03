/* ========== Utilities ========== */

module.exports = {
    getIndices: (points, gridPoints) => {
    	return points.map(function(point) {
    		return gridPoints.indexOf(point);
    	});
    },
    object: (o) => {
        function F() {}
        F.prototype = o;
        return new F();
    },
    getLocalData: (ref) => {
    	return (localStorage[ref] && typeof localStorage[ref] === 'string') ? JSON.parse(localStorage[ref]) : null;
    },
    debounce: (func, wait, immediate) => {
        let timeout;
        return function () {
            let context = this;
            let args = arguments;
            let later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}