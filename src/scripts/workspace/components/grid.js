'use strict';

import React from 'react';
import {Line, Vline, Hline} from './line';
import Group from './group';
//import Styles = from '../../util/styles';
import { COLORS } from '../../util/constants';

export function GridLines (props) {
    let { layout } = props;
    let width = layout.gridUnit * layout.size.x;
    let height= layout.gridUnit * layout.size.y;
    let lines = [
    ];
    for (let i = 0; i <= Math.max(layout.x, layout.y); i++) {
        for (let j = 0; j < 5; j++){
            if (i < layout.x)
                lines.push(<Vline x={i *layout.gridUnit+(j*layout.gridUnit/5)} opacity={0.2} color={COLORS.BLUE} length={height} />);
            if (i < layout.y)
                lines.push(<Hline y={i *layout.gridUnit+(j*layout.gridUnit/5)} opacity={0.2} color={COLORS.BLUE} length={width} />);
        };
        if (i <= layout.y)
            lines.push(<Hline y={i*layout.gridUnit} color={COLORS.BLUE} length={width} />);
        if (i <= layout.x)
            lines.push(<Vline x={i*layout.gridUnit} color={COLORS.BLUE} length={height} />);
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
    let { handlers, layout} = props;
    let nodes = [];
    for (let x = 0; x <= layout.size.x; x++) for (let y = 0; y <= layout.size.y;y++) {
        let point = {x:x*layout.gridUnit, y:y*layout.gridUnit, rune: props.rune};
        let k = x*(layout.size.y+1)+y;
        nodes.push(<GridNode
            grid={[x,y]}
            key={k}
            addPoint={e => handlers.addPoint(e, point)}
            location={[(layout.gridUnit * x)+2-layout.gridUnit/2, (layout.gridUnit * y)+2-layout.gridUnit/2]}
            size={layout.gridUnit-4} />
        );
    };
    return (
        <Group>
            { nodes }
        </Group>
    );
}

function GridNode (props) {
    let {location, addPoint, size} = props;
    return (
        <rect className="grid-node" x={location[0]} y={location[1]} width={size} height={size} fill={COLORS.BLUE} onClick={addPoint} fillOpacity={0.2} />
    );
}
