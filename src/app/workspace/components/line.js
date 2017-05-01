'use strict';

import React from 'react';
import Paper from '../../canvas/paper';

class Line extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        let {x, y, length, color} = this.props;
        let line = new Paper.paper.Path.Rectangle([x, y], 1, length);
        line.fillColor = color;
        return null;
    }
}

export default Line;