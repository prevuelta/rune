'use strict';

let Events = require('./Events');

const MODIFIERS = [
    'shiftKey',
    'ctrlKey'
];

const keyMap = {
    delete: 8,
    tab: 9,
    enter: 13,
    esc: 27,
    space: 32,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    p: 80,
    k: 75,
    l: 76
};

var superNudgeVectors = {
    'up' : [0,-1],
    'down': [0,1],
    'left' : [-1,0],
    'right' : [1,0]
};

var nudgeVectors = {
    'up' : [0,-0.1],
    'down': [0,0.1],
    'left' : [-0.1,0],
    'right' : [0.1,0]
};


let Keys = {
    key: keyMap,
    maps: {},
    mapKey (key, callback) {
        if (this.maps[key]) {
            throw new Error('Key already mapped, soz bro.');
        }
        this.maps[key] = callback;
    },
    init () {
        let _this = this;
        document.addEventListener('keydown', function(e) {
            let hasModifier = MODIFIERS.find(mod => e[mod]);

            console.log("Keycode", e.keyCode);

            let ref = `${hasModifier && hasModifier + '+' || ''}${e.keyCode}`;

            if (_this.maps[ref] && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                _this.maps[ref]();
            }
        });

        this.mapKey(this.key.delete, () => {
            Events.deleteSelected.dispatch();
        });

        this.mapKey(this.key.p, () => {
            Events.display.dispatch();
        });

        this.mapKey(this.key.l, () => {
            Events.nextPoint.dispatch();
        });


        this.mapKey(this.key.k, () => {
            Events.prevPoint.dispatch();
        });

        Object.keys({
            'up' : this.key.up,
            'down' : this.key.down,
            'left' : this.key.left,
            'right' : this.key.right,
        }).forEach(key => {
            Keys.mapKey(`shiftKey+${Keys.key[key]}`, () => {
                Events.nudge.dispatch(superNudgeVectors[key]);
                Events.redrawPanels.dispatch();
            });
            Keys.mapKey(`${Keys.key[key]}`, () => {
                Events.nudge.dispatch(nudgeVectors[key]);
                Events.redrawPanels.dispatch();
            });
        });

        return this;
    }
};

module.exports = Keys.init();