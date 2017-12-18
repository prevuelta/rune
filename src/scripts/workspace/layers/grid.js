import React from 'react';
import { Line, Vline, Hline } from '../components/line';
import { Group } from '../components';
//import Styles = from '../../util/styles';
import { COLORS, POINT_TYPES } from '../../util/constants';
import WorkspaceUtil from '../workspaceUtil';

export function GridLines(props) {
    let { tablet: { gridUnit, x: tX, y: tY }, height, width } = props;
    let lines = [];
    for (let i = 0; i <= Math.max(tX, tY); i++) {
        for (let j = 0; j < 5; j++) {
            if (i < tX)
                lines.push(
                    <Vline
                        key={lines.length}
                        x={i * gridUnit + j * gridUnit / 5}
                        opacity={0.2}
                        color={COLORS.BLUE}
                        length={height}
                    />
                );
            if (i < tY)
                lines.push(
                    <Hline
                        key={lines.length}
                        y={i * gridUnit + j * gridUnit / 5}
                        opacity={0.2}
                        color={COLORS.BLUE}
                        length={width}
                    />
                );
        }
        if (i <= tY)
            lines.push(
                <Hline
                    key={lines.length}
                    y={i * gridUnit}
                    color={COLORS.BLUE}
                    length={width}
                />
            );
        if (i <= tX)
            lines.push(
                <Vline
                    key={lines.length}
                    x={i * gridUnit}
                    color={COLORS.BLUE}
                    length={height}
                />
            );
    }

    lines.push(
        <Hline
            key={lines.length}
            y={height / 2}
            color={COLORS.RED}
            length={width}
        />,
        <Vline
            key={lines.length + 1}
            x={width / 2}
            color={COLORS.RED}
            length={height}
        />
    );

    return <Group>{lines}</Group>;
}

export function GridNodes(props) {
    let { handlers, tablet, currentPath } = props;
    let { x: tX, y: tY, gridUnit } = tablet;
    let nodes = [];
    for (let x = 0; x <= tX; x++)
        for (let y = 0; y <= tY; y++) {
            let point = {
                x: x / tX,
                y: y / tY,
                path: props.currentPath,
                rune: props.rune,
                type: WorkspaceUtil.isArcMode
                    ? POINT_TYPES.ARC
                    : POINT_TYPES.STRAIGHT,
            };
            let k = x * (tY + 1) + y;
            nodes.push(
                <GridNode
                    grid={[x, y]}
                    key={k}
                    addPoint={e => handlers.addPoint(e, point)}
                    location={[
                        gridUnit * x + 2 - gridUnit / 2,
                        gridUnit * y + 2 - gridUnit / 2,
                    ]}
                    size={gridUnit - 4}
                />
            );
        }
    return <Group>{nodes}</Group>;
}

function GridNode(props) {
    let { location, addPoint, size } = props;
    return (
        <rect
            className="grid-node"
            x={location[0]}
            y={location[1]}
            width={size}
            height={size}
            fill={COLORS.BLUE}
            onClick={addPoint}
            fillOpacity={0.2}
        />
    );
}
