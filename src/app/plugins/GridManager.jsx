'use strict';

var React = require('react');
var Events = require('../global/Events');

module.exports = function(data) {
    return {
        title: 'Grid',
        collapsed: true,
        panel: React.createClass({
            getInitialState : function() {
                return {data: data.gridOptions };
            },
            updateData: function(e) {
                var x = this.refs.resX.getDOMNode().value;
                var y = this.refs.resY.getDOMNode().value;
                var units = this.refs.units.getDOMNode().value;
                this.state.data.res.x = +x;
                this.state.data.res.y = +y;
                this.state.data.units = +units;
                // this.forceUpdate();
                Events.refreshCanvas.dispatch();
            },
            render: function() {
                return (
                    <div>
                        <label>Resolution:</label>
                        <input type="text" ref="resX" defaultValue={ this.state.data.res.x} />
                        <input type="text" ref="resY" defaultValue={ this.state.data.res.y} />
                        <label>Units</label>
                        <input type="text" ref="units" defaultValue={this.state.data.units} />
                        <button onClick={this.updateData}>Update</button>
                    </div>
                );
            }
        })
    };
}