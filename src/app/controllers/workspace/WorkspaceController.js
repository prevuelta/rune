'use strict';

let PanelController = require('./panels/PanelController.jsx');
let ToolsController = require('./tools/ToolsController.jsx');

let Events = require('../global/Events');

let React = require('react');
const ReactDOM = require('react-dom')

// Components:
let Dialogue = require('../components/Dialogue.jsx');


function WorkSpaceController () {

    Events.showSvg.add(this.showSvg.bind(this));

    return {
        loadApp (app) {

            this.app = app;

            // TODO: refactor with service pattern
            PanelController.loadApp(app);
        },
        showSvg () {
            let element = document.getElementById('rune-overlay');

            let dialogue = ReactDOM.render(
                <Dialogue
                    element={element}
                    title="Copy SVG code">
                    <textarea>{ this.app.data.tablet.activeRune.renderedSVG }</textarea>
                </Dialogue>,
                element
            );
        }
    }
}

module.exports = new WorkSpaceController();