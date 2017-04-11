'use strict';

let React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div
                className="button-group">
                { this.props.children }
            </div>
        );
    }
});