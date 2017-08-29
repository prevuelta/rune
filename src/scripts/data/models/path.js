'use strict';

import Util from '../../util/util';

function PathFactory (data) {

    let id;

    if (data && !Number.isNaN(data.id)) {
        id = data.id;
    } else {
        id = Util.guid();
    }

    return {
        id,
        isClosed: data && data.isClosed || false,
        isActive: data && data.isActive || false,
        children: []
    };
}

export default PathFactory;
