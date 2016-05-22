'use strict';

let paper = require('paper');
let RuneNodeFactory = require('./RuneNodeFactory');

class RunePointView {
    constructor (point, res, rLayer, iLayer) {

        this.point = new paper.Point(
            point.render(res)
        );

        if(point.transform) {
            this.point = this.point.add(new paper.Point(
                point.transform[0] * res.x,
                point.transform[1] * res.y
            ));
        }

        let h1 = point.handle1 ? new paper.Point(point.handle1[0], point.handle1[1]) : null;
        let h2 = point.handle2 ? new paper.Point(point.handle2[0], point.handle2[1]) : null;

        if (point.isCurve) {

            this.point = new paper.Segment({
                point: this.point,
                handleIn: h1,
                handleOut: h2
            });

            iLayer.activate();

            new RuneHandle(this.point, this.point.add(h1));
            new RuneHandle(this.point, this.point.add(h2));

        }

        iLayer.activate();

        point.node = RuneNodeFactory(point, this.point);

        if (point.isCurve) {
            if (point.handle1) {
                let h1p = new paper.Path.Circle(this.point.add(h1), 5);
                h1p.strokeColor = 'red';
                let p1 = new paper.Path.Line(this.point.add(h1), this.point);
                p1.strokeColor = 'red';
            }

            if (point.handle2) {
                let h2p = new paper.Path.Circle(this.point.add(h2), 5);
                h2p.strokeColor = 'red';
                let p2 = new paper.Path.Line(this.point.add(h2), this.point);
                p2.strokeColor = 'red';
            }
        }
    }
}

module.exports = RunePointView;