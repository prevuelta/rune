function action(type) {
    return () => ({ type });
}

/* WORKSPACE */

export const setDrawMode = () => ({ type: 'TOGGLE_MODE', mode: 1 });
export const setNormalMode = () => ({ type: 'TOGGLE_MODE', mode: 0 });
export const toggleMode = mode => ({ type: 'TOGGLE_MODE', mode });
export const toggleProofView = action('TOGGLE_PROOF_VIEW');
export const toggleHelp = action('TOGGLE_HELP');
export const deselectAllPoints = action('DESELECT_ALL_POINTS');

/* DRAWING */

export const drawArc = () => ({ type: 'DRAW_ARC' });

/* POINT */

export function addPoint(e, point) {
    e.stopPropagation();
    return {
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

/* TABLET */

function adjust(key, value) {
    return () => ({ type: 'ADJUST_TABLET_VALUE', key, value });
}

export const updateTablet = tablet => ({ type: 'UPDATE_TABLET', tablet });
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
