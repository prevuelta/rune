let signals = require('signals');

let events = [
    'addPoint',
    'addPath',
    'selectPoint',
    'deleteSelected',
    'deletePoint',
    'clearPoints',
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




