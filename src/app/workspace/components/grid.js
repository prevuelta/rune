'use strict';

import React from 'react';
import Line from './line';
import Group from './group';
import GridNode from './gridNode';
//import Styles = from '../../util/styles';
import { COLORS } from '../../util/constants';

class Grid extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        let { data } = this.props;
        let width = data.gridUnit * data.x;
        let height= data.gridUnit * data.y;
        console.log("Width", width, "Height", height)
        let lines = [
        ];
        for (let i = 0; i <= Math.max(data.x, data.y); i++) {
            for (let j = 0; j < 5; j++){
                //if (i < data.x)
                    //lines.push(<Line x={i *data.gridUnit+(j*data.gridUnit/5)} opacity={0.2} color={COLORS.BLUE} length={2000} />);
                //if (i < data.y)
                    //lines.push(<Line y={i *data.gridUnit+(j*data.gridUnit/5)} opacity={0.2} color={COLORS.BLUE} length={2000} />);
            };
            if (i <= data.y)
                lines.push(<Line y={i*data.gridUnit} color={COLORS.BLUE} length={2000} />);
            if (i <= data.x)
                lines.push(<Line x={i*data.gridUnit} color={COLORS.BLUE} length={2000} />);
        };
        lines.push(
            <Line x={width/2} color={COLORS.RED} length={2000} />,
            <Line y={height/2} color={COLORS.RED} length={2000} />,
        );
        return (
            <Group>
                { lines }
                <GridNode />
            </Group>
        );
    }
}

export default Grid;
