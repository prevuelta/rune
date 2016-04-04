class Trig {

    getMid (p1, p2) {
        return [(p1.x + p2.x) / 2, (p1.y + p2.y) / 2];
    }
    getDistance (p1, p2) {
        return this.getSize(p1.y - p2.y, p1.x - p2.x, null);
    }
    getSize (adj, opp, hyp) {
            if(adj & hyp) {
                return Math.sqrt(hyp*hyp - adj*adj);
            } else if(adj & opp) {
                return Math.sqrt(opp*opp + adj*adj);
            } else if(opp & hyp) {
                return Math.sqrt(hyp*hyp - opp*opp);
            }
    }
    getAngle (p1, p2) {
        // var adj = that.xRes;

        var adj = p1.getDistance(new paper.Point(p2.x, p1.y));
        var hyp = p1.getDistance(p2);

        // cos() = a / h;

        return (Math.PI / 2) - Math.acos( adj / hyp );

    }
    radToDeg (radians) {
        return radians * (180 / Math.PI)
    }
    degToRad (degrees) {
        return degrees / (180 / Math.PI);
    }
}

module.exports = Trig;