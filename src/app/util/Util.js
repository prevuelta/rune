module.exports = {
    getIndices (points, gridPoints) {
        return points.map(function(point) {
            return gridPoints.indexOf(point);
        });
    },
    object (o) {
        function F() {}
        F.prototype = o;
        return new F();
    },
    getLocalData (ref) {
        return (localStorage[ref] && typeof localStorage[ref] === 'string') ? JSON.parse(localStorage[ref]) : null;
    },
    guid () {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    },
    debounce (func, wait, immediate) {
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