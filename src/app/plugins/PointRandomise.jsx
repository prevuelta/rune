'use strict';

var React = require('react');

module.exports = function(exposedData) {

    return {
        title: 'Randomise points',
        icon: '',
        collapsed: true,
        panel: React.createClass({
            getRandom: function() {
                return Math.floor((Math.random() * 6)) - 3;
            },
            randomise: function() {
                console.log("thing happening");
                return exposedData.addTransformToSelected([
                    this.getRandom(),
                    this.getRandom()
                ]);
            },
            render: function () {
                return <span className="tool" onClick={this.randomise}>R</span>;
            }
        })
    };
};