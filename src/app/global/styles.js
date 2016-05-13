let constants = require('./const');

'use strict';

module.exports = {
    node : {
        normal: {
            strokeWidth: 3,
            strokeColor: 'black',
            fillColor: 'white'
        },
        generated: {
            strokeWidth: 3,
            strokeColor: 'gray',
            fillColor: 'white'
        },
        selected: {
            strokeWidth: 4,
            strokeColor: 'black',
            fillColor: constants.BLUE
        }
    },
    path: {
        filled: {
            fillColor: 'black',
            opacity: 0.6
        },
        outline: {
            strokeColor: 'black'
        },
        active: {
            strokeColor: constants.RED
        }
    }

}