import { combineReducers } from 'redux';

import { pointReducer, pathReducer, tabletReducer, runeReducer } from '.';

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
    rune: runeReducer,
    tablet: tabletReducer,
    point: pointReducer,
    path: pathReducer,
});
