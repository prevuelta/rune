'use strict';

let React = require('react');
let Events = require('../../../global/Events');

// Components
let Button = require('../../../components/Button.jsx');

// Icon
let ZoomIcon = require('../../../icons/Zoom.jsx');

module.exports = React.createClass({
    getInitialState: function () {
        return {isActive: false};
    },
    dispatch: function () {
        Events.zoomIn.dispatch();
    },
    render: function () {
        return (
            <Button
                handler={this.dispatch}>
                <ZoomIcon />
            </Button>
        );
    }
});