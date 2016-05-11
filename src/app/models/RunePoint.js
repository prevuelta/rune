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
            this.transform = x.transform || [0,0];
            this.handle1 = x.handle1 || null;
            this.handle2 = x.handle2 || null;
            this.isCurve = x.isCurve || false;
            this.isSelected = x.isSelected || false;
            this.isArc = x.isArc || false;
            this.arcCenter = x.arcCenter || null;
            this.arcLength = x.arcLength || null;
        } else {
            super(x, y);
            this.transforms = [];
            this.transform = [0,0];
            this.handle1 = null;
            this.handle2 = null;
            this.isCurve = false;
            this.isSelected = false
            this.isArc = false;
            this.arcCenter = null;
            this.arcLength = null;
        }

        this.arcLength = Math.PI / 2;
    }

    addHandles () {
        this.handles = [new BasePoint(), new BasePoint()];
    }

    setIsArc (isArc) {
        this.isArc = isArc;
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
