'use strict';

let React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {value: this.props.value};
    },
    updateValue: function (e) {
        this.props.change(+e.target.value);
        // this.setState({value: +e.target.value});
    },
    render: function() {
        return (
            <div className="flex-group">
                <label>{this.props.label}</label>
                <input
                    type="number"
                    defaultValue={this.state.value}
                    onChange={this.updateValue}
                    />
            </div>
        );
    }
});