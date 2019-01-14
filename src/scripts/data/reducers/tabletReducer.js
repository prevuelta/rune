'use strict';

const initialTabletState = {};

export default function(state = initialTabletState, action) {
    return ({}[action.type] || (() => state))();
}
