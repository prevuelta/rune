'use strict';

import React from 'react';
import { GridLines, GridNodes } from './grid';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';

const SLUG = 20;

function BGLayer (props) {
    let {height, width} = props;
    return (
        <svg id="background" height={height} width={width} >
            <GridLines data={props.data} />
        </svg>
    );
}

function Overlay (props) {
    let {height, width} = props;
    return (
        <svg id="overlay" height={height} width={width}>
            <GridNodes {...props} />
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
            layout
        };
    }

    clickHandler (e) {
        console.log(e)
    }

    componentWillReceiveProps (newProps) {
        console.log(newProps)
        
    }

    render () {
        let { layout, width, height, size } = this.state;
        return (
            <div className="rune" style={{width: width, height: height, padding: SLUG}}>
                <BGLayer {...size} data={layout} />
                <Overlay {...size} data={layout} clickHandler={this.props.addPoint} />
            </div>
        );
    }
}

function mapStateToProps (state, ownProps) {
    console.log("Updating")
    return ownProps;
}

export default connect(mapStateToProps, actionCreators)(Rune);
