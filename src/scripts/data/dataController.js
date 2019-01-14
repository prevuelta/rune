import Store from '../data/store';

export default {
    getRunes(state) {
        return this.getAll('runes', state);
    },
    getAll(key, state = Store.getState()) {
        return Object.values(state[key].all);
    },
    getRune(state) {
        return this.getCurrent('runes', state);
    },
    getPath(state) {
        return this.getCurrent('paths', state);
    },
    getTablet(state) {
        return this.getCurrent('tablets', state);
    },
    getCurrent(model, state = Store.getState()) {
        return state[model].all[state[model].current];
    },
};
