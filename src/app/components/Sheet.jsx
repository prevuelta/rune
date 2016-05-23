'use strict';

let React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {active: this.props.active};
    },
    componentWillReceiveProps : function (nextProps) {
        this.setState({active: nextProps.active});
    },
    render: function () {
        let classNames = this.state.active ? 'sheet active' : 'sheet';
        return (
            <div
                className={classNames}
                onClick={this.props.onClick}>
                {this.props.name}
                <div className="actions">
                    {this.props.children}
                </div>
            </div>
        );
    }
})