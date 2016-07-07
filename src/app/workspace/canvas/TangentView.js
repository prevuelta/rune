'use strict';

let paper = require('paper');
let Trig = require('../../global/Trig');
let styles = require('../../global/styles');
let RuneNodeFactory = require('./RuneNodeFactory');

let Canvas = require('./CanvasService');

class TangentView {
    constructor (point, renderedPoint, res) {

        console.log("Drawing tangent");

        this.point = point;
        this.renderedPoint = renderedPoint;
        this.res = res;
        // these paths need to have: orignpoint, tangent point, | arc | second tangrent point, exit point
        this.paths = [];
        this.radius = point.tangent.radius;
        this.center = new paper.Point(0, 0);
        this.exitPoint = new paper.Point(40, 40);

        this.createTangent();

    }

    createTangent () {

        Canvas.drawToLayer('render', this.drawToRender.bind(this));
        RuneNodeFactory(this.point, this.renderedPoint);

    }

    drawToRender () {

        let hyp = this.center.getDistance(this.renderedPoint);
        let adj = Math.sqrt(hyp * hyp - this.radius * this.radius);

        console.log("h", hyp, "a", adj, "o", this.radius);

        let angle = this.renderedPoint.getAngle(this.center);

        let newAngle = Trig.radToDeg(Math.acos(adj / hyp));

        let tangentVec = this.renderedPoint.add(this.center);
        tangentVec.normalize();
        tangentVec.length = hyp;//adj;
        tangentVec.angle += 180 + newAngle;

        console.log("New angle", newAngle);

        let tangent1 = this.renderedPoint.add(tangentVec);

        // let tangentVec2 = new paper.Point(0, 0);
        // tangentVec2.length = adj;
        // tangentVec2.angle = angle - newAngle;

        let tangent2 = this.renderedPoint.add(tangentVec2);

        // console.log("Tan one", tangent2);
        // debugger;

        // this.paths.push(new paper.Path([this.renderedPoint, tangent1]));

        RuneNodeFactory(this.point, this.renderedPoint);
        RuneNodeFactory(null, this.center);
        RuneNodeFactory(null, tangent1);
        RuneNodeFactory(null, tangent2);

      Canvas.drawToLayer('interactive', () => {
            let line = new paper.Path.Line(this.renderedPoint, this.center);
            line.style = styles.overlay;
            let line2 = new paper.Path.Line(this.center, tangent1);
            line2.style = styles.overlay;
            let line3 = new paper.Path.Line(tangent1, this.renderedPoint);
            line3.strokeColor = 'red';
            let circle = new paper.Path.Circle(this.center, this.radius);
            circle.style = styles.overlay;
      });

        // this.paths.push(new paper.Path.Arc({
        //     from: center.add(rotation),
        //     through: center.add(midRotation),
        //     to: this.renderedPoint,
        //     strokeColor: 'black'
        // }));

        // this.paths.push(new paper.Point)

        // let center = this.renderedPoint.add(new paper.Point(arc.center.render(this.res)));
        // let radius = this.renderedPoint.getDistance(center);
        // let rotation = this.renderedPoint.subtract(center);
        // let midRotation = this.renderedPoint.subtract(center);

        // rotation.length = radius;
        // midRotation.length = radius;

        // let dirVec = arc.direction ? -1 : 1;
        // let angle = Trig.radToDeg(Math.PI/+arc.size) * dirVec;
        // let angleVec = this.renderedPoint.angle - center.angle - 90;

        // rotation.angle += angle;
        // midRotation.angle += angle / 2;

        // if (isIn) {
        //     this.paths.push(new paper.Path.Arc({
        //         from: center.add(rotation),
        //         through: center.add(midRotation),
        //         to: this.renderedPoint,
        //         strokeColor: 'black'
        //     }));
        // }

        // if (this.point.isSelected || arc.center.isSelected) {

            // RuneNodeFactory(arc.center, center);
            // RuneNodeFactory(null, center.add(rotation));

            // Canvas.drawToLayer('interactive', this.drawToInteractive.bind(this, center, radius));
        // }
    }
}

module.exports = TangentView;