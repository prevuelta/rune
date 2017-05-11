'use strict';

import React from 'react';
import Line from './line';
import Group from './group';
//import Styles = from '../../util/styles';
import { COLORS } from '../../util/constants';

class Grid extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        let { data } = this.props;
        let lines = [];
        for (let i = 0; i < Math.max(data.x, data.y); i++) {
            if (i < data.y)
                lines.push(<Line y={i*data.gridUnit} color={COLORS.BLUE} length={2000} />);
            if (i < data.x)
                lines.push(<Line x={i*data.gridUnit} color={COLORS.BLUE} length={2000} />);
        };
        return (
            <Group>
                { lines }
            </Group>
        );
    }
}

export default Grid;
