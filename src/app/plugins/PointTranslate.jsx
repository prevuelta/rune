'use strict';

var React = require('react');

module.exports = function(exposedData) {
    return {
        title: 'Point Translate',
        icon: '',
        fn: function(oldPoints, direction, amount) {
            return newPoint;
        },
        panel: React.createClass({
            translates: {
                'up' : [0, 1],
                'down': [0, -1],
                'left' : [-1, 0],
                'right' : [1,0]
            },
            translate: function (direction) {
                console.log(direction);
                exposedData.addTransformToSelected(this.translates[direction]);
            },
            render: function () {
                return  <div>
                            <span onClick={function() { event.target.translate('left'); }} className="tool">&larr;</span>
                            <span onClick={function() { event.target.translate('right'); }} className="tool">&rarr;</span>
                            <span onClick={function() { this.translate('up'); }} className="tool">&uarr;</span>
                            <span onClick={function() { this.translate('down'); }} className="tool">&darr;</span>
                        </div>;
            }
        })
    };
};