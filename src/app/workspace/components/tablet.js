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
        let height = data.options.grid.size * data.options.size.y;
        let width = data.options.grid.size * data.options.size.x;
        return (
            <div className="tablet">
                <svg height={width} width={height}>
                    <Grid data={data.options.grid} />
                </svg>
            </div>
        );
    }
}

export default Tablet;