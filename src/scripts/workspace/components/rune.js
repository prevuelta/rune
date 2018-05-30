import React, { Component } from 'react';
import { GridLines, GridNodes } from '../layers/grid';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import { Group, Point } from '.';
import { COLORS, POINT_TYPES } from '../../util/constants';
import { Overlay } from '../layers';
import { Data } from '../../data';

const SLUG = 20;

const POINT_TYPE_STRING = {
    [POINT_TYPES.STRAIGHT]: (mX, mY) => `L ${mX} ${mY}`,
    [POINT_TYPES.ARC]: (mX, mY) => `A 50 50 0 0 1 ${mX} ${mY}`,
};

function BGLayer(props) {
    const { height, width } = props;
    return (
        <svg id="background" height={height} width={width}>
            <GridLines {...props} />
        </svg>
    );
}

function RenderLayer(props) {
    const { height, width, paths, pathPoints } = props;

    let stroke;

    function _mouseEnter() {
        console.log('Path hover');
        stroke = 3;
    }

    return (
        <svg id="render" height={height} width={width}>
            {paths.map((path, i) => {
                const str = path.points.map(
                    (p, i) =>
                        `${i ? 'L' : 'M'} ${p.x * width} ${p.y * height}${
                            path.isClosed ? ' Z' : ''
                        }`,
                );
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
        rune,
        pathPoints,
        paths,
        selectedPoints,
        proofView,
        currentPath,
        mode,
    } = props;
    let height = rune.y * rune.gridUnit;
    let width = rune.x * rune.gridUnit;
    let size = { width, height };

    return (
        <div
            className="rune"
            style={{
                width,
                height,
                padding: `${height / rune.y / 2}px ${width / rune.x / 2}px`,
            }}>
            <p className="rune-label">
                {rune.name}{' '}
                <span className="rune-size">
                    ({rune.x}x{rune.y})
                </span>
            </p>
            {!proofView && <BGLayer {...size} rune={rune} />}
            <RenderLayer {...size} paths={paths} />
            {!proofView && (
                <Overlay {...size} rune={rune} currentPath={currentPath} />
            )}
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    // const points = state.point.all.filter(p => p.rune === ownProps.rune._id);
    // const hist = {};
    // points.forEach(p => {
    // p.path in hist ? hist[p.path].push(p) : (hist[p.path] = [p]);
    // });
    // const paths = [];
    // for (let path in hist) paths.push(hist[path]);
    const paths = state.path.all.filter(p => p.rune === ownProps.rune._id);
    paths.forEach(path => {
        p.points = state.points.all.filter(p => p.path === path._id);
    });
    console.log(state.path.all, paths, ownProps);
    return {
        ...ownProps,
        mode: state.app.mode,
        paths,
        currentPath: state.path.current,
        selectedPoints: state.point.selected,
        proofView: state.app.proofView,
    };
}

export default connect(mapStateToProps, actionCreators)(Rune);
