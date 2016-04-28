'use strict';

let React = require('react');
let Events = require('../global/Events');

module.exports = function(data) {
    return {
        title: 'Grid',
        collapsed: true,
        panel: React.createClass({
            getInitialState : function() {
                return {data: data.gridOptions };
            },
            updateData: function(e) {
                let baseUnit = this.refs.baseUnit.getDOMNode().value;
                let ratio = this.refs.ratio.getDOMNode().value;
                let units = this.refs.units.getDOMNode().value;
                this.state.data.baseUnit = +baseUnit;
                this.state.data.ratio = +ratio;
                this.state.data.units = +units;
                Events.refreshCanvas.dispatch();
            },
            render: function() {
                return (
                    <div>
                        <label>Zoom level</label>
                        <input type="text" ref="baseUnit" defaultValue={ this.state.data.baseUnit} />
                        <label>Ratio</label>
                        <input type="text" ref="ratio" defaultValue={ this.state.data.ratio} />
                        <label>Units</label>
                        <input type="text" ref="units" defaultValue={this.state.data.units} />
                        <button onClick={this.updateData}>Update</button>
                    </div>
                );
            }
        })
    };
}