'use strict';

let paper = require('paper');
let Trig = require('../../global/Trig');
let styles = require('../../global/styles');
let RuneNodeFactory = require('./RuneNodeFactory');

class RuneArcView {
    constructor (point, renderedPoint, res, iLayer, rLayer) {

        this.point = point;
        this.renderedPoint = renderedPoint;
        this.res = res;
        this.paths = [];
        this.iLayer = iLayer;
        this.rLayer = rLayer;

        if (point.hasArcIn) {
            this.createArc(point.arcIn, true);
        }

        if (point.hasArcOut) {
            this.createArc(point.arcOut, false);
        }
    }

    createArc (arc, isIn) {

        let center = new paper.Point(arc.center.render(this.res));
        let radius = this.renderedPoint.getDistance(center);
        let rotation = this.renderedPoint.subtract(center);
        let midRotation = this.renderedPoint.subtract(center);

        rotation.length = radius;
        midRotation.length = radius;

        let dirVec = arc.direction ? -1 : 1; 
        let angle = Trig.radToDeg(Math.PI/+arc.size) * dirVec;
        let angleVec = this.renderedPoint.angle - center.angle - 90;

        rotation.angle += angle;
        midRotation.angle += angle / 2;

        this.rLayer.activate();
        if (isIn) {
            this.paths.push(new paper.Path.Arc({
                from: center.add(rotation),
                through: center.add(midRotation),
                to: this.renderedPoint,
                strokeColor: 'black'
            }));
        } else {
            this.paths.push(new paper.Path.Arc({
                from: this.renderedPoint,
                through: center.add(midRotation),
                to: center.add(rotation),
                strokeColor: 'black'
            }));
        }

        this.iLayer.activate();
        RuneNodeFactory(this.point, this.renderedPoint);
        RuneNodeFactory(arc.center, center);
        RuneNodeFactory(null, center.add(rotation));

        // let c3 = new paper.Path.Circle(center.add(midRotation), 10);
        // c3.strokeColor = 'blue';
    }
}

module.exports = RuneArcView;