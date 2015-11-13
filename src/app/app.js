'use strict';

// Rune
var Events = require('./global/Events');
var WorkSpaceController = require('./workspace/WorkspaceController');
var CanvasController = require('./canvas/CanvasController');
var DataController = require('./data/DataController');

// Extensions
// var FourPointWeightTransform = require('./plugins/FourPointWeightTransform.jsx');
// var PointTranslate = require('./plugins/PointTranslate.jsx');


function App() {

    var app = this;

    // Setup workspace
    app.util = require('./global/util');
    app.data = new DataController(app.util.checkLocal("runeData"));

    app.plugins = require('./plugins')({
        gridOptions: app.data.tablet.gridOptions,
        selectedPoints: [],
        util: app.util
    });

    app.workspace = new WorkSpaceController(app);
    app.canvas = new CanvasController(app.data);

    // Events
    var events = new Events(app);
    events.init();

}

App.prototype = {
    constructor: App,
    setup: function() {

    },
    save : function() {
        this.data.save();
    }
}


var app = new App();
