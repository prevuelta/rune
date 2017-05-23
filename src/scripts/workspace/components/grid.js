'use strict';

import React from 'react';
import {Line, Vline, Hline} from './line';
import Group from './group';
//import Styles = from '../../util/styles';
import { COLORS } from '../../util/constants';

<<<<<<< HEAD
export default function GridNode (props) {
    let {location, clickHandler, radius} = props;
    return (
        <circle className="grid-node" cx={location[0]} cy={location[1]} r={radius} fill={"red"} onClick={clickHandler} fillOpacity={0.4} />
    );
}
=======
>>>>>>> eb8c3e9cd69b3f1e6ae890cb0dd60981f9ecf715

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
                lines.push(<Vline x={i *data.gridUnit+(j*data.gridUnit/5)} opacity={0.2} color={COLORS.BLUE} length={height} />);
            if (i < data.y)
                lines.push(<Hline y={i *data.gridUnit+(j*data.gridUnit/5)} opacity={0.2} color={COLORS.BLUE} length={width} />);
        };
        if (i <= data.y)
            lines.push(<Hline y={i*data.gridUnit} color={COLORS.BLUE} length={width} />);
        if (i <= data.x)
            lines.push(<Vline x={i*data.gridUnit} color={COLORS.BLUE} length={height} />);
    };
    lines.push(
            <Hline y={height/2} color={COLORS.RED} length={width} />,
            <Vline x={width/2} color={COLORS.RED} length={height} />,
        );
    return (
        <Group>
            {lines}
        </Group>
    );
}

export function GridNodes (props) {
    let {clickHandler, data} = props;
    let nodes = [];
    for (let x = 0; x <= data.x; x++) for (let y = 0; y <= data.y;y++) {
        let point = {x:x*data.gridUnit, y:y*data.gridUnit};
        let k = x*(data.y+1)+y;
        nodes.push(<GridNode
            grid={[x,y]}
            key={k}
            clickHandler={clickHandler.bind(null, point)}
            location={[(data.gridUnit * x)+2-data.gridUnit/2, (data.gridUnit * y)+2-data.gridUnit/2]}
            size={data.gridUnit-4} />
        );
    };
    return (
        <Group>
            { nodes }
        </Group>
    );
}

function GridNode (props) {
    let {location, clickHandler, size} = props;
    return (
        <rect className="grid-node" x={location[0]} y={location[1]} width={size} height={size} fill={"red"} onClick={clickHandler} fillOpacity={0.4} />
    );
}
