'use strict';

var paper = require('paper');
var React = require('react');

module.exports = function(data) {

    console.log(data);

    var transformPoints = function () {
            var points = data.selectedPoints;

            console.log(points);
            console.log(points.length);

            if(points.length !== 4) {
                console.log("Not the right no of selected points");
                return;
            }

            console.log("Going strong!");


            var testPath = new paper.Path();
            testPath.strokeColor = 'red';

            /* ------ Get initial vars ------ */

            // console.log(points);

            var midPoint = points[0].getMid(points[2]);

            // Show mid circle
            var circle = new paper.Path.Circle(midPoint, res / 2);
            circle.strokeColor = 'black'

            /* ------ First triangulation ------ */

            // Hypothesis to midpoint
            var t1_hyp = points[2].getDistance(midPoint);

            // Adj 
            var t1_adj = res / 2;

            var t1_phi = 90 - trigUtil.radToDeg(Math.acos( t1_adj / t1_hyp));

            // var vec = new paper.Point(points[2]);
            var vec = new paper.Point();

            vec.angle = (90 - trigUtil.radToDeg( trigUtil.getAngle(points[0], points[2]))) - t1_phi;

            var side = trigUtil.getSize(null, t1_adj, t1_hyp);

            vec.length = side;

            var tangentPoint = points[2].subtract(vec);

            testPath.moveTo(points[2]);
            testPath.lineTo(tangentPoint);

            /* ------ Second triangulation ------ */

            var otherPoint = new paper.Point(points[0].x, points[2].y);

            // Distance between points[2] and 0 on y axis
            var t2_adj = otherPoint.getDistance(points[2]);

            var t2_hyp = t2_adj / Math.cos( trigUtil.degToRad(vec.angle) );

            // New length for vector (reflects distance to new point[3]
            vec.length = Math.abs(t2_hyp) - vec.length;

            // var newPoint = points[2].subtract(finalVector.length);

            var newPoint3 = tangentPoint.subtract(vec);

            testPath.lineTo(newPoint3);

            // var newPoint3 = otherPoint.subtract(finalVector);

            var finalMeasure = points[0].getDistance(newPoint3);

            console.log("Distance" + finalMeasure);

            // points[3].y = points[0].y + finalMeasure;
            // points[1].y = points[2].y - finalMeasure;

            // app.tablet.getactiveRune().letter.transforms = {};

            // app.tablet.getactiveRune().letter.transforms[originalPoints[3]] = [-90, -finalMeasure];
            // app.tablet.getactiveRune().letter.transforms[originalPoints[1]] = [90, finalMeasure];

            // return newPoints;
    }

    return {
        title: 'Weight Transform',
        icon: '',
        collapsed: true,
        panel: React.createClass({
            getInitialState : function() {
                return {data: data.gridOptions };
            },
            triggerTransform: function() {
                console.log("Doing the 4pt");
                transformPoints();
            },
            render: function() {
                return (
                    <div>
                        <button onClick={this.triggerTransform}>4pt Transform</button>
                    </div>
                );
            }
        })
    }
}