'use strict';

let React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {point: this.props.point};
    },
    deletePoint: function () {
        Events.deletePoint.dispatch(this.props.point);
    },
    render: function() {
        return (
            <div
                className="switch"
                onClick={this.deletePoint}>
                { this.props.symbol }
            </div>
        );
    }
});