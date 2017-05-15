'use strict';

let GridRoot =  {
    getRes (zoomLevel) {
        return {
            x: zoomLevel * 1,
            y: zoomLevel * this.ratio
        }
    }
}

function Grid (ratio = 1, size = 20) {

    let newGrid = {
        ratio,
        size
    };

    return Object.assign(Object.create(GridRoot), newGrid);

}

export default Grid;