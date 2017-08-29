'use strict';

import Path from '../models/path';

const initialPathState = {
    all: [ Path({id: 0})],
    current: 0
};

export default function (state = initialPathState, action) {

    switch (action.type) {

        case 'TOGGLE_PATH_CLOSED' : 
            let path = stat.paths.find(p => p.id === action.id);
            path.isClosed = !path.isClosed;
            return {
                ...state,
                all: [...state.all, path]
            };
            break;
        case 'ADD_PATH' :
            return {
                ...state,
                all: [...state.all, Path()] 
            };
            break;
        default:

            return state;

            break;
    };
}
