'use strict';

var React = require('react');
var util = require('../../global/util');

module.exports = function(data) {
    return React.createClass({
        getInitialState : function() {
            return {data: data};
        },
        updateData: function(e) {
            var res = this.refs.res.getDOMNode().value;
            var units = this.refs.units.getDOMNode().value;
            this.state.data.res = +res;
            this.state.data.units = +units;
            console.log(data);
            this.forceUpdate();
            util.dispatchRuneEvent('refreshCanvas');
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
    });
}