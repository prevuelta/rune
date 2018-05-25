import nameGen from '../../util/nameGenerator';
import { guid } from '../../util';
import Constants from '../../util/constants';

function RuneFactory(data) {
    return {
        _id: (data && data._id) || guid(),
        tablet: (data && data.tablet) || null,
        name: (data && data.name) || nameGen(3),
        active: (data && data.active) || false,
        gridUnit: 40,
        gridRatio: 1,
        x: 7,
        y: 10,
    };
}

export default RuneFactory;
