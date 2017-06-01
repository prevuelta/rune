'use strict';

export function addPoint (point) {
    return {
        type: 'ADD_POINT',
        point
    };
}

export function selectPoint (index) {
    return {
        type: 'SELECT_POINT',
        index
    };
}

/* POINT ACTIONS */

export function deleteSelectedPoints (indices) {
    return {
        type: 'DELETE_SELECTED_POINTS',
        indices
    };
}

export const toggleProofView = { type: 'TOGGLE_PROOF_VIEW' };
