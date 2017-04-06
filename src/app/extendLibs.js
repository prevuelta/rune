var paper = require('paper');

/* ========== Paper prototypes ========== */

paper.Point.prototype.getMid = function(p2) {
    return new paper.Point((this.x + p2.x) / 2, (this.y + p2.y) / 2);
};