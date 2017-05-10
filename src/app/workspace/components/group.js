'use strict';

import React from 'react';

class Group extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return <g>{this.props.children}</g>
    }
}

export default Group;