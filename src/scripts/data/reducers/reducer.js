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
    paths: [{id: 0, rune: 0}],
    points: [],
    proofView: false
};

export default (state = initialState, action) => {
    console.log(action)
    let { points, selectedPoints } = state;
    switch (action.type) {
        case 'ADD_POINT':
            console.log("Adding point", action.point)
            let point = action.point;
            point.path = state.currentPathId;
            return { 
                ...state,
                points: points.concat(action.point)
            };
        case 'SELECT_POINT':
            let index = selectedPoints.indexOf(action.index);
            
            if (index > -1) {
                selectedPoints.splice(index, 1);
            } else {
                selectedPoints.push(action.index);
            }
            return {
                ...state,
                selectedPoints
            };
        break;
        case 'DESELECT_ALL':
            return {
                ...state,
                selectedPoints: []
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
