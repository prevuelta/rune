'use strict';

var React = require('react');

module.exports = function(data) {
    return {
        title: 'Inspect',
        panel: React.createClass({
            getInitialState : function() {
                return {};
            },
            render: function() {
                return (
                    <div>
                        <h4>Inspect point</h4>
                        Some point stuff here
                    </div>
                );
            }
        })
    };
}