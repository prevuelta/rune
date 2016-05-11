let constants = require('./const');

'use strict';

module.exports = {
    node : {
        normal: {
            strokeWidth: 3,
            strokeColor: 'black',
            fillColor: 'white'
        },
        selected: {
            strokeWidth: 4,
            strokeColor: 'black',
            fillColor: constants.BLUE
        }
    }

}