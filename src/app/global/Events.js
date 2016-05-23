let signals = require('signals');

let events = [
    'addPath',
    'addPoint',
    'addTablet',
    'addSubPath',
    'clearPoints',
    'deletePoint',
    'deleteSelected',
    'deletePath',
    'deselectAll',
    'display',
    'draw',
    'gridUpdate',
    'updateGridView',
    'loadTablet',
    'nudge',
    'redrawCanvas',
    'refreshPanels',
    'reloadPanels',
    'selectPath',
    'selectPoint',
    'superNudge',
    'zoomIn',
    'zoomOut'
];

Events = {};

events.forEach((event) => {
    Events[event] = new signals.Signal();
});

module.exports = Events;