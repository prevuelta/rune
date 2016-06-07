'use strict';

let ActionBar = require('./ActionBarController.jsx');
let PanelController = require('./panels/PanelController.jsx');
let ToolsController = require('./tools/ToolsController.jsx');

class WorkSpaceController {

    loadApp (app) {

        // TODO: refactor with service pattern
        ActionBar.loadApp(app);
        // TODO: refactor with service pattern
        PanelController.loadApp(app);
    }
}

module.exports = new WorkSpaceController();