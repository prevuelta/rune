'use strict';

export default store => next => action => {
    next(action);
    if (action.type === 'ADJUST_TABLET_VALUE') {
        // let state = store.getState();
        // let oldTablet = state.tablet.all[state.tablet.current];
        // let newTablet = { ...oldTablet, [action.key] : oldTablet[action.key] + action.value };
        // let xRatio = ( newTablet.gridUnit * newTablet.x ) / ( oldTablet.gridUnit * oldTablet.x );
        // let yRatio = ( newTablet.gridUnit * newTablet.y ) / ( oldTablet.gridUnit * oldTablet.y );
        // console.log(xRatio, yRatio);
        // store.dispatch({ type: 'RESIZE_POINTS', xRatio, yRatio});
    }
};
