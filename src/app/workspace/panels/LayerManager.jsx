'use strict';

let React = require('react');
let paper = require('paper');

module.exports = {
    title: 'Layers',
    collapsed: false,
    panel: React.createClass({
        getInitialState : function() {
            return {layers: this.props.canvas.layers };
        },
        render: function() {
            return (
                <div>
                    <div>
                        {
                            this.state.layers.map(function(layer) {
                                return <div className="sheet">
                                    {layer.name}
                                </div>
                            })
                        }
                    </div>
                </div>
            );
        }
    })
};