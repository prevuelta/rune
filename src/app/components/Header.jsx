'use strict';

let React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            <div
                className="header">
                {this.props.children}
            </div>
        );
    }
})