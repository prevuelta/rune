import Store from '../data/store';

export default {
    getRunes(state) {
        return this.getAll('rune', state);
    },
    getAll(key, state = Store.getState()) {
        return Object.values(state[key].all);
    },
    getRune(state) {
        return this.getCurrent('rune', state);
    },
    getPath(state) {
        return this.getCurrent('path', state);
    },
    getTablet(state) {
        return this.getCurrent('tablet', state);
    },
    getCurrent(model, state = Store.getState()) {
        return state[model].all[state[model].current];
    },
};
