'use strict';

let constants = require('./const');
let paper = require('paper');

module.exports = {
    node : {
        normal: {
            strokeWidth: 3,
            strokeColor: 'black',
            fillColor: 'white'
        },
        generated: {
            strokeWidth: 3,
            strokeColor: '#cccccc',
            fillColor: '#f4f4f4'
        },
        selected: {
            strokeWidth: 4,
            strokeColor: 'black',
            fillColor: constants.BLUE
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