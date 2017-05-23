'use strict';

import React from 'react';
import { GridLines, GridNodes } from './grid';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import Point from './point';

const SLUG = 20;

function BGLayer (props) {
    let {height, width} = props;
    return (
        <svg id="background" height={height} width={width} >
            <GridLines data={props.data} />
        </svg>
    );
}

function UI (props) {
    let {height, width, points} = props;
    return (
        <svg id="overlay" height={height} width={width}>
            <GridNodes {...props} />
            { points.map((p, i) => <Point key={i} x={p.x} y={p.y} />) }
        </svg>
    );
}

class Rune extends React.Component {

    constructor (props) {
        super(props);
        console.log("Rune props", props)
        console.log("Rune data", this.props.data);
        let { data } = this.props;
        let { options: { layout } } = this.props.tablet;
        let height = layout.y * layout.gridUnit;
        let width = layout.x * layout.gridUnit
        this.state = {
            data,
            height, 
            width,
            size: { width, height},
            layout,
            points: this.props.points
        };
    }

    clickHandler (e) {
        console.log(e)
    }

    componentWillReceiveProps (newProps) {
        console.log(newProps)
        
    }

    render () {
        let { layout, width, height, size, points } = this.state;
        return (
            <div className="rune" style={{width: width, height: height, padding: SLUG}}>
                <BGLayer {...size} data={layout} />
                <UI {...size} points={points} data={layout} clickHandler={this.props.addPoint} />
            </div>
        );
    }
}

function mapStateToProps (state, ownProps) {
    let points = state.points.filter(p => p.rune === ownProps.index);
    console.log("Rune points", points);    
    return {
        ...ownProps,
        points
    };
}

export default connect(mapStateToProps, actionCreators)(Rune);
