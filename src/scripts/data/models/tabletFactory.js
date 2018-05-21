import nameGen from '../../util/nameGenerator';
import { guid } from '../../util';
import Constants from '../../util/constants';

const ViewModeEnum = {
    normal: 0,
    preview: 1,
};

function TabletFactory(data) {
    return {
        _id: (data && data._id) || guid(),
        name: (data && data.name) || nameGen(3),
        active: (data && data.active) || false,
        zoomLevel: (data && data.zoomLevel) || Constants.DEFAULT_ZOOM_LEVEL,
        gridUnit: 40,
        gridRatio: 1,
        x: 7,
        y: 10,
        viewMode: ViewModeEnum.normal,
    };
}

export default TabletFactory;
