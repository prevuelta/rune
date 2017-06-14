'use strict';

import { combineReducers } from 'redux';

import Tablet from '../models/tablet';
import Rune from '../models/rune';

import points from './points';
// import view from './view';

const initialTabletState = {
    all: [ Tablet({id: 0}) ],
    current: 0
};

const initialViewState = {
    proofView: false
};

const initialRuneState = {
    all: [{tablet: 0, id:0}],
    current: 0
};

const initialPathState = {
    all: [{id: 0, rune: 0}],
    current: 0
};

function runes (state = initialRuneState, action) {
    switch(action.type) {
        default:
            return state;
            break;
    };
}

function paths (state = initialPathState, action) {

    switch (action.type) {
        default:

            return state;

            break;
    };
}

function tablets (state = initialTabletState, action) {

    switch (action.type) {

        case 'UPDATE_TABLET_LAYOUT': 

            let all = state.all;

            all[state.current].options.layout = action.layout;

            return {
                ...state,
                all
            };

            break;

        default:

            return state

            break;
    }
}

function view (state = initialViewState, action) {
    switch(action.type) {
        case 'TOGGLE_PROOF_VIEW':
            return {
                ...state,
                proofView: !state.proofView
            };
            break;
        default:
            return state;
            break;
    }
}



export default combineReducers({
    view,
    runes,
    tablets,
    points,
    paths
});
