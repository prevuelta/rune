'use strict';

import React from 'react';
import {GridLines, GridNodes} from './grid';
import {connect} from 'react-redux';

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

class Tablet extends React.Component {

    constructor (props) {
        super(props);
    }

    clickHandler (e) {
        console.log(e)
    }

    render () {
        console.log("Tablet data", this.props.data);
        let { data } = this.props;
        let height = data.options.layout.y * data.options.layout.gridUnit;
        let width = data.options.layout.x * data.options.layout.gridUnit
        let sizeProps = {width, height};
        return (
            <div className="tablet" style={{width: width, height: height, padding: SLUG}}>
                <BGLayer {...sizeProps} data={data.options.layout} />
                <Overlay {...sizeProps} data={data.options.layout} clickHandler={this.clickHandler} />
            </div>
        );
    }
}

function mapStateToProps (...args) {
    console.log(args);
}

export default connect(mapStateToProps, () => dispatch())(Tablet);
