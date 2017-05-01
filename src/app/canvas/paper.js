'use strict';

import paper from 'paper';

function init () {
    let canvas = document.getElementById('rune-canvas');
    paper.setup(canvas).install(window);
    paper.settings.handleSize = 8;
    let view = paper.View['_viewsById']['rune-canvas'];
    view.zoom = 1;
    return {
        canvas,
        view,
        paper
    }
}

export default init();
