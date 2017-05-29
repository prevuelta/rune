'use strict';

import Tablet from '../models/tablet';
import Rune from '../models/rune';

const initialState = {
    tablets: [ Tablet({id: 0}) ],
    currentTabletIndex: 0,
    currentRuneIndex: 0,
    currentPathIndex: 0,
    selectedPointIndex: 1,
    runes: [{tablet: 0, id:0}],
    paths: [{id: 0, rune: 0}],
    points: []
};

export default (state = initialState, action) => {
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
                selectedPointIndex: action.index
            }
        break;
        default:
            return state
    }
}
