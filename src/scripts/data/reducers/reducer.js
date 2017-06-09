'use strict';

import { combineReducers } from 'redux';

import Tablet from '../models/tablet';
import Rune from '../models/rune';

import point from './point';
import view from './view';

const initialState = {
    tablets: [ Tablet({id: 0}) ],
    currentTabletIndex: 0,
    currentRuneIndex: 0,
    currentPathIndex: 0,
    runes: [{tablet: 0, id:0}],
    selectedPoints: [],
    lastSelected: null,
    paths: [{id: 0, rune: 0}],
    points: [],
    proofView: false,
};

export default (state = initialState, action) => {
    console.log(action)
    let { points, selectedPoints } = state;
    switch (action.type) {
        case 'UPDATE_TABLET_LAYOUT': 
            let tablets = state.tablets;
            tablets[state.currentTabletIndex].options.layout = action.layout;
            return {
                ...state,
                tablets
            };
        break;
        case 'ADD_POINT':
            let point = action.point;
            point.path = state.currentPathId;

            if (state.lastSelected != null) {
                console.log(state.lastSelected)
                points.splice(state.lastSelected, 0, action.point);
            } else {
                points = points.concat(action.point);
            }
            return { 
                ...state,
                points,
                selectedPoints: []
            };
        case 'UNDO':
        break;
        case 'SELECT_POINT': {
            let index = selectedPoints.indexOf(action.index);
            return {
                lastSelected: action.index,
                ...state,
                selectedPoints: index > -1 && selectedPoints.length === 1 ? [] : [action.index],
                lastSelected: index === -1 ? action.index : null
            };
        }
        break;
        case 'ADD_SELECT_POINT' : {
            let index = selectedPoints.indexOf(action.index);
            let lastSelected = state.lastSelected;
            if (index > -1) {
                selectedPoints.splice(index, 1);
            } else {
                selectedPoints.push(action.index);
                lastSelected = action.index;
            }
            return {
                ...state,
                selectedPoints,
                lastSelected
            }
        }
        break;
        case 'DESELECT_ALL_POINTS':
            return {
                ...state,
                selectedPoints: [],
                lastSelected: null
            };
        break;
        case 'DELETE_SELECTED_POINTS':
            return {
                ...state,
                selectedPoints: [],
                points: state.points.filter((p,i) => state.selectedPoints.indexOf(i) === -1)
            };
        break;
        case 'TOGGLE_PROOF_VIEW':
            return {
                ...state,
                proofView: !state.proofView
            };
        break;
        case 'NUDGE_POINTS':
            console.log(points);
            selectedPoints.forEach(p => {
                let point = points[p];
                point.x += action.vector[0] * state.tablets[state.currentTabletIndex].options.layout.gridUnit;
                point.y += action.vector[1] * state.tablets[state.currentTabletIndex].options.layout.gridUnit;
            });
            return {
                ...state,
                points
            }
        break;
        default:
            return state
    }
}

// export default combineReducers({
//     point,
//     view
// });
