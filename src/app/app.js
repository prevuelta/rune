'use strict';

// Rune
var Events = require('./global/Events');
var Util = require('./global/Util');
var WorkSpaceController = require('./features/workspace/WorkspaceController');
var CanvasController = require('./features/canvas/CanvasController');
var DataController = require('./models/DataController');

class App {

    constructor () {

        // Setup workspace
        this.data = new DataController(Util.getLocalData("runeData"));
        this.canvas = new CanvasController(this.data);

        this.plugins = require('./plugins')({
            gridOptions: this.data.tablet.gridOptions,
            selectedPoints: this.data.activeRune.selectedPoints,
            addTransformToSelected: (data) => { this.data.addTransformToSelected(data); },
            layers: this.canvas.layerControllers
        });

        this.workspace = new WorkSpaceController(this);

    }

    save () {
        this.data.save();
    }
}

var app = new App();