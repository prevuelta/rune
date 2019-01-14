'use strict';

import { guid } from '../../util/';

function PathFactory(data) {
    return {
        _id: guid(),
        isClosed: false,
        isActive: false,
        fill: 'none',
        stroke: 'red',
        children: [],
        ...data,
    };
}

export default PathFactory;
