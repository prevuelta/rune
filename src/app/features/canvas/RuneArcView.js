'use strict';

let paper = require('paper');
let Trig = require('../../global/Trig');
let styles = require('../../global/styles');
let RuneNodeFactory = require('./RuneNodeFactory');

class RuneArcView {
    constructor (point, renderedPoint) {

        let center = new paper.Point(point.arcIn.center.map(v => +v));
        let radius = renderedPoint.getDistance(center);
        let rotation = new paper.Point(0, 0);
        let midRotation = new paper.Point(0, 0);

        rotation.length = radius;
        midRotation.length = radius;

        let dirVec = point.arcIn.direction ? -1 : 1; 
        let angle = Trig.radToDeg(Math.PI/+point.arcIn.size);

        rotation.angle = renderedPoint.angle + angle;
        midRotation.angle = renderedPoint.angle + (angle / 2);

        console.log('length', rotation.length);
        console.log('angle', rotation.angle);

        this.path = new paper.Path.Arc({
            from: renderedPoint,
            through: center.add(midRotation),
            to: center.add(rotation),
            strokeColor: 'black'
        });

        this.node = RuneNodeFactory(point, renderedPoint);
        this.endNode = RuneNodeFactory(null, center.add(rotation));

        let c1 = new paper.Path.Circle(center, 10);
        c1.strokeColor = 'black';
        let c2 = new paper.Path.Circle(center.add(rotation), 10);
        c2.strokeColor = 'red';
        let c3 = new paper.Path.Circle(center.add(midRotation), 10);
        c3.strokeColor = 'blue';
    }
}

module.exports = RuneArcView;