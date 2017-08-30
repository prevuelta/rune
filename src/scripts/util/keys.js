'use strict';

import Store from '../data/store';

import * as actions from '../actions/actions';

const MODIFIERS = [
    'shiftKey',
    'ctrlKey',
    'metaKey'
];

const keyCodes = {
    8: 'delete',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    67: 'c',
    75: 'k',
    76: 'l',
    78: 'n',
    80: 'p', 
    187: '+',
    189: '-',
    219: '[',
    221: ']',
};

var nudgeVectors = {
    'up' : [0,-0.1],
    'down': [0,0.1],
    'left' : [-0.1,0],
    'right' : [0.1,0],
    'shiftKey+up' : [0,-1],
    'shiftKey+down': [0,1],
    'shiftKey+left' : [-1,0],
    'shiftKey+right' : [1,0]
};

let keys = {};

Object.keys(nudgeVectors).forEach(k => {
    keys[k] = () => {
        let state = Store.getState();
        let tablet = state.tablet.all[state.tablet.current];
        let { x, y } = tablet;
        let v = nudgeVectors[k];
        return {type: 'NUDGE_POINTS', vector: [v[0]*(1/x), v[1]*(1/y)] };
    };
});

let keyActions = {
    'delete': actions.deleteSelectedPoints,
    'p' : actions.toggleProofView,
    'n' : actions.nextPoint,
    'ctrlKey+]': actions.increaseX,
    'ctrlKey+[': actions.decreaseX,
    'shiftKey+ctrlKey+]': actions.increaseY,
    'shiftKey+ctrlKey+[': actions.decreaseY,
    'ctrlKey++': actions.increaseGridUnit,
    'ctrlKey+-': actions.decreaseGridUnit,
    'c' : actions.togglePathClosed,
    ...keys
};

document.addEventListener('keydown', function(e) {
    if (!e.metaKey) {
        // e.preventDefault();
    }
    let hasModifier = MODIFIERS.filter(m => e[m]).join('+');
    let ref = `${hasModifier && hasModifier + '+'}${keyCodes[e.keyCode] || e.keyCode}`;
    console.log('Key pressed: ', ref);
    if (keyActions[ref] && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        let action = keyActions[ref];
        console.log('Key action: ', action);
        Store.dispatch(action());
    }
});

// 
// let Keys = {
//     key: keyMap,
//     maps: {},
//     mapKey (key, callback) {
//         if (this.maps[key]) {
//             throw new Error('Key already mapped, soz bro.');
//         }
//         this.maps[key] = callback;
//     },
//     init () {
//         let _this = this;

//         this.mapKey(this.key.delete, () => {
//             Events.deleteSelected.dispatch();
//         });

//         this.mapKey(this.key.p, () => {
//             Events.display.dispatch();
//         });

//         this.mapKey(this.key.l, () => {
//             Events.nextPoint.dispatch();
//         });


//         this.mapKey(this.key.k, () => {
//             Events.prevPoint.dispatch();
//         });

//         Object.keys({
//             'up' : this.key.up,
//             'down' : this.key.down,
//             'left' : this.key.left,
//             'right' : this.key.right,
//         }).forEach(key => {
//             Keys.mapKey(`shiftKey+${Keys.key[key]}`, () => {
//                 Events.nudge.dispatch(superNudgeVectors[key]);
//             });
//             Keys.mapKey(`${Keys.key[key]}`, () => {
//                 Events.nudge.dispatch(nudgeVectors[key]);
//             });
//         });

//         document.addEventListener('mousewheel', mouseScroll);

//         function mouseScroll (e) {
//             let delta = e.wheelDelta;
//             console.log('delta', delta);
//             if (delta < 0) {
//                 Events.zoomIn.dispatch();
//             } else {
//                 Events.zoomOut.dispatch();
//             }
//         }
//         return this;
//     }
// };
