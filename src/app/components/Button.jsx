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
    render: function() {
        return (
            <div
                className="switch">
                { this.props.symbol }
            </div>
        );
    }
});