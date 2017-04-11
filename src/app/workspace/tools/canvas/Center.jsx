'use strict';

let React = require('react');
let Events = require('../../../global/Events');

let Canvas = require('../../canvas/CanvasService');

// Components
let Button = require('../../../components/Button.jsx');
let Switch = require('../../../components/Switch.jsx');
// Icon
let CrossIcon = require('../../../icons/Cross.jsx');

module.exports = React.createClass({
   	centerCanvas: function () {
        let tool = this;
		Canvas.activateToolLayer(function (e) {
            // Canvas.setCanvasOffset(e.point);
        });
	},
    render: function () {

        return (
            <Switch
            	onToggle={this.centerCanvas}>
                <CrossIcon />
            </Switch>
        );
    }
});