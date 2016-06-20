'use strict';

let paper = require('paper');
let Trig = require('../../global/Trig');
let styles = require('../../global/styles');
let RuneNodeFactory = require('./RuneNodeFactory');

let Canvas = require('./CanvasService');

class ArcView {
    constructor (point, renderedPoint, res) {

        this.point = point;
        this.renderedPoint = renderedPoint;
        this.res = res;
        this.paths = [];

        if (point.hasArcIn) {
            this.createArc(point.arcIn, true);
        }

        if (point.hasArcOut) {
            this.createArc(point.arcOut, false);
        }
    }

    createArc (arc, isIn) {

        Canvas.drawToLayer('render', this.drawToRender.bind(this, arc, isIn));
        RuneNodeFactory(this.point, this.renderedPoint);

    }

    drawToRender (arc, isIn) {

        let center = this.renderedPoint.add(new paper.Point(arc.center.render(this.res)));
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

        if (this.point.isSelected || arc.center.isSelected) {

            RuneNodeFactory(arc.center, center);
            RuneNodeFactory(null, center.add(rotation));

            Canvas.drawToLayer('interactive', this.drawToInteractive.bind(this, center, radius));
        }
    }

    drawToInteractive (center, radius) {
        let circle = new paper.Path.Circle(center, radius);
        circle.style = styles.overlay;
    }
}

module.exports = ArcView;