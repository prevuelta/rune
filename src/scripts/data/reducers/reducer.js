import { combineReducers } from 'redux';

import Rune from '../models/rune';

import point from './point';
import path from './path';
import tablet from './tablet';
import { MODE } from '../../util/constants';

const initialAppState = {
    proofView: false,
    mode: MODE.ARC,
};

const initialRuneState = {
    all: [{ tablet: 0, id: 0 }],
    current: 0,
};

const rune = (state = initialRuneState, action) => {
    return ({}[action.type] || (() => state))();
};

const app = (state = initialAppState, action) => {
    return ({
        TOGGLE_MODE: () => {
            return {
                ...state,
                mode: action.mode,
            };
        },
        TOGGLE_PROOF_VIEW: () => {
            return {
                ...state,
                proofView: !state.proofView,
            };
        },
    }[action.type] || (() => state))();
};

export default combineReducers({
    app,
    rune,
    tablet,
    point,
    path,
});
