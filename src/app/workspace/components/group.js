'use strict';

import React from 'react';

class Group extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        console.log("CGHILDREN", this.props.children)
        return this.props.children;
    }
}

export default Group;