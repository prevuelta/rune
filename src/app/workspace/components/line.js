'use strict';

import React from 'react';

class Line extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        let {x, y, opacity, length, color} = this.props;
        let props = {
            fill: color,
            x,
            y,
            fillOpacity: opacity || 1
        };
        let size = typeof y === 'undefined' ? { height: 2000, width: 1} : { width: 2000, height: 1};
        Object.assign(props, size);
        return (
            <rect {...props} />
        );
    }
}

export default Line;
