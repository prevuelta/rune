'use strict';

// Rune
var Events = require('./global/Events');
var keys = require('./global/keys');
var Util = require('./global/Util');
var WorkSpaceController = require('./features/workspace/WorkspaceController');
var CanvasController = require('./features/canvas/CanvasController');
var DataController = require('./models/DataController');

class App {

    constructor () {

        this.config = {
            nudge: {
                normal: 1,
                super : 10,
            }
        }

        // Setup workspace
        this.data = new DataController(Util.getLocalData("runeData"));
        this.canvas = new CanvasController(this.data);

        this.plugins = require('./plugins');

        this.workspace = new WorkSpaceController(this);

        let app = this;

        setInterval(this.save.bind(this), 20000);

    }

    save () {
        this.data.save();
    }
}

var app = new App();