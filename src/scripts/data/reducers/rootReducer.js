import { combineReducers } from 'redux';

import { pointReducer, pathReducer, tabletReducer } from '.';
console.log(tabletReducer, pointReducer, pathReducer);
import { MODE } from '../../util/constants';

const initialAppState = {
    proofView: false,
    mode: MODE.DOCUMENT,
    snap: true,
};

const intialRuneState = {};

const rune = (state = initialRuneState, action) => {
    return ({}[action.type] || (() => state))();
};

const app = (state = initialAppState, action) => {
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
    rune,
    tablet: tabletReducer,
    point: pointReducer,
    path: pathReducer,
});
