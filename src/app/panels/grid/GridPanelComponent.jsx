'use strict';

var React = require('react');

module.exports = function(data) {
    return React.createClass({
        getInitialState : function() {
            return {data: data};
        },
        updateRes: function(e) {
            // this.setState({data})
            console.log("hey");
            console.log(this.state.data);
            this.state.res = 12;
            this.forceUpdate();
        },
        render: function() {
            return (
                <div>
                    <label>Resolution:</label>
                    <input class="form-control" type="text" defaultValue={ this.state.data.res} />
                    <button onClick={this.updateRes}>Update</button>
                </div>
            );
        }
    });
}