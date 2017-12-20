import React, { Component } from 'react';
import { GridLines, GridNodes } from '../layers/grid';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import { Group, Point } from '.';
import { COLORS, POINT_TYPES } from '../../util/constants';
import { Overlay } from '../layers';

const SLUG = 20;

const POINT_TYPE_STRING = {
    [POINT_TYPES.STRAIGHT]: (mX, mY) => `L ${mX} ${mY}`,
    [POINT_TYPES.ARC]: (mX, mY) => `A 50 50 0 0 1 ${mX} ${mY}`,
};

function BGLayer(props) {
    let { height, width } = props;
    return (
        <svg id="background" height={height} width={width}>
            <GridLines {...props} />
        </svg>
    );
}

function Helpers(props) {
    let { mousePosition, point, width, height, tablet: { gridUnit } } = props;

    let mX = (mousePosition && mousePosition.x) || 0;
    let mY = (mousePosition && mousePosition.y) || 0;

    // mX = (Math.round(mX * width / gridUnit) * gridUnit );
    // mY = (Math.round(mY * height / gridUnit) * gridUnit );
    mX = Math.round(mX / gridUnit) * gridUnit;
    mY = Math.round(mY / gridUnit) * gridUnit;

    let pX = point.x * width;
    let pY = point.y * height;

    let str = `M ${pX} ${pY} ${POINT_TYPE_STRING[point.type](mX, mY)}`;

    let stroke = 'red';

    return (
        <svg>
            {props.mousePosition && (
                <path
                    stroke={stroke}
                    fill="none"
                    pointerEvents="none"
                    d={str}
                />
            )}
        </svg>
    );
}

function RenderLayer(props) {
    let { height, width, paths, pathPoints } = props;

    let stroke;

    function _mouseEnter() {
        console.log('Path hover');
        stroke = 3;
    }

    console.log('Pathpoints', pathPoints);

    return (
        <svg id="render" height={height} width={width}>
            {pathPoints.map((points, i) => {
                let str = points.map(
                    (p, i) =>
                        `${i ? 'L' : 'M'} ${p.x * width} ${p.y * height} `,
                );
                let path = props.paths[i];
                if (path.isClosed) str += 'Z';
                console.log(path);
                return (
                    <path
                        key={i}
                        d={str}
                        stroke={stroke || path.stroke}
                        strokeWidth={stroke || 1}
                        fill={path.fill}
                        onMouseEnter={_mouseEnter}
                    />
                );
            })}
        </svg>
    );
}

function Rune(props) {
    let {
        points,
        tablet,
        pathPoints,
        paths,
        selectedPoints,
        proofView,
        currentPath,
        mode,
    } = props;
    let height = tablet.y * tablet.gridUnit;
    let width = tablet.x * tablet.gridUnit;
    let size = { width, height };

    return (
        <div
            className="rune"
            style={{
                width,
                height,
                padding: `${height / tablet.y / 2}px ${width / tablet.x / 2}px`,
            }}>
            <p className="rune-label">{tablet.name}</p>
            {!proofView && <BGLayer {...size} tablet={tablet} />}
            <RenderLayer {...size} pathPoints={pathPoints} paths={paths} />
            {!proofView && (
                <Overlay
                    {...size}
                    tablet={tablet}
                    currentPath={currentPath}
                    rune={props.id}
                />
            )}
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    let points = state.point.all.filter(p => p.rune === ownProps.id);
    let hist = {};
    points.forEach(p => {
        p.path in hist ? hist[p.path].push(p) : (hist[p.path] = [p]);
    });
    let paths = [];
    for (let path in hist) paths.push(hist[path]);
    return {
        tablet: state.tablet.all[state.tablet.current],
        mode: state.app.mode,
        ...ownProps,
        pathPoints: paths,
        paths: state.path.all,
        points,
        currentPath: state.path.current,
        selectedPoints: state.point.selected,
        proofView: state.app.proofView,
    };
}

export default connect(mapStateToProps, actionCreators)(Rune);
