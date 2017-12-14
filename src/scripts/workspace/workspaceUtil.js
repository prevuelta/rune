import Store from '../data/store';

export const Position = {
    getTablet() {
        const state = Store.getState();
        return state.tablet.all[state.tablet.current];
    },
    get tabletWidth() {
        const tablet = this.getTablet();
        return tablet.gridUnits * tablet.x;
    },
    get tabletHeight() {
        const tablet = this.getTablet();
        return tablet.gridUnits * tablet.y;
    },
    getAbsolute(coord) {
        return {
            x: coord.x * this.tabletWidth(),
            y: coord.y * this.tabletHeight(),
        };
    },
};
