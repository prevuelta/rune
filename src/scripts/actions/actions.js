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

/* POINT */

export const deleteSelectedPoints = { type: 'DELETE_SELECTED_POINTS' };

export function nudge (vector, isSuper) {
    return {
        type: 'NUDGE',
        vector,
        isSuper
    };
};

/* WORKSPACE */

export const toggleProofView = { type: 'TOGGLE_PROOF_VIEW' };
