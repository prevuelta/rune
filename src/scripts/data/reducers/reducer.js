'use strict';

import Tablet from '../models/tablet';
import Rune from '../models/rune';

const initialState = {
    tablets: [ Tablet({id: 0}) ],
    currentTabletIndex: 0,
    currentRuneIndex: 0,
    currentPathIndex: 0,
    runes: [Rune({tablet: 0, id:0})],
    paths: [],
    points: []
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
