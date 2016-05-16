let signals = require('signals');

let events = [
    'addPoint',
    'addPath',
    'addSubPath',
    'gridUpdate',
    'selectPoint',
    'selectPath',
    'deleteSelected',
    'deletePoint',
    'clearPoints',
    'drawToOverlay',
    'superNudge',
    'nudge',
    'display',
    'deselectAll',
    'redrawActiveLayer',
    'redrawCanvas',
    'draw',
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