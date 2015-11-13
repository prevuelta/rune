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
                return  <div>
                            <a>+</a>
                            <a>-</a>
                        </div>;
            }
        })
    };
};