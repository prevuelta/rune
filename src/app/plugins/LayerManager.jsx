'use strict';

var React = require('react');

module.exports = {
    title: 'Layers',
    collapsed: true,
    panel: React.createClass({
        getInitialState : function() {
            return {layers: data.layers };
        },
        render: function() {
            return (
                <div>
                    <h4>Layers</h4>
                    <ul>
                        {
                            this.state.layers.map(function(layer) {
                                return <li>{layer.name}</li>
                            })
                        }
                    </ul>
                </div>
            );
        }
    })
};