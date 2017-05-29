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
    let {height, width, points} = props;
    return (
        <svg id="overlay" height={height} width={width}>
            <GridNodes {...props} />
            <Group>
                {
                    points.map(p => <Point {...p} />)
                }
            </Group>
        </svg>
    );
}

function Rune (props) {
    let { points, tablet } = props;
    let { options: { layout } } = tablet;
    let height = layout.y * layout.gridUnit;
    let width = layout.x * layout.gridUnit;
    let size = {width, height};
    return (
        <div className="rune" style={{width, height, padding: SLUG}}>
            <BGLayer {...size} layout={layout} />
            <Overlay
                {...size}
                layout={layout}
                points={points}
                rune={props.id}
                handlers={{addPoint: props.addPoint}}
            />
        </div>
    );
}


function mapDispatchToProps (dispatch) {
    return ({
        dispatch
    });
}
function mapStateToProps (state, ownProps) {
    let points = state.points.filter(p => p.rune === ownProps.id)
    console.log(points, state.points);
    return {
        ...ownProps,
        points
    };
}

export default connect(mapStateToProps, actionCreators)(Rune);
