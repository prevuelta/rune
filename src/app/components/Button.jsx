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
    click: function () {
        console.log("Button handler...");
        this.props.handler();
    },
    render: function() {
        return (
            <div
                className="button"
                onClick={this.click}>
                { this.props.symbol }
            </div>
        );
    }
});