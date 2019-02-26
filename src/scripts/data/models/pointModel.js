'use strict';

import { guid } from '../../util/';

function PointFactory(data) {
    return {
        _id: guid(),
        ...data,
    };
}

export default PointFactory;
