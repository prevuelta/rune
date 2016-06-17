'use strict';

let React = require('react');
let Events = require('../../../global/Events');

// Components
let Button = require('../../../components/Button.jsx');

// Icon
let XIcon = require('../../../icons/X.jsx');

module.exports = React.createClass({
    getInitialState: function () {
        return {isActive: false};
    },
    dispatch: function () {
        Events.clearPoints.dispatch();
    },
    render: function () {
        return (
            <Button
                handler={this.dispatch}>
                <XIcon />
            </Button>
        );
    }
});
