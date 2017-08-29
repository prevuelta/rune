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
    let {height, width, paths} = props;
    return (
        <svg id="render" height={height} width={width}>
            {
                paths.map((path, i) => {
                    let str = path.map((p, i) => `${i?'L':'M'} ${p.x} ${p.y} `); 
                    return <path key={i} d={str} stroke={'red'} strokeWidth={1} fill={'none'} />;
                })
            }
        </svg>
    );
}

function Rune (props) {
    let { points, tablet, paths, selectedPoints, proofView, currentPath } = props;
    let { options: { layout } } = tablet;

    let height = layout.size.y * layout.gridUnit;
    let width = layout.size.x * layout.gridUnit;
    let size = {width, height};

    return (
        <div className="rune" style={{width, height, padding: SLUG}}>
            { !proofView && <BGLayer {...size} layout={layout} /> }
            <RenderLayer {...size} paths={paths} />
            { !proofView && <Overlay
                {...size}
                layout={layout}
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
    let points = state.points.all.filter(p => p.rune === ownProps.id);
    let hist = {};
    points.forEach(p => { p.path in hist ? hist[p.path].push(p) : hist[p.path] = [p]; } );
    let paths = [];
    for (let path in hist) paths.push(hist[path]);
    return {
        ...ownProps,
        paths,
        points,
        currentPath: state.paths.current,
        selectedPoints: state.points.selected,
        proofView: state.view.proofView
    };
}

export default connect(mapStateToProps, actionCreators)(Rune);
