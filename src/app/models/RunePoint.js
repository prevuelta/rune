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
        this.isCurve = false;
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
}

module.exports = RunePoint;
