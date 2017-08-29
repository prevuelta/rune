'use strict';

const initialState = {
    all: [],
    selected: [],
    lastSelected: null
};

export default function ( state = initialState, action) {

    let { all: points, selected, lastSelected } = state;

    switch(action.type) {
        case 'NUDGE_POINTS': {

            selected.forEach(p => {
                let point = points[p];
                point.x += action.vector[0];// * state.tablets[state.currentTabletIndex].options.layout.gridUnit;
                point.y += action.vector[1];// * state.tablets[state.currentTabletIndex].options.layout.gridUnit;
            });

            return {
                ...state,
                selected
            }

        }
            break;
        case 'SELECT_POINT': {

            let index = selected.indexOf(action.index);

            return {
                lastSelected: action.index,
                ...state,
                selected: index > -1 && selected.length === 1 ? [] : [action.index],
                lastSelected: index === -1 ? action.index : null
            };

        }
            break;
        case 'ADD_SELECT_POINT' : {

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
                lastSelected
            }

        }
            break;
        case 'DESELECT_ALL_POINTS':

            return {
                ...state,
                selected: [],
                lastSelected: null
            };

            break;

        case 'DELETE_SELECTED_POINTS':

            return {
                ...state,
                selected: [],
                all: points.filter((p,i) => selected.indexOf(i) === -1)
            };

            break;

        case 'ADD_POINT':

            let point = action.point;

            if (lastSelected != null) {
                points.splice(lastSelected, 0, action.point);
            } else {
                points = points.concat(action.point);
            }

            return { 
                ...state,
                all: points,
                selected: []
            };

        break;
        default:
            return state;
        break;
    }
}
