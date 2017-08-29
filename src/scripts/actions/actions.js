'use strict';

/* POINT */

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


export const deleteSelectedPoints = () => ({ type: 'DELETE_SELECTED_POINTS' });

export function nudge (vector, isSuper) {
    return {
        type: 'NUDGE',
        vector,
    };
};

/* WORKSPACE */

export const toggleProofView = () => ({ type: 'TOGGLE_PROOF_VIEW' });
export const deselectAllPoints = () => ({ type: 'DESELECT_ALL_POINTS' });

/* PANELS */

export const updateTabletLayout = layout => ({ type: 'UPDATE_TABLET_LAYOUT', layout});

/* PATH PANEL */

export const deletePath = id => ({ type: 'DELETE_PATH', id });
export const selectPath = id => ({ type: 'SELECT_PATH', id });
export const togglePathClosed = id => ({ type: 'TOGGLE_PATH_CLOSED', id });
export const addSubPath = id => ({ type: 'ADD_SUB_PATH', id });
export const addPath = () => ({ type: 'ADD_PATH' });
