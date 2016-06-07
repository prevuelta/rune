'use strict';

let ActionBar = require('./ActionBarController.jsx');
let PanelController = require('./panels/PanelController.jsx');
let ToolsController = require('./tools/ToolsController.jsx');

class WorkSpaceController {

    constructor (app) {

        // TODO: refactor with service pattern
        this.actionBar = new ActionBar(app);
        // TODO: refactor with service pattern
        this.panels = new PanelController(app, app.savedTablets);
        this.tools = ToolsController;
    }
}

module.exports = WorkSpaceController;