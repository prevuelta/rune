'use strict';

// let ArcModel = require('./ArcModel');

class ArcModel {
    constructor (obj) {

        // if (typeof obj === 'object') {
            this.size = obj && obj.size || 2;
            this.center = obj && new PointModel(null, obj.center) || new PointModel(null, 1,1);
            this.endPoint = obj && new PointModel(null, obj.endPoint) || new PointModel(null, 0, 0);
            this.direction = obj && obj.direction || false;
        // } else {
        //     this.size = 2;
        //     this.center = new RunePoint(null, 1,1);
        //     this.endPoint = new RunePoint(null, 0,0);
        //     this.direction = false;
        // }
    }
}


class PointModel {

    constructor (path, x, y) {

        if (path) {
            Object.defineProperty(this, 'path', {
                value: path,
                writable: true,
                configurable: true
            });
            this.path = path;
        }

        if (typeof x === 'object') {
            this.x = x.x;
            this.y = x.y;
        } else {
             this.x = x;
             this.y = y;
        }

        this.transforms = x.transforms || [];
        this.transform = x.transform || [0,0];
        this.handleIn = x.handleIn || null;
        this.handleOut = x.handleOut || null;
        this.isCurve = x.isCurve || false;
        this.isSelected = x.isSelected || false;
        this.arcIn = x.arcIn && new ArcModel(x.arcIn) || null;
        this.arcOut = x.arcOut && new ArcModel(x.arcOut) || null;
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
        this.arcIn = this.hasArcIn ? null : new ArcModel();
    }

    setArcOut () {
        this.arcOut = this.hasArcOut ? null : new ArcModel();
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

module.exports = PointModel;
