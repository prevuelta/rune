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
    down: 40
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

            let ref = `${hasModifier && hasModifier + '+' || ''}${e.keyCode}`;

            console.log(ref);

            if (_this.maps[ref] && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                _this.maps[ref]();
            }
        });

        this.mapKey(this.key.delete, () => {
            Events.deleteSelected.dispatch();
        });

        return this;
    }
};

module.exports = Keys.init();