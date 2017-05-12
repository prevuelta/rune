'use strict';

import React from 'react';
import Line from './line';
import Group from './group';
//import Styles = from '../../util/styles';
import { COLORS } from '../../util/constants';

class GridNode extends React.Component {

    constructor (props) {
        super(props);
    }

    _handleClick (e) {
        console.log(e)
    }

    render () {
        let { data } = this.props;
        return (
            <circle cx={0} cy={0} r={10} fill={"red"} onClick={this._handleClick} />
        );
    }
}

export default GridNode;
