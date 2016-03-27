'use strict';

var React = require('react');

module.exports = function(data) {
    return {
        title: 'Inspect point',
        panel: React.createClass({
            getInitialState : function() {
                debugger;
                return { data: data.selectedPoints };
            },
            render: function() {
                return (
                    <div>
                        <ul>
                            {
                                this.state.data.map(function(point) {
                                    return <li> {point.x}, {point.y}
                                        { point.isCurve } </li>
                                })
                            }
                        </ul> 
                    </div>
                );
            }
        })
    };
}