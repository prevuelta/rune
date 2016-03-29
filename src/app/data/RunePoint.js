/* ========== Point Model ========== */

class BasePoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getActual () {

    }

    getRelative () {

    }
}

class RunePoint extends BasePoint {

    constructor(x, y) {
        super(x, y);
        this.transforms = [];
        this.handles = [];
    }

    addHandles () {
        this.handles = [new BasePoint(), new BasePoint()];
    }

    render (unit) {
        return [this.x * unit  + (unit / 2), this.y * unit  + (unit / 2)]; 
    }

    get isCurve () {
        return 'maybe...';
    }
}

moudle.exports = RunePoint;
