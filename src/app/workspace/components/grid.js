'use strict';

import React from 'react';
import {Line, Vline, Hline} from './line';
import Group from './group';
import GridNode from './gridNode';
//import Styles = from '../../util/styles';
import { COLORS } from '../../util/constants';

export function GridLines (props) {
    let { data } = props;
    console.log(props)
    let width = data.gridUnit * data.x;
    let height= data.gridUnit * data.y;
    console.log("Width", width, "Height", height)
    let lines = [
    ];
    for (let i = 0; i <= Math.max(data.x, data.y); i++) {
        for (let j = 0; j < 5; j++){
            if (i < data.x)
                lines.push(<Vline x={i *data.gridUnit+(j*data.gridUnit/5)} opacity={0.2} color={COLORS.BLUE} length={2000} />);
            if (i < data.y)
                lines.push(<Hline y={i *data.gridUnit+(j*data.gridUnit/5)} opacity={0.2} color={COLORS.BLUE} length={2000} />);
        };
        if (i <= data.y)
            lines.push(<Hline y={i*data.gridUnit} color={COLORS.BLUE} length={2000} />);
        if (i <= data.x)
            lines.push(<Vline x={i*data.gridUnit} color={COLORS.BLUE} length={2000} />);
    };
    lines.push(
            <Vline x={width/2} color={COLORS.RED} length={2000} />,
            <Hline y={height/2} color={COLORS.RED} length={2000} />,
        );
    return (
        <Group>
            {lines}
        </Group>
    );
}

export function GridNodes (props) {
    let {clickHandler, data} = props;
    console.log(props);
    return (
        <Group>
            <GridNode grid={[1,3]} clickHandler={clickHandler} location={[data.gridUnit * 1, data.gridUnit * 3]} />
        </Group>
    );
}
