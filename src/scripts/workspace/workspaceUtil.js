import Store from '../data/store';
import { MODE } from '../util/constants';

export default {
    get isDrawingMode() {
        return Store.getState().app.mode === MODE.DRAW;
    },
    get isArcMode() {
        return Store.getState().app.node === MODE.ARC;
    },

    get isNormalMode() {
        return Store.getState().app.node === MODE.NORMAL;
    },
};

export const Position = {
    get tabletSize() {
        return { width: this.tabletWidth, height: this.tabletHeight };
    },
    getTablet() {
        const state = Store.getState();
        return state.tablet.all[state.tablet.current];
    },
    get tabletWidth() {
        const tablet = this.getTablet();
        return tablet.gridUnit * tablet.x;
    },
    get tabletHeight() {
        const tablet = this.getTablet();
        return tablet.gridUnit * tablet.y;
    },
    getAbsolute(coord) {
        return {
            x: coord.x * this.tabletWidth,
            y: coord.y * this.tabletHeight,
        };
    },
};
