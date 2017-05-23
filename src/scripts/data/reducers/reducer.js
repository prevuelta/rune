'use strict';

import Tablet from '../models/tablet';
import Rune from '../models/rune';

const initialState = {
    tablets: [ Tablet() ],
    currentTabletIndex: 0,
    currentRuneIndex: 0,
    currentPathIndex: 0,
    runes: [ Rune(0) ],
    paths: [{ rune: 0} ],
    points: [{x: 140, y: 240, rune: 0}]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_POINT':
            console.log("Adding point", action.point)
            return { 
                ...state,
                points: state.points.concat(action.point)
            };
        default:
            return state
    }
}
