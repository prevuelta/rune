'use strict';

let Events = require('./Events');

const MODIFIERS = {
    'shift',
    'ctrl'
};

let Keys {
    init: () => {
        document.addEventListener('keydown', function(e) {
            console.log(e);
            if (this.keys[e.keyCode] && e.target.tagName !== 'INPUT') {
                this.keys[e.keyCode]();
            }
        });

        this.addKey(8, () => {
            Events.deleteSelected.dispatch();
        });
    },
    addKey: (key, callback) => {
        if (!isNaN(parseFloat(key) && isFinite(key)) {

        } else {
            let [modifier, keyCode] = key.split('+');
        }
        if (key) {
            throw new Error('Key already mapped, soz bro.');
        }
        this.keys[key] = callback;
    }
};

module.exports = Keys;