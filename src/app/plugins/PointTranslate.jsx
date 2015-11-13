'use strict';

var React = require('react');

module.exports = function(data) {
    return {
        title: 'Point Translate',
        icon: '',
        fn: function(oldPoints, direction, amount) {
            return newPoint;
        },
        panel: React.createClass({
            render: function() {
                return <div className="foo"><p>This is coolio</p></div>;
            }
        })
    };
};