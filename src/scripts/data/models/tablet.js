'use static';

import Rune from './rune';
import Grid from './grid';

import nameGen from '../../util/nameGenerator';
import Util from '../../util/util';
import Constants from '../../util/constants';

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
    let id;
    if (data && !Number.isNaN(data.id)) {
        id = data.id;
    } else {
        id = Util.guid();
    }

    let tabletData = {
        name: data && data.name || nameGen(3),
        active: data && data.active || false,
        id,
        options: {
            zoomLevel: data && data.zoomLevel || Constants.DEFAULT_ZOOM_LEVEL,
            layout: {
                gridUnit: 40,
                gridRatio: 1,
                x: 7,
                y: 10
            },
            viewMode: ViewModeEnum.normal
        }
    };

    console.log(tabletData);

    // tabletData.activeRune = tabletData.runes[0];

    return Object.assign(Object.create(tablet), tabletData);
}

export default TabletFactory;
