'use strict';

import React, { Component } from 'react';

const lineItem = props => {};

class PathEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _onUpdate = e => {
        console.log(e.target.value);
    };

    render() {
        return <p>eg 0 h 0 u a hu hu hu qpi w-u 0</p>;
    }
}

export default PathEditor;
