'use strict';

import React from 'react';
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
                    sizeArr.map((s, i) => {
                        return (
                            <Group>
                                <Line x={i*10} y={0} color="red" length={2000} />
                                <Line y={i*10} x={0} color="red" length={2000} />
                            </Group>
                        );
                    })
                }
            </Group>
        );
    }
}

export default Grid;