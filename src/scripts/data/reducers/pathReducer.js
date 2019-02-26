'use strict';

import { PathModel } from '../models';

const initialPathState = (function() {
    return {
        all: [],
        current: null,
    };
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
            let path = Path({ rune: action.runeId });
            return {
                ...state,
                current: path._id,
                selected: [],
                all: [...state.all, path],
            };
            break;
        default:
            return state;

            break;
    }
}
