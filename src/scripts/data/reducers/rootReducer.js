'use strict';

import { combineReducers } from 'redux';

import pointReducer from './pointReducer';
import pathReducer from './pathReducer';
import runeReducer from './runeReducer';

const app = (state = {}, action) => {
    return ({
        TOGGLE_MODE() {
            return {
                ...state,
                mode: action.mode,
            };
        },
        TOGGLE_PROOF_VIEW() {
            return {
                ...state,
                proofView: !state.proofView,
            };
        },
    }[action.type] || (() => state))();
};

export default combineReducers({
    app,
    runes: runeReducer,
    // points: pointReducer,
    paths: pathReducer,
});
