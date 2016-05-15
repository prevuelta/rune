'use strict';

let constants = require('./const');
let paper = require('paper');

module.exports = {
    node : {
        normal: {
            strokeWidth: 2,
            strokeColor: 'black',
            fillColor: 'white'
        },
        generated: {
            strokeWidth: 2,
            strokeColor: '#cccccc',
            fillColor: '#f4f4f4'
        },
        selected: {
            strokeWidth: 4,
            strokeColor: 'black',
            fillColor: constants.BLUE
        }
    },
    grid: {
        fill: {
            fillColor: new paper.Color(constants.BLUE, 0.2)
        }
    },
    path: {
        filled: {
            fillColor: new paper.Color(0,0,0,0.6),
        },
        outline: {
            strokeColor: 'black'
        },
        active: {
            strokeColor: constants.RED
        }
    }

}