'use strict';

let React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {active: this.props.active};
    },
    render: function () {
        let classNames = this.state.active ? 'sheet active' : 'sheet';
        return (
            <div className={classNames}>
                {this.props.name}
                <div className="actions">
                    {this.props.children}
                </div>
            </div>
        );
    }
})