'use strict';

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

module.exports = ArcModel;

var PointModel = require('./PointModel');