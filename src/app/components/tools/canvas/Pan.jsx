'use strict';

let React = require('react');
let Events = require('../../../global/Events');

let Canvas = require('../../canvas/CanvasService');

// Components
let Button = require('../../../components/Button.jsx');
let Switch = require('../../../components/Switch.jsx');

// Icon
let HandIcon = require('../../../icons/Hand.jsx');

module.exports = React.createClass({
    active: false,
    deactivateToolLayer: null,
    togglePanTool: function () {
        let tool = this;
        this.active = !this.active;
        if (this.active) {
            this.deactivateToolLayer = Canvas.activateToolLayer(null, function (loc, origin) {
                let translate = {x: loc.x - origin.x, y: loc.y - origin.y};
                console.log(translate);
                Canvas.setCanvasOffset(translate);
            });
        } else if (!this.active && this.deactivateToolLayer) {
            this.deactivateToolLayer();
        }
    },
    render: function () {
        return (
            <Switch
                onToggle={this.togglePanTool.bind(this)}>
                <HandIcon />
            </Switch>
        );
    }
});