'use strict';

let React = require('react');
let Events = require('../../../global/Events');

// Components
let Button = require('../../../components/Button.jsx');

// Icon
let DiscIcon = require('../../../icons/Disc.jsx');

module.exports = React.createClass({
    dispatch: function () {
        console.log("Saving...");
        Events.renderSVG.dispatch();
        Events.saveTablet.dispatch();
    },
    render: function () {
        return (
            <Button
                handler={this.dispatch}>
                <DiscIcon />
            </Button>
        );
    }
});