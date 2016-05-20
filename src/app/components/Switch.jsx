'use strict';

let React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {toggle: this.props.toggle};
    },
    toggle: function () {
        this.props.onToggle();
        this.setState({toggle: !this.state.toggle});
    },
    render: function() {
        let classes = `switch ${this.state.toggle ? 'on' : 'off'}`;
        return (
            <div
                className={classes}
                onClick={this.toggle}>
                { this.props.children || this.props.symbol }
            </div>
        );
    }
});