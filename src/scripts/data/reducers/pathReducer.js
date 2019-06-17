'use strict';

import { PathModel } from '../models';

const initialPathState = (function() {
    return [];
})();

export default function(state = initialPathState, action) {
    switch (action.type) {
        case 'TOGGLE_PATH_CLOSED':
            let id = action.id || state.current;
            let newPaths = state.all.map(p => {
                if (p._id === id) {
                    return {
                        ...p,
                        isClosed: !p.isClosed,
                    };
                } else {
                    return p;
                }
            });
            return {
                ...state,
                all: newPaths,
            };
            break;
        case 'TOGGLE_PATH_FILL':
            {
                let newPaths = state.all.map(p => {
                    if (p._id === state.current) {
                        return {
                            ...p,
                            fill: (p.fill === 'none' && 'black') || 'none',
                        };
                    } else {
                        return p;
                    }
                });
                return {
                    ...state,
                    all: newPaths,
                };
            }
            break;
        case 'ADD_PATH':
            // if ( state.points.all.some(p => p.path === state.current ) {

            // }
            // let path = Path({ rune: action.runeId });
            return {
                paths: [...state.paths, ''],
                // ...state,
                // current: path._id,
                // selected: [],
                // all: [...state.all, path],
            };
            break;
        case 'UPDATE_PATH':
            return {
                paths: paths.map((p, i) => (i === action.i ? action.value : p)),
            };
            break;
        default:
            return state;

            break;
    }
}
