import { PathModel } from '../models';

const initialPathState = (function() {
    let path = PathModel();
    return {
        all: [path],
        current: path._id,
    };
})();

export default function(state = initialPathState, action) {
    switch (action.type) {
        case 'TOGGLE_PATH_CLOSED':
            let id = action.id || state.current;
            let newPaths = state.all.map(p => {
                if (p.id === id) {
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
                    if (p.id === state.current) {
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
            let path = Path();
            return {
                ...state,
                current: path.id,
                points: {
                    ...state.points,
                    selected: [],
                },
                all: [...state.all, path],
            };
            break;
        default:
            return state;

            break;
    }
}
