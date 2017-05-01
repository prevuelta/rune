'use strict';

import React from 'react';
import Paper from '../../canvas/paper';
import Line from './line';
import Group from './group';

class Grid extends React.Component {

    constructor (props) {
        super(props);
        console.log("Grid data", props.data);
    }

    render () {
        let {size} = this.props.data;
        let sizeArr = new Array(size).fill(size);
        return (
            <Group>
                {
                    sizeArr.map((s, i) => <Line x={i*10} y={0} color="red" length={2000} />)
                }
            </Group>
        );
    }
}

export default Grid;