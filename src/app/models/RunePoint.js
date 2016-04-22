/* ========== Point Model ========== */

class BasePoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class RunePoint extends BasePoint {

    constructor(x, y) {
        if (typeof x === 'object') {
            super(x.x, x.y);
            this.transforms = x.transforms || [];
            this.handles = x.handles || [];
        } else {
            super(x, y);
            this.transforms = [];
            this.handles = [];
        }
    }

    addHandles () {
        this.handles = [new BasePoint(), new BasePoint()];
    }

    render (unit) {
        return [
            this.x * unit, 
            this.y * unit
        ]; 
    }

    get isCurve () {
        return 'maybe...';
    }
}

module.exports = RunePoint;
