'use strict';

let React = require('react');

module.exports = React.createClass({
    handleStart: function () {

    },
    handleDrag: function () {

    },
    toggleShow: function () {
        this.setState({collapsed: !this.state.collapsed});
    },
    getInitialState: function () {
        return { collapsed : this.props.options.collapsed };
    },
    render: function() {
        return (
            <div className="panel">
                <div className="handle" onClick={this.toggleShow}>
                    { this.props.options.title }
                    <span className="toggle">{this.state.collapsed ? '-' : '+'}</span>
                </div>
                { !this.state.collapsed ?
                <div className="panel-content">
                    { this.props.children }
                </div> : null }
            </div>
        );
    }
});
