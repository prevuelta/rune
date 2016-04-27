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

        this.plugins = require('./plugins')({
            gridOptions: this.data.tablet.gridOptions,
            selectedPoints: this.data.activeRune.selectedPoints,
            path: this.data.activeRune.currentPath,
            addTransformToSelected: (data) => { this.data.addTransformToSelected(data); },
            layers: this.canvas.layerControllers,
            config: this.config
        });

        this.workspace = new WorkSpaceController(this);

    }

    save () {
        this.data.save();
    }
}

var app = new App();