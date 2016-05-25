'use strict';

let paper = require('paper');
let RuneNodeFactory = require('./RuneNodeFactory');
let RuneHandle = require('./RuneHandle');

class RunePointView {
    constructor (point, res, rLayer, iLayer) {

        this.point = new paper.Point(
            point.render(res)
        );

        if (point.transform) {
            this.point = this.point.add(new paper.Point(
                point.transform[0] * res.x,
                point.transform[1] * res.y
            ));
        }

        let h1 = point.handle1 ? new paper.Point(point.handle1[0], point.handle1[1]) : null;
        let h2 = point.handle2 ? new paper.Point(point.handle2[0], point.handle2[1]) : null;

        iLayer.activate();

        if (point.isCurve) {

            debugger;

            this.point = new paper.Segment({
                point: this.point,
                handleIn: h1,
                handleOut: h2
            });

            point.node = RuneNodeFactory(point, this.point.point);

            this.h1 = new RuneHandle(this.point.point, this.point.point.add(h1));
            this.h2 = new RuneHandle(this.point.point, this.point.point.add(h2));

        } else {
            point.node = RuneNodeFactory(point, this.point);
        }
    }
}

module.exports = RunePointView;