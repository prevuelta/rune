'use strict';

let constants = require('./const');
let paper = require('paper');

module.exports = {
    board: {
        fillColor: '#ffffff'
    },
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
        },
        handle: {
            strokeColor: constants.RED
        }
    },
    grid: {
        fill: {
            fillColor: new paper.Color(constants.BLUE)
        }
    },
    guides: {
        primary : {
            fillColor: new paper.Color(constants.BLUE)
        },
        secondary: {
            fillColor:  colorWithAlpha(constants.BLUE, 0.2)
        },
        accent: {
           fillColor: new paper.Color(constants.RED)
        }
    },
    overlay: {
        strokeColor: constants.BLUE
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
};

function colorWithAlpha(hex, alpha) {
    let color = new paper.Color(hex);
    color.alpha = alpha;
    return color;
}