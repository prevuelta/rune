'use strict';

var React = require('react');

module.exports = function(exposedData) {

    var shapes = [{},{},{}];

    return {
        title: 'Shapes',
        icon: '',
        collapsed: true,
        panel: React.createClass({
            render: function () {
                return  <div>{
                                shapes.map(function(entry, idx) {
                                    return <span className="tool"></span>;
                                })
                            }
                        </div>;
            }
        })
    };
};