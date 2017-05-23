'use strict';

import React from 'react';

class Point extends React.Component {
    
    constructor (props) {
        super(props);
    }
    
    render () {
        return (
            <circle cx={this.props.x} cy={this.props.y} r={10} fillColor={'red'} />
        );
    }
}

export default Point;
