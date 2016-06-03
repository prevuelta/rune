'use strict';

let React = require('react');

module.exports = React.createClass({
    // getInitialState: function () {
        // debugger;
        // return null;   
    // },
    // clickHandler : function () {
    //     this.props.handler();
    // },
    click: function (event) {
        if (this.props.handler) {
            this.props.handler(event);
        }
    },
    render: function() {
        return (
            <div
                className="button"
                onClick={this.click}>
                { this.props.children || this.props.symbol }
            </div>
        );
    }
});