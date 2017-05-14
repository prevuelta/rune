'use strict';

import React from 'react';
import Grid from './grid';

class Tablet extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        console.log("Tablet data", this.props.data);
        let { data } = this.props;
        let height = data.options.layout.y * data.options.layout.gridUnit;
        let width = data.options.layout.x * data.options.layout.gridUnit
        return (
            <div className="tablet" style={{width: width+20, height: height+20}}>
                <svg id="background" height={height} width={width} >
                    <Grid data={data.options.layout} />
                </svg>
                <svg id="render" height={height} width={width}>
                </svg>
                <svg id="overlay" height={height} width={width}>
                </svg>
            </div>
        );
    }
}

export default Tablet;
