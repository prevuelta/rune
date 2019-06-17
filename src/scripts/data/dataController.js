'use strict';

import Store from '../data/store';

export default {
    getRunes(state) {
        return this.getAll('runes', state);
    },
    getAll(key, state = Store.getState()) {
        // return Object.values(state[key].all);
        return state[key];
    },
    getRune(state) {
        return this.getCurrent('runes', state);
    },
    getPath(state) {
        return this.getCurrent('paths', state);
    },
    getCurrent(key, state = Store.getState()) {
        const { selected } = state.app.selected[key];
        return state[key][selected];
        // return state[model].all[state[model].current];
    },
};
