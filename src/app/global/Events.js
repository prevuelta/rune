let signals = require('signals');

let events = [
    'addPoint',
    'addPath',
    'selectPoint',
    'selectPath',
    'deleteSelected',
    'deletePoint',
    'clearPoints',
    'drawToOverlayer',
    'superNudge',
    'nudge',
    'display',
    'deselectAll',
    'refreshCanvas',
    'redraw',
    'reloadPanels',
    'refreshPanels',
    'zoomIn',
    'zoomOut'
];

Events = {};

events.forEach((event) => {
    Events[event] = new signals.Signal();
});

module.exports = Events;