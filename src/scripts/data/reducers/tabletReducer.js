import TabletFactory from '../models/tabletFactory';

const initialTabletState = (function() {
    const tablet = TabletFactory();
    return {
        all: [tablet],
        current: tablet._id,
    };
})();

export default function(state = initialTabletState, action) {
    return ({
        UPDATE_TABLET() {
            return {
                ...state,
                all: [
                    ...state.all.slice(0, state.current),
                    action.tablet,
                    ...state.all.slice(state.current + 1),
                ],
            };
        },
        ADJUST_TABLET_VALUE() {
            let tablet = Object.assign({}, state.all[state.current]);
            tablet[action.key] = Math.max(1, tablet[action.key] + action.value);
            return {
                ...state,
                all: [
                    ...state.all.slice(0, state.current),
                    tablet,
                    ...state.all.slice(state.current + 1),
                ],
            };
        },
    }[action.type] || (() => state))();
}
