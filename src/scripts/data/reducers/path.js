'use strict';

import Path from '../models/path';

const initialPathState = {
    all: [ Path({id: 0})],
    current: 0
};

export default function (state = initialPathState, action) {

    switch (action.type) {

        case 'TOGGLE_PATH_CLOSED' : 
            let id = action.id || state.current;
            let newPaths = state.all.map(p => {
                if (p.id === id) {
                    return {
                        ...p,
                        isClosed: !p.isClosed
                    };
                } else {
                    return p;
                }
            })
            return {
                ...state,
                all: newPaths
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
