'use strict';

import Tablet from '../models/tablet';

const initialTabletState = {
    all: [ Tablet({id: 0}) ],
    current: 0
};

export default function (state = initialTabletState, action) {

    switch (action.type) {

        case 'UPDATE_TABLET': 

            return {
                ...state,
                all: [
                    ...state.all.slice(0, state.current),
                    action.tablet,
                    ...state.all.slice(state.current+1)
                ]
            };

            break;
        case 'ADJUST_TABLET_VALUE':
            let tablet = Object.assign({}, state.all[state.current]);
            tablet[action.key] = Math.max(1, tablet[action.key] + action.value);
            return {
                ...state,
                all: [
                    ...state.all.slice(0, state.current),
                    tablet,
                    ...state.all.slice(state.current+1)
                ]
            }
            break;

        default:

            return state

            break;
    }
}
