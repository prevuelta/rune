'use strict';

let paper = require('paper');
let PointModel = require('./PointModel');

class PathModel {
    constructor (data) {
        let _this = this;
        this.points = data && data.points.map(p => new PointModel(this, p)) || [];
        this.isClosed = data && data.isClosed || false;
        this.isActive = data && data.isActive || false;
        this.children = data && data.children.map(c => new PathModel(c)) || [];
    }

    addChild (path) {
        this.children.push(path);
    }

    get hasChildren () {
        return !!this.children.length;
    }

    get hasPoints () {
        return !!this.points.length;
    }

}

module.exports = PathModel;