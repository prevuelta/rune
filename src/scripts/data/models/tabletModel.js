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
        zoomLevel: (data && data.zoomLevel) || Constants.DEFAULT_ZOOM_LEVEL,
        viewMode: ViewModeEnum.normal,
    };
}

export default TabletFactory;
