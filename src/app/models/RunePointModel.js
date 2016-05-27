/* ========== Point Model ========== */

class BasePoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class RuneArc {
    constructor (obj) {

        // if (typeof obj === 'object') {
            this.size = obj && obj.size || 2;
            this.center = obj && new RunePoint(null, obj.center) || new RunePoint(null, 1,1);
            this.endPoint = obj && new RunePoint(null, obj.endPoint) || new RunePoint(null, 0, 0);
            this.direction = obj && obj.direction || false;
        // } else {
        //     this.size = 2;
        //     this.center = new RunePoint(null, 1,1);
        //     this.endPoint = new RunePoint(null, 0,0);
        //     this.direction = false;
        // }
    }
}

class RunePoint extends BasePoint {

    constructor(path, x, y) {

        if (path) {
            Object.defineProperty(this, 'path', {
                value: path,
                writable: true,
                configurable: true
            });
            this.path = path;
        }

        if (typeof x === 'object') {
            super(x.x, x.y);
        } else {
             super(x, y);
        }

        this.transforms = x.transforms || [];
        this.transform = x.transform || [0,0];
        this.handleIn = x.handleIn || null;
        this.handleOut = x.handleOut || null;
        this.isCurve = x.isCurve || false;
        this.isSelected = x.isSelected || false;
        this.arcIn = x.arcIn && new RuneArc(x.arcIn) || null;
        this.arcOut = x.arcOut && new RuneArc(x.arcOut) || null;
        // } else {
        //     this.transforms = [];
        //     this.transform = [0,0];
        //     this.handleIn = null;
        //     this.handleOut = null;
        //     this.isCurve = false;
        //     this.isSelected = false
        //     this.arcIn = null;
        //     this.arcOut = null;
        // }
    }

    toggleCurve (isCurve) {
        this.isCurve = !this.isCurve;
    }

    get hasArcIn () {
        return !!this.arcIn;
    }

    get hasArcOut () {
        return !!this.arcOut;
    }

    get hasArc () {
        return this.hasArcIn || this.hasArcOut;
    }

    setArcIn () {
        this.arcIn = this.hasArcIn ? null : new RuneArc();
    }

    setArcOut () {
        this.arcOut = this.hasArcOut ? null : new RuneArc();
    }

    // set handleIn (coords) {
    //     this._handleIn = this.addHandle(coords);
    // }

    // set handleOut (coords) {
    //     this._handleOut = this.addHandle(coords);
    // }

    // get handleIn () {
    //     return this._handleIn;
    // }

    // get handleOut () {
    //     return this._handleOut;100,10
    // }

    // addHandle (coords) {
    //     return new BasePoint(coords[0], coords[1]);
    // }

    render (res) {
        return [
            (this.x * res.x) + (this.transform[0] * res.x),
            (this.y * res.y) + (this.transform[1] * res.y)
        ];
    }

    focusNode () {
        if (this.node) {
            this.node.focus();
        }
    }

    blurNode () {
        if (this.node) {
            this.node.blur();
        }
    }

    setSelected (selected) {
        this.isSelected = selected;
        if (this.node) {
            this.node.setSelected(selected);
        }
    }
}

module.exports = RunePoint;
