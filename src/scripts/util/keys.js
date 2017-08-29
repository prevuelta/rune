'use strict';

import Store from '../data/store';

import {
    deleteSelectedPoints,
    toggleProofView,
} from '../actions/actions';

const MODIFIERS = [
    'shiftKey',
    'ctrlKey'
];

const keyMap = {
    8: 'delete',
    tab: 9,
    enter: 13,
    esc: 27,
    space: 32,
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    80: 'p', 
    k: 75,
    l: 76
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
        let { options: { layout: { gridUnit } } } = tablet;
        let v = nudgeVectors[k];
        return {type: 'NUDGE_POINTS', vector: [v[0]*gridUnit, v[1]*gridUnit] };
    };
});

let keyActions = {
    delete: deleteSelectedPoints,
    p : toggleProofView,
    ...keys
};

document.addEventListener('keydown', function(e) {
    let hasModifier = MODIFIERS.find(mod => e[mod]);
    let ref = `${hasModifier && hasModifier + '+' || ''}${keyMap[e.keyCode] || e.keyCode}`;
    console.log('Key pressed: ', ref);
    if (keyActions[ref] && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        let action = keyActions[ref];
        console.log("Key action: ", action);
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
//             console.log("delta", delta);
//             if (delta < 0) {
//                 Events.zoomIn.dispatch();
//             } else {
//                 Events.zoomOut.dispatch();
//             }
//         }
//         return this;
//     }
// };
