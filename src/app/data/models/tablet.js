'use static';

import Rune from './rune';
import Grid from './grid';

import nameGen from '../../util/nameGenerator';
import Util from '../../util/util';
import Constants from '../../util/const';

const tablet =  {
    setActiveRune (rune) {
        this.activeRune = rune;
    },

    increaseZoom () {
        this.options.zoomLevel++;
    },

    decreaseZoom () {
        this.options.zoomLevel--;
    }
}

const ViewModeEnum = {
    normal: 0,
    preview: 1
};

function TabletFactory (data) {

    let tabletData = {
        name: data && data.name || nameGen(3),
        active: data && data.active || false,
        id: data && data.id || Util.guid(),
        options: {
            grid: Grid(data && data.options),
            zoomLevel: data && data.zoomLevel || Constants.DEFAULT_ZOOM_LEVEL,
            size: data && data.size || {x : 9, y : 15},
            viewMode: ViewModeEnum.normal
        },
        runes: data && data.runes.map(rune => Rune(rune)) || [Rune()],
    };

    tabletData.activeRune = tabletData.runes[0];

    return Object.assign(Object.create(tablet), tabletData);
}

export default TabletFactory;
