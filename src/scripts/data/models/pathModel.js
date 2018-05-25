import { guid } from '../../util/';

function PathFactory(data) {
    return {
        _id: (data && data._id) || guid(),
        isClosed: (data && data.isClosed) || false,
        isActive: (data && data.isActive) || false,
        fill: 'none',
        stroke: 'red',
        children: [],
    };
}

export default PathFactory;
