'use strict';

import Tablet from '../models/tablet';
import Rune from '../models/rune';

const initialState = {
    tablets: [ Tablet({id: 0}) ],
    currentTabletIndex: 0,
    currentRuneIndex: 0,
    currentPathIndex: 0,
    runes: [{tablet: 0, id:0}],
    selectedPoints: [],
    paths: [{id: 0, rune: 0}],
    points: [],
    proofView: false
};

export default (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'ADD_POINT':
            console.log("Adding point", action.point)
            let point = action.point;
            point.path = state.currentPathId;
            return { 
                ...state,
                points: state.points.concat(action.point)
            };
        case 'SELECT_POINT':
            return {
                ...state,
                selectedPoints: [...state.selectedPoints, action.index]
            };
        break;
        case 'DELETE_SELECTED_POINTS':
            return {
                ...state,
                selectedPoints: [],
                points: state.points.filter((p,i) => state.selectedPoints.indexOf(i) === -1)
            };
        break;
        case 'TOGGLE_PROOF_VIEW':
            return {
                ...state,
                proofView: !state.proofView
            };
        break;
        default:
            return state
    }
}
