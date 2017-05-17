'use strict';

import Tablet from '../models/tablet';

const initialState = {
    tablets: [ Tablet() ],
    currentTabletIndex: 0,
    currentRuneIndex: 0,
    currentPathIndex: 0,
    runes: [],
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
