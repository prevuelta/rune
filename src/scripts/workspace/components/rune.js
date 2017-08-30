'use strict';

import React from 'react';
import { GridLines, GridNodes } from './grid';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import Group from './group';
import Point from './point';
import { COLORS } from '../../util/constants';

const SLUG = 20;

function BGLayer (props) {
    let {height, width} = props;
    return (
        <svg id="background" height={height} width={width} >
            <GridLines {...props} />
        </svg>
    );
}

function Overlay (props) {
    let {height, width, points, selectedPoints} = props;
    return (
        <svg id="overlay" height={height} width={width}>
            <GridNodes {...props} />
            <Group>
                {
                    points.map((p, i) => <Point index={i} selected={selectedPoints.indexOf(i) > -1} key={i} {...p} />)
                }
            </Group>
        </svg>
    );
}

function RenderLayer (props) {
    let {height, width, paths, pathPoints} = props;
    return (
        <svg id="render" height={height} width={width}>
            {
                pathPoints.map((points, i) => {
                    let str = points.map((p, i) => `${i?'L':'M'} ${p.x*width} ${p.y*height} `); 
                    let path = props.paths[i];
                    if (path.isClosed) str += 'Z';
                    console.log(path);
                    return <path
                                key={i}
                                d={str}
                                stroke={path.stroke}
                                strokeWidth={1}
                                fill={path.fill}
                                />;
                })
            }
        </svg>
    );
}

function Rune (props) {
    let { points, tablet, pathPoints, paths, selectedPoints, proofView, currentPath } = props;
    let height = tablet.y * tablet.gridUnit;
    let width = tablet.x * tablet.gridUnit;
    let size = {width, height};

    return (
        <div className="rune" style={{width, height, padding: `${height/tablet.y/2}px ${width/tablet.x/2}px` }}>
            <p className="rune-label">{ tablet.name }</p>
            { !proofView && <BGLayer {...size} tablet={tablet} /> }
            <RenderLayer {...size} pathPoints={pathPoints} paths={paths} />
            { !proofView && <Overlay
                {...size}
                tablet={tablet}
                points={points}
                selectedPoints={selectedPoints}
                currentPath={currentPath}
                rune={props.id}
                handlers={{addPoint: props.addPoint}} />
            }
        </div>
    );
}

function mapStateToProps (state, ownProps) {
    let points = state.point.all.filter(p => p.rune === ownProps.id);
    let hist = {};
    points.forEach(p => { p.path in hist ? hist[p.path].push(p) : hist[p.path] = [p]; } );
    let paths = [];
    for (let path in hist) paths[path] = hist[path];
    console.log(hist);
    return {
        ...ownProps,
        pathPoints: paths,
        paths: state.path.all,
        points,
        currentPath: state.path.current,
        selectedPoints: state.point.selected,
        proofView: state.view.proofView
    };
}

export default connect(mapStateToProps, actionCreators)(Rune);
