import { guid } from '../../util/';

function PathFactory(data) {
    console.log(data);
    return Object.assign(
        {},
        {
            _id: guid(),
            isClosed: false,
            isActive: false,
            fill: 'none',
            stroke: 'red',
            children: [],
        },
        data,
    );
}

export default PathFactory;
