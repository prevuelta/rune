'use strict';

function action (type) {
    return () => ({ type });
}
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

export const nextPoint = action('NEXT_POINT');

export const deleteSelectedPoints = () => ({ type: 'DELETE_SELECTED_POINTS' });

export function nudge (vector, isSuper) {
    return { type: 'NUDGE', vector };
}

/* WORKSPACE */

export const toggleProofView = action('TOGGLE_PROOF_VIEW');
export const deselectAllPoints = () => ({ type: 'DESELECT_ALL_POINTS' });

/* TABLET */

function adjust (key, value) {
    return () => ({ type: 'ADJUST_TABLET_VALUE', key, value});
}

export const updateTablet = tablet => ({ type: 'UPDATE_TABLET', tablet});
export const increaseX = adjust('x', 1);
export const increaseY = adjust('y', 1);
export const decreaseX = adjust('x', -1)
export const decreaseY = adjust('y', -1);
export const increaseGridUnit = adjust('gridUnit', 1);
export const decreaseGridUnit = adjust('gridUnit', -1);

/* PATH PANEL */

export const deletePath = id => ({ type: 'DELETE_PATH', id });
export const selectPath = id => ({ type: 'SELECT_PATH', id });
export const togglePathClosed = id => ({ type: 'TOGGLE_PATH_CLOSED', id });
export const addSubPath = id => ({ type: 'ADD_SUB_PATH', id });
export const addPath = () => ({ type: 'ADD_PATH' });
