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
        this.radius = res.x * point.tangent.size;
        this.endPoint = new paper.Point(point.tangent.endPoint.render(res));
        this.center = renderedPoint.add(new paper.Point(point.tangent.center.render(res)));
        this.exitPoint = new paper.Point(40, 40);
        this.direction = point.tangent.direction ? 1 : -1;
        this.orientation = point.tangent.orientation ? 1: -1;

        this.createTangent();

    }

    createTangent () {

        Canvas.drawToLayer('render', this.drawToRender.bind(this));
        RuneNodeFactory(this.point, this.renderedPoint);

    }

    getTangentVec (radius, point, center, direction) {
        let hyp = center.getDistance(point);
        let adj = Math.sqrt(hyp * hyp - radius * radius);

        let angle = point.getAngle(center);
        let newAngle = Trig.radToDeg(Math.asin(radius / hyp));

        let vec = point.subtract(this.center)
        vec.normalize();
        vec.length = adj;
        vec.angle += 180 + newAngle * direction;

        return vec;
    }

    drawToRender () {

        let tangent1Vec = this.getTangentVec(this.radius, this.renderedPoint, this.center, -this.direction);
        let tangent2Vec = this.getTangentVec(this.radius, this.endPoint, this.center, this.direction);

        let tangent1 = this.renderedPoint.add(tangent1Vec);
        let tangent2 = this.endPoint.add(tangent2Vec);

        let midPoint = tangent1.getMid(tangent2);

        let throughVec = midPoint.subtract(this.center);
        throughVec.normalize();
        throughVec.length = this.radius * this.orientation;

        let arcMidPoint = this.center.add(throughVec);

        this.paths.push(new paper.Path([this.endPoint]));

        this.paths.push(new paper.Path.Arc({
            from: tangent2,
            through: arcMidPoint,
            to: tangent1,
            strokeColor: 'black'
        }));

        this.paths.push(new paper.Path([this.renderedPoint]));

        // RuneNodeFactory(this.point, this.renderedPoint);
        RuneNodeFactory(this.point.tangent.center, this.center);
        RuneNodeFactory(this.point.tangent.endPoint, this.endPoint);
        // RuneNodeFactory(null, tangent2);


        if (this.point.isSelected || this.point.tangent.center.isSelected || this.point.tangent.endPoint.isSelected) {

              Canvas.drawToLayer('interactive', () => {
                    let line = new paper.Path.Line(this.renderedPoint, this.center);
                    line.style = styles.overlay;
                    let line2 = new paper.Path.Line(this.center, tangent1);
                    line2.style = styles.overlay;
                    let line3 = new paper.Path.Line(this.center, midPoint);
                    line3.strokeColor = 'red';
                    let line4 = new paper.Path.Line(tangent1, tangent2);
                    line4.strokeColor = 'green';
                    let line5 = new paper.Path.Line(this.center, arcMidPoint);
                    line5.strokeColor = 'black';
                    let circle = new paper.Path.Circle(this.center, this.radius);
                    circle.style = styles.overlay;
              });

        }
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