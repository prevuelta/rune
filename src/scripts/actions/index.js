'use strict';

import { MODE } from '../util/constants';
import { guid } from '../util';

function action(type) {
    return () => ({ type });
}

/* WORKSPACE */

export const setDrawMode = () => ({ type: 'TOGGLE_MODE', mode: MODE.DRAW });
export const setDocumentMode = () => ({
    type: 'TOGGLE_MODE',
    mode: MODE.DOCUMENT,
});
export const toggleMode = mode => ({ type: 'TOGGLE_MODE', mode });
export const toggleProofView = action('TOGGLE_PROOF_VIEW');
export const toggleHelp = action('TOGGLE_HELP');
export const deselectAllPoints = action('DESELECT_ALL_POINTS');

/* DRAWING */

export const drawArc = () => ({ type: 'DRAW_ARC' });

/* POINT */

export function addPoint(point) {
    return {
        id: guid(),
        type: 'ADD_POINT',
        point,
    };
}

export function selectPoint(e, index) {
    e.stopPropagation();
    return {
        type: e.shiftKey ? 'ADD_SELECT_POINT' : 'SELECT_POINT',
        index,
    };
}

export const selectAll = action('SELECT_ALL');
export const nextPoint = action('NEXT_POINT');
export const deleteSelectedPoints = action('DELETE_SELECTED_POINTS');

export function nudge(vector, isSuper) {
    return { type: 'NUDGE', vector };
}

export function updatePoint(id, data) {
    return { type: 'UPDATE_POINT', id, data };
}

export function sendInstructions(instructions) {
    return { type: 'SEND_INSTRUCTIONS', instructions };
}

/* TABLET */

function adjust(key, value) {
    return () => ({ type: 'ADJUST_RUNE_VALUE', key, value });
}

export const updateTablet = tablet => ({ type: 'UPDATE_RUNE', tablet });
export const increaseX = adjust('x', 1);
export const increaseY = adjust('y', 1);
export const decreaseX = adjust('x', -1);
export const decreaseY = adjust('y', -1);
export const increaseGridUnit = adjust('gridUnit', 1);
export const decreaseGridUnit = adjust('gridUnit', -1);

/* PATH PANEL */

export const deletePath = id => ({ type: 'DELETE_PATH', id });
export const selectPath = id => ({ type: 'SELECT_PATH', id });
export const togglePathClosed = id => ({ type: 'TOGGLE_PATH_CLOSED', id });
export const addSubPath = id => ({ type: 'ADD_SUB_PATH', id });
export const addPath = () => ({ type: 'ADD_PATH' });
export const togglePathFill = id => ({ type: 'TOGGLE_PATH_FILL', id });
