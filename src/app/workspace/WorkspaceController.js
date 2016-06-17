'use strict';

let PanelController = require('./panels/PanelController.jsx');
let ToolsController = require('./tools/ToolsController.jsx');

let Events = require('../global/Events');

let React = require('react');

// Components:
let Dialogue = require('../components/Dialogue.jsx');


class WorkSpaceController {

    constructor () {
        Events.showSvg.add(this.showSvg.bind(this));
    }

    loadApp (app) {

        this.app = app;

        // TODO: refactor with service pattern
        PanelController.loadApp(app);
    }

    showSvg () {
        let element = document.getElementById('rune-overlay');

        let dialogue = React.render(
            <Dialogue
                element={element}
                title="Copy SVG code">
                <textarea>{ this.app.data.tablet.renderedSVG }</textarea>
            </Dialogue>,
            element
        );
    }
}

module.exports = new WorkSpaceController();