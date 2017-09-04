'use strict';

import React, { Component } from 'react';
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

function Helpers (props) {

    let mX, mY;
    if (props.mousePosition) {
        mX = props.mousePosition.x;
        mY = props.mousePosition.y;
    }
    
    let { point, width, height, tablet: { gridUnit } } = props;
    console.log(point, gridUnit);
    mX = (Math.round(mX * width / gridUnit) * gridUnit );
    mY = (Math.round(mY * height / gridUnit) * gridUnit );

    let str = `M ${pX} ${pY} A 30 50 0 0 1 ${mX} ${mY}`;

    return (
        <svg>
            { props.mousePosition && 
            <path stroke="red" fill="none" pointerEvents="none"  d={str} /> }
        </svg>
    );
}

class Overlay extends Component {

    constructor (props) {
        super(props);
        this.state = {
            mousePosition: {x:0, y:0},
        };
    }

    _onMouseMove (e, data) {
        this.setState({ mousePosition: { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }});
    }

    _onMouseLeave (e) {
        this.setState({ mousePosition: null });
    }

    render () {
        let { props } = this;

        let {height, width, points, selectedPoints} = props;

        return (
            <svg id="overlay" height={height} width={width} onMouseMove={this._onMouseMove.bind(this)} onMouseLeave={this._onMouseLeave.bind(this)}>
                <GridNodes {...props} />
                <Group>
                    {
                        points.map((p, i) => <Point index={i} selected={selectedPoints.indexOf(i) > -1} key={i} {...p} />)
                    }
                </Group>
                <Helpers {...props} mousePosition={this.state.mousePosition} point={points[selectedPoints[0]] || { x: 0, y: 0}} />
            </svg>
        );
    }
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
