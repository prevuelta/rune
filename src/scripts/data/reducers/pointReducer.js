'use strict';

import { POINT_TYPES } from '../../util/constants';
import { PointModel } from '../models';

const initialState = {
    all: [],
    selected: [],
    lastSelected: null,
};

export default function(state = initialState, action) {
    let { all: points, selected, lastSelected } = state;

    switch (action.type) {
        case 'RESIZE_POINTS':
            {
                return {
                    ...state,
                    all: points.map(p => ({
                        ...p,
                        x: (p.x *= action.xRatio),
                        y: (p.y *= action.yRatio),
                    })),
                };
            }
            break;
        case 'NEXT_POINT':
            return {
                ...state,
                selected:
                    selected.length === 1
                        ? [Math.min(state.all.length - 1, selected[0] + 1)]
                        : selected,
            };
            break;
        case 'NUDGE_POINTS':
            {
                let newPoints = points.map((p, i) => {
                    if (selected.indexOf(i) > -1) {
                        return {
                            ...p,
                            x: Math.min(1, Math.max(0, p.x + action.vector[0])),
                            y: Math.min(1, Math.max(0, p.y + action.vector[1])),
                        };
                    } else {
                        return p;
                    }
                });

                return {
                    ...state,
                    all: newPoints,
                };
            }
            break;
        case 'SELECT_ALL':
            return {
                ...state,
                selected: state.all.map((p, i) => i),
            };
            break;
        case 'SELECT_POINT':
            {
                let index = selected.indexOf(action.index);

                return {
                    lastSelected: action.index,
                    ...state,
                    selected:
                        index > -1 && selected.length === 1
                            ? []
                            : [action.index],
                    lastSelected: index === -1 ? action.index : null,
                };
            }
            break;
        case 'ADD_SELECT_POINT':
            {
                // TODO: This is manipulating state
                let index = selected.indexOf(action.index);

                if (index > -1) {
                    selected.splice(index, 1);
                } else {
                    selected.push(action.index);
                    lastSelected = action.index;
                }

                return {
                    ...state,
                    selected,
                    lastSelected,
                };
            }
            break;
        case 'DESELECT_ALL_POINTS':
            return {
                ...state,
                selected: [],
                lastSelected: null,
            };

            break;

        case 'DELETE_SELECTED_POINTS':
            return {
                ...state,
                selected: [],
                all: points.filter((p, i) => selected.indexOf(i) === -1),
            };

            break;
        case 'DELETE_POINT':
            console.log(action, state.all);
            return {
                ...state,
                all: points.filter((p, i) => p._id !== action.id),
            };
            break;
        case 'DRAW_ARC':
            return {
                ...state,
                all: points.map((p, i) => {
                    if (selected.indexOf(i) > -1) p.type = POINT_TYPES.ARC;
                    return p;
                }),
            };
            break;

        case 'UPDATE_POINT':
            console.log(action);
            return {
                ...state,
                all: points.map((p, i) => {
                    if (p._id === action.id) {
                        p.x = action.data.x;
                        p.y = action.data.y;
                    }
                    return p;
                }),
            };
        case 'ADD_POINT':
            console.log('Adding point');
            const index = lastSelected || points.length;

            const point = PointModel(action.point);

            return {
                ...state,
                all: [...points, point],
                selected: [index],
            };

            break;
        default:
            return state;
            break;
    }
}
