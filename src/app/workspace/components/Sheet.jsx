'use strict';

let React = require('react');
let Button = require('./Button.jsx');

module.exports = React.createClass({
    getInitialState: function () {
        return {active: this.props.active};
    },
    componentWillReceiveProps : function (nextProps) {
        this.setState({active: nextProps.active});
    },
    render: function () {
        let classNames = this.state.active ? 'sheet active' : 'sheet';
        let Icon;
        if (this.props.icon) {
            Icon = this.props.icon;
        }
        return (
            <div
                className={classNames}
                onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
})