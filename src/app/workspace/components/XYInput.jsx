'use strict';

let React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {coords: this.props.value};
    },
    updateX: function (event) {
        this.state.coords.x = +event.target.value;
        this.props.change(this.state.coords);
    },
    updateY: function (event) {
        this.state.coords.y = +event.target.value;
        this.props.change(this.state.coords);
    },
    render: function() {
        return (
            <div>
                <label>{this.props.label}</label>
                <div className="flex-group">
                    <label>X:</label>
                    <input
                        className="input-x"
                        defaultValue={this.state.coords.x}
                        onChange={this.updateX}
                        type="number"
                        step="1" />
                    <label>Y:</label>
                    <input
                        className="input-y"
                        defaultValue={this.state.coords.y}
                        onChange={this.updateY}
                        type="number"
                        step="1" />
                </div>
            </div>
        );
    }
});