'use strict';

let React = require('react');

module.exports = React.createClass({
    // getInitialState: function () {
    //     return {toggle: this.props.toggle};
    // },
    // toggle: function () {
    //     this.props.onToggle();
    //     this.setState({toggle: !this.state.toggle});
    // },
    render: function() {
        return (
            <div
                className="overlay">
                <div className="dialogue">
                    { this.props.children }
                </div>
            </div>
        );
    }
});