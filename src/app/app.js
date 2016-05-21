'use strict';

// Rune
var Events = require('./global/Events');
var keys = require('./global/keys');
var Util = require('./global/Util');
var WorkSpaceController = require('./workspace/WorkspaceController');
var CanvasController = require('./workspace/canvas/CanvasController');
var DataController = require('./models/ModelController');

class App {

    constructor () {

        this.config = {
            nudge: {
                normal: 1,
                super : 10,
            }
        }

        // Setup workspace
        this.savedTablets = Object.keys(localStorage).map(ref => {
            return Util.getLocalData(ref);
        });

        this.loadTablet(this.savedTablets[0]);

        Events.loadTablet.add(this.loadTablet.bind(this));

    }

    loadTablet (data) {

        this.data = new DataController(data);
        this.canvas = new CanvasController(this.data);

        this.plugins = require('./plugins');

        this.workspace = new WorkSpaceController(this, this.savedTablets);

        let app = this;

        setInterval(this.save.bind(this), 20000);
    }

    save () {
        this.data.save();
    }
}

var app = new App();