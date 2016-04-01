'use strict';

var React = require('react');

module.exports = function(data) {
    return {
        data: data.selectedPoints,
        title: 'Inspect point',
        panel: React.createClass({
            // getInitialState : function() {
                // return { points: data.selectedPoints };
            // },
            render: function() {
                return (
                    <div>
                        <ul>
                            {
                                this.props.data.map(function(point) {
                                    console.log(point);
                                    return <li>
                                        {point.point.x}, {point.point.y}
                                        { point.point.isCurve }
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                );
            }
        })
    };
}