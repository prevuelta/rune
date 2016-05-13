/* ========== Point Model ========== */

class BasePoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class RuneArc {
    constructor (obj) {
        if (typeof x === 'object') {
            this.size = obj.size || 0;
            this.center = obj.center || [0, 0];
            this.endPoint = new RunePoint(obj.endPoint) || new RunePoint(0, 0);
            this.direction = obj.direction || false;
        } else {
            this.size = 0;
            this.center = [0,0];
            this.endPoint = new RunePoint(0,0);
            this.direction = false;
        }
    }
}

class RunePoint extends BasePoint {

    constructor(x, y) {
        if (typeof x === 'object') {
            super(x.x, x.y);;
            this.transforms = x.transforms || [];
            this.transform = x.transform || [0,0];
            this.handle1 = x.handle1 || null;
            this.handle2 = x.handle2 || null;
            this.isCurve = x.isCurve || false;
            this.isSelected = x.isSelected || false;
            this.arcIn = x.arcIn && new RuneArc(x.arcIn) || null;
            this.arcOut = x.arcOut && new RuneArc(x.arcOut) || null;
        } else {
            super(x, y);
            this.transforms = [];
            this.transform = [0,0];
            this.handle1 = null;
            this.handle2 = null;
            this.isCurve = false;
            this.isSelected = false
            this.arcIn = null;
            this.arcOut = null;
        }
    }

    get hasArcIn () {
        return !!this.arcIn;
    }

    get hasArcOut () {
        return !!this.arcIn;
    }

    get hasArc () {
        return this.hasArcIn || this.hasArcOut;
    }

    setArcIn () {
        console.log("setting arc in");
        this.arcIn = this.hasArcIn ? null : new RuneArc();
    }

    setArcOut () {
        this.arcOut = this.hasArcOut ? null : new RuneArc();
    }

    addHandles () {
        this.handles = [new BasePoint(), new BasePoint()];
    }

    render (res) {
        return [
            this.x * res.x,
            this.y * res.y
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
