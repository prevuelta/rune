'use strict';

import { combineReducers } from 'redux';

import Rune from '../models/rune';

import point from './point';
import path from './path';
import tablet from './tablet';
// import view from './view';


const initialViewState = {
    proofView: false
};

const initialRuneState = {
    all: [{tablet: 0, id:0}],
    current: 0
};


function rune (state = initialRuneState, action) {
    switch(action.type) {
        default:
            return state;
            break;
    };
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
    rune,
    tablet,
    point,
    path
});
