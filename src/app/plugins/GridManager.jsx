'use strict';

var React = require('react');
var Events = require('../global/Events');

module.exports = function(data) {
    return {
        title: 'Grid',
        panel: React.createClass({
            getInitialState : function() {
                return {data: data.gridOptions };
            },
            updateData: function(e) {
                var res = this.refs.res.getDOMNode().value;
                var units = this.refs.units.getDOMNode().value;
                this.state.data.res = +res;
                this.state.data.units = +units;
                // this.forceUpdate();
                Events.refreshCanvas.dispatch();
            },
            render: function() {
                return (
                    <div>
                        <label>Resolution:</label>
                        <input type="text" ref="res" defaultValue={ this.state.data.res} />
                        <label>Units</label>
                        <input type="text" ref="units" defaultValue={this.state.data.units} />
                        <button onClick={this.updateData}>Update</button>
                    </div>
                );
            }
        })
    };
}