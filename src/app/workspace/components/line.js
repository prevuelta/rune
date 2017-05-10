'use strict';

import React from 'react';

class Line extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        let {x, y, length, color} = this.props;
        let props = {
            fill: color,
            x: x,
            y :y
        };
        let size = !y ? { height: 2000, width: 1} : { width: 2000, height: 1};
        Object.assign(props, size);
        return (
            <rect {...props} />
        );
    }
}

export default Line;