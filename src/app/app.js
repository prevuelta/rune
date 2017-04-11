'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';
import Workspace from './workspace/workspace';

const store = createStore(reducer, {todos: [{text: "thing"}]});

// Populate store

const render = () => ReactDOM.render(
    <Provider store={store}>
        <Workspace />
    </Provider>,
    document.getElementById('app')
);

render();

store.subscribe(render);


// require('../extendLibs');

// let Events = require('./global/Events');
// let keys = require('./global/keys');
// let Util = require('./global/Util');

// let WorkSpaceController = require('./workspace/WorkspaceController');
// let ViewController = require('./workspace/canvas/ViewController');
// let DataController = require('./data/ModelController');

// class App {

//     constructor () {

//         this.config = {
//             nudge: {
//                 normal: 1,
//                 super : 10,
//             }
//         }

//         // Setup workspace
//         this.savedTablets = Object.keys(localStorage).map(ref => {
//             return Util.getLocalData(ref);
//         });

//         console.log("Saved tablets", this.savedTablets);

//         let data = this.savedTablets;

//         this.data = DataController;
//         this.data.setTablets(data);

//         this.view = ViewController;
//         this.view.loadTablet(this.data.tablet)

//         WorkSpaceController.loadApp(this);

//         let app = this;

//     }

//     save () {
//         Events.renderSVG.dispatch();
//         this.data.save();
//     }
// }

// let app = new App();
