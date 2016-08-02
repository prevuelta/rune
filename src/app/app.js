'use strict';


require('../extendLibs');

// Rune
let Events = require('./global/Events');
let keys = require('./global/keys');
let Util = require('./global/Util');

let WorkSpaceController = require('./workspace/WorkspaceController');
let ViewController = require('./workspace/canvas/ViewController');
let DataController = require('./data/ModelController');

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

        console.log("Saved tablets", this.savedTablets);

        let data = this.savedTablets;

        this.data = DataController;
        this.data.setTablets(data);

        this.view = ViewController;
        this.view.loadTablet(this.data.tablet)

        WorkSpaceController.loadApp(this);

        let app = this;
        //setInterval(this.save.bind(this), 20000);

    }

    save () {
        Events.renderSVG.dispatch();
        this.data.save();
    }
}

let app = new App();
