import Store from '../data/store';
import * as actions from '../actions/actions';
import { MODE } from '../util/constants';

const MODIFIERS = ['shiftKey', 'ctrlKey', 'metaKey'];

const keyCodes = {
    8: 'delete',
    27: 'esc',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'h',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    86: 'v',
    187: '+',
    189: '-',
    219: '[',
    221: ']',
};

var nudgeVectors = {
    up: [0, -0.1],
    down: [0, 0.1],
    left: [-0.1, 0],
    right: [0.1, 0],
    'shiftKey+up': [0, -1],
    'shiftKey+down': [0, 1],
    'shiftKey+left': [-1, 0],
    'shiftKey+right': [1, 0],
};

let keys = {};

Object.keys(nudgeVectors).forEach(k => {
    keys[k] = () => {
        let state = Store.getState();
        let tablet = state.tablet.all[state.tablet.current];
        let { x, y } = tablet;
        let v = nudgeVectors[k];
        return {
            type: 'NUDGE_POINTS',
            vector: [v[0] * (1 / x), v[1] * (1 / y)],
        };
    };
});

const globalActions = {
    v: actions.toggleProofView,
    h: actions.toggleHelp,
    esc: actions.setNormalMode,
};

const modeActions = {
    [MODE.DRAW]: {
        a: actions.drawArc,
        p: actions.addPath,
    },
    [MODE.NORMAL]: {
        d: actions.setDrawMode,
        delete: actions.deleteSelectedPoints,
        c: actions.togglePathClosed,
        n: actions.nextPoint,
        f: actions.togglePathFill,
        'ctrlKey+]': actions.increaseX,
        'ctrlKey+[': actions.decreaseX,
        'ctrlKey+a': actions.selectAll,
        'shiftKey+ctrlKey+]': actions.increaseY,
        'shiftKey+ctrlKey+[': actions.decreaseY,
        'ctrlKey++': actions.increaseGridUnit,
        'ctrlKey+-': actions.decreaseGridUnit,
        ...keys,
    },
    [MODE.ARC]: {
        f: actions.flipArc,
        c: actions.toggleCenterLock,
    },
};

document.addEventListener('keydown', function(e) {
    console.log();
    let mode = Store.getState().app.mode;
    if (!e.metaKey) {
        // e.preventDefault();
    }
    let hasModifier = MODIFIERS.filter(m => e[m]).join('+');
    let ref = `${hasModifier && hasModifier + '+'}${keyCodes[e.keyCode] ||
        e.keyCode}`;
    if (e.target.tagName !== 'INPUT') {
        let action;
        if (globalActions[ref]) {
            action = globalActions[ref]();
        } else if (modeActions[mode][ref]) {
            action = modeActions[mode][ref]();
        }
        if (action) {
            e.preventDefault();
            Store.dispatch(action);
        }
    }
});
