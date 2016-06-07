'use strict';

let React = require('react');
let Events = require('../../global/Events');

// Components
let Button = require('../../components/Button.jsx');
let Switch = require('../../components/Switch.jsx');


// Icon
let ZoomIcon = require('../../icons/Zoom.jsx');

module.exports = React.createClass({
    getInitialState: function () {
        return {isActive: false};
    },
    dispatch: function () {
        Events.zoom.dispatch();
    },
    render: function () {
        return (
            <Switch
                toggle={this.state.isActive}>
                <ZoomIcon />
            </Switch>
        );
    }
});