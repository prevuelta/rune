let signals = require('signals');

let events = [
    'addPath',
    'addPoint',
    'addRune',
    'addSubPath',
    'addTablet',
    'canvasCenter',
    'canvasCenterPre',
    'canvasMove',
    'clearPoints',
    'deletePath',
    'deletePoint',
    'deleteSelected',
    'deselectAll',
    'display',
    'draw',
    'gridUpdate',
    'loadRune',
    'loadTablet',
    'nextPoint',
    'nudge',
    'prevPoint',
    'redrawView',
    'refreshPanels',
    'reloadPanels',
    'renderSVG',
    'resetData',
    'saveTablet',
    'selectPath',
    'selectPoint',
    'showSvg',
    'superNudge',
    'toolSelected',
    'updateGridView',
    'zoomIn',
    'zoomOut'
];

Events = {};

events.forEach((event) => {
    Events[event] = new signals.Signal();
});

module.exports = Events;