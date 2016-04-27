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
            this.handle1 = x.handle1 || null;
            this.handle2 = x.handle2 || null;
            this.isCurve = x.isCurve || false;
            this.isSelected = x.isSelected || false;
        } else {
            super(x, y);
            this.transforms = [];
            this.handle1 = null;
            this.handle2 = null;
            this.isCurve = false;
            this.isSelected = false
        }
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
