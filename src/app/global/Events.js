let signals = require('signals');

let events = [
    'addPath',
    'addPoint',
    'addTablet',
    'addSubPath',
    'canvasMove',
    'canvasCenterPre',
    'canvasCenter',
    'clearPoints',
    'deletePoint',
    'deleteSelected',
    'deletePath',
    'deselectAll',
    'display',
    'draw',
    'renderSVG',
    'gridUpdate',
    'updateGridView',
    'loadTablet',
    'nextPoint',
    'nudge',
    'prevPoint',
    'redrawView',
    'refreshPanels',
    'reloadPanels',
    'resetData',
    'saveTablet',
    'selectPath',
    'selectPoint',
    'superNudge',
    'toolSelected',
    'zoomIn',
    'zoomOut'
];

Events = {};

events.forEach((event) => {
    Events[event] = new signals.Signal();
});

module.exports = Events;