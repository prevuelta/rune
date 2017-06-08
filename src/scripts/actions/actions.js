'use strict';

export function addPoint (e, point) {
    e.stopPropagation();
    return {
        type: 'ADD_POINT',
        point
    };
}

export function selectPoint (e, index) {
    e.stopPropagation();
    return {
        type: e.shiftKey ? 'ADD_SELECT_POINT' : 'SELECT_POINT',
        index
    };
}

/* POINT */

export const deleteSelectedPoints = { type: 'DELETE_SELECTED_POINTS' };

export function nudge (vector, isSuper) {
    return {
        type: 'NUDGE',
        vector,
    };
};

/* WORKSPACE */

export const toggleProofView = () => ({ type: 'TOGGLE_PROOF_VIEW' });
export const deselectAllPoints = () => ({ type: 'DESELECT_ALL_POINTS' });
