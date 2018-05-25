// import { insertAt } from '../../util';

export default function(state = {}, action) {
    return ({
        UPDATE_RUNE() {
            return {
                ...state,
                all: {
                    ...state.all,
                },
            };
        },
        ADJUST_RUNE_VALUE() {
            let rune = Object.assign({}, state.all[state.current]);
            rune[action.key] = Math.max(1, rune[action.key] + action.value);
            return {
                ...state,
                all: {
                    ...state.all,
                    [rune._id]: rune,
                },
            };
        },
    }[action.type] || (() => state))();
}
