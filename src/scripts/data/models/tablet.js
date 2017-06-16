'use static';

import nameGen from '../../util/nameGenerator';
import Util from '../../util/util';
import Constants from '../../util/constants';

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

    return {
        name: data && data.name || nameGen(3),
        active: data && data.active || false,
        id,
        options: {
            zoomLevel: data && data.zoomLevel || Constants.DEFAULT_ZOOM_LEVEL,
            layout: {
                gridUnit: 40,
                gridRatio: 1,
                size: {
                    x: 7,
                    y: 10
                } 
            },
            viewMode: ViewModeEnum.normal
        }
    };
}

export default TabletFactory;
